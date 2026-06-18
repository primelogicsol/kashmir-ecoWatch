'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, ChevronRight, AlertTriangle, Droplets, MapPin, 
  Shield, Activity, CheckCircle, HelpCircle, Search, 
  ChevronLeft, Building2, Truck, Leaf as LeafIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { bioWasteData, BioWasteWardRecord, Scope } from '@/data/bio-waste';

// ─── Colour maps ──────────────────────────────────────────────────────────────

const RISK_COLOR: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/25',
  High:     'text-orange-400 bg-orange-500/10 border-orange-500/25',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Low:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  Unknown:  'text-slate-500 bg-slate-500/10 border-slate-500/25',
};

const EVIDENCE_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Verified Reported Value': { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Derived Value':           { color: 'text-blue-300',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    icon: Activity    },
  'Planning Baseline':       { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   icon: Shield      },
};

// ─── Bio-Waste Card ──────────────────────────────────────────────────────────

function BioWasteCard({ record, index }: { record: BioWasteWardRecord; index: number }) {
  const ev = EVIDENCE_CONFIG[record.evidence_tier] || EVIDENCE_CONFIG['Planning Baseline'];
  const EvIcon = ev.icon;
  const maxRisk = record.risk_level;
  const isModeled = record.evidence_tier === 'Planning Baseline';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className={`glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group ${isModeled ? 'hover:border-amber-500/30' : 'hover:border-white/20'}`}>
        
        {/* Subtle accent gradient behind header based on risk */}
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-5 pointer-events-none ${
          maxRisk === 'Critical' ? 'from-red-500 to-transparent' : maxRisk === 'High' ? 'from-orange-500 to-transparent' : 'from-transparent to-transparent'
        }`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">{record.ward_sector_name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {record.city_region}
            </p>
          </div>
          <Badge variant={maxRisk === 'Critical' ? 'critical' : maxRisk === 'High' ? 'danger' : maxRisk === 'Moderate' ? 'warning' : 'success'} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {maxRisk} Risk
          </Badge>
        </div>

        {/* Evidence label */}
        <div className={`flex flex-col gap-1 px-2.5 py-1.5 rounded-lg border text-[10px] w-full ${ev.bg} ${ev.border}`}>
          <div className={`flex items-center gap-1.5 font-bold ${ev.color}`}>
            <EvIcon className="w-3 h-3 flex-shrink-0" />
            <span>{record.evidence_tier}</span>
          </div>
          {isModeled && (
            <span className="text-[9px] text-slate-400 uppercase tracking-wide leading-tight">Ward-Level Intelligence</span>
          )}
        </div>

        {/* Key Metrics */}
        <div className="flex flex-col gap-1.5 text-xs mt-1 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Estimated Daily Load</span>
            <span className={`font-bold truncate ml-2 text-right ${isModeled ? 'text-amber-400' : 'text-emerald-400'}`}>{record.bio_waste_tpd}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Ward Type</span>
            <span className="text-slate-300 font-medium truncate">{record.ward_category}</span>
          </div>
        </div>

        {/* Sources & Status Grid */}
        <div className="grid grid-cols-1 gap-1.5 text-[10px] mt-1">
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Primary Source</span>
            <span className="text-white font-medium">{record.primary_source || 'Unknown'}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Secondary Source</span>
            <span className="text-slate-300">{record.secondary_source || 'Unknown'}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Seasonal Surge</span>
            <span className={record.seasonal_surge === 'High' || record.seasonal_surge === 'Critical' ? 'text-amber-400 font-medium' : 'text-emerald-400 font-medium'}>{record.seasonal_surge || 'Unknown'}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Collection</div>
            <div className={`text-[10px] font-medium leading-tight ${record.collection_status === 'Mapped' ? 'text-emerald-400' : record.collection_status === 'Partial' ? 'text-amber-400' : 'text-red-400'}`}>
              {record.collection_status || 'Unknown'}
            </div>
          </div>
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Treatment</div>
            <div className="text-[10px] font-medium text-slate-300 leading-tight">
              {record.treatment_linkage || 'Unknown'}
            </div>
          </div>
        </div>

        {/* Pathway */}
        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[10px] text-slate-400">
          <div className="flex items-start gap-1.5">
            <Droplets className="w-3 h-3 flex-shrink-0 mt-0.5 text-blue-400" />
            <span className="line-clamp-2 leading-snug"><strong className="text-slate-300 font-medium">Waterbody Pathway:</strong> {record.waterbody_pathway}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function BioWasteRow({ record, index }: { record: BioWasteWardRecord; index: number }) {
  const ev = EVIDENCE_CONFIG[record.evidence_tier] || EVIDENCE_CONFIG['Planning Baseline'];
  const EvIcon = ev.icon;
  const maxRisk = record.risk_level;
  const isModeled = record.evidence_tier === 'Planning Baseline';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">
          {/* District + Scope */}
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.ward_sector_name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><Building2 className="w-3 h-3" /> {record.city_region}</div>
          </div>

          {/* Load */}
          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500">Daily Load</div>
            <div className={`text-xs font-bold truncate ${isModeled ? 'text-amber-400' : 'text-emerald-400'}`}>{record.bio_waste_tpd}</div>
          </div>

          {/* Source */}
          <div className="w-32 hidden xl:block">
            <div className="text-[10px] text-slate-500">Ward Type</div>
            <div className="text-xs text-slate-300 truncate" title={record.ward_category}>{record.ward_category}</div>
          </div>

          {/* Collection Status */}
          <div className="w-32 hidden lg:block">
            <div className="text-[10px] text-slate-500">Collection</div>
            <div className="text-xs text-slate-300 truncate">{record.collection_status || 'Unknown'}</div>
          </div>

          {/* Risk Level */}
          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={maxRisk === 'Critical' ? 'critical' : maxRisk === 'High' ? 'danger' : maxRisk === 'Moderate' ? 'warning' : 'success'} size="sm" className="text-[10px] shadow-sm">
              {maxRisk}
            </Badge>
          </div>

          {/* Evidence */}
          <div className="w-48 hidden sm:block">
            <div className={`flex flex-col gap-0.5 px-2 py-1 rounded-lg border w-max ${ev.bg} ${ev.border}`}>
              <div className={`flex items-center gap-1.5 text-[10px] font-bold ${ev.color}`}>
                <EvIcon className="w-3 h-3 flex-shrink-0" />
                <span>{record.evidence_tier}</span>
              </div>
              {isModeled && <span className="text-[8px] text-slate-400 uppercase tracking-widest pl-4">Ward Intelligence</span>}
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

export default function BioWastePage() {
  const router = useRouter();
  const { filter, setScope, setDistrict } = useGlobalFilter();

  const [cityFilter, setCityFilter] = useState('all');
  const [collectionFilter, setCollectionFilter] = useState('all');
  const [treatmentFilter, setTreatmentFilter] = useState('all');
  const [surgeFilter, setSurgeFilter] = useState('all');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Derive filter options dynamically from data
  const cities = useMemo(() => Array.from(new Set(bioWasteData.map(d => d.city_region))).sort(), []);
  const treatmentLinkages = useMemo(() => Array.from(new Set(bioWasteData.map(d => d.treatment_linkage).filter(Boolean) as string[])).sort(), []);
  const surges = ['Low', 'Medium', 'High', 'Critical'];
  const collections = ['Mapped', 'Partial', 'Needs Route Data'];

  const filteredData = useMemo(() => {
    return bioWasteData.filter(d => {
      const matchSearch = filter.searchQuery === '' || 
        d.ward_sector_name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.city_region.toLowerCase().includes(filter.searchQuery.toLowerCase());
      
      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;
      
      const matchCity = cityFilter === 'all' || d.city_region === cityFilter;
      const matchCollection = collectionFilter === 'all' || d.collection_status === collectionFilter;
      const matchTreatment = treatmentFilter === 'all' || d.treatment_linkage === treatmentFilter;
      const matchSurge = surgeFilter === 'all' || d.seasonal_surge === surgeFilter;

      return matchSearch && matchScope && matchDistrict && matchCity && matchCollection && matchTreatment && matchSurge;
    });
  }, [filter, cityFilter, collectionFilter, treatmentFilter, surgeFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount = [cityFilter, collectionFilter, treatmentFilter, surgeFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return bioWasteData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope]);

  // Aggregate stats
  const verifiedAnchors = bioWasteData.filter(d => d.evidence_tier === 'Verified Reported Value').length;
  const planningBaselines = bioWasteData.filter(d => d.evidence_tier === 'Planning Baseline').length;
  const derivedValues = bioWasteData.filter(d => d.evidence_tier === 'Derived Value').length;

  const mappedCollectionCount = bioWasteData.filter(d => d.collection_status === 'Mapped').length;
  const highSurgeCount = bioWasteData.filter(d => ['High', 'Critical'].includes(d.seasonal_surge)).length;
  const totalLoad = Math.round(bioWasteData.reduce((acc, curr) => acc + (parseFloat(curr.bio_waste_tpd.replace(/[^\d.]/g, '')) || 0), 0));

  const metrics = [
    { label: 'Monitored Zones', value: bioWasteData.length, icon: 'MapPin' },
    { label: 'Verified Anchors', value: verifiedAnchors, icon: 'CheckCircle' },
    { label: 'Planning Baselines', value: planningBaselines, icon: 'Shield' },
    { label: 'Derived Est.', value: derivedValues, icon: 'Activity' },
    { label: 'Mapped Collection', value: mappedCollectionCount, icon: 'Map' },
    { label: 'High Surge Risks', value: highSurgeCount, icon: 'TrendingUp' },
    { label: 'Est. Total Load', value: `${totalLoad.toLocaleString()} TPD`, icon: 'Database' },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Environmental Monitoring"
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Bio-Waste Management</span>
          </>}
        subtitle="Monitoring organic waste accumulation via verified city anchors and highly granular ward-level intelligence across Kashmir's ecological and residential interfaces."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        breadcrumbs={[
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Bio-Waste' },
        ]}
      />

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-emerald-500" />

      {/* ── FILTER BAR ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={cityFilter} onChange={setCityFilter} placeholder="City / Region" options={cities.map(c => ({ value: c, label: c }))} />
              <FilterSelect value={surgeFilter} onChange={setSurgeFilter} placeholder="Seasonal Surge" options={surges.map(s => ({ value: s, label: s }))} />
              <FilterSelect value={collectionFilter} onChange={setCollectionFilter} placeholder="Collection Status" options={collections.map(w => ({ value: w, label: w }))} />
              <FilterSelect value={treatmentFilter} onChange={setTreatmentFilter} placeholder="Treatment Linkage" options={treatmentLinkages.map(t => ({ value: t, label: t }))} />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setCityFilter('all');
            setSurgeFilter('all');
            setCollectionFilter('all');
            setTreatmentFilter('all');
          }}
        />
      </div>

      {/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={bioWasteData.length}
        entityLabel="wards & anchors"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Wards & Sectors')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No data found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record, i) => (
                  <BioWasteCard key={record.id} record={record} index={i} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record, i) => (
                  <BioWasteRow key={record.id} record={record} index={i} />
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
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm' 
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

    </main>
  );
}
