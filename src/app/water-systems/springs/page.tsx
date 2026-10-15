'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { springsData, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Droplet, Droplets, Mountain, Waves, ShieldAlert, Sparkles, MapPin,
  Activity, Compass, AlertTriangle, CheckCircle2, ChevronRight, Eye,
  ShieldCheck, Layers, RefreshCw, Sun, Flame, ArrowRight, FileText,
  Camera, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpringsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'karst' | 'heritage' | 'thermal' | 'good' | 'threatened' | 'alpine'>('all');
  const [activeInsight, setActiveInsight] = useState<'karst' | 'thermal' | 'hydrogeology' | 'observe'>('karst');

  const categories = useMemo(() => [...new Set(springsData.map(s => s.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(springsData.map(s => s.district))].filter(Boolean).sort(), []);

  const totalCount = springsData.length; // 100
  const karstCount = useMemo(() => springsData.filter(s => s.category?.toLowerCase().includes('karst') || s.category?.toLowerCase().includes('major') || ['kokernag-spring', 'achabal-spring', 'verinag-spring', 'panzath-spring'].includes(s.slug)).length, []);
  const heritageCount = useMemo(() => springsData.filter(s => ['verinag-spring', 'chashma-shahi', 'kheer-bhawani-spring', 'panzath-spring', 'martand-spring', 'mattan-spring'].includes(s.slug) || s.category?.toLowerCase().includes('sacred') || s.category?.toLowerCase().includes('heritage')).length, []);
  const thermalCount = useMemo(() => springsData.filter(s => s.category?.toLowerCase().includes('hot') || s.category?.toLowerCase().includes('thermal') || s.category?.toLowerCase().includes('sulphur')).length, []);
  const goodCount = useMemo(() => springsData.filter(s => ['excellent', 'good'].includes(s.waterQuality?.status || '')).length, []);
  const threatenedCount = useMemo(() => springsData.filter(s => s.threats && s.threats.length > 0).length, []);
  const alpineCount = useMemo(() => springsData.filter(s => (s.elevation || 0) >= 2000 || s.category?.toLowerCase().includes('alpine') || s.category?.toLowerCase().includes('high')).length, []);

  // Filtered springs for listing grid
  const displayedSprings = useMemo(() => {
    switch (activeTab) {
      case 'karst':
        return springsData.filter(s => s.category?.toLowerCase().includes('karst') || s.category?.toLowerCase().includes('major') || ['kokernag-spring', 'achabal-spring', 'verinag-spring', 'panzath-spring'].includes(s.slug));
      case 'heritage':
        return springsData.filter(s => ['verinag-spring', 'chashma-shahi', 'kheer-bhawani-spring', 'panzath-spring', 'martand-spring', 'mattan-spring'].includes(s.slug) || s.category?.toLowerCase().includes('sacred') || s.category?.toLowerCase().includes('heritage'));
      case 'thermal':
        return springsData.filter(s => s.category?.toLowerCase().includes('hot') || s.category?.toLowerCase().includes('thermal') || s.category?.toLowerCase().includes('sulphur'));
      case 'good':
        return springsData.filter(s => ['excellent', 'good'].includes(s.waterQuality?.status || ''));
      case 'threatened':
        return springsData.filter(s => s.threats && s.threats.length > 0);
      case 'alpine':
        return springsData.filter(s => (s.elevation || 0) >= 2000 || s.category?.toLowerCase().includes('alpine') || s.category?.toLowerCase().includes('high'));
      case 'all':
      default:
        return springsData;
    }
  }, [activeTab]);

  const flagshipSprings = useMemo(() => {
    return springsData.filter(s => 
      ['kokernag-spring', 'achabal-spring', 'verinag-spring', 'chashma-shahi', 'panzath-spring', 'martand-spring', 'tatapani-hot-spring', 'chumathang-hot-spring'].includes(s.slug) ||
      s.name.toLowerCase().includes('kokernag') || s.name.toLowerCase().includes('verinag') || s.name.toLowerCase().includes('achabal')
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Springs & Springsheds"
      description="Hydrogeological inventory of 100 artesian karst springs, community drinking springsheds, thermal geothermal vents, and sacred Himalayan water sources across Kashmir, Jammu, and Ladakh."
      icon="Droplet"
      color="from-emerald-600 via-teal-600 to-cyan-500"
      entities={displayedSprings}
      entityType="Springs"
      kpis={[
        { label: 'Total Springs Mapped', value: totalCount,          icon: 'Droplet' },
        { label: 'Major Karst Springs',  value: karstCount,          icon: 'Waves',        color: 'text-emerald-400' },
        { label: 'Heritage & Sacred',    value: heritageCount,       icon: 'Sparkles',     color: 'text-amber-400' },
        { label: 'Thermal / Geothermal', value: thermalCount,        icon: 'Flame',        color: 'text-orange-400' },
        { label: 'Good+ Water Quality',  value: goodCount,           icon: 'Activity',     color: 'text-teal-400' },
        { label: 'Recharge Area Stress', value: threatenedCount,     icon: 'AlertTriangle', color: 'text-rose-400' },
        { label: 'Districts Mapped',     value: districts.length,    icon: 'MapPin' },
        { label: 'Spring Watch Telemetry', value: 'Active',          icon: 'Eye',          color: 'text-cyan-400' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={entity => `/water-systems/springs/${entity.slug}`}
      getCategory={entity => entity.category}
    >
      {/* ── Spring Focus Typologies & Guilds Filter Bar ────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Droplet className="w-5 h-5 text-emerald-400" />
              Springshed Typologies &amp; Hydrogeological Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 100 mapped springs by hydrogeological mechanism, heritage status, or geothermal activity.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-emerald-400">{displayedSprings.length}</strong> of {totalCount} springs
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Springs ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'karst' ? 'default' : 'outline'}
            onClick={() => setActiveTab('karst')}
            className={activeTab === 'karst' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <Waves className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Karst Resurgences ({karstCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'heritage' ? 'default' : 'outline'}
            onClick={() => setActiveTab('heritage')}
            className={activeTab === 'heritage' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            Heritage &amp; Sacred ({heritageCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'thermal' ? 'default' : 'outline'}
            onClick={() => setActiveTab('thermal')}
            className={activeTab === 'thermal' ? 'bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-lg shadow-orange-950/40' : 'border-white/10 text-orange-300 hover:text-white'}
          >
            <Flame className="w-3.5 h-3.5 mr-1 text-orange-300" />
            Geothermal / Hot ({thermalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'good' ? 'default' : 'outline'}
            onClick={() => setActiveTab('good')}
            className={activeTab === 'good' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Good+ Quality ({goodCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'threatened' ? 'default' : 'outline'}
            onClick={() => setActiveTab('threatened')}
            className={activeTab === 'threatened' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Recharge At-Risk ({threatenedCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'alpine' ? 'default' : 'outline'}
            onClick={() => setActiveTab('alpine')}
            className={activeTab === 'alpine' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-sky-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-sky-300" />
            High Altitude Springs ({alpineCount})
          </Button>
        </div>
      </div>

      {/* ── Springshed Intelligence & Field Observation Spotlight ──────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Springshed Intelligence &amp; Field Observation Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on monumental karst resurgences, geothermal hot springs, aquifer mechanics, and community spring monitoring.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('karst')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'karst'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monumental Karst Springs
            </button>
            <button
              onClick={() => setActiveInsight('thermal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'thermal'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Geothermal &amp; Thermal
            </button>
            <button
              onClick={() => setActiveInsight('hydrogeology')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'hydrogeology'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Springshed Aquifer Zones
            </button>
            <button
              onClick={() => setActiveInsight('observe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeInsight === 'observe'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                  : 'text-teal-400 hover:text-teal-300'
              }`}
            >
              <Eye className="w-3 h-3" />
              Observe Here (Spring Watch)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Monumental Karst Springs */}
          {activeInsight === 'karst' && (
            <motion.div
              key="karst"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipSprings.map(spring => (
                <Link
                  key={spring.id}
                  href={`/water-systems/springs/${spring.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Droplet className="w-2.5 h-2.5" />
                      {spring.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      spring.waterQuality?.status === 'excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                      spring.waterQuality?.status === 'good' ? 'bg-teal-500/20 text-teal-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {spring.waterQuality?.status?.toUpperCase()}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {spring.name}
                  </h5>
                  <div className="text-xs text-emerald-400/90 font-medium mt-0.5">
                    {spring.district} District · {spring.watershed}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {spring.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Elevation: {spring.elevation}m</span>
                    <span className="text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      View Springshed <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Geothermal & Thermal */}
          {activeInsight === 'thermal' && (
            <motion.div
              key="thermal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-orange-500/20">
                <span className="text-xs font-bold text-orange-400 block mb-1">Deep Suture-Zone Geothermal</span>
                <h5 className="text-sm font-semibold text-white mb-2">Puga &amp; Chumathang (Ladakh)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Situated along the Indus Suture Zone with surface water temperatures exceeding 84°C. Rich in sulphur, borax, and lithium, representing India&apos;s prime high-enthalpy geothermal reservoir.
                </p>
                <div className="text-[11px] text-slate-500">
                  Surface Temperature: <span className="text-slate-300">80°C – 87°C (Boiling Point at 4,400m)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Sub-Himalayan Sulphur Spas</span>
                <h5 className="text-sm font-semibold text-white mb-2">Tatapani (Kotranka / Kalakote)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Sulphur-rich artesian springs bubbling up from deep sedimentary fault fractures. Renowned across Jammu for dermatological and rheumatic healing properties.
                </p>
                <div className="text-[11px] text-slate-500">
                  Hydro-chemistry: <span className="text-slate-300">Hydrogen Sulphide (H2S), High Dissolved Minerals</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Nubra Valley Glacial Thermal Vents</span>
                <h5 className="text-sm font-semibold text-white mb-2">Panamik Hot Springs (3,180m)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Fed by deep hydrothermal circulation near the Karakoram fault system. Steaming thermal vents surrounded by cold sub-zero high-altitude desert moraines.
                </p>
                <div className="text-[11px] text-slate-500">
                  Significance: <span className="text-slate-300">Northernmost Thermal Vent in South Asia</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Springshed Aquifer Zones */}
          {activeInsight === 'hydrogeology' && (
            <motion.div
              key="hydrogeology"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Karst Conduit Resurgences</span>
                <h5 className="text-sm font-semibold text-white mb-2">Triassic Limestone Belt</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deep subterranean solution caves channeling massive underground flows in Anantnag. Prime examples: Kokernag (300 cusecs) and Achabal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Fracture-Bedrock Springs</span>
                <h5 className="text-sm font-semibold text-white mb-2">Panjal Volcanic Traps</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Jointed basaltic volcanic rocks releasing mineralized water at mid-elevation slopes. Prime example: Chashma Shahi royal spring on Zabarwan mountain.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Karewa Contact Springs</span>
                <h5 className="text-sm font-semibold text-white mb-2">Plio-Pleistocene Terraces</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Water percolates through permeable Karewa sands and issues forth at the contact plane with underlying impermeable clay beds. Crucial for rural drinking.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Alluvial Artesian Seeps</span>
                <h5 className="text-sm font-semibold text-white mb-2">Valley Floor Gravels</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Confined and semi-confined alluvial aquifer discharges. Panzath Nag features over 500 bubbling spring eyes sustaining downstream trout farms and paddy canals.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Community Springshed Watch &amp; Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-300">
                        Spring Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Log spring discharge rates, seasonal drying dates, recharge area encroachments, or domestic contamination risks.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Spring Record
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Spring Drying
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      Spring Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <RefreshCw className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Volumetric Bucket Test</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Place a calibrated 10-liter bucket beneath the spring spout. Measure filling time with a stopwatch. Calculate Liters Per Minute (LPM) to track seasonal aquifer drawdown.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-300/80 font-mono">
                    Protocol: CGWB Volumetric Timing
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. In-Situ Water Temperature</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Immerse thermometer at spring eye. Stable year-round 10°C–13°C indicates deep confined groundwater; fluctuating temperatures reflect rapid, vulnerable surface runoff.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-cyan-300/80 font-mono">
                    Indicator: Hydrothermal Transit Depth
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Recharge Zone Demarcation</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Trace ridge catchment directly above the spring outlet. Photograph and report deforestation, road blasting, or illegal construction within the critical 500m recharge radius.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Guideline: NITI Aayog Springshed Protocol
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Septic &amp; Coliform Testing</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Test for fecal contamination using H2S vial test kits. Presence of black precipitate within 24 hours warns of nearby soak-pit or latrine infiltration into the spring conduit.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Standard: BIS 10500 Potability Limit
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
