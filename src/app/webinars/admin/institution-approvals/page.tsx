'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileQuestion,
  Key,
  Lock,
  Search,
  XCircle,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { InstitutionalVerificationStatus } from '@/types/virtual-hall';

interface AdminInstitutionRecord {
  institutionId: string;
  name: string;
  category: string;
  isCustomInstitution: boolean;
  country: string;
  cityRegion: string;
  domain: string;
  website: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  verificationStatus: InstitutionalVerificationStatus;
  verifiedAt?: string;
  verificationNotes?: string;
  bio: string;
  applicationsCount: number;
  latestConferenceTitle?: string;
  allocatedDelegates: number;
  allocatedTracks: number;
}

export default function AdminInstitutionApprovalsPage() {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [institutions, setInstitutions] = useState<AdminInstitutionRecord[]>([]);
  const [notesByInst, setNotesByInst] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const loadInstitutions = useCallback(async () => {
    try {
      const res = await fetch('/api/webinars/admin?scope=admin', { cache: 'no-store' });
      if (!res.ok) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setIsAuthorized(true);
      setInstitutions(Array.isArray(data.institutions) ? data.institutions : []);
    } catch {
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInstitutions();
  }, [loadInstitutions]);

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
    await loadInstitutions();
  };

  const handleStatusUpdate = async (
    institutionId: string,
    verificationStatus: InstitutionalVerificationStatus
  ) => {
    const note = notesByInst[institutionId]?.trim();
    if (verificationStatus === 'documentation_requested' && !note) {
      setNotice('Enter the specific documentation request in the notes field before clicking Request Documentation.');
      return;
    }
    const res = await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_institution_status',
        institutionId,
        verificationStatus,
        verificationNotes: note || undefined,
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setInstitutions(data.institutions || []);
      setNotice(`Updated institutional status to "${verificationStatus.replace(/_/g, ' ')}".`);
    } else {
      setNotice(data.error || 'Failed to update institution status.');
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
            <h1 className="text-xl font-black text-white">Institutional Verification Console</h1>
            <p className="text-xs text-slate-400">
              Authenticate to review, verify, approve, reject, or request additional documentation from applying institutions.
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

          <Link href="/webinars/institution/verification" className="block text-center text-xs text-slate-400 hover:text-white">
            &larr; Public Verification Directory
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Platform Governance • Institutional Verification"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Institution Approvals' },
        ]}
        icon={<Building2 className="w-6 h-6 text-amber-400" />}
        title="Institutional Accreditation &amp; Hosting Approvals"
        subtitle="Review partner and custom institutions applying for $0 scientific hosting. Verify academic/NGO credentials, request documentation, or decline ineligible submissions."
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
          {institutions.map((inst) => (
            <div
              key={inst.institutionId}
              className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                        inst.verificationStatus === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : inst.verificationStatus === 'pending'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : inst.verificationStatus === 'documentation_requested'
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                          : inst.verificationStatus === 'under_review'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {inst.verificationStatus === 'pending'
                        ? 'PENDING VERIFICATION'
                        : inst.verificationStatus.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    {inst.isCustomInstitution && (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                        Custom Entry
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono">
                      {inst.category} • {inst.cityRegion}, {inst.country}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{inst.name}</h3>
                  <p className="text-xs text-slate-300">{inst.bio}</p>

                  {inst.latestConferenceTitle && (
                    <div className="text-xs text-teal-300">
                      Linked Hosting Application ({inst.applicationsCount}):{' '}
                      <strong className="text-white">&quot;{inst.latestConferenceTitle}&quot;</strong>
                    </div>
                  )}

                  <div className="text-xs text-slate-400 font-mono flex flex-wrap gap-4 pt-1">
                    <span>
                      Domain: <strong className="text-teal-300">{inst.domain}</strong>
                    </span>
                    {inst.website && (
                      <a
                        href={inst.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <span>
                      Representative: <strong className="text-slate-200">{inst.contactName}</strong> ({inst.contactEmail})
                    </span>
                    <span>
                      Phase I Quota: <strong className="text-cyan-300">{inst.allocatedTracks} Track / {inst.allocatedDelegates} Max Seats / $0 Fee</strong>
                    </span>
                  </div>

                  {inst.verificationNotes && (
                    <div className="text-xs text-amber-200 pt-1">
                      <strong>Admin Note:</strong> {inst.verificationNotes}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleStatusUpdate(inst.institutionId, 'under_review')}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Mark Under Review</span>
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(inst.institutionId, 'documentation_requested')}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-orange-950/60 hover:bg-orange-900/60 text-orange-200 border border-orange-500/30 flex items-center gap-1.5"
                  >
                    <FileQuestion className="w-3.5 h-3.5" />
                    <span>Request Documentation</span>
                  </button>

                  {inst.verificationStatus !== 'verified' && (
                    <button
                      onClick={() => handleStatusUpdate(inst.institutionId, 'verified')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verify Institution</span>
                    </button>
                  )}

                  {inst.verificationStatus !== 'rejected' && (
                    <button
                      onClick={() => handleStatusUpdate(inst.institutionId, 'rejected')}
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
                  value={notesByInst[inst.institutionId] ?? ''}
                  onChange={(e) =>
                    setNotesByInst((prev) => ({ ...prev, [inst.institutionId]: e.target.value }))
                  }
                  placeholder="Optional verification note or specific documentation request (e.g. Institutional registration charter / faculty letter)..."
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
