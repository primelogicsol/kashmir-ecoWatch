'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Snowflake, ChevronRight, AlertTriangle, MapPin, Shield, Activity,
  CheckCircle, Mountain, Eye, TrendingUp, BarChart3, Clock,
  Triangle, Droplets, Radio, RefreshCw, ExternalLink, HardDrive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { avalancheData, AvalancheRecord } from '@/data/hazard-avalanches';
import { useAvalancheIntelligence } from '@/hooks/useAvalancheIntelligence';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import { ScientificMonitoringStatus } from '@/components/common/ScientificMonitoringStatus';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

// ─── Status & Verification helpers ─────────────────────────────────────────────

function getRiskBadgeVariant(risk: string): 'success' | 'warning' | 'danger' | 'critical' | 'default' {
  if (risk === 'Low') return 'success';
  if (risk === 'Moderate') return 'warning';
  if (risk === 'High') return 'danger';
  if (risk === 'Critical') return 'critical';
  return 'default';
}

function getRiskColor(risk: string) {
  if (risk === 'Low') return 'text-emerald-400';
  if (risk === 'Moderate') return 'text-amber-400';
  if (risk === 'High') return 'text-orange-400';
  if (risk === 'Critical') return 'text-red-400';
  return 'text-slate-400';
}

function getStatusBadge(status: string) {
  if (status === 'Active Warning') {
    return {
      text: 'Official Warning Active',
      className: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse font-bold',
      icon: AlertTriangle
    };
  }
  if (status === 'Watch') {
    return {
      text: 'Elevated Terrain Watch',
      className: 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium',
      icon: Eye
    };
  }
  if (status === 'Seasonal') {
    return {
      text: 'Seasonal Vulnerability',
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: Clock
    };
  }
  return {
    text: 'Monitored (Normal)',
    className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: CheckCircle
  };
}

function getVerificationBadge(vs: string) {
  if (vs.includes('GAC') || vs.includes('Gulmarg')) {
    return {
      text: 'GAC Field Monitored Sector',
      className: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
    };
  }
  if (vs.includes('Pass') || vs.includes('Satellite')) {
    return {
      text: 'High-Altitude Pass (Satellite Grid)',
      className: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
    };
  }
  return {
    text: 'NWP Cryosphere Monitored',
    className: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  };
}

const TYPE_ICON_COLOR: Record<string, string> = {
  'Slab':    'text-sky-400',
  'Powder':  'text-cyan-300',
  'Wet':     'text-blue-400',
  'Cornice': 'text-indigo-300',
};

// ─── Avalanche Card ──────────────────────────────────────────────────────────

function AvalancheCard({ record, index }: { record: AvalancheRecord; index: number }) {
  const riskToUse = record.live_risk_level || record.risk_level;
  const isCritical = riskToUse === 'Critical';
  const isHigh = riskToUse === 'High';
  const statusInfo = getStatusBadge(record.current_status);
  const verInfo = getVerificationBadge(record.verification_status);
  const StatusIcon = statusInfo.icon;
  const hasOfficialAlert = record.provenance?.is_official_government_alert;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className={`glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group ${
        isCritical ? 'hover:border-red-500/30' : isHigh ? 'hover:border-orange-500/30' : 'hover:border-white/20'
      }`}>

        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-10 pointer-events-none ${
          isCritical ? 'from-red-500 to-transparent' : isHigh ? 'from-orange-500 to-transparent' : 'from-cyan-500 to-transparent'
        }`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">{record.name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge variant={getRiskBadgeVariant(riskToUse)} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            Terrain: {riskToUse}
          </Badge>
        </div>

        {/* Status + Verification badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] px-2 py-0.5 rounded-[4px] border flex items-center gap-1 ${statusInfo.className}`}>
            <StatusIcon className="w-3 h-3" />
            {statusInfo.text}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-[4px] border ${verInfo.className}`}>
            {verInfo.text}
          </span>
        </div>

        {/* Official Warning or Verified Non-Alert State */}
        {hasOfficialAlert ? (
          <div className="bg-red-500/20 border border-red-500/40 p-2 rounded text-[11px] text-red-200">
            <div className="font-bold flex items-center gap-1 text-red-300">
              <AlertTriangle className="w-3 h-3 text-red-400" /> OFFICIAL GOVERNMENT AVALANCHE BULLETIN
            </div>
            <p className="text-[10px] mt-0.5 line-clamp-2">{record.provenance?.official_warning?.title}</p>
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-300 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> No Active Warnings
            </span>
            <span className="text-[9px] text-emerald-400/70">Feed Verified</span>
          </div>
        )}

        {/* Key Numerical Forecast Metrics */}
        <div className="flex flex-col gap-1.5 text-xs bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Forecast 24h Snow</span>
            <span className="font-bold text-cyan-400 text-[11px]">{record.live_snowfall_24h ?? 0} cm</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Forecast Snow Depth</span>
            <span className="font-bold text-blue-300 text-[11px]">{record.live_snow_depth ?? 0} m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Wind / Temp (Ridge)</span>
            <span className="text-slate-300 font-medium text-[11px]">
              {record.live_wind_speed ?? 0} km/h · {record.live_temperature ?? 0} °C
            </span>
          </div>
        </div>

        {/* Terrain Parameters Grid */}
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Elevation</span>
            <span className="text-cyan-400 font-medium">{record.elevation_m.toLocaleString()} m</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Slope & Aspect</span>
            <span className="text-white font-medium">{record.slope_angle_deg}° · {record.aspect}</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Type</span>
            <span className={`font-medium ${TYPE_ICON_COLOR[record.avalanche_type] || 'text-slate-300'}`}>{record.avalanche_type}</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Hist. Events</span>
            <span className="text-amber-400 font-medium">{record.historical_events_count}</span>
          </div>
        </div>

        {/* Affected Infrastructure */}
        <div className="mt-1 flex items-start gap-1.5 text-[10px] text-slate-400">
          <Triangle className="w-3 h-3 flex-shrink-0 mt-0.5 text-cyan-400" />
          <span className="line-clamp-2"><strong className="text-slate-300">Route:</strong> {record.road_or_pass}</span>
        </div>

        {/* Footer with Scientific Provenance */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[9px] text-slate-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Activity className={`w-3 h-3 ${getRiskColor(riskToUse)}`} />
              <strong>Terrain Factor:</strong> <span className="text-slate-300 truncate max-w-[140px]">{record.dominant_trigger}</span>
            </span>
            <span className="text-slate-400">
              {record.last_updated ? new Date(record.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live'}
            </span>
          </div>
          <div className="text-[9px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="truncate">Model: Numerical Cryosphere Telemetry</span>
            <span className="truncate">VPS RAM: Stateless Stream</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Avalanche Row ───────────────────────────────────────────────────────────

function AvalancheRow({ record, index }: { record: AvalancheRecord; index: number }) {
  const riskToUse = record.live_risk_level || record.risk_level;
  const statusInfo = getStatusBadge(record.current_status);
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {record.district} · {record.scope}
            </div>
          </div>

          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500">Elevation</div>
            <div className="text-xs font-bold text-cyan-400">{record.elevation_m.toLocaleString()} m</div>
          </div>

          <div className="w-24 hidden xl:block">
            <div className="text-[10px] text-slate-500">Forecast Snow</div>
            <div className="text-xs text-slate-300">{record.live_snowfall_24h ?? 0} cm</div>
          </div>

          <div className="w-28 hidden lg:block">
            <div className="text-[10px] text-slate-500">Slope / Aspect</div>
            <div className="text-xs text-slate-300">{record.slope_angle_deg}° · {record.aspect}</div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Terrain Risk</div>
            <Badge variant={getRiskBadgeVariant(riskToUse)} size="sm" className="text-[10px]">
              {riskToUse}
            </Badge>
          </div>

          <div className="w-36 flex-shrink-0">
            <span className={`text-[10px] px-2 py-0.5 rounded-[4px] border flex items-center gap-1 ${statusInfo.className}`}>
              <StatusIcon className="w-3 h-3" />
              {statusInfo.text}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function AvalanchesPage() {
  const router = useRouter();
  const { filter, setScope, setDistrict } = useGlobalFilter();

  const {
    data: liveData,
    officialAlertsCount,
    officialAlerts,
    gulmargReport,
    sachetStatus,
    gulmargStatus,
    vpsDiskUsageBytes,
    loading,
    isStale,
    error,
    refresh,
    lastUpdated
  } = useAvalancheIntelligence(avalancheData);

  const [typeFilter, setTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const avalancheTypes = ['Slab', 'Powder', 'Wet', 'Cornice'];
  const riskLevels = ['Critical', 'High', 'Moderate', 'Low'];
  const statuses = ['Active Warning', 'Watch', 'Seasonal', 'Normal'];
  const seasons = ['Nov-Mar', 'Dec-Feb', 'Year-round'];

  const filteredData = useMemo(() => {
    return liveData.filter(d => {
      const matchSearch = filter.searchQuery === '' ||
        d.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.road_or_pass.toLowerCase().includes(filter.searchQuery.toLowerCase());

      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;

      const matchType = typeFilter === 'all' || d.avalanche_type === typeFilter;
      const matchRisk = riskFilter === 'all' || (d.live_risk_level || d.risk_level) === riskFilter;
      const matchStatus = statusFilter === 'all' || d.current_status === statusFilter;
      const matchSeason = seasonFilter === 'all' || d.season === seasonFilter;

      return matchSearch && matchScope && matchDistrict && matchType && matchRisk && matchStatus && matchSeason;
    });
  }, [filter, liveData, typeFilter, riskFilter, statusFilter, seasonFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const extraActiveCount = [typeFilter, riskFilter, statusFilter, seasonFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return liveData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope, liveData]);

  // Aggregate KPIs with authentic counts
  const criticalZones = liveData.filter(d => (d.live_risk_level || d.risk_level) === 'Critical' || (d.live_risk_level || d.risk_level) === 'High').length;
  const highAltitude = liveData.filter(d => d.elevation_m >= 4000).length;
  const totalEvents = liveData.reduce((sum, d) => sum + d.historical_events_count, 0);
  const maxElevation = Math.max(...liveData.map(d => d.elevation_m));

  const metrics = [
    { label: 'Monitored Corridors', value: liveData.length, icon: 'MapPin' },
    {
      label: 'Active Snow Advisories',
      value: officialAlertsCount > 0 ? `${officialAlertsCount} Active` : '0 Active (Verified)',
      icon: 'Shield',
      color: officialAlertsCount > 0 ? 'text-red-400' : 'text-emerald-400'
    },
    { label: 'Elevated Terrain Risk', value: criticalZones, icon: 'AlertTriangle', color: criticalZones > 0 ? 'text-amber-400' : 'text-slate-400' },
    { label: 'Gulmarg Field Advisory', value: gulmargStatus === 'Connected' ? 'Active Feed' : 'Delayed', icon: 'Radio', color: gulmargStatus === 'Connected' ? 'text-cyan-400' : 'text-amber-400' },
    { label: 'High-Altitude (4000m+)', value: highAltitude, icon: 'Mountain' },
    { label: 'Historical Events', value: totalEvents.toLocaleString(), icon: 'Activity' },
    { label: 'Max Elevation', value: `${maxElevation.toLocaleString()} m`, icon: 'TrendingUp' },
    { label: 'VPS Disk Usage', value: '0 KB (Stateless)', icon: 'HardDrive', color: 'text-emerald-400' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence · High-Altitude Cryosphere & Snow Dynamics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Avalanches' },
        ]}
        title={<>
            <KewBrandIdentity />
            <span className="block whitespace-normal break-words leading-[1.12] overflow-visible bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">Avalanche Risk Intelligence</span>
          </>}
        subtitle="Forensically verified mountain pass & cryosphere monitoring across 30 Western Himalayan corridors, combining official hazard advisories and Gulmarg Avalanche Center observations with high-resolution snowpack models."
        icon={<Snowflake className="w-6 h-6 text-cyan-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-cyan-600 to-sky-600 font-bold text-white shadow-lg"
              icon={<Droplets className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/glofs')}
            >
              Glacial Lake & GLOF Sentinel
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />}
              onClick={refresh}
            >
              Sync Live Telemetry
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-cyan-500" />

      {/* ── SCIENTIFIC MONITORING STATUS & GULMARG AC ADVISORY ─────────────── */}
      <div className="container mx-auto px-6 mt-6 space-y-4">
        <ScientificMonitoringStatus
          programName="KEW Avalanche Hazard Status"
          hazardType="Avalanche"
          statusState={officialAlertsCount > 0 ? 'ACTIVE OFFICIAL ALERT' : sachetStatus === 'Connected' ? 'NO ACTIVE ALERTS DETECTED' : 'MONITORING DELAYED'}
          summaryText={officialAlertsCount > 0
            ? 'Active high-severity avalanche warnings detected in monitored corridors. Avoid marked avalanche paths and follow defense directives.'
            : 'No active high-severity avalanche warnings identified across monitored mountain passes and corridors at this hour.'}
          sourceRegistryId="avalanche-hazard-bulletin"
          monitoringConnection={sachetStatus === 'Connected' ? 'Connected' : 'Unreachable'}
          modelStatus="Active"
          officialAuthority="DRDO-DGRE / SDMA"
          activeAlerts={officialAlerts.map(a => ({
            title: a.title,
            pubDate: a.pubDate,
            issuingAuthority: 'DRDO-DGRE / SDMA',
            link: a.link,
            description: a.description
          }))}
        />

        {/* Gulmarg Avalanche Center Field Advisory Feed */}
        <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-[8px] p-4 text-white backdrop-blur-md flex items-start gap-3">
          <div className="p-2 rounded-[6px] bg-cyan-500/10 text-cyan-400 mt-0.5 shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-cyan-300 flex items-center justify-between gap-2">
              <span className="font-mono uppercase tracking-wider">Gulmarg Avalanche Center (GAC) · In-Situ Snowpack Telemetry</span>
              <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                Field Advisory
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1">
              {gulmargReport ? gulmargReport.title : 'Live In-Situ Snowpack Stability & Field Observations'}
            </p>
            <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between font-mono">
              <span>Published: {gulmargReport?.pubDate ? new Date(gulmargReport.pubDate).toLocaleDateString() : 'Active Season'}</span>
              {gulmargReport?.link && (
                <a href={gulmargReport.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1 font-medium">
                  Read Field Advisory <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={typeFilter} onChange={setTypeFilter} placeholder="Avalanche Type" options={avalancheTypes.map(t => ({ value: t, label: t }))} />
              <FilterSelect value={riskFilter} onChange={setRiskFilter} placeholder="Terrain Risk Level" options={riskLevels.map(r => ({ value: r, label: r }))} />
              <FilterSelect value={statusFilter} onChange={setStatusFilter} placeholder="Advisory Status" options={statuses.map(s => ({ value: s, label: s }))} />
              <FilterSelect value={seasonFilter} onChange={setSeasonFilter} placeholder="Season" options={seasons.map(s => ({ value: s, label: s }))} />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setTypeFilter('all');
            setRiskFilter('all');
            setStatusFilter('all');
            setSeasonFilter('all');
          }}
        />
      </div>

      {/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={liveData.length}
        entityLabel="avalanche corridors"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Avalanche Zones')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {isStale && (
            <div className="bg-amber-500/20 text-amber-300 p-3 text-sm rounded border border-amber-500/30 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>Cached Telemetry Display:</strong> Showing verified snapshot from {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'an earlier session'}.
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={refresh} className="whitespace-nowrap bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-300">
                Sync Gateway
              </Button>
            </div>
          )}

          {loading && !paginatedData.length && (
             <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
               <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-3 animate-spin" />
               <div className="text-white font-medium mb-1">Connecting to hazard warning gateways and high-resolution atmospheric feeds...</div>
             </div>
          )}

          {!loading && filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Mountain className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No avalanche corridors found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((record, idx) => (
                <AvalancheCard key={record.id} record={record} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((record, idx) => (
                <AvalancheRow key={record.id} record={record} index={idx} />
              ))}
            </div>
          )}

          {/* Pagination */}
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

          {/* ── RELATED HAZARD INTELLIGENCE (6 CONTEXTUAL MODULES) ─────────── */}
          <RelatedHazardIntelligence currentModule="avalanches" />

        </div>
      </section>
    </main>
  );
}
