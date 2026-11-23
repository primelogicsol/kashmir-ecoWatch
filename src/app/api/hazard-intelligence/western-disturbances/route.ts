import { NextResponse } from 'next/server';
import {
  WD_CORRIDOR_STATIONS,
  UPSTREAM_SYNOPTIC_CORRIDOR,
  OFFICIAL_WD_AGENCY_SOURCES,
  HISTORICAL_WD_RECORDS,
  WD_VERIFIED_DATA_SOURCES,
  WDCorridorLiveRecord,
  UpstreamLiveCheckpoint,
  WDPhase,
  CompoundRiskLevel,
  WDSubRegion,
} from '@/data/hazard-western-disturbances';

export const dynamic = 'force-dynamic';

const CACHE_TTL_MS = 10 * 60 * 1000; // 10-minute server cache to protect Open-Meteo rate limits
let cachedPayload: Record<string, unknown> | null = null;
let cachedAt = 0;
let inFlightPromise: Promise<Record<string, unknown>> | null = null;

function parseGmtIndex(times: string[], nowMs: number): number {
  if (!Array.isArray(times) || times.length === 0) return 0;
  for (let i = times.length - 1; i >= 0; i--) {
    const raw = times[i];
    const ts = new Date(raw.endsWith('Z') ? raw : `${raw}Z`).getTime();
    if (ts <= nowMs) return i;
  }
  return 0;
}

function maxRisk(levels: CompoundRiskLevel[]): CompoundRiskLevel {
  const rank: Record<CompoundRiskLevel, number> = { Low: 0, Moderate: 1, High: 2, Critical: 3 };
  return levels.reduce((best, cur) => (rank[cur] > rank[best] ? cur : best), 'Low' as CompoundRiskLevel);
}

function evaluateCompoundTriggers(params: {
  elevation_m: number;
  past48h_precip_mm: number;
  past48h_snow_cm: number;
  f7d_precip_mm: number;
  f7d_rain_mm: number;
  f7d_snow_cm: number;
  peak_daily_precip_mm: number;
  freezing_level_m: number;
  max_gust_kmh: number;
  coupled: Array<'floods' | 'flash-floods' | 'landslides' | 'avalanches'>;
}) {
  const total3dEquivRain = params.past48h_precip_mm * 0.5 + params.f7d_rain_mm;
  const totalSnow = params.past48h_snow_cm + params.f7d_snow_cm;

  // 1. Riverine Floods: cumulative liquid rainfall + warm snowline (>2600m)
  let floods: CompoundRiskLevel = 'Low';
  if (params.coupled.includes('floods')) {
    if (total3dEquivRain >= 85 || (params.peak_daily_precip_mm >= 55 && params.freezing_level_m > 2800)) {
      floods = 'Critical';
    } else if (total3dEquivRain >= 45 || params.peak_daily_precip_mm >= 32) {
      floods = 'High';
    } else if (total3dEquivRain >= 20) {
      floods = 'Moderate';
    }
  }

  // 2. Flash Floods: intense daily convective/orographic bursts or rain-on-snow
  let flashFloods: CompoundRiskLevel = 'Low';
  if (params.coupled.includes('flash-floods')) {
    const rainOnSnow = params.elevation_m >= 1800 && params.freezing_level_m > params.elevation_m + 500 && params.peak_daily_precip_mm >= 25;
    if (params.peak_daily_precip_mm >= 50 || (rainOnSnow && params.peak_daily_precip_mm >= 35)) {
      flashFloods = 'Critical';
    } else if (params.peak_daily_precip_mm >= 28 || rainOnSnow) {
      flashFloods = 'High';
    } else if (params.peak_daily_precip_mm >= 14) {
      flashFloods = 'Moderate';
    }
  }

  // 3. Landslides: antecedent 48h moisture + forecast precipitation on steep corridors
  let landslides: CompoundRiskLevel = 'Low';
  if (params.coupled.includes('landslides')) {
    const slopeMoistureLoad = params.past48h_precip_mm + params.f7d_precip_mm * 0.75;
    if (slopeMoistureLoad >= 75 || params.peak_daily_precip_mm >= 48) {
      landslides = 'Critical';
    } else if (slopeMoistureLoad >= 40 || params.peak_daily_precip_mm >= 25) {
      landslides = 'High';
    } else if (slopeMoistureLoad >= 18) {
      landslides = 'Moderate';
    }
  }

  // 4. Avalanches: high-altitude snowfall + wind-slab loading from gusts
  let avalanches: CompoundRiskLevel = 'Low';
  if (params.coupled.includes('avalanches') || params.elevation_m >= 2300) {
    if (totalSnow >= 55 || (totalSnow >= 35 && params.max_gust_kmh >= 55)) {
      avalanches = 'Critical';
    } else if (totalSnow >= 25 || (totalSnow >= 15 && params.max_gust_kmh >= 45)) {
      avalanches = 'High';
    } else if (totalSnow >= 8) {
      avalanches = 'Moderate';
    }
  }

  return {
    floods,
    flashFloods,
    landslides,
    avalanches,
    overallRisk: maxRisk([floods, flashFloods, landslides, avalanches]),
  };
}

async function fetchOpenMeteoBatch(lats: string, lngs: string) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&hourly=geopotential_height_500hPa,wind_speed_300hPa,wind_direction_300hPa,freezing_level_height,precipitation,snowfall,pressure_msl&daily=precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_max,wind_gusts_10m_max,temperature_2m_max,temperature_2m_min&timezone=GMT&past_days=2&forecast_days=7`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json) ? json : [json];
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRainViewerRadarMeta(): Promise<{
  available: boolean;
  latestTileTemplate: string | null;
  observedAtUtc: string | null;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  try {
    const res = await fetch('https://api.rainviewer.com/public/weather-maps.json', {
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) return { available: false, latestTileTemplate: null, observedAtUtc: null };
    const json = await res.json();
    const past = json?.radar?.past;
    const host = json?.host || 'https://tilecache.rainviewer.com';
    if (Array.isArray(past) && past.length > 0) {
      const latest = past[past.length - 1];
      return {
        available: true,
        latestTileTemplate: `${host}${latest.path}/256/{z}/{x}/{y}/2/1_1.png`,
        observedAtUtc: latest.time ? new Date(latest.time * 1000).toISOString() : null,
      };
    }
    return { available: false, latestTileTemplate: null, observedAtUtc: null };
  } catch {
    return { available: false, latestTileTemplate: null, observedAtUtc: null };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: Request) {
  const now = new Date();
  const nowMs = now.getTime();
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === '1';

  if (!forceRefresh && cachedPayload && nowMs - cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cachedPayload);
  }

  try {
    if (!inFlightPromise) {
      inFlightPromise = (async () => {
        // Combine 6 upstream checkpoints + 31 regional corridor stations into one atomic batch (37 points)
        const allLats = [
          ...UPSTREAM_SYNOPTIC_CORRIDOR.map((u) => u.latitude),
          ...WD_CORRIDOR_STATIONS.map((s) => s.latitude),
        ].join(',');
        const allLngs = [
          ...UPSTREAM_SYNOPTIC_CORRIDOR.map((u) => u.longitude),
          ...WD_CORRIDOR_STATIONS.map((s) => s.longitude),
        ].join(',');

        const [omBatch, radarMeta] = await Promise.all([
          fetchOpenMeteoBatch(allLats, allLngs),
          fetchRainViewerRadarMeta(),
        ]);

        const upCount = UPSTREAM_SYNOPTIC_CORRIDOR.length;
        const upstreamRaw = omBatch.slice(0, upCount);
        const corridorsRaw = omBatch.slice(upCount);
        const currentNowMs = Date.now();

        // ── 1. Process 6 Upstream Synoptic Approach Checkpoints (LIVE OBSERVATION)
        const upstreamTrack: UpstreamLiveCheckpoint[] = UPSTREAM_SYNOPTIC_CORRIDOR.map((node, idx) => {
          const d = upstreamRaw[idx] || {};
          const cur = d.current || {};
          const hourly = d.hourly || {};
          const daily = d.daily || {};
          const hIdx = parseGmtIndex(hourly.time || [], currentNowMs);
          const prev24Idx = Math.max(0, hIdx - 24);

          const pNow = Number((cur.pressure_msl ?? hourly.pressure_msl?.[hIdx] ?? 1016).toFixed(1));
          const p24 = Number((hourly.pressure_msl?.[prev24Idx] ?? pNow).toFixed(1));
          const pDelta = Number((pNow - p24).toFixed(1));
          const z500 = Math.round(Number(hourly.geopotential_height_500hPa?.[hIdx] ?? 5720));
          const jet300 = Number((hourly.wind_speed_300hPa?.[hIdx] ?? 85).toFixed(1));
          const jetDir = Math.round(Number(hourly.wind_direction_300hPa?.[hIdx] ?? 265));
          const cloud = Math.round(Number(cur.cloud_cover ?? 15));
          const precipCur = Number((cur.precipitation ?? 0).toFixed(1));

          // Next 72h precipitation from daily indices [2, 3, 4] (since past_days=2 -> indices 0,1 are past 48h, index 2 is today)
          const dPrecip: number[] = daily.precipitation_sum || [];
          const next72 = Number(((dPrecip[2] || 0) + (dPrecip[3] || 0) + (dPrecip[4] || 0)).toFixed(1));

          let troughSignal: UpstreamLiveCheckpoint['troughSignal'] = 'Zonal Flow';
          if (z500 < 5640 || pDelta <= -3.5 || precipCur > 0.5) {
            troughSignal = 'Active Trough';
          } else if (z500 < 5730 || pDelta <= -1.8 || next72 >= 8) {
            troughSignal = 'Developing Wave';
          } else if (z500 >= 5800 && pNow >= 1020 && cloud < 25) {
            troughSignal = 'High-Pressure Ridge';
          }

          return {
            ...node,
            provenanceTier: 'LIVE_OBSERVATION',
            pressure_msl_hpa: pNow,
            pressure_24h_delta_hpa: pDelta,
            z500_gpm: z500,
            jet300_kmh: jet300,
            jet300_dir_deg: jetDir,
            cloud_cover_pct: cloud,
            precip_current_mm: precipCur,
            next72h_precip_mm: next72,
            troughSignal,
          };
        });

        // ── 2. Process 31 Regional Corridors (Strict Separation: liveObservation vs forecast7d)
        const corridors: WDCorridorLiveRecord[] = WD_CORRIDOR_STATIONS.map((station, idx) => {
          const d = corridorsRaw[idx] || {};
          const cur = d.current || {};
          const hourly = d.hourly || {};
          const daily = d.daily || {};

          const hIdx = parseGmtIndex(hourly.time || [], currentNowMs);
          const prev24Idx = Math.max(0, hIdx - 24);

          const pNow = Number((cur.pressure_msl ?? hourly.pressure_msl?.[hIdx] ?? 1018).toFixed(1));
          const p24 = Number((hourly.pressure_msl?.[prev24Idx] ?? pNow).toFixed(1));
          const pDelta = Number((pNow - p24).toFixed(1));
          const z500 = Math.round(Number(hourly.geopotential_height_500hPa?.[hIdx] ?? 5750));
          const jet300 = Number((hourly.wind_speed_300hPa?.[hIdx] ?? 90).toFixed(1));
          const fzlNow = Math.round(Number(hourly.freezing_level_height?.[hIdx] ?? 3400));

          // Past 48h observed totals (daily indices 0 and 1 when past_days=2)
          const dDates: string[] = daily.time || [];
          const dPrecip: number[] = daily.precipitation_sum || [];
          const dRain: number[] = daily.rain_sum || [];
          const dSnow: number[] = daily.snowfall_sum || [];
          const dProb: number[] = daily.precipitation_probability_max || [];
          const dGust: number[] = daily.wind_gusts_10m_max || [];
          const dTmax: number[] = daily.temperature_2m_max || [];
          const dTmin: number[] = daily.temperature_2m_min || [];

          const past48Precip = Number(((dPrecip[0] || 0) + (dPrecip[1] || 0)).toFixed(1));
          const past48Snow = Number(((dSnow[0] || 0) + (dSnow[1] || 0)).toFixed(1));

          // Next 7-day forecast slice (indices 2..8)
          const forecastDaily = dDates.slice(2, 9).map((dt, k) => {
            const di = k + 2;
            return {
              date: dt,
              precip_mm: Number((dPrecip[di] ?? 0).toFixed(1)),
              rain_mm: Number((dRain[di] ?? 0).toFixed(1)),
              snow_cm: Number((dSnow[di] ?? 0).toFixed(1)),
              prob_pct: Math.round(dProb[di] ?? 0),
              tmax_c: Number((dTmax[di] ?? 12).toFixed(1)),
              tmin_c: Number((dTmin[di] ?? 2).toFixed(1)),
              gust_kmh: Number((dGust[di] ?? 20).toFixed(1)),
            };
          });

          const total7dPrecip = Number(forecastDaily.reduce((s, x) => s + x.precip_mm, 0).toFixed(1));
          const total7dRain = Number(forecastDaily.reduce((s, x) => s + x.rain_mm, 0).toFixed(1));
          const total7dSnow = Number(forecastDaily.reduce((s, x) => s + x.snow_cm, 0).toFixed(1));

          let peakDailyPrecip = 0;
          let peakPrecipDate = forecastDaily[0]?.date || '';
          for (const fd of forecastDaily) {
            if (fd.precip_mm > peakDailyPrecip) {
              peakDailyPrecip = fd.precip_mm;
              peakPrecipDate = fd.date;
            }
          }

          const maxProb = forecastDaily.reduce((m, x) => Math.max(m, x.prob_pct), 0);
          const maxGust = forecastDaily.reduce((m, x) => Math.max(m, x.gust_kmh), Number(cur.wind_gusts_10m ?? 20));

          // Minimum freezing level across upcoming forecast hours
          const fzlFuture = (hourly.freezing_level_height || []).slice(hIdx).filter((v: any) => typeof v === 'number');
          const minFzl = fzlFuture.length > 0 ? Math.round(Math.min(...fzlFuture)) : fzlNow;

          const curPrecip = Number((cur.precipitation ?? 0).toFixed(1));
          const curRain = Number((cur.rain ?? 0).toFixed(1));
          const curSnow = Number((cur.snowfall ?? 0).toFixed(1));
          const curCloud = Math.round(Number(cur.cloud_cover ?? 0));

          // Determine Synoptic WD Phase
          let wdPhase: WDPhase = 'Quiescent Ridge';
          if (curPrecip > 0.2 || curSnow > 0.1 || (curCloud >= 75 && pDelta <= -2.0)) {
            wdPhase = 'Active Passage';
          } else if (total7dPrecip >= 10 || maxProb >= 55) {
            wdPhase = 'Approaching Wave (48–96h)';
          } else if (past48Precip >= 5 && curPrecip === 0) {
            wdPhase = 'Post-Frontal Clearing';
          }

          let intensityLabel: WDCorridorLiveRecord['intensityLabel'] = 'None / Fair';
          if (peakDailyPrecip >= 35 || total7dSnow >= 35 || curPrecip >= 4) {
            intensityLabel = 'Intense / Active WD';
          } else if (peakDailyPrecip >= 15 || total7dSnow >= 12 || curPrecip >= 1) {
            intensityLabel = 'Moderate WD';
          } else if (total7dPrecip >= 3 || curCloud >= 60) {
            intensityLabel = 'Weak Wave';
          }

          const compoundTriggers = evaluateCompoundTriggers({
            elevation_m: station.elevation_m,
            past48h_precip_mm: past48Precip,
            past48h_snow_cm: past48Snow,
            f7d_precip_mm: total7dPrecip,
            f7d_rain_mm: total7dRain,
            f7d_snow_cm: total7dSnow,
            peak_daily_precip_mm: peakDailyPrecip,
            freezing_level_m: minFzl,
            max_gust_kmh: maxGust,
            coupled: station.primary_coupled_hazards,
          });

          const rawCurTime = cur.time || hourly.time?.[hIdx] || new Date().toISOString();
          const observedIso = new Date(rawCurTime.endsWith('Z') ? rawCurTime : `${rawCurTime}Z`).toISOString();

          return {
            ...station,
            provenance: {
              observationTier: 'LIVE_OBSERVATION',
              forecastTier: 'NUMERICAL_FORECAST',
              provider: 'Open-Meteo Synoptic Assimilation (ECMWF IFS / GFS / ICON)',
              observedAtUtc: observedIso,
            },
            liveObservation: {
              temp_c: Number((cur.temperature_2m ?? 10).toFixed(1)),
              humidity_pct: Math.round(Number(cur.relative_humidity_2m ?? 50)),
              pressure_msl_hpa: pNow,
              pressure_24h_delta_hpa: pDelta,
              cloud_cover_pct: curCloud,
              precip_current_mm: curPrecip,
              rain_current_mm: curRain,
              snowfall_current_cm: curSnow,
              wind_speed_kmh: Number((cur.wind_speed_10m ?? 8).toFixed(1)),
              wind_gusts_kmh: Number((cur.wind_gusts_10m ?? 16).toFixed(1)),
              wind_dir_deg: Math.round(Number(cur.wind_direction_10m ?? 270)),
              z500_gpm: z500,
              jet300_kmh: jet300,
              freezing_level_m: fzlNow,
              past48h_precip_mm: past48Precip,
              past48h_snow_cm: past48Snow,
            },
            forecast7d: {
              total_precip_mm: total7dPrecip,
              total_rain_mm: total7dRain,
              total_snow_cm: total7dSnow,
              peak_daily_precip_mm: peakDailyPrecip,
              peak_precip_date: peakPrecipDate,
              max_precip_prob_pct: maxProb,
              max_wind_gust_kmh: maxGust,
              min_freezing_level_m: minFzl,
              daily: forecastDaily,
            },
            wdPhase,
            intensityLabel,
            compoundTriggers,
          };
        });

        // ── 3. Build 6-SubRegion Summary (Jammu, Kashmir, Ladakh, Azad Kashmir, Gilgit, Baltistan)
        const subRegionsOrder: WDSubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];
        const regionalSummaries = subRegionsOrder.map((sr) => {
          const group = corridors.filter((c) => c.subRegion === sr);
          const avgTemp = Number((group.reduce((s, c) => s + c.liveObservation.temp_c, 0) / group.length).toFixed(1));
          const avgCloud = Math.round(group.reduce((s, c) => s + c.liveObservation.cloud_cover_pct, 0) / group.length);
          const meanFzl = Math.round(group.reduce((s, c) => s + c.liveObservation.freezing_level_m, 0) / group.length);
          const max7dPrecip = Math.max(...group.map((c) => c.forecast7d.total_precip_mm));
          const max7dSnow = Math.max(...group.map((c) => c.forecast7d.total_snow_cm));
          const activeCorridors = group.filter((c) => c.wdPhase === 'Active Passage' || c.wdPhase === 'Approaching Wave (48–96h)').length;

          return {
            subRegion: sr,
            corridorCount: group.length,
            activeOrApproachingCount: activeCorridors,
            liveAvgTempC: avgTemp,
            liveAvgCloudPct: avgCloud,
            liveMeanFreezingLevelM: meanFzl,
            forecastMax7dPrecipMm: max7dPrecip,
            forecastMax7dSnowCm: max7dSnow,
            floodRisk: maxRisk(group.map((c) => c.compoundTriggers.floods)),
            flashFloodRisk: maxRisk(group.map((c) => c.compoundTriggers.flashFloods)),
            landslideRisk: maxRisk(group.map((c) => c.compoundTriggers.landslides)),
            avalancheRisk: maxRisk(group.map((c) => c.compoundTriggers.avalanches)),
            overallRisk: maxRisk(group.map((c) => c.compoundTriggers.overallRisk)),
          };
        });

        // ── 4. Aggregate Synoptic Headline Diagnostics
        const activePassageCount = corridors.filter((c) => c.wdPhase === 'Active Passage').length;
        const approachingWaveCount = corridors.filter((c) => c.wdPhase === 'Approaching Wave (48–96h)').length;
        const upstreamActiveTroughs = upstreamTrack.filter(
          (u) => u.troughSignal === 'Active Trough' || u.troughSignal === 'Developing Wave'
        ).length;
        const maxJetCoreKmh = Math.round(Math.max(...corridors.map((c) => c.liveObservation.jet300_kmh)));
        const meanFreezingLevelM = Math.round(
          corridors.reduce((s, c) => s + c.liveObservation.freezing_level_m, 0) / corridors.length
        );
        const peak7dPrecipMm = Number(Math.max(...corridors.map((c) => c.forecast7d.total_precip_mm)).toFixed(1));
        const peak7dSnowCm = Number(Math.max(...corridors.map((c) => c.forecast7d.total_snow_cm)).toFixed(1));
        const elevatedHazardCorridors = corridors.filter((c) => c.compoundTriggers.overallRisk !== 'Low').length;

        const synopticHeadline =
          activePassageCount > 0
            ? `Active Western Disturbance passage detected across ${activePassageCount} Himalayan corridors`
            : approachingWaveCount > 0 || upstreamActiveTroughs > 0
              ? `Upstream Westerly Wave activity (${upstreamActiveTroughs} approach sectors); ${approachingWaveCount} regional corridors on 7-day watch`
              : 'High-pressure synoptic ridge currently dominating Western Himalaya; no intense WD landfall in immediate 48h window';

        const payload: Record<string, unknown> = {
          success: true,
          synopticSummary: {
            headline: synopticHeadline,
            activePassageCount,
            approachingWaveCount,
            upstreamActiveTroughs,
            maxJetCoreKmh,
            meanFreezingLevelM,
            peak7dPrecipMm,
            peak7dSnowCm,
            elevatedHazardCorridors,
            compoundCoupling: {
              floods: maxRisk(corridors.map((c) => c.compoundTriggers.floods)),
              flashFloods: maxRisk(corridors.map((c) => c.compoundTriggers.flashFloods)),
              landslides: maxRisk(corridors.map((c) => c.compoundTriggers.landslides)),
              avalanches: maxRisk(corridors.map((c) => c.compoundTriggers.avalanches)),
            },
          },
          upstreamTrack,
          regionalSummaries,
          corridors,
          radarOverlay: radarMeta,
          officialAdvisories: OFFICIAL_WD_AGENCY_SOURCES,
          historicalRecords: HISTORICAL_WD_RECORDS,
          dataSources: WD_VERIFIED_DATA_SOURCES,
          meta: {
            totalCorridors: corridors.length,
            subRegionsCovered: subRegionsOrder,
            upstreamCheckpoints: upstreamTrack.length,
            provider: 'Open-Meteo Synoptic & Upper-Air Assimilation (ECMWF / GFS / ICON) + RainViewer Radar',
            updatedAt: new Date().toISOString(),
          },
        };

        cachedPayload = payload;
        cachedAt = Date.now();
        return payload;
      })().finally(() => {
        inFlightPromise = null;
      });
    }

    const data = await inFlightPromise;
    return NextResponse.json(data);
  } catch (err: any) {
    if (cachedPayload) {
      return NextResponse.json({ ...cachedPayload, staleFallback: true });
    }
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Unable to synchronize Western Disturbance synoptic telemetry',
        officialAdvisories: OFFICIAL_WD_AGENCY_SOURCES,
        historicalRecords: HISTORICAL_WD_RECORDS,
        dataSources: WD_VERIFIED_DATA_SOURCES,
      },
      { status: 503 }
    );
  }
}
