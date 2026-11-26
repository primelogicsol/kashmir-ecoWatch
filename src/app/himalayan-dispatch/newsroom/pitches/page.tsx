import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnPitchesView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Story Pitches — Himalayan Dispatch Newsroom',
  description: 'Authenticated Story Pitches workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/pitches',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnPitchesView />;
}
