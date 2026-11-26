'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { KewIcons as Icons } from '@/components/common/KewIcons';
import { ArrowRight, ExternalLink, Layers } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import {
  CANONICAL_INVESTIGATIONS,
  getDisciplineById,
  getDomainInvestigationCounts,
  INVESTIGATION_DOMAINS,
} from '@/data/environmental-investigations';

export default function InvestigationDomainsPage() {
  const domainMap = useMemo(() => getDomainInvestigationCounts(CANONICAL_INVESTIGATIONS), []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI BROAD ECOLOGICAL & GOVERNANCE TAXONOMY"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Investigation Domains' },
        ]}
        icon={<Layers className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              {INVESTIGATION_DOMAINS.length} Environmental Investigation Domains
            </span>
          </div>
        }
        subtitle="Full-spectrum investigative scope covering lakes, wetlands, rivers, aquifers, cryosphere, alpine ecology, linear infrastructure, hydropower, forests, mining, urban land use, pilgrimage, agrochemicals, industry, waste, atmosphere, compound hazards, and governance."
        images={['/images/earth-human-impact/ehii-karewa-land-transformation.jpg']}
      />

      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INVESTIGATION_DOMAINS.map((dom) => {
            const IconComp = (Icons as any)[dom.iconName] || Layers;
            const linkedInvs = domainMap[dom.id] || [];
            return (
              <Card key={dom.id} className="flex flex-col justify-between gap-4">
                <div id={dom.id} className="space-y-3 scroll-mt-36">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="kew-card-icon-box text-emerald-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                          Domain {dom.code}
                        </span>
                        <h2 className="text-lg font-bold text-white leading-snug">{dom.name}</h2>
                      </div>
                    </div>
                    <Badge variant={linkedInvs.length > 0 ? 'success' : 'outline'} size="sm" className="font-mono">
                      {linkedInvs.length} Linked
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{dom.scope}</p>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Core Diagnostic Indicators:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dom.coreIndicators.map((ind) => (
                        <span
                          key={ind}
                          className="px-2 py-0.5 text-[11px] bg-slate-950 border border-white/10 rounded-sm text-slate-300"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Primary Scientific Disciplines:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dom.primaryDisciplines.map((dId) => {
                        const disc = getDisciplineById(dId);
                        return (
                          <Link
                            key={dId}
                            href={`/environmental-investigations/disciplines#${dId}`}
                            className="px-2 py-0.5 text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-sm hover:bg-cyan-500/20"
                          >
                            {disc?.name || dId}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {linkedInvs.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                        Portfolio Investigations in This Domain:
                      </span>
                      {linkedInvs.map((inv) => (
                        <Link
                          key={inv.code}
                          href={`/environmental-investigations/reports/${inv.slug}`}
                          className="flex items-center justify-between gap-2 p-2 bg-slate-950/80 border border-white/10 rounded-sm hover:border-emerald-500/40 text-xs"
                        >
                          <span className="text-white font-medium">
                            <strong className="font-mono text-emerald-400 mr-1.5">{inv.code}</strong>
                            {inv.shortTitle}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <Link
                    href={dom.linkedKewModuleRoute}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-emerald-300"
                  >
                    <span>Reuse KEW Data: {dom.linkedKewModuleLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link
                    href={`/environmental-investigations/submit?domain=${dom.id}`}
                    className="font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    Propose Study →
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
