import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnCorrectionsDeskView } from '@/components/himalayan-dispatch/hdn/EditorialModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Corrections & Accountability Desk — Himalayan Dispatch Newsroom',
  description: 'Authenticated Corrections & Accountability Desk workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/editorial/corrections',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnCorrectionsDeskView />;
}
