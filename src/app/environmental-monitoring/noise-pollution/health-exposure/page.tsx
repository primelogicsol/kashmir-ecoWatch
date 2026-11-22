'use client';

import React from 'react';
import Link from 'next/link';
import {
  HeartPulse,
  Layers,
  Compass,
  AlertTriangle,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Users,
  Moon,
  Activity
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { NoisePollutionSubNav } from '@/components/noise-pollution/NoisePollutionSubNav';

export default function NoiseHealthExposurePage() {
  const HEALTH_RISK_TIERS = [
    {
      tier: 'Severe Chronic Risk',
      decibelRange: '> 70 dB(A)',
      exposedPop: '340,000 residents',
      primarySymptoms: 'Significant increase in ischemic heart disease (IHD), chronic hypertension, severe anxiety and permanent threshold shifts.',
      whoStatus: 'Unacceptable Exposure'
    },
    {
      tier: 'High Health Risk',
      decibelRange: '65 – 70 dB(A)',
      exposedPop: '1,500,000 residents',
      primarySymptoms: 'Speech intelligibility masking, continuous cortisol stress response, cognitive fatigue and concentration deficit.',
      whoStatus: 'Above WHO Health Guidelines'
    },
    {
      tier: 'Moderate Concern',
      decibelRange: '55 – 65 dB(A)',
      exposedPop: '2,800,000 residents',
      primarySymptoms: 'Daytime annoyance, elevated background stress, intermittent interference with rest and quiet study.',
      whoStatus: 'Intervention Recommended'
    },
    {
      tier: 'Acoustically Stable',
      decibelRange: '< 55 dB(A)',
      exposedPop: 'Remainder of Basin',
      primarySymptoms: 'Restorative soundscape, normal circadian rhythms, optimal sleep architecture.',
      whoStatus: 'Protective Standard Met'
    }
  ];

  const EPIDEMIOLOGICAL_INDICATORS = [
    {
      endpoint: 'Ischemic Heart Disease (IHD)',
      whoRelativeRisk: 'RR = 1.08 per 10 dB',
      mechanism: 'Chronic sympathetic nervous system overactivation elevates arterial blood pressure and endothelial dysfunction.',
      burdenInRegion: 'Estimated 3,200 excess cardiovascular events annually along major transport corridors.'
    },
    {
      endpoint: 'Chronic Sleep Disruption',
      whoRelativeRisk: 'Odds Ratio = 1.6 at Lnight > 50 dB',
      mechanism: 'Nocturnal sound peaks trigger cortical electroencephalographic (EEG) awakenings without conscious awakening.',
      burdenInRegion: 'Estimated 410,000 adults experience frequent sleep fragmentation.'
    },
    {
      endpoint: 'Child Cognitive Impairment',
      whoRelativeRisk: '1–2 month reading delay per 5 dB',
      mechanism: 'High road and aircraft noise in schools impairs speech comprehension, semantic memory retention and attention span.',
      burdenInRegion: '520 primary & secondary schools located within 100m of NH-44, NH-1A & KKH.'
    },
    {
      endpoint: 'Severe Annoyance & Tinnitus',
      whoRelativeRisk: 'Dose-response curve above 53 dB Lden',
      mechanism: 'Sensory acoustic overload inducing emotional distress, irritability, and inner ear hair cell fatigue.',
      burdenInRegion: 'High prevalence reported in dense urban cores of Srinagar, Jammu and Muzaffarabad.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Heading
        label="KEW · NOISE POLLUTION / SECTION C · EXPOSURE & ECOLOGICAL IMPACTS"
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
          { label: 'Human Health & Exposure' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-amber-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                EXPOSURE SECTOR 02
              </span>
              <span>Health &amp; Sleep Disruption</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
              Cardiovascular Morbidity, Sleep Deprivation &amp; Cognitive Stress
            </span>
          </>
        }
        subtitle="Epidemiological modeling of environmental noise exposure across 42 Himalayan districts. Calibrated with WHO 2018 Environmental Noise Guidelines evaluating ischemic heart disease risk, nocturnal sleep awakenings, and classroom learning deficits."
        icon={<HeartPulse className="w-6 h-6 text-amber-400" />}
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
              href="/environmental-monitoring/noise-pollution/wildlife-acoustics"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Wildlife Acoustics</span>
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
                High Exposure Population
              </span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              ~1.84M <span className="text-sm font-normal text-slate-400">Residents</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Exposed daily to &gt;65 dB(A)
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              340,000 exposed to severe &gt;70 dB(A)
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Chronic Sleep Disturbance
              </span>
              <Moon className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-purple-400">
              410,000 <span className="text-sm font-normal text-slate-400">Adults</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Night Lnight &gt; 50 dB(A) exposure
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              WHO safe limit: 45 dB Lnight
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                IHD Cardiac Risk
              </span>
              <HeartPulse className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400">
              +8% <span className="text-sm font-normal text-slate-400">per 10 dB</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Relative risk of ischemic heart disease
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              WHO 2018 Environmental Guidelines
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Impacted Schools
              </span>
              <Brain className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-4xl font-black text-cyan-400">
              520 <span className="text-sm font-normal text-slate-400">Schools</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              Within 100m arterial transit buffer
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-white/5">
              Classroom speech intelligibility degraded
            </div>
          </Card>
        </div>

        {/* ── HEALTH RISK TIERS MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Exposure Classification
              </span>
              <h3 className="text-xl font-bold text-white">Epidemiological Risk Tiers &amp; Exposed Cohorts</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Calibrated against WHO 2018 environmental health criteria
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HEALTH_RISK_TIERS.map((tier) => (
              <Card key={tier.tier} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-white">{tier.tier}</h4>
                  <span className="text-xs font-mono font-bold text-amber-400">{tier.decibelRange}</span>
                </div>
                <div className="p-2 rounded-[6px] bg-slate-950 font-mono text-xs font-bold text-cyan-300 border border-white/5">
                  {tier.exposedPop}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tier.primarySymptoms}</p>
                <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
                  {tier.whoStatus}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ── EPIDEMIOLOGICAL EVIDENCE MATRIX ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
                Clinical Evidence
              </span>
              <h3 className="text-xl font-bold text-white">Specific Health Morbidity Endpoints</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Validated clinical dose-response associations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EPIDEMIOLOGICAL_INDICATORS.map((ep) => (
              <Card key={ep.endpoint} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-white">{ep.endpoint}</h4>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    {ep.whoRelativeRisk}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{ep.mechanism}</p>
                <div className="p-2.5 rounded-[6px] bg-slate-950 font-mono text-xs text-amber-400 border border-white/5">
                  <strong className="text-slate-400">Regional Impact:</strong> {ep.burdenInRegion}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
