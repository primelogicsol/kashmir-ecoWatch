import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { EditorialCorrespondenceFormClient } from '@/components/himalayan-dispatch/EditorialCorrespondenceFormClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Send Editorial Correspondence — Himalayan Dispatch',
  description:
    'Transmit general inquiries, institutional correspondence, story proposals, scientific inquiries, correction requests, reader complaints, or restricted communications to Himalayan Dispatch.',
  canonicalPath: '/himalayan-dispatch/contact/message',
});

export default function HimalayanDispatchSendMessagePage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-12">
        <EditorialBreadcrumbs
          items={[
            { label: 'Contact the Editorial Desk', href: HD_ROUTES.contact },
            { label: 'Editorial Correspondence' },
          ]}
        />

        <header
          className="pb-10 border-b space-y-4 max-w-4xl"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">HIMALAYAN DISPATCH · EDITORIAL CORRESPONDENCE DESK</p>
          <h1 className="hd-font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.03]">
            Send Editorial Correspondence
          </h1>
          <p
            className="hd-font-body text-lg sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Select the appropriate correspondence category below to route your message directly to
            the responsible editorial department and receive a private two-way tracking credential.
          </p>
        </header>

        <EditorialCorrespondenceFormClient />
      </div>
    </div>
  );
}
