'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import {
  Wind, ChevronRight, AlertTriangle,
  Activity, Clock,
  MapPin, ExternalLink, Cloud,
  TrendingUp, RefreshCw, ShieldAlert, Shield, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  airQualityRegistry,
  AirQualityLiveRecord,
  getAqiCategory,
  getAqiVariant,
  getVerificationBadgeVariant,
} from '@/data/air-quality-registry';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';

// ─── Verification badge colours ──────────────────────────────────────────────

const VERIFICATION_CHIP: Record<string, string> = {
  'Official Station Verified': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Public Sensor Verified':    'text-cyan-400    bg-cyan-500/10    border-cyan-500/30',
  'Satellite-Modelled':        'text-amber-400   bg-amber-500/10   border-amber-500/30',
  'API Live':                  'text-green-400   bg-green-500/10   border-green-500/30',
  'Data Deficient':            'text-slate-400   bg-slate-500/10   border-slate-500/30',
};

// ─── AirQualityCard ──────────────────────────────────────────────────────────

function AirQualityCard({ record, index }: { record: AirQualityLiveRecord; index: number }) {
  const verChip = VERIFICATION_CHIP[record.verification_status] || VERIFICATION_CHIP['Data Deficient'];
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
          <Badge variant={record.aqiVariant} className="flex flex-col items-center justify-center px-3 py-1 flex-shrink-0">
            <span className="text-[10px] uppercase opacity-80 leading-tight">AQI</span>
            <span className="text-lg font-black leading-tight">{record.aqi}</span>
          </Badge>
        </div>

        {/* Verification Status */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] w-full mb-3 ${verChip}`}>
          <Shield className="w-3 h-3 flex-shrink-0" />
          <span className="font-medium truncate">{record.verification_status}</span>
          {record.isStale && <span className="text-[8px] uppercase ml-auto text-amber-500">Stale</span>}
        </div>

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

        {/* Footer: Dominant + Trend + Last Updated */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Dominant Pollutant</span>
            <span className="text-amber-300 font-bold">{record.dominantPollutant}</span>
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

function AirQualityRow({ record, index }: { record: AirQualityLiveRecord; index: number }) {
  const verChip = VERIFICATION_CHIP[record.verification_status] || VERIFICATION_CHIP['Data Deficient'];
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
          <div className="w-28">
            <div className="text-[10px] text-slate-500 mb-1">AQI Level</div>
            <Badge variant={record.aqiVariant} size="sm" className="shadow-sm">
              <span className="text-xs font-bold">{record.aqi}</span>
              <span className="text-[10px] uppercase ml-1 opacity-80 truncate hidden sm:inline">{record.aqiCategory}</span>
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

// ─── Fetch helper — Open-Meteo Hourly Air Quality API ────────────────────────

async function fetchOpenMeteoAirQuality(): Promise<AirQualityLiveRecord[]> {
  const lats = airQualityRegistry.map(s => s.lat).join(',');
  const lngs = airQualityRegistry.map(s => s.lng).join(',');

  // Request hourly data for the last 2 hours so we can compute trend
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lats}&longitude=${lngs}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi&timezone=auto&forecast_days=1&past_days=1`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo API error: ${res.status}`);
  const raw = await res.json();

  // Open-Meteo returns an array when multiple coordinates are passed
  const results = Array.isArray(raw) ? raw : [raw];
  const now = new Date();

  return airQualityRegistry.map((station, i) => {
    const data = results[i];
    if (!data?.hourly) {
      return makeDeficientRecord(station, now);
    }

    const hourly = data.hourly;
    const times: string[] = hourly.time || [];

    // Find the latest index with valid data (scanning from the end)
    let latestIdx = -1;
    let prevIdx = -1;
    for (let j = times.length - 1; j >= 0; j--) {
      const t = new Date(times[j]);
      if (t <= now && hourly.us_aqi?.[j] != null) {
        if (latestIdx === -1) {
          latestIdx = j;
        } else if (prevIdx === -1) {
          prevIdx = j;
          break;
        }
      }
    }

    if (latestIdx === -1) {
      return makeDeficientRecord(station, now);
    }

    const pm25 = hourly.pm2_5?.[latestIdx] ?? 0;
    const pm10 = hourly.pm10?.[latestIdx] ?? 0;
    const no2  = hourly.nitrogen_dioxide?.[latestIdx] ?? 0;
    const so2  = hourly.sulphur_dioxide?.[latestIdx] ?? 0;
    const co   = hourly.carbon_monoxide?.[latestIdx] ?? 0;
    const o3   = hourly.ozone?.[latestIdx] ?? 0;
    const aqiUs = hourly.us_aqi?.[latestIdx] ?? 0;
    const aqiEu = hourly.european_aqi?.[latestIdx] ?? 0;

    // Dominant pollutant: compare each pollutant's contribution
    // Use concentration-based weighting relative to WHO/EPA breakpoints
    const pollutantWeights = [
      { name: 'PM2.5', val: pm25 / 15 },   // WHO 24h guideline: 15 µg/m³
      { name: 'PM10',  val: pm10 / 45 },   // WHO 24h guideline: 45 µg/m³
      { name: 'NO₂',   val: no2  / 25 },   // WHO annual guideline: 10 µg/m³ (hourly ~25)
      { name: 'SO₂',   val: so2  / 40 },   // WHO 24h guideline: 40 µg/m³
      { name: 'CO',     val: co   / 4000 }, // WHO 24h guideline: 4000 µg/m³
      { name: 'O₃',     val: o3   / 100 },  // WHO 8h guideline: 100 µg/m³
    ];
    const dominant = pollutantWeights.reduce((max, p) => p.val > max.val ? p : max, pollutantWeights[0]).name;

    // Trend: compare latest AQI vs previous hour AQI
    let trend: 'Stable' | 'Rising' | 'Falling' = 'Stable';
    if (prevIdx !== -1) {
      const prevAqi = hourly.us_aqi?.[prevIdx] ?? aqiUs;
      const diff = aqiUs - prevAqi;
      if (diff > 5) trend = 'Rising';
      else if (diff < -5) trend = 'Falling';
    }

    const apiTime = times[latestIdx] || now.toISOString();
    const apiDate = new Date(apiTime);
    const diffMs = now.getTime() - apiDate.getTime();
    const isStale = diffMs > 2 * 60 * 60 * 1000; // >2 hours old

    // Format last updated as relative time
    const diffMins = Math.floor(diffMs / 60000);
    let lastUpdated = 'Just now';
    if (diffMins >= 60) {
      const hours = Math.floor(diffMins / 60);
      lastUpdated = `${hours}h ago`;
    } else if (diffMins > 1) {
      lastUpdated = `${diffMins}m ago`;
    }

    return {
      ...station,
      pm25, pm10, no2, so2, co, o3,
      aqi_us: aqiUs,
      aqi_eu: aqiEu,
      aqi: aqiUs, // US AQI as primary display
      aqiCategory: getAqiCategory(aqiUs),
      aqiVariant: getAqiVariant(aqiUs),
      dominantPollutant: dominant,
      trend,
      lastUpdated,
      apiTimestamp: apiTime,
      isStale,
    };
  });
}

function makeDeficientRecord(station: typeof airQualityRegistry[0], now: Date): AirQualityLiveRecord {
  return {
    ...station,
    pm25: 0, pm10: 0, no2: 0, so2: 0, co: 0, o3: 0,
    aqi_us: 0, aqi_eu: 0, aqi: 0,
    aqiCategory: 'Good',
    aqiVariant: 'success',
    dominantPollutant: '—',
    trend: 'Stable',
    lastUpdated: '—',
    apiTimestamp: now.toISOString(),
    isStale: true,
    verification_status: 'Data Deficient',
  };
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function AirPollutionPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();
  const [aqiFilter, setAqiFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [liveData, setLiveData] = useState<AirQualityLiveRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchTimestamp, setFetchTimestamp] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const doFetch = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchOpenMeteoAirQuality();
      setLiveData(data);
      setFetchTimestamp(new Date());
    } catch (err) {
      console.error('Failed to fetch air quality data', err);
      // If we already have cached data, keep it and mark stale
      if (liveData.length === 0) {
        // No cached data — show deficient records
        const now = new Date();
        setLiveData(airQualityRegistry.map(s => makeDeficientRecord(s, now)));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [liveData.length]);

  React.useEffect(() => { doFetch(); }, []);

  // ─── Computed KPI metrics ──────────────────────────────────────────────────

  const totalStations = airQualityRegistry.length;
  const officialCount = liveData.filter(d => d.verification_status === 'Official Station Verified').length;
  const sensorCount = liveData.filter(d => d.verification_status === 'Public Sensor Verified').length;
  const modelledCount = liveData.filter(d => d.verification_status === 'Satellite-Modelled').length;
  const avgAqi = liveData.length > 0 ? Math.round(liveData.reduce((acc, curr) => acc + curr.aqi, 0) / liveData.length) : 0;
  const unhealthyCount = liveData.filter(d => d.aqi > 100).length;
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

    let matchAqi = true;
    if (aqiFilter === 'hazardous') matchAqi = d.aqi > 300;
    else if (aqiFilter === 'very-unhealthy') matchAqi = d.aqi > 200 && d.aqi <= 300;
    else if (aqiFilter === 'unhealthy') matchAqi = d.aqi > 100 && d.aqi <= 200;
    else if (aqiFilter === 'moderate') matchAqi = d.aqi > 50 && d.aqi <= 100;
    else if (aqiFilter === 'good') matchAqi = d.aqi <= 50;

    return matchSearch && matchScope && matchDistrict && matchAqi;
  }), [liveData, filter, aqiFilter]);

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
        label="Environmental Monitoring"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Air Pollution' }
        ]}
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Air Pollution Monitoring</span>
          </>}
        subtitle="Real-time air quality monitoring via Open-Meteo hourly API across all 44 regional units — PM2.5, PM10, NO₂, SO₂, CO, O₃, and US AQI with dynamic trend computation."
        icon={<Wind className="w-6 h-6 text-emerald-400" />}
      />

      <ModuleKpiStrip kpis={[
        { label: 'Total Units',        value: totalStations,                      icon: 'MapPin'        },
        { label: 'Official Stations',  value: officialCount,                      icon: 'Shield',       color: 'text-emerald-400' },
        { label: 'Public Sensors',     value: sensorCount,                        icon: 'Activity',     color: 'text-cyan-400' },
        { label: 'Avg US AQI',         value: loading ? '...' : avgAqi,           icon: 'Wind',         color: 'text-amber-400' },
        { label: 'Unhealthy Zones',    value: loading ? '...' : unhealthyCount,   icon: 'AlertTriangle',color: 'text-red-400' },
        { label: 'Rising Trend',       value: loading ? '...' : risingCount,      icon: 'TrendingUp',   color: 'text-orange-400' },
        { label: 'Satellite Models',   value: modelledCount,                      icon: 'Cloud',        color: 'text-blue-400' },
        { label: 'Last Fetch',         value: loading ? '...' : fetchTimeLabel,   icon: 'Clock',        color: 'text-cyan-400' },
      ]} iconColor="text-emerald-500" />

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
                Hourly Open-Meteo API — PM2.5, PM10, NO₂, SO₂, CO, O₃ &amp; US AQI
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
              <p className="text-sm font-medium">Establishing Live Open-Meteo Connection for 44 Units...</p>
              <p className="text-xs text-slate-500 mt-1">Fetching hourly PM2.5, PM10, NO₂, SO₂, CO, O₃ and US AQI</p>
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
                    <AirQualityCard key={d.id} record={d} index={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {paginatedData.map((d, i) => (
                    <AirQualityRow key={d.id} record={d} index={i} />
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
