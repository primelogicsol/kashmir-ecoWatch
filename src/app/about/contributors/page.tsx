'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { 
  Users, Microscope, Database, Satellite, 
  LeafyGreen, Globe, Shield, Activity, 
  Map, Network, Building2, Workflow,
  CheckCircle2, Globe2, Radio, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContributorsPage() {
  const scientificBoard = [
    { name: 'Dr. Arif Malik', role: 'Principal Scientist, Hydrology', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { name: 'Dr. Nazia Qadir', role: 'Biodiversity Lead', icon: LeafyGreen, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Dr. Rakesh Bhat', role: 'Remote Sensing & GIS', icon: Map, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { name: 'Dr. Shafiq Wani', role: 'Forest Ecology Director', icon: LeafyGreen, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
    { name: 'Dr. Sameer Ahmad', role: 'Disaster Risk Reduction', icon: Shield, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { name: 'Dr. Hina Firdous', role: 'Climate Policy Lead', icon: Globe2, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
    { name: 'Prof. Tariq Geelani', role: 'Geo-Spatial Infrastructure', icon: Network, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { name: 'Dr. Asma Lone', role: 'Public Health & Environment', icon: Activity, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
    { name: 'Dr. Irfan Zargar', role: 'Cryosphere Dynamics', icon: Microscope, color: 'text-blue-300', bg: 'bg-blue-400/10 border-blue-400/20' },
    { name: 'Dr. Mehak Sayeed', role: 'Aquatic Ecosystems', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { name: 'Dr. Javaid Dar', role: 'Agronomy & Soil Science', icon: LeafyGreen, color: 'text-lime-400', bg: 'bg-lime-500/10 border-lime-500/20' },
    { name: 'Prof. Nighat Ali', role: 'Sustainable Development', icon: Users, color: 'text-amber-500', bg: 'bg-amber-600/10 border-amber-600/20' }
  ];

  const modellingTeam = [
    { name: 'Dr. Sarah Mitchell', role: 'Lead Climate Modeller', expertise: 'Climate Reanalysis & Machine Learning', model: 'ECMWF ERA5 & WRF Downscaling', icon: Globe2, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { name: 'Dr. James Harrison', role: 'Hydrological Forecasting Lead', expertise: 'River Routing & Flood Dynamics', model: 'GloFAS & Hydrological AI', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { name: 'Dr. Emily Carter', role: 'Avalanche & Cryosphere Analyst', expertise: 'Snowpack Physics & Glacier Mass Balance', model: 'SNOWPACK & Alpine Models', icon: Map, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { name: 'Dr. Marcus Sterling', role: 'Fire Spread & Geospatial Modeller', expertise: 'Wildfire Behavior & Thermal Anomalies', model: 'FARSITE & NASA FIRMS', icon: Radio, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { name: 'Dr. William Vance', role: 'Landslide Susceptibility Modeller', expertise: 'Soil Saturation & Geomorphology', model: 'USGS SHALSTAB Terrain Models', icon: Network, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { name: 'Dr. Claire Bennett', role: 'Biodiversity & Species AI', expertise: 'Ecological Niche Modelling', model: 'MaxEnt & Predictive Distribution AI', icon: LeafyGreen, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Dr. Jonathan Hayes', role: 'Atmospheric Chemistry Lead', expertise: 'Air Quality & Dispersion Modelling', model: 'CAMS & AERMOD Tracking', icon: Network, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { name: 'Dr. Rachel Foster', role: 'Seismic Risk Analyst', expertise: 'Tectonic Fault & Hazard Assessment', model: 'USGS PSHA & ShakeMap AI', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { name: 'Dr. David Chen', role: 'Water Quality & Limnology AI', expertise: 'Algal Bloom & Multi-spectral Analysis', model: 'Sentinel-2 Cyanobacteria Detection', icon: Droplets, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' }
  ];

  const internalDivisions = [
    { name: 'Division of Protected Area & Species Conservation', role: 'Wildlife & Habitat Stewardship', icon: Shield },
    { name: 'Division of Atmospheric Sciences & Air Quality', role: 'Air Quality Enforcement & Modelling', icon: Activity },
    { name: 'Division of Climate & Extreme Weather', role: 'Meteorological Forecasting & Risk', icon: Network },
    { name: 'Division of Hydrology & Flood Forecasting', role: 'River Discharge & Inundation Data', icon: Activity },
    { name: 'Division of Glaciology & Cryosphere Risk', role: 'Avalanche & Glacier Intelligence', icon: Map },
    { name: 'Division of Geo-Hazards & Tectonics', role: 'Landslide & Seismic Stability Mapping', icon: Map },
    { name: 'Division of Spatial Analysis & Remote Sensing', role: 'Satellite Intelligence & GIS', icon: Microscope },
    { name: 'Division of Agricultural Ecology & Soil Health', role: 'Agro-Ecological & Soil Monitoring', icon: LeafyGreen },
    { name: 'Division of Critical Infrastructure Resilience', role: 'Hydrological & Infrastructure Planning', icon: Building2 },
    { name: 'Division of Water Quality & Limnology', role: 'Lake Restoration & Spectral Analysis', icon: Droplets },
    { name: 'Division of Wetland & Avian Habitats', role: 'Wetland Stewardship & Avian Tracking', icon: Globe2 },
    { name: 'Division of Forest Ecology & Fire Dynamics', role: 'Forest Cover & Fire Risk Mitigation', icon: LeafyGreen },
    { name: 'Division of Disaster Risk Reduction', role: 'Trans-Divisional Hazard Policy', icon: Shield },
    { name: 'Division of Conservation Advocacy', role: 'Public Policy & Ecological Law', icon: Globe },
    { name: 'Division of Field Operations & Rescue', role: 'Human-Wildlife Conflict & Response', icon: Shield }
  ];

  const globalProviders = [
    { 
      category: 'Space Agencies & Remote Sensing',
      items: [
        { name: 'Copernicus / ESA', role: 'Satellite Remote Sensing & Flood Extent', icon: Satellite, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
        { name: 'NASA FIRMS', role: 'Live Forest Fire & Thermal Intelligence', icon: Radio, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
        { name: 'NASA GPM', role: 'Global Precipitation Measurement', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' }
      ]
    },
    {
      category: 'Global Hydrology & Climate',
      items: [
        { name: 'Open-Meteo', role: 'High-Resolution Weather & Climate Reanalysis', icon: Database, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
        { name: 'Google Flood Hub', role: 'Hydrological Threat AI & Inundation Forecasting', icon: Workflow, color: 'text-blue-500', bg: 'bg-blue-600/10 border-blue-600/20' },
        { name: 'USGS', role: 'Global Seismic & Fault Line Feeds', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
      ]
    },
    {
      category: 'Biodiversity & Public Health',
      items: [
        { name: 'GBIF', role: 'Global Biodiversity Occurrence Records', icon: LeafyGreen, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
        { name: 'IUCN Red List', role: 'Species Vulnerability & Threat Data', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-600/10 border-rose-600/20' },
        { name: 'eBird / Cornell Lab', role: 'Avian Tracking & Migration Records', icon: LeafyGreen, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
        { name: 'WAQI / AQICN', role: 'Real-Time Air Quality Index (AQI)', icon: Network, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' }
      ]
    },
    {
      category: 'Socio-Environmental & Humanitarian',
      items: [
        { name: 'World Bank Open Data', role: 'Socio-Environmental Vulnerability Indicators', icon: Globe2, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
        { name: 'ReliefWeb / OCHA', role: 'UN Humanitarian Situation Reports', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
      <Heading 
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Global Intelligence Network</span>
          </>}
        subtitle="The consortium powering Kashmir EcoWatch"
      />

      <section className="relative z-10 pt-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24 text-center"
          >
            <p className="text-xl sm:text-3xl text-slate-300 leading-relaxed font-light mb-8 max-w-4xl mx-auto">
              Kashmir EcoWatch operates as a massive, federated intelligence platform synthesising data from the world's leading space agencies, scientific consortiums, and institutional field partners.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-500/20 bg-emerald-950/20 shadow-lg shadow-emerald-500/5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-300">100% Attributed Open Science</span>
            </div>
          </motion.div>

          {/* Operational Scope */}
          <div className="mb-32">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <Map className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Operational Scope</h2>
              <p className="text-lg text-slate-400 max-w-2xl">Our global and regional partners provide comprehensive environmental intelligence across four distinct geographical frameworks.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Kashmir Core', desc: 'Central valley ecosystems & immediate foothills', icon: Map },
                { name: 'Trans-Divisional', desc: 'Inter-regional environmental & hazard tracking', icon: Network },
                { name: 'Transboundary', desc: 'Cross-border hydrological & climatic data', icon: Globe2 },
                { name: 'All Districts', desc: 'Granular, local-level reporting & alerts', icon: Activity }
              ].map((scope, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl border border-indigo-500/10 flex flex-col items-center text-center hover:bg-indigo-900/10 transition-colors">
                  <scope.icon className="w-8 h-8 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-2">{scope.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{scope.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Directorate Section */}
          <div className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Users className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-4xl font-black text-white">Platform Directorate</h2>
                </div>
                <p className="text-lg text-slate-400 max-w-2xl">The scientific core responsible for data validation, hydrological modelling, and spatial analysis.</p>
              </div>
              <div className="px-5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest inline-flex w-fit">
                12 Core Members
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {scientificBoard.map((member, idx) => (
                <div key={idx} className="glass-panel p-10 rounded-3xl border border-white/10 bg-slate-900/40 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group">
                  <div className="w-20 h-20 rounded-full bg-slate-900/80 border border-white/5 flex items-center justify-center mb-6 shadow-inner relative group-hover:scale-110 transition-transform">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md" />
                    <member.icon className="w-10 h-10 text-emerald-400 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Science & Modelling Team */}
          <div className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <Workflow className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h2 className="text-4xl font-black text-white">Data Science & Modelling Team</h2>
                </div>
                <p className="text-lg text-slate-400 max-w-2xl">The analytical engine translating raw telemetry and satellite data into localized predictive hazard models.</p>
              </div>
              <div className="px-5 py-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest inline-flex w-fit">
                Algorithm & AI
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modellingTeam.map((modeller, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 bg-slate-900/40 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-center mb-6 shadow-inner relative group-hover:scale-110 transition-transform">
                    <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-md" />
                    <modeller.icon className="w-8 h-8 text-emerald-400 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{modeller.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-6">{modeller.role}</p>
                  
                  <div className="w-full space-y-4 mt-auto border-t border-white/10 pt-6 text-left">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Expertise</p>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">{modeller.expertise}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Primary Model</p>
                      <p className="text-sm text-white font-bold">{modeller.model}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Data APIs */}
          <div className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Globe2 className="w-8 h-8 text-sky-400" />
                  <h2 className="text-4xl font-black text-white">Global Intelligence APIs</h2>
                </div>
                <p className="text-lg text-slate-400 max-w-2xl">The international monitoring networks and space agencies that power our real-time regional risk models.</p>
              </div>
              <div className="px-5 py-2 rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest inline-flex w-fit">
                12+ Live Telemetry Feeds
              </div>
            </div>
            
            <div className="space-y-12">
              {globalProviders.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 pl-2">{section.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items.map((data, i) => (
                      <div key={i} className="glass-panel p-8 rounded-2xl border border-white/10 bg-slate-900/40 flex flex-col h-full hover:bg-slate-800/60 transition-colors group">
                        <data.icon className="w-8 h-8 mb-6 text-emerald-400 group-hover:scale-110 transition-transform origin-left" />
                        <h4 className="text-xl font-bold text-white mb-2">{data.name}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">{data.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Divisions */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Building2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-4xl font-black text-white">Internal Divisions</h2>
                </div>
                <p className="text-lg text-slate-400 max-w-2xl">The specialized operational and analytical branches powering Eco Watch Western Himalaya.</p>
              </div>
              <div className="px-5 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest inline-flex w-fit">
                Western Himalaya Core
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {internalDivisions.map((division, idx) => (
                <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 bg-slate-900/40 flex flex-col h-full hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <division.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-tight">{division.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-emerald-400 mt-auto pt-4 border-t border-white/10">{division.role}</p>
                </div>
              ))}
            </div>
          </div>

          </div>
        </div>
      </section>
    </main>
  );
}
