'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Eye,
  Lock,
  LogOut,
  Play,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import type {
  AutonomousEditorialQueueItem,
  AutonomousSourceSignal,
  DailyDispatchArticle,
  EditorialPitchSubmission,
  EditorialPublicInquiryRecord,
  EditorialWorkflowStage,
  JournalistProfile,
  MagazineStory,
  NewsroomContributorApplication,
} from '@/types/himalayan-dispatch';
import { EDITORIAL_WORKFLOW_STAGES } from '@/data/himalayan-dispatch';

interface AdminEnginePayload {
  actor: string;
  stories: MagazineStory[];
  pitches: EditorialPitchSubmission[];
  applications: NewsroomContributorApplication[];
  journalists: JournalistProfile[];
  autonomousEngine: {
    lastScanAt: string;
    sourceSignals: AutonomousSourceSignal[];
    autonomousQueue: AutonomousEditorialQueueItem[];
    dailyDispatches: DailyDispatchArticle[];
    publicInquiries: EditorialPublicInquiryRecord[];
  };
}

export function NewsroomCommandDeskClient() {
  const { user } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [deskTab, setDeskTab] = useState<'autonomous' | 'signals' | 'human' | 'stories'>('autonomous');
  const [queueFilter, setQueueFilter] = useState<'active' | 'published' | 'rejected' | 'trashed'>('active');
  const [payload, setPayload] = useState<AdminEnginePayload | null>(null);
  const [loadingDesk, setLoadingDesk] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Inline Editor / Preview Modal State
  const [editingItem, setEditingItem] = useState<AutonomousEditorialQueueItem | null>(null);
  const [editHeadline, setEditHeadline] = useState('');
  const [editStandfirst, setEditStandfirst] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editSchedule, setEditSchedule] = useState('');
  const [editJournalist, setEditJournalist] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const fetchNewsroomBundle = useCallback(async () => {
    setLoadingDesk(true);
    try {
      const res = await fetch('/api/himalayan-dispatch/admin', { credentials: 'include' });
      if (res.status === 401) {
        setAuthenticated(false);
        setPayload(null);
      } else {
        const data = await res.json();
        if (data.success) {
          setAuthenticated(true);
          setPayload(data);
        }
      }
    } catch {
      // Ignore transient network errors
    } finally {
      setLoadingDesk(false);
      setCheckingAuth(false);
    }
  }, []);

  useEffect(() => {
    fetchNewsroomBundle();
  }, [fetchNewsroomBundle]);

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4500);
  };

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode: passcode.trim(),
          actor: user?.name || user?.email || 'Himalayan Dispatch Editor',
        }),
      });
      if (!res.ok) {
        setAuthError('Invalid Editorial Administrator passcode. Private newsroom access denied.');
        return;
      }
      setPasscode('');
      await fetchNewsroomBundle();
    } catch {
      setAuthError('Unable to verify administrator credentials.');
    }
  };

  const handleAdminSignOut = async () => {
    await fetch('/api/admin/session', { method: 'DELETE', credentials: 'include' }).catch(
      () => null
    );
    setAuthenticated(false);
    setPayload(null);
  };

  const handleRunSourceScan = async () => {
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'run_autonomous_scan' }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      flash(`Source discovery & verification scan completed (${data.scan.signalsCount} active observatory signals).`);
      fetchNewsroomBundle();
    }
  };

  const handleGenerateDraft = async (
    signalId: string,
    targetChannel: 'daily_dispatch' | 'monthly_edition'
  ) => {
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'generate_autonomous_draft', signalId, targetChannel }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      flash(
        `Generated unpublished draft "${data.item.workingHeadline}" in private ${
          targetChannel === 'daily_dispatch' ? 'Daily Dispatch' : 'Monthly Edition'
        } queue.`
      );
      setDeskTab('autonomous');
      setQueueFilter('active');
      fetchNewsroomBundle();
    }
  };

  const openEditorFor = (item: AutonomousEditorialQueueItem, previewOnly = false) => {
    setEditingItem(item);
    setEditHeadline(item.workingHeadline);
    setEditStandfirst(item.standfirst);
    setEditBody(item.draftParagraphs.join('\n\n'));
    setEditSchedule(item.scheduledFor || 'Next Daily Dispatch Window');
    setEditJournalist(item.assignedJournalistSlug || '');
    setPreviewOpen(previewOnly);
  };

  const handleQueueMutation = async (
    itemId: string,
    subAction: 'edit' | 'schedule' | 'publish' | 'reject' | 'trash' | 'restore' | 'assign',
    extra?: Record<string, string>
  ) => {
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'mutate_autonomous_item',
        itemId,
        subAction,
        ...extra,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      flash(`Editorial action "${subAction.toUpperCase()}" applied to "${data.item.workingHeadline}".`);
      setEditingItem(null);
      fetchNewsroomBundle();
    }
  };

  const handleStoryWorkflow = async (slug: string, workflowStage: EditorialWorkflowStage) => {
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_story_stage', slug, workflowStage }),
    });
    if (res.ok) {
      flash(`Updated story workflow stage to ${workflowStage}.`);
      fetchNewsroomBundle();
    }
  };

  if (checkingAuth) {
    return (
      <div className="py-20 text-center">
        <p className="hd-kicker">AUTHENTICATING NEWSROOM DESK…</p>
      </div>
    );
  }

  // ─── PUBLIC INSTITUTIONAL GATEWAY + ADMIN AUTHENTICATION GATE ──────────────
  if (!authenticated || !payload) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <p className="hd-kicker">REGIONAL DESKS &amp; EDITORIAL OPERATIONS</p>
          <h2 className="hd-font-display text-3xl sm:text-5xl font-semibold leading-tight">
            Inside the Himalayan Dispatch Newsroom Architecture
          </h2>
          <p className="hd-font-body text-base sm:text-lg leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            The Himalayan Dispatch Newsroom Desk coordinates accredited environmental journalists
            across six regional bureaus with Kashmir EcoWatch satellite observatories, hydrological
            ledgers, and statutory filings to assemble verified research dossiers for Daily Dispatch
            and monthly magazine editions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {[
              {
                kicker: '01 · CONTINUOUS SOURCE DISCOVERY',
                text: 'Monitors multi-temporal optical/SAR change alerts, spring discharge anomalies, and winter inversion spikes.',
              },
              {
                kicker: '02 · SOURCE VERIFICATION & DRAFTS',
                text: 'Cross-corroborates empirical signals into structured internal research packets prior to editorial commissioning.',
              },
              {
                kicker: '03 · SENIOR EDITORIAL AUTHORITY',
                text: 'Every working manuscript remains strictly private until primary reporting, Stage 04 fact-checking, and editorial sign-off.',
              },
              {
                kicker: '04 · ACCREDITED CORRESPONDENTS',
                text: 'Approved journalists manage pitches, drafts, and field evidence through Journalist Sign In.',
              },
            ].map((card) => (
              <div
                key={card.kicker}
                className="p-5 border space-y-2"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
              >
                <p className="hd-kicker text-[10px]">{card.kicker}</p>
                <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap gap-6">
            <Link href={HD_ROUTES.journalistSignIn} className="hd-kicker hover:underline">
              Accredited Journalist Sign In →
            </Link>
            <Link href={HD_ROUTES.editorialCharter} className="hd-folio-meta hover:underline">
              Read Editorial &amp; Verification Charter →
            </Link>
          </div>
        </div>

        {/* Authenticated Editorial Administrator Gate */}
        <div
          className="lg:col-span-5 p-8 sm:p-10 border space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
        >
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-kicker">AUTHENTICATED EDITORIAL DESK ACCESS</span>
          </div>
          <h3 className="hd-font-display text-3xl font-semibold">
            Unlock Newsroom Command Console
          </h3>
          <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
            Unpublished drafts, confidential source assignments, contributor credentials, and
            editorial production queues require verified KEW Editorial Administrator authorization.
          </p>

          {authError && (
            <div className="p-3.5 border text-xs hd-font-body" style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="hd-kicker block">Editorial Administrator Passcode *</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter KEW / Dispatch Editorial Passcode"
                className="w-full px-4 py-3 border bg-transparent hd-font-sans text-sm"
                style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full hd-font-sans inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] cursor-pointer"
              style={{ backgroundColor: 'var(--hd-copper-solid)' }}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authorize Newsroom Console</span>
            </button>
          </form>

          <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--hd-rule)' }}>
            <Link href={HD_ROUTES.journalistSignIn} className="hd-folio-meta hover:underline">
              Journalist Workspace →
            </Link>
            <Link href={HD_ROUTES.editorialCms} className="hd-folio-meta hover:underline">
              Full Editorial CMS &amp; HD-ANIE Console →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED NEWSROOM COMMAND & AUTONOMOUS INTELLIGENCE ENGINE ───────
  const queueItems = payload.autonomousEngine.autonomousQueue.filter((item) => {
    if (queueFilter === 'active') {
      return item.status === 'draft_pending_approval' || item.status === 'scheduled';
    }
    return item.status === queueFilter;
  });

  return (
    <div className="space-y-10">
      {/* Authenticated Command Strip */}
      <div
        className="p-6 border flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-kicker">AUTHENTICATED NEWSROOM COMMAND · {payload.actor}</span>
          </div>
          <p className="hd-folio-meta">
            LAST SOURCE DISCOVERY SCAN: {payload.autonomousEngine.lastScanAt.slice(0, 19).replace('T', ' ')} UTC
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRunSourceScan}
            className="hd-font-sans inline-flex items-center gap-1.5 px-4 py-2 border text-[10px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
            style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
          >
            <Play className="w-3 h-3" />
            <span>Run Source Discovery</span>
          </button>
          <button
            type="button"
            onClick={fetchNewsroomBundle}
            className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] tracking-[0.16em] uppercase cursor-pointer"
            style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
          >
            <RefreshCw className={`w-3 h-3 ${loadingDesk ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={handleAdminSignOut}
            className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] tracking-[0.16em] uppercase cursor-pointer"
            style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
          >
            <LogOut className="w-3 h-3" />
            <span>Lock Desk</span>
          </button>
        </div>
      </div>

      {notice && (
        <div
          className="p-4 border flex items-center gap-2 text-sm hd-font-body"
          style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-copper-soft)' }}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
          <span>{notice}</span>
        </div>
      )}

      {/* Primary Newsroom Console Tabs */}
      <div className="flex flex-wrap items-center gap-6 border-b pb-3" style={{ borderColor: 'var(--hd-rule-strong)' }}>
        {[
          {
            id: 'autonomous',
            label: `01 · Autonomous Editorial Queue (${payload.autonomousEngine.autonomousQueue.length})`,
          },
          {
            id: 'signals',
            label: `02 · Source Discovery & Verification (${payload.autonomousEngine.sourceSignals.length})`,
          },
          {
            id: 'human',
            label: `03 · Human Pitches, Applications & Inquiries (${
              payload.pitches.length +
              payload.applications.length +
              payload.autonomousEngine.publicInquiries.length
            })`,
          },
          {
            id: 'stories',
            label: `04 · Monthly Edition Workflow (${payload.stories.length})`,
          },
        ].map((tb) => (
          <button
            key={tb.id}
            type="button"
            onClick={() => setDeskTab(tb.id as any)}
            className="hd-font-sans text-[11px] font-semibold tracking-[0.18em] uppercase pb-2 cursor-pointer"
            style={{
              color: deskTab === tb.id ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
              borderBottom: deskTab === tb.id ? '2px solid var(--hd-copper)' : 'none',
            }}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {/* TAB 1: AUTONOMOUS EDITORIAL QUEUE (EDIT / PREVIEW / PUBLISH / SCHEDULE / REJECT / DELETE / RESTORE / ASSIGN) */}
      {deskTab === 'autonomous' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="hd-font-body text-sm italic" style={{ color: 'var(--hd-fg-muted)' }}>
              All autonomous drafts remain strictly unpublished until human editorial verification and explicit Publish sign-off.
            </p>
            <div className="flex flex-wrap gap-2">
              {(['active', 'published', 'rejected', 'trashed'] as const).map((flt) => (
                <button
                  key={flt}
                  type="button"
                  onClick={() => setQueueFilter(flt)}
                  className="px-3 py-1 border hd-font-sans text-[10px] tracking-[0.16em] uppercase cursor-pointer"
                  style={{
                    borderColor: queueFilter === flt ? 'var(--hd-copper)' : 'var(--hd-rule)',
                    color: queueFilter === flt ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                  }}
                >
                  {flt}
                </button>
              ))}
            </div>
          </div>

          {/* Inline Editor / Preview Drawer */}
          {editingItem && (
            <div
              className="p-6 sm:p-8 border space-y-5"
              style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg-elevated)' }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                <span className="hd-kicker">
                  {previewOpen ? 'EDITORIAL READER PREVIEW' : 'MANUSCRIPT EDITOR & ASSIGNMENT'}
                </span>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="hd-folio-meta cursor-pointer hover:underline"
                >
                  Close ✕
                </button>
              </div>

              {previewOpen ? (
                <div className="space-y-4 max-w-3xl">
                  <p className="hd-kicker">{editingItem.dateline}</p>
                  <h3 className="hd-font-display text-3xl sm:text-4xl font-semibold">{editHeadline}</h3>
                  <p className="hd-font-display text-xl italic" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {editStandfirst}
                  </p>
                  <div className="hd-prose pt-2">
                    {editBody.split(/\n\s*\n/).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="hd-kicker block">Working Headline</label>
                    <input
                      type="text"
                      value={editHeadline}
                      onChange={(e) => setEditHeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 border bg-transparent hd-font-display text-2xl"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="hd-kicker block">Standfirst / Deck</label>
                    <input
                      type="text"
                      value={editStandfirst}
                      onChange={(e) => setEditStandfirst(e.target.value)}
                      className="w-full px-3.5 py-2 border bg-transparent hd-font-body text-sm"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="hd-kicker block">Draft Paragraphs (blank-line separated)</label>
                    <textarea
                      rows={6}
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      className="w-full px-3.5 py-2.5 border bg-transparent hd-font-body text-sm"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="hd-kicker block">Assign Human Journalist</label>
                      <select
                        value={editJournalist}
                        onChange={(e) => setEditJournalist(e.target.value)}
                        className="w-full px-3 py-2 border hd-font-body text-sm"
                        style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)', color: 'var(--hd-fg)' }}
                      >
                        <option value="">Editorial Desk (Unassigned)</option>
                        {payload.journalists.map((j) => (
                          <option key={j.slug} value={j.slug}>
                            {j.name} — {j.roleTitle}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="hd-kicker block">Schedule Window</label>
                      <input
                        type="text"
                        value={editSchedule}
                        onChange={(e) => setEditSchedule(e.target.value)}
                        className="w-full px-3 py-2 border bg-transparent hd-font-body text-sm"
                        style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPreviewOpen((p) => !p)}
                  className="px-4 py-2 border hd-font-sans text-[10px] font-semibold tracking-[0.16em] uppercase cursor-pointer"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                >
                  {previewOpen ? 'Switch to Editor' : 'Preview Layout'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQueueMutation(editingItem.id, 'edit', {
                      workingHeadline: editHeadline,
                      standfirst: editStandfirst,
                      draftBodyJoined: editBody,
                      assignedJournalistSlug: editJournalist,
                      scheduledFor: editSchedule,
                    })
                  }
                  className="px-4 py-2 border hd-font-sans text-[10px] font-semibold tracking-[0.16em] uppercase cursor-pointer"
                  style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                >
                  Save Edits &amp; Assignment
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQueueMutation(editingItem.id, 'schedule', {
                      workingHeadline: editHeadline,
                      standfirst: editStandfirst,
                      draftBodyJoined: editBody,
                      assignedJournalistSlug: editJournalist,
                      scheduledFor: editSchedule,
                    })
                  }
                  className="px-4 py-2 border hd-font-sans text-[10px] font-semibold tracking-[0.16em] uppercase cursor-pointer"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                >
                  Schedule
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQueueMutation(editingItem.id, 'publish', {
                      workingHeadline: editHeadline,
                      standfirst: editStandfirst,
                      draftBodyJoined: editBody,
                      assignedJournalistSlug: editJournalist,
                    })
                  }
                  className="px-5 py-2 hd-font-sans text-[10px] font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
                  style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                >
                  Approve &amp; Publish
                </button>
              </div>
            </div>
          )}

          {/* Queue List */}
          <div className="divide-y border-t border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            {queueItems.length === 0 ? (
              <p className="py-10 hd-font-body text-sm italic" style={{ color: 'var(--hd-fg-muted)' }}>
                No editorial queue records in the “{queueFilter}” bucket.
              </p>
            ) : (
              queueItems.map((q) => (
                <div key={q.id} className="py-6 space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="hd-kicker">
                        {q.targetChannel === 'daily_dispatch'
                          ? 'DAILY DISPATCH QUEUE'
                          : 'MONTHLY EDITION PLANNING'}
                      </span>
                      <span style={{ color: 'var(--hd-stone)' }}>·</span>
                      <span className="hd-folio-meta">{q.dateline}</span>
                    </div>
                    <span className="hd-folio-meta">
                      STATUS: {q.status.toUpperCase()}
                      {q.assignedJournalistName ? ` · ASSIGNED: ${q.assignedJournalistName}` : ''}
                    </span>
                  </div>

                  <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold">
                    {q.workingHeadline}
                  </h3>
                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {q.standfirst}
                  </p>
                  <p className="hd-folio-meta">RESEARCH: {q.researchSynthesis}</p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEditorFor(q, false)}
                      className="px-3 py-1.5 border hd-font-sans text-[10px] font-semibold tracking-[0.15em] uppercase cursor-pointer"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    >
                      Edit / Assign
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditorFor(q, true)}
                      className="px-3 py-1.5 border hd-font-sans text-[10px] font-semibold tracking-[0.15em] uppercase inline-flex items-center gap-1 cursor-pointer"
                      style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }}
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                    {q.status !== 'published' && q.status !== 'trashed' && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleQueueMutation(q.id, 'publish')}
                          className="px-3.5 py-1.5 hd-font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-[#F2EFE7] cursor-pointer"
                          style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                        >
                          Approve &amp; Publish
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQueueMutation(q.id, 'reject')}
                          className="px-3 py-1.5 border hd-font-sans text-[10px] tracking-[0.15em] uppercase cursor-pointer"
                          style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQueueMutation(q.id, 'trash')}
                          className="px-3 py-1.5 border hd-font-sans text-[10px] tracking-[0.15em] uppercase inline-flex items-center gap-1 cursor-pointer"
                          style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </>
                    )}
                    {(q.status === 'trashed' || q.status === 'rejected') && (
                      <button
                        type="button"
                        onClick={() => handleQueueMutation(q.id, 'restore')}
                        className="px-3.5 py-1.5 border hd-font-sans text-[10px] font-semibold tracking-[0.15em] uppercase inline-flex items-center gap-1 cursor-pointer"
                        style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restore to Drafts</span>
                      </button>
                    )}
                    {q.publishedSlug && (
                      <Link
                        href={HD_ROUTES.dailyDispatchArticle(q.publishedSlug)}
                        className="hd-kicker hover:underline"
                      >
                        View Live Dispatch →
                      </Link>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CONTINUOUS SOURCE DISCOVERY & VERIFICATION */}
      {deskTab === 'signals' && (
        <div className="divide-y border-t border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          {payload.autonomousEngine.sourceSignals.map((sig) => (
            <div key={sig.id} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center" style={{ borderColor: 'var(--hd-rule)' }}>
              <div className="lg:col-span-8 space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="hd-kicker">{sig.sourceCategory}</span>
                  <span style={{ color: 'var(--hd-stone)' }}>·</span>
                  <span className="hd-folio-meta">
                    CORROBORATION SCORE: {sig.verificationScore}/100 ({sig.corroboratingSourcesCount} SOURCES)
                  </span>
                </div>
                <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold">{sig.headlineSignal}</h3>
                <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {sig.empiricalSummary}
                </p>
                <p className="hd-folio-meta">SOURCE: {sig.sourceName}</p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleGenerateDraft(sig.id, 'daily_dispatch')}
                  className="px-4 py-2 hd-font-sans text-[10px] font-semibold tracking-[0.16em] uppercase text-[#F2EFE7] cursor-pointer"
                  style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                >
                  Draft Daily Dispatch
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerateDraft(sig.id, 'monthly_edition')}
                  className="px-4 py-2 border hd-font-sans text-[10px] font-semibold tracking-[0.16em] uppercase cursor-pointer"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                >
                  Scope Monthly Feature
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: HUMAN JOURNALIST WORKFLOWS, PITCHES & READER INQUIRIES */}
      {deskTab === 'human' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
              <span className="hd-kicker">APPLICATIONS ({payload.applications.length})</span>
            </div>
            {payload.applications.length === 0 ? (
              <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                No pending correspondent applications in queue.
              </p>
            ) : (
              payload.applications.slice(0, 6).map((a) => (
                <div key={a.id} className="py-2.5 border-t space-y-0.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <p className="hd-font-display text-xl font-semibold">{a.fullName}</p>
                  <p className="hd-folio-meta">{a.referenceNumber} · {a.roleCategoryTitle} · {a.status}</p>
                </div>
              ))
            )}
            <Link href={HD_ROUTES.editorialCms} className="hd-kicker inline-block pt-2 hover:underline">
              Open Full Credential &amp; Masthead Console →
            </Link>
          </div>

          <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <span className="hd-kicker">STORY PITCHES ({payload.pitches.length})</span>
            {payload.pitches.length === 0 ? (
              <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                No story pitches awaiting triage.
              </p>
            ) : (
              payload.pitches.slice(0, 6).map((p) => (
                <div key={p.id} className="py-2.5 border-t space-y-0.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <p className="hd-font-display text-xl font-semibold">{p.proposedHeadline}</p>
                  <p className="hd-folio-meta">{p.trackingCode} · {p.authorName} · {p.workflowStage}</p>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border space-y-3" style={{ borderColor: 'var(--hd-rule)' }}>
            <span className="hd-kicker">
              PUBLIC INQUIRIES &amp; COMPLAINTS ({payload.autonomousEngine.publicInquiries.length})
            </span>
            {payload.autonomousEngine.publicInquiries.length === 0 ? (
              <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                No open reader complaints, permissions requests, or desk inquiries.
              </p>
            ) : (
              payload.autonomousEngine.publicInquiries.slice(0, 6).map((inq) => (
                <div key={inq.id} className="py-2.5 border-t space-y-0.5" style={{ borderColor: 'var(--hd-rule)' }}>
                  <p className="hd-font-display text-xl font-semibold">{inq.subject}</p>
                  <p className="hd-folio-meta">{inq.trackingCode} · {inq.category}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: MONTHLY MAGAZINE STORIES WORKFLOW */}
      {deskTab === 'stories' && (
        <div className="divide-y border-t border-b" style={{ borderColor: 'var(--hd-rule-strong)' }}>
          {payload.stories.map((st) => (
            <div key={st.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: 'var(--hd-rule)' }}>
              <div>
                <span className="hd-kicker">{st.editionLabel}</span>
                <h3 className="hd-font-display text-2xl font-semibold">{st.title}</h3>
                <p className="hd-folio-meta">BY {st.bylineDisplay}</p>
              </div>
              <select
                value={st.workflowStage}
                onChange={(e) =>
                  handleStoryWorkflow(st.slug, e.target.value as EditorialWorkflowStage)
                }
                className="px-3 py-2 border hd-font-sans text-xs"
                style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)', color: 'var(--hd-fg)' }}
              >
                {EDITORIAL_WORKFLOW_STAGES.map((stg) => (
                  <option key={stg.id} value={stg.id}>
                    {stg.stepNumber}. {stg.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
