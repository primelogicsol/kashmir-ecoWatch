'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Layers,
  BarChart3,
  MapPin,
  Compass,
  Factory,
  ShoppingBag,
  Trash2,
  Recycle,
  Flame,
  Microscope,
  Waves,
  Mountain,
  PawPrint,
  Scale,
  ShieldCheck,
  FileText,
  Database
} from 'lucide-react';

export interface SubmoduleRoute {
  name: string;
  shortName: string;
  path: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const PLASTIC_POLLUTION_SUBMODULES: SubmoduleRoute[] = [
  // 01 · Monitoring & Intelligence
  {
    name: 'Overview Hub',
    shortName: 'Overview',
    path: '/environmental-monitoring/plastic-pollution',
    category: '01 · Monitoring & Intelligence',
    icon: Layers,
    badge: 'Hub'
  },
  {
    name: 'Dashboards & Trends',
    shortName: 'Dashboards',
    path: '/environmental-monitoring/plastic-pollution/dashboards',
    category: '01 · Monitoring & Intelligence',
    icon: BarChart3,
    badge: 'Analytics'
  },
  {
    name: 'Regional & District Profiles',
    shortName: 'Regional Profiles',
    path: '/environmental-monitoring/plastic-pollution/regional-profiles',
    category: '01 · Monitoring & Intelligence',
    icon: MapPin,
    badge: '42 Dists'
  },
  {
    name: 'Plastic Pollution GIS Atlas',
    shortName: 'GIS Atlas',
    path: '/environmental-monitoring/plastic-pollution/gis-atlas',
    category: '01 · Monitoring & Intelligence',
    icon: Compass,
    badge: 'GIS'
  },

  // 02 · Plastic Lifecycle & Waste Flows
  {
    name: 'Production & Trade',
    shortName: 'Production & Trade',
    path: '/environmental-monitoring/plastic-pollution/production-trade',
    category: '02 · Plastic Lifecycle & Flows',
    icon: Factory,
    badge: 'Flows'
  },
  {
    name: 'Consumption & Usage',
    shortName: 'Consumption',
    path: '/environmental-monitoring/plastic-pollution/consumption',
    category: '02 · Plastic Lifecycle & Flows',
    icon: ShoppingBag,
    badge: 'Demand'
  },
  {
    name: 'Waste Generation',
    shortName: 'Generation',
    path: '/environmental-monitoring/plastic-pollution/waste-generation',
    category: '02 · Plastic Lifecycle & Flows',
    icon: Trash2,
    badge: 'TPD'
  },
  {
    name: 'Collection & Segregation',
    shortName: 'Collection',
    path: '/environmental-monitoring/plastic-pollution/collection-segregation',
    category: '02 · Plastic Lifecycle & Flows',
    icon: Recycle,
    badge: 'MRF'
  },
  {
    name: 'Recycling & Circular Economy',
    shortName: 'Recycling',
    path: '/environmental-monitoring/plastic-pollution/recycling',
    category: '02 · Plastic Lifecycle & Flows',
    icon: Recycle,
    badge: 'Circular'
  },

  // 03 · Environmental Contamination
  {
    name: 'Leakage, Dumping & Burning',
    shortName: 'Leakage & Burning',
    path: '/environmental-monitoring/plastic-pollution/leakage-dumping-burning',
    category: '03 · Environmental Contamination',
    icon: Flame,
    badge: 'Hotspots'
  },
  {
    name: 'Microplastics & Nanoplastics',
    shortName: 'Microplastics',
    path: '/environmental-monitoring/plastic-pollution/microplastics',
    category: '03 · Environmental Contamination',
    icon: Microscope,
    badge: 'FTIR Lab'
  },
  {
    name: 'Rivers, Lakes & Wetlands',
    shortName: 'Aquatic Impact',
    path: '/environmental-monitoring/plastic-pollution/aquatic-contamination',
    category: '03 · Environmental Contamination',
    icon: Waves,
    badge: 'Basins'
  },
  {
    name: 'Tourism & Mountain Plastics',
    shortName: 'Tourism Waste',
    path: '/environmental-monitoring/plastic-pollution/tourism-mountain-waste',
    category: '03 · Environmental Contamination',
    icon: Mountain,
    badge: 'Alpine'
  },
  {
    name: 'Wildlife & Ecological Impacts',
    shortName: 'Wildlife Impacts',
    path: '/environmental-monitoring/plastic-pollution/wildlife-impacts',
    category: '03 · Environmental Contamination',
    icon: PawPrint,
    badge: 'Fauna'
  },

  // 04 · Laws & Environmental Accountability
  {
    name: 'Laws, Bans & Regulations',
    shortName: 'Laws & Bans',
    path: '/environmental-monitoring/plastic-pollution/laws-regulations',
    category: '04 · Laws & Accountability',
    icon: Scale,
    badge: 'Statute'
  },
  {
    name: 'Compliance & Enforcement',
    shortName: 'Enforcement',
    path: '/environmental-monitoring/plastic-pollution/compliance-enforcement',
    category: '04 · Laws & Accountability',
    icon: ShieldCheck,
    badge: 'Audit'
  },

  // 05 · Scientific Research & Evidence
  {
    name: 'Research & Assessments',
    shortName: 'Research Library',
    path: '/environmental-monitoring/plastic-pollution/research',
    category: '05 · Research & Methodology',
    icon: FileText,
    badge: 'Archive'
  },
  {
    name: 'Methodology & Open Data',
    shortName: 'Open Data',
    path: '/environmental-monitoring/plastic-pollution/methodology',
    category: '05 · Research & Methodology',
    icon: Database,
    badge: 'Open Data'
  }
];

interface PlasticPollutionSubNavProps {
  className?: string;
}

export function PlasticPollutionSubNav({ className = '' }: PlasticPollutionSubNavProps) {
  const pathname = usePathname();

  return (
    <div className={`w-full bg-slate-950/90 border-b border-white/10 sticky top-[72px] z-30 backdrop-blur-md ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {PLASTIC_POLLUTION_SUBMODULES.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden">{item.shortName || item.name}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-[4px] font-mono uppercase tracking-wider ${
                      isActive
                        ? 'bg-rose-500/30 text-rose-200'
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
