import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Compass, Database, FlaskConical, Snowflake } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { Heading } from '@/components/common/Heading';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { LadakhEcologicalFrontiersWorkbench } from '@/components/himalayan-dispatch/LadakhEcologicalFrontiersWorkbench';
import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';
import {
  LADAKH_ECOLOGICAL_FRONTIERS_SPEC,
  LADAKH_INVESTIGATIONS_3,
  LADAKH_OBSERVATORY_MODULES_12,
  LADAKH_PRIMARY_SOURCES_8,
  LADAKH_RESEARCH_LIMITATIONS_6,
} from '@/data/himalayan-dispatch-ladakh-frontiers-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Ladakh Cold-Desert Cryosphere, Carrying Capacity & Ecological Integrity Observatory | Kashmir EcoWatch',
  description:
    'Trans-Himalayan scientific observatory pairing 12 cold-desert monitoring modules and 21 proposed experimental protocols with Himalayan Dispatch’s dedicated Ladakh scientific issue.',
  canonicalPath: '/earth-human-impact/ladakh-cold-desert-observatory',
  imagePath: '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
});

export default function LadakhColdDesertObservatoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Ladakh Cold-Desert Observatory' },
        ]}
        icon={<Snowflake className="w-6 h-6 text-cyan-400" />}
        badge={
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Trans-Himalayan Cold-Desert Science
            </span>
            <Badge variant="info" size="md">
              12 Modules · 21 Experiments
            </Badge>
          </div>
        }
        title="Ladakh Cold-Desert Cryosphere, Carrying Capacity & Ecological Integrity Observatory"
        subtitle="Dedicated scientific architecture examining glacier mass-balance losses (0.21–0.37 m w.e./yr), snowmelt timing shifts, seasonal visitor-to-resident water and waste limits, Changthang permafrost soil microbiomes, and 65 high-concern avian taxa across Zanskar, Suru, Nubra, Leh, Kargil, Drass, Changthang, and Hanle."
        images={[
          '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
          '/images/environmental-pil/ladakh-transhimalayan-sanctuary.jpg',
          '/images/publications/pashmina-changthang-pastoral-ecology.jpg',
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-14">
        {/* Companion Himalayan Dispatch Issue Banner */}
        <section className="rounded-xl border border-cyan-500/30 bg-slate-900/90 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              Paired With Himalayan Dispatch · Dedicated Scientific Issue
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.title}: {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.subtitle}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Connects Kashmir EcoWatch’s 12 cold-desert observatory modules directly with three
              flagship journalistic-scientific investigations and 45 research chapters.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={getKewToDispatchUrl('/issues/ladakhs-ecological-frontiers')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8C3125] text-white text-xs font-bold uppercase tracking-wider hover:opacity-90"
            >
              <span>Open 45-Chapter Ladakh Issue</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={`${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.datasetApiPath}?format=csv`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider hover:bg-cyan-500/10"
            >
              <Database className="w-4 h-4" />
              <span>Download CSV Protocol</span>
            </a>
          </div>
        </section>

        {/* Interactive Cold-Desert Scientific Workbench */}
        <LadakhEcologicalFrontiersWorkbench variant="observatory" />

        {/* 12 Observatory Modules */}
        <section className="space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              TWELVE COLD-DESERT OBSERVATORY MODULES
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Trans-Himalayan Biophysical &amp; Carrying-Capacity Registries
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LADAKH_OBSERVATORY_MODULES_12.map((mod) => (
              <Card key={mod.code} className="p-5 bg-slate-900/80 border border-white/10 space-y-2">
                <span className="text-[11px] font-mono font-bold text-cyan-400">{mod.code}</span>
                <h3 className="text-base font-bold text-white">{mod.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{mod.focus}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Three Investigation Pillars & 21 Proposed Original Scientific Experiments */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Twenty-One Proposed Original Scientific Experiments
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LADAKH_INVESTIGATIONS_3.map((inv) => (
              <Card
                key={inv.id}
                className="p-6 bg-slate-900/85 border border-white/15 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Investigation {inv.investigationNumber} · {inv.geographicalCoverage}
                  </span>
                  <h3 className="text-xl font-bold text-white">{inv.title}</h3>
                  <p className="text-xs text-slate-300 italic">{inv.centralHypothesis}</p>
                  <ul className="space-y-2 pt-2 border-t border-white/10">
                    {inv.proposedExperiments.map((exp) => (
                      <li key={exp.code} className="text-xs text-slate-200 leading-relaxed">
                        <strong className="text-cyan-300">{exp.code} — {exp.title}:</strong>{' '}
                        <span className="text-slate-400">{exp.methodology}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={getKewToDispatchUrl(
                    `/issues/ladakhs-ecological-frontiers/${inv.dispatchSlug}`
                  )}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Read Investigation {inv.investigationNumber} in Himalayan Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Sources & Methodological Guardrails */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Primary Scientific &amp; Statutory Baselines</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              {LADAKH_PRIMARY_SOURCES_8.map((s) => (
                <li key={s.source}>
                  <strong className="text-white">{s.source}:</strong> {s.significance}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-lg font-bold text-white">
              Explicit Scientific &amp; Field Limitations
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {LADAKH_RESEARCH_LIMITATIONS_6.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs">
              <Link href="/water-systems/glaciers" className="text-cyan-400 hover:underline">
                KEW Glaciers Module →
              </Link>
              <Link href="/biodiversity" className="text-emerald-400 hover:underline">
                KEW Biodiversity Module →
              </Link>
              <Link href="/districts" className="text-sky-400 hover:underline">
                Leh &amp; Kargil District Profiles →
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
