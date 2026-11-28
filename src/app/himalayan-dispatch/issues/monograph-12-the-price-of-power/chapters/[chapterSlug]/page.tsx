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
  ELECTRICITY_ACCOUNTING_13,
  getHydropowerChapterBySlug,
  HYDROPOWER_MONOGRAPH_CHAPTERS_120,
  PRICE_OF_POWER_MONOGRAPH_SPEC,
} from '@/data/himalayan-dispatch-price-of-power-monograph';

export function generateStaticParams() {
  return HYDROPOWER_MONOGRAPH_CHAPTERS_120.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getHydropowerChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: 'Chapter Not Found | Himalayan Dispatch Monograph 12',
      description: PRICE_OF_POWER_MONOGRAPH_SPEC.extendedSubtitle,
      canonicalPath: '/himalayan-dispatch/issues/monograph-12-the-price-of-power',
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Chapter ${chapter.number}: ${chapter.title} — Monograph 12 | Himalayan Dispatch`,
    description: `${chapter.scientificAndPolicyFocus} (${chapter.volumeTitle})`,
    canonicalPath: `/himalayan-dispatch/issues/monograph-12-the-price-of-power/chapters/${chapter.slug}`,
    imagePath: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
  });
}

export default async function Monograph12ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getHydropowerChapterBySlug(chapterSlug);
  if (!chapter) notFound();

  const idx = HYDROPOWER_MONOGRAPH_CHAPTERS_120.findIndex(
    (c) => c.slug === chapter.slug
  );
  const prevChapter = idx > 0 ? HYDROPOWER_MONOGRAPH_CHAPTERS_120[idx - 1] : null;
  const nextChapter =
    idx >= 0 && idx < HYDROPOWER_MONOGRAPH_CHAPTERS_120.length - 1
      ? HYDROPOWER_MONOGRAPH_CHAPTERS_120[idx + 1]
      : null;

  const canonicalPath = `/himalayan-dispatch/issues/monograph-12-the-price-of-power/chapters/${chapter.slug}`;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            {
              label: 'Monograph 12 · The Price of Power',
              href: HD_ROUTES.monographPriceOfPower,
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
              MONOGRAPH 12 · VOLUME {chapter.volumeRoman} ({chapter.volumeTitle.toUpperCase()})
            </span>
            <span className="hd-folio-meta">CHAPTER {chapter.number} OF 120</span>
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
            {chapter.scientificAndPolicyFocus}
          </p>

          <div
            className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <span className="hd-folio-meta">
              BY {PRICE_OF_POWER_MONOGRAPH_SPEC.proposedByline}
            </span>
            <KewContentShare
              variant="editorial-button"
              label="Share Chapter Protocol"
              title={`Chapter ${chapter.number}: ${chapter.title} | Himalayan Dispatch Monograph 12`}
              description={chapter.scientificAndPolicyFocus}
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
            <span className="hd-kicker">PROPOSED RESEARCH PROTOCOL &amp; EVIDENCE STANDARD</span>
          </div>
          <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
            <strong>Status:</strong> {chapter.researchStatus}
          </p>
          <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
            <strong>Primary Methods &amp; Sources:</strong>{' '}
            {chapter.primaryEvidenceAndMethods}
          </p>
        </section>

        <section
          className="p-6 sm:p-8 border space-y-4"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">STANDARDIZED 13-POINT PROJECT ENERGY-JUSTICE ACCOUNTING</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs hd-font-body">
            {ELECTRICITY_ACCOUNTING_13.map(([comp, req]) => (
              <div
                key={comp}
                className="p-3 border space-y-0.5"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <div className="font-semibold" style={{ color: 'var(--hd-fg)' }}>
                  {comp}
                </div>
                <div style={{ color: 'var(--hd-fg-muted)' }}>{req}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href={HD_ROUTES.issueArticle(
                'volume-01-issue-01',
                PRICE_OF_POWER_MONOGRAPH_SPEC.dispatchSlug
              )}
              className="hd-kicker hover:underline inline-flex items-center gap-1.5"
            >
              <span>Read Flagship Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={toKewPlatformUrl(
                '/earth-human-impact/hydropower-energy-justice-observatory'
              )}
              className="hd-kicker hover:underline inline-flex items-center gap-1.5"
            >
              <span>Open KEW Hydropower Observatory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        <nav
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monographPriceOfPowerChapter(prevChapter.slug)}
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
              href={HD_ROUTES.monographPriceOfPowerChapter(nextChapter.slug)}
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
