'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { riversData } from '@/data/water-systems';
import { riversRecords } from '@/data/hydrology/rivers';

export default function RiversPage() {
  const lockedIds = React.useMemo(() => new Set(riversRecords.filter(r => r.Dashboard_Locked).map(r => r.id)), []);
  const activeRivers = React.useMemo(() => riversData.filter(r => !lockedIds.has(r.id)), [lockedIds]);

  const categories = [...new Set(riversData.map(r => r.category))].sort();
  const districts  = [...new Set(activeRivers.map(r => r.district))].filter(Boolean).sort();

  const major     = activeRivers.filter(r => r.category?.toLowerCase().includes('major')).length;
  const streams   = activeRivers.filter(r => r.type === 'stream').length;
  const goodPlus  = activeRivers.filter(r => ['excellent','good'].includes(r.waterQuality?.status||'')).length;
  const threatened= activeRivers.filter(r => r.threats && r.threats.length > 0).length;
  const withFlow  = activeRivers.filter(r => r.hydrologicalData?.discharge).length;
  const transboundary = activeRivers.filter(r => r.district?.toLowerCase().includes('neelum') || r.district?.toLowerCase().includes('hunza') || r.district?.toLowerCase().includes('gilgit')).length;

  return (
    <WaterEntityListingPage
      title="All Rivers and Streams of Kashmir"
      description="Complete inventory of major rivers, tributaries, district streams, cold-water streams, drainage-linked natural channels, and ecologically significant flow systems."
      icon="Wind"
      color="from-indigo-600 to-indigo-600"
      entities={activeRivers}
      entityType="Rivers & Streams"
      kpis={[
        { label: 'Total Rivers',    value: activeRivers.length, icon: 'Wind'          },
        { label: 'Major Rivers',    value: major,               icon: 'Waves',         color: 'text-indigo-400'  },
        { label: 'Streams',         value: streams,             icon: 'GitBranch',     color: 'text-purple-400'  },
        { label: 'Good+ Quality',   value: goodPlus,            icon: 'Activity',      color: 'text-green-400'   },
        { label: 'With Flow Data',  value: withFlow,            icon: 'BarChart3',     color: 'text-cyan-400'    },
        { label: 'Under Threat',    value: threatened,          icon: 'AlertTriangle', color: 'text-amber-400'   },
        { label: 'Transboundary',   value: transboundary,       icon: 'Globe',         color: 'text-sky-400'     },
        { label: 'Districts',       value: districts.length,    icon: 'MapPin'         },
      ]}
      filters={{
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      hideDistrictFilter={true}
      getEntitySlug={entity => `/water-systems/rivers/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.length ? { label: 'Length', value: `${entity.length} km` } : null}
    />
  );
}
