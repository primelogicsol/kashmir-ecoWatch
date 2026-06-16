'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { watershedsData } from '@/data/water-systems';
import { watershedsRecords } from '@/data/hydrology/watersheds';
import { watershedsExpandedRecords } from '@/data/hydrology/watersheds-expanded';

export default function WatershedsPage() {
  const lockedIds = React.useMemo(() => new Set(watershedsRecords.filter(w => w.Dashboard_Locked).map(w => w.id)), []);
  const activeWatersheds = React.useMemo(() => watershedsData.filter(w => !lockedIds.has(w.id)), [lockedIds]);

  const categories = [...new Set(activeWatersheds.map(w => w.category))].sort();
  const districts  = [...new Set(activeWatersheds.map(w => w.district))].filter(Boolean).sort();

  // Dynamic KPI calculations from full registry
  const allWatershedsCount = watershedsExpandedRecords.length;
  const majorCount = watershedsExpandedRecords.filter(r => ['Basin', 'Sub-Basin', 'Watershed'].includes(r.Watershed_Level)).length;
  const subCount = watershedsExpandedRecords.filter(r => ['Sub-Watershed', 'Catchment', 'Micro-Watershed'].includes(r.Watershed_Level)).length;
  const riverCount = watershedsExpandedRecords.filter(r => r.Main_River_or_Stream && r.Main_River_or_Stream !== 'None' && r.Main_River_or_Stream !== '').length;
  const lakeCount = watershedsExpandedRecords.filter(r => typeof r.Lake_Count === 'number' && r.Lake_Count > 0).length;
  const springCount = watershedsExpandedRecords.filter(r => typeof r.Spring_Count === 'number' && r.Spring_Count > 0).length;
  const floodCount = watershedsExpandedRecords.filter(r => ['High', 'Critical'].includes(r.Flood_Risk)).length;
  const restorationCount = watershedsExpandedRecords.filter(r => ['High', 'Critical'].includes(r.Restoration_Priority)).length;

  return (
    <WaterEntityListingPage
      title="All Watersheds of Kashmir"
      description={`Verified Base + GIS-Derived Expansion | ${allWatershedsCount} Hydrological Intelligence Units. Verified Jhelum Basin base dataset expanded into GIS-derived river catchments, lake catchments, spring catchments, flood-response units, and restoration-priority zones across Kashmir Core, Trans-Divisional, and Transboundary ecological scope.`}
      icon="Map"
      color="from-amber-600 to-amber-600"
      entities={activeWatersheds}
      entityType="Watersheds"
      kpis={[
        { label: 'All Watersheds', value: allWatershedsCount, icon: 'Map' },
        { label: 'Major Watersheds', value: majorCount, icon: 'Layers', color: 'text-amber-400' },
        { label: 'Sub-Watersheds', value: subCount, icon: 'Grid', color: 'text-orange-400' },
        { label: 'River Catchments', value: riverCount, icon: 'Wind', color: 'text-blue-400' },
        { label: 'Lake Catchments', value: lakeCount, icon: 'Waves', color: 'text-cyan-400' },
        { label: 'Spring Catchments', value: springCount, icon: 'Droplet', color: 'text-emerald-400' },
        { label: 'Flood Response Units', value: floodCount, icon: 'AlertTriangle', color: 'text-red-400' },
        { label: 'Restoration Priority Zones', value: restorationCount, icon: 'RefreshCw', color: 'text-purple-400' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/watersheds/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.area ? { label: 'Area', value: `${entity.area} km²` } : null}
    />
  );
}
