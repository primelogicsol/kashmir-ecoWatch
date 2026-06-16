'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import * as Icons from 'lucide-react';
import {
  MapPin, Activity, ArrowRight, Search, Filter, Shield,
  Grid3X3, List, Map, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, getScopeForUnit, Scope } from '@/data/geography';

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
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('All');
  const [selectedEcologicalScope, setSelectedEcologicalScope] = React.useState<Scope | 'All'>('All');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 9;

  const availableDistricts = React.useMemo(() => {
    return getUnitsForScope(selectedEcologicalScope as Scope).sort();
  }, [selectedEcologicalScope]);

  const availableScopes = [...GEOGRAPHY.scopes];

  const filteredAreas = React.useMemo(() => {
    return areas.filter(area => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        area.name.toLowerCase().includes(query) ||
        area.district.toLowerCase().includes(query) ||
        area.description.toLowerCase().includes(query) ||
        (area as any).flagshipSpecies?.toLowerCase().includes(query);

      const areaScope = getScopeForUnit(area.district) || (area as any).scope;
      const matchesScope = selectedEcologicalScope === 'All' || areaScope === selectedEcologicalScope || areaScope === 'All';
      const matchesDistrict = selectedDistrict === 'All' || area.district === selectedDistrict;

      return matchesSearch && matchesDistrict && matchesScope;
    });
  }, [areas, searchQuery, selectedDistrict, selectedEcologicalScope]);

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
                const MetricIcon = (Icons as any)[metric.icon] || Icons.MapPin;
                return (
                  <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                    <MetricIcon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
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

      {/* Tab + Filters — single row */}
      <div className="container mx-auto px-6 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Top Scope Tabs */}
          <div className="flex items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl overflow-x-auto hide-scrollbar">
            {availableScopes.map(scope => (
              <button
                key={scope}
                onClick={() => {
                  setSelectedEcologicalScope(scope as Scope | 'All');
                  setSelectedDistrict('All');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedEcologicalScope === scope
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>

          {/* Filters + count + view toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
            <span className="text-sm text-slate-400 whitespace-nowrap hidden sm:inline">
              <strong className="text-white">{filteredAreas.length}</strong> of <strong className="text-white">{areas.length}</strong> protected areas
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
              <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 space-y-6">
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search name, district, or species..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ecological Scope</label>
              <select
                value={selectedEcologicalScope}
                onChange={(e) => { 
                  setSelectedEcologicalScope(e.target.value as Scope | 'All'); 
                  setSelectedDistrict('All'); 
                  setCurrentPage(1); 
                }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {availableScopes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Administrative Unit</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units in {selectedEcologicalScope}</option>
                {availableDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

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
                setSearchQuery('');
                setSelectedDistrict('All');
                setSelectedEcologicalScope('All');
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
