import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { getStaticRouteMetadata } from '@/lib/seo/route-metadata';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { GovernancePortalView } from './GovernancePortalView';

export const metadata: Metadata = getStaticRouteMetadata('/governance');

export default function StandaloneGovernancePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Institutional Governance & Scientific Charter', href: '/governance' },
    ],
    '/governance'
  );

  return (
    <>
      <JsonLd id="kew-governance-breadcrumbs" data={breadcrumbJsonLd} />
      <GovernancePortalView canonicalPath="/governance" />
    </>
  );
}
