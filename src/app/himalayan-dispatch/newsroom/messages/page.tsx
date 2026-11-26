import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnMessagesView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Messages & Notifications — Himalayan Dispatch Newsroom',
  description: 'Authenticated Editorial Messages & Notifications workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/messages',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnMessagesView />;
}
