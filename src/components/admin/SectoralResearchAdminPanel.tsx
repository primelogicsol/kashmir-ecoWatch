'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  RefreshCw,
  Save,
  Search,
  BarChart3,
  Database,
  Share2,
  Eye,
  Layers,
} from 'lucide-react';
import type { ResearchDossierStatus, ResearchSeriesDossier } from '@/types/sectoral-eia';
import { ADMIN_15_STAGE_LABELS } from '@/data/report-scientific-registries-100';
import { KewOfficialPublicationLogo } from '@/components/common/Logo';

interface DossierAnalyticsEntry {
  reportViews: number;
  pdfViewerOpens: number;
  pdfDownloads: number;
  shareModalOpens: number;
  confirmedExternalShares: Record<string, number>;
  citationExports: Record<string, number>;
  datasetDownloads: Record<string, number>;
  lastInteractionAt?: string;
}

const ALL_STATUSES: ResearchDossierStatus[] = [
  'Proposed',
  'Data Acquisition',
  'Under Investigation',
  'Draft Assessment',
  'Scientific Review',
  'Published',
  'Updated',
  'Archived',
];

export function SectoralResearchAdminPanel({ adminName }: { adminName: string }) {
  const [dossiers, setDossiers] = useState<ResearchSeriesDossier[]>([]);
  const [workflowStages, setWorkflowStages] = useState<string[]>([]);
  const [analyticsMap, setAnalyticsMap] = useState<Record<string, DossierAnalyticsEntry>>({});
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [cohortFilter, setCohortFilter] = useState<string>('ALL');
  const [selectedCode, setSelectedCode] = useState<string>('KEW-SR-2026-04');
  const [dupCheckResult, setDupCheckResult] = useState<string | null>(null);

  // Editor form state for selected dossier
  const [editStatus, setEditStatus] = useState<ResearchDossierStatus>('Published');
  const [editDate, setEditDate] = useState<string>('March 2026');
  const [editTitle, setEditTitle] = useState<string>('');
  const [editAbstract, setEditAbstract] = useState<string>('');
  const [editAuthor, setEditAuthor] = useState<string>('');
  const [editStageIdx, setEditStageIdx] = useState<number>(17);
  const [editChapterNum, setEditChapterNum] = useState<string>('01');
  const [editChapterBody, setEditChapterBody] = useState<string>('');
  const [editVersion, setEditVersion] = useState<string>('v1.1');
  const [editNote, setEditNote] = useState<string>('');
  const [pdfMeta, setPdfMeta] = useState<any>(null);
  const [masterChapters, setMasterChapters] = useState<Array<{ number: string; title: string; paragraphs: string[] }>>([]);
  const [selectedCompletion15, setSelectedCompletion15] = useState<any>(null);
  const [selectedPubClass, setSelectedPubClass] = useState<string>('');
  const [humanPeerReviewConfirmed, setHumanPeerReviewConfirmed] = useState<boolean>(false);
  const [qcSummary, setQcSummary] = useState<any>(null);
  const [lakeSummary, setLakeSummary] = useState<any>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [repRes, subRes] = await Promise.all([
        fetch('/api/sectoral-eia/reports?analytics=true&qc=true'),
        fetch('/api/sectoral-eia/assessments'),
      ]);
      if (repRes.ok) {
        const repJson = await repRes.json();
        if (Array.isArray(repJson.dossiers)) setDossiers(repJson.dossiers);
        if (Array.isArray(repJson.workflowStages)) setWorkflowStages(repJson.workflowStages);
        if (repJson.analytics) setAnalyticsMap(repJson.analytics);
        if (repJson.qualityControl) setQcSummary(repJson.qualityControl);
        if (repJson.lakeInventorySummary) setLakeSummary(repJson.lakeInventorySummary);
      }
      if (subRes.ok) {
        const subJson = await subRes.json();
        if (Array.isArray(subJson.submissions)) setSubmissions(subJson.submissions);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Load master details when selectedCode changes
  useEffect(() => {
    if (!selectedCode) return;
    fetch(`/api/sectoral-eia/reports/${selectedCode.toLowerCase()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.success && data.master) {
          const d: ResearchSeriesDossier = data.master.dossier;
          setEditStatus(d.status);
          setEditDate(d.date);
          setEditTitle(d.title);
          setEditAbstract(d.abstract);
          setEditAuthor(d.author);
          setPdfMeta(data.pdfMetadata || null);
          setSelectedCompletion15(data.master.admin15StageCompletion || null);
          setSelectedPubClass(data.master.evidencePublicationClass || '');
          setHumanPeerReviewConfirmed(false);
          const chs = data.master.chapters || [];
          setMasterChapters(chs);
          if (chs.length > 0) {
            setEditChapterNum(chs[0].number);
            setEditChapterBody((chs[0].paragraphs || []).join('\n\n'));
          }
          const isPub = d.status === 'Published' || d.status === 'Updated';
          setEditStageIdx(isPub ? 17 : 2);
        }
      })
      .catch(() => {});
  }, [selectedCode]);

  const handleSelectChapter = (chNum: string) => {
    setEditChapterNum(chNum);
    const found = masterChapters.find((c) => c.number === chNum);
    if (found) {
      setEditChapterBody((found.paragraphs || []).join('\n\n'));
    }
  };

  const filteredDossiers = useMemo(() => {
    return dossiers.filter((d) => {
      if (statusFilter !== 'ALL' && d.status !== statusFilter) return false;
      if (cohortFilter === 'PRIORITY_15' && typeof d.priorityRank !== 'number') return false;
      if (cohortFilter === 'ORIGINAL_40' && d.sequenceNumber > 40) return false;
      if (cohortFilter === 'EXPANDED_60' && d.sequenceNumber < 41) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return `${d.code} ${d.title} ${d.divisionTitle} ${d.sectorTag} ${d.author}`.toLowerCase().includes(q);
      }
      return true;
    });
  }, [dossiers, statusFilter, cohortFilter, query]);

  const handleRunDuplicationCheck = async () => {
    try {
      const res = await fetch('/api/sectoral-eia/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: selectedCode,
          title: editTitle,
          primaryResearchQuestion: editAbstract,
        }),
      });
      const json = await res.json();
      if (json?.success && json.duplicationCheck) {
        setDupCheckResult(json.duplicationCheck.verdict);
      }
    } catch {}
  };

  const aggregateAnalytics = useMemo(() => {
    let views = 0;
    let pdfOpens = 0;
    let pdfDownloads = 0;
    let externalShares = 0;
    let datasetExports = 0;
    for (const item of Object.values(analyticsMap)) {
      views += item.reportViews || 0;
      pdfOpens += item.pdfViewerOpens || 0;
      pdfDownloads += item.pdfDownloads || 0;
      externalShares += Object.values(item.confirmedExternalShares || {}).reduce((a, b) => a + b, 0);
      datasetExports += Object.values(item.datasetDownloads || {}).reduce((a, b) => a + b, 0);
    }
    return { views, pdfOpens, pdfDownloads, externalShares, datasetExports };
  }, [analyticsMap]);

  const handleSaveDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (editStatus === 'Published' || editStatus === 'Updated') &&
      !humanPeerReviewConfirmed
    ) {
      setNotice(
        'Mandatory Quality Gate Blocked: Confirm documented human scientific peer review before approving a dossier as Published/Updated.'
      );
      return;
    }
    setSaving(true);
    setNotice(null);
    try {
      const paragraphs = editChapterBody
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

      const res = await fetch('/api/sectoral-eia/reports', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: selectedCode,
          status: editStatus,
          date: editDate,
          title: editTitle,
          abstract: editAbstract,
          author: editAuthor,
          isProposedWorkingGroup: !(editStatus === 'Published' || editStatus === 'Updated'),
          workflowStageIndex: editStageIdx,
          customChapterParagraphs:
            paragraphs.length > 0 ? { [editChapterNum]: paragraphs } : undefined,
          version: editVersion,
          note:
            editNote.trim() ||
            `Updated ${selectedCode} (${editStatus}) and synchronized PDF artifact`,
          actor: adminName,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotice(
          `Saved ${selectedCode} (${editStatus}) and invalidated PDF cache. Derived page count & sitemap indexability synchronized.`
        );
        setEditNote('');
        await fetchAll();
        // Refresh PDF metadata for selected dossier
        const detailRes = await fetch(`/api/sectoral-eia/reports/${selectedCode.toLowerCase()}`);
        if (detailRes.ok) {
          const detailJson = await detailRes.json();
          setPdfMeta(detailJson.pdfMetadata || null);
        }
      } else {
        setNotice(`Error: ${json.error || 'Update failed'}`);
      }
    } catch (err: any) {
      setNotice(`Error: ${err?.message || 'Network error'}`);
    }
    setSaving(false);
  };

  const selectedAnalytics = analyticsMap[selectedCode] || {
    reportViews: 0,
    pdfViewerOpens: 0,
    pdfDownloads: 0,
    shareModalOpens: 0,
    confirmedExternalShares: {},
    citationExports: {},
    datasetDownloads: {},
  };

  return (
    <div className="space-y-6">
      {/* Header & Aggregate Analytics Strip */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <KewOfficialPublicationLogo size="sm" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Western Himalayan Scientific Observatory · Institutional Report Builder &amp; Workflow Studio
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                100-Dossier Scientific Research Series Management (23 Sectors · KEW-SR-2026-01 to 100)
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/sectoral-eia/reports"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
              Public Research Library
            </Link>
            <button
              type="button"
              onClick={fetchAll}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Portfolio-Wide Real Scientific Completion Differentiation (Section 30) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="rounded-md border border-emerald-500/30 bg-slate-950 p-3">
            <div className="text-[11px] font-mono text-emerald-400">External Search &amp; Chapters</div>
            <div className="mt-1 text-lg font-bold font-mono text-white">{dossiers.length} / 100</div>
            <div className="text-[10px] text-slate-400">100% externally researched (zero generic templates)</div>
          </div>
          <div className="rounded-md border border-emerald-500/30 bg-slate-950 p-3">
            <div className="text-[11px] font-mono text-emerald-300">Approved Secondary-Data Pubs</div>
            <div className="mt-1 text-lg font-bold font-mono text-white">
              {dossiers.filter((d) => d.status === 'Published' || d.status === 'Updated').length} / 100
            </div>
            <div className="text-[10px] text-slate-400">Revalidated secondary-data assessments (01–04)</div>
          </div>
          <div className="rounded-md border border-cyan-500/30 bg-slate-950 p-3">
            <div className="text-[11px] font-mono text-cyan-300">Awaiting Human Peer Review</div>
            <div className="mt-1 text-lg font-bold font-mono text-white">
              {
                dossiers.filter(
                  (d) =>
                    d.status !== 'Published' &&
                    d.status !== 'Updated' &&
                    d.evidencePublicationClass !== 'Scientific Scoping Dossier'
                ).length
              }{' '}
              / 100
            </div>
            <div className="text-[10px] text-slate-400">Secondary/modelled/systematic syntheses ready for review</div>
          </div>
          <div className="rounded-md border border-amber-500/30 bg-slate-950 p-3">
            <div className="text-[11px] font-mono text-amber-300">Awaiting Field/Lab Campaigns</div>
            <div className="mt-1 text-lg font-bold font-mono text-white">
              {
                dossiers.filter(
                  (d) => d.evidencePublicationClass === 'Scientific Scoping Dossier'
                ).length
              }{' '}
              / 100
            </div>
            <div className="text-[10px] text-slate-400">Require primary UHPLC-MS/qPCR/FTIR/borehole assays</div>
          </div>
        </div>

        {/* Readership, PDF, Dataset & Share Analytics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Report Views', value: aggregateAnalytics.views, icon: Eye, color: 'text-emerald-400' },
            { label: 'PDF Viewer Opens', value: aggregateAnalytics.pdfOpens, icon: FileText, color: 'text-cyan-400' },
            { label: 'Binary PDF Downloads', value: aggregateAnalytics.pdfDownloads, icon: Download, color: 'text-teal-300' },
            { label: 'Confirmed Shares', value: aggregateAnalytics.externalShares, icon: Share2, color: 'text-amber-300' },
            { label: 'Dataset Exports', value: aggregateAnalytics.datasetExports, icon: Database, color: 'text-purple-300' },
          ].map((m) => (
            <div key={m.label} className="rounded-md border border-slate-800 bg-slate-950 p-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{m.label}</span>
                <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
              </div>
              <div className="mt-1 text-lg font-bold font-mono text-white">{m.value}</div>
            </div>
          ))}
        </div>

        {notice && (
          <div className="rounded-md border border-emerald-500/40 bg-emerald-950/40 px-4 py-2.5 text-xs text-emerald-200 flex items-center justify-between">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice(null)} className="text-emerald-300">
              ✕
            </button>
          </div>
        )}

        {/* KEW Scientific Publication Quality Control Acceptance Dashboard (Section 5 & 21) */}
        {qcSummary && (
          <div className="rounded-lg border border-cyan-500/30 bg-slate-950 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                  KEW Scientific Publication Quality Control · Live Automated Gate Audit
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Audited: <strong>{qcSummary.totalReportsAudited}</strong> Dossiers ·{' '}
                  <strong>{qcSummary.totalChaptersInspected}</strong> Chapters ·{' '}
                  <strong>{qcSummary.totalSectorsCovered}</strong> Sectors ·{' '}
                  <strong className="text-emerald-300">
                    {qcSummary.individuallyVerifiedCount} / {qcSummary.totalReportsAudited}
                  </strong>{' '}
                  Passing All 10 Technical Quality Gates
                </div>
              </div>
              {lakeSummary && (
                <div className="text-[11px] font-mono text-emerald-300">
                  Master Lake Registry: {lakeSummary.kashmirDivisionTotalUniqueIdentities} Kashmir Lakes ({lakeSummary.kashmirWithVerifiedTrophicStatus} Trophic-Assessed · {lakeSummary.kashmirRequiringTrophicAssessment} Insufficient Evidence)
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-[11px]">
              {[
                { label: 'Duplicated Content', val: qcSummary.reportsWithDuplicatedContent, ok: qcSummary.reportsWithDuplicatedContent === 0 },
                { label: 'Generic Methodology', val: qcSummary.reportsWithGenericMethodology, ok: qcSummary.reportsWithGenericMethodology === 0 },
                { label: 'Verified References', val: `${qcSummary.reportsWithVerifiedReferences}/${qcSummary.totalReportsAudited}`, ok: qcSummary.reportsWithVerifiedReferences === qcSummary.totalReportsAudited },
                { label: 'Unique Chapters', val: `${qcSummary.reportsWithUniqueScientificChapters}/${qcSummary.totalReportsAudited}`, ok: qcSummary.reportsWithUniqueScientificChapters === qcSummary.totalReportsAudited },
                { label: 'Validated Geography', val: `${qcSummary.reportsWithValidatedGeographicBoundaries}/${qcSummary.totalReportsAudited}`, ok: qcSummary.reportsWithValidatedGeographicBoundaries === qcSummary.totalReportsAudited },
                { label: 'Specific Indicators', val: `${qcSummary.reportsWithReportSpecificIndicators}/${qcSummary.totalReportsAudited}`, ok: qcSummary.reportsWithReportSpecificIndicators === qcSummary.totalReportsAudited },
              ].map((c) => (
                <div key={c.label} className="rounded border border-slate-800 bg-slate-900/90 p-2">
                  <div className="text-slate-400">{c.label}</div>
                  <div className={`font-mono font-bold text-sm mt-0.5 ${c.ok ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {c.val}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px]">
              {(qcSummary.gateSummary || []).map((g: any) => (
                <div
                  key={g.gateId}
                  className="flex items-center justify-between rounded border border-slate-800 bg-slate-900/60 px-2.5 py-1.5"
                >
                  <span className="text-slate-200 font-medium">{g.label}</span>
                  <span className="font-mono text-emerald-300">{g.overallStatus}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main 2-Pane Builder: Left 40-Dossier Selector | Right 19-Stage Editor & PDF Synchronizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 40 Dossiers List */}
        <div className="lg:col-span-4 rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-3">
          <div className="relative">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter KEW-SR-2026-01..100..."
              className="w-full rounded-md border border-slate-700 bg-slate-950 pl-9 pr-3 py-1.5 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-200"
            >
              <option value="ALL">All 100 Dossiers</option>
              <option value="PRIORITY_15">Top-15 Priority</option>
              <option value="ORIGINAL_40">Sectors I–XII (40)</option>
              <option value="EXPANDED_60">Sectors XIII–XXIII (60)</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-200"
            >
              <option value="ALL">All Statuses ({dossiers.length})</option>
              {ALL_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st} ({dossiers.filter((d) => d.status === st).length})
                </option>
              ))}
            </select>
          </div>

          <div className="max-h-[620px] overflow-y-auto space-y-1.5 pr-1">
            {filteredDossiers.map((d) => {
              const active = d.code === selectedCode;
              const isPub = d.status === 'Published' || d.status === 'Updated';
              return (
                <button
                  key={d.code}
                  type="button"
                  onClick={() => setSelectedCode(d.code)}
                  className={`w-full text-left rounded-md border p-2.5 transition-colors ${
                    active
                      ? 'border-emerald-500 bg-emerald-950/40'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-emerald-400">{d.code}</span>
                    <span className={isPub ? 'text-emerald-300' : 'text-amber-300'}>
                      {d.status}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-white line-clamp-2 leading-snug">
                    {d.title}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Sector {d.divisionRoman}</span>
                    <span>{isPub ? `${d.pages} Verified PDF pp.` : `${d.targetPages}p target`}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Dossier Editor, 19-Stage Gate & PDF Asset Inspector */}
        <form
          onSubmit={handleSaveDossier}
          className="lg:col-span-8 rounded-lg border border-slate-800 bg-slate-900 p-5 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-400">{selectedCode}</span>
              <h3 className="text-base font-bold text-white">
                Dossier Metadata, Chapter Content &amp; PDF Publication Synchronizer
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/sectoral-eia/reports/${selectedCode.toLowerCase()}`}
                target="_blank"
                className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-200 hover:text-white"
              >
                <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
                Open Report
              </Link>
              <a
                href={`/api/sectoral-eia/reports/${selectedCode.toLowerCase()}/pdf?disposition=inline&preview=scoping`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-950/50 px-2.5 py-1.5 text-xs font-semibold text-emerald-300"
              >
                <FileText className="h-3.5 w-3.5" />
                Inspect Generated PDF
              </a>
            </div>
          </div>

          {/* 15-Stage Per-Report Scientific Completion & Quality Gate Tracker */}
          {selectedCompletion15 && (
            <div className="rounded-md border border-cyan-500/30 bg-slate-950 p-4 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono font-bold uppercase tracking-wider text-cyan-400">
                    15-Stage Per-Report Completion Audit · {selectedPubClass}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {selectedCompletion15.readinessCategory}
                  </div>
                </div>
                <span className="rounded-sm border border-emerald-500/40 bg-emerald-950/50 px-2.5 py-1 font-mono font-bold text-emerald-300">
                  {selectedCompletion15.completedBooleanStagesCount} / 15 Verified Stages
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                {ADMIN_15_STAGE_LABELS.map((item) => {
                  const val = selectedCompletion15.stages?.[item.key];
                  const isDone =
                    val === true ||
                    val === 'Completed (OA Full Text + Abstracts)' ||
                    val === 'Approved' ||
                    val === 'Approved Secondary-Data Publication';
                  return (
                    <div
                      key={item.key}
                      className={`rounded border px-2.5 py-1.5 text-[11px] flex items-center justify-between gap-1.5 ${
                        isDone
                          ? 'border-emerald-500/30 bg-emerald-950/25 text-emerald-200'
                          : 'border-amber-500/25 bg-amber-950/20 text-amber-200'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="font-mono text-[10px] shrink-0">
                        {typeof val === 'boolean' ? (val ? 'DONE' : 'GATED') : String(val).slice(0, 14)}
                      </span>
                    </div>
                  );
                })}
              </div>
              {(editStatus === 'Published' || editStatus === 'Updated') && (
                <label className="flex items-center gap-2 pt-1 text-xs text-amber-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={humanPeerReviewConfirmed}
                    onChange={(e) => setHumanPeerReviewConfirmed(e.target.checked)}
                    className="rounded border-slate-600 bg-slate-900"
                  />
                  <span>
                    Mandatory Quality Gate: I confirm documented human scientific review &amp; source traceability before saving {selectedCode} as {editStatus}.
                  </span>
                </label>
              )}
            </div>
          )}

          {/* Synchronized PDF Artifact Status */}
          <div className="rounded-md border border-slate-800 bg-slate-950 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="font-mono text-[11px] uppercase text-slate-400">
                Synchronized Binary PDF &amp; Readership Telemetry
              </div>
              {pdfMeta ? (
                <div className="font-mono text-emerald-300">
                  {pdfMeta.filename} · {pdfMeta.pageCount} Verified Pages ·{' '}
                  {(pdfMeta.byteLength / 1024).toFixed(1)} KB · SHA-256 {pdfMeta.sha256.slice(0, 12)}…
                </div>
              ) : (
                <div className="text-amber-300">
                  Public PDF locked while status is {editStatus}. Transition status to Published to
                  activate public PDF &amp; sitemap indexation.
                </div>
              )}
            </div>
            <div className="font-mono text-[11px] text-slate-300">
              Views: {selectedAnalytics.reportViews} · PDF Downloads: {selectedAnalytics.pdfDownloads}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Lifecycle Status (8-Tier)
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as ResearchDossierStatus)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                {ALL_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Publication / Schedule Date
              </label>
              <input
                type="text"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                19-Stage Workflow Gate
              </label>
              <select
                value={editStageIdx}
                onChange={(e) => setEditStageIdx(Number(e.target.value))}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                {workflowStages.map((st, idx) => (
                  <option key={st} value={idx}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Scientific Research Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Lead Investigator / Scientific Working Group
              </label>
              <input
                type="text"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Executive Abstract
              </label>
              <textarea
                rows={3}
                value={editAbstract}
                onChange={(e) => setEditAbstract(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200"
              />
            </div>
          </div>

          {/* Chapter Prose Editor */}
          <div className="rounded-md border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-mono uppercase text-emerald-400">
                Synchronized Chapter Prose Editor (Updates HTML &amp; Regenerated PDF)
              </label>
              <select
                value={editChapterNum}
                onChange={(e) => handleSelectChapter(e.target.value)}
                className="rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-white"
              >
                {masterChapters.map((ch) => (
                  <option key={ch.number} value={ch.number}>
                    Ch {ch.number} — {ch.title}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              rows={5}
              value={editChapterBody}
              onChange={(e) => setEditChapterBody(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Revision Tag</label>
              <input
                type="text"
                value={editVersion}
                onChange={(e) => setEditVersion(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Editorial / Scientific Review Audit Note
              </label>
              <input
                type="text"
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="Document peer-review verification, dataset revision, or errata..."
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunDuplicationCheck}
                className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 px-3 py-2 text-xs font-semibold text-cyan-300"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verify Scope Non-Duplication (vs 100 Dossiers)
              </button>
              {dupCheckResult && (
                <span className="text-[11px] font-mono text-emerald-300 max-w-md">
                  {dupCheckResult}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{saving ? 'Synchronizing Dossier & PDF…' : 'Save Dossier & Regenerate PDF'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Incoming Sectoral EIA Assessment Submissions Triage */}
      {submissions.length > 0 && (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <Layers className="h-3.5 w-3.5" />
            <span>Incoming Stakeholder &amp; Researcher SEIAE Submissions ({submissions.length})</span>
          </div>
          <div className="responsive-table-container rounded-md border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                  <th className="px-3 py-2">Tracking Code</th>
                  <th className="px-3 py-2">Sector</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">District / Watershed</th>
                  <th className="px-3 py-2">Submitting Entity</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="text-slate-200">
                    <td className="px-3 py-2 font-mono text-emerald-400 font-bold">
                      {sub.trackingCode}
                    </td>
                    <td className="px-3 py-2 capitalize">{sub.sector}</td>
                    <td className="px-3 py-2 font-semibold text-white">{sub.title}</td>
                    <td className="px-3 py-2">
                      {sub.district} · {sub.watershed}
                    </td>
                    <td className="px-3 py-2">{sub.submittingEntity}</td>
                    <td className="px-3 py-2 font-mono text-amber-300">{sub.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
