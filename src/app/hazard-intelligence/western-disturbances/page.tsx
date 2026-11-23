'use client';

import React, { useState, useMemo } from 'react';
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
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { useWesternDisturbanceIntelligence } from '@/hooks/useWesternDisturbanceIntelligence';
import {
  WDCorridorLiveRecord,
  CompoundRiskLevel,
  WDSubRegion,
} from '@/data/hazard-western-disturbances';
import {
  Wind, CloudRain, Snowflake, Mountain, Waves, BarChart3,
  MapPin, RefreshCw, ChevronRight, ChevronLeft, Compass,
  AlertTriangle, Eye, Thermometer, Gauge, X, ArrowRight
} from 'lucide-react';

function riskVariant(risk: CompoundRiskLevel): 'success' | 'warning' | 'danger' | 'critical' {
  if (risk === 'Critical') return 'critical';
  if (risk === 'High') return 'danger';
  if (risk === 'Moderate') return 'warning';
  return 'success';
}

function phaseBadgeClasses(phase: string): string {
  if (phase === 'Active Passage') return 'bg-red-500/20 text-red-300 border-red-500/35';
  if (phase.startsWith('Approaching')) return 'bg-amber-500/20 text-amber-200 border-amber-500/35';
  if (phase === 'Post-Frontal Clearing') return 'bg-sky-500/20 text-sky-200 border-sky-500/35';
  return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
}

const HAZARD_ROUTE_META: Record<
  'floods' | 'flash-floods' | 'landslides' | 'avalanches',
  { label: string; href: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  floods: { label: 'Floods', href: '/hazard-intelligence/floods', icon: Waves, color: 'text-cyan-400' },
  'flash-floods': { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods', icon: CloudRain, color: 'text-blue-400' },
  landslides: { label: 'Landslides', href: '/hazard-intelligence/landslides', icon: Mountain, color: 'text-amber-400' },
  avalanches: { label: 'Avalanches', href: '/hazard-intelligence/avalanches', icon: Snowflake, color: 'text-sky-300' },
};

function WDCorridorCard({
  record,
  index,
  onSelect,
}: {
  record: WDCorridorLiveRecord;
  index: number;
  onSelect: (r: WDCorridorLiveRecord) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.45) }}
      className="h-full"
    >
      <Card
        onClick={() => onSelect(record)}
        className="glass-intense border-white/10 hover:border-sky-500/35 p-5 h-full flex flex-col gap-3 transition-all cursor-pointer group"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-sky-300 transition-colors">
              {record.name}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
              <span>{record.district} · <strong>{record.subRegion}</strong> · {record.elevation_m} m</span>
            </p>
          </div>
          <Badge variant={riskVariant(record.compoundTriggers.overallRisk)} size="sm" className="text-[10px] flex-shrink-0">
            {record.compoundTriggers.overallRisk} Impact
          </Badge>
        </div>

        {/* Phase Pill */}
        <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold flex items-center justify-between ${phaseBadgeClasses(record.wdPhase)}`}>
          <span>{record.wdPhase}</span>
          <span className="font-mono opacity-85">{record.typical_precip_regime}</span>
        </div>

        {/* Strict Separation: Live Observation vs 7-Day Forecast */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Live Observation Box */}
          <div className="p-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
            <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Observed
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Temp / Cloud</span>
              <span className="font-bold text-white">{record.liveObservation.temp_c}°C · {record.liveObservation.cloud_cover_pct}%</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">MSL Pressure</span>
              <span className="font-mono text-slate-200">{record.liveObservation.pressure_msl_hpa} hPa</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Snowline (0°C)</span>
              <span className="font-mono text-cyan-300">{record.liveObservation.freezing_level_m} m</span>
            </div>
          </div>

          {/* 7-Day Numerical Forecast Box */}
          <div className="p-2.5 rounded-xl bg-sky-500/[0.06] border border-sky-500/20 space-y-1">
            <div className="text-[9px] font-bold uppercase tracking-wider text-sky-400">
              7-Day NWP Forecast
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Total Precip</span>
              <span className="font-bold text-white">{record.forecast7d.total_precip_mm} mm</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Total Snow</span>
              <span className="font-bold text-sky-200">{record.forecast7d.total_snow_cm} cm</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Peak Gust</span>
              <span className="font-mono text-slate-200">{record.forecast7d.max_wind_gust_kmh} km/h</span>
            </div>
          </div>
        </div>

        {/* Coupled Downstream Hazards */}
        <div className="mt-auto pt-2.5 border-t border-white/5">
          <div className="text-[9px] uppercase tracking-wider text-slate-500 mb-1.5">
            Coupled Hazard Pathways
          </div>
          <div className="flex flex-wrap gap-1.5">
            {record.primary_coupled_hazards.map((hz) => {
              const meta = HAZARD_ROUTE_META[hz];
              const Icon = meta.icon;
              return (
                <Link
                  key={hz}
                  href={meta.href}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white transition-colors"
                >
                  <Icon className={`w-2.5 h-2.5 ${meta.color}`} />
                  <span>{meta.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function WesternDisturbancesPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();
  const {
    synopticSummary,
    regionalSummaries,
    corridors,
    loading,
    refreshing,
    refresh,
    updatedAt,
  } = useWesternDisturbanceIntelligence();

  const [subRegionFilter, setSubRegionFilter] = useState<string>('all');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [coupledFilter, setCoupledFilter] = useState<string>('all');
  const [activeTypology, setActiveTypology] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCorridor, setSelectedCorridor] = useState<WDCorridorLiveRecord | null>(null);

  const ITEMS_PER_PAGE = 9;
  const subRegions: WDSubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  const filteredCorridors = useMemo(() => {
    return corridors.filter((c) => {
      const matchSearch =
        filter.searchQuery === '' ||
        c.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        c.subRegion.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        c.orographic_zone.toLowerCase().includes(filter.searchQuery.toLowerCase());

      const matchScope = filter.scope === 'All' || c.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || c.district === filter.district;
      const matchSubRegion = subRegionFilter === 'all' || c.subRegion === subRegionFilter;
      const matchPhase = phaseFilter === 'all' || c.wdPhase === phaseFilter;
      const matchCoupled =
        coupledFilter === 'all' ||
        c.primary_coupled_hazards.includes(coupledFilter as any);

      const matchTypology =
        activeTypology === 'all' ||
        (activeTypology === 'snow-passes' && c.typical_precip_regime === 'Snow-Dominant') ||
        (activeTypology === 'rain-transition' && c.typical_precip_regime === 'Rain-Snow Transition') ||
        (activeTypology === 'frontal-rain' && c.typical_precip_regime === 'Rain-Dominant') ||
        (activeTypology === 'cryosphere' && c.typical_precip_regime === 'Arid Cryosphere');

      return matchSearch && matchScope && matchDistrict && matchSubRegion && matchPhase && matchCoupled && matchTypology;
    });
  }, [corridors, filter, subRegionFilter, phaseFilter, coupledFilter, activeTypology]);

  const totalPages = Math.ceil(filteredCorridors.length / ITEMS_PER_PAGE);
  const paginatedCorridors = filteredCorridors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const extraActiveCount = [subRegionFilter, phaseFilter, coupledFilter].filter((x) => x !== 'all').length;
  const scopeCount = filter.scope === 'All' ? 0 : corridors.filter((c) => c.scope === filter.scope).length;

  const syncLabel = updatedAt
    ? new Date(updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : 'Live';

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence · Atmospheric Systems"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Western Disturbances' },
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
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Western Disturbances
            </span>
          </>
        }
        subtitle="Synoptic extratropical storm tracking, Subtropical Westerly Jet diagnostics, 7-day precipitation & snowline forecasts, and multi-hazard coupling across Kashmir, Jammu, Ladakh, Azad Kashmir, Gilgit, and Baltistan."
        icon={<Wind className="w-6 h-6 text-sky-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-sky-600 to-cyan-600 font-bold text-white shadow-lg shadow-sky-950/40"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/western-disturbances/dashboard')}
            >
              Open WD Monitoring Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Compass className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/dashboards')}
            >
              All Hazard Dashboards
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip
        kpis={[
          { label: 'Monitored Corridors', value: corridors.length || 31, icon: 'MapPin', color: 'text-sky-400' },
          { label: 'Sub-Regions Covered', value: 6, icon: 'Globe', color: 'text-cyan-400' },
          { label: 'Active WD Passages', value: loading ? '...' : synopticSummary?.activePassageCount ?? 0, icon: 'Wind', color: 'text-red-400' },
          { label: '7d Watch Corridors', value: loading ? '...' : synopticSummary?.approachingWaveCount ?? 0, icon: 'Eye', color: 'text-amber-400' },
          { label: '300 hPa Jet Core', value: loading ? '...' : `${synopticSummary?.maxJetCoreKmh ?? 95} km/h`, icon: 'Zap', color: 'text-indigo-400' },
          { label: 'Mean Snowline (0°C)', value: loading ? '...' : `${synopticSummary?.meanFreezingLevelM ?? 3400} m`, icon: 'Snowflake', color: 'text-cyan-300' },
          { label: 'Peak 7d Precip', value: loading ? '...' : `${synopticSummary?.peak7dPrecipMm ?? 0} mm`, icon: 'CloudRain', color: 'text-blue-400' },
          { label: 'Last Sync', value: loading ? '...' : syncLabel, icon: 'Clock', color: 'text-emerald-400' },
        ]}
        iconColor="text-sky-400"
      />

      {/* ── LIVE SYNOPTIC STATUS + PROVENANCE BANNER ─────────────────────── */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-sky-500/25 p-4 bg-gradient-to-r from-sky-950/30 via-slate-900 to-slate-950">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center flex-shrink-0">
                <Wind className="w-6 h-6 text-sky-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Atmospheric Systems · Synoptic Westerly Wave Engine
                  </span>
                  <Badge variant="success" size="sm" className="text-[9px]">Live Observation</Badge>
                  <Badge variant="info" size="sm" className="text-[9px]">7-Day NWP Forecast</Badge>
                  <Badge variant="warning" size="sm" className="text-[9px]">IMD &amp; PMD Advisories Linked</Badge>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  {synopticSummary?.headline || 'Synchronizing Mediterranean–Caspian–Hindu Kush 500 hPa synoptic trough telemetry...'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                onClick={() => router.push('/hazard-intelligence/western-disturbances/dashboard')}
              >
                8-Tab Monitoring Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={refresh}
                disabled={refreshing}
                className="text-xs border-white/15 text-slate-200"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Syncing...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* ── COMPOUND MULTI-HAZARD TRIGGER STRIP (Floods, Flash Floods, Landslides, Avalanches) */}
      <section className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              key: 'floods' as const,
              title: 'Riverine Flood Coupling',
              risk: synopticSummary?.compoundCoupling.floods || 'Low',
              driver: 'Basin-wide liquid rain + warm freezing level (>2,800m)',
              href: '/hazard-intelligence/floods',
              icon: Waves,
              accent: 'text-cyan-400',
            },
            {
              key: 'flashFloods' as const,
              title: 'Flash Flood Coupling',
              risk: synopticSummary?.compoundCoupling.flashFloods || 'Low',
              driver: 'Orographic rain bursts & rain-on-snow melt surges',
              href: '/hazard-intelligence/flash-floods',
              icon: CloudRain,
              accent: 'text-blue-400',
            },
            {
              key: 'landslides' as const,
              title: 'Slope & Landslide Coupling',
              risk: synopticSummary?.compoundCoupling.landslides || 'Low',
              driver: 'Cumulative moisture on NH-44, KKH & Neelum cut-slopes',
              href: '/hazard-intelligence/landslides',
              icon: Mountain,
              accent: 'text-amber-400',
            },
            {
              key: 'avalanches' as const,
              title: 'Avalanche Coupling',
              risk: synopticSummary?.compoundCoupling.avalanches || 'Low',
              driver: 'High-altitude snowfall + 300 hPa ridge wind-slab loading',
              href: '/hazard-intelligence/avalanches',
              icon: Snowflake,
              accent: 'text-sky-300',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.key} href={item.href} className="group">
                <Card className="glass-intense border-white/10 hover:border-sky-500/35 p-3.5 h-full transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${item.accent}`} />
                      <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <Badge variant={riskVariant(item.risk)} size="sm" className="text-[9px]">
                      {item.risk}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.driver}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 6-SUBREGION QUICK SUMMARY BAR ────────────────────────────────── */}
      {regionalSummaries.length > 0 && (
        <section className="container mx-auto px-6 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {regionalSummaries.map((sr) => {
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
                      ? 'bg-sky-500/15 border-sky-400/50 shadow-lg'
                      : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white">{sr.subRegion}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sr.corridorCount}u</span>
                  </div>
                  <div className="text-[10px] text-emerald-300 mt-1">
                    Live: {sr.liveAvgTempC}°C · {sr.liveAvgCloudPct}% cld
                  </div>
                  <div className="text-[10px] text-sky-300">
                    7d Fcst: {sr.forecastMax7dPrecipMm}mm · {sr.forecastMax7dSnowCm}cm
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── GLOBAL FILTER BAR ────────────────────────────────────────────── */}
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
                value={phaseFilter}
                onChange={(v) => { setPhaseFilter(v); setCurrentPage(1); }}
                placeholder="WD Synoptic Phase"
                options={[
                  { value: 'Active Passage', label: 'Active Passage' },
                  { value: 'Approaching Wave (48–96h)', label: 'Approaching Wave (48–96h)' },
                  { value: 'Post-Frontal Clearing', label: 'Post-Frontal Clearing' },
                  { value: 'Quiescent Ridge', label: 'Quiescent Ridge' },
                ]}
              />
              <FilterSelect
                value={coupledFilter}
                onChange={(v) => { setCoupledFilter(v); setCurrentPage(1); }}
                placeholder="Coupled Hazard"
                options={[
                  { value: 'floods', label: 'Triggers Floods' },
                  { value: 'flash-floods', label: 'Triggers Flash Floods' },
                  { value: 'landslides', label: 'Triggers Landslides' },
                  { value: 'avalanches', label: 'Triggers Avalanches' },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setSubRegionFilter('all');
            setPhaseFilter('all');
            setCoupledFilter('all');
          }}
        />
      </div>

      {/* ── MODULE SCOPE ROW ─────────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredCorridors.length}
        totalCount={corridors.length || 31}
        entityLabel="orographic corridors"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Corridors')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── CORRIDOR REGISTRY GRID / LIST ────────────────────────────────── */}
      <section id="wd-corridor-registry" className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {loading && corridors.length === 0 ? (
            <div className="py-24 text-center text-slate-400 glass-intense border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-sky-400" />
              <p className="text-sm font-medium text-white">Synchronizing 31 Himalayan Orographic Corridors...</p>
              <p className="text-xs text-slate-400 mt-1">Separating live synoptic observations from 7-day numerical weather predictions</p>
            </div>
          ) : filteredCorridors.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Wind className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No corridors match current filters</div>
              <div className="text-sm text-slate-400">Adjust region, scope, or synoptic phase filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCorridors.map((c, idx) => (
                <WDCorridorCard key={c.id} record={c} index={idx} onSelect={setSelectedCorridor} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedCorridors.map((c) => (
                <Card
                  key={c.id}
                  onClick={() => setSelectedCorridor(c)}
                  className="glass-intense border-white/10 hover:border-sky-500/35 p-4 cursor-pointer transition-all"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="min-w-[210px] flex-1">
                      <div className="text-sm font-bold text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {c.district} · <strong>{c.subRegion}</strong> · {c.elevation_m} m
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded border text-[10px] font-semibold ${phaseBadgeClasses(c.wdPhase)}`}>
                      {c.wdPhase}
                    </div>
                    <div className="text-xs text-emerald-300 font-mono">
                      Obs: {c.liveObservation.temp_c}°C · {c.liveObservation.pressure_msl_hpa} hPa
                    </div>
                    <div className="text-xs text-sky-300 font-mono">
                      7d Fcst: {c.forecast7d.total_precip_mm}mm / {c.forecast7d.total_snow_cm}cm
                    </div>
                    <Badge variant={riskVariant(c.compoundTriggers.overallRisk)} size="sm" className="text-[10px]">
                      {c.compoundTriggers.overallRisk}
                    </Badge>
                    <Button variant="outline" size="sm" className="text-xs border-white/10 ml-auto" icon={<ChevronRight className="w-3 h-3" />}>
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-center items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <span className="text-sm text-slate-400">
                Page <strong className="text-white">{currentPage}</strong> of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── ATMOSPHERIC REGIMES & CITIZEN METEOROLOGICAL PROTOCOLS (Below Pagination) */}
      <div className="container mx-auto px-6 pb-8">
        <EnvironmentalObserveSpotlight
          typologyTitle="Western Disturbance Orographic Regimes & Moisture Pathways"
          typologySubtitle="Filter corridors by winter snowpack accumulation passes, rain-snow transition valleys, frontal foothill belts, or leeward cold-desert basins."
          typologyIcon={Wind}
          typologies={[
            { id: 'all', label: 'All 31 Orographic Corridors', count: corridors.length, icon: Wind, color: 'sky' },
            { id: 'snow-passes', label: 'Alpine Snow-Dominant Passes', count: corridors.filter((c) => c.typical_precip_regime === 'Snow-Dominant').length, icon: Snowflake, color: 'cyan' },
            { id: 'rain-transition', label: 'Rain–Snow Transition Valleys', count: corridors.filter((c) => c.typical_precip_regime === 'Rain-Snow Transition').length, icon: Thermometer, color: 'indigo' },
            { id: 'frontal-rain', label: 'Frontal Rain & Cut-Slope Gorges', count: corridors.filter((c) => c.typical_precip_regime === 'Rain-Dominant').length, icon: CloudRain, color: 'amber' },
            { id: 'cryosphere', label: 'Trans-Himalayan Arid Cryosphere', count: corridors.filter((c) => c.typical_precip_regime === 'Arid Cryosphere').length, icon: Mountain, color: 'teal' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => {
            setActiveTypology(id);
            setCurrentPage(1);
            document.getElementById('wd-corridor-registry')?.scrollIntoView({ behavior: 'smooth' });
          }}
          showingCount={filteredCorridors.length}
          totalCount={corridors.length}
          entityLabel="orographic corridors"
          spotlightTitle="Extratropical Synoptic Dynamics & Compound Hazard Cascades"
          spotlightSubtitle="How mid-latitude upper-tropospheric troughs in the Subtropical Westerly Jet govern winter water security and multi-hazard emergencies across the Western Himalayas."
          tabs={[
            {
              id: 'synoptic-mechanics',
              label: 'Subtropical Westerly Jet & Orographic Locking',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <span className="text-xs font-bold text-sky-400 block mb-1">Cyclogenesis &amp; Moisture</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Mediterranean to Arabian Sea</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Baroclinic waves originating over the Mediterranean and Caspian seas propagate eastward along the 300 hPa Subtropical Westerly Jet, entraining secondary moisture from the Persian Gulf and Arabian Sea before striking the Hindu Kush and Pir Panjal.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Zero-Degree Isotherm</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Freezing-Level Phase Partitioning</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      When the 0°C freezing level stays above 2,600 m, precipitation falls as intense rain on mid-elevation snowpack — triggering rapid rain-on-snow flash floods and NH-44 / KKH debris flows. Below 1,800 m, valley-floor blizzards dominate.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Cryospheric Water Budget</span>
                    <h5 className="text-sm font-semibold text-white mb-2">65–80% of Winter Accumulation</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Western Disturbances supply the majority of winter snow accumulation feeding Jhelum, Chenab, and Upper Indus glaciers (Karakoram Anomaly); weak WD winters directly cause spring springshed and irrigation deficits.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Hydrometeorological & Snowline Field Reporting"
          observeSubtitle="Log real-time rain-to-snow transition altitudes, fresh snow depth on mountain passes, or highway rockfall triggers during active WD passages."
          observeBadge="WMO / IMD Citizen Weather Protocol"
          protocols={[
            {
              number: '1',
              title: 'Snowline & Rain–Snow Transition Logging',
              desc: 'Report exact village/pass elevation where rainfall transitions to sleet or wet snow during approaching Western Disturbances.',
              benchmark: 'Validates NWP 0°C Freezing-Level Isotherm',
              icon: Snowflake,
              color: 'sky',
            },
            {
              number: '2',
              title: '24-Hour Fresh Snowfall & Rain Gauge Entry',
              desc: 'Measure fresh snow board depth (cm) or standardized rain gauge accumulation (mm) at 08:30 local synoptic hour.',
              benchmark: 'IMD / PMD 03:00 UTC Synoptic Standard',
              icon: CloudRain,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Orographic Gale & Chinar/Orchard Wind Damage',
              desc: 'Document pre-frontal squall gusts, downed power lines, or orchard limb damage along Pir Panjal foothill corridors.',
              benchmark: 'Beaufort Scale / Gust Impact Log',
              icon: Wind,
              color: 'indigo',
            },
            {
              number: '4',
              title: 'Compound Highway Cut-Slope Seepage Watch',
              desc: 'Flag active water seepage and mud-slurry initiation along NH-44 (Ramban), Mughal Road, Neelum, or KKH slopes.',
              benchmark: 'Multi-Hazard Early Escalation Trigger',
              icon: Mountain,
              color: 'amber',
            },
          ]}
        />
      </div>

      {/* ── CORRIDOR DETAIL MODAL ────────────────────────────────────────── */}
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
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant={riskVariant(selectedCorridor.compoundTriggers.overallRisk)} size="sm">
                      {selectedCorridor.compoundTriggers.overallRisk} Compound Risk
                    </Badge>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${phaseBadgeClasses(selectedCorridor.wdPhase)}`}>
                      {selectedCorridor.wdPhase}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedCorridor.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedCorridor.district} · {selectedCorridor.subRegion} ({selectedCorridor.scope}) · Elev {selectedCorridor.elevation_m} m
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCorridor(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Live Observation vs Forecast Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Live Observation (Current UTC Analysis)
                  </div>
                  <div className="flex justify-between"><span>Temperature:</span> <strong>{selectedCorridor.liveObservation.temp_c}°C</strong></div>
                  <div className="flex justify-between"><span>Relative Humidity:</span> <strong>{selectedCorridor.liveObservation.humidity_pct}%</strong></div>
                  <div className="flex justify-between"><span>MSL Pressure (24h Δ):</span> <strong>{selectedCorridor.liveObservation.pressure_msl_hpa} hPa ({selectedCorridor.liveObservation.pressure_24h_delta_hpa >= 0 ? '+' : ''}{selectedCorridor.liveObservation.pressure_24h_delta_hpa})</strong></div>
                  <div className="flex justify-between"><span>500 hPa Geopotential:</span> <strong>{selectedCorridor.liveObservation.z500_gpm} gpm</strong></div>
                  <div className="flex justify-between"><span>300 hPa Jet Core:</span> <strong>{selectedCorridor.liveObservation.jet300_kmh} km/h</strong></div>
                  <div className="flex justify-between"><span>Freezing Level (0°C):</span> <strong>{selectedCorridor.liveObservation.freezing_level_m} m</strong></div>
                  <div className="flex justify-between"><span>Past 48h Precip / Snow:</span> <strong>{selectedCorridor.liveObservation.past48h_precip_mm} mm / {selectedCorridor.liveObservation.past48h_snow_cm} cm</strong></div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/[0.06] border border-sky-500/25 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    7-Day Numerical Forecast (ECMWF / GFS)
                  </div>
                  <div className="flex justify-between"><span>7d Total Precip:</span> <strong>{selectedCorridor.forecast7d.total_precip_mm} mm</strong></div>
                  <div className="flex justify-between"><span>7d Liquid Rain:</span> <strong>{selectedCorridor.forecast7d.total_rain_mm} mm</strong></div>
                  <div className="flex justify-between"><span>7d Snowfall:</span> <strong>{selectedCorridor.forecast7d.total_snow_cm} cm</strong></div>
                  <div className="flex justify-between"><span>Peak Daily Burst:</span> <strong>{selectedCorridor.forecast7d.peak_daily_precip_mm} mm ({selectedCorridor.forecast7d.peak_precip_date || '—'})</strong></div>
                  <div className="flex justify-between"><span>Max Precip Prob:</span> <strong>{selectedCorridor.forecast7d.max_precip_prob_pct}%</strong></div>
                  <div className="flex justify-between"><span>Min Forecast Snowline:</span> <strong>{selectedCorridor.forecast7d.min_freezing_level_m} m</strong></div>
                  <div className="flex justify-between"><span>Peak Surface Gust:</span> <strong>{selectedCorridor.forecast7d.max_wind_gust_kmh} km/h</strong></div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Exposed Critical Infrastructure</div>
                <div className="text-slate-200">{selectedCorridor.key_infrastructure_exposed}</div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {selectedCorridor.primary_coupled_hazards.map((hz) => {
                    const meta = HAZARD_ROUTE_META[hz];
                    return (
                      <Link
                        key={hz}
                        href={meta.href}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium"
                      >
                        Open {meta.label} Module →
                      </Link>
                    );
                  })}
                </div>
                <Button
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                  onClick={() => router.push('/hazard-intelligence/western-disturbances/dashboard')}
                >
                  Full Analytics Dashboard
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RELATED HAZARD INTELLIGENCE ──────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="western-disturbances" />
      </div>
    </main>
  );
}
