'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { waterQualitySites } from '@/data/water-systems';

export default function WaterQualityPage() {
  const categories = [...new Set(waterQualitySites.map(w => w.category))].sort();
  const districts  = [...new Set(waterQualitySites.map(w => w.district))].filter(Boolean).sort();

  const ex     = waterQualitySites.filter(w => w.waterQuality?.status === 'excellent').length;
  const good   = waterQualitySites.filter(w => w.waterQuality?.status === 'good').length;
  const mod    = waterQualitySites.filter(w => w.waterQuality?.status === 'moderate').length;
  const poor   = waterQualitySites.filter(w => w.waterQuality?.status === 'poor').length;
  const crit   = waterQualitySites.filter(w => w.waterQuality?.status === 'critical').length;
  const highDO = waterQualitySites.filter(w => (w.waterQuality?.dissolvedOxygen || 0) > 7).length;

  return (
    <WaterEntityListingPage
      title="Water Quality Greater Kashmir Ecology"
      description="Lake quality, wetland quality, river and stream quality, spring quality, catchment-linked water stress, site-based monitoring with dissolved oxygen, pH, turbidity, BOD and trend tracking."
      icon="Thermometer"
      color="from-teal-500 to-cyan-600"
      entities={waterQualitySites}
      entityType="Quality Sites"
      kpis={[
        { label: 'Total Sites',  value: waterQualitySites.length, icon: 'Thermometer'                     },
        { label: 'Excellent',    value: ex,                       icon: 'CheckCircle', color: 'text-emerald-400' },
        { label: 'Good',         value: good,                     icon: 'Activity',    color: 'text-green-400'   },
        { label: 'Moderate',     value: mod,                      icon: 'Minus',       color: 'text-amber-400'   },
        { label: 'Poor',         value: poor,                     icon: 'TrendingDown',color: 'text-orange-400'  },
        { label: 'Critical',     value: crit,                     icon: 'AlertOctagon',color: 'text-red-400'     },
        { label: 'High DO (>7)', value: highDO,                   icon: 'Droplet',     color: 'text-cyan-400'    },
        { label: 'Districts',    value: districts.length,         icon: 'MapPin'                           },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical'],
      }}
      getEntitySlug={entity => `/water-systems/water-quality/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.waterQuality ? (
          <div className="mb-2 p-2.5 rounded-lg bg-slate-800/60 border border-white/5">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">DO</span>
                <span className="text-white font-semibold">{entity.waterQuality.dissolvedOxygen} mg/L</span>
              </div>
              <div>
                <span className="text-slate-500 block">Turbidity</span>
                <span className="text-white font-semibold">{entity.waterQuality.turbidity} NTU</span>
              </div>
              <div>
                <span className="text-slate-500 block">BOD</span>
                <span className="text-white font-semibold">{entity.waterQuality.biologicalOxygenDemand} mg/L</span>
              </div>
            </div>
          </div>
        ) : null
      }
    />
  );
}
