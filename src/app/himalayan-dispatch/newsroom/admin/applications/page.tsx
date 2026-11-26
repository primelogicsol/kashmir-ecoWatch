import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminApplicationsAndAppointmentsView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Journalist Applications Queue — Himalayan Dispatch Newsroom',
  description: 'Authenticated Journalist Applications Queue workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/applications',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminApplicationsAndAppointmentsView focus="applications" />;
}
