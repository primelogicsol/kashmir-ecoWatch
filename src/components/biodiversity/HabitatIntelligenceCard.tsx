import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { HabitatBiodiversity } from '@/data/biodiversity-intelligence';
import {
  Leaf, MapPin, Shield, AlertTriangle,
  ArrowRight, Droplet, Mountain, Flower2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HabitatIntelligenceCardProps {
  habitat: HabitatBiodiversity;
  onClick?: (habitat: HabitatBiodiversity) => void;
}

const vulnerabilityColors = {
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const habitatIcons = {
  'forest-biodiversity': Leaf,
  'wetland-biodiversity': Droplet,
  'alpine-biodiversity': Mountain,
  'river-stream-biodiversity': Droplet,
  'meadow-grassland-biodiversity': Flower2,
};

export function HabitatIntelligenceCard({ habitat, onClick }: HabitatIntelligenceCardProps) {
  const Icon = habitatIcons[habitat.slug as keyof typeof habitatIcons] || Leaf;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full min-w-0"
    >
      <div
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={() => onClick?.(habitat)}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(habitat);
          }
        }}
        className="kew-card-shell kew-card-shell--interactive group h-full"
      >
        {/* 1. ICON (top-left) + Vulnerability Badge (top-right) */}
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
            <Icon className="w-5 h-5" />
          </div>
          <Badge size="sm" className={vulnerabilityColors[habitat.vulnerabilityScore]}>
            <AlertTriangle className="w-3 h-3 mr-1" />
            {habitat.vulnerabilityScore}
          </Badge>
        </div>

        {/* 2. TITLE — full horizontal width */}
        <h3 className="kew-card-title">{habitat.name}</h3>

        {/* 3. KPI — Area & Species Metrics */}
        <div className="kew-card-kpi">
          <span className="kew-card-kpi-value">{habitat.areaKm2.toLocaleString()}</span>
          <span className="kew-card-kpi-unit">km² ({habitat.percentOfKashmir}% of region)</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-lg bg-slate-800/50 border border-white/5 text-center">
            <div className="text-base sm:text-lg font-bold text-white tabular-nums">
              {habitat.speciesCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400">Species</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/50 border border-white/5 text-center">
            <div className="text-base sm:text-lg font-bold text-amber-400 tabular-nums">
              {habitat.threatenedSpecies}
            </div>
            <div className="text-[11px] text-slate-400">Threatened</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-800/50 border border-white/5 text-center">
            <div className="text-base sm:text-lg font-bold text-sky-400 tabular-nums">
              {habitat.migratorySpecies}
            </div>
            <div className="text-[11px] text-slate-400">Migratory</div>
          </div>
        </div>

        {/* 4. DESCRIPTION */}
        <p className="kew-card-desc">{habitat.description}</p>

        {/* Taxonomic Breakdown */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Taxonomic Breakdown
          </div>
          <div className="space-y-1.5">
            {[
              { label: 'Mammals', value: habitat.byTaxonomicGroup.mammals, color: 'text-emerald-400' },
              { label: 'Birds', value: habitat.byTaxonomicGroup.birds, color: 'text-sky-400' },
              { label: 'Fish', value: habitat.byTaxonomicGroup.fish, color: 'text-cyan-400' },
              { label: 'Plants', value: habitat.byTaxonomicGroup.plants, color: 'text-green-400' },
              { label: 'Medicinal', value: habitat.byTaxonomicGroup.medicinalPlants, color: 'text-amber-400' },
            ].map((taxon) => (
              <div key={taxon.label} className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-400">{taxon.label}</span>
                <span className={`font-semibold tabular-nums ${taxon.color}`}>{taxon.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Districts */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Districts</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {habitat.districts.slice(0, 4).map((district) => (
              <Badge key={district} variant="outline" size="sm" className="text-xs border-white/10 text-slate-300">
                {district}
              </Badge>
            ))}
            {habitat.districts.length > 4 && (
              <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                +{habitat.districts.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Risk Drivers */}
        {habitat.riskDrivers.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-3 h-3 text-orange-400" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Threats</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {habitat.riskDrivers.slice(0, 3).map((driver, idx) => (
                <Badge key={idx} variant="outline" size="sm" className="text-xs border-orange-500/30 text-orange-300">
                  {driver}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Protected Area Overlap */}
        <div className="p-3 rounded-lg bg-slate-800/60 border border-amber-500/20">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm text-slate-300">Protected Area Overlap</span>
            </div>
            <div className="text-right">
              <div className="text-base font-bold text-amber-400 tabular-nums">
                {habitat.protectedAreaOverlap.toLocaleString()} km²
              </div>
            </div>
          </div>
        </div>

        {/* 5. CTA — anchored near bottom */}
        <div className="kew-card-cta">
          <span>Explore {habitat.name.split(' ')[0]} Biodiversity</span>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
