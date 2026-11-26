import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnBureausOverviewAndDeskView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Regional Bureau Desks — Himalayan Dispatch Newsroom',
  description: 'Authenticated Regional Bureau Desks workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/bureaus',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnBureausOverviewAndDeskView />;
}
