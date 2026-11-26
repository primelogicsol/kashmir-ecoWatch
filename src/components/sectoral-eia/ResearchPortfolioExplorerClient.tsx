'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Download,
  FileText,
  History,
  Layers,
  Lock,
  Map as MapIcon,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { KewOfficialPublicationLogo } from '@/components/common/Logo';
import { ModuleKpiStrip, ModuleKpi } from '@/components/common/ModuleKpiStrip';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import {
  computeResearchSeriesPortfolioStats,
  RECOMMENDED_SERIES_DATA_SOURCES,
  RESEARCH_PUBLICATION_STATUS_DEFINITIONS,
  RESEARCH_SERIES_DIVISIONS,
  SCIENTIFIC_INFRASTRUCTURE_PILLARS,
  STANDARD_DOSSIER_CHAPTERS,
} from '@/data/sectoral-research-series-2026';
import {
  buildDuplicationScopeEntry,
  KEW_MODULE_TO_REPORT_COVERAGE_MATRIX,
  PRIORITY_15_RESEARCH_QUEUE,
} from '@/data/research-portfolio-100-expansion';
import {
  ResearchDivisionId,
  ResearchDossierStatus,
  ResearchSeriesDossier,
} from '@/types/sectoral-eia';

type CohortFilter = 'all' | 'published' | 'priority_15' | 'original_40' | 'expanded_60';

/**
 * Authoritative Public Display Sequence & Maturity Priority (Published First -> Archived Last).
 * Administrative workflow remains chronological (Proposed -> Published), whereas the public
 * research library presents validated scientific maturity first.
 */
export const PUBLIC_STATUS_FILTER_SEQUENCE: ReadonlyArray<{
  rank: string;
  status: ResearchDossierStatus;
}> = [
  { rank: '01', status: 'Published' },
  { rank: '02', status: 'Updated' },
  { rank: '03', status: 'Scientific Review' },
  { rank: '04', status: 'Draft Assessment' },
  { rank: '05', status: 'Under Investigation' },
  { rank: '06', status: 'Data Acquisition' },
  { rank: '07', status: 'Proposed' },
  { rank: '08', status: 'Archived' },
];

const PUBLIC_MATURITY_ORDER: Record<ResearchDossierStatus, number> = {
  Published: 1,
  Updated: 2,
  'Scientific Review': 3,
  'Draft Assessment': 4,
  'Under Investigation': 5,
  'Data Acquisition': 6,
  Proposed: 7,
  Archived: 8,
};

function parseApplicablePublicationTimestamp(dateStr: string | undefined): number {
  if (!dateStr || dateStr === 'Proposed') return 0;
  const parsed = Date.parse(dateStr);
  if (!Number.isNaN(parsed)) return parsed;
  const monthYear = dateStr.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const fallback = Date.parse(`${monthYear[1]} 1, ${monthYear[2]}`);
    if (!Number.isNaN(fallback)) return fallback;
  }
  return 0;
}

export function sortDossiersByPublicMaturity(list: ResearchSeriesDossier[]): ResearchSeriesDossier[] {
  return [...list].sort((a, b) => {
    const rankDiff = (PUBLIC_MATURITY_ORDER[a.status] ?? 99) - (PUBLIC_MATURITY_ORDER[b.status] ?? 99);
    if (rankDiff !== 0) return rankDiff;

    const dateDiff =
      parseApplicablePublicationTimestamp(b.date) - parseApplicablePublicationTimestamp(a.date);
    if (dateDiff !== 0) return dateDiff;

    return a.sequenceNumber - b.sequenceNumber;
  });
}

interface ResearchPortfolioExplorerClientProps {
  initialDossiers: ResearchSeriesDossier[];
}

export function ResearchPortfolioExplorerClient({
  initialDossiers,
}: ResearchPortfolioExplorerClientProps) {
  const [dossiers] = useState<ResearchSeriesDossier[]>(initialDossiers);
  const [divisionFilter, setDivisionFilter] = useState<ResearchDivisionId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ResearchDossierStatus | 'all'>('all');
  const [cohortFilter, setCohortFilter] = useState<CohortFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGovernanceView, setActiveGovernanceView] = useState<
    'priority' | 'matrix' | 'duplication'
  >('priority');

  const stats = useMemo(
    () => computeResearchSeriesPortfolioStats(dossiers),
    [dossiers]
  );

  const filteredDossiers = useMemo(() => {
    const matching = dossiers.filter((d) => {
      if (divisionFilter !== 'all' && d.divisionId !== divisionFilter) return false;
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (cohortFilter === 'published' && d.status !== 'Published' && d.status !== 'Updated') {
        return false;
      }
      if (cohortFilter === 'priority_15' && typeof d.priorityRank !== 'number') {
        return false;
      }
      if (cohortFilter === 'original_40' && d.sequenceNumber > 40) return false;
      if (cohortFilter === 'expanded_60' && d.sequenceNumber < 41) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${d.code} ${d.sectorTag} ${d.divisionTitle} ${d.title} ${d.abstract} ${d.author} ${d.distinctionNote || ''}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
    return sortDossiersByPublicMaturity(matching);
  }, [dossiers, divisionFilter, statusFilter, cohortFilter, searchQuery]);

  // Group by Publication Maturity Priority by default (Published first -> Proposed -> Archived)
  const groupedByMaturity = useMemo(() => {
    return PUBLIC_STATUS_FILTER_SEQUENCE.map((tier) => ({
      tier,
      items: filteredDossiers.filter((d) => d.status === tier.status),
    })).filter((g) => g.items.length > 0);
  }, [filteredDossiers]);

  const featuredDisambiguationSamples = useMemo(() => {
    return [1, 4, 5, 41, 47, 50, 61, 69, 71, 83, 86, 89, 99, 100]
      .map((seq) => dossiers.find((d) => d.sequenceNumber === seq))
      .filter((d): d is ResearchSeriesDossier => Boolean(d))
      .map((d) => ({
        dossier: d,
        scope: buildDuplicationScopeEntry(d, dossiers),
      }));
  }, [dossiers]);

  const kpis: ModuleKpi[] = [
    {
      label: `Total Dossiers (${stats.publishedCount} Published)`,
      value: stats.totalDossiers,
      icon: 'FileText',
      color: 'text-emerald-400',
    },
    {
      label: 'Research Sectors (I–XXIII)',
      value: stats.sectorsCount,
      icon: 'Layers',
      color: 'text-cyan-400',
    },
    {
      label: 'Proposed Investigations',
      value: stats.proposedOrInProgressCount,
      icon: 'Clock',
      color: 'text-amber-400',
    },
    {
      label: 'Priority Phase-1 Studies',
      value: stats.priority15Count,
      icon: 'Activity',
      color: 'text-teal-300',
    },
    {
      label: 'Connected KEW Domains',
      value: KEW_MODULE_TO_REPORT_COVERAGE_MATRIX.length,
      icon: 'Database',
      color: 'text-emerald-300',
    },
    {
      label: 'Publication Chapters',
      value: `${STANDARD_DOSSIER_CHAPTERS.length} Std`,
      icon: 'BookOpen',
      color: 'text-white',
    },
  ];

  const getStatusBadgeStyle = (status: ResearchDossierStatus) => {
    return (
      RESEARCH_PUBLICATION_STATUS_DEFINITIONS.find((s) => s.status === status)
        ?.badgeClass || 'bg-slate-800 text-slate-200 border border-white/15'
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label={`Western Himalayan Scientific Research Observatory • 23 Sectors • ${stats.totalDossiers} Dossiers`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: `${stats.totalDossiers} Scientific Research Dossiers` },
        ]}
        icon={<FileText className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Western Himalayan Scientific Research Series ({stats.totalDossiers} Dossiers)
            </span>
          </div>
        }
        subtitle={`${stats.totalDossiers} individually researched environmental dossiers across 23 scientific sectors — uniting Sectoral Environmental Impact Assessments (Sectors I–XII, Reports 01–40) with Cryosphere, Regional Lake Limnology (Flagship KEW-SR-2026-101), Biodiversity, Forestry, Natural Hazards, Climate, Environmental Health, Earth Systems, Transboundary Assessments, and Governance (Sectors XIII–XXIII, Reports 41–101).`}
        images={[
          '/images/publications/dal-lake-lacustrine-houseboats.jpg',
          '/images/publications/kolahoi-glacier-cryosphere.jpg',
          '/images/biodiversity/biodiversity-hangul-stag.jpg',
          '/images/publications/wular-ramsar-wetland-floodplain.jpg',
        ]}
      />

      <ModuleKpiStrip kpis={kpis} iconColor="text-emerald-400" />
      <SectoralEiaNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* 1. SCIENTIFIC GOVERNANCE & NON-FABRICATION STANDARD */}
        <Card className="border-emerald-500/30 bg-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Mandatory Scientific Governance, Server-Rendered Indexability &amp; Non-Duplication Standard
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                Every dossier from <strong className="text-white font-mono">KEW-SR-2026-01</strong> through{' '}
                <strong className="text-white font-mono">KEW-SR-2026-101</strong> is backed by an individualized discipline-specific methodology, verified study-area coordinates, bespoke indicators, and external literature with live-checked DOIs. Dossiers{' '}
                <strong className="text-emerald-300 font-mono">01–04</strong> are revalidated{' '}
                <strong className="text-emerald-300">Published Secondary-Data Scientific Assessments</strong>; flagship monograph{' '}
                <strong className="text-cyan-300 font-mono">KEW-SR-2026-101</strong> (521 Kashmir lakes + Appendices A–O) is in{' '}
                <strong className="text-cyan-300">Scientific Review</strong> awaiting human peer sign-off; and entries{' '}
                <strong className="text-amber-300 font-mono">05–100</strong> are individually researched{' '}
                <strong className="text-amber-300">Proposed</strong> scoping dossiers.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Link href="/sectoral-eia/reports/kew-sr-2026-101">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<BookOpen className="w-3.5 h-3.5" />}
                >
                  Flagship: KEW-SR-2026-101 (Kashmir&apos;s Lakes)
                </Button>
              </Link>
              <Link href="/sectoral-eia/reports/kew-sr-2026-13">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                >
                  Benchmark: KEW-SR-2026-13 (Pashmina)
                </Button>
              </Link>
              <a href="#governance-matrices">
                <Button variant="outline" size="sm">
                  Priority-15 &amp; Coverage Matrix
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* 2. COMPLETE 23-SECTOR PORTFOLIO DISTRIBUTION */}
        <section aria-labelledby="portfolio-distribution-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 block mb-1">
                Dynamic Database Portfolio · {stats.originalSectoral40Count} Original Sectoral +{' '}
                {stats.expandedNaturalAndGovernance60Count} Expanded Natural, Hazard &amp; Governance Studies
              </span>
              <h2 id="portfolio-distribution-heading" className="text-xl sm:text-2xl font-bold text-white">
                23-Sector Scientific Research Portfolio Breakdown ({stats.totalDossiers} Dossiers)
              </h2>
            </div>
            {(divisionFilter !== 'all' || cohortFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setDivisionFilter('all');
                  setCohortFilter('all');
                }}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
              >
                Reset Sector &amp; Cohort Filters (Show All {stats.totalDossiers})
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {stats.divisionBreakdown.map((div) => {
              const isSelected = divisionFilter === div.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => setDivisionFilter(isSelected ? 'all' : div.id)}
                  className={`kew-card p-3.5 rounded-lg text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-emerald-500 bg-slate-900 shadow-md'
                      : 'border-white/10 bg-slate-900/85 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>SECTOR {div.roman}</span>
                    {div.publishedInDivision > 0 ? (
                      <span className="text-emerald-400 font-bold">
                        {div.publishedInDivision} Pub
                      </span>
                    ) : (
                      <span className="text-amber-400/80">Proposed</span>
                    )}
                  </div>
                  <div className="text-xl font-black text-white tabular-nums">{div.count}</div>
                  <div className="text-xs font-medium text-slate-300 mt-0.5 leading-snug break-words">
                    {div.shortLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. COHORT, SEARCH & 8-TIER STATUS FILTER BAR */}
        <Card className="space-y-4">
          {/* Strategic Cohort Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-white/10 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Portfolio Cohort:
            </span>
            {(
              [
                { id: 'all', label: `All Dossiers (${stats.totalDossiers})` },
                { id: 'published', label: `Published Monographs (${stats.publishedCount})` },
                { id: 'priority_15', label: `Top-15 Priority Roadmap (${stats.priority15Count})` },
                { id: 'original_40', label: `Sectors I–XII Core (${stats.originalSectoral40Count})` },
                { id: 'expanded_60', label: `Sectors XIII–XXIII Expansion (${stats.expandedNaturalAndGovernance60Count})` },
              ] as const
            ).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCohortFilter(c.id)}
                className={`px-3 py-1.5 rounded-sm border font-semibold transition-colors ${
                  cohortFilter === c.id
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-950 text-slate-300 border-white/10 hover:border-emerald-500/40'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search KEW-SR-2026-01..100, glacier, alpine lake, Hangul, GLOF, Western Disturbances, Ladakh, governance..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-white/15 rounded-md text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <select
              aria-label="Filter by research sector"
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value as ResearchDivisionId | 'all')}
              className="w-full px-3 py-2 bg-slate-950 border border-white/15 rounded-md text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All {stats.sectorsCount} Research Sectors ({stats.totalDossiers})</option>
              {RESEARCH_SERIES_DIVISIONS.map((div) => (
                <option key={div.id} value={div.id}>
                  Sector {div.roman}: {div.shortLabel}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                Status:
              </span>
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-sm border font-medium ${
                  statusFilter === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                    : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                {`All (${dossiers.length})`}
              </button>
              {PUBLIC_STATUS_FILTER_SEQUENCE.map((st) => {
                const cnt = dossiers.filter((d) => d.status === st.status).length;
                return (
                  <button
                    key={st.status}
                    type="button"
                    onClick={() => setStatusFilter(st.status)}
                    className={`px-2.5 py-1 rounded-sm border font-medium ${
                      statusFilter === st.status
                        ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                        : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {`${st.status} (${cnt})`}
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-slate-400 text-[11px]">
              Showing {filteredDossiers.length} of {dossiers.length} Dossiers
            </span>
          </div>
        </Card>

        {/* 4. PUBLICATION-MATURITY-SORTED 100 DOSSIERS CATALOG (PUBLISHED FIRST -> PROPOSED -> ARCHIVED) */}
        <div className="space-y-12">
          {groupedByMaturity.map(({ tier, items }) => (
            <section key={tier.status} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <Badge
                    variant={
                      tier.status === 'Published' || tier.status === 'Updated' ? 'success' : 'info'
                    }
                    size="sm"
                    className="font-mono font-bold"
                  >
                    {`${tier.rank} · ${tier.status.toUpperCase()}`}
                  </Badge>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {tier.status === 'Published'
                      ? 'Published Scientific Assessments'
                      : tier.status === 'Proposed'
                      ? 'Proposed Research Dossiers'
                      : `${tier.status} Dossiers`}
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>
                    {items.length} {items.length === 1 ? 'Dossier' : 'Dossiers'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {items.map((report) => {
                  const isPublished =
                    report.status === 'Published' || report.status === 'Updated';
                  const dossierHref = `/sectoral-eia/reports/${report.code.toLowerCase()}`;
                  const pdfPagesCount = report.derivedPdfPages || report.pages;

                  return (
                    <Card
                      key={report.id}
                      padding="lg"
                      className="space-y-4 border-white/10 hover:border-emerald-500/40 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <KewOfficialPublicationLogo size="xs" />
                          <span className="font-mono text-emerald-400 font-bold px-2.5 py-0.5 rounded-sm bg-slate-950 border border-emerald-500/35 text-xs">
                            {report.code}
                          </span>
                          <span
                            className={`kew-status-badge px-2.5 py-0.5 rounded-sm text-[11px] font-semibold ${getStatusBadgeStyle(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </span>
                          <span className="px-2 py-0.5 rounded-sm bg-slate-950 border border-white/15 text-[11px] font-mono text-slate-300">
                            Sector {report.divisionRoman}
                          </span>
                          {report.evidencePublicationClass && (
                            <span className="px-2 py-0.5 rounded-sm bg-slate-950 border border-amber-500/30 text-[11px] font-mono text-amber-200">
                              {report.evidencePublicationClass}
                            </span>
                          )}
                          <code className="px-2 py-0.5 rounded-sm bg-slate-950 border border-white/10 text-[11px] text-teal-300 font-mono">
                            {report.sectorTag}
                          </code>
                          {typeof report.verifiedExternalCitationsCount === 'number' &&
                            report.verifiedExternalCitationsCount > 0 && (
                              <span className="px-2 py-0.5 rounded-sm bg-emerald-950/50 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                                {report.verifiedExternalCitationsCount} External Refs
                              </span>
                            )}
                          {typeof report.priorityRank === 'number' && (
                            <span className="px-2 py-0.5 rounded-sm bg-cyan-950/70 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-300">
                              Priority #{report.priorityRank}
                            </span>
                          )}
                          {report.sequenceNumber === 13 && (
                            <span
                              className="px-2 py-0.5 rounded-sm border text-[11px] font-mono font-bold"
                              style={{
                                backgroundColor: '#161923',
                                borderColor: '#c6a87c',
                                color: '#c6a87c',
                              }}
                            >
                              Editorial Visual Benchmark
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {report.date}
                          </span>
                          <span>·</span>
                          <span className="tabular-nums">
                            {isPublished && pdfPagesCount
                              ? `${pdfPagesCount} PDF Pages`
                              : `${report.targetPages || 60}-page target`}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                          {report.subdisciplineBanner}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                          <Link
                            href={dossierHref}
                            className="hover:text-emerald-300 transition-colors"
                          >
                            {report.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {report.abstract}
                        </p>

                        {report.distinctionNote && (
                          <p className="text-xs text-cyan-300/90 bg-slate-950/80 border border-cyan-500/20 rounded-md px-3 py-2 leading-relaxed">
                            <strong className="font-mono uppercase text-[10px] tracking-wider text-cyan-400 mr-1.5">
                              Scope Distinction:
                            </strong>
                            {report.distinctionNote}
                          </p>
                        )}

                        <div className="text-xs text-slate-400 pt-1">
                          <span className="font-semibold text-slate-200">
                            {report.isProposedWorkingGroup
                              ? 'Proposed Working Group: '
                              : 'Lead Investigator / Working Group: '}
                          </span>
                          <span>{report.author}</span>
                        </div>
                      </div>

                      {/* ALL 9 OPERATIONAL SCIENTIFIC FUNCTIONS */}
                      <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 text-[11px]">
                        <Link
                          href={dossierHref}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/15 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>View Report</span>
                        </Link>

                        {report.assetReadiness.reportPdfAvailable ? (
                          <a
                            href={`/api/sectoral-eia/reports/${report.code.toLowerCase()}/pdf`}
                            download
                            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-semibold bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 transition-colors text-center"
                          >
                            <Download className="w-3.5 h-3.5 shrink-0" />
                            <span>Download PDF</span>
                          </a>
                        ) : (
                          <Link
                            href={`${dossierHref}?mode=pdf`}
                            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-semibold bg-slate-950 text-amber-300 border border-amber-500/30 hover:border-amber-400/60 transition-colors text-center"
                          >
                            <Lock className="w-3.5 h-3.5 shrink-0" />
                            <span>Scoping PDF</span>
                          </Link>
                        )}

                        <Link
                          href={`${dossierHref}?tab=telemetry`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <Radio className="w-3.5 h-3.5 shrink-0" />
                          <span>Telemetry Data</span>
                        </Link>

                        <Link
                          href={`${dossierHref}?tab=gis`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-colors text-center"
                        >
                          <MapIcon className="w-3.5 h-3.5 shrink-0" />
                          <span>GIS Map</span>
                        </Link>

                        {report.assetReadiness.datasetAvailable ? (
                          <a
                            href={`/api/sectoral-eia/reports/${report.code.toLowerCase()}/dataset?format=csv`}
                            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                          >
                            <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Export Dataset</span>
                          </a>
                        ) : (
                          <span className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-md font-medium bg-slate-950/50 text-slate-500 border border-white/5 cursor-not-allowed text-center">
                            <Lock className="w-3 h-3 shrink-0" />
                            <span>Dataset (Pending)</span>
                          </span>
                        )}

                        <Link
                          href={`${dossierHref}?tab=historical`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <History className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Historical Change</span>
                        </Link>

                        <Link
                          href={`${dossierHref}?tab=references`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>References</span>
                        </Link>

                        <Link
                          href={`${dossierHref}?tab=indicators`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Indicators</span>
                        </Link>

                        <Link
                          href={`${dossierHref}?tab=history`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Updates</span>
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* 5. PRIORITY-15 ROADMAP, 56-DOMAIN MODULE COVERAGE MATRIX & DUPLICATION REGISTRY */}
        <section id="governance-matrices" className="space-y-5 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                Observatory Architecture · Priority Sequencing, Module Connectivity &amp; Scope Clearance
              </span>
              <h2 className="text-2xl font-bold text-white">
                Scientific Governance, Module Coverage &amp; Non-Duplication Registry
              </h2>
            </div>

            <div className="inline-flex rounded-md border border-slate-800 bg-slate-900 p-1 gap-1">
              {(
                [
                  { id: 'priority', label: 'Top-15 Priority Roadmap' },
                  { id: 'matrix', label: `Module Coverage Matrix (${KEW_MODULE_TO_REPORT_COVERAGE_MATRIX.length})` },
                  { id: 'duplication', label: 'Scope & Duplication Registry' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveGovernanceView(tab.id)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
                    activeGovernanceView === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeGovernanceView === 'priority' && (
            <Card className="p-0 overflow-hidden border-white/10">
              <div className="responsive-table-container">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-white/10 text-slate-300">
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Dossier Code</th>
                      <th className="px-4 py-3">Research Subject</th>
                      <th className="px-4 py-3">Strategic Scientific Rationale</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {PRIORITY_15_RESEARCH_QUEUE.map((item) => (
                      <tr key={item.code} className="hover:bg-slate-900/60 text-slate-200">
                        <td className="px-4 py-2.5 font-mono font-bold text-cyan-300">
                          #{item.priority}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-bold text-emerald-400">
                          {item.code}
                        </td>
                        <td className="px-4 py-2.5 font-semibold text-white">{item.subject}</td>
                        <td className="px-4 py-2.5 text-slate-300 max-w-xl">
                          {item.strategicRationale}
                        </td>
                        <td className="px-4 py-2.5">
                          <Link
                            href={`/sectoral-eia/reports/${item.code.toLowerCase()}`}
                            className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
                          >
                            Open Charter <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeGovernanceView === 'matrix' && (
            <Card className="p-0 overflow-hidden border-white/10">
              <div className="responsive-table-container">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-white/10 text-slate-300">
                      <th className="px-4 py-3">KEW Intelligence Domain</th>
                      <th className="px-4 py-3">Sectors I–XII Dossiers</th>
                      <th className="px-4 py-3">Sectors XIII–XXIII Expansion Dossiers</th>
                      <th className="px-4 py-3">Operational Infrastructure Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {KEW_MODULE_TO_REPORT_COVERAGE_MATRIX.map((row) => (
                      <tr key={row.moduleId} className="hover:bg-slate-900/60 text-slate-200">
                        <td className="px-4 py-2.5 font-semibold">
                          <Link
                            href={row.route}
                            className="text-white hover:text-emerald-300 inline-flex items-center gap-1"
                          >
                            {row.domainName} <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                          </Link>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-slate-400">
                          {row.existingPortfolioDossiers.length > 0
                            ? row.existingPortfolioDossiers
                                .map((n) => `KEW-SR-2026-${String(n).padStart(2, '0')}`)
                                .join(', ')
                            : '—'}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-emerald-300">
                          {row.expandedPortfolioDossiers
                            .map((n) => `KEW-SR-2026-${String(n).padStart(2, '0')}`)
                            .join(', ')}
                        </td>
                        <td className="px-4 py-2.5 text-slate-300">{row.operationalDataStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeGovernanceView === 'duplication' && (
            <Card className="p-0 overflow-hidden border-white/10">
              <div className="responsive-table-container">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-white/10 text-slate-300">
                      <th className="px-4 py-3">Dossier</th>
                      <th className="px-4 py-3">Primary Research Question</th>
                      <th className="px-4 py-3">Distinct Scientific Contribution (Non-Duplication)</th>
                      <th className="px-4 py-3">Related Dossiers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {featuredDisambiguationSamples.map(({ dossier, scope }) => (
                      <tr key={dossier.code} className="hover:bg-slate-900/60 text-slate-200">
                        <td className="px-4 py-2.5 font-mono font-bold text-emerald-400 whitespace-nowrap">
                          <Link href={`/sectoral-eia/reports/${dossier.code.toLowerCase()}`}>
                            {dossier.code}
                          </Link>
                        </td>
                        <td className="px-4 py-2.5 text-white max-w-md">
                          {scope.primaryResearchQuestion}
                        </td>
                        <td className="px-4 py-2.5 text-slate-300 max-w-md">
                          {scope.distinctScientificContribution}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-cyan-300">
                          {scope.relatedDossierCodes.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </section>

        {/* 6. 12 INTERCONNECTED KEW SCIENTIFIC INFRASTRUCTURE PILLARS */}
        <section id="standard-chapters" className="space-y-5 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="space-y-3">
              <h3 className="text-base font-bold text-white">
                20-Chapter Institutional Scientific Monograph Standard
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {STANDARD_DOSSIER_CHAPTERS.map((ch) => (
                  <div
                    key={ch.chapter}
                    className="rounded-sm border border-white/10 bg-slate-950 px-2.5 py-1.5 flex items-center gap-2"
                  >
                    <span className="font-mono font-bold text-emerald-400">{ch.chapter}</span>
                    <span className="text-slate-200 capitalize">{ch.title}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div id="data-sources">
              <Card className="space-y-3">
                <h3 className="text-base font-bold text-white">
                  16 Standardized Earth-Observation, Reanalysis &amp; Field Data Streams
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {RECOMMENDED_SERIES_DATA_SOURCES.map((ds) => (
                    <div
                      key={ds.source}
                      className="rounded-sm border border-white/10 bg-slate-950 px-2.5 py-1.5"
                    >
                      <div className="font-semibold text-emerald-300">{ds.source}</div>
                      <div className="text-[11px] text-slate-400">{ds.application}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
