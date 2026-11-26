import { HdnStoryPreviewView } from '@/components/himalayan-dispatch/hdn/JournalistModules';
export const dynamic = 'force-dynamic';
export default async function StoryPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HdnStoryPreviewView manuscriptId={decodeURIComponent(id)} />;
}
