'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  Map, BookOpen, Leaf, ArrowRight, Compass, Layers, Search, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const intelligencePaths = [
  {
    id: 'spatial-analysis',
    title: 'Spatial Analysis',
    description: 'Interactive GIS atlas with multi-layer ecological intelligence',
    icon: Map,
    color: 'from-blue-500 to-indigo-600',
    route: '/protected-network/atlas',
    bestFor: 'Atlas-based ecological exploration',
    dataType: 'Layers, boundaries, habitats, monitoring overlays',
    resultType: 'Interactive spatial visualizations & measurements',
    cta: 'Open Map Workspace',
  },
  {
    id: 'regional-profiles',
    title: 'Regional Profiles',
    description: 'District-level ecological health assessments and risk indicators',
    icon: Compass,
    color: 'from-emerald-500 to-green-600',
    route: '/districts',
    bestFor: 'Regional environmental health tracking',
    dataType: 'Scorecards, comparisons, local ecological data',
    resultType: 'Comprehensive district ecological reports',
    cta: 'View District Profiles',
  },
  {
    id: 'thematic-monitoring',
    title: 'Thematic Monitoring',
    description: 'Domain-specific tracking: biodiversity, water, pollution, hazards',
    icon: Layers,
    color: 'from-violet-500 to-purple-600',
    route: '/module-directory',
    bestFor: 'Specialized ecological domain research',
    dataType: 'Thematic modules, time-series data, indicators',
    resultType: 'Focused environmental monitoring dashboards',
    cta: 'Access Thematic Data',
  },
];

const quickStartTips = [
  {
    icon: Search,
    title: 'Use Global Search',
    description: 'Press ⌘K or click search to find species, locations, and data instantly',
  },
  {
    icon: BookOpen,
    title: 'Read Documentation',
    description: 'Learn how to use each module with guided tutorials and examples',
  },
  {
    icon: Leaf,
    title: 'Contribute Data',
    description: 'Submit sightings, report issues, or join citizen science programs',
  },
];

export function OnboardingStrip() {
  const router = useRouter();
  const [showTips, setShowTips] = useState(false);

  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intelligence pathways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Choose Your Intelligence Path
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Select an exploration pathway aligned with your research objectives
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {intelligencePaths.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full min-w-0"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(pathway.route)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      router.push(pathway.route);
                    }
                  }}
                  className="kew-card-shell kew-card-shell--interactive group h-full"
                >
                  {/* 1. ICON (top-left) */}
                  <div className="kew-card-top-row">
                    <div className="kew-card-icon-box bg-slate-800/90 border-white/15 text-emerald-400">
                      <pathway.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* 2. TITLE — full horizontal width */}
                  <h3 className="kew-card-title">{pathway.title}</h3>

                  {/* 3. DESCRIPTION */}
                  <p className="kew-card-desc">{pathway.description}</p>

                  {/* 4. Intelligence metadata */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Best for
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 break-words">
                        {pathway.bestFor}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Data type
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 break-words">
                        {pathway.dataType}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Result type
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 break-words">
                        {pathway.resultType}
                      </span>
                    </div>
                  </div>

                  {/* 5. CTA Button — anchored near bottom */}
                  <div className="mt-auto pt-2">
                    <Button
                      size="sm"
                      className={`w-full bg-gradient-to-r ${pathway.color} hover:opacity-90 text-white text-xs sm:text-sm`}
                      onClick={() => router.push(pathway.route)}
                    >
                      <span>{pathway.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Collapsible quick start tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10" padding="none">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
              type="button"
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Quick Start Guide
                  </h3>
                  <p className="text-xs text-slate-400">
                    Essential tips for getting started
                  </p>
                </div>
              </div>
              {showTips ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                      {quickStartTips.map((tip, index) => (
                        <div key={index} className="kew-card-shell p-4 gap-2.5">
                          <div className="kew-card-icon-box bg-slate-800 border-white/10 text-emerald-400">
                            <tip.icon className="w-5 h-5" />
                          </div>
                          <h4 className="kew-card-title text-sm sm:text-base">{tip.title}</h4>
                          <p className="kew-card-desc text-xs sm:text-sm">{tip.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
