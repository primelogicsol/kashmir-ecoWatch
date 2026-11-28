import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { ResearchAccountabilityWorkbench } from '@/components/himalayan-dispatch/ResearchAccountabilityWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  BIBLIOMETRIC_DATABASES_10,
  ENVIRONMENTAL_RESEARCH_DISCIPLINES_30,
  INFRASTRUCTURE_CENSUS_PARAMETERS_15,
  KNOWLEDGE_DESTINATION_AUDIT_12,
  PRELIMINARY_RESEARCH_UNITS_BY_REGION_5,
  RESEARCH_ACCOUNTABILITY_CHAPTERS_60,
  RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC,
  RESEARCH_ACCOUNTABILITY_VOLUMES_15,
  RESEARCH_MATURITY_SHIFT_10,
  RESEARCH_TO_SOCIETY_PROTOCOL_9,
  SCIENTIFIC_COMMUNITY_QUESTIONS_12,
  UOK_GEOGRAPHY_DOCUMENTED_ANCHOR,
  WESTERN_HIMALAYAN_RESEARCH_OBSERVATORY_REGISTRIES_12,
} from '@/data/himalayan-dispatch-research-accountability-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 04 — Who Are We Researching For? (15 Volumes · 60 Chapters) | Himalayan Dispatch',
  description: RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-04-who-are-we-researching-for',
  imagePath: '/images/publications/glaciology-kolahoi-gnss-survey.jpg',
});

export default function Monograph04WhoAreWeResearchingForPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-04-who-are-we-researching-for';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.monographCode,
    name: `${RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.title} ${RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.subtitle}`,
    description: RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-04-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 04 · Who Are We Researching For?' },
          ]}
        />

        {/* Monumental Monograph 04 Cover Header */}
        <header
          className="p-8 sm:p-12 lg:p-16 border space-y-8"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#171717',
            color: '#F2EFE7',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EFE7]/15 pb-4">
            <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
              {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH 12 OF 24
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.kicker}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 max-w-2xl gap-6 py-5 border-y border-[#F2EFE7]/20">
            {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.heroStats.map((st) => (
              <div key={st.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {st.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                BYLINE: {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#A39B8B]">
                SCOPE: {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.geographicScope}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 12 Flagship Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl('/research-library/environmental-research-observatory')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border border-[#F2EFE7]/40 text-xs font-medium tracking-[0.18em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Research Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share This Monograph"
                title={`${RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.title} — Monograph 04 | Himalayan Dispatch`}
                description={RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>

          <p className="hd-font-body text-xs italic text-[#F2EFE7]/72 pt-3 border-t border-[#F2EFE7]/15">
            {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.evidentiaryNotice}
          </p>
        </header>

        {/* Strict 10-Step Editorial Sequence & Preliminary 80-Unit Inventory */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="hd-kicker">STRICT EDITORIAL SEQUENCE · EVIDENCE BEFORE CRITIQUE</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              Ten Steps From Counting Institutions to Returning Knowledge
            </h2>
            <ol
              className="p-6 border space-y-2.5"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.strictTenStepEditorialSequence.map(
                (step, idx) => (
                  <li key={step} className="hd-font-body text-sm flex items-start gap-2.5">
                    <span
                      className="hd-font-display font-semibold shrink-0"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>{step}</span>
                  </li>
                )
              )}
            </ol>

            <blockquote
              className="p-5 border-l-2 space-y-1.5"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p
                className="hd-font-display text-2xl italic font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                “{RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.definingMaxim}”
              </p>
            </blockquote>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div
              className="p-6 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="hd-kicker">PART I · PRELIMINARY WORKING INVENTORY (80 UNITS)</p>
                <span className="hd-folio-meta">NOT 80 INDEPENDENT UNIVERSITIES</span>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {PRELIMINARY_RESEARCH_UNITS_BY_REGION_5.map((r) => (
                  <div key={r.region} className="py-3 space-y-1">
                    <div className="flex justify-between">
                      <strong className="hd-font-display text-xl">{r.region}</strong>
                      <span
                        className="hd-font-display text-2xl font-semibold tabular-nums"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        {r.preliminaryUnitsIdentified}
                      </span>
                    </div>
                    <p
                      className="hd-font-body text-xs"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {r.representativeInstitutionsScope}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-5 border space-y-2"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">DOCUMENTED DEPARTMENTAL PROOF OF RETRIEVABILITY</p>
              <p className="hd-font-display text-2xl font-semibold">
                {UOK_GEOGRAPHY_DOCUMENTED_ANCHOR.institution}:{' '}
                <span style={{ color: 'var(--hd-copper)' }}>
                  {UOK_GEOGRAPHY_DOCUMENTED_ANCHOR.reportedPublications} reported publications (
                  {UOK_GEOGRAPHY_DOCUMENTED_ANCHOR.reportingWindow} ·{' '}
                  {UOK_GEOGRAPHY_DOCUMENTED_ANCHOR.annualAverage}/yr)
                </span>
              </p>
              <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                {UOK_GEOGRAPHY_DOCUMENTED_ANCHOR.methodologicalCaveat}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Bibliometric Census & Second-Life Workbench */}
        <ResearchAccountabilityWorkbench variant="editorial" />

        {/* 15 Outstanding Infrastructure Metrics + 30 Disciplines + 10 Databases */}
        <section
          className="pt-12 border-t grid grid-cols-1 lg:grid-cols-12 gap-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">CHAPTER 01 STATISTICAL TARGETS</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              15 Definitive Infrastructure Metrics
            </h2>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {INFRASTRUCTURE_CENSUS_PARAMETERS_15.map(([metric, status]) => (
                <div
                  key={metric}
                  className="p-3 flex items-center justify-between gap-3 text-xs sm:text-sm hd-font-body"
                >
                  <span>{metric}</span>
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="hd-kicker">PART II · 30 ENVIRONMENTAL RESEARCH DISCIPLINES</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {ENVIRONMENTAL_RESEARCH_DISCIPLINES_30.map((d) => (
                  <div
                    key={d.number}
                    className="p-2.5 border text-xs hd-font-body"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <strong style={{ color: 'var(--hd-copper)' }}>{d.number}.</strong>{' '}
                    {d.discipline}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="hd-kicker">TEN SCIENTIFIC DATABASES &amp; REPOSITORIES</p>
              <div
                className="border divide-y"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                {BIBLIOMETRIC_DATABASES_10.map((db) => (
                  <div key={db.name} className="p-3 text-xs sm:text-sm hd-font-body">
                    {db.url ? (
                      <a
                        href={db.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 mr-2"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        <span>{db.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <strong className="mr-2">{db.name}:</strong>
                    )}
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>{db.purpose}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Complete 15-Volume, 60-Chapter Special Monograph Index */}
        <section
          id="chapters-index"
          className="pt-12 border-t space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="hd-kicker">
                COMPLETE HIMALAYAN DISPATCH SPECIAL ISSUE ARCHITECTURE (PROPOSED)
              </p>
              <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold">
                15 Thematic Volumes · 60 Proposed Chapters
              </h2>
            </div>
            <span className="hd-folio-meta">
              ASSESSMENT: 2001–2026 &nbsp;·&nbsp; FUTURE AGENDA: 2027–2035
            </span>
          </div>

          <div className="space-y-8">
            {RESEARCH_ACCOUNTABILITY_VOLUMES_15.map((vol) => {
              const volChapters = RESEARCH_ACCOUNTABILITY_CHAPTERS_60.filter(
                (c) => c.volumeRoman === vol.volumeRoman
              );
              return (
                <div
                  key={vol.volumeRoman}
                  className="p-6 sm:p-8 border space-y-4"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div>
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} &nbsp;·&nbsp; {vol.chapterRange.toUpperCase()}
                      </span>
                      <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1">
                        {vol.volumeTitle}
                      </h3>
                    </div>
                    <span className="hd-folio-meta">{vol.editorialStepAlignment}</span>
                  </div>
                  <p
                    className="hd-font-body text-sm"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.thematicMandate}
                  </p>

                  <ol className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                    {volChapters.map((ch) => {
                      const chPath = `${canonicalPath}/chapters/${ch.slug}`;
                      return (
                        <li
                          key={ch.number}
                          className="py-3 flex items-start justify-between gap-4"
                        >
                          <Link
                            href={HD_ROUTES.monographResearchAccountabilityChapter(ch.slug)}
                            className="flex-1 group space-y-1"
                          >
                            <div className="flex flex-wrap items-baseline gap-3">
                              <span
                                className="hd-font-display text-xl font-semibold"
                                style={{ color: 'var(--hd-copper)' }}
                              >
                                {ch.number}
                              </span>
                              <span className="hd-font-display text-xl font-semibold group-hover:underline underline-offset-4">
                                {ch.title}
                              </span>
                            </div>
                            <p
                              className="hd-font-body text-xs sm:text-sm"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {ch.analyticalFocus}
                            </p>
                          </Link>
                          <KewContentShare
                            variant="toc-icon"
                            title={`Chapter ${ch.number}: ${ch.title} — Monograph 04`}
                            description={ch.analyticalFocus}
                            canonicalPath={chPath}
                            isPublished
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>
        </section>

        {/* Parts III–VI Summary Matrices + Defining Argument */}
        <section
          className="pt-12 border-t grid grid-cols-1 lg:grid-cols-12 gap-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-6 space-y-4">
            <p className="hd-kicker">PART IV · 12 QUESTIONS FOR THE SCIENTIFIC COMMUNITY</p>
            <div
              className="border divide-y max-h-[520px] overflow-y-auto"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {SCIENTIFIC_COMMUNITY_QUESTIONS_12.map(([domain, q]) => (
                <div key={domain} className="p-3.5 text-xs sm:text-sm hd-font-body">
                  <strong>{domain}:</strong>{' '}
                  <span style={{ color: 'var(--hd-fg-secondary)' }}>{q}</span>
                </div>
              ))}
            </div>
            <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
              Knowledge Destination Audit tracks 12 output categories ({KNOWLEDGE_DESTINATION_AUDIT_12.length}{' '}
              total); Technological Maturity Shift evaluates {RESEARCH_MATURITY_SHIFT_10.length}{' '}
              frontier transitions; WH-RSIP governs {RESEARCH_TO_SOCIETY_PROTOCOL_9.length} research
              categories.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div
              className="p-6 sm:p-8 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: '#171717',
                color: '#F2EFE7',
              }}
            >
              <p className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                THE DEFINING EDITORIAL ARGUMENT
              </p>
              {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.definingEditorialArgument.map((p, idx) => (
                <p
                  key={idx}
                  className="hd-font-body text-sm sm:text-base leading-relaxed text-[#F2EFE7]/88"
                >
                  {p}
                </p>
              ))}
              <p className="hd-font-display text-2xl italic text-[#D8C3A5]">
                {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.definingMaxim}
              </p>
              <p className="hd-font-display text-xl italic text-[#F2EFE7] pt-2 border-t border-[#F2EFE7]/20">
                “{RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.closingQuestion}”
              </p>
            </div>

            <div
              className="p-5 border flex flex-wrap items-center justify-between gap-4"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div>
                <p className="hd-kicker">PART VII · PERMANENT KEW COMPANION</p>
                <p className="hd-font-display text-2xl font-semibold">
                  Western Himalayan Environmental Research Observatory (
                  {WESTERN_HIMALAYAN_RESEARCH_OBSERVATORY_REGISTRIES_12.length} Registries)
                </p>
              </div>
              <a
                href={toKewPlatformUrl('/research-library/environmental-research-observatory')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: 'var(--hd-copper-solid)' }}
              >
                <span>Open KEW Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
