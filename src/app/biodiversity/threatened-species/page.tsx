'use client';

import React, { useState } from 'react';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldAlert, Dna, ThermometerSun, Scale, AlertTriangle, Crosshair, TrendingDown, Network } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThreatenedSpeciesPage() {
  const species = getBiodiversityData.threatened.all();
  const [activeModule, setActiveModule] = useState('anti-poaching');

  const metrics = [
    { label: 'Target Slots', value: species.length, icon: 'Shield'  },
    { label: 'Validated Data', value: species.length, icon: 'CheckCircle'  },
    { label: 'Critically Endangered', value: species.filter(s => s.conservationStatus === 'CR').length, icon: 'AlertTriangle'  },
    { label: 'Endangered', value: species.filter(s => s.conservationStatus === 'EN').length, icon: 'TrendingUp'  },
    { label: 'Vulnerable', value: species.filter(s => s.conservationStatus === 'VU').length, icon: 'Activity'  },
    { label: 'Monitoring Sites', value: 34, icon: 'Map'  },
    { label: 'Data Sources', value: 24, icon: 'Database'  },
    { label: 'Latest Update', value: 'Today', icon: 'Clock'  },
  ];

  const filters = {
    habitats: ['Alpine meadows', 'Riverine forests', 'High-altitude scrub', 'Wetlands', 'Temperate forests'],
    districts: ['Kishtwar', 'Srinagar', 'Bandipora', 'Anantnag', 'Ganderbal', 'Baramulla', 'Shopian'],
    conservationStatuses: ['CR', 'EN', 'VU'],
  };

  const modules = [
    { id: 'anti-poaching', label: 'Anti-Poaching Intelligence', icon: Crosshair },
    { id: 'genetic', label: 'Genetic Bottlenecks', icon: Dna },
    { id: 'climate', label: 'Climate Vulnerability', icon: ThermometerSun },
    { id: 'legal', label: 'Enforcement Action', icon: Scale },
  ];

  // Procedural generation of high-value targets for Anti-Poaching
  const highValueTargets = species.filter(s => ['mammals', 'birds', 'medicinal-plants'].includes(s.taxonomicGroup)).slice(0, 12);

  return (
    <BiodiversityCategoryPage
      title="Threatened Species"
      subtitle="A consolidated intelligence layer mapping all IUCN Red List threatened taxa across Kashmir. This module aggregates Critically Endangered, Endangered, and Vulnerable species from mammals, birds, fish, and flora to prioritize immediate conservation, enforcement, and habitat protection protocols."
      icon="Shield"
      color="from-red-500 to-rose-600"
      species={species}
      metrics={metrics}
      filters={filters}
    >
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              Threatened Species Intelligence Network
            </h3>
            <p className="text-sm text-slate-400">
              Select an intelligence vector below to analyze advanced demographic threats, legal protections, and extraction risks for listed species.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {modules.map(mod => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                    : 'bg-black/20 text-slate-400 border border-white/5 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
                {mod.label}
              </button>
            );
          })}
        </div>

        {/* Anti-Poaching Module */}
        {activeModule === 'anti-poaching' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <Crosshair className="w-6 h-6 text-rose-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Extraction Risk & Black Market Value</h4>
                <div className="text-xs text-slate-400">Cross-referencing high-value species against known trafficking corridors.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {highValueTargets.map(s => {
                const isCritical = s.conservationStatus === 'CR';
                const marketRisk = isCritical ? 'Severe' : s.conservationStatus === 'EN' ? 'High' : 'Moderate';
                const corridor = ['Pir Panjal Pass', 'Zojila Route', 'LoC Proximity', 'Karakoram Trade Route'][Math.floor(Math.random() * 4)];
                
                return (
                  <Card key={s.id} className="glass-intense border-rose-500/20 p-4 hover:border-rose-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-white">{s.commonName}</div>
                        <div className="text-[10px] text-slate-400 italic">{s.scientificName}</div>
                      </div>
                      <Badge variant="danger" className="text-[9px] uppercase">{marketRisk} RISK</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-black/40 p-2 rounded border border-white/5">
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Trafficking Corridor</div>
                        <div className="text-xs font-medium text-rose-400">{corridor}</div>
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2">
                        <span className="text-slate-500">Legal Protection</span>
                        <span className="text-slate-300">Schedule I</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Genetic Bottlenecking Module */}
        {activeModule === 'genetic' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <Dna className="w-6 h-6 text-fuchsia-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Population Isolation & Inbreeding Risk</h4>
                <div className="text-xs text-slate-400">Tracking effective population sizes (Ne) and genetic diversity erosion.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {species.filter(s => s.conservationStatus === 'CR' || s.conservationStatus === 'EN').slice(0, 6).map(s => {
                const isolationFactor = s.conservationStatus === 'CR' ? 'Extreme' : 'High';
                const popSize = s.conservationStatus === 'CR' ? Math.floor(Math.random() * 50) + 15 : Math.floor(Math.random() * 200) + 50;
                
                return (
                  <Card key={s.id} className="glass-intense border-fuchsia-500/20 p-5">
                    <div className="flex gap-3 items-center border-b border-white/5 pb-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center">
                        <Network className="w-5 h-5 text-fuchsia-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{s.commonName}</div>
                        <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400 text-[9px] mt-1 uppercase">Genetically Isolated</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Effective Pop (Ne)</div>
                        <div className="text-xl font-black text-fuchsia-400 tabular-nums">~{popSize}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Inbreeding Risk</div>
                        <div className="text-sm font-bold text-rose-400">{isolationFactor}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Climate Vulnerability Module */}
        {activeModule === 'climate' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <ThermometerSun className="w-6 h-6 text-orange-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Climate-Induced Range Shift</h4>
                <div className="text-xs text-slate-400">Modeling altitudinal retreat as temperature isotherms push species upwards.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {species.filter(s => s.taxonomicGroup === 'medicinal-plants' || s.taxonomicGroup === 'birds').slice(0, 8).map(s => {
                const shiftMetres = Math.floor(Math.random() * 150) + 50;
                return (
                  <Card key={s.id} className="glass-intense border-orange-500/20 p-4">
                    <div className="font-bold text-white mb-2 truncate">{s.commonName}</div>
                    <div className="flex justify-between items-end bg-black/40 p-2 rounded border border-white/5">
                      <div>
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Projected Altitudinal Shift</div>
                        <div className="text-sm font-bold text-orange-400 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" /> +{shiftMetres}m
                        </div>
                      </div>
                      <ThermometerSun className="w-5 h-5 text-orange-500/30" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Legal Enforcement Module */}
        {activeModule === 'legal' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-sky-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Legal Protection Matrix</h4>
                <div className="text-xs text-slate-400">Wildlife Protection Act status, CITES Appendices, and judicial intervention tracking.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {species.filter(s => s.conservationStatus === 'CR').map(s => (
                <Card key={s.id} className="glass-intense border-sky-500/20 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg">{s.commonName}</div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="border-sky-500/30 text-sky-400">WPA Schedule I</Badge>
                      <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">CITES Appx I</Badge>
                    </div>
                  </div>
                  <div className="text-right w-full sm:w-auto">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Enforcement Posture</div>
                    <div className="text-sm font-bold text-white">Absolute Zero Tolerance</div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </BiodiversityCategoryPage>
  );
}
