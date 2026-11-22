'use client';

import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { TransportSubNav } from '@/components/transportation-pollution/TransportSubNav';
import {
  DISTRICT_TRANSPORT_DATA,
  REGION_TRANSPORT_SUMMARIES,
  BASIN_TRANSPORT_TOTALS,
  TRAFFIC_POLLUTION_HOTSPOTS,
  TRANSPORT_DATA_PROVIDERS,
  SCIENTIFIC_EMISSION_FACTORS,
  COMPLETENESS_MATRIX
} from '@/data/transportation-pollution';
import {
  Car,
  BarChart3,
  FileSpreadsheet,
  Fuel,
  Compass,
  Wind,
  Gauge,
  Volume2,
  Layers,
  CloudSun,
  Droplets,
  HeartPulse,
  Bus,
  Zap,
  Flame,
  ShieldCheck,
  Radio,
  BookOpen,
  Filter,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Building,
  Activity,
  Search,
  Sliders
} from 'lucide-react';

export default function SpecializedTransportSubmodulePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER ─── */}
      <Heading
        label="KEW · TRANSPORTATION POLLUTION · GIS Atlas"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Transport Pollution GIS Atlas & Spatial Corridors' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                GIS Atlas
              </span>
              <span>Transport Pollution GIS Atlas & Spatial Corridors</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="Spatial Corridor Trajectories, RTO Geo-Coordinates & Fleet Density Heatmaps across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/environmental-monitoring/transportation-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/10 transition-all flex items-center gap-1.5"
            >
              <span>← Transport Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/transportation-pollution/dashboards"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>TPBS Scores</span>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUB-NAVIGATION ─── */}
      <TransportSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── 3. FOUR SPECIALIZED DOMAIN KPI METRICS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Monitored Highways
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              12 Arterials
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              NH-44, NH-1A, NH-1D, KKH N-35
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Arterial Road Network
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              4,820 km
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Primary inter-district corridors
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              High-Density Urban Grid
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              1,240 km
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Srinagar, Jammu, Muzaffarabad cores
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Geocoded RTO Nodes
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              42 Hubs
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              100% spatial precision
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Spatial Transit Corridors & Emission Density Mapping</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Georeferenced highway paths, freight choke points, and sensitive corridor buffers across all five Western Himalayan regions.
              </p>
            </div>
          </div>

          
        <section className="relative rounded-[8px] bg-slate-900/90 border border-white/10 overflow-hidden min-h-[440px] flex flex-col justify-between p-6">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="p-3.5 rounded-[6px] bg-slate-950/90 border border-white/10 max-w-sm">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Himalayan Transport Cartography
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Visualizing linear emission corridors along steep mountain relief. Red trajectories indicate heavy diesel freight routes with steep gradients.
              </p>
            </div>

            <div className="p-3 rounded-[6px] bg-slate-950/90 border border-white/10 text-xs space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="text-slate-300">NH-44 Heavy Freight Spine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="text-slate-300">N-35 Karakoram Highway (KKH)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                <span className="text-slate-300">Urban Transit Grids (Srinagar/Jammu)</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
            {[
              { name: 'NH-44 Bypass &amp; Pantha Chowk', district: 'Srinagar', traffic: '42,000 veh/day', pm: '194 T/yr', v: 'Stop-and-go 14 km/h' },
              { name: 'Jewel Chowk - Kunjwani Corridor', district: 'Jammu', traffic: '68,000 veh/day', pm: '215 T/yr', v: 'Stop-and-go 12 km/h' },
              { name: 'N-35 KKH Chilas Gorge', district: 'Diamer', traffic: '8,400 veh/day', pm: '38 T/yr', v: 'Heavy Grade 24 km/h' },
              { name: 'Leh Airport Spituk Axis', district: 'Ladakh', traffic: '14,200 veh/day', pm: '64 T/yr', v: 'High Altitude 35 km/h' }
            ].map((c, i) => (
              <div key={i} className="p-3 rounded-[6px] bg-slate-950/95 border border-amber-500/20 text-xs space-y-1">
                <div className="font-bold text-white">{c.name}</div>
                <div className="text-[11px] text-slate-400">{c.district} · {c.traffic}</div>
                <div className="flex justify-between font-mono pt-1 text-slate-300 text-[11px]">
                  <span className="text-rose-400 font-semibold">{c.pm}</span>
                  <span className="text-slate-400">{c.v}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 pt-4 text-center text-xs text-slate-500">
            Spatial vector layers integrating OpenStreetMap highway alignments and VAHAN RTO administrative centroids.
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
