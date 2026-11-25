import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { KEW_IDENTITY } from '@/lib/seo/entity-identity';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { buildScholarlyArticleJsonLd } from '@/lib/seo/structured-data';
import { getMergedMasterRecord } from '@/lib/sectoral-research-store';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const master = getMergedMasterRecord(code, true);

  if (!master) {
    return buildPageMetadata({
      title: 'Sectoral Environmental Research Dossier',
      description: 'Kashmir EcoWatch Sectoral Environmental Research Series 2026.',
      canonicalPath: `/sectoral-eia/reports/${code.toLowerCase()}`,
      noIndex: true,
    });
  }

  const { dossier } = master;
  const isPublished = dossier.status === 'Published' || dossier.status === 'Updated';
  const canonicalPath = `/sectoral-eia/reports/${dossier.code.toLowerCase()}`;

  return buildPageMetadata({
    title: `${dossier.code}: ${dossier.title}`,
    description: dossier.abstract,
    canonicalPath,
    ogType: 'article',
    imagePath: master.heroVisual.src,
    noIndex: !isPublished,
    authors: [dossier.author, KEW_IDENTITY.extendedName],
    keywords: [
      dossier.code,
      dossier.divisionTitle,
      master.studyArea.watershed,
      ...master.studyArea.districts,
      'Sectoral Environmental Impact Assessment',
    ],
    ...(isPublished
      ? {
          scholarCitation: {
            title: `${dossier.code}: ${dossier.title}`,
            authors: [dossier.author, KEW_IDENTITY.extendedName],
            publicationDate: '2026/03/01',
            institution: KEW_IDENTITY.extendedName,
            pdfOrDataUrl: `/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/pdf`,
            keywords: [dossier.divisionTitle, master.studyArea.watershed, ...master.studyArea.districts],
          },
        }
      : {}),
  });
}

export default async function ResearchDossierDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const master = getMergedMasterRecord(code, true);
  if (!master) return children;

  const { dossier } = master;
  const isPublished = dossier.status === 'Published' || dossier.status === 'Updated';
  if (!isPublished) {
    return children;
  }

  const canonicalPath = `/sectoral-eia/reports/${dossier.code.toLowerCase()}`;
  const jsonLd = buildScholarlyArticleJsonLd({
    id: dossier.code.toLowerCase(),
    title: `${dossier.code}: ${dossier.title}`,
    description: dossier.abstract,
    canonicalPath,
    authors: [dossier.author, KEW_IDENTITY.extendedName],
    sourceOrganization: KEW_IDENTITY.extendedName,
    datePublished: '2026-03-01',
    dateModified: '2026-11-25',
    keywords: [dossier.divisionTitle, master.studyArea.watershed, ...master.studyArea.districts],
    districts: master.studyArea.districts,
    coordinates: {
      lat: master.studyArea.coordinates[0],
      lng: master.studyArea.coordinates[1],
    },
    datasetDownloadPath: `/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/dataset`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
