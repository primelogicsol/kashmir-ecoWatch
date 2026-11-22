import { useState, useEffect, useCallback } from 'react';
import { FlashFloodRecord } from '@/data/hazard-flash-floods';

export interface OfficialAlert {
  title: string;
  pubDate: string;
  link: string;
  district?: string;
  severity?: string;
}

export interface FlashFloodIntelligenceResult {
  data: FlashFloodRecord[];
  officialAlertsCount: number;
  officialAlerts: OfficialAlert[];
  sachetStatus: 'Connected' | 'Unreachable';
  forecastSource: string;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  isStale: boolean;
  refresh: () => void;
}

const CACHE_KEY = 'kew_flash_flood_data_v2';
const CACHE_EXPIRY_MS = 3 * 60 * 1000; // 3 minutes cache for live hazard accuracy

interface CachedData {
  timestamp: number;
  data: FlashFloodRecord[];
  officialAlertsCount: number;
  officialAlerts: OfficialAlert[];
  sachetStatus: 'Connected' | 'Unreachable';
  forecastSource: string;
}

export function useFlashFloodIntelligence(initialData: FlashFloodRecord[]): FlashFloodIntelligenceResult {
  const [data, setData] = useState<FlashFloodRecord[]>(initialData);
  const [officialAlertsCount, setOfficialAlertsCount] = useState<number>(0);
  const [officialAlerts, setOfficialAlerts] = useState<OfficialAlert[]>([]);
  const [sachetStatus, setSachetStatus] = useState<'Connected' | 'Unreachable'>('Connected');
  const [forecastSource, setForecastSource] = useState<string>('Open-Meteo High-Resolution NWP');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);

  const fetchRealTimeData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      setIsStale(false);

      // Check cache first if not forced
      if (!force && typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed: CachedData = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
              setData(parsed.data);
              setOfficialAlertsCount(parsed.officialAlertsCount || 0);
              setOfficialAlerts(parsed.officialAlerts || []);
              setSachetStatus(parsed.sachetStatus || 'Connected');
              setForecastSource(parsed.forecastSource || 'Open-Meteo High-Resolution NWP');
              setLastUpdated(new Date(parsed.timestamp).toISOString());
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error('Failed to parse cached flash flood data', e);
          }
        }
      }

      // Query internal verified backend API
      const response = await fetch('/api/hazard-intelligence/flash-floods', {
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!response.ok) {
        throw new Error(`Flash Flood Intelligence API responded with status ${response.status}`);
      }

      const json = await response.json();

      if (json.success && Array.isArray(json.data)) {
        setData(json.data);
        setOfficialAlertsCount(json.official_alerts_count || 0);
        setOfficialAlerts(json.official_alerts || []);
        setSachetStatus(json.sachet_feed_status || 'Connected');
        setForecastSource(json.forecast_source || 'Open-Meteo ECMWF/GFS High-Resolution NWP');
        setLastUpdated(json.timestamp || new Date().toISOString());

        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: json.data,
            officialAlertsCount: json.official_alerts_count || 0,
            officialAlerts: json.official_alerts || [],
            sachetStatus: json.sachet_feed_status || 'Connected',
            forecastSource: json.forecast_source || 'Open-Meteo ECMWF/GFS High-Resolution NWP'
          }));
        }
      } else {
        throw new Error('Malformed payload returned from flash-floods route');
      }

    } catch (err: any) {
      console.error('Flash Flood API Ingestion Error:', err);
      setError(err.message || 'Failed to fetch verified real-time hazard data');

      // Attempt to read stale cache if network failed
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed: CachedData = JSON.parse(cached);
            setData(parsed.data);
            setOfficialAlertsCount(parsed.officialAlertsCount || 0);
            setOfficialAlerts(parsed.officialAlerts || []);
            setSachetStatus(parsed.sachetStatus || 'Connected');
            setLastUpdated(new Date(parsed.timestamp).toISOString());
            setIsStale(true);
          } catch (e) {}
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealTimeData();
  }, [fetchRealTimeData]);

  return {
    data,
    officialAlertsCount,
    officialAlerts,
    sachetStatus,
    forecastSource,
    loading,
    error,
    lastUpdated,
    isStale,
    refresh: () => fetchRealTimeData(true)
  };
}
