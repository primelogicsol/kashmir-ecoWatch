'use client';

import React, { useState } from 'react';
import { Polygon, Popup } from 'react-leaflet';
import watershedsGeoJson from '@/data/geojson/watersheds.json';

interface WatershedLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

export function WatershedLayer({ visible = true, onFeatureClick }: WatershedLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {watershedsGeoJson.features.map((feature) => {
        const props = feature.properties;
        const coords = feature.geometry.coordinates[0]; // [[lng, lat], ...]
        const latLngs: [number, number][] = coords.map(([lng, lat]) => [lat, lng]);
        const isHovered = hoveredId === props.id;

        return (
          <Polygon
            key={props.id}
            positions={latLngs}
            pathOptions={{
              color: isHovered ? '#60a5fa' : '#3b82f6',
              fillColor: '#3b82f6',
              fillOpacity: isHovered ? 0.35 : 0.15,
              weight: isHovered ? 2.5 : 1.5,
              dashArray: '5, 5',
            }}
            eventHandlers={{
              mouseover: () => setHoveredId(props.id),
              mouseout: () => setHoveredId(null),
              click: () => {
                onFeatureClick?.({
                  type: 'watershed',
                  id: props.id,
                  name: props.name,
                  basin: props.basin,
                  region: props.region,
                  area: props.area_km2,
                  verificationStatus: props.verificationStatus,
                  description: `${props.name} covering ${props.area_km2.toLocaleString()} km² within the greater ${props.basin}. Hydrographically delineated via HydroBASINS Level-7 drainage standard.`,
                  metrics: [
                    { label: 'Catchment Area', value: `${props.area_km2.toLocaleString()} km²` },
                    { label: 'Parent Basin', value: props.basin },
                    { label: 'Region', value: props.region },
                    { label: 'Boundary Standard', value: 'HydroBASINS / HydroSHEDS Authoritative' }
                  ]
                });
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-slate-900 text-sm">{props.name}</h3>
                <div className="mt-1 space-y-1 text-xs text-slate-600">
                  <p><span className="font-medium text-slate-700">Basin:</span> {props.basin}</p>
                  <p><span className="font-medium text-slate-700">Area:</span> {props.area_km2.toLocaleString()} km²</p>
                  <p><span className="font-medium text-slate-700">Region:</span> {props.region}</p>
                  <p className="text-[10px] text-blue-600 font-mono">Delineated Catchment Polygon</p>
                </div>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}
