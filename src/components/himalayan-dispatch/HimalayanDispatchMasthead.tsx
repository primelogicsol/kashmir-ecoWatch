'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { useDispatchTheme } from './DispatchThemeContext';
import { REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import {
  FOOTER_DEPARTMENT_LINKS,
  HD_ROUTES,
  stripDispatchPrefix,
  toKewPlatformUrl,
  type BureauRouteSlug,
} from '@/lib/himalayan-dispatch-routes';

const PRE_DEPT_LINKS = [
  { label: 'DAILY DISPATCH', get href() { return HD_ROUTES.dailyDispatch; }, exact: false },
  { label: 'THE ISSUE', get href() { return HD_ROUTES.currentIssue; }, exact: false },
  { label: 'COMING NEXT', get href() { return HD_ROUTES.forthcoming; }, exact: false },
];

const POST_BUREAUS_LINKS = [
  { label: 'EDITORIAL BOARD', get href() { return HD_ROUTES.editorialBoard; }, exact: false },
  { label: 'ARCHIVE', get href() { return HD_ROUTES.archive; }, exact: false },
];

interface DropdownMenuItemSpec {
  key: string;
  label: string;
  href: string;
  active: boolean;
  establishing?: boolean;
}

interface DropdownFooterLinkSpec {
  label: string;
  href: string;
  muted?: boolean;
}

/**
 * Shared Himalayan Dispatch Editorial Dropdown Component.
 * Implements content-aware independent width, viewport-edge clamping, keyboard
 * navigation (ArrowDown/ArrowUp/Home/End/Escape/Tab), click-outside dismissal,
 * reliable pointer/touch separation, and consistent right-aligned arrows.
 */
function EditorialNavDropdown({
  id,
  triggerLabel,
  triggerHref,
  triggerActive,
  toggleAriaLabel,
  menuAriaLabel,
  heading,
  variant,
  isOpen,
  setOpen,
  closeSibling,
  items,
  footerLinks,
}: {
  id: string;
  triggerLabel: string;
  triggerHref: string;
  triggerActive: boolean;
  toggleAriaLabel: string;
  menuAriaLabel: string;
  heading: string;
  variant: 'departments' | 'bureaus';
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeSibling: () => void;
  items: DropdownMenuItemSpec[];
  footerLinks: DropdownFooterLinkSpec[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByMouseAtRef = useRef<number>(0);
  const [shiftPx, setShiftPx] = useState(0);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  // Measure and clamp dropdown horizontally within [12px, innerWidth - 12px]
  const recalculateViewportClamp = useCallback(() => {
    const panel = panelRef.current;
    if (!panel || typeof window === 'undefined') return;
    // Measure natural unshifted position first
    panel.style.setProperty('--hd-dropdown-shift', '0px');
    const rect = panel.getBoundingClientRect();
    const gutter = 12;
    const vw = window.innerWidth;
    let nextShift = 0;
    if (rect.left < gutter) {
      nextShift = Math.ceil(gutter - rect.left);
    } else if (rect.right > vw - gutter) {
      nextShift = -Math.ceil(rect.right - (vw - gutter));
    }
    panel.style.setProperty('--hd-dropdown-shift', `${nextShift}px`);
    setShiftPx(nextShift);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      setShiftPx(0);
      return;
    }
    recalculateViewportClamp();
    window.addEventListener('resize', recalculateViewportClamp, { passive: true });
    return () => window.removeEventListener('resize', recalculateViewportClamp);
  }, [isOpen, recalculateViewportClamp]);

  const focusMenuItemAt = (targetIndex: 'first' | 'last' | number) => {
    requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const links = Array.from(
        panel.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]')
      );
      if (links.length === 0) return;
      if (targetIndex === 'first') {
        links[0]?.focus();
      } else if (targetIndex === 'last') {
        links[links.length - 1]?.focus();
      } else {
        const normalized = ((targetIndex % links.length) + links.length) % links.length;
        links[normalized]?.focus();
      }
    });
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    clearCloseTimer();
    closeSibling();
    setOpen((prev) => {
      if (!prev) openedByMouseAtRef.current = Date.now();
      return true;
    });
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleToggleClick = () => {
    clearCloseTimer();
    if (isOpen && Date.now() - openedByMouseAtRef.current < 450) {
      return;
    }
    setOpen((prev) => {
      const next = !prev;
      if (next) closeSibling();
      return next;
    });
  };

  const handleToggleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      closeSibling();
      setOpen(true);
      focusMenuItemAt('first');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      closeSibling();
      setOpen(true);
      focusMenuItemAt('last');
    } else if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      setOpen(false);
      toggleBtnRef.current?.focus();
    }
  };

  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const links = Array.from(
      panel.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]')
    );
    const currentIdx = links.indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      toggleBtnRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusMenuItemAt(currentIdx >= 0 ? currentIdx + 1 : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusMenuItemAt(currentIdx > 0 ? currentIdx - 1 : links.length - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusMenuItemAt('first');
    } else if (e.key === 'End') {
      e.preventDefault();
      focusMenuItemAt('last');
    }
  };

  const handleWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!isOpen) return;
    const nextFocused = e.relatedTarget as Node | null;
    if (nextFocused && wrapperRef.current && !wrapperRef.current.contains(nextFocused)) {
      setOpen(false);
    }
  };

  const singleFooterLink = footerLinks.length === 1;

  return (
    <div
      ref={wrapperRef}
      className="relative shrink-0"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlur={handleWrapperBlur}
    >
      <div className="inline-flex items-center">
        <Link
          href={triggerHref}
          className="hd-nav-primary-link"
          style={{
            color: triggerActive ? 'var(--hd-copper)' : 'var(--hd-fg)',
          }}
        >
          {triggerLabel}
          {triggerActive && (
            <span
              className="absolute bottom-0 inset-x-0 h-[2px]"
              style={{ backgroundColor: 'var(--hd-copper)' }}
            />
          )}
        </Link>
        <button
          ref={toggleBtnRef}
          type="button"
          onClick={handleToggleClick}
          onKeyDown={handleToggleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls={id}
          aria-label={toggleAriaLabel}
          className="hd-nav-chevron-btn"
          style={{ color: triggerActive ? 'var(--hd-copper)' : 'var(--hd-fg-muted)' }}
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          ref={panelRef}
          id={id}
          role="menu"
          aria-label={menuAriaLabel}
          onKeyDown={handlePanelKeyDown}
          className={`hd-nav-dropdown hd-nav-dropdown--${variant}`}
          style={
            {
              '--hd-dropdown-shift': `${shiftPx}px`,
            } as React.CSSProperties
          }
        >
          <div className="hd-nav-dropdown__header">
            <span className="hd-nav-dropdown__heading">{heading}</span>
          </div>

          <ul className="hd-nav-dropdown__list">
            {items.map((item) => (
              <li key={item.key} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  data-active={item.active ? 'true' : undefined}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="hd-nav-dropdown__item"
                >
                  <span className="hd-nav-dropdown__label">{item.label}</span>
                  <span className="hd-nav-dropdown__meta">
                    {item.establishing && (
                      <abbr
                        title="Distributed reporting desk currently in establishment — not a physical regional office"
                        aria-label="In establishment: distributed reporting desk currently being established, not a physical office"
                        className="hd-nav-dropdown__est"
                      >
                        Est.
                      </abbr>
                    )}
                    <ArrowRight className="hd-nav-dropdown__arrow" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {footerLinks.length > 0 && (
            <div className="hd-nav-dropdown__footer">
              {footerLinks.map((fl) => (
                <Link
                  key={fl.href}
                  role="menuitem"
                  href={fl.href}
                  onClick={() => setOpen(false)}
                  className={`hd-nav-dropdown__footer-link ${
                    singleFooterLink ? 'hd-nav-dropdown__footer-link--full' : ''
                  } ${fl.muted ? 'hd-nav-dropdown__footer-link--muted' : ''}`}
                >
                  <span>{fl.label}</span>
                  <ArrowRight className="hd-nav-dropdown__arrow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function HimalayanDispatchMasthead() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useDispatchTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deptsOpen, setDeptsOpen] = useState(false);
  const [bureausOpen, setBureausOpen] = useState(false);
  const [mobileDeptsOpen, setMobileDeptsOpen] = useState(false);
  const [mobileBureausOpen, setMobileBureausOpen] = useState(false);

  const navRootRef = useRef<HTMLElement>(null);
  const isScrolledRef = useRef(false);

  const normalizedPath = stripDispatchPrefix(pathname || '/');
  const isMagazineHome = normalizedPath === '/';

  useEffect(() => {
    let rafId: number | null = null;
    const evaluateScroll = () => {
      rafId = null;
      const y = window.scrollY;
      // Hysteresis deadband (150px..190px) + ref equality guard prevents nested
      // setState oscillation ("Maximum update depth exceeded") around threshold.
      const next = isScrolledRef.current ? y > 150 : y > 190;
      if (next !== isScrolledRef.current) {
        isScrolledRef.current = next;
        setIsScrolled(next);
      }
    };
    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(evaluateScroll);
      }
    };
    evaluateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setDeptsOpen(false);
    setBureausOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onOutsidePointer = (e: MouseEvent | TouchEvent) => {
      if (navRootRef.current && !navRootRef.current.contains(e.target as Node)) {
        setDeptsOpen(false);
        setBureausOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDeptsOpen(false);
        setBureausOpen(false);
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsidePointer);
    document.addEventListener('touchstart', onOutsidePointer, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onOutsidePointer);
      document.removeEventListener('touchstart', onOutsidePointer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const isActive = (href: string, exact: boolean) => {
    const target = stripDispatchPrefix(href);
    if (target === '/current-issue') {
      return (
        normalizedPath === '/' ||
        normalizedPath === '/current-issue' ||
        normalizedPath.startsWith('/issues/')
      );
    }
    if (exact) return normalizedPath === target;
    return normalizedPath === target || normalizedPath.startsWith(`${target}/`);
  };

  const ourStoryActive = isActive(HD_ROUTES.ourStory, true);
  const deptsActive = isActive(HD_ROUTES.departments, false);
  const journalistsActive = isActive(HD_ROUTES.journalists, false);
  const bureausActive =
    isActive(HD_ROUTES.bureausOverview, false) ||
    isActive(HD_ROUTES.reportingBeats, false);
  const joinActive =
    isActive(HD_ROUTES.joinNewsroom, false) ||
    isActive(HD_ROUTES.correspondentApplications, false) ||
    isActive(HD_ROUTES.editorialAppointments, false) ||
    isActive(HD_ROUTES.contributorGuidelines, false);

  const departmentMenuItems: DropdownMenuItemSpec[] = FOOTER_DEPARTMENT_LINKS.map((dept) => ({
    key: dept.href,
    label: dept.label,
    href: dept.href,
    active: isActive(dept.href, true),
  }));

  const bureauMenuItems: DropdownMenuItemSpec[] = REGIONAL_REPORTING_BUREAUS.map((b) => {
    const href = HD_ROUTES.bureau(b.id as BureauRouteSlug);
    return {
      key: b.id,
      label: b.name,
      href,
      active: isActive(href, true),
      establishing: b.operationalStatus !== 'active_reporting_desk',
    };
  });

  return (
    <>
      {/* Top Institutional Imprint & Return Ribbon */}
      <div
        className="w-full border-b px-4 sm:px-8 lg:px-14 py-2.5 text-[11px]"
        style={{
          borderColor: 'var(--hd-rule)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <a
            href={toKewPlatformUrl('/')}
            className="hd-font-sans inline-flex items-center gap-2 font-medium tracking-[0.14em] uppercase transition-colors hover:opacity-80"
            style={{ color: 'var(--hd-fg)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
            <span>Return to Kashmir EcoWatch</span>
          </a>

          <div
            className="hd-font-sans hidden xl:flex items-center gap-3 tracking-[0.22em] uppercase text-[10px]"
            style={{ color: 'var(--hd-fg-muted)' }}
          >
            <span>EST. 2026</span>
            <span aria-hidden="true">·</span>
            <span>KEW WESTERN HIMALAYAS</span>
            <span aria-hidden="true">·</span>
            <span>PUBLISHED IN FAIRFAX, VA · USA</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href={HD_ROUTES.ourStory}
              aria-current={ourStoryActive ? 'page' : undefined}
              className="hd-font-sans hidden sm:inline-block text-[10px] font-medium tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
              style={{
                color: ourStoryActive ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
              }}
            >
              Our Story
            </Link>

            <Link
              href={HD_ROUTES.journalistSignIn}
              className="hd-font-sans hidden md:inline-block text-[10px] font-medium tracking-[0.16em] uppercase transition-opacity hover:opacity-80"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              Journalist Sign In
            </Link>

            <Link
              href={HD_ROUTES.pitch}
              className="hd-font-sans hidden sm:inline-block text-[10px] font-semibold tracking-[0.18em] uppercase transition-colors"
              style={{ color: 'var(--hd-copper)' }}
            >
              Pitch a Story
            </Link>

            <a
              href={toKewPlatformUrl('/search?q=Himalayan+Dispatch')}
              className="hd-font-sans inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase transition-opacity hover:opacity-75"
              style={{ color: 'var(--hd-fg-muted)' }}
              aria-label="Search Himalayan Dispatch and KEW Archive"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Index</span>
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="hd-theme-toggle-btn hd-font-sans inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] uppercase cursor-pointer transition-colors"
              aria-label={
                theme === 'ivory'
                  ? 'Switch to Charcoal Ink dark editorial reading mode'
                  : 'Switch to Warm Editorial Ivory light reading mode'
              }
            >
              {theme === 'ivory' ? (
                <>
                  <Moon className="w-3 h-3" style={{ color: 'var(--hd-copper)' }} />
                  <span>Ink Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3" style={{ color: 'var(--hd-copper)' }} />
                  <span>Ivory Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Grand Magazine Masthead (Preserved Luxury Editorial Identity) */}
      <header
        className="w-full px-4 sm:px-8 lg:px-14"
        style={{ backgroundColor: 'var(--hd-bg)' }}
      >
        <div
          className={`max-w-[1440px] mx-auto text-center ${
            isMagazineHome ? 'pt-10 pb-7 sm:pt-14 sm:pb-9' : 'pt-7 pb-5 sm:pt-9 sm:pb-6'
          }`}
        >
          <p
            className="hd-font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase mb-3 sm:mb-4"
            style={{ color: 'var(--hd-fg-muted)' }}
          >
            EST. 2026 &nbsp;·&nbsp; KEW WESTERN HIMALAYAS
          </p>

          <Link href={HD_ROUTES.root} className="inline-block group">
            <span
              className={`hd-font-display block font-semibold uppercase tracking-[0.12em] leading-[0.94] transition-opacity group-hover:opacity-90 ${
                isMagazineHome
                  ? 'text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem]'
                  : 'text-3xl sm:text-5xl md:text-[3.5rem]'
              }`}
              style={{ color: 'var(--hd-fg)' }}
            >
              HIMALAYAN
            </span>
            <span
              className={`hd-font-display block font-normal uppercase tracking-[0.42em] sm:tracking-[0.52em] pl-[0.42em] sm:pl-[0.52em] mt-1 sm:mt-2 leading-none ${
                isMagazineHome
                  ? 'text-lg sm:text-2xl md:text-3xl'
                  : 'text-sm sm:text-lg md:text-xl'
              }`}
              style={{ color: 'var(--hd-copper)' }}
            >
              DISPATCH
            </span>
          </Link>

          <p
            className="hd-font-sans text-[10px] sm:text-xs tracking-[0.34em] uppercase mt-4 sm:mt-5"
            style={{ color: 'var(--hd-fg-muted)' }}
          >
            LANDSCAPE. &nbsp;PEOPLE. &nbsp;SCIENCE. &nbsp;TRUTH.
          </p>
        </div>

        <div className="max-w-[1440px] mx-auto">
          <div className="hd-double-rule" />
        </div>
      </header>

      {/* Sticky Editorial Navigation Bar */}
      <nav
        ref={navRootRef}
        aria-label="Himalayan Dispatch Editorial Navigation"
        className={`hd-sticky-nav sticky top-0 w-full border-b transition-shadow duration-300 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-14 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
        style={{
          backgroundColor: 'var(--hd-nav-backdrop)',
          borderColor: 'var(--hd-rule)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1440px] mx-auto h-12 sm:h-13 flex items-center justify-between gap-3">
          {/* Left: Compact wordmark on ultra-wide scroll, or Volume folio on < 1024px screens */}
          <div className="flex items-center shrink-0 lg:hidden 2xl:flex">
            <Link
              href={HD_ROUTES.root}
              className={`hd-font-display text-base font-semibold tracking-[0.12em] uppercase whitespace-nowrap transition-opacity duration-200 hidden 2xl:inline-block ${
                isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{ color: 'var(--hd-fg)' }}
            >
              Himalayan <span style={{ color: 'var(--hd-copper)' }}>Dispatch</span>
            </Link>
            <span
              className="hd-mobile-folio-label hd-font-display text-sm font-semibold tracking-[0.16em] uppercase whitespace-nowrap"
              style={{ color: 'var(--hd-fg)' }}
            >
              Vol. 01 · No. 01
            </span>
          </div>

          {/* Desktop Single-Line Primary Navigation (>= 1024px, including portrait desktop monitors) */}
          <div className="hd-desktop-nav-row">
            {/* 1–3: DAILY DISPATCH · THE ISSUE · COMING NEXT */}
            {PRE_DEPT_LINKS.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="hd-nav-primary-link"
                  style={{
                    color: active ? 'var(--hd-copper)' : 'var(--hd-fg)',
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 inset-x-0 h-[2px]"
                      style={{ backgroundColor: 'var(--hd-copper)' }}
                    />
                  )}
                </Link>
              );
            })}

            {/* 4: DEPARTMENTS (Reusable Content-Aware Editorial Dropdown) */}
            <EditorialNavDropdown
              id="hd-departments-dropdown-menu"
              triggerLabel="DEPARTMENTS"
              triggerHref={HD_ROUTES.departments}
              triggerActive={deptsActive}
              toggleAriaLabel="Toggle Editorial Departments menu"
              menuAriaLabel="Seven Editorial Departments"
              heading="SEVEN EDITORIAL DEPARTMENTS"
              variant="departments"
              isOpen={deptsOpen}
              setOpen={setDeptsOpen}
              closeSibling={() => setBureausOpen(false)}
              items={departmentMenuItems}
              footerLinks={[
                {
                  label: 'Departments Directory',
                  href: HD_ROUTES.departments,
                },
              ]}
            />

            {/* 5: JOURNALISTS */}
            <Link
              href={HD_ROUTES.journalists}
              aria-current={journalistsActive ? 'page' : undefined}
              className="hd-nav-primary-link"
              style={{
                color: journalistsActive ? 'var(--hd-copper)' : 'var(--hd-fg)',
              }}
            >
              JOURNALISTS
              {journalistsActive && (
                <span
                  className="absolute bottom-0 inset-x-0 h-[2px]"
                  style={{ backgroundColor: 'var(--hd-copper)' }}
                />
              )}
            </Link>

            {/* 6: BUREAUS (Reusable 300–360px Content-Aware Editorial Dropdown) */}
            <EditorialNavDropdown
              id="hd-bureaus-dropdown-menu"
              triggerLabel="BUREAUS"
              triggerHref={HD_ROUTES.bureausOverview}
              triggerActive={bureausActive}
              toggleAriaLabel="Toggle Regional Reporting Bureaus menu"
              menuAriaLabel="Six Regional Reporting Bureaus"
              heading="WESTERN HIMALAYAN REPORTING DESKS"
              variant="bureaus"
              isOpen={bureausOpen}
              setOpen={setBureausOpen}
              closeSibling={() => setDeptsOpen(false)}
              items={bureauMenuItems}
              footerLinks={[
                {
                  label: 'All Bureaus',
                  href: HD_ROUTES.bureausOverview,
                },
                {
                  label: 'Reporting Beats',
                  href: HD_ROUTES.reportingBeats,
                  muted: true,
                },
              ]}
            />

            {/* 7–8: EDITORIAL BOARD · ARCHIVE */}
            {POST_BUREAUS_LINKS.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="hd-nav-primary-link"
                  style={{
                    color: active ? 'var(--hd-copper)' : 'var(--hd-fg)',
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      className="absolute bottom-0 inset-x-0 h-[2px]"
                      style={{ backgroundColor: 'var(--hd-copper)' }}
                    />
                  )}
                </Link>
              );
            })}

            {/* 9: JOIN THE NEWSROOM (Restrained Burnt-Copper Editorial Accent) */}
            <Link
              href={HD_ROUTES.joinNewsroom}
              data-active={joinActive ? 'true' : undefined}
              aria-current={joinActive ? 'page' : undefined}
              className="hd-join-cta-btn hd-font-sans inline-flex items-center font-semibold uppercase whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
            >
              JOIN THE NEWSROOM
            </Link>

            {/* 10: ← KEW */}
            <a
              href={toKewPlatformUrl('/')}
              className="hd-nav-primary-link inline-flex items-center gap-1 opacity-80 hover:opacity-100"
              style={{ color: 'var(--hd-fg-muted)' }}
            >
              <span>← KEW</span>
            </a>
          </div>

          {/* Right Spacer on 2xl */}
          <div className="hidden 2xl:flex items-center shrink-0">
            <span className="inline-block w-[110px]" aria-hidden="true" />
          </div>

          {/* Compact Tablet/Mobile Controls (< 1024px) */}
          <div className="hd-compact-folio-controls">
            <Link
              href={HD_ROUTES.joinNewsroom}
              data-active={joinActive ? 'true' : undefined}
              className="hd-join-cta-btn hidden sm:inline-flex hd-font-sans items-center px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap"
            >
              Join the Newsroom
            </Link>

            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="hd-theme-toggle-btn hd-font-sans inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] uppercase cursor-pointer"
              aria-expanded={drawerOpen}
              aria-controls="hd-mobile-folio-drawer"
              aria-label="Toggle Himalayan Dispatch Folio Menu"
            >
              {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span>Folio</span>
            </button>
          </div>
        </div>

        {/* Responsive Editorial Folio Drawer (< 1024px Tablets & Mobile Devices) */}
        {drawerOpen && (
          <div
            id="hd-mobile-folio-drawer"
            className="hd-mobile-folio-drawer border-t py-6 space-y-6 max-h-[82vh] overflow-y-auto"
            style={{
              borderColor: 'var(--hd-rule)',
              backgroundColor: 'var(--hd-bg)',
            }}
          >
            <div className="flex flex-col space-y-2.5">
              {PRE_DEPT_LINKS.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hd-font-display text-2xl font-medium tracking-[0.06em] py-1.5 border-b flex items-center justify-between"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      color: active ? 'var(--hd-copper)' : 'var(--hd-fg)',
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--hd-copper)' }}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}

              {/* Expandable Seven Departments in Mobile/Tablet Folio */}
              <div className="border-b py-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={HD_ROUTES.departments}
                    className="hd-font-display text-2xl font-medium tracking-[0.06em]"
                    style={{ color: deptsActive ? 'var(--hd-copper)' : 'var(--hd-fg)' }}
                  >
                    DEPARTMENTS
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileDeptsOpen((prev) => !prev)}
                    aria-expanded={mobileDeptsOpen}
                    aria-label="Expand seven editorial departments"
                    className="hd-nav-chevron-btn hd-font-sans inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    <span>7 Desks</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        mobileDeptsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {mobileDeptsOpen && (
                  <div
                    className="mt-3 pl-3 border-l grid grid-cols-1 sm:grid-cols-2 gap-1.5 py-1"
                    style={{ borderColor: 'var(--hd-copper)' }}
                  >
                    {FOOTER_DEPARTMENT_LINKS.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        className="py-1.5 flex items-center justify-between gap-3 pr-2"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        <span className="hd-font-body text-base">{d.label}</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: 'var(--hd-copper)' }}
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={HD_ROUTES.journalists}
                className="hd-font-display text-2xl font-medium tracking-[0.06em] py-1.5 border-b flex items-center justify-between"
                style={{
                  borderColor: 'var(--hd-rule)',
                  color: journalistsActive ? 'var(--hd-copper)' : 'var(--hd-fg)',
                }}
              >
                <span>JOURNALISTS</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0"
                  style={{ color: 'var(--hd-copper)' }}
                  aria-hidden="true"
                />
              </Link>

              {/* Expandable Six Regional Bureaus in Mobile/Tablet Folio */}
              <div className="border-b py-1.5" style={{ borderColor: 'var(--hd-rule)' }}>
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={HD_ROUTES.bureausOverview}
                    className="hd-font-display text-2xl font-medium tracking-[0.06em]"
                    style={{ color: bureausActive ? 'var(--hd-copper)' : 'var(--hd-fg)' }}
                  >
                    BUREAUS
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileBureausOpen((prev) => !prev)}
                    aria-expanded={mobileBureausOpen}
                    aria-label="Expand six regional reporting bureaus"
                    className="hd-nav-chevron-btn hd-font-sans inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase"
                    style={{ color: 'var(--hd-copper)' }}
                  >
                    <span>6 Bureaus</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        mobileBureausOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {mobileBureausOpen && (
                  <div
                    className="mt-3 pl-3 border-l space-y-2 py-1"
                    style={{ borderColor: 'var(--hd-copper)' }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {REGIONAL_REPORTING_BUREAUS.map((b) => {
                        const establishing = b.operationalStatus !== 'active_reporting_desk';
                        return (
                          <Link
                            key={b.id}
                            href={HD_ROUTES.bureau(b.id as BureauRouteSlug)}
                            className="py-1.5 flex items-center justify-between gap-2 pr-2"
                            style={{ color: 'var(--hd-fg-secondary)' }}
                          >
                            <span className="hd-font-body text-base">{b.name}</span>
                            <span className="inline-flex items-center gap-2 shrink-0">
                              {establishing && (
                                <abbr
                                  title="Distributed reporting desk currently in establishment — not a physical office"
                                  className="hd-folio-meta text-[9px] no-underline"
                                >
                                  Est.
                                </abbr>
                              )}
                              <ArrowRight
                                className="w-3.5 h-3.5 shrink-0"
                                style={{ color: 'var(--hd-copper)' }}
                                aria-hidden="true"
                              />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div
                      className="pt-2 pr-2 border-t flex flex-wrap items-center justify-between gap-3"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <Link
                        href={HD_ROUTES.bureausOverview}
                        className="hd-kicker text-[10px] inline-flex items-center gap-1"
                      >
                        <span>All Bureaus</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        href={HD_ROUTES.reportingBeats}
                        className="hd-folio-meta text-[10px] inline-flex items-center gap-1"
                      >
                        <span>Reporting Beats</span>
                        <ArrowRight className="w-3 h-3" style={{ color: 'var(--hd-copper)' }} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {POST_BUREAUS_LINKS.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hd-font-display text-2xl font-medium tracking-[0.06em] py-1.5 border-b flex items-center justify-between"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      color: active ? 'var(--hd-copper)' : 'var(--hd-fg)',
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      className="w-4 h-4 shrink-0"
                      style={{ color: 'var(--hd-copper)' }}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}

              <Link
                href={HD_ROUTES.ourStory}
                className="hd-font-display text-2xl font-medium tracking-[0.06em] py-1.5 border-b flex items-center justify-between"
                style={{
                  borderColor: 'var(--hd-rule)',
                  color: ourStoryActive ? 'var(--hd-copper)' : 'var(--hd-fg)',
                }}
              >
                <span>OUR STORY</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0"
                  style={{ color: 'var(--hd-copper)' }}
                  aria-hidden="true"
                />
              </Link>

              <Link
                href={HD_ROUTES.joinNewsroom}
                className="hd-font-display text-2xl font-semibold tracking-[0.06em] py-1.5 border-b flex items-center justify-between"
                style={{
                  borderColor: 'var(--hd-copper)',
                  color: 'var(--hd-copper)',
                }}
              >
                <span>JOIN THE NEWSROOM</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0"
                  style={{ color: 'var(--hd-copper)' }}
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Recruitment Quick Pathways & Return Link */}
            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                <Link
                  href={HD_ROUTES.correspondentApplications}
                  className="hd-folio-meta hover:underline"
                >
                  Correspondent Applications
                </Link>
                <Link
                  href={HD_ROUTES.editorialAppointments}
                  className="hd-folio-meta hover:underline"
                >
                  Editorial Appointments
                </Link>
                <Link
                  href={HD_ROUTES.pitch}
                  className="hd-folio-meta hover:underline"
                >
                  Pitch a Story
                </Link>
                <Link
                  href={HD_ROUTES.journalistSignIn}
                  className="hd-folio-meta hover:underline"
                >
                  Journalist Sign In
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Link
                  href={HD_ROUTES.joinNewsroom}
                  data-active="true"
                  className="hd-join-cta-btn hd-font-sans inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Join the Newsroom</span>
                </Link>

                <a
                  href={toKewPlatformUrl('/')}
                  className="hd-font-sans inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase"
                  style={{ color: 'var(--hd-fg-muted)' }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                  <span>← KEW · Return to Kashmir EcoWatch</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
