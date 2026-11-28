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
import { useMastheadStickyObserver } from '@/hooks/useScrolledHeader';
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

type NavFitMode = 'auto' | 'full' | 'compact';

export function PremiumStickyHeader() {
  const pathname = usePathname();
  const { user, isLoggedIn, signOut, openAuthModal } = useAuth();

  const mastheadRef = useRef<HTMLDivElement>(null);
  const mastheadInnerRef = useRef<HTMLDivElement>(null);
  const mastheadBrandGroupRef = useRef<HTMLDivElement>(null);
  const mastheadLogoRef = useRef<HTMLDivElement>(null);
  const mastheadActionsRef = useRef<HTMLDivElement>(null);
  const designationSlotRef = useRef<HTMLDivElement>(null);
  const designationMeasureRef = useRef<HTMLDivElement>(null);

  const stickyHeaderRef = useRef<HTMLElement>(null);
  const stickyInnerRef = useRef<HTMLDivElement>(null);
  const stickyActionsRef = useRef<HTMLDivElement>(null);

  // Out-of-flow 1:1 measurement rulers for container-aware responsive thresholds
  const expandedNavRulerRef = useRef<HTMLDivElement>(null);
  const stickyNavRulerRef = useRef<HTMLDivElement>(null);
  const stickyBrandRulerRef = useRef<HTMLDivElement>(null);
  const stickyBrandLogoOnlyRulerRef = useRef<HTMLDivElement>(null);
  const stickyActionsBaseRulerRef = useRef<HTMLDivElement>(null);
  const stickyActionsExploreRulerRef = useRef<HTMLDivElement>(null);

  const isStickyActive = useMastheadStickyObserver(mastheadRef);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownAlignRight, setDropdownAlignRight] = useState<boolean>(false);
  const [dropdownGeometry, setDropdownGeometry] = useState<{
    widthPx: number;
    leftOffsetPx: number;
    maxHeightPx: number;
  } | null>(null);
  const activeDropdownTriggerRef = useRef<HTMLElement | null>(null);
  const activeDropdownIdxRef = useRef<number>(0);
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

  const computeDropdownGeometry = useCallback((triggerEl: HTMLElement | null, idx: number) => {
    if (!triggerEl || typeof window === 'undefined') return null;
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    if (vw <= 0 || vh <= 0) return null;

    const r = triggerEl.getBoundingClientRect();
    const margin = 12;
    const widthPx = Math.min(320, Math.max(240, vw - margin * 2));
    const preferRight = idx >= 7 || r.left + widthPx > vw - margin;
    const rawLeft = preferRight ? r.right - widthPx : r.left;
    const clampedLeft = Math.max(margin, Math.min(vw - widthPx - margin, rawLeft));
    const leftOffsetPx = Math.round((clampedLeft - r.left) * 10) / 10;
    const panelTop = Math.max(0, r.bottom + 4);
    const maxHeightPx = Math.max(150, Math.floor(vh - panelTop - margin));

    return { widthPx, leftOffsetPx, maxHeightPx, preferRight };
  }, []);

  const openDesktopDropdown = (label: string, idx: number, triggerEl: HTMLElement | null) => {
    activeDropdownTriggerRef.current = triggerEl;
    activeDropdownIdxRef.current = idx;
    const geo = computeDropdownGeometry(triggerEl, idx);
    if (geo) {
      setDropdownAlignRight(geo.preferRight);
      setDropdownGeometry({
        widthPx: geo.widthPx,
        leftOffsetPx: geo.leftOffsetPx,
        maxHeightPx: geo.maxHeightPx,
      });
    } else {
      setDropdownAlignRight(idx >= 7);
      setDropdownGeometry(null);
    }
    setActiveDropdown(label);
  };

  useLayoutEffect(() => {
    if (!activeDropdown || !activeDropdownTriggerRef.current) {
      setDropdownGeometry(null);
      return;
    }
    const updateGeo = () => {
      const geo = computeDropdownGeometry(
        activeDropdownTriggerRef.current,
        activeDropdownIdxRef.current
      );
      if (!geo) return;
      setDropdownAlignRight(geo.preferRight);
      setDropdownGeometry((prev) =>
        prev &&
        prev.widthPx === geo.widthPx &&
        prev.leftOffsetPx === geo.leftOffsetPx &&
        prev.maxHeightPx === geo.maxHeightPx
          ? prev
          : {
              widthPx: geo.widthPx,
              leftOffsetPx: geo.leftOffsetPx,
              maxHeightPx: geo.maxHeightPx,
            }
      );
    };

    updateGeo();
    window.addEventListener('resize', updateGeo, { passive: true });
    window.addEventListener('scroll', updateGeo, { passive: true });
    window.addEventListener('orientationchange', updateGeo, { passive: true });
    window.visualViewport?.addEventListener('resize', updateGeo, { passive: true });

    return () => {
      window.removeEventListener('resize', updateGeo);
      window.removeEventListener('scroll', updateGeo);
      window.removeEventListener('orientationchange', updateGeo);
      window.visualViewport?.removeEventListener('resize', updateGeo);
    };
  }, [activeDropdown, isStickyActive, computeDropdownGeometry]);

  const [activeHeaderModal, setActiveHeaderModal] = useState<'search' | 'control-center' | null>(
    null
  );
  const [requestedControlTab, setRequestedControlTab] = useState<ControlCenterTab | null>(null);
  const [requestedControlTabSeq, setRequestedControlTabSeq] = useState<number>(0);
  const [isServerAdmin, setIsServerAdmin] = useState<boolean>(false);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState<boolean>(false);

  const liveAlerts = useLiveAlerts();
  const { unreadCount, unreadCriticalCount } = liveAlerts;

  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileSuggestions, setMobileSuggestions] = useState<any[]>([]);

  // Responsive Fit States (driven by ResizeObserver + visualViewport + font readiness)
  const [expandedNavMode, setExpandedNavMode] = useState<NavFitMode>('auto');
  const expandedNavModeRef = useRef<NavFitMode>('auto');

  const [stickyNavMode, setStickyNavMode] = useState<NavFitMode>('auto');
  const stickyNavModeRef = useRef<NavFitMode>('auto');

  const [designationFit, setDesignationFit] = useState<'auto' | 'visible' | 'hidden'>('auto');
  const designationFitRef = useRef<'auto' | 'visible' | 'hidden'>('auto');

  const [stickyWordmarkFit, setStickyWordmarkFit] = useState<'visible' | 'hidden'>('visible');
  const stickyWordmarkFitRef = useRef<'visible' | 'hidden'>('visible');

  const [fitTelemetry, setFitTelemetry] = useState<{
    availablePx: number;
    expandedNavRequiredPx: number;
    stickyFullRequiredPx: number;
    designationAvailablePx: number;
    designationRequiredPx: number;
  }>({
    availablePx: 0,
    expandedNavRequiredPx: 0,
    stickyFullRequiredPx: 0,
    designationAvailablePx: 0,
    designationRequiredPx: 0,
  });

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

  // Comprehensive container-aware & viewport-aware fit evaluation for both State A and State B
  const evaluateResponsiveHeaderFit = useCallback(() => {
    if (typeof window === 'undefined') return;

    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const mastInner = mastheadInnerRef.current;
    const stickyInner = stickyInnerRef.current;
    const measureContainer = mastInner || stickyInner;
    if (!measureContainer) return;

    const cs = window.getComputedStyle(measureContainer);
    const padL = parseFloat(cs.paddingLeft || '0') || 0;
    const padR = parseFloat(cs.paddingRight || '0') || 0;
    const availablePx = Math.floor(measureContainer.clientWidth - padL - padR);
    if (availablePx <= 0) return;

    // 1. State A Lower Navigation Fit (all 14 categories on one row)
    const expNavRuler = expandedNavRulerRef.current;
    const expandedNavRequiredPx = expNavRuler
      ? Math.ceil(expNavRuler.getBoundingClientRect().width || expNavRuler.scrollWidth)
      : 0;

    let nextExpandedMode = expandedNavModeRef.current;
    if (expandedNavRequiredPx > 0) {
      if (viewportHeight < 480) {
        nextExpandedMode = 'compact';
      } else {
        const expMargin = expandedNavModeRef.current === 'compact' ? 18 : 8;
        nextExpandedMode = availablePx >= expandedNavRequiredPx + expMargin ? 'full' : 'compact';
      }
      if (nextExpandedMode !== expandedNavModeRef.current) {
        expandedNavModeRef.current = nextExpandedMode;
        setExpandedNavMode(nextExpandedMode);
      }
    }

    // 2. State B Compact Sticky Single-Row Fit:
    //    [Small Logo + Kashmir EcoWatch] + [Separator & Gaps] + [14 Categories] + [Search + Dispatch + Account]
    const stickyNavRuler = stickyNavRulerRef.current;
    const stickyBrandRuler = stickyBrandRulerRef.current;
    const stickyBrandLogoOnlyRuler = stickyBrandLogoOnlyRulerRef.current;
    const stickyActionsBaseRuler = stickyActionsBaseRulerRef.current;
    const stickyActionsExploreRuler = stickyActionsExploreRulerRef.current;

    const stickyNavRequiredPx = stickyNavRuler
      ? Math.ceil(stickyNavRuler.getBoundingClientRect().width || stickyNavRuler.scrollWidth)
      : 0;
    const stickyBrandFullPx = stickyBrandRuler
      ? Math.ceil(stickyBrandRuler.getBoundingClientRect().width || stickyBrandRuler.scrollWidth)
      : 0;
    const stickyBrandLogoOnlyPx = stickyBrandLogoOnlyRuler
      ? Math.ceil(stickyBrandLogoOnlyRuler.getBoundingClientRect().width)
      : 40;
    const stickyActionsBasePx = stickyActionsBaseRuler
      ? Math.ceil(stickyActionsBaseRuler.getBoundingClientRect().width)
      : 0;
    const stickyActionsExplorePx = stickyActionsExploreRuler
      ? Math.ceil(stickyActionsExploreRuler.getBoundingClientRect().width)
      : 0;

    // Separator (1px + 14px margins) + flex gaps (24px) = 39px structural spacing
    const stickySeparatorAndGapsPx = 39;
    const stickyFullRequiredPx =
      stickyBrandFullPx + stickySeparatorAndGapsPx + stickyNavRequiredPx + stickyActionsBasePx;

    let nextStickyMode = stickyNavModeRef.current;
    if (stickyNavRequiredPx > 0 && stickyBrandFullPx > 0 && stickyActionsBasePx > 0) {
      if (viewportHeight < 480) {
        nextStickyMode = 'compact';
      } else {
        const stickyMargin = stickyNavModeRef.current === 'compact' ? 20 : 8;
        nextStickyMode = availablePx >= stickyFullRequiredPx + stickyMargin ? 'full' : 'compact';
      }
      if (nextStickyMode !== stickyNavModeRef.current) {
        stickyNavModeRef.current = nextStickyMode;
        setStickyNavMode(nextStickyMode);
      }
    }

    // 3. Ultra-narrow Sticky Wordmark Fallback (preserve Logo + Search + Dispatch + Account + Explore)
    if (stickyBrandFullPx > 0 && stickyActionsExplorePx > 0) {
      const wordmarkSafety = stickyWordmarkFitRef.current === 'hidden' ? 16 : 8;
      const canShowWordmark =
        availablePx >= stickyBrandFullPx + stickyActionsExplorePx + wordmarkSafety ||
        availablePx < stickyBrandLogoOnlyPx + stickyActionsExplorePx;
      const nextWordmarkFit: 'visible' | 'hidden' = canShowWordmark ? 'visible' : 'hidden';
      if (nextWordmarkFit !== stickyWordmarkFitRef.current) {
        stickyWordmarkFitRef.current = nextWordmarkFit;
        setStickyWordmarkFit(nextWordmarkFit);
      }
    }

    // 4. Expanded Masthead Unified Left-Aligned Branding Group Fit
    //    Structure: [Original KEW Logo] [Two-line institutional designation]
    //    All surplus horizontal space remains strictly between the branding group and right-side utility controls.
    let desigAvail = 0;
    let desigReq = 0;
    const desigRuler = designationMeasureRef.current;
    if (mastInner && desigRuler) {
      const leftW = Math.ceil(mastheadLogoRef.current?.getBoundingClientRect().width || 0);
      const rightW = Math.ceil(mastheadActionsRef.current?.getBoundingClientRect().width || 0);
      const brandGroupEl = mastheadBrandGroupRef.current;
      let brandGapPx = 16;
      if (brandGroupEl) {
        const bgCs = window.getComputedStyle(brandGroupEl);
        const parsedGap = parseFloat(bgCs.columnGap || '16');
        if (!Number.isNaN(parsedGap) && parsedGap > 0) {
          brandGapPx = Math.ceil(parsedGap);
        }
      }

      desigReq = Math.ceil(desigRuler.getBoundingClientRect().width || desigRuler.scrollWidth);
      const desigReqH = Math.ceil(desigRuler.getBoundingClientRect().height || 0);
      const mastH = mastInner.clientHeight;

      desigAvail = Math.max(0, availablePx - leftW - brandGapPx - rightW - 12);
      if (desigReq > 0) {
        const desigMargin = designationFitRef.current === 'hidden' ? 6 : 2;
        const fitsHorizontally = desigAvail >= desigReq + desigMargin;
        const fitsVertically = mastH <= 0 || desigReqH <= mastH - 8;
        const nextDesigFit: 'visible' | 'hidden' =
          fitsHorizontally && fitsVertically ? 'visible' : 'hidden';
        if (nextDesigFit !== designationFitRef.current) {
          designationFitRef.current = nextDesigFit;
          setDesignationFit(nextDesigFit);
        }
      }
    }

    setFitTelemetry((prev) =>
      prev.availablePx === availablePx &&
      prev.expandedNavRequiredPx === expandedNavRequiredPx &&
      prev.stickyFullRequiredPx === stickyFullRequiredPx &&
      prev.designationAvailablePx === desigAvail &&
      prev.designationRequiredPx === desigReq
        ? prev
        : {
            availablePx,
            expandedNavRequiredPx,
            stickyFullRequiredPx,
            designationAvailablePx: desigAvail,
            designationRequiredPx: desigReq,
          }
    );
  }, []);

  useLayoutEffect(() => {
    evaluateResponsiveHeaderFit();
  }, [evaluateResponsiveHeaderFit, isStickyActive]);

  useEffect(() => {
    evaluateResponsiveHeaderFit();

    let rafId: number | null = null;
    const scheduleMeasure = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        evaluateResponsiveHeaderFit();
      });
    };

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleMeasure) : null;
    if (ro) {
      const targets = [
        mastheadInnerRef.current,
        mastheadLogoRef.current,
        mastheadActionsRef.current,
        designationSlotRef.current,
        designationMeasureRef.current,
        stickyInnerRef.current,
        expandedNavRulerRef.current,
        stickyNavRulerRef.current,
        stickyBrandRulerRef.current,
        stickyActionsBaseRulerRef.current,
        stickyActionsExploreRulerRef.current,
      ];
      targets.forEach((el) => {
        if (el) ro.observe(el);
      });
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
  }, [evaluateResponsiveHeaderFit]);

  const activeNavMode: NavFitMode = isStickyActive ? stickyNavMode : expandedNavMode;

  useEffect(() => {
    if (activeNavMode === 'full' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    if (activeNavMode === 'compact' && activeDropdown) {
      setActiveDropdown(null);
    }
  }, [activeNavMode, isMobileMenuOpen, activeDropdown]);

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
      const target = e.target as Node;
      const inMastheadActions = mastheadActionsRef.current?.contains(target);
      const inStickyActions = stickyActionsRef.current?.contains(target);
      if (!inMastheadActions && !inStickyActions) {
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

  // Lock vertical scroll in-place without disturbing overflow-x: clip or resetting scrollY
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = '';
    }
    return () => {
      document.documentElement.style.overflowY = '';
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
      case 'Student Action Hub':
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
        .map((subitem) => {
          const itemActive = !subitem.isHeader && pathname === subitem.href;
          return subitem.isHeader ? (
            subitem.groupId ? (
              <button
                key={subitem.name}
                type="button"
                aria-expanded={expandedHazardGroups.has(subitem.groupId)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleHazardGroup(subitem.groupId!);
                }}
                className="kew-menu-section-toggle"
              >
                <span>{subitem.name.replace(/──/g, '').trim()}</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 shrink-0 transition-transform',
                    expandedHazardGroups.has(subitem.groupId) && 'rotate-180'
                  )}
                />
              </button>
            ) : (
              <div key={subitem.name} className="kew-menu-section-header">
                <span>{subitem.name.replace(/──/g, '').trim()}</span>
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
              className="kew-menu-item kew-menu-item--external text-xs group"
            >
              <div className="flex items-center justify-between">
                <span className="kew-menu-item-title font-medium">{subitem.name}</span>
                <ExternalLink className="w-3 h-3 kew-menu-desc group-hover:text-emerald-400 shrink-0 ml-1" />
              </div>
              {subitem.desc && (
                <span className="kew-menu-item-desc block text-[10px] mt-0.5">{subitem.desc}</span>
              )}
            </a>
          ) : (
            <Link
              key={subitem.name}
              href={subitem.href}
              aria-current={itemActive ? 'page' : undefined}
              onClick={() => {
                setActiveDropdown(null);
                setIsMobileMenuOpen(false);
              }}
              className={cn('kew-menu-item text-xs', itemActive && 'kew-menu-item--active')}
            >
              <span className="kew-menu-item-title font-medium">{subitem.name}</span>
              {subitem.desc && (
                <span className="kew-menu-item-desc block text-[10px] mt-0.5">{subitem.desc}</span>
              )}
            </Link>
          );
        })}
    </>
  );

  const renderUtilityControls = (surface: 'masthead' | 'sticky') => {
    const isSurfaceActive = surface === 'sticky' ? isStickyActive : !isStickyActive;
    const isCompactStickySurface = surface === 'sticky';

    return (
      <>
        {/* Search button */}
        <button
          type="button"
          onClick={() => setActiveHeaderModal((prev) => (prev === 'search' ? null : 'search'))}
          className={cn(
            'flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer shrink-0',
            activeHeaderModal === 'search' && isSurfaceActive
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border-white/15'
          )}
          title="Search environmental intelligence (Ctrl+K / ⌘K)"
          aria-label="Search environmental intelligence"
          aria-expanded={activeHeaderModal === 'search' && isSurfaceActive}
        >
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <span
            className={cn(
              'text-slate-200',
              isCompactStickySurface ? 'kew-sticky-search-text' : 'hidden md:inline'
            )}
          >
            Search
          </span>
          <kbd
            aria-hidden="true"
            className={cn(
              'px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-slate-300 border border-white/10',
              isCompactStickySurface ? 'kew-sticky-search-kbd' : 'hidden xl:inline-block'
            )}
          >
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

        {/* Unified KEW Account Control Center Trigger */}
        <button
          type="button"
          id={isSurfaceActive ? 'kew-control-center-trigger' : undefined}
          onClick={() => {
            setRequestedControlTab(null);
            setActiveHeaderModal((prev) => (prev === 'control-center' ? null : 'control-center'));
          }}
          className={cn(
            'relative w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0',
            activeHeaderModal === 'control-center' && isSurfaceActive
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
          aria-expanded={activeHeaderModal === 'control-center' && isSurfaceActive}
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
              data-testid={isSurfaceActive ? 'cc-unread-badge' : undefined}
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

        {/* Explore Fallback Toggle (shown automatically whenever all 14 categories cannot fit on 1 row) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className={cn(
            'items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all cursor-pointer shrink-0',
            surface === 'masthead' ? 'kew-masthead-explore-toggle' : 'kew-sticky-explore-toggle'
          )}
          aria-label={
            isMobileMenuOpen ? 'Close Explore navigation menu' : 'Open Explore navigation menu'
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

        {/* Mount active modal panels strictly once inside the active visible header surface */}
        {isSurfaceActive && (
          <>
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
          </>
        )}
      </>
    );
  };

  return (
    <>
      {/* ===================================================================== */}
      {/* STATE A: EXPANDED INSTITUTIONAL MASTHEAD (Scrolls Naturally Out)      */}
      {/* ===================================================================== */}
      <div
        ref={mastheadRef}
        data-kew-dark-surface="true"
        data-kew-masthead="true"
        data-masthead-nav-mode={expandedNavMode}
        data-designation-fit={designationFit}
        data-designation-available-px={fitTelemetry.designationAvailablePx || undefined}
        data-designation-required-px={fitTelemetry.designationRequiredPx || undefined}
        className="kew-masthead w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 relative z-[60]"
      >
        {/* Out-of-flow Measurement Rulers (Zero Visual Footprint, Exact 1:1 CSS Metrics) */}
        <div className="kew-measurement-vault" aria-hidden="true">
          <div ref={designationMeasureRef} className="kew-institutional-identity-ruler">
            <span className="kew-inst-line-1">Dr. Kumar&apos;s Kashmir EcoWatch</span>
            <span className="kew-inst-line-2">
              GLOBAL INSTITUTE FOR ADVANCED ENVIRONMENTAL STUDIES
            </span>
          </div>
          <div ref={expandedNavRulerRef} className="kew-desktop-nav-ruler kew-nav-ruler--expanded">
            {GLOBAL_NAV_ITEMS.map((item) => (
              <span key={item.label} className="kew-desktop-nav-link kew-nav-link--expanded">
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="w-3 h-3 shrink-0" />}
              </span>
            ))}
          </div>

          <div ref={stickyNavRulerRef} className="kew-desktop-nav-ruler kew-nav-ruler--sticky">
            {GLOBAL_NAV_ITEMS.map((item) => (
              <span key={item.label} className="kew-desktop-nav-link kew-nav-link--sticky">
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="w-3 h-3 shrink-0" />}
              </span>
            ))}
          </div>

          <div ref={stickyBrandRulerRef} className="kew-ruler-inline">
            <span className="kew-logo-img--sticky inline-block shrink-0" />
            <span className="kew-sticky-wordmark-ruler">Kashmir EcoWatch</span>
          </div>

          <div ref={stickyBrandLogoOnlyRulerRef} className="kew-ruler-inline">
            <span className="kew-logo-img--sticky inline-block shrink-0" />
          </div>

          <div ref={stickyActionsBaseRulerRef} className="kew-ruler-inline gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium border">
              <span className="w-4 h-4 inline-block" />
              <span className="kew-sticky-search-text">Search</span>
              <span className="kew-sticky-search-kbd px-1.5 py-0.5 text-[10px]">⌘K</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium border whitespace-nowrap">
              <span className="w-4 h-4 inline-block" />
              <span className="sr-only sm:not-sr-only">Himalayan Dispatch</span>
              <span className="hidden min-[360px]:inline-block w-3.5 h-3.5" />
            </span>
            <span className="w-9 h-9 inline-block" />
          </div>

          <div ref={stickyActionsExploreRulerRef} className="kew-ruler-inline gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium border">
              <span className="w-4 h-4 inline-block" />
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium border whitespace-nowrap">
              <span className="w-4 h-4 inline-block" />
              <span className="sr-only sm:not-sr-only">Himalayan Dispatch</span>
              <span className="hidden min-[360px]:inline-block w-3.5 h-3.5" />
            </span>
            <span className="w-9 h-9 inline-block" />
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold border">
              <span className="w-4 h-4 inline-block" />
              <span className="hidden sm:inline">Explore</span>
            </span>
          </div>
        </div>

        <div ref={mastheadInnerRef} className="kew-masthead-inner site-header__inner">
          {/* LEFT: Unified Left-Aligned Institutional Branding Container ([Original KEW Logo] + [Two-Line Institutional Designation]) */}
          <div ref={mastheadBrandGroupRef} className="kew-masthead-left kew-masthead-brand-group">
            <div ref={mastheadLogoRef} className="kew-masthead-logo-wrap flex items-center shrink-0">
              <Logo variant="expanded" />
            </div>

            <div ref={designationSlotRef} className="kew-designation-slot">
              <div className="kew-institutional-identity">
                <span className="kew-inst-line-1">Dr. Kumar&apos;s Kashmir EcoWatch</span>
                <span className="kew-inst-line-2">
                  GLOBAL INSTITUTE FOR ADVANCED ENVIRONMENTAL STUDIES
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Preserved Utility Controls */}
          <div
            ref={mastheadActionsRef}
            className="kew-masthead-right kew-header-actions header-actions flex items-center justify-end gap-1.5 sm:gap-2 relative shrink-0"
          >
            {renderUtilityControls('masthead')}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* EXPANDED LOWER NAVIGATION (State A) & COMPACT STICKY BAR (State B)    */}
      {/* Native CSS position: sticky — Zero Duplicate Navigation Engines       */}
      {/* ===================================================================== */}
      <header
        ref={stickyHeaderRef}
        data-kew-dark-surface="true"
        data-header-state={isStickyActive ? 'sticky' : 'expanded'}
        data-header-compact={isStickyActive ? 'true' : 'false'}
        data-nav-mode={activeNavMode}
        data-expanded-nav-mode={expandedNavMode}
        data-sticky-nav-mode={stickyNavMode}
        data-sticky-wordmark={stickyWordmarkFit}
        data-nav-available-px={fitTelemetry.availablePx || undefined}
        data-nav-required-px={
          (isStickyActive
            ? fitTelemetry.stickyFullRequiredPx
            : fitTelemetry.expandedNavRequiredPx) || undefined
        }
        className={cn(
          'kew-header sticky top-0 z-50 w-full',
          isStickyActive && 'kew-header--sticky-active'
        )}
      >
        <div
          className={cn(
            'kew-sticky-bar-shell w-full bg-slate-950/95 backdrop-blur-2xl border-b transition-colors duration-200',
            isStickyActive
              ? 'kew-sticky-bar-shell--active border-white/15 shadow-2xl shadow-black/60'
              : 'border-white/10'
          )}
        >
          <div ref={stickyInnerRef} className="kew-header-inner site-header__inner kew-sticky-row">
            {/* STATE B LEFT: Small Original KEW Logo + Kashmir EcoWatch */}
            {isStickyActive && (
              <div className="kew-sticky-left flex items-center shrink-0">
                <Logo variant="sticky" />
                <span className="kew-sticky-separator" aria-hidden="true" />
              </div>
            )}

            {/* MIDDLE (State B) / FULL ROW (State A): All 14 Existing Navigation Categories */}
            <nav
              className={cn(
                'kew-desktop-nav-row',
                isStickyActive ? 'kew-desktop-nav-row--sticky' : 'kew-desktop-nav-row--expanded'
              )}
              role="navigation"
              aria-label="Main Navigation"
            >
              {GLOBAL_NAV_ITEMS.map((item, idx) => {
                const active = isRouteActive(item.href);
                const isOpen = activeDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    className="relative group shrink-0"
                    onMouseEnter={(e) =>
                      item.hasDropdown && openDesktopDropdown(item.label, idx, e.currentTarget)
                    }
                    onMouseLeave={() =>
                      item.hasDropdown &&
                      setActiveDropdown((prev) => (prev === item.label ? null : prev))
                    }
                    onBlur={(e) => {
                      if (
                        item.hasDropdown &&
                        !e.currentTarget.contains(e.relatedTarget as Node | null)
                      ) {
                        setActiveDropdown((prev) => (prev === item.label ? null : prev));
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      title={item.subtitle ? `${item.label} — ${item.subtitle}` : item.label}
                      aria-label={item.label}
                      aria-current={active ? 'page' : undefined}
                      aria-haspopup={item.hasDropdown ? 'menu' : undefined}
                      aria-expanded={item.hasDropdown ? isOpen : undefined}
                      onFocus={(e) =>
                        item.hasDropdown &&
                        openDesktopDropdown(item.label, idx, e.currentTarget.parentElement)
                      }
                      className={cn(
                        'kew-desktop-nav-link transition-colors duration-150 cursor-pointer',
                        isStickyActive ? 'kew-nav-link--sticky' : 'kew-nav-link--expanded',
                        isOpen || active
                          ? 'text-white bg-white/10 font-semibold'
                          : 'text-slate-200/90 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={cn(
                            'w-3 h-3 shrink-0 transition-transform duration-200 opacity-75',
                            isOpen && 'rotate-180 opacity-100'
                          )}
                        />
                      )}
                    </Link>

                    {/* Viewport-Aware 100% Opaque Dropdown Panel */}
                    {item.hasDropdown && isOpen && (
                      <div
                        className={cn(
                          'kew-nav-dropdown-anchor absolute top-full pt-1 z-[110]',
                          dropdownGeometry
                            ? ''
                            : dropdownAlignRight
                              ? 'right-0 w-80 max-w-[calc(100vw-1.5rem)]'
                              : 'left-0 w-80 max-w-[calc(100vw-1.5rem)]'
                        )}
                        style={
                          dropdownGeometry
                            ? {
                                left: `${dropdownGeometry.leftOffsetPx}px`,
                                width: `${dropdownGeometry.widthPx}px`,
                                maxWidth: 'calc(100vw - 1.5rem)',
                              }
                            : undefined
                        }
                      >
                        <motion.div
                          initial={{ y: 4 }}
                          animate={{ y: 0 }}
                          exit={{ y: 4 }}
                          transition={{ duration: 0.12 }}
                          role="menu"
                          aria-label={`${item.label} navigation menu`}
                          style={
                            dropdownGeometry
                              ? { maxHeight: `${dropdownGeometry.maxHeightPx}px` }
                              : { maxHeight: 'calc(100dvh - 5rem)' }
                          }
                          className="kew-menu-surface kew-nav-dropdown w-full rounded-xl border overflow-hidden flex flex-col"
                        >
                          <div className="kew-menu-top-header shrink-0 px-4 py-2.5 border-b">
                            <div className="flex items-center gap-2">
                              {renderDropdownIcon(item.label)}
                              <div className="min-w-0">
                                <span className="kew-menu-title text-[10px] font-bold uppercase tracking-wider block">
                                  {item.label}
                                </span>
                                {item.subtitle && (
                                  <span className="kew-menu-desc text-[10px] block leading-tight mt-0.5">
                                    {item.subtitle}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="kew-menu-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain py-1">
                            {renderDropdownItems(getGlobalDropdownItems(item.label))}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* STATE B RIGHT: Search + Himalayan Dispatch + Account (+ Explore when required) */}
            {isStickyActive && (
              <div
                ref={stickyActionsRef}
                className="kew-sticky-right kew-header-actions header-actions flex items-center justify-end gap-1.5 sm:gap-2 relative shrink-0 ml-auto"
              >
                {renderUtilityControls('sticky')}
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* RESPONSIVE FALLBACK: COMPACT EXPLORE NAVIGATION DRAWER              */}
        {/* =================================================================== */}
        <AnimatePresence>
          {isMobileMenuOpen && activeNavMode !== 'full' && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="kew-drawer-overlay fixed inset-0 bg-black/65 z-[70]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />

              <motion.div
                id="mobile-menu-drawer"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="kew-drawer-panel kew-menu-surface fixed inset-y-0 left-0 w-[86%] sm:w-[75%] max-w-[360px] md:max-w-[420px] z-[71] flex flex-col h-dvh border-r"
                role="dialog"
                aria-modal="true"
                aria-label="Explore navigation drawer"
              >
                {/* Drawer Header */}
                <div className="kew-menu-top-header kew-drawer-brand-header shrink-0 flex items-center justify-between gap-2 px-4 py-3 border-b">
                  <Logo variant="mobile" />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="kew-menu-ghost-btn p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Contributor Account Card */}
                <div className="kew-menu-subcard p-3 mx-3 mt-3 mb-2 rounded-2xl border shadow-lg shrink-0">
                  {isLoggedIn && user ? (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="kew-menu-title text-xs font-bold truncate">{user.name}</p>
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
                          className="kew-menu-ghost-btn p-1.5 rounded-lg transition-colors"
                          title="Sign Out"
                          aria-label="Sign Out"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[var(--kew-menu-border)]">
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
                            className="kew-menu-option-btn py-2 px-2.5 rounded-xl border text-xs font-semibold text-center transition-colors cursor-pointer"
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
                          className="kew-menu-desc text-[10px] hover:underline"
                        >
                          Full Page
                        </Link>
                      </div>
                      <p className="kew-menu-desc text-[11px] leading-tight mb-3">
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
                          className="kew-menu-option-btn w-full py-2 px-3 rounded-xl border font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Register</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scrollable 14-Module Navigation List */}
                <nav
                  className="kew-menu-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3 space-y-0.5"
                  role="navigation"
                  aria-label="Explore navigation"
                >
                  {GLOBAL_NAV_ITEMS.map((item) => {
                    const isExpanded = expandedMobileSubmenus.has(item.label);
                    const active = isRouteActive(item.href);
                    return (
                      <div
                        key={item.label}
                        className="border-b border-[var(--kew-menu-border)] last:border-0"
                      >
                        {item.hasDropdown ? (
                          <>
                            <div className="flex items-center justify-between rounded-lg">
                              <Link
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                  'kew-menu-item flex-1 rounded-l-lg py-2.5 text-sm font-medium',
                                  active && 'kew-menu-item--active'
                                )}
                              >
                                <span className="kew-menu-item-title block">{item.label}</span>
                                {item.subtitle && (
                                  <span className="kew-menu-item-desc block text-[10px] font-normal leading-tight mt-0.5">
                                    {item.subtitle}
                                  </span>
                                )}
                              </Link>
                              <button
                                type="button"
                                onClick={() => toggleMobileSubmenu(item.label)}
                                aria-label={`Toggle ${item.label} submenu`}
                                aria-expanded={isExpanded}
                                className="kew-menu-ghost-btn p-2.5 rounded-lg cursor-pointer shrink-0"
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
                                  <div className="ml-3 pl-2 border-l border-[var(--kew-menu-border)] mt-1 mb-2.5 space-y-0.5">
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
                              'kew-menu-item block rounded-lg py-2.5 text-sm font-medium',
                              active && 'kew-menu-item--active'
                            )}
                          >
                            <span className="kew-menu-item-title">{item.label}</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}

                  {/* Explore Drawer Search & Quick Actions */}
                  <div className="pt-5 mt-4 border-t border-[var(--kew-menu-border)] space-y-4 pb-6">
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
                        className="kew-menu-subcard w-full px-4 py-2.5 pl-10 rounded-xl border outline-none text-sm placeholder:text-[var(--kew-menu-text-secondary)] focus:border-emerald-500/60 transition-colors"
                      />
                      <button
                        type="submit"
                        aria-label="Submit search"
                        className="kew-menu-ghost-btn absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </form>

                    {mobileSuggestions.length > 0 && (
                      <div className="kew-menu-subcard rounded-xl border divide-y divide-[var(--kew-menu-border)] overflow-hidden">
                        {mobileSuggestions.map((it) => (
                          <Link
                            key={it.id}
                            href={it.canonicalUrl}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setMobileSearchQuery('');
                            }}
                            className="kew-menu-item block px-3 py-2"
                          >
                            <div className="kew-menu-item-title text-xs font-semibold truncate">
                              {it.title}
                            </div>
                            {it.subtitle && (
                              <div className="kew-menu-item-desc text-[10px] truncate">
                                {it.subtitle}
                              </div>
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
                        className="kew-menu-option-btn p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-colors relative cursor-pointer"
                      >
                        <Bell className="w-4 h-4 text-amber-400 mb-1" />
                        <span className="kew-menu-title text-[11px] font-medium">Alerts</span>
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
                        className="kew-menu-option-btn p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-purple-400 mb-1" />
                        <span className="kew-menu-title text-[11px] font-medium">Preferences</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          openControlCenterOnTab('account');
                        }}
                        className="kew-menu-option-btn p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-emerald-400 mb-1" />
                        <span className="kew-menu-title text-[11px] font-medium">Account</span>
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
    </>
  );
}
