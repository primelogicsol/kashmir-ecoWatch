'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Eye,
  FileCheck2,
  FolderLock,
  Layers,
  Plus,
  RotateCcw,
  Rss,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { HDN_ROUTES } from '@/lib/hdn/routes';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import { useHdnSession } from './HdnNewsroomProvider';
import { HdAnieCommandCenter } from '@/components/admin/HdAnieCommandCenter';
import { HimalayanDispatchAdminPanel } from '@/components/admin/HimalayanDispatchAdminPanel';
import type { HdnAccountRecord, HdnArticleManuscript, HdnRoleId } from '@/types/hdn-newsroom';
import type { BureauSlugId, EditorialDepartmentId } from '@/types/himalayan-dispatch';

const ADMIN_NAV_CARDS = [
  { label: 'Autonomous Newsroom', desc: 'HD-ANIE 24/7 discovery, clustering & RAG drafts', href: HDN_ROUTES.adminAutonomousEngine },
  { label: 'Editorial CMS Queue', desc: 'Unified human + AI manuscripts & 18-block editor', href: HDN_ROUTES.editorialQueue },
  { label: 'Journalist Registry', desc: 'Provision accounts, multi-role RBAC & access codes', href: HDN_ROUTES.adminJournalists },
  { label: 'Regional Bureaus', desc: '6 reporting desks & establishment governance', href: HDN_ROUTES.adminBureaus },
  { label: 'Editorial Assignments', desc: '17-field briefs, deadlines & commissioning', href: HDN_ROUTES.editorialAssignments },
  { label: 'Monthly Editions', desc: 'Volume/issue builder, cover & TOC sequencing', href: HDN_ROUTES.editorialEditions },
  { label: 'Scientific Review', desc: 'Independent technical peer-review assignments', href: HDN_ROUTES.review },
  { label: 'Source Verification', desc: 'Fact-checking claims & confidential source vault', href: HDN_ROUTES.adminSources },
  { label: 'Media Library', desc: 'Documentary plates, maps & provenance approval', href: HDN_ROUTES.media },
  { label: 'RSS & Syndication', desc: 'feed.xml, sitemaps & quarantine verification', href: HDN_ROUTES.adminSyndication },
  { label: 'Corrections & Ethics', desc: 'Signed post-publication clarifications & Public Editor', href: HDN_ROUTES.editorialCorrections },
  { label: 'Analytics & AI Costs', desc: 'Measured output metrics & spending ceilings', href: HDN_ROUTES.adminResources },
];

// ─── 1. CONSOLIDATED FOUNDER COMMAND CENTER (/newsroom/admin) ────────────────

export function HdnAdminCommandCenterView() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/himalayan-dispatch/hdn/overview', { credentials: 'include' });
    const d = await res.json();
    if (d.success) setData(d);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleQuickPublish = async (id: string) => {
    setError(null);
    const res = await fetch(`/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'transition_workflow', targetStatus: 'published' }),
    });
    const d = await res.json();
    if (!res.ok || !d.success) {
      setError(d.error || 'Publication blocked by required review gate.');
    } else {
      setNotice(`Published "${d.manuscript.headline}" live across Himalayan Dispatch & RSS.`);
      void load();
    }
  };

  if (loading) return <p className="text-xs text-slate-500">Loading Newsroom Command Center…</p>;
  const adm = data?.adminCommandSummary;
  if (!adm) return <p className="text-xs text-rose-600">Administrator authorization required.</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C3125] font-semibold">
            FOUNDING EDITOR-IN-CHIEF &amp; EDITORIAL DIRECTORATE
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-0.5">Newsroom Command Center</h1>
          <p className="text-xs text-slate-500">
            Actual measured operational metrics across human correspondents and the Autonomous AI Engine.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={HDN_ROUTES.adminAutonomousEngine}
            className="px-4 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>HD-ANIE Engine ({adm.anieEngineMode})</span>
          </Link>
          <Link
            href={HDN_ROUTES.newStory}
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
          >
            + New Story
          </Link>
        </div>
      </div>

      {error && <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs">{error}</div>}
      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      {/* 6 Measured Command KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'AI Drafts', val: adm.aiDraftsCount, href: HDN_ROUTES.adminAutonomousEngine },
          { label: 'Human Drafts', val: adm.humanDraftsCount, href: HDN_ROUTES.editorialQueue },
          { label: 'Awaiting Review', val: adm.awaitingReviewCount, href: HDN_ROUTES.editorialWorkflow },
          { label: 'Ready to Publish', val: adm.readyToPublishCount, href: HDN_ROUTES.adminPublications },
          { label: 'Active Assignments', val: adm.activeAssignmentsCount, href: HDN_ROUTES.editorialAssignments },
          { label: 'Published Stories', val: adm.publishedStoriesCount, href: HDN_ROUTES.adminPublications },
        ].map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#8C3125] transition-colors"
          >
            <div className="text-3xl font-bold tabular-nums">{kpi.val}</div>
            <div className="text-xs text-slate-500 mt-1">{kpi.label}</div>
          </Link>
        ))}
      </div>

      {/* Forthcoming Monthly Edition Readiness + Daily Consolidated Approval Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Daily Consolidated Approval Queue
              </h2>
              <p className="text-xs text-slate-500">
                Low-risk verified drafts &amp; approved human manuscripts ready for 1-click release.
              </p>
            </div>
            <Link href={HDN_ROUTES.editorialQueue} className="text-xs text-[#8C3125] font-semibold hover:underline">
              Full Queue →
            </Link>
          </div>

          {adm.consolidatedApprovalQueue.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">
              No manuscripts currently awaiting final release sign-off.
            </p>
          ) : (
            <div className="divide-y divide-slate-200">
              {adm.consolidatedApprovalQueue.map((item: any) => (
                <div
                  key={item.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-slate-500">
                      <span>{item.originType === 'ai_autonomous_draft' ? 'HD-ANIE DESK' : 'HUMAN'}</span>
                      <span>· {item.bureauId}</span>
                      <span>· {item.publicationStream.replace('_', ' ')}</span>
                      <span className="text-emerald-600 font-bold">· {item.riskLevel}</span>
                    </div>
                    <Link href={HDN_ROUTES.editStory(item.id)} className="font-bold text-sm hover:text-[#8C3125] block truncate">
                      {item.headline}
                    </Link>
                    <div className="text-[11px] text-slate-500">
                      By {item.bylineDisplay} · {item.wordCount} words
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={HDN_ROUTES.previewStory(item.id)}
                      className="px-2.5 py-1.5 rounded border border-slate-300"
                    >
                      Preview
                    </Link>
                    <Link
                      href={HDN_ROUTES.editStory(item.id)}
                      className="px-2.5 py-1.5 rounded border border-slate-300"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => void handleQuickPublish(item.id)}
                      className="px-3 py-1.5 rounded bg-[#8C3125] text-white font-semibold cursor-pointer"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Forthcoming Monthly Edition Readiness Card */}
        <div className="lg:col-span-4 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C3125] font-bold">
            FORTHCOMING MONTHLY EDITION
          </p>
          {adm.forthcomingEdition && (
            <>
              <div>
                <div className="text-xs font-mono text-slate-500">{adm.forthcomingEdition.volumeLabel}</div>
                <h3 className="text-lg font-serif font-bold mt-0.5">{adm.forthcomingEdition.title}</h3>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Measured Edition Readiness</span>
                  <span className="text-2xl font-bold text-[#8C3125]">
                    {adm.forthcomingEdition.readinessPercent}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-[#8C3125]"
                    style={{ width: `${adm.forthcomingEdition.readinessPercent}%` }}
                  />
                </div>
              </div>
              <Link
                href={HDN_ROUTES.editorialEditions}
                className="block w-full py-2 text-center rounded-lg border border-[#8C3125] text-[#8C3125] text-xs font-semibold"
              >
                Open Edition Builder →
              </Link>
            </>
          )}

          <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Pending Applications</span>
              <Link href={HDN_ROUTES.adminApplications} className="font-bold underline">
                {adm.pendingApplicationsCount}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Open Story Pitches</span>
              <Link href={HDN_ROUTES.editorialCommissioning} className="font-bold underline">
                {adm.openPitchesCount}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Active Discovery Feeds</span>
              <span className="font-bold">{adm.activeSourcesCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Measured AI Spend (Month)</span>
              <span className="font-mono font-bold text-emerald-700">
                ${Number(adm.measuredAiSpendMonthUsd || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Module Newsroom Administration Grid */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
          Newsroom Administration Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {ADMIN_NAV_CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#8C3125] space-y-1"
            >
              <div className="text-xs font-bold flex items-center justify-between">
                <span>{c.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C3125]" />
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 2. AUTONOMOUS AI NEWSROOM ENGINE (/newsroom/admin/autonomous-engine) ────

export function HdnAdminAutonomousEngineView() {
  const { account } = useHdnSession();
  const [meta, setMeta] = useState<{ journalists: any[]; departments: any[] }>({
    journalists: [],
    departments: [],
  });

  useEffect(() => {
    fetch('/api/himalayan-dispatch/admin', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setMeta({ journalists: d.journalists || [], departments: d.departments || [] });
        }
      });
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
            INTEGRATED AUTONOMOUS NEWSROOM INTELLIGENCE ENGINE
          </p>
          <h1 className="text-2xl font-bold">HD-ANIE Continuous Discovery &amp; Drafting Console</h1>
        </div>
        <Link href={HDN_ROUTES.editorialQueue} className="text-xs font-semibold text-[#8C3125] underline">
          View AI Drafts in Unified Editorial CMS →
        </Link>
      </div>

      <HdAnieCommandCenter
        adminName={account?.fullName || 'Dr. Fayaz Ahmad Khan'}
        journalists={meta.journalists}
        departments={meta.departments}
        onDeskRefresh={() => {}}
      />
    </div>
  );
}

// ─── 3. JOURNALIST REGISTRY & MULTI-ROLE PROVISIONING (/newsroom/admin/journalists) ─

export function HdnAdminJournalistRegistryView() {
  const [accounts, setAccounts] = useState<HdnAccountRecord[]>([]);
  const [roleDefs, setRoleDefs] = useState<Record<string, any>>({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<HdnRoleId>('journalist');
  const [bureau, setBureau] = useState<BureauSlugId>('kashmir');
  const [issuedBanner, setIssuedBanner] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/himalayan-dispatch/hdn/admin', { credentials: 'include' });
    const d = await res.json();
    if (d.success) {
      setAccounts(d.accounts || []);
      setRoleDefs(d.roleDefinitions || {});
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_account',
        fullName,
        email,
        roles: [role],
        assignedBureaus: [bureau],
      }),
    });
    const d = await res.json();
    if (res.ok && d.success) {
      setFullName('');
      setEmail('');
      setIssuedBanner(
        `Provisioned ${d.account.fullName} (${d.account.email}) · Workspace Access Code: ${d.issuedAccessCode}`
      );
      void load();
    }
  };

  const handleStatusToggle = async (acc: HdnAccountRecord) => {
    const nextStatus = acc.status === 'active' ? 'suspended' : 'active';
    await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_account_roles',
        slug: acc.slug,
        status: nextStatus,
      }),
    });
    void load();
  };

  const handlePortfolioApprovalToggle = async (acc: HdnAccountRecord) => {
    await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_account_roles',
        slug: acc.slug,
        publicPortfolioApproved: !acc.publicPortfolioApproved,
      }),
    });
    void load();
  };

  const handleRotateCode = async (slug: string) => {
    const res = await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_account_roles',
        slug,
        rotateAccessCode: true,
      }),
    });
    const d = await res.json();
    if (res.ok && d.rotatedCode) {
      setIssuedBanner(`Rotated workspace access code for ${slug}: ${d.rotatedCode}`);
      void load();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Journalist &amp; Newsroom Personnel Registry</h1>

      {issuedBanner && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold">
          {issuedBanner}
        </div>
      )}

      <form
        onSubmit={handleProvision}
        className="p-5 rounded-xl border border-slate-200 bg-white grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs"
      >
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Verified Full Name *"
          className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
          className="px-3 py-2 rounded-lg border border-slate-300 bg-transparent"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as HdnRoleId)}
          className="px-2.5 py-2 rounded-lg border border-slate-300 bg-transparent"
        >
          {Object.values(roleDefs).map((rd: any) => (
            <option key={rd.id} value={rd.id}>
              {rd.title}
            </option>
          ))}
        </select>
        <select
          value={bureau}
          onChange={(e) => setBureau(e.target.value as BureauSlugId)}
          className="px-2.5 py-2 rounded-lg border border-slate-300 bg-transparent"
        >
          <option value="kashmir">Kashmir Bureau</option>
          <option value="jammu">Jammu Bureau</option>
          <option value="ladakh">Ladakh Bureau</option>
          <option value="ajk">AJ&amp;K Bureau</option>
          <option value="gilgit">Gilgit Bureau</option>
          <option value="baltistan">Baltistan Bureau</option>
        </select>
        <button type="submit" className="px-4 py-2 rounded-lg bg-[#8C3125] text-white font-semibold cursor-pointer">
          + Provision Account
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 font-mono uppercase text-[10px] text-slate-500">
            <tr>
              <th className="py-3 px-4">Personnel</th>
              <th className="py-3 px-4">Assigned RBAC Roles</th>
              <th className="py-3 px-4">Bureaus</th>
              <th className="py-3 px-4">Portfolio / Status</th>
              <th className="py-3 px-4">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {accounts.map((acc) => (
              <tr key={acc.id}>
                <td className="py-3.5 px-4">
                  <div className="font-bold">{acc.fullName}</div>
                  <div className="text-[11px] text-slate-500">{acc.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {acc.roles.map((r) => (
                      <span
                        key={r}
                        className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 font-mono text-[10px] uppercase font-semibold"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-[10px] uppercase">
                  {acc.assignedBureaus.join(', ')}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`font-mono text-[10px] uppercase font-bold ${
                      acc.status === 'active' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {acc.status}
                  </span>
                  <div className="text-[10px] text-slate-500">
                    Public Portfolio: {acc.publicPortfolioApproved ? 'Approved' : 'Private'}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => void handlePortfolioApprovalToggle(acc)}
                      className="px-2 py-1 rounded border border-slate-300 text-[10px] font-semibold cursor-pointer"
                    >
                      {acc.publicPortfolioApproved ? 'Hide Portfolio' : 'Approve Portfolio'}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleRotateCode(acc.slug)}
                      className="px-2 py-1 rounded border border-slate-300 text-[10px] font-semibold cursor-pointer"
                    >
                      Issue Code
                    </button>
                    {acc.slug !== 'dr-fayaz-ahmad-khan' && (
                      <button
                        type="button"
                        onClick={() => void handleStatusToggle(acc)}
                        className="px-2 py-1 rounded border border-rose-300 text-rose-700 text-[10px] font-semibold cursor-pointer"
                      >
                        {acc.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── 4. EXISTING ONBOARDING & MASTHEAD APPOINTMENTS CONSOLE ──────────────────

export function HdnAdminApplicationsAndAppointmentsView({ focus }: { focus: 'applications' | 'appointments' }) {
  const { account } = useHdnSession();
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          {focus === 'applications'
            ? 'CONTRIBUTOR ONBOARDING & CREDENTIAL REVIEW'
            : 'MASTHEAD & EDITORIAL DIRECTORATE GOVERNANCE'}
        </p>
        <h1 className="text-2xl font-bold">
          {focus === 'applications'
            ? 'Journalist & Correspondent Applications Queue'
            : 'Editorial Appointments & Masthead Seats'}
        </h1>
      </div>
      <div className="rounded-2xl bg-slate-950 text-slate-100 p-4 sm:p-6">
        <HimalayanDispatchAdminPanel adminName={account?.fullName || 'Dr. Fayaz Ahmad Khan'} />
      </div>
    </div>
  );
}

// ─── 5. 18-ROLE RBAC & SEPARATION-OF-DUTIES MATRIX (/newsroom/admin/permissions) ─

export function HdnAdminPermissionsMatrixView() {
  const [roleDefs, setRoleDefs] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/admin', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d.success && setRoleDefs(d.roleDefinitions || {}));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#8C3125] font-semibold">
          SERVER-ENFORCED ACCESS GOVERNANCE
        </p>
        <h1 className="text-2xl font-bold">18-Role Newsroom RBAC &amp; Separation-of-Duties Matrix</h1>
        <p className="text-xs text-slate-500 mt-1">
          Enforced server-side on every API route. Ordinary reporters cannot self-publish; external scientific reviewers cannot read confidential source vaults; autonomous AI has zero publication authority.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(roleDefs).map((r: any) => (
          <div
            key={r.id}
            className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">{r.title}</span>
              <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-slate-100">
                {r.tier.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-slate-600">{r.authoritySummary}</p>
            <div className="flex flex-wrap gap-1 pt-1">
              {(r.permissions || []).map((p: string) => (
                <span
                  key={p}
                  className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 font-mono text-[9px]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 6. PUBLICATIONS, SYNDICATION, ANALYTICS, RESOURCES, AUDIT & TRASH ───────

export function HdnAdminPublicationsAndTrashView({ mode }: { mode: 'publications' | 'trash' }) {
  const [items, setItems] = useState<HdnArticleManuscript[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (mode === 'trash') {
      const res = await fetch('/api/himalayan-dispatch/hdn/admin', { credentials: 'include' });
      const d = await res.json();
      if (d.success) setItems(d.trashedManuscripts || []);
    } else {
      const res = await fetch('/api/himalayan-dispatch/hdn/manuscripts', { credentials: 'include' });
      const d = await res.json();
      if (d.success) setItems(d.manuscripts || []);
    }
  }, [mode]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleAction = async (id: string, payload: Record<string, unknown>) => {
    const res = await fetch(`/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'transition_workflow', ...payload }),
    });
    const d = await res.json();
    if (res.ok && d.success) {
      setNotice(`Updated "${d.manuscript.headline}" (${d.manuscript.workflowStatus}).`);
      void load();
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">
        {mode === 'trash'
          ? 'Recoverable Newsroom Trash'
          : 'Master Publication Control (Daily Dispatch & Monthly Editions)'}
      </h1>
      {notice && <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs">{notice}</div>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50 font-mono uppercase text-[10px] text-slate-500">
            <tr>
              <th className="py-3 px-4">Article</th>
              <th className="py-3 px-4">Stream / Bureau</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Publication Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.slice(0, 60).map((m) => (
              <tr key={m.id}>
                <td className="py-3 px-4 font-semibold max-w-md">
                  <Link href={HDN_ROUTES.editStory(m.id)} className="hover:text-[#8C3125]">
                    {m.headline}
                  </Link>
                  <div className="text-[11px] font-normal text-slate-500">{m.bylineDisplay}</div>
                </td>
                <td className="py-3 px-4 font-mono text-[10px] uppercase">
                  {m.publicationStream.replace('_', ' ')} · {m.bureauId}
                </td>
                <td className="py-3 px-4 font-mono text-[10px] uppercase font-bold">
                  {m.workflowStatus}
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {mode === 'trash' ? (
                      <button
                        type="button"
                        onClick={() => void handleAction(m.id, { signOffGate: 'restore_from_trash' })}
                        className="px-3 py-1 rounded bg-emerald-700 text-white font-semibold cursor-pointer"
                      >
                        Restore Draft
                      </button>
                    ) : (
                      <>
                        {m.workflowStatus !== 'published' ? (
                          <button
                            type="button"
                            onClick={() => void handleAction(m.id, { targetStatus: 'published' })}
                            className="px-2.5 py-1 rounded bg-emerald-700 text-white font-semibold cursor-pointer"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => void handleAction(m.id, { signOffGate: 'unpublish' })}
                            className="px-2.5 py-1 rounded bg-amber-600 text-white font-semibold cursor-pointer"
                          >
                            Unpublish
                          </button>
                        )}
                        {m.workflowStatus !== 'published' && (
                          <button
                            type="button"
                            onClick={() => void handleAction(m.id, { targetStatus: 'trashed' })}
                            className="px-2.5 py-1 rounded border border-rose-300 text-rose-700 font-semibold cursor-pointer"
                          >
                            Move to Trash
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HdnAdminTelemetryViews({
  section,
}: {
  section: 'syndication' | 'analytics' | 'resources' | 'audit';
}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/himalayan-dispatch/hdn/admin', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => d.success && setData(d));
  }, []);

  if (!data) return <p className="text-xs text-slate-500">Loading measured system telemetry…</p>;

  if (section === 'syndication') {
    const syn = data.syndicationStatus;
    return (
      <div className="space-y-5 max-w-3xl">
        <h1 className="text-2xl font-bold">RSS Feed, News Sitemap &amp; Search Quarantine Monitor</h1>
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Published Magazine Stories in RSS</div>
              <div className="text-2xl font-bold mt-1">{syn.publishedStoriesInFeed}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Published Daily Dispatches in RSS</div>
              <div className="text-2xl font-bold mt-1">{syn.publishedDailyDispatchesInFeed}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Unpublished Drafts Quarantined</div>
              <div className="text-2xl font-bold text-amber-600 mt-1">{syn.unpublishedQuarantinedCount}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-slate-500">Protected Confidential Sources</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">{syn.confidentialSourcesProtectedCount}</div>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <Link href={syn.rssFeedRoute} target="_blank" className="text-[#8C3125] font-semibold underline">
              Inspect Live RSS 2.0 XML (/himalayan-dispatch/feed.xml) ↗
            </Link>
            <Link href={syn.sitemapRoute} target="_blank" className="text-slate-600 underline">
              Inspect Canonical Sitemap (/sitemap.xml) ↗
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (section === 'analytics') {
    const an = data.measuredAnalytics;
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Measured Editorial Output &amp; Coverage Analytics</h1>
          <p className="text-xs text-slate-500">
            Displays actual measured repository &amp; store metrics only (zero fabricated traffic numbers).
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="text-2xl font-bold">{an.totalManuscriptsInSystem}</div>
            <div className="text-xs text-slate-500">Total Manuscripts</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="text-2xl font-bold">{an.publishedArticlesCount}</div>
            <div className="text-xs text-slate-500">Published Articles</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="text-2xl font-bold">{an.totalWordsPublished.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Words Published</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="text-2xl font-bold">{an.scientificReviewsCompletedCount}</div>
            <div className="text-xs text-slate-500">Scientific Reviews Completed</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <h2 className="font-bold uppercase tracking-wider">Coverage by Regional Bureau</h2>
            {Object.entries(an.byBureau || {}).map(([bId, counts]: any) => (
              <div key={bId} className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="uppercase font-mono">{bId}</span>
                <span>
                  {counts.published} published / {counts.total} total
                </span>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
            <h2 className="font-bold uppercase tracking-wider">Coverage by Department</h2>
            {Object.entries(an.byDepartment || {}).map(([dId, counts]: any) => (
              <div key={dId} className="flex justify-between py-1.5 border-b border-slate-100">
                <span>{dId}</span>
                <span>
                  {counts.published} published / {counts.total} total
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (section === 'resources') {
    const mb = data.measuredAnalytics?.aiBudgetTelemetry || {};
    return (
      <div className="max-w-3xl space-y-5">
        <h1 className="text-2xl font-bold">AI Operational Costs &amp; Shared KEW Infrastructure</h1>
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 text-xs">
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
            Zero-Duplication Architecture: HDN runs inside the existing Kashmir EcoWatch Next.js + PostgreSQL application ($0.00/month external CMS subscription cost).
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-slate-500">Primary Synthesis Engine</div>
              <div className="font-mono font-bold mt-0.5">{mb.primaryProvider} ({mb.primaryModelName})</div>
            </div>
            <div>
              <div className="text-slate-500">Measured Spend Today / Ceiling</div>
              <div className="font-mono font-bold mt-0.5">
                ${Number(mb.measuredSpentTodayUsd || 0).toFixed(2)} / ${Number(mb.dailySpendingCeilingUsd || 2.5).toFixed(2)} USD
              </div>
            </div>
            <div>
              <div className="text-slate-500">Measured Spend Month / Ceiling</div>
              <div className="font-mono font-bold mt-0.5">
                ${Number(mb.measuredSpentMonthUsd || 0).toFixed(2)} / ${Number(mb.monthlySpendingCeilingUsd || 40).toFixed(2)} USD
              </div>
            </div>
            <div>
              <div className="text-slate-500">External Discovery Calls Logged</div>
              <div className="font-mono font-bold mt-0.5">{mb.measuredExternalDiscoveryCalls || 0}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Audit Logs
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Immutable Security, RBAC &amp; Editorial Audit Logs</h1>
      <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 text-xs">
        {(data.auditLogs || []).map((log: any) => (
          <div key={log.id} className="py-2.5 border-b border-slate-100">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-500">
              <span>
                {log.category} · {log.action}
              </span>
              <span>{log.timestamp.slice(0, 19).replace('T', ' ')} UTC</span>
            </div>
            <div className="font-semibold mt-0.5">
              {log.actorName} ({log.actorRoles?.join(', ')}) — {log.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
