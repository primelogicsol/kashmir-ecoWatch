'use client';

import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { HOSTING_APPLICATIONS, HostingApplication } from '@/data/conference-system';

export default function AdminConferenceApprovalsPage() {
  const [applications, setApplications] = useState<HostingApplication[]>(HOSTING_APPLICATIONS);

  const handleApprove = (id: string) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'approved', reviewNotes: 'Approved by KEW SuperAdmin. Video rooms provisioned.' } : app));
  };

  const handleReject = (id: string) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'rejected', reviewNotes: 'Rejected: Does not meet scientific criteria.' } : app));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Event Review Directorate"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Conference Approvals' }
        ]}
        icon={<CalendarCheck className="w-6 h-6 text-amber-400" />}
        title="Conference Hosting Proposals Review Queue"
        subtitle="Evaluate proposed scientific programs, verify funding disclosures, allocate parallel WebRTC virtual halls, and authorize public conference listing."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-400">{app.id}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    app.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {app.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Model: {app.hostingModel}</span>
                </div>

                <h3 className="text-base font-bold text-white">{app.conferenceTitle}</h3>
                <div className="text-xs text-slate-400">Institution: <strong className="text-slate-200">{app.institutionName}</strong></div>
                <p className="text-xs text-slate-300">{app.scientificScope}</p>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-xs text-slate-400 space-y-1">
                  <div><strong>Proposed Dates:</strong> {app.proposedDates.display} • Requested Tracks: {app.tracksCount} • Expected: {app.expectedAttendees} Delegates</div>
                  <div><strong>Funding Disclosure:</strong> {app.fundingDisclosure}</div>
                  <div><strong>SuperAdmin Review:</strong> <span className="text-teal-300">{app.reviewNotes || 'Pending assessment'}</span></div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                {app.status !== 'approved' ? (
                  <>
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Event</span>
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-500/30"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approved &amp; Listed</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
