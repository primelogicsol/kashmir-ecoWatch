import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnWorkflowAndQueueView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Visual Production Desk — Himalayan Dispatch Newsroom',
  description: 'Authenticated Visual Production Desk workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/visual-production',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnWorkflowAndQueueView presetView="visual_production" />;
}
