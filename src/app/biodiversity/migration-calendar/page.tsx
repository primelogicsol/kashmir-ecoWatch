'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getMigrationCalendar, getMigratorySpecies, getFlywayData } from '@/data/biodiversity-access';
import type { MigrationType, Flyway } from '@/types/biodiversity';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { Card } from '@/components/ui/Card';
import { Map, Activity, Sun, ThermometerSun, Compass, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MigrationCalendarPage() {
  const calendar = getMigrationCalendar();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<MigrationType | 'all'>('all');
  const [filterFlyway, setFilterFlyway] = useState<Flyway | 'all'>('all');

  const allMigratory = getMigratorySpecies();

  const typeStats = {
    breeder: getMigratorySpecies('spring').filter(s => s.migrationWindow?.migrationType === 'breeder').length,
    winterVisitor: getMigratorySpecies('winter').filter(s => s.migrationWindow?.migrationType === 'winter-visitor').length,
    summerVisitor: getMigratorySpecies('summer').filter(s => s.migrationWindow?.migrationType === 'summer-visitor').length,
    passageMigrant: allMigratory.filter(s => s.migrationWindow?.migrationType === 'passage-migrant').length,
  };

  const filteredCalendar = calendar.map((month) => {
    let species = month.species;

    if (filterType !== 'all') {
      species = species.filter((s) => s.migrationWindow?.migrationType === filterType);
    }

    if (filterFlyway !== 'all') {
      species = species.filter((s) => s.migrationWindow?.flyway === filterFlyway);
    }

    return {
      ...month,
      species,
      peakSpecies: species.filter((s) => month.peakSpecies.includes(s)),
      arrivals: species.filter(s => s.migrationWindow?.arrivalMonth === month.month).map(s => s.id),
      departures: species.filter(s => s.migrationWindow?.departureMonth === month.month).map(s => s.id),
      description: `During ${month.name}, tracking indicates ${species.length} migratory species active across the region. High-priority arrivals and departures are closely monitored.`
    };
  });

  const selectedMonthData = selectedMonth ? filteredCalendar[selectedMonth - 1] : null;

  // Exact 8 KPIs to match Plants page layout
  const metrics = [
    { label: 'Total Migratory', value: allMigratory.length, icon: 'Activity' },
    { label: 'Validated Routes', value: 'High', icon: 'CheckCircle' },
    { label: 'Winter Visitors', value: typeStats.winterVisitor, icon: 'ThermometerSun' },
    { label: 'Summer Breeders', value: typeStats.breeder, icon: 'Sun' },
    { label: 'Flyways Tracked', value: 3, icon: 'Map' },
    { label: 'Active Sightings', value: '1.2K+', icon: 'Eye' },
    { label: 'Data Sources', value: 8, icon: 'Database' },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' },
  ];

  const filters = {
    habitats: ['Wetlands', 'Riverine forests', 'Alpine meadows', 'Lakes'],
    districts: ['Bandipora', 'Srinagar', 'Ganderbal', 'Baramulla'],
    conservationStatuses: ['LC', 'NT', 'VU', 'EN', 'CR'],
  };

  return (
    <BiodiversityCategoryPage
      title="Migration Intelligence Calendar"
      subtitle="Track migratory species presence throughout the year. Monitor arrival and departure patterns across Kashmir's wetlands and forests via the Central Asian Flyway."
      icon="Map"
      color="from-sky-500 to-blue-700"
      species={allMigratory}
      metrics={metrics}
      filters={filters}
    >
      <div className="space-y-8 pb-12">
        <Card className="glass-intense border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Filter Parameters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-2">Migration Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as MigrationType | 'all')}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors"
              >
                <option value="all">All Types</option>
                <option value="breeder">Breeder</option>
                <option value="winter-visitor">Winter Visitor</option>
                <option value="summer-visitor">Summer Visitor</option>
                <option value="passage-migrant">Passage Migrant</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-2">Flyway Matrix</label>
              <select
                value={filterFlyway}
                onChange={(e) => setFilterFlyway(e.target.value as Flyway | 'all')}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors"
              >
                <option value="all">All Flyways</option>
                <option value="central-asian">Central Asian Flyway</option>
                <option value="east-asian">East Asian Flyway</option>
                <option value="west-asian">West Asian Flyway</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></span>
            Annual Arrival & Departure Grid
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredCalendar.map((month) => (
              <button
                key={month.month}
                onClick={() => setSelectedMonth(selectedMonth === month.month ? null : month.month)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedMonth === month.month
                    ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.2)]'
                    : 'border-white/10 bg-black/20 hover:border-sky-500/30 hover:bg-white/5'
                }`}
              >
                <div className="font-bold text-white mb-3 text-lg">{MONTH_NAMES[month.month - 1]}</div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="uppercase tracking-widest text-[9px] text-slate-500">Active</span>
                    <span className="font-bold bg-white/10 px-2 py-0.5 rounded">{month.species.length}</span>
                  </div>
                  {month.peakSpecies.length > 0 && (
                    <div className="flex justify-between items-center text-amber-400">
                      <span className="uppercase tracking-widest text-[9px] opacity-70">Peak</span>
                      <span className="font-bold bg-amber-500/20 px-2 py-0.5 rounded">{month.peakSpecies.length}</span>
                    </div>
                  )}
                  {month.arrivals.length > 0 && (
                    <div className="flex justify-between items-center text-emerald-400">
                      <span className="uppercase tracking-widest text-[9px] opacity-70">Arrivals</span>
                      <span className="font-bold bg-emerald-500/20 px-2 py-0.5 rounded">{month.arrivals.length}</span>
                    </div>
                  )}
                  {month.departures.length > 0 && (
                    <div className="flex justify-between items-center text-rose-400">
                      <span className="uppercase tracking-widest text-[9px] opacity-70">Departing</span>
                      <span className="font-bold bg-rose-500/20 px-2 py-0.5 rounded">{month.departures.length}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedMonthData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <Card className="glass-intense border-sky-500/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center bg-black/20">
                  <h2 className="text-2xl font-bold text-white">
                    {MONTH_NAMES[selectedMonthData.month - 1]} Intel Overview
                  </h2>
                  <button 
                    onClick={() => setSelectedMonth(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-300 mb-8 max-w-3xl leading-relaxed">
                    {selectedMonthData.description}
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-300 border-b border-white/10 pb-2 mb-4 uppercase tracking-widest">
                          Active Demographics ({selectedMonthData.species.length})
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedMonthData.species.map((species) => (
                            <div key={species.id} className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5 hover:border-sky-500/30 transition-colors group">
                              <div className={`w-2 h-2 rounded-full ${
                                selectedMonthData.peakSpecies.includes(species) ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' :
                                selectedMonthData.arrivals.includes(species.id) ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                                selectedMonthData.departures.includes(species.id) ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]' :
                                'bg-sky-500'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <Link href={`/biodiversity/${species.taxonomicGroup}/${species.slug}`} className="font-bold text-white truncate block group-hover:text-sky-400 transition-colors">
                                  {species.commonName}
                                </Link>
                                <div className="text-[10px] text-slate-500 italic truncate">{species.scientificName}</div>
                              </div>
                              <span className="text-[9px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300 uppercase tracking-widest">
                                {species.migrationWindow?.migrationType?.replace('-', ' ')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {selectedMonthData.arrivals.length > 0 && (
                        <div className="bg-emerald-500/10 rounded-lg p-5 border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-400 flex items-center gap-2 mb-4 uppercase tracking-widest text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Key Arrivals
                          </h4>
                          <ul className="space-y-3 text-sm text-slate-300">
                            {selectedMonthData.species
                              .filter(s => selectedMonthData.arrivals.includes(s.id))
                              .slice(0, 5)
                              .map(s => (
                                <li key={s.id} className="flex justify-between border-b border-emerald-500/20 pb-2">
                                  <span className="font-medium">{s.commonName}</span>
                                  <span className="text-[9px] uppercase tracking-widest opacity-50">{s.migrationWindow?.migrationType}</span>
                                </li>
                              ))
                            }
                            {selectedMonthData.arrivals.length > 5 && (
                              <li className="text-emerald-500/70 italic text-xs pt-1">+ {selectedMonthData.arrivals.length - 5} additional targets</li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      {selectedMonthData.departures.length > 0 && (
                        <div className="bg-rose-500/10 rounded-lg p-5 border border-rose-500/20">
                          <h4 className="font-bold text-rose-400 flex items-center gap-2 mb-4 uppercase tracking-widest text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Key Departures
                          </h4>
                          <ul className="space-y-3 text-sm text-slate-300">
                            {selectedMonthData.species
                              .filter(s => selectedMonthData.departures.includes(s.id))
                              .slice(0, 5)
                              .map(s => (
                                <li key={s.id} className="flex justify-between border-b border-rose-500/20 pb-2">
                                  <span className="font-medium">{s.commonName}</span>
                                  <span className="text-[9px] uppercase tracking-widest opacity-50">{s.migrationWindow?.migrationType}</span>
                                </li>
                              ))
                            }
                            {selectedMonthData.departures.length > 5 && (
                              <li className="text-rose-500/70 italic text-xs pt-1">+ {selectedMonthData.departures.length - 5} additional targets</li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      <div className="bg-amber-500/10 rounded-lg p-5 border border-amber-500/20 text-center">
                        <h4 className="font-bold text-amber-400 flex justify-center items-center gap-2 mb-3 uppercase tracking-widest text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Peak Activity Payload
                        </h4>
                        <div className="text-5xl font-black text-amber-500 mb-2 tabular-nums drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                          {selectedMonthData.peakSpecies.length}
                        </div>
                        <div className="text-xs text-amber-500/70 uppercase tracking-widest">Targets at Peak Density</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </BiodiversityCategoryPage>
  );
}
