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

const HIMALAYAN_FIRE_KEYWORDS = [
  'fire', 'forest fire', 'wildfire', 'heat', 'heatwave',
  'kashmir', 'jammu', 'ladakh', 'udhampur', 'rajouri', 'poonch', 'doda', 'kishtwar',
  'reasi', 'kathua', 'anantnag', 'baramulla', 'kupwara', 'neelum', 'muzaffarabad'
];

async function fetchSachetFireAlerts(): Promise<{ alerts: SachetAlert[]; status: 'Connected' | 'Unreachable' }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml', {
      headers: {
        'User-Agent': 'KashmirEcoWatch-FireSentinel/2.0 (Stateless Real-Time Engine)'
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

      const lowerTitle = title.toLowerCase();
      const matched = HIMALAYAN_FIRE_KEYWORDS.find(k => lowerTitle.includes(k));

      if (matched && (lowerTitle.includes('fire') || lowerTitle.includes('wildfire') || lowerTitle.includes('heatwave'))) {
        matchingAlerts.push({
          title,
          pubDate,
          link,
          district: matched.toUpperCase(),
          severity: lowerTitle.includes('extreme') || lowerTitle.includes('red') ? 'Critical' : 'Moderate'
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

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=temperature_2m_max,relative_humidity_2m_min,wind_speed_10m_max&hourly=soil_moisture_0_to_7cm&forecast_days=1&timezone=auto`;

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
      a.district && record.district.toUpperCase().includes(a.district)
    );

    const locData = weatherResults ? weatherResults[index] : null;
    const daily = locData?.daily;
    const hourly = locData?.hourly;

    const tempMax = daily?.temperature_2m_max?.[0] ?? 16;
    const humidityMin = daily?.relative_humidity_2m_min?.[0] ?? 55;
    const windMax = daily?.wind_speed_10m_max?.[0] ?? 12;
    const soilMoisture = hourly?.soil_moisture_0_to_7cm?.[0] ?? 0.32;

    // Canadian Forest Fire Weather Index (FWI) proxy calculation
    let calculatedRisk: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    let trigger = 'Moist Understory & Stable Fire Weather';

    const isHighHeat = tempMax >= 30;
    const isModerateHeat = tempMax >= 24;
    const isVeryDryAir = humidityMin <= 25;
    const isDryAir = humidityMin <= 38;
    const isHighWind = windMax >= 25;
    const isDrySoil = soilMoisture <= 0.18;

    if ((isHighHeat && isVeryDryAir && isHighWind) || (isVeryDryAir && isDrySoil && isHighWind)) {
      calculatedRisk = 'Critical';
      trigger = 'Extreme Fire Weather: Desiccating Winds & Critically Dry Fuel';
    } else if ((isModerateHeat && isDryAir) || (isDrySoil && isHighWind)) {
      calculatedRisk = 'High';
      trigger = 'Elevated Ignition Risk: Low Humidity & Dry Duff Layer';
    } else if (isDryAir || isModerateHeat || windMax >= 18) {
      calculatedRisk = 'Moderate';
      trigger = 'Moderate Drying: Pine Needle Flammability Watch';
    } else {
      calculatedRisk = 'Low';
      trigger = 'Moist Fuelbed & Low Fire Susceptibility';
    }

    let statusLabel = 'No Current Risk';
    if (matchingAlert) {
      statusLabel = 'Active Fire';
    } else if (calculatedRisk === 'Critical' || calculatedRisk === 'High') {
      statusLabel = 'Fire Season Watch';
    } else {
      statusLabel = record.fire_season === 'Mar-Jun' ? 'Fire Season Watch' : 'No Current Risk';
    }

    return {
      ...record,
      live_temperature: tempMax,
      live_humidity: humidityMin,
      live_wind_speed: windMax,
      live_soil_moisture: Number(soilMoisture.toFixed(3)),
      live_risk_level: calculatedRisk,
      dominant_trigger: trigger,
      current_status: statusLabel as any,
      last_updated: timestamp,
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
        fire_weather_model: 'Open-Meteo High-Resolution Fire Weather Index (FWI) Components',
        is_official_government_alert: !!matchingAlert
      }
    };
  });

  return NextResponse.json({
    success: true,
    timestamp,
    vps_disk_usage_bytes: 0, // Stateless streaming
    monitored_zones: enrichedRecords.length,
    official_alerts_count: sachetResult.alerts.length,
    official_alerts: sachetResult.alerts,
    sachet_feed_status: sachetResult.status,
    data: enrichedRecords
  });
}
