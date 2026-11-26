import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { CorrespondentApplicationClient } from '@/components/himalayan-dispatch/CorrespondentApplicationClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Correspondent Applications — Regional & District Reporting | Himalayan Dispatch',
  description:
    'Apply for accreditation as a Regional or District Environmental Correspondent across Himalayan Dispatch’s six Western Himalayan reporting desks.',
  canonicalPath: '/himalayan-dispatch/correspondent-applications',
});

export default function CorrespondentApplicationsPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto space-y-14">
        <EditorialBreadcrumbs
          items={[
            { label: 'Join the Newsroom', href: HD_ROUTES.joinNewsroom },
            { label: 'Correspondent Applications' },
          ]}
        />

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b items-start" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          <div className="lg:col-span-7 space-y-4">
            <p className="hd-kicker">DISTRIBUTED REGIONAL CORRESPONDENCE</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Correspondent Applications
            </h1>
            <p
              className="hd-font-body text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Himalayan Dispatch recruits independent District Correspondents and Regional
              Environmental Reporters grounded in local languages, terrain knowledge, and rigorous
              documentary verification across all six Western Himalayan reporting bureaus.
            </p>
          </div>

          <aside
            className="lg:col-span-5 p-6 border space-y-3"
            style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
          >
            <p className="hd-kicker">BUREAU RECRUITMENT PRIORITY MATRIX</p>
            <ul className="divide-y text-sm hd-font-body" style={{ borderColor: 'var(--hd-rule)' }}>
              {REGIONAL_REPORTING_BUREAUS.map((b) => (
                <li key={b.id} className="py-2 flex items-center justify-between gap-2" style={{ borderColor: 'var(--hd-rule)' }}>
                  <Link href={HD_ROUTES.bureau(b.id)} className="hover:underline font-medium">
                    {b.name}
                  </Link>
                  <span className="hd-folio-meta text-[10px]">
                    {b.operationalStatus === 'in_establishment'
                      ? 'Priority Desk Formation'
                      : 'District Roster Open'}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </header>

        <CorrespondentApplicationClient />
      </div>
    </div>
  );
}
