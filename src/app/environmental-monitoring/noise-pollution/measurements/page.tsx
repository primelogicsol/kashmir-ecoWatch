'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Layers,
  Compass,
  Volume2,
  Clock,
  TrendingUp,
  AlertTriangle,
  Radio,
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';

export default function NoiseMeasurementsPage() {
  const METRIC_DEFINITIONS = [
    {
      metric: 'L_Aeq',
      name: 'Equivalent Continuous Sound Level',
      formula: '10 · log10 [ 1/T · ∫ (p_A(t) / p_0)^2 dt ]',
      useCase: 'Primary statutory parameter for commercial & residential environmental impact.',
      baseline: '65.2 dB(A) Basin Avg'
    },
    {
      metric: 'L_10',
      name: 'Statistical Peak Indicator',
      formula: 'Exceeded for 10% of measurement time',
      useCase: 'Highway traffic noise assessment, intermittent peak lorry pass-bys and horn events.',
      baseline: '74.8 dB(A) Commercial'
    },
    {
      metric: 'L_90',
      name: 'Residual Background Level',
      formula: 'Exceeded for 90% of measurement time',
      useCase: 'Underlying ambient noise in absence of discrete near-field vehicle events.',
      baseline: '42.5 dB(A) Baseline'
    },
    {
      metric: 'L_den',
      name: 'Day-Evening-Night Indicator',
      formula: 'Log average with +5 dB evening & +10 dB night penalty',
      useCase: 'WHO composite metric for long-term epidemiological annoyance and cardiovascular risk.',
      baseline: '68.4 dB(A) Valley Urban'
    },
    {
      metric: 'L_night',
      name: 'Nighttime Sleep Metric (22:00–06:00)',
      formula: 'Continuous Leq over nocturnal window',
      useCase: 'Sleep disruption, awakenings, and neuroendocrine stress biomarker activation.',
      baseline: '50.8 dB(A) Basin Avg'
    },
    {
      metric: 'L_Amax',
      name: 'Maximum Instantaneous Sound Level',
      formula: 'Peak RMS level with FAST (125ms) weighting',
      useCase: 'Short-duration acoustic shocks: pneumatic horns, sirens, blasting and structural drop.',
      baseline: '104.2 dB(A) Observed'
    }
  ];

  const FREQUENCY_OCTAVES = [
    { band: '63 Hz', source: 'Heavy diesel engine rumble & compressor throb', attenuation: 'Very low (travels kilometers)', indoorTransmission: 'Severe' },
    { band: '125 Hz', source: 'Exhaust resonance & unbaffled trucks', attenuation: 'Low (penetrates standard glazing)', indoorTransmission: 'High' },
    { band: '250 Hz', source: 'Construction machinery & stone crusher mills', attenuation: 'Moderate (structural vibration)', indoorTransmission: 'High' },
    { band: '500 Hz', source: 'Engine block mechanical vibration', attenuation: 'Moderate', indoorTransmission: 'Moderate' },
    { band: '1 kHz', source: 'Tyre-pavement rolling contact friction', attenuation: 'Standard A-weighting reference (0 dB)', indoorTransmission: 'Moderate' },
    { band: '2 kHz', source: 'Pneumatic pressure release & bus brakes', attenuation: 'A-weighted amplification (+1.2 dB)', indoorTransmission: 'Moderate' },
    { band: '4 kHz', source: 'High-pitch dual-tone electric & air horns', attenuation: 'Peak human ear sensitivity (+1.0 dB)', indoorTransmission: 'Acute shock' },
    { band: '8 kHz', source: 'Brake squeal & turbocharger turbine hiss', attenuation: 'High air absorption', indoorTransmission: 'Low' }
  ];

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
          { label: 'Sound Measurements & Trends' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                ACOUSTIC METROLOGY
              </span>
              <span>Measurements &amp; Trends</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              LAeq, Lmax, L10, L90 &amp; Octave Band Telemetry
            </span>
          </>
        }
        subtitle="Empirical time-domain and frequency-domain acoustic indicators. Rigorous IEC 61672 sound pressure analysis separating background residual noise (L90) from traffic surges (L10) and peak shock levels (Lmax)."
        icon={<Activity className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/transport-noise"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Transport Noise</span>
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
                Observed Peak L_Amax
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              104.2 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Dual-tone pneumatic horn event
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Recorded at Batamaloo Junction (Srinagar)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Daytime Ambient L_Aeq
              </span>
              <Volume2 className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              65.2 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Basin daytime energy equivalent
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              10.2 dB above residential statutory limit
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Residual Noise L_90
              </span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              42.5 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Background floor in traffic lull
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              True alpine baseline indicator
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Night Sleep Disturbance
              </span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-purple-400">
              50.8 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Exceeds WHO 45 dB threshold
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Heavy nighttime truck freight transit
            </div>
          </Card>
        </div>

        {/* ── ACOUSTIC METRICS DERIVATION MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Statistical Acoustics
              </span>
              <h3 className="text-xl font-bold text-white">Standard Acoustic Indicators &amp; Derivations</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Calibrated strictly under ISO 1996-1:2016
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {METRIC_DEFINITIONS.map((m) => (
              <Card key={m.metric} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-bold">
                      {m.metric}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5">{m.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">{m.baseline}</span>
                </div>

                <div className="p-2.5 rounded-[6px] bg-slate-950/80 border border-white/5 font-mono text-[11px] text-slate-300">
                  <code>{m.formula}</code>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">{m.useCase}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* ── FREQUENCY SPECTRUM & OCTAVE BAND ANALYSIS ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Spectral Disaggregation
              </span>
              <h3 className="text-xl font-bold text-white">Octave Band Frequency Analysis</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Physics of environmental sound attenuation in mountain terrain
            </span>
          </div>

          <div className="overflow-x-auto rounded-[8px] border border-white/10 bg-slate-900/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Octave Center Frequency</th>
                  <th className="py-3 px-4">Dominant Physical Source</th>
                  <th className="py-3 px-4">Atmospheric &amp; Terrain Attenuation</th>
                  <th className="py-3 px-4 text-right">Building Penetration Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {FREQUENCY_OCTAVES.map((o) => (
                  <tr key={o.band} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-mono font-bold text-amber-400">{o.band}</td>
                    <td className="py-3 px-4 font-semibold text-white">{o.source}</td>
                    <td className="py-3 px-4 text-slate-300">{o.attenuation}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-300">{o.indoorTransmission}</td>
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
