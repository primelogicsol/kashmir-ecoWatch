'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type EncroachmentTab = 'valuation' | 'recovery' | 'datasets';

const KANALS_PER_HECTARE = 19.7684;
const CAG_OPEN_WATER_LOSS_HA = 249.8; // 2007 (1,540.5 ha) -> 2020 (1,290.7 ha)
const ACRES_PER_HECTARE = 2.47105;

/**
 * Interactive forensic workbench implementing Parts III, IX, XVI, XVII, XVIII & XXIII of
 * "The Art of Encroachment: How Dal Lake Is Being Turned into Real Estate":
 * 1. Potential Land-Value Calculator (default 100 kanals @ ₹50 lakh/kanal -> ₹50 crore, 5.06 ha)
 * 2. Net Aquatic Area Recovered & Habitat Restoration Scenario (default 100 ha -> 1.00 km², 1,977 kanals, 40.0% of CAG loss, 247 acres; plus A_net_recovery = A_restored - A_newly_converted)
 * 3. Multi-Dataset Historical & CAG Balance Sheet Reconciliation (1859–2026)
 */
export function DalLakeEncroachmentWorkbench({
  variant = 'monograph',
}: {
  variant?: 'editorial' | 'monograph';
}) {
  const [activeTab, setActiveTab] = useState<EncroachmentTab>('valuation');

  // Tab 1: Land Valuation Scenario Defaults (Part XVI)
  const [landAreaKanals, setLandAreaKanals] = useState<number>(100);
  const [valuePerKanalLakh, setValuePerKanalLakh] = useState<number>(50);

  // Tab 2: Net Aquatic Recovery & Restoration Defaults (Parts XVII & XXIII)
  const [restoredAreaHa, setRestoredAreaHa] = useState<number>(100);
  const [newlyConvertedHa, setNewlyConvertedHa] = useState<number>(0);

  // Exact Valuation Calculations
  const aggregateValueCrore = (landAreaKanals * valuePerKanalLakh) / 100;
  const equivalentValuationHa = landAreaKanals / KANALS_PER_HECTARE;

  // Exact Restoration & Net Aquatic Recovery Calculations
  const restoredKm2 = restoredAreaHa / 100;
  const restoredKanals = Math.round(restoredAreaHa * KANALS_PER_HECTARE);
  const restoredAcres = Math.round(restoredAreaHa * ACRES_PER_HECTARE);
  const shareOfCagLossPct = (restoredAreaHa / CAG_OPEN_WATER_LOSS_HA) * 100;
  const netAquaticRecoveryHa = restoredAreaHa - newlyConvertedHa;
  const netAquaticRecoveryKanals = Math.round(netAquaticRecoveryHa * KANALS_PER_HECTARE);

  const resetValuation = () => {
    setLandAreaKanals(100);
    setValuePerKanalLakh(50);
  };

  const resetRecovery = () => {
    setRestoredAreaHa(100);
    setNewlyConvertedHa(0);
  };

  return (
    <div
      className={`${variant === 'editorial' ? 'my-10' : ''} p-6 sm:p-8 border space-y-6`}
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-4"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        <div className="space-y-1">
          <p className="hd-kicker">
            FORENSIC GEOSPATIAL &amp; ECONOMIC WORKBENCH · DAL–NIGEEN LAKE SYSTEM
          </p>
          <h3
            className="hd-font-display text-2xl sm:text-3xl font-semibold"
            style={{ color: 'var(--hd-fg)' }}
          >
            Land-Value Incentives, Net Aquatic Recovery &amp; Dataset Reconciliation
          </h3>
          <p
            className="hd-font-body text-xs sm:text-sm max-w-3xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Parametric models illustrating private property incentives, the{' '}
            <em>Net Aquatic Area Recovered</em> enforcement standard, and boundary/classification
            differences across 1859–2026 Dal Lake datasets.
          </p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'valuation' as const, label: '01 · Land-Value Scenario' },
          { id: 'recovery' as const, label: '02 · Net Aquatic Area Recovered' },
          { id: 'datasets' as const, label: '03 · 1859–2026 Dataset Ledger' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="px-3.5 py-2 border text-[11px] hd-font-sans tracking-[0.14em] uppercase transition-colors"
              style={{
                borderColor: active ? 'var(--hd-copper)' : 'var(--hd-rule)',
                backgroundColor: active ? 'var(--hd-bg)' : 'transparent',
                color: active ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                fontWeight: active ? 700 : 500,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: POTENTIAL LAND-VALUE CALCULATOR (PART XVI) */}
      {activeTab === 'valuation' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <p className="hd-folio-meta">
              HYPOTHETICAL SCENARIO ONLY — NOT AN ASSESSMENT OF ACTUAL OCCUPIED LAND OR PRICES
            </p>
            <button
              type="button"
              onClick={resetValuation}
              className="inline-flex items-center gap-1.5 text-[11px] hd-font-sans tracking-[0.14em] uppercase underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset scenario</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Land area (kanals)</span>
                <strong style={{ color: 'var(--hd-fg)' }}>{landAreaKanals} kanals</strong>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={landAreaKanals}
                onChange={(e) => setLandAreaKanals(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
              <span className="hd-folio-meta block">Default: 100 kanals (5.06 hectares)</span>
            </label>

            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Assumed value per kanal</span>
                <strong style={{ color: 'var(--hd-fg)' }}>₹{valuePerKanalLakh} lakh</strong>
              </div>
              <input
                type="range"
                min={5}
                max={150}
                step={5}
                value={valuePerKanalLakh}
                onChange={(e) => setValuePerKanalLakh(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
              <span className="hd-folio-meta block">Default: ₹50 lakh per kanal</span>
            </label>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 border"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">ILLUSTRATIVE AGGREGATE LAND VALUE</span>
              <div
                className="hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                ₹{aggregateValueCrore.toFixed(aggregateValueCrore % 1 === 0 ? 0 : 2)} crore
              </div>
            </div>
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">EQUIVALENT LAND AREA</span>
              <div
                className="hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {equivalentValuationHa.toFixed(2)} ha
              </div>
            </div>
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">SHARE OF 2007–2020 BUILT + CROP EXPANSION</span>
              <div
                className="hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {((equivalentValuationHa / 84.1) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
            Forensic boundary: Actual investigation requires registered sale deeds, circle rates,
            revenue mutations, and legal differentiation between historical lake-dweller households,
            commercial enterprises, speculative developers, and public infrastructure.
          </p>
        </div>
      )}

      {/* TAB 2: NET AQUATIC AREA RECOVERED & RESTORATION SCENARIO (PARTS XVII & XXIII) */}
      {activeTab === 'recovery' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <p className="hd-folio-meta">
              HYPOTHETICAL RESTORATION TARGETS — A_NET_RECOVERY = A_RESTORED − A_NEWLY_CONVERTED
            </p>
            <button
              type="button"
              onClick={resetRecovery}
              className="inline-flex items-center gap-1.5 text-[11px] hd-font-sans tracking-[0.14em] uppercase underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset scenario</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>
                  Ecologically restored water area (ha)
                </span>
                <strong style={{ color: 'var(--hd-fg)' }}>{restoredAreaHa} hectares</strong>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                step={10}
                value={restoredAreaHa}
                onChange={(e) => setRestoredAreaHa(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
              <span className="hd-folio-meta block">
                Default: 100 ha (1.00 km² · 1,977 kanals · 247 acres)
              </span>
            </label>

            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>
                  Newly converted area over same period (ha)
                </span>
                <strong style={{ color: 'var(--hd-fg)' }}>{newlyConvertedHa} hectares</strong>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={newlyConvertedHa}
                onChange={(e) => setNewlyConvertedHa(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
              <span className="hd-folio-meta block">
                Tests why demolitions without preventing new filling can yield net loss
              </span>
            </label>
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-5 border"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="space-y-1">
              <span className="hd-folio-meta">RECOVERED WATER AREA</span>
              <div
                className="hd-font-display text-2xl sm:text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {restoredKm2.toFixed(2)} km²
              </div>
            </div>
            <div className="space-y-1">
              <span className="hd-folio-meta">EQUIVALENT KANALS</span>
              <div
                className="hd-font-display text-2xl sm:text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {restoredKanals.toLocaleString('en-US')}
              </div>
            </div>
            <div className="space-y-1">
              <span className="hd-folio-meta">VS. CAG 2007–2020 LOSS</span>
              <div
                className="hd-font-display text-2xl sm:text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {shareOfCagLossPct.toFixed(1)}%
              </div>
            </div>
            <div className="space-y-1">
              <span className="hd-folio-meta">EQUIVALENT ACRES</span>
              <div
                className="hd-font-display text-2xl sm:text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {restoredAcres.toLocaleString('en-US')}
              </div>
            </div>
            <div className="space-y-1">
              <span className="hd-folio-meta">NET AQUATIC RECOVERY</span>
              <div
                className="hd-font-display text-2xl sm:text-3xl font-semibold tabular-nums"
                style={{ color: netAquaticRecoveryHa >= 0 ? 'var(--hd-copper)' : '#dc2626' }}
              >
                {netAquaticRecoveryHa >= 0 ? '+' : ''}
                {netAquaticRecoveryHa} ha ({netAquaticRecoveryKanals >= 0 ? '+' : ''}
                {netAquaticRecoveryKanals.toLocaleString('en-US')} kn)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MULTI-DATASET & CAG PERCENTAGE RECONCILIATION */}
      {activeTab === 'datasets' && (
        <div className="space-y-5">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="space-y-1">
              <p className="hd-kicker">CAG / EE&amp;RSD 2007–2020 PERCENTAGE DISTINCTION</p>
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                Open water + submerged vegetation fell from <strong>1,540.5 ha</strong> (62.61% of
                2,460.5 ha) to <strong>1,290.7 ha</strong> (52.46%)—a loss of{' '}
                <strong>249.8 ha</strong> (4,938 kanals). Relative to total lake area, that is{' '}
                <strong>10.15 percentage points</strong>; relative to the 2007 open-water +
                submerged-vegetation baseline itself, it is a <strong>16.22% reduction</strong>.
              </p>
            </div>
            <div className="space-y-1">
              <p className="hd-kicker">2026 OPEN-WATER ESTIMATE DISCREPANCY (6.35 KM²)</p>
              <p className="hd-font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                2026 government restoration reports cite <strong>&gt;20.3 km²</strong> open water
                (after ~6.5 km² vegetation clearance), whereas KEW&apos;s Lake Encroachment
                Observatory lists <strong>13.95 km²</strong> (1,395 ha). Both require matched-season,
                water-level-standardized Sentinel-1/2 verification across identical boundaries.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
