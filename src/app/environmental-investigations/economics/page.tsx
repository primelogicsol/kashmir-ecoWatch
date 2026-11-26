'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Landmark, Scale } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { ModuleKpiStrip, ModuleKpi } from '@/components/common/ModuleKpiStrip';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import { EnvironmentalEconomicsFiscalPanel } from '@/components/environmental-investigations/EnvironmentalEconomicsFiscalPanel';
import { InvestigationStatusBadge } from '@/components/environmental-investigations/EiaiBadges';
import { CANONICAL_INVESTIGATIONS } from '@/data/environmental-investigations';
import {
  ENVIRONMENTAL_INSTITUTIONS_23_AUDIT_INVENTORY,
  JK_BUDGET_2026_27_MACRO_BASELINE,
  NATURAL_CAPITAL_ASSET_ACCOUNTS,
  PRIMARY_FISCAL_AND_ECONOMIC_SOURCES,
} from '@/data/environmental-economics-fiscal-evidence';

export default function EnvironmentalEconomicsPage() {
  const econInvestigations = useMemo(
    () =>
      CANONICAL_INVESTIGATIONS.filter(
        (r) => r.seriesId === 'environmental-economics-fiscal'
      ),
    []
  );

  const kpis: ModuleKpi[] = [
    {
      label: 'FY 2026–27 Budget (BE)',
      value: JK_BUDGET_2026_27_MACRO_BASELINE[0].formattedValue,
      icon: 'Landmark',
      color: 'text-emerald-400',
    },
    {
      label: 'Estimated GSDP (FY27)',
      value: JK_BUDGET_2026_27_MACRO_BASELINE[1].formattedValue,
      icon: 'TrendingUp',
      color: 'text-cyan-400',
    },
    {
      label: 'Economics Portfolio',
      value: `${econInvestigations.length} Subjects`,
      icon: 'FileText',
      color: 'text-white',
    },
    {
      label: 'Institutions in Scope',
      value: `${ENVIRONMENTAL_INSTITUTIONS_23_AUDIT_INVENTORY.length} Bodies`,
      icon: 'Scale',
      color: 'text-amber-400',
    },
    {
      label: 'SEEA Asset Accounts',
      value: `${NATURAL_CAPITAL_ASSET_ACCOUNTS.length} Stocks`,
      icon: 'Layers',
      color: 'text-teal-300',
    },
    {
      label: 'Fiscal Repositories',
      value: `${PRIMARY_FISCAL_AND_ECONOMIC_SOURCES.length} Portals`,
      icon: 'Database',
      color: 'text-emerald-300',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <Heading
        label="KEW-EIAI SERIES VII · ENVIRONMENTAL ECONOMICS, PUBLIC FINANCE & NATURAL CAPITAL"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Investigations', href: '/environmental-investigations' },
          { label: 'Environmental Economics & Finance' },
        ]}
        icon={<Landmark className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-1">
            <KewBrandIdentity />
            <span className="block leading-[1.14] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Environmental Economics &amp; Fiscal Evidence
            </span>
          </div>
        }
        subtitle="Evaluating whether Jammu & Kashmir's public expenditure (FY 2000–01 to FY 2026–27) is sufficient, appropriately distributed, and delivering measurable ecological outcomes — or whether conventional GSDP growth masks natural capital depreciation."
        images={['/images/earth-human-impact/ehii-command-center-satellite.jpg']}
      />

      <ModuleKpiStrip kpis={kpis} iconColor="text-emerald-400" />
      <EnvironmentalInvestigationsNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Shared 8-Pillar Fiscal & Natural Capital Engine */}
        <EnvironmentalEconomicsFiscalPanel mode="full" />

        {/* Series VII Portfolio (KEW-INV-0039 .. KEW-INV-0053) */}
        <section aria-labelledby="econ-series-heading" className="space-y-5">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Series VII · {econInvestigations[0]?.code} Through {econInvestigations[econInvestigations.length - 1]?.code}
            </span>
            <h2 id="econ-series-heading" className="text-2xl sm:text-3xl font-bold text-white">
              Environmental Economics &amp; Public Finance Investigation Portfolio ({econInvestigations.length} Subjects)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Led by the flagship umbrella investigation (KEW-INV-0039) and 14 specialized fiscal, natural-capital, valuation, benefit–cost, capacity, and fiscal-reform charters. All subjects remain gated in Scoping / Proposed status pending full Demand-for-Grants extraction and peer review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {econInvestigations.map((inv) => (
              <Card
                key={inv.code}
                className={`flex flex-col justify-between gap-4 ${
                  inv.code === 'KEW-INV-0039'
                    ? 'border-emerald-400/50 bg-slate-900/95 md:col-span-2 lg:col-span-3'
                    : ''
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-300">
                        {inv.code} · {inv.temporalScope}
                      </span>
                      {inv.code === 'KEW-INV-0039' && (
                        <Badge variant="success" size="sm">Flagship Umbrella Charter</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {inv.priority && (
                        <Badge
                          variant={inv.priority === 'Critical' ? 'danger' : 'warning'}
                          size="sm"
                        >
                          {inv.priority}
                        </Badge>
                      )}
                      <InvestigationStatusBadge status={inv.status} label={inv.statusLabel} />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {inv.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {inv.centralScientificQuestion || inv.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-[11px] text-slate-400">
                    {inv.disciplineIds.length} Disciplines · {inv.evidenceMatrix.length} Graded Assertions
                  </span>
                  <Link
                    href={`/environmental-investigations/reports/${inv.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Open Investigation Charter</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
