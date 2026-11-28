import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  ExternalLink,
  Pickaxe,
  ShieldCheck,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { GilgitBaltistanMineralWorkbench } from '@/components/himalayan-dispatch/GilgitBaltistanMineralWorkbench';
import {
  GB_MINERAL_EXTERNAL_DATA_SOURCES_12,
  KEW_GB_MINERAL_OBSERVATORY_REGISTRIES_18,
  WEALTH_BENEATH_MOUNTAINS_SPEC,
} from '@/data/himalayan-dispatch-wealth-beneath-mountains-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Gilgit-Baltistan Mineral Extraction & Environmental Accountability Observatory | Kashmir EcoWatch',
  description:
    'Dedicated 18-registry Gilgit-Baltistan mineral-resource expansion within KEW Mining & Extraction Intelligence: tracking 14 mineral occurrence groups, 590 portal study entries, placer gold river scour, community royalties, Upper Indus hydrochemistry, and the 20-Gate Integrity Protocol.',
  canonicalPath: '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory',
  imagePath: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
});

export default function GilgitBaltistanMineralObservatoryPage() {
  const canonicalPath =
    '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory';

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Earth & Human Impact', href: '/earth-human-impact' },
      { label: 'Mining & Extraction', href: '/earth-human-impact/mining-extraction' },
      {
        label: 'Gilgit-Baltistan Mineral Extraction Observatory',
        href: canonicalPath,
      },
    ],
    canonicalPath
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="gbmeo-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-teal-400">
            <Pickaxe className="w-4 h-4" />
            <span>KEW · WESTERN HIMALAYAN EXTRACTIVE INDUSTRY INTELLIGENCE</span>
            <span className="text-slate-600">·</span>
            <span>PAIRED WITH DISPATCH 24 &amp; MONOGRAPH 16</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Gilgit-Baltistan Mineral Extraction &amp; Environmental Accountability Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            Dedicated eighteen-registry expansion of KEW’s Mining &amp; Extraction Intelligence
            architecture—auditing mineral occurrences vs. reserves, concession ownership, placer
            gold river destabilization, Upper Indus hydrochemistry, community royalties, and
            regional value retention across Gilgit-Baltistan and the Karakoram.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
            {[
              { value: '18', label: 'Permanent GB registries' },
              { value: '14', label: 'Documented mineral groups' },
              { value: '43,494 km²', label: 'Reported interest area' },
              { value: '590 / 0', label: 'Study entries / Displayed leases' },
              { value: '-85%', label: 'Illustrative royalty shift (2× → 30%)' },
              { value: '20 Gates', label: 'Mineral Integrity Protocol' },
            ].map((st) => (
              <div
                key={st.label}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 tabular-nums">
                  {st.value}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/35 bg-amber-950/20 max-w-5xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Geological, Chemical &amp; Trade Verification Standard:
              </strong>{' '}
              Mineral occurrences are strictly separated from CRIRSCO-verified reserves; the 43,494
              km² figure and 590 portal rows are never equated with active excavation; mercury,
              cyanide, or protected-area overlaps are never alleged without site-level evidence;
              consolidated 2024 royalty text awaits original gazette page authentication; and
              national UN Comtrade totals are never assumed to establish Gilgit-Baltistan origin.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-wealth-beneath-the-mountains"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read Dispatch: The Wealth Beneath the Mountains</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 16 (18 Volumes · 108 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/earth-human-impact/mining-extraction"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-orange-500/40 bg-orange-950/30 hover:bg-orange-950/50 text-orange-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Parent KEW Mining &amp; Extraction Hub</span>
            </Link>
          </div>
        </div>
      </section>

      <EarthHumanImpactNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16">
        {/* Interactive Workbench */}
        <GilgitBaltistanMineralWorkbench variant="observatory" />

        {/* 18 Permanent Registries */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">
              OBSERVATORY ARCHITECTURE · 18 PERMANENT EXTRACTIVE INTELLIGENCE REGISTRIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Geological, Concession, Hydrochemical, Wildlife &amp; Royalty Ledgers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEW_GB_MINERAL_OBSERVATORY_REGISTRIES_18.map((reg) => (
              <div
                key={reg.code}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-teal-400">
                      {reg.code}
                    </span>
                    <Database className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">{reg.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {reg.permanentFunction}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Standard:</strong> {reg.evidentiaryStandard}
                  </p>
                  <Link
                    href={reg.connectedKewHref}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300"
                  >
                    <span>{reg.connectedKewLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12 Potential External Data Sources */}
        <section className="space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            12 CANDIDATE PORTAL, GEOLOGICAL, SATELLITE &amp; TRANSPARENCY REPOSITORIES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {GB_MINERAL_EXTERNAL_DATA_SOURCES_12.map((ds) => (
              <a
                key={ds.source}
                href={ds.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-colors flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-white leading-snug">{ds.source}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{ds.application}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
