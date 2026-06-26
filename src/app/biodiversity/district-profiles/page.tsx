'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Building2, MapPin, Shield, ArrowRight, Bird, Mountain, Fish, Sprout, AlertTriangle, Leaf, Search, BarChart3, TreePine, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getAllDistrictProfiles, DistrictBiodiversityProfile } from '@/data/biodiversity-district-aggregator';

export default function DistrictProfilesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState('All');
  const allProfiles = getAllDistrictProfiles();

  const filteredDistricts = allProfiles.filter(d => {
    const matchesSearch = !searchQuery || d.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScope = scopeFilter === 'All' || d.scope === scopeFilter;
    return matchesSearch && matchesScope;
  });

  const totalSpecies = allProfiles.reduce((sum, d) => sum + d.speciesSummary.total, 0);
  const avgSpecies = allProfiles.length > 0 ? Math.round(totalSpecies / allProfiles.length) : 0;
  
  const sortedProfiles = [...allProfiles].sort((a, b) => b.speciesSummary.total - a.speciesSummary.total);
  const highestRichness = sortedProfiles.length > 0 ? sortedProfiles[0] : null;
  
  const mostThreatened = [...allProfiles].sort((a, b) => b.speciesSummary.threatened - a.speciesSummary.threatened)[0] || null;

  // Top 5 for comparison table
  const top5 = sortedProfiles.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden bg-slate-900/50">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-violet-400" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">Biodiversity Intelligence</span>
            </div>
            <h1 className="max-w-xl text-4xl md:text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">District Biodiversity Profiles</h1>
            <p className="text-lg text-slate-400 mb-6">
              Real-time regional biodiversity intelligence aggregated directly from Kashmir Eco Watch databases — species richness, key habitats, verified sightings, and ecological intelligence.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-violet-500" icon={<BarChart3 className="w-5 h-5" />} onClick={() => router.push('/biodiversity/dashboards')}>
              View Analytics Dashboard
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Districts', value: allProfiles.length, icon: Building2 },
              { label: 'Total Species Entries', value: totalSpecies, icon: Leaf },
              { label: 'Avg Species/District', value: avgSpecies, icon: MapPin },
              { label: 'Highest Richness', value: highestRichness?.district || 'Data Pending', icon: Mountain, isText: true },
              { label: 'Most Threatened', value: mostThreatened?.district || 'Data Pending', icon: AlertTriangle, isText: true },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 text-violet-400 mx-auto mb-1`} />
                <div className={`text-xl font-bold text-white ${(stat as any).isText ? 'text-sm' : ''}`}>{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Card className="border border-white/10 bg-slate-900/50 flex-1" padding="md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search districts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50" />
            </div>
          </Card>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['All', 'Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'].map(scope => (
              <button
                key={scope}
                onClick={() => setScopeFilter(scope)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border whitespace-nowrap ${
                  scopeFilter === scope 
                    ? 'bg-violet-600/20 text-violet-300 border-violet-500/30' 
                    : 'bg-slate-800/50 text-slate-400 border-white/5 hover:bg-slate-700/50'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>
        </div>

        {/* Top 5 Comparison Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Top 5 Districts by Species Richness</h2>
          <Card className="border border-white/10 bg-slate-900/30 overflow-x-auto" padding="md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">District</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">Total</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Mountain className="w-3 h-3 inline" /> Mammals</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Bird className="w-3 h-3 inline" /> Birds</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Fish className="w-3 h-3 inline" /> Fish</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Sprout className="w-3 h-3 inline" /> Plants</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Shield className="w-3 h-3 inline" /> Threatened</th>
                </tr>
              </thead>
              <tbody>
                {top5.map((d, i) => (
                  <tr key={d.district} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2 px-3 text-white font-medium">{d.district}</td>
                    <td className="py-2 px-3 text-right text-white font-bold">{d.speciesSummary.total > 0 ? d.speciesSummary.total : 'Data Pending'}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.speciesSummary.mammals || '—'}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.speciesSummary.birds || '—'}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.speciesSummary.fish || '—'}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.speciesSummary.plants || '—'}</td>
                    <td className="py-2 px-3 text-right text-orange-300">{d.speciesSummary.threatened || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* District Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDistricts.map((d, i) => (
            <motion.div key={d.district} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 hover:border-violet-500/30 transition-all h-full flex flex-col" padding="md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{d.district}</h3>
                    {d.speciesSummary.total > 0 ? (
                      <div className="text-3xl font-black text-violet-400">{d.speciesSummary.total}</div>
                    ) : (
                      <div className="text-xl font-bold text-slate-500 mt-1 mb-1">Data Pending</div>
                    )}
                    <div className="text-xs text-slate-500">total species records</div>
                  </div>
                  <Badge className="text-[10px] uppercase tracking-wider bg-slate-800/80 text-slate-300 border border-white/10">{d.scope}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4 p-3 bg-slate-950/50 rounded-lg">
                  <div className="text-slate-400"><Mountain className="w-3 h-3 inline mr-1" />{d.speciesSummary.mammals || 0} mammals</div>
                  <div className="text-slate-400"><Bird className="w-3 h-3 inline mr-1" />{d.speciesSummary.birds || 0} birds</div>
                  <div className="text-slate-400"><Fish className="w-3 h-3 inline mr-1" />{d.speciesSummary.fish || 0} fish</div>
                  <div className="text-slate-400"><Sprout className="w-3 h-3 inline mr-1" />{d.speciesSummary.plants || 0} plants</div>
                  <div className="text-orange-300"><Shield className="w-3 h-3 inline mr-1" />{d.speciesSummary.threatened || 0} threatened</div>
                  <div className="text-emerald-300"><Leaf className="w-3 h-3 inline mr-1" />{d.speciesSummary.endemic || 0} endemic</div>
                </div>

                <div className="space-y-3 text-xs mb-4">
                  <div>
                    <div className="text-slate-500 mb-1 flex items-center gap-1"><TreePine className="w-3 h-3" /> Habitat Profile</div>
                    {(d.habitatSummary.forestCoverPercentage || d.habitatSummary.forestCoverSqKm) ? (
                      <div className="text-slate-300">Forest Cover: <span className="font-medium text-emerald-400">
                        {d.habitatSummary.forestCoverSqKm ? `${d.habitatSummary.forestCoverSqKm.toLocaleString()} sq km` : ''}
                        {d.habitatSummary.forestCoverSqKm && d.habitatSummary.forestCoverPercentage ? ' (' : ''}
                        {d.habitatSummary.forestCoverPercentage ? `${d.habitatSummary.forestCoverPercentage}%` : ''}
                        {d.habitatSummary.forestCoverSqKm && d.habitatSummary.forestCoverPercentage ? ')' : ''}
                      </span></div>
                    ) : (
                      <div className="text-slate-500 italic">Forest Cover: Data Pending</div>
                    )}
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1 flex items-center gap-1"><Droplet className="w-3 h-3" /> Water Systems</div>
                    <div className="text-slate-300">
                      {[
                        d.habitatSummary.lakesCount > 0 && `${d.habitatSummary.lakesCount} Lakes`,
                        d.habitatSummary.wetlandsCount > 0 && `${d.habitatSummary.wetlandsCount} Wetlands`,
                        d.habitatSummary.riversCount > 0 && `${d.habitatSummary.riversCount} Rivers`,
                        d.habitatSummary.springsCount > 0 && `${d.habitatSummary.springsCount} Springs`
                      ].filter(Boolean).join(', ') || 'No Source Data'}
                    </div>
                  </div>
                  {d.habitatSummary.protectedAreasCount > 0 ? (
                    <div>
                      <div className="text-slate-500 mb-1">Protected Areas ({d.habitatSummary.protectedAreasCount})</div>
                      <div className="text-slate-300 truncate" title={d.habitatSummary.protectedAreaNames.join(', ')}>{d.habitatSummary.protectedAreaNames.slice(0, 2).join(', ')}{d.habitatSummary.protectedAreaNames.length > 2 ? '...' : ''}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-slate-500">Protected Areas: None verified</div>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-3 border-t border-white/5">
                  <button onClick={() => router.push(`/biodiversity/district-profiles/${d.district.toLowerCase().replace(/\s+/g, '-')}`)} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    View Full Profile <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
    </main>
  );
}
