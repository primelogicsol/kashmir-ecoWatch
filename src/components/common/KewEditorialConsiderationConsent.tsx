'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { KEW_EDITORIAL_CONSIDERATION_CONSENT_TEXT } from '@/lib/himalayan-dispatch-correspondence-types';

export function detectKewSubmissionOrigin(): 'kashmir_ecowatch' | 'himalayan_dispatch' {
  if (typeof window === 'undefined') return 'kashmir_ecowatch';
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('origin') === 'himalayan-dispatch'
      ? 'himalayan_dispatch'
      : 'kashmir_ecowatch';
  } catch {
    return 'kashmir_ecowatch';
  }
}

interface KewEditorialConsiderationConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export function KewEditorialConsiderationConsent({
  checked,
  onChange,
  id = 'kew-editorial-consideration-consent',
}: KewEditorialConsiderationConsentProps) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        <span>Optional Editorial Consideration Authorization</span>
      </div>

      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-4 h-4 rounded bg-slate-900 border-white/20 text-emerald-500 focus:ring-emerald-500 shrink-0"
        />
        <span className="text-xs text-slate-200 leading-relaxed">
          {KEW_EDITORIAL_CONSIDERATION_CONSENT_TEXT}
        </span>
      </label>

      <p className="text-[11px] text-slate-400 leading-relaxed pl-7">
        Optional and unchecked by default. Consent to editorial consideration does{' '}
        <strong className="text-slate-300">not</strong> constitute consent to publication, public
        identification, or disclosure of confidential source information.
      </p>
    </div>
  );
}
