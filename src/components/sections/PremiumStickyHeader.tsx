'use client';

import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { Logo } from '@/components/common/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Leaf,
  Menu,
  Newspaper,
  X,
  ChevronDown,
  Bell,
  Settings,
  User,
  Shield,
  Search,
  Droplet,
  AlertTriangle,
  Calendar,
  BarChart3,
  BookOpen,
  Globe,
  FileText,
  LogIn,
  LogOut,
  Layers,
  Music,
  Video,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrolledHeader } from '@/hooks/useScrolledHeader';
import { cn } from '@/lib/utils';
import { HeaderSearch } from '@/components/navigation/HeaderSearch';
import {
  KewControlCenter,
  formatContributorRoleLabel,
  isUsableAvatarUrl,
  type ControlCenterTab,
} from '@/components/navigation/KewControlCenter';
import { useLiveAlerts } from '@/hooks/useLiveAlerts';
import { useAuth } from '@/context/AuthContext';
import {
  GLOBAL_NAV_ITEMS,
  getGlobalDropdownItems,
  type GlobalDropdownItem,
} from '@/data/global-navigation';
import {
  DISPATCH_SUBDOMAIN_DIRECT_URL,
  getDirectDispatchHeaderUrl,
  IS_DISPATCH_SUBDOMAIN_LIVE,
} from '@/lib/himalayan-dispatch-routes';

export function PremiumStickyHeader() {
  const pathname = usePathname();
  const { user, isLoggedIn, signOut, openAuthModal } = useAuth();
  const { isScrolled, isCompact } = useScrolledHeader({ threshold: 60, smoothTransition: true });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSubmenus, setExpandedMobileSubmenus] = useState<Set<string>>(new Set());
  const [expandedHazardGroups, setExpandedHazardGroups] = useState<Set<string>>(
    () => new Set(['atmospheric', 'hazard-systems'])
  );

  const toggleHazardGroup = (gid: string) => {
    setExpandedHazardGroups((prev) => {
      const next = new Set(prev);
      if (next.has(gid)) next.delete(gid);
      else next.add(gid);
      return next;
    });
  };

  const [activeHeaderModal, setActiveHeaderModal] = useState<
    'search' | 'control-center' | null
  >(null);
  const [requestedControlTab, setRequestedControlTab] = useState<ControlCenterTab | null>(null);
  const [requestedControlTabSeq, setRequestedControlTabSeq] = useState<number>(0);
  const [isServerAdmin, setIsServerAdmin] = useState<boolean>(false);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState<boolean>(false);

  const liveAlerts = useLiveAlerts();
  const { unreadCount, unreadCriticalCount } = liveAlerts;

  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileSuggestions, setMobileSuggestions] = useState<any[]>([]);

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [user?.avatar]);

  // Verify real server-side administrator clearance before exposing any Admin Command links
  useEffect(() => {
    let active = true;
    const verifyServerAdmin = async () => {
      try {
        const res = await fetch('/api/admin/session', {
          cache: 'no-store',
          credentials: 'same-origin',
        });
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          setIsServerAdmin(Boolean(data?.authenticated && data?.role === 'administrator'));
        } else {
          setIsServerAdmin(false);
        }
      } catch {
        if (active) setIsServerAdmin(false);
      }
    };

    verifyServerAdmin();
    window.addEventListener('kew_admin_session_updated', verifyServerAdmin);
    return () => {
      active = false;
      window.removeEventListener('kew_admin_session_updated', verifyServerAdmin);
    };
  }, [user?.id, isLoggedIn, pathname]);

  const openControlCenterOnTab = (tab: ControlCenterTab) => {
    setRequestedControlTab(tab);
    setRequestedControlTabSeq((n) => n + 1);
    setActiveHeaderModal('control-center');
  };

  useEffect(() => {
    if (!isMobileMenuOpen || mobileSearchQuery.trim().length < 2) {
      setMobileSuggestions([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search/suggest?q=${encodeURIComponent(mobileSearchQuery.trim())}&limit=3`, {
        signal: ctrl.signal,
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d?.groups)
            setMobileSuggestions(d.groups.flatMap((g: any) => g.items || []).slice(0, 6));
        })
        .catch(() => {});
    }, 110);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [mobileSearchQuery, isMobileMenuOpen]);

  const headerActionsRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const navMeasureRef = useRef<HTMLDivElement>(null);
  const designationSlotRef = useRef<HTMLDivElement>(null);
  const designationMeasureRef = useRef<HTMLSpanElement>(null);
  const [navMode, setNavMode] = useState<'auto' | 'full' | 'compact'>('auto');
  const navModeRef = useRef<'auto' | 'full' | 'compact'>('auto');
  const [designationFit, setDesignationFit] = useState<'auto' | 'visible' | 'hidden'>('auto');
  const designationFitRef = useRef<'auto' | 'visible' | 'hidden'>('auto');
  const [navFitMetrics, setNavFitMetrics] = useState<{ available: number; required: number }>({
    available: 0,
    required: 0,
  });

  // Content-aware + viewport-aware single-row navigation & central designation measurement with hysteresis
  const evaluateNavigationFit = useCallback(() => {
    if (typeof window === 'undefined') return;

    // 1. Central Institutional Designation Container-Aware Collision Guard
    const slotEl = designationSlotRef.current;
    const desigRulerEl = designationMeasureRef.current;
    if (slotEl && desigRulerEl) {
      const slotStyles = window.getComputedStyle(slotEl);
      const slotPadL = parseFloat(slotStyles.paddingLeft || '0') || 0;
      const slotPadR = parseFloat(slotStyles.paddingRight || '0') || 0;
      const availableCenterPx = Math.floor(slotEl.clientWidth - slotPadL - slotPadR);
      const requiredDesigPx = Math.ceil(
        desigRulerEl.getBoundingClientRect().width || desigRulerEl.scrollWidth
      );

      if (requiredDesigPx > 0) {
        const currentDesig = designationFitRef.current;
        // Hysteresis buffer prevents boundary flicker during smooth window resize or browser zoom
        const desigMargin = currentDesig === 'hidden' ? 28 : 16;
        const nextDesigFit: 'visible' | 'hidden' =
          availableCenterPx >= requiredDesigPx + desigMargin ? 'visible' : 'hidden';
        if (nextDesigFit !== currentDesig) {
          designationFitRef.current = nextDesigFit;
          setDesignationFit(nextDesigFit);
        }
      }
    }

    // 2. Primary 14-Module Navigation Row Fit Audit
    const innerEl = headerInnerRef.current;
    const rulerEl = navMeasureRef.current;
    if (!innerEl || !rulerEl) return;

    const innerStyles = window.getComputedStyle(innerEl);
    const padL = parseFloat(innerStyles.paddingLeft || '0') || 0;
    const padR = parseFloat(innerStyles.paddingRight || '0') || 0;
    const availableWidth = Math.floor(innerEl.clientWidth - padL - padR);
    const requiredWidth = Math.ceil(rulerEl.getBoundingClientRect().width || rulerEl.scrollWidth);
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

    setNavFitMetrics((prev) =>
      prev.available === availableWidth && prev.required === requiredWidth
        ? prev
        : { available: availableWidth, required: requiredWidth }
    );

    if (availableWidth <= 0 || requiredWidth <= 0) return;

    // Short landscape viewports (< 500px CSS height) always use Compact Explore to preserve vertical screen space
    if (viewportHeight < 500) {
      if (navModeRef.current !== 'compact') {
        navModeRef.current = 'compact';
        setNavMode('compact');
        setActiveDropdown(null);
      }
      return;
    }

    // Hysteresis deadband prevents any oscillation when resizing pixel-by-pixel near the threshold:
    // - Switch Full -> Compact when availableWidth < requiredWidth + 8px
    // - Switch Compact -> Full only when availableWidth >= requiredWidth + 20px
    const current = navModeRef.current;
    const safetyMargin = current === 'compact' ? 20 : 8;
    const nextMode: 'full' | 'compact' =
      availableWidth >= requiredWidth + safetyMargin ? 'full' : 'compact';

    if (nextMode !== current) {
      navModeRef.current = nextMode;
      setNavMode(nextMode);
      if (nextMode === 'compact') {
        setActiveDropdown(null);
      } else {
        setIsMobileMenuOpen(false);
      }
    }
  }, []);

  useLayoutEffect(() => {
    evaluateNavigationFit();
  }, [evaluateNavigationFit]);

  useEffect(() => {
    evaluateNavigationFit();

    let rafId: number | null = null;
    const scheduleMeasure = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        evaluateNavigationFit();
      });
    };

    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleMeasure) : null;
    if (ro) {
      if (headerInnerRef.current) ro.observe(headerInnerRef.current);
      if (navMeasureRef.current) ro.observe(navMeasureRef.current);
      if (designationSlotRef.current) ro.observe(designationSlotRef.current);
      if (designationMeasureRef.current) ro.observe(designationMeasureRef.current);
      if (headerActionsRef.current) ro.observe(headerActionsRef.current);
    }

    window.addEventListener('resize', scheduleMeasure, { passive: true });
    window.addEventListener('orientationchange', scheduleMeasure, { passive: true });
    window.visualViewport?.addEventListener('resize', scheduleMeasure, { passive: true });

    if (typeof document !== 'undefined' && 'fonts' in document) {
      (document as Document & { fonts: FontFaceSet }).fonts.ready
        .then(scheduleMeasure)
        .catch(() => {});
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
      window.removeEventListener('orientationchange', scheduleMeasure);
      window.visualViewport?.removeEventListener('resize', scheduleMeasure);
    };
  }, [evaluateNavigationFit]);
  const [dispatchDirectUrl, setDispatchDirectUrl] = useState<string>(() =>
    getDirectDispatchHeaderUrl(IS_DISPATCH_SUBDOMAIN_LIVE)
  );
  const [isDispatchSubdomainVerified, setIsDispatchSubdomainVerified] = useState<boolean>(
    IS_DISPATCH_SUBDOMAIN_LIVE
  );

  useEffect(() => {
    let active = true;
    fetch('/api/himalayan-dispatch/subdomain-status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        const verified = Boolean(data.ready && data.tlsValid && data.statusCode === 200);
        setIsDispatchSubdomainVerified(verified);
        const isLocalDevHost =
          typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        if (verified && (!isLocalDevHost || IS_DISPATCH_SUBDOMAIN_LIVE)) {
          setDispatchDirectUrl(DISPATCH_SUBDOMAIN_DIRECT_URL);
        } else {
          setDispatchDirectUrl('/himalayan-dispatch');
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveHeaderModal((prev) => (prev === 'search' ? null : 'search'));
      } else if (e.key === 'Escape') {
        setActiveHeaderModal(null);
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerActionsRef.current && !headerActionsRef.current.contains(e.target as Node)) {
        setActiveHeaderModal(null);
      }
    };

    if (activeHeaderModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeHeaderModal]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobileSubmenus((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const isRouteActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderDropdownIcon = (label: string) => {
    switch (label) {
      case 'Protected Areas':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'Biodiversity':
        return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'Water Systems':
        return <Droplet className="w-4 h-4 text-sky-400" />;
      case 'Environmental Monitoring':
        return <BarChart3 className="w-4 h-4 text-amber-400" />;
      case 'Hazard Intelligence':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'Earth & Human Impact':
        return <Globe className="w-4 h-4 text-emerald-400" />;
      case 'Sectoral EIA':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'Investigations':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'Himalayan Dispatch':
        return <BookOpen className="w-4 h-4 text-amber-300" />;
      case 'EcoVoices':
        return <Music className="w-4 h-4 text-amber-300" />;
      case 'Environmental Calendar':
        return <Calendar className="w-4 h-4 text-emerald-400" />;
      case 'Webinars & Conferences':
        return <Video className="w-4 h-4 text-teal-400" />;
      case 'About':
      default:
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };

  const renderDropdownItems = (items: GlobalDropdownItem[]) => (
    <>
      {items
        .filter((subitem) => !subitem.parentGroup || expandedHazardGroups.has(subitem.parentGroup))
        .map((subitem) =>
          subitem.isHeader ? (
            subitem.groupId ? (
              <button
                key={subitem.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleHazardGroup(subitem.groupId!);
                }}
                className="w-full px-4 py-1.5 bg-slate-800/45 hover:bg-slate-800/75 flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                  {subitem.name.replace(/──/g, '').trim()}
                </span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 text-slate-400 transition-transform',
                    expandedHazardGroups.has(subitem.groupId) && 'rotate-180'
                  )}
                />
              </button>
            ) : (
              <div key={subitem.name} className="px-4 py-1.5 bg-slate-800/30">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  {subitem.name.replace(/──/g, '').trim()}
                </span>
              </div>
            )
          ) : subitem.href.startsWith('http') ? (
            <a
              key={subitem.name}
              href={subitem.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setActiveDropdown(null);
                setIsMobileMenuOpen(false);
              }}
              className="block px-3.5 py-1.5 text-xs text-emerald-300 hover:text-emerald-200 hover:bg-white/5 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{subitem.name}</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-1" />
              </div>
              {subitem.desc && (
                <span className="block text-[10px] text-slate-400 mt-0.5">{subitem.desc}</span>
              )}
            </a>
          ) : (
            <Link
              key={subitem.name}
              href={subitem.href}
              onClick={() => {
                setActiveDropdown(null);
                setIsMobileMenuOpen(false);
              }}
              className="block px-3.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="font-medium">{subitem.name}</span>
              {subitem.desc && (
                <span className="block text-[10px] text-slate-400 mt-0.5">{subitem.desc}</span>
              )}
            </Link>
          )
        )}
    </>
  );

  return (
    <header
      data-kew-dark-surface="true"
      data-nav-mode={navMode}
      data-designation-fit={designationFit}
      data-nav-available-px={navFitMetrics.available || undefined}
      data-nav-required-px={navFitMetrics.required || undefined}
      className={cn(
        'kew-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        !isScrolled && 'bg-slate-950/75 backdrop-blur-md border-b border-white/[0.06]',
        isScrolled && !isCompact && 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10',
        isCompact &&
          'bg-slate-950/96 backdrop-blur-2xl shadow-2xl shadow-black/60 border-b border-white/10'
      )}
    >
      <div
        ref={headerInnerRef}
        className="kew-header-inner site-header__inner flex-col items-stretch"
      >
        {/* Hidden Single-Row Measurement Ruler (Content-Aware Width Audit) */}
        <div
          ref={navMeasureRef}
          data-kew-nav-measure="true"
          className="kew-desktop-nav-ruler"
          aria-hidden="true"
        >
          {GLOBAL_NAV_ITEMS.map((item) => (
            <span key={item.label} className="kew-desktop-nav-link">
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown className="w-3 h-3 shrink-0" />}
            </span>
          ))}
        </div>

        {/* ================================================================= */}
        {/* TIER 1: BRAND IDENTITY & GLOBAL UTILITY CLUSTER                   */}
        {/* ================================================================= */}
        <div
          className={cn(
            'flex items-center justify-between w-full gap-3 transition-all duration-300 ease-out',
            !isCompact
              ? navMode === 'compact'
                ? 'h-14 sm:h-16'
                : 'h-14 sm:h-16 xl:h-14'
              : navMode === 'compact'
                ? 'h-12 sm:h-14'
                : 'h-12 sm:h-14 xl:h-11'
          )}
        >
          <div className="kew-logo site-logo flex-shrink-0">
            <Logo variant="compact" />
          </div>

          {/* Central Institutional Designation (Container-Aware, Zoom-Aware & Single-Line) */}
          <div ref={designationSlotRef} className="kew-designation-slot">
            <span
              ref={designationMeasureRef}
              className="kew-institutional-designation-ruler"
              aria-hidden="true"
            >
              GLOBAL INSTITUTE FOR ADVANCED ENVIRONMENTAL STUDIES
            </span>
            <span className="kew-institutional-designation">
              GLOBAL INSTITUTE FOR ADVANCED ENVIRONMENTAL STUDIES
            </span>
          </div>

          <div
            ref={headerActionsRef}
            className="kew-header-actions header-actions flex items-center gap-1.5 sm:gap-2 relative flex-shrink-0 ml-auto"
          >
            {/* Search button with Cmd+K badge */}
            <button
              type="button"
              onClick={() => setActiveHeaderModal((prev) => (prev === 'search' ? null : 'search'))}
              className={cn(
                'flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer',
                activeHeaderModal === 'search'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border-white/15'
              )}
              title="Search environmental intelligence (Ctrl+K / ⌘K)"
              aria-label="Search environmental intelligence"
              aria-expanded={activeHeaderModal === 'search'}
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline text-slate-200">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-slate-300 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Himalayan Dispatch — Direct Publication Access */}
            <a
              href={dispatchDirectUrl}
              data-dispatch-destination={DISPATCH_SUBDOMAIN_DIRECT_URL}
              data-dispatch-verified={isDispatchSubdomainVerified ? 'true' : 'pending'}
              className="kew-dispatch-direct-link group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors duration-200 cursor-pointer shrink-0 whitespace-nowrap"
              title="Himalayan Dispatch — Environmental Journalism & Periodical"
              aria-label="Himalayan Dispatch"
            >
              <Newspaper className="kew-dispatch-direct-icon w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only kew-dispatch-direct-label">
                Himalayan Dispatch
              </span>
              <ArrowUpRight
                className="kew-dispatch-direct-arrow hidden min-[360px]:inline-block w-3.5 h-3.5 shrink-0 transition-opacity duration-200 opacity-85 group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>

            {/* Unified KEW Control Center Trigger (Account + Alerts + Preferences) */}
            <button
              type="button"
              id="kew-control-center-trigger"
              onClick={() => {
                setRequestedControlTab(null);
                setActiveHeaderModal((prev) =>
                  prev === 'control-center' ? null : 'control-center'
                );
              }}
              className={cn(
                'relative w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0',
                activeHeaderModal === 'control-center'
                  ? 'bg-emerald-500/25 border-emerald-400/60 ring-2 ring-emerald-500/30 text-white'
                  : isLoggedIn && user
                    ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/40 text-white'
                    : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200 hover:text-white'
              )}
              title={
                unreadCount > 0
                  ? `KEW Control Center — ${unreadCount} unread environmental alerts${
                      unreadCriticalCount > 0
                        ? ` (${unreadCriticalCount} critical/high severity)`
                        : ''
                    }`
                  : 'KEW Control Center — Account, Alerts & Preferences'
              }
              aria-label={
                unreadCount > 0
                  ? `KEW Control Center, ${unreadCount} unread alerts${
                      unreadCriticalCount > 0 ? ', critical advisories active' : ''
                    }`
                  : 'KEW Control Center'
              }
              aria-haspopup="dialog"
              aria-expanded={activeHeaderModal === 'control-center'}
              aria-controls="kew-control-center-panel"
            >
              {isLoggedIn && user ? (
                isUsableAvatarUrl(user.avatar) && !avatarLoadFailed ? (
                  <img
                    src={user.avatar!}
                    alt={user.name}
                    onError={() => setAvatarLoadFailed(true)}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold select-none">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )
              ) : (
                <User className="w-4 h-4" />
              )}

              {unreadCount > 0 && (
                <span
                  data-testid="cc-unread-badge"
                  data-severity={unreadCriticalCount > 0 ? 'critical' : 'standard'}
                  className={cn(
                    'absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-slate-950 shadow-md',
                    unreadCriticalCount > 0
                      ? 'bg-rose-600 text-white animate-pulse shadow-rose-600/50'
                      : 'bg-amber-500 text-slate-950 shadow-amber-500/30'
                  )}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Mode B: Compact Explore Drawer Toggle (Activated Automatically Whenever Full Nav Cannot Fit on 1 Row) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="kew-explore-toggle items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all cursor-pointer shrink-0"
              aria-label={
                isMobileMenuOpen
                  ? 'Close Explore navigation menu'
                  : 'Open Explore navigation menu'
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-drawer"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-emerald-400" />
              ) : (
                <Menu className="w-4 h-4 text-emerald-400" />
              )}
              <span className="hidden sm:inline">Explore</span>
            </button>

            {/* Dropdown & Control Center Panels */}
            <HeaderSearch
              isOpen={activeHeaderModal === 'search'}
              onClose={() => setActiveHeaderModal(null)}
            />
            <KewControlCenter
              isOpen={activeHeaderModal === 'control-center'}
              onClose={() => setActiveHeaderModal(null)}
              liveAlerts={liveAlerts}
              isServerAdmin={isServerAdmin}
              requestedTab={requestedControlTab}
              requestedTabSeq={requestedControlTabSeq}
            />
          </div>
        </div>

        {/* ================================================================= */}
        {/* TIER 2: MODE A — 14-MODULE SINGLE-ROW DESKTOP NAVIGATION          */}
        {/* ================================================================= */}
        <nav
          className="kew-desktop-nav-row py-1.5 border-t border-white/[0.08]"
          role="navigation"
          aria-label="Main Navigation"
        >
          {GLOBAL_NAV_ITEMS.map((item, idx) => {
            const active = isRouteActive(item.href);
            return (
              <div
                key={item.label}
                className="relative group shrink-0"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'kew-desktop-nav-link transition-all duration-200 cursor-pointer',
                    activeDropdown === item.label || active
                      ? 'text-white bg-white/10 font-semibold'
                      : 'text-slate-200/90 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'w-3 h-3 shrink-0 transition-transform duration-200 opacity-75',
                        activeDropdown === item.label && 'rotate-180 opacity-100'
                      )}
                    />
                  )}
                </Link>

                {/* Viewport-Aware Dropdown Panel */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.14 }}
                    className={cn(
                      'absolute top-full w-80 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/15 overflow-hidden z-50 pt-1.5',
                      idx >= 7 ? 'right-0' : 'left-0'
                    )}
                  >
                    <div className="px-4 py-2.5 border-b border-white/10 bg-slate-900/95">
                      <div className="flex items-center gap-2">
                        {renderDropdownIcon(item.label)}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200 block">
                            {item.label}
                          </span>
                          {item.subtitle && (
                            <span className="text-[10px] text-slate-400 block leading-tight">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="py-1.5 max-h-[68vh] overflow-y-auto">
                      {renderDropdownItems(getGlobalDropdownItems(item.label))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* =================================================================== */}
      {/* MODE B: COMPACT EXPLORE NAVIGATION DRAWER                           */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && navMode !== 'full' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="kew-drawer-overlay fixed inset-0 bg-black/65 z-50"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="kew-drawer-panel fixed inset-y-0 left-0 w-[86%] sm:w-[75%] max-w-[360px] md:max-w-[420px] bg-slate-950 z-[51] shadow-2xl flex flex-col h-dvh border-r border-white/15"
              role="dialog"
              aria-modal="true"
              aria-label="Explore navigation drawer"
            >
              {/* Drawer Header */}
              <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10">
                <Logo variant="mobile" />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contributor Account Card */}
              <div className="p-3 mx-3 mt-3 mb-2 rounded-2xl bg-slate-900 border border-emerald-500/25 shadow-lg shrink-0">
                {isLoggedIn && user ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{user.name}</p>
                          <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {formatContributorRoleLabel(user.role, isServerAdmin)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          signOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Sign Out"
                        aria-label="Sign Out"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-2 px-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold text-center transition-colors"
                      >
                        Dashboard
                      </Link>
                      {isServerAdmin ? (
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="py-2 px-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold text-center transition-colors"
                        >
                          Admin Command
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            openControlCenterOnTab('account');
                          }}
                          className="py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold text-center transition-colors cursor-pointer"
                        >
                          Control Center
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Contributor Observatory
                        </span>
                      </div>
                      <Link
                        href="/auth"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[10px] text-slate-300 hover:text-white underline"
                      >
                        Full Page
                      </Link>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight mb-3">
                      Sign in to deposit field observations and track live telemetry.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openAuthModal('signin');
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs text-center shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Sign In</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openAuthModal('signup');
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-white/15 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Register</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable 14-Module Navigation List */}
              <nav
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3 space-y-0.5"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {GLOBAL_NAV_ITEMS.map((item) => {
                  const isExpanded = expandedMobileSubmenus.has(item.label);
                  const active = isRouteActive(item.href);
                  return (
                    <div key={item.label} className="border-b border-white/5 last:border-0">
                      {item.hasDropdown ? (
                        <>
                          <div className="flex items-center justify-between rounded-lg hover:bg-white/5">
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={cn(
                                'flex-1 px-3 py-2.5 text-sm font-medium transition-colors',
                                active ? 'text-emerald-300 font-semibold' : 'text-slate-200 hover:text-white'
                              )}
                            >
                              <span className="block">{item.label}</span>
                              {item.subtitle && (
                                <span className="block text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                                  {item.subtitle}
                                </span>
                              )}
                            </Link>
                            <button
                              type="button"
                              onClick={() => toggleMobileSubmenu(item.label)}
                              aria-label={`Toggle ${item.label} submenu`}
                              aria-expanded={isExpanded}
                              className="p-2.5 text-slate-300 hover:text-white cursor-pointer"
                            >
                              <ChevronDown
                                className={cn(
                                  'w-4 h-4 transition-transform duration-200',
                                  isExpanded && 'rotate-180'
                                )}
                              />
                            </button>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-3 pl-2 border-l border-white/10 mt-1 mb-2.5 space-y-0.5">
                                  {renderDropdownItems(
                                    getGlobalDropdownItems(item.label).map((sub) => ({
                                      ...sub,
                                      name: sub.name.replace(/^[^\w\s]+\s*/u, ''),
                                    }))
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'block px-3 py-2.5 rounded-lg transition-colors text-sm font-medium',
                            active
                              ? 'text-emerald-300 font-semibold bg-white/5'
                              : 'text-slate-200 hover:text-white hover:bg-white/5'
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Mobile Search & Quick Actions */}
                <div className="pt-5 mt-4 border-t border-white/10 space-y-4 pb-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (mobileSearchQuery.trim()) {
                        setIsMobileMenuOpen(false);
                        window.location.href = `/search?q=${encodeURIComponent(
                          mobileSearchQuery.trim()
                        )}`;
                      }
                    }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      placeholder="Search 14 modules, species, water, dispatch..."
                      className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-white/15 outline-none text-sm text-white placeholder:text-slate-400 focus:border-emerald-500/50 transition-colors"
                    />
                    <button
                      type="submit"
                      aria-label="Submit search"
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-400"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>

                  {mobileSuggestions.length > 0 && (
                    <div className="rounded-xl bg-slate-900 border border-white/15 divide-y divide-white/10 overflow-hidden">
                      {mobileSuggestions.map((it) => (
                        <Link
                          key={it.id}
                          href={it.canonicalUrl}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setMobileSearchQuery('');
                          }}
                          className="block px-3 py-2 hover:bg-white/5 transition-colors"
                        >
                          <div className="text-xs font-semibold text-white truncate">{it.title}</div>
                          {it.subtitle && (
                            <div className="text-[10px] text-slate-400 truncate">{it.subtitle}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openControlCenterOnTab('alerts');
                      }}
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-slate-800 transition-colors relative cursor-pointer"
                    >
                      <Bell className="w-4 h-4 text-amber-400 mb-1" />
                      <span className="text-[11px] font-medium text-slate-200">Alerts</span>
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openControlCenterOnTab('preferences');
                      }}
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-purple-400 mb-1" />
                      <span className="text-[11px] font-medium text-slate-200">Preferences</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openControlCenterOnTab('account');
                      }}
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-emerald-400 mb-1" />
                      <span className="text-[11px] font-medium text-slate-200">Account</span>
                    </button>
                  </div>

                  <Link
                    href="/atlas"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-center text-sm shadow-lg shadow-emerald-950/40 transition-all"
                  >
                    Launch Interactive Atlas
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
