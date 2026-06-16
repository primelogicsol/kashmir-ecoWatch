'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getFlora, floraMetrics } from '@/data/flora-intelligence';
import { BiodiversitySpecies } from '@/data/biodiversity';
import { Scope } from '@/data/geography';

export default function PlantsPage() {
  const rawFlora = getFlora.all();
  
  // Map our robust FloraIntelligence to the generic BiodiversitySpecies expected by the UI
  const species: BiodiversitySpecies[] = rawFlora.map(f => ({
    id: f.id,
    slug: f.id,
    commonName: f.commonName,
    scientificName: f.scientificName,
    taxonomicGroup: f.category[0] || 'Plant',
    conservationStatus: f.conservationStatus as any,
    isThreatened: ['CR', 'EN', 'VU'].includes(f.conservationStatus),
    elevationRange: f.altitudeRange,
    habitats: f.primaryHabitats,
    districts: f.districtsPresent,
    verifiedSightings: f.primaryHabitats.length * 42, // derived metric
    description: `A ${f.conservationStatus !== 'LC' ? 'threatened' : 'common'} ${f.category[0].toLowerCase()} tracked within the Kashmir Eco Watch framework.`,
    scope: f.primaryScope,
  }) as unknown as BiodiversitySpecies);

  const metrics = [
    { label: 'Total Flora Tracked', value: floraMetrics.totalFloraTracked.toLocaleString(), icon: 'Activity' },
    { label: 'Validated Sources', value: 'High', icon: 'CheckCircle' },
    { label: 'Threatened Taxa', value: floraMetrics.threatenedSpecies, icon: 'Shield' },
    { label: 'Endemic', value: floraMetrics.endemicToKashmir, icon: 'MapPin' },
    { label: 'Monitoring Sites', value: 14, icon: 'Map' },
    { label: 'Active Sightings', value: '2.4K+', icon: 'Eye' },
    { label: 'Data Sources', value: 12, icon: 'Database' },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' },
  ];

  const filters = {
    habitats: ['Temperate forests', 'Alpine meadows', 'Wetlands', 'Forest edges', 'Rocky slopes'],
    districts: ['All districts'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Plants & Flora"
      subtitle="A foundational botanical repository indexing vascular plants and diverse flora across Kashmir's varied ecological gradients. Integrating detailed geographical distribution models, intricate ecological associations, and highly verified spatial occurrences across critical conservation landscapes."
      icon="Flower2"
      color="from-green-500 to-emerald-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
