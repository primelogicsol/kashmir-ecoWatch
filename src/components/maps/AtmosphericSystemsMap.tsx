'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Moon, Mountain, Satellite, Layers } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then((m) => m.CircleMarker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then((m) => m.Polyline), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then((m) => m.Tooltip), { ssr: false });

export interface AtmosphericMapMarker {
  id: string;
  title: string;
  subtitle: string;
  lat: number;
  lon: number;
  color: string;
  radius?: number;
  liveSummary: string;
  forecastSummary: string;
}

interface AtmosphericSystemsMapProps {
  markers: AtmosphericMapMarker[];
  polylineCoords?: [number, number][];
  polylineColor?: string;
  legendItems: Array<{ color: string; label: string }>;
  center?: [number, number];
  zoom?: number;
  onSelectMarker?: (id: string) => void;
}

export function AtmosphericSystemsMap({
  markers,
  polylineCoords,
  polylineColor = '#38bdf8',
  legendItems,
  center = [34.25, 75.15],
  zoom = 6,
  onSelectMarker,
}: AtmosphericSystemsMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [basemap, setBasemap] = useState<'dark' | 'terrain' | 'satellite'>('dark');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[460px] rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-xs text-slate-400">
          <div className="w-7 h-7 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span>Initializing Atmospheric GIS Surface...</span>
        </div>
      </div>
    );
  }

  const tileConfig =
    basemap === 'satellite'
      ? {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, Maxar | KEW Atmospheric GIS',
        }
      : basemap === 'terrain'
        ? {
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attribution: '&copy; OpenTopoMap | KEW Atmospheric GIS',
          }
        : {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; Esri &copy; OpenStreetMap | KEW Atmospheric GIS',
          };

  return (
    <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-xl">
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>Atmospheric Telemetry Nodes ({markers.length})</span>
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
            <Satellite className="w-3 h-3" /> Sat
          </button>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', background: '#020617' }}
      >
        <TileLayer key={basemap} url={tileConfig.url} attribution={tileConfig.attribution} />

        {polylineCoords && polylineCoords.length > 1 && (
          <Polyline
            positions={polylineCoords}
            pathOptions={{ color: polylineColor, weight: 2.5, dashArray: '5 5', opacity: 0.75 }}
          />
        )}

        {markers.map((m) => (
          <CircleMarker
            key={m.id}
            center={[m.lat, m.lon]}
            radius={m.radius || 8.5}
            pathOptions={{
              color: m.color,
              fillColor: m.color,
              fillOpacity: 0.78,
              weight: 1.5,
            }}
            eventHandlers={{
              click: () => onSelectMarker?.(m.id),
            }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              <div className="text-xs font-bold">{m.title}</div>
            </Tooltip>
            <Popup>
              <div className="min-w-[220px] text-slate-900 text-xs space-y-1.5">
                <div className="font-bold border-b border-slate-200 pb-1">{m.title}</div>
                <div className="text-[11px] text-slate-600">{m.subtitle}</div>
                <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 text-[11px]">
                  <div className="font-bold text-emerald-800 text-[9px] uppercase">0h NWP Model Analysis</div>
                  <div>{m.liveSummary}</div>
                </div>
                <div className="p-1.5 rounded bg-sky-50 border border-sky-200 text-[11px]">
                  <div className="font-bold text-sky-800 text-[9px] uppercase">7-Day NWP Forecast</div>
                  <div>{m.forecastSummary}</div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="absolute bottom-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-slate-300">
        <div className="flex items-center gap-3 flex-wrap">
          {legendItems.map((li) => (
            <span key={li.label} className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: li.color }} />
              {li.label}
            </span>
          ))}
        </div>
        <span className="text-slate-400 font-mono">Kashmir · Jammu · Ladakh · AJK · Gilgit · Baltistan</span>
      </div>
    </div>
  );
}
