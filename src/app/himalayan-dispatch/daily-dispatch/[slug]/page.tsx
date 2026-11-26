import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  getPublicDailyDispatchBySlug,
  getPublicDailyDispatches,
} from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import {
  CANONICAL_DISPATCH_URL,
  DEPARTMENT_ID_TO_ROUTE_SLUG,
  DISPATCH_IDENTITY,
  HD_ROUTES,
  toDispatchCanonicalUrl,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return getPublicDailyDispatches().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublicDailyDispatchBySlug(slug);
  if (!article) {
    return buildPageMetadata({
      title: 'Dispatch Not Found — Himalayan Dispatch',
      description: 'Requested Daily Dispatch record was not found.',
      canonicalPath: `/himalayan-dispatch/daily-dispatch/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${article.headline} — Daily Dispatch | Himalayan Dispatch`,
    description: article.standfirst,
    canonicalPath: HD_ROUTES.dailyDispatchArticle(article.slug),
    ogType: 'article',
    imagePath: article.heroImage,
    publishedTime: article.publishedAt,
    authors: [article.bylineDisplay],
  });
}

export default async function DailyDispatchArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getPublicDailyDispatchBySlug(slug);
  if (!article) {
    notFound();
  }

  const all = getPublicDailyDispatches().filter((x) => x.slug !== article.slug).slice(0, 3);
  const deptSlug = DEPARTMENT_ID_TO_ROUTE_SLUG[article.departmentId];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.standfirst,
    datePublished: article.publishedAt,
    image: [`${CANONICAL_DISPATCH_URL}${article.heroImage}`],
    author: {
      '@type': 'Person',
      name: article.bylineDisplay,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      '@id': `${CANONICAL_DISPATCH_URL}/#organization`,
      name: DISPATCH_IDENTITY.officialName,
      url: DISPATCH_IDENTITY.canonicalHomepageUrl,
    },
    mainEntityOfPage: toDispatchCanonicalUrl(HD_ROUTES.dailyDispatchArticle(article.slug)),
  };

  return (
    <article className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <JsonLd id={`hd-dd-${article.slug}`} data={jsonLd} />
      <div className="max-w-[1280px] mx-auto space-y-12">
        <EditorialBreadcrumbs
          items={[
            { label: 'Daily Dispatch', href: HD_ROUTES.dailyDispatch },
            { label: article.bureauLabel, href: HD_ROUTES.bureau(article.bureauId) },
            { label: article.headline.slice(0, 44) + (article.headline.length > 44 ? '…' : '') },
          ]}
        />

        {/* Header */}
        <header
          className="space-y-6 pb-10 border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Link href={HD_ROUTES.bureau(article.bureauId)} className="hd-kicker hover:underline">
              {article.dateline}
            </Link>
            <span style={{ color: 'var(--hd-stone)' }}>·</span>
            <Link
              href={HD_ROUTES.reportingBeat(article.beatSlug)}
              className="hd-folio-meta hover:underline"
            >
              {article.beatTitle}
            </Link>
          </div>

          <h1
            className="hd-font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03] max-w-4xl"
            style={{ color: 'var(--hd-fg)' }}
          >
            {article.headline}
          </h1>

          <p
            className="hd-font-display text-xl sm:text-2xl italic leading-relaxed max-w-3xl"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            {article.standfirst}
          </p>

          <div
            className="pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <div className="space-y-1">
              <p className="hd-font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                BY{' '}
                {article.journalistSlug ? (
                  <Link
                    href={HD_ROUTES.journalistPortfolio(article.journalistSlug)}
                    className="underline underline-offset-4"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    {article.bylineDisplay}
                  </Link>
                ) : (
                  article.bylineDisplay
                )}
              </p>
              <p className="hd-folio-meta">
                PUBLISHED {article.publishedAt} &nbsp;·&nbsp; {article.readingTimeMinutes} MIN READ
              </p>
            </div>

            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] hd-font-sans tracking-[0.15em] uppercase"
              style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
              <span>{article.factCheckedBy}</span>
            </div>
          </div>

          <figure className="space-y-2.5 pt-2">
            <div className="aspect-[16/9] max-h-[64vh] w-full overflow-hidden bg-[#171717]">
              <img
                src={article.heroImage}
                alt={article.heroCaption}
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
              <span className="hd-font-body italic">{article.heroCaption}</span>
              <span className="hd-folio-meta">{article.heroCredit}</span>
            </figcaption>
          </figure>
        </header>

        {/* Body + Verification Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div
              className="p-6 border space-y-3"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-kicker">KEY VERIFIED FINDINGS</p>
              <ul className="space-y-2.5 hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                {article.keyFindings.map((kf, i) => (
                  <li key={i} className="leading-relaxed">
                    • {kf}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="p-5 border space-y-2.5"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <p className="hd-folio-meta">EMPIRICAL PROVENANCE</p>
              <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                {article.scientificSourceNote}
              </p>
              <a
                href={toKewPlatformUrl(article.relatedKewModule.href)}
                className="hd-kicker inline-flex items-center gap-1 pt-1"
              >
                <span>{article.relatedKewModule.label}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-2 pt-2">
              <p className="hd-folio-meta">RELATED DESTINATIONS</p>
              <div className="flex flex-col gap-2 text-sm hd-font-body">
                <Link href={HD_ROUTES.department(deptSlug)} className="hover:underline">
                  → Department: {article.departmentLabel}
                </Link>
                <Link href={HD_ROUTES.bureau(article.bureauId)} className="hover:underline">
                  → {article.bureauLabel}
                </Link>
                <Link href={HD_ROUTES.corrections} className="hover:underline">
                  → Corrections &amp; Clarifications Policy
                </Link>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 order-1 lg:order-2 space-y-8 max-w-[720px]">
            <div className="hd-prose">
              {article.paragraphs.map((p, idx) => (
                <p key={idx} className={idx === 0 ? 'hd-dropcap' : ''}>
                  {p}
                </p>
              ))}
            </div>

            {/* More from Daily Dispatch */}
            {all.length > 0 && (
              <section
                className="pt-10 border-t space-y-5"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                <p className="hd-kicker">RECENT DAILY DISPATCHES</p>
                <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                  {all.map((other) => (
                    <div key={other.id} className="py-4" style={{ borderColor: 'var(--hd-rule)' }}>
                      <span className="hd-folio-meta block">
                        {other.publishedAt} &nbsp;·&nbsp; {other.bureauLabel}
                      </span>
                      <Link
                        href={HD_ROUTES.dailyDispatchArticle(other.slug)}
                        className="hd-font-display text-2xl font-semibold hover:underline underline-offset-4 block mt-1"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {other.headline}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
