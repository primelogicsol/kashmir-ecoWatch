'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope, getScopeForUnit } from '@/data/geography';
import { 
  wildlifeSightingsData, 
  wildlifeSightingsMetrics, 
  VerificationStatus, 
  ObservationType,
  TaxonomicGroup,
  Habitat,
  ConservationStatus,
  isSensitive
} from '@/data/wildlife-sightings';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, ShieldCheck, Users, AlertTriangle, Search, Filter, 
  Camera, Video, Mic, MapPin, Grid3X3, List, ChevronLeft, ChevronRight,
  User, X
} from 'lucide-react';
import { WildlifeSighting } from '@/data/wildlife-sightings';

export default function WildlifeSightingsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedTaxa, setSelectedTaxa] = useState<TaxonomicGroup | 'All'>('All');
  const [selectedObservation, setSelectedObservation] = useState<ObservationType | 'All'>('All');
  const [selectedVerification, setSelectedVerification] = useState<VerificationStatus | 'All'>('All');
  const [selectedHabitat, setSelectedHabitat] = useState<Habitat | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<ConservationStatus | 'All'>('All');

  const [selectedSighting, setSelectedSighting] = useState<WildlifeSighting | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = [...GEOGRAPHY.scopes];
  
  const taxonomicGroups = Array.from(new Set(wildlifeSightingsData.map(d => d.taxonomicGroup))).sort();
  const observationTypes = Array.from(new Set(wildlifeSightingsData.map(d => d.observationType))).sort();
  const verificationStatuses = Array.from(new Set(wildlifeSightingsData.map(d => d.verificationStatus))).sort();
  const habitats = Array.from(new Set(wildlifeSightingsData.map(d => d.habitat))).sort();
  const statuses = Array.from(new Set(wildlifeSightingsData.map(d => d.conservationStatus))).sort();

  const filteredSightings = useMemo(() => {
    return wildlifeSightingsData.filter(sighting => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        sighting.commonName.toLowerCase().includes(query) ||
        sighting.scientificName.toLowerCase().includes(query) ||
        sighting.administrativeUnit.toLowerCase().includes(query) ||
        sighting.observerName.toLowerCase().includes(query) ||
        sighting.shortDescription.toLowerCase().includes(query);

      const matchesDistrict = selectedDistrict === 'All' || sighting.administrativeUnit === selectedDistrict;
      const matchesScope = selectedScope === 'All' || sighting.scope === selectedScope || sighting.scope === 'All';
      const matchesTaxa = selectedTaxa === 'All' || sighting.taxonomicGroup === selectedTaxa;
      const matchesObs = selectedObservation === 'All' || sighting.observationType === selectedObservation;
      const matchesVerif = selectedVerification === 'All' || sighting.verificationStatus === selectedVerification;
      const matchesHab = selectedHabitat === 'All' || sighting.habitat === selectedHabitat;
      const matchesStat = selectedStatus === 'All' || sighting.conservationStatus === selectedStatus;

      return matchesSearch && matchesDistrict && matchesScope && matchesTaxa && matchesObs && matchesVerif && matchesHab && matchesStat;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedTaxa, selectedObservation, selectedVerification, selectedHabitat, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CR': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'EN': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'VU': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'NT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const getVerificationColor = (verif: string) => {
    if (verif.includes('Expert') || verif.includes('Government') || verif.includes('Scientific')) return 'info';
    if (verif.includes('Community')) return 'warning';
    return 'outline';
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title="Wildlife Sightings Intelligence"
        subtitle="The central wildlife observation and reporting system combining verified science, citizen science, and conservation monitoring."
        icon={<Eye className="w-6 h-6 text-emerald-400" />}
        label="Citizen Science & Monitoring"
        breadcrumbs={[{ label: 'Biodiversity', href: '/biodiversity' }, { label: 'Wildlife Sightings' }]}
        images={['/images/bear.png']}
        actions={
          <>
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white" icon={<Camera className="w-5 h-5" />}>
              Submit Sighting
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<ShieldCheck className="w-5 h-5" />}>
              Verification Queue
            </Button>
          </>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {wildlifeSightingsMetrics.map((metric, idx) => {
                const IconComponent = metric.icon === 'Eye' ? Eye 
                                    : metric.icon === 'ShieldCheck' ? ShieldCheck 
                                    : metric.icon === 'Users' ? Users 
                                    : AlertTriangle;
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
              <strong className="text-white">{filteredSightings.length}</strong> of <strong className="text-white">{wildlifeSightingsData.length}</strong> records
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
              <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
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
                  placeholder="Species, observer, district..."
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
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Taxonomic Group</label>
              <select
                value={selectedTaxa}
                onChange={(e) => { setSelectedTaxa(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="All">All Taxa</option>
                {taxonomicGroups.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Verification Status</label>
              <select
                value={selectedVerification}
                onChange={(e) => { setSelectedVerification(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="All">All Statuses</option>
                {verificationStatuses.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Observation Type</label>
              <select
                value={selectedObservation}
                onChange={(e) => { setSelectedObservation(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="All">All Types</option>
                {observationTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Habitat</label>
              <select
                value={selectedHabitat}
                onChange={(e) => { setSelectedHabitat(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="All">All Habitats</option>
                {habitats.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Conservation</label>
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                <option value="All">All IUCN Status</option>
                {statuses.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredSightings.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredSightings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((sighting, idx) => (
              <motion.div key={sighting.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant={getVerificationColor(sighting.verificationStatus) as any}>{sighting.verificationStatus}</Badge>
                      <Badge variant="outline" className="border-white/20">{sighting.taxonomicGroup}</Badge>
                      <Badge variant="default" className={getStatusColor(sighting.conservationStatus)}>{sighting.conservationStatus}</Badge>
                      {sighting.isThreatened && (
                        <Badge variant="danger" className="animate-pulse"><AlertTriangle className="w-3 h-3 mr-1"/>Threatened</Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-0.5">
                      {sighting.commonName}
                    </h3>
                    <p className="text-sm italic text-slate-400 mb-3">{sighting.scientificName}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-300 bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="truncate max-w-[150px]">{sighting.protectedArea || sighting.administrativeUnit}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">{new Date(sighting.observationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-300 mb-4 h-[42px] line-clamp-2">
                      {sighting.shortDescription}
                    </p>

                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                          <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-white">{sighting.observerName}</div>
                          <div className="text-[10px] text-slate-500">{sighting.observerType}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Evidence & Context</div>
                      <div className="flex flex-wrap gap-2">
                        {sighting.evidenceType.map(ev => {
                          const EvIcon = ev === 'Photograph' ? Camera : ev === 'Video' ? Video : ev === 'Audio' ? Mic : Eye;
                          return (
                            <span key={ev} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                              <EvIcon className="w-3 h-3 text-emerald-400" /> {ev}
                            </span>
                          )
                        })}
                        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                           Habitat: {sighting.habitat}
                        </span>
                        {sighting.locationAccuracy === 'Sensitive Species Protected' && (
                           <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                             Location Obscured
                           </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex justify-between items-center">
                      <span className="text-[10px] text-slate-500">ID: {sighting.id}</span>
                      <Button variant="outline" size="sm" onClick={() => setSelectedSighting(sighting)} className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredSightings.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredSightings.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredSightings.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredSightings.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredSightings.length / itemsPerPage)}
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
            <Eye className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No observations found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your search criteria</p>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('All');
              setSelectedScope('All');
              setSelectedTaxa('All');
              setSelectedObservation('All');
              setSelectedVerification('All');
              setSelectedHabitat('All');
              setSelectedStatus('All');
            }}>Reset Filters</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedSighting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-emerald-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant={getVerificationColor(selectedSighting.verificationStatus) as any}>{selectedSighting.verificationStatus}</Badge>
                    <Badge variant="outline" className="border-white/20">{selectedSighting.taxonomicGroup}</Badge>
                    <Badge variant="default" className={getStatusColor(selectedSighting.conservationStatus)}>{selectedSighting.conservationStatus}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedSighting.commonName}</h2>
                  <p className="text-emerald-400 italic text-sm">{selectedSighting.scientificName}</p>
                </div>
                <button
                  onClick={() => setSelectedSighting(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-500" /> Observation Details
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Date</span>
                      <span className="text-slate-300 font-medium">{new Date(selectedSighting.observationDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Count</span>
                      <span className="text-slate-300 font-medium">{selectedSighting.count} individuals</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Behavior</span>
                      <span className="text-slate-300 font-medium">{selectedSighting.behavior}</span>
                    </div>
                    <div className="col-span-full">
                      <span className="block text-slate-500 text-xs uppercase mb-1">Description</span>
                      <span className="text-slate-300">{selectedSighting.shortDescription}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500" /> Location Intelligence
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm bg-black/20 p-4 rounded-lg border border-white/5">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Scope & Region</span>
                      <span className="text-slate-300">{selectedSighting.scope} / {selectedSighting.region}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Admin Unit</span>
                      <span className="text-slate-300">{selectedSighting.administrativeUnit}</span>
                    </div>
                    {selectedSighting.protectedArea && (
                      <div className="col-span-full">
                        <span className="block text-slate-500 text-xs uppercase mb-1">Protected Area / Habitat</span>
                        <span className="text-slate-300 font-medium text-emerald-400">{selectedSighting.protectedArea}</span>
                        <span className="text-slate-400 ml-2">({selectedSighting.habitat})</span>
                      </div>
                    )}
                    {selectedSighting.locationAccuracy === 'Sensitive Species Protected' ? (
                      <div className="col-span-full mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-1">
                          <ShieldCheck className="w-4 h-4" /> Sensitive Species Protection Active
                        </div>
                        <p className="text-xs text-red-400/80">Exact coordinates and specific breeding/nesting locations are obscured to protect this species from poaching or disturbance.</p>
                      </div>
                    ) : (
                      <>
                        {selectedSighting.coordinates && (
                          <div>
                            <span className="block text-slate-500 text-xs uppercase mb-1">Coordinates</span>
                            <span className="text-slate-300">{selectedSighting.coordinates.lat.toFixed(4)}, {selectedSighting.coordinates.lng.toFixed(4)}</span>
                          </div>
                        )}
                        {selectedSighting.elevation && (
                          <div>
                            <span className="block text-slate-500 text-xs uppercase mb-1">Elevation</span>
                            <span className="text-slate-300">{selectedSighting.elevation}m</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-500" /> Observer Information
                  </h4>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                      <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{selectedSighting.observerName}</div>
                      <div className="text-xs text-slate-400">{selectedSighting.observerType} {selectedSighting.affiliation && `• ${selectedSighting.affiliation}`}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Reported Via</div>
                      <div className="text-xs text-slate-300">{selectedSighting.observationType}</div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdvancedFooter />
    </main>
  );
}
