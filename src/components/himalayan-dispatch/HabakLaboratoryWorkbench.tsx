'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {
  HABAK_LABORATORY_SPEC,
  HISTORICAL_TIMELINE_7_EPOCHS,
  INTERNATIONAL_AQUATIC_INSTITUTES_5,
  OVERSIGHT_MEETINGS_BREAKDOWN,
  PHOSPHORUS_BALANCE_1998_99,
  PROPOSED_AQUATIC_INSTITUTE_16_DIVISIONS,
  REMOTE_SENSING_SHIFTS_2007_2020,
  TWELVE_INSTITUTIONAL_RESPONSIBILITIES,
} from '@/data/himalayan-dispatch-habak-laboratory-monograph';

type WorkbenchTab = 'phosphorus' | 'audit' | 'recovery';

export function HabakLaboratoryWorkbench() {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('phosphorus');

  // Interactive Mass-Balance Explorer (dM_P/dt = L_ext + L_int - L_out - L_burial - L_harv)
  // Default anchored to 1998-99 historical estimate (156.62 in, 80.62 out, 0 explicitly separated internal/burial/harv -> +76.00 net retention)
  const [lExternal, setLExternal] = useState<number>(156.62);
  const [lInternal, setLInternal] = useState<number>(0);
  const [lOutflow, setLOutflow] = useState<number>(80.62);
  const [lBurial, setLBurial] = useState<number>(0);
  const [lHarvesting, setLHarvesting] = useState<number>(0);

  const resetPhosphorusBaseline = () => {
    setLExternal(156.62);
    setLInternal(0);
    setLOutflow(80.62);
    setLBurial(0);
    setLHarvesting(0);
  };

  const totalInputs = lExternal + lInternal;
  const totalRemovals = lOutflow + lBurial + lHarvesting;
  const netStorageChange = Number((totalInputs - totalRemovals).toFixed(2));
  const retainedFractionPct =
    totalInputs > 0
      ? Math.max(0, Math.min(100, Number((((totalInputs - lOutflow) / totalInputs) * 100).toFixed(1))))
      : 0;

  return (
    <section
      id="habak-laboratory-workbench"
      role="region"
      aria-label="Habak Scientific Infrastructure & Phosphorus Accounting Workbench"
      className="my-10 border p-6 sm:p-8 space-y-6"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      {/* Header */}
      <div
        className="pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        <div className="space-y-1">
          <p className="hd-kicker">
            DISPATCH 05 · INTERACTIVE LIMNOLOGICAL &amp; INSTITUTIONAL AUDIT WORKBENCH
          </p>
          <h3
            className="hd-font-display text-2xl sm:text-3xl font-semibold"
            style={{ color: 'var(--hd-fg)' }}
          >
            Habak Diagnostic Gap, Phosphorus Balance &amp; Recovery Explorer
          </h3>
        </div>
        <span
          className="px-3 py-1.5 border text-[10px] hd-font-sans font-semibold tracking-[0.15em] uppercase shrink-0"
          style={{
            borderColor: 'var(--hd-copper)',
            color: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg)',
          }}
        >
          CAG 2011 &amp; 2025 Grounded · Diagnostic Model
        </span>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Habak workbench views">
        {(
          [
            {
              id: 'phosphorus',
              label: '01 · Phosphorus Balance (dM_P/dt)',
            },
            {
              id: 'audit',
              label: '02 · CAG Oversight & 2007–2020 Shifts',
            },
            {
              id: 'recovery',
              label: '03 · 16-Division Institute & Accountability',
            },
          ] as const
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 text-xs hd-font-sans font-semibold tracking-[0.12em] uppercase border transition-colors cursor-pointer"
              style={{
                borderColor: isActive ? 'var(--hd-copper)' : 'var(--hd-rule)',
                backgroundColor: isActive ? 'var(--hd-copper)' : 'var(--hd-bg)',
                color: isActive ? '#F2EFE7' : 'var(--hd-fg-secondary)',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PHOSPHORUS BALANCE */}
      {activeTab === 'phosphorus' && (
        <div className="space-y-6">
          {/* Documented 1998-99 CAG Baseline Strip */}
          <div
            className="p-4 sm:p-5 border space-y-3"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="hd-kicker">
                HISTORICAL PHOSPHORUS BALANCE · 1998–99 PROJECT ESTIMATES (CAG REPORT)
              </span>
              <button
                type="button"
                onClick={resetPhosphorusBaseline}
                className="inline-flex items-center gap-1.5 px-3 py-1 border text-[11px] hd-font-sans font-semibold uppercase tracking-[0.12em] cursor-pointer"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  color: 'var(--hd-fg)',
                  backgroundColor: 'var(--hd-bg-elevated)',
                }}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset 1998–99 Baseline</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 border" style={{ borderColor: 'var(--hd-rule)' }}>
                <span className="hd-folio-meta block">PHOSPHORUS INFLOW (1998–99)</span>
                <div
                  className="hd-font-display text-3xl font-semibold mt-1"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {PHOSPHORUS_BALANCE_1998_99.inflowTonnes} t
                </div>
              </div>
              <div className="p-3.5 border" style={{ borderColor: 'var(--hd-rule)' }}>
                <span className="hd-folio-meta block">PHOSPHORUS OUTFLOW (51.5%)</span>
                <div
                  className="hd-font-display text-3xl font-semibold mt-1"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {PHOSPHORUS_BALANCE_1998_99.outflowTonnes} t
                </div>
              </div>
              <div className="p-3.5 border" style={{ borderColor: 'var(--hd-copper)' }}>
                <span className="hd-folio-meta block">CALCULATED RETENTION (48.5%)</span>
                <div
                  className="hd-font-display text-3xl font-semibold mt-1"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  76 tonnes
                </div>
              </div>
            </div>

            <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
              {PHOSPHORUS_BALANCE_1998_99.strictCaveat}
            </p>
          </div>

          {/* Governing Differential Equation & Sensitivity Sliders */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <div
                className="p-4 border font-mono text-xs sm:text-sm"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                dM_P / dt = L_external + L_internal − L_outflow − L_burial − L_harvesting
              </div>

              {(
                [
                  {
                    label: 'External loading (L_external · sewage, streams, runoff)',
                    value: lExternal,
                    setter: setLExternal,
                    min: 20,
                    max: 260,
                  },
                  {
                    label: 'Internal sediment release (L_internal · unmeasured benthic flux)',
                    value: lInternal,
                    setter: setLInternal,
                    min: 0,
                    max: 120,
                  },
                  {
                    label: 'Outlet export (L_outflow · Dal Gate & Nallah Amir Khan)',
                    value: lOutflow,
                    setter: setLOutflow,
                    min: 10,
                    max: 180,
                  },
                  {
                    label: 'Permanent sediment burial (L_burial · deep diagenesis)',
                    value: lBurial,
                    setter: setLBurial,
                    min: 0,
                    max: 90,
                  },
                  {
                    label: 'Weighed biomass/dredge export (L_harvesting · dry-weight P)',
                    value: lHarvesting,
                    setter: setLHarvesting,
                    min: 0,
                    max: 80,
                  },
                ] as const
              ).map((ctrl) => (
                <label key={ctrl.label} className="block space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {ctrl.label}
                    </span>
                    <span
                      className="font-mono font-semibold"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {ctrl.value.toFixed(2)} t/yr
                    </span>
                  </div>
                  <input
                    type="range"
                    min={ctrl.min}
                    max={ctrl.max}
                    step={0.5}
                    value={ctrl.value}
                    onChange={(e) => ctrl.setter(parseFloat(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </label>
              ))}
            </div>

            <div
              className="lg:col-span-5 p-5 border flex flex-col justify-between space-y-4"
              style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }}
            >
              <div className="space-y-2">
                <span className="hd-kicker">SIMULATED WATER-COLUMN P STORAGE RATE (dM_P/dt)</span>
                <div
                  className="hd-font-display text-4xl font-semibold"
                  style={{
                    color: netStorageChange > 0 ? 'var(--hd-copper)' : 'var(--hd-fg)',
                  }}
                >
                  {netStorageChange > 0 ? `+${netStorageChange}` : netStorageChange} t P / yr
                </div>
                <p className="hd-font-body text-xs leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                  {netStorageChange > 0
                    ? `Net phosphorus accumulation persists (+${netStorageChange} t/yr; ${retainedFractionPct}% non-flushed fraction). Without a permanent limnological laboratory measuring L_internal, STP ortho-P effluent, and harvested dry-matter P, expenditure cannot be linked to trophic recovery.`
                    : `Simulated phosphorus drawdown (${netStorageChange} t/yr). Verifying this trajectory in the real lake requires continuous flow-weighted auto-sampling, benthic flux chambers, and weighed biomass tissue assays.`}
                </p>
              </div>

              <div className="space-y-1.5 pt-3 border-t text-xs" style={{ borderColor: 'var(--hd-rule)' }}>
                {PHOSPHORUS_BALANCE_1998_99.components.map(([term, desc]) => (
                  <div key={term}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{term}:</strong>{' '}
                    <span style={{ color: 'var(--hd-fg-muted)' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAG OVERSIGHT & 2007-2020 SHIFTS */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* 4 CAG 2011 Institutional Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HABAK_LABORATORY_SPEC.cag2011FailureStats.map((item) => (
              <div
                key={item.label}
                className="p-4 border space-y-1.5"
                style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
              >
                <div
                  className="hd-font-display text-2xl sm:text-3xl font-semibold"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  {item.value}
                </div>
                <div className="hd-folio-meta">{item.label}</div>
                <p className="hd-font-body text-[11px] leading-snug" style={{ color: 'var(--hd-fg-muted)' }}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>

          {/* Oversight Meeting Frequency Breakdown (9 of 51 held, ~82% missed) */}
          <div
            className="p-5 border space-y-4"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="hd-kicker">
                STATUTORY OVERSIGHT BREAKDOWN · 9 OF 51 EXPECTED MEETINGS HELD (~82% MISSED)
              </span>
              <span className="hd-folio-meta">CAG AUDIT 2011 (ILLUSTRATIVE FREQUENCY MEASURE)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OVERSIGHT_MEETINGS_BREAKDOWN.map((m) => (
                <div key={m.committee} className="p-4 border space-y-2" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="hd-folio-meta">{m.committee}</div>
                  <div className="flex items-baseline justify-between">
                    <span className="hd-font-display text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {m.held} of {m.expected}
                    </span>
                    <span className="font-mono text-xs font-semibold" style={{ color: 'var(--hd-copper)' }}>
                      {m.heldPct}% held · {m.missed} missed
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-300/30 overflow-hidden">
                    <div
                      className="h-full"
                      style={{ width: `${m.heldPct}%`, backgroundColor: 'var(--hd-copper)' }}
                    />
                  </div>
                  <p className="hd-font-body text-[11px]" style={{ color: 'var(--hd-fg-muted)' }}>
                    {m.auditNote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2007-2020 Remote Sensing & 7 Epochs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="p-5 border space-y-3"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
            >
              <span className="hd-kicker">DAL LAKE REMOTE-SENSING SHIFTS (2007–2020 · CAG 2025)</span>
              <div className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {REMOTE_SENSING_SHIFTS_2007_2020.map((row) => (
                  <div key={row.category} className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {row.category}
                    </span>
                    <span
                      className="font-mono font-semibold shrink-0"
                      style={{ color: row.direction === 'loss' ? 'var(--hd-copper)' : 'var(--hd-fg)' }}
                    >
                      {row.displayDelta}
                    </span>
                  </div>
                ))}
              </div>
              <p className="hd-font-body text-[11px] italic" style={{ color: 'var(--hd-fg-muted)' }}>
                Reflects multi-stressor catchment, sewage, hydrological, and land-use pressures—not exclusively laboratory displacement.
              </p>
            </div>

            <div
              className="p-5 border space-y-3"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
            >
              <span className="hd-kicker">SEVEN HISTORICAL GOVERNANCE EPOCHS (1990s–2026)</span>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {HISTORICAL_TIMELINE_7_EPOCHS.map((ep) => (
                  <div key={ep.era} className="p-2.5 border text-xs" style={{ borderColor: 'var(--hd-rule)' }}>
                    <span className="font-mono font-semibold" style={{ color: 'var(--hd-copper)' }}>
                      {ep.era} — {ep.title}:
                    </span>{' '}
                    <span className="hd-font-body" style={{ color: 'var(--hd-fg-secondary)' }}>
                      {ep.summary}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RECOVERY INITIATIVE & 12-INSTITUTION ACCOUNTABILITY */}
      {activeTab === 'recovery' && (
        <div className="space-y-6">
          <div
            className="p-5 border space-y-3"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="hd-kicker">
                PROPOSED ARCHITECTURE · WESTERN HIMALAYAN INSTITUTE OF AQUATIC SCIENCES (16 DIVISIONS)
              </span>
              <span className="hd-folio-meta">EDITORIAL &amp; SCIENTIFIC PROPOSAL</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PROPOSED_AQUATIC_INSTITUTE_16_DIVISIONS.map((div, idx) => (
                <div
                  key={div}
                  className="p-3 border text-xs hd-font-body"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg)' }}
                >
                  <span className="font-mono text-[10px] block" style={{ color: 'var(--hd-copper)' }}>
                    DIV-{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold">{div}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="p-5 border space-y-3"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
            >
              <span className="hd-kicker">FIVE GLOBAL FRESHWATER INSTITUTIONAL BENCHMARKS</span>
              <div className="space-y-2.5">
                {INTERNATIONAL_AQUATIC_INSTITUTES_5.map((inst) => (
                  <div key={inst.name} className="p-3 border text-xs space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div className="font-semibold" style={{ color: 'var(--hd-fg)' }}>
                      {inst.name} ({inst.country})
                    </div>
                    <p style={{ color: 'var(--hd-fg-secondary)' }}>{inst.model}</p>
                    <p className="italic" style={{ color: 'var(--hd-copper)' }}>
                      Lesson for Kashmir: {inst.lessonForKashmir}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-5 border space-y-3"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
            >
              <span className="hd-kicker">12 ACCOUNTABLE INSTITUTIONS · RIGHT OF RESPONSE</span>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {TWELVE_INSTITUTIONAL_RESPONSIBILITIES.map(([inst, role]) => (
                  <div key={inst} className="p-2.5 border text-xs" style={{ borderColor: 'var(--hd-rule)' }}>
                    <strong style={{ color: 'var(--hd-fg)' }}>{inst}:</strong>{' '}
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
