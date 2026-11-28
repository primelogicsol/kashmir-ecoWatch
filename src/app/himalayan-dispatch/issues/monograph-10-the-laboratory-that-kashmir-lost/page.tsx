import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HabakLaboratoryWorkbench } from '@/components/himalayan-dispatch/HabakLaboratoryWorkbench';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  COUNTERFACTUAL_EVOLUTION_1995_2030,
  DUAL_CASE_STUDY_COMPARISON,
  EIGHT_DIMENSIONS_INSTITUTIONAL_IGNORANCE,
  HABAK_LABORATORY_SPEC,
  HABAK_MONOGRAPH_VOLUMES_12,
  INTERNATIONAL_AQUATIC_INSTITUTES_5,
  KEW_SCIENTIFIC_INFRASTRUCTURE_ENGINES_12,
  MISSING_SCIENTIFIC_MEASUREMENTS_10,
  PRIMARY_DOCUMENTARY_EVIDENCE_8,
  REVISED_INAUGURAL_EDITION_29_ORDER,
  TWELVE_INSTITUTIONAL_RESPONSIBILITIES,
} from '@/data/himalayan-dispatch-habak-laboratory-monograph';

export const metadata: Metadata = buildPageMetadata({
  title: `${HABAK_LABORATORY_SPEC.title} — ${HABAK_LABORATORY_SPEC.monographLabel} | Himalayan Dispatch`,
  description:
    'Monograph 10 research architecture (12 Thematic Volumes · 90 Proposed Chapters) investigating the forgotten legacy of the Habak Ecological Laboratory, displaced Dal Lake science, CAG 2011 & 2025 audits, High Court directives, and the Habak Scientific Recovery Initiative.',
  canonicalPath: '/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost',
  publication: 'himalayan-dispatch',
  imagePath: '/images/environmental-calendar/calendar-hero-scientists-lab.jpg',
});

export default function Monograph10HabakLaboratoryPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Himalayan Dispatch', href: HD_ROUTES.root },
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 10 · The Laboratory That Kashmir Lost' },
          ]}
        />

        {/* Monumental Monograph Header */}
        <header
          className="border-b pb-12 space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="hd-kicker">
              {HABAK_LABORATORY_SPEC.monographLabel} &nbsp;·&nbsp; COMPANION TO DISPATCH 05
            </span>
            <span className="hd-folio-meta">
              INVESTIGATION PERIOD: {HABAK_LABORATORY_SPEC.investigationPeriod}
            </span>
          </div>

          <h1
            className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98]"
            style={{ color: 'var(--hd-fg)' }}
          >
            {HABAK_LABORATORY_SPEC.title}
          </h1>

          <p
            className="hd-font-display text-2xl sm:text-3xl italic max-w-5xl leading-snug"
            style={{ color: 'var(--hd-copper)' }}
          >
            {HABAK_LABORATORY_SPEC.subtitle}
          </p>

          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed max-w-4xl"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {HABAK_LABORATORY_SPEC.standfirst}
          </p>

          {/* 12 / 90 / 30+ / 5 Hero Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            {HABAK_LABORATORY_SPEC.heroStats.map((st) => (
              <div key={st.label} className="space-y-1">
                <div
                  className="hd-font-display text-4xl sm:text-5xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {st.value}
                </div>
                <div className="hd-folio-meta">{st.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <p className="hd-folio-meta">BY {HABAK_LABORATORY_SPEC.proposedByline}</p>
              <p className="hd-folio-meta">{HABAK_LABORATORY_SPEC.geographicalFocus}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  HABAK_LABORATORY_SPEC.storySlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Flagship Dispatch 05</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={toKewPlatformUrl('/governance/scientific-infrastructure-observatory')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase"
                style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
              >
                <span>Open KEW Observatory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <KewContentShare
                variant="editorial-button"
                label="Share This Monograph"
                title={`${HABAK_LABORATORY_SPEC.title} — Monograph 10 | Himalayan Dispatch`}
                description={HABAK_LABORATORY_SPEC.subtitle}
                canonicalPath="/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost"
                isPublished
              />
            </div>
          </div>

          {/* Research Limitations Disclosure */}
          <div
            role="note"
            aria-label="Research Limitations and Evidentiary Disclosure"
            className="p-5 sm:p-6 border space-y-1.5"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">
              PROPOSED INTERNAL RESEARCH ARCHITECTURE &amp; RESEARCH LIMITATIONS DISCLOSURE
            </p>
            <p
              className="hd-font-body text-xs sm:text-sm leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {HABAK_LABORATORY_SPEC.researchLimitationsDisclosure}
            </p>
          </div>
        </header>

        {/* Interactive Phosphorus, Audit & Recovery Workbench */}
        <HabakLaboratoryWorkbench />

        {/* CAG Report No. 4 of 2025: 10 Missing Scientific Measurements */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="hd-kicker">SECTION VIII · CAG REPORT NO. 4 OF 2025</span>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              The Ten Missing or Unsubstantiated Scientific Measurements
            </h2>
          </div>

          <div className="overflow-x-auto border" style={{ borderColor: 'var(--hd-rule)' }}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <th className="p-4 hd-folio-meta">Scientific Requirement</th>
                  <th className="p-4 hd-folio-meta">Findings of the Subsequent Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {MISSING_SCIENTIFIC_MEASUREMENTS_10.map(([req, finding]) => (
                  <tr key={req}>
                    <td className="p-4 font-semibold hd-font-body" style={{ color: 'var(--hd-fg)' }}>
                      {req}
                    </td>
                    <td
                      className="p-4 hd-font-body"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {finding}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Paired Case Studies: Sálim Ali National Park vs Habak Ecological Laboratory */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="p-6 border space-y-4"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <span className="hd-kicker">SECTION XVI · TWO HISTORICAL CASES STUDIED TOGETHER</span>
            <h3
              className="hd-font-display text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Sálim Ali National Park (The Landscape) &amp; Habak Laboratory (The Knowledge)
            </h3>
            <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
              Distinct legal histories—compared strictly on public-governance vulnerability when protected habitat and diagnostic science yield to competing administrative priorities.
            </p>
            <div className="divide-y text-xs sm:text-sm" style={{ borderColor: 'var(--hd-rule)' }}>
              {DUAL_CASE_STUDY_COMPARISON.map(([park, lab]) => (
                <div key={park} className="py-2.5 grid grid-cols-2 gap-4">
                  <span style={{ color: 'var(--hd-fg)' }}>{park}</span>
                  <span style={{ color: 'var(--hd-copper)' }}>{lab}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="p-6 border space-y-4"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <span className="hd-kicker">SECTION XIV · GOVERNANCE DIAGNOSTIC</span>
            <h3
              className="hd-font-display text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              The Eight Dimensions of Institutional Ignorance
            </h3>
            <div className="divide-y text-xs sm:text-sm" style={{ borderColor: 'var(--hd-rule)' }}>
              {EIGHT_DIMENSIONS_INSTITUTIONAL_IGNORANCE.map(([dim, q]) => (
                <div key={dim} className="py-2.5 space-y-0.5">
                  <div className="font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {dim}
                  </div>
                  <div style={{ color: 'var(--hd-fg-secondary)' }}>{q}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Complete 12 Volumes & 90 Proposed Chapters */}
        <section id="volumes-and-chapters" className="space-y-8">
          <div className="space-y-2 border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <span className="hd-kicker">SECTION XX · COMPLETE INVESTIGATIVE MONOGRAPH</span>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              12 Thematic Volumes · 90 Proposed Chapters
            </h2>
          </div>

          <div className="space-y-8">
            {HABAK_MONOGRAPH_VOLUMES_12.map((vol) => (
              <div
                key={vol.roman}
                className="border p-6 sm:p-8 space-y-5"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div>
                    <span className="hd-kicker block">
                      VOLUME {vol.roman} &nbsp;·&nbsp; CHAPTERS {vol.chapterRange}
                    </span>
                    <h3
                      className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {vol.title}
                    </h3>
                  </div>
                  <span className="hd-folio-meta">{vol.chapters.length} CHAPTER PROTOCOLS</span>
                </div>

                <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {vol.scopeSummary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vol.chapters.map((ch) => {
                    const slug = `chapter-${ch.number}-${ch.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/^-+|-+$/g, '')}`;
                    return (
                      <Link
                        key={ch.number}
                        href={`/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost/chapters/${slug}`}
                        className="p-4 border group transition-colors block space-y-1.5"
                        style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--hd-copper)' }}>
                            {ch.number}.
                          </span>
                          <span className="hd-folio-meta group-hover:underline">OPEN DOSSIER →</span>
                        </div>
                        <h4
                          className="hd-font-display text-lg font-semibold group-hover:underline"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {ch.title}
                        </h4>
                        <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                          {ch.investigativeQuestion}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Primary Documentary Evidence Table (8 Sources) & Counterfactual/Observatory Summary */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="hd-kicker">SECTION XXII · PRIMARY DOCUMENTARY EVIDENCE</span>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Verified Primary &amp; Archival Source Register
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRIMARY_DOCUMENTARY_EVIDENCE_8.map((doc) => (
              <div
                key={doc.code}
                className="p-5 border space-y-2"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="hd-kicker">{doc.code}</span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs hd-font-sans font-semibold hover:underline"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    <span>Source Record</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h3 className="hd-font-display text-xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                  {doc.sourceTitle}
                </h3>
                <p className="hd-folio-meta">{doc.outletOrRepository}</p>
                <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {doc.significance}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Revised 29-Dispatch Architecture Context & Epilogue Quote */}
        <section
          className="p-8 border space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: '#171717', color: '#F2EFE7' }}
        >
          <div className="space-y-2">
            <span className="hd-font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
              EPILOGUE · {HABAK_LABORATORY_SPEC.epilogueTitle}
            </span>
            <blockquote className="hd-font-display text-2xl sm:text-4xl italic leading-snug text-[#F2EFE7]">
              “{HABAK_LABORATORY_SPEC.closingQuestion}”
            </blockquote>
          </div>

          <div className="pt-4 border-t border-[#F2EFE7]/20 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#D8C3A5] font-mono">
              Positioned as Dispatch 05 immediately following Dispatch 04 (The Mathematics of a Dying Lake) in the {REVISED_INAUGURAL_EDITION_29_ORDER.length}-Dispatch Inaugural Architecture · Paired with {KEW_SCIENTIFIC_INFRASTRUCTURE_ENGINES_12.length} KEW Observatory Engines, {INTERNATIONAL_AQUATIC_INSTITUTES_5.length} Global Models, {COUNTERFACTUAL_EVOLUTION_1995_2030.length} Counterfactual Stages &amp; {TWELVE_INSTITUTIONAL_RESPONSIBILITIES.length} Accountable Institutions.
            </span>
            <Link
              href={HD_ROUTES.currentIssue}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#D8C3A5] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Vol. 01 / No. 01</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
