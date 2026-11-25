import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { KEW_IDENTITY } from '@/lib/seo/entity-identity';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { buildScholarlyArticleJsonLd } from '@/lib/seo/structured-data';
import { getInvestigationBySlugOrCode } from '@/data/environmental-investigations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const inv = getInvestigationBySlugOrCode(slug);

  if (!inv) {
    return buildPageMetadata({
      title: 'Environmental Investigation Record',
      description: 'Canonical Western Himalayan environmental investigation dossier.',
      canonicalPath: `/environmental-investigations/reports/${slug}`,
      noIndex: true,
    });
  }

  const isPublished = inv.status === 'published';

  return buildPageMetadata({
    title: `${inv.code}: ${inv.shortTitle}`,
    description: inv.subtitle,
    canonicalPath: `/environmental-investigations/reports/${inv.slug}`,
    ogType: 'article',
    imagePath: inv.heroImage,
    noIndex: !isPublished,
    publishedTime: isPublished ? inv.initiatedDate : undefined,
    modifiedTime: inv.lastUpdated,
    authors: [KEW_IDENTITY.extendedName],
    scholarCitation: isPublished
      ? {
          title: `${inv.title}: ${inv.subtitle}`,
          authors: [KEW_IDENTITY.extendedName],
          publicationDate: inv.lastUpdated,
          institution: KEW_IDENTITY.extendedName,
          pdfOrDataUrl: `/api/environmental-investigations/${inv.slug}?format=dataset`,
          keywords: [inv.code, ...inv.districts, inv.watershedOrBasin],
        }
      : undefined,
  });
}

export default async function InvestigationReportDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const inv = getInvestigationBySlugOrCode(slug);
  if (!inv || inv.status !== 'published') {
    return children;
  }

  const jsonLd = buildScholarlyArticleJsonLd({
    id: inv.code.toLowerCase(),
    title: `${inv.title}: ${inv.subtitle}`,
    description: inv.subtitle,
    canonicalPath: `/environmental-investigations/reports/${inv.slug}`,
    authors: [KEW_IDENTITY.extendedName],
    sourceOrganization: KEW_IDENTITY.extendedName,
    datePublished: inv.initiatedDate,
    dateModified: inv.lastUpdated,
    keywords: [inv.code, ...inv.districts, inv.watershedOrBasin],
    districts: inv.districts,
    coordinates:
      Array.isArray(inv.coordinates) && inv.coordinates.length === 2
        ? { lat: inv.coordinates[0], lng: inv.coordinates[1] }
        : undefined,
    datasetDownloadPath: `/api/environmental-investigations/${inv.slug}`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
