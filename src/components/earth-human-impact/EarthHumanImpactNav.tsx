'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Globe2, 
  LayoutDashboard, 
  Map, 
  Activity, 
  CheckCircle2, 
  FileText, 
  CloudSun, 
  Trees, 
  Mountain, 
  Zap, 
  Pickaxe, 
  Building2,
  Droplets,
  Waves,
  Radar,
  Satellite,
  Clock,
  ShieldCheck,
  BellRing,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function EarthHumanImpactNav() {
  const pathname = usePathname();

  const observatoryLinks = [
    { label: 'EHII Hub', href: '/earth-human-impact', icon: Globe2 },
    { label: 'Satellite Observatory', href: '/earth-human-impact/change-detection-observatory', icon: Satellite, highlight: true },
    { label: 'Live Monitoring', href: '/earth-human-impact/change-detection-observatory/live-monitoring', icon: Radar },
    { label: 'Historical Comparison', href: '/earth-human-impact/change-detection-observatory/historical-comparison', icon: Clock },
    { label: 'Change Atlas', href: '/earth-human-impact/change-detection-observatory/change-detection-atlas', icon: Map },
    { label: 'Detection Alerts', href: '/earth-human-impact/change-detection-observatory/detection-alerts', icon: BellRing },
    { label: 'Verification Queue', href: '/earth-human-impact/change-detection-observatory/verification-queue', icon: ShieldCheck },
    { label: 'Loss & Recovery Ledger', href: '/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger', icon: BookOpen },
    { label: 'Dossiers', href: '/earth-human-impact/change-detection-observatory/scientific-dossiers', icon: FileText },
  ];

  const submoduleLinks = [
    { label: 'Climate & Atmosphere', href: '/earth-human-impact/climate-atmosphere', icon: CloudSun, color: 'text-sky-400' },
    { label: 'Forest & Landscape', href: '/earth-human-impact/forests-landscapes', icon: Trees, color: 'text-emerald-400' },
    { label: 'Land Use & Earth Systems', href: '/earth-human-impact/land-earth-systems', icon: Mountain, color: 'text-amber-400' },
    { label: 'Aquatic & Cryosphere', href: '/earth-human-impact/aquatic-cryosphere', icon: Droplets, color: 'text-cyan-400' },
    { label: 'Energy & Infrastructure', href: '/earth-human-impact/energy-infrastructure', icon: Zap, color: 'text-yellow-400' },
    { label: 'Mining & Extraction', href: '/earth-human-impact/mining-extraction', icon: Pickaxe, color: 'text-orange-400' },
    { label: 'Urban Ecology', href: '/earth-human-impact/urban-ecology', icon: Building2, color: 'text-purple-400' },
    { label: 'Cumulative Impact', href: '/earth-human-impact/cumulative-impact', icon: Activity, color: 'text-rose-400' },
    { label: 'Restoration', href: '/earth-human-impact/environmental-restoration', icon: CheckCircle2, color: 'text-teal-400' },
    { label: 'Methodology & Data', href: '/earth-human-impact/methodology-data-sources', icon: FileText, color: 'text-cyan-400' },
  ];

  const aquaticLinks = [
    { label: 'Aquatic Overview', href: '/earth-human-impact/aquatic-cryosphere' },
    { label: '01 Lake Encroachment', href: '/earth-human-impact/aquatic-cryosphere/lake-encroachment' },
    { label: '02 Wetland Habitat Loss', href: '/earth-human-impact/aquatic-cryosphere/wetland-encroachment' },
    { label: '03 Glacier Recession', href: '/earth-human-impact/aquatic-cryosphere/glacier-recession' },
    { label: '04 River Corridor', href: '/earth-human-impact/aquatic-cryosphere/river-corridor-change' },
    { label: '05 Springs & Groundwater', href: '/earth-human-impact/aquatic-cryosphere/springs-groundwater' },
    { label: 'Watershed Cumulative', href: '/earth-human-impact/aquatic-cryosphere/watershed-cumulative-impact' },
    { label: 'Loss & Recovery Ledger (1985–2026)', href: '/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger' },
  ];

  const isAquaticSection = pathname.startsWith('/earth-human-impact/aquatic-cryosphere');

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border-b border-white/10 sticky top-16 md:top-[72px] z-40 shadow-md">
      <div className="page-content__inner py-2 space-y-1.5">
        {/* Tier 1: Spaceborne Observatory Pipeline Links */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 mr-2 shrink-0 flex items-center gap-1">
            <Satellite className="w-3.5 h-3.5 animate-pulse" />
            Observatory Core:
          </span>
          {observatoryLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap text-xs',
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm font-semibold'
                    : link.highlight
                    ? 'bg-white/10 text-teal-300 hover:text-white hover:bg-teal-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-teal-400' : 'text-slate-400')} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Tier 2: The Seven Systems & Supporting Analytics */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 border-t border-white/5 text-[11px]">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mr-1 shrink-0">
            7 Systems:
          </span>
          {submoduleLinks.map((s) => {
            const Icon = s.icon;
            const isActive = pathname === s.href;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={cn(
                  'flex items-center gap-1 px-2 py-0.5 rounded transition-all whitespace-nowrap',
                  isActive
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className={cn('w-3 h-3', s.color)} />
                <span>{s.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Tier 3: Aquatic, Wetland & Cryosphere Change Systems (Contextual sub-tier) */}
        {isAquaticSection && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 border-t border-cyan-500/20 text-[11px] bg-cyan-950/20 -mx-4 px-4 py-1 rounded-b">
            <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 mr-1 shrink-0 flex items-center gap-1">
              <Droplets className="w-3 h-3 text-cyan-400" />
              Aquatic Subsystems:
            </span>
            {aquaticLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-2 py-0.5 rounded transition-all whitespace-nowrap text-[11px]',
                    isActive
                      ? 'bg-cyan-500/25 text-cyan-200 font-semibold border border-cyan-500/40'
                      : 'text-cyan-400/80 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
