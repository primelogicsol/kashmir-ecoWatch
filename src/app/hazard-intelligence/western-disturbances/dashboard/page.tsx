'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import { WesternDisturbanceMap } from '@/components/maps/WesternDisturbanceMap';
import { useWesternDisturbanceIntelligence } from '@/hooks/useWesternDisturbanceIntelligence';
import { CompoundRiskLevel, WDSubRegion } from '@/data/hazard-western-disturbances';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Wind, Compass, Calendar, Map, AlertTriangle, ShieldCheck,
  History, Database, RefreshCw, ExternalLink, Waves,
  CloudRain, Mountain, Snowflake, ArrowLeft, CheckCircle2
} from 'lucide-react';

type DashboardTabId =
  | 'overview'
  | 'live-tracker'
  | 'forecasts'
  | 'atmospheric-maps'
  | 'regional-impacts'
  | 'official-alerts'
  | 'historical-records'
  | 'data-sources';

const DASHBOARD_TABS: Array<{
  id: DashboardTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tierBadge: string;
}> = [
  { id: 'overview', label: 'Overview', icon: Compass, tierBadge: 'Synthesis' },
  { id: 'live-tracker', label: 'Live WD Tracker', icon: Wind, tierBadge: 'Live Obs' },
  { id: 'forecasts', label: 'Forecasts', icon: Calendar, tierBadge: '7d NWP' },
  { id: 'atmospheric-maps', label: 'Atmospheric Maps', icon: Map, tierBadge: 'GIS + Radar' },
  { id: 'regional-impacts', label: 'Regional Impacts', icon: AlertTriangle, tierBadge: 'Multi-Hazard' },
  { id: 'official-alerts', label: 'Official Alerts', icon: ShieldCheck, tierBadge: 'IMD / PMD' },
  { id: 'historical-records', label: 'Historical Records', icon: History, tierBadge: 'Archive' },
  { id: 'data-sources', label: 'Data Sources', icon: Database, tierBadge: 'Provenance' },
];

function riskVariant(risk: CompoundRiskLevel): 'success' | 'warning' | 'danger' | 'critical' {
  if (risk === 'Critical') return 'critical';
  if (risk === 'High') return 'danger';
  if (risk === 'Moderate') return 'warning';
  return 'success';
}

export default function WesternDisturbancesDashboardPage() {
  const router = useRouter();
  const {
    synopticSummary,
    upstreamTrack,
    regionalSummaries,
    corridors,
    radarOverlay,
    officialAdvisories,
    historicalRecords,
    dataSources,
    loading,
    refreshing,
    refresh,
    updatedAt,
  } = useWesternDisturbanceIntelligence();

  const [activeTab, setActiveTab] = useState<DashboardTabId>('overview');
  const [selectedRegion, setSelectedRegion] = useState<WDSubRegion | 'All'>('All');

  const subRegions: WDSubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  // Build 7-day aggregated forecast chart series for selected sub-region (or all 31 corridors)
  const forecastChartSeries = useMemo(() => {
    const target = selectedRegion === 'All'
      ? corridors
      : corridors.filter((c) => c.subRegion === selectedRegion);
    if (target.length === 0 || !target[0]?.forecast7d?.daily) return [];

    return target[0].forecast7d.daily.map((dayObj, dIdx) => {
      const avgRain = Number(
        (target.reduce((s, c) => s + (c.forecast7d.daily[dIdx]?.rain_mm || 0), 0) / target.length).toFixed(1)
      );
      const avgSnow = Number(
        (target.reduce((s, c) => s + (c.forecast7d.daily[dIdx]?.snow_cm || 0), 0) / target.length).toFixed(1)
      );
      const maxPrecip = Number(
        Math.max(...target.map((c) => c.forecast7d.daily[dIdx]?.precip_mm || 0)).toFixed(1)
      );
      const maxProb = Math.max(...target.map((c) => c.forecast7d.daily[dIdx]?.prob_pct || 0));
      return {
        date: dayObj.date.slice(5), // MM-DD
        avgRainMm: avgRain,
        avgSnowCm: avgSnow,
        peakCorridorMm: maxPrecip,
        probPct: maxProb,
      };
    });
  }, [corridors, selectedRegion]);

  const filteredCorridorsByRegion = useMemo(() => {
    return selectedRegion === 'All'
      ? corridors
      : corridors.filter((c) => c.subRegion === selectedRegion);
  }, [corridors, selectedRegion]);

  const syncLabel = updatedAt
    ? new Date(updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : 'Live';

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Atmospheric Systems · Multi-Hazard Synoptic Command"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Western Disturbances', href: '/hazard-intelligence/western-disturbances' },
          { label: 'Monitoring Dashboard' },
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
              <span>Western Disturbances</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Monitoring Dashboard
            </span>
          </>
        }
        subtitle="Real-time 500/300 hPa synoptic wave tracking, 7-day NWP precipitation & snowline projections, official IMD/PMD advisories, and multi-hazard cascade analytics across Jammu, Kashmir, Ladakh, Azad Kashmir, Gilgit, and Baltistan."
        icon={<Wind className="w-6 h-6 text-sky-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => router.push('/hazard-intelligence/western-disturbances')}
            >
              WD Corridor Registry
            </Button>
            <Button
              className="bg-gradient-to-r from-sky-600 to-indigo-600 font-bold text-white"
              icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
              onClick={refresh}
              disabled={refreshing}
            >
              {refreshing ? 'Syncing Synoptic Feeds...' : 'Refresh Telemetry'}
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip
        kpis={[
          { label: 'Active Passages', value: loading ? '...' : synopticSummary?.activePassageCount ?? 0, icon: 'Wind', color: 'text-red-400' },
          { label: 'Upstream Waves', value: loading ? '...' : synopticSummary?.upstreamActiveTroughs ?? 0, icon: 'Compass', color: 'text-amber-400' },
          { label: '300 hPa Jet Core', value: loading ? '...' : `${synopticSummary?.maxJetCoreKmh ?? 95} km/h`, icon: 'Zap', color: 'text-indigo-400' },
          { label: 'Mean 0°C Snowline', value: loading ? '...' : `${synopticSummary?.meanFreezingLevelM ?? 3400} m`, icon: 'Snowflake', color: 'text-cyan-300' },
          { label: 'Peak 7d Precip', value: loading ? '...' : `${synopticSummary?.peak7dPrecipMm ?? 0} mm`, icon: 'CloudRain', color: 'text-sky-400' },
          { label: 'Peak 7d Snowfall', value: loading ? '...' : `${synopticSummary?.peak7dSnowCm ?? 0} cm`, icon: 'Mountain', color: 'text-purple-300' },
          { label: 'Hazard Watch Zones', value: loading ? '...' : synopticSummary?.elevatedHazardCorridors ?? 0, icon: 'AlertTriangle', color: 'text-orange-400' },
          { label: 'Telemetry Sync', value: loading ? '...' : syncLabel, icon: 'Clock', color: 'text-emerald-400' },
        ]}
        iconColor="text-sky-400"
      />

      {/* ── STICKY 8-TAB NAVIGATION BAR + SUBREGION FILTER ───────────────── */}
      <div className="sticky top-14 sm:top-16 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
            {DASHBOARD_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-sky-500/20 text-white border-sky-400/50 shadow-sm'
                      : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Global 6-Region Filter Pill */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mr-1">Region:</span>
            {(['All', ...subRegions] as const).map((sr) => (
              <button
                key={sr}
                type="button"
                onClick={() => setSelectedRegion(sr)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                  selectedRegion === sr
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {sr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROVENANCE LEGEND STRIP ──────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-[11px]">
          <span className="text-slate-300 font-semibold">Strict Data Tier Separation:</span>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Live Observation / UTC Analysis
            </span>
            <span className="inline-flex items-center gap-1.5 text-sky-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" /> 7-Day NWP Model Forecast
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Statutory Agency Advisory (IMD / PMD / DGRE)
            </span>
            <span className="inline-flex items-center gap-1.5 text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Verified Historical Record
            </span>
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT WORKSPACE ────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-6 flex-1 space-y-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card className="glass-intense border-sky-500/25 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Live Synoptic Synthesis · UTC Current Cycle
                </span>
                <Badge variant="info" size="sm">6 Western Himalayan Sub-Regions</Badge>
              </div>
              <h2 className="text-lg font-bold text-white">
                {synopticSummary?.headline || 'Loading Western Himalayan synoptic diagnostics...'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Separating current observed upper-air pressure/jet conditions from 7-day ECMWF/GFS numerical precipitation forecasts and coupled downstream hazard pathways.
              </p>
            </Card>

            {/* 6-Region Live vs Forecast Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalSummaries
                .filter((r) => selectedRegion === 'All' || r.subRegion === selectedRegion)
                .map((sr) => (
                  <Card key={sr.subRegion} className="glass-intense border-white/10 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{sr.subRegion}</h3>
                        <p className="text-[11px] text-slate-400">{sr.corridorCount} monitored corridors</p>
                      </div>
                      <Badge variant={riskVariant(sr.overallRisk)} size="sm">
                        {sr.overallRisk} Risk
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20">
                        <div className="text-[9px] font-bold uppercase text-emerald-400">Live Observed</div>
                        <div className="text-white font-bold mt-0.5">{sr.liveAvgTempC}°C · {sr.liveAvgCloudPct}% Cloud</div>
                        <div className="text-[10px] text-slate-400">Snowline: {sr.liveMeanFreezingLevelM} m</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-sky-500/[0.06] border border-sky-500/20">
                        <div className="text-[9px] font-bold uppercase text-sky-400">7d Forecast Peak</div>
                        <div className="text-white font-bold mt-0.5">{sr.forecastMax7dPrecipMm} mm Precip</div>
                        <div className="text-[10px] text-sky-200">{sr.forecastMax7dSnowCm} cm Snow</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 grid grid-cols-4 gap-1 text-[10px] text-center">
                      <Link href="/hazard-intelligence/floods" className="p-1.5 rounded bg-white/5 hover:bg-white/10">
                        <div className="text-slate-400">Floods</div>
                        <div className="font-bold text-white">{sr.floodRisk}</div>
                      </Link>
                      <Link href="/hazard-intelligence/flash-floods" className="p-1.5 rounded bg-white/5 hover:bg-white/10">
                        <div className="text-slate-400">Flash</div>
                        <div className="font-bold text-white">{sr.flashFloodRisk}</div>
                      </Link>
                      <Link href="/hazard-intelligence/landslides" className="p-1.5 rounded bg-white/5 hover:bg-white/10">
                        <div className="text-slate-400">Slides</div>
                        <div className="font-bold text-white">{sr.landslideRisk}</div>
                      </Link>
                      <Link href="/hazard-intelligence/avalanches" className="p-1.5 rounded bg-white/5 hover:bg-white/10">
                        <div className="text-slate-400">Aval.</div>
                        <div className="font-bold text-white">{sr.avalancheRisk}</div>
                      </Link>
                    </div>
                  </Card>
                ))}
            </div>

            {/* 7-Day Forecast Trajectory Preview */}
            <Card className="glass-intense border-white/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    7-Day Numerical Weather Prediction (NWP)
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Upcoming Rain (mm) vs. Snowfall (cm) Trajectory — {selectedRegion === 'All' ? 'All 6 Regions' : selectedRegion}
                  </h3>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-white/15" onClick={() => setActiveTab('forecasts')}>
                  Detailed Forecast Table →
                </Button>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forecastChartSeries}>
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
                    <Bar dataKey="avgRainMm" name="Mean Liquid Rain (mm)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avgSnowCm" name="Mean Snowfall (cm)" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="peakCorridorMm" name="Peak Corridor Precip (mm)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: LIVE WD TRACKER */}
        {activeTab === 'live-tracker' && (
          <div className="space-y-6">
            <Card className="glass-intense border-emerald-500/25 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Live Observation · 500 hPa &amp; 300 hPa Synoptic Wave Guide
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    Mediterranean → Caspian → Hindu Kush → Western Himalaya Wave Tracker
                  </h2>
                </div>
                <Badge variant="success" size="sm">6 Upstream Synoptic Checkpoints</Badge>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Tracks real-time 500 hPa geopotential height depressions (&lt;5,640 gpm indicates deep cyclonic trough), 24-hour surface pressure falls, and 300 hPa Subtropical Westerly Jet wind cores along the approach path into Chitral, Gilgit, Muzaffarabad, Srinagar, Jammu, and Leh.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upstreamTrack.map((node, i) => (
                  <div
                    key={node.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-sky-400">Sector {i + 1} · {node.distanceToKashmirKm} km W</span>
                      <Badge
                        variant={
                          node.troughSignal === 'Active Trough'
                            ? 'danger'
                            : node.troughSignal === 'Developing Wave'
                              ? 'warning'
                              : 'success'
                        }
                        size="sm"
                        className="text-[9px]"
                      >
                        {node.troughSignal}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-white">{node.name}</h3>
                    <p className="text-[11px] text-slate-400">{node.sector} · {node.country}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">500 hPa Height</span>
                        <strong className="text-white font-mono">{node.z500_gpm} gpm</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">300 hPa Jet</span>
                        <strong className="text-indigo-300 font-mono">{node.jet300_kmh} km/h ({node.jet300_dir_deg}°)</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">MSL Pressure (24h)</span>
                        <strong className="text-slate-200 font-mono">
                          {node.pressure_msl_hpa} ({node.pressure_24h_delta_hpa >= 0 ? '+' : ''}{node.pressure_24h_delta_hpa})
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Cloud / 72h Fcst</span>
                        <strong className="text-sky-300 font-mono">{node.cloud_cover_pct}% · {node.next72h_precip_mm}mm</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <WesternDisturbanceMap
              corridors={filteredCorridorsByRegion}
              upstreamTrack={upstreamTrack}
              radarTileUrl={radarOverlay.latestTileTemplate}
              defaultScope="synoptic"
              defaultParameter="jet300"
            />
          </div>
        )}

        {/* TAB 3: FORECASTS */}
        {activeTab === 'forecasts' && (
          <div className="space-y-6">
            <Card className="glass-intense border-sky-500/25 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    Numerical Weather Prediction · 7-Day Outlook (Not Live Observation)
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    7-Day Precipitation Probability &amp; Corridor Peak Intensity ({selectedRegion})
                  </h2>
                </div>
                <Badge variant="info" size="sm">ECMWF IFS / NOAA GFS Ensemble Blend</Badge>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastChartSeries}>
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
                    <Area type="monotone" dataKey="peakCorridorMm" name="Peak Corridor Precip (mm)" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.28} />
                    <Area type="monotone" dataKey="probPct" name="Max Precip Probability (%)" stroke="#f59e0b" fill="#d97706" fillOpacity={0.18} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
              <h3 className="text-base font-bold text-white mb-3">
                Corridor-Level 7-Day Forecast Matrix ({filteredCorridorsByRegion.length} Corridors)
              </h3>
              <table className="w-full text-left text-xs min-w-[780px]">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                    <th className="py-2.5 pr-3">Corridor</th>
                    <th className="py-2.5 px-2">Sub-Region</th>
                    <th className="py-2.5 px-2">Elev (m)</th>
                    <th className="py-2.5 px-2">7d Precip (mm)</th>
                    <th className="py-2.5 px-2">7d Snow (cm)</th>
                    <th className="py-2.5 px-2">Min Snowline (m)</th>
                    <th className="py-2.5 px-2">Max Gust (km/h)</th>
                    <th className="py-2.5 pl-2">Synoptic Phase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCorridorsByRegion.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.03]">
                      <td className="py-2.5 pr-3 font-semibold text-white">{c.name}</td>
                      <td className="py-2.5 px-2 text-slate-300">{c.subRegion}</td>
                      <td className="py-2.5 px-2 font-mono text-slate-400">{c.elevation_m}</td>
                      <td className="py-2.5 px-2 font-mono font-bold text-sky-300">{c.forecast7d.total_precip_mm}</td>
                      <td className="py-2.5 px-2 font-mono font-bold text-purple-300">{c.forecast7d.total_snow_cm}</td>
                      <td className="py-2.5 px-2 font-mono text-cyan-300">{c.forecast7d.min_freezing_level_m}</td>
                      <td className="py-2.5 px-2 font-mono text-slate-300">{c.forecast7d.max_wind_gust_kmh}</td>
                      <td className="py-2.5 pl-2 text-slate-300">{c.wdPhase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {/* TAB 4: ATMOSPHERIC MAPS */}
        {activeTab === 'atmospheric-maps' && (
          <div className="space-y-4">
            <Card className="glass-intense border-white/10 p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white">
                  Interactive Synoptic, Radar &amp; Orographic Parameter GIS
                </h2>
                <p className="text-xs text-slate-400">
                  Switch between 7d Forecast Precipitation, 7d Snowfall, Live 0°C Freezing Level, Live 300 hPa Jet Winds, and Live RainViewer Weather Radar reflectivity.
                </p>
              </div>
              {radarOverlay.available && radarOverlay.observedAtUtc && (
                <Badge variant="success" size="sm" className="text-[10px]">
                  Live Radar Frame: {new Date(radarOverlay.observedAtUtc).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </Badge>
              )}
            </Card>

            <WesternDisturbanceMap
              corridors={filteredCorridorsByRegion}
              upstreamTrack={upstreamTrack}
              radarTileUrl={radarOverlay.latestTileTemplate}
              defaultScope="regional"
              defaultParameter="precip7d"
              heightClass="h-[600px]"
            />
          </div>
        )}

        {/* TAB 5: REGIONAL IMPACTS (Multi-Hazard Coupling) */}
        {activeTab === 'regional-impacts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: 'Riverine Floods',
                  href: '/hazard-intelligence/floods',
                  icon: Waves,
                  color: 'text-cyan-400',
                  risk: synopticSummary?.compoundCoupling.floods || 'Low',
                  mechanism: 'Prolonged multi-day liquid rainfall across Jhelum, Chenab, Tawi & Mangla catchments when freezing level exceeds 2,600 m.',
                },
                {
                  title: 'Flash Floods',
                  href: '/hazard-intelligence/flash-floods',
                  icon: CloudRain,
                  color: 'text-blue-400',
                  risk: synopticSummary?.compoundCoupling.flashFloods || 'Low',
                  mechanism: 'Embedded convective squall lines and warm rain-on-snow melt surges in steep Lidder, Sindh, Rambiara & Neelum torrents.',
                },
                {
                  title: 'Landslides & Slope Creep',
                  href: '/hazard-intelligence/landslides',
                  icon: Mountain,
                  color: 'text-amber-400',
                  risk: synopticSummary?.compoundCoupling.landslides || 'Low',
                  mechanism: 'Pore-pressure saturation and freeze-thaw wedging along NH-44 Ramban, Mughal Road, Muzaffarabad & Karakoram Highway.',
                },
                {
                  title: 'Snowpack & Avalanches',
                  href: '/hazard-intelligence/avalanches',
                  icon: Snowflake,
                  color: 'text-sky-300',
                  risk: synopticSummary?.compoundCoupling.avalanches || 'Low',
                  mechanism: 'Rapid new snow loading (>30 cm) paired with 300 hPa / ridge gale wind-slab transport on Gulmarg, Zoji La, Gurez, Drass & Skardu.',
                },
              ].map((hz) => {
                const Icon = hz.icon;
                return (
                  <Link key={hz.title} href={hz.href} className="group">
                    <Card className="glass-intense border-white/10 hover:border-sky-500/40 p-5 h-full flex flex-col justify-between transition-all">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <Icon className={`w-5 h-5 ${hz.color}`} />
                          <Badge variant={riskVariant(hz.risk)} size="sm">{hz.risk}</Badge>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-sky-300">{hz.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{hz.mechanism}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-white/5 text-xs font-semibold text-sky-400">
                        Open Connected Module →
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
              <h3 className="text-base font-bold text-white mb-3">
                Corridor-to-Hazard Trigger Matrix ({filteredCorridorsByRegion.length} Corridors)
              </h3>
              <table className="w-full text-left text-xs min-w-[780px]">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[10px] uppercase">
                    <th className="py-2.5 pr-3">Corridor &amp; District</th>
                    <th className="py-2.5 px-2">Sub-Region</th>
                    <th className="py-2.5 px-2">Floods</th>
                    <th className="py-2.5 px-2">Flash Floods</th>
                    <th className="py-2.5 px-2">Landslides</th>
                    <th className="py-2.5 px-2">Avalanches</th>
                    <th className="py-2.5 pl-2">Exposed Lifeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCorridorsByRegion.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.03]">
                      <td className="py-2.5 pr-3 font-semibold text-white">{c.name}</td>
                      <td className="py-2.5 px-2 text-slate-300">{c.subRegion}</td>
                      <td className="py-2.5 px-2"><Badge variant={riskVariant(c.compoundTriggers.floods)} size="sm">{c.compoundTriggers.floods}</Badge></td>
                      <td className="py-2.5 px-2"><Badge variant={riskVariant(c.compoundTriggers.flashFloods)} size="sm">{c.compoundTriggers.flashFloods}</Badge></td>
                      <td className="py-2.5 px-2"><Badge variant={riskVariant(c.compoundTriggers.landslides)} size="sm">{c.compoundTriggers.landslides}</Badge></td>
                      <td className="py-2.5 px-2"><Badge variant={riskVariant(c.compoundTriggers.avalanches)} size="sm">{c.compoundTriggers.avalanches}</Badge></td>
                      <td className="py-2.5 pl-2 text-slate-400 max-w-xs truncate">{c.key_infrastructure_exposed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {/* TAB 6: OFFICIAL ALERTS */}
        {activeTab === 'official-alerts' && (
          <div className="space-y-6">
            <Card className="glass-intense border-amber-500/25 p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Statutory Meteorological &amp; Disaster Authorities (Provenance: Official Advisories)
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                Verified Official Agency Bulletins &amp; Statutory Warning Portals
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                KEW strictly distinguishes automated NWP model thresholds from statutory government weather warnings. Consult the official meteorological and disaster management authorities below for statutory Red/Orange/Yellow warnings and road closure orders.
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {officialAdvisories
                .filter((a) => selectedRegion === 'All' || a.subRegionsCovered.includes(selectedRegion))
                .map((adv) => (
                  <Card key={adv.id} className="glass-intense border-white/10 p-5 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="warning" size="sm" className="text-[9px]">Official Agency Portal</Badge>
                        <span className="text-[10px] text-slate-400 font-mono">{adv.cadence}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{adv.agency}</h3>
                      <div className="text-xs text-sky-300 font-medium">{adv.division} · {adv.jurisdiction}</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{adv.notes}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {adv.subRegionsCovered.map((sr) => (
                          <span key={sr} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                            {sr}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={adv.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 transition-colors"
                    >
                      <span>Open Official Bulletin ({adv.bulletinType.split(' ')[0]})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* TAB 7: HISTORICAL RECORDS */}
        {activeTab === 'historical-records' && (
          <div className="space-y-6">
            <Card className="glass-intense border-purple-500/25 p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                Verified Climatological &amp; Post-Disaster Archive (2014–2025)
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                Benchmark Western Disturbance Events &amp; Multi-Hazard Cascades
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Peer-reviewed and IMD/PMD-documented synoptic Western Disturbances demonstrating how single extratropical waves simultaneously trigger river floods, flash floods, highway landslides, and high-altitude avalanches.
              </p>
            </Card>

            <div className="space-y-4">
              {historicalRecords
                .filter((h) => selectedRegion === 'All' || h.subRegionsAffected.includes(selectedRegion))
                .map((rec) => (
                  <Card key={rec.id} className="glass-intense border-white/10 p-5 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {rec.eventCode} · Historical Record
                          </span>
                          <span className="text-xs text-slate-400">{rec.dates}</span>
                          <span className="text-xs text-sky-300 font-medium">({rec.season})</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{rec.title}</h3>
                      </div>
                      <Badge variant="critical" size="sm">{rec.intensityCategory}</Badge>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{rec.documentedImpact}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Peak Rain / Snow</span>
                        <strong className="text-white">{rec.peakPrecipOrSnow}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">500 hPa Core Trough</span>
                        <strong className="text-sky-300 font-mono">{rec.min500hPaHeightGpm} gpm</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Triggered Hazards</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {rec.triggeredHazards.map((th) => (
                            <span key={th} className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/25">
                              {th}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono">
                      Citation: {rec.primarySource}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* TAB 8: DATA SOURCES */}
        {activeTab === 'data-sources' && (
          <div className="space-y-6">
            <Card className="glass-intense border-emerald-500/25 p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Scientific Provenance &amp; Open Telemetry Ledger
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                Verified Meteorological, Upper-Air &amp; Radar Providers
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                All automated telemetry on this module is fetched exclusively from verified, publicly accessible scientific APIs without synthetic multipliers or unverified scraping.
              </p>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              {dataSources.map((src) => (
                <Card key={src.name} className="glass-intense border-white/10 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{src.name}</span>
                      </h3>
                      <div className="text-[11px] text-sky-300 font-mono mt-0.5">{src.endpoint}</div>
                    </div>
                    <Badge variant="info" size="sm" className="text-[10px]">{src.tier}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 pt-3 border-t border-white/5 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Parameters</span>
                      <span className="text-slate-300">{src.parameters}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Spatial Resolution &amp; Cadence</span>
                      <span className="text-slate-300">{src.resolution} · {src.cadence}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Geographic Coverage</span>
                      <span className="text-slate-300">{src.coverage}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── RELATED HAZARD INTELLIGENCE ──────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="western-disturbances" />
      </div>
    </main>
  );
}
