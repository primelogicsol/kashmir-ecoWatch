import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Database,
  ExternalLink,
  Gavel,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { EnvironmentalLawAccountabilityWorkbench } from '@/components/himalayan-dispatch/EnvironmentalLawAccountabilityWorkbench';
import {
  ENVIRONMENTAL_LAW_MONOGRAPH_SPEC,
  FOUR_LEGAL_FRAMEWORKS_5_REGIONS,
  INDIVIDUAL_STATUTORY_DOSSIER_FIELDS_10,
  KEW_LEGAL_OBSERVATORY_REGISTRIES_16,
  PRIMARY_LEGAL_REPOSITORIES_14,
} from '@/data/himalayan-dispatch-environmental-law-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Western Himalayan Environmental Legislation & Enforcement Observatory | Kashmir EcoWatch',
  description:
    'Permanent 16-registry environmental governance infrastructure within Kashmir EcoWatch tracking legislation, amendments, territorial applicability, clearances, CAG/NGT compliance, satellite evidence, and 15 proposed reform packages across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan.',
  canonicalPath: '/governance/legislation-enforcement-observatory',
  imagePath: '/images/environmental-pil/ladakh-transhimalayan-sanctuary.jpg',
});

export default function LegislationEnforcementObservatoryPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Institutional Governance', href: '/governance' },
      {
        label: 'Western Himalayan Environmental Legislation & Enforcement Observatory',
        href: '/governance/legislation-enforcement-observatory',
      },
    ],
    '/governance/legislation-enforcement-observatory'
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <JsonLd id="whleo-breadcrumbs" data={breadcrumbJsonLd} />

      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase text-emerald-400">
            <span>KASHMIR ECOWATCH · PERMANENT GOVERNANCE INFRASTRUCTURE</span>
            <span className="text-slate-600">·</span>
            <span>PAIRED WITH HIMALAYAN DISPATCH &amp; MONOGRAPH 07</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-5xl">
            Western Himalayan Environmental Legislation and Enforcement Observatory
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-4xl leading-relaxed">
            A permanent sixteen-registry legal-scientific companion uniting statutory texts,
            amendment histories, post-2019 and regional applicability schedules, CAG/NGT compliance
            audits, satellite buffer verification, and fifteen model legislative reform packages
            across Kashmir, Jammu, Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan.
          </p>

          {/* 3 Monumental Observatory Hero Stats (5 · 4 · 15) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl pt-2">
            {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.observatoryHeroStats.map((st) => (
              <div
                key={st.label}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-1"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tabular-nums">
                  {st.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Strict Legal Provenance & Evidentiary Firewall */}
          <div className="p-4 sm:p-5 rounded-xl border border-amber-500/35 bg-amber-950/20 max-w-5xl text-xs sm:text-sm text-amber-100/90 leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold">
                Mandatory Evidentiary &amp; Jurisdictional Firewall:
              </strong>{' '}
              This Observatory strictly distinguishes <strong>enacted legislation</strong> from{' '}
              <strong>proposed reform frameworks</strong>, and <strong>legal allegations</strong>{' '}
              from <strong>adjudicated violations</strong>. Historical audit findings (CAG Report
              No. 4 of 2025 up to March 2022; NGT Sept 2025 Ladakh figures) are separated from
              current November 2026 field conditions, dual statutory citations in Gilgit-Baltistan
              (2014 vs. Act VI of 2015) are both preserved, and all 15 proposed reform packages
              require independent review by qualified environmental lawyers in each jurisdiction.
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/when-environmental-laws-exist-but-the-environment-has-no-defence"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Read Flagship Legal Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <span>Open Monograph 07 (20 Volumes · 100 Chapters)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/resources/environmental-pil"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-950/50 text-cyan-200 text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              <Gavel className="w-4 h-4" />
              <span>Open KEW 26-Case Environmental PIL Portal</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-16">
        {/* Four Frameworks Across Five Regions */}
        <section id="four-frameworks" className="space-y-6 scroll-mt-24">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              JURISDICTION &amp; APPLICABILITY ENGINE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Four Distinct Principal Legal Frameworks Across Five Regions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {FOUR_LEGAL_FRAMEWORKS_5_REGIONS.map((item) => (
              <div
                key={item.region}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {item.frameworkCode}
                  </span>
                  <h3 className="text-lg font-bold text-white">{item.region}</h3>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {item.principalLegalFramework}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.constitutionalAndTransitionalNotes}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 space-y-1">
                  <div>
                    <strong className="text-slate-200">Regulator:</strong>{' '}
                    {item.primaryEnvironmentalAgency}
                  </div>
                  <div>
                    <strong className="text-slate-200">Courts:</strong>{' '}
                    {item.primaryJudicialForum}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Legal & TMDL Workbench (Observatory Dark Mode) */}
        <div id="statutory-explorer" className="scroll-mt-24">
          <EnvironmentalLawAccountabilityWorkbench variant="observatory" />
        </div>

        {/* All 16 Permanent Observatory Registries */}
        <section id="sixteen-registries" className="space-y-6 scroll-mt-24">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              OBSERVATORY ARCHITECTURE · 16 PERMANENT REGISTRIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Integrated Legal, Satellite, Compliance &amp; Restoration Registries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEW_LEGAL_OBSERVATORY_REGISTRIES_16.map((reg) => (
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
                    <strong className="text-slate-200">Evidentiary Rule:</strong>{' '}
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

        {/* Individual Statutory Dossier Schema + 14 Official Repositories */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              INDIVIDUAL STATUTORY DOSSIER SPECIFICATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              10-Field Legal &amp; Enforcement Dossier Per Statute
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every enacted statute and subordinate rule indexed in the Observatory receives a
              structured ten-field dossier separating statutory intent from ground-level outcomes:
            </p>
            <ul className="space-y-2 text-xs text-slate-200">
              {INDIVIDUAL_STATUTORY_DOSSIER_FIELDS_10.map((fld) => (
                <li
                  key={fld}
                  className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/70"
                >
                  {fld}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
              14 PRIMARY LEGAL &amp; AUDIT REPOSITORIES
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Direct Gateways to Official Gazettes, Courts &amp; Auditors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRIMARY_LEGAL_REPOSITORIES_14.map((rep) => (
                <a
                  key={rep.domainLabel}
                  href={rep.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-emerald-500/40 transition-colors flex items-start justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white leading-snug">
                      {rep.repository}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400">
                      {rep.domainLabel}
                    </div>
                    <div className="text-[11px] text-slate-400">{rep.jurisdictionScope}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
