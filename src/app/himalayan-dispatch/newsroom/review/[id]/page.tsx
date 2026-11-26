import { HdnIndividualReviewWorkspaceView } from '@/components/himalayan-dispatch/hdn/ReviewModules';
export const dynamic = 'force-dynamic';
export default async function IndividualScientificReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HdnIndividualReviewWorkspaceView targetId={decodeURIComponent(id)} />;
}
