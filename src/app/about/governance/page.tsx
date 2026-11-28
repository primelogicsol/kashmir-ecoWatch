import React from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { GovernancePortalView } from '@/app/governance/GovernancePortalView';

export default function AboutGovernancePage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Governance & Alamdar Ethos', href: '/about/governance' },
    ],
    '/about/governance'
  );

  return (
    <>
      <JsonLd id="kew-about-governance-breadcrumbs" data={breadcrumbJsonLd} />
      <GovernancePortalView canonicalPath="/about/governance" />
    </>
  );
}
