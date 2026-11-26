import { HdnBlockArticleEditor } from '@/components/himalayan-dispatch/hdn/HdnBlockArticleEditor';
export const dynamic = 'force-dynamic';
export default async function StoryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <HdnBlockArticleEditor manuscriptId={decodeURIComponent(id)} />;
}
