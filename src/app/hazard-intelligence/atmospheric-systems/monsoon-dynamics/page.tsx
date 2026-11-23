'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import { AtmosphericSystemsMap, AtmosphericMapMarker } from '@/components/maps/AtmosphericSystemsMap';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import {
  MonsoonCorridorLiveRecord,
  MonsoonSubRegion,
  HazardLevel,
} from '@/data/hazard-monsoon-dynamics';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  CloudRain, Droplets, Waves, Mountain, Wind, Compass,
  MapPin, RefreshCw, ChevronLeft, ChevronRight, X, Zap, History
} from 'lucide-react';

function riskVariant(risk: HazardLevel): 'success' | 'warning' | 'danger' | 'critical' {
  if (risk === 'Critical') return 'critical';
  if (risk === 'High') return 'danger';
  if (risk === 'Moderate') return 'warning';
  return 'success';
}

function stateBadgeClass(state: string): string {
  if (state === 'Active Monsoon Surge') return 'bg-teal-500/20 text-teal-200 border-teal-400/40';
  if (state === 'Orographic Moisture Intrusion') return 'bg-sky-500/20 text-sky-200 border-sky-400/40';
  if (state === 'Pre-Monsoon Convective') return 'bg-amber-500/20 text-amber-200 border-amber-400/40';
  return 'bg-slate-800/90 text-slate-300 border-white/15';
}

const COUPLED_META: Record<
  'floods' | 'flash-floods' | 'landslides' | 'glofs',
  { label: string; href: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  floods: { label: 'Floods', href: '/hazard-intelligence/floods', icon: Waves, color: 'text-cyan-400' },
  'flash-floods': { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods', icon: CloudRain, color: 'text-blue-400' },
  landslides: { label: 'Landslides', href: '/hazard-intelligence/landslides', icon: Mountain, color: 'text-amber-400' },
  glofs: { label: 'GLOFs', href: '/hazard-intelligence/glofs', icon: Droplets, color: 'text-teal-400' },
};

interface MonsoonApiPayload {
  seasonContext: {
    isActiveMonsoonWindow: boolean;
    regimeHeadline: string;
    mean850RhPct: number;
    maxCapeJkg: number;
    peakPast7dMm: number;
    peakForecast7dMm: number;
  };
  moistureBranches: Array<{
    id: string;
    name: string;
    branch: string;
    latitude: number;
    longitude: number;
    dew_point_c: number;
    rh_850hpa_pct: number;
    wind_850hpa_kmh: number;
    wind_850hpa_dir: number;
    transportStatus: string;
  }>;
  regionalSummaries: Array<{
    subRegion: MonsoonSubRegion;
    corridors: number;
    past7dMeanMm: number;
    normal7dMm: number;
    anomalyPct: number;
    forecastMax7dMm: number;
    meanRh850Pct: number;
    overallRisk: HazardLevel;
  }>;
  corridors: MonsoonCorridorLiveRecord[];
  historicalRecords: Array<{
    id: string;
    code: string;
    title: string;
    dates: string;
    anomaly: string;
    impact: string;
    source: string;
  }>;
  meta: {
    updatedAt: string;
  };
}

export default function MonsoonDynamicsPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [data, setData] = useState<MonsoonApiPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [subRegionFilter, setSubRegionFilter] = useState<string>('all');
  const [regimeFilter, setRegimeFilter] = useState<string>('all');
  const [coupledFilter, setCoupledFilter] = useState<string>('all');
  const [activeTypology, setActiveTypology] = useState<string>('all');
  const [analyticsTab, setAnalyticsTab] = useState<'anomaly' | 'forecast' | 'history'>('anomaly');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCorridor, setSelectedCorridor] = useState<MonsoonCorridorLiveRecord | null>(null);

  const fetchTelemetry = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(`/api/hazard-intelligence/monsoon-dynamics${force ? '?refresh=1' : ''}`, {
        cache: 'no-store',
      });
      const json = await res.json();
      if (json.success) setData(json);
    } catch {
      // Retain last valid state
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry(false);
  }, [fetchTelemetry]);

  const corridors = data?.corridors || [];
  const subRegions: MonsoonSubRegion[] = ['Jammu', 'Kashmir', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  const filteredCorridors = useMemo(() => {
    return corridors.filter((c) => {
      const matchSearch =
        filter.searchQuery === '' ||
        c.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        c.subRegion.toLowerCase().includes(filter.searchQuery.toLowerCase());

      const matchScope = filter.scope === 'All' || c.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || c.district === filter.district;
      const matchSubRegion = subRegionFilter === 'all' || c.subRegion === subRegionFilter;
      const matchRegime = regimeFilter === 'all' || c.exposureRegime === regimeFilter;
      const matchCoupled = coupledFilter === 'all' || c.coupledHazards.includes(coupledFilter as any);

      const matchTypology =
        activeTypology === 'all' ||
        (activeTypology === 'shivalik' && c.exposureRegime === 'Windward Shivalik Gate') ||
        (activeTypology === 'spillover' && c.exposureRegime === 'Pir Panjal Spillover') ||
        (activeTypology === 'valley' && c.exposureRegime === 'Valley Orographic Basin') ||
        (activeTypology === 'trans-himalaya' && c.exposureRegime === 'Trans-Himalayan Intrusion');

      return matchSearch && matchScope && matchDistrict && matchSubRegion && matchRegime && matchCoupled && matchTypology;
    });
  }, [corridors, filter, subRegionFilter, regimeFilter, coupledFilter, activeTypology]);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredCorridors.length / ITEMS_PER_PAGE);
  const paginatedCorridors = filteredCorridors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const mapMarkers: AtmosphericMapMarker[] = useMemo(() => {
    return filteredCorridors.map((c) => {
      const color =
        c.coupledRisk.overall === 'Critical'
          ? '#ef4444'
          : c.coupledRisk.overall === 'High'
            ? '#f59e0b'
            : c.liveObservation.rh_850hpa_pct >= 65
              ? '#14b8a6'
              : '#38bdf8';
      return {
        id: c.id,
        title: c.name,
        subtitle: `${c.district} · ${c.subRegion} · ${c.exposureRegime}`,
        lat: c.latitude,
        lon: c.longitude,
        color,
        radius: c.subRegion === 'Jammu' ? 9.5 : 8,
        liveSummary: `850hPa RH: ${c.liveObservation.rh_850hpa_pct}% · Past 7d: ${c.liveObservation.past7d_rain_mm}mm (${c.liveObservation.anomaly_pct >= 0 ? '+' : ''}${c.liveObservation.anomaly_pct}% vs normal)`,
        forecastSummary: `Next 7d Rain: ${c.forecast7d.total_rain_mm}mm · Max CAPE: ${c.forecast7d.max_cape_jkg} J/kg`,
      };
    });
  }, [filteredCorridors]);

  const moisturePolyline: [number, number][] | undefined = useMemo(() => {
    if (!data?.moistureBranches?.length) return undefined;
    return data.moistureBranches.map((m) => [m.latitude, m.longitude]);
  }, [data]);

  const forecastDailySeries = useMemo(() => {
    const target = subRegionFilter === 'all' ? corridors : corridors.filter((c) => c.subRegion === subRegionFilter);
    if (!target.length || !target[0]?.forecast7d?.daily) return [];
    return target[0].forecast7d.daily.map((d, idx) => ({
      date: d.date.slice(5),
      meanRainMm: Number((target.reduce((s, c) => s + (c.forecast7d.daily[idx]?.rain_mm || 0), 0) / target.length).toFixed(1)),
      peakRainMm: Number(Math.max(...target.map((c) => c.forecast7d.daily[idx]?.rain_mm || 0)).toFixed(1)),
      maxProbPct: Math.max(...target.map((c) => c.forecast7d.daily[idx]?.prob_pct || 0)),
    }));
  }, [corridors, subRegionFilter]);

  const syncLabel = data?.meta?.updatedAt
    ? new Date(data.meta.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : 'Live';

  const extraActiveCount = [subRegionFilter, regimeFilter, coupledFilter].filter((x) => x !== 'all').length;
  const scopeCount = filter.scope === 'All' ? 0 : corridors.filter((c) => c.scope === filter.scope).length;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence · Atmospheric Systems"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Atmospheric Systems', href: '/hazard-intelligence/atmospheric-systems' },
          { label: 'Monsoon Dynamics' },
        ]}
        title={
          <>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span
                className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1"
                style={{ fontSize: '0.58em' }}
              >
                KEW
              </span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Monsoon Dynamics
            </span>
          </>
        }
        subtitle="Monsoon progression, 850 hPa Arabian Sea & Bay of Bengal moisture transport, orographic precipitation, observed rainfall anomalies, and regional multi-hazard influence across Jammu, Kashmir, Ladakh, Azad Kashmir, Gilgit, and Baltistan."
        icon={<CloudRain className="w-6 h-6 text-teal-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-teal-600 to-emerald-600 font-bold text-white"
              icon={<Wind className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems/western-disturbances')}
            >
              Western Disturbances
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Compass className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems/jet-stream-circulation')}
            >
              Jet Stream &amp; Circulation
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Orographic Corridors', value: corridors.length || 24, icon: 'MapPin', color: 'text-teal-400' },
          { label: 'Sub-Regions Covered', value: 6, icon: 'Globe', color: 'text-cyan-400' },
          { label: 'Moisture Gates', value: 4, icon: 'Compass', color: 'text-emerald-400' },
          { label: 'Mean 850 hPa RH', value: loading ? '...' : `${data?.seasonContext.mean850RhPct ?? 42}%`, icon: 'Droplets', color: 'text-sky-400' },
          { label: 'Peak Past 7d Rain', value: loading ? '...' : `${data?.seasonContext.peakPast7dMm ?? 0} mm`, icon: 'CloudRain', color: 'text-blue-400' },
          { label: 'Peak 7d Forecast', value: loading ? '...' : `${data?.seasonContext.peakForecast7dMm ?? 0} mm`, icon: 'Waves', color: 'text-indigo-400' },
          { label: 'Max CAPE', value: loading ? '...' : `${data?.seasonContext.maxCapeJkg ?? 0} J/kg`, icon: 'Zap', color: 'text-amber-400' },
          { label: 'Last Sync', value: loading ? '...' : syncLabel, icon: 'Clock', color: 'text-emerald-300' },
        ]}
        iconColor="text-teal-400"
      />

      {/* Live Seasonal Regime & Moisture Transport Banner */}
      <section className="container mx-auto px-6 mt-4 space-y-3">
        <Card className="glass-intense border-teal-500/25 p-4 bg-gradient-to-r from-teal-950/30 via-slate-900 to-slate-950">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  850 hPa Moisture Transport &amp; Rainfall Anomaly Engine
                </span>
                <Badge variant="success" size="sm" className="text-[9px]">0h NWP 850 hPa Analysis</Badge>
                <Badge variant="info" size="sm" className="text-[9px]">7d Observed Anomaly vs Normal</Badge>
                <Badge variant="warning" size="sm" className="text-[9px]">7d NWP Forecast</Badge>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {data?.seasonContext.regimeHeadline || 'Synchronizing Arabian Sea, Bay of Bengal, and Pir Panjal 850 hPa moisture transport vectors...'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchTelemetry(true)}
              disabled={refreshing}
              className="text-xs border-white/15 text-slate-200"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Syncing...' : 'Refresh Telemetry'}
            </Button>
          </div>

          {data?.moistureBranches && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-white/10">
              {data.moistureBranches.map((mb) => (
                <div key={mb.id} className="p-2.5 rounded-xl bg-slate-950/75 border border-white/10 text-xs">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-teal-300">{mb.branch}</span>
                    <span className="text-[10px] font-mono text-slate-400">{mb.wind_850hpa_kmh} km/h ({mb.wind_850hpa_dir}°)</span>
                  </div>
                  <div className="text-[11px] text-white font-semibold truncate mt-0.5">{mb.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                    <span>850 hPa RH: <strong className="text-emerald-300">{mb.rh_850hpa_pct}%</strong></span>
                    <span>Dew Pt: <strong className="text-sky-300">{mb.dew_point_c}°C</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Interactive GIS + Rainfall Anomaly & Forecast Analytics */}
      <section className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6">
            <AtmosphericSystemsMap
              markers={mapMarkers}
              polylineCoords={moisturePolyline}
              polylineColor="#14b8a6"
              legendItems={[
                { color: '#14b8a6', label: 'High 850hPa Moisture (≥65%)' },
                { color: '#38bdf8', label: 'Dry / Baseline Flow' },
                { color: '#f59e0b', label: 'High Coupled Risk' },
                { color: '#ef4444', label: 'Critical Surge' },
              ]}
              onSelectMarker={(id) => {
                const found = corridors.find((c) => c.id === id);
                if (found) setSelectedCorridor(found);
              }}
            />
          </div>

          <Card className="lg:col-span-6 glass-intense border-white/10 p-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                    Orographic Precipitation &amp; Anomaly Diagnostics
                  </span>
                  <h2 className="text-base font-bold text-white">
                    {analyticsTab === 'anomaly'
                      ? 'Observed Past 7d Rain vs. Climatological Weekly Normal'
                      : analyticsTab === 'forecast'
                        ? `7-Day NWP Rainfall Trajectory (${subRegionFilter === 'all' ? 'All 6 Regions' : subRegionFilter})`
                        : 'Verified Historical Monsoon Intrusion Benchmarks'}
                  </h2>
                </div>
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAnalyticsTab('anomaly')}
                    className={`px-2.5 py-1 rounded font-semibold ${analyticsTab === 'anomaly' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    7d Anomaly
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnalyticsTab('forecast')}
                    className={`px-2.5 py-1 rounded font-semibold ${analyticsTab === 'forecast' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    7d Forecast
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnalyticsTab('history')}
                    className={`px-2.5 py-1 rounded font-semibold ${analyticsTab === 'history' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Archive
                  </button>
                </div>
              </div>

              {analyticsTab === 'anomaly' && (
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.regionalSummaries || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                      <XAxis dataKey="subRegion" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,23,42,0.95)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="past7dMeanMm" name="Observed Past 7d (mm)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="normal7dMm" name="Seasonal Weekly Normal (mm)" fill="#64748b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="forecastMax7dMm" name="7d Forecast Peak (mm)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {analyticsTab === 'forecast' && (
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastDailySeries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                      <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,23,42,0.95)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="peakRainMm" name="Peak Corridor Rain (mm)" stroke="#14b8a6" fill="#0d9488" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="meanRainMm" name="Mean Regional Rain (mm)" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {analyticsTab === 'history' && (
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {(data?.historicalRecords || []).map((hr) => (
                    <div key={hr.id} className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/25 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-purple-300 flex items-center gap-1">
                          <History className="w-3 h-3" /> {hr.code} · {hr.dates}
                        </span>
                        <span className="text-[10px] font-bold text-amber-300">{hr.anomaly}</span>
                      </div>
                      <div className="text-xs font-bold text-white">{hr.title}</div>
                      <p className="text-[11px] text-slate-400 leading-snug">{hr.impact}</p>
                      <div className="text-[10px] text-slate-500 font-mono">{hr.source}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Coupled Hazard Pathways */}
      <section className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: 'Riverine Floods', href: '/hazard-intelligence/floods', icon: Waves, color: 'text-cyan-400', desc: 'Multi-day monsoon depressions swelling Tawi, Chenab, Jhelum & Poonch basins' },
            { title: 'Cloudburst & Flash Floods', href: '/hazard-intelligence/flash-floods', icon: CloudRain, color: 'text-blue-400', desc: 'High-CAPE convective bursts on Reasi, Kishtwar, Amarnath & Ladakh fans' },
            { title: 'Slope Saturation & Landslides', href: '/hazard-intelligence/landslides', icon: Mountain, color: 'text-amber-400', desc: 'Pore-water buildup along NH-44 Ramban, Udhampur, Muzaffarabad & KKH' },
            { title: 'Warm-Rain GLOF Acceleration', href: '/hazard-intelligence/glofs', icon: Droplets, color: 'text-teal-400', desc: 'Poleward monsoon intrusions over Karakoram, Zanskar & Hunza proglacial lakes' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="group">
                <Card className="glass-intense border-white/10 hover:border-teal-500/40 p-3.5 h-full transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs font-bold text-white group-hover:text-teal-300">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6-Subregion Quick Filter Bar */}
      {data?.regionalSummaries && (
        <section className="container mx-auto px-6 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {data.regionalSummaries.map((sr) => {
              const active = subRegionFilter === sr.subRegion;
              return (
                <button
                  key={sr.subRegion}
                  type="button"
                  onClick={() => {
                    setSubRegionFilter(active ? 'all' : sr.subRegion);
                    setCurrentPage(1);
                  }}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    active
                      ? 'bg-teal-500/15 border-teal-400/50 shadow-lg'
                      : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white">{sr.subRegion}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sr.corridors}u</span>
                  </div>
                  <div className="text-[10px] text-emerald-300 mt-1">
                    7d Obs: {sr.past7dMeanMm}mm ({sr.anomalyPct >= 0 ? '+' : ''}{sr.anomalyPct}%)
                  </div>
                  <div className="text-[10px] text-sky-300">
                    850 RH: {sr.meanRh850Pct}% · Fcst: {sr.forecastMax7dMm}mm
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={subRegionFilter}
                onChange={(v) => { setSubRegionFilter(v); setCurrentPage(1); }}
                placeholder="All 6 Sub-Regions"
                options={subRegions.map((r) => ({ value: r, label: r }))}
              />
              <FilterSelect
                value={regimeFilter}
                onChange={(v) => { setRegimeFilter(v); setCurrentPage(1); }}
                placeholder="Orographic Exposure"
                options={[
                  { value: 'Windward Shivalik Gate', label: 'Windward Shivalik Gate' },
                  { value: 'Pir Panjal Spillover', label: 'Pir Panjal Spillover' },
                  { value: 'Valley Orographic Basin', label: 'Valley Orographic Basin' },
                  { value: 'Trans-Himalayan Intrusion', label: 'Trans-Himalayan Intrusion' },
                ]}
              />
              <FilterSelect
                value={coupledFilter}
                onChange={(v) => { setCoupledFilter(v); setCurrentPage(1); }}
                placeholder="Coupled Hazard"
                options={[
                  { value: 'floods', label: 'Floods' },
                  { value: 'flash-floods', label: 'Flash Floods' },
                  { value: 'landslides', label: 'Landslides' },
                  { value: 'glofs', label: 'GLOFs' },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setSubRegionFilter('all');
            setRegimeFilter('all');
            setCoupledFilter('all');
          }}
        />
      </div>

      <ModuleScopeRow
        filteredCount={filteredCorridors.length}
        totalCount={corridors.length || 24}
        entityLabel="monsoon corridors"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Corridors')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* Corridor Cards Registry */}
      <section id="monsoon-corridor-registry" className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {loading && corridors.length === 0 ? (
            <div className="py-20 text-center glass-intense border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-teal-400" />
              <p className="text-sm font-semibold text-white">Synchronizing 24 Orographic Monsoon Corridors...</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCorridors.map((c) => (
                <Card
                  key={c.id}
                  onClick={() => setSelectedCorridor(c)}
                  className="glass-intense border-white/10 hover:border-teal-500/40 p-5 flex flex-col gap-3 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-teal-300">{c.name}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        <span>{c.district} · <strong>{c.subRegion}</strong> · {c.elevation_m} m</span>
                      </p>
                    </div>
                    <Badge variant={riskVariant(c.coupledRisk.overall)} size="sm" className="text-[10px]">
                      {c.coupledRisk.overall}
                    </Badge>
                  </div>

                  <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold flex items-center justify-between ${stateBadgeClass(c.monsoonState)}`}>
                    <span>{c.monsoonState}</span>
                    <span className="font-mono opacity-80">{c.exposureRegime.split(' ')[0]}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-emerald-400">Live &amp; 7d Anomaly</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">850 RH / DP</span>
                        <span className="font-bold text-white">{c.liveObservation.rh_850hpa_pct}% · {c.liveObservation.dew_point_c}°C</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Past 7d Rain</span>
                        <span className="font-mono text-slate-200">{c.liveObservation.past7d_rain_mm} mm</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Anomaly</span>
                        <span className={`font-mono font-bold ${c.liveObservation.anomaly_pct >= 0 ? 'text-teal-300' : 'text-amber-300'}`}>
                          {c.liveObservation.anomaly_pct >= 0 ? '+' : ''}{c.liveObservation.anomaly_pct}%
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-500/[0.06] border border-sky-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-sky-400">7-Day NWP Forecast</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">7d Total Rain</span>
                        <span className="font-bold text-white">{c.forecast7d.total_rain_mm} mm</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Peak Daily</span>
                        <span className="font-mono text-sky-200">{c.forecast7d.peak_daily_mm} mm</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Max CAPE</span>
                        <span className="font-mono text-slate-200">{c.forecast7d.max_cape_jkg} J/kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-2.5 border-t border-white/5 flex flex-wrap gap-1.5">
                    {c.coupledHazards.map((hz) => {
                      const meta = COUPLED_META[hz];
                      const Icon = meta.icon;
                      return (
                        <Link
                          key={hz}
                          href={meta.href}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white"
                        >
                          <Icon className={`w-2.5 h-2.5 ${meta.color}`} />
                          <span>{meta.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedCorridors.map((c) => (
                <Card
                  key={c.id}
                  onClick={() => setSelectedCorridor(c)}
                  className="glass-intense border-white/10 hover:border-teal-500/40 p-4 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="text-sm font-bold text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.district} · {c.subRegion} · {c.exposureRegime}</div>
                    </div>
                    <div className="font-mono text-emerald-300">850 RH: {c.liveObservation.rh_850hpa_pct}% · 7d Obs: {c.liveObservation.past7d_rain_mm}mm</div>
                    <div className="font-mono text-sky-300">7d Fcst: {c.forecast7d.total_rain_mm}mm · CAPE {c.forecast7d.max_cape_jkg}</div>
                    <Badge variant={riskVariant(c.coupledRisk.overall)} size="sm">{c.coupledRisk.overall}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center items-center gap-3">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="text-sm text-slate-400">
                Page <strong className="text-white">{currentPage}</strong> of {totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Spotlight Below Pagination */}
      <div className="container mx-auto px-6 pb-8">
        <EnvironmentalObserveSpotlight
          typologyTitle="Monsoon Orographic Barriers & Moisture Intrusion Regimes"
          typologySubtitle="Filter corridors across Shivalik windward escarpments, Pir Panjal spillover passes, Kashmir basin catchments, and Trans-Himalayan rain-shadow breaches."
          typologyIcon={CloudRain}
          typologies={[
            { id: 'all', label: 'All 24 Monsoon Corridors', count: corridors.length, icon: CloudRain, color: 'teal' },
            { id: 'shivalik', label: 'Windward Shivalik Gates', count: corridors.filter((c) => c.exposureRegime === 'Windward Shivalik Gate').length, icon: Waves, color: 'cyan' },
            { id: 'spillover', label: 'Pir Panjal Spillover Gaps', count: corridors.filter((c) => c.exposureRegime === 'Pir Panjal Spillover').length, icon: Mountain, color: 'amber' },
            { id: 'valley', label: 'Valley Orographic Basins', count: corridors.filter((c) => c.exposureRegime === 'Valley Orographic Basin').length, icon: Droplets, color: 'sky' },
            { id: 'trans-himalaya', label: 'Trans-Himalayan Intrusions', count: corridors.filter((c) => c.exposureRegime === 'Trans-Himalayan Intrusion').length, icon: Compass, color: 'indigo' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => {
            setActiveTypology(id);
            setCurrentPage(1);
            document.getElementById('monsoon-corridor-registry')?.scrollIntoView({ behavior: 'smooth' });
          }}
          showingCount={filteredCorridors.length}
          totalCount={corridors.length}
          entityLabel="monsoon corridors"
          spotlightTitle="Orographic Precipitation Gradients & Poleward Monsoon Shift"
          spotlightSubtitle="Analyzing the sharp precipitation gradient from Reasi/Jammu (>1,400 mm summer rain) across the Pir Panjal crest into Srinagar (~220 mm) and arid Leh/Skardu (<60 mm) — and why rare northward breaches cause catastrophic flash floods."
          tabs={[
            {
              id: 'orographic-barrier',
              label: 'Pir Panjal Barrier & Trans-Himalayan Breaches',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">First Orographic Lift</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Shivalik &amp; Trikuta Windward Front</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Moist 850 hPa southwesterlies from the Arabian Sea and Bay of Bengal monsoon trough slam into the 1,000–2,500m Shivalik and Trikuta ridges, releasing intense convective rainfall across Jammu, Reasi, Kathua, and Mirpur.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <span className="text-xs font-bold text-sky-400 block mb-1">Spillover Corridors</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Banihal, Mughal Road &amp; Syntaxis</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      While the 3,500–4,500m Pir Panjal blocks most low-level moisture, intense monsoon depressions channel moisture through Jhelum/Muzaffarabad syntaxis and Banihal/Kishtwar gorges into South Kashmir and Lidder valleys.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Cryospheric Vulnerability</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Ladakh &amp; Karakoram Intrusions</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Vegetation-sparse desert slopes in Leh, Kargil, Gilgit, and Baltistan lack soil retention; even 25–40 mm of monsoonal spillover rain triggers destructive debris flows and accelerates proglacial lake outbursts.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Monsoon Rainfall & Cloudburst Field Sentinel"
          observeSubtitle="Log intense convective downpours, hill-torrent mud surges, and rainfall gauge totals across windward and rain-shadow districts."
          observeBadge="IMD / PMD Monsoon Watch Protocol"
          protocols={[
            {
              number: '1',
              title: 'Cloudburst & Extreme Downpour Alert (>50 mm/hr)',
              desc: 'Report localized torrential rain cells over steep mountain catchments and pilgrimage/trekking corridors.',
              benchmark: 'Rapid Flash-Flood Escalation Trigger',
              icon: CloudRain,
              color: 'teal',
            },
            {
              number: '2',
              title: 'Nallah & Tributary Turbidity Surge Spotting',
              desc: 'Flag sudden muddy discoloration and woody debris transport in Tawi, Vishaw, Lidder, Neelum, or Shyok tributaries.',
              benchmark: 'Upstream Catchment Runoff Indicator',
              icon: Waves,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Culvert & Cut-Slope Saturation Reporting',
              desc: 'Photograph blocked highway culverts and weeping retaining walls during multi-day monsoon spells.',
              benchmark: 'Highway Slope Failure Prevention',
              icon: Mountain,
              color: 'amber',
            },
            {
              number: '4',
              title: 'Warm High-Altitude Rain on Glaciers',
              desc: 'Document liquid rainfall occurring above 4,000 m over Kolahoi, Nun-Kun, Zanskar, or Hunza glaciers.',
              benchmark: 'Cryospheric Melt & GLOF Early Warning',
              icon: Droplets,
              color: 'sky',
            },
          ]}
        />
      </div>

      {/* Corridor Detail Modal */}
      <AnimatePresence>
        {selectedCorridor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCorridor(null)}
            className="fixed inset-0 z-[2000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                <div>
                  <Badge variant={riskVariant(selectedCorridor.coupledRisk.overall)} size="sm" className="mb-1">
                    {selectedCorridor.coupledRisk.overall} Coupled Hazard Risk
                  </Badge>
                  <h3 className="text-lg font-bold text-white">{selectedCorridor.name}</h3>
                  <p className="text-xs text-slate-400">
                    {selectedCorridor.district} · {selectedCorridor.subRegion} · {selectedCorridor.exposureRegime} ({selectedCorridor.elevation_m} m)
                  </p>
                </div>
                <button type="button" onClick={() => setSelectedCorridor(null)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-emerald-400">Live Observation &amp; 7d Anomaly</div>
                  <div className="flex justify-between"><span>2m Temp / Dew Point:</span> <strong>{selectedCorridor.liveObservation.temp_c}°C / {selectedCorridor.liveObservation.dew_point_c}°C</strong></div>
                  <div className="flex justify-between"><span>850 hPa Moisture (RH):</span> <strong>{selectedCorridor.liveObservation.rh_850hpa_pct}%</strong></div>
                  <div className="flex justify-between"><span>850 hPa Wind Vector:</span> <strong>{selectedCorridor.liveObservation.wind_850hpa_kmh} km/h ({selectedCorridor.liveObservation.wind_850hpa_dir}°)</strong></div>
                  <div className="flex justify-between"><span>Observed Past 7d Rain:</span> <strong>{selectedCorridor.liveObservation.past7d_rain_mm} mm</strong></div>
                  <div className="flex justify-between"><span>Seasonal Weekly Normal:</span> <strong>{selectedCorridor.liveObservation.climatology7d_normal_mm} mm</strong></div>
                  <div className="flex justify-between"><span>Rainfall Anomaly:</span> <strong>{selectedCorridor.liveObservation.anomaly_mm >= 0 ? '+' : ''}{selectedCorridor.liveObservation.anomaly_mm} mm ({selectedCorridor.liveObservation.anomaly_pct >= 0 ? '+' : ''}{selectedCorridor.liveObservation.anomaly_pct}%)</strong></div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/[0.06] border border-sky-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-sky-400">7-Day Numerical Forecast</div>
                  <div className="flex justify-between"><span>7d Total Forecast Rain:</span> <strong>{selectedCorridor.forecast7d.total_rain_mm} mm</strong></div>
                  <div className="flex justify-between"><span>Peak 24h Burst:</span> <strong>{selectedCorridor.forecast7d.peak_daily_mm} mm</strong></div>
                  <div className="flex justify-between"><span>Max Precip Probability:</span> <strong>{selectedCorridor.forecast7d.max_prob_pct}%</strong></div>
                  <div className="flex justify-between"><span>Max Convective CAPE:</span> <strong>{selectedCorridor.forecast7d.max_cape_jkg} J/kg</strong></div>
                  <div className="pt-1 border-t border-white/10 text-[11px] text-slate-300">
                    Exposed System: {selectedCorridor.exposedSystem}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="monsoon-dynamics" />
      </div>
    </main>
  );
}
