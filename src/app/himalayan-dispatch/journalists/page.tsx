import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicJournalistPortfolio,
  getPublicJournalists,
} from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Journalists & Correspondents — Himalayan Dispatch',
  description:
    'Meet the writers, investigative reporters, documentary mountain photographers, and cartographic editors of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/journalists',
});

export default function HimalayanDispatchJournalistsPage() {
  const journalists = getPublicJournalists();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-14">
        <EditorialBreadcrumbs items={[{ label: 'Journalists & Portfolios' }]} />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">CORRESPONDENTS &amp; VISUAL AUTHORS</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              The Journalists of Himalayan Dispatch
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Individual contributor folios chronicling published dispatches across the Western
              Himalayas alongside editorially approved upcoming commissions.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href={HD_ROUTES.joinNewsroom}
              className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
            >
              <span>Apply to Join the Newsroom</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <div
          className="divide-y border-t border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {journalists.map((j, idx) => {
            const portfolio = getPublicJournalistPortfolio(j.slug);
            const pubCount = portfolio?.publishedStories.length || 0;
            const upcomingCount = portfolio?.approvedUpcomingAssignments.length || 0;

            return (
              <article
                key={j.slug}
                className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <div className="lg:col-span-3">
                  <Link
                    href={HD_ROUTES.journalistPortfolio(j.slug)}
                    className="hd-plate-group block"
                  >
                    <div className="hd-plate-frame aspect-[4/4] w-full max-w-[260px]">
                      <img
                        src={j.portraitUrl}
                        alt={j.name}
                        className="w-full h-full object-cover grayscale contrast-110"
                      />
                    </div>
                  </Link>
                </div>

                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="hd-folio-meta">0{idx + 1}</span>
                    <span style={{ color: 'var(--hd-stone)' }}>·</span>
                    <span className="hd-kicker">{j.roleTitle}</span>
                  </div>

                  <Link
                    href={HD_ROUTES.journalistPortfolio(j.slug)}
                    className="block group"
                  >
                    <h2
                      className="hd-font-display text-3xl sm:text-5xl font-semibold group-hover:underline underline-offset-4"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {j.name}
                    </h2>
                  </Link>

                  <p className="hd-folio-meta">
                    BEAT: {j.beat} &nbsp;·&nbsp; BASED IN {j.basedIn}
                  </p>

                  <p
                    className="hd-font-body text-base sm:text-lg leading-relaxed pt-1"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {j.shortBio}
                  </p>
                </div>

                <div
                  className="lg:col-span-3 lg:border-l lg:pl-8 space-y-4"
                  style={{ borderColor: 'var(--hd-rule)' }}
                >
                  <div className="space-y-1">
                    <div
                      className="hd-font-display text-3xl font-semibold"
                      style={{ color: 'var(--hd-copper)' }}
                    >
                      {pubCount} Published {pubCount === 1 ? 'Story' : 'Stories'}
                    </div>
                    <p className="hd-folio-meta">
                      {upcomingCount > 0
                        ? `${upcomingCount} Approved Upcoming Commission`
                        : 'Active Desk Correspondent'}
                    </p>
                  </div>

                  <Link
                    href={HD_ROUTES.journalistPortfolio(j.slug)}
                    className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    <span>Open Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
