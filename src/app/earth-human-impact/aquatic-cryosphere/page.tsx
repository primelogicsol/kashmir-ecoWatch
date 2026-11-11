import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Droplets,
  Globe2,
  Layers,
  Mountain,
  Satellite,
  Scale,
  ShieldCheck,
  TrendingDown,
  Waves
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { 
  AQUATIC_CRYOSPHERE_INDICATORS, 
  PILOT_OBSERVATORIES, 
  CANDIDATE_DETECTION_PIPELINE_STEPS,
  RECENT_AQUATIC_CANDIDATE_ALERTS,
  HIMALAYAN_LOSS_RECOVERY_LEDGER 
} from '@/data/aquatic-cryosphere-observatory';

export const metadata: Metadata = {
  title: 'Aquatic, Wetland & Cryosphere Change Observatory | Earth & Human Impact | Kashmir EcoWatch',
  description: 'Scientific change-detection intelligence for Kashmir lakes, Ramsar wetlands, glaciers, river corridors, and springshed aquifers.',
};

export default function AquaticCryosphereOverviewPage() {
  const systems = [
    {
      num: '01',
      title: 'Lake Encroachment & Shoreline Change',
      desc: 'Detect land filling, built-up expansion, shoreline modification, aquatic vegetation change, open-water loss, and sedimentation.',
      priority: 'Dal, Nigeen, Wular, Anchar, Manasbal',
      href: '/earth-human-impact/aquatic-cryosphere/lake-encroachment',
      tag: 'Critical Alert',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      num: '02',
      title: 'Wetland Encroachment & Habitat Loss',
      desc: 'Monitor wetland filling, construction expansion, agricultural conversion, drainage modifications, and seasonal inundation dynamics.',
      priority: 'Hokersar, Haigam, Shallabugh, Mirgund, Wular margins',
      href: '/earth-human-impact/aquatic-cryosphere/wetland-encroachment',
      tag: 'Critical Alert',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      num: '03',
      title: 'Glacier Recession & Cryosphere Change',
      desc: 'Measure glacier area, terminus retreat, snowline elevation, supraglacial debris, seasonal snow cover, and ice-mass-balance indicators.',
      priority: 'Kolahoi, Thajiwas, Harmukh-associated catchments',
      href: '/earth-human-impact/aquatic-cryosphere/glacier-recession',
      tag: 'Thermal Acceleration',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      num: '04',
      title: 'River Corridor & Channel Transformation',
      desc: 'Detect bank encroachment, floodplain construction, riverbed mining disturbance, channel migration, and altered riparian connectivity.',
      priority: 'Jhelum, Lidder, Sind, Rambiara, Veshaw',
      href: '/earth-human-impact/aquatic-cryosphere/river-corridor-change',
      tag: 'High Vigilance',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
    },
    {
      num: '05',
      title: 'Springs & Groundwater Discharge Change',
      desc: 'Track spring discharge, drying frequency, seasonal variability, recharge-zone land conversion, and aquifer excavation exposure.',
      priority: 'Community springs, Karewa aquifers, mountain springs',
      href: '/earth-human-impact/aquatic-cryosphere/springs-groundwater',
      tag: 'Field Gauged',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Aquatic Systems & Cryosphere Observatory • Ramsar Wetlands & Basins"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Aquatic & Cryosphere' }
        ]}
        icon={<Droplets className="w-6 h-6 text-cyan-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-cyan-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-HYDRO
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Aquatic, Wetland &amp; Cryosphere Change Observatory
              </span>
            </div>
          </div>
        }
        subtitle="Satellite change-detection and hydrogeological intelligence for Kashmir's freshwater systems, Ramsar wetlands, valley glaciers, river corridors, and springshed aquifers."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40 font-bold">
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger">
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 font-bold text-white shadow-md shadow-cyan-500/20">
                Loss &amp; Recovery Ledger
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      {/* Content Container */}
      <div className="page-content__inner py-8 space-y-8">
        {/* Division of Responsibility Banner */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-800/60 border border-white/5">
              <span className="font-bold text-sky-400 block mb-1 uppercase tracking-wide text-[10px]">
                Complementary Scope &bull; Water Systems Module
              </span>
              <p className="text-slate-300">
                Inventories what water resources exist, their physical and chemical baseline parameters, water quality status, and baseline ecological condition.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/40">
              <span className="font-bold text-cyan-300 block mb-1 uppercase tracking-wide text-[10px]">
                EHII System 07 &bull; Change Intelligence
              </span>
              <p className="text-slate-200">
                Quantifies how those resources are transforming, identifies anthropogenic and climatic drivers, measures multi-decadal loss/recovery rates, and issues candidate encroachment alerts.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/10">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Decadal Lake Shrinkage</div>
              <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">-18.4 ha/yr</div>
              <div className="text-[10px] text-slate-500">MNDWI calibrated</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/10">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Wetland Conversion</div>
              <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">-34.8 ha/yr</div>
              <div className="text-[10px] text-slate-500">Sentinel-1/2 multi-temporal</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/10">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Kolahoi Snout Recession</div>
              <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5">-16.2 m/yr</div>
              <div className="text-[10px] text-slate-500">dGPS & geodetic audit</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-white/10">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Spring Yield Reduction</div>
              <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">-31.4%</div>
              <div className="text-[10px] text-slate-500">180 monitored springs</div>
            </div>
          </div>

        {/* Section 1: Five Dedicated Change-Detection Systems */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Five Dedicated Change-Detection Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Domain-specific satellite and field algorithms monitoring freshwater transition across the Western Himalayas.
              </p>
            </div>
            <Link
              href="/earth-human-impact/aquatic-cryosphere/watershed-cumulative-impact"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium shrink-0"
            >
              <span>View Watershed Cumulative Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systems.map((s) => (
              <div
                key={s.num}
                className="p-5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-cyan-400 text-xs font-bold tracking-wider">{s.num}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${s.tagColor}`}>
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                    <span className="text-slate-500 font-medium">Priority Focus: </span>
                    <span className="text-slate-300 font-medium">{s.priority}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-white font-semibold transition-colors"
                  >
                    <span>Launch Dedicated Observatory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Sixth Card: Permanent Loss & Recovery Ledger */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-slate-900/90 border border-cyan-500/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-teal-400 text-xs font-bold tracking-wider">HISTORICAL</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold border bg-teal-500/20 text-teal-300 border-teal-500/30">
                    1985–2026 Archive
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Environmental Loss & Recovery Ledger
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Permanent historical balance sheet tracking gross loss, active ecological recovery, and net ecosystem balance with auditable satellite evidence.
                </p>
                <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="text-slate-500 font-medium">Coverage: </span>
                  <span className="text-slate-300 font-medium">Lakes, Wetlands, Glaciers, Rivers & Karewa</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <Link
                  href="/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger"
                  className="inline-flex items-center gap-1 text-xs text-teal-300 hover:text-white font-semibold transition-colors"
                >
                  <span>Open Loss & Recovery Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Four Connected Pilot Observatories */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              Four Connected Pilot Observatories
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Multi-decadal baseline analysis tracking specific high-vulnerability hydrologic basins across Kashmir.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PILOT_OBSERVATORIES.map((pilot) => (
              <div 
                key={pilot.id} 
                className="p-5 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white">{pilot.pilotName}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                      {pilot.location}
                    </span>
                  </div>

                  {/* Focal Systems Tags */}
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {pilot.focalSystems.map((fs) => (
                      <span key={fs} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20">
                        {fs}
                      </span>
                    ))}
                  </div>

                  {/* Epoch Summary Table */}
                  <div className="my-3 overflow-x-auto">
                    <table className="w-full text-[11px] text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400">
                          <th className="py-1 pr-2">Epoch</th>
                          <th className="py-1 px-2">Primary Metric</th>
                          <th className="py-1 pl-2">Key Observation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {pilot.monitoringEpochs.map((epoch) => (
                          <tr key={epoch.year} className="text-slate-300">
                            <td className="py-1.5 pr-2 font-mono text-cyan-400 font-bold whitespace-nowrap">{epoch.year}</td>
                            <td className="py-1.5 px-2 font-mono whitespace-nowrap text-white">
                              {epoch.openWaterHa ? `${epoch.openWaterHa.toLocaleString()} ha` : ''}
                              {epoch.glacierAreaKm2 ? `${epoch.glacierAreaKm2} km²` : ''}
                              {epoch.riverWidthAvgMeters ? `${epoch.riverWidthAvgMeters} m avg` : ''}
                            </td>
                            <td className="py-1.5 pl-2 text-slate-300 text-[10px] leading-tight break-words max-w-[200px] sm:max-w-none">
                              {epoch.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Core Findings List */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    {pilot.keyFindings.slice(0, 2).map((kf, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{kf}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Audit: <span className="text-slate-200">{pilot.fieldValidationMethod.slice(0, 45)}...</span>
                  </span>
                  <Link
                    href={`/earth-human-impact/change-detection-observatory/historical-comparison`}
                    className="text-cyan-400 hover:text-white font-medium flex items-center gap-1"
                  >
                    <span>View GIS Polygons</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Scientific Candidate Alert & Verification Pipeline */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950 border border-white/10">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Scientific Rigor & Verification Protocol</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Six-Stage Candidate Change Detection Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Addressing remote sensing ambiguities: Satellite spectral anomalies are treated as candidate alerts. 
              Suspected encroachments are classified only after applying the Ramsar seasonal water drawdown filter, 
              cadastral revenue alignment, and in-situ field validation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CANDIDATE_DETECTION_PIPELINE_STEPS.map((step) => (
              <div key={step.step} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">STAGE {step.step}</span>
                  <span className="text-[10px] text-slate-400 font-mono break-words">{step.sensor}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">{step.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{step.action}</p>
              </div>
            ))}
          </div>

          {/* Active Candidate Alerts in Pipeline */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Active Candidate Change Alerts Under Investigation
            </h3>

            <div className="space-y-3">
              {RECENT_AQUATIC_CANDIDATE_ALERTS.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-cyan-400 font-semibold">{alert.id}</span>
                      <span className="font-bold text-white">{alert.targetWaterbody}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300">{alert.district}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {alert.auditVerdict}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-snug">{alert.summary}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-slate-400 font-mono">
                      <span>Area: <strong className="text-white">{alert.candidateChangeAreaHa} ha</strong></span>
                      <span>Sensor: {alert.sensorSource}</span>
                      <span>Field Status: <strong className="text-teal-400">{alert.groundTruthingStatus}</strong></span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <Link
                      href="/earth-human-impact/change-detection-observatory/verification-queue"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-cyan-300 font-medium text-xs border border-white/10 transition-colors whitespace-nowrap"
                    >
                      Audit Dossier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Comprehensive Scientific Indicator Catalog */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              Scientific Indicator Catalog (Aquatic & Cryosphere)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Standardized indicators aligned with Ramsar, NITI Aayog springshed protocols, and GLIMS glacier guidelines.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">System</th>
                  <th className="py-2.5 px-3">Primary Indicator</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3">Current Observed Rate</th>
                  <th className="py-2.5 px-3">Measurement Method</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {AQUATIC_CRYOSPHERE_INDICATORS.map((ind) => (
                  <tr key={ind.id} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-semibold text-cyan-300 whitespace-nowrap">{ind.category}</td>
                    <td className="py-3 px-3 font-medium text-white break-words max-w-[200px]">{ind.primaryIndicator}</td>
                    <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">{ind.unit}</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-300 break-words max-w-[180px]">{ind.currentObservedRate}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-400 break-words max-w-[280px] leading-relaxed">
                      {ind.observationMethod}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-white/10">
                        {ind.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: The Environmental Loss & Recovery Ledger CTA */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/40">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Permanent Historical Balance Sheet</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Himalayan Environmental Loss & Recovery Ledger (1985–2026)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Examines how many hectares of lakes, wetlands, glaciers, riverbanks, and Karewa agricultural landscapes have been lost, 
              actively restored, or shifted over 40+ years with independently auditable satellite and field records.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Full Ledger & Balances</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
