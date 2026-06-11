'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function WetlandReservesPage() {
  const areas = getProtectedAreas.wetlandReserves();

  const metrics = [
    { label: 'Total Reserves', value: areas.length, icon: 'Droplet' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Ramsar Sites', value: 2, icon: 'Shield' as const },
    { label: 'Bird Species', value: 127, icon: 'Activity' as const },
    { label: 'Migratory Birds', value: 68, icon: 'TrendingUp' as const },
    { label: 'Water Bodies', value: 12, icon: 'Eye' as const },
    { label: 'Districts', value: new Set(areas.map(pa => pa.district)).size, icon: 'Map' as const },
    { label: 'Habitat Types', value: 6, icon: 'Leaf' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir Wetland</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Reserve Network</span></>}
      subtitle="Marsh, reedbed, and waterbird conservation ecosystems across Kashmir, including designated Ramsar wetlands. Integrates hydrological data, avifaunal records, seasonal usage patterns, and ecological condition assessments."
      icon="Droplet"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
