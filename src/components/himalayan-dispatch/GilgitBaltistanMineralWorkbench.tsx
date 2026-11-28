'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowUpRight,
  Calculator,
  CheckCircle2,
  Compass,
  Mountain,
  Pickaxe,
  Scale,
} from 'lucide-react';
import {
  ECONOMIC_VS_LIABILITY_BALANCE_10,
  FIFTEEN_UNANSWERED_QUESTIONS_GB,
  GB_MINERAL_OCCURRENCES_14,
  GEMSTONE_VALUE_CHAIN_6,
  GEOLOGICAL_CONFIDENCE_TIERS_6,
  MINERAL_INTEGRITY_PROTOCOL_20,
  OCCUPATIONAL_MINING_HAZARDS_10,
  PLACER_GOLD_RIVER_DISTURBANCES_8,
  PROPOSED_FIVE_REGION_BUREAU_CHARTER,
  PROTECTED_AREAS_AND_WILDLIFE_10,
  REGULATORY_ACCOUNTABILITY_CHAIN_12,
  WATER_POLLUTION_CONTAMINANTS_10,
  WEALTH_BENEATH_MOUNTAINS_SPEC,
} from '@/data/himalayan-dispatch-wealth-beneath-mountains-monograph';

type TabId = 'economics-royalty' | 'minerals-cadastre' | 'rivers-hazards' | 'questions-protocol';

export function GilgitBaltistanMineralWorkbench({
  variant = 'editorial',
}: {
  variant?: 'editorial' | 'observatory';
}) {
  const isObs = variant === 'observatory';
  const [activeTab, setActiveTab] = useState<TabId>('economics-royalty');

  // Part XV: Illustrative Mineral Extraction Value-Retention & Community Royalty Calculator
  const [annualSalesCrPkr, setAnnualSalesCrPkr] = useState<number>(100); // Default PKR 100 crore
  const [localRetentionPct, setLocalRetentionPct] = useState<number>(15); // Default 15%
  const [uncompensatedCostsCrPkr, setUncompensatedCostsCrPkr] = useState<number>(10); // Default PKR 10 crore
  const [govtRoyaltyBasePkr, setGovtRoyaltyBasePkr] = useState<number>(100); // Default PKR 100 unit comparison

  const [mineralFilter, setMineralFilter] = useState<string>('ALL');

  const econCalc = useMemo(() => {
    const retainedLocallyCr = (annualSalesCrPkr * localRetentionPct) / 100;
    const notRetainedLocallyCr = annualSalesCrPkr - retainedLocallyCr;
    const netLocalBenefitCr = retainedLocallyCr - uncompensatedCostsCrPkr;

    const earlierCommunityPkr = govtRoyaltyBasePkr * 2.0; // 2x government royalty
    const amended2024CommunityPkr = govtRoyaltyBasePkr * 0.3; // 30% of government royalty
    const reductionPct =
      earlierCommunityPkr > 0
        ? ((earlierCommunityPkr - amended2024CommunityPkr) / earlierCommunityPkr) * 100
        : 0;

    return {
      retainedLocallyCr,
      notRetainedLocallyCr,
      netLocalBenefitCr,
      earlierCommunityPkr,
      amended2024CommunityPkr,
      reductionPct,
    };
  }, [annualSalesCrPkr, localRetentionPct, uncompensatedCostsCrPkr, govtRoyaltyBasePkr]);

  const filteredMinerals = useMemo(() => {
    if (mineralFilter === 'ALL') return GB_MINERAL_OCCURRENCES_14;
    return GB_MINERAL_OCCURRENCES_14.filter((m) => m.category === mineralFilter);
  }, [mineralFilter]);

  const containerCls = isObs
    ? 'rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-100 p-6 sm:p-8 space-y-6'
    : 'my-10 border p-6 sm:p-8 space-y-6';

  const containerStyle = isObs
    ? undefined
    : {
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
        color: 'var(--hd-fg)',
      };

  const tabs: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'economics-royalty', label: '01 · Value Retention & Royalty Lab', icon: Calculator },
    { id: 'minerals-cadastre', label: '02 · 14 Minerals & 590-Row Portal', icon: Pickaxe },
    { id: 'rivers-hazards', label: '03 · Placer Scour, AMD & Wildlife', icon: Mountain },
    { id: 'questions-protocol', label: '04 · 15 Questions & 20-Gate Protocol', icon: Scale },
  ];

  return (
    <section
      aria-label="Gilgit-Baltistan Mineral Extraction & Accountability Workbench"
      className={containerCls}
      style={containerStyle}
    >
      {/* Header */}
      <div
        className={`pb-5 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${
          isObs ? 'border-slate-800' : ''
        }`}
        style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="space-y-1.5">
          <p
            className={
              isObs
                ? 'text-[11px] font-mono font-bold uppercase tracking-widest text-teal-400'
                : 'hd-kicker'
            }
          >
            INTERACTIVE GEOLOGICAL, EXTRACTIVE ECONOMICS &amp; GOVERNANCE WORKBENCH · MONOGRAPH 16
          </p>
          <h3
            className={
              isObs
                ? 'text-2xl sm:text-3xl font-bold text-white'
                : 'hd-font-display text-2xl sm:text-3xl font-semibold'
            }
          >
            Gilgit-Baltistan Mineral Ownership, Royalty &amp; Environmental Risk Explorer
          </h3>
          <p
            className={
              isObs
                ? 'text-xs sm:text-sm text-slate-300 max-w-3xl'
                : 'hd-font-body text-xs sm:text-sm opacity-80 max-w-3xl'
            }
          >
            Compiled by {WEALTH_BENEATH_MOUNTAINS_SPEC.bylineDisplay} — separating geological
            occurrences from mineable reserves, modelling local value retention and the 2024 royalty
            amendment, and screening river/wildlife hazards.
          </p>
        </div>

        <Link
          href={
            isObs
              ? '/himalayan-dispatch/issues/monograph-16-the-wealth-beneath-the-mountains'
              : '/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory'
          }
          className={
            isObs
              ? 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shrink-0'
              : 'hd-kicker inline-flex items-center gap-1.5 underline shrink-0'
          }
        >
          <span>{isObs ? 'Open 108-Chapter Monograph 16' : 'Open KEW 18-Registry Observatory'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-left text-xs font-semibold transition-all border ${
                isObs
                  ? active
                    ? 'rounded-lg bg-teal-500/20 border-teal-500/50 text-teal-300'
                    : 'rounded-lg bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  : active
                  ? 'bg-[#171717] text-[#F2EFE7] border-[#171717]'
                  : 'border-current/20 opacity-75 hover:opacity-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VALUE RETENTION & COMMUNITY ROYALTY CALCULATOR */}
      {activeTab === 'economics-royalty' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Value-Retention Calculator (Part XV) */}
            <div
              className={`lg:col-span-7 p-5 border space-y-4 ${
                isObs ? 'rounded-xl border-slate-800 bg-slate-950/60' : ''
              }`}
              style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
            >
              <p className={isObs ? 'text-xs font-mono font-bold uppercase text-teal-400' : 'hd-kicker'}>
                PART XV · ILLUSTRATIVE REGIONAL VALUE-RETENTION MODEL (NOT ACTUAL REVENUE)
              </p>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Illustrative Annual Mineral Sales</span>
                  <span>PKR {annualSalesCrPkr} crore</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={500}
                  step={10}
                  value={annualSalesCrPkr}
                  onChange={(e) => setAnnualSalesCrPkr(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </label>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Share of Economic Value Retained Locally</span>
                  <span>{localRetentionPct}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={65}
                  step={1}
                  value={localRetentionPct}
                  onChange={(e) => setLocalRetentionPct(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </label>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Estimated Uncompensated Local Environmental &amp; Social Costs</span>
                  <span>PKR {uncompensatedCostsCrPkr} crore</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={2}
                  value={uncompensatedCostsCrPkr}
                  onChange={(e) => setUncompensatedCostsCrPkr(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">
                    Value Retained Locally
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    PKR {econCalc.retainedLocallyCr.toFixed(1)} Cr
                  </div>
                </div>
                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">
                    Value Not Retained Locally
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    PKR {econCalc.notRetainedLocallyCr.toFixed(1)} Cr
                  </div>
                </div>
                <div className="p-3 border border-current/25 space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">
                    Net Local Benefit (After Costs)
                  </div>
                  <div
                    className={`text-2xl font-bold tabular-nums ${
                      econCalc.netLocalBenefitCr < 0 ? 'text-rose-500' : ''
                    }`}
                  >
                    PKR {econCalc.netLocalBenefitCr.toFixed(1)} Cr
                  </div>
                </div>
              </div>

              <p className="text-[11px] italic opacity-75">
                Simplified illustrative model: value not retained locally includes production inputs
                and external commercial stages, not solely corporate profit. Actual accounting
                requires audited company accounts, wages, royalties, and reclamation expenditure.
              </p>
            </div>

            {/* Community Royalty Comparison (Part XI) */}
            <div
              className={`lg:col-span-5 p-5 border space-y-4 ${
                isObs ? 'rounded-xl border-slate-800 bg-slate-950/60' : ''
              }`}
              style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
            >
              <p className={isObs ? 'text-xs font-mono font-bold uppercase text-amber-400' : 'hd-kicker'}>
                PART XI · COMMUNITY ROYALTY FORMULA COMPARISON
              </p>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Government Royalty Reference Base</span>
                  <span>PKR {govtRoyaltyBasePkr.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={govtRoyaltyBasePkr}
                  onChange={(e) => setGovtRoyaltyBasePkr(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase opacity-70">Earlier Formula (2× Royalty)</div>
                  <div className="text-xl font-bold tabular-nums">
                    PKR {econCalc.earlierCommunityPkr.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase opacity-70">2024 Amended (30% of Royalty)</div>
                  <div className="text-xl font-bold tabular-nums">
                    PKR {econCalc.amended2024CommunityPkr.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-3.5 border-l-4 border-amber-500 text-xs space-y-1">
                <div className="text-lg font-bold">
                  {econCalc.reductionPct.toFixed(0)}% Illustrative Formula Reduction
                </div>
                <p className="opacity-80 leading-relaxed">
                  Indexed text of consolidated GB Mining Concession Rules (lpd.gbit.gov.pk) records a
                  2024 shift from 2× government royalty to 30%. Original gazetted pages, lease
                  categories, and transitional clauses require visual authentication before
                  representing actual community income change.
                </p>
              </div>
            </div>
          </div>

          {/* 6-Stage Value Chain + Twin Balance Sheets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-current/15 text-xs">
            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                6-Stage Rough-to-Luxury Gemstone Value Chain
              </p>
              {GEMSTONE_VALUE_CHAIN_6.map(([st, desc]) => (
                <p key={st} className="opacity-85">
                  <strong>{st}:</strong> {desc}
                </p>
              ))}
            </div>
            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                Twin Benefit vs. Environmental Liability Pairs (Selected)
              </p>
              {ECONOMIC_VS_LIABILITY_BALANCE_10.slice(0, 6).map(([pair, note]) => (
                <p key={pair} className="opacity-85">
                  <strong>{pair}:</strong> {note}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 14 MINERAL OCCURRENCES, 6 CRIRSCO TIERS & 590-ROW PORTAL AUDIT */}
      {activeTab === 'minerals-cadastre' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All 14 Mineral Groups' },
              { id: 'GEMSTONE', label: 'Gemstones (5)' },
              { id: 'PRECIOUS_METAL', label: 'Precious Metals (1)' },
              { id: 'BASE_STRATEGIC_METAL', label: 'Base & Alloy Metals (3)' },
              { id: 'CRITICAL_INDUSTRIAL', label: 'Critical & Industrial (5)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setMineralFilter(f.id)}
                className={`px-3 py-1 text-xs font-semibold border ${
                  mineralFilter === f.id
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'border-current/25 opacity-75 hover:opacity-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {filteredMinerals.map((m) => (
              <div
                key={m.mineral}
                className={`p-3.5 border space-y-1 ${
                  isObs ? 'rounded-lg border-slate-800 bg-slate-950/60' : ''
                }`}
                style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
              >
                <div className="font-bold text-sm">{m.mineral}</div>
                <div className="opacity-90">
                  <strong>Occurrences:</strong> {m.reportedOccurrences}
                </div>
                <div className="opacity-75 italic">{m.classificationNote}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-current/15 text-xs">
            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                6 Geological Classification Tiers (Occurrence ≠ Reserve)
              </p>
              {GEOLOGICAL_CONFIDENCE_TIERS_6.map(([tier, def]) => (
                <p key={tier} className="opacity-85">
                  <strong>{tier}:</strong> {def}
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider">
                7 Unverified Regional Quantities Quarantined Pending Primary Proof
              </p>
              {WEALTH_BENEATH_MOUNTAINS_SPEC.unverifiedQuantities7.map((item) => (
                <div key={item} className="flex items-start gap-2 opacity-85">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PLACER SCOUR, PYRITE AMD, PROTECTED AREAS & MINER SAFETY */}
      {activeTab === 'rivers-hazards' && (
        <div className="space-y-5 text-xs">
          <div className="p-3.5 border border-current/20 space-y-1">
            <span className="font-mono font-bold uppercase">
              Acid Mine Drainage (Pyrite Oxidation Reaction):
            </span>{' '}
            <code className="font-mono text-sm font-bold">
              {WEALTH_BENEATH_MOUNTAINS_SPEC.acidMineDrainageReaction}
            </code>
            <p className="opacity-80">
              Paired upstream/downstream water &amp; sediment assays are mandatory before attributing
              heavy metals or acidity to mining; mercury or cyanide use is never alleged without
              site-specific proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                8 Placer Gold River Disturbances (Aug 2026 Warning)
              </p>
              {PLACER_GOLD_RIVER_DISTURBANCES_8.map(([k, v]) => (
                <div key={k} className="p-2.5 border border-current/15">
                  <div className="font-bold">{k}</div>
                  <div className="opacity-80">{v}</div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                10 Water Contaminants to Screen
              </p>
              {WATER_POLLUTION_CONTAMINANTS_10.slice(0, 8).map(([k, v]) => (
                <div key={k} className="p-2.5 border border-current/15">
                  <div className="font-bold">{k}</div>
                  <div className="opacity-80">{v}</div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                Protected Species &amp; Park Buffers (CKNP · Deosai · Khunjerab)
              </p>
              {PROTECTED_AREAS_AND_WILDLIFE_10.slice(0, 8).map(([k, v]) => (
                <div key={k} className="p-2.5 border border-current/15">
                  <div className="font-bold">{k}</div>
                  <div className="opacity-80">{v}</div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                10 Underground Miner Safety Hazards
              </p>
              {OCCUPATIONAL_MINING_HAZARDS_10.slice(0, 8).map(([k, v]) => (
                <div key={k} className="p-2.5 border border-current/15">
                  <div className="font-bold">{k}</div>
                  <div className="opacity-80">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 15 QUESTIONS, 20-GATE PROTOCOL & FIVE-REGION BUREAU CHARTER */}
      {activeTab === 'questions-protocol' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider">
                15 Questions Gilgit-Baltistan Deserves Answered
              </p>
              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {FIFTEEN_UNANSWERED_QUESTIONS_GB.map(([num, q]) => (
                  <div key={num} className="p-2.5 border border-current/15">
                    <strong>{num}.</strong> {q}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider">
                20-Gate Mineral Extraction Integrity Protocol
              </p>
              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {MINERAL_INTEGRITY_PROTOCOL_20.map(([gate, req]) => (
                  <div key={gate} className="p-2.5 border border-current/15 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-500" />
                    <div>
                      <div className="font-bold">{gate}</div>
                      <div className="opacity-80">{req}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider">
                12 Accountable Institutions
              </p>
              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {REGULATORY_ACCOUNTABILITY_CHAIN_12.map(([inst, q]) => (
                  <div key={inst} className="p-2.5 border border-current/15">
                    <div className="font-bold">{inst}</div>
                    <div className="opacity-80">{q}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Five-Region Bureau & Correspondent Ownership Charter */}
          <div className="pt-4 border-t border-current/15 space-y-2.5">
            <p className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>
                Five-Region Bureau &amp; Progressive Correspondent Ownership Standard
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {PROPOSED_FIVE_REGION_BUREAU_CHARTER.map((b) => (
                <div key={b.bureau} className="p-3 border border-current/20 space-y-1">
                  <div className="font-bold">{b.bureau}</div>
                  <div className="text-[11px] opacity-80">{b.principalCoverage}</div>
                  <div className="text-[10px] font-mono opacity-70 pt-1">
                    Interim: {b.interimAttributionUntilAppointed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
