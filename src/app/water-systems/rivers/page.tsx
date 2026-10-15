'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { riversData, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Wind, Waves, Droplet, Droplets, Mountain, ShieldAlert, Sparkles, MapPin,
  Activity, Compass, AlertTriangle, CheckCircle2, ChevronRight, Eye,
  ShieldCheck, Layers, GitBranch, BarChart3, Globe, ArrowRight, FileText,
  Camera, Fish
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RiversPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'major' | 'trout' | 'tributaries' | 'good' | 'threatened' | 'transboundary'>('all');
  const [activeInsight, setActiveInsight] = useState<'major' | 'trout' | 'belts' | 'observe'>('major');

  const categories = useMemo(() => [...new Set(riversData.map(r => r.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(riversData.map(r => r.district))].filter(Boolean).sort(), []);

  const totalCount = riversData.length; // 127
  const majorCount = useMemo(() => riversData.filter(r => r.category?.toLowerCase().includes('major') || ['jhelum-river', 'chenab-river', 'indus-river', 'kishanganga-river', 'lidder-river', 'sindh-river'].includes(r.slug)).length, []);
  const troutCount = useMemo(() => riversData.filter(r => r.biodiversity?.some(b => b.toLowerCase().includes('trout')) || ['lidder-river', 'sindh-river', 'bringi-river', 'madhumati-stream', 'erin-stream', 'ferozepora-stream'].includes(r.slug)).length, []);
  const tributariesCount = useMemo(() => riversData.filter(r => r.type === 'stream' || r.category?.toLowerCase().includes('tributary') || r.category?.toLowerCase().includes('stream')).length, []);
  const goodCount = useMemo(() => riversData.filter(r => ['excellent', 'good'].includes(r.waterQuality?.status || '')).length, []);
  const threatenedCount = useMemo(() => riversData.filter(r => r.threats && r.threats.length > 0).length, []);
  const transboundaryCount = useMemo(() => riversData.filter(r => r.region === 'AJK' || r.region === 'Gilgit-Baltistan' || r.category?.toLowerCase().includes('transboundary')).length, []);

  // Filtered rivers for listing grid
  const displayedRivers = useMemo(() => {
    switch (activeTab) {
      case 'major':
        return riversData.filter(r => r.category?.toLowerCase().includes('major') || ['jhelum-river', 'chenab-river', 'indus-river', 'kishanganga-river', 'lidder-river', 'sindh-river'].includes(r.slug));
      case 'trout':
        return riversData.filter(r => r.biodiversity?.some(b => b.toLowerCase().includes('trout')) || ['lidder-river', 'sindh-river', 'bringi-river', 'madhumati-stream', 'erin-stream', 'ferozepora-stream'].includes(r.slug));
      case 'tributaries':
        return riversData.filter(r => r.type === 'stream' || r.category?.toLowerCase().includes('tributary') || r.category?.toLowerCase().includes('stream'));
      case 'good':
        return riversData.filter(r => ['excellent', 'good'].includes(r.waterQuality?.status || ''));
      case 'threatened':
        return riversData.filter(r => r.threats && r.threats.length > 0);
      case 'transboundary':
        return riversData.filter(r => r.region === 'AJK' || r.region === 'Gilgit-Baltistan' || r.category?.toLowerCase().includes('transboundary'));
      case 'all':
      default:
        return riversData;
    }
  }, [activeTab]);

  const flagshipRivers = useMemo(() => {
    return riversData.filter(r => 
      ['jhelum-river', 'chenab-river', 'indus-river', 'kishanganga-river', 'lidder-river', 'sindh-river', 'veshaw-river', 'rambiara-river'].includes(r.slug)
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Rivers & Streams"
      description="Comprehensive hydrological directory of 127 major rivers, cold-water trout tributaries, alpine torrential streams, drainage corridors, and transboundary Himalayan river systems across Kashmir, Jammu, Ladakh, and extended basins."
      icon="Wind"
      color="from-indigo-600 via-blue-600 to-cyan-500"
      entities={displayedRivers}
      entityType="Rivers & Streams"
      kpis={[
        { label: 'Total Fluvial Systems', value: totalCount,          icon: 'Wind' },
        { label: 'Major River Arteries', value: majorCount,          icon: 'Waves',        color: 'text-indigo-400' },
        { label: 'Cold-Water Trout Streams', value: troutCount,      icon: 'Fish',         color: 'text-cyan-400' },
        { label: 'Tributaries & Torrents', value: tributariesCount,  icon: 'GitBranch',    color: 'text-purple-400' },
        { label: 'Good+ Water Quality',  value: goodCount,           icon: 'Activity',     color: 'text-emerald-400' },
        { label: 'Under Threat / Mining', value: threatenedCount,    icon: 'AlertTriangle', color: 'text-amber-400' },
        { label: 'Transboundary Basins', value: transboundaryCount,  icon: 'Globe',        color: 'text-sky-400' },
        { label: 'River Watch Telemetry', value: 'Active',           icon: 'Eye',          color: 'text-teal-400' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/rivers/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.length ? { label: 'Length', value: `${entity.length} km` } : null}
    >
      {/* ── River Focus Typologies & Guilds Filter Bar ─────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wind className="w-5 h-5 text-indigo-400" />
              Fluvial Focus Typologies &amp; Drainage Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 127 mapped rivers and streams by arterial hierarchy, cold-water trout suitability, or mining stress.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-indigo-400">{displayedRivers.length}</strong> of {totalCount} systems
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Rivers &amp; Streams ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'major' ? 'default' : 'outline'}
            onClick={() => setActiveTab('major')}
            className={activeTab === 'major' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Waves className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Major Arteries ({majorCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'trout' ? 'default' : 'outline'}
            onClick={() => setActiveTab('trout')}
            className={activeTab === 'trout' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <Fish className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Trout Streams ({troutCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'tributaries' ? 'default' : 'outline'}
            onClick={() => setActiveTab('tributaries')}
            className={activeTab === 'tributaries' ? 'bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-950/40' : 'border-white/10 text-purple-300 hover:text-white'}
          >
            <GitBranch className="w-3.5 h-3.5 mr-1 text-purple-300" />
            Tributaries &amp; Nallahs ({tributariesCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'good' ? 'default' : 'outline'}
            onClick={() => setActiveTab('good')}
            className={activeTab === 'good' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Good+ Quality ({goodCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'threatened' ? 'default' : 'outline'}
            onClick={() => setActiveTab('threatened')}
            className={activeTab === 'threatened' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Under Threat ({threatenedCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'transboundary' ? 'default' : 'outline'}
            onClick={() => setActiveTab('transboundary')}
            className={activeTab === 'transboundary' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-sky-300 hover:text-white'}
          >
            <Globe className="w-3.5 h-3.5 mr-1 text-sky-300" />
            Transboundary ({transboundaryCount})
          </Button>
        </div>
      </div>

      {/* ── Riverine Intelligence & Field Observation Spotlight ─────────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Riverine Intelligence &amp; Field Observation Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on flagship Himalayan river arteries, cold-water trout habitats, longitudinal flow zones, and citizen stream monitoring.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('major')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'major'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Major Arteries
            </button>
            <button
              onClick={() => setActiveInsight('trout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'trout'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cold-Water Trout Streams
            </button>
            <button
              onClick={() => setActiveInsight('belts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'belts'
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Longitudinal Flow Belts
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
              Observe Here (Stream Watch)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Major Arteries */}
          {activeInsight === 'major' && (
            <motion.div
              key="major"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipRivers.map(river => (
                <Link
                  key={river.id}
                  href={`/water-systems/rivers/${river.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                      <Wind className="w-2.5 h-2.5" />
                      {river.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      river.waterQuality?.status === 'excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                      river.waterQuality?.status === 'good' ? 'bg-teal-500/20 text-teal-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {river.waterQuality?.status?.toUpperCase()}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {river.name}
                  </h5>
                  <div className="text-xs text-indigo-400/90 font-medium mt-0.5">
                    {river.district} District · {river.watershed}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {river.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{river.length ? `${river.length} km length` : `Elev: ${river.elevation}m`}</span>
                    <span className="text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Explore River <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Cold-Water Trout Streams */}
          {activeInsight === 'trout' && (
            <motion.div
              key="trout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Brown Trout Sanctuaries</span>
                <h5 className="text-sm font-semibold text-white mb-2">Lidder &amp; Sindh Corridors</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Glacial meltwaters from Kolahoi and Zoji La generate torrential cold-water streams (water temp &lt;14°C) with exceptional dissolved oxygen (&gt;9.5 mg/L), making them world-famous fly-fishing beats for Brown Trout (*Salmo trutta fario*).
                </p>
                <div className="text-[11px] text-slate-500">
                  Prime Beats: <span className="text-slate-300">Laripora, Batakote, Wayil, Mammar</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Native Snow Trout Strongholds</span>
                <h5 className="text-sm font-semibold text-white mb-2">Schizothorax River Refuges</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Indigenous Himalayan Snow Trout (*Schizothorax plagiostomus*, *S. niger*) thrive across mid-altitude braided sections of Veshaw, Rambiara, and Bringi, relying on gravel beds for monsoon breeding runs.
                </p>
                <div className="text-[11px] text-slate-500">
                  Key Spawning Grounds: <span className="text-slate-300">Bringi upstream, Kokernag outflow, Aharbal</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400 block mb-1">Trans-Himalayan Torrent Ecology</span>
                <h5 className="text-sm font-semibold text-white mb-2">Kishanganga &amp; Suru Torrents</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  High-velocity river systems carving deep rocky gorges across Gurez and Kargil. Hosts specialized rheophilic macroinvertebrates and cold-adapted fish species under severe seasonal velocity regimes.
                </p>
                <div className="text-[11px] text-slate-500">
                  Ecosystem Focus: <span className="text-slate-300">Gurez Valley, Dras River junction</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Longitudinal Flow Belts */}
          {activeInsight === 'belts' && (
            <motion.div
              key="belts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                <span className="text-xs font-bold text-sky-400 block mb-1">Crenon (Glacial Headwaters)</span>
                <h5 className="text-sm font-semibold text-white mb-2">2,800m – 4,500m</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Steep, torrential snow-fed streams with boulder beds, near-freezing temperatures, and high dissolved oxygen. Dominated by stonefly nymphs (*Plecoptera*).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                <span className="text-xs font-bold text-indigo-400 block mb-1">Rhithron (Foothill Torrents)</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,800m – 2,800m</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fast-flowing gravel-bed channels cutting through pine forests. Optimum temperature range for salmonids and native snow trout spawning migrations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Potamon (Valley Meanders)</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,500m – 1,800m</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Low-gradient, slow-moving floodplain rivers with silt-sand substrates. Jhelum axis supporting extensive irrigation, urban water supply, and carp fisheries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Gorge Outflow &amp; Cascades</span>
                <h5 className="text-sm font-semibold text-white mb-2">Lower Elevation Exits</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-energy bedrock channels exiting through the Pir Panjal (e.g. Baramulla gorge to Uri, Chenab gorge). Critical for hydropower generation and downstream flow agreements.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/60 border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Stream Watch &amp; Riverine Citizen Science</span>
                      <Badge variant="outline" className="text-[10px] border-indigo-500/40 text-indigo-300">
                        River Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit streamflow telemetry, water clarity observations, riverbed sand mining violations, or fish kill alerts.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Stream Observation
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Riverbed Mining
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                      Stream Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-indigo-400">
                    <BarChart3 className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Surface Velocity Float Test</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Drop a biodegradable float over a measured 10-meter reach. Record travel time in seconds. Multiply by 0.85 coefficient to estimate cross-sectional streamflow velocity.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-indigo-300/80 font-mono">
                    Protocol: USGS Surface Float Method
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Riverbed Sand Mining Alert</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Document illegal heavy excavator operation in river channels (Veshaw, Rambiara, Doodh Ganga). Sand extraction destroys trout breeding gravels and triggers bridge pier scouring.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Enforcement: J&amp;K Geology &amp; Mining Act
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-teal-400">
                    <Fish className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Benthic Macroinvertebrates</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Turn over riffle stones to check for mayflies (*Ephemeroptera*), stoneflies (*Plecoptera*), and caddisflies (*Trichoptera*). High EPT diversity confirms excellent water oxygenation.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-teal-300/80 font-mono">
                    Biomonitoring: EPT Richness Index
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Outfall Effluent Tracking</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Trace untreated sewage or industrial drains discharging into municipal river stretches. Note color, foaming, and petrochemical odor to flag critical pollution violations.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Compliance: CPCB River Water Criteria
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
