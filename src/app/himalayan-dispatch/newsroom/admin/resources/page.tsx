import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminTelemetryViews } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Costs & Shared Infrastructure — Himalayan Dispatch Newsroom',
  description: 'Authenticated AI Costs & Shared Infrastructure workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/resources',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminTelemetryViews section="resources" />;
}
