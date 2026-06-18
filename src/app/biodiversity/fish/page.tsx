'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';

export default function FishPage() {
  const species = getBiodiversityData.fish.all();

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
    habitats: ['Cold mountain streams', 'Rivers', 'Lakes', 'Wetlands', 'Glacial-fed waters'],
    districts: ['All districts'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Western Himalayan Aquatic Life"
      subtitle="An aquatic biodiversity matrix analyzing freshwater fish and associated aquatic life across Kashmir's intricate river and lake networks. Integrating critical hydrological parameters, endemic population baselines, and environmental sensitivity indexing for continuous aquatic conservation monitoring."
      icon="Droplet"
      color="from-cyan-500 to-blue-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
