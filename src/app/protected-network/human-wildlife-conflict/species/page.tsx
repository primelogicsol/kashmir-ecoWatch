'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  PawPrint,
  Shield,
  Calendar,
  AlertTriangle,
  HeartHandshake,
  Wrench,
  CheckCircle2,
  Info,
  ChevronRight,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import {
  PRIORITY_SPECIES,
  SECONDARY_SPECIES,
  PrioritySpeciesProfile,
  SecondarySpeciesEntry
} from '@/data/hwc-species-registry';
import { KewRegion } from '@/data/human-wildlife-conflict';

export default function HwcSpeciesPage() {
  const [selectedSpecies, setSelectedSpecies] = useState<PrioritySpeciesProfile>(PRIORITY_SPECIES[0]);
  const [tierFilter, setTierFilter] = useState<'all' | 'flagships' | 'common' | 'secondary'>('all');

  const filteredPrioritySpecies = useMemo(() => {
    if (tierFilter === 'flagships') return PRIORITY_SPECIES.filter((sp) => sp.isFlagship);
    if (tierFilter === 'common') return PRIORITY_SPECIES.filter((sp) => !sp.isFlagship);
    return PRIORITY_SPECIES;
  }, [tierFilter]);

  const getPriorityBadgeClass = (priority: 'High' | 'Localized' | 'Limited*') => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'Localized':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Limited*':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Species Profiles' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SPECIES INTELLIGENCE
              </span>
              <span>Ecological &amp; Conflict Profiles</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 to-emerald-300 bg-clip-text text-transparent">
              Two-Tier Focal Species Registry &amp; Regional Matrices
            </span>
          </>
        }
        subtitle="Comprehensive taxonomy, keystone ecological functions, regional conflict intensities, and field-tested coexistence protocols for 10 priority species and 10 secondary coexistence taxa."
        icon={<PawPrint className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Tier Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-lg border border-white/10">
          <div className="text-xs text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Select Species Classification Tier:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setTierFilter('all')}
              className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-all ${
                tierFilter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              All 10 Priority Species
            </button>
            <button
              onClick={() => setTierFilter('flagships')}
              className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-all ${
                tierFilter === 'flagships'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              6 Conservation Flagships
            </button>
            <button
              onClick={() => setTierFilter('common')}
              className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-all ${
                tierFilter === 'common'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              4 Common Conflict Species
            </button>
            <button
              onClick={() => setTierFilter('secondary')}
              className={`px-3 py-1 rounded-[4px] text-xs font-semibold transition-all ${
                tierFilter === 'secondary'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Secondary Registry (10)
            </button>
          </div>
        </div>

        {/* Priority Species Strip (When not strictly viewing secondary) */}
        {tierFilter !== 'secondary' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {filteredPrioritySpecies.map((sp) => {
                const isSelected = selectedSpecies.id === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => setSelectedSpecies(sp)}
                    className={`p-3.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                        : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 text-[9px] font-mono uppercase tracking-wider mb-1">
                        <span className="text-emerald-400 truncate">{sp.iucnStatus}</span>
                        {sp.isFlagship ? (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Flagship
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                            Common
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white truncate">{sp.commonName}</h3>
                      <div className="text-[11px] text-slate-400 italic font-mono truncate">{sp.scientificName}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Priority Species Dossier */}
            <Card className="glass-intense border-white/10 p-6 sm:p-8 rounded-lg space-y-8">
              {/* Dossier Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      {selectedSpecies.tier}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400">{selectedSpecies.scheduleWpa}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedSpecies.commonName}
                  </h2>
                  <div className="text-sm italic text-slate-300 font-mono mt-0.5">
                    {selectedSpecies.scientificName}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Vernacular Names: <strong className="text-slate-200">{selectedSpecies.localNames.join(', ')}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  <span className="text-xs font-mono px-3 py-1 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    IUCN: {selectedSpecies.iucnStatus}
                  </span>
                  {selectedSpecies.isFlagship && (
                    <span className="text-xs font-mono px-3 py-1 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Conservation Flagship</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Regional Conflict Priorities Matrix */}
              <div className="bg-slate-900/80 p-4 rounded-lg border border-white/10 space-y-2.5">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Regional Conflict Monitoring Priority Matrix</span>
                  <span className="text-[10px] text-slate-500 font-normal">Evidence-grounded intensity assessment</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  {(Object.keys(selectedSpecies.regionalPriorities) as KewRegion[]).map((reg) => (
                    <div key={reg} className="bg-slate-950 p-2.5 rounded-[4px] border border-white/5 flex flex-col justify-between">
                      <span className="text-slate-400 text-[11px] truncate">{reg}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[3px] border mt-1.5 text-center font-bold ${getPriorityBadgeClass(
                          selectedSpecies.regionalPriorities[reg]
                        )}`}
                      >
                        {selectedSpecies.regionalPriorities[reg]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 italic pt-1">
                  * Limited: species distribution or meaningful conflict relevance in this region requires additional field verification.
                </div>
              </div>

              {/* Two-Column Dossier Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 font-mono">
                      1. Ecological Role &amp; Keystone Function
                    </h4>
                    <p className="text-xs text-slate-300 bg-slate-900/80 p-4 rounded-lg border border-white/5 leading-relaxed">
                      {selectedSpecies.ecologicalRole}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 font-mono">
                      2. Peak Conflict Season &amp; Phenology
                    </h4>
                    <div className="bg-amber-950/20 border border-amber-500/20 p-4 rounded-lg text-xs space-y-2">
                      <div className="text-amber-200 font-semibold">
                        {selectedSpecies.peakConflictSeason}
                      </div>
                      <div className="text-slate-400 text-[11px] leading-relaxed">
                        Seasonal surges align with biological cycles (pre-denning hyperphagia, snowline descent, agricultural ripening, and pastoral grazing migrations).
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                      3. Documented Conflict Types
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSpecies.primaryConflictTypes.map((cat, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-[4px] bg-white/5 text-slate-200 border border-white/10">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                      4. Proximate Anthropogenic Drivers
                    </h4>
                    <ul className="space-y-2 text-xs">
                      {selectedSpecies.proximateDrivers.map((drv, i) => (
                        <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-[6px] border border-white/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span className="text-slate-300 leading-relaxed">{drv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2 font-mono">
                      5. Key Community Vulnerability Factors
                    </h4>
                    <ul className="space-y-2 text-xs">
                      {selectedSpecies.keyVulnerabilityFactors.map((vuln, i) => (
                        <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-3 rounded-[6px] border border-white/5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-slate-300 leading-relaxed">{vuln}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mitigation Protocols */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    <span>Evidence-Based Mitigation Protocols</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    {selectedSpecies.iucnGuidelineAlignment}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedSpecies.evidenceBasedMitigation.map((mit, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-emerald-200 leading-relaxed">{mit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Secondary Species Registry Section */}
        {(tierFilter === 'all' || tierFilter === 'secondary') && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                SECONDARY &amp; LOCALLY DOCUMENTED TAXA
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Secondary Conflict &amp; Coexistence Species Registry (10 Taxa)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Species exhibiting localized poultry, crop, or pasture overlap without constituting pervasive regional conflict threats.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SECONDARY_SPECIES.map((sec) => (
                <Card key={sec.id} className="glass-intense border-white/10 p-5 rounded-lg space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{sec.commonName}</h3>
                      <div className="text-xs text-slate-400 italic font-mono">{sec.scientificName}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {sec.category}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">Relevance:</span>{' '}
                      <span className="text-slate-300">{sec.conflictRelevance}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      <span className="text-slate-500">Key Regions:</span> {sec.keyRegions.join(', ')}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 text-xs text-emerald-300 bg-emerald-950/20 p-2.5 rounded-[4px] border border-emerald-500/20">
                    <strong className="text-emerald-400 font-medium block mb-0.5">Management Protocol:</strong>
                    {sec.managementRecommendation}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
