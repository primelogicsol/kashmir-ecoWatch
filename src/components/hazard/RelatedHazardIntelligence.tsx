'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import {
  ShieldAlert,
  Mountain,
  Snowflake,
  CloudRain,
  Waves,
  Activity,
  Flame,
  Droplets,
  Wind,
  Layers,
  ChevronRight,
  ArrowRight,
  Compass,
  AlertTriangle,
  Eye,
  Globe2
} from 'lucide-react';

export interface HazardDestination {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
}

export const ALL_HAZARD_DESTINATIONS: Record<string, HazardDestination> = {
  'western-disturbances': {
    id: 'western-disturbances',
    title: 'Western Disturbances',
    description: 'Synoptic westerly wave tracking, 0°C snowline forecasts, and compound multi-hazard triggers across 6 regions.',
    href: '/hazard-intelligence/western-disturbances',
    icon: Wind,
    color: 'text-sky-400',
    badge: 'Atmospheric System'
  },
  'floods': {
    id: 'floods',
    title: 'River Flood Intelligence',
    description: 'Jhelum basin river gauges, hydrographs, discharge rates, and multi-district flood stage tracking.',
    href: '/hazard-intelligence/floods',
    icon: Waves,
    color: 'text-cyan-400',
    badge: 'Hydrological'
  },
  'flash-floods': {
    id: 'flash-floods',
    title: 'Flash Flood Intelligence',
    description: 'Catchment runoff models, cloudburst vulnerability, and early warning for steep mountain streams.',
    href: '/hazard-intelligence/flash-floods',
    icon: CloudRain,
    color: 'text-blue-400',
    badge: 'Hydro-Meteorological'
  },
  'landslides': {
    id: 'landslides',
    title: 'Landslide Risk Intelligence',
    description: 'Geological slope susceptibility, active highway corridors (NH-44), and rainfall threshold triggers.',
    href: '/hazard-intelligence/landslides',
    icon: Mountain,
    color: 'text-amber-400',
    badge: 'Geological'
  },
  'avalanches': {
    id: 'avalanches',
    title: 'Avalanche Risk Intelligence',
    description: 'Mountain pass monitoring, high-altitude snowpack stability, and corridor bulletins across passes.',
    href: '/hazard-intelligence/avalanches',
    icon: Snowflake,
    color: 'text-sky-300',
    badge: 'Cryospheric'
  },
  'earthquakes': {
    id: 'earthquakes',
    title: 'Seismic & Fault Intelligence',
    description: 'Real-time EMSC/USGS feeds, Main Boundary Thrust fault tracking, and regional seismotectonic mapping.',
    href: '/hazard-intelligence/earthquakes',
    icon: Activity,
    color: 'text-rose-400',
    badge: 'Tectonic'
  },
  'glofs': {
    id: 'glofs',
    title: 'GLOF Sentinel & Glacial Lakes',
    description: 'Satellite monitoring of proglacial lakes, moraine dam stability, and sudden outburst flood risks.',
    href: '/hazard-intelligence/glofs',
    icon: Droplets,
    color: 'text-teal-400',
    badge: 'Cryospheric'
  },
  'forest-fires': {
    id: 'forest-fires',
    title: 'Wildfire & Forest Fire Watch',
    description: 'ECMWF Fire Weather Index (FWI), coniferous biome dryness, and active thermal hotspot telemetry.',
    href: '/hazard-intelligence/forest-fires',
    icon: Flame,
    color: 'text-orange-400',
    badge: 'Thermal'
  },
  'algal-bloom': {
    id: 'algal-bloom',
    title: 'Algal Bloom Intelligence',
    description: 'Sentinel-2 chlorophyll-a NDCI biomass proxies, cyanobacteria detection, and lake trophic indexing.',
    href: '/hazard-intelligence/algal-bloom-intelligence',
    icon: Eye,
    color: 'text-emerald-400',
    badge: 'Biochemical'
  },
  'air-pollution': {
    id: 'air-pollution',
    title: 'Air Quality Intelligence',
    description: 'Ground-truth CAAQMS telemetry paired with 0.1° satellite-modelled particulate matter (PM2.5/PM10).',
    href: '/environmental-monitoring/air-pollution',
    icon: Wind,
    color: 'text-indigo-400',
    badge: 'Atmospheric'
  },
  'water-systems': {
    id: 'water-systems',
    title: 'Water Systems & Cryosphere',
    description: 'Comprehensive basin observation, spring-shed depletion, glacial retreat, and wetland health.',
    href: '/water-systems',
    icon: Droplets,
    color: 'text-cyan-300',
    badge: 'Basin Intelligence'
  },
  'earth-human-impact': {
    id: 'earth-human-impact',
    title: 'Earth & Human Impact (EHII)',
    description: 'Anthropogenic pressure analysis, land-use land-cover change, and industrial corridor stressors.',
    href: '/earth-human-impact',
    icon: Layers,
    color: 'text-purple-400',
    badge: 'Environmental Stress'
  },
  'hazard-overview': {
    id: 'hazard-overview',
    title: 'Multi-Hazard Overview Hub',
    description: 'Consolidated Western Himalayan disaster resilience surface with real-time escalation bulletins.',
    href: '/hazard-intelligence',
    icon: ShieldAlert,
    color: 'text-emerald-400',
    badge: 'Multi-Hazard'
  },
  'hazard-dashboards': {
    id: 'hazard-dashboards',
    title: 'Hazard Intelligence Dashboards',
    description: 'Multi-parameter risk matrices, district stress rankings, and interactive GIS crisis telemetry.',
    href: '/hazard-intelligence/dashboards',
    icon: Compass,
    color: 'text-sky-400',
    badge: 'Telemetry Grid'
  }
};

// Contextual prioritization matrix: maps current page key to 6 most relevant destinations
const CONTEXTUAL_PRIORITY: Record<string, string[]> = {
  'western-disturbances': [
    'floods',
    'flash-floods',
    'landslides',
    'avalanches',
    'glofs',
    'hazard-dashboards'
  ],
  'flash-floods': [
    'western-disturbances',
    'floods',
    'landslides',
    'glofs',
    'water-systems',
    'avalanches'
  ],
  'avalanches': [
    'western-disturbances',
    'glofs',
    'landslides',
    'flash-floods',
    'earthquakes',
    'hazard-overview'
  ],
  'landslides': [
    'western-disturbances',
    'earthquakes',
    'flash-floods',
    'avalanches',
    'floods',
    'earth-human-impact'
  ],
  'earthquakes': [
    'landslides',
    'avalanches',
    'flash-floods',
    'glofs',
    'earth-human-impact',
    'hazard-overview'
  ],
  'floods': [
    'western-disturbances',
    'flash-floods',
    'water-systems',
    'landslides',
    'glofs',
    'algal-bloom'
  ],
  'algal-bloom': [
    'water-systems',
    'floods',
    'air-pollution',
    'flash-floods',
    'earth-human-impact',
    'hazard-overview'
  ],
  'glofs': [
    'avalanches',
    'flash-floods',
    'floods',
    'water-systems',
    'landslides',
    'hazard-overview'
  ],
  'forest-fires': [
    'air-pollution',
    'landslides',
    'avalanches',
    'earth-human-impact',
    'water-systems',
    'hazard-overview'
  ],
  'air-pollution': [
    'forest-fires',
    'algal-bloom',
    'water-systems',
    'earth-human-impact',
    'flash-floods',
    'hazard-overview'
  ],
  'hazard-overview': [
    'western-disturbances',
    'floods',
    'flash-floods',
    'landslides',
    'avalanches',
    'earthquakes'
  ],
  'dashboards': [
    'western-disturbances',
    'flash-floods',
    'landslides',
    'avalanches',
    'earthquakes',
    'glofs'
  ]
};

interface RelatedHazardIntelligenceProps {
  currentModule: string; // e.g. 'flash-floods', 'avalanches', 'landslides', etc.
  className?: string;
  title?: string;
  description?: string;
}

export function RelatedHazardIntelligence({
  currentModule,
  className = '',
  title = 'Related Hazard Intelligence',
  description = 'Interconnected Western Himalayan environmental risk regimes, geological dynamics, and real-time monitoring systems.'
}: RelatedHazardIntelligenceProps) {
  // Determine relevant destination IDs
  const priorityList = CONTEXTUAL_PRIORITY[currentModule] || [
    'flash-floods',
    'landslides',
    'avalanches',
    'earthquakes',
    'glofs',
    'hazard-overview'
  ];

  // Filter out current page and limit to 6 items
  const resolvedDestinations: HazardDestination[] = [];
  const addedIds = new Set<string>();

  for (const id of priorityList) {
    if (id !== currentModule && ALL_HAZARD_DESTINATIONS[id] && !addedIds.has(id)) {
      resolvedDestinations.push(ALL_HAZARD_DESTINATIONS[id]);
      addedIds.add(id);
    }
    if (resolvedDestinations.length === 6) break;
  }

  // If still fewer than 6, fill from other destinations
  if (resolvedDestinations.length < 6) {
    for (const [id, dest] of Object.entries(ALL_HAZARD_DESTINATIONS)) {
      if (id !== currentModule && !addedIds.has(id)) {
        resolvedDestinations.push(dest);
        addedIds.add(id);
      }
      if (resolvedDestinations.length === 6) break;
    }
  }

  return (
    <section className={`mt-12 pt-8 border-t border-white/10 ${className}`}>
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-mono">
                CONNECTED RISK SYSTEMS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1 leading-relaxed">
              {description}
            </p>
          </div>

          <Link
            href="/hazard-intelligence"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-end"
          >
            <span>Overview Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resolvedDestinations.map((dest) => {
            const Icon = dest.icon;
            return (
              <Link
                key={dest.id}
                href={dest.href}
                className="group flex flex-col h-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
              >
                <Card
                  className="glass-intense border-white/10 p-4 sm:p-5 flex flex-col justify-between h-full hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all rounded-lg shadow-sm"
                  padding="none"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-emerald-500/30 group-hover:bg-emerald-950/20 transition-colors">
                        <Icon className={`w-4 h-4 ${dest.color} transition-transform group-hover:scale-110`} />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-[4px] bg-white/5 border border-white/5">
                        {dest.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {dest.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                        {dest.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-emerald-400 transition-colors">
                    <span>Explore Intelligence</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Compact Bottom Action Bar: View All Hazard Systems */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/5">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Globe2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Kashmir EcoWatch Multi-Hazard Telemetry Network · 10 Active Modules Monitored</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hazard-intelligence"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition-colors"
            >
              <span>View All Hazard Systems</span>
              <ArrowRight className="w-3 h-3 text-emerald-400" />
            </Link>
            <Link
              href="/open-data"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-slate-400 hover:text-emerald-300 transition-colors text-xs"
            >
              <span>Provenance Hub</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
