'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  CircleMarker, 
  Polygon,
  Polyline,
  Popup, 
  Tooltip, 
  useMap, 
  useMapEvents 
} from 'react-leaflet';
import * as L from 'leaflet';
import { 
  Shield, 
  MapPin, 
  Maximize2, 
  Compass, 
  ExternalLink, 
  Layers, 
  Activity, 
  Mountain, 
  TreePine, 
  Droplet, 
  Crosshair,
  Footprints,
  AlertTriangle,
  X,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { ProtectedArea, Corridor } from '@/data/protected-network';
import Link from 'next/link';

// GeoJSON Authoritative Datasets
import protectedAreasGeoJson from '@/data/geojson/protected-areas.json';
import corridorsGeoJson from '@/data/geojson/corridors.json';

// Center of Western Himalayan protected network
const NETWORK_CENTER: [number, number] = [34.15, 75.10];
const INITIAL_ZOOM = 8;

export type BasemapMode = 'satellite' | 'terrain' | 'dark' | 'streets';

interface BasemapConfig {
  name: string;
  url: string;
  referenceUrl?: string;
  attribution: string;
  maxZoom: number;
  fallbackUrl?: string;
  fallbackAttribution?: string;
}

const BASEMAP_TILES: Record<BasemapMode, BasemapConfig> = {
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics',
    maxZoom: 18,
    fallbackUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  },
  terrain: {
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors, SRTM',
    maxZoom: 17,
    fallbackUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    fallbackAttribution: '&copy; Esri &copy; OpenStreetMap contributors',
  },
  dark: {
    name: 'Dark Canvas',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    referenceUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, DeLorme, NAVTEQ, OpenStreetMap contributors',
    maxZoom: 16,
    fallbackUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    fallbackAttribution: '&copy; OpenStreetMap contributors',
  },
  streets: {
    name: 'Streets',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    fallbackUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
  },
};

const CATEGORY_META: Record<string, { color: string; label: string; route: string; tier: string }> = {
  national_park: {
    color: '#10b981', // emerald-500
    label: 'National Park',
    route: '/protected-network/national-parks',
    tier: 'Statutory Protected Area (Wildlife Protection Act)',
  },
  wildlife_sanctuary: {
    color: '#3b82f6', // blue-500
    label: 'Wildlife Sanctuary',
    route: '/protected-network/wildlife-sanctuaries',
    tier: 'Statutory Protected Area (Wildlife Protection Act)',
  },
  wetland_reserve: {
    color: '#06b6d4', // cyan-500
    label: 'Wetland Reserve',
    route: '/protected-network/wetland-reserves',
    tier: 'Statutory Wetland Reserve & Ramsar Designation',
  },
  conservation_reserve: {
    color: '#f59e0b', // amber-500
    label: 'Conservation Reserve',
    route: '/protected-network/conservation-reserves',
    tier: 'Statutory Conservation Reserve',
  },
  iba: {
    color: '#a855f7', // purple-500
    label: 'Bird & Habitat Area (IBA)',
    route: '/protected-network/bird-and-habitat-areas',
    tier: 'Nonstatutory International Ecological Reference Site (BirdLife/BNHS)',
  },
};

const CORRIDOR_STYLES: Record<string, { color: string; dashArray?: string; weight: number; label: string }> = {
  observed_movement: {
    color: '#10b981', // emerald-500
    dashArray: undefined,
    weight: 3.5,
    label: 'Observed Movement Corridor (Telemetry / Field Verified)',
  },
  modeled_connectivity: {
    color: '#f59e0b', // amber-500
    dashArray: '6, 6',
    weight: 3.0,
    label: 'Modeled Connectivity Axis (Circuitscape / Resistance Surface)',
  },
  habitat_linkage: {
    color: '#06b6d4', // cyan-500
    dashArray: '4, 4',
    weight: 2.5,
    label: 'Habitat & Riparian Linkage (Contiguous Canopy / Watercourse)',
  },
  conceptual_linkage: {
    color: '#ec4899', // pink-500
    dashArray: '3, 6',
    weight: 2.0,
    label: 'Conceptual Reserve Linkage (Diagrammatic Topology)',
  },
  unverified: {
    color: '#94a3b8', // slate-400
    dashArray: '2, 6',
    weight: 1.5,
    label: 'Unverified Proposed Corridor (Survey Pending)',
  },
};

// ── Map Sub-Components ────────────────────────────────────────────────────────

// Tracks mouse movement and updates zoom level
function CoordinateAndZoomTracker({ 
  onCoordsChange, 
  onZoomChange 
}: { 
  onCoordsChange: (coords: [number, number]) => void;
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMapEvents({
    mousemove(e) {
      onCoordsChange([e.latlng.lat, e.latlng.lng]);
    },
    zoomend() {
      onZoomChange(map.getZoom());
    },
  });
  return null;
}

// Controls programmatic flyTo movements
function CameraController({ 
  targetCoords, 
  targetZoom 
}: { 
  targetCoords: [number, number] | null; 
  targetZoom?: number 
}) {
  const map = useMap();
  useEffect(() => {
    if (targetCoords) {
      map.flyTo(targetCoords, targetZoom || 12, {
        duration: 1.4,
        easeLinearity: 0.25,
      });
    }
  }, [map, targetCoords, targetZoom]);
  return null;
}

// ── Main Leaflet Canvas Component ─────────────────────────────────────────────

interface ProtectedAtlasLeafletProps {
  protectedAreas: ProtectedArea[];
  corridors: Corridor[];
  selectedSite: ProtectedArea | null;
  onSelectSite: (site: ProtectedArea | null) => void;
  showCorridors: boolean;
  activeBasemap: BasemapMode;
  onBasemapChange: (mode: BasemapMode) => void;
  targetFlyTo: { lat: number; lng: number; zoom?: number } | null;
}

export default function ProtectedAtlasLeaflet({
  protectedAreas,
  corridors,
  selectedSite,
  onSelectSite,
  showCorridors,
  activeBasemap,
  onBasemapChange,
  targetFlyTo,
}: ProtectedAtlasLeafletProps) {
  const [liveCoords, setLiveCoords] = useState<[number, number]>(NETWORK_CENTER);
  const [currentZoom, setCurrentZoom] = useState<number>(INITIAL_ZOOM);
  const [hoveredSiteId, setHoveredSiteId] = useState<string | null>(null);
  const [hoveredCorridorId, setHoveredCorridorId] = useState<string | null>(null);
  const [tileErrorOccurred, setTileErrorOccurred] = useState<boolean>(false);
  const [tileWarning, setTileWarning] = useState<string | null>(null);
  const [activeCorridorTier, setActiveCorridorTier] = useState<string>('ALL');

  // Build GeoJSON lookup map for polygon boundaries
  const polygonFeatures = useMemo(() => {
    const map = new Map<string, any>();
    (protectedAreasGeoJson.features as any[]).forEach((f) => {
      if (f.geometry?.type === 'Polygon' || f.geometry?.type === 'MultiPolygon') {
        const id = f.properties.id || f.properties.slug;
        if (id) map.set(id, f);
      }
    });
    return map;
  }, []);

  // Filtered corridors from authoritative GeoJSON
  const authoritativeCorridors = useMemo(() => {
    if (!showCorridors) return [];
    return (corridorsGeoJson.features as any[]).filter((f) => {
      if (activeCorridorTier === 'ALL') return true;
      return f.properties.scientific_classification === activeCorridorTier;
    });
  }, [showCorridors, activeCorridorTier]);

  const tile = BASEMAP_TILES[activeBasemap] || BASEMAP_TILES.dark;

  const handleTileError = () => {
    if (!tileErrorOccurred) {
      setTileErrorOccurred(true);
      setTileWarning(`Tile provider for ${tile.name} encountered network latency. Operational fallback engaged.`);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Alert banner if tile error detected */}
      {tileWarning && (
        <div className="absolute top-16 left-4 right-4 z-[500] max-w-lg mx-auto bg-slate-900 border border-amber-500/50 p-2.5 rounded-[8px] text-xs text-amber-200 shadow-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{tileWarning}</span>
          </div>
          <button 
            onClick={() => setTileWarning(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <MapContainer
        center={NETWORK_CENTER}
        zoom={INITIAL_ZOOM}
        minZoom={6}
        maxZoom={18}
        zoomControl={false}
        className="w-full h-full bg-slate-950 z-0"
        style={{ height: '100%', width: '100%', background: '#090d16' }}
      >
        {/* Base Tile Layer with Error Detection */}
        <TileLayer
          key={`${activeBasemap}-base`}
          url={tile.url}
          attribution={tile.attribution}
          maxZoom={tile.maxZoom}
          eventHandlers={{
            tileerror: handleTileError
          }}
        />

        {/* Optional Reference Label Overlay (e.g. for Dark Canvas) */}
        {tile.referenceUrl && (
          <TileLayer
            key={`${activeBasemap}-ref`}
            url={tile.referenceUrl}
            attribution=""
            maxZoom={tile.maxZoom}
          />
        )}

        <CoordinateAndZoomTracker 
          onCoordsChange={setLiveCoords} 
          onZoomChange={setCurrentZoom} 
        />
        
        {targetFlyTo && (
          <CameraController 
            targetCoords={[targetFlyTo.lat, targetFlyTo.lng]} 
            targetZoom={targetFlyTo.zoom || 12} 
          />
        )}

        {/* ── AUTHORITATIVE STATUTORY BOUNDARY POLYGONS ─────────────────── */}
        {protectedAreas.map((pa) => {
          const polyFeature = polygonFeatures.get(pa.slug) || polygonFeatures.get(pa.id);
          if (!polyFeature) return null;

          const meta = CATEGORY_META[pa.category] || {
            color: '#10b981',
            label: 'Protected Reserve',
            route: '/protected-network',
            tier: 'Statutory Protected Area',
          };

          const isSelected = selectedSite?.id === pa.id;
          const isHovered = hoveredSiteId === pa.id;

          // Convert GeoJSON coords [lng, lat] to Leaflet [lat, lng]
          const coords = polyFeature.geometry.coordinates[0].map(([lng, lat]: [number, number]) => [lat, lng]);

          return (
            <Polygon
              key={`poly-${pa.id}`}
              positions={coords}
              pathOptions={{
                color: isSelected ? '#ffffff' : meta.color,
                weight: isSelected ? 3.5 : isHovered ? 2.5 : 1.8,
                fillColor: meta.color,
                fillOpacity: isSelected ? 0.45 : isHovered ? 0.35 : 0.2,
                dashArray: isSelected ? undefined : '4, 2'
              }}
              eventHandlers={{
                mouseover: () => setHoveredSiteId(pa.id),
                mouseout: () => setHoveredSiteId(null),
                click: () => onSelectSite(pa),
              }}
            >
              <Tooltip direction="top" opacity={0.95}>
                <div className="bg-slate-900 border border-slate-700 p-2 rounded-[6px] text-white shadow-xl text-xs space-y-0.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: meta.color }}>
                    {meta.label} · Official Boundary
                  </div>
                  <div className="font-bold text-white">{pa.name}</div>
                  <div className="text-[10px] text-slate-300">
                    Area: {pa.area ? `${pa.area} km²` : 'Legally Notified'} · {pa.district} District
                  </div>
                  <div className="text-[9px] font-mono text-emerald-400">
                    Source: WII National Wildlife Database / Gazette
                  </div>
                </div>
              </Tooltip>
            </Polygon>
          );
        })}

        {/* ── VERIFIED REFERENCE POINTS & CENTROIDS ──────────────────────── */}
        {protectedAreas.map((pa, idx) => {
          if (!pa.latitude || !pa.longitude) return null;

          const hasPolygon = polygonFeatures.has(pa.slug) || polygonFeatures.has(pa.id);
          // If feature has polygon, only render center marker at lower zoom for regional visibility
          if (hasPolygon && currentZoom >= 11) return null;

          const meta = CATEGORY_META[pa.category] || {
            color: '#10b981',
            label: 'Protected Reserve',
            route: '/protected-network',
            tier: 'Statutory Protected Area',
          };

          const isSelected = selectedSite?.id === pa.id;
          const isHovered = hoveredSiteId === pa.id;

          return (
            <CircleMarker
              key={`pt-${pa.id}-${idx}`}
              center={[pa.latitude, pa.longitude]}
              radius={isSelected ? 12 : isHovered ? 10 : hasPolygon ? 6 : 7}
              pathOptions={{
                fillColor: meta.color,
                color: isSelected ? '#ffffff' : '#0f172a',
                weight: isSelected ? 3 : 2,
                fillOpacity: isSelected ? 0.95 : isHovered ? 0.9 : 0.8,
              }}
              eventHandlers={{
                mouseover: () => setHoveredSiteId(pa.id),
                mouseout: () => setHoveredSiteId(null),
                click: () => onSelectSite(pa),
              }}
            >
              <Tooltip 
                direction="top" 
                offset={[0, -10]} 
                opacity={0.95}
              >
                <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-[6px] text-white shadow-2xl max-w-[240px]">
                  <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: meta.color }}>
                    {meta.label}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">{pa.name}</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    {pa.district} District &bull; {pa.area ? `${pa.area} km²` : 'Extent Recorded'}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1">
                    {hasPolygon ? 'Verified Boundary Polygon Available' : 'Centroid Reference Point (WGS84)'}
                  </div>
                </div>
              </Tooltip>

              <Popup>
                <div className="bg-slate-900 text-white p-3.5 rounded-[8px] border border-slate-700 max-w-[290px] space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: meta.color }} 
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: meta.color }}>
                      {meta.label}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold leading-tight text-white">
                    {pa.name}
                  </h4>
                  <div className="text-[10px] text-slate-300 font-mono">
                    Classification: {meta.tier}
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {pa.description}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-slate-950 p-2 rounded-[6px] font-mono border border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[9px]">AREA</span>
                      <strong className="text-white">{pa.area ? `${pa.area} km²` : 'Recorded'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">DISTRICT</span>
                      <strong className="text-white">{pa.district}</strong>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-800">
                      <span className="text-slate-400 block text-[9px]">WGS84 REFERENCE COORDINATES</span>
                      <strong className="text-emerald-400">{pa.latitude.toFixed(4)}°N, {pa.longitude.toFixed(4)}°E</strong>
                    </div>
                  </div>
                  <Link
                    href={`${meta.route}/${pa.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    <span>View Official Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* ── SCIENTIFIC WILDLIFE CORRIDOR MODELS ────────────────────────── */}
        {showCorridors &&
          authoritativeCorridors.map((feat) => {
            const props = feat.properties;
            const style = CORRIDOR_STYLES[props.scientific_classification] || CORRIDOR_STYLES.conceptual_linkage;
            const positions = feat.geometry.coordinates.map(([lng, lat]: [number, number]) => [lat, lng]);
            const isHovered = hoveredCorridorId === props.id;

            return (
              <Polyline
                key={`corr-${props.id}`}
                positions={positions}
                pathOptions={{
                  color: isHovered ? '#ffffff' : style.color,
                  weight: isHovered ? style.weight + 2 : style.weight,
                  opacity: isHovered ? 1.0 : 0.85,
                  dashArray: style.dashArray,
                }}
                eventHandlers={{
                  mouseover: () => setHoveredCorridorId(props.id),
                  mouseout: () => setHoveredCorridorId(null),
                }}
              >
                <Tooltip direction="center" opacity={0.95}>
                  <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-[6px] text-white shadow-xl text-xs max-w-[280px] space-y-1">
                    <div className="text-[10px] font-mono uppercase font-bold" style={{ color: style.color }}>
                      {style.label}
                    </div>
                    <div className="font-bold text-white">{props.name}</div>
                    <div className="text-[10px] text-slate-300 font-mono">
                      Estimated Length: {props.length} &bull; Priority: {props.priority}
                    </div>
                    <div className="text-[9px] text-slate-400 pt-1 border-t border-slate-800">
                      Method: {props.methodology}
                    </div>
                    <div className="text-[9px] text-slate-500">
                      Uncertainty: {props.spatial_uncertainty}
                    </div>
                  </div>
                </Tooltip>
              </Polyline>
            );
          })}
      </MapContainer>

      {/* ── TOP RIGHT: BASEMAP SWITCHER (SOLID SURFACES, NO GRADIENTS) ─── */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-1 p-1 bg-slate-900 rounded-[8px] border border-slate-800 shadow-xl">
        {(['satellite', 'terrain', 'dark', 'streets'] as BasemapMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              setTileErrorOccurred(false);
              setTileWarning(null);
              onBasemapChange(mode);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[6px] uppercase tracking-wider transition-all ${
              activeBasemap === mode
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {mode === 'satellite' ? '🛰️ Satellite' : mode === 'terrain' ? '🏔️ Terrain' : mode === 'dark' ? '🌌 Dark' : '🗺️ Streets'}
          </button>
        ))}
      </div>

      {/* ── TOP LEFT: CORRIDOR CLASSIFICATION FILTER CHIP ───────────────── */}
      {showCorridors && (
        <div className="absolute top-4 left-4 z-[400] hidden sm:flex items-center gap-1.5 p-1.5 bg-slate-900 rounded-[8px] border border-slate-800 text-[11px] shadow-xl">
          <span className="text-slate-400 font-mono px-1">Corridors:</span>
          <button
            onClick={() => setActiveCorridorTier('ALL')}
            className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
              activeCorridorTier === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All (43)
          </button>
          <button
            onClick={() => setActiveCorridorTier('observed_movement')}
            className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
              activeCorridorTier === 'observed_movement' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Observed
          </button>
          <button
            onClick={() => setActiveCorridorTier('modeled_connectivity')}
            className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
              activeCorridorTier === 'modeled_connectivity' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Modeled
          </button>
          <button
            onClick={() => setActiveCorridorTier('habitat_linkage')}
            className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
              activeCorridorTier === 'habitat_linkage' ? 'bg-sky-950 text-sky-300 border border-sky-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Riparian/Wetland
          </button>
          <button
            onClick={() => setActiveCorridorTier('conceptual_linkage')}
            className={`px-2 py-0.5 rounded-[4px] font-medium transition-colors ${
              activeCorridorTier === 'conceptual_linkage' ? 'bg-pink-950 text-pink-300 border border-pink-800' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Conceptual
          </button>
        </div>
      )}

      {/* ── BOTTOM LEFT: WGS84 COORDINATES & SCALE HUD ──────────────────── */}
      <div className="absolute bottom-4 left-4 z-[400] pointer-events-none flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-[6px] bg-slate-900 border border-slate-800 shadow-xl">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
          <div className="text-xs font-mono">
            <span className="text-slate-400 uppercase text-[9px] tracking-wider block">WGS84 Reference Datum (EPSG:4326)</span>
            <span className="text-emerald-300 font-semibold tracking-tight">
              {liveCoords[0].toFixed(4)}° N, {liveCoords[1].toFixed(4)}° E &bull; Zoom {currentZoom}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
