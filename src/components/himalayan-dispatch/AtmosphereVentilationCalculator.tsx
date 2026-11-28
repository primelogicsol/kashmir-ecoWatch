'use client';

import React, { useState } from 'react';

export function AtmosphereVentilationCalculator() {
  const [mixingHeightMeters, setMixingHeightMeters] = useState<number>(250);
  const [windSpeedMps, setWindSpeedMps] = useState<number>(1.5);

  const vc = Math.round(mixingHeightMeters * windSpeedMps);

  const regimeLabel =
    vc < 600
      ? 'Severe Trapping Regime (Illustrative Reference)'
      : vc < 2000
      ? 'Restricted Mountain-Basin Ventilation (Illustrative Reference)'
      : vc < 6000
      ? 'Moderate Convective Dispersion (Illustrative Reference)'
      : 'Well-Ventilated Synoptic Flushing (Illustrative Reference)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* 1. Interactive Ventilation Coefficient Calculator (Chapter 10) */}
      <div
        className="lg:col-span-5 p-6 sm:p-8 border space-y-5"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="space-y-1.5">
          <p className="hd-kicker">VOLUME II · CHAPTER 10 · INTERACTIVE DIAGNOSTIC</p>
          <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold">
            Atmospheric Ventilation Calculator
          </h3>
          <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
            Simplified basin ventilation index:{' '}
            <span className="font-mono font-semibold">VC = H_mix × U</span>
          </p>
        </div>

        <div className="space-y-4 pt-1">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="hd-folio-meta">MIXING-LAYER HEIGHT (H_mix)</span>
              <span className="font-mono font-semibold">{mixingHeightMeters} m</span>
            </div>
            <input
              type="range"
              min={100}
              max={1500}
              step={10}
              value={mixingHeightMeters}
              onChange={(e) => setMixingHeightMeters(Number(e.target.value))}
              aria-label="Mixing-layer height in metres"
              className="w-full accent-[#8C3125]"
            />
            <div className="flex justify-between text-[11px]" style={{ color: 'var(--hd-fg-muted)' }}>
              <span>100 m (Shallow winter lid)</span>
              <span>1,500 m (Convective afternoon)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="hd-folio-meta">REPRESENTATIVE WIND SPEED (U)</span>
              <span className="font-mono font-semibold">{windSpeedMps.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min={0.3}
              max={8.0}
              step={0.1}
              value={windSpeedMps}
              onChange={(e) => setWindSpeedMps(Number(e.target.value))}
              aria-label="Representative wind speed in metres per second"
              className="w-full accent-[#8C3125]"
            />
            <div className="flex justify-between text-[11px]" style={{ color: 'var(--hd-fg-muted)' }}>
              <span>0.3 m/s (Calm stagnation)</span>
              <span>8.0 m/s (Frontal passage)</span>
            </div>
          </div>
        </div>

        <div
          className="p-4 border-l-2 space-y-1"
          style={{
            borderColor: 'var(--hd-copper)',
            backgroundColor: 'var(--hd-bg)',
          }}
        >
          <p className="hd-folio-meta">CALCULATED VENTILATION COEFFICIENT</p>
          <p
            className="hd-font-display text-4xl sm:text-5xl font-semibold tabular-nums"
            style={{ color: 'var(--hd-fg)' }}
          >
            {vc.toLocaleString()} m²/s
          </p>
          <p className="hd-font-sans text-xs font-semibold" style={{ color: 'var(--hd-copper)' }}>
            {regimeLabel}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              setMixingHeightMeters(250);
              setWindSpeedMps(1.5);
            }}
            className="hd-kicker underline hover:opacity-80"
          >
            Reset to 250 m × 1.5 m/s (375 m²/s)
          </button>
        </div>

        <p
          className="hd-font-body text-xs italic pt-3 border-t"
          style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
        >
          Methodological note: Illustrative calculation. Kashmir-specific ventilation risk
          thresholds must be established through vertical radiosonde/ceilometer observational
          validation rather than plains-derived benchmarks.
        </p>
      </div>

      {/* 2. Conceptual Inversion Profile & Source-Receptor Schematics */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Schematic A: Normal Atmosphere vs Winter Temperature Inversion */}
        <figure
          className="p-6 border flex flex-col justify-between space-y-4"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-1">
            <p className="hd-kicker">VOLUME II · CHAPTER 07 SCHEMATIC</p>
            <h4 className="hd-font-display text-xl font-semibold">
              Normal Lapse Rate vs. Winter Inversion
            </h4>
          </div>

          <svg
            viewBox="0 0 300 220"
            className="w-full h-auto"
            role="img"
            aria-label="Conceptual comparison of normal atmospheric lapse rate versus winter temperature inversion"
          >
            <rect x="36" y="14" width="248" height="172" fill="none" stroke="#BFB8A8" strokeWidth="1" />
            {/* Inversion Trapping Layer Band */}
            <rect x="36" y="105" width="248" height="42" fill="#8C3125" fillOpacity="0.12" />
            <line
              x1="36"
              y1="105"
              x2="284"
              y2="105"
              stroke="#8C3125"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text x="42" y="120" fontSize="8.5" fill="#8C3125" fontFamily="sans-serif" fontWeight="600">
              INVERSION LID (SUPPRESSED MIXING)
            </text>

            {/* Normal Lapse Line */}
            <polyline
              points="235,186 165,110 95,24"
              fill="none"
              stroke="#5A5751"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            <text x="72" y="38" fontSize="8.5" fill="#5A5751" fontFamily="sans-serif">
              Normal lapse rate
            </text>

            {/* Winter Inversion Profile */}
            <polyline
              points="130,186 118,150 198,106 142,24"
              fill="none"
              stroke="#8C3125"
              strokeWidth="2.5"
            />
            <text x="196" y="99" fontSize="8.5" fill="#8C3125" fontFamily="sans-serif" fontWeight="600">
              Warm air aloft
            </text>
            <text x="135" y="178" fontSize="8.5" fill="#171717" fontFamily="sans-serif">
              Cold valley pool
            </text>

            {/* Axis Labels */}
            <text x="140" y="208" fontSize="9" fill="#5A5751" fontFamily="sans-serif">
              Temperature →
            </text>
            <text
              x="14"
              y="125"
              fontSize="9"
              fill="#5A5751"
              fontFamily="sans-serif"
              transform="rotate(-90 14 125)"
            >
              Altitude (z) →
            </text>
          </svg>

          <figcaption
            className="hd-font-body text-xs italic pt-2 border-t"
            style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
          >
            Conceptual temperature profiles, not observed Srinagar sounding data. Illustrates how a
            warm layer aloft caps vertical dispersion above a cold valley floor.
          </figcaption>
        </figure>

        {/* Schematic B: Conceptual Source-Receptor Pathways (Chapter 25) */}
        <figure
          className="p-6 border flex flex-col justify-between space-y-4"
          style={{
            borderColor: 'var(--hd-rule-strong)',
            backgroundColor: 'var(--hd-bg-elevated)',
          }}
        >
          <div className="space-y-1">
            <p className="hd-kicker">VOLUME V · CHAPTER 25 SCHEMATIC</p>
            <h4 className="hd-font-display text-xl font-semibold">
              Source-Receptor Hypothesis Matrix
            </h4>
          </div>

          <svg
            viewBox="0 0 300 220"
            className="w-full h-auto"
            role="img"
            aria-label="Conceptual source-receptor research pathways around the Kashmir receptor basin"
          >
            {/* Central Receptor Box */}
            <rect
              x="104"
              y="78"
              width="92"
              height="54"
              fill="#171717"
              stroke="#8C3125"
              strokeWidth="1.5"
            />
            <text x="150" y="101" textAnchor="middle" fontSize="9" fill="#F2EFE7" fontWeight="700">
              KASHMIR BASIN
            </text>
            <text x="150" y="115" textAnchor="middle" fontSize="7.5" fill="#D8C3A5">
              Receptor + C_local
            </text>

            {/* Western Source Regions */}
            <rect x="8" y="84" width="68" height="42" fill="none" stroke="#171717" strokeWidth="1" />
            <text x="42" y="102" textAnchor="middle" fontSize="8" fill="#171717" fontWeight="600">
              Western
            </text>
            <text x="42" y="114" textAnchor="middle" fontSize="7" fill="#5A5751">
              Westerly corridor
            </text>
            <line x1="76" y1="105" x2="102" y2="105" stroke="#8C3125" strokeWidth="2" />

            {/* Southern Source Regions */}
            <rect x="104" y="162" width="92" height="40" fill="none" stroke="#171717" strokeWidth="1" />
            <text x="150" y="179" textAnchor="middle" fontSize="8" fill="#171717" fontWeight="600">
              Southern (IGP)
            </text>
            <text x="150" y="191" textAnchor="middle" fontSize="7" fill="#5A5751">
              Orographic / passes
            </text>
            <line
              x1="150"
              y1="162"
              x2="150"
              y2="134"
              stroke="#8C3125"
              strokeWidth="1.75"
              strokeDasharray="5 2"
            />

            {/* Eastern / Northern Hypotheses */}
            <rect x="224" y="84" width="68" height="42" fill="none" stroke="#5A5751" strokeWidth="1" />
            <text x="258" y="102" textAnchor="middle" fontSize="8" fill="#171717" fontWeight="600">
              Eastern
            </text>
            <text x="258" y="114" textAnchor="middle" fontSize="7" fill="#5A5751">
              High-alt dust test
            </text>
            <line
              x1="224"
              y1="105"
              x2="198"
              y2="105"
              stroke="#5A5751"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />

            {/* Arid / Dust & Secondary Chemistry */}
            <rect x="96" y="14" width="108" height="36" fill="none" stroke="#5A5751" strokeWidth="1" />
            <text x="150" y="30" textAnchor="middle" fontSize="8" fill="#171717" fontWeight="600">
              C_secondary + C_natural
            </text>
            <text x="150" y="41" textAnchor="middle" fontSize="7" fill="#5A5751">
              Aqueous / dust / PBL exchange
            </text>
            <line
              x1="150"
              y1="50"
              x2="150"
              y2="76"
              stroke="#5A5751"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </svg>

          <figcaption
            className="hd-font-body text-xs italic pt-2 border-t"
            style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
          >
            Conceptual source-receptor schematic. Not a geographical map, observed wind field or
            validated transport trajectory. Line styles distinguish proposed research hypotheses,
            not quantified contributions.
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
