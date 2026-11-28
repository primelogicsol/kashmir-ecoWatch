import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  ExternalLink,
  Landmark,
  ShieldCheck,
  Trees,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import { NaseemBaghChinarWorkbench } from '@/components/himalayan-dispatch/NaseemBaghChinarWorkbench';
import {
  KEW_NASEEM_BAGH_OBSERVATORY_REGISTRIES_12,
  NASEEM_BAGH_CHINARS_SPEC,
  NASEEM_BAGH_PRIMARY_SOURCES_10,
} from '@/data/himalayan-dispatch-naseem-bagh-chinars-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Naseem Bagh Living Heritage & Campus Ecology Observatory | Chinar Monitoring · Kashmir EcoWatch',
  description:
    'Permanent 12-registry arboricultural, historical, and statutory observatory monitoring the Mughal Chinar landscape of Naseem Bagh, BS 5837 Root Protection Zones, UoK Green Audit baselines, Section 3 statutory compliance, and the 15-measure Naseem Bagh Recovery Protocol.',
  canonicalPath: '/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory',
  imagePath: '/images/env-monitoring/naseem-bagh-chinar-gis.jpg',
});

export default function NaseemBaghHeritageObservatoryPage() {
  const canonicalPath =
    '/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory';

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
      { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
      {
        label: 'Naseem Bagh Living Heritage Observatory',
        href: canonicalPath,
      },
    ],
    canonicalPath
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="nbho-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <Landmark className="w-4 h-4" />
            <span>KEW · CHINAR MONITORING / LIVING HERITAGE &amp; CAMPUS ARBORICULTURE</span>
            <span className="text-slate-600">·</span>
            <span>COMPANION TO DISPATCH 11 &amp; MONOGRAPH 14</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Naseem Bagh Living Heritage &amp; Campus Ecology Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            Twelve permanent arboricultural, geospatial, and statutory registries tracking four
            centuries of Mughal <em>Platanus orientalis</em> heritage, root-zone soil integrity,
            campus infrastructure setbacks, and the 15-measure Naseem Bagh Recovery Protocol.
          </p>

          {/* 4 Evidence Baselines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {NASEEM_BAGH_CHINARS_SPEC.incidentCards4.map((card) => (
              <div
                key={card.kicker}
                className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-1"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300">
                  {card.kicker}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tabular-nums">
                  {card.figure}
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">{card.caption}</div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/35 bg-amber-950/20 max-w-5xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Scientific &amp; Statutory Evidentiary Protocol:
              </strong>{' '}
              Historical planting estimates (1,200+; 992) and contemporary counts (~700; 696; 710)
              are never subtracted to assert construction loss; reported removals (22 in 2011; 16+
              at Hamzah Guest House) are never summed without overlap verification; UoK’s 74.66 ha
              land-use inventory is strictly distinguished from Naseem Bagh proper; and formal Right
              of Response is permanently extended to the University of Kashmir.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-chinars-in-the-shadow-of-concrete"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read Dispatch 11: The Chinars in the Shadow of Concrete</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-14-the-chinars-in-the-shadow-of-concrete"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 14 (12 Volumes · 72 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <Trees className="w-4 h-4" />
              <span>Valley-Wide Chinar Monitoring Hub</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Native Chinar Sub-Navigation */}
      <ChinarSubNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16">
        {/* Interactive Arboricultural & Accountability Workbench */}
        <NaseemBaghChinarWorkbench variant="observatory" />

        {/* 12 Permanent Observatory Registries */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              OBSERVATORY ARCHITECTURE · 12 PERMANENT LIVING-HERITAGE REGISTRIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Arboricultural, Cadastral, Statutory &amp; Campus Governance Ledgers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEW_NASEEM_BAGH_OBSERVATORY_REGISTRIES_12.map((reg) => (
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

        {/* Primary Documentary Sources */}
        <section className="space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            PRIMARY ARCHIVAL, AUDIT, JOURNALISTIC &amp; STATUTORY SOURCES (10)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {NASEEM_BAGH_PRIMARY_SOURCES_10.map((ds) => (
              <a
                key={ds.source}
                href={ds.url}
                target={ds.url.startsWith('http') ? '_blank' : undefined}
                rel={ds.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition-colors flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-white leading-snug">{ds.source}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{ds.significance}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
