'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  Layers,
  Compass,
  AlertTriangle,
  Volume2,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Search,
  Filter,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';

export default function NoiseCitizenWatchPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const CITIZEN_REPORTS = [
    { id: 'CR-2026-0891', location: 'Rajbagh Extension Residential Belt', district: 'Srinagar', region: 'Kashmir Valley', source: 'Unauthorized Night Commercial DG Set', recordedDb: 84.2, timestamp: '2026-11-20 23:45', status: 'VERIFIED_ENFORCED', resolution: 'Police notice served; generator canopy sealed.' },
    { id: 'CR-2026-0892', location: 'Gandhi Nagar Hospital Silence Zone', district: 'Jammu', region: 'Jammu', source: 'Continuous Pressure Horns at Intersection', recordedDb: 92.5, timestamp: '2026-11-21 14:15', status: 'UNDER_INVESTIGATION', resolution: 'Traffic police acoustic camera checkpoint deployed.' },
    { id: 'CR-2026-0893', location: 'Chinar Bagh Riverside Walkway', district: 'Gilgit', region: 'Gilgit-Baltistan', source: 'Open Exhaust Modified Motorcycles', recordedDb: 88.0, timestamp: '2026-11-21 19:30', status: 'VERIFIED_ENFORCED', resolution: '3 modified silencers confiscated by municipal warden.' },
    { id: 'CR-2026-0894', location: 'Upper Bazaar Near District Hospital', district: 'Muzaffarabad', region: 'Azad Jammu & Kashmir', source: 'Wedding Marquee Loudspeaker Past 23:00', recordedDb: 91.4, timestamp: '2026-11-21 23:10', status: 'VERIFIED_ENFORCED', resolution: 'Loudspeaker disconnected by local administration.' },
    { id: 'CR-2026-0895', location: 'Fort Road Commercial Transect', district: 'Leh', region: 'Ladakh', source: 'Hotel Rooftop HVAC Chiller Low-Frequency Hum', recordedDb: 68.4, timestamp: '2026-11-22 01:20', status: 'UNDER_INVESTIGATION', resolution: 'LPCC technical acoustic inspection scheduled.' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION D · MANAGEMENT & ACCOUNTABILITY"
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
          { label: 'Citizen Noise Watch' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                COMMUNITY TELEMETRY
              </span>
              <span>Citizen Noise Watch</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Crowdsourced Acoustic Reports &amp; Verified Complaint Ledger
            </span>
          </>
        }
        subtitle="Privacy-preserving community acoustic reporting platform. Empowering citizens across 42 districts to log smartphone sound measurements, document illegal night curfew violations, and track enforcement resolutions."
        icon={<Eye className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/data-sources"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Data Sources</span>
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
                Total Citizen Reports
              </span>
              <Smartphone className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              1,420 <span className="text-sm font-normal text-slate-400">Reports</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Geotagged crowdsourced noise reports
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Calibrated through OpenBabel &amp; NoiseCapture
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Night Curfew Share
              </span>
              <Clock className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              68% <span className="text-sm font-normal text-slate-400">Nocturnal</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Filed for violations between 22:00–06:00
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Wedding marquees &amp; uncanopied generators
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Enforcement SLA
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              36 <span className="text-sm font-normal text-slate-400">hours</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Average administrative response turnaround
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              82% of verified complaints resolved
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Calibration Correction
              </span>
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              &plusmn;4.2 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Software delta applied to phone mics
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Corrects MEMS high-frequency roll-off
            </div>
          </Card>
        </div>

        {/* ── VERIFIED COMPLAINT STREAM TABLE ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Accountability Stream
              </span>
              <h3 className="text-xl font-bold text-white">Verified Citizen Noise Complaints Ledger</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Live audit of public reports forwarded to municipal &amp; police authorities
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-3">Location &amp; District</th>
                  <th className="py-3 px-4">Reported Source</th>
                  <th className="py-3 px-3 text-right">App Level</th>
                  <th className="py-3 px-3 text-center">Timestamp</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4">Enforcement Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {CITIZEN_REPORTS.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">{r.id}</td>
                    <td className="py-3 px-3 font-semibold text-white">
                      {r.location}
                      <span className="block text-[11px] font-normal text-slate-400">{r.district}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{r.source}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-rose-400">{r.recordedDb} dB</td>
                    <td className="py-3 px-3 text-center font-mono text-slate-400 text-[11px]">{r.timestamp}</td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-mono uppercase ${
                          r.status === 'VERIFIED_ENFORCED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {r.status === 'VERIFIED_ENFORCED' ? 'Enforced' : 'Under Review'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-emerald-400 text-xs">{r.resolution}</td>
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
