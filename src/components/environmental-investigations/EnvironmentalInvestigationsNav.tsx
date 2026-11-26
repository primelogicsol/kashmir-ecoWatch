'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Database,
  FileSearch,
  FileText,
  FlaskConical,
  Globe2,
  Landmark,
  Layers,
  Map,
  PlusCircle,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function EnvironmentalInvestigationsNav() {
  const pathname = usePathname();

  const primaryLinks = [
    { label: 'Module Home', href: '/environmental-investigations', icon: FileSearch },
    { label: 'Dashboard', href: '/environmental-investigations/dashboard', icon: BarChart3 },
    { label: 'Reports', href: '/environmental-investigations/reports', icon: FileText },
    { label: 'Economics & Finance', href: '/environmental-investigations/economics', icon: Landmark },
    { label: 'Investigation Domains', href: '/environmental-investigations/domains', icon: Layers },
    { label: 'Scientific Disciplines', href: '/environmental-investigations/disciplines', icon: FlaskConical },
    { label: 'Evidence Registry', href: '/environmental-investigations/evidence', icon: Database },
    { label: 'Investigation Atlas', href: '/environmental-investigations/atlas', icon: Map },
    { label: 'Accountability', href: '/environmental-investigations/accountability', icon: Scale },
    { label: 'Case Studies', href: '/environmental-investigations/precedents', icon: Globe2 },
    { label: 'Recommendations', href: '/environmental-investigations/recommendations', icon: CheckCircle2 },
    { label: 'Methodology', href: '/environmental-investigations/methodology', icon: BookOpen },
  ];

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10 sticky top-16 md:top-[72px] z-40 shadow-md">
      <div className="page-content__inner py-2.5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2.5">
          {/* Primary Module Navigation */}
          <nav
            aria-label="Environmental Investigations Navigation"
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1 text-xs"
          >
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/environmental-investigations'
                  ? pathname === '/environmental-investigations'
                  : pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm font-medium transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                  )}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400/90 shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Identity Pill */}
          <div className="flex items-center justify-between xl:justify-end gap-2 pt-1 xl:pt-0 border-t xl:border-t-0 border-white/5 shrink-0">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 bg-slate-950/70 border border-white/10 rounded-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              KEW-EIAI
            </span>
            <Link
              href="/environmental-investigations/submit"
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap',
                pathname === '/environmental-investigations/submit'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
              )}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Investigation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
