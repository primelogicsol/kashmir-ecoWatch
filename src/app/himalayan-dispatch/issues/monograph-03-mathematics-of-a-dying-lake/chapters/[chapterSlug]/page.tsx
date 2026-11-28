import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { DalLakeMathematicsWorkbench } from '@/components/himalayan-dispatch/DalLakeMathematicsWorkbench';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  DYING_LAKE_CHAPTERS_62,
  DYING_LAKE_MONOGRAPH_SPEC,
  getMonograph03ChapterBySlug,
} from '@/data/himalayan-dispatch-dying-lake-monograph';

export function generateStaticParams() {
  return DYING_LAKE_CHAPTERS_62.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getMonograph03ChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Protocol Not Found — Monograph 03 | Himalayan Dispatch',
      description: 'Requested Monograph 03 chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.number}: ${chapter.title} — Monograph 03 | Himalayan Dispatch`,
    description: chapter.analyticalFocus,
    canonicalPath: `/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake/chapters/${chapter.slug}`,
  });
}

export default async function Monograph03ChapterProtocolPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getMonograph03ChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const idx = DYING_LAKE_CHAPTERS_62.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = idx > 0 ? DYING_LAKE_CHAPTERS_62[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < DYING_LAKE_CHAPTERS_62.length - 1
      ? DYING_LAKE_CHAPTERS_62[idx + 1]
      : null;

  const monographHref = HD_ROUTES.issue('monograph-03-mathematics-of-a-dying-lake');

  const interactiveTabForChapter =
    chapter.number === '21'
      ? ('stp' as const)
      : chapter.number === '31' || chapter.number === '36'
      ? ('harvest_dredge' as const)
      : chapter.number === '41'
      ? ('hydrology' as const)
      : chapter.number === '22' || chapter.number === '57' || chapter.number === '62'
      ? ('phosphorus' as const)
      : null;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1040px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 03', href: monographHref },
            { label: `Chapter ${chapter.number}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            {DYING_LAKE_MONOGRAPH_SPEC.monographCode} &nbsp;·&nbsp; VOLUME{' '}
            {chapter.volumeRoman}: {chapter.volumeTitle}
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            Chapter {chapter.number} — {chapter.title}
          </h1>
          <p className="hd-folio-meta">{chapter.researchStatus}</p>
        </header>

        <section
          className="p-6 sm:p-8 border space-y-5"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-2">
            <p className="hd-kicker">GOVERNING EQUATION / QUANTITATIVE METRIC</p>
            <code
              className="block p-3 border text-xs sm:text-sm font-mono"
              style={{
                borderColor: 'var(--hd-rule)',
                backgroundColor: 'var(--hd-bg)',
                color: 'var(--hd-copper)',
              }}
            >
              {chapter.governingEquationsOrMetrics}
            </code>
          </div>

          <div
            className="pt-4 border-t space-y-2"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <p className="hd-kicker">ANALYTICAL FOCUS &amp; FORENSIC ENGINEERING HYPOTHESIS</p>
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {chapter.analyticalFocus}
            </p>
          </div>

          <div
            className="pt-4 border-t space-y-2"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <p className="hd-kicker">REQUIRED DOCUMENTARY, FIELD &amp; LABORATORY INPUTS</p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {chapter.requiredDocumentaryAndFieldInputs}
            </p>
          </div>

          <div
            className="pt-4 border-t text-xs italic hd-font-body"
            style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
          >
            Methodological disclosure: This chapter entry specifies the proposed engineering audit
            scope, governing conservation equation, and documentary evidence protocol within
            Monograph 03 (The Mathematics of a Dying Lake). Retrieval of outstanding Part XV
            engineering DPRs and independent external Stage 05 specialist review remain required
            prior to definitive chapter conclusions.
          </div>
        </section>

        {interactiveTabForChapter && (
          <DalLakeMathematicsWorkbench
            variant="editorial"
            initialTab={interactiveTabForChapter}
          />
        )}

        <nav
          aria-label="Monograph 03 Chapter Navigation"
          className="pt-6 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monograph03Chapter(prevChapter.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Ch. {prevChapter.number}: {prevChapter.title}
              </span>
            </Link>
          ) : (
            <Link
              href={monographHref}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Monograph 03 Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={HD_ROUTES.monograph03Chapter(nextChapter.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>
                Ch. {nextChapter.number}: {nextChapter.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={HD_ROUTES.issueArticle(
                'volume-01-issue-01',
                'the-mathematics-of-a-dying-lake'
              )}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Read Dispatch 04 Flagship</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
