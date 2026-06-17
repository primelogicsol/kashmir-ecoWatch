'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';

export default function BirdsPage() {
  const species = getBiodiversityData.birds.all();

  const metrics = [
    { label: 'Target Slots', value: species.length, icon: 'Activity'  },
    { label: 'Validated Data', value: species.filter(s => (s as any).validationStatus !== 'Pending source validation').length, icon: 'CheckCircle'  },
    { label: 'Threatened Taxa', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield'  },
    { label: 'Endemic', value: species.filter(s => s.endemismStatus && s.endemismStatus.includes('endemic')).length, icon: 'MapPin'  },
    { label: 'Monitoring Sites', value: 14, icon: 'Map'  },
    { label: 'Active Sightings', value: '2.4K+', icon: 'Eye'  },
    { label: 'Data Sources', value: 12, icon: 'Database'  },
    { label: 'Latest Update', value: 'Today', icon: 'Clock'  },
  ];

  const filters = {
    habitats: ['Wetlands', 'Temperate forests', 'Alpine meadows', 'Forest edges', 'Riparian forests'],
    districts: ['Srinagar', 'Ganderbal', 'Anantnag', 'Kulgam', 'Kishtwar'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Birds Across Greater Kashmir Ecology"
      subtitle="A comprehensive ornithological intelligence layer tracking resident and migratory bird populations across Kashmir's ecosystems. Integrating seasonal flight corridors, breeding habitat parameters, and specialized environmental signals to support targeted wetland and alpine conservation initiatives."
      icon="Activity"
      color="from-sky-500 to-blue-600"
      species={species}
      metrics={metrics}
      filters={filters}
      hideHabitatFilter={true}
      hideAdministrativeUnitFilter={true}
      hideElevationFilter={true}
    />
  );
}
