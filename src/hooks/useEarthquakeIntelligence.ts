import { useState, useEffect, useCallback, useRef } from 'react';
import { earthquakeData, EarthquakeRecord } from '@/data/hazard-earthquakes';

// Distance in km using Haversine formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const CACHE_KEY = 'earthquake_intelligence_cache_v3';
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes (fast freshness)

export interface USGSEvent {
  id: string;
  title: string;
  mag: number;
  time: number;
  time_iso?: string;
  depth_km: number;
  place: string;
  coordinates: [number, number]; // [lon, lat]
  source?: 'EMSC' | 'USGS' | 'EMSC+USGS' | 'EMSC Live WebSocket';
}

interface CacheData {
  timestamp: number;
  data: EarthquakeRecord[];
  events: USGSEvent[];
  activeProviders?: string;
}

export function useEarthquakeIntelligence() {
  const [data, setData] = useState<EarthquakeRecord[]>(earthquakeData);
  const [recentEvents, setRecentEvents] = useState<USGSEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProviders, setActiveProviders] = useState<string>('EMSC + USGS Dual Telemetry');
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [liveAlert, setLiveAlert] = useState<USGSEvent | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const wsRef = useRef<WebSocket | null>(null);

  // Core fetch function
  const fetchData = useCallback(async (bypassCache = false) => {
    setLoading(true);
    try {
      if (!bypassCache) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CacheData = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            setRecentEvents(parsed.events || []);
            setActiveProviders(parsed.activeProviders || 'EMSC + USGS Dual Telemetry');
            setLastUpdated(new Date(parsed.timestamp));
            setLoading(false);
            return;
          }
        }
      }

      // Fetch from internal high-speed unified API route
      const response = await fetch('/api/hazard-intelligence/earthquakes', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const json = await response.json();
      if (json.success && Array.isArray(json.data)) {
        setData(json.data);
        setRecentEvents(json.events || []);
        setActiveProviders(json.meta?.activeProviders || 'EMSC + USGS Dual Telemetry');
        setLastUpdated(new Date());
        setIsStale(false);
        setError(null);

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: json.data,
          events: json.events,
          activeProviders: json.meta?.activeProviders,
        }));
      }
    } catch (err: any) {
      console.warn('[EarthquakeIntelligence] API route fallback:', err);
      // Fallback: direct USGS fetch if local API failed
      try {
        const starttime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const usgsUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=32.0&maxlatitude=37.5&minlongitude=73.0&maxlongitude=80.5&starttime=${starttime}`;
        const uRes = await fetch(usgsUrl);
        if (uRes.ok) {
          const uJson = await uRes.json();
          const parsedEvents: USGSEvent[] = (uJson.features || []).map((f: any) => ({
            id: f.id,
            title: f.properties.title || `M ${f.properties.mag} Earthquake`,
            mag: f.properties.mag,
            time: f.properties.time,
            depth_km: Math.round(f.geometry.coordinates[2] || 10),
            place: f.properties.place || 'NW Himalayan Arc',
            coordinates: [f.geometry.coordinates[0], f.geometry.coordinates[1]],
            source: 'USGS' as const,
          })).sort((a: USGSEvent, b: USGSEvent) => b.time - a.time);

          setData(earthquakeData);
          setRecentEvents(parsedEvents);
          setActiveProviders('USGS FDSNWS (Direct)');
          setLastUpdated(new Date());
          setIsStale(false);
        } else {
          throw new Error('USGS direct failed');
        }
      } catch (fallbackErr) {
        setIsStale(true);
        setError('Unable to fetch live seismic data from EMSC or USGS');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Real-time EMSC WebSocket connection for sub-second earthquake alert telemetry
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let socket: WebSocket | null = null;
    let reconnectTimeout: any = null;

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

              // Check if event is in Kashmir / Western Himalayan region (Lat 32 to 37.5, Lon 73 to 80.5)
              const isInRegion = lat >= 32.0 && lat <= 37.5 && lon >= 73.0 && lon <= 80.5;

              if (isInRegion) {
                const liveEvent: USGSEvent = {
                  id: parsed.data.id || `live-emsc-${Date.now()}`,
                  title: `${props.flynn_region || 'Kashmir Region'} M ${mag.toFixed(1)}`,
                  mag: mag,
                  time: new Date(props.time).getTime(),
                  time_iso: props.time,
                  depth_km: Math.round(depth || 10),
                  place: props.flynn_region || 'Western Himalayas / Kashmir',
                  coordinates: [lon, lat],
                  source: 'EMSC Live WebSocket',
                };

                // Flash alert for events
                setLiveAlert(liveEvent);

                // Prepend to recent events if not already there
                setRecentEvents(prev => {
                  if (prev.some(e => e.id === liveEvent.id)) return prev;
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
          // Try reconnecting in 15 seconds
          reconnectTimeout = setTimeout(connectWebSocket, 15000);
        };

        socket.onerror = () => {
          setIsLiveStreaming(false);
        };
      } catch (err) {
        setIsLiveStreaming(false);
      }
    }

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
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
