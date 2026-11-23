'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { EarthquakeRecord } from '@/data/hazard-earthquakes';
import { USGSEvent } from '@/hooks/useEarthquakeIntelligence';
import { Layers, Satellite, Mountain, Moon, ExternalLink } from 'lucide-react';

const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((m) => m.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((m) => m.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('react-leaflet').then((m) => m.Tooltip),
  { ssr: false }
);

type BasemapStyle = 'dark' | 'satellite' | 'terrain';

interface SeismicEpicenterMapProps {
  events: USGSEvent[];
  zones: EarthquakeRecord[];
  selectedEventId?: string | null;
  onSelectEvent?: (event: USGSEvent) => void;
  onSelectZone?: (zone: EarthquakeRecord) => void;
}

function getMagStyle(mag: number) {
  if (mag >= 4.5) return { color: '#ef4444', fill: '#ef4444', radius: 13, label: 'Significant (M4.5+)' };
  if (mag >= 3.5) return { color: '#f97316', fill: '#f97316', radius: 10, label: 'Moderate (M3.5–4.4)' };
  if (mag >= 2.5) return { color: '#f59e0b', fill: '#fbbf24', radius: 7.5, label: 'Minor (M2.5–3.4)' };
  return { color: '#22d3ee', fill: '#06b6d4', radius: 6, label: 'Micro (<M2.5)' };
}

export function SeismicEpicenterMap({
  events,
  zones,
  selectedEventId,
  onSelectEvent,
  onSelectZone,
}: SeismicEpicenterMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [basemap, setBasemap] = useState<BasemapStyle>('dark');
  const [showFaultZones, setShowFaultZones] = useState(true);
  const [showEpicenters, setShowEpicenters] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[480px] bg-slate-900/80 rounded-2xl border border-white/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-xs text-slate-400">
          <div className="w-7 h-7 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          <span>Initializing Western Himalayan Seismic GIS...</span>
        </div>
      </div>
    );
  }

  const tileConfig =
    basemap === 'satellite'
      ? {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, Maxar | KEW Seismic GIS',
        }
      : basemap === 'terrain'
        ? {
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attribution: '&copy; OpenTopoMap contributors | KEW Seismic GIS',
          }
        : {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; Esri &copy; OpenStreetMap | KEW Seismic GIS',
          };

  return (
    <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-xl">
      {/* Map Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 text-[11px]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Layers className="w-3.5 h-3.5 text-red-400 mr-0.5" />
          <button
            type="button"
            onClick={() => setShowEpicenters((v) => !v)}
            className={`px-2 py-1 rounded-md font-semibold transition-colors ${
              showEpicenters
                ? 'bg-red-500/25 text-red-200 border border-red-500/40'
                : 'bg-white/5 text-slate-400 border border-white/10'
            }`}
          >
            30d Epicenters ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setShowFaultZones((v) => !v)}
            className={`px-2 py-1 rounded-md font-semibold transition-colors ${
              showFaultZones
                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/35'
                : 'bg-white/5 text-slate-400 border border-white/10'
            }`}
          >
            Fault Zones ({zones.length})
          </button>
        </div>

        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setBasemap('dark')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium ${
              basemap === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-3 h-3" /> Dark
          </button>
          <button
            type="button"
            onClick={() => setBasemap('terrain')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium ${
              basemap === 'terrain' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mountain className="w-3 h-3" /> Topo
          </button>
          <button
            type="button"
            onClick={() => setBasemap('satellite')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium ${
              basemap === 'satellite' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Satellite className="w-3 h-3" /> Satellite
          </button>
        </div>
      </div>

      <MapContainer
        center={[34.25, 75.1]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', background: '#020617' }}
      >
        <TileLayer key={basemap} url={tileConfig.url} attribution={tileConfig.attribution} />

        {/* Structural Fault Zones Layer */}
        {showFaultZones &&
          zones.map((z) => {
            const isZoneV = z.zone_classification === 'Zone V';
            return (
              <CircleMarker
                key={`zone-${z.id}`}
                center={[z.latitude, z.longitude]}
                radius={4.5}
                pathOptions={{
                  color: isZoneV ? '#38bdf8' : '#94a3b8',
                  fillColor: isZoneV ? '#0284c7' : '#475569',
                  fillOpacity: 0.55,
                  weight: 1.2,
                  dashArray: '2 2',
                }}
                eventHandlers={{
                  click: () => onSelectZone?.(z),
                }}
              >
                <Tooltip direction="top" offset={[0, -4]}>
                  <div className="text-[11px] font-semibold">
                    {z.district} · {z.zone_classification} ({z.fault_system})
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}

        {/* Live 30-Day Earthquake Epicenters Layer */}
        {showEpicenters &&
          events.map((ev) => {
            const [lon, lat] = ev.coordinates;
            const st = getMagStyle(ev.mag);
            const isSelected = selectedEventId === ev.id;
            return (
              <CircleMarker
                key={`eq-${ev.id}`}
                center={[lat, lon]}
                radius={isSelected ? st.radius + 4 : st.radius}
                pathOptions={{
                  color: isSelected ? '#ffffff' : st.color,
                  fillColor: st.fill,
                  fillOpacity: isSelected ? 0.95 : 0.72,
                  weight: isSelected ? 2.5 : 1.5,
                }}
                eventHandlers={{
                  click: () => onSelectEvent?.(ev),
                }}
              >
                <Tooltip direction="top" offset={[0, -6]}>
                  <div className="text-xs font-bold">
                    M {ev.mag.toFixed(1)} · {ev.place}
                  </div>
                </Tooltip>
                <Popup>
                  <div className="min-w-[220px] text-slate-900 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1">
                      <span className="font-black text-sm text-red-600">M {ev.mag.toFixed(1)}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700">
                        {ev.source || 'EMSC'}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-900">{ev.place}</div>
                    <div className="text-[11px] text-slate-600 space-y-0.5">
                      <div>
                        <strong>Origin (IST):</strong> {ev.time_ist || new Date(ev.time).toLocaleString('en-IN')}
                      </div>
                      <div>
                        <strong>Coordinates:</strong> {lat.toFixed(3)}°N, {lon.toFixed(3)}°E
                      </div>
                      <div>
                        <strong>Focal Depth:</strong> {ev.depth_km} km
                      </div>
                      {ev.nearestFault && (
                        <div>
                          <strong>Nearest Fault:</strong> {ev.nearestFault}
                        </div>
                      )}
                    </div>
                    {ev.externalUrl && (
                      <a
                        href={ev.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline pt-1"
                      >
                        Official Seismological Bulletin <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
      </MapContainer>

      {/* Bottom Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-slate-300">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> M4.5+
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> M3.5–4.4
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> M2.5–3.4
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> &lt;M2.5
          </span>
          <span className="flex items-center gap-1 text-sky-300">
            <span className="w-2 h-2 rounded-full border border-sky-400 bg-sky-600 inline-block" /> Zone V Fault Node
          </span>
        </div>
        <span className="text-slate-400 font-mono">31.8°N–37.6°N · 71.0°E–80.5°E</span>
      </div>
    </div>
  );
}
