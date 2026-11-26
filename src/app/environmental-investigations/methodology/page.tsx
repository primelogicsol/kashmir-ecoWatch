'use client';

import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Cpu,
  FileText,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import { EvidenceClassificationBadge } from '@/components/environmental-investigations/EiaiBadges';
import {
  INVESTIGATION_WORKFLOW_STAGES,
  PUBLICATION_FORMATS,
  STANDARD_REPORT_SECTIONS,
} from '@/data/environmental-investigations';

export default function InvestigationMethodologyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI PUBLICATION ARCHITECTURE & EPISTEMIC PROTOCOL"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Methodology' },
        ]}
        icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Scientific Investigation Methodology
            </span>
          </div>
        }
        subtitle="Standardising how Kashmir EcoWatch initiates, verifies, challenges, publishes, and continuously updates multidisciplinary environmental investigations across the Western Himalayas."
        images={['/images/biodiversity/biodiversity-command-center.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-14">
        {/* 1. Epistemic Classification Rules */}
        <section id="epistemology" className="space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Section 01 · Evidence Grading Standard
            </span>
            <h2 className="text-2xl font-bold text-white">
              Five-Tier Scientific Evidence Verification System
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Every major factual, causal, spatial, or predictive claim must carry one of five strict verification classifications:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                cls: 'Documented' as const,
                desc: 'Directly established by peer-reviewed empirical studies, statutory CAG audits, or authenticated judicial/regulatory records.',
              },
              {
                cls: 'Provisionally Supported' as const,
                desc: 'Scientifically plausible physical/ecological mechanism backed by satellite or partial empirical evidence awaiting full field closure.',
              },
              {
                cls: 'Unverified' as const,
                desc: 'Requires parcel-level historical attribution, subsurface survey, or calibrated hydrodynamic/geotechnical modelling not yet performed.',
              },
              {
                cls: 'Unsupported' as const,
                desc: 'Lacks empirical basis or asserts deterministic irreversible collapse incompatible with established ecological dynamics.',
              },
              {
                cls: 'Conflicting' as const,
                desc: 'Material divergence between official administrative reports and independent audits/studies; both records are preserved transparently.',
              },
            ].map((item) => (
              <Card key={item.cls} padding="sm" className="space-y-2">
                <EvidenceClassificationBadge classification={item.cls} />
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 2. Standard Report Architecture */}
        <section id="report-architecture" className="space-y-5 scroll-mt-32">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              Section 02 · Uniform Scientific Publication Architecture
            </span>
            <h2 className="text-2xl font-bold text-white">
              {STANDARD_REPORT_SECTIONS.length}-Section Dynamic Investigation Report Standard
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Every investigation follows this {STANDARD_REPORT_SECTIONS.length}-section publication order while dynamically suppressing non-applicable sections (for example, omitting Hydrological Analysis on a purely atmospheric study).
            </p>
          </div>

          <Card padding="none">
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">No.</th>
                    <th className="py-3 px-4">Standard Report Section</th>
                    <th className="py-3 px-4">Required Scientific Contents</th>
                    <th className="py-3 px-4">Dynamic Relevance Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {STANDARD_REPORT_SECTIONS.map((s) => (
                    <tr key={s.number} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">{s.number}</td>
                      <td className="py-3 px-4 font-bold text-white whitespace-nowrap">{s.title}</td>
                      <td className="py-3 px-4 text-slate-300">{s.contentsDescription}</td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {s.conditionalDomainNote || 'Core canonical section'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* 3. AI-Assisted & Human-Verified Workflow */}
        <section id="workflow" className="space-y-5 scroll-mt-32">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Section 03 · Strict Anti-Fabrication Guardrails
            </span>
            <h2 className="text-2xl font-bold text-white">
              {INVESTIGATION_WORKFLOW_STAGES.length}-Stage AI-Assisted &amp; Scientifically Validated Workflow
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              AI assists documentary synthesis, literature cross-checking, supported mass-balance computation, and red-team critique — it is strictly forbidden from fabricating field measurements, laboratory assays, or unperformed numerical simulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INVESTIGATION_WORKFLOW_STAGES.map((st) => (
              <Card key={st.stageNumber} padding="sm" className="space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      STAGE {st.stageNumber}
                    </span>
                    <Cpu className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{st.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.summary}</p>
                  <p className="text-[11px] text-slate-400">
                    <strong className="text-slate-200">AI Scope:</strong> {st.aiAssistanceScope}
                  </p>
                </div>
                <div className="p-2 bg-slate-950 rounded-sm border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{st.scientificIntegrityGuardrail}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 4. Derived Publication Formats */}
        <section id="formats" className="space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Section 04 · Canonical Single-Source Publishing
            </span>
            <h2 className="text-2xl font-bold text-white">
              {PUBLICATION_FORMATS.length} Derived Publication Formats
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              All {PUBLICATION_FORMATS.length} audience-specific outputs are generated dynamically from the single canonical master record to prevent version drift.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PUBLICATION_FORMATS.map((fmt) => (
              <Card key={fmt.id} padding="sm" className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{fmt.title}</h3>
                  <Badge variant="outline" size="sm" className="font-mono">
                    {fmt.includedSectionNumbers.length} Sections
                  </Badge>
                </div>
                <div className="text-xs text-emerald-400">
                  Intended audience: {fmt.intendedAudience}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{fmt.derivationRule}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
