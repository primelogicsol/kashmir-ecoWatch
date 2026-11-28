import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, ShieldAlert } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { GilgitBaltistanMineralWorkbench } from '@/components/himalayan-dispatch/GilgitBaltistanMineralWorkbench';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  GB_MINERAL_EXTERNAL_DATA_SOURCES_12,
  GB_MINERAL_MONOGRAPH_CHAPTERS_108,
  GB_MINERAL_MONOGRAPH_VOLUMES_18,
  WEALTH_BENEATH_MOUNTAINS_SPEC,
} from '@/data/himalayan-dispatch-wealth-beneath-mountains-monograph';

export const metadata: Metadata = buildPageMetadata({
  title:
    'Monograph 16 — The Wealth Beneath the Mountains (18 Volumes · 108 Chapters) | Himalayan Dispatch',
  description: `${WEALTH_BENEATH_MOUNTAINS_SPEC.subtitle} — ${WEALTH_BENEATH_MOUNTAINS_SPEC.italicDeck}`,
  canonicalPath: '/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains',
  imagePath: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
});

export default function Monograph16WealthBeneathMountainsPage() {
  const canonicalPath =
    '/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains';

  const monographSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: WEALTH_BENEATH_MOUNTAINS_SPEC.monographCode,
    name: `${WEALTH_BENEATH_MOUNTAINS_SPEC.title}: ${WEALTH_BENEATH_MOUNTAINS_SPEC.subtitle}`,
    description: WEALTH_BENEATH_MOUNTAINS_SPEC.italicDeck,
    datePublished: '2026-11-28',
    author: {
      '@type': 'Organization',
      name: `${WEALTH_BENEATH_MOUNTAINS_SPEC.bylineDisplay} (${WEALTH_BENEATH_MOUNTAINS_SPEC.deskAttribution})`,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id="hd-monograph-16-jsonld" data={monographSchema} />
      <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-20">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 16 · The Wealth Beneath the Mountains' },
          ]}
        />

        {/* Cover Header */}
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
              {WEALTH_BENEATH_MOUNTAINS_SPEC.monographCode}
            </span>
            <span className="hd-font-sans text-[11px] tracking-[0.2em] uppercase text-[#A39B8B]">
              {WEALTH_BENEATH_MOUNTAINS_SPEC.dateline}
            </span>
          </div>

          <div className="max-w-5xl space-y-4">
            <p className="hd-font-sans text-xs tracking-[0.24em] uppercase text-[#D8C3A5]">
              {WEALTH_BENEATH_MOUNTAINS_SPEC.kicker}
            </p>
            <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
              {WEALTH_BENEATH_MOUNTAINS_SPEC.title}
            </h1>
            <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5] leading-snug">
              {WEALTH_BENEATH_MOUNTAINS_SPEC.subtitle}
            </p>
            <p className="hd-font-body text-base sm:text-lg italic text-[#F2EFE7]/85 max-w-4xl leading-relaxed">
              {WEALTH_BENEATH_MOUNTAINS_SPEC.leadStandfirst}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2 border-t border-[#F2EFE7]/15">
            {WEALTH_BENEATH_MOUNTAINS_SPEC.heroStats.map((st) => (
              <div
                key={st.label}
                className="p-5 border border-[#F2EFE7]/15 bg-[#201F1D] space-y-1"
              >
                <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                  {st.value}
                </div>
                <p className="hd-font-sans text-[11px] tracking-[0.18em] uppercase text-[#D8C3A5]">
                  {st.label}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F2EFE7]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#F2EFE7]/80">
            <div>
              <span className="hd-font-sans font-semibold uppercase tracking-[0.18em] text-[#D8C3A5]">
                BY {WEALTH_BENEATH_MOUNTAINS_SPEC.bylineDisplay}
              </span>{' '}
              &nbsp;·&nbsp; {WEALTH_BENEATH_MOUNTAINS_SPEC.deskAttribution}
            </div>
            <div className="hd-font-sans text-[11px] uppercase tracking-[0.16em] text-[#A39B8B]">
              EDITORIAL OVERSIGHT: {WEALTH_BENEATH_MOUNTAINS_SPEC.editorialOversight}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  WEALTH_BENEATH_MOUNTAINS_SPEC.dispatchSlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Flagship Dispatch Narrative</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={toKewPlatformUrl(
                  '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10"
              >
                <span>Open KEW GB Mineral Observatory (18 Registries)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <KewContentShare
              variant="editorial-button"
              surfaceTone="darkplate"
              label="Share Monograph 16"
              title={`${WEALTH_BENEATH_MOUNTAINS_SPEC.title} — Monograph 16 (18 Volumes · 108 Chapters)`}
              description={WEALTH_BENEATH_MOUNTAINS_SPEC.italicDeck}
              canonicalPath={canonicalPath}
              isPublished
            />
          </div>
        </header>

        {/* Research Status, Gazette Verification & Regional Attribution Notice */}
        <section
          className="p-6 sm:p-8 border-l-4 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <p className="hd-kicker">
              RESEARCH STATUS, GAZETTE VERIFICATION &amp; REGIONAL BYLINE INTEGRITY
            </p>
          </div>
          <p
            className="hd-font-body text-sm leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {WEALTH_BENEATH_MOUNTAINS_SPEC.researchLimitationsNote}
          </p>
        </section>

        {/* Interactive Extractive Governance & Value-Retention Workbench */}
        <GilgitBaltistanMineralWorkbench variant="editorial" />

        {/* 18 Thematic Volumes & 108 Proposed Research Chapters */}
        <section className="space-y-10">
          <div className="space-y-2 border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <p className="hd-kicker">
              COMPLETE RESEARCH ARCHITECTURE · 18 THEMATIC VOLUMES · 108 PROPOSED CHAPTERS
            </p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Geological, Legal, Hydrological &amp; Value-Retention Programme
            </h2>
          </div>

          <div className="space-y-10">
            {GB_MINERAL_MONOGRAPH_VOLUMES_18.map((vol) => {
              const volChapters = GB_MINERAL_MONOGRAPH_CHAPTERS_108.filter(
                (ch) => ch.volumeRoman === vol.volumeRoman
              );
              return (
                <div
                  key={vol.volumeRoman}
                  className="p-6 sm:p-8 border space-y-6"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="hd-kicker">
                      VOLUME {vol.volumeRoman} &nbsp;·&nbsp; {vol.chapterRange}
                    </span>
                    <h3
                      className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {vol.investigationTitle}
                    </h3>
                  </div>

                  <p
                    className="hd-font-body text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.analyticalScope}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {volChapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={HD_ROUTES.monographWealthBeneathMountainsChapter(ch.slug)}
                        className="p-4 border group flex flex-col justify-between space-y-3 transition-colors hover:border-[#8C3125]"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1.5">
                          <span className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                            CHAPTER {ch.number}
                          </span>
                          <h4
                            className="hd-font-display text-lg font-semibold leading-snug group-hover:underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.title}
                          </h4>
                          <p
                            className="hd-font-body text-xs leading-relaxed"
                            style={{ color: 'var(--hd-fg-secondary)' }}
                          >
                            {ch.geologicalAndGovernanceFocus}
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

        {/* 12 External Data Sources */}
        <section className="space-y-4 pt-6 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <p className="hd-kicker">TWELVE PRIMARY &amp; CANDIDATE DATA REPOSITORIES</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {GB_MINERAL_EXTERNAL_DATA_SOURCES_12.map((src) => (
              <a
                key={src.source}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border space-y-1.5 hover:border-[#8C3125] transition-colors block"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="hd-font-body text-xs font-bold" style={{ color: 'var(--hd-fg)' }}>
                    {src.source}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                </div>
                <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {src.application}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
