'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Trees,
  BarChart3,
  Compass,
  FileSpreadsheet,
  Building,
  QrCode,
  Activity,
  Ruler,
  Satellite,
  ThermometerSun,
  Landmark,
  AlertTriangle,
  ShieldCheck,
  Camera,
  BookOpen,
  Database,
  Radio,
} from 'lucide-react';

export interface ChinarSubmoduleRoute {
  name: string;
  shortName: string;
  path: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const CHINAR_SUBMODULES: ChinarSubmoduleRoute[] = [
  // 01 · MONITORING & GIS INTELLIGENCE
  {
    name: 'Overview Hub',
    shortName: 'Overview',
    path: '/environmental-monitoring/chinar-monitoring',
    category: '01 · Monitoring & GIS Intelligence',
    icon: Trees,
    badge: 'Hub',
  },
  {
    name: 'Analytics Dashboards',
    shortName: 'Dashboards',
    path: '/environmental-monitoring/chinar-monitoring/dashboards',
    category: '01 · Monitoring & GIS Intelligence',
    icon: BarChart3,
    badge: 'Trends',
  },
  {
    name: 'GIS Chinar Atlas',
    shortName: 'GIS Atlas',
    path: '/environmental-monitoring/chinar-monitoring/gis-atlas',
    category: '01 · Monitoring & GIS Intelligence',
    icon: Compass,
    badge: 'GIS',
  },
  {
    name: '2026 Valley Census',
    shortName: '2026 Census',
    path: '/environmental-monitoring/chinar-monitoring/census',
    category: '01 · Monitoring & GIS Intelligence',
    icon: FileSpreadsheet,
    badge: 'Census',
  },
  {
    name: '10-District Profiles',
    shortName: 'Districts',
    path: '/environmental-monitoring/chinar-monitoring/districts',
    category: '01 · Monitoring & GIS Intelligence',
    icon: Building,
    badge: 'Districts',
  },
  {
    name: 'Tree Aadhaar Registry',
    shortName: 'Tree Registry',
    path: '/environmental-monitoring/chinar-monitoring/tree-registry',
    category: '01 · Monitoring & GIS Intelligence',
    icon: QrCode,
    badge: 'QR/RFID',
  },

  // 02 · ECOLOGICAL & SCIENTIFIC MONITORING
  {
    name: 'Tree Health & Pathology',
    shortName: 'Tree Health',
    path: '/environmental-monitoring/chinar-monitoring/tree-health',
    category: '02 · Ecological & Scientific Health',
    icon: Activity,
    badge: 'Pathology',
  },
  {
    name: 'Growth & Biometrics',
    shortName: 'Biometrics',
    path: '/environmental-monitoring/chinar-monitoring/biometrics',
    category: '02 · Ecological & Scientific Health',
    icon: Ruler,
    badge: 'GBH',
  },
  {
    name: 'Canopy & Satellite NDVI',
    shortName: 'Canopy NDVI',
    path: '/environmental-monitoring/chinar-monitoring/canopy',
    category: '02 · Ecological & Scientific Health',
    icon: Satellite,
    badge: 'NDVI',
  },
  {
    name: 'Climate Stress & Phenology',
    shortName: 'Climate Stress',
    path: '/environmental-monitoring/chinar-monitoring/climate-stress',
    category: '02 · Ecological & Scientific Health',
    icon: ThermometerSun,
    badge: 'Climate',
  },

  // 03 · CONSERVATION & HERITAGE
  {
    name: 'Heritage Chinars & Groves',
    shortName: 'Heritage Groves',
    path: '/environmental-monitoring/chinar-monitoring/heritage',
    category: '03 · Conservation & Heritage Protection',
    icon: Landmark,
    badge: 'Heritage',
  },
  {
    name: 'Naseem Bagh Observatory',
    shortName: 'Naseem Bagh',
    path: '/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory',
    category: '03 · Conservation & Heritage Protection',
    icon: Landmark,
    badge: 'Monograph 14',
  },
  {
    name: 'Mortality & Felling Threats',
    shortName: 'Threats & Felling',
    path: '/environmental-monitoring/chinar-monitoring/threats',
    category: '03 · Conservation & Heritage Protection',
    icon: AlertTriangle,
    badge: 'Alerts',
  },
  {
    name: 'Protection & Legal Status',
    shortName: 'Protection Laws',
    path: '/environmental-monitoring/chinar-monitoring/conservation',
    category: '03 · Conservation & Heritage Protection',
    icon: ShieldCheck,
    badge: 'Act 1969',
  },

  // 04 · FIELD OBSERVATIONS & CITIZEN SCIENCE
  {
    name: 'Citizen Chinar Watch',
    shortName: 'Citizen Watch',
    path: '/environmental-monitoring/chinar-monitoring/citizen-watch',
    category: '04 · Field Observations & Citizen Science',
    icon: Camera,
    badge: 'Field',
  },

  // 05 · RESEARCH, DATA SOURCES & OPEN DATA
  {
    name: 'Research & Botanical Papers',
    shortName: 'Research Archive',
    path: '/environmental-monitoring/chinar-monitoring/research',
    category: '05 · Research, Data Sources & Methodology',
    icon: BookOpen,
    badge: 'Library',
  },
  {
    name: 'Data Sources & Integrations',
    shortName: 'Data Sources',
    path: '/environmental-monitoring/chinar-monitoring/data-sources',
    category: '05 · Research, Data Sources & Methodology',
    icon: Radio,
    badge: 'Sensors',
  },
  {
    name: 'Methodology & Open Data',
    shortName: 'Open Data',
    path: '/environmental-monitoring/chinar-monitoring/methodology',
    category: '05 · Research, Data Sources & Methodology',
    icon: Database,
    badge: 'Open Data',
  },
];

interface ChinarSubNavProps {
  className?: string;
}

export function ChinarSubNav({ className = '' }: ChinarSubNavProps) {
  const pathname = usePathname();

  return (
    <div className={`w-full bg-slate-950/90 border-b border-white/10 sticky top-[72px] z-30 backdrop-blur-md ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {CHINAR_SUBMODULES.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
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
