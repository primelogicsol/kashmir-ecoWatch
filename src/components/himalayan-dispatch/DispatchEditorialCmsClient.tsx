'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { HimalayanDispatchAdminPanel } from '@/components/admin/HimalayanDispatchAdminPanel';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export function DispatchEditorialCmsClient() {
  const { user } = useAuth();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [actorName, setActorName] = useState('Himalayan Dispatch Editor');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        if (data?.authenticated) {
          setAuthenticated(true);
          if (data.actor) setActorName(data.actor);
        }
      })
      .catch(() => null)
      .finally(() => setChecking(false));
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode: passcode.trim(),
          actor: user?.name || user?.email || 'Himalayan Dispatch Editorial Administrator',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.authenticated) {
        setError('Invalid Editorial Administrator passcode. CMS access denied.');
        return;
      }
      setPasscode('');
      setAuthenticated(true);
      setActorName(data.actor || 'Himalayan Dispatch Editorial Administrator');
    } catch {
      setError('Unable to verify administrator session.');
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/admin/session', { method: 'DELETE', credentials: 'include' }).catch(
      () => null
    );
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="py-20 text-center">
        <p className="hd-kicker">VERIFYING EDITORIAL CMS CREDENTIALS…</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="max-w-xl mx-auto p-8 sm:p-10 border space-y-6" style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
          <span className="hd-kicker">RESTRICTED EDITORIAL DIRECTORATE CMS</span>
        </div>
        <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold">
          Authorize Editorial CMS Access
        </h2>
        <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
          Manage masthead appointments, correspondent credential reviews, quarantined manuscripts,
          commissioning pitches, and monthly issue workflows for Himalayan Dispatch.
        </p>

        {error && (
          <div className="p-3.5 border text-xs hd-font-body" style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="hd-cms-passcode" className="hd-kicker block">
              Editorial Administrator Passcode *
            </label>
            <input
              id="hd-cms-passcode"
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter Editorial Administrator Passcode"
              className="w-full px-4 py-3 border bg-transparent hd-font-sans text-sm"
              style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
            />
          </div>

          <button
            type="submit"
            className="w-full hd-font-sans inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] cursor-pointer"
            style={{ backgroundColor: 'var(--hd-copper-solid)' }}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Unlock Editorial CMS</span>
          </button>
        </form>

        <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--hd-rule)' }}>
          <Link href={HD_ROUTES.newsroom} className="hd-folio-meta hover:underline">
            ← Newsroom Command Desk
          </Link>
          <Link href={HD_ROUTES.journalistSignIn} className="hd-folio-meta hover:underline">
            Journalist Workspace →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className="p-4 sm:p-5 border flex flex-wrap items-center justify-between gap-4"
        style={{ borderColor: 'var(--hd-rule-strong)', backgroundColor: 'var(--hd-bg-elevated)' }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={HD_ROUTES.newsroom}
            className="hd-font-sans inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase hover:underline"
            style={{ color: 'var(--hd-copper)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Newsroom Desk</span>
          </Link>
          <span className="hd-folio-meta">AUTHORIZED ACTOR: {actorName}</span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-1.5 border text-[10px] tracking-[0.16em] uppercase cursor-pointer"
          style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
        >
          <LogOut className="w-3 h-3" />
          <span>Sign Out CMS</span>
        </button>
      </div>

      {/* Render the complete Editorial CMS + Autonomous Engine on dark studio canvas */}
      <div className="bg-slate-950 text-slate-100 p-4 sm:p-8 border border-slate-800">
        <HimalayanDispatchAdminPanel adminName={actorName} />
      </div>
    </div>
  );
}
