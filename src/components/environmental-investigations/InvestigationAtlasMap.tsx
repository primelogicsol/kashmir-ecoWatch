'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Check,
  ExternalLink,
  Key,
  Moon,
  Mountain,
  Satellite,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CANONICAL_INVESTIGATIONS, getDomainById } from '@/data/environmental-investigations';
import { InvestigationRecord, InvestigationStatus } from '@/types/environmental-investigations';

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

type BasemapMode = 'dark' | 'satellite' | 'terrain';

interface InvestigationAtlasMapProps {
  investigations?: InvestigationRecord[];
  highlightCode?: string;
  className?: string;
  showControls?: boolean;
}

export function InvestigationAtlasMap({
  investigations = CANONICAL_INVESTIGATIONS,
  highlightCode,
  className = 'h-[540px]',
  showControls = true,
}: InvestigationAtlasMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [statusFilter, setStatusFilter] = useState<InvestigationStatus | 'all'>('all');
  const [basemapMode, setBasemapMode] = useState<BasemapMode>('dark');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [customCartoKey, setCustomCartoKey] = useState('');
  const [keySavedNotice, setKeySavedNotice] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      setCustomCartoKey(localStorage.getItem('kew_custom_carto_key') || '');
    } catch {}
  }, []);

  const handleSaveKey = () => {
    try {
      localStorage.setItem('kew_custom_carto_key', customCartoKey);
      setKeySavedNotice(true);
      setTimeout(() => {
        setKeySavedNotice(false);
        setIsKeyModalOpen(false);
      }, 1200);
    } catch {}
  };

  const filtered =
    statusFilter === 'all'
      ? investigations
      : investigations.filter((i) => i.status === statusFilter);

  const getStatusColor = (status: InvestigationStatus) => {
    switch (status) {
      case 'published':
        return '#10b981'; // emerald-500
      case 'active_investigation':
        return '#06b6d4'; // cyan-500
      case 'scoping_review':
        return '#f59e0b'; // amber-500
      default:
        return '#94a3b8'; // slate-400
    }
  };

  if (!isClient) {
    return (
      <div className={`w-full ${className} bg-slate-900 rounded-lg flex items-center justify-center border border-white/10`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-xs font-mono">
            Initialising KEW-EIAI Spatial Investigation Atlas...
          </span>
        </div>
      </div>
    );
  }

  const getTileConfig = () => {
    if (basemapMode === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri, Maxar, Earthstar Geographics | KEW-EIAI GIS',
        maxZoom: 18,
      };
    }
    if (basemapMode === 'terrain') {
      return {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenTopoMap contributors | KEW-EIAI GIS',
        maxZoom: 17,
      };
    }
    return {
      url: customCartoKey
        ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${customCartoKey}`
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri &copy; OpenStreetMap contributors | KEW-EIAI GIS',
      maxZoom: 16,
    };
  };

  const currentTile = getTileConfig();
  const centerCoord: [number, number] = highlightCode
    ? investigations.find((i) => i.code === highlightCode)?.coordinates || [34.12, 74.92]
    : [34.12, 74.92];

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
      {showControls && (
        <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/95 backdrop-blur-md p-2.5 rounded-lg border border-white/15 text-xs shadow-xl">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1">
              Status:
            </span>
            {(
              [
                { id: 'all', label: `All (${investigations.length})` },
                { id: 'published', label: 'Published' },
                { id: 'active_investigation', label: 'Active' },
                { id: 'scoping_review', label: 'Scoping' },
                { id: 'proposed', label: 'Proposed' },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFilter(st.id)}
                className={`px-2.5 py-1 rounded-sm font-medium text-[11px] transition-all ${
                  statusFilter === st.id
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
            <button
              type="button"
              onClick={() => setBasemapMode('dark')}
              className={`px-2 py-1 rounded-sm text-xs flex items-center gap-1 ${
                basemapMode === 'dark'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline">Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setBasemapMode('satellite')}
              className={`px-2 py-1 rounded-sm text-xs flex items-center gap-1 ${
                basemapMode === 'satellite'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline">Satellite</span>
            </button>
            <button
              type="button"
              onClick={() => setBasemapMode('terrain')}
              className={`px-2 py-1 rounded-sm text-xs flex items-center gap-1 ${
                basemapMode === 'terrain'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline">Terrain</span>
            </button>
            <button
              type="button"
              onClick={() => setIsKeyModalOpen(true)}
              className="ml-1 px-2 py-1 rounded-sm text-[10px] flex items-center gap-1 border border-white/10 bg-slate-900 text-slate-300 hover:text-white"
            >
              <Key className="w-3 h-3" />
              <span>Tiles</span>
            </button>
          </div>
        </div>
      )}

      <div className={`w-full ${className}`}>
        <MapContainer
          key={`${basemapMode}-${highlightCode || 'all'}`}
          center={centerCoord}
          zoom={highlightCode ? 11 : 9}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', background: '#020617' }}
        >
          <TileLayer
            url={currentTile.url}
            attribution={currentTile.attribution}
            maxZoom={currentTile.maxZoom}
          />
          {basemapMode === 'dark' && !customCartoKey && (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
              attribution=""
              maxZoom={16}
            />
          )}

          {filtered.map((inv) => {
            const color = getStatusColor(inv.status);
            const isHighlighted = inv.code === highlightCode;
            const domain = getDomainById(inv.primaryDomainId);

            return (
              <CircleMarker
                key={inv.code}
                center={inv.coordinates}
                radius={isHighlighted ? 18 : inv.status === 'published' ? 15 : 12}
                pathOptions={{
                  color,
                  fillColor: color,
                  fillOpacity: 0.72,
                  weight: isHighlighted ? 3.5 : 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.96}>
                  <div className="text-slate-900 font-sans p-1">
                    <div className="font-mono text-[10px] font-bold text-slate-600">
                      {inv.code} · {inv.statusLabel}
                    </div>
                    <div className="font-bold text-xs">{inv.shortTitle}</div>
                    <div className="text-[10px] text-slate-600">
                      {domain?.name} • {inv.districts.join(', ')}
                    </div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="p-2 max-w-xs text-slate-900 font-sans">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                        {inv.code}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800">
                        {inv.temporalScope}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-950 leading-snug mb-1">
                      {inv.shortTitle}
                    </h4>
                    <p className="text-xs text-slate-600 mb-2">{inv.subtitle}</p>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-slate-100 p-2 rounded mb-2">
                      <div>
                        <span className="text-slate-500 block">Status:</span>
                        <span className="font-bold text-slate-900">{inv.statusLabel}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Evidence Claims:</span>
                        <span className="font-bold text-slate-900">
                          {inv.evidenceMatrix.length} Verified/Graded
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/environmental-investigations/reports/${inv.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
                    >
                      <span>Open Investigation Record</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom Legend */}
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="bg-slate-950/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] sm:text-[11px] flex items-center gap-3 overflow-x-auto pointer-events-auto">
          <span className="text-slate-400 font-semibold uppercase">Legend:</span>
          <span className="inline-flex items-center gap-1.5 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Published
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Active
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Scoping
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" /> Proposed
          </span>
        </div>

        <div className="bg-slate-950/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[10px] text-emerald-300 font-mono pointer-events-auto">
          KEW Shared GIS Engine • Zero External Lock-In
        </div>
      </div>

      {isKeyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-slate-900 border border-white/15 rounded-lg shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-sm text-white">Open GIS Tile Settings</h3>
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              KEW-EIAI reuses the platform’s open Esri Dark, Esri World Imagery, and OpenTopoMap tiles with zero mandatory API keys. Optionally enter a CARTO key below:
            </p>
            <input
              type="text"
              value={customCartoKey}
              onChange={(e) => setCustomCartoKey(e.target.value)}
              placeholder="Optional CARTO API key"
              className="w-full px-3 py-2 bg-slate-950 border border-white/15 text-white font-mono text-xs"
            />
            <div className="flex items-center justify-between pt-2">
              {keySavedNotice ? (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Saved
                </span>
              ) : (
                <span />
              )}
              <Button size="sm" onClick={handleSaveKey}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
