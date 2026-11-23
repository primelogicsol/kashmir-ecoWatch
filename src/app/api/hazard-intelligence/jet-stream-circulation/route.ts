import { NextResponse } from 'next/server';
import {
  JET_CIRCULATION_SECTORS,
  MERIDIONAL_JET_TRANSECT,
  HISTORICAL_CIRCULATION_RECORDS,
  JetSectorLiveRecord,
  JetSubRegion,
} from '@/data/hazard-jet-stream-circulation';

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

export async function GET(request: Request) {
  const now = new Date();
  const nowMs = now.getTime();
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === '1';

  if (!forceRefresh && cachedPayload && nowMs - cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cachedPayload);
  }

  try {
    const allLats = [
      ...MERIDIONAL_JET_TRANSECT.map((t) => t.latitude),
      ...JET_CIRCULATION_SECTORS.map((s) => s.latitude),
    ].join(',');
    const allLngs = [
      ...MERIDIONAL_JET_TRANSECT.map((t) => t.longitude),
      ...JET_CIRCULATION_SECTORS.map((s) => s.longitude),
    ].join(',');

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${allLats}&longitude=${allLngs}&current=pressure_msl,wind_speed_10m,wind_gusts_10m&hourly=wind_speed_250hPa,wind_direction_250hPa,wind_speed_300hPa,wind_speed_500hPa,geopotential_height_500hPa,temperature_500hPa&daily=wind_gusts_10m_max&timezone=GMT&past_days=2&forecast_days=7`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' }).finally(() =>
      clearTimeout(timeout)
    );
    if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
    const raw = await res.json();
    const list = Array.isArray(raw) ? raw : [raw];

    const tCount = MERIDIONAL_JET_TRANSECT.length;
    const transectRaw = list.slice(0, tCount);
    const sectorsRaw = list.slice(tCount);

    // 1. Meridional Jet Profile (26°N to 38°N at 75°E)
    const meridionalProfile = MERIDIONAL_JET_TRANSECT.map((pt, i) => {
      const d = transectRaw[i] || {};
      const hourly = d.hourly || {};
      const hIdx = parseGmtIndex(hourly.time || [], nowMs);
      const jet250 = Number((hourly.wind_speed_250hPa?.[hIdx] ?? 95).toFixed(1));
      const jet300 = Number((hourly.wind_speed_300hPa?.[hIdx] ?? 85).toFixed(1));
      const z500 = Math.round(Number(hourly.geopotential_height_500hPa?.[hIdx] ?? 5760));
      const t500 = Number((hourly.temperature_500hPa?.[hIdx] ?? -14).toFixed(1));
      return {
        ...pt,
        latLabel: `${pt.latitude}°N`,
        jet250_kmh: jet250,
        jet300_kmh: jet300,
        z500_gpm: z500,
        temp500_c: t500,
      };
    });

    const coreNode = meridionalProfile.reduce(
      (best, cur) => (cur.jet250_kmh > best.jet250_kmh ? cur : best),
      meridionalProfile[0]
    );

    // 2. 24 Regional Circulation Sectors
    const sectors: JetSectorLiveRecord[] = JET_CIRCULATION_SECTORS.map((sec, i) => {
      const d = sectorsRaw[i] || {};
      const cur = d.current || {};
      const hourly = d.hourly || {};
      const daily = d.daily || {};
      const hIdx = parseGmtIndex(hourly.time || [], nowMs);
      const prev24Idx = Math.max(0, hIdx - 24);

      const jet250 = Number((hourly.wind_speed_250hPa?.[hIdx] ?? 100).toFixed(1));
      const dir250 = Math.round(Number(hourly.wind_direction_250hPa?.[hIdx] ?? 265));
      const jet300 = Number((hourly.wind_speed_300hPa?.[hIdx] ?? 90).toFixed(1));
      const w500 = Number((hourly.wind_speed_500hPa?.[hIdx] ?? 55).toFixed(1));
      const z500 = Math.round(Number(hourly.geopotential_height_500hPa?.[hIdx] ?? 5780));
      const z500Prev = Math.round(Number(hourly.geopotential_height_500hPa?.[prev24Idx] ?? z500));
      const zDelta = z500 - z500Prev;
      const t500 = Number((hourly.temperature_500hPa?.[hIdx] ?? -14).toFixed(1));
      const pMsl = Number((cur.pressure_msl ?? 1018).toFixed(1));
      const sfcWind = Number((cur.wind_speed_10m ?? 8).toFixed(1));
      const sfcGust = Number((cur.wind_gusts_10m ?? 18).toFixed(1));
      const shear = Number(Math.max(0, jet250 - sfcWind).toFixed(1));

      const futureJet250 = (hourly.wind_speed_250hPa || []).slice(hIdx).filter((v: any) => typeof v === 'number');
      const futureZ500 = (hourly.geopotential_height_500hPa || []).slice(hIdx).filter((v: any) => typeof v === 'number');
      const dGusts = (daily.wind_gusts_10m_max || []).slice(2).filter((v: any) => typeof v === 'number');

      let circulationRegime: JetSectorLiveRecord['circulationRegime'] = 'Moderate Zonal Westerlies';
      if (z500 < 5650 || zDelta <= -35) {
        circulationRegime = '500 hPa Cyclonic Trough';
      } else if (jet250 >= 130) {
        circulationRegime = 'Jet Core Overhead (>130 km/h)';
      } else if (z500 >= 5800) {
        circulationRegime = 'Upper-Level Blocking Ridge';
      }

      return {
        ...sec,
        liveUpperAir: {
          jet250_kmh: jet250,
          jet250_dir_deg: dir250,
          jet300_kmh: jet300,
          wind500_kmh: w500,
          z500_gpm: z500,
          z500_24h_delta_gpm: zDelta,
          temp500_c: t500,
          pressure_msl_hpa: pMsl,
          surface_gust_kmh: sfcGust,
          vertical_shear_kmh: shear,
        },
        forecast7d: {
          peak_jet250_kmh: futureJet250.length ? Math.round(Math.max(...futureJet250)) : Math.round(jet250),
          min_z500_gpm: futureZ500.length ? Math.round(Math.min(...futureZ500)) : z500,
          max_z500_gpm: futureZ500.length ? Math.round(Math.max(...futureZ500)) : z500,
          peak_surface_gust_kmh: dGusts.length ? Number(Math.max(...dGusts).toFixed(1)) : sfcGust,
        },
        circulationRegime,
      };
    });

    const subRegions: JetSubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];
    const regionalSummaries = subRegions.map((sr) => {
      const grp = sectors.filter((s) => s.subRegion === sr);
      return {
        subRegion: sr,
        sectors: grp.length,
        maxJet250Kmh: Math.round(Math.max(...grp.map((g) => g.liveUpperAir.jet250_kmh))),
        meanZ500Gpm: Math.round(grp.reduce((a, g) => a + g.liveUpperAir.z500_gpm, 0) / grp.length),
        meanTemp500C: Number((grp.reduce((a, g) => a + g.liveUpperAir.temp500_c, 0) / grp.length).toFixed(1)),
      };
    });

    const meanZ500 = Math.round(sectors.reduce((s, c) => s + c.liveUpperAir.z500_gpm, 0) / sectors.length);
    const troughCount = sectors.filter((s) => s.circulationRegime === '500 hPa Cyclonic Trough').length;
    const ridgeCount = sectors.filter((s) => s.circulationRegime === 'Upper-Level Blocking Ridge').length;

    const payload = {
      success: true,
      circulationSummary: {
        jetCoreLatitude: `${coreNode.latitude}°N (${coreNode.label.split('·')[1]?.trim() || coreNode.label})`,
        jetCoreSpeedKmh: coreNode.jet250_kmh,
        mean500hPaHeightGpm: meanZ500,
        troughSectorCount: troughCount,
        ridgeSectorCount: ridgeCount,
        dominantPattern:
          troughCount > ridgeCount
            ? 'Baroclinic 500 hPa Trough Amplification'
            : ridgeCount > sectors.length / 2
              ? 'Upper-Tropospheric Subtropical Ridge Dominance'
              : 'Zonal Subtropical Westerly Jet Stream Regime',
      },
      meridionalProfile,
      regionalSummaries,
      sectors,
      historicalRecords: HISTORICAL_CIRCULATION_RECORDS,
      meta: {
        totalSectors: sectors.length,
        transectPoints: meridionalProfile.length,
        provider: 'Open-Meteo Upper-Air Pressure Levels (250 hPa, 300 hPa, 500 hPa ECMWF/GFS Assimilation)',
        updatedAt: new Date().toISOString(),
      },
    };

    cachedPayload = payload;
    cachedAt = Date.now();
    return NextResponse.json(payload);
  } catch (err: any) {
    if (cachedPayload) return NextResponse.json({ ...cachedPayload, staleFallback: true });
    return NextResponse.json(
      { success: false, error: err?.message || 'Unable to sync Jet Stream telemetry', historicalRecords: HISTORICAL_CIRCULATION_RECORDS },
      { status: 503 }
    );
  }
}
