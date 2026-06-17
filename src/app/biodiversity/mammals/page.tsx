'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData, biodiversityMetrics } from '@/data/biodiversity';

export default function MammalsPage() {
  const species = getBiodiversityData.mammals.all();

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
    habitats: ['Temperate forests', 'Alpine meadows', 'Riverine forests', 'Rocky terrain', 'Mountain slopes'],
    districts: ['Srinagar', 'Ganderbal', 'Anantnag', 'Kulgam', 'Kishtwar', 'Kargil'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Mammals Greater Kashmir Ecology"
      subtitle="A detailed conservation database mapping Kashmir's terrestrial mammals, from critically endangered high-altitude ungulates to forest carnivores. Integrating verified habitat boundaries, regional conservation frameworks, and detailed species population metrics across transboundary protected zones."
      icon="Mountain"
      color="from-emerald-500 to-teal-600"
      species={species}
      metrics={metrics}
      filters={filters}
      hideHabitatFilter={true}
      hideAdministrativeUnitFilter={true}
      hideElevationFilter={true}
    />
  );
}
