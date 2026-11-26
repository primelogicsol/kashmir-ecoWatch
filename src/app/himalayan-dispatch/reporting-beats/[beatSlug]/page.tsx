import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicReportingBeatBySlug,
  getPublicReportingBeats,
} from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import {
  BureauRouteSlug,
  DepartmentRouteSlug,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return getPublicReportingBeats().map((b) => ({ beatSlug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ beatSlug: string }>;
}): Promise<Metadata> {
  const { beatSlug } = await params;
  const data = getPublicReportingBeatBySlug(beatSlug);
  if (!data) {
    return buildPageMetadata({
      title: 'Reporting Beat Not Found — Himalayan Dispatch',
      description: 'Requested reporting beat was not found.',
      canonicalPath: `/himalayan-dispatch/reporting-beats/${beatSlug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${data.beat.title} (${data.beat.code}) — Reporting Beat | Himalayan Dispatch`,
    description: data.beat.editorialMandate,
    canonicalPath: HD_ROUTES.reportingBeat(data.beat.slug),
  });
}

export default async function IndividualReportingBeatPage({
  params,
}: {
  params: Promise<{ beatSlug: string }>;
}) {
  const { beatSlug } = await params;
  const data = getPublicReportingBeatBySlug(beatSlug);
  if (!data) {
    notFound();
  }

  const { beat, stories, dailyDispatches } = data;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Reporting Beats', href: HD_ROUTES.reportingBeats },
            { label: beat.title },
          ]}
        />

        <header
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">{beat.code} · STANDING BEAT MANDATE</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              {beat.title}
            </h1>
            <p className="hd-font-body text-lg leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              {beat.editorialMandate}
            </p>
          </div>

          <aside
            className="lg:col-span-4 p-6 border space-y-3"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-kicker">BEAT GOVERNANCE &amp; SCIENCE LINK</p>
            <p className="hd-folio-meta">{beat.leadEditorRole}</p>
            <Link
              href={HD_ROUTES.department(beat.leadDepartmentSlug as DepartmentRouteSlug)}
              className="hd-font-body text-sm block hover:underline"
            >
              Primary Department →
            </Link>
            <a
              href={toKewPlatformUrl(beat.kewObservatoryHref)}
              className="hd-kicker inline-flex items-center gap-1 pt-1"
            >
              <span>{beat.kewObservatoryLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </aside>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {/* Daily Dispatches on this Beat */}
            <section className="space-y-4">
              <h2 className="hd-font-display text-3xl font-semibold border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                Daily Dispatches on This Beat ({dailyDispatches.length})
              </h2>
              {dailyDispatches.map((dd) => (
                <article key={dd.id} className="py-4 border-b space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <span className="hd-folio-meta">{dd.publishedAt} · {dd.bureauLabel}</span>
                  <Link href={HD_ROUTES.dailyDispatchArticle(dd.slug)} className="block group">
                    <h3 className="hd-font-display text-2xl font-semibold group-hover:underline">{dd.headline}</h3>
                  </Link>
                  <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {dd.standfirst}
                  </p>
                </article>
              ))}
            </section>

            {/* Magazine Stories on this Beat */}
            <section className="space-y-4">
              <h2 className="hd-font-display text-3xl font-semibold border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                Monthly Magazine Features ({stories.length})
              </h2>
              {stories.map((st) => (
                <article key={st.id} className="py-4 border-b space-y-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <span className="hd-kicker">{st.editionLabel}</span>
                  <Link href={resolveCanonicalStoryUrl(st)} className="block group">
                    <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold group-hover:underline">
                      {st.title}
                    </h3>
                  </Link>
                  <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {st.excerpt}
                  </p>
                </article>
              ))}
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
              <p className="hd-kicker">STANDING INQUIRY QUESTIONS</p>
              <ul className="space-y-2.5 hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                {beat.keyQuestions.map((q, i) => (
                  <li key={i}>• {q}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="hd-kicker">ACTIVE ACROSS REGIONAL BUREAUS</p>
              <div className="flex flex-wrap gap-2">
                {beat.coveredBureaus.map((bId) => (
                  <Link
                    key={bId}
                    href={HD_ROUTES.bureau(bId as BureauRouteSlug)}
                    className="px-3 py-1.5 border hd-folio-meta hover:underline"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    {bId.toUpperCase()} BUREAU
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <p className="hd-kicker">PITCH THIS BEAT</p>
              <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                Have primary field notes, archival maps, or scientific findings on {beat.title}?
              </p>
              <Link href={HD_ROUTES.pitch} className="hd-kicker inline-flex items-center gap-1 hover:underline">
                <span>Pitch the Commissioning Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
