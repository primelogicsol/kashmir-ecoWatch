'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bell, Check, ExternalLink, AlertTriangle, 
  Droplets, Mountain, Flame, Wind, Activity, X,
  Clock, Shield, ArrowRight, RotateCw, Radio
} from 'lucide-react';
import { AlertItem, AlertCategory } from '@/data/alert-registry';
import { useLiveAlerts } from '@/hooks/useLiveAlerts';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const {
    alerts,
    isLoading,
    isLive,
    lastUpdated,
    readAlertIds,
    unreadCount,
    refetch,
    markAsRead,
    markAllAsRead,
  } = useLiveAlerts();

  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const clearAllHistory = () => {
    try {
      localStorage.removeItem('kew_read_notifications');
      window.dispatchEvent(new Event('kew_alerts_updated'));
      window.location.reload();
    } catch (e) {
      console.error('Failed to clear read notifications:', e);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return !readAlertIds.has(alert.id);
    if (filter === 'critical') return alert.severity === 'high' || alert.severity === 'critical';
    return true;
  });

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'flood': return Droplets;
      case 'landslide': return Mountain;
      case 'fire': return Flame;
      case 'air-quality': return Wind;
      case 'earthquake': return AlertTriangle;
      default: return Activity;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    }
  };

  return (
    <div 
      className="kew-menu-surface kew-functional-overlay absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-[420px] max-w-[420px] rounded-2xl border z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="kew-menu-top-header p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="kew-menu-title text-sm font-bold leading-tight">Live Alert Stream</h3>
              {isLive ? (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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
              {unreadCount > 0 ? `${unreadCount} unread environmental alerts` : 'All alerts up to date'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="kew-menu-ghost-btn p-1.5 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh live telemetry APIs"
            aria-label="Refresh live telemetry"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="kew-menu-accent-text text-[11px] font-semibold px-2 py-1 rounded hover:underline transition-colors"
              title="Mark all as read"
            >
              Mark all read
            </button>
          )}

          <button
            onClick={onClose}
            className="kew-menu-ghost-btn p-1.5 rounded-lg transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Telemetry Info Banner */}
      <div className="kew-menu-subbar px-4 py-2 border-b flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="kew-menu-title">Real-time feeds: <strong>Open-Meteo CAMS</strong>, <strong>GloFAS</strong> &amp; <strong>USGS</strong></span>
        </div>
        <span className="kew-menu-desc font-mono text-[10px]">
          {lastUpdated ? new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live'}
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="kew-menu-subbar px-4 py-2 border-b flex items-center gap-2 text-xs">
        {(['all', 'unread', 'critical'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`kew-menu-tab px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
              filter === tab ? 'kew-menu-tab--active' : ''
            }`}
          >
            {tab} {tab === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="kew-menu-scroll max-h-[min(380px,calc(100dvh-14rem))] overflow-y-auto overscroll-contain divide-y divide-[var(--kew-menu-border)]">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <Shield className="w-8 h-8 mx-auto text-emerald-400/60" />
            <p className="kew-menu-title text-xs font-medium">No alerts matching this filter</p>
            <p className="kew-menu-desc text-[11px]">All regional hazard telemetry streams are currently nominal.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
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
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 border ${getSeverityBadge(alert.severity)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="kew-menu-subcard text-[10px] font-mono px-2 py-0.5 rounded-[4px] border shrink-0">
                        {alert.district}
                      </span>
                      {alert.id.startsWith('live-') && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                          {alert.category === 'earthquake' ? 'USGS CATALOG' : 'MODEL FEED'}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border shrink-0 ${getSeverityBadge(alert.severity)}`}>
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
                    <span className="kew-menu-desc font-mono text-[10px] truncate max-w-[180px]">
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
                          onClick={() => markAsRead(alert.id)}
                          className="kew-menu-ghost-btn px-1.5 py-0.5 rounded text-[10px]"
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

      {/* Footer */}
      <div className="kew-menu-footer p-3 border-t flex items-center justify-between text-xs">
        <Link
          href="/alerts"
          onClick={onClose}
          className="kew-menu-accent-text hover:underline font-semibold inline-flex items-center gap-1"
        >
          <span>Open Full Alert Observatory</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={clearAllHistory}
          className="kew-menu-ghost-btn px-2 py-0.5 rounded text-[11px]"
        >
          Reset History
        </button>
      </div>
    </div>
  );
}
