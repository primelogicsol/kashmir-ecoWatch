import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import {
  DEPARTMENT_ROUTE_CONFIG,
  DepartmentRouteSlug,
  HD_ROUTES,
} from '@/lib/himalayan-dispatch-routes';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { ContributorReadinessChecklistClient } from '@/components/himalayan-dispatch/ContributorReadinessChecklistClient';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contributor Guidelines & Stylebook — Himalayan Dispatch',
  description:
    'Editorial submission guidelines, department specifications, primary-source fact-checking dossier standards, documentary photography rules, and contributor terms for Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/contributor-guidelines',
});

export default function ContributorGuidelinesPage() {
  const deptSlugs = Object.keys(DEPARTMENT_ROUTE_CONFIG) as DepartmentRouteSlug[];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Join the Newsroom', href: HD_ROUTES.joinNewsroom },
            { label: 'Contributor Guidelines' },
          ]}
        />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">STYLEBOOK &amp; SUBMISSION PROTOCOL</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Contributor Guidelines
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Himalayan Dispatch welcomes story pitches and visual portfolios from environmental
            journalists, mountain photographers, scientists, and regional writers committed to
            primary-source accuracy and literary clarity.
          </p>
        </header>

        {/* Department Format & Scope Matrix */}
        <section className="space-y-6">
          <h2 className="hd-font-display text-3xl font-semibold border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            I. Specifications by Editorial Department
          </h2>
          <div className="divide-y border-b" style={{ borderColor: 'var(--hd-rule)' }}>
            {deptSlugs.map((slug) => {
              const cfg = DEPARTMENT_ROUTE_CONFIG[slug];
              return (
                <div key={slug} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="md:col-span-3">
                    <Link href={HD_ROUTES.department(slug)} className="hd-font-display text-2xl font-semibold hover:underline">
                      {cfg.name}
                    </Link>
                  </div>
                  <div className="md:col-span-3">
                    <span className="hd-folio-meta">{cfg.wordCountGuide}</span>
                  </div>
                  <div className="md:col-span-6">
                    <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {cfg.editorialMandate}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Verification, Photography & Engagement Terms */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">II · STAGE 04 FACT-CHECKING BINDER</p>
            <h3 className="hd-font-display text-2xl font-semibold">Primary-Source Annotation</h3>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Accepted manuscripts must be accompanied by an annotated source list linking every
              empirical figure, historical date, statutory order, and direct quotation to field
              recordings, published studies, or official documents.
            </p>
          </div>

          <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">III · DOCUMENTARY PLATE INTEGRITY</p>
            <h3 className="hd-font-display text-2xl font-semibold">Zero Digital Fabrication</h3>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Standard darkroom tonal balance and monochrome conversion are permitted. Cloning,
              object removal/addition, staged wildlife distress, and synthetic or composite digital
              imagery are grounds for permanent contributor disqualification.
            </p>
          </div>

          <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <p className="hd-kicker">IV · ENGAGEMENT &amp; RIGHTS</p>
            <h3 className="hd-font-display text-2xl font-semibold">Independent Contributor Terms</h3>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Contributors participate as independent writers, fellows, or per-commission authors
              (non-employment affiliation) and retain underlying moral authorship subject to{' '}
              <Link href={HD_ROUTES.rightsPermissions} className="underline">
                Rights &amp; Permissions
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Interactive Readiness Audit */}
        <ContributorReadinessChecklistClient />
      </div>
    </div>
  );
}
