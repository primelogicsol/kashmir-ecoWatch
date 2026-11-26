import { HdnDepartmentsOverviewAndDeskView } from '@/components/himalayan-dispatch/hdn/EditorialModules';
export const dynamic = 'force-dynamic';
export default async function PrivateDepartmentDeskPage({ params }: { params: Promise<{ deptSlug: string }> }) {
  const { deptSlug } = await params;
  return <HdnDepartmentsOverviewAndDeskView deptSlug={decodeURIComponent(deptSlug)} />;
}
