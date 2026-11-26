import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminTelemetryViews } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'RSS & Syndication Monitor — Himalayan Dispatch Newsroom',
  description: 'Authenticated RSS & Syndication Monitor workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/syndication',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminTelemetryViews section="syndication" />;
}
