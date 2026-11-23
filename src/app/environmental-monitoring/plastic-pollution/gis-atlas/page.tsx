'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/common/Heading';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { SATELLITE_PLASTIC_HOTSPOTS } from '@/data/plastic-pollution';
import { Compass, MapPin, Satellite, ShieldAlert, Layers, ExternalLink, Filter } from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function PlasticGisAtlasPage() {
  const [selectedHotspot, setSelectedHotspot] = useState(SATELLITE_PLASTIC_HOTSPOTS[0]);
  const [riskFilter, setRiskFilter] = useState('ALL');

  const filteredSpots = SATELLITE_PLASTIC_HOTSPOTS.filter((s) => {
    if (riskFilter !== 'ALL' && s.riskScore !== riskFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · 01 · MONITORING & INTELLIGENCE · SPATIAL SURVEILLANCE"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Western' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Plastic Pollution Atlas
            </span>
          </>
        }
        subtitle="Multi-layer GIS cartography mapping 410+ documented open dumping hotspots, municipal landfill coordinates, and satellite plastic accumulation nodes."
        icon={<Compass className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Interactive GIS Atlas Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Map Preview Canvas */}
          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-lg p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Satellite className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white">Multispectral Waste Accumulation Canvas</h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Copernicus STAC API Connected
              </span>
            </div>

            {/* Visual Simulated Satellite Canvas */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-950 rounded-[6px] border border-white/5 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

              {/* Coordinates Overlay */}
              <div className="absolute top-3 left-3 bg-slate-900/90 border border-white/10 p-2 rounded-[4px] text-[10px] font-mono text-slate-300 backdrop-blur-md">
                <div>Active Target: <strong className="text-white">{selectedHotspot.siteName}</strong></div>
                <div>Lat/Long: <strong className="text-cyan-400">{selectedHotspot.coordinates[0]}°N, {selectedHotspot.coordinates[1]}°E</strong></div>
                <div>Mission: {selectedHotspot.satelliteMission}</div>
              </div>

              {/* Hotspot Markers on Canvas */}
              <div className="text-center p-6 space-y-2 z-10 max-w-md">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mx-auto animate-pulse">
                  <MapPin className="w-6 h-6 text-rose-400" />
                </div>
                <div className="text-base font-bold text-white">{selectedHotspot.siteName}</div>
                <div className="text-xs text-slate-400">{selectedHotspot.district} ({selectedHotspot.region})</div>
                <div className="text-xs text-rose-300 font-mono">
                  Footprint: {selectedHotspot.estimatedAreaHectares} Hectares · Proximity: {selectedHotspot.proximityToWaterBodyM}m from River/Wetland
                </div>
              </div>

              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-white/5">
                Last Satellite Acquisition: {selectedHotspot.lastObservedDate}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Technical Note:</strong> Satellite identification uses Short-Wave Infrared (SWIR) and Normalized Difference Plastic Index (NDPI) proxies. Unconfirmed spectral anomalies require ground-truth field surveys before statutory classification.
            </p>
          </div>

          {/* Right: Detected Hotspots List */}
          <div className="bg-slate-900 border border-white/10 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">Detected Hotspots ({filteredSpots.length})</h3>
              </div>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="bg-slate-950 border border-white/10 text-slate-300 text-[10px] px-2 py-1 rounded-[4px]"
              >
                <option value="ALL">All Risk Scores</option>
                <option value="CRITICAL">Critical Risk</option>
                <option value="HIGH">High Risk</option>
              </select>
            </div>

            <div className="space-y-2.5 overflow-y-auto max-h-[460px] pr-1">
              {filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`p-3 rounded-[6px] cursor-pointer transition-all border ${
                    selectedHotspot.id === spot.id
                      ? 'bg-rose-950/40 border-rose-500 shadow-md ring-1 ring-rose-500/50'
                      : 'bg-slate-950/60 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white truncate max-w-[180px]">{spot.siteName}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-[4px] border ${
                      spot.riskScore === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {spot.riskScore}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{spot.district} ({spot.region})</div>
                  <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">{spot.notes}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
