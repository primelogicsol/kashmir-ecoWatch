'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { PLATFORM_METRICS } from '@/data/platform-metrics';
import { DATASET_LICENSE_POLICIES } from '@/data/dataset-licensing-registry';
import {
  Users, Microscope, Database, Satellite,
  LeafyGreen, Globe, Shield, Activity,
  Map, Network, Building2, Workflow,
  CheckCircle2, Globe2, Radio, Droplets,
  Award, Sparkles, ArrowRight, Heart,
  Search, BookOpen, Landmark, BadgeCheck, FileCheck
} from 'lucide-react';

export default function ContributorsPage() {
  const [activeTab, setActiveTab] = useState<'board' | 'modelling' | 'divisions' | 'apis' | 'guidelines'>('board');
  const [searchQuery, setSearchQuery] = useState('');

  // Provenance-backed Institutional & Coverage Counters (resolved from PLATFORM_METRICS)
  const macroStats = [
    { value: '1', label: 'Verified Founding Lead', sub: 'Mr. Fayaz Ahmad Khan (ESRO 2004)', icon: Award, color: 'text-emerald-400' },
    { value: 'Open', label: 'Academic Onboarding', sub: 'ORCID & signed consent required', icon: FileCheck, color: 'text-cyan-400' },
    { value: '15', label: 'Thematic Desk Scopes', sub: 'Functional analytical workstreams', icon: Building2, color: 'text-amber-400' },
    { value: '13', label: 'Upstream Public Feeds', sub: 'External space & scientific APIs', icon: Satellite, color: 'text-purple-400' },
    { value: PLATFORM_METRICS.operationalDistrictsCount.formattedValue, label: 'Operational Districts', sub: `${PLATFORM_METRICS.subregionsCount.formattedValue} Western Himalayan subregions`, icon: Map, color: 'text-sky-400' },
    { value: 'CC BY-NC 4.0', label: 'Non-Commercial Science', sub: 'KEW syntheses · source rights retained', icon: Heart, color: 'text-rose-400' },
  ];

  // 1. Verified Founding Leadership & Open Academic Contributor Desks
  // (21 unverified/synthetic named PhD profiles have been permanently quarantined pending signed consent + ORCID verification)
  const leadershipAndOnboardingDesks = [
    {
      name: 'Mr. Fayaz Ahmad Khan',
      role: 'Founder & Honorary Director (Verified Founding Leadership)',
      domain: 'Environmental Geospatial Information Science & Platform Architecture',
      affiliation: 'Kashmir EcoWatch Western Himalayan · Founder of ESRO (Est. 2004)',
      focus: 'Leads platform architecture, multidisciplinary synthesis standards, hazard intelligence integration, and institutional governance across the Western Himalayan observatory.',
      badge: 'Verified Leadership',
      icon: Award,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
    },
    {
      name: 'Hydrology, Limnology & Cryosphere Review Desk (Open Academic Onboarding)',
      role: 'External Specialist Reviewer Slot — ORCID & Written Consent Required',
      domain: 'Mountain Water Systems, Lake Restoration & Glacier Mass Balance',
      affiliation: 'Open Academic Contributor Pathway',
      focus: 'Inviting credentialed hydrologists, limnologists, and glaciologists with verified ORCID records and signed institutional/personal consent to review Western Himalayan water dossiers.',
      badge: 'Onboarding Open',
      icon: Droplets,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      name: 'Biodiversity, Taxonomy & Protected Areas Review Desk (Open Academic Onboarding)',
      role: 'External Specialist Reviewer Slot — ORCID & Written Consent Required',
      domain: 'Mammalogy, Ornithology, Ichthyofauna & Vascular Flora',
      affiliation: 'Open Academic Contributor Pathway',
      focus: 'Inviting herbarium taxonomists, wildlife biologists, and IUCN specialist contributors to audit species checklists and conservation-sensitive habitat masks.',
      badge: 'Onboarding Open',
      icon: LeafyGreen,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      name: 'Atmospheric Physics, Hazards & Geomorphology Desk (Open Academic Onboarding)',
      role: 'External Specialist Reviewer Slot — ORCID & Written Consent Required',
      domain: 'Air Quality, Slope Stability, Seismic Risk & Sendai DRR',
      affiliation: 'Open Academic Contributor Pathway',
      focus: 'Inviting atmospheric scientists, engineering geologists, and disaster-risk researchers to review winter inversion airshed models and slope-hazard syntheses.',
      badge: 'Onboarding Open',
      icon: Shield,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      name: 'Environmental Law, Fiscal Policy & Sectoral EIA Desk (Open Academic Onboarding)',
      role: 'External Specialist Reviewer Slot — ORCID & Written Consent Required',
      domain: 'Public Interest Litigation, CAG Audits & Ecological Economics',
      affiliation: 'Open Academic Contributor Pathway',
      focus: 'Inviting environmental legal scholars, policy analysts, and resource economists to corroborate statutory dockets, capital expenditure audits, and cumulative EIA matrices.',
      badge: 'Onboarding Open',
      icon: Landmark,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  // 2. Functional Analytical & Screening Model Pipelines (No Synthetic Named Modellers)
  const analyticalModelPipelines = [
    {
      name: 'Gridded Meteorological & Reanalysis Pipeline',
      role: 'External NWP & Reanalysis Ingestion Desk',
      expertise: 'Climate Reanalysis & Gridded Weather Synthesis',
      model: 'Open-Meteo / ECMWF ERA5 & IFS (~9–11 km Gridded Output)',
      outputs: 'Regional precipitation, temperature, and freezing-level screening grids (explicitly labeled as gridded model estimates, not ground stations).',
      icon: Globe2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      name: 'Hydrological Discharge & Flood Screening Pipeline',
      role: 'Basin Routing & Stage Screening Desk',
      expertise: 'River Discharge & Floodplain Exposure Synthesis',
      model: 'Copernicus GloFAS Gridded River Discharge & Historical CWC Benchmarks',
      outputs: 'Sub-basin discharge screening context across Upper Indus, Jhelum, Chenab, Shyok, Zanskar, Neelum, and Poonch rivers.',
      icon: Activity,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      name: 'Satellite Optical & Spectral Indices Pipeline',
      role: 'Multi-Spectral Remote Sensing Desk',
      expertise: 'NDVI, NDWI, NDCI & Land-Cover Change Screening',
      model: 'Copernicus Sentinel-2 L2A & USGS Landsat 8/9 Archive Synthesis',
      outputs: 'Optical lake trophic screening, wetland surface-area change baselines, and canopy disturbance mapping.',
      icon: Map,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      name: 'Thermal Hotspot & Seismic Catalog Pipeline',
      role: 'External Hazard Feed Aggregation Desk',
      expertise: 'Active Fire Detections & Tectonic Event Cataloging',
      model: 'NASA FIRMS VIIRS/MODIS, USGS ANSS ComCat, EMSC & NCS',
      outputs: 'Upstream satellite thermal anomaly tracking and verified regional earthquake catalog ingestion.',
      icon: Radio,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      name: 'Atmospheric Composition & Community Air Pipeline',
      role: 'Airshed Dispersion & Community Sensor Desk',
      expertise: 'Gridded Particulate Matter & Non-Regulatory Community Monitors',
      model: 'Copernicus CAMS Atmospheric Composition & AirGradient OpenAQ Feeds',
      outputs: 'Valley-wide winter inversion PM2.5/PM10 gridded estimates alongside disclosed community air monitors.',
      icon: Network,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  // 3. Thematic Functional Workstreams (15 Analytical Scopes — Aligned with PLATFORM_METRICS)
  const internalDivisions = [
    {
      name: 'Protected Area & Species Conservation Desk',
      role: 'Wildlife & Habitat Synthesis',
      code: 'D-PASC',
      mandate: `Synthesizes statutory baselines across ${PLATFORM_METRICS.protectedAreasVerifiedCount.formattedValue} verified protected areas, ${PLATFORM_METRICS.ramsarWetlandsCount.formattedValue} Ramsar wetlands, and ${PLATFORM_METRICS.verifiedSpeciesProfilesCount.formattedValue} verified species reference profiles across 5 Western Himalayan subregions.`,
      icon: Shield,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      name: 'Atmospheric Sciences & Air Quality Desk',
      role: 'Airshed Modelling & Documentary Synthesis',
      code: 'D-ASAQ',
      mandate: 'Synthesizes Copernicus CAMS gridded air quality estimates, community sensor feeds, winter thermal inversion dynamics, and brick-kiln emission inventories.',
      icon: Activity,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      name: 'Climate & Extreme Weather Desk',
      role: 'Meteorological Reanalysis & Risk',
      code: 'D-CEW',
      mandate: 'Tracks Western Disturbance climatology, gridded Open-Meteo / ERA5 temperature-precipitation anomalies, and high-altitude extreme weather baselines.',
      icon: Network,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      name: 'Hydrology & Basin Synthesis Desk',
      role: 'River Sub-Basin & Floodplain Baselines',
      code: 'D-HFF',
      mandate: `Documents hydrographic baselines across ${PLATFORM_METRICS.verifiedRiverBasinsCount.formattedValue} verified Indus-system river basins and major sub-basins alongside GloFAS model discharge context.`,
      icon: Droplets,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      name: 'Glaciology & Cryosphere Risk Desk',
      role: 'Glacier Recession & GLOF Synthesis',
      code: 'D-GCR',
      mandate: 'Synthesizes published geodetic glacier mass-balance literature, snowline retreat studies, and moraine-dammed glacial lake outburst flood (GLOF) assessments.',
      icon: Map,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      name: 'Geo-Hazards & Tectonics Desk',
      role: 'Landslide & Seismic Catalog Synthesis',
      code: 'D-GHT',
      mandate: 'Integrates USGS/EMSC/NCS seismic catalogs, published Himalayan fault-zone studies, and highway corridor slope-susceptibility literature.',
      icon: Map,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      name: 'Spatial Analysis & Remote Sensing Desk',
      role: 'Satellite Archive & GIS Harmonization',
      code: 'D-SARS',
      mandate: 'Harmonizes Sentinel-2, Landsat 8/9, and ISRO NWIA spatial baselines into Darwin Core and ISO 19115 compliant reference layers.',
      icon: Microscope,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      name: 'Agricultural Ecology & Soil Health Desk',
      role: 'Agro-Ecological & Karewa Synthesis',
      code: 'D-AESH',
      mandate: 'Documents Pampore/Pulwama and Budgam Karewa terrace degradation, horticultural agro-chemical runoff studies, and mountain soil conservation baselines.',
      icon: LeafyGreen,
      color: 'text-lime-400',
      bg: 'bg-lime-500/10 border-lime-500/20'
    },
    {
      name: 'Critical Infrastructure Resilience Desk',
      role: 'Environmental Infrastructure Audits',
      code: 'D-CIR',
      mandate: 'Synthesizes CAG performance audits and statutory reports on municipal sewage treatment plants (STPs), solid waste facilities, and hydropower corridors.',
      icon: Building2,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      name: 'Water Quality & Limnology Desk',
      role: 'Lake Inventory & Trophic Diagnostics',
      code: 'D-WQL',
      mandate: `Maintains the ${PLATFORM_METRICS.mappedWaterbodiesCount.formattedValue}-waterbody master lake & wetland registry (reconciled with ISRO NWIA's 391,501 ha baseline and published Carlson TSI studies).`,
      icon: Droplets,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      name: 'Wetland & Avian Habitats Desk',
      role: 'Ramsar & Flyway Synthesis',
      code: 'D-WAH',
      mandate: 'Documents the 7 designated Western Himalayan Ramsar sites (Wular, Hokera, Surinsar-Mansar, Shallbugh, Hygam, Tsomoriri, Tso Kar) and Central Asian Flyway waterbird censuses.',
      icon: Globe2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      name: 'Forest Ecology & Fire Dynamics Desk',
      role: 'Forest Cover & Thermal Anomaly Tracking',
      code: 'D-FEFD',
      mandate: 'Synthesizes FSI India State of Forest Report baselines, coniferous canopy fragmentation literature, and NASA FIRMS satellite thermal detections.',
      icon: LeafyGreen,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      name: 'Disaster Risk Reduction Desk',
      role: 'Sendai DRR & Multi-Hazard Policy',
      code: 'D-DRR',
      mandate: 'Aligns regional multi-hazard vulnerability syntheses and NDMA SACHET public advisories with Sendai Framework Priority 1 risk understanding.',
      icon: Shield,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      name: 'Environmental Law & Accountability Desk',
      role: 'Statutory & Judicial PIL Synthesis',
      code: 'D-CA',
      mandate: 'Compiles verified environmental statutes, NGT/High Court public-interest litigation summaries, and 24-section KEW-EIAI accountability matrices.',
      icon: Globe,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      name: 'Citizen Science & Community Stewardship Desk',
      role: 'Moderated Observation Intake',
      code: 'D-FOCS',
      mandate: 'Reviews community ecological submissions under the 8-stage validation pipeline with mandatory >=10 km GPS masking on poaching-sensitive species.',
      icon: Shield,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    }
  ];

  // 4. Upstream Global Reference Systems & Public Scientific Feeds
  const globalProviders = [
    {
      category: 'Space Agencies & Earth Observation Archives',
      items: [
        { name: 'Copernicus / ESA', role: 'Sentinel-1 SAR & Sentinel-2 Multi-Spectral satellite imagery for wetland surface area and NDVI/NDCI indices.', icon: Satellite, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
        { name: 'NASA FIRMS', role: 'Satellite active thermal anomaly detections via VIIRS and MODIS orbital sensors.', icon: Radio, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
        { name: 'NASA GPM / Earthdata', role: 'Global Precipitation Measurement satellite archives and Earth observation reference datasets.', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { name: 'USGS Earth Resources', role: 'Landsat 8/9 multi-decadal optical and thermal surface temperature archives.', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
      ]
    },
    {
      category: 'Upstream Meteorological, Hydrological & Seismic Feeds',
      items: [
        { name: 'Open-Meteo (ECMWF / GFS)', role: 'Gridded numerical weather model forecasts and ERA5 historical reanalysis (~9–11 km grid).', icon: Database, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
        { name: 'Copernicus GloFAS', role: 'Gridded river discharge forecasts and hydrological return-period screening.', icon: Workflow, color: 'text-blue-500', bg: 'bg-blue-600/10 border-blue-600/20' },
        { name: 'USGS ANSS / EMSC / NCS', role: 'Upstream global and regional seismic event catalogs for the Western Himalayan fault belt.', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
      ]
    },
    {
      category: 'Biodiversity, Taxonomic & Community Air Reference Systems',
      items: [
        { name: 'GBIF — Global Biodiversity Info Facility', role: 'Upstream Darwin Core taxonomic occurrence metadata for Western Himalayan reference cross-checks.', icon: LeafyGreen, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
        { name: 'IUCN Red List of Threatened Species', role: 'Global conservation threat categories and species range assessment standards.', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-600/10 border-rose-600/20' },
        { name: 'Ramsar Sites Information Service (RSIS)', role: 'Official treaty sheets for the 7 designated Western Himalayan Ramsar wetlands.', icon: Droplets, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
        { name: 'AirGradient / OpenAQ Community Feeds', role: 'Calibrated low-cost community air quality monitors with explicit non-regulatory disclosure.', icon: Network, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' }
      ]
    },
    {
      category: 'Multilateral Reference Frameworks',
      items: [
        { name: 'ICIMOD (Hindu Kush Himalaya)', role: 'Regional mountain cryosphere, springshed, and transboundary basin research publications.', icon: Globe2, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
        { name: 'UNDRR Sendai & UN SDG Frameworks', role: 'International indicator definitions referenced for regional environmental syntheses.', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' }
      ]
    }
  ];

  const q = searchQuery.toLowerCase().trim();
  const filteredLeadership = leadershipAndOnboardingDesks.filter(member =>
    !q ||
    member.name.toLowerCase().includes(q) ||
    member.role.toLowerCase().includes(q) ||
    member.domain.toLowerCase().includes(q) ||
    member.focus.toLowerCase().includes(q)
  );

  const filteredPipelines = analyticalModelPipelines.filter(m =>
    !q ||
    m.name.toLowerCase().includes(q) ||
    m.role.toLowerCase().includes(q) ||
    m.expertise.toLowerCase().includes(q) ||
    m.model.toLowerCase().includes(q)
  );

  const filteredDivisions = internalDivisions.filter(d =>
    !q ||
    d.name.toLowerCase().includes(q) ||
    d.role.toLowerCase().includes(q) ||
    d.mandate.toLowerCase().includes(q)
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      <Heading
        icon={<Users className="w-5 h-5 text-emerald-400" />}
        label="Verified Leadership, Functional Desks & Open Academic Onboarding"
        title="Contributors, Analytical Desks &amp; Onboarding Protocol"
        subtitle="Verified founding leadership, transparent academic contributor onboarding standards (requiring verified ORCID iD and signed written consent), functional research desks, and upstream public scientific data feeds."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contributors & Onboarding Protocol' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#directorate"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all duration-300"
            >
              <span>Leadership &amp; Onboarding</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/about/founder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-500/30 font-semibold text-sm transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Founder Profile</span>
            </Link>
            <Link
              href="/about/partners"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
            >
              <Landmark className="w-4 h-4 text-sky-400" />
              <span>Apply as Contributor</span>
            </Link>
          </div>
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-8">
        {/* Macro Stats Banner */}
        <section className="relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {macroStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl min-h-[140px] overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-black tracking-tight leading-none ${stat.value.length > 7 ? 'text-base sm:text-lg' : 'text-2xl sm:text-3xl'} ${stat.color}`}>
                      {stat.value}
                    </span>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 opacity-70" />
                  </div>
                  <div className="mt-auto">
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2">{stat.label}</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-1 line-clamp-2">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparent Attribution & Consent Governance Notice */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/20 bg-slate-900 shadow-2xl relative overflow-hidden">
              <div className="max-w-4xl mb-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Academic Attribution &amp; Written Consent Standard</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Zero Unverified Scholar Profiles — Verified Identity &amp; ORCID Required
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Kashmir EcoWatch publishes named external academic contributors, reviewers, and advisory members <strong className="text-white">only after</strong> verifying (1) a live <strong className="text-emerald-300">ORCID iD</strong>, (2) current or retired institutional credentials, and (3) a <strong className="text-emerald-300">signed written consent &amp; conflict-of-interest disclosure</strong>. Unverified or placeholder persona rosters are strictly prohibited on public directories.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {[
                  { name: '5 Subregions Covered', desc: 'Kashmir Valley, Jammu Region, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan', icon: Map, color: 'text-emerald-400' },
                  { name: `${PLATFORM_METRICS.operationalDistrictsCount.formattedValue} Operational Districts`, desc: 'Harmonized district baselines (10 KV + 10 Jammu + 2 Ladakh + 10 AJ&K + 14 GB)', icon: Activity, color: 'text-amber-400' },
                  { name: `${PLATFORM_METRICS.protectedAreasVerifiedCount.formattedValue} Protected Areas & ${PLATFORM_METRICS.ramsarWetlandsCount.formattedValue} Ramsar`, desc: 'Verified national parks, sanctuaries, conservation reserves, and RSIS wetlands', icon: Shield, color: 'text-sky-400' },
                  { name: DATASET_LICENSE_POLICIES['CC-BY-NC-4.0'].shortBadge, desc: 'Eligible KEW syntheses licensed CC BY-NC 4.0; upstream agency & journal rights retained', icon: Globe2, color: 'text-purple-400' }
                ].map((scope, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                    <div>
                      <scope.icon className={`w-6 h-6 ${scope.color} mb-3`} />
                      <h3 className="text-base font-bold text-white mb-1.5">{scope.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{scope.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search & Interactive Navigation Tabs */}
        <section id="directorate" className="scroll-mt-24">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Governance &amp; Functional Desks</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Verified Leadership, Specialist Onboarding &amp; Analytical Pipelines
                </h2>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search leadership, desks, models, feeds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10">
              {[
                { id: 'board', label: 'Leadership & Academic Onboarding', icon: Users },
                { id: 'modelling', label: 'Analytical & Model Pipelines (5)', icon: Workflow },
                { id: 'divisions', label: 'Thematic Desk Scopes (15)', icon: Building2 },
                { id: 'apis', label: 'Upstream Public APIs & Feeds', icon: Satellite },
                { id: 'guidelines', label: 'Onboarding Protocol & Licensing', icon: BookOpen }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab 1: Verified Leadership & Open Academic Contributor Onboarding */}
            {activeTab === 'board' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    Verified founding leadership alongside open specialist review desks accepting applications from ORCID-verified scholars.
                  </p>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline-block">
                    1 Verified Lead · 4 Open Review Desks
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLeadership.map((member, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-6 sm:p-7 rounded-3xl border ${member.bg} flex flex-col justify-between transition-all duration-300 shadow-xl`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center">
                            <member.icon className={`w-6 h-6 ${member.color}`} />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-[4px] bg-white/5 border border-white/10 text-slate-200">
                            {member.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">
                          {member.name}
                        </h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${member.color} mb-2`}>
                          {member.role}
                        </p>
                        <p className="text-xs font-semibold text-slate-300 mb-3">
                          {member.domain}
                        </p>

                        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-400 leading-relaxed mb-4">
                          {member.focus}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate">{member.affiliation}</span>
                        <Link href="/about/partners#expert-form" className="text-emerald-400 hover:underline font-semibold shrink-0 ml-2">
                          {member.badge === 'Verified Leadership' ? 'Founder Dossier →' : 'Apply with ORCID →'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Functional Analytical & Screening Model Pipelines */}
            {activeTab === 'modelling' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    Automated upstream data ingestion and analytical screening pipelines (presented as functional technical workflows rather than synthetic named staff).
                  </p>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider hidden sm:inline-block">
                    {filteredPipelines.length} Active Pipelines
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPipelines.map((modeller, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-6 sm:p-7 rounded-3xl border ${modeller.bg} flex flex-col justify-between transition-all duration-300 shadow-xl`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center">
                            <modeller.icon className={`w-6 h-6 ${modeller.color}`} />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-[4px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                            Screening Pipeline
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1">
                          {modeller.name}
                        </h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${modeller.color} mb-3`}>
                          {modeller.role}
                        </p>

                        <div className="space-y-2.5 mb-4">
                          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">Upstream Source / Engine</p>
                            <p className="text-xs font-bold text-white leading-snug">{modeller.model}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">Outputs &amp; Caveats</p>
                            <p className="text-xs text-slate-300 leading-relaxed">{modeller.outputs}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-300">Scope:</span> {modeller.expertise}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Thematic Desk Scopes */}
            {activeTab === 'divisions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    The 15 thematic analytical scopes structuring research syntheses across Kashmir EcoWatch Western Himalayan.
                  </p>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider hidden sm:inline-block">
                    {filteredDivisions.length} Thematic Scopes
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDivisions.map((div, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-6 sm:p-7 rounded-3xl border ${div.bg} flex flex-col justify-between transition-all duration-300 shadow-xl`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center">
                            <div.icon className={`w-6 h-6 ${div.color}`} />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-[4px] bg-white/5 border border-white/10 text-slate-300 font-bold">
                            {div.code}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                          {div.name}
                        </h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${div.color} mb-3`}>
                          {div.role}
                        </p>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {div.mandate}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Western Himalaya Synthesis Scope</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Upstream Public APIs & Feeds */}
            {activeTab === 'apis' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    External space agencies, global seismic/weather services, and multilateral reference systems ingested with upstream license attribution (0 KEW-owned physical field sensors claimed).
                  </p>
                </div>

                <div className="space-y-10">
                  {globalProviders.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Satellite className="w-4 h-4 text-purple-400" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                          {section.category}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {section.items.map((api, aIdx) => (
                          <div
                            key={aIdx}
                            className={`glass-panel p-6 rounded-2xl border ${api.bg} flex flex-col justify-between hover:bg-slate-900/80 transition-all`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-4">
                                <api.icon className={`w-7 h-7 ${api.color}`} />
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-300">Upstream Source</span>
                              </div>
                              <h4 className="text-base font-bold text-white mb-2">{api.name}</h4>
                              <p className="text-xs text-slate-300 leading-relaxed">{api.role}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                              <span>EXTERNAL ATTRIBUTION RETAINED</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Onboarding Protocol & Licensing */}
            {activeTab === 'guidelines' && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <BookOpen className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">Open Academic Contributor Onboarding Protocol</h3>
                      <p className="text-sm text-slate-400">Mandatory verification requirements before listing named scholars or publishing contributed datasets.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {[
                      {
                        title: '1. Verified ORCID & Signed Consent',
                        desc: 'Named academic contributors and reviewers are listed publicly only after submitting a verified ORCID iD, institutional affiliation proof (or personal-capacity declaration), and signed written publication consent.',
                        icon: FileCheck,
                        color: 'text-emerald-400'
                      },
                      {
                        title: '2. Sensitive Wildlife GPS Masking',
                        desc: 'Geotagged sightings of Critically Endangered, Endangered, and poaching-vulnerable species (Hangul, Snow Leopard, Markhor, Musk Deer, medicinal flora) are generalized to >=10 km / district grids.',
                        icon: Shield,
                        color: 'text-amber-400'
                      },
                      {
                        title: '3. 8-Stage Ingestion Validation',
                        desc: 'Submitted datasets and field observations pass through KEW’s 8-stage provenance and plausibility pipeline before publication.',
                        icon: CheckCircle2,
                        color: 'text-sky-400'
                      },
                      {
                        title: '4. CC BY-NC 4.0 Non-Commercial Covenant',
                        desc: 'Eligible KEW-authored synthesis datasets and desk-verified reports are published under CC BY-NC 4.0 (Non-Commercial); third-party statutory and journal works retain their original publisher rights.',
                        icon: Heart,
                        color: 'text-rose-400'
                      }
                    ].map((rule, rIdx) => (
                      <div key={rIdx} className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col justify-between">
                        <div>
                          <rule.icon className={`w-6 h-6 ${rule.color} mb-3`} />
                          <h4 className="text-base font-bold text-white mb-1.5">{rule.title}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{rule.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Apply as an ORCID-Verified Academic Reviewer or Data Contributor</h4>
                      <p className="text-xs text-slate-400">Submit credentials and visibility preferences through the onboarding gateway.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/share-data"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                      >
                        Share Dataset
                      </Link>
                      <Link
                        href="/about/partners#expert-form"
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
                      >
                        Expert Onboarding Form
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Institutional Backing & Reciprocal Links */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Philanthropic Sponsorship &amp; Engineering Stewardship</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Supported by Dr. Kumar Foundation USA &amp; Kumar Trust USA
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  Maintained with zero commercial monetization as a permanent Knowledge Return System for the Western Himalayas, with engineering and cloud infrastructure stewardship contributed by Prime Logic Solutions USA.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/about/founder"
                  className="px-5 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Founder Leadership</span>
                </Link>
                <Link
                  href="/about/support-sponsorship"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Sponsorship Details</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// QUARANTINED_ARCHIVE_METADATA
// Quarantined 21 unverified/synthetic PhD contributor profiles (12 scientificBoard + 9 modellingTeam) on 2026-11-27
// under datasetId 'institutional-academic-profiles' pending verified ORCID iD and signed written contributor consent.
