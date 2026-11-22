'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  Trees,
  Satellite,
  Layers,
  Compass,
  Calendar,
  Activity,
  CheckCircle2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function ChinarCanopySatellitePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="02 · ECOLOGICAL & SCIENTIFIC MONITORING"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Canopy Monitoring & Earth Observation' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SATELLITE NDVI
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Canopy Monitoring & Earth Observation
            </span>
          </>
        }
        subtitle="Sentinel-2 & Landsat-9 multispectral satellite surveillance tracking Normalized Difference Vegetation Index (NDVI), canopy vigor, photosynthetic density, and historical crown loss."
        icon={<Satellite className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/gis-atlas"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>GIS Atlas</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chinar Overview Hub</span>
            </Link>
          </div>
        }
      />
      <ChinarSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Remote Sensing Telemetry Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Satellite Constellation</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">Sentinel-2 MSI</div>
            <span className="text-[10px] text-slate-400 font-mono">10m multi-spectral resolution</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Peak Summer NDVI</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">0.78 - 0.84</div>
            <span className="text-[10px] text-slate-400 font-mono">Healthy dense foliage index</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Autumn Color Shift</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">Late October</div>
            <span className="text-[10px] text-slate-400 font-mono">Golden/scarlet transition</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Orbital Revisit Interval</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">5 Days</div>
            <span className="text-[10px] text-slate-400 font-mono">Copernicus Data Space STAC</span>
          </div>
        </div>

        {/* Sentinel-2 Pipeline Overview */}
        <div className="bg-slate-900/80 border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Satellite className="w-5 h-5 text-indigo-400" />
            Vegetation Index Telemetry &amp; Historical Grove Perimeter Tracking
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            By querying the Copernicus Data Space STAC API across the Kashmir Valley bounding box, KEW extracts Normalized Difference Vegetation Index (NDVI = (NIR - Red) / (NIR + Red)) and Red-Edge Chlorophyll Index (NDRE) to track canopy density variations in heritage Chinar clusters like Naseem Bagh and Padshahi Bagh Bijbehara.
          </p>
        </div>
      </div>
    </div>
  );
}
