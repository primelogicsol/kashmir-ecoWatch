import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { CorrespondenceThreadClient } from '@/components/himalayan-dispatch/CorrespondenceThreadClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Private Editorial Correspondence Thread — Himalayan Dispatch',
  description:
    'Authenticated two-way editorial correspondence thread with the Himalayan Dispatch newsroom.',
  canonicalPath: '/himalayan-dispatch/contact/track',
  noIndex: true,
});

export default async function PrivateCorrespondenceThreadPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Contact the Editorial Desk', href: HD_ROUTES.contact },
            { label: 'Track Your Correspondence', href: HD_ROUTES.contactTrack },
            { label: 'Private Thread' },
          ]}
        />

        <CorrespondenceThreadClient reference={reference} />
      </div>
    </div>
  );
}
