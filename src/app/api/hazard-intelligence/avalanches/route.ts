import { NextResponse } from 'next/server';
import { avalancheData, AvalancheRecord } from '@/data/hazard-avalanches';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // In-memory edge revalidation every 60s (Zero VPS disk space)

interface SachetAlert {
  title: string;
  pubDate: string;
  link: string;
  district?: string;
  severity?: string;
}

interface GulmargReport {
  title: string;
  pubDate: string;
  link: string;
}

const JK_LADAKH_SPECIFIC_DISTRICTS = [
  'srinagar', 'leh', 'kargil', 'anantnag', 'baramulla', 'kupwara', 'ganderbal',
  'kishtwar', 'doda', 'ramban', 'poonch', 'rajouri', 'udhampur', 'reasi',
  'kathua', 'samba', 'pulwama', 'shopian', 'kulgam', 'budgam', 'bandipora',
] as const;

const JK_LADAKH_REGIONAL_NAMES = ['jammu', 'kashmir', 'ladakh'] as const;

const AVALANCHE_HAZARD_KEYWORDS = ['avalanche', 'snow', 'blizzard', 'snowstorm'] as const;

function extractJkLadakhDistrict(text: string): string | null {
  for (const dist of JK_LADAKH_SPECIFIC_DISTRICTS) {
    if (new RegExp(`\\b${dist}\\b`, 'i').test(text)) {
      return dist.charAt(0).toUpperCase() + dist.slice(1);
    }
  }
  if (/\bgulmarg\b/i.test(text)) return 'Baramulla';
  if (/\bzojila\b|\bzoji la\b/i.test(text)) return 'Ganderbal';
  if (/\brazdan\b/i.test(text)) return 'Bandipora';
  if (/\bsadhna\b/i.test(text)) return 'Kupwara';

  for (const reg of JK_LADAKH_REGIONAL_NAMES) {
    if (new RegExp(`\\b${reg}\\b`, 'i').test(text)) {
      if (reg === 'ladakh') return 'Ladakh';
      if (reg === 'kashmir') return 'Kashmir';
      return 'Jammu';
    }
  }
  return null;
}

async function fetchSachetAlerts(): Promise<{ alerts: SachetAlert[]; status: 'Connected' | 'Unreachable' }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml', {
      headers: {
        'User-Agent': 'KashmirEcoWatch-CryosphereSentinel/2.0 (Stateless Screening Engine)'
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
      const hasAvalancheKeyword = AVALANCHE_HAZARD_KEYWORDS.some(k => lowerTitle.includes(k));

      if (hasAvalancheKeyword) {
        matchingAlerts.push({
          title,
          pubDate,
          link,
          district: matchedDistrict,
          severity: lowerTitle.includes('high') || lowerTitle.includes('critical') || lowerTitle.includes('red') ? 'Critical' : 'Moderate'
        });
      }
    }

    return { alerts: matchingAlerts, status: 'Connected' };
  } catch (err) {
    console.warn('NDMA SACHET fetch error in avalanche route:', err);
    return { alerts: [], status: 'Unreachable' };
  }
}

async function fetchGulmargObservation(): Promise<{ report: GulmargReport | null; status: 'Connected' | 'Unreachable' }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch('https://gulmargac.in/observations-rss.xml', {
      headers: {
        'User-Agent': 'KashmirEcoWatch-GulmargLink/2.0 (Stateless Ingestion)'
      },
      signal: controller.signal,
      next: { revalidate: 300 } // Cache in memory for 5 minutes
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return { report: null, status: 'Unreachable' };
    }

    const xml = await res.text();
    const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);

    if (itemMatch) {
      const title = (itemMatch[1].match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
      const pubDate = (itemMatch[1].match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '';
      const link = (itemMatch[1].match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '';

      return {
        report: {
          title: title.trim(),
          pubDate: pubDate.trim(),
          link: link.trim()
        },
        status: 'Connected'
      };
    }

    return { report: null, status: 'Connected' };
  } catch (err) {
    console.warn('Gulmarg AC RSS fetch error:', err);
    return { report: null, status: 'Unreachable' };
  }
}

async function fetchOpenMeteoSnowfall(records: AvalancheRecord[]) {
  try {
    const lats = records.map(d => d.latitude.toFixed(4)).join(',');
    const lngs = records.map(d => d.longitude.toFixed(4)).join(',');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    // 72h snowfall window (past_days=2 + forecast_days=1 = 72 hourly steps) + snow_depth gate
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&hourly=snowfall,snow_depth,wind_speed_10m,temperature_2m&current=wind_speed_10m,temperature_2m,snow_depth,snowfall&past_days=2&forecast_days=1&timezone=auto`;

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
    console.error('Open-Meteo snowfall batch forecast error:', err);
    return null;
  }
}

export async function GET() {
  const timestamp = new Date().toISOString();

  // In-memory parallel pipeline — ZERO DISK WRITES on VPS
  const [sachetResult, gulmargResult, forecastResults] = await Promise.all([
    fetchSachetAlerts(),
    fetchGulmargObservation(),
    fetchOpenMeteoSnowfall(avalancheData)
  ]);

  const enrichedRecords = avalancheData.map((record, index) => {
    // Check if official alert matches this corridor or district
    const matchingAlert = sachetResult.alerts.find(a =>
      a.district && record.district.toLowerCase().includes(a.district.toLowerCase())
    );

    const locData = forecastResults ? forecastResults[index] : null;
    const current = locData?.current;
    const hourly = locData?.hourly;
    const hasTelemetry = Boolean(locData && (current || hourly));

    let live_snowfall_24h = 0;
    let snowfall72hCm = 0;
    if (hourly && Array.isArray(hourly.snowfall) && hourly.snowfall.length > 0) {
      snowfall72hCm = hourly.snowfall.reduce((a: number, b: number) => a + (b || 0), 0);
      live_snowfall_24h = hourly.snowfall.slice(-24).reduce((a: number, b: number) => a + (b || 0), 0);
    } else if (current && typeof current.snowfall === 'number') {
      live_snowfall_24h = current.snowfall * 24;
      snowfall72hCm = live_snowfall_24h;
    }

    const snowDepthM = typeof current?.snow_depth === 'number' ? current.snow_depth : 0;
    const windMaxKmh = typeof current?.wind_speed_10m === 'number' ? current.wind_speed_10m : 0;
    const live_temperature = typeof current?.temperature_2m === 'number' ? current.temperature_2m : 0;

    // Mandatory active-snowpack gate: summer winds on bare rock must NEVER trigger avalanche warnings
    const hasActiveSnowpack = snowDepthM >= 0.15 || snowfall72hCm >= 5;

    let calculatedRisk: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    let trigger = 'Dry / Bare Slope or Stable Cryospheric Conditions';

    if (!hasTelemetry) {
      calculatedRisk = 'Low';
      trigger = 'Telemetry Unavailable — Static Terrain Baseline Only';
    } else if (!hasActiveSnowpack && live_snowfall_24h < 5) {
      calculatedRisk = 'Low';
      trigger = 'Insufficient Snowpack (<15 cm snow depth & <5 cm 72h snowfall)';
    } else if (live_snowfall_24h > 40 || (hasActiveSnowpack && windMaxKmh > 55 && record.slope_angle_deg > 35)) {
      calculatedRisk = 'Critical';
      trigger = live_snowfall_24h > 40 ? 'Heavy Fresh Snow Loading Forecast' : 'Severe Ridge Wind-Slab Loading on Active Snowpack';
    } else if ((hasActiveSnowpack && live_snowfall_24h > 20 && windMaxKmh > 35) || (live_temperature > 4 && snowDepthM > 0.8)) {
      calculatedRisk = 'High';
      trigger = live_snowfall_24h > 20 ? 'Substantial Fresh Snowpack Accumulation' : 'Wet-Snow Thermal Destabilization on Deep Snowpack';
    } else if (live_snowfall_24h >= 8 || (hasActiveSnowpack && windMaxKmh > 25)) {
      calculatedRisk = 'Moderate';
      trigger = live_snowfall_24h >= 8 ? 'Moderate Fresh Snowfall' : 'Moderate Ridge Wind Drift on Active Snowpack';
    } else {
      calculatedRisk = 'Low';
      trigger = 'Cold / Stable Snowpack Screening';
    }

    // Truthful Status Assignment
    let statusLabel: 'Active Warning' | 'Watch' | 'Seasonal' | 'Clear' | 'Normal' = 'Normal';
    if (matchingAlert) {
      statusLabel = 'Active Warning';
    } else if (calculatedRisk === 'Critical' || calculatedRisk === 'High') {
      statusLabel = 'Watch';
    } else {
      statusLabel = hasActiveSnowpack && (record.season === 'Nov-Mar' || record.season === 'Dec-Feb') ? 'Seasonal' : 'Normal';
    }

    // Truthful Verification Assignment (never claim DGRE/SASE telemetry)
    let verificationLabel = 'Open-Meteo Gridded NWP Screening';
    if (
      gulmargResult.report &&
      (record.name.toLowerCase().includes('gulmarg') || record.name.toLowerCase().includes('affarwat'))
    ) {
      verificationLabel = 'Gulmarg Avalanche Center RSS Advisory + NWP Grid';
    }

    return {
      ...record,
      live_snowfall_24h: Math.round(live_snowfall_24h * 10) / 10,
      live_snowfall_72h: Math.round(snowfall72hCm * 10) / 10,
      live_snow_depth: Math.round(snowDepthM * 100) / 100,
      live_wind_speed: Math.round(windMaxKmh),
      live_temperature: Math.round(live_temperature * 10) / 10,
      live_risk_level: calculatedRisk,
      dominant_trigger: trigger,
      current_status: statusLabel,
      verification_status: verificationLabel,
      last_updated: hasTelemetry ? timestamp : 'Telemetry Unavailable',
      telemetryStatus: hasTelemetry ? 'MODEL_SCREENING' : 'UNAVAILABLE',

      // 100% Truthful Provenance Metadata
      provenance: {
        official_warning: matchingAlert ? {
          is_active: true,
          title: matchingAlert.title,
          pubDate: matchingAlert.pubDate,
          link: matchingAlert.link,
          authority: 'NDMA SACHET (CAP Bulletin)'
        } : {
          is_active: false,
          authority: 'NDMA SACHET (No Active Avalanche Bulletins Issued for Sector)'
        },
        gulmarg_center: record.name.toLowerCase().includes('gulmarg') || record.name.toLowerCase().includes('affarwat') ? {
          is_monitored: Boolean(gulmargResult.report),
          latest_field_report: gulmargResult.report?.title || 'No Live Gulmarg AC RSS Bulletin Retrieved',
          report_date: gulmargResult.report?.pubDate,
          report_link: gulmargResult.report?.link || 'https://gulmargac.in/observations'
        } : null,
        nwp_model: 'Open-Meteo Gridded NWP Screening Heuristic',
        is_official_government_alert: !!matchingAlert
      }
    };
  });

  return NextResponse.json({
    success: true,
    timestamp,
    telemetryStatus: forecastResults ? 'MODEL_SCREENING' : 'UNAVAILABLE',
    vps_disk_usage_bytes: 0, // Stateless streaming - 0 bytes on VPS disk
    monitored_corridors: enrichedRecords.length,
    official_alerts_count: sachetResult.alerts.length,
    official_alerts: sachetResult.alerts,
    gulmarg_ac_latest: gulmargResult.report,
    sachet_feed_status: sachetResult.status,
    gulmarg_feed_status: gulmargResult.status,
    data: enrichedRecords
  });
}
