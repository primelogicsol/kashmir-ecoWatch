import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { KewContentShare } from '@/components/common/KewContentShare';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import {
  ENVIRONMENTAL_LAW_CHAPTERS_100,
  ENVIRONMENTAL_LAW_MONOGRAPH_SPEC,
  getEnvironmentalLawChapterBySlug,
  INDIVIDUAL_STATUTORY_DOSSIER_FIELDS_10,
} from '@/data/himalayan-dispatch-environmental-law-monograph';

export function generateStaticParams() {
  return ENVIRONMENTAL_LAW_CHAPTERS_100.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getEnvironmentalLawChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Not Found | Himalayan Dispatch Monograph 07',
      description: ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.extendedSubtitle,
      canonicalPath: '/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist',
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.number}: ${chapter.title} — Monograph 07 | Himalayan Dispatch`,
    description: `${chapter.legalAndScientificFocus} (${chapter.volumeTitle})`,
    canonicalPath: `/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist/chapters/${chapter.slug}`,
    imagePath: '/images/environmental-pil/ladakh-transhimalayan-sanctuary.jpg',
  });
}

export default async function Monograph07ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getEnvironmentalLawChapterBySlug(chapterSlug);
  if (!chapter) notFound();

  const idx = ENVIRONMENTAL_LAW_CHAPTERS_100.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = idx > 0 ? ENVIRONMENTAL_LAW_CHAPTERS_100[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < ENVIRONMENTAL_LAW_CHAPTERS_100.length - 1
      ? ENVIRONMENTAL_LAW_CHAPTERS_100[idx + 1]
      : null;

  const canonicalPath = `/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist/chapters/${chapter.slug}`;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            {
              label: 'Monograph 07 · Legal Architecture',
              href: HD_ROUTES.monographEnvironmentalLaw,
            },
            { label: `Chapter ${chapter.number}` },
          ]}
        />

        <header
          className="p-8 sm:p-12 border space-y-5"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="hd-kicker">
              MONOGRAPH 07 · VOLUME {chapter.volumeRoman} ({chapter.volumeTitle.toUpperCase()})
            </span>
            <span className="hd-folio-meta">CHAPTER {chapter.number} OF 100</span>
          </div>

          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            {chapter.title}
          </h1>

          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {chapter.legalAndScientificFocus}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
            <span className="hd-folio-meta">
              BY {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.proposedByline}
            </span>
            <KewContentShare
              variant="editorial-button"
              label="Share Chapter Protocol"
              title={`Chapter ${chapter.number}: ${chapter.title} | Himalayan Dispatch Monograph 07`}
              description={chapter.legalAndScientificFocus}
              canonicalPath={canonicalPath}
              isPublished
            />
          </div>
        </header>

        <section
          className="p-6 sm:p-8 border space-y-4"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-kicker">PROPOSED CHAPTER RESEARCH PROTOCOL &amp; LEGAL PROVENANCE</span>
          </div>
          <p
            className="hd-font-body text-sm leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            <strong>Status:</strong> {chapter.verificationStatus}
          </p>
          <p
            className="hd-font-body text-sm leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            <strong>Primary Legal &amp; Scientific Sources:</strong>{' '}
            {chapter.primarySourcesAndMethodology}
          </p>
        </section>

        <section
          className="p-6 sm:p-8 border space-y-4"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">STANDARDIZED 10-FIELD STATUTORY DOSSIER PROTOCOL</p>
          <h2
            className="hd-font-display text-2xl font-semibold"
            style={{ color: 'var(--hd-fg)' }}
          >
            Every Statute Examined Under Chapter {chapter.number} Is Audited Across Ten Mandatory Dimensions
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
            {INDIVIDUAL_STATUTORY_DOSSIER_FIELDS_10.map((fld) => (
              <li key={fld} className="p-3 border" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}>
                {fld}
              </li>
            ))}
          </ul>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href={HD_ROUTES.issueArticle(
                'volume-01-issue-01',
                ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.dispatchSlug
              )}
              className="hd-kicker hover:underline inline-flex items-center gap-1.5"
            >
              <span>Read Flagship Legal Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={toKewPlatformUrl('/governance/legislation-enforcement-observatory')}
              className="hd-kicker hover:underline inline-flex items-center gap-1.5"
            >
              <span>Open KEW Legal Observatory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        <nav className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monographEnvironmentalLawChapter(prevChapter.slug)}
              className="p-4 border flex items-center gap-3 hover:opacity-85"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <div>
                <div className="hd-folio-meta">PREVIOUS · CH. {prevChapter.number}</div>
                <div className="hd-font-display text-lg font-semibold">
                  {prevChapter.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter && (
            <Link
              href={HD_ROUTES.monographEnvironmentalLawChapter(nextChapter.slug)}
              className="p-4 border flex items-center justify-end gap-3 text-right hover:opacity-85"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div>
                <div className="hd-folio-meta">NEXT · CH. {nextChapter.number}</div>
                <div className="hd-font-display text-lg font-semibold">
                  {nextChapter.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
