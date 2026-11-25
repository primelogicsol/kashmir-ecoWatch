'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Globe2 } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import {
  CANONICAL_INVESTIGATIONS,
  GLOBAL_PRECEDENT_CASE_STUDIES,
} from '@/data/environmental-investigations';

export default function PrecedentsPage() {
  const [biomeFilter, setBiomeFilter] = useState<string>('ALL');

  const biomes = Array.from(
    new Set(GLOBAL_PRECEDENT_CASE_STUDIES.map((p) => p.biomeCategory))
  );

  const filtered =
    biomeFilter === 'ALL'
      ? GLOBAL_PRECEDENT_CASE_STUDIES
      : GLOBAL_PRECEDENT_CASE_STUDIES.filter((p) => p.biomeCategory === biomeFilter);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI COMPARATIVE EMPIRICAL BENCHMARKS"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Asian & Global Case Studies' },
        ]}
        icon={<Globe2 className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Asian &amp; Global Comparative Case Studies
            </span>
          </div>
        }
        subtitle="Evaluating how comparable Asian, Alpine, and European river-lake-cryosphere systems tested dredging, tertiary nutrient control, moraine lake lowering, floodplain reconnection, and plateau conservation — including structural caveats preventing naive transplantation."
        images={['/images/water-module/water-river.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-8">
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setBiomeFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold border rounded-sm ${
              biomeFilter === 'ALL'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
            }`}
          >
            All Case Studies ({GLOBAL_PRECEDENT_CASE_STUDIES.length})
          </button>
          {biomes.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBiomeFilter(b)}
              className={`px-3 py-1.5 text-xs font-semibold border rounded-sm ${
                biomeFilter === b
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((cs) => (
            <Card key={cs.id} padding="lg" className="flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="info" size="sm">
                    {cs.countryOrRegion} · {cs.location}
                  </Badge>
                  <Badge variant="outline" size="sm">{cs.biomeCategory}</Badge>
                </div>

                <h2 className="text-xl font-bold text-white leading-snug">{cs.title}</h2>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Environmental Challenge:</strong>{' '}
                    {cs.environmentalChallenge}
                  </p>
                  <p>
                    <strong className="text-white">Intervention Tested:</strong>{' '}
                    {cs.interventionTested}
                  </p>
                  <p>
                    <strong className="text-emerald-300">Empirical Outcome:</strong>{' '}
                    {cs.scientificOutcome}
                  </p>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-emerald-500/25 text-xs space-y-1">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Transferable Lesson for Western Himalaya
                  </span>
                  <p className="text-slate-200 leading-relaxed">{cs.transferableLessonForKashmir}</p>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-lg border border-amber-500/20 text-xs space-y-1">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Structural &amp; Geomorphic Caveat
                  </span>
                  <p className="text-slate-300 leading-relaxed">{cs.structuralDifferencesNote}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="text-slate-400 flex items-start gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{cs.keyReference}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Applied in:</span>
                  {cs.linkedInvestigationCodes.map((code) => {
                    const inv = CANONICAL_INVESTIGATIONS.find((i) => i.code === code);
                    return inv ? (
                      <Link
                        key={code}
                        href={`/environmental-investigations/reports/${inv.slug}`}
                        className="px-2 py-0.5 font-mono text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-sm hover:bg-emerald-500/25"
                      >
                        {code} ({inv.shortTitle.split(':')[0]})
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
