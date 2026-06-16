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

  return (
    <WaterEntityListingPage
      title="All Glaciers and Cryosphere of Kashmir"
      description="Glaciers, glacial lakes, snow-fed systems, seasonal snow cover, high-altitude cryosphere-linked catchments, and downstream hydrological dependence across the Kashmir Himalaya and Karakoram."
      icon="Mountain"
      color="from-slate-400 to-slate-600"
      entities={glaciersData}
      entityType="Glaciers"
      kpis={[
        { label: 'Total Glaciers',  value: glaciersData.length, icon: 'Mountain'       },
        { label: 'Retreating',      value: retreating,          icon: 'TrendingDown',  color: 'text-red-400'     },
        { label: 'Glacial Lakes',   value: glacialLakes,        icon: 'Droplet',       color: 'text-blue-400'    },
        { label: 'Above 4000m',     value: highAlt,             icon: 'ArrowUp',       color: 'text-slate-300'   },
        { label: 'With Area Data',  value: withArea,            icon: 'BarChart3',     color: 'text-cyan-400'    },
        { label: 'Districts',       value: districts.length,    icon: 'MapPin'         },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/glaciers/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.area ? { label: 'Area', value: `${entity.area} km²` } : null}
    />
  );
}
