'use client';

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Award,
  Building2,
  Calendar,
  ChevronDown,
  FileText,
  Layers,
  MoreHorizontal,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PreConferenceDeviceCheckButton } from './PreConferenceDeviceCheckButton';

type WebinarNavGroupId = 'program' | 'participation' | 'publications';

interface WebinarNavItem {
  label: string;
  href: string;
  matchPrefix?: string;
  icon: LucideIcon;
  group: WebinarNavGroupId;
  badge?: string;
  badgeTone?: 'teal' | 'amber';
  badgeColor?: string;
}

const WEBINAR_NAV_GROUPS: Array<{ id: WebinarNavGroupId; title: string }> = [
  { id: 'program', title: 'Program & Schedule' },
  { id: 'participation', title: 'Participation & Live Hall' },
  { id: 'publications', title: 'Publications & Archives' },
];

const WEBINAR_NAV_LINKS: WebinarNavItem[] = [
  {
    label: 'Hub Overview',
    href: '/webinars',
    icon: Sparkles,
    group: 'program',
  },
  {
    label: 'Conferences (8)',
    href: '/webinars/conferences',
    icon: Layers,
    group: 'program',
  },
  {
    label: '2027–28 Calendar',
    href: '/webinars/calendar',
    icon: Calendar,
    group: 'program',
    badge: '104 Events',
    badgeTone: 'teal',
    badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/40',
  },
  {
    label: 'Upcoming',
    href: '/webinars/upcoming',
    icon: Calendar,
    group: 'program',
  },
  {
    label: 'Host a Conference',
    href: '/webinars/host-a-conference',
    icon: PlusCircle,
    group: 'participation',
  },
  {
    label: 'Institutional Network',
    href: '/webinars/institution/verification',
    matchPrefix: '/webinars/institution',
    icon: Building2,
    group: 'participation',
  },
  {
    label: 'Virtual Hall',
    href: '/webinars/room/kew-conf-2027-cryo',
    matchPrefix: '/webinars/room',
    icon: Video,
    group: 'participation',
    badge: 'Demo',
    badgeTone: 'amber',
    badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
  },
  {
    label: 'Proceedings',
    href: '/webinars/proceedings',
    icon: FileText,
    group: 'publications',
  },
  {
    label: 'Past Archives',
    href: '/webinars/past-events',
    icon: Award,
    group: 'publications',
  },
];

const ITEM_GAP_PX = 6; // gap-1.5
const CENTER_GAP_PX = 16; // gap-4 minimum breathing room between public nav & right controls
const SAFETY_BUFFER_PX = 6; // subpixel & font-rounding buffer so labels never clip or touch
const DESKTOP_DROPDOWN_WIDTH_PX = 312;

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function WebinarNav() {
  const pathname = usePathname();

  const navShellRef = useRef<HTMLDivElement>(null);
  const rowContainerRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const morePanelRef = useRef<HTMLDivElement>(null);

  // 1:1 out-of-flow measurement rulers
  const itemMeasureRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const moreMeasureRef = useRef<HTMLSpanElement | null>(null);
  const rightFullMeasureRef = useRef<HTMLDivElement | null>(null);
  const rightSeparatedMeasureRef = useRef<HTMLDivElement | null>(null);

  // Default to full desktop layout for zero-CLS SSR on wide viewports;
  // useIsomorphicLayoutEffect synchronously resolves overflow before first paint on smaller viewports.
  const [visibleCount, setVisibleCount] = useState<number>(WEBINAR_NAV_LINKS.length);
  const [stackAdminControls, setStackAdminControls] = useState<boolean>(false);
  const [isMeasured, setIsMeasured] = useState<boolean>(false);
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const [dropdownLeftPx, setDropdownLeftPx] = useState<number | null>(null);

  const isLinkActive = useCallback(
    (link: WebinarNavItem): boolean => {
      if (link.href === '/webinars') {
        return pathname === '/webinars';
      }
      const prefix = link.matchPrefix || link.href;
      return pathname === link.href || pathname.startsWith(prefix);
    },
    [pathname]
  );

  const recomputeOverflow = useCallback(() => {
    const rowEl = rowContainerRef.current;
    if (!rowEl) return;

    const availableWidth = Math.floor(rowEl.clientWidth);
    if (availableWidth <= 0) return;

    const itemWidths = WEBINAR_NAV_LINKS.map((_, idx) => {
      const el = itemMeasureRefs.current[idx];
      return el ? Math.ceil(el.getBoundingClientRect().width) : 135;
    });

    const moreWidth = moreMeasureRef.current
      ? Math.ceil(moreMeasureRef.current.getBoundingClientRect().width)
      : 100;
    const rightFullWidth = rightFullMeasureRef.current
      ? Math.ceil(rightFullMeasureRef.current.getBoundingClientRect().width)
      : 248;
    const rightSeparatedWidth = rightSeparatedMeasureRef.current
      ? Math.ceil(rightSeparatedMeasureRef.current.getBoundingClientRect().width)
      : 262;

    // 1. Check if the complete desktop navigation fits on one horizontal row without clipping
    const totalAllPublicWidth =
      itemWidths.reduce((sum, w) => sum + w, 0) +
      Math.max(0, itemWidths.length - 1) * ITEM_GAP_PX;

    if (totalAllPublicWidth + CENTER_GAP_PX + rightFullWidth + SAFETY_BUFFER_PX <= availableWidth) {
      setVisibleCount(WEBINAR_NAV_LINKS.length);
      setStackAdminControls(false);
      setIsMeasured(true);
      return;
    }

    // 2. Check if >= 1 primary public item + More button + separated right admin group fit on 1 row
    const singleRowPublicBudget =
      availableWidth - CENTER_GAP_PX - rightSeparatedWidth - SAFETY_BUFFER_PX;
    const minPublicWithFirstItem = itemWidths[0] + ITEM_GAP_PX + moreWidth;

    if (singleRowPublicBudget >= minPublicWithFirstItem) {
      let count = 0;
      let used = 0;
      for (let i = 0; i < itemWidths.length - 1; i += 1) {
        const nextUsed = used + itemWidths[i] + ITEM_GAP_PX;
        if (nextUsed + moreWidth <= singleRowPublicBudget) {
          used = nextUsed;
          count = i + 1;
        } else {
          break;
        }
      }
      setVisibleCount(Math.max(1, count));
      setStackAdminControls(false);
      setIsMeasured(true);
      return;
    }

    // 3. Narrow mobile container: keep Administrative & Session controls in a separate row
    //    so public items + More menu have the full row width with zero truncation or overlap.
    const mobilePublicBudget = availableWidth - SAFETY_BUFFER_PX;
    let mobileCount = 0;
    let mobileUsed = 0;
    for (let i = 0; i < itemWidths.length - 1; i += 1) {
      const nextUsed = mobileUsed + itemWidths[i] + ITEM_GAP_PX;
      if (nextUsed + moreWidth <= mobilePublicBudget) {
        mobileUsed = nextUsed;
        mobileCount = i + 1;
      } else {
        break;
      }
    }

    setVisibleCount(mobileCount);
    setStackAdminControls(true);
    setIsMeasured(true);
  }, []);

  const syncNavHeightCssVar = useCallback(() => {
    const shell = navShellRef.current;
    if (!shell || typeof document === 'undefined') return;
    const heightPx = Math.ceil(shell.getBoundingClientRect().height);
    if (heightPx > 0) {
      document.documentElement.style.setProperty('--kew-webinar-nav-height', `${heightPx}px`);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    recomputeOverflow();
    syncNavHeightCssVar();

    const rowEl = rowContainerRef.current;
    const shellEl = navShellRef.current;
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', recomputeOverflow);
      return () => window.removeEventListener('resize', recomputeOverflow);
    }

    const observer = new ResizeObserver(() => {
      recomputeOverflow();
      syncNavHeightCssVar();
    });
    if (rowEl) observer.observe(rowEl);
    if (shellEl) observer.observe(shellEl);

    let cancelled = false;
    if (typeof document !== 'undefined' && 'fonts' in document && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          recomputeOverflow();
          syncNavHeightCssVar();
        }
      });
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [recomputeOverflow, syncNavHeightCssVar]);

  // Close More menu on route navigation
  useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  // Close More menu automatically if viewport widens enough to show all items
  useEffect(() => {
    if (visibleCount >= WEBINAR_NAV_LINKS.length && isMoreOpen) {
      setIsMoreOpen(false);
    }
  }, [visibleCount, isMoreOpen]);

  // Compute clamped horizontal offset for tablet/laptop More popover so it never clips off-screen
  useIsomorphicLayoutEffect(() => {
    if (!isMoreOpen) return;
    const updateDropdownPosition = () => {
      const rowEl = rowContainerRef.current;
      const btnEl = moreButtonRef.current;
      if (!rowEl || !btnEl) return;
      if (window.innerWidth < 640) {
        setDropdownLeftPx(null); // CSS full-container width (left-0 right-0) on <640px
        return;
      }
      const rowRect = rowEl.getBoundingClientRect();
      const btnRect = btnEl.getBoundingClientRect();
      const rawLeft = btnRect.left - rowRect.left;
      const maxLeft = Math.max(0, rowRect.width - DESKTOP_DROPDOWN_WIDTH_PX);
      setDropdownLeftPx(Math.max(0, Math.min(rawLeft, maxLeft)));
    };

    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);
    return () => window.removeEventListener('resize', updateDropdownPosition);
  }, [isMoreOpen, visibleCount, stackAdminControls]);

  // Dismiss More menu on outside pointerdown or Escape key
  useEffect(() => {
    if (!isMoreOpen) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (moreButtonRef.current?.contains(target)) return;
      if (morePanelRef.current?.contains(target)) return;
      setIsMoreOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoreOpen]);

  const visibleLinks = useMemo(
    () => WEBINAR_NAV_LINKS.slice(0, visibleCount),
    [visibleCount]
  );

  const overflowLinks = useMemo(
    () => WEBINAR_NAV_LINKS.slice(visibleCount),
    [visibleCount]
  );

  const groupedOverflowSections = useMemo(() => {
    if (overflowLinks.length === 0) return [];
    return WEBINAR_NAV_GROUPS.map((grp) => ({
      ...grp,
      items: overflowLinks.filter((item) => item.group === grp.id),
    })).filter((grp) => grp.items.length > 0);
  }, [overflowLinks]);

  const hasActiveOverflowItem = useMemo(
    () => overflowLinks.some((item) => isLinkActive(item)),
    [overflowLinks, isLinkActive]
  );

  const isFullDesktopMode =
    visibleCount >= WEBINAR_NAV_LINKS.length && !stackAdminControls;
  const isSuperAdminActive = pathname.startsWith('/webinars/admin');

  const navModeAttr = isFullDesktopMode
    ? 'full'
    : stackAdminControls
      ? 'stacked'
      : 'overflow';

  const renderAdminControls = () => (
    <>
      <PreConferenceDeviceCheckButton />
      <Link
        href="/webinars/admin"
        data-active={isSuperAdminActive ? 'true' : 'false'}
        className={cn(
          'kew-webinar-admin-link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0',
          isSuperAdminActive
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
        )}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Super Admin</span>
      </Link>
    </>
  );

  return (
    <div
      ref={navShellRef}
      data-testid="webinar-hub-nav"
      data-nav-mode={navModeAttr}
      data-visible-count={visibleCount}
      data-overflow-count={overflowLinks.length}
      className={cn(
        'kew-webinar-nav sticky top-16 md:top-[72px] z-40 bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40',
        !isMeasured && 'overflow-x-clip'
      )}
    >
      {/* Out-of-flow 1:1 measurement vault for exact container-width overflow detection */}
      <div className="kew-measurement-vault" aria-hidden="true">
        <div className="kew-ruler-inline gap-1.5">
          {WEBINAR_NAV_LINKS.map((link, idx) => {
            const Icon = link.icon;
            return (
              <span
                key={`measure-${link.href}`}
                ref={(el) => {
                  itemMeasureRefs.current[idx] = el;
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border"
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] border shrink-0">
                    {link.badge}
                  </span>
                )}
              </span>
            );
          })}
        </div>

        <span
          ref={moreMeasureRef}
          className="kew-ruler-inline gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border"
        >
          <MoreHorizontal className="w-3.5 h-3.5 shrink-0" />
          <span>More</span>
          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] border shrink-0">
            +9
          </span>
          <ChevronDown className="w-3.5 h-3.5 shrink-0" />
        </span>

        <div ref={rightFullMeasureRef} className="kew-ruler-inline gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border">
            <span className="w-3.5 h-3.5 inline-block shrink-0" />
            <span>Device Check</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Super Admin</span>
          </span>
        </div>

        <div ref={rightSeparatedMeasureRef} className="kew-ruler-inline gap-2 pl-3 border-l">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border">
            <span className="w-3.5 h-3.5 inline-block shrink-0" />
            <span>Device Check</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Super Admin</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto">
        <div
          ref={rowContainerRef}
          className={cn(
            'relative py-2.5',
            stackAdminControls
              ? 'flex flex-col gap-2'
              : 'flex items-center justify-between gap-4'
          )}
        >
          {/* Public Navigation Group + Overflow More Menu Trigger */}
          <nav
            aria-label="Webinar Hub Navigation"
            className={cn(
              'flex items-center gap-1.5 min-w-0',
              stackAdminControls ? 'w-full justify-between' : 'shrink-0'
            )}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              {visibleLinks.map((link) => {
                const Icon = link.icon;
                const isActive = isLinkActive(link);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={isActive ? 'true' : 'false'}
                    className={cn(
                      'kew-webinar-nav-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border shrink-0',
                      isActive
                        ? 'bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-sm shadow-teal-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-3.5 h-3.5 shrink-0',
                        isActive ? 'text-teal-400' : 'text-slate-400'
                      )}
                    />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        data-badge-tone={link.badgeTone || 'teal'}
                        className={cn(
                          'kew-webinar-nav-badge text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] shrink-0',
                          link.badgeColor
                        )}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {overflowLinks.length > 0 && (
              <button
                ref={moreButtonRef}
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                data-testid="webinar-nav-more-btn"
                data-active={hasActiveOverflowItem || isMoreOpen ? 'true' : 'false'}
                aria-haspopup="menu"
                aria-expanded={isMoreOpen}
                aria-controls="webinar-nav-more-menu"
                className={cn(
                  'kew-webinar-nav-item inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer shrink-0',
                  hasActiveOverflowItem || isMoreOpen
                    ? 'bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-sm shadow-teal-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border-white/10 bg-slate-900/60'
                )}
              >
                <MoreHorizontal
                  className={cn(
                    'w-3.5 h-3.5 shrink-0',
                    hasActiveOverflowItem || isMoreOpen ? 'text-teal-400' : 'text-slate-400'
                  )}
                />
                <span>More</span>
                <span
                  data-badge-tone="teal"
                  className="kew-webinar-nav-badge text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] bg-teal-500/20 text-teal-300 border border-teal-500/40 shrink-0"
                >
                  +{overflowLinks.length}
                </span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 shrink-0 transition-transform duration-200',
                    isMoreOpen && 'rotate-180'
                  )}
                />
              </button>
            )}
          </nav>

          {/* Separated Session Diagnostics & Administrative Controls */}
          {stackAdminControls ? (
            <div
              role="group"
              aria-label="Session Diagnostics and Administrative Controls"
              className="kew-webinar-admin-bar flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10"
            >
              <span className="kew-webinar-admin-kicker hidden min-[420px]:inline text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Session &amp; Admin
              </span>
              <div className="flex flex-wrap items-center justify-end gap-2 ml-auto">
                {renderAdminControls()}
              </div>
            </div>
          ) : (
            <div
              role="group"
              aria-label="Session Diagnostics and Administrative Controls"
              className={cn(
                'flex items-center gap-2 shrink-0',
                !isFullDesktopMode && 'kew-webinar-admin-separator pl-3 border-l border-white/10'
              )}
            >
              {renderAdminControls()}
            </div>
          )}

          {/* Grouped Secondary Public Navigation Menu (More Popover) */}
          {isMoreOpen && overflowLinks.length > 0 && (
            <div
              ref={morePanelRef}
              id="webinar-nav-more-menu"
              role="menu"
              aria-label="Additional Webinar Hub Destinations"
              style={
                dropdownLeftPx !== null
                  ? { left: `${dropdownLeftPx}px`, width: `${DESKTOP_DROPDOWN_WIDTH_PX}px` }
                  : undefined
              }
              className={cn(
                'kew-webinar-more-panel absolute z-50 rounded-xl bg-slate-950 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80 p-2.5 space-y-3 max-h-[min(75vh,28rem)] overflow-y-auto',
                dropdownLeftPx === null
                  ? 'left-0 right-0 top-[2.85rem]'
                  : 'top-full mt-1.5'
              )}
            >
              {groupedOverflowSections.map((section, sectionIdx) => (
                <div
                  key={section.id}
                  className={cn(
                    'space-y-1',
                    sectionIdx > 0 && 'kew-webinar-more-section-divider pt-2.5 border-t border-white/10'
                  )}
                >
                  <div className="kew-webinar-more-group-label px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {section.title}
                  </div>
                  <div className="space-y-1">
                    {section.items.map((link) => {
                      const Icon = link.icon;
                      const isActive = isLinkActive(link);
                      return (
                        <Link
                          key={`more-${link.href}`}
                          href={link.href}
                          role="menuitem"
                          data-active={isActive ? 'true' : 'false'}
                          onClick={() => setIsMoreOpen(false)}
                          className={cn(
                            'kew-webinar-nav-item flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 border',
                            isActive
                              ? 'bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-sm'
                              : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
                          )}
                        >
                          <span className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={cn(
                                'w-3.5 h-3.5 shrink-0',
                                isActive ? 'text-teal-400' : 'text-slate-400'
                              )}
                            />
                            <span className="whitespace-nowrap">{link.label}</span>
                          </span>
                          {link.badge && (
                            <span
                              data-badge-tone={link.badgeTone || 'teal'}
                              className={cn(
                                'kew-webinar-nav-badge text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] shrink-0',
                                link.badgeColor
                              )}
                            >
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
