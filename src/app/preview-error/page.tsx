'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PrimeLogicErrorView } from '@/components/common/PrimeLogicErrorView';
import { ErrorCategory } from '@/lib/error-logger';
import { Zap, Radio, AlertTriangle, ArrowRight, Lock, Key } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function ErrorPreviewPage() {
  const { user, isLoggedIn } = useAuth();
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ErrorCategory>('UNEXPECTED');
  const [shouldCrash, setShouldCrash] = useState(false);
  const [retryNotification, setRetryNotification] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('kew_admin_authenticated') === 'true') {
        setIsUnlocked(true);
      }
    }
  }, []);

  const isAuthorized = (isLoggedIn && user?.role === 'administrator') || isUnlocked;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'KEW-Admin-2026!') {
      setIsUnlocked(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kew_admin_authenticated', 'true');
      }
      setPassError(null);
    } else {
      setPassError('Invalid Administrator Passcode. Access restricted to authorized KEW personnel.');
    }
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold text-white">NOC Error Boundary Sandbox</h1>
            <p className="text-xs text-slate-400">
              Restricted administrative diagnostic preview. Enter the administrator passcode to access boundary simulation controls.
            </p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              placeholder="Enter administrator passcode..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (passError) setPassError(null);
              }}
              className="w-full bg-slate-950 border border-white/15 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {passError && (
              <p className="text-xs text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{passError}</span>
              </p>
            )}
            <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs py-2 rounded-lg">
              <Key className="w-3.5 h-3.5 mr-1.5" />
              <span>Unlock Boundary Sandbox</span>
            </Button>
          </form>
          <Link href="/" className="block text-center text-xs text-slate-400 hover:text-white">
            Return to Public Website
          </Link>
        </div>
      </main>
    );
  }

  // If user clicks the crash button, throw an actual uncaught React error to test src/app/error.tsx boundary
  if (shouldCrash) {
    throw new Error('Controlled Live Test Exception: Kashmir EcoWatch runtime safety boundary verified.');
  }

  const categories: { key: ErrorCategory; label: string; desc: string }[] = [
    { key: 'UNEXPECTED', label: '1. Unexpected System Crash', desc: 'Default catch-all for runtime errors.' },
    { key: 'MONITORING_INTERRUPTED', label: '2. Scientific Sensor Stale / Offline', desc: 'Zero-fabrication rule active.' },
    { key: 'DATABASE_ERROR', label: '3. Spatial Database Timeout', desc: 'PostGIS / Hypertable pool interruptions.' },
    { key: 'NETWORK_ERROR', label: '4. Telemetry Network Failure', desc: 'Downstream upstream connection drops.' },
    { key: 'RATE_LIMITED', label: '5. Excessive Traffic / Rate Limit', desc: 'API query throttling protection.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* ── TOP CONTROL BAR ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Kashmir EcoWatch · Error Experience Preview
              </div>
              <h1 className="text-sm font-bold text-slate-100">
                Prime Logic Solutions Technical Error Boundary Simulation
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('This will trigger a real uncaught JavaScript exception that will be caught by Next.js app/error.tsx. Proceed?')) {
                  setShouldCrash(true);
                }
              }}
              className="text-xs text-rose-300 border-rose-500/40 hover:bg-rose-950/40 hover:border-rose-500 rounded-[6px]"
            >
              <Zap className="w-3.5 h-3.5 mr-1 text-rose-400" />
              <span>Trigger Live Runtime Crash</span>
            </Button>

            <Link
              href="/admin/system/errors"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-semibold transition-colors"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Open NOC Live Monitor</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat.key);
                setRetryNotification(null);
              }}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── NOTIFICATION BANNER IF RETRIED ─────────────────────────────────── */}
      {retryNotification && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/30 py-2 px-4 text-center text-xs text-emerald-300">
          {retryNotification}
        </div>
      )}

      {/* ── LIVE PREVIEW CANVAS ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-950/90">
        <div className="w-full max-w-2xl">
          <div className="mb-2 text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
              Live Preview of Public-Facing Error Screen
            </span>
          </div>

          <PrimeLogicErrorView
            category={selectedCategory}
            referenceCode={`PLS-ERR-2026-${Math.random().toString(16).substring(2, 8).toUpperCase()}`}
            moduleName={
              selectedCategory === 'MONITORING_INTERRUPTED'
                ? 'Hazard Intelligence (Jhelum Hydrological Gauges)'
                : selectedCategory === 'DATABASE_ERROR'
                ? 'PostgreSQL Spatial Cluster'
                : 'Kashmir EcoWatch Core'
            }
            showHome={true}
            showRetry={true}
            onRetry={() => {
              setRetryNotification('Retry dispatched to Prime Logic Solutions gateway: connection re-tested.');
              setTimeout(() => setRetryNotification(null), 4000);
            }}
            variant="full-page"
          />
        </div>
      </main>

      {/* ── FOOTER NOTICE ─────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-slate-950 p-4 text-center text-xs text-slate-500">
        <div>
          Managed by <a href="https://primelogicsol.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Prime Logic Solutions USA</a> · Technical Support & Platform Engineering
        </div>
        <div className="text-[11px] text-slate-600 mt-1">
          Zero-Fabrication Safety: Telemetry failures are displayed explicitly without fabricating synthetic data.
        </div>
      </footer>
    </div>
  );
}
