'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowUpRight, Compass, Crosshair, X } from 'lucide-react';
import { SearchMapPin } from '@/lib/search/types';

interface SearchMapExplorerProps {
  pins: SearchMapPin[];
  nearFilter?: { lat: number; lng: number; radiusKm: number } | null;
  onSetNearFilter?: (filter: { lat: number; lng: number; radiusKm: number } | null) => void;
}

function FitMapBounds({ pins }: { pins: SearchMapPin[] }) {
  const map = useMap();
  useEffect(() => {
    if (!pins || pins.length === 0) {
      map.setView([34.25, 75.15], 7);
      return;
    }
    if (pins.length === 1) {
      map.setView([pins[0].lat, pins[0].lng], 10);
      return;
    }
    const lats = pins.map((p) => p.lat);
    const lngs = pins.map((p) => p.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    if (Math.abs(maxLat - minLat) < 0.01 && Math.abs(maxLng - minLng) < 0.01) {
      map.setView([minLat, minLng], 10);
    } else {
      map.fitBounds(
        [
          [minLat, minLng],
          [maxLat, maxLng],
        ],
        { padding: [36, 36], maxZoom: 11 }
      );
    }
  }, [pins, map]);
  return null;
}

function SpatialProximityToolbar({
  nearFilter,
  onSetNearFilter,
}: {
  nearFilter?: { lat: number; lng: number; radiusKm: number } | null;
  onSetNearFilter?: (filter: { lat: number; lng: number; radiusKm: number } | null) => void;
}) {
  const map = useMap();
  if (!onSetNearFilter) return null;

  return (
    <div className="leaflet-top leaflet-right !top-3 !right-3 z-[500]">
      <div className="leaflet-control bg-slate-950/90 backdrop-blur-md border border-white/15 rounded-lg p-2 shadow-xl flex flex-wrap items-center gap-1.5 text-xs">
        {nearFilter ? (
          <>
            <span className="text-emerald-400 font-semibold px-1.5">
              Within {nearFilter.radiusKm} km of center
            </span>
            {[25, 50, 100].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => onSetNearFilter({ ...nearFilter, radiusKm: r })}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                  nearFilter.radiusKm === r
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {r}km
              </button>
            ))}
            <button
              type="button"
              onClick={() => onSetNearFilter(null)}
              className="p-1 rounded bg-white/10 text-slate-300 hover:text-white"
              title="Clear spatial filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              const c = map.getCenter();
              onSetNearFilter({
                lat: Number(c.lat.toFixed(4)),
                lng: Number(c.lng.toFixed(4)),
                radiusKm: 50,
              });
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors cursor-pointer"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Search Near Map Center (50 km)</span>
          </button>
        )}
      </div>
    </div>
  );
}

function getPinColor(resultClass: string): { stroke: string; fill: string } {
  switch (resultClass) {
    case 'operational_intelligence':
      return { stroke: '#fb7185', fill: '#f43f5e' };
    case 'geographic_entity':
      return { stroke: '#38bdf8', fill: '#0ea5e9' };
    case 'scientific_record':
      return { stroke: '#34d399', fill: '#10b981' };
    case 'report_dataset':
      return { stroke: '#fbbf24', fill: '#f59e0b' };
    default:
      return { stroke: '#a78bfa', fill: '#8b5cf6' };
  }
}

export function SearchMapExplorer({
  pins,
  nearFilter,
  onSetNearFilter,
}: SearchMapExplorerProps) {
  const precisionCounts = useMemo(() => {
    let exact = 0;
    let centroid = 0;
    let approximate = 0;
    for (const p of pins) {
      if (p.precision === 'exact') exact++;
      else if (p.precision === 'centroid') centroid++;
      else approximate++;
    }
    return { exact, centroid, approximate };
  }, [pins]);

  return (
    <div className="kew-card-shell p-0 overflow-hidden border border-white/10">
      <div className="px-4 py-3 border-b border-white/10 bg-slate-950/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white">Spatial Intelligence Result Map</span>
          <span className="text-slate-400 font-mono">({pins.length} geolocated records)</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          <span>Exact Point: <strong className="text-emerald-400">{precisionCounts.exact}</strong></span>
          <span>Polygon Centroid: <strong className="text-sky-400">{precisionCounts.centroid}</strong></span>
          {precisionCounts.approximate > 0 && (
            <span>Approximate: <strong className="text-amber-400">{precisionCounts.approximate}</strong></span>
          )}
        </div>
      </div>

      <div className="relative h-[420px] sm:h-[480px] w-full bg-slate-950">
        <MapContainer
          center={[34.25, 75.15]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <FitMapBounds pins={pins} />
          <SpatialProximityToolbar nearFilter={nearFilter} onSetNearFilter={onSetNearFilter} />

          {pins.map((pin) => {
            const colors = getPinColor(pin.resultClass);
            return (
              <CircleMarker
                key={pin.id}
                center={[pin.lat, pin.lng]}
                radius={pin.precision === 'exact' ? 7 : 6}
                pathOptions={{
                  color: colors.stroke,
                  fillColor: colors.fill,
                  fillOpacity: 0.82,
                  weight: 1.5,
                }}
              >
                <Popup className="kew-dark-popup">
                  <div className="text-slate-900 space-y-1.5 min-w-[210px] max-w-[260px]">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {pin.trustBadge}
                    </div>
                    <div className="font-bold text-sm leading-snug">{pin.title}</div>
                    {pin.subtitle && (
                      <div className="text-xs text-slate-600">{pin.subtitle}</div>
                    )}
                    <div className="text-[11px] text-slate-500 font-mono">
                      {pin.lat.toFixed(4)}°N, {pin.lng.toFixed(4)}°E ({pin.precision})
                    </div>
                    <Link
                      href={pin.canonicalUrl}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
                    >
                      <span>Open Canonical Record</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
