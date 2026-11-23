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
  CloudRain, Droplets, Waves, Mountain, Compass, BarChart3,
  MapPin, RefreshCw, ChevronLeft, ChevronRight, X, History, ArrowRight
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

function riskVariant(risk: HazardLevel): 'default' | 'success' | 'warning' | 'danger' | 'critical' {
  if (risk === 'Critical') return 'critical';
  if (risk === 'High') return 'danger';
  if (risk === 'Moderate') return 'warning';
  if (risk === 'Low') return 'success';
  return 'default';
}

function fmtNum(val: number | null | undefined, suffix = ''): string {
  if (val === null || val === undefined || Number.isNaN(val)) return '—';
  return `${val}${suffix}`;
}

function formatIsoUtc(iso: string | null | undefined): string {
  if (!iso) return 'Unavailable';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : `${d.toISOString().slice(0, 16).replace('T', ' ')} UTC`;
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

export default function MonsoonDynamicsPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [data, setData] = useState<any | null>(null);
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
      // Preserve last valid payload
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry(false);
  }, [fetchTelemetry]);

  const corridors: MonsoonCorridorLiveRecord[] = data?.corridors || [];
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
      const rh = c.liveObservation.above_ground_rh_pct;
      const color =
        c.coupledRisk.overall === 'Critical'
          ? '#ef4444'
          : c.coupledRisk.overall === 'High'
            ? '#f59e0b'
            : rh !== null && rh >= 65
              ? '#14b8a6'
              : '#38bdf8';
      return {
        id: c.id,
        title: c.name,
        subtitle: `${c.district} · ${c.subRegion} (${c.administrativeUnit}) · ${c.elevation_m}m`,
        lat: c.latitude,
        lon: c.longitude,
        color,
        radius: c.subRegion === 'Jammu' ? 9.5 : 8,
        liveSummary: `${c.liveObservation.above_ground_level_hpa}hPa RH: ${fmtNum(c.liveObservation.above_ground_rh_pct, '%')} · TCWV: ${fmtNum(c.liveObservation.tcwv_kg_m2, ' kg/m²')} · ERA5 7d: ${fmtNum(c.liveObservation.era5_past7d_rain_mm, ' mm')}`,
        forecastSummary: `Next 7d NWP: ${fmtNum(c.forecast7d.total_rain_mm, ' mm')} · Peak CAPE: ${fmtNum(c.forecast7d.max_cape_jkg, ' J/kg')}`,
      };
    });
  }, [filteredCorridors]);

  const moisturePolyline: [number, number][] | undefined = useMemo(() => {
    if (!data?.moistureBranches?.length) return undefined;
    return data.moistureBranches.map((m: any) => [m.latitude, m.longitude]);
  }, [data]);

  const forecastDailySeries = useMemo(() => {
    const target = subRegionFilter === 'all' ? corridors : corridors.filter((c) => c.subRegion === subRegionFilter);
    if (!target.length || !target[0]?.forecast7d?.daily?.length) return [];
    return target[0].forecast7d.daily.map((d, idx) => {
      const vals = target
        .map((c) => c.forecast7d.daily[idx]?.rain_mm)
        .filter((v): v is number => typeof v === 'number');
      return {
        date: d.date.slice(5),
        meanRainMm: vals.length ? Number((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)) : 0,
        peakRainMm: vals.length ? Number(Math.max(...vals).toFixed(1)) : 0,
      };
    });
  }, [corridors, subRegionFilter]);

  const sc = data?.seasonContext;
  const syncShort = data?.meta?.updatedAt
    ? `${new Date(data.meta.updatedAt).toISOString().slice(5, 16).replace('T', ' ')}Z`
    : 'Syncing';

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
            <KewBrandIdentity />
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Monsoon Dynamics
            </span>
          </>
        }
        subtitle="Terrain-masked free-tropospheric moisture advection (850/700/500 hPa), Total-Column Water Vapour (TCWV), ERA5 historical 7-day precipitation anomalies, and 168-hour NWP forecasts across Jammu, Kashmir, Ladakh, Azad Kashmir, Gilgit, and Baltistan."
        icon={<CloudRain className="w-6 h-6 text-teal-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-teal-600 to-emerald-600 font-bold text-white"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems/monsoon-dynamics/dashboard')}
            >
              Open 8-Tab Monsoon Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Compass className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/atmospheric-systems')}
            >
              Atmospheric Systems Hub
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
          { label: 'Reporting / Configured', value: loading ? '...' : `${sc?.reportingCorridors ?? '—'}/${sc?.configuredCorridors ?? 24}`, icon: 'MapPin', color: 'text-teal-400' },
          { label: 'Seasonal Mode', value: loading ? '...' : sc?.seasonalStatusLabel || '—', icon: 'Calendar', color: 'text-amber-300' },
          { label: 'Valid 850hPa RH (Lowland)', value: loading ? '...' : sc?.meanValid850RhPct !== null && sc?.meanValid850RhPct !== undefined ? `${sc.meanValid850RhPct}% (${sc.valid850Corridors}u)` : 'Unavailable', icon: 'Droplets', color: 'text-sky-400' },
          { label: 'Mean TCWV (All 24)', value: loading ? '...' : fmtNum(sc?.meanTcwvKgM2, ' kg/m²'), icon: 'Layers', color: 'text-emerald-400' },
          { label: 'ERA5 Past 7d Max', value: loading ? '...' : fmtNum(sc?.peakEra5Past7dMm, ' mm'), icon: 'CloudRain', color: 'text-cyan-300' },
          { label: '7d Forecast Max', value: loading ? '...' : fmtNum(sc?.peakForecast7dMm, ' mm'), icon: 'Waves', color: 'text-indigo-400' },
          { label: '168h Peak CAPE', value: loading ? '...' : fmtNum(sc?.maxCapeJkg, ' J/kg'), icon: 'Zap', color: 'text-amber-400' },
          { label: 'Synced (UTC)', value: loading ? '...' : syncShort, icon: 'Clock', color: 'text-emerald-300' },
        ]}
        iconColor="text-teal-400"
      />

      {/* Provenance, Terrain-Masking & Monsoon Onset Disclaimer Banner */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-teal-500/25 p-4 bg-gradient-to-r from-teal-950/30 via-slate-900 to-slate-950 space-y-3">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Terrain-Masked Moisture Diagnostics &amp; ERA5 Reanalysis Engine
                </span>
                <Badge variant="info" size="sm" className="text-[9px]">Model Analysis (0h UTC)</Badge>
                <Badge variant="success" size="sm" className="text-[9px]">
                  Below-Ground 850 hPa Masked ({sc?.maskedSubterranean850Corridors ?? 16}/24 High-Elevation Excluded)
                </Badge>
                <Badge variant="warning" size="sm" className="text-[9px]">
                  Historical 7d: ERA5 Archive ({sc?.historicalWindowLabel || 'T-8d..T-2d'})
                </Badge>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                {sc?.regimeHeadline || 'Synchronizing terrain-masked pressure-level humidity, TCWV, and ERA5 historical precipitation...'}
              </p>
              <p className="text-[11px] text-amber-200/90">
                {sc?.onsetDisclaimer}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
                onClick={() => router.push('/hazard-intelligence/atmospheric-systems/monsoon-dynamics/dashboard')}
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

          {data?.moistureBranches && (
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="text-[10px] font-mono text-slate-400">
                Configured Reference Moisture Gates (Point-Sampled Model Diagnostics &amp; TCWV — Not Cross-Transect Flux Integrals) · Init {formatIsoUtc(data?.meta?.modelRunInitUtc)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {data.moistureBranches.map((mb: any) => (
                  <div key={mb.id} className="p-2.5 rounded-xl bg-slate-950/75 border border-white/10 text-xs">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-teal-300">{mb.branch}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {mb.sampled_level_hpa} hPa · {fmtNum(mb.sampled_wind_kmh, ' km/h')}
                      </span>
                    </div>
                    <div className="text-[11px] text-white font-semibold truncate mt-0.5">{mb.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>
                        {mb.is_850hpa_above_ground ? '850 RH: ' : `${mb.sampled_level_hpa} RH (850 Masked): `}
                        <strong className="text-emerald-300">{fmtNum(mb.sampled_rh_pct, '%')}</strong>
                      </span>
                      <span>TCWV: <strong className="text-sky-300">{fmtNum(mb.tcwv_kg_m2, ' kg/m²')}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* Interactive GIS + ERA5 Historical Anomaly & Forecast Analytics */}
      <section className="container mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6">
            <AtmosphericSystemsMap
              markers={mapMarkers}
              polylineCoords={moisturePolyline}
              polylineColor="#14b8a6"
              legendItems={[
                { color: '#14b8a6', label: 'Free-Air RH ≥ 65%' },
                { color: '#38bdf8', label: 'Off-Season / Dry Flow' },
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
                    ERA5 Historical Reanalysis vs. 168h NWP Forecast
                  </span>
                  <h2 className="text-base font-bold text-white">
                    {analyticsTab === 'anomaly'
                      ? `ERA5 Past 7d Rain (${sc?.historicalWindowLabel || 'T-8d..T-2d'}) vs. Seasonal Normal`
                      : analyticsTab === 'forecast'
                        ? `7-Day NWP Rainfall Forecast (${subRegionFilter === 'all' ? 'All 6 Sub-Regions' : subRegionFilter})`
                        : 'Verified Historical Monsoon Intrusion Benchmarks'}
                  </h2>
                </div>
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[11px]">
                  <button type="button" onClick={() => setAnalyticsTab('anomaly')} className={`px-2.5 py-1 rounded font-semibold ${analyticsTab === 'anomaly' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                    ERA5 7d
                  </button>
                  <button type="button" onClick={() => setAnalyticsTab('forecast')} className={`px-2.5 py-1 rounded font-semibold ${analyticsTab === 'forecast' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                    7d Forecast
                  </button>
                  <button type="button" onClick={() => setAnalyticsTab('history')} className={`px-2.5 py-1 rounded font-semibold ${analyticsTab === 'history' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}>
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
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} />
                      <Legend />
                      <Bar dataKey="past7dEra5MeanMm" name="ERA5 Historical 7d (mm)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="normal7dMm" name="Seasonal Weekly Normal (mm)" fill="#64748b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="forecastMax7dMm" name="7d NWP Forecast Peak (mm)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
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
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} />
                      <Legend />
                      <Area type="monotone" dataKey="peakRainMm" name="Peak Corridor Rain (mm)" stroke="#14b8a6" fill="#0d9488" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="meanRainMm" name="Mean Regional Rain (mm)" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {analyticsTab === 'history' && (
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {(data?.historicalRecords || []).map((hr: any) => (
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

      {/* 6-Subregion Quick Filter Bar (Recognizing Gilgit-Baltistan Administrative Unit) */}
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
                    active ? 'bg-teal-500/15 border-teal-400/50 shadow-lg' : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white">{sr.subRegion}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sr.reportingCorridors}/{sr.corridors}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 truncate">{sr.administrativeUnit}</div>
                  <div className="text-[10px] text-emerald-300 mt-0.5">
                    ERA5 7d: {fmtNum(sr.past7dEra5MeanMm, 'mm')} · TCWV {fmtNum(sr.meanTcwvKgM2)}
                  </div>
                  <div className="text-[10px] text-sky-300">
                    850RH: {sr.meanValid850RhPct !== null ? `${sr.meanValid850RhPct}%` : 'Masked'} · Fcst {fmtNum(sr.forecastMax7dMm, 'mm')}
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

      <section id="monsoon-corridor-registry" className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {loading && corridors.length === 0 ? (
            <div className="py-20 text-center glass-intense border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-teal-400" />
              <p className="text-sm font-semibold text-white">Validating 24 Corridors, Surface Pressure Masks &amp; ERA5 Archive...</p>
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
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                        <span>{c.district} · <strong>{c.subRegion}</strong> ({c.administrativeUnit}) · {c.elevation_m}m</span>
                      </p>
                    </div>
                    <Badge variant={riskVariant(c.coupledRisk.overall)} size="sm" className="text-[9px] shrink-0">
                      {c.coupledRisk.overall}
                    </Badge>
                  </div>

                  <div className="px-2.5 py-1 rounded-lg border border-white/10 bg-slate-900/80 text-[10px] font-semibold text-slate-200 flex items-center justify-between gap-2">
                    <span className="truncate">{c.monsoonState}</span>
                    <span className="font-mono text-teal-300 shrink-0">Psfc {fmtNum(c.liveObservation.surface_pressure_hpa, 'hPa')}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-emerald-400">Model Analysis + ERA5</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">850 hPa RH</span>
                        <span className="font-mono text-white">
                          {c.liveObservation.is_850hpa_above_ground ? fmtNum(c.liveObservation.rh_850hpa_pct, '%') : 'Masked (<Psfc)'}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">{c.liveObservation.above_ground_level_hpa}hPa / TCWV</span>
                        <span className="font-bold text-emerald-200">
                          {fmtNum(c.liveObservation.above_ground_rh_pct, '%')} · {fmtNum(c.liveObservation.tcwv_kg_m2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">ERA5 Past 7d</span>
                        <span className="font-mono text-teal-300">
                          {fmtNum(c.liveObservation.era5_past7d_rain_mm, ' mm')} ({c.liveObservation.anomaly_pct !== null ? `${c.liveObservation.anomaly_pct >= 0 ? '+' : ''}${c.liveObservation.anomaly_pct}%` : '—'})
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-500/[0.06] border border-sky-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-sky-400">168h NWP Forecast</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">7d Total Rain</span>
                        <span className="font-bold text-white">{fmtNum(c.forecast7d.total_rain_mm, ' mm')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Peak 24h</span>
                        <span className="font-mono text-sky-200">{fmtNum(c.forecast7d.peak_daily_mm, ' mm')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Peak CAPE</span>
                        <span className="font-mono text-slate-200">{fmtNum(c.forecast7d.max_cape_jkg, ' J/kg')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {c.coupledHazards.map((hz) => {
                      const meta = COUPLED_META[hz];
                      const Icon = meta.icon;
                      return (
                        <Link key={hz} href={meta.href} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white">
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
                <Card key={c.id} onClick={() => setSelectedCorridor(c)} className="glass-intense border-white/10 hover:border-teal-500/40 p-4 cursor-pointer">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="text-sm font-bold text-white">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.district} · {c.subRegion} ({c.administrativeUnit}) · {c.elevation_m}m</div>
                    </div>
                    <div className="font-mono text-emerald-300">
                      {c.liveObservation.above_ground_level_hpa}hPa RH: {fmtNum(c.liveObservation.above_ground_rh_pct, '%')} · ERA5 7d: {fmtNum(c.liveObservation.era5_past7d_rain_mm, 'mm')}
                    </div>
                    <div className="font-mono text-sky-300">7d Fcst: {fmtNum(c.forecast7d.total_rain_mm, 'mm')} · CAPE {fmtNum(c.forecast7d.max_cape_jkg)}</div>
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
          spotlightTitle="Terrain Pressure Masking & Total-Column Moisture Physics"
          spotlightSubtitle="Why 850 hPa (~1,500 m) is masked below ground over Kashmir, Ladakh, and Gilgit-Baltistan, and how 700/500 hPa free-air humidity + TCWV capture high-altitude intrusions."
          tabs={[
            {
              id: 'orographic-barrier',
              label: '850 hPa Terrain Masking & ERA5 Baseline',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Subterranean Masking</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Excluding Below-Ground 850 hPa</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Over Srinagar (Psfc ~853 hPa), Pahalgam (2,150 m), Skardu (2,228 m), and Leh (Psfc ~690 hPa), the 850 hPa isobaric surface lies underground. KEW masks subterranean 850 hPa extrapolations and promotes 700/500 hPa free-air RH alongside Total-Column Water Vapour (kg/m²).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <span className="text-xs font-bold text-sky-400 block mb-1">Historical vs Forecast</span>
                    <h5 className="text-sm font-semibold text-white mb-2">ERA5-Land 7-Day Precipitation</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Past 7-day rainfall anomalies are calculated from the Open-Meteo ERA5-Land Historical Reanalysis Archive (T-8d to T-2d UTC), keeping historical baselines strictly independent of 168-hour NWP forecast series.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Statutory Onset Rule</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Forecast Rain ≠ Monsoon Onset</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pre-monsoon convective showers or off-season westerly intrusions do not constitute monsoon onset; official onset/withdrawal dates are declared solely by IMD and PMD.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Monsoon Rainfall & Cloudburst Field Sentinel"
          observeSubtitle="Log intense convective downpours, hill-torrent mud surges, and rain-gauge accumulations across windward and rain-shadow districts."
          observeBadge="IMD / PMD Monsoon Watch Protocol"
          protocols={[
            { number: '1', title: 'Extreme Downpour Rate Logging', desc: 'Report localized torrential rain cells and 1-hour gauge totals across mountain catchments.', benchmark: 'Validates Sub-Grid Convective Bursts', icon: CloudRain, color: 'teal' },
            { number: '2', title: 'Nallah & Tributary Turbidity Spotting', desc: 'Flag sudden muddy discoloration in Tawi, Vishaw, Lidder, Neelum, or Shyok tributaries.', benchmark: 'Catchment Flash-Runoff Indicator', icon: Waves, color: 'cyan' },
            { number: '3', title: 'Culvert & Cut-Slope Saturation Log', desc: 'Photograph weeping highway cut-slopes during multi-day moisture surges.', benchmark: 'Slope Failure Early Escalation', icon: Mountain, color: 'amber' },
            { number: '4', title: 'High-Altitude Warm Rain on Glaciers', desc: 'Document liquid rainfall above 4,000 m over Kolahoi, Zanskar, or Hunza glaciers.', benchmark: 'Cryospheric GLOF Watch Protocol', icon: Droplets, color: 'sky' },
          ]}
        />
      </div>

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
                    {selectedCorridor.coupledRisk.overall}
                  </Badge>
                  <h3 className="text-lg font-bold text-white">{selectedCorridor.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedCorridor.district} · {selectedCorridor.subRegion} ({selectedCorridor.administrativeUnit}) · Stn {selectedCorridor.elevation_m}m / DEM {fmtNum(selectedCorridor.provenance.modelGridElevationM, 'm')}
                  </p>
                </div>
                <button type="button" onClick={() => setSelectedCorridor(null)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-emerald-400">0h Model Analysis &amp; ERA5 Historical</div>
                  <div className="flex justify-between"><span>Surface Pressure:</span> <strong>{fmtNum(selectedCorridor.liveObservation.surface_pressure_hpa, ' hPa')}</strong></div>
                  <div className="flex justify-between">
                    <span>850 hPa RH:</span>
                    <strong>{selectedCorridor.liveObservation.is_850hpa_above_ground ? fmtNum(selectedCorridor.liveObservation.rh_850hpa_pct, '%') : 'Masked (Below Ground)'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Free-Air ({selectedCorridor.liveObservation.above_ground_level_hpa} hPa):</span>
                    <strong>{fmtNum(selectedCorridor.liveObservation.above_ground_rh_pct, '%')} · {fmtNum(selectedCorridor.liveObservation.above_ground_wind_kmh, ' km/h')}</strong>
                  </div>
                  <div className="flex justify-between"><span>Total-Column Water (TCWV):</span> <strong>{fmtNum(selectedCorridor.liveObservation.tcwv_kg_m2, ' kg/m²')}</strong></div>
                  <div className="flex justify-between"><span>ERA5 Past 7d ({selectedCorridor.provenance.historicalWindow.slice(0, 10)}..):</span> <strong>{fmtNum(selectedCorridor.liveObservation.era5_past7d_rain_mm, ' mm')}</strong></div>
                  <div className="flex justify-between"><span>Seasonal Weekly Normal:</span> <strong>{selectedCorridor.liveObservation.climatology7d_normal_mm} mm</strong></div>
                </div>

                <div className="p-4 rounded-xl bg-sky-500/[0.06] border border-sky-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-sky-400">168h NWP Forecast ({selectedCorridor.forecast7d.valid_hourly_steps}/168h)</div>
                  <div className="flex justify-between"><span>7d Total Forecast Rain:</span> <strong>{fmtNum(selectedCorridor.forecast7d.total_rain_mm, ' mm')}</strong></div>
                  <div className="flex justify-between"><span>Peak 24h Rain:</span> <strong>{fmtNum(selectedCorridor.forecast7d.peak_daily_mm, ' mm')}</strong></div>
                  <div className="flex justify-between"><span>Max Precip Probability:</span> <strong>{fmtNum(selectedCorridor.forecast7d.max_prob_pct, '%')}</strong></div>
                  <div className="flex justify-between"><span>168h Peak CAPE:</span> <strong>{fmtNum(selectedCorridor.forecast7d.max_cape_jkg, ' J/kg')}</strong></div>
                  <div className="pt-1 border-t border-white/10 text-[11px] text-slate-300">
                    {selectedCorridor.liveObservation.masked_850hpa_reason || `Exposed: ${selectedCorridor.exposedSystem}`}
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
