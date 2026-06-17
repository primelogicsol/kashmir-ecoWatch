'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

const TABS = [
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Valley / J&K official protected area system — 3 national parks' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Jammu & Ladakh / Chenab / Pir Panjal / adjoining divisions — 2 national parks' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Gilgit-Baltistan, AJK, and broader Himalayan ecological scope — 7 parks' },
] as const;

type TabKey = 'core' | 'trans' | 'extended';

export default function NationalParksPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('core');
  const allParks = getProtectedAreas.nationalParks();

  const coreParks    = allParks.filter(p => p.scope === 'Kashmir Core');
  const transParks   = allParks.filter(p => p.scope === 'Trans-Divisional');
  const extendedParks = allParks.filter(p => p.scope === 'Transboundary / Extended');

  const activeParks =
    activeTab === 'core'     ? coreParks :
    activeTab === 'trans'    ? transParks :
    extendedParks;

  const officialParks = [...coreParks, ...transParks];

  const officialAreaSum = officialParks.reduce((acc, p) => acc + p.area, 0);
  const extendedAreaSum = extendedParks.reduce((acc, p) => acc + p.area, 0);

  const metrics = [
    { label: 'Core & Trans Parks',       value: officialParks.length,               icon: 'Mountain'   as const },
    { label: 'Core & Trans Area',        value: `${officialAreaSum.toLocaleString()} km²`, icon: 'Map' as const },
    { label: 'Districts',                 value: new Set(officialParks.map(p => p.district)).size, icon: 'MapPin' as const },
    { label: 'Earliest Establishment',    value: 1981,                               icon: 'Shield'     as const },
    { label: 'Extended Parks',            value: extendedParks.length,               icon: 'Activity'   as const },
    { label: 'Extended Area',             value: `${extendedAreaSum.toLocaleString()} km²`, icon: 'TrendingUp' as const },
    { label: 'Flagship Species',          value: '50+',                              icon: 'Eye'        as const },
    { label: 'Ecosystem Types',           value: 14,                                 icon: 'Leaf'       as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap leading-[1.12]">National Parks</span><span className="block whitespace-nowrap leading-[1.12] pb-2 bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Greater Kashmir Ecology</span></>}
      subtitle="Mountain and temperate forest conservation landscapes spanning Kashmir's protected, trans-divisional, and transboundary ecological zones. Integrates species profiles, boundary data, habitat intelligence, and conservation monitoring for each park."
      icon="Mountain"
      color="from-emerald-600 to-emerald-500"
      areas={allParks}
      metrics={metrics}
                      />
  );
}
