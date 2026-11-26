import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDepartmentDossier } from '@/lib/himalayan-dispatch-store';
import {
  DEPARTMENT_ROUTE_CONFIG,
  DepartmentRouteSlug,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
  resolveLegacyDeptQueryToSlug,
} from '@/lib/himalayan-dispatch-routes';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Departments — Himalayan Dispatch',
  description:
    'Explore the seven dedicated editorial departments of Himalayan Dispatch: Cover Stories, Longform Features, Field Reports, Investigative Desk, The Visual Journal, Data Journalism, and Interviews & Editorials.',
  canonicalPath: '/himalayan-dispatch/departments',
});

export default async function HimalayanDispatchDepartmentsDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ dept?: string }>;
}) {
  const sp = await searchParams;
  if (sp?.dept) {
    const resolved = resolveLegacyDeptQueryToSlug(sp.dept);
    if (resolved) {
      permanentRedirect(HD_ROUTES.department(resolved));
    }
  }

  const departmentSlugs = Object.keys(DEPARTMENT_ROUTE_CONFIG) as DepartmentRouteSlug[];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-14">
        <EditorialBreadcrumbs items={[{ label: 'Editorial Departments' }]} />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">SEVEN DEDICATED EDITORIAL ROOMS</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Editorial Departments &amp; Literary Forms
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Every department in Himalayan Dispatch occupies its own dedicated editorial landing
            page, format grammar, contributor roster, and commissioning mechanism—connected to our
            unified Western Himalayan publication archive.
          </p>
        </header>

        <div
          className="divide-y border-t border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          {departmentSlugs.map((slug) => {
            const dossier = getPublicDepartmentDossier(slug);
            if (!dossier) return null;
            const { config, featuredStory, allStories, dailyDispatches } = dossier;
            const deptHref = HD_ROUTES.department(slug);

            return (
              <section
                key={slug}
                className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <div className="lg:col-span-5 space-y-3">
                  <span className="hd-kicker">{config.kicker}</span>
                  <Link href={deptHref} className="block group">
                    <h2
                      className="hd-font-display text-3xl sm:text-5xl font-semibold group-hover:underline underline-offset-4"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {config.name}
                    </h2>
                  </Link>
                  <p className="hd-font-display text-lg italic" style={{ color: 'var(--hd-copper)' }}>
                    {config.tagline}
                  </p>
                  <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {config.editorialMandate}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-5">
                    <Link
                      href={deptHref}
                      className="hd-font-sans inline-flex items-center gap-2 px-4 py-2.5 border text-[11px] font-semibold tracking-[0.18em] uppercase"
                      style={{
                        borderColor: 'var(--hd-rule-strong)',
                        color: 'var(--hd-fg)',
                        backgroundColor: 'var(--hd-bg-elevated)',
                      }}
                    >
                      <span>Enter {config.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                    </Link>
                    <span className="hd-folio-meta">
                      {allStories.length + dailyDispatches.length} PUBLISHED DISPATCHES
                    </span>
                  </div>
                </div>

                {featuredStory && (
                  <div className="lg:col-span-7 lg:border-l lg:pl-12 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center" style={{ borderColor: 'var(--hd-rule)' }}>
                    <Link
                      href={resolveCanonicalStoryUrl(featuredStory)}
                      className="sm:col-span-5 hd-plate-group block"
                    >
                      <div className="hd-plate-frame aspect-[16/10] w-full">
                        <img
                          src={featuredStory.heroImage}
                          alt={featuredStory.heroCaption}
                          className={`w-full h-full object-cover ${
                            featuredStory.heroMonochrome ? 'grayscale contrast-125' : ''
                          }`}
                        />
                      </div>
                    </Link>
                    <div className="sm:col-span-7 space-y-2">
                      <span className="hd-folio-meta">LEAD FEATURE IN DEPARTMENT</span>
                      <Link href={resolveCanonicalStoryUrl(featuredStory)} className="block group">
                        <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug group-hover:underline underline-offset-4" style={{ color: 'var(--hd-fg)' }}>
                          {featuredStory.title}
                        </h3>
                      </Link>
                      <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                        By {featuredStory.bylineDisplay} · {featuredStory.readingTimeMinutes} min read
                      </p>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
