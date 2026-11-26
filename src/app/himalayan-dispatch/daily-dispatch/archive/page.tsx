import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDailyDispatches } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Daily Dispatch Archive — Chronological Environmental Ledger | Himalayan Dispatch',
  description:
    'Complete chronological archive of published Himalayan Dispatch daily environmental dispatches across the Western Himalayas.',
  canonicalPath: '/himalayan-dispatch/daily-dispatch/archive',
});

export default function DailyDispatchArchivePage() {
  const dispatches = getPublicDailyDispatches();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-12">
        <EditorialBreadcrumbs
          items={[
            { label: 'Daily Dispatch', href: HD_ROUTES.dailyDispatch },
            { label: 'Archive' },
          ]}
        />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">CHRONOLOGICAL DISPATCH LEDGER</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Daily Dispatch Archive
          </h1>
          <p
            className="hd-font-body text-lg leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Permanent archival index of verified environmental dispatches filed across our six
            Western Himalayan regional reporting desks. For collectible monthly magazine issues,
            visit the{' '}
            <Link href={HD_ROUTES.archive} className="underline underline-offset-4">
              Edition Archive
            </Link>
            .
          </p>
        </header>

        <div
          className="divide-y border-t border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {dispatches.map((d) => (
            <article
              key={d.id}
              className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="md:col-span-2 space-y-1">
                <span className="hd-folio-meta block">{d.publishedAt}</span>
                <Link
                  href={HD_ROUTES.bureau(d.bureauId)}
                  className="hd-kicker text-[10px] hover:underline"
                >
                  {d.bureauLabel}
                </Link>
              </div>

              <div className="md:col-span-8 space-y-2">
                <Link
                  href={HD_ROUTES.dailyDispatchArticle(d.slug)}
                  className="block group"
                >
                  <h2
                    className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {d.headline}
                  </h2>
                </Link>
                <p className="hd-font-body text-sm sm:text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {d.standfirst}
                </p>
                <p className="hd-folio-meta">
                  BY {d.bylineDisplay} &nbsp;·&nbsp; BEAT: {d.beatTitle}
                </p>
              </div>

              <div className="md:col-span-2 md:text-right">
                <Link
                  href={HD_ROUTES.dailyDispatchArticle(d.slug)}
                  className="hd-kicker inline-flex items-center gap-1"
                >
                  <span>Open ({d.readingTimeMinutes}m)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
