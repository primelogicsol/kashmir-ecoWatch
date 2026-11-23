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
  Compass, Wind, CloudRain, Snowflake, Mountain, Gauge,
  MapPin, RefreshCw, ChevronLeft, ChevronRight, X, History
} from 'lucide-react';

function regimeBadgeClass(regime: JetSectorLiveRecord['circulationRegime']): string {
  if (regime === 'Jet Core Overhead (>130 km/h)') return 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40';
  if (regime === '500 hPa Cyclonic Trough') return 'bg-red-500/20 text-red-200 border-red-400/40';
  if (regime === 'Upper-Level Blocking Ridge') return 'bg-amber-500/20 text-amber-200 border-amber-400/40';
  return 'bg-sky-500/15 text-sky-200 border-sky-400/30';
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

interface JetApiPayload {
  circulationSummary: {
    jetCoreLatitude: string;
    jetCoreSpeedKmh: number;
    mean500hPaHeightGpm: number;
    troughSectorCount: number;
    ridgeSectorCount: number;
    dominantPattern: string;
  };
  meridionalProfile: Array<{
    id: string;
    label: string;
    latLabel: string;
    latitude: number;
    longitude: number;
    jet250_kmh: number;
    jet300_kmh: number;
    z500_gpm: number;
    temp500_c: number;
  }>;
  regionalSummaries: Array<{
    subRegion: JetSubRegion;
    sectors: number;
    maxJet250Kmh: number;
    meanZ500Gpm: number;
    meanTemp500C: number;
  }>;
  sectors: JetSectorLiveRecord[];
  historicalRecords: Array<{
    id: string;
    title: string;
    period: string;
    mechanism: string;
    impact: string;
    source: string;
  }>;
  meta: {
    updatedAt: string;
  };
}

export default function JetStreamCirculationPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [data, setData] = useState<JetApiPayload | null>(null);
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
    } catch {
      // Retain existing state
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry(false);
  }, [fetchTelemetry]);

  const sectors = data?.sectors || [];
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
        (activeTypology === 'jet-core' && s.liveUpperAir.jet250_kmh >= 120) ||
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
          : s.circulationRegime === 'Jet Core Overhead (>130 km/h)'
            ? '#818cf8'
            : s.circulationRegime === 'Upper-Level Blocking Ridge'
              ? '#f59e0b'
              : '#38bdf8';
      return {
        id: s.id,
        title: s.name,
        subtitle: `${s.district} · ${s.subRegion} · ${s.elevation_m}m`,
        lat: s.latitude,
        lon: s.longitude,
        color,
        radius: s.liveUpperAir.jet250_kmh >= 130 ? 9.5 : 8,
        liveSummary: `250hPa Jet: ${s.liveUpperAir.jet250_kmh} km/h (${s.liveUpperAir.jet250_dir_deg}°) · Z500: ${s.liveUpperAir.z500_gpm} gpm`,
        forecastSummary: `7d Peak 250hPa Jet: ${s.forecast7d.peak_jet250_kmh} km/h · Min Z500: ${s.forecast7d.min_z500_gpm} gpm`,
      };
    });
  }, [filteredSectors]);

  const transectCoords: [number, number][] | undefined = useMemo(() => {
    if (!data?.meridionalProfile?.length) return undefined;
    return data.meridionalProfile.map((p) => [p.latitude, p.longitude]);
  }, [data]);

  const syncLabel = data?.meta?.updatedAt
    ? new Date(data.meta.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : 'Live';

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
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span
                className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1"
                style={{ fontSize: '0.58em' }}
              >
                KEW
              </span>
              <span>Subtropical Westerly</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-indigo-400 via-violet-300 to-sky-300 bg-clip-text text-transparent">
              Jet Stream &amp; Circulation
            </span>
          </>
        }
        subtitle="Subtropical westerly jet positioning, upper-level 500 hPa troughs and blocking ridges, vertical wind shear, and atmospheric circulation shifts across Kashmir, Jammu, Ladakh, Azad Kashmir, Gilgit, and Baltistan."
        icon={<Compass className="w-6 h-6 text-indigo-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white"
              icon={<Wind className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems/western-disturbances')}
            >
              Western Disturbances
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<CloudRain className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems/monsoon-dynamics')}
            >
              Monsoon Dynamics
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
          { label: 'Circulation Sectors', value: sectors.length || 24, icon: 'MapPin', color: 'text-indigo-400' },
          { label: 'Sub-Regions Covered', value: 6, icon: 'Globe', color: 'text-cyan-400' },
          { label: 'SWJ Core Axis', value: loading ? '...' : data?.circulationSummary.jetCoreLatitude.split(' ')[0] || '30°N', icon: 'Compass', color: 'text-violet-400' },
          { label: '250 hPa Jet Core', value: loading ? '...' : `${data?.circulationSummary.jetCoreSpeedKmh ?? 110} km/h`, icon: 'Wind', color: 'text-sky-400' },
          { label: 'Mean 500 hPa Z', value: loading ? '...' : `${data?.circulationSummary.mean500hPaHeightGpm ?? 5760} gpm`, icon: 'Gauge', color: 'text-emerald-400' },
          { label: 'Cyclonic Troughs', value: loading ? '...' : data?.circulationSummary.troughSectorCount ?? 0, icon: 'AlertTriangle', color: 'text-red-400' },
          { label: 'Blocking Ridges', value: loading ? '...' : data?.circulationSummary.ridgeSectorCount ?? 0, icon: 'Layers', color: 'text-amber-400' },
          { label: 'Last Sync', value: loading ? '...' : syncLabel, icon: 'Clock', color: 'text-emerald-300' },
        ]}
        iconColor="text-indigo-400"
      />

      {/* Live Upper-Air Circulation Banner */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-indigo-500/25 p-4 bg-gradient-to-r from-indigo-950/35 via-slate-900 to-slate-950">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  250 / 300 / 500 hPa Tropospheric Wave &amp; Jet Stream Diagnostics
                </span>
                <Badge variant="success" size="sm" className="text-[9px]">0h NWP Upper-Air Analysis</Badge>
                <Badge variant="info" size="sm" className="text-[9px]">7-Day Jet &amp; Z500 NWP</Badge>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {data?.circulationSummary
                  ? `${data.circulationSummary.dominantPattern} — Primary 250 hPa Subtropical Westerly Jet core positioned near ${data.circulationSummary.jetCoreLatitude} at ${data.circulationSummary.jetCoreSpeedKmh} km/h.`
                  : 'Synchronizing 250 hPa jet stream winds and 500 hPa geopotential heights across 26°N–38°N...'}
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
        </Card>
      </section>

      {/* Interactive GIS + Meridional Jet Profile Chart */}
      <section className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6">
            <AtmosphericSystemsMap
              markers={mapMarkers}
              polylineCoords={transectCoords}
              polylineColor="#818cf8"
              legendItems={[
                { color: '#818cf8', label: 'Jet Core (>130 km/h)' },
                { color: '#ef4444', label: '500 hPa Trough' },
                { color: '#f59e0b', label: 'Blocking Ridge' },
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
                    Upper-Tropospheric Circulation Cross-Section (75°E Meridian)
                  </span>
                  <h2 className="text-base font-bold text-white">
                    {diagTab === 'transect'
                      ? 'Meridional 250 & 300 hPa Jet Speed Profile (26°N → 38°N)'
                      : diagTab === 'z500'
                        ? 'Regional Peak 250 hPa Jet Speed & Mean 500 hPa Cold-Pool'
                        : 'Verified Historical Circulation & Rossby Wave Shifts'}
                  </h2>
                </div>
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setDiagTab('transect')}
                    className={`px-2.5 py-1 rounded font-semibold ${diagTab === 'transect' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Jet Transect
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagTab('z500')}
                    className={`px-2.5 py-1 rounded font-semibold ${diagTab === 'z500' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Regional Jet
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagTab('history')}
                    className={`px-2.5 py-1 rounded font-semibold ${diagTab === 'history' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
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
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,23,42,0.95)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="jet250_kmh" name="250 hPa Jet Core (km/h)" stroke="#818cf8" fill="#4f46e5" fillOpacity={0.32} />
                      <Area type="monotone" dataKey="jet300_kmh" name="300 hPa Wind (km/h)" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.2} />
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
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15,23,42,0.95)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: '12px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="maxJet250Kmh" name="Peak 250 hPa Jet (km/h)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {diagTab === 'history' && (
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {(data?.historicalRecords || []).map((hr) => (
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

      {/* Coupled Atmospheric & Surface Hazard Pathways */}
      <section className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: 'Western Disturbance Waveguide', href: '/hazard-intelligence/atmospheric-systems/western-disturbances', icon: Wind, color: 'text-sky-400', desc: '300/250 hPa SWJ steers baroclinic troughs directly across Hindu Kush & Kashmir' },
            { title: 'Monsoon Onset & Withdrawal', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics', icon: CloudRain, color: 'text-teal-400', desc: 'Northward jump of SWJ over Tibet (>35°N) governs summer monsoon progression' },
            { title: 'Ridge Wind-Slab Avalanches', href: '/hazard-intelligence/avalanches', icon: Snowflake, color: 'text-cyan-300', desc: 'Descending jet streaks scour windward snow and load leeward avalanche chutes' },
            { title: 'Blocking Ridge Smog Trapping', href: '/environmental-monitoring/air-pollution', icon: Gauge, color: 'text-amber-400', desc: '500 hPa anticyclonic subsidence caps winter Kashmir Valley PM2.5 inversions' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="group">
                <Card className="glass-intense border-white/10 hover:border-indigo-500/40 p-3.5 h-full transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300">{item.title}</span>
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
                      ? 'bg-indigo-500/15 border-indigo-400/50 shadow-lg'
                      : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white">{sr.subRegion}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sr.sectors}u</span>
                  </div>
                  <div className="text-[10px] text-indigo-300 mt-1">
                    250 Jet: {sr.maxJet250Kmh} km/h
                  </div>
                  <div className="text-[10px] text-emerald-300">
                    Z500: {sr.meanZ500Gpm} gpm · {sr.meanTemp500C}°C
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
                  { value: 'Jet Core Overhead (>130 km/h)', label: 'Jet Core Overhead (>130 km/h)' },
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

      {/* Sector Cards Registry */}
      <section id="jet-sector-registry" className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {loading && sectors.length === 0 ? (
            <div className="py-20 text-center glass-intense border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-indigo-400" />
              <p className="text-sm font-semibold text-white">Synchronizing 24 Upper-Tropospheric Circulation Sectors...</p>
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
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        <span>{s.district} · <strong>{s.subRegion}</strong> · {s.elevation_m} m</span>
                      </p>
                    </div>
                    <Badge variant="info" size="sm" className="text-[10px] font-mono">
                      {s.liveUpperAir.jet250_kmh} km/h
                    </Badge>
                  </div>

                  <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-semibold flex items-center justify-between ${regimeBadgeClass(s.circulationRegime)}`}>
                    <span>{s.circulationRegime}</span>
                    <span className="font-mono">{s.liveUpperAir.jet250_dir_deg}°</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-emerald-400">Live Upper-Air</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">250 / 300 Jet</span>
                        <span className="font-bold text-white">{s.liveUpperAir.jet250_kmh} / {s.liveUpperAir.jet300_kmh}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">500 hPa Z</span>
                        <span className="font-mono text-slate-200">{s.liveUpperAir.z500_gpm} gpm</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">500 hPa Temp</span>
                        <span className="font-mono text-cyan-300">{s.liveUpperAir.temp500_c}°C</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-500/[0.06] border border-sky-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-sky-400">7-Day NWP Forecast</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Peak 250 Jet</span>
                        <span className="font-bold text-white">{s.forecast7d.peak_jet250_kmh} km/h</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Min Z500</span>
                        <span className="font-mono text-sky-200">{s.forecast7d.min_z500_gpm} gpm</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Peak Gust</span>
                        <span className="font-mono text-slate-200">{s.forecast7d.peak_surface_gust_kmh} km/h</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{s.circulationRole}</p>

                  <div className="mt-auto pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {s.coupledModules.map((cm) => {
                      const meta = COUPLED_LINKS[cm];
                      return (
                        <Link
                          key={cm}
                          href={meta.href}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] ${meta.color}`}
                        >
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
                <Card
                  key={s.id}
                  onClick={() => setSelectedSector(s)}
                  className="glass-intense border-white/10 hover:border-indigo-500/40 p-4 cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="text-sm font-bold text-white">{s.name}</div>
                      <div className="text-[10px] text-slate-400">{s.district} · {s.subRegion} · {s.circulationRegime}</div>
                    </div>
                    <div className="font-mono text-indigo-300">250 Jet: {s.liveUpperAir.jet250_kmh} km/h · Z500: {s.liveUpperAir.z500_gpm} gpm</div>
                    <div className="font-mono text-sky-300">7d Peak Jet: {s.forecast7d.peak_jet250_kmh} km/h</div>
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
          typologyTitle="Upper-Tropospheric Circulation & Jet Stream Typologies"
          typologySubtitle="Filter sectors by overhead jet cores (>120 km/h), active 500 hPa cyclonic troughs, anticyclonic blocking ridges, or high-altitude mountain-wave passes."
          typologyIcon={Compass}
          typologies={[
            { id: 'all', label: 'All 24 Circulation Sectors', count: sectors.length, icon: Compass, color: 'indigo' },
            { id: 'jet-core', label: 'Active Jet Streaks (≥120 km/h)', count: sectors.filter((s) => s.liveUpperAir.jet250_kmh >= 120).length, icon: Wind, color: 'sky' },
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
          spotlightTitle="Subtropical Westerly Jet, Tibetan Anticyclone & Rossby Wave Dynamics"
          spotlightSubtitle="Why the latitudinal migration of the 250 hPa Subtropical Westerly Jet around the Tibetan Plateau and Pamir knot controls snow droughts, valley inversions, and extreme rainfall across the Western Himalayas."
          tabs={[
            {
              id: 'jet-mechanics',
              label: 'Jet Bifurcation, Blocking Highs & Valley Inversions',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-400 block mb-1">Topographic Bifurcation</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Pamir–Tibetan Jet Splitting</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      In autumn, the Subtropical Westerly Jet shifts south of the Tibetan Plateau (~28°N–32°N), anchoring the winter storm track over Jammu, Kashmir, and Azad Kashmir until its northward jump in late May initiates the summer monsoon.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Anticyclonic Subsidence</span>
                    <h5 className="text-sm font-semibold text-white mb-2">500 hPa Blocking Ridges &amp; Snow Drought</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Persistent positive 500 hPa height anomalies (&gt;5,800 gpm) deflect approaching WDs poleward into Central Asia — causing winter snow droughts, anomalously warm alpine temperatures, and multi-week PM2.5 smog trapping in Srinagar.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Vertical Shear &amp; Rotors</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Mountain-Wave Gales &amp; Slab Loading</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      When 250–300 hPa jet streaks (&gt;140 km/h) cross the Karakoram, Great Himalaya, and Pir Panjal, downward momentum transfer creates severe Zoji La / Khardung La gap gales and rapid lee-slope wind-slab avalanche loading.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Mountain-Wave, Gale & Inversion Field Observations"
          observeSubtitle="Report lenticular wave clouds, snow-banner plumes on 5,000m+ peaks, severe pass gales, or persistent valley smoke lids."
          observeBadge="Upper-Air / Mountain Meteorology Protocol"
          protocols={[
            {
              number: '1',
              title: 'Peak Snow-Plume Banner Spotting',
              desc: 'Photograph horizontal snow plumes blowing off Kolahoi, Apharwat, Nanga Parbat, or Nun-Kun summits (indicates >100 km/h upper winds).',
              benchmark: 'Visual 500–300 hPa Jet Streak Indicator',
              icon: Wind,
              color: 'indigo',
            },
            {
              number: '2',
              title: 'Lenticular Cloud & Mountain-Wave Rotor Log',
              desc: 'Document stationary lens-shaped clouds over Pir Panjal or Zanskar crests signaling strong vertical wind shear.',
              benchmark: 'Orographic Gravity-Wave Marker',
              icon: Compass,
              color: 'sky',
            },
            {
              number: '3',
              title: 'Valley Inversion & Haze Ceiling Observation',
              desc: 'Record altitude of the visible winter smoke/fog top from Shankaracharya, Gulmarg road, or Pir Ki Gali.',
              benchmark: '500 hPa Ridge Subsidence Validation',
              icon: Gauge,
              color: 'amber',
            },
            {
              number: '4',
              title: 'Lee-Slope Wind-Slab Drift Accumulation',
              desc: 'Report pillowed wind-drifted snow cornices forming on leeward ridges during dry high-wind periods.',
              benchmark: 'Wind-Slab Avalanche Hazard Trigger',
              icon: Snowflake,
              color: 'cyan',
            },
          ]}
        />
      </div>

      {/* Sector Detail Modal */}
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
                  <p className="text-xs text-slate-400">
                    {selectedSector.district} · {selectedSector.subRegion} ({selectedSector.scope}) · Elev {selectedSector.elevation_m} m
                  </p>
                </div>
                <button type="button" onClick={() => setSelectedSector(null)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-emerald-400">Live Upper-Air Analysis (UTC)</div>
                  <div className="flex justify-between"><span>250 hPa Jet Stream:</span> <strong>{selectedSector.liveUpperAir.jet250_kmh} km/h ({selectedSector.liveUpperAir.jet250_dir_deg}°)</strong></div>
                  <div className="flex justify-between"><span>300 hPa Jet Wind:</span> <strong>{selectedSector.liveUpperAir.jet300_kmh} km/h</strong></div>
                  <div className="flex justify-between"><span>500 hPa Wind Speed:</span> <strong>{selectedSector.liveUpperAir.wind500_kmh} km/h</strong></div>
                  <div className="flex justify-between"><span>500 hPa Height (24h Δ):</span> <strong>{selectedSector.liveUpperAir.z500_gpm} gpm ({selectedSector.liveUpperAir.z500_24h_delta_gpm >= 0 ? '+' : ''}{selectedSector.liveUpperAir.z500_24h_delta_gpm})</strong></div>
                  <div className="flex justify-between"><span>500 hPa Temperature:</span> <strong>{selectedSector.liveUpperAir.temp500_c}°C</strong></div>
                  <div className="flex justify-between"><span>Vertical Wind Shear:</span> <strong>{selectedSector.liveUpperAir.vertical_shear_kmh} km/h</strong></div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/[0.06] border border-sky-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-sky-400">7-Day Upper-Air NWP Forecast</div>
                  <div className="flex justify-between"><span>Peak 250 hPa Jet:</span> <strong>{selectedSector.forecast7d.peak_jet250_kmh} km/h</strong></div>
                  <div className="flex justify-between"><span>Min 500 hPa Height (Trough):</span> <strong>{selectedSector.forecast7d.min_z500_gpm} gpm</strong></div>
                  <div className="flex justify-between"><span>Max 500 hPa Height (Ridge):</span> <strong>{selectedSector.forecast7d.max_z500_gpm} gpm</strong></div>
                  <div className="flex justify-between"><span>Peak Surface Gust:</span> <strong>{selectedSector.forecast7d.peak_surface_gust_kmh} km/h</strong></div>
                  <div className="pt-1.5 border-t border-white/10 text-[11px] text-slate-300">
                    Role: {selectedSector.circulationRole}
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
