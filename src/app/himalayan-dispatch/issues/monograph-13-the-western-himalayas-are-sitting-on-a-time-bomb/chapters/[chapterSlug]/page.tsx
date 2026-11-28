import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HimalayanTimeBombWorkbench } from '@/components/himalayan-dispatch/HimalayanTimeBombWorkbench';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  ALL_150_TIME_BOMB_CHAPTERS,
  getTimeBombChapterBySlug,
  THE_TIME_BOMB_SPEC,
} from '@/data/himalayan-dispatch-time-bomb-monograph';

export function generateStaticParams() {
  return ALL_150_TIME_BOMB_CHAPTERS.map((ch) => ({ chapterSlug: ch.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const ch = getTimeBombChapterBySlug(chapterSlug);
  if (!ch) {
    return buildPageMetadata({
      title: 'Chapter Not Found — Monograph 13 | Himalayan Dispatch',
      description: 'Requested Monograph 13 chapter dossier was not found.',
      canonicalPath: `/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}/chapters/${chapterSlug}`,
      publication: 'himalayan-dispatch',
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `Chapter ${ch.number}: ${ch.title} — Monograph 13 | Himalayan Dispatch`,
    description: `${ch.investigativeQuestion} (${ch.primaryRecordsAndMethods})`,
    canonicalPath: `/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}/chapters/${ch.slug}`,
    publication: 'himalayan-dispatch',
    imagePath: '/images/hazard-intelligence/hazard-command-center.jpg',
  });
}

export default async function Monograph13ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const ch = getTimeBombChapterBySlug(chapterSlug);
  if (!ch) {
    notFound();
  }

  const idx = ALL_150_TIME_BOMB_CHAPTERS.findIndex((c) => c.slug === ch.slug);
  const prevChapter = idx > 0 ? ALL_150_TIME_BOMB_CHAPTERS[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < ALL_150_TIME_BOMB_CHAPTERS.length - 1
      ? ALL_150_TIME_BOMB_CHAPTERS[idx + 1]
      : null;

  const showWorkbench = [
    '13',
    '18',
    '26',
    '43',
    '61',
    '103',
    '127',
    '128',
    '129',
    '130',
    '131',
    '132',
    '134',
    '148',
    '150',
  ].includes(ch.number);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Himalayan Dispatch', href: HD_ROUTES.root },
            {
              label: 'Monograph 13 · Western Himalayan Time Bomb',
              href: `/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}`,
            },
            { label: `Chapter ${ch.number}` },
          ]}
        />

        <header
          className="border-b pb-8 space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <span className="hd-kicker">
            VOLUME {ch.volumeRoman}: {ch.volumeTitle} &nbsp;·&nbsp; CHAPTER{' '}
            {ch.number} OF 150
          </span>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            {ch.title}
          </h1>
          <p className="hd-folio-meta">{ch.verificationStatus}</p>
        </header>

        <div
          className="p-6 sm:p-8 border space-y-5"
          style={{
            borderColor: 'var(--hd-rule)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-1.5">
            <span className="hd-kicker">CENTRAL INVESTIGATIVE QUESTION</span>
            <p
              className="hd-font-display text-2xl italic"
              style={{ color: 'var(--hd-fg)' }}
            >
              “{ch.investigativeQuestion}”
            </p>
          </div>

          <div
            className="pt-4 border-t space-y-1.5"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <span className="hd-kicker">
              PRIMARY RECORDS, DATASETS &amp; ANALYTICAL METHODS
            </span>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {ch.primaryRecordsAndMethods}
            </p>
          </div>

          <div
            className="pt-4 border-t space-y-1.5"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <span className="hd-kicker">
              NON-PREDICTION &amp; METHODOLOGICAL DISCLOSURE
            </span>
            <p
              className="hd-font-body text-xs leading-relaxed"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              {THE_TIME_BOMB_SPEC.editorialMetaphorDisclosure}{' '}
              {THE_TIME_BOMB_SPEC.researchLimitationsDisclosure}
            </p>
          </div>
        </div>

        {showWorkbench && <HimalayanTimeBombWorkbench variant="editorial" />}

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={HD_ROUTES.issueArticle(
              'volume-01-issue-01',
              THE_TIME_BOMB_SPEC.storySlug
            )}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#F2EFE7]"
            style={{ backgroundColor: '#8C3125' }}
          >
            <span>Read Flagship Dispatch 22</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={toKewPlatformUrl(
              '/hazard-intelligence/multi-hazard-resilience-command-center'
            )}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 border text-xs font-semibold tracking-[0.16em] uppercase"
            style={{
              borderColor: 'var(--hd-copper)',
              color: 'var(--hd-copper)',
            }}
          >
            <span>Open KEW Multi-Hazard Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <nav
          aria-label="Monograph 13 chapter navigation"
          className="pt-8 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={`/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}/chapters/${prevChapter.slug}`}
              className="p-4 border flex-1 group"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <span className="hd-folio-meta inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous · Chapter {prevChapter.number}</span>
              </span>
              <p
                className="hd-font-display text-lg font-semibold mt-1 group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                {prevChapter.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextChapter ? (
            <Link
              href={`/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}/chapters/${nextChapter.slug}`}
              className="p-4 border flex-1 text-right group"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <span className="hd-folio-meta inline-flex items-center justify-end gap-1">
                <span>Next · Chapter {nextChapter.number}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <p
                className="hd-font-display text-lg font-semibold mt-1 group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                {nextChapter.title}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </div>
    </div>
  );
}
