import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnMyStoriesView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'My Stories & Manuscripts — Himalayan Dispatch Newsroom',
  description: 'Authenticated My Stories & Manuscripts workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/stories',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnMyStoriesView />;
}
