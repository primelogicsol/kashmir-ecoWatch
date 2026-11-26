import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicReportingBeats } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Environmental Reporting Beats — Himalayan Dispatch',
  description:
    'Six specialized thematic reporting beats guiding Himalayan Dispatch commissions across cryosphere, lakes and wetlands, transboundary rivers, biodiversity, earth observation, and oral mountain memory.',
  canonicalPath: '/himalayan-dispatch/reporting-beats',
});

export default function ReportingBeatsDirectoryPage() {
  const beats = getPublicReportingBeats();

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-16">
        <EditorialBreadcrumbs items={[{ label: 'Reporting Beats' }]} />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">THEMATIC REPORTING ARCHITECTURE</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Environmental Reporting Beats
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Across all six Western Himalayan regional bureaus, Himalayan Dispatch organizes ongoing
            correspondent coverage around six disciplined scientific and literary reporting beats.
          </p>
        </header>

        <div
          className="divide-y border-t border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {beats.map((bt) => (
            <article
              key={bt.slug}
              className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="lg:col-span-5 space-y-3">
                <span className="hd-kicker">{bt.code}</span>
                <Link href={HD_ROUTES.reportingBeat(bt.slug)} className="block group">
                  <h2
                    className="hd-font-display text-3xl sm:text-4xl font-semibold group-hover:underline underline-offset-4"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {bt.title}
                  </h2>
                </Link>
                <p className="hd-folio-meta">LEAD DESK: {bt.leadEditorRole}</p>
                <p className="hd-font-body text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {bt.editorialMandate}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-5">
                  <Link
                    href={HD_ROUTES.reportingBeat(bt.slug)}
                    className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                  >
                    <span>Explore Beat &amp; Dispatches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={toKewPlatformUrl(bt.kewObservatoryHref)}
                    className="hd-folio-meta inline-flex items-center gap-1 hover:underline"
                  >
                    <span>{bt.kewObservatoryLabel}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div
                className="lg:col-span-7 lg:border-l lg:pl-12 space-y-3"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <p className="hd-kicker">STANDING INQUIRY QUESTIONS</p>
                <ul className="space-y-2.5 hd-font-body text-sm sm:text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {bt.keyQuestions.map((q, i) => (
                    <li key={i} className="leading-relaxed">
                      • {q}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
