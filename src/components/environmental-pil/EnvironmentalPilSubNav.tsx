'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Scale,
  FileText,
  Clock,
  MapPin,
  Layers,
  Compass,
  FileCheck2,
  ShieldAlert,
  Building2,
  BookOpen,
  Database,
  Download,
  ListChecks,
  FileEdit,
  Handshake,
  Coins,
  Route,
  FlaskConical,
  FileUp,
  Sparkles
} from 'lucide-react';

export interface PilTabItem {
  id: string;
  label: string;
  shortLabel: string;
  division: 'inventory' | 'support';
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

// Division 1: Judicial Inventory & Accountability (12 Tabs)
export const JUDICIAL_INVENTORY_TABS: PilTabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    shortLabel: 'Overview',
    division: 'inventory',
    icon: Scale,
    badge: 'Hub',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'inventory',
    label: 'PIL Inventory',
    shortLabel: 'Inventory',
    division: 'inventory',
    icon: FileText,
    badge: '26 Cases · 40 Yr',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  {
    id: 'proceedings',
    label: 'Latest Proceedings',
    shortLabel: 'Proceedings',
    division: 'inventory',
    icon: Clock,
    badge: '2026 Feed',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'districts',
    label: 'Regional & District Cases',
    shortLabel: 'Districts',
    division: 'inventory',
    icon: MapPin,
    badge: '5 Regions',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  },
  {
    id: 'sectors',
    label: 'Environmental Sectors',
    shortLabel: 'Sectors',
    division: 'inventory',
    icon: Layers,
    badge: '8 Sectors',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    id: 'gis-atlas',
    label: 'Judicial GIS Atlas',
    shortLabel: 'GIS Atlas',
    division: 'inventory',
    icon: Compass,
    badge: 'Spatial',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'judgments',
    label: 'Judgments & Orders',
    shortLabel: 'Judgments',
    division: 'inventory',
    icon: FileCheck2,
    badge: 'Directives',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'compliance',
    label: 'Compliance Monitoring',
    shortLabel: 'Compliance',
    division: 'inventory',
    icon: ShieldAlert,
    badge: 'Audit',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  },
  {
    id: 'courts',
    label: 'Courts & Institutions',
    shortLabel: 'Courts',
    division: 'inventory',
    icon: Building2,
    badge: '9 Benches',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'legal-framework',
    label: 'Legal Framework',
    shortLabel: 'Legislation',
    division: 'inventory',
    icon: BookOpen,
    badge: 'Statutes',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
  },
  {
    id: 'research-open-data',
    label: 'Research & Open Data',
    shortLabel: 'Open Data',
    division: 'inventory',
    icon: Download,
    badge: 'JSON/CSV',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  }
];

// Division 2: Environmental Justice & Litigation Support (7 Tabs)
export const LITIGATION_SUPPORT_TABS: PilTabItem[] = [
  {
    id: 'file-pil',
    label: 'File an Environmental PIL',
    shortLabel: 'File PIL',
    division: 'support',
    icon: FileUp,
    badge: 'Triage & Forums',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'filing-checklist',
    label: 'PIL Resource Checklist',
    shortLabel: 'Checklist',
    division: 'support',
    icon: ListChecks,
    badge: '12 Factors · J&K Rules',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  {
    id: 'drafting-studio',
    label: 'PIL Drafting Studio',
    shortLabel: 'Drafting',
    division: 'support',
    icon: FileEdit,
    badge: 'GIS-Linked',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    id: 'legal-aid',
    label: 'Legal Aid & Pro Bono',
    shortLabel: 'Legal Aid',
    division: 'support',
    icon: Handshake,
    badge: 'NALSA · JKSLSA · LJCP',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  },
  {
    id: 'funding',
    label: 'PIL Funding & Costs',
    shortLabel: 'Funding & Costs',
    division: 'support',
    icon: Coins,
    badge: 'Budget · FCRA Rules',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'case-lifecycle',
    label: 'Case Lifecycle Tracker',
    shortLabel: 'Lifecycle',
    division: 'support',
    icon: Route,
    badge: '9 Stages',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'scientific-evidence',
    label: 'Expert & Scientific Evidence',
    shortLabel: 'Evidence',
    division: 'support',
    icon: FlaskConical,
    badge: 'NABL · Chain of Custody',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
  }
];

export const PIL_TABS: PilTabItem[] = [...JUDICIAL_INVENTORY_TABS, ...LITIGATION_SUPPORT_TABS];

interface EnvironmentalPilSubNavProps {
  activeTab: string;
  onTabChange?: (tabId: string) => void;
}

export function EnvironmentalPilSubNav({ activeTab, onTabChange }: EnvironmentalPilSubNavProps) {
  // Determine initial division from activeTab
  const isSupportTab = LITIGATION_SUPPORT_TABS.some((t) => t.id === activeTab);
  const [selectedDivision, setSelectedDivision] = useState<'inventory' | 'support'>(
    isSupportTab ? 'support' : 'inventory'
  );

  useEffect(() => {
    if (LITIGATION_SUPPORT_TABS.some((t) => t.id === activeTab)) {
      setSelectedDivision('support');
    } else if (JUDICIAL_INVENTORY_TABS.some((t) => t.id === activeTab)) {
      setSelectedDivision('inventory');
    }
  }, [activeTab]);

  const activeTabsList = selectedDivision === 'support' ? LITIGATION_SUPPORT_TABS : JUDICIAL_INVENTORY_TABS;

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-14 z-30 shadow-md">
      <div className="container mx-auto">
        {/* Top Header Strip with Dual Division Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b border-slate-800/60 gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
              KEW Environmental Justice &amp; Litigation Centre
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              5 Himalayan Regions · 40-Year Archive &amp; Practical Action Centre
            </span>
          </div>

          {/* Division Toggle Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800/80 self-stretch sm:self-auto justify-between sm:justify-start">
            <button
              onClick={() => {
                setSelectedDivision('inventory');
                if (onTabChange && selectedDivision !== 'inventory') {
                  onTabChange('overview');
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all ${
                selectedDivision === 'inventory'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Judicial Archive (12)</span>
            </button>

            <button
              onClick={() => {
                setSelectedDivision('support');
                if (onTabChange && selectedDivision !== 'support') {
                  onTabChange('file-pil');
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-all ${
                selectedDivision === 'support'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Litigation Support (7)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Submodule Tabs for Selected Division */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {activeTabsList.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            if (onTabChange) {
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? selectedDivision === 'support'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-900/40'
                        : 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-900/40'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800/80 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-[4px] border ${
                        isActive
                          ? 'bg-white/20 text-white border-white/30'
                          : tab.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={tab.id}
                href={`/resources/environmental-pil?tab=${tab.id}`}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? selectedDivision === 'support'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-900/40'
                      : 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-900/40'
                    : 'bg-slate-950/60 text-slate-300 border-slate-800/80 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded-[4px] border ${
                      isActive
                        ? 'bg-white/20 text-white border-white/30'
                        : tab.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {tab.badge}
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
