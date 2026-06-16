'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { restorationSites } from '@/data/water-systems';

export default function RestorationPage() {
  const categories = [...new Set(restorationSites.map(r => r.category))].sort();
  const districts  = [...new Set(restorationSites.map(r => r.district))].filter(Boolean).sort();

  const completed = restorationSites.filter(r => r.restorationData?.status === 'completed').length;
  const ongoing   = restorationSites.filter(r => r.restorationData?.status === 'ongoing').length;
  const planned   = restorationSites.filter(r => r.restorationData?.status === 'planned').length;
  const lakeRest  = restorationSites.filter(r => r.category?.toLowerCase().includes('lake')).length;
  const wetRest   = restorationSites.filter(r => r.category?.toLowerCase().includes('wetland')).length;

  return (
    <WaterEntityListingPage
      title="All Restoration and Rejuvenation Sites"
      description="Lake restoration, wetland restoration, spring rejuvenation, catchment treatment, river rehabilitation, recharge improvement, ecological desiltation, and hydrological restoration planning."
      icon="Hammer"
      color="from-lime-500 to-green-600"
      entities={restorationSites}
      entityType="Restoration Sites"
      kpis={[
        { label: 'Total Sites',   value: restorationSites.length, icon: 'Hammer'                         },
        { label: 'Completed',     value: completed,               icon: 'CheckCircle', color: 'text-emerald-400' },
        { label: 'Ongoing',       value: ongoing,                 icon: 'RefreshCw',   color: 'text-blue-400'    },
        { label: 'Planned',       value: planned,                 icon: 'Calendar',    color: 'text-amber-400'   },
        { label: 'Lake Restore',  value: lakeRest,                icon: 'Droplet',     color: 'text-cyan-400'    },
        { label: 'Wetland Restore', value: wetRest,               icon: 'Waves',       color: 'text-sky-400'     },
        { label: 'Districts',     value: districts.length,        icon: 'MapPin'                         },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/restoration/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.restorationData ? (
          <div className="mb-2">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              entity.restorationData.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              entity.restorationData.status === 'ongoing'   ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-slate-500/20 text-slate-400 border border-slate-500/30'
            }`}>
              {entity.restorationData.status.toUpperCase()}
            </span>
            <p className="text-xs text-slate-400 mt-1 truncate">
              Agency: <span className="text-white">{entity.restorationData.implementingAgency}</span>
            </p>
          </div>
        ) : null
      }
    />
  );
}
