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
  JET_CIRCULATION_SECTORS,
  SWJ_DETECTION_LATITUDES,
  SWJ_DETECTION_LONGITUDES,
  HISTORICAL_CIRCULATION_RECORDS,
  JET_VERIFIED_SOURCES,
  JetSectorLiveRecord,
  GriddedJetLatitudeBand,
  CirculationRegime,
} from '@/data/hazard-jet-stream-circulation';

/**
 * Seasonal & Latitudinal 500 hPa Geopotential Height Climatology (ERA5-calibrated for 70°E–80°E)
 * At 34°N: ~5600 gpm in mid-January (DOY 22) and ~5870 gpm in late July (DOY 205), with meridional gradient -31 gpm/degN.
 */
export function computeClimatologicalZ500Gpm(latitudeDeg: number, referenceMs: number): number {
  const d = new Date(referenceMs);
  const startOfYear = Date.UTC(d.getUTCFullYear(), 0, 1);
  const doy = Math.floor((referenceMs - startOfYear) / 86400000) + 1;
  const seasonal34N = 5735 + 135 * Math.cos((2 * Math.PI * (doy - 205)) / 365);
  const meridionalTerm = -31.0 * (latitudeDeg - 34.0);
  return Math.round(seasonal34N + meridionalTerm);
}

/**
 * Computes Subtropical Westerly Jet (SWJ) axis latitude across the 45-node 2D domain (24°N–40°N × 70°E–80°E)
 * using zonally-averaged 250 hPa westerly wind u₂₅₀(φ) + 3-point parabolic sub-grid peak interpolation.
 * Returns null ('Not Assessed') if <75% of bands have valid data or max zonal-mean u₂₅₀ < 15 m/s (54 km/h WMO jet floor).
 */
export function detectGriddedSwjAxis(bands: GriddedJetLatitudeBand[]): {
  status: 'OPERATIONAL' | 'NO_JET_CORE' | 'UNAVAILABLE';
  axisLatitudeDeg: number | null;
  axisLabel: string;
  peakZonalMeanU250Kmh: number | null;
} {
  const validBands = bands.filter((b) => b.zonalMeanU250Ms !== null);
  if (validBands.length < 7) {
    return {
      status: 'UNAVAILABLE',
      axisLatitudeDeg: null,
      axisLabel: 'Not Assessed (Insufficient 250 hPa Grid Data)',
      peakZonalMeanU250Kmh: null,
    };
  }

  let bestIdx = 0;
  let bestU = -Infinity;
  for (let i = 0; i < bands.length; i++) {
    const u = bands[i].zonalMeanU250Ms;
    if (u !== null && u > bestU) {
      bestU = u;
      bestIdx = i;
    }
  }

  const bestKmh = Number((bestU * 3.6).toFixed(1));
  if (bestU < 15.0) {
    // WMO jet stream definition requires >= 30 m/s local streak or >= 15 m/s zonal band mean
    return {
      status: 'NO_JET_CORE',
      axisLatitudeDeg: null,
      axisLabel: `Weak Upper Westerlies (<54 km/h zonal mean; peak ${bestKmh} km/h)`,
      peakZonalMeanU250Kmh: bestKmh,
    };
  }

  // Parabolic sub-grid interpolation if peak is interior (0 < bestIdx < length - 1)
  let interpLat = bands[bestIdx].latitude;
  if (bestIdx > 0 && bestIdx < bands.length - 1) {
    const uPrev = bands[bestIdx - 1].zonalMeanU250Ms;
    const uNext = bands[bestIdx + 1].zonalMeanU250Ms;
    if (uPrev !== null && uNext !== null) {
      const denom = uPrev - 2 * bestU + uNext;
      if (Math.abs(denom) > 1e-4) {
        const delta = (0.5 * (uPrev - uNext)) / denom; // in [-0.5, +0.5] grid steps (2° each)
        const clamped = Math.max(-0.5, Math.min(0.5, delta));
        interpLat = Number((bands[bestIdx].latitude + clamped * 2.0).toFixed(1));
      }
    }
  }

  const regionDesc = bands[bestIdx].label.split('·')[1]?.trim() || bands[bestIdx].label;
  return {
    status: 'OPERATIONAL',
    axisLatitudeDeg: interpLat,
    axisLabel: `${interpLat.toFixed(1)}°N (${regionDesc})`,
    peakZonalMeanU250Kmh: bestKmh,
  };
}

export interface BuildJetPayloadOptions {
  forceRefresh?: boolean;
  nowMs?: number;
  fetchImpl?: typeof fetch;
}

export async function buildJetStreamPayload(opts: BuildJetPayloadOptions = {}) {
  const nowMs = opts.nowMs ?? Date.now();
  const fetchFn = opts.fetchImpl || fetch;

  // 1. 45-node 2D Upper-Tropospheric Jet Domain (9 latitudes × 5 longitudes)
  const domLats: number[] = [];
  const domLons: number[] = [];
  for (const b of SWJ_DETECTION_LATITUDES) {
    for (const lon of SWJ_DETECTION_LONGITUDES) {
      domLats.push(b.lat);
      domLons.push(lon);
    }
  }

  const [domainBatch, sectorsBatch] = await Promise.all([
    fetchOpenMeteoManagedBatch({
      sourceName: 'Open-Meteo 45-Node 2D SWJ Detection Grid (24°N–40°N × 70°E–80°E)',
      modelName: 'ECMWF IFS 0.25° / NOAA GFS / DWD ICON Seamless',
      provenanceClass: 'Model Analysis',
      latitudes: domLats,
      longitudes: domLons,
      queryParams: {
        hourly: 'wind_speed_250hPa,wind_direction_250hPa,wind_speed_300hPa,geopotential_height_500hPa,temperature_500hPa',
        timezone: 'GMT',
        forecast_days: 2,
      },
      expectedUnits: {
        wind_speed_250hPa: ['km/h', 'm/s'],
        wind_direction_250hPa: ['°'],
        geopotential_height_500hPa: ['m'],
        temperature_500hPa: ['°C'],
      },
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
    fetchOpenMeteoManagedBatch({
      sourceName: 'Open-Meteo 24-Sector Western Himalayan Upper-Air & Shear Grid',
      modelName: 'ECMWF IFS / NOAA GFS / DWD ICON Seamless',
      provenanceClass: 'Forecast',
      latitudes: JET_CIRCULATION_SECTORS.map((s) => s.latitude),
      longitudes: JET_CIRCULATION_SECTORS.map((s) => s.longitude),
      queryParams: {
        current: 'pressure_msl,wind_speed_10m,wind_gusts_10m',
        hourly: 'wind_speed_250hPa,wind_direction_250hPa,wind_speed_300hPa,wind_speed_500hPa,geopotential_height_500hPa,temperature_500hPa',
        daily: 'wind_gusts_10m_max',
        timezone: 'GMT',
        past_days: 2,
        forecast_days: 8,
      },
      expectedUnits: {
        wind_speed_250hPa: ['km/h', 'm/s'],
        geopotential_height_500hPa: ['m'],
        temperature_500hPa: ['°C'],
      },
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
  ]);

  if (!sectorsBatch.ok) {
    return {
      httpStatus: 503,
      body: {
        success: false,
        error: sectorsBatch.error || 'Jet Stream 24-sector upper-air ingestion failed',
        sourceEnvelopes: {
          swjDomainGrid: domainBatch.envelope,
          regionalSectors: sectorsBatch.envelope,
        },
        historicalRecords: HISTORICAL_CIRCULATION_RECORDS,
        dataSources: JET_VERIFIED_SOURCES,
      },
    };
  }

  const nLon = SWJ_DETECTION_LONGITUDES.length; // 5
  const domSpeedUnit = domainBatch.envelope.responseUnits.wind_speed_250hPa || 'km/h';

  // Process 45-Node 2D Meridional × Zonal Jet Domain
  let domainPeak250Kmh: number | null = null;
  let domainPeakCoords: string | null = null;

  const meridionalProfile: GriddedJetLatitudeBand[] = SWJ_DETECTION_LATITUDES.map((band, rIdx) => {
    const uValsMs: number[] = [];
    const spd250Vals: number[] = [];
    const spd300Vals: number[] = [];
    const z500Vals: number[] = [];
    const t500Vals: number[] = [];

    if (domainBatch.ok && domainBatch.items.length >= (rIdx + 1) * nLon) {
      for (let cIdx = 0; cIdx < nLon; cIdx++) {
        const item = domainBatch.items[rIdx * nLon + cIdx] || {};
        const h = item.hourly || {};
        const hIdx = findHourlyValidIndex(h.time, nowMs);
        if (hIdx < 0) continue;

        const spd250Raw = safeFinite(h.wind_speed_250hPa?.[hIdx]);
        const dir250Raw = safeFinite(h.wind_direction_250hPa?.[hIdx]);
        const spd250Kmh = spd250Raw === null ? null : domSpeedUnit === 'm/s' ? spd250Raw * 3.6 : spd250Raw;

        if (spd250Kmh !== null && (domainPeak250Kmh === null || spd250Kmh > domainPeak250Kmh)) {
          domainPeak250Kmh = Number(spd250Kmh.toFixed(1));
          domainPeakCoords = `${band.lat}°N, ${SWJ_DETECTION_LONGITUDES[cIdx]}°E`;
        }

        const uv = windSpeedDirToUVms(spd250Raw, dir250Raw, domSpeedUnit);
        if (uv) uValsMs.push(uv.u);
        if (spd250Kmh !== null) spd250Vals.push(spd250Kmh);

        const spd300Raw = safeFinite(h.wind_speed_300hPa?.[hIdx]);
        if (spd300Raw !== null) spd300Vals.push(domSpeedUnit === 'm/s' ? spd300Raw * 3.6 : spd300Raw);

        const z500 = safeFinite(h.geopotential_height_500hPa?.[hIdx]);
        if (z500 !== null) z500Vals.push(z500);

        const t500 = safeFinite(h.temperature_500hPa?.[hIdx]);
        if (t500 !== null) t500Vals.push(t500);
      }
    }

    const zClim = computeClimatologicalZ500Gpm(band.lat, nowMs);
    const meanUms = aggregateNullableSeries(uValsMs, nLon, 2, 60).mean;
    const meanZ = aggregateNullableSeries(z500Vals, nLon, 0, 60).mean;

    return {
      latitude: band.lat,
      label: band.label,
      latLabel: `${band.lat}°N`,
      zonalMeanU250Ms: meanUms,
      zonalMeanU250Kmh: meanUms !== null ? Number((meanUms * 3.6).toFixed(1)) : null,
      zonalMeanSpeed250Kmh: aggregateNullableSeries(spd250Vals, nLon, 1, 60).mean,
      zonalMeanSpeed300Kmh: aggregateNullableSeries(spd300Vals, nLon, 1, 60).mean,
      zonalMeanZ500Gpm: meanZ,
      z500ClimatologyGpm: zClim,
      z500DepartureGpm: meanZ !== null ? Math.round(meanZ - zClim) : null,
      zonalMeanTemp500C: aggregateNullableSeries(t500Vals, nLon, 1, 60).mean,
      validLongitudesCount: uValsMs.length,
    } as GriddedJetLatitudeBand & { latLabel: string };
  });

  const swjDetection = detectGriddedSwjAxis(meridionalProfile);

  // 2. Process 24 Regional Circulation Sectors (ZERO fallback constants!)
  const secSpeedUnit = sectorsBatch.envelope.responseUnits.wind_speed_250hPa || 'km/h';
  let reportingSectorCount = 0;

  const sectors: JetSectorLiveRecord[] = JET_CIRCULATION_SECTORS.map((sec, i) => {
    const d = sectorsBatch.items[i] || {};
    const cur = d.current || {};
    const hourly = d.hourly || {};
    const daily = d.daily || {};
    const hIdx = findHourlyValidIndex(hourly.time, nowMs);
    const prev24Idx = Math.max(0, hIdx - 24);

    const raw250 = hIdx >= 0 ? safeFinite(hourly.wind_speed_250hPa?.[hIdx]) : null;
    const jet250 = raw250 === null ? null : Number((secSpeedUnit === 'm/s' ? raw250 * 3.6 : raw250).toFixed(1));
    const dir250 = hIdx >= 0 ? roundNullable(hourly.wind_direction_250hPa?.[hIdx], 0) : null;
    const uv250 = windSpeedDirToUVms(raw250, dir250, secSpeedUnit);

    const raw300 = hIdx >= 0 ? safeFinite(hourly.wind_speed_300hPa?.[hIdx]) : null;
    const jet300 = raw300 === null ? null : Number((secSpeedUnit === 'm/s' ? raw300 * 3.6 : raw300).toFixed(1));

    const raw500 = hIdx >= 0 ? safeFinite(hourly.wind_speed_500hPa?.[hIdx]) : null;
    const w500 = raw500 === null ? null : Number((secSpeedUnit === 'm/s' ? raw500 * 3.6 : raw500).toFixed(1));

    const z500 = hIdx >= 0 ? roundNullable(hourly.geopotential_height_500hPa?.[hIdx], 0) : null;
    const z500Prev = hIdx >= 24 ? roundNullable(hourly.geopotential_height_500hPa?.[prev24Idx], 0) : null;
    const zDelta = z500 !== null && z500Prev !== null ? z500 - z500Prev : null;
    const zClim = computeClimatologicalZ500Gpm(sec.latitude, nowMs);
    const zDep = z500 !== null ? z500 - zClim : null;

    const t500 = hIdx >= 0 ? roundNullable(hourly.temperature_500hPa?.[hIdx], 1) : null;
    const pMsl = roundNullable(cur.pressure_msl, 1);
    const sfcWind = roundNullable(cur.wind_speed_10m, 1);
    const sfcGust = roundNullable(cur.wind_gusts_10m, 1);
    const shear =
      jet250 !== null && sfcWind !== null ? Number(Math.max(0, jet250 - sfcWind).toFixed(1)) : null;

    const futureJetSlice = hIdx >= 0 ? (hourly.wind_speed_250hPa || []).slice(hIdx, hIdx + 168) : [];
    const futureZSlice = hIdx >= 0 ? (hourly.geopotential_height_500hPa || []).slice(hIdx, hIdx + 168) : [];
    const futureGustSlice = (daily.wind_gusts_10m_max || []).slice(2, 9);

    const fJetAgg = aggregateNullableSeries(futureJetSlice, 168, 0, 50);
    const fZAgg = aggregateNullableSeries(futureZSlice, 168, 0, 50);
    const fGustAgg = aggregateNullableSeries(futureGustSlice, 7, 1, 50);

    const isReporting = jet250 !== null && z500 !== null && fJetAgg.completenessPct >= 80;
    if (isReporting) reportingSectorCount += 1;

    // Tested Atmospheric Feature Classification using Climatological Z500 Departure
    let circulationRegime: CirculationRegime = 'Not Assessed';
    let regimeEvidence = 'Upper-tropospheric Z500 / 250 hPa fields unavailable.';
    if (z500 !== null && zDep !== null && jet250 !== null) {
      if (zDep <= -40 || (zDelta !== null && zDelta <= -40 && (t500 ?? 0) <= -18)) {
        circulationRegime = '500 hPa Cyclonic Trough';
        regimeEvidence = `Z500 = ${z500} gpm (${zDep} gpm vs ERA5 seasonal norm ${zClim} gpm; Δ24h = ${zDelta ?? '—'} gpm)`;
      } else if (jet250 >= 130) {
        circulationRegime = 'Jet Core Overhead (≥130 km/h)';
        regimeEvidence = `250 hPa wind ${jet250} km/h (≥130 km/h streak threshold); Z500 departure ${zDep >= 0 ? '+' : ''}${zDep} gpm`;
      } else if (zDep >= 60) {
        circulationRegime = 'Upper-Level Blocking Ridge';
        regimeEvidence = `Positive height anomaly: Z500 = ${z500} gpm (+${zDep} gpm above seasonal norm ${zClim} gpm)`;
      } else {
        circulationRegime = 'Moderate Zonal Westerlies';
        regimeEvidence = `Near-climatological height: Z500 = ${z500} gpm (${zDep >= 0 ? '+' : ''}${zDep} gpm vs ${zClim} gpm), 250 hPa ${jet250} km/h`;
      }
    }

    return {
      ...sec,
      isReporting,
      provenance: {
        analysisTier: isReporting ? 'Model Analysis' : 'Unavailable',
        forecastTier: fJetAgg.completenessPct >= 80 ? 'Forecast' : 'Unavailable',
        validTimeUtc: hIdx >= 0 ? toUtcIso(hourly.time?.[hIdx]) : null,
        modelGridElevationM: roundNullable(d.elevation, 0),
      },
      liveUpperAir: {
        jet250_kmh: jet250,
        jet250_dir_deg: dir250,
        u250_ms: uv250 ? Number(uv250.u.toFixed(1)) : null,
        jet300_kmh: jet300,
        wind500_kmh: w500,
        z500_gpm: z500,
        z500_climatology_gpm: zClim,
        z500_departure_gpm: zDep,
        z500_24h_delta_gpm: zDelta,
        temp500_c: t500,
        pressure_msl_hpa: pMsl,
        surface_gust_kmh: sfcGust,
        vertical_shear_kmh: shear,
      },
      forecast7d: {
        peak_jet250_kmh: fJetAgg.max !== null ? (secSpeedUnit === 'm/s' ? Math.round(fJetAgg.max * 3.6) : fJetAgg.max) : null,
        min_z500_gpm: fZAgg.min,
        max_z500_gpm: fZAgg.max,
        peak_surface_gust_kmh: fGustAgg.max,
        valid_hourly_steps: fJetAgg.validCount,
      },
      circulationRegime,
      regimeEvidence,
    };
  });

  const regionalSummaries = ORDERED_SUBREGIONS.map((sr) => {
    const grp = sectors.filter((s) => s.subRegion === sr);
    return {
      subRegion: sr,
      administrativeUnit: SIX_SUBREGION_DEFINITIONS[sr].administrativeUnit,
      sectors: grp.length,
      reportingSectors: grp.filter((s) => s.isReporting).length,
      maxJet250Kmh: aggregateNullableSeries(grp.map((g) => g.liveUpperAir.jet250_kmh), grp.length, 0).max,
      meanZ500Gpm: aggregateNullableSeries(grp.map((g) => g.liveUpperAir.z500_gpm), grp.length, 0).mean,
      meanZ500DepartureGpm: aggregateNullableSeries(grp.map((g) => g.liveUpperAir.z500_departure_gpm), grp.length, 0).mean,
      meanTemp500C: aggregateNullableSeries(grp.map((g) => g.liveUpperAir.temp500_c), grp.length, 1).mean,
    };
  });

  const sectorPeakNode = sectors
    .filter((s) => s.liveUpperAir.jet250_kmh !== null)
    .reduce<JetSectorLiveRecord | null>(
      (best, cur) =>
        !best || (cur.liveUpperAir.jet250_kmh ?? -1) > (best.liveUpperAir.jet250_kmh ?? -1) ? cur : best,
      null
    );

  const meanZ500 = aggregateNullableSeries(
    sectors.map((s) => s.liveUpperAir.z500_gpm),
    sectors.length,
    0,
    75
  ).mean;
  const meanZ500Dep = aggregateNullableSeries(
    sectors.map((s) => s.liveUpperAir.z500_departure_gpm),
    sectors.length,
    0,
    75
  ).mean;

  const assessedSectors = sectors.filter((s) => s.circulationRegime !== 'Not Assessed');
  const troughCount =
    assessedSectors.length >= 18
      ? assessedSectors.filter((s) => s.circulationRegime === '500 hPa Cyclonic Trough').length
      : null;
  const ridgeCount =
    assessedSectors.length >= 18
      ? assessedSectors.filter((s) => s.circulationRegime === 'Upper-Level Blocking Ridge').length
      : null;

  const dominantPattern =
    troughCount === null || ridgeCount === null
      ? 'Not Assessed (Upper-Air Feature Detector Incomplete)'
      : troughCount > ridgeCount && troughCount >= 4
        ? `Baroclinic 500 hPa Trough Amplification (${troughCount}/24 sectors ≤ -40 gpm departure)`
        : ridgeCount >= 10
          ? `Upper-Tropospheric Blocking Ridge Dominance (${ridgeCount}/24 sectors ≥ +60 gpm above seasonal norm)`
          : 'Zonal Subtropical Westerly Jet Stream Regime';

  return {
    httpStatus: 200,
    body: {
      success: true,
      circulationSummary: {
        configuredSectors: JET_CIRCULATION_SECTORS.length,
        reportingSectors: reportingSectorCount,
        swjDetectionStatus: swjDetection.status,
        jetCoreLatitudeDeg: swjDetection.axisLatitudeDeg,
        jetCoreLatitude: swjDetection.axisLabel,
        peakZonalMeanU250Kmh: swjDetection.peakZonalMeanU250Kmh,
        domainPeak250Kmh,
        domainPeakCoords,
        sectorMaxJet250Kmh: sectorPeakNode?.liveUpperAir.jet250_kmh ?? null,
        sectorMaxJetLocation: sectorPeakNode ? `${sectorPeakNode.name} (${sectorPeakNode.subRegion})` : null,
        jetCoreSpeedKmh: domainPeak250Kmh ?? sectorPeakNode?.liveUpperAir.jet250_kmh ?? null,
        validTimeUtc: sectorPeakNode?.provenance.validTimeUtc ?? sectorsBatch.envelope.validTimeUtc,
        mean500hPaHeightGpm: meanZ500,
        mean500hPaDepartureGpm: meanZ500Dep,
        troughSectorCount: troughCount,
        ridgeSectorCount: ridgeCount,
        dominantPattern,
      },
      meridionalProfile,
      regionalSummaries,
      sectors,
      historicalRecords: HISTORICAL_CIRCULATION_RECORDS,
      dataSources: JET_VERIFIED_SOURCES,
      sourceEnvelopes: {
        swjDomainGrid: domainBatch.envelope,
        regionalSectors: sectorsBatch.envelope,
      },
      meta: {
        configuredSectors: JET_CIRCULATION_SECTORS.length,
        reportingSectors: reportingSectorCount,
        totalSectors: sectors.length,
        swjDomainDescription: '45-node 2D grid (24°N–40°N every 2° × 70°E–80°E every 2.5°) with parabolic zonal-mean u₂₅₀ peak interpolation',
        z500FeatureThresholds: 'Cyclonic Trough: ΔZ₅₀₀ ≤ -40 gpm vs seasonal-latitudinal ERA5 norm; Blocking Ridge: ΔZ₅₀₀ ≥ +60 gpm',
        provider: sectorsBatch.envelope.sourceName,
        model: sectorsBatch.envelope.model,
        modelRunInitUtc: sectorsBatch.envelope.initializationTimeUtc,
        validTimeUtc: sectorsBatch.envelope.validTimeUtc,
        updatedAt: sectorsBatch.envelope.fetchTimeUtc,
        freshnessStatus: sectorsBatch.envelope.freshnessStatus,
        unitValidationPassed:
          domainBatch.envelope.unitValidationPassed && sectorsBatch.envelope.unitValidationPassed,
      },
    },
  };
}
