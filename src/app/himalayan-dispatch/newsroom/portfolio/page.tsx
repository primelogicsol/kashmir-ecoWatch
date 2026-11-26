import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnPortfolioView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'My Journalist Portfolio — Himalayan Dispatch Newsroom',
  description: 'Authenticated My Journalist Portfolio workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/portfolio',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnPortfolioView />;
}
