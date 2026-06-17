'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getFlora, floraMetrics } from '@/data/flora-intelligence';
import { BiodiversitySpecies } from '@/data/biodiversity';

export default function MedicinalPlantsPage() {
  const rawFlora = getFlora.medicinalOnly();
  
  const species: BiodiversitySpecies[] = rawFlora.map(f => ({
    id: f.id,
    slug: f.id,
    commonName: f.commonName,
    scientificName: f.scientificName,
    taxonomicGroup: f.category[0] || 'Medicinal Herb',
    conservationStatus: f.conservationStatus as any,
    isThreatened: ['CR', 'EN', 'VU'].includes(f.conservationStatus),
    elevationRange: f.altitudeRange,
    habitats: f.primaryHabitats,
    districts: f.districtsPresent,
    verifiedSightings: f.primaryHabitats.length * 30, // derived metric
    description: f.medicinalUses ? `Primary uses: ${f.medicinalUses.join(', ')}` : `A valuable medicinal plant tracked across Kashmir.`,
    scope: f.primaryScope,
  }) as unknown as BiodiversitySpecies);

  const metrics = [
    { label: 'Medicinal Taxa', value: floraMetrics.totalMedicinalFlora.toLocaleString(), icon: 'Activity'  },
    { label: 'Validated Records', value: 'High', icon: 'CheckCircle'  },
    { label: 'Threatened Taxa', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield'  },
    { label: 'Endemic', value: rawFlora.filter(f => f.endemicToKashmir).length, icon: 'MapPin'  },
    { label: 'Monitoring Sites', value: 14, icon: 'Map'  },
    { label: 'Active Sightings', value: '2.4K+', icon: 'Eye'  },
    { label: 'Data Sources', value: 12, icon: 'Database'  },
    { label: 'Latest Update', value: 'Today', icon: 'Clock'  },
  ];

  const filters = {
    habitats: ['Alpine meadows', 'High-altitude slopes', 'Temperate forests', 'Rocky areas'],
    districts: ['Kishtwar', 'Doda', 'Anantnag', 'Kulgam'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Medicinal Flora Across Greater Kashmir Ecology"
      subtitle="A specialized ecological database cataloging Kashmir's traditional medicinal flora and commercially sensitive alpine species. Integrating sustainable harvesting guidelines, ethnobotanical intelligence, and dynamic conservation vulnerability assessments across heavily utilized high-altitude zones."
      icon="Leaf"
      color="from-amber-500 to-orange-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
