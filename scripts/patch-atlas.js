const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/protected-network/atlas/page.tsx');

const content = `'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Map, Layers, Search, Filter, Download, Share2, Maximize2, 
  Crosshair, Eye, EyeOff, Plus, Minus, Compass, Shield, 
  Mountain, Droplet, Leaf, Activity, TrendingUp, Info, ExternalLink, X
} from 'lucide-react';
import { getProtectedAreas, protectedNetworkMetrics, corridorsData, ProtectedArea } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

export default function ProtectedAreaAtlasPage() {
  const router = useRouter();
  const [zoom, setZoom] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState<ProtectedArea | null>(null);

  const [layers, setLayers] = useState([
    { id: 'national-parks', label: 'National Parks', color: 'bg-emerald-500', visible: true, count: protectedNetworkMetrics.nationalParks },
    { id: 'wildlife-sanctuaries', label: 'Wildlife Sanctuaries', color: 'bg-blue-500', visible: true, count: protectedNetworkMetrics.wildlifeSanctuaries },
    { id: 'wetland-reserves', label: 'Wetland Reserves', color: 'bg-sky-500', visible: true, count: protectedNetworkMetrics.wetlandReserves },
    { id: 'conservation-reserves', label: 'Conservation Reserves', color: 'bg-amber-500', visible: true, count: protectedNetworkMetrics.conservationReserves },
    { id: 'bird-areas', label: 'Bird & Habitat Areas', color: 'bg-purple-500', visible: false, count: protectedNetworkMetrics.importantBirdAreas },
    { id: 'corridors', label: 'Connectivity Corridors', color: 'bg-pink-500', visible: false, count: corridorsData.length },
  ]);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleExport = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert('Initiating download for complete Kashmir GIS vector dataset (KML/GPX)...');
      } else {
        router.push('/protected-network/trails-and-sightings/request?slug=atlas');
      }
    }
  };

  // Convert lat/lng to map percentage bounds
  const getCoords = (lat?: number, lng?: number, fallbackIdx = 0) => {
    if (lat && lng && lat >= 32 && lat <= 37.5 && lng >= 73 && lng <= 80) {
      const top = Math.max(6, Math.min(88, ((37.2 - lat) / (37.2 - 32.2)) * 80 + 10));
      const left = Math.max(6, Math.min(90, ((lng - 73.2) / (79.5 - 73.2)) * 80 + 10));
      return { top: \`\${top}%\`, left: \`\${left}%\` };
    }
    const pseudoTop = 20 + ((fallbackIdx * 11) % 65);
    const pseudoLeft = 15 + ((fallbackIdx * 17) % 70);
    return { top: \`\${pseudoTop}%\`, left: \`\${pseudoLeft}%\` };
  };

  const allVisiblePAs = useMemo(() => {
    let list: (ProtectedArea & { layerColor: string })[] = [];
    const isVisible = (id: string) => layers.find(l => l.id === id)?.visible;

    if (isVisible('national-parks')) {
      list = [...list, ...getProtectedAreas.nationalParks().map(p => ({ ...p, layerColor: 'bg-emerald-500 border-emerald-400' }))];
    }
    if (isVisible('wildlife-sanctuaries')) {
      list = [...list, ...getProtectedAreas.wildlifeSanctuaries().map(p => ({ ...p, layerColor: 'bg-blue-500 border-blue-400' }))];
    }
    if (isVisible('wetland-reserves')) {
      list = [...list, ...getProtectedAreas.wetlandReserves().map(p => ({ ...p, layerColor: 'bg-sky-500 border-sky-400' }))];
    }
    if (isVisible('conservation-reserves')) {
      list = [...list, ...getProtectedAreas.conservationReserves().map(p => ({ ...p, layerColor: 'bg-amber-500 border-amber-400' }))];
    }
    if (isVisible('bird-areas')) {
      list = [...list, ...getProtectedAreas.birdHabitatAreas().map(p => ({ ...p, layerColor: 'bg-purple-500 border-purple-400' }))];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.district.toLowerCase().includes(q) || 
        (p.keySpecies && p.keySpecies.some(s => s.toLowerCase().includes(q)))
      );
    }

    return list;
  }, [layers, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Protected Area GIS Atlas &amp; Cartography
              </span>
            </div>
          </div>
        }
        subtitle="Interactive GIS atlas mapping Kashmir's protected landscapes, wetlands, wildlife corridors, and ecological boundaries. Supports spatial analysis of distribution, coverage, category overlap, and conservation priority zones."
        icon={<Map className="w-6 h-6 text-emerald-400" />}
        label="Spatial Intelligence"
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Share2 className="w-4 h-4" />}>
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 text-white" 
              icon={<Download className="w-4 h-4" />}
              onClick={handleExport}
            >
              Export
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Maximize2 className="w-4 h-4" />}>
              Full Screen
            </Button>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K ATLAS SENTINEL                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-sky-950/70 to-slate-900/95 border border-sky-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-sky-400">Cartographic &amp; Spatial Intelligence Layer</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">GIS Engine 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Mapping <strong className="text-white">{protectedNetworkMetrics.totalProtectedAreas} Protected Landscapes</strong>, <strong className="text-white">{corridorsData.length} Wildlife Corridors</strong>, and <strong className="text-white">{protectedNetworkMetrics.importantBirdAreas} IBAs</strong> across Western Himalaya, Karakoram, and Pir Panjal.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Coordinate Frame</div>
              <div className="text-sm font-bold text-sky-300">WGS 84 / UTM 43N</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold">
              {allVisiblePAs.length} Active Pins
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Mapped Reserves */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mapped PAs</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {protectedNetworkMetrics.totalProtectedAreas}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Vector Polygons</div>
          </div>

          {/* Card 2: Spatial Area */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Network Area</span>
              <Map className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">
              {protectedNetworkMetrics.totalArea.toLocaleString()} <span className="text-xs font-normal text-teal-400">km²</span>
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">{protectedNetworkMetrics.coveragePercentage}% of Territory</div>
          </div>

          {/* Card 3: GIS Layers */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Vector Layers</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {layers.length}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Multi-Taxon Thematic</div>
          </div>

          {/* Card 4: Corridors */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Corridors</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {corridorsData.length}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Ecological Links</div>
          </div>

          {/* Card 5: Geo-Referencing */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Coordinate Acc.</span>
              <Crosshair className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">
              ± 10 m
            </div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">High-Resolution GPS</div>
          </div>

          {/* Card 6: Peak Altitude */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Max Elevation</span>
              <Mountain className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              5,400 m
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Hemis High Ridge</div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="container mx-auto px-6 pb-12">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative h-[calc(100vh-280px)] min-h-[650px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            {/* Map Surface */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="atlasGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" className="text-sky-400/30" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#atlasGrid)" />
              </svg>

              {/* Dynamic Protected Area Markers */}
              {allVisiblePAs.map((pa, i) => {
                const pos = getCoords(pa.latitude, pa.longitude, i);
                const isSelected = selectedSite?.id === pa.id;
                return (
                  <div
                    key={pa.id}
                    onClick={() => setSelectedSite(pa)}
                    className={\`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-10 \${
                      isSelected ? 'scale-150 z-30' : 'hover:scale-125'
                    }\`}
                    style={{ top: pos.top, left: pos.left }}
                    title={\`\${pa.name} (\${pa.district}) - \${pa.area} km²\`}
                  >
                    <div className={\`w-4 h-4 rounded-full border-2 shadow-lg shadow-black/60 \${pa.layerColor} \${
                      isSelected ? 'ring-4 ring-white animate-bounce' : 'opacity-85 hover:opacity-100'
                    }\`} />
                    <span className="hidden group-hover:inline-block absolute left-5 top-0 px-2 py-0.5 bg-slate-900/90 text-[10px] text-white rounded border border-white/10 whitespace-nowrap shadow-md pointer-events-none">
                      {pa.name}
                    </span>
                  </div>
                );
              })}

              {/* Corridor Lines overlay when corridors layer is toggled */}
              {layers.find(l => l.id === 'corridors')?.visible && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <path d="M 28% 45% Q 38% 42% 48% 38%" stroke="#ec4899" strokeWidth="3" fill="none" strokeDasharray="6,4" />
                  <path d="M 35% 55% Q 42% 52% 52% 48%" stroke="#ec4899" strokeWidth="3" fill="none" strokeDasharray="6,4" />
                  <path d="M 45% 35% Q 58% 30% 72% 25%" stroke="#ec4899" strokeWidth="3" fill="none" strokeDasharray="6,4" />
                  <path d="M 30% 62% Q 44% 65% 58% 68%" stroke="#ec4899" strokeWidth="3" fill="none" strokeDasharray="6,4" />
                </svg>
              )}
            </div>

            {/* Selected Site Drawer / Popover */}
            {selectedSite && (
              <div className="absolute bottom-6 right-6 w-96 glass-intense border border-emerald-500/40 rounded-2xl p-5 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                      {selectedSite.category.replace('_', ' ')}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {selectedSite.name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedSite(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 mb-3 leading-relaxed">
                  {selectedSite.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div>
                    <span className="text-slate-400 text-[10px] block">District / Division</span>
                    <span className="font-semibold text-white">{selectedSite.district}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Reserve Area</span>
                    <span className="font-semibold text-emerald-300">{selectedSite.area} km²</span>
                  </div>
                  {selectedSite.altitudeRange && (
                    <div className="col-span-2">
                      <span className="text-slate-400 text-[10px] block">Altitude Span</span>
                      <span className="font-semibold text-teal-300">{selectedSite.altitudeRange}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] text-slate-400">
                    Scope: <strong className="text-white">{selectedSite.scope || 'Kashmir Core'}</strong>
                  </span>
                  <a
                    href={\`/protected-network/\${
                      selectedSite.category === 'national_park' ? 'national-parks' :
                      selectedSite.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' :
                      selectedSite.category === 'wetland_reserve' ? 'wetland-reserves' :
                      selectedSite.category === 'conservation_reserve' ? 'conservation-reserves' :
                      'bird-and-habitat-areas'
                    }/\${selectedSite.slug}\`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    View Full Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Controls - Top Right */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <Card className="glass-intense border-white/10 p-1" padding="none">
                <div className="flex flex-col">
                  <button onClick={() => setZoom(z => Math.min(18, z + 1))} className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                  <div className="h-px bg-white/10" />
                  <button onClick={() => setZoom(z => Math.max(1, z - 1))} className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-1" padding="none">
                <button 
                  onClick={() => { setZoom(10); setSelectedSite(null); setSearchQuery(''); }}
                  title="Reset viewport and focus"
                  className="p-3 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Crosshair className="w-5 h-5 text-white" />
                </button>
              </Card>
            </div>

            {/* Layer Panel - Right */}
            <div className="absolute top-36 right-4 w-72 glass-intense border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Map Layers
                    </span>
                  </div>
                  <Badge variant="info" size="sm">
                    {layers.filter(l => l.visible).length}/{layers.length}
                  </Badge>
                </div>
              </div>
              <div className="p-3 space-y-1 max-h-80 overflow-y-auto">
                {layers.map(layer => (
                  <div
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={\`w-3 h-3 rounded \${layer.color} \${layer.visible ? '' : 'opacity-30'}\`} />
                      <span className={\`text-sm \${layer.visible ? 'text-white' : 'text-slate-500'}\`}>
                        {layer.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 tabular-nums">
                        {layer.count}
                      </span>
                      {layer.visible ? (
                        <Eye className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search - Top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <Card className="glass-intense border-white/10 min-w-[340px] sm:min-w-[420px]" padding="none">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Dachigam, Hokersar, Hangul, Baramulla..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-slate-500"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Card>
            </div>

            {/* Info - Bottom Left */}
            <div className="absolute bottom-4 left-4 z-20">
              <Card className="glass-intense border-white/10" padding="sm">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">Zoom</span>
                    <span className="font-mono text-white">{zoom}x</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">Active Layers</span>
                    <span className="font-mono text-white">{layers.filter(l => l.visible).length}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">Total Classified PAs</span>
                    <span className="font-mono text-emerald-400">{protectedNetworkMetrics.totalProtectedAreas}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
`;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated atlas/page.tsx');
