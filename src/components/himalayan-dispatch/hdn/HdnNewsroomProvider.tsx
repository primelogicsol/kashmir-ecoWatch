'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type {
  HdnAccountRecord,
  HdnNotificationItem,
  HdnPermissionKey,
  HdnRoleDefinition,
  HdnRoleId,
} from '@/types/hdn-newsroom';

interface HdnSessionState {
  loading: boolean;
  authenticated: boolean;
  account: HdnAccountRecord | null;
  permissions: HdnPermissionKey[];
  notifications: HdnNotificationItem[];
  unreadCount: number;
  defaultLandingRoute: string;
  roleDefinitions: Record<HdnRoleId, HdnRoleDefinition> | null;
  uiTheme: 'light' | 'dark';
  toggleUiTheme: () => void;
  hasPerm: (perm: HdnPermissionKey) => boolean;
  refreshSession: () => Promise<void>;
  signIn: (
    email: string,
    passcodeOrAccessCode: string
  ) => Promise<{ ok: boolean; error?: string; defaultLandingRoute?: string }>;
  signOut: () => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
}

const HdnContext = createContext<HdnSessionState | null>(null);

export function HdnNewsroomProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [account, setAccount] = useState<HdnAccountRecord | null>(null);
  const [permissions, setPermissions] = useState<HdnPermissionKey[]>([]);
  const [notifications, setNotifications] = useState<HdnNotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [defaultLandingRoute, setDefaultLandingRoute] = useState('/newsroom');
  const [roleDefinitions, setRoleDefinitions] = useState<Record<
    HdnRoleId,
    HdnRoleDefinition
  > | null>(null);
  const [uiTheme, setUiTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hdn_ui_theme');
      if (saved === 'dark' || saved === 'light') setUiTheme(saved);
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const toggleUiTheme = useCallback(() => {
    setUiTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        window.localStorage.setItem('hdn_ui_theme', next);
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch('/api/himalayan-dispatch/hdn/session', {
        credentials: 'include',
        cache: 'no-store',
      });
      const data = await res.json();
      if (data.roleDefinitions) setRoleDefinitions(data.roleDefinitions);
      if (res.ok && data.authenticated && data.account) {
        setAuthenticated(true);
        setAccount(data.account);
        setPermissions(data.permissions || []);
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadNotificationsCount || 0);
        setDefaultLandingRoute(data.defaultLandingRoute || '/newsroom');
      } else {
        setAuthenticated(false);
        setAccount(null);
        setPermissions([]);
      }
    } catch {
      setAuthenticated(false);
      setAccount(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const hasPerm = useCallback(
    (perm: HdnPermissionKey) => permissions.includes(perm),
    [permissions]
  );

  const signIn = useCallback(
    async (email: string, passcodeOrAccessCode: string) => {
      const res = await fetch('/api/himalayan-dispatch/hdn/session', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passcodeOrAccessCode }),
      });
      const data = await res.json();
      if (!res.ok || !data.authenticated) {
        return { ok: false, error: data.error || 'Invalid newsroom credentials.' };
      }
      await refreshSession();
      return { ok: true, defaultLandingRoute: data.defaultLandingRoute };
    },
    [refreshSession]
  );

  const signOut = useCallback(async () => {
    await Promise.all([
      fetch('/api/himalayan-dispatch/hdn/session', { method: 'DELETE', credentials: 'include' }),
      fetch('/api/himalayan-dispatch/workspace', { method: 'DELETE', credentials: 'include' }),
      fetch('/api/admin/session', { method: 'DELETE', credentials: 'include' }),
    ]).catch(() => null);
    setAuthenticated(false);
    setAccount(null);
    setPermissions([]);
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    await fetch('/api/himalayan-dispatch/hdn/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'mark_notifications_read' }),
    }).catch(() => null);
    setUnreadCount(0);
  }, []);

  return (
    <HdnContext.Provider
      value={{
        loading,
        authenticated,
        account,
        permissions,
        notifications,
        unreadCount,
        defaultLandingRoute,
        roleDefinitions,
        uiTheme,
        toggleUiTheme,
        hasPerm,
        refreshSession,
        signIn,
        signOut,
        markAllNotificationsRead,
      }}
    >
      {children}
    </HdnContext.Provider>
  );
}

export function useHdnSession() {
  const ctx = useContext(HdnContext);
  if (!ctx) {
    throw new Error('useHdnSession must be used inside HdnNewsroomProvider');
  }
  return ctx;
}
