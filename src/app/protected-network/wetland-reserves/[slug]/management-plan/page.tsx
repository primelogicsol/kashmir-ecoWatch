'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import { ProtectedAreaManagementPlanPage } from '@/components/common/ProtectedAreaManagementPlanPage';
import { getProtectedAreas } from '@/data/protected-network';

interface PageProps { params: Promise<{ slug: string }>; }

export default function WetlandReserveManagementPlanPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const area = getProtectedAreas.wetlandReserves().find(pa => pa.slug === slug);
  if (!area) notFound();
  return (
    <ProtectedAreaManagementPlanPage
      area={area}
      backHref={`/protected-network/wetland-reserves/${slug}`}
      categoryLabel="Wetland Reserves"
      categoryHref="/protected-network/wetland-reserves"
    />
  );
}
