'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  Globe,
  Map,
  Compass,
  Mountain,
  Droplets,
  ShieldCheck,
  Layers,
  Cpu,
  Database,
  MapPin,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  Trees,
  AlertTriangle,
  Shield,
  Radio,
  Waves,
  Users,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  GEOGRAPHY,
  GEOGRAPHIC_SCOPE_TIERS,
  LADAKH_DISTRICTS_REGISTRY,
  OFFICIAL_ADMIN_SOURCES,
} from '@/data/geography';
import { districtsData as activeDistrictProfiles } from '@/data/districts-intelligence';
import { groundStationsRegistry, airQualityRegistry } from '@/data/air-quality-registry';

export default function GeographicScopePage() {
  const [selectedTier, setSelectedTier] = useState<number>(0);

  // Dynamically derive verified counters strictly from actual underlying platform registries
  const verifiedTelemetry = useMemo(() => {
    const tier1Districts = GEOGRAPHY.units['Kashmir Core'].length; // 10
    const tier2JammuDistricts = GEOGRAPHY.units.Jammu.length; // 10
    const tier2LadakhBaseline = GEOGRAPHY.units.Ladakh.length; // 2
    const tier2LadakhNotified = LADAKH_DISTRICTS_REGISTRY.length; // 8 (2 baseline + 6 notified 2026)
    const tier2TotalNotified = tier2JammuDistricts + tier2LadakhNotified; // 18
    const tier2TotalBaseline = tier2JammuDistricts + tier2LadakhBaseline; // 12
    const tier3AjkDistricts = GEOGRAPHY.units.AJK.length; // 10
    const tier3GbDistricts = GEOGRAPHY.units['Gilgit-Baltistan'].length; // 14
    const tier3TotalDistricts = tier3AjkDistricts + tier3GbDistricts; // 24

    const totalNotifiedDistricts = tier1Districts + tier2TotalNotified + tier3TotalDistricts; // 52
    const totalBaselineUnits = tier1Districts + tier2TotalBaseline + tier3TotalDistricts; // 46

    const tier1ActiveProfiles = activeDistrictProfiles.filter(
      (d) => d.region === 'kashmir-valley'
    ).length; // 10
    const tier2ActiveProfiles = activeDistrictProfiles.filter(
      (d) => d.region === 'jammu' || d.region === 'ladakh'
    ).length; // 6
    const totalActiveProfiles = activeDistrictProfiles.length; // 16

    const groundByScope = {
      'Kashmir Core': groundStationsRegistry.filter((s) => s.scope === 'Kashmir Core').length,
      'Trans-Divisional': groundStationsRegistry.filter((s) => s.scope === 'Trans-Divisional')
        .length,
      'Transboundary / Extended': groundStationsRegistry.filter(
        (s) => s.scope === 'Transboundary / Extended'
      ).length,
    };

    const camsByScope = {
      'Kashmir Core': airQualityRegistry.filter((s) => s.scope === 'Kashmir Core').length,
      'Trans-Divisional': airQualityRegistry.filter((s) => s.scope === 'Trans-Divisional').length,
      'Transboundary / Extended': airQualityRegistry.filter(
        (s) => s.scope === 'Transboundary / Extended'
      ).length,
    };

    return {
      tier1Districts,
      tier2JammuDistricts,
      tier2LadakhBaseline,
      tier2LadakhNotified,
      tier2TotalNotified,
      tier2TotalBaseline,
      tier3TotalDistricts,
      totalNotifiedDistricts,
      totalBaselineUnits,
      tier1ActiveProfiles,
      tier2ActiveProfiles,
      totalActiveProfiles,
      totalGroundAqi: groundStationsRegistry.length,
      totalCamsCells: airQualityRegistry.length,
      groundByScope,
      camsByScope,
    };
  }, []);

  // Key Geographic Scope Metrics Ribbon — strictly separating Geographic Coverage vs Verified Active Monitoring
  const scopeMetrics = [
    {
      value: `${verifiedTelemetry.tier1Districts} Districts`,
      title: 'Tier 1 · Kashmir Core',
      desc: `${verifiedTelemetry.tier1ActiveProfiles}/${verifiedTelemetry.tier1Districts} active district dossiers & Jhelum basin grid`,
      icon: Compass,
      color: 'text-emerald-400',
    },
    {
      value: `${verifiedTelemetry.tier2TotalNotified} Districts`,
      title: 'Tier 2 · Jammu & Ladakh',
      desc: `${verifiedTelemetry.tier2JammuDistricts} Jammu + ${verifiedTelemetry.tier2LadakhNotified} Ladakh (${verifiedTelemetry.tier2LadakhBaseline} baseline + 6 notified 2026)`,
      icon: Mountain,
      color: 'text-sky-400',
    },
    {
      value: `${verifiedTelemetry.tier3TotalDistricts} + 5 Basins`,
      title: 'Tier 3 · Transboundary',
      desc: '10 AJK + 14 Gilgit-Baltistan districts & 5 cross-border macro corridors',
      icon: Globe,
      color: 'text-amber-400',
    },
    {
      value: `${verifiedTelemetry.totalActiveProfiles} / ${verifiedTelemetry.totalNotifiedDistricts}`,
      title: 'Verified District Dossiers',
      desc: `${verifiedTelemetry.totalActiveProfiles} deep district profiles (${verifiedTelemetry.totalBaselineUnits} baseline GIS/registry units)`,
      icon: Layers,
      color: 'text-purple-400',
    },
    {
      value: '1,333',
      title: 'Water & Cryosphere Records',
      desc: '553 master lakes, 374 watersheds, 127 rivers, 100 springs, 99 glaciers & 80 wetlands',
      icon: Droplets,
      color: 'text-teal-400',
    },
    {
      value: `${verifiedTelemetry.totalGroundAqi} + ${verifiedTelemetry.totalCamsCells}`,
      title: 'Ground vs Model AQI',
      desc: `${verifiedTelemetry.totalGroundAqi} physical CAAQMS/EPA stations + ${verifiedTelemetry.totalCamsCells} CAMS model cells`,
      icon: ShieldCheck,
      color: 'text-rose-400',
    },
  ];

  // 6 Core Environmental Systems Covered — aligned with verified repository counts
  const environmentalSystems = [
    {
      id: 'water',
      title: 'Water Systems & Hydrology',
      icon: Droplets,
      category: 'Freshwater',
      color: 'text-sky-400',
      borderColor: 'hover:border-sky-500/40',
      bgGlow: 'from-sky-500/10 to-transparent',
      summary:
        'Empirical hydrological inventory spanning 1,333 cataloged freshwater and cryospheric records across the three tiers.',
      layers: [
        '553-lake Western Himalayan Master Registry plus 80 NWIA-standardized wetlands and 374 delineated watersheds',
        '127 mapped rivers and mountain streams with 12 live hydrometric gauge feeds (9 Jhelum/Valley, 1 Chenab, 2 cross-border)',
        'Ramsar wetlands across Tier 1 (Wular, Hokersar, Shallabugh, Hygam), Tier 2 (Surinsar-Mansar, Tso Moriri, Tso Kar) & Tier 3 (Mangla)',
        '100 documented karst & mountain springs (naags/chashmas) supporting drinking water and baseflow resilience',
        'High-altitude oligotrophic & endorheic basins (Gangabal, Tarsar-Marsar, Sheshnag, Pangong Tso)',
      ],
    },
    {
      id: 'cryosphere',
      title: 'Cryosphere & Glacial Assets',
      icon: Mountain,
      category: 'High Altitude',
      color: 'text-purple-400',
      borderColor: 'hover:border-purple-500/40',
      bgGlow: 'from-purple-500/10 to-transparent',
      summary:
        'Orbital and archival glaciological tracking across 99 cataloged valley glaciers and 27 GLOF hazard zones.',
      layers: [
        'Terminus & mass-balance tracking across Kashmir Core (Kolahoi, Thajwas), Tier 2 Ladakh/Kishtwar (Drang-Drung, Parkachik, Machoi, Nun-Kun) & Tier 3 Karakoram',
        'Satellite-derived Snow Water Equivalent (SWE) and seasonal snow-cover persistence via MODIS & Sentinel-2',
        '27 moraine- and ice-dammed Glacial Lake Outburst Flood (GLOF) susceptibility zones across high-altitude basins',
        'Permafrost thaw and rock-glacier kinematics across Zanskar, Changthang, Nubra, and Upper Indus valleys',
        'Meltwater hydrograph timing shifts affecting downstream Jhelum, Chenab, and Indus irrigation regimes',
      ],
    },
    {
      id: 'protected',
      title: 'Protected Area Network',
      icon: Trees,
      category: 'Conservation',
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
      bgGlow: 'from-emerald-500/10 to-transparent',
      summary:
        '422 cataloged protected-network, wildlife sanctuary, conservation reserve, trail, and corridor records.',
      layers: [
        'Tier 1 Kashmir Core sanctuaries: Dachigam National Park, Overa-Aru, Gulmarg, Hirpora & Salim Ali National Park',
        'Tier 2 Jammu & Ladakh reserves: Kishtwar National Park, Hemis National Park, Changthang & Karakoram Wildlife Sanctuaries',
        'Tier 3 cross-border landscapes: Central Karakoram, Deosai, Khunjerab & Machiara National Parks',
        'Wetland & Conservation Reserves: Brain-Nishat, Khrew, Wangat, Khiram, Shikargah, Gharana & Surinsar-Mansar',
        'Connectivity corridors linking Hangul, Snow Leopard, Himalayan Brown Bear, and Pir Panjal Markhor habitats',
      ],
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity & Species Intelligence',
      icon: Activity,
      category: 'Fauna & Flora',
      color: 'text-teal-400',
      borderColor: 'hover:border-teal-500/40',
      bgGlow: 'from-teal-500/10 to-transparent',
      summary:
        '2,739 curated taxonomic records aligned with Darwin Core schemas and IUCN Red List assessments.',
      layers: [
        '1,834 vascular plant taxa, 601 avian species, 127 medicinal flora profiles, 111 mammals & 66 native/coldwater fish records',
        '60 dedicated IUCN threatened species dossiers led by Kashmir Stag (Hangul), Snow Leopard, Markhor & Black-necked Crane',
        'Central Asian Flyway (CAF) migratory waterfowl phenology linking Changthang, Hokersar, Wular, Gharana & Mangla staging grounds',
        'Endemic Western Himalayan alpine & medicinal flora (Saussurea costus/Kuth, Arnebia, Picrorhiza, Aconitum)',
        'Coordinate sensitivity masking on threatened wildlife observations to prevent poaching disturbance',
      ],
    },
    {
      id: 'monitoring',
      title: 'Environmental Quality & Pollution',
      icon: Radio,
      category: 'Pollution',
      color: 'text-amber-400',
      borderColor: 'hover:border-amber-500/40',
      bgGlow: 'from-amber-500/10 to-transparent',
      summary:
        'Dual-track environmental monitoring explicitly separating physical ground stations from satellite-modeled grids.',
      layers: [
        '5 physical ground-truth AQI reference stations (Srinagar, Jammu, Leh CAAQMS; Muzaffarabad & Gilgit EPA) vs. 44 CAMS/Open-Meteo modeled cells',
        'Municipal solid waste & bio-waste ward inventories across Kashmir Core and regional urban centers',
        'Sewage Treatment Plant (STP) capacity, BOD/COD effluent compliance, and lake nutrient-loading audits',
        'Horticultural & agricultural runoff pressure assessments across Karewa and floodplain sub-catchments',
        'Multi-temporal land-cover and impervious surface change detection across Srinagar, Jammu, and Leh corridors',
      ],
    },
    {
      id: 'hazards',
      title: 'Multi-Hazard Risk & Climate Stress',
      icon: AlertTriangle,
      category: 'Resilience',
      color: 'text-rose-400',
      borderColor: 'hover:border-rose-500/40',
      bgGlow: 'from-rose-500/10 to-transparent',
      summary:
        'Integrated multi-hazard surveillance across hydrological, cryospheric, seismic, slope, and synoptic atmospheric systems.',
      layers: [
        'Riverine flood & flash-flood susceptibility calibrated against 2014 Jhelum/Chenab benchmarks and live gauge thresholds',
        'Snow-avalanche zone profiles across Gulmarg, Sonamarg, Gurez, Zojila, Drass, Khardung La, and Pir Panjal passes',
        'Instrumental earthquake tracking via live USGS seismic feeds across Zone IV–V Himalayan thrust systems',
        'Near-real-time forest-fire thermal anomaly detection via NASA VIIRS/MODIS FIRMS across Jammu, Kashmir & AJK pine belts',
        'Synoptic Western Disturbance, monsoon intrusion, and 250 hPa subtropical jet circulation diagnostics',
      ],
    },
  ];

  // Multi-Source Data Architecture
  const dataArchitecture = [
    {
      icon: Cpu,
      title: 'Orbital Earth Observation (All 3 Tiers)',
      provider: 'Sentinel-1/2, Landsat 8/9, MODIS, Copernicus CAMS & DEM',
      desc: 'Continuous 10m–30m optical/SAR imagery and 0.1° atmospheric reanalysis providing wall-to-wall coverage across Kashmir Core, Jammu & Ladakh, and cross-border basins where in-situ access is absent.',
      color: 'text-sky-400',
    },
    {
      icon: Waves,
      title: 'Verified Ground & Public Agency Telemetry',
      provider: 'CPCB/JKPCC/LPCC CAAQMS, EPA Feeds, USGS, NASA FIRMS, River Gauges',
      desc: 'Strictly labeled in-situ station feeds (5 physical air-quality stations, 12 river gauge nodes, seismic & thermal feeds) never conflated with modeled reanalysis cells.',
      color: 'text-emerald-400',
    },
    {
      icon: Database,
      title: 'Official Administrative & Scientific Archives',
      provider: 'J&K GAD/IGOD, UT Ladakh S.O. 180 & 284, NWIA, ISFR, GBIF, IUCN',
      desc: 'Administrative registries verified against official government notifications alongside peer-reviewed limnological, glaciological, and Darwin Core taxonomic datasets.',
      color: 'text-amber-400',
    },
    {
      icon: Users,
      title: 'Verified Citizen & Academic Field Observations',
      provider: 'University Researchers, Wildlife Wardens, Pastoralists & Citizen Grid',
      desc: 'Geotagged field reports and species sightings concentrated in Tier 1 (Kashmir Core) and accessible Tier 2 (Jammu & Ladakh) study transects under multi-stage verification.',
      color: 'text-purple-400',
    },
  ];

  // Quick Cross-Module Navigation
  const relatedModules = [
    {
      title: 'Interactive Map Atlas',
      href: '/atlas',
      desc: 'Explore all 3-tier geographic scope layers interactively on vector GIS maps.',
      icon: Map,
    },
    {
      title: 'Water Systems Observatory',
      href: '/water-systems',
      desc: '553 master lakes, wetlands, rivers, glaciers, and springs across the Western Himalayas.',
      icon: Droplets,
    },
    {
      title: 'Protected Area Network',
      href: '/protected-network',
      desc: 'National parks, sanctuaries, conservation reserves, and wildlife corridors.',
      icon: Trees,
    },
    {
      title: 'Hazard Intelligence Grid',
      href: '/hazard-intelligence',
      desc: 'Multi-hazard tracking for floods, GLOFs, avalanches, earthquakes, and fires.',
      icon: AlertTriangle,
    },
    {
      title: 'Regional District Profiles',
      href: '/districts',
      desc: 'Inspect the 16 active district intelligence dossiers across Kashmir Core and Jammu.',
      icon: Compass,
    },
    {
      title: 'Geographic Notice & Governance',
      href: '/geographic-notice',
      desc: 'Legal and scientific neutrality framework governing all geographic references.',
      icon: ShieldCheck,
    },
  ];

  const activeTier = GEOGRAPHIC_SCOPE_TIERS[selectedTier];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface (Dimensions & Component Locked) ────────────────────────── */}
      <Heading
        icon={<Globe className="w-5 h-5 text-emerald-400" />}
        label="Bioregional Scope & Ecological Coverage"
        title="Western Himalayan Geographic Scope & Coverage"
        subtitle="Environmental boundaries, not political boundaries: Mapping interconnected ecosystems across Kashmir Core, Trans-Divisional (Jammu & Ladakh), and Transboundary watersheds, cryospheric massifs, and migratory corridors."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Governance', href: '/about/governance' },
          { label: 'Geographic Scope' },
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#framework"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
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

      {/* ─── Strategic Targets / Verified Scope & Monitoring Metrics Ribbon ──────── */}
      <section className="relative z-10 mt-6 sm:mt-8 mb-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {scopeMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xl"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-lg sm:text-xl font-black tracking-tight ${metric.color}`}>
                  {metric.value}
                </span>
                <metric.icon className="w-5 h-5 text-slate-400 shrink-0 opacity-70" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">{metric.title}</p>
                <p className="text-[11px] text-slate-400 leading-tight mt-1">{metric.desc}</p>
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
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                The Ecological Reality
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              Why an Ecosystem Framework is Essential
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light">
                    Nature does not recognize political or administrative boundaries. Rivers flow
                    across jurisdictions; migratory waterfowl fly between continents; glaciers feed
                    life downstream without regard for human borders.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    The Western Himalayas form an intricately coupled Earth system. Snow and glacier
                    melt across the Great Himalayan, Pir Panjal, Zanskar, and Karakoram ranges
                    sustains the Jhelum, Chenab, and Upper Indus basins. Winter temperature
                    inversions trap aerosols across intermontane valleys while Western Disturbances
                    deliver synoptic precipitation across the entire mountain arc.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    To represent this physical reality without overstating in-situ sensor density,
                    Kashmir EcoWatch explicitly distinguishes{' '}
                    <strong className="text-white font-semibold">
                      geographic &amp; ecological coverage
                    </strong>{' '}
                    from{' '}
                    <strong className="text-white font-semibold">
                      verified active ground monitoring
                    </strong>
                    —pairing certified station telemetry where physically deployed with orbital
                    remote sensing and atmospheric reanalysis across remote mountain and
                    transboundary basins.
                  </p>
                  <p className="text-emerald-400 font-semibold text-base sm:text-lg">
                    Kashmir EcoWatch organizes environmental intelligence by watersheds, elevation
                    zones, and bioregional corridors—never geopolitical claims.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        Analytical Premise
                      </p>
                      <p className="text-sm font-bold text-white">
                        Bioregional Coverage vs. Verified Telemetry Distinction
                      </p>
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
              <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/20 bg-slate-900 flex flex-col justify-between relative overflow-hidden">
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
                    Our three-tier classification reflects operational and ecological coupling: Tier
                    1 covers the 10-district Kashmir Valley core; Tier 2 unites the contiguous
                    regional divisions of Jammu (10 districts) and UT of Ladakh (8 notified
                    districts); Tier 3 tracks cross-border Indus, Neelum–Jhelum, Karakoram, and
                    flyway systems.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    This scientific convention aligns with UNEP, IUCN, Darwin Core, and Ramsar
                    watershed standards, ensuring full interoperability with international Earth
                    observation repositories.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">Watershed Coherence</span>
                      <span className="text-[11px] text-slate-400 leading-tight">
                        Tracking headwaters to downstream confluences across Jhelum, Chenab &amp;
                        Upper Indus basins.
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Contiguous Wildlife Corridors
                      </span>
                      <span className="text-[11px] text-slate-400 leading-tight">
                        Connecting Hangul, Snow Leopard, Brown Bear, Markhor &amp; Central Asian
                        Flyway habitats.
                      </span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Transparent Sensor Provenance
                      </span>
                      <span className="text-[11px] text-slate-400 leading-tight">
                        Explicit separation between physical ground stations, satellite remote
                        sensing &amp; CAMS models.
                      </span>
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
            <div className="mb-6 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Operational &amp; Ecological Hierarchy
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  The 3-Tier Scope Classification Framework
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-3xl">
                  Select a tier below to inspect its verified administrative coverage, ecological
                  landmarks, and explicit distinction between geographic inclusion and active
                  scientific monitoring.
                </p>
              </div>

              {/* Tier Navigation Tabs — Positioned beneath heading so all 3 tabs remain 100% simultaneously visible without clipping */}
              <div
                role="tablist"
                aria-label="Three-tier geographic scope selector"
                data-testid="geographic-tier-tablist"
                className="grid grid-cols-1 sm:inline-grid sm:grid-cols-3 gap-1.5 p-1.5 bg-slate-900 border border-white/10 rounded-xl w-full sm:w-auto max-w-full"
              >
                {GEOGRAPHIC_SCOPE_TIERS.map((tier, idx) => (
                  <button
                    key={tier.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedTier === idx}
                    aria-controls={`tier-panel-${tier.id}`}
                    id={`tier-tab-${tier.id}`}
                    onClick={() => setSelectedTier(idx)}
                    className={`px-4 py-2.5 rounded-lg text-xs sm:text-[13px] font-semibold text-center transition-all cursor-pointer ${
                      selectedTier === idx
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tier.tabLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tier Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier.id}
                id={`tier-panel-${activeTier.id}`}
                role="tabpanel"
                aria-labelledby={`tier-tab-${activeTier.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/20 bg-slate-900/60 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-[4px] text-xs font-bold border ${activeTier.badgeColor} mb-2`}
                    >
                      {activeTier.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">{activeTier.name}</h3>
                    <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-1">
                      {activeTier.subtitle}
                    </p>
                  </div>

                  {/* Dual Scientific Provenance Counters: Coverage vs Active Monitoring */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 shrink-0 lg:max-w-sm">
                    <div className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/85 px-3.5 py-2 rounded-xl border border-white/10">
                      <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          Geographic Coverage
                        </span>
                        <span className="font-semibold">{activeTier.coverageSummaryLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/85 px-3.5 py-2 rounded-xl border border-emerald-500/20">
                      <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider font-bold text-emerald-400">
                          Verified Active Monitoring
                        </span>
                        <span className="font-semibold">{activeTier.monitoringSummaryLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5 font-light">
                  {activeTier.description}
                </p>

                {activeTier.transboundaryLinkageNote && (
                  <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-slate-950/75 border border-sky-500/25 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{activeTier.transboundaryLinkageNote}</span>
                  </div>
                )}

                {/* Grouped Administrative Districts & Ecological Corridors */}
                <div className="mb-8 space-y-5">
                  {activeTier.administrativeGroups.map((grp, gIdx) => (
                    <div key={gIdx}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                          <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{grp.groupLabel}</span>
                        </h4>
                        <span className="text-[11px] text-slate-400">{grp.regionNote}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {grp.items.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-3 py-1.5 rounded-lg bg-slate-950/85 border border-white/10 text-xs font-medium text-slate-200 hover:border-emerald-500/40 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Geographic Assets vs Monitored Intelligence Layers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-3">
                      <Droplets className="w-4 h-4" />
                      <span>Key Landmarks &amp; Ecological Assets</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {activeTier.keyLandmarks.map((landmark, lIdx) => (
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
                      <span>Verified Telemetry &amp; Observation Modes</span>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {activeTier.monitoringFocus.map((focus, fIdx) => (
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

            {/* Verified Administrative Source Ledger */}
            <div className="mt-8 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/40">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
                    Administrative Registry Verification
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    Verified Administrative Units vs. Operational Dataset Coverage
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-slate-950 px-3 py-1 rounded-lg border border-white/10">
                  {verifiedTelemetry.totalNotifiedDistricts} Notified Districts ·{' '}
                  {verifiedTelemetry.totalBaselineUnits} Baseline Registry Units
                </span>
              </div>
              <div className="kew-table-scroll">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 pr-4 font-semibold">Tier</th>
                      <th className="py-2.5 pr-4 font-semibold">Administrative / Ecological Region</th>
                      <th className="py-2.5 pr-4 font-semibold">Official Units</th>
                      <th className="py-2.5 pr-4 font-semibold">Authoritative Reference</th>
                      <th className="py-2.5 font-semibold">KEW Monitoring &amp; Baseline Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {OFFICIAL_ADMIN_SOURCES.map((row) => (
                      <tr key={row.region} className="align-top">
                        <td className="py-3 pr-4 font-bold text-emerald-400 whitespace-nowrap">
                          {row.tier}
                        </td>
                        <td className="py-3 pr-4 font-semibold text-white">{row.region}</td>
                        <td className="py-3 pr-4 whitespace-nowrap text-sky-300 font-medium">
                          {row.districtCountSummary}
                        </td>
                        <td className="py-3 pr-4 text-slate-400">{row.authority}</td>
                        <td className="py-3 text-slate-300">{row.verificationNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 3: Environmental Systems Covered ─────────────────────────── */}
        <section id="systems" className="relative scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Holistic Bioregional Scope
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Six Core Environmental Domains
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Kashmir EcoWatch synthesizes verified records across six interconnected
                environmental domains spanning Kashmir Core, Trans-Divisional (Jammu &amp; Ladakh),
                and Transboundary mountain systems.
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
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 rounded-[4px] bg-slate-950 border border-white/5">
                          {system.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                        {system.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">{system.summary}</p>

                      <div className="space-y-2 pt-4 border-t border-white/10">
                        {system.layers.map((layer, lIdx) => (
                          <div
                            key={lIdx}
                            className="flex items-start gap-2 text-[11px] text-slate-400 leading-tight"
                          >
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
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Scientific Provenance
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Multi-Source Data Synthesis
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Every polygon, station feed, and modeled indicator across our three-tier geographic
                scope carries explicit source provenance and verification status.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {dataArchitecture.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="kew-card-shell p-6 sm:p-7 h-full">
                    <div className="kew-card-top-row">
                      <div className="kew-card-icon-box bg-slate-950 border border-white/10">
                        <IconComp className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400">{item.provider}</span>
                    </div>
                    <h3 className="kew-card-title text-base mb-2">{item.title}</h3>
                    <p className="kew-card-desc text-xs sm:text-sm">{item.desc}</p>
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
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  Institutional Charter
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
                Declaration of Scientific &amp; Political Neutrality
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <p>
                  Kashmir EcoWatch is an independent, non-commercial, public-interest environmental
                  intelligence observatory.
                </p>
                <p>
                  All geographic names, administrative designations, maps, geospatial overlays,
                  three-tier scope classifications, and environmental datasets presented across this
                  platform represent ecological and operational coverage for scientific research,
                  hydrological modeling, disaster-risk reduction, and conservation purposes only.
                </p>
                <p>
                  Nothing contained within this platform should be construed as expressing,
                  supporting, challenging, or implying any position regarding sovereignty,
                  international boundaries, territorial claims, administrative disputes, or
                  geopolitical viewpoints.
                </p>
                <p>
                  Environmental processes—from glacial retreat and river runoff to migratory bird
                  corridors and earthquake faults—naturally transcend human jurisdictions. Kashmir
                  EcoWatch mirrors these physical ecological realities to enable evidence-based
                  conservation, public disaster awareness, and sustainable resource stewardship.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center max-w-2xl mx-auto space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Our Guiding Principle
                </p>
                <blockquote className="text-xl sm:text-2xl font-light italic text-white leading-snug">
                  &ldquo;Nature is interconnected. Environmental intelligence should be too.&rdquo;
                </blockquote>
                <p className="text-xs text-slate-400">
                  Operated and supported philanthropically by{' '}
                  <a
                    href="https://dkf.sufisciencecenter.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Dr. Kumar Foundation USA
                  </a>{' '}
                  &amp; maintained by{' '}
                  <a
                    href="https://primelogicsol.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Prime Logic Solutions
                  </a>{' '}
                  as part of its CSR initiative.
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
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Ecosystem Exploration
                </span>
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
                      <p className="text-xs text-slate-400 leading-relaxed">{module.desc}</p>
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
