'use client';

import React, { useState } from 'react';
import { CheckSquare, RotateCcw, Square } from 'lucide-react';
import {
  PROMISE_IMPLEMENTATION_STATUSES_11,
  WHEMP_MEASURABLE_ALTERNATIVES_7,
  WHEMP_TEN_COMPONENTS,
} from '@/data/himalayan-dispatch-when-politics-promises-green-monograph';

export function WhempManifestoWorkbench() {
  const [selectedExampleIdx, setSelectedExampleIdx] = useState<number>(0);
  const [checkedComponents, setCheckedComponents] = useState<string[]>([
    '01',
    '04',
    '06',
    '07',
    '08',
    '09',
  ]);
  const [selectedStatusCode, setSelectedStatusCode] = useState<string>('ST-01');

  const activePair =
    WHEMP_MEASURABLE_ALTERNATIVES_7[selectedExampleIdx] ||
    WHEMP_MEASURABLE_ALTERNATIVES_7[0]!;

  const activeStatus =
    PROMISE_IMPLEMENTATION_STATUSES_11.find((s) => s.code === selectedStatusCode) ||
    PROMISE_IMPLEMENTATION_STATUSES_11[0]!;

  const toggleComponent = (num: string) => {
    setCheckedComponents((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const completenessPct = Math.round(
    (checkedComponents.length / WHEMP_TEN_COMPONENTS.length) * 100
  );

  return (
    <section
      aria-label="WHEMP Manifesto Commitment Evaluator"
      className="my-10 border p-6 sm:p-8 space-y-6"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      <div
        className="pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        <div className="space-y-1">
          <p className="hd-kicker">
            PART IX · WHEMP INTERACTIVE DIAGNOSTIC WORKBENCH
          </p>
          <h3
            className="hd-font-display text-2xl sm:text-3xl font-semibold"
            style={{ color: 'var(--hd-fg)' }}
          >
            Western Himalayan Environmental Manifesto Protocol (WHEMP) Evaluator
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
          Proposed voluntary standard · Non-partisan tool
        </span>
      </div>

      {/* 1. Conventional Manifesto Slogan vs Auditable WHEMP Commitment */}
      <div className="space-y-3">
        <span className="hd-folio-meta">
          SELECT POLICY DOMAIN EXAMPLE (CONVENTIONAL SLOGAN → MEASURABLE COMMITMENT)
        </span>
        <div className="flex flex-wrap gap-2">
          {WHEMP_MEASURABLE_ALTERNATIVES_7.map(([slogan], idx) => {
            const active = idx === selectedExampleIdx;
            return (
              <button
                key={slogan}
                type="button"
                onClick={() => setSelectedExampleIdx(idx)}
                className="px-3 py-1.5 text-xs hd-font-sans tracking-[0.08em] border transition-colors"
                style={{
                  borderColor: active ? 'var(--hd-copper)' : 'var(--hd-rule)',
                  backgroundColor: active ? '#8C3125' : 'var(--hd-bg)',
                  color: active ? '#F2EFE7' : 'var(--hd-fg-secondary)',
                  fontWeight: active ? 600 : 500,
                }}
              >
                {slogan}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div
            className="p-4 border space-y-1.5"
            style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
          >
            <p className="hd-folio-meta">CONVENTIONAL ACTIVITY / SLOGAN LANGUAGE</p>
            <p
              className="hd-font-display text-xl italic"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              “{activePair[0]}”
            </p>
          </div>
          <div
            className="p-4 border-l-2 space-y-1.5"
            style={{ borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }}
          >
            <p className="hd-folio-meta" style={{ color: 'var(--hd-copper)' }}>
              PROPOSED WHEMP MEASURABLE ALTERNATIVE
            </p>
            <p
              className="hd-font-body text-sm sm:text-base font-medium leading-relaxed"
              style={{ color: 'var(--hd-fg)' }}
            >
              {activePair[1]}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Ten-Component Disclosure Checklist */}
      <div className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="hd-folio-meta">
            STRESS-TEST A MANIFESTO CLAUSE AGAINST ALL 10 WHEMP DISCLOSURES
          </span>
          <span
            className="hd-font-sans text-xs font-semibold tracking-[0.14em] uppercase"
            style={{ color: 'var(--hd-copper)' }}
          >
            {checkedComponents.length} / 10 Components Disclosed ({completenessPct}%)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {WHEMP_TEN_COMPONENTS.map((item) => {
            const isChecked = checkedComponents.includes(item.number);
            return (
              <button
                key={item.number}
                type="button"
                onClick={() => toggleComponent(item.number)}
                className="p-3 border text-left flex items-start gap-2.5 transition-colors"
                style={{
                  borderColor: isChecked ? 'var(--hd-copper)' : 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                {isChecked ? (
                  <CheckSquare
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: 'var(--hd-copper)' }}
                  />
                ) : (
                  <Square
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  />
                )}
                <div>
                  <span
                    className="hd-font-sans text-[11px] font-semibold tracking-[0.12em] uppercase block"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {item.number}. {item.component}
                  </span>
                  <span
                    className="hd-font-body text-xs leading-snug block mt-0.5"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {item.requiredDisclosure}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Eleven Evidence-Based Implementation Statuses */}
      <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
        <span className="hd-folio-meta">
          OBSERVATORY COMMITMENT LIFECYCLE (11 NON-PARTISAN EVIDENCE STATUSES)
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PROMISE_IMPLEMENTATION_STATUSES_11.map((st) => {
            const selected = st.code === selectedStatusCode;
            return (
              <button
                key={st.code}
                type="button"
                onClick={() => setSelectedStatusCode(st.code)}
                className="px-2.5 py-1 text-[11px] hd-font-sans uppercase tracking-[0.1em] border"
                style={{
                  borderColor: selected ? 'var(--hd-copper)' : 'var(--hd-rule)',
                  backgroundColor: selected ? '#8C3125' : 'var(--hd-bg)',
                  color: selected ? '#F2EFE7' : 'var(--hd-fg-secondary)',
                }}
              >
                {st.status}
              </button>
            );
          })}
        </div>
        <div
          className="p-3.5 border text-xs hd-font-body"
          style={{ borderColor: 'var(--hd-rule)', backgroundColor: 'var(--hd-bg)' }}
        >
          <strong style={{ color: 'var(--hd-fg)' }}>
            {activeStatus.code} · {activeStatus.status}:
          </strong>{' '}
          <span style={{ color: 'var(--hd-fg-secondary)' }}>{activeStatus.meaning}</span>
        </div>
      </div>

      <div
        className="pt-3 border-t flex flex-wrap items-center justify-between gap-3"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        <button
          type="button"
          onClick={() => {
            setSelectedExampleIdx(0);
            setCheckedComponents(['01', '04', '06', '07', '08', '09']);
            setSelectedStatusCode('ST-01');
          }}
          className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.16em] uppercase hover:opacity-80"
          style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset protocol example</span>
        </button>
        <p className="hd-font-body text-xs italic" style={{ color: 'var(--hd-fg-muted)' }}>
          Proposed accountability framework; zero political parties are endorsed, opposed, or
          ranked.
        </p>
      </div>
    </section>
  );
}
