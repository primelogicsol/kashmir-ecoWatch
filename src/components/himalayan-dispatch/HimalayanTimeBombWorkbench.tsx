'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Layers,
  Mountain,
  ShieldAlert,
  Waves,
} from 'lucide-react';
import {
  CASCADING_PATHWAY_STEPS_6,
  COMPOUND_SCENARIOS_6,
  CRITICAL_INFRASTRUCTURE_SECTORS_12,
  GEOLOGICAL_STRUCTURES_11,
  GLACIER_PARADOX_PAIRS_6,
  HAZARD_DOMAINS_10_WITH_80_CATEGORIES,
  INTERNATIONAL_BENCHMARKS_10,
  JHELUM_2014_FLOOD_METRICS,
  JK_GLACIAL_LAKE_METRICS_2026,
  KASHMIR_SEISMIC_GAP_METRICS,
  PREPAREDNESS_AUDIT_16,
  PREPAREDNESS_MATURITY_TIERS_5,
  PRIORITY_CITIES_8,
  REGIONAL_MULTI_HAZARD_GEOGRAPHY_5,
  THE_TIME_BOMB_SPEC,
  URBAN_STRUCTURAL_CENSUS_10,
} from '@/data/himalayan-dispatch-time-bomb-monograph';

type WorkbenchTab = 'scenarios' | 'tectonics' | 'inventory80' | 'preparedness';

export function HimalayanTimeBombWorkbench({
  variant = 'editorial',
}: {
  variant?: 'editorial' | 'command-center';
}) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('scenarios');
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [selectedCityIdx, setSelectedCityIdx] = useState<number>(0);
  const [selectedDomainId, setSelectedDomainId] = useState<string>('ALL');
  const [hazardQuery, setHazardQuery] = useState<string>('');
  const [selectedMaturityTier, setSelectedMaturityTier] = useState<string>('04');

  const isDark = variant === 'command-center';

  const activeScenario =
    COMPOUND_SCENARIOS_6[selectedScenarioIdx] || COMPOUND_SCENARIOS_6[0];
  const activeCity = PRIORITY_CITIES_8[selectedCityIdx] || PRIORITY_CITIES_8[0];

  const filteredDomains = useMemo(() => {
    const q = hazardQuery.trim().toLowerCase();
    return HAZARD_DOMAINS_10_WITH_80_CATEGORIES.filter((d) =>
      selectedDomainId === 'ALL' ? true : d.domainId === selectedDomainId
    )
      .map((d) => ({
        ...d,
        matchedCategories: q
          ? d.categories.filter(
              (c) =>
                c.toLowerCase().includes(q) ||
                d.domainName.toLowerCase().includes(q)
            )
          : [...d.categories],
      }))
      .filter((d) => d.matchedCategories.length > 0);
  }, [selectedDomainId, hazardQuery]);

  const matchedCount = useMemo(
    () =>
      filteredDomains.reduce((sum, d) => sum + d.matchedCategories.length, 0),
    [filteredDomains]
  );

  const containerClasses = isDark
    ? 'rounded-2xl border border-red-500/25 bg-slate-900/90 text-slate-100 p-6 sm:p-8 space-y-7 shadow-2xl'
    : 'my-10 border p-6 sm:p-8 space-y-7';

  const containerStyle = isDark
    ? undefined
    : {
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
        color: 'var(--hd-fg)',
      };

  const cardClasses = isDark
    ? 'rounded-xl border border-slate-700/80 bg-slate-950/80 p-4 space-y-2'
    : 'border p-4 space-y-2';

  const cardStyle = isDark
    ? undefined
    : {
        borderColor: 'var(--hd-rule)',
        backgroundColor: 'var(--hd-bg)',
      };

  const mutedTextStyle = isDark ? undefined : { color: 'var(--hd-fg-secondary)' };
  const accentTextStyle = isDark ? undefined : { color: 'var(--hd-copper)' };

  return (
    <section
      aria-label="Western Himalayan Multi-Hazard & Cascading Vulnerability Workbench"
      className={containerClasses}
      style={containerStyle}
    >
      {/* Header & Strict Non-Prediction Methodological Banner */}
      <div
        className={`pb-5 border-b space-y-3 ${
          isDark ? 'border-slate-800' : ''
        }`}
        style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={
              isDark
                ? 'text-xs font-bold uppercase tracking-[0.2em] text-amber-400 inline-flex items-center gap-2'
                : 'hd-kicker inline-flex items-center gap-2'
            }
          >
            <ShieldAlert className="w-4 h-4" />
            <span>
              INTERACTIVE MULTI-HAZARD &amp; CASCADING RISK WORKBENCH · DISPATCH 22 × MONOGRAPH 13
            </span>
          </span>
          <span
            className={
              isDark
                ? 'text-[11px] font-mono text-slate-400'
                : 'hd-folio-meta'
            }
          >
            80 HAZARD CLASSES · 6 EXERCISE SCENARIOS · 12 LIFELINES
          </span>
        </div>

        <h3
          className={
            isDark
              ? 'text-2xl sm:text-3xl font-bold text-white'
              : 'hd-font-display text-2xl sm:text-4xl font-semibold leading-tight'
          }
        >
          Convergence Simulator: Tectonic Strain, Cryosphere, Lifelines &amp; Readiness
        </h3>

        <div
          className={
            isDark
              ? 'rounded-lg border border-amber-500/30 bg-amber-950/30 p-3.5 text-xs text-amber-200/90 leading-relaxed'
              : 'border-l-2 p-3.5 text-xs hd-font-body leading-relaxed'
          }
          style={
            isDark
              ? undefined
              : {
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg-secondary)',
                }
          }
        >
          <strong>Scientific Non-Prediction Notice:</strong> “Sitting on a time bomb” is an
          editorial metaphor for accumulated, interacting vulnerabilities—never a calendar
          earthquake prediction. The 6 compound scenarios below are non-predictive stress tests
          for scientific modelling and emergency exercises; regional indicators carry explicit
          geographic scope boundaries.
        </div>
      </div>

      {/* 4 Interactive Workbench Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {[
          {
            id: 'scenarios' as const,
            label: '01 · 6 Compound Scenarios',
            sub: 'Cascading pathways & 12 lifelines',
            icon: AlertTriangle,
          },
          {
            id: 'tectonics' as const,
            label: '02 · Seismic Gap & 8 Cities',
            sub: '11 faults & liquefaction census',
            icon: Activity,
          },
          {
            id: 'inventory80' as const,
            label: '03 · 80-Hazard Inventory',
            sub: '10 domains × 5 Himalayan regions',
            icon: Layers,
          },
          {
            id: 'preparedness' as const,
            label: '04 · 16-Point Readiness Audit',
            sub: '5 maturity tiers & 10 global models',
            icon: Building2,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`text-left p-3.5 border transition-all ${
                isDark
                  ? active
                    ? 'rounded-xl border-amber-400 bg-amber-500/15 text-white'
                    : 'rounded-xl border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-600'
                  : ''
              }`}
              style={
                isDark
                  ? undefined
                  : {
                      borderColor: active ? 'var(--hd-copper)' : 'var(--hd-rule)',
                      backgroundColor: active ? 'var(--hd-bg)' : 'transparent',
                    }
              }
            >
              <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider">
                <Icon className="w-4 h-4 shrink-0" style={accentTextStyle} />
                <span>{tab.label}</span>
              </div>
              <p
                className={`mt-1 text-[11px] ${
                  isDark ? 'text-slate-400' : 'hd-font-body'
                }`}
                style={mutedTextStyle}
              >
                {tab.sub}
              </p>
            </button>
          );
        })}
      </div>

      {/* TAB 01: 6 COMPOUND SCENARIOS & CASCADING LIFELINES */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {COMPOUND_SCENARIOS_6.map((sc, idx) => {
              const selected = idx === selectedScenarioIdx;
              return (
                <button
                  key={sc.code}
                  type="button"
                  onClick={() => setSelectedScenarioIdx(idx)}
                  className={`px-3.5 py-2 text-xs font-semibold border transition-colors ${
                    isDark
                      ? selected
                        ? 'rounded-lg border-red-400 bg-red-500/20 text-white'
                        : 'rounded-lg border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
                      : 'hd-font-sans uppercase tracking-wider'
                  }`}
                  style={
                    isDark
                      ? undefined
                      : {
                          borderColor: selected
                            ? 'var(--hd-copper)'
                            : 'var(--hd-rule)',
                          color: selected
                            ? 'var(--hd-copper)'
                            : 'var(--hd-fg-secondary)',
                          backgroundColor: selected
                            ? 'var(--hd-bg)'
                            : 'transparent',
                        }
                  }
                >
                  {sc.code}: {sc.title}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`lg:col-span-7 ${cardClasses}`} style={cardStyle}>
              <div className="flex items-center justify-between gap-2">
                <span
                  className={
                    isDark
                      ? 'text-xs font-mono font-bold text-red-400 uppercase'
                      : 'hd-kicker'
                  }
                >
                  {activeScenario.code} · EXERCISE &amp; MODELLING PROTOCOL (NON-PREDICTIVE)
                </span>
              </div>
              <h4
                className={
                  isDark
                    ? 'text-xl font-bold text-white'
                    : 'hd-font-display text-2xl font-semibold'
                }
              >
                {activeScenario.title}
              </h4>
              <p
                className={
                  isDark
                    ? 'text-sm text-slate-300 leading-relaxed'
                    : 'hd-font-body text-sm leading-relaxed'
                }
                style={mutedTextStyle}
              >
                {activeScenario.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <p
                    className={
                      isDark
                        ? 'text-xs font-bold uppercase tracking-wider text-amber-400 mb-2'
                        : 'hd-folio-meta mb-2'
                    }
                  >
                    Interacting Physical Hazards
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {activeScenario.interactingHazards.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <Mountain
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={accentTextStyle}
                        />
                        <span style={mutedTextStyle}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    className={
                      isDark
                        ? 'text-xs font-bold uppercase tracking-wider text-red-400 mb-2'
                        : 'hd-folio-meta mb-2'
                    }
                  >
                    Critical Lifeline Cascades
                  </p>
                  <ul className="space-y-1.5 text-xs">
                    {activeScenario.lifelineCascades.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <Waves
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={accentTextStyle}
                        />
                        <span style={mutedTextStyle}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`mt-3 pt-3 border-t text-xs ${
                  isDark ? 'border-slate-800 text-emerald-300' : 'hd-font-body'
                }`}
                style={
                  isDark
                    ? undefined
                    : { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg)' }
                }
              >
                <strong>Resilience Imperative:</strong>{' '}
                {activeScenario.planningImperative}
              </div>
            </div>

            <div className={`lg:col-span-5 ${cardClasses}`} style={cardStyle}>
              <p
                className={
                  isDark
                    ? 'text-xs font-bold uppercase tracking-wider text-amber-400'
                    : 'hd-kicker'
                }
              >
                SIX-LINK CASCADING DISASTER MECHANISM
              </p>
              <div className="space-y-2.5 pt-1">
                {CASCADING_PATHWAY_STEPS_6.map((s) => (
                  <div
                    key={s.step}
                    className={`p-2.5 border text-xs ${
                      isDark
                        ? 'rounded-lg border-slate-800 bg-slate-900/70'
                        : ''
                    }`}
                    style={
                      isDark ? undefined : { borderColor: 'var(--hd-rule)' }
                    }
                  >
                    <div className="font-semibold">
                      <span style={accentTextStyle}>{s.step}</span> · {s.stage}
                    </div>
                    <p
                      className={`mt-0.5 text-[11px] ${
                        isDark ? 'text-slate-400' : 'hd-font-body'
                      }`}
                      style={mutedTextStyle}
                    >
                      {s.mechanism}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 12 Critical Infrastructure Sectors Strip */}
          <div className={cardClasses} style={cardStyle}>
            <p
              className={
                isDark
                  ? 'text-xs font-bold uppercase tracking-wider text-cyan-400'
                  : 'hd-kicker'
              }
            >
              TWELVE INTERDEPENDENT CRITICAL INFRASTRUCTURE SECTORS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
              {CRITICAL_INFRASTRUCTURE_SECTORS_12.map((sec, idx) => (
                <div
                  key={sec.sector}
                  className={`p-2.5 border text-xs ${
                    isDark ? 'rounded-lg border-slate-800 bg-slate-900/50' : ''
                  }`}
                  style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="font-semibold">
                    {String(idx + 1).padStart(2, '0')}. {sec.sector}
                  </div>
                  <p
                    className={`mt-1 text-[11px] leading-snug ${
                      isDark ? 'text-slate-400' : 'hd-font-body'
                    }`}
                    style={mutedTextStyle}
                  >
                    {sec.consequences}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: KASHMIR SEISMIC GAP, 11 STRUCTURES & 8-CITY LIQUEFACTION CENSUS */}
      {activeTab === 'tectonics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KASHMIR_SEISMIC_GAP_METRICS.map((m) => (
              <div key={m.label} className={cardClasses} style={cardStyle}>
                <div
                  className={
                    isDark
                      ? 'text-2xl sm:text-3xl font-extrabold text-amber-400'
                      : 'hd-font-display text-3xl font-semibold'
                  }
                  style={accentTextStyle}
                >
                  {m.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider">
                  {m.label}
                </div>
                <p
                  className={`text-[11px] font-medium ${
                    isDark ? 'text-slate-300' : 'hd-font-body'
                  }`}
                >
                  {m.sublabel}
                </p>
                <p
                  className={`text-[11px] leading-relaxed ${
                    isDark ? 'text-slate-400' : 'hd-font-body'
                  }`}
                  style={mutedTextStyle}
                >
                  {m.caveat}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* 11 Geological Structures */}
            <div className={`lg:col-span-7 ${cardClasses}`} style={cardStyle}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p
                  className={
                    isDark
                      ? 'text-xs font-bold uppercase tracking-wider text-amber-400'
                      : 'hd-kicker'
                  }
                >
                  11 MAJOR GEOLOGICAL STRUCTURES REQUIRING CONTINUOUS INVESTIGATION
                </p>
                <span className="text-[11px] italic" style={mutedTextStyle}>
                  Varying activity &amp; geometry — not equally hazardous
                </span>
              </div>

              <div className="max-h-[340px] overflow-y-auto divide-y pr-1 text-xs" style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}>
                {GEOLOGICAL_STRUCTURES_11.map((g) => (
                  <div key={g.structure} className="py-2.5 space-y-0.5">
                    <div className="font-semibold">{g.structure}</div>
                    <div style={mutedTextStyle}>{g.scientificImportance}</div>
                    <div
                      className={
                        isDark ? 'text-[11px] text-amber-300/80' : 'text-[11px] italic'
                      }
                      style={accentTextStyle}
                    >
                      Focus: {g.investigativeFocus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 Priority Cities + 10-Category Structural Census */}
            <div className={`lg:col-span-5 ${cardClasses}`} style={cardStyle}>
              <p
                className={
                  isDark
                    ? 'text-xs font-bold uppercase tracking-wider text-rose-400'
                    : 'hd-kicker'
                }
              >
                URBAN SEISMIC &amp; LIQUEFACTION VULNERABILITY (8 PRIORITY CITIES)
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRIORITY_CITIES_8.map((c, idx) => (
                  <button
                    key={c.city}
                    type="button"
                    onClick={() => setSelectedCityIdx(idx)}
                    className={`px-2.5 py-1 text-[11px] font-semibold border ${
                      isDark
                        ? idx === selectedCityIdx
                          ? 'rounded border-rose-400 bg-rose-500/20 text-white'
                          : 'rounded border-slate-700 bg-slate-900 text-slate-300'
                        : ''
                    }`}
                    style={
                      isDark
                        ? undefined
                        : {
                            borderColor:
                              idx === selectedCityIdx
                                ? 'var(--hd-copper)'
                                : 'var(--hd-rule)',
                            color:
                              idx === selectedCityIdx
                                ? 'var(--hd-copper)'
                                : 'var(--hd-fg-secondary)',
                          }
                    }
                  >
                    {c.city}
                  </button>
                ))}
              </div>

              <div
                className={`p-3 border text-xs space-y-1 ${
                  isDark ? 'rounded-lg border-slate-800 bg-slate-900/70' : ''
                }`}
                style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
              >
                <div className="font-bold">
                  {activeCity.city} ({activeCity.region})
                </div>
                <p style={mutedTextStyle} className="leading-relaxed">
                  {activeCity.keyConcerns}
                </p>
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-wider pt-1">
                Mandatory 10-Category Municipal Structural Census:
              </p>
              <ul className="space-y-1 text-[11px] max-h-[175px] overflow-y-auto pr-1">
                {URBAN_STRUCTURAL_CENSUS_10.map((u) => (
                  <li key={u.infrastructure}>
                    <strong>{u.infrastructure}:</strong>{' '}
                    <span style={mutedTextStyle}>{u.requiredAssessment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 03: 80-CATEGORY HAZARD INVENTORY & REGIONAL BASELINES */}
      {activeTab === 'inventory80' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedDomainId('ALL')}
                className={`px-3 py-1.5 text-[11px] font-semibold border ${
                  isDark
                    ? selectedDomainId === 'ALL'
                      ? 'rounded border-amber-400 bg-amber-500/20 text-white'
                      : 'rounded border-slate-700 bg-slate-900 text-slate-300'
                    : ''
                }`}
                style={
                  isDark
                    ? undefined
                    : {
                        borderColor:
                          selectedDomainId === 'ALL'
                            ? 'var(--hd-copper)'
                            : 'var(--hd-rule)',
                        color:
                          selectedDomainId === 'ALL'
                            ? 'var(--hd-copper)'
                            : 'var(--hd-fg-secondary)',
                      }
                }
              >
                All 10 Domains (80)
              </button>
              {HAZARD_DOMAINS_10_WITH_80_CATEGORIES.map((d) => (
                <button
                  key={d.domainId}
                  type="button"
                  onClick={() => setSelectedDomainId(d.domainId)}
                  className={`px-2.5 py-1.5 text-[11px] font-semibold border ${
                    isDark
                      ? selectedDomainId === d.domainId
                        ? 'rounded border-amber-400 bg-amber-500/20 text-white'
                        : 'rounded border-slate-700 bg-slate-900 text-slate-300'
                      : ''
                  }`}
                  style={
                    isDark
                      ? undefined
                      : {
                          borderColor:
                            selectedDomainId === d.domainId
                              ? 'var(--hd-copper)'
                              : 'var(--hd-rule)',
                          color:
                            selectedDomainId === d.domainId
                              ? 'var(--hd-copper)'
                              : 'var(--hd-fg-secondary)',
                        }
                  }
                >
                  {d.domainNumber} · {d.domainName}
                </button>
              ))}
            </div>

            <input
              type="search"
              value={hazardQuery}
              onChange={(e) => setHazardQuery(e.target.value)}
              placeholder="Filter 80 monitoring categories..."
              aria-label="Filter 80 hazard categories"
              className={`px-3 py-1.5 text-xs border ${
                isDark
                  ? 'rounded-lg border-slate-700 bg-slate-950 text-white placeholder:text-slate-500'
                  : 'bg-transparent'
              }`}
              style={
                isDark
                  ? undefined
                  : { borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }
              }
            />
          </div>

          <p className="text-xs italic" style={mutedTextStyle}>
            Showing <strong>{matchedCount}</strong> of 80 proposed monitoring categories across{' '}
            {filteredDomains.length} scientific domains (structured monitoring classes, not 80
            independently measured or equally probable disasters).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDomains.map((dom) => (
              <div key={dom.domainId} className={cardClasses} style={cardStyle}>
                <div className="text-xs font-bold uppercase tracking-wider" style={accentTextStyle}>
                  Domain {dom.domainNumber} · {dom.domainName}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dom.matchedCategories.map((cat) => (
                    <span
                      key={cat}
                      className={`px-2 py-1 text-[11px] border ${
                        isDark
                          ? 'rounded border-slate-800 bg-slate-900 text-slate-200'
                          : ''
                      }`}
                      style={
                        isDark ? undefined : { borderColor: 'var(--hd-rule)' }
                      }
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 5-Region Geography & Cryosphere/Floodplain Baselines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={cardClasses} style={cardStyle}>
              <p className="text-xs font-bold uppercase tracking-wider" style={accentTextStyle}>
                Five-Region Multi-Hazard Investigation Geography (Unranked)
              </p>
              <div className="space-y-2 text-xs pt-1">
                {REGIONAL_MULTI_HAZARD_GEOGRAPHY_5.map((r) => (
                  <div key={r.region}>
                    <strong>{r.region}:</strong>{' '}
                    <span style={mutedTextStyle}>{r.principalHazards}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={cardClasses} style={cardStyle}>
              <p className="text-xs font-bold uppercase tracking-wider" style={accentTextStyle}>
                The Glacier Meltwater Paradox &amp; Floodplain Baseline
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                {GLACIER_PARADOX_PAIRS_6.map((p) => (
                  <div
                    key={p.nearTerm}
                    className={`p-2 border ${
                      isDark ? 'rounded border-slate-800 bg-slate-900/60' : ''
                    }`}
                    style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="font-semibold">Near-term: {p.nearTerm}</div>
                    <div style={mutedTextStyle}>Long-term: {p.longTerm}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] pt-2" style={mutedTextStyle}>
                <strong>J&amp;K Glacial Lakes (Sept 2026):</strong> 616 mapped · 68 dangerous · 24
                priority · 28.62 km² (J&amp;K-specific).{' '}
                <strong>2014 Jhelum Flood:</strong>{' '}
                {JHELUM_2014_FLOOD_METRICS.peakDischargeCusecs} (
                {JHELUM_2014_FLOOD_METRICS.maxSouthKashmirDepth} max depth).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 04: 16-POINT PREPAREDNESS AUDIT & 10 GLOBAL BENCHMARKS */}
      {activeTab === 'preparedness' && (
        <div className="space-y-6">
          <div className={cardClasses} style={cardStyle}>
            <p className="text-xs font-bold uppercase tracking-wider" style={accentTextStyle}>
              FIVE-TIER PREPAREDNESS MATURITY RULER (PAPER PLANS ≠ OPERATIONAL READINESS)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {PREPAREDNESS_MATURITY_TIERS_5.map((t) => {
                const active = selectedMaturityTier === t.tier;
                return (
                  <button
                    key={t.tier}
                    type="button"
                    onClick={() => setSelectedMaturityTier(t.tier)}
                    className={`text-left p-2.5 border text-xs ${
                      isDark
                        ? active
                          ? 'rounded-lg border-emerald-400 bg-emerald-500/15 text-white'
                          : 'rounded-lg border-slate-800 bg-slate-900/60 text-slate-300'
                        : ''
                    }`}
                    style={
                      isDark
                        ? undefined
                        : {
                            borderColor: active
                              ? 'var(--hd-copper)'
                              : 'var(--hd-rule)',
                          }
                    }
                  >
                    <div className="font-bold">
                      Tier {t.tier} · {t.label}
                    </div>
                    <p
                      className="mt-1 text-[11px] leading-snug"
                      style={mutedTextStyle}
                    >
                      {t.meaning}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`lg:col-span-7 ${cardClasses}`} style={cardStyle}>
              <p className="text-xs font-bold uppercase tracking-wider" style={accentTextStyle}>
                16-POINT REGIONAL PREPAREDNESS AUDIT PROTOCOL
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-[360px] overflow-y-auto pr-1">
                {PREPAREDNESS_AUDIT_16.map((item) => (
                  <div
                    key={item.no}
                    className={`p-2.5 border text-xs ${
                      isDark ? 'rounded-lg border-slate-800 bg-slate-900/60' : ''
                    }`}
                    style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="font-semibold flex items-center gap-1.5">
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        style={accentTextStyle}
                      />
                      <span>
                        {item.no}. {item.requirement}
                      </span>
                    </div>
                    <p
                      className="mt-1 text-[11px] leading-snug"
                      style={mutedTextStyle}
                    >
                      {item.evidenceToEstablish}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-5 ${cardClasses}`} style={cardStyle}>
              <p className="text-xs font-bold uppercase tracking-wider" style={accentTextStyle}>
                10 INTERNATIONAL DISASTER GOVERNANCE MODELS FOR ADAPTATION
              </p>
              <div className="divide-y text-xs max-h-[360px] overflow-y-auto pr-1" style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}>
                {INTERNATIONAL_BENCHMARKS_10.map((b) => (
                  <div key={b.countryOrFramework} className="py-2">
                    <div className="font-semibold">{b.countryOrFramework}</div>
                    <p className="text-[11px]" style={mutedTextStyle}>
                      {b.areaOfStudy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Cross-Navigation */}
      <div
        className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'border-slate-800' : ''
        }`}
        style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
      >
        <span className="italic" style={mutedTextStyle}>
          {THE_TIME_BOMB_SPEC.closingQuestion}
        </span>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href={`/himalayan-dispatch/issues/${THE_TIME_BOMB_SPEC.monographSlug}`}
            className={
              isDark
                ? 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-200 font-semibold hover:bg-amber-500/30'
                : 'hd-kicker inline-flex items-center gap-1.5 hover:underline'
            }
          >
            <span>Monograph 13 (150 Chapters)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/hazard-intelligence/multi-hazard-resilience-command-center"
            className={
              isDark
                ? 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500'
                : 'hd-kicker inline-flex items-center gap-1.5 hover:underline'
            }
          >
            <span>KEW Multi-Hazard Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
