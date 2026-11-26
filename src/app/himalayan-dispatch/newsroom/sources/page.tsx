import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnSourcesVaultView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Source Registry & Confidential Vault — Himalayan Dispatch Newsroom',
  description: 'Authenticated Source Registry & Confidential Vault workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/sources',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnSourcesVaultView />;
}
