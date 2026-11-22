import { useState, useEffect, useCallback } from 'react';
import { GLOFRecord } from '@/data/hazard-glofs';

export interface OfficialAlert {
  title: string;
  pubDate: string;
  link: string;
  district?: string;
  severity?: string;
}

export interface GlofIntelligenceState {
  data: GLOFRecord[];
  officialAlertsCount: number;
  officialAlerts: OfficialAlert[];
  sachetStatus: 'Connected' | 'Unreachable';
  loading: boolean;
  isStale: boolean;
  refresh: () => void;
}

export function useGlofIntelligence(initialRecords: GLOFRecord[]): GlofIntelligenceState {
  const [data, setData] = useState<GLOFRecord[]>(initialRecords);
  const [officialAlertsCount, setOfficialAlertsCount] = useState<number>(0);
  const [officialAlerts, setOfficialAlerts] = useState<OfficialAlert[]>([]);
  const [sachetStatus, setSachetStatus] = useState<'Connected' | 'Unreachable'>('Connected');
  const [loading, setLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);

  const CACHE_KEY = 'kew_glof_cache_v2';
  const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes

  const fetchGlofData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setIsStale(false);

      if (!force && typeof window !== 'undefined') {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          try {
            const cached = JSON.parse(cachedStr);
            if (Date.now() - cached.timestamp < CACHE_DURATION) {
              setData(cached.data);
              setOfficialAlertsCount(cached.officialAlertsCount || 0);
              setOfficialAlerts(cached.officialAlerts || []);
              setSachetStatus(cached.sachetStatus || 'Connected');
              setLoading(false);
              return;
            }
          } catch (e) {}
        }
      }

      const res = await fetch('/api/hazard-intelligence/glofs', {
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!res.ok) throw new Error('Failed to fetch from GLOF API');
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setData(json.data);
        setOfficialAlertsCount(json.official_alerts_count || 0);
        setOfficialAlerts(json.official_alerts || []);
        setSachetStatus(json.sachet_feed_status || 'Connected');

        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: json.data,
            officialAlertsCount: json.official_alerts_count || 0,
            officialAlerts: json.official_alerts || [],
            sachetStatus: json.sachet_feed_status || 'Connected'
          }));
        }
      } else {
        throw new Error('Invalid GLOF API payload');
      }

    } catch (err) {
      console.error('GLOF API Error:', err);
      if (typeof window !== 'undefined') {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          try {
            const cached = JSON.parse(cachedStr);
            setData(cached.data);
            setOfficialAlertsCount(cached.officialAlertsCount || 0);
            setOfficialAlerts(cached.officialAlerts || []);
            setSachetStatus(cached.sachetStatus || 'Connected');
            setIsStale(true);
          } catch (e) {}
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGlofData();
  }, [fetchGlofData]);

  return {
    data,
    officialAlertsCount,
    officialAlerts,
    sachetStatus,
    loading,
    isStale,
    refresh: () => fetchGlofData(true)
  };
}
