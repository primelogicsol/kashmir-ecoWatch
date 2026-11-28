import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { DalLakeEncroachmentWorkbench } from '@/components/himalayan-dispatch/DalLakeEncroachmentWorkbench';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  ART_OF_ENCROACHMENT_MONOGRAPH_SPEC,
  ENCROACHMENT_CHAPTERS_100,
  getEncroachmentAdjacentChapters,
  getEncroachmentChapterBySlug,
} from '@/data/himalayan-dispatch-art-of-encroachment-monograph';

export function generateStaticParams() {
  return ENCROACHMENT_CHAPTERS_100.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getEncroachmentChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Protocol Not Found — Monograph 11 | Himalayan Dispatch',
      description: 'Requested Monograph 11 research chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-11-the-art-of-encroachment/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.code}: ${chapter.title} — Monograph 11 | Himalayan Dispatch`,
    description: chapter.executiveSummary[0] || chapter.deliverable,
    canonicalPath: `/himalayan-dispatch/issues/monograph-11-the-art-of-encroachment/chapters/${chapter.slug}`,
  });
}

export default async function Monograph11ChapterProtocolPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getEncroachmentChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const { previous: prevChapter, next: nextChapter } = getEncroachmentAdjacentChapters(
    chapter.slug
  );
  const monographHref = HD_ROUTES.monograph11;
  const estimatedReadMins = Math.max(
    4,
    Math.round(
      [
        ...chapter.executiveSummary,
        ...chapter.investigativeQuestions,
        ...chapter.evidenceAndMethods,
        chapter.deliverable,
        chapter.methodologicalCaveat,
      ]
        .join(' ')
        .split(/\s+/).length / 200
    )
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 11 · The Art of Encroachment', href: monographHref },
            { label: `Chapter ${chapter.code}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            MONOGRAPH 11 &nbsp;·&nbsp; VOLUME {chapter.volumeRoman}: {chapter.volumeTitle}
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            Chapter {chapter.code} — {chapter.title}
          </h1>
          <div className="space-y-1 pt-1">
            <p
              className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase"
              style={{ color: 'var(--hd-fg)' }}
            >
              BY {ART_OF_ENCROACHMENT_MONOGRAPH_SPEC.proposedByline}
            </p>
            <p className="hd-folio-meta">
              EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; {estimatedReadMins} MIN READ &nbsp;·&nbsp;{' '}
              {chapter.researchStatus.toUpperCase()}
            </p>
          </div>
        </header>

        {/* Executive Protocol Narrative */}
        <section className="hd-prose">
          {chapter.executiveSummary.map((p, idx) => (
            <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
              {p}
            </p>
          ))}
        </section>

        {/* Interactive Forensic Calculators on Property Valuation, CAG Loss & Net Recovery Chapters */}
        {(chapter.number === 45 ||
          chapter.number === 58 ||
          chapter.number === 59 ||
          chapter.number === 93 ||
          chapter.number === 96) && <DalLakeEncroachmentWorkbench />}

        {/* Structured Chapter Protocol */}
        <section
          className="p-6 sm:p-8 border space-y-6"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-2.5">
            <p className="hd-kicker">PRINCIPAL INVESTIGATIVE QUESTIONS</p>
            <ul className="space-y-2">
              {chapter.investigativeQuestions.map((item, idx) => (
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
            <p className="hd-kicker">PRIMARY RECORDS, SATELLITE DATASETS &amp; METHODS</p>
            <ul className="space-y-2">
              {chapter.evidenceAndMethods.map((item, idx) => (
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

          <div className="pt-4 border-t space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">TARGET FORENSIC DELIVERABLE</p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed font-medium"
              style={{ color: 'var(--hd-fg)' }}
            >
              {chapter.deliverable}
            </p>
          </div>
        </section>

        {/* Methodological Guardrail */}
        <section
          className="p-5 sm:p-6 border-l-2 space-y-1.5"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">METHODOLOGICAL CAVEAT &amp; EVIDENTIARY BOUNDARY</p>
          <p
            className="hd-font-body text-xs sm:text-sm leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {chapter.methodologicalCaveat}
          </p>
        </section>

        {/* Sequential Navigation */}
        <nav
          className="pt-8 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monograph11Chapter(prevChapter.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Chapter {prevChapter.code}: {prevChapter.title}
              </span>
            </Link>
          ) : (
            <Link
              href={monographHref}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Monograph 11 Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={HD_ROUTES.monograph11Chapter(nextChapter.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>
                Chapter {nextChapter.code}: {nextChapter.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={monographHref}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Return to All 15 Volumes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
