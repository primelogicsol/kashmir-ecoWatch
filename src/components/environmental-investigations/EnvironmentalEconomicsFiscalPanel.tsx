'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  Coins,
  Database,
  FileSpreadsheet,
  Landmark,
  Layers,
  Scale,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BUDGET_TO_ECOLOGICAL_OUTCOME_STAGES,
  DEVELOPMENT_EXTERNALITY_SECTORS,
  ENVIRONMENTAL_DAMAGE_VALUATION_MATRIX,
  ENVIRONMENTAL_ECONOMICS_EQUATIONS,
  ENVIRONMENTAL_INSTITUTIONS_23_AUDIT_INVENTORY,
  HISTORICAL_FISCAL_PERIODS_2000_2027,
  INSTITUTIONAL_CAPACITY_PARAMETERS,
  INTERVENTION_RETURN_BCR_MATRIX,
  JK_BUDGET_2026_27_MACRO_BASELINE,
  NATURAL_CAPITAL_ASSET_ACCOUNTS,
  PRIMARY_FISCAL_AND_ECONOMIC_SOURCES,
  SEEA_EXPENDITURE_CLASSIFICATION,
} from '@/data/environmental-economics-fiscal-evidence';

type EconomicsPillarId =
  | 'budget-intelligence'
  | 'agency-expenditure'
  | 'natural-capital'
  | 'financing-deficit'
  | 'damage-economics'
  | 'restoration-bcr'
  | 'climate-mountain-peers'
  | 'institutional-capacity';

const PILLAR_TABS: Array<{
  id: EconomicsPillarId;
  label: string;
  shortDesc: string;
}> = [
  { id: 'budget-intelligence', label: 'Budget Intelligence', shortDesc: 'FY 2026–27 baseline & 2000–27 regimes' },
  { id: 'agency-expenditure', label: 'Agency Expenditure', shortDesc: '7-stage chain & SEEA CEPA/CReMA' },
  { id: 'natural-capital', label: 'Natural Capital (SEEA)', shortDesc: '10 asset accounts & GSDP_EA' },
  { id: 'financing-deficit', label: 'Financing Deficit', shortDesc: 'EEI, EFD_t & 13 fiscal repositories' },
  { id: 'damage-economics', label: 'Damage Economics', shortDesc: '13 loss domains & 9 externalities' },
  { id: 'restoration-bcr', label: 'Restoration BCR', shortDesc: '10 intervention ROI benchmarks' },
  { id: 'climate-mountain-peers', label: 'Climate & Mountain Peers', shortDesc: 'SAPCC, DRR & HP/UK benchmarks' },
  { id: 'institutional-capacity', label: 'Institutional Capacity', shortDesc: '23 agencies & 11 capacity metrics' },
];

interface EnvironmentalEconomicsFiscalPanelProps {
  mode?: 'full' | 'compact';
  className?: string;
}

export function EnvironmentalEconomicsFiscalPanel({
  mode = 'full',
  className = '',
}: EnvironmentalEconomicsFiscalPanelProps) {
  const [activePillar, setActivePillar] = useState<EconomicsPillarId>('budget-intelligence');

  if (mode === 'compact') {
    return (
      <section className={className} aria-label="Environmental Economics and Fiscal Evidence">
        <Card className="border-emerald-500/35 bg-slate-900/95 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                <Landmark className="w-3.5 h-3.5" />
                <span>Shared KEW-EIAI Layer · Environmental Economics &amp; Fiscal Evidence</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Public Expenditure, Natural Capital Depreciation &amp; Ecological Accountability (2000–2027)
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-medium max-w-4xl">
                Flagship Question: If Jammu &amp; Kashmir&apos;s nominal GSDP grows to ₹3,15,822 crore while lakes, wetlands, glaciers, forests, Karewas, and springs deteriorate, are we measuring genuine economic development or growth financed through natural capital depletion?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link href="/environmental-investigations/economics">
                <Button size="sm" icon={<Calculator className="w-3.5 h-3.5" />}>
                  Open 8-Pillar Fiscal Lab
                </Button>
              </Link>
              <Link href="/environmental-investigations/reports/jk-economics-environmental-governance-budget-deficit-umbrella">
                <Button variant="secondary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5 text-emerald-400" />}>
                  Umbrella Charter (KEW-INV-0039)
                </Button>
              </Link>
            </div>
          </div>

          {/* Verified FY 2026–27 Macro Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {JK_BUDGET_2026_27_MACRO_BASELINE.slice(0, 6).map((m) => (
              <div key={m.id} className="p-3 rounded-lg bg-slate-950/85 border border-white/10">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 line-clamp-1">
                  {m.label}
                </div>
                <div className="text-base sm:text-lg font-black text-white tabular-nums mt-0.5">
                  {m.formattedValue}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                  {m.fiscalYear} · Documented
                </div>
              </div>
            ))}
          </div>

          {/* 4 Governing Economic Equations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {ENVIRONMENTAL_ECONOMICS_EQUATIONS.map((eq) => (
              <div key={eq.id} className="p-3 rounded-lg bg-slate-950/75 border border-cyan-500/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{eq.title}</span>
                  <Badge variant="info" size="sm" className="font-mono text-[10px]">
                    {eq.symbol}
                  </Badge>
                </div>
                <code className="text-[11px] font-mono text-cyan-300 block">{eq.formula}</code>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {eq.guardrail}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Flagship Question & Non-Fabrication Fiscal Charter */}
      <Card className="border-emerald-500/35 bg-slate-900/95 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              <Scale className="w-4 h-4" />
              <span>Phase 12 Scientific &amp; Fiscal Governance Standard</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Is Jammu &amp; Kashmir Becoming Economically Wealthier While Becoming Ecologically Poorer?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This shared <strong className="text-white">Environmental Economics &amp; Fiscal Evidence</strong> engine connects public budgets, institutional staffing, UN SEEA natural capital accounts, and empirical ecological outcomes across all KEW investigations. It enforces strict separation between the former <strong className="text-emerald-300">J&amp;K State (2000–2019, incl. Ladakh)</strong> and the <strong className="text-cyan-300">UT of Jammu &amp; Kashmir (2019–2027)</strong>, prohibits attributing UT-wide outlays exclusively to Kashmir Division, and flags every unextracted agency budget line transparently rather than fabricating numbers.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Link href="/environmental-investigations/reports/jk-economics-environmental-governance-budget-deficit-umbrella">
              <Button size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
                Read Flagship Charter (KEW-INV-0039)
              </Button>
            </Link>
            <Link href="/environmental-investigations/accountability">
              <Button variant="outline" size="sm" icon={<Building2 className="w-4 h-4 text-emerald-400" />}>
                Institutional Accountability Matrix
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 8-Pillar Selector Bar (Matches Logical Architecture in Section 13) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Shared 8-Pillar Environmental Economics &amp; Fiscal Architecture
          </span>
          <span className="text-xs font-mono text-emerald-400">
            Source Baseline: J&amp;K Finance Dept &amp; PRS (FY 2026–27 BE) + CAG Audits + UN SEEA
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Environmental Economics Evidence Pillars"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2"
        >
          {PILLAR_TABS.map((tab) => {
            const selected = activePillar === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActivePillar(tab.id)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selected
                    ? 'bg-emerald-600/25 border-emerald-400 text-white shadow-sm'
                    : 'bg-slate-900/90 border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{tab.label}</div>
                <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{tab.shortDesc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PILLAR 1: ENVIRONMENTAL BUDGET INTELLIGENCE */}
      {activePillar === 'budget-intelligence' && (
        <div className="space-y-6">
          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400">
                  Verified Macro-Fiscal Baseline · FY 2026–27 Budget Estimates
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Jammu &amp; Kashmir 2026–27 Public Expenditure &amp; GSDP Envelope
                </h3>
              </div>
              <Badge variant="success" size="sm">
                Documented · J&amp;K Finance Dept &amp; PRS Legislative Research
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {JK_BUDGET_2026_27_MACRO_BASELINE.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-slate-950/85 border border-white/10 flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400">
                      {item.label}
                    </div>
                    <div className="text-2xl font-black text-white tabular-nums mt-1">
                      {item.formattedValue}
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-snug">{item.shareNote}</p>
                  </div>
                  <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-emerald-400">
                    {item.geographicalScope}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="none" className="overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                Historical Budget &amp; Constitutional Trend Regimes (FY 2000–01 to FY 2026–27)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Mandatory inflation-deflation and geographical boundary rules separating pre-2019 State accounts (incl. Ladakh) from post-2019 J&amp;K UT accounts
              </p>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Period</th>
                    <th className="py-3 px-4">Constitutional Regime</th>
                    <th className="py-3 px-4">Analytical Significance</th>
                    <th className="py-3 px-4">Deflation &amp; Boundary Normalization Rule</th>
                    <th className="py-3 px-4">Audit Provenance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {HISTORICAL_FISCAL_PERIODS_2000_2027.map((p) => (
                    <tr key={p.period} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 whitespace-nowrap">
                        {p.period}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Badge variant="outline" size="sm">{p.constitutionalRegime}</Badge>
                      </td>
                      <td className="py-3.5 px-4 text-slate-200 max-w-sm leading-relaxed">
                        {p.analyticalSignificance}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm leading-relaxed">
                        {p.deflationAndBoundaryProtocol}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-300 max-w-xs">
                        {p.auditDataStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* PILLAR 2: AGENCY EXPENDITURE ANALYSIS (7 STAGES + SEEA 4 TIERS) */}
      {activePillar === 'agency-expenditure' && (
        <div className="space-y-6">
          <Card className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                7-Stage Environmental Budget-to-Ecological-Outcome Framework
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Spending 100% of an allocation does not prove ecological success; conversely, constrained units may achieve measurable conservation returns.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {BUDGET_TO_ECOLOGICAL_OUTCOME_STAGES.map((st) => (
                <div
                  key={st.stageOrder}
                  className="p-4 rounded-lg bg-slate-950/85 border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 rounded-sm">
                      STAGE 0{st.stageOrder}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{st.stageName}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{st.accountingDefinition}</p>
                  <p className="text-[11px] text-amber-300/90 border-t border-white/5 pt-2">
                    <strong>Failure Mode Audited:</strong> {st.diagnosticFailureMode}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                Four-Tier UN SEEA Environmental Expenditure Classification &amp; Double-Counting Guardrails
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Captures direct conservation, resource management, embedded sectoral spending, and pressure-inducing outlays across all 23 departments
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {SEEA_EXPENDITURE_CLASSIFICATION.map((cat) => (
                <div
                  key={cat.code}
                  className="p-4 rounded-lg bg-slate-950/85 border border-white/10 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-300">{cat.code}</span>
                    <span className="text-[11px] text-slate-400">{cat.seeaAlignment}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{cat.categoryName}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{cat.scopeDescription}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.illustrativeJkHeads.map((h) => (
                      <Badge key={h} variant="outline" size="sm">{h}</Badge>
                    ))}
                  </div>
                  <p className="text-[11px] text-emerald-300/90 pt-1 border-t border-white/5">
                    <strong>De-Duplication Rule:</strong> {cat.doubleCountingGuardrail}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* PILLAR 3: NATURAL CAPITAL ACCOUNTS (UN SEEA + GSDP_EA) */}
      {activePillar === 'natural-capital' && (
        <div className="space-y-6">
          <Card className="border-cyan-500/30 bg-slate-900 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase text-cyan-300">
                UN SEEA &amp; MoSPI EnviStats (2018–2026) Alignment
              </span>
              <code className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-cyan-500/30 text-cyan-200">
                GSDP_EA = GSDP − CFC − D_N − D_E
              </code>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Methodological Safeguard:</strong>{' '}
              <code>GSDP_EA</code> is an exploratory adjusted net economic indicator (not an official MoSPI Green GSDP figure). Physical extent and condition accounts take precedence across all 10 Himalayan assets; monetary ecosystem valuations are applied only where defensible non-overlapping pricing exists.
            </p>
          </Card>

          <Card padding="none" className="overflow-hidden">
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Natural Capital Asset</th>
                    <th className="py-3 px-4">Economic Services</th>
                    <th className="py-3 px-4">Physical SEEA Stock/Condition Metrics</th>
                    <th className="py-3 px-4">Monetary Valuation &amp; Non-Monetizable Safeguard</th>
                    <th className="py-3 px-4">KEW Module</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {NATURAL_CAPITAL_ASSET_ACCOUNTS.map((a) => (
                    <tr key={a.assetName} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{a.assetName}</div>
                        <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
                          {a.seeaAccountClass}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-xs leading-relaxed">
                        {a.economicServices}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                        <ul className="list-disc pl-4 space-y-0.5">
                          {a.physicalMetrics.map((pm) => (
                            <li key={pm}>{pm}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm leading-relaxed space-y-1">
                        <div><strong className="text-cyan-300">Monetary:</strong> {a.monetaryValuationMethod}</div>
                        <div className="text-[11px] text-amber-200/90">
                          <strong>Non-Monetizable:</strong> {a.nonMonetizableDimension}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Link
                          href={a.linkedKewRoute}
                          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                        >
                          <span>Open</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* PILLAR 4: ECOLOGICAL FINANCING DEFICIT & 13 REPOSITORIES */}
      {activePillar === 'financing-deficit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ENVIRONMENTAL_ECONOMICS_EQUATIONS.map((eq) => (
              <Card key={eq.id} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{eq.title}</h3>
                  <Badge variant="info" size="sm" className="font-mono">{eq.symbol}</Badge>
                </div>
                <code className="block p-2.5 rounded bg-slate-950 border border-cyan-500/25 text-xs font-mono text-cyan-200">
                  {eq.formula}
                </code>
                <p className="text-xs text-slate-300 leading-relaxed">{eq.methodologyNote}</p>
                <p className="text-[11px] text-amber-300/95 border-t border-white/10 pt-2">
                  <strong>Scientific Integrity Guardrail:</strong> {eq.guardrail}
                </p>
              </Card>
            ))}
          </div>

          <Card padding="none" className="overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                13 Authoritative Financial &amp; Environmental-Economic Data Repositories
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Primary documentary acquisition layer for FY 2000–01 through FY 2026–27
              </p>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Source / Portal</th>
                    <th className="py-3 px-4">Custodian</th>
                    <th className="py-3 px-4">Required Financial &amp; Scientific Evidence</th>
                    <th className="py-3 px-4">Coverage</th>
                    <th className="py-3 px-4">Portal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {PRIMARY_FISCAL_AND_ECONOMIC_SOURCES.map((src) => (
                    <tr key={src.sourceName} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white">{src.sourceName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{src.custodianBody}</td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-md leading-relaxed">
                        {src.requiredInformation}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-emerald-300">
                        {src.geographicCoverage}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <a
                          href={src.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono text-[11px]"
                        >
                          <span>Verify</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* PILLAR 5: ENVIRONMENTAL DAMAGE ECONOMICS & DEVELOPMENT EXTERNALITIES */}
      {activePillar === 'damage-economics' && (
        <div className="space-y-6">
          <Card padding="none" className="overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                13 Environmental Degradation Economic Valuation Pathways
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every valuation enforces explicit geographical boundaries, uncertainty intervals, and double-counting firewalls
              </p>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Degradation Domain</th>
                    <th className="py-3 px-4">Valuation Methodology</th>
                    <th className="py-3 px-4">Double-Counting Safeguard</th>
                    <th className="py-3 px-4">Evidence Maturity</th>
                    <th className="py-3 px-4">Charter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ENVIRONMENTAL_DAMAGE_VALUATION_MATRIX.map((d) => (
                    <tr key={d.degradationProcess} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{d.degradationProcess}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{d.primaryAffectedReceptors}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm leading-relaxed">
                        {d.economicValuationMethod}
                      </td>
                      <td className="py-3.5 px-4 text-amber-200/90 max-w-sm leading-relaxed">
                        {d.doubleCountingSafeguard}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={d.evidenceMaturity.startsWith('Empirical') ? 'info' : 'warning'}
                          size="sm"
                        >
                          {d.evidenceMaturity}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 whitespace-nowrap">
                        {d.linkedInvestigationCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card padding="none" className="overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                9 Economic Development Activities Audited for Uncompensated Externalities
              </h3>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Economic Activity</th>
                    <th className="py-3 px-4">Environmental Cost Pathway</th>
                    <th className="py-3 px-4">Cost-Transfer Mechanism</th>
                    <th className="py-3 px-4">Budget Internalisation Test</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {DEVELOPMENT_EXTERNALITY_SECTORS.map((row) => (
                    <tr key={row.economicActivity} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white">{row.economicActivity}</td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-xs leading-relaxed">
                        {row.potentialEnvironmentalCost}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-xs leading-relaxed">
                        {row.costTransferMechanism}
                      </td>
                      <td className="py-3.5 px-4 text-emerald-300 max-w-xs leading-relaxed">
                        {row.mitigationInternalisationTest}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* PILLAR 6: RESTORATION BENEFIT-COST ANALYSIS */}
      {activePillar === 'restoration-bcr' && (
        <Card padding="none" className="overflow-hidden">
          <div className="p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                10 Public Interventions Evaluated by Environmental Return &amp; Benefit–Cost Ratio (BCR)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                BCR &gt; 1 indicates monetized benefits exceed costs under stated discount assumptions — never substituting for physical sustainability thresholds
              </p>
            </div>
            <code className="text-xs font-mono px-2.5 py-1 bg-slate-950 border border-emerald-500/30 text-emerald-300 rounded">
              BCR = [Σ B_t/(1+r)^t] / [Σ C_t/(1+r)^t]
            </code>
          </div>
          <div className="responsive-table-container mb-0">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Government Intervention</th>
                  <th className="py-3 px-4">Verified Ecological Performance Indicator</th>
                  <th className="py-3 px-4">Audited Baseline / Empirical Anchor</th>
                  <th className="py-3 px-4">Economic Efficiency Metric</th>
                  <th className="py-3 px-4">Linked Study</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {INTERVENTION_RETURN_BCR_MATRIX.map((r) => (
                  <tr key={r.intervention} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-bold text-white">{r.intervention}</td>
                    <td className="py-3.5 px-4 text-slate-200 max-w-xs leading-relaxed">
                      {r.environmentalPerformanceIndicator}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-sm leading-relaxed">
                      {r.auditedBaselineOrAnchor}
                    </td>
                    <td className="py-3.5 px-4 text-cyan-300 max-w-xs leading-relaxed">
                      {r.economicEvaluationMetric}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 whitespace-nowrap">
                      {r.linkedInvestigationCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* PILLAR 7: CLIMATE FINANCE & REGIONAL MOUNTAIN PEERS */}
      {activePillar === 'climate-mountain-peers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card className="space-y-3">
            <Badge variant="info" size="sm">KEW-INV-0047 · Climate Economics</Badge>
            <h3 className="text-lg font-bold text-white">SAPCC Climate Adaptation Financing Gap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Compares costed missions of the J&amp;K Action Plan on Climate Change (SAPCC) against verified releases from the UT Budget, NAFCC, and NMHS across glaciated basins, springsheds, and horticulture.
            </p>
            <code className="block p-2 bg-slate-950 border border-white/10 text-[11px] font-mono text-cyan-300">
              NPV_adapt = Σ [ΔE(Damage_t) − C_adapt,t] / (1+r)^t
            </code>
          </Card>

          <Card className="space-y-3">
            <Badge variant="warning" size="sm">KEW-INV-0051 · Risk Economics</Badge>
            <h3 className="text-lg font-bold text-white">Ex-Ante DRR vs Ex-Post Relief Ratio</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Audits State/UT Disaster Mitigation Fund (SDMF), wetland flood-detention reconnection, and GLOF early-warning outlays against post-disaster SDRF/NDRF/PMDP/JTFRP reconstruction bills.
            </p>
            <code className="block p-2 bg-slate-950 border border-white/10 text-[11px] font-mono text-amber-300">
              EAD = ∫_0^1 D(p) dp;  Leverage = ΔEAD / C_DRR
            </code>
          </Card>

          <Card className="space-y-3">
            <Badge variant="success" size="sm">KEW-INV-0053 · Mountain Fiscal Peers</Badge>
            <h3 className="text-lg font-bold text-white">HP, Uttarakhand &amp; Alpine Normalization</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Normalizes comparisons by population, forest/cryosphere km², CPI inflation, GSDP, and J&amp;K&apos;s post-2019 UT Central Grants-in-Aid structure (₹58,218 cr FY27 BE) vs Article 280 state devolution.
            </p>
            <Link
              href="/environmental-investigations/precedents"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-1"
            >
              <span>Inspect Comparative Precedents</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        </div>
      )}

      {/* PILLAR 8: INSTITUTIONAL CAPACITY (23 AGENCIES + 11 PARAMETERS) */}
      {activePillar === 'institutional-capacity' && (
        <div className="space-y-6">
          <Card className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                11 Institutional &amp; Scientific Capacity Parameters Audited Across Agencies
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Disentangles pure budget shortages from specialist vacancies, non-accredited laboratories, idled equipment, and fragmented mandates
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {INSTITUTIONAL_CAPACITY_PARAMETERS.map((p) => (
                <div key={p.parameter} className="p-3.5 rounded-lg bg-slate-950/85 border border-white/10 space-y-1.5">
                  <div className="font-bold text-xs text-emerald-300">{p.parameter}</div>
                  <p className="text-xs text-slate-300 leading-snug">{p.requiredAssessment}</p>
                  <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                    Source: {p.verificationSource}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="none" className="overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                23-Institution Financial &amp; Environmental Audit Inventory
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Mandates and administrative structures are verified per fiscal period before attributing expenditure or outcome gaps
              </p>
            </div>
            <div className="responsive-table-container mb-0">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-white/10 text-slate-400 uppercase text-[10px]">
                    <th className="py-3 px-4">Institution</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Economic &amp; Environmental Audit Focus</th>
                    <th className="py-3 px-4">Mandate &amp; Data Extraction Status</th>
                    <th className="py-3 px-4">Linked Charters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ENVIRONMENTAL_INSTITUTIONS_23_AUDIT_INVENTORY.map((inst) => (
                    <tr key={inst.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{inst.institutionName}</div>
                        <div className="font-mono text-[10px] text-emerald-400">{inst.acronym}</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Badge variant="outline" size="sm">{inst.administrativeCategory}</Badge>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm leading-relaxed">
                        {inst.economicAndEnvironmentalAssessment}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs space-y-1">
                        <Badge
                          variant={inst.financialDataExtractionStatus.startsWith('CAG') ? 'info' : 'warning'}
                          size="sm"
                        >
                          {inst.financialDataExtractionStatus}
                        </Badge>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          {inst.mandateVerificationNote}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-300">
                        {inst.linkedInvestigationCodes.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
