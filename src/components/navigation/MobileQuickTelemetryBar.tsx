'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { 
  Map, Wind, AlertTriangle, PlusCircle, Menu, 
  Activity, Bell, Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { alertRegistry } from '@/data/alert-registry';

interface MobileQuickTelemetryBarProps {
  onOpenMenu?: () => void;
}

export function MobileQuickTelemetryBar({ onOpenMenu }: MobileQuickTelemetryBarProps) {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const [unreadAlerts, setUnreadAlerts] = useState<number>(0);
  const isDispatchRoute = Boolean(
    segment === 'himalayan-dispatch' ||
      pathname?.startsWith('/himalayan-dispatch') ||
      pathname?.startsWith('/webinars/room/') ||
      (pathname?.startsWith('/webinars/sessions/') && pathname?.endsWith('/live'))
  );

  useEffect(() => {
    if (isDispatchRoute) return;
    let isMounted = true;
    const checkAlerts = async () => {
      try {
        const stored = localStorage.getItem('kew_read_notifications');
        const readIds = stored ? new Set(JSON.parse(stored)) : new Set();
        const res = await fetch('/api/alerts/live');
        if (res.ok && isMounted) {
          const data = await res.json();
          const list = data.alerts || alertRegistry;
          setUnreadAlerts(list.filter((a: any) => !readIds.has(a.id)).length);
          return;
        }
      } catch {}

      if (isMounted) {
        try {
          const stored = localStorage.getItem('kew_read_notifications');
          const readIds = stored ? new Set(JSON.parse(stored)) : new Set();
          setUnreadAlerts(alertRegistry.filter(a => !readIds.has(a.id)).length);
        } catch {
          setUnreadAlerts(alertRegistry.length);
        }
      }
    };

    checkAlerts();
    window.addEventListener('storage', checkAlerts);
    window.addEventListener('kew_alerts_updated', checkAlerts);
    return () => {
      isMounted = false;
      window.removeEventListener('storage', checkAlerts);
      window.removeEventListener('kew_alerts_updated', checkAlerts);
    };
  }, [isDispatchRoute]);

  if (isDispatchRoute) {
    return null;
  }

  const navButtons = [
    {
      id: 'atlas',
      label: 'GIS Atlas',
      href: '/atlas',
      icon: Map,
      isActive: pathname.startsWith('/atlas') || pathname.startsWith('/protected-network/atlas'),
      badge: null,
      color: 'text-emerald-400',
    },
    {
      id: 'aqi',
      label: 'Live AQI',
      href: '/environmental-monitoring/air-pollution',
      icon: Wind,
      isActive: pathname.includes('air-pollution') || pathname.includes('air-quality'),
      badge: null,
      color: 'text-cyan-400',
    },
    {
      id: 'report',
      label: 'Report Field',
      href: '/submit-observation',
      icon: PlusCircle,
      isActive: pathname.startsWith('/submit-observation') || pathname.startsWith('/report-issue'),
      badge: 'Action',
      color: 'text-emerald-300',
      isProminent: true,
    },
    {
      id: 'alerts',
      label: 'Alerts',
      href: '/risk-monitoring/live-alerts-advisories',
      icon: AlertTriangle,
      isActive: pathname.includes('alerts'),
      badge: unreadAlerts > 0 ? (unreadAlerts > 9 ? '9+' : unreadAlerts) : null,
      color: 'text-amber-400',
    },
    {
      id: 'menu',
      label: 'Explore',
      href: '#menu',
      icon: Compass,
      isActive: false,
      badge: null,
      color: 'text-purple-400',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        // Trigger the mobile menu in the header
        const mobileMenuButton = document.querySelector('button[aria-label="Open mobile navigation menu"]') as HTMLButtonElement | null;
        if (mobileMenuButton) {
          mobileMenuButton.click();
        } else if (onOpenMenu) {
          onOpenMenu();
        } else {
          window.location.href = '/module-directory';
        }
      }
    },
  ];

  return (
    <aside 
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-slate-950/95 border-t border-white/10 backdrop-blur-xl shadow-[0_-8px_24px_rgba(0,0,0,0.6)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      aria-label="Mobile quick telemetry navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navButtons.map((btn) => {
          const Icon = btn.icon;

          if (btn.isProminent) {
            return (
              <Link
                key={btn.id}
                href={btn.href}
                className={cn(
                  "flex flex-col items-center justify-center -mt-4 px-3 py-1 rounded-2xl transition-all duration-200 active:scale-95 group",
                  btn.isActive 
                    ? "bg-gradient-to-b from-emerald-700 to-emerald-900 text-white shadow-lg shadow-emerald-950/80 ring-2 ring-emerald-400/50" 
                    : "bg-gradient-to-b from-emerald-700 to-emerald-900 text-white shadow-lg shadow-emerald-950/60 hover:from-emerald-800 hover:to-emerald-950"
                )}
                aria-label="Submit Citizen Science Field Observation"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15 mb-0.5">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold tracking-tight text-white leading-none">
                  {btn.label}
                </span>
              </Link>
            );
          }

          if (btn.onClick) {
            return (
              <button
                key={btn.id}
                onClick={btn.onClick}
                className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-white transition-colors relative min-w-[56px] min-h-[48px] active:scale-95 cursor-pointer"
                aria-label={btn.label}
              >
                <Icon className={cn("w-5 h-5 mb-1 transition-colors", btn.color)} />
                <span className="text-[10px] font-medium leading-none">
                  {btn.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={btn.id}
              href={btn.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors relative min-w-[56px] min-h-[48px] active:scale-95",
                btn.isActive 
                  ? "text-white bg-white/10 font-bold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
              aria-label={btn.label}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5 mb-1 transition-colors", btn.isActive ? btn.color : "text-slate-400")} />
                {btn.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1 min-w-[16px] h-4 bg-red-600 text-white rounded-[4px] text-[9px] font-black flex items-center justify-center animate-pulse shadow-md shadow-red-500/50">
                    {btn.badge}
                  </span>
                )}
              </div>
              <span className={cn("text-[10px] leading-none", btn.isActive ? "text-white font-semibold" : "text-slate-400")}>
                {btn.label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
