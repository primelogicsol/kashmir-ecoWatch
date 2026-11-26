import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { PitchDeskClient } from '@/components/himalayan-dispatch/PitchDeskClient';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Commissioning & Pitch Desk — Himalayan Dispatch',
  description:
    'Submit an environmental journalism, longform narrative, field dispatch, investigative proposal, or documentary photo essay pitch to the Himalayan Dispatch Commissioning Desk.',
  canonicalPath: '/himalayan-dispatch/pitch',
  noIndex: true,
});

export default function HimalayanDispatchPitchPage() {
  const { departments } = getPublicDispatchBundle();
  return (
    <div>
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-8">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <EditorialBreadcrumbs
            items={[
              { label: 'Join the Newsroom', href: HD_ROUTES.joinNewsroom },
              { label: 'Commissioning & Pitch Desk' },
            ]}
          />
          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs">
            <Link href={HD_ROUTES.contributorGuidelines} className="hd-folio-meta hover:underline">
              Contributor Guidelines →
            </Link>
            <Link href={HD_ROUTES.sourceProtection} className="hd-folio-meta hover:underline">
              Source Protection Charter →
            </Link>
          </div>
        </div>
      </div>
      <PitchDeskClient departments={departments} />
    </div>
  );
}
