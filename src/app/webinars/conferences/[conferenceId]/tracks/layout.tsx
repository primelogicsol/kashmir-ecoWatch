import React from 'react';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { resolveDynamicPageSeo } from '@/lib/seo/dynamic-metadata';

interface DynamicLayoutProps {
  children: React.ReactNode;
  params: Promise<Record<string, string | string[]>>;
}

export async function generateMetadata({ params }: DynamicLayoutProps): Promise<Metadata> {
  const resolvedParams = await params;
  return resolveDynamicPageSeo(`/webinars/conferences/${resolvedParams["conferenceId"] || ""}/tracks`).metadata;
}

export default async function DynamicRouteLayout({ children, params }: DynamicLayoutProps) {
  const resolvedParams = await params;
  const { jsonLd } = resolveDynamicPageSeo(`/webinars/conferences/${resolvedParams["conferenceId"] || ""}/tracks`);
  if (!jsonLd) return children;
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
