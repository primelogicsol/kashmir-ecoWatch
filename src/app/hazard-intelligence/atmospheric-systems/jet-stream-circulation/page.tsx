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
  JetSectorLiveRecord,
  JetSubRegion,
} from '@/data/hazard-jet-stream-circulation';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Compass, Wind, CloudRain, Snowflake, Mountain, Gauge, BarChart3,
  MapPin, RefreshCw, ChevronLeft, ChevronRight, X, History, ArrowRight
} from 'lucide-react';

function regimeBadgeClass(regime: JetSectorLiveRecord['circulationRegime']): string {
  if (regime === 'Jet Core Overhead (≥130 km/h)') return 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40';
  if (regime === '500 hPa Cyclonic Trough') return 'bg-red-500/20 text-red-200 border-red-400/40';
  if (regime === 'Upper-Level Blocking Ridge') return 'bg-amber-500/20 text-amber-200 border-amber-400/40';
  if (regime === 'Not Assessed') return 'bg-slate-800 text-slate-400 border-white/15';
  return 'bg-sky-500/15 text-sky-200 border-sky-400/30';
}

function fmt(v: number | null | undefined, s = ''): string {
  return v === null || v === undefined || Number.isNaN(v) ? '—' : `${v}${s}`;
}

const COUPLED_LINKS: Record<
  'western-disturbances' | 'monsoon-dynamics' | 'avalanches' | 'air-pollution',
  { label: string; href: string; color: string }
> = {
  'western-disturbances': {
    label: 'Western Disturbances',
    href: '/hazard-intelligence/atmospheric-systems/western-disturbances',
    color: 'text-sky-400',
  },
  'monsoon-dynamics': {
    label: 'Monsoon Dynamics',
    href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics',
    color: 'text-teal-400',
  },
  avalanches: {
    label: 'Avalanches',
    href: '/hazard-intelligence/avalanches',
    color: 'text-cyan-300',
  },
  'air-pollution': {
    label: 'Air Quality & Inversion',
    href: '/environmental-monitoring/air-pollution',
    color: 'text-amber-400',
  },
};

export default function JetStreamCirculationPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [subRegionFilter, setSubRegionFilter] = useState<string>('all');
  const [regimeFilter, setRegimeFilter] = useState<string>('all');
  const [coupledFilter, setCoupledFilter] = useState<string>('all');
  const [activeTypology, setActiveTypology] = useState<string>('all');
  const [diagTab, setDiagTab] = useState<'transect' | 'z500' | 'history'>('transect');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSector, setSelectedSector] = useState<JetSectorLiveRecord | null>(null);

  const fetchTelemetry = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(`/api/hazard-intelligence/jet-stream-circulation${force ? '?refresh=1' : ''}`, {
        cache: 'no-store',
      });
      const json = await res.json();
      if (json.success) setData(json);
    } catch {}
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry(false);
  }, [fetchTelemetry]);

  const sectors: JetSectorLiveRecord[] = data?.sectors || [];
  const subRegions: JetSubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  const filteredSectors = useMemo(() => {
    return sectors.filter((s) => {
      const matchSearch =
        filter.searchQuery === '' ||
        s.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        s.subRegion.toLowerCase().includes(filter.searchQuery.toLowerCase());

      const matchScope = filter.scope === 'All' || s.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || s.district === filter.district;
      const matchSubRegion = subRegionFilter === 'all' || s.subRegion === subRegionFilter;
      const matchRegime = regimeFilter === 'all' || s.circulationRegime === regimeFilter;
      const matchCoupled = coupledFilter === 'all' || s.coupledModules.includes(coupledFilter as any);

      const matchTypology =
        activeTypology === 'all' ||
        (activeTypology === 'jet-core' && (s.liveUpperAir.jet250_kmh ?? 0) >= 120) ||
        (activeTypology === 'troughs' && s.circulationRegime === '500 hPa Cyclonic Trough') ||
        (activeTypology === 'ridges' && s.circulationRegime === 'Upper-Level Blocking Ridge') ||
        (activeTypology === 'high-passes' && s.elevation_m >= 3000);

      return matchSearch && matchScope && matchDistrict && matchSubRegion && matchRegime && matchCoupled && matchTypology;
    });
  }, [sectors, filter, subRegionFilter, regimeFilter, coupledFilter, activeTypology]);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredSectors.length / ITEMS_PER_PAGE);
  const paginatedSectors = filteredSectors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const mapMarkers: AtmosphericMapMarker[] = useMemo(() => {
    return filteredSectors.map((s) => {
      const color =
        s.circulationRegime === '500 hPa Cyclonic Trough'
          ? '#ef4444'
          : s.circulationRegime === 'Jet Core Overhead (≥130 km/h)'
            ? '#818cf8'
            : s.circulationRegime === 'Upper-Level Blocking Ridge'
              ? '#f59e0b'
              : '#38bdf8';
      return {
        id: s.id,
        title: s.name,
        subtitle: `${s.district} · ${s.subRegion} (${s.administrativeUnit}) · ${s.elevation_m}m`,
        lat: s.latitude,
        lon: s.longitude,
        color,
        radius: (s.liveUpperAir.jet250_kmh ?? 0) >= 130 ? 9.5 : 8,
        liveSummary: `250hPa Jet: ${fmt(s.liveUpperAir.jet250_kmh, ' km/h')} · Z500: ${fmt(s.liveUpperAir.z500_gpm, ' gpm')} (${s.liveUpperAir.z500_departure_gpm !== null ? `${s.liveUpperAir.z500_departure_gpm >= 0 ? '+' : ''}${s.liveUpperAir.z500_departure_gpm}` : '—'} vs clim)`,
        forecastSummary: `7d Peak 250hPa Jet: ${fmt(s.forecast7d.peak_jet250_kmh, ' km/h')} · Min Z500: ${fmt(s.forecast7d.min_z500_gpm, ' gpm')}`,
      };
    });
  }, [filteredSectors]);

  const transectCoords: [number, number][] | undefined = useMemo(() => {
    if (!data?.meridionalProfile?.length) return undefined;
    return data.meridionalProfile.map((p: any) => [p.latitude, 75.0]);
  }, [data]);

  const cs = data?.circulationSummary;
  const syncShort = data?.meta?.updatedAt
    ? `${new Date(data.meta.updatedAt).toISOString().slice(5, 16).replace('T', ' ')}Z`
    : 'Syncing';

  const extraActiveCount = [subRegionFilter, regimeFilter, coupledFilter].filter((x) => x !== 'all').length;
  const scopeCount = filter.scope === 'All' ? 0 : sectors.filter((s) => s.scope === filter.scope).length;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence · Atmospheric Systems"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Atmospheric Systems', href: '/hazard-intelligence/atmospheric-systems' },
          { label: 'Jet Stream & Atmospheric Circulation' },
        ]}
        title={
          <>
            <span className="block leading-[1.12] overflow-visible pb-1 sm:pb-2">Subtropical Westerly</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-300 bg-clip-text text-transparent">
              Jet Stream &amp; Circulation
            </span>
          </>
        }
        subtitle="45-node 2D gridded Subtropical Westerly Jet (SWJ) axis detection (24°N–40°N × 70°E–80°E), ERA5-calibrated 500 hPa geopotential height departures, cyclonic troughs, blocking ridges, and shear across all 6 sub-regions."
        icon={<Compass className="w-6 h-6 text-indigo-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems/jet-stream-circulation/dashboard')}
            >
              Open 8-Tab Jet Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Wind className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems')}
            >
              Atmospheric Systems Hub
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
          '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Reporting / Configured', value: loading ? '...' : `${cs?.reportingSectors ?? '—'}/${cs?.configuredSectors ?? 24}`, icon: 'MapPin', color: 'text-indigo-400' },
          { label: 'SWJ Axis (2D Grid)', value: loading ? '...' : cs?.jetCoreLatitudeDeg !== null && cs?.jetCoreLatitudeDeg !== undefined ? `${cs.jetCoreLatitudeDeg}°N` : 'Not Assessed', icon: 'Compass', color: 'text-violet-400' },
          { label: '250hPa Peak Core', value: loading ? '...' : cs?.jetCoreSpeedKmh !== null && cs?.jetCoreSpeedKmh !== undefined ? `${cs.jetCoreSpeedKmh} km/h` : 'Unavailable', icon: 'Wind', color: 'text-sky-400' },
          { label: 'Mean 500hPa Height', value: loading ? '...' : cs?.mean500hPaHeightGpm !== null && cs?.mean500hPaHeightGpm !== undefined ? `${cs.mean500hPaHeightGpm} gpm` : 'Unavailable', icon: 'Gauge', color: 'text-emerald-400' },
          { label: 'Mean Z500 Departure', value: loading ? '...' : cs?.mean500hPaDepartureGpm !== null && cs?.mean500hPaDepartureGpm !== undefined ? `${cs.mean500hPaDepartureGpm >= 0 ? '+' : ''}${cs.mean500hPaDepartureGpm} gpm` : '—', icon: 'TrendingUp', color: 'text-cyan-300' },
          { label: 'Cyclonic Troughs', value: loading ? '...' : cs?.troughSectorCount === null || cs?.troughSectorCount === undefined ? 'Not Assessed' : cs.troughSectorCount, icon: 'AlertTriangle', color: 'text-red-400' },
          { label: 'Blocking Ridges', value: loading ? '...' : cs?.ridgeSectorCount === null || cs?.ridgeSectorCount === undefined ? 'Not Assessed' : cs.ridgeSectorCount, icon: 'Layers', color: 'text-amber-400' },
          { label: 'Synced (UTC)', value: loading ? '...' : syncShort, icon: 'Clock', color: 'text-emerald-300' },
        ]}
        iconColor="text-indigo-400"
      />

      {/* Provenance & Gridded SWJ Detection Banner */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-indigo-500/25 p-4 bg-gradient-to-r from-indigo-950/35 via-slate-900 to-slate-950 space-y-2">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  45-Node Gridded SWJ Axis &amp; Climatological Z₅₀₀ Feature Detector
                </span>
                <Badge variant="info" size="sm" className="text-[9px]">Model Analysis (0h UTC)</Badge>
                <Badge variant="success" size="sm" className="text-[9px]">Derived Index (Parabolic u₂₅₀ Peak)</Badge>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                {cs
                  ? `${cs.dominantPattern} — Gridded SWJ axis (70°E–80°E zonal mean u₂₅₀): ${cs.jetCoreLatitude}; domain max 250 hPa streak ${fmt(cs.domainPeak250Kmh, ' km/h')} at ${cs.domainPeakCoords || '—'}.`
                  : 'Synchronizing 45-node 2D 250 hPa zonal wind grid and 500 hPa climatological departures...'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                onClick={() => router.push('/hazard-intelligence/atmospheric-systems/jet-stream-circulation/dashboard')}
              >
                8-Tab Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchTelemetry(true)}
                disabled={refreshing}
                className="text-xs border-white/15 text-slate-200"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Syncing...' : 'Refresh'}
              </Button>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400 flex flex-wrap justify-between gap-2">
            <span>Valid UTC: <strong className="text-slate-200">{cs?.validTimeUtc?.slice(0, 16).replace('T', ' ') || '—'} UTC</strong></span>
            <span>Init Cycle: <strong className="text-slate-200">{data?.meta?.modelRunInitUtc?.slice(0, 16).replace('T', ' ') || '—'} UTC</strong></span>
            <span>Units Verified: <strong className="text-emerald-300">{data?.meta?.unitValidationPassed ? 'gpm (m), km/h, °C PASS' : 'Checking'}</strong></span>
          </div>
        </Card>
      </section>

      {/* Interactive GIS + Gridded Zonal-Mean Jet Profile */}
      <section className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6">
            <AtmosphericSystemsMap
              markers={mapMarkers}
              polylineCoords={transectCoords}
              polylineColor="#818cf8"
              legendItems={[
                { color: '#818cf8', label: 'Jet Core (≥130 km/h)' },
                { color: '#ef4444', label: 'Cyclonic Trough (ΔZ≤-40)' },
                { color: '#f59e0b', label: 'Blocking Ridge (ΔZ≥+60)' },
                { color: '#38bdf8', label: 'Zonal Westerlies' },
              ]}
              onSelectMarker={(id) => {
                const found = sectors.find((s) => s.id === id);
                if (found) setSelectedSector(found);
              }}
            />
          </div>

          <Card className="lg:col-span-6 glass-intense border-white/10 p-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    45-Node Gridded Domain (70°E–80°E Zonal Mean)
                  </span>
                  <h2 className="text-base font-bold text-white">
                    {diagTab === 'transect'
                      ? 'Zonal-Mean u₂₅₀ Westerly Component & 300 hPa Speed (24°N → 40°N)'
                      : diagTab === 'z500'
                        ? 'Regional Peak 250 hPa Wind & Mean Z₅₀₀ Departure'
                        : 'Verified Historical Circulation & Rossby Wave Shifts'}
                  </h2>
                </div>
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[11px]">
                  <button type="button" onClick={() => setDiagTab('transect')} className={`px-2.5 py-1 rounded font-semibold ${diagTab === 'transect' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                    2D SWJ Profile
                  </button>
                  <button type="button" onClick={() => setDiagTab('z500')} className={`px-2.5 py-1 rounded font-semibold ${diagTab === 'z500' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                    Regional
                  </button>
                  <button type="button" onClick={() => setDiagTab('history')} className={`px-2.5 py-1 rounded font-semibold ${diagTab === 'history' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                    Archive
                  </button>
                </div>
              </div>

              {diagTab === 'transect' && (
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data?.meridionalProfile || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                      <XAxis dataKey="latLabel" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} />
                      <Legend />
                      <Area type="monotone" dataKey="zonalMeanU250Kmh" name="Zonal-Mean u250 Westerly (km/h)" stroke="#818cf8" fill="#4f46e5" fillOpacity={0.32} />
                      <Area type="monotone" dataKey="zonalMeanSpeed300Kmh" name="Zonal-Mean 300 hPa Speed (km/h)" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {diagTab === 'z500' && (
                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.regionalSummaries || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                      <XAxis dataKey="subRegion" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} />
                      <Legend />
                      <Bar dataKey="maxJet250Kmh" name="Peak 250 hPa Jet (km/h)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="meanZ500DepartureGpm" name="Mean Z500 Departure vs Norm (gpm)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {diagTab === 'history' && (
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {(data?.historicalRecords || []).map((hr: any) => (
                    <div key={hr.id} className="p-3 rounded-xl bg-slate-950/80 border border-purple-500/25 space-y-1">
                      <div className="text-[10px] font-mono text-purple-300 flex items-center gap-1">
                        <History className="w-3 h-3" /> {hr.period}
                      </div>
                      <div className="text-xs font-bold text-white">{hr.title}</div>
                      <p className="text-[11px] text-slate-300 leading-snug">{hr.mechanism}</p>
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

      {/* 6-Subregion Quick Filter Bar */}
      {data?.regionalSummaries && (
        <section className="container mx-auto px-6 mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {data.regionalSummaries.map((sr: any) => {
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
                    active ? 'bg-indigo-500/15 border-indigo-400/50 shadow-lg' : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white">{sr.subRegion}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sr.reportingSectors}/{sr.sectors}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 truncate">{sr.administrativeUnit}</div>
                  <div className="text-[10px] text-indigo-300 mt-0.5">
                    250 Jet: {fmt(sr.maxJet250Kmh, ' km/h')}
                  </div>
                  <div className="text-[10px] text-emerald-300">
                    Z500: {fmt(sr.meanZ500Gpm)} ({sr.meanZ500DepartureGpm !== null ? `${sr.meanZ500DepartureGpm >= 0 ? '+' : ''}${sr.meanZ500DepartureGpm}` : '—'})
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
                placeholder="Circulation Regime"
                options={[
                  { value: 'Jet Core Overhead (≥130 km/h)', label: 'Jet Core Overhead (≥130 km/h)' },
                  { value: '500 hPa Cyclonic Trough', label: '500 hPa Cyclonic Trough' },
                  { value: 'Upper-Level Blocking Ridge', label: 'Upper-Level Blocking Ridge' },
                  { value: 'Moderate Zonal Westerlies', label: 'Moderate Zonal Westerlies' },
                ]}
              />
              <FilterSelect
                value={coupledFilter}
                onChange={(v) => { setCoupledFilter(v); setCurrentPage(1); }}
                placeholder="Coupled System"
                options={[
                  { value: 'western-disturbances', label: 'Western Disturbances' },
                  { value: 'monsoon-dynamics', label: 'Monsoon Dynamics' },
                  { value: 'avalanches', label: 'Avalanches' },
                  { value: 'air-pollution', label: 'Air Quality & Inversion' },
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
        filteredCount={filteredSectors.length}
        totalCount={sectors.length || 24}
        entityLabel="circulation sectors"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Sectors')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      <section id="jet-sector-registry" className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {loading && sectors.length === 0 ? (
            <div className="py-20 text-center glass-intense border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-indigo-400" />
              <p className="text-sm font-semibold text-white">Validating 45-Node 2D SWJ Grid &amp; 24 Circulation Sectors...</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedSectors.map((s) => (
                <Card
                  key={s.id}
                  onClick={() => setSelectedSector(s)}
                  className="glass-intense border-white/10 hover:border-indigo-500/40 p-5 flex flex-col gap-3 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-300">{s.name}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span>{s.district} · <strong>{s.subRegion}</strong> ({s.administrativeUnit}) · {s.elevation_m}m</span>
                      </p>
                    </div>
                    <Badge variant="info" size="sm" className="text-[10px] font-mono shrink-0">
                      {fmt(s.liveUpperAir.jet250_kmh, ' km/h')}
                    </Badge>
                  </div>

                  <div className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold space-y-0.5 ${regimeBadgeClass(s.circulationRegime)}`}>
                    <div className="flex items-center justify-between">
                      <span>{s.circulationRegime}</span>
                      <span className="font-mono">{fmt(s.liveUpperAir.jet250_dir_deg, '°')}</span>
                    </div>
                    <div className="text-[9px] font-normal opacity-85 truncate">{s.regimeEvidence}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-emerald-400">0h Model Analysis</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">250 / 300 Jet</span>
                        <span className="font-bold text-white">{fmt(s.liveUpperAir.jet250_kmh)} / {fmt(s.liveUpperAir.jet300_kmh)}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Z500 (Dep)</span>
                        <span className="font-mono text-slate-200">
                          {fmt(s.liveUpperAir.z500_gpm)} ({s.liveUpperAir.z500_departure_gpm !== null ? `${s.liveUpperAir.z500_departure_gpm >= 0 ? '+' : ''}${s.liveUpperAir.z500_departure_gpm}` : '—'})
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">500 hPa Temp</span>
                        <span className="font-mono text-cyan-300">{fmt(s.liveUpperAir.temp500_c, '°C')}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-500/[0.06] border border-sky-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-sky-400">168h NWP Forecast</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Peak 250 Jet</span>
                        <span className="font-bold text-white">{fmt(s.forecast7d.peak_jet250_kmh, ' km/h')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Min Z500</span>
                        <span className="font-mono text-sky-200">{fmt(s.forecast7d.min_z500_gpm, ' gpm')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Peak Gust</span>
                        <span className="font-mono text-slate-200">{fmt(s.forecast7d.peak_surface_gust_kmh, ' km/h')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {s.coupledModules.map((cm) => {
                      const meta = COUPLED_LINKS[cm];
                      return (
                        <Link key={cm} href={meta.href} onClick={(e) => e.stopPropagation()} className={`px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] ${meta.color}`}>
                          {meta.label}
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedSectors.map((s) => (
                <Card key={s.id} onClick={() => setSelectedSector(s)} className="glass-intense border-white/10 hover:border-indigo-500/40 p-4 cursor-pointer">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="text-sm font-bold text-white">{s.name}</div>
                      <div className="text-[10px] text-slate-400">{s.district} · {s.subRegion} ({s.administrativeUnit}) · {s.circulationRegime}</div>
                    </div>
                    <div className="font-mono text-indigo-300">250 Jet: {fmt(s.liveUpperAir.jet250_kmh, ' km/h')} · Z500: {fmt(s.liveUpperAir.z500_gpm, ' gpm')}</div>
                    <div className="font-mono text-sky-300">7d Peak Jet: {fmt(s.forecast7d.peak_jet250_kmh, ' km/h')}</div>
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

      <div className="container mx-auto px-6 pb-8">
        <EnvironmentalObserveSpotlight
          typologyTitle="Upper-Tropospheric Circulation & Jet Stream Typologies"
          typologySubtitle="Filter sectors by overhead jet streaks, cyclonic 500 hPa troughs (ΔZ ≤ -40 gpm), blocking ridges (ΔZ ≥ +60 gpm), or high-altitude passes."
          typologyIcon={Compass}
          typologies={[
            { id: 'all', label: 'All 24 Circulation Sectors', count: sectors.length, icon: Compass, color: 'indigo' },
            { id: 'jet-core', label: 'Active Jet Streaks (≥120 km/h)', count: sectors.filter((s) => (s.liveUpperAir.jet250_kmh ?? 0) >= 120).length, icon: Wind, color: 'sky' },
            { id: 'troughs', label: '500 hPa Cyclonic Troughs', count: sectors.filter((s) => s.circulationRegime === '500 hPa Cyclonic Trough').length, icon: CloudRain, color: 'rose' },
            { id: 'ridges', label: 'Upper-Level Blocking Ridges', count: sectors.filter((s) => s.circulationRegime === 'Upper-Level Blocking Ridge').length, icon: Gauge, color: 'amber' },
            { id: 'high-passes', label: 'High-Crest Shear Zones (≥3,000m)', count: sectors.filter((s) => s.elevation_m >= 3000).length, icon: Mountain, color: 'cyan' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => {
            setActiveTypology(id);
            setCurrentPage(1);
            document.getElementById('jet-sector-registry')?.scrollIntoView({ behavior: 'smooth' });
          }}
          showingCount={filteredSectors.length}
          totalCount={sectors.length}
          entityLabel="circulation sectors"
          spotlightTitle="2D Gridded SWJ Detection & Climatological 500 hPa Departure Physics"
          spotlightSubtitle="Why cyclonic troughs and blocking ridges must be evaluated against latitude-and-season-specific geopotential normals rather than fixed constants."
          tabs={[
            {
              id: 'jet-mechanics',
              label: 'SWJ Zonal-Mean Axis & Z₅₀₀ Departures',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-400 block mb-1">2D Zonal-Mean Detector</span>
                    <h5 className="text-sm font-semibold text-white mb-2">24°N–40°N × 70°E–80°E Grid</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      KEW computes zonal wind u₂₅₀ across 45 grid nodes and applies parabolic peak interpolation on the zonal mean to locate the Subtropical Westerly Jet axis without relying on single-point readings.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Seasonal Climatology</span>
                    <h5 className="text-sm font-semibold text-white mb-2">ERA5-Calibrated Z₅₀₀ Normals</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      At 34°N, climatological 500 hPa height varies from ~5,600 gpm in January to ~5,870 gpm in July. Blocking ridges (ΔZ₅₀₀ &gt;= +60 gpm) and cyclonic troughs (ΔZ₅₀₀ &lt;= -40 gpm) are detected relative to exact day-of-year and latitude normals.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Vertical Shear &amp; Rotors</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Mountain-Wave Gales &amp; Slab Loading</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Strong 250–300 hPa jet streaks (&gt;130 km/h) crossing Karakoram and Great Himalayan ridges transfer momentum downward into Zoji La, Khardung La, and lee-slope avalanche starting zones.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Mountain-Wave, Gale & Inversion Field Observations"
          observeSubtitle="Report lenticular wave clouds, summit snow-banner plumes, severe pass gales, or persistent winter valley haze ceilings."
          observeBadge="Upper-Air / Mountain Meteorology Protocol"
          protocols={[
            { number: '1', title: 'Peak Snow-Plume Banner Spotting', desc: 'Photograph horizontal snow plumes blowing off 5,000m+ summits.', benchmark: 'Visual 500–300 hPa Jet Streak Indicator', icon: Wind, color: 'indigo' },
            { number: '2', title: 'Lenticular Mountain-Wave Cloud Log', desc: 'Document stationary lens clouds over Pir Panjal or Zanskar crests.', benchmark: 'Orographic Gravity-Wave Marker', icon: Compass, color: 'sky' },
            { number: '3', title: 'Valley Inversion Ceiling Altitude', desc: 'Record altitude of the visible winter smoke/fog lid from surrounding ridges.', benchmark: '500 hPa Ridge Subsidence Validation', icon: Gauge, color: 'amber' },
            { number: '4', title: 'Lee-Slope Wind-Slab Cornice Log', desc: 'Report fresh wind-drifted snow pillows forming on leeward ridges.', benchmark: 'Wind-Slab Avalanche Hazard Trigger', icon: Snowflake, color: 'cyan' },
          ]}
        />
      </div>

      <AnimatePresence>
        {selectedSector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSector(null)}
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
                  <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-semibold mb-1 ${regimeBadgeClass(selectedSector.circulationRegime)}`}>
                    {selectedSector.circulationRegime}
                  </span>
                  <h3 className="text-lg font-bold text-white">{selectedSector.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedSector.district} · {selectedSector.subRegion} ({selectedSector.administrativeUnit}) · Stn {selectedSector.elevation_m}m / DEM {fmt(selectedSector.provenance.modelGridElevationM, 'm')}
                  </p>
                </div>
                <button type="button" onClick={() => setSelectedSector(null)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-emerald-400">0h Upper-Air Model Analysis</div>
                  <div className="flex justify-between"><span>250 hPa Jet (u₂₅₀):</span> <strong>{fmt(selectedSector.liveUpperAir.jet250_kmh, ' km/h')} ({fmt(selectedSector.liveUpperAir.u250_ms, ' m/s')})</strong></div>
                  <div className="flex justify-between"><span>300 / 500 hPa Wind:</span> <strong>{fmt(selectedSector.liveUpperAir.jet300_kmh)} / {fmt(selectedSector.liveUpperAir.wind500_kmh, ' km/h')}</strong></div>
                  <div className="flex justify-between"><span>500 hPa Height (Norm):</span> <strong>{fmt(selectedSector.liveUpperAir.z500_gpm, ' gpm')} ({selectedSector.liveUpperAir.z500_climatology_gpm} gpm)</strong></div>
                  <div className="flex justify-between"><span>Climatological Departure:</span> <strong>{selectedSector.liveUpperAir.z500_departure_gpm !== null ? `${selectedSector.liveUpperAir.z500_departure_gpm >= 0 ? '+' : ''}${selectedSector.liveUpperAir.z500_departure_gpm} gpm` : '—'}</strong></div>
                  <div className="flex justify-between"><span>500 hPa Temperature:</span> <strong>{fmt(selectedSector.liveUpperAir.temp500_c, '°C')}</strong></div>
                  <div className="flex justify-between"><span>Vertical Wind Shear:</span> <strong>{fmt(selectedSector.liveUpperAir.vertical_shear_kmh, ' km/h')}</strong></div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/[0.06] border border-sky-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-sky-400">168h NWP Forecast ({selectedSector.forecast7d.valid_hourly_steps}/168h)</div>
                  <div className="flex justify-between"><span>Peak 250 hPa Jet:</span> <strong>{fmt(selectedSector.forecast7d.peak_jet250_kmh, ' km/h')}</strong></div>
                  <div className="flex justify-between"><span>Min Z500 (Trough):</span> <strong>{fmt(selectedSector.forecast7d.min_z500_gpm, ' gpm')}</strong></div>
                  <div className="flex justify-between"><span>Max Z500 (Ridge):</span> <strong>{fmt(selectedSector.forecast7d.max_z500_gpm, ' gpm')}</strong></div>
                  <div className="flex justify-between"><span>Peak Surface Gust:</span> <strong>{fmt(selectedSector.forecast7d.peak_surface_gust_kmh, ' km/h')}</strong></div>
                  <div className="pt-1.5 border-t border-white/10 text-[11px] text-slate-300">
                    {selectedSector.regimeEvidence}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="jet-stream-circulation" />
      </div>
    </main>
  );
}
