import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicEditionBySlug,
  getPublicEditions,
} from '@/lib/himalayan-dispatch-store';
import { ForthcomingEditionSpread } from '@/components/himalayan-dispatch/ForthcomingEditionSpread';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import {
  CANONICAL_DISPATCH_URL,
  CANONICAL_KEW_PLATFORM_URL,
  DEPARTMENT_ID_TO_ROUTE_SLUG,
  DISPATCH_IDENTITY,
  HD_ROUTES,
  IS_DISPATCH_SUBDOMAIN_LIVE,
  toCanonicalIssueSlug,
  toDispatchCanonicalUrl,
  toInternalDispatchPath,
} from '@/lib/himalayan-dispatch-routes';
import { KewContentShare } from '@/components/common/KewContentShare';
import { isHimalayanDispatchMonograph } from '@/lib/sharing/kew-content-sharing';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY,
  HIMALAYAN_DISPATCH_FOUNDING_STORY,
} from '@/data/himalayan-dispatch-founding-story';
import {
  BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE,
  BEYOND_THE_CONFERENCE_SERIES_META,
  CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_META,
  CIVIL_SOCIETY_DEFINING_PRINCIPLE,
  HIMALAYAN_DISPATCH_COMPLETE_EDITORIAL_ARCHITECTURE,
} from '@/data/himalayan-dispatch-beyond-conference';

export function generateStaticParams() {
  return getPublicEditions()
    .filter((ed) => ed.status !== 'forthcoming')
    .map((ed) => ({ issueSlug: toCanonicalIssueSlug(ed.slug) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ issueSlug: string }>;
}): Promise<Metadata> {
  const { issueSlug } = await params;
  const data = getPublicEditionBySlug(issueSlug);
  if (!data) {
    return buildPageMetadata({
      title: 'Issue Not Found — Himalayan Dispatch',
      description: 'Requested monthly issue folio was not found.',
      canonicalPath: `/himalayan-dispatch/issues/${issueSlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${data.edition.title} — ${data.edition.volumeLabel} | Himalayan Dispatch`,
    description: data.edition.subtitle,
    canonicalPath: HD_ROUTES.issue(data.canonicalIssueSlug),
    imagePath: data.edition.coverImage,
  });
}

export default async function HimalayanDispatchMonthlyIssuePage({
  params,
}: {
  params: Promise<{ issueSlug: string }>;
}) {
  const { issueSlug } = await params;
  if (issueSlug === 'vol-01-no-01') {
    permanentRedirect(HD_ROUTES.inauguralIssue);
  }

  const data = getPublicEditionBySlug(issueSlug);
  if (!data) {
    notFound();
  }

  const { edition, canonicalIssueSlug, stories, forthcomingPreviews } = data;

  if (edition.status === 'forthcoming') {
    return (
      <ForthcomingEditionSpread
        edition={edition}
        previews={forthcomingPreviews}
        showFullPageLink={false}
      />
    );
  }

  const isMonograph = isHimalayanDispatchMonograph(edition);
  const canonicalIssuePath = HD_ROUTES.issue(canonicalIssueSlug);
  const activeIssueOrigin = IS_DISPATCH_SUBDOMAIN_LIVE
    ? CANONICAL_DISPATCH_URL
    : CANONICAL_KEW_PLATFORM_URL;
  const canonicalIssueFullUrl = IS_DISPATCH_SUBDOMAIN_LIVE
    ? toDispatchCanonicalUrl(canonicalIssuePath)
    : `${CANONICAL_KEW_PLATFORM_URL}${toInternalDispatchPath(`/issues/${canonicalIssueSlug}`)}`;

  const issueSchema = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    issueNumber: edition.volumeLabel,
    name: `${edition.title} (${edition.volumeLabel})`,
    datePublished: edition.publishedIsoDate,
    url: canonicalIssueFullUrl,
    isPartOf: {
      '@type': 'Periodical',
      '@id': `${activeIssueOrigin}/#periodical`,
      name: DISPATCH_IDENTITY.officialName,
      url: IS_DISPATCH_SUBDOMAIN_LIVE
        ? DISPATCH_IDENTITY.canonicalHomepageUrl
        : `${CANONICAL_KEW_PLATFORM_URL}/himalayan-dispatch`,
      publisher: DISPATCH_IDENTITY.publisherName,
    },
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id={`hd-issue-${canonicalIssueSlug}`} data={issueSchema} />
      <div className="max-w-[1400px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Edition Archive', href: HD_ROUTES.archive },
            { label: `${edition.issueNumberLabel} (${edition.volumeLabel})` },
          ]}
        />

        {/* Issue Cover Spread */}
        <header
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-14 border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-6">
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#171717]">
              <img
                src={edition.coverImage}
                alt={edition.coverCaption}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="hd-font-body text-xs italic mt-2.5" style={{ color: 'var(--hd-fg-muted)' }}>
              {edition.coverCaption} — {edition.coverCredit}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <p className="hd-kicker">
              {edition.issueNumberLabel} &nbsp;·&nbsp; {edition.volumeLabel}
            </p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.01]"
              style={{ color: 'var(--hd-fg)' }}
            >
              {edition.title}
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              {edition.subtitle}
            </p>
            <p className="hd-folio-meta">
              {edition.publicationDateLabel} &nbsp;·&nbsp; COVER PLATE: {edition.coverLocation}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {stories[0] && (
                <Link
                  href={HD_ROUTES.issueArticle(canonicalIssueSlug, stories[0].slug)}
                  className="hd-font-sans inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7]"
                  style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                >
                  <span>{isMonograph ? 'Read Monograph' : 'Read Cover Inquiry'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <KewContentShare
                variant="editorial-button"
                label={isMonograph ? 'Share This Monograph' : 'Share This Issue'}
                title={`${edition.title} — ${edition.volumeLabel} | Himalayan Dispatch`}
                description={edition.subtitle}
                canonicalPath={canonicalIssuePath}
                editionStatus={edition.status}
                isPublished
              />

              <Link href={HD_ROUTES.archive} className="hd-kicker hover:underline">
                All Editions →
              </Link>
            </div>
          </div>
        </header>

        {/* Founding Institutional Narrative Banner (Inaugural Issue Vol. 01 / No. 01) */}
        {canonicalIssueSlug === 'volume-01-issue-01' && (
          <section
            className="p-8 sm:p-10 lg:p-12 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="lg:col-span-5 space-y-2.5">
              <p className="hd-kicker">{HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.kicker}</p>
              <p
                className="hd-font-display text-2xl sm:text-4xl italic font-semibold leading-tight"
                style={{ color: 'var(--hd-fg)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineOne}
              </p>
              <p
                className="hd-font-display text-2xl sm:text-4xl italic font-semibold leading-tight"
                style={{ color: 'var(--hd-copper)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineTwo}
              </p>
            </div>

            <div
              className="lg:col-span-7 lg:border-l lg:pl-10 space-y-3"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <p className="hd-kicker">FOUNDING INSTITUTIONAL NARRATIVE</p>
              <h2
                className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug"
                style={{ color: 'var(--hd-fg)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_STORY.title}
              </h2>
              <p
                className="hd-font-body text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {HIMALAYAN_DISPATCH_FOUNDING_STORY.standfirst}
              </p>
              <div className="pt-1">
                <Link
                  href={HD_ROUTES.ourStory}
                  className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase hover:underline"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  <span>Read Complete Founding Story</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Editor's Note + Complete Issue Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 space-y-4">
            <p className="hd-kicker">FROM THE MASTHEAD</p>
            <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              {edition.editorsNoteTitle}
            </h2>
            <div className="hd-prose">
              {edition.editorsNoteBody.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                  {p}
                </p>
              ))}
            </div>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-font-display text-xl italic font-semibold">{edition.editorsNoteAuthor}</p>
              <p className="hd-folio-meta">{edition.editorsNoteRole}</p>
            </div>
          </div>

          <div
            className="lg:col-span-8 lg:border-l lg:pl-14 divide-y"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <div className="pb-4 flex items-center justify-between">
              <span className="hd-kicker">ARTICLES IN THIS EDITION ({stories.length})</span>
              <span className="hd-folio-meta">PERMANENT ISSUE URLS</span>
            </div>

            {canonicalIssueSlug === 'volume-01-issue-01' && (
              <div
                className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                {HIMALAYAN_DISPATCH_COMPLETE_EDITORIAL_ARCHITECTURE.map((arch) => (
                  <div
                    key={arch.dispatches}
                    className="p-4 border space-y-1"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <p className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                      DISPATCHES {arch.dispatches}
                    </p>
                    <p className="hd-font-display text-lg font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {arch.series}
                    </p>
                    <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {arch.primaryFocus}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {stories.map((st, idx) => {
              const articleHref = HD_ROUTES.issueArticle(canonicalIssueSlug, st.slug);
              const deptSlug = DEPARTMENT_ID_TO_ROUTE_SLUG[st.departmentId];
              const beyondMeta = BEYOND_THE_CONFERENCE_SERIES_META[st.slug];
              const civilMeta = CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_META[st.slug];
              const isFirstBeyondSeries =
                canonicalIssueSlug === 'volume-01-issue-01' &&
                st.slug === 'science-has-diagnosed-the-valley-who-will-prescribe-its-governance';
              const isFirstCivilSeries =
                canonicalIssueSlug === 'volume-01-issue-01' &&
                st.slug === 'six-years-of-warnings-and-kashmir-still-cannot-breathe';
              return (
                <React.Fragment key={st.id}>
                  {isFirstBeyondSeries && (
                    <div
                      className="py-8 space-y-2.5"
                      style={{ borderColor: 'var(--hd-rule-strong)' }}
                    >
                      <p className="hd-kicker">{BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE.kicker}</p>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE.headline}
                      </h3>
                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE.standfirst}
                      </p>
                    </div>
                  )}
                  {isFirstCivilSeries && (
                    <div
                      className="py-8 space-y-2.5"
                      style={{ borderColor: 'var(--hd-rule-strong)' }}
                    >
                      <p className="hd-kicker">{CIVIL_SOCIETY_DEFINING_PRINCIPLE.kicker}</p>
                      <h3
                        className="hd-font-display text-2xl sm:text-3xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {CIVIL_SOCIETY_DEFINING_PRINCIPLE.headline}
                      </h3>
                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {CIVIL_SOCIETY_DEFINING_PRINCIPLE.standfirst}
                      </p>
                    </div>
                  )}
                  <article
                    className="py-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <Link href={articleHref} className="sm:col-span-4 hd-plate-group block">
                      <div className="hd-plate-frame aspect-[16/10] w-full">
                        <img
                          src={st.heroImage}
                          alt={st.heroCaption}
                          className={`w-full h-full object-cover ${
                            st.heroMonochrome ? 'grayscale contrast-125' : ''
                          }`}
                        />
                      </div>
                    </Link>

                    <div className="sm:col-span-8 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Link
                          href={HD_ROUTES.department(deptSlug)}
                          className="hd-kicker hover:underline"
                        >
                          {String(idx + 1).padStart(2, '0')} · {st.departmentRubric}
                        </Link>
                        <span className="hd-folio-meta">
                          {st.departmentId === 'photo-essays'
                            ? `${st.readingTimeMinutes} MIN READ · ${st.estimatedViewingMinutes || 7} MIN VIEW (${st.wordCount.toLocaleString()} WORDS)`
                            : `${st.readingTimeMinutes} MIN READ (${st.wordCount.toLocaleString()} WORDS)`}
                        </span>
                      </div>

                      <Link href={articleHref} className="block group">
                        <h3
                          className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug group-hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {st.title}
                        </h3>
                      </Link>

                      {beyondMeta && (
                        <p
                          className="hd-font-display text-base sm:text-lg italic"
                          style={{ color: 'var(--hd-copper)' }}
                        >
                          {st.subtitle} — Proposed Framework: {beyondMeta.proposedFramework}
                        </p>
                      )}

                      {civilMeta && (
                        <p
                          className="hd-font-display text-base sm:text-lg italic"
                          style={{ color: 'var(--hd-copper)' }}
                        >
                          {civilMeta.centralQuestion} — Advancement: {civilMeta.proposedFramework}
                        </p>
                      )}

                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {st.excerpt}
                      </p>

                      <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                        <Link
                          href={HD_ROUTES.journalistPortfolio(st.journalistSlug)}
                          className="hd-folio-meta hover:underline"
                        >
                          BY {st.bylineDisplay}
                        </Link>
                        <div className="inline-flex items-center gap-3">
                          <Link
                            href={articleHref}
                            className="hd-kicker inline-flex items-center gap-1"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <KewContentShare
                            variant="toc-icon"
                            title={st.title}
                            description={st.excerpt || st.subtitle}
                            canonicalPath={articleHref}
                            isPublished={st.isPublished}
                            workflowStage={st.workflowStage}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
