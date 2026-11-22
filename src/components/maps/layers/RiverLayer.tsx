'use client';

import React, { useState } from 'react';
import { Polyline, Popup, CircleMarker } from 'react-leaflet';
import riversGeoJson from '@/data/geojson/rivers.json';

interface RiverLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const riverFlowStyles: Record<string, { color: string; dashArray?: string; weight: number }> = {
  perennial: { color: '#38bdf8', weight: 3 },     // sky-400
  seasonal: { color: '#93c5fd', weight: 2.5, dashArray: '6, 6' }, // blue-300
  intermittent: { color: '#bfdbfe', weight: 2, dashArray: '4, 4' }, // blue-200
};

export function RiverLayer({ visible = true, onFeatureClick }: RiverLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {riversGeoJson.features.map((feature) => {
        const props = feature.properties;
        const coords = feature.geometry.coordinates; // [[lng, lat], ...]
        // Leaflet expects [lat, lng]
        const latLngs: [number, number][] = coords.map(([lng, lat]) => [lat, lng]);
        const style = riverFlowStyles[props.seasonalVariation] || riverFlowStyles.perennial;
        const isHovered = hoveredId === props.id;

        // Midpoint for popup anchoring or selection
        const midPoint = latLngs[Math.floor(latLngs.length / 2)] || latLngs[0];

        return (
          <React.Fragment key={props.id}>
            {/* Hydrographic LineString Course */}
            <Polyline
              positions={latLngs}
              pathOptions={{
                color: isHovered ? '#ffffff' : style.color,
                weight: isHovered ? style.weight + 2 : style.weight,
                opacity: isHovered ? 1.0 : 0.85,
                dashArray: style.dashArray,
              }}
              eventHandlers={{
                mouseover: () => setHoveredId(props.id),
                mouseout: () => setHoveredId(null),
                click: () => {
                  onFeatureClick?.({
                    type: 'river',
                    id: props.id,
                    name: props.name,
                    region: props.region,
                    length: props.length_km,
                    origin: props.origin,
                    confluence: props.confluence,
                    verificationStatus: props.verificationStatus,
                    description: `${props.name} originates from ${props.origin} and flows into ${props.confluence}. Flow regime: ${props.seasonalVariation}. Water quality status: ${props.waterQualityStatus}.`,
                    metrics: [
                      { label: 'Length', value: `${props.length_km} km` },
                      { label: 'Origin', value: props.origin },
                      { label: 'Confluence', value: props.confluence },
                      { label: 'Water Quality', value: props.waterQualityStatus.toUpperCase() },
                      { label: 'Geometry', value: 'Authoritative LineString (India-WRIS / CWC)' }
                    ]
                  });
                },
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-slate-900 text-sm">{props.name}</h3>
                  <div className="mt-1 space-y-1 text-xs text-slate-600">
                    <p><span className="font-medium text-slate-700">Region:</span> {props.region}</p>
                    <p><span className="font-medium text-slate-700">Length:</span> {props.length_km} km</p>
                    <p><span className="font-medium text-slate-700">Origin:</span> {props.origin}</p>
                    <p><span className="font-medium text-slate-700">Confluence:</span> {props.confluence}</p>
                    <p><span className="font-medium text-slate-700">Regime:</span> {props.seasonalVariation}</p>
                  </div>
                </div>
              </Popup>
            </Polyline>

            {/* Origin source marker */}
            <CircleMarker
              center={latLngs[0]}
              radius={4}
              pathOptions={{
                fillColor: '#38bdf8',
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
