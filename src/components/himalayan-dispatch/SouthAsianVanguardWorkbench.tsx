'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Compass,
  GraduationCap,
  HeartHandshake,
  Microscope,
  Newspaper,
  Scale,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  ADVERSITY_AND_ASYMMETRY_15,
  BIOGRAPHICAL_DOSSIER_20_SECTIONS,
  COLLECTIVE_INTROSPECTION_LETTERS_5,
  FIVE_YEAR_INITIAL_ROADMAP_2027_2031,
  FOUR_PROFESSIONAL_MIRRORS,
  FOUR_PROFESSIONS_SYNERGY_SCENARIOS_6,
  LEADERSHIP_AGENDA_PROGRAMMES_10,
  SOUTH_ASIAN_VANGUARD_32_PERSONALITIES,
  type VanguardCountry,
  type VanguardMirrorId,
} from '@/data/himalayan-dispatch-south-asian-vanguard-monograph';

type VanguardTab = 'mirrors' | 'synergy' | 'introspection' | 'agenda';

export function SouthAsianVanguardWorkbench({
  variant = 'editorial',
}: {
  variant?: 'editorial' | 'observatory';
}) {
  const isDark = variant === 'observatory';
  const [activeTab, setActiveTab] = useState<VanguardTab>('mirrors');

  // Tab 1 state
  const [mirrorFilter, setMirrorFilter] = useState<'ALL' | VanguardMirrorId>('ALL');
  const [countryFilter, setCountryFilter] = useState<'ALL' | VanguardCountry>('ALL');
  const [query, setQuery] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState<string>('m-c-mehta');

  // Tab 2 state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('urban-lake');
  const [selectedSpecMirror, setSelectedSpecMirror] =
    useState<VanguardMirrorId>('jurisprudence');

  // Tab 3 state
  const [selectedLetterId, setSelectedLetterId] = useState<string>('students');

  const filteredPersonalities = useMemo(() => {
    return SOUTH_ASIAN_VANGUARD_32_PERSONALITIES.filter((p) => {
      if (mirrorFilter !== 'ALL' && p.mirrorId !== mirrorFilter) return false;
      if (countryFilter !== 'ALL' && p.country !== countryFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.primaryAffiliationOrContext.toLowerCase().includes(q) ||
          p.proposedLearningPathwayForKashmir.toLowerCase().includes(q) ||
          p.verifiedMilestoneSummary.toLowerCase().includes(q) ||
          (p.westernHimalayanConnection || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [mirrorFilter, countryFilter, query]);

  const activePerson = useMemo(() => {
    return (
      filteredPersonalities.find((p) => p.id === selectedPersonId) ||
      filteredPersonalities[0] ||
      SOUTH_ASIAN_VANGUARD_32_PERSONALITIES[1]!
    );
  }, [filteredPersonalities, selectedPersonId]);

  const activeScenario = useMemo(
    () =>
      FOUR_PROFESSIONS_SYNERGY_SCENARIOS_6.find(
        (s) => s.id === selectedScenarioId
      ) || FOUR_PROFESSIONS_SYNERGY_SCENARIOS_6[0]!,
    [selectedScenarioId]
  );

  const activeMirrorSpec = useMemo(
    () =>
      FOUR_PROFESSIONAL_MIRRORS.find((m) => m.id === selectedSpecMirror) ||
      FOUR_PROFESSIONAL_MIRRORS[0]!,
    [selectedSpecMirror]
  );

  const activeLetter = useMemo(
    () =>
      COLLECTIVE_INTROSPECTION_LETTERS_5.find((l) => l.id === selectedLetterId) ||
      COLLECTIVE_INTROSPECTION_LETTERS_5[4]!,
    [selectedLetterId]
  );

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

  const tabClass = (active: boolean) => {
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
      id="south-asian-vanguard-workbench"
      aria-label="South Asia's Environmental Vanguard Interactive Professional Mirrors Workbench"
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
            <Sparkles
              className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-[#8C3125]'}`}
            />
            <span
              className={
                isDark
                  ? 'text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400'
                  : 'hd-kicker'
              }
            >
              INTERACTIVE FOUR-MIRROR WORKBENCH · 32 PERSONALITIES · 4 PROFESSIONS · INDIA &amp; PAKISTAN
            </span>
          </div>
          <h3
            className={
              isDark
                ? 'text-2xl sm:text-3xl font-bold text-white'
                : 'hd-font-display text-2xl sm:text-3xl font-semibold'
            }
          >
            Professional Mirrors, Interdisciplinary Convergence &amp; 2027–2035 Leadership Lab
          </h3>
          <p
            className={
              isDark
                ? 'text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed'
                : 'hd-font-body text-xs sm:text-sm leading-relaxed max-w-4xl opacity-85'
            }
          >
            A non-ranking educational and professional-introspection studio connecting thirty-two
            South Asian environmental pioneers directly to the challenges facing advocates, NGOs,
            journalists, scientists, and students across the Western Himalayas.
          </p>
        </div>

        <Link
          href={
            isDark
              ? '/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard'
              : '/resources/kew-green-heroes/south-asian-vanguard'
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
              ? 'Open 7-Volume Monograph 08'
              : 'Open KEW Green Heroes Collection'}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('mirrors')}
          className={tabClass(activeTab === 'mirrors')}
          style={
            !isDark && activeTab !== 'mirrors'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          1. 32-Personality Four-Mirror Studio
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('synergy')}
          className={tabClass(activeTab === 'synergy')}
          style={
            !isDark && activeTab !== 'synergy'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          2. Four Professions Working Together (6 Crises + 42 Pathways)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('introspection')}
          className={tabClass(activeTab === 'introspection')}
          style={
            !isDark && activeTab !== 'introspection'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          3. Five Letters of Introspection &amp; Adversity Matrix
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('agenda')}
          className={tabClass(activeTab === 'agenda')}
          style={
            !isDark && activeTab !== 'agenda'
              ? { borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }
              : undefined
          }
        >
          4. 2027–2035 Leadership Agenda &amp; 20-Section Standard
        </button>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 1: 32-PERSONALITY FOUR-MIRROR STUDIO
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'mirrors' && (
        <div className="space-y-5">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'ALL' as const, label: 'All 32 Pioneers' },
                { id: 'jurisprudence' as const, label: 'Advocates (8)' },
                { id: 'civil_society' as const, label: 'NGO Leaders (8)' },
                { id: 'journalism' as const, label: 'Journalists (8)' },
                { id: 'science' as const, label: 'Scientists (8)' },
              ].map((m) => {
                const active = mirrorFilter === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMirrorFilter(m.id)}
                    className={`px-2.5 py-1 text-xs border cursor-pointer ${
                      isDark
                        ? active
                          ? 'rounded bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                          : 'rounded bg-slate-950 border-slate-800 text-slate-400'
                        : active
                          ? 'border-[#8C3125] text-[#8C3125] font-semibold'
                          : 'opacity-75'
                    }`}
                    style={
                      !isDark && !active
                        ? { borderColor: 'var(--hd-rule)' }
                        : undefined
                    }
                  >
                    {m.label}
                  </button>
                );
              })}

              <span className="mx-1 opacity-30">|</span>

              {(['ALL', 'India', 'Pakistan'] as const).map((ct) => {
                const active = countryFilter === ct;
                return (
                  <button
                    key={ct}
                    type="button"
                    onClick={() => setCountryFilter(ct)}
                    className={`px-2.5 py-1 text-xs border cursor-pointer ${
                      isDark
                        ? active
                          ? 'rounded bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold'
                          : 'rounded bg-slate-950 border-slate-800 text-slate-400'
                        : active
                          ? 'border-[#8C3125] text-[#8C3125] font-semibold'
                          : 'opacity-75'
                    }`}
                    style={
                      !isDark && !active
                        ? { borderColor: 'var(--hd-rule)' }
                        : undefined
                    }
                  >
                    {ct === 'ALL' ? 'Both Countries' : `${ct} (16)`}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[230px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Rajouri, Baltistan, CSE, snow leopard..."
                className={`w-full pl-8 pr-3 py-1.5 text-xs border outline-none ${
                  isDark
                    ? 'rounded-lg bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500'
                    : 'bg-transparent'
                }`}
                style={
                  isDark ? undefined : { borderColor: 'var(--hd-rule-strong)' }
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Roster List */}
            <div
              className={`lg:col-span-5 max-h-[430px] overflow-y-auto divide-y border ${
                isDark ? 'rounded-xl border-slate-800 divide-slate-800' : ''
              }`}
              style={isDark ? undefined : { borderColor: 'var(--hd-rule)' }}
            >
              {filteredPersonalities.map((person) => {
                const selected = person.id === activePerson.id;
                return (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => setSelectedPersonId(person.id)}
                    className={`w-full text-left p-3 transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                      isDark
                        ? selected
                          ? 'bg-emerald-950/45 text-white'
                          : 'bg-slate-950/60 text-slate-300 hover:bg-slate-900'
                        : selected
                          ? 'bg-[#8C3125]/10 font-semibold'
                          : 'hover:opacity-80'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase opacity-70">
                        Ch. {person.chapterNumber} · {person.mirrorLabel}
                      </div>
                      <div className="text-sm font-semibold">{person.name}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 border opacity-80 shrink-0">
                      {person.country}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Personality Mirror Card */}
            <div
              className={`lg:col-span-7 p-5 sm:p-6 border space-y-4 ${
                isDark ? 'rounded-xl border-slate-800 bg-slate-950/85' : ''
              }`}
              style={
                isDark
                  ? undefined
                  : { borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-75">
                  MONOGRAPH 08 · VOLUME {activePerson.volumeRoman} · CHAPTER{' '}
                  {activePerson.chapterNumber}
                </span>
                <span className="text-[11px] font-mono font-bold">
                  {activePerson.country} · {activePerson.mirrorLabel}
                </span>
              </div>

              <div>
                <h4 className="text-2xl sm:text-3xl font-bold">{activePerson.name}</h4>
                <p className="text-xs sm:text-sm opacity-80 mt-1">
                  {activePerson.primaryAffiliationOrContext}
                </p>
              </div>

              {activePerson.westernHimalayanConnection && (
                <div
                  className={`p-3 border-l-2 text-xs leading-relaxed ${
                    isDark
                      ? 'border-emerald-400 bg-emerald-950/25 text-emerald-200'
                      : 'border-[#8C3125]'
                  }`}
                  style={
                    isDark ? undefined : { backgroundColor: 'var(--hd-bg-elevated)' }
                  }
                >
                  <strong>Direct Western Himalayan Connection:</strong>{' '}
                  {activePerson.westernHimalayanConnection}
                </div>
              )}

              <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  Representative Documented Contributions
                </div>
                <p>{activePerson.verifiedMilestoneSummary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  className="p-3 border space-y-1"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Proposed Learning Pathway for Kashmir
                  </div>
                  <div className="font-semibold">
                    {activePerson.proposedLearningPathwayForKashmir}
                  </div>
                </div>
                <div
                  className="p-3 border space-y-1"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <div className="text-[10px] font-mono uppercase opacity-70">
                    Introspection Question for Our Region
                  </div>
                  <div className="italic">{activePerson.kashmirCounterpartQuestion}</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t text-xs" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                <span className="text-[11px] opacity-75">
                  {activePerson.biographicalResearchStatus}
                </span>
                <Link
                  href={`/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard/chapters/${activePerson.chapterSlug}`}
                  className={`font-semibold inline-flex items-center gap-1 hover:underline ${
                    isDark ? 'text-emerald-400' : 'text-[#8C3125]'
                  }`}
                >
                  <span>Open 20-Section Chapter Protocol</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 2: FOUR PROFESSIONS WORKING TOGETHER + 42 REGIONAL PATHWAYS
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'synergy' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider opacity-75">
              Select a Western Himalayan Ecological Crisis to See How All Four Professions Interlock:
            </div>
            <div className="flex flex-wrap gap-2">
              {FOUR_PROFESSIONS_SYNERGY_SCENARIOS_6.map((sc) => {
                const active = sc.id === activeScenario.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedScenarioId(sc.id)}
                    className={`px-3 py-1.5 text-xs font-medium border cursor-pointer ${
                      isDark
                        ? active
                          ? 'rounded-lg bg-emerald-600 border-emerald-500 text-white'
                          : 'rounded-lg bg-slate-950 border-slate-800 text-slate-300'
                        : active
                          ? 'border-[#8C3125] text-[#8C3125] font-semibold'
                          : 'opacity-80'
                    }`}
                    style={
                      !isDark && !active
                        ? { borderColor: 'var(--hd-rule)' }
                        : undefined
                    }
                  >
                    {sc.ecologicalChallenge.split('(')[0]!.trim()}
                  </button>
                );
              })}
            </div>
          </div>

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
            <div>
              <h4 className="text-lg font-bold">{activeScenario.ecologicalChallenge}</h4>
              <p className="text-xs opacity-75">
                Regional Landscape Context: {activeScenario.regionalExample}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 border space-y-1.5" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                <div className="font-mono uppercase text-[10px] font-bold flex items-center gap-1.5">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>01. Environmental Scientist</span>
                </div>
                <p className="leading-relaxed opacity-90">{activeScenario.scientistRole}</p>
              </div>
              <div className="p-3.5 border space-y-1.5" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                <div className="font-mono uppercase text-[10px] font-bold flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>02. Environmental Journalist</span>
                </div>
                <p className="leading-relaxed opacity-90">{activeScenario.journalistRole}</p>
              </div>
              <div className="p-3.5 border space-y-1.5" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                <div className="font-mono uppercase text-[10px] font-bold flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>03. Environmental Advocate</span>
                </div>
                <p className="leading-relaxed opacity-90">{activeScenario.advocateRole}</p>
              </div>
              <div className="p-3.5 border space-y-1.5" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
                <div className="font-mono uppercase text-[10px] font-bold flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>04. Environmental NGO</span>
                </div>
                <p className="leading-relaxed opacity-90">{activeScenario.ngoRole}</p>
              </div>
            </div>
          </div>

          {/* 42 Regional Specialization Pathways */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                What Their Journeys Hold for Kashmir — 42 Specialization Pathways
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FOUR_PROFESSIONAL_MIRRORS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedSpecMirror(m.id)}
                    className={`px-2.5 py-1 text-[11px] border cursor-pointer ${
                      selectedSpecMirror === m.id
                        ? isDark
                          ? 'rounded bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                          : 'border-[#8C3125] text-[#8C3125] font-semibold'
                        : 'opacity-75'
                    }`}
                  >
                    Mirror {m.mirrorNumberRoman} ({m.specializationRows.length})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              {activeMirrorSpec.specializationRows.map(([left, right], i) => (
                <div
                  key={i}
                  className="p-3 border flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                  style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
                >
                  <span className="font-semibold">{left}</span>
                  <span className="opacity-80 sm:text-right">→ {right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 3: FIVE COLLECTIVE LETTERS OF INTROSPECTION & 15 ADVERSITIES
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'introspection' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {COLLECTIVE_INTROSPECTION_LETTERS_5.map((lt) => {
              const active = lt.id === activeLetter.id;
              return (
                <button
                  key={lt.id}
                  type="button"
                  onClick={() => setSelectedLetterId(lt.id)}
                  className={`px-3 py-1.5 text-xs font-semibold border cursor-pointer ${
                    isDark
                      ? active
                        ? 'rounded-lg bg-emerald-600 border-emerald-500 text-white'
                        : 'rounded-lg bg-slate-950 border-slate-800 text-slate-300'
                      : active
                        ? 'bg-[#8C3125] text-[#F2EFE7] border-[#8C3125]'
                        : 'opacity-80'
                  }`}
                  style={
                    !isDark && !active
                      ? { borderColor: 'var(--hd-rule-strong)' }
                      : undefined
                  }
                >
                  {lt.audienceTitle}
                </button>
              );
            })}
          </div>

          <div
            className={`p-6 border space-y-3 ${
              isDark ? 'rounded-xl border-slate-800 bg-slate-950/85' : ''
            }`}
            style={
              isDark
                ? undefined
                : { borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg)' }
            }
          >
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-75">
              SECTION VI · COLLECTIVE NON-HUMILIATING REGIONAL INTROSPECTION
            </div>
            <h4 className="text-2xl font-bold">{activeLetter.audienceTitle}</h4>
            <p className="text-sm leading-relaxed opacity-90">
              {activeLetter.recognitionOfDifficulty}
            </p>
            <p className="text-base italic font-medium leading-relaxed">
              “{activeLetter.constructiveQuestion}”
            </p>
            <div className="pt-2 border-t text-xs" style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}>
              <strong>Practical Starting Point:</strong> {activeLetter.actionableFirstStep}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
            {ADVERSITY_AND_ASYMMETRY_15.slice(0, 9).map((ad) => (
              <div
                key={ad.no}
                className="p-3 border space-y-1"
                style={isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }}
              >
                <div className="font-semibold">
                  {ad.no}. {ad.professionalChallenge}
                </div>
                <div className="opacity-80 text-[11px]">
                  {ad.whatRegionalCommunityCanExamine}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────────
          TAB 4: 2027–2035 LEADERSHIP AGENDA & 20-SECTION BIOGRAPHICAL STANDARD
         ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'agenda' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider font-bold">
                10 Proposed Capacity Pathways (2027–2035 — Proposed Agenda, Not Currently Funded)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {LEADERSHIP_AGENDA_PROGRAMMES_10.map((pr) => (
                  <div
                    key={pr.no}
                    className="p-3 border space-y-1"
                    style={
                      isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }
                    }
                  >
                    <div className="font-bold">
                      {pr.no}. {pr.programme}
                    </div>
                    <div className="opacity-85 text-[11px]">{pr.intendedOutcome}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider font-bold">
                  First Five Years (2027–2031 Proposed Milestones)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                  {FIVE_YEAR_INITIAL_ROADMAP_2027_2031.map((yr) => (
                    <div
                      key={yr.year}
                      className="p-2.5 border space-y-1"
                      style={
                        isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }
                      }
                    >
                      <div className="font-mono font-bold text-sm">{yr.year}</div>
                      <div className="text-[11px] opacity-85 leading-snug">
                        {yr.proposedPriority}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`lg:col-span-5 p-4 border space-y-2.5 max-h-[430px] overflow-y-auto ${
                isDark ? 'rounded-xl border-slate-800 bg-slate-950/80' : ''
              }`}
              style={
                isDark
                  ? undefined
                  : { borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }
              }
            >
              <div className="text-[11px] font-mono uppercase tracking-wider font-bold">
                20-Section Individual Biographical Dossier Standard (Zero Manufactured Adversity)
              </div>
              <div className="space-y-1.5 text-xs">
                {BIOGRAPHICAL_DOSSIER_20_SECTIONS.map((sec) => (
                  <div
                    key={sec.sectionNumber}
                    className="p-2 border flex items-baseline justify-between gap-2"
                    style={
                      isDark ? { borderColor: '#1e293b' } : { borderColor: 'var(--hd-rule)' }
                    }
                  >
                    <span className="font-semibold">
                      {sec.sectionNumber}. {sec.requiredContent}
                    </span>
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
