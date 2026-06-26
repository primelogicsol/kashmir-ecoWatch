'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope } from '@/data/geography';
import { 
  phenologyData, 
  phenologyDashboardMetrics,
  PhenologyStage,
  PlantGroup,
  PhenologyRecord
} from '@/data/phenology-flowering';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, MapPin, Search, Filter, 
  ChevronLeft, ChevronRight, Activity, TrendingUp, AlertTriangle, X, Calendar, Map, CheckCircle, Droplet, Snowflake, ThermometerSun
} from 'lucide-react';

export default function PhenologyFloweringPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedStage, setSelectedStage] = useState<PhenologyStage | 'All'>('All');
  const [selectedGroup, setSelectedGroup] = useState<PlantGroup | 'All'>('All');

  const [selectedPhenology, setSelectedPhenology] = useState<PhenologyRecord | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = ['All', ...GEOGRAPHY.scopes];
  
  const allStages = Array.from(new Set(phenologyData.map(m => m.currentStage))).sort();
  const allGroups = Array.from(new Set(phenologyData.flatMap(m => m.plantGroup))).sort();

  const filteredRecords = useMemo(() => {
    return phenologyData.filter(record => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        record.commonName.toLowerCase().includes(query) ||
        record.scientificName.toLowerCase().includes(query) ||
        record.shortDescription.toLowerCase().includes(query);

      const getRegionForUnit = (unit: string) => {
        for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
          if ((units as readonly string[]).includes(unit)) return region;
        }
        return null;
      };
      
      const districtRegion = selectedDistrict !== 'All' ? getRegionForUnit(selectedDistrict) : null;
      
      const matchesDistrict = selectedDistrict === 'All' || (districtRegion && record.regionsPresent.includes(districtRegion as any));
      const matchesScope = selectedScope === 'All' || record.primaryScope === selectedScope || record.primaryScope === 'All';
      const matchesStage = selectedStage === 'All' || record.currentStage === selectedStage;
      const matchesGroup = selectedGroup === 'All' || record.plantGroup.includes(selectedGroup as any);

      return matchesSearch && matchesDistrict && matchesScope && matchesStage && matchesGroup;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedStage, selectedGroup]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CR': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'EN': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'VU': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'NT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const getStageColor = (stage: string) => {
    if (stage.includes('Bloom')) return 'text-fuchsia-400 border-fuchsia-500/30';
    if (stage.includes('Fruiting')) return 'text-orange-400 border-orange-500/30';
    if (stage.includes('Dormancy') || stage.includes('Senescence')) return 'text-slate-400 border-slate-500/30';
    return 'text-emerald-400 border-emerald-500/30';
  };

  const getSignalIcon = (signal: string) => {
    if (signal.includes('Snowmelt') || signal.includes('Frost')) return <Snowflake className="w-3 h-3 mr-1" />;
    if (signal.includes('Rainfall') || signal.includes('Drought')) return <Droplet className="w-3 h-3 mr-1" />;
    return <ThermometerSun className="w-3 h-3 mr-1" />;
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title="Western Himalayan Phenology Records"
        subtitle="Climate-sensitive ecological monitoring system tracking first bloom, seasonal flowering, and fruiting records."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence"
        breadcrumbs={[{ label: 'Biodiversity', href: '/biodiversity' }, { label: 'Phenology & Flowering' }]}
        images={['/images/flower.png']}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white" icon={<Calendar className="w-5 h-5" />}>
            Flowering Calendar
          </Button>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {phenologyDashboardMetrics.map((metric, idx) => {
                const IconComponent = metric.icon === 'Leaf' ? Leaf 
                                    : metric.icon === 'TrendingUp' ? TrendingUp 
                                    : metric.icon === 'AlertTriangle' ? AlertTriangle 
                                    : ThermometerSun;
                return (
                  <div key={idx} className="flex items-center gap-4 py-2 px-4 rounded-xl bg-white/5">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white leading-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        {metric.label}
                      </div>
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
              {showFilters ? 'Hide Filters' : 'Advanced Filters'}
            </Button>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-slate-400 whitespace-nowrap">
              <strong className="text-white">{filteredRecords.length}</strong> of <strong className="text-white">{phenologyData.length}</strong> records
            </span>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 mt-4 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Species</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Iris, Blue Poppy..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {availableScopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Admin Unit</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units</option>
                {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Phenology Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => { setSelectedStage(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="All">All Stages</option>
                {allStages.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Plant Group</label>
              <select
                value={selectedGroup}
                onChange={(e) => { setSelectedGroup(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="All">All Groups</option>
                {allGroups.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((record, idx) => (
              <motion.div key={record.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className={`bg-white/5 ${getStageColor(record.currentStage)}`}>{record.currentStage}</Badge>
                      <Badge variant="outline" className="border-white/20">{record.nativeStatus}</Badge>
                      <Badge variant="default" className={getStatusColor(record.conservationStatus)}>{record.conservationStatus}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-0.5">
                      {record.commonName}
                    </h3>
                    <p className="text-sm italic text-slate-400 mb-3">{record.scientificName}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-300 bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{record.earliestFloweringMonth}–{record.latestFloweringMonth}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                        <span>{record.elevationMin}m–{record.elevationMax}m</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-300 mb-4 h-[42px] line-clamp-2">
                      {record.shortDescription}
                    </p>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Current Status</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className={`w-4 h-4 ${record.currentStatus.toLowerCase().includes('dormant') ? 'text-slate-500' : 'text-emerald-400'}`} />
                        <span className="text-slate-200">{record.currentStatus}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Climate / Ecology Signals</div>
                      <div className="flex flex-wrap gap-1.5">
                        {record.climateSignals.slice(0,3).map(signal => (
                          <span key={signal} className="text-[10px] flex items-center px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {getSignalIcon(signal)}{signal}
                          </span>
                        ))}
                        {record.climateSignals.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            +{record.climateSignals.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setSelectedPhenology(record)} className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors">
                        View Phenology Record
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredRecords.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredRecords.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredRecords.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="text-slate-600 px-1">...</span>;
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredRecords.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredRecords.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Leaf className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No records found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your search criteria</p>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('All');
              setSelectedScope('All');
              setSelectedStage('All');
              setSelectedGroup('All');
            }}>Reset Filters</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPhenology && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-emerald-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={`bg-white/5 ${getStageColor(selectedPhenology.currentStage)}`}>{selectedPhenology.currentStage}</Badge>
                    <Badge variant="outline" className="border-white/20">{selectedPhenology.plantGroup[0]}</Badge>
                    <Badge variant="default" className={getStatusColor(selectedPhenology.conservationStatus)}>{selectedPhenology.conservationStatus}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedPhenology.commonName}</h2>
                  <p className="text-emerald-400 italic text-sm">{selectedPhenology.scientificName}</p>
                </div>
                <button
                  onClick={() => setSelectedPhenology(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" /> Phenology & Flowering Windows
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">First Bloom</span>
                      <span className="text-slate-300 font-medium">{selectedPhenology.earliestFloweringMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Peak Bloom</span>
                      <span className="text-slate-300 font-medium text-emerald-400">{selectedPhenology.peakFloweringMonths.join(', ')}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Fruiting Window</span>
                      <span className="text-slate-300 font-medium text-orange-400">{selectedPhenology.fruitingMonths.join(', ') || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Dormancy</span>
                      <span className="text-slate-300 font-medium text-slate-400">{selectedPhenology.dormancyMonths[0]}–{selectedPhenology.dormancyMonths[selectedPhenology.dormancyMonths.length-1]}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <ThermometerSun className="w-4 h-4 text-amber-500" /> Climate Shift Intelligence
                    </h4>
                    <div className="bg-amber-500/5 rounded-lg border border-amber-500/10 p-4 space-y-4">
                      <div className="flex items-center justify-between border-b border-amber-500/10 pb-2 mb-2">
                        <span className="text-xs text-slate-400 uppercase">Phenology Shift</span>
                        <Badge variant="outline" className="border-amber-500/30 text-amber-400">{selectedPhenology.phenologyShiftIndicator}</Badge>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selectedPhenology.climateShiftNotes}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {selectedPhenology.climateSignals.map(s => <span key={s} className="text-[10px] px-2 py-1 bg-amber-500/10 text-amber-400 rounded-sm border border-amber-500/20">{s}</span>)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-500" /> Regional Data
                    </h4>
                    <div className="space-y-3">
                      <div className="text-xs text-slate-400 uppercase">Tracked Habitats</div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPhenology.mainHabitats.map(h => <span key={h} className="text-xs px-2 py-1 bg-sky-500/10 text-sky-400 rounded border border-sky-500/20">{h}</span>)}
                      </div>
                      <div className="text-xs text-slate-400 uppercase mt-4">Linked Pollinators</div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPhenology.pollinatorLinkages.map(p => <span key={p} className="text-xs px-2 py-1 bg-fuchsia-500/10 text-fuchsia-400 rounded border border-fuchsia-500/20">{p}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Validated via <strong className="text-slate-200">{selectedPhenology.validation.sourceName}</strong> ({selectedPhenology.validation.sourceYear})</span>
                  </div>
                  <div className="ml-5">Confidence: {selectedPhenology.validation.confidence} • Record: {selectedPhenology.validation.observationDate}</div>
                </div>
                <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto">
                  <Leaf className="w-4 h-4 mr-2"/>
                  View Full Flora Profile
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
