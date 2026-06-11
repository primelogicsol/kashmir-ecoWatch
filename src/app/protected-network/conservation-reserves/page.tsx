'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function ConservationReservesPage() {
  const areas = getProtectedAreas.conservationReserves();

  const metrics = [
    { label: 'Total Reserves', value: areas.length, icon: 'Leaf' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Communities', value: 24, icon: 'Users' as const },
    { label: 'Buffer Zones', value: 5, icon: 'Shield' as const },
    { label: 'Habitat Types', value: 7, icon: 'Leaf' as const },
    { label: 'Active Mgmt Plans', value: 4, icon: 'FileText' as const },
    { label: 'Districts', value: new Set(areas.map(pa => pa.district)).size, icon: 'Map' as const },
    { label: 'Key Species', value: 38, icon: 'Activity' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir Conservation</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Reserve Network</span></>}
      subtitle="Community-supported conservation landscapes, ecological buffers, and transition zones across Kashmir. Integrates land-use intelligence, community stewardship data, habitat assessments, and ecological condition monitoring."
      icon="Leaf"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
