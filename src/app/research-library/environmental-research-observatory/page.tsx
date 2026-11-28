import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Database,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import {
  RESEARCH_SERIES_DIVISIONS,
  SECTORAL_RESEARCH_SERIES_2026,
} from '@/data/sectoral-research-series-2026';
import { ResearchAccountabilityWorkbench } from '@/components/himalayan-dispatch/ResearchAccountabilityWorkbench';
import {
  PRELIMINARY_RESEARCH_UNITS_BY_REGION_5,
  RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC,
  SECOND_LIFE_REGIONAL_LANGUAGES,
  WESTERN_HIMALAYAN_RESEARCH_OBSERVATORY_REGISTRIES_12,
} from '@/data/himalayan-dispatch-research-accountability-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Western Himalayan Environmental Research Observatory | KEW Research Library Companion',
  description:
    'Permanent 12-registry Kashmir EcoWatch scientific knowledge infrastructure cataloguing institutions, laboratories, ORCID researchers, deduplicated 2001–2026 publications, Second-Life plain-language & vernacular summaries, and verified ground outcomes across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan.',
  canonicalPath: '/research-library/environmental-research-observatory',
  imagePath: '/images/publications/glaciology-kolahoi-gnss-survey.jpg',
});

export default function WesternHimalayanEnvironmentalResearchObservatoryPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Research Library', href: '/research-library' },
      {
        label: 'Western Himalayan Environmental Research Observatory',
        href: '/research-library/environmental-research-observatory',
      },
    ],
    '/research-library/environmental-research-observatory'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="whero-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Header */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/research-library"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to KEW Research Library</span>
            </Link>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              PART VII PERMANENT KNOWLEDGE INFRASTRUCTURE · DISPATCH 12 &amp; MONOGRAPH 04
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Western Himalayan Environmental Research Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            Integrated directly into the Kashmir EcoWatch Research Library across Kashmir, Jammu,
            Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan, this twelve-registry permanent
            system ensures that environmental scientific knowledge is not merely exported into
            paywalled international journals—but verified, translated into plain and regional
            languages, and returned to the society whose mountains made it possible.
          </p>

          {/* Multilingual Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-1">
              Second-Life Language Scope:
            </span>
            {SECOND_LIFE_REGIONAL_LANGUAGES.map((lang) => (
              <span
                key={lang}
                className="px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-xs text-emerald-200"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Non-Fabrication & Institutional Fairness Notice */}
          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 max-w-5xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Bibliometric Integrity &amp; Institutional Right of Response:
              </strong>{' '}
              Zero estimated or invented regional publication totals are displayed. The 80
              preliminary research units below represent environment-related departments, labs, and
              centres (not 80 independent universities), and all 2001–2026 regional census cells
              remain marked <code className="font-mono">TBD</code> until programmatic OpenAlex,
              Crossref, Shodhganga, HEC, and institutional verification is completed. Every
              university and research institute across all five regions holds formal Right of
              Response.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/who-are-we-researching-for"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read Dispatch 12: Who Are We Researching For?</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-04-who-are-we-researching-for"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 04 (15 Volumes · 60 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sectoral-eia/reports"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-cyan-400 hover:underline"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                Connected KEW Scientific Series ({SECTORAL_RESEARCH_SERIES_2026.length} Dossiers /{' '}
                {RESEARCH_SERIES_DIVISIONS.length} Divisions)
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Preliminary 80-Unit Five-Region Inventory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            STARTING EMPIRICAL BASELINE · 80 PRELIMINARY RESEARCH UNITS ACROSS 5 REGIONS
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Five-Region Environmental Academic &amp; Research Unit Working Inventory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRELIMINARY_RESEARCH_UNITS_BY_REGION_5.map((reg) => (
            <div
              key={reg.region}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-emerald-400">{reg.region}</div>
                <div className="text-4xl font-bold text-white tabular-nums">
                  {reg.preliminaryUnitsIdentified}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {reg.representativeInstitutionsScope}
                </p>
              </div>
              <p className="text-[11px] text-amber-300/90 pt-2 border-t border-slate-800">
                {reg.verificationStatus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Twelve Permanent Registries */}
      <section className="border-t border-slate-800 bg-slate-900/30 px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              PART VII ARCHITECTURE · 12 PERMANENT REGISTRIES
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Returning Scientific Knowledge to Western Himalayan Society
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WESTERN_HIMALAYAN_RESEARCH_OBSERVATORY_REGISTRIES_12.map((reg) => (
              <div
                key={reg.code}
                className="p-5 rounded-xl border border-slate-800 bg-slate-950/90 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      {reg.code}
                    </span>
                    <Database className="w-4 h-4 text-slate-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{reg.registryName}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {reg.permanentFunction}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800/80">
                  <Link
                    href={reg.reusedKewSurfaceHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    <span>Connected KEW Surface: {reg.reusedKewSurfaceLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Census & Second-Life Workbench */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-8">
        <ResearchAccountabilityWorkbench variant="observatory" />

        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            DEFINING COVENANT · HIMALAYAN DISPATCH &amp; KASHMIR ECOWATCH
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.definingMaxim}
          </p>
          <p className="text-sm text-slate-300 italic">
            “{RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.closingQuestion}”
          </p>
        </div>
      </section>
    </main>
  );
}
