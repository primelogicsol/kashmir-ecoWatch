'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Clock, ExternalLink, FileCheck2, ShieldAlert } from 'lucide-react';
import { JournalistProfile, MagazineStory } from '@/types/himalayan-dispatch';
import {
  GREEN_MARTYRS_DOSSIERS,
  LADAKH_MARTYRS_RESEARCH_NOTE,
  MARTYRS_REGISTRY_SUMMARY,
} from '@/data/kew-green-martyrs';
import {
  DEPARTMENT_ID_TO_ROUTE_SLUG,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  toCanonicalIssueSlug,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import {
  formatPublicReadingDuration,
  getPublicStoryGateBadge,
  sanitizePublicEditorialMetadataRows,
} from '@/lib/himalayan-dispatch-metrics';
import {
  KewChapterAnchorCopyButton,
  KewContentShare,
} from '@/components/common/KewContentShare';
import {
  formatChapterAnchorId,
  isHimalayanDispatchMonograph,
} from '@/lib/sharing/kew-content-sharing';
import { EditorialDataGraphic } from './EditorialDataGraphic';
import { EnvironmentalConsistencyExperiment } from './EnvironmentalConsistencyExperiment';
import { DalLakeMathematicsWorkbench } from './DalLakeMathematicsWorkbench';
import { ResearchAccountabilityWorkbench } from './ResearchAccountabilityWorkbench';
import { AvianMigrationRefugiaWorkbench } from './AvianMigrationRefugiaWorkbench';
import { WhempManifestoWorkbench } from './WhempManifestoWorkbench';
import { EnvironmentalLawAccountabilityWorkbench } from './EnvironmentalLawAccountabilityWorkbench';
import { SouthAsianVanguardWorkbench } from './SouthAsianVanguardWorkbench';
import { SalimAliParkForensicWorkbench } from './SalimAliParkForensicWorkbench';
import { HabakLaboratoryWorkbench } from './HabakLaboratoryWorkbench';
import { DalLakeEncroachmentWorkbench } from './DalLakeEncroachmentWorkbench';
import { HydropowerEnergyJusticeWorkbench } from './HydropowerEnergyJusticeWorkbench';
import { HimalayanTimeBombWorkbench } from './HimalayanTimeBombWorkbench';

export function StoryReaderClient({
  story,
  journalist,
  nextStory,
  disablePublicSharing = false,
}: {
  story: MagazineStory;
  journalist: JournalistProfile | null;
  nextStory: MagazineStory | null;
  disablePublicSharing?: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [rollFilter, setRollFilter] = useState<'ALL' | 'JK_FOREST' | 'SERVICE' | 'SUPPORTING'>('ALL');

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const isPhotoEssay = story.departmentId === 'photo-essays';
  const isInterview = story.departmentId === 'interviews';
  const gateBadge = getPublicStoryGateBadge(story);
  const isPreReleaseStage08 = story.publicationGates?.currentStage === 'administrator_approval';
  const viewingMins =
    story.estimatedViewingMinutes ||
    Math.max(2, Math.round((story.photoPlates?.length || 6) * 0.65));

  const canonicalStoryPath = resolveCanonicalStoryUrl(story);
  const isMonographStory = isHimalayanDispatchMonograph({
    slug: story.editionSlug,
    volumeLabel: story.editionLabel,
  });
  const shareDescription = story.excerpt || story.subtitle;
  const shareableChapters = story.chapters.map((ch) => ({
    id: formatChapterAnchorId(ch.numberRoman),
    label:
      ch.numberRoman === 'PROLOGUE' || ch.numberRoman === 'EPILOGUE'
        ? `${ch.numberRoman} — ${ch.title}`
        : `Chapter ${ch.numberRoman} — ${ch.title}`,
  }));

  return (
    <article>
      {/* Burnt Copper Reading Progress Hairline */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%`, backgroundColor: '#8C3125' }}
        />
      </div>

      {/* Format-Aware Story Title & Plate Header */}
      {isPhotoEssay ? (
        <header className="hd-darkroom-spread w-full px-4 sm:px-8 lg:px-14 pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div className="max-w-[1380px] mx-auto space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F2EFE7]/15 pb-4">
              <Link
                href={HD_ROUTES.issue(toCanonicalIssueSlug(story.editionSlug))}
                className="hd-font-sans inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#D8C3A5]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{story.editionLabel}</span>
              </Link>
              <span className="hd-font-sans text-[11px] tracking-[0.22em] uppercase text-[#A39B8B]">
                {story.folioCode} &nbsp;·&nbsp;{' '}
                {formatPublicReadingDuration(
                  { ...story, estimatedViewingMinutes: viewingMins },
                  'photo_header'
                )}
              </span>
            </div>

            <div className="max-w-4xl space-y-4">
              <p className="hd-font-sans text-xs tracking-[0.28em] uppercase text-[#D8C3A5]">
                {story.dateline}
              </p>
              <h1 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] text-[#F2EFE7]">
                {story.title}
              </h1>
              <p className="hd-font-body text-xl sm:text-2xl text-[#F2EFE7]/82 leading-relaxed">
                {story.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <p className="hd-font-sans text-xs tracking-[0.2em] uppercase text-[#A39B8B]">
                  {story.visualEssayMode === 'illustrative_monochrome_study'
                    ? 'VISUAL EDITION & TEXT BY '
                    : 'PHOTOGRAPHS & TEXT BY '}
                  {journalist ? (
                    <Link
                      href={HD_ROUTES.journalistPortfolio(journalist.slug)}
                      className="text-[#F2EFE7] underline underline-offset-4"
                    >
                      {story.bylineDisplay}
                    </Link>
                  ) : (
                    story.bylineDisplay
                  )}
                </p>
                <span className="px-2.5 py-1 border border-[#D8C3A5]/40 text-[10px] hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                  {gateBadge.label}
                </span>
              </div>
            </div>

            <KewContentShare
              variant="article-toolbar"
              surfaceTone="darkplate"
              label={isMonographStory ? 'Share This Monograph' : 'Share This Dispatch'}
              title={story.title}
              description={shareDescription}
              canonicalPath={canonicalStoryPath}
              chapters={shareableChapters}
              isPublished={story.isPublished}
              isPreviewMode={disablePublicSharing}
              workflowStage={story.workflowStage}
            />

            <div className="aspect-[16/9] w-full overflow-hidden border border-[#F2EFE7]/20">
              <img
                src={story.heroImage}
                alt={story.heroCaption}
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <p className="hd-font-body text-xs sm:text-sm italic text-[#A39B8B]">
              {story.heroCaption} — {story.heroCredit}
            </p>
            {story.visualEssayMode === 'illustrative_monochrome_study' && story.editorialVerificationNote && (
              <div className="p-4 sm:p-5 border border-[#D8C3A5]/35 bg-[#F2EFE7]/5 text-xs sm:text-sm hd-font-body leading-relaxed text-[#F2EFE7]/85">
                <strong className="hd-font-sans text-[10px] tracking-[0.2em] uppercase text-[#D8C3A5] block mb-1">
                  CURATORIAL &amp; VISUAL PROVENANCE CLARIFICATION
                </strong>
                {story.editorialVerificationNote}
              </div>
            )}
          </div>
        </header>
      ) : (
        <header
          className="w-full px-4 sm:px-8 lg:px-14 pt-10 pb-12 sm:pt-14 sm:pb-16 border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-[1380px] mx-auto space-y-8 sm:space-y-10">
            {/* Folio Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              <Link
                href={HD_ROUTES.issue(toCanonicalIssueSlug(story.editionSlug))}
                className="hd-font-sans inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase hover:opacity-75"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                <ArrowLeft className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                <span>{story.editionLabel}</span>
              </Link>
              <Link
                href={HD_ROUTES.department(DEPARTMENT_ID_TO_ROUTE_SLUG[story.departmentId])}
                className="hd-kicker hover:underline"
              >
                {story.departmentRubric}
              </Link>
            </div>

            {/* Asymmetric Headline & Standfirst */}
            <div className="max-w-4xl space-y-5">
              <p className="hd-folio-meta">{story.dateline}</p>
              <h1
                className="hd-font-display text-4xl sm:text-6xl lg:text-[4.5rem] font-semibold leading-[1.01]"
                style={{ color: 'var(--hd-fg)' }}
              >
                {story.title}
              </h1>
              <p
                className="hd-font-display text-xl sm:text-2xl lg:text-3xl italic leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {story.subtitle}
              </p>
            </div>

            {/* Byline & Verification Strip */}
            <div
              className="pt-5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="space-y-1">
                <div className="hd-font-sans text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--hd-fg)' }}>
                  {story.dialogueMode === 'constructed_editorial_dialogue'
                    ? 'EDITORIAL DIALOGUE SYNTHESIS BY '
                    : 'BY '}
                  {journalist ? (
                    <Link
                      href={HD_ROUTES.journalistPortfolio(journalist.slug)}
                      className="underline underline-offset-4"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {story.bylineDisplay}
                    </Link>
                  ) : (
                    <span>{story.bylineDisplay}</span>
                  )}
                  {story.photographyByline && (
                    <span style={{ color: 'var(--hd-fg-muted)' }}>
                      {' '}
                      &nbsp;·&nbsp; VISUAL PLATES: {story.photographyByline}
                    </span>
                  )}
                </div>
                <div className="hd-folio-meta">
                  {story.updatedAt && story.updatedAt !== story.publishedAt
                    ? `ORIGINALLY PUBLISHED ${story.publishedAt} · EXPANDED & REVISED ${story.updatedAt}`
                    : `${isPreReleaseStage08 ? 'EDITION FOLIO DATE' : 'PUBLISHED'} ${story.publishedAt}`}{' '}
                  &nbsp;·&nbsp; {formatPublicReadingDuration(story, 'header')}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {story.dialogueMode === 'constructed_editorial_dialogue' && (
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] hd-font-sans tracking-[0.14em] uppercase"
                    style={{
                      borderColor: 'var(--hd-copper)',
                      color: 'var(--hd-copper)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <span>Constructed Editorial Dialogue</span>
                  </div>
                )}
                {gateBadge.isVerifiedRelease &&
                story.hasCompletedIndependentReview &&
                Boolean(story.scientificReviewer) ? (
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] hd-font-sans tracking-[0.15em] uppercase"
                    style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                    <span>{gateBadge.label}</span>
                  </div>
                ) : (
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] hd-font-sans tracking-[0.14em] uppercase"
                    style={{
                      borderColor: 'var(--hd-copper)',
                      color: 'var(--hd-copper)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{gateBadge.label}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Sharing Toolbar — Below Byline, Metadata & Verification, Before Cover Photograph */}
            <KewContentShare
              variant="article-toolbar"
              label={isMonographStory ? 'Share This Monograph' : 'Share This Dispatch'}
              title={story.title}
              description={shareDescription}
              canonicalPath={canonicalStoryPath}
              chapters={shareableChapters}
              isPublished={story.isPublished}
              isPreviewMode={disablePublicSharing}
              workflowStage={story.workflowStage}
            />

            {/* Full-Width Hero Plate */}
            <figure className="space-y-3">
              <div className="aspect-[16/9] max-h-[72vh] w-full overflow-hidden bg-[#171717]">
                <img
                  src={story.heroImage}
                  alt={story.heroCaption}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                <span className="hd-font-body italic">{story.heroCaption}</span>
                <span className="hd-folio-meta shrink-0">{story.heroCredit}</span>
              </figcaption>
            </figure>
          </div>
        </header>
      )}

      {/* Main Longform Literary Body with Marginalia Column */}
      <div className="w-full px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left 3 Cols: Chapter Rail & Editorial Provenance Marginalia */}
          <aside className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            {story.chapters.length > 1 && (
              <div
                className="border-t pt-4 space-y-3 lg:sticky lg:top-20"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                <p className="hd-kicker">CHAPTERS</p>
                <ol className="space-y-2.5">
                  {story.chapters.map((ch) => (
                    <li key={ch.numberRoman}>
                      <a
                        href={`#${formatChapterAnchorId(ch.numberRoman)}`}
                        className="hd-font-body text-sm block hover:underline underline-offset-4"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        <span className="hd-font-display font-semibold mr-2" style={{ color: 'var(--hd-copper)' }}>
                          {ch.numberRoman}.
                        </span>
                        {ch.title}
                      </a>
                    </li>
                  ))}
                </ol>

                {/* Verification Colophon */}
                <div className="pt-6 mt-6 border-t space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <p className="hd-kicker">VERIFICATION LEDGER</p>
                  {story.publicationGates && (
                    <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-copper)' }}>
                      <strong>Publication Gate:</strong> Stage {story.publicationGates.currentStageNumber} (
                      {story.publicationGates.currentStage.replace(/_/g, ' ')})
                    </p>
                  )}
                  <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                    <strong>Evidence Desk:</strong> {story.factCheckedBy}
                  </p>
                  <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                    <strong>Scientific Status:</strong>{' '}
                    {story.scientificReviewer ||
                      'Desk Baseline Correlation Only (Independent Specialist Review Not Claimed)'}
                  </p>
                  <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                    <strong>Region:</strong> {story.region}
                  </p>
                  {story.supplementaryDatasetUrl && (
                    <p className="hd-font-body text-xs leading-relaxed pt-1">
                      <a
                        href={toKewPlatformUrl(story.supplementaryDatasetUrl)}
                        className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        <span>{story.supplementaryDatasetLabel || 'Download Supplementary Dataset (CSV)'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </p>
                  )}
                  {story.reportingBeatLabel && (
                    <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                      <strong>Beat:</strong>{' '}
                      {story.reportingBeatSlug ? (
                        <Link
                          href={HD_ROUTES.reportingBeat(story.reportingBeatSlug)}
                          className="underline underline-offset-2"
                          style={{ color: 'var(--hd-copper)' }}
                        >
                          {story.reportingBeatLabel}
                        </Link>
                      ) : (
                        story.reportingBeatLabel
                      )}
                    </p>
                  )}
                </div>

                {/* Companion KEW Scientific Module Link */}
                {story.relatedKewModule && (
                  <div
                    className="p-4 border space-y-2"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <p className="hd-folio-meta">COMPANION KEW OBSERVATORY</p>
                    <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {story.relatedKewModule.scientificContext}
                    </p>
                    <a
                      href={toKewPlatformUrl(story.relatedKewModule.href)}
                      className="hd-font-sans inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.16em] uppercase"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      <span>{story.relatedKewModule.label}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* Right 9 Cols: Literary Narrative Column */}
          <div className="lg:col-span-9 order-1 lg:order-2 space-y-14 max-w-[740px]">
            {/* Prominent AI / Automated Research Synthesis Disclosure Banner */}
            {(story.isAiAssisted || story.aiAssistanceDisclosure) && (
              <div
                role="note"
                aria-label="Automated Research Synthesis Disclosure"
                className="p-5 sm:p-6 border-l-4 space-y-2"
                style={{
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker">
                  AUTOMATED MULTI-SOURCE RESEARCH SYNTHESIS · DESK REVIEWED
                </p>
                <p
                  className="hd-font-body text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {story.aiAssistanceDisclosure ||
                    'This dispatch was compiled via the Himalayan Dispatch Autonomous Newsroom Intelligence Engine (HD-ANIE) from cited external bibliographic/feed records and Kashmir EcoWatch scientific baselines, and desk-reviewed prior to publication. No firsthand field visit or spoken interview is represented.'}
                </p>
              </div>
            )}

            {/* Prominent Inaugural / Conceptual Editorial Synthesis Disclosure */}
            {story.conceptualFolioDisclosure && (
              <div
                role="note"
                aria-label="Inaugural Editorial Synthesis Disclosure"
                className="p-5 sm:p-6 border space-y-1.5"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker">
                  INAUGURAL EDITORIAL FOLIO · DESK &amp; OBSERVATORY SYNTHESIS
                </p>
                <p
                  className="hd-font-body text-xs sm:text-sm leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {story.conceptualFolioDisclosure}
                </p>
              </div>
            )}

            {/* Optional Embedded Editorial Data Graphic */}
            {story.dataVisualization && (
              <EditorialDataGraphic spec={story.dataVisualization} />
            )}

            {/* Chapters */}
            {story.chapters.map((ch, chIdx) => {
              const chapterAnchorId = formatChapterAnchorId(ch.numberRoman);
              return (
                <section
                  key={ch.numberRoman}
                  id={chapterAnchorId}
                  className="space-y-6 scroll-mt-24"
                >
                  {(story.chapters.length > 1 || ch.title) && (
                    <div className="space-y-1.5 pb-2">
                      <span className="hd-kicker">
                        {ch.numberRoman === 'PROLOGUE' || ch.numberRoman === 'EPILOGUE'
                          ? ch.numberRoman
                          : `CHAPTER ${ch.numberRoman}`}
                      </span>
                      <div className="flex items-baseline justify-between gap-3">
                        <h2
                          className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {ch.title}
                        </h2>
                        <KewChapterAnchorCopyButton
                          canonicalPath={canonicalStoryPath}
                          chapterAnchor={ch.numberRoman}
                          chapterTitle={ch.title}
                          isPublished={story.isPublished}
                          isPreviewMode={disablePublicSharing}
                          workflowStage={story.workflowStage}
                          className="shrink-0"
                        />
                      </div>
                      {ch.subtitle && (
                        <p
                          className="hd-font-display text-lg sm:text-xl italic"
                          style={{ color: 'var(--hd-fg-muted)' }}
                        >
                          {ch.subtitle}
                        </p>
                      )}
                    </div>
                  )}

                <div className="hd-prose">
                  {ch.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className={chIdx === 0 && pIdx === 0 ? 'hd-dropcap' : ''}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Structured Bullet Ledger (e.g. Archive Standards) */}
                {ch.bulletList && ch.bulletList.length > 0 && (
                  <ul
                    className="p-5 sm:p-6 border space-y-2.5 my-6"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    {ch.bulletList.map((item, bIdx) => (
                      <li
                        key={bIdx}
                        className="hd-font-body text-sm sm:text-base flex items-start gap-3 leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        <span
                          className="hd-font-display font-semibold shrink-0"
                          style={{ color: 'var(--hd-copper)' }}
                        >
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Monumental Commemoration Figures Ledger (Section II) */}
                {ch.commemorationLedger && (
                  <div
                    className="my-8 p-6 sm:p-8 border space-y-5"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <p className="hd-kicker">{ch.commemorationLedger.heading}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
                      {ch.commemorationLedger.items.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="border-l-2 pl-4 space-y-1"
                          style={{ borderColor: 'var(--hd-copper)' }}
                        >
                          <div className="hd-folio-meta">{st.label}</div>
                          <div
                            className="hd-font-display text-4xl sm:text-5xl font-semibold tabular-nums"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {st.figure}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="pt-4 border-t space-y-1.5 text-xs sm:text-sm"
                      style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                    >
                      <p className="hd-font-body leading-relaxed">
                        {ch.commemorationLedger.methodologicalNote}
                      </p>
                      <p className="hd-folio-meta">{ch.commemorationLedger.sourceNote}</p>
                    </div>
                  </div>
                )}

                {/* Print-Caliber Editorial Table (Disciplines, Safety Questions, Proposed Charter) */}
                {ch.editorialTable && (
                  <div
                    className="my-8 border overflow-hidden"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    {(ch.editorialTable.kicker || ch.editorialTable.caption) && (
                      <div
                        className="px-5 py-4 border-b space-y-1"
                        style={{ borderColor: 'var(--hd-rule)' }}
                      >
                        {ch.editorialTable.kicker && (
                          <p className="hd-kicker">{ch.editorialTable.kicker}</p>
                        )}
                        {ch.editorialTable.caption && (
                          <p
                            className="hd-font-display text-lg sm:text-xl italic"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {ch.editorialTable.caption}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr
                            className="border-b"
                            style={{ borderColor: 'var(--hd-rule-strong)' }}
                          >
                            <th className="py-3 px-5 hd-folio-meta">
                              {ch.editorialTable.headers[0]}
                            </th>
                            <th className="py-3 px-5 hd-folio-meta">
                              {ch.editorialTable.headers[1]}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                          {ch.editorialTable.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td
                                className="py-3.5 px-5 hd-font-body text-sm font-semibold align-top whitespace-nowrap"
                                style={{ color: 'var(--hd-fg)' }}
                              >
                                {row[0]}
                              </td>
                              <td
                                className="py-3.5 px-5 hd-font-body text-sm leading-relaxed"
                                style={{ color: 'var(--hd-fg-secondary)' }}
                              >
                                {row[1]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {ch.editorialTable.footnote && (
                      <div
                        className="px-5 py-3 border-t text-xs italic hd-font-body"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          color: 'var(--hd-fg-muted)',
                        }}
                      >
                        {ch.editorialTable.footnote}
                      </div>
                    )}
                  </div>
                )}

                {/* Field Marginalia Callout */}
                {ch.fieldNote && (
                  <div
                    className="p-5 sm:p-6 border-l-2 space-y-1.5 my-8"
                    style={{
                      borderColor: 'var(--hd-copper)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="hd-kicker">{ch.fieldNote.label}</span>
                      {ch.fieldNote.coordinates && (
                        <span className="hd-folio-meta">{ch.fieldNote.coordinates}</span>
                      )}
                    </div>
                    <p
                      className="hd-font-body text-sm sm:text-[15px] leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {ch.fieldNote.detail}
                    </p>
                  </div>
                )}

                {/* Oversized Editorial Pull Quote */}
                {ch.pullQuote && (
                  <blockquote
                    className="my-10 py-8 border-t border-b space-y-3"
                    style={{ borderColor: 'var(--hd-rule-strong)' }}
                  >
                    <p
                      className="hd-font-display text-2xl sm:text-4xl italic font-medium leading-[1.2]"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      “{ch.pullQuote.quote}”
                    </p>
                    {ch.pullQuote.attribution && (
                      <footer className="hd-folio-meta">
                        — {ch.pullQuote.attribution}
                        {ch.pullQuote.context ? ` · ${ch.pullQuote.context}` : ''}
                      </footer>
                    )}
                  </blockquote>
                )}

                {/* Embedded Chapter Plate */}
                {ch.plate && (
                  <figure className="my-10 space-y-2.5">
                    <div className="overflow-hidden bg-[#171717]">
                      <img
                        src={ch.plate.imageUrl}
                        alt={ch.plate.caption}
                        className={`w-full h-auto object-cover ${
                          ch.plate.monochrome ? 'grayscale contrast-125' : ''
                        }`}
                      />
                    </div>
                    <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                      <span className="hd-font-body italic">{ch.plate.caption}</span>
                      <span className="hd-folio-meta">{ch.plate.credit}</span>
                    </figcaption>
                  </figure>
                )}

                {story.slug === 'selective-environmental-consciousness' &&
                  ch.numberRoman === 'IX' && <EnvironmentalConsistencyExperiment />}
                {story.slug === 'the-mathematics-of-a-dying-lake' &&
                  ch.numberRoman === 'VIII' && (
                    <DalLakeMathematicsWorkbench variant="editorial" />
                  )}
                {story.slug === 'who-are-we-researching-for' &&
                  ch.numberRoman === 'V' && (
                    <ResearchAccountabilityWorkbench variant="editorial" />
                  )}
                {story.slug === 'the-sky-has-no-borders' &&
                  ch.numberRoman === 'V' && <AvianMigrationRefugiaWorkbench />}
                {story.slug === 'when-politics-promises-green' &&
                  ch.numberRoman === 'VI' && <WhempManifestoWorkbench />}
                {story.slug ===
                  'when-environmental-laws-exist-but-the-environment-has-no-defence' &&
                  ch.numberRoman === 'VI' && (
                    <EnvironmentalLawAccountabilityWorkbench variant="editorial" />
                  )}
                {story.slug === 'south-asias-environmental-vanguard' &&
                  ch.numberRoman === 'V' && (
                    <SouthAsianVanguardWorkbench variant="editorial" />
                  )}
                {story.slug === 'the-national-park-that-became-a-golf-course' &&
                  ch.numberRoman === 'VI' && (
                    <SalimAliParkForensicWorkbench variant="editorial" />
                  )}
                {story.slug === 'the-art-of-encroachment' &&
                  ch.numberRoman === 'VI' && (
                    <DalLakeEncroachmentWorkbench variant="editorial" />
                  )}
                {story.slug === 'the-laboratory-that-kashmir-lost' &&
                  ch.numberRoman === 'VI' && <HabakLaboratoryWorkbench />}
                {story.slug === 'the-price-of-power' &&
                  ch.numberRoman === 'V' && (
                    <HydropowerEnergyJusticeWorkbench variant="editorial" />
                  )}
                {story.slug ===
                  'the-western-himalayas-are-sitting-on-a-time-bomb' &&
                  ch.numberRoman === 'VIII' && (
                    <HimalayanTimeBombWorkbench variant="editorial" />
                  )}
              </section>
              );
            })}

            {/* Interview / Constructed Editorial Dialogue Q&A Exchanges */}
            {isInterview && story.interviewExchanges && (
              <section className="space-y-8 pt-4 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
                {story.dialogueMode === 'constructed_editorial_dialogue' && (
                  <div
                    className="p-5 border-l-2 space-y-1.5"
                    style={{
                      borderColor: 'var(--hd-copper)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <p className="hd-kicker">
                      FORMAT CLASSIFICATION · CONSTRUCTED EDITORIAL DIALOGUE
                    </p>
                    <p
                      className="hd-font-body text-xs sm:text-sm leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      This feature is a structured editorial question-and-answer synthesis of
                      peer-reviewed Himalayan glaciological, hydrological, and statutory hydropower
                      literature. It is not a verbatim transcript of a single spoken interview, and
                      no statement is attributed to an uninterviewed living individual.
                    </p>
                  </div>
                )}

                {story.interviewSubjectBio && (
                  <p
                    className="hd-font-body text-sm italic p-4 border"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                      color: 'var(--hd-fg-muted)',
                    }}
                  >
                    {story.interviewSubjectBio}
                  </p>
                )}

                {story.interviewExchanges.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <p
                      className="hd-font-sans text-[11px] font-bold tracking-[0.22em] uppercase"
                      style={{
                        color:
                          item.speakerRole === 'dispatch'
                            ? 'var(--hd-copper)'
                            : 'var(--hd-fg)',
                      }}
                    >
                      {item.speakerLabel}
                    </p>
                    <p
                      className={`hd-font-body text-lg leading-[1.82] ${
                        item.speakerRole === 'dispatch' ? 'italic font-medium' : ''
                      }`}
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.text}
                    </p>
                    {item.editorialAnnotation && (
                      <p
                        className="hd-font-body text-xs italic pl-4 border-l"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          color: 'var(--hd-fg-muted)',
                        }}
                      >
                        {item.editorialAnnotation}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Photo Essay Full-Size Numbered Plates */}
            {story.photoPlates && story.photoPlates.length > 0 && (
              <section className="space-y-16 pt-6">
                {story.photoPlates.map((plate) => (
                  <figure
                    key={plate.plateRoman}
                    className="p-5 sm:p-8 bg-[#171717] text-[#F2EFE7] space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-[#F2EFE7]/15 pb-3">
                      <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                        {plate.plateRoman}
                      </span>
                      <span className="hd-font-sans text-[11px] tracking-[0.18em] uppercase text-[#A39B8B]">
                        {plate.location} &nbsp;·&nbsp; {plate.elevation}
                      </span>
                    </div>

                    <div className="overflow-hidden">
                      <img
                        src={plate.imageUrl}
                        alt={`${plate.plateRoman}: ${plate.title}`}
                        className="w-full h-auto object-cover grayscale contrast-125"
                      />
                    </div>

                    <figcaption className="space-y-2 pt-1">
                      <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold text-[#F2EFE7]">
                        {plate.title}
                      </h3>
                      <p className="hd-font-body text-sm sm:text-base text-[#F2EFE7]/82 leading-relaxed">
                        {plate.narrative}
                      </p>
                      <p className="hd-font-sans text-[10px] tracking-[0.18em] uppercase text-[#A39B8B] pt-1">
                        {plate.exposureMeta}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </section>
            )}

            {/* End-of-Article Ornament */}
            <div className="py-4 flex items-center gap-4">
              <span className="h-[1px] flex-1" style={{ backgroundColor: 'var(--hd-rule)' }} />
              <span className="hd-font-display text-xl" style={{ color: 'var(--hd-copper)' }}>
                ❖
              </span>
              <span className="h-[1px] flex-1" style={{ backgroundColor: 'var(--hd-rule)' }} />
            </div>

            {/* Solemn Memorial Dedication & Imprint Monument */}
            {story.memorialDedication && (
              <section
                aria-label="In Perpetual Remembrance"
                className="my-8 p-8 sm:p-12 border-t-2 border-b-2 text-center space-y-6"
                style={{
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker tracking-[0.28em]">
                  {story.memorialDedication.overline}
                </p>
                <h2
                  className="hd-font-display text-4xl sm:text-5xl italic font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {story.memorialDedication.title}
                </h2>
                <p
                  className="hd-font-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {story.memorialDedication.dedication}
                </p>
                <div
                  className="pt-6 border-t max-w-md mx-auto space-y-1.5"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div
                    className="hd-font-display text-xl font-semibold tracking-[0.12em]"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {story.memorialDedication.imprintName}
                  </div>
                  <div className="hd-kicker">{story.memorialDedication.imprintMotto}</div>
                  <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                    {story.memorialDedication.imprintAffiliation}
                  </p>
                  <p className="hd-folio-meta">{story.memorialDedication.imprintLocation}</p>
                </div>
              </section>
            )}

            {/* Imported KEW Green Martyrs Roll of Honour (Live from kew-green-martyrs.ts) */}
            {story.embedGreenMartyrsRoll && (
              <section
                aria-label="KEW Green Martyrs Roll of Honour"
                className="p-6 sm:p-8 border space-y-6"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="space-y-1">
                    <span className="hd-kicker">
                      IMPORTED KEW MEMORIAL ARCHIVE · {MARTYRS_REGISTRY_SUMMARY.profilesDrafted} DOCUMENTED DOSSIERS
                    </span>
                    <h3
                      className="hd-font-display text-2xl sm:text-3xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      Roll of Honour &amp; Evidentiary Memorial Register
                    </h3>
                    <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                      Imported directly from the Kashmir EcoWatch Green Martyrs database, distinguishing formally commemorated Forest Protection Martyrs, Fallen Environmental Service Personnel, and supporting enforcement/security cases while flagging unresolved archival records transparently.
                    </p>
                  </div>
                  <a
                    href={toKewPlatformUrl('/resources/kew-green-heroes?tab=green-martyrs')}
                    className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] font-semibold tracking-[0.16em] uppercase shrink-0"
                    style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                  >
                    <span>Full Registry</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ALL' as const, label: `All Dossiers (${GREEN_MARTYRS_DOSSIERS.length})` },
                    {
                      id: 'JK_FOREST' as const,
                      label: `Forest Protection Martyrs (${GREEN_MARTYRS_DOSSIERS.filter((m) => m.category === 'Forest Protection Martyrs').length})`,
                    },
                    {
                      id: 'SERVICE' as const,
                      label: `Fallen Service Personnel (${GREEN_MARTYRS_DOSSIERS.filter((m) => m.category === 'Fallen Environmental Service Personnel').length})`,
                    },
                    {
                      id: 'SUPPORTING' as const,
                      label: `Supporting Enforcement (${GREEN_MARTYRS_DOSSIERS.filter((m) => m.category.includes('Supporting')).length})`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setRollFilter(tab.id)}
                      className="px-3 py-1.5 text-[10px] hd-font-sans tracking-[0.14em] uppercase border transition-colors"
                      style={{
                        borderColor:
                          rollFilter === tab.id ? 'var(--hd-copper)' : 'var(--hd-rule)',
                        color:
                          rollFilter === tab.id ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                        fontWeight: rollFilter === tab.id ? 700 : 500,
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="divide-y max-h-[540px] overflow-y-auto pr-1" style={{ borderColor: 'var(--hd-rule)' }}>
                  {GREEN_MARTYRS_DOSSIERS.filter((m) => {
                    if (rollFilter === 'JK_FOREST') return m.category === 'Forest Protection Martyrs';
                    if (rollFilter === 'SERVICE')
                      return m.category === 'Fallen Environmental Service Personnel';
                    if (rollFilter === 'SUPPORTING') return m.category.includes('Supporting');
                    return true;
                  }).map((m) => (
                    <div key={m.id} className="py-4 space-y-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4
                          className="hd-font-display text-xl font-semibold"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {m.name}{' '}
                          <span className="hd-folio-meta ml-1.5">({m.year} · {m.district})</span>
                        </h4>
                        <span className="hd-folio-meta">{m.category}</span>
                      </div>
                      <p className="hd-font-sans text-[11px] tracking-[0.1em] uppercase" style={{ color: 'var(--hd-copper)' }}>
                        {m.designation}
                      </p>
                      <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {m.narrative}
                      </p>
                      {m.identityReconciliationNote && (
                        <p className="hd-font-body text-xs italic flex items-center gap-1.5" style={{ color: 'var(--hd-copper)' }}>
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          <span>Archival Note: {m.identityReconciliationNote}</span>
                        </p>
                      )}
                      <p className="hd-folio-meta">Status: {m.researchStatus}</p>
                    </div>
                  ))}
                </div>

                {/* Ladakh Archival Transparency Note */}
                <div
                  className="p-4 border-t text-xs space-y-1"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                >
                  <strong className="hd-folio-meta block" style={{ color: 'var(--hd-fg)' }}>
                    {LADAKH_MARTYRS_RESEARCH_NOTE.title}
                  </strong>
                  <p className="hd-font-body leading-relaxed">
                    {LADAKH_MARTYRS_RESEARCH_NOTE.summary}
                  </p>
                </div>
              </section>
            )}

            {/* Documentary Sources & Further Reading */}
            {story.documentarySources && story.documentarySources.length > 0 && (
              <section
                aria-label="Documentary Sources and Further Reading"
                className="border overflow-hidden"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
                  <p className="hd-kicker">DOCUMENTARY SOURCES &amp; FURTHER READING</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                        <th className="py-3 px-5 hd-folio-meta">Source</th>
                        <th className="py-3 px-5 hd-folio-meta">Documentary relevance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                      {story.documentarySources.map((src, idx) => (
                        <tr key={idx}>
                          <td className="py-3 px-5 text-sm hd-font-body font-semibold">
                            {src.url.startsWith('/') ? (
                              <a
                                href={toKewPlatformUrl(src.url)}
                                className="inline-flex items-center gap-1.5 underline underline-offset-4"
                                style={{ color: 'var(--hd-copper)' }}
                              >
                                <span>{src.label}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                              </a>
                            ) : (
                              <a
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 underline underline-offset-4"
                                style={{ color: 'var(--hd-copper)' }}
                              >
                                <span>{src.label}</span>
                                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                              </a>
                            )}
                          </td>
                          <td
                            className="py-3 px-5 text-sm hd-font-body"
                            style={{ color: 'var(--hd-fg-secondary)' }}
                          >
                            {src.relevance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Editorial Publication Metadata & 10-Stage Gate Colophon */}
            {(story.editorialMetadataTable || story.editorialVerificationNote || story.publicationGates) && (
              <section
                aria-label="Editorial Publication Metadata"
                className="border space-y-5 p-5 sm:p-6"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker">EDITORIAL PUBLICATION METADATA &amp; 10-STAGE GATE LEDGER</p>
                {story.publicationGates && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                          <th className="py-2 pr-3 hd-folio-meta">Gate</th>
                          <th className="py-2 px-3 hd-folio-meta">Status</th>
                          <th className="py-2 pl-3 hd-folio-meta">Record / Scope</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                        {story.publicationGates.gates.map((g) => (
                          <tr key={g.stageId}>
                            <td
                              className="py-2 pr-3 text-xs hd-font-body font-semibold whitespace-nowrap"
                              style={{ color: 'var(--hd-fg)' }}
                            >
                              {g.stageNumber} · {g.label}
                            </td>
                            <td
                              className="py-2 px-3 text-[10px] hd-font-sans uppercase tracking-[0.14em] whitespace-nowrap"
                              style={{
                                color:
                                  g.status === 'completed'
                                    ? 'var(--hd-fg)'
                                    : g.status === 'in_progress'
                                      ? 'var(--hd-copper)'
                                      : 'var(--hd-fg-muted)',
                              }}
                            >
                              {g.status.replace(/_/g, ' ')}
                            </td>
                            <td
                              className="py-2 pl-3 text-xs hd-font-body"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {g.notes || g.verifiedBy || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {story.editorialMetadataTable && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                          <th className="py-2.5 pr-4 hd-folio-meta">Attribute</th>
                          <th className="py-2.5 pl-4 hd-folio-meta">Final assignment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                        {sanitizePublicEditorialMetadataRows(
                          story.editorialMetadataTable,
                          story.readingTimeMinutes
                        ).map((m, idx) => (
                          <tr key={idx}>
                            <td
                              className="py-2.5 pr-4 text-xs sm:text-sm hd-font-body font-semibold whitespace-nowrap"
                              style={{ color: 'var(--hd-fg)' }}
                            >
                              {m.attribute}
                            </td>
                            <td
                              className="py-2.5 pl-4 text-xs sm:text-sm hd-font-body"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {m.assignment}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {story.editorialVerificationNote && (
                  <div
                    className="pt-4 border-t text-xs sm:text-sm hd-font-body leading-relaxed"
                    style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                  >
                    <strong style={{ color: 'var(--hd-fg)' }}>
                      Editorial verification note:
                    </strong>{' '}
                    {story.editorialVerificationNote}
                  </div>
                )}
              </section>
            )}

            {/* Transparent Corrections & Post-Publication Clarifications Ledger */}
            {(story.corrections?.length ?? 0) > 0 && (
              <section
                aria-label="Corrections and Clarifications"
                className="p-5 sm:p-6 border space-y-3"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                    <h3 className="hd-kicker">CORRECTIONS &amp; CLARIFICATIONS</h3>
                  </div>
                  <Link href={HD_ROUTES.corrections} className="hd-folio-meta hover:underline">
                    Public Corrections Register →
                  </Link>
                </div>
                {(story.corrections ?? []).map((c) => (
                  <div key={c.id} className="space-y-1 text-xs sm:text-sm">
                    <p className="hd-folio-meta">
                      <Link href={HD_ROUTES.correctionRecord(c.id)} className="hover:underline">
                        {c.kind} &nbsp;·&nbsp; {c.date}
                      </Link>
                    </p>
                    <p className="hd-font-body leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {c.note}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Article Conclusion Sharing Control — Before Author Portfolio & Next-Article Navigation */}
            <KewContentShare
              variant="article-toolbar"
              label={isMonographStory ? 'Share This Monograph' : 'Share This Dispatch'}
              title={story.title}
              description={shareDescription}
              canonicalPath={canonicalStoryPath}
              chapters={shareableChapters}
              isPublished={story.isPublished}
              isPreviewMode={disablePublicSharing}
              workflowStage={story.workflowStage}
            />

            {/* Journalist Bio Box */}
            {journalist && (
              <section
                className="p-6 sm:p-8 border flex flex-col sm:flex-row gap-6 items-start"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <img
                  src={journalist.portraitUrl}
                  alt={journalist.name}
                  className="w-20 h-20 object-cover shrink-0 grayscale"
                />
                <div className="space-y-2">
                  <p className="hd-kicker">{journalist.roleTitle}</p>
                  <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    <Link
                      href={HD_ROUTES.journalistPortfolio(journalist.slug)}
                      className="hover:underline underline-offset-4"
                    >
                      {journalist.name}
                    </Link>
                  </h3>
                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {journalist.shortBio}
                  </p>
                  <Link
                    href={HD_ROUTES.journalistPortfolio(journalist.slug)}
                    className="hd-kicker inline-block pt-1 hover:underline"
                  >
                    View Portfolio &amp; Approved Commissions →
                  </Link>
                </div>
              </section>
            )}

            {/* Continue Reading in Edition */}
            {nextStory && (
              <section
                className="pt-10 border-t space-y-3"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                <p className="hd-kicker">NEXT IN THIS EDITION · {nextStory.departmentRubric}</p>
                <Link
                  href={resolveCanonicalStoryUrl(nextStory)}
                  className="group flex items-baseline justify-between gap-4"
                >
                  <h3
                    className="hd-font-display text-3xl sm:text-4xl font-semibold group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {nextStory.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                </Link>
                <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                  By {nextStory.bylineDisplay} &nbsp;·&nbsp; {nextStory.readingTimeMinutes} min read
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
