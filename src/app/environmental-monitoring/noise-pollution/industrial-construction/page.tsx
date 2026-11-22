'use client';

import React from 'react';
import Link from 'next/link';
import {
  Factory,
  Layers,
  Compass,
  AlertTriangle,
  Volume2,
  HardHat,
  ShieldCheck,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import { NOISE_SOURCE_SECTORS } from '@/data/noise-pollution';

export default function NoiseIndustrialConstructionPage() {
  const industrialSector = NOISE_SOURCE_SECTORS.find((s) => s.category === 'CONSTRUCTION_INDUSTRIAL');

  const HEAVY_MACHINERY = [
    { equipment: 'Hydraulic Breaker / Jackhammer', soundLevelAt1m: '108–114 dB(A)', dominantFrequency: '250–1000 Hz', typicalUsage: 'Road excavation & mountain rock cutting', mitigation: 'Acoustic shrouds & vibration dampers' },
    { equipment: 'Impact Pile Driver', soundLevelAt1m: '112–122 dB(A)', dominantFrequency: '63–250 Hz', typicalUsage: 'Bridge foundation & flyover pier sinking', mitigation: 'Hydraulic press-in alternative' },
    { equipment: 'Rotary Stone Crusher Mill', soundLevelAt1m: '98–106 dB(A)', dominantFrequency: '500–2000 Hz', typicalUsage: 'Aggregate production along riverbeds', mitigation: 'Enclosed acoustic sheds & water spray' },
    { equipment: 'Centrifugal Brick Kiln Blower', soundLevelAt1m: '92–98 dB(A)', dominantFrequency: '125–500 Hz', typicalUsage: 'FCBK draft induction in Pulwama & Budgam', mitigation: 'Silencer baffles on exhaust duct' },
    { equipment: 'Heavy Tracked Excavator', soundLevelAt1m: '86–92 dB(A)', dominantFrequency: '125–500 Hz', typicalUsage: 'Earthmoving & slope stabilization', mitigation: 'Engine compartment acoustic lining' },
    { equipment: 'Concrete Batching Plant', soundLevelAt1m: '84–90 dB(A)', dominantFrequency: '250–1000 Hz', typicalUsage: 'Highway tunneling & megaproject supply', mitigation: 'Enclosed hopper bins' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION B · NOISE SOURCES"
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
          { label: 'Construction & Industrial Noise' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SOURCE SECTOR 02
              </span>
              <span>Industrial &amp; Construction Noise</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Heavy Equipment, Stone Crushers, Blasting &amp; Factory Estates
            </span>
          </>
        }
        subtitle="Auditing acoustic footprints of infrastructure megaprojects, mountain tunneling, stone crushing plants, brick kiln blowers, and manufacturing growth estates across 42 Himalayan districts."
        icon={<Factory className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/community-tourism"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Community Noise</span>
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
                Peak Tunneling Blast
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              118.5 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Controlled blasting instantaneous peak
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Recorded at Zojila approach portal
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Statutory Industrial Limit
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              75 / 70 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Day / Night boundary wall threshold
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              CPCB Noise Rules 2000 &amp; NEQS 2010
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Stone Crusher Density
              </span>
              <Factory className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              184 <span className="text-sm font-normal text-slate-400">Units</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Operating in riverbeds &amp; quarries
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Jhelum, Tawi &amp; Neelum river basins
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Acoustic Enclosure Rate
              </span>
              <HardHat className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              34% <span className="text-sm font-normal text-slate-400">Compliant</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Equipped with approved noise canopies
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              66% deficit in acoustic barrier walls
            </div>
          </Card>
        </div>

        {/* ── HEAVY CONSTRUCTION EQUIPMENT NOISE TABLE ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Machinery Metrology
              </span>
              <h3 className="text-xl font-bold text-white">Construction Equipment Sound Power &amp; Mitigation</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Empirical measurements evaluated at 1-meter and 10-meter reference distances
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Equipment Typology</th>
                  <th className="py-3 px-3 text-right">Sound Level (1m)</th>
                  <th className="py-3 px-3">Dominant Frequency Band</th>
                  <th className="py-3 px-4">Typical Regional Usage</th>
                  <th className="py-3 px-4">Mandated Abatement Technique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {HEAVY_MACHINERY.map((m) => (
                  <tr key={m.equipment} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{m.equipment}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-rose-400 text-sm">{m.soundLevelAt1m}</td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{m.dominantFrequency}</td>
                    <td className="py-3 px-4 text-slate-300 text-xs">{m.typicalUsage}</td>
                    <td className="py-3 px-4 text-emerald-400 text-xs font-medium">{m.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── REGIONAL INDUSTRIAL SITES AUDIT ─── */}
        {industrialSector && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Audited Heavy Industrial &amp; Infrastructure Belts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {industrialSector.keyRegionalExamples.map((ex, i) => (
                <Card key={i} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-mono text-[10px] font-bold uppercase">{ex.region}</span>
                    <span className="text-slate-400">{ex.district}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{ex.location}</h4>
                  <div className="flex items-center justify-between p-2 rounded-[6px] bg-slate-950 border border-white/5">
                    <span className="text-xs text-slate-400">Peak Boundary Leq:</span>
                    <span className="text-base font-bold font-mono text-rose-400">{ex.peakLeqDb} dB(A)</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{ex.mitigationStatus}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
