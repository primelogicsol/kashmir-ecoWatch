'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  FileText,
  Globe2,
  Layers,
  Map,
  Satellite,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { GEOGRAPHIC_PILOT_STUDIES } from '@/data/change-detection-observatory';
import { cn } from '@/lib/utils';

export default function HistoricalComparisonPage() {
  const [selectedPilotId, setSelectedPilotId] = useState<string>('pampore-karewa');
  const [activeYear, setActiveYear] = useState<number>(2026);

  const currentPilot = GEOGRAPHIC_PILOT_STUDIES.find(p => p.id === selectedPilotId) || GEOGRAPHIC_PILOT_STUDIES[0];
  const activeMetrics = currentPilot.timeSeriesMetrics.find(m => m.year === activeYear) || currentPilot.timeSeriesMetrics[2];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Multi-Decadal Retrospective • 1980–2026 Archive"
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
    label: "Change Observatory",
    href: "/earth-human-impact/change-detection-observatory"
  },
  {
    label: "Historical Comparison"
  }
]}
        icon={<Clock className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-RETRO
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Historical Land Transformation Engine
              </span>
            </div>
          </div>
        }
        subtitle="Multi-decadal retrospective analyzing 1980 Survey of India baselines against continuous modern satellite time-series."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['change-detection-observatory/historical-comparison'].tag}
            badge={EHII_HERO_CONFIGS['change-detection-observatory/historical-comparison'].badge}
            items={EHII_HERO_CONFIGS['change-detection-observatory/historical-comparison'].showcaseItems}
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
                Observatory Core
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['change-detection-observatory/historical-comparison'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Pilot Study Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 rounded-xl border border-white/10 w-fit">
          {GEOGRAPHIC_PILOT_STUDIES.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPilotId(p.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-semibold transition-all',
                selectedPilotId === p.id
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              )}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Selected Pilot In-Depth Comparison Console */}
        <section className="bg-slate-900/70 border border-teal-500/30 rounded-2xl p-6 md:p-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                Permanent Assessment Baseline: {currentPilot.district} District
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">{currentPilot.title}</h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1">{currentPilot.subtitle}</p>
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-xl border border-white/10">
              <span className="text-[11px] font-bold text-slate-400 px-2 uppercase">Timeline:</span>
              {[2015, 2020, 2026].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setActiveYear(yr)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all',
                    activeYear === yr
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Active Year Metrics Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5">
              <div className="text-xs text-slate-400">{activeMetrics.primaryClassLabel}</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                {activeMetrics.primaryClassHectares.toLocaleString()} ha
              </div>
              <div className="text-[10px] text-slate-500">In {activeYear} assessment pass</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5">
              <div className="text-xs text-slate-400">{activeMetrics.transformedLabel}</div>
              <div className="text-2xl font-bold text-rose-400 font-mono mt-1">
                {activeMetrics.transformedHectares.toLocaleString()} ha
              </div>
              <div className="text-[10px] text-slate-500">Excavation & built footprint</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5">
              <div className="text-xs text-slate-400">Vegetation / Water Index</div>
              <div className="text-2xl font-bold text-teal-400 font-mono mt-1">
                {activeMetrics.canopyOrVegetationCoverPct}%
              </div>
              <div className="text-[10px] text-slate-500">Relative greenness ratio</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5">
              <div className="text-xs text-slate-400">Impervious / Mineral Spoil</div>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                {activeMetrics.imperviousOrExcavatedPct}%
              </div>
              <div className="text-[10px] text-slate-500">Surface sealing ratio</div>
            </div>
          </div>

          {/* Multi-Year Visual Comparison Slider / Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Three-Epoch Progression Analysis (2015 ➔ 2020 ➔ 2026)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentPilot.timeSeriesMetrics.map((epoch) => (
                <div 
                  key={epoch.year}
                  className={cn(
                    'p-5 rounded-2xl border transition-all flex flex-col justify-between',
                    activeYear === epoch.year
                      ? 'bg-slate-950 border-teal-500/60 shadow-lg shadow-teal-500/10'
                      : 'bg-slate-950/50 border-white/5 hover:border-white/10'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold font-mono text-white">{epoch.year} Epoch</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {epoch.year === 2015 ? 'Landsat-8 OLI' : epoch.year === 2020 ? 'Sentinel-2A' : 'Sentinel-2B + Planet'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Intact System:</span>
                        <span className="font-mono font-bold text-emerald-400">{epoch.primaryClassHectares.toLocaleString()} ha</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Disturbed Area:</span>
                        <span className="font-mono font-bold text-rose-400">{epoch.transformedHectares.toLocaleString()} ha</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Impervious Fraction:</span>
                        <span className="font-mono text-amber-400">{epoch.imperviousOrExcavatedPct}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveYear(epoch.year)}
                    className={cn(
                      'w-full py-1.5 rounded-lg text-xs font-semibold transition-colors',
                      activeYear === epoch.year
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {activeYear === epoch.year ? 'Viewing Epoch' : `Select ${epoch.year}`}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Permanent Evidence Reference: <strong className="text-white font-mono">{currentPilot.permanentEvidenceDossierId}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/earth-human-impact/change-detection-observatory/change-detection-atlas"
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                Open GIS Layer Viewer
              </Link>
              <Link
                href="/earth-human-impact/change-detection-observatory/scientific-dossiers"
                className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors"
              >
                Download Evidence Dossier
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
