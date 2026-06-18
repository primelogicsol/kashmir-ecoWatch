'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import * as Icons from 'lucide-react';
import {
  MapPin, Search, ArrowRight, Activity, Eye,
  ChevronRight, X, SlidersHorizontal, Database,
  Grid3X3, List, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WaterEntity } from '@/data/water-systems';
import { GEOGRAPHY, getScopeForUnit, getUnitsForScope, Scope, getAvailableDistrictsForScope } from '@/data/geography';
import { useGlobalFilter } from '@/context/GlobalFilterContext';

// ─── KPI tile definition ──────────────────────────────────────────────────────
export interface WaterKPI {
  label: string;
  value: string | number;
  /** lucide icon name, e.g. 'Droplet' */
  icon: string;
  /** optional colour override for the value text, e.g. 'text-emerald-400' */
  color?: string;
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface ListingPageProps {
  title: string;
  description: string;
  /** lucide icon name used in hero + cards */
  icon: keyof typeof import('lucide-react');
  /** tailwind gradient classes, e.g. 'from-blue-500 to-cyan-600' */
  color: string;
  entities: WaterEntity[];
  entityType: string;
  /** KPI tiles shown in the strip below the hero */
  kpis?: WaterKPI[];
  filters: {
    districts?: string[];
    categories?: string[];
    qualityStatuses?: string[];
  };
  getEntitySlug: (entity: WaterEntity) => string;
  getCategory: (entity: WaterEntity) => string;
  getSecondaryMetric?: (entity: WaterEntity) => { label: string; value: string } | null;
  renderAdditionalInfo?: (entity: WaterEntity) => React.ReactNode;
  renderAdditionalContent?: () => React.ReactNode;
  hideDistrictFilter?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const QUALITY_CHIP: Record<string, string> = {
  excellent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  good:      'text-green-400  bg-green-500/10  border-green-500/30',
  moderate:  'text-amber-400  bg-amber-500/10  border-amber-500/30',
  poor:      'text-orange-400 bg-orange-500/10 border-orange-500/30',
  critical:  'text-red-400    bg-red-500/10    border-red-500/30',
  'data-deficient': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
};

const VERIFICATION_LABEL: Record<string, string> = {
  'verified': 'Verified',
  'reviewed': 'Reviewed',
  'community': 'Community Verified',
  'under-review': 'Under Review',
};

const VERIFICATION_CHIP: Record<string, string> = {
  'verified': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'reviewed': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  'community': 'text-slate-400 bg-slate-500/10 border-slate-500/30',
  'under-review': 'text-amber-400 bg-amber-500/10 border-amber-500/30',
};

function qualityVariant(s: string): 'success' | 'warning' | 'danger' | 'default' | 'info' {
  if (s === 'excellent' || s === 'good') return 'success';
  if (s === 'moderate'  || s === 'poor') return 'warning';
  if (s === 'critical') return 'danger';
  if (s === 'data-deficient') return 'info';
  return 'default';
}

function verificationVariant(s: string): 'success' | 'warning' | 'info' | 'secondary' | 'default' {
  if (s === 'verified') return 'success';
  if (s === 'reviewed') return 'info';
  if (s === 'under-review') return 'warning';
  if (s === 'community') return 'secondary';
  return 'default';
}

function getScopeForRegion(region: string): string {
  if (region === 'Kashmir Core') return 'Kashmir Core';
  if (region === 'Jammu' || region === 'Ladakh') return 'Trans-Divisional';
  if (region === 'AJK' || region === 'Gilgit-Baltistan') return 'Transboundary / Extended';
  return 'All';
}

// ─── Component ───────────────────────────────────────────────────────────────
export function WaterEntityListingPage({
  title,
  description,
  icon: iconName,
  color,
  entities,
  entityType,
  kpis = [],
  filters,
  getEntitySlug,
  getCategory,
  getSecondaryMetric,
  renderAdditionalInfo,
  renderAdditionalContent,
  hideDistrictFilter = false,
}: ListingPageProps) {
  const LucideIcon = (Icons as unknown as Record<string, React.ElementType>)[iconName] || Icons.Droplet;
  const router = useRouter();

  // ── Global filter ──
  const {
    filter: globalFilter,
    setScope: setGlobalScope,
    setDistrict: setGlobalDistrict,
    resetFilter: resetGlobalFilter,
  } = useGlobalFilter();

  // ── Filter state ──────────────────────────────────────────────────────────
  // scope/district/search are seeded from and synced with globalFilter.
  // Water-specific filters (category, quality, watershed, verification) remain local.
  const [searchTerm,           setSearchTerm]           = useState(globalFilter.searchQuery);
  const [selectedScope,        setSelectedScope]        = useState(globalFilter.scope === 'All' ? 'all' : globalFilter.scope as string);
  const [selectedDistrict,     setSelectedDistrict]     = useState(globalFilter.district === 'All' ? 'all' : globalFilter.district);
  const [selectedCategory,     setSelectedCategory]     = useState('all');
  const [selectedQuality,      setSelectedQuality]      = useState('all');
  const [selectedWatershed,    setSelectedWatershed]    = useState('all');
  const [selectedVerification, setSelectedVerification] = useState('all');
  const [viewMode,             setViewMode]             = useState<'grid' | 'list'>('grid');
  const [currentPage,          setCurrentPage]          = useState(1);
  const ITEMS = 9;

  // Sync global filter into local state whenever it changes
  useEffect(() => {
    setSearchTerm(globalFilter.searchQuery);
    setSelectedScope(globalFilter.scope === 'All' ? 'all' : globalFilter.scope as string);
    setSelectedDistrict(globalFilter.district === 'All' ? 'all' : globalFilter.district);
    setCurrentPage(1);
  }, [globalFilter.scope, globalFilter.district, globalFilter.searchQuery]);

  useEffect(() => { setSelectedDistrict('all'); setCurrentPage(1); }, [selectedScope]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDistrict, selectedCategory, selectedQuality, selectedWatershed, selectedVerification]);

  const availableDistricts = useMemo(() =>
    getAvailableDistrictsForScope(entities, selectedScope === 'all' ? 'All' : selectedScope as Scope),
    [selectedScope, entities]
  );

  const availableWatersheds = useMemo(() => {
    const set = new Set<string>();
    entities.forEach(e => { if (e.watershed) set.add(e.watershed); });
    return Array.from(set).sort();
  }, [entities]);

  const availableVerifications = useMemo(() => {
    const set = new Set<string>();
    entities.forEach(e => { if (e.verificationStatus) set.add(e.verificationStatus); });
    return Array.from(set).sort();
  }, [entities]);

  // Scope-only count — drives the KPI pill inside ModuleScopeRow
  const scopeCount = useMemo(() => {
    if (globalFilter.scope === 'All') return 0;
    return entities.filter(e => {
      const sc = e.region ? getScopeForRegion(e.region) : getScopeForUnit(e.district);
      return sc === globalFilter.scope;
    }).length;
  }, [entities, globalFilter.scope]);

  const activeCount = [
    selectedScope !== 'all' && selectedScope !== 'All Scopes',
    selectedDistrict !== 'all' && selectedDistrict !== 'All Districts',
    selectedCategory !== 'all' && selectedCategory !== 'All Categories',
    selectedQuality !== 'all' && selectedQuality !== 'All Quality Levels',
    selectedWatershed !== 'all' && selectedWatershed !== 'All Watersheds',
    selectedVerification !== 'all' && selectedVerification !== 'All Verification Statuses',
    searchTerm.trim() !== '',
  ].filter(Boolean).length;

  function reset() {
    setSearchTerm('');
    setSelectedScope('all');
    setSelectedDistrict('all');
    setSelectedCategory('all');
    setSelectedQuality('all');
    setSelectedWatershed('all');
    setSelectedVerification('all');
    setCurrentPage(1);
    // two-way: also reset global context so other modules reflect the clear
    resetGlobalFilter();
  }

  // Count of active water-specific filters (drives combined Clear count in bar)
  const extraActiveCount = [
    selectedCategory     !== 'all',
    selectedQuality      !== 'all',
    selectedWatershed    !== 'all',
    selectedVerification !== 'all',
  ].filter(Boolean).length;

  const filtered = useMemo(() => entities.filter(e => {
    const q = searchTerm.toLowerCase();
    const matchSearch   = e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || (e.district||'').toLowerCase().includes(q);
    const scopeToCheck  = e.region ? getScopeForRegion(e.region) : getScopeForUnit(e.district);
    const matchScope    = selectedScope === 'all' || selectedScope === 'All Scopes' || scopeToCheck === selectedScope;
    const matchDistrict = selectedDistrict === 'all' || selectedDistrict === 'All Districts' || 
      (e.district || '').split('/').map(d => d.trim()).includes(selectedDistrict);
    const matchCategory = selectedCategory === 'all' || selectedCategory === 'All Categories' || getCategory(e) === selectedCategory;
    const matchQuality  = !filters.qualityStatuses || selectedQuality === 'all' || selectedQuality === 'All Quality Levels' || e.waterQuality?.status === selectedQuality;
    const matchWatershed = selectedWatershed === 'all' || e.watershed === selectedWatershed;
    const matchVerification = selectedVerification === 'all' || e.verificationStatus === selectedVerification;
    return matchSearch && matchScope && matchDistrict && matchCategory && matchQuality && matchWatershed && matchVerification;
  }), [entities, searchTerm, selectedScope, selectedDistrict, selectedCategory, selectedQuality, selectedWatershed, selectedVerification, filters.qualityStatuses, getCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS, currentPage * ITEMS);

  // select dropdown class — shared
  const selectCls = 'px-3 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all appearance-none cursor-pointer';

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <Heading
        label="Water Systems"
        icon={<LucideIcon className="w-6 h-6 text-emerald-400" />}
        title={(() => {
          // Rule: Line 1 = "[Module Name] Across"
          //       Line 2 = "Western Himalayan"  (accent gradient)
          const acrossIdx = title.indexOf(' Across');
          const line1 = acrossIdx !== -1 ? title.slice(0, acrossIdx + ' Across'.length) : title.split(' ').slice(0, -1).join(' ');
          const line2 = acrossIdx !== -1 ? title.slice(acrossIdx + ' Across'.length).trim() : title.split(' ').slice(-1)[0];
          return (
            <>
              <span className="block leading-[1.12] overflow-visible whitespace-nowrap">{line1}</span>
              <span className={`block leading-[1.12] pb-2 overflow-visible whitespace-nowrap bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                {line2}
              </span>
            </>
          );
        })()}
        subtitle={description}
        breadcrumbs={[
          { label: 'Water Systems', href: '/water-systems' },
          { label: title },
        ]}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              size="lg"
              className={`bg-gradient-to-r ${color} border-0 text-white`}
              icon={<Activity className="w-5 h-5" />}
            >
              Explore {entityType}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white"
              icon={<Database className="w-5 h-5" />}
              onClick={() => router.push('/water-systems/dashboards/water-intelligence')}
            >
              Intelligence Dashboard
            </Button>
          </div>
        }
      />

      {/* ── KPI Strip ──────────────────────────────────────────────────────────────── */}
      {kpis.length > 0 && <ModuleKpiStrip kpis={kpis} />}

      {/* ── Global Filter Bar with inline page-specific filters ──────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              {filters.categories && filters.categories.length > 0 && (
                <FilterSelect
                  value={selectedCategory}
                  onChange={v => { setSelectedCategory(v); setCurrentPage(1); }}
                  placeholder="All Categories"
                  options={(filters.categories).map(c => ({ value: c, label: c }))}
                />
              )}
              {filters.qualityStatuses && (
                <FilterSelect
                  value={selectedQuality}
                  onChange={v => { setSelectedQuality(v); setCurrentPage(1); }}
                  placeholder="All Quality"
                  options={filters.qualityStatuses.map(s => ({
                    value: s,
                    label: s === 'data-deficient' ? 'Data Deficient' : s.charAt(0).toUpperCase() + s.slice(1),
                  }))}
                />
              )}
              {availableWatersheds.length > 0 && (
                <FilterSelect
                  value={selectedWatershed}
                  onChange={v => { setSelectedWatershed(v); setCurrentPage(1); }}
                  placeholder="All Watersheds"
                  options={availableWatersheds.map(w => ({ value: w, label: w }))}
                />
              )}
              {availableVerifications.length > 0 && (
                <FilterSelect
                  value={selectedVerification}
                  onChange={v => { setSelectedVerification(v); setCurrentPage(1); }}
                  placeholder="All Verification"
                  options={availableVerifications.map(v => ({
                    value: v,
                    label: VERIFICATION_LABEL[v] || v,
                  }))}
                />
              )}
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setSelectedCategory('all');
            setSelectedQuality('all');
            setSelectedWatershed('all');
            setSelectedVerification('all');
            setCurrentPage(1);
          }}
        />
      </div>

      {/* ── Scope tabs + results action row ────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filtered.length}
        totalCount={entities.length}
        entityLabel={entityType.toLowerCase()}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP(entityType)}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── ENTITY GRID ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-10 flex-1 pt-6">
        <AnimatePresence mode="popLayout">
          {paginated.length > 0 ? (
            <motion.div
              key="grid"
              layout
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
            >
              {paginated.map((entity, idx) => (
                <motion.div
                  key={entity.id} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.04 }}
                >
                  <Card
                    className="group border border-white/5 bg-slate-900/50 h-full flex flex-col card-intelligence cursor-pointer hover:border-white/15 hover:bg-slate-900/70 transition-all duration-200"
                    padding="none"
                    onClick={() => router.push(getEntitySlug(entity))}
                  >
                    <div className="p-5 sm:p-6 flex flex-col h-full gap-y-3">

                      {/* Top: badge row + icon */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-2 items-center min-w-0">
                          <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                            {getCategory(entity)}
                          </Badge>
                          {entity.waterQuality && (
                            <Badge variant={qualityVariant(entity.waterQuality.status)} size="sm" className="text-xs">
                              {entity.waterQuality.status === 'data-deficient' ? 'Data Deficient' : entity.waterQuality.status.charAt(0).toUpperCase() + entity.waterQuality.status.slice(1)}
                            </Badge>
                          )}
                          {entity.verificationStatus && (
                            <Badge variant={verificationVariant(entity.verificationStatus)} size="sm" className="text-xs">
                              {VERIFICATION_LABEL[entity.verificationStatus] || entity.verificationStatus}
                            </Badge>
                          )}
                        </div>
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                          <LucideIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-blue-400 transition-colors">
                        {entity.name}
                      </h3>

                      {/* District + Scope */}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate max-w-[120px]">{entity.district} District</span>
                        {getScopeForUnit(entity.district) && (
                          <><span>·</span><span className="text-slate-600 truncate max-w-[120px]">{getScopeForUnit(entity.district)}</span></>
                        )}
                        {entity.watershed && (
                          <><span>·</span><span className="text-blue-400/80 truncate max-w-[150px]" title={entity.watershed}>{entity.watershed}</span></>
                        )}
                      </div>

                      {/* Metrics row */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                        {entity.area && (
                          <div className="flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5" />
                            <span>{entity.area} km²</span>
                          </div>
                        )}
                        {entity.elevation && (
                          <span>{entity.elevation}m elev.</span>
                        )}
                        {getSecondaryMetric?.(entity) && (() => {
                          const m = getSecondaryMetric!(entity)!;
                          return <span>{m.label}: {m.value}</span>;
                        })()}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed min-h-[2.75rem]">
                        {entity.description}
                      </p>

                      {/* Threat chips */}
                      <div className="h-[52px] flex flex-wrap gap-1.5 overflow-hidden content-start">
                        {entity.threats?.length ? (
                          <>
                            {entity.threats.slice(0, 3).map((t, ti) => (
                              <span key={ti} className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-300 max-w-[120px] truncate">
                                {t}
                              </span>
                            ))}
                            {entity.threats.length > 3 && (
                              <span className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-400">
                                +{entity.threats.length - 3}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-600 italic mt-1">No active threats recorded</span>
                        )}
                      </div>

                      {renderAdditionalInfo?.(entity)}

                      {/* CTA */}
                      <Button
                        className={`w-full py-2 text-sm rounded-lg mt-auto bg-gradient-to-r ${color} border-0 text-white`}
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
              <LucideIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No {entityType.toLowerCase()} found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              <button onClick={reset} className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors">Clear all filters</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-sm border border-white/10 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const page = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i;
              return (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === page ? 'bg-blue-600 text-white border border-blue-500' : 'border border-white/10 text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                  {page}
                </button>
              );
            })}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-sm border border-white/10 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              Next
            </button>
            <span className="text-xs text-slate-500 ml-2">Page {currentPage} of {totalPages}</span>
          </div>
        )}
      </div>

      {renderAdditionalContent?.()}
    </main>
  );
}
