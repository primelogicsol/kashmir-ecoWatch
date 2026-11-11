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
      footprint: '3.4M Annual Footfall',
      metric: 'High Peak Stress',
      locations: 'Gulmarg, Pahalgam & Sonamarg',
      desc: 'Subalpine meadow soil compaction, unmanaged solid waste accumulation, and high-altitude sewage outfalls exceeding biological assimilate capacity.',
      href: '/sectoral-eia/sectors/tourism'
    },
    {
      id: 'horticulture',
      title: 'Horticulture & Agrochemicals',
      icon: TreePine,
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      footprint: '8,200 MT Fungicide / Yr',
      metric: 'Groundwater Alert',
      locations: 'Sopore, Shopian & Baramulla Orchards',
      desc: 'Mancozeb, copper oxychloride, and synthetic pyrethroid residues leaching into Karewa springshed aquifers and aquatic food webs.',
      href: '/sectoral-eia/sectors/horticulture'
    },
    {
      id: 'handicrafts',
      title: 'Handicrafts & Dye Outfalls',
      icon: Hammer,
      color: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/40',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      footprint: '42 Cluster Outfalls',
      metric: 'Azo-Dye Benchmark',
      locations: 'Downtown Srinagar & Anantnag Clusters',
      desc: 'Toxic synthetic textile wash, chromate mordants, and chemical dye effluents discharging directly into Srinagar wetland corridors and urban canals.',
      href: '/sectoral-eia/sectors/handicrafts'
    },
    {
      id: 'agriculture',
      title: 'Agricultural Land-Filling',
      icon: Wheat,
      color: 'text-lime-400',
      borderColor: 'hover:border-lime-500/40',
      badgeColor: 'text-lime-400 bg-lime-500/10 border-lime-500/20',
      footprint: '14,200 Hectares Altered',
      metric: 'Drainage Disruption',
      locations: 'Pulwama, Kulgam & Budgam Floodplains',
      desc: 'Rapid conversion of low-lying paddy wetlands into commercial strip developments, sealing natural flood basins and altering regional water tables.',
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
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  href={s.href}
                  className={`group p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/95 border border-white/10 ${s.borderColor} transition-all flex flex-col justify-between h-full space-y-4 shadow-sm`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className={`p-2 rounded-xl bg-white/5 ${s.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${s.badgeColor}`}>
                        {s.metric}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {s.title}
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {s.footprint}
                    </div>

                    <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="text-[10px] text-slate-500 font-mono line-clamp-1">
                      Focus: {s.locations}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300 group-hover:text-emerald-300 transition-colors font-medium">
                      <span>View Sector Dossier</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
