'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Carousel } from '@/components/ui/Carousel';
import { useRouter } from 'next/navigation';
import { featuredEntities } from '@/lib/data';
import {
  MapPin, Mountain, Flower2, Footprints, Building2,
  ArrowRight, Heart, Share2, ArrowUpRight, Info,
  Shield, Droplet, Leaf, Ruler, Activity, TrendingUp,
  Waves, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const typeConfig: Record<string, {
  icon: React.ReactNode;
  iconBoxClass: string;
  badgeClass: string;
  label: string;
}> = {
  protected_area: {
    icon: <Mountain className="w-5 h-5" />,
    iconBoxClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    label: 'Protected Area',
  },
  lake: {
    icon: <Droplet className="w-5 h-5" />,
    iconBoxClass: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
    badgeClass: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
    label: 'Water Body',
  },
  species: {
    icon: <Heart className="w-5 h-5" />,
    iconBoxClass: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
    badgeClass: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    label: 'Species',
  },
  bloom: {
    icon: <Flower2 className="w-5 h-5" />,
    iconBoxClass: 'bg-pink-500/15 border-pink-500/30 text-pink-400',
    badgeClass: 'bg-pink-500/15 text-pink-300 border border-pink-500/30',
    label: 'Bloom Zone',
  },
  trail: {
    icon: <Footprints className="w-5 h-5" />,
    iconBoxClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    label: 'Trail',
  },
  district: {
    icon: <Building2 className="w-5 h-5" />,
    iconBoxClass: 'bg-slate-700/40 border-white/15 text-slate-300',
    badgeClass: 'bg-slate-700/50 text-slate-300 border border-white/15',
    label: 'District',
  },
  wetland: {
    icon: <Waves className="w-5 h-5" />,
    iconBoxClass: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
    label: 'Wetland Reserve',
  },
  hazard: {
    icon: <AlertTriangle className="w-5 h-5" />,
    iconBoxClass: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
    badgeClass: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    label: 'Hazard & Springs',
  },
};

const tabs = [
  { id: 'all', label: 'All', icon: MapPin },
  { id: 'protected_areas', label: 'Protected Areas', icon: Shield },
  { id: 'water_bodies', label: 'Water Bodies', icon: Droplet },
  { id: 'species', label: 'Species', icon: Leaf },
  { id: 'districts', label: 'Districts', icon: Building2 },
  { id: 'trails', label: 'Trails', icon: Footprints },
  { id: 'wetlands', label: 'Wetlands', icon: Waves },
  { id: 'bloom_zones', label: 'Bloom Zones', icon: Flower2 },
  { id: 'hazards', label: 'Hazard Systems', icon: AlertTriangle },
];

interface EntityCardProps {
  entity: typeof featuredEntities[0];
  onNavigate: (link: string) => void;
}

function EntityCard({ entity, onNavigate }: EntityCardProps) {
  const config = typeConfig[entity.type] || typeConfig.protected_area;

  return (
    <div className="kew-card-shell kew-card-shell--interactive group h-full">
      {/* 1. ICON (top-left) + Category badge & actions (top-right) */}
      <div className="kew-card-top-row">
        <div className={`kew-card-icon-box ${config.iconBoxClass}`}>
          {config.icon}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Badge className={`${config.badgeClass} text-[11px] px-2 py-0.5 font-semibold`}>
            {config.label}
          </Badge>
          <button
            className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label={`Save ${entity.name} to favorites`}
            type="button"
          >
            <Heart className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label={`Share ${entity.name}`}
            type="button"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. TITLE — full horizontal width */}
      <h3 className="kew-card-title">{entity.name}</h3>

      {/* 3. KPI / METRICS — below title */}
      {entity.metrics && entity.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {entity.metrics.map((metric, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-800/60 border border-white/5 min-w-0">
              <div className="flex items-center gap-1.5 text-base font-extrabold text-white tabular-nums">
                {metric.unit === 'km²' || metric.unit === 'km' ? (
                  <Ruler className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : metric.unit === '%' ? (
                  <TrendingUp className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                ) : (
                  <Activity className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                )}
                <span className="break-words">
                  {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 break-words">
                {metric.unit || metric.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. DESCRIPTION — naturally wrapping */}
      <p className="kew-card-desc">{entity.description}</p>

      {/* 5. CTA — consistently anchored near bottom */}
      <div className="mt-auto pt-3 border-t border-white/10 flex items-center gap-2">
        <Button
          variant="outline"
          className="flex-1 text-xs sm:text-sm py-2 rounded-lg border-white/20 text-white hover:border-forest-400 hover:bg-forest-500/10 font-semibold transition-all"
          onClick={() => onNavigate(entity.link)}
        >
          View Details
          <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
        <button
          onClick={() => onNavigate(entity.link)}
          className="p-2 rounded-lg bg-slate-800/60 border border-white/10 hover:border-forest-500/50 hover:bg-forest-500/10 transition-all"
          aria-label={`More info about ${entity.name}`}
          type="button"
        >
          <Info className="w-4 h-4 text-slate-400 hover:text-forest-400 transition-colors" />
        </button>
      </div>
    </div>
  );
}

interface CategorySummaryProps {
  tab: typeof tabs[0];
  isActive: boolean;
  count: number;
  onClick: () => void;
}

function CategorySummary({ tab, isActive, count, onClick }: CategorySummaryProps) {
  return (
    <button
      onClick={onClick}
      data-selected={isActive ? 'true' : undefined}
      className={`kew-card-shell kew-card-shell--interactive text-left p-3 sm:p-3.5 gap-2 ${
        isActive ? 'kew-card-shell--selected bg-emerald-950/30' : ''
      }`}
      type="button"
    >
      <div
        className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
          isActive
            ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
            : 'bg-slate-800/80 border-white/10 text-slate-400'
        }`}
      >
        <tab.icon className="w-4 h-4" />
      </div>
      <div className="text-xs font-bold text-slate-200 leading-snug break-words w-full">
        {tab.label}
      </div>
      <div className="text-xl font-extrabold text-white tabular-nums mt-auto">{count}</div>
    </button>
  );
}

export function FeaturedEntityStrip() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const filteredEntities = useMemo(() => {
    if (activeTab === 'all') return featuredEntities;

    const typeMap: Record<string, string> = {
      protected_areas: 'protected_area',
      water_bodies: 'lake',
      species: 'species',
      districts: 'district',
      trails: 'trail',
      wetlands: 'wetland',
      bloom_zones: 'bloom',
      hazards: 'hazard',
    };

    const targetType = typeMap[activeTab];
    return featuredEntities.filter((e) => e.type === targetType);
  }, [activeTab]);

  const counts = useMemo(() => {
    return {
      all: featuredEntities.length,
      protected_areas: featuredEntities.filter((e) => e.type === 'protected_area').length,
      water_bodies: featuredEntities.filter((e) => e.type === 'lake').length,
      species: featuredEntities.filter((e) => e.type === 'species').length,
      districts: featuredEntities.filter((e) => e.type === 'district').length,
      trails: featuredEntities.filter((e) => e.type === 'trail').length,
      wetlands: featuredEntities.filter((e) => e.type === 'wetland').length,
      bloom_zones: featuredEntities.filter((e) => e.type === 'bloom').length,
      hazards: featuredEntities.filter((e) => e.type === 'hazard').length,
    };
  }, []);

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-forest-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-2 h-2 bg-forest-500 rounded-full signal-pulse shadow-lg shadow-forest-500/50" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Featured Intelligence
                </span>
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
                Featured Ecological Entities
              </h2>
              <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                Discover key ecological assets, critical habitats, and significant
                environmental features with comprehensive intelligence profiles.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:border-forest-400 hover:bg-forest-500/10 text-sm font-medium transition-all"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => router.push('/biodiversity')}
              >
                Browse All Entities
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <div
            className="flex flex-wrap gap-2 text-xs sm:text-sm p-1.5 sm:p-2 glass-light rounded-xl border border-white/10"
            role="tablist"
            aria-label="Entity categories"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const tabCount = counts[tab.id as keyof typeof counts];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-forest-500 ${
                    isActive
                      ? 'bg-forest-500 text-white shadow-lg shadow-forest-500/30 border border-forest-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  type="button"
                >
                  <tab.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-[4px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {tabCount}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Standardized Carousel with Entity Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={activeTab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {filteredEntities.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base">
                    No entities found in this category
                  </p>
                </div>
              ) : (
                <Carousel
                  itemWidth={{ mobile: 272, tablet: 310, desktop: 360 }}
                  gap="gap-3 sm:gap-4 md:gap-5"
                  showArrows={true}
                  ariaLabel="Featured entities carousel"
                >
                  {filteredEntities.map((entity) => (
                    <div
                      key={entity.id}
                      className="flex-shrink-0 w-[calc(100vw-2.5rem)] max-w-[280px] sm:w-[300px] sm:max-w-none md:w-[340px] 3xl:w-[380px] 4xl:w-[410px] snap-start h-auto flex"
                    >
                      <EntityCard entity={entity} onNavigate={router.push} />
                    </div>
                  ))}
                </Carousel>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Category Summary Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Category Overview
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-stretch">
            {tabs.filter((t) => t.id !== 'all').map((tab) => (
              <CategorySummary
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                count={counts[tab.id as keyof typeof counts]}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
