'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  FileCheck2,
  Users,
  BarChart3,
  Building2,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Institution } from '@/data/conference-system';

interface Props {
  institution: Institution;
}

export function InstitutionSubNav({ institution }: Props) {
  const pathname = usePathname();
  const base = `/webinars/institution/${institution.id}`;

  const tabs = [
    { label: 'Workspace Dashboard', href: `${base}/dashboard`, icon: LayoutDashboard },
    { label: 'Hosted Conferences', href: `${base}/conferences`, icon: Layers },
    { label: 'Hosting Applications', href: `${base}/applications`, icon: FileCheck2 },
    { label: 'Faculty & Members', href: `${base}/members`, icon: Users },
    { label: 'Reports & Resource Quotas', href: `${base}/reports`, icon: BarChart3 }
  ];

  return (
    <div className="bg-slate-900/90 border-b border-white/10 backdrop-blur-md sticky top-28 md:top-32 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname.startsWith(tab.href);

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

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              <Building2 className="w-3 h-3" />
              {institution.shortName}
            </span>
            <span className="text-[11px] text-slate-400">Isolated Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
}
