/**
 * Centralized Atmospheric & Extreme Weather Scientific Ingestion, Validation & Cache Service
 * ------------------------------------------------------------------------------------------
 * Enforces KEW Shared Scientific Rules across:
 *   1. Western Disturbances (/hazard-intelligence/atmospheric-systems/western-disturbances)
 *   2. Monsoon Dynamics (/hazard-intelligence/atmospheric-systems/monsoon-dynamics)
 *   3. Jet Stream & Atmospheric Circulation (/hazard-intelligence/atmospheric-systems/jet-stream-circulation)
 *   4. Extreme Weather Systems (/hazard-intelligence/extreme-weather/*)
 *
 * Rules enforced:
 *   - Valid measured zero (0 / 0.0) remains 0.
 *   - Missing / null / NaN data NEVER becomes 0 or a placeholder constant; remains null -> UI '— / Unavailable'.
 *   - Pressure-level diagnostics (e.g., 850 hPa, 700 hPa) strictly masked when pressure > surface_pressure - margin.
 *   - Every source call preserves provider, model, variables, response units, init UTC, valid UTC, fetch UTC & freshness.
 */

export type DisplaySubRegion =
  | 'Kashmir'
  | 'Jammu'
  | 'Ladakh'
  | 'Azad Kashmir'
  | 'Gilgit'
  | 'Baltistan';

export type GeographicScope =
  | 'Kashmir Core'
  | 'Trans-Divisional'
  | 'Transboundary / Extended';

export type ScientificProvenanceClass =
  | 'Observation'
  | 'Satellite Estimate'
  | 'Model Analysis'
  | 'Forecast'
  | 'Derived Index'
  | 'Official Advisory'
  | 'Unavailable';

export type FreshnessStatus = 'FRESH' | 'CACHED' | 'STALE_FALLBACK' | 'UNAVAILABLE';

export interface SubRegionDefinition {
  subRegion: DisplaySubRegion;
  administrativeUnit:
    | 'Jammu & Kashmir'
    | 'Ladakh'
    | 'Azad Jammu & Kashmir'
    | 'Gilgit-Baltistan';
  scope: GeographicScope;
  description: string;
}

export const SIX_SUBREGION_DEFINITIONS: Record<DisplaySubRegion, SubRegionDefinition> = {
  Kashmir: {
    subRegion: 'Kashmir',
    administrativeUnit: 'Jammu & Kashmir',
    scope: 'Kashmir Core',
    description: 'Jhelum basin, Pir Panjal north flank & Great Himalayan passes (Kashmir Division)',
  },
  Jammu: {
    subRegion: 'Jammu',
    administrativeUnit: 'Jammu & Kashmir',
    scope: 'Trans-Divisional',
    description: 'Shivalik foreland, Tawi piedmont & Chenab gorge districts (Jammu Division)',
  },
  Ladakh: {
    subRegion: 'Ladakh',
    administrativeUnit: 'Ladakh',
    scope: 'Trans-Divisional',
    description: 'Trans-Himalayan Upper Indus, Zanskar, Suru & Shyok–Nubra high-altitude basins',
  },
  'Azad Kashmir': {
    subRegion: 'Azad Kashmir',
    administrativeUnit: 'Azad Jammu & Kashmir',
    scope: 'Transboundary / Extended',
    description: 'Hazara–Kashmir syntaxis, Neelum gorge, Poonch uplands & Mangla foreland',
  },
  Gilgit: {
    subRegion: 'Gilgit',
    administrativeUnit: 'Gilgit-Baltistan',
    scope: 'Transboundary / Extended',
    description: 'Western subfolder of the Gilgit-Baltistan administrative unit (Gilgit, Hunza, Diamer, Ghizer)',
  },
  Baltistan: {
    subRegion: 'Baltistan',
    administrativeUnit: 'Gilgit-Baltistan',
    scope: 'Transboundary / Extended',
    description: 'Eastern subfolder of the Gilgit-Baltistan administrative unit (Skardu, Shigar, Ghanche, Kharmang)',
  },
};

export const ORDERED_SUBREGIONS: DisplaySubRegion[] = [
  'Kashmir',
  'Jammu',
  'Ladakh',
  'Azad Kashmir',
  'Gilgit',
  'Baltistan',
];

export interface SourceIngestionEnvelope {
  sourceName: string;
  endpoint: string;
  model: string;
  provenanceClass: ScientificProvenanceClass;
  requestedVariables: string[];
  responseUnits: Record<string, string>;
  unitValidationPassed: boolean;
  unitMismatches: string[];
  initializationTimeUtc: string | null;
  validTimeUtc: string | null;
  fetchTimeUtc: string;
  freshnessMinutes: number;
  freshnessStatus: FreshnessStatus;
  domain: {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
    requestedPoints: number;
    returnedPoints: number;
  };
  completeness: {
    validValues: number;
    expectedValues: number;
    completenessPct: number;
  };
}

// ─── Strict Null-Preserving Numeric Utilities ────────────────────────────────

/** Returns finite number or null. NEVER coerces null/undefined/empty string/NaN to 0! */
export function safeFinite(val: unknown): number | null {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  return null;
}

export function roundNullable(val: unknown, decimals = 1): number | null {
  const n = safeFinite(val);
  if (n === null) return null;
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
}

export interface SeriesAggregationResult {
  sum: number | null;
  mean: number | null;
  min: number | null;
  max: number | null;
  maxIndex: number;
  validCount: number;
  expectedCount: number;
  missingCount: number;
  completenessPct: number;
}

/**
 * Aggregates a numeric array slice WITHOUT turning missing data into 0.
 * If validCount === 0, sum/mean/min/max are ALL null!
 * If requireMinCompletenessPct is set (default 80%) and completeness falls below it, sum is marked null to prevent under-biasing 7-day totals!
 */
export function aggregateNullableSeries(
  arr: unknown[] | undefined | null,
  expectedLength?: number,
  decimals = 1,
  requireMinCompletenessPctForSum = 80
): SeriesAggregationResult {
  const slice = Array.isArray(arr) ? arr : [];
  const exp = expectedLength ?? slice.length;
  let sumAcc = 0;
  let minVal = Infinity;
  let maxVal = -Infinity;
  let maxIdx = -1;
  let validCount = 0;

  for (let i = 0; i < slice.length; i++) {
    const v = safeFinite(slice[i]);
    if (v !== null) {
      sumAcc += v;
      if (v < minVal) minVal = v;
      if (v > maxVal) {
        maxVal = v;
        maxIdx = i;
      }
      validCount++;
    }
  }

  const completenessPct = exp > 0 ? Math.round((validCount / exp) * 100) : 0;
  if (validCount === 0) {
    return {
      sum: null,
      mean: null,
      min: null,
      max: null,
      maxIndex: -1,
      validCount: 0,
      expectedCount: exp,
      missingCount: exp,
      completenessPct: 0,
    };
  }

  const f = Math.pow(10, decimals);
  const roundedSum =
    completenessPct >= requireMinCompletenessPctForSum
      ? Math.round(sumAcc * f) / f
      : null;

  return {
    sum: roundedSum,
    mean: Math.round((sumAcc / validCount) * f) / f,
    min: Math.round(minVal * f) / f,
    max: Math.round(maxVal * f) / f,
    maxIndex: maxIdx,
    validCount,
    expectedCount: exp,
    missingCount: Math.max(0, exp - validCount),
    completenessPct,
  };
}

// ─── Timestamp & Model Cycle Helpers ─────────────────────────────────────────

export function toUtcIso(rawTime: string | undefined | null): string | null {
  if (!rawTime || typeof rawTime !== 'string') return null;
  const normalized = rawTime.endsWith('Z') || rawTime.includes('+') ? rawTime : `${rawTime}Z`;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export function findHourlyValidIndex(times: string[] | undefined, nowMs: number): number {
  if (!Array.isArray(times) || times.length === 0) return -1;
  for (let i = times.length - 1; i >= 0; i--) {
    const iso = toUtcIso(times[i]);
    if (iso && new Date(iso).getTime() <= nowMs) return i;
  }
  return 0;
}

export function inferSynopticModelCycleUtc(referenceMs: number): string {
  // Global ECMWF IFS / GFS cycles run at 00Z, 06Z, 12Z, 18Z (~4h assimilation latency)
  const d = new Date(referenceMs - 4 * 3600 * 1000);
  const cycleHour = Math.floor(d.getUTCHours() / 6) * 6;
  d.setUTCHours(cycleHour, 0, 0, 0);
  return d.toISOString();
}

// ─── Unit Conversion & Unit Contract Verification ────────────────────────────

export function validateExpectedUnits(
  actualUnits: Record<string, string> | undefined,
  expectedSubset: Record<string, string[]>
): { passed: boolean; mismatches: string[] } {
  if (!actualUnits) return { passed: false, mismatches: ['Missing units metadata object in response'] };
  const mismatches: string[] = [];
  for (const [field, allowedList] of Object.entries(expectedSubset)) {
    const got = actualUnits[field];
    if (got === undefined) {
      mismatches.push(`Missing unit declaration for '${field}'`);
    } else if (!allowedList.includes(got)) {
      mismatches.push(`Unit mismatch on '${field}': expected [${allowedList.join('|')}], got '${got}'`);
    }
  }
  return { passed: mismatches.length === 0, mismatches };
}

/** Convert wind speed (km/h or m/s depending on declared unit) and from-direction (deg) to (u, v) in m/s */
export function windSpeedDirToUVms(
  speed: number | null,
  dirDeg: number | null,
  speedUnit: string = 'km/h'
): { u: number; v: number } | null {
  if (speed === null || dirDeg === null) return null;
  const spdMs = speedUnit === 'm/s' ? speed : speed / 3.6;
  const rad = (dirDeg * Math.PI) / 180;
  return {
    u: -spdMs * Math.sin(rad),
    v: -spdMs * Math.cos(rad),
  };
}

// ─── Below-Ground Pressure-Level Masking (Critical for 850/700 hPa in Himalayas) ─

export function estimateStandardPressureHpa(elevationM: number): number {
  return Number(
    (1013.25 * Math.pow(1 - 2.25577e-5 * Math.max(0, elevationM), 5.25588)).toFixed(1)
  );
}

export interface MaskedPressureLevelSample {
  levelHpa: number;
  surfacePressureHpa: number;
  isAboveGround: boolean;
  maskedReason: string | null;
  value: number | null;
}

/**
 * Excludes any pressure-level sample where `levelHpa > surfacePressureHpa - marginHpa`
 * (subterranean NWP extrapolation beneath Himalayan terrain).
 */
export function maskBelowGroundPressureSample(params: {
  levelHpa: number;
  surfacePressureHpa: number | null;
  elevationM: number;
  rawValue: unknown;
  marginHpa?: number;
  decimals?: number;
}): MaskedPressureLevelSample {
  const margin = params.marginHpa ?? 5.0;
  const pSfc =
    params.surfacePressureHpa !== null
      ? params.surfacePressureHpa
      : estimateStandardPressureHpa(params.elevationM);

  if (params.levelHpa > pSfc - margin) {
    return {
      levelHpa: params.levelHpa,
      surfacePressureHpa: roundNullable(pSfc, 1) ?? pSfc,
      isAboveGround: false,
      maskedReason: `${params.levelHpa} hPa lies below/within terrain boundary (surface pressure ${pSfc.toFixed(1)} hPa at ${params.elevationM} m)`,
      value: null,
    };
  }

  return {
    levelHpa: params.levelHpa,
    surfacePressureHpa: roundNullable(pSfc, 1) ?? pSfc,
    isAboveGround: true,
    maskedReason: null,
    value: roundNullable(params.rawValue, params.decimals ?? 1),
  };
}

export interface AdaptiveAboveGroundMoisture {
  surfacePressureHpa: number;
  rh850Masked: MaskedPressureLevelSample;
  selectedAboveGroundLevelHpa: 850 | 700 | 500;
  selectedRhPct: number | null;
  selectedWindKmh: number | null;
  selectedWindDirDeg: number | null;
  tcwvKgM2: number | null; // Total-Column Integrated Water Vapour (mm / kg m^-2)
}

export function resolveTerrainAwareMoisture(params: {
  elevationM: number;
  surfacePressureHpa: number | null;
  rh850: unknown;
  wind850: unknown;
  dir850: unknown;
  rh700: unknown;
  wind700: unknown;
  dir700: unknown;
  rh500: unknown;
  wind500: unknown;
  dir500: unknown;
  tcwv: unknown;
}): AdaptiveAboveGroundMoisture {
  const pSfc =
    params.surfacePressureHpa ?? estimateStandardPressureHpa(params.elevationM);

  const rh850Masked = maskBelowGroundPressureSample({
    levelHpa: 850,
    surfacePressureHpa: pSfc,
    elevationM: params.elevationM,
    rawValue: params.rh850,
    decimals: 0,
  });

  const rh700Masked = maskBelowGroundPressureSample({
    levelHpa: 700,
    surfacePressureHpa: pSfc,
    elevationM: params.elevationM,
    rawValue: params.rh700,
    decimals: 0,
  });

  if (rh850Masked.isAboveGround) {
    return {
      surfacePressureHpa: roundNullable(pSfc, 1) ?? pSfc,
      rh850Masked,
      selectedAboveGroundLevelHpa: 850,
      selectedRhPct: rh850Masked.value,
      selectedWindKmh: roundNullable(params.wind850, 1),
      selectedWindDirDeg: roundNullable(params.dir850, 0),
      tcwvKgM2: roundNullable(params.tcwv, 1),
    };
  }

  if (rh700Masked.isAboveGround) {
    return {
      surfacePressureHpa: roundNullable(pSfc, 1) ?? pSfc,
      rh850Masked,
      selectedAboveGroundLevelHpa: 700,
      selectedRhPct: rh700Masked.value,
      selectedWindKmh: roundNullable(params.wind700, 1),
      selectedWindDirDeg: roundNullable(params.dir700, 0),
      tcwvKgM2: roundNullable(params.tcwv, 1),
    };
  }

  return {
    surfacePressureHpa: roundNullable(pSfc, 1) ?? pSfc,
    rh850Masked,
    selectedAboveGroundLevelHpa: 500,
    selectedRhPct: roundNullable(params.rh500, 0),
    selectedWindKmh: roundNullable(params.wind500, 1),
    selectedWindDirDeg: roundNullable(params.dir500, 0),
    tcwvKgM2: roundNullable(params.tcwv, 1),
  };
}

// ─── Centralized In-Memory Cache & Deduped Upstream Fetcher ──────────────────

interface CacheRecord {
  rawList: any[];
  fetchedAtMs: number;
}

const INGESTION_CACHE = new Map<string, CacheRecord>();
const IN_FLIGHT_MAP = new Map<string, Promise<CacheRecord>>();

export function clearAtmosphericIngestionCache(): void {
  INGESTION_CACHE.clear();
  IN_FLIGHT_MAP.clear();
}

export interface FetchOpenMeteoOptions {
  endpointBase?: string; // default 'https://api.open-meteo.com/v1/forecast'
  sourceName?: string;
  modelName?: string;
  provenanceClass?: ScientificProvenanceClass;
  latitudes: number[];
  longitudes: number[];
  queryParams: Record<string, string | number>;
  expectedUnits?: Record<string, string[]>;
  cacheTtlMs?: number;
  forceRefresh?: boolean;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export interface IngestionBatchResult {
  ok: boolean;
  error: string | null;
  items: any[];
  envelope: SourceIngestionEnvelope;
}

export async function fetchOpenMeteoManagedBatch(
  opts: FetchOpenMeteoOptions
): Promise<IngestionBatchResult> {
  const endpointBase = opts.endpointBase || 'https://api.open-meteo.com/v1/forecast';
  const cacheTtlMs = opts.cacheTtlMs ?? 10 * 60 * 1000;
  const timeoutMs = opts.timeoutMs ?? 18000;
  const fetchFn = opts.fetchImpl || fetch;
  const nowMs = Date.now();

  const search = new URLSearchParams();
  search.set('latitude', opts.latitudes.join(','));
  search.set('longitude', opts.longitudes.join(','));
  for (const [k, v] of Object.entries(opts.queryParams)) {
    search.set(k, String(v));
  }
  const fullUrl = `${endpointBase}?${search.toString()}`;

  const requestedVars = [
    ...(String(opts.queryParams.current || '').split(',').filter(Boolean)),
    ...(String(opts.queryParams.hourly || '').split(',').filter(Boolean)),
    ...(String(opts.queryParams.daily || '').split(',').filter(Boolean)),
  ];

  const domain = {
    minLat: Math.min(...opts.latitudes),
    maxLat: Math.max(...opts.latitudes),
    minLon: Math.min(...opts.longitudes),
    maxLon: Math.max(...opts.longitudes),
    requestedPoints: opts.latitudes.length,
    returnedPoints: 0,
  };

  const cached = INGESTION_CACHE.get(fullUrl);
  if (!opts.forceRefresh && cached && nowMs - cached.fetchedAtMs < cacheTtlMs) {
    return buildBatchEnvelope(cached.rawList, cached.fetchedAtMs, 'CACHED', opts, endpointBase, requestedVars, domain, nowMs);
  }

  try {
    let pending = IN_FLIGHT_MAP.get(fullUrl);
    if (!pending || opts.forceRefresh) {
      pending = (async () => {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
          const res = await fetchFn(fullUrl, {
            signal: controller.signal,
            cache: 'no-store',
          });
          if (!res.ok) {
            let errReason = '';
            try {
              const txt = await res.text();
              errReason = txt ? `: ${txt.slice(0, 220)}` : '';
            } catch {
              // ignore body parse failure
            }
            throw new Error(`Upstream HTTP ${res.status} from ${endpointBase}${errReason}`);
          }
          const json = await res.json();
          if (json && typeof json === 'object' && !Array.isArray(json) && json.error) {
            throw new Error(String(json.reason || 'Open-Meteo returned error object'));
          }
          const rawList = Array.isArray(json) ? json : [json];
          const rec: CacheRecord = { rawList, fetchedAtMs: Date.now() };
          INGESTION_CACHE.set(fullUrl, rec);
          return rec;
        } finally {
          clearTimeout(timer);
        }
      })().finally(() => {
        IN_FLIGHT_MAP.delete(fullUrl);
      });
      IN_FLIGHT_MAP.set(fullUrl, pending);
    }

    const record = await pending;
    return buildBatchEnvelope(record.rawList, record.fetchedAtMs, 'FRESH', opts, endpointBase, requestedVars, domain, Date.now());
  } catch (err: any) {
    if (cached) {
      return buildBatchEnvelope(cached.rawList, cached.fetchedAtMs, 'STALE_FALLBACK', opts, endpointBase, requestedVars, domain, Date.now(), err?.message);
    }
    return {
      ok: false,
      error: err?.message || 'Upstream fetch failed',
      items: [],
      envelope: {
        sourceName: opts.sourceName || 'Open-Meteo Forecast API',
        endpoint: endpointBase,
        model: opts.modelName || 'ECMWF IFS / NOAA GFS / ICON Seamless',
        provenanceClass: 'Unavailable',
        requestedVariables: requestedVars,
        responseUnits: {},
        unitValidationPassed: false,
        unitMismatches: [err?.message || 'Fetch failed'],
        initializationTimeUtc: null,
        validTimeUtc: null,
        fetchTimeUtc: new Date(nowMs).toISOString(),
        freshnessMinutes: 0,
        freshnessStatus: 'UNAVAILABLE',
        domain,
        completeness: { validValues: 0, expectedValues: opts.latitudes.length, completenessPct: 0 },
      },
    };
  }
}

function buildBatchEnvelope(
  rawList: any[],
  fetchedAtMs: number,
  freshnessStatus: FreshnessStatus,
  opts: FetchOpenMeteoOptions,
  endpointBase: string,
  requestedVars: string[],
  domain: SourceIngestionEnvelope['domain'],
  nowMs: number,
  fallbackErr?: string
): IngestionBatchResult {
  const sample = rawList[0] || {};
  const mergedUnits: Record<string, string> = {
    ...(sample.current_units || {}),
    ...(sample.hourly_units || {}),
    ...(sample.daily_units || {}),
  };

  const unitCheck = opts.expectedUnits
    ? validateExpectedUnits(mergedUnits, opts.expectedUnits)
    : { passed: true, mismatches: [] };

  const hTimes: string[] | undefined = sample.hourly?.time;
  const dTimes: string[] | undefined = sample.daily?.time;
  let validTimeUtc: string | null = null;
  if (sample.current?.time) {
    validTimeUtc = toUtcIso(sample.current.time);
  } else if (Array.isArray(hTimes) && hTimes.length > 0) {
    const hIdx = findHourlyValidIndex(hTimes, nowMs);
    validTimeUtc = toUtcIso(hTimes[hIdx]);
  } else if (Array.isArray(dTimes) && dTimes.length > 0) {
    validTimeUtc = `${dTimes[dTimes.length - 1]}T00:00:00.000Z`;
  }

  return {
    ok: true,
    error: fallbackErr || null,
    items: rawList,
    envelope: {
      sourceName: opts.sourceName || 'Open-Meteo Forecast API',
      endpoint: endpointBase,
      model: opts.modelName || 'ECMWF IFS 0.25° / NOAA GFS / DWD ICON Seamless',
      provenanceClass: opts.provenanceClass || 'Model Analysis',
      requestedVariables: requestedVars,
      responseUnits: mergedUnits,
      unitValidationPassed: unitCheck.passed,
      unitMismatches: unitCheck.mismatches,
      initializationTimeUtc: endpointBase.includes('archive-api')
        ? null
        : inferSynopticModelCycleUtc(fetchedAtMs),
      validTimeUtc,
      fetchTimeUtc: new Date(fetchedAtMs).toISOString(),
      freshnessMinutes: Math.max(0, Math.round((nowMs - fetchedAtMs) / 60000)),
      freshnessStatus,
      domain: {
        ...domain,
        returnedPoints: rawList.length,
      },
      completeness: {
        validValues: rawList.length,
        expectedValues: opts.latitudes.length,
        completenessPct:
          opts.latitudes.length > 0
            ? Math.round((rawList.length / opts.latitudes.length) * 100)
            : 0,
      },
    },
  };
}
