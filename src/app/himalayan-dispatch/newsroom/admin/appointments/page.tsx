import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/route-metadata';
import { HdnAdminApplicationsAndAppointmentsView } from '@/components/himalayan-dispatch/hdn/AdminModules';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildPageMetadata({
  title: 'Editorial Appointments & Masthead — Himalayan Dispatch Newsroom',
  description: 'Authenticated Editorial Appointments & Masthead workspace within the Himalayan Dispatch Newsroom (HDN) Operating System.',
  canonicalPath: '/himalayan-dispatch/newsroom/admin/appointments',
  noIndex: true,
});

export default function HdnGeneratedPage() {
  return <HdnAdminApplicationsAndAppointmentsView focus="appointments" />;
}
