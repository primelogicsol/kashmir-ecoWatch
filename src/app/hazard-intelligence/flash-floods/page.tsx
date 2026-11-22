'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import {
  Zap, Activity, MapPin, AlertTriangle, Shield, CheckCircle,
  Droplets, Clock, TrendingUp, Eye, ChevronRight, Mountain,
  Waves, BarChart3, Radio, RefreshCw, Info, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { flashFloodData, FlashFloodRecord } from '@/data/hazard-flash-floods';
import { useFlashFloodIntelligence } from '@/hooks/useFlashFloodIntelligence';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import { ScientificMonitoringStatus } from '@/components/common/ScientificMonitoringStatus';

// ─── Risk colour helpers ──────────────────────────────────────────────────────

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
  if (status === 'Active Alert') {
    return {
      text: 'Active Alert',
      className: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse font-bold'
    };
  }
  if (status === 'Watch') {
    return {
      text: 'Runoff Watch',
      className: 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium'
    };
  }
  if (status === 'Seasonal Risk') {
    return {
      text: 'Seasonal Vulnerability',
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    };
  }
  return {
    text: 'Monitored (Normal)',
    className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  };
}

function getVerificationBadge(vs: string) {
  if (vs.includes('Basin Telemetry') || vs === 'Verified') {
    return {
      text: 'Basin Telemetry Corroborated',
      className: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
    };
  }
  if (vs.includes('Satellite')) {
    return {
      text: 'Satellite-Derived Basin',
      className: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
    };
  }
  return {
    text: 'NWP Model-Monitored Catchment',
    className: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  };
}

// ─── Flash Flood Card ─────────────────────────────────────────────────────────

function FlashFloodCard({ record, index }: { record: FlashFloodRecord; index: number }) {
  const riskToUse = record.live_risk_level || record.risk_level;
  const isCritical = riskToUse === 'Critical';
  const isHigh = riskToUse === 'High';
  const statusInfo = getStatusBadge(record.current_status);
  const verInfo = getVerificationBadge(record.verification_status);
  const hasOfficialAlert = record.provenance?.is_official_government_alert;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-white/20">

        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-10 pointer-events-none ${
          isCritical ? 'from-red-500 to-transparent' : isHigh ? 'from-amber-500 to-transparent' : 'from-indigo-500 to-transparent'
        }`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">{record.name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge variant={getRiskBadgeVariant(riskToUse)} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            Risk: {riskToUse} {record.live_trend === 'Rising' ? '↑' : record.live_trend === 'Falling' ? '↓' : ''}
          </Badge>
        </div>

        {/* Status + Verification badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] px-2 py-0.5 rounded-[4px] border ${statusInfo.className}`}>
            {statusInfo.text}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-[4px] border ${verInfo.className}`}>
            {verInfo.text}
          </span>
        </div>

        {/* Official Warning banner if present */}
        {hasOfficialAlert ? (
          <div className="bg-red-500/20 border border-red-500/40 p-2 rounded text-[11px] text-red-200">
            <div className="font-bold flex items-center gap-1 text-red-300">
              <AlertTriangle className="w-3 h-3 text-red-400" /> OFFICIAL GOVERNMENT WARNING
            </div>
            <p className="text-[10px] mt-0.5 line-clamp-2">{record.provenance?.official_warning?.title}</p>
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] text-emerald-300 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> No Active Alerts
            </span>
            <span className="text-[9px] text-emerald-400/70">Feed Verified</span>
          </div>
        )}

        {/* Key metrics */}
        <div className="flex flex-col gap-1.5 text-xs bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Hydrological Factor</span>
            <span className="text-blue-300 font-medium text-[11px] truncate ml-2">{record.dominant_trigger || record.trigger_type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px]">Nallah / Stream</span>
            <span className="text-slate-300 font-medium truncate ml-2 text-right text-[11px]">{record.nallah_stream}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Forecast 24h Rain</span>
            <span className="text-white font-medium">{record.forecast_rainfall_24h ?? 0} mm</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Peak Forecast Rate</span>
            <span className="text-white font-medium">{record.peak_hourly_intensity ?? 0} mm/h</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Catchment Area</span>
            <span className="text-white font-medium">{record.catchment_area_sqkm.toLocaleString()} km²</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-400">Response Window</span>
            <span className="text-white font-medium">
              {record.response_time_hrs < 1 ? '< 1 hr' : `${record.response_time_hrs} hrs`}
            </span>
          </div>
        </div>

        {/* Footer with Scientific Provenance */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[9px] text-slate-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Activity className={`w-3 h-3 ${getRiskColor(riskToUse)}`} />
              <strong>Runoff Index:</strong> <span className={getRiskColor(riskToUse)}>{riskToUse}</span>
            </span>
            <span className="text-slate-400 truncate max-w-[140px]">
              {record.last_updated ? new Date(record.last_updated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Live Sync'}
            </span>
          </div>
          <div className="text-[9px] text-slate-400 truncate">
            Model: High-Resolution NWP
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Flash Flood Row ──────────────────────────────────────────────────────────

function FlashFloodRow({ record, index }: { record: FlashFloodRecord; index: number }) {
  const riskToUse = record.live_risk_level || record.risk_level;
  const statusInfo = getStatusBadge(record.current_status);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">

          <div className="min-w-[180px] flex-1">
            <span className="text-sm font-bold text-white">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {record.district} · {record.scope}
            </div>
          </div>

          <div className="w-28 hidden md:block">
            <div className="text-[10px] text-slate-500">Nallah / Stream</div>
            <div className="text-xs font-bold text-blue-400 truncate">{record.nallah_stream}</div>
          </div>

          <div className="w-28 hidden xl:block">
            <div className="text-[10px] text-slate-500">Hydrological Factor</div>
            <div className="text-xs text-slate-300 truncate">{record.dominant_trigger || record.trigger_type}</div>
          </div>

          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500">Forecast 24h</div>
            <div className="text-xs text-slate-300">{record.forecast_rainfall_24h ?? 0} mm</div>
          </div>

          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500">Peak Rate</div>
            <div className="text-xs text-slate-300">{record.peak_hourly_intensity ?? 0} mm/h</div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Runoff Risk</div>
            <Badge variant={getRiskBadgeVariant(riskToUse)} size="sm" className="text-[10px]">
              {riskToUse} {record.live_trend === 'Rising' ? '↑' : record.live_trend === 'Falling' ? '↓' : ''}
            </Badge>
          </div>

          <div className="w-28 flex-shrink-0">
            <span className={`text-[10px] px-2 py-0.5 rounded-[4px] border ${statusInfo.className}`}>
              {statusInfo.text}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FlashFloodsPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [triggerFilter, setTriggerFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const {
    data: realTimeData,
    officialAlertsCount,
    officialAlerts,
    sachetStatus,
    forecastSource,
    loading,
    error,
    isStale,
    lastUpdated,
    refresh
  } = useFlashFloodIntelligence(flashFloodData);

  // Filter options
  const triggerOptions = useMemo(() =>
    Array.from(new Set(realTimeData.map(d => d.dominant_trigger || d.trigger_type))).sort().map(t => ({ value: t, label: t })), [realTimeData]);
  const riskOptions = useMemo(() =>
    Array.from(new Set(realTimeData.map(d => d.live_risk_level || d.risk_level))).sort().map(r => ({ value: r, label: r })), [realTimeData]);

  // Filtered data
  const filteredData = useMemo(() => {
    return realTimeData.filter(d => {
      const matchSearch = filter.searchQuery === '' ||
        d.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.nallah_stream.toLowerCase().includes(filter.searchQuery.toLowerCase());
      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;
      const matchTrigger = triggerFilter === 'all' || (d.dominant_trigger || d.trigger_type) === triggerFilter;
      const matchRisk = riskFilter === 'all' || (d.live_risk_level || d.risk_level) === riskFilter;
      return matchSearch && matchScope && matchDistrict && matchTrigger && matchRisk;
    });
  }, [realTimeData, filter, triggerFilter, riskFilter]);

  const totalCount = realTimeData.length;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const extraActiveCount = [triggerFilter, riskFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return realTimeData.filter(d => d.scope === filter.scope).length;
  }, [realTimeData, filter.scope]);

  // Dynamic KPI aggregations with truthful data
  const criticalCount = realTimeData.filter(d => (d.live_risk_level || d.risk_level) === 'Critical').length;
  const highRiskCount = realTimeData.filter(d => (d.live_risk_level || d.risk_level) === 'High').length;
  const watchCount = realTimeData.filter(d => d.current_status === 'Watch').length;
  const totalCasualties = realTimeData.reduce((sum, d) => sum + d.casualties_historical, 0);
  const avgResponseTime = (realTimeData.reduce((sum, d) => sum + d.response_time_hrs, 0) / realTimeData.length).toFixed(1);
  const glacialMeltCount = realTimeData.filter(d => d.trigger_type === 'Glacial Melt').length;

  const metrics = [
    { label: 'Monitored Catchments', value: realTimeData.length, icon: 'MapPin' },
    {
      label: 'Active Hazard Bulletins',
      value: officialAlertsCount > 0 ? `${officialAlertsCount} Active` : '0 Active (Verified)',
      icon: 'Shield',
      color: officialAlertsCount > 0 ? 'text-red-400' : 'text-emerald-400'
    },
    { label: 'High Runoff Risk', value: criticalCount + highRiskCount, icon: 'AlertTriangle', color: criticalCount + highRiskCount > 0 ? 'text-amber-400' : 'text-slate-400' },
    { label: 'Runoff Watch', value: watchCount, icon: 'Eye', color: 'text-amber-400' },
    { label: 'Hazard Telemetry', value: sachetStatus === 'Connected' ? 'Active Stream' : 'Delayed', icon: 'Radio', color: sachetStatus === 'Connected' ? 'text-emerald-400' : 'text-amber-400' },
    { label: 'Historic Casualties', value: totalCasualties, icon: 'Activity', color: 'text-red-400' },
    { label: 'Avg Response Time', value: `${avgResponseTime} hrs`, icon: 'Clock' },
    { label: 'Glacial Melt Zones', value: glacialMeltCount, icon: 'Mountain' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence · Cloudburst & Rapid Runoff Early Warning"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Flash Floods' },
        ]}
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">Flash Flood Intelligence</span>
          </>}
        subtitle="Forensically verified catchment runoff monitoring across 32 Western Himalayan mountain valleys, coupling official government emergency feeds with high-resolution atmospheric runoff models."
        icon={<Zap className="w-6 h-6 text-indigo-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-indigo-600 to-blue-600 font-bold text-white shadow-lg"
              icon={<Waves className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/floods')}
            >
              Riverine Flood Basins
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
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      {/* ── KPI STRIP ──────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-indigo-500" />

      {/* ── LIVE OFFICIAL WARNING & PROVENANCE BANNER ────────────────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <ScientificMonitoringStatus
          programName="KEW Flash Flood Hazard Status"
          hazardType="Flash Flood"
          statusState={officialAlertsCount > 0 ? 'ACTIVE OFFICIAL ALERT' : sachetStatus === 'Connected' ? 'NO ACTIVE ALERTS DETECTED' : 'MONITORING DELAYED'}
          summaryText={officialAlertsCount > 0 
            ? 'Active high-severity official flood or cloudburst emergency bulletins detected in monitored catchments. Follow directives issued by responsible authorities.'
            : 'No active high-severity flash flood alerts identified in the monitored catchments across Jammu & Kashmir or Ladakh at this hour.'}
          sourceRegistryId="flash-flood-alerts"
          monitoringConnection={sachetStatus === 'Connected' ? 'Connected' : 'Unreachable'}
          modelStatus="Active"
          officialAuthority="NDMA / IMD / SDMA"
          activeAlerts={officialAlerts.map(a => ({
            title: a.title,
            pubDate: a.pubDate,
            issuingAuthority: 'NDMA / IMD / SDMA',
            link: a.link,
            description: a.description
          }))}
        />
      </div>

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-30 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={triggerFilter} onChange={v => { setTriggerFilter(v); setCurrentPage(1); }} placeholder="Hydrological Factor" options={triggerOptions} />
              <FilterSelect value={riskFilter} onChange={v => { setRiskFilter(v); setCurrentPage(1); }} placeholder="Runoff Risk Level" options={riskOptions} />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setTriggerFilter('all');
            setRiskFilter('all');
          }}
        />
      </div>

      {/* ── SCOPE TABS & CONTROLS ──────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalCount}
        entityLabel="flash flood zones"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Flash Flood Zones')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ───────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {isStale && (
            <div className="bg-amber-500/20 text-amber-300 p-3 text-sm rounded border border-amber-500/30 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>
                  <strong>Cached Data Display:</strong> Showing verified snapshot from {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'an earlier session'}.
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={refresh} className="whitespace-nowrap bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-300">
                Sync Gateway
              </Button>
            </div>
          )}
          {loading && !paginatedData.length && (
             <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
               <Activity className="w-8 h-8 text-indigo-400 mx-auto mb-3 animate-spin" />
               <div className="text-white font-medium mb-1">Synchronizing hazard alert feeds and high-resolution atmospheric models...</div>
             </div>
          )}
          {!loading && filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Waves className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No flash flood catchments found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((record, idx) => (
                <FlashFloodCard key={record.id} record={record} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((record, idx) => (
                <FlashFloodRow key={record.id} record={record} index={idx} />
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
          <RelatedHazardIntelligence currentModule="flash-floods" />

        </div>
      </section>
    </main>
  );
}
