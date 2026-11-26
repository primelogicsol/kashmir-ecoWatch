import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnMediaLibraryView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Visual Journalism & Media Library — Himalayan Dispatch Newsroom',
  description: 'Authenticated Visual Journalism & Media Library workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/media',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnMediaLibraryView />;
}
