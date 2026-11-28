import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FileSpreadsheet, FlaskConical } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { LadakhEcologicalFrontiersWorkbench } from '@/components/himalayan-dispatch/LadakhEcologicalFrontiersWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  getLadakhChaptersByInvestigation,
  LADAKH_ECOLOGICAL_FRONTIERS_SPEC,
  LADAKH_INVESTIGATIONS_3,
  LADAKH_OBSERVATORY_MODULES_12,
  LADAKH_PRIMARY_SOURCES_8,
  LADAKH_RESEARCH_LIMITATIONS_6,
} from '@/data/himalayan-dispatch-ladakh-frontiers-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    "Ladakh's Ecological Frontiers — Dedicated Scientific Issue (3 Investigations · 45 Chapters · 21 Experiments) | Himalayan Dispatch",
  description: LADAKH_ECOLOGICAL_FRONTIERS_SPEC.extendedSubtitle,
  canonicalPath: '/himalayan-dispatch/issues/ladakhs-ecological-frontiers',
  imagePath: '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
});

export default function LadakhEcologicalFrontiersIssuePage() {
  const canonicalPath = '/himalayan-dispatch/issues/ladakhs-ecological-frontiers';

  const issueSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: LADAKH_ECOLOGICAL_FRONTIERS_SPEC.volumeLabel,
    name: `${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.title}: ${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.subtitle}`,
    description: LADAKH_ECOLOGICAL_FRONTIERS_SPEC.extendedSubtitle,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: LADAKH_ECOLOGICAL_FRONTIERS_SPEC.proposedByline,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-issue-ladakh-ecological-frontiers-jsonld" data={issueSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: "Special Scientific Issue · Ladakh's Ecological Frontiers" },
          ]}
        />

        {/* Monumental Cover Spread */}
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
              {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.kicker}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.volumeLabel}
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <div className="inline-block px-2.5 py-1 border border-[#D8C3A5]/35 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
              {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.statusBadge}
            </div>

            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-4xl italic text-[#D8C3A5] leading-snug">
              {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/85 leading-relaxed max-w-4xl">
              {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.extendedSubtitle}
            </p>
          </div>

          {/* 6 Hero Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 py-6 border-y border-[#F2EFE7]/20">
            {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.heroStats.map((m) => (
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
                BY {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.proposedByline}
              </p>
              <p className="hd-font-body text-[#F2EFE7]/75">
                {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.geographicalScope}
              </p>
              <p className="hd-folio-meta text-[#A39B8B]">
                EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; 34 MIN READ
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'ladakhs-ecological-frontiers',
                  'when-the-glaciers-stop-giving'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Investigation 01</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl(LADAKH_ECOLOGICAL_FRONTIERS_SPEC.kewObservatoryPath)}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-3 border border-[#D8C3A5]/45 text-xs font-semibold tracking-[0.16em] uppercase text-[#D8C3A5]"
              >
                <span>KEW Ladakh Observatory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <KewContentShare
                variant="editorial-button"
                surfaceTone="darkplate"
                label="Share Ladakh Issue"
                title={`${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.title}: ${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.subtitle} | Himalayan Dispatch`}
                description={LADAKH_ECOLOGICAL_FRONTIERS_SPEC.extendedSubtitle}
                canonicalPath={canonicalPath}
                isPublished
              />
            </div>
          </div>
        </header>

        {/* Three Flagship Scientific Dispatches Overview Cards */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <div>
              <p className="hd-kicker">THREE FLAGSHIP SCIENTIFIC INVESTIGATIONS IN THIS ISSUE</p>
              <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold">
                Cryospheric Water, Carrying Capacity &amp; Cold-Desert Integrity
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.datasetApiPath}?format=json`}
                className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>JSON Framework</span>
              </a>
              <a
                href={`${LADAKH_ECOLOGICAL_FRONTIERS_SPEC.datasetApiPath}?format=csv`}
                className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>45-Chapter CSV</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LADAKH_INVESTIGATIONS_3.map((inv) => {
              const articleHref = HD_ROUTES.issueArticle(
                'ladakhs-ecological-frontiers',
                inv.dispatchSlug
              );
              return (
                <article
                  key={inv.id}
                  className="p-6 sm:p-7 border flex flex-col justify-between gap-6"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="space-y-3">
                    <span className="hd-kicker">{inv.kicker}</span>
                    <h3 className="hd-font-display text-3xl font-semibold leading-tight">
                      <Link href={articleHref} className="hover:underline underline-offset-4">
                        {inv.investigationNumber}. {inv.title}
                      </Link>
                    </h3>
                    <p className="hd-font-display text-lg italic" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {inv.subtitle}
                    </p>
                    <p className="hd-folio-meta">{inv.geographicalCoverage}</p>
                    <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {inv.empiricalAnchorSummary}
                    </p>
                    <div
                      className="p-3.5 border-l-2 space-y-1"
                      style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}
                    >
                      <span className="hd-folio-meta block" style={{ color: 'var(--hd-copper)' }}>
                        CENTRAL RESEARCH HYPOTHESIS
                      </span>
                      <p className="hd-font-body text-xs leading-relaxed">
                        {inv.centralHypothesis}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="hd-folio-meta">15 CHAPTERS · 7 EXPERIMENTS</span>
                    <Link
                      href={articleHref}
                      className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>Read Full Investigation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Interactive Ladakh Cold-Desert Scientific Workbench */}
        <LadakhEcologicalFrontiersWorkbench variant="observatory" />

        {/* Complete 45-Chapter & 21-Experiment Architecture Grouped by Investigation */}
        <section className="space-y-14 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="max-w-4xl space-y-2">
            <p className="hd-kicker">SCIENTIFIC INVESTIGATION FRAMEWORKS &amp; PROPOSED EXPERIMENTS</p>
            <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold">
              Forty-Five Research Chapters &amp; Twenty-One Proposed Scientific Experiments
            </h2>
          </div>

          {LADAKH_INVESTIGATIONS_3.map((inv) => {
            const chapters = getLadakhChaptersByInvestigation(inv.investigationNumber);
            return (
              <div
                key={inv.id}
                id={inv.id}
                className="border p-6 sm:p-8 lg:p-10 space-y-8"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="space-y-1.5">
                    <span className="hd-kicker">
                      INVESTIGATION {inv.investigationNumber} · 15 CHAPTERS &amp; 7 PROPOSED EXPERIMENTS
                    </span>
                    <h3 className="hd-font-display text-3xl sm:text-4xl font-semibold">
                      {inv.title}
                    </h3>
                    <p className="hd-font-body text-sm sm:text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {inv.subtitle} — <em>{inv.geographicalCoverage}</em>
                    </p>
                  </div>
                  <Link
                    href={HD_ROUTES.issueArticle('ladakhs-ecological-frontiers', inv.dispatchSlug)}
                    className="hd-font-sans inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#F2EFE7] shrink-0"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>Read Dispatch {inv.investigationNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 7 Proposed Original Scientific Experiments */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                    <span className="hd-kicker">
                      SEVEN PROPOSED ORIGINAL SCIENTIFIC EXPERIMENTS (PROTOCOLS IN DEVELOPMENT)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {inv.proposedExperiments.map((exp) => (
                      <div
                        key={exp.code}
                        className="p-4 border space-y-1"
                        style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
                      >
                        <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                          {exp.code}
                        </span>
                        <h4 className="hd-font-display text-lg font-semibold">{exp.title}</h4>
                        <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                          {exp.methodology}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 15 Chapters Grid */}
                <div className="space-y-3">
                  <span className="hd-kicker block">FIFTEEN SCIENTIFIC RESEARCH CHAPTERS</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={HD_ROUTES.ladakhEcologicalFrontiersChapter(ch.slug)}
                        className="group p-4 border flex flex-col justify-between gap-3 transition-colors hover:border-[#8C3125]"
                        style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span
                              className="hd-font-sans text-[11px] font-semibold tracking-[0.16em] uppercase"
                              style={{ color: 'var(--hd-copper)' }}
                            >
                              CHAPTER {ch.investigationChapterNumber}
                            </span>
                            <span className="hd-folio-meta">
                              {ch.estimatedReadingMinutes} MIN READ
                            </span>
                          </div>
                          <h4 className="hd-font-display text-xl font-semibold leading-snug group-hover:underline underline-offset-4">
                            {ch.title}
                          </h4>
                          <p className="hd-font-body text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--hd-fg-secondary)' }}>
                            {ch.primaryQuestion}
                          </p>
                        </div>
                        <span className="hd-kicker inline-flex items-center gap-1">
                          <span>Open Chapter Protocol</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* 12 Observatory Modules, Primary Sources & Research Limitations */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">PRIMARY SCIENTIFIC &amp; OFFICIAL SOURCES (8)</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Empirical Synthesis &amp; Governance Record
            </h2>
            <div className="border divide-y" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              {LADAKH_PRIMARY_SOURCES_8.map((src) => (
                <div key={src.source} className="p-4 space-y-1">
                  <p className="hd-font-body text-sm font-semibold" style={{ color: 'var(--hd-copper)' }}>
                    {src.source}
                  </p>
                  <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {src.significance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">EVIDENTIARY &amp; FIELD LIMITATIONS</p>
            <h2 className="hd-font-display text-3xl font-semibold">
              Methodological Guardrails ({LADAKH_OBSERVATORY_MODULES_12.length} KEW Modules)
            </h2>
            <div
              className="p-6 border space-y-3"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <ul className="space-y-2">
                {LADAKH_RESEARCH_LIMITATIONS_6.map((lim) => (
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
