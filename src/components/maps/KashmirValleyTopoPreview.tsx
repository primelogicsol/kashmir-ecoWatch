'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Droplets, Mountain, AlertTriangle, Shield } from 'lucide-react';

export interface TopoHotspotPin {
  id: string;
  label: string;
  metric: string;
  coordinates: string;
  xPct: number;
  yPct: number;
  tone: 'emerald' | 'cyan' | 'amber';
}

export const KASHMIR_TOPO_HOTSPOTS: TopoHotspotPin[] = [
  {
    id: 'wular-lake',
    label: 'Wular Lake',
    metric: 'Ramsar · 130 km²',
    coordinates: '34.36°N, 74.56°E',
    xPct: 33,
    yPct: 30,
    tone: 'cyan',
  },
  {
    id: 'hokersar',
    label: 'Hokersar Wetland',
    metric: '12,000+ Waterfowl',
    coordinates: '34.09°N, 74.70°E',
    xPct: 44,
    yPct: 54,
    tone: 'cyan',
  },
  {
    id: 'dal-lake',
    label: 'Dal Lake',
    metric: 'WQI 62 · Active',
    coordinates: '34.11°N, 74.86°E',
    xPct: 53,
    yPct: 47,
    tone: 'cyan',
  },
  {
    id: 'dachigam',
    label: 'Dachigam NP',
    metric: 'Hangul Core · 141 km²',
    coordinates: '34.14°N, 74.94°E',
    xPct: 63,
    yPct: 43,
    tone: 'emerald',
  },
  {
    id: 'kolahoi',
    label: 'Kolahoi Glacier',
    metric: 'Cryosphere · 4,700m',
    coordinates: '34.19°N, 75.33°E',
    xPct: 75,
    yPct: 52,
    tone: 'emerald',
  },
  {
    id: 'zoji-la',
    label: 'Zoji La Pass',
    metric: '3,528m · Pass Watch',
    coordinates: '34.28°N, 75.50°E',
    xPct: 81,
    yPct: 26,
    tone: 'amber',
  },
];

interface KashmirValleyTopoPreviewProps {
  selectedFeatureId?: string | null;
  onSelectFeature?: (id: string) => void;
}

export function KashmirValleyTopoPreview({
  selectedFeatureId,
  onSelectFeature,
}: KashmirValleyTopoPreviewProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-slate-950 select-none"
      aria-label="Kashmir Valley Topological and Hydrological GIS Preview"
    >
      {/* High-resolution Western Himalayan satellite-relief terrain (priority preloaded) */}
      <Image
        src="/background.png"
        alt="Kashmir Valley Western Himalayan Topological Relief and Hydrological Basin Map"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 1280px"
        className="object-cover object-center opacity-75"
      />

      {/* Calibrated dark geospatial tint for contrast with UI controls & pins */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/45 to-slate-950/75" />

      {/* Vector SVG Topological Contours, Graticule & Jhelum Hydrological Corridor */}
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <defs>
          <linearGradient id="kewJhelumChannel" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="kewValleyBowl" cx="52%" cy="48%" r="44%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
            <stop offset="65%" stopColor="#0ea5e9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1000" height="500" fill="url(#kewValleyBowl)" />

        {/* Coordinate Graticule */}
        <g stroke="rgba(148, 163, 184, 0.14)" strokeWidth="1" strokeDasharray="4 6">
          <line x1="200" y1="0" x2="200" y2="500" />
          <line x1="400" y1="0" x2="400" y2="500" />
          <line x1="600" y1="0" x2="600" y2="500" />
          <line x1="800" y1="0" x2="800" y2="500" />
          <line x1="0" y1="125" x2="1000" y2="125" />
          <line x1="0" y1="250" x2="1000" y2="250" />
          <line x1="0" y1="375" x2="1000" y2="375" />
        </g>

        {/* Pir Panjal & Great Himalayan Elevation Contours */}
        <g fill="none" stroke="rgba(16, 185, 129, 0.22)" strokeWidth="1.2">
          <path d="M 80 390 C 210 440, 420 455, 650 420 C 790 395, 890 330, 950 250" />
          <path d="M 110 345 C 245 395, 445 410, 645 375 C 770 350, 865 290, 925 210" />
          <path d="M 95 160 C 240 95, 470 75, 690 105 C 815 122, 900 165, 960 215" />
          <path d="M 150 205 C 285 140, 485 125, 680 150 C 785 165, 860 198, 920 240" />
        </g>

        {/* Jhelum River Spine (Verinag -> Sangam -> Srinagar/Dal -> Hokersar -> Wular -> Baramulla) */}
        <path
          d="M 730 395 C 675 355, 610 315, 555 265 C 510 232, 465 255, 425 225 C 385 192, 355 165, 315 148 C 265 130, 215 145, 165 168"
          fill="none"
          stroke="url(#kewJhelumChannel)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Wular & Dal Basin Polygons */}
        <ellipse
          cx="330"
          cy="150"
          rx="36"
          ry="20"
          fill="rgba(14, 165, 233, 0.22)"
          stroke="rgba(56, 189, 248, 0.65)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="530"
          cy="235"
          rx="22"
          ry="14"
          fill="rgba(14, 165, 233, 0.25)"
          stroke="rgba(56, 189, 248, 0.7)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="630"
          cy="215"
          rx="30"
          ry="18"
          fill="rgba(16, 185, 129, 0.18)"
          stroke="rgba(52, 211, 153, 0.6)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />
      </svg>

      {/* Interactive Hotspot Pins */}
      <div className="absolute inset-0 z-10">
        {KASHMIR_TOPO_HOTSPOTS.map((pin) => {
          const isSelected = selectedFeatureId === pin.id;
          const dotColor =
            pin.tone === 'emerald'
              ? 'bg-emerald-400 ring-emerald-400/40'
              : pin.tone === 'amber'
                ? 'bg-amber-400 ring-amber-400/40'
                : 'bg-cyan-400 ring-cyan-400/40';
          const IconComp =
            pin.tone === 'emerald'
              ? Mountain
              : pin.tone === 'amber'
                ? AlertTriangle
                : Droplets;

          return (
            <button
              key={pin.id}
              type="button"
              onClick={() => onSelectFeature?.(pin.id)}
              style={{ left: `${pin.xPct}%`, top: `${pin.yPct}%` }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900/95 border-emerald-400/80 shadow-lg shadow-emerald-500/25 scale-105 z-20'
                  : 'bg-slate-950/80 border-white/15 hover:border-emerald-400/60 hover:bg-slate-900/95 z-10'
              }`}
              aria-label={`Inspect ${pin.label} (${pin.metric}) at ${pin.coordinates}`}
            >
              <span className={`w-2 h-2 rounded-full ring-4 ${dotColor} shrink-0`} />
              <IconComp className="w-3 h-3 text-slate-200 hidden sm:inline shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap">
                {pin.label}
              </span>
              <span className="hidden lg:inline text-[10px] font-mono text-emerald-300/90 border-l border-white/10 pl-1.5">
                {pin.metric}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom-right Topological Attribution Chip */}
      <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/85 border border-white/10 backdrop-blur-md text-[10px] sm:text-xs text-slate-300">
        <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Kashmir Valley Topological Baseline · 34.08°N, 74.79°E</span>
        <Shield className="w-3 h-3 text-cyan-400 hidden sm:inline shrink-0" />
      </div>
    </div>
  );
}
