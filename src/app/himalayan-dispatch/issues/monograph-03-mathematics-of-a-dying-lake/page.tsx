import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { DalLakeMathematicsWorkbench } from '@/components/himalayan-dispatch/DalLakeMathematicsWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  AUXILIARY_SYSTEMS_AUDIT_19,
  DAL_CONSERVATION_SYSTEM_CHAIN,
  DAL_LAKE_OBSERVATORY_MODULES_12,
  DAL_LAKE_STP_DOSSIERS_6,
  DYING_LAKE_CHAPTERS_62,
  DYING_LAKE_MONOGRAPH_SPEC,
  DYING_LAKE_VOLUMES_10,
  EIGHT_INTERCONNECTED_SCIENTIFIC_BUDGETS,
  FUTURE_SIMULATION_SCENARIOS_12,
  LAND_COVER_CLASSIFICATIONS_10,
  PERFORMANCE_ACCOUNTING_INDICATORS_9,
  PRIMARY_DOCUMENTARY_SOURCES_4,
  REQUIRED_ENGINEERING_DOCUMENTS_23,
  SETTLING_BASIN_HISTORICAL_BENCHMARK,
  SEWERAGE_HYDRAULIC_DEFICIT_BENCHMARK,
} from '@/data/himalayan-dispatch-dying-lake-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 03 — The Mathematics of a Dying Lake (10 Volumes · 62 Chapters) | Himalayan Dispatch',
  description: DYING_LAKE_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake',
  imagePath: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
});

export default function Monograph03MathematicsOfADyingLakePage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: DYING_LAKE_MONOGRAPH_SPEC.monographCode,
    name: `${DYING_LAKE_MONOGRAPH_SPEC.title}: ${DYING_LAKE_MONOGRAPH_SPEC.subtitle}`,
    description: DYING_LAKE_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: DYING_LAKE_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-03-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 03 · The Mathematics of a Dying Lake' },
          ]}
        />

        {/* Monumental Monograph 03 Cover Header */}
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
              {DYING_LAKE_MONOGRAPH_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH 04 OF 24
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {DYING_LAKE_MONOGRAPH_SPEC.disciplinesRubric}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {DYING_LAKE_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {DYING_LAKE_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {DYING_LAKE_MONOGRAPH_SPEC.extendedSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 max-w-2xl gap-6 py-5 border-y border-[#F2EFE7]/20">
            {DYING_LAKE_MONOGRAPH_SPEC.heroStats.map((st) => (
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
                PROPOSED BYLINE: {DYING_LAKE_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#A39B8B]">
                SCOPE: {DYING_LAKE_MONOGRAPH_SPEC.geographicScope}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  DYING_LAKE_MONOGRAPH_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 04 Flagship Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl(
                  '/water-systems/lakes/dal-lake/conservation-performance'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border border-[#F2EFE7]/40 text-xs font-medium tracking-[0.18em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW Dal Lake Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share This Monograph"
                title={`${DYING_LAKE_MONOGRAPH_SPEC.title} — Monograph 03 | Himalayan Dispatch`}
                description={DYING_LAKE_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>

          <p className="hd-font-body text-xs italic text-[#F2EFE7]/72 pt-3 border-t border-[#F2EFE7]/15">
            {DYING_LAKE_MONOGRAPH_SPEC.evidentiaryNotice}
          </p>
        </header>

        {/* Foundational Engineering Thesis & 8 Questions */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-5">
            <p className="hd-kicker">SECTION 01 · THE FOUNDATIONAL QUESTION</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              Were Dal Lake’s Interventions Ever Mathematically Integrated?
            </h2>
            <blockquote
              className="p-6 border-l-2 space-y-2"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p
                className="hd-font-display text-2xl italic font-medium leading-snug"
                style={{ color: 'var(--hd-fg)' }}
              >
                “{DYING_LAKE_MONOGRAPH_SPEC.foundationalThesis}”
              </p>
            </blockquote>

            <div className="space-y-2 pt-2">
              <p className="hd-folio-meta">COMPLETE CONSERVATION SYSTEM CHAIN</p>
              {DAL_CONSERVATION_SYSTEM_CHAIN.map((stage) => (
                <div
                  key={stage.tier}
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <p className="hd-kicker">{stage.tier}</p>
                  <p
                    className="hd-font-body text-xs font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {stage.elements}
                  </p>
                  <p
                    className="hd-font-body text-xs"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {stage.governingProcess}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div
              className="p-6 sm:p-8 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">EIGHT MEASURABLE ENGINEERING QUESTIONS</p>
              <ol className="space-y-3">
                {DYING_LAKE_MONOGRAPH_SPEC.eightFoundationalQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base hd-font-body">
                    <span
                      className="hd-font-display font-semibold shrink-0"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      0{idx + 1}.
                    </span>
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>{q}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Key Statutory Audit & Sept 2026 Anchors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className="p-5 border space-y-1"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-folio-meta">TELBAL SETTLING EFFICIENCY</p>
                <p
                  className="hd-font-display text-4xl font-semibold"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  {SETTLING_BASIN_HISTORICAL_BENCHMARK.lowestEfficiencyPct}–
                  {SETTLING_BASIN_HISTORICAL_BENCHMARK.highestEfficiencyPct}%
                </p>
                <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                  1998–2000 CAG-cited range (43–93% potential pass-through)
                </p>
              </div>
              <div
                className="p-5 border space-y-1"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-folio-meta">INSTALLED VS. ESTIMATED SEWAGE</p>
                <p
                  className="hd-font-display text-4xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {SEWERAGE_HYDRAULIC_DEFICIT_BENCHMARK.reportedInstalledCapacityMld.toFixed(1)} /{' '}
                  {SEWERAGE_HYDRAULIC_DEFICIT_BENCHMARK.estimatedWastewaterLoadMld} MLD
                </p>
                <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                  11.3 MLD illustrative deficit (+30 MLD Gupt Ganga u/c excluded)
                </p>
              </div>
              <div
                className="p-5 border space-y-1"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-folio-meta">CAG DE-WEEDING &amp; DREDGING</p>
                <p
                  className="hd-font-display text-4xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  ₹28.01 + ₹11.02 cr
                </p>
                <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                  Examined up to March 2022 (57.8% de-weeding outside window)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Master Mathematics Workbench */}
        <DalLakeMathematicsWorkbench variant="editorial" />

        {/* STP Ring & CAG Table 4.2 Nutrient Matrix */}
        <section
          className="pt-12 border-t space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="space-y-1">
            <p className="hd-kicker">PARTS II &amp; III · PERIPHERAL SEWAGE TREATMENT RING</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Six Individual STP Dossiers &amp; CAG Table 4.2 Nutrient Audit
            </h2>
            <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
              Historical removal percentages reflect Jan 2016–Dec 2018 test results (CAG Report No.
              4 of 2025, Table 4.2), not verified 2026 plant performance; contemporary testing is
              required post-refurbishment.
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
                  <th className="py-3 px-4 hd-folio-meta">Plant</th>
                  <th className="py-3 px-4 hd-folio-meta">Reported Capacity</th>
                  <th className="py-3 px-4 hd-folio-meta">NH₄-N Removal (2016–18)</th>
                  <th className="py-3 px-4 hd-folio-meta">P Removal (2016–18)</th>
                  <th className="py-3 px-4 hd-folio-meta">Design Target &amp; Audit Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {DAL_LAKE_STP_DOSSIERS_6.map((stp) => (
                  <tr key={stp.id}>
                    <td
                      className="py-3.5 px-4 text-sm hd-font-body font-semibold whitespace-nowrap align-top"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {stp.name}
                    </td>
                    <td
                      className="py-3.5 px-4 text-sm hd-font-display font-semibold whitespace-nowrap align-top"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {stp.reportedCapacityMld.toFixed(1)} MLD
                    </td>
                    <td className="py-3.5 px-4 text-xs sm:text-sm hd-font-body align-top">
                      {stp.cagHistoricalNh4RemovalPct}
                    </td>
                    <td className="py-3.5 px-4 text-xs sm:text-sm hd-font-body align-top">
                      {stp.cagHistoricalPhosphorusRemovalPct}
                    </td>
                    <td
                      className="py-3.5 px-4 text-xs hd-font-body leading-relaxed align-top"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      <strong>{stp.designNutrientRemovalTargetPct}</strong> —{' '}
                      {stp.engineeringVerificationMandate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Eight Interconnected Scientific Budgets & Performance Accounting */}
        <section
          className="pt-12 border-t grid grid-cols-1 lg:grid-cols-12 gap-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-6 space-y-4">
            <p className="hd-kicker">PART X · ENVIRONMENTAL ACCOUNTING ARCHITECTURE</p>
            <h2
              className="hd-font-display text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Eight Interconnected Scientific Budgets
            </h2>
            <div className="space-y-3">
              {EIGHT_INTERCONNECTED_SCIENTIFIC_BUDGETS.map((b) => (
                <div
                  key={b.code}
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="hd-font-display text-xl font-semibold">
                      {b.budgetName}
                    </span>
                    <span className="hd-folio-meta">{b.units}</span>
                  </div>
                  <code className="text-xs block opacity-80">{b.governingEquation}</code>
                  <p
                    className="hd-font-body text-xs sm:text-sm"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {b.principalQuestion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="hd-kicker">PART XI · FOLLOW THE MONEY</p>
            <h2
              className="hd-font-display text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Performance Outcome Accounting vs. Input Counts
            </h2>
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
                    <th className="py-2.5 px-3 hd-folio-meta">Intervention</th>
                    <th className="py-2.5 px-3 hd-folio-meta">Conventional</th>
                    <th className="py-2.5 px-3 hd-folio-meta">Scientific Outcome Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {PERFORMANCE_ACCOUNTING_INDICATORS_9.map((row) => (
                    <tr key={row.intervention}>
                      <td className="py-2.5 px-3 text-xs font-semibold hd-font-body align-top">
                        {row.intervention}
                      </td>
                      <td
                        className="py-2.5 px-3 text-xs hd-font-body align-top"
                        style={{ color: 'var(--hd-fg-muted)' }}
                      >
                        {row.conventionalReporting}
                      </td>
                      <td
                        className="py-2.5 px-3 text-xs font-semibold hd-font-body align-top"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {row.scientificFinancialIndicator}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 10 Land-Cover Classes */}
            <div
              className="p-5 border space-y-2"
              style={{
                borderColor: 'var(--hd-rule)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">
                PART XII · 10 STAGE-NORMALIZED SATELLITE LAND-COVER CLASSES
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs hd-font-body">
                {LAND_COVER_CLASSIFICATIONS_10.map(([cls, desc]) => (
                  <div key={cls}>
                    <strong>{cls}:</strong>{' '}
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Complete 10-Volume, 62-Chapter Scientific Monograph Index */}
        <section
          id="chapters-index"
          className="pt-12 border-t space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="hd-kicker">
                PART XIV · COMPLETE SCIENTIFIC MONOGRAPH ARCHITECTURE (PROPOSED)
              </p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                10 Thematic Volumes · 62 Scientific Chapters
              </h2>
            </div>
            <span className="hd-folio-meta">
              PROPOSED TARGET: 25 APPENDICES · ONGOING PROTOCOLS
            </span>
          </div>

          <div className="space-y-10">
            {DYING_LAKE_VOLUMES_10.map((vol) => {
              const volChapters = DYING_LAKE_CHAPTERS_62.filter(
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
                  <div
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div>
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} &nbsp;·&nbsp; {vol.chapterRange.toUpperCase()}
                      </span>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {vol.volumeTitle}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
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
                          className="py-3.5 flex items-start justify-between gap-4"
                        >
                          <Link
                            href={HD_ROUTES.monograph03Chapter(ch.slug)}
                            className="flex-1 group space-y-1"
                          >
                            <div className="flex flex-wrap items-baseline gap-3">
                              <span
                                className="hd-font-display text-xl font-semibold"
                                style={{ color: 'var(--hd-copper)' }}
                              >
                                {ch.number}
                              </span>
                              <span
                                className="hd-font-display text-xl font-semibold group-hover:underline underline-offset-4"
                                style={{ color: 'var(--hd-fg)' }}
                              >
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
                            title={`Chapter ${ch.number}: ${ch.title} — Monograph 03`}
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

        {/* Part IX (19 Auxiliary Systems) & Part XIII (12 Future Scenarios) */}
        <section
          className="pt-12 border-t grid grid-cols-1 lg:grid-cols-12 gap-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-6 space-y-4">
            <p className="hd-kicker">PART IX · 19 AUXILIARY CONSERVATION SYSTEMS</p>
            <h2
              className="hd-font-display text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Exposing Every Auxiliary Component to Scrutiny
            </h2>
            <div
              className="border max-h-[560px] overflow-y-auto divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {AUXILIARY_SYSTEMS_AUDIT_19.map(([comp, q]) => (
                <div key={comp} className="p-3.5 text-xs sm:text-sm hd-font-body">
                  <strong style={{ color: 'var(--hd-fg)' }}>{comp}:</strong>{' '}
                  <span style={{ color: 'var(--hd-fg-secondary)' }}>{q}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="hd-kicker">PART XIII · 2030, 2040 &amp; 2050 SIMULATION ENSEMBLE</p>
            <h2
              className="hd-font-display text-3xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Twelve Conservation Futures (Scenarios S01–S12)
            </h2>
            <div
              className="border max-h-[560px] overflow-y-auto divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {FUTURE_SIMULATION_SCENARIOS_12.map((sc) => (
                <div key={sc.code} className="p-3.5 space-y-1 text-xs sm:text-sm hd-font-body">
                  <div className="flex justify-between">
                    <strong style={{ color: 'var(--hd-copper)' }}>
                      {sc.code} · {sc.managementConfiguration}
                    </strong>
                    <span className="hd-folio-meta">{sc.evaluationHorizons}</span>
                  </div>
                  <p style={{ color: 'var(--hd-fg-secondary)' }}>{sc.primaryTargetedBalances}</p>
                </div>
              ))}
            </div>
            <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
              Guardrail: No definitive remaining lifespan or date of ecological collapse may be
              published until the coupled model is empirically calibrated and independently
              peer-reviewed.
            </p>
          </div>
        </section>

        {/* Part XV: 23 P0/P1/P2 Documentary Requirements */}
        <section
          className="pt-12 border-t space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="space-y-1">
            <p className="hd-kicker">PART XV · MANDATORY DOCUMENTARY RETRIEVAL DOCKET</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              23 Engineering, Financial &amp; Monitoring Documents Required (P0–P2)
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
                  <th className="py-3 px-4 hd-folio-meta">Documentary Requirement</th>
                  <th className="py-3 px-4 hd-folio-meta">Engineering Verification Purpose</th>
                  <th className="py-3 px-4 hd-folio-meta">Current Retrieval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {REQUIRED_ENGINEERING_DOCUMENTS_23.map((doc) => (
                  <tr key={doc.code}>
                    <td
                      className="py-3 px-4 text-xs font-mono font-bold whitespace-nowrap align-top"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {doc.priority} · {doc.code}
                    </td>
                    <td className="py-3 px-4 text-sm hd-font-body font-semibold align-top">
                      {doc.documentTitle}
                    </td>
                    <td
                      className="py-3 px-4 text-xs sm:text-sm hd-font-body align-top"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {doc.engineeringVerificationPurpose}
                    </td>
                    <td
                      className="py-3 px-4 text-xs hd-font-body align-top"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {doc.acquisitionStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Proposed Publication Specs, Primary Sources & Epilogue */}
        <section
          className="pt-12 border-t grid grid-cols-1 lg:grid-cols-12 gap-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">PROPOSED PUBLICATION SPECIFICATIONS</p>
            <div
              className="border divide-y"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              {DYING_LAKE_MONOGRAPH_SPEC.proposedPublicationSpecifications.map((sp) => (
                <div
                  key={sp.component}
                  className="p-3 flex justify-between gap-4 text-xs sm:text-sm hd-font-body"
                >
                  <span style={{ color: 'var(--hd-fg-muted)' }}>{sp.component}</span>
                  <strong className="text-right" style={{ color: 'var(--hd-fg)' }}>
                    {sp.target}
                  </strong>
                </div>
              ))}
            </div>
            <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
              These are proposed research targets, not completed investigations.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div
              className="p-6 sm:p-8 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: '#171717',
                color: '#F2EFE7',
              }}
            >
              <p className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                EPILOGUE — {DYING_LAKE_MONOGRAPH_SPEC.epilogueTitle.toUpperCase()}
              </p>
              {DYING_LAKE_MONOGRAPH_SPEC.epilogueParagraphs.map((p, idx) => (
                <p key={idx} className="hd-font-body text-sm sm:text-base leading-relaxed text-[#F2EFE7]/88">
                  {p}
                </p>
              ))}
              <p className="hd-font-display text-xl sm:text-2xl italic text-[#D8C3A5] pt-2 border-t border-[#F2EFE7]/20">
                “{DYING_LAKE_MONOGRAPH_SPEC.epilogueClosingQuestion}”
              </p>
            </div>

            <div
              className="border p-5 space-y-3"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">PRIMARY DOCUMENTARY SOURCES</p>
              <ul className="space-y-2.5 text-xs sm:text-sm hd-font-body">
                {PRIMARY_DOCUMENTARY_SOURCES_4.map((src) => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      <span>{src.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                    <p style={{ color: 'var(--hd-fg-secondary)' }}>{src.relevance}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="p-5 border flex flex-wrap items-center justify-between gap-4"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div>
                <p className="hd-kicker">PART XVI · PERMANENT KEW SCIENTIFIC COMPANION</p>
                <p className="hd-font-display text-2xl font-semibold">
                  Dal Lake Conservation Performance Observatory ({DAL_LAKE_OBSERVATORY_MODULES_12.length} Modules)
                </p>
              </div>
              <a
                href={toKewPlatformUrl(
                  '/water-systems/lakes/dal-lake/conservation-performance'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: 'var(--hd-copper-solid)' }}
              >
                <span>Enter KEW Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
