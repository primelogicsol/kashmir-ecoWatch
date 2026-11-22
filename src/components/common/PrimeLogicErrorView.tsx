'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RefreshCw, Home, ShieldAlert, ArrowLeft, ExternalLink, HelpCircle } from 'lucide-react';
import { ErrorCategory, ERROR_PRESETS } from '@/lib/error-logger';

export interface PrimeLogicErrorViewProps {
  category?: ErrorCategory;
  title?: string;
  description?: string;
  referenceCode?: string;
  onRetry?: () => void;
  showHome?: boolean;
  showBack?: boolean;
  showRetry?: boolean;
  variant?: 'full-page' | 'embedded';
  moduleName?: string;
}

export function PrimeLogicErrorView({
  category = 'UNEXPECTED',
  title,
  description,
  referenceCode,
  onRetry,
  showHome = true,
  showBack = false,
  showRetry,
  variant = 'full-page',
  moduleName,
}: PrimeLogicErrorViewProps) {
  const preset = ERROR_PRESETS[category] || ERROR_PRESETS.UNEXPECTED;
  const headingText = title || preset.title;
  const descriptionText = description || preset.description;
  const canRetry = showRetry !== undefined ? showRetry : (preset.retryable && !!onRetry);

  const [retrying, setRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    if (!onRetry || retrying) return;
    setRetrying(true);
    setRetryCount((prev) => prev + 1);
    try {
      onRetry();
    } finally {
      setTimeout(() => setRetrying(false), 800);
    }
  };

  const isFullPage = variant === 'full-page';

  return (
    <div
      className={
        isFullPage
          ? 'min-h-[80vh] w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950 text-slate-100'
          : 'w-full p-4 sm:p-6 bg-slate-900/80 border border-white/10 rounded-[8px] text-slate-100 backdrop-blur-md my-4'
      }
    >
      <div
        className={
          isFullPage
            ? 'max-w-xl w-full bg-slate-900/90 border border-white/10 rounded-[8px] p-6 sm:p-8 md:p-10 text-center shadow-2xl backdrop-blur-xl'
            : 'w-full text-center'
        }
      >
        {/* ── 1. PRIME LOGIC SOLUTIONS BRANDING & HEADER ──────────────────────── */}
        <div className="flex flex-col items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <a
            href="https://primelogicsol.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 transition-transform hover:scale-[1.02]"
            title="Prime Logic Solutions USA"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 p-2 rounded-[6px] bg-slate-950/80 border border-white/15 flex items-center justify-center shadow-inner group-hover:border-cyan-500/40 transition-colors">
              <Image
                src="/images/primelogic-logo.png"
                alt="Prime Logic Solutions USA"
                width={56}
                height={56}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                Prime Logic Solutions USA
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">
                Technical Support & Platform Engineering
              </div>
            </div>
          </a>

          {moduleName && (
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-[4px] bg-white/5 border border-white/10 text-slate-400">
              Affected Service: <strong className="text-slate-200 font-semibold">{moduleName}</strong>
            </span>
          )}
        </div>

        {/* ── 2. ERROR HEADING & CONTEXT-SAFE DESCRIPTION ───────────────────── */}
        <div className="space-y-3 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {headingText}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            {descriptionText}
          </p>
        </div>

        {/* ── 3. SAFE DIAGNOSTIC REFERENCE CODE ─────────────────────────────── */}
        {referenceCode && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-slate-950/90 border border-white/10 text-[10px] font-mono text-slate-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Reference Code: <strong className="text-slate-300 font-normal">{referenceCode}</strong></span>
          </div>
        )}

        {/* ── 4. RECOVERY ACTIONS ───────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {canRetry && (
            <button
              onClick={handleRetry}
              disabled={retrying || retryCount >= 5}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
              <span>{retrying ? 'Retrying...' : retryCount >= 5 ? 'Retry Limit Reached' : 'Try Again'}</span>
            </button>
          )}

          {showHome && (
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Go Home</span>
            </Link>
          )}

          {showBack && (
            <button
              onClick={() => typeof window !== 'undefined' && window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[6px] bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-white/10 text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>Previous Page</span>
            </button>
          )}
        </div>

        {/* ── 5. MANDATORY INSTITUTIONAL CSR ATTRIBUTION ────────────────────── */}
        <div className="pt-6 border-t border-white/10 text-[10px] sm:text-[11px] text-slate-400 space-y-1.5 font-mono">
          <div>
            Web Portal Developed & Maintained by{' '}
            <a
              href="https://primelogicsol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-semibold"
            >
              Prime Logic Solutions USA
            </a>
          </div>
          <div className="text-slate-400">
            As part of its Corporate Social Responsibility (CSR) Initiative.
          </div>
          <div className="pt-1">
            <a
              href="https://primelogicsol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-300 inline-flex items-center gap-1 hover:underline"
            >
              primelogicsol.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
