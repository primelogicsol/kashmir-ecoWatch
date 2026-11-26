'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckSquare, Square } from 'lucide-react';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

const CHECKLIST_ITEMS = [
  'My pitch or manuscript focuses on a specific Western Himalayan watershed, habitat, community, or governance record rather than a broad general-interest summary.',
  'Every quantitative measurement, elevation, date, and statutory citation can be backed by primary documents, peer-reviewed literature, or field notebooks during Stage 04 fact-checking.',
  'All photographs are original natural-light or monochrome documentary exposures with zero digital fabrication, sky replacement, or composite staging.',
  'Sensitive locations of critically endangered taxa (e.g., Hangul calving hollows, rare medicinal flora) and confidential whistleblowers are protected from public coordinate disclosure.',
  'Where substantive allegations are made against named agencies or contractors, I am prepared to support documented pre-publication right-of-reply outreach.',
];

export function ContributorReadinessChecklistClient() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const completedCount = Object.values(checked).filter(Boolean).length;
  const allReady = completedCount === CHECKLIST_ITEMS.length;

  return (
    <section
      className="p-6 sm:p-10 border space-y-6"
      style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
        <div>
          <p className="hd-kicker">INTERACTIVE PRE-SUBMISSION AUDIT</p>
          <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold">
            Manuscript &amp; Pitch Readiness Verification
          </h2>
        </div>
        <span className="hd-folio-meta">
          {completedCount} OF {CHECKLIST_ITEMS.length} AFFIRMED
        </span>
      </div>

      <div className="space-y-3">
        {CHECKLIST_ITEMS.map((item, idx) => {
          const isOn = Boolean(checked[idx]);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }))}
              className="w-full text-left p-4 border flex items-start gap-3.5 cursor-pointer transition-colors"
              style={{
                borderColor: isOn ? 'var(--hd-copper)' : 'var(--hd-rule)',
                backgroundColor: isOn ? 'var(--hd-copper-soft)' : 'var(--hd-bg)',
              }}
            >
              {isOn ? (
                <CheckSquare className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              ) : (
                <Square className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--hd-stone)' }} />
              )}
              <span className="hd-font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                {item}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
        <p className="hd-font-body text-sm italic" style={{ color: 'var(--hd-fg-muted)' }}>
          {allReady
            ? 'All pre-submission standards affirmed. Proceed to the Commissioning Desk or Correspondent Applications.'
            : 'Check all five editorial verification criteria above before transmitting a pitch.'}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={HD_ROUTES.pitch}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
            style={{
              backgroundColor: 'var(--hd-copper-solid)',
              opacity: allReady ? 1 : 0.75,
            }}
          >
            <span>Proceed to Pitch Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={HD_ROUTES.correspondentApplications}
            className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
          >
            <span>Apply as Correspondent</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
