import React from 'react';
import { Award, Download } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';

export default function AdminRegistrationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Delegate Rosters"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Registrations' }
        ]}
        icon={<Award className="w-6 h-6 text-amber-400" />}
        title="Delegate Registrations &amp; Verification Rosters"
        subtitle="Export verified attendance logs, issue delegate credentials, and audit CE credits."
      />
      <WebinarNav />
      <AdminSubNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-white/10 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-white">Full Delegate Database (1,420 Registered Scholars)</h4>
            <p className="text-xs text-slate-400">All events synchronized with WebRTC room tokens.</p>
          </div>
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </main>
    </div>
  );
}
