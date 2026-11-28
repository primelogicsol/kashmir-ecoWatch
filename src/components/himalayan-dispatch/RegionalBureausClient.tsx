'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import type {
  EditorialDepartmentId,
  JournalistProfile,
  MagazineStory,
  PublicForthcomingAssignmentPreview,
} from '@/types/himalayan-dispatch';
import type { RegionalBureauSpec } from '@/data/himalayan-dispatch';
import {
  DEPARTMENT_ID_TO_ROUTE_SLUG,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
} from '@/lib/himalayan-dispatch-routes';

interface BeatItem {
  code: string;
  title: string;
  leadDepartmentId: EditorialDepartmentId;
  description: string;
}

export function RegionalBureausClient({
  bureaus,
  stories,
  forthcomingPreviews,
  journalists,
  beats,
}: {
  bureaus: RegionalBureauSpec[];
  stories: MagazineStory[];
  forthcomingPreviews: PublicForthcomingAssignmentPreview[];
  journalists: JournalistProfile[];
  beats: BeatItem[];
}) {
  const [selectedBureau, setSelectedBureau] = useState<string>('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('bureau');
    if (q && bureaus.some((b) => b.id === q)) {
      setSelectedBureau(q);
    } else {
      setSelectedBureau('all');
    }
  }, [bureaus]);

  const visibleBureaus =
    selectedBureau === 'all'
      ? bureaus
      : bureaus.filter((b) => b.id === selectedBureau);

  const matchStoriesForBureau = (bureau: RegionalBureauSpec) =>
    stories.filter((st) =>
      bureau.storyRegionKeywords.some(
        (kw) =>
          st.region.toLowerCase().includes(kw.toLowerCase()) ||
          st.dateline.toLowerCase().includes(kw.toLowerCase())
      )
    );

  const matchForthcomingForBureau = (bureau: RegionalBureauSpec) =>
    forthcomingPreviews.filter((pr) =>
      bureau.storyRegionKeywords.some((kw) =>
        pr.region.toLowerCase().includes(kw.toLowerCase())
      )
    );

  const matchCorrespondentsForBureau = (bureau: RegionalBureauSpec) =>
    journalists.filter((j) =>
      bureau.storyRegionKeywords.some(
        (kw) =>
          j.basedIn.toLowerCase().includes(kw.toLowerCase()) ||
          j.beat.toLowerCase().includes(kw.toLowerCase())
      )
    );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-20">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Opening Editorial Header & Publishing Imprint */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pb-12 border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">SIX REGIONAL REPORTING BUREAUS</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Western Himalayan Reporting Architecture
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Himalayan Dispatch organizes its mountain journalism across six regional reporting
              bureaus—spanning the Kashmir Valley, the Chenab and Pir Panjal escarpments of Jammu,
              Trans-Himalayan Ladakh, AJ&amp;K, Gilgit, and Baltistan—supported by our editorial
              headquarters in Fairfax, Virginia.
            </p>
          </div>

          <div
            className="lg:col-span-5 p-6 sm:p-8 border space-y-4"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">INSTITUTIONAL TRANSPARENCY &amp; BUREAU STATUS</span>
            </div>
            <p
              className="hd-font-body text-sm leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Editorial Headquarters &amp; Publishing Office: <strong>Fairfax, VA 22031</strong>,
              Greater Washington Metropolitan Area, United States of America. Regional bureaus
              represent distributed editorial reporting desks and correspondent networks—not
              walk-in commercial or physical street offices. Bureaus currently in establishment are
              explicitly designated below and are actively welcoming correspondent applications.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-5">
              <Link
                href={HD_ROUTES.correspondentApplications}
                className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
              >
                <span>Apply as Regional Correspondent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Bureau Filter Rubric */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
          role="tablist"
          aria-label="Filter by Western Himalayan regional bureau"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedBureau === 'all'}
            onClick={() => setSelectedBureau('all')}
            className="hd-font-sans text-[11px] font-semibold tracking-[0.2em] uppercase cursor-pointer py-1"
            style={{
              color: selectedBureau === 'all' ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
              borderBottom: selectedBureau === 'all' ? '2px solid var(--hd-copper)' : 'none',
            }}
          >
            All Six Bureaus
          </button>

          {bureaus.map((bureau) => {
            const active = selectedBureau === bureau.id;
            return (
              <button
                key={bureau.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedBureau(bureau.id)}
                className="hd-font-sans text-[11px] font-medium tracking-[0.18em] uppercase cursor-pointer py-1 transition-colors"
                style={{
                  color: active ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                  borderBottom: active ? '2px solid var(--hd-copper)' : 'none',
                }}
              >
                {bureau.name}
              </button>
            );
          })}
        </div>

        {/* Regional Bureau Ledgers */}
        <div className="space-y-16">
          {visibleBureaus.map((bureau) => {
            const bureauStories = matchStoriesForBureau(bureau);
            const bureauForthcoming = matchForthcomingForBureau(bureau);
            const bureauCorrespondents = matchCorrespondentsForBureau(bureau);
            const isActiveDesk = bureau.operationalStatus === 'active_reporting_desk';

            return (
              <section
                id={`${bureau.id}-bureau`}
                key={bureau.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 border-t first:border-t-0 first:pt-0 scroll-mt-24"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                {/* Left 5 Cols: Bureau Charter, Status & Geographic Coverage */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="hd-kicker">BUREAU {bureau.folioRoman}</span>
                    <span style={{ color: 'var(--hd-stone)' }}>·</span>
                    <span
                      className="hd-font-sans px-2.5 py-0.5 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                      style={{
                        borderColor: isActiveDesk ? 'var(--hd-copper)' : 'var(--hd-rule-strong)',
                        color: isActiveDesk ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                        backgroundColor: isActiveDesk ? 'var(--hd-copper-soft)' : 'transparent',
                      }}
                    >
                      {bureau.publicStatusBadge}
                    </span>
                  </div>

                  <h2
                    className="hd-font-display text-3xl sm:text-4xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {bureau.name}
                  </h2>

                  <p
                    className="hd-font-display text-lg italic"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {bureau.geographicScopeLabel}
                  </p>

                  <p
                    className="hd-font-body text-sm sm:text-base leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {bureau.editorialMandate}
                  </p>

                  <div className="pt-1 space-y-2">
                    <span className="hd-folio-meta flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" style={{ color: 'var(--hd-copper)' }} />
                      <span>REPORTING UNITS &amp; DISTRICTS ({bureau.coveredUnits.length})</span>
                    </span>
                    <p
                      className="hd-font-body text-xs sm:text-sm leading-relaxed"
                      style={{ color: 'var(--hd-fg-muted)' }}
                    >
                      {bureau.coveredUnits.join(' · ')}
                    </p>
                  </div>

                  <p
                    className="hd-font-body text-xs italic pt-2 border-t"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      color: 'var(--hd-fg-muted)',
                    }}
                  >
                    Status Disclosure: {bureau.physicalOfficeDisclosure}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-5">
                    <Link
                      href={`${HD_ROUTES.correspondentApplications}?bureau=${bureau.id}#apply`}
                      className="hd-font-sans inline-flex items-center gap-2 px-4 py-2.5 border text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors hover:opacity-85"
                      style={{
                        borderColor: 'var(--hd-copper)',
                        color: 'var(--hd-copper)',
                        backgroundColor: 'var(--hd-copper-soft)',
                      }}
                    >
                      <span>Apply for {bureau.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={HD_ROUTES.pitch}
                      className="hd-kicker hover:underline"
                    >
                      Pitch a Regional Story →
                    </Link>
                  </div>
                </div>

                {/* Right 7 Cols: Published Dispatches, Approved Commissions & Correspondents */}
                <div
                  className="lg:col-span-7 lg:border-l lg:pl-12 space-y-8"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  {bureauStories.length > 0 ? (
                    <div className="space-y-5">
                      <span className="hd-kicker block">
                        PUBLISHED DISPATCHES ({bureauStories.length})
                      </span>
                      <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                        {bureauStories.map((st) => (
                          <article key={st.id} className="py-4 first:pt-0 space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="hd-folio-meta">{st.departmentRubric}</span>
                              <span className="hd-folio-meta">{st.dateline}</span>
                            </div>
                            <Link
                              href={resolveCanonicalStoryUrl(st)}
                              className="block group"
                            >
                              <h3
                                className="hd-font-display text-2xl font-semibold group-hover:underline underline-offset-4"
                                style={{ color: 'var(--hd-fg)' }}
                              >
                                {st.title}
                              </h3>
                            </Link>
                            <p
                              className="hd-font-body text-sm leading-relaxed"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {st.excerpt}
                            </p>
                            <p className="hd-folio-meta pt-0.5">
                              BY {st.bylineDisplay} &nbsp;·&nbsp; {st.readingTimeMinutes} MIN READ
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="p-6 border space-y-2.5"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg-elevated)',
                      }}
                    >
                      <span className="hd-kicker block">COMMISSIONING SLATE OPEN</span>
                      <h3
                        className="hd-font-display text-2xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {isActiveDesk
                          ? 'Regional Commissions & Field Dispatches Open'
                          : 'Inaugural Regional Commissions Invited'}
                      </h3>
                      <p
                        className="hd-font-body text-sm leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {isActiveDesk
                          ? `${bureau.name} operates as an active distributed editorial reporting desk across ${bureau.coveredUnits.slice(0, 4).join(', ')} and surrounding districts. Experienced environmental reporters, photojournalists, and researchers are invited to submit story proposals or apply as regional correspondents.`
                          : `${bureau.name} is currently establishing its distributed reporting desk for forthcoming volumes of Himalayan Dispatch. Experienced environmental reporters, photojournalists, and researchers grounded in ${bureau.coveredUnits.slice(0, 4).join(', ')} are invited to apply or submit a story proposal.`}
                      </p>
                    </div>
                  )}

                  {bureauForthcoming.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="hd-kicker block">
                        APPROVED FORTHCOMING COMMISSIONS ({bureauForthcoming.length})
                      </span>
                      <div className="space-y-3">
                        {bureauForthcoming.map((pr) => (
                          <div
                            key={pr.id}
                            className="p-4 border space-y-1"
                            style={{
                              borderColor: 'var(--hd-rule)',
                              backgroundColor: 'var(--hd-bg-elevated)',
                            }}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="hd-folio-meta">{pr.departmentLabel}</span>
                              <span className="hd-kicker">{pr.publicStageLabel}</span>
                            </div>
                            <h4
                              className="hd-font-display text-xl font-semibold"
                              style={{ color: 'var(--hd-fg)' }}
                            >
                              {pr.workingTitle}
                            </h4>
                            <p
                              className="hd-font-body text-sm"
                              style={{ color: 'var(--hd-fg-secondary)' }}
                            >
                              {pr.synopsis}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {bureauCorrespondents.length > 0 && (
                    <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
                      <span className="hd-folio-meta block">MASTHEAD &amp; DESK AUTHORS COVERING THIS REGION</span>
                      <div className="flex flex-wrap gap-4 pt-1">
                        {bureauCorrespondents.map((c) => (
                          <Link
                            key={c.slug}
                            href={HD_ROUTES.journalistPortfolio(c.slug)}
                            className="hd-font-body text-sm underline underline-offset-4"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {c.name} ({c.roleTitle})
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* Cross-Himalayan Reporting Beats */}
        <section
          id="reporting-beats"
          className="pt-16 border-t space-y-10 scroll-mt-24"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="max-w-3xl space-y-3">
            <p className="hd-kicker">EDITORIAL AFFAIRS · REPORTING BEATS</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              Six Cross-Himalayan Thematic Beats
            </h2>
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Ecological and hydrological systems cross administrative lines; our thematic beats pair
              regional correspondents with independent scientific reviewers across the entire
              mountain arc.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            {beats.map((beat) => (
              <div
                key={beat.code}
                className="p-6 sm:p-8 border-r border-b flex flex-col justify-between space-y-4"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
              >
                <div className="space-y-2.5">
                  <span className="hd-kicker block">{beat.code}</span>
                  <h3
                    className="hd-font-display text-2xl font-semibold leading-snug"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {beat.title}
                  </h3>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {beat.description}
                  </p>
                </div>
                <Link
                  href={HD_ROUTES.department(DEPARTMENT_ID_TO_ROUTE_SLUG[beat.leadDepartmentId])}
                  className="hd-kicker inline-flex items-center gap-1.5 pt-2 hover:underline"
                >
                  <span>Explore Department Stories</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
