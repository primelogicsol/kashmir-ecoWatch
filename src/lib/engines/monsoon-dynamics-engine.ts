import {
  fetchOpenMeteoManagedBatch,
  safeFinite,
  roundNullable,
  aggregateNullableSeries,
  findHourlyValidIndex,
  toUtcIso,
  resolveTerrainAwareMoisture,
  SIX_SUBREGION_DEFINITIONS,
  DisplaySubRegion,
} from '@/lib/atmospheric-ingestion';
import {
  MONSOON_CORRIDOR_STATIONS,
  MOISTURE_TRANSPORT_NODES,
  HISTORICAL_MONSOON_RECORDS,
  MONSOON_VERIFIED_SOURCES,
  MonsoonCorridorLiveRecord,
  HazardLevel,
} from '@/data/hazard-monsoon-dynamics';

function maxHazard(levels: HazardLevel[]): HazardLevel {
  const valid = levels.filter((l) => l !== 'Not Assessed');
  if (valid.length === 0) return 'Not Assessed';
  const rank: Record<HazardLevel, number> = {
    'Not Assessed': -1,
    'No Active Trigger': 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    Critical: 4,
  };
  return valid.reduce(
    (best, cur) => (rank[cur] > rank[best] ? cur : best),
    'No Active Trigger' as HazardLevel
  );
}

function formatIsoDateUtc(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

export interface BuildMonsoonPayloadOptions {
  forceRefresh?: boolean;
  nowMs?: number;
  fetchImpl?: typeof fetch;
}

export async function buildMonsoonDynamicsPayload(opts: BuildMonsoonPayloadOptions = {}) {
  const nowMs = opts.nowMs ?? Date.now();
  const nowDate = new Date(nowMs);
  const monthIdx = nowDate.getUTCMonth(); // 0=Jan .. 11=Dec; Jun-Sep (5..8) = ISM climatological window
  const isMonsoonSeason = monthIdx >= 5 && monthIdx <= 8;
  const fetchFn = opts.fetchImpl || fetch;

  const allLats = [
    ...MOISTURE_TRANSPORT_NODES.map((m) => m.latitude),
    ...MONSOON_CORRIDOR_STATIONS.map((s) => s.latitude),
  ];
  const allLngs = [
    ...MOISTURE_TRANSPORT_NODES.map((m) => m.longitude),
    ...MONSOON_CORRIDOR_STATIONS.map((s) => s.longitude),
  ];

  // Historical 7-day window from ERA5 Archive (T-8 days through T-2 days inclusive = 7 full days, accounting for ~48h ERA5 latency)
  const histEndDate = formatIsoDateUtc(nowMs - 2 * 86400000);
  const histStartDate = formatIsoDateUtc(nowMs - 8 * 86400000);

  const [forecastBatch, era5ArchiveBatch] = await Promise.all([
    fetchOpenMeteoManagedBatch({
      sourceName: 'Open-Meteo Multi-Level Moisture, TCWV & CAPE Forecast API',
      modelName: 'ECMWF IFS / NOAA GFS / DWD ICON Seamless',
      provenanceClass: 'Forecast',
      latitudes: allLats,
      longitudes: allLngs,
      queryParams: {
        current: 'temperature_2m,relative_humidity_2m,dew_point_2m,precipitation,rain,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m',
        hourly: 'surface_pressure,relative_humidity_850hPa,wind_speed_850hPa,wind_direction_850hPa,relative_humidity_700hPa,wind_speed_700hPa,wind_direction_700hPa,relative_humidity_500hPa,wind_speed_500hPa,wind_direction_500hPa,total_column_integrated_water_vapour,cape,precipitation,rain',
        daily: 'precipitation_sum,rain_sum,precipitation_probability_max',
        timezone: 'GMT',
        forecast_days: 8,
      },
      expectedUnits: {
        surface_pressure: ['hPa'],
        relative_humidity_850hPa: ['%'],
        relative_humidity_700hPa: ['%'],
        total_column_integrated_water_vapour: ['kg/m²'],
        cape: ['J/kg'],
        precipitation: ['mm'],
      },
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
    fetchOpenMeteoManagedBatch({
      endpointBase: 'https://archive-api.open-meteo.com/v1/archive',
      sourceName: 'Open-Meteo ERA5 / ERA5-Land Historical Reanalysis Archive',
      modelName: 'ECMWF ERA5-Land (~9 km) Historical Reanalysis',
      provenanceClass: 'Model Analysis',
      latitudes: MONSOON_CORRIDOR_STATIONS.map((s) => s.latitude),
      longitudes: MONSOON_CORRIDOR_STATIONS.map((s) => s.longitude),
      queryParams: {
        start_date: histStartDate,
        end_date: histEndDate,
        daily: 'precipitation_sum',
        timezone: 'GMT',
      },
      expectedUnits: {
        precipitation_sum: ['mm'],
      },
      cacheTtlMs: 30 * 60 * 1000,
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
  ]);

  if (!forecastBatch.ok) {
    return {
      httpStatus: 503,
      body: {
        success: false,
        error: forecastBatch.error || 'Monsoon Dynamics moisture forecast ingestion failed',
        sourceEnvelopes: {
          forecast: forecastBatch.envelope,
          era5Historical: era5ArchiveBatch.envelope,
        },
        historicalRecords: HISTORICAL_MONSOON_RECORDS,
        dataSources: MONSOON_VERIFIED_SOURCES,
      },
    };
  }

  const mCount = MOISTURE_TRANSPORT_NODES.length;
  const moistureRaw = forecastBatch.items.slice(0, mCount);
  const corridorRaw = forecastBatch.items.slice(mCount);

  // 1. 4 Configured Moisture-Gate Diagnostics (with terrain-masking on Pir Panjal 3,150 m!)
  const moistureBranches = MOISTURE_TRANSPORT_NODES.map((node, i) => {
    const d = moistureRaw[i] || {};
    const cur = d.current || {};
    const hourly = d.hourly || {};
    const hIdx = findHourlyValidIndex(hourly.time, nowMs);

    const pSfc = safeFinite(cur.surface_pressure ?? hourly.surface_pressure?.[hIdx]);
    const moisture = resolveTerrainAwareMoisture({
      elevationM: node.elevation_m,
      surfacePressureHpa: pSfc,
      rh850: hourly.relative_humidity_850hPa?.[hIdx],
      wind850: hourly.wind_speed_850hPa?.[hIdx],
      dir850: hourly.wind_direction_850hPa?.[hIdx],
      rh700: hourly.relative_humidity_700hPa?.[hIdx],
      wind700: hourly.wind_speed_700hPa?.[hIdx],
      dir700: hourly.wind_direction_700hPa?.[hIdx],
      rh500: hourly.relative_humidity_500hPa?.[hIdx],
      wind500: hourly.wind_speed_500hPa?.[hIdx],
      dir500: hourly.wind_direction_500hPa?.[hIdx],
      tcwv: hourly.total_column_integrated_water_vapour?.[hIdx],
    });

    const dp = roundNullable(cur.dew_point_2m, 1);
    const activeRh = moisture.selectedRhPct;
    const activeWind = moisture.selectedWindKmh;

    let transportStatus = 'Unavailable';
    if (activeRh !== null && activeWind !== null) {
      if (activeRh >= 75 && activeWind >= 25) transportStatus = 'Strong Moisture Advection (Point Diagnostic)';
      else if (activeRh >= 55) transportStatus = 'Moderate Moisture Advection';
      else transportStatus = isMonsoonSeason ? 'Subdued / Break-Phase Flow' : 'Off-Season Dry Continental Flow';
    }

    return {
      ...node,
      provenanceTier: activeRh !== null ? 'Model Analysis' : 'Unavailable',
      dew_point_c: dp,
      surface_pressure_hpa: moisture.surfacePressureHpa,
      is_850hpa_above_ground: moisture.rh850Masked.isAboveGround,
      rh_850hpa_pct: moisture.rh850Masked.value, // NULL for Pir Panjal Crest (3,150 m)!
      sampled_level_hpa: moisture.selectedAboveGroundLevelHpa,
      sampled_rh_pct: activeRh,
      sampled_wind_kmh: activeWind,
      sampled_wind_dir: moisture.selectedWindDirDeg,
      tcwv_kg_m2: moisture.tcwvKgM2,
      transportStatus,
    };
  });

  // 2. 24 Regional Corridors with Strict 850 hPa Terrain Masking & Distinct ERA5 Historical 7d Rain
  let reportingCount = 0;
  let masked850Count = 0;
  let valid850Count = 0;

  const corridors: MonsoonCorridorLiveRecord[] = MONSOON_CORRIDOR_STATIONS.map((st, i) => {
    const d = corridorRaw[i] || {};
    const cur = d.current || {};
    const hourly = d.hourly || {};
    const daily = d.daily || {};
    const era5Item = era5ArchiveBatch.ok ? era5ArchiveBatch.items[i] : null;

    const hIdx = findHourlyValidIndex(hourly.time, nowMs);
    const pSfc = safeFinite(cur.surface_pressure ?? hourly.surface_pressure?.[hIdx]);

    const moisture = resolveTerrainAwareMoisture({
      elevationM: st.elevation_m,
      surfacePressureHpa: pSfc,
      rh850: hIdx >= 0 ? hourly.relative_humidity_850hPa?.[hIdx] : null,
      wind850: hIdx >= 0 ? hourly.wind_speed_850hPa?.[hIdx] : null,
      dir850: hIdx >= 0 ? hourly.wind_direction_850hPa?.[hIdx] : null,
      rh700: hIdx >= 0 ? hourly.relative_humidity_700hPa?.[hIdx] : null,
      wind700: hIdx >= 0 ? hourly.wind_speed_700hPa?.[hIdx] : null,
      dir700: hIdx >= 0 ? hourly.wind_direction_700hPa?.[hIdx] : null,
      rh500: hIdx >= 0 ? hourly.relative_humidity_500hPa?.[hIdx] : null,
      wind500: hIdx >= 0 ? hourly.wind_speed_500hPa?.[hIdx] : null,
      dir500: hIdx >= 0 ? hourly.wind_direction_500hPa?.[hIdx] : null,
      tcwv: hIdx >= 0 ? hourly.total_column_integrated_water_vapour?.[hIdx] : null,
    });

    if (!moisture.rh850Masked.isAboveGround) masked850Count += 1;
    else if (moisture.rh850Masked.value !== null) valid850Count += 1;

    // Historical 7-day precipitation strictly from ERA5 Archive API (NOT forecast API!)
    const era5DailyArr = era5Item?.daily?.precipitation_sum;
    const era5Agg = aggregateNullableSeries(era5DailyArr, 7, 1, 80);
    const era5Past7Rain = era5Agg.sum;

    const normal7d = isMonsoonSeason ? st.normalJulAugWeeklyRainMm : st.normalNovWeeklyRainMm;
    const anomalyMm =
      era5Past7Rain !== null ? Number((era5Past7Rain - normal7d).toFixed(1)) : null;
    const anomalyPct =
      era5Past7Rain !== null && normal7d > 0
        ? Math.round(((era5Past7Rain - normal7d) / normal7d) * 100)
        : null;

    // Upcoming 7-day forecast (168h hourly + 7 daily steps)
    const hRainSlice = hIdx >= 0 ? (hourly.rain || hourly.precipitation || []).slice(hIdx, hIdx + 168) : [];
    const hRainAgg = aggregateNullableSeries(hRainSlice, 168, 1, 80);

    const dDates: string[] = (daily.time || []).slice(0, 7);
    const forecastDaily = dDates.map((dt, k) => ({
      date: dt,
      rain_mm: roundNullable(daily.rain_sum?.[k] ?? daily.precipitation_sum?.[k], 1),
      prob_pct: roundNullable(daily.precipitation_probability_max?.[k], 0),
    }));

    const dRainAgg = aggregateNullableSeries(forecastDaily.map((x) => x.rain_mm), 7, 1, 80);
    const dProbAgg = aggregateNullableSeries(forecastDaily.map((x) => x.prob_pct), 7, 0, 50);

    const total7dRain =
      hRainAgg.sum !== null && dRainAgg.sum !== null
        ? Math.max(hRainAgg.sum, dRainAgg.sum)
        : hRainAgg.sum ?? dRainAgg.sum;
    const peakDailyMm = dRainAgg.max;

    // CAPE validation across 168h forecast window
    const capeSlice = hIdx >= 0 ? (hourly.cape || []).slice(hIdx, hIdx + 168) : [];
    const capeAgg = aggregateNullableSeries(capeSlice, 168, 0, 50);
    const curCape = hIdx >= 0 ? roundNullable(hourly.cape?.[hIdx], 0) : null;
    const maxCape = capeAgg.max;
    const peakCapeTimeUtc =
      capeAgg.maxIndex >= 0 && maxCape !== null && maxCape > 0
        ? toUtcIso(hourly.time?.[hIdx + capeAgg.maxIndex])
        : null;

    const tempNow = roundNullable(cur.temperature_2m, 1);
    const isReporting = tempNow !== null && hRainAgg.completenessPct >= 80;
    if (isReporting) reportingCount += 1;

    // Off-Season vs ISM Season State (NEVER equates forecast rainfall with declared monsoon onset!)
    let monsoonState: MonsoonCorridorLiveRecord['monsoonState'] = 'Unavailable';
    if (isReporting) {
      if (!isMonsoonSeason) {
        monsoonState =
          total7dRain !== null && total7dRain >= 25
            ? 'Trans-Himalayan Moisture Intrusion (Model)'
            : 'Off-Season (Year-Round Moisture Monitoring)';
      } else if (
        (total7dRain !== null && total7dRain >= 45) ||
        (moisture.selectedRhPct !== null && moisture.selectedRhPct >= 75)
      ) {
        monsoonState = 'Active Orographic Moisture Surge (Model)';
      } else {
        monsoonState = 'ISM Climatological Window — Baseline Flow';
      }
    }

    let coupledRisk: MonsoonCorridorLiveRecord['coupledRisk'];
    if (total7dRain === null || peakDailyMm === null) {
      coupledRisk = {
        floods: 'Not Assessed',
        flashFloods: 'Not Assessed',
        landslides: 'Not Assessed',
        glofs: 'Not Assessed',
        overall: 'Not Assessed',
      };
    } else if (total7dRain < 2.0 && (era5Past7Rain === null || era5Past7Rain < 5.0)) {
      coupledRisk = {
        floods: 'No Active Trigger',
        flashFloods: 'No Active Trigger',
        landslides: 'No Active Trigger',
        glofs: 'No Active Trigger',
        overall: 'No Active Trigger',
      };
    } else {
      const p7 = era5Past7Rain ?? 0;
      const capeVal = maxCape ?? 0;
      const floods: HazardLevel =
        st.coupledHazards.includes('floods') && (total7dRain >= 80 || p7 >= 90)
          ? 'Critical'
          : st.coupledHazards.includes('floods') && total7dRain >= 40
            ? 'High'
            : total7dRain >= 20
              ? 'Moderate'
              : 'Low';
      const flashFloods: HazardLevel =
        peakDailyMm >= 55 || (capeVal >= 1200 && peakDailyMm >= 20)
          ? 'Critical'
          : peakDailyMm >= 28 || (capeVal >= 600 && peakDailyMm >= 12)
            ? 'High'
            : peakDailyMm >= 12
              ? 'Moderate'
              : 'Low';
      const landslides: HazardLevel =
        st.coupledHazards.includes('landslides') && p7 + total7dRain >= 95
          ? 'Critical'
          : st.coupledHazards.includes('landslides') && p7 + total7dRain >= 45
            ? 'High'
            : p7 + total7dRain >= 20
              ? 'Moderate'
              : 'Low';
      const glofs: HazardLevel =
        st.coupledHazards.includes('glofs') && st.elevation_m >= 1450 && (tempNow ?? 0) >= 18 && total7dRain >= 20
          ? 'High'
          : st.coupledHazards.includes('glofs') && total7dRain >= 15
            ? 'Moderate'
            : 'Low';

      coupledRisk = {
        floods,
        flashFloods,
        landslides,
        glofs,
        overall: maxHazard([floods, flashFloods, landslides, glofs]),
      };
    }

    return {
      ...st,
      isReporting,
      provenance: {
        analysisTier: isReporting ? 'Model Analysis' : 'Unavailable',
        historicalTier: era5Past7Rain !== null ? 'Model Analysis' : 'Unavailable',
        forecastTier: hRainAgg.completenessPct >= 80 ? 'Forecast' : 'Unavailable',
        modelGridElevationM: roundNullable(d.elevation, 0),
        historicalWindow: `${histStartDate} to ${histEndDate} UTC (ERA5-Land)`,
      },
      liveObservation: {
        temp_c: tempNow,
        dew_point_c: roundNullable(cur.dew_point_2m, 1),
        humidity_2m_pct: roundNullable(cur.relative_humidity_2m, 0),
        surface_pressure_hpa: moisture.surfacePressureHpa,
        rh_850hpa_pct: moisture.rh850Masked.value,
        is_850hpa_above_ground: moisture.rh850Masked.isAboveGround,
        masked_850hpa_reason: moisture.rh850Masked.maskedReason,
        above_ground_level_hpa: moisture.selectedAboveGroundLevelHpa,
        above_ground_rh_pct: moisture.selectedRhPct,
        above_ground_wind_kmh: moisture.selectedWindKmh,
        above_ground_wind_dir: moisture.selectedWindDirDeg,
        tcwv_kg_m2: moisture.tcwvKgM2,
        cape_jkg: curCape,
        precip_current_mm: roundNullable(cur.precipitation, 1),
        era5_past7d_rain_mm: era5Past7Rain,
        climatology7d_normal_mm: normal7d,
        anomaly_mm: anomalyMm,
        anomaly_pct: anomalyPct,
      },
      forecast7d: {
        total_rain_mm: total7dRain,
        peak_daily_mm: peakDailyMm,
        max_prob_pct: dProbAgg.max,
        max_cape_jkg: maxCape,
        peak_cape_time_utc: peakCapeTimeUtc,
        valid_hourly_steps: hRainAgg.validCount,
        daily: forecastDaily,
      },
      monsoonState,
      coupledRisk,
    };
  });

  const subRegions: DisplaySubRegion[] = ['Jammu', 'Kashmir', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];
  const regionalSummaries = subRegions.map((sr) => {
    const grp = corridors.filter((c) => c.subRegion === sr);
    const era5Mean = aggregateNullableSeries(grp.map((c) => c.liveObservation.era5_past7d_rain_mm), grp.length, 1, 50).mean;
    const meanNormal7 = Number((grp.reduce((s, c) => s + c.liveObservation.climatology7d_normal_mm, 0) / grp.length).toFixed(1));
    const anomalyPct =
      era5Mean !== null && meanNormal7 > 0
        ? Math.round(((era5Mean - meanNormal7) / meanNormal7) * 100)
        : null;

    // 850 hPa mean ONLY over corridors where 850 hPa is genuinely above ground!
    const aboveGround850Values = grp
      .filter((c) => c.liveObservation.is_850hpa_above_ground && c.liveObservation.rh_850hpa_pct !== null)
      .map((c) => c.liveObservation.rh_850hpa_pct);

    return {
      subRegion: sr,
      administrativeUnit: SIX_SUBREGION_DEFINITIONS[sr].administrativeUnit,
      corridors: grp.length,
      reportingCorridors: grp.filter((c) => c.isReporting).length,
      valid850Corridors: aboveGround850Values.length,
      masked850Corridors: grp.filter((c) => !c.liveObservation.is_850hpa_above_ground).length,
      past7dEra5MeanMm: era5Mean,
      normal7dMm: meanNormal7,
      anomalyPct,
      forecastMax7dMm: aggregateNullableSeries(grp.map((c) => c.forecast7d.total_rain_mm), grp.length, 1).max,
      meanValid850RhPct: aboveGround850Values.length > 0 ? aggregateNullableSeries(aboveGround850Values, aboveGround850Values.length, 0).mean : null,
      meanAboveGroundRhPct: aggregateNullableSeries(grp.map((c) => c.liveObservation.above_ground_rh_pct), grp.length, 0).mean,
      meanTcwvKgM2: aggregateNullableSeries(grp.map((c) => c.liveObservation.tcwv_kg_m2), grp.length, 1).mean,
      overallRisk: maxHazard(grp.map((c) => c.coupledRisk.overall)),
    };
  });

  // Domain-wide valid 850 hPa RH (strictly excluding subterranean masked stations!)
  const allValid850 = corridors
    .filter((c) => c.liveObservation.is_850hpa_above_ground && c.liveObservation.rh_850hpa_pct !== null)
    .map((c) => c.liveObservation.rh_850hpa_pct);
  const meanValid850RhPct =
    allValid850.length > 0 ? aggregateNullableSeries(allValid850, allValid850.length, 0).mean : null;

  const meanTcwvKgM2 = aggregateNullableSeries(
    corridors.map((c) => c.liveObservation.tcwv_kg_m2),
    corridors.length,
    1
  ).mean;

  const capeCorridors = corridors.filter((c) => c.forecast7d.max_cape_jkg !== null);
  const peakCapeCorridor =
    capeCorridors.length > 0
      ? capeCorridors.reduce((best, cur) =>
          (cur.forecast7d.max_cape_jkg ?? -1) > (best.forecast7d.max_cape_jkg ?? -1) ? cur : best
        )
      : null;

  return {
    httpStatus: 200,
    body: {
      success: true,
      seasonContext: {
        isActiveMonsoonWindow: isMonsoonSeason,
        seasonalStatusLabel: isMonsoonSeason ? 'ISM Season (Jun–Sep)' : 'Off-Season (Oct–May)',
        onsetDisclaimer:
          'Official Southwest Monsoon onset and withdrawal dates are declared exclusively by IMD and PMD; NWP rainfall forecasts do not constitute monsoon onset.',
        regimeHeadline: isMonsoonSeason
          ? 'Climatological Southwest Monsoon Window (Jun–Sep) — Monitoring Terrain-Masked Moisture Advection, TCWV & ERA5 Rainfall Anomalies'
          : 'Off-Season Circulation Mode (Oct–May) — Year-Round Terrain-Masked Moisture, TCWV & ERA5 Historical Precipitation Baseline Active',
        configuredCorridors: MONSOON_CORRIDOR_STATIONS.length,
        reportingCorridors: reportingCount,
        valid850Corridors: valid850Count,
        maskedSubterranean850Corridors: masked850Count,
        meanValid850RhPct,
        meanTcwvKgM2,
        maxCapeJkg: peakCapeCorridor?.forecast7d.max_cape_jkg ?? null,
        maxCapeLocation: peakCapeCorridor ? `${peakCapeCorridor.name} (${peakCapeCorridor.subRegion})` : null,
        maxCapeValidTimeUtc: peakCapeCorridor?.forecast7d.peak_cape_time_utc ?? null,
        historicalWindowLabel: `${histStartDate} to ${histEndDate} UTC`,
        peakEra5Past7dMm: aggregateNullableSeries(corridors.map((c) => c.liveObservation.era5_past7d_rain_mm), corridors.length, 1).max,
        peakForecast7dMm: aggregateNullableSeries(corridors.map((c) => c.forecast7d.total_rain_mm), corridors.length, 1).max,
      },
      moistureBranches,
      regionalSummaries,
      corridors,
      historicalRecords: HISTORICAL_MONSOON_RECORDS,
      dataSources: MONSOON_VERIFIED_SOURCES,
      sourceEnvelopes: {
        forecast: forecastBatch.envelope,
        era5Historical: era5ArchiveBatch.envelope,
      },
      meta: {
        configuredCorridors: MONSOON_CORRIDOR_STATIONS.length,
        reportingCorridors: reportingCount,
        totalCorridors: corridors.length,
        moistureGateMethod:
          '4 Configured Reference Gates sampled via point-level model diagnostics & Total-Column Water Vapour (not integrated cross-transect fluxes)',
        terrainMaskRule:
          '850 hPa samples where 850 > surface_pressure - 5 hPa are strictly masked as null (subterranean) and replaced by 700/500 hPa free-air diagnostics + TCWV',
        historicalSource: `Open-Meteo ERA5-Land Historical Reanalysis (${histStartDate} to ${histEndDate} UTC)`,
        provider: forecastBatch.envelope.sourceName,
        model: forecastBatch.envelope.model,
        modelRunInitUtc: forecastBatch.envelope.initializationTimeUtc,
        validTimeUtc: forecastBatch.envelope.validTimeUtc,
        updatedAt: forecastBatch.envelope.fetchTimeUtc,
        freshnessStatus: forecastBatch.envelope.freshnessStatus,
        unitValidationPassed:
          forecastBatch.envelope.unitValidationPassed &&
          (era5ArchiveBatch.ok ? era5ArchiveBatch.envelope.unitValidationPassed : false),
      },
    },
  };
}
