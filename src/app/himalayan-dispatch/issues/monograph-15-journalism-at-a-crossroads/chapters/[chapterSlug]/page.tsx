import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { MediaFinancialDependencyWorkbench } from '@/components/himalayan-dispatch/MediaFinancialDependencyWorkbench';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getAdjacentJournalismChapters,
  getJournalismChapterBySlug,
  JOURNALISM_CHAPTERS_90,
  JOURNALISM_CROSSROADS_MONOGRAPH_SPEC,
} from '@/data/himalayan-dispatch-journalism-crossroads-monograph';

export function generateStaticParams() {
  return JOURNALISM_CHAPTERS_90.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getJournalismChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Protocol Not Found — Monograph 15 | Himalayan Dispatch',
      description: 'Requested Monograph 15 research chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-15-journalism-at-a-crossroads/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.chapterNumber}: ${chapter.title} — Monograph 15 | Himalayan Dispatch`,
    description: chapter.primaryQuestion,
    canonicalPath: `/himalayan-dispatch/issues/monograph-15-journalism-at-a-crossroads/chapters/${chapter.slug}`,
  });
}

export default async function Monograph15ChapterProtocolPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getJournalismChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const { prev: prevChapter, next: nextChapter } = getAdjacentJournalismChapters(chapter.slug);
  const monographHref = HD_ROUTES.monograph15;
  const chapterNumInt = Number(chapter.chapterNumber);
  const showWorkbench =
    chapter.volumeRoman === 'IV' ||
    chapter.volumeRoman === 'XII' ||
    chapterNumInt === 25 ||
    chapterNumInt === 77 ||
    chapterNumInt === 80;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 15 · Journalism at a Crossroads', href: monographHref },
            { label: `Chapter ${chapter.chapterNumber}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            MONOGRAPH 15 &nbsp;·&nbsp; VOLUME {chapter.volumeRoman}: {chapter.volumeTitle}
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            Chapter {chapter.chapterNumber} — {chapter.title}
          </h1>
          <p
            className="hd-font-display text-xl sm:text-2xl italic"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {chapter.subtitle}
          </p>
          <div className="space-y-1 pt-1">
            <p
              className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase"
              style={{ color: 'var(--hd-fg)' }}
            >
              BY {JOURNALISM_CROSSROADS_MONOGRAPH_SPEC.proposedByline}
            </p>
            <p className="hd-folio-meta">
              EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; {chapter.estimatedReadingMinutes} MIN READ
              &nbsp;·&nbsp; {chapter.geographicFocus} &nbsp;·&nbsp; {chapter.investigationPeriod}
            </p>
          </div>
        </header>

        {/* Central Investigative Question */}
        <section
          className="p-6 border-l-2 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">CENTRAL INVESTIGATIVE QUESTION</p>
          <p className="hd-font-display text-2xl sm:text-3xl italic leading-snug">
            {chapter.primaryQuestion}
          </p>
        </section>

        {showWorkbench && <MediaFinancialDependencyWorkbench variant="editorial" />}

        {/* Protocol Details */}
        <section
          className="p-6 sm:p-8 border space-y-6"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-2.5">
            <p className="hd-kicker">ANALYTICAL &amp; INVESTIGATIVE SCOPE</p>
            <ul className="space-y-2">
              {chapter.analyticalScope.map((item, idx) => (
                <li
                  key={idx}
                  className="hd-font-body text-sm sm:text-base flex items-start gap-2.5 leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  <span style={{ color: 'var(--hd-copper)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">PRIMARY DOCUMENTARY EVIDENCE REQUIRED</p>
            <ul className="space-y-2">
              {chapter.primaryDocumentaryEvidence.map((item, idx) => (
                <li
                  key={idx}
                  className="hd-font-body text-sm sm:text-base flex items-start gap-2.5 leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  <span style={{ color: 'var(--hd-copper)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">PROPOSED METHODOLOGICAL APPROACH</p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {chapter.methodologicalApproach}
            </p>
          </div>

          <div className="pt-4 border-t space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">UNRESOLVED QUESTIONS &amp; EVIDENTIARY BOUNDARIES</p>
            <ul className="space-y-2">
              {chapter.unresolvedQuestions.map((item, idx) => (
                <li
                  key={idx}
                  className="hd-font-body text-sm sm:text-base flex items-start gap-2.5 leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  <span style={{ color: 'var(--hd-copper)' }}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-6" style={{ borderColor: 'var(--hd-rule)' }}>
            <div className="space-y-1.5">
              <p className="hd-kicker">STANDING RIGHT OF RESPONSE</p>
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {chapter.rightOfResponseEntities.join(' · ')}
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="hd-kicker">EDITORIAL SYNTHESIS</p>
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {chapter.keyTakeaway}
              </p>
            </div>
          </div>
        </section>

        {/* Chapter Pagination */}
        <nav
          className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monograph15Chapter(prevChapter.slug)}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Ch. {prevChapter.chapterNumber}: {prevChapter.title}
              </span>
            </Link>
          ) : (
            <Link
              href={monographHref}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Monograph 15 Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={HD_ROUTES.monograph15Chapter(nextChapter.slug)}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline sm:ml-auto"
              style={{ color: 'var(--hd-copper)' }}
            >
              <span>
                Ch. {nextChapter.chapterNumber}: {nextChapter.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={HD_ROUTES.mediaTransparencyObservatory}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline sm:ml-auto"
              style={{ color: 'var(--hd-copper)' }}
            >
              <span>Media Transparency Observatory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
