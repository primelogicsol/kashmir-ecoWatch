import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { DispatchEditorialCmsClient } from '@/components/himalayan-dispatch/DispatchEditorialCmsClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial CMS & Publishing Governance | Himalayan Dispatch',
  description:
    'Authenticated Himalayan Dispatch Editorial CMS for masthead governance, correspondent credential review, manuscript triage, commissioning pitches, and edition operations.',
  canonicalPath: '/himalayan-dispatch/editorial-cms',
  noIndex: true,
});

export default function HimalayanDispatchEditorialCmsPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Newsroom Desk', href: HD_ROUTES.newsroom },
            { label: 'Editorial CMS' },
          ]}
        />

        <header
          className="max-w-3xl space-y-3 pb-8 border-b"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <p className="hd-kicker">EDITORIAL GOVERNANCE · FULL CMS CONSOLE</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Editorial CMS &amp; Publishing Console
          </h1>
          <p
            className="hd-font-body text-base sm:text-lg leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Administrator-controlled publication workflow, masthead registry, applicant credential
            vault, and commissioning docket governance.
          </p>
        </header>

        <DispatchEditorialCmsClient />
      </div>
    </div>
  );
}
