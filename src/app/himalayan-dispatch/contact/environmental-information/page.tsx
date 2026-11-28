import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EnvironmentalInformationGatewayClient } from '@/components/himalayan-dispatch/EnvironmentalInformationGatewayClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Submit Environmental Information — Himalayan Dispatch × Kashmir EcoWatch',
  description:
    'Access established Kashmir EcoWatch facilities for environmental incidents, field observations, scientific data, sectoral assessments, and community stewardship.',
  canonicalPath: '/himalayan-dispatch/contact/environmental-information',
});

export default function SubmitEnvironmentalInformationGatewayPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-12 sm:space-y-14">
        <EditorialBreadcrumbs
          items={[
            { label: 'Contact the Editorial Desk', href: HD_ROUTES.contact },
            { label: 'Submit Environmental Information' },
          ]}
        />

        <header
          className="pb-10 border-b space-y-4 max-w-4xl"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">HIMALAYAN DISPATCH × KASHMIR ECOWATCH</p>
          <h1 className="hd-font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03]">
            Submit Environmental Information
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Environmental incidents, field observations, scientific data, sectoral assessments and
            community stewardship submissions are managed through the established Kashmir EcoWatch
            platform.
          </p>
        </header>

        <EnvironmentalInformationGatewayClient />
      </div>
    </div>
  );
}
