import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnBureausOverviewAndDeskView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Bureau Governance — Himalayan Dispatch Newsroom',
  description: 'Authenticated Bureau Governance workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/bureaus',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnBureausOverviewAndDeskView />;
}
