import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnCommissioningAndAssignmentsView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Assignment Management — Himalayan Dispatch Newsroom',
  description: 'Authenticated Assignment Management workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/assignments',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnCommissioningAndAssignmentsView mode="assignments" />;
}
