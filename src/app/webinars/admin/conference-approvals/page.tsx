'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  FileQuestion,
  Key,
  Lock,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { InstitutionalHostingRecord } from '@/types/virtual-hall';

export default function AdminConferenceApprovalsPage() {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [applications, setApplications] = useState<InstitutionalHostingRecord[]>([]);
  const [notesByApp, setNotesByApp] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    try {
      const res = await fetch('/api/webinars/admin?scope=admin', { cache: 'no-store' });
      if (!res.ok) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setIsAuthorized(true);
      setApplications(Array.isArray(data.hostingRecords) ? data.hostingRecords : []);
    } catch {
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'unlock_admin_passcode', passcode }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      setAuthError(data.error || 'Invalid Administrator Passcode.');
      return;
    }
    setPasscode('');
    await loadApplications();
  };

  const updateRecord = async (recordId: string, patch: Record<string, unknown>) => {
    const customNote = notesByApp[recordId]?.trim();
    const res = await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_hosting_record',
        recordId,
        ...patch,
        ...(customNote ? { reviewNotes: customNote, verificationNotes: customNote } : {}),
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setNotice(`Updated hosting application ${recordId}.`);
      await loadApplications();
    } else {
      setNotice(data.error || 'Action blocked by governance policy.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center text-xs font-mono">
        Verifying administrator session...
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-teal-500/30 rounded-3xl p-7 space-y-5">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-500/40 text-teal-300 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-white">Conference Proposals Review Queue</h1>
            <p className="text-xs text-slate-400">
              Authenticate to evaluate hosting proposals, verify custom institutions, request documentation, and allocate Phase I virtual halls.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter administrator security key..."
              className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
            />
            {authError && (
              <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{authError}</span>
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-2.5 flex items-center justify-center gap-1.5"
            >
              <Key className="w-4 h-4" />
              <span>Authenticate Session</span>
            </button>
          </form>

          <Link href="/webinars/host-a-conference" className="block text-center text-xs text-slate-400 hover:text-white">
            &larr; Host a Conference Application
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Event Review Directorate"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Conference Approvals' },
        ]}
        icon={<CalendarCheck className="w-6 h-6 text-amber-400" />}
        title="Conference Hosting Proposals Review Queue"
        subtitle="Evaluate proposed scientific programs, verify custom institutional submissions, request supporting documentation, and authorize $0 Phase I virtual halls."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="kew-container-admin py-10 space-y-6">
        {notice && (
          <div className="p-3.5 rounded-xl bg-teal-950/60 border border-teal-500/40 text-xs text-teal-200 flex items-center justify-between">
            <span>{notice}</span>
            <button onClick={() => setNotice(null)} className="font-mono text-teal-300">✕</button>
          </div>
        )}

        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-400">{app.id}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                        app.applicationStatus === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : app.applicationStatus === 'rejected'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {app.applicationStatus.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                        app.verificationStatus === 'verified'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      Institution: {app.verificationStatus === 'pending' ? 'Pending Verification' : app.verificationStatus.replace(/_/g, ' ')}
                    </span>
                    {app.isCustomInstitution && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                        Custom Entry
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white">{app.conferenceTitle}</h3>
                  <div className="text-xs text-slate-400">
                    Institution: <strong className="text-slate-200">{app.institutionName}</strong> ({app.institutionCategory})
                    {app.cityRegion || app.country ? ` • ${[app.cityRegion, app.country].filter(Boolean).join(', ')}` : ''}
                    {' • '}Contact: <strong className="text-slate-200">{app.contactName}</strong> ({app.contactEmail})
                  </div>
                  <p className="text-xs text-slate-300">{app.scientificScope}</p>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-xs text-slate-400 space-y-1">
                    <div>
                      <strong>Proposed Dates:</strong> {app.proposedStart.slice(0, 10)} &rarr; {app.proposedEnd.slice(0, 10)} •{' '}
                      <strong>Phase I Allocation:</strong> {app.allocatedTracks} Track • {app.allocatedDelegates} Delegates • {app.allocatedSpeakers} Speakers • $0 Fee
                    </div>
                    {app.website && (
                      <div>
                        <strong>Official Website:</strong>{' '}
                        <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">
                          {app.website}
                        </a>
                      </div>
                    )}
                    <div>
                      <strong>Funding Disclosure:</strong> {app.fundingDisclosure}
                    </div>
                    <div>
                      <strong>Secretariat Review Notes:</strong>{' '}
                      <span className="text-teal-300">{app.reviewNotes || 'Pending assessment'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0">
                  {app.verificationStatus !== 'verified' && (
                    <button
                      onClick={() =>
                        updateRecord(app.id, {
                          verificationStatus: 'verified',
                          lifecycleStage: '4_admin_review_in_progress',
                        })
                      }
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>1. Verify Institution</span>
                    </button>
                  )}

                  {app.applicationStatus !== 'approved' && (
                    <button
                      onClick={() =>
                        updateRecord(app.id, {
                          verificationStatus: 'verified',
                          applicationStatus: 'approved',
                          lifecycleStage: '5_resources_allocated',
                        })
                      }
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{app.verificationStatus === 'verified' ? 'Approve Event' : 'Verify & Approve'}</span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      updateRecord(app.id, {
                        verificationStatus: 'documentation_requested',
                        applicationStatus: 'revisions_requested',
                      })
                    }
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-orange-950/60 hover:bg-orange-900/60 text-orange-200 border border-orange-500/30 flex items-center gap-1.5"
                  >
                    <FileQuestion className="w-3.5 h-3.5" />
                    <span>Request Docs</span>
                  </button>

                  {app.applicationStatus !== 'rejected' && (
                    <button
                      onClick={() =>
                        updateRecord(app.id, {
                          applicationStatus: 'rejected',
                        })
                      }
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-500/30 flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <input
                  type="text"
                  value={notesByApp[app.id] ?? ''}
                  onChange={(e) => setNotesByApp((prev) => ({ ...prev, [app.id]: e.target.value }))}
                  placeholder="Add review decision note or documentation request details..."
                  className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-slate-200"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
