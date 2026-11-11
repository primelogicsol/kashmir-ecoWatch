'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Globe2,
  Info,
  Layers,
  Map,
  Radar,
  Satellite,
  ShieldAlert,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { 
  PRIORITY_DETECTION_CAPABILITIES, 
  PROCESSING_WORKFLOW_STEPS, 
  GEOGRAPHIC_PILOT_STUDIES, 
  SATELLITE_CHANGE_ALERTS, 
  NOTIFICATION_PROTOCOL_RULES,
  GeographicPilotStudy
} from '@/data/change-detection-observatory';
import { cn } from '@/lib/utils';

export default function ChangeDetectionObservatoryHubPage() {
  const [selectedPilot, setSelectedPilot] = useState<string>('pampore-karewa');
  const [activeCapabilityTab, setActiveCapabilityTab] = useState<string>('paddy_conversion');

  const activePilot = GEOGRAPHIC_PILOT_STUDIES.find(p => p.id === selectedPilot) || GEOGRAPHIC_PILOT_STUDIES[0];
  const activeCapability = PRIORITY_DETECTION_CAPABILITIES.find(c => c.id === activeCapabilityTab) || PRIORITY_DETECTION_CAPABILITIES[0];

  const preliminaryAlerts = SATELLITE_CHANGE_ALERTS.filter(a => a.tier === 'Tier 1: Preliminary Alert');
  const verifiedFindings = SATELLITE_CHANGE_ALERTS.filter(a => a.tier === 'Tier 2: Scientifically Verified Finding');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Spaceborne Change Detection Core • Sentinel-1/2, Landsat & PlanetScope"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Satellite Observatory' }
        ]}
        icon={<Satellite className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-SAT
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Satellite Change Detection Observatory
              </span>
            </div>
          </div>
        }
        subtitle="Operational spaceborne monitoring engine mapping anthropogenic land-cover alteration, Karewa excavation, wetland infilling, and forest loss across Jammu, Kashmir & Ladakh."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['change-detection-observatory'].tag}
            badge={EHII_HERO_CONFIGS['change-detection-observatory'].badge}
            items={EHII_HERO_CONFIGS['change-detection-observatory'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/change-detection-observatory/detection-alerts">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                Detection Alerts
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['change-detection-observatory'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-16">

        {/* SECTION 1: THE THREE GEOGRAPHIC PILOT STUDIES */}
        <section id="geographic-pilots">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                Operational Validation Benchmarks
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">First Three Geographic Pilot Studies</h2>
              <p className="text-sm md:text-base text-slate-400 mt-1 max-w-3xl">
                Multi-temporal empirical analyses tracking land-cover transformation, seasonal hydro-period shifts, and impervious soil sealing across 2015, 2020, and 2026.
              </p>
            </div>

            {/* Pilot Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {GEOGRAPHIC_PILOT_STUDIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPilot(p.id)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all',
                    selectedPilot === p.id
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  )}
                >
                  {p.title.split(' ')[0]} {p.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pilot Featured Card */}
          <div className="bg-slate-900/80 border border-teal-500/30 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-300 border border-teal-500/40 uppercase">
                  Pilot Region: {activePilot.district} District
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">{activePilot.title}</h3>
                <p className="text-xs md:text-sm text-teal-400 font-medium mt-1">{activePilot.subtitle}</p>
                <p className="text-xs text-slate-300 leading-relaxed mt-3 max-w-3xl">{activePilot.dossierSummary}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <Link
                  href={`/earth-human-impact/change-detection-observatory/historical-comparison?pilot=${activePilot.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-white/10 transition-colors whitespace-nowrap"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Compare 2015 vs 2026
                </Link>
                <Link
                  href={`/earth-human-impact/change-detection-observatory/scientific-dossiers`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Dossier ({activePilot.permanentEvidenceDossierId})
                </Link>
              </div>
            </div>

            {/* Time-Series 2015, 2020, 2026 Quantitative Progress Table */}
            <div className="overflow-x-auto pt-4 border-t border-white/10">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Multi-Temporal Land Transformation Trajectory (2015 ➔ 2020 ➔ 2026):</span>
                <span className="text-[11px] font-mono text-teal-400">Standardized BOA Surface Reflectance</span>
              </div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Benchmark Year</th>
                    <th className="py-2.5 px-3">Primary Intact System Area</th>
                    <th className="py-2.5 px-3">Transformed / Excavated Footprint</th>
                    <th className="py-2.5 px-3">Vegetative / Canopy Ratio</th>
                    <th className="py-2.5 px-3">Impervious / Excavation Ratio</th>
                    <th className="py-2.5 px-3">Net 11-Year Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {activePilot.timeSeriesMetrics.map((row) => (
                    <tr key={row.year} className="hover:bg-white/5">
                      <td className="py-3 px-3 font-bold text-white text-sm">{row.year}</td>
                      <td className="py-3 px-3 text-emerald-400">
                        <span className="font-bold">{row.primaryClassHectares.toLocaleString()} ha</span>
                        <div className="text-[10px] text-slate-500 font-sans">{row.primaryClassLabel}</div>
                      </td>
                      <td className="py-3 px-3 text-rose-400">
                        <span className="font-bold">{row.transformedHectares.toLocaleString()} ha</span>
                        <div className="text-[10px] text-slate-500 font-sans">{row.transformedLabel}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-sans">
                        <div className="flex items-center gap-2">
                          <span>{row.canopyOrVegetationCoverPct}%</span>
                          <div className="w-16 bg-slate-800 rounded-full h-1.5 hidden sm:block">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${row.canopyOrVegetationCoverPct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400">{row.imperviousOrExcavatedPct}%</span>
                          <div className="w-16 bg-slate-800 rounded-full h-1.5 hidden sm:block">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${row.imperviousOrExcavatedPct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-xs font-sans text-slate-400">
                        {row.year === 2026 ? (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                            -24.5% Net Area
                          </span>
                        ) : row.year === 2020 ? (
                          <span className="text-slate-500 text-[11px]">-13.9% Midpoint</span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Baseline Normal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Satellite Source Datasets for this Pilot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5">
              {activePilot.availableLayers.map((layer) => (
                <div key={layer.year} className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-white mb-1">
                    <span>{layer.year} Composite</span>
                    <span className="text-teal-400 font-mono text-[10px]">Cloud: {layer.cloudCoverPct}%</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{layer.sensor}</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">Acquired: {layer.acquisitionDate}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: PRIORITY DETECTION CAPABILITIES */}
        <section id="detection-capabilities">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Radar className="w-4 h-4" />
                Continuous Spaceborne Capabilities
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Eight Priority Detection Categories</h2>
              <p className="text-sm md:text-base text-slate-400 mt-1 max-w-3xl">
                Dedicated algorithms measuring physical landscape transformations without generating unsubstantiated legal claims.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Category Sidebar */}
            <div className="space-y-1.5 lg:col-span-1">
              {PRIORITY_DETECTION_CAPABILITIES.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapabilityTab(cap.id)}
                  className={cn(
                    'w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between',
                    activeCapabilityTab === cap.id
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900 border border-white/5'
                  )}
                >
                  <span className="break-words leading-tight">{cap.name}</span>
                  <ChevronRight className={cn('w-3.5 h-3.5 shrink-0', activeCapabilityTab === cap.id ? 'text-teal-400' : 'text-slate-600')} />
                </button>
              ))}
            </div>

            {/* Active Category Deep Dive */}
            <div className="lg:col-span-3 bg-slate-900/70 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
                    Detection Pipeline: {activeCapability.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{activeCapability.cadenceDescription}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{activeCapability.name}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Primary Observable Outputs
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{activeCapability.primaryOutputs}</p>
                  </div>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-white/5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block mb-1">
                      Sensor Constellation & Feeds
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{activeCapability.sensorConstellation}</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <strong className="text-slate-300 font-semibold">Spectral Indices / Wavebands:</strong>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {activeCapability.spectralIndices.map((idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[11px] text-teal-300">
                          {idx}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong className="text-amber-300 font-semibold">Scientific Uncertainty & False-Positive Mitigation:</strong>
                    <p className="text-slate-300 mt-1 leading-relaxed">{activeCapability.uncertaintyMitigation}</p>
                  </div>

                  <div>
                    <strong className="text-slate-300 font-semibold">Western Himalayan Environmental Context:</strong>
                    <p className="text-slate-400 mt-1 leading-relaxed">{activeCapability.environmentalContext}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Calibrated against Copernicus 30m DEM</span>
                <Link
                  href="/earth-human-impact/change-detection-observatory/change-detection-atlas"
                  className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                >
                  View in Change Atlas &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE 8-STEP PROCESSING WORKFLOW */}
        <section id="processing-workflow" className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              Scientific Methodology
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">The Complete 8-Step Processing Workflow</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              From raw orbital radiance ingestion to verified public dossiers: every candidate change must pass through rigorous radiometric, phenological, and peer-review validation gates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESSING_WORKFLOW_STEPS.map((step) => (
              <div 
                key={step.stepNumber}
                className="p-4 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col justify-between hover:border-teal-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center text-xs font-bold font-mono">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Step {step.stepNumber} of 8</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5">{step.stageName}</h3>
                  <p className="text-xs text-teal-300/90 font-medium mb-2">{step.objective}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{step.technicalProcedure}</p>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-1.5 text-[10px]">
                  <div>
                    <span className="text-amber-400 font-semibold block">Quality Safeguard:</span>
                    <span className="text-slate-300">{step.scientificSafeguard}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Deliverable Artifact:</span>
                    <span className="text-teal-400 font-mono">{step.outputArtifact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: THE TWO-TIER ENVIRONMENTAL ALERT SYSTEM */}
        <section id="two-tier-alerts" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tier 1 Box */}
          <div className="bg-slate-900/70 border border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Tier 1: Preliminary Satellite Alerts
                </span>
                <span className="text-xs font-mono text-slate-400">{preliminaryAlerts.length} Active in Queue</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Automated Candidate Anomaly Signals</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Generated automatically when optical or SAR algorithms detect statistically significant land alterations. Quality-screened against cloud masks and seasonal phenology, but explicitly designated as unverified candidate observations.
              </p>

              <div className="space-y-2.5 mb-4">
                {preliminaryAlerts.slice(0, 2).map((a) => (
                  <div key={a.alertId} className="p-3 bg-slate-950/80 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white">{a.title}</span>
                      <span className="text-amber-400 font-mono text-[10px]">{a.confidenceScorePct}% Conf</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{a.locationName}, {a.district} • {a.affectedAreaHectares} ha</div>
                    <div className="text-[10px] text-slate-500 mt-1 italic">Status: {a.status} • {a.uncertaintyMargin}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/earth-human-impact/change-detection-observatory/detection-alerts?tier=1"
              className="w-full text-center py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-colors"
            >
              Inspect All Preliminary Alerts
            </Link>
          </div>

          {/* Tier 2 Box */}
          <div className="bg-slate-900/70 border border-teal-500/30 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  Tier 2: Scientifically Verified Findings
                </span>
                <span className="text-xs font-mono text-slate-400">{verifiedFindings.length} Verified Dossiers</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Peer-Reviewed Evidence Records</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                A preliminary alert is elevated to a Verified Finding only after independent multi-sensor confirmation, cadastral Khasra cross-checking, specialist sign-off, and optional field inspection. Permanent DOI-style evidence records.
              </p>

              <div className="space-y-2.5 mb-4">
                {verifiedFindings.slice(0, 2).map((a) => (
                  <div key={a.alertId} className="p-3 bg-slate-950/80 rounded-xl border border-teal-500/20">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white">{a.title}</span>
                      <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified ({a.confidenceScorePct}%)
                      </span>
                    </div>
                    <div className="text-[11px] text-teal-300">{a.locationName}, {a.district} • {a.affectedAreaHectares} ha</div>
                    <div className="text-[10px] text-slate-400 mt-1">Lead Reviewer: {a.leadScientistReviewer}</div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/earth-human-impact/change-detection-observatory/detection-alerts?tier=2"
              className="w-full text-center py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Browse Verified Findings Catalog
            </Link>
          </div>
        </section>

        {/* SECTION 5: NOTIFICATION PROTOCOL DISCLOSURE */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BellRing className="w-4 h-4" />
            Automated Alert Notification Protocol
          </div>
          <h3 className="text-xl font-bold text-white mb-2">How Scientists & Regulatory Authorities Are Alerted</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-3xl">
            Addressing the strategic operational mandate: Whenever a high-confidence candidate change is detected, automated confidential alerts are dispatched immediately to registered peer reviewers and departmental nodal officers, while remaining designated as &quot;Preliminary — Candidate Change Under Review&quot; on the public portal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NOTIFICATION_PROTOCOL_RULES.map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-white/5 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{rule.triggerTier}</span>
                  <span className="font-mono text-teal-400 text-[11px]">Threshold: &ge;{rule.confidenceThresholdPct}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Recipients:</span>
                  <span className="text-slate-300">{rule.recipientGroup}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Dispatch Channel:</span>
                  <span className="text-teal-300 font-mono text-[11px]">{rule.dispatchChannel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Procedural Safeguard:</span>
                  <span className="text-slate-400 italic">{rule.proceduralSafeguard}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
