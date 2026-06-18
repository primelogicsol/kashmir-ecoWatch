'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  BarChart3, Map, TrendingUp, AlertTriangle,
  Activity, Droplets, Flame, Waves, Zap,
  Eye, Mountain, ExternalLink, ChevronRight
} from 'lucide-react';

const dashboardCards = [
  {
    title: 'Multi-Hazard Risk Map',
    description: 'Comprehensive geospatial overlay of all hazard types — seismic, flood, landslide, GLOF, and fire risk layers across Western Himalayan with severity gradients.',
    icon: Map,
    gradient: 'from-emerald-500 to-teal-600',
    metrics: ['Risk Overlay', 'Severity Zones', 'Population Exposure', 'Temporal Analysis'],
  },
  {
    title: 'Flood Risk Heatmap',
    description: 'Real-time and historical flood risk visualization across river basins, showing inundation probability, embankment stress, and discharge anomalies.',
    icon: Waves,
    gradient: 'from-blue-500 to-cyan-600',
    metrics: ['Discharge Levels', 'Inundation Zones', 'Basin Analysis', 'Early Warning'],
  },
  {
    title: 'Seismic Activity Timeline',
    description: 'Interactive timeline of seismic events across the Kashmir-Himalayan seismic belt with fault-line mapping and intensity distribution analytics.',
    icon: Activity,
    gradient: 'from-amber-500 to-orange-600',
    metrics: ['Event Timeline', 'Magnitude Distribution', 'Fault Proximity', 'Aftershock Patterns'],
  },
  {
    title: 'Landslide Susceptibility',
    description: 'Slope stability analysis and mass movement susceptibility mapping using terrain, geology, rainfall, and land-use change parameters.',
    icon: Mountain,
    gradient: 'from-red-500 to-rose-600',
    metrics: ['Susceptibility Index', 'Trigger Analysis', 'Slope Stability', 'Road Infrastructure'],
  },
  {
    title: 'GLOF Monitoring Dashboard',
    description: 'Glacial lake dynamics monitoring with dam stability assessment, lake area change tracking, and downstream flood wave modelling.',
    icon: Droplets,
    gradient: 'from-teal-500 to-emerald-600',
    metrics: ['Lake Area Change', 'Dam Stability', 'Volume Trends', 'Flood Routing'],
  },
  {
    title: 'Fire Detection Satellite View',
    description: 'Near real-time fire detection from MODIS/VIIRS satellite feeds with hotspot mapping, burned area estimation, and fire progression tracking.',
    icon: Flame,
    gradient: 'from-orange-500 to-red-600',
    metrics: ['Active Hotspots', 'Burned Area', 'Fire Spread', 'Smoke Plume Analysis'],
  },
];

export default function HazardDashboardsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Dashboards' }
        ]}
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">Hazard Intelligence Dashboards</span>
          </>}
        subtitle="Integrated hazard analytics dashboards spanning multi-hazard risk mapping, seismic timelines, GLOF monitoring, fire detection, flood heatmaps, and landslide susceptibility across Western Himalayan ecology."
        icon={<BarChart3 className="w-6 h-6 text-violet-400" />}
      />

      {/* ── Dashboard Cards Grid ────────────────────────────────────────────── */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-violet-400" />
              Analytics Dashboards
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Explore multi-hazard risk analytics and monitoring dashboards for Western Himalayan ecology
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
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 flex flex-col h-full group cursor-pointer w-full">
                  {/* Icon + Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                      <card.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge variant="warning" className="text-[10px] px-2 py-1 bg-amber-500/10 text-amber-400 border-amber-500/30">
                      Coming Soon
                    </Badge>
                  </div>

                  {/* Title + Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1 line-clamp-3">{card.description}</p>

                  {/* Metric Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {card.metrics.map(metric => (
                      <span key={metric} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Dashboard</span>
                    <div className="flex items-center gap-1 text-xs text-violet-400 group-hover:text-violet-300 transition-colors">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Hazard Intelligence Modules</h2>
            <p className="text-slate-400">Explore the data registries powering these dashboards</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'GLOFs',        href: '/hazard-intelligence/glofs',         desc: 'Glacial lake outburst flood risk', icon: ExternalLink, color: 'from-teal-500 to-emerald-600' },
              { label: 'Forest Fires',  href: '/hazard-intelligence/forest-fires',  desc: 'Wildfire risk zones & detection', icon: ExternalLink, color: 'from-orange-500 to-red-600' },
              { label: 'Floods',        href: '/hazard-intelligence/floods',        desc: 'Riverine & flash flood monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Landslides',    href: '/hazard-intelligence/landslides',    desc: 'Slope stability & mass movement', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-slate-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
