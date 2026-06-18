'use client';

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
  Waves, BarChart3, Triangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { flashFloodData, FlashFloodRecord } from '@/data/hazard-flash-floods';
import { useFlashFloodIntelligence } from '@/hooks/useFlashFloodIntelligence';

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

function getStatusColor(status: string) {
  if (status === 'Active Alert') return 'bg-red-500/20 text-red-300 border-red-500/30';
  if (status === 'Watch') return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  if (status === 'Seasonal Risk') return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
}

function getVerificationColor(vs: string) {
  if (vs === 'Verified') return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25';
  if (vs === 'Satellite-Derived') return 'bg-blue-500/15 text-blue-400 border-blue-500/25';
  return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
}

// ─── Flash Flood Card ─────────────────────────────────────────────────────────

function FlashFloodCard({ record, index }: { record: FlashFloodRecord; index: number }) {
  const riskToUse = record.live_risk_level || record.risk_level;
  const isCritical = riskToUse === 'Critical';
  const isHigh = riskToUse === 'High';

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
              <MapPin className="w-3 h-3" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge variant={getRiskBadgeVariant(riskToUse)} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {riskToUse} {record.live_trend === 'Rising' ? '↑' : record.live_trend === 'Falling' ? '↓' : ''}
          </Badge>
        </div>

        {/* Status + Verification badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(record.current_status)}`}>
            {record.current_status}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getVerificationColor(record.verification_status)}`}>
            {record.verification_status}
          </span>
        </div>

        {/* Key metrics */}
        <div className="flex flex-col gap-1.5 text-xs bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Trigger</span>
            <span className="text-blue-400 font-medium">{record.dominant_trigger || record.trigger_type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Nallah / Stream</span>
            <span className="text-slate-300 font-medium truncate ml-2 text-right">{record.nallah_stream}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Live 24h Rain</span>
            <span className="text-white font-medium">{record.forecast_rainfall_24h ?? '-'} mm</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Peak Hourly</span>
            <span className="text-white font-medium">{(record as any).peak_hourly_intensity ?? '-'} mm/h</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Catchment</span>
            <span className="text-white font-medium">{record.catchment_area_sqkm.toLocaleString()} km²</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Updated</span>
            <span className="text-white font-medium truncate">
              {record.last_updated ? new Date(record.last_updated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Offline'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <Activity className={`w-3 h-3 flex-shrink-0 ${getRiskColor(riskToUse)}`} />
            <span>
              <strong className="text-slate-300 font-medium">Live Risk:</strong>{' '}
              <span className={getRiskColor(riskToUse)}>{riskToUse}</span>
              {' · '}
              Response {record.response_time_hrs < 1 ? '< 1 hr' : `${record.response_time_hrs} hrs`}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Flash Flood Row ──────────────────────────────────────────────────────────

function FlashFloodRow({ record, index }: { record: FlashFloodRecord; index: number }) {
  const riskToUse = record.live_risk_level || record.risk_level;
  
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
              <MapPin className="w-3 h-3" /> {record.district}
            </div>
          </div>

          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500">Nallah / Stream</div>
            <div className="text-xs font-bold text-blue-400 truncate">{record.nallah_stream}</div>
          </div>

          <div className="w-24 hidden xl:block">
            <div className="text-[10px] text-slate-500">Trigger</div>
            <div className="text-xs text-slate-300 truncate">{record.dominant_trigger || record.trigger_type}</div>
          </div>

          <div className="w-20 hidden lg:block">
            <div className="text-[10px] text-slate-500">Live 24h</div>
            <div className="text-xs text-slate-300">{record.forecast_rainfall_24h ?? '-'} mm</div>
          </div>

          <div className="w-20 hidden lg:block">
            <div className="text-[10px] text-slate-500">Peak Hr</div>
            <div className="text-xs text-slate-300">{(record as any).peak_hourly_intensity ?? '-'} mm/h</div>
          </div>

          <div className="w-20 hidden lg:block">
            <div className="text-[10px] text-slate-500">Updated</div>
            <div className="text-[11px] text-slate-300 truncate">
              {record.last_updated ? new Date(record.last_updated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Offline'}
            </div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Live Risk</div>
            <Badge variant={getRiskBadgeVariant(riskToUse)} size="sm" className="text-[10px]">
              {riskToUse} {record.live_trend === 'Rising' ? '↑' : record.live_trend === 'Falling' ? '↓' : ''}
            </Badge>
          </div>

          <div className="w-24 flex-shrink-0">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(record.current_status)}`}>
              {record.current_status}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FlashFloodsPage() {
  const { filter } = useGlobalFilter();

  const [triggerFilter, setTriggerFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const { data: realTimeData, loading, error, isStale, lastUpdated, refresh } = useFlashFloodIntelligence(flashFloodData);

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

  // KPI aggregations
  const criticalCount = realTimeData.filter(d => (d.live_risk_level || d.risk_level) === 'Critical').length;
  const activeAlertCount = realTimeData.filter(d => d.current_status === 'Active Alert').length;
  const watchCount = realTimeData.filter(d => d.current_status === 'Watch').length;
  const verifiedCount = realTimeData.filter(d => d.verification_status === 'Verified').length;
  const totalCasualties = realTimeData.reduce((sum, d) => sum + d.casualties_historical, 0);
  const avgResponseTime = (realTimeData.reduce((sum, d) => sum + d.response_time_hrs, 0) / realTimeData.length).toFixed(1);
  const glacialMeltCount = realTimeData.filter(d => d.trigger_type === 'Glacial Melt').length;

  const metrics = [
    { label: 'Monitored Zones', value: flashFloodData.length, icon: 'MapPin' },
    { label: 'Active Alerts', value: activeAlertCount, icon: 'AlertTriangle', color: 'text-red-400' },
    { label: 'Critical Zones', value: criticalCount, icon: 'Zap', color: 'text-red-400' },
    { label: 'Watch Status', value: watchCount, icon: 'Eye', color: 'text-amber-400' },
    { label: 'Verified Sources', value: verifiedCount, icon: 'Shield' },
    { label: 'Historic Casualties', value: totalCasualties, icon: 'Activity', color: 'text-red-400' },
    { label: 'Avg Response Time', value: `${avgResponseTime} hrs`, icon: 'Clock' },
    { label: 'Glacial Melt Zones', value: glacialMeltCount, icon: 'Mountain' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence"
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">Flash Flood Intelligence</span>
          </>}
        subtitle="Monitoring flash flood zones across nallahs, glacial catchments, and urban corridors with real-time alert intelligence, historical casualty data, and trigger classification."
        icon={<Zap className="w-6 h-6 text-indigo-400" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Flash Floods' },
        ]}
      />

      {/* ── KPI STRIP ──────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-indigo-500" />

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-30 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={triggerFilter} onChange={v => { setTriggerFilter(v); setCurrentPage(1); }} placeholder="Trigger Type" options={triggerOptions} />
              <FilterSelect value={riskFilter} onChange={v => { setRiskFilter(v); setCurrentPage(1); }} placeholder="Risk Level" options={riskOptions} />
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
                  <strong>Stale Data Warning:</strong> Real-time data could not be fetched. Showing cached data from {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'an earlier session'}.
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={refresh} className="whitespace-nowrap bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-300">
                Retry Connection
              </Button>
            </div>
          )}
          {loading && !paginatedData.length && (
             <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
               <Activity className="w-8 h-8 text-indigo-400 mx-auto mb-3 animate-spin" />
               <div className="text-white font-medium mb-1">Loading real-time hazard data...</div>
             </div>
          )}
          {!loading && filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Waves className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No flash flood zones found</div>
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

          {/* ── CROSS-LINKS ────────────────────────────────────────────────── */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Related Hazard Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                { title: 'Landslide Risk Intelligence', description: 'Landslide zones, slide types, and geological risk mapping across highways and passes.', href: '/hazard-intelligence/landslides', icon: Mountain, color: 'text-amber-400' },
                { title: 'Hazard Intelligence Overview', description: 'Multi-hazard dashboard with escalation notices, district risk summaries, and submodule links.', href: '/hazard-intelligence', icon: AlertTriangle, color: 'text-red-400' },
                { title: 'Environmental Monitoring', description: 'Water quality, air pollution, and ecological monitoring for the Western Himalayan region.', href: '/environmental-monitoring', icon: Activity, color: 'text-emerald-400' },
              ].map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <Card className="glass-intense border-white/5 p-4 flex items-start gap-3 hover:border-white/20 transition-all group cursor-pointer h-full">
                    <link.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${link.color}`} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{link.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{link.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
