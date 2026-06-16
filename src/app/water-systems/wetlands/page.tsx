'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { wetlandsData } from '@/data/water-systems';

export default function WetlandsPage() {
  const categories = [...new Set(wetlandsData.map(w => w.category))].sort();
  const districts  = [...new Set(wetlandsData.map(w => w.district))].filter(Boolean).sort();

  const ramsar    = wetlandsData.filter(w => w.category?.toLowerCase().includes('ramsar')).length;
  const conserv   = wetlandsData.filter(w => w.category?.toLowerCase().includes('conservation')).length;
  const withBirds = wetlandsData.filter(w => w.biodiversity?.some(b => b.toLowerCase().includes('bird') || b.toLowerCase().includes('goose') || b.toLowerCase().includes('crane'))).length;
  const threatened= wetlandsData.filter(w => w.threats && w.threats.length > 0).length;
  const goodPlus  = wetlandsData.filter(w => ['excellent','good'].includes(w.waterQuality?.status||'')).length;

  return (
    <WaterEntityListingPage
      title="All Wetlands of Kashmir"
      description="Comprehensive inventory of all marshes, floodplain wetlands, shallow-water habitats, reedbeds, bird-use wetlands, Ramsar-linked wetlands, and district-level wetland landscapes."
      icon="Waves"
      color="from-sky-500 to-blue-600"
      entities={wetlandsData}
      entityType="Wetlands"
      kpis={[
        { label: 'Total Wetlands',  value: wetlandsData.length, icon: 'Waves'         },
        { label: 'Ramsar Sites',    value: ramsar,              icon: 'Globe',         color: 'text-cyan-400'    },
        { label: 'Conservation',    value: conserv,             icon: 'ShieldCheck',   color: 'text-emerald-400' },
        { label: 'Bird Habitats',   value: withBirds,           icon: 'Bird',          color: 'text-sky-400'     },
        { label: 'Good+ Quality',   value: goodPlus,            icon: 'Activity',      color: 'text-green-400'   },
        { label: 'Under Threat',    value: threatened,          icon: 'AlertTriangle', color: 'text-amber-400'   },
        { label: 'Districts',       value: districts.length,    icon: 'MapPin'         },
        { label: 'Categories',      value: categories.length,   icon: 'Layers'         },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/wetlands/${entity.slug}`}
      getCategory={entity => entity.category}
    />
  );
}
