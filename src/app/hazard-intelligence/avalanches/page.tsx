'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Snowflake, ChevronRight, AlertTriangle, MapPin,
  Shield, Activity, CheckCircle, Mountain,
  ChevronLeft, Eye, TrendingUp, BarChart3, Clock, Triangle
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

// ─── Colour maps ──────────────────────────────────────────────────────────────

const RISK_COLOR: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/25',
  High:     'text-orange-400 bg-orange-500/10 border-orange-500/25',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Low:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
};

const STATUS_COLOR: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Active Warning': { color: 'text-red-300',    bg: 'bg-red-500/10',    border: 'border-red-500/25',    icon: AlertTriangle },
  'Watch':          { color: 'text-amber-300',   bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  icon: Eye           },
  'Seasonal':       { color: 'text-blue-300',    bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   icon: Clock         },
  'Clear':          { color: 'text-emerald-300',  bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle   },
};

const VERIFICATION_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Verified':       { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Field-Assessed': { color: 'text-blue-300',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    icon: Activity    },
  'Remote-Sensed':  { color: 'text-cyan-300',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/25',    icon: Eye         },
  'Modelled':       { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   icon: Shield      },
};

const TYPE_ICON_COLOR: Record<string, string> = {
  'Slab':    'text-sky-400',
  'Powder':  'text-cyan-300',
  'Wet':     'text-blue-400',
  'Cornice': 'text-indigo-300',
};

// ─── Avalanche Card ──────────────────────────────────────────────────────────

function AvalancheCard({ record, index }: { record: AvalancheRecord; index: number }) {
  const status = STATUS_COLOR[record.current_status] || STATUS_COLOR['Clear'];
  const StatusIcon = status.icon;
  const ev = VERIFICATION_CONFIG[record.verification_status] || VERIFICATION_CONFIG['Modelled'];
  const EvIcon = ev.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className={`glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group ${
        (record.live_risk_level || record.risk_level) === 'Critical' ? 'hover:border-red-500/30' : (record.live_risk_level || record.risk_level) === 'High' ? 'hover:border-orange-500/30' : 'hover:border-white/20'
      }`}>

        {/* Subtle accent gradient */}
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-5 pointer-events-none ${
          (record.live_risk_level || record.risk_level) === 'Critical' ? 'from-red-500 to-transparent' : (record.live_risk_level || record.risk_level) === 'High' ? 'from-orange-500 to-transparent' : 'from-cyan-500 to-transparent'
        }`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">{record.name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge variant={(record.live_risk_level || record.risk_level) === 'Critical' ? 'critical' : (record.live_risk_level || record.risk_level) === 'High' ? 'danger' : (record.live_risk_level || record.risk_level) === 'Moderate' ? 'warning' : 'success'} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {record.live_risk_level || record.risk_level} Risk
          </Badge>
        </div>

        {/* Status label */}
        <div className={`flex flex-col gap-1 px-2.5 py-1.5 rounded-lg border text-[10px] w-full ${status.bg} ${status.border}`}>
          <div className={`flex items-center gap-1.5 font-bold ${status.color}`}>
            <StatusIcon className="w-3 h-3 flex-shrink-0" />
            <span>{record.current_status}</span>
          </div>
          <span className="text-[9px] text-slate-400 uppercase tracking-wide leading-tight">{record.verification_status}</span>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-col gap-1.5 text-xs mt-1 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">24h Snowfall</span>
            <span className="font-bold text-cyan-400">{record.live_snowfall_24h !== undefined ? `${record.live_snowfall_24h} cm` : '--'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Snow Depth</span>
            <span className="font-bold text-blue-300">{record.live_snow_depth !== undefined ? `${record.live_snow_depth} m` : '--'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Wind / Temp</span>
            <span className="text-slate-300 font-medium">
              {record.live_wind_speed !== undefined ? `${record.live_wind_speed} km/h` : '--'} / {record.live_temperature !== undefined ? `${record.live_temperature} °C` : '--'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Elevation</div>
            <div className="text-[10px] font-medium text-cyan-400 leading-tight">{record.elevation_m.toLocaleString()} m</div>
          </div>
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Hist. Events</div>
            <div className="text-[10px] font-medium text-amber-400 leading-tight">{record.historical_events_count}</div>
          </div>
        </div>

        {/* Infrastructure */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[10px] text-slate-400">
          <div className="flex items-start gap-1.5">
            <Triangle className="w-3 h-3 flex-shrink-0 mt-0.5 text-cyan-400" />
            <span className="line-clamp-2 leading-snug"><strong className="text-slate-300 font-medium">Affected Road:</strong> {record.road_or_pass}</span>
          </div>
        </div>

        {/* Dominant Trigger & Last Updated */}
        <div className="mt-1 text-[10px] text-slate-400">
          <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
            <span>Trigger:</span>
            <span className="text-amber-400 font-medium">{record.dominant_trigger || 'Calculating...'}</span>
          </div>
          {record.last_updated && (
             <div className="text-right text-[9px] mt-1 text-slate-500">
               Updated: {new Date(record.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Avalanche List Row ──────────────────────────────────────────────────────

function AvalancheRow({ record, index }: { record: AvalancheRecord; index: number }) {
  const status = STATUS_COLOR[record.current_status] || STATUS_COLOR['Clear'];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">
          {/* Name + District */}
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> {record.district}</div>
          </div>

          {/* Elevation */}
          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500">Elevation</div>
            <div className="text-xs font-bold text-cyan-400">{record.elevation_m.toLocaleString()} m</div>
          </div>

          {/* Type */}
          <div className="w-24 hidden xl:block">
            <div className="text-[10px] text-slate-500">Type</div>
            <div className={`text-xs font-medium ${TYPE_ICON_COLOR[record.avalanche_type] || 'text-slate-300'}`}>{record.avalanche_type}</div>
          </div>

          {/* Season */}
          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500">Season</div>
            <div className="text-xs text-slate-300 truncate">{record.season}</div>
          </div>

          {/* Risk Level */}
          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={(record.live_risk_level || record.risk_level) === 'Critical' ? 'critical' : (record.live_risk_level || record.risk_level) === 'High' ? 'danger' : (record.live_risk_level || record.risk_level) === 'Moderate' ? 'warning' : 'success'} size="sm" className="text-[10px] shadow-sm">
              {record.live_risk_level || record.risk_level}
            </Badge>
          </div>

          {/* Status */}
          <div className="w-40 hidden sm:block">
            <div className={`flex flex-col gap-0.5 px-2 py-1 rounded-lg border w-max ${status.bg} ${status.border}`}>
              <div className={`flex items-center gap-1.5 text-[10px] font-bold ${status.color}`}>
                <StatusIcon className="w-3 h-3 flex-shrink-0" />
                <span>{record.current_status}</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<ChevronRight className="w-3 h-3" />}>
              Details
            </Button>
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

  const { data: liveData, isStale, error } = useAvalancheIntelligence(avalancheData);

  const [typeFilter, setTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [seasonFilter, setSeasonFilter] = useState('all');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const avalancheTypes = ['Slab', 'Powder', 'Wet', 'Cornice'];
  const riskLevels = ['Critical', 'High', 'Moderate', 'Low'];
  const statuses = ['Active Warning', 'Watch', 'Seasonal', 'Clear'];
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
  }, [filter, typeFilter, riskFilter, statusFilter, seasonFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount = [typeFilter, riskFilter, statusFilter, seasonFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return liveData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope, liveData]);

  // Aggregate KPIs
  const activeWarnings = liveData.filter(d => d.current_status === 'Active Warning').length;
  const criticalZones = liveData.filter(d => (d.live_risk_level || d.risk_level) === 'Critical').length;
  const highAltitude = liveData.filter(d => d.elevation_m >= 4000).length;
  const verifiedCount = liveData.filter(d => d.verification_status === 'Verified').length;
  const totalEvents = liveData.reduce((sum, d) => sum + d.historical_events_count, 0);
  const maxElevation = Math.max(...liveData.map(d => d.elevation_m));

  const metrics = [
    { label: 'Total Zones', value: liveData.length, icon: 'MapPin' },
    { label: 'Active Warnings', value: activeWarnings, icon: 'AlertTriangle' },
    { label: 'Critical Risk', value: criticalZones, icon: 'Shield' },
    { label: 'High-Altitude (4000m+)', value: highAltitude, icon: 'Mountain' },
    { label: 'Verified Zones', value: verifiedCount, icon: 'CheckCircle' },
    { label: 'Historical Events', value: totalEvents.toLocaleString(), icon: 'Activity' },
    { label: 'Max Elevation', value: `${maxElevation.toLocaleString()} m`, icon: 'TrendingUp' },
    { label: 'Latest Update', value: 'Live', icon: 'Clock' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence"
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">Avalanche Risk Intelligence</span>
          </>}
        subtitle="Monitoring avalanche-prone corridors, high-altitude passes, and critical road infrastructure across the Western Himalayan ecological domain using verified field data and remote-sensing intelligence."
        icon={<Snowflake className="w-6 h-6 text-cyan-400" />}
        breadcrumbs={[
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Avalanches' },
        ]}
      />

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-cyan-500" />

      {/* ── WARNING BANNER ───────────────────────────────────────────────── */}
      {(isStale || error) && (
        <div className="container mx-auto px-6 mt-4 relative z-40">
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-lg flex items-center gap-3 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>
              {error ? `Error: ${error}` : 'Warning: Live Meteo API is unreachable. Displaying cached data which may be stale.'}
            </span>
          </div>
        </div>
      )}

      {/* ── FILTER BAR ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={typeFilter} onChange={setTypeFilter} placeholder="Avalanche Type" options={avalancheTypes.map(t => ({ value: t, label: t }))} />
              <FilterSelect value={riskFilter} onChange={setRiskFilter} placeholder="Risk Level" options={riskLevels.map(r => ({ value: r, label: r }))} />
              <FilterSelect value={statusFilter} onChange={setStatusFilter} placeholder="Current Status" options={statuses.map(s => ({ value: s, label: s }))} />
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
        entityLabel="avalanche zones"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Avalanche Zones')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Snowflake className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No avalanche zones found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record, i) => (
                  <AvalancheCard key={record.id} record={record} index={i} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record, i) => (
                  <AvalancheRow key={record.id} record={record} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* ── PAGINATION ───────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[60vw] hide-scrollbar px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`flex-shrink-0 w-8 h-8 rounded-lg text-sm transition-colors ${
                      currentPage === p
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/10"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── CROSS-LINKS ──────────────────────────────────────────────────── */}
      <section className="py-8 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-lg font-bold text-white mb-4">Explore Related Hazard Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Earthquake Zones', href: '/hazard-intelligence/earthquakes', icon: Activity, color: 'text-red-400', border: 'border-red-500/20 hover:border-red-500/40' },
              { label: 'Flood Zones', href: '/hazard-intelligence/floods', icon: TrendingUp, color: 'text-blue-400', border: 'border-blue-500/20 hover:border-blue-500/40' },
              { label: 'Landslide Zones', href: '/hazard-intelligence/landslides', icon: Mountain, color: 'text-amber-400', border: 'border-amber-500/20 hover:border-amber-500/40' },
              { label: 'Hazard Overview', href: '/hazard-intelligence', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/20 hover:border-emerald-500/40' },
            ].map(link => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`flex items-center gap-3 p-4 rounded-xl border bg-white/[0.02] transition-all text-left group ${link.border}`}
              >
                <link.icon className={`w-5 h-5 ${link.color}`} />
                <span className="text-sm text-slate-300 group-hover:text-white font-medium">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
