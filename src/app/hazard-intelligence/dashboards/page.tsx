'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import {
  BarChart3, Map, TrendingUp, AlertTriangle,
  Activity, Droplets, Flame, Waves, Zap,
  Eye, Mountain, ExternalLink, ChevronRight, CheckCircle2,
  Clock, Satellite, Radio, ShieldCheck, Wind
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export interface HazardDashboardMeta {
  title: string;
  route: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  status: 'Operational' | 'Active Telemetry' | 'Live Monitoring';
  statusType: 'success' | 'warning' | 'info';
  sourceAttribution: string;
  updateFrequency: string;
  coverage: string;
  metrics: string[];
}

const dashboardCards: HazardDashboardMeta[] = [
  {
    title: 'Western Disturbances Synoptic & Impact Dashboard',
    route: '/hazard-intelligence/atmospheric-systems/western-disturbances/dashboard',
    description: '8-tab atmospheric monitoring suite tracking 500/300 hPa westerly troughs, 7-day rain/snowline forecasts, RainViewer radar, and compound flood, landslide, and avalanche triggers.',
    icon: Wind,
    gradient: 'from-sky-500 to-indigo-600',
    status: 'Active Telemetry',
    statusType: 'success',
    sourceAttribution: 'Open-Meteo Upper-Air (ECMWF/GFS) + RainViewer Radar + IMD/PMD',
    updateFrequency: 'Hourly synoptic & 10-min radar',
    coverage: 'Jammu, Kashmir, Ladakh, AJK, Gilgit & Baltistan',
    metrics: ['500 hPa Trough (gpm)', '300 hPa Jet (km/h)', '0°C Snowline (m)', 'Multi-Hazard Coupling'],
  },
  {
    title: 'Monsoon Dynamics & Moisture Anomaly Observatory',
    route: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics/dashboard',
    description: '8-tab terrain-masked 850/700/500 hPa moisture diagnostics, Total-Column Water Vapour (TCWV), ERA5-Land historical 7-day precipitation anomalies, and CAPE instability.',
    icon: Waves,
    gradient: 'from-teal-500 to-emerald-600',
    status: 'Active Telemetry',
    statusType: 'success',
    sourceAttribution: 'Open-Meteo Multi-Level Moisture + ERA5-Land Historical Reanalysis',
    updateFrequency: 'Hourly UTC moisture assimilation',
    coverage: '24 Corridors across 6 Sub-Regions',
    metrics: ['Terrain-Masked RH (%)', 'TCWV (kg/m²)', 'ERA5 7d Anomaly', 'CAPE (J/kg)'],
  },
  {
    title: 'Jet Stream & 500 hPa Circulation Monitor',
    route: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation/dashboard',
    description: '8-tab 45-node 2D SWJ axis detector (24°N–40°N × 70°E–80°E), 250/300 hPa wind-core extrema, ERA5-calibrated 500 hPa cyclonic troughs vs. blocking ridges, and shear.',
    icon: Satellite,
    gradient: 'from-indigo-500 to-violet-600',
    status: 'Live Monitoring',
    statusType: 'success',
    sourceAttribution: 'Open-Meteo 45-Node 250 / 300 / 500 hPa Pressure-Level Grid',
    updateFrequency: 'Hourly upper-air cycle',
    coverage: '24 Upper-Air Sectors + 45-Node SWJ Grid',
    metrics: ['2D SWJ Axis (°N)', '250 hPa Jet (km/h)', 'Z500 Departure (gpm)', 'Vertical Shear'],
  },
  {
    title: 'Extreme Rainfall & Cloudbursts Ensemble Dashboard',
    route: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard',
    description: '8-tab extreme rainfall command fusing 1h/3h/24h deterministic NWP, 31-member NOAA GFS ensemble exceedance probabilities, ERA5-Land baselines, and RainViewer radar.',
    icon: Zap,
    gradient: 'from-cyan-500 to-blue-600',
    status: 'Active Telemetry',
    statusType: 'success',
    sourceAttribution: 'Open-Meteo NWP + 31-Member GFS Ensemble + ERA5 + RainViewer',
    updateFrequency: 'Hourly NWP & 10-min Radar',
    coverage: '24 Steep Himalayan Watersheds (6 Regions)',
    metrics: ['1h / 3h / 24h Peak (mm)', '31-Member P(≥50mm)', 'ERA5 7d (mm)', 'TCWV & CAPE'],
  },
  {
    title: 'Multi-Hazard Risk Map',
    route: '/live-incident-map',
    description: 'Comprehensive geospatial overlay of all hazard types — active environmental incidents, flood zones, landslides, avalanche corridors, and emergency alerts across Kashmir.',
    icon: Map,
    gradient: 'from-emerald-500 to-teal-600',
    status: 'Operational',
    statusType: 'success',
    sourceAttribution: 'Unified Multi-Agency Hazard Gateway',
    updateFrequency: 'Continuous (Real-time events)',
    coverage: 'All 20 Districts (Western Himalaya)',
    metrics: ['Live Incident Pins', 'Severity Gradients', 'Emergency Response', 'Spatial Bounding'],
  },
  {
    title: 'Flood Risk Heatmap & Gauges',
    route: '/hazard-intelligence/floods',
    description: 'Real-time river discharge and historical flood risk visualization across Jhelum, Chenab, and Sindh basins, with alert stages, embankment stress, and gauge telemetry.',
    icon: Waves,
    gradient: 'from-blue-500 to-cyan-600',
    status: 'Active Telemetry',
    statusType: 'success',
    sourceAttribution: 'CWC + JKSDMA Hydrological Gauges + Open-Meteo API',
    updateFrequency: 'Hourly telemetry refresh',
    coverage: 'Ram Munshi Bagh, Sangam, Asham, Baramulla',
    metrics: ['River Discharge (m³/s)', 'Gauge Alert Stages', 'Inundation Probability', 'Rainfall Correlation'],
  },
  {
    title: 'Seismic Activity & Fault Timeline',
    route: '/hazard-intelligence/earthquakes',
    description: 'Interactive timeline and spatial clustering of seismic events across the Main Boundary Thrust (MBT), Kashmir Basin faults, and depth/magnitude distributions.',
    icon: Activity,
    gradient: 'from-amber-500 to-orange-600',
    status: 'Operational',
    statusType: 'success',
    sourceAttribution: 'USGS Global Seismic Network + IMD Microseismic Array',
    updateFrequency: '15-minute polling',
    coverage: 'Zone V & Zone IV Seismic Belts',
    metrics: ['Magnitude (M3.0+)', 'Depth Profiling', 'Fault Proximity', 'Seismic Gap Watch'],
  },
  {
    title: 'Landslide Susceptibility & NH-44 Creep',
    route: '/hazard-intelligence/landslides',
    description: 'Slope stability analysis, debris flow tracking, and mass movement susceptibility using Copernicus DInSAR ground displacement and precipitation triggers.',
    icon: Mountain,
    gradient: 'from-red-500 to-rose-600',
    status: 'Operational',
    statusType: 'success',
    sourceAttribution: 'Geological Survey of India + Copernicus Sentinel-1 DInSAR',
    updateFrequency: 'Daily satellite pass & field logs',
    coverage: 'NH-44 Ramban, Mughal Road, Ganderbal',
    metrics: ['Susceptibility Index', 'Slope Angle (>35°)', 'Soil Moisture Anomaly', 'Highway Corridor Watch'],
  },
  {
    title: 'GLOF Glacial Lake Observatory',
    route: '/hazard-intelligence/glofs',
    description: 'Glacial lake expansion dynamics, moraine dam structural stability assessments, lake surface area change, and downstream flood routing simulations.',
    icon: Droplets,
    gradient: 'from-teal-500 to-emerald-600',
    status: 'Live Monitoring',
    statusType: 'success',
    sourceAttribution: 'Sentinel-2 Multispectral + Landsat-8/9 Cryosphere Arrays',
    updateFrequency: '5-day satellite revisit cycle',
    coverage: 'Kolahoi, Nun-Kun, Zanskar Glacial Basins',
    metrics: ['Lake Area Expansion (ha)', 'Moraine Freeboard', 'Volume Estimates', 'Peak Discharge Models'],
  },
  {
    title: 'Fire Detection & Thermal Satellite View',
    route: '/hazard-intelligence/forest-fires',
    description: 'Active thermal anomalies, wildfire detection, fire progression vectors, and burn severity assessments across Western Himalayan coniferous and scrub forests.',
    icon: Flame,
    gradient: 'from-orange-500 to-red-600',
    status: 'Active Telemetry',
    statusType: 'success',
    sourceAttribution: 'NASA FIRMS (MODIS / VIIRS 375m) + Forest Dept Ground Grounding',
    updateFrequency: 'Near real-time (3-hour satellite orbits)',
    coverage: 'Pir Panjal, Shamshabari, Dachigam Ranges',
    metrics: ['Thermal Hotspots', 'FRP (Fire Radiative Power)', 'Confidence Score (%)', 'Burn Scar Area'],
  },
];

export default function HazardDashboardsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence · Multi-Hazard Analytics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Dashboards' }
        ]}
        title={<>
            <KewBrandIdentity />
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">Hazard Intelligence Dashboards</span>
          </>}
        subtitle="Operational hazard analytics dashboards spanning multi-hazard incident mapping, seismic timelines, GLOF monitoring, satellite fire detection, flood heatmaps, and landslide susceptibility across Western Himalayan ecology."
        icon={<BarChart3 className="w-6 h-6 text-violet-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-violet-600 to-purple-600 font-bold text-white shadow-lg shadow-purple-600/20"
              icon={<Map className="w-5 h-5" />}
              onClick={() => router.push('/live-incident-map')}
            >
              Live Multi-Hazard Map
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold hover:bg-white/10"
              icon={<AlertTriangle className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/floods')}
            >
              River Gauge Registry
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
          '/images/hazard-intelligence/hazard-earthquakes-seismic.jpg',
          '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg',
          '/images/hazard-intelligence/hazard-forest-fires-wildfire.jpg',
          '/images/hazard-intelligence/hazard-algal-bloom-lake.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      {/* ── Operational Health Banner ────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-slate-900/40 py-3">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">All 10 Analytical Dashboards Fully Operational</span>
              <span className="text-slate-400">&bull; Live API feeds and spatial GIS layers connected</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
              <span>Coverage: Jammu, Kashmir, Ladakh, AJK, Gilgit &amp; Baltistan</span>
              <span>&bull;</span>
              <span>Updated: Nov 2026 Telemetry Cycle</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dashboard Cards Grid ────────────────────────────────────────────── */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-violet-400" />
              <span>Active Analytics Dashboards</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select any specialized dashboard below to access real-time telemetry, spatial models, and risk timelines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="flex"
              >
                <Link href={card.route} className="flex w-full group">
                  <Card className="glass-intense border-white/10 hover:border-violet-500/40 hover:bg-slate-900/90 transition-all p-6 flex flex-col h-full cursor-pointer w-full group-hover:shadow-2xl group-hover:shadow-violet-950/30">
                    {/* Icon + Operational Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-slate-900 ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                        <card.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="success" className="text-[10px] font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{card.status}</span>
                      </Badge>
                    </div>

                    {/* Title + Description */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors flex items-center justify-between">
                      <span>{card.title}</span>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 flex-1 line-clamp-3">{card.description}</p>

                    {/* Metric Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {card.metrics.map(metric => (
                        <span key={metric} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono">
                          {metric}
                        </span>
                      ))}
                    </div>

                    {/* Scientific Provenance Strip */}
                    <div className="space-y-1.5 pt-3 border-t border-white/5 text-[10px] text-slate-400 font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Source:</span>
                        <span className="text-slate-300 truncate max-w-[200px] text-right">{card.sourceAttribution}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Cadence:</span>
                        <span className="text-teal-400">{card.updateFrequency}</span>
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Launch Dashboard</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-violet-400 group-hover:text-violet-300 group-hover:translate-x-1 transition-all">
                        <span>Open Dashboard</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED HAZARD INTELLIGENCE (6 CONTEXTUAL MODULES) ─────────── */}
      <section className="py-12 bg-slate-900 border-t border-white/5">
        <div className="container mx-auto px-6">
          <RelatedHazardIntelligence currentModule="dashboards" />
        </div>
      </section>
    </main>
  );
}
