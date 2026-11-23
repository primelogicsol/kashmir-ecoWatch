'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  WDCorridorLiveRecord,
  UpstreamLiveCheckpoint,
  SynopticWaveguideGridNode,
  DetectedWDSystem,
  OfficialAgencySource,
  HistoricalWDRecord,
  CompoundRiskLevel,
  WDSubRegion,
  WDSourceEnvelopes,
  OFFICIAL_WD_AGENCY_SOURCES,
  HISTORICAL_WD_RECORDS,
  WD_VERIFIED_DATA_SOURCES,
} from '@/data/hazard-western-disturbances';

export interface RegionalWDSummary {
  subRegion: WDSubRegion;
  administrativeUnit: string;
  corridorCount: number;
  reportingCount: number;
  activeOrApproachingCount: number | null;
  liveAvgTempC: number | null;
  liveAvgCloudPct: number | null;
  liveMeanFreezingLevelM: number | null;
  forecastMax7dPrecipMm: number | null;
  forecastMax7dSnowCm: number | null;
  floodRisk: CompoundRiskLevel;
  flashFloodRisk: CompoundRiskLevel;
  landslideRisk: CompoundRiskLevel;
  avalancheRisk: CompoundRiskLevel;
  overallRisk: CompoundRiskLevel;
}

export interface WDSynopticSummary {
  detectionStatus: 'OPERATIONAL' | 'UNAVAILABLE';
  headline: string;
  configuredCorridors: number;
  reportingCorridors: number;
  detectedSystemCount: number | null;
  activeRegionalSystemCount: number | null;
  activePassageCount: number | null;
  approachingWaveCount: number | null;
  upstreamActiveTroughs: number | null;
  maxJetCoreKmh: number | null;
  maxJetCoreValidTimeUtc: string | null;
  maxJetCoreSpatialExtent: string;
  maxJetCoreLocation: string | null;
  meanRegionalJet300Kmh: number | null;
  meanFreezingLevelM: number | null;
  peak7dPrecipMm: number | null;
  peak7dSnowCm: number | null;
  elevatedHazardCorridors: number;
  kashmir75E_z500Gpm: number | null;
  kashmir75E_vort300: number | null;
  compoundCoupling: {
    floods: CompoundRiskLevel;
    flashFloods: CompoundRiskLevel;
    landslides: CompoundRiskLevel;
    avalanches: CompoundRiskLevel;
  };
}

export interface WDMetaInfo {
  configuredCorridors: number;
  reportingCorridors: number;
  totalCorridors: number;
  synopticWaveguideNodes: number;
  provider: string;
  model: string;
  freshnessStatus: string;
  freshnessMinutes: number;
  provenanceDisclosure: string;
  modelRunInitUtc: string | null;
  validTimeUtc: string | null;
  updatedAt: string | null;
  dataIntegrity: {
    corridorsValidated: number;
    corridorsReporting: number;
    corridorsWithComplete168h: number;
    totalHourlyValuesChecked: number;
    expectedHourlyValues: number;
    completenessPct: number;
    unitValidationPassed: boolean;
  } | null;
}

export interface WesternDisturbancePayload {
  synopticSummary: WDSynopticSummary | null;
  detectedSystems: DetectedWDSystem[];
  waveguideDiagnostics: SynopticWaveguideGridNode[];
  upstreamTrack: UpstreamLiveCheckpoint[];
  regionalSummaries: RegionalWDSummary[];
  corridors: WDCorridorLiveRecord[];
  radarOverlay: {
    available: boolean;
    latestTileTemplate: string | null;
    observedAtUtc: string | null;
  };
  officialAdvisories: OfficialAgencySource[];
  historicalRecords: HistoricalWDRecord[];
  dataSources: typeof WD_VERIFIED_DATA_SOURCES;
  sourceEnvelopes: WDSourceEnvelopes | null;
  meta: WDMetaInfo | null;
  updatedAt: string | null;
}

const CACHE_KEY = 'kew_western_disturbances_cache_v3';
const CACHE_TTL_MS = 5 * 60 * 1000;

export function useWesternDisturbanceIntelligence() {
  const [state, setState] = useState<WesternDisturbancePayload>({
    synopticSummary: null,
    detectedSystems: [],
    waveguideDiagnostics: [],
    upstreamTrack: [],
    regionalSummaries: [],
    corridors: [],
    radarOverlay: { available: false, latestTileTemplate: null, observedAtUtc: null },
    officialAdvisories: OFFICIAL_WD_AGENCY_SOURCES,
    historicalRecords: HISTORICAL_WD_RECORDS,
    dataSources: WD_VERIFIED_DATA_SOURCES,
    sourceEnvelopes: null,
    meta: null,
    updatedAt: null,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTelemetry = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      if (!forceRefresh && typeof window !== 'undefined') {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed?.timestamp &&
            Date.now() - parsed.timestamp < CACHE_TTL_MS &&
            Array.isArray(parsed.payload?.corridors) &&
            parsed.payload?.synopticSummary?.detectionStatus
          ) {
            setState(parsed.payload);
            setError(null);
            setLoading(false);
            return;
          }
        }
      }

      const res = await fetch(
        forceRefresh
          ? '/api/hazard-intelligence/western-disturbances?refresh=1'
          : '/api/hazard-intelligence/western-disturbances',
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json?.success) throw new Error(json?.error || 'Upstream synoptic feed error');

      const nextPayload: WesternDisturbancePayload = {
        synopticSummary: json.synopticSummary || null,
        detectedSystems: json.detectedSystems || [],
        waveguideDiagnostics: json.waveguideDiagnostics || [],
        upstreamTrack: json.upstreamTrack || [],
        regionalSummaries: json.regionalSummaries || [],
        corridors: json.corridors || [],
        radarOverlay: json.radarOverlay || { available: false, latestTileTemplate: null, observedAtUtc: null },
        officialAdvisories: json.officialAdvisories || OFFICIAL_WD_AGENCY_SOURCES,
        historicalRecords: json.historicalRecords || HISTORICAL_WD_RECORDS,
        dataSources: json.dataSources || WD_VERIFIED_DATA_SOURCES,
        sourceEnvelopes: json.sourceEnvelopes || null,
        meta: json.meta || null,
        updatedAt: json.meta?.updatedAt || new Date().toISOString(),
      };

      setState(nextPayload);
      setError(null);

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), payload: nextPayload }));
      } catch {}
    } catch (err: any) {
      setError(err?.message || 'Unable to fetch Western Disturbance synoptic telemetry');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry(false);
  }, [fetchTelemetry]);

  return {
    ...state,
    loading,
    refreshing,
    error,
    refresh: () => fetchTelemetry(true),
  };
}
