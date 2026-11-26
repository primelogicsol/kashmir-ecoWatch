import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnEditorialDashboardView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Dashboard — Himalayan Dispatch Newsroom',
  description: 'Authenticated Editorial Dashboard workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnEditorialDashboardView />;
}
