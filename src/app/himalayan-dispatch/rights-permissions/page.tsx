import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialInquiryFormClient } from '@/components/himalayan-dispatch/EditorialInquiryFormClient';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Rights, Licensing & Permissions — Himalayan Dispatch',
  description:
    'Copyright notice, contributor moral rights, documentary photography licensing, academic classroom use, and republication permissions for Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/rights-permissions',
});

export default function RightsPermissionsPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1340px] mx-auto space-y-16">
        <EditorialBreadcrumbs
          items={[
            { label: 'Publishing & Governance', href: HD_ROUTES.imprint },
            { label: 'Rights & Permissions' },
          ]}
        />

        <header className="max-w-3xl space-y-4">
          <p className="hd-kicker">INTELLECTUAL PROPERTY &amp; LICENSING</p>
          <h1 className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]">
            Rights &amp; Permissions
          </h1>
          <p className="hd-font-body text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Unlike raw environmental datasets published under Kashmir EcoWatch’s Open Data Catalog,
            original literary essays, commissioned investigations, and documentary photographs in
            Himalayan Dispatch are protected works requiring attribution and permission for
            republication.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <span className="hd-kicker">01 · LITERARY TEXT &amp; TRANSLATIONS</span>
            <h2 className="hd-font-display text-2xl font-semibold">Brief Quotation &amp; Syndication</h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Brief excerpts for critical review, scholarship, or news commentary are welcomed with
              clear attribution to the author and a canonical link to Himalayan Dispatch. Full-text
              republication or translation into Kashmiri, Urdu, Hindi, or other languages requires
              written clearance from our Rights &amp; Permissions Editor.
            </p>
          </div>

          <div className="p-6 border space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <span className="hd-kicker">02 · DOCUMENTARY PHOTOGRAPHS</span>
            <h2 className="hd-font-display text-2xl font-semibold">All Photographic Rights Reserved</h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Photographers retain underlying copyright to commissioned plates unless otherwise
              specified. No photograph from Himalayan Dispatch may be scraped for automated dataset
              harvesting, commercial advertising, or uncredited redistribution.
            </p>
          </div>

          <div className="p-6 border space-y-2.5" style={{ borderColor: 'var(--hd-rule)' }}>
            <span className="hd-kicker">03 · CLASSROOM &amp; KEW OPEN DATA</span>
            <h2 className="hd-font-display text-2xl font-semibold">Non-Commercial Educational Use</h2>
            <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
              Schools, universities, and eco-clubs may share direct links and assign readings
              freely. Underlying KEW public telemetry remains governed by{' '}
              <a href={toKewPlatformUrl('/open-data')} className="underline">
                KEW Open Data (CC BY 4.0)
              </a>
              .
            </p>
          </div>
        </section>

        <EditorialInquiryFormClient
          category="rights_permissions"
          kicker="RIGHTS & SYNDICATION DESK · AIMAN KOUL"
          heading="Request Republication, Translation, or Archival Licensing"
          description="Specify the article or plate, intended publication or syllabus, print/digital circulation, and non-commercial or commercial nature of the request."
          showArticleUrlField
          submitLabel="Submit Permissions Inquiry"
        />
      </div>
    </div>
  );
}
