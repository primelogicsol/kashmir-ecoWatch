import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Ethics & Governance — Journalistic Conduct & Conflict Rules | Himalayan Dispatch',
  description:
    'Institutional ethics, conflict-of-interest disclosures, field reporting conduct in mountain communities, and financial firewall policies of Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/ethics-governance',
});

export default function EthicsGovernancePage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1340px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.imprint },
            { label: 'Ethics & Governance' },
          ]}
        />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">STANDARDS OF CONDUCT &amp; INSTITUTIONAL FIREWALL</p>
          <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
            Ethics &amp; Governance
          </h1>
          <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Guided by recognized international journalism reference frameworks—including the core
            principles of truth-seeking, harm minimization, independence, and public accountability—
            without claiming external accreditation or third-party membership where none has been
            sought.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              kicker: 'ARTICLE I · CONFLICTS OF INTEREST & DISINTERESTEDNESS',
              title: 'Mandatory Disclosure & Recusal',
              body: 'Editors, correspondents, photographers, and scientific reviewers may not report on or review projects, NGOs, litigation, or commercial enterprises in which they or immediate family members hold financial, consultancy, or governance stakes.',
            },
            {
              kicker: 'ARTICLE II · PROHIBITION ON INDUCEMENTS & SPONSORED TRAVEL',
              title: 'No Paid-For Coverage',
              body: 'Himalayan Dispatch accepts zero payment, hospitality, or project-developer travel subsidies in exchange for editorial coverage. Any fellowship or philanthropic grant supporting a reporting series is disclosed transparently at the foot of the work.',
            },
            {
              kicker: 'ARTICLE III · DIGNITY IN MOUNTAIN & RURAL COMMUNITIES',
              title: 'Informed Consent & Cultural Respect',
              body: 'Correspondents identify themselves clearly as journalists for Himalayan Dispatch when interviewing villagers, shepherds, artisans, and officials, explaining that publication reaches a global digital readership.',
            },
            {
              kicker: 'ARTICLE IV · RIGHT OF REPLY & FAIR PORTRAYAL',
              title: 'Pre-Publication Opportunity to Respond',
              body: 'Whenever an article levels significant factual criticism at a named agency, official, enterprise, or researcher, the desk makes documented, good-faith efforts to seek and accurately reflect their substantive response prior to publication.',
            },
          ].map((art) => (
            <section key={art.kicker} className="p-8 border space-y-3" style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}>
              <span className="hd-kicker">{art.kicker}</span>
              <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">{art.title}</h2>
              <p className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {art.body}
              </p>
            </section>
          ))}
        </div>

        <div className="pt-6 border-t flex flex-wrap gap-6" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <Link href={HD_ROUTES.readerComplaints} className="hd-kicker hover:underline">
            File a Formal Reader Complaint →
          </Link>
          <Link href={HD_ROUTES.publicEditor} className="hd-kicker hover:underline">
            Petition the Public Editor →
          </Link>
          <a href={toKewPlatformUrl('/about/governance')} className="hd-folio-meta hover:underline">
            KEW Platform Institutional Governance →
          </a>
        </div>
      </div>
    </div>
  );
}
