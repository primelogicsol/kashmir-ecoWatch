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
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { DisplaySubRegion } from '@/lib/atmospheric-ingestion';
import {
  ExtremeRainfallLiveRecord,
  ExtremeRainRiskClass,
} from '@/data/hazard-extreme-weather';
import {
  CloudRain, Waves, Mountain, Droplets, BarChart3, Layers,
  MapPin, RefreshCw, ChevronLeft, ChevronRight, X, ArrowRight, AlertTriangle
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

function fmt(v: number | null | undefined, s = ''): string {
  return v === null || v === undefined || Number.isNaN(v) ? '—' : `${v}${s}`;
}

function classBadgeVariant(c: ExtremeRainRiskClass): 'default' | 'success' | 'warning' | 'danger' | 'critical' {
  if (c === 'Cloudburst-Supportive Environment (Unconfirmed)') return 'critical';
  if (c === 'Heavy Orographic Rain Warning') return 'danger';
  if (c === 'Elevated Rain Watch') return 'warning';
  if (c === 'No Extreme Rainfall Signal') return 'success';
  return 'default';
}

const HAZARD_LINKS: Record<
  'flash-floods' | 'floods' | 'landslides' | 'glofs',
  { label: string; href: string }
> = {
  'flash-floods': { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods' },
  floods: { label: 'Floods', href: '/hazard-intelligence/floods' },
  landslides: { label: 'Landslides', href: '/hazard-intelligence/landslides' },
  glofs: { label: 'GLOFs', href: '/hazard-intelligence/glofs' },
};

export default function ExtremeRainfallCloudburstsPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [subRegionFilter, setSubRegionFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [activeTypology, setActiveTypology] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<ExtremeRainfallLiveRecord | null>(null);

  const load = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(
        `/api/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts${force ? '?refresh=1' : ''}`,
        { cache: 'no-store' }
      );
      const json = await res.json();
      if (json.success) setData(json);
    } catch {}
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  const watersheds: ExtremeRainfallLiveRecord[] = data?.watersheds || [];
  const subRegions: DisplaySubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  const filtered = useMemo(() => {
    return watersheds.filter((w) => {
      const matchSearch =
        filter.searchQuery === '' ||
        w.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        w.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        w.subRegion.toLowerCase().includes(filter.searchQuery.toLowerCase());
      const matchScope = filter.scope === 'All' || w.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || w.district === filter.district;
      const matchRegion = subRegionFilter === 'all' || w.subRegion === subRegionFilter;
      const matchRisk = riskFilter === 'all' || w.extremeClass === riskFilter;
      const matchTypo =
        activeTypology === 'all' ||
        (activeTypology === 'gorges' && w.watershedType === 'Steep Glacial / Pilgrimage Gorge') ||
        (activeTypology === 'shivalik' && w.watershedType === 'Windward Shivalik Escarpment') ||
        (activeTypology === 'cutslope' && w.watershedType === 'Pir Panjal Cut-Slope Torrent') ||
        (activeTypology === 'fans' && w.watershedType === 'Arid Trans-Himalayan Debris Fan');
      return matchSearch && matchScope && matchDistrict && matchRegion && matchRisk && matchTypo;
    });
  }, [watersheds, filter, subRegionFilter, riskFilter, activeTypology]);

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const sm = data?.summary;
  const syncShort = data?.meta?.updatedAt
    ? `${new Date(data.meta.updatedAt).toISOString().slice(5, 16).replace('T', ' ')}Z`
    : 'Syncing';

  const extraActiveCount = [subRegionFilter, riskFilter].filter((x) => x !== 'all').length;
  const scopeCount = filter.scope === 'All' ? 0 : watersheds.filter((w) => w.scope === filter.scope).length;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence · Extreme Weather Systems"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Extreme Weather', href: '/hazard-intelligence/extreme-weather' },
          { label: 'Extreme Rainfall & Cloudbursts' },
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-300 bg-clip-text text-transparent">
              Extreme Rainfall &amp; Cloudbursts
            </span>
          </>
        }
        subtitle="1h / 3h / 24h precipitation intensity diagnostics, 31-member NOAA GFS ensemble probabilities, ERA5-Land historical rainfall anomalies, and steep mountain watershed exposure across Kashmir, Jammu, Ladakh, Azad Kashmir, Gilgit, and Baltistan."
        icon={<CloudRain className="w-6 h-6 text-cyan-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-white"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard')}
            >
              Open 8-Tab Monitoring Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Layers className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/extreme-weather')}
            >
              Extreme Weather Hub (12)
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Reporting / Configured', value: loading ? '...' : `${sm?.reportingWatersheds ?? '—'}/${sm?.configuredWatersheds ?? 24}`, icon: 'MapPin', color: 'text-cyan-400' },
          { label: 'Regions Covered', value: 6, icon: 'Globe', color: 'text-teal-400' },
          { label: 'ERA5 Past 7d Max', value: loading ? '...' : fmt(sm?.peakEra5Past7dMm, ' mm'), icon: 'Database', color: 'text-emerald-400' },
          { label: 'Peak 1h Forecast', value: loading ? '...' : fmt(sm?.peakForecast1hMm, ' mm/h'), icon: 'Zap', color: 'text-amber-300' },
          { label: 'Peak 24h Forecast', value: loading ? '...' : fmt(sm?.peakForecast24hMm, ' mm'), icon: 'CloudRain', color: 'text-sky-400' },
          { label: 'Ensemble P(≥50mm)', value: loading ? '...' : fmt(sm?.maxEnsembleProbGe50Pct, '%'), icon: 'BarChart3', color: 'text-indigo-400' },
          { label: 'Rainfall Alerts', value: loading ? '...' : sm?.elevatedAlertWatersheds ?? '—', icon: 'AlertTriangle', color: 'text-rose-400' },
          { label: 'Last Data Sync', value: loading ? '...' : syncShort, icon: 'Clock', color: 'text-emerald-300' },
        ]}
        iconColor="text-cyan-400"
      />

      {/* Scientific Non-Confirmation Guardrail Banner */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-cyan-500/25 p-4 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-950 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Multi-Model Intensity &amp; 31-Member Ensemble Engine
              </span>
              <Badge variant="info" size="sm" className="text-[9px]">Forecast (168h Hourly)</Badge>
              <Badge variant="success" size="sm" className="text-[9px]">31-Member NOAA GFS Ensemble</Badge>
              <Badge variant="warning" size="sm" className="text-[9px]">ERA5-Land Historical ({data?.meta?.historicalWindow || 'T-8d..T-2d'})</Badge>
            </div>
            <p className="text-xs text-amber-200/95">
              {sm?.scientificDisclaimer || 'High forecast rainfall or CAPE identifies cloudburst-supportive environments, NOT confirmed ≥100 mm/h cloudbursts.'}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
              onClick={() => router.push('/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard')}
            >
              8-Tab Dashboard <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => load(true)} disabled={refreshing} className="text-xs border-white/15 text-slate-200">
              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Syncing...' : 'Refresh'}
            </Button>
          </div>
        </Card>
      </section>

      {/* 6-Subregion Strip */}
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
                    active ? 'bg-cyan-500/15 border-cyan-400/50 shadow-lg' : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{sr.subRegion}</span>
                    <span className="text-[10px] font-mono text-slate-400">{sr.reportingWatersheds}/{sr.watersheds}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 truncate">{sr.administrativeUnit}</div>
                  <div className="text-[10px] text-emerald-300 mt-0.5">ERA5 7d: {fmt(sr.era5Mean7dMm, ' mm')}</div>
                  <div className="text-[10px] text-sky-300">Max 24h: {fmt(sr.peakForecast24hMm, ' mm')}</div>
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
                value={riskFilter}
                onChange={(v) => { setRiskFilter(v); setCurrentPage(1); }}
                placeholder="Risk Classification"
                options={[
                  { value: 'No Extreme Rainfall Signal', label: 'No Extreme Rainfall Signal' },
                  { value: 'Elevated Rain Watch', label: 'Elevated Rain Watch' },
                  { value: 'Heavy Orographic Rain Warning', label: 'Heavy Orographic Rain Warning' },
                  { value: 'Cloudburst-Supportive Environment (Unconfirmed)', label: 'Cloudburst-Supportive (Proxy)' },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setSubRegionFilter('all');
            setRiskFilter('all');
          }}
        />
      </div>

      <ModuleScopeRow
        filteredCount={filtered.length}
        totalCount={watersheds.length || 24}
        entityLabel="monitored watersheds"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Watersheds')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      <section id="erc-watershed-registry" className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {loading && watersheds.length === 0 ? (
            <div className="py-20 text-center glass-intense border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-cyan-400" />
              <p className="text-sm font-semibold text-white">Synchronizing 24 Watersheds, 31-Member GFS Ensemble &amp; ERA5 Reanalysis...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((w) => (
                <Card
                  key={w.id}
                  onClick={() => setSelected(w)}
                  className="glass-intense border-white/10 hover:border-cyan-500/40 p-5 flex flex-col gap-3 cursor-pointer transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-300">{w.name}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{w.district} · <strong>{w.subRegion}</strong> ({w.administrativeUnit}) · {w.elevation_m}m</span>
                      </p>
                    </div>
                    <Badge variant={classBadgeVariant(w.extremeClass)} size="sm" className="text-[9px] shrink-0">
                      {w.extremeClass === 'No Extreme Rainfall Signal' ? 'No Signal' : w.extremeClass}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-emerald-400">ERA5 + 0h Analysis</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">ERA5 Past 7d</span>
                        <span className="font-bold text-white">{fmt(w.currentAnalysis.era5_past7d_mm, ' mm')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">TCWV</span>
                        <span className="font-mono text-teal-300">{fmt(w.currentAnalysis.tcwv_kg_m2, ' kg/m²')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">0°C Level</span>
                        <span className="font-mono text-cyan-300">{fmt(w.currentAnalysis.freezing_level_m, ' m')}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-sky-500/[0.06] border border-sky-500/20 space-y-1">
                      <div className="text-[9px] font-bold uppercase text-sky-400">168h + 31-Member Ens</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">1h / 3h / 24h</span>
                        <span className="font-bold text-white">
                          {fmt(w.forecast168h.peak_1h_mm)}/{fmt(w.forecast168h.peak_3h_mm)}/{fmt(w.forecast168h.peak_24h_mm)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Ens P90 (7d)</span>
                        <span className="font-mono text-indigo-300">{fmt(w.ensembleGfs31.p90_7d_mm, ' mm')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">P(24h ≥ 50mm)</span>
                        <span className="font-mono text-amber-300">{fmt(w.ensembleGfs31.prob_24h_ge_50mm_pct, '%')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {w.coupledHazards.map((hz) => (
                      <Link key={hz} href={HAZARD_LINKS[hz].href} onClick={(e) => e.stopPropagation()} className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 hover:text-white">
                        {HAZARD_LINKS[hz].label} →
                      </Link>
                    ))}
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
          typologyTitle="Extreme Rainfall & Cloudburst Watershed Typologies"
          typologySubtitle="Filter watersheds by steep glacial/pilgrimage gorges, windward Shivalik escarpments, Pir Panjal cut-slope torrents, or arid Trans-Himalayan debris fans."
          typologyIcon={CloudRain}
          typologies={[
            { id: 'all', label: 'All 24 Watersheds', count: watersheds.length, icon: CloudRain, color: 'cyan' },
            { id: 'gorges', label: 'Glacial / Pilgrimage Gorges', count: watersheds.filter((w) => w.watershedType === 'Steep Glacial / Pilgrimage Gorge').length, icon: Mountain, color: 'sky' },
            { id: 'shivalik', label: 'Windward Shivalik Escarpments', count: watersheds.filter((w) => w.watershedType === 'Windward Shivalik Escarpment').length, icon: Waves, color: 'teal' },
            { id: 'cutslope', label: 'Pir Panjal Cut-Slope Torrents', count: watersheds.filter((w) => w.watershedType === 'Pir Panjal Cut-Slope Torrent').length, icon: AlertTriangle, color: 'amber' },
            { id: 'fans', label: 'Arid Trans-Himalayan Debris Fans', count: watersheds.filter((w) => w.watershedType === 'Arid Trans-Himalayan Debris Fan').length, icon: Droplets, color: 'indigo' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => {
            setActiveTypology(id);
            setCurrentPage(1);
            document.getElementById('erc-watershed-registry')?.scrollIntoView({ behavior: 'smooth' });
          }}
          showingCount={filtered.length}
          totalCount={watersheds.length}
          entityLabel="watersheds"
          spotlightTitle="Why NWP Models Require Ensemble & Radar Fusion for Mountain Cloudbursts"
          spotlightSubtitle="IMD defines a cloudburst as ≥100 mm/hour over ~20–30 km²; coarse global models diagnose convective instability and moisture flux while ensemble spread quantifies tail risk."
          tabs={[
            {
              id: 'cb-science',
              label: 'Cloudburst Scale vs. Arid Debris-Fan Vulnerability',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">IMD Threshold vs. Himalayas</span>
                    <h5 className="text-sm font-semibold text-white mb-2">100 mm/h vs. Mini-Cloudbursts</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      While formal cloudbursts exceed 100 mm/h, steep unvegetated Himalayan cirques and Ladakh/Karakoram fans frequently suffer catastrophic debris flows from 25–50 mm/h &quot;mini-cloudbursts&quot;.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                    <span className="text-xs font-bold text-indigo-400 block mb-1">Probabilistic Tail Risk</span>
                    <h5 className="text-sm font-semibold text-white mb-2">31-Member NOAA GFS Ensemble</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Deterministic models often smooth convective peaks; tracking the 90th percentile (P90) and member exceedance probability P(24h &gt;= 50 mm) reveals tail-risk rain events days in advance.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Verification Requirement</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Doppler Radar &amp; Rain Gauges</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Confirmed cloudburst attribution requires IMD Srinagar/Banihal/Jammu Doppler radar reflectivity, NASA GPM IMERG satellite passes (~4h latency), or automated tipping-bucket gauges.
                    </p>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Extreme Rainfall & Torrent Surge Reporting"
          observeSubtitle="Submit verified rain-gauge readings, sudden stream rise videos, or culvert blockages across mountain watersheds."
          observeBadge="KEW Flash-Runoff Sentinel"
          protocols={[
            { number: '1', title: 'Sub-Hourly Rain Gauge Logging', desc: 'Report 30-min or 1-hour rainfall accumulations during intense convective cells.', benchmark: 'Sub-Grid Cloudburst Verification', icon: CloudRain, color: 'cyan' },
            { number: '2', title: 'Debris-Fan Boulder Slurry Alert', desc: 'Flag hyper-concentrated mud/boulder flow initiation in steep nallahs.', benchmark: 'Immediate Downstream Evacuation Signal', icon: Mountain, color: 'amber' },
            { number: '3', title: 'Bridge Freeboard Clearance Check', desc: 'Photograph rising water levels relative to bridge decks on Lidder, Vishaw, Tawi, or Neelum.', benchmark: 'Hydraulic Stage Escalation', icon: Waves, color: 'sky' },
            { number: '4', title: 'Glacial Cirque Warm-Rain Spotting', desc: 'Log warm convective downpours occurring above 3,500 m.', benchmark: 'Coupled GLOF / Flash-Flood Trigger', icon: Droplets, color: 'teal' },
          ]}
        />
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
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
                  <Badge variant={classBadgeVariant(selected.extremeClass)} size="sm" className="mb-1">
                    {selected.extremeClass}
                  </Badge>
                  <h3 className="text-lg font-bold text-white">{selected.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {selected.district} · {selected.subRegion} ({selected.administrativeUnit}) · Stn {selected.elevation_m}m / DEM {fmt(selected.provenance.modelGridElevationM, 'm')}
                  </p>
                </div>
                <button type="button" onClick={() => setSelected(null)} className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-emerald-400">ERA5 Historical &amp; 0h Analysis</div>
                  <div className="flex justify-between"><span>ERA5 Past 7d Rain:</span> <strong>{fmt(selected.currentAnalysis.era5_past7d_mm, ' mm')}</strong></div>
                  <div className="flex justify-between"><span>Climatology Normal:</span> <strong>{selected.normalWeeklyRainMm} mm</strong></div>
                  <div className="flex justify-between"><span>Total-Column Water (TCWV):</span> <strong>{fmt(selected.currentAnalysis.tcwv_kg_m2, ' kg/m²')}</strong></div>
                  <div className="flex justify-between"><span>0°C Freezing-Level Alt:</span> <strong>{fmt(selected.currentAnalysis.freezing_level_m, ' m')}</strong></div>
                </div>
                <div className="p-4 rounded-xl bg-sky-500/[0.06] border border-sky-500/25 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase text-sky-400">168h NWP &amp; 31-Member Ensemble</div>
                  <div className="flex justify-between"><span>Peak 1h / 3h / 24h:</span> <strong>{fmt(selected.forecast168h.peak_1h_mm)} / {fmt(selected.forecast168h.peak_3h_mm)} / {fmt(selected.forecast168h.peak_24h_mm, ' mm')}</strong></div>
                  <div className="flex justify-between"><span>168h Deterministic Total:</span> <strong>{fmt(selected.forecast168h.total_168h_mm, ' mm')}</strong></div>
                  <div className="flex justify-between"><span>Ensemble Median / P90 (7d):</span> <strong>{fmt(selected.ensembleGfs31.median_7d_mm)} / {fmt(selected.ensembleGfs31.p90_7d_mm, ' mm')}</strong></div>
                  <div className="flex justify-between"><span>P(24h ≥ 25mm / ≥ 50mm):</span> <strong>{fmt(selected.ensembleGfs31.prob_24h_ge_25mm_pct, '%')} / {fmt(selected.ensembleGfs31.prob_24h_ge_50mm_pct, '%')}</strong></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <div><strong>Scientific Basis:</strong> {selected.scientificBasis}</div>
                <div className="text-slate-400 mt-1"><strong>Exposed Assets:</strong> {selected.exposedAssets}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="extreme-rainfall-cloudbursts" />
      </div>
    </main>
  );
}
