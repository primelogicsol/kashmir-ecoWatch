'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { FeatureDrawer } from '@/components/maps/FeatureDrawer';

// Dynamically import AtlasMap with ssr: false in Client Component
const AtlasMap = dynamic(
  () => import('@/components/maps/AtlasMap').then((m) => m.AtlasMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
        <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-xs font-mono tracking-widest uppercase">Loading Kashmir Geospatial Canvas...</p>
      </div>
    )
  }
);
import {
  DistrictLayer,
  ProtectedAreaLayer,
  WaterBodyLayer,
  RiverLayer,
  WatershedLayer,
  TrailLayer,
  GlacierLayer,
  HazardLayer,
  SightingLayer,
} from '@/components/maps/layers';
import { TopCommandBar, LayerRail, FloatingChips, LegendCard } from '@/components/atlas';
import { MapControls, CoordinateDisplay, ScaleBar } from '@/components/maps/MapControls';

import districtsGeoJson from '@/data/geojson/districts.json';
import protectedAreasGeoJson from '@/data/geojson/protected-areas.json';
import lakesGeoJson from '@/data/geojson/lakes.json';
import wetlandsGeoJson from '@/data/geojson/wetlands.json';
import riversGeoJson from '@/data/geojson/rivers.json';
import glaciersGeoJson from '@/data/geojson/glaciers.json';
import watershedsGeoJson from '@/data/geojson/watersheds.json';
import trailsGeoJson from '@/data/geojson/trails.json';
import hazardsGeoJson from '@/data/geojson/hazards.json';
import sightingsGeoJson from '@/data/geojson/sightings.json';

export default function AtlasClient() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [layerRailOpen, setLayerRailOpen] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [mapInstance, setMapInstance] = useState<any>(null);

  const [layers, setLayers] = useState({
    districts: true,
    protectedAreas: true,
    lakes: true,
    wetlands: true,
    rivers: true,
    watersheds: false,
    trails: false,
    glaciers: false,
    hazards: false,
    sightings: false,
  });

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setDrawerOpen(true);
  };

  const handleSearchResultSelect = (result: any) => {
    // Automatically turn on layer if disabled
    if (result.type === 'river') setLayers(prev => ({ ...prev, rivers: true }));
    if (result.type === 'glacier') setLayers(prev => ({ ...prev, glaciers: true }));
    if (result.type === 'watershed') setLayers(prev => ({ ...prev, watersheds: true }));
    if (result.type === 'trail') setLayers(prev => ({ ...prev, trails: true }));
    if (result.type === 'hazard') setLayers(prev => ({ ...prev, hazards: true }));
    if (result.type === 'district') setLayers(prev => ({ ...prev, districts: true }));
    if (result.type === 'protected_area') setLayers(prev => ({ ...prev, protectedAreas: true }));
    if (result.type === 'lake') setLayers(prev => ({ ...prev, lakes: true }));
    if (result.type === 'wetland') setLayers(prev => ({ ...prev, wetlands: true }));

    // If the result has coordinates, fly directly to it
    if (result.coordinates && result.coordinates.lat && result.coordinates.lng) {
      mapInstance?.flyTo([result.coordinates.lat, result.coordinates.lng], 12, {
        duration: 1.5,
      });
    }

    // Open drawer with full scientific details
    handleFeatureClick(result);
  };

  const toggleLayer = (groupId: string, layerId: string) => {
    setLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId as keyof typeof prev],
    }));
  };

  const activeLayerCount = Object.values(layers).filter(Boolean).length;

  // Real, dynamic counts from authoritative GIS datasets
  const counts = useMemo(() => {
    const npCount = protectedAreasGeoJson.features.filter((f: any) => f.properties.category === 'national_park').length;
    const wsCount = protectedAreasGeoJson.features.filter((f: any) => f.properties.category === 'wildlife_sanctuary').length;
    const wrCount = protectedAreasGeoJson.features.filter((f: any) => f.properties.category === 'wetland_reserve').length;
    const crCount = protectedAreasGeoJson.features.filter((f: any) => f.properties.category === 'conservation_reserve').length;
    const ibaCount = protectedAreasGeoJson.features.filter((f: any) => f.properties.category === 'iba').length;

    return {
      districts: districtsGeoJson.features.length,
      protectedAreas: protectedAreasGeoJson.features.length,
      np: npCount,
      ws: wsCount,
      wr: wrCount,
      cr: crCount,
      iba: ibaCount,
      lakes: lakesGeoJson.features.length,
      wetlands: wetlandsGeoJson.features.length,
      rivers: riversGeoJson.features.length,
      watersheds: watershedsGeoJson.features.length,
      glaciers: glaciersGeoJson.features.length,
      trails: trailsGeoJson.features.length,
      hazards: hazardsGeoJson.features.length,
      sightings: sightingsGeoJson.features.length,
      totalWaterBodies: lakesGeoJson.features.length + wetlandsGeoJson.features.length,
    };
  }, []);

  // Define dynamic layer groups for LayerRail
  const layerGroups = useMemo(() => [
    {
      id: 'boundaries',
      label: 'Boundaries',
      icon: 'boundaries',
      layers: [
        { id: 'districts', label: 'Districts (5 Regions)', color: 'bg-slate-500', count: counts.districts, visible: layers.districts },
      ],
    },
    {
      id: 'water',
      label: 'Water Systems',
      icon: 'water',
      layers: [
        { id: 'lakes', label: 'Open Water Lakes', color: 'bg-blue-500', count: counts.lakes, visible: layers.lakes },
        { id: 'wetlands', label: 'Ramsar Wetland Systems', color: 'bg-cyan-500', count: counts.wetlands, visible: layers.wetlands },
        { id: 'rivers', label: 'Rivers & Streams', color: 'bg-sky-400', count: counts.rivers, visible: layers.rivers },
        { id: 'watersheds', label: 'Watershed Basins', color: 'bg-blue-300', count: counts.watersheds, visible: layers.watersheds },
      ],
    },
    {
      id: 'cryosphere',
      label: 'Glaciers',
      icon: 'Mountain',
      layers: [
        { id: 'glaciers', label: 'Dated Glaciers (RGI)', color: 'bg-sky-200', count: counts.glaciers, visible: layers.glaciers },
      ],
    },
    {
      id: 'biodiversity',
      label: 'Protected Areas',
      icon: 'biodiversity',
      layers: [
        { id: 'protectedAreas', label: 'All Protected Areas', color: 'bg-emerald-500', count: counts.protectedAreas, visible: layers.protectedAreas },
      ],
    },
    {
      id: 'trails',
      label: 'Trails & Sightings',
      icon: 'trails',
      layers: [
        { id: 'trails', label: 'Verified GPS Trails', color: 'bg-amber-500', count: counts.trails, visible: layers.trails },
        { id: 'sightings', label: 'Wildlife Observations', color: 'bg-emerald-400', count: counts.sightings, visible: layers.sightings },
      ],
    },
    {
      id: 'risk',
      label: 'Hazards & Risk',
      icon: 'risk',
      layers: [
        { id: 'hazards', label: 'Documented Hazards', color: 'bg-red-500', count: counts.hazards, visible: layers.hazards },
      ],
    },
  ], [counts, layers]);

  // Define dynamic legend items
  const legendItems = useMemo(() => [
    { label: 'National Parks', color: 'bg-emerald-500', shape: 'polygon' as const, count: counts.np },
    { label: 'Wildlife Sanctuaries', color: 'bg-blue-500', shape: 'circle' as const, count: counts.ws },
    { label: 'Wetland Reserves', color: 'bg-cyan-500', shape: 'circle' as const, count: counts.wr },
    { label: 'Conservation Reserves', color: 'bg-amber-500', shape: 'circle' as const, count: counts.cr },
    { label: 'Bird Habitat Areas (IBA)', color: 'bg-purple-500', shape: 'circle' as const, count: counts.iba },
    { label: 'Open Water Lakes', color: 'bg-blue-500/50', shape: 'polygon' as const, count: counts.lakes },
    { label: 'Ramsar Wetland Complexes', color: 'bg-cyan-500/50', shape: 'circle' as const, count: counts.wetlands },
    { label: 'Rivers & Streams (LineString)', color: 'bg-sky-400', shape: 'line' as const, count: counts.rivers },
    { label: 'Watershed Basins', color: 'bg-blue-300', shape: 'polygon' as const, count: counts.watersheds },
    { label: 'Dated Glaciers (RGI)', color: 'bg-sky-200', shape: 'polygon' as const, count: counts.glaciers },
    { label: 'Verified GPS Trails', color: 'bg-amber-500', shape: 'line' as const, count: counts.trails },
    { label: 'Wildlife Sightings (Privacy Fuzzed)', color: 'bg-emerald-400', shape: 'circle' as const, count: counts.sightings },
    { label: 'Active Hazard Risk Zones', color: 'bg-red-500', shape: 'polygon' as const, count: counts.hazards },
    { label: 'District Boundaries (5 Regions)', color: 'border-white/40', shape: 'polygon' as const, count: counts.districts },
  ], [counts]);

  // Define dynamic floating chips
  const chips = useMemo(() => [
    { id: 'protected', label: 'Protected Areas', value: `${counts.protectedAreas}`, removable: false },
    { id: 'water', label: 'Water Assets', value: `${counts.totalWaterBodies + counts.rivers}`, removable: false },
    { id: 'glaciers', label: 'Dated Glaciers', value: `${counts.glaciers}`, removable: false },
  ], [counts]);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Top Command Bar with Live Geospatial Search */}
      <TopCommandBar
        layerCount={activeLayerCount}
        onToggleLayers={() => setLayerRailOpen(!layerRailOpen)}
        onFeatureSelect={handleSearchResultSelect}
      />

      {/* Dynamic Layer Rail */}
      <LayerRail
        isOpen={layerRailOpen}
        onClose={() => setLayerRailOpen(false)}
        layers={layerGroups}
        onToggleLayer={toggleLayer}
      />

      {/* Map container - Full screen */}
      <div className={`h-[calc(100vh-64px)] w-full transition-all duration-300 ${layerRailOpen ? 'md:ml-80' : ''}`}>
        <AtlasMap onMapReady={setMapInstance}>
          {/* Authoritative GIS Layers */}
          <DistrictLayer
            visible={layers.districts}
            onFeatureClick={handleFeatureClick}
          />
          <ProtectedAreaLayer
            visible={layers.protectedAreas}
            onFeatureClick={handleFeatureClick}
          />
          <WaterBodyLayer
            visible={layers.lakes || layers.wetlands}
            onFeatureClick={handleFeatureClick}
          />
          <RiverLayer
            visible={layers.rivers}
            onFeatureClick={handleFeatureClick}
          />
          <WatershedLayer
            visible={layers.watersheds}
            onFeatureClick={handleFeatureClick}
          />
          <GlacierLayer
            visible={layers.glaciers}
            onFeatureClick={handleFeatureClick}
          />
          <TrailLayer
            visible={layers.trails}
            onFeatureClick={handleFeatureClick}
          />
          <SightingLayer
            visible={layers.sightings}
            onFeatureClick={handleFeatureClick}
          />
          <HazardLayer
            visible={layers.hazards}
            onFeatureClick={handleFeatureClick}
          />

          {/* Map Controls - Inside MapContainer */}
          <MapControls onToggleLayers={() => setLayerRailOpen(!layerRailOpen)} />
          <CoordinateDisplay />
          <ScaleBar />
        </AtlasMap>
      </div>

      {/* Dynamic Floating Chips */}
      <FloatingChips chips={chips} position="bottom-left" />

      {/* Dynamic Legend Card */}
      <div className="fixed bottom-20 right-4 md:bottom-20 md:right-20 z-[350] md:z-[500]">
        <LegendCard items={legendItems} visible={showLegend} />
      </div>

      {/* Scientific Feature Drawer */}
      {selectedFeature && (
        <FeatureDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          feature={selectedFeature}
        />
      )}
    </main>
  );
}
