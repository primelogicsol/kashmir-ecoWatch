'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  Layers,
  Compass,
  AlertTriangle,
  Volume2,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Flame
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';
import { NOISE_SOURCE_SECTORS } from '@/data/noise-pollution';

export default function NoiseInfrastructureNoisePage() {
  const genSector = NOISE_SOURCE_SECTORS.find((s) => s.category === 'GENERATORS_INFRASTRUCTURE');

  const DG_ACOUSTIC_TIERS = [
    { tier: 'Unenclosed Portable DG Set (2–5 kVA)', soundAt1m: '88–94 dB(A)', soundAt5m: '76–82 dB(A)', cpcbCompliance: 'Illegal (Violates EPA 1986)', winterUsage: 'Pervasive in shops & clinics' },
    { tier: 'Basic Metallic Enclosure (Without Silencer)', soundAt1m: '80–85 dB(A)', soundAt5m: '68–72 dB(A)', cpcbCompliance: 'Non-Compliant (>75 dB)', winterUsage: 'Small commercial hotels' },
    { tier: 'CPCB-Certified Acoustic Canopy (-25 dB)', soundAt1m: '72–75 dB(A)', soundAt5m: '58–62 dB(A)', cpcbCompliance: 'Compliant (CPCB Standard)', winterUsage: 'Modern corporate & bank branches' },
    { tier: 'Hospital-Grade High-Attenuation Canopy', soundAt1m: '62–66 dB(A)', soundAt5m: '48–52 dB(A)', cpcbCompliance: 'Exceeds Standard (Silence Zone)', winterUsage: 'SKIMS & GMC Jammu backup' }
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
          { label: 'Generators & Infrastructure Noise' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                SOURCE SECTOR 04
              </span>
              <span>Generators &amp; Utilities</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Diesel Generators, HVAC Chillers &amp; Rail Operations
            </span>
          </>
        }
        subtitle="Surveillance of commercial diesel generator (DG) proliferation during winter power deficits, heavy HVAC chiller low-frequency hum, transformer humming, and USBRL rail acoustic corridors."
        icon={<Zap className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/sensitive-zones"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Silence Zones</span>
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
                Unenclosed DG Noise
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              94.5 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Commercial alley portable generator
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              19.5 dB above statutory 75 dB mandate
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                CPCB Canopy Standard
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              75 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Maximum sound limit at 1-meter
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Mandatory 25 dB(A) acoustic insertion loss
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Winter Outage Delta
              </span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              +12.4 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Acoustic surge during load shedding
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Simultaneous operation of hundreds of DG sets
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                HVAC Chiller Hum
              </span>
              <Flame className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              64.8 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Low-frequency rooftop compressor vibration
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Tonal hum in hospitals &amp; IT complexes
            </div>
          </Card>
        </div>

        {/* ── DG SET ACOUSTIC CANOPY COMPLIANCE TABLE ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Acoustic Enclosure Standards
              </span>
              <h3 className="text-xl font-bold text-white">Diesel Generator Enclosure Performance Matrix</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Evaluated under Environment (Protection) Second Amendment Rules, 2002
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Canopy Typology</th>
                  <th className="py-3 px-3 text-right">Sound at 1m</th>
                  <th className="py-3 px-3 text-right">Sound at 5m</th>
                  <th className="py-3 px-4">Statutory Compliance Status</th>
                  <th className="py-3 px-4">Regional Market Prevalence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {DG_ACOUSTIC_TIERS.map((tier) => (
                  <tr key={tier.tier} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-semibold text-white">{tier.tier}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">{tier.soundAt1m}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{tier.soundAt5m}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          tier.cpcbCompliance.includes('Compliant')
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {tier.cpcbCompliance}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs">{tier.winterUsage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── REGIONAL UTILITY SITES AUDIT ─── */}
        {genSector && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Audited Utility Infrastructure Hotspots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {genSector.keyRegionalExamples.map((ex, i) => (
                <Card key={i} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-mono text-[10px] font-bold uppercase">{ex.region}</span>
                    <span className="text-slate-400">{ex.district}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{ex.location}</h4>
                  <div className="flex items-center justify-between p-2 rounded-[6px] bg-slate-950 border border-white/5">
                    <span className="text-xs text-slate-400">Measured Peak Leq:</span>
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
