import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { SalimAliParkForensicWorkbench } from '@/components/himalayan-dispatch/SalimAliParkForensicWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import {
  HD_ROUTES,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import {
  BIOLOGICAL_GROUPS_9,
  CONSERVATION_TEST_AND_RECOVERY_SPEC,
  DOCUMENTED_CHRONOLOGY_17,
  ECOLOGICAL_COMPARISON_9,
  ENVIRONMENTAL_RESISTANCE_8,
  GEOSPATIAL_RECONSTRUCTION_SPEC,
  getSalimAliChaptersByVolume,
  HISTORICAL_ESTABLISHMENT_RECONCILIATION_6,
  HYDROLOGICAL_AND_ECONOMIC_MATRICES,
  IDENTIFIED_PRIMARY_SOURCES_7,
  KEW_PROTECTED_AREA_INTEGRITY_OBSERVATORY_12,
  LEGAL_ARCHITECTURE_MATRICES,
  NBWL_DOCUMENTARY_TIMELINE_4,
  NBWL_OCT_2005_RECOMMENDATION_STATS,
  PRIORITY_ORIGINAL_DOCUMENTS_20,
  PROFESSIONAL_INTROSPECTION_8,
  SALIM_ALI_AREA_MATHEMATICS,
  SALIM_ALI_MONOGRAPH_SPEC,
  SALIM_ALI_VOLUMES_10,
  WESTERN_HIMALAYAN_PADDD_SPEC,
} from '@/data/himalayan-dispatch-salim-ali-park-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 09 — The National Park That Became a Golf Course (10 Volumes · 75 Chapters) | Himalayan Dispatch',
  description: SALIM_ALI_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath:
    '/himalayan-dispatch/issues/monograph-09-the-national-park-that-became-a-golf-course',
  imagePath: '/images/protected-network/protected-conservation-reserves-shikargah.jpg',
});

export default function Monograph09SalimAliParkPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-09-the-national-park-that-became-a-golf-course';

  // Permanent Editorial Presentation Standard: exclude numerical word counts from public display
  const publicMasterSpecs = SALIM_ALI_MONOGRAPH_SPEC.masterSpecifications.filter(
    (row) =>
      !/manuscript\s*length|word\s*count|\bwords\b/i.test(
        `${row.component} ${row.proposedScope} ${row.target}`
      )
  );

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: SALIM_ALI_MONOGRAPH_SPEC.monographCode,
    name: `${SALIM_ALI_MONOGRAPH_SPEC.title}: ${SALIM_ALI_MONOGRAPH_SPEC.subtitle}`,
    description: SALIM_ALI_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: SALIM_ALI_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-09-salim-ali-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 09 · The National Park That Became a Golf Course' },
          ]}
        />

        {/* Monumental Monograph 09 Cover Identity */}
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
              {SALIM_ALI_MONOGRAPH_SPEC.kicker}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH {SALIM_ALI_MONOGRAPH_SPEC.companionDispatchNumber}
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="inline-block px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
              {SALIM_ALI_MONOGRAPH_SPEC.statusBadge}
            </div>

            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {SALIM_ALI_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-4xl italic text-[#D8C3A5] leading-snug">
              {SALIM_ALI_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {SALIM_ALI_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
          </div>

          {/* 10 Volumes / 75 Chapters / 885-907 ha / 723 ha */}
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-4xl gap-6 py-6 border-y border-[#F2EFE7]/20">
            {SALIM_ALI_MONOGRAPH_SPEC.heroStats.map((m) => (
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
                BY {SALIM_ALI_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {SALIM_ALI_MONOGRAPH_SPEC.geographicScope} &nbsp;·&nbsp;{' '}
                {SALIM_ALI_MONOGRAPH_SPEC.investigationPeriod}
              </p>
              <p className="hd-folio-meta text-[#A39B8B]">
                EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; 34 MIN READ
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  SALIM_ALI_MONOGRAPH_SPEC.companionDispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch {SALIM_ALI_MONOGRAPH_SPEC.companionDispatchNumber}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl(SALIM_ALI_MONOGRAPH_SPEC.kewObservatoryPath)}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 border border-[#D8C3A5]/45 text-xs font-semibold tracking-[0.16em] uppercase text-[#D8C3A5]"
              >
                <span>KEW Integrity Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Monograph 09"
                title={`${SALIM_ALI_MONOGRAPH_SPEC.title}: ${SALIM_ALI_MONOGRAPH_SPEC.subtitle} | Himalayan Dispatch`}
                description={SALIM_ALI_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Research Limitations & Institutional Right of Response */}
        <section
          className="p-6 sm:p-8 border-l-4 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">
            RESEARCH LIMITATIONS, EVIDENTIARY BOUNDARIES &amp; INSTITUTIONAL RIGHT OF RESPONSE
          </p>
          <p
            className="hd-font-body text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {SALIM_ALI_MONOGRAPH_SPEC.researchLimitationsDisclosure}
          </p>
        </section>

        {/* Three-Tier Publication Hierarchy */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SALIM_ALI_MONOGRAPH_SPEC.publicationHierarchy.map((tier) => (
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
              {tier.href.startsWith('/protected-network') ? (
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

        {/* Editorial Premise */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4 space-y-4">
            <p className="hd-kicker">THE EDITORIAL PREMISE</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              When Protected Land Becomes Available for Recreation
            </h2>
            <blockquote
              className="pt-4 border-t hd-font-display text-xl sm:text-2xl italic leading-snug"
              style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-copper)' }}
            >
              “{SALIM_ALI_MONOGRAPH_SPEC.centralQuestion}”
            </blockquote>
          </div>
          <div className="lg:col-span-8 hd-prose">
            {SALIM_ALI_MONOGRAPH_SPEC.editorialPremise.map((para, idx) => (
              <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Part I: Six-Source Establishment Reconciliation & 1986–2026 Chronology */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <p className="hd-kicker">PART I · THE HISTORICAL RECORD</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Six Conflicting Establishment &amp; Area Records — Plus the 1986–2026 Chronology
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
                  <th className="py-3.5 px-5 hd-folio-meta">Source</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Establishment Year</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Reported Area</th>
                  <th className="py-3.5 px-5 hd-folio-meta">Reconciliation Note</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {HISTORICAL_ESTABLISHMENT_RECONCILIATION_6.map((row) => (
                  <tr key={row.id}>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {row.source}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm whitespace-nowrap" style={{ color: 'var(--hd-copper)' }}>
                      {row.establishmentYear}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--hd-fg)' }}>
                      {row.reportedArea}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {row.reconciliationNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <th className="py-3 px-5 hd-folio-meta">Year / Date</th>
                  <th className="py-3 px-5 hd-folio-meta">Documented Event</th>
                  <th className="py-3 px-5 hd-folio-meta">Investigative Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {DOCUMENTED_CHRONOLOGY_17.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold whitespace-nowrap align-top" style={{ color: 'var(--hd-copper)' }}>
                      {item.yearOrDate}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm font-medium align-top" style={{ color: 'var(--hd-fg)' }}>
                      {item.event}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-xs sm:text-sm align-top" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {item.investigativeNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Part II, III & VI: Interactive Workbench + NBWL 2003–2005 Proceedings */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="hd-kicker">PARTS II, III &amp; VI · QUANTITATIVE &amp; DOCUMENTARY CORE</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              NBWL Post-Construction Objections (2003–2005) &amp; Parametric Scenario Calculators
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-4xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {SALIM_ALI_AREA_MATHEMATICS.evidentiaryCaveat}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NBWL_DOCUMENTARY_TIMELINE_4.map((m) => (
              <div
                key={m.id}
                className="p-6 border space-y-2.5"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="hd-kicker">{m.meetingDate}</span>
                  <span className="hd-folio-meta">{m.authority}</span>
                </div>
                <p className="hd-font-body text-sm font-semibold leading-snug" style={{ color: 'var(--hd-fg)' }}>
                  {m.keyDeliberation}
                </p>
                <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {m.unresolvedIssuesRecorded}
                </p>
              </div>
            ))}
          </div>

          <div
            className="p-6 border space-y-2"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">
              OCTOBER 4, 2005 STANDING COMMITTEE RECORD · {NBWL_OCT_2005_RECOMMENDATION_STATS.accepted.count} ACCEPTED (
              {NBWL_OCT_2005_RECOMMENDATION_STATS.accepted.percentage}%) ·{' '}
              {NBWL_OCT_2005_RECOMMENDATION_STATS.deferred.count} DEFERRED (
              {NBWL_OCT_2005_RECOMMENDATION_STATS.deferred.percentage}%) ·{' '}
              {NBWL_OCT_2005_RECOMMENDATION_STATS.notApproved.count} NOT APPROVED (
              {NBWL_OCT_2005_RECOMMENDATION_STATS.notApproved.percentage}%)
            </p>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg)' }}>
              {NBWL_OCT_2005_RECOMMENDATION_STATS.supremeCourtSubmissionDecision}
            </p>
          </div>

          <SalimAliParkForensicWorkbench />
        </section>

        {/* Part IV & V: Legal Architecture & Natural Woodland vs. Golf Turf */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="hd-kicker">PART IV · SECTION 35 &amp; PIL NO. 115/99</p>
            <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Eight Statutory Questions Requiring Primary Proof
            </h2>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {LEGAL_ARCHITECTURE_MATRICES.eightStatutoryQuestions.map((q) => (
                <div key={q.id} className="p-4 space-y-1">
                  <p className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {q.legalQuestion}
                  </p>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong>Evidence required:</strong> {q.evidenceRequired} — {q.statutoryProvisionContext}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="hd-kicker">PART V · GREEN LAND VS. ECOLOGICAL LAND</p>
            <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Natural Protected Habitat vs. Managed Golf Turf
            </h2>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {ECOLOGICAL_COMPARISON_9.map((ec) => (
                <div key={ec.id} className="p-4 space-y-1">
                  <p className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {ec.ecologicalCharacteristic}
                  </p>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong>Protected Habitat:</strong> {ec.naturalProtectedHabitat} &nbsp;|&nbsp;{' '}
                    <strong>Managed Turf:</strong> {ec.intensivelyManagedGolfLandscape}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Part VII, VIII, IX, X & XI Summary Grids */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="p-6 border space-y-3"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PART VII · 25-YEAR FINANCIAL BALANCE</p>
            <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              {HYDROLOGICAL_AND_ECONOMIC_MATRICES.netPublicContributionFormula}
            </h3>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Reconstructs {HYDROLOGICAL_AND_ECONOMIC_MATRICES.financialDossier14.length} expenditure and
              revenue categories (1998–2026), weighing legitimate tourism and employment benefits
              alongside ecological opportunity costs and the March 2023 PPP proposal.
            </p>
          </div>

          <div
            className="p-6 border space-y-3"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PART VIII · FORENSIC GEOSPATIAL SERIES</p>
            <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              9 Observation Windows (1960–2026) &amp; 7 Map Layers
            </h3>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {GEOSPATIAL_RECONSTRUCTION_SPEC.guidingMaxim}
            </p>
          </div>

          <div
            className="p-6 border space-y-3"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PART IX &amp; XI · RESISTANCE &amp; RECOVERY</p>
            <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              {ENVIRONMENTAL_RESISTANCE_8.length} Documented Interventions ·{' '}
              {CONSERVATION_TEST_AND_RECOVERY_SPEC.recoveryScenarios4.length} Recovery Scenarios
            </h3>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Documents WPSI, Vikram Jit Singh, Kalpavriksh, Mir Inayet Ullah, Dr. M. K. Ranjitsinh,
              Aseem Srivastav, IBWL, and NBWL alongside Kashmir&apos;s {PROFESSIONAL_INTROSPECTION_8.length}{' '}
              professional communities, {BIOLOGICAL_GROUPS_9.length} biological guilds, and Scenarios A–D.
            </p>
          </div>
        </section>

        {/* Part XII: Five-Region PADDD Audit & 12-Point Integrity Protocol */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">PART XII · PREVENTIVE FIVE-REGION PADDD AUDIT</p>
            <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Western Himalayan Protected Area Network
            </h2>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
              {WESTERN_HIMALAYAN_PADDD_SPEC.preventiveVerificationDisclaimer}
            </p>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {WESTERN_HIMALAYAN_PADDD_SPEC.fiveRegionAudit5.map((r) => (
                <div key={r.region} className="p-4 space-y-1">
                  <p className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {r.region}
                  </p>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {r.protectedLandscapesToExamine}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">PROPOSED GOVERNANCE STANDARD</p>
            <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Western Himalayan Protected Area Integrity Protocol (12 Requirements)
            </h2>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {WESTERN_HIMALAYAN_PADDD_SPEC.integrityProtocol12.map((item) => (
                <div
                  key={item.code}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <span className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {item.code} · {item.requirement}
                  </span>
                  <span className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {item.intendedProtection}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Part XIV: Complete 10-Volume, 75-Chapter Monograph Architecture */}
        <section id="volumes-ledger" className="space-y-8">
          <div
            className="flex flex-wrap items-end justify-between gap-4 border-b pb-4"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <div className="space-y-1.5">
              <p className="hd-kicker">PART XIV · COMPLETE MONOGRAPH ARCHITECTURE</p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                10 Thematic Volumes &amp; 75 Investigative Chapters
              </h2>
            </div>
            <a
              href={`${SALIM_ALI_MONOGRAPH_SPEC.datasetApiPath}?format=csv`}
              className="hd-kicker inline-flex items-center gap-1.5 underline"
            >
              <span>Download Complete 75-Chapter &amp; Document Framework (CSV)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SALIM_ALI_VOLUMES_10.map((vol) => {
              const volChapters = getSalimAliChaptersByVolume(vol.volumeRoman);
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

                  <ul className="space-y-2">
                    {volChapters.map((ch) => (
                      <li key={ch.slug}>
                        <Link
                          href={HD_ROUTES.monograph09Chapter(ch.slug)}
                          className="group flex items-baseline justify-between gap-3 py-1"
                        >
                          <span
                            className="hd-font-body text-sm font-medium group-hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            <strong style={{ color: 'var(--hd-copper)' }}>Ch. {ch.code}</strong> —{' '}
                            {ch.title}
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

        {/* Part XV: 20 Priority Original Documents + 7 Primary Documentary Sources + 12 KEW Observatory Modules */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <p className="hd-kicker">PART XV · ARCHIVAL RETRIEVAL DOCKET</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Twenty Original Documents We Must Secure
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
                  <th className="py-3 px-4 hd-folio-meta">Priority</th>
                  <th className="py-3 px-4 hd-folio-meta">Original Document</th>
                  <th className="py-3 px-4 hd-folio-meta">Custodian / Archive</th>
                  <th className="py-3 px-4 hd-folio-meta">Investigative Role</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {PRIORITY_ORIGINAL_DOCUMENTS_20.map((doc) => (
                  <tr key={doc.priority}>
                    <td className="py-2.5 px-4 hd-font-display text-lg font-semibold" style={{ color: 'var(--hd-copper)' }}>
                      {doc.priority}
                    </td>
                    <td className="py-2.5 px-4 hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {doc.document}
                    </td>
                    <td className="py-2.5 px-4 hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                      {doc.custodianOrArchiveTarget}
                    </td>
                    <td className="py-2.5 px-4 hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {doc.investigativeRole}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Part XIII: 12 KEW Observatory Modules + Specs + Primary Sources */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className="lg:col-span-5 border p-6 space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">MONOGRAPH 09 SPECIFICATION &amp; KEW MODULES ({KEW_PROTECTED_AREA_INTEGRITY_OBSERVATORY_12.length})</p>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {publicMasterSpecs.map((row) => (
                <div key={row.component} className="py-2.5 space-y-0.5">
                  <p className="hd-folio-meta">{row.component}</p>
                  <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg)' }}>
                    {row.proposedScope}
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
            <p className="hd-kicker">PRIMARY DOCUMENTARY SOURCES ALREADY IDENTIFIED</p>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {IDENTIFIED_PRIMARY_SOURCES_7.map((src) => (
                <div key={src.code} className="py-3 space-y-1">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hd-font-body text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1.5"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    <span>{src.document} ({src.accessLabel})</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {src.evidentiaryNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Epilogue Monument */}
        <section
          className="p-8 sm:p-12 border-t-2 border-b-2 text-center space-y-4"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">EPILOGUE · WHAT DOES PROTECTED REALLY MEAN?</p>
          <blockquote
            className="hd-font-display text-2xl sm:text-4xl italic font-semibold max-w-4xl mx-auto leading-snug"
            style={{ color: 'var(--hd-fg)' }}
          >
            “{SALIM_ALI_MONOGRAPH_SPEC.closingEpilogueQuestion}”
          </blockquote>
        </section>
      </div>
    </div>
  );
}
