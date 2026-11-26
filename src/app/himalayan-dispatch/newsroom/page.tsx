import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnJournalistDashboardView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'My Newsroom Dashboard — Himalayan Dispatch Newsroom',
  description: 'Authenticated My Newsroom Dashboard workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnJournalistDashboardView />;
}
