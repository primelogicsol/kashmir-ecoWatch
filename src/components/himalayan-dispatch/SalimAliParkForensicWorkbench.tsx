'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type WorkbenchTab = 'irrigation' | 'nutrients' | 'cadastral';

interface BaselineOption {
  id: string;
  label: string;
  source: string;
  totalHa: number;
}

const PARK_BASELINES: BaselineOption[] = [
  {
    id: 'nbwl-2005',
    label: '8.85 km² (885 ha) — October 2005 NBWL Proceedings Baseline',
    source: 'National Board for Wildlife Standing Committee Minutes (4 Oct 2005)',
    totalHa: 885,
  },
  {
    id: 'jk-inventory',
    label: '9.07 km² (907 ha) — J&K Protected-Area Inventory Baseline',
    source: 'J&K Wildlife Protection inventories & KEW Gazette Archive',
    totalHa: 907,
  },
  {
    id: 'wii-historical',
    label: '9.00 km² (900 ha) — Historical Inventory (1986) & WII Database (1992)',
    source: 'Wildlife Institute of India Protected Area Gazette Database',
    totalHa: 900,
  },
  {
    id: 'ornithological',
    label: '8.69 km² (869 ha) — Recent Ornithological Literature Baseline',
    source: 'Published regional ornithological assessments (requires reconciliation)',
    totalHa: 869,
  },
];

/**
 * Interactive forensic workbench implementing Parts II, III, and VI of
 * "The National Park That Became a Golf Course":
 * 1. Golf Course Irrigation Scenario Calculator (default 60 ha, 400 mm, 75% -> 320M L / 320,000 m³ / 0.88 MLD)
 * 2. Illustrative Annual Nutrient Export Scenario (default 60 ha, 100 kg N, 15 kg P, 5% -> 6.00 t N, 0.90 t P, 300 kg/yr N, 45 kg/yr P)
 * 3. Protected Area Arithmetic & Cadastral Reconciliation (907/885 ha vs. 162 ha denotified vs. 121.4 ha golf course vs. 40.6 ha gap & 723 ha remainder)
 */
export function SalimAliParkForensicWorkbench({
  variant = 'monograph',
}: {
  variant?: 'editorial' | 'monograph';
}) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('irrigation');

  // Tab 1: Irrigation Scenario Defaults (Part VI · Section 12)
  const [irrigatedAreaHa, setIrrigatedAreaHa] = useState<number>(60);
  const [netIrrigationMm, setNetIrrigationMm] = useState<number>(400);
  const [irrigationEfficiencyPct, setIrrigationEfficiencyPct] = useState<number>(75);

  // Tab 2: Nutrient Export Scenario Defaults (Part VI · Section 13)
  const [fertilizedAreaHa, setFertilizedAreaHa] = useState<number>(60);
  const [nitrogenRateKgHa, setNitrogenRateKgHa] = useState<number>(100);
  const [phosphorusRateKgHa, setPhosphorusRateKgHa] = useState<number>(15);
  const [exportFractionPct, setExportFractionPct] = useState<number>(5);

  // Tab 3: Area Baseline Selector (Part II · Section 3)
  const [selectedBaselineId, setSelectedBaselineId] = useState<string>('nbwl-2005');

  // Exact Irrigation Calculations
  const grossDepthMeters =
    irrigationEfficiencyPct > 0 ? netIrrigationMm / 1000 / (irrigationEfficiencyPct / 100) : 0;
  const annualVolumeM3 = Math.round(irrigatedAreaHa * 10000 * grossDepthMeters);
  const annualMillionLitres = annualVolumeM3 / 1000;
  const dailyEquivalentMld = annualMillionLitres / 365;

  // Exact Nutrient Calculations
  const annualNitrogenKg = fertilizedAreaHa * nitrogenRateKgHa;
  const annualPhosphorusKg = fertilizedAreaHa * phosphorusRateKgHa;
  const annualNitrogenTonnes = annualNitrogenKg / 1000;
  const annualPhosphorusTonnes = annualPhosphorusKg / 1000;
  const potentialNitrogenExportKg = annualNitrogenKg * (exportFractionPct / 100);
  const potentialPhosphorusExportKg = annualPhosphorusKg * (exportFractionPct / 100);

  // Exact Cadastral Arithmetic Reconstruction
  const activeBaseline =
    PARK_BASELINES.find((b) => b.id === selectedBaselineId) || PARK_BASELINES[0];
  const reportedDenotifiedHa = 162;
  const advertisedGolfCourseHa = 121.4; // ~300 acres
  const cadastralDifferenceHa = +(reportedDenotifiedHa - advertisedGolfCourseHa).toFixed(1); // 40.6 ha
  const mathematicalRemainderHa = +(activeBaseline.totalHa - reportedDenotifiedHa).toFixed(1);
  const denotifiedPct = +((reportedDenotifiedHa / activeBaseline.totalHa) * 100).toFixed(1);
  const remainderPct = +(100 - denotifiedPct).toFixed(1);

  const resetIrrigation = () => {
    setIrrigatedAreaHa(60);
    setNetIrrigationMm(400);
    setIrrigationEfficiencyPct(75);
  };

  const resetNutrients = () => {
    setFertilizedAreaHa(60);
    setNitrogenRateKgHa(100);
    setPhosphorusRateKgHa(15);
    setExportFractionPct(5);
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
            FORENSIC SCENARIO WORKBENCH · HYDROLOGY, NUTRIENTS &amp; CADASTRAL ARITHMETIC
          </p>
          <h3
            className="hd-font-display text-2xl sm:text-3xl font-semibold"
            style={{ color: 'var(--hd-fg)' }}
          >
            Sálim Ali National Park &amp; Royal Springs Quantitative Diagnostics
          </h3>
          <p
            className="hd-font-body text-xs sm:text-sm max-w-3xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Illustrative parametric models demonstrating the water abstraction, elemental nitrogen
            and phosphorus inputs, and statutory area reconciliation questions requiring primary
            procurement, metering, and cadastral verification.
          </p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'irrigation' as const, label: '01 · Irrigation Demand Calculator' },
          { id: 'nutrients' as const, label: '02 · Nutrient Export Scenario' },
          { id: 'cadastral' as const, label: '03 · Park Area & NBWL Ledger' },
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

      {/* TAB 1: GOLF COURSE IRRIGATION SCENARIO CALCULATOR */}
      {activeTab === 'irrigation' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <p className="hd-folio-meta">
              ILLUSTRATIVE CALCULATIONS — NOT ACTUAL ROYAL SPRINGS GOLF COURSE CONSUMPTION
            </p>
            <button
              type="button"
              onClick={resetIrrigation}
              className="inline-flex items-center gap-1.5 text-[11px] hd-font-sans tracking-[0.14em] uppercase underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset scenario</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Irrigated turf area</span>
                <strong style={{ color: 'var(--hd-fg)' }}>{irrigatedAreaHa} ha</strong>
              </div>
              <input
                type="range"
                min={20}
                max={125}
                step={5}
                value={irrigatedAreaHa}
                onChange={(e) => setIrrigatedAreaHa(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
              <span className="hd-folio-meta block">Default: 60 ha (out of ~121.4 ha course)</span>
            </label>

            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>
                  Annual net irrigation requirement
                </span>
                <strong style={{ color: 'var(--hd-fg)' }}>{netIrrigationMm} mm</strong>
              </div>
              <input
                type="range"
                min={150}
                max={800}
                step={25}
                value={netIrrigationMm}
                onChange={(e) => setNetIrrigationMm(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
              <span className="hd-folio-meta block">Default: 400 mm net seasonal depth</span>
            </label>

            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Irrigation efficiency</span>
                <strong style={{ color: 'var(--hd-fg)' }}>{irrigationEfficiencyPct}%</strong>
              </div>
              <input
                type="range"
                min={50}
                max={95}
                step={5}
                value={irrigationEfficiencyPct}
                onChange={(e) => setIrrigationEfficiencyPct(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
              <span className="hd-folio-meta block">Default: 75% sprinkler delivery</span>
            </label>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 border"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">ESTIMATED ANNUAL GROSS REQUIREMENT</span>
              <div
                className="hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {annualMillionLitres.toFixed(0)} million litres
              </div>
            </div>
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">ANNUAL GROSS VOLUME</span>
              <div
                className="hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {annualVolumeM3.toLocaleString('en-US')} m³
              </div>
            </div>
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">ANNUAL DAILY EQUIVALENT</span>
              <div
                className="hd-font-display text-3xl sm:text-4xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {dailyEquivalentMld.toFixed(2)} MLD
              </div>
            </div>
          </div>

          <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
            Methodological note: Annual net irrigation depth should account for effective rainfall,
            evapotranspiration, and soil moisture. Actual daily demand varies seasonally; verified
            spring, borewell, or surface-water abstraction permits and pumping logs remain to be
            retrieved.
          </p>
        </div>
      )}

      {/* TAB 2: ILLUSTRATIVE ANNUAL NUTRIENT EXPORT SCENARIO */}
      {activeTab === 'nutrients' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            <p className="hd-folio-meta">
              ELEMENTAL N &amp; P SCENARIO — ILLUSTRATIVE EXPORT FRACTION, NOT MEASURED LOCAL RUNOFF
            </p>
            <button
              type="button"
              onClick={resetNutrients}
              className="inline-flex items-center gap-1.5 text-[11px] hd-font-sans tracking-[0.14em] uppercase underline"
              style={{ color: 'var(--hd-copper)' }}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset scenario</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Fertilized area</span>
                <strong style={{ color: 'var(--hd-fg)' }}>{fertilizedAreaHa} ha</strong>
              </div>
              <input
                type="range"
                min={20}
                max={125}
                step={5}
                value={fertilizedAreaHa}
                onChange={(e) => setFertilizedAreaHa(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
            </label>

            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Nitrogen application</span>
                <strong style={{ color: 'var(--hd-fg)' }}>{nitrogenRateKgHa} kg/ha/yr</strong>
              </div>
              <input
                type="range"
                min={20}
                max={250}
                step={10}
                value={nitrogenRateKgHa}
                onChange={(e) => setNitrogenRateKgHa(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
            </label>

            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Phosphorus application</span>
                <strong style={{ color: 'var(--hd-fg)' }}>{phosphorusRateKgHa} kg/ha/yr</strong>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={phosphorusRateKgHa}
                onChange={(e) => setPhosphorusRateKgHa(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
            </label>

            <label className="space-y-2 block">
              <div className="flex justify-between text-xs hd-font-body">
                <span style={{ color: 'var(--hd-fg-secondary)' }}>Assumed export fraction</span>
                <strong style={{ color: 'var(--hd-fg)' }}>{exportFractionPct}%</strong>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                step={1}
                value={exportFractionPct}
                onChange={(e) => setExportFractionPct(Number(e.target.value))}
                className="w-full accent-[#8C3125]"
              />
            </label>
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-5 border"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">ANNUAL NITROGEN APPLIED</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {annualNitrogenTonnes.toFixed(2)} t
              </div>
            </div>
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">ANNUAL PHOSPHORUS APPLIED</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {annualPhosphorusTonnes.toFixed(2)} t
              </div>
            </div>
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">POTENTIAL NITROGEN EXPORT</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {Math.round(potentialNitrogenExportKg).toLocaleString('en-US')} kg/yr
              </div>
            </div>
            <div className="border-l-2 pl-4 space-y-1" style={{ borderColor: 'var(--hd-copper)' }}>
              <span className="hd-folio-meta">POTENTIAL PHOSPHORUS EXPORT</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {Math.round(potentialPhosphorusExportKg).toLocaleString('en-US')} kg/yr
              </div>
            </div>
          </div>

          <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
            Scientific boundary: All application rates refer to elemental nitrogen and phosphorus.
            Export from treated turf does not necessarily equal nutrient delivery to Dal Lake;
            actual transport requires separate N and P runoff coefficients, soil retention testing,
            and hydrological pathway measurements.
          </p>
        </div>
      )}

      {/* TAB 3: PROTECTED AREA ARITHMETIC & NBWL COMPLIANCE LEDGER */}
      {activeTab === 'cadastral' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="hd-folio-meta block">
              SELECT REPORTED ORIGINAL PARK EXTENT FOR ARITHMETIC RECONSTRUCTION
            </label>
            <select
              value={selectedBaselineId}
              onChange={(e) => setSelectedBaselineId(e.target.value)}
              className="w-full p-2.5 border text-xs sm:text-sm hd-font-body"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
                color: 'var(--hd-fg)',
              }}
            >
              {PARK_BASELINES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
            <p className="hd-folio-meta">Source: {activeBaseline.source}</p>
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-5 border"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <div className="space-y-1">
              <span className="hd-folio-meta">REPORTED ORIGINAL EXTENT</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {activeBaseline.totalHa} ha
              </div>
              <span className="hd-folio-meta block">100% baseline</span>
            </div>

            <div className="space-y-1">
              <span className="hd-folio-meta">OCT 2005 REPORTED DENOTIFICATION</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-copper)' }}
              >
                {reportedDenotifiedHa} ha
              </div>
              <span className="hd-folio-meta block">{denotifiedPct}% of baseline</span>
            </div>

            <div className="space-y-1">
              <span className="hd-folio-meta">ADVERTISED GOLF COURSE AREA</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {advertisedGolfCourseHa} ha
              </div>
              <span className="hd-folio-meta block">
                ~300 acres · {cadastralDifferenceHa} ha gap vs. 162 ha
              </span>
            </div>

            <div className="space-y-1">
              <span className="hd-folio-meta">MATHEMATICAL REMAINDER</span>
              <div
                className="hd-font-display text-3xl font-semibold tabular-nums"
                style={{ color: 'var(--hd-fg)' }}
              >
                {mathematicalRemainderHa} ha
              </div>
              <span className="hd-folio-meta block">
                {remainderPct}% · Requires cadastral &amp; statutory audit
              </span>
            </div>
          </div>

          {/* October 4, 2005 NBWL 8-Recommendation Compliance Breakdown */}
          <div
            className="p-4 border space-y-2.5"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <p className="hd-kicker">
              STATE GOVERNMENT RESPONSE TO 8 EXPERT RECOMMENDATIONS · NBWL PROCEEDINGS (4 OCT 2005)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm hd-font-body">
              <div>
                <strong style={{ color: 'var(--hd-fg)' }}>Accepted: 4 of 8 (50.0%)</strong>
                <p style={{ color: 'var(--hd-fg-muted)' }}>
                  Partial acceptance recorded in Standing Committee minutes.
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--hd-copper)' }}>Deferred: 3 of 8 (37.5%)</strong>
                <p style={{ color: 'var(--hd-fg-muted)' }}>
                  Pending monitoring, safeguard, or inter-departmental clarification.
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--hd-fg)' }}>Not Approved: 1 of 8 (12.5%)</strong>
                <p style={{ color: 'var(--hd-fg-muted)' }}>
                  Transfer of Shankaracharya Reserve to the Wildlife Department.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
