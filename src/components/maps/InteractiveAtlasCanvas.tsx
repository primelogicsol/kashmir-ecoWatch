'use client';

import React from 'react';
import type * as L from 'leaflet';
import { AtlasMap } from '@/components/maps/AtlasMap';
import {
  DistrictLayer,
  ProtectedAreaLayer,
  WaterBodyLayer,
  HazardLayer,
} from '@/components/maps/layers';

export interface AtlasLayerVisibility {
  id: string;
  visible: boolean;
}

interface InteractiveAtlasCanvasProps {
  layers: AtlasLayerVisibility[];
  onFeatureClick: (feature: any) => void;
  onMapReady: (map: L.Map) => void;
}

export function InteractiveAtlasCanvas({
  layers,
  onFeatureClick,
  onMapReady,
}: InteractiveAtlasCanvasProps) {
  const isLayerVisible = (id: string) =>
    Boolean(layers.find((l) => l.id === id)?.visible);

  return (
    <AtlasMap onMapReady={onMapReady}>
      <DistrictLayer
        visible={isLayerVisible('districts')}
        onFeatureClick={onFeatureClick}
      />
      <ProtectedAreaLayer
        visible={isLayerVisible('protected-areas')}
        onFeatureClick={onFeatureClick}
      />
      <WaterBodyLayer
        visible={isLayerVisible('lakes') || isLayerVisible('wetlands')}
        onFeatureClick={onFeatureClick}
      />
      <HazardLayer
        visible={isLayerVisible('hazards')}
        onFeatureClick={onFeatureClick}
      />
    </AtlasMap>
  );
}
