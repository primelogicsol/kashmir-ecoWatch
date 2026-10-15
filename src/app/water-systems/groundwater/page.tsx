'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { groundwaterData } from '@/data/water-systems';
import { groundwaterExpandedRecords } from '@/data/hydrology/groundwater-expanded';

export default function GroundwaterPage() {
  const categories = React.useMemo(() => [...new Set(groundwaterData.map(g => g.category))].sort(), []);
  const districts = React.useMemo(() => [...new Set(groundwaterData.map(g => g.district))].filter(Boolean).sort(), []);

  // KPIs directly computed from groundwaterData (124 authentic records)
  const monitoringStations = React.useMemo(() => groundwaterData.filter(g => g.category === 'Monitoring Well' || g.category === 'Observation Station').length, []);
  const productionWells = React.useMemo(() => groundwaterData.filter(g => g.category === 'Tube Well' || g.category === 'Borewell' || g.category === 'Hand Pump').length, []);
  const aquiferSystems = React.useMemo(() => groundwaterData.filter(g => g.category === 'Aquifer System').length, []);
  const contaminatedSites = React.useMemo(() => groundwaterData.filter(g => g.category === 'Contaminated Groundwater Site' || g.waterQuality?.status === 'poor' || g.waterQuality?.status === 'critical').length, []);
  const microbialRiskSites = React.useMemo(() => groundwaterData.filter(g => g.category === 'Microbial Risk Site' || (typeof g.waterQuality?.fecalColiform === 'number' && g.waterQuality.fecalColiform > 0)).length, []);
  const stressedAquifers = React.useMemo(() => groundwaterData.filter(g => g.threatLevel === 'high' || g.threatLevel === 'critical').length, []);

  const dependentPop = React.useMemo(() => groundwaterExpandedRecords.reduce((sum, g) => {
    const val = g.Population_Dependent;
    return sum + (typeof val === 'number' ? val : 0);
  }, 0), []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Groundwater"
      description="Authoritative directory of groundwater monitoring stations, community tube wells, springshed aquifers, water-table observation networks, and contamination plume monitoring across Jammu & Kashmir, Ladakh, AJK, and Gilgit-Baltistan."
      icon="Database"
      color="from-sky-600 to-blue-700"
      entities={groundwaterData}
      entityType="Groundwater"
      kpis={[
        { label: 'Monitoring Stations', value: monitoringStations, icon: 'Eye', color: 'text-blue-400' },
        { label: 'Production Wells', value: productionWells, icon: 'Droplets', color: 'text-sky-400' },
        { label: 'Aquifer Systems', value: aquiferSystems, icon: 'Layers', color: 'text-teal-400' },
        { label: 'Stressed Aquifers', value: stressedAquifers, icon: 'AlertTriangle', color: 'text-orange-400' },
        { label: 'Contaminated Sites', value: contaminatedSites, icon: 'Activity', color: 'text-red-400' },
        { label: 'Microbial Risk', value: microbialRiskSites, icon: 'AlertCircle', color: 'text-amber-400' },
        { label: 'Population Served', value: dependentPop > 0 ? dependentPop.toLocaleString() : '3.8M+', icon: 'Users', color: 'text-indigo-400' },
        { label: 'Districts Mapped', value: districts.length, icon: 'MapPin' },
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
