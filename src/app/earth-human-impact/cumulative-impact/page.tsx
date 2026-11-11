'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  GitMerge,
  Globe2,
  Layers,
  Satellite,
  ShieldAlert
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { CUMULATIVE_INTERACTIONS } from '@/data/earth-human-impact';
import { cn } from '@/lib/utils';

export default function CumulativeImpactMatrixPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Compounding Ecosystem Stress • Multi-Domain Feedback"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Cross-Sector Cumulative Impact Matrix' }
        ]}
        icon={<Activity className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-MATRIX
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Cross-Sector Cumulative Impact Matrix
              </span>
            </div>
          </div>
        }
        subtitle="Environmental degradation in the Western Himalayas rarely occurs in isolation. This matrix documents how EHII land transformation processes compound with Sectoral EIA activities to produce systemic ecosystem breakdown."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['cumulative-impact'].tag}
            badge={EHII_HERO_CONFIGS['cumulative-impact'].badge}
            items={EHII_HERO_CONFIGS['cumulative-impact'].showcaseItems}
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

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['cumulative-impact'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Conceptual Explainer */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">Primary EHII Driver</div>
              <p className="text-xs text-slate-400 mt-1">Geophysical or microclimatic transformation (e.g. riverbed incision, Karewa excavation).</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 shrink-0">
              <GitMerge className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">Sectoral Multiplier</div>
              <p className="text-xs text-slate-400 mt-1">Economic sector activity (Tourism wastewater, agricultural runoff, craft dyes).</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">Compounded Receptor</div>
              <p className="text-xs text-slate-400 mt-1">Vulnerable ecosystem component suffering non-linear collapse (e.g. Wular eutrophication).</p>
            </div>
          </div>
        </div>

        {/* Matrix Cards */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Documented Compounding Stress Pathways</h2>

          <div className="space-y-4">
            {CUMULATIVE_INTERACTIONS.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-teal-500/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold text-white">{item.interactionName}</h3>
                  <span className={cn(
                    'px-2.5 py-0.5 rounded text-[10px] font-bold uppercase self-start md:self-auto',
                    item.severityLevel === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                  )}>
                    {item.severityLevel} Severity
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-950/60 border border-white/5 mb-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">EHII Earth System Driver:</span>
                    <span className="font-semibold text-slate-200">{item.primaryDriverDomain}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Coupled Sectoral Module:</span>
                    <span className="font-semibold text-teal-400">{item.interactingSectorOrModule}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Vulnerable Receptor:</span>
                    <span className="font-semibold text-amber-400">{item.ecologicalReceptor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Geographical Hotspot:</span>
                    <span className="font-semibold text-slate-200">{item.geographicalHotspot}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white font-semibold">Compounding Mechanism:</strong> {item.mechanism}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Action Link to Sectoral EIA */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white">Bridge into Sectoral Environmental Impact Assessment</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Cross-examine these multi-stressor interactions within the dedicated sectoral assessment modules for Tourism, Horticulture, Handicrafts, and Agriculture.
            </p>
          </div>
          <Link
            href="/sectoral-eia"
            className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Open Sectoral EIA Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
