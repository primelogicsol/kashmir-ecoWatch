import { useState, useEffect, useCallback } from 'react';
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

export interface OfficialAlert {
  title: string;
  pubDate: string;
  link: string;
  district?: string;
  severity?: string;
}

export function useForestFireIntelligence(registry: ForestFireRecord[]) {
  const [data, setData] = useState<ForestFireRecord[]>(registry);
  const [liveData, setLiveData] = useState<LiveFireDataMap | null>(null);
  const [officialAlertsCount, setOfficialAlertsCount] = useState<number>(0);
  const [officialAlerts, setOfficialAlerts] = useState<OfficialAlert[]>([]);
  const [sachetStatus, setSachetStatus] = useState<'Connected' | 'Unreachable'>('Connected');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isStale, setIsStale] = useState(false);

  const CACHE_KEY = 'kew_forest_fire_cache_v2';
  const CACHE_TIME = 3 * 60 * 1000; // 3 minutes

  const fetchFireData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(false);
      setIsStale(false);

      if (!force && typeof window !== 'undefined') {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          try {
            const cached = JSON.parse(cachedStr);
            if (Date.now() - cached.timestamp < CACHE_TIME) {
              setData(cached.data);
              setLiveData(cached.liveData);
              setOfficialAlertsCount(cached.officialAlertsCount || 0);
              setOfficialAlerts(cached.officialAlerts || []);
              setSachetStatus(cached.sachetStatus || 'Connected');
              setLoading(false);
              return;
            }
          } catch (e) {}
        }
      }

      const res = await fetch('/api/hazard-intelligence/forest-fires', {
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!res.ok) throw new Error('API failed');
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setData(json.data);
        setOfficialAlertsCount(json.official_alerts_count || 0);
        setOfficialAlerts(json.official_alerts || []);
        setSachetStatus(json.sachet_feed_status || 'Connected');

        const newMap: LiveFireDataMap = {};
        json.data.forEach((r: ForestFireRecord) => {
          newMap[r.id] = {
            live_temperature: r.live_temperature ?? 18,
            live_humidity: r.live_humidity ?? 50,
            live_wind_speed: r.live_wind_speed ?? 10,
            live_soil_moisture: r.live_soil_moisture ?? 0.3,
            live_risk_level: r.live_risk_level ?? 'Low',
            dominant_trigger: r.dominant_trigger ?? 'Normal',
            last_updated: r.last_updated ?? new Date().toISOString()
          };
        });

        setLiveData(newMap);

        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: json.data,
            liveData: newMap,
            officialAlertsCount: json.official_alerts_count || 0,
            officialAlerts: json.official_alerts || [],
            sachetStatus: json.sachet_feed_status || 'Connected'
          }));
        }
      } else {
        throw new Error('Invalid JSON payload');
      }

    } catch (e) {
      console.error('Forest fire hook fetch error:', e);
      if (typeof window !== 'undefined') {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          try {
            const cached = JSON.parse(cachedStr);
            setData(cached.data);
            setLiveData(cached.liveData);
            setOfficialAlertsCount(cached.officialAlertsCount || 0);
            setOfficialAlerts(cached.officialAlerts || []);
            setSachetStatus(cached.sachetStatus || 'Connected');
            setIsStale(true);
          } catch (err) {}
        } else {
          setError(true);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFireData();
  }, [fetchFireData]);

  return {
    data,
    liveData,
    officialAlertsCount,
    officialAlerts,
    sachetStatus,
    loading,
    error,
    isStale,
    refresh: () => fetchFireData(true)
  };
}
