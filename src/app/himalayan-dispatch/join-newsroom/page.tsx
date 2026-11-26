import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { getPublicDispatchBundle } from '@/lib/himalayan-dispatch-store';
import { JoinNewsroomGatewayClient } from '@/components/himalayan-dispatch/JoinNewsroomGatewayClient';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { LegacyFragmentRedirector } from '@/components/himalayan-dispatch/LegacyFragmentRedirector';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Join the Newsroom — Journalist Recruitment & Contributor Onboarding | Himalayan Dispatch',
  description:
    'Apply to join Himalayan Dispatch as an environmental reporter, district correspondent, investigative journalist, photojournalist, data journalist, or specialist contributor across the Western Himalayas.',
  canonicalPath: '/himalayan-dispatch/join-newsroom',
  imagePath: '/images/publications/glaciology-kolahoi-gnss-survey.jpg',
});

export default async function JoinNewsroomPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>;
}) {
  const resolved = await searchParams;
  if (resolved?.track === 'correspondent') {
    permanentRedirect(HD_ROUTES.correspondentApplications);
  }

  const { contributorCategories, departments, onboardingLifecycle } =
    getPublicDispatchBundle();

  return (
    <div>
      <LegacyFragmentRedirector />
      <div className="w-full px-4 sm:px-8 lg:px-14 pt-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <EditorialBreadcrumbs items={[{ label: 'Join the Newsroom' }]} />
          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs">
            <Link href={HD_ROUTES.ourStory} className="hd-folio-meta hover:underline">
              Our Founding Story →
            </Link>
            <Link href={HD_ROUTES.correspondentApplications} className="hd-folio-meta hover:underline">
              Correspondent Applications →
            </Link>
            <Link href={HD_ROUTES.editorialAppointments} className="hd-folio-meta hover:underline">
              Editorial Appointments →
            </Link>
            <Link href={HD_ROUTES.contributorGuidelines} className="hd-folio-meta hover:underline">
              Contributor Guidelines →
            </Link>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <JoinNewsroomGatewayClient
          categories={contributorCategories}
          departments={departments}
          lifecycleSteps={onboardingLifecycle}
        />
      </Suspense>
    </div>
  );
}
