import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Scientific Review & Empirical Methodology — Himalayan Dispatch',
  description:
    'Stage 05 Multidisciplinary Scientific Review protocol and specialist Earth-systems review council of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/scientific-review',
});

export default function ScientificReviewPolicyPage() {
  const { mastheadPositions } = getPublicDispatchBundle();
  const councilChair = mastheadPositions.find((p) => p.id === 'mp-v-01');
  const councilMembers = mastheadPositions.filter(
    (p) => p.sectionId === 'V_scientific_council' && p.isCouncilSpecialistRow
  );

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.imprint },
            { label: 'Scientific Review' },
          ]}
        />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">STAGE 05 · EMPIRICAL REVIEW PROTOCOL</p>
            <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
              Independent Scientific Review
            </h1>
            <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Every Himalayan Dispatch feature making hydrological, glaciological, ecological,
              chemical, or statistical claims undergoes Stage 05 empirical review prior to
              publication—preventing causal overstatement while preserving independent literary voice.
            </p>
          </div>

          {councilChair && (
            <aside
              className="lg:col-span-4 p-6 border space-y-2"
              style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <span className="hd-kicker">{councilChair.roleTitle}</span>
              <h2 className="hd-font-display text-2xl font-semibold italic">
                {councilChair.displayHolderName}
              </h2>
              <p className="hd-folio-meta">{councilChair.domainsRubric}</p>
            </aside>
          )}
        </header>

        {/* Scope & Boundaries of Journalistic Scientific Review */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              kicker: '01 · EMPIRICAL AUDIT',
              title: 'Units, Baselines & Physical Plausibility',
              body: 'Reviewers examine measurement units, satellite sensor limitations (cloud cover, spatial resolution, revisit intervals), hydrological baselines, and statistical smoothing.',
            },
            {
              kicker: '02 · UNCERTAINTY DISCLOSURE',
              title: 'Distinguishing Observation from Projection',
              body: 'Manuscripts must distinguish measured instrumental series from reanalysis estimates, model projections, and local oral testimony—honoring each without conflating them.',
            },
            {
              kicker: '03 · EDITORIAL FIREWALL',
              title: 'Reviewers Do Not Dictate Voice or Policy',
              body: 'Scientific reviewers audit empirical accuracy and methodological fairness; narrative framing, investigative accountability, and publication decisions remain with the Editors.',
            },
          ].map((item) => (
            <div key={item.kicker} className="p-6 border space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
              <span className="hd-kicker">{item.kicker}</span>
              <h2 className="hd-font-display text-2xl font-semibold">{item.title}</h2>
              <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {item.body}
              </p>
            </div>
          ))}
        </section>

        {/* 15 Specialist Disciplines Ledger */}
        <section className="space-y-6">
          <div className="pb-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <h2 className="hd-font-display text-3xl font-semibold">
              Multidisciplinary Scientific Review Council ({councilMembers.length} Specialist Chairs)
            </h2>
            <Link href={HD_ROUTES.editorialAppointments} className="hd-kicker hover:underline">
              Nominate External Reviewer →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l" style={{ borderColor: 'var(--hd-rule)' }}>
            {councilMembers.map((m) => (
              <div key={m.id} className="p-5 border-r border-b space-y-1.5" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
                <span className="hd-kicker text-[10px]">{m.domainsRubric}</span>
                <h3 className="hd-font-display text-2xl font-semibold italic">{m.displayHolderName}</h3>
                <p className="hd-folio-meta">{m.roleTitle}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
