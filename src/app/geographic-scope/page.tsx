'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  Globe, Map, Compass, Mountain, Droplets, ShieldCheck,
  Layers, Cpu, Database, Eye, FileCheck, MapPin, Activity,
  CheckCircle2, ArrowRight, Sparkles, Scale, Trees,
  AlertTriangle, Shield, Landmark, ExternalLink, Zap, Info,
  ChevronRight, Radio, Waves, Users
} from 'lucide-react';

export default function GeographicScopePage() {
  const [selectedTier, setSelectedTier] = useState<number>(0);
  const [activeSystemFilter, setActiveSystemFilter] = useState<string>('all');

  // Key Geographic Scope Metrics Ribbon
  const scopeMetrics = [
    { value: 'Kashmir Core', title: 'Primary Bioregion', desc: '10 central valley districts & upper Jhelum basin', icon: Compass, color: 'text-emerald-400' },
    { value: 'Trans-Divisional', title: 'Mountain Interfaces', desc: 'Pir Panjal, Chenab basin & tributary headwaters', icon: Mountain, color: 'text-sky-400' },
    { value: 'Transboundary', title: 'Macro Corridors', desc: 'Upper Indus basin, glacial massifs & Siberian flyways', icon: Globe, color: 'text-amber-400' },
    { value: '15,948+ km²', title: 'Valley Floor Area', desc: 'Intensive high-resolution telemetry & monitoring grid', icon: Layers, color: 'text-purple-400' },
    { value: '1,000+', title: 'Water Systems', desc: 'Lakes, NWIA wetlands, rivers & subterranean springs', icon: Droplets, color: 'text-teal-400' },
    { value: '100%', title: 'Scientific Neutrality', desc: 'Strict ecological boundaries, zero geopolitical bias', icon: ShieldCheck, color: 'text-rose-400' },
  ];

  // 3-Tier Scope Classification Framework
  const scopeTiers = [
    {
      id: 'kashmir-core',
      name: 'Kashmir Core',
      subtitle: 'The Central Valley & Primary Hydrological Depression',
      badge: 'Tier 1: Intensive Ground & Satellite Grid',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      tagline: 'Primary environmental focus area encompassing the entire alluvial valley floor, flanking karewa terraces, and inner foothill catchments.',
      description: 'Kashmir Core represents the contiguous geographic and ecological heartland of the Kashmir Valley. Bound by the Pir Panjal range to the south and west and the Greater Himalayas to the north and east, this enclosed intermontane basin acts as a singular, highly interconnected hydrological and atmospheric amphitheater.',
      coverageDistricts: [
        'Srinagar', 'Anantnag', 'Baramulla', 'Budgam', 'Pulwama',
        'Kupwara', 'Kulgam', 'Bandipora', 'Ganderbal', 'Shopian'
      ],
      keyLandmarks: [
        'River Jhelum (Vyeth) Mainstem & 24 Major Inflow Tributaries',
        'Dal Lake, Nigeen Lake, Wular Lake (Ramsar #518), Manasbal Lake',
        'Hokersar (Ramsar #1570), Shallabugh, Haigam & Mirgund Wetland Reserves',
        'Dachigam National Park (Primary Hangul Deer Habitat), Overa-Aru Sanctuary',
        'Pampore Karewa Saffron Ecosystems & North Kashmir Apple Belt Watersheds'
      ],
      monitoringFocus: [
        'High-density water quality telemetry across urbanized and rural lake basins',
        'Wetland perimeter encroachment and siltation rate tracking via Sentinel-2 MSI',
        'Air Quality Index (AQI) winter temperature inversion monitoring in the valley bowl',
        'Solid waste dumping hotspot detection along riverbanks and riparian buffers',
        'Subterranean natural spring-shed (naag) vitality and aquifer discharge health'
      ]
    },
    {
      id: 'trans-divisional',
      name: 'Trans-Divisional',
      subtitle: 'Mountain Passes, Ridges & Inter-Valley Drainage Interfaces',
      badge: 'Tier 2: Watershed & Slope Interface Grid',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      tagline: 'Ecologically coupled mountain environments extending across the Pir Panjal crest into the Chenab drainage basin and foothill transition belts.',
      description: 'Ecological phenomena do not terminate at mountain ridgelines. Trans-Divisional scope encompasses the high mountain catchments, passes, and river-basin headwaters that physically connect the Kashmir Valley to adjoining mountain valleys of Jammu division (Chenab Basin, Pir Panjal slopes, and Shivalik fringes). What occurs in these upper slopes directly governs downstream flood surges, sediment transport, and wildlife migrations.',
      coverageDistricts: [
        'Doda', 'Kishtwar', 'Ramban', 'Reasi', 'Udhampur',
        'Poonch', 'Rajouri', 'Jammu Foothills', 'Kathua Slopes', 'Samba Buffer'
      ],
      keyLandmarks: [
        'Chenab River Mainstem & High-Gradient Tributaries (Marusudar, Tawi)',
        'Pir Panjal Alpine Ridgelines (Peer Ki Gali, Sinthan Top, Razdan Pass, Zojila)',
        'Kishtwar National Park & High-Altitude Glaciated Mountain Catchments',
        'Hydroelectric Reservoirs (Baglihar, Salal, Dul Hasti) Sedimentation Zones',
        'Sub-Alpine Coniferous Forest Belts & Seasonal Gujjar-Bakarwal Pastoral Routes'
      ],
      monitoringFocus: [
        'Slope stability and mass-movement landslide early detection along transit corridors',
        'Glacier-fed stream discharge variation and cloudburst flash-flood routing',
        'Forest fire hotspot propagation monitoring via NASA FIRMS real-time satellites',
        'Pastoral grazing pressure and sub-alpine meadow biodiversity conservation',
        'Aquatic connectivity and coldwater fish migration (Snow Trout, Himalayan Brown Trout)'
      ]
    },
    {
      id: 'transboundary',
      name: 'Transboundary / Extended',
      subtitle: 'Upper Indus Basin, Cryospheric Glaciers & Avian Flyways',
      badge: 'Tier 3: Macro-Ecosystem & Flyway Grid',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      tagline: 'Macro-scale Earth systems encompassing the Western Himalayan cryosphere, the Indus water tower, and the Siberian migratory flyway.',
      description: 'The Kashmir bioregion is an integral component of the third pole—the greatest concentration of snow and ice outside the polar regions. The Transboundary / Extended scope monitors macro-scale Earth systems that span national and international borders: the vast glacial complexes that feed the Indus River system, atmospheric circulation patterns (Western Disturbances), and transcontinental avian migration flyways linking Siberia and Central Asia to South Asia.',
      coverageDistricts: [
        'Upper Indus Basin', 'Karakoram-Himalayan Trans-Himalayan Axis',
        'Gilgit-Baltistan Glacial Interfaces', 'Ladakh Cold-Desert Watersheds',
        'Western Tibetan Plateau Drainage', 'Indus River Transboundary Corridor'
      ],
      keyLandmarks: [
        'Great Himalayan Massifs (Kolhai Massif, Nun-Kun, Machoi, Thajwas Glacier)',
        'Central Asian Flyway (CAF) Avian Migration Gateway',
        'Upper Indus Hydrological Basin & Glacial Lake Complexes',
        'Cross-Range Western Disturbance Atmospheric Snow-Deposition Corridors',
        'High-Altitude Cold-Desert Wetland Systems (Tso Moriri, Pangong Tso Connections)'
      ],
      monitoringFocus: [
        'Long-term glacial mass balance retreat tracking and snow-water equivalent anomalies',
        'Glacial Lake Outburst Flood (GLOF) susceptibility mapping for high-altitude moraines',
        'Migratory waterfowl stopover census tracking across the international flyway',
        'Macro-climate warming velocity across elevation gradients (0–6,000m ASL)',
        'Cross-border aerosol and trans-boundary air pollution plume dispersion'
      ]
    }
  ];

  // 6 Core Environmental Systems Covered
  const environmentalSystems = [
    {
      id: 'water',
      title: 'Water Systems & Hydrology',
      icon: Droplets,
      category: 'Freshwater',
      color: 'text-sky-400',
      borderColor: 'hover:border-sky-500/40',
      bgGlow: 'from-sky-500/10 to-transparent',
      summary: 'Comprehensive hydrological telemetry tracking 1,000+ freshwater assets across Kashmir.',
      layers: [
        'River Jhelum & Chenab drainage networks with 36 real-time gauge nodes',
        'Ramsar wetlands: Wular, Hokersar, Shallabugh, Haigam & associated flood basins',
        'Over 5,000 mountain springs (naags/chashmas) sustaining rural drinking water grids',
        'High-altitude alpine oligotrophic lakes (Gangabal, Tarsar, Marsar, Vishansar, Sheshnag)',
        'National Wetland Inventory & Assessment (NWIA) standardized GIS boundaries'
      ]
    },
    {
      id: 'cryosphere',
      title: 'Cryosphere & Glacial Assets',
      icon: Mountain,
      category: 'High Altitude',
      color: 'text-purple-400',
      borderColor: 'hover:border-purple-500/40',
      bgGlow: 'from-purple-500/10 to-transparent',
      summary: 'Frontline cryospheric observation monitoring the rapid recession of Western Himalayan ice.',
      layers: [
        'Glacial perimeter & terminus retreat tracking for Kolhai, Machoi, and Thajwas glaciers',
        'Satellite-derived Snow Water Equivalent (SWE) and seasonal snow cover duration',
        'Moraine-dammed proglacial lake expansion and GLOF sudden-drainage risk indices',
        'Permafrost degradation and high-altitude rock-glacier creep in cold mountain valleys',
        'Spring-melt timing shifts impacting downstream spring planting and paddy irrigation'
      ]
    },
    {
      id: 'protected',
      title: 'Protected Area Network',
      icon: Trees,
      category: 'Conservation',
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
      bgGlow: 'from-emerald-500/10 to-transparent',
      summary: 'Legally designated wildlife sanctuaries, national parks, and ecological corridors.',
      layers: [
        'Dachigam National Park & the Greater Dachigam biodiversity buffer zone',
        'Kaziranga-scale Hangul deer migratory corridors between Overa-Aru, Tral & Sindh',
        'Kishtwar National Park, City Forest (Salim Ali), and Gulmarg Wildlife Sanctuary',
        'Conservation Reserves: Brain-Nishat, Khrew, Wangat, Khiram, Shikargah',
        'Habitat fragmentation index tracking linear infrastructure encroachments'
      ]
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity & Species Intelligence',
      icon: Activity,
      category: 'Fauna & Flora',
      color: 'text-teal-400',
      borderColor: 'hover:border-teal-500/40',
      bgGlow: 'from-teal-500/10 to-transparent',
      summary: 'Taxonomic registers, Darwin Core data standards, and IUCN Red List monitoring.',
      layers: [
        'Over 4,200 verified species records spanning mammals, avifauna, fish, reptiles & flora',
        'Critically endangered focal species: Kashmir Stag (Hangul), Snow Leopard, Musk Deer',
        'Central Asian Flyway waterfowl census: 800,000+ wintering migratory birds',
        'Endemic high-altitude medicinal & aromatic flora (Kuth, Kour, Belladonna, Patrees)',
        'Automated sensitivity masking to protect endangered wildlife locations from poaching'
      ]
    },
    {
      id: 'monitoring',
      title: 'Environmental Quality & Pollution',
      icon: Radio,
      category: 'Pollution',
      color: 'text-amber-400',
      borderColor: 'hover:border-amber-500/40',
      bgGlow: 'from-amber-500/10 to-transparent',
      summary: 'Ground sensors, satellite remote sensing, and municipal environmental audits.',
      layers: [
        'Real-time & modeled Air Quality Index (PM2.5, PM10) during winter biomass inversions',
        'Municipal solid waste open dumping tracking along vulnerable wetlands and watercourses',
        'Sewage Treatment Plant (STP) discharge telemetry & biochemical oxygen demand (BOD)',
        'Agricultural pesticide and chemical fertilizer runoff into river mainstems',
        'Urban impervious surface expansion rate across the Greater Srinagar metropolitan area'
      ]
    },
    {
      id: 'hazards',
      title: 'Multi-Hazard Risk & Climate Stress',
      icon: AlertTriangle,
      category: 'Resilience',
      color: 'text-rose-400',
      borderColor: 'hover:border-rose-500/40',
      bgGlow: 'from-rose-500/10 to-transparent',
      summary: 'Predictive modeling and live alert streams for geological and atmospheric hazards.',
      layers: [
        'Flash flood & riverine breach vulnerability maps calibrated against 2014 benchmarks',
        'Avalanche path mapping and hazard advisories across Gulmarg, Gurez, and Sonamarg',
        'Active fault line seismic hazard tracking integrated with USGS seismic feed',
        'Forest fire hotspot propagation modeling combining wind, humidity, and fuel loads',
        'Cloudburst susceptibility ranking across vulnerable high-slope tributary ravines'
      ]
    }
  ];

  // Multi-Source Data Architecture
  const dataArchitecture = [
    {
      icon: Cpu,
      title: 'Orbital Earth Observation',
      provider: 'Sentinel-2 MSI, Landsat 8/9, MODIS, Copernicus DEM',
      desc: 'Multispectral remote sensing providing continuous 10m to 30m resolution coverage of vegetation vitality, snow cover, water surfaces, and land-use shifts.',
      color: 'text-sky-400'
    },
    {
      icon: Waves,
      title: 'In-Situ Telemetry & Hydrology',
      provider: 'Open-Meteo, USGS Seismology, NASA FIRMS, CPCB / SPCB Feeds',
      desc: 'Real-time telemetry feeds capturing atmospheric conditions, thermal anomaly fires, seismic ground acceleration, and hydrological river gauge telemetry.',
      color: 'text-emerald-400'
    },
    {
      icon: Database,
      title: 'Taxonomic & Scientific Archives',
      provider: 'Darwin Core Schema, GBIF, IUCN Red List, Academic Herbaria',
      desc: 'Standardized biodiversity records cross-checked with peer-reviewed botanical surveys, the Flora of Kashmir, and university research repositories.',
      color: 'text-amber-400'
    },
    {
      icon: Users,
      title: 'Frontline Community Ground-Truth',
      provider: 'College Observers, Shepherds, Mountain Guides, Citizen Grid',
      desc: 'Field observations logged by university scholars, local environmental groups, Gujjar-Bakarwal pastoralists, and mountain guides in remote alpine zones.',
      color: 'text-purple-400'
    }
  ];

  // Quick Cross-Module Navigation
  const relatedModules = [
    { title: 'Interactive Map Atlas', href: '/atlas', desc: 'Explore all geographic scope layers interactively on live vector maps.', icon: Map },
    { title: 'Water Systems Observatory', href: '/water-systems', desc: '1,000+ lakes, wetlands, rivers, and springs mapped across Kashmir.', icon: Droplets },
    { title: 'Protected Area Network', href: '/protected-network', desc: 'Sanctuaries, national parks, and wildlife corridors across districts.', icon: Trees },
    { title: 'Hazard Intelligence Grid', href: '/hazard-intelligence', desc: 'Live multi-hazard monitoring for floods, avalanches, and fires.', icon: AlertTriangle },
    { title: 'Our Mission & Strategic Charter', href: '/about/mission', desc: 'Read the 2026–2030 roadmap and core scientific principles.', icon: Compass },
    { title: 'Geographic Notice & Governance', href: '/geographic-notice', desc: 'Legal and scientific framework governing geographic references.', icon: ShieldCheck }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Globe className="w-5 h-5 text-emerald-400" />}
        label="Bioregional Scope & Ecological Coverage"
        title="Western Himalayan Geographic Scope & Coverage"
        subtitle="Environmental boundaries, not political boundaries: Mapping interconnected ecosystems across watersheds, elevation gradients, and transboundary wildlife corridors."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Governance', href: '/about/governance' },
          { label: 'Geographic Scope' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#framework"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Explore 3-Tier Scope</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#systems"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 hover:border-emerald-500/40 font-semibold text-sm transition-all duration-300 backdrop-blur-md"
            >
              <span>Environmental Systems</span>
              <Layers className="w-4 h-4 text-emerald-400" />
            </a>
            <Link
              href="/atlas"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-sm transition-all duration-300"
            >
              <span>Launch Live Atlas</span>
              <Map className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        }
      />

      {/* ─── Strategic Targets / Key Scope Metrics Ribbon ────────────────────────── */}
      <section className="relative z-20 -mt-6 sm:-mt-10 mb-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {scopeMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xl sm:text-2xl font-black tracking-tight ${metric.color}`}>
                  {metric.value}
                </span>
                <metric.icon className="w-5 h-5 text-slate-400 shrink-0 opacity-70" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">{metric.title}</p>
                <p className="text-[11px] text-slate-400 leading-tight mt-1 line-clamp-2">{metric.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Main Content Container ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ─── Section 1: The Bioregional Imperative ─────────────────────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">The Ecological Reality</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              Why an Ecosystem Framework is Essential
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light">
                    Nature does not recognize political or administrative boundaries. Rivers flow across jurisdictions; migratory waterfowl fly between continents; glaciers feed life downstream without regard for human borders.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    The Kashmir Himalayas form an intricately coupled Earth system. Glacial melt in the Pir Panjal and Great Himalayan massifs feeds the River Jhelum and Chenab basins. Atmospheric inversions trap smoke across the entire valley bowl simultaneously. Forest fires propagate along contiguous mountain ridges without stopping at district checkpoints.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Historically, environmental analysis has been artificially splintered by administrative lines—rendering cross-boundary watershed management, flood routing, and wildlife corridor protection nearly impossible.
                  </p>
                  <p className="text-emerald-400 font-semibold text-base sm:text-lg">
                    Kashmir EcoWatch organizes information by natural ecological logic: watersheds, elevation zones, and bioregional corridors.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Analytical Premise</p>
                      <p className="text-sm font-bold text-white">Bioregional Scale Environmental Intelligence</p>
                    </div>
                  </div>
                  <Link
                    href="/atlas"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>View Interactive Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* The Bioregional Scale Manifesto */}
              <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-slate-900/60 to-slate-950 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                    <Shield className="w-4 h-4" />
                    <span>The Bioregional Principle</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                    Environmental Boundaries, Not Political Boundaries
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Our geographic coverage is designed strictly to reflect physical Earth systems: river catchments, vegetative altitudinal belts, seismic belts, and wildlife corridors.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    This scientific convention follows international standards established by UNEP, IUCN, and Ramsar Convention, ensuring full interoperability with planetary conservation databases.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">Watershed Coherence</span>
                      <span className="text-[11px] text-slate-400 leading-tight">Tracking headwaters to terminal outflow without artificial breaks.</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">Contiguous Wildlife Corridors</span>
                      <span className="text-[11px] text-slate-400 leading-tight">Preserving migration paths for Hangul deer, Snow Leopard & Markhor.</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">Cryosphere Connectivity</span>
                      <span className="text-[11px] text-slate-400 leading-tight">Glacial mass balance linked to downstream irrigation & drinking water.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Interactive 3-Tier Classification Framework ────────────── */}
        <section id="framework" className="relative scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Operational Hierarchy</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  The 3-Tier Scope Classification Framework
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select a tier below to examine its geographic extent, monitored assets, and telemetry feeds.
                </p>
              </div>

              {/* Tier Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl overflow-x-auto max-w-full">
                {scopeTiers.map((tier, idx) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(idx)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedTier === idx
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tier.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tier Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTier}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/20 bg-slate-900/60 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${scopeTiers[selectedTier].badgeColor} mb-2`}>
                      {scopeTiers[selectedTier].badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {scopeTiers[selectedTier].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-1">
                      {scopeTiers[selectedTier].subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-950/80 px-4 py-2 rounded-xl border border-white/5">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{scopeTiers[selectedTier].coverageDistricts.length} Monitored Sectors</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-light">
                  {scopeTiers[selectedTier].description}
                </p>

                {/* Covered Districts / Sectors Pill Grid */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sectors & Administrative Interfaces Included</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {scopeTiers[selectedTier].coverageDistricts.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/10 text-xs font-medium text-slate-300 hover:border-emerald-500/40 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Geographic Assets vs Monitored Intelligence Layers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-3">
                      <Droplets className="w-4 h-4" />
                      <span>Key Landmarks & Ecological Assets</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {scopeTiers[selectedTier].keyLandmarks.map((landmark, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{landmark}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                      <Cpu className="w-4 h-4" />
                      <span>Telemetry & Monitored Parameters</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {scopeTiers[selectedTier].monitoringFocus.map((focus, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{focus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Section 3: Environmental Systems Covered ─────────────────────────── */}
        <section id="systems" className="relative scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Holistic Bioregional Scope</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Six Core Environmental Domains
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Kashmir EcoWatch integrates intelligence across six interconnected environmental systems, establishing an empirical living observatory for the Western Himalayas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {environmentalSystems.map((system) => {
                const IconComponent = system.icon;
                return (
                  <div
                    key={system.id}
                    className={`glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-300 flex flex-col justify-between ${system.borderColor} group`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className={`w-6 h-6 ${system.color}`} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 rounded-full bg-slate-950 border border-white/5">
                          {system.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                        {system.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {system.summary}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-white/10">
                        {system.layers.map((layer, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mt-1 shrink-0" />
                            <span>{layer}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 4: Multi-Source Data Architecture & Provenance ────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Scientific Provenance</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Multi-Source Data Synthesis
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Every polygon, telemetry stream, and indicator across our geographic scope is tied to open, verifiable, and authoritative scientific datasets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {dataArchitecture.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/50 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center">
                          <IconComp className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white">{item.title}</h3>
                          <span className="text-[11px] font-mono text-emerald-400">{item.provider}</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 5: Strict Scientific & Political Neutrality Charter ─────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/70 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Institutional Charter</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
                Declaration of Scientific & Political Neutrality
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <p>
                  Kashmir EcoWatch is an independent, non-commercial, public-interest environmental intelligence observatory.
                </p>
                <p>
                  All geographic names, administrative designations, maps, geospatial overlays, ecological classifications, and environmental datasets presented across this platform are applied strictly for scientific, hydrological, disaster-risk reduction, and conservation purposes.
                </p>
                <p>
                  Nothing contained within this platform should be construed as expressing, supporting, challenging, or implying any position regarding sovereignty, international boundaries, territorial claims, administrative disputes, or geopolitical viewpoints.
                </p>
                <p>
                  Environmental processes—from glacial retreat and river runoff to migratory bird corridors and earthquake faults—naturally transcend human jurisdictions. Kashmir EcoWatch mirrors these physical ecological realities to enable evidence-based conservation, public disaster awareness, and sustainable resource stewardship.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center max-w-2xl mx-auto space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Our Guiding Principle</p>
                <blockquote className="text-xl sm:text-2xl font-light italic text-white leading-snug">
                  &ldquo;Nature is interconnected. Environmental intelligence should be too.&rdquo;
                </blockquote>
                <p className="text-xs text-slate-400">
                  Operated and supported philanthropically by <a href="https://dkf.sufisciencecenter.info/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold">Dr. Kumar Foundation USA</a> &amp; maintained by <a href="https://primelogicsol.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-semibold">Prime Logic Solutions</a> as part of its CSR initiative.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 6: Quick Cross-Module Exploration ─────────────────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Ecosystem Exploration</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  Explore Related Intelligence Modules
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedModules.map((module, idx) => {
                const IconC = module.icon;
                return (
                  <Link
                    key={idx}
                    href={module.href}
                    className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <IconC className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                        {module.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 pt-4 mt-2">
                      <span>Access Module</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
