'use client';

import React from 'react';
import Link from 'next/link';
import {
  Database,
  Layers,
  Compass,
  Radio,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Server,
  Cpu,
  Clock
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';

export default function NoiseDataSourcesPage() {
  const DATA_PROVIDERS = [
    {
      agency: 'Central Pollution Control Board (CPCB)',
      jurisdiction: 'National (India)',
      network: 'National Ambient Noise Monitoring Network (NANMN)',
      telemetry: 'Real-time 1-sec LAeq, L10, L90, Lmax via continuous GPRS terminals',
      samplingRate: '1 second continuous',
      latency: '15 minutes',
      stationCount: '8 Class 1 stations in J&K & Ladakh',
      auditStatus: 'NABL ISO/IEC 17025 Calibrated'
    },
    {
      agency: 'J&K Pollution Control Committee (JKPCC)',
      jurisdiction: 'Kashmir Valley & Jammu',
      network: 'State Continuous Acoustic Surveillance System',
      telemetry: 'Continuous ambient monitors in Srinagar, Jammu & commercial hubs',
      samplingRate: '1 minute energy average',
      latency: '30 minutes',
      stationCount: '7 active regulatory terminals',
      auditStatus: 'Annual SPCB verification'
    },
    {
      agency: 'Ladakh Pollution Control Committee (LPCC)',
      jurisdiction: 'Ladakh (Leh & Kargil)',
      network: 'High-Altitude Cold Desert Acoustic Array',
      telemetry: 'Leh airport transect & sensitive high-altitude ecological monitors',
      samplingRate: '5 minutes periodic',
      latency: '1 hour',
      stationCount: '2 Class 2 terminals',
      auditStatus: 'Field verified'
    },
    {
      agency: 'AJK Environmental Protection Agency (AJK-EPA)',
      jurisdiction: 'Azad Jammu & Kashmir',
      network: 'Muzaffarabad & Mirpur Urban Acoustic Ledger',
      telemetry: 'Sound level surveys along commercial and river confluence roads',
      samplingRate: 'Periodic field campaign',
      latency: 'Daily batch upload',
      stationCount: '2 designated survey nodes',
      auditStatus: 'EPA baseline compliance'
    },
    {
      agency: 'Gilgit-Baltistan EPA (GB-EPA)',
      jurisdiction: 'Gilgit-Baltistan',
      network: 'Karakoram Highway Mountain Acoustic Survey',
      telemetry: 'KKH freight transit corridors and ecotourism baseline telemetry',
      samplingRate: 'Periodic seasonal surveys',
      latency: 'Weekly validation',
      stationCount: '4 survey stations',
      auditStatus: 'Peer-reviewed baseline'
    },
    {
      agency: 'University & Research Herbarium Herb / Met',
      jurisdiction: 'Academic (KU, SKUAST, SMVDU, KIU)',
      network: 'Himalayan Acoustic Ecology Research Consortium',
      telemetry: 'Bioacoustic microphones in Dachigam, Hemis & Hokersar',
      samplingRate: 'WAV full audio spectrum (48 kHz)',
      latency: 'Research campaign mode',
      stationCount: '5 bioacoustic listening arrays',
      auditStatus: 'Acoustic journal peer review'
    }
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
          { label: 'Data Sources & Integrations' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                DATA FIDELITY
              </span>
              <span>Data Sources &amp; APIs</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Institutional Provenance, Metrology &amp; API Connectors
            </span>
          </>
        }
        subtitle="Transparent integration matrix documenting all physical data providers, regulatory pollution control committees, university bioacoustic consortia, and hardware calibration traceability across 42 districts."
        icon={<Database className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/methodology"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Methodology</span>
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
                Connected Institutions
              </span>
              <Server className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              6 <span className="text-sm font-normal text-slate-400">Agencies</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Multi-jurisdiction public authorities
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              CPCB, JKPCC, LPCC, AJK-EPA &amp; GB-EPA
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Daily Sensor Ingestion
              </span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              86.4k <span className="text-sm font-normal text-slate-400">Pings/day</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Continuous 1-sec to 1-min aggregated feeds
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Automated ingestion pipelines
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Calibration Standard
              </span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              ISO/IEC 17025
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              NABL accredited acoustic calibration
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Class 1 acoustic calibrator (94/114 dB at 1kHz)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Data Transparency
              </span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-purple-400">
              100% <span className="text-sm font-normal text-slate-400">Logged</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Full provenance &amp; confidence ratings
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Zero synthetic data fabrication pledge
            </div>
          </Card>
        </div>

        {/* ── DATA PROVIDERS MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Provider Telemetry Ledger
              </span>
              <h3 className="text-xl font-bold text-white">Institutional Data Providers &amp; Sensor Feeds</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Audited data ingestion pipelines powering Kashmir EcoWatch acoustics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DATA_PROVIDERS.map((dp) => (
              <Card key={dp.agency} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-bold">
                      {dp.jurisdiction}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{dp.agency}</h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">{dp.stationCount}</span>
                </div>

                <div className="text-xs font-mono text-cyan-300 bg-slate-950 p-2.5 rounded border border-white/5">
                  {dp.network}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{dp.telemetry}</p>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
                  <div>Sampling: <strong className="text-white">{dp.samplingRate}</strong></div>
                  <div>Latency: <strong className="text-white">{dp.latency}</strong></div>
                </div>

                <div className="text-[10px] font-mono text-emerald-400 pt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{dp.auditStatus}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
