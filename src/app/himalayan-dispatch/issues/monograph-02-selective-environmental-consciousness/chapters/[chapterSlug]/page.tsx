import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EnvironmentalConsistencyExperiment } from '@/components/himalayan-dispatch/EnvironmentalConsistencyExperiment';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getMonograph02ChapterBySlug,
  SELECTIVE_CONSCIOUSNESS_CHAPTERS_50,
  SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC,
} from '@/data/himalayan-dispatch-selective-consciousness-monograph';

export function generateStaticParams() {
  return SELECTIVE_CONSCIOUSNESS_CHAPTERS_50.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getMonograph02ChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Protocol Not Found — Monograph 02 | Himalayan Dispatch',
      description: 'Requested Monograph 02 chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-02-selective-environmental-consciousness/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.number}: ${chapter.title} — Monograph 02 | Himalayan Dispatch`,
    description: chapter.analyticalFocus,
    canonicalPath: `/himalayan-dispatch/issues/monograph-02-selective-environmental-consciousness/chapters/${chapter.slug}`,
  });
}

export default async function Monograph02ChapterProtocolPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getMonograph02ChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const idx = SELECTIVE_CONSCIOUSNESS_CHAPTERS_50.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = idx > 0 ? SELECTIVE_CONSCIOUSNESS_CHAPTERS_50[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < SELECTIVE_CONSCIOUSNESS_CHAPTERS_50.length - 1
      ? SELECTIVE_CONSCIOUSNESS_CHAPTERS_50[idx + 1]
      : null;

  const monographHref = HD_ROUTES.issue('monograph-02-selective-environmental-consciousness');

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1040px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: 'Monograph 02', href: monographHref },
            { label: `Chapter ${chapter.number}` },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.monographCode} &nbsp;·&nbsp;{' '}
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
            <p className="hd-kicker">ANALYTICAL SCOPE &amp; RESEARCH HYPOTHESIS</p>
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
            <p className="hd-kicker">EMPIRICAL METHODS, RECORDS &amp; VERIFICATION PROTOCOL</p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {chapter.empiricalMethodsAndSources}
            </p>
          </div>

          <div
            className="pt-4 border-t text-xs italic hd-font-body"
            style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
          >
            Methodological disclosure: This chapter entry specifies the approved research scope,
            documentary records, and empirical methodology within Monograph 02 (Selective
            Environmental Consciousness). Primary survey fieldwork, multi-decadal satellite
            validation, and external Stage 05 specialist review remain required prior to full
            monograph release.
          </div>
        </section>

        {chapter.number === '44' && <EnvironmentalConsistencyExperiment />}

        <nav
          aria-label="Monograph 02 Chapter Navigation"
          className="pt-6 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={`${monographHref}/chapters/${prevChapter.slug}`}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                Ch. {prevChapter.number}: {prevChapter.title}
              </span>
            </Link>
          ) : (
            <Link href={monographHref} className="hd-kicker inline-flex items-center gap-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Monograph 02 Overview</span>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={`${monographHref}/chapters/${nextChapter.slug}`}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>
                Ch. {nextChapter.number}: {nextChapter.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={HD_ROUTES.issueArticle('volume-01-issue-01', 'selective-environmental-consciousness')}
              className="hd-kicker inline-flex items-center gap-2 hover:underline"
            >
              <span>Read Dispatch 24 Flagship</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
