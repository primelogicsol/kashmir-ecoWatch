import { NextResponse } from 'next/server';
import { glofRegistry, GLOFRecord } from '@/data/hazard-glofs';

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

const GLOF_HAZARD_KEYWORDS = [
  'glacial', 'glof', 'outburst', 'moraine', 'dam breach', 'flash flood', 'cloudburst',
] as const;

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

async function fetchSachetGlofAlerts(): Promise<{ alerts: SachetAlert[]; status: 'Connected' | 'Unreachable' }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml', {
      headers: {
        'User-Agent': 'KashmirEcoWatch-GLOFSentinel/2.0 (Stateless Screening Engine)'
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
      const hasGlofHazardKeyword = GLOF_HAZARD_KEYWORDS.some(k => lowerTitle.includes(k));

      if (hasGlofHazardKeyword) {
        matchingAlerts.push({
          title,
          pubDate,
          link,
          district: matchedDistrict,
          severity: lowerTitle.includes('glof') || lowerTitle.includes('breach') || lowerTitle.includes('severe') || lowerTitle.includes('red')
            ? 'Critical'
            : 'Moderate'
        });
      }
    }

    return { alerts: matchingAlerts, status: 'Connected' };
  } catch (err) {
    console.warn('NDMA SACHET fetch error in GLOF route:', err);
    return { alerts: [], status: 'Unreachable' };
  }
}

async function fetchOpenMeteoGlacialMelt(records: GLOFRecord[]) {
  try {
    const validRecords = records.filter(r => r.latitude !== undefined && r.longitude !== undefined);
    const lats = validRecords.map(r => r.latitude!.toFixed(4)).join(',');
    const lons = validRecords.map(r => r.longitude!.toFixed(4)).join(',');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    // 7-day rolling window: past_days=6 + forecast_days=1 = 7 daily steps
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&timezone=auto&past_days=6&forecast_days=1`;

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
    console.error('Open-Meteo glacial melt forecast error:', err);
    return null;
  }
}

export async function GET() {
  const timestamp = new Date().toISOString();

  // In-memory parallel pipeline — ZERO DISK WRITES on VPS
  const [sachetResult, weatherResults] = await Promise.all([
    fetchSachetGlofAlerts(),
    fetchOpenMeteoGlacialMelt(glofRegistry)
  ]);

  const validRecords = glofRegistry.filter(r => r.latitude !== undefined && r.longitude !== undefined);

  const enrichedRecords = glofRegistry.map((record) => {
    const matchingAlert = sachetResult.alerts.find(a =>
      a.district && record.district.toLowerCase().includes(a.district.toLowerCase())
    );

    const validIndex = validRecords.findIndex(r => r.id === record.id);
    const locData = validIndex !== -1 && weatherResults ? weatherResults[validIndex] : null;
    const daily = locData?.daily;
    const hasTelemetry = Boolean(daily && Array.isArray(daily.temperature_2m_max) && daily.temperature_2m_max.length > 0);

    const tempMax = hasTelemetry
      ? (daily.temperature_2m_max[daily.temperature_2m_max.length - 1] ?? 0)
      : 0;
    const precip7d = hasTelemetry
      ? (daily.precipitation_sum?.slice(-7).reduce((a: number, b: number) => a + (b || 0), 0) ?? 0)
      : 0;

    // Coarse-grid NWP thermal + 7-day precipitation screening heuristic
    let calculatedRisk: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    let trigger = 'Cryospheric Baseline (Sub-freezing / Stable Moraine)';

    const susceptibility = String(
      (record as unknown as { susceptibility_class?: string }).susceptibility_class || record.risk_level || 'Moderate'
    );
    const isHighSusceptibilityDam =
      record.dam_type === 'Ice' ||
      record.dam_type === 'Moraine' ||
      susceptibility === 'Very High' ||
      susceptibility === 'Critical' ||
      susceptibility === 'High';

    if (!hasTelemetry) {
      calculatedRisk = 'Low';
      trigger = 'Telemetry Unavailable — Static Susceptibility Baseline Only';
    } else {
      const isRapidMelt = tempMax > 18;
      const isModerateMelt = tempMax > 12;
      const isHeavyRainOnIce = precip7d > 40;
      const isModerateRainOnIce = precip7d > 20;

      if (isRapidMelt && isHeavyRainOnIce && isHighSusceptibilityDam) {
        calculatedRisk = 'Critical';
        trigger = 'NWP Screening: High Thermal Anomaly + 7-Day Heavy Precipitation on Unconsolidated Dam';
      } else if ((isRapidMelt && isModerateRainOnIce) || (isModerateMelt && isHeavyRainOnIce && isHighSusceptibilityDam)) {
        calculatedRisk = 'High';
        trigger = 'NWP Screening: Elevated Warmth & 7-Day Rain Accumulation';
      } else if (isModerateMelt || isModerateRainOnIce) {
        calculatedRisk = 'Moderate';
        trigger = 'NWP Screening: Seasonal Warmth / Moderate Catchment Precipitation';
      } else {
        calculatedRisk = 'Low';
        trigger = 'NWP Screening: Sub-Freezing / Low Precipitation Conditions';
      }
    }

    let statusLabel = 'Stable';
    if (matchingAlert) {
      statusLabel = 'Alert Active';
    } else if (calculatedRisk === 'Critical' || calculatedRisk === 'High') {
      statusLabel = 'Growing';
    } else {
      statusLabel = record.current_status === 'Seasonal Risk' ? 'Seasonal Risk' : 'Stable';
    }

    return {
      ...record,
      live_temperature_max: hasTelemetry ? Number(tempMax.toFixed(1)) : undefined,
      live_precipitation_7d: hasTelemetry ? Number(precip7d.toFixed(1)) : undefined,
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
          authority: 'NDMA SACHET (CAP Outburst Flood Bulletin)'
        } : {
          is_active: false,
          authority: 'NDMA SACHET (No Active Glacial Outburst Alerts)'
        },
        cryosphere_model: 'Open-Meteo Gridded NWP Screening Heuristic',
        is_official_government_alert: !!matchingAlert
      }
    };
  });

  return NextResponse.json({
    success: true,
    timestamp,
    telemetryStatus: weatherResults ? 'MODEL_SCREENING' : 'UNAVAILABLE',
    vps_disk_usage_bytes: 0, // Stateless streaming
    monitored_lakes: enrichedRecords.length,
    official_alerts_count: sachetResult.alerts.length,
    official_alerts: sachetResult.alerts,
    sachet_feed_status: sachetResult.status,
    data: enrichedRecords
  });
}
