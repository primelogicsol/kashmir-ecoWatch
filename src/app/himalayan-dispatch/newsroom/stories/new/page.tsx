import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnNewStoryCreatorView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'New Story Manuscript — Himalayan Dispatch Newsroom',
  description: 'Authenticated New Story Manuscript workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/stories/new',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnNewStoryCreatorView />;
}
