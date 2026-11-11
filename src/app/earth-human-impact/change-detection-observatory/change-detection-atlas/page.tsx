'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Crosshair,
  Download,
  Eye,
  Filter,
  Globe2,
  Layers,
  Map,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { 
  SATELLITE_CHANGE_ALERTS, 
  GEOGRAPHIC_PILOT_STUDIES, 
  DetectionCategory 
} from '@/data/change-detection-observatory';
import { cn } from '@/lib/utils';

export default function ChangeDetectionAtlasPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAlertId, setSelectedAlertId] = useState<string>(SATELLITE_CHANGE_ALERTS[0].alertId);

  const filteredAlerts = selectedCategory === 'All'
    ? SATELLITE_CHANGE_ALERTS
    : SATELLITE_CHANGE_ALERTS.filter(a => a.category === selectedCategory);

  const activeAlert = SATELLITE_CHANGE_ALERTS.find(a => a.alertId === selectedAlertId) || SATELLITE_CHANGE_ALERTS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Spatial Cartography • Multi-Spectral Transformation"
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
    label: "Change Detection Atlas"
  }
]}
        icon={<Map className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-ATLAS
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Interactive Change Detection Atlas
              </span>
            </div>
          </div>
        }
        subtitle="Spaceborne cartographic atlas tracking multi-spectral reflectance changes, bare soil anomalies, and vegetative stress polygons across Kashmir."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['change-detection-observatory/change-detection-atlas'].tag}
            badge={EHII_HERO_CONFIGS['change-detection-observatory/change-detection-atlas'].badge}
            items={EHII_HERO_CONFIGS['change-detection-observatory/change-detection-atlas'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['change-detection-observatory/change-detection-atlas'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Filter className="w-4 h-4 text-teal-400" />
            Filter Vector Layer by Category:
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'paddy_conversion', 'wetland_encroachment', 'forest_loss', 'mining_quarrying'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                )}
              >
                {cat === 'All' ? 'All Disturbances' : cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Map Viewport & Detail Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container Viewport */}
          <div className="lg:col-span-2 bg-slate-900/90 border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[500px] relative overflow-hidden">
            {/* Top Bar inside Viewport */}
            <div className="flex items-center justify-between z-10">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-950/80 text-teal-300 border border-teal-500/30 flex items-center gap-1.5 backdrop-blur-sm">
                <Satellite className="w-3.5 h-3.5" />
                Sentinel-2A/B (10m) True-Color Basemap Active
              </span>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-slate-400 border border-white/10">
                Extent: 33.5°N–34.8°N / 74.2°E–75.5°E
              </span>
            </div>

            {/* Stylized Spatial Map Canvas with Coordinate Grid */}
            <div className="my-auto py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 mx-auto flex items-center justify-center text-teal-400 animate-pulse">
                <Crosshair className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <div className="text-sm font-bold text-white">Spatial Telemetry Projection Active</div>
                <p className="text-xs text-slate-400 mt-1">
                  Target Vector: <strong className="text-teal-300">{activeAlert.locationName}</strong> ({activeAlert.coordinates.lat}°N, {activeAlert.coordinates.lng}°E).
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                  {GEOGRAPHIC_PILOT_STUDIES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        const match = SATELLITE_CHANGE_ALERTS.find(a => a.pilotRegionId === p.id);
                        if (match) setSelectedAlertId(match.alertId);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-white/10 transition-colors"
                    >
                      {p.district}: {p.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Viewport Bottom Controls */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 z-10 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                Active Alert: {activeAlert.alertId} • Area: {activeAlert.affectedAreaHectares} ha
              </span>
              <button 
                onClick={() => alert(`Downloading PostGIS GeoJSON vector polygon for ${activeAlert.alertId}...`)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Export GeoJSON Vector
              </button>
            </div>
          </div>

          {/* Alert Details Sidebar */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                  activeAlert.tier === 'Tier 2: Scientifically Verified Finding'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                )}>
                  {activeAlert.tier}
                </span>
                <span className="text-xs font-mono text-slate-500">{activeAlert.alertId}</span>
              </div>

              <h2 className="text-lg font-bold text-white mb-2">{activeAlert.title}</h2>
              <div className="text-xs text-teal-400 font-mono mb-4">
                {activeAlert.locationName} • {activeAlert.district}
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Measured Disturbance:</span>
                    <span className="font-mono font-bold text-white">{activeAlert.affectedAreaHectares} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confidence Score:</span>
                    <span className="font-mono font-bold text-emerald-400">{activeAlert.confidenceScorePct}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uncertainty Margin:</span>
                    <span className="font-mono text-slate-300">{activeAlert.uncertaintyMargin}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Detection Sensor:</span>
                  <span className="font-mono text-slate-200">{activeAlert.satelliteSensor}</span>
                </div>

                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Physical Change Description:</span>
                  <p className="text-slate-300 leading-relaxed">{activeAlert.candidateChangeDescription}</p>
                </div>

                {activeAlert.scientificReviewNotes && (
                  <div className="p-3 rounded-lg bg-teal-950/20 border border-teal-500/20">
                    <span className="text-teal-400 font-bold block mb-1">Scientific Review Findings:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{activeAlert.scientificReviewNotes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2">
              <Link
                href={`/earth-human-impact/change-detection-observatory/verification-queue?alert=${activeAlert.alertId}`}
                className="w-full text-center block py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Inspect in Verification Queue &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Vector Catalog Selector List */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-3">Disturbance Vector Catalog</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredAlerts.map((a) => (
              <button
                key={a.alertId}
                onClick={() => setSelectedAlertId(a.alertId)}
                className={cn(
                  'p-3.5 rounded-xl border text-left transition-all',
                  selectedAlertId === a.alertId
                    ? 'bg-teal-500/10 border-teal-500 text-white shadow-sm'
                    : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-slate-950'
                )}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-white break-words">{a.locationName}</span>
                  <span className="font-mono text-teal-400 text-[10px] shrink-0 ml-2">{a.affectedAreaHectares} ha</span>
                </div>
                <div className="text-[11px] text-slate-400 break-words">{a.title}</div>
                <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                  <span>{a.district}</span>
                  <span className={a.status === 'Verified' ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                    {a.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
