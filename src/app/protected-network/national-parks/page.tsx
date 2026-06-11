'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas, protectedNetworkMetrics } from '@/data/protected-network';
import { getProtectedAreasSource, getProtectedAreaMetrics } from '@/data/protected-areas-source';

export default function NationalParksPage() {
  // Use source data for National Parks (NP category)
  const sourceAreas = getProtectedAreasSource.byCategory('NP');
  const existingAreas = getProtectedAreas.nationalParks();
  
  // Combine source data with existing enriched data
  const areas = sourceAreas.map(source => {
    const existing = existingAreas.find(e => e.slug === source.slug);
    if (existing) return existing;
    
    // Create enriched entry from source
    return {
      id: source.id,
      slug: source.slug,
      name: source.name,
      category: 'national_park' as const,
      description: `${source.name} National Park - ${source.regionRaw}. Part of the Protected Area Network of Jammu and Kashmir.`,
      area: source.areaSqKm || 0,
      district: source.districtHint,
      established: 1981,
      ecosystems: ['Protected landscape'],
      keySpecies: [],
      latitude: 0,
      longitude: 0,
    };
  });

  const metrics = [
    { label: 'Total Parks', value: areas.length, icon: 'Mountain' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'Map' as const },
    { label: 'Districts', value: new Set(areas.map(pa => pa.district)).size, icon: 'MapPin' as const },
    { label: 'Key Species', value: 47, icon: 'Activity' as const },
    { label: 'Ecosystems', value: 14, icon: 'Leaf' as const },
    { label: 'Altitude Zones', value: 3, icon: 'TrendingUp' as const },
    { label: 'Est. (Earliest)', value: areas.length > 0 ? Math.min(...areas.map(pa => pa.established)) : 1981, icon: 'Shield' as const },
    { label: 'PA Coverage', value: '2,847 km²', icon: 'Eye' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir National</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Park Network</span></>}
      subtitle="Mountain and temperate forest conservation landscapes spanning Kashmir's protected, trans-divisional, and transboundary ecological zones. Integrates species profiles, boundary data, habitat intelligence, and conservation monitoring for each park."
      icon="Mountain"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
      sourceData={{
        title: 'Protected Area Network of Jammu and Kashmir',
        count: sourceAreas.length,
        totalArea: sourceAreas.reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0)
      }}
    />
  );
}
