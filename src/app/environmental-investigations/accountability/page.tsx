'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Scale, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import {
  CANONICAL_INVESTIGATIONS,
  getAllAccountabilityRecords,
} from '@/data/environmental-investigations';
import { InvestigationRecord } from '@/types/environmental-investigations';

const ACCOUNTABILITY_FRAMEWORK_COMPONENTS = [
  'Statutory Mandate',
  'Project Ownership',
  'Scientific Responsibility',
  'Financial Responsibility',
  'Environmental Authorisation',
  'Monitoring Obligations',
  'Documented Audit & Scientific Observations',
  'Recorded Institutional Response',
  'Outstanding Questions Awaiting Documented Answers',
  'Corrective Action',
  'Verified Follow-Up Status',
] as const;

export default function InstitutionalAccountabilityPage() {
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

  const accountabilityMatrix = useMemo(
    () => getAllAccountabilityRecords(records),
    [records]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label={`KEW-EIAI ${ACCOUNTABILITY_FRAMEWORK_COMPONENTS.length}-COMPONENT STATUTORY RESPONSIBILITY FRAMEWORK`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Institutional Accountability' },
        ]}
        icon={<Scale className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Institutional Accountability Framework
            </span>
          </div>
        }
        subtitle="Documenting statutory mandates, executing ownership, scientific studies commissioned, financial responsibility, environmental authorisations, monitoring obligations, audit findings, and official institutional responses."
        images={['/images/governance-alamdar-hero.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-8">
        {/* Non-Inference Safeguard Notice */}
        <Card className="border-emerald-500/30 bg-slate-900">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white block">
                Mandatory Evidentiary Safeguard &amp; Official Right of Reply
              </strong>
              Institutional wrongdoing is <strong className="text-emerald-300">never automatically inferred from missing public documentation</strong>. Where technical studies, bathymetric surveys, or EMP logs are unavailable in the public domain, KEW-EIAI records them strictly as <em>Outstanding Questions Awaiting Documented Clarification</em> and publishes official institutional responses alongside independent scientific findings.
            </div>
          </div>
        </Card>

        {/* 11-Component Accountability Records */}
        <div className="space-y-6">
          {accountabilityMatrix.map((acc) => (
            <Card key={acc.id} padding="lg" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-emerald-400 block">
                    {acc.id} · Linked to {acc.investigationCode} ({acc.investigationTitle})
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    {acc.responsibleInstitution} ({acc.institutionAcronym})
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="info" size="sm">{acc.followUpStatus}</Badge>
                  <Link
                    href={`/environmental-investigations/reports/${acc.investigationSlug}#section-16`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Report Context</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-lg border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    1. Statutory Mandate
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.statutoryMandate}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-lg border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    2. Project Ownership
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.projectOwnership}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-lg border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    3. Scientific Responsibility
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.scientificResponsibility}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-lg border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    4. Financial Responsibility
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.financialResponsibility}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-lg border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    5. Environmental Authorisation
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.environmentalAuthorisation}</p>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-lg border border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    6. Monitoring Obligations
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.monitoringObligations}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950/80 rounded-lg border border-amber-500/25 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    7. Documented Audit &amp; Scientific Observations
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.documentedFindings}</p>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-lg border border-emerald-500/25 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    8. Recorded Institutional Response
                  </span>
                  <p className="text-slate-200 leading-relaxed">{acc.institutionalResponse}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950/60 rounded-lg border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
                    9. Outstanding Questions Awaiting Documented Answers
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    {acc.outstandingQuestions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-slate-950/60 rounded-lg border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
                    10–11. Corrective Action &amp; Verified Follow-Up Status
                  </span>
                  <p className="text-slate-300 leading-relaxed">{acc.correctiveAction}</p>
                  <p className="font-mono text-[11px] text-emerald-400 pt-1">
                    Current Status: {acc.followUpStatus}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
