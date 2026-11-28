import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, Database, Scale, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import {
  CAG_LAKE_SEWAGE_AUDIT_LEDGER,
  CONSISTENCY_FRAMEWORK_DOMAINS_5,
  ECOLOGICAL_ACCOUNTABILITY_REGISTER_20,
  SELECTIVE_CONSCIOUSNESS_HISTORICAL_EPISODES,
  WESTERN_HIMALAYAN_ACCOUNTABILITY_OBSERVATORY_REGISTRIES_10,
} from '@/data/himalayan-dispatch-selective-consciousness-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Western Himalayan Environmental Accountability Observatory | Kashmir EcoWatch',
  description:
    'Permanent 10-registry scientific companion within Kashmir EcoWatch documenting environmental controversies, clearances, judicial orders, CAG/STP audits, restoration commitments, and measurable ecological outcomes across Kashmir, Jammu, and Ladakh.',
  canonicalPath: '/governance/environmental-accountability-observatory',
  imagePath: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
});

export default function EnvironmentalAccountabilityObservatoryPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Institutional Governance', href: '/governance' },
      {
        label: 'Western Himalayan Environmental Accountability Observatory',
        href: '/governance/environmental-accountability-observatory',
      },
    ],
    '/governance/environmental-accountability-observatory'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="wheao-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Header */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <span>KASHMIR ECOWATCH · PERMANENT SCIENTIFIC COMPANION</span>
            <span className="text-slate-600">·</span>
            <span>PAIRED WITH HIMALAYAN DISPATCH NO. 24 &amp; MONOGRAPH 02</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Western Himalayan Environmental Accountability Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            Unlike a conventional news archive that moves on once a controversy leaves the
            headlines, this permanent institutional observatory tracks environmental disputes,
            statutory clearances, judicial directives, restoration promises, and everyday watershed
            pressures from initial emergence through measurable multi-year ecological outcomes.
          </p>

          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 max-w-4xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Constitutional &amp; Non-Surveillance Safeguard:
              </strong>{' '}
              The Observatory’s sole mandate is open, sponsor-blind scientific and institutional
              documentation—never political surveillance, ideological scoring, or the profiling of
              private individuals. Kashmir EcoWatch binds itself permanently to the same public
              audit, uncertainty-disclosure, and right-of-reply standards.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/selective-environmental-consciousness"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read Dispatch 24 Flagship Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-02-selective-environmental-consciousness"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 02 (9 Parts · 50 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/resources/environmental-pil"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 hover:underline"
            >
              <span>Environmental PIL Portal</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ten Permanent Registries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-18 space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
            INSTITUTIONAL ARCHITECTURE · 10 PERMANENT REGISTRIES
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            From Episodic Outrage to Longitudinal Evidence
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
            Complementing KEW’s Environmental PIL Portal, Change Detection Observatory, 553-Lake
            Master Registry, Sectoral EIA Engine, and Himalayan Dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WESTERN_HIMALAYAN_ACCOUNTABILITY_OBSERVATORY_REGISTRIES_10.map((reg) => (
            <div
              key={reg.code}
              className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {reg.code}
                  </span>
                  <Database className="w-4 h-4 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white">{reg.name}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{reg.permanentFunction}</p>
                <p className="text-xs text-slate-400 pt-1">
                  <strong className="text-slate-200">Evidentiary standard:</strong>{' '}
                  {reg.evidentiaryStandard}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  href={reg.connectedKewSurfaceHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:underline"
                >
                  <span>Connected KEW Module: {reg.connectedKewSurfaceLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seeded Historical & Statutory Baselines (2008, 2023–26, Nov 2026 & CAG 2025) */}
      <section className="border-t border-slate-800 bg-slate-900/30 px-4 sm:px-8 lg:px-12 py-14 sm:py-18">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
              INITIAL OBSERVATORY BASELINES · DOCUMENTED PUBLIC RECORDS
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Three Comparative Historical Cases &amp; The CAG 63-Lake Audit Baseline
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SELECTIVE_CONSCIOUSNESS_HISTORICAL_EPISODES.map((ep) => (
              <div
                key={ep.id}
                className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-emerald-400">
                    {ep.period}
                  </span>
                  <span className="font-mono text-amber-300">{ep.headlineFigure}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{ep.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{ep.summary}</p>
              </div>
            ))}
          </div>

          {/* CAG Report No. 4 of 2025 Card */}
          <div className="p-6 sm:p-8 rounded-xl border border-slate-800 bg-slate-950 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {CAG_LAKE_SEWAGE_AUDIT_LEDGER.heading}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {CAG_LAKE_SEWAGE_AUDIT_LEDGER.auditScopeSubtitle}
                </h3>
              </div>
              <Scale className="w-6 h-6 text-amber-400" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CAG_LAKE_SEWAGE_AUDIT_LEDGER.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">{m.label}</div>
                  <div className="text-3xl font-bold text-white mt-1">{m.figure}</div>
                </div>
              ))}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-400">Other Examined Lakes</div>
                <div className="text-3xl font-bold text-white mt-1">
                  {CAG_LAKE_SEWAGE_AUDIT_LEDGER.otherExaminedLakes}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic leading-relaxed">
              {CAG_LAKE_SEWAGE_AUDIT_LEDGER.methodologicalNote}
            </p>
          </div>
        </div>
      </section>

      {/* Complete 20-System Ecological Accountability Register & 5-Domain Consistency Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-18 space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            20-System Regional Ecological Accountability Register
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Ecological System</th>
                  <th className="py-3.5 px-4">Documented Pressures</th>
                  <th className="py-3.5 px-4">Responsible Authorities</th>
                  <th className="py-3.5 px-4">Measurable Indicators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm">
                {ECOLOGICAL_ACCOUNTABILITY_REGISTER_20.map((item) => (
                  <tr key={item.code} className="bg-slate-950/80 hover:bg-slate-900/60">
                    <td className="py-3 px-4 font-semibold text-emerald-400 whitespace-nowrap align-top">
                      <Link href={item.kewModuleHref} className="hover:underline">
                        {item.code} · {item.system}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-slate-300 align-top">
                      {item.documentedPressures}
                    </td>
                    <td className="py-3 px-4 text-slate-400 align-top">
                      {item.responsibleInstitutions}
                    </td>
                    <td className="py-3 px-4 text-slate-300 align-top">
                      {item.measurableIndicators}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Five-Domain Environmental Consistency Framework (Proposed Protocol)</span>
            </h3>
            <span className="text-xs font-mono text-amber-300">
              NO INSTITUTIONAL OR GROUP SCORES CALCULATED
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CONSISTENCY_FRAMEWORK_DOMAINS_5.map((dom) => (
              <div key={dom.code} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {dom.code} · {dom.domain}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">{dom.question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
