import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnFactCheckingView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Fact-Checking & Source Verification — Himalayan Dispatch Newsroom',
  description: 'Authenticated Fact-Checking & Source Verification workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/verification',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnFactCheckingView />;
}
