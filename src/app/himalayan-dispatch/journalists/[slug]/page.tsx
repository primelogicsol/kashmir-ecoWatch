import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Lock } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicDailyDispatches,
  getPublicJournalistPortfolio,
} from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import {
  HD_ROUTES,
  resolveCanonicalStoryUrl,
} from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = getPublicJournalistPortfolio(slug);
  if (!portfolio) {
    return buildPageMetadata({
      title: 'Journalist Not Found — Himalayan Dispatch',
      description: 'Requested journalist portfolio was not found.',
      canonicalPath: `/himalayan-dispatch/journalists/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${portfolio.journalist.name} — Journalist Portfolio | Himalayan Dispatch`,
    description: portfolio.journalist.shortBio,
    canonicalPath: `/himalayan-dispatch/journalists/${portfolio.journalist.slug}`,
    imagePath: portfolio.journalist.portraitUrl,
  });
}

export default async function JournalistPortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolio = getPublicJournalistPortfolio(slug);
  if (!portfolio) {
    notFound();
  }

  const { journalist, publishedStories, approvedUpcomingAssignments } = portfolio;
  const dailyDispatches = getPublicDailyDispatches().filter(
    (d) => d.journalistSlug === journalist.slug || d.bylineDisplay === journalist.name
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-14">
        <EditorialBreadcrumbs
          items={[
            { label: 'Journalists & Portfolios', href: HD_ROUTES.journalists },
            { label: journalist.name },
          ]}
        />

        {/* Asymmetric Author Portrait & Literary Dossier */}
        <header
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-4">
            <div className="aspect-[4/5] w-full overflow-hidden bg-[#171717]">
              <img
                src={journalist.portraitUrl}
                alt={journalist.name}
                className="w-full h-full object-cover grayscale contrast-110"
              />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="hd-kicker">{journalist.roleTitle}</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              {journalist.name}
            </h1>
            <p className="hd-folio-meta">
              BEAT: {journalist.beat} &nbsp;·&nbsp; BASED IN {journalist.basedIn}
            </p>

            <div className="hd-prose pt-2">
              {journalist.extendedBio.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                  {p}
                </p>
              ))}
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div>
                <p className="hd-kicker mb-1.5">REPORTING LANGUAGES</p>
                <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {journalist.languages.join(' · ')}
                </p>
              </div>
              <div>
                <p className="hd-kicker mb-1.5">FELLOWSHIPS &amp; CITATIONS</p>
                <ul className="space-y-1">
                  {journalist.awardsAndFellowships.map((a) => (
                    <li key={a} className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {journalist.pgpFingerprintNote && (
              <div
                className="p-4 border-l-2 flex items-start gap-3"
                style={{
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <Lock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                  {journalist.pgpFingerprintNote}
                </p>
              </div>
            )}
          </div>
        </header>

        {/* Published Magazine Stories */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
            <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Published Edition Stories
            </h2>
            <span className="hd-folio-meta">{publishedStories.length} IN ARCHIVE</span>
          </div>

          <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
            {publishedStories.map((st) => {
              const storyUrl = resolveCanonicalStoryUrl(st);
              return (
                <article
                  key={st.id}
                  className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <Link
                    href={storyUrl}
                    className="md:col-span-4 hd-plate-group block"
                  >
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
                  <div className="md:col-span-8 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="hd-kicker">{st.departmentRubric}</span>
                      <span className="hd-folio-meta">{st.editionLabel}</span>
                    </div>
                    <Link href={storyUrl} className="block group">
                      <h3
                        className="hd-font-display text-2xl sm:text-4xl font-semibold leading-tight group-hover:underline underline-offset-4"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {st.title}
                      </h3>
                    </Link>
                    <p className="hd-font-body text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {st.excerpt}
                    </p>
                    <Link
                      href={storyUrl}
                      className="hd-kicker inline-flex items-center gap-1.5 pt-1"
                    >
                      <span>Read Story ({st.readingTimeMinutes} min)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Published Daily Dispatches */}
        {dailyDispatches.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-baseline justify-between border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
              <h2 className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Filed Daily Dispatches
              </h2>
              <span className="hd-folio-meta">{dailyDispatches.length} DISPATCHES</span>
            </div>

            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {dailyDispatches.map((dd) => (
                <div key={dd.id} className="py-5 space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <span className="hd-folio-meta block">
                    {dd.publishedAt} &nbsp;·&nbsp; {dd.bureauLabel} &nbsp;·&nbsp; {dd.beatTitle}
                  </span>
                  <Link
                    href={HD_ROUTES.dailyDispatchArticle(dd.slug)}
                    className="hd-font-display text-2xl sm:text-3xl font-semibold hover:underline underline-offset-4 block"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {dd.headline}
                  </Link>
                  <p className="hd-font-body text-sm sm:text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {dd.standfirst}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Editorially Approved Upcoming Assignments */}
        <section
          className="p-8 sm:p-10 border space-y-6"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
            <div>
              <p className="hd-kicker">FORTHCOMING SLATE</p>
              <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                Approved Upcoming Assignments
              </h2>
            </div>
            <span className="hd-folio-meta">CONFIDENTIAL INVESTIGATIONS OMITTED</span>
          </div>

          {approvedUpcomingAssignments.length > 0 ? (
            <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
              {approvedUpcomingAssignments.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="space-y-1">
                    <span className="hd-folio-meta">
                      {item.departmentLabel} &nbsp;·&nbsp; {item.region}
                    </span>
                    <h3 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {item.workingTitle}
                    </h3>
                    <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                      {item.synopsis}
                    </p>
                  </div>
                  <span
                    className="hd-font-sans shrink-0 px-3 py-1 border text-[10px] font-semibold tracking-[0.16em] uppercase"
                    style={{
                      borderColor: 'var(--hd-copper)',
                      color: 'var(--hd-copper)',
                    }}
                  >
                    {item.publicStageLabel}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="hd-font-body text-sm italic" style={{ color: 'var(--hd-fg-muted)' }}>
              No publicly cleared pre-publication assignments are currently listed on the open slate
              for this correspondent. Sensitive or embargoed reporting remains undisclosed until
              publication.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
