import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Database,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { HydropowerEnergyJusticeWorkbench } from '@/components/himalayan-dispatch/HydropowerEnergyJusticeWorkbench';
import {
  FIVE_REGION_HYDROPOWER_MATRIX,
  KEW_HYDROPOWER_OBSERVATORY_REGISTRIES_16,
  PRICE_OF_POWER_MONOGRAPH_SPEC,
  PROPOSED_HYDROPOWER_DATA_SOURCES_16,
} from '@/data/himalayan-dispatch-price-of-power-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Hydropower, Environmental Impact & Energy Justice Observatory | Kashmir EcoWatch',
  description:
    'Permanent 16-registry Western Himalayan energy and environmental intelligence observatory tracking hydropower generation, PPA allocations, winter outages, forest submergence, reservoir-triggered seismicity physics, tunnel/muck impacts, and energy justice across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan.',
  canonicalPath: '/earth-human-impact/hydropower-energy-justice-observatory',
  imagePath: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
});

export default function HydropowerEnergyJusticeObservatoryPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Earth & Human Impact', href: '/earth-human-impact' },
      {
        label: 'Hydropower, Environmental Impact & Energy Justice Observatory',
        href: '/earth-human-impact/hydropower-energy-justice-observatory',
      },
    ],
    '/earth-human-impact/hydropower-energy-justice-observatory'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="whejo-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Header */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <span>KEW · WESTERN HIMALAYAN ENERGY &amp; ENVIRONMENTAL INTELLIGENCE</span>
            <span className="text-slate-600">·</span>
            <span>PAIRED WITH HIMALAYAN DISPATCH &amp; MONOGRAPH 12</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Hydropower, Environmental Impact &amp; Energy Justice Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            Dedicated sixteen-registry scientific and energy-justice infrastructure examining
            where Western Himalayan electricity and revenues go—and which mountain districts absorb
            the forest submergence, river dewatering, tunnel failures, slope instability, and winter
            curtailment.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl pt-2">
            {[
              ...PRICE_OF_POWER_MONOGRAPH_SPEC.observatoryHeroStats,
              ...PRICE_OF_POWER_MONOGRAPH_SPEC.heroStats,
            ].map((st) => (
              <div
                key={st.label}
                className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums">
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
                Scientific &amp; Non-Partisan Provenance Standard:
              </strong>{' '}
              Identical hydrological, seismic, ecological, and social-accounting criteria are
              applied to India- and Pakistan-administered projects. Installed MW capacities are
              never equated with winter deliverable generation, RTS mechanics are never misused as
              unverified earthquake attributions, and eight unestablished regional totals remain
              quarantined until project-by-project primary documents are authenticated.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-power"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read The Price of Power Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-12-the-price-of-power"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 12 (20 Volumes · 120 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sectoral-eia"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-950/50 text-cyan-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open KEW Sectoral EIA Hub</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16">
        {/* Five-Region Hydropower & Shortage Overview */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              FIVE-REGION GENERATION VS. RELIABILITY OVERVIEW
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Independent Regional Baselines Across All Five Territories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {FIVE_REGION_HYDROPOWER_MATRIX.map((reg) => (
              <div
                key={reg.region}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white">{reg.region}</h3>
                  <p className="text-xs text-emerald-300 font-medium leading-relaxed">
                    {reg.majorHydropowerResources}
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {reg.electricitySupplyChallenges}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-slate-200">2026 Record:</strong>{' '}
                  {reg.documented2026Snapshot}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Workbench */}
        <HydropowerEnergyJusticeWorkbench variant="observatory" />

        {/* 16 Permanent Registries */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              OBSERVATORY ARCHITECTURE · 16 PERMANENT REGISTRIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Connected Engineering, Ecological, Seismic &amp; Justice Ledgers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEW_HYDROPOWER_OBSERVATORY_REGISTRIES_16.map((reg) => (
              <div
                key={reg.code}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      {reg.code}
                    </span>
                    <Database className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {reg.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {reg.permanentFunction}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Standard:</strong>{' '}
                    {reg.evidentiaryStandard}
                  </p>
                  <Link
                    href={reg.connectedKewHref}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>{reg.connectedKewLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 16 Proposed Data Sources */}
        <section className="space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            16 PROPOSED GRID, CLEARANCE, SEISMIC &amp; EARTH-OBSERVATION REPOSITORIES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PROPOSED_HYDROPOWER_DATA_SOURCES_16.map((ds) => (
              <a
                key={ds.source}
                href={ds.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/40 transition-colors flex items-start justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white leading-snug">
                    {ds.source}
                  </div>
                  <div className="text-[11px] text-slate-400">{ds.application}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
