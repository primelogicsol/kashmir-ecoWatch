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

        <header
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="lg:col-span-8 space-y-4">
            <p className="hd-kicker">V · EMPIRICAL &amp; INDEPENDENT SCIENTIFIC REVIEW</p>
            <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
              Multidisciplinary Scientific Review Council
            </h1>
            <p
              className="hd-font-body text-lg sm:text-xl leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              The council assesses scientific evidence, methodological accuracy, statistical
              uncertainty and technical interpretations without dictating literary voice or
              improperly influencing editorial conclusions.
            </p>
          </div>

          {councilChair && (
            <aside
              className="lg:col-span-4 p-6 border space-y-2"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <span className="hd-kicker">{councilChair.roleTitle}</span>
              <h2
                className="hd-font-display text-2xl font-semibold italic"
                style={{
                  color: councilChair.isFilledPublicly ? 'var(--hd-fg)' : 'var(--hd-fg-muted)',
                }}
              >
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
            <div
              key={item.kicker}
              className="p-6 border space-y-2.5"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <span className="hd-kicker">{item.kicker}</span>
              <h2 className="hd-font-display text-2xl font-semibold">{item.title}</h2>
              <p
                className="hd-font-body text-sm leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </section>

        {/* 16 Council Positions Ledger (Retaining Position | Name Column Headings) */}
        <section className="space-y-6">
          <div
            className="pb-3 border-b flex flex-wrap items-center justify-between gap-4"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <h2 className="hd-font-display text-3xl font-semibold">
              Council Roster ({(councilChair ? 1 : 0) + councilMembers.length} Designated Positions)
            </h2>
            <Link href={HD_ROUTES.editorialAppointments} className="hd-kicker hover:underline">
              Nominate External Reviewer →
            </Link>
          </div>

          <div
            className="overflow-x-auto border"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-recessed)',
                  }}
                >
                  <th scope="col" className="w-[58%] px-5 sm:px-6 py-3.5 hd-kicker">Position</th>
                  <th scope="col" className="w-[42%] px-5 sm:px-6 py-3.5 hd-kicker">Name</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {[...(councilChair ? [councilChair] : []), ...councilMembers].map((m) => (
                  <tr key={m.id} className="align-top">
                    <td className="px-5 sm:px-6 py-4">
                      <span className="hd-font-display text-xl sm:text-2xl font-semibold block">
                        {m.roleTitle}
                      </span>
                    </td>
                    <td className="px-5 sm:px-6 py-4">
                      <span
                        className={
                          m.isFilledPublicly
                            ? 'hd-font-display text-xl sm:text-2xl font-semibold italic'
                            : 'hd-font-body text-sm sm:text-base italic'
                        }
                        style={{
                          color: m.isFilledPublicly ? 'var(--hd-fg)' : 'var(--hd-fg-muted)',
                        }}
                      >
                        {m.displayHolderName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
