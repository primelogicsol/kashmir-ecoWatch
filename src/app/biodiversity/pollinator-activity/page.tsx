'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope, getScopeForUnit } from '@/data/geography';
import { 
  pollinatorData, 
  pollinatorDashboardMetrics,
  PollinatorType,
  Month,
  Pollinator
} from '@/data/pollinator-activity';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bug, MapPin, Search, Filter, 
  ChevronLeft, ChevronRight, Activity, TrendingUp, AlertTriangle, X, Shield, Calendar, Map, CheckCircle, Apple, Leaf
} from 'lucide-react';

export default function PollinatorActivityPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState<PollinatorType | 'All'>('All');

  const [selectedPollinator, setSelectedPollinator] = useState<Pollinator | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = ['All', ...GEOGRAPHY.scopes];
  
  const pollinatorTypes = Array.from(new Set(pollinatorData.map(m => m.taxonomicGroup))).sort();

  const filteredPollinators = useMemo(() => {
    return pollinatorData.filter(pollinator => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        pollinator.commonName.toLowerCase().includes(query) ||
        pollinator.scientificName.toLowerCase().includes(query) ||
        pollinator.shortDescription.toLowerCase().includes(query);

      const getRegionForUnit = (unit: string) => {
        for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
          if ((units as readonly string[]).includes(unit)) return region;
        }
        return null;
      };
      
      const districtRegion = selectedDistrict !== 'All' ? getRegionForUnit(selectedDistrict) : null;
      
      const matchesDistrict = selectedDistrict === 'All' || (districtRegion && pollinator.regionsPresent.includes(districtRegion as any));
      const matchesScope = selectedScope === 'All' || pollinator.primaryScope === selectedScope || pollinator.primaryScope === 'All';
      const matchesType = selectedType === 'All' || pollinator.taxonomicGroup === selectedType;

      return matchesSearch && matchesDistrict && matchesScope && matchesType;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CR': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'EN': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'VU': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'NT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title="Pollinator Activity Intelligence"
        subtitle="Master phenology database tracking flowering-linked pollinator windows, orchard dynamics, and alpine ecology."
        icon={<Bug className="w-6 h-6 text-fuchsia-400" />}
        label="Biodiversity Intelligence"
        breadcrumbs={[{ label: 'Biodiversity', href: '/biodiversity' }, { label: 'Pollinators' }]}
        images={['/images/bee.png']}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 text-white" icon={<Calendar className="w-5 h-5" />}>
            Pollination Calendar
          </Button>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {pollinatorDashboardMetrics.map((metric, idx) => {
                const IconComponent = metric.icon === 'Bug' ? Bug 
                                    : metric.icon === 'Activity' ? Activity 
                                    : metric.icon === 'AlertTriangle' ? AlertTriangle 
                                    : Apple;
                return (
                  <div key={idx} className="flex items-center gap-4 py-2 px-4 rounded-xl bg-white/5">
                    <div className="p-3 bg-fuchsia-500/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-fuchsia-400" />
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
              <strong className="text-white">{filteredPollinators.length}</strong> of <strong className="text-white">{pollinatorData.length}</strong> records
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
                  placeholder="e.g. Bumble Bee..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors"
              >
                {availableScopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Admin Unit</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units</option>
                {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Taxonomic Group</label>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-fuchsia-500/50 transition-colors"
              >
                <option value="All">All Groups</option>
                {pollinatorTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredPollinators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPollinators.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((pollinator, idx) => (
              <motion.div key={pollinator.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400">{pollinator.taxonomicGroup}</Badge>
                      <Badge variant="outline" className="border-white/20">{pollinator.nativeStatus}</Badge>
                      {pollinator.activityStatus.slice(0,1).map(s => <Badge key={s} variant="secondary" className="bg-white/5">{s}</Badge>)}
                      <Badge variant="default" className={getStatusColor(pollinator.conservationStatus)}>{pollinator.conservationStatus}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-300 transition-colors mb-0.5">
                      {pollinator.commonName}
                    </h3>
                    <p className="text-sm italic text-slate-400 mb-3">{pollinator.scientificName}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-300 bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{pollinator.flowerSpeciesCount} Flower Assocs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-fuchsia-500" />
                        <span>{pollinator.elevationMin}m–{pollinator.elevationMax}m</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-300 mb-4 h-[42px] line-clamp-2">
                      {pollinator.shortDescription}
                    </p>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Current Status</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className={`w-4 h-4 ${pollinator.currentStatus.toLowerCase().includes('dormant') ? 'text-slate-500' : 'text-fuchsia-400'}`} />
                        <span className="text-slate-200">{pollinator.currentStatus}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Key Threats</div>
                      <div className="flex flex-wrap gap-1.5">
                        {pollinator.threats.slice(0,3).map(threat => (
                          <span key={threat.threatType} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                            {threat.threatType}
                          </span>
                        ))}
                        {pollinator.threats.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            +{pollinator.threats.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setSelectedPollinator(pollinator)} className="w-full border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white transition-colors">
                        View Pollinator Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredPollinators.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredPollinators.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredPollinators.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page ? 'bg-fuchsia-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPollinators.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredPollinators.length / itemsPerPage)}
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
            <Bug className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No pollinators found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your search criteria</p>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('All');
              setSelectedScope('All');
              setSelectedType('All');
            }}>Reset Filters</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPollinator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-fuchsia-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400">{selectedPollinator.taxonomicGroup}</Badge>
                    <Badge variant="outline" className="border-white/20">{selectedPollinator.nativeStatus}</Badge>
                    <Badge variant="default" className={getStatusColor(selectedPollinator.conservationStatus)}>{selectedPollinator.conservationStatus}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedPollinator.commonName}</h2>
                  <p className="text-fuchsia-400 italic text-sm">{selectedPollinator.scientificName}</p>
                </div>
                <button
                  onClick={() => setSelectedPollinator(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-fuchsia-500" /> Phenology & Activity Matrix
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">First Activity</span>
                      <span className="text-slate-300 font-medium">{selectedPollinator.firstActivityMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Peak Pollination</span>
                      <span className="text-slate-300 font-medium text-fuchsia-400">{selectedPollinator.peakActivityMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Last Activity</span>
                      <span className="text-slate-300 font-medium">{selectedPollinator.lastActivityMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Dormancy</span>
                      <span className="text-slate-300 font-medium">{selectedPollinator.dormancyWindow}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-500" /> Flowering Intelligence
                    </h4>
                    <div className="bg-white/5 rounded-lg border border-white/10 p-4 space-y-4">
                      {selectedPollinator.plantAssociations.length > 0 && (
                        <div>
                          <div className="text-xs text-slate-400 uppercase mb-1.5">Wild Plants</div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPollinator.plantAssociations.map(p => <span key={p} className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">{p}</span>)}
                          </div>
                        </div>
                      )}
                      {selectedPollinator.medicinalPlantAssociations.length > 0 && (
                        <div>
                          <div className="text-xs text-amber-400/80 uppercase mb-1.5 flex items-center gap-1"><Activity className="w-3 h-3"/> Medicinal Flora</div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPollinator.medicinalPlantAssociations.map(p => <span key={p} className="text-xs px-2 py-1 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">{p}</span>)}
                          </div>
                        </div>
                      )}
                      {selectedPollinator.orchardAssociations.length > 0 && (
                        <div>
                          <div className="text-xs text-rose-400/80 uppercase mb-1.5 flex items-center gap-1"><Apple className="w-3 h-3"/> Orchard / Agricultural</div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPollinator.orchardAssociations.map(p => <span key={p} className="text-xs px-2 py-1 bg-rose-500/10 text-rose-400 rounded border border-rose-500/20">{p}</span>)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" /> Threat Intelligence
                    </h4>
                    <div className="space-y-3">
                      {selectedPollinator.threats.map((threat, idx) => (
                        <div key={idx} className="bg-red-500/5 border border-red-500/10 p-2.5 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-red-400">{threat.threatType}</span>
                            <span className="text-[10px] uppercase tracking-wider text-red-500/80">{threat.severity}</span>
                          </div>
                          <p className="text-xs text-slate-300">{threat.narrative}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Validated via <strong className="text-slate-200">{selectedPollinator.validation.sourceName}</strong> ({selectedPollinator.validation.sourceYear})</span>
                  </div>
                  <div className="ml-5">Confidence: {selectedPollinator.validation.confidence}</div>
                </div>
                <Button variant="primary" size="sm" className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white w-full sm:w-auto">
                  <Bug className="w-4 h-4 mr-2"/>
                  View Pollinator Database Profile
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
