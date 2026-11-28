import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { DalLakeEncroachmentWorkbench } from '@/components/himalayan-dispatch/DalLakeEncroachmentWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import {
  HD_ROUTES,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import {
  ACB_AND_JUDICIAL_ACCOUNTABILITY_SPEC,
  ART_OF_ENCROACHMENT_MONOGRAPH_SPEC,
  CAG_LAND_USE_BALANCE_2007_2020,
  CONFLICTING_2026_AREA_ESTIMATES_4,
  ENCROACHMENT_VOLUMES_15,
  ENFORCEMENT_METRICS_REFORM_8,
  FORENSIC_SATELLITE_PROTOCOL_SPEC,
  getEncroachmentChaptersByVolume,
  HISTORICAL_OPEN_WATER_SERIES_9,
  KEW_DAL_ENCROACHMENT_OBSERVATORY_12,
  LAND_USE_TRANSITION_CLASSES_9,
  PRIMARY_DOCUMENTARY_EVIDENCE_11,
  PUBLIC_INFRASTRUCTURE_OBSTRUCTIONS_9,
  SURVEILLANCE_AND_SPA_AUDIT_SPEC,
  TRIBUTARY_NARROWING_CASES_2,
} from '@/data/himalayan-dispatch-art-of-encroachment-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 11 — The Art of Encroachment: How Dal Lake Is Being Turned into Real Estate (15 Volumes · 100 Chapters) | Himalayan Dispatch',
  description: ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-11-the-art-of-encroachment',
  imagePath: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
});

export default function Monograph11ArtOfEncroachmentPage() {
  const canonicalPath = '/himalayan-dispatch/issues/monograph-11-the-art-of-encroachment';

  // Permanent Editorial Presentation Standard: never display numerical word counts publicly
  const publicMasterSpecs = ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.masterSpecifications.filter(
    (row) => !/manuscript\s*length|word\s*count|\bwords\b/i.test(`${row.component} ${row.target}`)
  );

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.monographCode,
    name: `${ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.title}: ${ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.subtitle}`,
    description: ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-11-encroachment-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 11 · The Art of Encroachment' },
          ]}
        />

        {/* Monumental Monograph 11 Cover Identity */}
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
              {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.kicker}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.companionDispatchNumber}
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="inline-block px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
              {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.statusBadge}
            </div>

            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-4xl italic text-[#D8C3A5] leading-snug">
              {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
          </div>

          {/* 15 Volumes / 100 Chapters / -49.0% / -249.8 ha */}
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-4xl gap-6 py-6 border-y border-[#F2EFE7]/20">
            {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.heroStats.map((m) => (
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
                BY {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.geographicScope} &nbsp;·&nbsp;{' '}
                {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.investigationPeriod}
              </p>
              <p className="hd-folio-meta text-[#A39B8B]">
                EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; 38 MIN READ
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.companionDispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 06</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl(ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.kewObservatoryPath)}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 border border-[#D8C3A5]/45 text-xs font-semibold tracking-[0.16em] uppercase text-[#D8C3A5]"
              >
                <span>KEW Dal Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Monograph 11"
                title={`${ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.title}: ${ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.subtitle} | Himalayan Dispatch`}
                description={ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Research Limitations, Presumption of Innocence & Community Safeguards */}
        <section
          className="p-6 sm:p-8 border-l-4 space-y-2.5"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">
            RESEARCH LIMITATIONS, PRESUMPTION OF INNOCENCE &amp; SCIENTIFIC SELF-SCRUTINY
          </p>
          <p
            className="hd-font-body text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.researchLimitationsDisclosure}
          </p>
          <p
            className="hd-font-body text-xs sm:text-sm italic leading-relaxed"
            style={{ color: 'var(--hd-fg-muted)' }}
          >
            {ACB_AND_JUDICIAL_ACCOUNTABILITY_SPEC.presumptionOfInnocenceNotice}
          </p>
        </section>

        {/* Three-Tier Publication Hierarchy */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.publicationHierarchy.map((tier) => (
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
              {tier.href.startsWith('/earth-human-impact') ? (
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
            <p className="hd-kicker">FOUNDATIONAL PREMISE</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              Shrinking from the Edges, Transforming from Within
            </h2>
            <p className="hd-folio-meta">
              REQUIRED OUTCOME STANDARD: {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.netAquaticRecoveryFormula}
            </p>
          </div>
          <div className="lg:col-span-8 hd-prose">
            {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.editorialPremise.map((para, idx) => (
              <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Parts II & III: 1859–2013 Historical Open-Water Series */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <p className="hd-kicker">PARTS II &amp; III · 1859–2013 HISTORICAL RECONSTRUCTION</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Total Lake Extent vs. Unobstructed Open Water &amp; Built-Up Land
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-4xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {HISTORICAL_OPEN_WATER_SERIES_9.methodologicalNote}
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
                  <th className="py-3 px-5 hd-folio-meta">Year</th>
                  <th className="py-3 px-5 hd-folio-meta">Total Lake Extent</th>
                  <th className="py-3 px-5 hd-folio-meta">Open Water</th>
                  <th className="py-3 px-5 hd-folio-meta">Built-Up Land</th>
                  <th className="py-3 px-5 hd-folio-meta">Analytical Observation</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {HISTORICAL_OPEN_WATER_SERIES_9.map((row) => (
                  <tr key={row.year}>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-copper)' }}>
                      {row.year}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {row.totalLakeExtent}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {row.openWater}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm" style={{ color: 'var(--hd-fg)' }}>
                      {row.builtUpLand}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {row.analyticalNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Parts IX & X: CAG 2007–2020 Constant-Boundary Balance Sheet + Interactive Workbench */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="hd-kicker">PARTS IX, XVI, XVII &amp; XXIII · CONSTANT-BOUNDARY BALANCE &amp; SCENARIOS</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              The 249.8 Hectares That Changed (2007–2020) — 10.15% Share vs. 16.22% Category Loss
            </h2>
            <p
              className="hd-font-body text-sm sm:text-base max-w-4xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {CAG_LAND_USE_BALANCE_2007_2020.cagPercentageCorrection.mathematicalExplanation}
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
                  <th className="py-3 px-5 hd-folio-meta">Land-Use Category</th>
                  <th className="py-3 px-5 hd-folio-meta">2007</th>
                  <th className="py-3 px-5 hd-folio-meta">2014</th>
                  <th className="py-3 px-5 hd-folio-meta">2020</th>
                  <th className="py-3 px-5 hd-folio-meta">Net Change</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {CAG_LAND_USE_BALANCE_2007_2020.rows.map((row) => (
                  <tr key={row.id} className={row.isTotalRow ? 'font-bold' : ''}>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {row.landUseCategory}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm tabular-nums" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {row.area2007Label}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm tabular-nums" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {row.area2014Label}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm tabular-nums" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {row.area2020Label}
                    </td>
                    <td className="py-3 px-5 hd-font-body text-sm font-semibold tabular-nums" style={{ color: 'var(--hd-copper)' }}>
                      {row.netChangeLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DalLakeEncroachmentWorkbench />
        </section>

        {/* Parts VI, VIII, XII, XIV, XV & XVIII: ACB, Public Arterial Obstruction, Lost Records & 2026 Discrepancy */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="p-6 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PART VIII · WHEN PUBLIC INFRASTRUCTURE CHOKES LAKE ARTERIES</p>
            <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Tributary Narrowing &amp; 9 Audited Catchments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRIBUTARY_NARROWING_CASES_2.map((tc) => (
                <div key={tc.id} className="p-4 border space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
                  <p className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {tc.watercourseName}
                  </p>
                  <p className="hd-font-display text-xl font-semibold" style={{ color: 'var(--hd-copper)' }}>
                    {tc.earlierReportedWidth} → {tc.subsequentlyObservedWidth}
                  </p>
                  <p className="hd-folio-meta">Localized narrowing: {tc.localizedWidthReductionPercent}</p>
                </div>
              ))}
            </div>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              CAG documented {PUBLIC_INFRASTRUCTURE_OBSTRUCTIONS_9.length} sites including R&amp;B
              Department road blockages across four watercourses—demonstrating why accountability
              cannot be restricted to vulnerable households while exempting state agencies.
            </p>
          </div>

          <div
            className="p-6 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PARTS XII, XIV, XV &amp; XVIII · ARCHIVES, SPA &amp; 2026 RECONCILIATION</p>
            <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Lost Records, ₹356 Cr SPA Shortfalls &amp; 6.35 km² Estimate Gap
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
              <li>
                • <strong>2014 Flood Archive Gap:</strong>{' '}
                {SURVEILLANCE_AND_SPA_AUDIT_SPEC.flood2014RecordLoss.lostRecordsSpan} (
                {SURVEILLANCE_AND_SPA_AUDIT_SPEC.flood2014RecordLoss.lostRecordsPeriod}) reported
                damaged via July 2025 RTI;{' '}
                {SURVEILLANCE_AND_SPA_AUDIT_SPEC.flood2014RecordLoss.postFloodRemovalsCount.toLocaleString('en-US')}{' '}
                post-Oct 2014 removals cited.
              </li>
              <li>
                • <strong>₹356 Cr 2012 SPA Acquisition:</strong> 2,299 / 14,992 kanals (15.3%) and
                319 / 1,994 structures (16.0%) acquired by Dec 2019 (₹63.73 Cr spent; ₹272.82 Cr
                unreleased; ~116 ha acquired land reported undredged).
              </li>
              <li>
                • <strong>2026 Estimate Reconciliation:</strong>{' '}
                {CONFLICTING_2026_AREA_ESTIMATES_4.kewSelfVerificationMandate}
              </li>
            </ul>
          </div>
        </section>

        {/* Part XXIV: Five Lakeside Contradictions */}
        <section className="space-y-5">
          <div className="space-y-1">
            <p className="hd-kicker">PART XXIV · CONNECTED HISTORICAL SEQUENCE</p>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Five Lakeside Contradictions Kashmir Must Confront
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {FORENSIC_SATELLITE_PROTOCOL_SPEC.fiveLakesideContradictions5.map((item) => (
              <Link
                key={item.code}
                href={item.canonicalDispatchHref}
                className="p-5 border space-y-2 block hover:opacity-90"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <span className="hd-kicker">{item.code}</span>
                <h3 className="hd-font-display text-xl font-semibold leading-snug" style={{ color: 'var(--hd-fg)' }}>
                  {item.historicalInvestigation}
                </h3>
                <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {item.centralContradiction}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Part XXV: Complete 15-Volume, 100-Chapter Monograph Architecture */}
        <section id="volumes-ledger" className="space-y-8">
          <div
            className="flex flex-wrap items-end justify-between gap-4 border-b pb-4"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <div className="space-y-1.5">
              <p className="hd-kicker">PART XXV · COMPLETE RESEARCH REPOSITORY</p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                15 Thematic Volumes &amp; 100 Research Chapters
              </h2>
              <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                Covers {LAND_USE_TRANSITION_CLASSES_9.length} transition classes,{' '}
                {ENFORCEMENT_METRICS_REFORM_8.length} outcome reforms,{' '}
                {FORENSIC_SATELLITE_PROTOCOL_SPEC.landCoverClasses15.length} EO classes (OW–UL),{' '}
                {FORENSIC_SATELLITE_PROTOCOL_SPEC.parcelRegistryFields17.length} parcel registry
                fields, and {FORENSIC_SATELLITE_PROTOCOL_SPEC.responsibilityChain13.length}{' '}
                accountable institutions.
              </p>
            </div>
            <a
              href={`${ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.datasetApiPath}?format=csv`}
              className="hd-kicker inline-flex items-center gap-1.5 underline"
            >
              <span>Download Complete 100-Chapter Framework (CSV)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ENCROACHMENT_VOLUMES_15.map((vol) => {
              const volChapters = getEncroachmentChaptersByVolume(vol.volumeRoman);
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
                          href={HD_ROUTES.monograph11Chapter(ch.slug)}
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

        {/* Specs + 12 KEW Modules + 11 Primary Documentary Sources */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            className="lg:col-span-5 border p-6 space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">
              MONOGRAPH 11 SPECIFICATIONS &amp; {KEW_DAL_ENCROACHMENT_OBSERVATORY_12.length} KEW MODULES
            </p>
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
            <p className="hd-kicker">PRIMARY DOCUMENTARY EVIDENCE ({PRIMARY_DOCUMENTARY_EVIDENCE_11.length})</p>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {PRIMARY_DOCUMENTARY_EVIDENCE_11.map((src) => (
                <div key={src.code} className="py-3 space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hd-font-body text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1.5"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      <span>{src.sourceLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                    <span className="hd-folio-meta">{src.yearOrDate}</span>
                  </div>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    <strong>{src.authorityOrPublication}:</strong> {src.investigativeValue}
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
          <p className="hd-kicker">
            EPILOGUE · THE LAKE THAT COULD DISAPPEAR WITHOUT ITS BOUNDARY DISAPPEARING
          </p>
          <blockquote
            className="hd-font-display text-2xl sm:text-4xl italic font-semibold max-w-4xl mx-auto leading-snug"
            style={{ color: 'var(--hd-fg)' }}
          >
            “{ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.closingEpilogueQuestion}”
          </blockquote>
        </section>
      </div>
    </div>
  );
}
