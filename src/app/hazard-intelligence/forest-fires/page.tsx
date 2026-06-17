'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Flame, ChevronRight, AlertTriangle,
  Activity, Clock, MapPin, ExternalLink,
  TrendingUp, Shield, Zap, Eye, Mountain, Users, Calendar, RefreshCw
} from 'lucide-react';
import {
  forestFireRegistry, forestFireKpis,
  ForestFireRecord,
} from '@/data/hazard-forest-fires';

// ─── Risk badge helpers ──────────────────────────────────────────────────────

const RISK_VARIANT: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
  Critical: 'danger',
  High: 'warning',
  Moderate: 'info',
  Low: 'success',
};

const STATUS_CHIP: Record<string, string> = {
  'Active Fire':        'text-red-400    bg-red-500/10    border-red-500/30',
  'Post-fire Recovery': 'text-amber-400  bg-amber-500/10  border-amber-500/30',
  'Fire Season Watch':  'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'No Current Risk':    'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Prescribed Burn':    'text-blue-400   bg-blue-500/10   border-blue-500/30',
};

const VERIFICATION_CHIP: Record<string, string> = {
  'Field Verified':     'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Satellite Verified': 'text-cyan-400    bg-cyan-500/10    border-cyan-500/30',
  'Community Reported': 'text-amber-400   bg-amber-500/10   border-amber-500/30',
  'Unverified':         'text-slate-400   bg-slate-500/10   border-slate-500/30',
};

const FOREST_TYPE_COLORS: Record<string, string> = {
  Coniferous: 'text-emerald-400',
  Broadleaf:  'text-green-400',
  Mixed:      'text-teal-400',
  Scrub:      'text-amber-400',
};

// ─── ForestFireCard ──────────────────────────────────────────────────────────

function ForestFireCard({ record, index }: { record: ForestFireRecord; index: number }) {
  const statusChip = STATUS_CHIP[record.current_status] || STATUS_CHIP['No Current Risk'];
  const verChip = VERIFICATION_CHIP[record.verification_status] || VERIFICATION_CHIP['Unverified'];
  const forestColor = FOREST_TYPE_COLORS[record.forest_type] || 'text-slate-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      className="flex flex-col h-full"
    >
      <Card className="glass-intense border-white/10 p-5 flex flex-col h-full hover:border-white/20 transition-all group">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors leading-tight">{record.name}</h3>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{record.district} · {record.scope}</span>
            </div>
          </div>
          <Badge variant={RISK_VARIANT[record.risk_level]} className="flex-shrink-0 ml-2">
            {record.risk_level}
          </Badge>
        </div>

        {/* Status + Verification */}
        <div className="flex gap-2 mb-3">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${statusChip}`}>
            <Activity className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium">{record.current_status}</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${verChip}`}>
            <Shield className="w-3 h-3 flex-shrink-0" />
            <span className="font-medium truncate">{record.verification_status}</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-1.5 text-xs mb-3">
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Forest Type</div>
            <div className={`font-bold ${forestColor}`}>{record.forest_type}</div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Area</div>
            <div className="font-bold text-slate-200">{record.area_vulnerable_hectares.toLocaleString()} <span className="text-[8px] font-normal text-slate-500">ha</span></div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Frequency</div>
            <div className="font-bold text-slate-200">{record.fire_frequency}</div>
          </div>
        </div>

        {/* Evidence Chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
            <Users className="w-2.5 h-2.5 inline mr-1" />{record.cause_primary} Cause
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
            <Calendar className="w-2.5 h-2.5 inline mr-1" />{record.fire_season}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
            <Eye className="w-2.5 h-2.5 inline mr-1" />{record.detection_method}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center text-[10px]">
          <span className="text-slate-500">Last Fire Event</span>
          <span className="text-slate-400 font-mono">{record.last_fire_event}</span>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── ForestFireRow ───────────────────────────────────────────────────────────

function ForestFireRow({ record, index }: { record: ForestFireRecord; index: number }) {
  const statusChip = STATUS_CHIP[record.current_status] || STATUS_CHIP['No Current Risk'];
  const verChip = VERIFICATION_CHIP[record.verification_status] || VERIFICATION_CHIP['Unverified'];
  const forestColor = FOREST_TYPE_COLORS[record.forest_type] || 'text-slate-300';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all group">
        <div className="flex flex-wrap items-center gap-4">
          {/* Name */}
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> {record.district} · {record.scope}</div>
          </div>

          {/* Risk */}
          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={RISK_VARIANT[record.risk_level]} size="sm">{record.risk_level}</Badge>
          </div>

          {/* Forest Type & Area */}
          <div className="w-36 hidden md:flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">Type</div>
              <div className={`text-xs font-bold ${forestColor}`}>{record.forest_type}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-0.5">Area</div>
              <div className="text-xs font-bold text-slate-300">{record.area_vulnerable_hectares.toLocaleString()} ha</div>
            </div>
          </div>

          {/* Status */}
          <div className="w-36 hidden lg:block">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${statusChip}`}>
              <Activity className="w-3 h-3 flex-shrink-0" />
              <span className="font-medium">{record.current_status}</span>
            </div>
          </div>

          {/* Verification */}
          <div className="w-36 hidden xl:block">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${verChip}`}>
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span className="font-medium truncate">{record.verification_status}</span>
            </div>
          </div>

          {/* Cause */}
          <div className="w-20 hidden sm:block text-right">
            <div className="text-[10px] text-slate-500 mb-0.5">Cause</div>
            <div className="text-xs text-orange-300 font-bold">{record.cause_primary}</div>
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

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function ForestFiresPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();
  const [forestTypeFilter, setForestTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // ─── Filtering ─────────────────────────────────────────────────────────────

  const filteredData = useMemo(() => forestFireRegistry.filter(d => {
    const matchSearch = filter.searchQuery === '' ||
      d.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      d.forest_type.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchScope = filter.scope === 'All' || d.scope === filter.scope;
    const matchDistrict = filter.district === 'All' || d.district === filter.district;
    const matchForestType = forestTypeFilter === 'all' || d.forest_type === forestTypeFilter;
    const matchRisk = riskFilter === 'all' || d.risk_level === riskFilter;

    return matchSearch && matchScope && matchDistrict && matchForestType && matchRisk;
  }), [filter, forestTypeFilter, riskFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  React.useEffect(() => { setCurrentPage(1); }, [forestTypeFilter, riskFilter, filter]);

  const extraActiveCount = (forestTypeFilter !== 'all' ? 1 : 0) + (riskFilter !== 'all' ? 1 : 0);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Forest Fires' }
        ]}
        title={
          <>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible">Forest Fire Intelligence Across</span>
            <span className="block whitespace-nowrap leading-[1.12] pb-2 overflow-visible bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent">Greater Kashmir Ecology</span>
          </>
        }
        subtitle="Forest fire risk intelligence across 32 vulnerability zones spanning coniferous, broadleaf, mixed, and scrubland ecosystems. Integrates satellite detection, community reporting, and ground station monitoring with fire frequency and causal analysis."
        icon={<Flame className="w-6 h-6 text-orange-400" />}
      />

      <ModuleKpiStrip kpis={forestFireKpis} iconColor="text-orange-500" />

      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={forestTypeFilter}
                onChange={setForestTypeFilter}
                placeholder="All Forest Types"
                options={[
                  { value: 'Coniferous', label: 'Coniferous' },
                  { value: 'Broadleaf',  label: 'Broadleaf' },
                  { value: 'Mixed',      label: 'Mixed' },
                  { value: 'Scrub',      label: 'Scrub' },
                ]}
              />
              <FilterSelect
                value={riskFilter}
                onChange={setRiskFilter}
                placeholder="All Risk Levels"
                options={[
                  { value: 'Critical', label: 'Critical' },
                  { value: 'High',     label: 'High' },
                  { value: 'Moderate', label: 'Moderate' },
                  { value: 'Low',      label: 'Low' },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => { setForestTypeFilter('all'); setRiskFilter('all'); }}
        />
      </div>

      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={forestFireRegistry.length}
        entityLabel="fire risk zones"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Fire Risk Zones')}
        scopeCount={filter.scope === 'All' ? 0 : forestFireRegistry.filter(d => d.scope === filter.scope).length}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── Registry Section ─────────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-orange-400" />
              Forest Fire Risk Registry
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Wildfire vulnerability zones — forest type, fire frequency, detection methods & causal intelligence
            </p>
          </motion.div>

          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Flame className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No fire risk zones found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((d, i) => (
                <ForestFireCard key={d.id} record={d} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((d, i) => (
                <ForestFireRow key={d.id} record={d} index={i} />
              ))}
            </div>
          )}

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
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Hazard Modules</h2>
            <p className="text-slate-400">Explore connected hazard intelligence domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'GLOFs',            href: '/hazard-intelligence/glofs',         desc: 'Glacial lake outburst flood risk', icon: ExternalLink, color: 'from-teal-500 to-emerald-600' },
              { label: 'Floods',           href: '/hazard-intelligence/floods',        desc: 'Riverine & flash flood monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Landslides',       href: '/hazard-intelligence/landslides',    desc: 'Slope stability & mass movement', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
              { label: 'Dashboards',       href: '/hazard-intelligence/dashboards',    desc: 'Multi-hazard risk analytics', icon: ExternalLink, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-slate-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
