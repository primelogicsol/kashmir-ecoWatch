import { NextResponse } from 'next/server';
import {
  earthquakeData,
  EarthquakeRecord,
  haversineKm,
  localizeSeismicEpicenter,
} from '@/data/hazard-earthquakes';

export const dynamic = 'force-dynamic';

export type SeismicAgencySource =
  | 'NCS'
  | 'EMSC'
  | 'USGS'
  | 'NCS+EMSC'
  | 'NCS+USGS'
  | 'EMSC+USGS'
  | 'NCS+EMSC+USGS';

export interface UnifiedEarthquakeEvent {
  id: string;
  title: string;
  mag: number;
  time: number;
  time_iso: string;
  time_ist: string;
  depth_km: number;
  place: string;
  rawRegion?: string;
  nearestDistrict: string;
  distanceKm: number;
  nearestFault: string;
  zoneClassification: string;
  coordinates: [number, number]; // [lon, lat]
  source: SeismicAgencySource;
  reviewStatus: 'Reviewed' | 'Automatic';
  externalUrl?: string;
}

const BOUNDS = {
  minLat: 31.8,
  maxLat: 37.6,
  minLon: 71.0, // Includes Chitral / Hindu Kush deep zone felt across Kashmir & Gilgit
  maxLon: 80.5,
};

const CACHE_TTL_MS = 60 * 1000; // 60s server cache for ultra-fast load + protection against upstream rate limits
let cachedResponse: Record<string, unknown> | null = null;
let cachedAt = 0;

function formatIst(epochMs: number): string {
  try {
    return (
      new Date(epochMs).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }) + ' IST'
    );
  } catch {
    return new Date(epochMs).toISOString();
  }
}

function isGenericFlinnRegion(place?: string): boolean {
  if (!place) return true;
  const upper = place.trim().toUpperCase();
  return (
    place === upper ||
    upper.includes('BORDER REGION') ||
    upper.includes('EASTERN KASHMIR') ||
    upper.includes('WESTERN KASHMIR') ||
    upper.includes('NORTHWESTERN KASHMIR') ||
    upper.includes('SOUTHWESTERN KASHMIR') ||
    upper === 'INDIA' ||
    upper === 'PAKISTAN' ||
    upper === 'TAJIKISTAN' ||
    upper === 'AFGHANISTAN-TAJIKISTAN BORDER REGION'
  );
}

// 1. Fetch NCS India (National Center for Seismology — riseq.seismo.gov.in)
async function fetchNCS(cutoffMs: number): Promise<UnifiedEarthquakeEvent[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);
  try {
    const res = await fetch('https://riseq.seismo.gov.in/', {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        Accept: 'text/html,application/xhtml+xml',
        'User-Agent': 'KashmirEcoWatch-SeismicTelemetry/2.0',
      },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const events: UnifiedEarthquakeEvent[] = [];
    const regex = /data-json='(\{[^']+\})'/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(html)) !== null) {
      try {
        const item = JSON.parse(match[1]);
        if (!item?.lat_long) continue;
        const [latStr, lonStr] = String(item.lat_long).split(',').map((s: string) => s.trim());
        const lat = Number(latStr);
        const lon = Number(lonStr);
        if (
          Number.isNaN(lat) ||
          Number.isNaN(lon) ||
          lat < BOUNDS.minLat ||
          lat > BOUNDS.maxLat ||
          lon < BOUNDS.minLon ||
          lon > BOUNDS.maxLon
        ) {
          continue;
        }

        // Parse "2026-11-19 20:31:56 IST" -> ISO +05:30
        const cleanOrigin = String(item.origin_time || '')
          .replace(/\s*IST\s*$/i, '')
          .trim()
          .replace(' ', 'T');
        const timeMs = cleanOrigin ? new Date(`${cleanOrigin}+05:30`).getTime() : Date.now();
        if (Number.isNaN(timeMs) || timeMs < cutoffMs) continue;

        // Parse "M: 2.5 , D: 10km"
        const magMatch = String(item.magnitude_depth || item.event_name || '').match(/M:\s*([0-9.]+)/i);
        const depthMatch = String(item.magnitude_depth || '').match(/D:\s*([0-9.]+)/i);
        const mag = magMatch ? Number(magMatch[1]) : 0;
        const depthKm = depthMatch ? Math.round(Number(depthMatch[1])) : 10;

        // Extract NCS official location name after "M: X.X - "
        const ncsPlaceRaw = String(item.event_name || '')
          .replace(/^M:\s*[0-9.]+\s*-\s*/i, '')
          .trim();

        const loc = localizeSeismicEpicenter(lat, lon);
        const displayPlace =
          ncsPlaceRaw && !isGenericFlinnRegion(ncsPlaceRaw)
            ? `${ncsPlaceRaw} (${loc.preciseLabel})`
            : loc.preciseLabel;

        const reviewType = String(item.event_type || 'Reviewed').trim();
        const ncsUrl = item.event_id
          ? `https://riseq.seismo.gov.in/riseq/felt_report/index/${item.event_id}/${reviewType}`
          : 'https://riseq.seismo.gov.in/';

        events.push({
          id: `ncs-${item.event_id || `${timeMs}`}`,
          title: `M ${mag.toFixed(1)} - ${displayPlace}`,
          mag,
          time: timeMs,
          time_iso: new Date(timeMs).toISOString(),
          time_ist: formatIst(timeMs),
          depth_km: depthKm,
          place: displayPlace,
          rawRegion: ncsPlaceRaw || undefined,
          nearestDistrict: loc.nearestDistrict,
          distanceKm: loc.distanceKm,
          nearestFault: loc.nearestFault,
          zoneClassification: loc.zoneClassification,
          coordinates: [lon, lat],
          source: 'NCS',
          reviewStatus: reviewType.toLowerCase().includes('review') ? 'Reviewed' : 'Automatic',
          externalUrl: ncsUrl,
        });
      } catch {
        // Skip malformed row
      }
    }
    return events;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

// 2. Fetch EMSC (Euro-Mediterranean Seismological Centre — sub-minute South/Central Asia down to M 2.0)
async function fetchEMSC(starttime: string): Promise<UnifiedEarthquakeEvent[]> {
  const url = `https://www.seismicportal.eu/fdsnws/event/1/query?format=json&minlat=${BOUNDS.minLat}&maxlat=${BOUNDS.maxLat}&minlon=${BOUNDS.minLon}&maxlon=${BOUNDS.maxLon}&starttime=${starttime}&limit=150`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const features = json.features || [];
    return features.map((f: any) => {
      const lon = Number(f.geometry?.coordinates?.[0] || 0);
      const lat = Number(f.geometry?.coordinates?.[1] || 0);
      const mag = Number(f.properties?.mag) || 0;
      const timeMs = new Date(f.properties?.time).getTime() || Date.now();
      const rawFlynn = String(f.properties?.flynn_region || '').trim();
      const loc = localizeSeismicEpicenter(lat, lon);
      const place = isGenericFlinnRegion(rawFlynn) ? loc.preciseLabel : rawFlynn;
      const unid = f.properties?.unid || f.id;

      return {
        id: unid || `emsc-${timeMs}`,
        title: `M ${mag.toFixed(1)} - ${place}`,
        mag,
        time: timeMs,
        time_iso: new Date(timeMs).toISOString(),
        time_ist: formatIst(timeMs),
        depth_km: Math.round(Math.abs(Number(f.properties?.depth ?? f.geometry?.coordinates?.[2] ?? 10))),
        place,
        rawRegion: rawFlynn || undefined,
        nearestDistrict: loc.nearestDistrict,
        distanceKm: loc.distanceKm,
        nearestFault: loc.nearestFault,
        zoneClassification: loc.zoneClassification,
        coordinates: [lon, lat] as [number, number],
        source: 'EMSC' as const,
        reviewStatus: f.properties?.auth ? 'Reviewed' : 'Automatic',
        externalUrl: unid ? `https://www.emsc-csem.org/Earthquake_information/earthquake.php?id=${unid}` : undefined,
      };
    });
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

// 3. Fetch USGS (Global standard & M 4.0+ authoritative benchmark)
async function fetchUSGS(starttime: string): Promise<UnifiedEarthquakeEvent[]> {
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=${BOUNDS.minLat}&maxlatitude=${BOUNDS.maxLat}&minlongitude=${BOUNDS.minLon}&maxlongitude=${BOUNDS.maxLon}&starttime=${starttime}&limit=150`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const features = json.features || [];
    return features.map((f: any) => {
      const lon = Number(f.geometry?.coordinates?.[0] || 0);
      const lat = Number(f.geometry?.coordinates?.[1] || 0);
      const mag = Number(f.properties?.mag) || 0;
      const timeMs = Number(f.properties?.time) || Date.now();
      const usgsPlace = String(f.properties?.place || '').trim();
      const loc = localizeSeismicEpicenter(lat, lon);
      const place = usgsPlace && !isGenericFlinnRegion(usgsPlace) ? usgsPlace : loc.preciseLabel;

      return {
        id: f.id || `usgs-${timeMs}`,
        title: `M ${mag.toFixed(1)} - ${place}`,
        mag,
        time: timeMs,
        time_iso: new Date(timeMs).toISOString(),
        time_ist: formatIst(timeMs),
        depth_km: Math.round(Math.abs(Number(f.geometry?.coordinates?.[2] ?? 10))),
        place,
        rawRegion: usgsPlace || undefined,
        nearestDistrict: loc.nearestDistrict,
        distanceKm: loc.distanceKm,
        nearestFault: loc.nearestFault,
        zoneClassification: loc.zoneClassification,
        coordinates: [lon, lat] as [number, number],
        source: 'USGS' as const,
        reviewStatus: f.properties?.status === 'reviewed' ? 'Reviewed' : 'Automatic',
        externalUrl: f.properties?.url || undefined,
      };
    });
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

function combineAgencyTag(existing: SeismicAgencySource, incoming: 'NCS' | 'EMSC' | 'USGS'): SeismicAgencySource {
  const parts = new Set(existing.split('+'));
  parts.add(incoming);
  const ordered = ['NCS', 'EMSC', 'USGS'].filter((p) => parts.has(p));
  return ordered.join('+') as SeismicAgencySource;
}

export async function GET(request: Request) {
  const nowMs = Date.now();
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === '1';

  if (!forceRefresh && cachedResponse && nowMs - cachedAt < CACHE_TTL_MS) {
    return NextResponse.json(cachedResponse);
  }

  const cutoffMs = nowMs - 30 * 24 * 60 * 60 * 1000;
  const starttime = new Date(cutoffMs).toISOString().split('T')[0];

  const [ncsRes, emscRes, usgsRes] = await Promise.allSettled([
    fetchNCS(cutoffMs),
    fetchEMSC(starttime),
    fetchUSGS(starttime),
  ]);

  const ncsEvents = ncsRes.status === 'fulfilled' ? ncsRes.value : [];
  const emscEvents = emscRes.status === 'fulfilled' ? emscRes.value : [];
  const usgsEvents = usgsRes.status === 'fulfilled' ? usgsRes.value : [];

  // Seed unified list with NCS India first (authoritative Indian district naming), then merge EMSC & USGS
  const unifiedEvents: UnifiedEarthquakeEvent[] = [...ncsEvents];

  const mergeIncoming = (incomingList: UnifiedEarthquakeEvent[], agency: 'EMSC' | 'USGS') => {
    for (const ev of incomingList) {
      const matchIdx = unifiedEvents.findIndex((existing) => {
        const timeDiffMin = Math.abs(existing.time - ev.time) / (1000 * 60);
        const distKm = haversineKm(
          existing.coordinates[1],
          existing.coordinates[0],
          ev.coordinates[1],
          ev.coordinates[0]
        );
        return timeDiffMin < 3.5 && distKm < 55;
      });

      if (matchIdx >= 0) {
        const target = unifiedEvents[matchIdx];
        target.source = combineAgencyTag(target.source, agency);
        if (ev.reviewStatus === 'Reviewed') target.reviewStatus = 'Reviewed';
        if (!target.externalUrl && ev.externalUrl) target.externalUrl = ev.externalUrl;
        // Prefer specific non-generic place label if target had a generic one
        if (isGenericFlinnRegion(target.place) && !isGenericFlinnRegion(ev.place)) {
          target.place = ev.place;
          target.title = `M ${target.mag.toFixed(1)} - ${ev.place}`;
        }
      } else {
        unifiedEvents.push(ev);
      }
    }
  };

  mergeIncoming(emscEvents, 'EMSC');
  mergeIncoming(usgsEvents, 'USGS');

  // Sort newest -> oldest
  unifiedEvents.sort((a, b) => b.time - a.time);

  // Compute accurate dynamic live risk & exact latest event per baseline fault zone
  // (Fixes the YYYY-MM-DD truncation bug where older quakes on the same day overwrote newer ones)
  const updatedZones: EarthquakeRecord[] = earthquakeData.map((zone) => {
    let quakesWithin100km = 0;
    let quakesWithin50km = 0;
    let latestTimeMs = 0;
    let latestMag = 0;
    let latestDate = '';
    let latestPlace = '';
    let latestTimeIst = '';
    let latestSource = '';
    let maxMagWithin50 = 0;
    let maxMagWithin100 = 0;

    for (const event of unifiedEvents) {
      const [lon, lat] = event.coordinates;
      const dist = haversineKm(zone.latitude, zone.longitude, lat, lon);

      if (dist <= 100) {
        quakesWithin100km++;
        if (dist <= 50) {
          quakesWithin50km++;
          if (event.mag > maxMagWithin50) maxMagWithin50 = event.mag;
        }
        if (event.mag > maxMagWithin100) maxMagWithin100 = event.mag;

        if (event.time > latestTimeMs) {
          latestTimeMs = event.time;
          latestMag = event.mag;
          latestDate = new Date(event.time).toISOString().split('T')[0];
          latestPlace = event.place;
          latestTimeIst = event.time_ist;
          latestSource = event.source;
        }
      }
    }

    let liveRisk = zone.risk_level;
    if (maxMagWithin100 >= 5.0) {
      liveRisk = 'Critical';
    } else if (maxMagWithin50 >= 3.5 || maxMagWithin100 >= 4.2) {
      liveRisk = liveRisk === 'Critical' ? 'Critical' : 'High';
    }

    return {
      ...zone,
      live_recent_quakes_30d: quakesWithin100km,
      live_local_quakes_50km: quakesWithin50km,
      live_latest_magnitude: latestMag > 0 ? latestMag : undefined,
      live_latest_date: latestDate || undefined,
      live_latest_place: latestPlace || undefined,
      live_latest_time_ist: latestTimeIst || undefined,
      live_latest_source: latestSource || undefined,
      live_risk_level: liveRisk,
      last_updated: new Date().toISOString(),
    };
  });

  const providers: string[] = [];
  if (ncsEvents.length > 0) providers.push('NCS India (Seismo.gov.in)');
  if (emscEvents.length > 0) providers.push('EMSC SeismicPortal');
  if (usgsEvents.length > 0) providers.push('USGS FDSN');

  const payload: Record<string, unknown> = {
    success: true,
    data: updatedZones,
    events: unifiedEvents,
    meta: {
      totalEvents: unifiedEvents.length,
      ncsCount: ncsEvents.length,
      emscCount: emscEvents.length,
      usgsCount: usgsEvents.length,
      activeProviders: providers.length > 0 ? providers.join(' + ') : 'Cached / Fallback Catalog',
      liveWebSocketEndpoint: 'wss://www.seismicportal.eu/standing_order/websocket',
      bounds: BOUNDS,
      updatedAt: new Date().toISOString(),
    },
  };

  cachedResponse = payload;
  cachedAt = Date.now();

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
