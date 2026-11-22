'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import { WildlifeEmergencyReferralDirectory } from '@/components/hwc/WildlifeEmergencyReferralDirectory';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  HeartHandshake,
  PawPrint,
  MapPin,
  ChevronRight,
  TrendingDown,
  Layers,
  PhoneCall,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Info,
  Scale
} from 'lucide-react';
import {
  INCIDENT_REGISTRY,
  SPECIES_PROFILES,
  REGIONAL_METRICS,
  CONFLICT_DRIVERS,
  EMERGENCY_CONTACTS,
  KewRegion
} from '@/data/human-wildlife-conflict';

export default function HumanWildlifeConflictOverviewPage() {
  const [selectedRegion, setSelectedRegion] = useState<KewRegion | 'All'>('All');

  // Compute summary metrics from real verified records
  const totalVerifiedIncidents = useMemo(() => {
    return REGIONAL_METRICS.reduce((acc, curr) => acc + curr.documentedIncidentsCount, 0);
  }, []);

  const totalFatalities = useMemo(() => {
    return REGIONAL_METRICS.reduce((acc, curr) => acc + curr.humanCasualties.fatal, 0);
  }, []);

  const totalNonFatalInjuries = useMemo(() => {
    return REGIONAL_METRICS.reduce((acc, curr) => acc + curr.humanCasualties.nonFatal, 0);
  }, []);

  const totalLivestockLosses = useMemo(() => {
    return REGIONAL_METRICS.reduce((acc, curr) => acc + curr.livestockDepredationsRecorded, 0);
  }, []);

  const filteredIncidents = useMemo(() => {
    if (selectedRegion === 'All') return INCIDENT_REGISTRY;
    return INCIDENT_REGISTRY.filter(i => i.region === selectedRegion);
  }, [selectedRegion]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── 1. INSTITUTIONAL HERO ────────────────────────────────────────────── */}
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        images={[
        '/images/protected-network/protected-hwc-rapid-response-rescue.jpg',
        '/images/protected-network/protected-area-atlas-gis.jpg',
        '/images/protected-network/protected-national-parks-dachigam.jpg',
        '/images/protected-network/protected-wildlife-sanctuaries-overa.jpg',
        '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
        '/images/protected-network/protected-conservation-reserves-shikargah.jpg',
        '/images/protected-network/protected-bird-habitat-areas-iba.jpg',
        '/images/protected-network/protected-species-intelligence-telemetry.jpg',
        '/images/protected-network/protected-corridors-connectivity-passes.jpg',
        '/images/protected-network/protected-monitoring-threats-surveillance.jpg',
        '/images/protected-network/protected-research-trails-sightings.jpg',
        '/images/bear.png',
        '/images/tiger.png',
        '/images/markhor.png',
        '/images/protected-network.png'
      ]}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1 sm:pb-2">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                KEW-HWC
              </span>
              <span>Western Himalayan</span>
            </span>
            <span className="block break-words leading-[1.12] pb-1 sm:pb-2 bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Human–Wildlife Conflict & Coexistence
            </span>
          </>
        }
        subtitle="Scientific assessment of human–wildlife interactions, community exposure, habitat pressures, and evidence-based coexistence strategies across the five Western Himalayan regions."
        icon={<HeartHandshake className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <Link href="/protected-network/human-wildlife-conflict/incidents">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-[6px] w-full sm:w-auto flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                <span>Explore Incident Registry</span>
              </Button>
            </Link>
            <Link href="/protected-network/human-wildlife-conflict/report">
              <Button variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-bold rounded-[6px] w-full sm:w-auto flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Report an Incident</span>
              </Button>
            </Link>
            <Link href="/protected-network/human-wildlife-conflict/methodology">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold rounded-[6px] w-full sm:w-auto flex items-center justify-center gap-2">
                <Scale className="w-4 h-4 text-slate-300" />
                <span>Methodology</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUB-NAVIGATION ────────────────────────────────────────────────── */}
      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 pt-6 pb-12 space-y-12">
        {/* ── 3. WILDLIFE EMERGENCY REFERRAL DIRECTORY ────────────────────────── */}
        <WildlifeEmergencyReferralDirectory />

        {/* ── 4. CORE DASHBOARD INDICATORS ──────────────────────────────────── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  HISTORICAL REGIONAL SYNTHESIS (2006–2025)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Core Conflict &amp; Coexistence Baseline Indicators
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Aggregated from statutory department registers, ESRO monograph (Vol. 4) &amp; published studies
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-intense border-white/10 p-5 rounded-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Documented Incidents</span>
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {totalVerifiedIncidents.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                20-year archival synthesis across 5 regions
              </p>
            </Card>

            <Card className="glass-intense border-white/10 p-5 rounded-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Human Fatalities</span>
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
                {totalFatalities}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Historical multi-year aggregate (2006–2025)
              </p>
            </Card>

            <Card className="glass-intense border-white/10 p-5 rounded-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Non-Fatal Injuries</span>
                <HeartHandshake className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {totalNonFatalInjuries.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Surprise encounters near orchard fringes
              </p>
            </Card>

            <Card className="glass-intense border-white/10 p-5 rounded-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Livestock Depredations</span>
                <PawPrint className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">
                {totalLivestockLosses.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Corral &amp; pasture verified events
              </p>
            </Card>
          </div>

          {/* Scientific Provenance & Sensitive Data Notice */}
          <div className="bg-slate-900/70 border border-white/10 rounded-[8px] p-4 text-xs text-slate-300 space-y-2 mt-4 backdrop-blur-sm">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Info className="w-4 h-4" />
                <span>Scientific Provenance &amp; Database Integrity Notice</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Audited Baseline
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              The 1,760 incidents, 69 fatalities, 1,215 injuries, and 1,377 livestock depredations represent a 20-year literature-derived regional historical synthesis (2006–2025) across five Western Himalayan administrative jurisdictions. These baseline totals are compiled from published departmental administration reports, the ESRO Monograph (Vol. 4), and WII telemetry studies. Detailed incident ledgers in the KEW database are undergoing record-level forensic digitization; eight structured audit-grade case studies are currently accessible for protocol evaluation.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
              <span>Location Protection: <strong className="text-emerald-400">±10km Centroid Fuzzing Active</strong></span>
              <span>Identity Protection: <strong className="text-emerald-400">Strictly Enforced</strong></span>
              <span>Source Jurisdictions: <strong className="text-slate-200">J&amp;K, Ladakh, AJK, Gilgit-Baltistan</strong></span>
            </div>
          </div>

          {/* ── Spotlight Twin Feature Portals ────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Link
              href="/protected-network/human-wildlife-conflict/emergency-directory"
              className="group block p-5 rounded-lg bg-slate-900 border border-rose-500/30 hover:border-rose-400 transition-all shadow-md"
            >
              <div className="flex items-center justify-between text-xs font-mono text-rose-400 mb-2">
                <span className="font-bold flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" /> 42-DISTRICT DIRECTORY
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Searchable
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                Wildlife Emergency &amp; Rescue Contacts Directory
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Direct statutory referral directory mapping wildlife control rooms, divisional warden desks, rescue squads, and verified fallbacks across 42 districts in five regions.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
                <span>Access Emergency Contacts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/protected-network/human-wildlife-conflict/wildlife-mortality"
              className="group block p-5 rounded-lg bg-slate-900 border border-amber-500/30 hover:border-amber-400 transition-all shadow-md"
            >
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> 20-YEAR HISTORICAL DATABASE
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  2006–2026
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Wildlife Mortality &amp; Human-Caused Killing Intelligence
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Literature-synthesized forensic records tracking 422+ wild animal mortalities, retaliatory killings, poisoning, electrocution, and scientific cause-of-death taxonomy.
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Explore Mortality Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* ── 5. FIVE-REGION CONFLICT & COVERAGE MATRIX ─────────────────────── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                REGIONAL BREAKDOWN
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Five-Region Reporting Fidelity & Conflict Profile
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Reporting coverage varies by regional institutional infrastructure
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONAL_METRICS.map((reg) => (
              <Card key={reg.region} className="glass-intense border-white/10 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white">{reg.region}</h3>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border ${
                        reg.dataCoverageStatus === 'Comprehensive Registry'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {reg.dataCoverageStatus}
                    </span>
                  </div>

                  <div className="space-y-2 mt-4 text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-1.5 text-slate-400">
                      <span>Baseline Synthesis Period:</span>
                      <strong className="text-white font-mono">{reg.historicalPeriod}</strong>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5 text-slate-400">
                      <span>Documented Incidents:</span>
                      <strong className="text-white font-mono">{reg.documentedIncidentsCount}</strong>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5 text-slate-400">
                      <span>Verification Fidelity:</span>
                      <strong className="text-emerald-400 font-mono">{reg.verifiedPercentage}% Verified</strong>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5 text-slate-400">
                      <span>Casualties (Fatal / Non-fatal):</span>
                      <span className="font-mono text-white">
                        <strong className="text-red-400">{reg.humanCasualties.fatal}</strong> / {reg.humanCasualties.nonFatal}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5 text-slate-400">
                      <span>Livestock Depredation:</span>
                      <strong className="text-teal-300 font-mono">{reg.livestockDepredationsRecorded}</strong>
                    </div>
                    <div className="pt-1 text-[11px] text-slate-400">
                      <span className="text-slate-500 block mb-0.5">Primary Wildlife Involved:</span>
                      <span className="text-slate-200">{reg.primarySpeciesInvolved.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                  <div className="text-[10px] text-slate-400 leading-snug">
                    <strong className="text-slate-300 font-medium">Audit Formula:</strong> {reg.verificationMethodology}
                  </div>
                  <div className="text-[10px] text-slate-500 italic">
                    {reg.dataCompletenessNotes}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 6. RECENT VERIFIED INCIDENTS STRIP ────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                VERIFIED FIELD REGISTRY
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Recent Investigated Interactions
              </h2>
            </div>
            <Link
              href="/protected-network/human-wildlife-conflict/incidents"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View All Registry Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INCIDENT_REGISTRY.slice(0, 4).map((inc) => (
              <Card key={inc.id} className="glass-intense border-white/10 p-4 rounded-lg flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-400">
                    <span>{inc.id}</span>
                    <span className="px-1.5 py-0.5 rounded-[4px] bg-white/5 text-slate-300">
                      {inc.occurrenceDate}
                    </span>
                  </div>

                  <div>
                    <div className="mb-1">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-[3px] border ${
                        inc.recordType === 'Illustrative Reference Case (Simulation)'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {inc.recordType === 'Illustrative Reference Case (Simulation)' ? 'Illustrative Case' : 'Verified Case'}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{inc.species.commonName}</h3>
                    <div className="text-[11px] text-emerald-400 font-medium">
                      {inc.category}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{inc.generalLocation}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {inc.investigationSummary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px]">
                  <span className="px-1.5 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {inc.verificationStatus.split(' ')[0]}
                  </span>
                  <span className="text-slate-500 font-mono">{inc.region}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 7. KEY SPECIES CONFLICT PROFILES PREVIEW ───────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                ECOLOGICAL & BEHAVIORAL PROFILES
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Key Species & Seasonal Conflict Patterns
              </h2>
            </div>
            <Link
              href="/protected-network/human-wildlife-conflict/species"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Full Species Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPECIES_PROFILES.slice(0, 3).map((sp) => (
              <Card key={sp.id} className="glass-intense border-white/10 p-5 rounded-lg flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{sp.commonName}</h3>
                      <div className="text-xs italic text-slate-400 font-mono">{sp.scientificName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Local: {sp.localNames.join(', ')}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-[4px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {sp.iucnStatus}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 bg-white/5 p-2.5 rounded-[6px] space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Peak Conflict Window:
                    </div>
                    <div className="text-emerald-300 text-[11px] leading-snug">
                      {sp.peakConflictSeason}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {sp.ecologicalRole}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <Link
                    href="/protected-network/human-wildlife-conflict/species"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-between"
                  >
                    <span>View Conflict Analysis</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 8. CONNECTED PROTECTED NETWORK ECOSYSTEM ─────────────────────── */}
        <section className="pt-6 border-t border-white/10">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono mb-2">
            CROSS-MODULE CONNECTIVITY
          </div>
          <h2 className="text-xl font-bold text-white mb-4">
            Integrated Protected Areas & Conservation Intelligence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/protected-network/corridors-and-connectivity" className="group">
              <Card className="glass-intense border-white/10 p-4 rounded-lg group-hover:border-emerald-500/40 transition-all h-full">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Corridors & Connectivity
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  23 landscape linkages analyzed for fragmentation and pinch points.
                </p>
              </Card>
            </Link>

            <Link href="/protected-network/monitoring-and-threats" className="group">
              <Card className="glass-intense border-white/10 p-4 rounded-lg group-hover:border-emerald-500/40 transition-all h-full">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Monitoring & Threats
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Conservation alert registry and pressure signals across all PAs.
                </p>
              </Card>
            </Link>

            <Link href="/protected-network/species-intelligence" className="group">
              <Card className="glass-intense border-white/10 p-4 rounded-lg group-hover:border-emerald-500/40 transition-all h-full">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Species Intelligence Network
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  2,847 species with protected area overlaps and habitat modeling.
                </p>
              </Card>
            </Link>

            <Link href="/open-data" className="group">
              <Card className="glass-intense border-white/10 p-4 rounded-lg group-hover:border-emerald-500/40 transition-all h-full">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Data Provenance Registry
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Full citation provenance and official wildlife research archives.
                </p>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
