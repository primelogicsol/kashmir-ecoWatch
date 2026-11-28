import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { LadakhEcologicalFrontiersWorkbench } from '@/components/himalayan-dispatch/LadakhEcologicalFrontiersWorkbench';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getAdjacentLadakhChapters,
  getLadakhChapterBySlug,
  LADAKH_CHAPTERS_45,
  LADAKH_ECOLOGICAL_FRONTIERS_SPEC,
} from '@/data/himalayan-dispatch-ladakh-frontiers-monograph';

export function generateStaticParams() {
  return LADAKH_CHAPTERS_45.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getLadakhChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: "Chapter Not Found — Ladakh's Ecological Frontiers | Himalayan Dispatch",
      description: 'Requested Ladakh scientific chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/ladakhs-ecological-frontiers/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.investigationChapterNumber} (${chapter.investigationTitle}): ${chapter.title} | Himalayan Dispatch`,
    description: chapter.primaryQuestion,
    canonicalPath: `/himalayan-dispatch/issues/ladakhs-ecological-frontiers/chapters/${chapter.slug}`,
  });
}

export default async function LadakhEcologicalFrontiersChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getLadakhChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const { prev: prevChapter, next: nextChapter } = getAdjacentLadakhChapters(chapter.slug);
  const issueHref = HD_ROUTES.ladakhEcologicalFrontiers;
  const defaultTab =
    chapter.investigationNumber === '01'
      ? 'cryosphere'
      : chapter.investigationNumber === '02'
      ? 'carrying_capacity'
      : 'ecological_integrity';

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: "Ladakh's Ecological Frontiers", href: issueHref },
            {
              label: `Inv. ${chapter.investigationNumber} · Ch. ${chapter.investigationChapterNumber}`,
            },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            INVESTIGATION {chapter.investigationNumber}: {chapter.investigationTitle} &nbsp;·&nbsp;
            CHAPTER {chapter.investigationChapterNumber} (GLOBAL #{chapter.globalChapterNumber})
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            {chapter.title}
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
              BY {LADAKH_ECOLOGICAL_FRONTIERS_SPEC.proposedByline}
            </p>
            <p className="hd-folio-meta">
              EDITION FOLIO DATE 2026-11-28 &nbsp;·&nbsp; {chapter.estimatedReadingMinutes} MIN READ
              &nbsp;·&nbsp; {chapter.geographicalFocus}
            </p>
          </div>
        </header>

        <section
          className="p-6 border-l-2 space-y-2"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">PRIMARY SCIENTIFIC QUESTION</p>
          <p className="hd-font-display text-2xl sm:text-3xl italic leading-snug">
            {chapter.primaryQuestion}
          </p>
        </section>

        <LadakhEcologicalFrontiersWorkbench variant="editorial" defaultTab={defaultTab} />

        <section
          className="p-6 sm:p-8 border space-y-6"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-2">
            <p className="hd-kicker">ANALYTICAL &amp; BIOPHYSICAL SCOPE</p>
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

          <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">LINKED PROPOSED ORIGINAL SCIENTIFIC EXPERIMENTS</p>
            <ul className="space-y-1.5">
              {chapter.linkedExperiments.map((exp) => (
                <li
                  key={exp}
                  className="hd-font-body text-sm font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  → {exp}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">CENTRAL RESEARCH HYPOTHESIS CONNECTION</p>
            <p
              className="hd-font-body text-sm sm:text-base italic leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {chapter.centralHypothesisLink}
            </p>
          </div>

          <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">EVIDENTIARY BOUNDARIES &amp; RIGHT OF CONSULTATION</p>
            <ul className="space-y-1.5">
              {chapter.unresolvedQuestions.map((u, idx) => (
                <li
                  key={idx}
                  className="hd-font-body text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  • {u}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <nav
          className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.ladakhEcologicalFrontiersChapter(prevChapter.slug)}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Inv. {prevChapter.investigationNumber} Ch. {prevChapter.investigationChapterNumber}:{' '}
                {prevChapter.title}
              </span>
            </Link>
          ) : (
            <Link
              href={issueHref}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ladakh Issue Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={HD_ROUTES.ladakhEcologicalFrontiersChapter(nextChapter.slug)}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline sm:ml-auto"
              style={{ color: 'var(--hd-copper)' }}
            >
              <span>
                Inv. {nextChapter.investigationNumber} Ch. {nextChapter.investigationChapterNumber}:{' '}
                {nextChapter.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={HD_ROUTES.issueArticle(
                'ladakhs-ecological-frontiers',
                chapter.investigationDispatchSlug
              )}
              className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase hover:underline sm:ml-auto"
              style={{ color: 'var(--hd-copper)' }}
            >
              <span>Read Companion Flagship Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
