import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Database,
  ExternalLink,
  FlaskConical,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';
import {
  HABAK_LABORATORY_SPEC,
  INTERNATIONAL_AQUATIC_INSTITUTES_5,
  KEW_SCIENTIFIC_INFRASTRUCTURE_ENGINES_12,
  MISSING_SCIENTIFIC_MEASUREMENTS_10,
  OVERSIGHT_MEETINGS_BREAKDOWN,
  PRIMARY_DOCUMENTARY_EVIDENCE_8,
  PROPOSED_AQUATIC_INSTITUTE_16_DIVISIONS,
  TWELVE_INSTITUTIONAL_RESPONSIBILITIES,
} from '@/data/himalayan-dispatch-habak-laboratory-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Environmental Scientific Infrastructure & Institutional Legacy Observatory | Kashmir EcoWatch',
  description:
    'Permanent 12-engine accountability and research programme within Kashmir EcoWatch documenting environmental laboratories, scientific assets, personnel continuity, CAG audit findings, and monitoring gaps across the Western Himalayas—with the Habak Ecological Laboratory (1990s–2026) as Case #01.',
  canonicalPath: '/governance/scientific-infrastructure-observatory',
  imagePath: '/images/environmental-calendar/calendar-hero-scientists-lab.jpg',
});

export default function ScientificInfrastructureObservatoryPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Institutional Governance', href: '/governance' },
      {
        label: 'Scientific Infrastructure & Institutional Legacy Observatory',
        href: '/governance/scientific-infrastructure-observatory',
      },
    ],
    '/governance/scientific-infrastructure-observatory'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="siio-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Header */}
      <section
        data-kew-dark-surface="true"
        className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <span>KEW SCIENTIFIC GOVERNANCE &amp; PUBLIC ASSET ACCOUNTABILITY</span>
            <span className="text-slate-600">·</span>
            <span>PAIRED WITH HIMALAYAN DISPATCH 05 &amp; MONOGRAPH 10</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Environmental Scientific Infrastructure &amp; Institutional Legacy Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            A permanent research and public-interest accountability module tracking environmental
            laboratories, analytical instrumentation, scientific staffing continuity, statutory
            advisory meetings, CAG audit remediation, and unmeasured ecological mass-balance terms
            across the Western Himalayas—anchored by Investigation #01:{' '}
            <strong className="text-white">
              The Habak Ecological Laboratory (1990s–2026)
            </strong>
            .
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-3xl gap-4 py-3">
            {[
              { value: '12', label: 'Observatory Engines' },
              { value: '16', label: 'Proposed Institute Divisions' },
              { value: '12', label: 'Audited Decision Tiers' },
              { value: '1990s–26', label: 'Habak Case Horizon' },
            ].map((st) => (
              <div
                key={st.label}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/70"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">{st.value}</div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-400 mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Evidentiary Safeguard Banner */}
          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 max-w-5xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Evidentiary &amp; Proposal Boundary:{' '}
              </strong>
              {HABAK_LABORATORY_SPEC.researchLimitationsDisclosure}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={getKewToDispatchUrl(
                '/issues/volume-01-issue-01/the-laboratory-that-kashmir-lost'
              )}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Read Dispatch 05: The Laboratory That Kashmir Lost</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={getKewToDispatchUrl(
                '/issues/monograph-10-the-laboratory-that-kashmir-lost'
              )}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 hover:border-emerald-500/50 bg-slate-900 text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Explore Monograph 10 (12 Volumes · 90 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/water-systems/lakes/dal-lake/conservation-performance"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-800 hover:border-teal-500/40 text-teal-300 text-xs font-semibold transition-colors"
            >
              <span>Dal Lake Conservation Performance Observatory →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12 Core Observatory Engines */}
      <section className="px-4 sm:px-8 lg:px-12 py-14 sm:py-18 max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            SECTION XIX · PERMANENT KEW ACCOUNTABILITY ARCHITECTURE
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            12 Proposed Observatory Engines (SIIO-01 – SIIO-12)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KEW_SCIENTIFIC_INFRASTRUCTURE_ENGINES_12.map((eng) => (
            <div
              key={eng.code}
              className="kew-card-shell p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">{eng.code}</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{eng.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{eng.function}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Anchor Case #01: Habak Ecological Laboratory (CAG 2011 & CAG 2025 Baselines) */}
      <section className="px-4 sm:px-8 lg:px-12 py-14 border-t border-slate-800 max-w-7xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-400">
            HISTORICAL INSTITUTIONAL INVESTIGATION #01 · HABAK ECOLOGICAL LABORATORY
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Audited Infrastructure, Oversight &amp; Monitoring Deficits (2009–2025)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HABAK_LABORATORY_SPEC.cag2011FailureStats.map((st) => (
            <div
              key={st.label}
              className="kew-card-shell p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2"
            >
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">{st.value}</div>
              <h3 className="text-sm font-bold text-white">{st.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{st.note}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {OVERSIGHT_MEETINGS_BREAKDOWN.map((m) => (
            <div
              key={m.committee}
              className="kew-card-shell p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2"
            >
              <span className="text-xs font-mono uppercase text-amber-400">{m.committee}</span>
              <div className="text-2xl font-bold text-white">
                {m.held} of {m.expected} meetings held ({m.heldPct}%)
              </div>
              <p className="text-xs text-slate-400">{m.auditNote}</p>
            </div>
          ))}
        </div>

        <div className="kew-card-shell p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            <span>10 Missing or Unsubstantiated Scientific Requirements (CAG Report No. 4 of 2025)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MISSING_SCIENTIFIC_MEASUREMENTS_10.map(([req, finding]) => (
              <div key={req} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 text-xs space-y-1">
                <div className="font-bold text-white">{req}</div>
                <p className="text-slate-400">{finding}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proposed Western Himalayan Institute of Aquatic Sciences (16 Divisions) & Global Models */}
      <section className="px-4 sm:px-8 lg:px-12 py-14 border-t border-slate-800 max-w-7xl mx-auto space-y-10">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            SECTION XVIII · HABAK SCIENTIFIC RECOVERY INITIATIVE (PROPOSED)
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Proposed Western Himalayan Institute of Aquatic Sciences and Environmental Engineering
          </h2>
          <p className="text-sm text-slate-400 max-w-4xl">
            Editorial and scientific institutional recovery proposal (not an existing government agency): independent scientific leadership, protected research budgets, NABL/ISO analytical quality, open public datasets, and strict separation between engineering procurement and scientific performance evaluation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROPOSED_AQUATIC_INSTITUTE_16_DIVISIONS.map((div, i) => (
            <div
              key={div}
              className="kew-card-shell p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1"
            >
              <span className="text-[10px] font-mono text-emerald-400">
                DIVISION {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sm font-bold text-white">{div}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="kew-card-shell p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>Five International Aquatic Science Benchmarks</span>
            </h3>
            <div className="space-y-3">
              {INTERNATIONAL_AQUATIC_INSTITUTES_5.map((inst) => (
                <div key={inst.name} className="p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-white">
                    {inst.name} — {inst.country}
                  </div>
                  <p className="text-slate-300">{inst.model}</p>
                  <p className="text-emerald-400">Lesson for Kashmir: {inst.lessonForKashmir}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="kew-card-shell p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>12-Institution Responsibility &amp; Right-of-Response Register</span>
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {TWELVE_INSTITUTIONAL_RESPONSIBILITIES.map(([inst, scope]) => (
                <div key={inst} className="p-3 rounded-xl border border-slate-800 text-xs">
                  <strong className="text-white">{inst}:</strong>{' '}
                  <span className="text-slate-300">{scope}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Documentary Sources */}
        <div className="kew-card-shell p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
          <h3 className="text-lg font-bold text-white">Primary Corroborating Documentary Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PRIMARY_DOCUMENTARY_EVIDENCE_8.map((doc) => (
              <a
                key={doc.code}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors block space-y-1 text-xs"
              >
                <div className="flex items-center justify-between text-emerald-400 font-mono">
                  <span>{doc.code}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="font-bold text-white">{doc.sourceTitle}</div>
                <p className="text-slate-400">{doc.significance}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
