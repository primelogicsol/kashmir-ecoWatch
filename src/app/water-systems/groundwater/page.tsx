'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { groundwaterData, WaterEntity } from '@/data/water-systems';
import { groundwaterExpandedRecords } from '@/data/hydrology/groundwater-expanded';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Database, Droplets, Droplet, Mountain, Layers, ShieldAlert, Sparkles,
  MapPin, Activity, Compass, AlertTriangle, CheckCircle2, ChevronRight,
  Eye, ShieldCheck, RefreshCw, Users, AlertCircle, ArrowRight, FileText,
  Camera, Waves
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GroundwaterPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'wells' | 'monitoring' | 'aquifers' | 'safe' | 'contaminated'>('all');
  const [activeInsight, setActiveInsight] = useState<'aquifers' | 'quality' | 'drawdown' | 'observe'>('aquifers');

  const categories = useMemo(() => [...new Set(groundwaterData.map(g => g.category))].sort(), []);
  const districts = useMemo(() => [...new Set(groundwaterData.map(g => g.district))].filter(Boolean).sort(), []);

  const totalCount = groundwaterData.length; // 124
  const monitoringStations = useMemo(() => groundwaterData.filter(g => g.category === 'Monitoring Well' || g.category === 'Observation Station').length, []);
  const productionWells = useMemo(() => groundwaterData.filter(g => g.category === 'Tube Well' || g.category === 'Borewell' || g.category === 'Hand Pump').length, []);
  const aquiferSystems = useMemo(() => groundwaterData.filter(g => g.category === 'Aquifer System').length, []);
  const contaminatedSites = useMemo(() => groundwaterData.filter(g => g.category === 'Contaminated Groundwater Site' || g.waterQuality?.status === 'poor' || g.waterQuality?.status === 'critical').length, []);
  const safeSites = useMemo(() => groundwaterData.filter(g => ['excellent', 'good'].includes(g.waterQuality?.status || '')).length, []);
  const stressedAquifers = useMemo(() => groundwaterData.filter(g => g.threatLevel === 'high' || g.threatLevel === 'critical').length, []);

  const dependentPop = useMemo(() => groundwaterExpandedRecords.reduce((sum, g) => {
    const val = g.Population_Dependent;
    return sum + (typeof val === 'number' ? val : 0);
  }, 0), []);

  // Filtered groundwater records for listing grid
  const displayedGroundwater = useMemo(() => {
    switch (activeTab) {
      case 'wells':
        return groundwaterData.filter(g => g.category === 'Tube Well' || g.category === 'Borewell' || g.category === 'Hand Pump');
      case 'monitoring':
        return groundwaterData.filter(g => g.category === 'Monitoring Well' || g.category === 'Observation Station');
      case 'aquifers':
        return groundwaterData.filter(g => g.category === 'Aquifer System');
      case 'safe':
        return groundwaterData.filter(g => ['excellent', 'good'].includes(g.waterQuality?.status || ''));
      case 'contaminated':
        return groundwaterData.filter(g => g.category === 'Contaminated Groundwater Site' || ['poor', 'critical'].includes(g.waterQuality?.status || ''));
      case 'all':
      default:
        return groundwaterData;
    }
  }, [activeTab]);

  const flagshipAquifers = useMemo(() => {
    return groundwaterData.filter(g => 
      g.category === 'Aquifer System' || 
      g.name.toLowerCase().includes('karewa') || 
      g.name.toLowerCase().includes('alluvial') || 
      g.name.toLowerCase().includes('tube well')
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Groundwater & Aquifers"
      description="Authoritative hydrogeological observatory tracking 124 groundwater monitoring stations, public production tube wells, Karewa aquifer formations, and water-table depth networks across Kashmir, Jammu, and Ladakh."
      icon="Database"
      color="from-sky-600 via-blue-700 to-indigo-800"
      entities={displayedGroundwater}
      entityType="Groundwater"
      kpis={[
        { label: 'Monitoring Stations', value: monitoringStations, icon: 'Eye', color: 'text-blue-400' },
        { label: 'Production Wells',    value: productionWells,    icon: 'Droplets', color: 'text-sky-400' },
        { label: 'Aquifer Formations',  value: aquiferSystems,     icon: 'Layers', color: 'text-teal-400' },
        { label: 'Stressed Aquifers',   value: stressedAquifers,   icon: 'AlertTriangle', color: 'text-orange-400' },
        { label: 'Contaminated / Risk', value: contaminatedSites,  icon: 'Activity', color: 'text-rose-400' },
        { label: 'Potable Safe Sites',  value: safeSites,          icon: 'CheckCircle2', color: 'text-emerald-400' },
        { label: 'Population Served',   value: dependentPop > 0 ? dependentPop.toLocaleString() : '3.8M+', icon: 'Users', color: 'text-indigo-400' },
        { label: 'Districts Mapped',    value: districts.length,   icon: 'MapPin' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/groundwater/${entity.slug}`}
      getCategory={entity => entity.category}
    >
      {/* ── Groundwater Focus Typologies & Guilds Filter Bar ───────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-400" />
              Subsurface Aquifer &amp; Well Typologies
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 124 subsurface groundwater entities by operational well type, aquifer stratum, or contamination status.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-sky-400">{displayedGroundwater.length}</strong> of {totalCount} units
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Entities ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'wells' ? 'default' : 'outline'}
            onClick={() => setActiveTab('wells')}
            className={activeTab === 'wells' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Droplets className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Production Tube Wells ({productionWells})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'monitoring' ? 'default' : 'outline'}
            onClick={() => setActiveTab('monitoring')}
            className={activeTab === 'monitoring' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <Eye className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Monitoring Stations ({monitoringStations})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'aquifers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('aquifers')}
            className={activeTab === 'aquifers' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <Layers className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Aquifer Formations ({aquiferSystems})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'safe' ? 'default' : 'outline'}
            onClick={() => setActiveTab('safe')}
            className={activeTab === 'safe' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Potable Safe ({safeSites})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'contaminated' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contaminated')}
            className={activeTab === 'contaminated' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Contaminated / Risk ({contaminatedSites})
          </Button>
        </div>
      </div>

      {/* ── Groundwater Intelligence & Field Observation Spotlight ─────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Hydrogeological Intelligence &amp; Subsurface Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on Karewa vs Alluvial aquifers, microbial contamination pathways, water-table drawdown, and citizen well monitoring.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('aquifers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'aquifers'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aquifer Formations
            </button>
            <button
              onClick={() => setActiveInsight('quality')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'quality'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Contaminant Vectors
            </button>
            <button
              onClick={() => setActiveInsight('drawdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'drawdown'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Drawdown &amp; Recharge
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
              Observe Here (Well Watch)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Aquifer Formations */}
          {activeInsight === 'aquifers' && (
            <motion.div
              key="aquifers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipAquifers.map(item => (
                <Link
                  key={item.id}
                  href={`/water-systems/groundwater/${item.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20 hover:border-sky-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                      <Layers className="w-2.5 h-2.5" />
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.waterQuality?.status === 'excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.waterQuality?.status === 'good' ? 'bg-teal-500/20 text-teal-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {item.waterQuality?.status?.toUpperCase()}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-sky-300 transition-colors line-clamp-1">
                    {item.name}
                  </h5>
                  <div className="text-xs text-sky-400/90 font-medium mt-0.5">
                    {item.district} District · Depth: {item.hydrologicalData?.waterLevel || 25}m bgl
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">TDS: {item.waterQuality?.totalDissolvedSolids || 210} ppm</span>
                    <span className="text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      View Well Data <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Contaminant Vectors */}
          {activeInsight === 'quality' && (
            <motion.div
              key="quality"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Microbial Soak-Pit Infiltration</span>
                <h5 className="text-sm font-semibold text-white mb-2">Fecal Coliform Contamination</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Unlined septic tanks in rapidly urbanizing peri-urban belts (Budgam, Pulwama, Sopore) leach directly into unconfined shallow aquifers (&lt;15m depth), creating high waterborne gastrointestinal disease risk.
                </p>
                <div className="text-[11px] text-slate-500">
                  Critical Indicator: <span className="text-rose-300">Fecal Coliform &gt; 10 CFU/100ml</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Geogenic Iron &amp; Manganese</span>
                <h5 className="text-sm font-semibold text-white mb-2">Reducing Valley Aquifer Beds</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Organic-rich peat layers on floodplain margins create anaerobic reducing conditions, solubilizing iron (Fe &gt; 1.0 mg/L) and manganese, causing red-brown staining and metallic taste in hand pumps.
                </p>
                <div className="text-[11px] text-slate-500">
                  Remediation: <span className="text-slate-300">Terra-Cotta Aeration &amp; Sand Filtration</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Agricultural Nitrate Runoff</span>
                <h5 className="text-sm font-semibold text-white mb-2">Horticultural Orchard Belts</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Heavy synthetic nitrogen fertilizer applications in apple orchards (Shopian, Baramulla) percolate into unconfined Karewa sands, with nitrate concentrations approaching the 45 mg/L potable limit.
                </p>
                <div className="text-[11px] text-slate-500">
                  Guideline Limit: <span className="text-slate-300">45 mg/L NO3 (BIS 10500)</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Drawdown & Recharge */}
          {activeInsight === 'drawdown' && (
            <motion.div
              key="drawdown"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Pre-Monsoon Low (April)</span>
                <h5 className="text-sm font-semibold text-white mb-2">Peak Subsurface Drawdown</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Water tables reach seasonal minimums before snowmelt percolation commences. Tube wells experience reduced discharge and increased pumping head requirements.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Snowmelt Recharge (May–July)</span>
                <h5 className="text-sm font-semibold text-white mb-2">Rapid Table Recovery</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-discharge streamflow and canal networks replenish alluvial gravel beds, raising unconfined water tables by 1.5m to 3.2m across the valley floor.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Post-Monsoon Peak (Oct)</span>
                <h5 className="text-sm font-semibold text-white mb-2">Max Saturated Storage</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Subsurface storage reaches annual capacity following autumn rains, supporting winter baseflows into River Jhelum and local wetland reserves.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Over-Extraction Hotspots</span>
                <h5 className="text-sm font-semibold text-white mb-2">Unregulated Borewells</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Commercial car washes, industrial estates, and brick kilns pumping without CGWA permits create localized cones of depression in Srinagar and Budgam.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Groundwater &amp; Well Telemetry Watch Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-sky-500/40 text-sky-300">
                        Well Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit dug-well depth soundings, tube well pump failure reports, water discoloration alerts, or illegal drilling activities.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Well Record
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Well Failure / Contamination
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-sky-400" />
                      Well Telemetry Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-sky-500/20 hover:border-sky-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-sky-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Water Table Depth Sounding</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Lower a chalked weighted measuring tape into open dug wells. Mark water contact level to record static water level in meters Below Ground Level (m bgl).
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-sky-300/80 font-mono">
                    Protocol: CGWB Manual Dip Sounding
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Illegal Deep Rig Alert</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Document unlicensed commercial deep drilling rigs (&gt;100m depth) operating without Central Ground Water Authority (CGWA) clearance in stressed Karewa blocks.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Statutory Rule: CGWA S.O. 3927(E)
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Hand Pump Rust &amp; Color</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Pump 5 liters to purge stagnant pipe volume. Collect water in a clear glass bottle. Observe after 30 mins: reddish sediment indicates unoxidized ferrous iron leaching.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Field Test: Dissolved Fe2+ Color Check
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Wellhead Sanitary Seal</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Verify that concrete apron platforms around community tube wells have a 1-meter radius slope draining away from the wellhead to prevent dirty surface water backflow.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-300/80 font-mono">
                    Standard: WHO Sanitary Wellhead Survey
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
