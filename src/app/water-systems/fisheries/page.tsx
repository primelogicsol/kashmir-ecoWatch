'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { fisheriesData } from '@/data/water-systems';

export default function FisheriesPage() {
  const categories = [...new Set(fisheriesData.map(f => f.category))].sort();
  const districts  = [...new Set(fisheriesData.map(f => f.district))].filter(Boolean).sort();

  const trout      = fisheriesData.filter(f => f.fisheryData?.fishSpecies?.some(s => s.toLowerCase().includes('trout'))).length;
  const aquaculture = fisheriesData.filter(f => f.fisheryData?.fisheryType === 'aquaculture').length;
  const highProd   = fisheriesData.filter(f => f.fisheryData?.productivity === 'high').length;
  const threatened = fisheriesData.filter(f => f.threats && f.threats.length > 0).length;

  return (
    <WaterEntityListingPage
      title="Fisheries Across Greater Kashmir Ecology"
      description="Native fish systems, trout systems, snow trout systems, aquatic ecology, lake fisheries, stream fisheries, wetland aquatic communities, and biodiversity linked to freshwater habitats."
      icon="Fish"
      color="from-violet-500 to-purple-600"
      entities={fisheriesData}
      entityType="Fisheries"
      kpis={[
        { label: 'Total Fisheries', value: fisheriesData.length, icon: 'Fish'           },
        { label: 'Trout Systems',   value: trout,                icon: 'Waves',         color: 'text-violet-400' },
        { label: 'Aquaculture',     value: aquaculture,          icon: 'BarChart3',     color: 'text-purple-400' },
        { label: 'High Productivity', value: highProd,           icon: 'TrendingUp',    color: 'text-emerald-400'},
        { label: 'Under Threat',    value: threatened,           icon: 'AlertTriangle', color: 'text-amber-400'  },
        { label: 'Districts',       value: districts.length,     icon: 'MapPin'         },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/fisheries/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.fisheryData ? (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {entity.fisheryData.fishSpecies.slice(0, 4).map((sp, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {sp.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-xs text-slate-400">
              <span>Type: <span className="text-white capitalize">{entity.fisheryData.fisheryType}</span></span>
              <span>Productivity: <span className="text-white capitalize">{entity.fisheryData.productivity}</span></span>
            </div>
          </div>
        ) : null
      }
    />
  );
}
