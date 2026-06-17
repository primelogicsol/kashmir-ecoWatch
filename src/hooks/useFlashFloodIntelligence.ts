import { useState, useEffect, useCallback } from 'react';
import { FlashFloodRecord, RiskLevel } from '@/data/hazard-flash-floods';

export interface FlashFloodIntelligenceResult {
  data: FlashFloodRecord[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isStale: boolean;
  refresh: () => void;
}

const CACHE_KEY = 'kew_flash_flood_data';
const CACHE_EXPIRY_MS = 45 * 60 * 1000; // 45 minutes

interface CachedData {
  timestamp: number;
  data: FlashFloodRecord[];
}

export function useFlashFloodIntelligence(initialData: FlashFloodRecord[]): FlashFloodIntelligenceResult {
  const [data, setData] = useState<FlashFloodRecord[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  const fetchRealTimeData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      setIsStale(false);

      // Check cache first
      if (!force) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed: CachedData = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
              setData(parsed.data);
              setLastUpdated(new Date(parsed.timestamp).toISOString());
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error('Failed to parse cached data', e);
          }
        }
      }

      // If we need to fetch, we batch all coordinates
      // Open-Meteo allows up to 100 locations per batch request. We have ~40, so one request is fine.
      const lats = initialData.map(d => d.latitude.toFixed(4)).join(',');
      const lons = initialData.map(d => d.longitude.toFixed(4)).join(',');
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&hourly=precipitation,rain,showers,snowfall,temperature_2m&timezone=auto&forecast_days=2`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Open-Meteo API error: ${response.status}`);
      }

      const results = await response.json();
      
      // Results is an array of responses if multiple coordinates are passed.
      // Wait, Open-Meteo returns an array of JSON objects when batching?
      // Yes, if latitude and longitude are arrays, it returns an array of location objects.
      const isArrayResponse = Array.isArray(results);
      const responses = isArrayResponse ? results : [results];

      const now = new Date();
      
      const updatedData: FlashFloodRecord[] = initialData.map((record, index) => {
        const locationData = responses[index];
        if (!locationData || !locationData.hourly) {
          return record; // fallback
        }

        const hourly = locationData.hourly;
        
        // Find current hour index
        const currentHour = now.toISOString().slice(0, 13) + ':00';
        let currentIndex = hourly.time.findIndex((t: string) => t.startsWith(currentHour));
        if (currentIndex === -1) currentIndex = 0;

        // Next 24 hours
        const next24hPrecipitation = hourly.precipitation.slice(currentIndex, currentIndex + 24);
        const next24hTemp = hourly.temperature_2m.slice(currentIndex, currentIndex + 24);

        const latestHourlyRainfall = hourly.precipitation[currentIndex] || 0;
        const forecastRainfall24h = next24hPrecipitation.reduce((a: number, b: number) => a + (b || 0), 0);
        const peakHourlyIntensity = Math.max(...next24hPrecipitation);
        const maxTemp = Math.max(...next24hTemp);
        const minTemp = Math.min(...next24hTemp);

        let risk: RiskLevel = 'Low';
        let trigger = 'Stable Conditions';
        let trend: 'Rising' | 'Stable' | 'Falling' = 'Stable';

        if (peakHourlyIntensity > 20) {
          risk = 'Critical';
          trigger = 'Cloudburst Warning';
          trend = 'Rising';
        } else if (forecastRainfall24h > 30 || peakHourlyIntensity > 10) {
          risk = 'High';
          trigger = 'Heavy Rainfall';
          trend = 'Rising';
        } else if (forecastRainfall24h > 10) {
          risk = 'Moderate';
          trigger = 'Moderate Rainfall';
          trend = 'Stable';
        } else if (maxTemp > 15 && minTemp < 5 && (record.trigger_type === 'Rapid Snowmelt' || record.trigger_type === 'Glacial Melt')) {
          risk = 'Moderate';
          trigger = 'Snowmelt Risk';
          trend = 'Rising';
        } else {
          risk = 'Low';
          trigger = 'Low Rainfall';
          trend = latestHourlyRainfall > 0 ? 'Rising' : 'Falling';
        }

        return {
          ...record,
          latest_hourly_rainfall: latestHourlyRainfall,
          forecast_rainfall_24h: parseFloat(forecastRainfall24h.toFixed(1)),
          // We can use latest_hourly_rainfall to store peak hour if we want to show it in UI, but UI asked for "Live Peak Hourly Intensity".
          // Let's store peak hourly in latest_hourly_rainfall or add a new field.
          // Wait, interface has `latest_hourly_rainfall`.
          // We can just add `peak_hourly_intensity` loosely or reuse. Let's stick to requested interface but add it dynamically anyway.
          live_risk_level: risk,
          live_trend: trend,
          dominant_trigger: trigger,
          last_updated: now.toISOString(),
          // adding loosely typed field for UI since it's asked
          peak_hourly_intensity: peakHourlyIntensity
        } as FlashFloodRecord & { peak_hourly_intensity: number };
      });

      setData(updatedData);
      setLastUpdated(now.toISOString());
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: now.getTime(),
        data: updatedData
      }));

    } catch (err: any) {
      console.error('Flash Flood API Error:', err);
      setError(err.message || 'Failed to fetch real-time data');
      
      // Load stale cache if available
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed: CachedData = JSON.parse(cached);
          setData(parsed.data);
          setLastUpdated(new Date(parsed.timestamp).toISOString());
          setIsStale(true);
        } catch (e) {}
      }
    } finally {
      setLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    fetchRealTimeData();
  }, [fetchRealTimeData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    isStale,
    refresh: () => fetchRealTimeData(true)
  };
}
