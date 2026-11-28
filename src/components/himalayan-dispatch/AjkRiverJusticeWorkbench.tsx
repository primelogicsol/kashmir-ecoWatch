'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Droplets,
  FileSearch,
  Layers,
  MapPin,
  ShieldAlert,
  Trees,
  Waves,
} from 'lucide-react';
import {
  AJK_EDITORIAL_PRIORITIES_6,
  AJK_FOREST_EVIDENCE_PROTOCOLS_10,
  AJK_MINING_CONCESSION_QUESTIONS_8,
  AJK_RIVERS_MONOGRAPH_SPEC,
  AJK_TEN_DISTRICTS_COVERAGE,
  MANGLA_RAISING_METRICS_2026,
  MUZAFFARABAD_DIVERSION_METRICS,
  MUZAFFARABAD_SCIENTIFIC_DOMAINS_10,
  WORLD_BANK_CUMULATIVE_FLOW_SCENARIO,
} from '@/data/himalayan-dispatch-ajk-rivers-monograph';

type AjkWorkbenchTab = 'muzaffarabad' | 'mangla' | 'districts' | 'concessions';

export function AjkRiverJusticeWorkbench({
  variant = 'editorial',
}: {
  variant?: 'editorial' | 'observatory';
}) {
  const [activeTab, setActiveTab] = useState<AjkWorkbenchTab>('muzaffarabad');
  const [selectedDistrictIdx, setSelectedDistrictIdx] = useState<number>(0);

  const isDark = variant === 'observatory';
  const activeDistrict =
    AJK_TEN_DISTRICTS_COVERAGE[selectedDistrictIdx] ||
    AJK_TEN_DISTRICTS_COVERAGE[0];

  const containerClasses = isDark
    ? 'rounded-2xl border border-cyan-500/30 bg-slate-900/90 text-slate-100 p-6 sm:p-8 space-y-7 shadow-2xl'
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

  const mutedStyle = isDark ? undefined : { color: 'var(--hd-fg-secondary)' };
  const accentStyle = isDark ? undefined : { color: 'var(--hd-copper)' };

  return (
    <section
      aria-label="Azad Jammu & Kashmir River Diversion, Mangla Submergence & Resource Justice Workbench"
      className={containerClasses}
      style={containerStyle}
    >
      {/* Header & Strict Evidentiary / Bureau Disclosure */}
      <div
        className={`pb-5 border-b space-y-3 ${isDark ? 'border-slate-800' : ''}`}
        style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span
            className={
              isDark
                ? 'text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 inline-flex items-center gap-2'
                : 'hd-kicker inline-flex items-center gap-2'
            }
          >
            <ShieldAlert className="w-4 h-4" />
            <span>
              AJ&amp;K HYDROLOGY &amp; ENVIRONMENTAL JUSTICE WORKBENCH · MONOGRAPH 17
            </span>
          </span>
          <span
            className={
              isDark ? 'text-[11px] font-mono text-slate-400' : 'hd-folio-meta'
            }
          >
            HIMALAYAN DISPATCH RESEARCH DESK | MUZAFFARABAD COVERAGE
          </span>
        </div>

        <h3
          className={
            isDark
              ? 'text-2xl sm:text-3xl font-bold text-white'
              : 'hd-font-display text-2xl sm:text-4xl font-semibold leading-tight'
          }
        >
          From Muzaffarabad’s Diverted Confluence to Mangla’s Submerged Villages
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
          <strong>Evidentiary &amp; Bureau Guardrail:</strong> 280 m³/s is an engineering
          diversion capacity (not continuous measured flow); the World Bank &gt;84.6% figure is a
          projected cumulative-development scenario (not a verified present-day river measurement);
          and Mangla’s 15,780 acres / 118 villages / PKR 26B metrics apply to the later Raising
          Project (not cumulative 1960s-plus-raising totals). Filed by the Research Desk (no local
          physical office implied).
        </div>
      </div>

      {/* 4 Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {[
          {
            id: 'muzaffarabad' as const,
            label: '01 · Muzaffarabad River Loss',
            sub: '969 MW diversion & PKR 1.6B+ paradox',
            icon: Waves,
          },
          {
            id: 'mangla' as const,
            label: '02 · Mangla Submergence',
            sub: '15,780 acres · 118 villages · PKR 26B',
            icon: Droplets,
          },
          {
            id: 'districts' as const,
            label: '03 · 10 Districts & 6 Priorities',
            sub: 'Muzaffarabad to Mirpur & Bhimber',
            icon: MapPin,
          },
          {
            id: 'concessions' as const,
            label: '04 · Mining & Forest Stress',
            sub: 'March 2026 reversal & 10 forest audits',
            icon: Trees,
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
                    ? 'rounded-xl border-cyan-400 bg-cyan-500/15 text-white'
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
                <Icon className="w-4 h-4 shrink-0" style={accentStyle} />
                <span>{tab.label}</span>
              </div>
              <p
                className={`mt-1 text-[11px] ${
                  isDark ? 'text-slate-400' : 'hd-font-body'
                }`}
                style={mutedStyle}
              >
                {tab.sub}
              </p>
            </button>
          );
        })}
      </div>

      {/* TAB 01: MUZAFFARABAD CONFLUENCE & REPLACEMENT ECONOMICS */}
      {activeTab === 'muzaffarabad' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MUZAFFARABAD_DIVERSION_METRICS.map((m) => (
              <div key={m.label} className={cardClasses} style={cardStyle}>
                <div
                  className={
                    isDark
                      ? 'text-2xl sm:text-3xl font-extrabold text-cyan-400'
                      : 'hd-font-display text-3xl font-semibold'
                  }
                  style={accentStyle}
                >
                  {m.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider">
                  {m.label}
                </div>
                <p
                  className={`text-[11px] leading-relaxed ${
                    isDark ? 'text-slate-400' : 'hd-font-body'
                  }`}
                  style={mutedStyle}
                >
                  {m.note}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`lg:col-span-5 ${cardClasses}`} style={cardStyle}>
              <p
                className={
                  isDark
                    ? 'text-xs font-bold uppercase tracking-wider text-amber-400'
                    : 'hd-kicker'
                }
              >
                {WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.badge}
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-2.5 border text-center" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                  <div className="text-lg font-bold">{WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.baselineScenario}</div>
                  <div className="text-[10px] uppercase opacity-75">Baseline scenario</div>
                </div>
                <div className="p-2.5 border text-center" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                  <div className="text-lg font-bold">{WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.reducedScenario}</div>
                  <div className="text-[10px] uppercase opacity-75">Reduced scenario</div>
                </div>
                <div className="p-2.5 border text-center" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                  <div className="text-lg font-bold" style={accentStyle}>{WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.percentageReduction}</div>
                  <div className="text-[10px] uppercase opacity-75">Projected drop</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed pt-2" style={mutedStyle}>
                {WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.caveat}
              </p>
              <p className="text-xs leading-relaxed pt-2 border-t" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg)' }}>
                <strong>2025 Replacement Cost Paradox ({WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.replacementSchemeCost}):</strong>{' '}
                {AJK_RIVERS_MONOGRAPH_SPEC.replacementCostQuestion}
              </p>
            </div>

            <div className={`lg:col-span-7 ${cardClasses}`} style={cardStyle}>
              <p
                className={
                  isDark
                    ? 'text-xs font-bold uppercase tracking-wider text-cyan-400'
                    : 'hd-kicker'
                }
              >
                10 PRINCIPAL SCIENTIFIC QUESTIONS FOR MUZAFFARABAD
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-[300px] overflow-y-auto pr-1 text-xs">
                {MUZAFFARABAD_SCIENTIFIC_DOMAINS_10.map((d) => (
                  <div
                    key={d.domain}
                    className="p-2.5 border"
                    style={
                      isDark
                        ? { borderColor: '#1e293b' }
                        : { borderColor: 'var(--hd-rule)' }
                    }
                  >
                    <div className="font-semibold" style={accentStyle}>
                      {d.domain}
                    </div>
                    <p className="text-[11px] mt-0.5 leading-snug" style={mutedStyle}>
                      {d.investigation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: MANGLA SUBMERGENCE & FISCAL ENTITLEMENTS */}
      {activeTab === 'mangla' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MANGLA_RAISING_METRICS_2026.metrics.map((m) => (
              <div key={m.label} className={cardClasses} style={cardStyle}>
                <div
                  className={
                    isDark
                      ? 'text-2xl sm:text-3xl font-extrabold text-amber-400'
                      : 'hd-font-display text-3xl font-semibold'
                  }
                  style={accentStyle}
                >
                  {m.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider">
                  {m.label}
                </div>
                <p className="text-[11px]" style={mutedStyle}>
                  {m.sub}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className={cardClasses} style={cardStyle}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={accentStyle}>
                <AlertTriangle className="w-4 h-4" />
                <span>Scope Distinction: 1960s Original Dam vs. 2003 Raising Programme</span>
              </div>
              <p className="text-xs leading-relaxed" style={mutedStyle}>
                {MANGLA_RAISING_METRICS_2026.scopeWarning}
              </p>
              <blockquote
                className="pt-3 border-t italic text-sm"
                style={
                  isDark
                    ? { borderColor: '#1e293b' }
                    : { borderColor: 'var(--hd-rule)' }
                }
              >
                “{AJK_RIVERS_MONOGRAPH_SPEC.manglaGenerationalAxiom}”
              </blockquote>
            </div>

            <div className={cardClasses} style={cardStyle}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={accentStyle}>
                <Building2 className="w-4 h-4" />
                <span>2024–25 Water Usage Charges &amp; 2003 Mirpur Drinking-Water Pledge</span>
              </div>
              <p className="text-xs leading-relaxed" style={mutedStyle}>
                {MANGLA_RAISING_METRICS_2026.fiscalNote}
              </p>
              <p className="text-xs leading-relaxed pt-2" style={mutedStyle}>
                <strong>March 22, 2026 Water Security Audit:</strong> Examines historical
                commitments under the 2003 Mangla Dam agreement to provide reliable drinking water
                to Mirpur and adjoining reservoir-rim communities alongside declining spring and
                groundwater recharge.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 03: 10 DISTRICTS & 6 EDITORIAL PRIORITIES */}
      {activeTab === 'districts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`lg:col-span-6 ${cardClasses}`} style={cardStyle}>
              <p className="text-xs font-bold uppercase tracking-wider" style={accentStyle}>
                ALL 10 DISTRICTS OF AZAD JAMMU &amp; KASHMIR (PROPOSED INVESTIGATION AREAS)
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {AJK_TEN_DISTRICTS_COVERAGE.map((d, idx) => (
                  <button
                    key={d.district}
                    type="button"
                    onClick={() => setSelectedDistrictIdx(idx)}
                    className={`px-2.5 py-1 text-[11px] font-semibold border ${
                      isDark
                        ? idx === selectedDistrictIdx
                          ? 'rounded border-cyan-400 bg-cyan-500/20 text-white'
                          : 'rounded border-slate-700 bg-slate-900 text-slate-300'
                        : ''
                    }`}
                    style={
                      isDark
                        ? undefined
                        : {
                            borderColor:
                              idx === selectedDistrictIdx
                                ? 'var(--hd-copper)'
                                : 'var(--hd-rule)',
                            color:
                              idx === selectedDistrictIdx
                                ? 'var(--hd-copper)'
                                : 'var(--hd-fg-secondary)',
                          }
                    }
                  >
                    {d.district}
                  </button>
                ))}
              </div>

              <div
                className="p-3.5 border text-xs space-y-1 mt-2"
                style={
                  isDark
                    ? { borderColor: '#1e293b' }
                    : { borderColor: 'var(--hd-rule)' }
                }
              >
                <div className="font-bold text-sm">
                  {activeDistrict.district} District ({activeDistrict.division} Division)
                </div>
                <p className="leading-relaxed" style={mutedStyle}>
                  {activeDistrict.keyIssues}
                </p>
              </div>
              <p className="text-[11px] italic" style={mutedStyle}>
                Note: Represents proposed investigation areas across AJ&amp;K’s ten districts, not
                a verified environmental hazard or statutory violation map.
              </p>
            </div>

            <div className={`lg:col-span-6 ${cardClasses}`} style={cardStyle}>
              <p className="text-xs font-bold uppercase tracking-wider" style={accentStyle}>
                SIX RANKED REGIONAL EDITORIAL PRIORITIES
              </p>
              <div className="divide-y text-xs max-h-[280px] overflow-y-auto pr-1" style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}>
                {AJK_EDITORIAL_PRIORITIES_6.map((p) => (
                  <div key={p.priority} className="py-2 space-y-0.5">
                    <div className="font-semibold">
                      <span style={accentStyle}>Priority {p.priority}</span> — {p.title}
                    </div>
                    <div className="text-[11px] font-medium">{p.significance}</div>
                    <p className="text-[11px]" style={mutedStyle}>
                      {p.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 04: MARCH 2026 MINING CONCESSION REVERSAL & 10 FOREST PROTOCOLS */}
      {activeTab === 'concessions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`lg:col-span-6 ${cardClasses}`} style={cardStyle}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={accentStyle}>
                <FileSearch className="w-4 h-4" />
                <span>March 17, 2026 Retrospective Concession Withdrawal (8 Questions)</span>
              </div>
              <div className="divide-y text-xs max-h-[310px] overflow-y-auto pr-1" style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}>
                {AJK_MINING_CONCESSION_QUESTIONS_8.map((q) => (
                  <div key={q.no} className="py-2">
                    <div className="font-semibold">
                      {q.no}. {q.question}
                    </div>
                    <p className="text-[11px]" style={mutedStyle}>
                      Required evidence: {q.evidenceRequired}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-6 ${cardClasses}`} style={cardStyle}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={accentStyle}>
                <Layers className="w-4 h-4" />
                <span>10 Forest &amp; Watershed Scientific Evidence Protocols</span>
              </div>
              <div className="divide-y text-xs max-h-[310px] overflow-y-auto pr-1" style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}>
                {AJK_FOREST_EVIDENCE_PROTOCOLS_10.map((f) => (
                  <div key={f.investigation} className="py-2">
                    <div className="font-semibold">{f.investigation}</div>
                    <p className="text-[11px]" style={mutedStyle}>
                      {f.requiredEvidence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Cross-Links */}
      <div
        className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'border-slate-800' : ''
        }`}
        style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
      >
        <span className="italic max-w-2xl" style={mutedStyle}>
          {AJK_RIVERS_MONOGRAPH_SPEC.overarchingQuestion}
        </span>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href={`/himalayan-dispatch/issues/${AJK_RIVERS_MONOGRAPH_SPEC.monographSlug}`}
            className={
              isDark
                ? 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 font-semibold hover:bg-cyan-500/30'
                : 'hd-kicker inline-flex items-center gap-1.5 hover:underline'
            }
          >
            <span>Monograph 17 (72 Chapters)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/earth-human-impact/ajk-river-justice-observatory"
            className={
              isDark
                ? 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-500'
                : 'hd-kicker inline-flex items-center gap-1.5 hover:underline'
            }
          >
            <span>KEW AJ&amp;K River Observatory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
