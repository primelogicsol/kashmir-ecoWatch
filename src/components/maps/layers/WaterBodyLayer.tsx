'use client';

import React, { useState } from 'react';
import { Polygon, CircleMarker, Popup } from 'react-leaflet';
import lakesData from '@/data/geojson/lakes.json';
import wetlandsData from '@/data/geojson/wetlands.json';

interface WaterBodyLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const waterQualityColors: Record<string, string> = {
  excellent: '#22d3ee',  // cyan-400
  good: '#3b82f6',       // blue-500
  moderate: '#f59e0b',   // amber-500
  poor: '#ef4444',       // red-500
  critical: '#dc2626',   // red-600
};

export function WaterBodyLayer({ visible = true, onFeatureClick }: WaterBodyLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  // Combine lakes and wetlands with clear metadata
  const allWaterBodies = [
    ...lakesData.features.map(f => ({ ...f, isWetland: false })),
    ...wetlandsData.features.map(f => ({ ...f, isWetland: true }))
  ];

  return (
    <>
      {allWaterBodies.map((feature: any) => {
        const props = feature.properties;
        const isWetland = feature.isWetland;
        const [lng, lat] = feature.geometry.coordinates;
        const qualityStatus = props.waterQualityStatus || 'good';
        const color = waterQualityColors[qualityStatus] || '#3b82f6';
        const isHovered = hoveredId === props.id;
        const isRamsar = props.ramsarSite || props.ramsarSiteNumber;
        const boundaryPolygon = props.boundaryPolygon;

        const handleClick = () => {
          onFeatureClick?.({
            type: isWetland ? 'wetland' : 'lake',
            id: props.id,
            canonicalId: props.canonicalId,
            name: props.name,
            slug: props.slug,
            district: props.district,
            area: props.area_km2,
            elevation: props.elevation_m,
            category: props.category,
            verificationStatus: props.verificationStatus,
            parentWetlandId: props.parentWetlandId,
            componentWaterbodies: props.componentWaterbodies,
            relationshipNote: props.relationshipNote,
            description: `${props.name} is a ${props.category} in ${props.district} district. ${isRamsar ? `Designated Ramsar Wetland of International Importance (Site #${props.ramsarSiteNumber || 'Official'}).` : ''} ${props.relationshipNote || ''}`,
            metrics: [
              { label: 'Category', value: isWetland ? 'Ramsar Wetland Reserve' : 'Open Water Lake' },
              { label: 'Surface Area', value: `${props.area_km2} km²` },
              { label: 'Elevation', value: `${props.elevation_m}m` },
              { label: 'Water Quality', value: qualityStatus.toUpperCase() },
              ...(props.watershed ? [{ label: 'Watershed', value: props.watershed }] : []),
              ...(props.relationshipNote ? [{ label: 'Hydrological Hierarchy', value: props.relationshipNote }] : [])
            ],
          });
        };

        return (
          <React.Fragment key={props.id}>
            {/* If lake has verified polygon boundary, render Polygon */}
            {boundaryPolygon && (
              <Polygon
                positions={boundaryPolygon.map(([pLng, pLat]: [number, number]) => [pLat, pLng])}
                pathOptions={{
                  fillColor: color,
                  color: isHovered ? '#ffffff' : color,
                  weight: isHovered ? 2.5 : 1.5,
                  fillOpacity: isHovered ? 0.6 : 0.35,
                }}
                eventHandlers={{
                  mouseover: () => setHoveredId(props.id),
                  mouseout: () => setHoveredId(null),
                  click: handleClick,
                }}
              />
            )}

            {/* Central marker for point identification and labeling */}
            <CircleMarker
              center={[lat, lng]}
              radius={isHovered ? (isWetland ? 13 : 15) : (isWetland ? 9 : 11)}
              pathOptions={{
                fillColor: isWetland ? '#06b6d4' : color,
                color: isRamsar ? '#ffffff' : '#ffffff80',
                weight: isHovered ? 3 : (isRamsar ? 2 : 1),
                fillOpacity: isHovered ? 0.9 : 0.7,
                dashArray: isRamsar ? '4, 4' : undefined,
              }}
              eventHandlers={{
                mouseover: () => setHoveredId(props.id),
                mouseout: () => setHoveredId(null),
                click: handleClick,
              }}
            >
              <Popup>
                <div className="p-2 min-w-[210px]">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: isWetland ? '#06b6d4' : color }}>
                      {props.category}
                    </span>
                    {isRamsar && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-300">
                        Ramsar #{props.ramsarSiteNumber || 'Site'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{props.name}</h3>
                  <div className="mt-1 space-y-1 text-xs text-slate-600">
                    <p><span className="font-medium text-slate-700">District:</span> {props.district}</p>
                    <p><span className="font-medium text-slate-700">Area:</span> {props.area_km2} km²</p>
                    <p><span className="font-medium text-slate-700">Elevation:</span> {props.elevation_m}m</p>
                    <p><span className="font-medium text-slate-700">Quality:</span> <span className="font-semibold" style={{ color }}>{qualityStatus}</span></p>
                    {props.relationshipNote && (
                      <p className="text-[10px] text-slate-500 italic mt-1 border-t border-slate-200 pt-1">{props.relationshipNote}</p>
                    )}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          </React.Fragment>
        );
      })}
    </>
  );
}
