import {
  fetchOpenMeteoManagedBatch,
  safeFinite,
  roundNullable,
  aggregateNullableSeries,
  findHourlyValidIndex,
  toUtcIso,
  ORDERED_SUBREGIONS,
  SIX_SUBREGION_DEFINITIONS,
} from '@/lib/atmospheric-ingestion';
import {
  EXTREME_RAINFALL_WATERSHEDS,
  HISTORICAL_CLOUDBURST_RECORDS,
  ExtremeRainfallLiveRecord,
  ExtremeRainRiskClass,
} from '@/data/hazard-extreme-weather';

function rollingMaxSum(arr: unknown[], windowSize: number): { maxSum: number | null; maxStartIdx: number } {
  if (!Array.isArray(arr) || arr.length < windowSize) return { maxSum: null, maxStartIdx: -1 };
  let best: number | null = null;
  let bestIdx = -1;
  for (let i = 0; i <= arr.length - windowSize; i++) {
    let winSum = 0;
    let validInWin = 0;
    for (let k = 0; k < windowSize; k++) {
      const v = safeFinite(arr[i + k]);
      if (v !== null) {
        winSum += v;
        validInWin++;
      }
    }
    if (validInWin === windowSize) {
      const rounded = Number(winSum.toFixed(1));
      if (best === null || rounded > best) {
        best = rounded;
        bestIdx = i;
      }
    }
  }
  return { maxSum: best, maxStartIdx: bestIdx };
}

async function fetchRadarMeta(fetchImpl: typeof fetch = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4500);
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
    clearTimeout(timer);
  }
}

export interface BuildExtremeRainfallOptions {
  forceRefresh?: boolean;
  nowMs?: number;
  fetchImpl?: typeof fetch;
}

export async function buildExtremeRainfallPayload(opts: BuildExtremeRainfallOptions = {}) {
  const nowMs = opts.nowMs ?? Date.now();
  const fetchFn = opts.fetchImpl || fetch;

  const lats = EXTREME_RAINFALL_WATERSHEDS.map((w) => w.latitude);
  const lons = EXTREME_RAINFALL_WATERSHEDS.map((w) => w.longitude);

  const histEndDate = new Date(nowMs - 2 * 86400000).toISOString().slice(0, 10);
  const histStartDate = new Date(nowMs - 8 * 86400000).toISOString().slice(0, 10);

  const [nwpBatch, ensembleBatch, era5Batch, radarMeta] = await Promise.all([
    fetchOpenMeteoManagedBatch({
      sourceName: 'Open-Meteo High-Resolution Hourly Precipitation & Instability API',
      modelName: 'ECMWF IFS / NOAA GFS / DWD ICON Seamless',
      provenanceClass: 'Forecast',
      latitudes: lats,
      longitudes: lons,
      queryParams: {
        current: 'temperature_2m,precipitation,rain,showers,weather_code',
        hourly: 'precipitation,rain,showers,cape,freezing_level_height,total_column_integrated_water_vapour',
        daily: 'precipitation_sum,precipitation_probability_max',
        timezone: 'GMT',
        forecast_days: 8,
      },
      expectedUnits: {
        precipitation: ['mm'],
        cape: ['J/kg'],
        total_column_integrated_water_vapour: ['kg/m²'],
      },
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
    fetchOpenMeteoManagedBatch({
      endpointBase: 'https://ensemble-api.open-meteo.com/v1/ensemble',
      sourceName: 'Open-Meteo 31-Member GFS Ensemble API',
      modelName: 'NOAA GEFS / GFS Seamless 31-Member Ensemble',
      provenanceClass: 'Forecast',
      latitudes: lats,
      longitudes: lons,
      queryParams: {
        daily: 'precipitation_sum',
        models: 'gfs_seamless',
        timezone: 'GMT',
        forecast_days: 7,
      },
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
    fetchOpenMeteoManagedBatch({
      endpointBase: 'https://archive-api.open-meteo.com/v1/archive',
      sourceName: 'Open-Meteo ERA5-Land Historical Reanalysis API',
      modelName: 'ECMWF ERA5-Land (~9 km)',
      provenanceClass: 'Model Analysis',
      latitudes: lats,
      longitudes: lons,
      queryParams: {
        start_date: histStartDate,
        end_date: histEndDate,
        daily: 'precipitation_sum',
        timezone: 'GMT',
      },
      expectedUnits: { precipitation_sum: ['mm'] },
      cacheTtlMs: 30 * 60 * 1000,
      forceRefresh: opts.forceRefresh,
      fetchImpl: fetchFn,
    }),
    fetchRadarMeta(fetchFn),
  ]);

  if (!nwpBatch.ok) {
    return {
      httpStatus: 503,
      body: {
        success: false,
        error: nwpBatch.error || 'Extreme Rainfall NWP ingestion failed',
        sourceEnvelopes: {
          nwpForecast: nwpBatch.envelope,
          gfsEnsemble: ensembleBatch.envelope,
          era5Historical: era5Batch.envelope,
        },
        historicalRecords: HISTORICAL_CLOUDBURST_RECORDS,
      },
    };
  }

  let reportingCount = 0;

  const watersheds: ExtremeRainfallLiveRecord[] = EXTREME_RAINFALL_WATERSHEDS.map((ws, i) => {
    const d = nwpBatch.items[i] || {};
    const cur = d.current || {};
    const hourly = d.hourly || {};
    const daily = d.daily || {};
    const ensItem = ensembleBatch.ok ? ensembleBatch.items[i] : null;
    const era5Item = era5Batch.ok ? era5Batch.items[i] : null;

    const hIdx = findHourlyValidIndex(hourly.time, nowMs);
    const futurePrecip = hIdx >= 0 ? (hourly.precipitation || []).slice(hIdx, hIdx + 168) : [];
    const futureCape = hIdx >= 0 ? (hourly.cape || []).slice(hIdx, hIdx + 168) : [];

    const p168Agg = aggregateNullableSeries(futurePrecip, 168, 1, 80);
    const capeAgg = aggregateNullableSeries(futureCape, 168, 0, 50);

    const r3h = rollingMaxSum(futurePrecip, 3);
    const r24h = rollingMaxSum(futurePrecip, 24);
    const peak1hTimeUtc =
      p168Agg.maxIndex >= 0 && p168Agg.max !== null && p168Agg.max > 0
        ? toUtcIso(hourly.time?.[hIdx + p168Agg.maxIndex])
        : null;

    // ERA5 Historical 7d
    const era5Agg = aggregateNullableSeries(era5Item?.daily?.precipitation_sum, 7, 1, 80);
    const era5AnomPct =
      era5Agg.sum !== null && ws.normalWeeklyRainMm > 0
        ? Math.round(((era5Agg.sum - ws.normalWeeklyRainMm) / ws.normalWeeklyRainMm) * 100)
        : null;

    // 31-Member Ensemble Probabilities
    let memberCount = 0;
    let median7d: number | null = null;
    let p90_7d: number | null = null;
    let maxMember24h: number | null = null;
    let probGe25: number | null = null;
    let probGe50: number | null = null;

    if (ensItem?.daily && typeof ensItem.daily === 'object') {
      const memberKeys = Object.keys(ensItem.daily).filter((k) => k.startsWith('precipitation_sum'));
      memberCount = memberKeys.length;
      if (memberCount > 0) {
        const totals7d: number[] = [];
        let membersGe25 = 0;
        let membersGe50 = 0;
        let peakAnyMember24h = 0;

        for (const mk of memberKeys) {
          const arr: unknown[] = ensItem.daily[mk] || [];
          const mAgg = aggregateNullableSeries(arr, 7, 1, 70);
          if (mAgg.sum !== null) totals7d.push(mAgg.sum);
          if (mAgg.max !== null) {
            if (mAgg.max > peakAnyMember24h) peakAnyMember24h = mAgg.max;
            if (mAgg.max >= 25) membersGe25++;
            if (mAgg.max >= 50) membersGe50++;
          }
        }
        if (totals7d.length > 0) {
          totals7d.sort((a, b) => a - b);
          median7d = totals7d[Math.floor(totals7d.length * 0.5)];
          p90_7d = totals7d[Math.min(totals7d.length - 1, Math.floor(totals7d.length * 0.9))];
          maxMember24h = Number(peakAnyMember24h.toFixed(1));
          probGe25 = Math.round((membersGe25 / memberCount) * 100);
          probGe50 = Math.round((membersGe50 / memberCount) * 100);
        }
      }
    }

    const tempNow = roundNullable(cur.temperature_2m, 1);
    const isReporting = tempNow !== null && p168Agg.completenessPct >= 80;
    if (isReporting) reportingCount += 1;

    // Scientifically honest classification (NEVER claims 'Confirmed Cloudburst' from NWP!)
    let extremeClass: ExtremeRainRiskClass = 'Not Assessed';
    let scientificBasis = '168h hourly precipitation series incomplete.';
    if (p168Agg.max !== null && r24h.maxSum !== null) {
      const capeMax = capeAgg.max ?? 0;
      const aridThresholdFactor = ws.watershedType === 'Arid Trans-Himalayan Debris Fan' ? 0.5 : 1.0;

      if (
        (p168Agg.max >= 25 * aridThresholdFactor && capeMax >= 800) ||
        r24h.maxSum >= 115 * aridThresholdFactor ||
        (probGe50 !== null && probGe50 >= 40)
      ) {
        extremeClass = 'Cloudburst-Supportive Environment (Unconfirmed)';
        scientificBasis = `Model peak 1h ${p168Agg.max} mm, 24h ${r24h.maxSum} mm, CAPE ${capeMax} J/kg (NWP proxy only; ≥100 mm/h cloudburst requires gauge/radar confirmation)`;
      } else if (r24h.maxSum >= 64.5 * aridThresholdFactor || (probGe25 !== null && probGe25 >= 50)) {
        extremeClass = 'Heavy Orographic Rain Warning';
        scientificBasis = `Forecast 24h max ${r24h.maxSum} mm meets IMD Heavy Rain threshold (≥64.5 mm/24h, scaled for arid fans)`;
      } else if (r24h.maxSum >= 15.6 * aridThresholdFactor || (p168Agg.sum ?? 0) >= 25) {
        extremeClass = 'Elevated Rain Watch';
        scientificBasis = `Forecast 24h max ${r24h.maxSum} mm · 7d total ${p168Agg.sum} mm`;
      } else {
        extremeClass = 'No Extreme Rainfall Signal';
        scientificBasis = `168h peak 1h ${p168Agg.max} mm · 24h max ${r24h.maxSum} mm · Ensemble P(≥50mm) = ${probGe50 ?? '—'}%`;
      }
    }

    const dDates: string[] = (daily.time || []).slice(0, 7);
    const dailySeries = dDates.map((dt, k) => ({
      date: dt,
      precip_mm: roundNullable(daily.precipitation_sum?.[k], 1),
      prob_pct: roundNullable(daily.precipitation_probability_max?.[k], 0),
    }));

    return {
      ...ws,
      isReporting,
      provenance: {
        analysisTier: isReporting ? 'Model Analysis' : 'Unavailable',
        historicalTier: era5Agg.sum !== null ? 'Model Analysis' : 'Unavailable',
        forecastTier: p168Agg.completenessPct >= 80 ? 'Forecast' : 'Unavailable',
        ensembleTier: memberCount > 0 ? 'Forecast' : 'Unavailable',
        modelGridElevationM: roundNullable(d.elevation, 0),
        historicalWindow: `${histStartDate} to ${histEndDate} UTC (ERA5-Land)`,
      },
      currentAnalysis: {
        temp_c: tempNow,
        precip_1h_mm: roundNullable(cur.precipitation, 1),
        tcwv_kg_m2: hIdx >= 0 ? roundNullable(hourly.total_column_integrated_water_vapour?.[hIdx], 1) : null,
        cape_jkg: hIdx >= 0 ? roundNullable(hourly.cape?.[hIdx], 0) : null,
        freezing_level_m: hIdx >= 0 ? roundNullable(hourly.freezing_level_height?.[hIdx], 0) : null,
        era5_past7d_mm: era5Agg.sum,
        era5_anomaly_pct: era5AnomPct,
      },
      forecast168h: {
        peak_1h_mm: p168Agg.max,
        peak_1h_time_utc: peak1hTimeUtc,
        peak_3h_mm: r3h.maxSum,
        peak_24h_mm: r24h.maxSum,
        total_168h_mm: p168Agg.sum,
        max_cape_jkg: capeAgg.max,
        valid_hourly_steps: p168Agg.validCount,
        daily: dailySeries,
      },
      ensembleGfs31: {
        memberCount,
        median_7d_mm: median7d,
        p90_7d_mm: p90_7d,
        max_member_24h_mm: maxMember24h,
        prob_24h_ge_25mm_pct: probGe25,
        prob_24h_ge_50mm_pct: probGe50,
      },
      extremeClass,
      scientificBasis,
    };
  });

  const regionalSummaries = ORDERED_SUBREGIONS.map((sr) => {
    const grp = watersheds.filter((w) => w.subRegion === sr);
    return {
      subRegion: sr,
      administrativeUnit: SIX_SUBREGION_DEFINITIONS[sr].administrativeUnit,
      watersheds: grp.length,
      reportingWatersheds: grp.filter((w) => w.isReporting).length,
      era5Mean7dMm: aggregateNullableSeries(grp.map((w) => w.currentAnalysis.era5_past7d_mm), grp.length, 1).mean,
      peakForecast24hMm: aggregateNullableSeries(grp.map((w) => w.forecast168h.peak_24h_mm), grp.length, 1).max,
      peakForecast168hMm: aggregateNullableSeries(grp.map((w) => w.forecast168h.total_168h_mm), grp.length, 1).max,
      maxEnsembleProb50Pct: aggregateNullableSeries(grp.map((w) => w.ensembleGfs31.prob_24h_ge_50mm_pct), grp.length, 0).max,
    };
  });

  const alertWatersheds = watersheds.filter(
    (w) =>
      w.extremeClass === 'Heavy Orographic Rain Warning' ||
      w.extremeClass === 'Cloudburst-Supportive Environment (Unconfirmed)'
  ).length;

  return {
    httpStatus: 200,
    body: {
      success: true,
      summary: {
        configuredWatersheds: EXTREME_RAINFALL_WATERSHEDS.length,
        reportingWatersheds: reportingCount,
        regionsCovered: 6,
        peakEra5Past7dMm: aggregateNullableSeries(watersheds.map((w) => w.currentAnalysis.era5_past7d_mm), watersheds.length, 1).max,
        peakForecast1hMm: aggregateNullableSeries(watersheds.map((w) => w.forecast168h.peak_1h_mm), watersheds.length, 1).max,
        peakForecast24hMm: aggregateNullableSeries(watersheds.map((w) => w.forecast168h.peak_24h_mm), watersheds.length, 1).max,
        peakForecast168hMm: aggregateNullableSeries(watersheds.map((w) => w.forecast168h.total_168h_mm), watersheds.length, 1).max,
        maxEnsembleProbGe50Pct: aggregateNullableSeries(watersheds.map((w) => w.ensembleGfs31.prob_24h_ge_50mm_pct), watersheds.length, 0).max,
        elevatedAlertWatersheds: reportingCount > 0 ? alertWatersheds : null,
        scientificDisclaimer:
          'NWP forecasts and 31-member ensemble probabilities identify heavy orographic rainfall and convective instability, NOT confirmed localized cloudbursts (≥100 mm/h), which require rain-gauge or Doppler radar observation.',
      },
      regionalSummaries,
      watersheds,
      radarOverlay: radarMeta,
      historicalRecords: HISTORICAL_CLOUDBURST_RECORDS,
      sourceEnvelopes: {
        nwpForecast: nwpBatch.envelope,
        gfsEnsemble: ensembleBatch.envelope,
        era5Historical: era5Batch.envelope,
      },
      meta: {
        configuredWatersheds: EXTREME_RAINFALL_WATERSHEDS.length,
        reportingWatersheds: reportingCount,
        historicalWindow: `${histStartDate} to ${histEndDate} UTC`,
        modelRunInitUtc: nwpBatch.envelope.initializationTimeUtc,
        validTimeUtc: nwpBatch.envelope.validTimeUtc,
        updatedAt: nwpBatch.envelope.fetchTimeUtc,
        freshnessStatus: nwpBatch.envelope.freshnessStatus,
      },
    },
  };
}
