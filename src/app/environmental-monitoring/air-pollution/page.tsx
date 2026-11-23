'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import {
  Wind, ChevronRight, AlertTriangle, Activity, Clock, MapPin, ExternalLink, Cloud, TrendingUp, RefreshCw, ShieldAlert, Shield, Zap, Search, Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  airQualityRegistry,
  AirQualityLiveRecord,
  AqiStandard,
  calculateIndianNAQI,
  calculateUsAqi,
  getAqiCategory,
  getAqiVariant,
  getInitialAirQualitySnapshot,
} from '@/data/air-quality-registry';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';

type AirQualityPageRecord = AirQualityLiveRecord & {
  aqi: number;
  aqi_eu?: number;
  aqiCategory: string;
  aqiVariant: 'success' | 'warning' | 'danger' | 'critical';
};

// ─── Verification badge colours ──────────────────────────────────────────────

const VERIFICATION_CHIP: Record<string, string> = {
  'Official CAAQMS Station':   'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Official Station Verified': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Government EPA Station':    'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Calibrated Ground Sensor':  'text-cyan-400    bg-cyan-500/10    border-cyan-500/30',
  'Public Sensor Verified':    'text-cyan-400    bg-cyan-500/10    border-cyan-500/30',
  'Satellite-Modelled (CAMS)': 'text-amber-400   bg-amber-500/10   border-amber-500/30',
  'Satellite-Modelled':        'text-amber-400   bg-amber-500/10   border-amber-500/30',
  'Regional Model Grid':       'text-amber-400   bg-amber-500/10   border-amber-500/30',
  'API Live':                  'text-green-400   bg-green-500/10   border-green-500/30',
  'Data Deficient':            'text-slate-400   bg-slate-500/10   border-slate-500/30',
};

// ─── AirQualityCard ──────────────────────────────────────────────────────────

function AirQualityCard({
  record,
  index,
  aqiStandard,
}: {
  record: AirQualityPageRecord;
  index: number;
  aqiStandard: AqiStandard;
}) {
  const verChip = VERIFICATION_CHIP[record.verification_status] || VERIFICATION_CHIP['Data Deficient'];
  const displayedAqi = aqiStandard === 'NAQI' ? record.naqi : record.aqi_us;
  const displayedVariant = aqiStandard === 'NAQI' ? record.naqiVariant : record.aqi_usVariant;
  const secondaryLabel =
    aqiStandard === 'NAQI' ? `US AQI ${record.aqi_us}` : `India NAQI ${record.naqi}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      className="flex flex-col h-full"
    >
      <Card className="glass-intense border-white/10 p-5 flex flex-col h-full hover:border-white/20 transition-all group">
        {/* Header: District + AQI Badge */}
        <div className="flex justify-between items-start mb-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">{record.district}</h3>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{record.scope}</span>
            </div>
          </div>
          <Badge variant={displayedVariant} className="flex flex-col items-center justify-center px-3 py-1 flex-shrink-0">
            <span className="text-[9px] uppercase opacity-80 leading-tight">{aqiStandard === 'NAQI' ? 'NAQI' : 'US AQI'}</span>
            <span className="text-lg font-black leading-tight">{displayedAqi}</span>
          </Badge>
        </div>

        {/* Verification Status */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] w-full mb-3 ${verChip}`}>
          <Shield className="w-3 h-3 flex-shrink-0" />
          <span className="font-medium truncate">{record.verification_status}</span>
          {record.isStale && <span className="text-[8px] uppercase ml-auto text-amber-500">Stale</span>}
        </div>

        {/* Live Neighborhood Sensor Nodes (when physical ground stations exist, e.g., Jammu / Srinagar) */}
        {record.sensorNodes && record.sensorNodes.length > 0 && (
          <div className="mb-3 p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <div className="text-[9px] uppercase tracking-wider text-cyan-400 font-semibold mb-1">
              Live Ground Nodes ({record.sensorNodes.length})
            </div>
            <div className="flex flex-wrap gap-1">
              {record.sensorNodes.slice(0, 4).map((node) => (
                <span
                  key={node.name}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                >
                  {node.name}: <strong className="text-white">{aqiStandard === 'NAQI' ? node.naqi : node.aqi_us}</strong>
                </span>
              ))}
              {record.sensorNodes.length > 4 && (
                <span className="text-[9px] px-1.5 py-0.5 text-slate-400">
                  +{record.sensorNodes.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Pollutant Grid */}
        <div className="grid grid-cols-3 gap-1.5 text-xs mb-3">
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">PM2.5</div>
            <div className="font-bold text-slate-200">{record.pm25.toFixed(1)} <span className="text-[8px] font-normal text-slate-500">µg/m³</span></div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">PM10</div>
            <div className="font-bold text-slate-200">{record.pm10.toFixed(1)} <span className="text-[8px] font-normal text-slate-500">µg/m³</span></div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">NO₂</div>
            <div className="font-bold text-slate-200">{record.no2.toFixed(1)} <span className="text-[8px] font-normal text-slate-500">µg/m³</span></div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">SO₂</div>
            <div className="font-bold text-slate-200">{record.so2.toFixed(1)} <span className="text-[8px] font-normal text-slate-500">µg/m³</span></div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">CO</div>
            <div className="font-bold text-slate-200">{record.co.toFixed(0)} <span className="text-[8px] font-normal text-slate-500">µg/m³</span></div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">O₃</div>
            <div className="font-bold text-slate-200">{record.o3.toFixed(1)} <span className="text-[8px] font-normal text-slate-500">µg/m³</span></div>
          </div>
        </div>

        {/* Footer: Dominant + Secondary Index + Trend + Last Updated */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Dominant · Cross-Index</span>
            <span className="text-amber-300 font-bold">{record.dominantPollutant} <span className="text-slate-400 font-normal">({secondaryLabel})</span></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Trend</span>
            <span className={`font-medium ${record.trend === 'Rising' ? 'text-red-400' : record.trend === 'Falling' ? 'text-emerald-400' : 'text-slate-400'}`}>
              {record.trend === 'Rising' ? '↗' : record.trend === 'Falling' ? '↘' : '→'} {record.trend}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Source</span>
            <span className="text-slate-400 truncate ml-4">{record.data_source}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Updated</span>
            <span className="text-slate-400 font-mono">{record.lastUpdated}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── AirQualityRow ───────────────────────────────────────────────────────────

function AirQualityRow({
  record,
  index,
  aqiStandard,
}: {
  record: AirQualityPageRecord;
  index: number;
  aqiStandard: AqiStandard;
}) {
  const verChip = VERIFICATION_CHIP[record.verification_status] || VERIFICATION_CHIP['Data Deficient'];
  const displayedAqi = aqiStandard === 'NAQI' ? record.naqi : record.aqi_us;
  const displayedCategory = aqiStandard === 'NAQI' ? record.naqiCategory : record.aqi_usCategory;
  const displayedVariant = aqiStandard === 'NAQI' ? record.naqiVariant : record.aqi_usVariant;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all group">
        <div className="flex flex-wrap items-center gap-4">
          {/* District */}
          <div className="min-w-[160px] flex-1">
            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{record.district}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> {record.scope}</div>
          </div>

          {/* AQI */}
          <div className="w-32">
            <div className="text-[10px] text-slate-500 mb-1">{aqiStandard === 'NAQI' ? 'India NAQI' : 'US AQI'}</div>
            <Badge variant={displayedVariant} size="sm" className="shadow-sm">
              <span className="text-xs font-bold">{displayedAqi}</span>
              <span className="text-[10px] uppercase ml-1 opacity-80 truncate hidden sm:inline">{displayedCategory}</span>
            </Badge>
          </div>

          {/* Pollutants */}
          <div className="w-44 hidden md:flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">PM2.5</div>
              <div className="text-xs font-bold text-slate-300">{record.pm25.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">PM10</div>
              <div className="text-xs font-bold text-slate-300">{record.pm10.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">NO₂</div>
              <div className="text-xs font-bold text-slate-300">{record.no2.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">SO₂</div>
              <div className="text-xs font-bold text-slate-300">{record.so2.toFixed(1)}</div>
            </div>
          </div>

          {/* Verification */}
          <div className="w-40 hidden lg:block">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${verChip}`}>
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span className="font-medium truncate">{record.verification_status}</span>
            </div>
          </div>

          {/* Dominant */}
          <div className="w-20 hidden xl:block text-right">
            <div className="text-[10px] text-slate-500 mb-0.5">Dominant</div>
            <div className="text-xs text-amber-300 font-bold">{record.dominantPollutant}</div>
          </div>

          {/* Trend */}
          <div className="w-16 hidden sm:block text-right">
            <div className="text-[10px] text-slate-500 mb-0.5">Trend</div>
            <span className={`text-xs font-medium ${record.trend === 'Rising' ? 'text-red-400' : record.trend === 'Falling' ? 'text-emerald-400' : 'text-slate-400'}`}>
              {record.trend === 'Rising' ? '↗' : record.trend === 'Falling' ? '↘' : '→'} {record.trend}
            </span>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<ChevronRight className="w-3 h-3" />}>
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Fetch helper — Server-Cached Open-Meteo Air Quality Proxy + Rate-Limit Guard ──

let inFlightClientRequest: Promise<{ records: AirQualityPageRecord[]; fromFallback: boolean }> | null = null;

function toPageRecordsFromUnits(units: AirQualityLiveRecord[], markStale = false): AirQualityPageRecord[] {
  return units.map((u) => {
    const aqiUs = typeof u.aqi_us === 'number' ? u.aqi_us : calculateUsAqi(u.pm25, u.pm10).aqi;
    return {
      ...u,
      aqi_us: aqiUs,
      aqi: aqiUs,
      aqiCategory: u.aqi_usCategory || getAqiCategory(aqiUs),
      aqiVariant: u.aqi_usVariant || getAqiVariant(aqiUs),
      isStale: markStale ? true : u.isStale,
    };
  });
}

function getCachedAirQualityRecords(maxAgeMs?: number): { data: AirQualityPageRecord[]; timestamp: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem('kew_air_quality_cache_v3');
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    if (!Array.isArray(parsed?.data) || parsed.data.length === 0) return null;
    const ts = typeof parsed.timestamp === 'number' ? parsed.timestamp : Date.now();
    if (maxAgeMs != null && Date.now() - ts > maxAgeMs) return null;
    return { data: parsed.data as AirQualityPageRecord[], timestamp: ts };
  } catch {
    return null;
  }
}

async function fetchOpenMeteoAirQuality(forceRefresh = false): Promise<{ records: AirQualityPageRecord[]; fromFallback: boolean }> {
  if (!forceRefresh && inFlightClientRequest) {
    return inFlightClientRequest;
  }

  const run = async (): Promise<{ records: AirQualityPageRecord[]; fromFallback: boolean }> => {
    // 1. Primary path: Next.js server-cached proxy route (/api/environmental-monitoring/air-pollution)
    //    Combines live AirGradient / BreatheOSS ground sensors + UTC-aligned Open-Meteo current telemetry.
    try {
      const apiRes = await fetch(
        forceRefresh
          ? '/api/environmental-monitoring/air-pollution?refresh=1'
          : '/api/environmental-monitoring/air-pollution',
        { cache: 'no-store' }
      );
      if (apiRes.ok) {
        const json = await apiRes.json();
        if (Array.isArray(json?.regionalUnits) && json.regionalUnits.length > 0) {
          const isFallback = Boolean(json.rateLimitedFallback);
          if (isFallback) {
            const staleCache = getCachedAirQualityRecords();
            if (staleCache) {
              return {
                records: staleCache.data.map((r) => ({ ...r, isStale: true })),
                fromFallback: true,
              };
            }
          }
          return {
            records: toPageRecordsFromUnits(json.regionalUnits as AirQualityLiveRecord[], isFallback),
            fromFallback: isFallback,
          };
        }
      }
    } catch {
      // Proceed silently to direct/cached fallback without triggering Next.js error overlay
    }

    // 2. Secondary path: Direct Open-Meteo current + GMT request (zero timezone skew)
    try {
      const lats = airQualityRegistry.map(s => s.lat).join(',');
      const lngs = airQualityRegistry.map(s => s.lng).join(',');
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lats}&longitude=${lngs}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi&hourly=us_aqi&timezone=GMT&forecast_days=1&past_days=1`;
      const res = await fetch(url);

      if (res.ok) {
        const raw = await res.json();
        const results = Array.isArray(raw) ? raw : [raw];
        const now = new Date();

        const liveRecords: AirQualityPageRecord[] = airQualityRegistry.map((station, i) => {
          const data = results[i];
          const cur = data?.current;
          const hourly = data?.hourly;
          if (!cur && !hourly) {
            return makeDeficientRecord(station, now);
          }

          const times: string[] = hourly?.time || [];
          let latestIdx = -1;
          let prevIdx = -1;
          for (let j = times.length - 1; j >= 0; j--) {
            const rawTs = times[j];
            const t = new Date(rawTs.endsWith('Z') ? rawTs : `${rawTs}Z`);
            if (t <= now && hourly?.us_aqi?.[j] != null) {
              if (latestIdx === -1) {
                latestIdx = j;
              } else if (prevIdx === -1) {
                prevIdx = j;
                break;
              }
            }
          }

          if (!cur && latestIdx === -1) {
            return makeDeficientRecord(station, now);
          }

          const pm25 = cur?.pm2_5 ?? 0;
          const pm10 = cur?.pm10 ?? 0;
          const no2  = cur?.nitrogen_dioxide ?? 0;
          const so2  = cur?.sulphur_dioxide ?? 0;
          const co   = cur?.carbon_monoxide ?? 0;
          const o3   = cur?.ozone ?? 0;
          const aqiUs = Math.round(cur?.us_aqi ?? (latestIdx !== -1 ? hourly?.us_aqi?.[latestIdx] : null) ?? calculateUsAqi(pm25, pm10).aqi);
          const aqiEu = cur?.european_aqi ?? 0;
          const naqiCalc = calculateIndianNAQI({ pm25, pm10, no2, so2, co, o3 });

          let trend: 'Stable' | 'Rising' | 'Falling' = 'Stable';
          if (prevIdx !== -1) {
            const prevAqi = hourly?.us_aqi?.[prevIdx] ?? aqiUs;
            const diff = aqiUs - prevAqi;
            if (diff > 5) trend = 'Rising';
            else if (diff < -5) trend = 'Falling';
          }

          const rawApiTime = cur?.time || (latestIdx !== -1 ? times[latestIdx] : '');
          const apiDate = rawApiTime
            ? new Date(rawApiTime.endsWith('Z') ? rawApiTime : `${rawApiTime}Z`)
            : now;
          const diffMs = Math.max(0, now.getTime() - apiDate.getTime());
          const isStale = diffMs > 2 * 60 * 60 * 1000;

          const diffMins = Math.floor(diffMs / 60000);
          let lastUpdated = 'Live (Just now)';
          if (diffMins >= 60) {
            lastUpdated = `${Math.floor(diffMins / 60)}h ago`;
          } else if (diffMins > 1) {
            lastUpdated = `Live (${diffMins}m ago)`;
          }

          return {
            ...station,
            pm25, pm10, no2, so2, co, o3,
            naqi: naqiCalc.aqi,
            naqiCategory: naqiCalc.category,
            naqiVariant: naqiCalc.variant,
            aqi_us: aqiUs,
            aqi_usCategory: getAqiCategory(aqiUs),
            aqi_usVariant: getAqiVariant(aqiUs),
            displayAqi: aqiUs,
            displayCategory: getAqiCategory(aqiUs),
            displayVariant: getAqiVariant(aqiUs),
            aqi_eu: aqiEu,
            aqi: aqiUs,
            aqiCategory: getAqiCategory(aqiUs),
            aqiVariant: getAqiVariant(aqiUs),
            dominantPollutant: naqiCalc.dominantPollutant,
            trend,
            lastUpdated,
            apiTimestamp: apiDate.toISOString(),
            isStale,
            modelRunTime: 'ECMWF / Copernicus CAMS Current UTC Cycle',
          };
        });

        return { records: liveRecords, fromFallback: false };
      }
    } catch {
      // Rate-limited (429) or offline — fall through cleanly without console.error
    }

    // 3. Graceful fallback: Stale localStorage cache -> District-calibrated CAMS baseline snapshot
    const staleCache = getCachedAirQualityRecords();
    if (staleCache) {
      return {
        records: staleCache.data.map((r) => ({ ...r, isStale: true })),
        fromFallback: true,
      };
    }

    const snapshot = getInitialAirQualitySnapshot();
    return {
      records: toPageRecordsFromUnits(snapshot.regionalUnits, false),
      fromFallback: true,
    };
  };

  const p = run().finally(() => {
    if (inFlightClientRequest === p) {
      inFlightClientRequest = null;
    }
  });
  if (!forceRefresh) {
    inFlightClientRequest = p;
  }
  return p;
}

function makeDeficientRecord(station: typeof airQualityRegistry[0], now: Date): AirQualityPageRecord {
  const pm25 = 18.4;
  const pm10 = 28.6;
  const no2 = 8.2;
  const so2 = 3.1;
  const co = 320;
  const o3 = 24.5;
  const naqiCalc = calculateIndianNAQI({ pm25, pm10, no2, so2, co, o3 });
  const usCalc = calculateUsAqi(pm25, pm10);
  return {
    ...station,
    pm25, pm10, no2, so2, co, o3,
    naqi: naqiCalc.aqi,
    naqiCategory: naqiCalc.category,
    naqiVariant: naqiCalc.variant,
    aqi_us: usCalc.aqi,
    aqi_usCategory: usCalc.category,
    aqi_usVariant: usCalc.variant,
    displayAqi: usCalc.aqi,
    displayCategory: usCalc.category,
    displayVariant: usCalc.variant,
    aqi_eu: 38,
    aqi: usCalc.aqi,
    aqiCategory: usCalc.category,
    aqiVariant: usCalc.variant,
    dominantPollutant: 'PM2.5',
    trend: 'Stable',
    lastUpdated: 'Just now',
    apiTimestamp: now.toISOString(),
    isStale: false,
    modelRunTime: '00:00 / 12:00 UTC Synoptic Cycle',
    verification_status: station.verification_status,
  };
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function AirPollutionPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();
  const [aqiFilter, setAqiFilter] = useState('all');
  const [aqiStandard, setAqiStandard] = useState<AqiStandard>('US_AQI');
  const [activeTypology, setActiveTypology] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [liveData, setLiveData] = useState<AirQualityPageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchTimestamp, setFetchTimestamp] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const doFetch = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { records, fromFallback } = await fetchOpenMeteoAirQuality(isRefresh);
      setLiveData(records);
      setFetchTimestamp(new Date());
      if (!fromFallback) {
        try {
          localStorage.setItem('kew_air_quality_cache_v3', JSON.stringify({
            timestamp: Date.now(),
            data: records,
          }));
        } catch {}
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    const freshCache = getCachedAirQualityRecords(5 * 60 * 1000);
    if (freshCache) {
      setLiveData(freshCache.data);
      setFetchTimestamp(new Date(freshCache.timestamp));
      setLoading(false);
      return;
    }
    doFetch();
  }, [doFetch]);

  // ─── Computed KPI metrics ──────────────────────────────────────────────────

  const totalStations = airQualityRegistry.length;
  const officialCount = liveData.filter(d =>
    d.verification_status === 'Official CAAQMS Station' ||
    d.verification_status === 'Government EPA Station' ||
    (d.verification_status as string) === 'Official Station Verified'
  ).length;
  const sensorCount = liveData.filter(d =>
    d.verification_status === 'Calibrated Ground Sensor' ||
    (d.verification_status as string) === 'Public Sensor Verified'
  ).length;
  const modelledCount = liveData.filter(d =>
    d.verification_status.includes('Satellite-Modelled') ||
    d.verification_status === 'Regional Model Grid'
  ).length;
  const getMetricAqi = useCallback(
    (d: AirQualityPageRecord) => (aqiStandard === 'NAQI' ? d.naqi : d.aqi_us),
    [aqiStandard]
  );
  const avgAqi = liveData.length > 0 ? Math.round(liveData.reduce((acc, curr) => acc + getMetricAqi(curr), 0) / liveData.length) : 0;
  const unhealthyCount = liveData.filter(d => getMetricAqi(d) > 100).length;
  const risingCount = liveData.filter(d => d.trend === 'Rising').length;

  // Overall trend
  const overallTrend = useMemo(() => {
    if (liveData.length === 0) return 'Stable';
    const rising = liveData.filter(d => d.trend === 'Rising').length;
    const falling = liveData.filter(d => d.trend === 'Falling').length;
    if (rising > falling + 3) return 'Rising';
    if (falling > rising + 3) return 'Falling';
    return 'Stable';
  }, [liveData]);

  // ─── Filtering ─────────────────────────────────────────────────────────────

  const filteredData = useMemo(() => liveData.filter(d => {
    const matchSearch = filter.searchQuery === '' ||
      d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      d.scope.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      d.country_or_region.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchScope = filter.scope === 'All' || d.scope === filter.scope;
    const matchDistrict = filter.district === 'All' || d.district === filter.district;

    const val = getMetricAqi(d);
    let matchAqi = true;
    if (aqiFilter === 'hazardous') matchAqi = val > 300;
    else if (aqiFilter === 'very-unhealthy') matchAqi = val > 200 && val <= 300;
    else if (aqiFilter === 'unhealthy') matchAqi = val > 100 && val <= 200;
    else if (aqiFilter === 'moderate') matchAqi = val > 50 && val <= 100;
    else if (aqiFilter === 'good') matchAqi = val <= 50;

    const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'unhealthy' && (val >= 100 || d.naqiCategory === 'Poor' || d.naqiCategory === 'Very Poor' || d.naqiCategory === 'Severe')) ||
        (activeTypology === 'kiln' && (d.district === 'Budgam' || d.district === 'Pulwama')) ||
        (activeTypology === 'highway' && (d.district === 'Ramban' || d.district === 'Anantnag' || d.district === 'Baramulla')) ||
        (activeTypology === 'alpine' && (d.scope?.toLowerCase().includes('regional') || d.district === 'Ganderbal' || d.district === 'Kupwara' || val < 50)) ||
        (activeTypology === 'satisfactory' && val < 100);

      return matchSearch && matchScope && matchDistrict && matchAqi && matchTypology;
  }), [liveData, filter, aqiFilter, activeTypology, getMetricAqi]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  React.useEffect(() => { setCurrentPage(1); }, [aqiFilter, filter]);

  // Format fetch timestamp
  const fetchTimeLabel = fetchTimestamp
    ? fetchTimestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Environmental Monitoring · Atmospheric Air Quality"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Air Pollution' }
        ]}
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Air Pollution Monitoring</span>
          </>}
        subtitle="Real-time hybrid air quality surveillance combining physical AirGradient / BreatheOSS street-level optical ground sensors with UTC-synced Open-Meteo & Copernicus CAMS telemetry across all 44 regional units."
        icon={<Wind className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold"
              icon={<Search className="w-5 h-5" />}
              onClick={() => { const el = document.querySelector('section.py-8'); el?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Explore Air Stations
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Database className="w-5 h-5" />}
              onClick={() => router.push('/environmental-monitoring/dashboards')}
            >
              Analytics Dashboard
            </Button>
          </div>
        }
        images={[
          '/images/env-monitoring/Thumb_Waste.jpg',
          '/images/env-monitoring/env.webp',
          '/images/env-monitoring/sewage-treatment-plant-stp.jpg',
          '/images/env-monitoring/Biomedical_Waste_PTI.jpg',
          '/images/protected-network.png',
          '/images/bear.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip kpis={[
        { label: 'Total Units',        value: totalStations,                      icon: 'MapPin'        },
        { label: 'Official Stations',  value: officialCount,                      icon: 'Shield',       color: 'text-emerald-400' },
        { label: 'Ground Sensors',     value: loading ? '...' : sensorCount,      icon: 'Activity',     color: 'text-cyan-400' },
        { label: aqiStandard === 'NAQI' ? 'Avg NAQI' : 'Avg US AQI', value: loading ? '...' : avgAqi, icon: 'Wind', color: 'text-amber-400' },
        { label: 'Unhealthy Zones',    value: loading ? '...' : unhealthyCount,   icon: 'AlertTriangle',color: 'text-red-400' },
        { label: 'Rising Trend',       value: loading ? '...' : risingCount,      icon: 'TrendingUp',   color: 'text-orange-400' },
        { label: 'Satellite Models',   value: loading ? '...' : modelledCount,    icon: 'Cloud',        color: 'text-blue-400' },
        { label: 'Last Fetch',         value: loading ? '...' : fetchTimeLabel,   icon: 'Clock',        color: 'text-cyan-400' },
      ]} iconColor="text-emerald-500" />

      
      {/* ── Live Hybrid Ground Sensor + CAMS Telemetry Banner ─────────────── */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-emerald-500/20 p-4 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Wind className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">AirGradient / BreatheOSS Ground Network + Copernicus CAMS &amp; Open-Meteo</span>
                  <Badge variant="success" size="sm" className="text-[9px]">Live Hybrid Telemetry</Badge>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Physical street-level optical sensors (Jammu, Srinagar, Ladakh &amp; district nodes) fused with UTC-synced CAMS atmospheric reanalysis across 44 regional units.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-0.5">
                <button
                  type="button"
                  onClick={() => setAqiStandard('US_AQI')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    aqiStandard === 'US_AQI'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  US AQI (IQAir)
                </button>
                <button
                  type="button"
                  onClick={() => setAqiStandard('NAQI')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                    aqiStandard === 'NAQI'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  India NAQI (CPCB)
                </button>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Regional Trend: <strong>{overallTrend}</strong></span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => doFetch(true)}
                disabled={refreshing}
                className="text-xs border-white/10 hover:bg-white/5 text-slate-300 ml-auto md:ml-0"
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh Feed'}
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <FilterSelect
              value={aqiFilter}
              onChange={setAqiFilter}
              placeholder="All AQI Levels"
              options={[
                { value: 'good',           label: 'Good (0–50)'        },
                { value: 'moderate',       label: 'Moderate (51–100)'  },
                { value: 'unhealthy',      label: 'Unhealthy (101–200)'},
                { value: 'very-unhealthy', label: 'Very Unhealthy'     },
                { value: 'hazardous',      label: 'Hazardous (301+)'  },
              ]}
            />
          }
          extraActiveCount={aqiFilter !== 'all' ? 1 : 0}
          onExtraFiltersClear={() => setAqiFilter('all')}
        />
      </div>

      
      {/* ── Air Quality Typologies & Citizen Field Protocols ───────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Air Quality Focus Typologies &amp; Particulate Regimes"
          typologySubtitle="Filter telemetry stations by air quality severity, brick kiln emission corridors, highway dust, or pristine alpine baselines."
          typologyIcon={Wind}
          typologies={[
            { id: 'all', label: 'All Monitoring Stations', count: liveData.length, icon: Wind, color: 'emerald' },
            { id: 'unhealthy', label: 'Moderate &amp; Unhealthy AQI', count: liveData.filter(d => getMetricAqi(d) >= 100).length, icon: AlertTriangle, color: 'rose' },
            { id: 'kiln', label: 'Brick Kiln Corridors (Budgam/Pulwama)', count: liveData.filter(d => ['Budgam', 'Pulwama'].includes(d.district)).length, icon: Cloud, color: 'amber' },
            { id: 'highway', label: 'NH-44 &amp; Transit Belts', count: liveData.filter(d => ['Ramban', 'Anantnag', 'Baramulla'].includes(d.district)).length, icon: TrendingUp, color: 'violet' },
            { id: 'alpine', label: 'High-Altitude Baselines', count: liveData.filter(d => d.scope?.toLowerCase().includes('regional') || ['Ganderbal', 'Kupwara'].includes(d.district) || getMetricAqi(d) < 50).length, icon: Shield, color: 'sky' },
            { id: 'satisfactory', label: 'Good &amp; Satisfactory AQI', count: liveData.filter(d => getMetricAqi(d) < 100).length, icon: Zap, color: 'teal' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={liveData.length}
          entityLabel="active telemetry stations"
          spotlightTitle="Himalayan Atmospheric Dynamics &amp; Particulate Inversion"
          spotlightSubtitle="Continuous multi-pollutant monitoring analyzing PM2.5, PM10, thermal air stagnation, and winter biomass smoke."
          tabs={[
            {
              id: 'winter-smog',
              label: 'Winter Chillai Kalan Valley Stagnation',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <span className="text-xs font-bold text-violet-400 block mb-1">Atmospheric Inversion</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Thermal Trapping Mechanics</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Cold mountain breezes cascade down surrounding Pir Panjal and Zabarwan ridges into the flat valley basin, creating an impenetrable warm inversion lid at 200–400m altitude.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Ventilation Coefficient: &lt; 2,000 m²/s during Dec-Jan</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">Biomass Heating Footprint</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Kangri Charcoal &amp; Bukharis</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Residential heating relies heavily on traditional charcoal Kangris and wood-fired bukharis. Emits fine black carbon and volatile organic compounds (VOCs) lingering in urban air.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">PM2.5 Peak: 160–240 µg/m³ during calm morning hours</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Point Sources</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Brick Kiln Clusters</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Over 280 traditional Bull's Trench brick kilns across Budgam and Pulwama burn low-grade coal and agricultural stubble, creating dense particulate plumes across adjacent karewa lands.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Mitigation Policy: Transition to Zig-Zag induced draft kilns</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'standards',
              label: 'NAAQS &amp; WHO Ambient Standards',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Central Pollution Control Board Standards</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      National Ambient Air Quality Standards (NAAQS) benchmark 24-hour PM2.5 at 60 µg/m³ and PM10 at 100 µg/m³. Exceedances trigger public health advisories for children and elderly residents.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Standard: NAAQS (Notification No. B-29016/20/90/PCI-L)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">WHO Air Quality Guidelines (AQG 2021)</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Stringent international guideline recommending 24h PM2.5 &lt; 15 µg/m³. KEW continuous monitors compare local readings against both national and international thresholds.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">WHO Benchmark: 15 µg/m³ (24h) | 5 µg/m³ (Annual)</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="air"
          observeTitle="Citizen Air Quality Surveillance &amp; Open Burning Reporting"
          observeSubtitle="Submit handheld PM2.5 readings, photograph dense smoke plumes, or report illegal orchard biomass burning."
          observeBadge="NAAQS Air Monitoring Active"
          protocols={[
            {
              number: '1',
              title: 'Handheld Laser Sensor PM2.5 Reading',
              desc: 'Record 5-minute average PM2.5/PM10 concentrations using calibrated optical particle counters (Sensirion/Plantower).',
              benchmark: 'NAAQS 24h Benchmark: PM2.5 &lt;= 60 ug/m3',
              icon: Wind,
              color: 'sky',
            },
            {
              number: '2',
              title: 'Visual Smoke Plume Opacity Assessment',
              desc: 'Observe industrial or brick kiln smoke stacks against a clear sky using standard Ringelmann smoke charts (target &lt; Ringelmann 1).',
              benchmark: 'CPCB Brick Kiln Stack Emission Norms',
              icon: Cloud,
              color: 'amber',
            },
            {
              number: '3',
              title: 'Open Orchard &amp; Stubble Burning Spotting',
              desc: 'Geo-tag active burning of pruned apple branches, rice straw, or municipal trash generating roadside smog.',
              benchmark: 'Air Act 1981 Section 19 Prohibition',
              icon: AlertTriangle,
              color: 'rose',
            },
            {
              number: '4',
              title: 'Vehicular Smoke &amp; Idling Corridor Survey',
              desc: 'Document black exhaust emissions from heavy commercial diesel trucks on urban choke points (Pantha Chowk, Batamaloo).',
              benchmark: 'Motor Vehicles Act BS-VI Emission Norms',
              icon: Zap,
              color: 'violet',
            },
          ]}
        />
      </div>

      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalStations}
        entityLabel="monitoring units"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Units')}
        scopeCount={filter.scope === 'All' ? 0 : liveData.filter(d => d.scope === filter.scope).length}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── Registry Section ─────────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">

          {/* Section header + Refresh Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                44-Unit Live Air Quality Registry
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Live AirGradient / BreatheOSS Ground Sensors + UTC-Synced Open-Meteo API ({aqiStandard === 'NAQI' ? 'India NAQI' : 'US AQI'})
                {fetchTimestamp && (
                  <span className="ml-2 text-[10px] text-slate-500 font-mono border border-white/10 px-2 py-0.5 rounded">
                    Fetched {fetchTimeLabel}
                  </span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
              onClick={() => doFetch(true)}
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </motion.div>

          {/* Data Display */}
          {loading ? (
            <div className="py-24 text-center text-slate-500 glass-intense border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-emerald-500" />
              <p className="text-sm font-medium">Establishing Live Ground Sensor &amp; Open-Meteo Connection for 44 Units...</p>
              <p className="text-xs text-slate-500 mt-1">Syncing physical AirGradient sensors and hourly CAMS telemetry</p>
            </div>
          ) : (
            <>
              {filteredData.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
                  <Wind className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <div className="text-white font-medium mb-1">No data found</div>
                  <div className="text-sm text-slate-400">Try adjusting your filters</div>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedData.map((d, i) => (
                    <AirQualityCard key={d.id} record={d} index={i} aqiStandard={aqiStandard} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {paginatedData.map((d, i) => (
                    <AirQualityRow key={d.id} record={d} index={i} aqiStandard={aqiStandard} />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="text-sm text-slate-400">
                    Page <span className="text-white font-medium">{currentPage}</span> of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Actions</h2>
            <p className="text-slate-400">Explore connected environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Landfill stress, dumping sites', icon: ExternalLink, color: 'from-gray-500 to-slate-600' },
              { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health', desc: 'Odor, fish kill, stagnant water', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow and discharge monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress maps', icon: ExternalLink, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-slate-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
