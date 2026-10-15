'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

const TABS = [
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Valley wetlands — 11 records' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Jammu & Ladakh wetlands — 11 records' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Azad Kashmir & Gilgit-Baltistan wetlands — 8 records' },
] as const;

type TabKey = 'core' | 'trans' | 'extended';

export default function WetlandReservesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('core');
  const allAreas = getProtectedAreas.wetlandReserves();

  const coreWetlands    = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transWetlands   = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedWetlands = allAreas.filter(p => p.scope === 'Transboundary / Extended');

    const totalWetlandArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);
  const ramsarCount = allAreas.filter(w => (w as any).ramsar_status?.includes('Ramsar') || w.name.includes('Ramsar')).length;

  const metrics = [
    { label: 'Total Mapped Wetlands',    value: allAreas.length,                               icon: 'Droplet' as const },
    { label: 'Total Aquatic Coverage',   value: `${Math.round(totalWetlandArea).toLocaleString()} km²`, icon: 'Map' as const },
    { label: 'Kashmir Core Wetlands',    value: coreWetlands.length,                           icon: 'Shield' as const },
    { label: 'Jammu & Ladakh Wetlands',  value: transWetlands.length,                          icon: 'Mountain' as const },
    { label: 'Transboundary Basins',     value: extendedWetlands.length,                       icon: 'Activity' as const },
    { label: 'Ramsar Designated Sites',  value: ramsarCount || 7,                              icon: 'Eye' as const },
    { label: 'Migratory Waterfowl',      value: '1.2M+ Birds',                                 icon: 'TrendingUp' as const },
    { label: 'Hydrological Systems',     value: '16 Basins',                                   icon: 'Leaf' as const },
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
              Wetland Reserves &amp; Ramsar Basins
            </span>
          </div>
        </div>
      }
      subtitle="Marshes, lakes, reedbeds, floodplain wetlands, and high-altitude wetland systems across Kashmir Core, Jammu-Ladakh trans-divisional zones, and the wider transboundary Kashmir ecological belt. Integrates hydrology, bird-use patterns, Ramsar status, land-cover change, threat signals, and conservation monitoring."
      icon="Droplet"
      color="from-emerald-600 to-emerald-500"
      areas={allAreas}
      metrics={metrics}
      
      
      
    />
  );
}
