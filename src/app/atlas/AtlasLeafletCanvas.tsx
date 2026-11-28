'use client';

import React from 'react';
import { AtlasMap } from '@/components/maps/AtlasMap';
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
import { MapControls, CoordinateDisplay, ScaleBar } from '@/components/maps/MapControls';

export interface AtlasLayersState {
  districts: boolean;
  protectedAreas: boolean;
  lakes: boolean;
  wetlands: boolean;
  rivers: boolean;
  watersheds: boolean;
  trails: boolean;
  glaciers: boolean;
  hazards: boolean;
  sightings: boolean;
}

interface AtlasLeafletCanvasProps {
  layers: AtlasLayersState;
  onMapReady: (map: any) => void;
  onFeatureClick: (feature: any) => void;
  onToggleLayerRail: () => void;
}

export default function AtlasLeafletCanvas({
  layers,
  onMapReady,
  onFeatureClick,
  onToggleLayerRail,
}: AtlasLeafletCanvasProps) {
  return (
    <AtlasMap onMapReady={onMapReady}>
      <DistrictLayer visible={layers.districts} onFeatureClick={onFeatureClick} />
      <ProtectedAreaLayer visible={layers.protectedAreas} onFeatureClick={onFeatureClick} />
      <WaterBodyLayer visible={layers.lakes || layers.wetlands} onFeatureClick={onFeatureClick} />
      <RiverLayer visible={layers.rivers} onFeatureClick={onFeatureClick} />
      <WatershedLayer visible={layers.watersheds} onFeatureClick={onFeatureClick} />
      <GlacierLayer visible={layers.glaciers} onFeatureClick={onFeatureClick} />
      <TrailLayer visible={layers.trails} onFeatureClick={onFeatureClick} />
      <SightingLayer visible={layers.sightings} onFeatureClick={onFeatureClick} />
      <HazardLayer visible={layers.hazards} onFeatureClick={onFeatureClick} />

      <MapControls onToggleLayers={onToggleLayerRail} />
      <CoordinateDisplay />
      <ScaleBar />
    </AtlasMap>
  );
}
