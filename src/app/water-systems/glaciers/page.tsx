'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { glaciersData } from '@/data/water-systems';

export default function GlaciersPage() {
  const categories = [...new Set(glaciersData.map(g => g.category))].sort();
  const districts  = [...new Set(glaciersData.map(g => g.district))].filter(Boolean).sort();

  const retreating = glaciersData.filter(g => g.threats?.some(t => t.toLowerCase().includes('retreat') || t.toLowerCase().includes('melting'))).length;
  const valleyGlaciers = glaciersData.filter(g => g.category === 'Valley Glacier').length;
  const cirqueGlaciers = glaciersData.filter(g => g.category === 'Cirque Glacier' || g.category === 'Hanging Glacier').length;
  const surgeAndGlosRisk = glaciersData.filter(g => g.category === 'Surge Glacier' || g.hydrologicalData?.floodRisk === 'high' || g.hydrologicalData?.floodRisk === 'critical').length;
  const highAlt = glaciersData.filter(g => (g.elevation || 0) >= 4000).length;
  const totalGlaciatedArea = Math.round(glaciersData.reduce((sum, g) => sum + (g.area || 0), 0));

  return (
    <WaterEntityListingPage
      title="Western Himalayan Cryosphere"
      description="Authoritative directory of glaciers, hanging cirques, surging ice streams, periglacial rock glaciers, and high-altitude meltwater catchments across the Kashmir Himalaya, Ladakh, Zanskar, Karakoram, and Pir Panjal."
      icon="Mountain"
      color="from-slate-400 to-slate-600"
      entities={glaciersData}
      entityType="Glaciers"
      kpis={[
        { label: 'Total Glaciers', value: glaciersData.length, icon: 'Mountain', color: 'text-sky-300' },
        { label: 'Valley Glaciers', value: valleyGlaciers, icon: 'Layers', color: 'text-blue-400' },
        { label: 'Cirques & Hangs', value: cirqueGlaciers, icon: 'Compass', color: 'text-teal-400' },
        { label: 'Surge & GLOF Risk', value: surgeAndGlosRisk, icon: 'AlertTriangle', color: 'text-amber-400' },
        { label: 'Retreating', value: retreating, icon: 'TrendingDown', color: 'text-rose-400' },
        { label: 'Above 4,000m', value: highAlt, icon: 'ArrowUp', color: 'text-indigo-400' },
        { label: 'Mapped Ice Area', value: `${totalGlaciatedArea.toLocaleString()} km²`, icon: 'BarChart3', color: 'text-cyan-400' },
        { label: 'Mountain Districts', value: districts.length, icon: 'MapPin' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/glaciers/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.area ? { label: 'Area', value: `${entity.area} km²` } : null}
    />
  );
}
