'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  Layers,
  Users,
  Award,
  FileText,
  Clock,
  BookOpen,
  Info,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConferenceDetailed } from '@/data/conference-system';

interface Props {
  conference: ConferenceDetailed;
}

export function ConferenceSubNav({ conference }: Props) {
  const pathname = usePathname();
  const base = `/webinars/conferences/${conference.id}`;

  const tabs = [
    { label: 'Overview', href: base, exact: true, icon: Info },
    { label: 'Program & Agenda', href: `${base}/program`, icon: Calendar },
    { label: 'Parallel Tracks', href: `${base}/tracks`, icon: Layers },
    { label: 'Speakers', href: `${base}/speakers`, icon: Users },
    { label: 'Registration', href: `${base}/registration`, icon: Award },
    { label: 'Abstracts & CFP', href: `${base}/abstracts`, icon: FileText },
    { label: 'All Sessions', href: `${base}/sessions`, icon: Clock },
    { label: 'Proceedings', href: `${base}/proceedings`, icon: BookOpen }
  ];

  return (
    <div className="bg-slate-900/90 border-b border-white/10 backdrop-blur-md sticky top-28 md:top-32 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.exact 
                ? (pathname === tab.href || pathname === `${tab.href}/overview`) 
                : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border',
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-teal-400' : 'text-slate-400')} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>

          {conference.status === 'live' && (
            <Link
              href="/webinars/room/kew-conf-2027-cryo"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shrink-0 shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Enter Live Plenary</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
