'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Filter,
  Globe2,
  Layers,
  LayoutDashboard,
  Satellite,
  ShieldCheck,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { 
  REGIONAL_EARTH_SYSTEMS_INDICATORS, 
  HUMAN_PRESSURE_INDEX_DATA, 
  EHII_SUBMODULES 
} from '@/data/earth-human-impact';
import { cn } from '@/lib/utils';

export default function EarthHumanImpactDashboardsPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  const filteredIndicators = selectedDomain === 'All'
    ? REGIONAL_EARTH_SYSTEMS_INDICATORS
    : REGIONAL_EARTH_SYSTEMS_INDICATORS.filter(i => i.domain === selectedDomain);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Command Telemetry • Cross-Domain Baselines"
        breadcrumbs={[
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Earth & Human Impact",
    href: "/earth-human-impact"
  },
  {
    label: "Cross-Domain Dashboards"
  }
]}
        icon={<LayoutDashboard className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-DASH
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Multi-Domain Telemetry & Regional Baselines
              </span>
            </div>
          </div>
        }
        subtitle="Cross-domain spatial dashboards tracking human pressure index, land conversion velocities, surface albedo heat islands, and riparian buffer integrity across Kashmir."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['dashboards'].tag}
            badge={EHII_HERO_CONFIGS['dashboards'].badge}
            items={EHII_HERO_CONFIGS['dashboards'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Globe2 className="w-4 h-4 mr-1.5" />
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Observatory
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['dashboards'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Domain Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/70 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Filter className="w-4 h-4 text-teal-400" />
            Filter by Domain:
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Climate', 'Forest', 'Land', 'Energy', 'Mining', 'Urban'].map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                  selectedDomain === dom
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                )}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndicators.map((ind) => (
            <div key={ind.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 uppercase">
                    {ind.domain}
                  </span>
                  <span className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-semibold border',
                    ind.status === 'Critical Threshold' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                    ind.status === 'Severe Stress' ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' :
                    ind.status === 'Moderate Concern' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  )}>
                    {ind.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{ind.name}</h3>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/70 border border-white/5 mb-3 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500">Baseline Normal</div>
                    <div className="font-mono text-slate-300 mt-0.5">{ind.baselineValue}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-teal-400 font-medium">Measured Value</div>
                    <div className="font-mono text-white font-bold mt-0.5">{ind.currentValue}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 mb-2">
                  <span className="text-slate-500">Threshold:</span> <span className="font-mono text-slate-300">{ind.thresholdLimit}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono flex flex-wrap items-center justify-between gap-1">
                <span className="break-words max-w-full" title={ind.evidenceSource}>{ind.evidenceSource}</span>
                <span className="text-teal-400">{ind.measurementMethod}</span>
              </div>
            </div>
          ))}
        </div>

        {/* District HPI Ranking Table */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">District Anthropogenic Vulnerability Ranking</h2>
              <p className="text-xs text-slate-400">Aggregated ranking based on composite Human Pressure Index (HPI).</p>
            </div>
            <Link
              href="/earth-human-impact/spatial-intelligence-atlas"
              className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
            >
              View on Spatial Atlas &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HUMAN_PRESSURE_INDEX_DATA.map((dist, idx) => (
              <div key={dist.districtName} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-white">{dist.districtName}</div>
                    <div className="text-xs text-slate-400">{dist.primaryAnthropogenicDriver}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-teal-400">{dist.overallHpiScore}/100</div>
                  <div className="text-[10px] text-slate-500">{dist.stressCategory} Stress</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
