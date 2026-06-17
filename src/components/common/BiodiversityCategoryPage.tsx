'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EntityDrawer } from '@/components/common/EntityDrawer';
import { BiodiversityCard } from '@/components/common/BiodiversityCard';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import {
  Leaf, Map, Activity, Eye, TrendingUp, ArrowRight, Search,
  Grid3X3, List, MapPin, Shield, ChevronLeft, ChevronRight, type LucideIcon
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiodiversitySpecies, biodiversityMetrics } from '@/data/biodiversity';
import { useRouter } from 'next/navigation';
import { GEOGRAPHY, getScopeForUnit, Scope } from '@/data/geography';
import { Heading } from '@/components/common/Heading';
import { useGlobalFilter } from '@/context/GlobalFilterContext';

interface CategoryPageProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  species: BiodiversitySpecies[];
  metrics: Array<{ label: string; value: number | string; icon: string }>;
  filters: {
    habitats: string[];
    districts: string[];
    conservationStatuses: string[];
  };
  children?: React.ReactNode;
  hideHabitatFilter?: boolean;
  hideAdministrativeUnitFilter?: boolean;
  hideElevationFilter?: boolean;
}

export function BiodiversityCategoryPage({
  title,
  subtitle,
  icon: iconName,
  color,
  species,
  metrics,
  filters,
  children,
  hideHabitatFilter = false,
  hideAdministrativeUnitFilter = false,
  hideElevationFilter = false,
}: CategoryPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.Leaf;
  const router = useRouter();

  // ── Global filter ──
  const { filter: globalFilter, resetFilter: resetGlobalFilter } = useGlobalFilter();

  // Scope-only count (ignores district/search) — drives the KPI pill
  const scopeCount = React.useMemo(() => {
    if (globalFilter.scope === 'All') return 0;
    return species.filter(s =>
      s.districts.some(d => {
        const sc = getScopeForUnit(d);
        return sc === globalFilter.scope;
      })
    ).length;
  }, [species, globalFilter.scope]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // biodiversity-specific filters (scope/district/search come from globalFilter)
  const [conservationStatus, setConservationStatus] = useState('all');
  const [habitat,            setHabitat]            = useState('all');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleReset = () => {
    setConservationStatus('all');
    setHabitat('all');
    setCurrentPage(1);
  };

  const handleQuickView = (species: BiodiversitySpecies) => {
    setSelectedEntity({
      type: 'species',
      name: species.commonName,
      description: species.description,
      slug: species.slug,
      status: species.conservationStatus,
      district: species.districts.join(', '),
      metrics: [
        { label: 'Elevation', value: `${species.elevationRange.min}-${species.elevationRange.max}m` },
        { label: 'Habitats', value: species.habitats.length },
      ],
    });
    setDrawerOpen(true);
  };

  const filteredSpecies = React.useMemo(() => species.filter(s => {
    // Global search
    const q = globalFilter.searchQuery.toLowerCase();
    if (q && !s.commonName.toLowerCase().includes(q) && !s.scientificName?.toLowerCase().includes(q)) return false;
    // Global scope
    if (globalFilter.scope && globalFilter.scope !== 'All') {
      const inScope = s.districts.some(d => {
        const sc = getScopeForUnit(d);
        return sc === globalFilter.scope || sc === 'All';
      });
      if (!inScope) return false;
    }
    // Global district
    if (!hideAdministrativeUnitFilter && globalFilter.district && globalFilter.district !== 'All') {
      if (!s.districts.includes(globalFilter.district)) return false;
    }
    // Page-specific: conservation status
    if (conservationStatus !== 'all' && s.conservationStatus !== conservationStatus) return false;
    // Page-specific: habitat
    if (!hideHabitatFilter && habitat !== 'all' && !s.habitats.includes(habitat)) return false;
    return true;
  }), [species, globalFilter, conservationStatus, habitat, hideHabitatFilter, hideAdministrativeUnitFilter]);

  // Count of active page-specific filters (drives combined Clear count in bar)
  const extraActiveCount = [
    conservationStatus !== 'all',
    !hideHabitatFilter && habitat !== 'all',
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        label="Biodiversity Intelligence"
        title={title}
        subtitle={subtitle}
        icon={<Icon className={`w-6 h-6 ${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}`} />}
        gridOverlay
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity' },
          { label: typeof title === 'string' && title.includes(' Across ') ? title.split(' Across ')[0] : title }
        ]}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button 
              size="lg" 
              className={`bg-gradient-to-r ${color}`}
              icon={<Search className="w-5 h-5" />}
            >
              Search {typeof title === 'string' && title.includes(' Across ') ? title.split(' Across ')[0] : title}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white"
              icon={<Map className="w-5 h-5" />}
            >
              Distribution Map
            </Button>
          </div>
        }
      />

      {/* ── KPI Strip ─────────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} />

      {/* ── Global Filter Bar with inline page-specific filters ──────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={conservationStatus}
                onChange={v => { setConservationStatus(v); setCurrentPage(1); }}
                placeholder="All Statuses"
                options={filters.conservationStatuses.map(s => ({ value: s, label: s }))}
              />
              {!hideHabitatFilter && (
                <FilterSelect
                  value={habitat}
                  onChange={v => { setHabitat(v); setCurrentPage(1); }}
                  placeholder="All Habitats"
                  options={filters.habitats.map(h => ({ value: h, label: h }))}
                />
              )}
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => { setConservationStatus('all'); setHabitat('all'); setCurrentPage(1); }}
        />
      </div>

      {children && (
        <div className="container mx-auto px-6 py-4">
          {children}
        </div>
      )}

      {/* ── Scope tabs + results action row ────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredSpecies.length}
        totalCount={species.length}
        entityLabel="species"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Species')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* Content — pinned to z-0 so dropdown never clips behind cards */}
      <div className="container mx-auto px-6 py-6 space-y-6 relative z-0">

        {filteredSpecies.length > 0 ? (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredSpecies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((species, index) => (
                <motion.div
                  key={species.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BiodiversityCard
                    species={species}
                    onQuickView={handleQuickView}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                </motion.div>
              ))}
            </div>

            {filteredSpecies.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12">
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
                    {Array.from({ length: Math.ceil(filteredSpecies.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
                      
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredSpecies.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredSpecies.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSpecies.length)} of {filteredSpecies.length} records
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <Leaf className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No species found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your filters</p>
            <Button onClick={() => { handleReset(); resetGlobalFilter(); }} variant="outline" className="border-white/20 text-white">
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Entity Drawer */}
      {selectedEntity && (
        <EntityDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          entity={selectedEntity}
        />
      )}
    </main>
  );
}
