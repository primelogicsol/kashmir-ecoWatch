'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  Users, Microscope, Database, Satellite, 
  LeafyGreen, Globe, Shield, Activity, 
  Map, Network, Building2, Workflow,
  CheckCircle2, Globe2, Radio, Droplets,
  Award, Sparkles, ArrowRight, Heart,
  ExternalLink, Search, Cpu, BookOpen,
  Filter, Share2, Compass, Layers,
  ChevronRight, Landmark, BadgeCheck, FileText
} from 'lucide-react';

export default function ContributorsPage() {
  const [activeTab, setActiveTab] = useState<'board' | 'modelling' | 'divisions' | 'apis' | 'guidelines'>('board');
  const [searchQuery, setSearchQuery] = useState('');

  // Executive Metric Badges (matching About, Mission, Founder)
  const macroStats = [
    { value: '12', label: 'Platform Directorate', sub: 'Principal Scientific Advisory Board', icon: Users, color: 'text-emerald-400' },
    { value: '9', label: 'Modelling Specialists', sub: 'AI, WRF, ERA5 & satellite physics', icon: Workflow, color: 'text-cyan-400' },
    { value: '15', label: 'Internal Divisions', sub: 'Operational & analytical branches', icon: Building2, color: 'text-amber-400' },
    { value: '12+', label: 'Global Space APIs', sub: 'Live satellite & telemetry ingest feeds', icon: Satellite, color: 'text-purple-400' },
    { value: '20', label: 'Districts Monitored', sub: 'All mountain valleys across J&K', icon: Map, color: 'text-sky-400' },
    { value: '100%', label: 'Attributed Open Science', sub: 'FAIR data standards & academic citation', icon: Heart, color: 'text-rose-400' },
  ];

  // 1. Platform Directorate — Scientific Advisory Board (12 Members)
  const scientificBoard = [
    { 
      name: 'Dr. Arif Malik', 
      role: 'Principal Scientist, Hydrology & Mountain Water Systems', 
      domain: 'Water Resources & Alpine Glaciology',
      affiliation: 'Division of Hydrology & Flood Forecasting',
      focus: 'Trans-Himalayan discharge modeling, Jhelum river morphology, and glacial lake outburst monitoring.',
      icon: Activity, 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10 border-blue-500/20' 
    },
    { 
      name: 'Dr. Nazia Qadir', 
      role: 'Principal Ecologist, Biodiversity & Wildlife Conservation', 
      domain: 'Mammalian & Avian Bio-Indicators',
      affiliation: 'Division of Protected Area & Species Conservation',
      focus: 'High-altitude endangered fauna (Hangul, Snow Leopard), community corridors, and habitat continuity.',
      icon: LeafyGreen, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10 border-emerald-500/20' 
    },
    { 
      name: 'Dr. Rakesh Bhat', 
      role: 'Lead Geospatial Architect & Earth Observation Specialist', 
      domain: 'Satellite Remote Sensing & GIS',
      affiliation: 'Division of Spatial Analysis & Remote Sensing',
      focus: 'Multi-spectral satellite processing, DEM terrain modeling, and spatial vulnerability mapping.',
      icon: Map, 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10 border-amber-500/20' 
    },
    { 
      name: 'Dr. Shafiq Wani', 
      role: 'Director of Forest Ecology & Biomass Dynamics', 
      domain: 'Silviculture & Carbon Sequestration',
      affiliation: 'Division of Forest Ecology & Fire Dynamics',
      focus: 'Deodar and sub-alpine conifer canopy dynamics, wildfire spread forecasting, and timber health.',
      icon: LeafyGreen, 
      color: 'text-green-400', 
      bg: 'bg-green-500/10 border-green-500/20' 
    },
    { 
      name: 'Dr. Sameer Ahmad', 
      role: 'Senior Advisor, Disaster Risk Reduction & Emergency Governance', 
      domain: 'Multi-Hazard Resilience & Early Warning',
      affiliation: 'Division of Disaster Risk Reduction',
      focus: 'Sendai DRR implementation, municipal continuity plans, and community emergency evacuation.',
      icon: Shield, 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10 border-rose-500/20' 
    },
    { 
      name: 'Dr. Hina Firdous', 
      role: 'Lead Policy Analyst, Climate Adaptation & Transboundary Policy', 
      domain: 'UN Frameworks & International Protocols',
      affiliation: 'Division of Conservation Advocacy',
      focus: 'Harmonizing regional field observations with UN SDG 6, 11, 13, and 15 multilateral matrices.',
      icon: Globe2, 
      color: 'text-sky-400', 
      bg: 'bg-sky-500/10 border-sky-500/20' 
    },
    { 
      name: 'Prof. Tariq Geelani', 
      role: 'Chief Infrastructure Systems & Telemetry Architect', 
      domain: 'Sensor Networks & Digital Twins',
      affiliation: 'Division of Critical Infrastructure Resilience',
      focus: 'IoT river discharge gauges, municipal water SCADA telemetry, and automated weather station arrays.',
      icon: Network, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500/10 border-indigo-500/20' 
    },
    { 
      name: 'Dr. Asma Lone', 
      role: 'Epidemiologist & Environmental Health Specialist', 
      domain: 'Air Quality & Environmental Toxicology',
      affiliation: 'Division of Atmospheric Sciences & Air Quality',
      focus: 'Urban PM2.5 winter inversion respiratory risks, drinking water pathogens, and rural health equity.',
      icon: Activity, 
      color: 'text-teal-400', 
      bg: 'bg-teal-500/10 border-teal-500/20' 
    },
    { 
      name: 'Dr. Irfan Zargar', 
      role: 'Cryosphere Specialist & High-Altitude Glaciologist', 
      domain: 'Glacier Mass Balance & Cryospheric Risk',
      affiliation: 'Division of Glaciology & Cryosphere Risk',
      focus: 'Kolhai, Machoi and Siachen ablation rates, permafrost thaw, and moraine stability analysis.',
      icon: Microscope, 
      color: 'text-blue-300', 
      bg: 'bg-blue-400/10 border-blue-400/20' 
    },
    { 
      name: 'Dr. Mehak Sayeed', 
      role: 'Limnologist & Aquatic Systems Specialist', 
      domain: 'Freshwater Ecology & Lake Restoration',
      affiliation: 'Division of Water Quality & Limnology',
      focus: 'Dal and Wular Lake trophic state index, macrophyte encroachment, and dissolved oxygen kinetics.',
      icon: Droplets, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-500/10 border-cyan-500/20' 
    },
    { 
      name: 'Dr. Javaid Dar', 
      role: 'Agricultural Ecologist & Watershed Soil Scientist', 
      domain: 'Agro-Ecology & Soil Degradation',
      affiliation: 'Division of Agricultural Ecology & Soil Health',
      focus: 'Karewa soil erosion, pesticide runoff in apple orchards, and sustainable hillside terracing.',
      icon: LeafyGreen, 
      color: 'text-lime-400', 
      bg: 'bg-lime-500/10 border-lime-500/20' 
    },
    { 
      name: 'Prof. Nighat Ali', 
      role: 'Director of Community Engagement & Indigenous Knowledge', 
      domain: 'Traditional Ecological Knowledge (TEK)',
      affiliation: 'Division of Field Operations & Community Stewardship',
      focus: 'Documenting centuries-old pastoral calendars, Bakarwal migration routes, and village spring lore.',
      icon: Users, 
      color: 'text-amber-500', 
      bg: 'bg-amber-600/10 border-amber-600/20' 
    }
  ];

  // 2. Data Science & Predictive Modelling Team (9 Modellers)
  const modellingTeam = [
    { 
      name: 'Dr. Sarah Mitchell', 
      role: 'Lead Climate Modeller', 
      expertise: 'Climate Reanalysis & Mesoscale Downscaling', 
      model: 'ECMWF ERA5 & WRF 3km High-Resolution Downscaling', 
      outputs: 'Daily regional precipitation and thermal anomaly grids for high-altitude micro-climates',
      icon: Globe2, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-500/10 border-cyan-500/20' 
    },
    { 
      name: 'Dr. James Harrison', 
      role: 'Hydrological Forecasting Lead', 
      expertise: 'River Routing & Inundation Hydrodynamics', 
      model: 'GloFAS & Hydro-AI Flood Extent Predictor', 
      outputs: '72-hour lead time flash flood alerts and Jhelum tributary crest projections',
      icon: Activity, 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10 border-blue-500/20' 
    },
    { 
      name: 'Dr. Emily Carter', 
      role: 'Avalanche & Cryosphere Analyst', 
      expertise: 'Snowpack Physics & Glacier Mass Balance', 
      model: 'SNOWPACK & High-Altitude Alpine Equilibrium Models', 
      outputs: 'Slope-specific avalanche hazard bulletins for mountain passes and ski basins',
      icon: Map, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500/10 border-indigo-500/20' 
    },
    { 
      name: 'Dr. Marcus Sterling', 
      role: 'Fire Spread & Geospatial Modeller', 
      expertise: 'Wildfire Behavior & Thermal Radiative Power', 
      model: 'FARSITE & NASA FIRMS VIIRS/MODIS Pipeline', 
      outputs: 'Real-time thermal hotspot classification and fire vector path simulations',
      icon: Radio, 
      color: 'text-orange-400', 
      bg: 'bg-orange-500/10 border-orange-500/20' 
    },
    { 
      name: 'Dr. William Vance', 
      role: 'Landslide Susceptibility Modeller', 
      expertise: 'Soil Saturation, Slope Stability & Geomorphology', 
      model: 'USGS SHALSTAB & InSAR Displacement Analytics', 
      outputs: 'Critical highway corridor debris flow probability indices (NH44, Mughal Road)',
      icon: Network, 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10 border-amber-500/20' 
    },
    { 
      name: 'Dr. Claire Bennett', 
      role: 'Biodiversity & Species AI Lead', 
      expertise: 'Ecological Niche & Habitat Suitability Modelling', 
      model: 'MaxEnt Species AI & Protected Habitat Envelopes', 
      outputs: 'Climate-induced species range shift maps for endangered flora and fauna',
      icon: LeafyGreen, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10 border-emerald-500/20' 
    },
    { 
      name: 'Dr. Jonathan Hayes', 
      role: 'Atmospheric Chemistry Lead', 
      expertise: 'Air Quality & Inversion Layer Dispersion', 
      model: 'Copernicus CAMS & AERMOD Chemical Dispersion', 
      outputs: 'Valley-wide particulate matter forecast models and biomass burning plume tracking',
      icon: Network, 
      color: 'text-purple-400', 
      bg: 'bg-purple-500/10 border-purple-500/20' 
    },
    { 
      name: 'Dr. Rachel Foster', 
      role: 'Seismic Risk Analyst', 
      expertise: 'Tectonic Fault Mechanics & Ground Acceleration', 
      model: 'USGS PSHA & ShakeMap Peak Ground Acceleration (PGA)', 
      outputs: 'Automated seismic shockwave alerts calibrated for Western Himalayan fault systems',
      icon: Activity, 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10 border-rose-500/20' 
    },
    { 
      name: 'Dr. David Chen', 
      role: 'Water Quality & Limnology AI Specialist', 
      expertise: 'Satellite Multi-Spectral Limnology & Algal Blooms', 
      model: 'Sentinel-2 Cyanobacteria Index & Multi-Band Chlorophyll-a', 
      outputs: 'Lake eutrophication dashboards and drinking water intake contamination warnings',
      icon: Droplets, 
      color: 'text-sky-400', 
      bg: 'bg-sky-500/10 border-sky-500/20' 
    }
  ];

  // 3. Specialized Internal Operational Divisions (15 Divisions)
  const internalDivisions = [
    { 
      name: 'Division of Protected Area & Species Conservation', 
      role: 'Wildlife & Habitat Stewardship', 
      code: 'D-PASC',
      mandate: 'Monitors 150+ protected national parks, wildlife sanctuaries, and conservation reserves across Jammu, Kashmir, and Ladakh.',
      icon: Shield,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    { 
      name: 'Division of Atmospheric Sciences & Air Quality', 
      role: 'Air Quality Enforcement & Modelling', 
      code: 'D-ASAQ',
      mandate: 'Maintains real-time AQI observation grids, winter thermal inversion tracking, and industrial brick-kiln emission footprints.',
      icon: Activity,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    { 
      name: 'Division of Climate & Extreme Weather', 
      role: 'Meteorological Forecasting & Risk', 
      code: 'D-CEW',
      mandate: 'Delivers high-altitude weather models, Western Disturbance tracking, and localized micro-climatic anomaly detection.',
      icon: Network,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    { 
      name: 'Division of Hydrology & Flood Forecasting', 
      role: 'River Discharge & Inundation Data', 
      code: 'D-HFF',
      mandate: 'Calibrates gauge records along Jhelum, Lidder, Sind, and Chenab with real-time flood stage indicators.',
      icon: Droplets,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    { 
      name: 'Division of Glaciology & Cryosphere Risk', 
      role: 'Avalanche & Glacier Intelligence', 
      code: 'D-GCR',
      mandate: 'Quantifies ice mass depletion, seasonal snowline retreat, and high-altitude glacial lake outburst flood (GLOF) risks.',
      icon: Map,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
    { 
      name: 'Division of Geo-Hazards & Tectonics', 
      role: 'Landslide & Seismic Stability Mapping', 
      code: 'D-GHT',
      mandate: 'Maps active fault zones, rockfall hazard zones, and highway corridor slope vulnerabilities.',
      icon: Map,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    },
    { 
      name: 'Division of Spatial Analysis & Remote Sensing', 
      role: 'Satellite Intelligence & GIS', 
      code: 'D-SARS',
      mandate: 'Processes Sentinel-2, Landsat-9, and Planet orbital imagery into Darwin Core and ISO 19115 compliant spatial polygons.',
      icon: Microscope,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    { 
      name: 'Division of Agricultural Ecology & Soil Health', 
      role: 'Agro-Ecological & Soil Monitoring', 
      code: 'D-AESH',
      mandate: 'Evaluates saffron plateau degradation, pesticide residues in horticultural belts, and soil organic carbon.',
      icon: LeafyGreen,
      color: 'text-lime-400',
      bg: 'bg-lime-500/10 border-lime-500/20'
    },
    { 
      name: 'Division of Critical Infrastructure Resilience', 
      role: 'Hydrological & Infrastructure Planning', 
      code: 'D-CIR',
      mandate: 'Conducts continuity audits for municipal water utilities, bridges, hydro-electric dams, and communication lifelines.',
      icon: Building2,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    { 
      name: 'Division of Water Quality & Limnology', 
      role: 'Lake Restoration & Spectral Analysis', 
      code: 'D-WQL',
      mandate: 'Conducts biological and chemical water quality monitoring across 1,000+ freshwater lakes, rivers, and springs.',
      icon: Droplets,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    },
    { 
      name: 'Division of Wetland & Avian Habitats', 
      role: 'Wetland Stewardship & Avian Tracking', 
      code: 'D-WAH',
      mandate: 'Oversees Ramsar wetland conservation (Hokersar, Wular, Haigam, Shallabugh) and Central Asian Flyway avian census records.',
      icon: Globe2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    { 
      name: 'Division of Forest Ecology & Fire Dynamics', 
      role: 'Forest Cover & Fire Risk Mitigation', 
      code: 'D-FEFD',
      mandate: 'Tracks coniferous canopy fragmentation, illegal timber encroachments, and real-time fire detection.',
      icon: LeafyGreen,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    { 
      name: 'Division of Disaster Risk Reduction', 
      role: 'Trans-Divisional Hazard Policy', 
      code: 'D-DRR',
      mandate: 'Coordinates multi-agency early warning protocols, disaster simulation models, and vulnerability indices.',
      icon: Shield,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20'
    },
    { 
      name: 'Division of Conservation Advocacy', 
      role: 'Public Policy & Ecological Law', 
      code: 'D-CA',
      mandate: 'Translates scientific findings into actionable policy briefs for regulatory bodies, local assemblies, and civic leaders.',
      icon: Globe,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    { 
      name: 'Division of Field Operations & Community Stewardship', 
      role: 'Human-Wildlife Conflict & Ground Truth', 
      code: 'D-FOCS',
      mandate: 'Dispatches rapid field verification teams for human-wildlife encounters, forest damage, and citizen-science reporting.',
      icon: Shield,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    }
  ];

  // 4. Global Intelligence Feeds & Telemetry Partners
  const globalProviders = [
    { 
      category: 'Space Agencies & Earth Observation Satellites',
      items: [
        { name: 'Copernicus / ESA', role: 'Sentinel-1 Radar & Sentinel-2 Multi-Spectral satellite telemetry for flood extent and vegetation index (NDVI).', icon: Satellite, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
        { name: 'NASA FIRMS', role: 'Near real-time active forest fire and thermal anomaly detection via VIIRS and MODIS orbital sensors.', icon: Radio, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
        { name: 'NASA GPM', role: 'Global Precipitation Measurement constellation providing high-resolution rainfall telemetry and cloud bursts.', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
        { name: 'USGS Earth Resources', role: 'Landsat 8/9 longitudinal multi-decade surface temperature, urban sprawl, and cryosphere retreat feeds.', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' }
      ]
    },
    { 
      category: 'Global Hydrology, Meteorology & Seismic Feeds',
      items: [
        { name: 'Open-Meteo API', role: 'High-resolution global weather reanalysis, ECMWF & GFS ensemble models, and hourly atmospheric forecasts.', icon: Database, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
        { name: 'Google Flood Hub', role: 'AI-driven hydrological river routing and machine learning inundation forecasts across Jhelum tributaries.', icon: Workflow, color: 'text-blue-500', bg: 'bg-blue-600/10 border-blue-600/20' },
        { name: 'USGS Earthquake Hazards', role: 'Automated global seismic event feeds delivering magnitude, depth, and ShakeMap peak ground acceleration.', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
      ]
    },
    { 
      category: 'Biodiversity, Avian & Environmental Health Datasets',
      items: [
        { name: 'GBIF — Global Biodiversity Info Facility', role: 'Over 4,200 taxonomic occurrence records harmonized to Darwin Core formats for the Western Himalayas.', icon: LeafyGreen, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
        { name: 'IUCN Red List of Threatened Species', role: 'Authoritative threat status, population trends, and ecological ranges for vulnerable regional fauna and flora.', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-600/10 border-rose-600/20' },
        { name: 'eBird / Cornell Lab of Ornithology', role: 'Avian migration records, waterfowl counts, and seasonal arrivals across Kashmir Ramsar wetlands.', icon: LeafyGreen, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
        { name: 'WAQI / AQICN Global Air Quality', role: 'Real-time air quality index telemetry, PM2.5, PM10, and atmospheric dispersion metrics.', icon: Network, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' }
      ]
    },
    { 
      category: 'Multilateral Standards & Humanitarian Datasets',
      items: [
        { name: 'World Bank Open Data', role: 'Socio-environmental vulnerability indicators, rural water access, and climate resilience indices.', icon: Globe2, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
        { name: 'UN OCHA / ReliefWeb', role: 'UN disaster situation reports, emergency hazard assessments, and humanitarian logistical matrices.', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' }
      ]
    }
  ];

  // Filtering logic
  const filteredBoard = scientificBoard.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.focus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredModellers = modellingTeam.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDivisions = internalDivisions.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.mandate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Users className="w-5 h-5 text-emerald-400" />}
        label="Consortium & Governance Directory"
        title="Western Himalayan Global Intelligence Network"
        subtitle="The multidisciplinary scientific consortium, predictive modelling teams, operational divisions, and international space agencies powering Kashmir EcoWatch."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contributors & Intelligence Network' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#directorate"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Scientific Directorate</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/about/founder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400 font-semibold text-sm transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Founder Leadership</span>
            </Link>
            <Link
              href="/about/partners"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
            >
              <Landmark className="w-4 h-4 text-sky-400" />
              <span>Institutional Partners</span>
            </Link>
          </div>
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-8">
        
        {/* ─── Macro Stats Banner (Mirrors Mission & Founder) ─────────────────────── */}
        {/* ─── Macro Stats Banner (Robust Responsive Cards with Zero Text Leak) ── */}
        <section className="relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {macroStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl min-h-[140px] overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-black tracking-tight leading-none ${stat.value.length > 7 ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'} ${stat.color}`}>
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

        {/* ─── Institutional Mandate & Four Geospatial Frameworks ───────────────── */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-slate-900/80 to-slate-950 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
              
              <div className="max-w-3xl mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Attributed Open Science Platform</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                  A Federated Observatory Built on Rigorous Multi-Agency Data
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  Kashmir EcoWatch synthesizes observations from international space agencies, regional scientific consortiums, and frontline university researchers into an authoritative, living public record for the Western Himalayas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                {[
                  { name: 'Kashmir Core Valley', desc: 'Central valley ecosystems, Dal & Wular basins, and foothill catchments', icon: Map, color: 'text-emerald-400' },
                  { name: 'Trans-Divisional', desc: 'Inter-regional environmental & multi-hazard corridors across J&K and Ladakh', icon: Network, color: 'text-sky-400' },
                  { name: 'Transboundary Basins', desc: 'Indus Basin hydrological streams, upper glacial icefields & trans-Himalayan weather', icon: Globe2, color: 'text-purple-400' },
                  { name: 'All 20 Districts', desc: 'Granular, sub-district baseline reporting, telemetry stations, and hazard alerts', icon: Activity, color: 'text-amber-400' }
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

        {/* ─── Search & Interactive Navigation Tabs ─────────────────────────────── */}
        <section id="directorate" className="scroll-mt-24">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Directory Explorer</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Network Roster & Core Divisions
                </h2>
              </div>

              {/* Quick Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search scientists, models, divisions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Pill Navigation Tabs (mirrors Founder page certification tabs) */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10">
              {[
                { id: 'board', label: 'Platform Directorate (12)', icon: Users },
                { id: 'modelling', label: 'Data Science & Modelling (9)', icon: Workflow },
                { id: 'divisions', label: 'Internal Divisions (15)', icon: Building2 },
                { id: 'apis', label: 'Global Space APIs & Feeds', icon: Satellite },
                { id: 'guidelines', label: 'Contribution Protocol & FAIR Ethos', icon: BookOpen }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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

            {/* ─── Tab 1: Platform Directorate (12 Core Members) ──────────────────── */}
            {activeTab === 'board' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    The principal scientific core responsible for data validation, hydrological modeling, peer review, and spatial verification.
                  </p>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline-block">
                    {filteredBoard.length} Members Listed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBoard.map((member, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-6 sm:p-7 rounded-3xl border ${member.bg} flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xl group`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <member.icon className={`w-6 h-6 ${member.color}`} />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            Scientific Core
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Tab 2: Data Science & Predictive Modelling Team ────────────────── */}
            {activeTab === 'modelling' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    The analytical engine translating raw telemetry, satellite feeds, and physics models into localized predictive hazard algorithms.
                  </p>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider hidden sm:inline-block">
                    {filteredModellers.length} Models & Leads
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModellers.map((modeller, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-6 sm:p-7 rounded-3xl border ${modeller.bg} flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xl group`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <modeller.icon className={`w-6 h-6 ${modeller.color}`} />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                            Predictive AI
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                          {modeller.name}
                        </h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${modeller.color} mb-3`}>
                          {modeller.role}
                        </p>

                        <div className="space-y-2.5 mb-4">
                          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">Primary Model Engine</p>
                            <p className="text-xs font-bold text-white leading-snug">{modeller.model}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">Focus & Outputs</p>
                            <p className="text-xs text-slate-300 leading-relaxed">{modeller.outputs}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-300">Expertise:</span> {modeller.expertise}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Tab 3: Internal Divisions (15 Branches) ────────────────────────── */}
            {activeTab === 'divisions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    The 15 dedicated operational and analytical directorate branches powering Eco Watch Western Himalaya.
                  </p>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider hidden sm:inline-block">
                    {filteredDivisions.length} Active Divisions
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDivisions.map((div, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-6 sm:p-7 rounded-3xl border ${div.bg} flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xl group`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div.icon className={`w-6 h-6 ${div.color}`} />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold">
                            {div.code}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1.5 leading-snug group-hover:text-amber-300 transition-colors">
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
                        <span>Western Himalaya Core</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Tab 4: Global Intelligence APIs & Feeds ────────────────────────── */}
            {activeTab === 'apis' && (
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <p className="text-sm text-slate-400">
                    International space agencies, global sensor arrays, and multilateral reference systems streaming empirical observation data directly into KEW.
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
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-300">API Feed</span>
                              </div>
                              <h4 className="text-base font-bold text-white mb-2">{api.name}</h4>
                              <p className="text-xs text-slate-300 leading-relaxed">{api.role}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                              <span>LIVE TELEMETRY</span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Tab 5: Contribution Protocol & FAIR Ethos ──────────────────────── */}
            {activeTab === 'guidelines' && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <BookOpen className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">How to Contribute & Data Quality Standards</h3>
                      <p className="text-sm text-slate-400">Guiding principles for scientific researchers, field monitors, and university teams.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {[
                      {
                        title: '1. FAIR Data Principles',
                        desc: 'All submitted datasets must be Findable, Accessible, Interoperable, and Reusable, tagged with metadata, bounding coordinates, and creator ORCID IDs.',
                        icon: Database,
                        color: 'text-emerald-400'
                      },
                      {
                        title: '2. Sensitivity Masking',
                        desc: 'Geotagged sightings of vulnerable wildlife (Hangul, Musk Deer, endangered medicinal plants) are fuzzified by 5km to eliminate poaching vulnerability.',
                        icon: Shield,
                        color: 'text-amber-400'
                      },
                      {
                        title: '3. Peer Corroboration',
                        desc: 'Citizen and volunteer reports pass through our 8-stage verification pipeline before status elevation to Verified Regional Observation.',
                        icon: CheckCircle2,
                        color: 'text-sky-400'
                      },
                      {
                        title: '4. Non-Commercial Covenant',
                        desc: 'All research contributions remain perpetually free and open-access. No data published on KEW is ever commercialized or paywalled.',
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
                      <h4 className="text-sm font-bold text-white">Ready to share ecological data or field surveys?</h4>
                      <p className="text-xs text-slate-400">Access our standardized data deposit portal or explore institutional onboarding.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/contribute-data"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                      >
                        Deposit Datasets
                      </Link>
                      <Link
                        href="/about/partners"
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
                      >
                        Institutional Partnership
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ─── Institutional Backing & Reciprocal Links ─────────────────────────── */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Philanthropic Sponsorship & Engineering Delivery</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Spearheaded & Supported by Dr. Kumar Foundation USA
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  Maintained with zero commercial monetization as a permanent Knowledge Return System for Kashmir, with enterprise cloud engineering provided gratis by Prime Logic Solutions under Corporate Social Responsibility (CSR).
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
