'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { SectoralImpactMap } from '@/components/sectoral-eia/SectoralImpactMap';
import { 
  SECTOR_DEFINITIONS, 
  ASSESSMENT_WORKFLOW_STEPS, 
  REGULATORY_CAPABILITIES, 
  SHARED_ASSESSMENT_DATABASE,
  CUMULATIVE_IMPACT_HOTSPOTS 
} from '@/data/sectoral-eia';
import { 
  Activity, 
  Layers, 
  Compass, 
  TreePine, 
  Hammer, 
  Wheat, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  FileText, 
  Scale, 
  MapPin, 
  HelpCircle,
  BarChart3,
  ExternalLink,
  PlusCircle,
  Network
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SectoralEiaHomePage() {
  const [selectedSector, setSelectedSector] = useState<'all' | 'tourism' | 'horticulture' | 'handicrafts' | 'agriculture'>('all');
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  const heroSectors = [
    {
      id: 'tourism',
      src: '/images/protected-network.png',
      title: 'Tourism Carrying Capacity & Visitor Stress',
      metrics: '3.4M Footfall / Yr',
      status: 'High Peak Stress',
      location: 'Gulmarg, Pahalgam & Sonamarg',
      short: 'Tourism',
      desc: 'Subalpine meadow compaction, solid waste generation, and high-altitude sewage outfalls.'
    },
    {
      id: 'horticulture',
      src: '/images/bear.png',
      title: 'Horticulture & Agrochemical Leaching',
      metrics: '8,200 MT Fungicide / Yr',
      status: 'Groundwater Alert',
      location: 'Sopore, Shopian & Baramulla Orchards',
      short: 'Horticulture',
      desc: 'Mancozeb & synthetic pyrethroid accumulation in Karewa aquifer recharge catchments.'
    },
    {
      id: 'handicrafts',
      src: '/images/tiger.png',
      title: 'Handicrafts, Dye Wash & Chemical Exposure',
      metrics: 'Structured Sampling Active',
      status: 'Artisanal Stewardship',
      location: 'Downtown Srinagar & Zadibal Hub',
      short: 'Handicrafts',
      desc: 'Mass-balance flow metering distinguishing residential sewage from artisanal dye effluents.'
    },
    {
      id: 'agriculture',
      src: '/images/markhor.png',
      title: 'Agriculture, Nutrient Leaching & Soil Health',
      metrics: '142 kg/ha NPK Input',
      status: 'Eutrophication Risk',
      location: 'Floodplain Paddy Belts & Anantnag',
      short: 'Agriculture',
      desc: 'Nitrogen & phosphorus runoff triggering seasonal macrophyte choking in Wular & Dal lakes.'
    },
  ];
  const currentHero = heroSectors[activeHeroIdx];

  const heroShowcaseCard = (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            SEIAE Sector Baseline
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
          {currentHero.metrics}
        </span>
      </div>

      {/* Main Image Frame */}
      <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden border border-white/10 group mb-3">
        <img
          key={currentHero.id}
          src={currentHero.src}
          alt={currentHero.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {currentHero.status}
            </span>
            <span className="text-[10px] text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {currentHero.location}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white drop-shadow-md leading-tight">
            {currentHero.title}
          </h4>
          <p className="text-[10px] text-slate-300 line-clamp-2 mt-0.5">
            {currentHero.desc}
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-white/10">
        {heroSectors.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveHeroIdx(idx)}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all text-left cursor-pointer ${
              activeHeroIdx === idx
                ? 'bg-emerald-500/20 border-emerald-500/60 shadow-sm'
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="h-9 w-full rounded overflow-hidden relative">
              <img src={item.src} alt={item.short} className="w-full h-full object-cover" />
            </div>
            <span
              className={`text-[9px] font-bold break-words w-full text-center ${
                activeHeroIdx === idx ? 'text-emerald-300' : 'text-slate-400'
              }`}
            >
              {item.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const filteredAssessments = selectedSector === 'all'
    ? SHARED_ASSESSMENT_DATABASE
    : SHARED_ASSESSMENT_DATABASE.filter(a => a.sector === selectedSector);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      {/* Module Heading */}
      <Heading
        label="Cross-Sector Ecological Intelligence & Strategic Impact Assessment"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA Engine' }
        ]}
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Sectoral EIA &amp; Intelligence Engine (SEIAE)
              </span>
            </div>
          </div>
        }
        subtitle="Moving Kashmir EcoWatch from observing environmental change toward examining its causes, consequences, and solutions across regional landscapes, watersheds, and economic sectors."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={heroShowcaseCard}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/sectoral-eia/overview">
              <Button className="bg-emerald-600 hover:bg-emerald-500 font-semibold text-white">
                Engine Architecture
              </Button>
            </Link>
            <Link href="/sectoral-eia/methodology">
              <Button variant="outline" className="border-white/20 text-white font-medium">
                9-Step Workflow
              </Button>
            </Link>
            <Link href="/sectoral-eia/assessment/new">
              <Button variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 font-medium">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Submit Assessment
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-12">
        {/* KPI Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-slate-400 text-[11px] sm:text-xs block">Assessed Sectors</span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-1 block break-words">4 Core</span>
            <span className="text-[10px] sm:text-[11px] text-emerald-400 font-medium break-words block">Tourism, Hort, Craft, Agri</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-slate-400 text-[11px] sm:text-xs block">Active Pilots</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 block break-words">11 Pilot Sites</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 break-words block">Dal, Gulmarg, Shopian +</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-slate-400 text-[11px] sm:text-xs block">Landscape Envelope</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400 mt-1 block break-words">8,800+ km²</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 break-words block">Cross-district boundaries</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-slate-400 text-[11px] sm:text-xs block">Workflow Engine</span>
            <span className="text-xl sm:text-2xl font-bold text-amber-400 mt-1 block break-words">9 Processes</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 break-words block">Screening to Review</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-slate-400 text-[11px] sm:text-xs block">Cumulative Hotspots</span>
            <span className="text-xl sm:text-2xl font-bold text-rose-400 mt-1 block break-words">4 Hotspots</span>
            <span className="text-[10px] sm:text-[11px] text-rose-400/80 break-words block">High stress convergence</span>
          </div>
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-white/5">
            <span className="text-slate-400 text-[11px] sm:text-xs block">Mitigation Status</span>
            <span className="text-xl sm:text-2xl font-bold text-lime-400 mt-1 block break-words">6 Verified</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 break-words block">Active tracked actions</span>
          </div>
        </div>

        {/* SECTION 1: PROPOSED ENGINE ARCHITECTURE */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 border border-white/10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                  Section 1
                </Badge>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Conceptual Architecture
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Engine Architecture & Intelligence Pipeline
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                A conventional Environmental Impact Assessment (EIA) evaluates a particular proposed project. 
                Kashmir EcoWatch’s <span className="text-emerald-400 font-semibold">Sectoral EIA Engine</span> examines sector-wide and cumulative environmental impacts across landscapes, watersheds, districts, and regions.
              </p>
            </div>
            <Link href="/sectoral-eia/overview">
              <Button variant="outline" className="border-white/20 text-xs text-white shrink-0">
                Detailed Architecture <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Hierarchical Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Level 1: Platform Base */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Foundation</span>
                <h3 className="text-base font-bold text-white mt-1 mb-2">Kashmir EcoWatch</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Existing environmental monitoring, hydrological telemetry, satellite layers, and biodiversity intelligence infrastructure.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-400">
                <Database className="w-3.5 h-3.5" />
                <span>Continuous Data Feed</span>
              </div>
            </div>

            {/* Level 2: SEIAE Core */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Analytical Core</span>
                <h3 className="text-base font-bold text-emerald-200 mt-1 mb-2">SECTORAL EIA ENGINE</h3>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Environmental screening</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Baseline intelligence</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Impact & causal modeling</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Cumulative effects & mitigation</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-300">
                <Activity className="w-3.5 h-3.5" />
                <span>9 Connected Processes</span>
              </div>
            </div>

            {/* Level 3: The 4 Sectors */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Sectors</span>
                <h3 className="text-base font-bold text-white mt-1 mb-2">4 Key Economic Sectors</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    <span className="font-semibold">Tourism:</span> Destination & visitor pressure
                  </div>
                  <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                    <span className="font-semibold">Handicrafts:</span> Production & lifecycle impact
                  </div>
                  <div className="p-1.5 rounded bg-lime-500/10 border border-lime-500/20 text-lime-300">
                    <span className="font-semibold">Agriculture:</span> Soil, water, chemical inputs
                  </div>
                  <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <span className="font-semibold">Horticulture:</span> Orchards & climate resilience
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-slate-400">
                <Layers className="w-3.5 h-3.5" />
                <span>Shared Assessment DB</span>
              </div>
            </div>

            {/* Level 4: Scientific Outputs */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Deliverables</span>
                <h3 className="text-base font-bold text-white mt-1 mb-2">Scientific Outputs</h3>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sector scorecards</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>GIS impact maps & atlas</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cumulative impact analysis</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Future risk scenarios (2030-35)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Verified mitigation ledgers</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-teal-300">
                <FileText className="w-3.5 h-3.5" />
                <span>Peer-Reviewed Dossiers</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4 CALLOUT: ESSENTIAL REGULATORY DISTINCTION */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-blue-400/40 text-blue-300 bg-blue-500/10 text-xs">
                  Section 4 • Crucial Regulatory Distinction
                </Badge>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  India EIA Notification 2006 vs Strategic Environmental Assessment (SEA)
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Statutory Project Clearance vs Independent Cross-Sector Intelligence
              </h3>
              <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
                India’s Environmental Impact Assessment framework under the <span className="text-white font-semibold">EIA Notification, 2006 (as amended)</span> governs statutory environmental clearances for specified commercial projects. 
                It should <span className="text-amber-300 font-semibold">not be confused</span> with an independent platform’s sector-wide analysis. 
                At the sectoral and landscape scale, the internationally recognized concept of <span className="text-emerald-400 font-semibold">Strategic Environmental Assessment (SEA)</span> evaluates policies, plans, and cumulative effects across entire regions.
              </p>
            </div>
            <Link href="/sectoral-eia/overview#regulatory" className="shrink-0">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs">
                Examine SEA Framework <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            {REGULATORY_CAPABILITIES.map((cap) => (
              <div key={cap.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{cap.badge}</span>
                <h4 className="text-sm font-bold text-white mt-1 mb-1">{cap.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{cap.subtitle}</p>
                <ul className="text-[11px] text-slate-300 space-y-1.5">
                  {cap.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: THE FOUR SECTOR-SPECIFIC EIA ENGINES */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className="border-white/20 text-slate-300 text-xs">
                  Section 3
                </Badge>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Dedicated Sector Modules
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                The Four Sector-Specific EIA Engines
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Piloting carrying-capacity, lifecycle footprint, and agrochemical loading models across the Western Himalayas.
              </p>
            </div>
            <div className="flex flex-col xs:flex-row xs:items-center gap-1.5 sm:gap-2 max-w-full">
              <span className="text-xs text-slate-400 shrink-0">Filter pilots:</span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-white/10 text-xs overflow-x-auto scrollbar-none max-w-full">
                {(['all', 'tourism', 'horticulture', 'handicrafts', 'agriculture'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSector(s)}
                    className={`px-2.5 py-1 rounded-md capitalize font-medium transition-all whitespace-nowrap shrink-0 ${
                      selectedSector === s
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.values(SECTOR_DEFINITIONS).map((def) => {
              const Icon = def.id === 'tourism' ? Compass : def.id === 'horticulture' ? TreePine : def.id === 'handicrafts' ? Hammer : Wheat;
              return (
                <div
                  key={def.id}
                  className={`p-5 rounded-2xl bg-gradient-to-b ${def.bgGradient} border border-white/10 hover:${def.borderHoverColor} transition-all duration-300 flex flex-col justify-between group shadow-lg`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${def.accentColor}`} />
                      </div>
                      <Badge variant="outline" className="border-white/10 text-[10px] text-slate-300">
                        {def.pilotCount} Pilots Active
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {def.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 break-words">
                      {def.tagline}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                        Core Pressures Analyzed:
                      </span>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {def.keyPressures.slice(0, 3).map((kp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                            <span className="text-slate-500 font-bold shrink-0">•</span>
                            <span className="break-words">{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Avg Integrity</span>
                      <span className="text-sm font-bold text-white">{def.averageScore} / 100</span>
                    </div>
                    <Link
                      href={`/sectoral-eia/sectors/${def.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      <span>Explore Engine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: THE 9-STEP ASSESSMENT WORKFLOW */}
        <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs">
                  Section 2
                </Badge>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Standard Operating Procedure
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                The 9 Connected Assessment Processes
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Crucial design principle: each assessment must possess an unambiguous geographic boundary, time period, baseline, scientific method, and evidence record. Without these, a numerical EIA score has little scientific meaning.
              </p>
            </div>
            <Link href="/sectoral-eia/methodology">
              <Button variant="outline" className="border-white/20 text-xs text-white shrink-0">
                Methodology Guide <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ASSESSMENT_WORKFLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-xl bg-slate-950/70 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                      Step {step.step}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium break-words">
                      {step.deliverable}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{step.name}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.functionSummary}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px] text-slate-400">
                  {step.details}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GIS IMPACT ATLAS PREVIEW */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-white/20 text-slate-300 text-xs">
                  Spatial Intelligence
                </Badge>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  GIS Impact Atlas
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">Interactive Sector Impact Map</h2>
              <p className="text-xs text-slate-400">
                Spatial boundaries, sensor stations, carrying-capacity envelopes, and cumulative stress hotspots.
              </p>
            </div>
            <Link href="/sectoral-eia/impact-atlas">
              <Button variant="outline" className="border-white/20 text-xs text-white">
                Open Fullscreen Atlas <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <SectoralImpactMap className="h-[460px]" />
        </div>

        {/* RECENT ASSESSMENTS SHOWCASE */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Active Assessment Dossiers ({filteredAssessments.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Peer-reviewed pilot assessments and verified enterprise submissions across Kashmir.
              </p>
            </div>
            <Link
              href="/sectoral-eia/reports"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View all scientific reports</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssessments.map((record) => (
              <Card
                key={record.id}
                className="p-5 bg-slate-900/80 border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-300 px-2 py-0.5 rounded bg-slate-800 border border-white/10">
                        {record.code}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          record.sector === 'tourism'
                            ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                            : record.sector === 'horticulture'
                            ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                            : record.sector === 'handicrafts'
                            ? 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10'
                            : 'border-lime-500/40 text-lime-300 bg-lime-500/10'
                        }
                      >
                        {record.sector.toUpperCase()}
                      </Badge>
                    </div>

                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        record.impactSignificance === 'Severe'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {record.impactSignificance} Impact
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    <Link
                      href={`/sectoral-eia/assessment/${record.id}`}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {record.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed break-words">
                    {record.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-lg border border-white/5 mb-3">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Geographic Boundary:</span>
                      <span className="font-semibold text-slate-200 break-words block">
                        {record.geographicBoundary.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Temporal Baseline:</span>
                      <span className="font-semibold text-slate-200 break-words block">
                        {record.baseline.baselineYear}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Score:</span>
                    <span className="font-bold text-white text-sm">{record.overallScore}/100</span>
                    <span className="text-[10px] text-slate-400">
                      ({record.publicationStatus})
                    </span>
                  </div>

                  <Link
                    href={`/sectoral-eia/assessment/${record.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CRITICAL DESIGN QUESTION: DUAL INGESTION MODEL CALLOUT */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                  Critical Architectural Design Model
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Dual Ingestion: Independent Scientific Monitoring & Enterprise Assessment Submissions
              </h3>
              <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
                The Sectoral EIA Engine operates as an authoritative <span className="text-white font-semibold">independent scientific monitoring platform</span> while also providing a rigorous <span className="text-emerald-300 font-semibold">Self-Assessment & Peer-Review Portal</span>. 
                Hotels, orchard cooperatives, craft manufacturers, and government departments can register assessment boundaries, upload baseline data, and request independent scientific verification by Kashmir EcoWatch panels.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/sectoral-eia/assessment/new">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Submit New Assessment
                </Button>
              </Link>
              <Link href="/sectoral-eia/overview">
                <Button variant="outline" className="border-white/20 text-white font-medium">
                  Review Submission Protocols
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
