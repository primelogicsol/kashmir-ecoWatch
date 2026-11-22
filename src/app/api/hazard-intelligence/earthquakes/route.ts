import { NextResponse } from 'next/server';
import { earthquakeData, EarthquakeRecord } from '@/data/hazard-earthquakes';

export interface UnifiedEarthquakeEvent {
  id: string;
  title: string;
  mag: number;
  time: number;
  time_iso: string;
  depth_km: number;
  place: string;
  coordinates: [number, number]; // [lon, lat]
  source: 'EMSC' | 'USGS' | 'EMSC+USGS';
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET() {
  const starttime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const bounds = {
    minLat: 32.0,
    maxLat: 37.5,
    minLon: 73.0,
    maxLon: 80.5,
  };

  // 1. Fetch EMSC (Fastest for Europe, Mediterranean, Central/South Asia down to M 2.0)
  const fetchEMSC = async (): Promise<UnifiedEarthquakeEvent[]> => {
    const url = `https://www.seismicportal.eu/fdsnws/event/1/query?format=json&minlat=${bounds.minLat}&maxlat=${bounds.maxLat}&minlon=${bounds.minLon}&maxlon=${bounds.maxLon}&starttime=${starttime}&limit=100`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch(url, { signal: controller.signal, next: { revalidate: 60 } });
      clearTimeout(timeout);
      if (!res.ok) return [];
      const json = await res.json();
      const features = json.features || [];
      return features.map((f: any) => ({
        id: f.id || `emsc-${f.properties?.unid || Math.random()}`,
        title: f.properties?.flynn_region ? `M ${f.properties.mag} - ${f.properties.flynn_region}` : `M ${f.properties?.mag || '?'} Earthquake`,
        mag: Number(f.properties?.mag) || 0,
        time: new Date(f.properties?.time).getTime() || Date.now(),
        time_iso: f.properties?.time || new Date().toISOString(),
        depth_km: Math.round(f.properties?.depth || f.geometry?.coordinates?.[2] || 10),
        place: f.properties?.flynn_region || 'Western Himalayas / Kashmir',
        coordinates: [f.geometry?.coordinates?.[0] || 0, f.geometry?.coordinates?.[1] || 0],
        source: 'EMSC' as const,
      }));
    } catch {
      clearTimeout(timeout);
      return [];
    }
  };

  // 2. Fetch USGS (Global standard & high-magnitude benchmark)
  const fetchUSGS = async (): Promise<UnifiedEarthquakeEvent[]> => {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=${bounds.minLat}&maxlatitude=${bounds.maxLat}&minlongitude=${bounds.minLon}&maxlongitude=${bounds.maxLon}&starttime=${starttime}&limit=100`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch(url, { signal: controller.signal, next: { revalidate: 60 } });
      clearTimeout(timeout);
      if (!res.ok) return [];
      const json = await res.json();
      const features = json.features || [];
      return features.map((f: any) => ({
        id: f.id || `usgs-${Math.random()}`,
        title: f.properties?.title || `M ${f.properties?.mag || '?'} Earthquake`,
        mag: Number(f.properties?.mag) || 0,
        time: Number(f.properties?.time) || Date.now(),
        time_iso: new Date(f.properties?.time || Date.now()).toISOString(),
        depth_km: Math.round(f.geometry?.coordinates?.[2] || 10),
        place: f.properties?.place || 'Western Himalayas',
        coordinates: [f.geometry?.coordinates?.[0] || 0, f.geometry?.coordinates?.[1] || 0],
        source: 'USGS' as const,
      }));
    } catch {
      clearTimeout(timeout);
      return [];
    }
  };

  const [emscResult, usgsResult] = await Promise.allSettled([fetchEMSC(), fetchUSGS()]);

  const emscEvents = emscResult.status === 'fulfilled' ? emscResult.value : [];
  const usgsEvents = usgsResult.status === 'fulfilled' ? usgsResult.value : [];

  // Deduplicate and combine (EMSC + USGS)
  const unifiedEvents: UnifiedEarthquakeEvent[] = [...emscEvents];

  for (const uEvent of usgsEvents) {
    const matchIndex = unifiedEvents.findIndex(e => {
      const timeDiffMin = Math.abs(e.time - uEvent.time) / (1000 * 60);
      const distKm = getDistanceFromLatLonInKm(
        e.coordinates[1], e.coordinates[0],
        uEvent.coordinates[1], uEvent.coordinates[0]
      );
      return timeDiffMin < 5 && distKm < 60;
    });

    if (matchIndex >= 0) {
      // Verified by both agencies
      unifiedEvents[matchIndex].source = 'EMSC+USGS';
      if (!unifiedEvents[matchIndex].place || unifiedEvents[matchIndex].place.length < (uEvent.place || '').length) {
        unifiedEvents[matchIndex].place = uEvent.place;
      }
    } else {
      unifiedEvents.push(uEvent);
    }
  }

  // Sort descending by time
  unifiedEvents.sort((a, b) => b.time - a.time);

  // Compute dynamic live risk for all baseline zones
  const updatedZones: EarthquakeRecord[] = earthquakeData.map(zone => {
    let recentQuakesCount = 0;
    let latestMag = 0;
    let latestDate = '';
    let maxMagWithin50 = 0;
    let maxMagWithin100 = 0;

    unifiedEvents.forEach(event => {
      const [lon, lat] = event.coordinates;
      const mag = event.mag;
      const time = event.time;
      const dist = getDistanceFromLatLonInKm(zone.latitude, zone.longitude, lat, lon);

      if (dist <= 100) {
        recentQuakesCount++;
        if (!latestDate || time > new Date(latestDate).getTime()) {
          latestMag = mag;
          latestDate = new Date(time).toISOString().split('T')[0];
        }
        if (mag > maxMagWithin100) maxMagWithin100 = mag;
        if (dist <= 50 && mag > maxMagWithin50) maxMagWithin50 = mag;
      }
    });

    let liveRisk = zone.risk_level;
    if (maxMagWithin100 >= 5.0) {
      liveRisk = 'Critical';
    } else if (maxMagWithin50 >= 3.5 || maxMagWithin100 >= 4.2) {
      liveRisk = liveRisk === 'Critical' ? 'Critical' : 'High';
    }

    return {
      ...zone,
      live_recent_quakes_30d: recentQuakesCount,
      live_latest_magnitude: latestMag > 0 ? latestMag : undefined,
      live_latest_date: latestDate || undefined,
      live_risk_level: liveRisk,
      last_updated: new Date().toISOString(),
    };
  });

  const providers = [];
  if (emscEvents.length > 0) providers.push('EMSC (SeismicPortal)');
  if (usgsEvents.length > 0) providers.push('USGS FDSNWS');

  return NextResponse.json({
    success: true,
    data: updatedZones,
    events: unifiedEvents,
    meta: {
      totalEvents: unifiedEvents.length,
      emscCount: emscEvents.length,
      usgsCount: usgsEvents.length,
      activeProviders: providers.length > 0 ? providers.join(' + ') : 'Cached / Fallback Catalog',
      liveWebSocketEndpoint: 'wss://www.seismicportal.eu/standing_order/websocket',
      updatedAt: new Date().toISOString(),
    }
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  });
}
