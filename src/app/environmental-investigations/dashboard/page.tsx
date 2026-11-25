'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  FileSearch,
  FlaskConical,
  Globe2,
  Layers,
  Map,
  Radio,
  Scale,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { ModuleKpiStrip, ModuleKpi } from '@/components/common/ModuleKpiStrip';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import {
  EvidenceClassificationBadge,
  InvestigationStatusBadge,
} from '@/components/environmental-investigations/EiaiBadges';
import { InvestigationAtlasMap } from '@/components/environmental-investigations/InvestigationAtlasMap';
import {
  CANONICAL_INVESTIGATIONS,
  computeEiaiMetrics,
  getAllAccountabilityRecords,
  getAllEvidenceAssertions,
  getAllRecommendations,
  getDomainById,
  getDomainInvestigationCounts,
  GLOBAL_PRECEDENT_CASE_STUDIES,
  INVESTIGATION_DOMAINS,
  PUBLICATION_FORMATS,
} from '@/data/environmental-investigations';
import { InvestigationRecord } from '@/types/environmental-investigations';

type DashboardTabId =
  | 'overview'
  | 'investigations'
  | 'scientific-analysis'
  | 'evidence'
  | 'spatial-intelligence'
  | 'impact-assessment'
  | 'accountability'
  | 'global-precedents'
  | 'recommendations'
  | 'monitoring'
  | 'publications'
  | 'data-gaps';

const DASHBOARD_TABS: Array<{
  id: DashboardTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'investigations', label: 'Investigations', icon: FileSearch },
  { id: 'scientific-analysis', label: 'Scientific Analysis', icon: FlaskConical },
  { id: 'evidence', label: 'Evidence', icon: Database },
  { id: 'spatial-intelligence', label: 'Spatial Intelligence', icon: Map },
  { id: 'impact-assessment', label: 'Impact Assessment', icon: Layers },
  { id: 'accountability', label: 'Accountability', icon: Scale },
  { id: 'global-precedents', label: 'Global Precedents', icon: Globe2 },
  { id: 'recommendations', label: 'Recommendations', icon: CheckCircle2 },
  { id: 'monitoring', label: 'Monitoring', icon: Radio },
  { id: 'publications', label: 'Publications', icon: BookOpen },
  { id: 'data-gaps', label: 'Data Gaps', icon: AlertTriangle },
];

export default function InvestigationDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTabId>('overview');
  const [records, setRecords] = useState<InvestigationRecord[]>(CANONICAL_INVESTIGATIONS);

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
  const evidenceList = useMemo(() => getAllEvidenceAssertions(records), [records]);
  const accountabilityList = useMemo(() => getAllAccountabilityRecords(records), [records]);
  const recommendationList = useMemo(() => getAllRecommendations(records), [records]);
  const domainCounts = useMemo(() => getDomainInvestigationCounts(records), [records]);

  const domainChartData = useMemo(
    () =>
      INVESTIGATION_DOMAINS.map((d) => ({
        name: d.shortLabel,
        count: (domainCounts[d.id] || []).length,
      })).filter((item) => item.count > 0),
    [domainCounts]
  );

  const evidenceQualityData = useMemo(
    () =>
      [
        { name: 'Documented', value: metrics.documentedEvidenceCount, color: '#10b981' },
        { name: 'Provisional', value: metrics.provisionallySupportedCount, color: '#06b6d4' },
        { name: 'Unverified', value: metrics.unverifiedEvidenceCount, color: '#f59e0b' },
        { name: 'Unsupported', value: metrics.unsupportedEvidenceCount, color: '#ef4444' },
      ].filter((d) => d.value > 0),
    [metrics]
  );

  const kpis: ModuleKpi[] = [
    { label: 'Total Portfolio', value: metrics.totalInvestigations, icon: 'FileSearch', color: 'text-emerald-400' },
    { label: 'Published Reports', value: metrics.publishedCount, icon: 'CheckCircle2', color: 'text-white' },
    { label: 'Active & Scoping', value: metrics.activeCount + metrics.scopingCount, icon: 'Activity', color: 'text-cyan-400' },
    { label: 'Evidence Assertions', value: metrics.totalEvidenceRecords, icon: 'Database', color: 'text-emerald-300' },
    { label: 'Accountability Dockets', value: metrics.accountabilityRecordsCount, icon: 'Scale', color: 'text-amber-400' },
    { label: 'Tracked Data Gaps', value: metrics.totalDataGapsCount, icon: 'AlertTriangle', color: 'text-rose-400' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI CENTRAL ANALYTICAL COMMAND"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Dashboard' },
        ]}
        icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Investigation Intelligence Dashboard
            </span>
          </div>
        }
        subtitle="Unified 12-dimension analytical cockpit tracking portfolio progress, scientific discipline equations, verified vs unverified evidence distributions, spatial envelopes, institutional responses, and unresolved data gaps."
        images={['/images/earth-human-impact/ehii-command-center-satellite.jpg']}
      />

      <ModuleKpiStrip kpis={kpis} iconColor="text-emerald-400" />
      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-8 space-y-8">
        {/* 12-Tab Selector Strip (Matches Section 4) */}
        <div
          role="tablist"
          aria-label="Investigation Dashboard Views"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10"
        >
          {DASHBOARD_TABS.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <span className="text-xs font-mono uppercase text-slate-400">Investigation Portfolio</span>
                <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                  {metrics.totalInvestigations} Subjects
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  {metrics.publishedCount} Published · {metrics.activeCount} Active · {metrics.scopingCount} Scoping · {metrics.proposedCount} Proposed
                </p>
              </Card>
              <Card>
                <span className="text-xs font-mono uppercase text-slate-400">Environmental Domains</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                  {metrics.domainsCoveredCount} / {metrics.totalDomainsDefined} Active
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Spanning lakes, wetlands, cryosphere, mining, infrastructure, and governance.
                </p>
              </Card>
              <Card>
                <span className="text-xs font-mono uppercase text-slate-400">Geographic Coverage</span>
                <div className="text-2xl font-bold text-cyan-400 mt-1 tabular-nums">
                  {metrics.districtsCoveredCount} Districts
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  {metrics.districtsCoveredList.join(', ')}
                </p>
              </Card>
              <Card>
                <span className="text-xs font-mono uppercase text-slate-400">Evidence Quality</span>
                <div className="text-2xl font-bold text-amber-400 mt-1 tabular-nums">
                  {metrics.documentedEvidenceCount} / {metrics.totalEvidenceRecords} Documented
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  {metrics.provisionallySupportedCount} Provisional · {metrics.unverifiedEvidenceCount} Unverified · {metrics.unsupportedEvidenceCount} Unsupported
                </p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <h3 className="text-base font-bold text-white mb-1">
                  Domain Coverage Across Investigation Portfolio
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Number of investigations (primary + secondary linkages) per environmental domain
                </p>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={domainChartData} margin={{ top: 8, right: 16, left: -12, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        angle={-25}
                        textAnchor="end"
                        interval={0}
                      />
                      <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid rgba(255,255,255,0.15)',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="count" name="Investigations" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <h3 className="text-base font-bold text-white mb-1">
                  Evidence Verification Distribution
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Epistemic grading across all {metrics.totalEvidenceRecords} evaluated assertions
                </p>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={evidenceQualityData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={48}
                        outerRadius={78}
                        paddingAngle={3}
                      >
                        {evidenceQualityData.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid rgba(255,255,255,0.15)',
                          fontSize: '12px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                  {evidenceQualityData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                        {d.name}
                      </span>
                      <span className="font-mono font-bold text-white">{d.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: INVESTIGATIONS */}
        {activeTab === 'investigations' && (
          <Card padding="none">
            <div className="p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">Master Investigation Portfolio</h2>
                <p className="text-xs text-slate-400">
                  Published canonical reports alongside active, scoping, and proposed investigation charters
                </p>
              </div>
              <Link href="/environmental-investigations/reports">
                <Button size="sm" variant="secondary">Open Full Reports Directory</Button>
              </Link>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Investigation Subject</th>
                    <th className="py-3 px-4">Primary Domain</th>
                    <th className="py-3 px-4">Districts &amp; Period</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Evidence / Citations</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {records.map((r) => (
                    <tr key={r.code} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                        {r.code}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white max-w-xs">
                        {r.shortTitle}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {getDomainById(r.primaryDomainId)?.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <div>{r.districts.join(', ')}</div>
                        <div className="text-[10px] font-mono text-slate-400">{r.temporalScope}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <InvestigationStatusBadge status={r.status} label={r.statusLabel} />
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {r.evidenceMatrix.length} claims · {r.references.length} refs
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/environmental-investigations/reports/${r.slug}`}
                          className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 whitespace-nowrap"
                        >
                          <span>Open</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* TAB 3: SCIENTIFIC ANALYSIS */}
        {activeTab === 'scientific-analysis' && (
          <div className="space-y-4">
            {records
              .filter((r) => r.disciplineFindings.length > 0)
              .map((inv) => (
                <Card key={inv.code} className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-xs font-mono text-emerald-400">{inv.code}</span>
                      <h3 className="text-lg font-bold text-white">{inv.title}</h3>
                    </div>
                    <Link href="/environmental-investigations/disciplines">
                      <Button variant="outline" size="sm">All 36 Discipline Equations</Button>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inv.disciplineFindings.map((df) => (
                      <div
                        key={df.disciplineId}
                        className="p-4 rounded-lg bg-slate-950/70 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-white">{df.disciplineName}</span>
                          <EvidenceClassificationBadge classification={df.verificationClass} />
                        </div>
                        <div className="text-[11px] font-mono text-cyan-300 bg-slate-900 p-2 rounded-sm border border-white/5">
                          {df.equationOrMetricUsed}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{df.empiricalFinding}</p>
                        <p className="text-[11px] text-slate-400">
                          <strong className="text-slate-300">Uncertainty / Boundary:</strong> {df.uncertaintyAndLimitations}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
          </div>
        )}

        {/* TAB 4: EVIDENCE */}
        {activeTab === 'evidence' && (
          <Card padding="none">
            <div className="p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">Cross-Portfolio Evidence Verification Ledger</h2>
                <p className="text-xs text-slate-400">
                  {evidenceList.length} assertions classified across published and active investigations
                </p>
              </div>
              <Link href="/environmental-investigations/evidence">
                <Button size="sm" variant="secondary">Open Dedicated Evidence Registry</Button>
              </Link>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">ID / Investigation</th>
                    <th className="py-3 px-4">Assertion</th>
                    <th className="py-3 px-4">Source Category</th>
                    <th className="py-3 px-4">Classification</th>
                    <th className="py-3 px-4">Evidence Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {evidenceList.map((ev) => (
                    <tr key={ev.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono font-bold text-emerald-400">{ev.id}</div>
                        <div className="text-[10px] text-slate-400">{ev.investigationCode}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white max-w-xs">{ev.assertion}</td>
                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">{ev.sourceCategory}</td>
                      <td className="py-3.5 px-4">
                        <EvidenceClassificationBadge classification={ev.classification} />
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-md leading-relaxed">
                        {ev.evidenceBasisSummary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* TAB 5: SPATIAL INTELLIGENCE */}
        {activeTab === 'spatial-intelligence' && (
          <div className="space-y-4">
            <InvestigationAtlasMap investigations={records} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {records.slice(0, 6).map((r) => (
                <Card key={r.code} padding="sm">
                  <div className="text-[11px] font-mono text-emerald-400">{r.code}</div>
                  <div className="font-bold text-sm text-white mt-0.5">{r.shortTitle}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    Watershed: {r.watershedOrBasin} • Elevation: {r.elevationRangeM}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    Centroid: {r.coordinates[0].toFixed(3)}°N, {r.coordinates[1].toFixed(3)}°E
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: IMPACT ASSESSMENT */}
        {activeTab === 'impact-assessment' && (
          <div className="space-y-4">
            {records
              .filter((r) => r.interventionInventory.length > 0)
              .map((inv) => (
                <Card key={inv.code} className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="font-bold text-base text-white">
                      {inv.code} — Project &amp; Intervention Inventory
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{inv.temporalScope}</span>
                  </div>
                  <div className="responsive-table-container mb-0">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                          <th className="py-2.5 px-3">Intervention</th>
                          <th className="py-2.5 px-3">Agency &amp; Period</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Documented Ecological / Hydraulic Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {inv.interventionInventory.map((it) => (
                          <tr key={it.id}>
                            <td className="py-3 px-3 font-semibold text-white">{it.name}</td>
                            <td className="py-3 px-3 text-slate-300">
                              <div>{it.executingAgency}</div>
                              <div className="text-[10px] font-mono text-slate-400">{it.period}</div>
                            </td>
                            <td className="py-3 px-3">
                              <Badge variant="outline" size="sm">{it.status}</Badge>
                            </td>
                            <td className="py-3 px-3 text-slate-300 max-w-md">{it.documentedOutcome}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
          </div>
        )}

        {/* TAB 7: ACCOUNTABILITY */}
        {activeTab === 'accountability' && (
          <div className="space-y-4">
            {accountabilityList.map((acc) => (
              <Card key={acc.id} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-emerald-400">{acc.investigationCode} · {acc.id}</span>
                    <h3 className="text-base font-bold text-white">
                      {acc.responsibleInstitution} ({acc.institutionAcronym})
                    </h3>
                  </div>
                  <Badge variant="info" size="sm">{acc.followUpStatus}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-white/5">
                    <strong className="text-slate-200 block mb-1">Statutory Mandate &amp; Ownership:</strong>
                    <p className="text-slate-300">{acc.statutoryMandate}</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-white/5">
                    <strong className="text-slate-200 block mb-1">Documented Audit / Scientific Findings:</strong>
                    <p className="text-slate-300">{acc.documentedFindings}</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-white/5">
                    <strong className="text-emerald-300 block mb-1">Official Institutional Response:</strong>
                    <p className="text-slate-300">{acc.institutionalResponse}</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-lg border border-white/5">
                    <strong className="text-amber-300 block mb-1">Outstanding Questions for Clarification:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-300">
                      {acc.outstandingQuestions.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 8: GLOBAL PRECEDENTS */}
        {activeTab === 'global-precedents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GLOBAL_PRECEDENT_CASE_STUDIES.map((cs) => (
              <Card key={cs.id} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge variant="info" size="sm">{cs.countryOrRegion} · {cs.biomeCategory}</Badge>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Links: {cs.linkedInvestigationCodes.join(', ')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{cs.title}</h3>
                <p className="text-xs text-slate-300"><strong>Outcome:</strong> {cs.scientificOutcome}</p>
                <p className="text-xs text-emerald-300/90"><strong>Kashmir Lesson:</strong> {cs.transferableLessonForKashmir}</p>
                <p className="text-[11px] text-slate-400"><strong>Structural Caveat:</strong> {cs.structuralDifferencesNote}</p>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 9: RECOMMENDATIONS */}
        {activeTab === 'recommendations' && (
          <Card padding="none">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Actionable Recommendations Tracker ({recommendationList.length})</h2>
              <Link href="/environmental-investigations/recommendations">
                <Button size="sm" variant="secondary">Full Tracker View</Button>
              </Link>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Horizon</th>
                    <th className="py-3 px-4">Recommendation</th>
                    <th className="py-3 px-4">Target Institution</th>
                    <th className="py-3 px-4">Verification Indicator</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recommendationList.map((rec) => (
                    <tr key={rec.id}>
                      <td className="py-3.5 px-4 font-mono text-emerald-300 whitespace-nowrap">{rec.horizon}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{rec.title}</div>
                        <div className="text-slate-300 mt-0.5 max-w-md">{rec.actionSpecification}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{rec.targetInstitution}</td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-xs">{rec.verificationIndicator}</td>
                      <td className="py-3.5 px-4">
                        <Badge variant="outline" size="sm">{rec.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* TAB 10: MONITORING */}
        {activeTab === 'monitoring' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {records.map((inv) => (
              <Card key={inv.code} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">{inv.code}</span>
                  <InvestigationStatusBadge status={inv.status} label={inv.statusLabel} />
                </div>
                <h3 className="text-base font-bold text-white">{inv.shortTitle}</h3>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <div className="font-semibold text-slate-200">Connected KEW Monitoring Feeds:</div>
                  {inv.linkedKewModules.map((m) => (
                    <Link
                      key={m.route}
                      href={m.route}
                      className="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-white/5 hover:border-emerald-500/40"
                    >
                      <span className="text-emerald-300 font-medium">{m.moduleName}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 11: PUBLICATIONS */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-bold text-white mb-1">
                12 Canonical Publication Formats (Single-Master-Record Derivation)
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Select any published investigation to generate or download derived outputs without maintaining duplicate copies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PUBLICATION_FORMATS.map((fmt) => (
                  <div key={fmt.id} className="p-4 rounded-lg bg-slate-950/70 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{fmt.title}</span>
                      <Badge variant="outline" size="sm">{fmt.includedSectionNumbers.length} Sec</Badge>
                    </div>
                    <div className="text-[11px] text-emerald-400">Audience: {fmt.intendedAudience}</div>
                    <p className="text-xs text-slate-300">{fmt.derivationRule}</p>
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {records
                        .filter((r) => r.status === 'published')
                        .map((pub) => (
                          <Link
                            key={pub.code}
                            href={`/environmental-investigations/reports/${pub.slug}?format=${fmt.id}`}
                            className="px-2 py-1 text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-sm hover:bg-emerald-500/25"
                          >
                            {pub.code} →
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">Direct Open-Dataset Exports (JSON &amp; CSV)</h3>
                <p className="text-xs text-slate-400">Machine-readable evidence matrices and accountability schemas</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="/api/environmental-investigations/dal-lake-mechanical-dredging-ecological-defences?format=csv">
                  <Button size="sm" variant="outline" icon={<Download className="w-3.5 h-3.5" />}>
                    KEW-INV-0001 CSV
                  </Button>
                </a>
                <a href="/api/environmental-investigations/sheshnag-pilgrimage-infrastructure-alpine-ecology?format=csv">
                  <Button size="sm" variant="outline" icon={<Download className="w-3.5 h-3.5" />}>
                    KEW-INV-0002 CSV
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 12: DATA GAPS */}
        {activeTab === 'data-gaps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {records.map((inv) => (
              <Card key={inv.code} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">{inv.code}</span>
                  <Badge variant="warning" size="sm">{inv.dataGaps.length} Identified Gaps</Badge>
                </div>
                <h3 className="text-base font-bold text-white">{inv.shortTitle}</h3>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                  {inv.dataGaps.map((g, idx) => (
                    <li key={idx}>{g}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
