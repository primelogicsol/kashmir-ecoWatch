'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { SectoralImpactMap } from '@/components/sectoral-eia/SectoralImpactMap';
import { SHARED_ASSESSMENT_DATABASE } from '@/data/sectoral-eia';
import { 
  Activity, 
  MapPin, 
  Calendar, 
  Database, 
  GitBranch, 
  BarChart3, 
  Network, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Download, 
  ArrowLeft,
  ExternalLink,
  Clock,
  Layers,
  Award,
  AlertTriangle
} from 'lucide-react';

interface AssessmentPageProps {
  params: Promise<{ id: string }>;
}

export default function AssessmentDetailPage({ params }: AssessmentPageProps) {
  const { id } = use(params);

  const assessment = SHARED_ASSESSMENT_DATABASE.find(
    (a) => a.id.toLowerCase() === id.toLowerCase() || a.slug.toLowerCase() === id.toLowerCase()
  );

  if (!assessment) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Assessment Dossier Not Found</h1>
        <p className="text-slate-400 text-xs mb-4">
          The requested assessment identifier &ldquo;{id}&rdquo; does not exist in the SEIAE registry.
        </p>
        <Link href="/sectoral-eia">
          <Button className="bg-emerald-600 text-white font-bold text-xs">
            Return to SEIAE Directory
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label={`Sectoral EIA Dossier • ${assessment.code}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Assessments' },
          { label: assessment.code }
        ]}
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {assessment.title}
          </span>
        }
        subtitle={assessment.formalTitle}
        actions={
          <div className="flex items-center gap-3">
            <Link href="/sectoral-eia">
              <Button variant="outline" className="border-white/20 text-white text-xs">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Engine
              </Button>
            </Link>
            <Button
              onClick={() => alert(`Exporting Scientific Dossier for ${assessment.code}... PDF generation triggered.`)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Download Scientific Dossier (PDF)
            </Button>
          </div>
        }
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-10 max-w-6xl">
        {/* DOSSIER HEADER STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Assessment Code</span>
            <span className="text-sm font-mono font-bold text-emerald-400 mt-1 block">
              {assessment.code}
            </span>
            <span className="text-[10px] text-slate-500">SEIAE Registry</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Sector Classification</span>
            <span className="text-sm font-bold text-white capitalize mt-1 block">
              {assessment.sector}
            </span>
            <span className="text-[10px] text-slate-400">{assessment.submissionType === 'independent_scientific' ? 'Independent' : 'Stakeholder'}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Integrity Score</span>
            <span className="text-xl font-bold text-white mt-0.5 block">
              {assessment.overallScore} <span className="text-xs text-slate-400">/ 100</span>
            </span>
            <span className="text-[10px] text-amber-400">{assessment.impactSignificance} Stress</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Confidence Level</span>
            <span className="text-sm font-bold text-emerald-300 mt-1 block">
              {assessment.confidenceLevel}
            </span>
            <span className="text-[10px] text-slate-400">Peer Validated</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Publication Status</span>
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px] mt-1">
              {assessment.publicationStatus}
            </Badge>
            <span className="text-[10px] text-slate-500 block mt-0.5">{assessment.publishedAt || 'Active'}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Landscape Envelope</span>
            <span className="text-sm font-bold text-cyan-400 mt-1 block">
              {assessment.geographicBoundary.areaSqKm} km²
            </span>
            <span className="text-[10px] text-slate-400">{assessment.geographicBoundary.watershed}</span>
          </div>
        </div>

        {/* SUMMARY & EXECUTIVE FINDINGS */}
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Executive Scientific Summary</h3>
          </div>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed">
            {assessment.summary}
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Key Empirical Findings:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {assessment.keyFindings.map((finding, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-white/5 flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FIVE INVIOLABLE ANCHORS (BOUNDARY, TIME, BASELINE, METHOD, EVIDENCE) */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>The 5 Scientific Grounding Anchors</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">1. Geographic Boundary</span>
              <p className="font-semibold text-white">{assessment.geographicBoundary.name}</p>
              <p className="text-slate-400">Districts: {assessment.geographicBoundary.districts.join(', ')}</p>
              <p className="text-slate-400">Watershed: {assessment.geographicBoundary.watershed}</p>
              <p className="text-slate-400 font-mono text-[11px]">
                Coords: [{assessment.geographicBoundary.coordinates.join(', ')}]
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">2. Assessment Period</span>
              <p className="font-semibold text-white">{assessment.assessmentPeriod.temporalScale}</p>
              <p className="text-slate-400">Start Date: {assessment.assessmentPeriod.startDate}</p>
              <p className="text-slate-400">End Date: {assessment.assessmentPeriod.endDate}</p>
              <p className="text-slate-400">Updated: {assessment.updatedAt}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">3. Baseline & Method</span>
              <p className="font-semibold text-white">{assessment.baseline.baselineYear}</p>
              <p className="text-slate-400 line-clamp-2">{assessment.baseline.referenceState}</p>
              <p className="text-emerald-400 font-mono text-[11px] pt-1">
                {assessment.methodologyVersion}
              </p>
            </div>
          </div>
        </div>

        {/* EVIDENCE-SUPPORTED INDICATOR SCORECARD */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>Evidence-Supported Environmental Indicators ({assessment.indicators.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Weighted Multi-Criteria Evaluation</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs bg-slate-900/80">
              <thead className="bg-slate-950 text-slate-300 border-b border-white/10">
                <tr>
                  <th className="p-3 font-bold">Indicator Metric</th>
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold">Baseline</th>
                  <th className="p-3 font-bold">Current Measured</th>
                  <th className="p-3 font-bold">Threshold Cap</th>
                  <th className="p-3 font-bold">Trend</th>
                  <th className="p-3 font-bold">Weight</th>
                  <th className="p-3 font-bold">Integrity Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {assessment.indicators.map((ind) => (
                  <tr key={ind.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3">
                      <span className="font-semibold text-white block">{ind.name}</span>
                      <span className="text-[10px] text-slate-400">{ind.source}</span>
                    </td>
                    <td className="p-3 text-slate-300">{ind.category}</td>
                    <td className="p-3 font-mono text-slate-300">
                      {ind.baselineValue} <span className="text-[10px] text-slate-500">{ind.unit}</span>
                    </td>
                    <td className="p-3 font-mono font-bold text-white">
                      {ind.currentValue} <span className="text-[10px] text-slate-400">{ind.unit}</span>
                    </td>
                    <td className="p-3 font-mono text-amber-300">
                      {ind.thresholdLimit} <span className="text-[10px] text-slate-500">{ind.unit}</span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        ind.trend === 'critical'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                          : ind.trend === 'deteriorating'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          : ind.trend === 'improving'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {ind.trend}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-400">
                      {(ind.impactWeight * 100).toFixed(0)}%
                    </td>
                    <td className="p-3 font-bold font-mono text-emerald-400 text-sm">
                      {ind.score} / 100
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CAUSAL PATHWAYS & RECEPTORS */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-emerald-400" />
            <span>Causal Pathways & Ecosystem Receptors</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessment.causalPathways.map((cp, idx) => (
              <Card key={idx} className="p-5 bg-slate-900 border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Pathway #{idx + 1}
                  </span>
                  <Badge variant="outline" className="border-rose-500/40 text-rose-400 text-[10px]">
                    {cp.severity} Severity
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Economic Activity:</span>
                    <span className="text-slate-200">{cp.activity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Primary Environmental Pressure:</span>
                    <span className="text-amber-300">{cp.primaryPressure}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Ecosystem Receptor:</span>
                    <span className="text-cyan-300 font-medium">{cp.environmentalReceptor}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Ecological Consequence:</span>
                    <span className="text-slate-300">{cp.ecologicalConsequence}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-400">Evidence Base: </span>
                  {cp.evidenceBase}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CUMULATIVE CROSS-SECTOR PRESSURES */}
        {assessment.cumulativePressures.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-rose-400" />
              <span>Cumulative Cross-Sector Pressures</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessment.cumulativePressures.map((cum, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-900/90 border border-rose-500/20 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                      Interacting Sector: {cum.interactingSector}
                    </span>
                    <span className="font-mono text-rose-400 font-bold shrink-0">
                      Combined Stress: {cum.combinedImpactScore} / 100
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{cum.interactionMechanism}</p>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-amber-300/90">
                    <span className="font-semibold">Compounding Risk: </span>
                    {cum.compoundingRisk}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCENARIOS & FORWARD MODELING */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Scenario Intelligence (2026 - 2030 Horizons)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessment.scenarios.map((scen, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-white/10 space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <h4 className="font-bold text-white text-sm">{scen.name}</h4>
                  <Badge variant="outline" className="border-white/20 text-slate-300 self-start sm:self-auto shrink-0">
                    Horizon {scen.horizon}
                  </Badge>
                </div>
                <p className="text-slate-300 leading-relaxed">{scen.description}</p>
                <div className="space-y-1 text-slate-400">
                  <span className="font-semibold text-slate-300 block">Key Assumptions:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {scen.assumptions.map((a, aIdx) => (
                      <li key={aIdx}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-white/5 text-amber-300/90">
                  <span className="font-bold block">Key Projected Risk:</span>
                  {scen.keyRisk}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MITIGATION & ADAPTATION LEDGER */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Actionable Mitigation & Adaptation Ledger</span>
          </h3>

          <div className="space-y-3">
            {assessment.mitigationActions.map((mit) => (
              <div key={mit.id} className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                      {mit.hierarchyType}
                    </span>
                    <Badge variant="outline" className="border-white/10 text-slate-300">
                      {mit.status}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-white text-sm pt-1">{mit.action}</h4>
                  <p className="text-slate-300">
                    Target: <span className="text-emerald-300">{mit.targetIndicator}</span> • Expected: <span className="text-slate-200">{mit.projectedReduction}</span>
                  </p>
                  <p className="text-slate-500 text-[11px]">Responsible Lead: {mit.responsibleLead}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/5 shrink-0 max-w-xs text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 block mb-0.5">Verification Milestone:</span>
                  {mit.verificationMilestone}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SPATIAL ENVELOPE MAP */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Geographic Assessment Geometry</h3>
          <SectoralImpactMap
            highlightAssessmentId={assessment.id}
            selectedSector={assessment.sector}
            className="h-[380px]"
            showFilters={false}
          />
        </div>

        {/* SCIENTIFIC PEER REVIEW & AUDIT HISTORY */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Scientific Peer Review Trail</span>
          </h3>

          <div className="divide-y divide-white/5 text-xs">
            {assessment.reviewHistory.map((rev, idx) => (
              <div key={idx} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{rev.stage}</span>
                    <Badge className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px]">
                      {rev.status}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Evaluator: <span className="text-slate-300 font-medium">{rev.evaluator}</span> ({rev.affiliation})
                  </p>
                  <p className="text-slate-300 mt-1 italic">&ldquo;{rev.notes}&rdquo;</p>
                </div>
                <span className="text-slate-500 font-mono text-[11px] shrink-0">{rev.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
