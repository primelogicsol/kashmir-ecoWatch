'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Car,
  BarChart3,
  FileSpreadsheet,
  Fuel,
  Compass,
  Wind,
  Gauge,
  Volume2,
  Layers,
  CloudSun,
  Droplets,
  HeartPulse,
  Bus,
  Zap,
  Flame,
  ShieldCheck,
  Radio,
  BookOpen
} from 'lucide-react';

export interface TransportSubmoduleRoute {
  name: string;
  shortName: string;
  path: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const TRANSPORT_SUBMODULES: TransportSubmoduleRoute[] = [
  // A · TRANSPORT INTELLIGENCE
  {
    name: 'Overview Hub',
    shortName: 'Overview',
    path: '/environmental-monitoring/transportation-pollution',
    category: 'A · Transport Intelligence',
    icon: Car,
    badge: 'Hub',
  },
  {
    name: 'Dashboards & District Scores',
    shortName: 'Dashboards',
    path: '/environmental-monitoring/transportation-pollution/dashboards',
    category: 'A · Transport Intelligence',
    icon: BarChart3,
    badge: 'TPBS',
  },
  {
    name: 'Vehicle Census & Fleet',
    shortName: 'Vehicle Census',
    path: '/environmental-monitoring/transportation-pollution/vehicle-census',
    category: 'A · Transport Intelligence',
    icon: FileSpreadsheet,
    badge: 'VAHAN',
  },
  {
    name: 'Vehicle Types & Fuel',
    shortName: 'Types & Fuel',
    path: '/environmental-monitoring/transportation-pollution/vehicle-types',
    category: 'A · Transport Intelligence',
    icon: Fuel,
    badge: 'EV/Diesel',
  },
  {
    name: 'Transport Pollution GIS Atlas',
    shortName: 'GIS Atlas',
    path: '/environmental-monitoring/transportation-pollution/gis-atlas',
    category: 'A · Transport Intelligence',
    icon: Compass,
    badge: 'GIS',
  },

  // B · POLLUTION MONITORING
  {
    name: 'Vehicle Air Emissions',
    shortName: 'Air Emissions',
    path: '/environmental-monitoring/transportation-pollution/emissions',
    category: 'B · Pollution Monitoring',
    icon: Wind,
    badge: 'NOx/PM',
  },
  {
    name: 'Traffic & Congestion',
    shortName: 'Traffic & Flow',
    path: '/environmental-monitoring/transportation-pollution/traffic',
    category: 'B · Pollution Monitoring',
    icon: Gauge,
    badge: 'Speed',
  },
  {
    name: 'Noise Pollution',
    shortName: 'Traffic Noise',
    path: '/environmental-monitoring/transportation-pollution/noise',
    category: 'B · Pollution Monitoring',
    icon: Volume2,
    badge: 'dB(A)',
  },
  {
    name: 'Road Dust & Non-Exhaust PM',
    shortName: 'Road Dust',
    path: '/environmental-monitoring/transportation-pollution/road-dust',
    category: 'B · Pollution Monitoring',
    icon: Layers,
    badge: 'TRWP',
  },
  {
    name: 'Carbon & Climate',
    shortName: 'Carbon & CO₂',
    path: '/environmental-monitoring/transportation-pollution/carbon',
    category: 'B · Pollution Monitoring',
    icon: CloudSun,
    badge: 'GHG',
  },
  {
    name: 'Road Runoff & Contamination',
    shortName: 'Road Runoff',
    path: '/environmental-monitoring/transportation-pollution/runoff',
    category: 'B · Pollution Monitoring',
    icon: Droplets,
    badge: 'PAHs',
  },

  // C · IMPACTS & SECTOR ANALYSIS
  {
    name: 'Public Health Exposure',
    shortName: 'Health Exposure',
    path: '/environmental-monitoring/transportation-pollution/health-exposure',
    category: 'C · Impacts & Sector Analysis',
    icon: HeartPulse,
    badge: 'Receptors',
  },
  {
    name: 'Tourism & Freight Transport',
    shortName: 'Tourism & Freight',
    path: '/environmental-monitoring/transportation-pollution/tourism-freight',
    category: 'C · Impacts & Sector Analysis',
    icon: Bus,
    badge: 'NH-44/KKH',
  },
  {
    name: 'Public Transport & Clean Mobility',
    shortName: 'Clean Mobility',
    path: '/environmental-monitoring/transportation-pollution/clean-mobility',
    category: 'C · Impacts & Sector Analysis',
    icon: Zap,
    badge: 'EV Transition',
  },
  {
    name: 'Hotspots & Intervention Scenarios',
    shortName: 'Hotspots',
    path: '/environmental-monitoring/transportation-pollution/hotspots',
    category: 'C · Impacts & Sector Analysis',
    icon: Flame,
    badge: 'Corridors',
  },

  // D · REGULATORY & SCIENTIFIC INTELLIGENCE
  {
    name: 'Vehicle Compliance & Regulation',
    shortName: 'Regulations',
    path: '/environmental-monitoring/transportation-pollution/regulations',
    category: 'D · Regulatory & Scientific Intelligence',
    icon: ShieldCheck,
    badge: 'BS-VI',
  },
  {
    name: 'Data Sources & Integrations',
    shortName: 'Data Sources',
    path: '/environmental-monitoring/transportation-pollution/data-sources',
    category: 'D · Regulatory & Scientific Intelligence',
    icon: Radio,
    badge: '7 APIs',
  },
  {
    name: 'Research, Methodology & Open Data',
    shortName: 'Methodology',
    path: '/environmental-monitoring/transportation-pollution/methodology',
    category: 'D · Regulatory & Scientific Intelligence',
    icon: BookOpen,
    badge: 'COPERT',
  },
];

export function TransportSubNav() {
  const pathname = usePathname();

  const currentModule = TRANSPORT_SUBMODULES.find(
    (m) => m.path === pathname || (m.path !== '/environmental-monitoring/transportation-pollution' && pathname?.startsWith(m.path))
  ) || TRANSPORT_SUBMODULES[0];

  return (
    <div className="sticky top-14 z-30 bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Mobile View: Swipeable Pill Strip */}
        <div className="py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {TRANSPORT_SUBMODULES.map((sub) => {
              const Icon = sub.icon;
              const isActive =
                pathname === sub.path ||
                (sub.path !== '/environmental-monitoring/transportation-pollution' &&
                  pathname?.startsWith(sub.path));

              return (
                <Link
                  key={sub.path}
                  href={sub.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-amber-600 text-slate-950 font-bold shadow-sm shadow-amber-600/30 ring-1 ring-amber-400'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{sub.shortName}</span>
                  {sub.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded-[3px] font-mono font-normal ${
                        isActive
                          ? 'bg-black/20 text-slate-950 font-bold'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {sub.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Category breadcrumb metadata strip */}
        <div className="hidden md:flex items-center justify-between py-1 border-t border-white/5 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">ACTIVE SECTION:</span>
            <span>{currentModule.category}</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">{currentModule.name}</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span>5 REGIONS</span>
            <span>·</span>
            <span>42 DISTRICTS</span>
            <span>·</span>
            <span>VAHAN / COPERT TIER 3</span>
            <span>·</span>
            <span className="text-amber-400 font-bold">18 SUBMODULES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
