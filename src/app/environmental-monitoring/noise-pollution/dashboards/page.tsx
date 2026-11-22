'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Layers,
  Compass,
  Radio,
  Volume2,
  AlertTriangle,
  HeartPulse,
  VolumeX,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import {
  DISTRICT_NOISE_PROFILES,
  REGIONAL_NOISE_SUMMARIES,
  NoiseRegion
} from '@/data/noise-pollution';

export default function NoiseDashboardsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<'score' | 'dayLeq' | 'confidence'>('score');

  const filteredDistricts = useMemo(() => {
    return DISTRICT_NOISE_PROFILES.filter((d) => {
      const matchRegion = selectedRegion === 'ALL' || d.region === selectedRegion;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        d.district.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.primaryNoiseSources.some((s) => s.toLowerCase().includes(q));
      return matchRegion && matchSearch;
    }).sort((a, b) => {
      if (sortField === 'score') {
        return (b.districtNoiseBurdenScore ?? -1) - (a.districtNoiseBurdenScore ?? -1);
      }
      if (sortField === 'dayLeq') {
        return (b.baselineDayLeq ?? -1) - (a.baselineDayLeq ?? -1);
      }
      return b.dataConfidenceRating - a.dataConfidenceRating;
    });
  }, [selectedRegion, searchQuery, sortField]);

  const scoredCount = DISTRICT_NOISE_PROFILES.filter((d) => d.districtNoiseBurdenScore !== undefined).length;
  const criticalCount = DISTRICT_NOISE_PROFILES.filter((d) => (d.districtNoiseBurdenScore ?? 0) >= 75).length;
  const highConcernCount = DISTRICT_NOISE_PROFILES.filter(
    (d) => (d.districtNoiseBurdenScore ?? 0) >= 60 && (d.districtNoiseBurdenScore ?? 0) < 75
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION A · MONITORING & GEOGRAPHIC INTELLIGENCE"
        images={[
          '/images/env-monitoring/kashmir-noise-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-transport-hero.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Noise Pollution', href: '/environmental-monitoring/noise-pollution' },
          { label: 'Dashboards & District Scores' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                DNPBS ANALYTICS
              </span>
              <span>District Noise Burden Scores</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              42-District Acoustic Burden Index (0–100)
            </span>
          </>
        }
        subtitle="Comprehensive empirical scoring of ambient acoustic pressure across 42 Himalayan districts. Weighted across 5 scientific criteria: Measured Sound Levels (30%), Exposed Population (25%), Regulatory Exceedance (20%), Night Sleep Disruption (15%), and Silence Zone Stress (10%)."
        icon={<BarChart3 className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/noise-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Overview Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Noise GIS Atlas</span>
            </Link>
          </div>
        }
      />

      <NoisePollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── 4 KPI CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Highest Burden District
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              Srinagar <span className="text-sm font-normal text-slate-400">(86/100)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Critical acoustic burden · 74.2 dB(A) day
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Followed by Jammu (84) &amp; Abbottabad (82)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Critical Burden Cohort
              </span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              {criticalCount} <span className="text-sm font-normal text-slate-400">Districts</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              DNPBS &ge; 75 · Urgent mitigation required
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              {highConcernCount} additional districts in High Concern (60–74)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Regional Day Baseline
              </span>
              <Volume2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              65.2 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Logarithmic Energy Equivalence
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Night Baseline: 50.8 dB(A) basin average
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Empirical Evidence Ledger
              </span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              {scoredCount} <span className="text-sm font-normal text-slate-400">/ 42 Scored</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              22 unmonitored marked transparent N/A
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Zero synthetic data fabrication pledge
            </div>
          </Card>
        </div>

        {/* ── FIVE SCORING CRITERIA ARCHITECTURE ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Scientific Formulation
              </span>
              <h3 className="text-xl font-bold text-white">DNPBS Five-Factor Weighting Architecture</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Composite index calibrated strictly against IEC 61672 &amp; WHO guidelines
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                weight: '30 Pts',
                title: 'Measured Sound Levels',
                param: 'LAeq & Peak Lmax',
                desc: 'Continuous logarithmic equivalent decibel levels measured along primary arterial and commercial transects.',
                color: 'text-amber-400'
              },
              {
                weight: '25 Pts',
                title: 'Exposed Population',
                param: 'Density & Buffers',
                desc: 'Residents and schools located within the high-exposure 50m and 100m acoustic impact contours.',
                color: 'text-orange-400'
              },
              {
                weight: '20 Pts',
                title: 'Statutory Exceedance',
                param: 'Noise Rules 2000 / NEQS',
                desc: 'Percentage of operating hours exceeding statutory commercial (65 dB) and residential (55 dB) day thresholds.',
                color: 'text-rose-400'
              },
              {
                weight: '15 Pts',
                title: 'Sleep Disturbance',
                param: 'Night Lnight > 45 dB',
                desc: 'Night-time acoustic exposure index evaluated against WHO thresholds for chronic cardiac and sleep morbidity.',
                color: 'text-purple-400'
              },
              {
                weight: '10 Pts',
                title: 'Ecological & Silence Stress',
                param: 'Sanctuary Encroachment',
                desc: 'Acoustic intrusion into notified 100m hospital/school silence zones and protected bioacoustic wildlife habitats.',
                color: 'text-emerald-400'
              }
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-[8px] bg-slate-900/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold ${f.color}`}>{f.weight}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Factor {i + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{f.title}</h4>
                <div className="text-[11px] text-slate-400 font-mono">{f.param}</div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FIVE REGIONS COMPARATIVE SUMMARY ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Macro-Geographic Intelligence
              </span>
              <h3 className="text-xl font-bold text-white">Five-Region Acoustic Burden Overview</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Aggregated across all 42 administrative jurisdictions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {REGIONAL_NOISE_SUMMARIES.map((r) => (
              <Card
                key={r.region}
                className={`p-4 rounded-[8px] transition-all cursor-pointer border ${
                  selectedRegion === r.region
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900/80 border-white/10 hover:border-white/20'
                }`}
                onClick={() => setSelectedRegion(selectedRegion === r.region ? 'ALL' : r.region)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-bold">
                      {r.monitoredDistricts}/{r.totalDistricts} Monitored
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{r.region}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Day Leq</span>
                    <span className="text-base font-black font-mono text-amber-400">
                      {r.averageDayLeq ? `${r.averageDayLeq} dB` : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-2 rounded-[6px] border border-white/5 mt-3">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Night Leq</span>
                    <span className="text-slate-300 font-bold">{r.averageNightLeq ? `${r.averageNightLeq} dB` : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase block">Confidence</span>
                    <span className="text-emerald-400 font-bold">{r.overallDataConfidencePct}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── 42-DISTRICT SCORES LEDGER ─── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Granular Jurisdiction Assessment
              </span>
              <h3 className="text-xl font-bold text-white">42-District DNPBS Scores Ledger</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 rounded-[6px] bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                onClick={() => setSortField(sortField === 'score' ? 'dayLeq' : 'score')}
                className="px-2.5 py-1 rounded-[6px] bg-slate-900 border border-white/10 text-xs text-slate-300 hover:text-white"
              >
                Sort: {sortField === 'score' ? 'DNPBS Score' : 'Day dB(A)'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-3">Region</th>
                  <th className="py-3 px-3 text-right">Day LAeq</th>
                  <th className="py-3 px-3 text-right">Night LAeq</th>
                  <th className="py-3 px-4 text-center">DNPBS (0–100)</th>
                  <th className="py-3 px-3 text-center">Classification</th>
                  <th className="py-3 px-3 text-center">Confidence</th>
                  <th className="py-3 px-4">Primary Noise Corridors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredDistricts.map((d) => {
                  const score = d.districtNoiseBurdenScore;
                  let badgeBg = 'bg-slate-800 text-slate-400';
                  let classification = 'Unmonitored (N/A)';

                  if (score !== undefined) {
                    if (score >= 75) {
                      badgeBg = 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
                      classification = 'Critical';
                    } else if (score >= 60) {
                      badgeBg = 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
                      classification = 'High Concern';
                    } else if (score >= 45) {
                      badgeBg = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
                      classification = 'Moderate';
                    } else {
                      badgeBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                      classification = 'Stable';
                    }
                  }

                  return (
                    <tr key={d.district} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">{d.district}</td>
                      <td className="py-3 px-3 text-slate-400">{d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                        {d.baselineDayLeq ? `${d.baselineDayLeq} dB` : 'N/A'}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-300">
                        {d.baselineNightLeq ? `${d.baselineNightLeq} dB` : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">
                        {score !== undefined ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-black text-amber-300 text-sm">{score}</span>
                            <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${score >= 75 ? 'bg-rose-500' : score >= 60 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-500 font-mono">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase ${badgeBg}`}>
                          {classification}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-emerald-400 font-bold">
                        {d.dataConfidenceRating}%
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-300 truncate max-w-xs">
                        {d.primaryNoiseSources.slice(0, 3).join(', ')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
