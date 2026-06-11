'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function BirdHabitatAreasPage() {
  const areas = getProtectedAreas.birdHabitatAreas();

  const metrics = [
    { label: 'Total IBAs', value: areas.length, icon: 'Activity' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Wetland IBAs', value: 12, icon: 'Droplet' as const },
    { label: 'Bird Species', value: 312, icon: 'Shield' as const },
    { label: 'Migratory Species', value: 87, icon: 'TrendingUp' as const },
    { label: 'Resident Species', value: 142, icon: 'Eye' as const },
    { label: 'Habitat Types', value: 8, icon: 'Leaf' as const },
    { label: 'Ramsar Overlap', value: 3, icon: 'Droplet' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir Bird</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Habitat Network</span></>}
      subtitle="Important bird and biodiversity habitats across Kashmir supporting resident and migratory species. Integrates site assessments, species checklists, seasonal usage data, and habitat condition intelligence."
      icon="Activity"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
