'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  WDCorridorLiveRecord,
  UpstreamLiveCheckpoint,
  DetectedWDSystem,
} from '@/data/hazard-western-disturbances';
import { Layers, Moon, Mountain, Satellite, Radio } from 'lucide-react';

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
const Polyline = dynamic(
  () => import('react-leaflet').then((m) => m.Polyline),
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

export type WDMapParameter =
  | 'phase'
  | 'precip7d'
  | 'snow7d'
  | 'freezingLevel'
  | 'jet300';

type BasemapMode = 'dark' | 'terrain' | 'satellite';

interface WesternDisturbanceMapProps {
  corridors: WDCorridorLiveRecord[];
  upstreamTrack: UpstreamLiveCheckpoint[];
  detectedSystems?: DetectedWDSystem[];
  radarTileUrl?: string | null;
  defaultScope?: 'regional' | 'synoptic';
  defaultParameter?: WDMapParameter;
  heightClass?: string;
  onSelectCorridor?: (corridor: WDCorridorLiveRecord) => void;
}

function getCorridorMarkerStyle(c: WDCorridorLiveRecord, param: WDMapParameter) {
  if (param === 'precip7d') {
    const p = c.forecast7d.total_precip_mm;
    if (p >= 50) return { color: '#ef4444', fill: '#ef4444', radius: 11 };
    if (p >= 20) return { color: '#38bdf8', fill: '#0284c7', radius: 9.5 };
    if (p >= 5) return { color: '#22d3ee', fill: '#06b6d4', radius: 8 };
    return { color: '#64748b', fill: '#475569', radius: 6.5 };
  }
  if (param === 'snow7d') {
    const s = c.forecast7d.total_snow_cm;
    if (s >= 35) return { color: '#f43f5e', fill: '#e11d48', radius: 11 };
    if (s >= 12) return { color: '#a855f7', fill: '#9333ea', radius: 9.5 };
    if (s >= 2) return { color: '#38bdf8', fill: '#0ea5e9', radius: 8 };
    return { color: '#64748b', fill: '#475569', radius: 6.5 };
  }
  if (param === 'freezingLevel') {
    const f = c.liveObservation.freezing_level_m;
    if (f <= 2200) return { color: '#38bdf8', fill: '#0284c7', radius: 9 };
    if (f <= 3200) return { color: '#22d3ee', fill: '#0891b2', radius: 8.5 };
    return { color: '#f59e0b', fill: '#d97706', radius: 8 };
  }
  if (param === 'jet300') {
    const j = c.liveObservation.jet300_kmh;
    if (j >= 140) return { color: '#f43f5e', fill: '#e11d48', radius: 10.5 };
    if (j >= 100) return { color: '#f59e0b', fill: '#d97706', radius: 9 };
    return { color: '#10b981', fill: '#059669', radius: 7.5 };
  }

  if (c.wdPhase === 'Active Synoptic Trough Passage') return { color: '#ef4444', fill: '#dc2626', radius: 11 };
  if (c.wdPhase === 'Approaching Baroclinic Wave (48–168h)') return { color: '#f59e0b', fill: '#d97706', radius: 9.5 };
  if (c.wdPhase === 'Post-Trough Cold Advection') return { color: '#38bdf8', fill: '#0284c7', radius: 8 };
  if (c.wdPhase === 'Zonal Westerly Flow') return { color: '#22d3ee', fill: '#0891b2', radius: 7.5 };
  return { color: '#10b981', fill: '#059669', radius: 7 };
}

export function WesternDisturbanceMap({
  corridors,
  upstreamTrack,
  detectedSystems = [],
  radarTileUrl,
  defaultScope = 'regional',
  defaultParameter = 'phase',
  heightClass = 'h-[520px]',
  onSelectCorridor,
}: WesternDisturbanceMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapScope, setMapScope] = useState<'regional' | 'synoptic'>(defaultScope);
  const [param, setParam] = useState<WDMapParameter>(defaultParameter);
  const [basemap, setBasemap] = useState<BasemapMode>('dark');
  const [showRadar, setShowRadar] = useState(Boolean(radarTileUrl));

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (radarTileUrl) setShowRadar(true);
  }, [radarTileUrl]);

  if (!isClient) {
    return (
      <div className={`w-full ${heightClass} rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-2 text-xs text-slate-400">
          <div className="w-7 h-7 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span>Initializing Atmospheric &amp; Orographic GIS...</span>
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

  const center: [number, number] = mapScope === 'synoptic' ? [34.8, 55.0] : [34.35, 75.15];
  const zoom = mapScope === 'synoptic' ? 4 : 6;

  const jetPathCoords: [number, number][] = upstreamTrack.map((u) => [u.latitude, u.longitude]);

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-xl`}>
      {/* Top Overlay Controls */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15 text-[11px]">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <button
            type="button"
            onClick={() => setMapScope('regional')}
            className={`px-2 py-1 rounded-md font-semibold transition-colors ${
              mapScope === 'regional'
                ? 'bg-sky-500/25 text-sky-200 border border-sky-500/40'
                : 'bg-white/5 text-slate-400 border border-white/10'
            }`}
          >
            6-Region Grid (31)
          </button>
          <button
            type="button"
            onClick={() => setMapScope('synoptic')}
            className={`px-2 py-1 rounded-md font-semibold transition-colors ${
              mapScope === 'synoptic'
                ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-500/40'
                : 'bg-white/5 text-slate-400 border border-white/10'
            }`}
          >
            30°E–75°E Synoptic Waveguide ({detectedSystems.length} Tracked)
          </button>

          {radarTileUrl && (
            <button
              type="button"
              onClick={() => setShowRadar((v) => !v)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-semibold transition-colors ${
                showRadar
                  ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40'
                  : 'bg-white/5 text-slate-400 border border-white/10'
              }`}
            >
              <Radio className="w-3 h-3" /> Observed Radar
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={param}
            onChange={(e) => setParam(e.target.value as WDMapParameter)}
            aria-label="Select atmospheric map layer"
            className="bg-slate-900 text-slate-200 border border-white/15 rounded-lg px-2 py-1 text-[11px] outline-none"
          >
            <option value="phase">Layer: Synoptic Regime</option>
            <option value="precip7d">Layer: 7d Forecast Precip (mm)</option>
            <option value="snow7d">Layer: 7d Forecast Snowfall (cm)</option>
            <option value="freezingLevel">Layer: 0h 0°C Freezing-Level Altitude (m)</option>
            <option value="jet300">Layer: 0h 300 hPa Jet Speed (km/h)</option>
          </select>

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
      </div>

      <MapContainer
        key={mapScope}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', background: '#020617' }}
      >
        <TileLayer key={basemap} url={tileConfig.url} attribution={tileConfig.attribution} />

        {/* Live RainViewer Composite Radar Overlay (ACTUAL REMOTE-SENSING OBSERVATION) */}
        {showRadar && radarTileUrl && (
          <TileLayer
            url={radarTileUrl}
            opacity={0.55}
            attribution="RainViewer Observed Radar"
          />
        )}

        {/* Subtropical Westerly Waveguide Reference Axis */}
        {jetPathCoords.length > 1 && (
          <Polyline
            positions={jetPathCoords}
            pathOptions={{
              color: '#38bdf8',
              weight: 2,
              dashArray: '6 6',
              opacity: 0.65,
            }}
          />
        )}

        {/* Detected WD Vorticity Trajectories */}
        {detectedSystems.map((sys) => {
          const coords: [number, number][] = sys.trackPoints.map((pt) => [pt.latitude, pt.longitude]);
          return (
            <React.Fragment key={sys.systemId}>
              {coords.length > 1 && (
                <Polyline
                  positions={coords}
                  pathOptions={{
                    color: '#f43f5e',
                    weight: 3.5,
                    opacity: 0.9,
                  }}
                />
              )}
              {sys.trackPoints.map((pt, k) => (
                <CircleMarker
                  key={`${sys.systemId}-${k}`}
                  center={[pt.latitude, pt.longitude]}
                  radius={k === 0 ? 8 : 6}
                  pathOptions={{
                    color: '#fb7185',
                    fillColor: pt.state === 'NWP_FORECAST' ? '#e11d48' : '#10b981',
                    fillOpacity: 0.9,
                    weight: 2,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -6]}>
                    <div className="text-xs font-bold">
                      {sys.systemId} ({pt.stepHoursFromNow >= 0 ? `+${pt.stepHoursFromNow}h` : `${pt.stepHoursFromNow}h`}) · ζ₃₀₀ +{pt.vorticity300_1e5s}
                    </div>
                  </Tooltip>
                </CircleMarker>
              ))}
            </React.Fragment>
          );
        })}

        {/* Upstream Synoptic Checkpoints */}
        {upstreamTrack.map((u) => {
          const isTrough = u.troughSignal === 'Active Trough' || u.troughSignal === 'Developing Wave';
          return (
            <CircleMarker
              key={u.id}
              center={[u.latitude, u.longitude]}
              radius={isTrough ? 9 : 7}
              pathOptions={{
                color: isTrough ? '#f59e0b' : '#38bdf8',
                fillColor: isTrough ? '#d97706' : '#0284c7',
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                <div className="text-xs font-bold">
                  {u.name} · {u.troughSignal} (Z500: {u.z500_gpm} gpm, ζ300: {u.vorticity300_1e5s})
                </div>
              </Tooltip>
              <Popup>
                <div className="min-w-[230px] text-slate-900 text-xs space-y-1">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">{u.name}</div>
                  <div className="text-[10px] font-semibold uppercase text-sky-700">0h NWP Synoptic Analysis</div>
                  <div><strong>Signal:</strong> {u.troughSignal}</div>
                  <div><strong>500 hPa Height (Curv):</strong> {u.z500_gpm} gpm ({u.z500_curvature_gpm >= 0 ? '+' : ''}{u.z500_curvature_gpm} gpm)</div>
                  <div><strong>300 hPa Vorticity (ζ₃₀₀):</strong> {u.vorticity300_1e5s} × 10⁻⁵ s⁻¹</div>
                  <div><strong>300 hPa Jet Wind:</strong> {u.jet300_kmh} km/h ({u.jet300_dir_deg}°)</div>
                  <div><strong>MSL Pressure:</strong> {u.pressure_msl_hpa} hPa ({u.pressure_24h_delta_hpa >= 0 ? '+' : ''}{u.pressure_24h_delta_hpa} hPa/24h)</div>
                  <div><strong>72h NWP Precip:</strong> {u.next72h_precip_mm} mm</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* 31 Western Himalayan Regional Corridors */}
        {corridors.map((c) => {
          const st = getCorridorMarkerStyle(c, param);
          return (
            <CircleMarker
              key={c.id}
              center={[c.latitude, c.longitude]}
              radius={st.radius}
              pathOptions={{
                color: st.color,
                fillColor: st.fill,
                fillOpacity: 0.8,
                weight: 1.5,
              }}
              eventHandlers={{
                click: () => onSelectCorridor?.(c),
              }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                <div className="text-xs font-bold">
                  {c.district} ({c.subRegion}) · {c.wdPhase}
                </div>
              </Tooltip>
              <Popup>
                <div className="min-w-[240px] text-slate-900 text-xs space-y-1.5">
                  <div className="font-bold text-slate-900 border-b border-slate-200 pb-1">
                    {c.name}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {c.subRegion} · Station {c.elevation_m} m (Model DEM {c.provenance.modelGridElevationM} m)
                  </div>
                  <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 text-[11px]">
                    <div className="font-bold text-emerald-800 uppercase text-[9px]">0h NWP Model Analysis</div>
                    <div>Temp {c.liveObservation.temp_c}°C · Cloud {c.liveObservation.cloud_cover_pct}% · {c.liveObservation.pressure_msl_hpa} hPa</div>
                    <div>0°C Freezing Level: {c.liveObservation.freezing_level_m} m · 300hPa Jet: {c.liveObservation.jet300_kmh} km/h</div>
                  </div>
                  <div className="p-1.5 rounded bg-sky-50 border border-sky-200 text-[11px]">
                    <div className="font-bold text-sky-800 uppercase text-[9px]">7-Day NWP Forecast ({c.forecastCompleteness.validHourlySteps}/168h)</div>
                    <div>Precip: <strong>{c.forecast7d.total_precip_mm} mm</strong> · Snow: <strong>{c.forecast7d.total_snow_cm} cm</strong></div>
                    <div>7d Phase: {c.forecast7d.forecast_precip_phase} · Trigger: <strong>{c.compoundTriggers.overallRisk}</strong></div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="absolute bottom-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-slate-300">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Tracked WD Trough / Active
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Approaching Wave
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Zonal Westerly Flow
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 500 hPa Ridge
          </span>
        </div>
        <span className="text-slate-400 font-mono">
          Kashmir · Jammu · Ladakh · AJK · Gilgit · Baltistan
        </span>
      </div>
    </div>
  );
}
