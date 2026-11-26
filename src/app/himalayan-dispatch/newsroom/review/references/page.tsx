import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnScientificReviewDashboardView } from '@/components/himalayan-dispatch/hdn/ReviewModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'KEW Scientific Observatory References — Himalayan Dispatch Newsroom',
  description: 'Authenticated KEW Scientific Observatory References workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/review/references',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnScientificReviewDashboardView subview="references" />;
}
