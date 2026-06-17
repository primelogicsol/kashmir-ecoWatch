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
  Mountain, Activity, MapPin, AlertTriangle, Shield, CheckCircle,
  Clock, TrendingUp, Eye, ChevronRight, Triangle,
  Waves, BarChart3, Calendar, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { landslideData, LandslideRecord } from '@/data/hazard-landslides';

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

function getTriggerIcon(trigger: string) {
  if (trigger === 'Rainfall') return 'text-blue-400';
  if (trigger === 'Seismic') return 'text-red-400';
  if (trigger === 'Construction') return 'text-amber-400';
  if (trigger === 'Deforestation') return 'text-orange-400';
  return 'text-slate-400';
}

// ─── Landslide Card ───────────────────────────────────────────────────────────

function LandslideCard({ record, index }: { record: LandslideRecord; index: number }) {
  const isCritical = record.risk_level === 'Critical';
  const isHigh = record.risk_level === 'High';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-white/20">

        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-10 pointer-events-none ${
          isCritical ? 'from-red-500 to-transparent' : isHigh ? 'from-orange-500 to-transparent' : 'from-amber-500 to-transparent'
        }`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">{record.name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge variant={getRiskBadgeVariant(record.risk_level)} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {record.risk_level}
          </Badge>
        </div>

        {/* Status + Verification */}
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(record.current_status)}`}>
            {record.current_status}
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getVerificationColor(record.verification_status)}`}>
            {record.verification_status}
          </span>
        </div>

        {/* Key info */}
        <div className="flex flex-col gap-1.5 text-xs bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Slide Type</span>
            <span className="text-amber-400 font-medium">{record.slide_type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Trigger</span>
            <span className={`font-medium ${getTriggerIcon(record.trigger)}`}>{record.trigger}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Road Affected</span>
            <span className="text-slate-300 font-medium truncate ml-2 text-right max-w-[160px]">{record.road_affected}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Slope Angle</span>
            <span className="text-white font-medium">{record.slope_angle_deg}°</span>
          </div>
          <div className="flex flex-col bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Last Event</span>
            <span className="text-white font-medium">{record.last_event_date}</span>
          </div>
        </div>

        {/* Geology */}
        <div className="mt-auto pt-3 border-t border-white/5">
          <div className="flex items-start gap-1.5 text-[10px] text-slate-400">
            <Mountain className={`w-3 h-3 flex-shrink-0 mt-0.5 ${getRiskColor(record.risk_level)}`} />
            <span className="line-clamp-2 leading-snug">
              <strong className="text-slate-300 font-medium">Geology:</strong>{' '}
              {record.geology}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Landslide Row ────────────────────────────────────────────────────────────

function LandslideRow({ record, index }: { record: LandslideRecord; index: number }) {
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
              <MapPin className="w-3 h-3" /> {record.district}
            </div>
          </div>

          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500">Slide Type</div>
            <div className="text-xs font-bold text-amber-400 truncate">{record.slide_type}</div>
          </div>

          <div className="w-28 hidden xl:block">
            <div className="text-[10px] text-slate-500">Road Affected</div>
            <div className="text-xs text-slate-300 truncate" title={record.road_affected}>{record.road_affected}</div>
          </div>

          <div className="w-20 hidden lg:block">
            <div className="text-[10px] text-slate-500">Trigger</div>
            <div className={`text-xs font-medium ${getTriggerIcon(record.trigger)}`}>{record.trigger}</div>
          </div>

          <div className="w-16 hidden lg:block">
            <div className="text-[10px] text-slate-500">Slope</div>
            <div className="text-xs text-slate-300">{record.slope_angle_deg}°</div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={getRiskBadgeVariant(record.risk_level)} size="sm" className="text-[10px]">
              {record.risk_level}
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

export default function LandslidesPage() {
  const { filter } = useGlobalFilter();

  const [slideTypeFilter, setSlideTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Filter options
  const slideTypeOptions = useMemo(() =>
    Array.from(new Set(landslideData.map(d => d.slide_type))).sort().map(t => ({ value: t, label: t })), []);
  const riskOptions = useMemo(() =>
    Array.from(new Set(landslideData.map(d => d.risk_level))).sort().map(r => ({ value: r, label: r })), []);

  // Filtered data
  const filteredData = useMemo(() => {
    return landslideData.filter(d => {
      const matchSearch = filter.searchQuery === '' ||
        d.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.road_affected.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.geology.toLowerCase().includes(filter.searchQuery.toLowerCase());
      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;
      const matchSlideType = slideTypeFilter === 'all' || d.slide_type === slideTypeFilter;
      const matchRisk = riskFilter === 'all' || d.risk_level === riskFilter;
      return matchSearch && matchScope && matchDistrict && matchSlideType && matchRisk;
    });
  }, [filter, slideTypeFilter, riskFilter]);

  const totalCount = landslideData.length;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const extraActiveCount = [slideTypeFilter, riskFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return landslideData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope]);

  // KPI aggregations
  const criticalCount = landslideData.filter(d => d.risk_level === 'Critical').length;
  const activeAlertCount = landslideData.filter(d => d.current_status === 'Active Alert').length;
  const watchCount = landslideData.filter(d => d.current_status === 'Watch').length;
  const verifiedCount = landslideData.filter(d => d.verification_status === 'Verified').length;
  const seismicCount = landslideData.filter(d => d.trigger === 'Seismic').length;
  const highwayCount = landslideData.filter(d => d.road_affected.includes('NH') || d.road_affected.includes('KKH')).length;
  const avgSlope = Math.round(landslideData.reduce((sum, d) => sum + d.slope_angle_deg, 0) / landslideData.length);
  const rockSlideCount = landslideData.filter(d => d.slide_type === 'Rock Slide').length;

  const metrics = [
    { label: 'Monitored Zones', value: landslideData.length, icon: 'MapPin' },
    { label: 'Active Alerts', value: activeAlertCount, icon: 'AlertTriangle', color: 'text-red-400' },
    { label: 'Critical Zones', value: criticalCount, icon: 'Mountain', color: 'text-red-400' },
    { label: 'Watch Status', value: watchCount, icon: 'Eye', color: 'text-amber-400' },
    { label: 'Highway Zones', value: highwayCount, icon: 'TrendingUp' },
    { label: 'Seismic Triggered', value: seismicCount, icon: 'Activity', color: 'text-red-400' },
    { label: 'Avg Slope Angle', value: `${avgSlope}°`, icon: 'Triangle' },
    { label: 'Verified Sources', value: verifiedCount, icon: 'Shield' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence"
        title={
          <>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible">Landslide Risk Intelligence Across</span>
            <span className="block whitespace-nowrap leading-[1.12] pb-2 overflow-visible bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">Greater Kashmir Ecology</span>
          </>
        }
        subtitle="Monitoring landslide-prone zones across highways, mountain passes, and LOC areas with geological risk analysis, trigger classification, and real-time alert intelligence."
        icon={<Mountain className="w-6 h-6 text-amber-400" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Landslides' },
        ]}
      />

      {/* ── KPI STRIP ──────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-amber-500" />

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-30 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={slideTypeFilter} onChange={v => { setSlideTypeFilter(v); setCurrentPage(1); }} placeholder="Slide Type" options={slideTypeOptions} />
              <FilterSelect value={riskFilter} onChange={v => { setRiskFilter(v); setCurrentPage(1); }} placeholder="Risk Level" options={riskOptions} />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setSlideTypeFilter('all');
            setRiskFilter('all');
          }}
        />
      </div>

      {/* ── SCOPE TABS & CONTROLS ──────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalCount}
        entityLabel="landslide zones"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Landslide Zones')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ───────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Mountain className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No landslide zones found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((record, idx) => (
                <LandslideCard key={record.id} record={record} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((record, idx) => (
                <LandslideRow key={record.id} record={record} index={idx} />
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
              <Shield className="w-5 h-5 text-amber-400" />
              Related Hazard Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                { title: 'Flash Flood Intelligence', description: 'Flash flood zones, nallah catchments, glacial melt corridors, and cloudburst risk mapping.', href: '/hazard-intelligence/flash-floods', icon: Zap, color: 'text-indigo-400' },
                { title: 'Hazard Intelligence Overview', description: 'Multi-hazard dashboard with escalation notices, district risk summaries, and submodule links.', href: '/hazard-intelligence', icon: AlertTriangle, color: 'text-red-400' },
                { title: 'Environmental Monitoring', description: 'Water quality, air pollution, and ecological monitoring for the Greater Kashmir region.', href: '/environmental-monitoring', icon: Activity, color: 'text-emerald-400' },
              ].map((link, idx) => (
                <Link key={idx} href={link.href}>
                  <Card className="glass-intense border-white/5 p-4 flex items-start gap-3 hover:border-white/20 transition-all group cursor-pointer h-full">
                    <link.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${link.color}`} />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{link.title}</h3>
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
