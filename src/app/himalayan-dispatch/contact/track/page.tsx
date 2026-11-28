import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { CorrespondenceTrackClient } from '@/components/himalayan-dispatch/CorrespondenceTrackClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Track Your Correspondence — Himalayan Dispatch',
  description:
    'Securely access your private editorial correspondence thread with your reference number and access credential.',
  canonicalPath: '/himalayan-dispatch/contact/track',
  noIndex: true,
});

export default function TrackCorrespondencePage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-12">
        <EditorialBreadcrumbs
          items={[
            { label: 'Contact the Editorial Desk', href: HD_ROUTES.contact },
            { label: 'Track Your Correspondence' },
          ]}
        />

        <header
          className="pb-10 border-b space-y-4 max-w-4xl"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">HIMALAYAN DISPATCH · CORRESPONDENCE SERVICES</p>
          <h1 className="hd-font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03]">
            Track Your Correspondence
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Review the status of your editorial submission, read responses from the assigned
            newsroom desk, and reply securely within your private thread.
          </p>
        </header>

        <CorrespondenceTrackClient />
      </div>
    </div>
  );
}
