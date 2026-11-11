'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Droplets,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  Info,
  Layers,
  Map,
  MapPin,
  Mountain,
  Pickaxe,
  Radar,
  Radio,
  Satellite,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Trees,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { 
  EHII_SUBMODULES, 
  REGIONAL_EARTH_SYSTEMS_INDICATORS, 
  HUMAN_PRESSURE_INDEX_DATA, 
  CUMULATIVE_INTERACTIONS, 
  RESTORATION_TRACKER_DATA, 
  SATELLITE_OBSERVATORY_STREAMS 
} from '@/data/earth-human-impact';
import { cn } from '@/lib/utils';

export default function EarthHumanImpactHubPage() {
  const [indicatorDomainFilter, setIndicatorDomainFilter] = useState<string>('All');
  const [hpiSearch, setHpiSearch] = useState<string>('');

  const filteredIndicators = indicatorDomainFilter === 'All' 
    ? REGIONAL_EARTH_SYSTEMS_INDICATORS 
    : REGIONAL_EARTH_SYSTEMS_INDICATORS.filter(ind => ind.domain === indicatorDomainFilter);

  const filteredDistricts = HUMAN_PRESSURE_INDEX_DATA.filter(d => 
    d.districtName.toLowerCase().includes(hpiSearch.toLowerCase()) ||
    d.primaryAnthropogenicDriver.toLowerCase().includes(hpiSearch.toLowerCase())
  );

  const getSubmoduleIcon = (slug: string) => {
    switch (slug) {
      case 'climate-atmosphere': return Thermometer;
      case 'forests-landscapes': return Trees;
      case 'land-earth-systems': return Mountain;
      case 'aquatic-cryosphere': return Droplets;
      case 'energy-infrastructure': return Zap;
      case 'mining-extraction': return Pickaxe;
      case 'urban-ecology': return Building2;
      default: return Layers;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Moderate Concern': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Severe Stress': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'Critical Threshold': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getStressCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Severe': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'High': return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'Moderate': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default: return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Western Himalayan Earth Systems & Land Transformation Observatory"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact' }
        ]}
        icon={<Globe2 className="w-6 h-6 text-emerald-400" />}
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
                Earth &amp; Human Impact Intelligence (EHII)
              </span>
            </div>
          </div>
        }
        subtitle="Consolidating seven foundational environmental disciplines to measure climate anomalies, canopy loss, Karewa destruction, linear infrastructure stress, riverbed incision, urban heat dynamics, and aquatic-cryospheric retreat across the Kashmir basin."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS.hub.tag}
            badge={EHII_HERO_CONFIGS.hub.badge}
            items={EHII_HERO_CONFIGS.hub.showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md shadow-emerald-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Satellite Observatory
              </Button>
            </Link>
            <Link href="/earth-human-impact/spatial-intelligence-atlas">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold">
                <Map className="w-4 h-4 mr-1.5" />
                Spatial Impact Atlas
              </Button>
            </Link>
            <Link href="/earth-human-impact/cumulative-impact">
              <Button size="sm" variant="outline" className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-bold">
                <Activity className="w-4 h-4 mr-1.5" />
                Cumulative Matrix
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS.hub.kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation Bar */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-16">
        {/* SECTION 1: THE SEVEN SCIENTIFIC SUBMODULES */}
        <section id="submodules">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                Integrated Planetary Architecture
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Seven Scientific Intelligence Systems</h2>
              <p className="text-sm md:text-base text-slate-400 mt-1 max-w-3xl">
                Independent scientific intelligence modules measuring the cascading feedback loops between atmospheric warming, terrestrial degradation, aquatic-cryospheric retreat, industrial extraction, and human settlements.
              </p>
            </div>
            <Link
              href="/earth-human-impact/dashboards"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-white/10 transition-colors whitespace-nowrap self-start md:self-auto"
            >
              Cross-Module Analytics
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EHII_SUBMODULES.map((submod) => {
              const Icon = getSubmoduleIcon(submod.slug);
              return (
                <div 
                  key={submod.id}
                  className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-teal-950/20 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                        {submod.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-1.5">
                      {submod.title}
                    </h3>
                    <p className="text-xs font-medium text-teal-400/90 mb-3 break-words">
                      {submod.subtitle}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {submod.focusSummary}
                    </p>

                    {/* Metrics snapshot */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950/60 border border-white/5 mb-4">
                      {submod.primaryMetrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-[10px] text-slate-400 break-words leading-tight">{m.label}</div>
                          <div className={cn(
                            'text-xs font-bold mt-0.5 break-words',
                            m.trend === 'critical' ? 'text-rose-400' :
                            m.trend === 'increasing' ? 'text-amber-400' : 'text-slate-200'
                          )}>
                            {m.value}
                          </div>
                          <div className="text-[9px] text-slate-500 break-words">{m.unit}</div>
                        </div>
                      ))}
                    </div>

                    {/* Pressure Signals */}
                    <div className="space-y-1.5 mb-5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Pressures:</div>
                      {submod.keyPressureSignals.slice(0, 2).map((sig, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <span className="text-teal-400 mt-0.5">•</span>
                          <span className="break-words leading-snug">{sig}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Telemetry: {submod.monitoringTechnologies.length} Sensors
                    </span>
                    <Link
                      href={`/earth-human-impact/${submod.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Open Module
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: REGIONAL EARTH SYSTEMS DASHBOARD */}
        <section id="earth-systems-dashboard" className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Activity className="w-4 h-4" />
                Validated Scientific Metrics
              </div>
              <h2 className="text-2xl font-bold text-white">Regional Earth Systems Indicator Catalog</h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Benchmarked against official baselines (IMD Rambagh normals, FSI biennial audits, CPCB standards).
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Climate', 'Forest', 'Land', 'Energy', 'Mining', 'Urban'].map((dom) => (
                <button
                  key={dom}
                  onClick={() => setIndicatorDomainFilter(dom)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                    indicatorDomainFilter === dom
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                  )}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">System Indicator</th>
                  <th className="py-3 px-3">Domain</th>
                  <th className="py-3 px-3">Baseline Normal</th>
                  <th className="py-3 px-3">Current Value (2025-26)</th>
                  <th className="py-3 px-3">Ecological Threshold</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Evidence Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredIndicators.map((ind) => (
                  <tr key={ind.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">
                      <div>{ind.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{ind.measurementMethod}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300">
                        {ind.domain}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono">
                      <div>{ind.baselineValue}</div>
                      <div className="text-[10px] text-slate-600">{ind.baselinePeriod}</div>
                    </td>
                    <td className="py-3 px-3 font-bold text-white font-mono">{ind.currentValue}</td>
                    <td className="py-3 px-3 text-slate-400 font-mono">{ind.thresholdLimit}</td>
                    <td className="py-3 px-3">
                      <span className={cn('px-2 py-0.5 rounded border text-[10px] font-semibold whitespace-nowrap', getStatusColor(ind.status))}>
                        {ind.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 break-words">
                      {ind.evidenceSource}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SATELLITE CHANGE DETECTION OBSERVATORY */}
        <section id="satellite-observatory" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-500/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Radar className="w-4 h-4 animate-pulse" />
                Central Satellite-Based Change Detection Observatory
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Automated Multi-Sensor Disturbance Radar
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                EHII functions as Kashmir EcoWatch&apos;s central satellite-based Change Detection Observatory. Combining Sentinel-2 10m multispectral passes, Sentinel-1 InSAR surface deformation, PlanetScope 3m cadastral monitoring, and Landsat-9 thermal infrared sensors to detect deforestation frontiers, Karewa excavation, wetland encroachments, and illegal riverbed incision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {SATELLITE_OBSERVATORY_STREAMS.slice(0, 4).map((st) => (
                  <div key={st.id} className="p-3 bg-slate-950/70 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-white break-words">{st.targetSignal}</span>
                      <span className="font-mono text-teal-400 text-[10px] shrink-0 ml-2">{st.resolutionMeters}m</span>
                    </div>
                    <div className="text-[11px] text-slate-400 break-words">{st.sensorConstellation}</div>
                    <div className="text-[10px] text-slate-500 mt-1 break-words">Trigger: {st.alertTriggerCriteria}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Connected with Sectoral EIA & Alert Registry API
              </span>
              <Link
                href="/earth-human-impact/spatial-intelligence-atlas"
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold shadow-md transition-colors"
              >
                Launch Spatial Intelligence Atlas
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive GIS Preview Card */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Map className="w-4 h-4" />
                Spatial Footprint
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Basin-Wide Disturbance Layers</h4>
              <p className="text-xs text-slate-400 mb-4">
                Overlaying cadastral boundaries, quarry leases, highway cuts, and wetland reserves onto 10m Sentinel imagery.
              </p>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Hokersar Wetland Encroachment Buffer</span>
                    <span className="text-rose-400 text-[11px]">48.2% Severed</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: '48.2%' }}></div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Budgam Karewa Excavation Intensity</span>
                    <span className="text-orange-400 text-[11px]">84/100 Stress</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Ramban Slope Instability (InSAR)</span>
                    <span className="text-amber-400 text-[11px]">-42 mm/yr</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/earth-human-impact/spatial-intelligence-atlas"
              className="mt-6 w-full text-center py-2 px-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-semibold transition-colors"
            >
              Explore Full 10-District GIS Map
            </Link>
          </div>
        </section>

        {/* SECTION 4: HUMAN PRESSURE INDEX (HPI) */}
        <section id="human-pressure-index" className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldAlert className="w-4 h-4" />
                District Anthropogenic Scorecard
              </div>
              <h2 className="text-2xl font-bold text-white">Human Pressure Index (HPI) across 10 Kashmir Districts</h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Quantified composite score (0–100) combining canopy loss, quarrying frequency, impervious surface conversion, and infrastructure load.
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search district or driver..."
                value={hpiSearch}
                onChange={(e) => setHpiSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">HPI Composite Score</th>
                  <th className="py-3 px-3">Stress Category</th>
                  <th className="py-3 px-3">Canopy Loss (ha/yr)</th>
                  <th className="py-3 px-3">Active Quarries/Kilns</th>
                  <th className="py-3 px-3">Impervious Growth (%)</th>
                  <th className="py-3 px-3">Primary Anthropogenic Driver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDistricts.map((d) => (
                  <tr key={d.districtName} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{d.districtName}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{d.overallHpiScore}</span>
                        <div className="w-20 bg-slate-800 rounded-full h-1.5 hidden sm:block">
                          <div 
                            className={cn(
                              'h-1.5 rounded-full',
                              d.overallHpiScore >= 80 ? 'bg-rose-500' :
                              d.overallHpiScore >= 65 ? 'bg-orange-500' :
                              d.overallHpiScore >= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                            )}
                            style={{ width: `${d.overallHpiScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={cn('px-2 py-0.5 rounded text-[10px] font-bold border', getStressCategoryBadge(d.stressCategory))}>
                        {d.stressCategory}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">{d.forestCanopyLossHaYear} ha</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{d.quarryMiningPointsActive} sites</td>
                    <td className="py-3 px-3 font-mono text-slate-300">+{d.imperviousSurfaceGrowthPercent}%</td>
                    <td className="py-3 px-3 text-slate-300 max-w-[280px]">{d.primaryAnthropogenicDriver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: CUMULATIVE IMPACT MATRIX */}
        <section id="cumulative-impact-matrix" className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" />
                Systemic Cross-Sectoral Vulnerabilities
              </div>
              <h2 className="text-2xl font-bold text-white">Cumulative Environmental Impact Matrix</h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Connecting EHII anthropogenic pressures with Sectoral EIA domains and Water Systems receptors.
              </p>
            </div>

            <Link
              href="/earth-human-impact/cumulative-impact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors"
            >
              Full Interactive Matrix
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CUMULATIVE_INTERACTIONS.map((item) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-white">{item.interactionName}</span>
                    <span className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                      item.severityLevel === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    )}>
                      {item.severityLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                    <div className="p-2 bg-white/5 rounded">
                      <span className="text-slate-500 block text-[9px] uppercase">EHII Driver:</span>
                      <span className="text-slate-300 font-medium">{item.primaryDriverDomain}</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <span className="text-slate-500 block text-[9px] uppercase">Coupled Sector:</span>
                      <span className="text-teal-400 font-medium">{item.interactingSectorOrModule}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {item.mechanism}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] gap-2">
                  <span className="text-slate-400">
                    <strong className="text-slate-300 font-normal">Hotspot:</strong> {item.geographicalHotspot}
                  </span>
                  <span className="text-teal-400 break-words">
                    {item.ecologicalReceptor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6 & 7: RESTORATION TRACKER & SCIENTIFIC REGISTRY */}
        <section id="restoration-registry" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Restoration Tracker Card */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  Restoration & Mitigation Tracker
                </div>
                <Link
                  href="/earth-human-impact/mitigation-restoration"
                  className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
                >
                  View All
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Verified Ecological Interventions</h3>
              <p className="text-xs text-slate-400 mb-4">
                Empirical tracking of catchment re-vegetation, wetland boundary re-demarcation, and muck slope consolidation.
              </p>

              <div className="space-y-3">
                {RESTORATION_TRACKER_DATA.map((proj) => (
                  <div key={proj.id} className="p-3 bg-slate-950/70 border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{proj.projectTitle}</span>
                      <span className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-semibold',
                        proj.verificationStatus === 'Verified by Telemetry' ? 'bg-emerald-500/20 text-emerald-300' :
                        'bg-amber-500/20 text-amber-300'
                      )}>
                        {proj.verificationStatus}
                      </span>
                    </div>
                    <div className="text-[11px] text-teal-400 font-mono mb-1">{proj.targetMetric}</div>
                    <div className="text-xs text-slate-300">{proj.quantitativeMilestone}</div>
                    <div className="mt-2 text-[10px] text-slate-500 flex justify-between">
                      <span>Agency: {proj.implementingBody}</span>
                      <span>Target: {proj.completionYear}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scientific Evidence Registry Card */}
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  Scientific Evidence Registry
                </div>
                <Link
                  href="/earth-human-impact/scientific-reports"
                  className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
                >
                  Browse Dossiers
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Peer-Reviewed Methodologies & Audits</h3>
              <p className="text-xs text-slate-400 mb-4">
                All EHII intelligence is corroborated against statutory government ledgers and peer-reviewed Himalayan earth systems research.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-950/70 border border-white/10 rounded-xl">
                  <div className="text-xs font-bold text-white mb-1">FSI Biennial Forest Cover Assessment (1:50,000)</div>
                  <p className="text-xs text-slate-300 mb-1">
                    Multi-spectral LISS-III and Sentinel-2 calibrated canopy density strata across 10 Kashmir forest divisions.
                  </p>
                  <div className="text-[10px] font-mono text-slate-500">Forest Survey of India • Dehradun • 2023–2025</div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-white/10 rounded-xl">
                  <div className="text-xs font-bold text-white mb-1">CAG Environmental Audit on J&K Waterbodies & Wetlands</div>
                  <p className="text-xs text-slate-300 mb-1">
                    Report No. 3 of 2025 documenting municipal sewage bypasses into Dal Lake, Anchar, and Hokersar wetlands.
                  </p>
                  <div className="text-[10px] font-mono text-slate-500">Comptroller & Auditor General of India • 2025</div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-white/10 rounded-xl">
                  <div className="text-xs font-bold text-white mb-1">J&K Directorate of Geology and Mining E-Challan Registry</div>
                  <p className="text-xs text-slate-300 mb-1">
                    Legal volumetric mineral extraction logs and GPS-tracked mechanical riverbed mining concessions.
                  </p>
                  <div className="text-[10px] font-mono text-slate-500">DGM Government of J&K • E-Marketplace Ledger 2026</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Scientific Confidence Index: 98.4%</span>
              <span className="text-teal-400 font-medium">Standardized under SEA Protocols</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
