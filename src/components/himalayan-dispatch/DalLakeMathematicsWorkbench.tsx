'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type WorkbenchTab = 'phosphorus' | 'stp' | 'harvest_dredge' | 'hydrology';

const DEFAULT_PHOSPHORUS = {
  externalLoading: 120,
  internalRelease: 30,
  outflowExport: 65,
  vegetationHarvest: 5,
  dredgingExport: 10,
  sedimentBurial: 15,
};

const DEFAULT_STP = {
  flowMld: 36.7,
  tpMgL: 2.0,
  tnMgL: 14.0,
};

const DEFAULT_HARVEST_DREDGE = {
  wetBiomassTonnes: 10000,
  dryFractionPct: 10,
  pDryPct: 0.3,
  nDryPct: 2.0,
  slurryM3PerHour: 120,
};

const DEFAULT_HYDROLOGY = {
  volumeMillionM3: 15.0,
  existingOutflowM3s: 5.0,
  additionalInflowM3s: 2.0,
};

const STP_PRESETS = [
  { label: 'Combined Existing (36.70 MLD)', flow: 36.7 },
  { label: 'Brari Numbal (16.1 MLD)', flow: 16.1 },
  { label: 'Hazratbal (7.5 MLD)', flow: 7.5 },
  { label: 'Nallah Amir Khan (5.4 MLD)', flow: 5.4 },
  { label: 'Laam (4.5 MLD)', flow: 4.5 },
  { label: 'Habak (3.2 MLD)', flow: 3.2 },
  { label: 'Gupt Ganga u/c Alone (30.0 MLD)', flow: 30.0 },
];

export function DalLakeMathematicsWorkbench({
  variant = 'editorial',
  initialTab = 'phosphorus',
}: {
  variant?: 'editorial' | 'observatory';
  initialTab?: WorkbenchTab;
}) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>(initialTab);

  // 1. Integrated Lake Phosphorus Mass Balance
  const [pModel, setPModel] = useState(DEFAULT_PHOSPHORUS);
  const totalPInputs = pModel.externalLoading + pModel.internalRelease;
  const totalPLosses =
    pModel.outflowExport +
    pModel.vegetationHarvest +
    pModel.dredgingExport +
    pModel.sedimentBurial;
  const netPChange = totalPInputs - totalPLosses;

  // 2. STP Nutrient Discharge Simulator (L = Q * C)
  const [stpModel, setStpModel] = useState(DEFAULT_STP);
  const dailyPKg = stpModel.flowMld * stpModel.tpMgL;
  const annualPTonnes = (dailyPKg * 365) / 1000;
  const dailyNKg = stpModel.flowMld * stpModel.tnMgL;
  const annualNTonnes = (dailyNKg * 365) / 1000;

  // 3. Mechanical De-Weeding & Dredging Slurry Calculators
  const [hdModel, setHdModel] = useState(DEFAULT_HARVEST_DREDGE);
  const dryBiomassTonnes = hdModel.wetBiomassTonnes * (hdModel.dryFractionPct / 100);
  const exportedPTonnes = dryBiomassTonnes * (hdModel.pDryPct / 100);
  const exportedNTonnes = dryBiomassTonnes * (hdModel.nDryPct / 100);
  const solidsAt10 = hdModel.slurryM3PerHour * 0.1;
  const solidsAt20 = hdModel.slurryM3PerHour * 0.2;
  const solidsAt30 = hdModel.slurryM3PerHour * 0.3;

  // 4. Hydraulic Residence Time (tau = V / Q_out)
  const [hydroModel, setHydroModel] = useState(DEFAULT_HYDROLOGY);
  const volumeM3 = hydroModel.volumeMillionM3 * 1_000_000;
  const existingTauDays =
    hydroModel.existingOutflowM3s > 0
      ? volumeM3 / (hydroModel.existingOutflowM3s * 86400)
      : 0;
  const augmentedOutflowM3s =
    hydroModel.existingOutflowM3s + hydroModel.additionalInflowM3s;
  const augmentedTauDays =
    augmentedOutflowM3s > 0 ? volumeM3 / (augmentedOutflowM3s * 86400) : 0;
  const additionalDailyMld = hydroModel.additionalInflowM3s * 86.4;
  const additional60DayMm3 =
    (hydroModel.additionalInflowM3s * 86400 * 60) / 1_000_000;

  const isObs = variant === 'observatory';

  const containerStyle = isObs
    ? undefined
    : {
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
        color: 'var(--hd-fg)',
      };

  const cardStyle = isObs
    ? undefined
    : {
        borderColor: 'var(--hd-rule)',
        backgroundColor: 'var(--hd-bg)',
      };

  return (
    <section
      aria-label="Dal Lake Interactive Engineering and Mass-Balance Workbench"
      className={
        isObs
          ? 'rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-8 text-slate-100 space-y-6'
          : 'my-10 border p-6 sm:p-8 space-y-6'
      }
      style={containerStyle}
    >
      {/* Header */}
      <div
        className={
          isObs
            ? 'flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4'
            : 'flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4'
        }
        style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
      >
        <div className="space-y-1">
          <p
            className={
              isObs
                ? 'text-xs font-mono uppercase tracking-widest text-cyan-400'
                : 'hd-kicker'
            }
          >
            INTERACTIVE ENVIRONMENTAL ENGINEERING WORKBENCH · 4 CONSERVATION EQUATIONS
          </p>
          <h3
            className={
              isObs
                ? 'text-2xl sm:text-3xl font-bold text-white'
                : 'hd-font-display text-2xl sm:text-3xl font-semibold'
            }
          >
            The Master Mathematics of Dal Lake
          </h3>
          <p
            className={
              isObs
                ? 'text-xs sm:text-sm text-slate-300'
                : 'hd-font-body text-xs sm:text-sm'
            }
            style={isObs ? undefined : { color: 'var(--hd-fg-secondary)' }}
          >
            Adjust illustrative loads, flows, tissue fractions, slurry ratios, and canal inflows to
            test how Dal Lake’s physical and chemical balances respond.
          </p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Engineering Calculators">
        {[
          { id: 'phosphorus' as const, label: '01 · Integrated Phosphorus Budget' },
          { id: 'stp' as const, label: '02 · STP Nutrient Discharge (L = Q × C)' },
          { id: 'harvest_dredge' as const, label: '03 · De-Weeding & Dredging Solids' },
          { id: 'hydrology' as const, label: '04 · Flushing & Residence Time (τ = V / Q)' },
        ].map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(t.id)}
              className={
                isObs
                  ? `px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide border transition-colors ${
                      active
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`
                  : 'px-3.5 py-2 text-[11px] hd-font-sans uppercase tracking-[0.14em] border transition-colors'
              }
              style={
                isObs
                  ? undefined
                  : {
                      borderColor: active ? 'var(--hd-copper)' : 'var(--hd-rule)',
                      color: active ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                      backgroundColor: active ? 'var(--hd-bg)' : 'transparent',
                      fontWeight: active ? 700 : 500,
                    }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB 01: INTEGRATED PHOSPHORUS MASS BALANCE */}
      {activeTab === 'phosphorus' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <code
              className={
                isObs
                  ? 'text-xs sm:text-sm font-mono text-emerald-300 bg-slate-950 px-3 py-1.5 rounded border border-slate-800'
                  : 'text-xs sm:text-sm font-mono px-3 py-1.5 border'
              }
              style={isObs ? undefined : cardStyle}
            >
              dM_P / dt = L_external + L_internal − E_outflow − E_harvest − E_dredge − B_burial
            </code>
            <button
              type="button"
              onClick={() => setPModel(DEFAULT_PHOSPHORUS)}
              className={
                isObs
                  ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800'
                  : 'inline-flex items-center gap-1.5 px-3 py-1.5 border text-[11px] hd-font-sans uppercase tracking-[0.14em]'
              }
              style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset model</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inputs Sliders */}
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4' : 'p-4 border space-y-4'}
              style={cardStyle}
            >
              <p className={isObs ? 'text-xs font-mono uppercase text-amber-300' : 'hd-kicker'}>
                ANNUAL PHOSPHORUS INPUTS (TONNES / YEAR)
              </p>
              {[
                {
                  key: 'externalLoading' as const,
                  label: 'External phosphorus loading (sewage, runoff, catchment)',
                  max: 250,
                },
                {
                  key: 'internalRelease' as const,
                  label: 'Internal sediment release (benthic flux)',
                  max: 120,
                },
              ].map((ctrl) => (
                <label key={ctrl.key} className="block space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>{ctrl.label}</span>
                    <strong className="tabular-nums">{pModel[ctrl.key]} t/year</strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={ctrl.max}
                    step={1}
                    value={pModel[ctrl.key]}
                    onChange={(e) =>
                      setPModel((prev) => ({ ...prev, [ctrl.key]: Number(e.target.value) }))
                    }
                    className="w-full accent-[#8C3125]"
                  />
                </label>
              ))}
            </div>

            {/* Removals Sliders */}
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4' : 'p-4 border space-y-4'}
              style={cardStyle}
            >
              <p className={isObs ? 'text-xs font-mono uppercase text-emerald-300' : 'hd-kicker'}>
                ANNUAL REMOVAL &amp; BURIAL MECHANISMS (TONNES / YEAR)
              </p>
              {[
                { key: 'outflowExport' as const, label: 'Export through outlets', max: 150 },
                { key: 'vegetationHarvest' as const, label: 'Vegetation harvesting (permanent)', max: 50 },
                { key: 'dredgingExport' as const, label: 'Permanent dredging export', max: 80 },
                { key: 'sedimentBurial' as const, label: 'Long-term sediment burial', max: 60 },
              ].map((ctrl) => (
                <label key={ctrl.key} className="block space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>{ctrl.label}</span>
                    <strong className="tabular-nums">{pModel[ctrl.key]} t/year</strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={ctrl.max}
                    step={1}
                    value={pModel[ctrl.key]}
                    onChange={(e) =>
                      setPModel((prev) => ({ ...prev, [ctrl.key]: Number(e.target.value) }))
                    }
                    className="w-full accent-[#8C3125]"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950' : 'p-4 border'}
              style={cardStyle}
            >
              <div className={isObs ? 'text-xs text-slate-400 uppercase' : 'hd-folio-meta'}>
                Total inputs
              </div>
              <div
                className={
                  isObs
                    ? 'text-3xl font-bold tabular-nums text-white mt-1'
                    : 'hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1'
                }
              >
                {totalPInputs} t/yr
              </div>
            </div>
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950' : 'p-4 border'}
              style={cardStyle}
            >
              <div className={isObs ? 'text-xs text-slate-400 uppercase' : 'hd-folio-meta'}>
                Total losses
              </div>
              <div
                className={
                  isObs
                    ? 'text-3xl font-bold tabular-nums text-white mt-1'
                    : 'hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1'
                }
              >
                {totalPLosses} t/yr
              </div>
            </div>
            <div
              className={
                isObs
                  ? 'p-4 rounded-xl border border-cyan-500/40 bg-slate-950'
                  : 'p-4 border-2'
              }
              style={
                isObs
                  ? undefined
                  : { borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <div className={isObs ? 'text-xs text-cyan-300 uppercase' : 'hd-folio-meta'}>
                Net change in modeled active phosphorus pool
              </div>
              <div
                className={
                  isObs
                    ? `text-3xl font-bold tabular-nums mt-1 ${
                        netPChange > 0
                          ? 'text-amber-300'
                          : netPChange < 0
                          ? 'text-emerald-300'
                          : 'text-white'
                      }`
                    : 'hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1'
                }
                style={
                  isObs
                    ? undefined
                    : { color: netPChange > 0 ? 'var(--hd-copper)' : 'var(--hd-fg)' }
                }
              >
                {netPChange > 0 ? `+${netPChange}` : netPChange} tonnes/year
              </div>
              <div className="text-xs mt-1 opacity-80">
                {netPChange > 0
                  ? 'Net phosphorus accumulation (eutrophication pressure rising)'
                  : netPChange < 0
                  ? 'Net active-pool drawdown (restoration trajectory)'
                  : 'Steady-state mass equilibrium'}
              </div>
            </div>
          </div>

          <p className="text-xs italic opacity-75">
            Illustrative active-pool mass balance, not calibrated Dal Lake research. A complete
            model must account for seasonal changes, nutrient transformations, sediment exchange and
            ecological response, with strict accounting boundaries preventing double counting.
          </p>
        </div>
      )}

      {/* TAB 02: STP NUTRIENT DISCHARGE SIMULATOR */}
      {activeTab === 'stp' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <code
              className={
                isObs
                  ? 'text-xs sm:text-sm font-mono text-emerald-300 bg-slate-950 px-3 py-1.5 rounded border border-slate-800'
                  : 'text-xs sm:text-sm font-mono px-3 py-1.5 border'
              }
              style={isObs ? undefined : cardStyle}
            >
              L = Q (MLD) × C (mg/L) = kg/day
            </code>
            <button
              type="button"
              onClick={() => setStpModel(DEFAULT_STP)}
              className={
                isObs
                  ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800'
                  : 'inline-flex items-center gap-1.5 px-3 py-1.5 border text-[11px] hd-font-sans uppercase tracking-[0.14em]'
              }
              style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset model</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {STP_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setStpModel((prev) => ({ ...prev, flowMld: p.flow }))}
                className={
                  isObs
                    ? 'px-2.5 py-1 rounded border border-slate-700 bg-slate-950 text-xs text-slate-300 hover:border-cyan-400'
                    : 'px-2.5 py-1 border text-[11px] hd-font-body hover:opacity-80'
                }
                style={isObs ? undefined : cardStyle}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div
            className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4' : 'p-4 border space-y-4'}
            style={cardStyle}
          >
            <label className="block space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Actual treated wastewater flow (Q)</span>
                <strong className="tabular-nums">{stpModel.flowMld.toFixed(1)} MLD</strong>
              </div>
              <input
                type="range"
                min={1}
                max={70}
                step={0.1}
                value={stpModel.flowMld}
                onChange={(e) =>
                  setStpModel((prev) => ({ ...prev, flowMld: Number(e.target.value) }))
                }
                className="w-full accent-[#8C3125]"
              />
            </label>

            <label className="block space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Effluent total phosphorus concentration (C_TP)</span>
                <strong className="tabular-nums">{stpModel.tpMgL.toFixed(2)} mg/L</strong>
              </div>
              <input
                type="range"
                min={0.1}
                max={6.0}
                step={0.05}
                value={stpModel.tpMgL}
                onChange={(e) =>
                  setStpModel((prev) => ({ ...prev, tpMgL: Number(e.target.value) }))
                }
                className="w-full accent-[#8C3125]"
              />
            </label>

            <label className="block space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Effluent total nitrogen concentration (C_TN)</span>
                <strong className="tabular-nums">{stpModel.tnMgL.toFixed(1)} mg/L</strong>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={0.5}
                value={stpModel.tnMgL}
                onChange={(e) =>
                  setStpModel((prev) => ({ ...prev, tnMgL: Number(e.target.value) }))
                }
                className="w-full accent-[#8C3125]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950' : 'p-4 border'}
              style={cardStyle}
            >
              <div className={isObs ? 'text-xs text-slate-400 uppercase' : 'hd-folio-meta'}>
                Annual phosphorus discharge
              </div>
              <div
                className={
                  isObs
                    ? 'text-3xl font-bold tabular-nums text-amber-300 mt-1'
                    : 'hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1'
                }
              >
                {annualPTonnes.toFixed(2)} t
              </div>
              <div className="text-xs mt-1 tabular-nums opacity-80">
                {dailyPKg.toFixed(1)} kg/day
              </div>
            </div>

            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950' : 'p-4 border'}
              style={cardStyle}
            >
              <div className={isObs ? 'text-xs text-slate-400 uppercase' : 'hd-folio-meta'}>
                Annual nitrogen discharge
              </div>
              <div
                className={
                  isObs
                    ? 'text-3xl font-bold tabular-nums text-cyan-300 mt-1'
                    : 'hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1'
                }
              >
                {annualNTonnes.toFixed(2)} t
              </div>
              <div className="text-xs mt-1 tabular-nums opacity-80">
                {dailyNKg.toFixed(1)} kg/day
              </div>
            </div>
          </div>

          <p className="text-xs italic opacity-75">
            Hypothetical continuous full-flow scenario. This calculates total effluent discharge
            from the selected system; the fraction that actually reaches Dal Lake depends on each
            plant&apos;s receiving water and discharge pathway.
          </p>
        </div>
      )}

      {/* TAB 03: DE-WEEDING NUTRIENT RECOVERY & DREDGING SOLIDS */}
      {activeTab === 'harvest_dredge' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <code
              className={
                isObs
                  ? 'text-xs sm:text-sm font-mono text-emerald-300 bg-slate-950 px-3 py-1.5 rounded border border-slate-800'
                  : 'text-xs sm:text-sm font-mono px-3 py-1.5 border'
              }
              style={isObs ? undefined : cardStyle}
            >
              P_h = B_w × f_d × f_p &nbsp;|&nbsp; V_solids = Q_slurry × f_vol
            </code>
            <button
              type="button"
              onClick={() => setHdModel(DEFAULT_HARVEST_DREDGE)}
              className={
                isObs
                  ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800'
                  : 'inline-flex items-center gap-1.5 px-3 py-1.5 border text-[11px] hd-font-sans uppercase tracking-[0.14em]'
              }
              style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset model</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* De-weeding */}
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4' : 'p-4 border space-y-4'}
              style={cardStyle}
            >
              <p className={isObs ? 'text-xs font-mono uppercase text-emerald-300' : 'hd-kicker'}>
                MECHANICAL DE-WEEDING NUTRIENT RECOVERY
              </p>

              <label className="block space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Annual harvested wet vegetation (B_w)</span>
                  <strong className="tabular-nums">
                    {hdModel.wetBiomassTonnes.toLocaleString()} t
                  </strong>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={hdModel.wetBiomassTonnes}
                  onChange={(e) =>
                    setHdModel((prev) => ({
                      ...prev,
                      wetBiomassTonnes: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[#8C3125]"
                />
              </label>

              <label className="block space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Dry matter fraction (f_d)</span>
                  <strong className="tabular-nums">{hdModel.dryFractionPct}%</strong>
                </div>
                <input
                  type="range"
                  min={5}
                  max={20}
                  step={1}
                  value={hdModel.dryFractionPct}
                  onChange={(e) =>
                    setHdModel((prev) => ({ ...prev, dryFractionPct: Number(e.target.value) }))
                  }
                  className="w-full accent-[#8C3125]"
                />
              </label>

              <label className="block space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Phosphorus in dry biomass (f_p)</span>
                  <strong className="tabular-nums">{hdModel.pDryPct.toFixed(2)}%</strong>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={0.8}
                  step={0.05}
                  value={hdModel.pDryPct}
                  onChange={(e) =>
                    setHdModel((prev) => ({ ...prev, pDryPct: Number(e.target.value) }))
                  }
                  className="w-full accent-[#8C3125]"
                />
              </label>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 border" style={cardStyle}>
                  <div className="text-[11px] uppercase opacity-75">Phosphorus exported</div>
                  <div className="text-2xl font-bold tabular-nums mt-0.5">
                    {exportedPTonnes.toFixed(2)} tonnes
                  </div>
                </div>
                <div className="p-3 border" style={cardStyle}>
                  <div className="text-[11px] uppercase opacity-75">Nitrogen exported (2.0%)</div>
                  <div className="text-2xl font-bold tabular-nums mt-0.5">
                    {exportedNTonnes.toFixed(2)} tonnes
                  </div>
                </div>
              </div>
            </div>

            {/* Dredging Slurry vs Solids */}
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4' : 'p-4 border space-y-4'}
              style={cardStyle}
            >
              <p className={isObs ? 'text-xs font-mono uppercase text-cyan-300' : 'hd-kicker'}>
                DREDGER SLURRY VOLUME VS. ACTUAL SEDIMENT
              </p>

              <label className="block space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Water and sediment mixture pumped</span>
                  <strong className="tabular-nums">{hdModel.slurryM3PerHour} m³/h</strong>
                </div>
                <input
                  type="range"
                  min={40}
                  max={400}
                  step={10}
                  value={hdModel.slurryM3PerHour}
                  onChange={(e) =>
                    setHdModel((prev) => ({
                      ...prev,
                      slurryM3PerHour: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[#8C3125]"
                />
              </label>

              <div className="space-y-2 pt-2">
                {[
                  { label: 'Sediment at 10% solids by volume', val: solidsAt10 },
                  { label: 'Sediment at 20% solids by volume', val: solidsAt20 },
                  { label: 'Sediment at 30% solids by volume', val: solidsAt30 },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between p-2.5 border text-xs sm:text-sm"
                    style={cardStyle}
                  >
                    <span>{row.label}</span>
                    <strong className="tabular-nums">{row.val.toFixed(0)} m³/h</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs italic opacity-75">
            Illustrative biomass, tissue-composition, and volumetric solids assumptions, not
            measured Dal Lake harvesting or dredging data. Permanent export requires upland
            containment without leachate or return-water nutrient recycling.
          </p>
        </div>
      )}

      {/* TAB 04: HYDRAULIC RESIDENCE TIME */}
      {activeTab === 'hydrology' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <code
              className={
                isObs
                  ? 'text-xs sm:text-sm font-mono text-emerald-300 bg-slate-950 px-3 py-1.5 rounded border border-slate-800'
                  : 'text-xs sm:text-sm font-mono px-3 py-1.5 border'
              }
              style={isObs ? undefined : cardStyle}
            >
              τ = V / Q_out
            </code>
            <button
              type="button"
              onClick={() => setHydroModel(DEFAULT_HYDROLOGY)}
              className={
                isObs
                  ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:bg-slate-800'
                  : 'inline-flex items-center gap-1.5 px-3 py-1.5 border text-[11px] hd-font-sans uppercase tracking-[0.14em]'
              }
              style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset model</span>
            </button>
          </div>

          <div
            className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-4' : 'p-4 border space-y-4'}
            style={cardStyle}
          >
            <label className="block space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Effective lake water volume (V)</span>
                <strong className="tabular-nums">
                  {hydroModel.volumeMillionM3.toFixed(1)} million m³
                </strong>
              </div>
              <input
                type="range"
                min={8}
                max={30}
                step={0.5}
                value={hydroModel.volumeMillionM3}
                onChange={(e) =>
                  setHydroModel((prev) => ({
                    ...prev,
                    volumeMillionM3: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#8C3125]"
              />
            </label>

            <label className="block space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Existing mean outflow (Q_out)</span>
                <strong className="tabular-nums">
                  {hydroModel.existingOutflowM3s.toFixed(1)} m³/s
                </strong>
              </div>
              <input
                type="range"
                min={1.0}
                max={12.0}
                step={0.5}
                value={hydroModel.existingOutflowM3s}
                onChange={(e) =>
                  setHydroModel((prev) => ({
                    ...prev,
                    existingOutflowM3s: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#8C3125]"
              />
            </label>

            <label className="block space-y-1">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Proposed Padshahi Canal water augmentation (ΔQ)</span>
                <strong className="tabular-nums">
                  {hydroModel.additionalInflowM3s.toFixed(1)} m³/s ({additionalDailyMld.toFixed(1)}{' '}
                  MLD · {additional60DayMm3.toFixed(2)}M m³ / 60d)
                </strong>
              </div>
              <input
                type="range"
                min={0}
                max={5.0}
                step={0.5}
                value={hydroModel.additionalInflowM3s}
                onChange={(e) =>
                  setHydroModel((prev) => ({
                    ...prev,
                    additionalInflowM3s: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#8C3125]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950' : 'p-4 border'}
              style={cardStyle}
            >
              <div className={isObs ? 'text-xs text-slate-400 uppercase' : 'hd-folio-meta'}>
                Existing nominal residence time
              </div>
              <div
                className={
                  isObs
                    ? 'text-3xl font-bold tabular-nums text-white mt-1'
                    : 'hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1'
                }
              >
                {existingTauDays.toFixed(1)} days
              </div>
            </div>

            <div
              className={isObs ? 'p-4 rounded-xl border border-slate-800 bg-slate-950' : 'p-4 border'}
              style={cardStyle}
            >
              <div className={isObs ? 'text-xs text-slate-400 uppercase' : 'hd-folio-meta'}>
                After water augmentation
              </div>
              <div
                className={
                  isObs
                    ? 'text-3xl font-bold tabular-nums text-cyan-300 mt-1'
                    : 'hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1'
                }
              >
                {augmentedTauDays.toFixed(1)} days
              </div>
            </div>
          </div>

          <p className="text-xs italic opacity-75">
            Idealized steady-volume model. Actual Dal Lake consists of multiple interconnected
            basins and channels with different residence times, and downstream pollutant export to
            the Jhelum River is not equivalent to permanent pollutant removal.
          </p>
        </div>
      )}
    </section>
  );
}
