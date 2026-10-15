import { useState, useEffect } from 'react';
import { landslideData, LandslideRecord, LandslideScope, SlideType, LandslideRiskLevel, LandslideTrigger, LandslideVerification, LandslideStatus } from '@/data/hazard-landslides';
export type { LandslideScope, SlideType, LandslideRiskLevel, LandslideTrigger, LandslideVerification, LandslideStatus, LandslideRecord };

const CACHE_KEY = 'landslide_intelligence_v2';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export interface EnhancedLandslideRecord extends Omit<LandslideRecord, 'id'> {
  id: string;
  live_soil_moisture?: number;
  live_precipitation_24h?: number;
  live_precipitation_72h?: number;
  live_risk_level?: LandslideRiskLevel;
  dominant_trigger?: string;
  last_updated?: string;
}

export function useLandslideIntelligence() {
  const [data, setData] = useState<EnhancedLandslideRecord[]>(landslideData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isStale, setIsStale] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { timestamp, payload } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_EXPIRATION && Array.isArray(payload) && payload.length > 0 && payload[0].live_soil_moisture !== undefined) {
              setData(payload);
              setLoading(false);
              return;
            }
          } catch (e) {
            // invalid cache, continue
          }
        }

        // Try direct Open-Meteo client-side fetch (same resilient pattern as useFlashFloodIntelligence)
        const lats = landslideData.map(d => d.latitude.toFixed(4)).join(',');
        const lons = landslideData.map(d => d.longitude.toFixed(4)).join(',');
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=soil_moisture_0_to_7cm,precipitation&daily=precipitation_sum&timezone=auto&forecast_days=2`;

        const response = await fetch(weatherUrl);
        if (!response.ok) {
          throw new Error(`Open-Meteo HTTP ${response.status}`);
        }

        const weatherData = await response.json();
        const results = Array.isArray(weatherData) ? weatherData : [weatherData];
        const nowIso = new Date().toISOString();

        const enhanced = landslideData.map((record, index) => {
          const loc = results[index];
          if (!loc || !loc.current) return record;

          const soilMoisture = typeof loc.current.soil_moisture_0_to_7cm === 'number' ? loc.current.soil_moisture_0_to_7cm : 0.32;
          const daily = loc.daily?.precipitation_sum || [];
          const precip24h = daily.length > 0 ? (daily[0] || 0) : (loc.current.precipitation || 0);
          const precip72h = daily.reduce((acc: number, val: number) => acc + (val || 0), 0);

          let risk = record.risk_level;
          let triggerDesc: string = record.dominant_trigger || record.trigger;

          const isExtremeRain = precip24h > 40 || precip72h > 50;
          const isHeavyRain = precip24h > 20 || precip72h > 30;
          const isModerateRain = precip24h > 8 || precip72h > 12;
          const isHighMoisture = soilMoisture > 0.35;

          if (isHighMoisture && isExtremeRain) {
            risk = 'Critical';
            triggerDesc = 'Saturated Soil + Extreme Rain';
          } else if (isHighMoisture && isHeavyRain) {
            risk = 'High';
            triggerDesc = 'Saturated Soil + Heavy Rain';
          } else if (isHighMoisture || isModerateRain) {
            risk = 'Moderate';
            triggerDesc = isHighMoisture ? 'High Soil Moisture' : 'Moderate Rainfall';
          } else {
            risk = 'Low';
            triggerDesc = 'Stable / Low Moisture';
          }

          let currentStatus = record.current_status;
          if (risk === 'Critical') currentStatus = 'Active Alert';
          else if (risk === 'High') currentStatus = 'Watch';
          else currentStatus = 'Seasonal Risk';

          return {
            ...record,
            live_soil_moisture: soilMoisture,
            live_precipitation_24h: precip24h,
            live_precipitation_72h: precip72h,
            live_risk_level: risk,
            dominant_trigger: triggerDesc,
            current_status: currentStatus,
            last_updated: nowIso
          };
        });

        if (isMounted) {
          setData(enhanced);
          setLoading(false);
          setIsStale(false);
          setError(false);
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            payload: enhanced
          }));
        }
      } catch (err) {
        console.warn('[Landslides Hook] Open-Meteo direct fetch failed, trying local proxy route:', err);
        try {
          const res = await fetch('/api/hazard-intelligence/landslides');
          if (res.ok) {
            const json = await res.json();
            if (isMounted && json.data) {
              setData(json.data);
              setLoading(false);
              return;
            }
          }
        } catch (apiErr) {
          console.warn('[Landslides Hook] API proxy also failed:', apiErr);
        }

        if (isMounted) {
          setData(landslideData);
          setIsStale(true);
          setError(false);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error, isStale };
}
