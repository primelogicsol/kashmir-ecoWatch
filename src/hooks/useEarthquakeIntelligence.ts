import { useState, useEffect } from 'react';
import { earthquakeData, EarthquakeRecord } from '@/data/hazard-earthquakes';

// Distance in km using Haversine formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const CACHE_KEY = 'earthquake_intelligence_cache_v2';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export interface USGSEvent {
  id: string;
  title: string;
  mag: number;
  time: number;
  depth_km: number;
  place: string;
  coordinates: [number, number]; // [lon, lat]
}

interface CacheData {
  timestamp: number;
  data: EarthquakeRecord[];
  events: USGSEvent[];
}

export function useEarthquakeIntelligence() {
  const [data, setData] = useState<EarthquakeRecord[]>(earthquakeData);
  const [recentEvents, setRecentEvents] = useState<USGSEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUSGSData() {
      try {
        // Check cache
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CacheData = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            setRecentEvents(parsed.events || []);
            setLoading(false);
            return;
          }
        }

        const starttime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=32.0&maxlatitude=37.5&minlongitude=73.0&maxlongitude=80.5&starttime=${starttime}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch USGS data');
        }

        const geojson = await response.json();
        const rawEvents = geojson.features || [];

        const parsedEvents: USGSEvent[] = rawEvents.map((f: any) => ({
          id: f.id,
          title: f.properties.title || `M ${f.properties.mag} Earthquake`,
          mag: f.properties.mag,
          time: f.properties.time,
          depth_km: Math.round(f.geometry.coordinates[2] || 10),
          place: f.properties.place || 'NW Himalayan Arc',
          coordinates: [f.geometry.coordinates[0], f.geometry.coordinates[1]],
        })).sort((a: USGSEvent, b: USGSEvent) => b.time - a.time);

        const updatedData = earthquakeData.map(zone => {
          let recentQuakesCount = 0;
          let latestMag = 0;
          let latestDate = '';
          let maxMagWithin50 = 0;
          let maxMagWithin100 = 0;

          parsedEvents.forEach(event => {
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

          // Dynamic Risk calculation
          let liveRisk = zone.risk_level;
          if (maxMagWithin100 > 5.0) {
            liveRisk = 'Critical';
          } else if (maxMagWithin50 > 3.5) {
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

        setData(updatedData);
        setRecentEvents(parsedEvents);
        setLoading(false);
        setIsStale(false);
        setError(null);
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: updatedData,
          events: parsedEvents
        }));

      } catch (err) {
        console.error('USGS fetch error:', err);
        // Fallback to cache if available
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CacheData = JSON.parse(cached);
          setData(parsed.data);
          setRecentEvents(parsed.events || []);
          setIsStale(true);
        } else {
          setData(earthquakeData);
          setRecentEvents([]);
          setIsStale(true);
        }
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchUSGSData();
  }, []);

  return { data, recentEvents, totalRegionalQuakes: recentEvents.length, loading, isStale, error };
}
