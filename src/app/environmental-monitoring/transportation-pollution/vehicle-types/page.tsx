'use client';

import React, { useState, useMemo } from 'react';
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

export default function VehicleTypesPage() {
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredDistricts = useMemo(() => {
    return DISTRICT_TRANSPORT_DATA.filter((d) => {
      if (regionFilter !== 'ALL') {
        if (regionFilter === 'AJ&K' || regionFilter === 'Azad Jammu & Kashmir') {
          if (d.region !== 'Azad Jammu & Kashmir' && d.region !== 'AJ&K') return false;
        } else if (d.region !== regionFilter) {
          return false;
        }
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        return (
          d.district.toLowerCase().includes(q) ||
          d.headquarters.toLowerCase().includes(q) ||
          d.rtoCode.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [regionFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER ─── */}
      <Heading
        label="KEW · TRANSPORTATION POLLUTION · EV/Diesel"
        images={[
          '/images/env-monitoring/kashmir-transport-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-vehicle-census.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Transportation Pollution', href: '/environmental-monitoring/transportation-pollution' },
          { label: 'Vehicle Types & Fuel Mix Distribution' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                EV/Diesel
              </span>
              <span>Vehicle Types &amp; Fuel Mix Distribution</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Five-Region Scientific Telemetry
            </span>
          </>
        }
        subtitle="7 Vehicle Classes & Fuel Mix Breakdown (Petrol, Diesel, CNG, EV) across all 42 districts of Kashmir Valley, Jammu, Ladakh, AJ&K and Gilgit-Baltistan."
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
              Two-Wheelers (2W)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              54.2%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Predominant in Jammu &amp; Srinagar plains
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Passenger Cars (4W)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              28.4%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Hatchbacks, sedans, private SUVs
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Commercial Fleet
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              12.1%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              HCVs, LCVs, buses &amp; maxicabs
            </div>
          </Card>
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Diesel Commercial Dependency
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              92.4%
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Diesel dominates freight &amp; public transit
            </div>
          </Card>
        </div>

        {/* ── 4. SPECIALIZED DOMAIN SECTION ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Vehicle Classification &amp; Fuel Penetration Ledger</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Granular fleet categorization across vehicular classes and fuel types, highlighting diesel dependency in mountain haulage.
              </p>
            </div>
          </div>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-[6px] bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400 block">Petrol Fleet</span>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">58.2%</div>
              <span className="text-[10px] text-slate-500">Two-wheelers &amp; light cars</span>
            </div>
            <div className="p-3.5 rounded-[6px] bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400 block">Diesel Fleet</span>
              <div className="text-xl font-bold font-mono text-orange-400 mt-1">37.1%</div>
              <span className="text-[10px] text-slate-500">Trucks, buses, SUVs, commercial</span>
            </div>
            <div className="p-3.5 rounded-[6px] bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400 block">CNG / Hybrid</span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">2.4%</div>
              <span className="text-[10px] text-slate-500">Mainly Jammu city autos &amp; cabs</span>
            </div>
            <div className="p-3.5 rounded-[6px] bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400 block">Electric (EV)</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">2.3%</div>
              <span className="text-[10px] text-slate-500">Smart city e-buses &amp; e-rickshaws</span>
            </div>
          </section>

          {/* ── Filter & Search Control Bar ── */}
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Filter by Region:</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="px-2.5 py-1 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All 5 Regions (42 Districts)</option>
                <option value="Kashmir Valley">Kashmir Valley (10 Districts)</option>
                <option value="Jammu">Jammu Division (10 Districts)</option>
                <option value="Ladakh">Ladakh (2 Districts)</option>
                <option value="AJ&K">AJ&K (10 Districts)</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan (10 Districts)</option>
              </select>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search district, RTO code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-slate-950 border border-white/10 rounded-[6px] text-xs text-slate-200 focus:outline-none focus:border-amber-500 w-full sm:w-48"
              />
            </div>
          </div>

          <section className="p-5 rounded-[8px] bg-slate-900/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                District Vehicle Class &amp; Fuel Distribution Matrix ({filteredDistricts.length} jurisdictions)
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Region: <strong className="text-amber-400">{regionFilter}</strong>
              </span>
            </div>
            <div className="overflow-x-auto rounded-[6px] border border-white/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                  <tr>
                    <th className="py-2.5 px-3">District</th>
                    <th className="py-2.5 px-3">Region</th>
                    <th className="py-2.5 px-3 text-right">2W %</th>
                    <th className="py-2.5 px-3 text-right">Cars/SUVs %</th>
                    <th className="py-2.5 px-3 text-right">Buses %</th>
                    <th className="py-2.5 px-3 text-right">Freight Trucks %</th>
                    <th className="py-2.5 px-3 text-right">Petrol %</th>
                    <th className="py-2.5 px-3 text-right">Diesel %</th>
                    <th className="py-2.5 px-3 text-right">EV %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filteredDistricts.map((d) => (
                    <tr key={d.district} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-semibold text-white font-sans">{d.district}</td>
                      <td className="py-2.5 px-3 text-slate-400 font-sans">
                        {d.region === 'Azad Jammu & Kashmir' ? 'AJ&K' : d.region}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{d.classes.twoWheelersPct}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{d.classes.carsSuvsPct}%</td>
                      <td className="py-2.5 px-3 text-right text-amber-400">{d.classes.busesPublicPct}%</td>
                      <td className="py-2.5 px-3 text-right text-rose-400">{d.classes.freightTrucksPct}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{d.fuels.petrolPct}%</td>
                      <td className="py-2.5 px-3 text-right text-orange-400 font-bold">{d.fuels.dieselPct}%</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">{d.fuels.evElectricPct}%</td>
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
