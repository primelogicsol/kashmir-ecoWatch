'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function WildlifeSanctuariesPage() {
  const areas = getProtectedAreas.wildlifeSanctuaries();

  const metrics = [
    { label: 'Total Sanctuaries', value: areas.length, icon: 'Shield' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Districts', value: new Set(areas.map(pa => pa.district)).size, icon: 'Mountain' as const },
    { label: 'Key Species', value: 89, icon: 'Activity' as const },
    { label: 'Ecosystems', value: 18, icon: 'Leaf' as const },
    { label: 'Migratory Routes', value: 6, icon: 'TrendingUp' as const },
    { label: 'Habitat Types', value: 9, icon: 'TreePine' as const },
    { label: 'Active Alerts', value: 3, icon: 'AlertTriangle' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir Wildlife</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Sanctuary Network</span></>}
      subtitle="Protected forest and alpine habitats supporting Kashmir's mammals, birds, and mountain biodiversity. Integrates species data, seasonal movement patterns, habitat condition, and conservation monitoring for each sanctuary."
      icon="Shield"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
