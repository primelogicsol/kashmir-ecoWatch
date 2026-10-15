'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { fisheriesData, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Fish, Waves, Droplets, Droplet, Mountain, ShieldAlert, Sparkles, MapPin,
  Activity, Compass, AlertTriangle, CheckCircle2, ChevronRight, Eye,
  ShieldCheck, Layers, BarChart3, ArrowRight, FileText, Camera, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FisheriesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'trout' | 'snowtrout' | 'lakes' | 'aquaculture' | 'alpine' | 'threatened'>('all');
  const [activeInsight, setActiveInsight] = useState<'trout' | 'snowtrout' | 'belts' | 'observe'>('trout');

  const categories = useMemo(() => [...new Set(fisheriesData.map(f => f.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(fisheriesData.map(f => f.district))].filter(Boolean).sort(), []);

  const totalCount = fisheriesData.length; // 96
  const troutBeats = useMemo(() => fisheriesData.filter(f => f.category === 'Trout Stream / Beat' || f.category === 'Alpine Lake Fishery').length, []);
  const nativeSnowTrout = useMemo(() => fisheriesData.filter(f => f.category === 'Native Snow Trout System' || f.name.toLowerCase().includes('snow trout') || f.fisheryData?.fishSpecies.some(s => s.toLowerCase().includes('schizothorax'))).length, []);
  const lakeWetlands = useMemo(() => fisheriesData.filter(f => f.category === 'Lake Fisheries' || f.category === 'Wetland Fisheries').length, []);
  const aquaculture = useMemo(() => fisheriesData.filter(f => f.fisheryData?.fisheryType === 'aquaculture').length, []);
  const alpineCount = useMemo(() => fisheriesData.filter(f => (f.elevation || 0) >= 3000 || f.category === 'Alpine Lake Fishery').length, []);
  const threatened = useMemo(() => fisheriesData.filter(f => f.threats && f.threats.length > 0).length, []);

  // Filtered fisheries for listing grid
  const displayedFisheries = useMemo(() => {
    switch (activeTab) {
      case 'trout':
        return fisheriesData.filter(f => f.category === 'Trout Stream / Beat' || f.category === 'Alpine Lake Fishery');
      case 'snowtrout':
        return fisheriesData.filter(f => f.category === 'Native Snow Trout System' || f.name.toLowerCase().includes('snow trout') || f.fisheryData?.fishSpecies.some(s => s.toLowerCase().includes('schizothorax')));
      case 'lakes':
        return fisheriesData.filter(f => f.category === 'Lake Fisheries' || f.category === 'Wetland Fisheries');
      case 'aquaculture':
        return fisheriesData.filter(f => f.fisheryData?.fisheryType === 'aquaculture');
      case 'alpine':
        return fisheriesData.filter(f => (f.elevation || 0) >= 3000 || f.category === 'Alpine Lake Fishery');
      case 'threatened':
        return fisheriesData.filter(f => f.threats && f.threats.length > 0);
      case 'all':
      default:
        return fisheriesData;
    }
  }, [activeTab]);

  const flagshipFisheries = useMemo(() => {
    return fisheriesData.filter(f => 
      f.name.toLowerCase().includes('lidder') || 
      f.name.toLowerCase().includes('sindh') || 
      f.name.toLowerCase().includes('kokernag') || 
      f.name.toLowerCase().includes('bringi') || 
      f.name.toLowerCase().includes('dal') || 
      f.name.toLowerCase().includes('wular')
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Fisheries & Aquatic Ecosystems"
      description="Limnological directory of 96 cold-water trout beats, indigenous snow trout (*Schizothorax*) sanctuaries, lacustrine commercial fisheries, alpine tarn fisheries, and government breeding hatcheries across Jammu, Kashmir, and Ladakh."
      icon="Fish"
      color="from-violet-500 via-purple-600 to-indigo-600"
      entities={displayedFisheries}
      entityType="Fisheries"
      kpis={[
        { label: 'Total Fisheries Mapped', value: totalCount,      icon: 'Fish' },
        { label: 'Royal Trout Beats',      value: troutBeats,       icon: 'Waves',        color: 'text-violet-400' },
        { label: 'Native Snow Trout',      value: nativeSnowTrout,  icon: 'Shield',       color: 'text-cyan-400' },
        { label: 'Lake & Wetland Basins',  value: lakeWetlands,     icon: 'Droplets',     color: 'text-blue-400' },
        { label: 'Breeding Hatcheries',    value: aquaculture,      icon: 'BarChart3',    color: 'text-purple-400' },
        { label: 'Alpine Tarn Fisheries',  value: alpineCount,      icon: 'Mountain',     color: 'text-sky-400' },
        { label: 'Poaching / Mining Stress', value: threatened,     icon: 'AlertTriangle', color: 'text-rose-400' },
        { label: 'Angling & River Watch',  value: 'Active',         icon: 'Eye',          color: 'text-emerald-400' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/fisheries/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.fisheryData ? (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {entity.fisheryData.fishSpecies.slice(0, 4).map((sp, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {sp.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-xs text-slate-400">
              <span>Type: <span className="text-white capitalize">{entity.fisheryData.fisheryType}</span></span>
              <span>Productivity: <span className="text-white capitalize">{entity.fisheryData.productivity}</span></span>
            </div>
          </div>
        ) : null
      }
    >
      {/* ── Fisheries Focus Typologies & Guilds Filter Bar ─────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Fish className="w-5 h-5 text-violet-400" />
              Ichthyological Guilds &amp; Fishery Typologies
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 96 mapped fisheries by salmonid trout beats, native snow trout refuges, or lake commercial grounds.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-violet-400">{displayedFisheries.length}</strong> of {totalCount} fisheries
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-lg shadow-violet-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Fisheries ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'trout' ? 'default' : 'outline'}
            onClick={() => setActiveTab('trout')}
            className={activeTab === 'trout' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <Waves className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Royal Trout Beats ({troutBeats})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'snowtrout' ? 'default' : 'outline'}
            onClick={() => setActiveTab('snowtrout')}
            className={activeTab === 'snowtrout' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <Shield className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Native Snow Trout ({nativeSnowTrout})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'lakes' ? 'default' : 'outline'}
            onClick={() => setActiveTab('lakes')}
            className={activeTab === 'lakes' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Droplets className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Lakes &amp; Wetlands ({lakeWetlands})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'aquaculture' ? 'default' : 'outline'}
            onClick={() => setActiveTab('aquaculture')}
            className={activeTab === 'aquaculture' ? 'bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-950/40' : 'border-white/10 text-purple-300 hover:text-white'}
          >
            <BarChart3 className="w-3.5 h-3.5 mr-1 text-purple-300" />
            Aquaculture / Hatcheries ({aquaculture})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'alpine' ? 'default' : 'outline'}
            onClick={() => setActiveTab('alpine')}
            className={activeTab === 'alpine' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-sky-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-sky-300" />
            Alpine Tarn Fisheries ({alpineCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'threatened' ? 'default' : 'outline'}
            onClick={() => setActiveTab('threatened')}
            className={activeTab === 'threatened' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Under Threat ({threatened})
          </Button>
        </div>
      </div>

      {/* ── Fisheries Intelligence & Field Observation Spotlight ───────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Ichthyological Intelligence &amp; Fishery Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on world-class trout angling beats, indigenous snow trout breeding gravels, thermal zonation, and citizen stream watch.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('trout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'trout'
                  ? 'bg-violet-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Royal Trout Beats
            </button>
            <button
              onClick={() => setActiveInsight('snowtrout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'snowtrout'
                  ? 'bg-violet-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Native Snow Trout (Schizothorax)
            </button>
            <button
              onClick={() => setActiveInsight('belts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'belts'
                  ? 'bg-violet-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Thermal Ichthyo-Zones
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
              Observe Here (Angler Watch)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Royal Trout Beats */}
          {activeInsight === 'trout' && (
            <motion.div
              key="trout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipFisheries.map(item => (
                <Link
                  key={item.id}
                  href={`/water-systems/fisheries/${item.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20 hover:border-violet-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1">
                      <Fish className="w-2.5 h-2.5" />
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {item.district} District
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-violet-300 transition-colors line-clamp-1">
                    {item.name}
                  </h5>
                  <div className="text-xs text-violet-400/90 font-medium mt-0.5">
                    Watershed: {item.watershed} · Elev: {item.elevation}m
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Productivity: {item.fisheryData?.productivity || 'Moderate'}</span>
                    <span className="text-violet-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      View Beat <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Native Snow Trout */}
          {activeInsight === 'snowtrout' && (
            <motion.div
              key="snowtrout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Ale Gad (Kashmiri Snow Trout)</span>
                <h5 className="text-sm font-semibold text-white mb-2">*Schizothorax niger*</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Endemic lacustrine specialist inhabiting Dal and Wular lakes and quiet river pools. Features a blunt snout and suctorial lower lip adapted for grazing benthic periphyton algae off sunken stones.
                </p>
                <div className="text-[11px] text-slate-500">
                  IUCN Status: <span className="text-amber-300">Vulnerable (Declining due to Carp competition)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Chhurru (Torrent Snow Trout)</span>
                <h5 className="text-sm font-semibold text-white mb-2">*Schizothorax esocinus*</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Long-snouted predatory snow trout inhabiting fast-flowing glacial torrents of Lidder, Sindh, and Kishanganga. Migrates upstream into gravel beds to breed during June–August monsoon floods.
                </p>
                <div className="text-[11px] text-slate-500">
                  Threat: <span className="text-rose-300">Riverbed gravel mining destroying spawning redds</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400 block mb-1">Sattar Gad (Hillstream Loach)</span>
                <h5 className="text-sm font-semibold text-white mb-2">*Triplophysa kashmirensis*</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Benthic stone loach specialized for cold torrential snowmelt torrents above 2,200m. Highly sensitive indicator of pesticide runoff and dissolved oxygen depletion.
                </p>
                <div className="text-[11px] text-slate-500">
                  Habitat: <span className="text-slate-300">Fast riffles beneath submerged granite boulders</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Thermal Ichthyo-Zones */}
          {activeInsight === 'belts' && (
            <motion.div
              key="belts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                <span className="text-xs font-bold text-sky-400 block mb-1">Alpine Cold Stenothermal</span>
                <h5 className="text-sm font-semibold text-white mb-2">2,500m – 3,800m (Temp &lt;12°C)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Brown Trout (*Salmo trutta fario*) and high-altitude loaches. Cold, torrential waters with DO &gt; 9.5 mg/L, feeding on stonefly and caddisfly nymphs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Subalpine Trout-Schizothorax</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,800m – 2,500m (Temp 12°C–16°C)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Transition zone where Rainbow Trout (*Oncorhynchus mykiss*) and *Schizothorax plagiostomus* co-occur in deep pools and boulder cascades.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Valley Fluvial Axis</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,500m – 1,800m (Temp 16°C–22°C)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Jhelum river and valley lakes. Dominated by invasive Common Carp (*Cyprinus carpio*) and Grass Carp, with declining native *Schizothorax niger*.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20">
                <span className="text-xs font-bold text-purple-400 block mb-1">Sub-Tropical Foot-Hills</span>
                <h5 className="text-sm font-semibold text-white mb-2">&lt;1,000m (Temp 20°C–28°C)</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Jammu plains and lower Chenab. Golden Mahseer (*Tor putitora*), Indian Major Carps (Rohu, Catla, Mrigal), and freshwater prawns.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-indigo-950/60 border border-violet-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Citizen Angler &amp; Fishery Watch Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-violet-500/40 text-violet-300">
                        Fishery Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit angling catch-and-release logs, fish mortality events, illegal bleaching/dynamiting alerts, or native snow trout sightings.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Fish Sighting
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Poaching / Bleaching
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-violet-400" />
                      Angling Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-violet-500/20 hover:border-violet-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-violet-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Catch &amp; Release Log</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Record fish length (fork length in cm), weight, hook-wound severity, and water temperature. Handle trout with wet hands to protect mucosal coating.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-violet-300/80 font-mono">
                    Protocol: Angling Association Catch Log
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Bleaching Powder &amp; Electro-Poaching</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Report chemical bleaching powder or automotive battery electro-fishing in side channels. Wipes out entire benthic invertebrate and fry cohorts.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Statutory Rule: J&amp;K Fisheries Act
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <Fish className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Snow Trout Spawning Redds</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Identify clean gravel nests (redds) excavated by female *Schizothorax* in shallow riffles (10–30cm depth). Report silt burial or wading disturbance.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-cyan-300/80 font-mono">
                    Indicator: Spawning Redd Integrity
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Invasive Common Carp Ratio</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Estimate catch ratios of Common Carp (*Cyprinus carpio*) vs native Snow Trout in lake hauls. Ratios exceeding 85:15 indicate critical native displacement.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Biomonitoring: Invasive Carp Dominance Index
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
