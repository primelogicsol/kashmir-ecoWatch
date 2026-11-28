'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Filter,
  Gavel,
  Layers,
  Scale,
  Search,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import {
  AJK_LEGISLATION_12,
  DOCUMENTED_IMPLEMENTATION_FAILURES,
  ENFORCEMENT_VS_LEGISLATIVE_FAILURE_15,
  FOUR_LEGAL_FRAMEWORKS_5_REGIONS,
  GB_LEGISLATION_12,
  INTERNATIONAL_LEGAL_COMPARISON_16,
  JKL_FUNDAMENTAL_ACTS_18,
  PROPOSED_REFORM_PACKAGES_15,
  REGIONAL_LAND_WATER_LAWS_15,
  RETAIN_RESET_REPLACE_MATRIX_15,
  STATUTORY_AGE_TABLE_18,
  SUBORDINATE_RULES_22,
  TMDL_LAKE_ADAPTATION_MODEL,
  type ReformTriageCategory,
  type StatutoryInstrumentRecord,
} from '@/data/himalayan-dispatch-environmental-law-monograph';

type WorkbenchTab = 'statutes' | 'triage' | 'reforms' | 'tmdl';

type LakePresetId = 'dal' | 'nigeen' | 'anchar';

const LAKE_TMDL_PRESETS: Record<
  LakePresetId,
  {
    name: string;
    currentEstimatedInflowTpTonnesYr: number;
    assimilativeCeilingTpTonnesYr: number;
    defaultStpRemovalPct: number;
    defaultSewerInterceptionPct: number;
    defaultCatchmentAbatementPct: number;
    defaultMarginOfSafetyPct: number;
    contextNote: string;
  }
> = {
  dal: {
    name: 'Dal Lake (Srinagar)',
    currentEstimatedInflowTpTonnesYr: 73.0,
    assimilativeCeilingTpTonnesYr: 18.0,
    defaultStpRemovalPct: 34,
    defaultSewerInterceptionPct: 62,
    defaultCatchmentAbatementPct: 18,
    defaultMarginOfSafetyPct: 15,
    contextNote:
      'Anchored to Dispatch 04 engineering synthesis (~55 t P/yr net accumulation under incomplete interception and conventional secondary STP phosphorus removal). Illustrative regulatory allocation model.',
  },
  nigeen: {
    name: 'Nigeen Lake',
    currentEstimatedInflowTpTonnesYr: 11.4,
    assimilativeCeilingTpTonnesYr: 3.6,
    defaultStpRemovalPct: 35,
    defaultSewerInterceptionPct: 68,
    defaultCatchmentAbatementPct: 20,
    defaultMarginOfSafetyPct: 15,
    contextNote:
      'Illustrative nutrient-budget planning scenario reflecting peripheral urban/houseboat loading and restricted hydraulic exchange.',
  },
  anchar: {
    name: 'Anchar Lake',
    currentEstimatedInflowTpTonnesYr: 29.5,
    assimilativeCeilingTpTonnesYr: 6.5,
    defaultStpRemovalPct: 22,
    defaultSewerInterceptionPct: 38,
    defaultCatchmentAbatementPct: 12,
    defaultMarginOfSafetyPct: 20,
    contextNote:
      'Illustrative Impaired-Waterbody Critical Recovery scenario reflecting heavy urban/Sindh-link inflow and shallow marsh siltation.',
  },
};

export function EnvironmentalLawAccountabilityWorkbench({
  variant = 'editorial',
}: {
  variant?: 'editorial' | 'observatory';
}) {
  const isDark = variant === 'observatory';
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('statutes');

  // Tab 1 state
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('ALL');
  const [statuteQuery, setStatuteQuery] = useState<string>('');

  // Tab 2 state
  const [triageFilter, setTriageFilter] = useState<'ALL' | ReformTriageCategory>('ALL');

  // Tab 3 state
  const [selectedPackageSlug, setSelectedPackageSlug] = useState<string>(
    PROPOSED_REFORM_PACKAGES_15[1]?.slug || PROPOSED_REFORM_PACKAGES_15[0]!.slug
  );

  // Tab 4 state (Lake TMDL Simulator)
  const [selectedLake, setSelectedLake] = useState<LakePresetId>('dal');
  const [stpRemovalPct, setStpRemovalPct] = useState<number>(34);
  const [sewerInterceptionPct, setSewerInterceptionPct] = useState<number>(62);
  const [catchmentAbatementPct, setCatchmentAbatementPct] = useState<number>(18);
  const [marginOfSafetyPct, setMarginOfSafetyPct] = useState<number>(15);

  const handleLakePresetChange = (id: LakePresetId) => {
    const p = LAKE_TMDL_PRESETS[id];
    setSelectedLake(id);
    setStpRemovalPct(p.defaultStpRemovalPct);
    setSewerInterceptionPct(p.defaultSewerInterceptionPct);
    setCatchmentAbatementPct(p.defaultCatchmentAbatementPct);
    setMarginOfSafetyPct(p.defaultMarginOfSafetyPct);
  };

  const allStatutes: StatutoryInstrumentRecord[] = useMemo(
    () => [
      ...JKL_FUNDAMENTAL_ACTS_18,
      ...SUBORDINATE_RULES_22,
      ...REGIONAL_LAND_WATER_LAWS_15,
      ...AJK_LEGISLATION_12,
      ...GB_LEGISLATION_12,
    ],
    []
  );

  const filteredStatutes = useMemo(() => {
    return allStatutes.filter((item) => {
      if (jurisdictionFilter !== 'ALL' && item.jurisdictionGroup !== jurisdictionFilter) {
        return false;
      }
      if (statuteQuery.trim()) {
        const q = statuteQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.originalIntention.toLowerCase().includes(q) ||
          item.jurisdictionGroup.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allStatutes, jurisdictionFilter, statuteQuery]);

  const filteredTriageRows = useMemo(() => {
    if (triageFilter === 'ALL') return ENFORCEMENT_VS_LEGISLATIVE_FAILURE_15;
    return ENFORCEMENT_VS_LEGISLATIVE_FAILURE_15.filter(
      (r) => r.triageCategory === triageFilter
    );
  }, [triageFilter]);

  const activePackage = useMemo(
    () =>
      PROPOSED_REFORM_PACKAGES_15.find((p) => p.slug === selectedPackageSlug) ||
      PROPOSED_REFORM_PACKAGES_15[0]!,
    [selectedPackageSlug]
  );

  const tmdlCalc = useMemo(() => {
    const preset = LAKE_TMDL_PRESETS[selectedLake];
    const pointShare = preset.currentEstimatedInflowTpTonnesYr * 0.68;
    const nonPointShare = preset.currentEstimatedInflowTpTonnesYr * 0.32;

    const interceptedFraction = sewerInterceptionPct / 100;
    const untreatedPointBypass = pointShare * (1 - interceptedFraction);
    const treatedPointResidual =
      pointShare * interceptedFraction * (1 - stpRemovalPct / 100);
    const nonPointResidual = nonPointShare * (1 - catchmentAbatementPct / 100);

    const projectedLoadTonnesYr =
      untreatedPointBypass + treatedPointResidual + nonPointResidual;
    const allowableLoadAfterMos =
      preset.assimilativeCeilingTpTonnesYr * (1 - marginOfSafetyPct / 100);
    const mosReserve = preset.assimilativeCeilingTpTonnesYr - allowableLoadAfterMos;
    const netExceedance = projectedLoadTonnesYr - allowableLoadAfterMos;

    return {
      preset,
      projectedLoadTonnesYr,
      allowableLoadAfterMos,
      mosReserve,
      netExceedance,
      isCompliant: netExceedance <= 0,
    };
  }, [
    selectedLake,
    stpRemovalPct,
    sewerInterceptionPct,
    catchmentAbatementPct,
    marginOfSafetyPct,
  ]);

  const shellClass = isDark
    ? 'rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-100 p-6 sm:p-8 space-y-6'
    : 'my-10 border p-6 sm:p-8 space-y-6';

  const shellStyle = isDark
    ? undefined
    : {
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
        color: 'var(--hd-fg)',
      };

  const tabBtnClass = (active: boolean) => {
    if (isDark) {
      return active
        ? 'px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white border border-emerald-500 transition-colors cursor-pointer'
        : 'px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-600 transition-colors cursor-pointer';
    }
    return active
      ? 'px-3.5 py-2 text-[11px] hd-font-sans font-semibold tracking-[0.14em] uppercase border bg-[#8C3125] text-[#F2EFE7] border-[#8C3125] cursor-pointer'
      : 'px-3.5 py-2 text-[11px] hd-font-sans font-medium tracking-[0.14em] uppercase border hover:opacity-80 cursor-pointer';
  };

  return (
    <section
      id="legal-accountability-workbench"
      aria-label="Western Himalayan Legal & Regulatory Accountability Workbench"
      className={shellClass}
      style={shellStyle}
    >
      {/* Header */}
      <div
        className={`flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b ${
          isDark ? 'border-slate-800' : ''
        }`}
        style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Scale
              className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-[#8C3125]'}`}
            />
            <span
              className={
                isDark
                  ? 'text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400'
                  : 'hd-kicker'
              }
            >
              INTERACTIVE LEGAL &amp; SCIENTIFIC WORKBENCH · 5 REGIONS · 4 FRAMEWORKS · 79 INDEXED INSTRUMENTS
            </span>
          </div>
          <h3
            className={
              isDark
                ? 'text-2xl sm:text-3xl font-bold text-white'
                : 'hd-font-display text-2xl sm:text-3xl font-semibold'
            }
          >
            Statutory Registry, Enforcement Triage, 15 Reform Packages &amp; Lake TMDL Simulator
          </h3>
          <p
            className={
              isDark
                ? 'text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed'
                : 'hd-font-body text-xs sm:text-sm leading-relaxed max-w-4xl opacity-85'
            }
          >
            Distinguishes enacted statutory authority across Kashmir, Jammu, Ladakh, Azad Jammu &amp;
            Kashmir, and Gilgit-Baltistan from pure enforcement failures and proposed model
            legislative reforms.
          </p>
        </div>

        <Link
          href={
            isDark
              ? '/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist'
              : '/governance/legislation-enforcement-observatory'
          }
          className={
            isDark
              ? 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-semibold shrink-0 hover:bg-emerald-500/20'
              : 'hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[10px] font-semibold tracking-[0.16em] uppercase shrink-0'
          }
          style={
            isDark
              ? undefined
              : { borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }
          }
        >
          <span>
            {isDark
              ? 'Open 20-Volume Monograph 07'
              : 'Open KEW Legal Observatory (16 Registries)'}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('statutes')}
          className={tabBtnClass(activeTab === 'statutes')}
          style={
            !isDark && activeTab !== 'statutes'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          1. Five-Region Statutory &amp; Age Explorer ({allStatutes.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('triage')}
          className={tabBtnClass(activeTab === 'triage')}
          style={
            !isDark && activeTab !== 'triage'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          2. Enforcement vs. Legislative Triage (15 + 15)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reforms')}
          className={tabBtnClass(activeTab === 'reforms')}
          style={
            !isDark && activeTab !== 'reforms'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          3. 15 Proposed Reform Packages (Model Frameworks)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tmdl')}
          className={tabBtnClass(activeTab === 'tmdl')}
          style={
            !isDark && activeTab !== 'tmdl'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          4. Lake TMDL Load Simulator &amp; Audit Gaps
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 1: STATUTORY & AGE EXPLORER
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'statutes' && (
        <div className="space-y-6">
          {/* 4 Frameworks across 5 Regions Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {FOUR_LEGAL_FRAMEWORKS_5_REGIONS.map((reg) => (
              <div
                key={reg.region}
                className={
                  isDark
                    ? 'p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-1.5'
                    : 'p-3.5 border space-y-1.5'
                }
                style={
                  isDark
                    ? undefined
                    : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-75">
                    {reg.frameworkCode}
                  </span>
                </div>
                <h4 className="font-semibold text-sm">{reg.region}</h4>
                <p className="text-xs leading-relaxed opacity-85">
                  {reg.principalLegalFramework}
                </p>
              </div>
            ))}
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'ALL', label: `All (${allStatutes.length})` },
                {
                  id: 'J&K & Ladakh Central',
                  label: `J&K/Ladakh Central (${JKL_FUNDAMENTAL_ACTS_18.length})`,
                },
                {
                  id: 'J&K & Ladakh Subordinate',
                  label: `Subordinate Rules (${SUBORDINATE_RULES_22.length})`,
                },
                {
                  id: 'J&K & Ladakh Regional',
                  label: `Regional Land/Water (${REGIONAL_LAND_WATER_LAWS_15.length})`,
                },
                {
                  id: 'Azad Jammu & Kashmir',
                  label: `AJ&K (${AJK_LEGISLATION_12.length})`,
                },
                {
                  id: 'Gilgit-Baltistan',
                  label: `Gilgit-Baltistan (${GB_LEGISLATION_12.length})`,
                },
              ].map((chip) => {
                const active = jurisdictionFilter === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setJurisdictionFilter(chip.id)}
                    className={`px-2.5 py-1 text-[11px] font-medium border transition-colors cursor-pointer ${
                      isDark
                        ? active
                          ? 'rounded bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'rounded bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        : active
                          ? 'border-[#8C3125] text-[#8C3125] font-semibold'
                          : 'opacity-75 hover:opacity-100'
                    }`}
                    style={
                      !isDark && !active
                        ? { borderColor: 'var(--hd-rule)' }
                        : undefined
                    }
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[230px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={statuteQuery}
                onChange={(e) => setStatuteQuery(e.target.value)}
                placeholder="Search statute, 2026 SWM rules, karewa..."
                className={`w-full pl-8 pr-3 py-1.5 text-xs border outline-none ${
                  isDark
                    ? 'rounded-lg bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500'
                    : 'bg-transparent'
                }`}
                style={
                  isDark ? undefined : { borderColor: 'var(--hd-rule-strong)' }
                }
              />
            </div>
          </div>

          {/* Statutes Scrollable Table */}
          <div
            className={`max-h-[380px] overflow-y-auto border ${
              isDark ? 'rounded-xl border-slate-800' : ''
            }`}
            style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={
                    isDark
                      ? 'bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]'
                      : 'border-b uppercase text-[10px] tracking-wider'
                  }
                  style={
                    isDark
                      ? undefined
                      : {
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                        }
                  }
                >
                  <th className="py-2.5 px-3">Jurisdiction</th>
                  <th className="py-2.5 px-3">Enacted Legislation / Regulation</th>
                  <th className="py-2.5 px-3">Original Legislative Intention</th>
                  <th className="py-2.5 px-3">Census Status</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDark ? 'divide-slate-800/70' : ''}`}
                style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
              >
                {filteredStatutes.map((st, idx) => (
                  <tr key={`${st.jurisdictionGroup}-${st.no}-${idx}`}>
                    <td className="py-2.5 px-3 font-mono text-[11px] whitespace-nowrap opacity-80 align-top">
                      {st.jurisdictionGroup}
                    </td>
                    <td className="py-2.5 px-3 font-semibold align-top">
                      {st.title}
                    </td>
                    <td className="py-2.5 px-3 opacity-85 align-top leading-relaxed">
                      {st.originalIntention}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] align-top">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] border ${
                          st.verificationStatus.includes('Dual')
                            ? isDark
                              ? 'rounded border-amber-500/40 text-amber-300 bg-amber-950/30'
                              : 'border-[#8C3125] text-[#8C3125]'
                            : isDark
                              ? 'rounded border-slate-700 text-slate-300'
                              : 'opacity-80'
                        }`}
                        style={
                          !isDark && !st.verificationStatus.includes('Dual')
                            ? { borderColor: 'var(--hd-rule)' }
                            : undefined
                        }
                      >
                        {st.verificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 18-Row Statutory Age Benchmark Strip */}
          <div className="space-y-2 pt-2">
            <p
              className={
                isDark
                  ? 'text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold'
                  : 'hd-kicker'
              }
            >
              STATUTORY AGE BENCHMARK IN 2026 (18 PRINCIPAL INSTRUMENTS · ENACTMENT DATE ≠ UNAMENDED, BUT PRE-GEOAI / eDNA ORIGINS)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {STATUTORY_AGE_TABLE_18.slice(0, 6).concat(
                STATUTORY_AGE_TABLE_18.slice(11, 18).slice(0, 6)
              ).map((ag) => (
                <div
                  key={ag.legislation}
                  className={
                    isDark
                      ? 'p-3 rounded-lg border border-slate-800 bg-slate-950/70 space-y-1'
                      : 'p-3 border space-y-1'
                  }
                  style={
                    isDark
                      ? undefined
                      : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
                  }
                >
                  <div className="text-lg font-bold tabular-nums">
                    {ag.ageIn2026Years} yrs
                  </div>
                  <div className="text-[11px] font-semibold leading-snug">
                    {ag.legislation}
                  </div>
                  <div className="text-[10px] opacity-70">
                    Enacted {ag.originalEnactment} · {ag.jurisdiction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 2: ENFORCEMENT FAILURE VS. LEGISLATIVE FAILURE TRIAGE
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'triage' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'ALL' as const, label: 'All 15 Environmental Problems' },
                {
                  id: 'ENFORCEMENT_AND_FUNDING' as const,
                  label: 'Enforce & Fund Existing Law (5)',
                },
                {
                  id: 'TARGETED_AMENDMENT' as const,
                  label: 'Targeted Statutory Amendment (4)',
                },
                {
                  id: 'NEW_ECOSYSTEM_LAW' as const,
                  label: 'New Ecosystem Legislation Needed (6)',
                },
              ].map((f) => {
                const active = triageFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTriageFilter(f.id)}
                    className={`px-3 py-1.5 text-xs font-medium border cursor-pointer ${
                      isDark
                        ? active
                          ? 'rounded-lg bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'rounded-lg bg-slate-950 border-slate-800 text-slate-300'
                        : active
                          ? 'border-[#8C3125] text-[#8C3125] font-semibold'
                          : 'opacity-80'
                    }`}
                    style={
                      !isDark && !active
                        ? { borderColor: 'var(--hd-rule)' }
                        : undefined
                    }
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={
                    isDark
                      ? 'border-b border-slate-800 bg-slate-950 text-slate-400 uppercase font-mono text-[10px]'
                      : 'border-b uppercase text-[10px] tracking-wider'
                  }
                  style={
                    isDark ? undefined : { borderColor: 'var(--hd-rule-strong)' }
                  }
                >
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Environmental Problem</th>
                  <th className="py-2.5 px-3">Existing Legal Protection</th>
                  <th className="py-2.5 px-3">Recommended Legal / Institutional Approach</th>
                  <th className="py-2.5 px-3">Diagnostic Class</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDark ? 'divide-slate-800/70' : ''}`}
                style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
              >
                {filteredTriageRows.map((row) => (
                  <tr key={row.no}>
                    <td className="py-2.5 px-3 font-mono opacity-70">{row.no}</td>
                    <td className="py-2.5 px-3 font-semibold">
                      {row.environmentalProblem}
                    </td>
                    <td className="py-2.5 px-3 opacity-85">
                      {row.existingLegalProtection}
                    </td>
                    <td className="py-2.5 px-3 leading-relaxed">
                      {row.recommendedApproach}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold border ${
                          row.triageCategory === 'ENFORCEMENT_AND_FUNDING'
                            ? isDark
                              ? 'rounded bg-sky-500/15 border-sky-500/40 text-sky-300'
                              : 'border-sky-700/50 text-sky-800'
                            : row.triageCategory === 'TARGETED_AMENDMENT'
                              ? isDark
                                ? 'rounded bg-amber-500/15 border-amber-500/40 text-amber-300'
                                : 'border-amber-700/50 text-amber-800'
                              : isDark
                                ? 'rounded bg-rose-500/15 border-rose-500/40 text-rose-300'
                                : 'border-[#8C3125] text-[#8C3125]'
                        }`}
                      >
                        {row.triageCategory === 'ENFORCEMENT_AND_FUNDING'
                          ? 'Enforce & Fund'
                          : row.triageCategory === 'TARGETED_AMENDMENT'
                            ? 'Amend Rules/Act'
                            : 'New Law Needed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Retain / Reset / Supplement Summary */}
          <div
            className={`p-4 border space-y-3 ${
              isDark ? 'rounded-xl border-slate-800 bg-slate-950/70' : ''
            }`}
            style={
              isDark
                ? undefined
                : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
            }
          >
            <p className="text-xs font-semibold uppercase tracking-wider">
              Part IX Conclusion — Retain, Reset or Supplement (15 Existing Frameworks — Wholesale Replacement Rejected)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {RETAIN_RESET_REPLACE_MATRIX_15.slice(0, 9).map((m) => (
                <div
                  key={m.existingLegalFramework}
                  className="p-2.5 border opacity-90 space-y-1"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="font-semibold">{m.existingLegalFramework}</div>
                  <div className="opacity-80 text-[11px]">{m.proposedAction}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 3: 15 PROPOSED REFORM PACKAGES (SECTIONS 17–31)
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'reforms' && (
        <div className="space-y-5">
          <div
            className={`p-3.5 border text-xs flex items-start gap-2.5 ${
              isDark
                ? 'rounded-xl border-amber-500/35 bg-amber-950/25 text-amber-100'
                : 'border-[#8C3125]/40'
            }`}
            style={isDark ? undefined : { backgroundColor: 'var(--hd-bg)' }}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <strong>Enacted vs. Proposed Distinction:</strong> These 15 packages are{' '}
              <strong>proposed analytical model frameworks</strong> for adoption by the
              respective competent legislatures and rule-making authorities—not existing
              statutes, not a single cross-border law, and subject to independent review by
              qualified environmental lawyers in each jurisdiction.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Selector */}
            <div
              className={`lg:col-span-5 max-h-[430px] overflow-y-auto divide-y border ${
                isDark ? 'rounded-xl border-slate-800 divide-slate-800' : ''
              }`}
              style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
            >
              {PROPOSED_REFORM_PACKAGES_15.map((pkg) => {
                const selected = pkg.slug === activePackage.slug;
                return (
                  <button
                    key={pkg.slug}
                    type="button"
                    onClick={() => setSelectedPackageSlug(pkg.slug)}
                    className={`w-full text-left p-3.5 transition-colors cursor-pointer ${
                      isDark
                        ? selected
                          ? 'bg-emerald-950/40 text-white'
                          : 'bg-slate-950/60 text-slate-300 hover:bg-slate-900'
                        : selected
                          ? 'bg-[#8C3125]/10 font-semibold'
                          : 'hover:opacity-80'
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                      Package {pkg.packageNumber} · Section {pkg.sectionNumber}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold mt-0.5">
                      {pkg.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Detail */}
            <div
              className={`lg:col-span-7 p-5 border space-y-4 ${
                isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
              }`}
              style={
                isDark
                  ? undefined
                  : { borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-75">
                  PROPOSED MODEL REFORM PACKAGE {activePackage.packageNumber} OF 15 · REPORT SECTION{' '}
                  {activePackage.sectionNumber}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold">{activePackage.title}</h4>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {activePackage.summaryRationale}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  className="p-3 border space-y-1"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Substantive Gap Addressed
                  </div>
                  <div>{activePackage.primaryTargetGap}</div>
                </div>
                <div
                  className="p-3 border space-y-1"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Integration With Existing Law
                  </div>
                  <div>{activePackage.existingLawIntegrationNote}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                  Core Statutory Provisions &amp; Intended Ecological Outcomes
                </div>
                <div className="space-y-2">
                  {activePackage.keyProvisions.map((kp, i) => (
                    <div
                      key={i}
                      className="p-2.5 border text-xs flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                      style={
                        isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }
                      }
                    >
                      <span className="font-semibold">{kp.requirement}</span>
                      <span className="opacity-80 sm:text-right">{kp.intendedOutcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 4: HIMALAYAN LAKE TMDL SIMULATOR & AUDIT LEDGER
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'tmdl' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Simulator Controls */}
            <div
              className={`lg:col-span-7 p-5 border space-y-5 ${
                isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
              }`}
              style={
                isDark
                  ? undefined
                  : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-75">
                  PART X · CLEAN WATER ACT §303(d) ADAPTATION FOR HIMALAYAN EUTROPHIC LAKES
                </span>
                <h4 className="text-lg sm:text-xl font-bold">
                  {TMDL_LAKE_ADAPTATION_MODEL.title}
                </h4>
                <p className="text-xs font-mono opacity-80">
                  {TMDL_LAKE_ADAPTATION_MODEL.equationDisplay}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['dal', 'nigeen', 'anchar'] as LakePresetId[]).map((id) => {
                  const active = selectedLake === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleLakePresetChange(id)}
                      className={`px-3 py-1.5 text-xs font-semibold border cursor-pointer ${
                        isDark
                          ? active
                            ? 'rounded-lg bg-emerald-600 border-emerald-500 text-white'
                            : 'rounded-lg bg-slate-900 border-slate-700 text-slate-300'
                          : active
                            ? 'bg-[#8C3125] text-[#F2EFE7] border-[#8C3125]'
                            : 'opacity-80'
                      }`}
                      style={
                        !isDark && !active
                          ? { borderColor: 'var(--hd-rule-strong)' }
                          : undefined
                      }
                    >
                      {LAKE_TMDL_PRESETS[id].name}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>Sewer &amp; Houseboat Interception</span>
                    <span>{sewerInterceptionPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={100}
                    value={sewerInterceptionPct}
                    onChange={(e) => setSewerInterceptionPct(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>

                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>STP Phosphorus Removal Efficiency</span>
                    <span>{stpRemovalPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={92}
                    value={stpRemovalPct}
                    onChange={(e) => setStpRemovalPct(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>

                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>Catchment &amp; Silt Non-Point Abatement</span>
                    <span>{catchmentAbatementPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    value={catchmentAbatementPct}
                    onChange={(e) => setCatchmentAbatementPct(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>

                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>Statutory Margin of Safety (MOS)</span>
                    <span>{marginOfSafetyPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={marginOfSafetyPct}
                    onChange={(e) => setMarginOfSafetyPct(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t text-xs" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                <div>
                  <div className="opacity-70 text-[10px] uppercase font-mono">
                    Projected Lake TP Load
                  </div>
                  <div className="text-xl font-bold tabular-nums">
                    {tmdlCalc.projectedLoadTonnesYr.toFixed(1)} t/yr
                  </div>
                </div>
                <div>
                  <div className="opacity-70 text-[10px] uppercase font-mono">
                    Binding TMDL Cap (Post-MOS)
                  </div>
                  <div className="text-xl font-bold tabular-nums">
                    {tmdlCalc.allowableLoadAfterMos.toFixed(1)} t/yr
                  </div>
                </div>
                <div>
                  <div className="opacity-70 text-[10px] uppercase font-mono">
                    Statutory Compliance
                  </div>
                  <div
                    className={`text-sm font-bold mt-1 ${
                      tmdlCalc.isCompliant ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {tmdlCalc.isCompliant
                      ? `WITHIN CAP (${Math.abs(tmdlCalc.netExceedance).toFixed(1)} t/yr buffer)`
                      : `EXCEEDS CAP BY +${tmdlCalc.netExceedance.toFixed(1)} t/yr`}
                  </div>
                </div>
              </div>

              <p className="text-[11px] italic opacity-75">
                {tmdlCalc.preset.contextNote}
              </p>
            </div>

            {/* Audit Evidence Cards (Part V) */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className={`p-4 border space-y-3 ${
                  isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
                }`}
                style={
                  isDark
                    ? undefined
                    : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
                }
              >
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-80">
                  J&amp;K 22-YEAR LAKE BILL DELAY · CAG REPORT NO. 4 OF 2025
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {DOCUMENTED_IMPLEMENTATION_FAILURES.jkLakeLegislationGap.metrics.map(
                    (m) => (
                      <div key={m.label}>
                        <div className="text-xl font-bold tabular-nums">{m.figure}</div>
                        <div className="text-[11px] opacity-80">{m.label}</div>
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2 pt-2 border-t text-center" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                  {DOCUMENTED_IMPLEMENTATION_FAILURES.jkLakeLegislationGap.widerInventoryMetrics.map(
                    (w) => (
                      <div key={w.label}>
                        <div className="text-base font-bold tabular-nums">{w.figure}</div>
                        <div className="text-[10px] opacity-75 leading-tight">{w.label}</div>
                      </div>
                    )
                  )}
                </div>
                <p className="text-[10px] italic opacity-75">
                  {DOCUMENTED_IMPLEMENTATION_FAILURES.jkLakeLegislationGap.temporalCaveat}
                </p>
              </div>

              <div
                className={`p-4 border space-y-2 ${
                  isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
                }`}
                style={
                  isDark
                    ? undefined
                    : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
                }
              >
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-80">
                  LADAKH SEWAGE DEFICIT · NGT PROCEEDINGS (SEPT 2025)
                </div>
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="text-2xl font-bold tabular-nums">
                      {DOCUMENTED_IMPLEMENTATION_FAILURES.ladakhSewageDeficit.combinedDeficitMld}
                    </div>
                    <div className="text-[10px] opacity-75">Combined Leh &amp; Kargil Gap</div>
                  </div>
                  <div className="text-xs opacity-85">
                    Leh: <strong>5.69 MLD</strong> &nbsp;·&nbsp; Kargil:{' '}
                    <strong>6.64 MLD</strong>
                  </div>
                </div>
                <p className="text-[10px] italic opacity-75">
                  {DOCUMENTED_IMPLEMENTATION_FAILURES.ladakhSewageDeficit.temporalCaveat}
                </p>
              </div>
            </div>
          </div>

          {/* Selected International Comparisons */}
          <div className="pt-2">
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-75 mb-2">
              Comparative US, EU &amp; Multilateral Legal Benchmarks ({INTERNATIONAL_LEGAL_COMPARISON_16.length} Frameworks)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              {INTERNATIONAL_LEGAL_COMPARISON_16.slice(0, 8).map((ic) => (
                <div
                  key={ic.framework}
                  className="p-2.5 border space-y-1"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="font-semibold leading-snug">{ic.framework}</div>
                  <div className="text-[11px] opacity-80">{ic.potentialLesson}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
