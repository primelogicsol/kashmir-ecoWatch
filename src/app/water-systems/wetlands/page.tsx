'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { wetlandsData, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Waves, Droplets, Droplet, Mountain, ShieldAlert, Sparkles, MapPin,
  Activity, Compass, AlertTriangle, CheckCircle2, ChevronRight, Eye,
  ShieldCheck, Layers, Wind, ExternalLink, ArrowRight, FileText, Camera,
  Globe, Bird
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WetlandsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'ramsar' | 'conservation' | 'birds' | 'good' | 'threatened' | 'alpine'>('all');
  const [activeInsight, setActiveInsight] = useState<'ramsar' | 'birds' | 'services' | 'observe'>('ramsar');

  const categories = useMemo(() => [...new Set(wetlandsData.map(w => w.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(wetlandsData.map(w => w.district))].filter(Boolean).sort(), []);

  const totalCount = wetlandsData.length;
  const ramsarCount = useMemo(() => wetlandsData.filter(w => w.category?.toLowerCase().includes('ramsar') || ['hokersar-wetland', 'shallabugh-wetland', 'haigam-wetland', 'tsokar-wetland', 'tsomoriri-wetland'].includes(w.slug)).length, []);
  const conservCount = useMemo(() => wetlandsData.filter(w => w.category?.toLowerCase().includes('conservation')).length, []);
  const birdsCount = useMemo(() => wetlandsData.filter(w => w.biodiversity?.some(b => b.toLowerCase().includes('bird') || b.toLowerCase().includes('goose') || b.toLowerCase().includes('crane') || b.toLowerCase().includes('waterfowl'))).length, []);
  const goodCount = useMemo(() => wetlandsData.filter(w => ['excellent', 'good'].includes(w.waterQuality?.status || '')).length, []);
  const threatenedCount = useMemo(() => wetlandsData.filter(w => w.threats && w.threats.length > 0).length, []);
  const alpineCount = useMemo(() => wetlandsData.filter(w => (w.elevation || 0) >= 2000 || w.category?.toLowerCase().includes('alpine') || w.category?.toLowerCase().includes('high')).length, []);

  // Filtered wetlands for listing grid
  const displayedWetlands = useMemo(() => {
    switch (activeTab) {
      case 'ramsar':
        return wetlandsData.filter(w => w.category?.toLowerCase().includes('ramsar') || ['hokersar-wetland', 'shallabugh-wetland', 'haigam-wetland', 'tsokar-wetland', 'tsomoriri-wetland'].includes(w.slug));
      case 'conservation':
        return wetlandsData.filter(w => w.category?.toLowerCase().includes('conservation'));
      case 'birds':
        return wetlandsData.filter(w => w.biodiversity?.some(b => b.toLowerCase().includes('bird') || b.toLowerCase().includes('goose') || b.toLowerCase().includes('crane') || b.toLowerCase().includes('waterfowl')));
      case 'good':
        return wetlandsData.filter(w => ['excellent', 'good'].includes(w.waterQuality?.status || ''));
      case 'threatened':
        return wetlandsData.filter(w => w.threats && w.threats.length > 0);
      case 'alpine':
        return wetlandsData.filter(w => (w.elevation || 0) >= 2000 || w.category?.toLowerCase().includes('alpine') || w.category?.toLowerCase().includes('high'));
      case 'all':
      default:
        return wetlandsData;
    }
  }, [activeTab]);

  const flagshipRamsar = useMemo(() => {
    return wetlandsData.filter(w => 
      w.category?.toLowerCase().includes('ramsar') || 
      w.category?.toLowerCase().includes('conservation') || 
      w.name.toLowerCase().includes('hokersar') || 
      w.name.toLowerCase().includes('shallabugh') || 
      w.name.toLowerCase().includes('haigam') || 
      w.name.toLowerCase().includes('mirgund') || 
      w.name.toLowerCase().includes('chatlam')
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Wetlands & Marshes"
      description="Comprehensive limnological registry of 80 marshes, floodplain wetlands, shallow-water habitats, reedbeds, migratory bird staging reserves, and Ramsar international conservation landscapes across Kashmir, Jammu, and Ladakh."
      icon="Waves"
      color="from-sky-500 to-blue-600"
      entities={displayedWetlands}
      entityType="Wetlands"
      kpis={[
        { label: 'Total Wetlands',    value: totalCount,       icon: 'Waves' },
        { label: 'Ramsar Sites',      value: ramsarCount,      icon: 'Globe',        color: 'text-cyan-400' },
        { label: 'Conservation Reserves', value: conservCount, icon: 'ShieldCheck',  color: 'text-emerald-400' },
        { label: 'Avian Staging Grounds', value: birdsCount,   icon: 'Bird',         color: 'text-sky-400' },
        { label: 'Good+ Water Quality', value: goodCount,      icon: 'Activity',     color: 'text-teal-400' },
        { label: 'Under Threat / Silt', value: threatenedCount, icon: 'AlertTriangle', color: 'text-amber-400' },
        { label: 'Districts Mapped',  value: districts.length, icon: 'MapPin' },
        { label: 'Citizen Monitoring', value: 'Active',        icon: 'Eye',          color: 'text-emerald-400' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/wetlands/${entity.slug}`}
      getCategory={entity => entity.category}
    >
      {/* ── Wetland Focus Typologies & Guilds Filter Bar ───────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Waves className="w-5 h-5 text-sky-400" />
              Wetland Focus Typologies &amp; Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 80 mapped wetlands by conservation status, avian staging importance, or water quality.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-sky-400">{displayedWetlands.length}</strong> of {totalCount} wetlands
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Wetlands ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'ramsar' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('ramsar')}
            className={activeTab === 'ramsar' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <Globe className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Ramsar Sites ({ramsarCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'conservation' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('conservation')}
            className={activeTab === 'conservation' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Conservation Reserves ({conservCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'birds' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('birds')}
            className={activeTab === 'birds' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Bird className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Avian Staging ({birdsCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'good' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('good')}
            className={activeTab === 'good' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Good+ Quality ({goodCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'threatened' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('threatened')}
            className={activeTab === 'threatened' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Under Threat ({threatenedCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'alpine' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('alpine')}
            className={activeTab === 'alpine' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            High Altitude Bogs ({alpineCount})
          </Button>
        </div>
      </div>

      {/* ── Wetland Intelligence & Field Observation Spotlight ─────────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Wetland Intelligence &amp; Field Observation Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on flagship Ramsar reserves, Central Asian Flyway waterfowl, hydric services, and citizen wetland observation.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('ramsar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'ramsar'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ramsar Reserves
            </button>
            <button
              onClick={() => setActiveInsight('birds')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'birds'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Flyway Waterfowl
            </button>
            <button
              onClick={() => setActiveInsight('services')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'services'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hydric Services
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
              Observe Here (Protocols)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Ramsar Reserves */}
          {activeInsight === 'ramsar' && (
            <motion.div
              key="ramsar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipRamsar.map(wetland => (
                <Link
                  key={wetland.id}
                  href={`/water-systems/wetlands/${wetland.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20 hover:border-sky-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" />
                      {wetland.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      wetland.waterQuality?.status === 'excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                      wetland.waterQuality?.status === 'good' ? 'bg-teal-500/20 text-teal-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {wetland.waterQuality?.status?.toUpperCase()}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-sky-300 transition-colors line-clamp-1">
                    {wetland.name}
                  </h5>
                  <div className="text-xs text-sky-400/90 font-medium mt-0.5">
                    {wetland.district} District · {wetland.area} ha / km²
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {wetland.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Elevation: {wetland.elevation}m</span>
                    <span className="text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Explore Reserve <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Flyway Waterfowl */}
          {activeInsight === 'birds' && (
            <motion.div
              key="birds"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                <span className="text-xs font-bold text-sky-400 block mb-1">Winter Migratory Influx</span>
                <h5 className="text-sm font-semibold text-white mb-2">Central Asian Flyway (CAF)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Kashmir wetlands host over 1.2 million wintering waterbirds annually arriving across Siberia, Central Asia, and Xinjiang. Prime species include Bar-headed Goose, Northern Pintail, Gadwall, Eurasian Wigeon, and Mallard.
                </p>
                <div className="text-[11px] text-slate-500">
                  Core Refuges: <span className="text-slate-300">Hokersar (Queen of Wetlands), Shallabugh, Haigam</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Summer Breeding &amp; Sedge Nesters</span>
                <h5 className="text-sm font-semibold text-white mb-2">Resident &amp; Altitudinal Taxa</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Spring and summer bring breeding colonies of Little Bittern, Common Moorhen, Pheasant-tailed Jacana, and Purple Heron into emergent reed beds (*Phragmites australis* and *Typha angustifolia*).
                </p>
                <div className="text-[11px] text-slate-500">
                  Critical Habitats: <span className="text-slate-300">Mirgund, Chatlam, Dal Lake reed margins</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">High-Altitude Plateau Breeders</span>
                <h5 className="text-sm font-semibold text-white mb-2">Changthang Cold Marshes</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Saline-brackish and freshwater marsh complexes in Ladakh host globally endangered breeding populations of the Black-necked Crane (*Grus nigricollis*) and Bar-headed Goose colonies.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Sanctuaries: <span className="text-slate-300">Tso Kar Basin, Tso Moriri, Chushul Marshes</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Hydric Services */}
          {activeInsight === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Peak Flood Buffering</span>
                <h5 className="text-sm font-semibold text-white mb-2">Hydrological Sponges</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Wetlands absorb excess discharge from River Jhelum during spring snowmelt and autumn cloudbursts, mitigating catastrophic inundation across Srinagar and Baramulla.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Carbon Storage</span>
                <h5 className="text-sm font-semibold text-white mb-2">Peat &amp; Hydric Silt</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Anaerobic soils in Kashmir marshes lock up high densities of carbon. Protecting wetlands prevents greenhouse gas release from degraded organic peat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Nutrient Bio-Filtration</span>
                <h5 className="text-sm font-semibold text-white mb-2">Natural Waste Treatment</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extensive macrophyte beds trap agricultural runoff nitrates and phosphates, preventing severe cultural eutrophication of downstream river channels.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20">
                <span className="text-xs font-bold text-purple-400 block mb-1">Groundwater Recharge</span>
                <h5 className="text-sm font-semibold text-white mb-2">Aquifer Maintenance</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Percolation through permeable wetland floors continuously recharges unconfined alluvial shallow aquifers, sustaining rural and community drinking wells.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-sky-950/60 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Citizen Wetland Observation &amp; Watch Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-300">
                        Ramsar Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Log waterfowl census counts, illegal encroachment, silt dumping, or hydrological blockage across Kashmir&apos;s wetland network.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Wetland Observation
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Encroachment
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-sky-400" />
                      Field Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-sky-500/20 hover:border-sky-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-sky-400">
                    <Bird className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Waterfowl Census Protocol</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Conduct morning counts from fixed vantage towers. Record flock size, species ratio, and foraging vs resting activity to support the annual Asian Waterbird Census (AWC).
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-sky-300/80 font-mono">
                    Protocol: Wetlands International AWC
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <Layers className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Sedge &amp; Reedbed Health</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Map boundaries between open water pools and dense *Phragmites* / *Typha* reed stands. An optimal 50:50 hemi-marsh mosaic indicates peak waterfowl nesting capacity.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-300/80 font-mono">
                    Metric: Hemi-Marsh Habitat Index
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Silt Inflow &amp; Weir Levels</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Monitor water levels at regulator gates (e.g. Soibugh inlet at Hokersar). Report premature drying of wetland core or excessive silt deposition smothering benthic feeding beds.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Parameter: Silt Trap Depth &amp; Weir Head
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Invasive Weed Infestation</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Identify aggressive spread of water fern (*Azolla pinnata*) and alligator weed (*Alternanthera philoxeroides*) that block sunlight and induce hypoxic conditions beneath surface mats.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Early Warning: Macrophyte Choke Alert
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
