import { NextResponse } from 'next/server';
import { allowForcedUpstreamRefresh } from '@/lib/seo/admin-session';
import { KEW_OWNED_PHYSICAL_SENSORS_COUNT } from '@/data/monitoring-infrastructure-registry';
import {
  airQualityRegistry,
  groundStationsRegistry,
  AirQualityLiveRecord,
  GroundStationLiveRecord,
  SensorNodeReading,
  ValidationDelta,
  calculateIndianNAQI,
  calculateUsAqi,
  getAqiCategory,
  getAqiVariant,
  getInitialAirQualitySnapshot,
} from '@/data/air-quality-registry';

export const dynamic = 'force-dynamic';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5-minute server cache aligned with ground sensor sync & Open-Meteo rate limits
const RATE_LIMIT_COOLDOWN_MS = 5 * 60 * 1000; // 5-minute cooldown after HTTP 429

let cachedPayload: Record<string, unknown> | null = null;
let cachedAt = 0;
let rateLimitedUntil = 0;
let inFlightJob: Promise<Record<string, unknown>> | null = null;

export interface AirHazardAlert {
  id: string;
  stationName: string;
  district: string;
  scope: string;
  type: 'Community Optical Sensor + CAMS Gases' | 'Gridded Atmospheric Model (ECMWF CAMS 11 km)' | 'Ground Sensor / CAAQMS' | 'Regional Model Grid';
  naqi: number;
  naqiCategory: string;
  aqi_us: number;
  pm25: number;
  dominantPollutant: string;
  severity: 'moderate' | 'high' | 'critical';
  headline: string;
  recommendation: string;
}

// District -> BreatheOSS / AirGradient regional zone_id mapping
const DISTRICT_TO_BREATHE_ZONE: Record<string, string> = {
  Srinagar: 'srinagar',
  Jammu: 'jammu_city',
  Anantnag: 'anantnag_city',
  Bandipora: 'bandipora_town',
  Baramulla: 'baramulla_town',
  Doda: 'doda_town',
  Ganderbal: 'ganderbal_town',
  Kargil: 'kargil_town',
  Kathua: 'kathua_town',
  Kishtwar: 'kishtwar_town',
  Kulgam: 'kulgam_town',
  Kupwara: 'kupwara_town',
  Leh: 'leh',
  Poonch: 'poonch_town',
  Pulwama: 'pulwama_town',
  Rajouri: 'rajouri_town',
  Ramban: 'ramban_town',
  Reasi: 'reasi_town',
  Samba: 'samba_town',
  Shopian: 'shopian_town',
  Udhampur: 'udhampur_city',
};

interface BreatheNodeRaw {
  pm2_5?: number | null;
  pm10?: number | null;
  aqi?: number | null;
  us_aqi?: number | null;
  status?: string;
}

interface BreatheZoneRaw {
  zone_id: string;
  zone_name: string;
  source?: string;
  timestamp_unix?: number;
  aqi?: number | null;
  us_aqi?: number | null;
  main_pollutant?: string;
  concentrations_us_units?: {
    pm2_5?: number | null;
    pm10?: number | null;
    no2?: number | null;
    so2?: number | null;
    co?: number | null; // ppm in BreatheOSS
  };
  history?: Array<{
    ts: number;
    aqi?: number;
    us_aqi?: number;
    pm2_5?: number;
    pm10?: number;
  }>;
  nodes?: Record<string, BreatheNodeRaw>;
}

function formatRelativeAge(timestampMs: number, nowMs: number): { label: string; isStale: boolean } {
  const diffMs = Math.max(0, nowMs - timestampMs);
  const diffMins = Math.floor(diffMs / 60000);
  const isStale = diffMs > 2 * 60 * 60 * 1000;
  if (diffMins <= 1) return { label: 'Live (Just now)', isStale };
  if (diffMins < 60) return { label: `Live (${diffMins}m ago)`, isStale };
  return { label: `${Math.floor(diffMins / 60)}h ${diffMins % 60}m ago`, isStale };
}

function parseGmtHourString(timeStr: string): Date {
  // With timezone=GMT, Open-Meteo returns ISO strings without 'Z' (e.g. "2026-11-23T04:00")
  if (!timeStr) return new Date(0);
  return new Date(timeStr.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(timeStr) ? timeStr : `${timeStr}Z`);
}

function naqiCategoryAndVariant(naqi: number): {
  category: string;
  variant: 'success' | 'warning' | 'danger' | 'critical';
} {
  if (naqi <= 50) return { category: 'Good', variant: 'success' };
  if (naqi <= 100) return { category: 'Satisfactory', variant: 'success' };
  if (naqi <= 200) return { category: 'Moderate', variant: 'warning' };
  if (naqi <= 300) return { category: 'Poor', variant: 'danger' };
  if (naqi <= 400) return { category: 'Very Poor', variant: 'critical' };
  return { category: 'Severe', variant: 'critical' };
}

async function fetchBreatheGroundZones(): Promise<Map<string, BreatheZoneRaw>> {
  const map = new Map<string, BreatheZoneRaw>();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5500);
  try {
    const res = await fetch('https://api.breatheoss.app/aqi/zones', {
      signal: controller.signal,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return map;
    const json = await res.json();
    if (Array.isArray(json?.zones)) {
      for (const z of json.zones as BreatheZoneRaw[]) {
        if (z?.zone_id) {
          map.set(z.zone_id, z);
        }
      }
    }
  } catch {
    // Non-fatal: ground sensor layer degrades gracefully to Open-Meteo current feed
  } finally {
    clearTimeout(timeout);
  }
  return map;
}

async function fetchOpenMeteoGrid(): Promise<{ results: any[]; rateLimited: boolean }> {
  const lats = airQualityRegistry.map((s) => s.lat).join(',');
  const lngs = airQualityRegistry.map((s) => s.lng).join(',');

  // Use timezone=GMT + current=... so UTC server timestamps match 1:1 with zero IST/UTC offset skew
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lats}&longitude=${lngs}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi&hourly=pm2_5,us_aqi&timezone=GMT&forecast_days=1&past_days=1`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
    });
    if (res.status === 429) {
      return { results: [], rateLimited: true };
    }
    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }
    const raw = await res.json();
    return {
      results: Array.isArray(raw) ? raw : [raw],
      rateLimited: false,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function extractActiveSensorNodes(zone?: BreatheZoneRaw): SensorNodeReading[] {
  if (!zone?.nodes) return [];
  const list: SensorNodeReading[] = [];
  for (const [name, node] of Object.entries(zone.nodes)) {
    if (node && node.status === 'active' && typeof node.pm2_5 === 'number') {
      const pm25 = Number(node.pm2_5.toFixed(1));
      const pm10 = Number((node.pm10 ?? pm25 * 1.3).toFixed(1));
      const usCalc = calculateUsAqi(pm25, pm10);
      const naqiCalc = calculateIndianNAQI({ pm25, pm10 });
      list.push({
        name,
        pm25,
        pm10,
        naqi: typeof node.aqi === 'number' ? Math.round(node.aqi) : naqiCalc.aqi,
        aqi_us: typeof node.us_aqi === 'number' ? Math.round(node.us_aqi) : usCalc.aqi,
        status: 'active',
      });
    }
  }
  return list;
}

export async function GET(request: Request) {
  const now = new Date();
  const nowMs = now.getTime();
  const { searchParams } = new URL(request.url);
  const rawForceRefresh = searchParams.get('refresh') === '1';
  const forceRefresh = rawForceRefresh && allowForcedUpstreamRefresh(request, 'air-pollution', 60_000);

  if (!forceRefresh && cachedPayload && nowMs - cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cachedPayload);
  }

  if (nowMs < rateLimitedUntil && !forceRefresh) {
    if (cachedPayload) {
      return NextResponse.json({ ...cachedPayload, rateLimitedCached: true });
    }
  }

  try {
    if (!inFlightJob) {
      inFlightJob = (async () => {
        const [openMeteoOutcome, breatheMap] = await Promise.all([
          fetchOpenMeteoGrid().catch(() => ({ results: [] as any[], rateLimited: false })),
          fetchBreatheGroundZones(),
        ]);

        if (openMeteoOutcome.rateLimited) {
          rateLimitedUntil = Date.now() + RATE_LIMIT_COOLDOWN_MS;
          if (cachedPayload && breatheMap.size === 0) {
            return { ...cachedPayload, rateLimitedCached: true };
          }
        }

        const omResults = openMeteoOutcome.results;
        if (omResults.length === 0 && breatheMap.size === 0) {
          throw new Error('Both Open-Meteo and Ground Sensor feeds unavailable');
        }

        const currentNow = new Date();
        const currentNowMs = currentNow.getTime();

        // Keep pure CAMS/Open-Meteo model readings per district for empirical ground-vs-model validation
        const modelOnlyByDistrict = new Map<string, { pm25: number; pm10: number; naqi: number; aqi_us: number }>();

        // ── 1. Process 44 Regional Units (Physical Ground Sensors where active, Open-Meteo Current GMT elsewhere)
        const regionalUnits: AirQualityLiveRecord[] = airQualityRegistry.map((unit, i) => {
          const omData = omResults[i];
          const cur = omData?.current;
          const hourly = omData?.hourly;
          const times: string[] = hourly?.time || [];

          // Determine latest UTC index & previous UTC index in hourly series
          let latestIdx = -1;
          let prevIdx = -1;
          for (let j = times.length - 1; j >= 0; j--) {
            const t = parseGmtHourString(times[j]);
            if (t.getTime() <= currentNowMs && (hourly?.pm2_5?.[j] != null || hourly?.us_aqi?.[j] != null)) {
              if (latestIdx === -1) {
                latestIdx = j;
              } else if (prevIdx === -1) {
                prevIdx = j;
                break;
              }
            }
          }

          const omPm25 = Number((cur?.pm2_5 ?? (latestIdx !== -1 ? hourly?.pm2_5?.[latestIdx] : null) ?? 25.0).toFixed(1));
          const omPm10 = Number((cur?.pm10 ?? 42.0).toFixed(1));
          const omNo2 = Number((cur?.nitrogen_dioxide ?? 14.0).toFixed(1));
          const omSo2 = Number((cur?.sulphur_dioxide ?? 5.0).toFixed(1));
          const omCo = Number((cur?.carbon_monoxide ?? 320).toFixed(0));
          const omO3 = Number((cur?.ozone ?? 35.0).toFixed(1));
          const omUsAqiRaw = cur?.us_aqi ?? (latestIdx !== -1 ? hourly?.us_aqi?.[latestIdx] : null);

          const omNaqiCalc = calculateIndianNAQI({
            pm25: omPm25,
            pm10: omPm10,
            no2: omNo2,
            so2: omSo2,
            co: omCo,
            o3: omO3,
          });
          const omUsCalc =
            typeof omUsAqiRaw === 'number'
              ? {
                  aqi: Math.round(omUsAqiRaw),
                  category: getAqiCategory(Math.round(omUsAqiRaw)),
                  variant: getAqiVariant(Math.round(omUsAqiRaw)),
                }
              : calculateUsAqi(omPm25, omPm10);

          modelOnlyByDistrict.set(unit.district, {
            pm25: omPm25,
            pm10: omPm10,
            naqi: omNaqiCalc.aqi,
            aqi_us: omUsCalc.aqi,
          });

          // Check if district has active physical ground sensors (AirGradient via BreatheOSS — same sensors feeding IQAir)
          const breatheZoneId = DISTRICT_TO_BREATHE_ZONE[unit.district];
          const breatheZone = breatheZoneId ? breatheMap.get(breatheZoneId) : undefined;
          const hasPhysicalSensor =
            Boolean(breatheZone?.source?.toLowerCase().includes('airgradient')) &&
            typeof breatheZone?.concentrations_us_units?.pm2_5 === 'number';

          if (hasPhysicalSensor && breatheZone) {
            const sensorNodes = extractActiveSensorNodes(breatheZone);
            const pm25 = Number((breatheZone.concentrations_us_units?.pm2_5 ?? omPm25).toFixed(1));
            const pm10 = Number((breatheZone.concentrations_us_units?.pm10 ?? omPm10).toFixed(1));
            const no2 = Number((breatheZone.concentrations_us_units?.no2 ?? omNo2).toFixed(1));
            const so2 = Number((breatheZone.concentrations_us_units?.so2 ?? omSo2).toFixed(1));
            // BreatheOSS CO is reported in ppm; convert to µg/m³ (1 ppm CO ≈ 1145 µg/m³ at STP) or fallback to Open-Meteo
            const coRaw = breatheZone.concentrations_us_units?.co;
            const co = typeof coRaw === 'number' ? Math.round(coRaw < 25 ? coRaw * 1145 : coRaw) : omCo;
            const o3 = omO3;

            const calcNaqi = calculateIndianNAQI({ pm25, pm10, no2, so2, co, o3 });
            const naqi = typeof breatheZone.aqi === 'number' ? Math.round(breatheZone.aqi) : calcNaqi.aqi;
            const naqiMeta = naqiCategoryAndVariant(naqi);

            const calcUs = calculateUsAqi(pm25, pm10);
            const aqiUs = typeof breatheZone.us_aqi === 'number' ? Math.round(breatheZone.us_aqi) : calcUs.aqi;

            // Compute trend from BreatheOSS sensor history
            let trend: 'Stable' | 'Rising' | 'Falling' = 'Stable';
            const hist = breatheZone.history || [];
            if (hist.length >= 2) {
              const latestH = hist[hist.length - 1];
              const prevH = hist[hist.length - 2];
              const diff = (latestH?.pm2_5 ?? pm25) - (prevH?.pm2_5 ?? pm25);
              if (diff > 3) trend = 'Rising';
              else if (diff < -3) trend = 'Falling';
            }

            const sensorTsMs = breatheZone.timestamp_unix ? breatheZone.timestamp_unix * 1000 : currentNowMs;
            const age = formatRelativeAge(sensorTsMs, currentNowMs);

            const dominantMap: Record<string, string> = {
              pm2_5: 'PM2.5',
              pm10: 'PM10',
              no2: 'NO₂',
              so2: 'SO₂',
              co: 'CO',
              o3: 'O₃',
            };
            const dominant =
              (breatheZone.main_pollutant && dominantMap[breatheZone.main_pollutant]) || calcNaqi.dominantPollutant;

            return {
              ...unit,
              verification_status: 'Community Optical Sensor (AirGradient) + CAMS Model Gases',
              data_source:
                sensorNodes.length > 0
                  ? `Community Optical Sensor (AirGradient: ${sensorNodes.length} Node${sensorNodes.length > 1 ? 's' : ''}) + CAMS Model Gases`
                  : 'Community Optical Sensor (AirGradient) + CAMS Model Gases',
              pm25,
              pm10,
              no2,
              so2,
              co,
              o3,
              naqi,
              naqiCategory: naqiMeta.category,
              naqiVariant: naqiMeta.variant,
              aqi_us: aqiUs,
              aqi_usCategory: getAqiCategory(aqiUs),
              aqi_usVariant: getAqiVariant(aqiUs),
              displayAqi: aqiUs,
              displayCategory: getAqiCategory(aqiUs),
              displayVariant: getAqiVariant(aqiUs),
              dominantPollutant: dominant,
              trend,
              lastUpdated: age.label,
              apiTimestamp: new Date(sensorTsMs).toISOString(),
              isStale: age.isStale,
              modelRunTime: 'Community Optical PM2.5 (Non-Regulatory) + 11 km CAMS Gases',
              activeSensorCount: sensorNodes.length || 1,
              sensorNodes,
            };
          }

          // Pure Open-Meteo / Copernicus CAMS current telemetry (UTC-accurate)
          let trend: 'Stable' | 'Rising' | 'Falling' = 'Stable';
          if (latestIdx !== -1 && prevIdx !== -1) {
            const prevPm25 = hourly?.pm2_5?.[prevIdx] ?? omPm25;
            const diff = omPm25 - prevPm25;
            if (diff > 3) trend = 'Rising';
            else if (diff < -3) trend = 'Falling';
          }

          const omTimeDate = cur?.time
            ? parseGmtHourString(cur.time)
            : latestIdx !== -1
              ? parseGmtHourString(times[latestIdx])
              : currentNow;
          const age = formatRelativeAge(omTimeDate.getTime(), currentNowMs);

          return {
            ...unit,
            verification_status: 'Gridded Atmospheric Model (ECMWF CAMS 11 km)',
            pm25: omPm25,
            pm10: omPm10,
            no2: omNo2,
            so2: omSo2,
            co: omCo,
            o3: omO3,
            naqi: omNaqiCalc.aqi,
            naqiCategory: omNaqiCalc.category,
            naqiVariant: omNaqiCalc.variant,
            aqi_us: omUsCalc.aqi,
            aqi_usCategory: omUsCalc.category,
            aqi_usVariant: omUsCalc.variant,
            displayAqi: omUsCalc.aqi,
            displayCategory: omUsCalc.category,
            displayVariant: omUsCalc.variant,
            dominantPollutant: omNaqiCalc.dominantPollutant,
            trend,
            lastUpdated: `Model Cycle (${age.label.replace(/^Live\s*\((.*)\)$/, '$1')})`,
            apiTimestamp: omTimeDate.toISOString(),
            isStale: age.isStale,
            modelRunTime: 'ECMWF CAMS 11 km Gridded Model Cycle (No Ground Sensor)',
          };
        });

        // ── 2. Process Reference Nodes: Distinguish Community Optical Nodes vs Pure 11 km CAMS Model Cells (Muzaffarabad & Gilgit = Model Only)
        const groundStations: GroundStationLiveRecord[] = groundStationsRegistry.map((station) => {
          const matchingUnit = regionalUnits.find((u) => u.district === station.district) || regionalUnits[0];
          const hasCommunityOptical =
            matchingUnit.verification_status === 'Community Optical Sensor (AirGradient) + CAMS Model Gases' &&
            station.district !== 'Muzaffarabad' &&
            station.district !== 'Gilgit';

          return {
            ...station,
            station_type: hasCommunityOptical
              ? 'Community Optical Sensor (AirGradient) + CAMS Model Gases'
              : 'Gridded Atmospheric Model (ECMWF CAMS 11 km)',
            is_ground_truth: false, // Zero regulatory CPCB CAAQMS / EPA reference BAM APIs connected
            pm25: matchingUnit.pm25,
            pm10: matchingUnit.pm10,
            no2: matchingUnit.no2,
            so2: matchingUnit.so2,
            co: matchingUnit.co,
            o3: matchingUnit.o3,
            naqi: matchingUnit.naqi,
            naqiCategory: matchingUnit.naqiCategory,
            naqiVariant: matchingUnit.naqiVariant,
            aqi_us: matchingUnit.aqi_us,
            aqi_usCategory: matchingUnit.aqi_usCategory,
            aqi_usVariant: matchingUnit.aqi_usVariant,
            displayAqi: matchingUnit.aqi_us,
            displayCategory: matchingUnit.aqi_usCategory,
            displayVariant: matchingUnit.aqi_usVariant,
            dominantPollutant: matchingUnit.dominantPollutant,
            trend: matchingUnit.trend,
            observationTimestamp: matchingUnit.apiTimestamp,
            lastUpdated: matchingUnit.lastUpdated,
            apiTimestamp: matchingUnit.apiTimestamp,
            isStale: matchingUnit.isStale,
            status: matchingUnit.isStale ? 'MAINTENANCE' : 'ONLINE',
            activeSensorCount: hasCommunityOptical ? matchingUnit.activeSensorCount : 0,
            sensorNodes: hasCommunityOptical ? matchingUnit.sensorNodes : [],
          };
        });

        // ── 3. Community Optical PM2.5 vs. 11km CAMS Model Deltas (ONLY when a real community sensor reading exists — NEVER CAMS minus CAMS!)
        const validationDeltas: ValidationDelta[] = [];
        for (const districtName of ['Srinagar', 'Jammu', 'Leh'] as const) {
          const gnd = groundStations.find(
            (g) =>
              g.district === districtName &&
              g.station_type === 'Community Optical Sensor (AirGradient) + CAMS Model Gases' &&
              (g.activeSensorCount ?? 0) > 0
          );
          const mdl = modelOnlyByDistrict.get(districtName);
          if (gnd && mdl && gnd.pm25 > 0) {
            const delta = Number((gnd.pm25 - mdl.pm25).toFixed(1));
            const bias = Number((((mdl.pm25 - gnd.pm25) / gnd.pm25) * 100).toFixed(1));
            validationDeltas.push({
              stationId: gnd.id,
              stationName: gnd.name,
              district: gnd.district,
              groundPm25: gnd.pm25,
              modelPm25: mdl.pm25,
              deltaPm25: delta,
              biasPercent: bias,
              groundAqi: gnd.aqi_us,
              modelAqi: mdl.aqi_us,
              inversionFactor:
                delta > 35 ? 'Severe Trapping' : delta > 10 ? 'Moderate Stagnation' : 'Normal Dispersion',
              scientificNote:
                delta > 10
                  ? `ECMWF CAMS 11 km grid (${mdl.pm25} µg/m³) underestimates non-regulatory community optical PM2.5 (${gnd.pm25} µg/m³) by ${Math.abs(bias)}% during localized valley boundary-layer trapping.`
                  : `ECMWF CAMS 11 km grid (${mdl.pm25} µg/m³) aligns closely with community optical PM2.5 (${gnd.pm25} µg/m³) under mixed dispersion.`,
            });
          }
        }

        // ── 4. Detect Active Air Hazard Screening Advisories
        const alerts: AirHazardAlert[] = [];
        regionalUnits.forEach((r) => {
          const isCommunitySensor =
            r.verification_status === 'Community Optical Sensor (AirGradient) + CAMS Model Gases';
          if (r.aqi_us > 150 || r.naqi > 150 || r.pm25 > 60) {
            const severity: 'moderate' | 'high' | 'critical' =
              r.aqi_us > 200 || r.naqi > 250 ? 'critical' : r.aqi_us > 150 || r.naqi > 150 ? 'high' : 'moderate';
            alerts.push({
              id: `alert-${isCommunitySensor ? 'community' : 'cams'}-${r.id}`,
              stationName: r.name,
              district: r.district,
              scope: r.scope,
              type: isCommunitySensor
                ? 'Community Optical Sensor + CAMS Gases'
                : 'Gridded Atmospheric Model (ECMWF CAMS 11 km)',
              naqi: r.naqi,
              naqiCategory: r.naqiCategory,
              aqi_us: r.aqi_us,
              pm25: r.pm25,
              dominantPollutant: r.dominantPollutant,
              severity,
              headline: `${isCommunitySensor ? 'Community Optical Screening Advisory' : 'ECMWF CAMS 11 km Model Advisory'}: Instantaneous US AQI ${r.aqi_us} (NAQI ${r.naqi}) in ${r.district}`,
              recommendation:
                r.aqi_us > 200
                  ? 'Avoid prolonged outdoor exertion. Sensitive groups and children should wear N95 filtration masks.'
                  : 'Elevated particulate concentrations indicated by screening feed. Sensitive individuals should limit prolonged outdoor physical activity.',
            });
          }
        });

        alerts.sort((a, b) => b.aqi_us - a.aqi_us);

        const avgNaqi = Math.round(regionalUnits.reduce((acc, curr) => acc + curr.naqi, 0) / regionalUnits.length);
        const avgUsAqi = Math.round(regionalUnits.reduce((acc, curr) => acc + curr.aqi_us, 0) / regionalUnits.length);
        const unhealthyCount = regionalUnits.filter((d) => d.aqi_us > 100).length;
        const groundSensorDistricts = regionalUnits.filter(
          (d) => d.verification_status === 'Community Optical Sensor (AirGradient) + CAMS Model Gases'
        ).length;

        const payload: Record<string, unknown> = {
          success: true,
          kewOwnedPhysicalSensors: KEW_OWNED_PHYSICAL_SENSORS_COUNT,
          directCpcbCaaqmsApisCount: 0,
          groundStations,
          regionalUnits,
          validationDeltas,
          alerts,
          meta: {
            kewOwnedPhysicalSensors: KEW_OWNED_PHYSICAL_SENSORS_COUNT,
            directCpcbCaaqmsApisCount: 0,
            totalGroundStations: groundStations.length,
            groundSensorDistricts,
            totalRegionalUnits: regionalUnits.length,
            avgNaqi,
            avgUsAqi,
            unhealthyCount,
            provider: 'Community Optical Sensors (AirGradient / BreatheOSS, Non-Regulatory) + ECMWF CAMS 11 km Gridded Model (via Open-Meteo)',
            modelResolution: 'Non-regulatory community optical PM2.5 (Srinagar/Jammu/Leh) + 0.1° (~11 km) ECMWF CAMS atmospheric model (Muzaffarabad & Gilgit are 100% model grids)',
            aqiMethodologyDisclosure: 'Instantaneous hourly/optical concentrations evaluated against CPCB NAQI & US EPA AQI breakpoints for screening only; not statutory 24-hour regulatory NAAQS compliance averages.',
            updatedAt: currentNow.toISOString(),
          },
        };

        cachedPayload = payload;
        cachedAt = Date.now();
        return payload;
      })().finally(() => {
        inFlightJob = null;
      });
    }

    const result = await inFlightJob;
    return NextResponse.json(result);
  } catch {
    if (cachedPayload) {
      return NextResponse.json({ ...cachedPayload, staleFallback: true });
    }
    const snapshot = getInitialAirQualitySnapshot();
    return NextResponse.json({
      success: true,
      isLiveTelemetry: false,
      rateLimitedFallback: true,
      kewOwnedPhysicalSensors: KEW_OWNED_PHYSICAL_SENSORS_COUNT,
      directCpcbCaaqmsApisCount: 0,
      groundStations: snapshot.groundStations,
      regionalUnits: snapshot.regionalUnits,
      validationDeltas: snapshot.validationDeltas,
      alerts: [],
      meta: {
        kewOwnedPhysicalSensors: KEW_OWNED_PHYSICAL_SENSORS_COUNT,
        directCpcbCaaqmsApisCount: 0,
        totalGroundStations: snapshot.groundStations.length,
        totalRegionalUnits: snapshot.regionalUnits.length,
        avgNaqi: snapshot.avgNaqi,
        avgUsAqi: snapshot.avgUsAqi,
        unhealthyCount: snapshot.unhealthyCount,
        provider: 'External Feed Temporarily Unavailable — Historical Reference Only',
        modelResolution: '0.1° (~11 km) Historical Reference Climatology',
        updatedAt: null,
      },
    });
  }
}
