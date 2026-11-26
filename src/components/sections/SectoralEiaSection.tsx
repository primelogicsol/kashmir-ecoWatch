'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Compass, 
  TreePine, 
  Hammer, 
  Wheat, 
  ArrowRight, 
  ShieldCheck, 
  FileSpreadsheet, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

export function SectoralEiaSection() {
  const sectors = [
    {
      id: 'tourism',
      title: 'Tourism Carrying Capacity',
      icon: Compass,
      color: 'text-amber-400',
      borderColor: 'hover:border-amber-500/40',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      footprint: '849 Registered Houseboats',
      metric: 'High Peak Stress',
      locations: 'Dal–Nigeen, Gulmarg, Pahalgam & Sonamarg',
      desc: 'Published carrying-capacity assessments covering subalpine meadow compaction, solid waste loads, and seasonal lacustrine nutrient stress.',
      href: '/sectoral-eia/sectors/tourism'
    },
    {
      id: 'horticulture',
      title: 'Horticulture & Agrochemicals',
      icon: TreePine,
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      footprint: '12–16 Spray Rounds / Yr',
      metric: 'Groundwater Alert',
      locations: 'Sopore, Shopian & Kulgam Karewas',
      desc: 'SKUAST-K documented prophylactic fungicide intensification, wild pollinator habitat decline, and Karewa springshed vulnerability.',
      href: '/sectoral-eia/sectors/horticulture'
    },
    {
      id: 'handicrafts',
      title: 'Handicrafts & Lifecycle Ecology',
      icon: Hammer,
      color: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/40',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      footprint: 'GI #46 & ISO 14044 LCA',
      metric: 'Craft Stewardship',
      locations: 'Shehr-e-Khas Srinagar & Changthang',
      desc: 'Lifecycle analysis contrasting low-carbon manual handloom craftsmanship against unsegregated synthetic dye discharges in urban canals.',
      href: '/sectoral-eia/sectors/handicrafts'
    },
    {
      id: 'agriculture',
      title: 'Agricultural Floodplain & Soils',
      icon: Wheat,
      color: 'text-lime-400',
      borderColor: 'hover:border-lime-500/40',
      badgeColor: 'text-lime-400 bg-lime-500/10 border-lime-500/20',
      footprint: '~142 kg/ha NPK (DES J&K)',
      metric: 'Wetland Runoff',
      locations: 'Bandipora, Baramulla, Pulwama & Pampore',
      desc: 'Paddy wetland conversion reducing flood-detention storage alongside seasonal nitrogen surges into the Wular Ramsar sanctuary.',
      href: '/sectoral-eia/sectors/agriculture'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-900/40 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Activity className="w-3 h-3 text-emerald-400" />
                Sectoral EIA Engine (SEIAE)
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono hidden sm:inline">
                • Strategic Environmental Assessment
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Cross-Sector Impact &amp; Carrying Capacity Models
            </h2>
            <p className="text-slate-400 max-w-3xl text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
              Empirical assessment models measuring ecological limits, pollution thresholds, and cumulative degradation drivers across Kashmir&apos;s four core economic sectors.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/sectoral-eia"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/20"
            >
              <span>Explore Sectoral EIA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sectoral-eia/cumulative-impact"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs sm:text-sm transition-all"
            >
              <span>Cumulative Models</span>
            </Link>
          </div>
        </motion.div>

        {/* 4 Sectors Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {sectors.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full min-w-0"
              >
                <Link
                  href={s.href}
                  className={`kew-card-shell kew-card-shell--interactive group h-full no-underline ${s.borderColor}`}
                >
                  {/* 1. ICON (top-left) + Metric badge (top-right) */}
                  <div className="kew-card-top-row">
                    <div className={`kew-card-icon-box bg-slate-800/90 border-white/10 ${s.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${s.badgeColor}`}>
                      {s.metric}
                    </span>
                  </div>

                  {/* 2. TITLE — full horizontal width */}
                  <h3 className="kew-card-title">{s.title}</h3>

                  {/* 3. KPI */}
                  <div className="text-sm font-bold font-mono text-white tabular-nums">
                    {s.footprint}
                  </div>

                  {/* 4. DESCRIPTION — naturally wrapping */}
                  <p className="kew-card-desc">{s.desc}</p>

                  {/* 5. Locations + Bottom CTA */}
                  <div className="mt-auto pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[11px] text-slate-400 font-mono break-words">
                      Focus: {s.locations}
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      <span>View Sector Dossier</span>
                      <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </div>
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
