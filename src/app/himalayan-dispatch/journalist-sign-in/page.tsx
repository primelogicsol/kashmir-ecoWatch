import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { JournalistWorkspaceClient } from '@/components/himalayan-dispatch/JournalistWorkspaceClient';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Journalist Sign In — Accredited Contributor Workspace | Himalayan Dispatch',
  description:
    'Sign in to the private Himalayan Dispatch Journalist Workspace to manage assigned commissions, story pitches, manuscripts, documentary evidence, and portfolio settings.',
  canonicalPath: '/himalayan-dispatch/journalist-sign-in',
  noIndex: true,
});

export default function JournalistSignInPage() {
  return (
    <div>
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <EditorialBreadcrumbs
            items={[
              { label: 'Join the Newsroom', href: HD_ROUTES.joinNewsroom },
              { label: 'Journalist Sign In' },
            ]}
          />
          <Link href={HD_ROUTES.newsroom} className="hd-folio-meta hover:underline shrink-0 mb-6">
            Editorial Command &amp; Newsroom Desk →
          </Link>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="w-full px-4 sm:px-8 lg:px-14 py-20 text-center">
            <p className="hd-kicker">VERIFYING JOURNALIST CREDENTIALS…</p>
          </div>
        }
      >
        <JournalistWorkspaceClient />
      </Suspense>
    </div>
  );
}
