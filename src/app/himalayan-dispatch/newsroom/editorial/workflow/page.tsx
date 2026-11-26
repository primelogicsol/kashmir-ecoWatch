import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnWorkflowAndQueueView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: '18-Stage Editorial Workflow Board — Himalayan Dispatch Newsroom',
  description: 'Authenticated 18-Stage Editorial Workflow Board workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/workflow',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnWorkflowAndQueueView presetView="workflow" />;
}
