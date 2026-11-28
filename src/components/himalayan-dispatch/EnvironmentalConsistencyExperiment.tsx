'use client';

import React, { useState } from 'react';
import { RotateCcw, Shuffle } from 'lucide-react';
import { CONSISTENCY_FRAMEWORK_DOMAINS_5 } from '@/data/himalayan-dispatch-selective-consciousness-monograph';

const RESPONSIBLE_ORGANIZATIONS = [
  {
    id: 'gov',
    label: 'Government agency',
    articlePhrase: 'A government agency',
  },
  {
    id: 'dev',
    label: 'Private developer',
    articlePhrase: 'A private developer',
  },
  {
    id: 'comm',
    label: 'Local community organization',
    articlePhrase: 'A local community organization',
  },
  {
    id: 'rel',
    label: 'Religious institution',
    articlePhrase: 'A religious institution',
  },
  {
    id: 'fam',
    label: 'Family-owned enterprise',
    articlePhrase: 'A family-owned enterprise',
  },
] as const;

const RESPONSE_OPTIONS = [
  'Oppose the project and require an alternative',
  'Permit only with independently verified safeguards',
  'Support the proposed construction',
  'Require more information before deciding',
] as const;

export function EnvironmentalConsistencyExperiment() {
  const [selectedOrgId, setSelectedOrgId] =
    useState<(typeof RESPONSIBLE_ORGANIZATIONS)[number]['id']>('gov');
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [trialHistory, setTrialHistory] = useState<
    Array<{ orgLabel: string; response: string }>
  >([]);

  const activeOrg =
    RESPONSIBLE_ORGANIZATIONS.find((o) => o.id === selectedOrgId) ||
    RESPONSIBLE_ORGANIZATIONS[0];

  const handleSelectResponse = (choice: string) => {
    setSelectedResponse(choice);
    setTrialHistory((prev) => {
      const filtered = prev.filter((item) => item.orgLabel !== activeOrg.label);
      return [...filtered, { orgLabel: activeOrg.label, response: choice }];
    });
  };

  const handleRandomizeActor = () => {
    const others = RESPONSIBLE_ORGANIZATIONS.filter((o) => o.id !== selectedOrgId);
    const next = others[Math.floor(Math.random() * others.length)] || RESPONSIBLE_ORGANIZATIONS[0];
    setSelectedOrgId(next.id);
    const existing = trialHistory.find((t) => t.orgLabel === next.label);
    setSelectedResponse(existing ? existing.response : null);
  };

  const handleReset = () => {
    setSelectedOrgId('gov');
    setSelectedResponse(null);
    setTrialHistory([]);
  };

  return (
    <section
      aria-label="Illustrative Environmental Consistency Experiment"
      className="my-10 border p-6 sm:p-8 space-y-6"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      {/* Instrument Classification Header */}
      <div
        className="pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        <div className="space-y-1">
          <p className="hd-kicker">
            VOLUME VIII · CHAPTER 44 · ILLUSTRATIVE RESEARCH INSTRUMENT
          </p>
          <h3
            className="hd-font-display text-2xl sm:text-3xl font-semibold"
            style={{ color: 'var(--hd-fg)' }}
          >
            Illustrative Environmental Consistency Experiment
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
          Proposed survey instrument · Not live data collection
        </span>
      </div>

      <p
        className="hd-font-body text-xs sm:text-sm leading-relaxed"
        style={{ color: 'var(--hd-fg-muted)' }}
      >
        Proposed survey instrument, not a live research data collection system. No responses are
        transmitted or stored. Select or randomize the responsible organization below to observe
        how the proposed randomized vignette holds physical ecological harm constant while varying
        only institutional or social identity.
      </p>

      {/* Responsible Organization Selector */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="hd-folio-meta">RESPONSIBLE ORGANIZATION (EXPERIMENTAL CONDITION)</span>
          <button
            type="button"
            onClick={handleRandomizeActor}
            className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase hover:underline"
            style={{ color: 'var(--hd-copper)' }}
          >
            <Shuffle className="w-3 h-3" />
            <span>Randomize actor arm</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {RESPONSIBLE_ORGANIZATIONS.map((org) => {
            const isSelected = org.id === selectedOrgId;
            return (
              <button
                key={org.id}
                type="button"
                onClick={() => {
                  setSelectedOrgId(org.id);
                  const prior = trialHistory.find((t) => t.orgLabel === org.label);
                  setSelectedResponse(prior ? prior.response : null);
                }}
                className="px-3.5 py-2 text-xs hd-font-sans tracking-[0.1em] uppercase border transition-colors"
                style={{
                  borderColor: isSelected ? 'var(--hd-copper)' : 'var(--hd-rule)',
                  backgroundColor: isSelected ? '#8C3125' : 'var(--hd-bg)',
                  color: isSelected ? '#F2EFE7' : 'var(--hd-fg-secondary)',
                  fontWeight: isSelected ? 600 : 500,
                }}
              >
                {org.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controlled Biophysical Scenario Prompt */}
      <div
        className="p-5 sm:p-6 border-l-2 space-y-2"
        style={{
          borderColor: 'var(--hd-copper)',
          backgroundColor: 'var(--hd-bg)',
        }}
      >
        <p className="hd-folio-meta">IDENTICAL BIOPHYSICAL SCENARIO</p>
        <p
          className="hd-font-display text-xl sm:text-2xl leading-relaxed"
          style={{ color: 'var(--hd-fg)' }}
        >
          <span
            className="underline decoration-2 underline-offset-4 font-semibold"
            style={{ textDecorationColor: '#8C3125' }}
          >
            {activeOrg.articlePhrase}
          </span>{' '}
          proposes construction within an ecologically sensitive wetland. Independent scientific
          assessment establishes that the construction would result in habitat loss and increased
          flood risk. Feasible alternatives are available.
        </p>
      </div>

      {/* Neutral Response Choices */}
      <div className="space-y-3">
        <p className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: 'var(--hd-fg)' }}>
          What action would you support?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RESPONSE_OPTIONS.map((option) => {
            const isPicked = selectedResponse === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectResponse(option)}
                className="text-left p-4 border hd-font-body text-sm leading-snug transition-colors"
                style={{
                  borderColor: isPicked ? 'var(--hd-copper)' : 'var(--hd-rule)',
                  backgroundColor: isPicked ? 'var(--hd-bg)' : 'transparent',
                  color: isPicked ? 'var(--hd-fg)' : 'var(--hd-fg-secondary)',
                  fontWeight: isPicked ? 600 : 400,
                }}
              >
                <span
                  className="hd-font-sans text-[10px] tracking-[0.14em] uppercase block mb-1"
                  style={{ color: isPicked ? 'var(--hd-copper)' : 'var(--hd-fg-muted)' }}
                >
                  {isPicked ? 'Selected in local preview' : 'Response option'}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Local Self-Consistency Reflection & Reset */}
      {trialHistory.length > 0 && (
        <div
          className="p-4 border space-y-2 text-xs"
          style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
        >
          <p className="hd-folio-meta">
            LOCAL SELF-COMPARISON ({trialHistory.length} OF {RESPONSIBLE_ORGANIZATIONS.length} ACTOR CONDITIONS TESTED)
          </p>
          <ul className="space-y-1">
            {trialHistory.map((item) => (
              <li
                key={item.orgLabel}
                className="hd-font-body flex flex-wrap items-baseline justify-between gap-2"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                <strong style={{ color: 'var(--hd-fg)' }}>{item.orgLabel}:</strong>
                <span>{item.response}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="pt-3 border-t flex flex-wrap items-center justify-between gap-3"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        <button
          type="button"
          onClick={handleReset}
          className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.16em] uppercase hover:opacity-80"
          style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset example</span>
        </button>

        <p
          className="hd-font-body text-xs italic max-w-xl"
          style={{ color: 'var(--hd-fg-muted)' }}
        >
          In the actual IRB-reviewed study (proposed n = 3,000–5,000), actor conditions are
          randomized between subjects using neutral wording that avoids encouraging any
          predetermined answer.
        </p>
      </div>

      {/* Five-Domain Analytical Consistency Framework */}
      <div
        className="pt-5 border-t space-y-3"
        style={{ borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="hd-kicker">
            FIVE-DOMAIN ENVIRONMENTAL CONSISTENCY &amp; ACCOUNTABILITY FRAMEWORK
          </span>
          <span className="hd-folio-meta">
            PROPOSED ANALYTICAL FRAMEWORK · NO SCORES CALCULATED
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CONSISTENCY_FRAMEWORK_DOMAINS_5.map((d) => (
            <div
              key={d.code}
              className="p-3.5 border space-y-1"
              style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
            >
              <p className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
                {d.code} · {d.domain.toUpperCase()}
              </p>
              <p
                className="hd-font-body text-xs leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                {d.question}
              </p>
            </div>
          ))}
        </div>
        <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
          Proposed analytical framework. No institutional, community or individual scores have been
          calculated; evaluations prioritize documented physical and statutory evidence over
          subjective moral judgments.
        </p>
      </div>
    </section>
  );
}
