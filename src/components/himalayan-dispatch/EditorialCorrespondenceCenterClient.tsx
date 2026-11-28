'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Archive,
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileCheck2,
  FileText,
  Lock,
  LogOut,
  MailOpen,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import {
  CENTRALIZED_RECEIVING_MAILBOX,
  CONFIDENTIAL_EMAIL_EXCLUSION_RULE,
  CORRESPONDENCE_CATEGORIES,
  EDITORIAL_CORRESPONDENCE_FILTER_VIEWS,
  PROPOSED_DISPATCH_EMAIL_ALIASES,
  type AdminCorrespondenceBundle,
  type AdminCorrespondenceRecord,
  type CorrespondencePriority,
  type CorrespondenceStatus,
  type EditorialCorrespondenceFilterViewId,
} from '@/lib/himalayan-dispatch-correspondence-types';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import { HDN_ROUTES } from '@/lib/hdn/routes';

const DESK_OPTIONS = [
  { code: 'editorial_directorate', label: 'Editorial Directorate' },
  { code: 'institutional_correspondence', label: 'Editorial Affairs' },
  { code: 'commissioning_pitch', label: 'Commissioning & Pitch Desk' },
  { code: 'investigative_desk', label: 'Investigative Desk' },
  { code: 'scientific_review', label: 'Scientific Review' },
  { code: 'corrections_clarifications', label: 'Corrections & Clarifications' },
  { code: 'reader_complaints', label: 'Public Editor & Ombudsperson' },
  { code: 'regional_bureau', label: 'Regional Bureau Desk' },
  { code: 'restricted_source_protection', label: 'Restricted Source Protection Desk' },
];

const BUREAU_OPTIONS = [
  { value: '', label: 'Central Desk (Unassigned Bureau)' },
  { value: 'kashmir', label: 'Kashmir Bureau' },
  { value: 'jammu', label: 'Jammu Bureau' },
  { value: 'ladakh', label: 'Ladakh Bureau' },
  { value: 'ajk', label: 'AJ&K Bureau' },
  { value: 'gilgit', label: 'Gilgit Bureau' },
  { value: 'baltistan', label: 'Baltistan Bureau' },
];

export function EditorialCorrespondenceCenterClient() {
  const [loading, setLoading] = useState(true);
  const [unauthenticated, setUnauthenticated] = useState(false);
  const [bundle, setBundle] = useState<AdminCorrespondenceBundle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Editorial Sign-In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  // Navigation & Filters
  const [activeView, setActiveView] = useState<EditorialCorrespondenceFilterViewId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [selectedRef, setSelectedRef] = useState<string | null>(null);

  // Selected Correspondence Editable Metadata
  const [editStatus, setEditStatus] = useState<CorrespondenceStatus>('unread');
  const [editPriority, setEditPriority] = useState<CorrespondencePriority>('standard');
  const [editDeskCode, setEditDeskCode] = useState<string>('editorial_directorate');
  const [editAssignedDept, setEditAssignedDept] = useState<string>('Editorial Directorate');
  const [editBureau, setEditBureau] = useState<string>('');
  const [editEditorSlug, setEditEditorSlug] = useState<string>('');
  const [editNotes, setEditNotes] = useState<string>('');
  const [savingMeta, setSavingMeta] = useState(false);

  // Two-Way Editorial Reply State
  const [replyKind, setReplyKind] = useState<'editorial_response' | 'evidence_request'>(
    'editorial_response'
  );
  const [replyBody, setReplyBody] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Phase 09 KEW Evidence Exchange Request State
  const [requestPurposeById, setRequestPurposeById] = useState<Record<string, string>>({});
  const [submittingExchangeFor, setSubmittingExchangeFor] = useState<string | null>(null);

  const loadBundle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/correspondence/admin', {
        cache: 'no-store',
      });
      const data = await res.json();
      if (res.status === 401 || data?.authenticated === false) {
        setUnauthenticated(true);
        setBundle(null);
        setLoading(false);
        return;
      }
      if (!res.ok || !data?.success) {
        setError(data?.error || 'Unable to load Editorial Correspondence Center.');
        setLoading(false);
        return;
      }
      setUnauthenticated(false);
      setBundle(data);
    } catch {
      setError('Network error while loading Editorial Correspondence Center.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBundle();
  }, [loadBundle]);

  const filteredRecords = useMemo(() => {
    if (!bundle) return [];
    let list = [...bundle.records];

    if (activeView === 'archived') {
      list = list.filter((r) => r.status === 'archived');
    } else if (
      activeView !== 'authorized_kew_evidence' &&
      activeView !== 'email_alias_architecture' &&
      activeView !== 'audit_logs'
    ) {
      list = list.filter((r) => r.status !== 'archived');
      if (activeView === 'restricted_source_protection') {
        list = list.filter((r) => r.isConfidential || r.deskCode === 'restricted_source_protection');
      } else if (activeView === 'regional_bureau') {
        list = list.filter((r) => r.deskCode === 'regional_bureau' || Boolean(r.assignedBureau));
      } else if (activeView !== 'all') {
        list = list.filter((r) => r.deskCode === activeView);
      }
    }

    if (statusFilter !== 'ALL') {
      list = list.filter((r) => r.status === statusFilter);
    }
    if (priorityFilter !== 'ALL') {
      list = list.filter((r) => r.priority === priorityFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.referenceNumber.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q) ||
          r.senderName.toLowerCase().includes(q) ||
          r.senderEmail.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.categoryLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [bundle, activeView, statusFilter, priorityFilter, searchQuery]);

  const selectedRecord: AdminCorrespondenceRecord | null = useMemo(() => {
    if (!bundle || !filteredRecords.length) return null;
    if (selectedRef) {
      const found = filteredRecords.find((r) => r.referenceNumber === selectedRef);
      if (found) return found;
    }
    return filteredRecords[0] || null;
  }, [bundle, filteredRecords, selectedRef]);

  useEffect(() => {
    if (!selectedRecord) return;
    setSelectedRef(selectedRecord.referenceNumber);
    setEditStatus(selectedRecord.status);
    setEditPriority(selectedRecord.priority);
    setEditDeskCode(selectedRecord.deskCode);
    setEditAssignedDept(selectedRecord.assignedDepartment);
    setEditBureau(selectedRecord.assignedBureau || '');
    setEditEditorSlug(selectedRecord.assignedEditorSlug || '');
    setEditNotes(selectedRecord.internalNotes || '');
  }, [selectedRecord]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSigningIn(true);
    try {
      const res = await fetch('/api/himalayan-dispatch/hdn/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail.trim(),
          passcodeOrAccessCode: loginCode.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.authenticated) {
        setError(data?.error || 'Invalid Himalayan Dispatch editorial credentials.');
        setSigningIn(false);
        return;
      }
      setLoginCode('');
      await loadBundle();
    } catch {
      setError('Unable to authenticate editorial session.');
    } finally {
      setSigningIn(false);
    }
  }

  async function handleSignOut() {
    await fetch('/api/himalayan-dispatch/hdn/session', { method: 'DELETE' }).catch(() => {});
    setBundle(null);
    setUnauthenticated(true);
  }

  async function executeAdminAction(payload: Record<string, unknown>, successMsg: string) {
    setError(null);
    setActionNotice(null);
    const res = await fetch('/api/himalayan-dispatch/correspondence/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data?.success) {
      throw new Error(data?.error || 'Administrative action failed.');
    }
    setBundle(data);
    setActionNotice(successMsg);
  }

  async function handleSaveMetadata(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRecord) return;
    setSavingMeta(true);
    try {
      await executeAdminAction(
        {
          action: 'update_metadata',
          referenceNumber: selectedRecord.referenceNumber,
          isRead: true,
          status: editStatus === 'unread' ? 'under_review' : editStatus,
          priority: editPriority,
          deskCode: editDeskCode,
          assignedDepartment: editAssignedDept,
          assignedBureau: editBureau || null,
          assignedEditorSlug: editEditorSlug || null,
          internalNotes: editNotes,
        },
        `Updated workflow metadata for ${selectedRecord.referenceNumber}.`
      );
    } catch (err: any) {
      setError(err?.message || 'Unable to save metadata.');
    } finally {
      setSavingMeta(false);
    }
  }

  async function handleToggleRead(record: AdminCorrespondenceRecord) {
    try {
      const nextRead = !record.isRead;
      await executeAdminAction(
        {
          action: 'update_metadata',
          referenceNumber: record.referenceNumber,
          isRead: nextRead,
          status: nextRead && record.status === 'unread' ? 'under_review' : record.status,
        },
        `Marked ${record.referenceNumber} as ${nextRead ? 'read' : 'unread'}.`
      );
    } catch (err: any) {
      setError(err?.message || 'Unable to update read status.');
    }
  }

  async function handleArchive(record: AdminCorrespondenceRecord) {
    try {
      await executeAdminAction(
        {
          action: 'update_metadata',
          referenceNumber: record.referenceNumber,
          isRead: true,
          status: 'archived',
        },
        `Archived correspondence ${record.referenceNumber}.`
      );
    } catch (err: any) {
      setError(err?.message || 'Unable to archive record.');
    }
  }

  async function handleSendEditorialReply(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRecord) return;
    if (replyBody.trim().length < 5) {
      setError('Please enter a substantive editorial response.');
      return;
    }
    setSendingReply(true);
    try {
      await executeAdminAction(
        {
          action: 'send_editorial_reply',
          referenceNumber: selectedRecord.referenceNumber,
          messageKind: replyKind,
          replyBody: replyBody.trim(),
        },
        replyKind === 'evidence_request'
          ? `Sent information/evidence request to correspondent on ${selectedRecord.referenceNumber}.`
          : `Sent official editorial response on ${selectedRecord.referenceNumber}.`
      );
      setReplyBody('');
    } catch (err: any) {
      setError(err?.message || 'Unable to send editorial response.');
    } finally {
      setSendingReply(false);
    }
  }

  async function handleRequestKewEvidence(kewTrackingId: string) {
    const purpose = (requestPurposeById[kewTrackingId] || '').trim();
    if (purpose.length < 10) {
      setError(
        'Please specify the scientific review or investigative reporting purpose (at least 10 characters) before requesting KEW evidence exchange.'
      );
      return;
    }
    setSubmittingExchangeFor(kewTrackingId);
    try {
      await executeAdminAction(
        {
          action: 'request_kew_evidence',
          kewTrackingId,
          requestPurpose: purpose,
        },
        `Logged controlled KEW evidence exchange request for ${kewTrackingId}.`
      );
      setRequestPurposeById((prev) => ({ ...prev, [kewTrackingId]: '' }));
    } catch (err: any) {
      setError(err?.message || 'Unable to request KEW evidence.');
    } finally {
      setSubmittingExchangeFor(null);
    }
  }

  async function handleDecideExchange(
    exchangeId: string,
    decision: 'approved' | 'denied' | 'revoked'
  ) {
    try {
      await executeAdminAction(
        {
          action: 'decide_kew_evidence',
          exchangeId,
          decision,
        },
        `Marked KEW evidence exchange ${decision}.`
      );
    } catch (err: any) {
      setError(err?.message || 'Unable to update exchange status.');
    }
  }

  if (loading) {
    return (
      <div
        className="p-12 border text-center hd-font-sans text-xs tracking-[0.18em] uppercase"
        style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg-elevated)' }}
      >
        Loading Editorial Correspondence Center…
      </div>
    );
  }

  if (unauthenticated || !bundle) {
    return (
      <section
        className="max-w-xl mx-auto p-8 sm:p-10 border space-y-6"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-kicker">AUTHENTICATED EDITORIAL WORKSPACE</span>
          </div>
          <h2 className="hd-font-display text-3xl font-semibold">
            Editorial Correspondence Center Sign-In
          </h2>
          <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
            Access is restricted to authorized Himalayan Dispatch editors, desk heads, scientific
            reviewers, and the Public Editor. Confidential Source Protection records are strictly
            segregated from general platform administration.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="hd-admin-corr-email"
              className="hd-font-sans block text-[11px] font-semibold tracking-[0.16em] uppercase"
            >
              Editorial Account Email *
            </label>
            <input
              id="hd-admin-corr-email"
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="editor@dispatch.kashmir-ecowatch.com"
              className="w-full px-4 py-3 border hd-font-body text-sm focus:outline-none"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
                color: 'var(--hd-fg)',
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="hd-admin-corr-code"
              className="hd-font-sans block text-[11px] font-semibold tracking-[0.16em] uppercase"
            >
              Newsroom Passcode / Access Key *
            </label>
            <input
              id="hd-admin-corr-code"
              type="password"
              required
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              placeholder="Enter editorial passcode"
              className="w-full px-4 py-3 border hd-font-body text-sm focus:outline-none"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
                color: 'var(--hd-fg)',
              }}
            />
          </div>

          {error && (
            <div
              role="alert"
              className="p-3.5 border hd-font-body text-sm"
              style={{
                borderColor: '#B91C1C',
                backgroundColor: 'rgba(185, 28, 28, 0.08)',
              }}
            >
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={signingIn}
              className="hd-font-sans inline-flex items-center gap-2 px-6 py-3.5 border text-xs font-semibold tracking-[0.18em] uppercase"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-copper-solid)',
                color: '#F2EFE7',
              }}
            >
              <span>{signingIn ? 'AUTHENTICATING…' : 'ENTER CORRESPONDENCE CENTER'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href={HD_ROUTES.journalistSignIn}
              className="hd-font-sans text-xs font-semibold tracking-[0.14em] uppercase hover:underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              Newsroom Portal →
            </Link>
          </div>
        </form>
      </section>
    );
  }

  const counterCards = [
    { label: 'Total Received', value: bundle.counters.totalReceived },
    { label: 'Unread', value: bundle.counters.unread },
    { label: 'Under Review', value: bundle.counters.underReview },
    { label: 'Assigned', value: bundle.counters.assigned },
    { label: 'Awaiting Response', value: bundle.counters.awaitingResponse },
    { label: 'Responded', value: bundle.counters.responded },
    { label: 'Resolved', value: bundle.counters.resolved },
    { label: 'Confidential', value: bundle.counters.confidential },
    { label: 'Archived', value: bundle.counters.archived },
  ];

  return (
    <div className="space-y-8">
      {/* Actor Identity & Permission Segregation Banner */}
      <section
        className="p-5 sm:p-6 border flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-recessed)',
        }}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <ShieldCheck className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
            <span className="hd-font-sans text-xs font-semibold tracking-[0.15em] uppercase">
              {bundle.actor.name}
            </span>
            <span
              className="hd-font-sans text-[10px] px-2.5 py-0.5 border uppercase tracking-wider"
              style={{ borderColor: 'var(--hd-rule-strong)' }}
            >
              {bundle.actor.roleSummary}
            </span>
            <span
              className="hd-font-sans text-[10px] px-2.5 py-0.5 border uppercase tracking-wider"
              style={{
                borderColor: bundle.actor.canViewConfidentialSourceDesk
                  ? 'var(--hd-copper)'
                  : 'var(--hd-rule)',
                color: bundle.actor.canViewConfidentialSourceDesk
                  ? 'var(--hd-copper)'
                  : 'var(--hd-fg-muted)',
              }}
            >
              {bundle.actor.canViewConfidentialSourceDesk
                ? 'Source Protection Vault Authorized'
                : 'Non-Confidential Scope Only'}
            </span>
          </div>

          {bundle.actor.authChannel === 'kew_general_admin' && (
            <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
              Segregated Institutional Scope: General Kashmir EcoWatch administrators are strictly
              isolated from confidential Himalayan Dispatch correspondence and restricted source
              records.
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={HDN_ROUTES.editorial}
            className="hd-font-sans px-3.5 py-2 border text-[11px] font-semibold tracking-[0.14em] uppercase hover:opacity-85"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            Editorial CMS
          </Link>
          <button
            type="button"
            onClick={loadBundle}
            className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.14em] uppercase hover:opacity-85"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.14em] uppercase hover:opacity-85"
            style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </section>

      {/* 9 Real Dynamic Database Counters (Zero Fabricated Numbers) */}
      <section
        aria-label="Dynamic Correspondence Counters"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3"
      >
        {counterCards.map((c) => (
          <div
            key={c.label}
            className="p-4 border space-y-1"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <span className="hd-font-sans block text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--hd-fg-muted)' }}>
              {c.label}
            </span>
            <span className="hd-font-display block text-2xl sm:text-3xl font-semibold">
              {c.value}
            </span>
          </div>
        ))}
      </section>

      {error && (
        <div
          role="alert"
          className="p-4 border hd-font-body text-sm"
          style={{
            borderColor: '#B91C1C',
            backgroundColor: 'rgba(185, 28, 28, 0.08)',
          }}
        >
          {error}
        </div>
      )}

      {actionNotice && (
        <div
          className="p-4 border hd-font-body text-sm"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          {actionNotice}
        </div>
      )}

      {/* Main 12-Column Correspondence Workbench */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
        {/* Left 3 Cols: 13 Departmental & Governance Views */}
        <nav
          aria-label="Editorial Correspondence Desks and Views"
          className="xl:col-span-3 border divide-y"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          {EDITORIAL_CORRESPONDENCE_FILTER_VIEWS.map((view) => {
            const isSelected = activeView === view.id;
            return (
              <button
                key={view.id}
                type="button"
                onClick={() => setActiveView(view.id)}
                className="w-full text-left px-4 py-3 flex items-center justify-between gap-2 transition-colors"
                style={{
                  backgroundColor: isSelected ? 'var(--hd-bg-recessed)' : 'transparent',
                  borderColor: 'var(--hd-rule)',
                }}
              >
                <span
                  className="hd-font-sans text-[11px] font-semibold tracking-[0.13em] uppercase"
                  style={{ color: isSelected ? 'var(--hd-copper)' : 'var(--hd-fg)' }}
                >
                  {view.label}
                </span>
                {view.id === 'authorized_kew_evidence' && (
                  <span
                    className="hd-font-sans text-[10px] px-1.5 py-0.5 border"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    {bundle.consentedKewSubmissions.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right 9 Cols: Active View Content */}
        <div className="xl:col-span-9 space-y-6">
          {/* SPECIAL VIEW A: AUTHORIZED KEW EVIDENCE EXCHANGE (PHASE 09) */}
          {activeView === 'authorized_kew_evidence' ? (
            <div className="space-y-8">
              <section
                className="p-6 sm:p-8 border space-y-5"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="space-y-1.5">
                  <p className="hd-kicker">PHASE 09 · CONSENT-GOVERNED CROSS-PLATFORM BRIDGE</p>
                  <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
                    Authorized Kashmir EcoWatch Evidence Ledger
                  </h2>
                  <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                    Displays only Kashmir EcoWatch submissions where the contributor explicitly
                    checked the optional editorial-consideration consent box. KEW records are
                    referenced by tracking ID without duplicating environmental databases, and
                    anonymous contributor identities remain protected.
                  </p>
                </div>

                {bundle.consentedKewSubmissions.length === 0 ? (
                  <div
                    className="p-6 border text-sm hd-font-body"
                    style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
                  >
                    No consented KEW environmental submissions have been logged yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bundle.consentedKewSubmissions.map((item) => (
                      <article
                        key={item.trackingId}
                        className="p-5 border space-y-3"
                        style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <FileCheck2 className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                            <code className="hd-font-sans text-xs font-bold">{item.trackingId}</code>
                            <span className="hd-kicker">
                              {item.sourceLabel} · {item.district}
                            </span>
                          </div>
                          <span className="hd-font-sans text-[10px] uppercase tracking-wider" style={{ color: 'var(--hd-copper)' }}>
                            Contributor Consent Verified
                          </span>
                        </div>

                        <h3 className="hd-font-display text-xl font-semibold">{item.title}</h3>
                        <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                          {item.summaryText}
                        </p>
                        <p className="hd-font-sans text-[11px] uppercase tracking-wider" style={{ color: 'var(--hd-fg-muted)' }}>
                          Contributor Attribution: {item.contributorLabel} · Logged{' '}
                          {new Date(item.createdAt).toLocaleString()}
                        </p>

                        <div className="pt-3 border-t flex flex-col sm:flex-row gap-3" style={{ borderColor: 'var(--hd-rule)' }}>
                          <input
                            type="text"
                            value={requestPurposeById[item.trackingId] || ''}
                            onChange={(e) =>
                              setRequestPurposeById((prev) => ({
                                ...prev,
                                [item.trackingId]: e.target.value,
                              }))
                            }
                            placeholder="State specific investigative or Stage 05 scientific review purpose..."
                            className="flex-1 px-3.5 py-2 border hd-font-body text-sm focus:outline-none"
                            style={{
                              borderColor: 'var(--hd-rule-strong)',
                              backgroundColor: 'var(--hd-bg-elevated)',
                              color: 'var(--hd-fg)',
                            }}
                          />
                          <button
                            type="button"
                            disabled={submittingExchangeFor === item.trackingId}
                            onClick={() => handleRequestKewEvidence(item.trackingId)}
                            className="hd-font-sans px-4 py-2 border text-[11px] font-semibold tracking-[0.15em] uppercase shrink-0"
                            style={{
                              borderColor: 'var(--hd-copper)',
                              backgroundColor: 'var(--hd-copper-solid)',
                              color: '#F2EFE7',
                            }}
                          >
                            {submittingExchangeFor === item.trackingId
                              ? 'Requesting…'
                              : 'Request Editorial Exchange'}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* Evidence Exchange Governance Decisions */}
              <section
                className="p-6 sm:p-8 border space-y-4"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <h3 className="hd-font-display text-2xl font-semibold">
                  Cross-Platform Evidence Exchange Ledger ({bundle.evidenceExchangeRequests.length})
                </h3>
                {bundle.evidenceExchangeRequests.length === 0 ? (
                  <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                    No cross-platform evidence exchange requests recorded yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {bundle.evidenceExchangeRequests.map((ex) => (
                      <div
                        key={ex.id}
                        className="p-4 border flex flex-col md:flex-row md:items-center justify-between gap-4"
                        style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
                      >
                        <div className="space-y-1 text-sm hd-font-body">
                          <div className="flex flex-wrap items-center gap-2">
                            <code className="hd-font-sans text-xs font-bold">
                              {ex.kewTrackingId}
                            </code>
                            <span className="hd-font-sans text-[10px] px-2 py-0.5 border uppercase tracking-wider">
                              {ex.approvalStatus}
                            </span>
                          </div>
                          <p className="font-semibold">{ex.submissionTitle}</p>
                          <p style={{ color: 'var(--hd-fg-secondary)' }}>
                            Purpose: {ex.requestPurpose} (Requested by {ex.requestedByName})
                          </p>
                        </div>

                        {bundle.actor.canApproveKewEvidenceExchange && (
                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleDecideExchange(ex.id, 'approved')}
                              className="hd-font-sans inline-flex items-center gap-1 px-3 py-1.5 border text-[10px] font-semibold uppercase tracking-wider"
                              style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDecideExchange(ex.id, 'denied')}
                              className="hd-font-sans inline-flex items-center gap-1 px-3 py-1.5 border text-[10px] font-semibold uppercase tracking-wider"
                              style={{ borderColor: 'var(--hd-rule-strong)' }}
                            >
                              <XCircle className="w-3.5 h-3.5" /> Deny
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDecideExchange(ex.id, 'revoked')}
                              className="hd-font-sans inline-flex items-center gap-1 px-3 py-1.5 border text-[10px] font-semibold uppercase tracking-wider"
                              style={{ borderColor: 'var(--hd-rule-strong)' }}
                            >
                              Revoke
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          ) : activeView === 'email_alias_architecture' ? (
            /* SPECIAL VIEW: 19 PROPOSED EMAIL ALIASES & CENTRALIZED MAILBOX ARCHITECTURE */
            <div className="space-y-6">
              <section
                className="p-6 sm:p-8 border space-y-5"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="space-y-1">
                    <p className="hd-kicker">CENTRALIZED EMAIL ROUTING ARCHITECTURE</p>
                    <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
                      19 Proposed Departmental &amp; Bureau Aliases → {CENTRALIZED_RECEIVING_MAILBOX}
                    </h2>
                  </div>
                  <span
                    className="hd-font-sans px-3 py-1.5 border text-[10px] font-semibold tracking-[0.14em] uppercase"
                    style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                  >
                    Proposed · Unverified on Mail Server · Hidden Publicly
                  </span>
                </div>

                <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  All 19 ordinary editorial and regional bureau aliases forward into a single
                  centralized receiving mailbox (<code>{CENTRALIZED_RECEIVING_MAILBOX}</code>) with
                  automatic <code>Delivered-To</code> / <code>To</code> header classification into
                  the Editorial Correspondence Center desks below. Public pages continue to use the
                  web-based <strong>Contact the Editorial Desk</strong> portal exclusively until DNS
                  (SPF, DKIM, DMARC) and mail-server alias forwarding are verified.
                </p>

                <div
                  className="p-4 border flex items-start gap-3"
                  style={{
                    borderColor: 'var(--hd-copper)',
                    backgroundColor: 'var(--hd-bg-recessed)',
                  }}
                >
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
                  <p className="hd-font-body text-sm leading-relaxed">
                    <strong>Mandatory Source Protection Exclusion:</strong>{' '}
                    {CONFIDENTIAL_EMAIL_EXCLUSION_RULE}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {PROPOSED_DISPATCH_EMAIL_ALIASES.map((item) => (
                    <div
                      key={item.alias}
                      className="p-4 border space-y-1"
                      style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <code className="hd-font-sans text-xs font-bold break-all">
                          {item.alias}
                        </code>
                        <span
                          className="hd-font-sans text-[9.5px] px-2 py-0.5 border uppercase tracking-wider"
                          style={{ borderColor: 'var(--hd-rule-strong)' }}
                        >
                          {item.group === 'regional_bureau' ? 'Regional Bureau' : 'Departmental'}
                        </span>
                      </div>
                      <p className="hd-font-body text-sm font-medium">
                        {item.departmentOrBureau}
                      </p>
                      <p className="hd-font-sans text-[10px] uppercase tracking-wider" style={{ color: 'var(--hd-fg-muted)' }}>
                        Forwards to {item.forwardsTo} · Auto-Routes to {item.mappedDeskCode}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : activeView === 'audit_logs' ? (
            /* SPECIAL VIEW B: IMMUTABLE AUDIT & ACTIVITY LOGS */
            <section
              className="p-6 sm:p-8 border space-y-5"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="space-y-1">
                <p className="hd-kicker">SECURITY &amp; GOVERNANCE LEDGER</p>
                <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
                  Correspondence Audit &amp; Activity Logs ({bundle.auditLogs.length})
                </h2>
              </div>

              {bundle.auditLogs.length === 0 ? (
                <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                  No correspondence audit events recorded yet.
                </p>
              ) : (
                <div className="divide-y border" style={{ borderColor: 'var(--hd-rule)' }}>
                  {bundle.auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-sm hd-font-body"
                      style={{ backgroundColor: 'var(--hd-bg)' }}
                    >
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <code className="hd-font-sans text-xs font-semibold" style={{ color: 'var(--hd-copper)' }}>
                            {log.action}
                          </code>
                          {log.targetReference && (
                            <code className="hd-font-sans text-xs">{log.targetReference}</code>
                          )}
                          <span className="hd-font-sans text-[10px] uppercase tracking-wider" style={{ color: 'var(--hd-fg-muted)' }}>
                            by {log.actorName} ({log.actorRoleSummary})
                          </span>
                        </div>
                        <p style={{ color: 'var(--hd-fg-secondary)' }}>{log.details}</p>
                      </div>
                      <time
                        className="hd-font-sans text-[11px] uppercase tracking-wider shrink-0"
                        style={{ color: 'var(--hd-fg-muted)' }}
                      >
                        {new Date(log.createdAt).toLocaleString()}
                      </time>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : (
            /* STANDARD CORRESPONDENCE INBOX + DETAIL WORKBENCH */
            <div className="space-y-6">
              {activeView === 'restricted_source_protection' &&
                !bundle.actor.canViewConfidentialSourceDesk && (
                  <div
                    className="p-5 border flex items-start gap-3"
                    style={{
                      borderColor: 'var(--hd-copper)',
                      backgroundColor: 'var(--hd-bg-recessed)',
                    }}
                  >
                    <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
                    <p className="hd-font-body text-sm leading-relaxed">
                      <strong>Restricted Source Protection Segregation:</strong> Your current
                      session does not hold Source Protection Vault clearance. Confidential
                      submissions are strictly withheld from general platform administrators and
                      unauthorized desks.
                    </p>
                  </div>
                )}

              {/* Search & Filter Bar */}
              <div
                className="p-4 border grid grid-cols-1 md:grid-cols-12 gap-3"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <div className="md:col-span-6 relative">
                  <Search
                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search reference, subject, correspondent, or region..."
                    className="w-full pl-10 pr-4 py-2.5 border hd-font-body text-sm focus:outline-none"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg)',
                      color: 'var(--hd-fg)',
                    }}
                  />
                </div>

                <div className="md:col-span-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border hd-font-sans text-xs uppercase tracking-wider focus:outline-none"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg)',
                      color: 'var(--hd-fg)',
                    }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="unread">Unread</option>
                    <option value="under_review">Under Review</option>
                    <option value="assigned">Assigned</option>
                    <option value="awaiting_response">Awaiting Response</option>
                    <option value="responded">Responded</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full px-3 py-2.5 border hd-font-sans text-xs uppercase tracking-wider focus:outline-none"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg)',
                      color: 'var(--hd-fg)',
                    }}
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="standard">Standard</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {filteredRecords.length === 0 ? (
                <div
                  className="p-10 border text-center space-y-2"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <MailOpen className="w-6 h-6 mx-auto" style={{ color: 'var(--hd-fg-muted)' }} />
                  <p className="hd-font-display text-2xl font-semibold">
                    No Correspondence Records in This View
                  </p>
                  <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
                    All counters and queues reflect live database records with zero placeholder
                    data.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Inbox List (5 cols) */}
                  <div
                    className="lg:col-span-5 border divide-y max-h-[780px] overflow-y-auto"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    {filteredRecords.map((rec) => {
                      const active = selectedRecord?.referenceNumber === rec.referenceNumber;
                      return (
                        <button
                          key={rec.id}
                          type="button"
                          onClick={() => setSelectedRef(rec.referenceNumber)}
                          className="w-full text-left p-4 space-y-1.5 transition-colors"
                          style={{
                            backgroundColor: active ? 'var(--hd-bg-recessed)' : 'transparent',
                            borderColor: 'var(--hd-rule)',
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <code
                              className="hd-font-sans text-[11px] font-bold"
                              style={{ color: active ? 'var(--hd-copper)' : 'var(--hd-fg)' }}
                            >
                              {rec.referenceNumber}
                            </code>
                            <span
                              className="hd-font-sans text-[9.5px] px-2 py-0.5 border uppercase tracking-wider"
                              style={{
                                borderColor: !rec.isRead ? 'var(--hd-copper)' : 'var(--hd-rule)',
                                color: !rec.isRead ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                              }}
                            >
                              {!rec.isRead ? 'UNREAD' : rec.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="hd-font-display text-lg font-semibold leading-snug line-clamp-2">
                            {rec.subject}
                          </p>
                          <div
                            className="hd-font-body text-xs flex flex-wrap items-center justify-between gap-2"
                            style={{ color: 'var(--hd-fg-secondary)' }}
                          >
                            <span>{rec.senderName}</span>
                            <span>{rec.assignedDepartment}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Record Inspector & Two-Way Desk Composer (7 cols) */}
                  {selectedRecord && (
                    <div className="lg:col-span-7 space-y-6">
                      {/* Record Header & Quick Actions */}
                      <section
                        className="p-6 border space-y-5"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg-elevated)',
                        }}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <code className="hd-kicker">{selectedRecord.referenceNumber}</code>
                              {selectedRecord.isConfidential && (
                                <span
                                  className="hd-font-sans text-[10px] px-2 py-0.5 border uppercase tracking-wider"
                                  style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                                >
                                  Confidential
                                </span>
                              )}
                            </div>
                            <h3 className="hd-font-display text-2xl font-semibold">
                              {selectedRecord.subject}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleRead(selectedRecord)}
                              className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-semibold uppercase tracking-wider"
                              style={{ borderColor: 'var(--hd-rule-strong)' }}
                            >
                              {selectedRecord.isRead ? (
                                <>
                                  <EyeOff className="w-3 h-3" /> Mark Unread
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" /> Mark Read
                                </>
                              )}
                            </button>

                            {selectedRecord.status !== 'archived' && (
                              <button
                                type="button"
                                onClick={() => handleArchive(selectedRecord)}
                                className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-semibold uppercase tracking-wider"
                                style={{ borderColor: 'var(--hd-rule-strong)' }}
                              >
                                <Archive className="w-3 h-3" /> Archive
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Sender Metadata */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm hd-font-body">
                          <div>
                            <span className="hd-kicker block">CORRESPONDENT</span>
                            <span>{selectedRecord.senderName}</span>
                            {selectedRecord.senderEmail && (
                              <span className="block text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                                {selectedRecord.senderEmail}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="hd-kicker block">CATEGORY &amp; REGION</span>
                            <span>
                              {selectedRecord.categoryLabel} · {selectedRecord.region}
                            </span>
                            {selectedRecord.affiliation && (
                              <span className="block text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                                Affiliation: {selectedRecord.affiliation}
                              </span>
                            )}
                          </div>
                        </div>

                        {selectedRecord.relatedArticleUrl && (
                          <div className="text-xs hd-font-body">
                            <span className="hd-kicker mr-2">RELATED ARTICLE:</span>
                            <a
                              href={selectedRecord.relatedArticleUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="underline break-all"
                              style={{ color: 'var(--hd-copper)' }}
                            >
                              {selectedRecord.relatedArticleUrl}
                            </a>
                          </div>
                        )}

                        {/* Workflow Routing, Priority & Encrypted Internal Notes Form */}
                        <form
                          onSubmit={handleSaveMetadata}
                          className="pt-4 border-t space-y-4"
                          style={{ borderColor: 'var(--hd-rule)' }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="hd-kicker block">STATUS</label>
                              <select
                                value={editStatus}
                                onChange={(e) =>
                                  setEditStatus(e.target.value as CorrespondenceStatus)
                                }
                                className="w-full px-3 py-2 border hd-font-sans text-xs uppercase tracking-wider"
                                style={{
                                  borderColor: 'var(--hd-rule-strong)',
                                  backgroundColor: 'var(--hd-bg)',
                                  color: 'var(--hd-fg)',
                                }}
                              >
                                <option value="unread">Unread</option>
                                <option value="under_review">Under Review</option>
                                <option value="assigned">Assigned</option>
                                <option value="awaiting_response">Awaiting Response</option>
                                <option value="responded">Responded</option>
                                <option value="resolved">Resolved</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="hd-kicker block">PRIORITY</label>
                              <select
                                value={editPriority}
                                onChange={(e) =>
                                  setEditPriority(e.target.value as CorrespondencePriority)
                                }
                                className="w-full px-3 py-2 border hd-font-sans text-xs uppercase tracking-wider"
                                style={{
                                  borderColor: 'var(--hd-rule-strong)',
                                  backgroundColor: 'var(--hd-bg)',
                                  color: 'var(--hd-fg)',
                                }}
                              >
                                <option value="low">Low</option>
                                <option value="standard">Standard</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="hd-kicker block">ASSIGNED EDITORIAL DESK</label>
                              <select
                                value={editDeskCode}
                                onChange={(e) => {
                                  const code = e.target.value;
                                  setEditDeskCode(code);
                                  const match = DESK_OPTIONS.find((d) => d.code === code);
                                  if (match) setEditAssignedDept(match.label);
                                }}
                                className="w-full px-3 py-2 border hd-font-body text-sm"
                                style={{
                                  borderColor: 'var(--hd-rule-strong)',
                                  backgroundColor: 'var(--hd-bg)',
                                  color: 'var(--hd-fg)',
                                }}
                              >
                                {DESK_OPTIONS.map((d) => (
                                  <option key={d.code} value={d.code}>
                                    {d.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="hd-kicker block">REGIONAL BUREAU ASSIGNMENT</label>
                              <select
                                value={editBureau}
                                onChange={(e) => setEditBureau(e.target.value)}
                                className="w-full px-3 py-2 border hd-font-body text-sm"
                                style={{
                                  borderColor: 'var(--hd-rule-strong)',
                                  backgroundColor: 'var(--hd-bg)',
                                  color: 'var(--hd-fg)',
                                }}
                              >
                                {BUREAU_OPTIONS.map((b) => (
                                  <option key={b.value} value={b.value}>
                                    {b.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1 sm:col-span-2">
                              <label className="hd-kicker block">
                                ASSIGNED VERIFIED MASTHEAD PERSONNEL (SYNCHRONIZED REGISTRY)
                              </label>
                              <select
                                value={editEditorSlug}
                                onChange={(e) => setEditEditorSlug(e.target.value)}
                                className="w-full px-3 py-2 border hd-font-body text-sm"
                                style={{
                                  borderColor: 'var(--hd-rule-strong)',
                                  backgroundColor: 'var(--hd-bg)',
                                  color: 'var(--hd-fg)',
                                }}
                              >
                                <option value="">Desk Queue (No Individual Assigned)</option>
                                {(bundle.verifiedPersonnel || []).map((vp) => (
                                  <option key={`${vp.slug}-${vp.roleTitle}`} value={vp.slug}>
                                    {vp.name} — {vp.roleTitle} (Verified)
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="hd-kicker block">
                              INTERNAL EDITORIAL NOTES (ENCRYPTED AT REST · NEVER SHOWN TO SENDER)
                            </label>
                            <textarea
                              rows={2}
                              value={editNotes}
                              onChange={(e) => setEditNotes(e.target.value)}
                              placeholder="Record desk routing notes, verification status, or fact-checking checks..."
                              className="w-full px-3 py-2 border hd-font-body text-sm focus:outline-none"
                              style={{
                                borderColor: 'var(--hd-rule-strong)',
                                backgroundColor: 'var(--hd-bg)',
                                color: 'var(--hd-fg)',
                              }}
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={savingMeta}
                            className="hd-font-sans px-5 py-2.5 border text-[11px] font-semibold tracking-[0.16em] uppercase"
                            style={{
                              borderColor: 'var(--hd-rule-strong)',
                              backgroundColor: 'var(--hd-bg)',
                            }}
                          >
                            {savingMeta ? 'Saving…' : 'Save Routing & Internal Notes'}
                          </button>
                        </form>
                      </section>

                      {/* Thread Messages & Attachments */}
                      <section
                        className="p-6 border space-y-4"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg-elevated)',
                        }}
                      >
                        <h4 className="hd-kicker">
                          THREAD MESSAGES ({selectedRecord.messages.length})
                        </h4>
                        <div className="space-y-3">
                          {selectedRecord.messages.map((m) => (
                            <div
                              key={m.id}
                              className="p-4 border space-y-2"
                              style={{
                                borderColor:
                                  m.senderType === 'editorial_desk'
                                    ? 'var(--hd-copper)'
                                    : 'var(--hd-rule)',
                                backgroundColor: 'var(--hd-bg)',
                              }}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                <span className="hd-font-sans font-semibold uppercase tracking-wider">
                                  {m.senderLabel}{' '}
                                  {m.messageKind === 'evidence_request'
                                    ? '· [Evidence Request]'
                                    : ''}
                                </span>
                                <span style={{ color: 'var(--hd-fg-muted)' }}>
                                  {new Date(m.createdAt).toLocaleString()}
                                </span>
                              </div>
                              <p className="hd-font-body text-sm leading-relaxed whitespace-pre-wrap">
                                {m.body}
                              </p>
                              {m.attachments && m.attachments.length > 0 && (
                                <div className="pt-2 flex flex-wrap gap-2">
                                  {m.attachments.map((att) => (
                                    <a
                                      key={att.id}
                                      href={`/api/himalayan-dispatch/correspondence/attachment/${encodeURIComponent(
                                        att.id
                                      )}`}
                                      className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-1.5 border text-[11px]"
                                      style={{ borderColor: 'var(--hd-rule-strong)' }}
                                    >
                                      <FileText className="w-3.5 h-3.5" />
                                      <span>{att.filename}</span>
                                      <Download className="w-3 h-3" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Two-Way Editorial Reply / Evidence Request Composer */}
                      <section
                        className="p-6 border space-y-4"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg-elevated)',
                        }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h4 className="hd-kicker">TWO-WAY EDITORIAL RESPONSE COMPOSER</h4>
                          <div className="flex items-center gap-3 text-xs hd-font-sans">
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                checked={replyKind === 'editorial_response'}
                                onChange={() => setReplyKind('editorial_response')}
                              />
                              <span>Editorial Response</span>
                            </label>
                            <label className="inline-flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                checked={replyKind === 'evidence_request'}
                                onChange={() => setReplyKind('evidence_request')}
                              />
                              <span>Request Additional Evidence</span>
                            </label>
                          </div>
                        </div>

                        <form onSubmit={handleSendEditorialReply} className="space-y-3">
                          <textarea
                            rows={4}
                            required
                            value={replyBody}
                            onChange={(e) => setReplyBody(e.target.value)}
                            placeholder={
                              replyKind === 'evidence_request'
                                ? 'Specify the exact documentary evidence, coordinates, or clarification requested from the correspondent...'
                                : 'Compose official response from the assigned Himalayan Dispatch editorial desk...'
                            }
                            className="w-full px-4 py-3 border hd-font-body text-sm leading-relaxed focus:outline-none"
                            style={{
                              borderColor: 'var(--hd-rule-strong)',
                              backgroundColor: 'var(--hd-bg)',
                              color: 'var(--hd-fg)',
                            }}
                          />
                          <button
                            type="submit"
                            disabled={sendingReply}
                            className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 border text-xs font-semibold tracking-[0.16em] uppercase"
                            style={{
                              borderColor: 'var(--hd-copper)',
                              backgroundColor: 'var(--hd-copper-solid)',
                              color: '#F2EFE7',
                            }}
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>
                              {sendingReply
                                ? 'TRANSMITTING…'
                                : replyKind === 'evidence_request'
                                ? 'REQUEST ADDITIONAL EVIDENCE'
                                : 'SEND EDITORIAL RESPONSE'}
                            </span>
                          </button>
                        </form>
                      </section>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
