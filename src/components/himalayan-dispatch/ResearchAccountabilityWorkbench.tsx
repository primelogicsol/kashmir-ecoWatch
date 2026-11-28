'use client';

import React, { useState } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';
import {
  BIBLIOMETRIC_CENSUS_PERIOD_TABLE,
  ENVIRONMENTAL_RESEARCH_DISCIPLINES_30,
  PRELIMINARY_RESEARCH_UNITS_BY_REGION_5,
  RESEARCH_TO_GROUND_PIPELINE_7,
  RESEARCH_TO_SOCIETY_PROTOCOL_9,
  SECOND_LIFE_PAPER_QUESTIONS_9,
  SECOND_LIFE_REGIONAL_LANGUAGES,
  UOK_GEOGRAPHY_DOCUMENTED_ANCHOR,
} from '@/data/himalayan-dispatch-research-accountability-monograph';

type ResearchTab = 'census' | 'pipeline' | 'second_life';

export function ResearchAccountabilityWorkbench({
  variant = 'editorial',
  initialTab = 'census',
}: {
  variant?: 'editorial' | 'observatory';
  initialTab?: ResearchTab;
}) {
  const [activeTab, setActiveTab] = useState<ResearchTab>(initialTab);
  const [selectedRegion, setSelectedRegion] = useState<string>('All 5 Regions');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(
    ENVIRONMENTAL_RESEARCH_DISCIPLINES_30[0].discipline
  );
  const [authorshipScope, setAuthorshipScope] = useState<'regional' | 'external'>('regional');
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['English', 'Kashmiri', 'Urdu']);
  const [copiedQuery, setCopiedQuery] = useState(false);

  const isObs = variant === 'observatory';

  const openAlexQuery = `https://api.openalex.org/works?filter=publication_year:2001-2026,default.search:${encodeURIComponent(
    `"${selectedDiscipline}" "${
      selectedRegion === 'All 5 Regions' ? 'Western Himalaya' : selectedRegion
    }"`
  )}${
    authorshipScope === 'regional'
      ? ',institutions.country_code:IN|PK'
      : ''
  }&group_by=publication_year`;

  const toggleLanguage = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleCopyQuery = async () => {
    try {
      await navigator.clipboard.writeText(openAlexQuery);
      setCopiedQuery(true);
      setTimeout(() => setCopiedQuery(false), 2000);
    } catch {
      // ignore clipboard errors in non-secure test contexts
    }
  };

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
      aria-label="Western Himalayan Bibliometric Census and Research-to-Society Workbench"
      className={
        isObs
          ? 'rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-6 sm:p-8 text-slate-100 space-y-6'
          : 'my-10 border p-6 sm:p-8 space-y-6'
      }
      style={containerStyle}
    >
      {/* Header */}
      <div
        className={
          isObs
            ? 'border-b border-slate-800 pb-4 space-y-1'
            : 'border-b pb-4 space-y-1'
        }
        style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
      >
        <p
          className={
            isObs
              ? 'text-xs font-mono uppercase tracking-widest text-emerald-400'
              : 'hd-kicker'
          }
        >
          INTERACTIVE BIBLIOMETRIC &amp; KNOWLEDGE-RETURN WORKBENCH · ZERO INVENTED TOTALS
        </p>
        <h3
          className={
            isObs
              ? 'text-2xl sm:text-3xl font-bold text-white'
              : 'hd-font-display text-2xl sm:text-3xl font-semibold'
          }
        >
          2001–2026 Research Census Protocol &amp; Second-Life Paper Standard
        </h3>
        <p
          className={isObs ? 'text-xs sm:text-sm text-slate-300' : 'hd-font-body text-xs sm:text-sm'}
          style={isObs ? undefined : { color: 'var(--hd-fg-secondary)' }}
        >
          Inspect the five-region census framework (Jan 1, 2001 – Nov 27, 2026 partial), generate
          reproducible OpenAlex queries across 30 disciplines, and classify research obligations
          under the Western Himalayan Research-to-Society and Impact Protocol.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist">
        {[
          { id: 'census' as const, label: '01 · 2001–2026 Bibliometric Census & OpenAlex Protocol' },
          { id: 'pipeline' as const, label: '02 · 7-Stage Research-to-Ground Pipeline' },
          { id: 'second_life' as const, label: '03 · WH-RSIP & Paper "Second Life" Standard' },
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
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
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

      {/* TAB 01: 2001–2026 CENSUS & OPENALEX QUERY BUILDER */}
      {activeTab === 'census' && (
        <div className="space-y-6">
          {/* Verified Starting Anchors */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {PRELIMINARY_RESEARCH_UNITS_BY_REGION_5.map((r) => (
              <div
                key={r.region}
                className={
                  isObs
                    ? 'p-3 rounded-xl border border-slate-800 bg-slate-950'
                    : 'p-3 border'
                }
                style={cardStyle}
              >
                <div className="text-[11px] uppercase opacity-75">{r.region}</div>
                <div className="text-2xl font-bold tabular-nums mt-0.5">
                  {r.preliminaryUnitsIdentified}
                </div>
                <div className="text-[10px] opacity-70">Prelim. units</div>
              </div>
            ))}
            <div
              className={
                isObs
                  ? 'p-3 rounded-xl border border-emerald-500/40 bg-slate-950'
                  : 'p-3 border-2'
              }
              style={
                isObs
                  ? undefined
                  : { borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <div className="text-[11px] uppercase opacity-75">UoK Geog. Anchor</div>
              <div className="text-2xl font-bold tabular-nums mt-0.5">
                {UOK_GEOGRAPHY_DOCUMENTED_ANCHOR.reportedPublications}
              </div>
              <div className="text-[10px] opacity-75">2019–23 (1 dept.)</div>
            </div>
          </div>

          {/* 2001–2026 Regional Census Table */}
          <div
            className={
              isObs
                ? 'rounded-xl border border-slate-800 overflow-x-auto bg-slate-950'
                : 'border overflow-x-auto'
            }
            style={cardStyle}
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className="border-b"
                  style={isObs ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule-strong)' }}
                >
                  <th className="py-2.5 px-3 font-semibold uppercase">Publication period</th>
                  <th className="py-2.5 px-3 font-semibold uppercase">Kashmir</th>
                  <th className="py-2.5 px-3 font-semibold uppercase">Jammu</th>
                  <th className="py-2.5 px-3 font-semibold uppercase">Ladakh</th>
                  <th className="py-2.5 px-3 font-semibold uppercase">AJ&amp;K</th>
                  <th className="py-2.5 px-3 font-semibold uppercase">Gilgit-Baltistan</th>
                  <th className="py-2.5 px-3 font-semibold uppercase">Unique regional total</th>
                </tr>
              </thead>
              <tbody
                className="divide-y"
                style={isObs ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
              >
                {BIBLIOMETRIC_CENSUS_PERIOD_TABLE.map((row, idx) => {
                  const isTotal = idx === BIBLIOMETRIC_CENSUS_PERIOD_TABLE.length - 1;
                  return (
                    <tr key={row.period} className={isTotal ? 'font-bold' : ''}>
                      <td className="py-2 px-3 whitespace-nowrap">{row.period}</td>
                      <td className="py-2 px-3 font-mono opacity-80">{row.kashmir}</td>
                      <td className="py-2 px-3 font-mono opacity-80">{row.jammu}</td>
                      <td className="py-2 px-3 font-mono opacity-80">{row.ladakh}</td>
                      <td className="py-2 px-3 font-mono opacity-80">{row.ajk}</td>
                      <td className="py-2 px-3 font-mono opacity-80">{row.gilgitBaltistan}</td>
                      <td className="py-2 px-3 font-mono">{row.uniqueRegionalTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs italic opacity-80">
            Note: <strong>TBD</strong> indicates that the deduplicated publication count has not yet
            been retrieved and validated—it does <strong>not</strong> indicate zero publications.
            The completed database will publish individual annual counts for every single year
            (2001–2026), not merely five-year aggregates.
          </p>

          {/* Reproducible OpenAlex Query Builder */}
          <div
            className={
              isObs
                ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3'
                : 'p-4 border space-y-3'
            }
            style={cardStyle}
          >
            <p className={isObs ? 'text-xs font-mono uppercase text-cyan-300' : 'hd-kicker'}>
              REPRODUCIBLE OPENALEX API CENSUS QUERY GENERATOR (30 DISCIPLINES)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="space-y-1 block">
                <span className="opacity-75">Target Region</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className={
                    isObs
                      ? 'w-full rounded bg-slate-900 border border-slate-700 px-2.5 py-2 text-slate-100'
                      : 'w-full border px-2.5 py-2 bg-transparent'
                  }
                  style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
                >
                  <option value="All 5 Regions">All 5 Western Himalayan Regions</option>
                  {PRELIMINARY_RESEARCH_UNITS_BY_REGION_5.map((r) => (
                    <option key={r.region} value={r.region}>
                      {r.region}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="opacity-75">Environmental Discipline (01–30)</span>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className={
                    isObs
                      ? 'w-full rounded bg-slate-900 border border-slate-700 px-2.5 py-2 text-slate-100'
                      : 'w-full border px-2.5 py-2 bg-transparent'
                  }
                  style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
                >
                  {ENVIRONMENTAL_RESEARCH_DISCIPLINES_30.map((d) => (
                    <option key={d.number} value={d.discipline}>
                      {d.number}. {d.discipline}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-1 block">
                <span className="opacity-75">Institutional Provenance</span>
                <select
                  value={authorshipScope}
                  onChange={(e) =>
                    setAuthorshipScope(e.target.value as 'regional' | 'external')
                  }
                  className={
                    isObs
                      ? 'w-full rounded bg-slate-900 border border-slate-700 px-2.5 py-2 text-slate-100'
                      : 'w-full border px-2.5 py-2 bg-transparent'
                  }
                  style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
                >
                  <option value="regional">Produced by Regional Institutions</option>
                  <option value="external">All Global Studies About the Region</option>
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <code className="text-[11px] font-mono break-all opacity-85">{openAlexQuery}</code>
              <button
                type="button"
                onClick={handleCopyQuery}
                className={
                  isObs
                    ? 'shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-200 hover:bg-slate-800'
                    : 'shrink-0 inline-flex items-center gap-1 px-3 py-1.5 border text-[11px] hd-font-sans uppercase'
                }
                style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
              >
                {copiedQuery ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy API URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: 7-STAGE MISSING RESEARCH-TO-GROUND PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {RESEARCH_TO_GROUND_PIPELINE_7.map((st) => (
              <div
                key={st.stage}
                className={
                  isObs
                    ? 'p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-4'
                    : 'p-4 border flex items-center justify-between gap-4'
                }
                style={cardStyle}
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-mono uppercase opacity-75">
                    STAGE {st.stage}
                  </div>
                  <div className="text-base font-semibold">{st.title}</div>
                  <div className="text-xs opacity-80">{st.instruction}</div>
                </div>
                <span
                  className={
                    isObs
                      ? 'px-3 py-1 rounded border border-amber-500/40 bg-amber-950/30 font-mono text-sm font-bold text-amber-300 shrink-0'
                      : 'px-3 py-1 border font-mono text-sm font-bold shrink-0'
                  }
                  style={
                    isObs
                      ? undefined
                      : { borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }
                  }
                >
                  {st.status}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs italic opacity-75">
            Proposed scientific knowledge audit framework. No regional conversion or implementation
            rates have yet been measured; the investigation will empirically determine how much
            research survives each stage.
          </p>
        </div>
      )}

      {/* TAB 03: WH-RSIP & EVERY PAPER'S SECOND LIFE */}
      {activeTab === 'second_life' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={
                isObs
                  ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3'
                  : 'p-4 border space-y-3'
              }
              style={cardStyle}
            >
              <p className={isObs ? 'text-xs font-mono uppercase text-emerald-300' : 'hd-kicker'}>
                SELECT RESEARCH CATEGORY (WH-RSIP)
              </p>
              <select
                value={selectedCategoryIdx}
                onChange={(e) => setSelectedCategoryIdx(Number(e.target.value))}
                className={
                  isObs
                    ? 'w-full rounded bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100'
                    : 'w-full border px-3 py-2 text-sm bg-transparent'
                }
                style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
              >
                {RESEARCH_TO_SOCIETY_PROTOCOL_9.map((c, idx) => (
                  <option key={c.category} value={idx}>
                    {idx + 1}. {c.category}
                  </option>
                ))}
              </select>

              <div
                className="p-3.5 border-l-2 text-xs sm:text-sm leading-relaxed"
                style={
                  isObs
                    ? { borderColor: '#34d399', backgroundColor: 'rgba(6, 78, 59, 0.2)' }
                    : { borderColor: 'var(--hd-copper)' }
                }
              >
                <strong>Required Obligation: </strong>
                {RESEARCH_TO_SOCIETY_PROTOCOL_9[selectedCategoryIdx]?.obligation}
              </div>

              <div className="space-y-1.5 pt-2">
                <p className="text-xs uppercase opacity-75">
                  Target Regional Languages for Stakeholder Brief
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SECOND_LIFE_REGIONAL_LANGUAGES.map((lang) => {
                    const active = selectedLangs.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={
                          isObs
                            ? `px-2.5 py-1 rounded text-xs border ${
                                active
                                  ? 'border-emerald-400 bg-emerald-950/50 text-emerald-200 font-semibold'
                                  : 'border-slate-700 text-slate-400'
                              }`
                            : 'px-2.5 py-1 text-xs border'
                        }
                        style={
                          isObs
                            ? undefined
                            : {
                                borderColor: active ? 'var(--hd-copper)' : 'var(--hd-rule)',
                                color: active ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                                fontWeight: active ? 700 : 400,
                              }
                        }
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className={
                isObs
                  ? 'p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3'
                  : 'p-4 border space-y-3'
              }
              style={cardStyle}
            >
              <p className={isObs ? 'text-xs font-mono uppercase text-cyan-300' : 'hd-kicker'}>
                EVERY RESEARCH PAPER’S SECOND LIFE · 9 STAKEHOLDER QUESTIONS
              </p>
              <ol className="space-y-1.5 text-xs sm:text-sm">
                {SECOND_LIFE_PAPER_QUESTIONS_9.map((q, idx) => (
                  <li key={q} className="flex items-start gap-2">
                    <strong className="tabular-nums opacity-75">0{idx + 1}.</strong>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[11px] italic opacity-75 pt-1">
                Selected dissemination languages:{' '}
                <strong>{selectedLangs.join(', ') || 'English'}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
