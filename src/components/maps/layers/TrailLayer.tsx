'use client';

import React, { useState } from 'react';
import { Polyline, CircleMarker, Popup } from 'react-leaflet';
import trailsGeoJson from '@/data/geojson/trails.json';

interface TrailLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const trailDifficultyColors: Record<string, string> = {
  easy: '#22c55e',      // green-500
  moderate: '#f59e0b',  // amber-500
  difficult: '#ef4444', // red-500
};

export function TrailLayer({ visible = true, onFeatureClick }: TrailLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {trailsGeoJson.features.map((feature) => {
        const props = feature.properties;
        const coords = feature.geometry.coordinates; // [[lng, lat], ...]
        const latLngs: [number, number][] = coords.map(([lng, lat]) => [lat, lng]);
        const color = trailDifficultyColors[props.difficulty] || '#f59e0b';
        const isHovered = hoveredId === props.id;

        const trailheadPos: [number, number] = [props.trailhead.lat, props.trailhead.lng];
        const endpointPos: [number, number] = [props.endpoint.lat, props.endpoint.lng];

        return (
          <React.Fragment key={props.id}>
            {/* GPS Polyline Course */}
            <Polyline
              positions={latLngs}
              pathOptions={{
                color: isHovered ? '#ffffff' : color,
                weight: isHovered ? 4 : 2.5,
                opacity: isHovered ? 1.0 : 0.85,
                dashArray: '6, 6',
              }}
              eventHandlers={{
                mouseover: () => setHoveredId(props.id),
                mouseout: () => setHoveredId(null),
                click: () => {
                  onFeatureClick?.({
                    type: 'trail',
                    id: props.id,
                    name: props.name,
                    region: props.region,
                    district: props.district,
                    distance: props.distance_km,
                    duration: props.duration,
                    difficulty: props.difficulty,
                    trailhead: props.trailhead.name,
                    endpoint: props.endpoint.name,
                    maxElevation: props.maxElevation_m,
                    verificationStatus: props.verificationStatus,
                    description: `${props.name} in ${props.district}, ${props.region}. Length: ${props.distance_km} km (${props.duration}). Trailhead: ${props.trailhead.name}. Max elevation: ${props.maxElevation_m}m. Difficulty: ${props.difficulty.toUpperCase()}.`,
                    metrics: [
                      { label: 'Distance', value: `${props.distance_km} km` },
                      { label: 'Duration', value: props.duration },
                      { label: 'Difficulty', value: props.difficulty.toUpperCase() },
                      { label: 'Max Altitude', value: `${props.maxElevation_m}m` },
                      { label: 'Trailhead', value: props.trailhead.name },
                      { label: 'Geometry', value: 'Verified LineString Track' }
                    ]
                  });
                },
              }}
            >
              <Popup>
                <div className="p-2 min-w-[210px]">
                  <h3 className="font-bold text-slate-900 text-sm">{props.name}</h3>
                  <div className="mt-1 space-y-1 text-xs text-slate-600">
                    <p><span className="font-medium text-slate-700">Region:</span> {props.region} ({props.district})</p>
                    <p><span className="font-medium text-slate-700">Distance:</span> {props.distance_km} km ({props.duration})</p>
                    <p><span className="font-medium text-slate-700">Trailhead:</span> {props.trailhead.name}</p>
                    <p><span className="font-medium text-slate-700">Endpoint:</span> {props.endpoint.name}</p>
                    <p><span className="font-medium text-slate-700">Difficulty:</span> <span style={{ color }}>{props.difficulty}</span></p>
                  </div>
                </div>
              </Popup>
            </Polyline>

            {/* Trailhead Origin Pin */}
            <CircleMarker
              center={trailheadPos}
              radius={5}
              pathOptions={{
                fillColor: '#22c55e',
                color: '#ffffff',
                weight: 2,
                fillOpacity: 1,
              }}
            />

            {/* Endpoint Pin */}
            <CircleMarker
              center={endpointPos}
              radius={4}
              pathOptions={{
                fillColor: '#ef4444',
                color: '#ffffff',
                weight: 1.5,
                fillOpacity: 0.9,
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}
