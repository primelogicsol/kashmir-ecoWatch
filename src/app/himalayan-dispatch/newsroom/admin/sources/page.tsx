import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnSourcesVaultView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Global Source Vault — Himalayan Dispatch Newsroom',
  description: 'Authenticated Global Source Vault workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/sources',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnSourcesVaultView />;
}
