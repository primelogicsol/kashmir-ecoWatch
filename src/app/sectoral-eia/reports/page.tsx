import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/lib/seo/structured-data';
import {
  CANONICAL_SITE_URL,
  KEW_OFFICIAL_LOGO_PATH,
  ORGANIZATION_ENTITY_ID,
} from '@/lib/seo/entity-identity';
import { getMergedResearchDossiers } from '@/lib/sectoral-research-store';
import { ResearchPortfolioExplorerClient } from '@/components/sectoral-eia/ResearchPortfolioExplorerClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Western Himalayan Scientific Research Series (101 Dossiers) | Kashmir EcoWatch',
  description:
    '101 individually researched scientific dossiers and monographs across 23 environmental sectors in Kashmir and the Western Himalaya.',
  alternates: { canonical: `${CANONICAL_SITE_URL}/sectoral-eia/reports` },
  openGraph: {
    title: 'Western Himalayan Scientific Research Series (101 Dossiers) — Kashmir EcoWatch',
    description:
      'Published scientific assessments, regional limnological monographs in peer review, and externally researched scoping dossiers across 23 environmental sectors.',
    url: `${CANONICAL_SITE_URL}/sectoral-eia/reports`,
    siteName: 'Kashmir EcoWatch (KEW Western Himalayan)',
    images: [{ url: `${CANONICAL_SITE_URL}${KEW_OFFICIAL_LOGO_PATH}`, alt: 'Kashmir EcoWatch Official Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Western Himalayan Scientific Research Series (101 Dossiers) — Kashmir EcoWatch',
    description:
      'Published scientific assessments, regional limnological monographs in peer review, and externally researched scoping dossiers across 23 environmental sectors.',
    images: [`${CANONICAL_SITE_URL}${KEW_OFFICIAL_LOGO_PATH}`],
  },
};

export default async function ScientificReportsPage() {
  // Server-side merge guarantees crawlers receive all 101 dossiers + derived PDF page counts in initial SSR HTML
  const dossiers = getMergedResearchDossiers();
  const publishedOnly = dossiers.filter(
    (d) => d.status === 'Published' || d.status === 'Updated'
  );

  const breadcrumbSchema = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Sectoral EIA Engine', href: '/sectoral-eia' },
      { label: `${dossiers.length} Scientific Research Dossiers`, href: '/sectoral-eia/reports' },
    ],
    '/sectoral-eia/reports'
  );

  // Emit ScholarlyArticle/DataCatalog ItemList strictly for validated Published monographs (never misrepresenting proposals)
  const catalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    '@id': `${CANONICAL_SITE_URL}/sectoral-eia/reports#catalog`,
    name: `Kashmir EcoWatch Western Himalayan Scientific Research Series (${dossiers.length} Dossiers Across 23 Sectors)`,
    description:
      `Institutional environmental research portfolio spanning ${dossiers.length} individually researched scientific dossiers across 23 sectors in Kashmir and the Western Himalaya (4 validated Published assessments, 1 flagship monograph in Scientific Review, and 96 Proposed scoping dossiers).`,
    url: `${CANONICAL_SITE_URL}/sectoral-eia/reports`,
    publisher: { '@id': ORGANIZATION_ENTITY_ID },
    dataset: publishedOnly.map((pub) => ({
      '@type': 'Dataset',
      name: `${pub.code}: ${pub.title}`,
      description: pub.abstract,
      url: `${CANONICAL_SITE_URL}/sectoral-eia/reports/${pub.code.toLowerCase()}`,
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/licenses/by/4.0/',
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} id="reports-breadcrumb-jsonld" />
      <JsonLd data={catalogSchema} id="reports-datacatalog-jsonld" />
      <ResearchPortfolioExplorerClient initialDossiers={dossiers} />
    </>
  );
}
