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
  Grid3X3, List, MapPin, Shield, ChevronLeft, ChevronRight,
  Compass, ShieldAlert, AlertTriangle, Mountain, Sparkles, type LucideIcon
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
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                {typeof title === 'string' ? title.replace(/^Western Himalayan\s+/i, '') : 'Taxa Directory'}
              </span>
            </div>
          </div>
        }
        subtitle={subtitle}
        icon={<Icon className={`w-6 h-6 ${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}`} />}
        label="Biodiversity Intelligence · Species Taxonomy"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: typeof title === 'string' && title.includes(' Across ') ? title.split(' Across ')[0] : title }
        ]}
        images={[
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png',
          '/images/protected-network.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className={`border-emerald-500/40 font-bold transition-all ${
                conservationStatus === 'all'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30'
                  : 'text-emerald-300 hover:bg-emerald-500/10'
              }`}
              onClick={() => { setConservationStatus('all'); setHabitat('all'); setCurrentPage(1); }}
            >
              <Leaf className="w-4 h-4 mr-1.5" />
              ALL {species.length} Taxa
            </Button>
            <Button 
              size="sm" 
              className={`font-bold transition-all ${
                ['CR', 'EN', 'VU'].includes(conservationStatus)
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 ring-2 ring-rose-400'
                  : 'bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-500 hover:to-red-400'
              }`}
              onClick={() => { setConservationStatus('CR'); setCurrentPage(1); }}
            >
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              Threatened ({species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length})
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white hover:from-purple-500 hover:to-indigo-400 font-bold transition-all"
              onClick={() => {
                const element = document.getElementById('taxa-records-grid');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <MapPin className="w-4 h-4 mr-1.5" />
              Endemics ({species.filter(s => s.endemismStatus && s.endemismStatus.toLowerCase().includes('endemic')).length})
            </Button>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K BIODIVERSITY MONITORING STRIP */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Transboundary Ecological Corridor &amp; Habitat Intelligence</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Key Ecological Corridors: <strong className="text-white">Dachigam Biosphere</strong>, <strong className="text-white">Kazinag National Park</strong>, <strong className="text-white">Kishtwar High Altitude</strong>, and <strong className="text-white">Overa-Aru Sanctuary</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">IUCN Threat Matrix</div>
              <div className="text-sm font-bold text-emerald-300">{species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length} Red-Listed Taxa</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>WPA Schedule I Safeguards</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: ALL Taxa */}
          <div
            onClick={() => { setConservationStatus('all'); setHabitat('all'); setCurrentPage(1); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              conservationStatus === 'all'
                ? 'bg-emerald-500/20 border-emerald-500/60 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Cataloged Taxa</span>
              <Icon className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{species.length}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">ALL Verified Taxa</div>
          </div>

          {/* Card 2: Threatened */}
          <div
            onClick={() => { setConservationStatus(conservationStatus === 'CR' ? 'all' : 'CR'); setCurrentPage(1); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              ['CR', 'EN', 'VU'].includes(conservationStatus)
                ? 'bg-rose-500/20 border-rose-500/60 shadow-lg shadow-rose-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Threatened</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">
              {species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length}
            </div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">
              {species.filter(s => s.conservationStatus === 'CR').length} CR · {species.filter(s => s.conservationStatus === 'EN').length} EN · {species.filter(s => s.conservationStatus === 'VU').length} VU
            </div>
          </div>

          {/* Card 3: Endemics */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Endemics</span>
              <MapPin className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {species.filter(s => s.endemismStatus && s.endemismStatus.toLowerCase().includes('endemic')).length}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Regional Endemics</div>
          </div>

          {/* Card 4: Spatial Range */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Districts</span>
              <Map className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {Array.from(new Set(species.flatMap(s => s.districts))).length || 20}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Spatial Distribution</div>
          </div>

          {/* Card 5: Alpine Limit */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Alpine Limit</span>
              <Mountain className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">
              {Math.max(...species.map(s => s.elevationRange?.max || 0))}m
            </div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">Max Elevational Limit</div>
          </div>

          {/* Card 6: Conservation Shield */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Protected</span>
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              {species.filter(s => (s.conservationMeasures && s.conservationMeasures.length > 0) || ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length}
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Sanctuaries &amp; Parks</div>
          </div>
        </div>
      </div>

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
