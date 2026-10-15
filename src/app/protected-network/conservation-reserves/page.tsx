'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

const TABS = [
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Core reserves — 12 seed records' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Jammu & trans-divisional reserves — 8 seed records' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Extended conservation landscapes — 20+ seed records' },
] as const;

type TabKey = 'core' | 'trans' | 'extended';

export default function ConservationReservesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('core');
  const allAreas = getProtectedAreas.conservationReserves();

    const coreReserves = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transReserves = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedReserves = allAreas.filter(p => p.scope === 'Transboundary / Extended');
  const totalCRArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);

  const metrics = [
    { label: 'Total Conservation Units', value: allAreas.length,                               icon: 'Leaf' as const },
    { label: 'Total Stewardship Area',   value: `${Math.round(totalCRArea).toLocaleString()} km²`, icon: 'Map' as const },
    { label: 'Kashmir Core Reserves',    value: coreReserves.length,                           icon: 'Shield' as const },
    { label: 'Trans-Divisional Reserves',value: transReserves.length,                          icon: 'Mountain' as const },
    { label: 'Community Landscapes',     value: extendedReserves.length,                       icon: 'Activity' as const },
    { label: 'Governed Districts',       value: new Set(allAreas.map(p => p.district)).size,   icon: 'MapPin' as const },
    { label: 'Corridor Nodes',           value: '35+ Corridors',                               icon: 'TrendingUp' as const },
    { label: 'Protected Status',         value: 'IUCN Category V',                             icon: 'Eye' as const },
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
              Conservation Reserves &amp; Community Zones
            </span>
          </div>
        </div>
      }
      subtitle="Community-supported conservation landscapes, ecological buffers, and transition zones across Kashmir. Integrates land-use intelligence, community stewardship data, habitat assessments, and ecological condition monitoring."
      icon="Leaf"
      color="from-emerald-600 to-emerald-500"
      areas={allAreas}
      metrics={metrics}
      
      
      
    />
  );
}

