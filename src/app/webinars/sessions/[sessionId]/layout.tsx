import type { Metadata } from 'next';
import { resolveDynamicPageSeo } from '@/lib/seo/dynamic-metadata';
import React from 'react';
import { SESSIONS_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return SESSIONS_DETAILED.map(sess => ({ sessionId: sess.id }));
}

export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata({ params }: { params: Promise<Record<string, string>> }): Promise<Metadata> {
  const resolvedParams = await params;
  return resolveDynamicPageSeo(`/webinars/sessions/${resolvedParams["sessionId"]}`).metadata;
}
