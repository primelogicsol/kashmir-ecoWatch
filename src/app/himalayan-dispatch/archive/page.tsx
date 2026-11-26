import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicDailyDispatches,
  getPublicEditions,
} from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import {
  HD_ROUTES,
  toCanonicalIssueSlug,
} from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Edition Archive — Himalayan Dispatch',
  description:
    'Browse the complete edition archive of Himalayan Dispatch: inaugural covers, founding monographs, forthcoming volumes, and the Daily Dispatch chronological archive.',
  canonicalPath: '/himalayan-dispatch/archive',
});

export default function HimalayanDispatchArchivePage() {
  const editions = getPublicEditions();
  const dailyCount = getPublicDailyDispatches().length;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-14">
        <EditorialBreadcrumbs items={[{ label: 'Edition Archive' }]} />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">THE PERMANENT FOLIO</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Edition Archive
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Every issue of Himalayan Dispatch is conceived as a collectible volume rather than an
              ephemeral feed—preserved intact at its permanent archival URL with its cover inquiry,
              visual plates, and editorial notes.
            </p>
          </div>

          <aside
            className="lg:col-span-4 p-6 border space-y-2.5"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">STREAM 01 ARCHIVE</p>
            <h2 className="hd-font-display text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
              Daily Dispatch Ledger ({dailyCount})
            </h2>
            <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
              Inspect the chronological index of continuous bureau and beat dispatches.
            </p>
            <Link
              href={HD_ROUTES.dailyDispatchArchive}
              className="hd-kicker inline-flex items-center gap-1.5 pt-1 hover:underline"
            >
              <span>Open Daily Dispatch Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </aside>
        </header>

        <div className="space-y-16">
          {editions.map((ed) => {
            const targetHref =
              ed.status === 'forthcoming'
                ? HD_ROUTES.forthcoming
                : HD_ROUTES.issue(toCanonicalIssueSlug(ed.slug));

            return (
              <article
                key={ed.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-12 border-t items-center"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                <div className="lg:col-span-6">
                  <Link href={targetHref} className="hd-plate-group block">
                    <div className="hd-plate-frame aspect-[16/10] w-full">
                      <img
                        src={ed.coverImage}
                        alt={ed.coverCaption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="hd-kicker">{ed.issueNumberLabel}</span>
                    <span style={{ color: 'var(--hd-stone)' }}>·</span>
                    <span className="hd-folio-meta">{ed.volumeLabel}</span>
                  </div>

                  <Link href={targetHref} className="block group">
                    <h2
                      className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.03] group-hover:underline underline-offset-4"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {ed.title}
                    </h2>
                  </Link>

                  <p
                    className="hd-font-body text-base sm:text-lg leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {ed.subtitle}
                  </p>

                  <p className="hd-folio-meta">
                    {ed.publicationDateLabel} &nbsp;·&nbsp; {ed.coverLocation}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href={targetHref}
                      className="hd-font-sans inline-flex items-center gap-2.5 px-5 py-3 border text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                      style={{
                        borderColor: 'var(--hd-rule-strong)',
                        color: 'var(--hd-fg)',
                        backgroundColor: 'var(--hd-bg-elevated)',
                      }}
                    >
                      <span>
                        {ed.status === 'forthcoming'
                          ? 'Inspect Forthcoming Slate'
                          : 'Open Complete Edition'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                    </Link>

                    {ed.status === 'current' && (
                      <Link href={HD_ROUTES.currentIssue} className="hd-kicker hover:underline">
                        Current Issue Experience →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
