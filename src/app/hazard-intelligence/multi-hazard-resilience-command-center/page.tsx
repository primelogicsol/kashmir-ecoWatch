import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Building2,
  CloudRain,
  Database,
  Droplets,
  Flame,
  Layers,
  Mountain,
  ShieldAlert,
  Snowflake,
  Waves,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { HimalayanTimeBombWorkbench } from '@/components/himalayan-dispatch/HimalayanTimeBombWorkbench';
import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';
import {
  KEW_COMMAND_CENTER_PILLARS_20,
  SCIENTIFIC_DATA_INTEGRATION_CAVEAT,
  SCIENTIFIC_DATA_SOURCES_17,
  THE_TIME_BOMB_SPEC,
} from '@/data/himalayan-dispatch-time-bomb-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Multi-Hazard & Critical Infrastructure Resilience Command Center | Kashmir EcoWatch',
  description:
    'Integrated 20-pillar Western Himalayan disaster intelligence architecture uniting tectonic & seismic intelligence, GLOFs, landslides, permafrost, flood routing, 12 critical infrastructure lifelines, 80 hazard monitoring classes, and 17 scientific data sources.',
  canonicalPath: '/hazard-intelligence/multi-hazard-resilience-command-center',
  imagePath: '/images/hazard-intelligence/hazard-command-center.jpg',
});

const CONNECTED_KEW_MODULES = [
  {
    name: 'Earthquakes & Faults',
    href: '/hazard-intelligence/earthquakes',
    icon: Activity,
    desc: 'Kashmir seismic gap, MHT locking & regional microseismicity',
  },
  {
    name: 'GLOF Intelligence',
    href: '/hazard-intelligence/glofs',
    icon: Droplets,
    desc: 'J&K 616-lake baseline (68 dangerous, 24 priority) & moraine cascades',
  },
  {
    name: 'Riverine Floods',
    href: '/hazard-intelligence/floods',
    icon: Waves,
    desc: 'Jhelum, Chenab, Indus & Neelum floodplains & wetland storage',
  },
  {
    name: 'Landslides & Slopes',
    href: '/hazard-intelligence/landslides',
    icon: Mountain,
    desc: '739-event Kashmir inventory & highway cut-slope corridors',
  },
  {
    name: 'Cloudbursts & Flash Floods',
    href: '/hazard-intelligence/flash-floods',
    icon: CloudRain,
    desc: 'Leh, Ramban & Chasoti steep-catchment debris torrents',
  },
  {
    name: 'Avalanches & Cryosphere',
    href: '/hazard-intelligence/avalanches',
    icon: Snowflake,
    desc: 'Winter slab corridors, snow persistence & permafrost thaw',
  },
  {
    name: 'Forest Fires',
    href: '/hazard-intelligence/forest-fires',
    icon: Flame,
    desc: 'Winter/pine-belt fires & 5-stage post-fire debris cascades',
  },
  {
    name: 'Atmospheric Systems',
    href: '/hazard-intelligence/atmospheric-systems',
    icon: Layers,
    desc: 'Western disturbances, monsoon excursions & thermal inversions',
  },
];

const INTEGRATED_INTELLIGENCE_OUTPUTS = [
  'Hazard detection',
  'Exposure modelling',
  'Cascading-risk assessment',
  'Infrastructure vulnerability',
  'Community preparedness',
  'Environmental early warning',
  'Institutional response monitoring',
];

export default function MultiHazardResilienceCommandCenterPage() {
  const dispatch22Url = getKewToDispatchUrl(
    `/issues/volume-01-issue-01/${THE_TIME_BOMB_SPEC.storySlug}`
  );
  const monograph13Url = getKewToDispatchUrl(
    `/issues/${THE_TIME_BOMB_SPEC.monographSlug}`
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW · Western Himalayan Disaster Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Multi-Hazard & Critical Infrastructure Command Center' },
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block whitespace-normal break-words leading-[1.12] bg-gradient-to-r from-red-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
              Multi-Hazard &amp; Critical Infrastructure Resilience Command Center
            </span>
          </>
        }
        subtitle="Integrated multi-hazard and critical lifeline intelligence architecture across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, Gilgit-Baltistan, and the Karakoram—companion to Himalayan Dispatch Flagship Investigation 22 & Monograph 13"
        icon={<ShieldAlert className="w-6 h-6 text-amber-400" />}
        images={[
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-earthquakes-seismic.jpg',
          '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/90 via-[#0a1628]/75 to-slate-950"
      />

      <div className="container mx-auto px-6 -mt-4 relative z-20 space-y-14">
        {/* KPI & Scope Banner */}
        <section className="rounded-2xl border border-amber-500/30 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { value: '20', label: 'Intelligence Pillars' },
              { value: '80', label: 'Monitoring Categories' },
              { value: '12', label: 'Critical Lifelines' },
              { value: '6', label: 'Compound Scenarios' },
              { value: '17', label: 'Data Source Schemas' },
              { value: '5', label: 'Himalayan Regions' },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {kpi.value}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Outputs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mr-1">
              Integrated Intelligence Outputs:
            </span>
            {INTEGRATED_INTELLIGENCE_OUTPUTS.map((out) => (
              <span
                key={out}
                className="px-3 py-1 rounded-full text-xs border border-cyan-500/30 bg-cyan-950/30 text-cyan-200"
              >
                {out}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {THE_TIME_BOMB_SPEC.editorialMetaphorDisclosure}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={dispatch22Url}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold uppercase tracking-wider text-white"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Dispatch 22</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={monograph13Url}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-amber-400/50 bg-amber-500/15 hover:bg-amber-500/25 text-xs font-bold uppercase tracking-wider text-amber-200"
              >
                <span>Monograph 13 (25 Vols · 150 Chs)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 20 Intelligence Pillars */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
                UNIFIED MULTI-HAZARD &amp; LIFELINE ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Twenty Integrated Disaster Intelligence Pillars
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Bridging physical earth systems with 12-sector critical infrastructure survival
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEW_COMMAND_CENTER_PILLARS_20.map((p) => (
              <div
                key={p.no}
                className="rounded-xl border border-slate-800 bg-slate-900/75 p-4 space-y-1.5 hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    PILLAR {p.no}
                  </span>
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h3 className="text-sm font-bold text-white">{p.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.focus}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Multi-Hazard & Cascading Risk Workbench */}
        <HimalayanTimeBombWorkbench variant="command-center" />

        {/* Connected KEW Hazard Submodules + 17 Scientific Data Sources */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Connected KEW Hazard Submodules</span>
            </div>
            <div className="space-y-2.5">
              {CONNECTED_KEW_MODULES.map((mod) => {
                const Icon = mod.icon;
                return (
                  <Link
                    key={mod.href}
                    href={mod.href}
                    className="flex items-start justify-between gap-3 p-3 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-amber-400/50 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-amber-300">
                          {mod.name}
                        </div>
                        <p className="text-xs text-slate-400">{mod.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Database className="w-4 h-4" />
              <span>17 Scientific &amp; Institutional Data Integration Sources</span>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-950/25 p-3.5 text-xs text-amber-200/90 leading-relaxed">
              {SCIENTIFIC_DATA_INTEGRATION_CAVEAT}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SCIENTIFIC_DATA_SOURCES_17.map((src, i) => (
                <div
                  key={src.source}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950/70 space-y-1"
                >
                  <div className="text-xs font-bold text-white">
                    {String(i + 1).padStart(2, '0')}. {src.source}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {src.application}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
