'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  CHINAR_BASIN_TOTALS,
  DISTRICT_CHINAR_CENSUS,
  DISTRICT_CONSERVATION_SCORES,
  DistrictConservationScore,
  DccsClassificationTier,
  KashmirDistrict,
} from '@/data/chinar-monitoring';
import {
  Trees,
  BarChart3,
  Compass,
  FileSpreadsheet,
  Building,
  QrCode,
  Activity,
  Ruler,
  Satellite,
  ThermometerSun,
  Landmark,
  AlertTriangle,
  ShieldCheck,
  Camera,
  BookOpen,
  Database,
  Radio,
  ArrowRight,
  ChevronRight,
  Info,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Lock,
  Trophy,
  Award,
  ArrowUpDown,
  Search,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export default function ChinarOverviewPage() {
  const [selectedScoreDistrict, setSelectedScoreDistrict] = useState<KashmirDistrict>('Srinagar');
  const [scoreTierFilter, setScoreTierFilter] = useState<string>('ALL');
  const [scoreSortBy, setScoreSortBy] = useState<string>('score-desc');
  const [scoreSearch, setScoreSearch] = useState<string>('');

  // Selected district for detailed dashboard inspector
  const activeDistrictScore = useMemo(() => {
    return (
      DISTRICT_CONSERVATION_SCORES.find((d) => d.district === selectedScoreDistrict) ||
      DISTRICT_CONSERVATION_SCORES[0]
    );
  }, [selectedScoreDistrict]);

  // Ranked scores map
  const rankingMap = useMemo(() => {
    const sorted = [...DISTRICT_CONSERVATION_SCORES]
      .filter((d) => typeof d.overallScore === 'number')
      .sort((a, b) => (b.overallScore ?? 0) - (a.overallScore ?? 0));
    const map = new Map<string, number>();
    sorted.forEach((d, idx) => map.set(d.district, idx + 1));
    return map;
  }, []);

  // Filtered and sorted scores for comparison ledger
  const filteredScores = useMemo(() => {
    return DISTRICT_CONSERVATION_SCORES.filter((d) => {
      if (scoreTierFilter !== 'ALL' && d.classification !== scoreTierFilter) return false;
      if (scoreSearch) {
        const q = scoreSearch.toLowerCase();
        return (
          d.district.toLowerCase().includes(q) ||
          d.headquarters.toLowerCase().includes(q) ||
          d.primaryThreat.toLowerCase().includes(q) ||
          d.interventionPriority.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (scoreSortBy === 'score-desc') return (b.overallScore ?? -1) - (a.overallScore ?? -1);
      if (scoreSortBy === 'score-asc') return (a.overallScore ?? 999) - (b.overallScore ?? 999);
      if (scoreSortBy === 'confidence-desc') return b.dataConfidencePct - a.dataConfidencePct;
      if (scoreSortBy === 'trees-desc') return b.totalChinar2026Est - a.totalChinar2026Est;
      if (scoreSortBy === 'name-asc') return a.district.localeCompare(b.district);
      return 0;
    });
  }, [scoreTierFilter, scoreSortBy, scoreSearch]);

  // Aggregate DCCS calculations
  const meanDccsScore = useMemo(() => {
    const scored = DISTRICT_CONSERVATION_SCORES.filter((d) => typeof d.overallScore === 'number');
    if (scored.length === 0) return 0;
    return (scored.reduce((sum, d) => sum + (d.overallScore ?? 0), 0) / scored.length).toFixed(1);
  }, []);

  const meanConfidence = useMemo(() => {
    return (
      DISTRICT_CONSERVATION_SCORES.reduce((sum, d) => sum + d.dataConfidencePct, 0) /
      DISTRICT_CONSERVATION_SCORES.length
    ).toFixed(1);
  }, []);

  // Helper for tier badge
  const renderTierBadge = (tier: DccsClassificationTier, score: number | null) => {
    if (score === null || tier === 'INSUFFICIENT_DATA') {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-400 border border-white/10 font-bold">
          Insufficient Data
        </span>
      );
    }
    switch (tier) {
      case 'STRONG_CONSERVATION':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold inline-flex items-center gap-1">
            <span>🏆</span>
            <span>Strong Conservation</span>
          </span>
        );
      case 'GENERALLY_STABLE':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold inline-flex items-center gap-1">
            <span>🌿</span>
            <span>Generally Stable</span>
          </span>
        );
      case 'MODERATE_CONCERN':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold inline-flex items-center gap-1">
            <span>⚠️</span>
            <span>Moderate Concern</span>
          </span>
        );
      case 'HIGH_CONCERN':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold inline-flex items-center gap-1">
            <span>🚨</span>
            <span>High Concern</span>
          </span>
        );
      case 'CRITICAL':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold inline-flex items-center gap-1">
            <span>🛑</span>
            <span>Critical</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="KEW · ENVIRONMENTAL MONITORING / HERITAGE ARBORICULTURE"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                CHINAR MONITORING
              </span>
              <span>Kashmir Heritage &amp; Arboriculture</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Chinar Census &amp; Ecological Surveillance
            </span>
          </>
        }
        subtitle="Multi-source spatial and ecological monitoring of the historic Kashmir Chinar (Platanus orientalis / Bōyñ). Integrating the 2026 JKFRI Digital Tree Aadhaar census, satellite canopy remote sensing, ground-truth pathology, and statutory legal protection across 10 Kashmir Valley districts."
        icon={<Trees className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold text-xs border border-amber-500/40 transition-all flex items-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Naseem Bagh Living Heritage Observatory</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analytics Dashboards</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>GIS Chinar Atlas</span>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUB-NAVIGATION (Horizontal Tabs) ─── */}
      <ChinarSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* ── 3. FOUR KEY CENSUS INDICATORS STRIP ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              2026 Geotagged Trees
            </span>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              ~{CHINAR_BASIN_TOTALS.totalEstimatedChinars2026.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Official reported estimate
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Source: JKFRI Digital Tree Aadhaar
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              QR-Tagged Trees
            </span>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              ~{(CHINAR_BASIN_TOTALS.totalQRTaggedAadhaar2026 ?? CHINAR_BASIN_TOTALS.totalQrTaggedChinars2026 ?? 8800).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Reported physical tagging
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              QR plates installed on mature trees
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Kashmir Districts
            </span>
            <div className="text-2xl sm:text-4xl font-black text-indigo-400">
              10
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Survey coverage
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              100% Kashmir Valley administrative units
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Full GIS Acquisition
            </span>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              Pending
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Individual records not obtained
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Institutional exchange in negotiation
            </div>
          </Card>
        </div>

        {/* ── 4. DISTRICT CHINAR CONSERVATION SCORE (DCCS) SECTION ─────────── */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  CONSERVATION PERFORMANCE FRAMEWORK · DCCS MODEL
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                District Chinar Conservation Score (DCCS)
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl mt-1 leading-relaxed">
                Empirical 0–100 conservation performance rating evaluating tree health, population stability, environmental exposure, anthropogenic threats, legal protection, and monitoring quality. <strong className="text-slate-200">Measures conservation conditions, not simply tree population.</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/environmental-monitoring/chinar-monitoring/methodology"
                className="px-3 py-1.5 rounded-[6px] bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scoring Methodology</span>
              </Link>
            </div>
          </div>

          {/* DCCS 4 Highlights Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Card 1: Leading Conservation District */}
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-lg p-3.5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wide font-mono">
                    Leading Conservation
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                  Score 75
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-sm text-white">Kupwara &amp; Ganderbal</span>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">#1 Ranked</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  High crown vitality (&gt;69% healthy), pristine microclimatic soil moisture, and strong customary/sacred grove guardianship.
                </p>
              </div>
            </div>

            {/* Card 2: Highest Stress / Urgent Priority */}
            <div className="bg-slate-900/90 border border-rose-500/30 rounded-lg p-3.5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-rose-300 uppercase tracking-wide font-mono">
                    High Ecological Stress
                  </span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-rose-500/10 text-rose-300 border border-rose-500/30 font-bold">
                  Score 55–60
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-sm text-white">Baramulla &amp; Srinagar</span>
                  <span className="text-[10px] font-mono text-rose-400 font-bold">Priority Intervention</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Severe root paving encasement, Smart City trenching, highway four-laning lopping, and high decay/hollow incidence (14.4%–15.4%).
                </p>
              </div>
            </div>

            {/* Card 3: Valley-Wide Baseline Average */}
            <div className="bg-slate-900/90 border border-white/10 rounded-lg p-3.5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
                    Valley Mean DCCS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-300">Moderate Concern</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black font-mono text-emerald-300">{meanDccsScore} <span className="text-xs font-normal text-slate-400">/ 100</span></span>
                  <span className="text-[10px] font-mono text-slate-400">10 Districts</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${meanDccsScore}%` }} />
                </div>
                <p className="text-[10px] text-slate-500">8 districts classified in Moderate Concern tier (55–69).</p>
              </div>
            </div>

            {/* Card 4: Independent Data Confidence Indicator */}
            <div className="bg-slate-900/90 border border-white/10 rounded-lg p-3.5 space-y-2 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
                    Data Confidence
                  </span>
                </div>
                <span className="text-[10px] font-mono text-indigo-300 font-bold">{meanConfidence}% Mean</span>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Separate output from condition score. High inspection coverage in Srinagar (91%) does not mask its severe urban stress.
                </p>
                <div className="pt-0.5 text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>Dual-metric protection against false penalties</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Interactive District Scoring Dashboard Inspector ── */}
          <div className="bg-slate-900/90 border border-white/10 rounded-lg p-5 sm:p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-emerald-400">
                  DISTRICT CHINAR INTELLIGENCE · 2026 BASELINE
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                  District Performance &amp; 6-Component Breakdown
                </h3>
              </div>

              {/* District Select Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {DISTRICT_CONSERVATION_SCORES.map((d) => (
                  <button
                    key={d.district}
                    onClick={() => setSelectedScoreDistrict(d.district)}
                    className={`px-2.5 py-1 rounded-[5px] text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedScoreDistrict === d.district
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'bg-slate-950 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {d.district}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspector Details for Active District */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Headline Score & Dual Data Confidence */}
              <div className="p-4 rounded-[6px] bg-slate-950 border border-white/10 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase">District</span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      Rank #{rankingMap.get(activeDistrictScore.district)} of 10
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mt-0.5">{activeDistrictScore.district}</h4>
                  <span className="text-xs text-slate-400">HQ: {activeDistrictScore.headquarters} · ~{(activeDistrictScore.totalChinar2026Est ?? 0).toLocaleString()} Trees</span>
                </div>

                {/* Big Score Display */}
                <div className="p-3.5 rounded-[6px] bg-slate-900 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Conservation Score</span>
                    <div className="text-3xl font-black font-mono text-emerald-300 mt-0.5">
                      {activeDistrictScore.overallScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    {renderTierBadge(activeDistrictScore.classification, activeDistrictScore.overallScore)}
                    <span className="text-[10px] text-slate-500 block font-mono">DCCS Index</span>
                  </div>
                </div>

                {/* Independent Data Confidence Display */}
                <div className="p-3.5 rounded-[6px] bg-slate-900 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">Data Confidence</span>
                    <span className="text-xs font-mono font-bold text-indigo-300">{activeDistrictScore.dataConfidencePct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${activeDistrictScore.dataConfidencePct}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-400 block leading-tight">
                    Audited survey coverage, JKFRI census fidelity &amp; verified field samples.
                  </span>
                </div>

                {/* Metadata & Custodian */}
                <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-slate-400 font-mono">
                  <div>Assessment: <span className="text-slate-200">{activeDistrictScore.assessmentDate}</span></div>
                  <div>Primary Threat: <span className="text-rose-300">{activeDistrictScore.primaryThreat}</span></div>
                </div>
              </div>

              {/* Middle Column: 6 Component Scores Progress Bars */}
              <div className="p-4 rounded-[6px] bg-slate-950 border border-white/10 space-y-3.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    6 Component Scores
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Max 100 Pts</span>
                </div>

                {/* 1. Tree Health (25) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">1. Tree Health &amp; Vitality</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {activeDistrictScore.components.treeHealthVitality} <span className="text-slate-500">/ 25</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(activeDistrictScore.components.treeHealthVitality / 25) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Crown condition, absence of heart rot, structural stability</span>
                </div>

                {/* 2. Population Stability (20) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">2. Population Stability</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {activeDistrictScore.components.populationStability} <span className="text-slate-500">/ 20</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(activeDistrictScore.components.populationStability / 20) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Net decadal change, sapling recruitment, verified mortality</span>
                </div>

                {/* 3. Environmental Stress (15) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">3. Environmental Stress</span>
                    <span className="font-mono font-bold text-amber-300">
                      {activeDistrictScore.components.environmentalStress} <span className="text-slate-500">/ 15</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(activeDistrictScore.components.environmentalStress / 15) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Urban heat island, root drought, soil moisture index</span>
                </div>

                {/* 4. Human Threats (15) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">4. Threats &amp; Human Pressure</span>
                    <span className="font-mono font-bold text-rose-300">
                      {activeDistrictScore.components.threatsHumanPressure} <span className="text-slate-500">/ 15</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full" style={{ width: `${(activeDistrictScore.components.threatsHumanPressure / 15) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Asphalt paving encasement, highway cuts, lopping</span>
                </div>

                {/* 5. Protection & Conservation (15) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">5. Protection &amp; Conservation</span>
                    <span className="font-mono font-bold text-cyan-300">
                      {activeDistrictScore.components.protectionConservation} <span className="text-slate-500">/ 15</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(activeDistrictScore.components.protectionConservation / 15) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Act of 1969 enforcement, tree surgery, QR tagging</span>
                </div>

                {/* 6. Monitoring Quality (10) */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">6. Monitoring &amp; Data Quality</span>
                    <span className="font-mono font-bold text-indigo-300">
                      {activeDistrictScore.components.monitoringDataQuality} <span className="text-slate-500">/ 10</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${(activeDistrictScore.components.monitoringDataQuality / 10) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block">Verified sample ratio, inspection recency, institutional audit</span>
                </div>
              </div>

              {/* Right Column: Contributing Indicators & Recommended Interventions */}
              <div className="p-4 rounded-[6px] bg-slate-950 border border-white/10 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Contributing Indicators
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Empirical Baseline</span>
                  </div>

                  <ul className="space-y-2 text-xs">
                    {activeDistrictScore.keyContributingFactors.map((factor, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300 text-[11px] leading-relaxed">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                      Data Sources &amp; Citations:
                    </span>
                    <div className="space-y-0.5 text-[10px] text-slate-500 font-mono">
                      {activeDistrictScore.sourceCitations.map((src, i) => (
                        <div key={i}>[{i + 1}] {src}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended Priority Action Box */}
                <div className="p-3 rounded-[6px] bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold font-mono">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Priority Intervention</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {activeDistrictScore.interventionPriority}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 10-District DCCS Comparison Ledger Table ── */}
          <div className="bg-slate-900/90 border border-white/10 rounded-lg p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  10-District Conservation Performance Comparison Ledger
                </h3>
                <p className="text-xs text-slate-400">
                  Comprehensive audit across all ten Kashmir Valley districts with 6 component scores and independent data confidence ratings.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400">
                Displaying <strong className="text-white">{filteredScores.length}</strong> of 10 districts
              </div>
            </div>

            {/* Filter & Sort Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-950 p-2.5 rounded-[6px] border border-white/10 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {/* Classification Tier Filter */}
                <select
                  value={scoreTierFilter}
                  onChange={(e) => setScoreTierFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-900 border border-white/15 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-medium"
                >
                  <option value="ALL">All Classifications (10)</option>
                  <option value="GENERALLY_STABLE">🌿 Generally Stable (70–84)</option>
                  <option value="MODERATE_CONCERN">⚠️ Moderate Concern (55–69)</option>
                  <option value="HIGH_CONCERN">🚨 High Concern (40–54)</option>
                  <option value="CRITICAL">🛑 Critical (0–39)</option>
                </select>

                {/* Sorting Dropdown */}
                <div className="flex items-center gap-1.5 bg-slate-900 border border-white/15 rounded-[6px] px-2 py-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={scoreSortBy}
                    onChange={(e) => setScoreSortBy(e.target.value)}
                    className="bg-transparent text-slate-200 text-xs focus:outline-none font-medium cursor-pointer"
                  >
                    <option value="score-desc" className="bg-slate-900 text-slate-200">Sort: DCCS Score (High → Low)</option>
                    <option value="score-asc" className="bg-slate-900 text-slate-200">Sort: DCCS Score (Low → High)</option>
                    <option value="confidence-desc" className="bg-slate-900 text-slate-200">Sort: Data Confidence %</option>
                    <option value="trees-desc" className="bg-slate-900 text-slate-200">Sort: Chinar Trees Count</option>
                    <option value="name-asc" className="bg-slate-900 text-slate-200">Sort: District Name (A → Z)</option>
                  </select>
                </div>
              </div>

              {/* District Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter district / threat..."
                  value={scoreSearch}
                  onChange={(e) => setScoreSearch(e.target.value)}
                  className="pl-7 pr-3 py-1.5 bg-slate-900 border border-white/15 rounded-[6px] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-white/10 rounded-lg bg-slate-950/70 shadow-inner">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                  <tr>
                    <th className="p-3">District</th>
                    <th className="p-3">DCCS Score &amp; Tier</th>
                    <th className="p-3">Data Confidence</th>
                    <th className="p-3 text-right">Health (25)</th>
                    <th className="p-3 text-right">Stability (20)</th>
                    <th className="p-3 text-right">Env Stress (15)</th>
                    <th className="p-3 text-right">Threats (15)</th>
                    <th className="p-3 text-right">Protection (15)</th>
                    <th className="p-3 text-right">Data (10)</th>
                    <th className="p-3 text-right">2026 Trees</th>
                    <th className="p-3">Priority Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredScores.length > 0 ? (
                    filteredScores.map((d) => {
                      const rank = rankingMap.get(d.district);
                      const isSelected = selectedScoreDistrict === d.district;

                      return (
                        <tr
                          key={d.district}
                          onClick={() => setSelectedScoreDistrict(d.district)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-emerald-950/40 hover:bg-emerald-950/60' : 'hover:bg-white/5'
                          }`}
                        >
                          {/* District */}
                          <td className="p-3 font-semibold text-white">
                            <div className="flex items-center gap-1.5">
                              {rank && rank <= 2 && (
                                <span className="text-amber-400 text-xs" title={`Rank #${rank} Best Conservation`}>
                                  🏆
                                </span>
                              )}
                              <span>{d.district}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 font-normal">HQ: {d.headquarters}</div>
                          </td>

                          {/* DCCS Score & Tier */}
                          <td className="p-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-bold text-slate-400">
                                  #{rank}
                                </span>
                                <span className="text-xs font-mono font-bold text-emerald-300">
                                  {d.overallScore}
                                  <span className="text-[9px] font-normal text-slate-400">/100</span>
                                </span>
                                {renderTierBadge(d.classification, d.overallScore)}
                              </div>
                              <div className="w-20 bg-slate-800 rounded-full h-1 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-emerald-400"
                                  style={{ width: `${d.overallScore}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Data Confidence */}
                          <td className="p-3">
                            <span className="font-mono text-xs font-bold text-indigo-300 px-1.5 py-0.5 rounded-[4px] bg-indigo-500/10 border border-indigo-500/20">
                              {d.dataConfidencePct}%
                            </span>
                          </td>

                          {/* 6 Component Scores */}
                          <td className="p-3 text-right font-mono text-emerald-300 font-bold">{d.components.treeHealthVitality}</td>
                          <td className="p-3 text-right font-mono text-slate-300">{d.components.populationStability}</td>
                          <td className="p-3 text-right font-mono text-amber-300">{d.components.environmentalStress}</td>
                          <td className="p-3 text-right font-mono text-rose-300 font-bold">{d.components.threatsHumanPressure}</td>
                          <td className="p-3 text-right font-mono text-cyan-300">{d.components.protectionConservation}</td>
                          <td className="p-3 text-right font-mono text-indigo-300">{d.components.monitoringDataQuality}</td>

                          {/* Total Trees Count */}
                          <td className="p-3 text-right font-mono text-white font-bold">
                            {d.totalChinar2026Est.toLocaleString()}
                          </td>

                          {/* Intervention Priority */}
                          <td className="p-3 text-[11px] text-slate-300 max-w-[200px] truncate" title={d.interventionPriority}>
                            {d.interventionPriority}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={11} className="p-8 text-center text-slate-500 text-xs">
                        No district conservation records matching active filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 5. INTERACTIVE CHINAR GIS ATLAS SHOWCASE BLOCK ────────────────── */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Geospatial Intelligence
              </span>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                <Compass className="w-5 h-5 text-emerald-400" />
                Interactive Chinar GIS Atlas &amp; Choropleth Layer
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                District DCCS conservation choropleth, individually verified Chinar locations, tree-health observations, heritage sites, and conservation zones. Spatial boundaries accurately reflect audited ground conditions.
              </p>
            </div>
            <Link
              href="/environmental-monitoring/chinar-monitoring/gis-atlas"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[6px] text-xs font-mono font-bold flex items-center gap-2 shrink-0 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Full GIS Atlas</span>
            </Link>
          </div>

          {/* Layer Indicator Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-[6px] bg-slate-950 border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">DCCS Score Choropleth</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400">10-district conservation score layer &amp; health tiers</p>
              <span className="text-[10px] font-mono text-emerald-400">Layer Active (100% Coverage)</span>
            </div>

            <div className="p-3.5 rounded-[6px] bg-slate-950 border border-amber-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Tree Health Pathology</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <p className="text-[11px] text-slate-400">Crown dieback, hollow trunk &amp; anthracnose index</p>
              <span className="text-[10px] font-mono text-amber-400">Layer Active (Survey Sample)</span>
            </div>

            <div className="p-3.5 rounded-[6px] bg-slate-950 border border-indigo-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Heritage Trees</span>
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
              </div>
              <p className="text-[11px] text-slate-400">Centuries-old Mughal &amp; Sufi monumental groves</p>
              <span className="text-[10px] font-mono text-indigo-400">Layer Active (Verified Points)</span>
            </div>

            <div className="p-3.5 rounded-[6px] bg-slate-950 border border-rose-500/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Threats &amp; Restoration</span>
                <span className="w-2 h-2 rounded-full bg-rose-400" />
              </div>
              <p className="text-[11px] text-slate-400">Paving encasement, highway cuts &amp; clonal nurseries</p>
              <span className="text-[10px] font-mono text-rose-400">Layer Active (Incident Map)</span>
            </div>
          </div>
        </div>

        {/* ── 6. 10-DISTRICT 2026 CENSUS SUMMARY TABLE ──────────────────────── */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg overflow-hidden space-y-0">
          <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                2026 Kashmir Valley Chinar Census Ledger
              </h2>
              <p className="text-xs text-slate-400">
                Official reported aggregates across 10 administrative districts with historical ESRO reconciliation.
              </p>
            </div>
            <Link
              href="/environmental-monitoring/chinar-monitoring/census"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span>Examine Full Census Data</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/70 font-mono text-slate-400 text-[11px]">
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3 text-right">2026 Estimate</th>
                  <th className="py-2.5 px-3 text-right">Geotagged (JKFRI)</th>
                  <th className="py-2.5 px-3 text-right">QR Aadhaar Tagged</th>
                  <th className="py-2.5 px-3 text-right">Historical (ESRO)</th>
                  <th className="py-2.5 px-3 text-right">Net Change</th>
                  <th className="py-2.5 px-3 text-right">Healthy (%)</th>
                  <th className="py-2.5 px-3 text-center">GIS Acquisition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DISTRICT_CHINAR_CENSUS.map((d) => (
                  <tr key={d.district} className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {d.district}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400">
                      {d.totalChinar2026Est.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300">
                      {d.geotaggedCount2026.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-300">
                      {d.qrTaggedCount2026.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                      {d.historicalESROCount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-400">
                      {d.netDecadalChangePct}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-300">
                      {d.healthyTreePct}%
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {d.dataReadinessStatus === 'SUMMARY_RELEASED_GIS_RESTRICTED' ? 'Summary Released' : 'Full GIS'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View (Mobile First Ergonomics) */}
          <div className="block md:hidden divide-y divide-white/5">
            {DISTRICT_CHINAR_CENSUS.map((d) => (
              <div key={d.district} className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{d.district}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Summary Released
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-950/60 p-2 rounded-[4px] border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-mono">2026 Estimate</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      {d.totalChinar2026Est.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-[4px] border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-mono">QR Tagged</span>
                    <span className="text-sm font-bold font-mono text-amber-300">
                      {d.qrTaggedCount2026.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                  <span>Geotagged: <strong className="text-slate-200">{d.geotaggedCount2026.toLocaleString()}</strong></span>
                  <span>Net Delta: <strong className="text-rose-400">{d.netDecadalChangePct}%</strong></span>
                  <span>Healthy: <strong className="text-emerald-400">{d.healthyTreePct}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
