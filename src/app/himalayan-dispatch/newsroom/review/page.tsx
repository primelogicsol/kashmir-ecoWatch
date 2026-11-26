import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnScientificReviewDashboardView } from '@/components/himalayan-dispatch/hdn/ReviewModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Scientific Review Dashboard — Himalayan Dispatch Newsroom',
  description: 'Authenticated Scientific Review Dashboard workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/review',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnScientificReviewDashboardView subview="dashboard" />;
}
