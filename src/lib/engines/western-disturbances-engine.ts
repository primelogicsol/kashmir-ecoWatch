import {
  fetchOpenMeteoManagedBatch,
  safeFinite,
  roundNullable,
  aggregateNullableSeries,
  findHourlyValidIndex,
  toUtcIso,
  windSpeedDirToUVms,
  ORDERED_SUBREGIONS,
  SIX_SUBREGION_DEFINITIONS,
} from '@/lib/atmospheric-ingestion';
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
} from '@/data/hazard-western-disturbances';

const EARTH_RADIUS_M = 6371000;
const DEG2RAD = Math.PI / 180;

function bearingToCompass(bearingDeg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const idx = Math.round((((bearingDeg % 360) + 360) % 360) / 22.5) % 16;
  return `${dirs[idx]} (${Math.round(((bearingDeg % 360) + 360) % 360)}°)`;
}

function maxRisk(levels: CompoundRiskLevel[]): CompoundRiskLevel {
  const valid = levels.filter((l) => l !== 'Not Assessed');
  if (valid.length === 0) return 'Not Assessed';
  const rank: Record<CompoundRiskLevel, number> = {
    'Not Assessed': -1,
    'No Active WD Trigger': 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    Critical: 4,
  };
  return valid.reduce(
    (best, cur) => (rank[cur] > rank[best] ? cur : best),
    'No Active WD Trigger' as CompoundRiskLevel
  );
}

function evaluateCompoundTriggers(params: {
  elevation_m: number;
  past48h_precip_mm: number | null;
  past48h_snow_cm: number | null;
  f7d_precip_mm: number | null;
  f7d_rain_mm: number | null;
  f7d_snow_cm: number | null;
  peak_daily_precip_mm: number | null;
  freezing_level_m: number | null;
  max_gust_kmh: number | null;
  coupled: Array<'floods' | 'flash-floods' | 'landslides' | 'avalanches'>;
}) {
  // Missing data NEVER becomes Low or 0 -> return 'Not Assessed'
  if (params.f7d_precip_mm === null || params.peak_daily_precip_mm === null) {
    return {
      hasActiveWDForcing: false,
      floods: 'Not Assessed' as CompoundRiskLevel,
      flashFloods: 'Not Assessed' as CompoundRiskLevel,
      landslides: 'Not Assessed' as CompoundRiskLevel,
      avalanches: 'Not Assessed' as CompoundRiskLevel,
      overallRisk: 'Not Assessed' as CompoundRiskLevel,
      thresholdSummary: 'Insufficient valid 168h forecast data — hazard trigger Not Assessed.',
    };
  }

  const p48 = params.past48h_precip_mm ?? 0;
  const s48 = params.past48h_snow_cm ?? 0;
  const s7d = params.f7d_snow_cm ?? 0;
  const r7d = params.f7d_rain_mm ?? 0;

  const hasActiveWDForcing =
    p48 >= 2.0 || params.f7d_precip_mm >= 2.0 || s48 >= 1.0 || s7d >= 1.0;

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

  const totalEquivRain = p48 * 0.5 + r7d;
  const totalSnow = s48 + s7d;
  const fzl = params.freezing_level_m;
  const gust = params.max_gust_kmh ?? 0;

  let floods: CompoundRiskLevel = 'Low';
  if (params.coupled.includes('floods')) {
    if (totalEquivRain >= 85 || (params.peak_daily_precip_mm >= 55 && fzl !== null && fzl > 2800)) {
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
      fzl !== null &&
      params.elevation_m >= 1800 &&
      fzl > params.elevation_m + 500 &&
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
    const slopeMoistureLoad = p48 + params.f7d_precip_mm * 0.75;
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
    if (totalSnow >= 55 || (totalSnow >= 35 && gust >= 55)) {
      avalanches = 'Critical';
    } else if (totalSnow >= 25 || (totalSnow >= 15 && gust >= 45)) {
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

async function fetchRainViewerRadarMeta(fetchImpl: typeof fetch = fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  try {
    const res = await fetchImpl('https://api.rainviewer.com/public/weather-maps.json', {
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

async function probeAgencyPortalStatus(
  url: string,
  fetchImpl: typeof fetch = fetch
): Promise<{ reachable: boolean; httpStatus: number | null }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2800);
  try {
    const res = await fetchImpl(url, { method: 'HEAD', signal: controller.signal, cache: 'no-store' });
    return { reachable: res.status >= 200 && res.status < 400, httpStatus: res.status };
  } catch {
    return { reachable: false, httpStatus: null };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Null-Safe 2D Spherical Finite-Difference Synoptic WD Feature Detector & Trajectory Linker
 * Never substitutes fallback wind or Z500 constants! If grid fails/incomplete -> detectionStatus = 'UNAVAILABLE'.
 */
export function runSynopticVorticityTracker(
  gridRaw: any[],
  nowMs: number,
  speedUnit = 'km/h'
): {
  detectionStatus: 'OPERATIONAL' | 'UNAVAILABLE';
  currentWaveguide: SynopticWaveguideGridNode[];
  detectedSystems: DetectedWDSystem[];
} {
  const allLons = [25, ...WAVEGUIDE_LONGITUDE_SECTORS.map((s) => s.lon), 80];
  const nAll = allLons.length; // 12
  if (!Array.isArray(gridRaw) || gridRaw.length < 3 * nAll) {
    return {
      detectionStatus: 'UNAVAILABLE',
      currentWaveguide: WAVEGUIDE_LONGITUDE_SECTORS.map((s) => ({
        lon: s.lon,
        sectorLabel: s.label,
        z500_gpm: null,
        z500_curvature_gpm: null,
        vorticity300_1e5s: null,
        vorticity500_1e5s: null,
        jet300_kmh: null,
        jet300_dir_deg: null,
        featureState: 'Unavailable',
      })),
      detectedSystems: [],
    };
  }

  const nodeAt = (latRow: number, lonIdx: number) => gridRaw[latRow * nAll + lonIdx] || {};
  const times: string[] = nodeAt(1, 1)?.hourly?.time || [];
  const nowIdx = findHourlyValidIndex(times, nowMs);
  if (nowIdx < 0) {
    return {
      detectionStatus: 'UNAVAILABLE',
      currentWaveguide: WAVEGUIDE_LONGITUDE_SECTORS.map((s) => ({
        lon: s.lon,
        sectorLabel: s.label,
        z500_gpm: null,
        z500_curvature_gpm: null,
        vorticity300_1e5s: null,
        vorticity500_1e5s: null,
        jet300_kmh: null,
        jet300_dir_deg: null,
        featureState: 'Unavailable',
      })),
      detectedSystems: [],
    };
  }

  const phiRad = 34 * DEG2RAD;
  const dyMeters = EARTH_RADIUS_M * (8 * DEG2RAD);
  const dxMeters = EARTH_RADIUS_M * Math.cos(phiRad) * (10 * DEG2RAD);

  const computeStepProfile = (tIdx: number) => {
    const row30_300 = allLons.map((_, j) => {
      const h = nodeAt(0, j).hourly || {};
      return windSpeedDirToUVms(safeFinite(h.wind_speed_300hPa?.[tIdx]), safeFinite(h.wind_direction_300hPa?.[tIdx]), speedUnit);
    });
    const row34_300 = allLons.map((_, j) => {
      const h = nodeAt(1, j).hourly || {};
      return windSpeedDirToUVms(safeFinite(h.wind_speed_300hPa?.[tIdx]), safeFinite(h.wind_direction_300hPa?.[tIdx]), speedUnit);
    });
    const row38_300 = allLons.map((_, j) => {
      const h = nodeAt(2, j).hourly || {};
      return windSpeedDirToUVms(safeFinite(h.wind_speed_300hPa?.[tIdx]), safeFinite(h.wind_direction_300hPa?.[tIdx]), speedUnit);
    });

    const row30_500 = allLons.map((_, j) => {
      const h = nodeAt(0, j).hourly || {};
      return windSpeedDirToUVms(safeFinite(h.wind_speed_500hPa?.[tIdx]), safeFinite(h.wind_direction_500hPa?.[tIdx]), speedUnit);
    });
    const row34_500 = allLons.map((_, j) => {
      const h = nodeAt(1, j).hourly || {};
      return windSpeedDirToUVms(safeFinite(h.wind_speed_500hPa?.[tIdx]), safeFinite(h.wind_direction_500hPa?.[tIdx]), speedUnit);
    });
    const row38_500 = allLons.map((_, j) => {
      const h = nodeAt(2, j).hourly || {};
      return windSpeedDirToUVms(safeFinite(h.wind_speed_500hPa?.[tIdx]), safeFinite(h.wind_direction_500hPa?.[tIdx]), speedUnit);
    });

    const z500Row34 = allLons.map((_, j) =>
      safeFinite(nodeAt(1, j).hourly?.geopotential_height_500hPa?.[tIdx])
    );

    return WAVEGUIDE_LONGITUDE_SECTORS.map((sec, k) => {
      const j = k + 1;
      const wL300 = row34_300[j - 1];
      const wR300 = row34_300[j + 1];
      const wC300 = row34_300[j];
      const wS300 = row30_300[j];
      const wN300 = row38_300[j];

      let vort300: number | null = null;
      if (wL300 && wR300 && wC300 && wS300 && wN300) {
        const dvdx = (wR300.v - wL300.v) / dxMeters;
        const dudy = (wN300.u - wS300.u) / dyMeters;
        const metric = (wC300.u * Math.tan(phiRad)) / EARTH_RADIUS_M;
        vort300 = Number(((dvdx - dudy + metric) * 1e5).toFixed(2));
      }

      const wL500 = row34_500[j - 1];
      const wR500 = row34_500[j + 1];
      const wC500 = row34_500[j];
      const wS500 = row30_500[j];
      const wN500 = row38_500[j];

      let vort500: number | null = null;
      if (wL500 && wR500 && wC500 && wS500 && wN500) {
        const dvdx = (wR500.v - wL500.v) / dxMeters;
        const dudy = (wN500.u - wS500.u) / dyMeters;
        const metric = (wC500.u * Math.tan(phiRad)) / EARTH_RADIUS_M;
        vort500 = Number(((dvdx - dudy + metric) * 1e5).toFixed(2));
      }

      const zC = z500Row34[j];
      const zL = z500Row34[j - 1];
      const zR = z500Row34[j + 1];
      const zCurv =
        zC !== null && zL !== null && zR !== null
          ? Math.round(zC - 0.5 * (zL + zR))
          : null;

      const h34 = nodeAt(1, j).hourly || {};
      const rawJet = safeFinite(h34.wind_speed_300hPa?.[tIdx]);
      const jet300_kmh =
        rawJet === null
          ? null
          : Number((speedUnit === 'm/s' ? rawJet * 3.6 : rawJet).toFixed(1));

      return {
        lon: sec.lon,
        sectorLabel: sec.label,
        z500: zC !== null ? Math.round(zC) : null,
        zCurv,
        vort300_1e5s: vort300,
        vort500_1e5s: vort500,
        jet300_kmh,
        jet300_dir: roundNullable(h34.wind_direction_300hPa?.[tIdx], 0),
        u500_ms: wC500 ? wC500.u : null,
        v500_ms: wC500 ? wC500.v : null,
      };
    });
  };

  const curProf = computeStepProfile(nowIdx);
  const validNowNodes = curProf.filter((p) => p.vort300_1e5s !== null && p.z500 !== null).length;
  if (validNowNodes < 8) {
    return {
      detectionStatus: 'UNAVAILABLE',
      currentWaveguide: curProf.map((p) => ({
        lon: p.lon,
        sectorLabel: p.sectorLabel,
        z500_gpm: p.z500,
        z500_curvature_gpm: p.zCurv,
        vorticity300_1e5s: p.vort300_1e5s,
        vorticity500_1e5s: p.vort500_1e5s,
        jet300_kmh: p.jet300_kmh,
        jet300_dir_deg: p.jet300_dir,
        featureState: 'Unavailable',
      })),
      detectedSystems: [],
    };
  }

  const currentWaveguide: SynopticWaveguideGridNode[] = curProf.map((p) => {
    if (p.vort300_1e5s === null || p.z500 === null || p.zCurv === null) {
      return {
        lon: p.lon,
        sectorLabel: p.sectorLabel,
        z500_gpm: p.z500,
        z500_curvature_gpm: p.zCurv,
        vorticity300_1e5s: p.vort300_1e5s,
        vorticity500_1e5s: p.vort500_1e5s,
        jet300_kmh: p.jet300_kmh,
        jet300_dir_deg: p.jet300_dir,
        featureState: 'Unavailable',
      };
    }
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
    const iso = toUtcIso(times[tIdx]);
    if (!iso) continue;
    const stepHours = Math.round((new Date(iso).getTime() - nowMs) / 3600000);
    const prof = computeStepProfile(tIdx);

    const cands: RawFeatureCandidate[] = [];
    for (let j = 0; j < prof.length; j++) {
      const p = prof[j];
      if (p.vort300_1e5s === null || p.z500 === null || p.zCurv === null || p.u500_ms === null || p.v500_ms === null) {
        continue;
      }
      const leftV = j > 0 && prof[j - 1].vort300_1e5s !== null ? prof[j - 1].vort300_1e5s! : -99;
      const rightV = j < prof.length - 1 && prof[j + 1].vort300_1e5s !== null ? prof[j + 1].vort300_1e5s! : -99;
      const isLocalMax = p.vort300_1e5s >= leftV && p.vort300_1e5s >= rightV;
      const qualifies =
        isLocalMax &&
        ((p.vort300_1e5s >= 2.0 && p.zCurv <= -8) || (p.vort300_1e5s >= 1.5 && p.zCurv <= -18)) &&
        p.u500_ms > 2.0;

      if (qualifies) {
        const spdKmh = Number((Math.hypot(p.u500_ms, p.v500_ms) * 3.6 * 0.75).toFixed(1));
        const bearing = (Math.atan2(p.u500_ms, p.v500_ms) / DEG2RAD + 360) % 360;
        const z30 = safeFinite(nodeAt(0, j + 1).hourly?.geopotential_height_500hPa?.[tIdx]);
        const z38 = safeFinite(nodeAt(2, j + 1).hourly?.geopotential_height_500hPa?.[tIdx]);
        const latEst = z30 !== null && z38 !== null && z30 - p.z500 < p.z500 - z38 ? 32.8 : 34.8;

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
          steeringSpeedKmh: Math.max(15, spdKmh),
          steeringBearingDeg: Math.round(bearing),
        });
      }
    }
    stepCandidates.push(cands);
  }

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
      if (bestTrack) bestTrack.push(cand);
      else rawTracks.push([cand]);
    }
  }

  const validTracks = rawTracks.filter(
    (tr) => tr.length >= 3 && tr[tr.length - 1].stepHoursFromNow >= 0
  );

  const yearMonth = new Date(nowMs).toISOString().slice(0, 7).replace('-', '');
  const detectedSystems: DetectedWDSystem[] = validTracks.slice(0, 4).map((tr, idx) => {
    const nowPt = tr.reduce((best, cur) =>
      Math.abs(cur.stepHoursFromNow) < Math.abs(best.stepHoursFromNow) ? cur : best
    );
    const first = tr[0];
    const last = tr[tr.length - 1];
    const totalHours = Math.max(6, last.stepHoursFromNow - first.stepHoursFromNow);
    const dLonTotal = last.lon - first.lon;
    const dxKm = (EARTH_RADIUS_M / 1000) * Math.cos(34 * DEG2RAD) * (Math.max(2, dLonTotal) * DEG2RAD);
    const phaseSpeedKmh =
      dLonTotal > 0 ? Number((dxKm / totalHours).toFixed(1)) : nowPt.steeringSpeedKmh;
    const avgBearing = Math.round(tr.reduce((s, p) => s + p.steeringBearingDeg, 0) / tr.length);
    const distWestKm = Math.max(0, Math.round((74.8 - nowPt.lon) * 111.32 * Math.cos(34 * DEG2RAD)));

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
    const leadHours = Math.max(0, first.stepHoursFromNow);
    const rawConf = Math.min(
      92,
      Math.max(38, Math.round(78 - leadHours * 0.22 + Math.min(12, tr.length * 2) + (peakVort >= 3.0 ? 6 : 0)))
    );

    return {
      systemId: `WD-${yearMonth}-${String(idx + 1).padStart(2, '0')}`,
      classification,
      detectionMethod: 'Centered-Difference 300 hPa Cyclonic Vorticity (ζ₃₀₀) + 500 hPa Geopotential Curvature (∇²Z₅₀₀)',
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
      forecastConfidence: rawConf >= 72 ? 'High' : rawConf >= 52 ? 'Moderate' : 'Low',
      confidenceScorePct: rawConf,
      confidenceRationale: `Tracked across ${tr.length} synoptic 6h steps (peak ζ₃₀₀ = +${peakVort}×10⁻⁵ s⁻¹, Z₅₀₀ curvature ${maxCurv} gpm, lead ${leadHours}h).`,
      trackPoints: tr.map((p): DetectedWDTrackPoint => ({
        stepHoursFromNow: p.stepHoursFromNow,
        timeUtc: p.timeUtc,
        state: p.stepHoursFromNow < -3 ? 'ANALYZED_PAST' : p.stepHoursFromNow <= 3 ? 'ANALYZED_0H' : 'NWP_FORECAST',
        latitude: p.lat,
        longitude: p.lon,
        sectorName: p.sectorLabel,
        vorticity300_1e5s: p.vort300,
        z500_gpm: p.z500,
        z500_curvature_gpm: p.zCurv,
        steeringSpeedKmh: p.steeringSpeedKmh,
        steeringDirDeg: p.steeringBearingDeg,
      })),
    };
  });

  return { detectionStatus: 'OPERATIONAL', currentWaveguide, detectedSystems };
}

export interface BuildWDPayloadOptions {
  forceRefresh?: boolean;
  nowMs?: number;
  fetchImpl?: typeof fetch;
}

export async function buildWesternDisturbancesPayload(opts: BuildWDPayloadOptions = {}) {
  const currentNowMs = opts.nowMs ?? Date.now();
  const fetchFn = opts.fetchImpl || fetch;

  // 1. 36-node 2D Synoptic Waveguide Grid (30°N, 34°N, 38°N × 25°E..80°E)
  const gridLats: number[] = [];
  const gridLons: number[] = [];
  const fullWaveLons = [25, ...WAVEGUIDE_LONGITUDE_SECTORS.map((s) => s.lon), 80];
  for (const lat of [30, 34, 38]) {
    for (const lon of fullWaveLons) {
      gridLats.push(lat);
      gridLons.push(lon);
    }
  }

  // 2. 37-node Upstream Checkpoints (6) + Regional Corridors (31)
  const allLats = [
    ...UPSTREAM_SYNOPTIC_CORRIDOR.map((u) => u.latitude),
    ...WD_CORRIDOR_STATIONS.map((s) => s.latitude),
  ];
  const allLngs = [
    ...UPSTREAM_SYNOPTIC_CORRIDOR.map((u) => u.longitude),
    ...WD_CORRIDOR_STATIONS.map((s) => s.longitude),
  ];

  const [synopticBatch, regionalBatch, radarMeta, imdProbe, pmdProbe] = await Promise.all([
    fetchOpenMeteoManagedBatch({
      sourceName: 'Open-Meteo Synoptic Waveguide Pressure-Level Grid',
      modelName: 'ECMWF IFS 0.25° / NOAA GFS / DWD ICON Seamless',
      provenanceClass: 'Model Analysis',
      latitudes: gridLats,
      longitudes: gridLons,
      queryParams: {
        hourly: 'geopotential_height_500hPa,wind_speed_300hPa,wind_direction_300hPa,wind_speed_500hPa,wind_direction_500hPa',
        timezone: 'GMT',
        past_days: 2,
        forecast_days: 8,
      },
      expectedUnits: {
        geopotential_height_500hPa: ['m'],
        wind_speed_300hPa: ['km/h', 'm/s'],
        wind_direction_300hPa: ['°'],
      },
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
    fetchOpenMeteoManagedBatch({
      sourceName: 'Open-Meteo Western Himalayan 31-Corridor Forecast & Analysis Grid',
      modelName: 'ECMWF IFS / NOAA GFS / DWD ICON Seamless',
      provenanceClass: 'Forecast',
      latitudes: allLats,
      longitudes: allLngs,
      queryParams: {
        current: 'temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code',
        hourly: 'geopotential_height_500hPa,wind_speed_300hPa,wind_direction_300hPa,freezing_level_height,precipitation,rain,snowfall,pressure_msl',
        daily: 'precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_max,wind_gusts_10m_max,temperature_2m_max,temperature_2m_min',
        timezone: 'GMT',
        past_days: 2,
        forecast_days: 8,
      },
      expectedUnits: {
        temperature_2m: ['°C'],
        precipitation: ['mm'],
        snowfall: ['cm'],
        freezing_level_height: ['m'],
        geopotential_height_500hPa: ['m'],
        wind_speed_300hPa: ['km/h', 'm/s'],
      },
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
    fetchRainViewerRadarMeta(fetchFn),
    probeAgencyPortalStatus('https://mausam.imd.gov.in/', fetchFn),
    probeAgencyPortalStatus('https://www.pmd.gov.pk/en/', fetchFn),
  ]);

  if (!regionalBatch.ok) {
    return {
      httpStatus: 503,
      body: {
        success: false,
        error: regionalBatch.error || 'Regional corridor NWP ingestion failed',
        sourceEnvelopes: {
          synopticGrid: synopticBatch.envelope,
          regionalCorridors: regionalBatch.envelope,
        },
        officialAdvisories: OFFICIAL_WD_AGENCY_SOURCES,
        historicalRecords: HISTORICAL_WD_RECORDS,
        dataSources: WD_VERIFIED_DATA_SOURCES,
      },
    };
  }

  const speedUnit = synopticBatch.envelope.responseUnits.wind_speed_300hPa || 'km/h';
  const tracker = synopticBatch.ok
    ? runSynopticVorticityTracker(synopticBatch.items, currentNowMs, speedUnit)
    : runSynopticVorticityTracker([], currentNowMs, speedUnit);

  const { detectionStatus, currentWaveguide, detectedSystems } = tracker;
  const activeRegionalSystems = detectedSystems.filter(
    (s) => s.classification === 'Active Regional WD (70°E–78°E)'
  );
  const approachingOrForecastSystems = detectedSystems.filter(
    (s) => s.expectedApproachWindow.westernEntryUtc !== null || s.classification === 'Active Regional WD (70°E–78°E)'
  );
  const kashmirWaveNode =
    currentWaveguide.find((w) => w.lon === 75) || currentWaveguide[currentWaveguide.length - 1];

  const upCount = UPSTREAM_SYNOPTIC_CORRIDOR.length;
  const upstreamRaw = regionalBatch.items.slice(0, upCount);
  const corridorsRaw = regionalBatch.items.slice(upCount);
  const modelRunInitUtc = regionalBatch.envelope.initializationTimeUtc;

  const upstreamTrack: UpstreamLiveCheckpoint[] = UPSTREAM_SYNOPTIC_CORRIDOR.map((node, idx) => {
    const d = upstreamRaw[idx];
    if (!d) {
      return {
        ...node,
        provenanceTier: 'Unavailable',
        pressure_msl_hpa: null,
        pressure_24h_delta_hpa: null,
        z500_gpm: null,
        z500_curvature_gpm: null,
        vorticity300_1e5s: null,
        jet300_kmh: null,
        jet300_dir_deg: null,
        cloud_cover_pct: null,
        precip_current_mm: null,
        next72h_precip_mm: null,
        troughSignal: 'Unavailable',
      };
    }
    const cur = d.current || {};
    const hourly = d.hourly || {};
    const daily = d.daily || {};
    const hIdx = findHourlyValidIndex(hourly.time, currentNowMs);
    const prev24Idx = Math.max(0, hIdx - 24);

    const pNow = roundNullable(cur.pressure_msl ?? hourly.pressure_msl?.[hIdx], 1);
    const p24 = hIdx >= 24 ? roundNullable(hourly.pressure_msl?.[prev24Idx], 1) : null;
    const pDelta = pNow !== null && p24 !== null ? roundNullable(pNow - p24, 1) : null;
    const z500 = hIdx >= 0 ? roundNullable(hourly.geopotential_height_500hPa?.[hIdx], 0) : null;
    const jet300 = hIdx >= 0 ? roundNullable(hourly.wind_speed_300hPa?.[hIdx], 1) : null;
    const jetDir = hIdx >= 0 ? roundNullable(hourly.wind_direction_300hPa?.[hIdx], 0) : null;
    const cloud = roundNullable(cur.cloud_cover, 0);
    const precipCur = roundNullable(cur.precipitation, 1);

    const next72Agg = aggregateNullableSeries((daily.precipitation_sum || []).slice(2, 5), 3, 1, 66);
    const nearestWg = currentWaveguide.reduce((best, w) =>
      Math.abs(w.lon - node.longitude) < Math.abs(best.lon - node.longitude) ? w : best
    );

    let troughSignal: UpstreamLiveCheckpoint['troughSignal'] = 'Unavailable';
    if (z500 !== null) {
      troughSignal = 'Zonal Flow';
      if (
        (nearestWg.vorticity300_1e5s !== null && nearestWg.z500_curvature_gpm !== null && nearestWg.vorticity300_1e5s >= 2.0 && nearestWg.z500_curvature_gpm <= -8) ||
        z500 < 5620
      ) {
        troughSignal = 'Active Trough';
      } else if (
        (nearestWg.vorticity300_1e5s !== null && nearestWg.vorticity300_1e5s >= 1.0) ||
        (pDelta !== null && pDelta <= -2.2) ||
        (next72Agg.sum !== null && next72Agg.sum >= 8)
      ) {
        troughSignal = 'Developing Wave';
      } else if (z500 >= 5785 || (nearestWg.z500_curvature_gpm !== null && nearestWg.z500_curvature_gpm >= 10)) {
        troughSignal = 'High-Pressure Ridge';
      }
    }

    return {
      ...node,
      provenanceTier: z500 !== null ? 'Model Analysis' : 'Unavailable',
      pressure_msl_hpa: pNow,
      pressure_24h_delta_hpa: pDelta,
      z500_gpm: z500,
      z500_curvature_gpm: nearestWg.z500_curvature_gpm,
      vorticity300_1e5s: nearestWg.vorticity300_1e5s,
      jet300_kmh: jet300,
      jet300_dir_deg: jetDir,
      cloud_cover_pct: cloud,
      precip_current_mm: precipCur,
      next72h_precip_mm: next72Agg.sum,
      troughSignal,
    };
  });

  let complete168Count = 0;
  let reportingCorridorCount = 0;
  let totalHourlyChecked = 0;

  const corridors: WDCorridorLiveRecord[] = WD_CORRIDOR_STATIONS.map((station, idx) => {
    const d = corridorsRaw[idx];
    if (!d || !d.hourly) {
      return {
        ...station,
        isReporting: false,
        provenance: {
          analysisTier: 'Unavailable',
          forecastTier: 'Unavailable',
          provider: 'Open-Meteo NWP Assimilation',
          modelRunInitUtc,
          analyzedAtUtc: null,
          modelGridElevationM: null,
          elevationOffsetM: null,
        },
        forecastCompleteness: { validHourlySteps: 0, expectedHourlySteps: 168, completenessPct: 0, status: 'UNAVAILABLE' },
        liveObservation: {
          temp_c: null, humidity_pct: null, pressure_msl_hpa: null, pressure_24h_delta_hpa: null,
          cloud_cover_pct: null, precip_current_mm: null, rain_current_mm: null, snowfall_current_cm: null,
          wind_speed_kmh: null, wind_gusts_kmh: null, wind_dir_deg: null, z500_gpm: null, z500_anomaly_gpm: null,
          jet300_kmh: null, freezing_level_m: null, past48h_precip_mm: null, past48h_snow_cm: null,
        },
        forecast7d: {
          total_precip_mm: null, hourly_sum_precip_mm: null, total_rain_mm: null, total_snow_cm: null,
          peak_daily_precip_mm: null, peak_precip_date: '', max_precip_prob_pct: null,
          max_wind_gust_kmh: null, min_freezing_level_m: null, forecast_precip_phase: 'Unavailable', daily: [],
        },
        wdPhase: 'Unavailable',
        synopticEvidence: 'Corridor model payload unavailable.',
        intensityLabel: 'Unavailable',
        compoundTriggers: {
          hasActiveWDForcing: false, floods: 'Not Assessed', flashFloods: 'Not Assessed',
          landslides: 'Not Assessed', avalanches: 'Not Assessed', overallRisk: 'Not Assessed',
          thresholdSummary: 'Corridor data unavailable — Not Assessed.',
        },
      };
    }

    const cur = d.current || {};
    const hourly = d.hourly || {};
    const daily = d.daily || {};
    const hIdx = findHourlyValidIndex(hourly.time, currentNowMs);
    const prev24Idx = Math.max(0, hIdx - 24);

    const modelGridElev = roundNullable(d.elevation, 0);
    const elevOffset = modelGridElev !== null ? modelGridElev - station.elevation_m : null;

    const hPrecipAgg = aggregateNullableSeries((hourly.precipitation || []).slice(hIdx, hIdx + 168), 168, 1, 80);
    const hRainAgg = aggregateNullableSeries((hourly.rain || []).slice(hIdx, hIdx + 168), 168, 1, 80);
    const hSnowAgg = aggregateNullableSeries((hourly.snowfall || []).slice(hIdx, hIdx + 168), 168, 1, 80);
    const fzlFutureAgg = aggregateNullableSeries((hourly.freezing_level_height || []).slice(hIdx, hIdx + 168), 168, 0, 50);

    totalHourlyChecked += hPrecipAgg.validCount;
    if (hPrecipAgg.validCount >= 168) complete168Count += 1;

    const past48PrecipAgg = aggregateNullableSeries(
      (hourly.precipitation || []).slice(Math.max(0, hIdx - 48), hIdx),
      Math.min(48, Math.max(0, hIdx)),
      1,
      75
    );
    const past48SnowAgg = aggregateNullableSeries(
      (hourly.snowfall || []).slice(Math.max(0, hIdx - 48), hIdx),
      Math.min(48, Math.max(0, hIdx)),
      1,
      75
    );

    const pNow = roundNullable(cur.pressure_msl ?? hourly.pressure_msl?.[hIdx], 1);
    const p24 = hIdx >= 24 ? roundNullable(hourly.pressure_msl?.[prev24Idx], 1) : null;
    const pDelta = pNow !== null && p24 !== null ? roundNullable(pNow - p24, 1) : null;
    const z500 = roundNullable(hourly.geopotential_height_500hPa?.[hIdx], 0);
    const z500Baseline = Math.round(5740 - (station.latitude - 34.0) * 32);
    const z500Anom = z500 !== null ? z500 - z500Baseline : null;
    const jet300 = roundNullable(hourly.wind_speed_300hPa?.[hIdx], 1);
    const fzlNow = roundNullable(hourly.freezing_level_height?.[hIdx], 0);
    const tempNow = roundNullable(cur.temperature_2m, 1);

    const dDates: string[] = daily.time || [];
    const forecastDaily = dDates.slice(2, 9).map((dt, k) => {
      const di = k + 2;
      return {
        date: dt,
        precip_mm: roundNullable(daily.precipitation_sum?.[di], 1),
        rain_mm: roundNullable(daily.rain_sum?.[di], 1),
        snow_cm: roundNullable(daily.snowfall_sum?.[di], 1),
        prob_pct: roundNullable(daily.precipitation_probability_max?.[di], 0),
        tmax_c: roundNullable(daily.temperature_2m_max?.[di], 1),
        tmin_c: roundNullable(daily.temperature_2m_min?.[di], 1),
        gust_kmh: roundNullable(daily.wind_gusts_10m_max?.[di], 1),
      };
    });

    const dailyPrecipAgg = aggregateNullableSeries(forecastDaily.map((x) => x.precip_mm), 7, 1, 80);
    const dailyRainAgg = aggregateNullableSeries(forecastDaily.map((x) => x.rain_mm), 7, 1, 80);
    const dailySnowAgg = aggregateNullableSeries(forecastDaily.map((x) => x.snow_cm), 7, 1, 80);
    const dailyProbAgg = aggregateNullableSeries(forecastDaily.map((x) => x.prob_pct), 7, 0, 50);
    const dailyGustAgg = aggregateNullableSeries(forecastDaily.map((x) => x.gust_kmh), 7, 1, 50);

    const total7dPrecip =
      hPrecipAgg.sum !== null && dailyPrecipAgg.sum !== null
        ? Math.max(hPrecipAgg.sum, dailyPrecipAgg.sum)
        : hPrecipAgg.sum ?? dailyPrecipAgg.sum;

    const total7dRain =
      hRainAgg.sum !== null && dailyRainAgg.sum !== null
        ? Math.max(hRainAgg.sum, dailyRainAgg.sum)
        : hRainAgg.sum ?? dailyRainAgg.sum;

    const total7dSnow =
      hSnowAgg.sum !== null && dailySnowAgg.sum !== null
        ? Math.max(hSnowAgg.sum, dailySnowAgg.sum)
        : hSnowAgg.sum ?? dailySnowAgg.sum;

    const peakDailyPrecip = dailyPrecipAgg.max;
    const peakPrecipDate =
      dailyPrecipAgg.maxIndex >= 0 && peakDailyPrecip !== null && peakDailyPrecip > 0
        ? forecastDaily[dailyPrecipAgg.maxIndex]?.date || ''
        : '';

    const minFzl = fzlFutureAgg.min ?? fzlNow;
    const isReporting = tempNow !== null && z500 !== null && hPrecipAgg.completenessPct >= 80;
    if (isReporting) reportingCorridorCount += 1;

    let forecastPrecipPhase: ForecastPrecipPhase = 'Unavailable';
    if (total7dPrecip !== null && total7dSnow !== null) {
      if (total7dPrecip < 0.5 && total7dSnow < 0.5) {
        forecastPrecipPhase = 'Dry (0 mm / 7d)';
      } else {
        const snowFrac = total7dPrecip > 0 ? Math.min(1, total7dSnow / total7dPrecip) : 1;
        if (snowFrac >= 0.75 || (minFzl !== null && minFzl <= station.elevation_m - 100)) {
          forecastPrecipPhase = 'Snow-Dominant (≥75% Snow Equiv)';
        } else if (snowFrac >= 0.2 || total7dSnow >= 1.0) {
          forecastPrecipPhase = 'Rain–Snow Transition Mix';
        } else {
          forecastPrecipPhase = 'Liquid Rain-Dominant';
        }
      }
    }

    const curPrecip = roundNullable(cur.precipitation, 1);
    const curCloud = roundNullable(cur.cloud_cover, 0);

    let wdPhase: WDPhase = 'Unavailable';
    let synopticEvidence = 'Upper-air height/vorticity fields unavailable.';
    if (z500 !== null && z500Anom !== null) {
      const hasRegionalVortTrough =
        detectionStatus === 'OPERATIONAL' &&
        (activeRegionalSystems.length > 0 ||
          (kashmirWaveNode.vorticity300_1e5s !== null &&
            kashmirWaveNode.z500_curvature_gpm !== null &&
            kashmirWaveNode.vorticity300_1e5s >= 1.8 &&
            kashmirWaveNode.z500_curvature_gpm <= -8));

      if (
        hasRegionalVortTrough &&
        ((curPrecip !== null && curPrecip > 0.2) || (curCloud !== null && curCloud >= 65) || (pDelta !== null && pDelta <= -2.0))
      ) {
        wdPhase = 'Active Synoptic Trough Passage';
        synopticEvidence = `Cyclonic trough overhead: Z500 = ${z500} gpm (${z500Anom >= 0 ? '+' : ''}${z500Anom} gpm), ζ300 = ${kashmirWaveNode.vorticity300_1e5s}×10⁻⁵ s⁻¹`;
      } else if (
        detectionStatus === 'OPERATIONAL' &&
        approachingOrForecastSystems.length > 0 &&
        ((total7dPrecip !== null && total7dPrecip >= 5.0) ||
          (total7dSnow !== null && total7dSnow >= 5.0) ||
          (dailyProbAgg.max !== null && dailyProbAgg.max >= 50))
      ) {
        wdPhase = 'Approaching Baroclinic Wave (48–168h)';
        synopticEvidence = `Tracked wave (${approachingOrForecastSystems[0].systemId}) + 7d NWP ${total7dPrecip ?? '—'} mm`;
      } else if (
        past48PrecipAgg.sum !== null &&
        past48PrecipAgg.sum >= 5.0 &&
        (curPrecip === null || curPrecip === 0) &&
        pDelta !== null &&
        pDelta >= 1.0
      ) {
        wdPhase = 'Post-Trough Cold Advection';
        synopticEvidence = `Post-frontal pressure rise ΔP24h = +${pDelta} hPa after ${past48PrecipAgg.sum} mm 48h precip`;
      } else if (z500Anom >= 25 || (kashmirWaveNode.z500_curvature_gpm !== null && kashmirWaveNode.z500_curvature_gpm >= 8)) {
        wdPhase = 'Subtropical 500 hPa Ridge';
        synopticEvidence = `Positive height anomaly: Z500 = ${z500} gpm (+${z500Anom} gpm vs 34°N norm), ζ300 = ${kashmirWaveNode.vorticity300_1e5s ?? '—'}×10⁻⁵ s⁻¹`;
      } else {
        wdPhase = 'Zonal Westerly Flow';
        synopticEvidence = `Z500 = ${z500} gpm (${z500Anom >= 0 ? '+' : ''}${z500Anom} gpm), 300hPa jet ${jet300 ?? '—'} km/h`;
      }
    }

    let intensityLabel: WDCorridorLiveRecord['intensityLabel'] = 'Unavailable';
    if (total7dPrecip !== null) {
      intensityLabel = 'Dry / Synoptic Ridge';
      if ((peakDailyPrecip !== null && peakDailyPrecip >= 35) || (total7dSnow !== null && total7dSnow >= 35) || (curPrecip !== null && curPrecip >= 4)) {
        intensityLabel = 'Intense / Active WD';
      } else if ((peakDailyPrecip !== null && peakDailyPrecip >= 15) || (total7dSnow !== null && total7dSnow >= 12) || (curPrecip !== null && curPrecip >= 1)) {
        intensityLabel = 'Moderate WD';
      } else if (total7dPrecip >= 2.0) {
        intensityLabel = 'Weak Shortwave';
      }
    }

    const compoundTriggers = evaluateCompoundTriggers({
      elevation_m: station.elevation_m,
      past48h_precip_mm: past48PrecipAgg.sum,
      past48h_snow_cm: past48SnowAgg.sum,
      f7d_precip_mm: total7dPrecip,
      f7d_rain_mm: total7dRain,
      f7d_snow_cm: total7dSnow,
      peak_daily_precip_mm: peakDailyPrecip,
      freezing_level_m: minFzl,
      max_gust_kmh: dailyGustAgg.max,
      coupled: station.primary_coupled_hazards,
    });

    const analyzedIso = toUtcIso(cur.time || hourly.time?.[hIdx]);

    return {
      ...station,
      isReporting,
      provenance: {
        analysisTier: isReporting ? 'Model Analysis' : 'Unavailable',
        forecastTier: hPrecipAgg.completenessPct >= 80 ? 'Forecast' : 'Unavailable',
        provider: 'Open-Meteo NWP Assimilation (ECMWF IFS / NOAA GFS / DWD ICON)',
        modelRunInitUtc,
        analyzedAtUtc: analyzedIso,
        modelGridElevationM: modelGridElev,
        elevationOffsetM: elevOffset,
      },
      forecastCompleteness: {
        validHourlySteps: hPrecipAgg.validCount,
        expectedHourlySteps: 168,
        completenessPct: hPrecipAgg.completenessPct,
        status: hPrecipAgg.validCount >= 168 ? 'COMPLETE' : hPrecipAgg.validCount > 0 ? 'PARTIAL' : 'UNAVAILABLE',
      },
      liveObservation: {
        temp_c: tempNow,
        humidity_pct: roundNullable(cur.relative_humidity_2m, 0),
        pressure_msl_hpa: pNow,
        pressure_24h_delta_hpa: pDelta,
        cloud_cover_pct: curCloud,
        precip_current_mm: curPrecip,
        rain_current_mm: roundNullable(cur.rain, 1),
        snowfall_current_cm: roundNullable(cur.snowfall, 1),
        wind_speed_kmh: roundNullable(cur.wind_speed_10m, 1),
        wind_gusts_kmh: roundNullable(cur.wind_gusts_10m, 1),
        wind_dir_deg: roundNullable(cur.wind_direction_10m, 0),
        z500_gpm: z500,
        z500_anomaly_gpm: z500Anom,
        jet300_kmh: jet300,
        freezing_level_m: fzlNow,
        past48h_precip_mm: past48PrecipAgg.sum,
        past48h_snow_cm: past48SnowAgg.sum,
      },
      forecast7d: {
        total_precip_mm: total7dPrecip,
        hourly_sum_precip_mm: hPrecipAgg.sum,
        total_rain_mm: total7dRain,
        total_snow_cm: total7dSnow,
        peak_daily_precip_mm: peakDailyPrecip,
        peak_precip_date: peakPrecipDate,
        max_precip_prob_pct: dailyProbAgg.max,
        max_wind_gust_kmh: dailyGustAgg.max,
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

  // Spatial Max 300 hPa Jet Core across reporting corridors (NEVER fallback to 95!)
  const jetCorridors = corridors.filter((c) => c.liveObservation.jet300_kmh !== null);
  const jetPeakCorridor =
    jetCorridors.length > 0
      ? jetCorridors.reduce((best, cur) =>
          (cur.liveObservation.jet300_kmh ?? -1) > (best.liveObservation.jet300_kmh ?? -1) ? cur : best
        )
      : null;

  const maxJetCoreKmh = jetPeakCorridor?.liveObservation.jet300_kmh !== undefined && jetPeakCorridor.liveObservation.jet300_kmh !== null
    ? Math.round(jetPeakCorridor.liveObservation.jet300_kmh)
    : null;
  const meanRegionalJet300Kmh = aggregateNullableSeries(
    corridors.map((c) => c.liveObservation.jet300_kmh),
    corridors.length,
    0
  ).mean;

  const meanFreezingLevelM = aggregateNullableSeries(
    corridors.map((c) => c.liveObservation.freezing_level_m),
    corridors.length,
    0
  ).mean;

  const peak7dPrecipMm = aggregateNullableSeries(
    corridors.map((c) => c.forecast7d.total_precip_mm),
    corridors.length,
    1
  ).max;

  const peak7dSnowCm = aggregateNullableSeries(
    corridors.map((c) => c.forecast7d.total_snow_cm),
    corridors.length,
    1
  ).max;

  const regionalSummaries = ORDERED_SUBREGIONS.map((sr) => {
    const group = corridors.filter((c) => c.subRegion === sr);
    const reporting = group.filter((c) => c.isReporting).length;
    return {
      subRegion: sr,
      administrativeUnit: SIX_SUBREGION_DEFINITIONS[sr].administrativeUnit,
      corridorCount: group.length,
      reportingCount: reporting,
      activeOrApproachingCount:
        detectionStatus === 'OPERATIONAL'
          ? group.filter(
              (c) =>
                c.wdPhase === 'Active Synoptic Trough Passage' ||
                c.wdPhase === 'Approaching Baroclinic Wave (48–168h)'
            ).length
          : null,
      liveAvgTempC: aggregateNullableSeries(group.map((c) => c.liveObservation.temp_c), group.length, 1).mean,
      liveAvgCloudPct: aggregateNullableSeries(group.map((c) => c.liveObservation.cloud_cover_pct), group.length, 0).mean,
      liveMeanFreezingLevelM: aggregateNullableSeries(group.map((c) => c.liveObservation.freezing_level_m), group.length, 0).mean,
      forecastMax7dPrecipMm: aggregateNullableSeries(group.map((c) => c.forecast7d.total_precip_mm), group.length, 1).max,
      forecastMax7dSnowCm: aggregateNullableSeries(group.map((c) => c.forecast7d.total_snow_cm), group.length, 1).max,
      floodRisk: maxRisk(group.map((c) => c.compoundTriggers.floods)),
      flashFloodRisk: maxRisk(group.map((c) => c.compoundTriggers.flashFloods)),
      landslideRisk: maxRisk(group.map((c) => c.compoundTriggers.landslides)),
      avalancheRisk: maxRisk(group.map((c) => c.compoundTriggers.avalanches)),
      overallRisk: maxRisk(group.map((c) => c.compoundTriggers.overallRisk)),
    };
  });

  // If vorticity detector is UNAVAILABLE, passage/system counts MUST be null ('Detection Unavailable'), NEVER 0!
  const detectedSystemCount = detectionStatus === 'OPERATIONAL' ? detectedSystems.length : null;
  const activeRegionalSystemCount = detectionStatus === 'OPERATIONAL' ? activeRegionalSystems.length : null;
  const activePassageCount =
    detectionStatus === 'OPERATIONAL'
      ? corridors.filter((c) => c.wdPhase === 'Active Synoptic Trough Passage').length
      : null;
  const approachingWaveCount =
    detectionStatus === 'OPERATIONAL'
      ? corridors.filter((c) => c.wdPhase === 'Approaching Baroclinic Wave (48–168h)').length
      : null;

  const upstreamActiveTroughs =
    detectionStatus === 'OPERATIONAL'
      ? upstreamTrack.filter((u) => u.troughSignal === 'Active Trough' || u.troughSignal === 'Developing Wave').length
      : null;

  const elevatedHazardCorridors = corridors.filter(
    (c) =>
      c.compoundTriggers.overallRisk !== 'Low' &&
      c.compoundTriggers.overallRisk !== 'No Active WD Trigger' &&
      c.compoundTriggers.overallRisk !== 'Not Assessed'
  ).length;

  const checkedIso = new Date(currentNowMs).toISOString();
  const enrichedAdvisories = OFFICIAL_WD_AGENCY_SOURCES.map((adv) => {
    const probe = adv.id.startsWith('adv-imd') ? imdProbe : adv.id.startsWith('adv-pmd') ? pmdProbe : null;
    return {
      ...adv,
      livePortalReachable: probe ? probe.reachable : true,
      httpStatus: probe ? probe.httpStatus : null,
      checkedAtUtc: checkedIso,
    };
  });

  const synopticHeadline =
    detectionStatus === 'UNAVAILABLE'
      ? 'Synoptic WD Vorticity Detection Unavailable (30°E–75°E upper-air waveguide grid incomplete) — corridor NWP forecasts active'
      : activeRegionalSystems.length > 0
        ? `Detected Western Disturbance ${activeRegionalSystems[0].systemId} transiting ${activeRegionalSystems[0].currentSector} (ζ₃₀₀ = +${activeRegionalSystems[0].peakVorticity300_1e5s}×10⁻⁵ s⁻¹); ${activePassageCount} corridors experiencing trough forcing`
        : detectedSystems.length > 0
          ? `${detectedSystems.length} synoptic baroclinic wave(s) tracked on 30°E–75°E vorticity grid (${detectedSystems[0].systemId} at ${detectedSystems[0].currentOrGenesisLon}°E moving ${detectedSystems[0].propagationDirectionLabel} at ${detectedSystems[0].propagationSpeedKmh} km/h)`
          : `No cyclonic WD vorticity maxima (ζ₃₀₀ ≥ +2.0×10⁻⁵ s⁻¹) reaching 70°E–78°E in current 168h cycle — 75°E Z₅₀₀ = ${kashmirWaveNode.z500_gpm ?? '—'} gpm (ζ₃₀₀ = ${kashmirWaveNode.vorticity300_1e5s ?? '—'}×10⁻⁵ s⁻¹)`;

  return {
    httpStatus: 200,
    body: {
      success: true,
      synopticSummary: {
        detectionStatus,
        headline: synopticHeadline,
        configuredCorridors: WD_CORRIDOR_STATIONS.length,
        reportingCorridors: reportingCorridorCount,
        detectedSystemCount,
        activeRegionalSystemCount,
        activePassageCount,
        approachingWaveCount,
        upstreamActiveTroughs,
        maxJetCoreKmh,
        maxJetCoreValidTimeUtc: jetPeakCorridor?.provenance.analyzedAtUtc || regionalBatch.envelope.validTimeUtc,
        maxJetCoreSpatialExtent: '31-Corridor Western Himalayan Grid (32.73°N–36.17°N, 73.44°E–77.58°E)',
        maxJetCoreLocation: jetPeakCorridor
          ? `${jetPeakCorridor.name} (${jetPeakCorridor.latitude.toFixed(2)}°N, ${jetPeakCorridor.longitude.toFixed(2)}°E)`
          : null,
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
      sourceEnvelopes: {
        synopticGrid: synopticBatch.envelope,
        regionalCorridors: regionalBatch.envelope,
      },
      meta: {
        configuredCorridors: WD_CORRIDOR_STATIONS.length,
        reportingCorridors: reportingCorridorCount,
        totalCorridors: corridors.length,
        subRegionsCovered: ORDERED_SUBREGIONS,
        subRegionDefinitions: SIX_SUBREGION_DEFINITIONS,
        synopticWaveguideNodes: 36,
        upstreamCheckpoints: upstreamTrack.length,
        provider: regionalBatch.envelope.sourceName,
        model: regionalBatch.envelope.model,
        freshnessStatus: regionalBatch.envelope.freshnessStatus,
        freshnessMinutes: regionalBatch.envelope.freshnessMinutes,
        provenanceDisclosure:
          'Current corridor conditions and upper-air fields represent 0-hour NWP model analysis/nowcast, not physical ground-station gauges. Freezing-level altitude represents the 0°C free-air isotherm, not terrain snowline.',
        modelRunInitUtc,
        validTimeUtc: regionalBatch.envelope.validTimeUtc,
        updatedAt: regionalBatch.envelope.fetchTimeUtc,
        dataIntegrity: {
          corridorsValidated: corridors.length,
          corridorsReporting: reportingCorridorCount,
          corridorsWithComplete168h: complete168Count,
          totalHourlyValuesChecked: totalHourlyChecked,
          expectedHourlyValues: corridors.length * 168,
          completenessPct: Math.round((totalHourlyChecked / (corridors.length * 168)) * 100),
          unitValidationPassed:
            synopticBatch.envelope.unitValidationPassed && regionalBatch.envelope.unitValidationPassed,
        },
      },
    },
  };
}
