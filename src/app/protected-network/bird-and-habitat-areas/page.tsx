'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

const TABS = [
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Core bird habitats — 22 seed records' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Trans-divisional bird habitats — 18 seed records' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Transboundary & extended flyway habitats — 25+ seed records' },
] as const;

type TabKey = 'core' | 'trans' | 'extended';

export default function BirdHabitatAreasPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('core');
  const allAreas = getProtectedAreas.birdHabitatAreas();

    const coreIBAs = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transIBAs = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedIBAs = allAreas.filter(p => p.scope === 'Transboundary / Extended');
  const totalIBAArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);

  const metrics = [
    { label: 'Total Designated IBAs',   value: allAreas.length,                               icon: 'Bird' as const },
    { label: 'Total Avian Sanctuary',   value: `${Math.round(totalIBAArea).toLocaleString()} km²`, icon: 'Map' as const },
    { label: 'Kashmir Core IBAs',       value: coreIBAs.length,                               icon: 'Shield' as const },
    { label: 'Trans-Divisional IBAs',   value: transIBAs.length,                              icon: 'Mountain' as const },
    { label: 'Transboundary IBAs',      value: extendedIBAs.length,                           icon: 'Activity' as const },
    { label: 'Recorded Bird Species',   value: '599 Species',                                 icon: 'Eye' as const },
    { label: 'Flyway Rest Basins',      value: '28 Wetlands',                                 icon: 'Droplet' as const },
    { label: 'BirdLife / BNHS Global',  value: 'A1, A2, A3 Criteria',                         icon: 'Leaf' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={
        <div className="overflow-visible pb-2">
          <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
            <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
              KEW
            </span>
            <span className="text-white">Western Himalayan</span>
          </div>
          <div className="leading-[1.15] overflow-visible pr-8">
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
              Bird &amp; Biodiversity Areas (IBAs)
            </span>
          </div>
        </div>
      }
      subtitle="Important bird and biodiversity habitats across Kashmir supporting resident and migratory species. Integrates site assessments, species checklists, seasonal usage data, and habitat condition intelligence."
      icon="Bird"
      color="from-emerald-600 to-emerald-500"
      areas={allAreas}
      metrics={metrics}
      
      
      
    />
  );
}
