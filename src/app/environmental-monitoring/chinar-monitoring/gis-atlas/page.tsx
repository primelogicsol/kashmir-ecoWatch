'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  INDIVIDUAL_CHINAR_REGISTRY,
  HERITAGE_CHINAR_GROVES,
  DISTRICT_CHINAR_CENSUS,
  CHINAR_THREAT_RECORDS,
  IndividualChinarRecord
} from '@/data/chinar-monitoring';
import {
  Compass,
  Layers,
  MapPin,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Landmark,
  ShieldCheck,
  Search,
  Info,
  Maximize2,
  Trees
} from 'lucide-react';

export default function ChinarGisAtlasPage() {
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'HERITAGE' | 'HEALTH' | 'THREATS'>('ALL');
  const [selectedTree, setSelectedTree] = useState<IndividualChinarRecord | null>(INDIVIDUAL_CHINAR_REGISTRY[0]);

  const filteredTrees = activeLayer === 'HERITAGE'
    ? INDIVIDUAL_CHINAR_REGISTRY.filter(t => t.estimatedAgeYears >= 300)
    : activeLayer === 'HEALTH'
    ? INDIVIDUAL_CHINAR_REGISTRY.filter(t => t.healthStatus === 'TRUNK_HOLLOW_DECAY' || t.healthStatus === 'CANOPY_DIEBACK')
    : INDIVIDUAL_CHINAR_REGISTRY;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="01 · MONITORING & GIS INTELLIGENCE"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Chinar GIS Atlas & Spatial Cartography' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                GIS ATLAS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Chinar GIS Atlas & Spatial Cartography
            </span>
          </>
        }
        subtitle="Multi-layer spatial cartography mapping audited heritage groves, tree health sample points, high-risk arterial roads, and historical canopy coverage."
        icon={<Compass className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/tree-registry"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Tree Registry</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chinar Overview Hub</span>
            </Link>
          </div>
        }
      />
      <ChinarSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Layer Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">Active Thematic Layer:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {(['ALL', 'HERITAGE', 'HEALTH', 'THREATS'] as const).map(layer => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-3 py-1.5 rounded-[4px] font-medium transition-colors ${
                  activeLayer === layer
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                {layer === 'ALL' && 'All Verified Points'}
                {layer === 'HERITAGE' && 'Ancient Heritage (>300 Yrs)'}
                {layer === 'HEALTH' && 'Stressed / Decayed Trees'}
                {layer === 'THREATS' && 'Civil Threat Sites'}
              </button>
            ))}
          </div>
        </div>

        {/* GIS Map & Details Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spatial Canvas (Stylized Map Viewport) */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-white/10 rounded-lg p-5 flex flex-col justify-between space-y-4 min-h-[460px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-mono">
                  Kashmir Valley Chinar Spatial Grid (34.0°N, 74.8°E)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {filteredTrees.length} Verified Geotags Plotted
              </span>
            </div>

            {/* Stylized Interactive Map Simulation Node View */}
            <div className="relative flex-1 bg-slate-950 rounded-lg border border-white/5 p-4 flex flex-col justify-center items-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full z-10">
                {filteredTrees.map((tree) => {
                  const isSelected = selectedTree?.id === tree.id;
                  return (
                    <button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className={`p-3 rounded-[6px] text-left border transition-all ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-400 ring-1 ring-emerald-400'
                          : 'bg-slate-900/80 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-emerald-400">{tree.treeAadhaarId}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          tree.healthStatus === 'VIGOROUS' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`} />
                      </div>
                      <div className="font-bold text-xs text-white truncate">{tree.commonName}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {tree.district} · {tree.coordinates[0].toFixed(2)}°N, {tree.coordinates[1].toFixed(2)}°E
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 text-[11px] text-slate-500 font-mono text-center">
                Click any tree marker to inspect authenticated JKFRI Digital Tree Aadhaar parameters.
              </div>
              <div className="lg:hidden text-center text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
                ↓ Selected Tree Details Inspector Below
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5 font-mono">
              <span>Coordinate Reference: WGS-84 (EPSG:4326)</span>
              <span>Survey Year: 2025-2026</span>
            </div>
          </div>

          {/* Tree Detail Inspector Card */}
          <div className="space-y-4">
            {selectedTree ? (
              <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {selectedTree.treeAadhaarId}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{selectedTree.commonName}</h3>
                    <div className="text-xs text-slate-400 font-serif italic">{selectedTree.scientificName}</div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] border ${
                    selectedTree.healthStatus === 'VIGOROUS'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {selectedTree.healthStatus}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-200 font-medium text-right">{selectedTree.villageOrSite}, {selectedTree.district}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Coordinates:</span>
                    <span className="font-mono text-emerald-400">{selectedTree.coordinates[0]}°N, {selectedTree.coordinates[1]}°E</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Girth at Breast Height:</span>
                    <span className="font-mono font-bold text-white">{selectedTree.girthAtBreastHeightM} m</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Height / Crown Spread:</span>
                    <span className="font-mono text-slate-200">{selectedTree.heightMeters}m / {selectedTree.crownSpreadMeters}m</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Estimated Age:</span>
                    <span className="font-mono font-bold text-amber-300">~{selectedTree.estimatedAgeYears} Years</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Trunk Hollow Cavity:</span>
                    <span className="font-mono text-rose-400">{selectedTree.trunkCavityPct}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Ownership:</span>
                    <span className="text-slate-200">{selectedTree.ownership}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs space-y-1">
                  <span className="text-slate-400 text-[11px] block font-medium">Heritage &amp; History:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{selectedTree.heritageSignificance}</p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>QR Tag Installed:</span>
                  <span className="font-mono text-emerald-400">{selectedTree.qrCodeInstalled ? 'YES (Verified)' : 'Pending'}</span>
                </div>
              </Card>
            ) : (
              <div className="p-6 bg-slate-900 border border-white/10 rounded-lg text-center text-xs text-slate-400">
                Select a tree marker from the GIS grid to inspect.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
