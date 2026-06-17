'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Waves, ArrowRight, Map, AlertTriangle, Activity, Droplets,
  Layers, Flower2, Thermometer, Fish,
  Grid3X3, List, CheckCircle, HelpCircle, Search,
  BarChart3, Target, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import {
  algalBloomLakes, algalBloomLakeStats,
  type AlgalBloomLake, type TrophicEvidenceLabel,
} from '@/data/algal-bloom-lakes';
import Link from 'next/link';

// ─── Colour maps ──────────────────────────────────────────────────────────────

const EVIDENCE_CONFIG: Record<TrophicEvidenceLabel, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Verified Trophic Status':   { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle  },
  'Inferred Trophic Risk':     { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   icon: Activity     },
  'Data Gap / Needs Sampling': { color: 'text-slate-400',   bg: 'bg-slate-500/10',   border: 'border-slate-500/25',   icon: HelpCircle   },
};

const TROPHIC_COLOR: Record<string, string> = {
  'Eutrophic':       'text-red-400',
  'Hypereutrophic':  'text-red-500',
  'Mesotrophic':     'text-amber-400',
  'Oligotrophic':    'text-emerald-400',
  'Brackish / Saline':'text-blue-400',
  'Unknown':         'text-slate-500',
};

const BLOOM_BADGE: Record<string, 'danger'|'warning'|'info'|'success'|'default'> = {
  'Confirmed':                 'danger',
  'Seasonal / Suspected':      'warning',
  'Suspected':                 'warning',
  'Macrophyte / Algal Overgrowth': 'warning',
  'Algal Bioindicator':        'info',
  'None Reported':             'success',
  'Not Primary Issue':         'default',
  'Unknown':                   'default',
};

const THREAT_COLOR: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/25',
  High:     'text-orange-400 bg-orange-500/10 border-orange-500/25',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Low:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  Unknown:  'text-slate-500 bg-slate-500/10 border-slate-500/25',
};

// ─── Lake Card ────────────────────────────────────────────────────────────────

function LakeCard({ lake, index }: { lake: AlgalBloomLake; index: number }) {
  const ev = EVIDENCE_CONFIG[lake.trophicEvidenceLabel];
  const EvIcon = ev.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
    >
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 hover:border-white/20 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate">{lake.name}</h3>
            {lake.alternateName && (
              <p className="text-[10px] text-slate-500 truncate">{lake.alternateName}</p>
            )}
            <p className="text-[10px] text-slate-500 mt-0.5">{lake.district}</p>
          </div>
          <Badge variant={BLOOM_BADGE[lake.bloomIssue]} size="sm" className="flex-shrink-0 text-[10px]">
            {lake.bloomIssue}
          </Badge>
        </div>

        {/* Trophic evidence label */}
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-medium ${ev.bg} ${ev.border} ${ev.color}`}>
          <EvIcon className="w-3 h-3 flex-shrink-0" />
          <span>{lake.trophicEvidenceLabel}</span>
        </div>

        {/* Trophic status */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Trophic Status</span>
          <span className={`font-semibold ${TROPHIC_COLOR[lake.trophicStatus]}`}>{lake.trophicStatus}</span>
        </div>

        {/* Threat level */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Threat Level</span>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${THREAT_COLOR[lake.threatLevel]}`}>
            {lake.threatLevel}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-slate-500">
          {lake.altitude && <span>↑ {lake.altitude}</span>}
          {lake.area    && <span>◻ {lake.area}</span>}
          <span className="text-slate-600">{lake.lakeType}</span>
        </div>

        {/* Trophic note — truncated */}
        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{lake.trophicNote}</p>

        {/* Nutrient drivers */}
        <div className="flex flex-wrap gap-1">
          {lake.nutrientDrivers.slice(0, 3).map(d => (
            <span key={d} className="text-[9px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-full border border-white/8 truncate max-w-[120px]">{d}</span>
          ))}
          {lake.nutrientDrivers.length > 3 && (
            <span className="text-[9px] text-slate-500">+{lake.nutrientDrivers.length - 3}</span>
          )}
        </div>

      </Card>
    </motion.div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function LakeRow({ lake, index }: { lake: AlgalBloomLake; index: number }) {
  const ev = EVIDENCE_CONFIG[lake.trophicEvidenceLabel];
  const EvIcon = ev.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-3">
          {/* Name + district */}
          <div className="min-w-[160px] flex-1">
            <span className="text-sm font-semibold text-white">{lake.name}</span>
            {lake.alternateName && <span className="text-xs text-slate-500 ml-1.5">/ {lake.alternateName}</span>}
            <div className="text-[10px] text-slate-500">{lake.district}</div>
          </div>
          {/* Scope pill */}
          <span className="text-[10px] text-slate-400 hidden md:block w-36 flex-shrink-0">{lake.scope}</span>
          {/* Evidence label */}
          <div className={`hidden lg:flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-medium flex-shrink-0 ${ev.bg} ${ev.border} ${ev.color}`}>
            <EvIcon className="w-2.5 h-2.5" />{lake.trophicEvidenceLabel}
          </div>
          {/* Trophic status */}
          <span className={`text-xs font-semibold flex-shrink-0 w-24 hidden sm:block ${TROPHIC_COLOR[lake.trophicStatus]}`}>
            {lake.trophicStatus}
          </span>
          {/* Bloom badge */}
          <Badge variant={BLOOM_BADGE[lake.bloomIssue]} size="sm" className="flex-shrink-0 text-[10px]">
            {lake.bloomIssue}
          </Badge>
          {/* Threat */}
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${THREAT_COLOR[lake.threatLevel]}`}>
            {lake.threatLevel}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const BLOOM_FILTER_OPTIONS = [
  'Confirmed', 'Seasonal / Suspected', 'Suspected', 'Macrophyte / Algal Overgrowth',
  'Algal Bioindicator', 'None Reported', 'Unknown',
];

export default function AlgalBloomMonitoringPage() {
  const router = useRouter();
  const { filter: globalFilter } = useGlobalFilter();

  const [bloomFilter, setBloomFilter]     = useState('all');
  const [trophicFilter, setTrophicFilter] = useState('all');
  const [viewMode, setViewMode]           = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage]     = useState(1);

  // Map GlobalFilterBar scope → lake scope field
  const scopeFilter = globalFilter.scope === 'All' ? 'All' : globalFilter.scope;

  const ITEMS_PER_PAGE = viewMode === 'grid' ? 9 : 15;

  const filtered = useMemo(() => {
    return algalBloomLakes.filter(lake => {
      // Scope — driven by GlobalFilterBar scope buttons
      if (scopeFilter !== 'All' && lake.scope !== scopeFilter) return false;
      // Page-specific filters
      if (bloomFilter !== 'all' && lake.bloomIssue !== bloomFilter) return false;
      if (trophicFilter !== 'all' && lake.trophicStatus !== trophicFilter) return false;
      // Global district filter
      if (globalFilter.district !== 'All Districts' && globalFilter.district !== 'All') {
        if (!lake.district.toLowerCase().includes(globalFilter.district.toLowerCase())) return false;
      }
      // Global search
      if (globalFilter.search) {
        const q = globalFilter.search.toLowerCase();
        return (
          lake.name.toLowerCase().includes(q) ||
          (lake.alternateName?.toLowerCase().includes(q) ?? false) ||
          lake.district.toLowerCase().includes(q) ||
          lake.trophicStatus.toLowerCase().includes(q) ||
          lake.bloomIssue.toLowerCase().includes(q) ||
          lake.lakeType.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [scopeFilter, bloomFilter, trophicFilter, globalFilter.district, globalFilter.search]);

  // Reset to page 1 whenever filters or view mode change
  React.useEffect(() => { setCurrentPage(1); },
    [scopeFilter, bloomFilter, trophicFilter, globalFilter.district, globalFilter.search, viewMode]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount =
    (bloomFilter !== 'all' ? 1 : 0) +
    (trophicFilter !== 'all' ? 1 : 0);

  const stats = algalBloomLakeStats;

  return (
    <main className="min-h-screen bg-slate-950">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <Heading
        title={<><span className="block whitespace-nowrap leading-[1.12]">Algal Bloom Intelligence Across</span><span className="block whitespace-nowrap leading-[1.12] pb-2 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Greater Kashmir Ecology</span></>}
        subtitle="Complete trophic status database covering 83 lake systems across Kashmir Core, Trans-Divisional, and Transboundary regions — with verified, inferred, and data-gap classifications anchored to published scientific sources."
        icon={<Waves className="w-6 h-6 text-emerald-400" />}
        label="Bloom Intelligence"
        images={['/images/protected-network.png']}
        gridOverlay
        actions={
          <>
            <a href="/water-systems/lakes">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500">
                <Map className="w-5 h-5 mr-2" />
                All Lakes
              </Button>
            </a>
            <a href="/water-systems/water-quality">
              <Button size="lg" variant="outline" className="border-white/20 text-white">
                <Droplets className="w-5 h-5 mr-2" />
                Water Quality
              </Button>
            </a>
          </>
        }
      />

      {/* ── KPI Strip ───────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={[
        { label: 'Lakes Mapped',       value: stats.total,          icon: 'Database'       },
        { label: 'Verified Trophic',   value: stats.verified,       icon: 'CheckCircle',   color: 'text-emerald-400' },
        { label: 'Inferred Risk',      value: stats.inferred,       icon: 'Activity',      color: 'text-amber-400'   },
        { label: 'Data Gaps',          value: stats.dataGap,        icon: 'HelpCircle',    color: 'text-slate-400'   },
        { label: 'Eutrophic',          value: stats.eutrophic,      icon: 'AlertTriangle', color: 'text-red-400'     },
        { label: 'Oligotrophic',       value: stats.oligotrophic,   icon: 'Leaf',          color: 'text-emerald-400' },
        { label: 'Blooms Confirmed',   value: stats.bloomConfirmed, icon: 'Waves',         color: 'text-orange-400'  },
        { label: 'Critical Threat',    value: stats.critical,       icon: 'ShieldAlert',   color: 'text-red-400'     },
      ]} />

      {/* ── Global Filter Bar ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={bloomFilter}
                onChange={setBloomFilter}
                placeholder="All Bloom Issues"
                options={BLOOM_FILTER_OPTIONS.map(s => ({ value: s, label: s }))}
              />
              <FilterSelect
                value={trophicFilter}
                onChange={setTrophicFilter}
                placeholder="All Trophic Status"
                options={[
                  { value: 'Eutrophic',         label: 'Eutrophic'         },
                  { value: 'Hypereutrophic',     label: 'Hypereutrophic'    },
                  { value: 'Mesotrophic',        label: 'Mesotrophic'       },
                  { value: 'Oligotrophic',       label: 'Oligotrophic'      },
                  { value: 'Brackish / Saline',  label: 'Brackish / Saline' },
                  { value: 'Unknown',            label: 'Unknown'           },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => { setBloomFilter('all'); setTrophicFilter('all'); }}
        />
      </div>

      {/* ── Scope counts + results row ───────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Scope count pills — read-only, driven by GlobalFilterBar scope buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'All Lakes',              count: stats.total,            scope: 'All',                      color: 'text-slate-300 bg-white/5 border-white/10' },
              { label: 'Kashmir Core',           count: stats.kashmirCore,      scope: 'Kashmir Core',             color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' },
              { label: 'Trans-Divisional',       count: stats.transDivisional,  scope: 'Trans-Divisional',         color: 'text-blue-300 bg-blue-500/10 border-blue-500/20' },
              { label: 'Transboundary',          count: stats.transboundary,    scope: 'Transboundary / Extended', color: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
            ].map(({ label, count, scope, color }) => (
              <div key={scope}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-medium transition-all ${
                  scopeFilter === scope || (scope === 'All' && scopeFilter === 'All')
                    ? color + ' ring-1 ring-white/20'
                    : 'text-slate-500 bg-white/3 border-white/8'
                }`}
              >
                <span>{label}</span>
                <span className="font-bold">{count}</span>
              </div>
            ))}
          </div>

          {/* Results count + view toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-slate-400 whitespace-nowrap hidden sm:block">
              <strong className="text-white">{filtered.length}</strong> of{' '}
              <strong className="text-white">{stats.total}</strong> lakes
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Evidence key ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4">
        <div className="flex flex-wrap items-center gap-3">
          {(Object.entries(EVIDENCE_CONFIG) as [TrophicEvidenceLabel, typeof EVIDENCE_CONFIG[TrophicEvidenceLabel]][]).map(([label, cfg]) => {
            const Icon = cfg.icon;
            return (
              <div key={label} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-medium ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                <Icon className="w-3 h-3" />{label}
              </div>
            );
          })}
          <span className="text-[10px] text-slate-600 ml-1">— Evidence classification legend</span>
        </div>
      </div>

      {/* ── Lake Database ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No lakes match the current filters.</p>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div key={`grid-${currentPage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map((lake, i) => <LakeCard key={lake.id} lake={lake} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key={`list-${currentPage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-2">
              {/* List header */}
              <div className="hidden lg:grid grid-cols-[1fr_140px_200px_100px_140px_80px] gap-3 px-4 pb-1 text-[10px] text-slate-600 uppercase tracking-wider">
                <span>Lake Name / District</span>
                <span>Scope</span>
                <span>Evidence Label</span>
                <span>Trophic</span>
                <span>Bloom Issue</span>
                <span>Threat</span>
              </div>
              {paginated.map((lake, i) => <LakeRow key={lake.id} lake={lake} index={i} />)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pagination ─────────────────────────────────────────────────────── */}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex flex-col items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-2">
              <Button
                variant="outline" size="sm"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-emerald-500 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-slate-600 px-1">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline" size="sm"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-slate-500">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} lakes
            </div>
          </div>
        )}
      </div>

      {/* ── Trophic Intelligence Summary ─────────────────────────────────────── */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Trophic Intelligence Summary</h2>
              <p className="text-sm text-slate-400">Database composition, evidence quality, and methodology</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Verified */}
            <Card className="glass-intense border-emerald-500/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Verified Trophic Status</h3>
              </div>
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                {stats.verified}
                <span className="text-sm text-slate-500 font-normal ml-2">of {stats.total} lakes</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 mb-4">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round((stats.verified / stats.total) * 100)}%` }} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Peer-reviewed field studies, published satellite remote sensing, or government-verified water-quality sampling. Evidence anchored to NASA Science, MDPI Water, Phytojournal, and Frontiers in Environmental Science.
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Eutrophic confirmed</span>
                  <span className="text-red-400 font-semibold">{algalBloomLakes.filter(l => l.trophicEvidenceLabel === 'Verified Trophic Status' && l.trophicStatus === 'Eutrophic').length} lakes</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Oligotrophic confirmed</span>
                  <span className="text-emerald-400 font-semibold">{algalBloomLakes.filter(l => l.trophicEvidenceLabel === 'Verified Trophic Status' && l.trophicStatus === 'Oligotrophic').length} lake</span>
                </div>
              </div>
            </Card>

            {/* Inferred */}
            <Card className="glass-intense border-amber-500/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Inferred Trophic Risk</h3>
              </div>
              <div className="text-3xl font-bold text-amber-400 mb-1">
                {stats.inferred}
                <span className="text-sm text-slate-500 font-normal ml-2">of {stats.total} lakes</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 mb-4">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.round((stats.inferred / stats.total) * 100)}%` }} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Risk inferred from adjacent lake studies, altitude and land-use context, or regional review. Rule: urban floodplain lakes → inferred eutrophic/mesotrophic; high-altitude glacial lakes → inferred oligotrophic.
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Eutrophic / Mesotrophic risk</span>
                  <span className="text-amber-400 font-semibold">{algalBloomLakes.filter(l => l.trophicEvidenceLabel === 'Inferred Trophic Risk' && (l.trophicStatus === 'Eutrophic' || l.trophicStatus === 'Mesotrophic')).length} lakes</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Oligotrophic inferred</span>
                  <span className="text-emerald-400 font-semibold">{algalBloomLakes.filter(l => l.trophicEvidenceLabel === 'Inferred Trophic Risk' && l.trophicStatus === 'Oligotrophic').length} lakes</span>
                </div>
              </div>
            </Card>

            {/* Data Gap */}
            <Card className="glass-intense border-slate-500/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-slate-400" />
                <h3 className="text-sm font-bold text-white">Data Gap / Needs Sampling</h3>
              </div>
              <div className="text-3xl font-bold text-slate-400 mb-1">
                {stats.dataGap}
                <span className="text-sm text-slate-600 font-normal ml-2">of {stats.total} lakes</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 mb-4">
                <div className="h-full bg-slate-500 rounded-full" style={{ width: `${Math.round((stats.dataGap / stats.total) * 100)}%` }} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                No published trophic study found. Covers high-altitude Ladakh lakes, Kishtwar glacial lakes, sub-alpine Budgam lakes, and Gilgit-Baltistan reservoirs. Priority targets for field sampling.
              </p>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Kashmir Core</span>
                  <span className="text-slate-400 font-semibold">{algalBloomLakes.filter(l => l.trophicEvidenceLabel === 'Data Gap / Needs Sampling' && l.scope === 'Kashmir Core').length} lakes</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Trans-Divisional</span>
                  <span className="text-slate-400 font-semibold">{algalBloomLakes.filter(l => l.trophicEvidenceLabel === 'Data Gap / Needs Sampling' && l.scope === 'Trans-Divisional').length} lakes</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Transboundary</span>
                  <span className="text-slate-400 font-semibold">{algalBloomLakes.filter(l => l.trophicEvidenceLabel === 'Data Gap / Needs Sampling' && l.scope === 'Transboundary / Extended').length} lakes</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* ── Bloom Formation Factors ───────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Bloom Formation Factors</h2>
              <p className="text-sm text-slate-400">Primary drivers of eutrophication in Kashmir lake systems</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { factor: 'Nutrient Loading',    pct: '40%', desc: 'Nitrogen and phosphorus from sewage and agriculture' },
              { factor: 'Water Temperature',   pct: '25%', desc: 'Warmer waters accelerate algal growth'               },
              { factor: 'Stagnant Conditions', pct: '20%', desc: 'Low water circulation in floodplain lakes'           },
              { factor: 'Sunlight Exposure',   pct: '10%', desc: 'Extended photoperiod in summer months'               },
              { factor: 'pH Changes',          pct: '5%',  desc: 'Alkaline conditions favour cyanobacteria'            },
            ].map(({ factor, pct, desc }) => (
              <Card key={factor} className="glass-light border-white/10 p-5">
                <h3 className="text-xs font-bold text-white mb-2">{factor}</h3>
                <div className="text-2xl font-bold text-emerald-400 mb-2">{pct}</div>
                <p className="text-xs text-slate-400">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-Link: Floral Bloom ─────────────────────────────────────────── */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Link href="/seasonal-ecology/bloom-mapping">
            <Card className="glass-intense border-pink-500/30 hover:border-pink-500/50 transition-all cursor-pointer group overflow-hidden">
              <div className="relative p-6 md:p-8">
                <div className="absolute inset-0 bg-slate-900/50" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl">
                      <Flower2 className="w-5 h-5 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="border-pink-500/50 text-pink-400">Related Intelligence</Badge>
                      <Badge variant="success" size="sm">Seasonal Ecology</Badge>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      Explore Floral Bloom Zones &amp; Flowering Landscapes
                    </h3>
                    <p className="text-slate-300 mb-4 max-w-3xl">
                      While algal blooms indicate water stress, floral blooms represent Kashmir's seasonal phenology and flowering cycles. Explore orchard bloom belts, alpine meadow flowering, medicinal plant zones, and pollinator-linked bloom timing.
                    </p>
                    <div className="flex items-center gap-2 text-pink-400 font-medium">
                      <span>View Floral Bloom Mapping</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  <div className="hidden md:flex flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center group-hover:bg-pink-500/30 transition-all">
                      <ArrowRight className="w-6 h-6 text-pink-400" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* ── Related Intelligence ─────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-bold text-white mb-6">Related Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Droplets,     color: 'text-blue-400',   hover: 'hover:border-blue-500/30',    label: 'Lake Profiles',            desc: 'Dal, Wular, Manasbal & all lake health data',      route: '/water-systems/lakes'        },
              { icon: Waves,        color: 'text-sky-400',    hover: 'hover:border-sky-500/30',     label: 'Wetland Profiles',         desc: 'Hokersar, Shallabugh & wetland systems',          route: '/water-systems/wetlands'     },
              { icon: Thermometer,  color: 'text-teal-400',   hover: 'hover:border-teal-500/30',    label: 'Water Quality',            desc: 'Monitoring parameters & eutrophication indicators', route: '/water-systems/water-quality' },
              { icon: Fish,         color: 'text-violet-400', hover: 'hover:border-violet-500/30',  label: 'Aquatic Life Risk',        desc: 'Fish populations & aquatic vulnerability',         route: '/water-systems/fisheries'    },
              { icon: AlertTriangle,color: 'text-indigo-400', hover: 'hover:border-indigo-500/30',  label: 'Flood Risk',               desc: 'District hydrological risk & alerts',              route: '/water-systems/flood-risk'   },
            ].map(({ icon: Icon, color, hover, label, desc, route }) => (
              <Card key={label} className={`glass-light border-white/10 ${hover} transition-all p-5 cursor-pointer group`} onClick={() => router.push(route)}>
                <Icon className={`w-7 h-7 ${color} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="text-sm font-bold text-white mb-1">{label}</h3>
                <p className="text-xs text-slate-400">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
