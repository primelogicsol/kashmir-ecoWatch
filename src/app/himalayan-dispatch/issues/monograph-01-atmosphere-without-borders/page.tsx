import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { AtmosphereVentilationCalculator } from '@/components/himalayan-dispatch/AtmosphereVentilationCalculator';
import { KewContentShare } from '@/components/common/KewContentShare';
import {
  HD_ROUTES,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import {
  getMonographChaptersByVolume,
  MONOGRAPH_01_APPENDICES,
  MONOGRAPH_01_EQUATIONS,
  MONOGRAPH_01_FOUNDATIONAL_REFERENCES,
  MONOGRAPH_01_IDENTITY,
  MONOGRAPH_01_MASTER_SPECIFICATIONS,
  MONOGRAPH_01_MASTER_SPECIFICATIONS_NOTE,
  MONOGRAPH_01_SEVEN_QUESTIONS,
  MONOGRAPH_01_VOLUMES,
  STRATEGIC_FLAGSHIP_COMPARISON,
  STRATEGIC_FLAGSHIP_DISTINCTION_NOTE,
} from '@/data/himalayan-dispatch-monograph-01-atmosphere';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 01 — The Atmosphere Has No Borders (12 Volumes · 60 Chapters · 20 Appendices) | Himalayan Dispatch',
  description: MONOGRAPH_01_IDENTITY.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders',
  imagePath: '/images/publications/srinagar-urban-jhelum-inversion.jpg',
});

export default function Monograph01AtmospherePage() {
  const canonicalPath = '/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders';

  // Permanent Editorial Presentation Standard: exclude numerical word counts from public display
  const publicMasterSpecs = MONOGRAPH_01_MASTER_SPECIFICATIONS.filter(
    (row) => !/manuscript\s*length|word\s*count|\bwords\b/i.test(`${row.component} ${row.proposedSpecification}`)
  );

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: 'SPECIAL SCIENTIFIC MONOGRAPH / NO. 01',
    name: `${MONOGRAPH_01_IDENTITY.title}: ${MONOGRAPH_01_IDENTITY.subtitle}`,
    description: MONOGRAPH_01_IDENTITY.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: MONOGRAPH_01_IDENTITY.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-01-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 01 · The Atmosphere Has No Borders' },
          ]}
        />

        {/* Monumental Monograph 01 Cover Identity */}
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
              {MONOGRAPH_01_IDENTITY.kicker}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH 17
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="flex flex-wrap gap-2">
              {MONOGRAPH_01_IDENTITY.classificationBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {MONOGRAPH_01_IDENTITY.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-4xl italic text-[#D8C3A5] leading-snug">
              {MONOGRAPH_01_IDENTITY.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {MONOGRAPH_01_IDENTITY.extendedSubtitle}
            </p>
          </div>

          {/* 12 / 60 / 30 Years / 20 Appendices Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-4xl gap-6 py-6 border-y border-[#F2EFE7]/20">
            {MONOGRAPH_01_IDENTITY.heroMetrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {m.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                  {m.label}
                </div>
                <p className="hd-font-body text-xs text-[#F2EFE7]/65">{m.note}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-2 text-xs sm:text-sm text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                PROPOSED BYLINE: {MONOGRAPH_01_IDENTITY.proposedByline}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {MONOGRAPH_01_IDENTITY.geographicScope}
              </p>
              <p className="hd-font-body italic text-[#D8C3A5]/90">
                {MONOGRAPH_01_IDENTITY.bylineStatusNote}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Link
                href={HD_ROUTES.issueArticle('volume-01-issue-01', MONOGRAPH_01_IDENTITY.dispatchSlug)}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 17 Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Monograph 01"
                title={`${MONOGRAPH_01_IDENTITY.title}: ${MONOGRAPH_01_IDENTITY.subtitle} | Himalayan Dispatch`}
                description={MONOGRAPH_01_IDENTITY.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Ongoing Investigation & Evidentiary Status Disclosure */}
        <section
          className="p-6 sm:p-8 border-l-2 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">ONGOING SCIENTIFIC INVESTIGATION · EVIDENTIARY GUARDRAIL</p>
          <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            {MONOGRAPH_01_IDENTITY.researchStatusDisclosure}
          </p>
        </section>

        {/* Three-Level Publication Hierarchy */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MONOGRAPH_01_IDENTITY.publicationHierarchy.map((tier) => {
            const isKew = tier.routePath.startsWith('/risk-monitoring');
            const href = isKew ? toKewPlatformUrl(tier.routePath) : HD_ROUTES.issueArticle('volume-01-issue-01', 'the-atmosphere-has-no-borders');
            const resolvedHref =
              tier.routePath === canonicalPath
                ? '#twelve-volumes'
                : isKew
                ? toKewPlatformUrl(tier.routePath)
                : tier.routePath;
            return (
              <div
                key={tier.levelCode}
                className="p-6 border flex flex-col justify-between space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-2">
                  <p className="hd-kicker">
                    {tier.levelCode} · {tier.tierLabel}
                  </p>
                  <h2 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {tier.title}
                  </h2>
                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {tier.summary}
                  </p>
                </div>
                {isKew ? (
                  <a href={href} className="hd-kicker inline-flex items-center gap-1.5 hover:underline">
                    <span>Open KEW Companion</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link href={resolvedHref} className="hd-kicker inline-flex items-center gap-1.5 hover:underline">
                    <span>{tier.routePath === canonicalPath ? 'Jump to 60 Chapters' : 'Open Dispatch 17'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            );
          })}
        </section>

        {/* Section 1: Foundational Editorial Statement + Strategic Flagship Comparison */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">SECTION 01 · FOUNDATIONAL EDITORIAL STATEMENT</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight" style={{ color: 'var(--hd-fg)' }}>
              An Interconnected Planetary Atmosphere
            </h2>
            <div className="hd-prose">
              {MONOGRAPH_01_IDENTITY.foundationalStatement.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                  {p}
                </p>
              ))}
            </div>
            <blockquote
              className="p-5 border-l-2 hd-font-display text-xl sm:text-2xl italic font-semibold"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg-elevated)',
                color: 'var(--hd-fg)',
              }}
            >
              “{MONOGRAPH_01_IDENTITY.closingPrinciple}”
            </blockquote>
          </div>

          <aside
            className="lg:col-span-5 border p-6 sm:p-8 space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">STRATEGIC DISTINCTION · TWO INAUGURAL FLAGSHIPS</p>
            <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Dispatch 01 vs. Dispatch 17
            </h3>
            <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
              {STRATEGIC_FLAGSHIP_DISTINCTION_NOTE}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                    <th className="py-2 pr-2 hd-folio-meta">Dimension</th>
                    <th className="py-2 px-2 hd-folio-meta">Dispatch 01</th>
                    <th className="py-2 pl-2 hd-folio-meta">Dispatch 17</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {STRATEGIC_FLAGSHIP_COMPARISON.map((row) => (
                    <tr key={row.dimension}>
                      <td className="py-2.5 pr-2 font-semibold align-top" style={{ color: 'var(--hd-fg)' }}>
                        {row.dimension}
                      </td>
                      <td className="py-2.5 px-2 align-top" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row.dispatch01}
                      </td>
                      <td className="py-2.5 pl-2 font-semibold align-top" style={{ color: 'var(--hd-copper)' }}>
                        {row.dispatch17}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
              <Link
                href={MONOGRAPH_01_IDENTITY.companionGovernanceDispatchPath}
                className="hd-kicker hover:underline"
              >
                Companion Governance Inquiry: Dispatch 16 (Clean Air Advocacy) →
              </Link>
            </div>
          </aside>
        </section>

        {/* Section 2: Seven Central Scientific Questions & Core Equations */}
        <section
          className="pt-12 border-t space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-3xl space-y-2">
            <p className="hd-kicker">SECTION 02 · CENTRAL SCIENTIFIC QUESTIONS &amp; SOURCE ACCOUNTING</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Seven Questions &amp; Three Governing Formulations
            </h2>
          </div>

          <div
            className="border overflow-hidden"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                    <th className="py-3 px-5 hd-folio-meta">Investigation</th>
                    <th className="py-3 px-5 hd-folio-meta">Fundamental scientific question</th>
                    <th className="py-3 px-5 hd-folio-meta">Target volumes</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {MONOGRAPH_01_SEVEN_QUESTIONS.map((q) => (
                    <tr key={q.number}>
                      <td className="py-3 px-5 hd-font-body text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--hd-fg)' }}>
                        {q.investigation}
                      </td>
                      <td className="py-3 px-5 hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {q.fundamentalQuestion}
                      </td>
                      <td className="py-3 px-5 hd-folio-meta whitespace-nowrap" style={{ color: 'var(--hd-copper)' }}>
                        {q.targetVolumes} ({q.targetChapterRange})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Core Equations + AQI 708 Reconstruction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div
              className="lg:col-span-7 p-6 sm:p-8 border space-y-5"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">CONCEPTUAL SOURCE-ACCOUNTING FRAMEWORK</p>
              <div
                className="p-4 border font-mono text-base sm:text-xl font-semibold overflow-x-auto"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
              >
                {MONOGRAPH_01_EQUATIONS.sourceAccounting.formulaText}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm hd-font-body">
                {MONOGRAPH_01_EQUATIONS.sourceAccounting.symbols.map((sym) => (
                  <div key={sym.symbol} className="border-l-2 pl-3" style={{ borderColor: 'var(--hd-copper)' }}>
                    <span className="font-mono font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {sym.symbol}
                    </span>{' '}
                    — <span style={{ color: 'var(--hd-fg-secondary)' }}>{sym.definition}</span>
                  </div>
                ))}
              </div>
              <p className="hd-font-body text-xs italic pt-2 border-t" style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}>
                {MONOGRAPH_01_EQUATIONS.sourceAccounting.caveat}
              </p>
            </div>

            <div
              className="lg:col-span-5 p-6 sm:p-8 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">VOLUME VII · CHAPTERS 31–33 · METRIC RECONSTRUCTION</p>
              <div className="flex items-baseline gap-4">
                <span className="hd-font-display text-5xl sm:text-6xl font-semibold tabular-nums" style={{ color: 'var(--hd-copper)' }}>
                  {MONOGRAPH_01_EQUATIONS.aqiSubIndex.srinagarNov2026CaseStudy.reportedPrivatePlatformAqi}
                </span>
                <div>
                  <p className="hd-font-sans text-xs font-semibold uppercase tracking-wider">
                    Reported private-platform AQI (Nov 26–27, 2026)
                  </p>
                  <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
                    {MONOGRAPH_01_EQUATIONS.aqiSubIndex.srinagarNov2026CaseStudy.validationDisclaimer}
                  </p>
                </div>
              </div>
              <div
                className="p-3 border font-mono text-xs sm:text-sm font-semibold"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
              >
                {MONOGRAPH_01_EQUATIONS.aqiSubIndex.formulaText}
              </div>
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {MONOGRAPH_01_EQUATIONS.aqiSubIndex.cpcbVsUsEpaComparison}
              </p>
            </div>
          </div>

          {/* Interactive Ventilation Calculator & Conceptual Schematics */}
          <AtmosphereVentilationCalculator />
        </section>

        {/* Section 3: All 12 Thematic Volumes & 60 Scientific Chapters */}
        <section
          id="twelve-volumes"
          className="pt-12 border-t space-y-10"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="hd-kicker">SECTION 03 · PROPOSED SCIENTIFIC MONOGRAPH STRUCTURE</p>
              <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                12 Thematic Volumes &amp; 60 Proposed Chapters
              </h2>
            </div>
            <a
              href={`${MONOGRAPH_01_IDENTITY.datasetEndpointPath}?format=csv`}
              className="hd-kicker underline hover:opacity-80"
            >
              Download 60-Chapter &amp; 20-Appendix Protocol CSV →
            </a>
          </div>

          <div className="space-y-10">
            {MONOGRAPH_01_VOLUMES.map((vol) => {
              const volChapters = getMonographChaptersByVolume(vol.volumeNumber);
              return (
                <div
                  key={vol.volumeRoman}
                  className="border p-6 sm:p-8 space-y-6"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-4"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="space-y-1">
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} · {vol.chapterRangeLabel}
                      </span>
                      <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                        {vol.title}
                      </h3>
                      <p className="hd-font-display text-base sm:text-lg italic" style={{ color: 'var(--hd-copper)' }}>
                        {vol.epigraph}
                      </p>
                    </div>
                    <p className="hd-font-body text-xs sm:text-sm max-w-xl" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {vol.scientificMandate}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {volChapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={HD_ROUTES.monograph01Chapter(ch.slug)}
                        className="p-4 border flex flex-col justify-between space-y-3 group transition-colors"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1.5">
                          <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                            CHAPTER {ch.code}
                          </span>
                          <h4
                            className="hd-font-display text-lg font-semibold leading-snug group-hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.title}
                          </h4>
                          <p className="hd-font-body text-xs line-clamp-3" style={{ color: 'var(--hd-fg-secondary)' }}>
                            {ch.executiveSummary[0]}
                          </p>
                        </div>
                        <span className="hd-kicker inline-flex items-center gap-1 pt-1">
                          <span>Inspect Protocol</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: All 20 Scientific Appendices (A through T) */}
        <section
          id="twenty-appendices"
          className="pt-12 border-t space-y-8"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="space-y-2">
            <p className="hd-kicker">SECTION 04 · TECHNICAL REPRODUCIBILITY PROTOCOLS</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Scientific Appendices A–T (20 Protocols)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MONOGRAPH_01_APPENDICES.map((ap) => (
              <Link
                key={ap.code}
                href={HD_ROUTES.monograph01Appendix(ap.slug)}
                className="p-5 border flex flex-col justify-between space-y-3 group"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-1.5">
                  <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                    APPENDIX {ap.code}
                  </span>
                  <h3
                    className="hd-font-display text-xl font-semibold leading-snug group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {ap.title}
                  </h3>
                  <p className="hd-font-body text-xs line-clamp-2" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {ap.purpose[0]}
                  </p>
                </div>
                <span className="hd-kicker inline-flex items-center gap-1">
                  <span>Open Appendix {ap.code}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 5: Master Specifications (Word-Count-Free Public Standard) + Foundational References */}
        <section
          className="pt-12 border-t grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div
            className="lg:col-span-5 border p-6 sm:p-8 space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PUBLICATION MASTER SPECIFICATIONS</p>
            <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Proposed Monograph Targets
            </h3>
            <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
              {MONOGRAPH_01_MASTER_SPECIFICATIONS_NOTE}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                    <th className="py-2 pr-3 hd-folio-meta">Component</th>
                    <th className="py-2 pl-3 hd-folio-meta">Proposed specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {publicMasterSpecs.map((spec) => (
                    <tr key={spec.component}>
                      <td className="py-2.5 pr-3 font-semibold align-top" style={{ color: 'var(--hd-fg)' }}>
                        {spec.component}
                      </td>
                      <td className="py-2.5 pl-3 align-top" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {spec.proposedSpecification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="lg:col-span-7 border p-6 sm:p-8 space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">FOUNDATIONAL SCIENTIFIC REFERENCES (11 PRIMARY SOURCES)</p>
            <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Peer-Reviewed Baselines &amp; Technical Standards
            </h3>
            <ol className="space-y-3 text-xs sm:text-sm hd-font-body list-decimal list-inside">
              {MONOGRAPH_01_FOUNDATIONAL_REFERENCES.map((ref) => (
                <li key={ref.number} style={{ color: 'var(--hd-fg-secondary)' }}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {ref.title}
                  </a>{' '}
                  ({ref.journalOrSource}, {ref.year}) — {ref.scientificRelevance}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Epilogue */}
        <section
          className="p-8 sm:p-12 border-t-2 border-b-2 space-y-5"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">EPILOGUE · {MONOGRAPH_01_IDENTITY.epilogueTitle.toUpperCase()}</p>
          <div className="hd-prose max-w-4xl">
            {MONOGRAPH_01_IDENTITY.epilogueStatement.slice(0, 4).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          <div className="pt-2 flex flex-wrap items-center gap-6">
            <Link
              href={HD_ROUTES.inauguralIssue}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Vol. 01 / No. 01 Inaugural Edition (22 Dispatches)</span>
            </Link>
            <Link
              href={HD_ROUTES.issueArticle('volume-01-issue-01', MONOGRAPH_01_IDENTITY.dispatchSlug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Read Dispatch 17 Executive Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
