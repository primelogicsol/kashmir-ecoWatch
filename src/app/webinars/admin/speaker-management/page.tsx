import React from 'react';
import { Users, Mail } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export default function AdminSpeakerManagementPage() {
  const speakers = CONFERENCES_DETAILED[0].featuredSpeakers;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Speaker Invitations &amp; Profiles"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Speaker Management' }
        ]}
        icon={<Users className="w-6 h-6 text-amber-400" />}
        title="Keynote Speaker Credentials &amp; Invitations"
        subtitle="Invite international faculty, track presentation slides, and manage speaker access tokens."
      />
      <WebinarNav />
      <AdminSubNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        {speakers.map(s => (
          <div key={s.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">{s.name}</div>
              <div className="text-xs text-teal-300">{s.title} • {s.institution}</div>
            </div>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-white/10 flex items-center gap-1.5">
              <Mail className="w-3 h-3" />
              <span>Send Credentials</span>
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
