'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import {
  DISTRICT_PLASTIC_PROFILES,
  REGIONAL_PLASTIC_SUMMARIES,
  SATELLITE_PLASTIC_HOTSPOTS,
  MICROPLASTIC_SAMPLES,
  PlasticPollutionRegion,
  EvidenceClassification,
} from '@/data/plastic-pollution';
import {
  Layers,
  BarChart3,
  MapPin,
  Compass,
  Factory,
  ShoppingBag,
  Trash2,
  Recycle,
  Flame,
  Microscope,
  Waves,
  Mountain,
  PawPrint,
  Scale,
  ShieldCheck,
  FileText,
  Database,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Radio,
  ChevronRight,
  Trophy,
  Award,
  SlidersHorizontal,
  ArrowUpDown,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function PlasticPollutionOverviewPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedEvidence, setSelectedEvidence] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('score-desc');
  const [districtSearch, setDistrictSearch] = useState('');

  // Pre-calculate full rankings across all scored districts (1 to N)
  const rankingMap = useMemo(() => {
    const scored = [...DISTRICT_PLASTIC_PROFILES]
      .filter((d) => typeof d.accountabilityScore === 'number')
      .sort((a, b) => (b.accountabilityScore ?? 0) - (a.accountabilityScore ?? 0));

    const map = new Map<string, { rank: number; totalScored: number }>();
    scored.forEach((d, idx) => {
      map.set(d.district, { rank: idx + 1, totalScored: scored.length });
    });
    return map;
  }, []);

  // Top 5 and Bottom 5 across the entire 42-district dataset
  const topPerformers = useMemo(() => {
    return [...DISTRICT_PLASTIC_PROFILES]
      .filter((d) => typeof d.accountabilityScore === 'number')
      .sort((a, b) => (b.accountabilityScore ?? 0) - (a.accountabilityScore ?? 0))
      .slice(0, 5);
  }, []);

  const criticalDeficitDistricts = useMemo(() => {
    return [...DISTRICT_PLASTIC_PROFILES]
      .filter((d) => typeof d.accountabilityScore === 'number')
      .sort((a, b) => (a.accountabilityScore ?? 0) - (b.accountabilityScore ?? 0))
      .slice(0, 5);
  }, []);

  // Filtered and sorted districts
  const filteredDistricts = useMemo(() => {
    const list = DISTRICT_PLASTIC_PROFILES.filter((d) => {
      if (selectedRegion !== 'ALL' && d.region !== selectedRegion) return false;
      if (selectedEvidence !== 'ALL' && d.evidenceClass !== selectedEvidence) return false;

      // Tier filtering
      if (selectedTier === 'TOP') {
        if (!d.accountabilityScore || d.accountabilityScore < 50) return false;
      } else if (selectedTier === 'MODERATE') {
        if (!d.accountabilityScore || d.accountabilityScore < 40 || d.accountabilityScore >= 50) return false;
      } else if (selectedTier === 'DEFICIT') {
        if (!d.accountabilityScore || d.accountabilityScore < 28 || d.accountabilityScore >= 40) return false;
      } else if (selectedTier === 'CRITICAL') {
        if (!d.accountabilityScore || d.accountabilityScore >= 28) return false;
      } else if (selectedTier === 'EXCLUDED') {
        if (d.accountabilityScore !== undefined) return false;
      }

      if (districtSearch) {
        const q = districtSearch.toLowerCase();
        return (
          d.district.toLowerCase().includes(q) ||
          d.headquarters.toLowerCase().includes(q) ||
          d.primaryDumpingSite.toLowerCase().includes(q)
        );
      }
      return true;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'score-desc') {
        const scoreA = a.accountabilityScore ?? -1;
        const scoreB = b.accountabilityScore ?? -1;
        return scoreB - scoreA;
      }
      if (sortBy === 'score-asc') {
        const scoreA = a.accountabilityScore ?? 999;
        const scoreB = b.accountabilityScore ?? 999;
        return scoreA - scoreB;
      }
      if (sortBy === 'waste-desc') {
        return b.plasticWasteTPD - a.plasticWasteTPD;
      }
      if (sortBy === 'collection-desc') {
        return b.collectionEfficiencyPct - a.collectionEfficiencyPct;
      }
      if (sortBy === 'name-asc') {
        return a.district.localeCompare(b.district);
      }
      return 0;
    });
  }, [selectedRegion, selectedEvidence, selectedTier, districtSearch, sortBy]);

  // Aggregate metrics
  const totalWasteTPD = useMemo(
    () => filteredDistricts.reduce((sum, d) => sum + d.plasticWasteTPD, 0),
    [filteredDistricts]
  );
  const totalUnmanagedTPD = useMemo(
    () => filteredDistricts.reduce((sum, d) => sum + d.unmanagedDisposalTPD, 0),
    [filteredDistricts]
  );
  const avgCollectionPct = useMemo(() => {
    if (filteredDistricts.length === 0) return 0;
    return Math.round(
      filteredDistricts.reduce((sum, d) => sum + d.collectionEfficiencyPct, 0) / filteredDistricts.length
    );
  }, [filteredDistricts]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Theme Image) ─── */}
      <Heading
        label="KEW · ENVIRONMENTAL MONITORING / SYNTHETIC POLYMER SURVEILLANCE"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Plastic Pollution &amp; Polymer Surveillance
            </span>
          </>
        }
        subtitle="Independent scientific intelligence system quantifying synthetic polymer material flows, trade ingress, microplastic burdens, and municipal leakages across 42 Western Himalayan districts."
        icon={<Trash2 className="w-6 h-6 text-rose-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/plastic-pollution/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics Dashboards</span>
            </Link>
            <Link
              href="/environmental-monitoring/plastic-pollution/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-rose-400" />
              <span>GIS Pollution Atlas</span>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUB-NAVIGATION ──────────────────────────────────────────────── */}
      <PlasticPollutionSubNav />

      {/* ── 3. REAL-TIME DATA & SCIENTIFIC INTEGRITY DIRECTIVE BANNER ─────── */}
      <div className="bg-slate-900 border-b border-white/5 py-2.5 text-xs text-slate-400">
        <div className="container mx-auto px-4 sm:px-6 flex items-start sm:items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong className="text-white">Scientific Evidence Directive:</strong> Satellite detections (Global Plastic Watch / Copernicus) and hydrological runoff models are distinguished from periodic municipal reporting and peer-reviewed laboratory microplastic observations. Missing district measurements are flagged transparently as <strong className="text-amber-400">UNAVAILABLE</strong> without synthetic substitution.
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* ── 4. KEY SUMMARY INDICATORS STRIP ──────────────────────────────── */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Total Plastic Waste
              </span>
              <div className="text-2xl font-bold font-mono text-white mt-1">
                {totalWasteTPD.toFixed(1)} <span className="text-xs font-normal text-slate-400">TPD</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Tonnes per day (42 Dists)</span>
            </Card>

            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">
                Unmanaged Leakage
              </span>
              <div className="text-2xl font-bold font-mono text-rose-300 mt-1">
                {totalUnmanagedTPD.toFixed(1)} <span className="text-xs font-normal text-slate-400">TPD</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Dumped, burned or fluvial</span>
            </Card>

            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                Avg Collection
              </span>
              <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
                {avgCollectionPct}%
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Formal municipal coverage</span>
            </Card>

            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                Hotspots Monitored
              </span>
              <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
                410+
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Satellite &amp; field nodes</span>
            </Card>

            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
                Peak Microplastics
              </span>
              <div className="text-2xl font-bold font-mono text-purple-300 mt-1">
                11.2 <span className="text-xs font-normal text-slate-400">p/m³</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">Observed in Tawi River</span>
            </Card>

            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                Legal Frameworks
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
                5 Active
              </div>
              <span className="text-[10px] text-slate-500 mt-0.5 block">PWM, SUP &amp; Bye-laws</span>
            </Card>
          </div>
        </section>

        {/* ── 5. FIVE-REGION GEOGRAPHIC INTELLIGENCE & DISTRICT COMPARISON ─── */}
        <section className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  FIVE-REGION GEOGRAPHIC REGISTRY &amp; PERFORMANCE BENCHMARK
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                42-District Empirical Baseline &amp; Waste Generation
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl mt-1">
                Empirical municipal audit scoring synthetic polymer generation, formal collection efficiency, and unmanaged open-dumping leakage across all 42 Western Himalayan districts.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-end">
              <span className="text-[11px] font-mono text-slate-400">
                Displaying <strong className="text-white">{filteredDistricts.length}</strong> of 42 districts
              </span>
            </div>
          </div>

          {/* ── Performance Highlights Cards (Best, Critical, Regional Averages, Audit Standard) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Card 1: Best Performers */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-lg p-3.5 space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide font-mono">
                    Best Performers
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                  Score ≥ 50
                </span>
              </div>
              <div className="space-y-1.5">
                {topPerformers.map((d, idx) => (
                  <div
                    key={d.district}
                    className="flex items-center justify-between text-xs py-0.5 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 w-4">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-white truncate max-w-[105px]">{d.district}</span>
                      <span className="text-[10px] text-slate-400 truncate">({d.region.split(' ')[0]})</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 font-mono">
                      <span className="text-[11px] font-bold text-emerald-300">{d.accountabilityScore}/100</span>
                      <span className="text-[9px] text-slate-500">{d.collectionEfficiencyPct}% col.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Critical Deficit Districts */}
            <div className="bg-slate-900/90 border border-rose-500/30 rounded-lg p-3.5 space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <div className="flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wide font-mono">
                    Critical Deficit
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
                  Score &lt; 28
                </span>
              </div>
              <div className="space-y-1.5">
                {criticalDeficitDistricts.map((d) => {
                  const rankInfo = rankingMap.get(d.district);
                  return (
                    <div
                      key={d.district}
                      className="flex items-center justify-between text-xs py-0.5 border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[10px] font-mono font-bold text-rose-400 w-4">
                          #{rankInfo?.rank ?? '—'}
                        </span>
                        <span className="font-semibold text-white truncate max-w-[105px]">{d.district}</span>
                        <span className="text-[10px] text-slate-400 truncate">({d.region.split(' ')[0]})</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 font-mono">
                        <span className="text-[11px] font-bold text-rose-300">{d.accountabilityScore}/100</span>
                        <span className="text-[9px] text-rose-400/80">{d.unmanagedDisposalTPD} TPD leak</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Regional Score Averages */}
            <div className="bg-slate-900/90 border border-white/10 rounded-lg p-3.5 space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
                    Regional Averages
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">5 Jurisdictions</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between items-center text-[11px] mb-0.5">
                    <span className="font-medium text-slate-300">Ladakh (2 dists)</span>
                    <span className="font-mono font-bold text-emerald-400">53.0 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '53%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-[11px] mb-0.5">
                    <span className="font-medium text-slate-300">Jammu (10 dists)</span>
                    <span className="font-mono font-bold text-cyan-400">38.8 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '38.8%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-[11px] mb-0.5">
                    <span className="font-medium text-slate-300">Kashmir Valley (10 dists)</span>
                    <span className="font-mono font-bold text-cyan-400">38.6 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '38.6%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-[11px] mb-0.5">
                    <span className="font-medium text-slate-300">Gilgit-Baltistan (10 dists)</span>
                    <span className="font-mono font-bold text-amber-400">35.8 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '35.8%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-[11px] mb-0.5">
                    <span className="font-medium text-slate-300">Azad Jammu &amp; Kashmir</span>
                    <span className="font-mono font-bold text-rose-400">32.8 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full" style={{ width: '32.8%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Audit Standard & Methodology */}
            <div className="bg-slate-900/90 border border-white/10 rounded-lg p-3.5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
                    Audit Standard
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-400">DPPAI 0–100</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Scores evaluate municipal collection capacity (40%), source segregation (25%), unmanaged open leakage containment (25%), and empirical reporting fidelity (10%).
              </p>
              <div className="pt-1 border-t border-white/5 text-[10px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Info className="w-3 h-3 shrink-0" />
                  <span>3 districts (Haveli, Kharmang, Roundu) excluded for lack of baseline data.</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Interactive Filters & Sorting Toolbar ── */}
          <div className="bg-slate-900/90 border border-white/10 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-950 border border-white/15 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500 font-medium"
              >
                <option value="ALL">All Regions (5)</option>
                <option value="Kashmir Valley">Kashmir Valley (10)</option>
                <option value="Jammu">Jammu (10)</option>
                <option value="Ladakh">Ladakh (2)</option>
                <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir (10)</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan (10)</option>
              </select>

              {/* Performance Tier Filter */}
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-950 border border-white/15 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500 font-medium"
              >
                <option value="ALL">All Performance Tiers (42)</option>
                <option value="TOP">🏆 Best Performers (Score ≥ 50)</option>
                <option value="MODERATE">Moderate Tier (Score 40–49)</option>
                <option value="DEFICIT">Deficit Tier (Score 28–39)</option>
                <option value="CRITICAL">⚠️ Critical Deficit (Score &lt; 28)</option>
                <option value="EXCLUDED">Data Gaps (Excluded from Score)</option>
              </select>

              {/* Evidence Filter */}
              <select
                value={selectedEvidence}
                onChange={(e) => setSelectedEvidence(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-950 border border-white/15 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500 font-medium"
              >
                <option value="ALL">All Evidence Classes</option>
                <option value="OFFICIALLY_REPORTED">Officially Reported</option>
                <option value="OBSERVED">Observed (Measured)</option>
                <option value="MODELED">Modeled Estimates</option>
                <option value="UNAVAILABLE">Data Unavailable Gaps</option>
              </select>

              {/* Sorting Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 border border-white/15 rounded-[6px] px-2 py-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs focus:outline-none font-medium cursor-pointer"
                >
                  <option value="score-desc" className="bg-slate-950 text-slate-200">Sort: Best Score First (High → Low)</option>
                  <option value="score-asc" className="bg-slate-950 text-slate-200">Sort: Lowest Score First (Critical → Best)</option>
                  <option value="waste-desc" className="bg-slate-950 text-slate-200">Sort: Waste Generated (TPD High → Low)</option>
                  <option value="collection-desc" className="bg-slate-950 text-slate-200">Sort: Collection Efficiency (High → Low)</option>
                  <option value="name-asc" className="bg-slate-950 text-slate-200">Sort: District Name (A → Z)</option>
                </select>
              </div>
            </div>

            {/* District Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter district / landfill..."
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                className="pl-7 pr-3 py-1.5 bg-slate-950 border border-white/15 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-44"
              />
            </div>
          </div>

          {/* ── Regional Baseline Table with Score Column ── */}
          <div className="overflow-x-auto border border-white/10 rounded-lg bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                <tr>
                  <th className="p-3">District &amp; Region</th>
                  <th className="p-3">DPPAI Score &amp; Tier</th>
                  <th className="p-3">Pop (2026 Est)</th>
                  <th className="p-3">Plastic TPD</th>
                  <th className="p-3">Plastic %</th>
                  <th className="p-3">Per Capita (kg/yr)</th>
                  <th className="p-3">Collection %</th>
                  <th className="p-3">Unmanaged TPD</th>
                  <th className="p-3">Primary Disposal Node</th>
                  <th className="p-3">Evidence Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((d) => {
                    const rankInfo = rankingMap.get(d.district);
                    const hasScore = typeof d.accountabilityScore === 'number';
                    const score = d.accountabilityScore ?? 0;

                    let tierBadge = null;
                    if (!hasScore) {
                      tierBadge = (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-400 border border-white/10">
                          Data Gap
                        </span>
                      );
                    } else if (score >= 50) {
                      tierBadge = (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold inline-flex items-center gap-1">
                          <span>🏆</span>
                          <span>Best</span>
                        </span>
                      );
                    } else if (score >= 40) {
                      tierBadge = (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium">
                          Moderate
                        </span>
                      );
                    } else if (score >= 28) {
                      tierBadge = (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium">
                          Deficit
                        </span>
                      );
                    } else {
                      tierBadge = (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold inline-flex items-center gap-1">
                          <span>⚠️</span>
                          <span>Critical</span>
                        </span>
                      );
                    }

                    return (
                      <tr key={d.district} className="hover:bg-white/5 transition-colors">
                        {/* District & Region */}
                        <td className="p-3 font-semibold text-white">
                          <div className="flex items-center gap-1.5">
                            {hasScore && rankInfo && rankInfo.rank <= 5 && (
                              <span className="text-amber-400 text-[11px]" title={`Rank #${rankInfo.rank} Best Performer`}>
                                🏆
                              </span>
                            )}
                            <span>{d.district}</span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 font-normal">{d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}</div>
                        </td>

                        {/* DPPAI Score & Performance Tier */}
                        <td className="p-3">
                          {hasScore ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-bold text-slate-400">
                                  #{rankInfo?.rank}
                                </span>
                                <span
                                  className={`text-xs font-mono font-bold ${
                                    score >= 50
                                      ? 'text-emerald-300'
                                      : score >= 40
                                      ? 'text-cyan-300'
                                      : score >= 28
                                      ? 'text-amber-300'
                                      : 'text-rose-300'
                                  }`}
                                >
                                  {score}
                                  <span className="text-[9px] font-normal text-slate-400">/100</span>
                                </span>
                                {tierBadge}
                              </div>
                              <div className="w-20 bg-slate-800 rounded-full h-1 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    score >= 50
                                      ? 'bg-emerald-400'
                                      : score >= 40
                                      ? 'bg-cyan-400'
                                      : score >= 28
                                      ? 'bg-amber-400'
                                      : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${Math.min(100, score)}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono text-slate-500 italic block">
                                Excluded
                              </span>
                              {tierBadge}
                            </div>
                          )}
                        </td>

                        {/* Pop */}
                        <td className="p-3 font-mono text-slate-300">{(d.population2026Est / 1000).toFixed(0)}k</td>

                        {/* Plastic Waste TPD */}
                        <td className="p-3 font-mono font-bold text-white">{d.plasticWasteTPD}</td>

                        {/* Plastic % */}
                        <td className="p-3 font-mono text-rose-300">{d.plasticFractionPct}%</td>

                        {/* Per Capita */}
                        <td className="p-3 font-mono text-slate-200">{d.perCapitaPlasticWasteKgYr}</td>

                        {/* Collection % */}
                        <td className="p-3 font-mono">
                          <span
                            className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold ${
                              d.collectionEfficiencyPct >= 65
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : d.collectionEfficiencyPct >= 40
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {d.collectionEfficiencyPct}%
                          </span>
                        </td>

                        {/* Unmanaged TPD */}
                        <td className="p-3 font-mono text-rose-400 font-bold">{d.unmanagedDisposalTPD}</td>

                        {/* Primary Disposal Node */}
                        <td className="p-3 text-[11px] text-slate-400 truncate max-w-[170px]" title={d.primaryDumpingSite}>
                          {d.primaryDumpingSite}
                        </td>

                        {/* Evidence Class */}
                        <td className="p-3">
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] border ${
                              d.evidenceClass === 'OFFICIALLY_REPORTED'
                                ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                                : d.evidenceClass === 'OBSERVED'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : d.evidenceClass === 'MODELED'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-slate-800 text-slate-400 border-white/10'
                            }`}
                          >
                            {d.evidenceClass}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-slate-500 text-xs">
                      No district plastic profiles matching active filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 7. ACCOUNTABILITY INDEX & EVIDENCE RECOGNITION ───────────────── */}
        <section className="bg-slate-900/80 border border-white/10 rounded-lg p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-amber-400 px-2 py-0.5 rounded-[4px] bg-amber-950/60 border border-amber-500/30">
                  Accountability Framework
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  District Plastic Pollution Accountability Index (DPPAI)
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight mt-1">
                Objective Performance Ranking with Transparent Data Exclusion
              </h3>
            </div>
            <Link
              href="/environmental-monitoring/plastic-pollution/compliance-enforcement"
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
            >
              <span>View Full Enforcement Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-[6px] bg-slate-950/80 border border-white/5 space-y-1.5">
              <span className="font-bold text-slate-200">Tier 1: Documented Infrastructure</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Districts like <strong className="text-white">Leh (62/100)</strong> and <strong className="text-white">Hunza (58/100)</strong> score highest due to operational material recovery facilities, community segregation policies, and active plastic baling outposts.
              </p>
            </div>

            <div className="p-3.5 rounded-[6px] bg-slate-950/80 border border-white/5 space-y-1.5">
              <span className="font-bold text-slate-200">Tier 2: High Waste / Moderate Processing</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Metropolitan hubs like <strong className="text-white">Jammu (57/100)</strong> and <strong className="text-white">Srinagar (54/100)</strong> show high collection efficiency (&gt;75%), but remain hindered by open landfill disposal at Achan and Kot Bhalwal.
              </p>
            </div>

            <div className="p-3.5 rounded-[6px] bg-slate-950/80 border border-amber-500/30 space-y-1.5">
              <span className="font-bold text-amber-300">Exclusion Policy: Zero Synthetic Scoring</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Districts with unverified records (e.g. Haveli, Kharmang, Roundu) are explicitly marked as <strong className="text-amber-400">DATA_INSUFFICIENT</strong>. They are excluded from rankings to avoid false penalties or fabricated compliance.
              </p>
            </div>
          </div>
        </section>

        {/* ── 8. RECENT FIELD EVIDENCE & SATELLITE HOTSPOTS PREVIEW ────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Microplastics Lab Evidence */}
          <div className="bg-slate-900/80 border border-white/10 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Microscope className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Peer-Reviewed Microplastic Samples</h3>
              </div>
              <Link
                href="/environmental-monitoring/plastic-pollution/microplastics"
                className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
              >
                <span>Full Lab Registry</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {MICROPLASTIC_SAMPLES.slice(0, 4).map((sample) => (
                <div key={sample.id} className="p-3 rounded-[6px] bg-slate-950 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{sample.waterBodyOrEnvironment}</span>
                    <span className="font-mono text-xs font-bold text-purple-300">{sample.concentration}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Dominant: <strong className="text-slate-300">{sample.dominantPolymer} ({sample.dominantMorphology})</strong></span>
                    <span>{sample.analyticalMethod}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate" title={sample.peerReviewedSource}>
                    Ref: {sample.peerReviewedSource}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Satellite Waste Dumpsite Detections */}
          <div className="bg-slate-900/80 border border-white/10 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">Satellite-Identified Waste Sites</h3>
              </div>
              <Link
                href="/environmental-monitoring/plastic-pollution/gis-atlas"
                className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
              >
                <span>Open GIS Atlas</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {SATELLITE_PLASTIC_HOTSPOTS.slice(0, 4).map((spot) => (
                <div key={spot.id} className="p-3 rounded-[6px] bg-slate-950 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white truncate max-w-[240px]">{spot.siteName}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] border ${
                      spot.riskScore === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {spot.riskScore}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Footprint: <strong className="text-slate-300">{spot.estimatedAreaHectares} ha</strong></span>
                    <span>Proximity to water: <strong className="text-rose-300">{spot.proximityToWaterBodyM}m</strong></span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Mission: {spot.satelliteMission} · {spot.fieldVerificationStatus} ({spot.lastObservedDate})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. OPEN DATA & METHODOLOGY CALLOUT ────────────────────────────── */}
        <section className="bg-slate-900 border border-white/10 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">
              Open Data Access &amp; Scientific Methodology Standards
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Kashmir EcoWatch publishes plastic waste flux models, raw microplastic FTIR spectra summaries, and satellite boundary polygons as Open Data (CC BY-NC 4.0) for independent researchers, policy analysts, and conservation authorities.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href="/environmental-monitoring/plastic-pollution/methodology"
              className="px-3.5 py-2 rounded-[6px] bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
            >
              Methodology Standards
            </Link>
            <Link
              href="/environmental-monitoring/plastic-pollution/dashboards"
              className="px-3.5 py-2 rounded-[6px] bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
            >
              Explore Trends &amp; Dashboards
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
