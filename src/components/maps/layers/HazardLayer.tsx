'use client';

import React, { useState } from 'react';
import { Polygon, CircleMarker, Popup } from 'react-leaflet';
import hazardsGeoJson from '@/data/geojson/hazards.json';

interface HazardLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const severityColors: Record<string, string> = {
  critical: '#dc2626', // red-600
  high: '#ef4444',     // red-500
  medium: '#f59e0b',   // amber-500
  low: '#10b981',      // emerald-500
};

const hazardIcons: Record<string, string> = {
  glof: '🌊 GLOF Threat',
  avalanche: '🏔️ Avalanche Corridor',
  landslide: '⛰️ Landslide Zone',
  flood: '💧 Inundation Plain',
  earthquake: '⚡ Seismic Faultline',
};

export function HazardLayer({ visible = true, onFeatureClick }: HazardLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {hazardsGeoJson.features.map((feature) => {
        const props = feature.properties;
        const coords = feature.geometry.coordinates[0]; // [[lng, lat], ...]
        const latLngs: [number, number][] = coords.map(([lng, lat]) => [lat, lng]);
        const color = severityColors[props.severity] || '#ef4444';
        const isHovered = hoveredId === props.id;
        const centerPos: [number, number] = [props.coordinates.lat, props.coordinates.lng];

        return (
          <React.Fragment key={props.id}>
            {/* Modeled Hazard Threat Footprint Polygon */}
            <Polygon
              positions={latLngs}
              pathOptions={{
                color: isHovered ? '#ffffff' : color,
                fillColor: color,
                fillOpacity: isHovered ? 0.45 : 0.25,
                weight: isHovered ? 3 : 1.5,
                dashArray: props.severity === 'critical' ? '4, 4' : undefined,
              }}
              eventHandlers={{
                mouseover: () => setHoveredId(props.id),
                mouseout: () => setHoveredId(null),
                click: () => {
                  onFeatureClick?.({
                    type: 'hazard',
                    id: props.id,
                    name: props.title,
                    hazardType: props.type,
                    region: props.region,
                    district: props.district,
                    severity: props.severity,
                    status: props.status,
                    issuedDate: props.issuedDate,
                    verificationStatus: props.verificationStatus,
                    description: props.description,
                    metrics: [
                      { label: 'Hazard Classification', value: hazardIcons[props.type] || props.type.toUpperCase() },
                      { label: 'Severity Level', value: props.severity.toUpperCase() },
                      { label: 'Location', value: `${props.district}, ${props.region}` },
                      { label: 'Issuance Reference', value: props.issuedDate },
                      { label: 'Provenance', value: 'Disaster Management & GSI Geohazard Registry' }
                    ]
                  });
                },
              }}
            >
              <Popup>
                <div className="p-2 min-w-[220px]">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>
                    <span>{hazardIcons[props.type] || props.type}</span>
                    <span>· {props.severity}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{props.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{props.description}</p>
                  <div className="mt-2 text-[10px] text-slate-500">
                    <span>Region: {props.region} ({props.district})</span>
                  </div>
                </div>
              </Popup>
            </Polygon>

            {/* Focal Point Indicator */}
            <CircleMarker
              center={centerPos}
              radius={isHovered ? 8 : 6}
              pathOptions={{
                fillColor: color,
                color: '#ffffff',
                weight: 2,
                fillOpacity: 0.9,
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}
