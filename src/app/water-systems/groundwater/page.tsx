'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { groundwaterData } from '@/data/water-systems';
import { groundwaterExpandedRecords } from '@/data/hydrology/groundwater-expanded';

export default function GroundwaterPage() {
  const categories = React.useMemo(() => [...new Set(groundwaterData.map(g => g.category))].sort(), []);
  const districts = React.useMemo(() => [...new Set(groundwaterData.map(g => g.district))].filter(Boolean).sort(), []);

  // KPIs
  const monitoringWells = React.useMemo(() => groundwaterData.filter(g => g.category === 'Monitoring Well' || g.category === 'Observation Station').length, []);
  const tubeWells = React.useMemo(() => groundwaterData.filter(g => g.category === 'Tube Well' || g.category === 'Borewell' || g.category === 'Hand Pump').length, []);
  
  const stressedCount = React.useMemo(() => groundwaterExpandedRecords.filter(g => ['High', 'Critical'].includes(g.Groundwater_Stress_Level || 'Low')).length, []);
  const poorOrCriticalQuality = React.useMemo(() => groundwaterExpandedRecords.filter(g => ['Poor', 'Critical'].includes(g.Water_Quality_Status || 'Moderate')).length, []);
  const highColiform = React.useMemo(() => groundwaterExpandedRecords.filter(g => typeof g.Fecal_Coliform === 'number' && g.Fecal_Coliform > 0).length, []);
  
  const dependentPop = React.useMemo(() => groundwaterExpandedRecords.reduce((sum, g) => {
    const val = g.Population_Dependent;
    return sum + (typeof val === 'number' ? val : 0);
  }, 0), []);

  return (
    <WaterEntityListingPage
      title="Groundwater Across Greater Kashmir Ecology"
      description="Authoritative directory of groundwater monitoring stations, community tube wells, springshed aquifers, and water-table observation networks across Jammu & Kashmir, Ladakh, AJK, and Gilgit-Baltistan."
      icon="Database"
      color="from-sky-600 to-blue-700"
      entities={groundwaterData}
      entityType="Groundwater"
      kpis={[
        { label: 'Monitoring Stations', value: monitoringWells, icon: 'Eye', color: 'text-blue-400' },
        { label: 'Production Wells', value: tubeWells, icon: 'Droplets', color: 'text-sky-400' },
        { label: 'Stressed Aquifers', value: stressedCount, icon: 'AlertTriangle', color: 'text-orange-400' },
        { label: 'Contaminated Sites', value: poorOrCriticalQuality, icon: 'Activity', color: 'text-red-400' },
        { label: 'Microbial Risk', value: highColiform, icon: 'AlertCircle', color: 'text-amber-400' },
        { label: 'Population Served', value: dependentPop.toLocaleString(), icon: 'Users', color: 'text-indigo-400' },
        { label: 'Districts Mapped', value: districts.length, icon: 'MapPin' },
        { label: 'Record Types', value: categories.length, icon: 'Layers' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/groundwater/${entity.slug}`}
      getCategory={entity => entity.category}
    />
  );
}
