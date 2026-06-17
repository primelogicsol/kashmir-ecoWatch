'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { floodRiskZones } from '@/data/water-systems';

export default function FloodRiskPage() {
  const categories = [...new Set(floodRiskZones.map(f => f.category))].sort();
  const districts  = [...new Set(floodRiskZones.map(f => f.district))].filter(Boolean).sort();

  const criticalRisk = floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'critical').length;
  const highRisk     = floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'high').length;
  const modLowRisk   = floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'moderate' || f.floodRiskData?.riskLevel === 'low').length;
  const flash        = floodRiskZones.filter(f => f.floodRiskData?.floodType?.includes('flash')).length;
  const glacial      = floodRiskZones.filter(f => f.floodRiskData?.floodType?.includes('glacial')).length;

  return (
    <WaterEntityListingPage
      title="Flood Risk Across Greater Kashmir Ecology"
      description="Floodplains, flash-flood corridors, overflow zones, glacial-melt-linked risk, wetland flood buffering, riverbank vulnerability, waterlogging zones, and hydrological hazard sensitivity mapping."
      icon="AlertTriangle"
      color="from-red-500 to-rose-600"
      entities={floodRiskZones}
      entityType="Flood Risk Zones"
      kpis={[
        { label: 'Total Zones',    value: floodRiskZones.length, icon: 'MapPin' },
        { label: 'Critical Risk',  value: criticalRisk,          icon: 'AlertOctagon' },
        { label: 'High Risk',      value: highRisk,              icon: 'AlertCircle' },
        { label: 'Mod/Low Risk',   value: modLowRisk,            icon: 'Shield' },
        { label: 'Flash Flood',    value: flash,                 icon: 'Zap' },
        { label: 'GLOF Risk',      value: glacial,               icon: 'Mountain' },
        { label: 'Districts',      value: districts.length,      icon: 'Map' },
        { label: 'Latest Update',  value: 'Today',               icon: 'Clock' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/flood-risk/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.floodRiskData ? (
          <div className="mb-2">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              entity.floodRiskData.riskLevel === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
              entity.floodRiskData.riskLevel === 'high'     ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
              entity.floodRiskData.riskLevel === 'moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {entity.floodRiskData.riskLevel.toUpperCase()} RISK
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Type: <span className="text-white">{entity.floodRiskData.floodType?.replace(/-/g,' ')}</span>
            </p>
          </div>
        ) : null
      }
    />
  );
}
