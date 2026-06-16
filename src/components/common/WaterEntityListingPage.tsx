'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import * as Icons from 'lucide-react';
import {
  MapPin, Search, ArrowRight, Activity, Eye,
  ChevronRight, X, SlidersHorizontal, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WaterEntity } from '@/data/water-systems';
import { GEOGRAPHY, getScopeForUnit, getUnitsForScope, Scope } from '@/data/geography';

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
    categories: string[];
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

function qualityVariant(s: string): 'success' | 'warning' | 'danger' | 'default' | 'info' {
  if (s === 'excellent' || s === 'good') return 'success';
  if (s === 'moderate'  || s === 'poor') return 'warning';
  if (s === 'critical') return 'danger';
  if (s === 'data-deficient') return 'info';
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

  // ── Filter state ──────────────────────────────────────────────────────────
  const [searchTerm,       setSearchTerm]       = useState('');
  const [selectedScope,    setSelectedScope]    = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality,  setSelectedQuality]  = useState('all');
  const [currentPage,      setCurrentPage]      = useState(1);
  const ITEMS = 9;

  useEffect(() => { setSelectedDistrict('all'); setCurrentPage(1); }, [selectedScope]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedDistrict, selectedCategory, selectedQuality]);

  const availableDistricts = useMemo(() =>
    selectedScope === 'all'
      ? [...new Set(entities.map(e => e.district))].filter(Boolean).sort()
      : getUnitsForScope(selectedScope as Scope).sort(),
    [selectedScope, entities]
  );

  const scopes = GEOGRAPHY.scopes.filter(s => s !== 'All');

  const activeCount = [
    selectedScope !== 'all', selectedDistrict !== 'all',
    selectedCategory !== 'all', selectedQuality !== 'all',
    searchTerm.trim() !== '',
  ].filter(Boolean).length;

  function reset() {
    setSearchTerm(''); setSelectedScope('all'); setSelectedDistrict('all');
    setSelectedCategory('all'); setSelectedQuality('all'); setCurrentPage(1);
  }

  const filtered = useMemo(() => entities.filter(e => {
    const q = searchTerm.toLowerCase();
    const matchSearch   = e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || (e.district||'').toLowerCase().includes(q);
    const scopeToCheck  = e.region ? getScopeForRegion(e.region) : getScopeForUnit(e.district);
    const matchScope    = selectedScope === 'all' || scopeToCheck === selectedScope;
    const matchDistrict = selectedDistrict === 'all' || e.district === selectedDistrict;
    const matchCategory = selectedCategory === 'all' || getCategory(e) === selectedCategory;
    const matchQuality  = !filters.qualityStatuses || selectedQuality === 'all' || e.waterQuality?.status === selectedQuality;
    return matchSearch && matchScope && matchDistrict && matchCategory && matchQuality;
  }), [entities, searchTerm, selectedScope, selectedDistrict, selectedCategory, selectedQuality, filters.qualityStatuses, getCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS, currentPage * ITEMS);

  // select dropdown class — shared
  const selectCls = 'px-3 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all appearance-none cursor-pointer';

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">

      {/* ── HERO (matches /water-systems Heading template) ──────────────── */}
      <Heading
        icon={<LucideIcon className="w-6 h-6 text-white/90" />}
        title={
          <>
            <span className="block">{title.split(' ').slice(0, -1).join(' ')}</span>
            <span className={`block bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {title.split(' ').slice(-1)[0]}
            </span>
          </>
        }
        subtitle={description}
        breadcrumbs={[
          { label: 'Water Systems', href: '/water-systems' },
          { label: title },
        ]}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className={`bg-gradient-to-r ${color} border-0 text-white`}
              icon={<Search className="w-4 h-4" />}
            >
              {entities.length} {entityType}
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              icon={<Database className="w-4 h-4" />}
              onClick={() => router.push('/water-systems/dashboards/water-intelligence')}
            >
              Intelligence Dashboard
            </Button>
          </div>
        }
      />

      {/* ── KPI STRIP (matches /water-systems metrics bar exactly) ───────── */}
      {kpis.length > 0 && (
        <div className="container mx-auto px-6 -mt-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-intense border-white/10" padding="none">
              <div className={`grid gap-0 divide-x divide-white/5`}
                style={{ gridTemplateColumns: `repeat(${Math.min(kpis.length, 8)}, minmax(0, 1fr))` }}
              >
                {kpis.slice(0, 8).map((kpi, i) => {
                  const KIcon = (Icons as unknown as Record<string, React.ElementType>)[kpi.icon] || Icons.Activity;
                  return (
                    <div key={i} className="flex flex-col items-center justify-center gap-1 py-5 px-3 text-center">
                      <KIcon className="w-5 h-5 text-slate-500 mb-1" />
                      <div className={`text-2xl font-bold tabular-nums ${kpi.color || 'text-white'}`}>
                        {kpi.value}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider leading-tight">
                        {kpi.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      {/* ── FILTER BAR ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-intense border-white/10 p-5" padding="none">
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${
              hideDistrictFilter
                ? (filters.qualityStatuses ? 'lg:grid-cols-4' : 'lg:grid-cols-3')
                : 'lg:grid-cols-5'
            } gap-3`}>

              {/* Search */}
              <div className="relative lg:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search ${entityType.toLowerCase()}…`}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 rounded-lg bg-slate-900/60 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Scope */}
              <select value={selectedScope} onChange={e => setSelectedScope(e.target.value)} className={selectCls}>
                <option value="all">All Scopes</option>
                {scopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              {/* District — cascades from scope */}
              {!hideDistrictFilter && (
                <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} className={selectCls}>
                  <option value="all">All Districts</option>
                  {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              )}

              {/* Category */}
              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className={selectCls}>
                <option value="all">All Categories</option>
                {filters.categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              {/* Water Quality (optional) */}
              {filters.qualityStatuses ? (
                <select value={selectedQuality} onChange={e => setSelectedQuality(e.target.value)} className={selectCls + ' capitalize'}>
                  <option value="all">All Quality Levels</option>
                  {filters.qualityStatuses.map(s => (
                    <option key={s} value={s} className="capitalize">
                      {s === 'data-deficient' ? 'Data Deficient' : s}
                    </option>
                  ))}
                </select>
              ) : (!hideDistrictFilter ? <div /> : null)}
            </div>

            {/* Bottom row: result count + active chips + clear */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-slate-400">
                  Showing <span className="text-white font-semibold">{filtered.length}</span> of{' '}
                  <span className="text-white font-semibold">{entities.length}</span> {entityType.toLowerCase()}
                </span>

                <AnimatePresence>
                  {selectedScope !== 'all' && (
                    <motion.button key="s" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                      onClick={() => setSelectedScope('all')}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 transition-all">
                      {selectedScope} <X className="w-3 h-3" />
                    </motion.button>
                  )}
                  {selectedDistrict !== 'all' && (
                    <motion.button key="d" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                      onClick={() => setSelectedDistrict('all')}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-all">
                      {selectedDistrict} <X className="w-3 h-3" />
                    </motion.button>
                  )}
                  {selectedCategory !== 'all' && (
                    <motion.button key="c" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                      onClick={() => setSelectedCategory('all')}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 transition-all">
                      {selectedCategory} <X className="w-3 h-3" />
                    </motion.button>
                  )}
                  {selectedQuality !== 'all' && (
                    <motion.button key="q" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                      onClick={() => setSelectedQuality('all')}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md border transition-all ${QUALITY_CHIP[selectedQuality] || 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                      {selectedQuality === 'data-deficient' ? 'Data Deficient' : selectedQuality.charAt(0).toUpperCase() + selectedQuality.slice(1)} <X className="w-3 h-3" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {activeCount > 0 && (
                  <button onClick={reset} className="text-xs text-slate-500 hover:text-white underline transition-colors">
                    Clear all
                  </button>
                )}
              </div>

              {activeCount > 0 && (
                <span className="text-xs text-slate-400 bg-slate-800 border border-slate-700 px-2 py-1 rounded-full">
                  <SlidersHorizontal className="w-3 h-3 inline mr-1" />
                  {activeCount} filter{activeCount > 1 ? 's' : ''} active
                </span>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── ENTITY GRID ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-10 flex-1">
        <AnimatePresence mode="popLayout">
          {paginated.length > 0 ? (
            <motion.div key="grid" layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <span>{entity.district} District</span>
                        {getScopeForUnit(entity.district) && (
                          <><span>·</span><span className="text-slate-600">{getScopeForUnit(entity.district)}</span></>
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
