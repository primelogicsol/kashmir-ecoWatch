'use client';

import React, { useState, useMemo } from 'react';
import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  ShieldAlert, Dna, ThermometerSun, Scale, AlertTriangle, Crosshair, 
  TrendingDown, Network, ShieldCheck, MapPin, Activity, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GEOGRAPHY } from '@/data/geography';

export default function ThreatenedSpeciesPage() {
  const species = getBiodiversityData.threatened.all();
  const [activeModule, setActiveModule] = useState<'anti-poaching' | 'genetic' | 'climate' | 'legal'>('anti-poaching');

  // Exact deterministic metrics calculated from the 60-species database
  const metrics = useMemo(() => [
    { label: 'Threatened Taxa', value: species.length, icon: 'Shield' },
    { label: 'Critically Endangered', value: species.filter(s => s.conservationStatus === 'CR').length, icon: 'AlertTriangle' },
    { label: 'Endangered (EN)', value: species.filter(s => s.conservationStatus === 'EN').length, icon: 'TrendingUp' },
    { label: 'Vulnerable (VU)', value: species.filter(s => s.conservationStatus === 'VU').length, icon: 'Activity' },
    { label: 'Near Threatened', value: species.filter(s => s.conservationStatus === 'NT').length, icon: 'CheckCircle' },
    { label: 'WPA Schedule I', value: species.filter(s => s.nationalStatus?.includes('Schedule I')).length, icon: 'Scale' },
    { label: 'CITES Appx I & II', value: species.filter(s => s.citesListing?.includes('CITES')).length, icon: 'Crosshair' },
    { label: 'Active Sanctuaries', value: 34, icon: 'Map' },
  ], [species]);

  // Full multi-scope district and habitat coverage
  const allDistricts = useMemo(() => {
    return Array.from(new Set([
      ...GEOGRAPHY.units['Kashmir Core'],
      ...GEOGRAPHY.units['Jammu'],
      ...GEOGRAPHY.units['Ladakh'],
      ...GEOGRAPHY.units['AJK'],
      ...GEOGRAPHY.units['Gilgit-Baltistan'],
    ])).sort();
  }, []);

  const allHabitats = useMemo(() => {
    return Array.from(new Set(species.flatMap(s => s.habitats))).sort();
  }, [species]);

  const filters = {
    habitats: allHabitats,
    districts: allDistricts,
    conservationStatuses: ['CR', 'EN', 'VU', 'NT'],
  };

  const modules = [
    { id: 'anti-poaching', label: 'Anti-Poaching Intelligence', icon: Crosshair },
    { id: 'genetic', label: 'Genetic Bottlenecks', icon: Dna },
    { id: 'climate', label: 'Climate Vulnerability', icon: ThermometerSun },
    { id: 'legal', label: 'Enforcement Action', icon: Scale },
  ] as const;

  // Filtered target lists based on authentic attributes
  const highTraffickingTargets = useMemo(() => {
    return species.filter(s => s.traffickingCorridor && s.traffickingRisk).slice(0, 12);
  }, [species]);

  const geneticBottleneckTargets = useMemo(() => {
    return species.filter(s => s.effectivePopulationNe && s.inbreedingRisk).slice(0, 6);
  }, [species]);

  const climateVulnerabilityTargets = useMemo(() => {
    return species.filter(s => s.projectedAltitudinalShift && s.climateVulnerability).slice(0, 8);
  }, [species]);

  const legalEnforcementTargets = useMemo(() => {
    return species.filter(s => s.conservationStatus === 'CR' || s.conservationStatus === 'EN').slice(0, 8);
  }, [species]);

  return (
    <BiodiversityCategoryPage
      title="Western Himalayan Threatened Species"
      subtitle="A consolidated intelligence layer mapping all verified IUCN Red List threatened taxa across Kashmir Core, Jammu, Ladakh, Azad Kashmir, and Gilgit-Baltistan. Aggregates Critically Endangered (CR), Endangered (EN), Vulnerable (VU), and Near Threatened (NT) taxa across mammals, birds, fish, and alpine flora to prioritize anti-poaching enforcement and transboundary habitat corridors."
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
              Select an intelligence vector below to analyze demographic thresholds, anti-poaching transit routes, genetic isolation indices, and statutory wildlife legal protections.
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

        {/* 1. Anti-Poaching Intelligence Module */}
        {activeModule === 'anti-poaching' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <Crosshair className="w-6 h-6 text-rose-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Extraction Risk & Black Market Trafficking Corridors</h4>
                <div className="text-xs text-slate-400">Cross-referencing high-value wildlife and botanical taxa against documented smuggling routes.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {highTraffickingTargets.map(s => {
                const isCritical = s.traffickingRisk === 'Critical Risk';
                const riskBadge = isCritical ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40';

                return (
                  <Card key={s.id} className="glass-intense border-rose-500/20 p-4 hover:border-rose-500/50 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            {s.commonName}
                          </div>
                          {s.localName && (
                            <div className="text-[11px] text-emerald-400 font-medium">{s.localName}</div>
                          )}
                          <div className="text-[10px] text-slate-400 italic">{s.scientificName}</div>
                        </div>
                        <span className={`text-[9px] uppercase px-2 py-0.5 rounded border font-bold ${riskBadge}`}>
                          {s.traffickingRisk}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mt-3">
                        <div className="bg-black/40 p-2 rounded border border-white/5">
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Known Corridor</div>
                          <div className="text-xs font-medium text-rose-300">{s.traffickingCorridor}</div>
                        </div>
                        {s.estimatedWildPopulation && (
                          <div className="bg-black/20 p-2 rounded border border-white/5">
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Surviving Population</div>
                            <div className="text-xs text-slate-300 font-mono">{s.estimatedWildPopulation}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2.5 mt-3">
                      <span className="text-slate-500 text-[11px]">{s.nationalStatus || 'Protected'}</span>
                      <span className="text-emerald-400 text-[11px] font-medium">{s.citesListing || 'Protected Flora/Fauna'}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 2. Genetic Bottlenecks & Inbreeding Module */}
        {activeModule === 'genetic' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <Dna className="w-6 h-6 text-fuchsia-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Population Isolation & Effective Breeding Size (Ne)</h4>
                <div className="text-xs text-slate-400">Tracking reproductive isolation thresholds and genetic drift risks across isolated mountain ranges.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {geneticBottleneckTargets.map(s => (
                <Card key={s.id} className="glass-intense border-fuchsia-500/20 p-5">
                  <div className="flex gap-3 items-center border-b border-white/5 pb-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center shrink-0">
                      <Network className="w-5 h-5 text-fuchsia-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{s.commonName}</div>
                      {s.localName && <div className="text-xs text-emerald-400 font-medium">{s.localName}</div>}
                      <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400 text-[9px] mt-1 uppercase">
                        {s.endemismStatus.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Effective Pop (Ne)</div>
                      <div className="text-base font-bold text-fuchsia-300 font-mono">{s.effectivePopulationNe}</div>
                    </div>
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">IUCN Red List</div>
                      <div className="text-base font-bold text-rose-400">{s.conservationStatus}</div>
                    </div>
                  </div>

                  <div className="bg-fuchsia-950/20 border border-fuchsia-500/20 p-2.5 rounded-lg">
                    <div className="text-[10px] text-fuchsia-400 uppercase tracking-wider font-semibold mb-1">Genetic Threat Vector</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{s.inbreedingRisk}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* 3. Climate Vulnerability Module */}
        {activeModule === 'climate' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <ThermometerSun className="w-6 h-6 text-orange-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Climate-Induced Range Shift & Isotherm Retreat</h4>
                <div className="text-xs text-slate-400">Modeled altitudinal shifts as rising Western Himalayan temperatures compress subalpine and alpine habitats.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {climateVulnerabilityTargets.map(s => (
                <Card key={s.id} className="glass-intense border-orange-500/20 p-4 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-white truncate mb-0.5">{s.commonName}</div>
                    {s.localName && <div className="text-xs text-emerald-400 font-medium mb-1.5">{s.localName}</div>}
                    <div className="text-[11px] text-slate-400 italic mb-3">{s.scientificName}</div>
                    
                    <div className="bg-black/40 p-2.5 rounded border border-white/5 mb-2.5">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Projected Altitudinal Shift</div>
                      <div className="text-sm font-bold text-orange-400 flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 rotate-180 text-orange-400" />
                        {s.projectedAltitudinalShift}
                      </div>
                    </div>

                    <div className="bg-orange-950/20 border border-orange-500/20 p-2 rounded">
                      <div className="text-[9px] text-orange-400 uppercase tracking-widest mb-0.5">Vulnerability Vector</div>
                      <div className="text-xs text-slate-300">{s.climateVulnerability}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 mt-3 pt-2 border-t border-white/5 flex justify-between">
                    <span>Elevation Range</span>
                    <span className="font-mono text-slate-300">{s.elevationRange.min}m - {s.elevationRange.max}m</span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* 4. Legal Enforcement Module */}
        {activeModule === 'legal' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6 text-sky-500" />
              <div>
                <h4 className="text-lg font-bold text-white">Statutory Wildlife Protection Matrix & Enforcement Actions</h4>
                <div className="text-xs text-slate-400">Indian Wildlife Protection Act (1972) Schedule classification, CITES listing, and core on-ground recovery interventions.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {legalEnforcementTargets.map(s => (
                <Card key={s.id} className="glass-intense border-sky-500/20 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="font-bold text-white text-lg flex items-center gap-2">
                          {s.commonName}
                          <Badge variant={s.conservationStatus === 'CR' ? 'danger' : 'warning'} className="text-[10px]">
                            {s.conservationStatus}
                          </Badge>
                        </div>
                        {s.localName && <div className="text-xs text-emerald-400 font-medium">{s.localName}</div>}
                        <p className="text-xs italic text-slate-400">{s.scientificName}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-500/20">
                        <Scale className="w-5 h-5 text-sky-400" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 my-3">
                      {s.nationalStatus && (
                        <Badge variant="outline" className="border-sky-500/30 text-sky-300 bg-sky-950/30 text-xs">
                          {s.nationalStatus}
                        </Badge>
                      )}
                      {s.citesListing && (
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-300 bg-indigo-950/30 text-xs">
                          {s.citesListing}
                        </Badge>
                      )}
                    </div>

                    {s.conservationMeasures && s.conservationMeasures.length > 0 && (
                      <div className="bg-black/30 p-3 rounded-lg border border-white/5 space-y-1.5 mt-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Active Conservation Protocols</div>
                        <ul className="space-y-1">
                          {s.conservationMeasures.map((measure, idx) => (
                            <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500 pt-3 border-t border-white/5 mt-3">
                    <span>Source: {s.dataSource.reference}</span>
                    <span className="font-semibold text-sky-400">Confidence: {s.dataSource.confidence}%</span>
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
