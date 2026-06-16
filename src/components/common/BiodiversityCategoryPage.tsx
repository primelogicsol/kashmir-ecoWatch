'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EntityDrawer } from '@/components/common/EntityDrawer';
import { BiodiversityCard } from '@/components/common/BiodiversityCard';
import { BiodiversityFilters } from '@/components/common/BiodiversityFilters';
import {
  Leaf, Map, Activity, Eye, TrendingUp, ArrowRight, Search,
  Grid3X3, List, MapPin, Shield, ChevronLeft, ChevronRight, type LucideIcon
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { BiodiversitySpecies, biodiversityMetrics } from '@/data/biodiversity';
import { useRouter } from 'next/navigation';
import { getScopeForUnit } from '@/data/geography';

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
}: CategoryPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.Leaf;
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveFilters({});
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

  const filteredSpecies = species.filter(s => {
    let match = true;
    if (activeFilters.searchQuery && !s.commonName.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())) {
      match = false;
    }
    if (activeFilters.conservationStatus && activeFilters.conservationStatus !== 'all') {
      if (s.conservationStatus !== activeFilters.conservationStatus) match = false;
    }
    if (activeFilters.habitat && activeFilters.habitat !== 'all') {
      if (!s.habitats.includes(activeFilters.habitat)) match = false;
    }
    if (activeFilters.scope && activeFilters.scope !== 'All') {
      const isInScope = s.districts.some(d => {
        const scope = getScopeForUnit(d);
        return scope === activeFilters.scope || scope === 'All';
      });
      if (!isInScope) match = false;
    }
    if (activeFilters.administrativeUnit && activeFilters.administrativeUnit !== 'All') {
      if (!s.districts.includes(activeFilters.administrativeUnit)) match = false;
    }
    return match;
  });

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">
        <div className={`absolute inset-0 bg-slate-900/50`} />
        <div className="absolute inset-0 bg-grid " />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className={`w-6 h-6 ${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
                Biodiversity Intelligence
              </span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight max-w-xl">
              {title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button 
                size="lg" 
                className={`bg-gradient-to-r ${color}`}
                icon={<Search className="w-5 h-5" />}
              >
                Search {title}
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
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {metrics.map((metric, idx) => {
                const MetricIcon = (Icons as any)[metric.icon] || Icons.Activity;
                return (
                  <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                    <MetricIcon className={`w-4 h-4 ${color.includes('emerald') ? 'text-emerald-500' : 'text-slate-500'} mx-auto mb-1`} />
                    <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                      {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                    </div>
                    <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      {children && (
        <div className="container mx-auto px-6 py-4">
          {children}
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <BiodiversityFilters
            filters={activeFilters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            resultCount={filteredSpecies.length}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? `bg-gradient-to-r ${color} bg-clip-text text-transparent` : 'text-slate-400'}
              icon={<Grid3X3 className="w-4 h-4" />}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? `bg-gradient-to-r ${color} bg-clip-text text-transparent` : 'text-slate-400'}
              icon={<List className="w-4 h-4" />}
            />
          </div>
        </motion.div>

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
            <Button onClick={handleReset} variant="outline" className="border-white/20 text-white">
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
