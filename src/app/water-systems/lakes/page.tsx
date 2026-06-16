'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { lakesData } from '@/data/water-systems';

export default function LakesPage() {
  const categories = [...new Set(lakesData.map(l => l.category))].sort();
  const districts  = [...new Set(lakesData.map(l => l.district))].filter(Boolean).sort();

  const ex = lakesData.filter(l => l.waterQuality?.status === 'excellent').length;
  const good = lakesData.filter(l => l.waterQuality?.status === 'good').length;
  const mod  = lakesData.filter(l => l.waterQuality?.status === 'moderate').length;
  const poor = lakesData.filter(l => l.waterQuality?.status === 'poor').length;
  const crit = lakesData.filter(l => l.waterQuality?.status === 'critical').length;
  const highAlt = lakesData.filter(l => l.category?.includes('High-Altitude') || l.category?.includes('Alpine') || l.category?.includes('Glacial')).length;
  const withThreats = lakesData.filter(l => l.threats && l.threats.length > 0).length;

  return (
    <WaterEntityListingPage
      title="All Lakes of Kashmir"
      description="Comprehensive inventory of every major, minor, urban, rural, high-altitude, floodplain, and district-level lake mapped across Kashmir. Includes water quality, biodiversity, hydrology, and threat monitoring."
      icon="Droplet"
      color="from-blue-500 to-cyan-600"
      entities={lakesData}
      entityType="Lakes"
      kpis={[
        { label: 'Total Lakes',    value: lakesData.length, icon: 'Droplet'       },
        { label: 'Excellent',      value: ex,               icon: 'CheckCircle',   color: 'text-emerald-400' },
        { label: 'Good',           value: good,             icon: 'Activity',      color: 'text-green-400'   },
        { label: 'Moderate',       value: mod,              icon: 'Thermometer',   color: 'text-amber-400'   },
        { label: 'Poor',           value: poor,             icon: 'AlertTriangle', color: 'text-orange-400'  },
        { label: 'Critical',       value: crit,             icon: 'AlertOctagon',  color: 'text-red-400'     },
        { label: 'High Altitude',  value: highAlt,          icon: 'Mountain'       },
        { label: 'With Threats',   value: withThreats,      icon: 'ShieldAlert',   color: 'text-amber-400'   },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/lakes/${entity.slug}`}
      getCategory={entity => entity.category}
    />
  );
}
