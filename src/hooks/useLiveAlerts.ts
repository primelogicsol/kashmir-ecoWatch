'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertItem, alertRegistry } from '@/data/alert-registry';

export function useLiveAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>(alertRegistry);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [readAlertIds, setReadAlertIds] = useState<Set<string>>(new Set());

  // Load read status from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kew_read_notifications');
      if (stored) {
        setReadAlertIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error('Failed to load read alerts:', e);
    }
  }, []);

  const fetchLiveAlerts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/alerts/live', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.alerts && data.alerts.length > 0) {
          setAlerts(data.alerts);
          setIsLive(data.source === 'live-api');
          setLastUpdated(data.fetchedAt || new Date().toISOString());
        }
      }
    } catch (err) {
      console.warn('Could not fetch live alerts, using baseline telemetry:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveAlerts();
    // Refresh live telemetry every 90 seconds
    const interval = setInterval(fetchLiveAlerts, 90000);
    return () => clearInterval(interval);
  }, [fetchLiveAlerts]);

  const markAsRead = useCallback((id: string) => {
    setReadAlertIds(prev => {
      const updated = new Set(prev).add(id);
      try {
        localStorage.setItem('kew_read_notifications', JSON.stringify(Array.from(updated)));
        window.dispatchEvent(new Event('kew_alerts_updated'));
      } catch (e) {
        console.error('Failed to save read status:', e);
      }
      return updated;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    const allIds = new Set(alerts.map(a => a.id));
    setReadAlertIds(allIds);
    try {
      localStorage.setItem('kew_read_notifications', JSON.stringify(Array.from(allIds)));
      window.dispatchEvent(new Event('kew_alerts_updated'));
    } catch (e) {
      console.error('Failed to save all read status:', e);
    }
  }, [alerts]);

  const dismissAlert = useCallback((id: string) => {
    markAsRead(id);
  }, [markAsRead]);

  const unreadCount = alerts.filter(a => !readAlertIds.has(a.id)).length;

  return {
    alerts,
    isLoading,
    isLive,
    lastUpdated,
    readAlertIds,
    unreadCount,
    refetch: fetchLiveAlerts,
    markAsRead,
    markAllAsRead,
    dismissAlert
  };
}
