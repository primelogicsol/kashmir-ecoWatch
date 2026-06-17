'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { glaciersData } from '@/data/water-systems';

export default function GlaciersPage() {
  const categories = [...new Set(glaciersData.map(g => g.category))].sort();
  const districts  = [...new Set(glaciersData.map(g => g.district))].filter(Boolean).sort();

  const retreating = glaciersData.filter(g => g.threats?.some(t => t.toLowerCase().includes('retreat') || t.toLowerCase().includes('melting'))).length;
  const glacialLakes = glaciersData.filter(g => g.category?.toLowerCase().includes('glacial lake')).length;
  const withArea   = glaciersData.filter(g => g.area).length;
  const highAlt    = glaciersData.filter(g => (g.elevation || 0) > 4000).length;
  const verified   = glaciersData.filter(g => g.verificationStatus === 'verified').length;

  return (
    <WaterEntityListingPage
      title="Cryosphere Across Greater Kashmir Ecology"
      description="Glaciers, glacial lakes, snow-fed systems, seasonal snow cover, high-altitude cryosphere-linked catchments, and downstream hydrological dependence across the Kashmir Himalaya and Karakoram."
      icon="Mountain"
      color="from-slate-400 to-slate-600"
      entities={glaciersData}
      entityType="Glaciers"
      kpis={[
        { label: 'Total Glaciers',  value: glaciersData.length, icon: 'Mountain'       },
        { label: 'Verified Sites',  value: verified,            icon: 'CheckCircle'    },
        { label: 'Retreating',      value: retreating,          icon: 'TrendingDown'   },
        { label: 'Glacial Lakes',   value: glacialLakes,        icon: 'Droplet'        },
        { label: 'Above 4000m',     value: highAlt,             icon: 'ArrowUp'        },
        { label: 'With Area Data',  value: withArea,            icon: 'BarChart3'      },
        { label: 'Districts',       value: districts.length,    icon: 'MapPin'         },
        { label: 'Latest Update',   value: 'Today',             icon: 'Clock'          },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/glaciers/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.area ? { label: 'Area', value: `${entity.area} km²` } : null}
    />
  );
}
