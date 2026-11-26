import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnWorkflowAndQueueView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Unified Editorial Queue — Himalayan Dispatch Newsroom',
  description: 'Authenticated Unified Editorial Queue workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/queue',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnWorkflowAndQueueView presetView="queue" />;
}
