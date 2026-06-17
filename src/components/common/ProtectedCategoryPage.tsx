'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import * as Icons from 'lucide-react';
import {
  MapPin, Activity, ArrowRight, Search,
  Grid3X3, List, Map, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { GlobalFilterBar } from '@/components/common/GlobalFilterBar';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { GEOGRAPHY, getScopeForUnit, Scope } from '@/data/geography';
import { useGlobalFilter } from '@/context/GlobalFilterContext';

interface ProtectedArea {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  area: number;
  district: string;
  established: number;
  ecosystems: string[];
  keySpecies: string[];
}

interface ProtectedCategoryPageProps {
  title: string | React.ReactNode;
  subtitle: string;
  icon: keyof typeof import('lucide-react');
  color: string;
  areas: ProtectedArea[];
  metrics: Array<{ label: string; value: number | string; icon: keyof typeof import('lucide-react') }>;
  sourceData?: {
    title: string;
    count: number;
    totalArea: number;
  };
}

export function ProtectedCategoryPage({
  title,
  subtitle,
  icon: iconName,
  color,
  areas,
  metrics,
  sourceData,
}: ProtectedCategoryPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.MapPin;
  const router = useRouter();

  // ── Global filter (shared across all modules) ──
  const {
    filter: globalFilter,
    setScope: setGlobalScope,
    setDistrict: setGlobalDistrict,
    setSearchQuery: setGlobalSearchQuery,
    resetFilter: resetGlobalFilter,
  } = useGlobalFilter();

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 9;

  // Derive available districts from the actual data for the current scope (data-driven, Bug #4 fix)
  const availableDistricts = React.useMemo(() => {
    const scopeAreas = globalFilter.scope === 'All'
      ? areas
      : areas.filter(a => {
          const derived = getScopeForUnit(a.district);
          const resolved = (derived === 'All' && (a as any).scope) ? (a as any).scope : derived;
          return resolved === globalFilter.scope;
        });
    const parts = new Set<string>();
    scopeAreas.forEach(a =>
      a.district.split('/').forEach(d => parts.add(d.trim()))
    );
    return Array.from(parts).sort();
  }, [areas, globalFilter.scope]);

  const availableScopes = [...GEOGRAPHY.scopes];

  const filteredAreas = React.useMemo(() => {
    const query = globalFilter.searchQuery.toLowerCase().trim();
    const selectedEcologicalScope = globalFilter.scope;
    const selectedDistrict = globalFilter.district;

    return areas.filter(area => {
      const matchesSearch = !query ||
        area.name.toLowerCase().includes(query) ||
        area.district.toLowerCase().includes(query) ||
        area.description.toLowerCase().includes(query) ||
        (area as any).flagshipSpecies?.toLowerCase().includes(query);

      // Bug #2 & #6 fix: prefer area.scope when getScopeForUnit returns 'All' (unrecognised district)
      const derived = getScopeForUnit(area.district);
      const areaScope = (derived === 'All' && (area as any).scope) ? (area as any).scope : derived;
      const matchesScope = selectedEcologicalScope === 'All' || areaScope === selectedEcologicalScope;

      // Bug #5 fix: split slash-delimited district strings before comparing
      const matchesDistrict = selectedDistrict === 'All' ||
        area.district.split('/').map(d => d.trim()).includes(selectedDistrict);

      return matchesSearch && matchesDistrict && matchesScope;
    });
  }, [areas, globalFilter]);

  // Count of areas belonging to the active scope only (ignores district & search)
  // — used for the Scope KPI pill which describes the scope, not the filter result
  const scopeCount = React.useMemo(() => {
    if (globalFilter.scope === 'All') return 0;
    return areas.filter(area => {
      const derived = getScopeForUnit(area.district);
      const areaScope = (derived === 'All' && (area as any).scope) ? (area as any).scope : derived;
      return areaScope === globalFilter.scope;
    }).length;
  }, [areas, globalFilter.scope]);

  // Label config per scope
  const SCOPE_KPI: Record<string, { label: string; color: string; iconColor: string; bg: string; border: string }> = {
    'Kashmir Core': {
      label: 'Kashmir Core Protected Areas',
      color: 'text-emerald-300',
      iconColor: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/25',
    },
    'Trans-Divisional': {
      label: 'Trans-Divisional Protected Areas',
      color: 'text-blue-300',
      iconColor: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/25',
    },
    'Transboundary / Extended': {
      label: 'Transboundary Protected Areas',
      color: 'text-amber-300',
      iconColor: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/25',
    },
  };


  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={title}
        subtitle={subtitle}
        icon={<Icon className={`w-6 h-6 ${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}`} />}
        label="Protected Network"
        gridOverlay
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <a href="/protected-network/atlas">
              <Button size="lg" className={`bg-gradient-to-r ${color}`} icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="/protected-network/atlas">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Distribution Map
              </Button>
            </a>
          </>
        }
      />

      {/* ── KPI Strip ─────────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} />

      {/* ── Global Filter Bar ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar />
      </div>

      {/* ── Scope tabs + results action row ────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredAreas.length}
        totalCount={areas.length}
        entityLabel="protected areas"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Protected Areas')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* Content — pinned to z-0 so it never overlaps filter bar dropdown */}
      <div className="container mx-auto px-6 py-8 space-y-6 relative z-0">

        {/* Protected Areas Grid/List */}
        {filteredAreas.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredAreas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((area, index) => (
              <motion.a
                key={area.id}
                href={`/protected-network/${area.category === 'national_park' ? 'national-parks' : area.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' : area.category === 'wetland_reserve' ? 'wetland-reserves' : area.category === 'conservation_reserve' ? 'conservation-reserves' : 'bird-and-habitat-areas'}/${area.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
              >
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="relative h-40 bg-slate-900/50">

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge variant="info" size="sm" className="capitalize">
                          {area.category.replace('_', ' ')}
                        </Badge>
                        {(area as any).scope && (
                          <Badge variant="default" size="sm">{(area as any).scope}</Badge>
                        )}
                        {(area as any).legalStatus && (area as any).legalStatus !== 'Verified' && (
                          <Badge variant="warning" size="sm">{(area as any).legalStatus}</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {area.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {area.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Area</div>
                        <div className="text-white font-semibold">{area.area > 0 ? `${area.area} km²` : 'TBC'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">District</div>
                        <div className="text-white font-semibold">{area.district}</div>
                      </div>
                      {(area as any).flagshipSpecies && (
                        <div>
                          <div className="text-xs text-slate-500 uppercase">Flagship</div>
                          <div className="text-white font-semibold text-sm">{(area as any).flagshipSpecies}</div>
                        </div>
                      )}
                    </div>
                    {(area as any).altitudeRange && (
                      <div className="mt-2 text-xs text-slate-400">
                        <span className="text-slate-500 uppercase text-[10px]">Altitude: </span>{(area as any).altitudeRange}
                      </div>
                    )}
                    {(area as any).dataStatus && (
                      <div className="text-[10px] text-slate-500 italic mt-1">{(area as any).dataStatus}</div>
                    )}
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-end">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}

            {filteredAreas.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12 w-full col-span-full">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.ceil(filteredAreas.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredAreas.length / itemsPerPage);
                      
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
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredAreas.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredAreas.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAreas.length)} of {filteredAreas.length} records
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No protected areas found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your filters</p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                resetGlobalFilter();
                setCurrentPage(1);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Source Information */}
      {sourceData && (
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-light border-white/10 p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-emerald-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Source Data</h3>
                  <p className="text-slate-400 text-sm mb-3">{sourceData.title}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Total Records:</span>{' '}
                      <span className="text-white font-medium">{sourceData.count}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Area:</span>{' '}
                      <span className="text-white font-medium">{sourceData.totalArea.toFixed(2)} kmÂ²</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      
    </main>
  );
}
