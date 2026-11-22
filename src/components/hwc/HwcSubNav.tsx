'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  FileSpreadsheet,
  Map,
  PawPrint,
  Home,
  TrendingDown,
  AlertOctagon,
  Wrench,
  BookOpen,
  Scale,
  PhoneCall,
  Activity
} from 'lucide-react';

export interface HwcSubNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  shortName?: string;
  badge?: string;
}

export const HWC_SUB_NAV_ITEMS: HwcSubNavItem[] = [
  {
    name: 'Overview Hub',
    shortName: 'Overview',
    href: '/protected-network/human-wildlife-conflict',
    icon: ShieldAlert
  },
  {
    name: 'Emergency Directory',
    shortName: 'Emergency',
    href: '/protected-network/human-wildlife-conflict/emergency-directory',
    icon: PhoneCall,
    badge: 'Directory'
  },
  {
    name: 'Incident Registry',
    shortName: 'Incidents',
    href: '/protected-network/human-wildlife-conflict/incidents',
    icon: FileSpreadsheet,
    badge: 'Registry'
  },
  {
    name: 'Wildlife Mortality',
    shortName: 'Mortality',
    href: '/protected-network/human-wildlife-conflict/wildlife-mortality',
    icon: Activity,
    badge: '20-Year'
  },
  {
    name: 'Conflict Atlas',
    shortName: 'Atlas',
    href: '/protected-network/human-wildlife-conflict/atlas',
    icon: Map,
    badge: 'GIS'
  },
  {
    name: 'Species Profiles',
    shortName: 'Species',
    href: '/protected-network/human-wildlife-conflict/species',
    icon: PawPrint
  },
  {
    name: 'Community Exposure',
    shortName: 'Settlements',
    href: '/protected-network/human-wildlife-conflict/community-exposure',
    icon: Home
  },
  {
    name: 'Conflict Drivers',
    shortName: 'Drivers',
    href: '/protected-network/human-wildlife-conflict/drivers',
    icon: TrendingDown
  },
  {
    name: 'Coexistence Desk',
    shortName: 'Report Desk',
    href: '/protected-network/human-wildlife-conflict/report',
    icon: AlertOctagon,
    badge: 'Action'
  },
  {
    name: 'Mitigation Toolkit',
    shortName: 'Mitigation',
    href: '/protected-network/human-wildlife-conflict/mitigation',
    icon: Wrench
  },
  {
    name: 'Research Archive',
    shortName: 'Research',
    href: '/protected-network/human-wildlife-conflict/research',
    icon: BookOpen
  },
  {
    name: 'Methodology',
    shortName: 'Methods',
    href: '/protected-network/human-wildlife-conflict/methodology',
    icon: Scale
  }
];

interface HwcSubNavProps {
  className?: string;
}

export function HwcSubNav({ className = '' }: HwcSubNavProps) {
  const pathname = usePathname();

  return (
    <div className={`w-full bg-slate-950/90 border-b border-white/10 sticky top-[72px] z-30 backdrop-blur-md ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {HWC_SUB_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden">{item.shortName || item.name}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-[4px] font-mono uppercase tracking-wider ${
                      isActive
                        ? 'bg-emerald-500/30 text-emerald-200'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
