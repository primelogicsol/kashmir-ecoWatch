'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { SectoralImpactMap } from '@/components/sectoral-eia/SectoralImpactMap';
import { SHARED_ASSESSMENT_DATABASE, CUMULATIVE_IMPACT_HOTSPOTS } from '@/data/sectoral-eia';
import { 
  Map, 
  Layers, 
  MapPin, 
  ExternalLink, 
  Compass, 
  TreePine, 
  Hammer, 
  Wheat,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function ImpactAtlasPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Geospatial Cartography & Spatial Layers"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Impact Atlas' }
        ]}
        icon={<Map className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            GIS Sectoral Impact Atlas
          </span>
        }
        subtitle="Interactive spatial cartography visualizing assessment envelopes, carrying capacity zones, and cumulative stress hotspots across the Western Himalayas."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-8 max-w-6xl">
        {/* FULLSCREEN GIS MAP CONTAINER */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Spatial Cartography & Telemetry Viewport</h2>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-300 bg-emerald-500/10 text-[10px]">
                  🟢 100% Open Access (Zero Key Needed)
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Click on any sector marker to inspect detailed dossiers, toggle between Satellite/Dark/Terrain basemaps, or view cumulative stress hotspots.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-300 text-xs">
                Real-Time GIS Engine
              </Badge>
            </div>
          </div>

          <SectoralImpactMap className="h-[620px]" />
        </div>

        {/* MAP FEATURE DIRECTORY */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold text-white">Mapped Sector Assessment Envelopes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SHARED_ASSESSMENT_DATABASE.map((record) => (
              <Card key={record.id} className="p-4 bg-slate-900 border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">{record.code}</span>
                    <Badge variant="outline" className="text-[10px] capitalize border-white/10 text-slate-300">
                      {record.sector}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    <Link href={`/sectoral-eia/assessment/${record.id}`} className="hover:text-emerald-300">
                      {record.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{record.summary}</p>
                  <div className="mt-2 text-[11px] text-slate-500 font-mono">
                    Boundary: {record.geographicBoundary.name} [{record.geographicBoundary.coordinates.join(', ')}]
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Integrity: {record.overallScore}/100</span>
                  <Link
                    href={`/sectoral-eia/assessment/${record.id}`}
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
