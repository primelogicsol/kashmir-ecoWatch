'use client';

import React, { useState } from 'react';
import { Polygon, CircleMarker, Popup } from 'react-leaflet';
import protectedAreasData from '@/data/geojson/protected-areas.json';

interface ProtectedAreaLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const categoryColors: Record<string, string> = {
  national_park: '#10b981',        // emerald-500
  wildlife_sanctuary: '#3b82f6',   // blue-500
  wetland_reserve: '#06b6d4',      // cyan-500
  conservation_reserve: '#f59e0b', // amber-500
  iba: '#a855f7',                  // purple-500
};

const categoryLabels: Record<string, string> = {
  national_park: 'National Park',
  wildlife_sanctuary: 'Wildlife Sanctuary',
  wetland_reserve: 'Wetland Reserve',
  conservation_reserve: 'Conservation Reserve',
  iba: 'Important Bird Area (IBA)',
};

export function ProtectedAreaLayer({ visible = true, onFeatureClick }: ProtectedAreaLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {protectedAreasData.features.map((feature: any) => {
        const props = feature.properties;
        const geom = feature.geometry;
        const category = props.category;
        const color = categoryColors[category] || '#64748b';
        const isHovered = hoveredId === props.id;

        const handleClick = () => {
          onFeatureClick?.({
            type: 'protected_area',
            id: props.id,
            category,
            name: props.name,
            district: props.district,
            region: props.region,
            area: props.area_km2,
            keySpecies: props.keySpecies || [],
            verificationStatus: props.verificationStatus,
            description: `${props.name} is a designated ${categoryLabels[category] || category} in ${props.district || 'Western Himalayas'}. Governed under Wildlife Protection framework. Data source: Wildlife Institute of India (WII) & Department of Wildlife Protection.`,
            metrics: [
              { label: 'Category', value: categoryLabels[category] || category },
              { label: 'District / Region', value: `${props.district || ''} (${props.region || 'Western Himalayas'})` },
              { label: 'Reported Area', value: props.area_km2 ? `${props.area_km2} km²` : 'Designated Boundary' },
              { label: 'Geometry Standard', value: geom.type === 'Polygon' ? 'Authoritative Boundary Polygon' : 'Verified Central Coordinates' },
              { label: 'Key Species', value: Array.isArray(props.keySpecies) ? props.keySpecies.slice(0, 3).join(', ') : 'Protected Wildlife' }
            ]
          });
        };

        if (geom.type === 'Polygon') {
          const latLngs: [number, number][] = geom.coordinates[0].map(([lng, lat]: [number, number]) => [lat, lng]);

          return (
            <Polygon
              key={props.id}
              positions={latLngs}
              pathOptions={{
                color: isHovered ? '#ffffff' : color,
                fillColor: color,
                fillOpacity: isHovered ? 0.5 : 0.25,
                weight: isHovered ? 3 : 1.5,
              }}
              eventHandlers={{
                mouseover: () => setHoveredId(props.id),
                mouseout: () => setHoveredId(null),
                click: handleClick,
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
                    {categoryLabels[category] || category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{props.name}</h3>
                  <div className="mt-1 space-y-1 text-xs text-slate-600">
                    <p><span className="font-medium text-slate-700">District:</span> {props.district}</p>
                    {props.area_km2 && <p><span className="font-medium text-slate-700">Area:</span> {props.area_km2} km²</p>}
                    <p className="text-[10px] text-emerald-600 font-mono">Verified Boundary Polygon</p>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        }

        // Point representation for reserves and IBAs
        const [lng, lat] = geom.coordinates;
        return (
          <CircleMarker
            key={props.id}
            center={[lat, lng]}
            radius={isHovered ? 12 : (category === 'national_park' ? 10 : 8)}
            pathOptions={{
              fillColor: color,
              color: '#ffffff',
              weight: isHovered ? 2.5 : 1.5,
              fillOpacity: isHovered ? 0.9 : 0.7,
            }}
            eventHandlers={{
              mouseover: () => setHoveredId(props.id),
              mouseout: () => setHoveredId(null),
              click: handleClick,
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
                  {categoryLabels[category] || category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">{props.name}</h3>
                <div className="mt-1 space-y-1 text-xs text-slate-600">
                  <p><span className="font-medium text-slate-700">District:</span> {props.district}</p>
                  {props.area_km2 && <p><span className="font-medium text-slate-700">Area:</span> {props.area_km2} km²</p>}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
