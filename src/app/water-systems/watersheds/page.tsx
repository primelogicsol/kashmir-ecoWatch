'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { watershedsData, WaterEntity } from '@/data/water-systems';
import { watershedsExpandedRecords } from '@/data/hydrology/watersheds-expanded';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Map, Layers, Wind, Waves, Droplet, RefreshCw, AlertTriangle, ShieldAlert,
  Sparkles, MapPin, Activity, Compass, CheckCircle2, ChevronRight, Eye,
  ShieldCheck, Grid, Globe, ArrowRight, FileText, Camera, Mountain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WatershedsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'basins' | 'glacial' | 'flood' | 'restoration' | 'lakes'>('all');
  const [activeInsight, setActiveInsight] = useState<'basins' | 'erosion' | 'morphometry' | 'observe'>('basins');

  const categories = useMemo(() => [...new Set(watershedsData.map(w => w.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(watershedsData.map(w => w.district))].filter(Boolean).sort(), []);

  const totalCount = watershedsData.length; // 374
  const allWatershedsCount = watershedsExpandedRecords.length || totalCount;
  const majorCount = useMemo(() => watershedsData.filter(w => w.category?.toLowerCase().includes('basin') || w.category?.toLowerCase().includes('major')).length, []);
  const glacialCount = useMemo(() => watershedsData.filter(w => (w.elevation || 0) >= 2500 || w.name.toLowerCase().includes('glacier') || w.name.toLowerCase().includes('snow')).length, []);
  const floodCount = useMemo(() => watershedsData.filter(w => w.threats?.some(t => t.toLowerCase().includes('flood')) || ['jhelum-basin', 'veshaw-catchment', 'rambiara-catchment'].includes(w.slug)).length, []);
  const restorationCount = useMemo(() => watershedsData.filter(w => w.threats && w.threats.length > 0).length, []);
  const lakeCatchmentsCount = useMemo(() => watershedsData.filter(w => w.name.toLowerCase().includes('lake') || w.name.toLowerCase().includes('wetland') || w.category?.toLowerCase().includes('lake')).length, []);

  // Filtered watersheds for listing grid
  const displayedWatersheds = useMemo(() => {
    switch (activeTab) {
      case 'basins':
        return watershedsData.filter(w => w.category?.toLowerCase().includes('basin') || w.category?.toLowerCase().includes('major'));
      case 'glacial':
        return watershedsData.filter(w => (w.elevation || 0) >= 2500 || w.name.toLowerCase().includes('glacier') || w.name.toLowerCase().includes('snow'));
      case 'flood':
        return watershedsData.filter(w => w.threats?.some(t => t.toLowerCase().includes('flood')) || ['jhelum-basin', 'veshaw-catchment', 'rambiara-catchment'].includes(w.slug));
      case 'restoration':
        return watershedsData.filter(w => w.threats && w.threats.length > 0);
      case 'lakes':
        return watershedsData.filter(w => w.name.toLowerCase().includes('lake') || w.name.toLowerCase().includes('wetland') || w.category?.toLowerCase().includes('lake'));
      case 'all':
      default:
        return watershedsData;
    }
  }, [activeTab]);

  const flagshipBasins = useMemo(() => {
    return watershedsData.filter(w => 
      ['jhelum-basin', 'chenab-basin', 'indus-basin', 'kishanganga-sub-basin', 'lidder-catchment', 'sindh-catchment', 'veshaw-catchment', 'pohru-catchment'].includes(w.slug) ||
      w.category?.toLowerCase().includes('basin')
    ).slice(0, 8);
  }, []);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Watersheds & Basins"
      description={`Verified Base + GIS-Derived Hydrological Units | Comprehensive inventory of ${totalCount} macro-basins, sub-watersheds, river catchments, lake catchments, and flood-response units across the Jhelum, Chenab, and Indus systems.`}
      icon="Map"
      color="from-amber-600 via-orange-600 to-yellow-500"
      entities={displayedWatersheds}
      entityType="Watersheds"
      kpis={[
        { label: 'Total Hydrological Units', value: allWatershedsCount, icon: 'Map' },
        { label: 'Major River Basins',     value: majorCount,          icon: 'Layers',       color: 'text-amber-400' },
        { label: 'Glacier Catchments',     value: glacialCount,        icon: 'Mountain',     color: 'text-sky-400' },
        { label: 'Flood-Response Units',   value: floodCount,          icon: 'AlertTriangle', color: 'text-rose-400' },
        { label: 'Restoration Priority',   value: restorationCount,    icon: 'RefreshCw',    color: 'text-orange-400' },
        { label: 'Lake Catchments',        value: lakeCatchmentsCount, icon: 'Waves',        color: 'text-cyan-400' },
        { label: 'Districts Covered',      value: districts.length,    icon: 'MapPin' },
        { label: 'Catchment Telemetry',    value: 'Active',            icon: 'Eye',          color: 'text-emerald-400' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/watersheds/${entity.slug}`}
      getCategory={entity => entity.category}
      getSecondaryMetric={entity => entity.area ? { label: 'Area', value: `${entity.area} km²` } : null}
    >
      {/* ── Watershed Focus Typologies & Guilds Filter Bar ─────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-amber-400" />
              Catchment Typologies &amp; Hydrological Hierarchy
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter the 374 mapped watersheds by basin scale, glacial cryosphere dependence, or restoration priority.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-amber-400">{displayedWatersheds.length}</strong> of {totalCount} units
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Watersheds ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'basins' ? 'default' : 'outline'}
            onClick={() => setActiveTab('basins')}
            className={activeTab === 'basins' ? 'bg-orange-600 hover:bg-orange-500 text-white font-medium shadow-lg shadow-orange-950/40' : 'border-white/10 text-orange-300 hover:text-white'}
          >
            <Layers className="w-3.5 h-3.5 mr-1 text-orange-300" />
            Major Basins ({majorCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'glacial' ? 'default' : 'outline'}
            onClick={() => setActiveTab('glacial')}
            className={activeTab === 'glacial' ? 'bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-lg shadow-sky-950/40' : 'border-white/10 text-sky-300 hover:text-white'}
          >
            <Mountain className="w-3.5 h-3.5 mr-1 text-sky-300" />
            Glacial Catchments ({glacialCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'flood' ? 'default' : 'outline'}
            onClick={() => setActiveTab('flood')}
            className={activeTab === 'flood' ? 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-950/40' : 'border-white/10 text-rose-300 hover:text-white'}
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-300" />
            Flood-Response ({floodCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'restoration' ? 'default' : 'outline'}
            onClick={() => setActiveTab('restoration')}
            className={activeTab === 'restoration' ? 'bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-950/40' : 'border-white/10 text-purple-300 hover:text-white'}
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-purple-300" />
            Restoration Priority ({restorationCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'lakes' ? 'default' : 'outline'}
            onClick={() => setActiveTab('lakes')}
            className={activeTab === 'lakes' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <Waves className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Lake Catchments ({lakeCatchmentsCount})
          </Button>
        </div>
      </div>

      {/* ── Watershed Intelligence & Field Observation Spotlight ───────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Watershed Intelligence &amp; Catchment Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Macro-basin dynamics, sediment yield hotspots, hydrological water balances, and citizen catchment monitoring.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('basins')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'basins'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Macro-Basins
            </button>
            <button
              onClick={() => setActiveInsight('erosion')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'erosion'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Erosion &amp; Sediment Yield
            </button>
            <button
              onClick={() => setActiveInsight('morphometry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'morphometry'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Water Balance Zones
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
              Observe Here (Catchment Watch)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Macro-Basins */}
          {activeInsight === 'basins' && (
            <motion.div
              key="basins"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {flagshipBasins.map(basin => (
                <Link
                  key={basin.id}
                  href={`/water-systems/watersheds/${basin.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Layers className="w-2.5 h-2.5" />
                      {basin.category}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {basin.district || 'Kashmir Basin'}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-amber-300 transition-colors line-clamp-1">
                    {basin.name}
                  </h5>
                  <div className="text-xs text-amber-400/90 font-medium mt-0.5">
                    {basin.area ? `${basin.area} km² drainage area` : `Elevation: ${basin.elevation}m`}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {basin.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Watershed: {basin.watershed}</span>
                    <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Analyze Catchment <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Erosion & Sediment Yield */}
          {activeInsight === 'erosion' && (
            <motion.div
              key="erosion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block mb-1">Severe Silt Generation Zone</span>
                <h5 className="text-sm font-semibold text-white mb-2">Pohru Catchment (Kupwara)</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Degraded Karewa slopes and heavy deforestation generate Kashmir&apos;s highest specific sediment yield (&gt;1,800 tonnes/km²/yr), delivering massive silt loads directly into Wular Lake via Ningli.
                </p>
                <div className="text-[11px] text-slate-500">
                  Priority: <span className="text-slate-300">Intensive Check Dams &amp; Afforestation</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Flash Flood Silt Influx</span>
                <h5 className="text-sm font-semibold text-white mb-2">Veshaw &amp; Rambiara Catchments</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  High-relief Pir Panjal catchments with rapid concentration times. Cloudbursts trigger heavy debris flows, filling riverbeds with gravel and exacerbating downstream flood crests at Sangam.
                </p>
                <div className="text-[11px] text-slate-500">
                  Risk Level: <span className="text-slate-300">High Cloudburst Sensitivity</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Urban Lake Catchment Buffer</span>
                <h5 className="text-sm font-semibold text-white mb-2">Zabarwan &amp; Harwan Catchment</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Direct micro-catchment feeding Dal Lake and Dachigam National Park. Protected forest canopy maintains low silt yield, but unpaved orchard trails require continuous soil-moisture retention bunds.
                </p>
                <div className="text-[11px] text-slate-500">
                  Focus: <span className="text-slate-300">Dal Lake Silt Sump Maintenance</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Water Balance Zones */}
          {activeInsight === 'morphometry' && (
            <motion.div
              key="morphometry"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                <span className="text-xs font-bold text-sky-400 block mb-1">Glacier / Snow Yield</span>
                <h5 className="text-sm font-semibold text-white mb-2">3,000m – 5,000m</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High snowfall input storing water in cryospheric reserves. Provides critical baseflow discharge during dry summer months (June–August).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Forest Interception Zone</span>
                <h5 className="text-sm font-semibold text-white mb-2">2,000m – 3,000m</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Conifer and mixed forest canopies intercepting heavy rainfall, slowing overland flow velocity and maximizing groundwater percolation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block mb-1">Karewa Terrace Infiltration</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,600m – 2,000m</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Semi-permeable silt-clay plateau formations. Sits above valley floor, regulating spring discharge and vulnerable to gully incision.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Alluvial Valley Outflow</span>
                <h5 className="text-sm font-semibold text-white mb-2">1,500m – 1,600m</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Low-gradient accumulation basin where all tributary streams converge into the River Jhelum axis before exiting at Baramulla Gorge.
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
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-orange-950/60 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Catchment Soil &amp; Erosion Watch Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-300">
                        Catchment Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Log active gully erosion, check dam siltation, clay quarrying landslides, or forest clearance in upper mountain catchments.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Catchment Record
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Severe Erosion
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-amber-400" />
                      Catchment Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Gully Headcut Advancement</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Track the upslope migration of gully headcuts on Karewa slopes. Measure width and depth expansion after heavy post-monsoon rainstorms.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Parameter: Linear Headcut Migration (m/yr)
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-orange-400">
                    <Layers className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Check Dam Silt Capacity</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Inspect gabion and stone masonry check dams in upper torrents. Record percentage silt fill; structures over 80% full require immediate de-siltation.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-orange-300/80 font-mono">
                    Maintenance: Sediment Trap Fill Ratio
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. Illegal Clay &amp; Sand Cutting</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Report mechanized earth-moving excavation slicing into Karewa hillsides for railway/highway fill. Destabilizes soil horizons and triggers mudslides.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Enforcement: J&amp;K Land Preservation Act
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Infiltration Trench Integrity</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Check contour bunds and percolation pits along degraded forest margins. Verify that vegetative barriers (*Vetiver* or native willow) prevent runoff rills.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-emerald-300/80 font-mono">
                    Technique: Ridge-to-Valley Soil Conservation
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
