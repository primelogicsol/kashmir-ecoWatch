import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, Scale, ShieldAlert } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EnvironmentalLawAccountabilityWorkbench } from '@/components/himalayan-dispatch/EnvironmentalLawAccountabilityWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  AJK_LEGISLATION_12,
  CONSTITUTIONAL_PROVISIONS_5,
  DOCUMENTED_IMPLEMENTATION_FAILURES,
  ENFORCEMENT_VS_LEGISLATIVE_FAILURE_15,
  ENVIRONMENTAL_LAW_CHAPTERS_100,
  ENVIRONMENTAL_LAW_MONOGRAPH_SPEC,
  ENVIRONMENTAL_LAW_VOLUMES_20,
  FOUR_LEGAL_FRAMEWORKS_5_REGIONS,
  GB_GOVERNANCE_CASE_NOTES,
  GB_LEGISLATION_12,
  INTERNATIONAL_LEGAL_COMPARISON_16,
  JKL_FUNDAMENTAL_ACTS_18,
  KEW_LEGAL_OBSERVATORY_REGISTRIES_16,
  NEELUM_JHELUM_IMPLEMENTATION_CASE,
  PRIMARY_LEGAL_REPOSITORIES_14,
  PROPOSED_REFORM_PACKAGES_15,
  REGIONAL_LAND_WATER_LAWS_15,
  RETAIN_RESET_REPLACE_MATRIX_15,
  STATUTORY_AGE_TABLE_18,
  SUBORDINATE_RULES_22,
} from '@/data/himalayan-dispatch-environmental-law-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 07 — When Environmental Laws Exist but Nature Has No Defence (20 Volumes · 100 Chapters) | Himalayan Dispatch',
  description: ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist',
  imagePath: '/images/environmental-pil/ladakh-transhimalayan-sanctuary.jpg',
});

export default function Monograph07EnvironmentalLawPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.monographCode,
    name: `${ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.monographTitle}: ${ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.monographExtendedSubtitle}`,
    description: ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-07-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 07 · When Environmental Laws Exist but Nature Has No Defence' },
          ]}
        />

        {/* Monumental Monograph 07 Cover Header */}
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
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · SPECIAL LEGAL &amp; SCIENTIFIC INVESTIGATION
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.kicker}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.monographTitle}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.monographExtendedSubtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 max-w-2xl gap-6 py-5 border-y border-[#F2EFE7]/20">
            {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.heroStats.map((st) => (
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
                BYLINE: {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#A39B8B]">
                SCOPE: {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.geographicScope}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Edition Flagship Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={toKewPlatformUrl('/governance/legislation-enforcement-observatory')}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border border-[#F2EFE7]/40 text-xs font-medium tracking-[0.18em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Legal Observatory (16 Registries)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share This Monograph"
                title={`${ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.monographTitle} | Himalayan Dispatch Monograph 07`}
                description={ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Research Verification Status & Five Fundamental Questions */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            className="lg:col-span-7 p-6 sm:p-8 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">FOUNDATIONAL MANDATE · FIVE INVESTIGATIVE QUESTIONS</p>
            <h2
              className="hd-font-display text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.coreObjective}
            </h2>
            <ol className="space-y-2.5 pt-2">
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.fiveFundamentalQuestions.map((q, i) => (
                <li
                  key={i}
                  className="hd-font-body text-sm sm:text-base flex items-start gap-3"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  <span
                    className="hd-font-display font-semibold shrink-0"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    0{i + 1}.
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside
            className="lg:col-span-5 p-6 sm:p-8 border space-y-3"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">RESEARCH VERIFICATION STATUS &amp; LEGAL CAVEAT</span>
            </div>
            <p
              className="hd-font-body text-xs sm:text-sm leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.researchVerificationStatus}
            </p>
          </aside>
        </section>

        {/* Interactive Legal & TMDL Workbench */}
        <EnvironmentalLawAccountabilityWorkbench variant="editorial" />

        {/* Regional Implementation Case Studies: Neelum-Jhelum & Gilgit-Baltistan */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="p-6 sm:p-8 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PART III CASE STUDY · AZAD JAMMU &amp; KASHMIR</p>
            <h2
              className="hd-font-display text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              {NEELUM_JHELUM_IMPLEMENTATION_CASE.title}
            </h2>
            <ul className="space-y-2 text-sm hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
              {NEELUM_JHELUM_IMPLEMENTATION_CASE.documentedFindings.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>
            <div className="pt-3 border-t space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-folio-meta">SEVEN REQUIRED ECOLOGICAL-FLOW REFORM CRITERIA</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                {NEELUM_JHELUM_IMPLEMENTATION_CASE.sevenEcologicalFlowReformCriteria.map((c, idx) => (
                  <li key={idx}>
                    {idx + 1}. {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="p-6 sm:p-8 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PART IV CASE STUDY · GILGIT-BALTISTAN</p>
            <h2
              className="hd-font-display text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              2014/2015 Statutory Dual Citation, 2019 Forest Act Strengths &amp; 2026 Review
            </h2>
            <div className="space-y-2.5 text-xs sm:text-sm hd-font-body leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              <p>
                <strong>Citation Reconciliation:</strong>{' '}
                {GB_GOVERNANCE_CASE_NOTES.statutoryCitationReconciliation}
              </p>
              <p>
                <strong>Existing Statutory Strength (FAOLEX):</strong>{' '}
                {GB_GOVERNANCE_CASE_NOTES.forestAct2019Strengths}
              </p>
              <p>
                <strong>August 2026 Placer Gold Noncompliance:</strong>{' '}
                {GB_GOVERNANCE_CASE_NOTES.placerGoldMining2026Concern}
              </p>
              <p>
                <strong>2026 Legislative Review Consultancy:</strong>{' '}
                {GB_GOVERNANCE_CASE_NOTES.legislativeReviewOpportunity2026}
              </p>
            </div>
          </div>
        </section>

        {/* Complete 20-Volume, 100-Chapter Monograph Architecture */}
        <section className="space-y-8">
          <div className="border-b pb-4 flex flex-wrap items-baseline justify-between gap-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <div>
              <p className="hd-kicker">PART XII · FULL MONOGRAPH ARCHITECTURE</p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                20 Thematic Volumes &amp; 100 Proposed Legal-Scientific Chapters
              </h2>
            </div>
            <span className="hd-folio-meta">VOLUMES I–XX · CHAPTERS 01–100</span>
          </div>

          <div className="space-y-8">
            {ENVIRONMENTAL_LAW_VOLUMES_20.map((vol) => {
              const volChapters = ENVIRONMENTAL_LAW_CHAPTERS_100.filter(
                (c) => c.volumeRoman === vol.volumeRoman
              );
              return (
                <div
                  key={vol.volumeRoman}
                  className="p-6 sm:p-8 border space-y-5"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div>
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} · CHAPTERS {vol.chapterRange}
                      </span>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold mt-0.5"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {vol.investigationTitle}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.jurisdictionalAndAnalyticalScope}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    {volChapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={HD_ROUTES.monographEnvironmentalLawChapter(ch.slug)}
                        className="p-3.5 border flex flex-col justify-between gap-2 group hover:opacity-90"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1">
                          <span
                            className="hd-folio-meta block"
                            style={{ color: 'var(--hd-copper)' }}
                          >
                            CHAPTER {ch.number}
                          </span>
                          <h4
                            className="hd-font-display text-base font-semibold leading-snug group-hover:underline"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.title}
                          </h4>
                        </div>
                        <span className="hd-folio-meta text-[10px]">
                          Open Protocol →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 14 Primary Legal Repositories */}
        <section className="space-y-6">
          <div className="border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">OFFICIAL PRIMARY LEGAL &amp; AUDIT REPOSITORIES (14)</p>
            <h2
              className="hd-font-display text-2xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Authenticated Statutory, Judicial &amp; Audit Sources
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRIMARY_LEGAL_REPOSITORIES_14.map((rep) => (
              <a
                key={rep.domainLabel}
                href={rep.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border flex items-start justify-between gap-3 hover:opacity-85"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-1">
                  <div
                    className="hd-font-display text-lg font-semibold leading-snug"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {rep.repository}
                  </div>
                  <div className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                    {rep.domainLabel}
                  </div>
                  <div className="text-xs hd-font-body" style={{ color: 'var(--hd-fg-muted)' }}>
                    {rep.jurisdictionScope}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 mt-1 opacity-60" />
              </a>
            ))}
          </div>
        </section>

        {/* Defining Editorial Statement */}
        <section
          className="p-8 sm:p-12 border-t-2 border-b-2 space-y-4"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">THE DEFINING EDITORIAL STATEMENT</p>
          <div className="space-y-2.5 max-w-4xl">
            {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.definingEditorialStatement.map((line, i) => (
              <p
                key={i}
                className="hd-font-body text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {line}
              </p>
            ))}
          </div>
          <p
            className="hd-font-display text-2xl sm:text-4xl italic font-semibold pt-3"
            style={{ color: 'var(--hd-fg)' }}
          >
            “{ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.ultimatePurposeAxiom}”
          </p>
        </section>
      </div>
    </div>
  );
}
