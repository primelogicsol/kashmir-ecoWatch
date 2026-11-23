'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

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
  const totalArea = allParks.reduce((acc, p) => acc + p.area, 0);

  const metrics = [
    { label: 'Total National Parks',    value: allParks.length,                           icon: 'Mountain'   as const },
    { label: 'Total Protected Biome',   value: `${Math.round(totalArea).toLocaleString()} km²`, icon: 'Map'        as const },
    { label: 'Core & Trans Parks',       value: officialParks.length,                      icon: 'Shield'     as const },
    { label: 'Transboundary Parks',     value: extendedParks.length,                      icon: 'Activity'   as const },
    { label: 'Districts & Regions',      value: new Set(allParks.map(p => p.district)).size, icon: 'MapPin'   as const },
    { label: 'Earliest Designation',    value: 1975,                                      icon: 'Shield'     as const },
    { label: 'Highest Altitude Summit', value: '8,611 m (K2)',                            icon: 'TrendingUp' as const },
    { label: 'Flagship Apex Taxa',      value: '18 Species',                              icon: 'Eye'        as const },
  ];

  return (
    <ProtectedCategoryPage
      images={[
        '/images/protected-network/protected-national-parks-dachigam.jpg',
        '/images/protected-network/protected-area-atlas-gis.jpg',
        '/images/protected-network/protected-wildlife-sanctuaries-overa.jpg',
        '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
        '/images/protected-network/protected-conservation-reserves-shikargah.jpg',
        '/images/protected-network/protected-bird-habitat-areas-iba.jpg',
        '/images/protected-network/protected-species-intelligence-telemetry.jpg',
        '/images/protected-network/protected-corridors-connectivity-passes.jpg',
        '/images/protected-network/protected-monitoring-threats-surveillance.jpg',
        '/images/protected-network/protected-hwc-rapid-response-rescue.jpg',
        '/images/protected-network/protected-research-trails-sightings.jpg',
        '/images/bear.png',
        '/images/tiger.png',
        '/images/markhor.png',
        '/images/protected-network.png'
      ]}
      title={
        <div className="overflow-visible pb-2">
          <KewBrandIdentity />
          <div className="leading-[1.15] overflow-visible pr-8">
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
              National Parks &amp; Core Habitats
            </span>
          </div>
        </div>
      }
      subtitle="Mountain and temperate forest conservation landscapes spanning Kashmir's protected, trans-divisional, and transboundary ecological zones. Integrates species profiles, boundary data, habitat intelligence, and conservation monitoring for each park."
      icon="Mountain"
      color="from-emerald-600 to-emerald-500"
      areas={allParks}
      metrics={metrics}
                      />
  );
}
