import { useState, useEffect, useCallback, useRef } from 'react';
import {
  earthquakeData,
  EarthquakeRecord,
  localizeSeismicEpicenter,
} from '@/data/hazard-earthquakes';

const CACHE_KEY = 'earthquake_intelligence_cache_v4';
const CACHE_DURATION = 60 * 1000; // 60 seconds freshness

export interface USGSEvent {
  id: string;
  title: string;
  mag: number;
  time: number;
  time_iso?: string;
  time_ist?: string;
  depth_km: number;
  place: string;
  rawRegion?: string;
  nearestDistrict?: string;
  distanceKm?: number;
  nearestFault?: string;
  zoneClassification?: string;
  coordinates: [number, number]; // [lon, lat]
  source?: string;
  reviewStatus?: 'Reviewed' | 'Automatic';
  externalUrl?: string;
}

interface CacheData {
  timestamp: number;
  data: EarthquakeRecord[];
  events: USGSEvent[];
  activeProviders?: string;
}

function formatClientIst(epochMs: number): string {
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

export function useEarthquakeIntelligence() {
  const [data, setData] = useState<EarthquakeRecord[]>(earthquakeData);
  const [recentEvents, setRecentEvents] = useState<USGSEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProviders, setActiveProviders] = useState<string>('NCS India + EMSC + USGS Telemetry');
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [liveAlert, setLiveAlert] = useState<USGSEvent | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  const fetchData = useCallback(async (bypassCache = false) => {
    setLoading(true);
    try {
      if (!bypassCache) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CacheData = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION && Array.isArray(parsed.events)) {
            setData(parsed.data);
            setRecentEvents(parsed.events);
            setActiveProviders(parsed.activeProviders || 'NCS India + EMSC + USGS Telemetry');
            setLastUpdated(new Date(parsed.timestamp));
            setLoading(false);
            return;
          }
        }
      }

      const url = bypassCache
        ? '/api/hazard-intelligence/earthquakes?refresh=1'
        : '/api/hazard-intelligence/earthquakes';
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const json = await response.json();
      if (json.success && Array.isArray(json.data)) {
        setData(json.data);
        setRecentEvents(json.events || []);
        setActiveProviders(json.meta?.activeProviders || 'NCS India + EMSC + USGS Telemetry');
        setLastUpdated(new Date());
        setIsStale(false);
        setError(null);

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              data: json.data,
              events: json.events || [],
              activeProviders: json.meta?.activeProviders,
            })
          );
        } catch {}
      }
    } catch (err) {
      console.warn('[EarthquakeIntelligence] API route fallback:', err);
      try {
        const starttime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const usgsUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=31.8&maxlatitude=37.6&minlongitude=71.0&maxlongitude=80.5&starttime=${starttime}`;
        const uRes = await fetch(usgsUrl);
        if (uRes.ok) {
          const uJson = await uRes.json();
          const parsedEvents: USGSEvent[] = (uJson.features || [])
            .map((f: any) => {
              const lon = Number(f.geometry.coordinates[0]);
              const lat = Number(f.geometry.coordinates[1]);
              const timeMs = Number(f.properties.time);
              const loc = localizeSeismicEpicenter(lat, lon);
              const place = f.properties.place || loc.preciseLabel;
              return {
                id: f.id,
                title: f.properties.title || `M ${f.properties.mag} - ${place}`,
                mag: Number(f.properties.mag),
                time: timeMs,
                time_iso: new Date(timeMs).toISOString(),
                time_ist: formatClientIst(timeMs),
                depth_km: Math.round(Math.abs(f.geometry.coordinates[2] || 10)),
                place,
                nearestDistrict: loc.nearestDistrict,
                distanceKm: loc.distanceKm,
                nearestFault: loc.nearestFault,
                zoneClassification: loc.zoneClassification,
                coordinates: [lon, lat] as [number, number],
                source: 'USGS',
                reviewStatus: 'Reviewed' as const,
                externalUrl: f.properties.url,
              };
            })
            .sort((a: USGSEvent, b: USGSEvent) => b.time - a.time);

          setData(earthquakeData);
          setRecentEvents(parsedEvents);
          setActiveProviders('USGS FDSNWS (Direct)');
          setLastUpdated(new Date());
          setIsStale(false);
        } else {
          throw new Error('USGS direct failed');
        }
      } catch {
        setIsStale(true);
        setError('Unable to fetch live seismic data from NCS, EMSC, or USGS');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sub-second EMSC WebSocket telemetry with instant district localization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let socket: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    function connectWebSocket() {
      try {
        socket = new WebSocket('wss://www.seismicportal.eu/standing_order/websocket');
        wsRef.current = socket;

        socket.onopen = () => {
          setIsLiveStreaming(true);
        };

        socket.onmessage = (event) => {
          try {
            const parsed = JSON.parse(event.data);
            const props = parsed.data?.properties;
            const geom = parsed.data?.geometry;

            if (props && geom && geom.coordinates) {
              const [lon, lat, depth] = geom.coordinates;
              const mag = Number(props.mag);
              const isInRegion = lat >= 31.8 && lat <= 37.6 && lon >= 71.0 && lon <= 80.5;

              if (isInRegion) {
                const timeMs = new Date(props.time).getTime() || Date.now();
                const loc = localizeSeismicEpicenter(Number(lat), Number(lon));
                const liveEvent: USGSEvent = {
                  id: parsed.data.id || `live-emsc-${Date.now()}`,
                  title: `M ${mag.toFixed(1)} - ${loc.preciseLabel}`,
                  mag,
                  time: timeMs,
                  time_iso: props.time,
                  time_ist: formatClientIst(timeMs),
                  depth_km: Math.round(Math.abs(depth || 10)),
                  place: loc.preciseLabel,
                  rawRegion: props.flynn_region,
                  nearestDistrict: loc.nearestDistrict,
                  distanceKm: loc.distanceKm,
                  nearestFault: loc.nearestFault,
                  zoneClassification: loc.zoneClassification,
                  coordinates: [Number(lon), Number(lat)],
                  source: 'EMSC Live WebSocket',
                  reviewStatus: 'Automatic',
                };

                setLiveAlert(liveEvent);
                setRecentEvents((prev) => {
                  if (prev.some((e) => e.id === liveEvent.id)) return prev;
                  return [liveEvent, ...prev];
                });
              }
            }
          } catch (msgErr) {
            console.error('[EMSC WebSocket] message parse error:', msgErr);
          }
        };

        socket.onclose = () => {
          setIsLiveStreaming(false);
          reconnectTimeout = setTimeout(connectWebSocket, 15000);
        };

        socket.onerror = () => {
          setIsLiveStreaming(false);
        };
      } catch {
        setIsLiveStreaming(false);
      }
    }

    connectWebSocket();

    return () => {
      if (socket) socket.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const dismissAlert = useCallback(() => {
    setLiveAlert(null);
  }, []);

  return {
    data,
    recentEvents,
    totalRegionalQuakes: recentEvents.length,
    loading,
    isStale,
    error,
    activeProviders,
    isLiveStreaming,
    liveAlert,
    dismissAlert,
    refresh,
    lastUpdated,
  };
}
