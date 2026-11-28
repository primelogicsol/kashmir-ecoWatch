'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Map as MapIcon,
  Layers,
  Search,
  Plus,
  Minus,
  Crosshair,
  Maximize2,
  ChevronRight,
  MapPin,
  Droplets,
  Mountain,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { KashmirValleyTopoPreview } from '@/components/maps/KashmirValleyTopoPreview';
import type { BaselineTelemetryData } from '@/lib/telemetry/getBaselineTelemetry';

const InteractiveAtlasCanvas = dynamic(
  () =>
    import('@/components/maps/InteractiveAtlasCanvas').then(
      (m) => m.InteractiveAtlasCanvas
    ),
  {
    ssr: false,
    loading: () => null,
  }
);

const mapLayers = [
  { id: 'protected-areas', label: 'Protected Areas', color: 'bg-emerald-500', visible: true, count: 14 },
  { id: 'wetlands', label: 'Wetlands', color: 'bg-cyan-500', visible: true, count: 8 },
  { id: 'lakes', label: 'Lakes', color: 'bg-blue-500', visible: true, count: 13 },
  { id: 'hazards', label: 'Active Hazards', color: 'bg-red-500', visible: false, count: 3 },
  { id: 'districts', label: 'Districts', color: 'bg-slate-500', visible: true, count: 10 },
];

interface SpatialFeatureSummary {
  id: string;
  name: string;
  type: 'wetland' | 'protected';
  district: string;
  status: string;
  statusColor: 'success' | 'warning' | 'info';
  area: string;
  wqi?: number;
  bloomRisk?: string;
  birdCount?: string;
  species?: number;
  hangulPopulation?: string;
  alerts: number;
  coordinates: string;
  detailHref: string;
}

const allFeatures: SpatialFeatureSummary[] = [
  {
    id: 'dal-lake',
    name: 'Dal Lake',
    type: 'wetland',
    district: 'Srinagar',
    status: 'Active Monitoring',
    statusColor: 'warning',
    area: '18 km²',
    wqi: 62,
    bloomRisk: 'Moderate',
    alerts: 2,
    coordinates: '34.1150°N, 74.8650°E',
    detailHref: '/water-systems/lakes/dal-lake',
  },
  {
    id: 'dachigam',
    name: 'Dachigam National Park',
    type: 'protected',
    district: 'Srinagar',
    status: 'Protected',
    statusColor: 'success',
    area: '141 km²',
    species: 650,
    hangulPopulation: '~289',
    alerts: 0,
    coordinates: '34.1372°N, 74.9382°E',
    detailHref: '/protected-areas/dachigam-national-park',
  },
  {
    id: 'hokersar',
    name: 'Hokersar Wetland',
    type: 'wetland',
    district: 'Srinagar',
    status: 'Bird Migration Active',
    statusColor: 'info',
    area: '13.75 km²',
    wqi: 68,
    bloomRisk: 'Low-Moderate',
    birdCount: '12,000+',
    species: 89,
    alerts: 1,
    coordinates: '34.0950°N, 74.7040°E',
    detailHref: '/water-systems/wetlands/hokersar-wetland',
  },
  {
    id: 'wular-lake',
    name: 'Wular Lake & Ramsar Basin',
    type: 'wetland',
    district: 'Bandipora / Baramulla',
    status: 'Ramsar Flood Reservoir',
    statusColor: 'info',
    area: '130 km²',
    wqi: 71,
    bloomRisk: 'Moderate',
    birdCount: '45,000+',
    alerts: 1,
    coordinates: '34.3600°N, 74.5600°E',
    detailHref: '/water-systems/lakes/wular-lake',
  },
  {
    id: 'kolahoi',
    name: 'Kolahoi Glacier Snout',
    type: 'protected',
    district: 'Anantnag',
    status: 'Cryosphere Watch',
    statusColor: 'warning',
    area: '11.2 km²',
    species: 112,
    hangulPopulation: 'Alpine Zone',
    alerts: 1,
    coordinates: '34.1900°N, 75.3300°E',
    detailHref: '/water-systems/glaciers/kolahoi-glacier',
  },
  {
    id: 'zoji-la',
    name: 'Zoji La High-Altitude Corridor',
    type: 'protected',
    district: 'Ganderbal / Kargil',
    status: 'Pass Telemetry Active',
    statusColor: 'warning',
    area: '3,528 m ASL',
    species: 94,
    hangulPopulation: 'Subalpine',
    alerts: 1,
    coordinates: '34.2800°N, 75.5000°E',
    detailHref: '/hazard-intelligence/avalanches',
  },
];

const featuredCards = allFeatures.slice(0, 3);

export interface MapIntelligenceCoreProps {
  initialData?: BaselineTelemetryData;
}

export function MapIntelligenceCore({ initialData }: MapIntelligenceCoreProps = {}) {
  const [layers, setLayers] = useState(mapLayers);
  const [zoom, setZoom] = useState(9);
  const [showLayers, setShowLayers] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string | null>('dal-lake');
  const [showMiniDrawer, setShowMiniDrawer] = useState(true);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const handleMapReady = useCallback((map: any) => {
    setMapInstance(map);
    setIsMapReady(true);
  }, []);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer))
    );
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (mapInstance) {
      const currentZoom = mapInstance.getZoom();
      mapInstance.setZoom(direction === 'in' ? currentZoom + 1 : currentZoom - 1);
    }
    setZoom((prev) => (direction === 'in' ? prev + 1 : prev - 1));
  };

  const handleFeatureClick = (feature: any) => {
    const featureMap: Record<string, string> = {
      district: 'dal-lake',
      protected_area: 'dachigam',
      water_body: 'hokersar',
    };
    const mappedId = featureMap[feature?.type] || feature?.slug || 'dal-lake';
    setSelectedFeature(mappedId);
    setShowMiniDrawer(true);
  };

  const getFeatureData = (id: string) =>
    allFeatures.find((f) => f.id === id) || allFeatures[0];
  const currentFeature = selectedFeature ? getFeatureData(selectedFeature) : null;

  const visibleLayerCount = layers.filter((l) => l.visible).length;
  const totalFeatures = layers
    .filter((l) => l.visible)
    .reduce((sum, l) => sum + l.count, 0);

  return (
    <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 bg-slate-900 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-glacier-500 rounded-full signal-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
                Spatial Intelligence
              </span>
            </div>
            {initialData && (
              <span className="text-[11px] text-emerald-400 font-medium">
                Water Systems pH {initialData.waterQuality.avgPh.toFixed(1)} · {initialData.waterQuality.stations} Stations Verified
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                GIS Intelligence Core
              </h2>
              <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                Real-time geospatial mapping with live ecological layers,
                protected areas, water systems, and hazard monitoring across Kashmir.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-forest-600 to-forest-500 text-xs sm:text-sm"
                icon={<Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                onClick={() => (window.location.href = '/atlas')}
              >
                <span className="hidden xs:inline">Open Full Atlas</span>
                <span className="xs:hidden">Open Atlas</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Map container - Immediate SSR Kashmir Valley topological preview + seamless live Leaflet hydration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full bg-slate-950">
              {/* Instant Frame-1 Topological & Hotspot Visual (SSR-rendered, zero loading text) */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isMapReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <KashmirValleyTopoPreview
                  selectedFeatureId={selectedFeature}
                  onSelectFeature={(id) => {
                    setSelectedFeature(id);
                    setShowMiniDrawer(true);
                  }}
                />
              </div>

              {/* Interactive Leaflet GIS Canvas hydrating seamlessly on top */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isMapReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <InteractiveAtlasCanvas
                  layers={layers}
                  onFeatureClick={handleFeatureClick}
                  onMapReady={handleMapReady}
                />
              </div>
            </div>

            {/* Map controls - Top right */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 flex flex-col gap-1 sm:gap-1.5 md:gap-2 z-[400]">
              <Card className="glass-intense border-white/10 p-0.5" padding="none">
                <div className="flex flex-col">
                  <button
                    onClick={() => handleZoom('in')}
                    className="p-2 sm:p-2.5 md:p-3 hover:bg-white/5 rounded-lg transition-colors"
                    aria-label="Zoom in"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                  <div className="h-px bg-white/10" />
                  <button
                    onClick={() => handleZoom('out')}
                    className="p-2 sm:p-2.5 md:p-3 hover:bg-white/5 rounded-lg transition-colors"
                    aria-label="Zoom out"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-0.5" padding="none">
                <button
                  onClick={() => mapInstance?.locate({ setView: true, maxZoom: 10 })}
                  className="p-2 sm:p-2.5 md:p-3 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Locate me"
                >
                  <Crosshair className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </Card>

              <Card className="glass-intense border-white/10 p-0.5" padding="none">
                <button
                  onClick={() => setShowLayers(!showLayers)}
                  className={`p-2 sm:p-2.5 md:p-3 rounded-lg transition-colors ${
                    showLayers ? 'bg-forest-500/20 text-forest-400' : 'hover:bg-white/5 text-white'
                  }`}
                  aria-label="Toggle layers"
                >
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </Card>
            </div>

            {/* Search - Top center */}
            <div className="absolute top-2 right-12 left-12 sm:top-3 sm:right-16 sm:left-16 md:top-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-[400] px-2 sm:px-4">
              <Card
                className="glass-intense border-white/10 min-w-[180px] sm:min-w-[240px] md:min-w-[320px] lg:min-w-[400px]"
                padding="none"
              >
                <div className="flex items-center gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search locations, lakes..."
                    className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 min-w-0"
                  />
                  <Badge variant="info" size="sm" className="hidden sm:inline-flex flex-shrink-0">
                    GIS
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Layer panel - Right side */}
            {showLayers && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-14 sm:top-16 md:top-20 right-2 sm:right-3 md:right-4 w-[260px] sm:w-72 md:w-80 max-w-[calc(100vw-1rem)] glass-intense border border-white/10 rounded-lg sm:rounded-xl overflow-hidden z-[400]"
              >
                <div className="p-2.5 sm:p-3 md:p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white">
                        Map Layers
                      </span>
                    </div>
                    <Badge variant="info" size="sm" className="text-[10px] sm:text-xs">
                      {visibleLayerCount}/{layers.length}
                    </Badge>
                  </div>
                </div>
                <div className="p-1.5 sm:p-2 md:p-3 space-y-1 max-h-56 sm:max-h-64 md:max-h-72 overflow-y-auto">
                  {layers.map((layer) => (
                    <div
                      key={layer.id}
                      className="flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                      onClick={() => toggleLayer(layer.id)}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded ${layer.color} ${
                            layer.visible ? '' : 'opacity-30'
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm truncate ${
                            layer.visible ? 'text-white' : 'text-slate-500'
                          }`}
                        >
                          {layer.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        <span className="text-[10px] sm:text-xs text-slate-500 tabular-nums">
                          {layer.count.toLocaleString()}
                        </span>
                        {layer.visible ? (
                          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                        ) : (
                          <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Mini Feature Drawer - Left side */}
            <AnimatePresence initial={false}>
              {showMiniDrawer && currentFeature && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="absolute top-20 sm:top-24 md:top-28 left-2 sm:left-3 md:left-4 w-[280px] sm:w-72 md:w-80 max-w-[calc(100vw-1rem)] glass-intense border border-white/10 rounded-lg sm:rounded-xl overflow-hidden z-[400]"
                >
                  {/* Drawer header */}
                  <div
                    className={`p-2.5 sm:p-3 md:p-4 bg-gradient-to-r ${
                      currentFeature.type === 'wetland'
                        ? 'from-blue-600/20 to-blue-800/10'
                        : currentFeature.type === 'protected'
                          ? 'from-emerald-600/20 to-emerald-800/10'
                          : 'from-slate-600/20 to-slate-800/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {currentFeature.type === 'wetland' ? (
                          <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                        ) : currentFeature.type === 'protected' ? (
                          <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                        ) : (
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-white truncate">
                            {currentFeature.name}
                          </h3>
                          <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                            {currentFeature.district} District
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowMiniDrawer(false)}
                        className="p-1 rounded hover:bg-white/5 transition-colors flex-shrink-0"
                        aria-label="Close"
                      >
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>

                    {/* Status badge */}
                    <div className="mt-2 sm:mt-3">
                      <Badge
                        variant={
                          currentFeature.statusColor === 'success'
                            ? 'success'
                            : currentFeature.statusColor === 'warning'
                              ? 'warning'
                              : 'info'
                        }
                        size="sm"
                        className="text-[10px] sm:text-xs"
                      >
                        {currentFeature.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Drawer content */}
                  <div className="p-2.5 sm:p-3 md:p-4 space-y-3 sm:space-y-4">
                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 sm:p-2.5 rounded-lg glass-light border border-white/5">
                        <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Area</div>
                        <div className="text-sm sm:text-base font-bold text-white">
                          {currentFeature.area}
                        </div>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-lg glass-light border border-white/5">
                        <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Coordinates</div>
                        <div className="text-[10px] sm:text-xs font-mono text-white break-words">
                          {currentFeature.coordinates}
                        </div>
                      </div>
                    </div>

                    {/* Feature-specific metrics */}
                    {currentFeature.type === 'wetland' && (
                      <div className="space-y-2">
                        {typeof currentFeature.wqi === 'number' && (
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-slate-400">Water Quality Index</span>
                            <span
                              className={`font-bold ${
                                currentFeature.wqi >= 70
                                  ? 'text-emerald-400'
                                  : currentFeature.wqi >= 50
                                    ? 'text-amber-400'
                                    : 'text-red-400'
                              }`}
                            >
                              {currentFeature.wqi}
                            </span>
                          </div>
                        )}
                        {currentFeature.bloomRisk && (
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-slate-400">Bloom Risk</span>
                            <Badge variant="warning" size="sm">
                              {currentFeature.bloomRisk}
                            </Badge>
                          </div>
                        )}
                        {currentFeature.birdCount && (
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-slate-400">Bird Count</span>
                            <span className="text-blue-400 font-bold">
                              {currentFeature.birdCount}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {currentFeature.type === 'protected' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-slate-400">Species Count</span>
                          <span className="text-emerald-400 font-bold">
                            {currentFeature.species}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-slate-400">Indicator Zone</span>
                          <span className="text-amber-400 font-bold">
                            {currentFeature.hangulPopulation}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Alerts */}
                    {currentFeature.alerts > 0 && (
                      <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                        <span className="text-xs sm:text-sm text-red-400">
                          {currentFeature.alerts} active alert(s)
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-forest-600 to-forest-500 text-xs"
                        onClick={() => (window.location.href = currentFeature.detailHref)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:border-forest-400 p-2"
                        onClick={() => (window.location.href = '/atlas')}
                      >
                        <MapIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map info - Bottom left */}
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 z-[400]">
              <Card className="glass-intense border-white/10" padding="sm">
                <div className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-slate-500">Zoom</span>
                    <span className="font-mono text-white">{zoom}</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-slate-500">Layers</span>
                    <span className="font-mono text-white">{visibleLayerCount} active</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-slate-500">Features</span>
                    <span className="font-mono text-white">{totalFeatures.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Feature cards row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
        >
          {featuredCards.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => {
                setSelectedFeature(feature.id);
                setShowMiniDrawer(true);
              }}
              className="cursor-pointer"
            >
              <Card className="glass-intense border-white/10 p-2.5 sm:p-3 md:p-4 lg:p-5 hover:border-forest-400/50 transition-colors">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {feature.type === 'wetland' ? (
                      <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    ) : (
                      <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                    )}
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-white">{feature.name}</h3>
                      <p className="text-xs text-slate-400">{feature.district}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      feature.statusColor === 'success'
                        ? 'success'
                        : feature.statusColor === 'warning'
                          ? 'warning'
                          : 'info'
                    }
                    size="sm"
                  >
                    {feature.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
                  <span>{feature.area}</span>
                  <span>•</span>
                  <span className="truncate">{feature.coordinates}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
