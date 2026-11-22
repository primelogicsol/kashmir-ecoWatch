'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import {
  LITIGATION_COST_PHASES,
  FUNDING_SCHEMES_REGISTRY,
  CostPhase,
  FundingScheme
} from '@/data/environmental-litigation-support';
import {
  Coins,
  Calculator,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Building,
  DollarSign
} from 'lucide-react';

export function FundingCostsModule() {
  const [currency, setCurrency] = useState<'INR' | 'PKR'>('INR');
  const [selectedPhases, setSelectedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: false
  });

  const togglePhase = (num: number) => {
    setSelectedPhases((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  // Rough estimation range calculation based on selected phases
  const minCostINR = Object.entries(selectedPhases)
    .filter(([_, active]) => active)
    .reduce((acc, [phaseStr]) => {
      const p = LITIGATION_COST_PHASES.find((x) => x.phaseNumber === Number(phaseStr));
      if (!p) return acc;
      const minVal = parseInt(p.typicalCostRangeINR.replace(/[^0-9]/g, '').slice(0, 4) || '3000', 10);
      return acc + minVal;
    }, 0);

  const maxCostINR = Object.entries(selectedPhases)
    .filter(([_, active]) => active)
    .reduce((acc, [phaseStr]) => {
      const p = LITIGATION_COST_PHASES.find((x) => x.phaseNumber === Number(phaseStr));
      if (!p) return acc;
      const parts = p.typicalCostRangeINR.split('–');
      const maxVal = parseInt((parts[1] || '').replace(/[^0-9]/g, '') || '25000', 10);
      return acc + maxVal;
    }, 0);

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-[6px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Coins className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              PIL Funding, Litigation Costs &amp; Expense Budgeting
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Phase-based litigation cost modeling, transparent court fees, verified public funding schemes, and strict FCRA cross-border compliance safeguards.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setCurrency('INR')}
            className={`px-3 py-1 rounded-[6px] text-xs font-medium transition-colors ${
              currency === 'INR' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            INR (₹) · J&amp;K / Ladakh
          </button>
          <button
            onClick={() => setCurrency('PKR')}
            className={`px-3 py-1 rounded-[6px] text-xs font-medium transition-colors ${
              currency === 'PKR' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            PKR (Rs.) · AJK / GB
          </button>
        </div>
      </div>

      {/* FCRA & Cross-Border Compliance Warning Banner */}
      <div className="p-4 rounded-lg bg-slate-900 border border-rose-800/60 space-y-2">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-[6px] bg-rose-500/10 border border-rose-500/20 text-rose-400 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <h3 className="font-bold text-white text-sm">
              Strict Statutory Warning: Foreign Contribution (Regulation) Act (FCRA) &amp; Litigation Ethics
            </h3>
            <p className="text-slate-300 leading-relaxed max-w-4xl">
              Under India's <strong>FCRA 2010 and 2026 Rules</strong>, utilizing foreign funding to sponsor, finance, or initiate domestic litigation in Indian courts is strictly prohibited without specific prior statutory permission. Kashmir EcoWatch provides open scientific data and research only; it never transfers funds, accepts foreign sponsorship for PIL filings, or facilitates third-party champerty.
            </p>
          </div>
        </div>
      </div>

      {/* Phase-Based Litigation Budget Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive 8-Phase Selector */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-amber-400" />
              Phase-Based Case Budget Builder
            </h3>
            <span className="text-[11px] text-slate-500">Toggle phases to estimate case costs</span>
          </div>

          <div className="space-y-2.5">
            {LITIGATION_COST_PHASES.map((phase) => {
              const isSelected = !!selectedPhases[phase.phaseNumber];
              const costDisplay = currency === 'INR' ? phase.typicalCostRangeINR : phase.typicalCostRangePKR;

              return (
                <div
                  key={phase.phaseNumber}
                  onClick={() => togglePhase(phase.phaseNumber)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-amber-500/80 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800/70 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] border shrink-0 ${
                          isSelected
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}
                      >
                        PHASE {phase.phaseNumber}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                          {phase.phaseName}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{phase.statutoryFeeDetails}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-300 whitespace-nowrap">{costDisplay}</span>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500">Typical Expense Items:</span>
                        <ul className="mt-1 space-y-0.5 text-slate-300">
                          {phase.costItems.slice(0, 2).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 truncate">
                              <span className="w-1 h-1 rounded-full bg-amber-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-emerald-400">Support / Cost Reduction:</span>
                        <p className="mt-1 text-slate-300 leading-relaxed">{phase.mitigationAndSupport}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Cumulative Budget Summary Card */}
        <div className="lg:col-span-4">
          <Card className="p-5 bg-slate-900/90 border-slate-800 rounded-lg space-y-4 sticky top-32">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800">
              Estimated Litigation Budget
            </h3>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Estimated Range ({currency}):</span>
                <span className="text-lg font-mono font-bold text-amber-300">
                  {currency === 'INR' ? `₹${minCostINR.toLocaleString()} – ₹${maxCostINR.toLocaleString()}` : `PKR ${(minCostINR * 3).toLocaleString()} – PKR ${(maxCostINR * 3.2).toLocaleString()}`}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Estimate covers out-of-pocket expenses, certified water/soil laboratory testing, court fee stamps, and documentation.
              </p>
            </div>

            <div className="p-3 rounded-md bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold">
                Cost Reduction Pathways
              </span>
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Use NALSA / JKSLSA to eliminate advocate appearance fees entirely.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Utilize KEW Open Data Sentinel-2 imagery instead of commercial satellite licenses.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>Partner with University environmental clinics for pro bono research.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold text-white">Court Fee Disclosures:</span>
              <p className="mt-1">
                NGT application fee is ₹1,000 under Rule 12. High Court writ stamp is ₹250–₹500. Avoid commercial intermediaries claiming inflated official court fees.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Verified Funding Schemes Catalog */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Building className="w-4 h-4 text-emerald-400" />
          Verified Public Legal &amp; Research Funding Programs ({FUNDING_SCHEMES_REGISTRY.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FUNDING_SCHEMES_REGISTRY.map((fnd) => (
            <Card
              key={fnd.id}
              className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 border border-slate-800 text-amber-400">
                    {fnd.category} · {fnd.coverage}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Verified: {fnd.lastVerified}</span>
                </div>

                <h4 className="text-sm font-bold text-white">{fnd.name}</h4>
                <p className="text-[11px] text-slate-400">{fnd.provider}</p>

                <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-mono text-emerald-400">Permitted Support:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {fnd.eligibleExpenses.join(', ')}
                  </p>
                </div>

                <div className="text-xs text-rose-300 text-[11px] leading-relaxed">
                  <strong>Restrictions:</strong> {fnd.complianceWarning}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-amber-300">{fnd.maxGrantLimit}</span>
                <a
                  href={fnd.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Official Details</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
