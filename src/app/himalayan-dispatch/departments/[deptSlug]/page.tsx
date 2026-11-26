import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDepartmentDossier } from '@/lib/himalayan-dispatch-store';
import {
  DEPARTMENT_ROUTE_CONFIG,
  DepartmentRouteSlug,
  FOOTER_DEPARTMENT_LINKS,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  toCanonicalIssueSlug,
} from '@/lib/himalayan-dispatch-routes';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialDataGraphic } from '@/components/himalayan-dispatch/EditorialDataGraphic';
import { PitchDeskClient } from '@/components/himalayan-dispatch/PitchDeskClient';
import { EDITORIAL_DEPARTMENTS } from '@/data/himalayan-dispatch';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return (Object.keys(DEPARTMENT_ROUTE_CONFIG) as DepartmentRouteSlug[]).map((deptSlug) => ({
    deptSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ deptSlug: string }>;
}): Promise<Metadata> {
  const { deptSlug } = await params;
  const dossier = getPublicDepartmentDossier(deptSlug);
  if (!dossier) {
    return buildPageMetadata({
      title: 'Department Not Found — Himalayan Dispatch',
      description: 'Requested editorial department was not found.',
      canonicalPath: `/himalayan-dispatch/departments/${deptSlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${dossier.config.name} — Editorial Department | Himalayan Dispatch`,
    description: dossier.config.editorialIntroduction,
    canonicalPath: HD_ROUTES.department(dossier.config.routeSlug),
    imagePath: dossier.featuredStory?.heroImage,
  });
}

export default async function DepartmentLandingPage({
  params,
}: {
  params: Promise<{ deptSlug: string }>;
}) {
  const { deptSlug } = await params;
  const dossier = getPublicDepartmentDossier(deptSlug);
  if (!dossier) {
    notFound();
  }

  const {
    config,
    featuredStory,
    currentEditionStories,
    historicalStories,
    dailyDispatches,
    forthcomingPreviews,
    contributors,
    editions,
  } = dossier;

  const isVisualDarkroom = config.layoutVariant === 'darkroom_plates';
  const scopedDepartments = EDITORIAL_DEPARTMENTS.filter((d) =>
    config.matchingDepartmentIds.includes(d.id)
  );

  return (
    <div>
      {/* Department Hero & Mandate */}
      <section
        className={`w-full px-4 sm:px-8 lg:px-14 pt-10 pb-14 sm:pb-20 border-b ${
          isVisualDarkroom ? 'hd-darkroom-spread' : ''
        }`}
        style={{ borderColor: isVisualDarkroom ? 'rgba(242,239,231,0.2)' : 'var(--hd-rule-strong)' }}
      >
        <div className="max-w-[1440px] mx-auto space-y-10">
          <EditorialBreadcrumbs
            darkSurface={isVisualDarkroom}
            items={[
              { label: 'Departments', href: HD_ROUTES.departments },
              { label: config.name },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-5">
              <p
                className="hd-font-sans text-[11px] font-semibold tracking-[0.24em] uppercase"
                style={{ color: isVisualDarkroom ? '#D8C3A5' : 'var(--hd-copper)' }}
              >
                {config.kicker}
              </p>
              <h1
                className="hd-font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.01]"
                style={{ color: isVisualDarkroom ? '#F2EFE7' : 'var(--hd-fg)' }}
              >
                {config.name}
              </h1>
              <p
                className="hd-font-display text-xl sm:text-2xl italic"
                style={{ color: isVisualDarkroom ? '#D8C3A5' : 'var(--hd-copper)' }}
              >
                {config.tagline}
              </p>
              <p
                className="hd-font-body text-base sm:text-lg leading-relaxed max-w-3xl"
                style={{ color: isVisualDarkroom ? 'rgba(242,239,231,0.85)' : 'var(--hd-fg-secondary)' }}
              >
                {config.editorialIntroduction}
              </p>
            </div>

            <aside
              className="lg:col-span-4 p-6 border space-y-3"
              style={{
                borderColor: isVisualDarkroom ? 'rgba(242,239,231,0.22)' : 'var(--hd-rule-strong)',
                backgroundColor: isVisualDarkroom ? '#201F1D' : 'var(--hd-bg-elevated)',
              }}
            >
              <p
                className="hd-font-sans text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: isVisualDarkroom ? '#D8C3A5' : 'var(--hd-copper)' }}
              >
                DEPARTMENT MANDATE &amp; FORMAT
              </p>
              <p
                className="hd-font-body text-sm leading-relaxed"
                style={{ color: isVisualDarkroom ? '#F2EFE7' : 'var(--hd-fg-secondary)' }}
              >
                {config.editorialMandate}
              </p>
              <p
                className="hd-font-sans text-[10px] tracking-[0.16em] uppercase pt-2 border-t"
                style={{
                  borderColor: isVisualDarkroom ? 'rgba(242,239,231,0.15)' : 'var(--hd-rule)',
                  color: isVisualDarkroom ? '#A39B8B' : 'var(--hd-fg-muted)',
                }}
              >
                SCOPE: {config.wordCountGuide}
              </p>
            </aside>
          </div>

          {/* Department-Specific Featured Composition */}
          {featuredStory && (
            <div
              className="pt-10 border-t grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              style={{ borderColor: isVisualDarkroom ? 'rgba(242,239,231,0.18)' : 'var(--hd-rule)' }}
            >
              <Link
                href={resolveCanonicalStoryUrl(featuredStory)}
                className="lg:col-span-7 hd-plate-group block"
              >
                <div className="hd-plate-frame aspect-[16/9] w-full">
                  <img
                    src={featuredStory.heroImage}
                    alt={featuredStory.heroCaption}
                    className={`w-full h-full object-cover ${
                      featuredStory.heroMonochrome || isVisualDarkroom
                        ? 'grayscale contrast-125'
                        : ''
                    }`}
                  />
                </div>
              </Link>

              <div className="lg:col-span-5 space-y-4">
                <span
                  className="hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase"
                  style={{ color: isVisualDarkroom ? '#D8C3A5' : 'var(--hd-copper)' }}
                >
                  FEATURED IN {featuredStory.editionLabel}
                </span>
                <Link
                  href={resolveCanonicalStoryUrl(featuredStory)}
                  className="block group"
                >
                  <h2
                    className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.03] group-hover:underline underline-offset-4"
                    style={{ color: isVisualDarkroom ? '#F2EFE7' : 'var(--hd-fg)' }}
                  >
                    {featuredStory.title}
                  </h2>
                </Link>
                <p
                  className="hd-font-body text-base leading-relaxed"
                  style={{ color: isVisualDarkroom ? 'rgba(242,239,231,0.8)' : 'var(--hd-fg-secondary)' }}
                >
                  {featuredStory.excerpt}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span
                    className="hd-font-sans text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: isVisualDarkroom ? '#A39B8B' : 'var(--hd-fg-muted)' }}
                  >
                    BY {featuredStory.bylineDisplay} · {featuredStory.readingTimeMinutes} MIN
                  </span>
                  <Link
                    href={resolveCanonicalStoryUrl(featuredStory)}
                    className="hd-font-sans inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase"
                    style={{ color: isVisualDarkroom ? '#D8C3A5' : 'var(--hd-copper)' }}
                  >
                    <span>Read Feature</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Department-Specific Data Graphic Highlight for Data Journalism */}
      {config.layoutVariant === 'cartographic_data' && featuredStory?.dataVisualization && (
        <section className="w-full px-4 sm:px-8 lg:px-14 py-12 border-b" style={{ borderColor: 'var(--hd-rule)' }}>
          <div className="max-w-[1160px] mx-auto">
            <EditorialDataGraphic spec={featuredStory.dataVisualization} />
          </div>
        </section>
      )}

      {/* Latest Edition Articles, Daily Dispatches & Historical Archive */}
      <section className="w-full px-4 sm:px-8 lg:px-14 py-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-14">
            {/* Current Edition Articles */}
            <div className="space-y-6">
              <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                  Published in Current Edition
                </h2>
                <span className="hd-folio-meta">{currentEditionStories.length} STORIES</span>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {currentEditionStories.map((st) => (
                  <article key={st.id} className="py-6 space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div className="flex items-center justify-between">
                      <span className="hd-kicker">{st.dateline}</span>
                      <span className="hd-folio-meta">{st.readingTimeMinutes} MIN READ</span>
                    </div>
                    <Link href={resolveCanonicalStoryUrl(st)} className="block group">
                      <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold group-hover:underline underline-offset-4" style={{ color: 'var(--hd-fg)' }}>
                        {st.title}
                      </h3>
                    </Link>
                    <p className="hd-font-body text-sm sm:text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {st.subtitle}
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <Link href={HD_ROUTES.journalistPortfolio(st.journalistSlug)} className="hd-folio-meta hover:underline">
                        BY {st.bylineDisplay}
                      </Link>
                      <Link href={resolveCanonicalStoryUrl(st)} className="hd-kicker hover:underline">
                        Open Article →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Department Daily Dispatches */}
            {dailyDispatches.length > 0 && (
              <div className="space-y-6">
                <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    Latest from Daily Dispatch
                  </h2>
                  <Link href={HD_ROUTES.dailyDispatch} className="hd-kicker hover:underline">
                    All Daily Dispatches →
                  </Link>
                </div>
                <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {dailyDispatches.map((dd) => (
                    <article key={dd.id} className="py-5 space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
                      <span className="hd-folio-meta block">
                        {dd.publishedAt} &nbsp;·&nbsp; {dd.bureauLabel}
                      </span>
                      <Link href={HD_ROUTES.dailyDispatchArticle(dd.slug)} className="block group">
                        <h3 className="hd-font-display text-2xl font-semibold group-hover:underline underline-offset-4" style={{ color: 'var(--hd-fg)' }}>
                          {dd.headline}
                        </h3>
                      </Link>
                      <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {dd.standfirst}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Historical / Archival Edition Stories */}
            <div className="space-y-4">
              <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                  Archival &amp; Forthcoming Slate
                </h2>
                <Link href={HD_ROUTES.archive} className="hd-folio-meta hover:underline">
                  Edition Archive →
                </Link>
              </div>

              {historicalStories.map((st) => (
                <div key={st.id} className="p-5 border space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
                  <span className="hd-folio-meta">{st.editionLabel} · ARCHIVED</span>
                  <Link href={resolveCanonicalStoryUrl(st)} className="block">
                    <h3 className="hd-font-display text-2xl font-semibold hover:underline">{st.title}</h3>
                  </Link>
                  <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                    {st.excerpt}
                  </p>
                </div>
              ))}

              {forthcomingPreviews.map((pr) => (
                <div
                  key={pr.id}
                  className="p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
                >
                  <div>
                    <span className="hd-kicker text-[10px]">FORTHCOMING IN ISSUE 02</span>
                    <h3 className="hd-font-display text-2xl font-semibold">{pr.workingTitle}</h3>
                    <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                      {pr.synopsis}
                    </p>
                  </div>
                  <span className="hd-folio-meta shrink-0">{pr.publicStageLabel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Verified Contributors, Relevant Editions & Guidelines */}
          <aside className="lg:col-span-4 space-y-10">
            <div
              className="p-6 border space-y-4"
              style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <p className="hd-kicker">SUBMISSION GUIDELINES</p>
              <ul className="space-y-3 hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                {config.submissionGuidelines.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <Link href={HD_ROUTES.contributorGuidelines} className="hd-kicker inline-block pt-1 hover:underline">
                Full Contributor Stylebook →
              </Link>
            </div>

            <div className="space-y-4">
              <p className="hd-kicker">VERIFIED CONTRIBUTORS IN DEPARTMENT</p>
              <ul className="divide-y border-t border-b" style={{ borderColor: 'var(--hd-rule)' }}>
                {contributors.map((j) => (
                  <li key={j.slug} className="py-3.5" style={{ borderColor: 'var(--hd-rule)' }}>
                    <Link href={HD_ROUTES.journalistPortfolio(j.slug)} className="group block">
                      <span className="hd-font-display text-xl font-semibold group-hover:underline block" style={{ color: 'var(--hd-fg)' }}>
                        {j.name}
                      </span>
                      <span className="hd-folio-meta block">{j.roleTitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="hd-kicker">RELEVANT MAGAZINE EDITIONS</p>
              <ul className="space-y-2">
                {editions.map((ed) => (
                  <li key={ed.id}>
                    <Link
                      href={HD_ROUTES.issue(toCanonicalIssueSlug(ed.slug))}
                      className="hd-font-body text-sm hover:underline block"
                      style={{ color: 'var(--hd-fg-secondary)' }}
                    >
                      • {ed.volumeLabel} — {ed.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-folio-meta">ALL EDITORIAL DEPARTMENTS</p>
              <div className="flex flex-col gap-1.5">
                {FOOTER_DEPARTMENT_LINKS.map((dl) => (
                  <Link
                    key={dl.href}
                    href={dl.href}
                    className="hd-font-body text-sm hover:underline"
                    style={{
                      color:
                        dl.href === HD_ROUTES.department(config.routeSlug)
                          ? 'var(--hd-copper)'
                          : 'var(--hd-fg-muted)',
                    }}
                  >
                    {dl.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Embedded Department Commissioning & Pitch Mechanism */}
      <section
        className="w-full border-t"
        style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
      >
        <PitchDeskClient
          departments={scopedDepartments.length > 0 ? scopedDepartments : EDITORIAL_DEPARTMENTS}
        />
      </section>
    </div>
  );
}
