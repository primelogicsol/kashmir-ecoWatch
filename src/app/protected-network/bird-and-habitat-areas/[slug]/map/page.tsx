'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import { ProtectedAreaMapPage } from '@/components/common/ProtectedAreaMapPage';
import { getProtectedAreas } from '@/data/protected-network';

interface PageProps { params: Promise<{ slug: string }>; }

export default function BirdAndHabitatAreaMapPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const area = getProtectedAreas.ibas().find(pa => pa.slug === slug);
  if (!area) notFound();
  return (
    <ProtectedAreaMapPage
      area={area}
      backHref={`/protected-network/bird-and-habitat-areas/${slug}`}
      categoryLabel="Bird and Habitat Areas"
      categoryHref="/protected-network/bird-and-habitat-areas"
    />
  );
}
