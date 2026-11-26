import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnWorkflowAndQueueView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Daily Dispatch Editorial Stream — Himalayan Dispatch Newsroom',
  description: 'Authenticated Daily Dispatch Editorial Stream workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/daily-dispatch',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnWorkflowAndQueueView presetView="daily_dispatch" />;
}
