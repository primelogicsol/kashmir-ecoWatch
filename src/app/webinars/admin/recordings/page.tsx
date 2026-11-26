'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, HardDrive, Trash2, Video } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { HallRecordingRecord } from '@/types/virtual-hall';

export default function AdminRecordingsPage() {
  const [recordings, setRecordings] = useState<HallRecordingRecord[]>([]);
  const [quota, setQuota] = useState({
    allocatedBytes: 1073741824,
    usedBytes: 0,
    remainingBytes: 1073741824,
    maxSimultaneousRecordings: 1,
  });
  const [notice, setNotice] = useState<string | null>(null);

  const loadRecordings = useCallback(async () => {
    const res = await fetch('/api/webinars/recordings', { cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    if (data?.ok) {
      setRecordings(data.recordings || []);
      if (data.quota) setQuota(data.quota);
    }
  }, []);

  useEffect(() => {
    loadRecordings();
  }, [loadRecordings]);

  const handleAction = async (action: 'approve_public' | 'delete_recording', recordingId: string) => {
    const res = await fetch('/api/webinars/recordings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, recordingId }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setNotice(
        action === 'approve_public'
          ? 'Recording approved for public proceedings archive.'
          : 'Recording permanently deleted and institutional storage quota released.'
      );
      loadRecordings();
    } else {
      setNotice(data.error || 'Administrator session required (unlock via /webinars/admin).');
    }
  };

  const usedPct = Math.min(100, (quota.usedBytes / Math.max(1, quota.allocatedBytes)) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Consent-Based Archival Storage • Phase I 1 GB Quota"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Recordings' },
        ]}
        icon={<Video className="w-6 h-6 text-teal-400" />}
        title="Session Recordings &amp; 1 GB Institutional Storage Quota"
        subtitle="Consent-verified recordings are stored privately by default within a conservative 1 GB per-institution Phase I quota and require explicit approval before public publication."
      />
      <WebinarNav />
      <AdminSubNav />

      <main className="kew-container-admin py-10 space-y-6">
        {notice && (
          <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/40 text-xs text-teal-200">
            {notice}
          </div>
        )}

        <div className="p-6 bg-slate-900/80 rounded-2xl border border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-teal-400" />
              <span>Phase I Institutional Recording Storage Meter</span>
            </span>
            <span className="font-mono text-teal-300">
              {(quota.usedBytes / (1024 * 1024)).toFixed(2)} MB used /{' '}
              {(quota.allocatedBytes / (1024 * 1024)).toFixed(0)} MB (1.00 GB Cap)
            </span>
          </div>
          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-teal-400 transition-all" style={{ width: `${usedPct}%` }} />
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Simultaneous recordings limit: {quota.maxSimultaneousRecordings} • Default visibility: Private until Administrator approval • Retention: 90 days
          </div>
        </div>

        <div className="space-y-3">
          {recordings.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 text-center text-xs text-slate-400">
              No session recordings captured yet. Simulated recording timers are disabled; real recordings appear here once started with participant consent inside a Virtual Hall.
            </div>
          ) : (
            recordings.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-300">{rec.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono uppercase text-slate-200">
                      {rec.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">({rec.environmentMode})</span>
                  </div>
                  <div className="font-bold text-white">{rec.conferenceTitle}</div>
                  <div className="font-mono text-[11px] text-slate-400">
                    Duration: {rec.durationSeconds}s • Size: {(rec.sizeBytes / 1024).toFixed(1)} KB • Consent Confirmed: {String(rec.consentConfirmed)}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {rec.fileName && (
                    <a
                      href={`/api/webinars/recordings/${rec.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-semibold"
                    >
                      Inspect File
                    </a>
                  )}
                  {rec.status === 'archived_private' && (
                    <button
                      onClick={() => handleAction('approve_public', rec.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve Public
                    </button>
                  )}
                  <button
                    onClick={() => handleAction('delete_recording', rec.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/30 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
