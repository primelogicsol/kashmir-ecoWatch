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

const CACHE_KEY = 'earthquake_intelligence_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes

interface CacheData {
  timestamp: number;
  data: EarthquakeRecord[];
}

export function useEarthquakeIntelligence() {
  const [data, setData] = useState<EarthquakeRecord[]>(earthquakeData);
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
        const events = geojson.features || [];

        const updatedData = earthquakeData.map(zone => {
          let recentQuakesCount = 0;
          let latestMag = 0;
          let latestDate = '';
          let maxMagWithin50 = 0;
          let maxMagWithin100 = 0;

          events.forEach((event: any) => {
            const [lon, lat] = event.geometry.coordinates;
            const mag = event.properties.mag;
            const time = event.properties.time;
            
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
        setLoading(false);
        setIsStale(false);
        setError(null);
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: updatedData
        }));

      } catch (err) {
        console.error('USGS fetch error:', err);
        // Fallback to cache if available
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CacheData = JSON.parse(cached);
          setData(parsed.data);
          setIsStale(true);
        } else {
          // Fallback to static
          setData(earthquakeData);
          setIsStale(true);
        }
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchUSGSData();
  }, []);

  return { data, loading, isStale, error };
}
