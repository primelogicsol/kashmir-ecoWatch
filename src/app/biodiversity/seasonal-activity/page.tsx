'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope } from '@/data/geography';
import { getSpeciesActivities } from '@/data/seasonal-ecology';
import { SpeciesActivity } from '@/types/seasonal-ecology';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Bird, Mountain, Fish, Flower2, Activity, Clock, Sprout, Search, Filter, ChevronLeft, ChevronRight, X, Bug, PawPrint, Info, MapPin, Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const taxonIcons: Record<string, React.ElementType> = {
  mammals: PawPrint,
  birds: Bird,
  plants: Sprout,
  insects: Bug,
  amphibians: Fish,
  fish: Fish,
};

const activityTypeColors: Record<string, string> = {
  breeding: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  migration: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  flowering: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  fruiting: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  foraging: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  hibernation: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  'visibility-peak': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function SeasonalActivityPage() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedTaxon, setSelectedTaxon] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<string>('all');

  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesActivity | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const activities = useMemo(() => getSpeciesActivities(), []);
  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = ['All', ...GEOGRAPHY.scopes];
  
  const taxa = useMemo(() => Array.from(new Set(activities.map(a => a.taxonomicGroup))).sort(), [activities]);
  const activityTypes = useMemo(() => Array.from(new Set(activities.map(a => a.activityType))).sort(), [activities]);

  const filteredActivities = useMemo(() => {
    return activities.filter(a => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        a.speciesName.toLowerCase().includes(query) ||
        a.speciesCommonName.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query);

      // District mapping to Kashmir district names or platform-wide matching
      const matchesDistrict = selectedDistrict === 'All' || a.districts.some(d => d.toLowerCase() === selectedDistrict.toLowerCase());
      const matchesTaxon = selectedTaxon === 'all' || a.taxonomicGroup === selectedTaxon;
      const matchesActivity = selectedActivity === 'all' || a.activityType === selectedActivity;

      return matchesSearch && matchesDistrict && matchesTaxon && matchesActivity;
    });
  }, [searchQuery, selectedDistrict, selectedTaxon, selectedActivity, activities]);

  const breedingCount = activities.filter(a => a.activityType === 'breeding').length;
  const migrationCount = activities.filter(a => a.activityType === 'migration').length;
  
  const monthlyCounts = Array(12).fill(0).map((_, mi) => {
    const month = mi + 1;
    return filteredActivities.filter(a => a.peakMonths.includes(month)).length;
  });
  const maxMonthly = Math.max(...monthlyCounts, 1);

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title="Seasonal Species Activity"
        subtitle="Breeding periods, activity windows, appearance/disappearance timing, altitudinal movement cues, and seasonal behavior notes."
        icon={<Calendar className="w-6 h-6 text-violet-400" />}
        label="Biodiversity Intelligence"
        breadcrumbs={[{ label: 'Biodiversity', href: '/biodiversity' }, { label: 'Seasonal Activity' }]}
        images={['/images/habitat.png']}
        actions={
          <div className="flex gap-3">
            <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Clock className="w-5 h-5" />} onClick={() => router.push('/biodiversity/migration-windows')}>
              Migration Windows
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Flower2 className="w-5 h-5" />} onClick={() => router.push('/biodiversity/phenology-flowering')}>
              Phenology Records
            </Button>
          </div>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Activity Records', value: activities.length, icon: Calendar, color: 'text-violet-400', bg: 'bg-violet-500/10' },
                { label: 'Breeding Periods', value: breedingCount, icon: Flower2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'Migration Events', value: migrationCount, icon: Bird, color: 'text-sky-400', bg: 'bg-sky-500/10' },
                { label: 'Taxa Covered', value: taxa.length, icon: Mountain, color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
                { label: 'Peak Month Activity', value: Math.max(...monthlyCounts), icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-white/5">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Monthly Activity Heatmap</h2>
        <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
          {monthNames.map((month, mi) => (
            <div key={month} className="text-center group">
              <div className="text-[10px] sm:text-xs text-slate-400 mb-1.5 uppercase tracking-wider">{month}</div>
              <div className="h-24 bg-slate-900/50 rounded-lg border border-white/5 relative overflow-hidden group-hover:border-violet-500/50 transition-colors">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-violet-600/40 to-violet-500/20 transition-all duration-500"
                  style={{ height: `${(monthlyCounts[mi] / maxMonthly) * 100}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-sm font-bold ${monthlyCounts[mi] > 0 ? 'text-white' : 'text-slate-600'}`}>
                    {monthlyCounts[mi]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
              <strong className="text-white">{filteredActivities.length}</strong> of <strong className="text-white">{activities.length}</strong> records
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
                  placeholder="e.g. Hangul, Bird..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              >
                {availableScopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Admin Unit</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units</option>
                {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Taxonomic Group</label>
              <select
                value={selectedTaxon}
                onChange={(e) => { setSelectedTaxon(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              >
                <option value="all">All Taxa</option>
                {taxa.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Activity Type</label>
              <select
                value={selectedActivity}
                onChange={(e) => { setSelectedActivity(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              >
                <option value="all">All Activity Types</option>
                {activityTypes.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((a, idx) => {
              const IconComponent = taxonIcons[a.taxonomicGroup] || Activity;
              return (
                <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                  <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                    <div className="p-5 border-b border-white/5 bg-white/5 relative">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="outline" className={activityTypeColors[a.activityType] || 'bg-slate-700/50 text-slate-300'}>
                          {a.activityType.replace(/-/g, ' ')}
                        </Badge>
                        <Badge variant="outline" className="border-white/20 capitalize">{a.taxonomicGroup}</Badge>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                          <IconComponent className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors mb-0.5">
                            {a.speciesCommonName}
                          </h3>
                          <p className="text-sm italic text-slate-400">{a.speciesName}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                        {a.description}
                      </p>

                      <div className="space-y-3 mb-4 flex-1">
                        <div className="text-xs text-slate-300 flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5">
                          <Clock className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-slate-500">Activity Window:</span> Month {a.activityWindow.startMonth}–{a.activityWindow.endMonth}
                        </div>
                        <div className="text-xs text-slate-300 flex items-center gap-2 bg-black/20 p-2 rounded border border-white/5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-slate-500">Peak:</span> {a.peakMonths.map(m => monthNames[m-1]).join(', ')}
                        </div>
                      </div>

                      <div className="mt-auto pt-4 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => setSelectedSpecies(a)} className="w-full border-violet-500/30 text-violet-400 hover:bg-violet-500 hover:text-white transition-colors">
                          View Seasonal Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            {filteredActivities.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredActivities.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredActivities.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page ? 'bg-violet-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredActivities.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredActivities.length / itemsPerPage)}
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
            <Activity className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No activities found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your search criteria</p>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('All');
              setSelectedTaxon('all');
              setSelectedActivity('all');
            }}>Reset Filters</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedSpecies && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-violet-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={activityTypeColors[selectedSpecies.activityType] || 'bg-slate-700/50 text-slate-300'}>
                      {selectedSpecies.activityType.replace(/-/g, ' ')}
                    </Badge>
                    <Badge variant="outline" className="border-white/20 capitalize">{selectedSpecies.taxonomicGroup}</Badge>
                    <Badge variant="outline" className="border-white/20 capitalize">{selectedSpecies.elevationZone}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedSpecies.speciesCommonName}</h2>
                  <p className="text-violet-400 italic text-sm">{selectedSpecies.speciesName}</p>
                </div>
                <button
                  onClick={() => setSelectedSpecies(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-violet-500" /> Activity Details
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedSpecies.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Timing Window</div>
                    <div className="text-sm text-white font-medium mb-3">Month {selectedSpecies.activityWindow.startMonth} to Month {selectedSpecies.activityWindow.endMonth}</div>
                    
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Peak Months</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSpecies.peakMonths.map(m => (
                        <span key={m} className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-xs font-semibold">{monthNames[m-1]}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Tracked Districts</div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {selectedSpecies.districts.map(d => (
                        <span key={d} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-xs border border-white/10 capitalize">{d}</span>
                      ))}
                    </div>
                    
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Sprout className="w-3.5 h-3.5" /> Habitat Usage</div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSpecies.habitatTypes.map(h => (
                        <span key={h} className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 text-xs capitalize">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {(selectedSpecies.conservationContext || selectedSpecies.protectedAreas) && (
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-500" /> Conservation & Protection
                    </h4>
                    {selectedSpecies.conservationContext && (
                      <p className="text-sm text-slate-300 leading-relaxed mb-3">
                        {selectedSpecies.conservationContext}
                      </p>
                    )}
                    {selectedSpecies.protectedAreas && selectedSpecies.protectedAreas.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedSpecies.protectedAreas.map(pa => (
                          <span key={pa} className="text-xs px-2 py-1 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-500/10 flex items-center gap-1.5">
                            <Shield className="w-3 h-3" /> {pa}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdvancedFooter />
    </main>
  );
}
