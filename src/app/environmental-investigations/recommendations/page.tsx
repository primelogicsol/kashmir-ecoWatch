'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import {
  CANONICAL_INVESTIGATIONS,
  getAllRecommendations,
} from '@/data/environmental-investigations';
import { InvestigationRecord } from '@/types/environmental-investigations';

export default function RecommendationsTrackerPage() {
  const [records, setRecords] = useState<InvestigationRecord[]>(CANONICAL_INVESTIGATIONS);
  const [horizonFilter, setHorizonFilter] = useState<string>('ALL');

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

  const allRecs = useMemo(() => getAllRecommendations(records), [records]);

  const filtered = useMemo(() => {
    if (horizonFilter === 'ALL') return allRecs;
    return allRecs.filter((r) => r.horizon === horizonFilter);
  }, [allRecs, horizonFilter]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI CORRECTIVE ACTION & REMEDIATION MONITOR"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Recommendations Tracker' },
        ]}
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Recommendations &amp; Corrective Action Tracker
            </span>
          </div>
        }
        subtitle="Tracking Immediate (0–12 months), Medium-Term (1–3 years), and Long-Term (3–10 years) evidence-based interventions alongside target institutions and measurable empirical verification indicators."
        images={['/images/ngo-module/lake_clean.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-6">
        <div className="flex flex-wrap gap-1.5">
          {[
            'ALL',
            'Immediate (0–12 Months)',
            'Medium-Term (1–3 Years)',
            'Long-Term (3–10 Years)',
          ].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHorizonFilter(h)}
              className={`px-3 py-1.5 text-xs font-semibold border rounded-sm ${
                horizonFilter === h
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              {h === 'ALL' ? `All Horizons (${allRecs.length})` : h}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((rec) => (
            <Card key={rec.id} className="flex flex-col justify-between gap-3">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="success" size="sm" className="font-mono">
                    {rec.horizon}
                  </Badge>
                  <Badge variant="outline" size="sm">{rec.status}</Badge>
                </div>

                <div>
                  <Link
                    href={`/environmental-investigations/reports/${rec.investigationSlug}#section-21`}
                    className="font-mono text-[11px] text-emerald-400 hover:underline"
                  >
                    {rec.id} · {rec.investigationCode} ({rec.investigationTitle})
                  </Link>
                  <h2 className="text-base font-bold text-white mt-0.5 leading-snug">
                    {rec.title}
                  </h2>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {rec.actionSpecification}
                </p>

                <div className="p-3 bg-slate-950/70 rounded-lg border border-white/10 text-xs space-y-1">
                  <div>
                    <strong className="text-slate-200">Target Institution:</strong>{' '}
                    <span className="text-emerald-300">{rec.targetInstitution}</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Scientific Justification:</strong>{' '}
                    <span className="text-slate-300">{rec.scientificJustification}</span>
                  </div>
                  <div>
                    <strong className="text-slate-200">Verification Indicator:</strong>{' '}
                    <span className="text-cyan-300 font-mono text-[11px]">
                      {rec.verificationIndicator}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
