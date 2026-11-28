import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { AjkRiverJusticeWorkbench } from '@/components/himalayan-dispatch/AjkRiverJusticeWorkbench';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  AJK_EDITORIAL_PRIORITIES_6,
  AJK_RIVERS_MONOGRAPH_SPEC,
  AJK_RIVERS_VOLUMES_12,
  ALL_72_AJK_RIVERS_CHAPTERS,
} from '@/data/himalayan-dispatch-ajk-rivers-monograph';

export const metadata: Metadata = buildPageMetadata({
  title: `${AJK_RIVERS_MONOGRAPH_SPEC.title} — ${AJK_RIVERS_MONOGRAPH_SPEC.monographLabel} | Himalayan Dispatch`,
  description:
    'Monograph 17 research architecture (12 Thematic Volumes · 72 Proposed Chapters) investigating Muzaffarabad’s Neelum–Jhelum river diversion, Mangla Dam submergence and compensation, forest watershed decline, March 2026 mining reversals, spring water security, and post-2005 seismic resilience across all 10 districts of Azad Jammu & Kashmir.',
  canonicalPath: `/himalayan-dispatch/issues/${AJK_RIVERS_MONOGRAPH_SPEC.monographSlug}`,
  publication: 'himalayan-dispatch',
  imagePath:
    '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
});

export default function Monograph17AjkRiversPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Himalayan Dispatch', href: HD_ROUTES.root },
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            {
              label:
                'Monograph 17 · The Rivers That No Longer Belong to Their Valleys',
            },
          ]}
        />

        <header
          className="border-b pb-12 space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="hd-kicker">
              {AJK_RIVERS_MONOGRAPH_SPEC.monographLabel} &nbsp;·&nbsp; AZAD JAMMU &amp; KASHMIR FLAGSHIP
            </span>
            <span className="hd-folio-meta">
              12 VOLUMES · 72 PROPOSED CHAPTERS · ALL 10 AJ&amp;K DISTRICTS
            </span>
          </div>

          <h1
            className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98]"
            style={{ color: 'var(--hd-fg)' }}
          >
            {AJK_RIVERS_MONOGRAPH_SPEC.title}
          </h1>

          <p
            className="hd-font-display text-2xl sm:text-3xl italic max-w-5xl leading-snug"
            style={{ color: 'var(--hd-copper)' }}
          >
            {AJK_RIVERS_MONOGRAPH_SPEC.subtitle}
          </p>

          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed max-w-4xl"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {AJK_RIVERS_MONOGRAPH_SPEC.standfirst}
          </p>

          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            {AJK_RIVERS_MONOGRAPH_SPEC.heroStats.map((st) => (
              <div key={st.label} className="space-y-1">
                <div
                  className="hd-font-display text-4xl sm:text-5xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {st.value}
                </div>
                <div className="hd-folio-meta">{st.label}</div>
              </div>
            ))}
          </div>

          <div
            className="p-5 border-l-2 space-y-2 text-xs sm:text-sm hd-font-body leading-relaxed"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
              color: 'var(--hd-fg-secondary)',
            }}
          >
            <p>{AJK_RIVERS_MONOGRAPH_SPEC.bureauDisclosure}</p>
            <p>{AJK_RIVERS_MONOGRAPH_SPEC.researchLimitationsDisclosure}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <p className="hd-folio-meta">
                BY {AJK_RIVERS_MONOGRAPH_SPEC.bylineDisplay} &nbsp;·&nbsp; OVERSIGHT:{' '}
                {AJK_RIVERS_MONOGRAPH_SPEC.editorialOversight}
              </p>
              <p className="hd-folio-meta">
                {AJK_RIVERS_MONOGRAPH_SPEC.geographicalFocus}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={HD_ROUTES.issueArticle(
                  'volume-01-issue-01',
                  AJK_RIVERS_MONOGRAPH_SPEC.storySlug
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                style={{ backgroundColor: '#8C3125' }}
              >
                <span>Read Flagship AJ&amp;K Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={toKewPlatformUrl(
                  '/earth-human-impact/ajk-river-justice-observatory'
                )}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase"
                style={{
                  borderColor: 'var(--hd-copper)',
                  color: 'var(--hd-copper)',
                }}
              >
                <span>Open KEW AJ&amp;K River Observatory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Six Ranked Regional Editorial Priorities */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="hd-kicker">
              AZAD JAMMU &amp; KASHMIR RESEARCH PROGRAMME · SIX EDITORIAL PRIORITIES
            </span>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Six Interconnected Environmental Justice Investigations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AJK_EDITORIAL_PRIORITIES_6.map((item) => (
              <div
                key={item.priority}
                className="p-5 border space-y-2"
                style={{
                  borderColor:
                    item.priority === '01' || item.priority === '02'
                      ? 'var(--hd-copper)'
                      : 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <span className="hd-kicker">
                  PRIORITY {item.priority} · {item.significance}
                </span>
                <h3
                  className="hd-font-display text-2xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="hd-font-body text-xs leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {item.focus}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Workbench */}
        <AjkRiverJusticeWorkbench variant="editorial" />

        {/* 12 Thematic Volumes & 72 Proposed Chapters */}
        <section className="space-y-8">
          <div
            className="border-b pb-4 space-y-2"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <span className="hd-kicker">
              PROPOSED MONOGRAPH ARCHITECTURE · 12 VOLUMES · 72 CHAPTERS
            </span>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Complete 12-Volume &amp; 72-Chapter Research Blueprint
            </h2>
          </div>

          <div className="space-y-8">
            {AJK_RIVERS_VOLUMES_12.map((vol) => (
              <div
                key={vol.roman}
                className="p-6 border space-y-5"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b pb-3"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div>
                    <span className="hd-kicker">
                      VOLUME {vol.roman} · CHAPTERS {vol.chapterRange}
                    </span>
                    <h3
                      className="hd-font-display text-2xl sm:text-3xl font-semibold mt-1"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {vol.title}
                    </h3>
                  </div>
                  <p
                    className="hd-font-body text-xs max-w-xl"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {vol.scopeSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vol.chapters.map((ch) => {
                    const full = ALL_72_AJK_RIVERS_CHAPTERS.find(
                      (c) => c.number === ch.number
                    );
                    const href = full
                      ? `/himalayan-dispatch/issues/${AJK_RIVERS_MONOGRAPH_SPEC.monographSlug}/chapters/${full.slug}`
                      : '#';
                    return (
                      <Link
                        key={ch.number}
                        href={href}
                        className="p-4 border flex flex-col justify-between space-y-2 group"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1">
                          <span className="hd-folio-meta">CHAPTER {ch.number}</span>
                          <h4
                            className="hd-font-display text-lg font-semibold leading-snug group-hover:underline"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.title}
                          </h4>
                        </div>
                        <span className="hd-kicker inline-flex items-center gap-1 pt-1">
                          <span>Open Protocol</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
