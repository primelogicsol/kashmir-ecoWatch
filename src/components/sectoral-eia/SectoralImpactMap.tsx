'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Layers, 
  MapPin, 
  Compass, 
  TreePine, 
  Hammer, 
  Wheat, 
  AlertTriangle, 
  Maximize2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Satellite,
  Mountain,
  Moon,
  Key,
  Settings,
  X,
  Check
} from 'lucide-react';
import { SHARED_ASSESSMENT_DATABASE, CUMULATIVE_IMPACT_HOTSPOTS } from '@/data/sectoral-eia';
import { SectorType } from '@/types/sectoral-eia';

// SSR-safe dynamic Leaflet imports
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

export type BasemapMode = 'dark' | 'satellite' | 'terrain' | 'mapbox_dark' | 'mapbox_sat';

interface SectoralImpactMapProps {
  selectedSector?: SectorType | 'all';
  highlightAssessmentId?: string;
  className?: string;
  showFilters?: boolean;
}

export function SectoralImpactMap({
  selectedSector = 'all',
  highlightAssessmentId,
  className = 'h-[540px]',
  showFilters = true
}: SectoralImpactMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [activeSector, setActiveSector] = useState<SectorType | 'all'>(selectedSector);
  const [activeLayer, setActiveLayer] = useState<'assessments' | 'cumulative'>('assessments');
  const [basemapMode, setBasemapMode] = useState<BasemapMode>('dark');
  
  // Custom API Key configuration state
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [customMapboxToken, setCustomMapboxToken] = useState<string>('');
  const [customCartoKey, setCustomCartoKey] = useState<string>('');
  const [keySavedNotice, setKeySavedNotice] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedMapbox = localStorage.getItem('kew_custom_mapbox_token') || process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
      const storedCarto = localStorage.getItem('kew_custom_carto_key') || process.env.NEXT_PUBLIC_CARTO_API_KEY || '';
      setCustomMapboxToken(storedMapbox);
      setCustomCartoKey(storedCarto);
    } catch {}
  }, []);

  const handleSaveKeys = () => {
    try {
      localStorage.setItem('kew_custom_mapbox_token', customMapboxToken);
      localStorage.setItem('kew_custom_carto_key', customCartoKey);
      setKeySavedNotice(true);
      setTimeout(() => {
        setKeySavedNotice(false);
        setIsKeyModalOpen(false);
      }, 1500);
    } catch {}
  };

  const filteredAssessments = activeSector === 'all'
    ? SHARED_ASSESSMENT_DATABASE
    : SHARED_ASSESSMENT_DATABASE.filter(a => a.sector === activeSector);

  const getSectorColor = (sector: SectorType) => {
    switch (sector) {
      case 'tourism': return '#f59e0b'; // amber
      case 'horticulture': return '#10b981'; // emerald
      case 'handicrafts': return '#06b6d4'; // cyan
      case 'agriculture': return '#84cc16'; // lime
      default: return '#10b981';
    }
  };

  if (!isClient) {
    return (
      <div className={`w-full ${className} bg-slate-900/80 rounded-2xl flex items-center justify-center border border-white/10`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-400 text-xs font-mono">Initializing Spatial Cartography (No API Key Required)...</span>
        </div>
      </div>
    );
  }

  // Determine Tile URL based on selected mode and available custom keys
  const getTileConfig = () => {
    if (basemapMode === 'mapbox_dark' && customMapboxToken) {
      return {
        url: `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${customMapboxToken}`,
        attribution: '&copy; Mapbox &copy; OpenStreetMap | SEIAE GIS Engine',
        maxZoom: 20
      };
    }
    if (basemapMode === 'mapbox_sat' && customMapboxToken) {
      return {
        url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${customMapboxToken}`,
        attribution: '&copy; Mapbox &copy; Maxar | SEIAE GIS Engine',
        maxZoom: 20
      };
    }
    if (basemapMode === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri, Maxar, Earthstar Geographics | SEIAE Open GIS',
        maxZoom: 18
      };
    }
    if (basemapMode === 'terrain') {
      return {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: '&copy; OpenTopoMap contributors | SEIAE Open GIS',
        maxZoom: 17
      };
    }
    // Default open dark canvas (No key required)
    return {
      url: customCartoKey
        ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${customCartoKey}`
        : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri &copy; OpenStreetMap contributors | SEIAE Open GIS',
      maxZoom: 16
    };
  };

  const currentTile = getTileConfig();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
      {/* Top Map Control Bar */}
      {showFilters && (
        <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/95 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-white/15 text-xs shadow-2xl max-h-56 sm:max-h-none overflow-y-auto sm:overflow-visible">
          {/* Layer Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1">Layer:</span>
            <button
              type="button"
              onClick={() => setActiveLayer('assessments')}
              className={`px-2 sm:px-2.5 py-1 rounded-md font-medium text-[11px] sm:text-xs transition-all ${
                activeLayer === 'assessments'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              Sector Assessments ({filteredAssessments.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveLayer('cumulative')}
              className={`px-2 sm:px-2.5 py-1 rounded-md font-medium text-[11px] sm:text-xs transition-all ${
                activeLayer === 'cumulative'
                  ? 'bg-rose-600 text-white shadow-sm font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              Cumulative Hotspots ({CUMULATIVE_IMPACT_HOTSPOTS.length})
            </button>
          </div>

          {/* Sector Filter & Basemap Toggles */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-full py-0.5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mr-1 shrink-0">Sector:</span>
              {(['all', 'tourism', 'horticulture', 'handicrafts', 'agriculture'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSector(s)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-all whitespace-nowrap shrink-0 ${
                    activeSector === s
                      ? 'bg-white/20 text-white font-bold border border-white/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Basemap Switcher (Dark / Satellite / Terrain) */}
            <div className="flex items-center gap-1 pl-2 border-l border-white/10">
              <button
                type="button"
                onClick={() => setBasemapMode('dark')}
                title="Dark Canvas (Open Esri)"
                className={`p-1 rounded text-xs flex items-center gap-1 ${
                  basemapMode === 'dark' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium hidden sm:inline">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setBasemapMode('satellite')}
                title="Satellite Imagery (Open Esri World Imagery)"
                className={`p-1 rounded text-xs flex items-center gap-1 ${
                  basemapMode === 'satellite' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Satellite className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium hidden sm:inline">Satellite</span>
              </button>
              <button
                type="button"
                onClick={() => setBasemapMode('terrain')}
                title="Topographic Terrain (OpenTopoMap)"
                className={`p-1 rounded text-xs flex items-center gap-1 ${
                  basemapMode === 'terrain' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mountain className="w-3.5 h-3.5" />
                <span className="text-[10px] font-medium hidden sm:inline">Terrain</span>
              </button>

              {/* Optional Custom API Key Button */}
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(true)}
                title="API Key & Tile Engine Configuration"
                className={`ml-1 px-2 py-0.5 rounded text-[10px] flex items-center gap-1 border transition-all ${
                  customMapboxToken || customCartoKey
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold'
                    : 'border-white/10 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <Key className="w-3 h-3" />
                <span>{customMapboxToken || customCartoKey ? 'Custom Key' : 'API Key'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <div className={`w-full ${className}`}>
        <MapContainer
          key={`${basemapMode}-${customMapboxToken ? 'mb' : 'open'}`}
          center={[34.12, 74.75]}
          zoom={9}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', background: '#020617' }}
        >
          {/* Active Basemap Tile Layer */}
          <TileLayer
            url={currentTile.url}
            attribution={currentTile.attribution}
            maxZoom={currentTile.maxZoom}
          />

          {/* Reference Overlay for Dark Canvas */}
          {basemapMode === 'dark' && !customCartoKey && (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
              attribution=""
              maxZoom={16}
            />
          )}

          {activeLayer === 'assessments' &&
            filteredAssessments.map((record) => {
              const color = getSectorColor(record.sector);
              const isHighlighted = record.id === highlightAssessmentId;
              const radius = isHighlighted ? 18 : 14;

              return (
                <CircleMarker
                  key={record.id}
                  center={record.geographicBoundary.coordinates}
                  radius={radius}
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.75,
                    weight: isHighlighted ? 3.5 : 2,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                    <div className="text-slate-900 font-sans p-1">
                      <div className="font-bold text-xs">{record.title}</div>
                      <div className="text-[10px] text-slate-600 capitalize">
                        Sector: {record.sector} • Score: {record.overallScore}/100
                      </div>
                    </div>
                  </Tooltip>
                  <Popup>
                    <div className="p-2 max-w-xs text-slate-900 font-sans">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                          {record.code}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-600 capitalize">
                          {record.sector}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm mb-1 text-slate-950 leading-snug">
                        {record.title}
                      </h4>
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                        {record.summary}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-100 p-2 rounded mb-2">
                        <div>
                          <span className="text-slate-500 block">Integrity Score:</span>
                          <span className="font-bold text-slate-800">{record.overallScore} / 100</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Significance:</span>
                          <span className="font-bold text-amber-700">{record.impactSignificance}</span>
                        </div>
                      </div>
                      <Link
                        href={`/sectoral-eia/assessment/${record.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
                      >
                        <span>View Complete Scientific Dossier</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

          {activeLayer === 'cumulative' &&
            CUMULATIVE_IMPACT_HOTSPOTS.map((hotspot) => (
              <CircleMarker
                key={hotspot.id}
                center={
                  hotspot.id === 'hotspot-dal'
                    ? [34.113, 74.871]
                    : hotspot.id === 'hotspot-south-karewa'
                    ? [33.721, 74.832]
                    : hotspot.id === 'hotspot-wular-basin'
                    ? [34.341, 74.612]
                    : [34.053, 74.382]
                }
                radius={24}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.45,
                  weight: 2.5,
                  dashArray: '6, 6'
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="p-1 font-sans text-slate-900">
                    <div className="font-bold text-xs text-red-700">{hotspot.name}</div>
                    <div className="text-[10px] text-slate-600">
                      Stress Index: {hotspot.stressIndex}/100 • Priority: {hotspot.mitigationPriority}
                    </div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="p-2 max-w-xs text-slate-900 font-sans">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                      Cumulative Stress Hotspot
                    </span>
                    <h4 className="font-bold text-sm mt-1 mb-1 text-slate-950">
                      {hotspot.name}
                    </h4>
                    <p className="text-xs text-slate-600 mb-2">
                      {hotspot.synergyDescription}
                    </p>
                    <div className="text-[11px] mb-2 space-y-1">
                      <div>
                        <span className="font-semibold text-slate-700">Converging Sectors: </span>
                        <span className="text-slate-600 capitalize">{hotspot.convergingSectors.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Stress Index: </span>
                        <span className="font-bold text-red-600">{hotspot.stressIndex} / 100</span>
                      </div>
                    </div>
                    <Link
                      href="/sectoral-eia/cumulative-impact"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:text-red-900 underline"
                    >
                      <span>Explore Cumulative Impact Matrix</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
        </MapContainer>
      </div>

      {/* Bottom Status & Legend Bar */}
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-[1000] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pointer-events-none">
        <div className="bg-slate-950/95 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border border-white/10 text-[10px] sm:text-[11px] flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto scrollbar-none whitespace-nowrap pointer-events-auto shadow-xl max-w-full">
          <span className="text-slate-400 font-semibold uppercase text-[9px] sm:text-[10px] shrink-0">Legend:</span>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="text-slate-300">Tourism</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-slate-300">Horticulture</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-cyan-400 inline-block" />
            <span className="text-slate-300">Handicrafts</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-lime-400 inline-block" />
            <span className="text-slate-300">Agriculture</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-red-500 bg-red-500/40 inline-block" />
            <span className="text-slate-300">Cumulative Hotspot</span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="bg-slate-950/95 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-emerald-500/30 text-[10px] sm:text-[11px] flex items-center gap-1.5 sm:gap-2 pointer-events-auto shadow-xl self-start sm:self-auto shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="text-emerald-300 font-semibold whitespace-nowrap">
            {customMapboxToken ? 'Custom Mapbox Active' : customCartoKey ? 'Custom CARTO Active' : (
              <>
                <span className="hidden sm:inline">Open Public Cartography • </span>Zero Key Required
              </>
            )}
          </span>
        </div>
      </div>

      {/* OPTIONAL CUSTOM API KEY MODAL */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/15 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Geospatial Key Configuration</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
              <span className="font-bold text-white block">No API Key Is Required:</span>
              <p className="leading-relaxed">
                Kashmir EcoWatch defaults to 100% open, verified public tile infrastructure (Esri World Dark Canvas, Esri High-Resolution Satellite, and OpenTopoMap).
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                If your organization has dedicated commercial licenses for Mapbox or CARTO, enter them below to enable proprietary vector styling:
              </p>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Optional Mapbox Public Access Token (<code className="text-emerald-400">pk.eyJ...</code>)
                </label>
                <input
                  type="text"
                  value={customMapboxToken}
                  onChange={(e) => setCustomMapboxToken(e.target.value)}
                  placeholder="Leave empty for open public basemaps"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">
                  Optional CARTO API Key
                </label>
                <input
                  type="text"
                  value={customCartoKey}
                  onChange={(e) => setCustomCartoKey(e.target.value)}
                  placeholder="Leave empty for open public basemaps"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              {keySavedNotice ? (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" /> Configuration Saved!
                </span>
              ) : (
                <span className="text-[11px] text-slate-500">Stored locally in your browser</span>
              )}

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsKeyModalOpen(false)}
                  className="border-white/15 text-xs text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSaveKeys}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Save & Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
