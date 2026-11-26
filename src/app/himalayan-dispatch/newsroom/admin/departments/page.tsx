import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnDepartmentsOverviewAndDeskView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Department Governance — Himalayan Dispatch Newsroom',
  description: 'Authenticated Department Governance workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/departments',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnDepartmentsOverviewAndDeskView />;
}
