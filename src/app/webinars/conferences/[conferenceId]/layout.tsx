import type { Metadata } from 'next';
import { resolveDynamicPageSeo } from '@/lib/seo/dynamic-metadata';
import React from 'react';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  const params = CONFERENCES_DETAILED.map(conf => ({ conferenceId: conf.id }));
  // Backwards-compatible aliases
  params.push({ conferenceId: 'kew-conf-2026-cryo' });
  params.push({ conferenceId: 'conf-2026-wetlands' });
  params.push({ conferenceId: 'conf-2025-geomorph' });
  return params;
}

export default function ConferenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata({ params }: { params: Promise<Record<string, string>> }): Promise<Metadata> {
  const resolvedParams = await params;
  return resolveDynamicPageSeo(`/webinars/conferences/${resolvedParams["conferenceId"]}`).metadata;
}
