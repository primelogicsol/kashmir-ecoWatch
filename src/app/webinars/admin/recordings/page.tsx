import React from 'react';
import { Video } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';

export default function AdminRecordingsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Storage &amp; Publication"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Recordings' }
        ]}
        icon={<Video className="w-6 h-6 text-amber-400" />}
        title="Session Recordings &amp; Retention Policies"
        subtitle="Manage statutory recording consent, video transcoder outputs, and public archiving permissions."
      />
      <WebinarNav />
      <AdminSubNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-white/10 text-xs text-slate-300">
          All cloud recordings are secured in S3-compatible encrypted storage with 10-year archival retention.
        </div>
      </main>
    </div>
  );
}
