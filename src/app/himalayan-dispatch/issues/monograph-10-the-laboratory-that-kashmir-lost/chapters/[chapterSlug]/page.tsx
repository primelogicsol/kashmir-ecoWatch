import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HabakLaboratoryWorkbench } from '@/components/himalayan-dispatch/HabakLaboratoryWorkbench';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  ALL_90_HABAK_CHAPTERS,
  getHabakMonographChapterBySlug,
  HABAK_LABORATORY_SPEC,
} from '@/data/himalayan-dispatch-habak-laboratory-monograph';

export function generateStaticParams() {
  return ALL_90_HABAK_CHAPTERS.map((ch) => ({ chapterSlug: ch.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const ch = getHabakMonographChapterBySlug(chapterSlug);
  if (!ch) {
    return buildPageMetadata({
      title: 'Chapter Not Found — Monograph 10 | Himalayan Dispatch',
      description: 'Requested Monograph 10 chapter dossier was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost/chapters/${chapterSlug}`,
      publication: 'himalayan-dispatch',
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `Chapter ${ch.number}: ${ch.title} — Monograph 10 | Himalayan Dispatch`,
    description: `${ch.investigativeQuestion} (${ch.primaryRecordsAndMethods})`,
    canonicalPath: `/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost/chapters/${ch.slug}`,
    publication: 'himalayan-dispatch',
    imagePath: '/images/environmental-calendar/calendar-hero-scientists-lab.jpg',
  });
}

export default async function Monograph10ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const ch = getHabakMonographChapterBySlug(chapterSlug);
  if (!ch) {
    notFound();
  }

  const idx = ALL_90_HABAK_CHAPTERS.findIndex((c) => c.slug === ch.slug);
  const prevChapter = idx > 0 ? ALL_90_HABAK_CHAPTERS[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < ALL_90_HABAK_CHAPTERS.length - 1 ? ALL_90_HABAK_CHAPTERS[idx + 1] : null;

  const showWorkbench = ['41', '47', '49', '50', '83', '85', '86', '89'].includes(ch.number);

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Himalayan Dispatch', href: HD_ROUTES.root },
            {
              label: 'Monograph 10 · Habak Laboratory',
              href: '/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost',
            },
            { label: `Chapter ${ch.number}` },
          ]}
        />

        <header
          className="border-b pb-8 space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <span className="hd-kicker">
            VOLUME {ch.volumeRoman}: {ch.volumeTitle} &nbsp;·&nbsp; CHAPTER {ch.number} OF 90
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
            <span className="hd-kicker">PRIMARY RECORDS, DATASETS &amp; ANALYTICAL METHODS</span>
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
            <span className="hd-kicker">SCOPE &amp; EVIDENTIARY DISCLOSURE</span>
            <p
              className="hd-font-body text-xs leading-relaxed"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              {HABAK_LABORATORY_SPEC.researchLimitationsDisclosure}
            </p>
          </div>
        </div>

        {showWorkbench && <HabakLaboratoryWorkbench />}

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={HD_ROUTES.issueArticle('volume-01-issue-01', HABAK_LABORATORY_SPEC.storySlug)}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#F2EFE7]"
            style={{ backgroundColor: '#8C3125' }}
          >
            <span>Read Flagship Dispatch 05</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={toKewPlatformUrl('/governance/scientific-infrastructure-observatory')}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 border text-xs font-semibold tracking-[0.16em] uppercase"
            style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
          >
            <span>Open KEW Scientific Infrastructure Observatory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Prev / Next Chapter Navigation */}
        <nav
          aria-label="Monograph 10 chapter navigation"
          className="pt-8 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={`/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost/chapters/${prevChapter.slug}`}
              className="p-4 border flex-1 group"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <span className="hd-folio-meta inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> PREVIOUS · CHAPTER {prevChapter.number}
              </span>
              <div
                className="hd-font-display text-lg font-semibold mt-1 group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                {prevChapter.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextChapter ? (
            <Link
              href={`/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost/chapters/${nextChapter.slug}`}
              className="p-4 border flex-1 text-right group"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <span className="hd-folio-meta inline-flex items-center gap-1 justify-end">
                NEXT · CHAPTER {nextChapter.number} <ArrowRight className="w-3 h-3" />
              </span>
              <div
                className="hd-font-display text-lg font-semibold mt-1 group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                {nextChapter.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>
      </div>
    </div>
  );
}
