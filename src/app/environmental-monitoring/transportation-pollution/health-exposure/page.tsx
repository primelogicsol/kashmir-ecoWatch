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
        label="KEW · TRANSPORTATION POLLUTION · Receptors"
        images={['/images/env-monitoring/kashmir-noise-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Public Health Exposure & Sensitive Receptors' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                Receptors
              </span>
              <span>Public Health Exposure & Sensitive Receptors</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="Population Proximity, Hospital Buffers, and Pediatric Asthma Vulnerability across all 42 districts of Kashmir Valley, Jammu, Ladakh, Azad Jammu & Kashmir and Gilgit-Baltistan."
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
              Population within 50m
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              620,000 Pop
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Severe direct tailpipe exposure zone
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Schools within 100m
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              412 Schools
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              High pediatric particulate burden
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Hospitals within 100m
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              86 Facilities
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Inpatient recovery acoustic/PM stress
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Estimated DALYs Lost
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              18,400 / yr
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Disability-adjusted life years lost
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Sensitive Receptor Mapping & Epidemiological Risk Matrix</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Spatial proximity analysis of vulnerable populations residing within 50 meters of high-density freight and transit corridors.
              </p>
            </div>
          </div>

          
        <section className="p-5 rounded-[8px] bg-slate-900/60 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            District Sensitive Receptor Inventories (Within Highway Impact Buffers)
          </h3>
          <div className="overflow-x-auto rounded-[6px] border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3 text-right">Schools &lt;100m</th>
                  <th className="py-2.5 px-3 text-right">Hospitals &lt;100m</th>
                  <th className="py-2.5 px-3 text-right">Population in Exposure Zone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {DISTRICT_TRANSPORT_DATA.map((d) => (
                  <tr key={d.district} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-semibold text-white font-sans">{d.district}</td>
                    <td className="py-2.5 px-3 text-slate-400 font-sans">{d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-amber-400">{d.receptors.schoolsWithin100mMajorRoads}</td>
                    <td className="py-2.5 px-3 text-right text-rose-400 font-bold">{d.receptors.hospitalsWithin100mMajorRoads}</td>
                    <td className="py-2.5 px-3 text-right text-cyan-300 font-bold">
                      {d.receptors.populationInHighExposureZone ? d.receptors.populationInHighExposureZone.toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    
        </div>
      </div>
    </div>
  );
}
