'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { lakesData, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Droplet, Droplets, Mountain, Waves, ShieldAlert, Sparkles, MapPin, 
  Activity, Compass, AlertTriangle, CheckCircle2, ChevronRight, Eye, 
  ShieldCheck, Layers, Thermometer, Wind, ExternalLink, ArrowRight, 
  FileText, Camera, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LakesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'alpine' | 'ramsar' | 'pristine' | 'threatened' | 'urban' | 'glacial'>('all');
  const [activeInsight, setActiveInsight] = useState<'alpine' | 'ramsar' | 'trophic' | 'observe'>('alpine');

  const categories = useMemo(() => [...new Set(lakesData.map(l => l.category))].sort(), []);
  const districts = useMemo(() => [...new Set(lakesData.map(l => l.district))].filter(Boolean).sort(), []);

  // Exact deterministic calculations from the 62 mapped lakes database
  const totalCount = lakesData.length; // 62
  const alpineCount = useMemo(() => lakesData.filter(l => (l.elevation || 0) >= 3000 || l.category?.toLowerCase().includes('alpine') || l.category?.toLowerCase().includes('high-altitude')).length, []);
  const ramsarCount = useMemo(() => lakesData.filter(l => l.category?.toLowerCase().includes('ramsar') || l.category?.toLowerCase().includes('wetland') || ['dal-lake', 'wular-lake', 'manasbal-lake', 'hokersar-lake', 'tsomoriri-lake', 'tsokar-lake'].includes(l.slug)).length, []);
  const pristineCount = useMemo(() => lakesData.filter(l => l.waterQuality?.status === 'excellent').length, []);
  const goodCount = useMemo(() => lakesData.filter(l => l.waterQuality?.status === 'good').length, []);
  const threatenedCount = useMemo(() => lakesData.filter(l => ['critical', 'poor', 'moderate'].includes(l.waterQuality?.status || '')).length, []);
  const urbanCount = useMemo(() => lakesData.filter(l => l.category?.toLowerCase().includes('urban') || (l.elevation && l.elevation < 2000)).length, []);
  const glacialCount = useMemo(() => lakesData.filter(l => l.category?.toLowerCase().includes('glacial') || l.category?.toLowerCase().includes('moraine') || l.category?.toLowerCase().includes('tarn')).length, []);

  // Dynamic filter for active quick-tab passed to the listing grid
  const displayedLakes = useMemo(() => {
    switch (activeTab) {
      case 'alpine':
        return lakesData.filter(l => (l.elevation || 0) >= 3000 || l.category?.toLowerCase().includes('alpine') || l.category?.toLowerCase().includes('high-altitude'));
      case 'ramsar':
        return lakesData.filter(l => l.category?.toLowerCase().includes('ramsar') || l.category?.toLowerCase().includes('wetland') || ['dal-lake', 'wular-lake', 'manasbal-lake', 'hokersar-lake', 'tsomoriri-lake', 'tsokar-lake'].includes(l.slug));
      case 'pristine':
        return lakesData.filter(l => l.waterQuality?.status === 'excellent');
      case 'threatened':
        return lakesData.filter(l => ['critical', 'poor', 'moderate'].includes(l.waterQuality?.status || ''));
      case 'urban':
        return lakesData.filter(l => l.category?.toLowerCase().includes('urban') || (l.elevation && l.elevation < 2000));
      case 'glacial':
        return lakesData.filter(l => l.category?.toLowerCase().includes('glacial') || l.category?.toLowerCase().includes('moraine') || l.category?.toLowerCase().includes('tarn'));
      case 'all':
      default:
        return lakesData;
    }
  }, [activeTab]);

  // Curated spotlight datasets for tabs
  const flagshipAlpine = useMemo(() => {
    const slugs = [
      'tarsar-lake', 'marsar-lake', 'gangabal-lake', 'vishansar-lake', 
      'krishansar-lake', 'gadsar-lake', 'sheshnag-lake', 'kausarnag-lake', 
      'tulian-lake', 'nundkol-lake'
    ];
    return lakesData.filter(l => slugs.includes(l.slug)).slice(0, 10);
  }, []);

  const flagshipRamsar = useMemo(() => {
    const slugs = [
      'wular-lake', 'dal-lake', 'manasbal-lake', 'nigeen-lake', 
      'hokersar-lake', 'tsomoriri-lake', 'tsokar-lake', 'surinsar-mansar-lakes'
    ];
    return lakesData.filter(l => slugs.includes(l.slug)).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Lakes & Limnology"
      description="Comprehensive limnological observatory of 62 major, minor, high-altitude alpine tarns, Ramsar wetlands, and urban lacustrine catchments across Kashmir, Jammu, and Ladakh. Features trophic status indices, real-time water quality metrics, bathymetric elevations, and citizen observation protocols."
      icon="Droplets"
      color="from-blue-600 via-cyan-600 to-teal-500"
      entities={displayedLakes}
      entityType="Lakes"
      kpis={[
        { label: 'Total Lakes Mapped',    value: totalCount,      icon: 'Droplets' },
        { label: 'High-Altitude Tarns',   value: alpineCount,     icon: 'Mountain',     color: 'text-sky-400' },
        { label: 'Ramsar & Wetlands',     value: ramsarCount,     icon: 'Waves',        color: 'text-cyan-400' },
        { label: 'Pristine Oligotrophic', value: pristineCount,   icon: 'CheckCircle2', color: 'text-emerald-400' },
        { label: 'Good / Stable',         value: goodCount,       icon: 'Activity',     color: 'text-teal-400' },
        { label: 'Eutrophic / At-Risk',   value: threatenedCount, icon: 'ShieldAlert',  color: 'text-rose-400' },
        { label: 'Districts Monitored',   value: districts.length, icon: 'MapPin' },
        { label: 'Field Protocols',       value: 'Active',        icon: 'Eye',          color: 'text-amber-400' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/lakes/${entity.slug}`}
      getCategory={entity => entity.category}
    >
      {/* ── Lacustrine Focus Categories & Guilds Filter Bar ────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Droplet className="w-5 h-5 text-cyan-400" />
              Lacustrine Focus Typologies &amp; Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an ecological typology, elevation tier, or water quality status to filter the 62 mapped lakes.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-cyan-400">{displayedLakes.length}</strong> of {totalCount} lakes
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Lakes ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'alpine' ? 'default' : 'outline'}
            onClick={() => setActiveTab('alpine')}
            className={activeTab === 'alpine' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-sky-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-sky-300" />
            Alpine Tarns ({alpineCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'ramsar' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ramsar')}
            className={activeTab === 'ramsar' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Waves className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Ramsar &amp; Wetlands ({ramsarCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'pristine' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pristine')}
            className={activeTab === 'pristine' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Pristine Oligotrophic ({pristineCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'threatened' ? 'default' : 'outline'}
            onClick={() => setActiveTab('threatened')}
            className={activeTab === 'threatened' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Eutrophic / At-Risk ({threatenedCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'urban' ? 'default' : 'outline'}
            onClick={() => setActiveTab('urban')}
            className={activeTab === 'urban' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <Compass className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Urban &amp; Valley Basins ({urbanCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'glacial' ? 'default' : 'outline'}
            onClick={() => setActiveTab('glacial')}
            className={activeTab === 'glacial' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <Layers className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Glacial Cirques ({glacialCount})
          </Button>
        </div>
      </div>

      {/* ── Limnological Intelligence & Field Observation Spotlight ─────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Limnological Intelligence &amp; Field Observation Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on flagship high-altitude alpine tarns, Ramsar floodplain wetlands, trophic dynamics, and citizen limnology.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('alpine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'alpine'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Alpine Tarns (3,000m+)
            </button>
            <button
              onClick={() => setActiveInsight('ramsar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'ramsar'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ramsar &amp; Floodplain Basins
            </button>
            <button
              onClick={() => setActiveInsight('trophic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'trophic'
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Altitudinal Trophic Belts
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
              Observe Here (Field Protocols)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Alpine Tarns */}
          {activeInsight === 'alpine' && (
            <motion.div
              key="alpine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
            >
              {flagshipAlpine.map(lake => (
                <Link
                  key={lake.id}
                  href={`/water-systems/lakes/${lake.slug}`}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/40 transition-all group block"
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Alpine Tarn
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      Pristine · {lake.elevation}m
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {lake.name}
                  </h5>
                  <div className="text-[11px] text-cyan-400/90 font-medium truncate mt-0.5">
                    {lake.district} District · {lake.watershed}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {lake.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-emerald-400">DO: {lake.waterQuality?.dissolvedOxygen || 8.5} mg/L</span>
                    <span className="text-cyan-300 font-medium flex items-center gap-0.5">
                      View Lake <ChevronRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Ramsar & Floodplain Basins */}
          {activeInsight === 'ramsar' && (
            <motion.div
              key="ramsar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipRamsar.map(lake => (
                <Link
                  key={lake.id}
                  href={`/water-systems/lakes/${lake.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20 hover:border-blue-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                      <Waves className="w-2.5 h-2.5" />
                      {lake.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      lake.waterQuality?.status === 'excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                      lake.waterQuality?.status === 'good' ? 'bg-teal-500/20 text-teal-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {lake.waterQuality?.status?.toUpperCase()}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-blue-300 transition-colors line-clamp-1">
                    {lake.name}
                  </h5>
                  <div className="text-xs text-sky-400/90 font-medium mt-0.5">
                    {lake.district} · {lake.area} km² surface
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {lake.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Elevation: {lake.elevation}m</span>
                    <span className="text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Inspect Basin <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 3: Altitudinal Trophic Belts */}
          {activeInsight === 'trophic' && (
            <motion.div
              key="trophic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                <span className="text-xs font-bold text-sky-400 block mb-1">Ultra-High Glacial Tarns</span>
                <h5 className="text-sm font-semibold text-white mb-2">3,200m – 4,600m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Pristine cirque tarns fed by glacial meltwater. Ultra-oligotrophic waters with exceptional Secchi transparency (&gt;5m), cold stenothermal regimes, and zero agricultural runoff.
                </p>
                <div className="text-[11px] text-slate-500">
                  Flagships: <span className="text-slate-300">Tarsar, Marsar, Gangabal, Sheshnag</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Subalpine Tectonic Basins</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,500m – 2,000m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Deep tectonic and spring-fed lakes exhibiting distinct thermal stratification in summer. Clear euphotic zones supporting dense submerged macrophyte meadows (*Ceratophyllum*, *Myriophyllum*).
                </p>
                <div className="text-[11px] text-slate-500">
                  Flagships: <span className="text-slate-300">Manasbal (13m depth), Mansar, Surinsar</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Valley Fluvial Floodplains</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,500m – 1,600m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Expansive shallow riverine depressions on the River Jhelum axis. Crucial Central Asian Flyway wintering havens with extensive reed beds (*Phragmites australis*, *Typha*).
                </p>
                <div className="text-[11px] text-slate-500">
                  Flagships: <span className="text-slate-300">Wular (Ramsar #461), Hokersar, Haigam</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400 block mb-1">Urban Anthropic Catchments</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,580m</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Culturally rich lacustrine ecosystems under severe human pressure. Monitored for sewage ingress, floating garden encroachment, Azolla weed mats, and mechanical de-weeding.
                </p>
                <div className="text-[11px] text-slate-500">
                  Flagships: <span className="text-slate-300">Dal Lake, Nigeen Lake, Anchar Lake</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Observe Here (Citizen Field Science & Protocols) */}
          {activeInsight === 'observe' && (
            <motion.div
              key="observe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Field Observer Action Header */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Citizen Limnology &amp; Field Observation Network</span>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-300">
                        Active In Kashmir Core &amp; Basins
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Contribute water clarity records, harmful algal bloom sightings, fish sightings, or report shoreline encroachments directly to the Kashmir EcoWatch registry.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Lake Observation
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Threat / Hazard
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                      Verified Field Records
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 4 Standard Field Protocols */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <Eye className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Secchi Disk Transparency</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Measure water clarity between 10 AM and 2 PM on the shaded side of the boat. Record depth of disappearance. Pristine alpine tarns exceed 5.0m; eutrophic urban bays drop below 1.2m.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-cyan-300/80 font-mono">
                    Protocol: ISO 7027 / APHA 2130
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Algal Bloom &amp; Scum Alert</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Distinguish harmless native duckweed (*Lemna minor*) from pea-soup blue-green cyanobacteria scums (*Microcystis aeruginosa*). Photograph and document GPS coordinates immediately.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Indicator: Toxic Microcystin Hazard
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Native Trout &amp; Benthic Biota</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Track indigenous Himalayan Snow Trout (*Schizothorax niger*, *S. esocinus*) vs introduced Common Carp (*Cyprinus carpio*). Presence of stonefly nymphs confirms high dissolved oxygen.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-300/80 font-mono">
                    Biomonitoring: EPT Taxa Index
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <Wind className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Avian Waterbird Census</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Document seasonal arrivals of Central Asian Flyway waterfowl across Wular, Dal, and Hokersar. Feed into the Asian Waterbird Census (AWC) database for trans-Himalayan flyway tracking.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-blue-300/80 font-mono">
                    Partnership: Wetlands International
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
