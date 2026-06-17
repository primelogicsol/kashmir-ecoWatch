'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { springsData } from '@/data/water-systems';

export default function SpringsPage() {
  const categories = React.useMemo(() => [...new Set(springsData.map(s => s.category))].sort(), []);
  const districts  = React.useMemo(() => [...new Set(springsData.map(s => s.district))].filter(Boolean).sort(), []);

  const perennial  = React.useMemo(() => springsData.filter(s => s.hydrologicalData?.seasonalVariation === 'perennial').length, []);
  const seasonal   = React.useMemo(() => springsData.filter(s => s.hydrologicalData?.seasonalVariation === 'seasonal').length, []);
  const hotSprings = React.useMemo(() => springsData.filter(s => s.category?.toLowerCase().includes('hot') || s.category?.toLowerCase().includes('thermal')).length, []);
  const goodPlus   = React.useMemo(() => springsData.filter(s => ['excellent','good'].includes(s.waterQuality?.status||'')).length, []);
  const threatened = React.useMemo(() => springsData.filter(s => s.threats && s.threats.length > 0).length, []);

  return (
    <WaterEntityListingPage
      title="Springs Greater Kashmir Ecology"
      description="Mapped springs, community springs, seasonal springs, perennial springs, springsheds, recharge-linked spring systems, and spring restoration sites across the Kashmir region."
      icon="Droplet"
      color="from-emerald-600 to-emerald-600"
      entities={springsData}
      entityType="Springs"
      kpis={[
        { label: 'Total Springs',  value: springsData.length, icon: 'Droplet'       },
        { label: 'Perennial',      value: perennial,          icon: 'RefreshCw',      color: 'text-emerald-400' },
        { label: 'Seasonal',       value: seasonal,           icon: 'Sun',            color: 'text-amber-400'   },
        { label: 'Hot Springs',    value: hotSprings,         icon: 'Flame',          color: 'text-orange-400'  },
        { label: 'Good+ Quality',  value: goodPlus,           icon: 'Activity',       color: 'text-green-400'   },
        { label: 'Under Threat',   value: threatened,         icon: 'AlertTriangle',  color: 'text-amber-400'   },
        { label: 'Districts',      value: districts.length,   icon: 'MapPin'          },
        { label: 'Categories',     value: categories.length,  icon: 'Layers'          },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/springs/${entity.slug}`}
      getCategory={entity => entity.category}
    />
  );
}
