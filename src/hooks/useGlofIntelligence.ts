import { useState, useEffect } from 'react';
import { GLOFRecord } from '@/data/hazard-glofs';

export interface GlofIntelligenceState {
  data: GLOFRecord[];
  loading: boolean;
  isStale: boolean;
}

export function useGlofIntelligence(initialRecords: GLOFRecord[]): GlofIntelligenceState {
  const [state, setState] = useState<GlofIntelligenceState>({
    data: initialRecords,
    loading: true,
    isStale: false,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchMeteoData() {
      try {
        const CACHE_KEY = 'glof_meteo_cache_v1';
        const CACHE_DURATION = 45 * 60 * 1000; // 45 minutes

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            if (mounted) {
              setState({ data, loading: false, isStale: false });
            }
            return;
          }
        }

        const validRecords = initialRecords.filter(r => r.latitude !== undefined && r.longitude !== undefined);
        if (validRecords.length === 0) {
          if (mounted) setState({ data: initialRecords, loading: false, isStale: true });
          return;
        }

        const lats = validRecords.map(r => r.latitude).join(',');
        const lons = validRecords.map(r => r.longitude).join(',');

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&timezone=auto`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch from Open Meteo');

        const result = await response.json();
        const locationsData = validRecords.length === 1 ? [result] : result;

        const updatedRecords = initialRecords.map((record) => {
          if (record.latitude === undefined || record.longitude === undefined) return record;

          const idx = validRecords.findIndex(r => r.id === record.id);
          const meteo = locationsData[idx];

          if (!meteo || !meteo.daily) return record;

          const maxTemps = meteo.daily.temperature_2m_max || [];
          const minTemps = meteo.daily.temperature_2m_min || [];
          const precip = meteo.daily.precipitation_sum || [];
          
          const live_temperature_max = Math.max(...maxTemps);
          const live_precipitation_7d = precip.reduce((a: number, b: number) => a + b, 0);

          let live_risk_level = 'Low';
          let dominant_trigger = 'None';

          const maxTemp = live_temperature_max;
          const minTemp = Math.min(...minTemps);
          const avgPrecip = live_precipitation_7d;

          // Critical: Extreme sustained heat AND heavy rainfall directly over the glacial lake (high risk of dam failure).
          if (maxTemp > 20 && avgPrecip > 50) {
            live_risk_level = 'Critical';
            dominant_trigger = 'Extreme Heat + Heavy Rain';
          } 
          // High: Severe heatwave at altitude (temps >15°C) OR heavy rain-on-snow event.
          else if (maxTemp > 15 || (maxTemp > 5 && avgPrecip > 30)) {
            live_risk_level = 'High';
            dominant_trigger = maxTemp > 15 ? 'Severe Heatwave' : 'Rain-on-Snow';
          }
          // Moderate: Sustained temps >0°C for multiple days OR moderate rainfall.
          else if (maxTemp > 0 || avgPrecip > 10) {
            live_risk_level = 'Moderate';
            dominant_trigger = maxTemp > 0 ? 'Sustained Positive Temps' : 'Moderate Rainfall';
          }
          // Low: Sub-zero temps at night, no heavy rain.
          else {
            live_risk_level = 'Low';
            dominant_trigger = 'Stable / Sub-zero Temps';
          }

          return {
            ...record,
            live_temperature_max,
            live_precipitation_7d,
            live_risk_level,
            dominant_trigger,
            last_updated: new Date().toISOString(),
          };
        });

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: updatedRecords,
        }));

        if (mounted) {
          setState({ data: updatedRecords, loading: false, isStale: false });
        }
      } catch (error) {
        console.error('GLOF API Error:', error);
        // Load from cache if possible, but mark as stale
        const CACHE_KEY = 'glof_meteo_cache_v1';
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached && mounted) {
          setState({ data: JSON.parse(cached).data, loading: false, isStale: true });
        } else if (mounted) {
          setState({ data: initialRecords, loading: false, isStale: true });
        }
      }
    }

    fetchMeteoData();

    return () => {
      mounted = false;
    };
  }, [initialRecords]);

  return state;
}
