'use client';

import React, { useState } from 'react';

export interface EhiiShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  metrics: string;
  status: string;
  statusColor?: string;
  src: string;
  short: string;
}

interface EhiiHeroShowcaseCardProps {
  tag?: string;
  badge?: string;
  items: EhiiShowcaseItem[];
  initialIdx?: number;
  className?: string;
}

export function EhiiHeroShowcaseCard({
  tag = 'EHII Spaceborne Telemetry',
  badge = 'Active 2026',
  items,
  initialIdx = 0,
  className = ''
}: EhiiHeroShowcaseCardProps) {
  const [activeIdx, setActiveIdx] = useState(initialIdx);
  const currentItem = items[activeIdx] || items[0];

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 bg-slate-900/80 backdrop-blur-md p-3 ${className}`}>
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            {tag}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
          {badge}
        </span>
      </div>

      {/* Main Image Viewport */}
      <div className="relative h-52 sm:h-60 w-full rounded-xl overflow-hidden border border-white/10 group mb-2.5">
        <img
          key={currentItem.id}
          src={currentItem.src}
          alt={currentItem.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Captions Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-bold text-white drop-shadow-md leading-tight">
              {currentItem.title}
            </h4>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 border ${
              currentItem.statusColor || 'bg-rose-500/20 text-rose-300 border-rose-500/30'
            }`}>
              {currentItem.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="text-emerald-300 font-mono text-[10px] truncate max-w-[60%]">
              {currentItem.metrics}
            </span>
            <span className="text-slate-400 text-[10px] truncate max-w-[38%] text-right">
              {currentItem.location}
            </span>
          </div>
          {currentItem.subtitle && (
            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
              {currentItem.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Interactive Thumbnail Buttons Grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {items.slice(0, 4).map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeIdx === idx
                ? 'border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-800'
            }`}
          >
            <div className="w-full h-9 rounded overflow-hidden relative">
              <img src={item.src} alt={item.short} className="w-full h-full object-cover" />
            </div>
            <span
              className={`text-[9px] font-medium break-words w-full text-center leading-tight truncate px-0.5 ${
                activeIdx === idx ? 'text-emerald-300 font-bold' : 'text-slate-400'
              }`}
            >
              {item.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
