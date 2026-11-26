'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  GitCompare,
  History,
  Image as ImageIcon,
  Layers,
  MapPin,
  MessageSquare,
  Plus,
  Quote,
  RotateCcw,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Table,
  Trash2,
  Video,
} from 'lucide-react';
import type {
  HdnArticleManuscript,
  HdnContentBlock,
  HdnContentBlockType,
  HdnManuscriptRevision,
  HdnMediaAsset,
  HdnWorkflowStatus,
} from '@/types/hdn-newsroom';
import type {
  BureauSlugId,
  EditorialDepartment,
  EditorialDepartmentId,
  MagazineStory,
  ReportingBeatFullSpec,
} from '@/types/himalayan-dispatch';
import { StoryReaderClient } from '@/components/himalayan-dispatch/StoryReaderClient';
import { DispatchThemeProvider } from '@/components/himalayan-dispatch/DispatchThemeContext';
import { HDN_ROUTES } from '@/lib/hdn/routes';
import { useHdnSession } from './HdnNewsroomProvider';

const BLOCK_CATALOG: Array<{
  type: HdnContentBlockType;
  label: string;
  purpose: string;
}> = [
  { type: 'headline_standfirst', label: 'Headline & Standfirst', purpose: 'Secondary deck or sub-feature intro' },
  { type: 'dateline', label: 'Dateline', purpose: 'Verified geographical & elevation context' },
  { type: 'rich_text', label: 'Rich Text Section', purpose: 'Structured chapter heading, literary prose & bullets' },
  { type: 'full_bleed_photo', label: 'Full-Bleed Photography', purpose: 'Cinematic documentary plate with credit & license' },
  { type: 'photo_gallery', label: 'Photo Gallery', purpose: 'Sequence of documentary plates & exposure metadata' },
  { type: 'pull_quote', label: 'Pull Quote', purpose: 'Highlighted verified quotation & speaker attribution' },
  { type: 'scientific_map', label: 'Scientific Map (KEW)', purpose: 'Embedded KEW geospatial intelligence layer' },
  { type: 'interactive_chart', label: 'Interactive Chart', purpose: 'Quantitative scientific series & key finding' },
  { type: 'data_table', label: 'Data Table', purpose: 'Structured tabular evidence & footnotes' },
  { type: 'scientific_equation', label: 'Scientific Equation', purpose: 'Mathematical/physical formulation & variables' },
  { type: 'historical_timeline', label: 'Historical Timeline', purpose: 'Chronological documentation of events' },
  { type: 'interview_transcript', label: 'Interview Transcript', purpose: 'Verified Q&A exchanges & subject bio' },
  { type: 'memorial_profile', label: 'Memorial Profile', purpose: 'Individual environmental guardian legacy record' },
  { type: 'research_citation', label: 'Research Citation', purpose: 'Peer-reviewed paper, DOI & statutory filing' },
  { type: 'evidence_dossier', label: 'Evidence Dossier', purpose: 'Corroborated primary documentation summary' },
  { type: 'related_kew_intelligence', label: 'Related KEW Intelligence', purpose: 'Companion KEW scientific observatory link' },
  { type: 'video_audio', label: 'Video & Audio', purpose: 'Approved documentary video or field audio reel' },
  { type: 'editorial_disclosure', label: 'Editorial Disclosure', purpose: 'AI assistance, COI & methodology disclosure' },
];

type EditorTabId = 'edit' | 'preview' | 'sources' | 'media' | 'review' | 'seo' | 'history';

function createDefaultBlock(type: HdnContentBlockType, order: number): HdnContentBlock {
  const id = `blk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`;
  switch (type) {
    case 'rich_text':
      return {
        id,
        type,
        order,
        chapterRoman: String(order),
        heading: 'Section Heading',
        subheading: '',
        bodyText: '',
        dropCap: order === 1,
      };
    case 'pull_quote':
      return {
        id,
        type,
        order,
        quoteText: '',
        quoteAttribution: '',
        quoteContext: '',
      };
    case 'full_bleed_photo':
      return {
        id,
        type,
        order,
        mediaUrl: '/images/publications/kolahoi-glacier-cryosphere.jpg',
        caption: '',
        credit: 'Himalayan Dispatch Documentary Archive',
        license: 'KEW Institutional Archive',
        provenanceType: 'authentic_documentary_photograph',
        aspect: 'wide',
      };
    case 'photo_gallery':
      return {
        id,
        type,
        order,
        heading: 'Documentary Plate Sequence',
        galleryPlates: [
          {
            plateRoman: 'PLATE I',
            title: 'Field Plate I',
            imageUrl: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
            location: 'Wular Basin',
            elevation: '1,580 m',
            exposureMeta: '35mm · Natural Dawn Light',
            narrative: '',
          },
        ],
      };
    case 'scientific_map':
      return {
        id,
        type,
        order,
        kewMapLayerId: 'watershed_basins',
        mapCenterLat: 34.0837,
        mapCenterLng: 74.7973,
        mapZoom: 9,
        caption: 'Kashmir EcoWatch Geospatial Watershed Layer',
        mapMethodologyNote: 'Derived from KEW spatial_entities & SRTM hydrography.',
      };
    case 'interactive_chart':
      return {
        id,
        type,
        order,
        heading: 'Empirical Trend Series',
        subheading: 'Verified multi-year station or satellite record',
        chartStyle: 'snowline_horizon',
        chartUnit: 'Index / m',
        keyFindingStat: '',
        keyFindingNarrative: '',
        chartPoints: [
          { yearOrLabel: '2000', primaryValue: 100 },
          { yearOrLabel: '2015', primaryValue: 86 },
          { yearOrLabel: '2026', primaryValue: 74 },
        ],
      };
    case 'data_table':
      return {
        id,
        type,
        order,
        tableKicker: 'EVIDENCE TABLE',
        caption: 'Comparative Empirical Ledger',
        tableHeaders: ['Parameter / Location', 'Observed Value & Source'],
        tableRows: [['Sample Station A', 'Measured baseline']],
        tableFootnote: 'Source: Kashmir EcoWatch Observatory & statutory records.',
      };
    case 'scientific_equation':
      return {
        id,
        type,
        order,
        heading: 'Mass-Balance / Hydrological Formulation',
        equationLatex: 'Q = P - ET - \\Delta S',
        equationExplanation: 'Catchment water balance relating discharge (Q), precipitation (P), evapotranspiration (ET), and storage change (ΔS).',
        equationVariables: [
          { symbol: 'Q', meaning: 'Basin runoff discharge', unit: 'm³/s' },
          { symbol: 'ΔS', meaning: 'Cryospheric & groundwater storage change', unit: 'mm w.e.' },
        ],
      };
    case 'historical_timeline':
      return {
        id,
        type,
        order,
        heading: 'Historical Chronology',
        timelineEvents: [
          {
            dateOrEra: '2004',
            title: 'Baseline Field Survey',
            detail: 'Initial watershed documentation established.',
          },
        ],
      };
    case 'interview_transcript':
      return {
        id,
        type,
        order,
        interviewSubject: '',
        interviewSubjectBio: '',
        interviewVerificationRef: 'Verified audio/notebook on file with Editorial Desk',
        interviewExchanges: [
          { speakerRole: 'dispatch', speakerLabel: 'HIMALAYAN DISPATCH', text: '' },
          { speakerRole: 'subject', speakerLabel: 'RESPONDENT', text: '' },
        ],
      };
    case 'memorial_profile':
      return {
        id,
        type,
        order,
        memorialName: '',
        memorialDesignation: 'Forest Protection Personnel',
        memorialDivisionOrRegion: 'Jammu & Kashmir Forest Division',
        memorialYear: '',
        memorialTribute: '',
        memorialSourceNote: 'Cross-referenced with KEW Green Martyrs Roll of Honour.',
      };
    case 'research_citation':
      return {
        id,
        type,
        order,
        heading: '',
        citationAuthors: '',
        citationJournalOrBody: '',
        citationYear: '2026',
        citationDoi: '',
        citationUrl: '',
      };
    case 'evidence_dossier':
      return {
        id,
        type,
        order,
        heading: 'Supporting Documentary Dossier',
        corroborationNote: '',
      };
    case 'related_kew_intelligence':
      return {
        id,
        type,
        order,
        kewModuleLabel: 'KEW Water Systems & Cryosphere Observatory',
        kewModuleHref: '/water-systems',
        kewScientificContext: 'Companion hydrological & cryospheric monitoring baseline.',
      };
    case 'video_audio':
      return {
        id,
        type,
        order,
        mediaKind: 'documentary_video',
        mediaUrl: '',
        durationLabel: '04:30',
        caption: '',
        transcriptSummary: '',
        consentVerified: true,
      };
    case 'editorial_disclosure':
      return {
        id,
        type,
        order,
        authorshipOrigin: 'human_original',
        aiDisclosureText: 'Original human reporting and writing; fact-checked under the Himalayan Dispatch Charter.',
        conflictOfInterestNote: 'No conflicts of interest declared.',
        scientificLimitationsNote: '',
      };
    default:
      return {
        id,
        type,
        order,
        heading: '',
        bodyText: '',
      };
  }
}

export function HdnBlockArticleEditor({ manuscriptId }: { manuscriptId: string }) {
  const { account, hasPerm } = useHdnSession();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<EditorTabId>('edit');

  const [ms, setMs] = useState<HdnArticleManuscript | null>(null);
  const [previewStory, setPreviewStory] = useState<MagazineStory | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [canPublish, setCanPublish] = useState(false);
  const [departments, setDepartments] = useState<EditorialDepartment[]>([]);
  const [beats, setBeats] = useState<ReportingBeatFullSpec[]>([]);
  const [mediaLibrary, setMediaLibrary] = useState<HdnMediaAsset[]>([]);

  // Mutable Draft State
  const [headline, setHeadline] = useState('');
  const [standfirst, setStandfirst] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [bylineDisplay, setBylineDisplay] = useState('');
  const [dateline, setDateline] = useState('');
  const [stream, setStream] = useState<'daily_dispatch' | 'monthly_edition'>('monthly_edition');
  const [editionSlug, setEditionSlug] = useState('issue-02-a-world-in-transition');
  const [deptId, setDeptId] = useState<EditorialDepartmentId>('longform-features');
  const [bureauId, setBureauId] = useState<BureauSlugId>('kashmir');
  const [beatSlug, setBeatSlug] = useState('lakes-wetlands-springs-waterways');
  const [articleFormat, setArticleFormat] =
    useState<HdnArticleManuscript['articleFormat']>('Longform Feature');
  const [heroImage, setHeroImage] = useState('');
  const [heroCaption, setHeroCaption] = useState('');
  const [heroCredit, setHeroCredit] = useState('');
  const [heroLicense, setHeroLicense] = useState('');
  const [heroProvenance, setHeroProvenance] =
    useState<HdnContentBlock['provenanceType']>('authentic_documentary_photograph');
  const [editorialDisclosure, setEditorialDisclosure] = useState('');
  const [coiDisclosure, setCoiDisclosure] = useState('');
  const [limitationsText, setLimitationsText] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [seoKeywordsText, setSeoKeywordsText] = useState('');
  const [blocks, setBlocks] = useState<HdnContentBlock[]>([]);

  // Saving, Autosave & Revision Diff State
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [autoSaveLabel, setAutoSaveLabel] = useState<string>('All changes saved');
  const [revisionNote, setRevisionNote] = useState('');
  const [compareLeftId, setCompareLeftId] = useState<string>('');
  const [compareRightId, setCompareRightId] = useState<string>('');

  // Comments & Workflow Note State
  const [commentText, setCommentText] = useState('');
  const [commentKind, setCommentKind] =
    useState<'editorial_comment' | 'inline_annotation' | 'revision_request' | 'author_response'>('editorial_comment');
  const [commentBlockId, setCommentBlockId] = useState<string>('');
  const [workflowNote, setWorkflowNote] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');

  const versionRef = useRef<number>(1);

  const hydrateFromManuscript = useCallback((m: HdnArticleManuscript) => {
    setMs(m);
    versionRef.current = m.versionNumber;
    setHeadline(m.headline);
    setStandfirst(m.standfirst);
    setSubtitle(m.subtitle);
    setBylineDisplay(m.bylineDisplay);
    setDateline(m.dateline);
    setStream(m.publicationStream);
    setEditionSlug(m.targetEditionSlug);
    setDeptId(m.departmentId);
    setBureauId(m.bureauId);
    setBeatSlug(m.reportingBeatSlug);
    setArticleFormat(m.articleFormat);
    setHeroImage(m.heroImage);
    setHeroCaption(m.heroCaption);
    setHeroCredit(m.heroCredit);
    setHeroLicense(m.heroLicense);
    setHeroProvenance(m.heroProvenance || 'authentic_documentary_photograph');
    setEditorialDisclosure(m.editorialDisclosure);
    setCoiDisclosure(m.conflictOfInterestDisclosure);
    setLimitationsText((m.scientificLimitations || []).join('\n'));
    setSeoTitle(m.seoTitle);
    setMetaDescription(m.metaDescription);
    setCanonicalUrl(m.canonicalUrl);
    setSeoKeywordsText((m.seoKeywords || []).join(', '));
    setBlocks(m.blocks || []);
    if (m.revisions.length >= 2) {
      setCompareLeftId(m.revisions[1].id);
      setCompareRightId(m.revisions[0].id);
    } else if (m.revisions[0]) {
      setCompareLeftId(m.revisions[0].id);
      setCompareRightId(m.revisions[0].id);
    }
    setDirty(false);
  }, []);

  const loadManuscript = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(manuscriptId)}`,
        { credentials: 'include', cache: 'no-store' }
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Unable to load manuscript.');
      } else {
        hydrateFromManuscript(data.manuscript);
        setPreviewStory(data.previewStory);
        setCanEdit(Boolean(data.canEdit));
        setCanPublish(Boolean(data.canPublish));
        setDepartments(data.departments || []);
        setBeats(data.beats || []);
        setMediaLibrary(data.mediaLibrary || []);
      }
    } catch {
      setError('Network error loading Editorial CMS.');
    } finally {
      setLoading(false);
    }
  }, [manuscriptId, hydrateFromManuscript]);

  useEffect(() => {
    void loadManuscript();
  }, [loadManuscript]);

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4500);
  };

  const buildSavePayload = useCallback(
    (action: 'save_content' | 'autosave', forceOverwriteConcurrent = false) => ({
      action,
      headline,
      standfirst,
      subtitle,
      bylineDisplay,
      dateline,
      publicationStream: stream,
      targetEditionSlug: editionSlug,
      departmentId: deptId,
      bureauId,
      reportingBeatSlug: beatSlug,
      articleFormat,
      heroImage,
      heroCaption,
      heroCredit,
      heroLicense,
      heroProvenance,
      blocks,
      editorialDisclosure,
      conflictOfInterestDisclosure: coiDisclosure,
      scientificLimitations: limitationsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      seoTitle,
      metaDescription,
      canonicalUrl,
      seoKeywords: seoKeywordsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      revisionSummary: revisionNote,
      expectedVersionNumber: versionRef.current,
      forceOverwriteConcurrent,
    }),
    [
      headline,
      standfirst,
      subtitle,
      bylineDisplay,
      dateline,
      stream,
      editionSlug,
      deptId,
      bureauId,
      beatSlug,
      articleFormat,
      heroImage,
      heroCaption,
      heroCredit,
      heroLicense,
      heroProvenance,
      blocks,
      editorialDisclosure,
      coiDisclosure,
      limitationsText,
      seoTitle,
      metaDescription,
      canonicalUrl,
      seoKeywordsText,
      revisionNote,
    ]
  );

  // Automatic debounced background save when dirty
  useEffect(() => {
    if (!dirty || !canEdit || !ms) return;
    setAutoSaveLabel('Unsaved edits — autosaving…');
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(ms.id)}`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildSavePayload('autosave')),
          }
        );
        const data = await res.json();
        if (res.ok && data.success) {
          versionRef.current = data.manuscript.versionNumber;
          setMs(data.manuscript);
          setDirty(false);
          setAutoSaveLabel(`Autosaved v${data.manuscript.versionNumber} at ${new Date().toLocaleTimeString()}`);
        }
      } catch {
        setAutoSaveLabel('Autosave paused (offline)');
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [dirty, canEdit, ms, buildSavePayload]);

  const handleManualSave = async (forceOverwrite = false) => {
    if (!ms) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(ms.id)}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildSavePayload('save_content', forceOverwrite)),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Unable to save manuscript.');
      } else {
        setRevisionNote('');
        await loadManuscript();
        setAutoSaveLabel(`Saved checkpoint v${data.manuscript.versionNumber}`);
        flash(`Saved manuscript checkpoint v${data.manuscript.versionNumber} (${data.manuscript.wordCount} words).`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleWorkflowAction = async (payload: {
    targetStatus?: HdnWorkflowStatus;
    signOffGate?: string;
    scheduledPublicationAt?: string;
  }) => {
    if (!ms) return;
    setError(null);
    // Save pending edits first if dirty
    if (dirty && canEdit) {
      await handleManualSave();
    }
    const res = await fetch(
      `/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(ms.id)}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'transition_workflow',
          ...payload,
          note: workflowNote,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.error || 'Workflow transition denied.');
    } else {
      setWorkflowNote('');
      await loadManuscript();
      flash(`Updated workflow state to "${data.manuscript.workflowStatus.replace(/_/g, ' ')}".`);
    }
  };

  const handleRestoreRevision = async (revId: string) => {
    if (!ms) return;
    const res = await fetch(
      `/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(ms.id)}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore_revision', revisionId: revId }),
      }
    );
    const data = await res.json();
    if (res.ok && data.success) {
      await loadManuscript();
      flash(`Restored draft snapshot as version v${data.manuscript.versionNumber}.`);
    } else {
      setError(data.error || 'Unable to restore snapshot.');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ms || !commentText.trim()) return;
    const res = await fetch(
      `/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(ms.id)}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_comment',
          kind: commentKind,
          blockId: commentBlockId || undefined,
          message: commentText,
        }),
      }
    );
    const data = await res.json();
    if (res.ok && data.success) {
      setCommentText('');
      setMs(data.manuscript);
      flash('Added editorial comment to manuscript review ledger.');
    }
  };

  const handleResolveComment = async (cmtId: string) => {
    if (!ms) return;
    const res = await fetch(
      `/api/himalayan-dispatch/hdn/manuscripts/${encodeURIComponent(ms.id)}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_comment',
          kind: 'editorial_comment',
          message: '',
          resolveCommentId: cmtId,
        }),
      }
    );
    const data = await res.json();
    if (res.ok && data.success) setMs(data.manuscript);
  };

  const addBlock = (type: HdnContentBlockType) => {
    setBlocks((prev) => [...prev, createDefaultBlock(type, prev.length + 1)]);
    setDirty(true);
  };

  const updateBlock = (id: string, patch: Partial<HdnContentBlock>) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    setDirty(true);
  };

  const moveBlock = (idx: number, dir: -1 | 1) => {
    setBlocks((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      const [item] = next.splice(idx, 1);
      next.splice(target, 0, item);
      return next.map((b, i) => ({ ...b, order: i + 1 }));
    });
    setDirty(true);
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i + 1 })));
    setDirty(true);
  };

  const liveWordCount = useMemo(() => {
    const raw = [
      headline,
      standfirst,
      ...blocks.map((b) => `${b.heading || ''} ${b.bodyText || ''} ${b.quoteText || ''} ${b.caption || ''}`),
    ]
      .join(' ')
      .trim();
    return raw ? raw.split(/\s+/).filter(Boolean).length : 0;
  }, [headline, standfirst, blocks]);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-slate-500">
        Loading Himalayan Dispatch Block Editorial CMS…
      </div>
    );
  }

  if (!ms) {
    return (
      <div className="p-6 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-sm">
        {error || 'Manuscript not found or restricted.'}
      </div>
    );
  }

  const leftRev: HdnManuscriptRevision | undefined = ms.revisions.find((r) => r.id === compareLeftId);
  const rightRev: HdnManuscriptRevision | undefined = ms.revisions.find((r) => r.id === compareRightId);

  return (
    <div className="space-y-6">
      {/* Sticky Editorial CMS Header Bar */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase">
            <span className="px-2 py-0.5 rounded bg-[#8C3125]/15 text-[#8C3125] font-bold">
              STAGE {ms.lifecycleStage} · {ms.workflowStatus.replace(/_/g, ' ')}
            </span>
            <span
              className={`px-2 py-0.5 rounded font-bold ${
                ms.riskLevel === 'RED'
                  ? 'bg-rose-100 text-rose-800'
                  : ms.riskLevel === 'AMBER'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {ms.riskLevel} RISK
            </span>
            <span className="text-slate-500">
              v{ms.versionNumber} · {liveWordCount.toLocaleString()} words (~{Math.max(2, Math.round(liveWordCount / 215))} min)
            </span>
            <span className="text-slate-400">· {autoSaveLabel}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold truncate">{headline || 'Untitled Manuscript'}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href={HDN_ROUTES.previewStory(ms.id)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium inline-flex items-center gap-1.5 hover:bg-slate-100"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Full Page Preview</span>
          </Link>

          {canEdit && (
            <button
              type="button"
              disabled={saving}
              onClick={() => void handleManualSave(false)}
              className="px-3.5 py-1.5 rounded-lg border border-[#8C3125] text-[#8C3125] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#8C3125]/10"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving…' : 'Save Checkpoint'}</span>
            </button>
          )}

          {canEdit && ['assigned', 'researching', 'drafting', 'revision_requested'].includes(ms.workflowStatus) && (
            <button
              type="button"
              onClick={() => void handleWorkflowAction({ targetStatus: 'submitted' })}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit to Editorial Queue</span>
            </button>
          )}

          {canPublish && ms.workflowStatus !== 'published' && (
            <button
              type="button"
              onClick={() => void handleWorkflowAction({ targetStatus: 'published' })}
              className="px-4 py-1.5 rounded-lg bg-[#8C3125] hover:bg-[#74271D] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve &amp; Publish</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          {error.includes('Concurrent edit conflict') && (
            <button
              type="button"
              onClick={() => void handleManualSave(true)}
              className="px-2.5 py-1 rounded bg-rose-700 text-white font-semibold shrink-0 cursor-pointer"
            >
              Force Overwrite &amp; Save
            </button>
          )}
        </div>
      )}

      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* 7-Tab Editorial CMS Bar (Edit · Preview · Sources · Media · Review · SEO · History) */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200">
        {(
          [
            { id: 'edit', label: 'Edit', icon: FileText },
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'sources', label: 'Sources & Disclosures', icon: ShieldCheck },
            { id: 'media', label: 'Media & Plates', icon: ImageIcon },
            { id: 'review', label: `Review & Gates (${ms.comments.length})`, icon: FileCheck2 },
            { id: 'seo', label: 'SEO & Routing', icon: Layers },
            { id: 'history', label: `History & Diff (${ms.revisions.length})`, icon: History },
          ] as const
        ).map((tb) => {
          const Icon = tb.icon;
          return (
            <button
              key={tb.id}
              type="button"
              onClick={() => setActiveTab(tb.id)}
              className={`px-3.5 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                activeTab === tb.id
                  ? 'border-[#8C3125] text-[#8C3125]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tb.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BLOCK-BASED MAGAZINE EDITORIAL CANVAS */}
      {activeTab === 'edit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 Cols: Magazine Manuscript Canvas */}
          <div className="lg:col-span-8 space-y-5">
            {/* Top Editorial Header Metadata Card */}
            <div className="p-5 sm:p-6 rounded-xl border border-slate-200 bg-white space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Publication Stream
                  </label>
                  <select
                    disabled={!canEdit}
                    value={stream}
                    onChange={(e) => {
                      setStream(e.target.value as 'daily_dispatch' | 'monthly_edition');
                      setDirty(true);
                    }}
                    className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
                  >
                    <option value="daily_dispatch">Daily Dispatch (Continuous)</option>
                    <option value="monthly_edition">Monthly Edition (Magazine)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Regional Bureau
                  </label>
                  <select
                    disabled={!canEdit}
                    value={bureauId}
                    onChange={(e) => {
                      setBureauId(e.target.value as BureauSlugId);
                      setDirty(true);
                    }}
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
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Editorial Department
                  </label>
                  <select
                    disabled={!canEdit}
                    value={deptId}
                    onChange={(e) => {
                      setDeptId(e.target.value as EditorialDepartmentId);
                      setDirty(true);
                    }}
                    className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Dateline *
                  </label>
                  <input
                    disabled={!canEdit}
                    value={dateline}
                    onChange={(e) => {
                      setDateline(e.target.value);
                      setDirty(true);
                    }}
                    placeholder="SRINAGAR · KASHMIR BUREAU"
                    className="w-full px-3 py-2 text-xs font-mono uppercase rounded-lg border border-slate-300 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Byline Attribution
                  </label>
                  <input
                    disabled={!canEdit}
                    value={bylineDisplay}
                    onChange={(e) => {
                      setBylineDisplay(e.target.value);
                      setDirty(true);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    Reporting Beat
                  </label>
                  <select
                    disabled={!canEdit}
                    value={beatSlug}
                    onChange={(e) => {
                      setBeatSlug(e.target.value);
                      setDirty(true);
                    }}
                    className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
                  >
                    {beats.map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8C3125] font-semibold mb-1">
                  Editorial Headline *
                </label>
                <input
                  disabled={!canEdit}
                  value={headline}
                  onChange={(e) => {
                    setHeadline(e.target.value);
                    setDirty(true);
                  }}
                  placeholder="Enter magazine-grade headline…"
                  className="w-full px-3.5 py-2.5 font-serif text-2xl sm:text-3xl font-semibold rounded-lg border border-slate-300 bg-transparent"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  Standfirst (Deck)
                </label>
                <textarea
                  disabled={!canEdit}
                  rows={2}
                  value={standfirst}
                  onChange={(e) => {
                    setStandfirst(e.target.value);
                    setDirty(true);
                  }}
                  placeholder="Concise literary standfirst introducing the empirical and human stakes…"
                  className="w-full px-3.5 py-2 font-serif italic text-base rounded-lg border border-slate-300 bg-transparent"
                />
              </div>
            </div>

            {/* Structured Content Blocks Stack */}
            <div className="space-y-4">
              {blocks.map((blk, idx) => {
                const spec = BLOCK_CATALOG.find((c) => c.type === blk.type);
                return (
                  <div
                    key={blk.id}
                    className="p-5 rounded-xl border border-slate-200 bg-white space-y-3 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {String(idx + 1).padStart(2, '0')} · {spec?.label || blk.type}
                        </span>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          {spec?.purpose}
                        </span>
                      </div>

                      {canEdit && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, -1)}
                            disabled={idx === 0}
                            className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
                            title="Move Block Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, 1)}
                            disabled={idx === blocks.length - 1}
                            className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"
                            title="Move Block Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeBlock(blk.id)}
                            className="p-1 rounded text-rose-600 hover:bg-rose-50"
                            title="Remove Block"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Block-Specific Fields */}
                    {blk.type === 'rich_text' && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                          <input
                            disabled={!canEdit}
                            value={blk.chapterRoman || ''}
                            onChange={(e) => updateBlock(blk.id, { chapterRoman: e.target.value })}
                            placeholder="Roman (I, II, PROLOGUE)"
                            className="px-2.5 py-1.5 text-xs font-mono rounded border border-slate-300 bg-transparent"
                          />
                          <input
                            disabled={!canEdit}
                            value={blk.heading || ''}
                            onChange={(e) => updateBlock(blk.id, { heading: e.target.value })}
                            placeholder="Chapter / Section Heading"
                            className="sm:col-span-3 px-3 py-1.5 text-sm font-semibold rounded border border-slate-300 bg-transparent"
                          />
                        </div>
                        <textarea
                          disabled={!canEdit}
                          rows={7}
                          value={blk.bodyText || ''}
                          onChange={(e) => updateBlock(blk.id, { bodyText: e.target.value })}
                          placeholder="Write structured paragraphs separated by blank lines…"
                          className="w-full px-3.5 py-2.5 text-sm leading-relaxed rounded-lg border border-slate-300 bg-transparent font-serif"
                        />
                      </div>
                    )}

                    {blk.type === 'pull_quote' && (
                      <div className="space-y-2.5">
                        <textarea
                          disabled={!canEdit}
                          rows={2}
                          value={blk.quoteText || ''}
                          onChange={(e) => updateBlock(blk.id, { quoteText: e.target.value })}
                          placeholder="Verified quotation (never fabricate quotes)…"
                          className="w-full px-3 py-2 text-base italic font-serif rounded border border-slate-300 bg-transparent"
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input
                            disabled={!canEdit}
                            value={blk.quoteAttribution || ''}
                            onChange={(e) => updateBlock(blk.id, { quoteAttribution: e.target.value })}
                            placeholder="Speaker / Document Attribution"
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                          <input
                            disabled={!canEdit}
                            value={blk.quoteContext || ''}
                            onChange={(e) => updateBlock(blk.id, { quoteContext: e.target.value })}
                            placeholder="Verification context / date"
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                        </div>
                      </div>
                    )}

                    {blk.type === 'full_bleed_photo' && (
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input
                            disabled={!canEdit}
                            value={blk.mediaUrl || ''}
                            onChange={(e) => updateBlock(blk.id, { mediaUrl: e.target.value })}
                            placeholder="/images/publications/..."
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                          <select
                            disabled={!canEdit}
                            value={blk.provenanceType || 'authentic_documentary_photograph'}
                            onChange={(e) =>
                              updateBlock(blk.id, {
                                provenanceType: e.target.value as HdnContentBlock['provenanceType'],
                              })
                            }
                            className="px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          >
                            <option value="authentic_documentary_photograph">
                              Authentic Documentary Photograph (Unaltered)
                            </option>
                            <option value="kew_scientific_cartography">
                              KEW Scientific Cartography / Satellite Plate
                            </option>
                            <option value="archival_historical_plate">
                              Archival Historical Plate
                            </option>
                            <option value="labeled_conceptual_illustration">
                              Labeled Conceptual Illustration
                            </option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input
                            disabled={!canEdit}
                            value={blk.caption || ''}
                            onChange={(e) => updateBlock(blk.id, { caption: e.target.value })}
                            placeholder="Documentary caption & elevation context"
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                          <input
                            disabled={!canEdit}
                            value={blk.credit || ''}
                            onChange={(e) => updateBlock(blk.id, { credit: e.target.value })}
                            placeholder="Photographer / Archive Credit & License"
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                        </div>
                      </div>
                    )}

                    {blk.type === 'scientific_map' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <select
                          disabled={!canEdit}
                          value={blk.kewMapLayerId || 'watershed_basins'}
                          onChange={(e) =>
                            updateBlock(blk.id, {
                              kewMapLayerId: e.target.value as HdnContentBlock['kewMapLayerId'],
                            })
                          }
                          className="px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        >
                          <option value="watershed_basins">KEW Watershed Basins</option>
                          <option value="cryosphere_glaciers">KEW Cryosphere &amp; Glaciers</option>
                          <option value="nwia_wetlands_lakes">ISRO NWIA Wetlands &amp; Lakes</option>
                          <option value="landslide_susceptibility">PostGIS Landslide Susceptibility</option>
                          <option value="protected_wildlife_corridors">Protected Wildlife Corridors</option>
                          <option value="atmospheric_inversion">Atmospheric Inversion Monitor</option>
                        </select>
                        <input
                          disabled={!canEdit}
                          value={blk.caption || ''}
                          onChange={(e) => updateBlock(blk.id, { caption: e.target.value })}
                          placeholder="Map title / caption"
                          className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                        <input
                          disabled={!canEdit}
                          value={blk.mapMethodologyNote || ''}
                          onChange={(e) => updateBlock(blk.id, { mapMethodologyNote: e.target.value })}
                          placeholder="Spatial methodology & resolution note"
                          className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                      </div>
                    )}

                    {blk.type === 'interactive_chart' && (
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <input
                            disabled={!canEdit}
                            value={blk.heading || ''}
                            onChange={(e) => updateBlock(blk.id, { heading: e.target.value })}
                            placeholder="Chart Title"
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                          <input
                            disabled={!canEdit}
                            value={blk.keyFindingStat || ''}
                            onChange={(e) => updateBlock(blk.id, { keyFindingStat: e.target.value })}
                            placeholder="Key Stat (e.g., -23.4%)"
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                          <input
                            disabled={!canEdit}
                            value={blk.corroborationNote || ''}
                            onChange={(e) => updateBlock(blk.id, { corroborationNote: e.target.value })}
                            placeholder="Dataset Source Citation"
                            className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                          />
                        </div>
                        <input
                          disabled={!canEdit}
                          value={(blk.chartPoints || [])
                            .map((p) => `${p.yearOrLabel}:${p.primaryValue}`)
                            .join(', ')}
                          onChange={(e) => {
                            const pts = e.target.value
                              .split(',')
                              .map((pair) => {
                                const [lbl, val] = pair.split(':').map((s) => s.trim());
                                return lbl ? { yearOrLabel: lbl, primaryValue: Number(val) || 0 } : null;
                              })
                              .filter(Boolean) as NonNullable<HdnContentBlock['chartPoints']>;
                            updateBlock(blk.id, { chartPoints: pts });
                          }}
                          placeholder="Series points: 2000:100, 2010:91, 2026:74"
                          className="w-full px-3 py-1.5 text-xs font-mono rounded border border-slate-300 bg-transparent"
                        />
                      </div>
                    )}

                    {blk.type === 'scientific_equation' && (
                      <div className="space-y-2.5">
                        <input
                          disabled={!canEdit}
                          value={blk.equationLatex || ''}
                          onChange={(e) => updateBlock(blk.id, { equationLatex: e.target.value })}
                          placeholder="LaTeX / Symbolic Formula (e.g., Q = P - ET - \Delta S)"
                          className="w-full px-3 py-1.5 text-xs font-mono rounded border border-slate-300 bg-transparent"
                        />
                        <textarea
                          disabled={!canEdit}
                          rows={2}
                          value={blk.equationExplanation || ''}
                          onChange={(e) => updateBlock(blk.id, { equationExplanation: e.target.value })}
                          placeholder="Physical & ecological explanation of parameters…"
                          className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                      </div>
                    )}

                    {blk.type === 'memorial_profile' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          disabled={!canEdit}
                          value={blk.memorialName || ''}
                          onChange={(e) => updateBlock(blk.id, { memorialName: e.target.value })}
                          placeholder="Verified Name of Fallen Environmental Guardian"
                          className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                        <input
                          disabled={!canEdit}
                          value={blk.memorialDivisionOrRegion || ''}
                          onChange={(e) =>
                            updateBlock(blk.id, { memorialDivisionOrRegion: e.target.value })
                          }
                          placeholder="Forest / Wildlife Division & Year"
                          className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                        <textarea
                          disabled={!canEdit}
                          rows={2}
                          value={blk.memorialTribute || ''}
                          onChange={(e) => updateBlock(blk.id, { memorialTribute: e.target.value })}
                          placeholder="Verified service & legacy documentation…"
                          className="sm:col-span-2 px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                      </div>
                    )}

                    {blk.type === 'related_kew_intelligence' && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <input
                          disabled={!canEdit}
                          value={blk.kewModuleLabel || ''}
                          onChange={(e) => updateBlock(blk.id, { kewModuleLabel: e.target.value })}
                          placeholder="KEW Observatory Title"
                          className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                        <input
                          disabled={!canEdit}
                          value={blk.kewModuleHref || ''}
                          onChange={(e) => updateBlock(blk.id, { kewModuleHref: e.target.value })}
                          placeholder="/water-systems/lakes/wular-lake"
                          className="px-3 py-1.5 text-xs font-mono rounded border border-slate-300 bg-transparent"
                        />
                        <input
                          disabled={!canEdit}
                          value={blk.kewScientificContext || ''}
                          onChange={(e) => updateBlock(blk.id, { kewScientificContext: e.target.value })}
                          placeholder="Why this module anchors the story"
                          className="px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                      </div>
                    )}

                    {/* Generic fallback fields for remaining specialized block types */}
                    {![
                      'rich_text',
                      'pull_quote',
                      'full_bleed_photo',
                      'scientific_map',
                      'interactive_chart',
                      'scientific_equation',
                      'memorial_profile',
                      'related_kew_intelligence',
                    ].includes(blk.type) && (
                      <div className="space-y-2.5">
                        <input
                          disabled={!canEdit}
                          value={
                            blk.heading ||
                            blk.datelineLocation ||
                            blk.interviewSubject ||
                            blk.tableKicker ||
                            ''
                          }
                          onChange={(e) =>
                            updateBlock(blk.id, {
                              heading: e.target.value,
                              datelineLocation: e.target.value,
                            })
                          }
                          placeholder={`${spec?.label || 'Block'} Heading / Primary Reference`}
                          className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                        <textarea
                          disabled={!canEdit}
                          rows={3}
                          value={
                            blk.bodyText ||
                            blk.corroborationNote ||
                            blk.aiDisclosureText ||
                            blk.transcriptSummary ||
                            blk.citationDoi ||
                            ''
                          }
                          onChange={(e) =>
                            updateBlock(blk.id, {
                              bodyText: e.target.value,
                              corroborationNote: e.target.value,
                              aiDisclosureText: e.target.value,
                            })
                          }
                          placeholder="Structured content, citations, or verified transcript details…"
                          className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 4 Cols: 18-Block Component Palette & Checkpoint Note */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Article Components (18)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Click to insert</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {BLOCK_CATALOG.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    disabled={!canEdit}
                    onClick={() => addBlock(item.type)}
                    className="p-2 text-left rounded-lg border border-slate-200 hover:border-[#8C3125] hover:bg-[#8C3125]/5 text-xs transition-colors cursor-pointer disabled:opacity-40"
                    title={item.purpose}
                  >
                    <div className="font-semibold text-[11px] flex items-center gap-1">
                      <Plus className="w-3 h-3 text-[#8C3125] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {canEdit && (
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider">
                  Manual Revision Note
                </label>
                <input
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="e.g., Added Wular bathymetry table & citations"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => void handleManualSave(false)}
                  className="w-full py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer"
                >
                  Save Named Version Snapshot
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* TAB 2: CINEMATIC MAGAZINE LAYOUT PREVIEW */}
      {activeTab === 'preview' && previewStory && (
        <div className="rounded-xl overflow-hidden border border-slate-300 shadow-lg">
          <div className="px-4 py-2 bg-stone-900 text-amber-200 text-xs font-mono flex items-center justify-between">
            <span>LIVE HIMALAYAN DISPATCH MAGAZINE RENDER PREVIEW</span>
            <span>{ms.workflowStatus === 'published' ? 'PUBLIC LIVE' : 'PRIVATE DRAFT PREVIEW'}</span>
          </div>
          <DispatchThemeProvider>
            <div className="bg-[#F6F3EC] text-[#161514]">
              <StoryReaderClient story={previewStory} journalist={null} nextStory={null} />
            </div>
          </DispatchThemeProvider>
        </div>
      )}

      {/* TAB 3: SOURCES, SCIENTIFIC LIMITATIONS & DISCLOSURES */}
      {activeTab === 'sources' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Editorial, AI &amp; Conflict-of-Interest Disclosures
            </h2>
            <div>
              <label className="block text-xs font-semibold mb-1">
                Methodology &amp; AI Assistance Disclosure
              </label>
              <textarea
                disabled={!canEdit}
                rows={4}
                value={editorialDisclosure}
                onChange={(e) => {
                  setEditorialDisclosure(e.target.value);
                  setDirty(true);
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">
                Conflict-of-Interest Declaration
              </label>
              <textarea
                disabled={!canEdit}
                rows={2}
                value={coiDisclosure}
                onChange={(e) => {
                  setCoiDisclosure(e.target.value);
                  setDirty(true);
                }}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
              />
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Scientific Limitations &amp; Evidence Gaps (1 per line)
            </h2>
            <textarea
              disabled={!canEdit}
              rows={6}
              value={limitationsText}
              onChange={(e) => {
                setLimitationsText(e.target.value);
                setDirty(true);
              }}
              placeholder="Document sensor resolution limits, seasonal sampling gaps, or pending right-of-reply responses…"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
            <Link
              href={HDN_ROUTES.sources}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C3125] hover:underline"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Open Restricted Confidential Source Vault &amp; Interview Register →</span>
            </Link>
          </div>
        </div>
      )}

      {/* TAB 4: HERO PHOTOGRAPHY & MEDIA PROVENANCE */}
      {activeTab === 'media' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-5 rounded-xl border border-slate-200 bg-white space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Lead Hero Plate &amp; Provenance
            </h2>
            {heroImage && (
              <div className="aspect-[16/9] rounded-lg overflow-hidden border border-slate-200 bg-slate-950">
                <img src={heroImage} alt={heroCaption} className="w-full h-full object-cover" />
              </div>
            )}
            <input
              disabled={!canEdit}
              value={heroImage}
              onChange={(e) => {
                setHeroImage(e.target.value);
                setDirty(true);
              }}
              placeholder="Hero Image URL"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
            <input
              disabled={!canEdit}
              value={heroCaption}
              onChange={(e) => {
                setHeroCaption(e.target.value);
                setDirty(true);
              }}
              placeholder="Hero Caption"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
            <div className="grid grid-cols-2 gap-2.5">
              <input
                disabled={!canEdit}
                value={heroCredit}
                onChange={(e) => {
                  setHeroCredit(e.target.value);
                  setDirty(true);
                }}
                placeholder="Photographer / Archive Credit"
                className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
              />
              <input
                disabled={!canEdit}
                value={heroLicense}
                onChange={(e) => {
                  setHeroLicense(e.target.value);
                  setDirty(true);
                }}
                placeholder="Licensing Terms"
                className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
              />
            </div>
          </div>

          <div className="lg:col-span-6 p-5 rounded-xl border border-slate-200 bg-white space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Approved Newsroom Media Library (Click to Assign Hero)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {mediaLibrary.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  disabled={!canEdit}
                  onClick={() => {
                    setHeroImage(asset.url);
                    setHeroCaption(asset.caption);
                    setHeroCredit(asset.photographerOrCreator);
                    setHeroLicense(asset.licensingInfo);
                    setDirty(true);
                  }}
                  className="text-left p-2.5 rounded-lg border border-slate-200 hover:border-[#8C3125] space-y-1.5 cursor-pointer"
                >
                  <img
                    src={asset.url}
                    alt={asset.title}
                    className="w-full h-24 object-cover rounded"
                  />
                  <div className="text-xs font-semibold truncate">{asset.title}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {asset.provenanceClassification.replace(/_/g, ' ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EDITORIAL REVIEW GATES, WORKFLOW CONTROLS & INLINE COMMENTS */}
      {activeTab === 'review' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Verification Gates &amp; Separation-of-Duties Controls
            </h2>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold">Stage 07 · Independent Fact-Checking</div>
                  <div className="text-slate-500">
                    {ms.factCheckCompleted
                      ? `Completed by ${ms.factCheckedBy}`
                      : 'Required before final approval'}
                  </div>
                </div>
                {hasPerm('workflow:fact_check') && !ms.factCheckCompleted && (
                  <button
                    type="button"
                    onClick={() => void handleWorkflowAction({ signOffGate: 'complete_fact_check' })}
                    className="px-3 py-1.5 rounded bg-emerald-700 text-white font-semibold cursor-pointer"
                  >
                    Sign Off Fact-Check
                  </button>
                )}
              </div>

              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    Stage 08 · Scientific Review {ms.scientificReviewRequired ? '(Mandatory)' : '(Optional)'}
                  </div>
                  <div className="text-slate-500">
                    {ms.scientificReviewCompleted
                      ? `Verified by ${ms.scientificReviewedBy}`
                      : 'Technical assessment of empirical claims'}
                  </div>
                </div>
                {hasPerm('workflow:scientific_review') && !ms.scientificReviewCompleted && (
                  <button
                    type="button"
                    onClick={() =>
                      void handleWorkflowAction({ signOffGate: 'complete_scientific_review' })
                    }
                    className="px-3 py-1.5 rounded bg-emerald-700 text-white font-semibold cursor-pointer"
                  >
                    Approve Scientific Review
                  </button>
                )}
              </div>

              <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    Stage 09 · Legal &amp; Right-of-Reply Review{' '}
                    {ms.legalReviewRequired ? '(Mandatory RED)' : '(Optional)'}
                  </div>
                  <div className="text-slate-500">
                    {ms.legalReviewCompleted ? `Cleared by ${ms.legalReviewedBy}` : 'Pending'}
                  </div>
                </div>
                {hasPerm('workflow:legal_review') && !ms.legalReviewCompleted && (
                  <button
                    type="button"
                    onClick={() => void handleWorkflowAction({ signOffGate: 'complete_legal_review' })}
                    className="px-3 py-1.5 rounded bg-emerald-700 text-white font-semibold cursor-pointer"
                  >
                    Clear Legal Review
                  </button>
                )}
              </div>
            </div>

            {hasPerm('workspace:editorial') && (
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <label className="block text-xs font-semibold">
                  Editorial Transition / Revision Note
                </label>
                <input
                  value={workflowNote}
                  onChange={(e) => setWorkflowNote(e.target.value)}
                  placeholder="Optional note to reporter or audit log…"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void handleWorkflowAction({ targetStatus: 'revision_requested' })}
                    className="px-3 py-1.5 rounded bg-amber-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    Request Author Revisions
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleWorkflowAction({ targetStatus: 'fact_checking' })}
                    className="px-3 py-1.5 rounded border border-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Send to Fact-Check
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleWorkflowAction({ targetStatus: 'scientific_review' })}
                    className="px-3 py-1.5 rounded border border-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    Send to Scientific Review
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleWorkflowAction({ targetStatus: 'ready_for_approval' })}
                    className="px-3 py-1.5 rounded bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                  >
                    Mark Ready for Approval
                  </button>
                  {ms.workflowStatus === 'published' && hasPerm('publication:unpublish') && (
                    <button
                      type="button"
                      onClick={() => void handleWorkflowAction({ signOffGate: 'unpublish' })}
                      className="px-3 py-1.5 rounded bg-rose-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Unpublish Article
                    </button>
                  )}
                </div>

                {hasPerm('publication:schedule') && (
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="datetime-local"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        scheduleDate &&
                        void handleWorkflowAction({
                          targetStatus: 'scheduled',
                          scheduledPublicationAt: scheduleDate,
                        })
                      }
                      className="px-3 py-1.5 rounded border border-[#8C3125] text-[#8C3125] text-xs font-semibold cursor-pointer"
                    >
                      Schedule Release
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Inline Annotations, Revision Requests & Author Responses */}
          <div className="lg:col-span-6 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Editorial Comments, Inline Annotations &amp; Author Responses
            </h2>
            <form onSubmit={handleAddComment} className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={commentKind}
                  onChange={(e) => setCommentKind(e.target.value as typeof commentKind)}
                  className="px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                >
                  <option value="editorial_comment">Editorial Comment</option>
                  <option value="inline_annotation">Block Annotation</option>
                  <option value="revision_request">Formal Revision Request</option>
                  <option value="author_response">Author Response</option>
                </select>
                <select
                  value={commentBlockId}
                  onChange={(e) => setCommentBlockId(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded border border-slate-300 bg-transparent"
                >
                  <option value="">General Manuscript</option>
                  {blocks.map((b, idx) => (
                    <option key={b.id} value={b.id}>
                      Block {idx + 1}: {b.heading || b.type}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write feedback, inline note, or revision response…"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-[#8C3125] text-white text-xs font-semibold cursor-pointer"
              >
                Post Note
              </button>
            </form>

            <div className="space-y-2.5 max-h-80 overflow-y-auto">
              {ms.comments.length === 0 ? (
                <p className="text-xs text-slate-500">No editorial annotations yet.</p>
              ) : (
                ms.comments.map((c) => (
                  <div
                    key={c.id}
                    className={`p-3 rounded-lg border text-xs space-y-1 ${
                      c.resolved
                        ? 'opacity-60 border-slate-200'
                        : c.kind === 'revision_request'
                          ? 'border-amber-400 bg-amber-50/60'
                          : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {c.authorName} · <span className="uppercase font-mono text-[10px]">{c.kind.replace(/_/g, ' ')}</span>
                      </span>
                      {!c.resolved && (
                        <button
                          type="button"
                          onClick={() => void handleResolveComment(c.id)}
                          className="text-[10px] text-emerald-700 font-semibold hover:underline cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                    <p className="leading-relaxed">{c.message}</p>
                    <div className="text-[10px] text-slate-400">{c.createdAt.slice(0, 16).replace('T', ' ')} UTC</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SEO METADATA & CANONICAL ROUTING */}
      {activeTab === 'seo' && (
        <div className="max-w-2xl p-5 rounded-xl border border-slate-200 bg-white space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Search Metadata, Edition Assignment &amp; Canonical URL
          </h2>
          <div>
            <label className="block text-xs font-semibold mb-1">SEO Title</label>
            <input
              disabled={!canEdit}
              value={seoTitle}
              onChange={(e) => {
                setSeoTitle(e.target.value);
                setDirty(true);
              }}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Meta Description</label>
            <textarea
              disabled={!canEdit}
              rows={3}
              value={metaDescription}
              onChange={(e) => {
                setMetaDescription(e.target.value);
                setDirty(true);
              }}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1">Target Monthly Edition Slug</label>
              <input
                disabled={!canEdit}
                value={editionSlug}
                onChange={(e) => {
                  setEditionSlug(e.target.value);
                  setDirty(true);
                }}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Canonical Path</label>
              <input
                disabled={!canEdit}
                value={canonicalUrl}
                onChange={(e) => {
                  setCanonicalUrl(e.target.value);
                  setDirty(true);
                }}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 bg-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Keywords (comma-separated)</label>
            <input
              disabled={!canEdit}
              value={seoKeywordsText}
              onChange={(e) => {
                setSeoKeywordsText(e.target.value);
                setDirty(true);
              }}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-transparent"
            />
          </div>
        </div>
      )}

      {/* TAB 7: REVISION HISTORY, DRAFT RECOVERY & SIDE-BY-SIDE VERSION COMPARISON */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-[#8C3125]" />
                <span>Side-by-Side Editorial Version Comparison</span>
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={compareLeftId}
                  onChange={(e) => setCompareLeftId(e.target.value)}
                  className="px-2.5 py-1.5 rounded border border-slate-300 bg-transparent"
                >
                  {ms.revisions.map((r) => (
                    <option key={r.id} value={r.id}>
                      Left: v{r.versionNumber} ({r.savedAt.slice(0, 16).replace('T', ' ')})
                    </option>
                  ))}
                </select>
                <span>vs</span>
                <select
                  value={compareRightId}
                  onChange={(e) => setCompareRightId(e.target.value)}
                  className="px-2.5 py-1.5 rounded border border-slate-300 bg-transparent"
                >
                  {ms.revisions.map((r) => (
                    <option key={r.id} value={r.id}>
                      Right: v{r.versionNumber} ({r.savedAt.slice(0, 16).replace('T', ' ')})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {leftRev && rightRev && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[leftRev, rightRev].map((rev, idx) => (
                  <div
                    key={`${rev.id}-${idx}`}
                    className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-2 text-xs"
                  >
                    <div className="font-mono text-[10px] uppercase text-slate-500">
                      v{rev.versionNumber} · {rev.actorName} · {rev.wordCount} words
                    </div>
                    <div className="font-serif text-base font-bold">{rev.headline}</div>
                    <div className="italic text-slate-600">{rev.standfirst}</div>
                    <div className="pt-2 border-t border-slate-200 space-y-2 max-h-72 overflow-y-auto whitespace-pre-wrap font-serif">
                      {rev.blocksSnapshot.map((b) => b.bodyText || b.quoteText || b.heading).join('\n\n')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider">
              Complete Revision Checkpoints &amp; Draft Recovery
            </h2>
            <div className="divide-y divide-slate-200">
              {ms.revisions.map((rev) => (
                <div
                  key={rev.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-[#8C3125]">
                      v{rev.versionNumber}
                    </span>{' '}
                    · <span className="font-semibold">{rev.actorName}</span> ({rev.saveKind}) —{' '}
                    <span>{rev.summary}</span>
                    <div className="text-[11px] text-slate-500">
                      {rev.savedAt.slice(0, 19).replace('T', ' ')} UTC · {rev.wordCount} words · Status:{' '}
                      {rev.workflowStatus}
                    </div>
                  </div>
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => void handleRestoreRevision(rev.id)}
                      className="px-3 py-1.5 rounded border border-slate-300 hover:border-[#8C3125] inline-flex items-center gap-1 font-semibold shrink-0 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Recover v{rev.versionNumber}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
