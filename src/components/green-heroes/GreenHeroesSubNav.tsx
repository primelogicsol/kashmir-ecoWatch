'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Compass,
  FileText,
  Award,
  Sparkles,
  MapPin,
  BookOpen,
  Send,
  Building2,
  Newspaper,
  Microscope,
  Scale,
  Music,
  Flame,
  GraduationCap,
  HeartHandshake,
  Database,
  Layers,
  ShieldAlert
} from 'lucide-react';

export interface GreenHeroTabItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const GREEN_HEROES_TABS: GreenHeroTabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    shortLabel: 'Overview',
    icon: Sparkles,
    badge: 'Hub',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'all-heroes',
    label: 'All Green Heroes',
    shortLabel: 'Directory',
    icon: Users,
    badge: '24 Profiles',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  {
    id: 'green-martyrs',
    label: 'Forest Protection Martyrs & Fallen Defenders',
    shortLabel: 'Green Martyrs',
    icon: ShieldAlert,
    badge: '21 Dossiers',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30'
  },
  {
    id: 'journalists-media',
    label: 'Journalists & Media',
    shortLabel: 'Media',
    icon: Newspaper,
    badge: 'Investigations',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'scientists-conservationists',
    label: 'Scientists & Conservationists',
    shortLabel: 'Scientists',
    icon: Microscope,
    badge: '95 Dossiers',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
  },
  {
    id: 'advocates-legal',
    label: 'Advocates & Legal Professionals',
    shortLabel: 'Legal',
    icon: Scale,
    badge: '17 Candidates',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'poets-artists',
    label: 'Poets, Singers & Creative Artists',
    shortLabel: 'Creative Arts',
    icon: Music,
    badge: '19 Dossiers',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    id: 'religious-spiritual',
    label: 'Religious & Spiritual Leaders',
    shortLabel: 'Faith-Based',
    icon: Flame,
    badge: '14 Dossiers',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'politicians-officials',
    label: 'Politicians & Public Officials',
    shortLabel: 'Public Service',
    icon: Building2,
    badge: '2 Documented',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'ngos-community',
    label: 'NGOs & Community Leaders',
    shortLabel: 'Community',
    icon: HeartHandshake,
    badge: '27 Leaders',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
  },
  {
    id: 'youth-educators',
    label: 'Youth & Educators',
    shortLabel: 'Educators',
    icon: GraduationCap,
    badge: 'Eco-Clubs',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
  },
  {
    id: 'regional-directory',
    label: 'Regional & District Directory',
    shortLabel: '5 Regions',
    icon: MapPin,
    badge: '42 Districts',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30'
  },
  {
    id: 'gis-atlas',
    label: 'Green Heroes GIS Atlas',
    shortLabel: 'GIS Map',
    icon: Compass,
    badge: 'Spatial',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'contributions',
    label: 'Environmental Contributions',
    shortLabel: 'Works Archive',
    icon: FileText,
    badge: '35 Works',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    id: 'nominations',
    label: 'Nominations & Verification',
    shortLabel: 'Nominate',
    icon: Send,
    badge: 'Public Portal',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'recognition-archives',
    label: 'Recognition & Legacy Hall',
    shortLabel: 'Legacy Hall',
    icon: Award,
    badge: '1377–2026',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
  },
  {
    id: 'data-integrations',
    label: 'Cross-Module Integrations',
    shortLabel: 'Integrations',
    icon: Database,
    badge: 'KEW Connect',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  }
];

interface GreenHeroesSubNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function GreenHeroesSubNav({ activeTab, onTabChange }: GreenHeroesSubNavProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full bg-slate-900/90 border-y border-slate-800 sticky top-16 z-30 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <span>Loading KEW Green Heroes workbench...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md border-y border-slate-800/80 sticky top-16 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 py-2">
          {/* Scrollable Tabs */}
          <nav
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
            aria-label="Green Heroes Tabs"
          >
            {GREEN_HEROES_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 border ${
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/50'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  <span>{tab.shortLabel}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-[4px] border ${
                        isActive
                          ? 'bg-emerald-800 text-emerald-100 border-emerald-400/40'
                          : tab.badgeColor || 'bg-slate-700 text-slate-300 border-slate-600'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
