import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnResearchAiLabView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Research Library & KEW AI Lab — Himalayan Dispatch Newsroom',
  description: 'Authenticated Research Library & KEW AI Lab workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/research',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnResearchAiLabView />;
}
