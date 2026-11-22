'use client';

import React from 'react';
import { useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { Plus, Minus, Maximize2, RefreshCw, Crosshair, MapPin, Layers } from 'lucide-react';
import { KASHMIR_CENTER, KASHMIR_ZOOM } from './AtlasMap';

interface MapControlsProps {
  onFitToKashmir?: () => void;
  onToggleLayers?: () => void;
}

function MapControlButtons({ onFitToKashmir, onToggleLayers }: MapControlsProps) {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleFitToKashmir = () => {
    map.flyTo(KASHMIR_CENTER, KASHMIR_ZOOM, {
      duration: 1.5,
    });
    onFitToKashmir?.();
  };

  const handleResetView = () => {
    map.flyTo(KASHMIR_CENTER, KASHMIR_ZOOM, {
      duration: 1,
    });
  };

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 12 });
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Zoom Controls */}
      <button
        onClick={handleZoomIn}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Zoom In"
      >
        <Plus className="h-5 w-5" />
      </button>
      <button
        onClick={handleZoomOut}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Zoom Out"
      >
        <Minus className="h-5 w-5" />
      </button>
      
      {/* Separator */}
      <div className="h-px bg-white/10 my-1" />
      
      {/* View Controls */}
      <button
        onClick={handleFitToKashmir}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Fit to Western Himalayas"
      >
        <Maximize2 className="h-4 w-4" />
      </button>
      <button
        onClick={handleResetView}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Reset Center View"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
      <button
        onClick={handleLocate}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10"
        title="Locate Device"
      >
        <Crosshair className="h-4 w-4" />
      </button>
      
      {/* Layers Toggle on mobile */}
      {onToggleLayers && (
        <>
          <div className="h-px bg-white/10 my-1" />
          <button
            onClick={onToggleLayers}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/90 text-white shadow-lg backdrop-blur-sm transition-all hover:bg-slate-700 hover:scale-105 active:scale-95 border border-white/10 md:hidden"
            title="Toggle Layers"
          >
            <Layers className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

export function MapControls({ onFitToKashmir, onToggleLayers }: MapControlsProps) {
  return (
    <div className="absolute bottom-20 right-4 z-[450] md:bottom-4">
      <MapControlButtons onFitToKashmir={onFitToKashmir} onToggleLayers={onToggleLayers} />
    </div>
  );
}

// Geodetically valid Coordinate display component
export function CoordinateDisplay() {
  const map = useMap();
  const [coords, setCoords] = React.useState<[number, number]>(() => {
    const center = map.getCenter();
    return [center.lat, center.lng];
  });
  const [mode, setMode] = React.useState<'cursor' | 'center'>('center');

  React.useEffect(() => {
    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      setCoords([e.latlng.lat, e.latlng.lng]);
      setMode('cursor');
    };

    const handleMove = () => {
      const c = map.getCenter();
      setCoords([c.lat, c.lng]);
      setMode('center');
    };

    map.on('mousemove', handleMouseMove);
    map.on('moveend', handleMove);

    return () => {
      map.off('mousemove', handleMouseMove);
      map.off('moveend', handleMove);
    };
  }, [map]);

  const lat = coords[0];
  const lng = coords[1];

  const latDir = lat >= 0 ? 'N' : 'S';
  const lngDir = lng >= 0 ? 'E' : 'W';

  return (
    <div className="absolute bottom-4 left-4 right-20 md:right-auto z-[450]">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl">
        <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
        <div className="text-[11px] font-mono text-white whitespace-nowrap">
          <span className="text-slate-400 text-[10px] mr-1.5 uppercase font-sans font-bold">
            {mode === 'cursor' ? 'Cursor' : 'Map Center'} (WGS84):
          </span>
          <span>{Math.abs(lat).toFixed(4)}° {latDir}</span>
          <span className="text-slate-500 mx-1.5">|</span>
          <span>{Math.abs(lng).toFixed(4)}° {lngDir}</span>
        </div>
      </div>
    </div>
  );
}

// Geodetically valid Scale Bar component using Great-Circle distance
export function ScaleBar() {
  const map = useMap();
  const [scale, setScale] = React.useState({ distance: 0, unit: 'km', pixelWidth: 100 });

  React.useEffect(() => {
    const updateScale = () => {
      const size = map.getSize();
      if (!size.x || !size.y) return;

      const p1 = map.containerPointToLatLng([0, size.y / 2]);
      const p2 = map.containerPointToLatLng([100, size.y / 2]);
      const distanceMeters = p1.distanceTo(p2); // Accurate WGS84 geodesic calculation

      let dist: number;
      let unit: string;
      let barPixels = 100;

      if (distanceMeters >= 1000) {
        dist = Math.round(distanceMeters / 100) / 10;
        unit = 'km';
      } else {
        dist = Math.round(distanceMeters);
        unit = 'm';
      }

      setScale({ distance: dist, unit, pixelWidth: barPixels });
    };

    map.on('moveend zoomend', updateScale);
    updateScale();

    return () => {
      map.off('moveend zoomend', updateScale);
    };
  }, [map]);

  return (
    <div className="absolute bottom-4 left-4 z-[450] md:bottom-16 md:left-4">
      <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl">
        {/* Solid visual scale bar - NO GRADIENTS */}
        <div className="mb-1">
          <div className="h-1 bg-white/75 rounded" style={{ width: `${scale.pixelWidth}px` }} />
          <div className="flex justify-between mt-0.5" style={{ width: `${scale.pixelWidth}px` }}>
            <div className="w-0.5 h-1.5 bg-white/80" />
            <div className="w-0.5 h-1.5 bg-white/80" />
          </div>
        </div>
        <div className="text-[11px] font-mono text-white">
          <span className="text-slate-400 font-sans text-[10px]">Geodetic: </span>
          <span className="font-bold">{scale.distance}</span>
          <span className="text-slate-400 ml-1">{scale.unit}</span>
        </div>
      </div>
    </div>
  );
}
