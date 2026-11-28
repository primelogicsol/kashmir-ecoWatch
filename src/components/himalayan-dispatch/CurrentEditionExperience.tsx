import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  DailyDispatchArticle,
  MagazineEdition,
  MagazineStory,
  PublicForthcomingAssignmentPreview,
} from '@/types/himalayan-dispatch';
import {
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  toCanonicalIssueSlug,
} from '@/lib/himalayan-dispatch-routes';
import { KewContentShare } from '@/components/common/KewContentShare';
import { isHimalayanDispatchMonograph } from '@/lib/sharing/kew-content-sharing';
import { EditorialDataGraphic } from './EditorialDataGraphic';
import { ForthcomingEditionSpread } from './ForthcomingEditionSpread';
import {
  HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY,
  HIMALAYAN_DISPATCH_FOUNDING_STORY,
} from '@/data/himalayan-dispatch-founding-story';
import {
  BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE,
  BEYOND_THE_CONFERENCE_SERIES_META,
  BEYOND_THE_CONFERENCE_SERIES_SLUGS,
  CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_META,
  CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_SLUGS,
  CIVIL_SOCIETY_DEFINING_PRINCIPLE,
  HIMALAYAN_DISPATCH_COMPLETE_EDITORIAL_ARCHITECTURE,
  HIMALAYAN_DISPATCH_EDITORIAL_DIFFERENCE_ROWS,
  HIMALAYAN_DISPATCH_FOUR_RESPONSIBILITY_LEVELS,
  HIMALAYAN_DISPATCH_NGO_OUTCOME_MATRIX,
  HIMALAYAN_DISPATCH_PERMANENT_RESPONSIBILITIES,
  HIMALAYAN_DISPATCH_ULTIMATE_ECOLOGICAL_MEASURE,
  SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04,
  SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12,
  SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17,
} from '@/data/himalayan-dispatch-beyond-conference';
import {
  HIMALAYAN_DISPATCH_FIVE_FLAGSHIP_INVESTIGATIONS,
  SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC,
} from '@/data/himalayan-dispatch-selective-consciousness-monograph';
import { WHEN_POLITICS_PROMISES_GREEN_SPEC } from '@/data/himalayan-dispatch-when-politics-promises-green-monograph';
import { HABAK_LABORATORY_SPEC } from '@/data/himalayan-dispatch-habak-laboratory-monograph';
import { ENVIRONMENTAL_LAW_MONOGRAPH_SPEC } from '@/data/himalayan-dispatch-environmental-law-monograph';
import { SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC } from '@/data/himalayan-dispatch-south-asian-vanguard-monograph';
import { PRICE_OF_POWER_MONOGRAPH_SPEC } from '@/data/himalayan-dispatch-price-of-power-monograph';
import {
  FOUR_STAGE_DEVELOPMENT_PROGRESSION,
  KASHMIR_SEISMIC_GAP_METRICS,
  THE_TIME_BOMB_SPEC,
} from '@/data/himalayan-dispatch-time-bomb-monograph';
import {
  KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5,
  NASEEM_BAGH_CHINARS_SPEC,
} from '@/data/himalayan-dispatch-naseem-bagh-chinars-monograph';
import { WEALTH_BENEATH_MOUNTAINS_SPEC } from '@/data/himalayan-dispatch-wealth-beneath-mountains-monograph';
import {
  AJK_EDITORIAL_PRIORITIES_6,
  AJK_RIVERS_MONOGRAPH_SPEC,
  MUZAFFARABAD_DIVERSION_METRICS,
} from '@/data/himalayan-dispatch-ajk-rivers-monograph';

export function CurrentEditionExperience({
  edition,
  stories,
  dailyDispatches = [],
  forthcomingEdition,
  forthcomingPreviews,
  surfaceMode = 'homepage',
}: {
  edition: MagazineEdition;
  stories: MagazineStory[];
  dailyDispatches?: DailyDispatchArticle[];
  forthcomingEdition: MagazineEdition;
  forthcomingPreviews: PublicForthcomingAssignmentPreview[];
  surfaceMode?: 'homepage' | 'current-issue';
}) {
  const isMonograph = isHimalayanDispatchMonograph(edition);
  const canonicalIssuePath = HD_ROUTES.issue(toCanonicalIssueSlug(edition.slug));
  const bySlug = (slug: string) => stories.find((s) => s.slug === slug);

  const coverStory =
    bySlug('the-price-of-protecting-paradise') ||
    bySlug('when-mountains-speak-who-is-listening') ||
    stories[0];
  const bigRead = bySlug('the-water-we-have-forgotten');
  const specialDalLakeInvestigation = bySlug('the-mathematics-of-a-dying-lake');
  const specialHabakLaboratoryInvestigation = bySlug('the-laboratory-that-kashmir-lost');
  const habakLabNo = String(
    Math.max(1, stories.findIndex((s) => s.slug === 'the-laboratory-that-kashmir-lost') + 1)
  ).padStart(2, '0');
  const fieldWetlands = bySlug('where-the-wild-waters-end');
  const fieldCommunities = bySlug('the-people-who-guard-the-forest');
  const visualJournal = bySlug('an-elegy-for-winter');
  const investigation = bySlug('gravel-concrete-and-the-vanishing-floodplain');
  const dataEssay = bySlug('thirty-eight-winters-of-snowline-retreat');
  const interview = bySlug('a-glacier-does-not-negotiate-with-five-year-plans');
  const charterEditorial = bySlug('why-the-western-himalayas-demand-slow-journalism');
  const specialResearchAccountabilityInvestigation = bySlug('who-are-we-researching-for');
  const specialSouthAsianVanguardFeature = bySlug('south-asias-environmental-vanguard');
  const southAsianVanguardNo = String(
    Math.max(
      1,
      stories.findIndex((s) => s.slug === 'south-asias-environmental-vanguard') + 1
    )
  ).padStart(2, '0');
  const dispatchNoOf = (slug: string) =>
    String(Math.max(1, stories.findIndex((s) => s.slug === slug) + 1)).padStart(2, '0');
  const specialNaseemBaghInvestigation = bySlug('the-chinars-in-the-shadow-of-concrete');
  const naseemBaghNo = dispatchNoOf('the-chinars-in-the-shadow-of-concrete');
  const specialPriceOfPowerInvestigation = bySlug('the-price-of-power');
  const priceOfPowerNo = dispatchNoOf('the-price-of-power');
  const specialWealthBeneathMountainsInvestigation = bySlug(
    'the-wealth-beneath-the-mountains'
  );
  const wealthBeneathMountainsNo = dispatchNoOf('the-wealth-beneath-the-mountains');
  const specialAjkRiversInvestigation = bySlug(
    'the-rivers-that-no-longer-belong-to-their-valleys'
  );
  const ajkRiversNo = dispatchNoOf(
    'the-rivers-that-no-longer-belong-to-their-valleys'
  );
  const specialTimeBombInvestigation = bySlug(
    'the-western-himalayas-are-sitting-on-a-time-bomb'
  );
  const timeBombNo = dispatchNoOf(
    'the-western-himalayas-are-sitting-on-a-time-bomb'
  );
  const specialAtmosphereInvestigation = bySlug('the-atmosphere-has-no-borders');
  const specialEnvironmentalLawFlagship = bySlug(
    'when-environmental-laws-exist-but-the-environment-has-no-defence'
  );
  const whenPoliticsPromisesGreenFlagship = bySlug('when-politics-promises-green');
  const selectiveConsciousnessFlagship = bySlug('selective-environmental-consciousness');
  const environmentalLawNo = String(
    Math.max(
      1,
      stories.findIndex(
        (s) => s.slug === 'when-environmental-laws-exist-but-the-environment-has-no-defence'
      ) + 1
    )
  ).padStart(2, '0');
  const politicsGreenNo = String(
    Math.max(1, stories.findIndex((s) => s.slug === 'when-politics-promises-green') + 1)
  ).padStart(2, '0');
  const selectiveConsciousnessNo = String(
    Math.max(1, stories.findIndex((s) => s.slug === 'selective-environmental-consciousness') + 1)
  ).padStart(2, '0');
  const beyondConferenceStories = BEYOND_THE_CONFERENCE_SERIES_SLUGS.map((sl) => bySlug(sl)).filter(
    (s): s is MagazineStory => Boolean(s)
  );
  const civilSocietyStories = CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_SLUGS.map((sl) => bySlug(sl)).filter(
    (s): s is MagazineStory => Boolean(s)
  );

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 00 — CINEMATIC INAUGURAL COVER SPREAD
          Full-bleed plate · Oversized Editorial Serif
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full px-4 sm:px-8 lg:px-14 pt-6 sm:pt-10 pb-14 sm:pb-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="hd-plate-group relative w-full min-h-[72vh] lg:min-h-[80vh] flex flex-col justify-end overflow-hidden bg-[#171717]">
            <div className="hd-plate-frame absolute inset-0">
              <img
                src={edition.coverImage}
                alt={edition.coverCaption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/92 via-[#171717]/38 to-[#171717]/15" />

            {/* Top Issue Stamp inside Cover Plate */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-14 mb-auto flex flex-wrap items-center justify-between gap-4 text-[#F2EFE7]/90">
              <div className="hd-font-sans text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase">
                {edition.issueNumberLabel}
              </div>
              <div className="hd-font-sans text-[10px] sm:text-xs font-medium tracking-[0.28em] uppercase text-[#D8C3A5]">
                {edition.volumeLabel}
              </div>
            </div>

            {/* Bottom Monumental Cover Headline */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-5xl space-y-5 sm:space-y-6 text-[#F2EFE7]">
              <p className="hd-font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#D8C3A5]">
                COVER INQUIRY &nbsp;·&nbsp; {edition.coverLocation}
              </p>

              <h1 className="hd-font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.1rem] font-semibold leading-[0.98] tracking-[-0.01em] text-[#F2EFE7]">
                {edition.title}
              </h1>

              <p className="hd-font-body text-lg sm:text-xl md:text-2xl text-[#F2EFE7]/88 max-w-3xl leading-relaxed">
                {edition.subtitle}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href={HD_ROUTES.inauguralIssue}
                  className="hd-font-sans inline-flex items-center gap-3 px-6 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#8C3125' }}
                >
                  <span>Explore the edition</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {coverStory && (
                  <Link
                    href={resolveCanonicalStoryUrl(coverStory)}
                    className="hd-font-sans inline-flex items-center gap-2 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-medium tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                  >
                    <span>Read Cover Story ({coverStory.readingTimeMinutes} min)</span>
                  </Link>
                )}

                {surfaceMode === 'homepage' ? (
                  <KewContentShare
                    variant="editorial-button"
                    surfaceTone="darkplate"
                    label="Share Himalayan Dispatch"
                    title="Himalayan Dispatch — Environmental Journalism & Magazine"
                    description="Himalayan Dispatch is an official environmental magazine of Kashmir EcoWatch exploring fragile landscapes, fallen conservation defenders, investigative journalism, and ecological truth across the Western Himalayas."
                    canonicalPath="/himalayan-dispatch"
                    isPublished
                  />
                ) : (
                  <KewContentShare
                    variant="editorial-button"
                    surfaceTone="darkplate"
                    label={isMonograph ? 'Share This Monograph' : 'Share This Issue'}
                    title={`${edition.title} — ${edition.volumeLabel} | Himalayan Dispatch`}
                    description={edition.subtitle}
                    canonicalPath={canonicalIssuePath}
                    editionStatus={edition.status}
                    isPublished={edition.status !== 'forthcoming'}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Plate Caption & Credit Hairline */}
          <div
            className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            style={{ color: 'var(--hd-fg-muted)' }}
          >
            <p className="hd-font-body italic">{edition.coverCaption}</p>
            <span className="hd-folio-meta shrink-0">{edition.coverCredit}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          DUAL PUBLICATION STREAM GATEWAY
          Stream 01: The Daily Dispatch  ×  Stream 02: The Monthly Issue
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-14 border-t"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Stream 01 Card */}
          <div
            className="p-6 sm:p-8 border flex flex-col justify-between space-y-5"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="hd-kicker">LATEST DISPATCHES · STREAM 01</span>
                <span className="hd-folio-meta">CONTINUOUSLY UPDATED</span>
              </div>
              <h2
                className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
                style={{ color: 'var(--hd-fg)' }}
              >
                The Environmental Newsroom
              </h2>
              <p
                className="hd-font-body text-base leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Continuously updated approved reporting, scientific discoveries, and regional
                environmental developments across Kashmir, Jammu, Ladakh, AJ&amp;K, Gilgit, and
                Baltistan—connected to Kashmir EcoWatch baseline intelligence.
              </p>

              {dailyDispatches.length > 0 && (
                <ul className="pt-2 divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {dailyDispatches.slice(0, 3).map((dd) => (
                    <li key={dd.id} className="py-2.5">
                      <Link
                        href={HD_ROUTES.dailyDispatchArticle(dd.slug)}
                        className="block group"
                      >
                        <span className="hd-folio-meta block">
                          {dd.bureauLabel} · {dd.publishedAt}
                        </span>
                        <span
                          className="hd-font-display text-xl font-semibold group-hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {dd.headline}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.dailyDispatch}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--hd-copper-solid)' }}
              >
                <span>Open The Daily Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={HD_ROUTES.dailyDispatchArchive}
                className="hd-folio-meta hover:underline"
              >
                Chronological Archive →
              </Link>
            </div>
          </div>

          {/* Stream 02 Card */}
          <div
            className="p-6 sm:p-8 border flex flex-col justify-between space-y-5"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="hd-kicker">THE MONTHLY ISSUE · STREAM 02</span>
                <span className="hd-folio-meta">{edition.volumeLabel}</span>
              </div>
              <h2
                className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
                style={{ color: 'var(--hd-fg)' }}
              >
                The Cinematic Edition
              </h2>
              <p
                className="hd-font-body text-base leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                Curated monthly longform environmental journalism, documentary photography essays,
                investigative dossiers, and print-caliber cartography examining the deeper forces
                reshaping the Western Himalayas.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={HD_ROUTES.inauguralIssue}
                className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 border text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors hover:opacity-85"
                style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
              >
                <span>Open Volume 01 · Issue 01</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={HD_ROUTES.forthcoming}
                className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.18em] uppercase hover:underline"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                <span>Forthcoming Edition</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 00B — EDITOR'S LETTER & FOLIO TABLE OF CONTENTS LEDGER
          Asymmetrical 5 : 7 Literary Spread (Never a card grid)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="edition-folio"
        className="w-full px-4 sm:px-8 lg:px-14 py-14 sm:py-20 border-t"
        style={{ borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left 5 Cols: Signed Editor's Note */}
          <div className="lg:col-span-5 space-y-5">
            <p className="hd-kicker">LETTER FROM THE MASTHEAD</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              {edition.editorsNoteTitle}
            </h2>
            <div className="hd-prose pt-2">
              {edition.editorsNoteBody.map((para, idx) => (
                <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                  {para}
                </p>
              ))}
            </div>
            <div className="pt-3 border-t inline-block pr-8 space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
              <div className="hd-font-display text-xl italic font-semibold" style={{ color: 'var(--hd-fg)' }}>
                {edition.editorsNoteAuthor}
              </div>
              <div className="hd-folio-meta">{edition.editorsNoteRole}</div>
              <div className="hd-font-sans text-[11px] tracking-[0.16em] uppercase pt-1" style={{ color: 'var(--hd-copper)' }}>
                Himalayan Dispatch
              </div>
              <div className="hd-folio-meta">
                Kashmir EcoWatch &nbsp;·&nbsp; Western Himalayan
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Numbered Folio Table of Contents */}
          <div
            className="lg:col-span-7 lg:border-l lg:pl-14"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <div className="flex items-baseline justify-between pb-4 border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
              <span className="hd-kicker">IN THIS EDITION</span>
              <span className="hd-folio-meta">{edition.volumeLabel} &nbsp;·&nbsp; {stories.length} DISPATCHES</span>
            </div>

            <ol className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {stories.map((st, idx) => {
                const storyUrl = resolveCanonicalStoryUrl(st);
                return (
                  <li
                    key={st.id}
                    className="py-4 sm:py-5 group flex items-start justify-between gap-3"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <Link
                      href={storyUrl}
                      className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-baseline"
                    >
                      <span
                        className="col-span-2 sm:col-span-1 hd-font-display text-2xl font-medium"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="col-span-10 sm:col-span-9 space-y-1">
                        <span className="hd-folio-meta block">{st.departmentRubric}</span>
                        <h3
                          className="hd-font-display text-2xl sm:text-[1.7rem] font-semibold leading-snug group-hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {st.title}
                        </h3>
                        <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                          By {st.bylineDisplay} &nbsp;·&nbsp; {st.region}
                        </p>
                      </div>
                      <div className="hidden sm:block sm:col-span-2 text-right">
                        <span className="hd-folio-meta">
                          {st.departmentId === 'photo-essays'
                            ? `${st.readingTimeMinutes}M READ · ${st.estimatedViewingMinutes || 7}M VIEW`
                            : `${st.readingTimeMinutes} MIN`}
                        </span>
                      </div>
                    </Link>

                    <div className="pt-1 shrink-0">
                      <KewContentShare
                        variant="toc-icon"
                        title={st.title}
                        description={st.excerpt || st.subtitle}
                        canonicalPath={storyUrl}
                        isPublished={st.isPublished}
                        workflowStage={st.workflowStage}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 01 — 01 / THE BIG READ
          Tall Portrait Plate (5 cols) + Monumental Literary Essay Lead (7 cols)
          ═══════════════════════════════════════════════════════════════════════ */}
      {bigRead && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between pb-6 mb-10 sm:mb-14 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              <Link href={HD_ROUTES.department('longform-features')} className="hd-kicker hover:underline">
                01 / THE BIG READ
              </Link>
              <span className="hd-folio-meta">LONGFORM ENVIRONMENTAL FEATURE</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <Link href={resolveCanonicalStoryUrl(bigRead)} className="hd-plate-group block">
                  <div className="hd-plate-frame aspect-[3/4] w-full">
                    <img
                      src={bigRead.heroImage}
                      alt={bigRead.heroCaption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="hd-font-body text-xs italic mt-3" style={{ color: 'var(--hd-fg-muted)' }}>
                    {bigRead.heroCaption}
                  </p>
                </Link>
              </div>

              <div className="lg:col-span-7 space-y-6 lg:pl-4">
                <div
                  className="hd-font-display text-6xl sm:text-7xl font-normal leading-none select-none"
                  style={{ color: 'var(--hd-stone)' }}
                  aria-hidden="true"
                >
                  01
                </div>

                <p className="hd-kicker">{bigRead.dateline}</p>

                <Link href={resolveCanonicalStoryUrl(bigRead)} className="block group">
                  <h2
                    className="hd-font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.01] group-hover:underline underline-offset-8"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {bigRead.title}
                  </h2>
                </Link>

                <p
                  className="hd-font-display text-xl sm:text-2xl italic leading-relaxed"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  {bigRead.subtitle}
                </p>

                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-2xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {bigRead.excerpt}
                </p>

                {bigRead.chapters[0]?.pullQuote && (
                  <blockquote
                    className="border-l-2 pl-5 py-1 my-4 max-w-xl"
                    style={{ borderColor: 'var(--hd-copper)' }}
                  >
                    <p
                      className="hd-font-display text-xl sm:text-2xl italic leading-snug"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      “{bigRead.chapters[0].pullQuote.quote}”
                    </p>
                  </blockquote>
                )}

                <div
                  className="pt-4 border-t flex flex-wrap items-center justify-between gap-4 max-w-2xl"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="hd-folio-meta">
                    BY {bigRead.bylineDisplay} &nbsp;·&nbsp; {bigRead.readingTimeMinutes} MIN READ
                  </div>

                  <Link
                    href={resolveCanonicalStoryUrl(bigRead)}
                    className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    <span>Read the Feature</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL SCIENTIFIC INVESTIGATION FLAGSHIP (DISPATCH 04 + MONOGRAPH 03)
          "The Mathematics of a Dying Lake: Decades of Conservation, Crores of Expenditure
           and the Unresolved Engineering of Dal Lake"
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialDalLakeInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#171717',
            color: '#F2EFE7',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  04 &nbsp;·&nbsp; {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialDalLakeInvestigation)}
                  className="block group space-y-2"
                >
                  <h2 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] text-[#F2EFE7] group-hover:underline underline-offset-4">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.title}
                  </h2>
                  <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5]">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.subtitle}
                  </p>
                </Link>

                <p className="hd-font-body text-base sm:text-lg leading-relaxed text-[#F2EFE7]/85 max-w-3xl">
                  {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.extendedDescription}
                </p>

                <div className="grid grid-cols-3 gap-6 py-5 border-y border-[#F2EFE7]/20">
                  {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                        {st.value}
                      </div>
                      <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-[#F2EFE7]/75">
                  <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.statusBadge}
                  </p>
                  <p className="hd-font-body">
                    Proposed byline: {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.proposedByline}
                  </p>
                  <p className="hd-font-body italic text-[#F2EFE7]/65">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.geographicScope}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialDalLakeInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch 04 ({specialDalLakeInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monograph03}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                  >
                    <span>Explore Monograph 03 (10 Volumes · 62 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 border border-[#F2EFE7]/25 p-6 sm:p-7 space-y-4 bg-[#201F1D]">
                <p className="hd-font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  DAL–NIGEEN CONSERVATION MATHEMATICS · CORE AUDIT BENCHMARKS
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      Telbal Settling Basin (CAG 1998–2000)
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      7% to 57% historical sediment trapping efficiency (43–93% potential
                      pass-through) + auxiliary-basin spoil disposal paradox.
                    </p>
                  </div>
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      Peripheral STP Ring (Sept 2026 &amp; CAG Table 4.2)
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      36.70 MLD across 5 operational plants vs. ~48 MLD estimated load (+30.0 MLD
                      Gupt Ganga u/c); 2016–18 P removal 14–66% vs. &gt;90% design requirement.
                    </p>
                  </div>
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      De-Weeding, Dredging &amp; 8 Mass Balances
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      ₹28.01 cr de-weeding (57.8% outside window) &amp; ₹11.02 cr dredging audited
                      against dry-tissue P export, slurry solids, and 8 coupled lake budgets.
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F2EFE7]/20">
              {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border border-[#F2EFE7]/20 bg-[#201F1D] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <p className="hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                      {item.level}
                    </p>
                    <h4 className="hd-font-display text-xl font-semibold text-[#F2EFE7]">
                      {item.title}
                    </h4>
                    <p className="hd-font-body text-xs leading-relaxed text-[#F2EFE7]/75">
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#D8C3A5] hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL HISTORICAL & SCIENTIFIC INVESTIGATION (DISPATCH 05 + MONOGRAPH 10)
          "The Laboratory That Kashmir Lost: When a Dying Lake Lost Its Scientific Institution"
          Immediately follows Dispatch 04 (The Mathematics of a Dying Lake)
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialHabakLaboratoryInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-kicker">
                  {habakLabNo} &nbsp;·&nbsp; {HABAK_LABORATORY_SPEC.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialHabakLaboratoryInvestigation)}
                  className="block group space-y-2"
                >
                  <h2
                    className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {HABAK_LABORATORY_SPEC.title}
                  </h2>
                  <p
                    className="hd-font-display text-xl sm:text-2xl italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {HABAK_LABORATORY_SPEC.subtitle}
                  </p>
                </Link>

                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {HABAK_LABORATORY_SPEC.standfirst}
                </p>

                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-5 border-y"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  {HABAK_LABORATORY_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div
                        className="hd-font-display text-3xl sm:text-5xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {st.value}
                      </div>
                      <div className="hd-folio-meta">{st.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-xs">
                  <p className="hd-folio-meta">
                    BY {HABAK_LABORATORY_SPEC.proposedByline}
                  </p>
                  <p className="hd-folio-meta">
                    {HABAK_LABORATORY_SPEC.geographicalFocus} &nbsp;·&nbsp;{' '}
                    {HABAK_LABORATORY_SPEC.investigationPeriod}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialHabakLaboratoryInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch {habakLabNo} ({specialHabakLaboratoryInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monograph10}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                    style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                  >
                    <span>Explore Monograph 10 (12 Volumes · 90 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside
                className="lg:col-span-5 p-6 sm:p-7 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <p className="hd-kicker">
                  DOCUMENTED INSTITUTIONAL FAILURES · CAG AUDITS 2011 &amp; 2025
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {HABAK_LABORATORY_SPEC.cag2011FailureStats.map((st) => (
                    <div
                      key={st.label}
                      className="p-3.5 border space-y-1"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <div
                        className="hd-font-display text-2xl font-semibold"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        {st.value}
                      </div>
                      <div className="hd-folio-meta">{st.label}</div>
                    </div>
                  ))}
                </div>
                <blockquote
                  className="pt-3 border-t hd-font-display text-xl italic leading-snug"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg)' }}
                >
                  “{HABAK_LABORATORY_SPEC.closingQuestion}”
                </blockquote>
              </aside>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              {HABAK_LABORATORY_SPEC.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border flex flex-col justify-between space-y-3"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg)',
                  }}
                >
                  <div className="space-y-2">
                    <p className="hd-kicker">{item.level}</p>
                    <h4
                      className="hd-font-display text-xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="hd-font-body text-xs leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 02 — 02 / DISPATCHES FROM THE FIELD
          Counterbalanced Staggered Diptych: Left Image-Top · Right Text-Top
          ═══════════════════════════════════════════════════════════════════════ */}
      {(fieldWetlands || fieldCommunities) && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between pb-6 mb-12 sm:mb-16 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              <Link href={HD_ROUTES.department('field-reports')} className="hd-kicker hover:underline">
                02 / DISPATCHES FROM THE FIELD
              </Link>
              <span className="hd-folio-meta">FIRSTHAND NOTEBOOKS · WETLANDS &amp; COMMUNITIES</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
              {fieldWetlands && (
                <article className="lg:col-span-6 lg:pr-12 space-y-6">
                  <Link href={resolveCanonicalStoryUrl(fieldWetlands)} className="hd-plate-group block">
                    <div className="hd-plate-frame aspect-[16/10] w-full">
                      <img
                        src={fieldWetlands.heroImage}
                        alt={fieldWetlands.heroCaption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="space-y-3 pt-1">
                    <p className="hd-kicker">WETLANDS</p>
                    <Link href={resolveCanonicalStoryUrl(fieldWetlands)} className="block group">
                      <h2
                        className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.04] group-hover:underline underline-offset-4"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {fieldWetlands.title}
                      </h2>
                    </Link>
                    <p
                      className="hd-font-body text-base sm:text-lg leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {fieldWetlands.subtitle}
                    </p>
                    <p
                      className="hd-font-body text-sm sm:text-[15px] leading-relaxed"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {fieldWetlands.excerpt}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="hd-folio-meta">
                        BY {fieldWetlands.bylineDisplay} &nbsp;·&nbsp; {fieldWetlands.readingTimeMinutes} MIN
                      </span>
                      <Link
                        href={resolveCanonicalStoryUrl(fieldWetlands)}
                        className="hd-kicker hover:underline"
                      >
                        Read Dispatch →
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {fieldCommunities && (
                <article
                  className="lg:col-span-6 lg:pl-12 lg:border-l lg:pt-16 flex flex-col justify-between space-y-8"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="space-y-3">
                    <p className="hd-kicker">COMMUNITIES</p>
                    <Link href={resolveCanonicalStoryUrl(fieldCommunities)} className="block group">
                      <h2
                        className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.04] group-hover:underline underline-offset-4"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {fieldCommunities.title}
                      </h2>
                    </Link>
                    <p
                      className="hd-font-body text-base sm:text-lg leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {fieldCommunities.subtitle}
                    </p>
                    <p
                      className="hd-font-body text-sm sm:text-[15px] leading-relaxed"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {fieldCommunities.excerpt}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="hd-folio-meta">
                        BY {fieldCommunities.bylineDisplay} &nbsp;·&nbsp; {fieldCommunities.readingTimeMinutes} MIN
                      </span>
                      <Link
                        href={resolveCanonicalStoryUrl(fieldCommunities)}
                        className="hd-kicker hover:underline"
                      >
                        Read Dispatch →
                      </Link>
                    </div>
                  </div>

                  <Link href={resolveCanonicalStoryUrl(fieldCommunities)} className="hd-plate-group block">
                    <div className="hd-plate-frame aspect-[16/10] w-full">
                      <img
                        src={fieldCommunities.heroImage}
                        alt={fieldCommunities.heroCaption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="hd-font-body text-xs italic mt-2.5" style={{ color: 'var(--hd-fg-muted)' }}>
                      {fieldCommunities.heroCaption}
                    </p>
                  </Link>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL HISTORICAL & ECOLOGICAL INVESTIGATION (DISPATCH 11 · MONOGRAPH 14)
          "The Chinars in the Shadow of Concrete" — Naseem Bagh & Academic Heritage
          Positioned immediately after Dispatch 10 (Sálim Ali National Park)
          and immediately before Dispatch 12 (An Elegy for Winter)
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialNaseemBaghInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-kicker">
                  {naseemBaghNo} &nbsp;·&nbsp; {NASEEM_BAGH_CHINARS_SPEC.editionRubric}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialNaseemBaghInvestigation)}
                  className="block group space-y-2"
                >
                  <h2
                    className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {NASEEM_BAGH_CHINARS_SPEC.title}
                  </h2>
                  <p
                    className="hd-font-display text-2xl sm:text-3xl italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {NASEEM_BAGH_CHINARS_SPEC.subtitle}
                  </p>
                </Link>

                <p
                  className="hd-font-body text-base sm:text-lg italic leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {NASEEM_BAGH_CHINARS_SPEC.italicDeck}
                </p>

                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y"
                  style={{ borderColor: 'var(--hd-rule-strong)' }}
                >
                  {NASEEM_BAGH_CHINARS_SPEC.incidentCards4.map((card) => (
                    <div key={card.kicker} className="space-y-1">
                      <div
                        className="hd-font-display text-3xl sm:text-4xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {card.figure}
                      </div>
                      <div className="hd-folio-meta">{card.kicker}</div>
                    </div>
                  ))}
                </div>

                <p className="hd-folio-meta">
                  BY {NASEEM_BAGH_CHINARS_SPEC.proposedByline} &nbsp;·&nbsp;{' '}
                  {NASEEM_BAGH_CHINARS_SPEC.geographicScope}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialNaseemBaghInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch {naseemBaghNo} (
                      {specialNaseemBaghInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monographNaseemBaghChinars}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:opacity-80"
                    style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                  >
                    <span>Open Monograph 14 (12 Volumes · 72 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside
                className="lg:col-span-5 p-6 sm:p-7 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <p className="hd-kicker">FIVE INSTITUTIONAL HERITAGE INVESTIGATIONS</p>
                <p
                  className="hd-font-display text-xl italic font-medium leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  “{NASEEM_BAGH_CHINARS_SPEC.landscapeAxiom}”
                </p>
                <div className="space-y-2 pt-2 border-t text-xs" style={{ borderColor: 'var(--hd-rule)' }}>
                  {KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5.map((p) => (
                    <Link
                      key={p.investigation}
                      href={p.href}
                      className="block p-2.5 border hover:border-[#8C3125] transition-colors"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <span className="font-semibold" style={{ color: 'var(--hd-fg)' }}>
                        {p.investigation}
                      </span>{' '}
                      <span style={{ color: 'var(--hd-fg-muted)' }}>
                        — {p.publicAssetExamined}
                      </span>
                    </Link>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 03 — 03 / THE VISUAL JOURNAL
          Permanent Darkroom Ink-Black Gallery Spread · Monochrome Plate Sequence
          ═══════════════════════════════════════════════════════════════════════ */}
      {visualJournal && (
        <section className="hd-darkroom-spread w-full px-4 sm:px-8 lg:px-14 py-20 sm:py-28">
          <div className="max-w-[1440px] mx-auto space-y-10 sm:space-y-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#F2EFE7]/18">
              <Link
                href={HD_ROUTES.department('visual-journal')}
                className="hd-font-sans text-[11px] font-semibold tracking-[0.26em] uppercase text-[#D8C3A5] hover:underline"
              >
                03 / THE VISUAL JOURNAL
              </Link>
              <span className="hd-font-sans text-[11px] tracking-[0.22em] uppercase text-[#A39B8B]">
                MONOCHROME VISUAL STUDY &nbsp;·&nbsp; {visualJournal.photoPlates?.length || 10} PLATES &nbsp;·&nbsp; {visualJournal.readingTimeMinutes}M READ / {visualJournal.estimatedViewingMinutes || 7}M VIEW
              </span>
            </div>

            <Link
              href={resolveCanonicalStoryUrl(visualJournal)}
              className="hd-plate-group block"
            >
              <div className="hd-plate-frame aspect-[16/9] w-full border border-[#F2EFE7]/15">
                <img
                  src={visualJournal.heroImage}
                  alt={visualJournal.heroCaption}
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7 space-y-4">
                <p className="hd-font-sans text-[10px] tracking-[0.28em] uppercase text-[#A39B8B]">
                  {visualJournal.visualEssayMode === 'illustrative_monochrome_study'
                    ? `AN ILLUSTRATIVE MONOCHROME VISUAL STUDY BY ${visualJournal.bylineDisplay}`
                    : `A PHOTOGRAPHIC ESSAY BY ${visualJournal.bylineDisplay}`}
                </p>
                <Link href={resolveCanonicalStoryUrl(visualJournal)} className="block group">
                  <h2 className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold text-[#F2EFE7] leading-[0.98] group-hover:underline underline-offset-8">
                    {visualJournal.title}
                  </h2>
                </Link>
                <p className="hd-font-body text-base sm:text-lg text-[#F2EFE7]/80 max-w-2xl leading-relaxed">
                  {visualJournal.excerpt}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-5 lg:text-right">
                <p className="hd-font-body text-xs italic text-[#A39B8B]">
                  {visualJournal.heroCaption}
                </p>
                <Link
                  href={resolveCanonicalStoryUrl(visualJournal)}
                  className="hd-font-sans inline-flex items-center gap-3 px-6 py-3.5 border border-[#F2EFE7]/40 text-xs font-semibold tracking-[0.22em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7] hover:text-[#171717] transition-colors"
                >
                  <span>Enter Visual Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {visualJournal.photoPlates && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-8 border-t border-[#F2EFE7]/15">
                {visualJournal.photoPlates.map((plate) => (
                  <Link
                    key={plate.plateRoman}
                    href={resolveCanonicalStoryUrl(visualJournal)}
                    className="group space-y-2"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-black border border-[#F2EFE7]/15">
                      <img
                        src={plate.imageUrl}
                        alt={plate.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#A39B8B]">
                      <span>{plate.plateRoman}</span>
                      <span>{plate.elevation}</span>
                    </div>
                    <p className="hd-font-display text-sm text-[#F2EFE7]/90 leading-tight">
                      {plate.title}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 04 — INVESTIGATIVE DESK & EDITORIAL DATA JOURNALISM
          Broadsheet Documentary Column + Print-Style SVG Snowline Horizon Essay
          ═══════════════════════════════════════════════════════════════════════ */}
      {(investigation || dataEssay) && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center justify-between pb-6 mb-12 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              <span className="hd-kicker">04 / ACCOUNTABILITY &amp; CARTOGRAPHY</span>
              <span className="hd-folio-meta">INVESTIGATIVE DESK &amp; DATA JOURNALISM</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              {investigation && (
                <article className="lg:col-span-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <Link
                      href={HD_ROUTES.department('investigative-desk')}
                      className="hd-kicker hover:underline"
                    >
                      {investigation.departmentRubric}
                    </Link>
                    <span className="hd-folio-meta">
                      {investigation.hasCompletedIndependentReview
                        ? 'STAGE 05 VERIFIED'
                        : `${investigation.readingTimeMinutes} MIN DOSSIER`}
                    </span>
                  </div>

                  <Link href={resolveCanonicalStoryUrl(investigation)} className="hd-plate-group block">
                    <div className="hd-plate-frame aspect-[16/10] w-full">
                      <img
                        src={investigation.heroImage}
                        alt={investigation.heroCaption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <p className="hd-folio-meta">{investigation.dateline}</p>

                  <Link href={resolveCanonicalStoryUrl(investigation)} className="block group">
                    <h2
                      className="hd-font-display text-3xl sm:text-4xl font-semibold leading-[1.06] group-hover:underline underline-offset-4"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {investigation.title}
                    </h2>
                  </Link>

                  <p
                    className="hd-font-body text-base leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {investigation.excerpt}
                  </p>

                  <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="hd-folio-meta">BY {investigation.bylineDisplay}</span>
                    <Link
                      href={resolveCanonicalStoryUrl(investigation)}
                      className="hd-kicker hover:underline"
                    >
                      Read Investigation →
                    </Link>
                  </div>
                </article>
              )}

              {dataEssay && (
                <article
                  className="lg:col-span-7 lg:border-l lg:pl-14 space-y-6"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="space-y-3">
                    <Link
                      href={HD_ROUTES.department('data-journalism')}
                      className="hd-kicker hover:underline"
                    >
                      {dataEssay.departmentRubric}
                    </Link>
                    <Link href={resolveCanonicalStoryUrl(dataEssay)} className="block group">
                      <h2
                        className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.04] group-hover:underline underline-offset-4"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {dataEssay.title}
                      </h2>
                    </Link>
                    <p
                      className="hd-font-body text-base sm:text-lg leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {dataEssay.excerpt}
                    </p>
                  </div>

                  {dataEssay.dataVisualization && (
                    <EditorialDataGraphic spec={dataEssay.dataVisualization} compact />
                  )}

                  <div className="flex items-center justify-between">
                    <span className="hd-folio-meta">
                      BY {dataEssay.bylineDisplay} &nbsp;·&nbsp; {dataEssay.readingTimeMinutes} MIN ESSAY
                    </span>
                    <Link
                      href={resolveCanonicalStoryUrl(dataEssay)}
                      className="hd-kicker hover:underline"
                    >
                      Examine Full Essay →
                    </Link>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 05 — THE CONVERSATION & MASTHEAD CHARTER
          Typographic Literary Quotation Spread + Editorial Essay Column
          ═══════════════════════════════════════════════════════════════════════ */}
      {(interview || charterEditorial) && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {interview && (
              <article className="lg:col-span-8 space-y-6">
                <Link
                  href={HD_ROUTES.department('interviews-editorials')}
                  className="hd-kicker hover:underline block"
                >
                  {interview.dialogueMode === 'constructed_editorial_dialogue'
                    ? '05 / THE CONVERSATION · CONSTRUCTED EDITORIAL DIALOGUE'
                    : '05 / THE CONVERSATION · LONGFORM INTERVIEW'}
                </Link>

                <div className="relative pt-2">
                  <span
                    className="hd-font-display block text-7xl sm:text-8xl leading-none select-none -mb-6"
                    style={{ color: 'var(--hd-copper)' }}
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <Link href={resolveCanonicalStoryUrl(interview)} className="block group">
                    <h2
                      className="hd-font-display text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold italic leading-[1.08] group-hover:underline underline-offset-8"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {interview.title.replace(/^[“"]|[”"]$/g, '')}
                    </h2>
                  </Link>
                </div>

                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-2xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {interview.excerpt}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6">
                  <span className="hd-folio-meta">
                    {interview.dialogueMode === 'constructed_editorial_dialogue'
                      ? `EDITORIAL DIALOGUE SYNTHESIS BY ${interview.bylineDisplay}`
                      : `INTERVIEW BY ${interview.bylineDisplay}`}{' '}
                    &nbsp;·&nbsp; {interview.readingTimeMinutes} MIN
                  </span>
                  <Link
                    href={resolveCanonicalStoryUrl(interview)}
                    className="hd-kicker hover:underline"
                  >
                    Read the Dialogue →
                  </Link>
                </div>
              </article>
            )}

            {charterEditorial && (
              <aside
                className="lg:col-span-4 border p-6 sm:p-8 space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker">FROM THE MASTHEAD</p>
                <Link href={resolveCanonicalStoryUrl(charterEditorial)} className="block group">
                  <h3
                    className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {charterEditorial.title}
                  </h3>
                </Link>
                <p
                  className="hd-font-body text-sm sm:text-[15px] leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {charterEditorial.excerpt}
                </p>
                <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--hd-rule)' }}>
                  <span className="hd-folio-meta">{charterEditorial.bylineDisplay}</span>
                  <Link
                    href={resolveCanonicalStoryUrl(charterEditorial)}
                    className="hd-kicker hover:underline"
                  >
                    Read Essay →
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL SCIENTIFIC INVESTIGATION FLAGSHIP (DISPATCH 12 + MONOGRAPH 04)
          "Who Are We Researching For? The World Knows Our Mountains. Do We?"
          Positioned immediately after Founding Manifesto (11) & before Beyond the Conference (13–17)
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialResearchAccountabilityInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#171717',
            color: '#F2EFE7',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  12 &nbsp;·&nbsp; {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialResearchAccountabilityInvestigation)}
                  className="block group space-y-2"
                >
                  <h2 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] text-[#F2EFE7] group-hover:underline underline-offset-4">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.title}
                  </h2>
                  <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5]">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.subtitle}
                  </p>
                </Link>

                <p className="hd-font-body text-base sm:text-lg leading-relaxed text-[#F2EFE7]/85 max-w-3xl">
                  {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.extendedDescription}
                </p>

                <div className="grid grid-cols-3 gap-6 py-5 border-y border-[#F2EFE7]/20">
                  {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                        {st.value}
                      </div>
                      <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-[#F2EFE7]/75">
                  <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.statusBadge}
                  </p>
                  <p className="hd-font-body">
                    By {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.proposedByline}
                  </p>
                  <p className="hd-font-body italic text-[#F2EFE7]/65">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.geographicScope}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialResearchAccountabilityInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch 12 (
                      {specialResearchAccountabilityInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monographResearchAccountability}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                  >
                    <span>Explore Monograph 04 (15 Volumes · 60 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 border border-[#F2EFE7]/25 p-6 sm:p-7 space-y-4 bg-[#201F1D]">
                <p className="hd-font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  INTELLECTUAL FOUNDATION BEFORE &ldquo;BEYOND THE CONFERENCE&rdquo;
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      80 Preliminary Research Units (5 Regions)
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      Kashmir Valley (24) · Jammu (19) · Gilgit-Baltistan (16) · Ladakh (11) · Azad
                      Jammu &amp; Kashmir (10) — working unit inventory awaiting verification.
                    </p>
                  </div>
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      2001–2026 Bibliometric Integrity Rule
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      Zero estimated publication totals: regional cells remain TBD until OpenAlex,
                      Crossref, Shodhganga, HEC &amp; departmental verification (anchored by UoK
                      Geography’s 145 reported papers, 2019–2023).
                    </p>
                  </div>
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      Publish · Explain · Demonstrate · Measure
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      9-category Research-to-Society Protocol + Every Paper’s Second Life across
                      English, Kashmiri, Urdu, Dogri, Balti, Shina, Ladakhi, Pahari &amp; Gojri.
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F2EFE7]/20">
              {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border border-[#F2EFE7]/20 bg-[#201F1D] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <p className="hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                      {item.level}
                    </p>
                    <h4 className="hd-font-display text-xl font-semibold text-[#F2EFE7]">
                      {item.title}
                    </h4>
                    <p className="hd-font-body text-xs leading-relaxed text-[#F2EFE7]/75">
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#D8C3A5] hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL INTERNATIONAL FEATURE (DISPATCH 14 + MONOGRAPH 08)
          "South Asia's Environmental Vanguard" — Four Professional Mirrors
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialSouthAsianVanguardFeature && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-8 space-y-5">
                <span className="hd-kicker">
                  {southAsianVanguardNo} &nbsp;·&nbsp;{' '}
                  {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.editionKicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialSouthAsianVanguardFeature)}
                  className="block group space-y-2"
                >
                  <h2
                    className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.title}
                  </h2>
                  <p
                    className="hd-font-display text-2xl sm:text-3xl italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.subtitle}
                  </p>
                </Link>

                <p
                  className="hd-font-body text-base sm:text-lg italic leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.editionDeck}
                </p>

                <div
                  className="grid grid-cols-3 gap-6 py-5 border-y"
                  style={{ borderColor: 'var(--hd-rule-strong)' }}
                >
                  {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div
                        className="hd-font-display text-3xl sm:text-5xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {st.value}
                      </div>
                      <div className="hd-folio-meta">{st.label}</div>
                    </div>
                  ))}
                </div>

                <p className="hd-folio-meta">
                  BY {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.proposedByline} &nbsp;·&nbsp;{' '}
                  {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.geographicScope}
                </p>
              </div>

              <aside
                className="lg:col-span-4 p-6 sm:p-8 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <p className="hd-kicker">FOUR PROFESSIONAL MIRRORS (32)</p>
                <p
                  className="hd-font-display text-2xl italic font-medium leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  “{SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.closingPhilosophicalQuestion}”
                </p>
                <p
                  className="hd-font-body text-xs italic pt-3 border-t"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                >
                  8 Advocates · 8 NGO Institution-Builders · 8 Journalists · 8 Scientists (4 India +
                  4 Pakistan in each cohort) · 2027–2035 Leadership Agenda &amp; KEW Green Heroes
                  Educational Collection.
                </p>
              </aside>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              {SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border flex flex-col justify-between space-y-3"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg)',
                  }}
                >
                  <div className="space-y-2">
                    <p className="hd-kicker">{item.level}</p>
                    <h4
                      className="hd-font-display text-xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="hd-font-body text-xs leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 06 — BEYOND THE CONFERENCE: INDEPENDENT RESPONSE SERIES
          Five Original Scientific, Engineering & Governance Advancement Folios
          ═══════════════════════════════════════════════════════════════════════ */}
      {beyondConferenceStories.length > 0 && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-[1440px] mx-auto space-y-14">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b items-end"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="lg:col-span-8 space-y-4">
                <p className="hd-kicker">{BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE.kicker}</p>
                <h2
                  className="hd-font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE.headline}
                </h2>
                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE.standfirst}
                </p>
              </div>
              <div
                className="lg:col-span-4 p-5 border-l-2 space-y-2"
                style={{
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-folio-meta">INTELLECTUAL IDENTITY</p>
                <p
                  className="hd-font-display text-xl sm:text-2xl italic font-medium leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  “{BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE.epigraph}”
                </p>
              </div>
            </div>

            {/* Five Permanent Institutional Responsibilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {HIMALAYAN_DISPATCH_PERMANENT_RESPONSIBILITIES.map((resp) => (
                <div
                  key={resp.number}
                  className="p-5 border space-y-2"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div
                    className="hd-font-display text-3xl font-semibold"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {resp.number}
                  </div>
                  <h3
                    className="hd-font-display text-xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {resp.title}
                  </h3>
                  <p
                    className="hd-font-body text-xs sm:text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {resp.mandate}
                  </p>
                </div>
              ))}
            </div>

            {/* Five Response Editorials (11–15) + The Editorial Difference Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              <div className="lg:col-span-8 divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {beyondConferenceStories.map((st) => {
                  const meta = BEYOND_THE_CONFERENCE_SERIES_META[st.slug];
                  const url = resolveCanonicalStoryUrl(st);
                  return (
                    <article
                      key={st.id}
                      className="py-7 first:pt-0 space-y-2.5"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="hd-kicker">
                          {dispatchNoOf(st.slug)} · {meta?.conferenceReference || st.departmentRubric}
                        </span>
                        <span className="hd-folio-meta">
                          {st.readingTimeMinutes} MIN READ
                        </span>
                      </div>
                      <Link href={url} className="block group">
                        <h3
                          className="hd-font-display text-2xl sm:text-4xl font-semibold leading-tight group-hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {st.title}
                        </h3>
                      </Link>
                      <p
                        className="hd-font-display text-lg sm:text-xl italic"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        {st.subtitle}
                      </p>
                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {st.excerpt}
                      </p>
                      {meta?.proposedFramework && (
                        <p className="hd-folio-meta pt-1">
                          PROPOSED ADVANCEMENT: {meta.proposedFramework.toUpperCase()}
                        </p>
                      )}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="hd-folio-meta">BY {st.bylineDisplay}</span>
                        <Link
                          href={url}
                          className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                        >
                          <span>Read Response Editorial</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside
                className="lg:col-span-4 border p-6 space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker">THE EDITORIAL DIFFERENCE</p>
                <h3
                  className="hd-font-display text-2xl font-semibold leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Why Conference Coverage Is Not Enough
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                        <th className="py-2 pr-2 hd-folio-meta">Conventional Reporting</th>
                        <th className="py-2 pl-2 hd-folio-meta">Himalayan Dispatch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                      {HIMALAYAN_DISPATCH_EDITORIAL_DIFFERENCE_ROWS.map((row, idx) => (
                        <tr key={idx}>
                          <td
                            className="py-2.5 pr-2 hd-font-body text-xs align-top"
                            style={{ color: 'var(--hd-fg-muted)' }}
                          >
                            {row.conventional}
                          </td>
                          <td
                            className="py-2.5 pl-2 hd-font-body text-xs font-semibold align-top"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {row.himalayanDispatch}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL SCIENTIFIC & GEOPOLITICAL INVESTIGATION (MONOGRAPH 12)
          "The Price of Power: When Mountains Generate Electricity but Their People Remain in Darkness"
          Positioned immediately after "Who Gave Development the Right to Exceed the Mountain?"
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialPriceOfPowerInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#191816',
            color: '#F2EFE7',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                    {priceOfPowerNo} &nbsp;·&nbsp; {PRICE_OF_POWER_MONOGRAPH_SPEC.editionRubric}
                  </span>
                </div>

                <Link
                  href={resolveCanonicalStoryUrl(specialPriceOfPowerInvestigation)}
                  className="block group space-y-2"
                >
                  <h2 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] text-[#F2EFE7] group-hover:underline underline-offset-4">
                    {PRICE_OF_POWER_MONOGRAPH_SPEC.title}
                  </h2>
                  <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5]">
                    {PRICE_OF_POWER_MONOGRAPH_SPEC.subtitle}
                  </p>
                </Link>

                <p className="hd-font-body text-base sm:text-lg italic leading-relaxed text-[#F2EFE7]/85 max-w-3xl">
                  {PRICE_OF_POWER_MONOGRAPH_SPEC.italicDeck}
                </p>

                <div className="grid grid-cols-3 gap-6 py-5 border-y border-[#F2EFE7]/20">
                  {PRICE_OF_POWER_MONOGRAPH_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                        {st.value}
                      </div>
                      <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="hd-font-sans text-[11px] tracking-[0.16em] uppercase text-[#F2EFE7]/70">
                  BY {PRICE_OF_POWER_MONOGRAPH_SPEC.proposedByline} &nbsp;·&nbsp;{' '}
                  {PRICE_OF_POWER_MONOGRAPH_SPEC.geographicScope}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialPriceOfPowerInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch {priceOfPowerNo} (
                      {specialPriceOfPowerInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monographPriceOfPower}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                  >
                    <span>Explore Monograph 12 (20 Volumes · 120 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 border border-[#F2EFE7]/25 p-6 sm:p-7 space-y-4 bg-[#201F1D]">
                <p className="hd-font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  THREE-PART MOUNTAIN INFRASTRUCTURE PROGRESSION
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      {dispatchNoOf('when-the-mountain-rejects-the-engineer')} · Geological Limits
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      <em>When the Mountain Rejects the Engineer</em> — slope mechanics, fractured
                      lithology, and mountain engineering thresholds.
                    </p>
                  </div>
                  <div className="p-3.5 border border-[#F2EFE7]/15 bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      {dispatchNoOf('who-gave-development-the-right-to-exceed-the-mountain')} · Ecological Limits
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/85">
                      <em>Who Gave Development the Right to Exceed the Mountain?</em> — carrying
                      capacity and ecological boundaries.
                    </p>
                  </div>
                  <div className="p-3.5 border border-[#8C3125] bg-[#171717] space-y-1">
                    <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                      {priceOfPowerNo} · Hydropower &amp; Energy Justice (Monograph 12)
                    </span>
                    <p className="hd-font-body text-[#F2EFE7]/90">
                      <em>The Price of Power</em> — practical test of both geological and ecological
                      limits across 5 regions, paired with the 16-registry{' '}
                      <Link
                        href="/earth-human-impact/hydropower-energy-justice-observatory"
                        className="underline text-[#D8C3A5]"
                      >
                        KEW Hydropower Observatory
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL GEOLOGICAL & ENVIRONMENTAL INVESTIGATION (DISPATCH 24 · MONOGRAPH 16)
          "The Wealth Beneath the Mountains" — Gilgit-Baltistan Mineral Resources
          Positioned immediately after Dispatch 23 ("The Price of Power") and
          before Dispatch 25 ("The Rivers That No Longer Belong to Their Valleys")
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialWealthBeneathMountainsInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#1B1A18',
            color: '#F2EFE7',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  {wealthBeneathMountainsNo} &nbsp;·&nbsp;{' '}
                  {WEALTH_BENEATH_MOUNTAINS_SPEC.editionRubric}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialWealthBeneathMountainsInvestigation)}
                  className="block group space-y-2"
                >
                  <h2 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] text-[#F2EFE7] group-hover:underline underline-offset-4">
                    {WEALTH_BENEATH_MOUNTAINS_SPEC.title}
                  </h2>
                  <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5]">
                    {WEALTH_BENEATH_MOUNTAINS_SPEC.subtitle}
                  </p>
                </Link>

                <p className="hd-font-body text-base sm:text-lg italic leading-relaxed text-[#F2EFE7]/85 max-w-3xl">
                  {WEALTH_BENEATH_MOUNTAINS_SPEC.italicDeck}
                </p>

                <div className="grid grid-cols-3 gap-6 py-5 border-y border-[#F2EFE7]/20">
                  {WEALTH_BENEATH_MOUNTAINS_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                        {st.value}
                      </div>
                      <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-xs text-[#F2EFE7]/80">
                  <p className="hd-font-sans font-semibold tracking-[0.16em] uppercase text-[#D8C3A5]">
                    BY {WEALTH_BENEATH_MOUNTAINS_SPEC.bylineDisplay}
                  </p>
                  <p className="hd-font-body text-[#F2EFE7]/75">
                    {WEALTH_BENEATH_MOUNTAINS_SPEC.deskAttribution} &nbsp;·&nbsp;{' '}
                    {WEALTH_BENEATH_MOUNTAINS_SPEC.dateline} &nbsp;·&nbsp; Editorial Oversight:{' '}
                    {WEALTH_BENEATH_MOUNTAINS_SPEC.editorialOversight}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialWealthBeneathMountainsInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch {wealthBeneathMountainsNo} (
                      {specialWealthBeneathMountainsInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monographWealthBeneathMountains}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                  >
                    <span>Explore Monograph 16 (18 Volumes · 108 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 border border-[#F2EFE7]/25 p-6 sm:p-7 space-y-4 bg-[#22201E]">
                <p className="hd-font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  REGIONAL EXTRACTION, RIVER JUSTICE &amp; VULNERABILITY ARC
                </p>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 border border-[#F2EFE7]/15 bg-[#171717]">
                    <span className="text-[#D8C3A5] font-semibold">
                      {dispatchNoOf('who-gave-development-the-right-to-exceed-the-mountain')} · Ecological Limits:
                    </span>{' '}
                    <span className="text-[#F2EFE7]/85">
                      Who Gave Development the Right to Exceed the Mountain?
                    </span>
                  </div>
                  <div className="p-3 border border-[#F2EFE7]/15 bg-[#171717]">
                    <span className="text-[#D8C3A5] font-semibold">
                      {priceOfPowerNo} · Energy Sacrifice:
                    </span>{' '}
                    <span className="text-[#F2EFE7]/85">The Price of Power</span>
                  </div>
                  <div className="p-3 border border-[#8C3125] bg-[#171717]">
                    <span className="text-[#D8C3A5] font-semibold">
                      {wealthBeneathMountainsNo} · Gilgit-Baltistan Minerals (Monograph 16):
                    </span>{' '}
                    <span className="text-[#F2EFE7]/95">
                      The Wealth Beneath the Mountains — paired with KEW’s{' '}
                      <Link
                        href="/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory"
                        className="underline text-[#D8C3A5]"
                      >
                        18-Registry GB Mineral Observatory
                      </Link>
                    </span>
                  </div>
                  <div className="p-3 border border-[#F2EFE7]/15 bg-[#171717]">
                    <span className="text-[#D8C3A5] font-semibold">
                      {ajkRiversNo} · Azad Jammu &amp; Kashmir Rivers (Monograph 17):
                    </span>{' '}
                    <span className="text-[#F2EFE7]/85">
                      The Rivers That No Longer Belong to Their Valleys
                    </span>
                  </div>
                  <div className="p-3 border border-[#F2EFE7]/15 bg-[#171717]">
                    <span className="text-[#D8C3A5] font-semibold">
                      {timeBombNo} · Cumulative Disaster Convergence:
                    </span>{' '}
                    <span className="text-[#F2EFE7]/85">
                      The Western Himalayas Are Sitting on a Time Bomb
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          FLAGSHIP REGIONAL INVESTIGATION — AZAD JAMMU & KASHMIR (DISPATCH 25 · MONOGRAPH 17)
          "The Rivers That No Longer Belong to Their Valleys"
          Filed by Himalayan Dispatch Research Desk | Muzaffarabad Coverage
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialAjkRiversInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-kicker">
                  {ajkRiversNo} &nbsp;·&nbsp; AZAD JAMMU &amp; KASHMIR &nbsp;·&nbsp;{' '}
                  {AJK_RIVERS_MONOGRAPH_SPEC.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialAjkRiversInvestigation)}
                  className="block group space-y-2"
                >
                  <h2
                    className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {AJK_RIVERS_MONOGRAPH_SPEC.title}
                  </h2>
                  <p
                    className="hd-font-display text-2xl sm:text-3xl italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {AJK_RIVERS_MONOGRAPH_SPEC.subtitle}
                  </p>
                </Link>

                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {AJK_RIVERS_MONOGRAPH_SPEC.standfirst}
                </p>

                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-5 border-y"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  {MUZAFFARABAD_DIVERSION_METRICS.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div
                        className="hd-font-display text-3xl sm:text-4xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {st.value}
                      </div>
                      <div className="hd-folio-meta">{st.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1 text-xs">
                  <p className="hd-folio-meta">
                    BY {AJK_RIVERS_MONOGRAPH_SPEC.bylineDisplay} &nbsp;·&nbsp;{' '}
                    {AJK_RIVERS_MONOGRAPH_SPEC.subBylineDesk}
                  </p>
                  <p className="hd-folio-meta">
                    {AJK_RIVERS_MONOGRAPH_SPEC.geographicalFocus}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialAjkRiversInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch {ajkRiversNo} ({specialAjkRiversInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monograph17}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                    style={{
                      borderColor: 'var(--hd-copper)',
                      color: 'var(--hd-copper)',
                    }}
                  >
                    <span>Explore Monograph 17 (12 Volumes · 72 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside
                className="lg:col-span-5 p-6 sm:p-7 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <p className="hd-kicker">
                  SIX AZAD JAMMU &amp; KASHMIR EDITORIAL PRIORITIES
                </p>
                <div className="space-y-2.5 text-xs">
                  {AJK_EDITORIAL_PRIORITIES_6.map((p) => (
                    <div
                      key={p.priority}
                      className="p-2.5 border space-y-0.5"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <span className="hd-kicker">
                        PRIORITY {p.priority} · {p.title}
                      </span>
                      <p
                        className="hd-font-body"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {p.significance}
                      </p>
                    </div>
                  ))}
                </div>
                <blockquote
                  className="pt-3 border-t hd-font-display text-lg italic leading-snug"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg)' }}
                >
                  “{AJK_RIVERS_MONOGRAPH_SPEC.overarchingQuestion}”
                </blockquote>
              </aside>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              {AJK_RIVERS_MONOGRAPH_SPEC.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border flex flex-col justify-between space-y-3"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg)',
                  }}
                >
                  <div className="space-y-2">
                    <p className="hd-kicker">{item.level}</p>
                    <h4
                      className="hd-font-display text-xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="hd-font-body text-xs leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          FLAGSHIP DISASTER VULNERABILITY INVESTIGATION (DISPATCH 22 + MONOGRAPH 13)
          "The Western Himalayas Are Sitting on a Time Bomb"
          Placed immediately after Dispatch 21 ("The Price of Power") and before
          Dispatch 23 ("Nature Is Not a Contractor")
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialTimeBombInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#141312',
            color: '#F2EFE7',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  {timeBombNo} &nbsp;·&nbsp; {THE_TIME_BOMB_SPEC.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialTimeBombInvestigation)}
                  className="block group space-y-2"
                >
                  <h2 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] text-[#F2EFE7] group-hover:underline underline-offset-4">
                    {THE_TIME_BOMB_SPEC.title}
                  </h2>
                  <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5]">
                    {THE_TIME_BOMB_SPEC.subtitle}
                  </p>
                </Link>

                <p className="hd-font-body text-base sm:text-lg leading-relaxed text-[#F2EFE7]/85 max-w-3xl">
                  {THE_TIME_BOMB_SPEC.tocTeaser}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-5 border-y border-[#F2EFE7]/20">
                  {THE_TIME_BOMB_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                        {st.value}
                      </div>
                      <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-[#F2EFE7]/75">
                  <p className="hd-font-body">
                    By {THE_TIME_BOMB_SPEC.proposedByline}
                  </p>
                  <p className="hd-font-body italic text-[#F2EFE7]/65">
                    {THE_TIME_BOMB_SPEC.geographicalCoverage}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialTimeBombInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch {timeBombNo} ({specialTimeBombInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monograph13}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                  >
                    <span>Explore Monograph 13 (25 Volumes · 150 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <aside className="lg:col-span-5 border border-[#F2EFE7]/25 p-6 sm:p-7 space-y-4 bg-[#1E1D1B]">
                <p className="hd-font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  FOUR STAGES OF INVESTIGATION · DISPATCHES 19 TO 22
                </p>
                <div className="space-y-2.5 text-xs">
                  {FOUR_STAGE_DEVELOPMENT_PROGRESSION.map((st) => (
                    <div
                      key={st.dispatchNumber}
                      className={`p-3 border space-y-0.5 ${
                        st.dispatchNumber === '22'
                          ? 'border-[#8C3125] bg-[#141312]'
                          : 'border-[#F2EFE7]/15 bg-[#141312]/70'
                      }`}
                    >
                      <span className="hd-font-sans text-[10px] uppercase tracking-wider text-[#D8C3A5]">
                        {st.dispatchNumber} · {st.title}
                      </span>
                      <p className="hd-font-body text-[#F2EFE7]/88">
                        {st.investigativeStage}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#F2EFE7]/15">
                  {KASHMIR_SEISMIC_GAP_METRICS.map((m) => (
                    <div
                      key={m.label}
                      className="p-2.5 border border-[#F2EFE7]/15 bg-[#141312]"
                    >
                      <div className="hd-font-display text-xl font-semibold text-[#D8C3A5]">
                        {m.value}
                      </div>
                      <div className="hd-font-sans text-[10px] uppercase tracking-wider text-[#F2EFE7]/75">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F2EFE7]/20">
              {THE_TIME_BOMB_SPEC.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border border-[#F2EFE7]/20 bg-[#1E1D1B] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <p className="hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                      {item.level}
                    </p>
                    <h4 className="hd-font-display text-xl font-semibold text-[#F2EFE7]">
                      {item.title}
                    </h4>
                    <p className="hd-font-body text-xs leading-relaxed text-[#F2EFE7]/75">
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#D8C3A5] hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL SCIENTIFIC INVESTIGATION FLAGSHIP (DISPATCH 17 + MONOGRAPH 01)
          "The Atmosphere Has No Borders: The Air We Breathe, the Numbers We Cannot Trust"
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialAtmosphereInvestigation && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#171717',
            color: '#F2EFE7',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                    {dispatchNoOf('the-atmosphere-has-no-borders')} &nbsp;·&nbsp; {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.kicker}
                  </span>
                </div>

                <Link
                  href={resolveCanonicalStoryUrl(specialAtmosphereInvestigation)}
                  className="block group space-y-2"
                >
                  <h2 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] text-[#F2EFE7] group-hover:underline underline-offset-4">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.title}
                  </h2>
                  <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5]">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.subtitle}
                  </p>
                </Link>

                <p className="hd-font-body text-base sm:text-lg leading-relaxed text-[#F2EFE7]/85 max-w-3xl">
                  {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.extendedDescription}
                </p>

                {/* 12 / 60 / 30 yrs Flagship Metrics */}
                <div className="grid grid-cols-3 gap-6 py-5 border-y border-[#F2EFE7]/20">
                  {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                        {st.value}
                      </div>
                      <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-[#F2EFE7]/75">
                  <p className="hd-font-sans tracking-[0.16em] uppercase text-[#D8C3A5]">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.statusBadge}
                  </p>
                  <p className="hd-font-body">
                    Proposed byline: {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.proposedByline}
                  </p>
                  <p className="hd-font-body italic text-[#F2EFE7]/65">
                    {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.geographicScope}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={resolveCanonicalStoryUrl(specialAtmosphereInvestigation)}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#8C3125' }}
                  >
                    <span>
                      Read Dispatch 19 ({specialAtmosphereInvestigation.readingTimeMinutes} min)
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={HD_ROUTES.monograph01}
                    className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                  >
                    <span>Explore Monograph 01 (12 Volumes · 60 Chapters)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Strategic Distinction: Dispatch 01 vs Dispatch 17 */}
              <aside className="lg:col-span-5 border border-[#F2EFE7]/25 p-6 sm:p-7 space-y-5 bg-[#201F1D]">
                <div className="space-y-1.5">
                  <p className="hd-font-sans text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                    TWO INAUGURAL FLAGSHIPS · STRATEGIC DISTINCTION
                  </p>
                  <h3 className="hd-font-display text-2xl font-semibold text-[#F2EFE7]">
                    Historical Legacy Meets Quantitative Atmospheric Science
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#F2EFE7]/25 text-[#D8C3A5]">
                        <th className="py-2 pr-2 font-semibold uppercase tracking-wider">Dimension</th>
                        <th className="py-2 px-2 font-semibold uppercase tracking-wider">Dispatch 01</th>
                        <th className="py-2 pl-2 font-semibold uppercase tracking-wider">Dispatch 19</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2EFE7]/15">
                      {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.flagshipComparison.map((row) => (
                        <tr key={row.dimension}>
                          <td className="py-2.5 pr-2 text-[#D8C3A5] font-medium align-top">
                            {row.dimension}
                          </td>
                          <td className="py-2.5 px-2 text-[#F2EFE7]/80 align-top">
                            {row.dispatch01}
                          </td>
                          <td className="py-2.5 pl-2 text-[#F2EFE7] font-semibold align-top">
                            {row.dispatch17}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="hd-font-body text-xs italic text-[#F2EFE7]/70 pt-2 border-t border-[#F2EFE7]/15">
                  {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.evidentiaryNotice}
                </p>
              </aside>
            </div>

            {/* Three-Level Publication Hierarchy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F2EFE7]/20">
              {SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border border-[#F2EFE7]/20 bg-[#201F1D] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <p className="hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                      {item.level}
                    </p>
                    <h4 className="hd-font-display text-xl font-semibold text-[#F2EFE7]">
                      {item.title}
                    </h4>
                    <p className="hd-font-body text-xs leading-relaxed text-[#F2EFE7]/75">
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#D8C3A5] hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          COMPOSITION 07 — CIVIL SOCIETY & ENVIRONMENTAL ACCOUNTABILITY (16 & 18–22)
          Six Inquiries Into Advocacy, Legal Enforcement & Ecological Outcomes
          ═══════════════════════════════════════════════════════════════════════ */}
      {civilSocietyStories.length > 0 && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-[1440px] mx-auto space-y-14">
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b items-end"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="lg:col-span-8 space-y-4">
                <p className="hd-kicker">{CIVIL_SOCIETY_DEFINING_PRINCIPLE.kicker}</p>
                <h2
                  className="hd-font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02]"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {CIVIL_SOCIETY_DEFINING_PRINCIPLE.headline}
                </h2>
                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {CIVIL_SOCIETY_DEFINING_PRINCIPLE.standfirst}
                </p>
              </div>
              <div
                className="lg:col-span-4 p-5 border-l-2 space-y-2"
                style={{
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-folio-meta">UNIVERSAL INSTITUTIONAL SCRUTINY</p>
                <p
                  className="hd-font-display text-lg sm:text-xl italic font-medium leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  “{CIVIL_SOCIETY_DEFINING_PRINCIPLE.nonExemptionClause}”
                </p>
              </div>
            </div>

            {/* Four Levels of Environmental Responsibility + Ultimate Measure */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="hd-kicker">FOUR LEVELS OF ENVIRONMENTAL RESPONSIBILITY</span>
                <span className="hd-folio-meta">
                  ULTIMATE MEASURE: {HIMALAYAN_DISPATCH_ULTIMATE_ECOLOGICAL_MEASURE.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {HIMALAYAN_DISPATCH_FOUR_RESPONSIBILITY_LEVELS.map((lvl) => (
                  <div
                    key={lvl.number}
                    className="p-5 border space-y-2"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <div
                      className="hd-font-display text-3xl font-semibold"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {lvl.number}
                    </div>
                    <h3
                      className="hd-font-display text-xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {lvl.actor}
                    </h3>
                    <p
                      className="hd-font-body text-xs sm:text-sm leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {lvl.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Six Civil Society Inquiries (16–21) + Complete Architecture & NGO Outcome Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              <div className="lg:col-span-8 divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {civilSocietyStories.map((st) => {
                  const meta = CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_META[st.slug];
                  const url = resolveCanonicalStoryUrl(st);
                  return (
                    <article
                      key={st.id}
                      className="py-7 first:pt-0 space-y-2.5"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="hd-kicker">
                          {meta?.dispatchNumber || '—'} · {meta?.institutionalContext || st.departmentRubric}
                        </span>
                        <span className="hd-folio-meta">
                          {st.readingTimeMinutes} MIN READ
                        </span>
                      </div>
                      <Link href={url} className="block group">
                        <h3
                          className="hd-font-display text-2xl sm:text-4xl font-semibold leading-tight group-hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {st.title}
                        </h3>
                      </Link>
                      <p
                        className="hd-font-display text-lg sm:text-xl italic"
                        style={{ color: 'var(--hd-copper)' }}
                      >
                        {meta?.centralQuestion || st.subtitle}
                      </p>
                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {st.excerpt}
                      </p>
                      {meta?.proposedFramework && (
                        <p className="hd-folio-meta pt-1">
                          PROPOSED ADVANCEMENT: {meta.proposedFramework.toUpperCase()}
                        </p>
                      )}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="hd-folio-meta">BY {st.bylineDisplay}</span>
                        <Link
                          href={url}
                          className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                        >
                          <span>Read Accountability Inquiry</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="lg:col-span-4 space-y-8">
                {/* Complete 22-Dispatch Architecture */}
                <aside
                  className="border p-6 space-y-4"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <p className="hd-kicker">THE COMPLETE EDITORIAL ARCHITECTURE</p>
                  <h3
                    className="hd-font-display text-2xl font-semibold leading-snug"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {stories.length} Inaugural Dispatches Across Six Stages
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                          <th className="py-2 pr-2 hd-folio-meta">Series</th>
                          <th className="py-2 px-2 hd-folio-meta">Nos.</th>
                          <th className="py-2 pl-2 hd-folio-meta">Primary Focus</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                        {HIMALAYAN_DISPATCH_COMPLETE_EDITORIAL_ARCHITECTURE.map((row) => (
                          <tr key={row.dispatches}>
                            <td
                              className="py-2.5 pr-2 hd-font-body text-xs font-semibold align-top"
                              style={{ color: 'var(--hd-fg)' }}
                            >
                              {row.series}
                            </td>
                            <td
                              className="py-2.5 px-2 hd-folio-meta align-top"
                              style={{ color: 'var(--hd-copper)' }}
                            >
                              {row.dispatches}
                            </td>
                            <td
                              className="py-2.5 pl-2 hd-font-body text-xs align-top"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {row.primaryFocus}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </aside>

                {/* NGO Activity vs Outcome Indicator Matrix */}
                <aside
                  className="border p-6 space-y-4"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <p className="hd-kicker">CIVIL SOCIETY EVALUATION MATRIX</p>
                  <h3
                    className="hd-font-display text-2xl font-semibold leading-snug"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Activity Counts vs. Ecological Outcomes
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                          <th className="py-2 pr-2 hd-folio-meta">Conventional Activity</th>
                          <th className="py-2 pl-2 hd-folio-meta">Outcome Indicator</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                        {HIMALAYAN_DISPATCH_NGO_OUTCOME_MATRIX.map((row, idx) => (
                          <tr key={idx}>
                            <td
                              className="py-2 pr-2 hd-font-body text-xs align-top"
                              style={{ color: 'var(--hd-fg-muted)' }}
                            >
                              {row.conventionalActivity}
                            </td>
                            <td
                              className="py-2 pl-2 hd-font-body text-xs font-semibold align-top"
                              style={{ color: 'var(--hd-fg)' }}
                            >
                              {row.proposedOutcomeIndicator}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p
                    className="hd-font-body text-xs italic pt-2 border-t"
                    style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                  >
                    {CIVIL_SOCIETY_DEFINING_PRINCIPLE.evidentiaryNotice}
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL LEGAL & SCIENTIFIC INVESTIGATION FLAGSHIP
          "When Environmental Laws Exist but the Environment Has No Defence" + Monograph 07
          ═══════════════════════════════════════════════════════════════════════ */}
      {specialEnvironmentalLawFlagship && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg)',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-8 space-y-5">
                <span className="hd-kicker">
                  {environmentalLawNo} &nbsp;·&nbsp; {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(specialEnvironmentalLawFlagship)}
                  className="block group space-y-2"
                >
                  <h2
                    className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.editionTitle}
                  </h2>
                  <p
                    className="hd-font-display text-2xl sm:text-3xl italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.subtitle}
                  </p>
                </Link>

                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {specialEnvironmentalLawFlagship.excerpt}
                </p>

                <div
                  className="grid grid-cols-3 gap-6 py-5 border-y"
                  style={{ borderColor: 'var(--hd-rule-strong)' }}
                >
                  {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div
                        className="hd-font-display text-3xl sm:text-5xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {st.value}
                      </div>
                      <div className="hd-folio-meta">{st.label}</div>
                    </div>
                  ))}
                </div>

                <p className="hd-folio-meta">
                  BY {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.proposedByline} &nbsp;·&nbsp;{' '}
                  {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.geographicScope}
                </p>
              </div>

              <aside
                className="lg:col-span-4 p-6 sm:p-8 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <p className="hd-kicker">DEFINING JURISPRUDENTIAL AXIOM</p>
                <p
                  className="hd-font-display text-2xl italic font-medium leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  “{ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.ultimatePurposeAxiom}”
                </p>
                <p
                  className="hd-font-body text-xs italic pt-3 border-t"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                >
                  Four distinct legal frameworks · CAG Report No. 4 of 2025 (22-year lake-bill
                  delay) · India SWM Rules 2026 · Neelum–Jhelum e-flows · GB 2014/2015 EPA &amp;
                  2019 Forest Act · 15 model reform packages subject to independent jurisdictional
                  counsel review.
                </p>
              </aside>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              {ENVIRONMENTAL_LAW_MONOGRAPH_SPEC.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border flex flex-col justify-between space-y-3"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="space-y-2">
                    <p className="hd-kicker">{item.level}</p>
                    <h4
                      className="hd-font-display text-xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="hd-font-body text-xs leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL ELECTORAL ACCOUNTABILITY FLAGSHIP (IMMEDIATELY BEFORE SELECTIVE CONSCIOUSNESS)
          "When Politics Promises Green" + Monograph 06 & KEW Manifesto Observatory
          ═══════════════════════════════════════════════════════════════════════ */}
      {whenPoliticsPromisesGreenFlagship && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-8 space-y-5">
                <span className="hd-kicker">
                  {politicsGreenNo} &nbsp;·&nbsp; {WHEN_POLITICS_PROMISES_GREEN_SPEC.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(whenPoliticsPromisesGreenFlagship)}
                  className="block group space-y-2"
                >
                  <h2
                    className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {WHEN_POLITICS_PROMISES_GREEN_SPEC.title}
                  </h2>
                  <p
                    className="hd-font-display text-2xl sm:text-3xl italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {WHEN_POLITICS_PROMISES_GREEN_SPEC.subtitle}
                  </p>
                </Link>

                <p
                  className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  {whenPoliticsPromisesGreenFlagship.excerpt}
                </p>

                <div
                  className="grid grid-cols-3 gap-6 py-5 border-y"
                  style={{ borderColor: 'var(--hd-rule-strong)' }}
                >
                  {WHEN_POLITICS_PROMISES_GREEN_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div
                        className="hd-font-display text-3xl sm:text-5xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {st.value}
                      </div>
                      <div className="hd-folio-meta">{st.label}</div>
                    </div>
                  ))}
                </div>

                <p className="hd-folio-meta">
                  BY {WHEN_POLITICS_PROMISES_GREEN_SPEC.proposedByline} &nbsp;·&nbsp;{' '}
                  {WHEN_POLITICS_PROMISES_GREEN_SPEC.geographicalCoverage}
                </p>
              </div>

              <aside
                className="lg:col-span-4 p-6 sm:p-8 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <p className="hd-kicker">DEFINING ELECTORAL QUESTION</p>
                <p
                  className="hd-font-display text-2xl italic font-medium leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  “{WHEN_POLITICS_PROMISES_GREEN_SPEC.definingQuestion}”
                </p>
                <p
                  className="hd-font-body text-xs italic pt-3 border-t"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                >
                  {WHEN_POLITICS_PROMISES_GREEN_SPEC.researchStatusDisclosure}
                </p>
              </aside>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              {WHEN_POLITICS_PROMISES_GREEN_SPEC.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border flex flex-col justify-between space-y-3"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg)',
                  }}
                >
                  <div className="space-y-2">
                    <p className="hd-kicker">{item.level}</p>
                    <h4
                      className="hd-font-display text-xl font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="hd-font-body text-xs leading-relaxed"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          SPECIAL POLITICAL ECOLOGY FLAGSHIP (DISPATCH 22 + MONOGRAPH 02)
          "Selective Environmental Consciousness" + Three Flagship Foundations
          ═══════════════════════════════════════════════════════════════════════ */}
      {selectiveConsciousnessFlagship && (
        <section
          className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: '#171717',
            color: '#F2EFE7',
          }}
        >
          <div className="max-w-[1440px] mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-5">
                <span className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-[#D8C3A5]">
                  {selectiveConsciousnessNo} &nbsp;·&nbsp; {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.kicker}
                </span>

                <Link
                  href={resolveCanonicalStoryUrl(selectiveConsciousnessFlagship)}
                  className="block group space-y-2"
                >
                  <h2 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.0] text-[#F2EFE7] group-hover:underline underline-offset-4">
                    {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.title}
                  </h2>
                  <p className="hd-font-display text-2xl sm:text-3xl italic text-[#D8C3A5]">
                    {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.subtitle}
                  </p>
                </Link>

                <p className="hd-font-body text-base sm:text-lg leading-relaxed text-[#F2EFE7]/85 max-w-3xl">
                  {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.extendedSubtitle}
                </p>

                <div className="grid grid-cols-3 gap-6 py-5 border-y border-[#F2EFE7]/20">
                  {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.heroStats.map((st) => (
                    <div key={st.label} className="space-y-1">
                      <div className="hd-font-display text-3xl sm:text-5xl font-semibold text-[#F2EFE7]">
                        {st.value}
                      </div>
                      <div className="hd-font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#D8C3A5]">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="hd-font-sans text-xs tracking-[0.16em] uppercase text-[#D8C3A5]">
                  BY {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.proposedByline} &nbsp;·&nbsp;{' '}
                  {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.geographicScope}
                </p>
              </div>

              <aside className="lg:col-span-5 p-6 sm:p-8 border border-[#F2EFE7]/20 bg-[#201F1D] space-y-4">
                <p className="hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                  HIMALAYAN DISPATCH&apos;S MAJOR ACCOUNTABILITY FLAGSHIPS
                </p>
                <div className="space-y-3">
                  {HIMALAYAN_DISPATCH_FIVE_FLAGSHIP_INVESTIGATIONS.map((fl) => (
                    <div
                      key={fl.dispatchLabel}
                      className="p-4 border border-[#F2EFE7]/15 bg-[#171717] space-y-1"
                    >
                      <p className="hd-font-sans text-[10px] tracking-[0.18em] uppercase text-[#D8C3A5]">
                        {fl.dispatchLabel} · {fl.foundationPillar}
                      </p>
                      <Link
                        href={fl.href}
                        className="hd-font-display text-xl font-semibold text-[#F2EFE7] block hover:underline"
                      >
                        {fl.title}
                      </Link>
                      <p className="hd-font-body text-xs text-[#F2EFE7]/75">{fl.subtitle}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F2EFE7]/20">
              {SELECTIVE_CONSCIOUSNESS_MONOGRAPH_SPEC.publicationHierarchy.map((item) => (
                <div
                  key={item.level}
                  className="p-5 border border-[#F2EFE7]/20 bg-[#201F1D] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <p className="hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#D8C3A5]">
                      {item.level}
                    </p>
                    <h4 className="hd-font-display text-xl font-semibold text-[#F2EFE7]">
                      {item.title}
                    </h4>
                    <p className="hd-font-body text-xs leading-relaxed text-[#F2EFE7]/75">
                      {item.detail}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#D8C3A5] hover:underline pt-1"
                  >
                    <span>{item.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          FOUNDING INSTITUTIONAL NARRATIVE — WHY HIMALAYAN DISPATCH EXISTS
          Permanently featured in the Inaugural Edition (Vol. 01 / No. 01)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="hd-kicker">{HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.kicker}</p>
            <div className="space-y-1.5">
              <p
                className="hd-font-display text-3xl sm:text-5xl italic font-semibold leading-[1.08]"
                style={{ color: 'var(--hd-fg)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineOne}
              </p>
              <p
                className="hd-font-display text-3xl sm:text-5xl italic font-semibold leading-[1.08]"
                style={{ color: 'var(--hd-copper)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineTwo}
              </p>
            </div>
            <p className="hd-folio-meta tracking-[0.24em] pt-1">
              {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.publicationName} &nbsp;·&nbsp;{' '}
              {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.motto}
            </p>
          </div>

          <div
            className="lg:col-span-7 lg:border-l lg:pl-14 space-y-4"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <span className="hd-kicker block">
              FOUNDING INSTITUTIONAL NARRATIVE · THE INAUGURAL ISSUE
            </span>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_STORY.title}
            </h2>
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {HIMALAYAN_DISPATCH_FOUNDING_STORY.standfirst}
            </p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Born out of necessity rather than rivalry, Himalayan Dispatch exists so that critical
              scientific observations, transboundary ecological processes and evidence-based
              environmental questions across Kashmir, Jammu, Ladakh, AJ&amp;K, Gilgit and Baltistan
              always have a responsible public home.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <Link
                href={HD_ROUTES.ourStory}
                className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--hd-copper-solid)' }}
              >
                <span>Read Our Founding Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href={HD_ROUTES.editorialCharter} className="hd-kicker hover:underline">
                Read the Editorial Charter →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SIGNATURE FEATURE — BEHIND THE NEXT COVER (ISSUE 02 PREVIEW)
          ═══════════════════════════════════════════════════════════════════════ */}
      <ForthcomingEditionSpread
        edition={forthcomingEdition}
        previews={forthcomingPreviews}
        showFullPageLink
      />
    </div>
  );
}
