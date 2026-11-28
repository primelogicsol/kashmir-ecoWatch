import { NextResponse } from 'next/server';
import { AlertItem, getActiveAlerts } from '@/data/alert-registry';
import { allowForcedUpstreamRefresh } from '@/lib/seo/admin-session';

export const dynamic = 'force-dynamic';

const CACHE_TTL_MS = 90_000;
let cachedAlertsPayload: Record<string, unknown> | null = null;
let cachedAlertsAt = 0;
let inFlightAlertsJob: Promise<Record<string, unknown>> | null = null;

/**
 * Canonical 46 Western Himalayan Operational District Centroids
 * Used for exact Haversine nearest-centroid geocoding of USGS regional earthquakes.
 */
const CANONICAL_DISTRICT_CENTROIDS: ReadonlyArray<{ name: string; lat: number; lng: number }> = [
  // Kashmir Valley (10)
  { name: 'Srinagar', lat: 34.0837, lng: 74.7973 },
  { name: 'Ganderbal', lat: 34.2262, lng: 74.7748 },
  { name: 'Budgam', lat: 33.9349, lng: 74.6400 },
  { name: 'Anantnag', lat: 33.7311, lng: 75.1487 },
  { name: 'Kulgam', lat: 33.6446, lng: 75.0197 },
  { name: 'Pulwama', lat: 33.8716, lng: 74.8946 },
  { name: 'Shopian', lat: 33.7172, lng: 74.8343 },
  { name: 'Baramulla', lat: 34.1990, lng: 74.3636 },
  { name: 'Bandipora', lat: 34.4173, lng: 74.6431 },
  { name: 'Kupwara', lat: 34.5262, lng: 74.2546 },
  // Jammu Region (10)
  { name: 'Jammu', lat: 32.7266, lng: 74.8570 },
  { name: 'Samba', lat: 32.5624, lng: 75.1199 },
  { name: 'Kathua', lat: 32.3866, lng: 75.5173 },
  { name: 'Udhampur', lat: 32.9150, lng: 75.1416 },
  { name: 'Reasi', lat: 33.0804, lng: 74.8361 },
  { name: 'Rajouri', lat: 33.3773, lng: 74.3152 },
  { name: 'Poonch', lat: 33.7670, lng: 74.0921 },
  { name: 'Doda', lat: 33.1457, lng: 75.5480 },
  { name: 'Ramban', lat: 33.2428, lng: 75.2357 },
  { name: 'Kishtwar', lat: 33.3136, lng: 75.7673 },
  // Ladakh (2)
  { name: 'Leh', lat: 34.1526, lng: 77.5771 },
  { name: 'Kargil', lat: 34.5539, lng: 76.1349 },
  // Azad Jammu & Kashmir (10)
  { name: 'Muzaffarabad', lat: 34.3700, lng: 73.4711 },
  { name: 'Neelum', lat: 34.5880, lng: 73.9070 },
  { name: 'Jhelum Valley', lat: 34.1830, lng: 73.7500 },
  { name: 'Bagh', lat: 33.9811, lng: 73.7761 },
  { name: 'Haveli', lat: 33.9500, lng: 73.9000 },
  { name: 'Poonch (AJK)', lat: 33.8578, lng: 73.7604 },
  { name: 'Sudhnoti', lat: 33.7200, lng: 73.6500 },
  { name: 'Kotli', lat: 33.5156, lng: 73.9019 },
  { name: 'Mirpur', lat: 33.1482, lng: 73.7519 },
  { name: 'Bhimber', lat: 32.9747, lng: 74.0789 },
  // Gilgit-Baltistan (14)
  { name: 'Gilgit', lat: 35.9208, lng: 74.3080 },
  { name: 'Hunza', lat: 36.3167, lng: 74.6500 },
  { name: 'Nagar', lat: 36.2667, lng: 74.7333 },
  { name: 'Ghizer', lat: 36.1736, lng: 73.7636 },
  { name: 'Gupis-Yasin', lat: 36.2000, lng: 73.4000 },
  { name: 'Diamer', lat: 35.4206, lng: 74.0969 },
  { name: 'Darel', lat: 35.6200, lng: 73.7200 },
  { name: 'Tangir', lat: 35.6500, lng: 73.5200 },
  { name: 'Astore', lat: 35.3575, lng: 74.8563 },
  { name: 'Skardu', lat: 35.2971, lng: 75.6333 },
  { name: 'Shigar', lat: 35.4306, lng: 75.7364 },
  { name: 'Kharmang', lat: 34.9400, lng: 76.2167 },
  { name: 'Roundu', lat: 35.5400, lng: 75.4500 },
  { name: 'Ghanche', lat: 35.1667, lng: 76.3333 },
];

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

function findNearestCanonicalDistrict(lat: number, lon: number): { district: string; distanceKm: number } {
  let best = CANONICAL_DISTRICT_CENTROIDS[0];
  let bestDist = Infinity;
  for (const c of CANONICAL_DISTRICT_CENTROIDS) {
    const d = haversineDistanceKm(lat, lon, c.lat, c.lng);
    if (d < bestDist) {
      bestDist = d;
      best = c;
    }
  }
  return { district: best.name, distanceKm: Math.round(bestDist) };
}

async function fetchWithTimeout(url: string, timeoutMs = 4500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
    });
    return response;
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}

export async function GET(request: Request) {
  const nowMs = Date.now();
  const { searchParams } = new URL(request.url);
  const rawRefresh = searchParams.get('refresh') === '1';
  const forceRefresh = rawRefresh && allowForcedUpstreamRefresh(request, 'alerts-live', 60_000);

  if (!forceRefresh && cachedAlertsPayload && nowMs - cachedAlertsAt < CACHE_TTL_MS) {
    return NextResponse.json(cachedAlertsPayload);
  }

  if (!inFlightAlertsJob) {
    inFlightAlertsJob = (async () => {
      const now = new Date();
      const nowIso = now.toISOString();
      const liveAlerts: AlertItem[] = [];

      try {
        // Batch all 3 NWP forecast points (Srinagar, Ramban NH-44, Zoji La Pass) into ONE Open-Meteo call
        // to eliminate partial 429 drops that previously caused 6 vs 7 alert count drift!
        const [airQualityRes, floodRes, usgsQuakesRes, multiWeatherRes] = await Promise.all([
          fetchWithTimeout(
            'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=34.0837&longitude=74.7973&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi&timezone=UTC'
          ),
          fetchWithTimeout(
            'https://flood-api.open-meteo.com/v1/flood?latitude=34.08&longitude=74.80&daily=river_discharge,river_discharge_mean,river_discharge_max&forecast_days=3&timezone=UTC'
          ),
          fetchWithTimeout(
            'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=2.5&minlatitude=31.5&maxlatitude=37.5&minlongitude=72.0&maxlongitude=80.0&limit=2'
          ),
          fetchWithTimeout(
            'https://api.open-meteo.com/v1/forecast?latitude=34.0837,33.24,34.28&longitude=74.7973,75.19,75.50&current=temperature_2m,relative_humidity_2m,precipitation,snow_depth,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&past_days=2&forecast_days=1&timezone=UTC'
          ),
        ]);

        // ──────────────────────────────────────────────────────────────────────
        // 1. Air Quality Model Screening (Srinagar CAMS 11 km Grid)
        // ──────────────────────────────────────────────────────────────────────
        if (airQualityRes && airQualityRes.ok) {
          const aqiData = await airQualityRes.json();
          const current = aqiData?.current;
          if (current) {
            const pm25 = Math.round((current.pm2_5 ?? 0) * 10) / 10;
            const pm10 = Math.round((current.pm10 ?? 0) * 10) / 10;
            const usAqi = Math.round(current.us_aqi ?? 0);

            let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
            let statusText = 'Good';
            if (usAqi > 200 || pm25 > 120) {
              severity = 'critical';
              statusText = 'Very Unhealthy';
            } else if (usAqi > 150 || pm25 > 55) {
              severity = 'high';
              statusText = 'Unhealthy';
            } else if (usAqi > 100 || pm25 > 35) {
              severity = 'moderate';
              statusText = 'Unhealthy for Sensitive Groups';
            } else if (usAqi > 50 || pm25 > 15) {
              severity = 'low';
              statusText = 'Moderate';
            }

            liveAlerts.push({
              id: 'live-air-srinagar',
              title: `CAMS Atmospheric Model Screening: ${statusText} (US AQI ${usAqi}) — Srinagar`,
              category: 'air-quality',
              severity,
              status: 'active',
              district: 'Srinagar',
              affectedArea: 'Srinagar Basin ~11 km CAMS Grid Cell',
              issued: nowIso,
              updated: nowIso,
              expires: new Date(now.getTime() + 24 * 3600 * 1000).toISOString(),
              source: 'platform-reviewed',
              issuedBy: 'Copernicus CAMS Gridded Model (via Open-Meteo, ~11 km)',
              summary: `ECMWF Copernicus CAMS (~11 km gridded atmospheric model) estimates instantaneous US AQI ${usAqi} (${statusText}) in Srinagar (modeled PM2.5: ${pm25} µg/m³, PM10: ${pm10} µg/m³). Non-regulatory screening only.`,
              cause: 'Gridded atmospheric composition reanalysis assimilating satellite aerosol optical depth and synoptic meteorology.',
              guidance: {
                summary:
                  severity === 'high' || severity === 'critical'
                    ? 'Elevated particulate concentrations indicated by model screening. Sensitive groups should limit prolonged outdoor exertion.'
                    : 'Model-screened particulate concentrations remain within seasonal baseline bounds.',
                actions: [
                  `Modeled PM2.5 (CAMS 11 km): ${pm25} µg/m³`,
                  `Modeled PM10 (CAMS 11 km): ${pm10} µg/m³ · US AQI: ${usAqi}`,
                  'Ventilate indoor spaces after midday boundary-layer mixing',
                  'Avoid open burning of orchard prunings and biomass',
                ],
                travelImpact: 'None.',
                urgency: severity === 'high' || severity === 'critical' ? 'urgent' : 'advisory',
              },
              relatedModule: 'environmental-monitoring',
              relatedModulePath: '/environmental-monitoring/air-pollution',
              updates: [
                {
                  timestamp: nowIso,
                  action: 'CAMS Model Cycle Evaluated',
                  note: `Gridded model estimate: PM2.5 ${pm25} µg/m³, US AQI ${usAqi}.`,
                },
              ],
              tags: ['air-quality', 'srinagar', 'cams-model', 'pm25', 'screening'],
            });
          }
        }

        // ──────────────────────────────────────────────────────────────────────
        // 2. Srinagar Jhelum River Discharge Screening (Copernicus GloFAS v4)
        //    Calibrated to Jhelum physical hydrology: >= 650 m³/s warning, >= 950 m³/s critical
        // ──────────────────────────────────────────────────────────────────────
        if (floodRes && floodRes.ok) {
          const floodData = await floodRes.json();
          const discharges: number[] = floodData?.daily?.river_discharge || [];
          const currentDischarge =
            typeof discharges[0] === 'number' ? Math.round(discharges[0] * 10) / 10 : null;
          const maxForecast =
            typeof floodData?.daily?.river_discharge_max?.[0] === 'number'
              ? Math.round(floodData.daily.river_discharge_max[0] * 10) / 10
              : currentDischarge;

          if (currentDischarge !== null) {
            let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
            let stageText = 'Normal Seasonal Flow';
            if (currentDischarge >= 950) {
              severity = 'critical';
              stageText = 'Critical Modeled Flood Discharge Screening (≥950 m³/s)';
            } else if (currentDischarge >= 650) {
              severity = 'high';
              stageText = 'Elevated Modeled Flood Screening Warning (≥650 m³/s)';
            } else if (currentDischarge >= 450) {
              severity = 'moderate';
              stageText = 'High Snowmelt / Bankfull Watch (≥450 m³/s)';
            }

            liveAlerts.push({
              id: 'live-flood-jhelum',
              title: `Copernicus GloFAS v4 Modeled Discharge: ${stageText} — Jhelum Basin`,
              category: 'flood',
              severity,
              status: 'active',
              district: 'Srinagar',
              affectedArea: 'Jhelum River (~5 km GloFAS Grid Cell near Srinagar)',
              corridor: 'Jhelum River Drainage Basin',
              issued: nowIso,
              updated: nowIso,
              expires: new Date(now.getTime() + 48 * 3600 * 1000).toISOString(),
              source: 'platform-reviewed',
              issuedBy: 'Copernicus GloFAS v4 Modeled Discharge (~5 km Grid via Open-Meteo)',
              summary: `Copernicus GloFAS v4 (~5 km hydrological model) estimates Jhelum discharge at ${currentDischarge} m³/s (24h ensemble max: ${maxForecast ?? currentDischarge} m³/s) — ${stageText}. Modeled screening only; live CWC / J&K I&FC physical staff-gauge heights are not connected.`,
              cause: 'Gridded LISFLOOD hydrological routing driven by ECMWF meteorological forcing across upper Jhelum catchments.',
              guidance: {
                summary:
                  severity === 'critical' || severity === 'high'
                    ? 'Modeled river discharge exceeds flood-screening thresholds (≥650 m³/s). Consult official J&K Irrigation & Flood Control (I&FC) and CWC flood bulletins immediately.'
                    : 'Modeled discharge is below Jhelum flood-screening thresholds (<650 m³/s). Consult J&K I&FC for official staff-gauge stages.',
                actions: [
                  `Modeled Discharge (GloFAS v4): ${currentDischarge} m³/s`,
                  `24h Ensemble Max (GloFAS v4): ${maxForecast ?? currentDischarge} m³/s`,
                  'Screening thresholds: ≥650 m³/s Warning · ≥950 m³/s Critical (Modeled)',
                  'Verify physical river stages via official J&K I&FC / CWC bulletins',
                ],
                travelImpact:
                  severity === 'critical' || severity === 'high'
                    ? 'Potential low-lying floodplain inundation if corroborated by official I&FC gauges.'
                    : 'None indicated by hydrological screening model.',
                urgency: severity === 'critical' || severity === 'high' ? 'urgent' : 'advisory',
              },
              relatedModule: 'hazard-intelligence',
              relatedModulePath: '/hazard-intelligence/floods',
              mapLink: '/atlas?layer=flood-risk&basin=jhelum',
              updates: [
                {
                  timestamp: nowIso,
                  action: 'GloFAS v4 Daily Grid Evaluated',
                  note: `Modeled discharge: ${currentDischarge} m³/s (~5 km grid).`,
                },
              ],
              tags: ['flood', 'jhelum', 'glofas', 'modeled-discharge', 'screening'],
            });
          }
        }

        // ──────────────────────────────────────────────────────────────────────
        // 3. Official USGS Regional Earthquakes (Haversine Nearest Canonical District)
        // ──────────────────────────────────────────────────────────────────────
        if (usgsQuakesRes && usgsQuakesRes.ok) {
          const quakeData = await usgsQuakesRes.json();
          const features = Array.isArray(quakeData?.features) ? quakeData.features : [];

          features.slice(0, 2).forEach((f: any, idx: number) => {
            const props = f.properties || {};
            const coords = f.geometry?.coordinates || [74.8, 34.08, 10];
            const lon = Number(coords[0]);
            const lat = Number(coords[1]);
            const depth = Math.round(Math.abs(Number(coords[2] ?? 10)));
            const mag = Number(props.mag ?? 0);
            const place = String(props.place || 'Western Himalayan Region');
            const eventTimeIso = props.time ? new Date(props.time).toISOString() : nowIso;

            const nearest = findNearestCanonicalDistrict(lat, lon);
            const severity: 'low' | 'moderate' | 'high' | 'critical' =
              mag >= 6.0 ? 'critical' : mag >= 5.0 ? 'high' : mag >= 4.0 ? 'moderate' : 'low';

            liveAlerts.push({
              id: `live-quake-${props.code || f.id || idx}`,
              title: `Official Seismic Catalog: M${mag.toFixed(1)} Earthquake — ${place}`,
              category: 'earthquake',
              severity,
              status: 'active',
              district: nearest.district,
              affectedArea: `${place} (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E · ~${nearest.distanceKm} km from ${nearest.district})`,
              issued: eventTimeIso,
              updated: nowIso,
              expires: new Date(now.getTime() + 72 * 3600 * 1000).toISOString(),
              source: 'institutional',
              issuedBy: 'USGS ANSS Comprehensive Earthquake Catalog (ComCat)',
              summary: `Magnitude ${mag.toFixed(1)} seismic event recorded at ${depth} km focal depth near ${place} (nearest KEW baseline district: ${nearest.district}, ~${nearest.distanceKm} km).`,
              cause: 'Tectonic strain release within the Western Himalayan / Hindu Kush–Pamir collision zone.',
              guidance: {
                summary:
                  mag >= 4.5
                    ? 'Moderate-to-strong regional tremor recorded. Inspect unreinforced masonry for cracks and remain alert for aftershocks.'
                    : 'Minor regional earthquake cataloged by USGS. No widespread structural impact expected at this magnitude.',
                actions: [
                  `Catalog Magnitude: M${mag.toFixed(1)} · Focal Depth: ${depth} km`,
                  `Nearest District Centroid: ${nearest.district} (~${nearest.distanceKm} km)`,
                  'Practice Drop, Cover, and Hold On during active ground shaking',
                  'Consult NCS India / SDMA for official civil damage assessments',
                ],
                travelImpact: 'Monitor mountain highway corridors for localized rockfall following M4.5+ shaking.',
                urgency: severity === 'high' || severity === 'critical' ? 'urgent' : 'precautionary',
              },
              relatedModule: 'hazard-intelligence',
              relatedModulePath: '/hazard-intelligence/earthquakes',
              updates: [
                {
                  timestamp: eventTimeIso,
                  action: 'USGS ComCat Event Logged',
                  note: `M${mag.toFixed(1)} at ${depth} km depth (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E).`,
                },
              ],
              tags: ['earthquake', 'seismic', 'usgs', 'official-catalog'],
            });
          });
        }

        // ──────────────────────────────────────────────────────────────────────
        // 4. Batched Gridded NWP Screening (Srinagar Valley, Ramban NH-44, Zoji La)
        //    Strictly labeled 'Open-Meteo Gridded NWP Screening Model'
        // ──────────────────────────────────────────────────────────────────────
        if (multiWeatherRes && multiWeatherRes.ok) {
          const rawWeather = await multiWeatherRes.json();
          const weatherArr = Array.isArray(rawWeather) ? rawWeather : [rawWeather];
          const [srinagarData, rambanData, zojilaData] = weatherArr;

          // 4A. Ramban NH-44 Rainfall Slope Screening
          if (rambanData?.current) {
            const precipArr: number[] = rambanData.daily?.precipitation_sum || [];
            const dailySum = Number((precipArr[precipArr.length - 1] ?? 0).toFixed(1));
            const precip72h = Number(precipArr.slice(-3).reduce((a, b) => a + (b || 0), 0).toFixed(1));
            const temp = Number((rambanData.current.temperature_2m ?? 15).toFixed(1));
            const rain = Number((rambanData.current.precipitation ?? 0).toFixed(1));

            let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
            let riskLabel = 'Low Rainfall-Induced Slope Screening';
            if (precip72h >= 65 || dailySum >= 40 || rain >= 12) {
              severity = 'critical';
              riskLabel = 'High NWP Rainfall Slope-Saturation Screening';
            } else if (precip72h >= 30 || dailySum >= 20 || rain >= 5) {
              severity = 'high';
              riskLabel = 'Elevated NWP Rainfall Slope Screening';
            } else if (precip72h >= 12 || dailySum >= 8) {
              severity = 'moderate';
              riskLabel = 'Moderate NWP Slope Moisture Advisory';
            }

            liveAlerts.push({
              id: 'live-landslide-ramban',
              title: `NWP Slope Rainfall Screening: ${riskLabel} — Ramban Corridor`,
              category: 'landslide',
              severity,
              status: 'active',
              district: 'Ramban',
              affectedArea: 'Ramban–Banihal NH-44 Grid Cell (~9–11 km NWP)',
              corridor: 'NH-44 Jammu-Srinagar Corridor',
              issued: nowIso,
              updated: nowIso,
              expires: new Date(now.getTime() + 24 * 3600 * 1000).toISOString(),
              source: 'platform-reviewed',
              issuedBy: 'Open-Meteo Gridded NWP Screening Model',
              summary: `Open-Meteo gridded NWP model (~9–11 km) estimates ${temp}°C, ${rain} mm/h current precipitation, and ${precip72h} mm 72h rainfall across the Ramban grid cell (${riskLabel}). Not an official highway traffic or GSI geotechnical sensor.`,
              cause: 'Coarse-grid NWP precipitation screening over steep Murree/Ramban shale-slate terrain.',
              guidance: {
                summary:
                  severity === 'critical' || severity === 'high'
                    ? 'Elevated NWP rainfall totals modeled over the Ramban sector. Verify official NH-44 road status directly with J&K Traffic Police before travel.'
                    : 'Modeled NWP precipitation is currently low. Always verify live highway status with J&K Traffic Police before transit.',
                actions: [
                  `Modeled 24h Rain: ${dailySum} mm · 72h Rain: ${precip72h} mm (NWP Grid)`,
                  `Modeled Temp: ${temp}°C · Hourly Rate: ${rain} mm/h`,
                  'Consult official J&K Traffic Police bulletins for real-time NH-44 closures',
                ],
                travelImpact: 'Refer exclusively to J&K Traffic Police advisories for official road open/closed status.',
                urgency: severity === 'critical' || severity === 'high' ? 'urgent' : 'advisory',
              },
              relatedModule: 'hazard-intelligence',
              relatedModulePath: '/hazard-intelligence/landslides',
              mapLink: '/atlas?layer=landslide-risk&corridor=nh44',
              updates: [
                {
                  timestamp: nowIso,
                  action: 'NWP Grid Cycle Evaluated',
                  note: `Modeled 72h precipitation: ${precip72h} mm, 24h: ${dailySum} mm.`,
                },
              ],
              tags: ['landslide', 'nh44', 'ramban', 'nwp-screening'],
            });
          }

          // 4B. Zoji La Pass Snowpack & Cryosphere NWP Screening
          if (zojilaData?.current) {
            const minTempArr: number[] = zojilaData.daily?.temperature_2m_min || [];
            const snowfallArr: number[] = zojilaData.daily?.snowfall_sum || [];
            const minTemp = Number((minTempArr[minTempArr.length - 1] ?? 0).toFixed(1));
            const snowfall72hCm = Number(snowfallArr.slice(-3).reduce((a, b) => a + (b || 0), 0).toFixed(1));
            const snowDepthM = Number((zojilaData.current.snow_depth ?? 0).toFixed(2));
            const currentTemp = Number((zojilaData.current.temperature_2m ?? 0).toFixed(1));
            const windSpeed = Number((zojilaData.current.wind_speed_10m ?? 0).toFixed(1));
            const hasSnowpack = snowDepthM >= 0.15 || snowfall72hCm >= 5;

            let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
            let avLabel = 'Low NWP Snowpack Screening';

            if (hasSnowpack && snowfall72hCm >= 35) {
              severity = 'critical';
              avLabel = 'High NWP Snowfall Accumulation Screening';
            } else if (hasSnowpack && (snowfall72hCm >= 15 || (snowDepthM >= 0.5 && windSpeed >= 45))) {
              severity = 'high';
              avLabel = 'Elevated NWP Snow & Wind-Drift Screening';
            } else if (currentTemp < 0) {
              severity = 'moderate';
              avLabel = 'Sub-Zero NWP Pass Temperature Screening';
            }

            liveAlerts.push({
              id: 'live-avalanche-zojila',
              title: `NWP Pass Screening: ${avLabel} (${currentTemp}°C) — Zoji La Grid`,
              category: 'avalanche',
              severity,
              status: 'active',
              district: 'Kargil',
              affectedArea: 'Zoji La Sector (~9–11 km Open-Meteo NWP Grid Cell)',
              corridor: 'Srinagar-Kargil-Leh NH-1 Corridor',
              issued: nowIso,
              updated: nowIso,
              expires: new Date(now.getTime() + 36 * 3600 * 1000).toISOString(),
              source: 'platform-reviewed',
              issuedBy: 'Open-Meteo Gridded NWP Screening Model',
              summary: `Open-Meteo gridded NWP model estimates ${currentTemp}°C (min ${minTemp}°C), wind ${windSpeed} km/h, modeled snow depth ${snowDepthM} m, and 72h snowfall ${snowfall72hCm} cm near Zoji La. Coarse-grid model estimate only — not an in-situ DGRE/SASE weather station.`,
              cause: 'Gridded numerical weather model temperature, snowfall, and wind fields across the Zoji La crest.',
              guidance: {
                summary:
                  'Refer to official DGRE (DRDO) avalanche bulletins and BRO / Traffic Police advisories before high-pass transit.',
                actions: [
                  `Modeled Temp: ${currentTemp}°C (Min: ${minTemp}°C) · Wind: ${windSpeed} km/h`,
                  `Modeled Snow Depth: ${snowDepthM} m · 72h Snowfall: ${snowfall72hCm} cm`,
                  'Verify official DGRE avalanche warnings and BRO pass clearance',
                ],
                travelImpact: 'Check official BRO / Traffic Police bulletins for Zoji La transit status.',
                urgency: severity === 'critical' || severity === 'high' ? 'urgent' : 'advisory',
              },
              relatedModule: 'hazard-intelligence',
              relatedModulePath: '/hazard-intelligence/avalanches',
              mapLink: '/atlas?layer=avalanche-risk&pass=zoji-la',
              updates: [
                {
                  timestamp: nowIso,
                  action: 'NWP Cryosphere Grid Evaluated',
                  note: `Modeled ${currentTemp}°C, snow depth ${snowDepthM} m, 72h snowfall ${snowfall72hCm} cm.`,
                },
              ],
              tags: ['avalanche', 'zoji-la', 'kargil', 'nwp-screening'],
            });
          }

          // 4C. Valley Thermal & Dry-Slope NWP Screening
          if (srinagarData?.current) {
            const maxTempArr: number[] = srinagarData.daily?.temperature_2m_max || [];
            const minTempArr: number[] = srinagarData.daily?.temperature_2m_min || [];
            const maxTemp = Number((maxTempArr[maxTempArr.length - 1] ?? 20).toFixed(1));
            const minTemp = Number((minTempArr[minTempArr.length - 1] ?? 5).toFixed(1));
            const currentTemp = Number((srinagarData.current.temperature_2m ?? 15).toFixed(1));
            const humidity = Math.round(srinagarData.current.relative_humidity_2m ?? 60);
            const wind = Number((srinagarData.current.wind_speed_10m ?? 5).toFixed(1));

            let category: 'fire' | 'heatwave' | 'storm' = 'fire';
            let title = 'NWP Fire-Weather & Thermal Screening: Nominal — Kashmir Valley';
            let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';

            if (maxTemp >= 35 || currentTemp >= 33) {
              category = 'heatwave';
              severity = 'moderate';
              title = `NWP Thermal Screening: Elevated Daytime Temperature (${maxTemp}°C) — Srinagar`;
            } else if (currentTemp >= 25 && humidity <= 32 && wind >= 18) {
              category = 'fire';
              severity = 'moderate';
              title = 'NWP Fire-Weather Screening: Dry Slope Conditions — Kashmir Valley';
            }

            liveAlerts.push({
              id: 'live-weather-valley',
              title,
              category,
              severity,
              status: 'active',
              district: 'Srinagar',
              affectedArea: 'Kashmir Valley Floor (~9–11 km NWP Grid)',
              issued: nowIso,
              updated: nowIso,
              expires: new Date(now.getTime() + 24 * 3600 * 1000).toISOString(),
              source: 'platform-reviewed',
              issuedBy: 'Open-Meteo Gridded NWP Screening Model',
              summary: `Open-Meteo gridded NWP model estimates ${currentTemp}°C (daily range ${minTemp}°C to ${maxTemp}°C), ${humidity}% RH, and ${wind} km/h wind across the Srinagar valley grid.`,
              cause: 'Synoptic NWP boundary-layer temperature, humidity, and surface wind conditions.',
              guidance: {
                summary: 'Follow official IMD Srinagar meteorological bulletins and J&K Forest Department fire advisories.',
                actions: [
                  `Modeled Temp: ${currentTemp}°C (High: ${maxTemp}°C, Low: ${minTemp}°C)`,
                  `Modeled RH: ${humidity}% · Wind: ${wind} km/h`,
                  'Prohibit open flames or stubble burning near dry forest margins',
                ],
                travelImpact: 'None.',
                urgency: 'precautionary',
              },
              relatedModule: 'hazard-intelligence',
              relatedModulePath: '/hazard-intelligence/forest-fires',
              updates: [
                {
                  timestamp: nowIso,
                  action: 'NWP Valley Grid Evaluated',
                  note: `Modeled ${currentTemp}°C, ${humidity}% RH, wind ${wind} km/h.`,
                },
              ],
              tags: ['weather', 'fire', 'srinagar', 'nwp-screening'],
            });
          }
        }
      } catch (err) {
        console.error('Error evaluating external alert feeds:', err);
      }

      const fallbackActive = getActiveAlerts();
      const finalAlerts = liveAlerts.length > 0 ? liveAlerts : fallbackActive;

      const payload: Record<string, unknown> = {
        success: true,
        source: liveAlerts.length > 0 ? 'live-api' : 'baseline-cache',
        liveCount: liveAlerts.length,
        totalCount: finalAlerts.length,
        fetchedAt: nowIso,
        alerts: finalAlerts,
      };

      cachedAlertsPayload = payload;
      cachedAlertsAt = Date.now();
      return payload;
    })().finally(() => {
      inFlightAlertsJob = null;
    });
  }

  const result = await inFlightAlertsJob;
  return NextResponse.json(result);
}
