import { useState, useEffect, useCallback } from 'react';
import {
  LandslideRecord,
  RoadCorridor,
  OfficialBulletin,
  LandslideScope,
  SlideType,
  SusceptibilityRating,
  NowcastHazardLevel,
  LandslideTrigger,
  LandslideVerification,
  OfficialWarningStatus,
  GeologicalVerificationStatus,
  getInitialLandslideSnapshot,
} from '@/data/hazard-landslides';

export type {
  LandslideRecord,
  RoadCorridor,
  OfficialBulletin,
  LandslideScope,
  SlideType,
  SusceptibilityRating,
  NowcastHazardLevel,
  LandslideTrigger,
  LandslideVerification,
  OfficialWarningStatus,
  GeologicalVerificationStatus,
};

export type EnhancedLandslideRecord = LandslideRecord;

const CACHE_KEY = 'landslide_intelligence_v4';
const CACHE_EXPIRATION = 3 * 60 * 1000; // 3 minutes

export interface LandslideSummaryState {
  totalMonitoredZones: number;
  activeCorridorsCount: number;
  officialWarningsCount: number;
  highSusceptibilityCount: number;
  highNowcastCount: number;
  criticalCorridorAlerts: number;
  lastTelemetrySync: string;
}

export function useLandslideIntelligence() {
  const initial = getInitialLandslideSnapshot();

  const [records, setRecords] = useState<LandslideRecord[]>(initial.records);
  const [roadCorridors, setRoadCorridors] = useState<RoadCorridor[]>(initial.roadCorridors);
  const [officialBulletins, setOfficialBulletins] = useState<OfficialBulletin[]>(initial.officialBulletins);
  const [summary, setSummary] = useState<LandslideSummaryState>({
    ...initial.summary,
    highNowcastCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isStale, setIsStale] = useState<boolean>(false);

  const fetchIntelligence = useCallback(async () => {
    try {
      const res = await fetch('/api/hazard-intelligence/landslides', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Landslides API returned HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.success && json.records) {
        setRecords(json.records);
        if (json.roadCorridors) setRoadCorridors(json.roadCorridors);
        if (json.officialBulletins) setOfficialBulletins(json.officialBulletins);
        if (json.summary) {
          setSummary(prev => ({
            ...prev,
            ...json.summary,
          }));
        }
        setIsStale(false);
        setError(false);

        // Cache in localStorage for resilience
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              records: json.records,
              roadCorridors: json.roadCorridors,
              officialBulletins: json.officialBulletins,
              summary: json.summary,
            })
          );
        } catch {
          // Ignore localStorage errors in private windows
        }
        return;
      }
      throw new Error('Invalid JSON payload');
    } catch (err) {
      console.warn('[Landslides Hook] Live sync failed, checking cache or fallback:', err);
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 30 * 60 * 1000 && parsed.records?.length) {
            setRecords(parsed.records);
            if (parsed.roadCorridors) setRoadCorridors(parsed.roadCorridors);
            if (parsed.officialBulletins) setOfficialBulletins(parsed.officialBulletins);
            if (parsed.summary) setSummary(prev => ({ ...prev, ...parsed.summary }));
            setIsStale(true);
            return;
          }
        }
      } catch {
        // Fall through
      }
      setIsStale(true);
      setError(false);
    }
  }, []);

  useEffect(() => {
    // Attempt live fetch on mount
    fetchIntelligence();
  }, [fetchIntelligence]);

  return {
    data: records, // backwards compatibility
    records,
    roadCorridors,
    officialBulletins,
    summary,
    loading,
    error,
    isStale,
    refresh: fetchIntelligence,
  };
}
