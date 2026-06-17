import { useState, useEffect } from 'react';
import { LandslideRecord, LandslideRiskLevel } from '@/data/hazard-landslides';

const CACHE_KEY = 'landslide_intelligence_data';
const CACHE_EXPIRATION = 45 * 60 * 1000; // 45 minutes

export interface EnhancedLandslideRecord extends LandslideRecord {
  live_soil_moisture?: number;
  live_precipitation_24h?: number;
  live_precipitation_72h?: number;
  live_risk_level?: LandslideRiskLevel;
  dominant_trigger?: string;
  last_updated?: string;
}

export function useLandslideIntelligence(records: LandslideRecord[]) {
  const [data, setData] = useState<EnhancedLandslideRecord[]>(records);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isStale, setIsStale] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, payload } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_EXPIRATION) {
            setData(payload);
            setLoading(false);
            return;
          } else {
            // Data is stale, we'll try to fetch, but set stale in case fetch fails
            setIsStale(true);
            setData(payload);
          }
        }

        // We only fetch for records that have lat/lon
        const validRecords = records.filter(r => r.latitude !== undefined && r.longitude !== undefined);
        if (validRecords.length === 0) {
          setData(records);
          setLoading(false);
          return;
        }

        const lats = validRecords.map(r => r.latitude).join(',');
        const lons = validRecords.map(r => r.longitude).join(',');

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=soil_moisture_0_to_7cm,precipitation&daily=precipitation_sum&timezone=auto&past_days=3&forecast_days=1`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('API fetch failed');
        }

        const apiData = await res.json();
        
        // Open Meteo returns an array if multiple coordinates, or a single object if one coordinate
        const results = Array.isArray(apiData) ? apiData : [apiData];

        const enhancedData: EnhancedLandslideRecord[] = records.map((record) => {
          // If no coordinate, return as is
          if (record.latitude === undefined || record.longitude === undefined) {
            return record;
          }

          // Find the corresponding result by index
          const index = validRecords.findIndex(vr => vr.id === record.id);
          const locationData = results[index];

          if (!locationData || !locationData.current || !locationData.daily) {
            return record;
          }

          const soilMoisture = locationData.current.soil_moisture_0_to_7cm || 0;
          
          // Calculate 24h and 72h precipitation
          // The daily array for past_days=3 & forecast_days=1 gives 4 days: [-3, -2, -1, 0(today)]
          const dailyPrecip = locationData.daily.precipitation_sum || [];
          
          // Last element is today's precipitation
          const precip24h = dailyPrecip.length > 0 ? dailyPrecip[dailyPrecip.length - 1] : 0;
          
          // Sum of last 3 elements (today, yesterday, day before)
          const precip72h = dailyPrecip.slice(-3).reduce((acc: number, val: number) => acc + (val || 0), 0);

          let risk: LandslideRiskLevel = record.risk_level;
          let triggerDesc = record.trigger;

          // Risk logic
          const isExtremeRain = precip24h > 50 || precip72h > 50;
          const isHeavyRain = precip24h > 30 || precip72h > 30;
          const isModerateRain = precip24h > 10 || precip72h > 10;
          
          const isVeryHighMoisture = soilMoisture > 0.4;
          const isHighMoisture = soilMoisture > 0.3;

          if (isVeryHighMoisture && isExtremeRain) {
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
            triggerDesc = 'Low Moisture/Rainfall';
          }

          return {
            ...record,
            live_soil_moisture: soilMoisture,
            live_precipitation_24h: precip24h,
            live_precipitation_72h: precip72h,
            live_risk_level: risk,
            dominant_trigger: triggerDesc,
            last_updated: new Date().toISOString(),
          };
        });

        if (isMounted) {
          setData(enhancedData);
          setLoading(false);
          setIsStale(false);
          setError(false);
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            payload: enhancedData
          }));
        }

      } catch (err) {
        console.error('Failed to fetch landslide data:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
          // If we had cached data, it's already in state and we keep it but with error/stale flag
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [records]);

  return { data, loading, error, isStale };
}
