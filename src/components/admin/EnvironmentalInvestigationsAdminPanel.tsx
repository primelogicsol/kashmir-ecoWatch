'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  FileSearch,
  FileText,
  FlaskConical,
  History,
  Map,
  MessageSquare,
  PlusCircle,
  RefreshCw,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  EvidenceClassificationBadge,
  InvestigationStatusBadge,
} from '@/components/environmental-investigations/EiaiBadges';
import {
  CANONICAL_INVESTIGATIONS,
  computeEiaiMetrics,
  getAllAccountabilityRecords,
  getAllEvidenceAssertions,
  getAllRecommendations,
  INVESTIGATION_DOMAINS,
  INVESTIGATION_WORKFLOW_STAGES,
  runScientificValidation,
  STANDARD_REPORT_SECTIONS,
} from '@/data/environmental-investigations';
import {
  InvestigationDomainId,
  InvestigationRecord,
  InvestigationSubmissionProposal,
} from '@/types/environmental-investigations';

type AdminWorkspaceModule =
  | 'publication-manager'
  | 'create-investigation'
  | 'ai-research-workspace'
  | 'scientific-validation'
  | 'evidence-citations'
  | 'accountability-responses'
  | 'recommendations-monitoring'
  | 'correction-register'
  | 'proposals-intake';

export function EnvironmentalInvestigationsAdminPanel({
  adminName = 'KEW Administrator',
}: {
  adminName?: string;
}) {
  const [activeSub, setActiveSub] = useState<AdminWorkspaceModule>('publication-manager');
  const [records, setRecords] = useState<InvestigationRecord[]>(CANONICAL_INVESTIGATIONS);
  const [proposals, setProposals] = useState<InvestigationSubmissionProposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Create Investigation Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDomain, setNewDomain] = useState<InvestigationDomainId>('01-lakes-limnology');
  const [newDistricts, setNewDistricts] = useState('Srinagar');
  const [newWatershed, setNewWatershed] = useState('');
  const [newScope, setNewScope] = useState('2015–2026');
  const [newQuestion, setNewQuestion] = useState('');

  // Institutional Response Form State
  const [respInvCode, setRespInvCode] = useState('KEW-INV-0001');
  const [respAccId, setRespAccId] = useState('ACC-DAL-01');
  const [respText, setRespText] = useState('');

  // Correction Log Form State
  const [corrCode, setCorrCode] = useState('KEW-INV-0001');
  const [corrVersion, setCorrVersion] = useState('v1.5');
  const [corrSummary, setCorrSummary] = useState('');

  // AI Research Scoping Prompt Preview State
  const [selectedAiCode, setSelectedAiCode] = useState('KEW-INV-0001');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/environmental-investigations?proposals=true');
      const json = await res.json();
      if (json?.success) {
        if (Array.isArray(json.investigations)) setRecords(json.investigations);
        if (Array.isArray(json.proposals)) setProposals(json.proposals);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const metrics = useMemo(() => computeEiaiMetrics(records), [records]);
  const allEvidence = useMemo(() => getAllEvidenceAssertions(records), [records]);
  const allAccountability = useMemo(() => getAllAccountabilityRecords(records), [records]);
  const allRecs = useMemo(() => getAllRecommendations(records), [records]);

  const showToast = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  const handleCreateInvestigation = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/environmental-investigations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_investigation',
        title: newTitle,
        subtitle: newSubtitle,
        primaryDomainId: newDomain,
        districts: newDistricts.split(',').map((d) => d.trim()).filter(Boolean),
        watershedOrBasin: newWatershed || 'Western Himalayan Watershed',
        temporalScope: newScope,
        scopingQuestion: newQuestion,
        actor: adminName,
      }),
    });
    const json = await res.json();
    if (json?.success) {
      showToast(`Initiated canonical charter ${json.investigation.code}.`);
      setNewTitle('');
      setNewSubtitle('');
      setNewWatershed('');
      setNewQuestion('');
      await loadData();
      setActiveSub('publication-manager');
    }
  };

  const handleStatusChange = async (code: string, status: string) => {
    const res = await fetch('/api/environmental-investigations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_status',
        code,
        status,
        actor: adminName,
      }),
    });
    if (res.ok) {
      showToast(`Updated ${code} publication status to ${status}.`);
      await loadData();
    }
  };

  const handleRecordResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetAcc = allAccountability.find((a) => a.id === respAccId);
    const res = await fetch('/api/environmental-investigations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'record_institutional_response',
        code: respInvCode,
        accountabilityId: respAccId,
        institutionAcronym: targetAcc?.institutionAcronym || 'Agency',
        responseText: respText,
        actor: adminName,
      }),
    });
    if (res.ok) {
      showToast(`Recorded official institutional response on ${respInvCode}.`);
      setRespText('');
      await loadData();
    }
  };

  const handleLogCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/environmental-investigations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'log_correction',
        code: corrCode,
        version: corrVersion,
        summary: corrSummary,
        actor: adminName,
      }),
    });
    if (res.ok) {
      showToast(`Logged transparent revision note in ${corrCode} Section 24.`);
      setCorrSummary('');
      await loadData();
    }
  };

  const handleUpdateRecStatus = async (recommendationId: string, status: string) => {
    const res = await fetch('/api/environmental-investigations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_recommendation_status',
        recommendationId,
        status,
      }),
    });
    if (res.ok) {
      showToast(`Updated recommendation ${recommendationId} to "${status}".`);
      await loadData();
    }
  };

  const selectedAiRecord = records.find((r) => r.code === selectedAiCode) || records[0];

  return (
    <div className="space-y-6">
      {notice && (
        <div className="p-3.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice(null)} className="text-emerald-300 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header & Metrics Summary */}
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block">
              KEW-EIAI ADMINISTRATIVE COMMAND · ALL 14 GOVERNANCE WORKFLOWS
            </span>
            <h2 className="text-xl font-bold text-white">
              Environmental Investigations &amp; Accountability Desk
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
            >
              Sync Registry
            </Button>
            <Link href="/environmental-investigations">
              <Button size="sm" variant="secondary" icon={<ExternalLink className="w-3.5 h-3.5 text-emerald-400" />}>
                Public Module
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
            <span className="text-slate-400 block">Investigations</span>
            <span className="text-lg font-bold text-white tabular-nums">{metrics.totalInvestigations}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
            <span className="text-slate-400 block">Published</span>
            <span className="text-lg font-bold text-emerald-400 tabular-nums">{metrics.publishedCount}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
            <span className="text-slate-400 block">Evidence Claims</span>
            <span className="text-lg font-bold text-cyan-400 tabular-nums">{metrics.totalEvidenceRecords}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
            <span className="text-slate-400 block">Citations / DOIs</span>
            <span className="text-lg font-bold text-white tabular-nums">{metrics.totalReferencesCount}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
            <span className="text-slate-400 block">Institutions</span>
            <span className="text-lg font-bold text-amber-400 tabular-nums">{metrics.institutionsExaminedCount}</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-white/10">
            <span className="text-slate-400 block">Intake Proposals</span>
            <span className="text-lg font-bold text-emerald-300 tabular-nums">{proposals.length}</span>
          </div>
        </div>
      </Card>

      {/* Sub-Tool Selector covering all 14 Administrative Functionalities */}
      <div className="flex flex-wrap gap-1.5 border-b border-white/10 pb-3">
        {[
          { id: 'publication-manager', label: 'Publication & Report Composer', icon: FileText },
          { id: 'create-investigation', label: 'Create Investigation', icon: PlusCircle },
          { id: 'ai-research-workspace', label: 'AI Research & Spatial Desk', icon: Cpu },
          { id: 'scientific-validation', label: 'Scientific Validation', icon: ShieldCheck },
          { id: 'evidence-citations', label: 'Evidence & Citation Manager', icon: Database },
          { id: 'accountability-responses', label: 'Institutional Registry & Responses', icon: Scale },
          { id: 'recommendations-monitoring', label: 'Recommendations & Monitoring', icon: Clock },
          { id: 'correction-register', label: 'Correction Register', icon: History },
          { id: 'proposals-intake', label: `Intake Queue (${proposals.length})`, icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSub === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSub(tab.id as AdminWorkspaceModule)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border rounded-sm transition-colors ${
                active
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Publication Manager & 24-Section Report Composer */}
      {activeSub === 'publication-manager' && (
        <Card padding="none">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">
              Publication Manager, Spatial Links &amp; 24-Section Completeness Matrix
            </h3>
          </div>
          <div className="responsive-table-container mb-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Code &amp; Version</th>
                  <th className="py-3 px-4">Title &amp; Coordinates</th>
                  <th className="py-3 px-4">24-Sec Coverage</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4">Publication Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((inv) => {
                  const secCount = inv.sections.filter((s) => s.applicable).length;
                  return (
                    <tr key={inv.code}>
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-emerald-400">{inv.code}</div>
                        <div className="text-[10px] text-slate-400">{inv.version}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/environmental-investigations/reports/${inv.slug}`}
                          className="font-semibold text-white hover:text-emerald-300"
                        >
                          {inv.shortTitle}
                        </Link>
                        <div className="text-[10px] font-mono text-slate-400">
                          GIS: {inv.coordinates[0].toFixed(3)}°N, {inv.coordinates[1].toFixed(3)}°E • {inv.disciplineIds.length} sciences
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-200">
                        {secCount} / {STANDARD_REPORT_SECTIONS.length} sections
                      </td>
                      <td className="py-3.5 px-4">
                        <InvestigationStatusBadge status={inv.status} label={inv.statusLabel} />
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          aria-label={`Update status for ${inv.code}`}
                          value={inv.status}
                          onChange={(e) => handleStatusChange(inv.code, e.target.value)}
                          className="px-2 py-1 bg-slate-950 border border-white/15 text-xs text-white"
                        >
                          <option value="published">Published</option>
                          <option value="active_investigation">Active Investigation</option>
                          <option value="scoping_review">Scoping Review</option>
                          <option value="proposed">Proposed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 2. Create Investigation */}
      {activeSub === 'create-investigation' && (
        <Card padding="lg">
          <h3 className="font-bold text-base text-white mb-4">
            Initiate New Canonical Investigation Charter (Stage 01)
          </h3>
          <form onSubmit={handleCreateInvestigation} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Investigation Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Anchar Lake: Urban Sewage Load, Siltation & Wetland Shrinkage"
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Scientific Subtitle *</label>
                <input
                  type="text"
                  required
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="Hydrology, nutrient loading, and municipal outfall accountability"
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Primary Domain</label>
                <select
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value as InvestigationDomainId)}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                >
                  {INVESTIGATION_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.code}. {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Districts (comma-sep)</label>
                <input
                  type="text"
                  value={newDistricts}
                  onChange={(e) => setNewDistricts(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Watershed / Basin</label>
                <input
                  type="text"
                  value={newWatershed}
                  onChange={(e) => setNewWatershed(e.target.value)}
                  placeholder="Sind–Anchar Sub-Basin"
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Temporal Scope</label>
                <input
                  type="text"
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Initial Falsifiable Scoping Question *
              </label>
              <textarea
                rows={3}
                required
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="State the primary scientific & institutional research question without predetermined conclusions..."
                className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
              />
            </div>
            <Button type="submit" size="sm">Create Investigation Charter</Button>
          </form>
        </Card>
      )}

      {/* 3. AI Research, Scientific Analysis & Spatial Data Workspace */}
      {activeSub === 'ai-research-workspace' && selectedAiRecord && (
        <Card padding="lg" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-white">
                AI Documentary Research, Discipline &amp; Spatial Intelligence Workspace
              </h3>
              <p className="text-xs text-slate-400">
                Enforces strict anti-fabrication guardrails: documentary synthesis and supported calculations only — zero invented lab/field assays.
              </p>
            </div>
            <select
              value={selectedAiCode}
              onChange={(e) => setSelectedAiCode(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-white/15 text-xs text-white"
            >
              {records.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.code} — {r.shortTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-lg border border-white/10 space-y-2">
              <strong className="text-emerald-400 block uppercase text-[10px]">
                Assigned Scientific Disciplines ({selectedAiRecord.disciplineIds.length})
              </strong>
              <div className="flex flex-wrap gap-1">
                {selectedAiRecord.disciplineIds.map((d) => (
                  <Badge key={d} variant="outline" size="sm">{d}</Badge>
                ))}
              </div>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-white/10 space-y-2">
              <strong className="text-cyan-400 block uppercase text-[10px]">
                Spatial Data &amp; KEW GIS Linkages
              </strong>
              <div className="font-mono text-slate-200">
                Centroid: {selectedAiRecord.coordinates[0]}°N, {selectedAiRecord.coordinates[1]}°E
              </div>
              <div className="text-slate-400">{selectedAiRecord.watershedOrBasin}</div>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-white/10 space-y-2">
              <strong className="text-amber-400 block uppercase text-[10px]">
                Priority Documentary Gaps ({selectedAiRecord.dataGaps.length})
              </strong>
              <ul className="list-disc pl-4 text-slate-300 space-y-1">
                {selectedAiRecord.dataGaps.slice(0, 3).map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-[11px]">
            {INVESTIGATION_WORKFLOW_STAGES.map((st) => (
              <div key={st.stageNumber} className="p-2.5 bg-slate-950/70 rounded border border-white/10">
                <span className="font-mono font-bold text-emerald-400 block">Stage {st.stageNumber}</span>
                <span className="font-semibold text-white">{st.title}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 4. Scientific Validation Engine */}
      {activeSub === 'scientific-validation' && (
        <div className="space-y-4">
          {records.map((inv) => {
            const issues = runScientificValidation(inv);
            return (
              <Card key={inv.code} padding="sm" className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">
                    {inv.code} — {inv.shortTitle}
                  </span>
                  <Badge
                    variant={issues.some((i) => i.severity === 'error') ? 'danger' : 'success'}
                    size="sm"
                  >
                    {issues.filter((i) => i.severity === 'error').length} Errors ·{' '}
                    {issues.filter((i) => i.severity === 'warning').length} Warnings
                  </Badge>
                </div>
                {issues.length === 0 ? (
                  <p className="text-xs text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All documented claims carry valid citations, verification protocols, and balanced institutional response notes.
                  </p>
                ) : (
                  <ul className="space-y-1 text-xs">
                    {issues.map((iss, idx) => (
                      <li key={idx} className="text-slate-300 font-mono">
                        [{iss.severity.toUpperCase()}] {iss.code}: {iss.message}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* 5. Evidence & Citation Manager */}
      {activeSub === 'evidence-citations' && (
        <Card padding="none">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">
              Master Evidence Assertions ({allEvidence.length}) &amp; Citation Provenance ({metrics.totalReferencesCount})
            </h3>
          </div>
          <div className="responsive-table-container mb-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Assertion</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Linked Citations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allEvidence.map((ev) => (
                  <tr key={ev.id}>
                    <td className="py-3 px-4 font-mono text-emerald-400 whitespace-nowrap">{ev.id}</td>
                    <td className="py-3 px-4 text-white max-w-md">{ev.assertion}</td>
                    <td className="py-3 px-4">
                      <EvidenceClassificationBadge classification={ev.classification} />
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">{ev.citationIds.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 6. Institutional Registry & Official Response Manager */}
      {activeSub === 'accountability-responses' && (
        <Card padding="lg" className="space-y-4">
          <h3 className="font-bold text-base text-white">
            Record Official Institutional Clarification / Right-of-Reply
          </h3>
          <form onSubmit={handleRecordResponse} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Investigation</label>
                <select
                  value={respInvCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    setRespInvCode(code);
                    const firstAcc = allAccountability.find((a) => a.investigationCode === code);
                    if (firstAcc) setRespAccId(firstAcc.id);
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                >
                  {records
                    .filter((r) => r.accountabilityMatrix.length > 0)
                    .map((r) => (
                      <option key={r.code} value={r.code}>
                        {r.code} — {r.shortTitle}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Responsible Institution</label>
                <select
                  value={respAccId}
                  onChange={(e) => setRespAccId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                >
                  {allAccountability
                    .filter((a) => a.investigationCode === respInvCode)
                    .map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.institutionAcronym} — {a.responsibleInstitution}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Verbatim Official Explanation / Correspondence Summary *
              </label>
              <textarea
                rows={3}
                required
                value={respText}
                onChange={(e) => setRespText(e.target.value)}
                placeholder="Enter dated institutional statement, compliance letter reference, or empirical clarification..."
                className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
              />
            </div>
            <Button type="submit" size="sm">Append Official Response</Button>
          </form>
        </Card>
      )}

      {/* 7. Recommendations Tracker & Monitoring Scheduler */}
      {activeSub === 'recommendations-monitoring' && (
        <Card padding="none">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">
              Recommendations Implementation &amp; Continuous Monitoring Scheduler
            </h3>
          </div>
          <div className="responsive-table-container mb-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Recommendation &amp; Target</th>
                  <th className="py-3 px-4">Horizon</th>
                  <th className="py-3 px-4">Status Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allRecs.map((rec) => (
                  <tr key={rec.id}>
                    <td className="py-3 px-4 font-mono text-emerald-400">{rec.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{rec.title}</div>
                      <div className="text-[11px] text-slate-400">{rec.targetInstitution}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">{rec.horizon}</td>
                    <td className="py-3 px-4">
                      <select
                        value={rec.status}
                        onChange={(e) => handleUpdateRecStatus(rec.id, e.target.value)}
                        className="px-2 py-1 bg-slate-950 border border-white/15 text-xs text-white"
                      >
                        <option value="Proposed">Proposed</option>
                        <option value="Awaiting Institutional Review">Awaiting Institutional Review</option>
                        <option value="Adopted in Principle">Adopted in Principle</option>
                        <option value="Implementation Underway">Implementation Underway</option>
                        <option value="Verified Complete">Verified Complete</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* 8. Correction Register */}
      {activeSub === 'correction-register' && (
        <Card padding="lg" className="space-y-4">
          <h3 className="font-bold text-base text-white">
            Transparent Revision &amp; Correction Register (Section 24)
          </h3>
          <form onSubmit={handleLogCorrection} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Investigation Code</label>
                <select
                  value={corrCode}
                  onChange={(e) => setCorrCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                >
                  {records.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.code} — {r.shortTitle}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Version Tag</label>
                <input
                  type="text"
                  value={corrVersion}
                  onChange={(e) => setCorrVersion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Correction / Evidence Addendum Summary *
              </label>
              <textarea
                rows={3}
                required
                value={corrSummary}
                onChange={(e) => setCorrSummary(e.target.value)}
                placeholder="Describe exact numerical update, citation correction, or newly integrated dataset..."
                className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white"
              />
            </div>
            <Button type="submit" size="sm">Publish Permanent Revision Entry</Button>
          </form>
        </Card>
      )}

      {/* 9. Submitted Proposals Intake Queue */}
      {activeSub === 'proposals-intake' && (
        <Card padding="lg">
          {proposals.length === 0 ? (
            <p className="text-xs text-slate-400">
              No pending public investigation proposals in the intake queue yet. Submissions from{' '}
              <Link href="/environmental-investigations/submit" className="text-emerald-400 underline">
                /environmental-investigations/submit
              </Link>{' '}
              appear here in real time.
            </p>
          ) : (
            <div className="space-y-3">
              {proposals.map((p) => (
                <div key={p.id} className="p-4 bg-slate-950 rounded-lg border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-400">{p.trackingCode}</span>
                    <Badge variant="warning" size="sm">{p.status}</Badge>
                  </div>
                  <h4 className="font-bold text-sm text-white">{p.title}</h4>
                  <p className="text-slate-300">{p.issueDescription}</p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Sources: {p.documentedSourcesProvided} • Submitted by {p.proposerName} ({p.proposerAffiliation || 'Independent'})
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
