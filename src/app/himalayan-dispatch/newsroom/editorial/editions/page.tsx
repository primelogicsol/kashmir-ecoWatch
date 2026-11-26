import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnMonthlyEditionBuilderView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Monthly Editions Builder — Himalayan Dispatch Newsroom',
  description: 'Authenticated Monthly Editions Builder workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/editions',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnMonthlyEditionBuilderView />;
}
