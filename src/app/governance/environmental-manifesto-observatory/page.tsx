import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Database, FileSpreadsheet, Scale, ShieldCheck } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import {
  KEW_MANIFESTO_OBSERVATORY_MODULES_12,
  PROMISE_IMPLEMENTATION_STATUSES_11,
  REGIONAL_PARTY_SCOPE_REGISTRIES,
  THREE_ANCHOR_EMPIRICAL_CASES,
  THIRTY_MANIFESTO_SUBJECTS,
  WHEMP_TEN_COMPONENTS,
  WHEN_POLITICS_PROMISES_GREEN_SPEC,
} from '@/data/himalayan-dispatch-when-politics-promises-green-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Western Himalayan Environmental Manifesto & Governance Observatory | Kashmir EcoWatch',
  description:
    'Permanent public-interest governance observatory within Kashmir EcoWatch tracking political manifestos, 30 environmental policy domains, INR/PKR budgets, legislative interventions, and ground outcomes across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan (2000–2026).',
  canonicalPath: '/governance/environmental-manifesto-observatory',
  imagePath: '/images/environmental-pil/kashmir-high-court-wetland.jpg',
});

export default function EnvironmentalManifestoObservatoryPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Institutional Governance', href: '/governance' },
      {
        label: 'Environmental Manifesto & Governance Observatory',
        href: '/governance/environmental-manifesto-observatory',
      },
    ],
    '/governance/environmental-manifesto-observatory'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="emgo-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Header */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <span>PROPOSED KEW SCIENTIFIC GOVERNANCE MODULE</span>
            <span className="text-slate-600">·</span>
            <span>PAIRED WITH HIMALAYAN DISPATCH &amp; MONOGRAPH 06</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Western Himalayan Environmental Manifesto &amp; Governance Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            A permanent public-interest programme tracking electoral environmental commitments,
            constitutional jurisdiction, annual budgets (in original INR and PKR values),
            legislative interventions, and satellite-verified ecological outcomes across Kashmir,
            Jammu, Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan.
          </p>

          {/* 5 / 30 / 2000–26 Stats */}
          <div className="grid grid-cols-3 max-w-xl gap-4 py-4">
            {WHEN_POLITICS_PROMISES_GREEN_SPEC.observatoryHeroStats.map((st) => (
              <div key={st.label} className="p-4 rounded-xl border border-slate-800 bg-slate-900/70">
                <div className="text-3xl sm:text-4xl font-bold text-white">{st.value}</div>
                <div className="text-xs uppercase tracking-wider text-emerald-400 mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 max-w-4xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Strict Non-Partisan Evidentiary Rule:
              </strong>{' '}
              Kashmir EcoWatch does not endorse, oppose, or rank political parties. Every
              organization is examined under one documentary standard—separating governing tenure
              from opposition tenure, respecting statutory jurisdiction, and guaranteeing full
              Institutional Right of Response.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/when-politics-promises-green"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read When Politics Promises Green</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-06-when-politics-promises-green"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 06 (15 Volumes · 75 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/governance/environmental-accountability-observatory"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 hover:underline"
            >
              <span>Environmental Accountability Observatory →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Twelve Core Observatory Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
            OBSERVATORY ARCHITECTURE · 12 CORE MODULES
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            From Manifesto Clauses to Field Verification
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KEW_MANIFESTO_OBSERVATORY_MODULES_12.map((m) => (
            <div key={m.code} className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-emerald-400">{m.code}</span>
                <Database className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-white">{m.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eleven Evidence-Based Commitment Tracking Statuses */}
      <section className="border-t border-slate-800 bg-slate-900/30 px-4 sm:px-8 lg:px-12 py-14">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400">
                EVIDENCE-BASED COMMITMENT TRACKING
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Eleven Non-Partisan Implementation Statuses
              </h2>
            </div>
            <Scale className="w-6 h-6 text-emerald-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROMISE_IMPLEMENTATION_STATUSES_11.map((st) => (
              <div key={st.code} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                <p className="text-xs font-mono text-amber-300">
                  {st.code} · {st.status}
                </p>
                <p className="text-xs sm:text-sm text-slate-300">{st.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Anchor Cases + 4 Regional Party Scope Lists + 30 Policy Domains + WHEMP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-14 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {THREE_ANCHOR_EMPIRICAL_CASES.map((c) => (
            <div key={c.region} className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                {c.region}
              </span>
              <div className="text-3xl font-bold text-white">{c.headlineFigure}</div>
              <h3 className="text-lg font-bold text-slate-100">{c.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{c.summary}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
            <span>Initial Regional Party &amp; Coalition Scope (Subject to Official Roll Reconciliation)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.values(REGIONAL_PARTY_SCOPE_REGISTRIES).map((reg) => (
              <div key={reg.regionLabel} className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2.5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                  {reg.regionLabel}
                </h3>
                <ul className="space-y-1 text-xs text-slate-300">
                  {reg.entries.map((e) => (
                    <li key={e.no}>
                      <span className="font-mono text-slate-500">{e.no}.</span> {e.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-xl border border-slate-800 bg-slate-900/50 space-y-5">
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>WHEMP — Ten Voluntary Manifesto Disclosure Standards &amp; 30 Policy Domains</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {WHEMP_TEN_COMPONENTS.map((c) => (
              <div key={c.number} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <p className="text-xs font-semibold text-emerald-400">
                  {c.number}. {c.component}
                </p>
                <p className="text-xs text-slate-300">{c.requiredDisclosure}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400">
            <strong>30 Indexed Domains:</strong>{' '}
            {THIRTY_MANIFESTO_SUBJECTS.map((s) => `${s.no}. ${s.domain}`).join(' · ')}
          </p>
        </div>
      </section>
    </main>
  );
}
