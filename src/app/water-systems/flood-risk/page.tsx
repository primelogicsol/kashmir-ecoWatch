'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { floodRiskZones, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, AlertOctagon, AlertCircle, Shield, Zap, Mountain, Map,
  Clock, MapPin, Sparkles, Activity, CheckCircle2, ChevronRight, Eye,
  ShieldCheck, Layers, Waves, ArrowRight, FileText, Camera, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloodRiskPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'high' | 'flash' | 'urban' | 'glacial'>('all');
  const [activeInsight, setActiveInsight] = useState<'gauges' | 'capacity' | 'buffering' | 'observe'>('gauges');

  const categories = useMemo(() => [...new Set(floodRiskZones.map(f => f.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(floodRiskZones.map(f => f.district))].filter(Boolean).sort(), []);

  const totalCount = floodRiskZones.length; // 6
  const criticalRisk = useMemo(() => floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'critical').length, []);
  const highRisk     = useMemo(() => floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'high').length, []);
  const modLowRisk   = useMemo(() => floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'moderate' || f.floodRiskData?.riskLevel === 'low').length, []);
  const flash        = useMemo(() => floodRiskZones.filter(f => f.floodRiskData?.floodType?.includes('flash')).length, []);
  const glacial      = useMemo(() => floodRiskZones.filter(f => f.floodRiskData?.floodType?.includes('glacial')).length, []);

  // Filtered zones for listing grid
  const displayedZones = useMemo(() => {
    switch (activeTab) {
      case 'critical':
        return floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'critical');
      case 'high':
        return floodRiskZones.filter(f => f.floodRiskData?.riskLevel === 'high');
      case 'flash':
        return floodRiskZones.filter(f => f.floodRiskData?.floodType?.includes('flash'));
      case 'urban':
        return floodRiskZones.filter(f => f.name.toLowerCase().includes('srinagar') || f.category?.toLowerCase().includes('urban'));
      case 'glacial':
        return floodRiskZones.filter(f => f.floodRiskData?.floodType?.includes('glacial'));
      case 'all':
      default:
        return floodRiskZones;
    }
  }, [activeTab]);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Flood & Hydrological Risk"
      description="Hydrological early warning and vulnerability mapping across Kashmir's major floodplains, flash-flood tributary corridors, gauge telemetry posts, wetland flood attenuation basins, and breach-prone embankments."
      icon="AlertTriangle"
      color="from-red-500 via-rose-600 to-amber-600"
      entities={displayedZones}
      entityType="Flood Risk Zones"
      kpis={[
        { label: 'Total Risk Zones Mapped', value: totalCount, icon: 'MapPin' },
        { label: 'Critical Inundation Risk', value: criticalRisk, icon: 'AlertOctagon', color: 'text-red-400' },
        { label: 'High Vulnerability',     value: highRisk,     icon: 'AlertCircle',  color: 'text-orange-400' },
        { label: 'Moderate / Buffered',    value: modLowRisk,  icon: 'Shield',       color: 'text-emerald-400' },
        { label: 'Flash Flood Torrents',   value: flash,        icon: 'Zap',          color: 'text-amber-400' },
        { label: 'Glacial Melt / GLOF',    value: glacial,      icon: 'Mountain',     color: 'text-sky-400' },
        { label: 'Districts Monitored',    value: districts.length, icon: 'Map' },
        { label: 'Flood Alert Stream',     value: 'Active',     icon: 'Eye',          color: 'text-teal-400' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/flood-risk/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.floodRiskData ? (
          <div className="mb-2">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              entity.floodRiskData.riskLevel === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
              entity.floodRiskData.riskLevel === 'high'     ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
              entity.floodRiskData.riskLevel === 'moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {entity.floodRiskData.riskLevel.toUpperCase()} RISK
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Type: <span className="text-white">{entity.floodRiskData.floodType?.replace(/-/g,' ')}</span>
            </p>
          </div>
        ) : null
      }
    >
      {/* ── Flood Risk Focus Typologies Filter Bar ─────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              Flood Vulnerability Typologies &amp; Hazard Zones
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the mapped hazard zones by risk tier, flash-flood velocity, or urban low-lying waterlogging.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-rose-400">{displayedZones.length}</strong> of {totalCount} zones
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Zones ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'critical' ? 'default' : 'outline'}
            onClick={() => setActiveTab('critical')}
            className={activeTab === 'critical' ? 'bg-red-700 hover:bg-red-600 text-white font-medium shadow-lg shadow-red-950/40' : 'border-white/10 text-red-300 hover:text-white'}
          >
            <AlertOctagon className="w-3.5 h-3.5 mr-1 text-red-300" />
            Critical Inundation ({criticalRisk})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'high' ? 'default' : 'outline'}
            onClick={() => setActiveTab('high')}
            className={activeTab === 'high' ? 'bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-lg shadow-orange-950/40' : 'border-white/10 text-orange-300 hover:text-white'}
          >
            <AlertCircle className="w-3.5 h-3.5 mr-1 text-orange-300" />
            High Vulnerability ({highRisk})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'flash' ? 'default' : 'outline'}
            onClick={() => setActiveTab('flash')}
            className={activeTab === 'flash' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <Zap className="w-3.5 h-3.5 mr-1 text-amber-300" />
            Flash Flood Corridors ({flash})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'urban' ? 'default' : 'outline'}
            onClick={() => setActiveTab('urban')}
            className={activeTab === 'urban' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <Map className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Urban Floodplains
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'glacial' ? 'default' : 'outline'}
            onClick={() => setActiveTab('glacial')}
            className={activeTab === 'glacial' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-sky-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-sky-300" />
            Glacial Swells ({glacial})
          </Button>
        </div>
      </div>

      {/* ── Flood Intelligence & Field Observation Spotlight ───────────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              Hydrological Flood Hazard &amp; Gauge Telemetry Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Sentinel river gauge thresholds, channel carrying bottlenecks, natural wetland flood attenuation, and citizen riverbank monitoring.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('gauges')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'gauges'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Key River Gauges
            </button>
            <button
              onClick={() => setActiveInsight('capacity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'capacity'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Channel Bottlenecks
            </button>
            <button
              onClick={() => setActiveInsight('buffering')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'buffering'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Wetland Sponges
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
              Observe Here (Flood Watch)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Key River Gauges */}
          {activeInsight === 'gauges' && (
            <motion.div
              key="gauges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">South Kashmir Upstream Gauge</span>
                <h5 className="text-sm font-semibold text-white mb-2">Sangam Gauge Post (Anantnag)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Measures total discharge from Lidder, Bringi, Sandran, and Veshaw tributaries before entering Srinagar. Warning Mark: 18 ft; Danger Mark: 21 ft; Extreme Catastrophic Peak (2014): 33.8 ft.
                </p>
                <div className="text-[11px] text-slate-500">
                  Critical Benchmark: <span className="text-rose-300">21.0 ft (Alert Issued to Srinagar)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Central Capital Gauge</span>
                <h5 className="text-sm font-semibold text-white mb-2">Ram Munshi Bagh (Srinagar)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Key urban flood indicator gauge for Srinagar municipal boundaries. Warning Mark: 16 ft; Danger Mark: 18 ft; Full Overtopping Crest (2014): 23.5 ft, leading to embankment breaches.
                </p>
                <div className="text-[11px] text-slate-500">
                  Spill Diverter: <span className="text-amber-300">Flood Spill Channel opened at Padshahi Bagh</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Downstream North Basin Gauge</span>
                <h5 className="text-sm font-semibold text-white mb-2">Asham Gauge Post (Bandipora)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Monitors river outflow before discharge enters Wular Lake. Reflects backwater effects and drainage stagnation during prolonged monsoon swells across Sonawari and Sumbal plains.
                </p>
                <div className="text-[11px] text-slate-500">
                  Danger Mark: <span className="text-blue-300">14.0 ft (Wular Backwater Inundation)</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Channel Bottlenecks */}
          {activeInsight === 'capacity' && (
            <motion.div
              key="capacity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Srinagar Fluvial Deficit</span>
                <h5 className="text-sm font-semibold text-white mb-2">Jhelum Carrying Capacity</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  The main river channel through Srinagar handles only 35,000 cusecs safely, with the Flood Spill Channel accommodating ~17,000 cusecs (Total: ~52,000 cusecs). 100-year peak swells exceed 115,000 cusecs.
                </p>
                <div className="text-[11px] text-slate-500">
                  Structural Solution: <span className="text-amber-300">Comprehensive Phase-II Spill Dredging</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Baramulla Outflow Chokepoint</span>
                <h5 className="text-sm font-semibold text-white mb-2">Janbazpora to Pohru Confluence</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  The rocky gorge downstream of Wular acts as a natural hydrological bottleneck. Heavy tributary discharge from Pohru River frequently dams back Jhelum outflow, flooding Sopore and Sumbal.
                </p>
                <div className="text-[11px] text-slate-500">
                  Remedy: <span className="text-rose-300">Outflow Channel Blasting &amp; Deepening</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Pir Panjal Flash Torrents</span>
                <h5 className="text-sm font-semibold text-white mb-2">Veshaw &amp; Rambiara Debris Fans</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Short concentration time (&lt;3 hours) from alpine ridges creates destructive boulder-laden hyper-concentrated flash floods that overwhelm road bridges and scour agricultural levees.
                </p>
                <div className="text-[11px] text-slate-500">
                  Mitigation: <span className="text-teal-300">Headwater Silt Catchment Gabions</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Wetland Sponges */}
          {activeInsight === 'buffering' && (
            <motion.div
              key="buffering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Wular Lake Sink</span>
                <h5 className="text-sm font-semibold text-white mb-2">Master Basin Sink</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Natural flood reservoir absorbing peak flood discharge from the entire Kashmir valley, modulating downstream flows before water enters Pakistan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Hokersar Attenuation</span>
                <h5 className="text-sm font-semibold text-white mb-2">Central Flood Sponge</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Absorbs overflow from Doodh Ganga and Sukhnag streams, shielding Srinagar western suburbs (Bemina, HMT, Zainakote) from sudden inundation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Haigam &amp; Mirgund</span>
                <h5 className="text-sm font-semibold text-white mb-2">North Basin Buffer</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Floodplain depressions that absorb river spills between Pattan and Sopore, reducing water pressure on national highway embankments.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Encroachment Peril</span>
                <h5 className="text-sm font-semibold text-white mb-2">Lost Storage Capacity</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Over 50% loss of historic wetland area to agriculture and urbanization over the past 50 years directly increases peak flood height by 1.8 meters.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-slate-900 to-rose-950/60 border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Community Riverbank &amp; Flood Watch Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-rose-500/40 text-rose-300">
                        Flood Alert 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit live river gauge readings, embankment seepage alerts, sand-boil piping sightings, or stormwater drain backflow reports.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Gauge / Flood Record
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Bund Breach Risk
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Flood Telemetry Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. River Staff Gauge Reading</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Read the enamel staff gauge plate mounted on bridge piers at Sangam, Ram Munshi Bagh, or Asham. Note exact timestamp and water level in feet and inches.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Protocol: I&amp;FC Jhelum Staff Gauge Log
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Sand Boil &amp; Piping Alert</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Check the dry landward side of river embankments for bubbling cones of muddy sand (sand boils). Signals internal hydraulic piping and imminent bund breach.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Emergency: Subsurface Piping Breach Risk
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <Waves className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Sluice Gate Flap Valves</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Inspect storm drainage outfalls into River Jhelum. Ensure non-return flap valves are unobstructed; jammed gates allow rising river floodwaters to backflow into city colonies.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-blue-300/80 font-mono">
                    Audit: Backflow Flap Valve Clearance
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Dewatering Pump Telemetry</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Check operational readiness of municipal dewatering stations in low-lying bowls (Bemina, Mehjoor Nagar). Verify standby diesel generator fuel reserves during grid outages.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-300/80 font-mono">
                    Readiness: SMC Drainage Pump Duty Log
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
