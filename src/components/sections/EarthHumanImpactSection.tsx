'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Satellite, 
  Layers, 
  Mountain, 
  Droplets, 
  ArrowRight, 
  Activity, 
  TrendingDown, 
  ShieldAlert,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export function EarthHumanImpactSection() {
  const telemetryMetrics = [
    {
      label: 'Karewa Excavation Area',
      value: '42.6 km²',
      trend: '-34.8 ha/yr conversion',
      status: 'High Disturbance',
      statusColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    },
    {
      label: 'Kolahoi Snout Recession',
      value: '-16.2 m/yr',
      trend: 'Terminal retreat 1985–2026',
      status: 'Cryosphere Loss',
      statusColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    },
    {
      label: 'Ramsar Wetland Encroachment',
      value: '-18.4 ha/yr',
      trend: 'Hokersar & Wular margins',
      status: 'Critical Alert',
      statusColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10'
    },
    {
      label: 'Riverbed Incision Depths',
      value: '> 1.0 m',
      trend: 'NGT benchmark exceedance',
      status: 'Active Audit',
      statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    }
  ];

  const changeSystems = [
    {
      id: 'karewa',
      title: 'Karewa Terraces & Strip-Mining',
      category: 'Geomorphic Systems',
      desc: 'Remote sensing and satellite change detection tracking Pleistocene plateau leveling for infrastructure embankment fill.',
      href: '/earth-human-impact/land-earth-systems',
      stat: '42.6 km² tracked',
      badge: 'System 06'
    },
    {
      id: 'cryosphere',
      title: 'Glacier Recession & Snout Dynamics',
      category: 'Alpine Cryosphere',
      desc: 'Multi-decadal retreat rates, supraglacial debris cover, and equilibrium line altitudes across Kolahoi, Thajiwas, and Harmukh.',
      href: '/earth-human-impact/aquatic-cryosphere/glacier-recession',
      stat: '-16.2 m/yr retreat',
      badge: 'System 07'
    },
    {
      id: 'wetlands',
      title: 'Ramsar Wetland Conversion',
      category: 'Aquatic Ecosystems',
      desc: 'Satellite MNDWI water-spread analysis measuring seasonal inundation contraction in Hokersar, Shallabugh, Haigam, and Wular.',
      href: '/earth-human-impact/aquatic-cryosphere',
      stat: '4 Ramsar sites',
      badge: 'System 07'
    },
    {
      id: 'mining',
      title: 'Riverbed Sand & Boulder Extraction',
      category: 'Hydraulic Corridors',
      desc: 'Bathymetric audits monitoring unpermitted mechanized excavation across Doodhganga, Rambiara, Vaishaw, and Jhelum basins.',
      href: '/earth-human-impact/mining-extraction',
      stat: '118 km surveyed',
      badge: 'System 09'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-teal-500/10 border border-teal-500/30 text-teal-300">
                <Satellite className="w-3 h-3 text-teal-400" />
                Earth & Human Impact (EHI)
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono hidden sm:inline">
                • 13 Change-Detection Submodules
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Satellite Change Detection &amp; Himalayan Transformation
            </h2>
            <p className="text-slate-400 max-w-3xl text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
              Spaceborne multi-spectral telemetry quantifying multi-decadal landscape shifts across Karewa plateaus, Ramsar wetlands, high-altitude glaciers, and riverbed mineral concessions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/earth-human-impact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-teal-600/20"
            >
              <span>Explore EHII Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/earth-human-impact/aquatic-cryosphere/loss-recovery-ledger"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-teal-500/40 text-slate-300 hover:text-white text-xs sm:text-sm transition-all"
            >
              <span>Loss &amp; Recovery Ledger</span>
            </Link>
          </div>
        </motion.div>

        {/* Live Change Telemetry Metrics Bar */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 items-stretch">
          {telemetryMetrics.map((m, idx) => {
            const StatIcons = [Layers, Mountain, Droplets, Activity];
            const StatIcon = StatIcons[idx % StatIcons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="kew-card-shell p-4 gap-2 h-full"
              >
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-teal-500/15 border-teal-500/30 text-teal-400">
                    <StatIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${m.statusColor}`}>
                    {m.status}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm text-slate-300 font-bold break-words">
                  {m.label}
                </h3>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white tabular-nums">
                  {m.value}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-auto break-words">
                  {m.trend}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Change-Detection Subsystems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {changeSystems.map((item, idx) => {
            const SysIcons = [Layers, Mountain, Droplets, ShieldAlert];
            const SysIcon = SysIcons[idx % SysIcons.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full min-w-0"
              >
                <Link
                  href={item.href}
                  className="kew-card-shell kew-card-shell--interactive group h-full no-underline"
                >
                  {/* 1. ICON (top-left) + System badge (top-right) */}
                  <div className="kew-card-top-row">
                    <div className="kew-card-icon-box bg-teal-500/15 border-teal-500/30 text-teal-400">
                      <SysIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      {item.badge}
                    </span>
                  </div>

                  {/* 2. TITLE — full horizontal width */}
                  <div>
                    <h3 className="kew-card-title">{item.title}</h3>
                    <div className="text-xs text-teal-400/90 font-medium mt-0.5 break-words">
                      {item.category}
                    </div>
                  </div>

                  {/* 3. KPI */}
                  <div className="text-sm font-bold font-mono text-white tabular-nums">
                    {item.stat}
                  </div>

                  {/* 4. DESCRIPTION — naturally wrapping */}
                  <p className="kew-card-desc">{item.desc}</p>

                  {/* 5. CTA — anchored near bottom */}
                  <div className="kew-card-cta">
                    <span>View Satellite Analysis</span>
                    <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
