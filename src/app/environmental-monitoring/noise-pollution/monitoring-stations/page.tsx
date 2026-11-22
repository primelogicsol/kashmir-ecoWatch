'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Radio,
  Layers,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Sliders,
  ArrowRight,
  Activity,
  Cpu
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import {
  NOISE_MONITORING_STATIONS,
  NoiseMonitoringStation
} from '@/data/noise-pollution';

export default function NoiseMonitoringStationsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStations = useMemo(() => {
    return NOISE_MONITORING_STATIONS.filter((s) => {
      const matchStatus = selectedStatus === 'ALL' || s.operatingStatus === selectedStatus;
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.institution.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [selectedStatus, searchQuery]);

  const operationalCount = NOISE_MONITORING_STATIONS.filter((s) => s.operatingStatus === 'OPERATIONAL').length;
  const class1Count = NOISE_MONITORING_STATIONS.filter((s) => s.classRating.includes('Class 1')).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION A · MONITORING & GEOGRAPHIC INTELLIGENCE"
        images={[
          '/images/env-monitoring/kashmir-noise-hero.jpg',
          '/images/env-monitoring/kashmir-traffic-urban.jpg',
          '/images/env-monitoring/kashmir-transport-hero.jpg'
        ]}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Noise Pollution', href: '/environmental-monitoring/noise-pollution' },
          { label: 'Monitoring Stations' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SENSOR NETWORK
              </span>
              <span>Monitoring Stations</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Physical Sound Level Meter Telemetry
            </span>
          </>
        }
        subtitle="Live registry of continuous regulatory acoustic sensors, IEC 61672 Class 1/2 sound level terminals, calibration cycles, and data latency across Kashmir Valley, Jammu, Ladakh, AJK, and Gilgit-Baltistan."
        icon={<Radio className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/noise-pollution"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Overview Hub</span>
            </Link>
            <Link
              href="/environmental-monitoring/noise-pollution/measurements"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Sound Measurements</span>
            </Link>
          </div>
        }
      />

      <NoisePollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* ── 4 KPI CARDS ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Total Network Nodes
              </span>
              <Radio className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              {NOISE_MONITORING_STATIONS.length} <span className="text-sm font-normal text-slate-400">Nodes</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Across 5 Himalayan administrations
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              CPCB, JKPCC, LPCC, AJK-EPA &amp; GB-EPA
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Continuous Active
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              {operationalCount} <span className="text-sm font-normal text-slate-400">Online</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              24/7 continuous telemetry streaming
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              1-second sampling rate integration
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Class 1 Precision
              </span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              {class1Count} <span className="text-sm font-normal text-slate-400">Terminals</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              IEC 61672 Type 1 (SVANTEK / B&amp;K)
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              &plusmn;0.7 dB laboratory acoustic precision
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Average Latency
              </span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-purple-400">
              15 <span className="text-sm font-normal text-slate-400">min</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Automated ingestion buffer
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Zero manual spreadsheet intervention
            </div>
          </Card>
        </div>

        {/* ── SENSOR REGISTRY & HARDWARE DIRECTORY ─── */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Hardware &amp; Metrology Registry
              </span>
              <h3 className="text-xl font-bold text-white">Physical Monitoring Station Directory</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search station or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 rounded-[6px] bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex items-center gap-1">
                {['ALL', 'OPERATIONAL', 'PERIODIC_SURVEY', 'PROPOSED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-2.5 py-1 rounded-[6px] text-[11px] font-mono transition-all ${
                      selectedStatus === st
                        ? 'bg-amber-600 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {st === 'ALL' ? 'All' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Station Code</th>
                  <th className="py-3 px-3">Station Name &amp; District</th>
                  <th className="py-3 px-3">Instrument Model</th>
                  <th className="py-3 px-3 text-center">Class</th>
                  <th className="py-3 px-3 text-center">Zone Type</th>
                  <th className="py-3 px-3 text-right">Day LAeq</th>
                  <th className="py-3 px-3 text-right">Night LAeq</th>
                  <th className="py-3 px-3 text-center">30-Day Exceed.</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredStations.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">{s.code}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{s.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {s.district} · {s.coordinates.elevationMeters}m MSL
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px] max-w-xs truncate">
                      {s.instrumentModel}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {s.classRating.includes('Class 1') ? 'Class 1' : 'Class 2'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                        {s.zoneType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                      {s.latestDayLeq ? `${s.latestDayLeq} dB` : 'N/A'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {s.latestNightLeq ? `${s.latestNightLeq} dB` : 'N/A'}
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-rose-400 font-bold">
                      {s.exceedanceCountLast30Days ? `${s.exceedanceCountLast30Days}d` : '0d'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase ${
                          s.operatingStatus === 'OPERATIONAL'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : s.operatingStatus === 'PERIODIC_SURVEY'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {s.operatingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
