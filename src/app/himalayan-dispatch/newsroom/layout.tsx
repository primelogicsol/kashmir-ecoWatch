import type { Metadata } from 'next';
import React from 'react';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnNewsroomProvider } from '@/components/himalayan-dispatch/hdn/HdnNewsroomProvider';
import { HdnAppShell } from '@/components/himalayan-dispatch/hdn/HdnAppShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Himalayan Dispatch Newsroom (HDN) — Editorial CMS & Operating System',
  description:
    'Authenticated multi-role newsroom operating system uniting journalists, regional bureaus, commissioning desks, editors, and scientific reviewers.',
  canonicalPath: '/himalayan-dispatch/newsroom',
  noIndex: true,
});

export default function HdnNewsroomRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HdnNewsroomProvider>
      <HdnAppShell>{children}</HdnAppShell>
    </HdnNewsroomProvider>
  );
}
