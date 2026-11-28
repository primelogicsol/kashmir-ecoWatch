'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertItem, getActiveAlerts } from '@/data/alert-registry';

const READ_STORAGE_KEY = 'kew_read_notifications';
const SESSION_ALERTS_CACHE_KEY = 'kew_live_alerts_singleton_v2';
const REFRESH_INTERVAL_MS = 90_000;

interface LiveAlertsSingletonState {
  alerts: AlertItem[];
  isLoading: boolean;
  isLive: boolean;
  hasSynced: boolean;
  lastUpdated: string | null;
  readAlertIds: Set<string>;
}

function filterActiveAlerts(list: AlertItem[]): AlertItem[] {
  return list.filter((a) => a && (a.status === 'active' || a.status === 'monitoring'));
}

// Module-level singleton state shared across PremiumStickyHeader, MobileQuickTelemetryBar,
// NotificationDropdown, and AlertResponseSystem so alert counts are 100% identical across all routes.
const singletonState: LiveAlertsSingletonState = {
  alerts: filterActiveAlerts(getActiveAlerts()),
  isLoading: false,
  isLive: false,
  hasSynced: false,
  lastUpdated: null,
  readAlertIds: new Set<string>(),
};

let inFlightPromise: Promise<void> | null = null;
let lastFetchedMs = 0;
let pollingTimer: ReturnType<typeof setInterval> | null = null;
let storageHydrated = false;
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((fn) => fn());
}

function hydrateFromBrowserStorageOnce() {
  if (storageHydrated || typeof window === 'undefined') return;
  storageHydrated = true;

  try {
    const storedRead = window.localStorage.getItem(READ_STORAGE_KEY);
    if (storedRead) {
      const parsed = JSON.parse(storedRead);
      if (Array.isArray(parsed)) {
        singletonState.readAlertIds = new Set(parsed);
      }
    }
  } catch {
    // Ignore malformed localStorage
  }

  try {
    const cachedSession = window.sessionStorage.getItem(SESSION_ALERTS_CACHE_KEY);
    if (cachedSession) {
      const parsed = JSON.parse(cachedSession);
      if (
        parsed &&
        Array.isArray(parsed.alerts) &&
        parsed.alerts.length > 0 &&
        typeof parsed.cachedAt === 'number' &&
        Date.now() - parsed.cachedAt < REFRESH_INTERVAL_MS
      ) {
        singletonState.alerts = filterActiveAlerts(parsed.alerts);
        singletonState.isLive = Boolean(parsed.isLive);
        singletonState.lastUpdated = parsed.lastUpdated || null;
        singletonState.hasSynced = true;
        singletonState.isLoading = false;
        lastFetchedMs = parsed.cachedAt;
      }
    }
  } catch {
    // Ignore sessionStorage errors
  }
}

async function syncSingletonAlerts(force = false): Promise<void> {
  if (typeof window === 'undefined') return;
  hydrateFromBrowserStorageOnce();

  const now = Date.now();
  if (!force && singletonState.hasSynced && now - lastFetchedMs < REFRESH_INTERVAL_MS) {
    return;
  }

  if (inFlightPromise) {
    return inFlightPromise;
  }

  singletonState.isLoading = true;
  notifySubscribers();

  inFlightPromise = (async () => {
    try {
      const res = await fetch('/api/alerts/live');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.alerts) && data.alerts.length > 0) {
          const activeList = filterActiveAlerts(data.alerts);
          singletonState.alerts = activeList;
          singletonState.isLive = data.source === 'live-api';
          singletonState.lastUpdated = data.fetchedAt || new Date().toISOString();
          singletonState.hasSynced = true;
          lastFetchedMs = Date.now();

          try {
            window.sessionStorage.setItem(
              SESSION_ALERTS_CACHE_KEY,
              JSON.stringify({
                alerts: activeList,
                isLive: singletonState.isLive,
                lastUpdated: singletonState.lastUpdated,
                cachedAt: lastFetchedMs,
              })
            );
          } catch {
            // Ignore sessionStorage quota errors
          }
        }
      }
    } catch {
      singletonState.hasSynced = true;
    } finally {
      singletonState.hasSynced = true;
      singletonState.isLoading = false;
      inFlightPromise = null;
      notifySubscribers();
    }
  })();

  return inFlightPromise;
}

function syncReadIdsFromStorage() {
  if (typeof window === 'undefined') return;
  try {
    const stored = window.localStorage.getItem(READ_STORAGE_KEY);
    singletonState.readAlertIds = stored ? new Set(JSON.parse(stored)) : new Set();
    notifySubscribers();
  } catch {
    // Ignore
  }
}

export function useLiveAlerts(initialAlerts?: AlertItem[]) {
  const [, setTick] = useState(0);

  useEffect(() => {
    hydrateFromBrowserStorageOnce();
    const rerender = () => setTick((n) => n + 1);
    subscribers.add(rerender);

    if (!singletonState.hasSynced || Date.now() - lastFetchedMs >= REFRESH_INTERVAL_MS) {
      void syncSingletonAlerts(false);
    } else {
      rerender();
    }

    if (!pollingTimer && subscribers.size > 0) {
      pollingTimer = setInterval(() => {
        void syncSingletonAlerts(true);
      }, REFRESH_INTERVAL_MS);
    }

    window.addEventListener('storage', syncReadIdsFromStorage);
    window.addEventListener('kew_alerts_updated', syncReadIdsFromStorage);

    return () => {
      subscribers.delete(rerender);
      window.removeEventListener('storage', syncReadIdsFromStorage);
      window.removeEventListener('kew_alerts_updated', syncReadIdsFromStorage);
      if (subscribers.size === 0 && pollingTimer) {
        clearInterval(pollingTimer);
        pollingTimer = null;
      }
    };
  }, []);

  const refetch = useCallback(async () => {
    await syncSingletonAlerts(true);
  }, []);

  const markAsRead = useCallback((id: string) => {
    const updated = new Set(singletonState.readAlertIds).add(id);
    singletonState.readAlertIds = updated;
    notifySubscribers();
    try {
      window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(Array.from(updated)));
      window.dispatchEvent(new Event('kew_alerts_updated'));
    } catch {
      // Ignore storage error
    }
  }, []);

  const markAllAsRead = useCallback(() => {
    const allIds = new Set(singletonState.alerts.map((a) => a.id));
    singletonState.readAlertIds = allIds;
    notifySubscribers();
    try {
      window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(Array.from(allIds)));
      window.dispatchEvent(new Event('kew_alerts_updated'));
    } catch {
      // Ignore storage error
    }
  }, []);

  const dismissAlert = useCallback(
    (id: string) => {
      markAsRead(id);
    },
    [markAsRead]
  );

  const resetReadHistory = useCallback(() => {
    singletonState.readAlertIds = new Set();
    notifySubscribers();
    try {
      window.localStorage.removeItem(READ_STORAGE_KEY);
      window.dispatchEvent(new Event('kew_alerts_updated'));
    } catch {
      // Ignore storage error
    }
  }, []);

  const activeAlerts =
    !singletonState.hasSynced && initialAlerts && initialAlerts.length > 0
      ? filterActiveAlerts(initialAlerts)
      : filterActiveAlerts(singletonState.alerts);
  const unreadAlerts = singletonState.hasSynced
    ? activeAlerts.filter((a) => !singletonState.readAlertIds.has(a.id))
    : [];
  const unreadCount = unreadAlerts.length;
  const unreadCriticalCount = unreadAlerts.filter(
    (a) => a.severity === 'critical' || a.severity === 'high'
  ).length;

  return {
    alerts: activeAlerts,
    isLoading: singletonState.isLoading,
    isLive: singletonState.isLive,
    lastUpdated: singletonState.lastUpdated,
    readAlertIds: singletonState.readAlertIds,
    unreadCount,
    unreadCriticalCount,
    refetch,
    markAsRead,
    markAllAsRead,
    dismissAlert,
    resetReadHistory,
  };
}
