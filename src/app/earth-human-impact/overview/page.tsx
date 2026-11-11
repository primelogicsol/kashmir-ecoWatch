'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  Layers,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { EHII_SUBMODULES } from '@/data/earth-human-impact';

export default function EarthHumanImpactOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="EHII Architecture • Western Himalayan Planetary System"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Scientific Charter & Architecture' }
        ]}
        icon={<Layers className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-ARCH
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Scientific Charter & Architecture
              </span>
            </div>
          </div>
        }
        subtitle="Consolidating six foundational environmental disciplines under one unified intelligence module to monitor climate warming, forest attrition, land transformation, infrastructure stress, mineral extraction, and urban settlement growth across the Kashmir basin."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['overview'].tag}
            badge={EHII_HERO_CONFIGS['overview'].badge}
            items={EHII_HERO_CONFIGS['overview'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['overview'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-3">Why Consolidate into One Major Module?</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Instead of cluttering the top-level navigation with six disparate sub-domains, the Earth & Human Impact Intelligence (EHII) system creates an interconnected scientific observatory. In Himalayan ecology, atmospheric shifts govern cryosphere melting, which drives erosion; road cuttings destabilize slopes, which fill riverbeds with muck; and riverbed gravel dredging lowers water tables, drying out adjacent agricultural wetlands.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5">
              <div className="text-xs font-bold text-teal-400 uppercase">1. Unified Sensor Pipeline</div>
              <p className="text-xs text-slate-400 mt-1">Multi-spectral (Sentinel-2), radar (Sentinel-1 InSAR), and thermal (Landsat-9) feeds processed centrally.</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5">
              <div className="text-xs font-bold text-teal-400 uppercase">2. Cross-Sectoral Linking</div>
              <p className="text-xs text-slate-400 mt-1">Directly feeds land-use change signals into Sectoral EIA (Agriculture, Horticulture, Tourism, Handicrafts).</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-white/5">
              <div className="text-xs font-bold text-teal-400 uppercase">3. Objective Verification</div>
              <p className="text-xs text-slate-400 mt-1">Ground measurements cross-referenced with government registries (FSI, IMD, CEA, DGM, CPCB).</p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-bold text-white mb-6">The Six Scientific Submodule Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EHII_SUBMODULES.map((sub) => (
              <div key={sub.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 mb-1">{sub.badge}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{sub.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{sub.focusSummary}</p>
                </div>
                <Link
                  href={`/earth-human-impact/${sub.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 pt-3 border-t border-white/5"
                >
                  Explore {sub.title}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
