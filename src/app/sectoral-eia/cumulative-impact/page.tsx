'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { SectoralImpactMap } from '@/components/sectoral-eia/SectoralImpactMap';
import { CUMULATIVE_IMPACT_HOTSPOTS } from '@/data/sectoral-eia';
import { 
  Network, 
  Layers, 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  ArrowRight,
  Droplet,
  Compass,
  TreePine,
  Hammer,
  Wheat,
  Activity
} from 'lucide-react';

export default function CumulativeImpactPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Multi-Sector Stress Confluence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Cumulative Impact' }
        ]}
        icon={<Network className="w-6 h-6 text-rose-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Cumulative Impact & Compounding Stress Modeling
          </span>
        }
        subtitle="Evaluating the combined, non-linear pressures when tourism, horticulture, handicrafts, and agriculture converge upon shared watersheds and fragile alpine basins."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-12 max-w-6xl">
        {/* CONCEPTUAL MANDATE */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-rose-400 text-rose-300 bg-rose-500/10 text-xs">
              Process 06
            </Badge>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              The Cumulative Conundrum
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Why Single-Sector Assessments Miss Systemic Tipping Points
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
            In mountain eco-regions like the Kashmir Valley, individual commercial operations rarely trigger environmental collapse on their own. Collapse happens through <span className="text-rose-400 font-semibold">synergistic compounding</span>: when houseboat blackwater meets upstream craft dye effluents, or when apple orchard fungicides mix with rice paddy nitrate surges in the same lake inflow.
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-2">
            Our cumulative modeling engine applies multi-criteria spatial stress indexes to map exactly where sectoral pressures intersect and accelerate ecosystem collapse.
          </p>
        </div>

        {/* CUMULATIVE HOTSPOTS LEDGER */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Priority Cumulative Stress Hotspots ({CUMULATIVE_IMPACT_HOTSPOTS.length})</span>
            </h3>
            <span className="text-xs text-rose-400 font-medium">Ranked by Composite Ecological Strain</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CUMULATIVE_IMPACT_HOTSPOTS.map((hotspot) => (
              <Card key={hotspot.id} className="p-6 bg-slate-900/90 border-rose-500/30 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/30">
                      {hotspot.mitigationPriority}
                    </span>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Stress Index</span>
                      <span className="text-lg font-bold text-rose-400 font-mono">
                        {hotspot.stressIndex} <span className="text-xs text-slate-400">/ 100</span>
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">{hotspot.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {hotspot.synergyDescription}
                  </p>

                  <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-lg border border-white/5 mb-4">
                    <div>
                      <span className="text-slate-400 font-semibold block">Converging Sectors:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {hotspot.convergingSectors.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-white capitalize">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-slate-400 font-semibold block">Primary Ecosystem Receptors:</span>
                      <span className="text-slate-200">{hotspot.primaryReceptors.join(' • ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Districts: {hotspot.districts.join(', ')}</span>
                  <Link
                    href={`/sectoral-eia/impact-atlas`}
                    className="inline-flex items-center gap-1 font-semibold text-rose-400 hover:text-rose-300"
                  >
                    <span>Inspect on GIS Atlas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* MULTI-SECTOR INTERACTION CROSS-MATRIX */}
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
          <h3 className="text-xl font-bold text-white">Cross-Sector Interaction Matrix</h3>
          <p className="text-xs text-slate-300">
            How key economic activities amplify environmental degradation across shared resources:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950">
                  <th className="p-3 text-slate-400 font-bold">Sector Intersection</th>
                  <th className="p-3 text-slate-400 font-bold">Shared Environmental Resource</th>
                  <th className="p-3 text-slate-400 font-bold">Compounding Mechanism</th>
                  <th className="p-3 text-slate-400 font-bold">Synergistic Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-3 font-semibold text-amber-300">Tourism &times; Handicrafts</td>
                  <td className="p-3 text-slate-300">Urban Waterways (Brari Nambal, Dal Lake)</td>
                  <td className="p-3 text-slate-300">Houseboat organic sewage creates anoxic sludge that binds toxic heavy metals from craft dye effluents, preventing natural sediment breakdown.</td>
                  <td className="p-3 font-bold text-rose-400">Severe Compounding</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-300">Horticulture &times; Agriculture</td>
                  <td className="p-3 text-slate-300">Groundwater Aquifers & Springs (Shopian, Kulgam)</td>
                  <td className="p-3 text-slate-300">High-density apple borewells lower the water table while agricultural nitrate leaching concentrates chemical toxicity in diminished spring flows.</td>
                  <td className="p-3 font-bold text-rose-400">Critical Compounding</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-lime-300">Agriculture &times; Horticulture</td>
                  <td className="p-3 text-slate-300">Wular Lake & Floodplain Wetlands</td>
                  <td className="p-3 text-slate-300">Paddy fertilizer surges supply nitrogen and phosphorus while orchard runoff supplies fungicides, destroying microbial balance and triggering massive weed overgrowth.</td>
                  <td className="p-3 font-bold text-amber-400">High Compounding</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-cyan-300">Tourism &times; Handicrafts</td>
                  <td className="p-3 text-slate-300">Old-Growth Walnut & Willow Stands</td>
                  <td className="p-3 text-slate-300">Tourist demand for luxury wood carvings increases illicit old-growth timber harvest, accelerating slope instability in tributary valleys.</td>
                  <td className="p-3 font-bold text-amber-400">Moderate Compounding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* GIS HOTSPOT MAP */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Spatial Cumulative Confluence Atlas</h3>
          <SectoralImpactMap className="h-[440px]" />
        </div>
      </div>
    </main>
  );
}
