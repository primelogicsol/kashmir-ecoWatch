import React from 'react';
import { BarChart3, Users, Clock, ShieldCheck, Download } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Platform Telemetry"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Analytics' }
        ]}
        icon={<BarChart3 className="w-6 h-6 text-amber-400" />}
        title="Webinar Platform Telemetry &amp; Resource Consumption"
        subtitle="Aggregate metrics across all verified institutions, concurrent video streaming load, participant dwell times, and institutional cloud storage consumption."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400">Total Delegates Registered</span>
            <div className="text-2xl font-bold text-white font-mono mt-1">1,420</div>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400">Verified Partner Institutions</span>
            <div className="text-2xl font-bold text-teal-400 font-mono mt-1">28</div>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400">DOI Proceedings Registered</span>
            <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">14</div>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400">Certificates Verified</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">890</div>
          </div>
        </div>
      </main>
    </div>
  );
}
