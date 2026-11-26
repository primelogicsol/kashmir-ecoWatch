'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Clock,
  DollarSign,
  Edit3,
  ExternalLink,
  Eye,
  FileCheck2,
  FolderKanban,
  Globe,
  History,
  Image as ImageIcon,
  Layers,
  OctagonAlert,
  Pause,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Star,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react';
import {
  AnieAuditLogEntry,
  AnieBureauId,
  AnieDailyEditorialDigest,
  AnieEditorialDraft,
  AnieEngineMode,
  AnieEngineSubsystemsToggle,
  AnieEvidenceDossier,
  AnieModelAndBudgetConfig,
  AnieMonthlyEditionPlan,
  AniePublicationStream,
  AnieRawSignal,
  AnieSourceRecord,
  AnieStoryCluster,
  AnieWorkerJobRecord,
} from '@/types/hd-anie';
import {
  EditorialDepartment,
  EditorialDepartmentId,
  JournalistProfile,
  MagazineStory,
  StoryChapter,
} from '@/types/himalayan-dispatch';
import { StoryReaderClient } from '@/components/himalayan-dispatch/StoryReaderClient';
import { DispatchThemeProvider } from '@/components/himalayan-dispatch/DispatchThemeContext';
import { hdRoute } from '@/lib/himalayan-dispatch-routes';

const BUREAU_OPTIONS: Array<{ id: AnieBureauId; label: string }> = [
  { id: 'kashmir', label: 'Kashmir Bureau' },
  { id: 'jammu', label: 'Jammu Bureau' },
  { id: 'ladakh', label: 'Ladakh Bureau' },
  { id: 'ajk', label: 'AJ&K Bureau' },
  { id: 'gilgit', label: 'Gilgit Bureau' },
  { id: 'baltistan', label: 'Baltistan Bureau' },
  { id: 'western-himalayas', label: 'Western Himalayan Desk' },
  { id: 'international', label: 'International Environmental Desk' },
];

const VISUAL_DOMAIN_PRESETS = [
  { id: 'cryosphere', label: 'Cryosphere & Glaciers Plate' },
  { id: 'lakes-limnology', label: 'Urban & Alpine Lakes Plate' },
  { id: 'wetlands', label: 'Ramsar Wetlands Plate' },
  { id: 'rivers-hydrology', label: 'Mountain Rivers & Hydrology Plate' },
  { id: 'springs-groundwater', label: 'Karst Springs & High Waters Plate' },
  { id: 'forest-ecosystems', label: 'Temperate Conifer & Treeline Plate' },
  { id: 'atmospheric-systems', label: 'Atmospheric & Inversion Station Plate' },
  { id: 'geomorphology', label: 'Geospatial & Slope-Stability Cartography' },
];

type AnieTabId =
  | 'queue'
  | 'digest'
  | 'edition'
  | 'sources'
  | 'signals'
  | 'dossiers'
  | 'workers'
  | 'audit';

type QueueFilterId =
  | 'all'
  | 'awaiting_review'
  | 'daily_dispatch'
  | 'monthly_edition'
  | 'reviews_held'
  | 'scheduled'
  | 'published'
  | 'rejected'
  | 'trashed';

interface MeasuredMetrics {
  activeSources: number;
  totalSources: number;
  healthySources: number;
  totalSignalsStored: number;
  signalsToday: number;
  acceptedSignals: number;
  rejectedSignals: number;
  clustersCount: number;
  dossiersCount: number;
  awaitingReview: number;
  heldForReview: number;
  inScientificReview: number;
  inLegalReview: number;
  scheduled: number;
  published: number;
  publishedToday: number;
  rejectedDrafts: number;
  trashedDrafts: number;
  monthlyDrafts: number;
  deadLetterCount: number;
}

export function HdAnieCommandCenter({
  adminName,
  journalists,
  departments,
  onDeskRefresh,
}: {
  adminName: string;
  journalists: JournalistProfile[];
  departments: EditorialDepartment[];
  onDeskRefresh: () => Promise<void> | void;
}) {
  const [activeTab, setActiveTab] = useState<AnieTabId>('queue');
  const [queueFilter, setQueueFilter] = useState<QueueFilterId>('awaiting_review');
  const [loading, setLoading] = useState<boolean>(true);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [flashMsg, setFlashMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // Live Measured State
  const [metrics, setMetrics] = useState<MeasuredMetrics | null>(null);
  const [engineMode, setEngineMode] = useState<AnieEngineMode>('running');
  const [subsystems, setSubsystems] = useState<AnieEngineSubsystemsToggle | null>(null);
  const [workerHeartbeat, setWorkerHeartbeat] = useState<{
    workerInstanceId?: string;
    inProcessSchedulerActive: boolean;
    lastHeartbeatAt?: string;
    lastDiscoveryRunAt?: string;
    totalCyclesCompleted: number;
  } | null>(null);
  const [modelBudget, setModelBudget] = useState<AnieModelAndBudgetConfig | null>(null);
  const [scheduleIntervals, setScheduleIntervals] = useState<{
    regionalDiscovery: number;
    internationalDiscovery: number;
    institutionalDiscovery: number;
    scientificDiscovery: number;
  } | null>(null);
  const [taxonomyCount, setTaxonomyCount] = useState<number>(24);
  const [sources, setSources] = useState<AnieSourceRecord[]>([]);
  const [signals, setSignals] = useState<AnieRawSignal[]>([]);
  const [clusters, setClusters] = useState<AnieStoryCluster[]>([]);
  const [dossiers, setDossiers] = useState<AnieEvidenceDossier[]>([]);
  const [drafts, setDrafts] = useState<AnieEditorialDraft[]>([]);
  const [monthlyEditions, setMonthlyEditions] = useState<AnieMonthlyEditionPlan[]>([]);
  const [dailyDigests, setDailyDigests] = useState<AnieDailyEditorialDigest[]>([]);
  const [workerJobs, setWorkerJobs] = useState<AnieWorkerJobRecord[]>([]);
  const [dlq, setDlq] = useState<AnieWorkerJobRecord[]>([]);
  const [auditLog, setAuditLog] = useState<AnieAuditLogEntry[]>([]);

  // Batch Selection State
  const [selectedDraftIds, setSelectedDraftIds] = useState<Record<string, boolean>>({});

  // Preview Modal State (Actual Public Magazine Layout)
  const [previewStory, setPreviewStory] = useState<MagazineStory | null>(null);
  const [previewDraftMeta, setPreviewDraftMeta] = useState<AnieEditorialDraft | null>(null);

  // Full Editorial Workspace Editor Modal State
  const [editingDraft, setEditingDraft] = useState<AnieEditorialDraft | null>(null);
  const [editHeadline, setEditHeadline] = useState('');
  const [editStandfirst, setEditStandfirst] = useState('');
  const [editByline, setEditByline] = useState('');
  const [editDateline, setEditDateline] = useState('');
  const [editStream, setEditStream] = useState<AniePublicationStream>('daily_dispatch');
  const [editDept, setEditDept] = useState<EditorialDepartmentId>('field-reports');
  const [editBureau, setEditBureau] = useState<AnieBureauId>('kashmir');
  const [editBeat, setEditBeat] = useState('');
  const [editHeroImage, setEditHeroImage] = useState('');
  const [editHeroCaption, setEditHeroCaption] = useState('');
  const [editHeroCredit, setEditHeroCredit] = useState('');
  const [editDisclosure, setEditDisclosure] = useState('');
  const [editSeoTitle, setEditSeoTitle] = useState('');
  const [editMetaDesc, setEditMetaDesc] = useState('');
  const [editChaptersJson, setEditChaptersJson] = useState<StoryChapter[]>([]);

  // Inline Schedule / Assign / Correction / Image Modals per Draft
  const [scheduleDraftId, setScheduleDraftId] = useState<string | null>(null);
  const [scheduleIsoInput, setScheduleIsoInput] = useState<string>('');
  const [assignDraftId, setAssignDraftId] = useState<string | null>(null);
  const [assignTargetSlug, setAssignTargetSlug] = useState<string>('');
  const [correctionDraftId, setCorrectionDraftId] = useState<string | null>(null);
  const [correctionKind, setCorrectionKind] = useState<'Clarification' | 'Correction' | 'Editorial Update'>('Clarification');
  const [correctionText, setCorrectionText] = useState<string>('');

  // New Source Form State
  const [newSrcName, setNewSrcName] = useState('');
  const [newSrcDomain, setNewSrcDomain] = useState('');
  const [newSrcEndpoint, setNewSrcEndpoint] = useState('');
  const [newSrcCategory, setNewSrcCategory] = useState<AnieSourceRecord['category']>('regional_news');
  const [newSrcBureau, setNewSrcBureau] = useState<AnieBureauId>('kashmir');
  const [newSrcFreq, setNewSrcFreq] = useState<number>(30);

  // Budget Form State
  const [dailyCeilingInput, setDailyCeilingInput] = useState<string>('2.50');
  const [monthlyCeilingInput, setMonthlyCeilingInput] = useState<string>('40.00');

  const notify = (msg: string) => {
    setFlashMsg(msg);
    setTimeout(() => setFlashMsg(null), 5500);
  };

  const loadAnieState = useCallback(async () => {
    setLoading(true);
    setErrMsg(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/anie', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrMsg(data.error || 'Unable to load HD-ANIE Command Center.');
      } else {
        setMetrics(data.metrics);
        setEngineMode(data.engineMode);
        setSubsystems(data.subsystems);
        setWorkerHeartbeat(data.workerHeartbeat);
        setModelBudget(data.modelAndBudget);
        setScheduleIntervals(data.scheduleIntervalsMinutes);
        setTaxonomyCount(data.monitoringTaxonomyCount || 24);
        setSources(data.sources || []);
        setSignals(data.signals || []);
        setClusters(data.clusters || []);
        setDossiers(data.dossiers || []);
        setDrafts(data.drafts || []);
        setMonthlyEditions(data.monthlyEditions || []);
        setDailyDigests(data.dailyDigests || []);
        setWorkerJobs(data.workerJobs || []);
        setDlq(data.deadLetterQueue || []);
        setAuditLog(data.auditLog || []);
        if (data.modelAndBudget) {
          setDailyCeilingInput(String(data.modelAndBudget.dailySpendingCeilingUsd));
          setMonthlyCeilingInput(String(data.modelAndBudget.monthlySpendingCeilingUsd));
        }
      }
    } catch {
      setErrMsg('Network error loading HD-ANIE Command Center.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAnieState();
  }, [loadAnieState]);

  useEffect(() => {
    if (!assignTargetSlug && journalists[0]?.slug) {
      setAssignTargetSlug(journalists[0].slug);
    }
  }, [journalists, assignTargetSlug]);

  const postAnieAction = async (payload: Record<string, unknown>, label: string) => {
    setBusyAction(label);
    setErrMsg(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/anie', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrMsg(data.error || `Failed: ${label}`);
        return null;
      }
      await loadAnieState();
      await onDeskRefresh();
      return data;
    } catch {
      setErrMsg(`Network error while executing ${label}.`);
      return null;
    } finally {
      setBusyAction(null);
    }
  };

  const handleOpenPreview = async (draftId: string) => {
    setBusyAction('Loading Preview');
    try {
      const res = await fetch(
        `/api/himalayan-dispatch/anie?previewDraftId=${encodeURIComponent(draftId)}`,
        { credentials: 'include' }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setPreviewStory(data.publicLayoutStoryPreview);
        setPreviewDraftMeta(data.draft);
      } else {
        setErrMsg(data.error || 'Could not load public layout preview.');
      }
    } finally {
      setBusyAction(null);
    }
  };

  const handleOpenEditor = (d: AnieEditorialDraft) => {
    setEditingDraft(d);
    setEditHeadline(d.headline);
    setEditStandfirst(d.standfirst);
    setEditByline(d.bylineDisplay);
    setEditDateline(d.dateline);
    setEditStream(d.stream);
    setEditDept(d.departmentId);
    setEditBureau(d.bureauId);
    setEditBeat(d.reportingBeat);
    setEditHeroImage(d.heroImage);
    setEditHeroCaption(d.heroCaption);
    setEditHeroCredit(d.heroCredit);
    setEditDisclosure(d.editorialDisclosure);
    setEditSeoTitle(d.seoTitle);
    setEditMetaDesc(d.metaDescription);
    setEditChaptersJson(d.chapters.map((ch) => ({ ...ch, paragraphs: [...ch.paragraphs] })));
  };

  const handleSaveEditor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDraft) return;
    const data = await postAnieAction(
      {
        action: 'edit_draft',
        draftId: editingDraft.id,
        headline: editHeadline,
        standfirst: editStandfirst,
        bylineDisplay: editByline,
        dateline: editDateline,
        stream: editStream,
        departmentId: editDept,
        bureauId: editBureau,
        reportingBeat: editBeat,
        heroImage: editHeroImage,
        heroCaption: editHeroCaption,
        heroCredit: editHeroCredit,
        editorialDisclosure: editDisclosure,
        seoTitle: editSeoTitle,
        metaDescription: editMetaDesc,
        chapters: editChaptersJson,
      },
      'Saving Manuscript'
    );
    if (data) {
      setEditingDraft(null);
      notify(`Saved editorial revisions to "${editHeadline}".`);
    }
  };

  const filteredDrafts = useMemo(() => {
    return drafts.filter((d) => {
      if (queueFilter === 'all') return d.editorialStatus !== 'trashed';
      if (queueFilter === 'awaiting_review') return d.editorialStatus === 'awaiting_review';
      if (queueFilter === 'daily_dispatch') {
        return d.stream === 'daily_dispatch' && d.editorialStatus !== 'trashed';
      }
      if (queueFilter === 'monthly_edition') {
        return d.stream === 'monthly_edition' && d.editorialStatus !== 'trashed';
      }
      if (queueFilter === 'reviews_held') {
        return (
          d.editorialStatus === 'in_scientific_review' ||
          d.editorialStatus === 'in_legal_review' ||
          (d.editorialStatus === 'awaiting_review' && d.riskLevel !== 'GREEN')
        );
      }
      if (queueFilter === 'scheduled') return d.editorialStatus === 'scheduled';
      if (queueFilter === 'published') return d.editorialStatus === 'published';
      if (queueFilter === 'rejected') return d.editorialStatus === 'rejected';
      if (queueFilter === 'trashed') return d.editorialStatus === 'trashed';
      return true;
    });
  }, [drafts, queueFilter]);

  const selectedIdsArray = useMemo(
    () => Object.entries(selectedDraftIds).filter(([, v]) => v).map(([k]) => k),
    [selectedDraftIds]
  );

  const greenAwaitingIds = useMemo(
    () =>
      drafts
        .filter(
          (d) =>
            d.editorialStatus === 'awaiting_review' &&
            d.riskLevel === 'GREEN' &&
            d.qualityReport.overallPassed
        )
        .map((d) => d.id),
    [drafts]
  );

  return (
    <section className="rounded-2xl border border-amber-500/35 bg-slate-950/95 p-5 sm:p-7 space-y-6 shadow-2xl">
      {/* ===================================================================== */}
      {/* 1. HD-ANIE COMMAND HEADER & ENGINE RUNTIME CONTROLS                   */}
      {/* ===================================================================== */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-5 border-b border-slate-800">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300 font-bold">
              HIMALAYAN DISPATCH · HD-ANIE COMMAND CENTER
            </span>
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold uppercase ${
                engineMode === 'running'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-400/40'
                  : engineMode === 'paused'
                    ? 'bg-amber-950 text-amber-200 border-amber-400/40'
                    : 'bg-rose-950 text-rose-200 border-rose-500/60'
              }`}
            >
              {engineMode === 'running'
                ? '● Autonomous Discovery Running'
                : engineMode === 'paused'
                  ? '❚❚ Engine Paused'
                  : '■ Emergency Stop Active'}
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
              {taxonomyCount} KEW Monitoring Domains Linked
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Autonomous Environmental Newsroom &amp; Dual-Stream Editorial Desk
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            24/7 multilingual discovery, deduplication, claim-level verification, and KEW scientific RAG synthesis
            across all 6 Western Himalayan bureaus. <strong className="text-amber-200">Administrator retains full publication authority</strong> ({adminName})—autonomous drafts never publish without approval.
          </p>
          {workerHeartbeat && (
            <p className="text-[11px] font-mono text-slate-400">
              Server Scheduler: {workerHeartbeat.inProcessSchedulerActive ? 'Active' : 'Standby'} · Cycles:{' '}
              {workerHeartbeat.totalCyclesCompleted} · Last Discovery:{' '}
              {workerHeartbeat.lastDiscoveryRunAt
                ? new Date(workerHeartbeat.lastDiscoveryRunAt).toLocaleString()
                : 'Ready for initial scan'}
            </p>
          )}
        </div>

        {/* Engine Mode & Live Scan Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={Boolean(busyAction)}
            onClick={async () => {
              const res = await postAnieAction(
                { action: 'run_discovery_cycle', forceAllSources: true, maxNewDraftsPerCycle: 8 },
                'Scanning Live Sources'
              );
              if (res?.cycleResult) {
                notify(
                  `Live scan complete: polled ${res.cycleResult.sourcesPolled} sources, accepted ${res.cycleResult.newSignalsAccepted} signals, generated ${res.cycleResult.newDraftsGenerated} new draft(s).`
                );
              }
            }}
            className="px-4 py-2 rounded-xl bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${busyAction === 'Scanning Live Sources' ? 'animate-spin' : ''}`} />
            <span>{busyAction === 'Scanning Live Sources' ? 'Scanning Sources...' : 'Scan & Draft Now'}</span>
          </button>

          {engineMode !== 'running' && (
            <button
              type="button"
              onClick={() =>
                void postAnieAction(
                  { action: 'set_engine_control', engineMode: 'running' },
                  'Starting Engine'
                ).then((d) => d && notify('HD-ANIE resumed continuous background operation.'))
              }
              className="px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start</span>
            </button>
          )}

          {engineMode === 'running' && (
            <button
              type="button"
              onClick={() =>
                void postAnieAction(
                  { action: 'set_engine_control', engineMode: 'paused' },
                  'Pausing Engine'
                ).then((d) => d && notify('HD-ANIE background polling paused.'))
              }
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-400/35 font-semibold text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              void postAnieAction(
                { action: 'set_engine_control', engineMode: 'emergency_stop' },
                'Emergency Stop'
              ).then((d) => d && notify('EMERGENCY STOP activated: all background discovery and scheduled releases halted.'))
            }
            className="px-3.5 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-500/50 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <OctagonAlert className="w-3.5 h-3.5" />
            <span>Emergency Stop</span>
          </button>
        </div>
      </div>

      {flashMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{flashMsg}</span>
        </div>
      )}

      {errMsg && (
        <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errMsg}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. SIX ACTUAL MEASURED PRODUCTION METRICS (ZERO FABRICATED COUNTERS)  */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Sources Monitored</div>
          <div className="text-2xl font-bold text-white mt-1">
            {metrics ? `${metrics.activeSources} / ${metrics.totalSources}` : '—'}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">
            {metrics ? `${metrics.healthySources} verified healthy` : ''}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Signals Discovered</div>
          <div className="text-2xl font-bold text-white mt-1">
            {metrics ? metrics.totalSignalsStored : '—'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {metrics ? `${metrics.acceptedSignals} accepted · ${metrics.rejectedSignals} filtered` : ''}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Story Clusters</div>
          <div className="text-2xl font-bold text-white mt-1">
            {metrics ? metrics.clustersCount : '—'}
          </div>
          <div className="text-[11px] text-sky-300 mt-0.5">
            {metrics ? `${metrics.dossiersCount} evidence dossiers` : ''}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-400/30">
          <div className="text-[10px] font-mono uppercase text-amber-300">Awaiting Review</div>
          <div className="text-2xl font-bold text-amber-200 mt-1">
            {metrics ? metrics.awaitingReview : '—'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {metrics ? `${metrics.heldForReview} total held in queues` : ''}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-400/30">
          <div className="text-[10px] font-mono uppercase text-emerald-300">Published</div>
          <div className="text-2xl font-bold text-emerald-200 mt-1">
            {metrics ? metrics.published : '—'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {metrics ? `${metrics.publishedToday} today · ${metrics.scheduled} scheduled` : ''}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="text-[10px] font-mono uppercase text-slate-400">Monthly Edition</div>
          <div className="text-2xl font-bold text-white mt-1">
            {metrics ? metrics.monthlyDrafts : '—'}
          </div>
          <div className="text-[11px] text-amber-300 mt-0.5">
            {monthlyEditions[0] ? `${monthlyEditions[0].readinessPercent}% issue readiness` : 'Planning active'}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. SUBSYSTEM TOGGLE PILLS                                             */}
      {/* ===================================================================== */}
      {subsystems && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {(
            [
              ['globalNewsDiscovery', 'Global Discovery'],
              ['regionalSourceMonitoring', 'Regional 6-Bureau Feeds'],
              ['scientificResearchDiscovery', 'Scientific Research (OpenAlex/Crossref)'],
              ['factAndSourceVerification', 'Source Verification'],
              ['autonomousEditorialWriting', 'Editorial Writing'],
              ['visualAssetMatching', 'Visual Production'],
              ['scheduledReleaseGateway', 'Scheduled Gateway'],
            ] as Array<[keyof AnieEngineSubsystemsToggle, string]>
          ).map(([key, label]) => {
            const on = subsystems[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  void postAnieAction(
                    {
                      action: 'set_engine_control',
                      engineMode,
                      subsystems: { [key]: !on },
                    },
                    `Toggling ${label}`
                  )
                }
                className={`px-3 py-1 rounded-full text-[11px] font-mono border cursor-pointer transition-colors ${
                  on
                    ? 'bg-emerald-950/70 text-emerald-200 border-emerald-400/35'
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}
              >
                {on ? '● ' : '○ '}
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. PRIMARY COMMAND CENTER NAVIGATION TABS                             */}
      {/* ===================================================================== */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {(
          [
            { id: 'queue', label: `Editorial Queue (${drafts.filter((d) => d.editorialStatus !== 'trashed').length})`, icon: FolderKanban },
            { id: 'digest', label: 'Daily Approval Digest', icon: Sparkles },
            { id: 'edition', label: 'Monthly Edition Plan', icon: BookOpen },
            { id: 'sources', label: `Source Registry (${sources.length})`, icon: Globe },
            { id: 'signals', label: `Signals & Clusters (${clusters.length})`, icon: Layers },
            { id: 'dossiers', label: `Evidence Dossiers (${dossiers.length})`, icon: FileCheck2 },
            { id: 'workers', label: 'Workers, Schedule & Costs', icon: DollarSign },
            { id: 'audit', label: `Audit Trail (${auditLog.length})`, icon: History },
          ] as Array<{ id: AnieTabId; label: string; icon: React.ComponentType<{ className?: string }> }>
        ).map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                active
                  ? 'bg-amber-300 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: DUAL-STREAM EDITORIAL QUEUE & 22 ADMINISTRATOR CONTROLS        */}
      {/* ===================================================================== */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {/* Stream / Status Filter Bar + Batch Approval Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  ['awaiting_review', `Awaiting Review (${metrics?.awaitingReview ?? 0})`],
                  ['all', 'All Active'],
                  ['daily_dispatch', 'Daily Dispatch Stream'],
                  ['monthly_edition', 'Monthly Edition Stream'],
                  ['reviews_held', 'Scientific / Legal Review'],
                  ['scheduled', `Scheduled (${metrics?.scheduled ?? 0})`],
                  ['published', `Published (${metrics?.published ?? 0})`],
                  ['rejected', `Rejected (${metrics?.rejectedDrafts ?? 0})`],
                  ['trashed', `Trash (${metrics?.trashedDrafts ?? 0})`],
                ] as Array<[QueueFilterId, string]>
              ).map(([fid, flabel]) => (
                <button
                  key={fid}
                  type="button"
                  onClick={() => setQueueFilter(fid)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer ${
                    queueFilter === fid
                      ? 'bg-emerald-300 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {flabel}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedIdsArray.length > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    const res = await postAnieAction(
                      { action: 'bulk_publish', draftIds: selectedIdsArray },
                      'Batch Publishing'
                    );
                    if (res) {
                      setSelectedDraftIds({});
                      notify(
                        `Batch published ${res.publishedIds?.length || 0} eligible draft(s). Held/skipped: ${
                          res.skipped?.length || 0
                        } (risk/review gate enforced).`
                      );
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Bulk Publish Selected ({selectedIdsArray.length})</span>
                </button>
              )}

              {greenAwaitingIds.length > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    const res = await postAnieAction(
                      { action: 'bulk_publish', draftIds: greenAwaitingIds },
                      'Approving All Verified GREEN'
                    );
                    if (res) {
                      notify(`Published ${res.publishedIds?.length || 0} verified GREEN low-risk dispatch(es).`);
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve All Verified GREEN ({greenAwaitingIds.length})</span>
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">
              Loading HD-ANIE editorial queue...
            </div>
          ) : filteredDrafts.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <p className="text-sm text-slate-200 font-semibold">
                No drafts currently in the &ldquo;{queueFilter}&rdquo; view.
              </p>
              <p className="text-xs text-slate-400">
                Click <strong>Scan &amp; Draft Now</strong> above to poll live regional, international, and scientific sources and generate fresh research-grounded manuscripts.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDrafts.map((draft) => {
                const riskBadge =
                  draft.riskLevel === 'GREEN'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-400/40'
                    : draft.riskLevel === 'AMBER'
                      ? 'bg-amber-950 text-amber-200 border-amber-400/40'
                      : 'bg-rose-950 text-rose-200 border-rose-500/60';

                return (
                  <div
                    key={draft.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4"
                  >
                    {/* Top Row: Selection + Badges + Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {draft.editorialStatus === 'awaiting_review' && (
                          <input
                            type="checkbox"
                            checked={Boolean(selectedDraftIds[draft.id])}
                            onChange={(e) =>
                              setSelectedDraftIds((prev) => ({
                                ...prev,
                                [draft.id]: e.target.checked,
                              }))
                            }
                            aria-label={`Select ${draft.headline}`}
                            className="w-4 h-4 rounded accent-amber-300 cursor-pointer"
                          />
                        )}
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${riskBadge}`}>
                          {draft.riskLevel} RISK
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-200 border border-amber-300/30 uppercase">
                          {draft.stream === 'daily_dispatch' ? 'Stream 01 · Daily Dispatch' : 'Stream 02 · Monthly Edition'}
                        </span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200">
                          {draft.storyType} · {draft.wordCount} words ({draft.readingTimeMinutes} min)
                        </span>
                        {draft.isFeatured && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-300 text-slate-950 font-bold">
                            ★ FEATURED
                          </span>
                        )}
                        {draft.promotedFromDispatchId && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 text-sky-200 border border-sky-400/35">
                            Promoted from Daily Dispatch
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-mono uppercase text-slate-300">
                        Status: <strong className="text-white">{draft.editorialStatus.replace(/_/g, ' ')}</strong>
                        {draft.scheduledPublicationAt && (
                          <span className="text-amber-300">
                            {' '}
                            ({new Date(draft.scheduledPublicationAt).toLocaleString()})
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Headline, Standfirst & Inline Department/Bureau Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      <div className="lg:col-span-9 space-y-2">
                        <div className="text-[11px] font-mono text-amber-300">
                          {draft.bureauLabel} · {draft.dateline}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                          {draft.headline}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">{draft.standfirst}</p>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                          <span>Byline: <strong className="text-slate-200">{draft.bylineDisplay}</strong></span>
                          <span>·</span>
                          <span>Sources: <strong className="text-emerald-300">{draft.sourceReferences.length}</strong></span>
                          {draft.assignedJournalistName && (
                            <>
                              <span>·</span>
                              <span>Assigned Human Reporter: <strong className="text-sky-300">{draft.assignedJournalistName}</strong></span>
                            </>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800">
                          <strong className="text-slate-200">Governance Gate:</strong> {draft.riskReasons.join(' ')}
                        </p>
                      </div>

                      {/* Thumbnail + Quick Inline Department & Bureau Reclassification */}
                      <div className="lg:col-span-3 space-y-2">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                          <img
                            src={draft.heroImage}
                            alt={draft.heroCaption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <select
                            aria-label="Change Department"
                            value={draft.departmentId}
                            onChange={(e) =>
                              void postAnieAction(
                                {
                                  action: 'edit_draft',
                                  draftId: draft.id,
                                  departmentId: e.target.value,
                                },
                                'Changing Department'
                              ).then((d) => d && notify('Updated editorial department.'))
                            }
                            className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[10px] text-slate-200"
                          >
                            {departments.map((dep) => (
                              <option key={dep.id} value={dep.id}>
                                {dep.shortLabel}
                              </option>
                            ))}
                          </select>

                          <select
                            aria-label="Change Bureau"
                            value={draft.bureauId}
                            onChange={(e) =>
                              void postAnieAction(
                                {
                                  action: 'edit_draft',
                                  draftId: draft.id,
                                  bureauId: e.target.value,
                                },
                                'Changing Bureau'
                              ).then((d) => d && notify('Updated regional reporting bureau.'))
                            }
                            className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[10px] text-slate-200"
                          >
                            {BUREAU_OPTIONS.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Complete Administrator Action Bar */}
                    <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
                      {/* 1. Preview in Actual Public Magazine Layout */}
                      <button
                        type="button"
                        onClick={() => void handleOpenPreview(draft.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-300" />
                        <span>Preview</span>
                      </button>

                      {/* 2. Full Workspace Edit */}
                      <button
                        type="button"
                        onClick={() => handleOpenEditor(draft)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-sky-300" />
                        <span>Edit</span>
                      </button>

                      {/* 3. Publish / Unpublish */}
                      {draft.editorialStatus !== 'published' && draft.editorialStatus !== 'trashed' && (
                        <button
                          type="button"
                          onClick={() =>
                            void postAnieAction(
                              { action: 'transition_status', draftId: draft.id, transition: 'publish' },
                              'Publishing Article'
                            ).then((d) => d && notify(`Published "${draft.headline}" live!`))
                          }
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Publish</span>
                        </button>
                      )}

                      {draft.editorialStatus === 'published' && (
                        <>
                          <a
                            href={hdRoute(`/stories/${draft.slug}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-200 border border-emerald-400/40 text-xs font-semibold inline-flex items-center gap-1.5"
                          >
                            <span>View Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              void postAnieAction(
                                { action: 'transition_status', draftId: draft.id, transition: 'unpublish' },
                                'Unpublishing'
                              ).then((d) => d && notify(`Unpublished "${draft.headline}" (audit record retained).`))
                            }
                            className="px-3 py-1.5 rounded-lg bg-amber-950 text-amber-200 border border-amber-400/40 text-xs font-semibold cursor-pointer"
                          >
                            Unpublish
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setCorrectionDraftId((prev) => (prev === draft.id ? null : draft.id))
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs font-semibold cursor-pointer"
                          >
                            + Correction
                          </button>
                        </>
                      )}

                      {/* 4. Schedule */}
                      {draft.editorialStatus !== 'published' && draft.editorialStatus !== 'trashed' && (
                        <button
                          type="button"
                          onClick={() =>
                            setScheduleDraftId((prev) => (prev === draft.id ? null : draft.id))
                          }
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-amber-300" />
                          <span>Schedule</span>
                        </button>
                      )}

                      {/* 5. Add to Monthly Edition (Promotion Pipeline) */}
                      {draft.stream === 'daily_dispatch' && !draft.promotedToEditionDraftId && (
                        <button
                          type="button"
                          onClick={() =>
                            void postAnieAction(
                              { action: 'promote_to_monthly_edition', draftId: draft.id },
                              'Promoting to Monthly Edition'
                            ).then(
                              (d) =>
                                d &&
                                notify(
                                  'Created linked expanded Monthly Edition manuscript (original Daily Dispatch preserved).'
                                )
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-amber-300/15 hover:bg-amber-300/25 text-amber-200 border border-amber-300/35 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Add to Monthly Edition</span>
                        </button>
                      )}

                      {/* 6. Feature Story Toggle */}
                      <button
                        type="button"
                        onClick={() =>
                          void postAnieAction(
                            { action: 'transition_status', draftId: draft.id, transition: 'toggle_feature' },
                            'Toggling Feature'
                          )
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5" />
                        <span>{draft.isFeatured ? 'Unfeature' : 'Feature'}</span>
                      </button>

                      {/* 7. Deepen Research / Regenerate / Verify Again */}
                      <button
                        type="button"
                        onClick={() =>
                          void postAnieAction(
                            { action: 'deepen_research', draftId: draft.id },
                            'Deepening KEW Research'
                          ).then((d) => d && notify('Expanded KEW scientific RAG context on draft.'))
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs cursor-pointer"
                      >
                        Deepen Research
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void postAnieAction(
                            { action: 'revalidate_sources', draftId: draft.id },
                            'Revalidating Sources'
                          ).then((d) => d && notify('Revalidated live source URLs & DOIs.'))
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs cursor-pointer"
                      >
                        Verify Again
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void postAnieAction(
                            { action: 'regenerate', draftId: draft.id },
                            'Regenerating Draft'
                          ).then((d) => d && notify('Regenerated manuscript synthesis from dossier.'))
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer"
                      >
                        Regenerate
                      </button>

                      {/* 8. Replace Image Preset */}
                      <select
                        aria-label="Replace Image Plate"
                        defaultValue=""
                        onChange={(e) => {
                          if (!e.target.value) return;
                          void postAnieAction(
                            { action: 'replace_image', draftId: draft.id, domainId: e.target.value },
                            'Replacing Visual Plate'
                          ).then((d) => d && notify('Updated verified documentary/cartography plate.'));
                          e.target.value = '';
                        }}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 cursor-pointer"
                      >
                        <option value="">Replace Image...</option>
                        {VISUAL_DOMAIN_PRESETS.map((vp) => (
                          <option key={vp.id} value={vp.id}>
                            {vp.label}
                          </option>
                        ))}
                      </select>

                      {/* 9. Assign to Human Journalist */}
                      <button
                        type="button"
                        onClick={() =>
                          setAssignDraftId((prev) => (prev === draft.id ? null : draft.id))
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <UserPlus className="w-3.5 h-3.5 text-sky-300" />
                        <span>Assign Journalist</span>
                      </button>

                      {/* 10. Scientific & Legal Review Controls */}
                      {!draft.scientificReviewApproved ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              void postAnieAction(
                                {
                                  action: 'transition_status',
                                  draftId: draft.id,
                                  transition: 'request_scientific_review',
                                },
                                'Routing to Scientific Review'
                              )
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-200 text-xs cursor-pointer"
                          >
                            Req. Sci Review
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              void postAnieAction(
                                {
                                  action: 'transition_status',
                                  draftId: draft.id,
                                  transition: 'approve_scientific_review',
                                },
                                'Approving Scientific Review'
                              ).then((d) => d && notify('Recorded Scientific Review clearance.'))
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-400/35 text-xs cursor-pointer"
                          >
                            ✓ Clear Sci Review
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-mono text-emerald-300 px-2">
                          ✓ Sci Cleared
                        </span>
                      )}

                      {draft.riskLevel === 'RED' && !draft.legalReviewApproved && (
                        <button
                          type="button"
                          onClick={() =>
                            void postAnieAction(
                              {
                                action: 'transition_status',
                                draftId: draft.id,
                                transition: 'approve_legal_review',
                              },
                              'Approving Legal Clearance'
                            ).then((d) => d && notify('Recorded Legal & Right-of-Reply clearance.'))
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-400/40 text-xs font-semibold cursor-pointer"
                        >
                          ✓ Clear Legal Hold
                        </button>
                      )}

                      {/* 11. Reject / Delete to Trash / Restore */}
                      {draft.editorialStatus !== 'trashed' && draft.editorialStatus !== 'published' && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              void postAnieAction(
                                { action: 'transition_status', draftId: draft.id, transition: 'reject' },
                                'Rejecting Draft'
                              )
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-300 text-xs cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              void postAnieAction(
                                {
                                  action: 'transition_status',
                                  draftId: draft.id,
                                  transition: 'delete_to_trash',
                                },
                                'Moving to Trash'
                              ).then((d) => d && notify('Moved draft to Recoverable Trash.'))
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-300 text-xs inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </>
                      )}

                      {draft.editorialStatus === 'trashed' && (
                        <button
                          type="button"
                          onClick={() =>
                            void postAnieAction(
                              {
                                action: 'transition_status',
                                draftId: draft.id,
                                transition: 'restore_from_trash',
                              },
                              'Restoring Draft'
                            ).then((d) => d && notify('Restored draft from Trash.'))
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restore Draft</span>
                        </button>
                      )}
                    </div>

                    {/* Inline Schedule Drawer */}
                    {scheduleDraftId === draft.id && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-400/35 flex flex-wrap items-center gap-3">
                        <label className="text-xs text-slate-200 font-semibold">
                          Schedule Release Date &amp; Time:
                        </label>
                        <input
                          type="datetime-local"
                          value={scheduleIsoInput}
                          onChange={(e) => setScheduleIsoInput(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!scheduleIsoInput) return;
                            void postAnieAction(
                              {
                                action: 'transition_status',
                                draftId: draft.id,
                                transition: 'schedule',
                                scheduledPublicationAt: scheduleIsoInput,
                              },
                              'Scheduling Publication'
                            ).then((d) => {
                              if (d) {
                                setScheduleDraftId(null);
                                notify('Scheduled publication window saved.');
                              }
                            });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
                        >
                          Confirm Schedule
                        </button>
                      </div>
                    )}

                    {/* Inline Assign to Human Journalist Drawer */}
                    {assignDraftId === draft.id && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-400/35 flex flex-wrap items-center gap-3">
                        <label className="text-xs text-slate-200 font-semibold">
                          Transfer AI Research Dossier to Human Correspondent:
                        </label>
                        <select
                          value={assignTargetSlug}
                          onChange={(e) => setAssignTargetSlug(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        >
                          {journalists.map((j) => (
                            <option key={j.slug} value={j.slug}>
                              {j.name} ({j.roleTitle})
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            void postAnieAction(
                              {
                                action: 'assign_to_journalist',
                                draftId: draft.id,
                                journalistSlug: assignTargetSlug,
                              },
                              'Assigning Dossier'
                            ).then((d) => {
                              if (d) {
                                setAssignDraftId(null);
                                notify('Transferred dossier & working manuscript to Journalist Workspace.');
                              }
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-sky-400 text-slate-950 font-bold text-xs cursor-pointer"
                        >
                          Assign to Workspace
                        </button>
                      </div>
                    )}

                    {/* Inline Accountable Correction Drawer */}
                    {correctionDraftId === draft.id && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-400/35 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={correctionKind}
                            onChange={(e) =>
                              setCorrectionKind(
                                e.target.value as 'Clarification' | 'Correction' | 'Editorial Update'
                              )
                            }
                            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                          >
                            <option value="Clarification">Clarification</option>
                            <option value="Correction">Correction</option>
                            <option value="Editorial Update">Editorial Update</option>
                          </select>
                          <input
                            type="text"
                            value={correctionText}
                            onChange={(e) => setCorrectionText(e.target.value)}
                            placeholder="Enter transparent public correction or clarification note..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              void postAnieAction(
                                {
                                  action: 'publish_correction',
                                  draftId: draft.id,
                                  kind: correctionKind,
                                  note: correctionText,
                                },
                                'Publishing Correction'
                              ).then((d) => {
                                if (d) {
                                  setCorrectionText('');
                                  setCorrectionDraftId(null);
                                  notify('Appended timestamped public correction.');
                                }
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
                          >
                            Append Correction
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: CONSOLIDATED DAILY EDITORIAL APPROVAL DIGEST                   */}
      {/* ===================================================================== */}
      {activeTab === 'digest' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Consolidated Daily Administrator Digest</h3>
              <p className="text-xs text-slate-400">
                One consolidated summary of the highest-priority verified drafts ready for quick batch approval.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                void postAnieAction({ action: 'compile_daily_digest' }, 'Refreshing Daily Digest').then(
                  (d) => d && notify('Refreshed today’s consolidated editorial digest.')
                )
              }
              className="px-3.5 py-2 rounded-xl bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Refresh Today&apos;s Digest
            </button>
          </div>

          {dailyDigests[0] ? (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-amber-300">
                  Digest Date: {dailyDigests[0].dateKey}
                </span>
                <span className="text-xs text-slate-300">{dailyDigests[0].summaryNarrative}</span>
              </div>

              {dailyDigests[0].greenBulkEligibleDraftIds.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    void postAnieAction(
                      {
                        action: 'bulk_publish',
                        draftIds: dailyDigests[0].greenBulkEligibleDraftIds,
                      },
                      'Batch Approving Digest GREEN Items'
                    ).then((d) => d && notify(`Published ${d.publishedIds?.length || 0} digest item(s).`))
                  }
                  className="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Approve All {dailyDigests[0].greenBulkEligibleDraftIds.length} GREEN Digest Drafts in One Click
                </button>
              )}

              <div className="divide-y divide-slate-800">
                {dailyDigests[0].topProposedHeadlines.map((item) => (
                  <div key={item.draftId} className="py-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.bureauLabel} · {item.storyType} · {item.sourceCount} citations
                      </span>
                      <div className="text-sm font-semibold text-white">{item.headline}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-200">
                        {item.riskLevel}
                      </span>
                      <button
                        type="button"
                        onClick={() => void handleOpenPreview(item.draftId)}
                        className="px-2.5 py-1 rounded bg-slate-800 text-xs text-white cursor-pointer"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No digest compiled yet.</p>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: AUTONOMOUS MONTHLY EDITION PLANNER                             */}
      {/* ===================================================================== */}
      {activeTab === 'edition' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Autonomous Monthly Magazine Edition Assembly</h3>
              <p className="text-xs text-slate-400">
                Curates deeper longform, data, and investigative manuscripts into a cohesive monthly issue.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                void postAnieAction(
                  { action: 'assemble_monthly_edition' },
                  'Reassembling Monthly Edition'
                ).then((d) => d && notify('Updated Monthly Edition composition & coverage matrix.'))
              }
              className="px-3.5 py-2 rounded-xl bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Re-Assemble Monthly Plan
            </button>
          </div>

          {monthlyEditions[0] && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-4 aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={monthlyEditions[0].coverImage}
                    alt={monthlyEditions[0].coverCaption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-8 space-y-2">
                  <div className="text-xs font-mono text-amber-300">
                    {monthlyEditions[0].volumeLabel} · {monthlyEditions[0].anticipatedPublicationWindow} · Readiness:{' '}
                    {monthlyEditions[0].readinessPercent}%
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    {monthlyEditions[0].proposedThemeTitle}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {monthlyEditions[0].subtitle}
                  </p>
                  <div className="text-[11px] font-mono text-slate-400">
                    Allocated Manuscripts: {monthlyEditions[0].allocatedDraftIds.length} · Regional Coverage Gaps:{' '}
                    {monthlyEditions[0].regionalCoverageGaps.length > 0
                      ? monthlyEditions[0].regionalCoverageGaps.join(', ').toUpperCase()
                      : 'None (All 6 Bureaus Covered)'}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-400/30 space-y-2">
                <div className="text-[10px] font-mono uppercase text-amber-300">
                  Proposed Editor&apos;s Letter Working Draft — {monthlyEditions[0].editorsLetterDraft.workingTitle}
                </div>
                {monthlyEditions[0].editorsLetterDraft.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-xs text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}
                <p className="text-[11px] font-mono text-rose-300 pt-1">
                  {monthlyEditions[0].editorsLetterDraft.governanceNotice}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: SOURCE DISCOVERY REGISTRY & HEALTH                             */}
      {/* ===================================================================== */}
      {activeTab === 'sources' && (
        <div className="space-y-5">
          {/* Add New Authorized Source Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newSrcName.trim() || !newSrcDomain.trim() || !newSrcEndpoint.trim()) return;
              void postAnieAction(
                {
                  action: 'toggle_or_add_source',
                  sourcePayload: {
                    mode: 'add',
                    name: newSrcName,
                    domain: newSrcDomain,
                    endpointUrl: newSrcEndpoint,
                    category: newSrcCategory,
                    geographicalCoverage: [newSrcBureau],
                    pollFrequencyMinutes: newSrcFreq,
                  },
                },
                'Adding Source'
              ).then((d) => {
                if (d) {
                  setNewSrcName('');
                  setNewSrcDomain('');
                  setNewSrcEndpoint('');
                  notify('Registered new authorized RSS/Atom discovery source.');
                }
              });
            }}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 items-end"
          >
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Source Name</label>
              <input
                type="text"
                value={newSrcName}
                onChange={(e) => setNewSrcName(e.target.value)}
                placeholder="e.g. Reach Ladakh"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Domain</label>
              <input
                type="text"
                value={newSrcDomain}
                onChange={(e) => setNewSrcDomain(e.target.value)}
                placeholder="reachladakh.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="text-[10px] font-mono text-slate-400 block mb-1">RSS / Atom Feed URL</label>
              <input
                type="url"
                value={newSrcEndpoint}
                onChange={(e) => setNewSrcEndpoint(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-slate-400 block mb-1">Primary Bureau</label>
              <select
                value={newSrcBureau}
                onChange={(e) => setNewSrcBureau(e.target.value as AnieBureauId)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                {BUREAU_OPTIONS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-1 cursor-pointer h-[32px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Source</span>
            </button>
          </form>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-mono text-[10px] uppercase">
                <tr>
                  <th className="p-3">Source</th>
                  <th className="p-3">Method &amp; Coverage</th>
                  <th className="p-3">Reliability</th>
                  <th className="p-3">Health &amp; Last Poll</th>
                  <th className="p-3">Signals</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                {sources.map((s) => (
                  <tr key={s.id}>
                    <td className="p-3">
                      <div className="font-semibold text-white">{s.name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{s.domain}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-[11px] text-amber-200">{s.retrievalMethod}</div>
                      <div className="text-[10px] text-slate-400">
                        {s.geographicalCoverage.join(', ')} · every {s.pollFrequencyMinutes}m
                      </div>
                    </td>
                    <td className="p-3 font-mono text-emerald-300">{s.reliabilityScore}/100</td>
                    <td className="p-3 text-[11px]">
                      {s.lastSuccessfulRetrievalAt ? (
                        <span className="text-emerald-300">
                          HTTP {s.lastHttpStatus || 200} ·{' '}
                          {new Date(s.lastSuccessfulRetrievalAt).toLocaleTimeString()}
                        </span>
                      ) : s.consecutiveFailures > 0 ? (
                        <span className="text-rose-300">
                          {s.consecutiveFailures} failure(s): {s.failureHistory[0]?.reason}
                        </span>
                      ) : (
                        <span className="text-slate-400">Awaiting first poll</span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-white">{s.totalSignalsDiscovered}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() =>
                          void postAnieAction(
                            {
                              action: 'toggle_or_add_source',
                              sourcePayload: { mode: 'toggle', sourceId: s.id, active: !s.active },
                            },
                            'Toggling Source'
                          )
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono cursor-pointer ${
                          s.active
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-400/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {s.active ? 'Active' : 'Paused'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: SIGNALS & STORY CLUSTERS                                       */}
      {/* ===================================================================== */}
      {activeTab === 'signals' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">
              Deduplicated Story Clusters ({clusters.length})
            </h4>
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {clusters.slice(0, 30).map((cl) => (
                <div key={cl.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-300 uppercase">
                      {cl.primaryBureau} · Score {cl.scorecard.compositePriorityScore}/100
                    </span>
                    <span className="text-emerald-300">
                      {cl.independentSourceFamilyCount} source family · {cl.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white">{cl.canonicalTopic}</div>
                  <div className="text-[10px] text-slate-400">
                    Domains: {cl.monitoringDomainIds.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">
              Recent Discovered Signals ({signals.length})
            </h4>
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {signals.slice(0, 40).map((sig) => (
                <div key={sig.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-300">{sig.sourceName}</span>
                    <span
                      className={
                        sig.status === 'accepted' ? 'text-emerald-300' : 'text-slate-500'
                      }
                    >
                      {sig.status} ({sig.environmentalRelevanceScore})
                    </span>
                  </div>
                  <a
                    href={sig.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-amber-100 hover:underline block"
                  >
                    {sig.rawTitle}
                  </a>
                  <div className="text-[10px] text-slate-400">
                    Scripts: {sig.detectedScripts.join(', ')} · Bureaus: {sig.detectedBureaus.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 6: STRUCTURED EVIDENCE DOSSIERS                                   */}
      {/* ===================================================================== */}
      {activeTab === 'dossiers' && (
        <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {dossiers.slice(0, 25).map((dos) => (
            <div key={dos.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-amber-300">{dos.id}</span>
                <span className="text-emerald-300">{dos.verificationSummary}</span>
              </div>
              <div className="space-y-1">
                {dos.claimMappings.map((cm) => (
                  <div key={cm.id} className="text-[11px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="font-mono text-[10px] text-sky-300 mr-2">
                      [{cm.verificationStatus}]
                    </span>
                    {cm.claimText}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 7: WORKERS, SCHEDULE, BUDGET GUARD & DLQ                          */}
      {/* ===================================================================== */}
      {activeTab === 'workers' && modelBudget && scheduleIntervals && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">Measured AI Consumption &amp; Spending Ceilings</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Active Synthesis Mode</div>
                <div className="font-mono text-emerald-300 mt-1">{modelBudget.primaryProvider}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Measured Spend Today / Month</div>
                <div className="font-mono text-white mt-1">
                  ${modelBudget.measuredSpentTodayUsd.toFixed(4)} / $
                  {modelBudget.measuredSpentMonthUsd.toFixed(4)}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Measured Tokens (Prompt / Comp)</div>
                <div className="font-mono text-slate-200 mt-1">
                  {modelBudget.measuredPromptTokens} / {modelBudget.measuredCompletionTokens}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">External Discovery Polls</div>
                <div className="font-mono text-amber-200 mt-1">
                  {modelBudget.measuredExternalDiscoveryCalls}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Daily Limit (USD)</label>
                <input
                  type="number"
                  step="0.5"
                  value={dailyCeilingInput}
                  onChange={(e) => setDailyCeilingInput(e.target.value)}
                  className="w-28 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">Monthly Limit (USD)</label>
                <input
                  type="number"
                  step="1"
                  value={monthlyCeilingInput}
                  onChange={(e) => setMonthlyCeilingInput(e.target.value)}
                  className="w-28 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  void postAnieAction(
                    {
                      action: 'update_budget_schedule',
                      dailySpendingCeilingUsd: parseFloat(dailyCeilingInput),
                      monthlySpendingCeilingUsd: parseFloat(monthlyCeilingInput),
                    },
                    'Updating Budget Ceilings'
                  ).then((d) => d && notify('Saved spending ceilings.'))
                }
                className="px-3.5 py-1.5 rounded-lg bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Save Ceilings
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">
              Persistent Worker Runs ({workerJobs.length}) &amp; Dead-Letter Queue ({dlq.length})
            </h4>
            <div className="space-y-2 max-h-[260px] overflow-y-auto">
              {workerJobs.slice(0, 15).map((job) => (
                <div key={job.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px]">
                  <div className="flex justify-between font-mono text-[10px]">
                    <span className="text-emerald-300">{job.status}</span>
                    <span className="text-slate-400">
                      {job.durationMs ? `${job.durationMs}ms` : ''} ·{' '}
                      {new Date(job.scheduledAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-slate-300 mt-0.5">{job.summary || job.errorMessage}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 8: OPERATIONAL & EDITORIAL AUDIT TRAIL                            */}
      {/* ===================================================================== */}
      {activeTab === 'audit' && (
        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {auditLog.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-mono text-[10px] text-amber-300 mr-2">
                  [{entry.category.toUpperCase()} · {entry.action}]
                </span>
                <span className="text-white font-medium">{entry.targetTitle || ''}</span>
                <p className="text-[11px] text-slate-400">{entry.details}</p>
              </div>
              <div className="text-[10px] font-mono text-slate-400 shrink-0">
                {entry.actor} · {new Date(entry.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL A: FULL PROFESSIONAL EDITORIAL WORKSPACE EDITOR                 */}
      {/* ===================================================================== */}
      {editingDraft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-amber-400/40 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-300">
                  Professional Editorial Manuscript Workspace
                </span>
                <h3 className="text-xl font-bold text-white">{editingDraft.headline}</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingDraft(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditor} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-semibold block mb-1">Headline</label>
                  <input
                    type="text"
                    value={editHeadline}
                    onChange={(e) => setEditHeadline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-semibold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-semibold block mb-1">Standfirst / Deck</label>
                  <textarea
                    rows={2}
                    value={editStandfirst}
                    onChange={(e) => setEditStandfirst(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Byline</label>
                  <input
                    type="text"
                    value={editByline}
                    onChange={(e) => setEditByline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Dateline</label>
                  <input
                    type="text"
                    value={editDateline}
                    onChange={(e) => setEditDateline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Publication Stream</label>
                  <select
                    value={editStream}
                    onChange={(e) => setEditStream(e.target.value as AniePublicationStream)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="daily_dispatch">Stream 01 · The Daily Dispatch</option>
                    <option value="monthly_edition">Stream 02 · The Monthly Edition</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Reporting Beat</label>
                  <input
                    type="text"
                    value={editBeat}
                    onChange={(e) => setEditBeat(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Chapter-by-Chapter Rich Content Editor */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-xs font-bold text-amber-300 block">
                  Article Sections &amp; Body Paragraphs
                </span>
                {editChaptersJson.map((ch, cIdx) => (
                  <div key={cIdx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <input
                      type="text"
                      value={ch.title}
                      onChange={(e) => {
                        const next = [...editChaptersJson];
                        next[cIdx] = { ...next[cIdx], title: e.target.value };
                        setEditChaptersJson(next);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-semibold"
                    />
                    <textarea
                      rows={5}
                      value={ch.paragraphs.join('\n\n')}
                      onChange={(e) => {
                        const next = [...editChaptersJson];
                        next[cIdx] = {
                          ...next[cIdx],
                          paragraphs: e.target.value
                            .split(/\n{2,}/)
                            .map((p) => p.trim())
                            .filter(Boolean),
                        };
                        setEditChaptersJson(next);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              {/* Hero Image, Disclosure & SEO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Hero Photograph Path</label>
                  <input
                    type="text"
                    value={editHeroImage}
                    onChange={(e) => setEditHeroImage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Image Credit &amp; Attribution</label>
                  <input
                    type="text"
                    value={editHeroCredit}
                    onChange={(e) => setEditHeroCredit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-semibold block mb-1">Image Caption</label>
                  <input
                    type="text"
                    value={editHeroCaption}
                    onChange={(e) => setEditHeroCaption(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-semibold block mb-1">Editorial Disclosure</label>
                  <textarea
                    rows={2}
                    value={editDisclosure}
                    onChange={(e) => setEditDisclosure(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={editSeoTitle}
                    onChange={(e) => setEditSeoTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Meta Description</label>
                  <input
                    type="text"
                    value={editMetaDesc}
                    onChange={(e) => setEditMetaDesc(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
                  />
                </div>
              </div>

              {/* Revision History */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Manuscript Revision History ({editingDraft.revisionHistory.length})
                </span>
                {editingDraft.revisionHistory.slice(0, 5).map((rev) => (
                  <div key={rev.id} className="text-[11px] text-slate-300">
                    <span className="font-mono text-amber-200">
                      {new Date(rev.timestamp).toLocaleString()} ({rev.actor}):
                    </span>{' '}
                    {rev.summary}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingDraft(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-300 text-slate-950 font-bold cursor-pointer"
                >
                  Save Draft Revisions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL B: ACTUAL PUBLIC MAGAZINE LAYOUT PREVIEW                        */}
      {/* ===================================================================== */}
      {previewStory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col">
          <div className="bg-slate-950 border-b border-amber-400/40 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase text-amber-300 font-bold">
                Public Layout Preview ({previewDraftMeta?.editorialStatus})
              </span>
              <span className="text-xs text-slate-300">{previewStory.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {previewDraftMeta && previewDraftMeta.editorialStatus !== 'published' && (
                <button
                  type="button"
                  onClick={() =>
                    void postAnieAction(
                      {
                        action: 'transition_status',
                        draftId: previewDraftMeta.id,
                        transition: 'publish',
                      },
                      'Publishing from Preview'
                    ).then((d) => {
                      if (d) {
                        setPreviewStory(null);
                        notify(`Published "${previewStory.title}" live!`);
                      }
                    })
                  }
                  className="px-4 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Approve &amp; Publish Now
                </button>
              )}
              <button
                type="button"
                onClick={() => setPreviewStory(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs inline-flex items-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Close Preview</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hd-editorial-root" style={{ backgroundColor: '#F6F3EC', color: '#171717' }}>
            <DispatchThemeProvider>
              <StoryReaderClient story={previewStory} journalist={null} nextStory={null} />
            </DispatchThemeProvider>
          </div>
        </div>
      )}
    </section>
  );
}
