'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  BookOpen, 
  Layers, 
  Activity, 
  GitBranch, 
  TrendingUp, 
  Map, 
  CheckCircle2, 
  FileText, 
  PlusCircle, 
  TreePine, 
  Hammer, 
  Wheat,
  ShieldCheck,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function SectoralEiaNav() {
  const pathname = usePathname();

  const primaryLinks = [
    { label: 'Portal Hub', href: '/sectoral-eia', icon: Layers },
    { label: 'Overview', href: '/sectoral-eia/overview', icon: BookOpen },
    { label: '9-Step Workflow', href: '/sectoral-eia/methodology', icon: GitBranch },
    { label: 'Data Sources & Registry', href: '/sectoral-eia/data-sources', icon: Database },
    { label: 'Cumulative Impact', href: '/sectoral-eia/cumulative-impact', icon: Activity },
    { label: 'Scenario Modeling', href: '/sectoral-eia/scenario-modeling', icon: TrendingUp },
    { label: 'Impact Atlas', href: '/sectoral-eia/impact-atlas', icon: Map },
    { label: 'Mitigation Tracker', href: '/sectoral-eia/mitigation-tracker', icon: CheckCircle2 },
    { label: 'Scientific Reports', href: '/sectoral-eia/reports', icon: FileText },
  ];

  const sectorLinks = [
    { label: 'Tourism EIA', href: '/sectoral-eia/sectors/tourism', icon: Compass, color: 'text-amber-400' },
    { label: 'Horticulture EIA', href: '/sectoral-eia/sectors/horticulture', icon: TreePine, color: 'text-emerald-400' },
    { label: 'Handicrafts EIA', href: '/sectoral-eia/sectors/handicrafts', icon: Hammer, color: 'text-cyan-400' },
    { label: 'Agriculture EIA', href: '/sectoral-eia/sectors/agriculture', icon: Wheat, color: 'text-lime-400' },
  ];

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10 sticky top-16 md:top-[72px] z-40 shadow-md">
      <div className="page-content__inner py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Main Navigation Links */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 text-xs">
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Sector Shortcuts & Submission CTA */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1 lg:pt-0 border-t lg:border-t-0 border-white/5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden xl:inline">Sectors:</span>
            {sectorLinks.map((s) => {
              const Icon = s.icon;
              const isActive = pathname === s.href;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className={cn('w-3 h-3', s.color)} />
                  <span>{s.label}</span>
                </Link>
              );
            })}

            <Link
              href="/sectoral-eia/assessment/new"
              className="ml-auto lg:ml-2 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-md text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Assessment</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
