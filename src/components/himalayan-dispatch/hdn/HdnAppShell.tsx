'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CheckCircle2,
  FilePlus2,
  Lock,
  LogOut,
  Menu,
  Moon,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import { useHdnSession } from './HdnNewsroomProvider';
import { HDN_NAVIGATION_GROUPS, HDN_ROUTES } from '@/lib/hdn/routes';
import { HD_ROUTES, hdRoute, stripDispatchPrefix } from '@/lib/himalayan-dispatch-routes';
import type { HdnPermissionKey } from '@/types/hdn-newsroom';

function requiredPermForPath(normPath: string): HdnPermissionKey | null {
  const clean = stripDispatchPrefix(normPath);
  if (clean.startsWith('/newsroom/admin')) return 'workspace:admin';
  if (clean.startsWith('/newsroom/editorial')) return 'workspace:editorial';
  if (clean.startsWith('/newsroom/review')) return 'workspace:review';
  return null;
}

export function HdnAppShell({ children }: { children: React.ReactNode }) {
  const rawPathname = usePathname() || '';
  const stripped = stripDispatchPrefix(rawPathname);
  const pathname = stripped.startsWith('/newsroom')
    ? `/himalayan-dispatch${stripped}`
    : rawPathname;
  const router = useRouter();
  const {
    loading,
    authenticated,
    account,
    unreadCount,
    notifications,
    uiTheme,
    toggleUiTheme,
    hasPerm,
    signIn,
    signOut,
    markAllNotificationsRead,
  } = useHdnSession();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');

  // Login Gate State
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isDark = uiTheme === 'dark';

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    const res = await signIn(email, accessCode);
    setAuthBusy(false);
    if (!res.ok) {
      setAuthError(res.error || 'Authentication failed.');
      return;
    }
    setAccessCode('');
    if (pathname === '/newsroom' && res.defaultLandingRoute) {
      router.push(hdRoute(res.defaultLandingRoute));
    }
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;
    const dest = hasPerm('workspace:editorial')
      ? `${HDN_ROUTES.editorialQueue}?q=${encodeURIComponent(quickQuery.trim())}`
      : `${HDN_ROUTES.stories}?q=${encodeURIComponent(quickQuery.trim())}`;
    router.push(dest);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-amber-800 font-semibold">
            HIMALAYAN DISPATCH NEWSROOM (HDN)
          </p>
          <p className="text-sm text-slate-600">Verifying authenticated newsroom session &amp; role permissions…</p>
        </div>
      </div>
    );
  }

  // ─── UNIFIED NEWSROOM AUTHENTICATION GATE (ALL 18 ROLES) ───────────────────
  if (!authenticated || !account) {
    return (
      <div className="min-h-screen bg-[#F6F4EE] text-[#171717] flex flex-col">
        <header className="border-b border-stone-300 bg-white px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={HD_ROUTES.root}
              className="font-serif text-lg font-bold tracking-[0.1em] uppercase text-stone-900"
            >
              HIMALAYAN <span className="text-[#8C3125]">DISPATCH</span>
            </Link>
            <span className="text-[11px] font-mono uppercase tracking-widest px-2 py-0.5 bg-stone-100 border border-stone-300 text-stone-700">
              HDN OPERATING SYSTEM
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href={HD_ROUTES.joinNewsroom} className="text-[#8C3125] hover:underline">
              Apply to Join Newsroom →
            </Link>
            <Link href={HD_ROUTES.root} className="text-stone-600 hover:text-stone-900">
              Public Publication ↗
            </Link>
          </div>
        </header>

        <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#8C3125] font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>PRIVATE NEWSROOM OPERATING SYSTEM</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-stone-900">
              Himalayan Dispatch Newsroom (HDN)
            </h1>
            <p className="text-base text-stone-700 leading-relaxed max-w-2xl">
              Integrated Editorial CMS, Journalist Workspace, Regional Bureau Desks, Scientific
              Review Portal, and Executive Publishing Command Center operating on shared Kashmir
              EcoWatch infrastructure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  title: 'Journalist & Correspondent Desk',
                  desc: 'Individual commissions, block-based article editor, source vault, interview records & KEW baseline research desk.',
                },
                {
                  title: 'Editorial & Bureau Workspaces',
                  desc: '14-stage editorial workflow board, commissioning, fact-checking, copy editing, visual production & 6 regional bureaus.',
                },
                {
                  title: 'Scientific Review Workspace',
                  desc: 'Claim-level empirical, statistical & geospatial peer review with strict confidential-source isolation.',
                },
                {
                  title: 'Administrator Command Center',
                  desc: 'Consolidated approval queue, Daily Dispatch wire, Monthly Edition builder, masthead appointments & 18-role RBAC.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 bg-white border border-stone-200 rounded-lg space-y-1.5 shadow-sm"
                >
                  <h2 className="text-sm font-semibold text-stone-900">{item.title}</h2>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-600 space-y-1">
              <p className="font-semibold text-stone-800">Prospective Journalists &amp; Regional Correspondents</p>
              <p>
                Workspace accounts are activated only after credential review, charter acceptance,
                and editorial approval.{' '}
                <Link href={HD_ROUTES.joinNewsroom} className="text-[#8C3125] font-semibold underline">
                  Submit a contributor application
                </Link>{' '}
                or check your existing application status.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-stone-300 rounded-xl p-6 sm:p-8 shadow-md space-y-5">
            <div className="space-y-1 border-b border-stone-200 pb-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8C3125] font-semibold">
                AUTHENTICATED SIGN IN
              </p>
              <h2 className="text-xl font-semibold text-stone-900">
                Sign In to Your Newsroom Workspace
              </h2>
              <p className="text-xs text-stone-500">
                Enter your registered newsroom email and assigned Access Code (or Administrator Passcode).
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Newsroom Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@kashmir-ecowatch.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8C3125]/30 focus:border-[#8C3125]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Workspace Access Code / Editorial Passcode *
                </label>
                <input
                  type="password"
                  required
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="HD-KEY-XXXX or Editorial Passcode"
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#8C3125]/30 focus:border-[#8C3125]"
                />
              </div>

              <button
                type="submit"
                disabled={authBusy}
                className="w-full py-2.5 px-4 rounded-lg bg-[#8C3125] hover:bg-[#74271D] text-white text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{authBusy ? 'Authenticating…' : 'Open Newsroom Workspace'}</span>
              </button>
            </form>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <Link href={HD_ROUTES.journalistSignIn} className="hover:underline">
                Application Status &amp; Legacy Sign-In
              </Link>
              <Link href={HD_ROUTES.editorialCharter} className="hover:underline">
                Editorial Charter
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED APPLICATION SHELL (COMPACT PRODUCTIVITY LAYOUT) ─────────
  const visibleGroups = HDN_NAVIGATION_GROUPS.filter((g) => hasPerm(g.requiredPermission));
  const routeRequiredPerm = requiredPermForPath(pathname);
  const routeForbidden = Boolean(routeRequiredPerm && !hasPerm(routeRequiredPerm));

  const initials = account.fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  return (
    <div
      className={
        isDark
          ? 'hdn-theme-dark min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col'
          : 'hdn-theme-light min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col'
      }
    >
      {/* Top Productivity Command Bar */}
      <header
        className={`sticky top-0 z-40 h-14 px-4 lg:px-6 border-b flex items-center justify-between gap-3 ${
          isDark
            ? 'bg-slate-900/95 border-slate-800 backdrop-blur'
            : 'bg-white/95 border-slate-200 backdrop-blur'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-1.5 rounded-md border border-slate-300"
            aria-label="Toggle newsroom navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <Link href={HDN_ROUTES.dashboard} className="flex items-center gap-2 shrink-0">
            <span className="w-7 h-7 rounded bg-[#8C3125] text-white font-serif font-bold text-xs flex items-center justify-center">
              HD
            </span>
            <div className="leading-tight hidden sm:block">
              <div className="text-xs font-bold tracking-wide uppercase">
                Himalayan Dispatch <span className="text-[#8C3125]">Newsroom</span>
              </div>
              <div className="text-[10px] text-slate-500">
                {account.primaryRoleTitle}
              </div>
            </div>
          </Link>

          {/* Fast Workspace Mode Pills */}
          <nav className="hidden xl:flex items-center gap-1 ml-4 pl-4 border-l border-slate-200">
            {hasPerm('workspace:journalist') && (
              <Link
                href={HDN_ROUTES.dashboard}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  pathname === HDN_ROUTES.dashboard ||
                  (pathname.startsWith(`${HDN_ROUTES.dashboard}/`) &&
                    !pathname.startsWith(HDN_ROUTES.editorial) &&
                    !pathname.startsWith(HDN_ROUTES.admin) &&
                    !pathname.startsWith(HDN_ROUTES.review))
                    ? 'bg-[#8C3125] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                My Newsroom
              </Link>
            )}
            {hasPerm('workspace:editorial') && (
              <Link
                href={HDN_ROUTES.editorial}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  pathname.startsWith(HDN_ROUTES.editorial)
                    ? 'bg-[#8C3125] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Editorial CMS
              </Link>
            )}
            {hasPerm('workspace:review') && (
              <Link
                href={HDN_ROUTES.review}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  pathname.startsWith(HDN_ROUTES.review)
                    ? 'bg-[#8C3125] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Scientific Review
              </Link>
            )}
            {hasPerm('workspace:admin') && (
              <Link
                href={HDN_ROUTES.admin}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  pathname.startsWith(HDN_ROUTES.admin)
                    ? 'bg-[#8C3125] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Command Center
              </Link>
            )}
          </nav>
        </div>

        {/* Center Quick Search + Right Actions */}
        <div className="flex items-center gap-2.5">
          <form onSubmit={handleQuickSearch} className="hidden md:flex items-center relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
            <input
              type="search"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Search manuscripts, datelines…"
              className={`pl-8 pr-3 py-1.5 text-xs rounded-md border w-52 lg:w-64 focus:outline-none ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </form>

          {hasPerm('manuscript:create_own') && (
            <Link
              href={HDN_ROUTES.newStory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#8C3125] hover:bg-[#74271D] text-white text-xs font-semibold"
            >
              <FilePlus2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Story</span>
            </Link>
          )}

          <Link
            href={HD_ROUTES.root}
            target="_blank"
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-medium ${
              isDark
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Open Public Publication"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Magazine</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={toggleUiTheme}
            className={`p-1.5 rounded-md border cursor-pointer ${
              isDark
                ? 'border-slate-700 text-amber-300 hover:bg-slate-800'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title={isDark ? 'Switch to Light Workspace' : 'Switch to Dark Workspace'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen((v) => !v);
                if (!notifOpen && unreadCount > 0) void markAllNotificationsRead();
              }}
              className={`relative p-1.5 rounded-md border cursor-pointer ${
                isDark
                  ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Newsroom Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8C3125] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-xl border shadow-xl z-50 p-3 space-y-2 ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider">Notifications</span>
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Close
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">No notifications yet.</p>
                  ) : (
                    notifications.slice(0, 8).map((n) => (
                      <Link
                        key={n.id}
                        href={n.href}
                        onClick={() => setNotifOpen(false)}
                        className="block p-2.5 rounded-lg border border-slate-200/70 hover:bg-slate-50 space-y-0.5"
                      >
                        <div className="text-xs font-semibold">{n.title}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-2">
                          {n.body}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Account Badge & Sign Out */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <span className="w-7 h-7 rounded-full bg-stone-800 text-amber-200 text-xs font-bold flex items-center justify-center">
              {initials}
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="p-1.5 rounded-md text-slate-500 hover:text-rose-600 cursor-pointer"
              title="Sign Out of Newsroom"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Split: Persistent Left Sidebar + Workspace Content */}
      <div className="flex-1 flex min-h-0">
        <aside
          className={`${
            mobileMenuOpen ? 'fixed inset-y-14 left-0 z-30 w-64' : 'hidden lg:block lg:w-60 xl:w-64'
          } shrink-0 border-r overflow-y-auto p-3.5 space-y-5 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Active Identity & Role Card */}
          <div
            className={`p-3 rounded-lg border space-y-1 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="text-xs font-bold truncate">{account.fullName}</div>
            <div className="text-[11px] text-slate-500 truncate">
              {account.primaryRoleTitle}
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {account.roles.slice(0, 3).map((r) => (
                <span
                  key={r}
                  className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 border border-amber-500/30"
                >
                  {r.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          {visibleGroups.map((group) => (
            <div key={group.id} className="space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 font-semibold">
                {group.label}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  if (item.requiredPermission && !hasPerm(item.requiredPermission)) {
                    return null;
                  }
                  const itemNorm = stripDispatchPrefix(item.href);
                  const active = item.exact
                    ? pathname === itemNorm
                    : pathname === itemNorm || pathname.startsWith(`${itemNorm}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          active
                            ? 'bg-[#8C3125] text-white font-semibold'
                            : isDark
                              ? 'text-slate-300 hover:bg-slate-800'
                              : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {routeForbidden ? (
            <div className="max-w-xl mx-auto my-12 p-6 rounded-xl border border-rose-300 bg-rose-50 space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Role Permission Boundary Enforced (HTTP 403)</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                Your current newsroom role (<strong>{account.primaryRoleTitle}</strong>) does not
                include authorization for <code>{pathname}</code>. Separation of duties restricts
                editorial administration, confidential vaults, and independent scientific review to
                designated personnel.
              </p>
              <div className="pt-2">
                <Link
                  href={HDN_ROUTES.dashboard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#8C3125] text-white text-xs font-semibold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Return to Authorized Workspace</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-[1440px] mx-auto">{children}</div>
          )}
        </main>
      </div>
    </div>
  );
}
