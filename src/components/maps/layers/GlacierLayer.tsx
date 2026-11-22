'use client';

import React, { useState } from 'react';
import { Polygon, Popup } from 'react-leaflet';
import glaciersGeoJson from '@/data/geojson/glaciers.json';

interface GlacierLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

export function GlacierLayer({ visible = true, onFeatureClick }: GlacierLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {glaciersGeoJson.features.map((feature) => {
        const props = feature.properties;
        const coords = feature.geometry.coordinates[0]; // [[lng, lat], ...]
        const latLngs: [number, number][] = coords.map(([lng, lat]) => [lat, lng]);
        const isHovered = hoveredId === props.id;

        return (
          <Polygon
            key={props.id}
            positions={latLngs}
            pathOptions={{
              color: isHovered ? '#38bdf8' : '#7dd3fc',
              fillColor: '#bae6fd',
              fillOpacity: isHovered ? 0.6 : 0.35,
              weight: isHovered ? 2.5 : 1.5,
            }}
            eventHandlers={{
              mouseover: () => setHoveredId(props.id),
              mouseout: () => setHoveredId(null),
              click: () => {
                onFeatureClick?.({
                  type: 'glacier',
                  id: props.id,
                  name: props.name,
                  rgiId: props.rgiId,
                  region: props.region,
                  district: props.district,
                  area: props.area_km2,
                  elevationRange: props.elevation_range_m,
                  retreatRate: props.retreat_rate_m_yr,
                  inventoryDate: props.inventoryDate,
                  verificationStatus: props.verificationStatus,
                  description: `${props.name} (${props.rgiId}) in ${props.district}, ${props.region}. Surface area: ${props.area_km2} km². Elevation range: ${props.elevation_range_m}m. Decadal retreat rate: ~${props.retreat_rate_m_yr} m/year. Inventory date: ${props.inventoryDate}.`,
                  metrics: [
                    { label: 'Surface Area', value: `${props.area_km2} km²` },
                    { label: 'Elevation Range', value: `${props.elevation_range_m}m` },
                    { label: 'Retreat Rate', value: `${props.retreat_rate_m_yr} m/year` },
                    { label: 'RGI Catalog ID', value: props.rgiId },
                    { label: 'Inventory Reference', value: props.inventoryDate }
                  ]
                });
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[210px]">
                <h3 className="font-bold text-slate-900 text-sm">{props.name}</h3>
                <div className="mt-1 space-y-1 text-xs text-slate-600">
                  <p><span className="font-medium text-slate-700">RGI ID:</span> {props.rgiId}</p>
                  <p><span className="font-medium text-slate-700">Area:</span> {props.area_km2} km²</p>
                  <p><span className="font-medium text-slate-700">Elevation:</span> {props.elevation_range_m}m</p>
                  <p><span className="font-medium text-slate-700">Retreat Rate:</span> {props.retreat_rate_m_yr} m/yr</p>
                  <p><span className="font-medium text-slate-700">Inventory:</span> {props.inventoryDate}</p>
                </div>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}
