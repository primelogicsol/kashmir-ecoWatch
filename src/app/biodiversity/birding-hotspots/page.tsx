'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope, getScopeForUnit } from '@/data/geography';
import { birdingHotspotsData, birdingHotspotsMetrics } from '@/data/birding-hotspots';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Activity, Shield, Map, Search, Eye, Filter, 
  Grid3X3, List, ChevronLeft, ChevronRight, TrendingUp,
  Wind, X, AlertTriangle, Users
} from 'lucide-react';
import { BirdingHotspot } from '@/data/birding-hotspots';

export default function BirdingHotspotsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedHotspotType, setSelectedHotspotType] = useState('All');

  const [selectedHotspot, setSelectedHotspot] = useState<BirdingHotspot | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = ['All', ...GEOGRAPHY.scopes];
  
  const hotspotTypes = useMemo(() => {
    return Array.from(new Set(birdingHotspotsData.map(h => h.hotspotType))).sort();
  }, []);

  const filteredHotspots = useMemo(() => {
    return birdingHotspotsData.filter(hotspot => {
      // 1. Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        hotspot.name.toLowerCase().includes(query) ||
        hotspot.administrativeUnit.toLowerCase().includes(query) ||
        hotspot.keySpecies.some(s => s.toLowerCase().includes(query)) ||
        hotspot.shortDescription.toLowerCase().includes(query);

      // 2. Geographic Filters
      const matchesDistrict = selectedDistrict === 'All' || hotspot.administrativeUnit === selectedDistrict;
      const matchesScope = selectedScope === 'All' || hotspot.scope === selectedScope || hotspot.scope === 'All';

      // 3. Hotspot Type
      const matchesType = selectedHotspotType === 'All' || hotspot.hotspotType === selectedHotspotType;

      return matchesSearch && matchesDistrict && matchesScope && matchesType;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedHotspotType]);

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title="Birding & Observation Hotspots"
        subtitle="A scientifically validated directory of the region's most important habitats for birding, conservation monitoring, and citizen science across the Kashmir Eco Watch geography."
        icon={<Wind className="w-6 h-6 text-sky-400" />}
        label="Biodiversity Intelligence"
        breadcrumbs={[{ label: 'Biodiversity', href: '/biodiversity' }, { label: 'Birding Hotspots' }]}
        images={['/images/protected-network.png', '/images/bear.png']}
        actions={
          <>
            <Button size="lg" className="bg-gradient-to-r from-sky-600 to-sky-400" icon={<Search className="w-5 h-5" />}>
              Search Hotspots
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
              Hotspot Map
            </Button>
          </>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {birdingHotspotsMetrics.map((metric, idx) => {
                const IconComponent = metric.icon === 'MapPin' ? MapPin 
                                    : metric.icon === 'Shield' ? Shield 
                                    : metric.icon === 'Eye' ? Eye 
                                    : metric.icon === 'Map' ? Map 
                                    : metric.icon === 'Activity' ? Activity 
                                    : TrendingUp;
                return (
                  <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                    <IconComponent className="w-4 h-4 text-sky-500 mx-auto mb-1" />
                    <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                      {metric.value}
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

      {/* Filters */}
      <div className="container mx-auto px-6 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-slate-400 whitespace-nowrap">
              <strong className="text-white">{filteredHotspots.length}</strong> of <strong className="text-white">{birdingHotspotsData.length}</strong> hotspots
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
              <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
            </div>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 mt-4 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Hotspot, species, district..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ecological Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-sky-500/50 transition-colors"
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
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-sky-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units in {selectedScope}</option>
                {availableDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Hotspot Type</label>
              <select
                value={selectedHotspotType}
                onChange={(e) => { setSelectedHotspotType(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-sky-500/50 transition-colors"
              >
                <option value="All">All Types</option>
                {hotspotTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredHotspots.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredHotspots.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((hotspot, idx) => (
              <motion.div key={hotspot.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="default" className="bg-sky-500/20 text-sky-400 border-sky-500/30">{hotspot.scope}</Badge>
                      <Badge variant="outline" className="border-white/20">{hotspot.hotspotType}</Badge>
                      {hotspot.conservationStatus.slice(0, 1).map(status => (
                        <Badge key={status} variant="info">{status}</Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-1">
                      {hotspot.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-3 h-3 text-sky-500" />
                      {hotspot.administrativeUnit} / {hotspot.region}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{hotspot.speciesCount}+</div>
                        <div className="text-[10px] text-slate-500 uppercase">Species</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{hotspot.habitatCount}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Habitats</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-sm font-bold text-white mt-1">{hotspot.elevationRange.max}m</div>
                        <div className="text-[10px] text-slate-500 uppercase">Elevation</div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 mb-4 h-[42px] line-clamp-2">
                      {hotspot.shortDescription}
                    </p>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Key Species</div>
                      <div className="flex flex-wrap gap-1.5">
                        {hotspot.keySpecies.slice(0, 3).map(sp => (
                          <span key={sp} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                            {sp}
                          </span>
                        ))}
                        {hotspot.keySpecies.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/10">
                            +{hotspot.keySpecies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setSelectedHotspot(hotspot)} className="w-full border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors">
                        View Hotspot
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredHotspots.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full col-span-full">
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
                    {Array.from({ length: Math.ceil(filteredHotspots.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredHotspots.length / itemsPerPage);
                      
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-sky-500 text-white'
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredHotspots.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredHotspots.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredHotspots.length)} of {filteredHotspots.length} hotspots
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Wind className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No hotspots found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your geographic or type filters</p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('All');
                setSelectedScope('All');
                setSelectedHotspotType('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-sky-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="border-white/20">{selectedHotspot.hotspotType}</Badge>
                    {selectedHotspot.conservationStatus.map(status => (
                      <Badge key={status} variant={status === 'Ramsar' ? 'default' : 'secondary'} className={status === 'Ramsar' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : ''}>
                        {status}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedHotspot.name}</h2>
                  <p className="text-sky-400 text-sm flex items-center gap-1.5"><MapPin className="w-4 h-4"/>{selectedHotspot.administrativeUnit}, {selectedHotspot.region} • {selectedHotspot.basin}</p>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Map className="w-4 h-4 text-sky-500" /> Hotspot Intelligence
                  </h4>
                  <div className="text-sm text-slate-300 mb-4 leading-relaxed">Habitats: {selectedHotspot.habitats.join(', ')}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm bg-black/20 p-4 rounded-lg border border-white/5">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Species</span>
                      <span className="text-slate-300 font-bold text-lg">{selectedHotspot.speciesCount}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Elevation</span>
                      <span className="text-slate-300 font-medium">{selectedHotspot.elevationRange.min}m - {selectedHotspot.elevationRange.max}m</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Best Season</span>
                      <span className="text-slate-300 font-medium">{selectedHotspot.bestSeason}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Difficulty</span>
                      <span className="text-slate-300 font-medium">{selectedHotspot.difficultyLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-sky-500" /> Key Species Focus
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="block text-slate-500 text-xs uppercase mb-1">Target Species</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedHotspot.keySpecies.map(sp => <Badge key={sp} variant="outline" className="text-xs bg-white/5">{sp}</Badge>)}
                        </div>
                      </div>
                      {selectedHotspot.threatenedSpecies.length > 0 && (
                        <div>
                          <span className="block text-red-400/80 text-xs uppercase mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Threatened & Rare</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedHotspot.threatenedSpecies.map(sp => <Badge key={sp} variant="danger" className="text-[10px]">{sp}</Badge>)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-sky-500" /> Seasonality Index
                    </h4>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between items-center"><span className="text-slate-400">Winter:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.winter}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400">Spring:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.spring}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400">Summer:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.summer}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400">Autumn:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.autumn}</span></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <Shield className="w-3.5 h-3.5 text-slate-500"/>
                      <span>Data Validated from {selectedHotspot.dataSource}</span>
                    </div>
                  </div>
                </div>

              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end gap-3">
                {selectedHotspot.eBirdHotspotUrl && (
                  <a href={selectedHotspot.eBirdHotspotUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
                      <Wind className="w-4 h-4 mr-2"/>
                      Open in eBird
                    </Button>
                  </a>
                )}
                <Button variant="primary" size="sm" className="bg-sky-600 hover:bg-sky-500 text-white">
                  <Search className="w-4 h-4 mr-2"/>
                  View Recent Checklists
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdvancedFooter />
    </main>
  );
}
