'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Database,
  FileSearch,
  Mountain,
  Pickaxe,
  Scale,
  Waves,
} from 'lucide-react';
import { motion } from 'framer-motion';

export function EnvironmentalInvestigationsSection() {
  const highlights = [
    {
      code: 'KEW-INV-0001',
      title: 'Dal Lake: Mechanical Dredging & Defences',
      icon: Waves,
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
      badgeColor: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
      status: 'Published · 1990–2026',
      metric: '7 Claims Graded (24 Sec)',
      locations: 'Hazratbal, Bod Dal, Telbal & Foreshore',
      desc: 'Synthesises CAG performance audits, limnological nutrient budgets, and satellite series evaluating three decades of mechanical dredging.',
      href: '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences',
    },
    {
      code: 'KEW-INV-0002',
      title: 'Sheshnag: Alpine Infrastructure & Ecology',
      icon: Mountain,
      color: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/40',
      badgeColor: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30',
      status: 'Published · 2012–2026',
      metric: '~3,590 m ASL Tarn',
      locations: 'East Lidder Glacial Trough, Anantnag',
      desc: 'Evaluates cold-climate sanitation kinetics, moraine cut-slope mechanics, and cloudburst setback zoning along high-altitude pilgrimage corridors.',
      href: '/environmental-investigations/reports/sheshnag-pilgrimage-infrastructure-alpine-ecology',
    },
    {
      code: 'KEW-INV-0003',
      title: 'Telbal Settling Basin Performance',
      icon: Database,
      color: 'text-amber-400',
      borderColor: 'hover:border-amber-500/40',
      badgeColor: 'text-amber-300 bg-amber-500/15 border-amber-500/30',
      status: 'Active Investigation',
      metric: '70–80% Inflow Silt',
      locations: 'Dachigam–Telbal Sub-Watershed',
      desc: 'Examines hydraulic residence time, Stokes settling thresholds, and multi-year desilting maintenance intervals upstream of Dal Lake.',
      href: '/environmental-investigations/reports/telbal-settling-basin-sediment-management',
    },
    {
      code: 'KEW-INV-0004',
      title: "Disappearance of Kashmir's Karewas",
      icon: Pickaxe,
      color: 'text-rose-400',
      borderColor: 'hover:border-rose-500/40',
      badgeColor: 'text-rose-300 bg-rose-500/15 border-rose-500/30',
      status: 'Active Investigation',
      metric: '4-Myr Archive At Risk',
      locations: 'Pampore, Budgam, Pulwama & Baramulla',
      desc: 'Maps vertical scarp excavation across Plio-Pleistocene tablelands, paleoclimatic fossil horizons, and GI saffron substrates.',
      href: '/environmental-investigations/reports/disappearance-of-kashmirs-karewas',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Scale className="w-3 h-3 text-emerald-400" />
                KEW-EIAI · Scientific Accountability
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono hidden sm:inline">
                • Investigate · Verify · Analyse · Document · Monitor
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Environmental Investigations &amp; Accountability
            </h2>
            <p className="text-slate-400 max-w-3xl text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
              Multidisciplinary 24-section scientific investigations uniting hydrology, geology, satellite GIS, statutory CAG audits, and institutional accountability across the Western Himalayas.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/environmental-investigations"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg"
            >
              <span>Explore Investigations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/environmental-investigations/evidence"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs sm:text-sm transition-all"
            >
              <span>Evidence Matrix</span>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="h-full min-w-0"
              >
                <Link
                  href={item.href}
                  className={`kew-card-shell kew-card-shell--interactive group h-full no-underline ${item.borderColor}`}
                >
                  <div className="kew-card-top-row">
                    <div className={`kew-card-icon-box bg-slate-800/90 border-white/10 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${item.badgeColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400">{item.code}</div>
                  <h3 className="kew-card-title">{item.title}</h3>

                  <div className="text-sm font-bold font-mono text-white tabular-nums">
                    {item.metric}
                  </div>

                  <p className="kew-card-desc">{item.desc}</p>

                  <div className="mt-auto pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[11px] text-slate-400 font-mono break-words">
                      Scope: {item.locations}
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      <span>Open Canonical Dossier</span>
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
