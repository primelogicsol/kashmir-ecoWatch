'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  FilePlus2,
  FileText,
  FolderLock,
  Lock,
  MessageSquare,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useHdnSession } from './HdnNewsroomProvider';
import { HDN_ROUTES } from '@/lib/hdn/routes';
import { HD_ROUTES, toKewPlatformUrl } from '@/lib/himalayan-dispatch-routes';
import { StoryReaderClient } from '@/components/himalayan-dispatch/StoryReaderClient';
import { DispatchThemeProvider } from '@/components/himalayan-dispatch/DispatchThemeContext';
import type {
  HdnArticleManuscript,
  HdnConfidentialSourceRecord,
  HdnEditorialAssignment,
  HdnMediaAsset,
  HdnPublicationStream,
} from '@/types/hdn-newsroom';
import type {
  BureauSlugId,
  EditorialDepartmentId,
  EditorialPitchSubmission,
  MagazineStory,
} from '@/types/himalayan-dispatch';

// ─── 1. REPORTER / JOURNALIST PERSONAL NEWSROOM DASHBOARD (/newsroom) ────────

export function HdnJournalistDashboardView() {
  const { account, hasPerm } = useHdnSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/overview', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setData(d);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-12 text-sm text-slate-500">Loading My Newsroom…</div>;
  const js = data?.journalistSummary || {
    assignmentsCount: 0,
    draftsCount: 0,
    inReviewCount: 0,
    publishedCount: 0,
    recentAssignments: [],
    recentManuscripts: [],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C3125] font-semibold">
            MY NEWSROOM · {account?.assignedBureaus.map((b) => b.toUpperCase()).join(' / ')} DESK
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-0.5">{account?.fullName}</h1>
          <p className="text-xs text-slate-500">
            {account?.primaryRoleTitle} · {account?.basedIn}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={HDN_ROUTES.newStory}
            className="px-4 py-2 rounded-lg bg-[#8C3125] hover:bg-[#74271D] text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <FilePlus2 className="w-4 h-4" />
            <span>New Story</span>
          </Link>
          {hasPerm('workspace:admin') && (
            <Link
              href={HDN_ROUTES.admin}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-slate-100"
            >
              <span>Admin Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Measured KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Assignments', val: js.assignmentsCount, href: HDN_ROUTES.assignments },
          { label: 'Active Drafts', val: js.draftsCount, href: HDN_ROUTES.stories },
          { label: 'In Review', val: js.inReviewCount, href: HDN_ROUTES.stories },
          { label: 'Published', val: js.publishedCount, href: HDN_ROUTES.portfolio },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#8C3125] transition-colors"
          >
            <div className="text-3xl font-bold tabular-nums">{card.val}</div>
            <div className="text-xs text-slate-500 mt-1">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Editorial Assignments */}
        <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Current Editorial Assignments
            </h2>
            <Link href={HDN_ROUTES.assignments} className="text-xs text-[#8C3125] font-semibold hover:underline">
              All Assignments →
            </Link>
          </div>
          {js.recentAssignments.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">
              No active commissions assigned to your desk right now. Propose a story via{' '}
              <Link href={HDN_ROUTES.pitches} className="underline text-[#8C3125]">
                Story Pitches
              </Link>
              .
            </p>
          ) : (
            <div className="space-y-3">
              {js.recentAssignments.map((a: HdnEditorialAssignment) => (
                <div
                  key={a.id}
                  className="p-3.5 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-500">
                      <span>{a.bureauId} bureau</span>
                      <span>·</span>
                      <span>{a.departmentId}</span>
                      {a.isConfidential && (
                        <span className="text-rose-600 font-bold">· CONFIDENTIAL</span>
                      )}
                    </div>
                    <div className="font-semibold text-sm">{a.title}</div>
                    <div className="text-[11px] text-slate-500">
                      Target: {a.targetWordCount} words · Due {a.deadlineIso.slice(0, 10)} · Status:{' '}
                      <strong className="uppercase">{a.status}</strong>
                    </div>
                  </div>
                  <Link
                    href={HDN_ROUTES.assignmentDetail(a.id)}
                    className="px-3 py-1.5 rounded-lg border border-[#8C3125] text-[#8C3125] text-xs font-semibold shrink-0 text-center"
                  >
                    Open Brief
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Manuscripts + Quick Modules */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider">My Recent Manuscripts</h2>
              <Link href={HDN_ROUTES.stories} className="text-xs text-[#8C3125] font-semibold hover:underline">
                Open All →
              </Link>
            </div>
            {js.recentManuscripts.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No manuscripts started yet.</p>
            ) : (
              <div className="space-y-2">
                {js.recentManuscripts.map((m: HdnArticleManuscript) => (
                  <Link
                    key={m.id}
                    href={HDN_ROUTES.editStory(m.id)}
                    className="block p-3 rounded-lg border border-slate-200 hover:border-[#8C3125] space-y-1"
                  >
                    <div className="text-xs font-semibold truncate">{m.headline}</div>
                    <div className="text-[10px] font-mono uppercase text-slate-500">
                      {m.workflowStatus.replace(/_/g, ' ')} · {m.wordCount} words
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Journalist Toolkit
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link href={HDN_ROUTES.research} className="p-2.5 rounded-lg border border-slate-200 hover:border-[#8C3125]">
                KEW AI Research Lab
              </Link>
              <Link href={HDN_ROUTES.sources} className="p-2.5 rounded-lg border border-slate-200 hover:border-[#8C3125]">
                Confidential Sources
              </Link>
              <Link href={HDN_ROUTES.media} className="p-2.5 rounded-lg border border-slate-200 hover:border-[#8C3125]">
                Documentary Media
              </Link>
              <Link href={HDN_ROUTES.messages} className="p-2.5 rounded-lg border border-slate-200 hover:border-[#8C3125]">
                Editorial Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. MY ASSIGNMENTS (/newsroom/assignments) ───────────────────────────────

export function HdnMyAssignmentsView() {
  const [assignments, setAssignments] = useState<HdnEditorialAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/assignments?mine=1', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setAssignments(d.assignments || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            COMMISSIONED WORK
          </p>
          <h1 className="text-2xl font-bold">My Editorial Assignments</h1>
        </div>
        <Link
          href={HDN_ROUTES.pitches}
          className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
        >
          Pitch a New Story →
        </Link>
      </div>

      {loading ? (
        <p className="text-xs text-slate-500">Loading commissions…</p>
      ) : assignments.length === 0 ? (
        <div className="p-8 rounded-xl border border-slate-200 bg-white text-center space-y-2">
          <p className="text-sm font-semibold">No commissions currently assigned to your desk.</p>
          <p className="text-xs text-slate-500">
            Submit a reporting proposal to the Commissioning Desk or create an independent draft.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {assignments.map((a) => (
            <div
              key={a.id}
              className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-bold">
                    {a.status}
                  </span>
                  <span>{a.bureauId} bureau</span>
                  <span>· {a.departmentId}</span>
                  <span>· Priority: {a.priority}</span>
                  {a.isConfidential && (
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                      STRICT CONFIDENTIAL
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold">{a.title}</h2>
                <p className="text-xs text-slate-600 max-w-3xl">{a.editorialBrief}</p>
                <div className="text-[11px] text-slate-500">
                  Commissioning Editor: {a.responsibleEditorName} · Target: {a.targetWordCount} words · Deadline:{' '}
                  {a.deadlineIso.slice(0, 10)}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={HDN_ROUTES.assignmentDetail(a.id)}
                  className="px-4 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold"
                >
                  Open Assignment Workspace
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 3. INDIVIDUAL ASSIGNMENT DETAIL (/newsroom/assignments/[id]) ────────────

export function HdnAssignmentDetailView({ assignmentId }: { assignmentId: string }) {
  const router = useRouter();
  const [asg, setAsg] = useState<HdnEditorialAssignment | null>(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/api/himalayan-dispatch/hdn/assignments?id=${encodeURIComponent(assignmentId)}`,
      { credentials: 'include' }
    );
    const d = await res.json();
    if (!res.ok || !d.success) setError(d.error || 'Assignment not found.');
    else setAsg(d.assignment);
    setLoading(false);
  }, [assignmentId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleStatusOrMessage = async (patch: Record<string, unknown>) => {
    const res = await fetch('/api/himalayan-dispatch/hdn/assignments', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignmentId, ...patch }),
    });
    const d = await res.json();
    if (res.ok && d.success) {
      setAsg(d.assignment);
      setMsg('');
    }
  };

  const handleStartManuscript = async () => {
    if (!asg) return;
    if (asg.linkedManuscriptId) {
      router.push(HDN_ROUTES.editStory(asg.linkedManuscriptId));
      return;
    }
    const res = await fetch('/api/himalayan-dispatch/hdn/manuscripts', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        headline: asg.title,
        standfirst: asg.editorialBrief,
        publicationStream: asg.publicationStream,
        targetEditionSlug: asg.proposedEditionSlug,
        departmentId: asg.departmentId,
        bureauId: asg.bureauId,
        reportingBeatSlug: asg.reportingBeatSlug,
        linkedAssignmentId: asg.id,
        isConfidential: asg.isConfidential,
      }),
    });
    const d = await res.json();
    if (res.ok && d.success) {
      router.push(HDN_ROUTES.editStory(d.manuscript.id));
    }
  };

  if (loading) return <p className="text-xs text-slate-500">Loading commission brief…</p>;
  if (!asg) return <div className="p-5 rounded-xl bg-rose-50 text-rose-800 text-xs">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C3125] font-bold">
              ASSIGNMENT BRIEF · {asg.bureauId.toUpperCase()} BUREAU · {asg.status.toUpperCase()}
            </span>
            <h1 className="text-2xl font-bold">{asg.title}</h1>
          </div>
          <button
            type="button"
            onClick={() => void handleStartManuscript()}
            className="px-4 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer"
          >
            {asg.linkedManuscriptId ? 'Open Linked Manuscript in CMS →' : 'Launch Manuscript in Editorial CMS →'}
          </button>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">{asg.editorialBrief}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500">Assigned Journalist</div>
            <div className="font-semibold mt-0.5">{asg.assignedJournalistName}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500">Responsible Editor</div>
            <div className="font-semibold mt-0.5">{asg.responsibleEditorName}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500">Target Word Count</div>
            <div className="font-semibold mt-0.5">{asg.targetWordCount.toLocaleString()} words</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-slate-500">Filing Deadline</div>
            <div className="font-semibold mt-0.5">{asg.deadlineIso.slice(0, 10)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold uppercase text-[10px] text-slate-500">Research &amp; Scientific Review Requirements</div>
            <p>{asg.researchRequirements}</p>
            <p className="font-semibold text-[#8C3125]">
              Scientific Review: {asg.scientificReviewRequired ? 'Mandatory Stage 08 Gate' : 'Standard Desk Assessment'}
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold uppercase text-[10px] text-slate-500">Media &amp; Deliverables</div>
            <p>{asg.mediaRequirements}</p>
            <p className="text-slate-500">{asg.expectedDeliverables.join(' · ')}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {(['accepted', 'researching', 'drafting', 'submitted'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => void handleStatusOrMessage({ status: st })}
              className={`px-3 py-1.5 rounded text-xs font-semibold border cursor-pointer ${
                asg.status === st
                  ? 'bg-[#8C3125] text-white border-[#8C3125]'
                  : 'border-slate-300'
              }`}
            >
              Mark {st}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Correspondence & Audit History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">Assignment Discussion Thread</h2>
          <div className="flex gap-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Send reporting update or question to commissioning editor…"
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
            <button
              type="button"
              onClick={() => msg.trim() && void handleStatusOrMessage({ message: msg })}
              className="px-3.5 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer"
            >
              Send
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {asg.correspondence.length === 0 ? (
              <p className="text-xs text-slate-500">No messages yet.</p>
            ) : (
              asg.correspondence.map((c) => (
                <div key={c.id} className="p-3 rounded-lg border border-slate-200 text-xs">
                  <div className="font-bold">
                    {c.senderName} <span className="font-normal text-slate-500">({c.senderRoleTitle})</span>
                  </div>
                  <p className="mt-1">{c.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">Assignment History</h2>
          <div className="space-y-2 text-xs">
            {asg.history.map((h) => (
              <div key={h.id} className="py-2 border-b border-slate-100">
                <span className="font-semibold">{h.actorName}</span>: {h.note}
                <div className="text-[10px] text-slate-400">{h.timestamp.slice(0, 16).replace('T', ' ')} UTC</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. MY STORIES (/newsroom/stories) ───────────────────────────────────────

export function HdnMyStoriesView() {
  const [items, setItems] = useState<HdnArticleManuscript[]>([]);
  const [filter, setFilter] = useState<'all' | 'drafts' | 'review' | 'published'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/manuscripts?mine=1', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setItems(d.manuscripts || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((m) => {
    if (filter === 'drafts') return ['assigned', 'researching', 'drafting', 'revision_requested'].includes(m.workflowStatus);
    if (filter === 'review') return ['submitted', 'editorial_review', 'fact_checking', 'scientific_review', 'legal_review', 'copy_editing', 'visual_production', 'ready_for_approval'].includes(m.workflowStatus);
    if (filter === 'published') return m.workflowStatus === 'published';
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            MANUSCRIPT LEDGER
          </p>
          <h1 className="text-2xl font-bold">My Stories &amp; Manuscripts</h1>
        </div>
        <Link
          href={HDN_ROUTES.newStory}
          className="px-4 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Manuscript</span>
        </Link>
      </div>

      <div className="flex gap-2">
        {(['all', 'drafts', 'review', 'published'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase cursor-pointer ${
              filter === f
                ? 'bg-[#8C3125] text-white'
                : 'border border-slate-200 bg-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-xs text-slate-500">Loading manuscripts…</p>
      ) : filtered.length === 0 ? (
        <div className="p-8 rounded-xl border border-slate-200 bg-white text-center text-xs text-slate-500">
          No manuscripts match this filter.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 font-mono uppercase text-[10px] text-slate-500">
              <tr>
                <th className="py-3 px-4">Headline</th>
                <th className="py-3 px-4">Stream / Bureau</th>
                <th className="py-3 px-4">Workflow Stage</th>
                <th className="py-3 px-4">Words</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td className="py-3.5 px-4 font-semibold max-w-md">
                    <div>{m.headline}</div>
                    <div className="text-[11px] font-normal text-slate-500 truncate">{m.standfirst}</div>
                  </td>
                  <td className="py-3.5 px-4 uppercase font-mono text-[10px]">
                    {m.publicationStream.replace('_', ' ')} · {m.bureauId}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 font-mono uppercase text-[10px] font-bold">
                      Stage {m.lifecycleStage} · {m.workflowStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 tabular-nums">{m.wordCount.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={HDN_ROUTES.editStory(m.id)}
                        className="px-2.5 py-1 rounded bg-[#8C3125] text-white font-semibold"
                      >
                        Edit
                      </Link>
                      <Link
                        href={HDN_ROUTES.previewStory(m.id)}
                        className="px-2.5 py-1 rounded border border-slate-300"
                      >
                        Preview
                      </Link>
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

// ─── 5. NEW STORY CREATOR (/newsroom/stories/new) ────────────────────────────

export function HdnNewStoryCreatorView() {
  const router = useRouter();
  const [headline, setHeadline] = useState('');
  const [standfirst, setStandfirst] = useState('');
  const [stream, setStream] = useState<HdnPublicationStream>('monthly_edition');
  const [bureauId, setBureauId] = useState<BureauSlugId>('kashmir');
  const [deptId, setDeptId] = useState<EditorialDepartmentId>('longform-features');
  const [isConfidential, setIsConfidential] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    const res = await fetch('/api/himalayan-dispatch/hdn/manuscripts', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        headline,
        standfirst,
        publicationStream: stream,
        bureauId,
        departmentId: deptId,
        isConfidential,
      }),
    });
    const d = await res.json();
    setCreating(false);
    if (!res.ok || !d.success) {
      setError(d.error || 'Could not initialize manuscript.');
      return;
    }
    router.push(HDN_ROUTES.editStory(d.manuscript.id));
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          BLOCK-BASED EDITORIAL CMS
        </p>
        <h1 className="text-2xl font-bold">Initialize New Manuscript</h1>
        <p className="text-xs text-slate-500 mt-1">
          Creates a private draft in the 18-block Magazine Editorial CMS with automatic version history.
        </p>
      </div>

      {error && <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs">{error}</div>}

      <form
        onSubmit={handleCreate}
        className="p-6 rounded-xl border border-slate-200 bg-white space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold mb-1">Working Headline *</label>
          <input
            required
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g., Winter Air Quality Inversions Across the Srinagar Bowl"
            className="w-full px-3.5 py-2.5 text-sm font-serif rounded-lg border border-slate-300 bg-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1">Standfirst / Deck</label>
          <textarea
            rows={2}
            value={standfirst}
            onChange={(e) => setStandfirst(e.target.value)}
            placeholder="Summarize the core environmental question and reporting angle…"
            className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1">Publication Stream</label>
            <select
              value={stream}
              onChange={(e) => setStream(e.target.value as HdnPublicationStream)}
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            >
              <option value="daily_dispatch">Daily Dispatch</option>
              <option value="monthly_edition">Monthly Edition</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Regional Bureau</label>
            <select
              value={bureauId}
              onChange={(e) => setBureauId(e.target.value as BureauSlugId)}
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            >
              <option value="kashmir">Kashmir Bureau</option>
              <option value="jammu">Jammu Bureau</option>
              <option value="ladakh">Ladakh Bureau</option>
              <option value="ajk">AJ&amp;K Bureau (Est.)</option>
              <option value="gilgit">Gilgit Bureau (Est.)</option>
              <option value="baltistan">Baltistan Bureau (Est.)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Department</label>
            <select
              value={deptId}
              onChange={(e) => setDeptId(e.target.value as EditorialDepartmentId)}
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            >
              <option value="cover-stories">Cover Stories</option>
              <option value="longform-features">Longform Features</option>
              <option value="field-reports">Field Reports</option>
              <option value="investigative-journalism">Investigative Desk</option>
              <option value="photo-essays">The Visual Journal</option>
              <option value="data-journalism">Data Journalism</option>
              <option value="interviews">Interviews</option>
              <option value="editorials">Editorials</option>
            </select>
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={isConfidential}
            onChange={(e) => setIsConfidential(e.target.checked)}
          />
          <span>Classify as Restricted / Confidential Investigation (strict source isolation)</span>
        </label>

        <button
          type="submit"
          disabled={creating}
          className="px-5 py-2.5 rounded-lg bg-[#8C3125] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          {creating ? 'Creating Workspace…' : 'Open in Block Article Editor →'}
        </button>
      </form>
    </div>
  );
}

// ─── 6. FULL ARTICLE PREVIEW (/newsroom/stories/[id]/preview) ────────────────

export function HdnStoryPreviewView({ manuscriptId }: { manuscriptId: string }) {
  const [story, setStory] = useState<MagazineStory | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(manuscriptId)}`, {
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setStory(d.previewStory);
        else setError(d.error || 'Preview unavailable.');
      });
  }, [manuscriptId]);

  if (error) return <div className="p-5 rounded-xl bg-rose-50 text-rose-800 text-xs">{error}</div>;
  if (!story) return <p className="text-xs text-slate-500">Rendering magazine layout preview…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono uppercase text-[#8C3125] font-bold">
          EXACT PUBLIC MAGAZINE SPREAD PREVIEW
        </div>
        <Link
          href={HDN_ROUTES.editStory(manuscriptId)}
          className="px-3.5 py-1.5 rounded-lg bg-[#8C3125] text-white text-xs font-semibold"
        >
          ← Return to Block Editor
        </Link>
      </div>
      <div className="rounded-xl overflow-hidden border border-slate-300 shadow-xl">
        <DispatchThemeProvider>
          <div className="bg-[#F6F3EC] text-[#161514]">
            <StoryReaderClient
              story={story}
              journalist={null}
              nextStory={null}
              disablePublicSharing
            />
          </div>
        </DispatchThemeProvider>
      </div>
    </div>
  );
}

// ─── 7. STORY PITCHES (/newsroom/pitches) ────────────────────────────────────

export function HdnPitchesView() {
  const [pitches, setPitches] = useState<EditorialPitchSubmission[]>([]);
  const [headline, setHeadline] = useState('');
  const [deptId, setDeptId] = useState<EditorialDepartmentId>('field-reports');
  const [region, setRegion] = useState('');
  const [summary, setSummary] = useState('');
  const [sources, setSources] = useState('');
  const [confidential, setConfidential] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/himalayan-dispatch/hdn/assignments', { credentials: 'include' });
    const d = await res.json();
    if (d.success) setPitches(d.pitches || []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/himalayan-dispatch/hdn/assignments', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'submit_pitch',
        proposedHeadline: headline,
        departmentId: deptId,
        region,
        storySummary: summary,
        reportingAccessAndSources: sources,
        requiresSourceProtection: confidential,
      }),
    });
    const d = await res.json();
    if (res.ok && d.success) {
      setHeadline('');
      setSummary('');
      setSources('');
      setNotice(`Story pitch submitted under tracking code ${d.pitch.trackingCode}.`);
      void load();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
        <h1 className="text-lg font-bold">Submit Editorial Pitch</h1>
        {notice && <div className="p-3 rounded bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            required
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Proposed Headline *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
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
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="District / Watershed"
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
          </div>
          <textarea
            required
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Core thesis, environmental stakes, and why now (min 20 chars) *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <textarea
            rows={2}
            value={sources}
            onChange={(e) => setSources(e.target.value)}
            placeholder="Field access, datasets, and primary sources (never paste raw whistleblower IDs)"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={confidential}
              onChange={(e) => setConfidential(e.target.checked)}
            />
            <span>Requires encrypted source protection handoff</span>
          </label>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer"
          >
            File Pitch with Commissioning Desk
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 bg-white space-y-3">
        <h2 className="text-lg font-bold">Tracked Story Pitches ({pitches.length})</h2>
        {pitches.length === 0 ? (
          <p className="text-xs text-slate-500">No pitches on file yet.</p>
        ) : (
          <div className="space-y-3">
            {pitches.map((p) => (
              <div key={p.id} className="p-3.5 rounded-lg border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-500">
                  <span>{p.trackingCode} · {p.region}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 font-bold">
                    {p.workflowStage}
                  </span>
                </div>
                <div className="font-bold text-sm">{p.proposedHeadline}</div>
                <p className="text-slate-600">{p.storySummary}</p>
                {p.reviewNotes && (
                  <p className="text-[#8C3125] font-medium pt-1">
                    Editor Note: {p.reviewNotes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 8. RESEARCH LIBRARY & KEW AI RESEARCH ASSISTANT (/newsroom/research) ───

export function HdnResearchAiLabView() {
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setBusy(true);
    const res = await fetch('/api/himalayan-dispatch/hdn/research-assist', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const d = await res.json();
    setBusy(false);
    if (d.success) setResult(d);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          HUMAN + AI RESEARCH COLLABORATION
        </p>
        <h1 className="text-2xl font-bold">Research Library &amp; KEW Scientific Intelligence Lab</h1>
        <p className="text-xs text-slate-500 mt-1">
          Query Kashmir EcoWatch observatories and verified HD-ANIE source dossiers for baselines, outlines, and citation checks. Never fabricates quotes or field measurements.
        </p>
      </div>

      <form onSubmit={handleQuery} className="flex gap-2 max-w-2xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search watershed, glacier, wetland, species, or environmental policy (e.g., Wular Lake, Kolahoi)…"
          className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
        />
        <button
          type="submit"
          disabled={busy}
          className="px-5 py-2.5 rounded-xl bg-[#8C3125] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{busy ? 'Retrieving…' : 'Retrieve Evidence'}</span>
        </button>
      </form>

      {result && (
        <div className="space-y-5">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 font-medium">
            {result.governanceBanner}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Verified KEW Scientific Baseline Matches ({result.kewMatches?.length || 0})
              </h2>
              {(result.kewMatches || []).map((k: any) => (
                <div key={k.entityId} className="p-3 rounded-lg border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{k.title}</span>
                    <a
                      href={toKewPlatformUrl(k.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8C3125] underline"
                    >
                      Open Module ↗
                    </a>
                  </div>
                  <p className="text-slate-600">{k.verifiedSummary}</p>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Suggested Manuscript Structure &amp; Headlines
              </h2>
              <div className="space-y-1.5 text-xs">
                {(result.headlineSuggestions || []).map((h: string) => (
                  <div key={h} className="p-2 rounded bg-slate-50 font-serif font-semibold">
                    “{h}”
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-2 text-xs">
                {(result.outlineProposal || []).map((sec: any) => (
                  <div key={sec.section} className="border-l-2 border-[#8C3125] pl-3">
                    <div className="font-bold">{sec.section}</div>
                    <div className="text-slate-500">{sec.guidance}</div>
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

// ─── 9. SOURCE REGISTRY & CONFIDENTIAL VAULT (/newsroom/sources) ─────────────

export function HdnSourcesVaultView() {
  const [sources, setSources] = useState<HdnConfidentialSourceRecord[]>([]);
  const [reveal, setReveal] = useState(false);
  const [codeName, setCodeName] = useState('');
  const [bureauId, setBureauId] = useState<BureauSlugId>('kashmir');
  const [level, setLevel] =
    useState<HdnConfidentialSourceRecord['confidentialityLevel']>('strict_confidential');
  const [publicDesc, setPublicDesc] = useState('');
  const [restrictedNotes, setRestrictedNotes] = useState('');
  const [consentNote, setConsentNote] = useState('Explicit informed consent recorded.');
  const [interviewSummary, setInterviewSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async (withReveal: boolean) => {
    setError(null);
    const res = await fetch(
      `/api/himalayan-dispatch/hdn/verification?revealRestricted=${withReveal ? '1' : '0'}`,
      { credentials: 'include' }
    );
    const d = await res.json();
    if (!res.ok || !d.success) {
      setError(d.error || 'Access restricted.');
    } else {
      setSources(d.sources || []);
    }
  }, []);

  useEffect(() => {
    void load(reveal);
  }, [load, reveal]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/himalayan-dispatch/hdn/verification', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recordType: 'source',
        codeName,
        bureauId,
        confidentialityLevel: level,
        publicDescription: publicDesc,
        restrictedNotes,
        consentRecorded: true,
        consentScopeNote: consentNote,
        newInterview: interviewSummary.trim()
          ? {
              interviewDate: new Date().toISOString().slice(0, 10),
              mode: 'in_person_field',
              permissionStatus:
                level === 'strict_confidential' ? 'deep_background_unattributed' : 'on_record',
              summaryNotes: interviewSummary.trim(),
            }
          : undefined,
      }),
    });
    const d = await res.json();
    if (!res.ok || !d.success) {
      setError(d.error || 'Could not register source.');
    } else {
      setCodeName('');
      setPublicDesc('');
      setRestrictedNotes('');
      setInterviewSummary('');
      setNotice(`Registered protected source ${d.source.codeName} with immutable access audit trail.`);
      void load(reveal);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            SOURCE PROTECTION &amp; INTERVIEW LEDGER
          </p>
          <h1 className="text-2xl font-bold">Source Registry &amp; Confidential Vault</h1>
        </div>
        <button
          type="button"
          onClick={() => setReveal((v) => !v)}
          className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <FolderLock className="w-4 h-4 text-[#8C3125]" />
          <span>{reveal ? 'Mask Restricted Notes' : 'Unlock Restricted Vault (Audited)'}</span>
        </button>
      </div>

      {error && <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs">{error}</div>}
      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleRegister}
          className="lg:col-span-5 p-5 rounded-xl border border-slate-200 bg-white space-y-3"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Register Source &amp; Verified Interview
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <input
              required
              value={codeName}
              onChange={(e) => setCodeName(e.target.value)}
              placeholder="Code Name (e.g., SRC-WULAR-01) *"
              className="px-3 py-2 text-xs font-mono uppercase rounded-lg border border-slate-300 bg-transparent"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as typeof level)}
              className="px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            >
              <option value="standard_on_record">On Record (Public)</option>
              <option value="embargoed_pre_publication">Embargoed Pre-Publication</option>
              <option value="strict_confidential">Strict Confidential</option>
            </select>
          </div>
          <input
            required
            value={publicDesc}
            onChange={(e) => setPublicDesc(e.target.value)}
            placeholder="Safe Role Description (e.g., Senior Hydrological Engineer) *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <textarea
            required
            rows={3}
            value={restrictedNotes}
            onChange={(e) => setRestrictedNotes(e.target.value)}
            placeholder="Restricted verification notes (isolated from public APIs, search & external reviewers) *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <textarea
            rows={2}
            value={interviewSummary}
            onChange={(e) => setInterviewSummary(e.target.value)}
            placeholder="Optional verified interview record / transcript summary & consent note…"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer"
          >
            Save Protected Source Record
          </button>
        </form>

        <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Authorized Source Records ({sources.length})
          </h2>
          {sources.length === 0 ? (
            <p className="text-xs text-slate-500">No source records registered yet.</p>
          ) : (
            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.id} className="p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase">
                    <span className="font-bold text-[#8C3125]">{s.codeName}</span>
                    <span>{s.confidentialityLevel.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="font-semibold">{s.publicDescription}</div>
                  <div className="p-2 rounded bg-slate-50 font-mono text-[11px]">
                    {s.restrictedNotes}
                  </div>
                  {s.interviewRecords.length > 0 && (
                    <div className="text-[11px] text-slate-500">
                      Interviews logged: {s.interviewRecords.length} · Latest: {s.interviewRecords[0].summaryNotes}
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400">
                    Access audit events: {s.accessAuditTrail.length}
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

// ─── 10. VISUAL JOURNALISM & MEDIA LIBRARY (/newsroom/media) ─────────────────

export function HdnMediaLibraryView() {
  const [assets, setAssets] = useState<HdnMediaAsset[]>([]);
  const [canApprove, setCanApprove] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [provenance, setProvenance] =
    useState<HdnMediaAsset['provenanceClassification']>('authentic_documentary_unmodified');

  const load = useCallback(async () => {
    const res = await fetch('/api/himalayan-dispatch/hdn/admin?section=media', {
      credentials: 'include',
    });
    const d = await res.json();
    if (d.success) {
      setAssets(d.mediaAssets || []);
      setCanApprove(Boolean(d.canApproveMedia));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'register_media',
        title,
        url,
        caption,
        locationAndElevation: location,
        provenanceClassification: provenance,
      }),
    });
    if (res.ok) {
      setTitle('');
      setUrl('');
      setCaption('');
      setLocation('');
      void load();
    }
  };

  const handleApprove = async (mediaId: string, status: 'approved' | 'rejected') => {
    await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'approve_media', mediaId, status }),
    });
    void load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Visual Journalism &amp; Documentary Media Library</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleRegister}
          className="lg:col-span-4 p-5 rounded-xl border border-slate-200 bg-white space-y-3"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider">Register Documentary Asset</h2>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Plate / Map / Reel Title *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <input
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Asset Path or URL (e.g., /images/publications/...) *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <select
            value={provenance}
            onChange={(e) => setProvenance(e.target.value as typeof provenance)}
            className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          >
            <option value="authentic_documentary_unmodified">Authentic Documentary Photograph (Unaltered)</option>
            <option value="kew_verified_cartography">KEW Verified Scientific Cartography</option>
            <option value="archival_historical_scan">Archival Historical Scan</option>
            <option value="ai_or_conceptual_labeled">Conceptual Illustration (Explicitly Labeled)</option>
          </select>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location & Elevation (m)"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <textarea
            rows={2}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption, consent & licensing notes…"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <button type="submit" className="w-full py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer">
            Submit to Visual Desk
          </button>
        </form>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assets.map((a) => (
            <div
              key={a.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
            >
              <img src={a.url} alt={a.title} className="w-full h-40 object-cover rounded-lg" />
              <div className="flex items-center justify-between font-mono text-[10px] uppercase">
                <span>{a.provenanceClassification.replace(/_/g, ' ')}</span>
                <span className="font-bold text-[#8C3125]">
                  {a.editorialApprovalStatus}
                </span>
              </div>
              <div className="font-bold text-sm">{a.title}</div>
              <div className="text-slate-500">{a.caption}</div>
              <div className="text-[11px] text-slate-400">
                Credit: {a.photographerOrCreator} · {a.locationAndElevation}
              </div>
              {(a.generationWorkflow || a.evidentiarySuitability || a.publicCaptionPolicyNote) && (
                <div className="pt-2 mt-2 border-t border-slate-100 space-y-1 text-[11px] bg-slate-50 p-2.5 rounded">
                  <div className="font-mono text-[10px] uppercase font-semibold text-slate-600">
                    Admin Provenance Ledger · EXIF: {a.exifPresent ? 'Present' : 'None'} · C2PA/SynthID:{' '}
                    {a.c2paSynthIdDetected ? 'Detected' : 'Not Detected'}
                  </div>
                  {a.evidentiarySuitability && (
                    <div className="text-slate-700">
                      <strong>Suitability:</strong> {a.evidentiarySuitability.replace(/_/g, ' ')}
                    </div>
                  )}
                  {a.generationWorkflow && (
                    <div className="text-slate-600">
                      <strong>Workflow:</strong> {a.generationWorkflow}
                    </div>
                  )}
                  {a.publicCaptionPolicyNote && (
                    <div className="text-[#8C3125]">
                      <strong>Governance Note:</strong> {a.publicCaptionPolicyNote}
                    </div>
                  )}
                </div>
              )}
              {canApprove && a.editorialApprovalStatus === 'pending_review' && (
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => void handleApprove(a.id, 'approved')}
                    className="px-2.5 py-1 rounded bg-emerald-700 text-white font-semibold cursor-pointer"
                  >
                    Approve Plate
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleApprove(a.id, 'rejected')}
                    className="px-2.5 py-1 rounded bg-rose-700 text-white font-semibold cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 11. CALENDAR, MESSAGES, PORTFOLIO & SETTINGS ────────────────────────────

export function HdnCalendarView() {
  const [assignments, setAssignments] = useState<HdnEditorialAssignment[]>([]);
  const [editions, setEditions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/assignments', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setAssignments(d.assignments || []);
          setEditions(d.editions || []);
        }
      });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reporting &amp; Publication Calendar</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">Assignment Deadlines</h2>
          {assignments.map((a) => (
            <div key={a.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold">{a.title}</div>
                <div className="text-slate-500">{a.assignedJournalistName} · {a.bureauId.toUpperCase()}</div>
              </div>
              <span className="font-mono font-bold text-[#8C3125]">
                {a.deadlineIso.slice(0, 10)}
              </span>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider">Monthly Edition Windows</h2>
          {editions.map((ed) => (
            <div key={ed.id} className="p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="font-mono uppercase text-[10px] text-slate-500">{ed.volumeLabel} · {ed.status}</div>
              <div className="font-bold text-sm">{ed.themeTitle}</div>
              <div className="text-slate-500">Readiness: {ed.readinessPercent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HdnMessagesView() {
  const { notifications, hasPerm, refreshSession } = useHdnSession();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState(false);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'broadcast_announcement', title, body }),
    });
    if (res.ok) {
      setTitle('');
      setBody('');
      setSent(true);
      await refreshSession();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editorial Correspondence, Feedback &amp; Announcements</h1>
      {hasPerm('workspace:editorial') && (
        <form
          onSubmit={handleBroadcast}
          className="max-w-2xl p-5 rounded-xl border border-slate-200 bg-white space-y-3"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider">Post Newsroom Desk Notice</h2>
          {sent && <p className="text-xs text-emerald-700 font-semibold">Announcement posted to newsroom.</p>}
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement Subject *"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <textarea
            required
            rows={2}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Editorial desk update, edition close notice, or verification reminder…"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
          />
          <button type="submit" className="px-4 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer">
            Publish Notice
          </button>
        </form>
      )}

      <div className="space-y-3">
        {notifications.map((n) => (
          <Link
            key={n.id}
            href={n.href}
            className="block p-4 rounded-xl border border-slate-200 bg-white space-y-1"
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-500">
              <span>{n.category.replace('_', ' ')}</span>
              <span>{n.createdAt.slice(0, 16).replace('T', ' ')} UTC</span>
            </div>
            <div className="text-sm font-bold">{n.title}</div>
            <p className="text-xs text-slate-600">{n.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function HdnPortfolioView() {
  const { account, refreshSession } = useHdnSession();
  const [bio, setBio] = useState(account?.shortBio || '');
  const [basedIn, setBasedIn] = useState(account?.basedIn || '');
  const [consent, setConsent] = useState(Boolean(account?.publicPortfolioConsent));
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_own_profile',
        shortBio: bio,
        basedIn,
        publicPortfolioConsent: consent,
      }),
    });
    if (res.ok) {
      setSaved(true);
      await refreshSession();
    }
  };

  if (!account) return null;

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Public Journalist Portfolio</h1>
        {account.publicPortfolioApproved && account.publicPortfolioConsent && (
          <Link
            href={HD_ROUTES.journalistPortfolio(account.slug)}
            target="_blank"
            className="text-xs font-semibold text-[#8C3125] underline"
          >
            View Live Public Profile ↗
          </Link>
        )}
      </div>

      <form
        onSubmit={handleSave}
        className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 text-xs"
      >
        {saved && <div className="p-3 rounded bg-emerald-50 text-emerald-800">Saved portfolio settings.</div>}
        <div>
          <label className="block font-semibold mb-1">Verified Name &amp; Editorial Designation</label>
          <input
            disabled
            value={`${account.fullName} — ${account.primaryRoleTitle}`}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 opacity-70 bg-transparent"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Based In / Reporting Region</label>
          <input
            value={basedIn}
            onChange={(e) => setBasedIn(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Professional Biography</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>Consent to public journalist portfolio listing (subject to Editorial Administration approval)</span>
        </label>
        <button type="submit" className="px-4 py-2 rounded-lg bg-[#8C3125] text-white font-semibold cursor-pointer">
          Save Portfolio Preferences
        </button>
      </form>
    </div>
  );
}

export function HdnSettingsCharterView() {
  const { account, permissions } = useHdnSession();
  if (!account) return null;

  return (
    <div className="max-w-3xl space-y-5">
      <h1 className="text-2xl font-bold">Account Settings, Roles &amp; Contributor Agreements</h1>
      <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-slate-500">Authenticated Email</div>
            <div className="font-mono font-semibold mt-0.5">{account.email}</div>
          </div>
          <div>
            <div className="text-slate-500">Contributor Agreement Basis</div>
            <div className="font-semibold mt-0.5 uppercase">{account.contributorAgreementType.replace(/_/g, ' ')}</div>
          </div>
          <div>
            <div className="text-slate-500">Editorial Charter Acceptance</div>
            <div className="font-semibold text-emerald-700 mt-0.5">
              {account.charterAccepted ? 'Verified & Signed' : 'Pending'}
            </div>
          </div>
          <div>
            <div className="text-slate-500">Assigned Regional Bureaus</div>
            <div className="font-semibold mt-0.5 uppercase">{account.assignedBureaus.join(', ')}</div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-2">
          <div className="font-bold uppercase tracking-wider">Assigned RBAC Roles ({account.roles.length})</div>
          <div className="flex flex-wrap gap-1.5">
            {account.roles.map((r) => (
              <span key={r} className="px-2.5 py-1 rounded bg-[#8C3125]/15 text-[#8C3125] font-mono uppercase font-bold">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-2">
          <div className="font-bold uppercase tracking-wider">Effective Server Permissions ({permissions.length})</div>
          <div className="flex flex-wrap gap-1">
            {permissions.map((p) => (
              <span key={p} className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
