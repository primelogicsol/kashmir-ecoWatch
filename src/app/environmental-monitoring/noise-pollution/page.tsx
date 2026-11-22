'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Volume2,
  VolumeX,
  Radio,
  BarChart3,
  Compass,
  Car,
  Factory,
  Zap,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink,
  Sliders,
  Sparkles,
  ArrowRight,
  Calculator,
  Search,
  Filter
} from 'lucide-react';

import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import {
  DISTRICT_NOISE_PROFILES,
  NOISE_MONITORING_STATIONS,
  SENSITIVE_RECEPTORS,
  WILDLIFE_ACOUSTIC_ZONES,
  NOISE_SOURCE_SECTORS,
  REGIONAL_NOISE_SUMMARIES,
  calculateLogLeq,
  type NoiseRegion,
  type DistrictNoiseProfile
} from '@/data/noise-pollution';

export default function NoisePollutionOverviewPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Interactive Decibel Addition Calculator State
  const [calcSource1, setCalcSource1] = useState<number>(70);
  const [calcSource2, setCalcSource2] = useState<number>(70);
  const [calcSource3, setCalcSource3] = useState<number>(65);

  const calculatedCombinedDb = useMemo(() => {
    return calculateLogLeq([calcSource1, calcSource2, calcSource3]);
  }, [calcSource1, calcSource2, calcSource3]);

  // Filtered districts
  const filteredDistricts = useMemo(() => {
    return DISTRICT_NOISE_PROFILES.filter((d) => {
      const matchRegion = selectedRegion === 'ALL' || d.region === selectedRegion;
      const matchSearch =
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.primaryNoiseSources.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'SCORED' && d.districtNoiseBurdenScore !== undefined) ||
        (statusFilter === 'UNMONITORED' && d.districtNoiseBurdenScore === undefined);
      return matchRegion && matchSearch && matchStatus;
    });
  }, [selectedRegion, searchQuery, statusFilter]);

  // Overall Statistics
  const totalDistricts = DISTRICT_NOISE_PROFILES.length;
  const scoredDistricts = DISTRICT_NOISE_PROFILES.filter((d) => d.districtNoiseBurdenScore !== undefined).length;
  const unmonitoredCount = totalDistricts - scoredDistricts;
  const operationalStations = NOISE_MONITORING_STATIONS.filter((s) => s.operatingStatus === 'OPERATIONAL').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER ─── */}
      <Heading
        label="KEW · ENVIRONMENTAL MONITORING / ACOUSTIC INTELLIGENCE"
        images={[
          '/images/env-monitoring/kashmir-noise-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-transport-hero.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Noise Pollution' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                NOISE POLLUTION
              </span>
              <span>Acoustic Intelligence &amp; Sound Surveillance</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Environmental Decibel Monitoring
            </span>
          </>
        }
        subtitle="Empirical decibel measurements, multi-jurisdiction compliance audits, statutory silence zone protection and 42-district acoustic burden scoring across Kashmir Valley, Jammu, Ladakh, AJK, and Gilgit-Baltistan. Tracking 22 continuous Class 1/2 monitoring stations, daytime & nighttime LAeq baselines, bioacoustic wildlife impact, and sensitive human exposure."
        icon={<Volume2 className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/noise-pollution/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>District DNPBS Scores</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Noise GIS Atlas</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/monitoring-stations"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 text-orange-400" />
              <span>Sensor Network</span>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUB-NAVIGATION (18 Standalone Submodules) ─── */}
      <NoisePollutionSubNav />

      {/* ── 3. FOUR KEY TELEMETRY CARDS STRIP ─── */}
      <section className="py-6 border-b border-white/10 bg-slate-950/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Active Monitoring Stations
                </span>
                <Radio className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-amber-400">
                {operationalStations} <span className="text-sm font-normal text-slate-400">Stations</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                11 Class 1/2 Reg. Continuous Stations
              </div>
              <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
                Source: CPCB, JKSPCB, EPA &amp; GB-EPA Networks
              </div>
            </Card>

            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Ambient Baseline Day L_Aeq
                </span>
                <Volume2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-emerald-400">
                65.2 <span className="text-sm font-normal text-slate-400">dB(A)</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                Logarithmic Basin Energy Average
              </div>
              <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
                ISO 1996 &amp; IEC 61672 Log Integration
              </div>
            </Card>

            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Statutory Exceedance Rate
                </span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-rose-400">
                48.4%
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                Above Day/Night Regulatory Limits
              </div>
              <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
                Noise Rules 2000 &amp; NEQS 2010 Violations
              </div>
            </Card>

            <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Five-Region Scope
                </span>
                <Compass className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-cyan-400">
                {totalDistricts} <span className="text-sm font-normal text-slate-400">Districts</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium">
                ~1.84M High-Exposure Population (&gt;65 dB)
              </div>
              <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
                {scoredDistricts} Scored · {unmonitoredCount} Unmonitored (N/A)
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── SCIENTIFIC LOGARITHMIC DECIBEL MATH & CALIBRATION CALLOUT ────────────── */}
      <section className="py-8 bg-slate-900/40 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="p-5 rounded-[8px] bg-slate-900/90 border border-amber-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 text-[11px] font-mono tracking-wider uppercase">
                  <Calculator className="w-3 h-3" />
                  <span>Acoustic Rule · Logarithmic Sound Aggregation</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Decibels are Logarithmic (L_Aeq): Arithmetic Averaging is Strictly Prohibited
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sound pressure levels are measured in decibels (dB), a logarithmic unit reflecting human hearing.
                  Two independent 70 dB sources do not equal 140 dB—they produce exactly <strong>73 dB</strong>.
                  KEW applies the strict ISO 1996 and IEC 61672 mathematical formula across all submodules:
                </p>
                <div className="p-3 rounded-[6px] bg-slate-950 font-mono text-xs text-amber-300 border border-white/10 overflow-x-auto">
                  <code>
                    L_Aeq = 10 · log10 [ (1 / T) · ∑ (t_i · 10^(L_i / 10)) ]
                  </code>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Zero synthetic data synthesis
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Separate Data Confidence Rating (0–100%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Transparent N/A for unmonitored districts
                  </span>
                </div>
              </div>

              {/* Interactive Decibel Addition Widget */}
              <div className="lg:col-span-5 p-4 rounded-[6px] bg-slate-950/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    Live Logarithmic Calculator
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Real-time ISO 1996</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Source 1: Traffic Arterial</span>
                      <span className="font-mono text-white">{calcSource1} dB(A)</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      value={calcSource1}
                      onChange={(e) => setCalcSource1(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-slate-800 rounded"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Source 2: Horn / Commercial</span>
                      <span className="font-mono text-white">{calcSource2} dB(A)</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      value={calcSource2}
                      onChange={(e) => setCalcSource2(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-slate-800 rounded"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Source 3: Generator / Construction</span>
                      <span className="font-mono text-white">{calcSource3} dB(A)</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="100"
                      value={calcSource3}
                      onChange={(e) => setCalcSource3(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-slate-800 rounded"
                    />
                  </div>
                </div>
                <div className="mt-3 p-3 rounded-[6px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-amber-300/80 uppercase font-mono">Combined Acoustic Pressure</div>
                    <div className="text-xl font-bold text-amber-300 font-mono">{calculatedCombinedDb} dB(A)</div>
                  </div>
                  <div className="text-[10px] text-right text-slate-400 max-w-[150px]">
                    Arithmetic would yield {(calcSource1 + calcSource2 + calcSource3).toFixed(1)} dB (impossible physically)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 42-DISTRICT NOISE POLLUTION BURDEN SCORE (DNPBS) DASHBOARD ───────── */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Empirical Regional Assessment</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                42-District Noise Pollution Burden Score (DNPBS · 0–100)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1">
                Composite burden index calculated from measured exposure (30%), population &amp; sensitive receptors (25%),
                statutory standards exceedance (20%), night-time sleep disturbance (15%), and ecological acoustic impact (10%).
                Districts lacking continuous monitoring display transparent <strong>N/A</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/environmental-monitoring/noise-pollution/dashboards"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-xs text-amber-400 border border-amber-500/30 transition-colors"
              >
                <span>Full Analytics Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Regional Summary Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {REGIONAL_NOISE_SUMMARIES.map((r) => (
              <button
                key={r.region}
                onClick={() => setSelectedRegion(selectedRegion === r.region ? 'ALL' : r.region)}
                className={`p-3 rounded-[8px] text-left transition-all border ${
                  selectedRegion === r.region
                    ? 'bg-amber-500/15 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-white">{r.region}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{r.monitoredDistricts}/{r.totalDistricts} Mon.</span>
                </div>
                <div className="text-base font-bold text-amber-400 font-mono">
                  {r.averageDayLeq ? `${r.averageDayLeq} dB(A)` : 'N/A'}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>Confidence</span>
                  <span className="text-emerald-400 font-mono">{r.overallDataConfidencePct}%</span>
                </div>
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="p-3.5 rounded-[8px] bg-slate-900/80 border border-white/10 mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search district or noise source (e.g. Srinagar, Airport, Generator)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-slate-950 border border-white/10 rounded-[6px] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <div className="flex items-center gap-1 text-xs">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400 mr-1">Status:</span>
              </div>
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-[4px] text-xs font-medium transition-colors ${
                  statusFilter === 'ALL'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All ({DISTRICT_NOISE_PROFILES.length})
              </button>
              <button
                onClick={() => setStatusFilter('SCORED')}
                className={`px-2.5 py-1 rounded-[4px] text-xs font-medium transition-colors ${
                  statusFilter === 'SCORED'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Monitored ({scoredDistricts})
              </button>
              <button
                onClick={() => setStatusFilter('UNMONITORED')}
                className={`px-2.5 py-1 rounded-[4px] text-xs font-medium transition-colors ${
                  statusFilter === 'UNMONITORED'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Unmonitored / N/A ({unmonitoredCount})
              </button>
            </div>
          </div>

          {/* District Table */}
          <div className="rounded-[8px] border border-white/10 overflow-hidden bg-slate-900/60 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/90 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">District &amp; Region</th>
                    <th className="py-3 px-3">Monitoring Status</th>
                    <th className="py-3 px-3 text-center">DNPBS Burden</th>
                    <th className="py-3 px-3 text-center">Confidence</th>
                    <th className="py-3 px-3">Day / Night Leq</th>
                    <th className="py-3 px-3">Statutory Exceedance</th>
                    <th className="py-3 px-4">Primary Noise Sources</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {filteredDistricts.map((d) => {
                    const isMonitored = d.districtNoiseBurdenScore !== undefined;
                    return (
                      <tr key={d.district} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white text-sm">{d.district}</div>
                          <div className="text-[11px] text-slate-400">{d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region} · {d.population.toLocaleString()} pop</div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase tracking-wide ${
                              d.monitoringStatus === 'OPERATIONAL'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : d.monitoringStatus === 'PERIODIC_SURVEY'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-slate-800 text-slate-400 border border-white/5'
                            }`}
                          >
                            {d.monitoringStatus === 'OPERATIONAL' ? '● Continuous' : d.monitoringStatus === 'PERIODIC_SURVEY' ? '◐ Periodic' : '○ Unmonitored'}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center font-mono">
                          {isMonitored ? (
                            <div className="inline-block px-2.5 py-1 rounded-[4px] font-bold text-sm bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {d.districtNoiseBurdenScore}
                              <span className="text-[9px] text-amber-400/70 font-normal">/100</span>
                            </div>
                          ) : (
                            <span className="text-slate-500 font-mono text-xs px-2 py-0.5 rounded bg-slate-800/60">
                              N/A
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-center font-mono">
                          <div className="text-xs font-semibold text-slate-200">{d.dataConfidenceRating}%</div>
                          <div className="w-12 h-1 bg-slate-800 rounded mx-auto mt-1 overflow-hidden">
                            <div
                              className={`h-full ${
                                d.dataConfidenceRating > 70
                                  ? 'bg-emerald-400'
                                  : d.dataConfidenceRating > 40
                                  ? 'bg-amber-400'
                                  : 'bg-rose-400'
                              }`}
                              style={{ width: `${d.dataConfidenceRating}%` }}
                            />
                          </div>
                        </td>

                        <td className="py-3 px-3 font-mono">
                          {d.baselineDayLeq ? (
                            <div>
                              <span className="text-white font-bold">{d.baselineDayLeq}</span>
                              <span className="text-slate-400 text-[10px]"> / </span>
                              <span className="text-slate-300">{d.baselineNightLeq}</span>
                              <span className="text-[10px] text-slate-500 ml-1">dB(A)</span>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">No continuous readings</span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          {d.standardsExceedanceDayPct !== undefined ? (
                            <div className="text-xs">
                              <span className="text-rose-400 font-mono font-semibold">{d.standardsExceedanceDayPct}%</span>
                              <span className="text-slate-400 text-[10px]"> Day · </span>
                              <span className="text-amber-400 font-mono">{d.standardsExceedanceNightPct}%</span>
                              <span className="text-slate-400 text-[10px]"> Night</span>
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Unquantified</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {d.primaryNoiseSources.slice(0, 2).map((s, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-white/5 whitespace-nowrap"
                              >
                                {s}
                              </span>
                            ))}
                            {d.primaryNoiseSources.length > 2 && (
                              <span className="text-[10px] text-slate-500">
                                +{d.primaryNoiseSources.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-950/80 border-t border-white/10 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span>
                Showing {filteredDistricts.length} of 42 administrative districts across all 5 Himalayan regions.
              </span>
              <span className="text-[11px] text-amber-400/90 flex items-center gap-1 font-mono">
                <Info className="w-3 h-3" /> Zero simulated sensor values. Unmonitored districts remain N/A.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOISE SOURCE SECTORS ARCHITECTURE ─────────────────────────────────── */}
      <section className="py-10 bg-slate-900/40 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Factory className="w-3.5 h-3.5" />
              <span>Multi-Sectoral Attribution</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Dominant Environmental Noise Sources &amp; Decibel Profiles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1">
              Analysis of acoustic sound emissions across road corridors, construction projects, tourism hubs,
              and winter diesel generators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {NOISE_SOURCE_SECTORS.map((sector) => {
              const Icon =
                sector.category === 'TRANSPORTATION'
                  ? Car
                  : sector.category === 'CONSTRUCTION_INDUSTRIAL'
                  ? Factory
                  : sector.category === 'COMMUNITY_TOURISM'
                  ? Volume2
                  : Zap;

              const routeLink =
                sector.category === 'TRANSPORTATION'
                  ? '/environmental-monitoring/noise-pollution/transport-noise'
                  : sector.category === 'CONSTRUCTION_INDUSTRIAL'
                  ? '/environmental-monitoring/noise-pollution/industrial-construction'
                  : sector.category === 'COMMUNITY_TOURISM'
                  ? '/environmental-monitoring/noise-pollution/community-tourism'
                  : '/environmental-monitoring/noise-pollution/infrastructure-noise';

              return (
                <div
                  key={sector.id}
                  className="p-5 rounded-[8px] bg-slate-900/80 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-[6px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {sector.typicalDecibelRange}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5">{sector.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">{sector.description}</p>

                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Documented Corridors</div>
                      {sector.keyRegionalExamples.slice(0, 2).map((ex, idx) => (
                        <div key={idx} className="text-xs flex items-center justify-between text-slate-300">
                          <span className="truncate pr-2">{ex.location}</span>
                          <span className="font-mono text-amber-400 font-semibold">{ex.peakLeqDb} dB</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10">
                    <Link
                      href={routeLink}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
                    >
                      <span>Explore Sector Intelligence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SILENCE ZONES & WILDLIFE ACOUSTICS PREVIEW ────────────────────────── */}
      <section className="py-10 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sensitive Silence Zones */}
            <div className="p-6 rounded-[8px] bg-slate-900/70 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-[6px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <VolumeX className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Statutory Silence Zones &amp; Hospitals</h3>
                    <p className="text-xs text-slate-400">100m legally designated quiet buffers around healthcare &amp; courts</p>
                  </div>
                </div>
                <Link
                  href="/environmental-monitoring/noise-pollution/sensitive-zones"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {SENSITIVE_RECEPTORS.slice(0, 4).map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-[6px] bg-slate-950/70 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{rec.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {rec.district} ({rec.region}) · {rec.isOfficiallyNotifiedSilenceZone ? 'Gazette Notified' : 'De Facto Buffer'}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-rose-400 font-bold">{rec.measuredDayLeq} dB(A)</div>
                      <div className="text-[10px] text-rose-300/80">+{rec.exceedanceDb} dB exceedance</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wildlife Bioacoustics */}
            <div className="p-6 rounded-[8px] bg-slate-900/70 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-[6px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <PawPrint className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Wildlife &amp; Bioacoustic Habitat Protection</h3>
                    <p className="text-xs text-slate-400">Acoustic masking risks for Hangul, snow leopard &amp; migratory waterfowl</p>
                  </div>
                </div>
                <Link
                  href="/environmental-monitoring/noise-pollution/wildlife-acoustics"
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {WILDLIFE_ACOUSTIC_ZONES.slice(0, 3).map((wz) => (
                  <div
                    key={wz.id}
                    className="p-3 rounded-[6px] bg-slate-950/70 border border-white/5 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-white">{wz.name}</div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Limit: {wz.recommendedMaxLeqDb} dB
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Species: {wz.targetSpecies.join(', ')}
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed italic">
                      &quot;{wz.biologicalImpactRisk}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 18 SUBMODULES EXPLORATION GRID ───────────────────────────────────── */}
      <section className="py-12 bg-slate-900/30 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              System Architecture
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              18 Complete Scientific Intelligence Submodules
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Explore specialized modules spanning acoustic sensor telemetry, GIS propagation models,
              sectoral noise sources, human health exposure, wildlife bioacoustics and statutory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Dashboards & District Scores',
                href: '/environmental-monitoring/noise-pollution/dashboards',
                desc: 'Comparative regional analytics, DNPBS component weighting and noise exposure burdens.',
                badge: 'Analytics'
              },
              {
                title: 'Noise GIS Atlas',
                href: '/environmental-monitoring/noise-pollution/gis-atlas',
                desc: 'Spatial sound contours, physical station coordinates and noise hotspot mapping.',
                badge: 'Geospatial'
              },
              {
                title: 'Monitoring Stations Registry',
                href: '/environmental-monitoring/noise-pollution/monitoring-stations',
                desc: 'Continuous CPCB, PCC and university Class 1/2 sound level meters and calibration logs.',
                badge: 'Hardware'
              },
              {
                title: 'Sound Measurements & Trends',
                href: '/environmental-monitoring/noise-pollution/measurements',
                desc: 'Granular LAeq, Lmax, Lmin, L10, L90, Lden, Lnight and octave frequency spectra.',
                badge: 'Acoustics'
              },
              {
                title: 'Transportation Noise Corridors',
                href: '/environmental-monitoring/noise-pollution/transport-noise',
                desc: 'Highways (NH-44), horn honking prevalence, railway lines and aviation flight paths.',
                badge: 'Mobility'
              },
              {
                title: 'Construction & Industrial Plant Noise',
                href: '/environmental-monitoring/noise-pollution/industrial-construction',
                desc: 'Stone crushers, brick kiln blowers, highway tunneling and heavy manufacturing estates.',
                badge: 'Industry'
              },
              {
                title: 'Community & Tourism Disruption',
                href: '/environmental-monitoring/noise-pollution/community-tourism',
                desc: 'Dal Boulevard boat engines, resort loudspeakers, markets and public event amplification.',
                badge: 'Tourism'
              },
              {
                title: 'Generators & Infrastructure Noise',
                href: '/environmental-monitoring/noise-pollution/infrastructure-noise',
                desc: 'Winter diesel generator sets, hydro substations and municipal pumping stations.',
                badge: 'Utilities'
              },
              {
                title: 'Sensitive & Silence Zones',
                href: '/environmental-monitoring/noise-pollution/sensitive-zones',
                desc: '100m buffer compliance audits around hospitals, universities, schools and high courts.',
                badge: 'Protection'
              },
              {
                title: 'Human Health & Sleep Exposure',
                href: '/environmental-monitoring/noise-pollution/health-exposure',
                desc: 'WHO 2018 guidelines, nocturnal sleep fragmentation and cardiovascular disease risks.',
                badge: 'Public Health'
              },
              {
                title: 'Wildlife & Acoustic Ecology',
                href: '/environmental-monitoring/noise-pollution/wildlife-acoustics',
                desc: 'Bioacoustic monitoring in Dachigam (Hangul), Hemis (Snow Leopard) and Hokersar.',
                badge: 'Bioacoustics'
              },
              {
                title: 'Acoustic Hotspots & Modelling',
                href: '/environmental-monitoring/noise-pollution/hotspots',
                desc: 'CNOSSOS-EU propagation models, mountain gorge reflections and inversion traps.',
                badge: 'Modelling'
              },
              {
                title: 'Standards & Compliance Engine',
                href: '/environmental-monitoring/noise-pollution/standards-compliance',
                desc: 'India Noise Rules 2000 vs Pakistan NEQS 2010 vs WHO 2018 comparative limits.',
                badge: 'Statutes'
              },
              {
                title: 'Mitigation & Interventions',
                href: '/environmental-monitoring/noise-pollution/mitigation',
                desc: 'Acoustic barrier screens, porous asphalt, silent DG enclosures and no-horn cameras.',
                badge: 'Solutions'
              },
              {
                title: 'Citizen Noise Watch',
                href: '/environmental-monitoring/noise-pollution/citizen-watch',
                desc: 'Privacy-compliant crowdsourced sound reports and community complaint verification.',
                badge: 'Citizen'
              },
              {
                title: 'Data Sources & Integrations',
                href: '/environmental-monitoring/noise-pollution/data-sources',
                desc: 'Institutional transparency matrix for CPCB, JKPCC, LPCC, AJK-EPA, GB-EPA and APIs.',
                badge: 'Providers'
              },
              {
                title: 'Research, Methodology & Open Data',
                href: '/environmental-monitoring/noise-pollution/methodology',
                desc: 'Scientific formulas, calibration protocols, GeoJSON / CSV open data access.',
                badge: 'Open Data'
              }
            ].map((sub, i) => (
              <Link
                key={i}
                href={sub.href}
                className="p-4 rounded-[8px] bg-slate-900/60 border border-white/5 hover:border-amber-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {sub.badge}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{sub.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
