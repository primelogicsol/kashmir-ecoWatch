'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Globe2,
  Layers,
  Mountain,
  Satellite,
  Shovel,
  Trees,
  TrendingDown
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function LandEarthSystemsSubmodulePage() {
  const landPillars = [
    {
      id: 'land-conversion',
      title: 'Paddy & Alluvial Farmland Conversion',
      metrics: '2,150 ha / year Converted | -18.2% Saffron Acreage',
      description: 'Systemic conversion of prime alluvial floodplains and Table 4.17 rice paddies into commercial real estate, highway corridors, and residential sprawl across Pulwama, Budgam, and Srinagar fringes.',
      source: 'Landsat-9 / Sentinel-2 Multi-Decadal Cadastral LULC Audits'
    },
    {
      id: 'karewa-destruction',
      title: 'Quaternary Karewa Plateau Destruction',
      metrics: '42.6 sq km Excavated Scars | 31 Plateaus Flattened',
      description: 'Mechanical strip-mining of Pleistocene lacustrine Karewa deposits (Wudur) for railway and national highway embankment fill, destroying paleoclimatic archives and saffron-bearing soils.',
      source: 'Geological Survey of India & DGM Spatial Imagery'
    },
    {
      id: 'soil-degradation',
      title: 'Soil Sealing, Compaction & Organic Carbon Depletion',
      metrics: '18.4 t/ha/yr Soil Erosion Rate | -0.42% Organic Carbon',
      description: 'Extensive topsoil removal, heavy machinery soil compaction, and brick kiln extraction removing productive A-horizon strata across central Kashmir valley floors.',
      source: 'ICAR National Bureau of Soil Survey & Land Use Planning (NBSS&LUP)'
    },
    {
      id: 'geomorphology-sediment',
      title: 'Watershed Sedimentation & Geomorphic Destabilization',
      metrics: '1.82 Million m³ / yr Sediment Influx into Jhelum System',
      description: 'Catchment deforestation combined with bare Karewa excavation accelerates sediment yields, choking downstream flood spill channels, Wular Lake, and urban drainage networks.',
      source: 'Irrigation & Flood Control Department (I&FC) Hydrographic Feeds'
    }
  ];

  const karewaZones = [
    { plateau: 'Ompora & Damodar Karewa (Budgam)', originalAreaHa: '4,200', minedAreaHa: '1,840', threatType: 'Railway fill & urban construction', status: 'Critically Degraded' },
    { plateau: 'Pampore Saffron Karewa (Pulwama)', originalAreaHa: '6,100', minedAreaHa: '720', threatType: 'Commercial encroachment & brick kilns', status: 'Severe Stress' },
    { plateau: 'Pattan & Baramulla Bluffs', originalAreaHa: '3,800', minedAreaHa: '510', threatType: 'Four-lane highway bypass excavation', status: 'High Threat' },
    { plateau: 'Khanmoh & Khrew Bluffs', originalAreaHa: '5,500', minedAreaHa: '2,150', threatType: 'Cement manufacturing limestone quarrying', status: 'Severe Industrial Stress' },
    { plateau: 'Charar-i-Sharief Terraces', originalAreaHa: '2,900', minedAreaHa: '430', threatType: 'Orchard conversion & slope shearing', status: 'Moderate Threat' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Land Systems & Karewa Observatory • Geological Defense"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Land Transformation, Karewas & Slope Dynamics' }
        ]}
        icon={<Mountain className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-LAND
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Land Transformation, Karewas & Slope Dynamics
              </span>
            </div>
          </div>
        }
        subtitle="Investigating the systematic excavation of ancient Pleistocene Karewa plateaus, fertile agricultural land loss, soil profile exhaustion, and catastrophic sedimentation dynamics across the Kashmir basin."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['land-earth-systems'].tag}
            badge={EHII_HERO_CONFIGS['land-earth-systems'].badge}
            items={EHII_HERO_CONFIGS['land-earth-systems'].showcaseItems}
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
                Observatory
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['land-earth-systems'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Paddy Land Converted</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">2,150 ha/yr</div>
            <div className="text-[11px] text-slate-500">Loss of prime food security land</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Mined Karewa Plateau Area</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">42.6 km²</div>
            <div className="text-[11px] text-slate-500">Irreversible geomorphic loss</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Topsoil Erosion Rate</div>
            <div className="text-2xl font-bold text-orange-400 mt-1">18.4 t/ha/yr</div>
            <div className="text-[11px] text-slate-500">Sediment yield escalation</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Sediment Influx to Jhelum</div>
            <div className="text-2xl font-bold text-teal-400 mt-1">1.82M m³</div>
            <div className="text-[11px] text-slate-500">Annual riverbed aggradation</div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Four Earth Systems Transformation Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {landPillars.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-400 mb-2">{p.metrics}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Audit Source:</span>
                  <span className="text-slate-400">{p.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Karewa Plateau Ledger */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Vulnerable & Excavated Karewa (Wudur) Formations</h3>
          <p className="text-xs text-slate-400 mb-4">Official monitoring of Pleistocene plateaus subject to soil mining, brick kilns, and infrastructure cuts.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Karewa Plateau Region</th>
                  <th className="py-2.5 px-3">Total Area (Ha)</th>
                  <th className="py-2.5 px-3">Mined Footprint (Ha)</th>
                  <th className="py-2.5 px-3">Primary Impact Driver</th>
                  <th className="py-2.5 px-3">Ecological Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {karewaZones.map((z) => (
                  <tr key={z.plateau} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold text-white">{z.plateau}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">{z.originalAreaHa}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">{z.minedAreaHa}</td>
                    <td className="py-2.5 px-3 text-slate-300">{z.threatType}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {z.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sectoral EIA Linkage */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Sectoral Intersection</div>
            <h4 className="text-base font-bold text-white">Coupled with Agriculture EIA & Horticulture EIA</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Paddy conversion directly drives the decline in Kashmir&apos;s 120,620 ha paddy production base documented in Agriculture EIA, while Karewa plateaus host high-density apple orchards and saffron tracts.
            </p>
          </div>
          <Link
            href="/sectoral-eia/sectors/agriculture"
            className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Review Agriculture EIA
          </Link>
        </div>
      </div>
    </div>
  );
}
