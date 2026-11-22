import { useState, useEffect, useCallback } from 'react';
import { AvalancheRecord } from '@/data/hazard-avalanches';

export interface OfficialAlert {
  title: string;
  pubDate: string;
  link: string;
  district?: string;
  severity?: string;
}

export interface GulmargReport {
  title: string;
  pubDate: string;
  link: string;
}

export interface AvalancheIntelligenceResult {
  data: AvalancheRecord[];
  officialAlertsCount: number;
  officialAlerts: OfficialAlert[];
  gulmargReport: GulmargReport | null;
  sachetStatus: 'Connected' | 'Unreachable';
  gulmargStatus: 'Connected' | 'Unreachable';
  vpsDiskUsageBytes: number;
  loading: boolean;
  error: string | null;
  isStale: boolean;
  lastUpdated: string | null;
  refresh: () => void;
}

// Client-side cache key (0 bytes on VPS disk)
const CACHE_KEY = 'kew_avalanche_cache_v3';
const CACHE_DURATION_MS = 3 * 60 * 1000; // 3 minutes

interface CachedPayload {
  timestamp: number;
  data: AvalancheRecord[];
  officialAlertsCount: number;
  officialAlerts: OfficialAlert[];
  gulmargReport: GulmargReport | null;
  sachetStatus: 'Connected' | 'Unreachable';
  gulmargStatus: 'Connected' | 'Unreachable';
}

export function useAvalancheIntelligence(initialData: AvalancheRecord[]): AvalancheIntelligenceResult {
  const [data, setData] = useState<AvalancheRecord[]>(initialData);
  const [officialAlertsCount, setOfficialAlertsCount] = useState<number>(0);
  const [officialAlerts, setOfficialAlerts] = useState<OfficialAlert[]>([]);
  const [gulmargReport, setGulmargReport] = useState<GulmargReport | null>(null);
  const [sachetStatus, setSachetStatus] = useState<'Connected' | 'Unreachable'>('Connected');
  const [gulmargStatus, setGulmargStatus] = useState<'Connected' | 'Unreachable'>('Connected');
  const [vpsDiskUsageBytes] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchLiveData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      setIsStale(false);

      // Check client cache if not forced
      if (!force && typeof window !== 'undefined') {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          try {
            const cached: CachedPayload = JSON.parse(cachedStr);
            if (Date.now() - cached.timestamp < CACHE_DURATION_MS) {
              setData(cached.data);
              setOfficialAlertsCount(cached.officialAlertsCount || 0);
              setOfficialAlerts(cached.officialAlerts || []);
              setGulmargReport(cached.gulmargReport || null);
              setSachetStatus(cached.sachetStatus || 'Connected');
              setGulmargStatus(cached.gulmargStatus || 'Connected');
              setLastUpdated(new Date(cached.timestamp).toISOString());
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error('Error parsing client avalanche cache:', e);
          }
        }
      }

      // Query internal verified backend API
      const response = await fetch('/api/hazard-intelligence/avalanches', {
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!response.ok) {
        throw new Error(`Avalanche Intelligence API responded with status ${response.status}`);
      }

      const json = await response.json();

      if (json.success && Array.isArray(json.data)) {
        setData(json.data);
        setOfficialAlertsCount(json.official_alerts_count || 0);
        setOfficialAlerts(json.official_alerts || []);
        setGulmargReport(json.gulmarg_ac_latest || null);
        setSachetStatus(json.sachet_feed_status || 'Connected');
        setGulmargStatus(json.gulmarg_feed_status || 'Connected');
        setLastUpdated(json.timestamp || new Date().toISOString());

        if (typeof window !== 'undefined') {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: json.data,
            officialAlertsCount: json.official_alerts_count || 0,
            officialAlerts: json.official_alerts || [],
            gulmargReport: json.gulmarg_ac_latest || null,
            sachetStatus: json.sachet_feed_status || 'Connected',
            gulmargStatus: json.gulmarg_feed_status || 'Connected'
          }));
        }
      } else {
        throw new Error('Malformed payload returned from avalanches route');
      }

    } catch (err: any) {
      console.error('Avalanche API Ingestion Error:', err);
      setError(err.message || 'Failed to fetch verified real-time avalanche hazard data');

      if (typeof window !== 'undefined') {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          try {
            const cached: CachedPayload = JSON.parse(cachedStr);
            setData(cached.data);
            setOfficialAlertsCount(cached.officialAlertsCount || 0);
            setOfficialAlerts(cached.officialAlerts || []);
            setGulmargReport(cached.gulmargReport || null);
            setSachetStatus(cached.sachetStatus || 'Connected');
            setGulmargStatus(cached.gulmargStatus || 'Connected');
            setLastUpdated(new Date(cached.timestamp).toISOString());
            setIsStale(true);
          } catch (e) {}
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();
  }, [fetchLiveData]);

  return {
    data,
    officialAlertsCount,
    officialAlerts,
    gulmargReport,
    sachetStatus,
    gulmargStatus,
    vpsDiskUsageBytes,
    loading,
    error,
    isStale,
    lastUpdated,
    refresh: () => fetchLiveData(true)
  };
}
