import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { JammuEcologicalFrontiersWorkbench } from '@/components/himalayan-dispatch/JammuEcologicalFrontiersWorkbench';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  getJammuAdjacentChapters,
  getJammuChapterBySlug,
  JAMMU_FRONTIERS_CHAPTERS_45,
  JAMMU_FRONTIERS_ISSUE_IDENTITY,
} from '@/data/himalayan-dispatch-jammu-frontiers-monograph';

export function generateStaticParams() {
  return JAMMU_FRONTIERS_CHAPTERS_45.map((ch) => ({
    chapterSlug: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}): Promise<Metadata> {
  const { chapterSlug } = await params;
  const chapter = getJammuChapterBySlug(chapterSlug);
  if (!chapter) {
    return buildPageMetadata({
      title: "Chapter Protocol Not Found — Jammu's Ecological Frontiers | Himalayan Dispatch",
      description: 'Requested Jammu Division scientific investigation chapter protocol was not found.',
      canonicalPath: `/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers/chapters/${chapterSlug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `Investigation ${chapter.investigationNumber} · Chapter ${chapter.chapterNumber}: ${chapter.researchDomain} | Himalayan Dispatch`,
    description: chapter.executiveSummary[0] || chapter.scientificDeliverable,
    canonicalPath: `/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers/chapters/${chapter.slug}`,
    publication: 'himalayan-dispatch',
  });
}

export default async function Monograph18JammuChapterProtocolPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = getJammuChapterBySlug(chapterSlug);
  if (!chapter) {
    notFound();
  }

  const { previous: prevChapter, next: nextChapter } = getJammuAdjacentChapters(chapter.slug);
  const issueHref = HD_ROUTES.monograph18;
  const dispatchHref = HD_ROUTES.issueArticle(
    JAMMU_FRONTIERS_ISSUE_IDENTITY.editionSlug,
    chapter.investigationSlug
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: "Monograph 18 · Jammu's Ecological Frontiers", href: issueHref },
            {
              label: `Investigation ${chapter.investigationNumber} · Chapter ${chapter.chapterNumber}`,
            },
          ]}
        />

        <header
          className="pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">
            INVESTIGATION {chapter.investigationNumber}: {chapter.investigationTitle} &nbsp;·&nbsp;
            CHAPTER {chapter.chapterNumber} OF 15
          </p>
          <h1
            className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            Chapter {chapter.chapterNumber} — {chapter.researchDomain}
          </h1>
          <div className="space-y-1 pt-1">
            <p
              className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase"
              style={{ color: 'var(--hd-fg)' }}
            >
              {JAMMU_FRONTIERS_ISSUE_IDENTITY.bylineDisplay}
            </p>
            <p className="hd-folio-meta">
              TARGET BASELINE 1985–2026 &nbsp;·&nbsp; {chapter.researchStatus.toUpperCase()}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={dispatchHref}
              className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
            >
              <span>Read Full Investigation {chapter.investigationNumber} Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
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

        {/* Structured Chapter Protocol Matrix */}
        <section
          className="p-6 sm:p-8 border space-y-6"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-2.5">
            <p className="hd-kicker">PRINCIPAL SCIENTIFIC QUESTIONS &amp; HYPOTHESIS LINKAGE</p>
            <ul className="space-y-2">
              {chapter.keyQuestionsAndScope.map((item, idx) => (
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
            <p className="hd-kicker">PRIMARY DATA INFRASTRUCTURE &amp; ANALYTICAL METHODS</p>
            <ul className="space-y-2">
              {chapter.methodologyAndDatasets.map((item, idx) => (
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
            <p className="hd-kicker">TARGET SCIENTIFIC DELIVERABLE</p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed font-medium"
              style={{ color: 'var(--hd-fg)' }}
            >
              {chapter.scientificDeliverable}
            </p>
          </div>
        </section>

        {/* Methodological Caveat */}
        <section
          className="p-5 border-l-2 space-y-1.5"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <p className="hd-kicker">EVIDENTIARY &amp; METHODOLOGICAL GUARDRAIL</p>
          <p
            className="hd-font-body text-xs sm:text-sm leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {chapter.methodologicalCaveat}
          </p>
        </section>

        {/* Interactive Basin Workbench on Focal Synthesis Chapters */}
        {(chapter.chapterNumber === '01' ||
          chapter.chapterNumber === '08' ||
          chapter.chapterNumber === '12' ||
          chapter.chapterNumber === '15') && (
          <JammuEcologicalFrontiersWorkbench
            defaultInvestigation={chapter.investigationNumber}
            compact
          />
        )}

        {/* Adjacent Chapter Navigation across all 45 Chapters */}
        <nav
          aria-label="Chapter Protocol Navigation"
          className="pt-8 border-t grid grid-cols-1 sm:grid-cols-2 gap-4"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {prevChapter ? (
            <Link
              href={HD_ROUTES.monograph18Chapter(prevChapter.slug)}
              className="p-4 border space-y-1 group"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <span className="hd-folio-meta inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>
                  PREVIOUS · INV {prevChapter.investigationNumber} CH {prevChapter.chapterNumber}
                </span>
              </span>
              <div
                className="hd-font-display text-lg font-semibold group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                {prevChapter.researchDomain}
              </div>
            </Link>
          ) : (
            <Link
              href={issueHref}
              className="p-4 border space-y-1 group"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <span className="hd-folio-meta inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO THEMATIC ISSUE</span>
              </span>
              <div
                className="hd-font-display text-lg font-semibold group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                Jammu&apos;s Ecological Frontiers Overview
              </div>
            </Link>
          )}

          {nextChapter ? (
            <Link
              href={HD_ROUTES.monograph18Chapter(nextChapter.slug)}
              className="p-4 border space-y-1 text-right group"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <span className="hd-folio-meta inline-flex items-center justify-end gap-1.5">
                <span>
                  NEXT · INV {nextChapter.investigationNumber} CH {nextChapter.chapterNumber}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <div
                className="hd-font-display text-lg font-semibold group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                {nextChapter.researchDomain}
              </div>
            </Link>
          ) : (
            <Link
              href={issueHref}
              className="p-4 border space-y-1 text-right group"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <span className="hd-folio-meta inline-flex items-center justify-end gap-1.5">
                <span>COMPLETE ISSUE OVERVIEW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <div
                className="hd-font-display text-lg font-semibold group-hover:underline"
                style={{ color: 'var(--hd-fg)' }}
              >
                Return to Jammu&apos;s Ecological Frontiers
              </div>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
