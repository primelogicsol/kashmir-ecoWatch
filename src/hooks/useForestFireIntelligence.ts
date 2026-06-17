import { useState, useEffect } from 'react';
import { ForestFireRecord } from '@/data/hazard-forest-fires';

export interface LiveFireData {
  live_temperature: number;
  live_humidity: number;
  live_wind_speed: number;
  live_soil_moisture: number;
  live_risk_level: string;
  dominant_trigger: string;
  last_updated: string;
}

export interface LiveFireDataMap {
  [id: string]: LiveFireData;
}

export function useForestFireIntelligence(registry: ForestFireRecord[]) {
  const [liveData, setLiveData] = useState<LiveFireDataMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchMeteoData() {
      if (registry.length === 0) {
        setLoading(false);
        return;
      }

      const CACHE_KEY = 'forest_fire_api_cache';
      const CACHE_TIME = 45 * 60 * 1000; // 45 minutes

      const cachedStr = localStorage.getItem(CACHE_KEY);
      let cached = null;
      if (cachedStr) {
        try {
          cached = JSON.parse(cachedStr);
          if (Date.now() - cached.timestamp < CACHE_TIME) {
            if (isMounted) {
              setLiveData(cached.data);
              setLoading(false);
            }
            return;
          }
        } catch (e) {
          // ignore parsing error
        }
      }

      try {
        const lats = registry.map(r => r.latitude).join(',');
        const lons = registry.map(r => r.longitude).join(',');

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=temperature_2m_max,relative_humidity_2m_min,wind_speed_10m_max&hourly=soil_moisture_0_to_7cm&timezone=auto&forecast_days=1`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('API failed');
        const json = await res.json();
        
        const results = Array.isArray(json) ? json : [json];
        
        const newLiveData: LiveFireDataMap = {};
        
        registry.forEach((record, idx) => {
          const locData = results[idx];
          if (!locData) return;
          
          const temp = locData.daily?.temperature_2m_max?.[0] ?? 20;
          const hum = locData.daily?.relative_humidity_2m_min?.[0] ?? 50;
          const wind = locData.daily?.wind_speed_10m_max?.[0] ?? 10;
          
          const currentHour = new Date().getHours();
          const soil = locData.hourly?.soil_moisture_0_to_7cm?.[currentHour] ?? 0.3;
          
          let risk = 'Low';
          let trigger = 'Stable Conditions';
          
          if ((temp > 30 && hum < 30 && wind > 30) || (soil < 0.1 && temp > 30)) {
            risk = 'Critical';
            trigger = (soil < 0.1) ? 'Extreme Soil Dryness' : '30-30-30 Fire Weather';
          } 
          else if (temp > 25 && hum < 30) {
            risk = 'High';
            trigger = 'High Heat & Low Humidity';
          } 
          else if (temp > 20 && hum < 40) {
            risk = 'Moderate';
            trigger = 'Dry & Warm';
          } 
          else if (hum > 50 || soil > 0.3) {
            risk = 'Low';
            trigger = 'High Moisture';
          }
          else {
            risk = 'Low';
            trigger = 'Normal';
          }

          newLiveData[record.id] = {
            live_temperature: temp,
            live_humidity: hum,
            live_wind_speed: wind,
            live_soil_moisture: soil,
            live_risk_level: risk,
            dominant_trigger: trigger,
            last_updated: new Date().toISOString()
          };
        });

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: newLiveData
        }));
        
        if (isMounted) {
          setLiveData(newLiveData);
          setLoading(false);
          setIsStale(false);
        }
      } catch (e) {
        console.error(e);
        if (isMounted) {
          if (cached) {
            setLiveData(cached.data);
            setIsStale(true);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      }
    }

    fetchMeteoData();
    
    return () => {
      isMounted = false;
    };
  }, [registry]);

  return { liveData, loading, error, isStale };
}
