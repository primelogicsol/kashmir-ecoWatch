import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { EditorialBreadcrumbs } from '@/components/himalayan-dispatch/EditorialBreadcrumbs';
import { WesternHimalayanKnowledgeSearchClient } from '@/components/himalayan-dispatch/WesternHimalayanKnowledgeSearchClient';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export const metadata: Metadata = buildPageMetadata({
  title: 'Search & Discover — Western Himalayan Knowledge Search | Himalayan Dispatch',
  description:
    'Unified editorial and scientific search across Himalayan Dispatch journalism, investigations, and monographs alongside Kashmir EcoWatch scientific assessments, live datasets, sensor stations, and geospatial intelligence.',
  canonicalPath: '/himalayan-dispatch/search',
});

export default function HimalayanDispatchSearchPage() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto space-y-10">
        <EditorialBreadcrumbs
          items={[
            { label: 'Himalayan Dispatch', href: HD_ROUTES.root },
            { label: 'Search & Discover' },
          ]}
        />

        <Suspense
          fallback={
            <div className="py-16 text-center hd-font-body text-sm">
              Loading Western Himalayan Knowledge Search...
            </div>
          }
        >
          <WesternHimalayanKnowledgeSearchClient
            defaultScope="himalayan_dispatch"
            baseSearchPath="/himalayan-dispatch/search"
          />
        </Suspense>
      </div>
    </div>
  );
}
