'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope } from '@/data/geography';
import { 
  habitatSignalsData, 
  dashboardMetrics,
  EcosystemType,
  SignalCategory,
  HealthStatus,
  HabitatSignal
} from '@/data/habitat-signals';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, MapPin, Search, Filter, 
  ChevronLeft, ChevronRight, Activity, TrendingUp, TrendingDown, AlertTriangle, X, Shield, CheckCircle, Leaf, Droplet, Trees, Crosshair
} from 'lucide-react';

export default function HabitatSignalsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState<EcosystemType | 'All'>('All');
  const [selectedSignal, setSelectedSignal] = useState<SignalCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<HealthStatus | 'All'>('All');

  const [selectedHabitat, setSelectedHabitat] = useState<HabitatSignal | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = ['All', ...GEOGRAPHY.scopes];
  
  const ecosystemTypes = Array.from(new Set(habitatSignalsData.map(m => m.ecosystemType))).sort();
  const signalCategories: SignalCategory[] = ['Stress', 'Transition', 'Species Use', 'Suitability Shift'];
  const healthStatuses: HealthStatus[] = ['Excellent', 'Stable', 'Moderate Concern', 'High Concern', 'Critical'];

  const filteredHabitats = useMemo(() => {
    return habitatSignalsData.filter(hab => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        hab.habitatName.toLowerCase().includes(query) ||
        hab.shortDescription.toLowerCase().includes(query);

      const districtRegion = selectedDistrict !== 'All' ? Object.entries(GEOGRAPHY.units).find(([_, units]) => (units as readonly string[]).includes(selectedDistrict))?.[0] : null;
      
      const matchesDistrict = selectedDistrict === 'All' || hab.district === selectedDistrict;
      const matchesScope = selectedScope === 'All' || hab.primaryScope === selectedScope || hab.primaryScope === 'All';
      const matchesType = selectedType === 'All' || hab.ecosystemType === selectedType;
      const matchesStatus = selectedStatus === 'All' || hab.healthStatus === selectedStatus;
      const matchesSignal = selectedSignal === 'All' || hab.activeSignals.some(s => s.category === selectedSignal);

      return matchesSearch && matchesDistrict && matchesScope && matchesType && matchesStatus && matchesSignal;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedType, selectedStatus, selectedSignal]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High Concern': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Moderate Concern': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Stable': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Excellent': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend.includes('Declin')) return <TrendingDown className="w-3.5 h-3.5 text-red-400" />;
    if (trend.includes('Improv')) return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
    return <Activity className="w-3.5 h-3.5 text-amber-400" />;
  };

  const getSignalColor = (category: string) => {
    if (category === 'Stress') return 'text-red-400 border-red-500/20 bg-red-500/10';
    if (category === 'Transition') return 'text-sky-400 border-sky-500/20 bg-sky-500/10';
    if (category === 'Species Use') return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
    return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title="Habitat Signals Intelligence"
        subtitle="Dynamic ecosystem monitoring detecting ecological change, degradation, and climate shifts across Kashmir Core."
        icon={<Crosshair className="w-6 h-6 text-teal-400" />}
        label="Ecosystem Intelligence"
        breadcrumbs={[{ label: 'Biodiversity', href: '/biodiversity' }, { label: 'Habitat Signals' }]}
        images={['/images/habitat.png']}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-400 text-white" icon={<Activity className="w-5 h-5" />}>
            Health Dashboards
          </Button>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardMetrics.map((metric, idx) => {
                const IconComponent = metric.icon === 'Map' ? Map 
                                    : metric.icon === 'AlertTriangle' ? AlertTriangle 
                                    : metric.icon === 'TrendingDown' ? TrendingDown 
                                    : Activity;
                return (
                  <div key={idx} className="flex items-center gap-4 py-2 px-4 rounded-xl bg-white/5">
                    <div className="p-3 bg-teal-500/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-teal-400" />
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
              <strong className="text-white">{filteredHabitats.length}</strong> of <strong className="text-white">{habitatSignalsData.length}</strong> systems
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
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Habitat</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="e.g. Hokersar, Wular..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
              >
                {availableScopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Administrative Unit</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units</option>
                {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ecosystem Type</label>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
              >
                <option value="All">All Types</option>
                {ecosystemTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Signal Category</label>
              <select
                value={selectedSignal}
                onChange={(e) => { setSelectedSignal(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
              >
                <option value="All">All Signals</option>
                {signalCategories.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Health Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 transition-colors"
              >
                <option value="All">All Statuses</option>
                {healthStatuses.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredHabitats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHabitats.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((hab, idx) => (
              <motion.div key={hab.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className="border-teal-500/30 text-teal-400">{hab.ecosystemType}</Badge>
                      <Badge variant="default" className={getStatusColor(hab.healthStatus)}>{hab.healthStatus}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-1">
                      {hab.habitatName}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {hab.district}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-300 bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Shield className={`w-3.5 h-3.5 ${hab.scores.overallHealthIndex > 70 ? 'text-emerald-500' : hab.scores.overallHealthIndex > 40 ? 'text-amber-500' : 'text-red-500'}`} />
                        <span>Health: {hab.scores.overallHealthIndex}/100</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{hab.linkedSpeciesCount} Species</span>
                      </div>
                      <div className="flex items-center gap-1.5" title={hab.trendDirection}>
                        {getTrendIcon(hab.trendDirection)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-300 mb-4 h-[42px] line-clamp-2">
                      {hab.shortDescription}
                    </p>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Current Condition</div>
                      <p className="text-xs text-slate-300 bg-black/20 p-2 rounded border border-white/5">{hab.currentStatus}</p>
                    </div>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Active Signals</div>
                      <div className="flex flex-wrap gap-1.5">
                        {hab.activeSignals.slice(0,3).map((sig, i) => (
                          <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded border ${getSignalColor(sig.category)}`}>
                            {sig.name}
                          </span>
                        ))}
                        {hab.activeSignals.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            +{hab.activeSignals.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setSelectedHabitat(hab)} className="w-full border-teal-500/30 text-teal-400 hover:bg-teal-500 hover:text-white transition-colors">
                        View Habitat Signals
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredHabitats.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredHabitats.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredHabitats.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredHabitats.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredHabitats.length / itemsPerPage)}
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
            <Crosshair className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No habitats found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your search criteria</p>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => {
              setSearchQuery('');
              setSelectedScope('All');
              setSelectedDistrict('All');
              setSelectedType('All');
              setSelectedSignal('All');
              setSelectedStatus('All');
            }}>Reset Filters</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedHabitat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-teal-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="border-teal-500/30 text-teal-400">{selectedHabitat.ecosystemType}</Badge>
                    <Badge variant="default" className={getStatusColor(selectedHabitat.healthStatus)}>{selectedHabitat.healthStatus}</Badge>
                    <Badge variant="outline" className="border-white/20">{selectedHabitat.district}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedHabitat.habitatName}</h2>
                </div>
                <button
                  onClick={() => setSelectedHabitat(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
                
                {/* Health Indicators */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-500" /> Habitat Health Indicators
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { l: 'Integrity', v: selectedHabitat.scores.integrityScore, c: 'text-emerald-400' },
                      { l: 'Connectivity', v: selectedHabitat.scores.connectivityScore, c: 'text-sky-400' },
                      { l: 'Species', v: selectedHabitat.scores.speciesRichnessScore, c: 'text-fuchsia-400' },
                      { l: 'Vuln.', v: selectedHabitat.scores.climateVulnerability, c: 'text-orange-400', rev: true },
                      { l: 'Pressure', v: selectedHabitat.scores.humanPressureScore, c: 'text-red-400', rev: true },
                      { l: 'Health Index', v: selectedHabitat.scores.overallHealthIndex, c: 'text-teal-400' }
                    ].map((s, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-xl text-center">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{s.l}</div>
                        <div className={`text-xl font-bold ${s.c}`}>{s.v}</div>
                        <div className="w-full bg-white/5 h-1 mt-2 rounded-full overflow-hidden">
                          <div className={`h-full ${s.rev ? (s.v > 50 ? 'bg-red-500' : 'bg-emerald-500') : (s.v > 50 ? 'bg-emerald-500' : 'bg-red-500')}`} style={{ width: `${s.v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signals Matrix */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-rose-500" /> Active Ecological Signals
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedHabitat.activeSignals.map((sig, idx) => (
                      <div key={idx} className="bg-black/20 border border-white/5 p-4 rounded-xl flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider border ${getSignalColor(sig.category)}`}>
                              {sig.category}
                            </span>
                            <span className="text-sm font-bold text-white">{sig.name}</span>
                          </div>
                          {sig.severity && (
                            <span className={`text-[10px] font-bold uppercase ${sig.severity === 'Critical' ? 'text-red-500' : sig.severity === 'High' ? 'text-orange-500' : 'text-amber-500'}`}>
                              {sig.severity}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{sig.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Species Dependencies */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-500" /> Species Dependencies
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <div className="text-xs text-slate-400 uppercase mb-2">Dominant Flora</div>
                      <div className="flex flex-col gap-1">
                        {selectedHabitat.dominantFlora.map(f => <span key={f} className="text-sm italic text-emerald-300">• {f}</span>)}
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                      <div className="text-xs text-slate-400 uppercase mb-2">Key Fauna Dependents</div>
                      <div className="flex flex-col gap-1">
                        {selectedHabitat.keyFauna.map(f => <span key={f} className="text-sm text-sky-300">• {f}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Validated via <strong className="text-slate-200">{selectedHabitat.validationSource}</strong></span>
                  </div>
                  <div className="ml-5">Restoration Priority: <strong className={selectedHabitat.restorationPriority === 'Critical' ? 'text-red-400' : 'text-amber-400'}>{selectedHabitat.restorationPriority}</strong></div>
                </div>
                <Button variant="primary" size="sm" className="bg-teal-600 hover:bg-teal-500 text-white w-full sm:w-auto">
                  <Map className="w-4 h-4 mr-2"/>
                  View Restoration Action Plan
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
