'use client';

import React, { useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import sightingsGeoJson from '@/data/geojson/sightings.json';

interface SightingLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

export function SightingLayer({ visible = true, onFeatureClick }: SightingLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {sightingsGeoJson.features.map((feature) => {
        const props = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;
        const isHovered = hoveredId === props.id;

        return (
          <CircleMarker
            key={props.id}
            center={[lat, lng]}
            radius={isHovered ? 12 : 9}
            pathOptions={{
              fillColor: '#10b981', // emerald-500
              color: props.isFuzzed ? '#f59e0b' : '#ffffff', // Amber boundary for privacy-fuzzed anti-poaching
              weight: props.isFuzzed ? 2.5 : 2,
              fillOpacity: isHovered ? 0.9 : 0.75,
              dashArray: props.isFuzzed ? '3, 3' : undefined,
            }}
            eventHandlers={{
              mouseover: () => setHoveredId(props.id),
              mouseout: () => setHoveredId(null),
              click: () => {
                onFeatureClick?.({
                  type: 'sighting',
                  id: props.id,
                  name: `${props.species} Observation (${props.count} indiv.)`,
                  species: props.species,
                  scientificName: props.scientificName,
                  location: props.location,
                  region: props.region,
                  district: props.district,
                  count: props.count,
                  timestamp: props.timestamp,
                  habitat: props.habitat,
                  observerAffiliation: props.observerAffiliation,
                  evidenceSource: props.evidenceSource,
                  isFuzzed: props.isFuzzed,
                  verificationStatus: props.verificationStatus,
                  description: `Verified scientific observation of ${props.count} ${props.species} (${props.scientificName}) in ${props.location}, ${props.district}. Observer: ${props.observerAffiliation}. Source: ${props.evidenceSource}. ${props.isFuzzed ? 'Coordinates spatially generalized to 1km grid pursuant to KEW Anti-Poaching Wildlife Protection Standard.' : ''}`,
                  metrics: [
                    { label: 'Observed Count', value: `${props.count} individuals` },
                    { label: 'Habitat', value: props.habitat },
                    { label: 'Affiliation', value: props.observerAffiliation },
                    { label: 'Timestamp', value: new Date(props.timestamp).toLocaleDateString() },
                    { label: 'Spatial Privacy', value: props.isFuzzed ? 'Fuzzed (Anti-Poaching Policy)' : 'Exact Public Grid' }
                  ]
                });
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[220px]">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Verified Observation</span>
                  {props.isFuzzed && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      Privacy-Blurred
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{props.species}</h3>
                <p className="text-xs italic text-slate-500">{props.scientificName}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-600">
                  <p><span className="font-medium text-slate-700">Count:</span> {props.count}</p>
                  <p><span className="font-medium text-slate-700">Location:</span> {props.location}</p>
                  <p><span className="font-medium text-slate-700">Habitat:</span> {props.habitat}</p>
                  <p><span className="font-medium text-slate-700">Source:</span> {props.observerAffiliation}</p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
