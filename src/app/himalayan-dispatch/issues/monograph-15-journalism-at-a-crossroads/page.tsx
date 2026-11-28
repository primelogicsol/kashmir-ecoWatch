import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { MediaFinancialDependencyWorkbench } from '@/components/himalayan-dispatch/MediaFinancialDependencyWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  CAPACITY_BUILDING_RESPONSES_12,
  CITIZEN_JOURNALISM_PRINCIPLES_12,
  DOCUMENTARY_MEMORY_RECORDS_12,
  ENVIRONMENTAL_SCRUTINY_ISSUES_10,
  EVENT_VS_SYSTEM_JOURNALISM_13,
  FINANCIAL_INFLUENCE_INSTRUMENTS_15,
  FIVE_REGION_ACCOUNTABILITY_5,
  GEOSPATIAL_WORKFLOW_STEPS_6,
  getJournalismChaptersByVolume,
  GLOBAL_JOURNALISM_MODELS_9,
  HIMALAYAN_DISPATCH_SELF_SCRUTINY_STANDARD_14,
  HISTORICAL_POLITICAL_MEDIA_PERIODS_8,
  JK_2020_MEDIA_POLICY_QUESTIONS_7,
  JOURNALISM_CROSSROADS_MONOGRAPH_SPEC,
  JOURNALISM_INTEGRITY_CHARTER_20,
  JOURNALISM_VOLUMES_15,
  PRESS_RELEASE_VS_INDEPENDENT_10,
  PRIMARY_DOCUMENTARY_SOURCES_9,
  REACTIVE_VS_PREVENTIVE_10,
  REGIONAL_DIMENSIONS_12,
  RESEARCH_LIMITATIONS_7,
  SECOND_QUESTION_INVESTIGATIONS_10,
  SPECIALIZED_JOURNALISTIC_DESKS_20,
  STAKEHOLDER_POWER_CHAIN_6,
} from '@/data/himalayan-dispatch-journalism-crossroads-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 15 — Journalism at a Crossroads: Why the Western Himalayas Need a New Direction in Journalism (15 Volumes · 90 Chapters) | Himalayan Dispatch',
  description: JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/monograph-15-journalism-at-a-crossroads',
  imagePath: '/images/himalayan-dispatch/journalism-at-a-crossroads-hero.jpg',
});

export default function Monograph15JournalismAtACrossroadsPage() {
  const canonicalPath = '/himalayan-dispatch/issues/monograph-15-journalism-at-a-crossroads';

  // Permanent Editorial Presentation Standard: never display numerical word counts publicly
  const publicMasterSpecs = JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.masterSpecifications.filter(
    (row) => !/manuscript\s*length|word\s*count|\bwords\b/i.test(`${row.component} ${row.target}`)
  );

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.monographCode,
    name: `${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.title}: ${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.subtitle}`,
    description: JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-15-journalism-crossroads-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 15 · Journalism at a Crossroads' },
          ]}
        />

        {/* Monumental Monograph 15 Cover Identity */}
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
              {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.kicker}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              COMPANION TO VOL. 01 / NO. 01 · DISPATCH {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.companionDispatchNumber}
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="inline-block px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
              {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.statusBadge}
            </div>

            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-4xl italic text-[#D8C3A5] leading-snug">
              {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.italicDeck}
            </p>
          </div>

          {/* 6 Exact Hero Metrics (15 Volumes · 90 Chapters · 5 Regions · 20 Desks · 20 Principles · 15 Programmes) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-6 border-y border-[#F2EFE7]/20">
            {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.heroStats.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {m.value}
                </div>
                <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#D8C3A5]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7 space-y-2 text-xs sm:text-sm text-[#F2EFE7]/80">
              <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                BY {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.proposedByline}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.geographicScope} &nbsp;·&nbsp;{' '}
                {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.investigationPeriod}
              </p>
              <p className="hd-folio-meta text-[#A39B8B]">
                EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; 36 MIN READ
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.companionDispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Dispatch 17</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={HD_ROUTES.mediaTransparencyObservatory}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 border border-[#D8C3A5]/45 text-xs font-semibold tracking-[0.16em] uppercase text-[#D8C3A5]"
              >
                <span>Media Transparency Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Monograph 15"
                title={`${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.title}: ${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.subtitle} | Himalayan Dispatch`}
                description={JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Master Specification & Open Dataset Downloads */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">MASTER MONOGRAPH SPECIFICATION</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Intellectual Advancement &amp; Institutional Independence
            </h2>
            <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                    <th className="py-2.5 px-4 hd-folio-meta">Architecture Component</th>
                    <th className="py-2.5 px-4 hd-folio-meta">Investigative Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {publicMasterSpecs.map((row) => (
                    <tr key={row.component}>
                      <td className="py-2.5 px-4 hd-font-body font-semibold">{row.component}</td>
                      <td className="py-2.5 px-4 hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {row.target}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="lg:col-span-5 p-6 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">REPRODUCIBLE RESEARCH REPOSITORY</p>
            <h3 className="hd-font-display text-2xl font-semibold">
              Open Monograph Protocols &amp; Ten Flagship &ldquo;Second Questions&rdquo;
            </h3>
            <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Download the structured 15-volume, 90-chapter protocol ledger or inspect how
              Himalayan Dispatch investigations move beyond official statements to test ecological
              and institutional reality:
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.datasetApiPath}?format=json`}
                className="hd-font-sans inline-flex items-center gap-1.5 px-4 py-2.5 border text-[11px] font-semibold tracking-[0.16em] uppercase"
                style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Download JSON</span>
              </a>
              <a
                href={`${JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.datasetApiPath}?format=csv`}
                className="hd-font-sans inline-flex items-center gap-1.5 px-4 py-2.5 border text-[11px] font-semibold tracking-[0.16em] uppercase"
                style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Download 90-Chapter CSV</span>
              </a>
            </div>
            <div className="pt-3 border-t divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {SECOND_QUESTION_INVESTIGATIONS_10.slice(0, 6).map((item) => (
                <div key={item.dispatchSlug} className="py-2 space-y-0.5">
                  <Link
                    href={HD_ROUTES.issueArticle('volume-01-issue-01', item.dispatchSlug)}
                    className="hd-font-body text-xs font-semibold hover:underline"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {item.investigation} →
                  </Link>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {item.deeperJournalisticQuestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Financial Dependency Workbench */}
        <MediaFinancialDependencyWorkbench variant="observatory" />

        {/* Core Analytical Frameworks Grid (Mountain Knowledge, Event vs System, Press Release vs Independent, Political-Media Nexus) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">TWELVE REGIONAL MOUNTAIN DIMENSIONS</p>
            <h3 className="hd-font-display text-2xl font-semibold">
              Understanding the Mountain System Beyond Daily Politics
            </h3>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {REGIONAL_DIMENSIONS_12.map((d) => (
                <div key={d.regionalDimension} className="py-2 flex flex-col sm:flex-row sm:justify-between gap-1 text-xs sm:text-sm">
                  <span className="hd-font-body font-semibold">{d.regionalDimension}</span>
                  <span className="hd-font-body sm:text-right" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {d.journalisticKnowledgeRequired}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">EVENT REPORTING VS. SYSTEM INVESTIGATION (13)</p>
            <h3 className="hd-font-display text-2xl font-semibold">
              Moving From Single-Day Incidents to Decadal Processes
            </h3>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {EVENT_VS_SYSTEM_JOURNALISM_13.map((row) => (
                <div key={row.conventionalEventReporting} className="py-2 space-y-0.5 text-xs sm:text-sm">
                  <p className="hd-font-body opacity-70">{row.conventionalEventReporting}</p>
                  <p className="hd-font-body font-semibold" style={{ color: 'var(--hd-copper)' }}>
                    → {row.systemBasedInvestigativeJournalism}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">HISTORICAL POLITICAL–MEDIA PERIODS (1947–2026)</p>
            <h3 className="hd-font-display text-2xl font-semibold">
              Proposed Eight-Era Historical Investigation Framework
            </h3>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {HISTORICAL_POLITICAL_MEDIA_PERIODS_8.map((era) => (
                <div key={era.period} className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs sm:text-sm">
                  <span className="hd-font-sans font-semibold tracking-[0.12em]" style={{ color: 'var(--hd-copper)' }}>
                    {era.period}
                  </span>
                  <span className="hd-font-body sm:text-right" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {era.principalInvestigativeFocus}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-kicker">FIFTEEN FINANCIAL INSTRUMENTS TO EXAMINE</p>
              <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {FINANCIAL_INFLUENCE_INSTRUMENTS_15.map((f) => f.instrument).join(' · ')}
              </p>
            </div>
          </div>

          <div className="border p-6 space-y-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">2020 MEDIA POLICY &amp; FIVE-REGION SYMMETRY</p>
            <h3 className="hd-font-display text-2xl font-semibold">
              Consistent Standards Across Successive Administrations &amp; Borders
            </h3>
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {JK_2020_MEDIA_POLICY_QUESTIONS_7.map((q) => (
                <div key={q.investigativeQuestion} className="py-2 flex flex-col sm:flex-row sm:justify-between gap-1 text-xs sm:text-sm">
                  <span className="hd-font-body font-semibold">{q.investigativeQuestion}</span>
                  <span className="hd-font-body sm:text-right" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {q.requiredEvidence}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-kicker">CROSS-BORDER ACCOUNTABILITY REGIONS</p>
              <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {FIVE_REGION_ACCOUNTABILITY_5.map((r) => r.region).join(' · ')} — paired with{' '}
                {STAKEHOLDER_POWER_CHAIN_6.length}-stakeholder institutional power analysis,{' '}
                {PRESS_RELEASE_VS_INDEPENDENT_10.length} press-release contrasts, and{' '}
                {CITIZEN_JOURNALISM_PRINCIPLES_12.length} citizen-journalism dignity standards.
              </p>
            </div>
          </div>
        </section>

        {/* Geospatial, Preventive, Memory & Capacity Strip */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="p-5 border space-y-2" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">GEOSPATIAL WORKFLOW ({GEOSPATIAL_WORKFLOW_STEPS_6.length})</p>
            <h4 className="hd-font-display text-xl font-semibold">Satellite to Public Record</h4>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {GEOSPATIAL_WORKFLOW_STEPS_6.map((s) => `${s.stepNumber}. ${s.title}`).join(' · ')}
            </p>
          </div>
          <div className="p-5 border space-y-2" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">PREVENTIVE JOURNALISM ({REACTIVE_VS_PREVENTIVE_10.length})</p>
            <h4 className="hd-font-display text-xl font-semibold">Risk Before Catastrophe</h4>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Investigating hospital seismic vulnerability, floodplain occupation, dam safety, and
              glacial lakes before disasters arrive.
            </p>
          </div>
          <div className="p-5 border space-y-2" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">INSTITUTIONAL MEMORY ({DOCUMENTARY_MEMORY_RECORDS_12.length})</p>
            <h4 className="hd-font-display text-xl font-semibold">Beyond Expired Headlines</h4>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Preserving DPRs, authorizations, EIAs, procurement files, scientific objections, CAG
              audits, and ecological outcomes across Dal, Habak, Sálim Ali Park, and Naseem Bagh.
            </p>
          </div>
          <div className="p-5 border space-y-2" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
            <p className="hd-kicker">GLOBAL &amp; CAPACITY MODELS ({GLOBAL_JOURNALISM_MODELS_9.length} + {CAPACITY_BUILDING_RESPONSES_12.length})</p>
            <h4 className="hd-font-display text-xl font-semibold">Constructive Support</h4>
            <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Connecting {SPECIALIZED_JOURNALISTIC_DESKS_20.length} specialized desks,{' '}
              {ENVIRONMENTAL_SCRUTINY_ISSUES_10.length} environmental scrutiny domains,{' '}
              {JOURNALISM_INTEGRITY_CHARTER_20.length} integrity principles, and{' '}
              {HIMALAYAN_DISPATCH_SELF_SCRUTINY_STANDARD_14.length} self-scrutiny commitments.
            </p>
          </div>
        </section>

        {/* COMPLETE 15-VOLUME, 90-CHAPTER DIRECTORY */}
        <section className="space-y-10 pt-8 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="max-w-4xl space-y-3">
            <p className="hd-kicker">COMPLETE RESEARCH ARCHITECTURE · VOLUMES I–XV (CHAPTERS 01–90)</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold">
              Fifteen Thematic Volumes &amp; Ninety Proposed Chapter Protocols
            </h2>
            <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Every chapter below represents a structured, open research protocol distinguishing
              authenticated documentary evidence from unresolved investigative questions across
              Kashmir, Jammu, Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan.
            </p>
          </div>

          <div className="space-y-12">
            {JOURNALISM_VOLUMES_15.map((vol) => {
              const chapters = getJournalismChaptersByVolume(vol.volumeRoman);
              return (
                <div
                  key={vol.volumeRoman}
                  id={`volume-${vol.volumeRoman.toLowerCase()}`}
                  className="border p-6 sm:p-8 space-y-6"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div className="space-y-1">
                      <span className="hd-kicker">
                        VOLUME {vol.volumeRoman} &nbsp;·&nbsp; CHAPTERS {vol.chapterRange}
                      </span>
                      <h3 className="hd-font-display text-2xl sm:text-4xl font-semibold">
                        {vol.title}
                      </h3>
                    </div>
                    <span className="hd-folio-meta">{chapters.length} PROPOSED CHAPTERS</span>
                  </div>

                  <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {vol.thematicSummary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={HD_ROUTES.monograph15Chapter(ch.slug)}
                        className="group p-4 border flex flex-col justify-between gap-3 transition-colors hover:border-[#8C3125]"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="hd-font-sans text-[11px] font-semibold tracking-[0.16em] uppercase" style={{ color: 'var(--hd-copper)' }}>
                              CHAPTER {ch.chapterNumber}
                            </span>
                            <span className="hd-folio-meta">{ch.estimatedReadingMinutes} MIN READ</span>
                          </div>
                          <h4 className="hd-font-display text-xl font-semibold leading-snug group-hover:underline underline-offset-4">
                            {ch.title}
                          </h4>
                          <p className="hd-font-body text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--hd-fg-secondary)' }}>
                            {ch.primaryQuestion}
                          </p>
                        </div>
                        <span className="hd-kicker inline-flex items-center gap-1 pt-1">
                          <span>Open Protocol</span>
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

        {/* Primary Documentary Sources & Research Limitations */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">PRIMARY DOCUMENTARY SOURCES (9)</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Verified Reference Archive
            </h2>
            <div className="border divide-y" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              {PRIMARY_DOCUMENTARY_SOURCES_9.map((src) => (
                <div key={src.url} className="p-4 space-y-1">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hd-font-body text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1.5"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    <span>{src.source}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {src.investigativeSignificance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">EVIDENTIARY BOUNDARIES</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Research Limitations
            </h2>
            <div
              className="p-6 border space-y-3"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                Available documentary evidence establishes credible concerns involving political
                pressure, advertising dependency, professional restrictions, and institutional
                vulnerability, while leaving the following questions open for structured primary
                research:
              </p>
              <ul className="space-y-2">
                {RESEARCH_LIMITATIONS_7.map((lim) => (
                  <li key={lim} className="hd-font-body text-xs sm:text-sm flex items-start gap-2" style={{ color: 'var(--hd-fg-secondary)' }}>
                    <span style={{ color: 'var(--hd-copper)' }}>•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
