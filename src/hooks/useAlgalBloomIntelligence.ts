import { useState, useEffect, useCallback } from 'react';
import { algalBloomLakes, AlgalBloomLake } from '@/data/algal-bloom-lakes';
import {
  MonitoredWaterbody,
  SatelliteObservation,
  SatelliteMonitoringStatus,
  InstitutionalWaterQualityRecord,
  LcmaStpEffluentRecord,
  LaboratoryCyanotoxinRecord,
  BloomEarlyWarningAlert,
  PredictiveBloomForecast,
  ForecastValidationStatus,
  getInitialAlgalBloomSnapshot,
} from '@/data/algal-bloom-intelligence-hub';

export type {
  MonitoredWaterbody,
  SatelliteObservation,
  SatelliteMonitoringStatus,
  InstitutionalWaterQualityRecord,
  LcmaStpEffluentRecord,
  LaboratoryCyanotoxinRecord,
  BloomEarlyWarningAlert,
  PredictiveBloomForecast,
  ForecastValidationStatus,
};

export interface AlgalBloomSummaryState {
  totalMonitoredWaterbodies: number;
  satelliteTrackedLakes: number;
  institutionalStations: number;
  activeOcemsStps: number;
  laboratoryAssays: number;
  activeBloomAlerts: number;
  lastSyncTime: string;
}

export interface AlgalBloomIntelligenceResult {
  waterbodies: MonitoredWaterbody[];
  lakesWithLiveData: AlgalBloomLake[]; // Backwards compatibility for existing UI components
  satelliteObservations: SatelliteObservation[];
  institutionalRecords: InstitutionalWaterQualityRecord[];
  lcmaStpRecords: LcmaStpEffluentRecord[];
  laboratoryToxinRecords: LaboratoryCyanotoxinRecord[];
  earlyWarningAlerts: BloomEarlyWarningAlert[];
  forecastModels: PredictiveBloomForecast[];
  summary: AlgalBloomSummaryState;
  loading: boolean;
  error: string | null;
  isStale: boolean;
  refresh: () => Promise<void>;
}

const CACHE_KEY = 'kew_algal_bloom_cache_v6';

export function useAlgalBloomIntelligence(): AlgalBloomIntelligenceResult {
  const initial = getInitialAlgalBloomSnapshot();

  const [waterbodies, setWaterbodies] = useState<MonitoredWaterbody[]>(initial.waterbodies);
  const [lakesWithLiveData, setLakesWithLiveData] = useState<AlgalBloomLake[]>(algalBloomLakes);
  const [satelliteObservations, setSatelliteObservations] = useState<SatelliteObservation[]>(initial.satelliteObservations);
  const [institutionalRecords, setInstitutionalRecords] = useState<InstitutionalWaterQualityRecord[]>(initial.institutionalRecords);
  const [lcmaStpRecords, setLcmaStpRecords] = useState<LcmaStpEffluentRecord[]>(initial.lcmaStpRecords);
  const [laboratoryToxinRecords, setLaboratoryToxinRecords] = useState<LaboratoryCyanotoxinRecord[]>(initial.laboratoryToxinRecords);
  const [earlyWarningAlerts, setEarlyWarningAlerts] = useState<BloomEarlyWarningAlert[]>(initial.earlyWarningAlerts);
  const [forecastModels, setForecastModels] = useState<PredictiveBloomForecast[]>(initial.forecastModels);
  const [summary, setSummary] = useState<AlgalBloomSummaryState>(initial.summary);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);

  const fetchBloomData = useCallback(async () => {
    try {
      setError(null);

      const res = await fetch('/api/hazard-intelligence/algal-blooms', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Algal Bloom API returned HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.success && json.waterbodies) {
        setWaterbodies(json.waterbodies);
        if (json.satelliteObservations) setSatelliteObservations(json.satelliteObservations);
        if (json.institutionalRecords) setInstitutionalRecords(json.institutionalRecords);
        if (json.lcmaStpRecords) setLcmaStpRecords(json.lcmaStpRecords);
        if (json.laboratoryToxinRecords) setLaboratoryToxinRecords(json.laboratoryToxinRecords);
        if (json.earlyWarningAlerts) setEarlyWarningAlerts(json.earlyWarningAlerts);
        if (json.forecastModels) setForecastModels(json.forecastModels);
        if (json.summary) setSummary(prev => ({ ...prev, ...json.summary }));

        // Map into legacy lakesWithLiveData for seamless backward compatibility
        const enrichedLegacy: AlgalBloomLake[] = algalBloomLakes.map(lake => {
          const match = json.waterbodies.find((w: MonitoredWaterbody) => w.id === lake.id || w.name === lake.name);
          if (!match) return lake;
          const liveRisk: 'Critical' | 'High' | 'Moderate' | 'Low' =
            match.currentBloomClassification === 'Laboratory-Confirmed Harmful Bloom'
              ? 'Critical'
              : match.currentBloomClassification === 'Probable Bloom'
              ? 'High'
              : match.currentBloomClassification === 'Possible Bloom Detected'
              ? 'Moderate'
              : 'Low';

          return {
            ...lake,
            live_temperature_max: match.liveMeteorology?.tempMaxC,
            live_precipitation_7d: match.liveMeteorology?.precip7dMm,
            live_wind_speed: match.liveMeteorology?.windSpeedKmH,
            live_bloom_risk: liveRisk,
            live_dominant_trigger: match.liveMeteorology?.stratificationState,
            sentinel2_ndci: match.satelliteObservation?.ndciIndex ?? 0.04,
            chlorophyll_a_ug_l: match.satelliteObservation?.chlorophyllAEstimateUgL ?? 4.2,
            last_updated: json.summary?.lastSyncTime,
          };
        });
        setLakesWithLiveData(enrichedLegacy);

        setIsStale(false);

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              waterbodies: json.waterbodies,
              satelliteObservations: json.satelliteObservations,
              institutionalRecords: json.institutionalRecords,
              lcmaStpRecords: json.lcmaStpRecords,
              laboratoryToxinRecords: json.laboratoryToxinRecords,
              earlyWarningAlerts: json.earlyWarningAlerts,
              forecastModels: json.forecastModels,
              summary: json.summary,
            })
          );
        } catch {}
      }
    } catch (err: any) {
      console.warn('[Algal Bloom Hook] Live fetch failed, trying cached snapshot:', err);
      try {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          if (cached.waterbodies) setWaterbodies(cached.waterbodies);
          if (cached.satelliteObservations) setSatelliteObservations(cached.satelliteObservations);
          if (cached.institutionalRecords) setInstitutionalRecords(cached.institutionalRecords);
          if (cached.lcmaStpRecords) setLcmaStpRecords(cached.lcmaStpRecords);
          if (cached.laboratoryToxinRecords) setLaboratoryToxinRecords(cached.laboratoryToxinRecords);
          if (cached.earlyWarningAlerts) setEarlyWarningAlerts(cached.earlyWarningAlerts);
          if (cached.forecastModels) setForecastModels(cached.forecastModels);
          if (cached.summary) setSummary(prev => ({ ...prev, ...cached.summary }));
        }
      } catch {}
      setIsStale(true);
    }
  }, []);

  useEffect(() => {
    fetchBloomData();
  }, [fetchBloomData]);

  return {
    waterbodies,
    lakesWithLiveData,
    satelliteObservations,
    institutionalRecords,
    lcmaStpRecords,
    laboratoryToxinRecords,
    earlyWarningAlerts,
    forecastModels,
    summary,
    loading,
    error,
    isStale,
    refresh: fetchBloomData,
  };
}
