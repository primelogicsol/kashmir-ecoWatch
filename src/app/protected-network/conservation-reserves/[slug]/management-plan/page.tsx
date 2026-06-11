'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import { ProtectedAreaManagementPlanPage } from '@/components/common/ProtectedAreaManagementPlanPage';
import { getProtectedAreas } from '@/data/protected-network';

interface PageProps { params: Promise<{ slug: string }>; }

export default function ConservationReserveManagementPlanPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const area = getProtectedAreas.conservationReserves().find(pa => pa.slug === slug);
  if (!area) notFound();
  return (
    <ProtectedAreaManagementPlanPage
      area={area}
      backHref={`/protected-network/conservation-reserves/${slug}`}
      categoryLabel="Conservation Reserves"
      categoryHref="/protected-network/conservation-reserves"
    />
  );
}
