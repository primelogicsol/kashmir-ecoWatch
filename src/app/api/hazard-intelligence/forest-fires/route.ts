import { NextResponse } from 'next/server';
import { forestFireRegistry, ForestFireRecord } from '@/data/hazard-forest-fires';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Stateless in-memory revalidation (Zero VPS disk space)

interface SachetAlert {
  title: string;
  pubDate: string;
  link: string;
  district?: string;
  severity?: string;
}

const JK_LADAKH_SPECIFIC_DISTRICTS = [
  'srinagar', 'leh', 'kargil', 'anantnag', 'baramulla', 'kupwara', 'ganderbal',
  'kishtwar', 'doda', 'ramban', 'poonch', 'rajouri', 'udhampur', 'reasi',
  'kathua', 'samba', 'pulwama', 'shopian', 'kulgam', 'budgam', 'bandipora',
] as const;

const JK_LADAKH_REGIONAL_NAMES = ['jammu', 'kashmir', 'ladakh'] as const;

const FIRE_HAZARD_KEYWORDS = ['forest fire', 'wildfire', 'bushfire', 'fire', 'heatwave', 'heat wave'] as const;

function extractJkLadakhDistrict(text: string): string | null {
  for (const dist of JK_LADAKH_SPECIFIC_DISTRICTS) {
    if (new RegExp(`\\b${dist}\\b`, 'i').test(text)) {
      return dist.charAt(0).toUpperCase() + dist.slice(1);
    }
  }
  for (const reg of JK_LADAKH_REGIONAL_NAMES) {
    if (new RegExp(`\\b${reg}\\b`, 'i').test(text)) {
      if (reg === 'ladakh') return 'Ladakh';
      if (reg === 'kashmir') return 'Kashmir';
      return 'Jammu';
    }
  }
  return null;
}

async function fetchSachetFireAlerts(): Promise<{ alerts: SachetAlert[]; status: 'Connected' | 'Unreachable' }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml', {
      headers: {
        'User-Agent': 'KashmirEcoWatch-FireSentinel/2.0 (Stateless Screening Engine)'
      },
      signal: controller.signal,
      next: { revalidate: 60 }
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return { alerts: [], status: 'Unreachable' };
    }

    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    const matchingAlerts: SachetAlert[] = [];

    for (const item of items) {
      const titleMatch = item[1].match(/<title>([\s\S]*?)<\/title>/);
      const pubDateMatch = item[1].match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const linkMatch = item[1].match(/<link>([\s\S]*?)<\/link>/);

      const title = titleMatch ? titleMatch[1].trim() : '';
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
      const link = linkMatch ? linkMatch[1].trim() : '';

      const matchedDistrict = extractJkLadakhDistrict(title);
      if (!matchedDistrict) continue;

      const lowerTitle = title.toLowerCase();
      const hasFireKeyword = FIRE_HAZARD_KEYWORDS.some(k => lowerTitle.includes(k));

      if (hasFireKeyword) {
        matchingAlerts.push({
          title,
          pubDate,
          link,
          district: matchedDistrict,
          severity: lowerTitle.includes('extreme') || lowerTitle.includes('red') || lowerTitle.includes('wildfire')
            ? 'Critical'
            : 'Moderate'
        });
      }
    }

    return { alerts: matchingAlerts, status: 'Connected' };
  } catch (err) {
    console.warn('NDMA SACHET fetch error in forest fire route:', err);
    return { alerts: [], status: 'Unreachable' };
  }
}

async function fetchOpenMeteoFireWeather(records: ForestFireRecord[]) {
  try {
    const lats = records.map(r => r.latitude.toFixed(4)).join(',');
    const lons = records.map(r => r.longitude.toFixed(4)).join(',');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    // 7-day rolling window: past_days=6 + forecast_days=1 = 7 daily steps
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=temperature_2m_max,relative_humidity_2m_min,wind_speed_10m_max,precipitation_sum&hourly=soil_moisture_0_to_7cm&past_days=6&forecast_days=1&timezone=auto`;

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 180 }
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Open-Meteo returned ${res.status}`);
    }

    const json = await res.json();
    return Array.isArray(json) ? json : [json];
  } catch (err) {
    console.error('Open-Meteo fire weather batch forecast error:', err);
    return null;
  }
}

export async function GET() {
  const timestamp = new Date().toISOString();

  // In-memory parallel pipeline — ZERO DISK WRITES on VPS
  const [sachetResult, weatherResults] = await Promise.all([
    fetchSachetFireAlerts(),
    fetchOpenMeteoFireWeather(forestFireRegistry)
  ]);

  const enrichedRecords = forestFireRegistry.map((record, index) => {
    const matchingAlert = sachetResult.alerts.find(a =>
      a.district && record.district.toLowerCase().includes(a.district.toLowerCase())
    );

    const locData = weatherResults ? weatherResults[index] : null;
    const daily = locData?.daily;
    const hourly = locData?.hourly;
    const hasTelemetry = Boolean(daily && Array.isArray(daily.temperature_2m_max) && daily.temperature_2m_max.length > 0);

    const lastIdx = hasTelemetry ? daily.temperature_2m_max.length - 1 : 0;
    const tempMax = hasTelemetry ? (daily.temperature_2m_max[lastIdx] ?? 16) : 0;
    const humidityMin = hasTelemetry ? (daily.relative_humidity_2m_min?.[lastIdx] ?? 55) : 0;
    const windMax = hasTelemetry ? (daily.wind_speed_10m_max?.[lastIdx] ?? 12) : 0;
    const precip7d = hasTelemetry
      ? (daily.precipitation_sum?.slice(-7).reduce((a: number, b: number) => a + (b || 0), 0) ?? 0)
      : 0;
    const soilMoistureArr: number[] = hourly?.soil_moisture_0_to_7cm ?? [];
    const soilMoisture = hasTelemetry && soilMoistureArr.length > 0
      ? (soilMoistureArr[soilMoistureArr.length - 1] ?? 0.32)
      : 0;

    // Coarse-grid Open-Meteo meteorological dryness & wind screening heuristic
    let calculatedRisk: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    let trigger = 'Moist Fuelbed & Low Fire Susceptibility';

    if (!hasTelemetry) {
      calculatedRisk = 'Low';
      trigger = 'Telemetry Unavailable — Static Fuel Susceptibility Baseline Only';
    } else {
      const isHighHeat = tempMax >= 30;
      const isModerateHeat = tempMax >= 24;
      const isVeryDryAir = humidityMin <= 25;
      const isDryAir = humidityMin <= 38;
      const isHighWind = windMax >= 25;
      const isDrySoil = soilMoisture <= 0.18 || precip7d < 2;

      if ((isHighHeat && isVeryDryAir && isHighWind && precip7d < 5) || (isVeryDryAir && isDrySoil && isHighWind && tempMax >= 26)) {
        calculatedRisk = 'Critical';
        trigger = 'NWP Screening: Hot, Dry & Windy Surface Conditions with Low 7-Day Rain';
      } else if ((isModerateHeat && isDryAir && precip7d < 10) || (isDrySoil && isHighWind && tempMax >= 20)) {
        calculatedRisk = 'High';
        trigger = 'NWP Screening: Low Relative Humidity & Dry Antecedent Week';
      } else if ((isDryAir && tempMax >= 20) || isModerateHeat) {
        calculatedRisk = 'Moderate';
        trigger = 'NWP Screening: Seasonal Surface Drying Conditions';
      } else {
        calculatedRisk = 'Low';
        trigger = 'NWP Screening: Cool / Moist Surface Meteorology';
      }
    }

    let statusLabel = 'No Current Risk';
    if (matchingAlert) {
      statusLabel = 'Active Fire';
    } else if (calculatedRisk === 'Critical' || calculatedRisk === 'High') {
      statusLabel = 'Fire Season Watch';
    } else {
      statusLabel = hasTelemetry && calculatedRisk === 'Moderate' && record.fire_season === 'Mar-Jun'
        ? 'Fire Season Watch'
        : 'No Current Risk';
    }

    return {
      ...record,
      live_temperature: hasTelemetry ? tempMax : undefined,
      live_humidity: hasTelemetry ? humidityMin : undefined,
      live_wind_speed: hasTelemetry ? windMax : undefined,
      live_precipitation_7d: hasTelemetry ? Number(precip7d.toFixed(1)) : undefined,
      live_soil_moisture: hasTelemetry ? Number(soilMoisture.toFixed(3)) : undefined,
      live_risk_level: calculatedRisk,
      dominant_trigger: trigger,
      current_status: statusLabel as any,
      last_updated: hasTelemetry ? timestamp : 'Telemetry Unavailable',
      telemetryStatus: hasTelemetry ? 'MODEL_SCREENING' : 'UNAVAILABLE',
      provenance: {
        official_warning: matchingAlert ? {
          is_active: true,
          title: matchingAlert.title,
          pubDate: matchingAlert.pubDate,
          link: matchingAlert.link,
          authority: 'NDMA / Forest Survey of India (FSI) CAP Bulletin'
        } : {
          is_active: false,
          authority: 'NDMA SACHET (No Active Forest Fire Alerts for District)'
        },
        fire_weather_model: 'Open-Meteo Gridded NWP Screening Heuristic',
        is_official_government_alert: !!matchingAlert
      }
    };
  });

  return NextResponse.json({
    success: true,
    timestamp,
    telemetryStatus: weatherResults ? 'MODEL_SCREENING' : 'UNAVAILABLE',
    vps_disk_usage_bytes: 0, // Stateless streaming
    monitored_zones: enrichedRecords.length,
    official_alerts_count: sachetResult.alerts.length,
    official_alerts: sachetResult.alerts,
    sachet_feed_status: sachetResult.status,
    data: enrichedRecords
  });
}
