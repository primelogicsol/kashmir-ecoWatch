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

  const metrics = [
    { label: 'Kashmir Core Wetlands', value: coreWetlands.length, icon: 'Droplet' as const },
    { label: 'Jammu Wetland Reserves', value: transWetlands.filter(w => w.district !== 'Leh' && w.id !== 'surinsar-mansar-wetland').length, icon: 'Map' as const },
    { label: 'Ladakh Wetlands', value: '5+', icon: 'Mountain' as const },
    { label: 'Transboundary / Ext.', value: '10+', icon: 'Activity' as const },
    { label: 'Official J&K Reserves', value: 14, icon: 'Shield' as const },
    { label: 'Ramsar-linked Sites', value: '6+', icon: 'Eye' as const },
    { label: 'Key Bird Groups', value: '25+', icon: 'Bird' as const },
    { label: 'Ecosystem Types', value: '12+', icon: 'Leaf' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap leading-[1.12]">Wetland Reserves</span><span className="block whitespace-nowrap leading-[1.12] pb-2 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Greater Kashmir Ecology</span></>}
      subtitle="Marshes, lakes, reedbeds, floodplain wetlands, and high-altitude wetland systems across Kashmir Core, Jammu-Ladakh trans-divisional zones, and the wider transboundary Kashmir ecological belt. Integrates hydrology, bird-use patterns, Ramsar status, land-cover change, threat signals, and conservation monitoring."
      icon="Droplet"
      color="from-emerald-600 to-emerald-500"
      areas={allAreas}
      metrics={metrics}
      
      
      
    />
  );
}
