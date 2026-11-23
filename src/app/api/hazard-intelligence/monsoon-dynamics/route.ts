import { NextResponse } from 'next/server';
import {
  MONSOON_CORRIDOR_STATIONS,
  MOISTURE_TRANSPORT_NODES,
  HISTORICAL_MONSOON_RECORDS,
  MonsoonCorridorLiveRecord,
  HazardLevel,
  MonsoonSubRegion,
} from '@/data/hazard-monsoon-dynamics';

export const dynamic = 'force-dynamic';

const CACHE_TTL_MS = 10 * 60 * 1000;
let cachedPayload: Record<string, unknown> | null = null;
let cachedAt = 0;

function parseGmtIndex(times: string[], nowMs: number): number {
  if (!Array.isArray(times) || times.length === 0) return 0;
  for (let i = times.length - 1; i >= 0; i--) {
    const raw = times[i];
    const ts = new Date(raw.endsWith('Z') ? raw : `${raw}Z`).getTime();
    if (ts <= nowMs) return i;
  }
  return 0;
}

function maxHazard(levels: HazardLevel[]): HazardLevel {
  const rank: Record<HazardLevel, number> = { Low: 0, Moderate: 1, High: 2, Critical: 3 };
  return levels.reduce((best, cur) => (rank[cur] > rank[best] ? cur : best), 'Low' as HazardLevel);
}

export async function GET(request: Request) {
  const now = new Date();
  const nowMs = now.getTime();
  const monthIdx = now.getUTCMonth(); // 0=Jan .. 11=Dec; Jun-Sep (5..8) is ISM season
  const isMonsoonSeason = monthIdx >= 5 && monthIdx <= 8;
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === '1';

  if (!forceRefresh && cachedPayload && nowMs - cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cachedPayload);
  }

  try {
    const allLats = [
      ...MOISTURE_TRANSPORT_NODES.map((m) => m.latitude),
      ...MONSOON_CORRIDOR_STATIONS.map((s) => s.latitude),
    ].join(',');
    const allLngs = [
      ...MOISTURE_TRANSPORT_NODES.map((m) => m.longitude),
      ...MONSOON_CORRIDOR_STATIONS.map((s) => s.longitude),
    ].join(',');

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${allLats}&longitude=${allLngs}&current=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation,rain,pressure_msl,wind_speed_10m,wind_direction_10m&hourly=wind_speed_850hPa,wind_direction_850hPa,relative_humidity_850hPa,cape&daily=precipitation_sum,rain_sum,precipitation_probability_max&timezone=GMT&past_days=7&forecast_days=7`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' }).finally(() =>
      clearTimeout(timeout)
    );
    if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
    const raw = await res.json();
    const list = Array.isArray(raw) ? raw : [raw];

    const mCount = MOISTURE_TRANSPORT_NODES.length;
    const moistureRaw = list.slice(0, mCount);
    const corridorRaw = list.slice(mCount);

    const moistureBranches = MOISTURE_TRANSPORT_NODES.map((node, i) => {
      const d = moistureRaw[i] || {};
      const cur = d.current || {};
      const hourly = d.hourly || {};
      const hIdx = parseGmtIndex(hourly.time || [], nowMs);
      const rh850 = Math.round(Number(hourly.relative_humidity_850hPa?.[hIdx] ?? 40));
      const w850 = Number((hourly.wind_speed_850hPa?.[hIdx] ?? 15).toFixed(1));
      const dir850 = Math.round(Number(hourly.wind_direction_850hPa?.[hIdx] ?? 240));
      const dp = Number((cur.dew_point_2m ?? 12).toFixed(1));
      return {
        ...node,
        provenanceTier: 'LIVE_OBSERVATION',
        dew_point_c: dp,
        rh_850hpa_pct: rh850,
        wind_850hpa_kmh: w850,
        wind_850hpa_dir: dir850,
        transportStatus:
          rh850 >= 75 && w850 >= 25
            ? 'Strong Moisture Flux'
            : rh850 >= 55
              ? 'Moderate Moisture Advection'
              : 'Dry Continental / Post-Monsoon Flow',
      };
    });

    const corridors: MonsoonCorridorLiveRecord[] = MONSOON_CORRIDOR_STATIONS.map((st, i) => {
      const d = corridorRaw[i] || {};
      const cur = d.current || {};
      const hourly = d.hourly || {};
      const daily = d.daily || {};
      const hIdx = parseGmtIndex(hourly.time || [], nowMs);

      const dDates: string[] = daily.time || [];
      const dPrecip: number[] = daily.precipitation_sum || [];
      const dRain: number[] = daily.rain_sum || [];
      const dProb: number[] = daily.precipitation_probability_max || [];

      // Indices 0..6 = past 7 days observed; indices 7..13 = upcoming 7-day forecast
      const past7Rain = Number(
        dPrecip.slice(0, 7).reduce((s, v) => s + (v || 0), 0).toFixed(1)
      );
      const normal7d = isMonsoonSeason ? st.normalJulAugWeeklyRainMm : st.normalNovWeeklyRainMm;
      const anomalyMm = Number((past7Rain - normal7d).toFixed(1));
      const anomalyPct = normal7d > 0 ? Math.round(((past7Rain - normal7d) / normal7d) * 100) : 0;

      const forecastDaily = dDates.slice(7, 14).map((dt, k) => {
        const idx = k + 7;
        return {
          date: dt,
          rain_mm: Number((dRain[idx] ?? dPrecip[idx] ?? 0).toFixed(1)),
          prob_pct: Math.round(dProb[idx] ?? 0),
        };
      });

      const total7dRain = Number(forecastDaily.reduce((s, x) => s + x.rain_mm, 0).toFixed(1));
      const peakDailyMm = forecastDaily.reduce((m, x) => Math.max(m, x.rain_mm), 0);
      const maxProb = forecastDaily.reduce((m, x) => Math.max(m, x.prob_pct), 0);

      const capeSlice = (hourly.cape || []).slice(hIdx, hIdx + 168).filter((v: any) => typeof v === 'number');
      const curCape = Math.round(Number(hourly.cape?.[hIdx] ?? 0));
      const maxCape = capeSlice.length > 0 ? Math.round(Math.max(...capeSlice)) : curCape;
      const rh850 = Math.round(Number(hourly.relative_humidity_850hPa?.[hIdx] ?? 35));
      const w850 = Number((hourly.wind_speed_850hPa?.[hIdx] ?? 12).toFixed(1));
      const dir850 = Math.round(Number(hourly.wind_direction_850hPa?.[hIdx] ?? 250));

      let monsoonState: MonsoonCorridorLiveRecord['monsoonState'] =
        isMonsoonSeason ? 'Pre-Monsoon Convective' : 'Seasonal Withdrawal / Post-Monsoon Dry';
      if (isMonsoonSeason && (total7dRain >= 45 || rh850 >= 75)) {
        monsoonState = 'Active Monsoon Surge';
      } else if (total7dRain >= 20 || rh850 >= 70) {
        monsoonState = 'Orographic Moisture Intrusion';
      }

      const floods: HazardLevel =
        st.coupledHazards.includes('floods') && (total7dRain >= 80 || past7Rain >= 90)
          ? 'Critical'
          : st.coupledHazards.includes('floods') && total7dRain >= 40
            ? 'High'
            : total7dRain >= 20
              ? 'Moderate'
              : 'Low';

      const flashFloods: HazardLevel =
        peakDailyMm >= 55 || maxCape >= 1200
          ? 'Critical'
          : peakDailyMm >= 28 || maxCape >= 600
            ? 'High'
            : peakDailyMm >= 12
              ? 'Moderate'
              : 'Low';

      const landslides: HazardLevel =
        st.coupledHazards.includes('landslides') && past7Rain + total7dRain >= 95
          ? 'Critical'
          : st.coupledHazards.includes('landslides') && past7Rain + total7dRain >= 45
            ? 'High'
            : past7Rain + total7dRain >= 20
              ? 'Moderate'
              : 'Low';

      const glofs: HazardLevel =
        st.coupledHazards.includes('glofs') && st.elevation_m >= 1500 && Number(cur.temperature_2m ?? 10) >= 18 && total7dRain >= 20
          ? 'High'
          : st.coupledHazards.includes('glofs') && total7dRain >= 15
            ? 'Moderate'
            : 'Low';

      return {
        ...st,
        liveObservation: {
          temp_c: Number((cur.temperature_2m ?? 14).toFixed(1)),
          dew_point_c: Number((cur.dew_point_2m ?? 4).toFixed(1)),
          humidity_2m_pct: Math.round(Number(cur.relative_humidity_2m ?? 45)),
          rh_850hpa_pct: rh850,
          wind_850hpa_kmh: w850,
          wind_850hpa_dir: dir850,
          cape_jkg: curCape,
          precip_current_mm: Number((cur.precipitation ?? 0).toFixed(1)),
          past7d_rain_mm: past7Rain,
          climatology7d_normal_mm: normal7d,
          anomaly_mm: anomalyMm,
          anomaly_pct: anomalyPct,
        },
        forecast7d: {
          total_rain_mm: total7dRain,
          peak_daily_mm: peakDailyMm,
          max_prob_pct: maxProb,
          max_cape_jkg: maxCape,
          daily: forecastDaily,
        },
        monsoonState,
        coupledRisk: {
          floods,
          flashFloods,
          landslides,
          glofs,
          overall: maxHazard([floods, flashFloods, landslides, glofs]),
        },
      };
    });

    const subRegions: MonsoonSubRegion[] = ['Jammu', 'Kashmir', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];
    const regionalSummaries = subRegions.map((sr) => {
      const grp = corridors.filter((c) => c.subRegion === sr);
      const meanPast7 = Number((grp.reduce((s, c) => s + c.liveObservation.past7d_rain_mm, 0) / grp.length).toFixed(1));
      const meanNormal7 = Number((grp.reduce((s, c) => s + c.liveObservation.climatology7d_normal_mm, 0) / grp.length).toFixed(1));
      const anomalyPct = meanNormal7 > 0 ? Math.round(((meanPast7 - meanNormal7) / meanNormal7) * 100) : 0;
      return {
        subRegion: sr,
        corridors: grp.length,
        past7dMeanMm: meanPast7,
        normal7dMm: meanNormal7,
        anomalyPct,
        forecastMax7dMm: Math.max(...grp.map((c) => c.forecast7d.total_rain_mm)),
        meanRh850Pct: Math.round(grp.reduce((s, c) => s + c.liveObservation.rh_850hpa_pct, 0) / grp.length),
        overallRisk: maxHazard(grp.map((c) => c.coupledRisk.overall)),
      };
    });

    const payload = {
      success: true,
      seasonContext: {
        isActiveMonsoonWindow: isMonsoonSeason,
        regimeHeadline: isMonsoonSeason
          ? 'Southwest Summer Monsoon Season Active — Monitoring Arabian Sea & Bay of Bengal Orographic Moisture Transport'
          : 'Seasonal Southwest Monsoon Withdrawn — Monitoring Post-Monsoon Moisture Anomalies & Orographic Baseline',
        mean850RhPct: Math.round(corridors.reduce((s, c) => s + c.liveObservation.rh_850hpa_pct, 0) / corridors.length),
        maxCapeJkg: Math.max(...corridors.map((c) => c.forecast7d.max_cape_jkg)),
        peakPast7dMm: Math.max(...corridors.map((c) => c.liveObservation.past7d_rain_mm)),
        peakForecast7dMm: Math.max(...corridors.map((c) => c.forecast7d.total_rain_mm)),
      },
      moistureBranches,
      regionalSummaries,
      corridors,
      historicalRecords: HISTORICAL_MONSOON_RECORDS,
      meta: {
        totalCorridors: corridors.length,
        provider: 'Open-Meteo 850 hPa Moisture, Dew Point, CAPE & Rainfall Anomaly Engine (UTC)',
        updatedAt: new Date().toISOString(),
      },
    };

    cachedPayload = payload;
    cachedAt = Date.now();
    return NextResponse.json(payload);
  } catch (err: any) {
    if (cachedPayload) return NextResponse.json({ ...cachedPayload, staleFallback: true });
    return NextResponse.json(
      { success: false, error: err?.message || 'Unable to sync Monsoon Dynamics telemetry', historicalRecords: HISTORICAL_MONSOON_RECORDS },
      { status: 503 }
    );
  }
}
