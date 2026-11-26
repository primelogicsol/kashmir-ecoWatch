'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileCheck2,
  Filter,
  FolderKanban,
  Layers,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { HDN_ROUTES } from '@/lib/hdn/routes';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import { useHdnSession } from './HdnNewsroomProvider';
import type {
  HdnArticleManuscript,
  HdnEditorialAssignment,
  HdnFactCheckRecord,
  HdnMonthlyEditionRecord,
  HdnWorkflowStatus,
} from '@/types/hdn-newsroom';
import type { BureauSlugId, EditorialDepartmentId } from '@/types/himalayan-dispatch';

const WORKFLOW_BOARD_COLUMNS: Array<{
  id: HdnWorkflowStatus;
  label: string;
}> = [
  { id: 'assigned', label: 'Assigned' },
  { id: 'researching', label: 'Researching' },
  { id: 'drafting', label: 'Drafting' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'editorial_review', label: 'Editorial Review' },
  { id: 'fact_checking', label: 'Fact-Checking' },
  { id: 'scientific_review', label: 'Scientific Review' },
  { id: 'legal_review', label: 'Legal Review' },
  { id: 'revision_requested', label: 'Revision Requested' },
  { id: 'copy_editing', label: 'Copy Editing' },
  { id: 'visual_production', label: 'Visual Production' },
  { id: 'ready_for_approval', label: 'Ready for Approval' },
  { id: 'approved', label: 'Approved' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'published', label: 'Published' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'withdrawn', label: 'Withdrawn' },
  { id: 'archived', label: 'Archived' },
];

// ─── 1. EDITORIAL DASHBOARD (/newsroom/editorial) ────────────────────────────

export function HdnEditorialDashboardView() {
  const [overview, setOverview] = useState<any>(null);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/overview', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d.success && setOverview(d));
  }, []);

  const adm = overview?.adminCommandSummary;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            EDITORIAL OPERATIONS &amp; DESKS
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold">Editorial CMS Command Desk</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={HDN_ROUTES.editorialWorkflow}
            className="px-4 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold"
          >
            Open 18-Stage Workflow Board →
          </Link>
        </div>
      </div>

      {adm && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'AI Drafts', val: adm.aiDraftsCount, href: HDN_ROUTES.editorialDailyDispatch },
            { label: 'Human Drafts', val: adm.humanDraftsCount, href: HDN_ROUTES.editorialQueue },
            { label: 'Awaiting Review', val: adm.awaitingReviewCount, href: HDN_ROUTES.editorialWorkflow },
            { label: 'Ready to Publish', val: adm.readyToPublishCount, href: HDN_ROUTES.editorialQueue },
            { label: 'Active Commissions', val: adm.activeAssignmentsCount, href: HDN_ROUTES.editorialAssignments },
            { label: 'Published Live', val: adm.publishedStoriesCount, href: HDN_ROUTES.editorialEditions },
          ].map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#8C3125]"
            >
              <div className="text-2xl font-bold tabular-nums">{c.val}</div>
              <div className="text-[11px] text-slate-500 mt-1">{c.label}</div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Commissioning Desk', desc: 'Evaluate pitches & issue 17-field reporting briefs.', href: HDN_ROUTES.editorialCommissioning },
          { title: 'Workflow Production Board', desc: 'Kanban & filtered lifecycle transitions with server gates.', href: HDN_ROUTES.editorialWorkflow },
          { title: 'Regional Bureaus (6 Desks)', desc: 'Kashmir, Jammu, Ladakh, AJ&K, Gilgit & Baltistan desks.', href: HDN_ROUTES.editorialBureaus },
          { title: 'Editorial Departments (7)', desc: 'Cover Stories, Longform, Field, Investigative, Visual, Data & Q&A.', href: HDN_ROUTES.editorialDepartments },
          { title: 'Fact-Checking & Verification', desc: 'Claim-by-claim primary source & corroboration ledger.', href: HDN_ROUTES.editorialVerification },
          { title: 'Monthly Edition Builder', desc: 'Issue theme, cover story, Editor’s Letter & folio sequencing.', href: HDN_ROUTES.editorialEditions },
        ].map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#8C3125] space-y-1.5"
          >
            <div className="font-bold text-sm flex items-center justify-between">
              <span>{m.title}</span>
              <ArrowRight className="w-4 h-4 text-[#8C3125]" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── 2. COMMISSIONING & ASSIGNMENT MANAGEMENT ────────────────────────────────

export function HdnCommissioningAndAssignmentsView({ mode }: { mode: 'commissioning' | 'assignments' }) {
  const [assignments, setAssignments] = useState<HdnEditorialAssignment[]>([]);
  const [pitches, setPitches] = useState<any[]>([]);
  const [journalists, setJournalists] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [journalistSlug, setJournalistSlug] = useState('rafiq-ahmad-bhat');
  const [bureauId, setBureauId] = useState<BureauSlugId>('kashmir');
  const [deptId, setDeptId] = useState<EditorialDepartmentId>('field-reports');
  const [wordCount, setWordCount] = useState(2500);
  const [sciReq, setSciReq] = useState(false);
  const [confidential, setConfidential] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/himalayan-dispatch/hdn/assignments', { credentials: 'include' });
    const d = await res.json();
    if (d.success) {
      setAssignments(d.assignments || []);
      setPitches(d.pitches || []);
      setJournalists(d.journalists || []);
      if (d.journalists?.[0]?.slug && !journalistSlug) setJournalistSlug(d.journalists[0].slug);
    }
  }, [journalistSlug]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleCreateCommission = async (e: React.FormEvent, fromPitchId?: string) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/himalayan-dispatch/hdn/assignments', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        editorialBrief: brief,
        assignedJournalistSlug: journalistSlug,
        bureauId,
        departmentId: deptId,
        targetWordCount: wordCount,
        scientificReviewRequired: sciReq,
        isConfidential: confidential,
        fromPitchId,
      }),
    });
    const d = await res.json();
    if (!res.ok || !d.success) {
      setError(d.error || 'Commission failed.');
    } else {
      setTitle('');
      setBrief('');
      setNotice(`Issued commission "${d.assignment.title}" to ${d.assignment.assignedJournalistName}.`);
      void load();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          STAGE 01–02 · COMMISSIONING &amp; ASSIGNMENTS
        </p>
        <h1 className="text-2xl font-bold">
          {mode === 'commissioning' ? 'Commissioning & Pitch Evaluation Desk' : 'Editorial Assignment Management'}
        </h1>
      </div>

      {error && <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs">{error}</div>}
      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={(e) => void handleCreateCommission(e)}
          className="lg:col-span-5 p-5 rounded-xl border border-slate-200 bg-white space-y-3"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider">Create Editorial Commission</h2>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Assignment Title *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <textarea
            required
            rows={3}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Editorial brief, reporting scope & deliverables *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={journalistSlug}
              onChange={(e) => setJournalistSlug(e.target.value)}
              className="px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            >
              {journalists.map((j) => (
                <option key={j.slug} value={j.slug}>
                  {j.fullName} ({j.roleTitle})
                </option>
              ))}
            </select>
            <select
              value={bureauId}
              onChange={(e) => setBureauId(e.target.value as BureauSlugId)}
              className="px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            >
              <option value="kashmir">Kashmir Bureau</option>
              <option value="jammu">Jammu Bureau</option>
              <option value="ladakh">Ladakh Bureau</option>
              <option value="ajk">AJ&amp;K Bureau (Est.)</option>
              <option value="gilgit">Gilgit Bureau (Est.)</option>
              <option value="baltistan">Baltistan Bureau (Est.)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={deptId}
              onChange={(e) => setDeptId(e.target.value as EditorialDepartmentId)}
              className="px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            >
              <option value="field-reports">Field Reports</option>
              <option value="longform-features">Longform Features</option>
              <option value="investigative-journalism">Investigative Desk</option>
              <option value="data-journalism">Data Journalism</option>
              <option value="photo-essays">The Visual Journal</option>
              <option value="cover-stories">Cover Stories</option>
            </select>
            <input
              type="number"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              placeholder="Target Word Count"
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-1.5 text-xs">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={sciReq} onChange={(e) => setSciReq(e.target.checked)} />
              <span>Require Stage 08 Scientific Review</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={confidential} onChange={(e) => setConfidential(e.target.checked)} />
              <span>Classify as Confidential Investigation</span>
            </label>
          </div>
          <button type="submit" className="w-full py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer">
            Issue Commission &amp; Notify Journalist
          </button>
        </form>

        <div className="lg:col-span-7 space-y-5">
          {mode === 'commissioning' && (
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Incoming Story Pitches ({pitches.length})
              </h2>
              {pitches.length === 0 ? (
                <p className="text-xs text-slate-500">No incoming story pitches awaiting review.</p>
              ) : (
                pitches.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between font-mono text-[10px] uppercase text-slate-500">
                      <span>{p.trackingCode} · {p.authorName}</span>
                      <span>{p.workflowStage}</span>
                    </div>
                    <div className="font-bold text-sm">{p.proposedHeadline}</div>
                    <p className="text-slate-600">{p.storySummary}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setTitle(p.proposedHeadline);
                        setBrief(p.storySummary);
                      }}
                      className="text-[#8C3125] font-semibold hover:underline cursor-pointer"
                    >
                      Load into Commission Form ↑
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Active Commissions ({assignments.length})
            </h2>
            <div className="space-y-2.5">
              {assignments.map((a) => (
                <div key={a.id} className="p-3.5 rounded-lg border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold">{a.title}</div>
                    <div className="text-slate-500">
                      {a.assignedJournalistName} · {a.bureauId.toUpperCase()} · {a.status} · Due {a.deadlineIso.slice(0, 10)}
                    </div>
                  </div>
                  <Link
                    href={HDN_ROUTES.assignmentDetail(a.id)}
                    className="px-3 py-1.5 rounded border border-slate-300 font-semibold shrink-0"
                  >
                    Manage
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. 18-STATUS WORKFLOW PRODUCTION BOARD & UNIFIED QUEUES ─────────────────

export function HdnWorkflowAndQueueView({
  presetView,
}: {
  presetView: 'queue' | 'workflow' | 'copy_editing' | 'visual_production' | 'daily_dispatch' | 'schedule';
}) {
  const { hasPerm } = useHdnSession();
  const [items, setItems] = useState<HdnArticleManuscript[]>([]);
  const [bureauFilter, setBureauFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [streamFilter, setStreamFilter] = useState(
    presetView === 'daily_dispatch' ? 'daily_dispatch' : 'all'
  );
  const [riskFilter, setRiskFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [searchQ, setSearchQ] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (bureauFilter !== 'all') params.set('bureau', bureauFilter);
    if (deptFilter !== 'all') params.set('department', deptFilter);
    if (streamFilter !== 'all') params.set('stream', streamFilter);
    if (riskFilter !== 'all') params.set('risk', riskFilter);
    if (originFilter !== 'all') params.set('origin', originFilter);
    if (searchQ.trim()) params.set('q', searchQ.trim());

    const res = await fetch(`/api/himalayan-dispatch/hdn/manuscripts?${params.toString()}`, {
      credentials: 'include',
    });
    const d = await res.json();
    if (d.success) setItems(d.manuscripts || []);
  }, [bureauFilter, deptFilter, streamFilter, riskFilter, originFilter, searchQ]);

  useEffect(() => {
    void load();
  }, [load]);

  const displayed = useMemo(() => {
    if (presetView === 'copy_editing') {
      return items.filter((m) => ['copy_editing', 'editorial_review', 'submitted'].includes(m.workflowStatus));
    }
    if (presetView === 'visual_production') {
      return items.filter((m) => ['visual_production', 'copy_editing', 'ready_for_approval'].includes(m.workflowStatus));
    }
    if (presetView === 'schedule') {
      return items.filter((m) => ['scheduled', 'ready_for_approval', 'approved'].includes(m.workflowStatus));
    }
    return items;
  }, [items, presetView]);

  const handleTransition = async (id: string, targetStatus: HdnWorkflowStatus) => {
    setError(null);
    const res = await fetch(`/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'transition_workflow', targetStatus }),
    });
    const d = await res.json();
    if (!res.ok || !d.success) {
      setError(d.error || 'Workflow transition blocked by server gate.');
    } else {
      setNotice(`Moved "${d.manuscript.headline}" to ${targetStatus.replace(/_/g, ' ')}.`);
      void load();
    }
  };

  const handlePromoteToMonthly = async (sourceId: string) => {
    const res = await fetch('/api/himalayan-dispatch/hdn/manuscripts', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'promote_to_monthly', sourceId }),
    });
    const d = await res.json();
    if (res.ok && d.success) {
      setNotice(`Promoted into Monthly Edition feature "${d.manuscript.headline}" without overwriting original Daily Dispatch.`);
      void load();
    }
  };

  const titles: Record<typeof presetView, string> = {
    queue: 'Unified Editorial Manuscript Queue (Human + AI)',
    workflow: 'Editorial Production Workflow Board (18 Stages)',
    copy_editing: 'Copy Editing & Literary Style Desk',
    visual_production: 'Visual Production & Plate Verification Desk',
    daily_dispatch: 'Daily Dispatch Continuous Editorial Stream',
    schedule: 'Publication Release Schedule',
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            UNIFIED PUBLISHING PIPELINE
          </p>
          <h1 className="text-2xl font-bold">{titles[presetView]}</h1>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {displayed.length} manuscript(s) matched
        </span>
      </div>

      {/* Multi-Dimensional Filter Bar */}
      <div className="p-3.5 rounded-xl border border-slate-200 bg-white grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
        <input
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Filter headline / author…"
          className="px-2.5 py-1.5 rounded border border-slate-300 bg-transparent"
        />
        <select
          value={bureauFilter}
          onChange={(e) => setBureauFilter(e.target.value)}
          className="px-2 py-1.5 rounded border border-slate-300 bg-transparent"
        >
          <option value="all">All 6 Bureaus</option>
          <option value="kashmir">Kashmir Bureau</option>
          <option value="jammu">Jammu Bureau</option>
          <option value="ladakh">Ladakh Bureau</option>
          <option value="ajk">AJ&amp;K Bureau</option>
          <option value="gilgit">Gilgit Bureau</option>
          <option value="baltistan">Baltistan Bureau</option>
        </select>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-2 py-1.5 rounded border border-slate-300 bg-transparent"
        >
          <option value="all">All Departments</option>
          <option value="cover-stories">Cover Stories</option>
          <option value="longform-features">Longform Features</option>
          <option value="field-reports">Field Reports</option>
          <option value="investigative-journalism">Investigative Desk</option>
          <option value="photo-essays">Visual Journal</option>
          <option value="data-journalism">Data Journalism</option>
        </select>
        <select
          value={streamFilter}
          onChange={(e) => setStreamFilter(e.target.value)}
          className="px-2 py-1.5 rounded border border-slate-300 bg-transparent"
        >
          <option value="all">Both Streams</option>
          <option value="daily_dispatch">Daily Dispatch</option>
          <option value="monthly_edition">Monthly Edition</option>
        </select>
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="px-2 py-1.5 rounded border border-slate-300 bg-transparent"
        >
          <option value="all">All Risk Levels</option>
          <option value="GREEN">GREEN (Low Risk)</option>
          <option value="AMBER">AMBER (Review Req)</option>
          <option value="RED">RED (Legal/Sensitive)</option>
        </select>
        <select
          value={originFilter}
          onChange={(e) => setOriginFilter(e.target.value)}
          className="px-2 py-1.5 rounded border border-slate-300 bg-transparent"
        >
          <option value="all">Human + AI Drafts</option>
          <option value="human_manuscript">Human Authored</option>
          <option value="ai_autonomous_draft">Autonomous HD-ANIE</option>
          <option value="canonical_magazine_story">Published Archive</option>
        </select>
      </div>

      {error && <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs">{error}</div>}
      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      {presetView === 'workflow' ? (
        /* Horizontal Kanban Board across all 18 Editorial Production Statuses */
        <div className="flex gap-4 overflow-x-auto pb-4">
          {WORKFLOW_BOARD_COLUMNS.map((col) => {
            const cards = displayed.filter((m) => m.workflowStatus === col.id);
            return (
              <div
                key={col.id}
                className="w-72 shrink-0 rounded-xl border border-slate-200 bg-slate-100/70 p-3 space-y-2.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider">{col.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-mono font-bold">
                    {cards.length}
                  </span>
                </div>
                <div className="space-y-2 max-h-[540px] overflow-y-auto">
                  {cards.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-lg bg-white border border-slate-200 space-y-2 text-xs shadow-sm"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                        <span>{m.bureauId}</span>
                        <span
                          className={
                            m.riskLevel === 'RED'
                              ? 'text-rose-600 font-bold'
                              : m.riskLevel === 'AMBER'
                                ? 'text-amber-600 font-bold'
                                : 'text-emerald-600 font-bold'
                          }
                        >
                          {m.riskLevel}
                        </span>
                      </div>
                      <Link
                        href={HDN_ROUTES.editStory(m.id)}
                        className="block font-semibold hover:text-[#8C3125] line-clamp-2"
                      >
                        {m.headline}
                      </Link>
                      <div className="text-[11px] text-slate-500 truncate">{m.bylineDisplay}</div>
                      <select
                        value={m.workflowStatus}
                        onChange={(e) =>
                          void handleTransition(m.id, e.target.value as HdnWorkflowStatus)
                        }
                        className="w-full px-2 py-1 text-[11px] rounded border border-slate-300 bg-transparent"
                      >
                        {WORKFLOW_BOARD_COLUMNS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            Move → {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* High-Density Editorial Queue Table */
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 font-mono uppercase text-[10px] text-slate-500">
              <tr>
                <th className="py-3 px-4">Manuscript &amp; Byline</th>
                <th className="py-3 px-4">Origin / Risk</th>
                <th className="py-3 px-4">Bureau / Stream</th>
                <th className="py-3 px-4">Status &amp; Gates</th>
                <th className="py-3 px-4">Editorial Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayed.slice(0, 60).map((m) => (
                <tr key={m.id}>
                  <td className="py-3.5 px-4 max-w-md">
                    <Link href={HDN_ROUTES.editStory(m.id)} className="font-bold hover:text-[#8C3125] block">
                      {m.headline}
                    </Link>
                    <div className="text-[11px] text-slate-500">
                      {m.bylineDisplay} · {m.wordCount} words
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] uppercase">
                    <div>{m.originType === 'ai_autonomous_draft' ? 'AI DESK' : 'HUMAN'}</div>
                    <div
                      className={
                        m.riskLevel === 'RED'
                          ? 'text-rose-600 font-bold'
                          : m.riskLevel === 'AMBER'
                            ? 'text-amber-600 font-bold'
                            : 'text-emerald-600 font-bold'
                      }
                    >
                      {m.riskLevel} RISK
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] uppercase">
                    <div>{m.bureauId}</div>
                    <div className="text-slate-500">{m.publicationStream.replace('_', ' ')}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-[10px] uppercase font-bold">
                      {m.workflowStatus.replace(/_/g, ' ')}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      FC: {m.factCheckCompleted ? '✓' : '○'} · Sci:{' '}
                      {m.scientificReviewCompleted ? '✓' : m.scientificReviewRequired ? 'Req' : '—'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Link
                        href={HDN_ROUTES.editStory(m.id)}
                        className="px-2.5 py-1 rounded bg-[#8C3125] text-white font-semibold"
                      >
                        CMS
                      </Link>
                      <Link
                        href={HDN_ROUTES.previewStory(m.id)}
                        className="px-2.5 py-1 rounded border border-slate-300"
                      >
                        Preview
                      </Link>
                      {hasPerm('publication:publish') && m.workflowStatus !== 'published' && (
                        <button
                          type="button"
                          onClick={() => void handleTransition(m.id, 'published')}
                          className="px-2.5 py-1 rounded bg-emerald-700 text-white font-semibold cursor-pointer"
                        >
                          Publish
                        </button>
                      )}
                      {m.publicationStream === 'daily_dispatch' && hasPerm('edition:manage') && (
                        <button
                          type="button"
                          onClick={() => void handlePromoteToMonthly(m.id)}
                          className="px-2 py-1 rounded border border-amber-500 text-amber-700 font-semibold cursor-pointer"
                          title="Expand into Monthly Edition Feature without overwriting original Daily Dispatch"
                        >
                          → Monthly
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── 4. STRUCTURED FACT-CHECKING WORKSPACE (/newsroom/editorial/verification) ─

export function HdnFactCheckingView() {
  const [factChecks, setFactChecks] = useState<HdnFactCheckRecord[]>([]);
  const [manuscripts, setManuscripts] = useState<any[]>([]);
  const [msId, setMsId] = useState('');
  const [claim, setClaim] = useState('');
  const [classification, setClassification] =
    useState<HdnFactCheckRecord['sourceClassification']>('primary_documentary');
  const [sourceLabel, setSourceLabel] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [status, setStatus] = useState<HdnFactCheckRecord['verificationStatus']>('verified');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/himalayan-dispatch/hdn/verification', { credentials: 'include' });
    const d = await res.json();
    if (d.success) {
      setFactChecks(d.factChecks || []);
      setManuscripts(d.manuscripts || []);
      if (d.manuscripts?.[0]?.id && !msId) setMsId(d.manuscripts[0].id);
    }
  }, [msId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/himalayan-dispatch/hdn/verification', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recordType: 'fact_check',
        manuscriptId: msId,
        claimAssertion: claim,
        sourceClassification: classification,
        supportingSourceLabel: sourceLabel,
        sourceUrl,
        verificationStatus: status,
      }),
    });
    const d = await res.json();
    if (!res.ok || !d.success) setError(d.error || 'Failed to log claim.');
    else {
      setClaim('');
      setSourceLabel('');
      setSourceUrl('');
      void load();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          STAGE 07 · FACT-CHECKING &amp; SOURCE CORROBORATION
        </p>
        <h1 className="text-2xl font-bold">Structured Fact-Checking &amp; Claim Verification Workspace</h1>
      </div>

      {error && <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleLog}
          className="lg:col-span-5 p-5 rounded-xl border border-slate-200 bg-white space-y-3"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider">Verify Material Claim</h2>
          <select
            value={msId}
            onChange={(e) => setMsId(e.target.value)}
            className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          >
            {manuscripts.slice(0, 50).map((m) => (
              <option key={m.id} value={m.id}>
                {m.headline}
              </option>
            ))}
          </select>
          <textarea
            required
            rows={3}
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Exact factual assertion, statistic, elevation, or date to verify *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value as typeof classification)}
            className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          >
            <option value="primary_documentary">Primary Documentary Record / Filing</option>
            <option value="peer_reviewed_scientific">Peer-Reviewed Scientific Paper (DOI)</option>
            <option value="kew_observatory_baseline">KEW Scientific Observatory Baseline</option>
            <option value="independent_corroboration">Independent Multi-Source Corroboration</option>
            <option value="syndicated_single_origin">Syndicated Reporting (Single Origin)</option>
            <option value="unverified">Unverified Material (Hold)</option>
          </select>
          <input
            required
            value={sourceLabel}
            onChange={(e) => setSourceLabel(e.target.value)}
            placeholder="Supporting Source Citation / Agency *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <input
            required
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="Verifiable URL or KEW Route (/water-systems/...) *"
            className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-transparent"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          >
            <option value="verified">Verified</option>
            <option value="partially_verified">Partially Verified (Qualify)</option>
            <option value="disputed">Disputed / Conflicting Evidence</option>
            <option value="unverified_hold">Unverified — Hold Publication</option>
          </select>
          <button type="submit" className="w-full py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer">
            Record Claim Verification
          </button>
        </form>

        <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Claim Verification Ledger ({factChecks.length})
          </h2>
          {factChecks.length === 0 ? (
            <p className="text-xs text-slate-500">No manual claim checks logged yet.</p>
          ) : (
            <div className="space-y-3">
              {factChecks.map((fc) => (
                <div key={fc.id} className="p-3.5 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-mono text-[10px] uppercase">
                    <span className="font-bold text-[#8C3125]">{fc.claimIdentifier}</span>
                    <span>{fc.sourceClassification.replace(/_/g, ' ')} · {fc.verificationStatus}</span>
                  </div>
                  <div className="font-semibold">{fc.claimAssertion}</div>
                  <div className="text-slate-500">
                    Manuscript: {fc.manuscriptTitle} · Source: {fc.supportingSourceLabel} ({fc.sourceUrl})
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Verified by {fc.reviewerName} on {fc.reviewedAt.slice(0, 10)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 5. MONTHLY EDITION BUILDER (/newsroom/editorial/editions) ───────────────

export function HdnMonthlyEditionBuilderView() {
  const { account, hasPerm } = useHdnSession();
  const [editions, setEditions] = useState<HdnMonthlyEditionRecord[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [themeTitle, setThemeTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [letterTitle, setLetterTitle] = useState('');
  const [letterBody, setLetterBody] = useState('');
  const [orderedSlugs, setOrderedSlugs] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/himalayan-dispatch/hdn/editions', { credentials: 'include' });
    const d = await res.json();
    if (d.success) {
      setEditions(d.editions || []);
      setCandidates(d.monthlyCandidates || []);
      const target = d.editions.find((e: any) => e.id === selectedId) || d.editions[1] || d.editions[0];
      if (target) {
        setSelectedId(target.id);
        setThemeTitle(target.themeTitle);
        setIntro(target.editionIntroduction);
        setLetterTitle(target.editorsLetter.title);
        setLetterBody(target.editorsLetter.paragraphs.join('\n\n'));
        setOrderedSlugs(target.orderedStorySlugs || []);
      }
    }
  }, [selectedId]);

  useEffect(() => {
    void load();
  }, [load]);

  const currentEd = editions.find((e) => e.id === selectedId);

  const moveStory = (idx: number, dir: -1 | 1) => {
    setOrderedSlugs((prev) => {
      const next = [...prev];
      const t = idx + dir;
      if (t < 0 || t >= next.length) return prev;
      const [it] = next.splice(idx, 1);
      next.splice(t, 0, it);
      return next;
    });
  };

  const toggleStoryInEdition = (slug: string) => {
    setOrderedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSaveEdition = async (releaseStatus?: string, approveLetter = false) => {
    if (!currentEd) return;
    const res = await fetch('/api/himalayan-dispatch/hdn/editions', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: currentEd.id,
        themeTitle,
        editionIntroduction: intro,
        editorsLetterTitle: letterTitle,
        editorsLetterParagraphs: letterBody
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean),
        approveEditorsLetter: approveLetter,
        orderedStorySlugs: orderedSlugs,
        status: releaseStatus,
      }),
    });
    const d = await res.json();
    if (res.ok && d.success) {
      setNotice(`Saved Monthly Edition "${d.edition.themeTitle}" (${d.edition.orderedStorySlugs.length} stories sequenced).`);
      void load();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            CURATED DIGITAL MAGAZINE BUILDER
          </p>
          <h1 className="text-2xl font-bold">Monthly Edition Architecture &amp; Folio Sequencer</h1>
        </div>
        <div className="flex gap-2">
          {editions.map((ed) => (
            <button
              key={ed.id}
              type="button"
              onClick={() => setSelectedId(ed.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                selectedId === ed.id
                  ? 'bg-[#8C3125] text-white'
                  : 'border border-slate-300'
              }`}
            >
              {ed.volumeLabel}
            </button>
          ))}
        </div>
      </div>

      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      {currentEd && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-[#8C3125]">
                {currentEd.volumeLabel} · {currentEd.status.toUpperCase()} ({currentEd.readinessPercent}% READY)
              </span>
              <Link
                href={HD_ROUTES.issue(currentEd.slug)}
                target="_blank"
                className="text-xs underline text-slate-500"
              >
                Preview Issue Spread ↗
              </Link>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Edition Theme Title</label>
              <input
                value={themeTitle}
                onChange={(e) => setThemeTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm font-serif font-semibold rounded-lg border border-slate-300 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Edition Introduction</label>
              <textarea
                rows={3}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase">Editor’s Letter</label>
                <span className="text-[10px] font-mono text-amber-700">
                  {currentEd.editorsLetter.approvedByFoundingEic
                    ? '✓ Signed by Founding EIC'
                    : 'Governance Lock: Requires Founding EIC Personal Approval'}
                </span>
              </div>
              <input
                value={letterTitle}
                onChange={(e) => setLetterTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
              />
              <textarea
                rows={4}
                value={letterBody}
                onChange={(e) => setLetterBody(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-slate-300 bg-transparent font-serif"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => void handleSaveEdition()}
                className="px-4 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer"
              >
                Save Edition Plan
              </button>
              {account?.roles.includes('founding_eic') && !currentEd.editorsLetter.approvedByFoundingEic && (
                <button
                  type="button"
                  onClick={() => void handleSaveEdition(undefined, true)}
                  className="px-3.5 py-2 rounded-lg border border-[#8C3125] text-[#8C3125] text-xs font-semibold cursor-pointer"
                >
                  Approve &amp; Sign Editor’s Letter
                </button>
              )}
              {hasPerm('edition:approve_release') && currentEd.status !== 'current' && (
                <button
                  type="button"
                  onClick={() => void handleSaveEdition('current', true)}
                  className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
                >
                  Authorize &amp; Publish as Current Issue
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Table of Contents &amp; Article Sequencing ({orderedSlugs.length})
            </h2>
            <div className="space-y-2">
              {orderedSlugs.map((slug, idx) => {
                const match = candidates.find((c) => c.slug === slug);
                return (
                  <div
                    key={slug}
                    className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="truncate">
                      <span className="font-mono font-bold text-[#8C3125] mr-2">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-semibold">{match?.headline || slug}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button type="button" onClick={() => moveStory(idx, -1)} className="p-1 border rounded">
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button type="button" onClick={() => moveStory(idx, 1)} className="p-1 border rounded">
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStoryInEdition(slug)}
                        className="px-2 py-0.5 text-[10px] text-rose-600 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <h3 className="text-xs font-bold uppercase text-slate-500">
                Available Monthly Edition Manuscripts
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-1.5">
                {candidates
                  .filter((c) => !orderedSlugs.includes(c.slug))
                  .map((c) => (
                    <div
                      key={c.id}
                      className="p-2 rounded border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="truncate">{c.headline}</span>
                      <button
                        type="button"
                        onClick={() => toggleStoryInEdition(c.slug)}
                        className="px-2.5 py-1 rounded bg-slate-800 text-white text-[10px] font-semibold shrink-0 cursor-pointer"
                      >
                        + Add to Issue
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 6. CORRECTIONS & ACCOUNTABILITY DESK (/newsroom/editorial/corrections) ──

export function HdnCorrectionsDeskView() {
  const [manuscripts, setManuscripts] = useState<HdnArticleManuscript[]>([]);
  const [targetId, setTargetId] = useState('');
  const [kind, setKind] = useState<'Clarification' | 'Correction' | 'Editorial Update'>('Clarification');
  const [note, setNote] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/himalayan-dispatch/hdn/manuscripts?status=published', {
      credentials: 'include',
    });
    const d = await res.json();
    if (d.success) {
      setManuscripts(d.manuscripts || []);
      if (d.manuscripts?.[0]?.id && !targetId) setTargetId(d.manuscripts[0].id);
    }
  }, [targetId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleAppend = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(targetId)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'append_correction', kind, note }),
    });
    if (res.ok) {
      setNote('');
      setNotice('Published transparent correction to article colophon & public Corrections Ledger.');
      void load();
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          STAGE 14 · POST-PUBLICATION ACCOUNTABILITY
        </p>
        <h1 className="text-2xl font-bold">Corrections, Clarifications &amp; Public Editor Desk</h1>
      </div>

      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      <form
        onSubmit={handleAppend}
        className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 text-xs"
      >
        <h2 className="text-sm font-bold uppercase tracking-wider">Append Signed Correction</h2>
        <select
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
        >
          {manuscripts.map((m) => (
            <option key={m.id} value={m.id}>
              {m.headline}
            </option>
          ))}
        </select>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as typeof kind)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
        >
          <option value="Clarification">Clarification</option>
          <option value="Correction">Factual Correction</option>
          <option value="Editorial Update">Empirical / Post-Publication Update</option>
        </select>
        <textarea
          required
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Transparent note explaining what was amended and why (min 10 chars) *"
          className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
        />
        <button type="submit" className="px-4 py-2 rounded-lg bg-[#8C3125] text-white font-semibold cursor-pointer">
          Publish Signed Correction
        </button>
      </form>
    </div>
  );
}

// ─── 7. PRIVATE REGIONAL BUREAU & DEPARTMENT WORKSPACES ──────────────────────

export function HdnBureausOverviewAndDeskView({ bureauSlug }: { bureauSlug?: string }) {
  const [overview, setOverview] = useState<any>(null);
  const [manuscripts, setManuscripts] = useState<HdnArticleManuscript[]>([]);
  const [assignments, setAssignments] = useState<HdnEditorialAssignment[]>([]);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/overview', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d.success && setOverview(d));
    if (bureauSlug) {
      fetch(`/api/himalayan-dispatch/hdn/manuscripts?bureau=${encodeURIComponent(bureauSlug)}`, {
        credentials: 'include',
      })
        .then((r) => r.json())
        .then((d) => d.success && setManuscripts(d.manuscripts || []));
      fetch(`/api/himalayan-dispatch/hdn/assignments?bureau=${encodeURIComponent(bureauSlug)}`, {
        credentials: 'include',
      })
        .then((r) => r.json())
        .then((d) => d.success && setAssignments(d.assignments || []));
    }
  }, [bureauSlug]);

  const bureaus = overview?.bureaus || [];

  if (!bureauSlug) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            REGIONAL REPORTING NETWORK
          </p>
          <h1 className="text-2xl font-bold">Six Core Regional Bureau Workspaces</h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional reporting desks (establishment statuses preserved transparently without implying physical offices).
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bureaus.map((b: any) => (
            <Link
              key={b.id}
              href={HDN_ROUTES.editorialBureauDesk(b.id)}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#8C3125] space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                <span className="text-[#8C3125] font-bold">{b.code}</span>
                <span>
                  {b.operationalStatus === 'in_establishment'
                    ? 'Reporting Desk in Establishment'
                    : 'Active Reporting Desk'}
                </span>
              </div>
              <h2 className="text-lg font-bold">{b.name}</h2>
              <p className="text-xs text-slate-500 line-clamp-2">{b.mandate}</p>
              <div className="text-xs font-semibold text-[#8C3125] pt-1">
                Open Private Bureau Desk →
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const bureau = bureaus.find((b: any) => b.id === bureauSlug);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            PRIVATE REGIONAL DESK ·{' '}
            {bureau?.operationalStatus === 'in_establishment'
              ? 'REPORTING DESK IN ESTABLISHMENT'
              : 'ACTIVE REPORTING DESK'}
          </p>
          <h1 className="text-2xl font-bold">{bureau?.name || `${bureauSlug.toUpperCase()} Bureau`}</h1>
        </div>
        <Link href={HDN_ROUTES.editorialBureaus} className="text-xs underline">
          ← All 6 Bureaus
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Regional Assignments ({assignments.length})
          </h2>
          {assignments.map((a) => (
            <Link
              key={a.id}
              href={HDN_ROUTES.assignmentDetail(a.id)}
              className="block p-3 rounded-lg border border-slate-200 text-xs"
            >
              <div className="font-bold">{a.title}</div>
              <div className="text-slate-500">{a.assignedJournalistName} · {a.status}</div>
            </Link>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Bureau Manuscripts &amp; Dispatches ({manuscripts.length})
          </h2>
          {manuscripts.slice(0, 15).map((m) => (
            <Link
              key={m.id}
              href={HDN_ROUTES.editStory(m.id)}
              className="block p-3 rounded-lg border border-slate-200 text-xs"
            >
              <div className="font-bold">{m.headline}</div>
              <div className="text-slate-500">
                {m.bylineDisplay} · {m.workflowStatus.replace(/_/g, ' ')}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HdnDepartmentsOverviewAndDeskView({ deptSlug }: { deptSlug?: string }) {
  const [overview, setOverview] = useState<any>(null);
  const [manuscripts, setManuscripts] = useState<HdnArticleManuscript[]>([]);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/overview', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d.success && setOverview(d));
    if (deptSlug) {
      fetch(`/api/himalayan-dispatch/hdn/manuscripts?department=${encodeURIComponent(deptSlug)}`, {
        credentials: 'include',
      })
        .then((r) => r.json())
        .then((d) => d.success && setManuscripts(d.manuscripts || []));
    }
  }, [deptSlug]);

  const departments = overview?.departments || [];

  if (!deptSlug) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Editorial Department Desks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((d: any) => (
            <Link
              key={d.id}
              href={HDN_ROUTES.editorialDepartmentDesk(d.id)}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#8C3125] space-y-1.5"
            >
              <div className="text-[10px] font-mono uppercase text-[#8C3125] font-bold">
                FOLIO {d.folioNumber} · {d.shortLabel}
              </div>
              <h2 className="text-lg font-bold">{d.name}</h2>
              <p className="text-xs text-slate-500 line-clamp-2">{d.editorialMandate}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase">{deptSlug.replace(/-/g, ' ')} Desk</h1>
        <Link href={HDN_ROUTES.editorialDepartments} className="text-xs underline">
          ← All Departments
        </Link>
      </div>
      <div className="space-y-2.5">
        {manuscripts.map((m) => (
          <Link
            key={m.id}
            href={HDN_ROUTES.editStory(m.id)}
            className="block p-4 rounded-xl border border-slate-200 bg-white text-xs"
          >
            <div className="font-bold text-sm">{m.headline}</div>
            <div className="text-slate-500 mt-0.5">
              {m.bylineDisplay} · {m.bureauId.toUpperCase()} · {m.workflowStatus.replace(/_/g, ' ')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
