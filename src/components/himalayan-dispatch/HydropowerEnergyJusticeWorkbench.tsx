'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Layers,
  Mountain,
  ShieldAlert,
  TreePine,
  Zap,
} from 'lucide-react';
import {
  ALTERNATIVES_TO_MEGA_DAMS_12,
  CANDIDATE_SACRIFICE_ZONE_DISTRICTS_10,
  HYDROPOWER_INTEGRITY_PROTOCOL_15,
  MATURE_FOREST_VS_PLANTATION_8,
  PRICE_OF_POWER_MONOGRAPH_SPEC,
  SELECTED_HYDROPOWER_PROJECTS_18,
} from '@/data/himalayan-dispatch-price-of-power-monograph';

type HydroTab = 'allocation' | 'rts_physics' | 'footprint' | 'protocol';

export function HydropowerEnergyJusticeWorkbench({
  variant = 'editorial',
}: {
  variant?: 'editorial' | 'observatory';
}) {
  const isDark = variant === 'observatory';
  const [activeTab, setActiveTab] = useState<HydroTab>('allocation');

  // Tab 1: Generation & Host Allocation Simulator (Defaults = Canonical Section V 1,000 MW / 45% / 12%)
  const [capacityMw, setCapacityMw] = useState<number>(1000);
  const [capacityFactorPct, setCapacityFactorPct] = useState<number>(45);
  const [hostEntitlementPct, setHostEntitlementPct] = useState<number>(12);
  const [projectStatusFilter, setProjectStatusFilter] = useState<
    'ALL' | 'OPERATIONAL_SELECTED' | 'DEVELOPMENT_SELECTED'
  >('ALL');

  // Tab 2: Reservoir Loading & RTS Effective Stress Calculator (Defaults = Canonical Section XIII 1.0 km³ / 100 m)
  const [volumeKm3, setVolumeKm3] = useState<number>(1.0);
  const [depthM, setDepthM] = useState<number>(100);
  const [normalStressMpa, setNormalStressMpa] = useState<number>(25);
  const [porePressureMpa, setPorePressureMpa] = useState<number>(8.5);

  const allocCalc = useMemo(() => {
    const annualGwh = (capacityMw * 8760 * (capacityFactorPct / 100)) / 1000;
    const hostGwh = annualGwh * (hostEntitlementPct / 100);
    const remainingGwh = annualGwh - hostGwh;
    // Typical winter drop (~25% of summer output -> ~22% winter CF)
    const illustrativeWinterAvailableMw = capacityMw * 0.22;
    const hostWinterShareMw =
      illustrativeWinterAvailableMw * (hostEntitlementPct / 100);
    return {
      annualGwh,
      hostGwh,
      remainingGwh,
      remainingPct: 100 - hostEntitlementPct,
      illustrativeWinterAvailableMw,
      hostWinterShareMw,
    };
  }, [capacityMw, capacityFactorPct, hostEntitlementPct]);

  const rtsCalc = useMemo(() => {
    // 1 km³ freshwater (1,000 kg/m³) = 1.0 × 10⁹ tonnes = 1.0 billion tonnes
    const massBillionTonnes = volumeKm3 * 1.0;
    const g = 9.81;
    // Hydrostatic pressure P = rho * g * h (Pa) -> MPa = (1000 * 9.81 * depthM) / 1e6
    const hydrostaticMpa = (1000 * g * depthM) / 1_000_000;
    // Total gravitational force F = m * g = (volumeKm3 * 1e12 kg) * 9.81 -> in units of 10^12 N
    const forceTeranewtons = volumeKm3 * g;
    const effectiveNormalStressMpa = Math.max(0, normalStressMpa - porePressureMpa);
    return {
      massBillionTonnes,
      hydrostaticMpa,
      forceTeranewtons,
      effectiveNormalStressMpa,
    };
  }, [volumeKm3, depthM, normalStressMpa, porePressureMpa]);

  const filteredProjects = useMemo(() => {
    if (projectStatusFilter === 'ALL') return SELECTED_HYDROPOWER_PROJECTS_18;
    return SELECTED_HYDROPOWER_PROJECTS_18.filter(
      (p) => p.status === projectStatusFilter
    );
  }, [projectStatusFilter]);

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
        ? 'px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white border border-emerald-500 cursor-pointer'
        : 'px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-600 cursor-pointer';
    }
    return active
      ? 'px-3.5 py-2 text-[11px] hd-font-sans font-semibold tracking-[0.14em] uppercase border bg-[#8C3125] text-[#F2EFE7] border-[#8C3125] cursor-pointer'
      : 'px-3.5 py-2 text-[11px] hd-font-sans font-medium tracking-[0.14em] uppercase border hover:opacity-80 cursor-pointer';
  };

  return (
    <section
      id="workbench"
      aria-label="Western Himalayan Hydropower, RTS Physics & Energy Justice Workbench"
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
          <div className="flex items-center gap-2">
            <Zap
              className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-[#8C3125]'}`}
            />
            <span
              className={
                isDark
                  ? 'text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400'
                  : 'hd-kicker'
              }
            >
              INTERACTIVE HYDROPOWER &amp; GEOTECHNICAL WORKBENCH · 5 REGIONS · 18 SELECTED DAMS
            </span>
          </div>
          <h3
            className={
              isDark
                ? 'text-2xl sm:text-3xl font-bold text-white'
                : 'hd-font-display text-2xl sm:text-3xl font-semibold'
            }
          >
            Electricity Allocation, Reservoir Loading Physics, Submergence &amp; Integrity Gates
          </h3>
          <p
            className={
              isDark
                ? 'text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed'
                : 'hd-font-body text-xs sm:text-sm leading-relaxed max-w-4xl opacity-85'
            }
          >
            Illustrates why installed MW does not equal local winter electricity, quantifies
            reservoir hydrostatic mass and effective fault stress ($\sigma&apos;_n = \sigma_n - p$),
            and tracks forest-diversion intensity alongside our 15-gate Integrity Protocol.
          </p>
        </div>

        <Link
          href={
            isDark
              ? '/himalayan-dispatch/issues/monograph-12-the-price-of-power'
              : '/earth-human-impact/hydropower-energy-justice-observatory'
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
              ? 'Open 20-Volume Monograph 12'
              : 'Open KEW Hydropower Observatory'}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('allocation')}
          className={tabBtnClass(activeTab === 'allocation')}
          style={
            !isDark && activeTab !== 'allocation'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          1. Generation &amp; Host Allocation Model + 18 Projects
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('rts_physics')}
          className={tabBtnClass(activeTab === 'rts_physics')}
          style={
            !isDark && activeTab !== 'rts_physics'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          2. Reservoir Loading &amp; RTS Physics (σ′_n = σ_n − p)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('footprint')}
          className={tabBtnClass(activeTab === 'footprint')}
          style={
            !isDark && activeTab !== 'footprint'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          3. Sawalkote / Forest Submergence &amp; Sacrifice-Zone Audit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('protocol')}
          className={tabBtnClass(activeTab === 'protocol')}
          style={
            !isDark && activeTab !== 'protocol'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          4. 15 Integrity Gates, 12 Alternatives &amp; Quarantined Totals
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 1: GENERATION & HOST-REGION ALLOCATION MODEL + 18 PROJECTS
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'allocation' && (
        <div className="space-y-6">
          <div
            className={`p-5 border space-y-4 ${
              isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
            }`}
            style={
              isDark
                ? undefined
                : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
            }
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-lg font-bold">
                Part V — Illustrative Hydropower Generation &amp; Host-Region Allocation Calculator
              </h4>
              <span className="text-[11px] italic opacity-75">
                Illustrative physical-contractual scenario — not an actual PPA for a specific dam
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              <label className="space-y-1 block">
                <div className="flex justify-between font-semibold">
                  <span>Installed Nameplate Capacity</span>
                  <span>{capacityMw.toLocaleString()} MW</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={4500}
                  step={50}
                  value={capacityMw}
                  onChange={(e) => setCapacityMw(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </label>

              <label className="space-y-1 block">
                <div className="flex justify-between font-semibold">
                  <span>Annual Capacity Factor</span>
                  <span>{capacityFactorPct}%</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={65}
                  step={1}
                  value={capacityFactorPct}
                  onChange={(e) => setCapacityFactorPct(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </label>

              <label className="space-y-1 block">
                <div className="flex justify-between font-semibold">
                  <span>Assumed Host-Region Royalty Entitlement</span>
                  <span>{hostEntitlementPct}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={hostEntitlementPct}
                  onChange={(e) => setHostEntitlementPct(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t text-xs" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
              <div>
                <div className="text-[10px] font-mono uppercase opacity-70">
                  Annual Gross Generation
                </div>
                <div className="text-2xl font-bold tabular-nums">
                  {Math.round(allocCalc.annualGwh).toLocaleString()} GWh
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase opacity-70">
                  Host Entitlement ({hostEntitlementPct}%)
                </div>
                <div className="text-2xl font-bold tabular-nums text-emerald-500">
                  {Math.round(allocCalc.hostGwh).toLocaleString()} GWh
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase opacity-70">
                  Remaining PPA Pool ({allocCalc.remainingPct}%)
                </div>
                <div className="text-2xl font-bold tabular-nums">
                  {Math.round(allocCalc.remainingGwh).toLocaleString()} GWh
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase opacity-70">
                  Illustrative Low-Flow Winter Host Share
                </div>
                <div className="text-2xl font-bold tabular-nums text-amber-500">
                  ~{Math.round(allocCalc.hostWinterShareMw)} MW
                </div>
              </div>
            </div>
          </div>

          {/* 18 Selected Operational & Development Projects */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Part IV — Selected Generating &amp; Planned Projects (Indicative Subset, Not Complete Regional Census)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'ALL' as const, label: 'All 18 Selected' },
                  { id: 'OPERATIONAL_SELECTED' as const, label: 'Operational (11)' },
                  {
                    id: 'DEVELOPMENT_SELECTED' as const,
                    label: 'Development Pipeline (7 = 10,190 MW)',
                  },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setProjectStatusFilter(f.id)}
                    className={`px-2.5 py-1 text-[11px] border cursor-pointer ${
                      projectStatusFilter === f.id
                        ? isDark
                          ? 'rounded bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                          : 'border-[#8C3125] text-[#8C3125] font-semibold'
                        : 'opacity-75'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-h-[320px] overflow-y-auto border" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
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
                        : { borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }
                    }
                  >
                    <th className="py-2 px-3">Project</th>
                    <th className="py-2 px-3">Region / Basin</th>
                    <th className="py-2 px-3">Specified Capacity</th>
                    <th className="py-2 px-3">Documented Engineering / Ecological Note</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/70' : ''}`} style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}>
                  {filteredProjects.map((pr) => (
                    <tr key={pr.project}>
                      <td className="py-2.5 px-3 font-semibold">{pr.project}</td>
                      <td className="py-2.5 px-3 whitespace-nowrap opacity-80">
                        {pr.region} · {pr.riverBasin}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-semibold whitespace-nowrap">
                        {pr.capacityLabel}
                      </td>
                      <td className="py-2.5 px-3 opacity-85 leading-relaxed">
                        {pr.engineeringAndGovernanceNote}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 2: RESERVOIR LOADING & RTS EFFECTIVE STRESS PHYSICS
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'rts_physics' && (
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
              <strong>Physical Plausibility ≠ Earthquake Prediction:</strong> Hydrostatic base
              pressure and gravitational water mass are first-order physical quantities, not direct
              fault-plane shear/normal stress changes. Earthquake probability cannot be derived from
              reservoir volume alone, and no Himalayan earthquake is attributed to a dam without
              independent fault-and-pore-pressure evidence.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div
              className={`lg:col-span-7 p-5 border space-y-4 ${
                isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
              }`}
              style={
                isDark
                  ? undefined
                  : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <h4 className="text-lg font-bold">
                Part XII &amp; XIII — Reservoir Water Mass, Hydrostatic Pressure &amp; Effective Stress
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>Stored Water Volume</span>
                    <span>{volumeKm3.toFixed(1)} km³</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={10.0}
                    step={0.1}
                    value={volumeKm3}
                    onChange={(e) => setVolumeKm3(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>

                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>Water Column Depth (h)</span>
                    <span>{depthM} m</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={280}
                    step={5}
                    value={depthM}
                    onChange={(e) => setDepthM(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>

                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>Illustrative Total Normal Stress (σ_n)</span>
                    <span>{normalStressMpa.toFixed(1)} MPa</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    step={0.5}
                    value={normalStressMpa}
                    onChange={(e) => setNormalStressMpa(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>

                <label className="space-y-1 block">
                  <div className="flex justify-between font-semibold">
                    <span>Fracture Pore-Water Pressure (p)</span>
                    <span>{porePressureMpa.toFixed(1)} MPa</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    step={0.5}
                    value={porePressureMpa}
                    onChange={(e) => setPorePressureMpa(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t text-xs" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                <div>
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Stored Water Mass
                  </div>
                  <div className="text-xl font-bold tabular-nums">
                    {rtsCalc.massBillionTonnes.toFixed(2)}B t
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Hydrostatic Base P
                  </div>
                  <div className="text-xl font-bold tabular-nums">
                    {rtsCalc.hydrostaticMpa.toFixed(3)} MPa
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Gravitational Force
                  </div>
                  <div className="text-xl font-bold tabular-nums">
                    {rtsCalc.forceTeranewtons.toFixed(2)}×10¹² N
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Effective σ′_n = σ_n − p
                  </div>
                  <div className="text-xl font-bold tabular-nums text-amber-500">
                    {rtsCalc.effectiveNormalStressMpa.toFixed(1)} MPa
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 text-xs">
              <div
                className="p-4 border space-y-1.5"
                style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
              >
                <div className="font-mono uppercase text-[10px] font-bold">
                  USGS Global Benchmark · Koyna (Dec 10, 1967)
                </div>
                <p className="leading-relaxed opacity-90">
                  M 6.3 earthquake identified by the US Geological Survey as the largest known
                  reservoir-triggered event in that documented setting—establishing RTS physical
                  plausibility and the necessity of pre-impoundment seismic baselines.
                </p>
              </div>
              <div
                className="p-4 border space-y-1.5"
                style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
              >
                <div className="font-mono uppercase text-[10px] font-bold">
                  Underground Fragility · Neelum–Jhelum &amp; Ratle Records
                </div>
                <p className="leading-relaxed opacity-90">
                  Pakistan National Assembly records document Neelum–Jhelum’s 2022 tailrace tunnel
                  blockage and subsequent headrace shutdown; Feb 2026 NGT proceedings on Ratle
                  reproduce proponent warnings over improper muck disposal into the Chenab.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 3: SAWALKOTE / FOREST SUBMERGENCE & SACRIFICE-ZONE AUDIT
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'footprint' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div
              className={`lg:col-span-5 p-5 border space-y-3 ${
                isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
              }`}
              style={
                isDark
                  ? undefined
                  : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold">
                PART VII CASE DOSSIER · SAWALKOTE (CHENAB)
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-2xl font-bold">1,856 MW</div>
                  <div className="text-xs opacity-75">Planned generating capacity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">847.17 ha</div>
                  <div className="text-xs opacity-75">Proposed forest diversion (~16,750 kanals)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1,159.73 ha</div>
                  <div className="text-xs opacity-75">Proposed total submergence (~11.6 km²)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-500">88.94%</div>
                  <div className="text-xs opacity-75">Share of submergence in Ramban (2026 govt statement)</div>
                </div>
              </div>
              <p className="text-[11px] italic opacity-75 pt-2 border-t" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                Methodological safeguard: Forest diversion (roads, tunnels, camps, reservoir) and
                total submergence overlap spatially and must never be summed directly.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {MATURE_FOREST_VS_PLANTATION_8.map(([fn, ans]) => (
                <div
                  key={fn}
                  className="p-3 border space-y-1"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="font-semibold">{fn}</div>
                  <div className="text-[11px] opacity-80">{ans}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
            {CANDIDATE_SACRIFICE_ZONE_DISTRICTS_10.map(([dist, note]) => (
              <div
                key={dist}
                className="p-3 border space-y-1"
                style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
              >
                <div className="font-bold">{dist}</div>
                <div className="text-[11px] opacity-80 leading-snug">{note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 4: 15 INTEGRITY PROTOCOL GATES, 12 ALTERNATIVES & 8 QUARANTINED TOTALS
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'protocol' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-7 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider font-bold">
                Western Himalayan Hydropower Integrity Protocol (15 Mandatory Pre-Approval Gates)
              </div>
              <div className="max-h-[340px] overflow-y-auto divide-y border text-xs" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                {HYDROPOWER_INTEGRITY_PROTOCOL_15.map(([gate, obj]) => (
                  <div key={gate} className="p-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="font-semibold">{gate}</span>
                    <span className="opacity-80 sm:text-right">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider font-bold">
                Section XXX — 8 Unestablished Regional Totals (Explicitly Quarantined Until Verified)
              </div>
              <ul className="space-y-1.5 text-xs">
                {PRICE_OF_POWER_MONOGRAPH_SPEC.unestablishedRegionalTotals8.map((item) => (
                  <li
                    key={item}
                    className="p-2.5 border flex items-start gap-2"
                    style={
                      isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }
                    }
                  >
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {ALTERNATIVES_TO_MEGA_DAMS_12.slice(0, 8).map(([alt, desc]) => (
              <div
                key={alt}
                className="p-2.5 border space-y-1"
                style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
              >
                <div className="font-semibold">{alt}</div>
                <div className="text-[11px] opacity-80">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
