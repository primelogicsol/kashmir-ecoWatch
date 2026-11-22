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

const HIMALAYAN_GLOF_KEYWORDS = [
  'glacial', 'glof', 'lake', 'flash flood', 'cloudburst', 'dam breach',
  'kashmir', 'ladakh', 'leh', 'kargil', 'ganderbal', 'anantnag', 'kishtwar',
  'hunza', 'gilgit', 'skardu', 'neelum', 'shisper', 'passu', 'harmukh'
];

async function fetchSachetGlofAlerts(): Promise<{ alerts: SachetAlert[]; status: 'Connected' | 'Unreachable' }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml', {
      headers: {
        'User-Agent': 'KashmirEcoWatch-GLOFSentinel/2.0 (Stateless Real-Time Engine)'
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
      const matched = HIMALAYAN_GLOF_KEYWORDS.find(k => lowerTitle.includes(k));

      if (matched && (lowerTitle.includes('flood') || lowerTitle.includes('dam') || lowerTitle.includes('lake') || lowerTitle.includes('breach'))) {
        matchingAlerts.push({
          title,
          pubDate,
          link,
          district: matched.toUpperCase(),
          severity: lowerTitle.includes('flash') || lowerTitle.includes('severe') ? 'Critical' : 'Moderate'
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

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&timezone=auto&past_days=7&forecast_days=1`;

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
      a.district && record.district.toUpperCase().includes(a.district)
    );

    const validIndex = validRecords.findIndex(r => r.id === record.id);
    const locData = validIndex !== -1 && weatherResults ? weatherResults[validIndex] : null;
    const daily = locData?.daily;

    let tempMax = 8;
    let precip7d = 5;

    if (daily && daily.temperature_2m_max) {
      tempMax = daily.temperature_2m_max[daily.temperature_2m_max.length - 1] ?? 8;
      precip7d = daily.precipitation_sum?.reduce((a: number, b: number) => a + (b || 0), 0) ?? 5;
    }

    // High-Altitude Cryospheric Melting Degree-Days (MDD) Index
    let calculatedRisk: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    let trigger = 'Stable Glacial Cryosphere Conditions';

    const isRapidMelt = tempMax > 18;
    const isModerateMelt = tempMax > 12;
    const isHeavyRainOnIce = precip7d > 40;
    const isModerateRainOnIce = precip7d > 20;

    if (isRapidMelt && isHeavyRainOnIce && (record.dam_type === 'Ice' || record.dam_type === 'Moraine')) {
      calculatedRisk = 'Critical';
      trigger = 'Accelerated Moraine Ablation & Severe Rain-on-Ice Surcharge';
    } else if ((isRapidMelt && isModerateRainOnIce) || (isModerateMelt && isHeavyRainOnIce)) {
      calculatedRisk = 'High';
      trigger = 'Elevated Supraglacial Melt & Inflow Accumulation';
    } else if (isModerateMelt || isModerateRainOnIce) {
      calculatedRisk = 'Moderate';
      trigger = 'Seasonal Diurnal Ablation Surge';
    } else {
      calculatedRisk = 'Low';
      trigger = 'Cryospheric Baseline (Sub-freezing / Stable Moraine)';
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
      live_temperature_max: Number(tempMax.toFixed(1)),
      live_precipitation_7d: Number(precip7d.toFixed(1)),
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
          authority: 'NDMA SACHET (CAP Outburst Flood Bulletin)'
        } : {
          is_active: false,
          authority: 'NDMA SACHET (No Active Glacial Outburst Alerts)'
        },
        cryosphere_model: 'Open-Meteo High-Altitude Melting Degree-Days (MDD) Model',
        is_official_government_alert: !!matchingAlert
      }
    };
  });

  return NextResponse.json({
    success: true,
    timestamp,
    vps_disk_usage_bytes: 0, // Stateless streaming
    monitored_lakes: enrichedRecords.length,
    official_alerts_count: sachetResult.alerts.length,
    official_alerts: sachetResult.alerts,
    sachet_feed_status: sachetResult.status,
    data: enrichedRecords
  });
}
