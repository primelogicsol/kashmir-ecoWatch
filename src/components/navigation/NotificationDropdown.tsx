'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, Check, ExternalLink, AlertTriangle, 
  Droplets, Mountain, Flame, Wind, Activity, X,
  Clock, Shield, ArrowRight
} from 'lucide-react';
import { alertRegistry, AlertItem } from '@/data/alert-registry';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const [readAlertIds, setReadAlertIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  // Load read status from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kew_read_notifications');
      if (stored) {
        setReadAlertIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error('Failed to load read notifications:', e);
    }
  }, []);

  const markAsRead = (id: string) => {
    const updated = new Set(readAlertIds).add(id);
    setReadAlertIds(updated);
    try {
      localStorage.setItem('kew_read_notifications', JSON.stringify(Array.from(updated)));
      window.dispatchEvent(new Event('kew_alerts_updated'));
    } catch (e) {
      console.error('Failed to save read notifications:', e);
    }
  };

  const markAllAsRead = () => {
    const allIds = new Set(alertRegistry.map(a => a.id));
    setReadAlertIds(allIds);
    try {
      localStorage.setItem('kew_read_notifications', JSON.stringify(Array.from(allIds)));
      window.dispatchEvent(new Event('kew_alerts_updated'));
    } catch (e) {
      console.error('Failed to save read notifications:', e);
    }
  };

  const clearAllHistory = () => {
    setReadAlertIds(new Set());
    try {
      localStorage.removeItem('kew_read_notifications');
      window.dispatchEvent(new Event('kew_alerts_updated'));
    } catch (e) {
      console.error('Failed to clear read notifications:', e);
    }
  };

  const unreadCount = alertRegistry.filter(a => !readAlertIds.has(a.id)).length;

  const filteredAlerts = alertRegistry.filter(alert => {
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
      className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-slate-200 animate-in fade-in zoom-in-95 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">Live Alert Stream</h3>
            <p className="text-[11px] text-slate-400">
              {unreadCount > 0 ? `${unreadCount} unread environmental alerts` : 'All alerts up to date'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-1 rounded hover:bg-emerald-500/10 transition-colors"
              title="Mark all as read"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2 bg-slate-950/30 text-xs">
        {(['all', 'unread', 'critical'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-colors ${
              filter === tab
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab} {tab === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5">
        {filteredAlerts.length === 0 ? (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <Shield className="w-8 h-8 mx-auto text-emerald-400/60" />
            <p className="text-xs font-medium text-slate-300">No alerts matching this filter</p>
            <p className="text-[11px]">All regional hazard telemetry streams are currently nominal.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isRead = readAlertIds.has(alert.id);
            const IconComponent = getCategoryIcon(alert.category);
            return (
              <div 
                key={alert.id}
                className={`p-3.5 hover:bg-white/[0.04] transition-colors flex gap-3 items-start relative ${
                  !isRead ? 'bg-emerald-500/[0.03]' : ''
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
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {alert.district}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getSeverityBadge(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-1 mb-1">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-2">
                    {alert.summary}
                  </p>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono text-[10px]">
                      {alert.issuedBy}
                    </span>
                    <div className="flex items-center gap-3">
                      <Link
                        href={alert.relatedModulePath}
                        onClick={() => {
                          markAsRead(alert.id);
                          onClose();
                        }}
                        className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      {!isRead && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="text-slate-400 hover:text-slate-200 text-[10px]"
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
      <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs">
        <Link
          href="/risk-monitoring/live-alerts-advisories"
          onClick={onClose}
          className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
        >
          <span>Open Full Alert Stream</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={clearAllHistory}
          className="text-slate-500 hover:text-slate-300 text-[11px]"
        >
          Reset History
        </button>
      </div>
    </div>
  );
}
