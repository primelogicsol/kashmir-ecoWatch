import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminAutonomousEngineView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Autonomous AI Newsroom (HD-ANIE) — Himalayan Dispatch Newsroom',
  description: 'Authenticated Autonomous AI Newsroom (HD-ANIE) workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/autonomous-engine',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminAutonomousEngineView />;
}
