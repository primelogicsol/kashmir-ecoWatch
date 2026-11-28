import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { WhempManifestoWorkbench } from '@/components/himalayan-dispatch/WhempManifestoWorkbench';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getMonograph04ChapterBySlug,
  MONOGRAPH_04_CHAPTERS_75,
  WHEN_POLITICS_PROMISES_GREEN_SPEC,
} from '@/data/himalayan-dispatch-when-politics-promises-green-monograph';

export function generateStaticParams() {
  return MONOGRAPH_04_CHAPTERS_75.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getMonograph04ChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Protocol Not Found — Monograph 06 | Himalayan Dispatch',
      description: 'Requested Monograph 06 chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-06-when-politics-promises-green/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `Chapter ${chapter.number}: ${chapter.title} — Monograph 06 | Himalayan Dispatch`,
    description: chapter.investigativeScope,
    canonicalPath: `/himalayan-dispatch/issues/monograph-06-when-politics-promises-green/chapters/${chapter.slug}`,
  });
}

export default async function Monograph06ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getMonograph04ChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const idx = MONOGRAPH_04_CHAPTERS_75.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = idx > 0 ? MONOGRAPH_04_CHAPTERS_75[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < MONOGRAPH_04_CHAPTERS_75.length - 1
      ? MONOGRAPH_04_CHAPTERS_75[idx + 1]
      : null;

  const monographHref = HD_ROUTES.issue('monograph-06-when-politics-promises-green');

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1040px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 06', href: monographHref },
            { label: `Chapter ${chapter.number}` },
          ]}
        />

        <header className="pb-8 border-b space-y-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <p className="hd-kicker">
            {WHEN_POLITICS_PROMISES_GREEN_SPEC.monographCode} &nbsp;·&nbsp;{' '}
            {chapter.volumeRoman}: {chapter.volumeTitle}
          </p>
          <h1 className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight" style={{ color: 'var(--hd-fg)' }}>
            Chapter {chapter.number} — {chapter.title}
          </h1>
          <p className="hd-folio-meta">
            PROPOSED MONOGRAPH CHAPTER PROTOCOL · FIVE-REGION ARCHIVE (2000–2026)
          </p>
        </header>

        <section
          className="p-6 sm:p-8 border space-y-5"
          style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
        >
          <div className="space-y-2">
            <p className="hd-kicker">INVESTIGATIVE SCOPE</p>
            <p className="hd-font-body text-base sm:text-lg leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {chapter.investigativeScope}
            </p>
          </div>
          <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">EVIDENTIARY &amp; NON-PARTISAN VERIFICATION PROTOCOL</p>
            <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {chapter.evidentiaryProtocol}
            </p>
          </div>
          <p className="pt-4 border-t text-xs italic hd-font-body" style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}>
            {WHEN_POLITICS_PROMISES_GREEN_SPEC.researchStatusDisclosure}
          </p>
        </section>

        {chapter.volumeRoman === 'VOLUME XIV' && <WhempManifestoWorkbench />}

        <nav className="pt-6 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          {prevChapter ? (
            <Link href={`${monographHref}/chapters/${prevChapter.slug}`} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ch. {prevChapter.number}: {prevChapter.title}</span>
            </Link>
          ) : (
            <Link href={monographHref} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Monograph 06 Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link href={`${monographHref}/chapters/${nextChapter.slug}`} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <span>Ch. {nextChapter.number}: {nextChapter.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={HD_ROUTES.issueArticle('volume-01-issue-01', 'when-politics-promises-green')}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Read Flagship Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
