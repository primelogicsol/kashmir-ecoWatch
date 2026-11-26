import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbJsonLd,
  buildScholarlyArticleJsonLd,
} from '@/lib/seo/structured-data';
import { CANONICAL_SITE_URL, KEW_OFFICIAL_LOGO_PATH } from '@/lib/seo/entity-identity';
import {
  getMergedMasterRecord,
  getMergedResearchDossiers,
  getOrGenerateDossierPdf,
  PUBLICATION_WORKFLOW_19_STAGES,
  readDossierOverrides,
} from '@/lib/sectoral-research-store';
import { ScientificReportPublicationView } from '@/components/sectoral-eia/ScientificReportPublicationView';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const master = getMergedMasterRecord(code, true);
  if (!master) {
    return { title: 'Scientific Research Report | Kashmir EcoWatch' };
  }
  const { dossier } = master;
  const canonicalUrl = `${CANONICAL_SITE_URL}/sectoral-eia/reports/${dossier.code.toLowerCase()}`;
  const ogImagePath = master.editorialNarrative?.openingPlate?.src || KEW_OFFICIAL_LOGO_PATH;
  const ogImageUrl = ogImagePath.startsWith('http')
    ? ogImagePath
    : `${CANONICAL_SITE_URL}${ogImagePath}`;
  const officialLogoUrl = `${CANONICAL_SITE_URL}${KEW_OFFICIAL_LOGO_PATH}`;

  return {
    title: `${dossier.code}: ${dossier.title} | Kashmir EcoWatch`,
    description: dossier.abstract,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${dossier.code} — ${dossier.title}`,
      description: dossier.abstract,
      url: canonicalUrl,
      siteName: 'Kashmir EcoWatch (KEW Western Himalayan)',
      type: 'article',
      images: [
        { url: ogImageUrl, alt: `${dossier.code}: ${dossier.title}` },
        { url: officialLogoUrl, alt: 'Kashmir EcoWatch Official Logo' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dossier.code} — ${dossier.title}`,
      description: dossier.abstract,
      images: [ogImageUrl],
    },
  };
}

export default async function ResearchDossierDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ tab?: string; mode?: string }>;
}) {
  const { code } = await params;
  const resolvedSearch = await searchParams;

  const master = getMergedMasterRecord(code, true);
  if (!master) {
    notFound();
  }

  const { dossier } = master;
  const isPublished = dossier.status === 'Published' || dossier.status === 'Updated';
  const pdfArtifact = isPublished ? getOrGenerateDossierPdf(dossier.code) : undefined;

  const overrides = readDossierOverrides();
  const ov = overrides[dossier.code.toUpperCase()];
  const defaultStageIdx = isPublished
    ? 17
    : dossier.status === 'Scientific Review'
    ? 8
    : dossier.status === 'Draft Assessment'
    ? 7
    : dossier.status === 'Under Investigation'
    ? 5
    : dossier.status === 'Data Acquisition'
    ? 2
    : 1;
  const workflowStageIndex =
    typeof ov?.workflowStageIndex === 'number' ? ov.workflowStageIndex : defaultStageIdx;

  const allDossiers = getMergedResearchDossiers();
  const relatedReportsSummary = master.relatedReportCodes
    .map((relCode) => allDossiers.find((d) => d.code === relCode))
    .filter((d): d is NonNullable<typeof d> => Boolean(d))
    .map((d) => ({
      code: d.code,
      title: d.title,
      status: d.status,
      divisionTitle: d.divisionTitle,
    }));

  const canonicalPath = `/sectoral-eia/reports/${dossier.code.toLowerCase()}`;

  const breadcrumbSchema = buildBreadcrumbJsonLd(
    [
      { label: 'Home', href: '/' },
      { label: 'Sectoral EIA Engine', href: '/sectoral-eia' },
      { label: 'Research Series 2026', href: '/sectoral-eia/reports' },
      { label: dossier.code, href: canonicalPath },
    ],
    canonicalPath
  );

  const scholarlySchema = isPublished
    ? buildScholarlyArticleJsonLd({
        id: dossier.code,
        title: `${dossier.code}: ${dossier.title}`,
        description: dossier.abstract,
        canonicalPath,
        authors: [dossier.author],
        sourceOrganization: master.attribution.institutionalAffiliation,
        reviewedBy: master.attribution.reviewPanel,
        datePublished: '2026-03-01',
        dateModified: master.lastRevised,
        keywords: [
          dossier.code,
          dossier.divisionTitle,
          master.studyArea.watershed,
          ...master.studyArea.districts,
        ],
        districts: master.studyArea.districts,
        coordinates: {
          lat: master.studyArea.coordinates[0],
          lng: master.studyArea.coordinates[1],
        },
        datasetDownloadPath: `/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/dataset?format=csv`,
      })
    : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} id={`breadcrumb-${dossier.code.toLowerCase()}`} />
      {scholarlySchema && (
        <JsonLd data={scholarlySchema} id={`scholarly-${dossier.code.toLowerCase()}`} />
      )}
      <ScientificReportPublicationView
        master={master}
        pdfMetadata={
          pdfArtifact
            ? {
                filename: pdfArtifact.filename,
                pageCount: pdfArtifact.pageCount,
                byteLength: pdfArtifact.byteLength,
                sha256: pdfArtifact.sha256,
                downloadUrl: `/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/pdf`,
                inlineViewerUrl: `/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/pdf?disposition=inline`,
              }
            : null
        }
        workflowStages={PUBLICATION_WORKFLOW_19_STAGES}
        workflowStageIndex={workflowStageIndex}
        initialTab={resolvedSearch?.tab}
        initialMode={resolvedSearch?.mode}
        relatedReportsSummary={relatedReportsSummary}
      />
    </>
  );
}
