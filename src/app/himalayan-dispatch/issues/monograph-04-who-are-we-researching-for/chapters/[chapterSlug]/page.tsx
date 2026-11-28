import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { ResearchAccountabilityWorkbench } from '@/components/himalayan-dispatch/ResearchAccountabilityWorkbench';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getMonograph04ChapterBySlug,
  RESEARCH_ACCOUNTABILITY_CHAPTERS_60,
  RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC,
} from '@/data/himalayan-dispatch-research-accountability-monograph';

export function generateStaticParams() {
  return RESEARCH_ACCOUNTABILITY_CHAPTERS_60.map((ch) => ({
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
      title: 'Chapter Protocol Not Found — Monograph 04 | Himalayan Dispatch',
      description: 'Requested Monograph 04 chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-04-who-are-we-researching-for/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.number}: ${chapter.title} — Monograph 04 | Himalayan Dispatch`,
    description: chapter.analyticalFocus,
    canonicalPath: `/himalayan-dispatch/issues/monograph-04-who-are-we-researching-for/chapters/${chapter.slug}`,
  });
}

export default async function Monograph04ChapterProtocolPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getMonograph04ChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const idx = RESEARCH_ACCOUNTABILITY_CHAPTERS_60.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = idx > 0 ? RESEARCH_ACCOUNTABILITY_CHAPTERS_60[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < RESEARCH_ACCOUNTABILITY_CHAPTERS_60.length - 1
      ? RESEARCH_ACCOUNTABILITY_CHAPTERS_60[idx + 1]
      : null;

  const monographHref = HD_ROUTES.issue('monograph-04-who-are-we-researching-for');

  const workbenchTab =
    chapter.number === '13' || chapter.number === '17'
      ? ('census' as const)
      : chapter.number === '40'
      ? ('pipeline' as const)
      : chapter.number === '49' || chapter.number === '50' || chapter.number === '53'
      ? ('second_life' as const)
      : null;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1040px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 04', href: monographHref },
            { label: `Chapter ${chapter.number}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            {RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC.monographCode} &nbsp;·&nbsp; VOLUME{' '}
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
            <p className="hd-kicker">ANALYTICAL FOCUS &amp; RESEARCH SCOPE</p>
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
            <p className="hd-kicker">BIBLIOMETRIC, INSTITUTIONAL &amp; DOCUMENTARY PROTOCOL</p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {chapter.bibliometricAndDocumentaryProtocol}
            </p>
          </div>

          <div
            className="pt-4 border-t text-xs italic hd-font-body"
            style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
          >
            Editorial condition: Zero estimated or invented publication totals may be released in
            this chapter; statistical tables remain marked TBD until validated against OpenAlex,
            Crossref, institutional registers, and formal Institutional Right of Response.
          </div>
        </section>

        {workbenchTab && (
          <ResearchAccountabilityWorkbench variant="editorial" initialTab={workbenchTab} />
        )}

        <nav
          aria-label="Monograph 04 Chapter Navigation"
          className="pt-6 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monographResearchAccountabilityChapter(prevChapter.slug)}
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
              <span>Monograph 04 Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={HD_ROUTES.monographResearchAccountabilityChapter(nextChapter.slug)}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>
                Ch. {nextChapter.number}: {nextChapter.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={HD_ROUTES.issueArticle('volume-01-issue-01', 'who-are-we-researching-for')}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Read Dispatch 12 Flagship</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
