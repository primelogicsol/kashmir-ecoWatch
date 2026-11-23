'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

const TABS = [
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Valley sanctuaries — 9 records' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Jammu & Ladakh sanctuary belt — 7 records' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Azad Kashmir, Gilgit-Baltistan, and broader historical Kashmir belt — 4 records' },
] as const;

type TabKey = 'core' | 'trans' | 'extended';

export default function WildlifeSanctuariesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('core');
  const allAreas = getProtectedAreas.wildlifeSanctuaries();

  const coreSanctuaries    = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transSanctuaries   = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedSanctuaries = allAreas.filter(p => p.scope === 'Transboundary / Extended');

  const activeAreas =
    activeTab === 'core'     ? coreSanctuaries :
    activeTab === 'trans'    ? transSanctuaries :
    extendedSanctuaries;

    const totalArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);

  const metrics = [
    { label: 'Total Sanctuaries',         value: allAreas.length,                               icon: 'Shield' as const },
    { label: 'Total Protected Biome',     value: `${Math.round(totalArea).toLocaleString()} km²`, icon: 'Map' as const },
    { label: 'Kashmir Core Sanctuaries',  value: coreSanctuaries.length,                        icon: 'Shield' as const },
    { label: 'Trans-Divisional',          value: transSanctuaries.length,                       icon: 'Mountain' as const },
    { label: 'Transboundary Havens',      value: extendedSanctuaries.length,                    icon: 'Activity' as const },
    { label: 'Surveyed Districts',        value: new Set(allAreas.map(p => p.district)).size,   icon: 'MapPin' as const },
    { label: 'Flagship Wildlife',         value: '60+ Taxa',                                    icon: 'Eye' as const },
    { label: 'IUCN Categorization',       value: 'Category IV',                                 icon: 'TrendingUp' as const },
  ];

  return (
    <ProtectedCategoryPage
      images={[
        '/images/protected-network/protected-wildlife-sanctuaries-overa.jpg',
        '/images/protected-network/protected-area-atlas-gis.jpg',
        '/images/protected-network/protected-national-parks-dachigam.jpg',
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
              Wildlife Sanctuaries &amp; Key Havens
            </span>
          </div>
        </div>
      }
      subtitle="Protected forest and alpine habitats supporting Kashmir's mammals, birds, and mountain biodiversity. Integrates species data, seasonal movement patterns, habitat condition, and conservation monitoring for each sanctuary."
      icon="Shield"
      color="from-emerald-600 to-emerald-500"
      areas={allAreas}
      metrics={metrics}
      
      
      
    />
  );
}
