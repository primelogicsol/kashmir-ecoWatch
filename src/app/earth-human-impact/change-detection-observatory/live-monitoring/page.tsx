'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Cloud,
  Eye,
  Globe2,
  Layers,
  Radar,
  RefreshCw,
  Satellite,
  Server
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function LiveMonitoringPipelinePage() {
  const sensorStatus = [
    { sensor: 'Sentinel-2A (MSI 10m Optical)', orbitPass: 'Every 10 days', lastIngest: '2026-05-24 05:38 UTC', cloudCover: '4.2%', pipelineState: 'Nominal / Processed', currentTile: 'T43SCT (Central Kashmir)' },
    { sensor: 'Sentinel-2B (MSI 10m Optical)', orbitPass: 'Every 10 days (5d constellation)', lastIngest: '2026-05-19 05:37 UTC', cloudCover: '11.8%', pipelineState: 'Nominal / Processed', currentTile: 'T43SDT (Eastern Range)' },
    { sensor: 'Sentinel-1A (C-Band SAR Radar)', orbitPass: 'Every 6 days', lastIngest: '2026-05-25 00:42 UTC', cloudCover: 'All-Weather (0%)', pipelineState: 'Coherence Map Generated', currentTile: 'Path 062 / Frame 0482' },
    { sensor: 'Landsat-9 OLI/TIRS (30m & Thermal)', orbitPass: 'Every 16 days', lastIngest: '2026-05-16 05:22 UTC', cloudCover: '2.1%', pipelineState: 'LST Composite Calibrated', currentTile: 'Path 149 / Row 037' },
    { sensor: 'PlanetScope Constellation (3m)', orbitPass: 'Daily sampling', lastIngest: '2026-05-25 06:15 UTC', cloudCover: '5.4%', pipelineState: 'Cadastral Super-Resolution Active', currentTile: 'Pampore & Wular Target Blocks' },
  ];

  const activeProcessingJobs = [
    { id: 'JOB-2026-8812', targetArea: 'Pampore Saffron Karewa Plateau', algorithm: 'Red-Edge Phenological Variance vs BSI', status: 'Generating Candidate Polygons', eta: '4 mins' },
    { id: 'JOB-2026-8813', targetArea: 'Wular Northern Littoral Zone', algorithm: 'Sentinel-1 InSAR Coherence & MNDWI Water Mask', status: 'Screening Seasonal Flood Water Level', eta: '8 mins' },
    { id: 'JOB-2026-8814', targetArea: 'Pir Panjal Wildlife Corridor Block 4', algorithm: 'Continuous Change Detection (CCDC) Canopy Anomaly', status: 'Verifying Cloud Fringe Shadow Mask', eta: '12 mins' },
    { id: 'JOB-2026-8815', targetArea: 'Doodhganga Stream Basin', algorithm: 'PlanetScope 3m BSI Stream Incision Profiling', status: 'Comparing Leased Quarry Vector Boundaries', eta: '15 mins' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Orbital Telemetry Stream • Live Constellation Feeds"
        breadcrumbs={[
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Earth & Human Impact",
    href: "/earth-human-impact"
  },
  {
    label: "Change Observatory",
    href: "/earth-human-impact/change-detection-observatory"
  },
  {
    label: "Sensor Ingestion Pipeline"
  }
]}
        icon={<Radar className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-INGEST
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Spaceborne Sensor Ingestion Pipeline
              </span>
            </div>
          </div>
        }
        subtitle="Live automated telemetry monitoring multi-sensor orbital passes, tile ingestion health, cloud-screening masks, and active processing queues."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['change-detection-observatory/live-monitoring'].tag}
            badge={EHII_HERO_CONFIGS['change-detection-observatory/live-monitoring'].badge}
            items={EHII_HERO_CONFIGS['change-detection-observatory/live-monitoring'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Globe2 className="w-4 h-4 mr-1.5" />
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Observatory Core
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['change-detection-observatory/live-monitoring'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Scientific Clarification Notice */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/30 flex items-start gap-3">
          <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-teal-300 font-semibold block mb-0.5">Orbital Cadence Clarification:</strong>
            Live monitoring means a continuously maintained automated processing pipeline, not instantaneous streaming satellite coverage. Constellation pass intervals range from 5 days (Sentinel-2A/B tandem) to 6 days (Sentinel-1 SAR) and 16 days (Landsat-9). Processing times include atmospheric screening, topographic normalization, and multi-pass anomaly confirmation.
          </div>
        </div>

        {/* Constellation Telemetry Table */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Satellite Constellation Ingestion Feeds</h2>
              <p className="text-xs text-slate-400">Orbital sensor status, last scene pass, and atmospheric screening state.</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All 5 Feeds Operational
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Orbital Platform & Sensor</th>
                  <th className="py-2.5 px-3">Constellation Cadence</th>
                  <th className="py-2.5 px-3">Latest Ingest Timestamp</th>
                  <th className="py-2.5 px-3">Cloud Screen</th>
                  <th className="py-2.5 px-3">Current Processing Tile</th>
                  <th className="py-2.5 px-3">Pipeline Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {sensorStatus.map((s) => (
                  <tr key={s.sensor} className="hover:bg-white/5">
                    <td className="py-3 px-3 font-semibold text-white font-sans">{s.sensor}</td>
                    <td className="py-3 px-3 text-slate-400">{s.orbitPass}</td>
                    <td className="py-3 px-3 text-teal-400 font-bold">{s.lastIngest}</td>
                    <td className="py-3 px-3 text-slate-300">{s.cloudCover}</td>
                    <td className="py-3 px-3 text-slate-400">{s.currentTile}</td>
                    <td className="py-3 px-3 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {s.pipelineState}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Active Automated Processing Queue */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Active Change Detection Jobs</h3>
              <p className="text-xs text-slate-400">Automated jobs executing across Google Earth Engine & PostGIS worker clusters.</p>
            </div>
            <span className="text-xs font-mono text-slate-400">4 Active Workers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProcessingJobs.map((job) => (
              <div key={job.id} className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400">{job.id}</span>
                  <span className="text-[10px] text-slate-500 font-mono">ETA: {job.eta}</span>
                </div>
                <div className="text-sm font-bold text-white">{job.targetArea}</div>
                <div className="text-xs text-slate-400 font-mono">Algorithm: {job.algorithm}</div>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                    {job.status}
                  </span>
                  <span className="text-[10px] text-teal-400">Step 4/8</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
