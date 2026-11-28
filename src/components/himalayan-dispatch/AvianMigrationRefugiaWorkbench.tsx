'use client';

import React, { useState } from 'react';

/**
 * Interactive ecological simulation demonstrating Section 5 & Section 6 of
 * "The Sky Has No Borders": why rising waterbird counts inside four core
 * reserves can represent habitat compression (refugia crowding) rather than
 * basin-wide wetland recovery when surrounding marshes degrade.
 */
export function AvianMigrationRefugiaWorkbench() {
  const [degradedPeripheralPercent, setDegradedPeripheralPercent] = useState<number>(65);
  const [surveyEffortChangePercent, setSurveyEffortChangePercent] = useState<number>(15);
  const [trueFlywayTrendPercent, setTrueFlywayTrendPercent] = useState<number>(0);

  const baselineTotal = 813043; // 2020 reported Kashmir waterbird census baseline
  const baselineCoreShare = 0.72; // Illustrative initial share in top 4 reserves

  const trueFlywayPool = Math.round(baselineTotal * (1 + trueFlywayTrendPercent / 100));
  const initialCoreBirds = trueFlywayPool * baselineCoreShare;
  const initialPeripheralBirds = trueFlywayPool * (1 - baselineCoreShare);

  // Displaced peripheral birds crowding into the 4 surviving core Ramsar/protected mirrors
  const displacedIntoCore = initialPeripheralBirds * (degradedPeripheralPercent / 100) * 0.78;
  const survivingPeripheral = initialPeripheralBirds * (1 - degradedPeripheralPercent / 100);

  const simulatedCoreCount = Math.round(
    (initialCoreBirds + displacedIntoCore) * (1 + surveyEffortChangePercent / 100)
  );
  const simulatedPeripheralCount = Math.round(
    survivingPeripheral * (1 + surveyEffortChangePercent / 100)
  );
  const simulatedReportedTotal = simulatedCoreCount + simulatedPeripheralCount;
  const simulatedCoreConcentration =
    simulatedReportedTotal > 0
      ? ((simulatedCoreCount / simulatedReportedTotal) * 100).toFixed(1)
      : '0.0';
  const apparentTotalDeltaPercent = (
    ((simulatedReportedTotal - baselineTotal) / baselineTotal) *
    100
  ).toFixed(1);

  return (
    <div
      className="p-6 sm:p-8 border space-y-6"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
        <div className="space-y-1">
          <p className="hd-kicker">VOLUME V &amp; VIII · INTERACTIVE POPULATION DIAGNOSTIC</p>
          <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
            Refugia Compression vs. True Flyway Growth Simulator
          </h3>
          <p className="hd-font-body text-xs sm:text-sm max-w-3xl" style={{ color: 'var(--hd-fg-secondary)' }}>
            Tests how peripheral wetland loss and observer-coverage shifts can produce higher
            headline census totals while crowding nearly 96% of wintering waterfowl into four
            surviving reserves.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setDegradedPeripheralPercent(65);
            setSurveyEffortChangePercent(15);
            setTrueFlywayTrendPercent(0);
          }}
          className="hd-kicker underline hover:opacity-80 shrink-0"
        >
          Reset Scenario
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="hd-folio-meta">PERIPHERAL MARSH LOSS / DISPLACEMENT</span>
              <span className="font-mono font-semibold">{degradedPeripheralPercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={95}
              step={5}
              value={degradedPeripheralPercent}
              onChange={(e) => setDegradedPeripheralPercent(Number(e.target.value))}
              aria-label="Peripheral marsh habitat loss percentage"
              className="w-full accent-[#8C3125]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="hd-folio-meta">CENSUS COVERAGE &amp; EFFORT EXPANSION</span>
              <span className="font-mono font-semibold">
                {surveyEffortChangePercent >= 0 ? `+${surveyEffortChangePercent}%` : `${surveyEffortChangePercent}%`}
              </span>
            </div>
            <input
              type="range"
              min={-20}
              max={60}
              step={5}
              value={surveyEffortChangePercent}
              onChange={(e) => setSurveyEffortChangePercent(Number(e.target.value))}
              aria-label="Survey coverage and counting effort change percentage"
              className="w-full accent-[#8C3125]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="hd-folio-meta">TRUE UNDERLYING FLYWAY POPULATION CHANGE</span>
              <span className="font-mono font-semibold">
                {trueFlywayTrendPercent >= 0 ? `+${trueFlywayTrendPercent}%` : `${trueFlywayTrendPercent}%`}
              </span>
            </div>
            <input
              type="range"
              min={-30}
              max={40}
              step={5}
              value={trueFlywayTrendPercent}
              onChange={(e) => setTrueFlywayTrendPercent(Number(e.target.value))}
              aria-label="True underlying flyway population trend percentage"
              className="w-full accent-[#8C3125]"
            />
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="p-4 border-l-2 space-y-1"
            style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}
          >
            <p className="hd-folio-meta">SIMULATED REPORTED COUNT</p>
            <p className="hd-font-display text-3xl font-semibold tabular-nums" style={{ color: 'var(--hd-fg)' }}>
              {simulatedReportedTotal.toLocaleString()}
            </p>
            <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
              {Number(apparentTotalDeltaPercent) >= 0 ? `+${apparentTotalDeltaPercent}%` : `${apparentTotalDeltaPercent}%`} vs. 2020 baseline (813,043)
            </p>
          </div>

          <div
            className="p-4 border-l-2 space-y-1"
            style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}
          >
            <p className="hd-folio-meta">CONCENTRATION IN 4 WETLANDS</p>
            <p className="hd-font-display text-3xl font-semibold tabular-nums" style={{ color: 'var(--hd-copper)' }}>
              {simulatedCoreConcentration}%
            </p>
            <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-secondary)' }}>
              Oct 2026 RTI benchmark: ~96% in 4 sites
            </p>
          </div>

          <div
            className="sm:col-span-2 p-4 border space-y-1 text-xs hd-font-body"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <strong style={{ color: 'var(--hd-fg)' }}>Diagnostic interpretation:</strong>{' '}
            <span style={{ color: 'var(--hd-fg-secondary)' }}>
              Even when true flyway abundance is {trueFlywayTrendPercent === 0 ? 'unchanged (0%)' : `${trueFlywayTrendPercent}%`}, displacing peripheral marsh birds into four core sanctuaries while expanding census points can inflate headline totals while increasing disease, disturbance, and food-depletion vulnerability.
            </span>
          </div>
        </div>
      </div>

      <p
        className="hd-font-body text-xs italic pt-3 border-t"
        style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
      >
        Methodological note: Illustrative sensitivity model anchored to the reported 2020 (813,043)
        and 2025 (1,343,506) Kashmir waterbird census counts and October 2026 RTI concentration
        disclosures (~96% in four wetlands). Effort-adjusted hierarchical occupancy modelling awaits
        release of complete station-level species matrices.
      </p>
    </div>
  );
}
