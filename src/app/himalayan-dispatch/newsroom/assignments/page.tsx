import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnMyAssignmentsView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'My Assignments — Himalayan Dispatch Newsroom',
  description: 'Authenticated My Assignments workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/assignments',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnMyAssignmentsView />;
}
