import { useState, useEffect } from 'react';
import { AvalancheRecord } from '@/data/hazard-avalanches';

// Caching key
const CACHE_KEY = 'avalanche_api_cache';
const CACHE_DURATION_MS = 45 * 60 * 1000; // 45 minutes

export function useAvalancheIntelligence(initialData: AvalancheRecord[]) {
  const [data, setData] = useState<AvalancheRecord[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveData() {
      try {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          const age = Date.now() - cached.timestamp;
          if (age < CACHE_DURATION_MS) {
            setData(cached.data);
            setLoading(false);
            return;
          }
        }

        // If no cache or expired, fetch from Open-Meteo
        // We will batch coordinates. Open-Meteo allows batching up to 1000 locations by passing comma-separated lat/lngs.
        const lats = initialData.map(d => d.latitude).join(',');
        const lngs = initialData.map(d => d.longitude).join(',');

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&hourly=snowfall,snow_depth,wind_speed_10m,temperature_2m&current=wind_speed_10m,temperature_2m,snow_depth,snowfall&forecast_days=1`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('API failed');
        }
        
        const json = await response.json();
        const results = Array.isArray(json) ? json : [json];

        const updatedData = initialData.map((record, index) => {
          const locData = results[index];
          
          const current = locData?.current;
          const hourly = locData?.hourly;

          // live_snowfall_24h = sum of hourly snowfall in cm
          let live_snowfall_24h = 0;
          if (hourly && hourly.snowfall) {
            live_snowfall_24h = hourly.snowfall.reduce((a: number, b: number) => a + (b || 0), 0);
          } else if (current && current.snowfall) {
            live_snowfall_24h = current.snowfall * 24; 
          }

          const live_snow_depth = current?.snow_depth ?? 0;
          const live_wind_speed = current?.wind_speed_10m ?? 0;
          const live_temperature = current?.temperature_2m ?? 0;

          // Determine risk logic
          let live_risk_level: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
          let dominant_trigger = 'Stable Conditions';

          if (live_snowfall_24h > 50 || (live_wind_speed > 60 && record.slope_angle_deg > 35)) {
            live_risk_level = 'Critical';
            dominant_trigger = live_snowfall_24h > 50 ? 'Extreme Fresh Snow' : 'Extreme Wind Loading';
          } else if ((live_snowfall_24h > 30 && live_wind_speed > 40) || (live_temperature > 5 && live_snow_depth > 1)) {
            live_risk_level = 'High';
            dominant_trigger = (live_snowfall_24h > 30) ? 'Heavy Snow & Wind' : 'Rapid Warming';
          } else if (live_snowfall_24h >= 10 || live_wind_speed > 20) {
            live_risk_level = 'Moderate';
            dominant_trigger = live_snowfall_24h >= 10 ? 'Fresh Snow Accumulation' : 'Moderate Wind Loading';
          } else {
            live_risk_level = 'Low';
            dominant_trigger = 'Stable Conditions';
          }

          return {
            ...record,
            live_snowfall_24h: Math.round(live_snowfall_24h * 10) / 10,
            live_snow_depth: typeof live_snow_depth === 'number' ? Math.round(live_snow_depth * 100) / 100 : 0,
            live_wind_speed: Math.round(live_wind_speed),
            live_temperature: Math.round(live_temperature * 10) / 10,
            live_risk_level,
            dominant_trigger,
            last_updated: new Date().toISOString()
          };
        });

        if (isMounted) {
          setData(updatedData);
          setLoading(false);
          setIsStale(false);
          setError(null);
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: updatedData
          }));
        }

      } catch (err) {
        if (isMounted) {
          // If we fail, try to fall back to cache even if stale
          const cachedStr = localStorage.getItem(CACHE_KEY);
          if (cachedStr) {
            const cached = JSON.parse(cachedStr);
            setData(cached.data);
            setIsStale(true); // show stale warning
            setLoading(false);
          } else {
            setData(initialData);
            setError('Failed to fetch live data and no cache available.');
            setLoading(false);
          }
        }
      }
    }

    fetchLiveData();

    return () => {
      isMounted = false;
    };
  }, [initialData]);

  return { data, loading, error, isStale };
}
