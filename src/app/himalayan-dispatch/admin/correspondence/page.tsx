import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialCorrespondenceCenterClient } from '@/components/himalayan-dispatch/EditorialCorrespondenceCenterClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Correspondence Center — Himalayan Dispatch',
  description:
    'Authenticated editorial correspondence management, departmental routing, private two-way desk responses, and consent-governed KEW evidence exchange.',
  canonicalPath: '/himalayan-dispatch/admin/correspondence',
  noIndex: true,
});

export default function EditorialCorrespondenceCenterPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Contact the Editorial Desk', href: HD_ROUTES.contact },
            { label: 'Editorial Correspondence Center' },
          ]}
        />

        <header
          className="pb-8 border-b space-y-3"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">HIMALAYAN DISPATCH · AUTHENTICATED NEWSROOM GOVERNANCE</p>
          <h1 className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.04]">
            Editorial Correspondence Center
          </h1>
          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed max-w-4xl"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Centralized intake, departmental routing, encrypted two-way reader and source
            correspondence, and consent-verified Kashmir EcoWatch evidence exchange.
          </p>
        </header>

        <EditorialCorrespondenceCenterClient />
      </div>
    </div>
  );
}
