'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { glaciersData, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Mountain, Layers, Compass, AlertTriangle, TrendingDown, ArrowUp,
  BarChart3, MapPin, Sparkles, Activity, CheckCircle2, ChevronRight,
  Eye, ShieldCheck, Waves, Wind, ArrowRight, FileText, Camera, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlaciersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'valley' | 'cirque' | 'glof' | 'retreating' | 'highalt' | 'karakoram'>('all');
  const [activeInsight, setActiveInsight] = useState<'flagships' | 'massbalance' | 'glof' | 'observe'>('flagships');

  const categories = useMemo(() => [...new Set(glaciersData.map(g => g.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(glaciersData.map(g => g.district))].filter(Boolean).sort(), []);

  const totalCount = glaciersData.length; // 99
  const retreating = useMemo(() => glaciersData.filter(g => g.threats?.some(t => t.toLowerCase().includes('retreat') || t.toLowerCase().includes('melting'))).length, []);
  const valleyGlaciers = useMemo(() => glaciersData.filter(g => g.category === 'Valley Glacier').length, []);
  const cirqueGlaciers = useMemo(() => glaciersData.filter(g => g.category === 'Cirque Glacier' || g.category === 'Hanging Glacier').length, []);
  const surgeAndGlosRisk = useMemo(() => glaciersData.filter(g => g.category === 'Surge Glacier' || g.hydrologicalData?.floodRisk === 'high' || g.hydrologicalData?.floodRisk === 'critical').length, []);
  const highAlt = useMemo(() => glaciersData.filter(g => (g.elevation || 0) >= 4000).length, []);
  const karakoramCount = useMemo(() => glaciersData.filter(g => g.region === 'Ladakh' || g.region === 'Gilgit-Baltistan' || (g.elevation || 0) >= 4800).length, []);
  const totalGlaciatedArea = Math.round(glaciersData.reduce((sum, g) => sum + (g.area || 0), 0));

  // Filtered glaciers for listing grid
  const displayedGlaciers = useMemo(() => {
    switch (activeTab) {
      case 'valley':
        return glaciersData.filter(g => g.category === 'Valley Glacier');
      case 'cirque':
        return glaciersData.filter(g => g.category === 'Cirque Glacier' || g.category === 'Hanging Glacier');
      case 'glof':
        return glaciersData.filter(g => g.category === 'Surge Glacier' || g.hydrologicalData?.floodRisk === 'high' || g.hydrologicalData?.floodRisk === 'critical');
      case 'retreating':
        return glaciersData.filter(g => g.threats?.some(t => t.toLowerCase().includes('retreat') || t.toLowerCase().includes('melting')));
      case 'highalt':
        return glaciersData.filter(g => (g.elevation || 0) >= 4000);
      case 'karakoram':
        return glaciersData.filter(g => g.region === 'Ladakh' || g.region === 'Gilgit-Baltistan' || (g.elevation || 0) >= 4800);
      case 'all':
      default:
        return glaciersData;
    }
  }, [activeTab]);

  const flagshipGlaciers = useMemo(() => {
    return glaciersData.filter(g => 
      ['kolahoi-glacier', 'machoi-glacier', 'thajiwas-glacier', 'parkachik-glacier', 'drang-drung-glacier', 'siachen-glacier', 'harmukh-glacier', 'hapatnar-glacier'].includes(g.slug) ||
      g.name.toLowerCase().includes('kolahoi') || g.name.toLowerCase().includes('machoi') || g.name.toLowerCase().includes('thajiwas')
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Cryosphere & Glaciers"
      description="Authoritative glaciological registry of 99 valley glaciers, hanging cirques, surging ice streams, periglacial rock glaciers, and high-altitude meltwater catchments across the Kashmir Himalaya, Ladakh, Karakoram, and Pir Panjal."
      icon="Mountain"
      color="from-slate-400 via-sky-500 to-indigo-600"
      entities={displayedGlaciers}
      entityType="Glaciers"
      kpis={[
        { label: 'Total Glaciers Mapped', value: totalCount,          icon: 'Mountain',     color: 'text-sky-300' },
        { label: 'Valley Glaciers',      value: valleyGlaciers,       icon: 'Layers',       color: 'text-blue-400' },
        { label: 'Cirques & Hangs',      value: cirqueGlaciers,       icon: 'Compass',      color: 'text-teal-400' },
        { label: 'GLOF / Surge Risk',    value: surgeAndGlosRisk,     icon: 'AlertTriangle', color: 'text-amber-400' },
        { label: 'Snout Retreat Stress', value: retreating,           icon: 'TrendingDown', color: 'text-rose-400' },
        { label: 'Above 4,000m',         value: highAlt,              icon: 'ArrowUp',      color: 'text-indigo-400' },
        { label: 'Mapped Ice Area',      value: `${totalGlaciatedArea.toLocaleString()} km²`, icon: 'BarChart3', color: 'text-cyan-400' },
        { label: 'Cryosphere Watch',     value: 'Active',             icon: 'Eye',          color: 'text-emerald-400' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/glaciers/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.area ? { label: 'Area', value: `${entity.area} km²` } : null}
    >
      {/* ── Cryosphere Focus Typologies & Guilds Filter Bar ────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mountain className="w-5 h-5 text-sky-400" />
              Cryospheric Morphology &amp; Risk Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 99 mapped glaciers by glacial morphology, GLOF susceptibility, or snout retreat stress.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-sky-400">{displayedGlaciers.length}</strong> of {totalCount} glaciers
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Glaciers ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'valley' ? 'default' : 'outline'}
            onClick={() => setActiveTab('valley')}
            className={activeTab === 'valley' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <Layers className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Valley Glaciers ({valleyGlaciers})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'cirque' ? 'default' : 'outline'}
            onClick={() => setActiveTab('cirque')}
            className={activeTab === 'cirque' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <Compass className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Cirques &amp; Hangs ({cirqueGlaciers})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'glof' ? 'default' : 'outline'}
            onClick={() => setActiveTab('glof')}
            className={activeTab === 'glof' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-300" />
            GLOF / Surge Risk ({surgeAndGlosRisk})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'retreating' ? 'default' : 'outline'}
            onClick={() => setActiveTab('retreating')}
            className={activeTab === 'retreating' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <TrendingDown className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Snout Retreat Stress ({retreating})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'highalt' ? 'default' : 'outline'}
            onClick={() => setActiveTab('highalt')}
            className={activeTab === 'highalt' ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-950/40' : 'border-white/10 text-indigo-300 hover:text-white'}
          >
            <ArrowUp className="w-3.5 h-3.5 mr-1 text-indigo-300" />
            Above 4,000m ({highAlt})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'karakoram' ? 'default' : 'outline'}
            onClick={() => setActiveTab('karakoram')}
            className={activeTab === 'karakoram' ? 'bg-slate-700 hover:bg-slate-600 text-white font-medium shadow-lg shadow-slate-950/40' : 'border-white/10 text-slate-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-slate-300" />
            Trans-Himalayan / Giants ({karakoramCount})
          </Button>
        </div>
      </div>

      {/* ── Cryosphere Intelligence & Field Observation Spotlight ──────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Glaciological Intelligence &amp; Cryosphere Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Snout recession rates, equilibrium line altitudes (ELA), moraine dam breach mechanics, and citizen expedition monitoring.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('flagships')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'flagships'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Flagship Glaciers
            </button>
            <button
              onClick={() => setActiveInsight('massbalance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'massbalance'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mass Balance &amp; ELA
            </button>
            <button
              onClick={() => setActiveInsight('glof')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'glof'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              GLOF Moraine Breach
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
              Observe Here (Glacier Watch)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Flagships */}
          {activeInsight === 'flagships' && (
            <motion.div
              key="flagships"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipGlaciers.map(glacier => (
                <Link
                  key={glacier.id}
                  href={`/water-systems/glaciers/${glacier.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20 hover:border-sky-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                      <Mountain className="w-2.5 h-2.5" />
                      {glacier.category}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                      {glacier.district} District
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-sky-300 transition-colors line-clamp-1">
                    {glacier.name}
                  </h5>
                  <div className="text-xs text-sky-400/90 font-medium mt-0.5">
                    {glacier.area ? `${glacier.area} km² ice area` : `Elevation: ${glacier.elevation}m`}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {glacier.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Elevation: {glacier.elevation}m</span>
                    <span className="text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Explore Glacier <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Mass Balance & ELA */}
          {activeInsight === 'massbalance' && (
            <motion.div
              key="massbalance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Accelerated Snout Recession</span>
                <h5 className="text-sm font-semibold text-white mb-2">Kolahoi Glacier (Gwash Brari)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Kashmir&apos;s apex water tower has retreated over 1.2 km since 1962, with recession rates accelerating from 9.8 m/yr to over 21 m/yr in recent decades due to rising summer isotherms and black carbon soot deposition.
                </p>
                <div className="text-[11px] text-slate-500">
                  Mass Balance Deficit: <span className="text-rose-300">-0.48 m w.e. / year</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Highway Proximity Thawing</span>
                <h5 className="text-sm font-semibold text-white mb-2">Machoi Glacier (Zoji La NH-1)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Vehicle emissions along the Srinagar-Leh highway deposit aerosol dust on Machoi&apos;s ablation zone, reducing surface albedo by 18% and accelerating melting during early summer months.
                </p>
                <div className="text-[11px] text-slate-500">
                  Equilibrium Line Rise: <span className="text-amber-300">+140m over 30 years</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Supraglacial Debris Shield</span>
                <h5 className="text-sm font-semibold text-white mb-2">Drang-Drung (Zanskar)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  A 23-km long valley glacier where thick supraglacial debris cover (&gt;0.5m) in the lower tongue acts as a thermal blanket, dampening melt rates compared to clean-ice hanging glaciers.
                </p>
                <div className="text-[11px] text-slate-500">
                  Debris Insulation: <span className="text-slate-300">Protects tongue from direct solar melt</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: GLOF Moraine Breach */}
          {activeInsight === 'glof' && (
            <motion.div
              key="glof"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Proglacial Lake Expansion</span>
                <h5 className="text-sm font-semibold text-white mb-2">Meltwater Impoundment</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Receding ice snouts leave deep depressions impounded by loose, un-cemented terminal moraines composed of unconsolidated till and buried ice cores.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Trigger Mechanisms</span>
                <h5 className="text-sm font-semibold text-white mb-2">Rockfalls &amp; Avalanches</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hanging serac collapse or earthquake-triggered rockslides plunging into proglacial lakes generate displacement waves that overtop the moraine crest.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Erosional Breach</span>
                <h5 className="text-sm font-semibold text-white mb-2">Catastrophic Outburst</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Water overtopping cuts rapidly through unconsolidated gravel, widening a breach within hours and releasing millions of cubic meters of water and boulders.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Early Warning &amp; Siphoning</span>
                <h5 className="text-sm font-semibold text-white mb-2">Mitigation Engineering</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automated lake-level sensor buoys with satellite telemetry combined with artificial spillway siphons lower dangerous hydrostatic head pressure.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950/60 via-slate-900 to-sky-950/60 border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Cryosphere Expedition Watch &amp; Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-sky-500/40 text-sky-300">
                        Alpine Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit fixed-point snout photography, supraglacial lake expansions, fresh crevasse formations, or ice-dam seepage sightings.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Cryosphere Record
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report GLOF / Lake Threat
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-sky-400" />
                      Alpine Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-sky-500/20 hover:border-sky-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-sky-400">
                    <Camera className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Snout Repeat Photography</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Stand at a documented fixed GPS benchmark facing the glacier snout. Replicate historical photo angles to measure visual retreat of the ice cave terminus.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-sky-300/80 font-mono">
                    Protocol: Repeat Photography Snout Archive
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Supraglacial Melt Ponds</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Document turquoise meltwater pools forming on the glacier surface. Ponds absorb solar heat, melting vertical moulins that funnel warm water to the bedrock bed.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Indicator: Hydro-Fracturing &amp; Basal Slip
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Moraine Dam Seepage</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Inspect the downstream toe of terminal moraines impounding glacial lakes. Turbid, muddy piping springs emerging from the moraine toe signal internal core erosion.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Early Warning: Piping Failure Risk
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-teal-400">
                    <Compass className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Crevasse Opening &amp; Calving</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Map widening transverse or longitudinal bergschrund crevasses near the headwall. Rapid opening indicates accelerated extensional ice flow and impending ice avalanche risk.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-teal-300/80 font-mono">
                    Monitoring: Extensional Strain Rate
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
