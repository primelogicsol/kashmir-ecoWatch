'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  MapPin, Droplets, Leaf, AlertTriangle,
  Users, Shield, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DistrictIntelligenceSummary } from '@/data/district-intelligence-aggregator';
import { cn } from '@/lib/utils';

interface DistrictCardProps {
  summary: DistrictIntelligenceSummary;
  index?: number;
  compact?: boolean;
}

const riskLevelColors: Record<string, string> = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const riskLevelBadgeColors: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
  critical: 'danger',
  high: 'warning',
  moderate: 'info',
  low: 'success',
};

export function DistrictCard({ summary, index = 0, compact = false }: DistrictCardProps) {
  const router = useRouter();
  const { profile, riskLevel, environmentalSummary, keyHighlights } = summary;

  const activeAlerts =
    profile.riskStack.flood.alerts +
    profile.riskStack.landslide.alerts +
    profile.riskStack.forestFire.alerts;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="h-full min-w-0"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => router.push(`/districts/${profile.slug}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              router.push(`/districts/${profile.slug}`);
            }
          }}
          className="kew-card-shell kew-card-shell--interactive group p-4 gap-2.5 h-full"
        >
          <div className="kew-card-top-row">
            <div className="kew-card-icon-box bg-emerald-950/50 border-emerald-500/30 text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <Badge variant={riskLevelBadgeColors[riskLevel]} size="sm" className="text-xs">
              {riskLevel}
            </Badge>
          </div>

          <h3 className="kew-card-title text-sm sm:text-base">{profile.name}</h3>
          <p className="kew-card-desc text-xs">{environmentalSummary}</p>

          <div className="kew-card-cta text-xs pt-2">
            <span>View Profile</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="h-full min-w-0"
    >
      <div className="kew-card-shell group h-full">
        {/* 1. ICON (top-left) + Risk Badge (top-right) */}
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-emerald-950/50 border-emerald-500/30 text-emerald-400">
            <MapPin className="w-5 h-5" />
          </div>
          <Badge
            variant={riskLevelBadgeColors[riskLevel]}
            size="sm"
            className={cn('text-xs flex-shrink-0', riskLevelColors[riskLevel])}
          >
            Risk: {profile.scores.riskLevel}
          </Badge>
        </div>

        {/* 2. TITLE — full horizontal width */}
        <div>
          <h3 className="kew-card-title">{profile.name}</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
            <span className="capitalize">{profile.region.replace('-', ' ')}</span>
            <span>·</span>
            <span>{profile.tehsils.length} tehsils</span>
          </div>
        </div>

        {/* 3. KPI Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-white/10">
          <div className="text-center min-w-0">
            <div className="flex items-center justify-center mb-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white tabular-nums">
              {profile.biodiversity.totalSpecies}
            </div>
            <div className="text-[11px] text-slate-400">Species</div>
          </div>

          <div className="text-center min-w-0">
            <div className="flex items-center justify-center mb-1">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-white tabular-nums">
              {profile.hydrological.waterBodies.total}
            </div>
            <div className="text-[11px] text-slate-400">Water Bodies</div>
          </div>

          <div className="text-center min-w-0">
            <div className="flex items-center justify-center mb-1">
              <AlertTriangle
                className={cn('w-3.5 h-3.5', activeAlerts > 0 ? 'text-orange-400' : 'text-slate-500')}
              />
            </div>
            <div
              className={cn(
                'text-lg font-bold tabular-nums',
                activeAlerts > 0 ? 'text-orange-400' : 'text-slate-400'
              )}
            >
              {activeAlerts}
            </div>
            <div className="text-[11px] text-slate-400">Active Alerts</div>
          </div>
        </div>

        {/* 4. DESCRIPTION */}
        <p className="kew-card-desc">{environmentalSummary}</p>

        {/* Key Highlights */}
        {keyHighlights.length > 0 && (
          <div className="space-y-1.5">
            {keyHighlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                <span className="break-words">{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {/* Additional Metadata */}
        <div className="grid grid-cols-2 gap-3 text-xs pt-1">
          <div className="flex items-center gap-2 text-slate-400">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>{(profile.population.total / 1000).toFixed(0)}K pop.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span>{profile.ecological.protectedAreas.count} PAs</span>
          </div>
        </div>

        {/* 5. CTA — anchored near bottom */}
        <div className="mt-auto pt-3 border-t border-white/10">
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 text-white w-full h-9 hover:border-emerald-500/50 hover:bg-emerald-500/10"
            onClick={() => router.push(`/districts/${profile.slug}`)}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

interface DistrictStatsProps {
  totalDistricts: number;
  highestRiskDistrict: string;
  mostBiodiverseDistrict: string;
  mostMonitoredDistrict: string;
  districtsActiveAlerts: number;
}

export function DistrictStats({
  totalDistricts,
  highestRiskDistrict,
  mostBiodiverseDistrict,
  mostMonitoredDistrict,
  districtsActiveAlerts,
}: DistrictStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8 border-t border-white/10">
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1 tabular-nums">{totalDistricts}</div>
        <div className="text-sm text-slate-400">Districts Covered</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-400 mb-1 break-words">{highestRiskDistrict}</div>
        <div className="text-sm text-slate-400">Highest Risk</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-emerald-400 mb-1 break-words">{mostBiodiverseDistrict}</div>
        <div className="text-sm text-slate-400">Most Biodiverse</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400 mb-1 break-words">{mostMonitoredDistrict}</div>
        <div className="text-sm text-slate-400">Most Monitored</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-orange-400 mb-1 tabular-nums">{districtsActiveAlerts}</div>
        <div className="text-sm text-slate-400">Active Alert Districts</div>
      </div>
    </div>
  );
}
