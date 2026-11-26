'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { KewIcons as Icons } from '@/components/common/KewIcons';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Database,
  FileSearch,
  FileText,
  FlaskConical,
  Globe2,
  Layers,
  Map,
  MapPin,
  PlusCircle,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { ModuleKpiStrip, ModuleKpi } from '@/components/common/ModuleKpiStrip';
import { Card, UniversalCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import { EnvironmentalEconomicsFiscalPanel } from '@/components/environmental-investigations/EnvironmentalEconomicsFiscalPanel';
import {
  EvidenceClassificationBadge,
  InvestigationStatusBadge,
} from '@/components/environmental-investigations/EiaiBadges';
import {
  CANONICAL_INVESTIGATIONS,
  computeEiaiMetrics,
  DISCIPLINE_CLUSTERS,
  getDomainById,
  getDomainInvestigationCounts,
  INVESTIGATION_DOMAINS,
  INVESTIGATION_THEMATIC_SERIES,
  INVESTIGATION_WORKFLOW_STAGES,
  KEW_ECOSYSTEM_INTEGRATIONS,
  PRIMARY_INSTITUTIONAL_EVIDENCE_SOURCES,
  PUBLICATION_FORMATS,
  STANDARD_REPORT_SECTIONS,
} from '@/data/environmental-investigations';
import { InvestigationRecord, InvestigationSeriesId } from '@/types/environmental-investigations';

export default function EnvironmentalInvestigationsHomePage() {
  const [records, setRecords] = useState<InvestigationRecord[]>(CANONICAL_INVESTIGATIONS);
  const [heroIdx, setHeroIdx] = useState(0);
  const [selectedEvidenceClass, setSelectedEvidenceClass] = useState<string>('ALL');
  const [selectedSeries, setSelectedSeries] = useState<InvestigationSeriesId | 'all'>('all');

  useEffect(() => {
    fetch('/api/environmental-investigations')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && Array.isArray(d.investigations)) {
          setRecords(d.investigations);
        }
      })
      .catch(() => {});
  }, []);

  const metrics = useMemo(() => computeEiaiMetrics(records), [records]);
  const domainMap = useMemo(() => getDomainInvestigationCounts(records), [records]);

  const featuredInvestigations = useMemo(
    () => records.filter((r) => r.featured || r.status === 'published'),
    [records]
  );

  const dalInvestigation = useMemo(
    () => records.find((r) => r.code === 'KEW-INV-0001') || records[0],
    [records]
  );

  const filteredDalMatrix = useMemo(() => {
    if (!dalInvestigation) return [];
    if (selectedEvidenceClass === 'ALL') return dalInvestigation.evidenceMatrix;
    return dalInvestigation.evidenceMatrix.filter(
      (e) => e.classification === selectedEvidenceClass
    );
  }, [dalInvestigation, selectedEvidenceClass]);

  const currentHero = featuredInvestigations[heroIdx] || records[0];

  // 100% Database/Registry-Driven KPIs — zero invented counts
  const kpis: ModuleKpi[] = [
    {
      label: `Investigations (${metrics.publishedCount} Pub · ${metrics.activeCount + metrics.scopingCount + metrics.proposedCount} Pipeline)`,
      value: metrics.totalInvestigations,
      icon: 'FileSearch',
      color: 'text-emerald-400',
    },
    {
      label: `Scientific Disciplines (${metrics.totalDisciplinesDefined} Catalogued)`,
      value: `${metrics.disciplinesActiveCount} Active`,
      icon: 'FlaskConical',
      color: 'text-cyan-400',
    },
    {
      label: `Evidence Records (${metrics.documentedEvidenceCount} Documented)`,
      value: metrics.totalEvidenceRecords,
      icon: 'Database',
      color: 'text-white',
    },
    {
      label: 'Institutions Examined',
      value: metrics.institutionsExaminedCount,
      icon: 'Scale',
      color: 'text-amber-400',
    },
    {
      label: 'Geographic Coverage',
      value: `${metrics.districtsCoveredCount} Districts`,
      icon: 'MapPin',
      color: 'text-teal-300',
    },
    {
      label: 'Recommendations Tracked',
      value: metrics.totalRecommendations,
      icon: 'CheckCircle2',
      color: 'text-emerald-300',
    },
  ];

  const heroShowcaseCard = currentHero ? (
    <div className="kew-card rounded-lg border border-white/15 bg-slate-900/95 p-3.5 shadow-2xl">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="status-dot bg-emerald-400" />
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            KEW-EIAI Canonical Dossier
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-300 bg-slate-950 px-2 py-0.5 border border-white/10 rounded-sm">
          {currentHero.code} · {currentHero.temporalScope}
        </span>
      </div>

      <div className="relative h-44 sm:h-48 w-full rounded-lg overflow-hidden border border-white/10 mb-3">
        <img
          src={currentHero.heroImage}
          alt={currentHero.shortTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
        <div className="absolute bottom-2.5 left-3 right-3 space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <InvestigationStatusBadge status={currentHero.status} label={currentHero.statusLabel} />
            <span className="text-[10px] text-slate-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {currentHero.districts.join(', ')}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white leading-snug">
            {currentHero.shortTitle}
          </h3>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        {currentHero.subtitle}
      </p>

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
        <div className="flex items-center gap-1.5">
          {featuredInvestigations.map((item, idx) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setHeroIdx(idx)}
              className={`px-2 py-1 text-[10px] font-mono rounded-sm border transition-colors ${
                heroIdx === idx
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                  : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {item.code}
            </button>
          ))}
        </div>
        <Link
          href={`/environmental-investigations/reports/${currentHero.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
        >
          <span>Read Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  ) : null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 1. Canonical KEW Module Hero */}
      <Heading
        label="WESTERN HIMALAYAN SCIENTIFIC INTELLIGENCE · KEW-EIAI"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations & Accountability' },
        ]}
        icon={<Scale className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] pb-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Environmental Investigations &amp; Accountability
            </span>
          </div>
        }
        subtitle="Scientific Evidence | Ecological Impacts | Institutional Responsibility — Kashmir EcoWatch's dedicated scientific investigation and evidence-based accountability platform examining environmental interventions, historical projects, landscape degradation, and institutional performance across the Western Himalayas."
        images={[
          '/images/water-module/water-lake.jpg',
          '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
          '/images/earth-human-impact/ehii-karewa-land-transformation.jpg',
          '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
        ]}
        rightContent={heroShowcaseCard}
        actions={
          <>
            <Link href="/environmental-investigations/dashboard">
              <Button size="md" icon={<BarChart3 className="w-4 h-4" />}>
                Investigation Dashboard
              </Button>
            </Link>
            <Link href="/environmental-investigations/reports">
              <Button variant="secondary" size="md" icon={<FileText className="w-4 h-4 text-emerald-400" />}>
                Investigation Reports ({metrics.totalInvestigations})
              </Button>
            </Link>
            <Link href="/environmental-investigations/submit">
              <Button variant="outline" size="md" icon={<PlusCircle className="w-4 h-4" />}>
                Submit Investigation
              </Button>
            </Link>
          </>
        }
      />

      {/* 2. Database-Driven Metrics Strip (Zero Invented Figures) */}
      <ModuleKpiStrip kpis={kpis} iconColor="text-emerald-400" />

      {/* 3. Persistent Module Sub-Navigation */}
      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-16">
        {/* Scientific Epistemology Banner */}
        <Card className="border-emerald-500/30 bg-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Scientific Epistemology &amp; Non-Editorial Standard
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                KEW-EIAI is <strong className="text-white">not a news portal, editorial blog, or unverified complaint board</strong>. All counters above populate strictly from canonical database records. Every assertion is graded (<span className="text-emerald-300 font-medium">Documented</span>, <span className="text-cyan-300 font-medium">Provisionally Supported</span>, <span className="text-amber-300 font-medium">Unverified</span>, or <span className="text-red-300 font-medium">Unsupported</span>), and institutional wrongdoing is never inferred from missing documentation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link href="/environmental-investigations/methodology">
                <Button variant="outline" size="sm">
                  Investigation Methodology
                </Button>
              </Link>
              <Link href="/research-library">
                <Button variant="ghost" size="sm" icon={<BookOpen className="w-3.5 h-3.5 text-emerald-400" />}>
                  Research Library
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* SECTION A: FEATURED CANONICAL INVESTIGATIONS */}
        <section aria-labelledby="featured-investigations-heading" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                Flagship Acceptance-Test Investigations
              </span>
              <h2 id="featured-investigations-heading" className="text-2xl sm:text-3xl font-bold text-white">
                Featured Scientific Investigations
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-3xl">
                Comprehensive {STANDARD_REPORT_SECTIONS.length}-section multidisciplinary investigations synthesising statutory audits, peer-reviewed studies, satellite archives, and institutional responses.
              </p>
            </div>
            <Link href="/environmental-investigations/reports">
              <Button variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                View All {metrics.totalInvestigations} Portfolio Subjects
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredInvestigations.map((inv) => {
              const domain = getDomainById(inv.primaryDomainId);
              const docClaims = inv.evidenceMatrix.filter((e) => e.classification === 'Documented').length;
              return (
                <Card key={inv.code} padding="none" className="overflow-hidden flex flex-col h-full">
                  <div className="relative h-56 w-full overflow-hidden border-b border-white/10">
                    <img
                      src={inv.heroImage}
                      alt={inv.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                      <Badge variant="info" size="sm" className="font-mono font-bold bg-slate-950/85 text-emerald-300 border border-emerald-500/40">
                        {inv.code} · {domain?.shortLabel.toUpperCase()}
                      </Badge>
                      <InvestigationStatusBadge status={inv.status} label={inv.statusLabel} />
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-3 text-xs text-slate-200">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {inv.districts.join(', ')} ({inv.elevationRangeM})
                      </span>
                      <span className="font-mono text-emerald-300">Scope: {inv.temporalScope}</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-1 gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white leading-snug mb-1.5">
                        {inv.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {inv.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-lg bg-slate-950/70 border border-white/10 text-center">
                      <div>
                        <div className="text-sm font-bold text-white tabular-nums">
                          {inv.sections.filter((s) => s.applicable).length}/24
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase">Sections</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-cyan-400 tabular-nums">
                          {inv.disciplineIds.length}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase">Disciplines</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-emerald-400 tabular-nums">
                          {docClaims}/{inv.evidenceMatrix.length}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase">Doc. Claims</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-amber-400 tabular-nums">
                          {inv.references.length}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase">Citations</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Principal Documented Findings:
                      </span>
                      {inv.executiveKeyFindings.slice(0, 2).map((f, i) => (
                        <p key={i} className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                          <span className="text-emerald-400 font-bold mt-0.5">•</span>
                          <span>{f}</span>
                        </p>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Link href={`/environmental-investigations/reports/${inv.slug}?format=executive-briefing`}>
                          <Badge variant="outline" size="sm" className="hover:border-emerald-400 hover:text-emerald-300">
                            Executive Brief
                          </Badge>
                        </Link>
                        <Link href={`/environmental-investigations/reports/${inv.slug}?format=legal-evidence-brief`}>
                          <Badge variant="outline" size="sm" className="hover:border-emerald-400 hover:text-emerald-300">
                            PIL Legal Brief
                          </Badge>
                        </Link>
                        <Link href={`/environmental-investigations/reports/${inv.slug}?format=open-dataset`}>
                          <Badge variant="outline" size="sm" className="hover:border-emerald-400 hover:text-emerald-300">
                            Open Dataset
                          </Badge>
                        </Link>
                      </div>

                      <Link
                        href={`/environmental-investigations/reports/${inv.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                      >
                        <span>Open Full 24-Section Report</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* SECTION A2: SHARED ENVIRONMENTAL ECONOMICS & FISCAL EVIDENCE LAYER */}
        <EnvironmentalEconomicsFiscalPanel mode="compact" />

        {/* SECTION B: WESTERN HIMALAYAN INVESTIGATION PORTFOLIO */}
        <section aria-labelledby="portfolio-heading" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                KEW-INV-0001 Through {records[records.length - 1]?.code || 'KEW-INV-0009'}
              </span>
              <h2 id="portfolio-heading" className="text-2xl sm:text-3xl font-bold text-white">
                Western Himalayan Investigation Portfolio
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-3xl">
                Active and proposed investigation subjects are transparently distinguished from completed peer-verified reports — scoping charters define falsifiable scientific questions, not predetermined conclusions.
              </p>
            </div>
            <Link href="/environmental-investigations/atlas">
              <Button variant="outline" size="sm" icon={<Map className="w-4 h-4 text-emerald-400" />}>
                Launch Investigation Atlas
              </Button>
            </Link>
          </div>

          {/* Thematic Investigation Series Filter Bar (Dynamic In-Page Counts) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedSeries('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-colors ${
                  selectedSeries === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
                }`}
              >
                {`All Investigations (${records.length})`}
              </button>
              {INVESTIGATION_THEMATIC_SERIES.map((ser) => {
                const cnt = records.filter((r) => (r.seriesId || 'core-himalayan-portfolio') === ser.id).length;
                return (
                  <button
                    key={ser.id}
                    type="button"
                    onClick={() => setSelectedSeries(ser.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-colors ${
                      selectedSeries === ser.id
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    {`${ser.shortLabel} (${cnt})`}
                  </button>
                );
              })}
            </div>
            {selectedSeries !== 'all' && (
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-emerald-500/25 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <strong className="text-white">
                    {INVESTIGATION_THEMATIC_SERIES.find((s) => s.id === selectedSeries)?.title}:
                  </strong>{' '}
                  {INVESTIGATION_THEMATIC_SERIES.find((s) => s.id === selectedSeries)?.subtitle}
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {INVESTIGATION_THEMATIC_SERIES.find((s) => s.id === selectedSeries)?.targetModules.map((tm) => (
                    <Link
                      key={tm.route}
                      href={tm.route}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-950 border border-white/10 text-emerald-300 hover:text-white font-mono text-[11px]"
                    >
                      <span>{tm.label}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 card-grid-stretch">
            {records
              .filter((r) => selectedSeries === 'all' || (r.seriesId || 'core-himalayan-portfolio') === selectedSeries)
              .map((inv) => {
              const domain = getDomainById(inv.primaryDomainId);
              return (
                <UniversalCard
                  key={inv.code}
                  variant="directory"
                  href={`/environmental-investigations/reports/${inv.slug}`}
                  icon={<FileSearch className="w-5 h-5 text-emerald-400" />}
                  badge={<InvestigationStatusBadge status={inv.status} />}
                  eyebrow={`${inv.code} · ${inv.temporalScope}${inv.priority ? ` · ${inv.priority.toUpperCase()}` : ''}`}
                  title={inv.shortTitle}
                  subtitle={`${domain?.name || ''} • ${inv.districts.length === 10 ? 'All 10 Kashmir Districts' : inv.districts.join(', ')}`}
                  description={inv.centralScientificQuestion || inv.subtitle}
                  ctaLabel={
                    inv.status === 'published'
                      ? 'Read Published Investigation'
                      : 'Inspect Scoping Dossier'
                  }
                >
                  <div className="pt-2 space-y-2">
                    <div className="h-28 w-full rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={inv.heroImage}
                        alt={inv.shortTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{inv.disciplineIds.length} Disciplines</span>
                      <span>{inv.evidenceMatrix.length} Claims Graded</span>
                    </div>
                  </div>
                </UniversalCard>
              );
            })}
          </div>
        </section>

        {/* SECTION C: INTERACTIVE SCIENTIFIC EVIDENCE VERIFICATION MATRIX PREVIEW */}
        {dalInvestigation && (
          <section aria-labelledby="evidence-matrix-preview" className="space-y-5">
            <Card padding="lg">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                    Epistemic Credibility Safeguard · Live Canonical Preview
                  </span>
                  <h2 id="evidence-matrix-preview" className="text-xl sm:text-2xl font-bold text-white">
                    {dalInvestigation.shortTitle} — Scientific Evidence Matrix
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
                    Every major assertion in KEW-EIAI must carry an explicit evidence classification separating documented audit/scientific facts from unverified mechanisms and unsupported deterministic claims.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {['ALL', 'Documented', 'Unverified', 'Unsupported'].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setSelectedEvidenceClass(cls)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-sm border transition-colors ${
                        selectedEvidenceClass === cls
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                          : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {cls === 'ALL' ? `All (${dalInvestigation.evidenceMatrix.length})` : cls}
                    </button>
                  ))}
                </div>
              </div>

              <div className="responsive-table-container">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Evaluated Assertion</th>
                      <th className="py-3 px-3">Primary Source Basis</th>
                      <th className="py-3 px-3">Verification Classification</th>
                      <th className="py-3 px-3">Scientific Justification &amp; Protocol Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredDalMatrix.map((ev) => (
                      <tr key={ev.id} className="hover:bg-white/[0.02]">
                        <td className="py-3.5 px-3 font-semibold text-white max-w-xs">
                          <span className="font-mono text-[10px] text-slate-400 block mb-0.5">{ev.id}</span>
                          {ev.assertion}
                        </td>
                        <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">
                          {ev.sourceCategory}
                        </td>
                        <td className="py-3.5 px-3">
                          <EvidenceClassificationBadge classification={ev.classification} />
                        </td>
                        <td className="py-3.5 px-3 text-slate-300 leading-relaxed max-w-md">
                          <p>{ev.evidenceBasisSummary}</p>
                          {ev.methodologicalRequirement && (
                            <p className="text-[11px] text-amber-300/90 mt-1 font-mono">
                              Required to verify: {ev.methodologicalRequirement}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400">
                  Total classified assertions across all portfolio investigations:{' '}
                  <strong className="text-white tabular-nums">{metrics.totalEvidenceRecords}</strong>
                </span>
                <Link
                  href="/environmental-investigations/evidence"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Open Full Evidence Registry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          </section>
        )}

        {/* SECTION D: ENVIRONMENTAL INVESTIGATION DOMAINS */}
        <section aria-labelledby="domains-heading" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                {INVESTIGATION_DOMAINS.length} Ecological, Physical &amp; Governance Scopes
              </span>
              <h2 id="domains-heading" className="text-2xl sm:text-3xl font-bold text-white">
                Environmental Investigation Domains
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-3xl">
                Comprehensive coverage across aquatic, cryospheric, geological, infrastructural, industrial, atmospheric, and governance systems — never restricted solely to lakes or public works.
              </p>
            </div>
            <Link href="/environmental-investigations/domains">
              <Button variant="secondary" size="sm" icon={<Layers className="w-4 h-4 text-emerald-400" />}>
                Explore All {INVESTIGATION_DOMAINS.length} Domains
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 card-grid-stretch">
            {INVESTIGATION_DOMAINS.map((dom) => {
              const IconComp = (Icons as any)[dom.iconName] || Layers;
              const count = (domainMap[dom.id] || []).length;
              return (
                <UniversalCard
                  key={dom.id}
                  variant="module"
                  href={`/environmental-investigations/domains#${dom.id}`}
                  icon={<IconComp className="w-5 h-5 text-emerald-400" />}
                  badge={
                    <Badge variant={count > 0 ? 'success' : 'outline'} size="sm" className="font-mono">
                      {count} {count === 1 ? 'Investigation' : 'Investigations'}
                    </Badge>
                  }
                  eyebrow={`DOMAIN ${dom.code}`}
                  title={dom.name}
                  description={dom.scope}
                  ctaLabel={`Inspect Domain & Linked Module (${dom.linkedKewModuleLabel})`}
                />
              );
            })}
          </div>
        </section>

        {/* SECTION E: HOW KEW-EIAI INTEGRATES EXISTING KEW SYSTEMS */}
        <section aria-labelledby="ecosystem-fit-heading" className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              Zero Duplication · Cross-Platform Synthesis
            </span>
            <h2 id="ecosystem-fit-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Integration With Existing KEW Intelligence Modules
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              KEW-EIAI reuses existing KEW scientific capabilities rather than duplicating them, bringing together literature, field observations, satellite change detection, EIA models, and statutory dockets into issue-specific investigations.
            </p>
          </div>

          <Card padding="none" className="overflow-hidden">
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Existing KEW Module</th>
                    <th className="py-3.5 px-4">Primary Responsibility</th>
                    <th className="py-3.5 px-4">Contribution to KEW-EIAI Investigations</th>
                    <th className="py-3.5 px-4">Shared Artifacts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {KEW_ECOSYSTEM_INTEGRATIONS.map((mod) => (
                    <tr key={mod.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        <Link
                          href={mod.route}
                          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
                        >
                          <span>{mod.moduleName}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{mod.primaryResponsibility}</td>
                      <td className="py-3.5 px-4 text-slate-300 leading-relaxed max-w-md">
                        {mod.eiaiIntegrationRole}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {mod.sharedArtifacts.map((art) => (
                            <Badge key={art} variant="outline" size="sm">
                              {art}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* SECTION E2: PRIMARY INSTITUTIONAL & SCIENTIFIC EVIDENCE ACQUISITION MATRIX */}
        <section aria-labelledby="evidence-acquisition-heading" className="space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Mandatory Pre-Publication Evidence Acquisition Protocol
            </span>
            <h2 id="evidence-acquisition-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Primary Scientific &amp; Institutional Data Repositories
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Every proposed and scoping investigation remains gated behind authenticated documentary, audit, laboratory, and satellite acquisition from primary statutory custodians — never substituting AI synthesis for missing empirical records.
            </p>
          </div>

          <Card padding="none" className="overflow-hidden">
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Custodian Institution / Portal</th>
                    <th className="py-3.5 px-4">Target Investigation Series</th>
                    <th className="py-3.5 px-4">Required Authenticated Evidence</th>
                    <th className="py-3.5 px-4">Official Repository</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {PRIMARY_INSTITUTIONAL_EVIDENCE_SOURCES.map((src) => (
                    <tr key={src.institution} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white">{src.institution}</td>
                      <td className="py-3.5 px-4 text-emerald-300 font-mono text-[11px] whitespace-nowrap">
                        {src.targetSeries}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 leading-relaxed max-w-lg">
                        {src.requiredEvidence}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {src.repositoryUrl ? (
                          <a
                            href={src.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono text-[11px]"
                          >
                            <span>Official Portal</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-500 font-mono text-[11px]">Statutory / Archival</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* SECTION F: 6 SCIENTIFIC CLUSTERS + 24-SECTION STANDARD + 12 FORMATS OVERVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FlaskConical className="w-6 h-6 text-cyan-400" />
                <Badge variant="info" size="sm" className="font-mono">
                  {DISCIPLINE_CLUSTERS.length} Clusters · {ALL_SCIENTIFIC_DISCIPLINES_LEN(DISCIPLINE_CLUSTERS)} Sciences
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-white">Integrated Scientific Disciplines</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Disciplines never appear as decorative labels: each contributes governing equations, measurement protocols, uncertainty bounds, and published Himalayan literature anchors.
              </p>
              <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
                {DISCIPLINE_CLUSTERS.map((c) => (
                  <li key={c.id} className="flex items-center justify-between border-b border-white/5 pb-1">
                    <span>{c.name}</span>
                    <span className="font-mono text-slate-400">{c.disciplines.length} fields</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link
                href="/environmental-investigations/disciplines"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>Inspect Discipline Equations &amp; Methods</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FileText className="w-6 h-6 text-emerald-400" />
                <Badge variant="success" size="sm" className="font-mono">
                  {STANDARD_REPORT_SECTIONS.length} Dynamic Sections
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-white">Standard Scientific Report Architecture</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every investigation follows a uniform {STANDARD_REPORT_SECTIONS.length}-section scientific architecture (Executive Summary through Updates &amp; Corrections), dynamically suppressing non-applicable sections.
              </p>
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-slate-300 font-mono">
                {STANDARD_REPORT_SECTIONS.slice(0, 8).map((s) => (
                  <div key={s.number} className="truncate bg-slate-950/70 px-2 py-1 rounded-sm border border-white/5">
                    {s.number}. {s.title}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link
                href="/environmental-investigations/methodology#report-architecture"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>View Complete {STANDARD_REPORT_SECTIONS.length}-Section Specification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          <Card className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Globe2 className="w-6 h-6 text-amber-400" />
                <Badge variant="warning" size="sm" className="font-mono">
                  {PUBLICATION_FORMATS.length} Derived Outputs
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-white">Single-Record Multi-Format Publishing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All {PUBLICATION_FORMATS.length} publication outputs — from Full Scientific Investigation and Executive Briefing to Legal Evidence Brief, Citation Record, and Open Dataset — derive from one verified master record.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PUBLICATION_FORMATS.slice(0, 8).map((f) => (
                  <Badge key={f.id} variant="outline" size="sm">
                    {f.title}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <Link
                href="/environmental-investigations/methodology#workflow"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>Explore Investigative Workflow ({INVESTIGATION_WORKFLOW_STAGES.length} Stages)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        </section>

        {/* SECTION G: FINAL MODULE IDENTITY CHARTER */}
        <Card padding="lg" className="border-emerald-500/30 bg-slate-900">
          <div className="max-w-4xl space-y-4">
            <KewBrandIdentity variant="eyebrow" />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Environmental Investigations &amp; Accountability
            </h2>
            <p className="text-sm sm:text-base font-semibold text-emerald-300">
              Scientific Evidence. Ecological Consequences. Institutional Responsibility.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A multidisciplinary environmental investigation platform examining the scientific, ecological, hydrological, geological and institutional consequences of human interventions across the Western Himalayas through transparent, evidence-based and continuously updated assessments.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-300 font-bold">
                Investigate · Verify · Analyse · Document · Monitor
              </span>
              <div className="flex flex-wrap gap-2">
                <Link href="/environmental-investigations/accountability">
                  <Button variant="secondary" size="sm" icon={<Scale className="w-3.5 h-3.5 text-emerald-400" />}>
                    Accountability Matrix
                  </Button>
                </Link>
                <Link href="/admin/environmental-investigations">
                  <Button variant="outline" size="sm">
                    Admin Investigation Workspace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

function ALL_SCIENTIFIC_DISCIPLINES_LEN(clusters: typeof DISCIPLINE_CLUSTERS) {
  return clusters.reduce((acc, c) => acc + c.disciplines.length, 0);
}
