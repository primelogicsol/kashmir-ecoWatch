'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  Activity,
  AlertTriangle,
  Skull,
  ShieldCheck,
  FileSpreadsheet,
  Search,
  Filter,
  MapPin,
  Calendar,
  BookOpen,
  Info,
  ExternalLink,
  HelpCircle,
  TrendingDown,
  Layers
} from 'lucide-react';
import {
  CauseOfDeath,
  RegionalMortalitySynthesis,
  WildlifeMortalityRecord,
  REGIONAL_MORTALITY_SYNTHESES,
  HISTORICAL_MORTALITY_RECORDS,
  getMortalityDashboardMetrics
} from '@/data/hwc-wildlife-mortality';
import { KewRegion } from '@/data/human-wildlife-conflict';

export default function HwcWildlifeMortalityPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCause, setSelectedCause] = useState<string>('All');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const metrics = useMemo(() => getMortalityDashboardMetrics(), []);

  // Filtered mortality records
  const filteredRecords = useMemo(() => {
    return HISTORICAL_MORTALITY_RECORDS.filter((rec) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        rec.speciesCommonName.toLowerCase().includes(q) ||
        rec.scientificName.toLowerCase().includes(q) ||
        rec.sourcePublication.toLowerCase().includes(q) ||
        rec.forensicNotes.toLowerCase().includes(q);

      const matchesRegion = selectedRegion === 'All' || rec.regionalJurisdiction === selectedRegion;
      const matchesCause = selectedCause === 'All' || rec.causeOfDeath === selectedCause;
      const matchesSpecies = selectedSpecies === 'All' || rec.speciesCommonName.includes(selectedSpecies);

      return matchesSearch && matchesRegion && matchesCause && matchesSpecies;
    });
  }, [searchQuery, selectedRegion, selectedCause, selectedSpecies]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Wildlife Mortality Intelligence' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                HISTORICAL INTELLIGENCE
              </span>
              <span>Wildlife Mortality &amp; Human-Caused Killings</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-rose-300 to-teal-300 bg-clip-text text-transparent">
              20-Year Western Himalayan Historical Database (2006–2026)
            </span>
          </>
        }
        subtitle="Forensic historical synthesis of documented wild animal deaths, deliberate retaliatory persecution, preventive killings, snaring, poisoning, and infrastructural accidents across five regions."
        icon={<Activity className="w-6 h-6 text-amber-400" />}
      />

      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* KPI Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-slate-400">Total Documented Mortality</div>
            <div className="text-2xl font-bold text-white mt-1">{metrics.totalLiteratureDocumented}+ Records</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across published regional ledgers</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-rose-400 font-semibold">Confirmed Human-Caused</div>
            <div className="text-2xl font-bold text-rose-300 mt-1">{metrics.confirmedHumanCaused}+ Deaths</div>
            <div className="text-[11px] text-rose-400/80 mt-0.5">Deliberate retaliation &amp; prevention</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">Retaliatory Killings</div>
            <div className="text-2xl font-bold text-amber-300 mt-1">{metrics.retaliatoryKillingsConfirmed}+ Cases</div>
            <div className="text-[11px] text-amber-400/80 mt-0.5">Direct response to livestock/crops</div>
          </div>
          <div className="bg-slate-900/60 border border-white/10 p-4 rounded-lg">
            <div className="text-[10px] font-mono uppercase text-teal-400 font-semibold">Historical Time Window</div>
            <div className="text-2xl font-bold text-teal-300 mt-1">{metrics.historicalSpan}</div>
            <div className="text-[11px] text-teal-400/80 mt-0.5">2006–2026 Longitudinal scope</div>
          </div>
        </div>

        {/* Five-Region Literature Evidence Breakdown */}
        <section className="space-y-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
              REGIONAL SCIENTIFIC EVIDENCE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              Five-Region Historical Mortality Ledger &amp; Data Gaps
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Literature-derived mortality statistics from official department logs, longitudinal research, and parliamentary records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONAL_MORTALITY_SYNTHESES.map((reg) => (
              <Card key={reg.region} className="glass-intense border-white/10 p-5 rounded-lg flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <h3 className="text-base font-bold text-white">{reg.region}</h3>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border ${
                        reg.isConsolidatedTotalDefensible
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {reg.isConsolidatedTotalDefensible ? 'Consolidated Ledger' : 'Discontinuous Data'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Historical Period:</span>
                      <strong className="text-white font-mono">{reg.historicalPeriod}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Documented Deaths:</span>
                      <strong className="text-rose-300 font-mono">{reg.totalDocumentedWildDeaths}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Human-Caused Deaths:</span>
                      <span className="text-amber-300 font-mono font-bold">{reg.confirmedHumanCausedDeaths}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Retaliatory Response:</span>
                      <span className="text-slate-200 font-mono">{reg.retaliatoryKillingsConfirmed}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono font-bold">
                      Focal Wildlife Impacted:
                    </span>
                    <span className="text-slate-200 text-[11px] leading-relaxed">
                      {reg.primarySpeciesImpacted.join(' · ')}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono font-bold">
                      Key Mortality Mechanisms:
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                      {reg.keyMortalityDrivers.slice(0, 2).map((driver, i) => (
                        <li key={i} className="truncate">{driver}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2 text-[10px]">
                  <div className="text-slate-400 leading-snug bg-slate-950 p-2.5 rounded-[4px] border border-white/5">
                    <strong className="text-amber-300">Methodology Limitation:</strong> {reg.scientificIntegrityLimitation}
                  </div>
                  <div className="text-slate-500 truncate font-mono">
                    Sources: {reg.mainDataSources.join(', ')}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Cause of Death Classification Scheme */}
        <section className="bg-slate-900/60 border border-white/10 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Ten-Tier Scientific Cause-of-Death Taxonomy
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In compliance with IUCN guidelines, Kashmir EcoWatch avoids blanket assumptions. Every wildlife mortality record must distinguish between direct conflict retribution, pre-emptive killings, poaching, infrastructural hazards, and non-anthropogenic natural mortality.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs">
            {[
              { title: 'Retaliatory Killing', desc: 'Direct mob or individual retribution following livestock loss or human attack', color: 'border-rose-500/40 text-rose-300' },
              { title: 'Preventive Killing', desc: 'Pre-emptive shooting or trapping upon sighting near village peripheries', color: 'border-amber-500/40 text-amber-300' },
              { title: 'Poaching / Snaring', desc: 'Targeted illegal trade or subsistence snaring unrelated to livestock defense', color: 'border-red-500/40 text-red-300' },
              { title: 'Accidental Roadkill', desc: 'Vehicular strikes along bypass expressways and mountain highways', color: 'border-teal-500/40 text-teal-300' },
              { title: 'Electrocution', desc: 'Illegal uninsulated power lines and orchard perimeter fence wiring', color: 'border-yellow-500/40 text-yellow-300' },
              { title: 'Poisoning (Baits)', desc: 'Carcasses laced with insecticides to eliminate predators', color: 'border-purple-500/40 text-purple-300' },
              { title: 'Authorized Control', desc: 'State-sanctioned lethal removal of declared man-eating predators', color: 'border-blue-500/40 text-blue-300' },
              { title: 'Rescue Mortality', desc: 'Injuries or stress sustained during mob rescue and darting operations', color: 'border-slate-500/40 text-slate-300' },
              { title: 'Natural Mortality', desc: 'Old age, territorial fights, disease, severe avalanches or starvation', color: 'border-emerald-500/40 text-emerald-300' },
              { title: 'Unknown Cause', desc: 'Decomposed remains found without conclusive ballistic or toxicological signs', color: 'border-slate-500/40 text-slate-400' }
            ].map((tier, idx) => (
              <div key={idx} className={`p-3 rounded-[6px] bg-slate-950 border ${tier.color} space-y-1`}>
                <div className="font-bold">{tier.title}</div>
                <div className="text-[10px] text-slate-400 leading-snug">{tier.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Structured Historical Evidence Ledger */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                EVIDENCE LEDGER
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Deduplicated Historical Case Studies &amp; Registers
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Showing <strong className="text-white">{filteredRecords.length}</strong> cataloged historical ledgers
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200"
              >
                <option value="All">All Regions (5 Regions)</option>
                <option value="Kashmir Valley">Kashmir Valley</option>
                <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Jammu">Jammu</option>
              </select>
            </div>
            <div>
              <select
                value={selectedCause}
                onChange={(e) => setSelectedCause(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200"
              >
                <option value="All">All Causes of Death</option>
                <option value="Retaliatory Killing">Retaliatory Killing</option>
                <option value="Preventive Killing">Preventive Killing</option>
                <option value="Poaching / Snaring">Poaching / Snaring</option>
                <option value="Authorized Lethal Control">Authorized Lethal Control</option>
                <option value="Rescue-Related Mortality">Rescue-Related Mortality</option>
                <option value="Natural Mortality">Natural Mortality</option>
                <option value="Poisoning (Toxic Baits)">Poisoning (Toxic Baits)</option>
                <option value="Accidental Roadkill / Vehicular">Accidental Roadkill / Vehicular</option>
                <option value="Unknown Cause">Unknown Cause</option>
              </select>
            </div>
            <div>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200"
              >
                <option value="All">All Focal Species</option>
                <option value="Asiatic Black Bear">Asiatic Black Bear</option>
                <option value="Common Leopard">Common Leopard</option>
                <option value="Himalayan Gray Wolf">Himalayan Gray Wolf</option>
                <option value="Himalayan Brown Bear">Himalayan Brown Bear</option>
                <option value="Leopard Cat">Leopard Cat</option>
              </select>
            </div>
          </div>

          {/* Record Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecords.map((rec) => (
              <Card key={rec.mortalityId} className="glass-intense border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      {rec.regionalJurisdiction} · {rec.dateOrPeriod}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {rec.speciesCommonName}
                    </h3>
                    <div className="text-xs text-slate-400 italic font-mono">{rec.scientificName}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono text-rose-400 block">
                      {rec.count}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Recorded Deaths</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-[4px] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Cause of Death:</span>
                    <span className="text-amber-300 font-semibold">{rec.causeOfDeath}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-[4px] border border-white/5">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Human Involvement:</span>
                    <span className="text-slate-200">{rec.humanInvolvement}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-[6px] leading-relaxed">
                  {rec.forensicNotes}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="truncate max-w-[75%]">
                    <span className="text-slate-500">Source:</span> {rec.sourcePublication}
                  </div>
                  {rec.doiOrCitationUrl && (
                    <a
                      href={rec.doiOrCitationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Study</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Strategic Next Steps */}
        <section className="bg-slate-900 border border-emerald-500/30 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Research Priority Directive</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Unifying 20-Year Western Himalayan Wildlife Mortality
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The next priority phase for Kashmir EcoWatch is obtaining underlying annual mortality registers directly from the J&amp;K Department of Wildlife Protection (2011–2026), full year-by-year AJK leopard records (2008–2023), and establishing dedicated research partnerships for transboundary wolf mortality in Gilgit-Baltistan and predator mortality in Ladakh.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/protected-network/human-wildlife-conflict/research"
              className="px-4 py-2 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
            >
              Explore Research Bibliography
            </Link>
            <Link
              href="/protected-network/human-wildlife-conflict/emergency-directory"
              className="px-4 py-2 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-white/10"
            >
              Wildlife Emergency Directory
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
