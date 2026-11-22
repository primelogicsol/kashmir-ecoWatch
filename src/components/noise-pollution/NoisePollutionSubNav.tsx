'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Layers,
  BarChart3,
  Compass,
  Radio,
  Activity,
  Car,
  Factory,
  Volume2,
  Zap,
  VolumeX,
  HeartPulse,
  PawPrint,
  Flame,
  Scale,
  ShieldCheck,
  Eye,
  Database,
  FileText
} from 'lucide-react';

export interface NoiseSubmoduleRoute {
  name: string;
  shortName: string;
  path: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const NOISE_POLLUTION_SUBMODULES: NoiseSubmoduleRoute[] = [
  // A · MONITORING & GEOGRAPHIC INTELLIGENCE
  {
    name: 'Overview Hub',
    shortName: 'Overview',
    path: '/environmental-monitoring/noise-pollution',
    category: 'A · Monitoring & Geographic Intelligence',
    icon: Layers,
    badge: 'Hub',
  },
  {
    name: 'Dashboards & District Scores',
    shortName: 'Dashboards',
    path: '/environmental-monitoring/noise-pollution/dashboards',
    category: 'A · Monitoring & Geographic Intelligence',
    icon: BarChart3,
    badge: 'DNPBS',
  },
  {
    name: 'Noise GIS Atlas',
    shortName: 'GIS Atlas',
    path: '/environmental-monitoring/noise-pollution/gis-atlas',
    category: 'A · Monitoring & Geographic Intelligence',
    icon: Compass,
    badge: 'GIS',
  },
  {
    name: 'Monitoring Stations',
    shortName: 'Stations',
    path: '/environmental-monitoring/noise-pollution/monitoring-stations',
    category: 'A · Monitoring & Geographic Intelligence',
    icon: Radio,
    badge: 'Class 1/2',
  },
  {
    name: 'Sound Measurements & Trends',
    shortName: 'Measurements',
    path: '/environmental-monitoring/noise-pollution/measurements',
    category: 'A · Monitoring & Geographic Intelligence',
    icon: Activity,
    badge: 'LAeq',
  },

  // B · NOISE SOURCES
  {
    name: 'Transportation Noise',
    shortName: 'Transport Noise',
    path: '/environmental-monitoring/noise-pollution/transport-noise',
    category: 'B · Noise Sources',
    icon: Car,
    badge: 'Traffic',
  },
  {
    name: 'Construction & Industrial Noise',
    shortName: 'Industrial Noise',
    path: '/environmental-monitoring/noise-pollution/industrial-construction',
    category: 'B · Noise Sources',
    icon: Factory,
    badge: 'Industry',
  },
  {
    name: 'Community & Tourism Noise',
    shortName: 'Community Noise',
    path: '/environmental-monitoring/noise-pollution/community-tourism',
    category: 'B · Noise Sources',
    icon: Volume2,
    badge: 'Tourism',
  },
  {
    name: 'Generators & Infrastructure Noise',
    shortName: 'Generators',
    path: '/environmental-monitoring/noise-pollution/infrastructure-noise',
    category: 'B · Noise Sources',
    icon: Zap,
    badge: 'DG Sets',
  },

  // C · EXPOSURE & ECOLOGICAL IMPACTS
  {
    name: 'Sensitive & Silence Zones',
    shortName: 'Silence Zones',
    path: '/environmental-monitoring/noise-pollution/sensitive-zones',
    category: 'C · Exposure & Ecological Impacts',
    icon: VolumeX,
    badge: 'Silence',
  },
  {
    name: 'Human Health & Exposure',
    shortName: 'Health Exposure',
    path: '/environmental-monitoring/noise-pollution/health-exposure',
    category: 'C · Exposure & Ecological Impacts',
    icon: HeartPulse,
    badge: 'Receptors',
  },
  {
    name: 'Wildlife & Acoustic Ecology',
    shortName: 'Wildlife Acoustics',
    path: '/environmental-monitoring/noise-pollution/wildlife-acoustics',
    category: 'C · Exposure & Ecological Impacts',
    icon: PawPrint,
    badge: 'Fauna',
  },
  {
    name: 'Acoustic Hotspots & Modelling',
    shortName: 'Hotspots',
    path: '/environmental-monitoring/noise-pollution/hotspots',
    category: 'C · Exposure & Ecological Impacts',
    icon: Flame,
    badge: 'Corridors',
  },

  // D · MANAGEMENT & ACCOUNTABILITY
  {
    name: 'Standards & Compliance',
    shortName: 'Regulations',
    path: '/environmental-monitoring/noise-pollution/standards-compliance',
    category: 'D · Management & Accountability',
    icon: Scale,
    badge: 'Limits',
  },
  {
    name: 'Mitigation & Intervention',
    shortName: 'Mitigation',
    path: '/environmental-monitoring/noise-pollution/mitigation',
    category: 'D · Management & Accountability',
    icon: ShieldCheck,
    badge: 'Barriers',
  },
  {
    name: 'Citizen Noise Watch',
    shortName: 'Citizen Watch',
    path: '/environmental-monitoring/noise-pollution/citizen-watch',
    category: 'D · Management & Accountability',
    icon: Eye,
    badge: 'Reports',
  },

  // E · SCIENTIFIC DATA INFRASTRUCTURE
  {
    name: 'Data Sources & Integrations',
    shortName: 'Data Sources',
    path: '/environmental-monitoring/noise-pollution/data-sources',
    category: 'E · Scientific Data Infrastructure',
    icon: Database,
    badge: 'APIs',
  },
  {
    name: 'Research, Methodology & Open Data',
    shortName: 'Methodology',
    path: '/environmental-monitoring/noise-pollution/methodology',
    category: 'E · Scientific Data Infrastructure',
    icon: FileText,
    badge: 'ISO 1996',
  },
];

interface NoisePollutionSubNavProps {
  className?: string;
}

export function NoisePollutionSubNav({ className = '' }: NoisePollutionSubNavProps) {
  const pathname = usePathname();

  const currentModule =
    NOISE_POLLUTION_SUBMODULES.find(
      (m) =>
        m.path === pathname ||
        (m.path !== '/environmental-monitoring/noise-pollution' && pathname?.startsWith(m.path))
    ) || NOISE_POLLUTION_SUBMODULES[0];

  return (
    <div className={`sticky top-14 z-30 bg-slate-950/95 backdrop-blur-md border-b border-white/10 shadow-lg ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Swipeable Pill Strip */}
        <div className="py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {NOISE_POLLUTION_SUBMODULES.map((sub) => {
              const Icon = sub.icon;
              const isActive =
                pathname === sub.path ||
                (sub.path !== '/environmental-monitoring/noise-pollution' &&
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
            <span>IEC 61672 / ISO 1996</span>
            <span>·</span>
            <span className="text-amber-400 font-bold">18 SUBMODULES</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoisePollutionSubNav;
