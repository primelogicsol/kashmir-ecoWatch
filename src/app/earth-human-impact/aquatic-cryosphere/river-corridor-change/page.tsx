import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  Activity,
  ArrowRight,
  GitBranch,
  Globe2,
  Layers,
  Pickaxe,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'River Corridor & Channel Transformation Observatory | Kashmir EcoWatch',
  description: 'Satellite detection of riverbed mining disturbance, floodplain constriction, riparian buffer erosion, and channel migration.',
};

export default function RiverCorridorChangePage() {
  const riverReaches = [
    {
      river: 'Jhelum Main Channel (Srinagar Urban)',
      reach: 'Pandhrethan to Chattabal Weir',
      activeWidthChange: '-18.5% active width constriction since 1990',
      riparianDisturbedHa: '142 ha encroached by concrete walls and built structures',
      miningDisturbance: 'Low direct dredging / High illegal shoreline dumping',
      floodplainIntegrity: 'Severely Constricted',
      status: 'Critical Flood Risk'
    },
    {
      river: 'Rambiara River (Shopian / Pulwama)',
      reach: 'Heepora to Rohmoo Confluence',
      activeWidthChange: '+42 m channel widening from heavy excavation collapse',
      riparianDisturbedHa: '285 ha gravel floodplain scarred by mechanical extractors',
      miningDisturbance: 'Extreme / Excavation exceeding 4m statutory depth',
      floodplainIntegrity: 'Decapitated Aquifer Connection',
      status: 'Severe Ecosystem Disturbance'
    },
    {
      river: 'Veshaw River (Kulgam)',
      reach: 'Aharbal Foothills to Qaimoh',
      activeWidthChange: '3.1 m/year lateral bank erosion during flash spates',
      riparianDisturbedHa: '168 ha riverbank and willow buffer cleared',
      miningDisturbance: 'High / Boulder extraction weakening riverbed gradient',
      floodplainIntegrity: 'Moderate / High flash flood velocity',
      status: 'High Vigilance'
    },
    {
      river: 'Lidder River (Anantnag)',
      reach: 'Pahalgam to Khanabal Confluence',
      activeWidthChange: '1.8 m/year lateral migration',
      riparianDisturbedHa: '90 ha disturbed by tourism hospitality expansions',
      miningDisturbance: 'Moderate / Seasonal gravel scraping',
      floodplainIntegrity: 'Fragmented Riparian Buffer',
      status: 'High Vigilance'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Fluvial Telemetry • Riverbed Incision & Floodplains"
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
    label: "Aquatic & Cryosphere",
    href: "/earth-human-impact/aquatic-cryosphere"
  },
  {
    label: "River Corridors"
  }
]}
        icon={<GitBranch className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-RIVER
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                River Corridor & Riparian Alteration
              </span>
            </div>
          </div>
        }
        subtitle="Satellite detection of riverbed mining disturbance, floodplain constriction, riparian buffer erosion, and channel migration."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere/river-corridor-change'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere/river-corridor-change'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere/river-corridor-change'].showcaseItems}
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
            <Link href="/earth-human-impact/aquatic-cryosphere">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Aquatic Core
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/river-corridor-change'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        {/* River Reaches Table */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              River Reach Disturbance & Geomorphic Stability Audit
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Automated Water Extraction Index (AWEI) centerline tracking and multi-spectral vegetation loss analysis (2018–2026).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">River Channel</th>
                  <th className="py-2.5 px-3">Reach Monitored</th>
                  <th className="py-2.5 px-3">Width / Bank Shift</th>
                  <th className="py-2.5 px-3">Riparian Disturbance</th>
                  <th className="py-2.5 px-3">Riverbed Mining Impact</th>
                  <th className="py-2.5 px-3">Floodplain Integrity</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {riverReaches.map((r) => (
                  <tr key={r.river} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{r.river}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{r.reach}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300 whitespace-nowrap">{r.activeWidthChange}</td>
                    <td className="py-3 px-3 text-slate-300 break-words max-w-[180px]">{r.riparianDisturbedHa}</td>
                    <td className="py-3 px-3 text-amber-300 text-[11px] break-words max-w-[200px]">{r.miningDisturbance}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{r.floodplainIntegrity}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-white/10">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mining Impact Spotlight */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Pickaxe className="w-4 h-4 text-amber-400" />
              Mechanized Riverbed Excavation in Rambiara & Veshaw
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prior to 2018, riverbed gravel extraction was largely manual. Since the commercial auction of riverbed mining blocks, 
              heavy JCB excavators and tippers operate directly in active river thalwegs. Remote sensing algorithms flag over 
              685 ha of severe trenching, where pits exceed the legally sanctioned 1-meter depth limit by up to 300%.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              This down-cutting lowers local hydraulic head, decapitating adjacent alluvial aquifers and drying nearby drinking water 
              wells and apple orchard irrigation canals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Regulatory Action & Satellite Enforcement</h4>
            <p className="text-slate-300 text-[11px]">
              Kashmir EcoWatch integrates mining lease polygon shapefiles with Sentinel-2 10-meter optical sweeps. 
              Any mechanical excavation footprint detected outside approved mining boundaries automatically generates 
              a Tier 2 Confirmed Encroachment alert routed to the J&K State Environmental Impact Assessment Authority (SEIAA).
            </p>
            <div className="pt-2 border-t border-white/5">
              <Link href="/earth-human-impact/aquatic-cryosphere/watershed-cumulative-impact" className="text-cyan-400 hover:text-white font-medium flex items-center gap-1">
                <span>View Basin Cumulative Model</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
