import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminJournalistRegistryView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Journalist & Personnel Registry — Himalayan Dispatch Newsroom',
  description: 'Authenticated Journalist & Personnel Registry workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/journalists',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminJournalistRegistryView />;
}
