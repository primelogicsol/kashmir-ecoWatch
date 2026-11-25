'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Download,
  ExternalLink,
  FileText,
  History,
  Layers,
  Lock,
  Map,
  Radio,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { ModuleKpiStrip, ModuleKpi } from '@/components/common/ModuleKpiStrip';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import {
  computeResearchSeriesPortfolioStats,
  RECOMMENDED_SERIES_DATA_SOURCES,
  RESEARCH_PUBLICATION_STATUS_DEFINITIONS,
  RESEARCH_SERIES_DIVISIONS,
  SCIENTIFIC_INFRASTRUCTURE_PILLARS,
  SECTORAL_RESEARCH_SERIES_2026,
  STANDARD_DOSSIER_CHAPTERS,
} from '@/data/sectoral-research-series-2026';
import {
  ResearchDivisionId,
  ResearchDossierStatus,
  ResearchSeriesDossier,
} from '@/types/sectoral-eia';

export default function ScientificReportsPage() {
  const [dossiers, setDossiers] = useState<ResearchSeriesDossier[]>(
    SECTORAL_RESEARCH_SERIES_2026
  );
  const [divisionFilter, setDivisionFilter] = useState<ResearchDivisionId | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ResearchDossierStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/sectoral-eia/reports')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && Array.isArray(d.dossiers)) {
          setDossiers(d.dossiers);
        }
      })
      .catch(() => {});
  }, []);

  const stats = useMemo(
    () => computeResearchSeriesPortfolioStats(dossiers),
    [dossiers]
  );

  const filteredDossiers = useMemo(() => {
    return dossiers.filter((d) => {
      if (divisionFilter !== 'all' && d.divisionId !== divisionFilter) return false;
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${d.code} ${d.sectorTag} ${d.divisionTitle} ${d.title} ${d.abstract} ${d.author}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [dossiers, divisionFilter, statusFilter, searchQuery]);

  const groupedByDivision = useMemo(() => {
    return RESEARCH_SERIES_DIVISIONS.map((div) => ({
      division: div,
      items: filteredDossiers.filter((d) => d.divisionId === div.id),
    })).filter((g) => g.items.length > 0);
  }, [filteredDossiers]);

  const kpis: ModuleKpi[] = [
    {
      label: `Research Dossiers (${stats.publishedCount} Published)`,
      value: stats.totalDossiers,
      icon: 'FileText',
      color: 'text-emerald-400',
    },
    {
      label: 'Research Sectors (I–XII)',
      value: stats.sectorsCount,
      icon: 'Layers',
      color: 'text-cyan-400',
    },
    {
      label: 'New Proposed Studies',
      value: stats.proposedOrInProgressCount,
      icon: 'Clock',
      color: 'text-amber-400',
    },
    {
      label: 'Publication Chapters',
      value: `${STANDARD_DOSSIER_CHAPTERS.length} Std`,
      icon: 'BookOpen',
      color: 'text-white',
    },
    {
      label: 'Connected KEW Pillars',
      value: SCIENTIFIC_INFRASTRUCTURE_PILLARS.length,
      icon: 'Activity',
      color: 'text-teal-300',
    },
    {
      label: 'Data Source Streams',
      value: RECOMMENDED_SERIES_DATA_SOURCES.length,
      icon: 'Database',
      color: 'text-emerald-300',
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
        label="Sectoral EIA Engine • Process 09 • 2026 Research Series"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Scientific Research Series 2026' },
        ]}
        icon={<FileText className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Sectoral Environmental Research Series 2026
            </span>
          </div>
        }
        subtitle="40 interconnected scientific research dossiers and sectoral environmental impact assessments examining the cumulative ecological consequences of economic activity, infrastructure development, natural resource exploitation, and changing land use across Kashmir and the Western Himalaya."
        images={[
          '/images/sectoral-eia/eia-tourism-carrying-capacity.jpg',
          '/images/sectoral-eia/eia-horticulture-agrochemical.jpg',
          '/images/sectoral-eia/eia-handicrafts-dye-effluent.jpg',
          '/images/sectoral-eia/eia-agriculture-riverbed-soil.jpg',
        ]}
      />

      <ModuleKpiStrip kpis={kpis} iconColor="text-emerald-400" />
      <SectoralEiaNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* 1. SCIENTIFIC GOVERNANCE REQUIREMENT BANNER */}
        <Card className="border-emerald-500/30 bg-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Mandatory Scientific Governance &amp; Publication Integrity Standard
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                Dossiers <strong className="text-white font-mono">KEW-SR-2026-01</strong> through{' '}
                <strong className="text-white font-mono">KEW-SR-2026-04</strong> represent validated Sectoral EIA publications with confirmed dates, page counts, and working groups. Entries{' '}
                <strong className="text-amber-300 font-mono">KEW-SR-2026-05</strong> through{' '}
                <strong className="text-amber-300 font-mono">KEW-SR-2026-40</strong> are{' '}
                <strong className="text-white">proposed research dossiers, not completed investigations</strong> — their final publication dates, confirmed page counts, empirical findings, and downloadable datasets only unlock once the corresponding research is completed, ground-validated, and peer-reviewed.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <a href="#standard-chapters">
                <Button variant="outline" size="sm">
                  20-Chapter Standard
                </Button>
              </a>
              <a href="#data-sources">
                <Button variant="secondary" size="sm" icon={<Database className="w-3.5 h-3.5 text-emerald-400" />}>
                  16 Data Sources
                </Button>
              </a>
            </div>
          </div>
        </Card>

        {/* 2. RESEARCH PORTFOLIO DISTRIBUTION ACROSS 12 SECTORS */}
        <section aria-labelledby="portfolio-distribution-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400 block mb-1">
                Portfolio Distribution · {stats.totalDossiers} Studies Across {stats.sectorsCount} Sectors
              </span>
              <h2 id="portfolio-distribution-heading" className="text-xl sm:text-2xl font-bold text-white">
                12-Sector Research Portfolio Breakdown
              </h2>
            </div>
            {divisionFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setDivisionFilter('all')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
              >
                Reset Sector Filter (Show All {stats.totalDossiers})
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
                  onClick={() =>
                    setDivisionFilter(isSelected ? 'all' : div.id)
                  }
                  className={`kew-card p-3.5 rounded-lg text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-emerald-500 bg-slate-900 shadow-md'
                      : 'border-white/10 bg-slate-900/85 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>SECTOR {div.roman}</span>
                    {div.publishedInDivision > 0 && (
                      <span className="text-emerald-400 font-bold">
                        {div.publishedInDivision} Pub
                      </span>
                    )}
                  </div>
                  <div className="text-xl font-black text-white tabular-nums">
                    {div.count}
                  </div>
                  <div className="text-xs font-medium text-slate-300 mt-0.5 leading-snug break-words">
                    {div.shortLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. SEARCH & 7-TIER STATUS FILTER BAR */}
        <Card className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by code (KEW-SR-2026-01..40), sector tag, ecosystem, title, or working group..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <select
              aria-label="Filter by research sector"
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value as ResearchDivisionId | 'all')}
              className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All 12 Research Sectors ({stats.totalDossiers})</option>
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
                Publication Status:
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
                All ({dossiers.length})
              </button>
              {RESEARCH_PUBLICATION_STATUS_DEFINITIONS.map((st) => {
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
                    {st.status} ({cnt})
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-slate-400 text-[11px]">
              Showing {filteredDossiers.length} of {dossiers.length} Dossiers
            </span>
          </div>
        </Card>

        {/* 4. SECTOR-GROUPED 40 DOSSIERS CATALOG WITH ALL 8 FUNCTIONAL ACTIONS */}
        <div className="space-y-12">
          {groupedByDivision.map(({ division, items }) => (
            <section key={division.id} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <Badge variant="info" size="sm" className="font-mono font-bold">
                    SECTOR {division.roman}
                  </Badge>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {division.fullTitle}
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {items.length} {items.length === 1 ? 'Dossier' : 'Dossiers'}
                </span>
              </div>

              <div className="space-y-4">
                {items.map((report) => {
                  const isPublished =
                    report.status === 'Published' || report.status === 'Updated';
                  const dossierHref = `/sectoral-eia/reports/${report.code.toLowerCase()}`;

                  return (
                    <Card
                      key={report.id}
                      padding="lg"
                      className="space-y-4 border-white/10 hover:border-emerald-500/40 transition-all"
                    >
                      {/* Top Metadata Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-emerald-400 font-bold px-2.5 py-0.5 rounded-sm bg-slate-950 border border-emerald-500/35 text-xs">
                            {report.code}
                          </span>
                          <span
                            className={`kew-status-badge px-2.5 py-0.5 rounded-sm text-[11px] font-semibold ${getStatusBadgeStyle(
                              report.status
                            )}`}
                          >
                            {report.status === 'Proposed'
                              ? 'Proposed research'
                              : report.status}
                          </span>
                          <code className="px-2 py-0.5 rounded-sm bg-slate-950 border border-white/10 text-[11px] text-teal-300 font-mono">
                            {report.sectorTag}
                          </code>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {report.date}
                          </span>
                          <span>·</span>
                          <span className="tabular-nums">
                            {isPublished && report.pages
                              ? `${report.pages} Pages`
                              : `${report.targetPages}-page target`}
                          </span>
                        </div>
                      </div>

                      {/* Subdiscipline Eyebrow + Title + Abstract */}
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

                        <div className="text-xs text-slate-400 pt-1">
                          <span className="font-semibold text-slate-200">
                            {report.isProposedWorkingGroup
                              ? 'Proposed Working Group: '
                              : 'Lead Investigator / Working Group: '}
                          </span>
                          <span>{report.author}</span>
                        </div>
                      </div>

                      {/* ALL 9 OPERATIONAL SCIENTIFIC FUNCTIONS (ZERO PLACEHOLDERS) */}
                      <div className="pt-3.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 text-[11px]">
                        {/* 1. View Complete Online Report */}
                        <Link
                          href={dossierHref}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/15 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>View Report</span>
                        </Link>

                        {/* 2. Download Actual Binary Scientific PDF (or Scoping Charter for Proposed) */}
                        {report.assetReadiness.reportPdfAvailable ? (
                          <a
                            href={`/api/sectoral-eia/reports/${report.code.toLowerCase()}/pdf`}
                            download
                            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-semibold bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 transition-colors text-center"
                            title={`Download Validated Institutional PDF (${report.pages} Pages)`}
                          >
                            <Download className="w-3.5 h-3.5 shrink-0" />
                            <span>Download PDF</span>
                          </a>
                        ) : (
                          <Link
                            href={`${dossierHref}?mode=pdf`}
                            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-semibold bg-slate-950 text-amber-300 border border-amber-500/30 hover:border-amber-400/60 transition-colors text-center"
                            title="Inspect Secondary-Data Scoping Charter (Final PDF unlocks upon scientific validation)"
                          >
                            <Lock className="w-3.5 h-3.5 shrink-0" />
                            <span>Scoping PDF</span>
                          </Link>
                        )}

                        {/* 3. Explore Report-Specific Telemetry */}
                        <Link
                          href={`${dossierHref}?tab=telemetry`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <Radio className="w-3.5 h-3.5 shrink-0" />
                          <span>Telemetry Data</span>
                        </Link>

                        {/* 4. Interactive GIS Map */}
                        <Link
                          href={`${dossierHref}?tab=gis`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-colors text-center"
                        >
                          <Map className="w-3.5 h-3.5 shrink-0" />
                          <span>GIS Map</span>
                        </Link>

                        {/* 5. Download Validated Dataset (CSV / XLSX / JSON) */}
                        {report.assetReadiness.datasetAvailable ? (
                          <a
                            href={`/api/sectoral-eia/reports/${report.code.toLowerCase()}/dataset?format=csv`}
                            className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                            title="Export Validated Report Dataset (.CSV; XLSX/JSON/GeoJSON available inside dossier)"
                          >
                            <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Export Dataset</span>
                          </a>
                        ) : (
                          <span
                            title="Dataset becomes operational once data acquisition, ground validation, and peer review are completed."
                            className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-md font-medium bg-slate-950/50 text-slate-500 border border-white/5 cursor-not-allowed text-center"
                          >
                            <Lock className="w-3 h-3 shrink-0" />
                            <span>Dataset (Pending)</span>
                          </span>
                        )}

                        {/* 6. Historical Baseline Comparison */}
                        <Link
                          href={`${dossierHref}?tab=historical`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <History className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Historical Change</span>
                        </Link>

                        {/* 7. Scientific References */}
                        <Link
                          href={`${dossierHref}?tab=references`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>References</span>
                        </Link>

                        {/* 8. Environmental Indicators */}
                        <Link
                          href={`${dossierHref}?tab=indicators`}
                          className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-md font-medium bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition-colors text-center"
                        >
                          <BarChart3 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Indicators</span>
                        </Link>

                        {/* 9. Research Updates & Revision History */}
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

        {/* 5. ADVANCED SCIENTIFIC INFRASTRUCTURE (12 INTERCONNECTED KEW CAPABILITIES) */}
        <section aria-labelledby="infrastructure-heading" className="space-y-5 pt-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Sectoral Environmental Impact Assessment Engine · 40 Interconnected Dossiers
            </span>
            <h2 id="infrastructure-heading" className="text-2xl font-bold text-white">
              Western Himalayan Cumulative Environmental Intelligence
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Each dossier connects directly with operational KEW intelligence modules rather than existing as an isolated static PDF publication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {SCIENTIFIC_INFRASTRUCTURE_PILLARS.map((pillar) => (
              <Link
                key={pillar.id}
                href={pillar.route}
                className="kew-card p-4 rounded-lg border border-white/10 hover:border-emerald-500/40 transition-all group flex flex-col justify-between gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {pillar.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. STANDARD 20-CHAPTER SCIENTIFIC STRUCTURE FOR ALL 40 DOSSIERS */}
        <section id="standard-chapters" className="space-y-5 scroll-mt-32">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              Institutional Publication Architecture
            </span>
            <h2 className="text-2xl font-bold text-white">
              Standard 20-Chapter Scientific Structure for All 40 Dossiers
            </h2>
          </div>

          <Card padding="none">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:gap-px bg-white/5">
              {STANDARD_DOSSIER_CHAPTERS.map((ch) => (
                <div key={ch.chapter} className="p-3.5 bg-slate-900 flex items-start gap-2.5 text-xs">
                  <span className="font-mono font-bold text-emerald-400 shrink-0">
                    {ch.chapter}
                  </span>
                  <span className="text-slate-200 font-medium">{ch.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* 7. RECOMMENDED DATA SOURCES (16) + MANDATORY GROUND-VALIDATION SAFEGUARD */}
        <section id="data-sources" className="space-y-5 scroll-mt-32">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Multi-Sensor Orbital, Reanalysis &amp; Ground Verification
            </span>
            <h2 className="text-2xl font-bold text-white">
              Recommended Scientific Data Sources
            </h2>
          </div>

          <Card className="border-amber-500/40 bg-slate-900">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">
                  Mandatory Ground-Validation Scientific Safeguard
                </strong>
                Satellite observations must <strong className="text-white">never be presented as direct measurements</strong> of parameters such as heavy metal concentrations, pesticide residues, faecal contamination, or local groundwater levels without appropriate accredited laboratory and in-situ ground validation.
              </div>
            </div>
          </Card>

          <Card padding="none">
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Scientific Data Source</th>
                    <th className="py-3 px-4">Primary Analytical Application Across the 40 Dossiers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RECOMMENDED_SERIES_DATA_SOURCES.map((ds) => (
                    <tr key={ds.source} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                        {ds.source}
                      </td>
                      <td className="py-3 px-4 text-slate-300">{ds.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* 8. 7-TIER RESEARCH PUBLICATION STATUS CLASSIFICATION */}
        <section aria-labelledby="status-classification-heading" className="space-y-4">
          <h2 id="status-classification-heading" className="text-xl font-bold text-white">
            Research Publication Status Classification
          </h2>
          <Card padding="none">
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Institutional Meaning</th>
                    <th className="py-3 px-4">Current Series Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RESEARCH_PUBLICATION_STATUS_DEFINITIONS.map((st) => {
                    const count = dossiers.filter((d) => d.status === st.status).length;
                    return (
                      <tr key={st.status}>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-sm text-[11px] font-semibold ${st.badgeClass}`}
                          >
                            {st.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{st.meaning}</td>
                        <td className="py-3 px-4 font-mono font-bold text-white tabular-nums">
                          {count}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
