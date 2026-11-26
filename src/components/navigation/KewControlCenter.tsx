'use client';

import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  User,
  Bell,
  Settings,
  Shield,
  Upload,
  FileText,
  Award,
  CheckCircle2,
  LogIn,
  LogOut,
  ExternalLink,
  Sparkles,
  Layers,
  X,
  AlertTriangle,
  Droplets,
  Mountain,
  Flame,
  Wind,
  Activity,
  ArrowRight,
  RotateCw,
  Radio,
  Check,
  RotateCcw,
  Eye,
  Monitor,
  Gauge,
  Map,
  UserPlus,
} from 'lucide-react';
import { useAuth, type ContributorRole } from '@/context/AuthContext';
import type { AlertItem } from '@/data/alert-registry';
import type { PlatformSettings } from '@/components/navigation/SettingsModal';

export type ControlCenterTab = 'account' | 'alerts' | 'preferences';

const SESSION_TAB_STORAGE_KEY = 'kew_control_center_tab';
const SETTINGS_STORAGE_KEY = 'kew_user_settings';
const MOCK_GOOGLE_PLACEHOLDER_AVATAR = 'https://lh3.googleusercontent.com/a/default-user';

const DEFAULT_SETTINGS: PlatformSettings = {
  units: 'metric',
  refreshRate: '30s',
  themeMode: 'dark',
  highContrast: false,
  reducedMotion: false,
  defaultBasemap: 'dark',
  compactMode: false,
};

export function formatContributorRoleLabel(
  role?: ContributorRole | string | null,
  isServerAdmin: boolean = false
): string {
  if (!role) return 'Public Open Access';
  switch (role) {
    case 'citizen_scientist':
      return 'Citizen Scientist';
    case 'researcher':
      return 'Researcher';
    case 'field_observer':
      return 'Field Observer';
    case 'student':
      return 'Ecology Scholar';
    case 'administrator':
      return isServerAdmin ? 'Administrator' : 'Platform Contributor';
    default:
      return String(role)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (ch) => ch.toUpperCase());
  }
}

export function isUsableAvatarUrl(url?: string | null): boolean {
  if (!url) return false;
  if (url === MOCK_GOOGLE_PLACEHOLDER_AVATAR) return false;
  return true;
}

function applyDocumentThemeMode(mode: 'dark' | 'light' | 'system') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const prefersLight =
    mode === 'system' &&
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
  if (mode === 'light' || prefersLight) {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
  }
}

export interface LiveAlertsBinding {
  alerts: AlertItem[];
  isLoading: boolean;
  isLive: boolean;
  lastUpdated: string | null;
  readAlertIds: Set<string>;
  unreadCount: number;
  unreadCriticalCount: number;
  refetch: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissAlert: (id: string) => void;
  resetReadHistory: () => void;
}

interface KewControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  liveAlerts: LiveAlertsBinding;
  isServerAdmin: boolean;
  requestedTab?: ControlCenterTab | null;
  requestedTabSeq?: number;
}

export function KewControlCenter({
  isOpen,
  onClose,
  liveAlerts,
  isServerAdmin,
  requestedTab = null,
  requestedTabSeq = 0,
}: KewControlCenterProps) {
  const { user, isLoggedIn, signOut, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<ControlCenterTab>('account');
  const [alertFilter, setAlertFilter] = useState<'all' | 'unread' | 'critical'>('all');
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);
  const [savedNotification, setSavedNotification] = useState(false);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

  const tabButtonRefs = useRef<Record<ControlCenterTab, HTMLButtonElement | null>>({
    account: null,
    alerts: null,
    preferences: null,
  });
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setAvatarLoadFailed(false);
  }, [user?.avatar]);

  // Restore active tab within the current browser session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedTab = sessionStorage.getItem(SESSION_TAB_STORAGE_KEY);
      if (savedTab === 'account' || savedTab === 'alerts' || savedTab === 'preferences') {
        setActiveTab(savedTab);
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  // Honor explicit tab requests (e.g., from mobile drawer Alerts/Preferences shortcuts)
  useEffect(() => {
    if (!requestedTab) return;
    setActiveTab(requestedTab);
    try {
      sessionStorage.setItem(SESSION_TAB_STORAGE_KEY, requestedTab);
    } catch {
      // Ignore sessionStorage errors
    }
  }, [requestedTab, requestedTabSeq]);

  // Load persisted platform preferences on mount and sync across storage updates
  useEffect(() => {
    const syncSettingsFromStorage = () => {
      try {
        const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (stored) {
          const merged: PlatformSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
          setSettings(merged);
          applyDocumentThemeMode(merged.themeMode);
          document.documentElement.classList.toggle('high-contrast', Boolean(merged.highContrast));
          document.documentElement.classList.toggle('reduce-motion', Boolean(merged.reducedMotion));
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    };

    syncSettingsFromStorage();
    window.addEventListener('storage', syncSettingsFromStorage);
    return () => {
      window.removeEventListener('storage', syncSettingsFromStorage);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const selectTab = (tab: ControlCenterTab) => {
    setActiveTab(tab);
    try {
      sessionStorage.setItem(SESSION_TAB_STORAGE_KEY, tab);
    } catch {
      // Ignore sessionStorage errors
    }
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, current: ControlCenterTab) => {
    const order: ControlCenterTab[] = ['account', 'alerts', 'preferences'];
    const idx = order.indexOf(current);
    let nextTab: ControlCenterTab | null = null;

    if (e.key === 'ArrowRight') {
      nextTab = order[(idx + 1) % order.length];
    } else if (e.key === 'ArrowLeft') {
      nextTab = order[(idx - 1 + order.length) % order.length];
    } else if (e.key === 'Home') {
      nextTab = order[0];
    } else if (e.key === 'End') {
      nextTab = order[order.length - 1];
    }

    if (nextTab) {
      e.preventDefault();
      selectTab(nextTab);
      tabButtonRefs.current[nextTab]?.focus();
    }
  };

  const updateSetting = <K extends keyof PlatformSettings>(key: K, value: PlatformSettings[K]) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
        if (key === 'themeMode') {
          applyDocumentThemeMode(value as 'dark' | 'light' | 'system');
        }
        if (key === 'highContrast') {
          document.documentElement.classList.toggle('high-contrast', Boolean(value));
        }
        if (key === 'reducedMotion') {
          document.documentElement.classList.toggle('reduce-motion', Boolean(value));
        }
      } catch (e) {
        console.error('Failed to save settings:', e);
      }
      return updated;
    });

    setSavedNotification(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedNotification(false), 2000);
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
      applyDocumentThemeMode('dark');
      document.documentElement.classList.remove('high-contrast', 'reduce-motion');
      setSavedNotification(true);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSavedNotification(false), 2000);
    } catch (e) {
      console.error('Failed to reset settings:', e);
    }
  };

  const panelRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<{
    widthPx: number;
    rightOffsetPx: number;
    maxHeightPx: number;
  } | null>(null);

  const updatePanelGeometry = useCallback(() => {
    if (typeof window === 'undefined' || !panelRef.current) return;
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    if (vw < 640 || vh <= 0) {
      setGeometry(null);
      return;
    }

    const anchorEl = panelRef.current.parentElement?.parentElement;
    if (!anchorEl) return;
    const anchorRect = anchorEl.getBoundingClientRect();
    const margin = 14;
    const widthPx = Math.min(420, Math.max(280, vw - margin * 2));

    let desiredRight = anchorRect.right;
    if (desiredRight > vw - margin) desiredRight = vw - margin;
    if (desiredRight - widthPx < margin) {
      desiredRight = Math.min(vw - margin, widthPx + margin);
    }
    const rightOffsetPx = Math.round((anchorRect.right - desiredRight) * 10) / 10;
    const panelTop = Math.max(0, anchorRect.bottom + 8);
    const maxHeightPx = Math.min(620, Math.max(200, Math.floor(vh - panelTop - margin)));

    setGeometry((prev) =>
      prev &&
      prev.widthPx === widthPx &&
      prev.rightOffsetPx === rightOffsetPx &&
      prev.maxHeightPx === maxHeightPx
        ? prev
        : { widthPx, rightOffsetPx, maxHeightPx }
    );
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      setGeometry(null);
      return;
    }
    updatePanelGeometry();
  }, [isOpen, updatePanelGeometry]);

  useEffect(() => {
    if (!isOpen) return;
    updatePanelGeometry();
    window.addEventListener('resize', updatePanelGeometry, { passive: true });
    window.addEventListener('scroll', updatePanelGeometry, { passive: true });
    window.addEventListener('orientationchange', updatePanelGeometry, { passive: true });
    window.visualViewport?.addEventListener('resize', updatePanelGeometry, { passive: true });
    return () => {
      window.removeEventListener('resize', updatePanelGeometry);
      window.removeEventListener('scroll', updatePanelGeometry);
      window.removeEventListener('orientationchange', updatePanelGeometry);
      window.visualViewport?.removeEventListener('resize', updatePanelGeometry);
    };
  }, [isOpen, updatePanelGeometry]);

  if (!isOpen) return null;

  const {
    alerts,
    isLoading,
    isLive,
    lastUpdated,
    readAlertIds,
    unreadCount,
    unreadCriticalCount,
    refetch,
    markAsRead,
    markAllAsRead,
    resetReadHistory,
  } = liveAlerts;

  const filteredAlerts = alerts.filter((alert) => {
    if (alertFilter === 'unread') return !readAlertIds.has(alert.id);
    if (alertFilter === 'critical') return alert.severity === 'high' || alert.severity === 'critical';
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'flood':
        return Droplets;
      case 'landslide':
        return Mountain;
      case 'fire':
        return Flame;
      case 'air-quality':
        return Wind;
      case 'earthquake':
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    }
  };

  const showUserPhoto = isLoggedIn && user && isUsableAvatarUrl(user.avatar) && !avatarLoadFailed;
  const roleDesignation =
    isLoggedIn && user
      ? formatContributorRoleLabel(user.role, isServerAdmin)
      : 'Public Open Access';
  const affiliationDisplay =
    isLoggedIn && user?.institution
      ? user.institution
      : isLoggedIn && user?.district
        ? `${user.district} District`
        : isLoggedIn
          ? 'Independent Contributor'
          : 'Kashmir Scientific Consortium';

  return (
    <div
      className="fixed inset-x-0 top-0 h-dvh z-[70] bg-black/70 sm:bg-transparent flex flex-col justify-end sm:static sm:h-auto sm:z-[110] sm:block"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        id="kew-control-center-panel"
        data-kew-dark-surface="true"
        role="dialog"
        aria-modal="false"
        aria-label="KEW Control Center"
        onClick={(e) => e.stopPropagation()}
        style={
          geometry
            ? {
                width: `${geometry.widthPx}px`,
                maxWidth: 'calc(100vw - 1.5rem)',
                right: `${geometry.rightOffsetPx}px`,
                maxHeight: `${geometry.maxHeightPx}px`,
              }
            : undefined
        }
        className="kew-menu-surface kew-functional-overlay w-full max-h-[88dvh] rounded-t-3xl sm:rounded-2xl sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-[420px] sm:max-w-[calc(100vw-1.5rem)] sm:max-h-[min(620px,calc(100dvh-5.5rem))] border-t sm:border overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Mobile Grab Handle */}
        <div className="kew-menu-top-header sm:hidden flex justify-center pt-2.5 pb-0.5 shrink-0">
          <span className="w-10 h-1 rounded-full bg-slate-500/40" aria-hidden="true" />
        </div>

        {/* =============================================================== */}
        {/* UNIFIED CONTROL CENTER HEADER                                   */}
        {/* =============================================================== */}
        <div className="kew-menu-top-header px-4 pt-3.5 pb-3 border-b shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0 overflow-hidden">
                {showUserPhoto ? (
                  <img
                    src={user!.avatar!}
                    alt={user!.name}
                    onError={() => setAvatarLoadFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : isLoggedIn && user ? (
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                ) : (
                  <User className="w-5 h-5 text-emerald-400" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="kew-menu-accent-text text-[10px] font-bold uppercase tracking-[0.14em]">
                    KEW Control Center
                  </span>
                </div>
                <h3 className="kew-menu-title text-sm font-bold leading-tight truncate mt-0.5">
                  {isLoggedIn && user ? user.name : 'Guest Observer'}
                </h3>
                <p className="kew-menu-desc text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span data-testid="cc-role-label" className="truncate">
                    {roleDesignation}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="kew-menu-ghost-btn p-1.5 rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Close KEW Control Center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Segmented 3-Tab Switcher */}
          <div
            role="tablist"
            aria-label="KEW Control Center tabs"
            className="kew-menu-tablist grid grid-cols-3 gap-1 mt-3 p-1 rounded-xl border"
          >
            <button
              ref={(el) => {
                tabButtonRefs.current.account = el;
              }}
              id="kew-cc-tab-account"
              type="button"
              role="tab"
              aria-selected={activeTab === 'account'}
              aria-controls="kew-cc-panel-account"
              tabIndex={activeTab === 'account' ? 0 : -1}
              onClick={() => selectTab('account')}
              onKeyDown={(e) => handleTabKeyDown(e, 'account')}
              className={`kew-menu-tab flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'account' ? 'kew-menu-tab--active' : ''
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span>Account</span>
            </button>

            <button
              ref={(el) => {
                tabButtonRefs.current.alerts = el;
              }}
              id="kew-cc-tab-alerts"
              type="button"
              role="tab"
              aria-selected={activeTab === 'alerts'}
              aria-controls="kew-cc-panel-alerts"
              tabIndex={activeTab === 'alerts' ? 0 : -1}
              onClick={() => selectTab('alerts')}
              onKeyDown={(e) => handleTabKeyDown(e, 'alerts')}
              className={`kew-menu-tab flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'alerts' ? 'kew-menu-tab--active' : ''
              }`}
            >
              <Bell className="w-3.5 h-3.5 shrink-0" />
              <span>Alerts</span>
              {unreadCount > 0 && (
                <span
                  className={`min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold inline-flex items-center justify-center leading-none ${
                    unreadCriticalCount > 0
                      ? 'kew-menu-badge-critical bg-rose-600 text-white'
                      : 'kew-menu-badge-amber bg-amber-500 text-slate-950'
                  }`}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <button
              ref={(el) => {
                tabButtonRefs.current.preferences = el;
              }}
              id="kew-cc-tab-preferences"
              type="button"
              role="tab"
              aria-selected={activeTab === 'preferences'}
              aria-controls="kew-cc-panel-preferences"
              tabIndex={activeTab === 'preferences' ? 0 : -1}
              onClick={() => selectTab('preferences')}
              onKeyDown={(e) => handleTabKeyDown(e, 'preferences')}
              className={`kew-menu-tab flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'preferences' ? 'kew-menu-tab--active' : ''
              }`}
            >
              <Settings className="w-3.5 h-3.5 shrink-0" />
              <span>Preferences</span>
            </button>
          </div>
        </div>

        {/* =============================================================== */}
        {/* TAB 1: ACCOUNT                                                  */}
        {/* =============================================================== */}
        {activeTab === 'account' && (
          <div
            id="kew-cc-panel-account"
            role="tabpanel"
            aria-labelledby="kew-cc-tab-account"
            className="flex-1 min-h-0 flex flex-col"
          >
            <div className="kew-menu-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 space-y-2 text-xs">
              {/* Affiliation Card */}
              <div className="kew-menu-subcard p-2.5 rounded-xl border flex items-center justify-between text-[11px]">
                <span className="kew-menu-desc">Affiliation</span>
                <span className="kew-menu-title font-semibold truncate ml-2">
                  {affiliationDisplay}
                </span>
              </div>

              {/* Signed-Out Quick Auth Banner */}
              {!isLoggedIn && (
                <div className="kew-menu-subcard p-3 rounded-xl border space-y-2.5">
                  <p className="kew-menu-desc text-[11px] leading-relaxed">
                    Sign in with Google or contributor credentials to synchronize field telemetry,
                    verified observations, and dataset submissions.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openAuthModal('signin');
                      }}
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        openAuthModal('signup');
                      }}
                      className="kew-menu-option-btn py-2 px-3 rounded-xl border font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Join KEW</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Links */}
              <div className="space-y-1 pt-0.5">
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="kew-menu-item kew-menu-item--card kew-menu-item--active items-center gap-2.5"
                >
                  <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="kew-menu-item-title font-bold leading-none">
                      My Contributor Dashboard
                    </p>
                    <p className="kew-menu-item-desc text-[10px] mt-1">
                      Telemetry, submissions &amp; alerts
                    </p>
                  </div>
                </Link>

                {isServerAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={onClose}
                    data-testid="cc-admin-command-link"
                    className="kew-menu-item kew-menu-item--card items-center gap-2.5"
                  >
                    <Shield className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <p className="kew-menu-item-title font-bold leading-none">
                        Admin Command Center
                      </p>
                      <p className="kew-menu-item-desc text-[10px] mt-1">
                        Authorized administrative access only
                      </p>
                    </div>
                  </Link>
                )}

                <Link
                  href="/contribute-data"
                  onClick={onClose}
                  className="kew-menu-item kew-menu-item--card items-center gap-2.5"
                >
                  <Upload className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="kew-menu-item-title font-semibold leading-none">
                      Deposit Research Data
                    </p>
                    <p className="kew-menu-item-desc text-[10px] mt-1">
                      Upload surveys, telemetry or GIS layers
                    </p>
                  </div>
                </Link>

                <Link
                  href="/submit-observation"
                  onClick={onClose}
                  className="kew-menu-item kew-menu-item--card items-center gap-2.5"
                >
                  <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <p className="kew-menu-item-title font-semibold leading-none">
                      Submit Field Observation
                    </p>
                    <p className="kew-menu-item-desc text-[10px] mt-1">
                      Wildlife sightings with 5km masking
                    </p>
                  </div>
                </Link>

                <Link
                  href="/citizen-science"
                  onClick={onClose}
                  className="kew-menu-item kew-menu-item--card items-center gap-2.5"
                >
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <p className="kew-menu-item-title font-semibold leading-none">
                      Citizen Science Grid
                    </p>
                    <p className="kew-menu-item-desc text-[10px] mt-1">
                      District volunteer verification network
                    </p>
                  </div>
                </Link>

                <Link
                  href="/about/founder"
                  onClick={onClose}
                  className="kew-menu-item kew-menu-item--card items-center gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <p className="kew-menu-item-title font-semibold leading-none">
                      Institutional Leadership
                    </p>
                    <p className="kew-menu-item-desc text-[10px] mt-1">
                      Governance, stewardship &amp; research record
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Account Footer */}
            <div className="kew-menu-footer px-4 py-3 border-t flex items-center justify-between text-xs shrink-0">
              <span className="kew-menu-desc text-[11px]">
                {isLoggedIn ? 'Authenticated Contributor' : 'Guest Mode · Open Access'}
              </span>
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className="text-white inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-[11px] font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openAuthModal('signin');
                  }}
                  className="text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-[11px] font-semibold cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Join</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 2: ALERTS                                                   */}
        {/* =============================================================== */}
        {activeTab === 'alerts' && (
          <div
            id="kew-cc-panel-alerts"
            role="tabpanel"
            aria-labelledby="kew-cc-tab-alerts"
            className="flex-1 min-h-0 flex flex-col"
          >
            {/* Alerts Status & Actions Bar */}
            <div className="kew-menu-subbar px-4 py-2.5 border-b flex items-center justify-between gap-2 shrink-0">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="kew-menu-title text-xs font-bold">Live Alert Stream</span>
                  {isLive ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                      LIVE API
                    </span>
                  ) : (
                    <span className="kew-menu-subcard text-[10px] font-medium px-1.5 py-0.5 rounded border">
                      CACHED
                    </span>
                  )}
                </div>
                <p className="kew-menu-desc text-[11px] mt-0.5">
                  {unreadCount > 0
                    ? `${unreadCount} unread environmental alerts`
                    : 'All alerts up to date'}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isLoading}
                  className="kew-menu-ghost-btn p-1.5 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                  title="Refresh live telemetry APIs"
                  aria-label="Refresh live telemetry"
                >
                  <RotateCw
                    className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`}
                  />
                </button>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    data-testid="alerts-mark-all-btn"
                    onClick={markAllAsRead}
                    className="kew-menu-ghost-btn text-[11px] font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Real-Time Telemetry Sources Banner */}
            <div className="kew-menu-subbar px-4 py-2 border-b flex items-center justify-between gap-2 text-[11px] shrink-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="kew-menu-title truncate">
                  Real-time feeds: <strong>Open-Meteo CAMS</strong>, <strong>GloFAS</strong> &amp;{' '}
                  <strong>USGS</strong>
                </span>
              </div>
              <span className="kew-menu-desc font-mono text-[10px] shrink-0">
                {lastUpdated
                  ? new Date(lastUpdated).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Live'}
              </span>
            </div>

            {/* Alert Filter Pills */}
            <div className="kew-menu-subbar px-4 py-2 border-b flex items-center gap-2 text-xs shrink-0">
              {(['all', 'unread', 'critical'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  data-testid={`alerts-filter-${tab}`}
                  onClick={() => setAlertFilter(tab)}
                  className={`kew-menu-tab px-2.5 py-1 rounded-lg font-medium capitalize transition-colors cursor-pointer ${
                    alertFilter === tab ? 'kew-menu-tab--active' : ''
                  }`}
                >
                  {tab}
                  {tab === 'unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}
                </button>
              ))}
            </div>

            {/* Scrollable Alert List */}
            <div className="kew-menu-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain divide-y divide-[var(--kew-menu-border)]">
              {filteredAlerts.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <Shield className="w-8 h-8 mx-auto text-emerald-400/60" />
                  <p className="kew-menu-title text-xs font-medium">
                    No alerts matching this filter
                  </p>
                  <p className="kew-menu-desc text-[11px]">
                    All regional hazard telemetry streams are currently nominal.
                  </p>
                </div>
              ) : (
                filteredAlerts.map((alert) => {
                  const isRead = readAlertIds.has(alert.id);
                  const IconComponent = getCategoryIcon(alert.category);
                  return (
                    <div
                      key={alert.id}
                      className={`kew-menu-item p-3.5 flex gap-3 items-start relative ${
                        !isRead ? 'kew-menu-item--active' : ''
                      }`}
                    >
                      {!isRead && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 absolute left-2 top-4 shadow-sm shadow-emerald-400" />
                      )}
                      <div
                        className={`p-2 rounded-xl shrink-0 mt-0.5 border ${getSeverityBadge(
                          alert.severity
                        )}`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="kew-menu-subcard text-[10px] font-mono px-2 py-0.5 rounded border shrink-0">
                              {alert.district}
                            </span>
                            {alert.id.startsWith('live-') && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                                LIVE SENSOR
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${getSeverityBadge(
                              alert.severity
                            )}`}
                          >
                            {alert.severity}
                          </span>
                        </div>

                        <h4 className="kew-menu-item-title text-xs font-bold leading-snug line-clamp-1 mb-1">
                          {alert.title}
                        </h4>
                        <p className="kew-menu-item-desc text-[11px] leading-relaxed line-clamp-2 mb-2">
                          {alert.summary}
                        </p>

                        <div className="flex items-center justify-between text-[11px]">
                          <span className="kew-menu-desc font-mono text-[10px] truncate max-w-[175px]">
                            {alert.issuedBy}
                          </span>
                          <div className="flex items-center gap-3 shrink-0">
                            <Link
                              href={alert.relatedModulePath}
                              onClick={() => {
                                markAsRead(alert.id);
                                onClose();
                              }}
                              className="kew-menu-accent-text hover:underline font-semibold inline-flex items-center gap-1"
                            >
                              <span>View</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                            {!isRead && (
                              <button
                                type="button"
                                data-testid="alerts-dismiss-btn"
                                onClick={() => markAsRead(alert.id)}
                                className="kew-menu-ghost-btn px-1.5 py-0.5 rounded text-[10px] cursor-pointer"
                                title="Mark read"
                              >
                                Dismiss
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Alerts Footer */}
            <div className="kew-menu-footer px-4 py-3 border-t flex items-center justify-between text-xs shrink-0">
              <Link
                href="/alerts"
                onClick={onClose}
                className="kew-menu-accent-text hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Open Full Alert Observatory</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                data-testid="alerts-reset-btn"
                onClick={resetReadHistory}
                className="kew-menu-ghost-btn px-2 py-0.5 rounded text-[11px] cursor-pointer"
              >
                Reset History
              </button>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* TAB 3: PREFERENCES                                              */}
        {/* =============================================================== */}
        {activeTab === 'preferences' && (
          <div
            id="kew-cc-panel-preferences"
            role="tabpanel"
            aria-labelledby="kew-cc-tab-preferences"
            className="flex-1 min-h-0 flex flex-col"
          >
            {/* Preferences Subheader */}
            <div className="kew-menu-subbar px-4 py-2.5 border-b flex items-center justify-between shrink-0">
              <div>
                <span className="kew-menu-title text-xs font-bold block">Platform Preferences</span>
                <span className="kew-menu-desc text-[11px]">
                  Personalized telemetry &amp; interface controls
                </span>
              </div>
              {savedNotification && (
                <span className="kew-menu-accent-text text-[10px] flex items-center gap-1 font-mono font-bold">
                  <Check className="w-3 h-3" /> SAVED
                </span>
              )}
            </div>

            {/* Scrollable Settings Sections */}
            <div className="kew-menu-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4 divide-y divide-[var(--kew-menu-border)] text-xs">
              {/* Measurement Units */}
              <div className="space-y-2 first:pt-0">
                <div className="flex items-center justify-between">
                  <span className="kew-menu-title font-bold flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-sky-400" />
                    Measurement Units
                  </span>
                  <span className="kew-menu-desc text-[10px] font-mono">Telemetry</span>
                </div>
                <p className="kew-menu-desc text-[11px]">
                  Choose display format for temperatures, elevation, and river discharge.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: 'metric', label: 'Metric (°C, m, m³/s)' },
                      { id: 'imperial', label: 'Imperial (°F, ft, cfs)' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateSetting('units', opt.id)}
                      className={`kew-menu-option-btn py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        settings.units === opt.id ? 'kew-menu-option-btn--selected' : ''
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Telemetry Polling Rate */}
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <span className="kew-menu-title font-bold flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                    Telemetry Polling Rate
                  </span>
                  <span className="kew-menu-desc text-[10px] font-mono">Sensors</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: '30s', label: 'Live (30s)' },
                      { id: '5m', label: '5 Min' },
                      { id: 'manual', label: 'Manual' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateSetting('refreshRate', opt.id)}
                      className={`kew-menu-option-btn py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        settings.refreshRate === opt.id ? 'kew-menu-option-btn--selected' : ''
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default Map Canvas */}
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between">
                  <span className="kew-menu-title font-bold flex items-center gap-1.5">
                    <Map className="w-3.5 h-3.5 text-amber-400" />
                    Default Map Canvas
                  </span>
                  <span className="kew-menu-desc text-[10px] font-mono">Atlas</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'dark', label: 'Dark Canvas' },
                      { id: 'satellite', label: 'Satellite' },
                      { id: 'topo', label: 'Topography' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateSetting('defaultBasemap', opt.id)}
                      className={`kew-menu-option-btn py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        settings.defaultBasemap === opt.id ? 'kew-menu-option-btn--selected' : ''
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessibility & Display */}
              <div className="space-y-3 pt-4">
                <span className="kew-menu-title font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  Accessibility &amp; Display
                </span>

                <div className="space-y-1.5">
                  <p className="kew-menu-title text-[11px] font-semibold">Color Theme Mode</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'dark', label: 'Dark' },
                        { id: 'light', label: 'Light' },
                        { id: 'system', label: 'System' },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateSetting('themeMode', opt.id)}
                        className={`kew-menu-option-btn py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                          settings.themeMode === opt.id ? 'kew-menu-option-btn--selected' : ''
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast Toggle */}
                <div className="kew-menu-subcard flex items-center justify-between p-2.5 rounded-xl border">
                  <div>
                    <p className="kew-menu-title font-semibold leading-tight">
                      High Contrast Grayscale
                    </p>
                    <p className="kew-menu-desc text-[10px]">
                      Boosts border and text visibility for field use
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.highContrast}
                    aria-label="Toggle High Contrast Grayscale"
                    onClick={() => updateSetting('highContrast', !settings.highContrast)}
                    className={`w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                      settings.highContrast ? 'bg-purple-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.highContrast ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Reduced Motion Toggle */}
                <div className="kew-menu-subcard flex items-center justify-between p-2.5 rounded-xl border">
                  <div>
                    <p className="kew-menu-title font-semibold leading-tight">Reduce Motion</p>
                    <p className="kew-menu-desc text-[10px]">
                      Minimizes spring animations and transitions
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.reducedMotion}
                    aria-label="Toggle Reduce Motion"
                    onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                    className={`w-10 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                      settings.reducedMotion ? 'bg-purple-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.reducedMotion ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences Footer */}
            <div className="kew-menu-footer px-4 py-3 border-t flex items-center justify-between text-xs shrink-0">
              <span className="kew-menu-desc text-[11px]">Persisted locally in browser</span>
              <button
                type="button"
                onClick={resetDefaults}
                className="kew-menu-ghost-btn px-2 py-0.5 rounded inline-flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
