import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnWorkflowAndQueueView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Publication Schedule — Himalayan Dispatch Newsroom',
  description: 'Authenticated Publication Schedule workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/schedule',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnWorkflowAndQueueView presetView="schedule" />;
}
