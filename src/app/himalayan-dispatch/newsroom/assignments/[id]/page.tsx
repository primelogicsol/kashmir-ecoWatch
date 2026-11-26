import { HdnAssignmentDetailView } from '@/components/himalayan-dispatch/hdn/JournalistModules';
export const dynamic = 'force-dynamic';
export default async function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HdnAssignmentDetailView assignmentId={decodeURIComponent(id)} />;
}
