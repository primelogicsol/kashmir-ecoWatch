import React from 'react';
import { Calendar } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { ConferenceConflictScheduler } from '@/components/webinars/ConferenceConflictScheduler';

export default function AdminConferenceSchedulerPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Scheduling Intelligence Engine"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Conference Scheduler' }
        ]}
        icon={<Calendar className="w-6 h-6 text-amber-400" />}
        title="Multi-Track Conference Scheduler &amp; Conflict Engine"
        subtitle="Automated conflict detection preventing simultaneous speaker commitments, virtual room double-bookings, moderator overlaps, and date boundary excursions."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ConferenceConflictScheduler />
      </main>
    </div>
  );
}
