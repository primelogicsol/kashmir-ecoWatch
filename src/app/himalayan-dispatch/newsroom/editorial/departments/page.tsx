import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnDepartmentsOverviewAndDeskView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Department Desks — Himalayan Dispatch Newsroom',
  description: 'Authenticated Editorial Department Desks workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/departments',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnDepartmentsOverviewAndDeskView />;
}
