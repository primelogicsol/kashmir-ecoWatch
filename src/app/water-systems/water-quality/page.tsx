'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { waterQualitySites, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Thermometer, Droplet, Droplets, Waves, Mountain, ShieldAlert, Sparkles,
  MapPin, Activity, Compass, AlertTriangle, CheckCircle2, ChevronRight,
  Eye, ShieldCheck, Layers, Minus, TrendingDown, AlertOctagon, ArrowRight,
  FileText, Camera, Beaker
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaterQualityPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'excellent' | 'good' | 'moderate' | 'poor' | 'critical' | 'highdo'>('all');
  const [activeInsight, setActiveInsight] = useState<'stations' | 'parameters' | 'classes' | 'observe'>('stations');

  const categories = useMemo(() => [...new Set(waterQualitySites.map(w => w.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(waterQualitySites.map(w => w.district))].filter(Boolean).sort(), []);

  const totalCount = waterQualitySites.length; // 65
  const ex = useMemo(() => waterQualitySites.filter(w => w.waterQuality?.status === 'excellent').length, []);
  const good = useMemo(() => waterQualitySites.filter(w => w.waterQuality?.status === 'good').length, []);
  const mod = useMemo(() => waterQualitySites.filter(w => w.waterQuality?.status === 'moderate').length, []);
  const poor = useMemo(() => waterQualitySites.filter(w => w.waterQuality?.status === 'poor').length, []);
  const crit = useMemo(() => waterQualitySites.filter(w => w.waterQuality?.status === 'critical').length, []);
  const highDO = useMemo(() => waterQualitySites.filter(w => (w.waterQuality?.dissolvedOxygen || 0) >= 7.0).length, []);

  // Filtered sites for listing grid
  const displayedSites = useMemo(() => {
    switch (activeTab) {
      case 'excellent':
        return waterQualitySites.filter(w => w.waterQuality?.status === 'excellent');
      case 'good':
        return waterQualitySites.filter(w => w.waterQuality?.status === 'good');
      case 'moderate':
        return waterQualitySites.filter(w => w.waterQuality?.status === 'moderate');
      case 'poor':
        return waterQualitySites.filter(w => w.waterQuality?.status === 'poor');
      case 'critical':
        return waterQualitySites.filter(w => w.waterQuality?.status === 'critical');
      case 'highdo':
        return waterQualitySites.filter(w => (w.waterQuality?.dissolvedOxygen || 0) >= 7.0);
      case 'all':
      default:
        return waterQualitySites;
    }
  }, [activeTab]);

  const flagshipSites = useMemo(() => {
    return waterQualitySites.filter(w => 
      ['dal-lake', 'wular-lake', 'jhelum-river', 'lidder-river', 'kokernag-spring', 'manasbal-lake', 'nigeen-lake', 'hokersar-lake'].some(s => w.slug.includes(s))
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Water Quality Observatory"
      description="Real-time and sentinel telemetry across 65 water quality monitoring stations tracking dissolved oxygen (DO), biochemical oxygen demand (BOD), fecal coliform, turbidity, pH, nitrates, and trophic state indices across Kashmir's water bodies."
      icon="Thermometer"
      color="from-teal-500 via-cyan-600 to-blue-600"
      entities={displayedSites}
      entityType="Quality Sites"
      kpis={[
        { label: 'Total Monitoring Sites', value: totalCount, icon: 'Thermometer' },
        { label: 'Pristine (Class A)',     value: ex,         icon: 'CheckCircle2', color: 'text-emerald-400' },
        { label: 'Good & Stable',          value: good,       icon: 'Activity',     color: 'text-teal-400' },
        { label: 'Moderate / Alert',       value: mod,        icon: 'Minus',        color: 'text-amber-400' },
        { label: 'Poor / Stressed',        value: poor,       icon: 'TrendingDown', color: 'text-orange-400' },
        { label: 'Critical / Hypoxic',     value: crit,       icon: 'AlertOctagon', color: 'text-red-400' },
        { label: 'High Oxygen (DO ≥ 7)',   value: highDO,     icon: 'Droplet',      color: 'text-cyan-400' },
        { label: 'Sampling Telemetry',     value: 'Active',   icon: 'Eye',          color: 'text-emerald-400' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical'],
      }}
      getEntitySlug={entity => `/water-systems/water-quality/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.waterQuality ? (
          <div className="mb-2 p-2.5 rounded-lg bg-slate-800/60 border border-white/5">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">DO</span>
                <span className="text-white font-semibold">{entity.waterQuality.dissolvedOxygen} mg/L</span>
              </div>
              <div>
                <span className="text-slate-500 block">Turbidity</span>
                <span className="text-white font-semibold">{entity.waterQuality.turbidity} NTU</span>
              </div>
              <div>
                <span className="text-slate-500 block">BOD</span>
                <span className="text-white font-semibold">{entity.waterQuality.biologicalOxygenDemand} mg/L</span>
              </div>
            </div>
          </div>
        ) : null
      }
    >
      {/* ── Water Quality Focus Typologies Filter Bar ──────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-teal-400" />
              Water Quality Trophic Tiers &amp; Status
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 65 monitoring stations by chemical status tier or dissolved oxygen saturation.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-teal-400">{displayedSites.length}</strong> of {totalCount} stations
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Stations ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'excellent' ? 'default' : 'outline'}
            onClick={() => setActiveTab('excellent')}
            className={activeTab === 'excellent' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Pristine / Excellent ({ex})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'good' ? 'default' : 'outline'}
            onClick={() => setActiveTab('good')}
            className={activeTab === 'good' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <Activity className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Good &amp; Stable ({good})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'moderate' ? 'default' : 'outline'}
            onClick={() => setActiveTab('moderate')}
            className={activeTab === 'moderate' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <Minus className="w-3.5 h-3.5 mr-1 text-amber-300" />
            Moderate / Alert ({mod})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'poor' ? 'default' : 'outline'}
            onClick={() => setActiveTab('poor')}
            className={activeTab === 'poor' ? 'bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-lg shadow-orange-950/40' : 'border-white/10 text-orange-300 hover:text-white'}
          >
            <TrendingDown className="w-3.5 h-3.5 mr-1 text-orange-300" />
            Poor / Stressed ({poor})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'critical' ? 'default' : 'outline'}
            onClick={() => setActiveTab('critical')}
            className={activeTab === 'critical' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <AlertOctagon className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Critical / Hypoxic ({crit})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'highdo' ? 'default' : 'outline'}
            onClick={() => setActiveTab('highdo')}
            className={activeTab === 'highdo' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Droplet className="w-3.5 h-3.5 mr-1 text-blue-300" />
            High Oxygen (DO ≥ 7) ({highDO})
          </Button>
        </div>
      </div>

      {/* ── Water Quality Intelligence & Field Observation Spotlight ────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Limnological Quality Intelligence &amp; Testing Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Sentinel telemetry parameters, CPCB potability classifications, eutrophication biomarkers, and citizen water testing kits.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('stations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'stations'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sentinel Stations
            </button>
            <button
              onClick={() => setActiveInsight('parameters')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'parameters'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              10 Parameters
            </button>
            <button
              onClick={() => setActiveInsight('classes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'classes'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CPCB Standards
            </button>
            <button
              onClick={() => setActiveInsight('observe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeInsight === 'observe'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Eye className="w-3 h-3" />
              Observe Here (Sampling Kit)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Sentinel Stations */}
          {activeInsight === 'stations' && (
            <motion.div
              key="stations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipSites.map(site => (
                <Link
                  key={site.id}
                  href={`/water-systems/water-quality/${site.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                      <Thermometer className="w-2.5 h-2.5" />
                      {site.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      site.waterQuality?.status === 'excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                      site.waterQuality?.status === 'good' ? 'bg-teal-500/20 text-teal-400' :
                      site.waterQuality?.status === 'moderate' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      {site.waterQuality?.status?.toUpperCase()}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-teal-300 transition-colors line-clamp-1">
                    {site.name}
                  </h5>
                  <div className="text-xs text-teal-400/90 font-medium mt-0.5">
                    {site.district} District · {site.watershed}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 my-2.5 p-2 rounded-lg bg-slate-900/80 border border-white/5 text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">DO</span>
                      <span className="text-white font-bold">{site.waterQuality?.dissolvedOxygen || 8.0} mg/L</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">BOD</span>
                      <span className="text-white font-bold">{site.waterQuality?.biologicalOxygenDemand || 2.0} mg/L</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Turbidity</span>
                      <span className="text-white font-bold">{site.waterQuality?.turbidity || 4} NTU</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Tested: {site.waterQuality?.lastTested || 'Recent'}</span>
                    <span className="text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Full Assay <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: 10 Parameters */}
          {activeInsight === 'parameters' && (
            <motion.div
              key="parameters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
            >
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">1. Dissolved Oxygen (DO)</span>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Vital for salmonid fish survival. Pristine trout reaches exceed 8.5 mg/L; hypoxic urban bays drop below 3.0 mg/L causing fish kills.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Benchmark: &gt;6.0 mg/L (Potable / Trout)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">2. Biochemical Oxygen Demand (BOD)</span>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Measures organic pollution from untreated domestic sewage and decaying macrophyte weeds over a 5-day incubation at 20°C.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Benchmark: &lt;2.0 mg/L (Clean Water)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">3. Nephelometric Turbidity (NTU)</span>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Suspended glacial rock flour and soil erosion blocking sunlight penetration, choking fish gills and benthic diatom mats.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Benchmark: &lt;5 NTU (Clear Alpine Water)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">4. Fecal Coliform Bacteria</span>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Direct microbiological indicator of human sewage and livestock manure contamination, transmitting enteric pathogens.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Benchmark: 0 CFU/100ml (Potable Limit)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">5. Nitrates &amp; Phosphates</span>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Inorganic agricultural nutrients driving catastrophic cultural eutrophication and cyanobacterial scum proliferation.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Benchmark: NO3 &lt;10 mg/L, PO4 &lt;0.05 mg/L</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">6. Total Dissolved Solids (TDS)</span>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Mineralized inorganic salts (calcium, magnesium, chlorides). Glacial headwaters measure &lt;60 ppm; urban outflows reach &gt;350 ppm.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Benchmark: &lt;500 ppm (Drinking Standard)</div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: CPCB Standards */}
          {activeInsight === 'classes' && (
            <motion.div
              key="classes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Class A: Drinking Source</span>
                <h5 className="text-sm font-semibold text-white mb-2">Without Conventional Treatment</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Requires disinfection only. DO &ge; 6.0 mg/L, BOD &le; 2.0 mg/L, Coliform &le; 50 MPN/100ml. Represents pristine high-altitude springs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Class B: Outdoor Bathing</span>
                <h5 className="text-sm font-semibold text-white mb-2">Primary Contact Recreation</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  DO &ge; 5.0 mg/L, BOD &le; 3.0 mg/L, Coliform &le; 500 MPN/100ml. Standard applied to pilgrimage ghats, Dal Lake swimming, and water sports.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Class C: Conventional Supply</span>
                <h5 className="text-sm font-semibold text-white mb-2">Coagulation &amp; Filtration</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  DO &ge; 4.0 mg/L, BOD &le; 3.0 mg/L, Coliform &le; 5,000 MPN/100ml. Jhelum municipal intakes feeding urban water treatment plants.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Class D: Fish &amp; Wildlife</span>
                <h5 className="text-sm font-semibold text-white mb-2">Aquatic Ecosystem Propagation</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  DO &ge; 4.0 mg/L, free ammonia &le; 1.2 mg/L. Minimum biological viability threshold for riverine snow trout and wetland waterfowl.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Observe Here */}
          {activeInsight === 'observe' && (
            <motion.div
              key="observe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-cyan-950/60 border border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-400 shrink-0">
                    <Beaker className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Citizen Water Testing Kit &amp; Sampling Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-teal-500/40 text-teal-300">
                        Field Lab 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit field test strip readings, digital probe assays, chemical contamination alerts, or fish mortality reports.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Water Assay
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Toxic Spill
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-teal-400" />
                      Testing Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-teal-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Digital Optical DO Probe</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Submerge probe 30 cm below surface in flowing water. Wait 90 seconds for temperature compensation. Record Dissolved Oxygen in mg/L and percentage saturation.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-teal-300/80 font-mono">
                    Method: Luminescent DO Sensor (ISO 17289)
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <Beaker className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Multi-Test Color Strips</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Dip chemical test strip for 2 seconds. Shake off excess water and match reagent pads at 60 seconds for pH (6.5–8.5), Total Alkalinity, Free Chlorine, and Nitrate (NO3).
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-cyan-300/80 font-mono">
                    Protocol: Colorimetric Rapid Assay
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. H2S Coliform Vial Test</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Fill sterile vial containing impregnated bacteriological medium. Incubate at ambient room temperature for 24–48 hours. Blackening indicates presence of fecal coliforms.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Standard: WHO H2S Paper-Strip Method
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Eye className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Turbidity Tube Sighting</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Pour stream sample into a graduated clear turbidity tube with black target disc at bottom. Release water until target becomes sharply visible. Read depth calibration in NTU.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Apparatus: 60cm Graduated Turbidity Tube
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WaterEntityListingPage>
  );
}
