'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Layers,
  Compass,
  AlertTriangle,
  Volume2,
  CheckCircle2,
  Sliders,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';

export default function NoiseMitigationPage() {
  const MITIGATION_SOLUTIONS = [
    {
      category: 'Highway Acoustic Barriers',
      technologies: 'Perforated Aluminum Absorptive Screens & Transparent PMMA Acrylic Panels',
      attenuation: '-8 to -14 dB(A)',
      costIndex: '₹8,500 – ₹14,000 / m²',
      applicability: 'Elevated flyovers (Jahangir Chowk-Rambagh), bypass corridors adjacent to hospitals.',
      advantages: 'Immediate shadow zone protection for multi-story residential blocks.'
    },
    {
      category: 'Low-Noise Porous Pavements',
      technologies: 'Open-Graded Friction Course (OGFC) & Stone Mastic Asphalt (SMA 8)',
      attenuation: '-3 to -5 dB(A)',
      costIndex: '15% premium over dense asphalt',
      applicability: 'High-speed urban bypasses (>50 km/h) where tyre rolling noise dominates.',
      advantages: 'Simultaneously reduces hydroplaning and water splash during alpine snowmelt.'
    },
    {
      category: 'Automated Acoustic Horn Cameras',
      technologies: 'MEMS Microphones Array with Beamforming & ANPR Camera Integration',
      attenuation: '-60% horn blowing events',
      costIndex: '₹450,000 per junction unit',
      applicability: 'Silence zones around SKIMS Soura, SMHS Hospital, GMC Jammu, High Courts.',
      advantages: 'Automated challan generation without requiring physical police intervention.'
    },
    {
      category: 'Building Envelope Glazing Retrofits',
      technologies: 'Acoustic Laminated Double Glazing (6mm glass + 0.76mm PVB + 12mm gap + 6mm glass)',
      attenuation: 'Rw = 36 – 42 dB sound reduction',
      costIndex: '₹650 – ₹1,100 / sq ft',
      applicability: 'Schools, patient wards and residences bordering NH-44 and railway tracks.',
      advantages: 'Eliminates high-frequency horn noise and low-frequency engine throb indoors.'
    },
    {
      category: 'Industrial Acoustic Enclosures',
      technologies: 'Modular Acoustic Canopy with Attenuated Air Intake & Discharge Silencers',
      attenuation: '-25 dB(A) insertion loss',
      costIndex: '₹45,000 – ₹250,000 per generator',
      applicability: 'Commercial diesel generators, factory blowers, chiller rooftop banks.',
      advantages: 'Mandated by CPCB; ensures 75 dB(A) limit at 1-meter boundary.'
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
          { label: 'Mitigation & Interventions' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                ACTION BLUEPRINT
              </span>
              <span>Mitigation &amp; Interventions</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Highway Barriers, Porous Asphalt, Acoustic Cameras &amp; Canopies
            </span>
          </>
        }
        subtitle="Engineering solutions, urban design interventions, and statutory enforcement technologies to suppress ambient acoustic pressure across Western Himalayan transportation corridors and sensitive urban centers."
        icon={<ShieldCheck className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/citizen-watch"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Citizen Watch</span>
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
                Highway Screen Gain
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              -12 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Acoustic shadow zone reduction
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Certified absorptive barrier panels
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Porous Asphalt Delta
              </span>
              <Sliders className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              -4.5 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Tyre-pavement friction suppression
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Open-graded stone mastic asphalt
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Acoustic Camera Impact
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              -60% <span className="text-sm font-normal text-slate-400">Horns</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Reduction in illegal honking
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Automated microphone beamforming radar
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                DG Canopy Mandate
              </span>
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-purple-400">
              -25 <span className="text-sm font-normal text-slate-400">dB(A)</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Mandatory acoustic canopy insertion loss
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              CPCB statutory enclosure requirement
            </div>
          </Card>
        </div>

        {/* ── ENGINEERING MITIGATION TECHNOLOGIES MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Abatement Technologies
              </span>
              <h3 className="text-xl font-bold text-white">Engineering Noise Abatement Catalog</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Proven interventions evaluated for Himalayan terrain and sub-zero winter temperatures
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MITIGATION_SOLUTIONS.map((s) => (
              <Card key={s.category} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-white">{s.category}</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400">{s.attenuation}</span>
                </div>
                <div className="text-xs font-mono text-cyan-300 bg-slate-950 p-2 rounded border border-white/5">
                  {s.technologies}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Target Application:</strong> {s.applicability}
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 pt-2 border-t border-white/5">
                  <span>Cost: {s.costIndex}</span>
                  <span className="text-emerald-400 font-bold">{s.advantages}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
