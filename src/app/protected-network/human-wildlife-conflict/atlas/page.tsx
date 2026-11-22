'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  Map,
  Shield,
  MapPin,
  Lock,
  Layers,
  Filter,
  Eye,
  Info,
  Compass,
  AlertTriangle
} from 'lucide-react';
import {
  COMMUNITY_EXPOSURE_ZONES,
  INCIDENT_REGISTRY,
  REGIONAL_METRICS,
  KewRegion
} from '@/data/human-wildlife-conflict';

export default function HwcAtlasPage() {
  const [activeRegion, setActiveRegion] = useState<KewRegion | 'All'>('All');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const filteredClusters = activeRegion === 'All'
    ? COMMUNITY_EXPOSURE_ZONES
    : COMMUNITY_EXPOSURE_ZONES.filter(z => z.region === activeRegion);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Conflict Atlas' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                GIS ATLAS
              </span>
              <span>Spatial Distribution</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Privacy-Safe Generalized Conflict Atlas
            </span>
          </>
        }
        subtitle="Regional geographic cluster analysis of settlement-wildlife interfaces, landscape exposure zones, and historical interaction density across the Western Himalaya."
        icon={<Map className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      {/* Sensitive Data Protection Banner */}
      <div className="bg-slate-900 border-b border-white/10 py-3 text-xs text-slate-400">
        <div className="container mx-auto px-4 sm:px-6 flex items-start sm:items-center gap-2.5">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong className="text-white">Strict Coordinate Generalization Policy:</strong> In compliance with the KEW Sensitive Ecological Information Policy and IUCN SSC Wildlife Security directives, all markers represent generalized landscape polygon centroids (~10km diameter). Exact incident coordinates, private homesteads, and active wildlife dens are excluded from public GIS rendering to prevent retaliatory actions or illegal poaching.
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Interactive Region Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span>Select Regional Geographic Division:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Kashmir Valley', 'Jammu', 'Ladakh', 'Azad Jammu and Kashmir', 'Gilgit-Baltistan'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-all ${
                  activeRegion === r
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Spatial Grid Showcase / Atlas Canvas Mockup */}
        <Card className="glass-intense border-white/10 p-6 rounded-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                REGIONAL GEOGRAPHIC CLUSTERS
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">
                Settlement–Forest Interface Density Clusters
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Generalized Grid Resolution: 10km² Polygon Centroid</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClusters.map((cluster) => (
              <div
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedCluster === cluster.id
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md'
                    : 'bg-white/5 border-white/10 hover:border-emerald-500/40 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {cluster.region} · {cluster.district}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">
                      {cluster.zoneName}
                    </h3>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border ${
                      cluster.exposureLevel === 'High Exposure'
                        ? 'bg-red-500/20 text-red-300 border-red-500/40'
                        : cluster.exposureLevel === 'Moderate Exposure'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    }`}
                  >
                    {cluster.exposureLevel}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                  <div>
                    <strong className="text-slate-300">Interface Type:</strong> {cluster.interfaceType}
                  </div>
                  <div>
                    <strong className="text-slate-300">Focal Species:</strong>{' '}
                    <span className="text-emerald-300">{cluster.primarySpecies.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-slate-300">Settlements Impacted:</strong> ~{cluster.estimatedSettlementCount} villages
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{cluster.dataConfidenceRating.split(' ')[0]} Fidelity</span>
                  <span className="text-emerald-400 font-semibold hover:underline">Explore Details →</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Regional Exposure Overview */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">Spatial Methodology & Verification Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <h4 className="font-bold text-emerald-400 mb-1">Grid Generalization</h4>
              <p className="text-slate-400 leading-relaxed">
                Raw coordinates are mapped into standard 0.1° (~10km) grid cells. The map displays the centroid of the interface zone, preventing pinpointing of vulnerable farms.
              </p>
            </Card>

            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <h4 className="font-bold text-amber-400 mb-1">Seasonal Hotspots</h4>
              <p className="text-slate-400 leading-relaxed">
                Spatial clusters shift predictably with seasonal phenology: autumn apple harvest in Kashmir Valley vs late winter snowpack descent in Ladakh and Pir Panjal.
              </p>
            </Card>

            <Card className="glass-intense border-white/10 p-4 rounded-lg">
              <h4 className="font-bold text-teal-400 mb-1">Corridor Overlays</h4>
              <p className="text-slate-400 leading-relaxed">
                High-exposure settlement clusters correlate strongly with fragmented wildlife corridors where animals transverse agricultural ribbons between protected forest blocks.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
