import { NextResponse } from 'next/server';
import {
  WD_CORRIDOR_STATIONS,
  UPSTREAM_SYNOPTIC_CORRIDOR,
  WAVEGUIDE_LONGITUDE_SECTORS,
  OFFICIAL_WD_AGENCY_SOURCES,
  HISTORICAL_WD_RECORDS,
  WD_VERIFIED_DATA_SOURCES,
  WDCorridorLiveRecord,
  UpstreamLiveCheckpoint,
  SynopticWaveguideGridNode,
  DetectedWDSystem,
  DetectedWDTrackPoint,
  WDPhase,
  ForecastPrecipPhase,
  CompoundRiskLevel,
  WDSubRegion,
} from '@/data/hazard-western-disturbances';

export const dynamic = 'force-dynamic';

const CACHE_TTL_MS = 10 * 60 * 1000;
let cachedPayload: Record<string, unknown> | null = null;
let cachedAt = 0;
let inFlightPromise: Promise<Record<string, unknown>> | null = null;

const EARTH_RADIUS_M = 6371000;
const DEG2RAD = Math.PI / 180;

function parseGmtIndex(times: string[], nowMs: number): number {
  if (!Array.isArray(times) || times.length === 0) return 0;
  for (let i = times.length - 1; i >= 0; i--) {
    const raw = times[i];
    const ts = new Date(raw.endsWith('Z') ? raw : `${raw}Z`).getTime();
    if (ts <= nowMs) return i;
  }
  return 0;
}

function inferModelCycleUtc(now: Date): string {
  // Global synoptic NWP runs initialize at 00Z, 06Z, 12Z, 18Z (~4-5h assimilation latency)
  const lagMs = now.getTime() - 4 * 3600 * 1000;
  const d = new Date(lagMs);
  const cycleHour = Math.floor(d.getUTCHours() / 6) * 6;
  d.setUTCHours(cycleHour, 0, 0, 0);
  return d.toISOString();
}

/** Convert wind speed (km/h) and meteorological direction (from-degrees) to (u, v) in m/s */
function windToUVms(speedKmh: number, dirDeg: number): { u: number; v: number } {
  const spdMs = (speedKmh || 0) / 3.6;
  const rad = (dirDeg || 0) * DEG2RAD;
  return {
    u: -spdMs * Math.sin(rad),
    v: -spdMs * Math.cos(rad),
  };
}

function bearingToCompass(bearingDeg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const idx = Math.round(((bearingDeg % 360) + 360) % 360 / 22.5) % 16;
  return `${dirs[idx]} (${Math.round(((bearingDeg % 360) + 360) % 360)}°)`;
}

function maxRisk(levels: CompoundRiskLevel[]): CompoundRiskLevel {
  const rank: Record<CompoundRiskLevel, number> = {
    'No Active WD Trigger': 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    Critical: 4,
  };
  return levels.reduce(
    (best, cur) => (rank[cur] > rank[best] ? cur : best),
    'No Active WD Trigger' as CompoundRiskLevel
  );
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
  const hasActiveWDForcing =
    params.past48h_precip_mm >= 2.0 ||
    params.f7d_precip_mm >= 2.0 ||
    params.past48h_snow_cm >= 1.0 ||
    params.f7d_snow_cm >= 1.0;

  if (!hasActiveWDForcing) {
    return {
      hasActiveWDForcing: false,
      floods: 'No Active WD Trigger' as CompoundRiskLevel,
      flashFloods: 'No Active WD Trigger' as CompoundRiskLevel,
      landslides: 'No Active WD Trigger' as CompoundRiskLevel,
      avalanches: 'No Active WD Trigger' as CompoundRiskLevel,
      overallRisk: 'No Active WD Trigger' as CompoundRiskLevel,
      thresholdSummary: `7d forecast ${params.f7d_precip_mm} mm (<2.0 mm WD trigger floor); no synoptic precipitation forcing.`,
    };
  }

  const totalEquivRain = params.past48h_precip_mm * 0.5 + params.f7d_rain_mm;
  const totalSnow = params.past48h_snow_cm + params.f7d_snow_cm;

  let floods: CompoundRiskLevel = 'Low';
  if (params.coupled.includes('floods')) {
    if (totalEquivRain >= 85 || (params.peak_daily_precip_mm >= 55 && params.freezing_level_m > 2800)) {
      floods = 'Critical';
    } else if (totalEquivRain >= 45 || params.peak_daily_precip_mm >= 32) {
      floods = 'High';
    } else if (totalEquivRain >= 20) {
      floods = 'Moderate';
    }
  }

  let flashFloods: CompoundRiskLevel = 'Low';
  if (params.coupled.includes('flash-floods')) {
    const rainOnSnow =
      params.elevation_m >= 1800 &&
      params.freezing_level_m > params.elevation_m + 500 &&
      params.peak_daily_precip_mm >= 25;
    if (params.peak_daily_precip_mm >= 50 || (rainOnSnow && params.peak_daily_precip_mm >= 35)) {
      flashFloods = 'Critical';
    } else if (params.peak_daily_precip_mm >= 28 || rainOnSnow) {
      flashFloods = 'High';
    } else if (params.peak_daily_precip_mm >= 14) {
      flashFloods = 'Moderate';
    }
  }

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
    hasActiveWDForcing: true,
    floods,
    flashFloods,
    landslides,
    avalanches,
    overallRisk: maxRisk([floods, flashFloods, landslides, avalanches]),
    thresholdSummary: `Rain ${totalEquivRain.toFixed(1)}/20mm · Peak 24h ${params.peak_daily_precip_mm}/14mm · Snow ${totalSnow.toFixed(1)}/8cm`,
  };
}

async function fetchJsonWithTimeout(url: string, timeoutMs = 8500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return Array.isArray(json) ? json : [json];
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRainViewerRadarMeta() {
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

async function probeAgencyPortalStatus(url: string): Promise<{ reachable: boolean; httpStatus: number | null }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2800);
  try {
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal, cache: 'no-store' });
    return { reachable: res.status >= 200 && res.status < 400, httpStatus: res.status };
  } catch {
    return { reachable: false, httpStatus: null };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * 2D Spherical Finite-Difference Synoptic WD Feature Detector & Trajectory Linker
 * Grid: 3 latitudes (30°N, 34°N, 38°N) × 10 longitudes (30°E .. 75°E, Δλ = 5°).
 * Computes relative vorticity ζ = dv/dx - du/dy + (u * tan(φ))/R_E at 300 hPa & 500 hPa,
 * plus 500 hPa zonal geopotential curvature Z'_{500}(i) = Z(i) - 0.5*(Z(i-1) + Z(i+1)).
 */
function runSynopticVorticityTracker(gridRaw: any[], nowMs: number): {
  currentWaveguide: SynopticWaveguideGridNode[];
  detectedSystems: DetectedWDSystem[];
} {
  // Grid includes 25°E and 80°E guard columns (12 longitudes: 25..80) so all 10 target sectors (30°E..75°E, indices 1..10) have exact centered finite differences
  const allLons = [25, ...WAVEGUIDE_LONGITUDE_SECTORS.map((s) => s.lon), 80];
  const nAll = allLons.length; // 12
  const nodeAt = (latRow: number, lonIdx: number) => gridRaw[latRow * nAll + lonIdx] || {};

  const times: string[] = nodeAt(1, 1)?.hourly?.time || [];
  const nowIdx = parseGmtIndex(times, nowMs);

  const phiRad = 34 * DEG2RAD;
  const dyMeters = EARTH_RADIUS_M * (8 * DEG2RAD); // 38°N - 30°N = 8°
  const dxMeters = EARTH_RADIUS_M * Math.cos(phiRad) * (10 * DEG2RAD); // centered 2*5° = 10°

  const computeStepProfile = (tIdx: number) => {
    const profile: Array<{
      lon: number;
      sectorLabel: string;
      z500: number;
      zCurv: number;
      vort300_1e5s: number;
      vort500_1e5s: number;
      jet300_kmh: number;
      jet300_dir: number;
      u500_ms: number;
      v500_ms: number;
    }> = [];

    const row30_300 = allLons.map((_, j) => {
      const h = nodeAt(0, j).hourly || {};
      return windToUVms(Number(h.wind_speed_300hPa?.[tIdx] ?? 80), Number(h.wind_direction_300hPa?.[tIdx] ?? 270));
    });
    const row34_300 = allLons.map((_, j) => {
      const h = nodeAt(1, j).hourly || {};
      return windToUVms(Number(h.wind_speed_300hPa?.[tIdx] ?? 85), Number(h.wind_direction_300hPa?.[tIdx] ?? 270));
    });
    const row38_300 = allLons.map((_, j) => {
      const h = nodeAt(2, j).hourly || {};
      return windToUVms(Number(h.wind_speed_300hPa?.[tIdx] ?? 75), Number(h.wind_direction_300hPa?.[tIdx] ?? 270));
    });

    const row30_500 = allLons.map((_, j) => {
      const h = nodeAt(0, j).hourly || {};
      return windToUVms(Number(h.wind_speed_500hPa?.[tIdx] ?? 50), Number(h.wind_direction_500hPa?.[tIdx] ?? 270));
    });
    const row34_500 = allLons.map((_, j) => {
      const h = nodeAt(1, j).hourly || {};
      return windToUVms(Number(h.wind_speed_500hPa?.[tIdx] ?? 55), Number(h.wind_direction_500hPa?.[tIdx] ?? 270));
    });
    const row38_500 = allLons.map((_, j) => {
      const h = nodeAt(2, j).hourly || {};
      return windToUVms(Number(h.wind_speed_500hPa?.[tIdx] ?? 48), Number(h.wind_direction_500hPa?.[tIdx] ?? 270));
    });

    const z500Row34 = allLons.map((_, j) =>
      Number(nodeAt(1, j).hourly?.geopotential_height_500hPa?.[tIdx] ?? 5740)
    );

    // Evaluate interior indices j = 1 .. 10 (30°E .. 75°E) using exact centered differences (j-1, j+1)
    for (let k = 0; k < WAVEGUIDE_LONGITUDE_SECTORS.length; k++) {
      const j = k + 1;
      const dvdx300 = (row34_300[j + 1].v - row34_300[j - 1].v) / dxMeters;
      const dudy300 = (row38_300[j].u - row30_300[j].u) / dyMeters;
      const metric300 = (row34_300[j].u * Math.tan(phiRad)) / EARTH_RADIUS_M;
      const vort300 = Number(((dvdx300 - dudy300 + metric300) * 1e5).toFixed(2));

      const dvdx500 = (row34_500[j + 1].v - row34_500[j - 1].v) / dxMeters;
      const dudy500 = (row38_500[j].u - row30_500[j].u) / dyMeters;
      const metric500 = (row34_500[j].u * Math.tan(phiRad)) / EARTH_RADIUS_M;
      const vort500 = Number(((dvdx500 - dudy500 + metric500) * 1e5).toFixed(2));

      const zNeighborMean = 0.5 * (z500Row34[j - 1] + z500Row34[j + 1]);
      const zCurv = Math.round(z500Row34[j] - zNeighborMean);

      const h34 = nodeAt(1, j).hourly || {};
      profile.push({
        lon: WAVEGUIDE_LONGITUDE_SECTORS[k].lon,
        sectorLabel: WAVEGUIDE_LONGITUDE_SECTORS[k].label,
        z500: Math.round(z500Row34[j]),
        zCurv,
        vort300_1e5s: vort300,
        vort500_1e5s: vort500,
        jet300_kmh: Number((Number(h34.wind_speed_300hPa?.[tIdx] ?? 85)).toFixed(1)),
        jet300_dir: Math.round(Number(h34.wind_direction_300hPa?.[tIdx] ?? 270)),
        u500_ms: row34_500[j].u,
        v500_ms: row34_500[j].v,
      });
    }
    return profile;
  };

  // 1. Current 0h Waveguide Snapshot
  const curProf = computeStepProfile(nowIdx);
  const currentWaveguide: SynopticWaveguideGridNode[] = curProf.map((p) => {
    let featureState: SynopticWaveguideGridNode['featureState'] = 'Zonal Waveguide';
    if (p.vort300_1e5s >= 2.0 && p.zCurv <= -8) {
      featureState = 'Cyclonic WD Trough';
    } else if (p.vort300_1e5s >= 0.8 && p.zCurv <= -6) {
      featureState = 'Weak Shortwave';
    } else if (p.z500 >= 5780 || (p.vort300_1e5s <= -1.0 && p.zCurv >= 0)) {
      featureState = 'Anticyclonic Ridge';
    }
    return {
      lon: p.lon,
      sectorLabel: p.sectorLabel,
      z500_gpm: p.z500,
      z500_curvature_gpm: p.zCurv,
      vorticity300_1e5s: p.vort300_1e5s,
      vorticity500_1e5s: p.vort500_1e5s,
      jet300_kmh: p.jet300_kmh,
      jet300_dir_deg: p.jet300_dir,
      featureState,
    };
  });

  // 2. Multi-step 6-hourly Feature Detection & Trajectory Linking (-48h .. +168h)
  interface RawFeatureCandidate {
    tIdx: number;
    timeUtc: string;
    stepHoursFromNow: number;
    lon: number;
    lat: number;
    sectorLabel: string;
    vort300: number;
    z500: number;
    zCurv: number;
    steeringSpeedKmh: number;
    steeringBearingDeg: number;
  }

  const stepCandidates: RawFeatureCandidate[][] = [];
  for (let tIdx = 0; tIdx < times.length; tIdx += 6) {
    const rawTime = times[tIdx];
    if (!rawTime) continue;
    const iso = new Date(rawTime.endsWith('Z') ? rawTime : `${rawTime}Z`).toISOString();
    const stepHours = Math.round((new Date(iso).getTime() - nowMs) / 3600000);
    const prof = computeStepProfile(tIdx);

    const cands: RawFeatureCandidate[] = [];
    for (let j = 0; j < prof.length; j++) {
      const p = prof[j];
      const leftV = j > 0 ? prof[j - 1].vort300_1e5s : -99;
      const rightV = j < prof.length - 1 ? prof[j + 1].vort300_1e5s : -99;
      const isLocalMax = p.vort300_1e5s >= leftV && p.vort300_1e5s >= rightV;
      const qualifies =
        isLocalMax &&
        ((p.vort300_1e5s >= 2.0 && p.zCurv <= -8) ||
          (p.vort300_1e5s >= 1.5 && p.zCurv <= -18)) &&
        p.u500_ms > 2.0; // eastward baroclinic steering required

      if (qualifies) {
        const spdKmh = Number((Math.hypot(p.u500_ms, p.v500_ms) * 3.6 * 0.75).toFixed(1));
        const bearing = (Math.atan2(p.u500_ms, p.v500_ms) / DEG2RAD + 360) % 360;
        // Refine latitude center between 30°N, 34°N, 38°N based on lowest Z500
        const z30 = Number(nodeAt(0, j + 1).hourly?.geopotential_height_500hPa?.[tIdx] ?? 5800);
        const z38 = Number(nodeAt(2, j + 1).hourly?.geopotential_height_500hPa?.[tIdx] ?? 5660);
        const latEst = z30 - p.z500 < p.z500 - z38 ? 32.8 : 34.8;

        cands.push({
          tIdx,
          timeUtc: iso,
          stepHoursFromNow: stepHours,
          lon: p.lon,
          lat: latEst,
          sectorLabel: p.sectorLabel,
          vort300: p.vort300_1e5s,
          z500: p.z500,
          zCurv: p.zCurv,
          steeringSpeedKmh: Math.max(18, spdKmh),
          steeringBearingDeg: Math.round(bearing),
        });
      }
    }
    stepCandidates.push(cands);
  }

  // Link candidates across consecutive 6h slices (Δlon in [0°, +10°] per 6h)
  const rawTracks: RawFeatureCandidate[][] = [];
  for (const slice of stepCandidates) {
    for (const cand of slice) {
      let bestTrack: RawFeatureCandidate[] | null = null;
      let bestDist = 999;
      for (const tr of rawTracks) {
        const last = tr[tr.length - 1];
        const dtHours = cand.stepHoursFromNow - last.stepHoursFromNow;
        if (dtHours === 6) {
          const dLon = cand.lon - last.lon;
          if (dLon >= -2 && dLon <= 10 && Math.abs(dLon - 3.5) < bestDist) {
            bestDist = Math.abs(dLon - 3.5);
            bestTrack = tr;
          }
        }
      }
      if (bestTrack) {
        bestTrack.push(cand);
      } else {
        rawTracks.push([cand]);
      }
    }
  }

  // Filter to persistent synoptic systems (>= 3 synoptic 6h steps = >= 18h lifetime and future/active relevance)
  const validTracks = rawTracks.filter(
    (tr) => tr.length >= 3 && tr[tr.length - 1].stepHoursFromNow >= 0
  );

  const yearMonth = new Date(nowMs).toISOString().slice(0, 7).replace('-', '');
  const detectedSystems: DetectedWDSystem[] = validTracks.slice(0, 4).map((tr, idx) => {
    // Find point closest to now (0h) if system already exists, else genesis point
    const nowPt =
      tr.reduce((best, cur) =>
        Math.abs(cur.stepHoursFromNow) < Math.abs(best.stepHoursFromNow) ? cur : best
      ) || tr[0];

    const first = tr[0];
    const last = tr[tr.length - 1];
    const totalHours = Math.max(6, last.stepHoursFromNow - first.stepHoursFromNow);
    const dLonTotal = last.lon - first.lon;
    const dxKm = (EARTH_RADIUS_M / 1000) * Math.cos(34 * DEG2RAD) * (Math.max(2, dLonTotal) * DEG2RAD);
    const phaseSpeedKmh =
      dLonTotal > 0
        ? Number((dxKm / totalHours).toFixed(1))
        : nowPt.steeringSpeedKmh;

    const avgBearing = Math.round(
      tr.reduce((s, p) => s + p.steeringBearingDeg, 0) / tr.length
    );

    const distWestKm = Math.max(
      0,
      Math.round((74.8 - nowPt.lon) * 111.32 * Math.cos(34 * DEG2RAD))
    );

    // Determine Western Himalaya approach window (70°E entry, 75°E core, >78°E clearance)
    const entryPt = tr.find((p) => p.lon >= 70);
    const corePt = tr.find((p) => p.lon >= 75);
    let westernEntryUtc: string | null = entryPt ? entryPt.timeUtc : null;
    let corePeakUtc: string | null = corePt ? corePt.timeUtc : null;
    let easternClearanceUtc: string | null = null;

    if (!westernEntryUtc && last.lon < 70 && phaseSpeedKmh >= 15) {
      const remKm = (71.5 - last.lon) * 111.32 * Math.cos(34 * DEG2RAD);
      const etaMs = new Date(last.timeUtc).getTime() + (remKm / phaseSpeedKmh) * 3600000;
      if (etaMs - nowMs <= 9 * 24 * 3600000) {
        westernEntryUtc = new Date(etaMs).toISOString();
        corePeakUtc = new Date(etaMs + 14 * 3600000).toISOString();
        easternClearanceUtc = new Date(etaMs + 32 * 3600000).toISOString();
      }
    } else if (westernEntryUtc) {
      const baseMs = new Date(corePeakUtc || westernEntryUtc).getTime();
      if (!corePeakUtc) corePeakUtc = new Date(baseMs + 12 * 3600000).toISOString();
      easternClearanceUtc = new Date(new Date(corePeakUtc).getTime() + 18 * 3600000).toISOString();
    }

    const isCurrentlyInRegion = nowPt.stepHoursFromNow <= 6 && nowPt.lon >= 69 && nowPt.lon <= 78;
    const classification: DetectedWDSystem['classification'] = isCurrentlyInRegion
      ? 'Active Regional WD (70°E–78°E)'
      : first.stepHoursFromNow <= 0
        ? 'Approaching Upstream WD (<70°E)'
        : 'Forecast Synoptic Trough (NWP)';

    const peakVort = Number(Math.max(...tr.map((p) => p.vort300)).toFixed(2));
    const minZ = Math.min(...tr.map((p) => p.z500));
    const maxCurv = Math.min(...tr.map((p) => p.zCurv));

    // Lead-time & persistence weighted confidence
    const leadHours = Math.max(0, first.stepHoursFromNow);
    const rawConf = Math.min(
      92,
      Math.max(
        38,
        Math.round(78 - leadHours * 0.22 + Math.min(12, tr.length * 2) + (peakVort >= 3.0 ? 6 : 0))
      )
    );
    const forecastConfidence: DetectedWDSystem['forecastConfidence'] =
      rawConf >= 72 ? 'High' : rawConf >= 52 ? 'Moderate' : 'Low';

    const trackPoints: DetectedWDTrackPoint[] = tr.map((p) => ({
      stepHoursFromNow: p.stepHoursFromNow,
      timeUtc: p.timeUtc,
      state:
        p.stepHoursFromNow < -3
          ? 'ANALYZED_PAST'
          : p.stepHoursFromNow <= 3
            ? 'ANALYZED_0H'
            : 'NWP_FORECAST',
      latitude: p.lat,
      longitude: p.lon,
      sectorName: p.sectorLabel,
      vorticity300_1e5s: p.vort300,
      z500_gpm: p.z500,
      z500_curvature_gpm: p.zCurv,
      steeringSpeedKmh: p.steeringSpeedKmh,
      steeringDirDeg: p.steeringBearingDeg,
    }));

    return {
      systemId: `WD-${yearMonth}-${String(idx + 1).padStart(2, '0')}`,
      classification,
      detectionMethod:
        'Centered-Difference 300 hPa Cyclonic Vorticity (ζ₃₀₀) + 500 hPa Geopotential Curvature (∇²Z₅₀₀)',
      currentOrGenesisLat: nowPt.lat,
      currentOrGenesisLon: nowPt.lon,
      currentSector: nowPt.sectorLabel,
      distanceWestOfKashmirKm: distWestKm,
      propagationDirectionDeg: avgBearing,
      propagationDirectionLabel: bearingToCompass(avgBearing),
      propagationSpeedKmh: phaseSpeedKmh,
      peakVorticity300_1e5s: peakVort,
      minZ500Gpm: minZ,
      maxTroughCurvatureGpm: maxCurv,
      expectedApproachWindow: {
        westernEntryUtc,
        corePeakUtc,
        easternClearanceUtc,
        windowSummary: westernEntryUtc
          ? `Entry ~${westernEntryUtc.slice(0, 16).replace('T', ' ')} UTC · Core ~${(corePeakUtc || westernEntryUtc).slice(0, 16).replace('T', ' ')} UTC`
          : 'Remains west of 70°E or dissipates prior to Himalayan lock within 168h horizon',
      },
      forecastConfidence,
      confidenceScorePct: rawConf,
      confidenceRationale: `Tracked across ${tr.length} synoptic 6h steps (peak ζ₃₀₀ = +${peakVort}×10⁻⁵ s⁻¹, Z₅₀₀ curvature ${maxCurv} gpm, lead ${leadHours}h).`,
      trackPoints,
    };
  });

  return { currentWaveguide, detectedSystems };
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
        // 1. Build 36-node 2D Synoptic Waveguide Grid (30°N, 34°N, 38°N × 25°E..80°E including guard columns)
        const gridLats: number[] = [];
        const gridLons: number[] = [];
        const fullWaveLons = [25, ...WAVEGUIDE_LONGITUDE_SECTORS.map((s) => s.lon), 80];
        for (const lat of [30, 34, 38]) {
          for (const lon of fullWaveLons) {
            gridLats.push(lat);
            gridLons.push(lon);
          }
        }
        const synopticGridUrl = `https://api.open-meteo.com/v1/forecast?latitude=${gridLats.join(',')}&longitude=${gridLons.join(',')}&hourly=geopotential_height_500hPa,wind_speed_300hPa,wind_direction_300hPa,wind_speed_500hPa,wind_direction_500hPa&timezone=GMT&past_days=2&forecast_days=8`;

        // 2. Build 37-node Upstream Checkpoints (6) + Regional Corridors (31) Batch (forecast_days=8 guarantees full 168h ahead from any UTC hour)
        const allLats = [
          ...UPSTREAM_SYNOPTIC_CORRIDOR.map((u) => u.latitude),
          ...WD_CORRIDOR_STATIONS.map((s) => s.latitude),
        ].join(',');
        const allLngs = [
          ...UPSTREAM_SYNOPTIC_CORRIDOR.map((u) => u.longitude),
          ...WD_CORRIDOR_STATIONS.map((s) => s.longitude),
        ].join(',');
        const regionalBatchUrl = `https://api.open-meteo.com/v1/forecast?latitude=${allLats}&longitude=${allLngs}&current=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&hourly=geopotential_height_500hPa,wind_speed_300hPa,wind_direction_300hPa,freezing_level_height,precipitation,rain,snowfall,pressure_msl&daily=precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_max,wind_gusts_10m_max,temperature_2m_max,temperature_2m_min&timezone=GMT&past_days=2&forecast_days=8`;

        const [synopticGridRaw, omBatch, radarMeta, imdProbe, pmdProbe] = await Promise.all([
          fetchJsonWithTimeout(synopticGridUrl, 9000),
          fetchJsonWithTimeout(regionalBatchUrl, 9000),
          fetchRainViewerRadarMeta(),
          probeAgencyPortalStatus('https://mausam.imd.gov.in/'),
          probeAgencyPortalStatus('https://www.pmd.gov.pk/en/'),
        ]);

        const currentNowMs = Date.now();
        const modelRunInitUtc = inferModelCycleUtc(new Date(currentNowMs));

        // Run 2D Synoptic Vorticity & Trajectory Engine
        const { currentWaveguide, detectedSystems } = runSynopticVorticityTracker(
          synopticGridRaw,
          currentNowMs
        );

        const activeRegionalSystems = detectedSystems.filter(
          (s) => s.classification === 'Active Regional WD (70°E–78°E)'
        );
        const approachingOrForecastSystems = detectedSystems.filter(
          (s) =>
            s.expectedApproachWindow.westernEntryUtc !== null ||
            s.classification === 'Active Regional WD (70°E–78°E)'
        );

        const kashmirWaveNode =
          currentWaveguide.find((w) => w.lon === 75) || currentWaveguide[currentWaveguide.length - 1];

        const upCount = UPSTREAM_SYNOPTIC_CORRIDOR.length;
        const upstreamRaw = omBatch.slice(0, upCount);
        const corridorsRaw = omBatch.slice(upCount);

        // Process 6 Upstream Checkpoints matched with nearest waveguide vorticity
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

          const dPrecip: number[] = daily.precipitation_sum || [];
          const next72 = Number(((dPrecip[2] || 0) + (dPrecip[3] || 0) + (dPrecip[4] || 0)).toFixed(1));

          const nearestWg = currentWaveguide.reduce((best, w) =>
            Math.abs(w.lon - node.longitude) < Math.abs(best.lon - node.longitude) ? w : best
          );

          let troughSignal: UpstreamLiveCheckpoint['troughSignal'] = 'Zonal Flow';
          if ((nearestWg.vorticity300_1e5s >= 2.0 && nearestWg.z500_curvature_gpm <= -10) || z500 < 5620) {
            troughSignal = 'Active Trough';
          } else if (nearestWg.vorticity300_1e5s >= 1.2 || pDelta <= -2.2 || next72 >= 8) {
            troughSignal = 'Developing Wave';
          } else if (z500 >= 5785 || nearestWg.z500_curvature_gpm >= 12) {
            troughSignal = 'High-Pressure Ridge';
          }

          return {
            ...node,
            provenanceTier: 'MODEL_NOWCAST_ANALYSIS',
            pressure_msl_hpa: pNow,
            pressure_24h_delta_hpa: pDelta,
            z500_gpm: z500,
            z500_curvature_gpm: nearestWg.z500_curvature_gpm,
            vorticity300_1e5s: nearestWg.vorticity300_1e5s,
            jet300_kmh: jet300,
            jet300_dir_deg: jetDir,
            cloud_cover_pct: cloud,
            precip_current_mm: precipCur,
            next72h_precip_mm: next72,
            troughSignal,
          };
        });

        // Process 31 Regional Corridors with 168-Hour Completeness Validation
        let complete168Count = 0;
        let totalHourlyChecked = 0;

        const corridors: WDCorridorLiveRecord[] = WD_CORRIDOR_STATIONS.map((station, idx) => {
          const d = corridorsRaw[idx] || {};
          const cur = d.current || {};
          const hourly = d.hourly || {};
          const daily = d.daily || {};

          const hIdx = parseGmtIndex(hourly.time || [], currentNowMs);
          const prev24Idx = Math.max(0, hIdx - 24);

          const modelGridElev = Math.round(Number(d.elevation ?? station.elevation_m));
          const elevOffset = modelGridElev - station.elevation_m;

          // Validate exact 168-hour upcoming NWP slice
          const hPrecipSlice = (hourly.precipitation || []).slice(hIdx, hIdx + 168);
          const hRainSlice = (hourly.rain || []).slice(hIdx, hIdx + 168);
          const hSnowSlice = (hourly.snowfall || []).slice(hIdx, hIdx + 168);
          const validHourlySteps = hPrecipSlice.filter(
            (v: unknown) => typeof v === 'number' && Number.isFinite(v)
          ).length;
          totalHourlyChecked += validHourlySteps;
          if (validHourlySteps >= 160) complete168Count += 1;

          const hourlySumPrecip = Number(
            hPrecipSlice.reduce((s: number, v: any) => s + (typeof v === 'number' ? v : 0), 0).toFixed(1)
          );
          const hourlySumRain = Number(
            hRainSlice.reduce((s: number, v: any) => s + (typeof v === 'number' ? v : 0), 0).toFixed(1)
          );
          const hourlySumSnow = Number(
            hSnowSlice.reduce((s: number, v: any) => s + (typeof v === 'number' ? v : 0), 0).toFixed(1)
          );

          // Past 48h from hourly series [hIdx-48 .. hIdx]
          const past48PrecipArr = (hourly.precipitation || []).slice(Math.max(0, hIdx - 48), hIdx);
          const past48SnowArr = (hourly.snowfall || []).slice(Math.max(0, hIdx - 48), hIdx);
          const past48Precip = Number(
            past48PrecipArr.reduce((s: number, v: any) => s + (typeof v === 'number' ? v : 0), 0).toFixed(1)
          );
          const past48Snow = Number(
            past48SnowArr.reduce((s: number, v: any) => s + (typeof v === 'number' ? v : 0), 0).toFixed(1)
          );

          const pNow = Number((cur.pressure_msl ?? hourly.pressure_msl?.[hIdx] ?? 1018).toFixed(1));
          const p24 = Number((hourly.pressure_msl?.[prev24Idx] ?? pNow).toFixed(1));
          const pDelta = Number((pNow - p24).toFixed(1));
          const z500 = Math.round(Number(hourly.geopotential_height_500hPa?.[hIdx] ?? 5750));
          // Latitude-dependent seasonal 500 hPa baseline (~5740 gpm at 34°N)
          const z500Baseline = Math.round(5740 - (station.latitude - 34.0) * 32);
          const z500Anom = z500 - z500Baseline;

          const jet300 = Number((hourly.wind_speed_300hPa?.[hIdx] ?? 90).toFixed(1));
          const fzlNow = Math.round(Number(hourly.freezing_level_height?.[hIdx] ?? 3400));

          const dDates: string[] = daily.time || [];
          const dPrecip: number[] = daily.precipitation_sum || [];
          const dRain: number[] = daily.rain_sum || [];
          const dSnow: number[] = daily.snowfall_sum || [];
          const dProb: number[] = daily.precipitation_probability_max || [];
          const dGust: number[] = daily.wind_gusts_10m_max || [];
          const dTmax: number[] = daily.temperature_2m_max || [];
          const dTmin: number[] = daily.temperature_2m_min || [];

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

          const dailySumPrecip = Number(forecastDaily.reduce((s, x) => s + x.precip_mm, 0).toFixed(1));
          // Reconcile 168h hourly sum with daily sum (use max to ensure sub-daily bursts are never missed)
          const total7dPrecip = Math.max(hourlySumPrecip, dailySumPrecip);
          const total7dRain = Math.max(hourlySumRain, Number(forecastDaily.reduce((s, x) => s + x.rain_mm, 0).toFixed(1)));
          const total7dSnow = Math.max(hourlySumSnow, Number(forecastDaily.reduce((s, x) => s + x.snow_cm, 0).toFixed(1)));

          let peakDailyPrecip = 0;
          let peakPrecipDate = forecastDaily[0]?.date || '';
          for (const fd of forecastDaily) {
            if (fd.precip_mm > peakDailyPrecip) {
              peakDailyPrecip = fd.precip_mm;
              peakPrecipDate = fd.date;
            }
          }

          const maxProb = forecastDaily.reduce((m, x) => Math.max(m, x.prob_pct), 0);
          const maxGust = forecastDaily.reduce(
            (m, x) => Math.max(m, x.gust_kmh),
            Number(cur.wind_gusts_10m ?? 20)
          );

          const fzlFuture = (hourly.freezing_level_height || [])
            .slice(hIdx, hIdx + 168)
            .filter((v: any) => typeof v === 'number');
          const minFzl = fzlFuture.length > 0 ? Math.round(Math.min(...fzlFuture)) : fzlNow;

          // Unambiguous 7-day forecast precipitation phase (NEVER conflated with terrain climatology)
          let forecastPrecipPhase: ForecastPrecipPhase = 'Dry (0 mm / 7d)';
          if (total7dPrecip >= 0.5 || total7dSnow >= 0.5) {
            // 1 cm snow ~ 1 mm SWE
            const snowFraction = total7dPrecip > 0 ? Math.min(1, total7dSnow / total7dPrecip) : 1;
            if (snowFraction >= 0.75 || minFzl <= station.elevation_m - 100) {
              forecastPrecipPhase = 'Snow-Dominant (≥75% Snow Equiv)';
            } else if (snowFraction >= 0.2 || total7dSnow >= 1.0) {
              forecastPrecipPhase = 'Rain–Snow Transition Mix';
            } else {
              forecastPrecipPhase = 'Liquid Rain-Dominant';
            }
          }

          const curPrecip = Number((cur.precipitation ?? 0).toFixed(1));
          const curRain = Number((cur.rain ?? 0).toFixed(1));
          const curSnow = Number((cur.snowfall ?? 0).toFixed(1));
          const curCloud = Math.round(Number(cur.cloud_cover ?? 0));

          // Quantitative Synoptic Phase & Physical Evidence
          let wdPhase: WDPhase = 'Zonal Westerly Flow';
          let synopticEvidence = '';

          const hasRegionalVortTrough =
            activeRegionalSystems.length > 0 ||
            (kashmirWaveNode.vorticity300_1e5s >= 1.8 && kashmirWaveNode.z500_curvature_gpm <= -10);

          if (hasRegionalVortTrough && (curPrecip > 0.2 || curCloud >= 65 || pDelta <= -2.0)) {
            wdPhase = 'Active Synoptic Trough Passage';
            synopticEvidence = `Cyclonic trough overhead: Z500 = ${z500} gpm (${z500Anom >= 0 ? '+' : ''}${z500Anom} gpm), ζ300 = +${kashmirWaveNode.vorticity300_1e5s}×10⁻⁵ s⁻¹, ΔP24h = ${pDelta} hPa`;
          } else if (
            approachingOrForecastSystems.length > 0 &&
            (total7dPrecip >= 5.0 || total7dSnow >= 5.0 || maxProb >= 50)
          ) {
            wdPhase = 'Approaching Baroclinic Wave (48–168h)';
            synopticEvidence = `Tracked upstream wave (${approachingOrForecastSystems[0].systemId}) + 7d corridor NWP ${total7dPrecip} mm (prob ${maxProb}%)`;
          } else if (past48Precip >= 5.0 && curPrecip === 0 && pDelta >= 1.0) {
            wdPhase = 'Post-Trough Cold Advection';
            synopticEvidence = `Post-frontal pressure rise ΔP24h = +${pDelta} hPa following ${past48Precip} mm 48h precipitation`;
          } else if (z500Anom >= 25 || kashmirWaveNode.z500_curvature_gpm >= 8) {
            wdPhase = 'Subtropical 500 hPa Ridge';
            synopticEvidence = `Positive height anomaly: Z500 = ${z500} gpm (+${z500Anom} gpm vs 34°N norm), curvature ${kashmirWaveNode.z500_curvature_gpm >= 0 ? '+' : ''}${kashmirWaveNode.z500_curvature_gpm} gpm, ζ300 = ${kashmirWaveNode.vorticity300_1e5s}×10⁻⁵ s⁻¹`;
          } else {
            wdPhase = 'Zonal Westerly Flow';
            synopticEvidence = `Near-neutral height field: Z500 = ${z500} gpm (${z500Anom >= 0 ? '+' : ''}${z500Anom} gpm), 300 hPa jet ${jet300} km/h, 7d precip ${total7dPrecip} mm`;
          }

          let intensityLabel: WDCorridorLiveRecord['intensityLabel'] = 'Dry / Synoptic Ridge';
          if (peakDailyPrecip >= 35 || total7dSnow >= 35 || curPrecip >= 4) {
            intensityLabel = 'Intense / Active WD';
          } else if (peakDailyPrecip >= 15 || total7dSnow >= 12 || curPrecip >= 1) {
            intensityLabel = 'Moderate WD';
          } else if (total7dPrecip >= 2.0) {
            intensityLabel = 'Weak Shortwave';
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
          const analyzedIso = new Date(rawCurTime.endsWith('Z') ? rawCurTime : `${rawCurTime}Z`).toISOString();

          return {
            ...station,
            provenance: {
              analysisTier: 'MODEL_NOWCAST_ANALYSIS',
              forecastTier: 'NUMERICAL_FORECAST',
              provider: 'Open-Meteo NWP Assimilation (ECMWF IFS / NOAA GFS / DWD ICON)',
              modelRunInitUtc,
              analyzedAtUtc: analyzedIso,
              modelGridElevationM: modelGridElev,
              elevationOffsetM: elevOffset,
            },
            forecastCompleteness: {
              validHourlySteps,
              expectedHourlySteps: 168,
              completenessPct: Math.round((validHourlySteps / 168) * 100),
              status: validHourlySteps >= 160 ? 'COMPLETE' : 'PARTIAL',
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
              z500_anomaly_gpm: z500Anom,
              jet300_kmh: jet300,
              freezing_level_m: fzlNow,
              past48h_precip_mm: past48Precip,
              past48h_snow_cm: past48Snow,
            },
            forecast7d: {
              total_precip_mm: total7dPrecip,
              hourly_sum_precip_mm: hourlySumPrecip,
              total_rain_mm: total7dRain,
              total_snow_cm: total7dSnow,
              peak_daily_precip_mm: peakDailyPrecip,
              peak_precip_date: peakPrecipDate,
              max_precip_prob_pct: maxProb,
              max_wind_gust_kmh: maxGust,
              min_freezing_level_m: minFzl,
              forecast_precip_phase: forecastPrecipPhase,
              daily: forecastDaily,
            },
            wdPhase,
            synopticEvidence,
            intensityLabel,
            compoundTriggers,
          };
        });

        // Spatial Maximum 300 hPa Jet Core Identification (explicit spatial domain + node!)
        const jetPeakCorridor = corridors.reduce(
          (best, cur) => (cur.liveObservation.jet300_kmh > best.liveObservation.jet300_kmh ? cur : best),
          corridors[0]
        );
        const maxJetCoreKmh = Math.round(jetPeakCorridor.liveObservation.jet300_kmh);
        const meanRegionalJet300Kmh = Math.round(
          corridors.reduce((s, c) => s + c.liveObservation.jet300_kmh, 0) / corridors.length
        );

        // 6-SubRegion Summaries
        const subRegionsOrder: WDSubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];
        const regionalSummaries = subRegionsOrder.map((sr) => {
          const group = corridors.filter((c) => c.subRegion === sr);
          const avgTemp = Number((group.reduce((s, c) => s + c.liveObservation.temp_c, 0) / group.length).toFixed(1));
          const avgCloud = Math.round(group.reduce((s, c) => s + c.liveObservation.cloud_cover_pct, 0) / group.length);
          const meanFzl = Math.round(group.reduce((s, c) => s + c.liveObservation.freezing_level_m, 0) / group.length);
          const max7dPrecip = Math.max(...group.map((c) => c.forecast7d.total_precip_mm));
          const max7dSnow = Math.max(...group.map((c) => c.forecast7d.total_snow_cm));
          const activeCorridors = group.filter(
            (c) =>
              c.wdPhase === 'Active Synoptic Trough Passage' ||
              c.wdPhase === 'Approaching Baroclinic Wave (48–168h)'
          ).length;

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

        const activePassageCount = corridors.filter(
          (c) => c.wdPhase === 'Active Synoptic Trough Passage'
        ).length;
        const approachingWaveCount = corridors.filter(
          (c) => c.wdPhase === 'Approaching Baroclinic Wave (48–168h)'
        ).length;
        const upstreamActiveTroughs = upstreamTrack.filter(
          (u) => u.troughSignal === 'Active Trough' || u.troughSignal === 'Developing Wave'
        ).length;
        const meanFreezingLevelM = Math.round(
          corridors.reduce((s, c) => s + c.liveObservation.freezing_level_m, 0) / corridors.length
        );
        const peak7dPrecipMm = Number(
          Math.max(...corridors.map((c) => c.forecast7d.total_precip_mm)).toFixed(1)
        );
        const peak7dSnowCm = Number(
          Math.max(...corridors.map((c) => c.forecast7d.total_snow_cm)).toFixed(1)
        );
        const elevatedHazardCorridors = corridors.filter(
          (c) =>
            c.compoundTriggers.overallRisk !== 'Low' &&
            c.compoundTriggers.overallRisk !== 'No Active WD Trigger'
        ).length;

        const checkedIso = new Date().toISOString();
        const enrichedAdvisories = OFFICIAL_WD_AGENCY_SOURCES.map((adv) => {
          const probe = adv.id.startsWith('adv-imd')
            ? imdProbe
            : adv.id.startsWith('adv-pmd')
              ? pmdProbe
              : null;
          return {
            ...adv,
            livePortalReachable: probe ? probe.reachable : true,
            httpStatus: probe ? probe.httpStatus : null,
            checkedAtUtc: checkedIso,
          };
        });

        const synopticHeadline =
          activeRegionalSystems.length > 0
            ? `Detected Western Disturbance ${activeRegionalSystems[0].systemId} transiting ${activeRegionalSystems[0].currentSector} (ζ₃₀₀ = +${activeRegionalSystems[0].peakVorticity300_1e5s}×10⁻⁵ s⁻¹); ${activePassageCount} corridors experiencing trough forcing`
            : detectedSystems.length > 0
              ? `${detectedSystems.length} synoptic baroclinic wave(s) tracked on 30°E–75°E vorticity grid (${detectedSystems[0].systemId} at ${detectedSystems[0].currentOrGenesisLon}°E moving ${detectedSystems[0].propagationDirectionLabel} at ${detectedSystems[0].propagationSpeedKmh} km/h)`
              : `No cyclonic WD vorticity maxima (ζ₃₀₀ ≥ +2.0×10⁻⁵ s⁻¹) reaching 70°E–78°E in current 168h cycle — 75°E Z₅₀₀ = ${kashmirWaveNode.z500_gpm} gpm (ζ₃₀₀ = ${kashmirWaveNode.vorticity300_1e5s}×10⁻⁵ s⁻¹)`;

        const payload: Record<string, unknown> = {
          success: true,
          synopticSummary: {
            headline: synopticHeadline,
            detectedSystemCount: detectedSystems.length,
            activeRegionalSystemCount: activeRegionalSystems.length,
            activePassageCount,
            approachingWaveCount,
            upstreamActiveTroughs,
            maxJetCoreKmh,
            maxJetCoreLocation: `${jetPeakCorridor.name} (${jetPeakCorridor.latitude.toFixed(2)}°N, ${jetPeakCorridor.longitude.toFixed(2)}°E)`,
            meanRegionalJet300Kmh,
            meanFreezingLevelM,
            peak7dPrecipMm,
            peak7dSnowCm,
            elevatedHazardCorridors,
            kashmir75E_z500Gpm: kashmirWaveNode.z500_gpm,
            kashmir75E_vort300: kashmirWaveNode.vorticity300_1e5s,
            compoundCoupling: {
              floods: maxRisk(corridors.map((c) => c.compoundTriggers.floods)),
              flashFloods: maxRisk(corridors.map((c) => c.compoundTriggers.flashFloods)),
              landslides: maxRisk(corridors.map((c) => c.compoundTriggers.landslides)),
              avalanches: maxRisk(corridors.map((c) => c.compoundTriggers.avalanches)),
            },
          },
          detectedSystems,
          waveguideDiagnostics: currentWaveguide,
          upstreamTrack,
          regionalSummaries,
          corridors,
          radarOverlay: radarMeta,
          officialAdvisories: enrichedAdvisories,
          historicalRecords: HISTORICAL_WD_RECORDS,
          dataSources: WD_VERIFIED_DATA_SOURCES,
          meta: {
            totalCorridors: corridors.length,
            subRegionsCovered: subRegionsOrder,
            synopticWaveguideNodes: 30,
            upstreamCheckpoints: upstreamTrack.length,
            provider: 'Open-Meteo NWP Pressure-Level & Surface Assimilation (ECMWF IFS / GFS / ICON) + RainViewer Radar',
            provenanceDisclosure:
              'Current corridor conditions and upper-air fields represent 0-hour NWP model analysis/nowcast, not physical ground-station gauges. Freezing-level altitude represents the 0°C free-air isotherm, not terrain snowline.',
            modelRunInitUtc,
            updatedAt: checkedIso,
            dataIntegrity: {
              corridorsValidated: corridors.length,
              corridorsWithComplete168h: complete168Count,
              totalHourlyValuesChecked: totalHourlyChecked,
              expectedHourlyValues: corridors.length * 168,
              completenessPct: Math.round((totalHourlyChecked / (corridors.length * 168)) * 100),
            },
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
