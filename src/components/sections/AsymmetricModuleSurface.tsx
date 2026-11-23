'use client';

import React, { useState } from 'react';
import { intelligenceCards } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  Map, Leaf, Shield, Droplet, Cloud, Sun, Footprints, Book,
  ArrowRight, Layers, Activity, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  map: <Map className="w-5 h-5" />,
  leaf: <Leaf className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  droplet: <Droplet className="w-5 h-5" />,
  cloud: <Cloud className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
  footprints: <Footprints className="w-5 h-5" />,
  book: <Book className="w-5 h-5" />,
};

const iconToneMap: Record<string, string> = {
  forest: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  glacier: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
  earth: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  slate: 'bg-slate-800 border-white/15 text-slate-300',
  alert: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
};

export function AsymmetricModuleSurface() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const router = useRouter();

  const getModuleSize = (index: number) => {
    if (index === 0) return 'col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2';
    if (index === 6) return 'col-span-1 sm:col-span-2 lg:col-span-2';
    return 'col-span-1';
  };

  const isFeaturedCard = (index: number) => index === 0;

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-8 sm:pb-12 md:pb-16 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-forest-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-glacier-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-forest-500 rounded-full signal-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
              Intelligence Domains
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                Modular Intelligence Surface
              </h2>
              <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                Access specialized ecological intelligence systems with integrated data layers,
                monitoring dashboards, and analytical tools across all environmental domains.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/module-directory')}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg glass-light border border-white/10 text-xs sm:text-sm text-slate-300 hover:text-white hover:border-forest-500/50 transition-all flex-shrink-0"
              >
                <Layers className="w-4 h-4" />
                <span>View All Modules</span>
              </button>
              <button
                onClick={() => router.push('/risk-monitoring/dashboards')}
                className="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg glass-light border border-white/10 text-xs sm:text-sm text-slate-300 hover:text-white hover:border-forest-500/50 transition-all"
              >
                <Activity className="w-4 h-4" />
                <span>Activity Log</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content-driven responsive grid (no fixed row heights) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {intelligenceCards.map((card, index) => {
            const sizeClass = getModuleSize(index);
            const isHovered = hoveredModule === card.id;
            const Icon = iconMap[card.icon];
            const primaryMetric = card.metrics?.[0];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={`${sizeClass} h-full min-w-0`}
                onMouseEnter={() => setHoveredModule(card.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(card.link)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      router.push(card.link);
                    }
                  }}
                  className={`kew-card-shell kew-card-shell--interactive group ${
                    isHovered ? 'border-emerald-500/40' : ''
                  }`}
                >
                  {/* 1. ICON (top-left) + optional top-right Featured badge */}
                  <div className="kew-card-top-row">
                    <div
                      className={`kew-card-icon-box ${
                        iconToneMap[card.color] || iconToneMap.slate
                      } ${index === 0 ? 'glow-forest' : ''}`}
                    >
                      {Icon}
                    </div>
                    {isFeaturedCard(index) && (
                      <span className="inline-flex items-center gap-1 text-[11px] rounded-[4px] bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-amber-300 font-semibold">
                        <Zap className="w-3 h-3 text-amber-400" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* 2. TITLE — full horizontal width */}
                  <h3 className="kew-card-title">{card.title}</h3>

                  {/* 3. KPI / METRIC — below title */}
                  {isFeaturedCard(index) && card.metrics.length > 0 ? (
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 py-2 border-y border-white/10">
                      {card.metrics.map((metric, idx) => (
                        <div key={idx} className="min-w-0">
                          <div className="text-lg sm:text-xl font-extrabold text-white tabular-nums">
                            {metric.value.toLocaleString()}
                          </div>
                          <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">
                            {metric.unit || metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : primaryMetric ? (
                    <div className="kew-card-kpi">
                      <span className="text-lg font-bold text-white tabular-nums">
                        {primaryMetric.value.toLocaleString()}
                      </span>
                      <span className="kew-card-kpi-unit">
                        {primaryMetric.unit || primaryMetric.label}
                      </span>
                    </div>
                  ) : null}

                  {/* 4. DESCRIPTION — naturally wrapping */}
                  <p className="kew-card-desc">{card.description}</p>

                  {/* 5. CTA — anchored consistently near bottom */}
                  <div className="kew-card-cta">
                    <span>Access Module</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom directory card — vertical hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-6 sm:mt-8"
        >
          <div className="kew-card-shell sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2 min-w-0">
              <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="kew-card-title">Complete Module Directory</h3>
              <p className="kew-card-desc">
                Access all 24 intelligence modules across 5 ecological pillars with live telemetry and GIS layers.
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:border-forest-400 text-xs sm:text-sm w-full sm:w-auto"
                onClick={() => router.push('/module-directory')}
              >
                Browse Directory
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
