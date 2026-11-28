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
  BIOGRAPHICAL_DOSSIER_20_SECTIONS,
  getVanguardChapterBySlug,
  SOUTH_ASIAN_VANGUARD_32_PERSONALITIES,
  SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC,
  VANGUARD_MONOGRAPH_CHAPTERS_60,
} from '@/data/himalayan-dispatch-south-asian-vanguard-monograph';

export function generateStaticParams() {
  return VANGUARD_MONOGRAPH_CHAPTERS_60.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getVanguardChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Not Found | Himalayan Dispatch Monograph 08',
      description: SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.italicDeck,
      canonicalPath:
        '/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.number}: ${chapter.title} — Monograph 08 | Himalayan Dispatch`,
    description: chapter.analyticalFocus,
    canonicalPath: `/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard/chapters/${chapter.slug}`,
    imagePath: '/images/publications/kolahoi-glacier-cryosphere.jpg',
  });
}

export default async function Monograph08ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getVanguardChapterBySlug(chapterSlug);
  if (!chapter) notFound();

  const person = chapter.linkedPersonalityId
    ? SOUTH_ASIAN_VANGUARD_32_PERSONALITIES.find(
        (p) => p.id === chapter.linkedPersonalityId
      )
    : null;

  const idx = VANGUARD_MONOGRAPH_CHAPTERS_60.findIndex((c) => c.slug === chapter.slug);
  const prevChapter = idx > 0 ? VANGUARD_MONOGRAPH_CHAPTERS_60[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < VANGUARD_MONOGRAPH_CHAPTERS_60.length - 1
      ? VANGUARD_MONOGRAPH_CHAPTERS_60[idx + 1]
      : null;

  const canonicalPath = `/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard/chapters/${chapter.slug}`;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            {
              label: 'Monograph 08 · South Asia’s Vanguard',
              href: HD_ROUTES.monographSouthAsianVanguard,
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
              MONOGRAPH 08 · VOLUME {chapter.volumeRoman} ({chapter.volumeTitle.toUpperCase()})
            </span>
            <span className="hd-folio-meta">CHAPTER {chapter.number} OF 60</span>
          </div>

          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            {chapter.title}
          </h1>

          {person ? (
            <div className="space-y-3">
              <p className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                {person.country} &nbsp;·&nbsp; {person.mirrorLabel} &nbsp;·&nbsp;{' '}
                {person.primaryAffiliationOrContext}
              </p>
              <p
                className="hd-font-body text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {person.verifiedMilestoneSummary}
              </p>
              {person.westernHimalayanConnection && (
                <p
                  className="p-3.5 border-l-2 hd-font-body text-sm"
                  style={{
                    borderColor: 'var(--hd-copper)',
                    backgroundColor: 'var(--hd-bg)',
                    color: 'var(--hd-fg-secondary)',
                  }}
                >
                  <strong>Western Himalayan Connection:</strong>{' '}
                  {person.westernHimalayanConnection}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 border" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}>
                  <div className="hd-folio-meta">PROPOSED LEARNING PATHWAY FOR KASHMIR</div>
                  <div className="hd-font-display text-xl font-semibold mt-1">
                    {person.proposedLearningPathwayForKashmir}
                  </div>
                </div>
                <div className="p-4 border" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}>
                  <div className="hd-folio-meta">QUESTION FOR REGIONAL COUNTERPARTS</div>
                  <div className="hd-font-body text-sm italic mt-1">
                    “{person.kashmirCounterpartQuestion}”
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {chapter.analyticalFocus}
            </p>
          )}

          <div
            className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <span className="hd-folio-meta">
              BY {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.proposedByline}
            </span>
            <KewContentShare
              variant="editorial-button"
              label="Share Chapter Protocol"
              title={`Chapter ${chapter.number}: ${chapter.title} | Himalayan Dispatch Monograph 08`}
              description={chapter.analyticalFocus}
              canonicalPath={canonicalPath}
              isPublished
            />
          </div>
        </header>

        <section
          className="p-6 sm:p-8 border space-y-3"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-kicker">RESEARCH PROVENANCE &amp; METHODOLOGY</span>
          </div>
          <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
            <strong>Status:</strong> {chapter.researchStatus}
          </p>
          <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
            <strong>Methodology:</strong> {chapter.researchMethodologyAndSources}
          </p>
        </section>

        {person && (
          <section
            className="p-6 sm:p-8 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">SECTION X · 20-SECTION BIOGRAPHICAL DOSSIER ARCHITECTURE</p>
            <h2
              className="hd-font-display text-2xl font-semibold"
              style={{ color: 'var(--hd-fg)' }}
            >
              Required 20-Part Journalistic Biography Structure for {person.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm hd-font-body">
              {BIOGRAPHICAL_DOSSIER_20_SECTIONS.map((sec) => (
                <div
                  key={sec.sectionNumber}
                  className="p-3 border space-y-0.5"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg)',
                  }}
                >
                  <div className="font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {sec.sectionNumber}. {sec.requiredContent}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                    {sec.evidentiaryRule}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-4">
          <Link
            href={HD_ROUTES.issueArticle(
              'volume-01-issue-01',
              SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.dispatchSlug
            )}
            className="hd-kicker hover:underline inline-flex items-center gap-1.5"
          >
            <span>Read Dispatch 14 Feature</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={toKewPlatformUrl('/resources/kew-green-heroes/south-asian-vanguard')}
            className="hd-kicker hover:underline inline-flex items-center gap-1.5"
          >
            <span>Open KEW Green Heroes Collection</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <nav
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monographSouthAsianVanguardChapter(prevChapter.slug)}
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
              href={HD_ROUTES.monographSouthAsianVanguardChapter(nextChapter.slug)}
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
