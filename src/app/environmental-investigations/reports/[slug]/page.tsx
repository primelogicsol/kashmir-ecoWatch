import React from 'react';
import { notFound } from 'next/navigation';
import {
  CANONICAL_INVESTIGATIONS,
  getInvestigationBySlugOrCode,
} from '@/data/environmental-investigations';
import { InvestigationReportClientView } from './InvestigationReportClientView';

export function generateStaticParams() {
  return CANONICAL_INVESTIGATIONS.map((inv) => ({
    slug: inv.slug,
  }));
}

export default async function CanonicalInvestigationReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const initialInvestigation = getInvestigationBySlugOrCode(
    slug,
    CANONICAL_INVESTIGATIONS
  );

  if (!initialInvestigation) {
    notFound();
  }

  return (
    <InvestigationReportClientView
      initialInvestigation={initialInvestigation}
      slug={slug}
    />
  );
}
