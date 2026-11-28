import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { AvianMigrationRefugiaWorkbench } from '@/components/himalayan-dispatch/AvianMigrationRefugiaWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import {
  HD_ROUTES,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import {
  AVIAN_THREAT_PROTOCOLS_15,
  CONTEMPORARY_ORNITHOLOGY_SHIFTS_12,
  FIVE_REGION_INVESTIGATION_MATRIX_5,
  getSkyMonographChaptersByVolume,
  KEW_AVIAN_INTELLIGENCE_OBSERVATORY_12,
  KEW_AVIFAUNA_SELF_AUDIT_LEDGER,
  ORDINARY_BIRDS_SENTINELS_12,
  ORDINARY_BIRDS_SHIFTING_BASELINE_NOTE,
  REGIONAL_CHECKLIST_METHODOLOGICAL_WARNING,
  REGIONAL_CHECKLIST_RECONCILIATION_7,
  SKY_NO_BORDERS_FOUNDATIONAL_REFERENCES,
  SKY_NO_BORDERS_MONOGRAPH_SPEC,
  SKY_NO_BORDERS_VOLUMES_18,
  STAKEHOLDER_KNOWLEDGE_TRANSFER_11,
  TRANS_REGIONAL_FLAGSHIP_BIRDS_8,
  WATERBIRD_CENSUS_PARADOX_SPEC,
} from '@/data/himalayan-dispatch-sky-has-no-borders-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'The Sky Has No Borders — 18-Volume Western Himalayan Ornithological Monograph | Himalayan Dispatch',
  description: SKY_NO_BORDERS_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-04-the-sky-has-no-borders',
  imagePath: '/images/biodiversity/biodiversity-birds-wetland.jpg',
});

export default function MonographSkyHasNoBordersPage() {
  const canonicalPath = '/himalayan-dispatch/issues/monograph-04-the-sky-has-no-borders';

  // Permanent Editorial Presentation Standard: never display numerical word counts publicly
  const publicMasterSpecs = SKY_NO_BORDERS_MONOGRAPH_SPEC.masterSpecifications.filter(
    (row) => !/manuscript\s*length|word\s*count|\bwords\b/i.test(`${row.component} ${row.target}`)
  );

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: SKY_NO_BORDERS_MONOGRAPH_SPEC.monographCode,
    name: `${SKY_NO_BORDERS_MONOGRAPH_SPEC.title}: ${SKY_NO_BORDERS_MONOGRAPH_SPEC.subtitle}`,
    description: SKY_NO_BORDERS_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: SKY_NO_BORDERS_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-sky-no-borders-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Ornithological Monograph · The Sky Has No Borders' },
          ]}
        />

        {/* Monumental Monograph Cover Identity */}
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
              {SKY_NO_BORDERS_MONOGRAPH_SPEC.kicker}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH {SKY_NO_BORDERS_MONOGRAPH_SPEC.companionDispatchNumber}
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="inline-block px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
              {SKY_NO_BORDERS_MONOGRAPH_SPEC.statusBadge}
            </div>

            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {SKY_NO_BORDERS_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-4xl italic text-[#D8C3A5] leading-snug">
              {SKY_NO_BORDERS_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {SKY_NO_BORDERS_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
          </div>

          {/* 18 Volumes / 54 Chapters / 5 Regions / ~30 Nations */}
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-4xl gap-6 py-6 border-y border-[#F2EFE7]/20">
            {SKY_NO_BORDERS_MONOGRAPH_SPEC.heroStats.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {m.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-2 text-xs sm:text-sm text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                BY {SKY_NO_BORDERS_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {SKY_NO_BORDERS_MONOGRAPH_SPEC.geographicScope}
              </p>
              <p className="hd-folio-meta text-[#A39B8B]">
                EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; 32 MIN READ
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  SKY_NO_BORDERS_MONOGRAPH_SPEC.companionDispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 06 Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl(SKY_NO_BORDERS_MONOGRAPH_SPEC.kewObservatoryPath)}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 border border-[#D8C3A5]/45 text-xs font-semibold tracking-[0.16em] uppercase text-[#D8C3A5]"
              >
                <span>KEW Avian Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share This Monograph"
                title={`${SKY_NO_BORDERS_MONOGRAPH_SPEC.title}: ${SKY_NO_BORDERS_MONOGRAPH_SPEC.subtitle} | Himalayan Dispatch`}
                description={SKY_NO_BORDERS_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Evidentiary & Ongoing Census Reconciliation Disclosure */}
        <section
          className="p-6 sm:p-8 border-l-4 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">
            EVIDENTIARY BOUNDARY · PROPOSED RESEARCH FOUNDATION &amp; ONGOING RECONCILIATION
          </p>
          <p
            className="hd-font-body text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {SKY_NO_BORDERS_MONOGRAPH_SPEC.evidentiaryDisclaimer}
          </p>
        </section>

        {/* Three-Tier Publication Hierarchy */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SKY_NO_BORDERS_MONOGRAPH_SPEC.publicationHierarchy.map((tier) => (
            <div
              key={tier.level}
              className="p-6 border flex flex-col justify-between space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="space-y-2">
                <p className="hd-kicker">{tier.level}</p>
                <h2
                  className="hd-font-display text-2xl font-semibold leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {tier.title}
                </h2>
                <p
                  className="hd-font-body text-sm leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {tier.detail}
                </p>
              </div>
              {tier.href.startsWith('/biodiversity') ? (
                <a
                  href={toKewPlatformUrl(tier.href)}
                  className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href={tier.href}
                  className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}
        </section>

        {/* Defining Editorial Synthesis */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 space-y-4">
            <p className="hd-kicker">FOUNDATIONAL PREMISE</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              Living Sentinels of One Ecological Mountain System
            </h2>
            <blockquote
              className="pt-4 border-t hd-font-display text-xl sm:text-2xl italic leading-snug"
              style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-copper)' }}
            >
              “{SKY_NO_BORDERS_MONOGRAPH_SPEC.closingQuestion}”
            </blockquote>
          </div>
          <div className="lg:col-span-8 hd-prose">
            {SKY_NO_BORDERS_MONOGRAPH_SPEC.definingEditorialMessage.map((para, idx) => (
              <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Section 1: Five-Region Checklist Reconciliation */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <p className="hd-kicker">SECTION 01 · TRANSBOUNDARY SPECIES BASELINES</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              How Many Bird Species Cross the Western Himalayas?
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-4xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {REGIONAL_CHECKLIST_METHODOLOGICAL_WARNING}
            </p>
          </div>

          <div
            className="border overflow-x-auto"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <th className="py-3.5 px-5 hd-folio-meta">Region / Registry</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Reported Count</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Primary Source / Authority</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Taxonomic Backbone &amp; Scope</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Reconciliation Note</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {REGIONAL_CHECKLIST_RECONCILIATION_7.map((row) => (
                  <tr key={row.id}>
                    <td
                      className="py-3.5 px-5 hd-font-body text-sm font-semibold align-top whitespace-nowrap"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {row.regionOrPlatform}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-display text-xl font-semibold align-top whitespace-nowrap"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {row.reportedCount}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-sm align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {row.primarySourceOrAuthority}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-xs align-top"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {row.taxonomicBackboneAndScope}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-xs sm:text-sm leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {row.reconciliationNotes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Self-Audit of KEW's 601-Taxa Registry */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <p className="hd-kicker">SECTION 02 · INTERNAL PLATFORM SCRUTINY</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Auditing Kashmir EcoWatch&apos;s Own {KEW_AVIFAUNA_SELF_AUDIT_LEDGER.currentTotals.cataloguedTaxa}-Taxa Registry
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-4xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {KEW_AVIFAUNA_SELF_AUDIT_LEDGER.currentTotals.overlapNote}
            </p>
          </div>

          <div
            className="border overflow-x-auto"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <th className="py-3.5 px-5 hd-folio-meta">Platform Metric</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Reported Value</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Identified Discrepancy</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Required Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {KEW_AVIFAUNA_SELF_AUDIT_LEDGER.auditRows.map((row) => (
                  <tr key={row.id}>
                    <td
                      className="py-3.5 px-5 hd-font-body text-sm font-semibold align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {row.metric}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-display text-lg font-semibold align-top whitespace-nowrap"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {row.currentReportedValue}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-xs sm:text-sm leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {row.identifiedDiscrepancy}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-xs sm:text-sm leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {row.requiredAction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Eight Trans-Regional Flagship & Indicator Species */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <p className="hd-kicker">SECTION 03 · LIVING TRANSBOUNDARY BRIDGES</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Eight Flagship &amp; Indicator Species Connecting the Five Regions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRANS_REGIONAL_FLAGSHIP_BIRDS_8.map((bird) => (
              <article
                key={bird.id}
                className="p-6 border space-y-3"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div>
                    <h3
                      className="hd-font-display text-2xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {bird.commonName}
                    </h3>
                    <p className="hd-font-display text-base italic" style={{ color: 'var(--hd-copper)' }}>
                      {bird.scientificName} &nbsp;·&nbsp; {bird.elevationalBandMeters}
                    </p>
                  </div>
                  <span className="hd-folio-meta">{bird.iucnGlobalStatus}</span>
                </div>

                <p className="hd-folio-meta">
                  {bird.ecologicalGuild} &nbsp;·&nbsp; {bird.regionsConnected.join(' · ')}
                </p>

                <p
                  className="hd-font-body text-sm leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {bird.indicatorRole}
                </p>

                <div className="pt-2 space-y-1 text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                  <p className="hd-font-body">
                    <strong style={{ color: 'var(--hd-fg)' }}>Primary Pressures:</strong>{' '}
                    {bird.primaryThreats.join('; ')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 5 & 6: Waterbird Census Paradox + Interactive Simulator + 8-Row Matrix */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="hd-kicker">SECTION 04 &amp; 05 · CENSUS INTERPRETATION &amp; REFUGIA COMPRESSION</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              1.34 Million Waterbirds: Recovery, Effort Expansion, or Habitat Crowding?
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-4xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Reported Kashmir winter waterbird census counts rose from{' '}
              <strong>{WATERBIRD_CENSUS_PARADOX_SPEC.count2020.toLocaleString('en-US')}</strong> in 2020 to{' '}
              <strong>{WATERBIRD_CENSUS_PARADOX_SPEC.count2025.toLocaleString('en-US')}</strong> in 2025 (+
              {WATERBIRD_CENSUS_PARADOX_SPEC.reportedIncreasePercent}), yet{' '}
              {WATERBIRD_CENSUS_PARADOX_SPEC.topFourSource} indicates that{' '}
              <strong>{WATERBIRD_CENSUS_PARADOX_SPEC.topFourWetlandsConcentrationPercent}</strong> of counted
              birds were crowded into just four primary wetlands. Meanwhile, the February 12, 2026 Asian
              Waterbird Census covered {WATERBIRD_CENSUS_PARADOX_SPEC.awcFeb2026Scope}, with raw species-by-site
              tables still awaiting public verification.
            </p>
          </div>

          <AvianMigrationRefugiaWorkbench />

          <div
            className="border overflow-x-auto"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <th className="py-3.5 px-5 hd-folio-meta">Observed Phenomenon</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Naive Headline Reading</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Competing Ecological Hypotheses</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Required Empirical Test</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {WATERBIRD_CENSUS_PARADOX_SPEC.alternativeExplanations8.map((row) => (
                  <tr key={row.code}>
                    <td
                      className="py-3.5 px-5 hd-font-body text-sm font-semibold align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {row.observedPhenomenon}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-xs sm:text-sm align-top"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {row.naiveInterpretation}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-xs sm:text-sm leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {row.competingEcologicalHypotheses}
                    </td>
                    <td
                      className="py-3.5 px-5 hd-font-body text-xs sm:text-sm leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {row.empiricalTestRequired}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: Five-Region Research Matrix */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <p className="hd-kicker">SECTION 06 · REGIONAL INVESTIGATION PRIORITIES</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Five Regions, Five Interconnected Avian Landscapes
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {FIVE_REGION_INVESTIGATION_MATRIX_5.map((reg) => (
              <div
                key={reg.id}
                className="p-5 border space-y-3"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker">{reg.referenceChecklistRange}</p>
                <h3
                  className="hd-font-display text-2xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {reg.region}
                </h3>
                <p className="hd-folio-meta">{reg.bioclimaticSpan}</p>
                <ul className="space-y-1.5 pt-1">
                  {reg.researchPriorities.map((pr, idx) => (
                    <li
                      key={idx}
                      className="hd-font-body text-xs leading-relaxed flex items-start gap-2"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      <span style={{ color: 'var(--hd-copper)' }}>•</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="pt-2 border-t hd-font-body text-xs italic leading-relaxed"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                >
                  {reg.localizedCaseNote}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Fifteen Field-Measurable Threat Protocols */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <p className="hd-kicker">SECTION 07 · ANTHROPOGENIC STRESSOR PROTOCOLS</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Fifteen Quantifiable Threats Reshaping Avian Habitats
            </h2>
          </div>

          <div
            className="border overflow-x-auto"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <th className="py-3 px-4 hd-folio-meta">Threat</th>
                  <th className="py-3 px-4 hd-folio-meta">Affected Guilds</th>
                  <th className="py-3 px-4 hd-folio-meta">Scientific Investigation</th>
                  <th className="py-3 px-4 hd-folio-meta">Field-Measurable Metric</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {AVIAN_THREAT_PROTOCOLS_15.map((th) => (
                  <tr key={th.code}>
                    <td
                      className="py-3 px-4 hd-font-body text-sm font-semibold align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {th.code} · {th.threat}
                    </td>
                    <td
                      className="py-3 px-4 hd-font-body text-xs align-top"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {th.affectedGuilds}
                    </td>
                    <td
                      className="py-3 px-4 hd-font-body text-xs sm:text-sm leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {th.scientificInvestigation}
                    </td>
                    <td
                      className="py-3 px-4 hd-font-body text-xs sm:text-sm leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {th.measurableFieldMetric}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 9: Disappearance of Ordinary Birds & Shifting Baseline Syndrome */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <p className="hd-kicker">SECTION 08 · COURTYARD, ORCHARD &amp; STREAM SENTINELS</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Twelve Everyday Bird Groups &amp; Shifting Baseline Syndrome
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-4xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {ORDINARY_BIRDS_SHIFTING_BASELINE_NOTE}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ORDINARY_BIRDS_SENTINELS_12.map((item) => (
              <div
                key={item.code}
                className="p-5 border space-y-2"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    className="hd-font-display text-xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {item.group}
                  </h3>
                  <span className="hd-folio-meta">{item.code}</span>
                </div>
                <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-copper)' }}>
                  {item.representativeTaxa}
                </p>
                <p
                  className="hd-font-body text-xs leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {item.hypothesizedDriversOfChange}
                </p>
                <p className="hd-folio-meta pt-1">Method: {item.standardizedMonitoringMethod}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 10 & 11: Contemporary Ornithology Shifts + 11 Stakeholder Guides */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p className="hd-kicker">SECTION 09 · METHODOLOGICAL MODERNIZATION</p>
            <h2
              className="hd-font-display text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Twelve Transitions in Contemporary Himalayan Ornithology
            </h2>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {CONTEMPORARY_ORNITHOLOGY_SHIFTS_12.map((sh) => (
                <div key={sh.number} className="p-4 space-y-1">
                  <p className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {String(sh.number).padStart(2, '0')} · {sh.domain}
                  </p>
                  <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong>Contemporary Protocol:</strong> {sh.contemporaryQuantitativeMethod} —{' '}
                    {sh.westernHimalayanApplication}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="hd-kicker">SECTION 10 · PUBLIC STEWARDSHIP TRANSLATION</p>
            <h2
              className="hd-font-display text-2xl sm:text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Actionable Ornithology for Eleven Everyday Stakeholder Groups
            </h2>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {STAKEHOLDER_KNOWLEDGE_TRANSFER_11.map((st) => (
                <div key={st.code} className="p-4 space-y-1">
                  <p className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {st.code} · {st.stakeholderGroup}
                  </p>
                  <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {st.actionableStewardshipProtocol}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 12: Complete 18-Volume, 54-Chapter Monograph Architecture */}
        <section id="volumes-ledger" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <div className="space-y-1.5">
              <p className="hd-kicker">SECTION 11 · COMPLETE MONOGRAPH ARCHITECTURE</p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                18 Thematic Volumes &amp; 54 Proposed Chapter Protocols
              </h2>
            </div>
            <a
              href={`${SKY_NO_BORDERS_MONOGRAPH_SPEC.datasetApiPath}?format=csv`}
              className="hd-kicker inline-flex items-center gap-1.5 underline"
            >
              <span>Download Complete 54-Chapter Framework (CSV)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SKY_NO_BORDERS_VOLUMES_18.map((vol) => {
              const volChapters = getSkyMonographChaptersByVolume(vol.volumeRoman);
              return (
                <div
                  key={vol.slug}
                  className="p-6 border space-y-4"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="space-y-1 border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                    <p className="hd-kicker">
                      VOLUME {vol.volumeRoman} &nbsp;·&nbsp; {vol.chapterRange}
                    </p>
                    <h3
                      className="hd-font-display text-2xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {vol.volumeTitle}
                    </h3>
                    <p
                      className="hd-font-body text-xs sm:text-sm leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {vol.thematicMandate}
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {volChapters.map((ch) => (
                      <li key={ch.slug}>
                        <Link
                          href={HD_ROUTES.monograph04Chapter(ch.slug)}
                          className="group flex items-baseline justify-between gap-3 py-1"
                        >
                          <span
                            className="hd-font-body text-sm font-medium group-hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            <strong style={{ color: 'var(--hd-copper)' }}>
                              Ch. {ch.code}
                            </strong>{' '}
                            — {ch.title}
                          </span>
                          <ArrowRight
                            className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
                            style={{ color: 'var(--hd-copper)' }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 13: Permanent KEW Avian Intelligence Observatory Modules */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="hd-kicker">SECTION 12 · PERMANENT KEW INFRASTRUCTURE</p>
              <h2
                className="hd-font-display text-3xl sm:text-4xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                Western Himalayan Avian Intelligence Observatory (12 Modules)
              </h2>
            </div>
            <a
              href={toKewPlatformUrl(SKY_NO_BORDERS_MONOGRAPH_SPEC.kewObservatoryPath)}
              className="hd-kicker inline-flex items-center gap-1.5 underline"
            >
              <span>Open Live KEW Avian Observatory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {KEW_AVIAN_INTELLIGENCE_OBSERVATORY_12.map((mod) => (
              <div
                key={mod.code}
                className="p-5 border space-y-2.5"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="hd-kicker">{mod.code}</span>
                  <span className="hd-folio-meta">{mod.currentStatus}</span>
                </div>
                <h3
                  className="hd-font-display text-xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {mod.title}
                </h3>
                <p
                  className="hd-font-body text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {mod.operationalFunction}
                </p>
                <p className="hd-folio-meta">Standard: {mod.dataStandard}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Master Specification & Foundational References */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className="lg:col-span-5 border p-6 space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">MONOGRAPH SPECIFICATION LEDGER</p>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {publicMasterSpecs.map((row) => (
                <div key={row.component} className="py-2.5 space-y-0.5">
                  <p className="hd-folio-meta">{row.component}</p>
                  <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg)' }}>
                    {row.target}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="lg:col-span-7 border p-6 space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PRIMARY CHECKLISTS &amp; FOUNDATIONAL SCIENTIFIC SOURCES</p>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {SKY_NO_BORDERS_FOUNDATIONAL_REFERENCES.map((ref) => (
                <div key={ref.code} className="py-3 space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <a
                      href={ref.url.startsWith('/') ? toKewPlatformUrl(ref.url) : ref.url}
                      target={ref.url.startsWith('/') ? undefined : '_blank'}
                      rel={ref.url.startsWith('/') ? undefined : 'noopener noreferrer'}
                      className="hd-font-body text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1.5"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      <span>{ref.title}</span>
                      {ref.url.startsWith('/') ? (
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                      ) : (
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      )}
                    </a>
                    <span className="hd-folio-meta">{ref.yearOrPeriod}</span>
                  </div>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong>{ref.authorityOrJournal}:</strong> {ref.evidentiaryRole}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
