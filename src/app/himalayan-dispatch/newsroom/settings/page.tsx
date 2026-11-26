import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnSettingsCharterView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Account Settings & Contributor Charter — Himalayan Dispatch Newsroom',
  description: 'Authenticated Account Settings & Contributor Charter workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/settings',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnSettingsCharterView />;
}
