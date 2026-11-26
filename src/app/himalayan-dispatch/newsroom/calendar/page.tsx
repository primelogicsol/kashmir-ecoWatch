import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnCalendarView } from '@/components/himalayan-dispatch/hdn/JournalistModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Reporting & Publication Calendar — Himalayan Dispatch Newsroom',
  description: 'Authenticated Reporting & Publication Calendar workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/calendar',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnCalendarView />;
}
