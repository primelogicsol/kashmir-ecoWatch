'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  CalendarCheck,
  Calendar,
  FileCheck2,
  Sliders,
  Video,
  BarChart3,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSubNav() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Admin Command', href: '/webinars/admin', exact: true, icon: ShieldCheck },
    { label: 'Institution Approvals', href: '/webinars/admin/institution-approvals', icon: Building2, badge: '1 Pending' },
    { label: 'Conference Approvals', href: '/webinars/admin/conference-approvals', icon: CalendarCheck, badge: '2 Review' },
    { label: 'Conflict Scheduler', href: '/webinars/admin/conference-scheduler', icon: Calendar },
    { label: 'Abstract Review', href: '/webinars/admin/abstracts-and-review', icon: FileCheck2 },
    { label: 'Tracks & Halls', href: '/webinars/admin/tracks-and-rooms', icon: Sliders },
    { label: 'Live Moderation', href: '/webinars/admin/live-moderation', icon: Video },
    { label: 'Certificates', href: '/webinars/admin/certificates', icon: Award },
    { label: 'Analytics & Quotas', href: '/webinars/admin/analytics', icon: BarChart3 }
  ];

  return (
    <div className="bg-slate-900/90 border-b border-white/10 backdrop-blur-md sticky top-28 md:top-32 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border',
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-amber-400' : 'text-slate-400')} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 border border-amber-500/40">
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-amber-400/90 font-mono shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>KEW SuperAdmin Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
