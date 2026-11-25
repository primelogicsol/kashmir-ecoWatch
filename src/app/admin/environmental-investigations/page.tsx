'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Scale } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EnvironmentalInvestigationsAdminPanel } from '@/components/admin/EnvironmentalInvestigationsAdminPanel';

export default function AdminEnvironmentalInvestigationsPage() {
  const { user, isLoggedIn } = useAuth();
  const [sessionAuthed, setSessionAuthed] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((r) => r.json())
      .then((s) => {
        if (s?.authenticated) setSessionAuthed(true);
      })
      .catch(() => {});
  }, []);

  const isAuthorized = (isLoggedIn && user?.role === 'administrator') || sessionAuthed;

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/session', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passcode: passcode.trim(),
        actor: user?.name || 'KEW Administrator',
      }),
    });
    if (res.ok) {
      setSessionAuthed(true);
      setError(null);
    } else {
      setError('Invalid Administrator Passcode.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20">
      <div className="page-content__inner space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-black text-white">
              KEW-EIAI Administrative Workspace
            </h1>
          </div>
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Central Admin Console
            </Button>
          </Link>
        </div>

        {!isAuthorized ? (
          <Card padding="lg" className="max-w-md mx-auto space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>Administrator Authentication Required</span>
            </div>
            <p className="text-xs text-slate-300">
              Reuses KEW’s existing administrator role &amp; session gate. Sign in as an administrator or enter the master console passcode:
            </p>
            {error && <div className="text-xs text-red-400">{error}</div>}
            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Administrator Passcode"
                className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-xs text-white"
              />
              <Button type="submit" size="sm">Unlock Investigation Workspace</Button>
            </form>
          </Card>
        ) : (
          <EnvironmentalInvestigationsAdminPanel adminName={user?.name || 'KEW Administrator'} />
        )}
      </div>
    </main>
  );
}
