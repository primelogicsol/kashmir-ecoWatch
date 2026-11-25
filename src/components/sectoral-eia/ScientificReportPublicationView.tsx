'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  BookOpen,
  Activity,
  Map as MapIcon,
  Database,
  Gauge,
  AlertTriangle,
  Library,
  History,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  List,
  Maximize2,
  Minimize2,
  Compass,
  Layers,
  Share2,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import type { CanonicalReportMasterRecord } from '@/data/sectoral-research-content-engine';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { SectoralImpactMap } from '@/components/sectoral-eia/SectoralImpactMap';
import {
  ReportActionToolbar,
  ReportDisplayMode,
  ReportIntelligenceTab,
} from '@/components/sectoral-eia/ReportActionToolbar';
import { ReportShareModal } from '@/components/sectoral-eia/ReportShareModal';
import { isVerifiedRealDoi } from '@/lib/seo/structured-data';

export interface SerializedPdfMetadata {
  filename: string;
  pageCount: number;
  byteLength: number;
  sha256: string;
  downloadUrl: string;
  inlineViewerUrl: string;
}

interface ScientificReportPublicationViewProps {
  master: CanonicalReportMasterRecord;
  pdfMetadata: SerializedPdfMetadata | null;
  workflowStages: readonly string[];
  workflowStageIndex: number;
  initialTab?: string;
  initialMode?: string;
  relatedReportsSummary: Array<{
    code: string;
    title: string;
    status: string;
    divisionTitle: string;
  }>;
}

function formatStatusBadgeStyle(status: string): string {
  switch (status) {
    case 'Published':
    case 'Updated':
      return 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300';
    case 'Scientific Review':
    case 'Draft Assessment':
      return 'border-cyan-500/40 bg-cyan-950/60 text-cyan-300';
    case 'Under Investigation':
    case 'Data Acquisition':
      return 'border-sky-500/40 bg-sky-950/60 text-sky-300';
    case 'Archived':
      return 'border-slate-600 bg-slate-900 text-slate-400';
    default:
      return 'border-amber-500/40 bg-amber-950/50 text-amber-300';
  }
}

function formatProvenanceBadgeStyle(prov: string): string {
  switch (prov) {
    case 'Directly Measured':
    case 'Laboratory-Tested':
      return 'border-emerald-500/40 bg-emerald-950/50 text-emerald-300';
    case 'Satellite-Derived':
      return 'border-cyan-500/40 bg-cyan-950/50 text-cyan-300';
    case 'Literature-Derived':
    case 'Historical Record':
      return 'border-sky-500/40 bg-sky-950/50 text-sky-300';
    case 'Modelled Estimate':
    case 'Preliminary Finding':
      return 'border-amber-500/40 bg-amber-950/50 text-amber-300';
    default:
      return 'border-slate-600 bg-slate-900 text-slate-400';
  }
}

export function ScientificReportPublicationView({
  master,
  pdfMetadata,
  workflowStages,
  workflowStageIndex,
  initialTab,
  initialMode,
  relatedReportsSummary,
}: ScientificReportPublicationViewProps) {
  const { dossier } = master;
  const isPublished = dossier.status === 'Published' || dossier.status === 'Updated';

  const normalizeInitialTab = (raw?: string): ReportIntelligenceTab => {
    if (!raw) return 'report';
    if (raw === 'historical') return 'indicators';
    const valid: ReportIntelligenceTab[] = [
      'report',
      'telemetry',
      'gis',
      'datasets',
      'indicators',
      'risk',
      'references',
      'history',
    ];
    return valid.includes(raw as ReportIntelligenceTab)
      ? (raw as ReportIntelligenceTab)
      : 'report';
  };

  const [activeTab, setActiveTab] = useState<ReportIntelligenceTab>(() =>
    normalizeInitialTab(initialTab)
  );
  const [highlightHistorical, setHighlightHistorical] = useState(
    initialTab === 'historical'
  );
  const [displayMode, setDisplayMode] = useState<ReportDisplayMode>(
    initialMode === 'pdf' ? 'pdf' : 'html'
  );
  const [activeChapterNum, setActiveChapterNum] = useState<string>(
    master.chapters[0]?.number || '01'
  );
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [shareAnchor, setShareAnchor] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  // Embedded PDF viewer controls
  const [pdfPage, setPdfPage] = useState<number>(1);
  const [pdfZoom, setPdfZoom] = useState<string>('page-width');
  const [pdfFullscreen, setPdfFullscreen] = useState<boolean>(false);
  const [scopingPreviewConfirmed, setScopingPreviewConfirmed] = useState<boolean>(false);

  // Telemetry filters
  const [selectedStation, setSelectedStation] = useState<string>('ALL');
  const [selectedSeason, setSelectedSeason] = useState<string>('ALL');

  // Reference category filter
  const [selectedRefCategory, setSelectedRefCategory] = useState<string>('ALL');

  useEffect(() => {
    setMounted(true);
    // Fire client view analytics once per mount
    fetch('/api/sectoral-eia/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: dossier.code, eventType: 'report_view' }),
    }).catch(() => {});
  }, [dossier.code]);

  // Reading progress & active chapter scrollspy
  useEffect(() => {
    if (activeTab !== 'report' || displayMode !== 'html') return;

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / docHeight) * 100)));
        setReadingProgress(pct);
      }

      let current = master.chapters[0]?.number || '01';
      for (const ch of master.chapters) {
        const el = document.getElementById(`chapter-${ch.number}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            current = ch.number;
          }
        }
      }
      setActiveChapterNum(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, displayMode, master.chapters]);

  const activeChapterIndex = useMemo(() => {
    const idx = master.chapters.findIndex((c) => c.number === activeChapterNum);
    return idx >= 0 ? idx : 0;
  }, [master.chapters, activeChapterNum]);

  const filteredTelemetryPoints = useMemo(() => {
    return master.telemetrySeries.points.filter((pt) => {
      const stationOk = selectedStation === 'ALL' || pt.station === selectedStation;
      const seasonOk = selectedSeason === 'ALL' || pt.season === selectedSeason;
      return stationOk && seasonOk;
    });
  }, [master.telemetrySeries.points, selectedStation, selectedSeason]);

  const filteredReferences = useMemo(() => {
    if (selectedRefCategory === 'ALL') return master.references;
    return master.references.filter((r) => r.category === selectedRefCategory);
  }, [master.references, selectedRefCategory]);

  // Extract inline citation numbers referenced in the currently active chapter
  const activeChapterCitations = useMemo(() => {
    const ch = master.chapters[activeChapterIndex];
    if (!ch) return master.references.slice(0, 3);
    const joined = ch.paragraphs.join(' ');
    const matches = Array.from(joined.matchAll(/\[(\d+)\]/g)).map((m) => Number(m[1]));
    const uniqueNums = Array.from(new Set(matches));
    if (uniqueNums.length === 0) return master.references.slice(0, 3);
    return master.references.filter((r) => uniqueNums.includes(r.num));
  }, [master.chapters, activeChapterIndex, master.references]);

  const jumpToChapter = (chapterNum: string) => {
    setDisplayMode('html');
    setActiveTab('report');
    setMobileTocOpen(false);
    setTimeout(() => {
      const el = document.getElementById(`chapter-${chapterNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveChapterNum(chapterNum);
      }
    }, 60);
  };

  const jumpToReference = (refNum: number) => {
    setDisplayMode('html');
    setActiveTab('references');
    setSelectedRefCategory('ALL');
    setTimeout(() => {
      const el = document.getElementById(`ref-entry-${refNum}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const renderParagraphWithCitations = (text: string) => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, idx) => {
      const match = part.match(/^\[(\d+)\]$/);
      if (match) {
        const refNum = Number(match[1]);
        const refObj = master.references.find((r) => r.num === refNum);
        return (
          <button
            key={idx}
            type="button"
            onClick={() => jumpToReference(refNum)}
            title={
              refObj
                ? `[${refNum}] ${refObj.authors} (${refObj.year}) — ${refObj.title}`
                : `Jump to Reference [${refNum}]`
            }
            className="mx-0.5 inline-flex items-center rounded-sm border border-emerald-500/40 bg-emerald-950/60 px-1 py-0 text-[11px] font-mono font-semibold text-emerald-300 hover:bg-emerald-800/70 transition-colors align-baseline"
          >
            [{refNum}]
          </button>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  const exportChapterTableCsv = (headers: string[], rows: string[][], tableNumber: string) => {
    const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [
      headers.map(esc).join(','),
      ...rows.map((r) => r.map(esc).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dossier.code}-${tableNumber.replace(/\s+/g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const displayedPages = pdfMetadata?.pageCount || dossier.pages;

  const tabs: Array<{
    id: ReportIntelligenceTab;
    label: string;
    countLabel?: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'report',
      label: 'Research Report',
      countLabel: `${master.chapters.length} Ch`,
      icon: BookOpen,
    },
    {
      id: 'telemetry',
      label: 'Environmental Telemetry',
      countLabel: `${master.telemetrySeries.points.length} Pts`,
      icon: Activity,
    },
    {
      id: 'gis',
      label: 'GIS & Satellite',
      icon: MapIcon,
    },
    {
      id: 'datasets',
      label: 'Scientific Datasets',
      countLabel: `${master.datasets.length}`,
      icon: Database,
    },
    {
      id: 'indicators',
      label: 'Indicators & Baseline',
      countLabel: `${master.indicators.length}`,
      icon: Gauge,
    },
    {
      id: 'risk',
      label: 'Risk & Impact Matrix',
      countLabel: `${master.riskMatrix.length}`,
      icon: AlertTriangle,
    },
    {
      id: 'references',
      label: 'Scientific References',
      countLabel: `${master.references.length}`,
      icon: Library,
    },
    {
      id: 'history',
      label: 'Revision & Workflow',
      countLabel: master.version,
      icon: History,
    },
  ];

  const inlinePdfSrc = isPublished
    ? `/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/pdf?disposition=inline#page=${pdfPage}&zoom=${pdfZoom}`
    : `/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/pdf?disposition=inline&preview=scoping#page=${pdfPage}&zoom=${pdfZoom}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 print:bg-white print:text-slate-900">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-6">
        {/* ── LAYER A: COMPACT INSTITUTIONAL METADATA HEADER ── */}
        <header className="space-y-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 print:hidden"
          >
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link href="/sectoral-eia" className="hover:text-emerald-400 transition-colors">
              Sectoral EIA Engine
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <Link
              href="/sectoral-eia/reports"
              className="hover:text-emerald-400 transition-colors"
            >
              Research Series 2026
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="font-mono text-emerald-400">{dossier.code}</span>
          </nav>

          <div className="kew-card rounded-lg border border-slate-800 bg-slate-900/95 p-5 sm:p-6 space-y-4 print:border-slate-300 print:bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/90 pb-3.5 print:border-slate-300">
              <div className="flex flex-wrap items-center gap-2">
                <KewBrandIdentity variant="eyebrow" />
                <span className="rounded-sm border border-slate-700 bg-slate-950 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400 print:border-slate-400 print:bg-slate-100 print:text-slate-900">
                  {dossier.code}
                </span>
                <span className="rounded-sm border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-300 print:border-slate-400 print:bg-slate-100 print:text-slate-800">
                  Sector {dossier.divisionRoman}: {dossier.divisionTitle}
                </span>
                <span
                  className={`rounded-sm border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${formatStatusBadgeStyle(
                    dossier.status
                  )}`}
                >
                  {dossier.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                <span>
                  {isPublished ? `Published: ${dossier.date}` : `Schedule: ${dossier.date}`}
                </span>
                <span>·</span>
                <span>
                  {isPublished
                    ? `${displayedPages} Verified PDF Pages`
                    : `${dossier.pages}-Page Target Scope`}
                </span>
                <span>·</span>
                <span>{master.version}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  {master.estimatedReadingMinutes} min read
                </span>
              </div>
            </div>

            {/* ── LAYER B: SCIENTIFIC REPORT TITLE & SUBTITLE ── */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-tight print:text-slate-950">
                {dossier.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl print:text-slate-700">
                {master.subtitle}
              </p>
            </div>

            {/* Scientific Governance Notice for Proposed / Unpublished Dossiers */}
            {!isPublished && (
              <div className="rounded-md border border-amber-500/40 bg-amber-950/30 p-3.5 text-xs text-amber-200 leading-relaxed flex items-start gap-2.5">
                <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold uppercase tracking-wider text-amber-300">
                    Scientific Governance & Secondary-Data Scoping Notice:{' '}
                  </span>
                  {dossier.code} is currently classified as <strong>{dossier.status}</strong>. All
                  baseline parameters, watershed boundaries, and risk indicators presented below are
                  derived strictly from verified secondary scientific literature, statutory baseline
                  audits, and multi-spectral satellite archives. Original KEW field sampling,
                  laboratory assays, final publication date, and public dataset exports remain locked
                  until completion of the 19-stage institutional validation workflow.
                </div>
              </div>
            )}

            {/* ── LAYER E: VERIFIED INVESTIGATOR & INSTITUTIONAL ATTRIBUTION ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80 text-xs print:border-slate-300">
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-3 print:border-slate-300 print:bg-slate-50">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  {master.attribution.isProposedWorkingGroup
                    ? 'Proposed Scientific Working Group'
                    : 'Lead Scientific Working Group'}
                </div>
                <div className="mt-1 font-semibold text-white print:text-slate-900">
                  {master.attribution.workingGroup}
                </div>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-3 print:border-slate-300 print:bg-slate-50">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  Study Basin & Elevation Band
                </div>
                <div className="mt-1 font-semibold text-slate-200 print:text-slate-900">
                  {master.studyArea.watershed} ({master.studyArea.elevationBand})
                </div>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-3 print:border-slate-300 print:bg-slate-50">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  Evidence Provenance Classification
                </div>
                <div className="mt-1 font-semibold text-emerald-300 print:text-slate-900">
                  {master.dataQualityLabel}
                </div>
              </div>
              <div className="rounded-md border border-slate-800 bg-slate-950/80 p-3 print:border-slate-300 print:bg-slate-50">
                <div className="text-[11px] uppercase tracking-wider text-slate-400">
                  Peer Review & Audit Oversight
                </div>
                <div className="mt-1 font-semibold text-slate-200 print:text-slate-900">
                  {master.attribution.reviewPanel}
                </div>
              </div>
            </div>
          </div>

          {/* ── LAYER C & D: HERO VISUAL + STRUCTURED 7-PART ABSTRACT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Authenticated Study Landscape Visual */}
            <figure className="lg:col-span-5 kew-card rounded-lg border border-slate-800 bg-slate-900 overflow-hidden flex flex-col justify-between print:border-slate-300">
              <div className="relative h-60 sm:h-72 lg:h-full min-h-[250px] w-full bg-slate-950 overflow-hidden">
                <img
                  src={master.heroVisual.src}
                  alt={master.heroVisual.caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 rounded-sm border border-slate-700/90 bg-slate-950/90 px-2.5 py-1 text-[11px] font-mono text-emerald-300">
                  {master.heroVisual.locationLabel}
                </div>
              </div>
              <figcaption className="border-t border-slate-800 bg-slate-950 p-3.5 space-y-1 text-xs text-slate-300 print:bg-slate-50 print:text-slate-700">
                <p className="font-medium text-slate-200 leading-snug print:text-slate-900">
                  {master.heroVisual.caption}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono pt-1">
                  <span>Source: {master.heroVisual.sourceAttribution}</span>
                  <span>{master.heroVisual.acquisitionWindow}</span>
                </div>
              </figcaption>
            </figure>

            {/* Structured 7-Part Scientific Abstract */}
            <section
              aria-label="Structured Scientific Abstract"
              className="lg:col-span-7 kew-card rounded-lg border border-slate-800 bg-slate-900 p-5 space-y-3 print:border-slate-300 print:bg-white"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 print:border-slate-300">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-slate-900">
                  Structured Scientific Abstract · {dossier.code}
                </h2>
                <span className="text-[11px] font-mono text-slate-400">
                  Districts: {master.studyArea.districts.join(', ')}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-300 block mb-0.5 print:text-slate-900">
                    1. Ecological Background
                  </span>
                  <p className="text-slate-300 print:text-slate-700">
                    {master.structuredAbstract.background}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-300 block mb-0.5 print:text-slate-900">
                    2. Environmental Problem
                  </span>
                  <p className="text-slate-300 print:text-slate-700">
                    {master.structuredAbstract.problem}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-300 block mb-0.5 print:text-slate-900">
                    3. Research Objectives
                  </span>
                  <p className="text-slate-300 print:text-slate-700">
                    {master.structuredAbstract.objectives}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-300 block mb-0.5 print:text-slate-900">
                    4. Scientific Methodology
                  </span>
                  <p className="text-slate-300 print:text-slate-700">
                    {master.structuredAbstract.methodology}
                  </p>
                </div>
                <div className="sm:col-span-2 rounded-md border border-slate-800 bg-slate-950/70 p-3 print:border-slate-300 print:bg-slate-50">
                  <span className="font-bold uppercase tracking-wider text-emerald-400 block mb-0.5 print:text-slate-900">
                    5. Validated Evidence & Synthesis
                  </span>
                  <p className="text-slate-200 print:text-slate-800">
                    {master.structuredAbstract.findings}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-300 block mb-0.5 print:text-slate-900">
                    6. Policy & Basin Implications
                  </span>
                  <p className="text-slate-300 print:text-slate-700">
                    {master.structuredAbstract.implications}
                  </p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-300 block mb-0.5 print:text-slate-900">
                    7. Recommended Interventions
                  </span>
                  <p className="text-slate-300 print:text-slate-700">
                    {master.structuredAbstract.interventions}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </header>

        {/* ── LAYER F: REUSABLE REPORT ACTION TOOLBAR ── */}
        <ReportActionToolbar
          code={dossier.code}
          title={dossier.title}
          author={dossier.author}
          publicationDate={dossier.date}
          version={master.version}
          pages={displayedPages}
          isPublished={isPublished}
          displayMode={displayMode}
          onChangeDisplayMode={setDisplayMode}
          onSelectTab={(tab) => {
            setHighlightHistorical(false);
            setActiveTab(tab);
          }}
          onOpenShareModal={() => {
            setShareAnchor('');
            setShareModalOpen(true);
          }}
        />

        {/* ── EMBEDDED INSTITUTIONAL PDF DOCUMENT VIEWER MODE ── */}
        {displayMode === 'pdf' ? (
          <section
            aria-label="Embedded Scientific PDF Document Viewer"
            className={`${
              pdfFullscreen
                ? 'fixed inset-3 z-50 flex flex-col rounded-lg border border-slate-700 bg-slate-950 shadow-2xl p-4'
                : 'kew-card rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-3'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <FileText className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">
                  {pdfMetadata?.filename || `${dossier.code}-Scoping-Charter.pdf`}
                </span>
                {pdfMetadata && (
                  <span className="rounded-sm border border-slate-700 bg-slate-950 px-2 py-0.5 text-[11px] font-mono text-slate-300">
                    {pdfMetadata.pageCount} Pages · {(pdfMetadata.byteLength / 1024).toFixed(1)} KB ·
                    SHA-256 {pdfMetadata.sha256.slice(0, 12)}…
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs">
                  <span className="text-slate-400">Page:</span>
                  <input
                    type="number"
                    min={1}
                    max={displayedPages}
                    value={pdfPage}
                    onChange={(e) =>
                      setPdfPage(
                        Math.max(1, Math.min(displayedPages, Number(e.target.value) || 1))
                      )
                    }
                    className="w-12 rounded-sm border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-center font-mono text-xs text-white"
                  />
                  <span className="text-slate-400 font-mono">/ {displayedPages}</span>
                </div>

                <select
                  aria-label="PDF Zoom Level"
                  value={pdfZoom}
                  onChange={(e) => setPdfZoom(e.target.value)}
                  className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-200"
                >
                  <option value="page-width">Fit Width</option>
                  <option value="page-fit">Fit Page</option>
                  <option value="75">75%</option>
                  <option value="100">100%</option>
                  <option value="125">125%</option>
                </select>

                {isPublished && (
                  <>
                    <a
                      href={`/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/pdf?disposition=inline`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-200 hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open Tab
                    </a>
                    <a
                      href={`/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/pdf`}
                      download
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download PDF
                    </a>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setPdfFullscreen((prev) => !prev)}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 hover:text-white"
                >
                  {pdfFullscreen ? (
                    <>
                      <Minimize2 className="h-3.5 w-3.5" />
                      Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-3.5 w-3.5" />
                      Fullscreen
                    </>
                  )}
                </button>
              </div>
            </div>

            {isPublished || scopingPreviewConfirmed ? (
              <iframe
                key={`${inlinePdfSrc}`}
                src={inlinePdfSrc}
                title={`PDF Viewer — ${dossier.code}`}
                className={`w-full rounded-md border border-slate-800 bg-white ${
                  pdfFullscreen ? 'flex-1 min-h-0' : 'h-[780px]'
                }`}
              />
            ) : (
              <div className="rounded-md border border-amber-500/30 bg-slate-950 p-8 text-center space-y-4">
                <ShieldAlert className="h-10 w-10 text-amber-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">
                  Final Publication PDF Locked Pending Field & Peer-Review Validation
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  In accordance with Kashmir EcoWatch scientific governance rules, official public
                  research monograph PDFs are released only once a dossier achieves{' '}
                  <strong>Published</strong> status. You may read the complete secondary-data
                  scoping assessment in HTML mode or inspect the watermarked Secondary-Data Scoping
                  Charter PDF below.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setDisplayMode('html')}
                    className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-semibold text-white"
                  >
                    Read Full HTML Scoping Assessment
                  </button>
                  <button
                    type="button"
                    onClick={() => setScopingPreviewConfirmed(true)}
                    className="rounded-md border border-amber-500/40 bg-amber-950/40 hover:bg-amber-950/70 px-4 py-2 text-xs font-semibold text-amber-200"
                  >
                    Inspect Watermarked Scoping Charter PDF
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* ── 8 RESEARCH INTELLIGENCE TABS BAR ── */}
            <div
              role="tablist"
              aria-label="Scientific Dossier Intelligence Sections"
              className="flex items-center gap-1.5 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 p-1.5 print:hidden"
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => {
                      setHighlightHistorical(false);
                      setActiveTab(tab.id);
                    }}
                    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                    {tab.countLabel && (
                      <span
                        className={`rounded-sm px-1.5 py-0.5 font-mono text-[10px] ${
                          active
                            ? 'bg-emerald-800/80 text-emerald-100'
                            : 'bg-slate-950 text-slate-400'
                        }`}
                      >
                        {tab.countLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── TAB 1: 3-COLUMN SCIENTIFIC RESEARCH REPORT ── */}
            {activeTab === 'report' && (
              <div className="space-y-4">
                {/* Mobile TOC Drawer Trigger */}
                <div className="lg:hidden print:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileTocOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between rounded-md border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200"
                  >
                    <span className="inline-flex items-center gap-2">
                      <List className="h-4 w-4 text-emerald-400" />
                      Chapter {activeChapterNum} of {master.chapters.length} · Table of Contents
                    </span>
                    <span className="font-mono text-emerald-400">{readingProgress}% Read</span>
                  </button>

                  {mobileTocOpen && (
                    <div className="mt-2 rounded-md border border-slate-800 bg-slate-900 p-3 max-h-72 overflow-y-auto space-y-1">
                      {master.chapters.map((ch) => (
                        <button
                          key={ch.number}
                          type="button"
                          onClick={() => jumpToChapter(ch.number)}
                          className={`w-full text-left rounded-sm px-2.5 py-1.5 text-xs flex items-center gap-2 ${
                            activeChapterNum === ch.number
                              ? 'bg-emerald-950/80 text-emerald-300 font-semibold'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-mono text-[11px] text-slate-500">{ch.number}</span>
                          <span className="truncate">{ch.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop 3-Column Layout: ~22% Left TOC | ~56% Center Content | ~22% Right Intelligence */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* LEFT COLUMN: Sticky Table of Contents & Reading Progress */}
                  <aside
                    aria-label="Report Table of Contents"
                    className="hidden lg:block lg:col-span-3 sticky top-32 kew-card rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-3 max-h-[calc(100vh-9rem)] overflow-y-auto print:hidden"
                  >
                    <div className="space-y-1.5 border-b border-slate-800 pb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono uppercase tracking-wider text-slate-400">
                          Document Outline
                        </span>
                        <span className="font-mono font-bold text-emerald-400">
                          {readingProgress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-sm bg-slate-950 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-200"
                          style={{ width: `${readingProgress}%` }}
                        />
                      </div>
                    </div>

                    <nav className="space-y-0.5">
                      {master.chapters.map((ch) => {
                        const isActive = activeChapterNum === ch.number;
                        return (
                          <button
                            key={ch.number}
                            type="button"
                            onClick={() => jumpToChapter(ch.number)}
                            className={`w-full text-left rounded-sm px-2.5 py-1.5 text-xs transition-colors flex items-start gap-2 ${
                              isActive
                                ? 'border-l-2 border-emerald-400 bg-emerald-950/50 text-emerald-200 font-semibold'
                                : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                            }`}
                          >
                            <span className="font-mono text-[11px] text-emerald-400/80 shrink-0 mt-0.5">
                              {ch.number}
                            </span>
                            <span className="leading-snug">{ch.title}</span>
                          </button>
                        );
                      })}
                    </nav>

                    <div className="border-t border-slate-800 pt-3 space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveTab('references')}
                        className="w-full text-left rounded-sm px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 flex items-center justify-between"
                      >
                        <span>Bibliography & DOIs</span>
                        <span className="font-mono text-[11px] text-emerald-400">
                          [{master.references.length}]
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('kew-limitations-panel');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left rounded-sm px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
                      >
                        Methodological Limitations
                      </button>
                    </div>
                  </aside>

                  {/* CENTER COLUMN: Primary Scientific Prose, Equations, Tables & Figures */}
                  <main className="lg:col-span-6 space-y-6">
                    {master.chapters.map((ch) => (
                      <article
                        key={ch.number}
                        id={`chapter-${ch.number}`}
                        className="scroll-mt-36 kew-card rounded-lg border border-slate-800 bg-slate-900 p-5 sm:p-7 space-y-4 print:border-slate-300 print:bg-white print:shadow-none"
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3 print:border-slate-300">
                          <div>
                            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-slate-700">
                              Chapter {ch.number} · {dossier.code}
                            </div>
                            <h2 className="mt-0.5 text-lg sm:text-xl font-bold text-white leading-snug print:text-slate-950">
                              {ch.title}
                            </h2>
                            {ch.subtitle && (
                              <p className="mt-1 text-xs text-slate-400 print:text-slate-600">
                                {ch.subtitle}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setShareAnchor(ch.number);
                              setShareModalOpen(true);
                            }}
                            title={`Share direct link to Chapter ${ch.number}`}
                            className="rounded-md border border-slate-800 bg-slate-950 p-1.5 text-slate-400 hover:text-emerald-300 hover:border-slate-600 transition-colors print:hidden"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Scientific Prose (controlled 65–72ch line measure) */}
                        <div className="space-y-3.5 max-w-[72ch] text-[15px] leading-[1.75] text-slate-200 print:text-slate-800">
                          {ch.paragraphs.map((para, pIdx) => (
                            <p key={pIdx}>{renderParagraphWithCitations(para)}</p>
                          ))}
                        </div>

                        {/* Mathematical / Hydrological Equation Block */}
                        {ch.equation && (
                          <div className="rounded-md border border-emerald-500/30 bg-slate-950 p-4 space-y-1.5 print:border-slate-400 print:bg-slate-50">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 print:text-slate-700">
                              Governing Analytical Expression
                            </div>
                            <div className="font-mono text-sm sm:text-base font-bold text-white overflow-x-auto py-1 print:text-slate-950">
                              {ch.equation.expression}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed print:text-slate-700">
                              {ch.equation.explanation}
                            </p>
                          </div>
                        )}

                        {/* Structured Scientific Table */}
                        {ch.table && (
                          <div className="space-y-2 pt-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <span className="text-xs font-mono font-bold text-emerald-400 print:text-slate-900">
                                  {ch.table.tableNumber}.{' '}
                                </span>
                                <span className="text-xs font-semibold text-white print:text-slate-900">
                                  {ch.table.title}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  exportChapterTableCsv(
                                    ch.table!.headers,
                                    ch.table!.rows,
                                    ch.table!.tableNumber
                                  )
                                }
                                className="inline-flex items-center gap-1 rounded-sm border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] font-mono text-slate-300 hover:text-emerald-300 print:hidden"
                              >
                                <Download className="h-3 w-3" />
                                Export Table (.CSV)
                              </button>
                            </div>

                            <div className="responsive-table-container rounded-md border border-slate-800 bg-slate-950 print:border-slate-400 print:bg-white">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300 print:bg-slate-100 print:text-slate-900">
                                    {ch.table.headers.map((h, i) => (
                                      <th key={i} className="px-3 py-2.5 font-semibold">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/80 print:divide-slate-300">
                                  {ch.table.rows.map((row, rIdx) => (
                                    <tr
                                      key={rIdx}
                                      className="hover:bg-slate-900/50 text-slate-200 print:text-slate-800"
                                    >
                                      {row.map((cell, cIdx) => (
                                        <td
                                          key={cIdx}
                                          className={`px-3 py-2 ${
                                            cIdx === 0 ? 'font-semibold text-white print:text-slate-950' : ''
                                          }`}
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono print:text-slate-600">
                              Source & Provenance: {ch.table.sourceNote}
                            </p>
                          </div>
                        )}

                        {/* Embedded Comparative Scientific Figure (Recharts) */}
                        {ch.chart && (
                          <div className="rounded-md border border-slate-800 bg-slate-950 p-4 space-y-3 print:border-slate-400 print:bg-white">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <div className="text-xs font-mono font-bold text-cyan-400 print:text-slate-900">
                                  {ch.chart.figureNumber} · {ch.chart.observationPeriod}
                                </div>
                                <h3 className="text-sm font-bold text-white print:text-slate-950">
                                  {ch.chart.title} ({ch.chart.unit})
                                </h3>
                              </div>
                              <span className="rounded-sm border border-slate-700 bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-slate-300">
                                Unit: {ch.chart.unit}
                              </span>
                            </div>

                            {mounted ? (
                              <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart
                                    data={ch.chart.bars}
                                    margin={{ top: 10, right: 16, left: 0, bottom: 8 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis
                                      dataKey="label"
                                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    />
                                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <RechartsTooltip
                                      contentStyle={{
                                        backgroundColor: '#0f172a',
                                        border: '1px solid #334155',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                      }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                                    <Bar
                                      dataKey="baseline"
                                      name={`Historical Baseline (${ch.chart.unit})`}
                                      fill="#0ea5e9"
                                      radius={[2, 2, 0, 0]}
                                    />
                                    <Bar
                                      dataKey="observed"
                                      name={`Observed / Reported (${ch.chart.unit})`}
                                      fill="#10b981"
                                      radius={[2, 2, 0, 0]}
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            ) : (
                              <div className="h-64 w-full flex items-center justify-center text-xs text-slate-400">
                                Loading comparative scientific figure…
                              </div>
                            )}

                            <p className="text-xs text-slate-300 leading-relaxed print:text-slate-700">
                              <strong className="text-white print:text-slate-900">
                                Interpretation:{' '}
                              </strong>
                              {ch.chart.interpretation}
                            </p>
                            <p className="text-[11px] font-mono text-slate-400">
                              Source: {ch.chart.source}
                            </p>
                          </div>
                        )}

                        {ch.limitationsNote && (
                          <div className="rounded-md border border-amber-500/30 bg-amber-950/20 p-3 text-xs text-amber-200">
                            <strong>Methodological Note: </strong>
                            {ch.limitationsNote}
                          </div>
                        )}
                      </article>
                    ))}

                    {/* Methodological & Data Limitations Disclosure Panel */}
                    <section
                      id="kew-limitations-panel"
                      className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-3 print:border-slate-300 print:bg-white"
                    >
                      <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-400 print:text-slate-900">
                        Scientific Uncertainty & Data Limitations Disclosure
                      </h2>
                      <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-5 print:text-slate-700">
                        {master.limitations.map((lim, idx) => (
                          <li key={idx}>{lim}</li>
                        ))}
                      </ul>
                    </section>

                    {/* Previous / Next Chapter Navigation */}
                    <div className="flex items-center justify-between gap-3 pt-2 print:hidden">
                      <button
                        type="button"
                        disabled={activeChapterIndex <= 0}
                        onClick={() => {
                          if (activeChapterIndex > 0) {
                            jumpToChapter(master.chapters[activeChapterIndex - 1].number);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-600 disabled:opacity-40"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous Chapter
                      </button>
                      <button
                        type="button"
                        disabled={activeChapterIndex >= master.chapters.length - 1}
                        onClick={() => {
                          if (activeChapterIndex < master.chapters.length - 1) {
                            jumpToChapter(master.chapters[activeChapterIndex + 1].number);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-slate-600 disabled:opacity-40"
                      >
                        Next Chapter
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </main>

                  {/* RIGHT COLUMN: Dynamic Contextual Research Intelligence Panel */}
                  <aside
                    aria-label="Contextual Research Intelligence"
                    className="lg:col-span-3 sticky top-32 space-y-4 print:hidden"
                  >
                    {/* Active Chapter Context Card */}
                    <div className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                          Active Context · Ch {activeChapterNum}
                        </span>
                        <Compass className="h-3.5 w-3.5 text-emerald-400" />
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="rounded-md border border-slate-800 bg-slate-950 p-2.5">
                          <div className="text-[10px] font-mono uppercase text-slate-400">
                            Coordinates & Spatial Extent
                          </div>
                          <div className="mt-0.5 font-mono text-slate-200">
                            {master.studyArea.coordinates[0].toFixed(4)}°N,{' '}
                            {master.studyArea.coordinates[1].toFixed(4)}°E ·{' '}
                            {master.studyArea.spatialExtentKm2}
                          </div>
                        </div>

                        {/* Top Key Indicators Snapshot */}
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Key Basin Indicators
                          </div>
                          {master.indicators.slice(0, 3).map((ind) => (
                            <div
                              key={ind.id}
                              className="rounded-md border border-slate-800 bg-slate-950 p-2.5 space-y-0.5"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-semibold text-slate-200 truncate">
                                  {ind.name}
                                </span>
                                <span className="font-mono text-[11px] text-emerald-400 shrink-0">
                                  {ind.observedValue !== null
                                    ? `${ind.observedValue} ${ind.unit}`
                                    : 'Unavailable'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-slate-400">
                                <span>{ind.provenanceClass}</span>
                                <span>{ind.uncertainty}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab('indicators')}
                        className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:border-emerald-500/50 transition-colors"
                      >
                        Inspect All {master.indicators.length} Indicators →
                      </button>
                    </div>

                    {/* Active Chapter Cited Sources */}
                    <div className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-2.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                        Chapter Cited Evidence
                      </div>
                      <div className="space-y-2">
                        {activeChapterCitations.map((ref) => (
                          <button
                            key={ref.id}
                            type="button"
                            onClick={() => jumpToReference(ref.num)}
                            className="w-full text-left rounded-md border border-slate-800 bg-slate-950 p-2.5 hover:border-slate-600 transition-colors space-y-0.5"
                          >
                            <div className="text-[11px] font-mono text-emerald-400">
                              [{ref.num}] {ref.authors} ({ref.year})
                            </div>
                            <div className="text-xs text-slate-300 line-clamp-2 leading-snug">
                              {ref.title}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Linked KEW Intelligence Modules & Related Dossiers */}
                    <div className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
                        <Layers className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Connected KEW Systems</span>
                      </div>
                      <div className="space-y-1.5">
                        {master.relatedKewModules.map((mod) => (
                          <Link
                            key={mod.route}
                            href={mod.route}
                            className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950 px-2.5 py-2 text-xs text-slate-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                          >
                            <span>{mod.label}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                          </Link>
                        ))}
                      </div>

                      {relatedReportsSummary.length > 0 && (
                        <div className="pt-2 border-t border-slate-800 space-y-1.5">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                            Related Research Dossiers
                          </div>
                          {relatedReportsSummary.map((rel) => (
                            <Link
                              key={rel.code}
                              href={`/sectoral-eia/reports/${rel.code.toLowerCase()}`}
                              className="block rounded-md border border-slate-800 bg-slate-950 p-2.5 hover:border-slate-600 transition-colors"
                            >
                              <div className="flex items-center justify-between text-[11px] font-mono">
                                <span className="text-emerald-400 font-bold">{rel.code}</span>
                                <span className="text-slate-400">{rel.status}</span>
                              </div>
                              <div className="mt-0.5 text-xs text-slate-200 line-clamp-2 leading-snug">
                                {rel.title}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {/* ── TAB 2: ENVIRONMENTAL TELEMETRY & TIME-SERIES EXPLORER ── */}
            {activeTab === 'telemetry' && (
              <section className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                      Report-Specific Environmental Telemetry · {dossier.code}
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-white">
                      {master.telemetrySeries.indicatorLabel} ({master.telemetrySeries.unit})
                    </h2>
                    <p className="mt-1 text-xs text-slate-300">
                      {master.telemetrySeries.sourceNote}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-sm border px-2.5 py-1 text-xs font-semibold ${formatProvenanceBadgeStyle(
                        master.telemetrySeries.provenanceClass
                      )}`}
                    >
                      Provenance: {master.telemetrySeries.provenanceClass}
                    </span>
                    {isPublished && (
                      <a
                        href={`/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/dataset?format=csv`}
                        className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export Telemetry (.CSV)
                      </a>
                    )}
                  </div>
                </div>

                {/* Station & Season Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                      Monitoring Station / Sub-Basin
                    </label>
                    <select
                      value={selectedStation}
                      onChange={(e) => setSelectedStation(e.target.value)}
                      className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    >
                      <option value="ALL">All Stations ({master.telemetrySeries.stations.length})</option>
                      {master.telemetrySeries.stations.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                      Seasonal Regime Filter
                    </label>
                    <select
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(e.target.value)}
                      className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white"
                    >
                      <option value="ALL">All Seasonal Windows</option>
                      <option value="Spring">Spring (Melt / Pre-Sowing)</option>
                      <option value="Summer">Summer (Peak Activity)</option>
                      <option value="Autumn">Autumn (Post-Harvest / Low Flow)</option>
                      <option value="Winter">Winter (Baseflow / Inversion)</option>
                      <option value="Annual">Annual Synthesis</option>
                    </select>
                  </div>

                  <div className="rounded-md border border-slate-800 bg-slate-950 p-3 flex flex-col justify-center">
                    <span className="text-[11px] font-mono uppercase text-slate-400">
                      Filtered Observations
                    </span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      {filteredTelemetryPoints.length} Verified Series Records
                    </span>
                  </div>
                </div>

                {mounted && filteredTelemetryPoints.length > 0 ? (
                  <div className="h-80 w-full rounded-md border border-slate-800 bg-slate-950 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={filteredTelemetryPoints}
                        margin={{ top: 12, right: 20, left: 4, bottom: 8 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                            fontSize: '12px',
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar
                          dataKey="primaryValue"
                          name={`Observed (${master.telemetrySeries.unit})`}
                          fill="#10b981"
                          radius={[2, 2, 0, 0]}
                        />
                        <Line
                          type="monotone"
                          dataKey="baselineReference"
                          name={`Historical Baseline (${master.telemetrySeries.unit})`}
                          stroke="#38bdf8"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="thresholdLimit"
                          name={`Ecological Threshold (${master.telemetrySeries.unit})`}
                          stroke="#f59e0b"
                          strokeDasharray="5 5"
                          strokeWidth={2}
                          dot={false}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="rounded-md border border-slate-800 bg-slate-950 p-6 text-center text-xs text-slate-400">
                    No observations match the selected station/season filter. Reset filters above to
                    inspect full series.
                  </div>
                )}

                {/* Tabular Telemetry Ledger */}
                <div className="responsive-table-container rounded-md border border-slate-800 bg-slate-950">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                        <th className="px-3 py-2.5">Period</th>
                        <th className="px-3 py-2.5">Season</th>
                        <th className="px-3 py-2.5">Station / Sub-Basin</th>
                        <th className="px-3 py-2.5">Observed ({master.telemetrySeries.unit})</th>
                        <th className="px-3 py-2.5">Baseline ({master.telemetrySeries.unit})</th>
                        <th className="px-3 py-2.5">Threshold ({master.telemetrySeries.unit})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {filteredTelemetryPoints.map((pt, idx) => (
                        <tr key={idx} className="text-slate-200 hover:bg-slate-900/50">
                          <td className="px-3 py-2 font-mono">{pt.period}</td>
                          <td className="px-3 py-2">{pt.season}</td>
                          <td className="px-3 py-2 font-medium text-white">{pt.station}</td>
                          <td className="px-3 py-2 font-mono text-emerald-300">{pt.primaryValue}</td>
                          <td className="px-3 py-2 font-mono text-sky-300">
                            {pt.baselineReference}
                          </td>
                          <td className="px-3 py-2 font-mono text-amber-300">
                            {pt.thresholdLimit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ── TAB 3: INTERACTIVE GIS & SATELLITE INTELLIGENCE ── */}
            {activeTab === 'gis' && (
              <section className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      Spatial & Watershed Intelligence · {dossier.code}
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-white">
                      {master.studyArea.watershed} — {master.studyArea.ecosystem}
                    </h2>
                    <p className="mt-1 text-xs text-slate-300">
                      Centroid: {master.studyArea.coordinates[0].toFixed(4)}°N,{' '}
                      {master.studyArea.coordinates[1].toFixed(4)}°E · Elevation:{' '}
                      {master.studyArea.elevationBand} · Spatial Domain:{' '}
                      {master.studyArea.spatialExtentKm2}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {isPublished && (
                      <a
                        href={`/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/dataset?format=geojson`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download Spatial GeoJSON
                      </a>
                    )}
                    <Link
                      href="/gis-mapping"
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white"
                    >
                      Open KEW GIS Observatory
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <SectoralImpactMap selectedSector={dossier.sector} className="h-[520px]" />
              </section>
            )}

            {/* ── TAB 4: SCIENTIFIC DATASETS & MULTI-FORMAT EXPORT ── */}
            {activeTab === 'datasets' && (
              <section className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-5">
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Open Environmental Data Governance · {dossier.code}
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Report-Specific Scientific Datasets & Multi-Format Exports
                  </h2>
                  <p className="mt-1 text-xs text-slate-300">
                    All exported datasets preserve SI units, observation periods, uncertainty bounds,
                    and explicit provenance classifications. Missing measurements are encoded as{' '}
                    <code className="text-amber-300">Unavailable</code> — never substituted with zero.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {master.datasets.map((ds) => (
                    <div
                      key={ds.datasetId}
                      className="rounded-lg border border-slate-800 bg-slate-950 p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs text-emerald-400 font-bold">
                            {ds.datasetId}
                          </span>
                          <h3 className="mt-0.5 text-sm font-bold text-white">{ds.name}</h3>
                        </div>
                        <span
                          className={`rounded-sm border px-2 py-0.5 text-[11px] font-semibold ${formatProvenanceBadgeStyle(
                            ds.qualityClass
                          )}`}
                        >
                          {ds.qualityClass}
                        </span>
                      </div>

                      <dl className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <div>
                          <dt className="text-[11px] text-slate-500">Primary Source</dt>
                          <dd className="font-medium">{ds.source}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Observation Window</dt>
                          <dd className="font-mono">{ds.observationPeriod}</dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Spatial / Temporal Res.</dt>
                          <dd>
                            {ds.spatialResolution} · {ds.temporalResolution}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[11px] text-slate-500">Validated Records</dt>
                          <dd className="font-mono">
                            {ds.recordCount} rows ({ds.version})
                          </dd>
                        </div>
                      </dl>

                      {isPublished && ds.availableForDownload ? (
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                          {ds.formats.map((fmt) => (
                            <a
                              key={fmt}
                              href={`/api/sectoral-eia/reports/${dossier.code.toLowerCase()}/dataset?format=${fmt.toLowerCase()}`}
                              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/50 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Export {fmt}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-md border border-amber-500/30 bg-amber-950/25 p-2.5 text-xs text-amber-200">
                          Public dataset export activates automatically once {dossier.code} completes
                          KEW field validation and peer review.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── TAB 5: ENVIRONMENTAL INDICATORS & HISTORICAL COMPARISON ── */}
            {activeTab === 'indicators' && (
              <section className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      Validated Indicator & Historical Baseline Matrix · {dossier.code}
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-white">
                      Environmental Indicators & Multi-Decadal Baseline Comparison
                    </h2>
                  </div>
                  {highlightHistorical && (
                    <span className="rounded-sm border border-cyan-500/40 bg-cyan-950/50 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                      Historical Baseline Comparison Active
                    </span>
                  )}
                </div>

                <div className="responsive-table-container rounded-md border border-slate-800 bg-slate-950">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                        <th className="px-3 py-2.5">Parameter & Definition</th>
                        <th className="px-3 py-2.5">Unit</th>
                        <th className="px-3 py-2.5">Historical Baseline</th>
                        <th className="px-3 py-2.5">Observed / Reported</th>
                        <th className="px-3 py-2.5">Baseline Delta</th>
                        <th className="px-3 py-2.5">Threshold</th>
                        <th className="px-3 py-2.5">Uncertainty</th>
                        <th className="px-3 py-2.5">Provenance</th>
                        <th className="px-3 py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {master.indicators.map((ind) => {
                        const hasDelta =
                          ind.baselineValue !== null &&
                          ind.observedValue !== null &&
                          ind.baselineValue !== 0;
                        const pctDelta = hasDelta
                          ? (((ind.observedValue! - ind.baselineValue!) / Math.abs(ind.baselineValue!)) * 100).toFixed(1)
                          : null;

                        return (
                          <tr key={ind.id} className="text-slate-200 hover:bg-slate-900/50">
                            <td className="px-3 py-2.5 max-w-xs">
                              <div className="font-semibold text-white">{ind.name}</div>
                              <div className="text-[11px] text-slate-400 leading-snug mt-0.5">
                                {ind.scientificDefinition}
                              </div>
                              <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                                {ind.sourceAttribution} ({ind.observationDate})
                              </div>
                            </td>
                            <td className="px-3 py-2.5 font-mono">{ind.unit}</td>
                            <td className="px-3 py-2.5 font-mono text-sky-300">
                              {ind.baselineValue !== null ? ind.baselineValue : 'Unavailable'}
                            </td>
                            <td className="px-3 py-2.5 font-mono font-bold text-emerald-300">
                              {ind.observedValue !== null ? ind.observedValue : 'Unavailable'}
                            </td>
                            <td className="px-3 py-2.5 font-mono">
                              {pctDelta !== null ? (
                                <span
                                  className={
                                    Number(pctDelta) > 0 ? 'text-amber-300' : 'text-cyan-300'
                                  }
                                >
                                  {Number(pctDelta) > 0 ? `+${pctDelta}%` : `${pctDelta}%`}
                                </span>
                              ) : (
                                <span className="text-slate-500">Pending</span>
                              )}
                            </td>
                            <td className="px-3 py-2.5 font-mono text-slate-300">
                              {ind.thresholdValue !== null ? ind.thresholdValue : 'N/A'}
                            </td>
                            <td className="px-3 py-2.5 font-mono text-slate-400">
                              {ind.uncertainty}
                            </td>
                            <td className="px-3 py-2.5">
                              <span
                                className={`inline-block rounded-sm border px-2 py-0.5 text-[11px] font-medium ${formatProvenanceBadgeStyle(
                                  ind.provenanceClass
                                )}`}
                              >
                                {ind.provenanceClass}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 font-semibold">{ind.classification}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ── TAB 6: RISK & CUMULATIVE IMPACT MATRIX ── */}
            {activeTab === 'risk' && (
              <section className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-5">
                <div className="border-b border-slate-800 pb-4 space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Multi-Criteria Receptor Risk Evaluation · {dossier.code}
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Cumulative Impact & Ecological Vulnerability Matrix
                  </h2>
                </div>

                <div className="rounded-md border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300 flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Transparent Scoring Methodology: </strong>
                    Cumulative Receptor Risk Score (0–100) is computed as a weighted composite of
                    Exceedance Severity (35%), Temporal Persistence (25%), Spatial Watershed Extent
                    (20%), and Ecological Irreversibility (20%), calibrated against statutory CPCB /
                    NWMP / Ramsar ecological thresholds.
                  </div>
                </div>

                <div className="responsive-table-container rounded-md border border-slate-800 bg-slate-950">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                        <th className="px-3 py-2.5">Ecological Receptor / Process</th>
                        <th className="px-3 py-2.5">Anthropogenic Pressure Driver</th>
                        <th className="px-3 py-2.5">Severity</th>
                        <th className="px-3 py-2.5">Duration</th>
                        <th className="px-3 py-2.5">Spatial Extent</th>
                        <th className="px-3 py-2.5">Reversibility</th>
                        <th className="px-3 py-2.5">Risk Score</th>
                        <th className="px-3 py-2.5">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {master.riskMatrix.map((rk, idx) => (
                        <tr key={idx} className="text-slate-200 hover:bg-slate-900/50">
                          <td className="px-3 py-2.5 font-semibold text-white">
                            {rk.receptorOrProcess}
                          </td>
                          <td className="px-3 py-2.5">{rk.pressureDriver}</td>
                          <td className="px-3 py-2.5 font-semibold text-amber-300">{rk.severity}</td>
                          <td className="px-3 py-2.5">{rk.duration}</td>
                          <td className="px-3 py-2.5">{rk.spatialExtent}</td>
                          <td className="px-3 py-2.5">{rk.reversibility}</td>
                          <td className="px-3 py-2.5 font-mono font-bold text-emerald-300">
                            {rk.cumulativeScore}/100
                          </td>
                          <td className="px-3 py-2.5 font-mono">{rk.mitigationPriority}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ── TAB 7: VERIFIED SCIENTIFIC REFERENCES ── */}
            {activeTab === 'references' && (
              <section className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      Verified Literature & Statutory Evidence · {dossier.code}
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-white">
                      Numbered Bibliography & Source Provenance
                    </h2>
                  </div>

                  <select
                    value={selectedRefCategory}
                    onChange={(e) => setSelectedRefCategory(e.target.value)}
                    className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="ALL">All Evidence Categories ({master.references.length})</option>
                    <option value="Peer-Reviewed Journal">Peer-Reviewed Journal</option>
                    <option value="Government / Statutory Audit">
                      Government / Statutory Audit
                    </option>
                    <option value="Institutional Monograph">Institutional Monograph</option>
                    <option value="Satellite / Geospatial Product">
                      Satellite / Geospatial Product
                    </option>
                  </select>
                </div>

                <div className="space-y-3">
                  {filteredReferences.map((ref) => {
                    const validDoi = isVerifiedRealDoi(ref.doi);
                    return (
                      <div
                        key={ref.id}
                        id={`ref-entry-${ref.num}`}
                        className="rounded-md border border-slate-800 bg-slate-950 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-sm border border-emerald-500/40 bg-emerald-950/60 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300">
                              [{ref.num}]
                            </span>
                            <span className="rounded-sm border border-slate-700 bg-slate-900 px-2 py-0.5 text-[11px] text-slate-300">
                              {ref.category}
                            </span>
                            <span className="font-mono text-xs text-slate-400">{ref.year}</span>
                          </div>
                          <p className="text-sm font-semibold text-white">{ref.title}</p>
                          <p className="text-xs text-slate-300">
                            {ref.authors} · <em className="text-slate-400">{ref.journalOrPublisher}</em>
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {validDoi && ref.doi && (
                            <a
                              href={`https://doi.org/${ref.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-950/50 px-2.5 py-1.5 text-xs font-mono text-emerald-300 hover:bg-emerald-900/60"
                            >
                              DOI: {ref.doi}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {ref.sourceUrl && (
                            <a
                              href={ref.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 hover:text-white"
                            >
                              Inspect Source
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── TAB 8: REVISION HISTORY & 19-STAGE PUBLICATION WORKFLOW ── */}
            {activeTab === 'history' && (
              <section className="kew-card rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Audit Trail & Editorial Governance · {dossier.code}
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-white">
                    Publication Revision History & 19-Stage Validation Gate
                  </h2>
                </div>

                {/* 19-Stage Institutional Workflow Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-slate-300">
                      19-Stage Scientific Publication Workflow
                    </span>
                    <span className="font-mono text-emerald-400">
                      Stage {workflowStageIndex + 1} of {workflowStages.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {workflowStages.map((stage, idx) => {
                      const done = idx <= workflowStageIndex;
                      return (
                        <div
                          key={stage}
                          className={`rounded-md border px-3 py-2 text-xs flex items-center gap-2 ${
                            done
                              ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                              : 'border-slate-800 bg-slate-950 text-slate-500'
                          }`}
                        >
                          <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ${
                              done ? 'text-emerald-400' : 'text-slate-700'
                            }`}
                          />
                          <span className="truncate">{stage}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Revision Ledger */}
                <div className="responsive-table-container rounded-md border border-slate-800 bg-slate-950">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900 text-slate-300">
                        <th className="px-3 py-2.5">Version</th>
                        <th className="px-3 py-2.5">Date</th>
                        <th className="px-3 py-2.5">Lifecycle Status</th>
                        <th className="px-3 py-2.5">Scientific Review Unit</th>
                        <th className="px-3 py-2.5">Editorial & Methodological Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {master.revisionHistory.map((rev, idx) => (
                        <tr key={idx} className="text-slate-200">
                          <td className="px-3 py-2.5 font-mono font-bold text-emerald-300">
                            {rev.version}
                          </td>
                          <td className="px-3 py-2.5 font-mono">{rev.date}</td>
                          <td className="px-3 py-2.5">{rev.status}</td>
                          <td className="px-3 py-2.5">{rev.reviewerOrUnit}</td>
                          <td className="px-3 py-2.5 text-slate-300">{rev.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Reusable Report Sharing Modal */}
      <ReportShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        code={dossier.code}
        title={dossier.title}
        abstract={dossier.abstract}
        sectorLabel={dossier.divisionTitle}
        isPublished={isPublished}
        chapters={master.chapters.map((c) => ({ number: c.number, title: c.title }))}
        initialChapterAnchor={shareAnchor}
      />
    </div>
  );
}
