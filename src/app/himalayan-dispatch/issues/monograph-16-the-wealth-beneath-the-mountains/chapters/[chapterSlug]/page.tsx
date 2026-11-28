import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  GB_MINERAL_MONOGRAPH_CHAPTERS_108,
  getGbMineralChapterBySlug,
  WEALTH_BENEATH_MOUNTAINS_SPEC,
} from '@/data/himalayan-dispatch-wealth-beneath-mountains-monograph';

export function generateStaticParams() {
  return GB_MINERAL_MONOGRAPH_CHAPTERS_108.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const ch = getGbMineralChapterBySlug(chapterSlug);
  if (!ch) {
    return buildPageMetadata({
      title: 'Chapter Not Found — Monograph 16 | Himalayan Dispatch',
      description: 'Requested Monograph 16 chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `Ch. ${ch.number}: ${ch.title} — Monograph 16 | Himalayan Dispatch`,
    description: ch.geologicalAndGovernanceFocus,
    canonicalPath: `/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains/chapters/${ch.slug}`,
    imagePath: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
  });
}

export default async function Monograph16ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const ch = getGbMineralChapterBySlug(chapterSlug);
  if (!ch) {
    notFound();
  }

  const idx = GB_MINERAL_MONOGRAPH_CHAPTERS_108.findIndex((c) => c.slug === ch.slug);
  const prevCh = idx > 0 ? GB_MINERAL_MONOGRAPH_CHAPTERS_108[idx - 1] : null;
  const nextCh =
    idx >= 0 && idx < GB_MINERAL_MONOGRAPH_CHAPTERS_108.length - 1
      ? GB_MINERAL_MONOGRAPH_CHAPTERS_108[idx + 1]
      : null;

  const canonicalPath = `/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains/chapters/${ch.slug}`;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            {
              label: 'Monograph 16 · Wealth Beneath the Mountains',
              href: HD_ROUTES.monographWealthBeneathMountains,
            },
            { label: `Chapter ${ch.number}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            MONOGRAPH 16 · VOLUME {ch.volumeRoman} ({ch.volumeTitle}) · CHAPTER {ch.number} OF 108
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            {ch.title}
          </h1>
          <p className="hd-folio-meta">
            BY {WEALTH_BENEATH_MOUNTAINS_SPEC.bylineDisplay} &nbsp;·&nbsp; EDITORIAL OVERSIGHT:{' '}
            {WEALTH_BENEATH_MOUNTAINS_SPEC.editorialOversight}
          </p>
          <p
            className="hd-font-body text-sm uppercase tracking-wider"
            style={{ color: 'var(--hd-copper)' }}
          >
            {ch.researchStatus}
          </p>
          <KewContentShare
            variant="article-toolbar"
            label="Share Chapter Protocol"
            title={`Ch. ${ch.number}: ${ch.title} — Monograph 16`}
            description={ch.geologicalAndGovernanceFocus}
            canonicalPath={canonicalPath}
            isPublished
          />
        </header>

        <section className="space-y-6">
          <div
            className="p-6 border space-y-3"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">GEOLOGICAL, ENVIRONMENTAL &amp; GOVERNANCE SCOPE</p>
            <p
              className="hd-font-body text-base leading-relaxed"
              style={{ color: 'var(--hd-fg)' }}
            >
              {ch.geologicalAndGovernanceFocus}
            </p>
          </div>

          <div
            className="p-6 border space-y-3"
            style={{
              borderColor: 'var(--hd-rule)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">PRIMARY EVIDENCE, ASSAYS &amp; AUDIT METHODS</p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {ch.primaryEvidenceAndMethods}
            </p>
          </div>

          <div
            className="p-5 border-l-4 text-xs sm:text-sm leading-relaxed"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
              color: 'var(--hd-fg-secondary)',
            }}
          >
            {WEALTH_BENEATH_MOUNTAINS_SPEC.researchLimitationsNote}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={HD_ROUTES.issueArticle(
                'volume-01-issue-01',
                WEALTH_BENEATH_MOUNTAINS_SPEC.dispatchSlug
              )}
              className="hd-kicker underline"
            >
              Read Flagship Dispatch →
            </Link>
            <a
              href={toKewPlatformUrl(
                '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory'
              )}
              className="hd-kicker inline-flex items-center gap-1 underline"
            >
              <span>Open KEW Gilgit-Baltistan Mineral Observatory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        <nav
          className="pt-8 border-t flex items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevCh ? (
            <Link
              href={HD_ROUTES.monographWealthBeneathMountainsChapter(prevCh.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ch. {prevCh.number}</span>
            </Link>
          ) : (
            <span />
          )}

          <Link
            href={HD_ROUTES.monographWealthBeneathMountains}
            className="hd-folio-meta hover:underline"
          >
            All 108 Chapters
          </Link>

          {nextCh ? (
            <Link
              href={HD_ROUTES.monographWealthBeneathMountainsChapter(nextCh.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Ch. {nextCh.number}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
