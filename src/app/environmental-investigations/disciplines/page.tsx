'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, FlaskConical } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import {
  CANONICAL_INVESTIGATIONS,
  DISCIPLINE_CLUSTERS,
  getDisciplineInvestigationCounts,
} from '@/data/environmental-investigations';

export default function ScientificDisciplinesPage() {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const discMap = useMemo(
    () => getDisciplineInvestigationCounts(CANONICAL_INVESTIGATIONS),
    []
  );
  const totalDisciplinesCount = useMemo(
    () => DISCIPLINE_CLUSTERS.reduce((sum, c) => sum + c.disciplines.length, 0),
    []
  );

  const visibleClusters =
    selectedCluster === 'all'
      ? DISCIPLINE_CLUSTERS
      : DISCIPLINE_CLUSTERS.filter((c) => c.id === selectedCluster);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI MULTIDISCIPLINARY ANALYTICAL ENGINE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Scientific Disciplines' },
        ]}
        icon={<FlaskConical className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {totalDisciplinesCount} Integrated Scientific Disciplines
            </span>
          </div>
        }
        subtitle="Disciplines in KEW-EIAI never appear merely as decorative tags: every field contributes governing physical/ecological equations, empirical analytical methods, core parameters, and published Western Himalayan literature anchors."
        images={['/images/env-monitoring/kashmir-drinking-water-lab.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-10">
        {/* Cluster Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCluster('all')}
            className={`px-3 py-1.5 text-xs font-semibold border rounded-sm ${
              selectedCluster === 'all'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
            }`}
          >
            All {DISCIPLINE_CLUSTERS.length} Scientific Clusters ({totalDisciplinesCount} Disciplines)
          </button>
          {DISCIPLINE_CLUSTERS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCluster(c.id)}
              className={`px-3 py-1.5 text-xs font-semibold border rounded-sm ${
                selectedCluster === c.id
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              {c.name} ({c.disciplines.length})
            </button>
          ))}
        </div>

        {/* Clusters & Equations */}
        {visibleClusters.map((cluster) => (
          <section key={cluster.id} className="space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{cluster.name}</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{cluster.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cluster.disciplines.map((disc) => {
                const linkedInvs = discMap[disc.id] || [];
                return (
                  <Card key={disc.id} className="flex flex-col justify-between gap-3">
                    <div id={disc.id} className="space-y-3 scroll-mt-36">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white">{disc.name}</h3>
                        <Badge
                          variant={linkedInvs.length > 0 ? 'success' : 'outline'}
                          size="sm"
                          className="font-mono"
                        >
                          {linkedInvs.length} Active
                        </Badge>
                      </div>

                      <div className="p-2.5 bg-slate-950 rounded-sm border border-cyan-500/25 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                          Governing Equation / Analytical Model
                        </span>
                        <code className="text-xs text-cyan-200 font-mono block break-words">
                          {disc.governingEquationOrModel}
                        </code>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {disc.equationVariablesNote}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Analytical Methods:
                        </span>
                        <ul className="text-xs text-slate-300 space-y-0.5 list-disc pl-4">
                          {disc.analyticalMethods.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {disc.coreParameters.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 text-[10px] bg-slate-950 border border-white/10 rounded-sm text-slate-300"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 space-y-2 text-[11px]">
                      <div className="text-slate-400 flex items-start gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{disc.himalayanLiteratureAnchor}</span>
                      </div>

                      {linkedInvs.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {linkedInvs.map((inv) => (
                            <Link
                              key={inv.code}
                              href={`/environmental-investigations/reports/${inv.slug}`}
                              className="px-2 py-0.5 font-mono text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-sm hover:bg-emerald-500/25"
                            >
                              {inv.code}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
