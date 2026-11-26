import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminCommandCenterView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Newsroom Command Center — Himalayan Dispatch Newsroom',
  description: 'Authenticated Newsroom Command Center workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminCommandCenterView />;
}
