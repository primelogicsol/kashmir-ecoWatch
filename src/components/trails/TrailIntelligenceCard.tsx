import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { TrailIntelligence } from '@/data/trails-sightings';
import {
  MapPin, Mountain, Clock, TrendingUp, AlertTriangle,
  Shield, Calendar, Eye, ArrowRight, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TrailIntelligenceCardProps {
  trail: TrailIntelligence;
  onClick?: (trail: TrailIntelligence) => void;
}

const sensitivityColors = {
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const accessStatusColors = {
  open: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  restricted: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  closed: 'bg-red-500/20 text-red-400 border-red-500/30',
  'permit-required': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const routeConditionColors = {
  excellent: 'text-emerald-400',
  good: 'text-lime-400',
  fair: 'text-amber-400',
  poor: 'text-orange-400',
  hazardous: 'text-red-400',
};

const trailClassIcons = {
  flagship: Shield,
  sensitive: AlertTriangle,
  wetland: Droplets,
  seasonal: Calendar,
  'protected-area': Shield,
  'high-altitude': Mountain,
};

export function TrailIntelligenceCard({ trail, onClick }: TrailIntelligenceCardProps) {
  const TrailClassIcon = trailClassIcons[trail.trailClass] || Mountain;

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
        onClick={() => onClick?.(trail)}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(trail);
          }
        }}
        className="kew-card-shell kew-card-shell--interactive group h-full"
      >
        {/* 1. ICON (top-left) + Trail Class Badge (top-right) */}
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
            <Mountain className="w-5 h-5" />
          </div>
          <Badge variant="outline" size="sm" className="border-white/15 text-xs">
            <TrailClassIcon className="w-3 h-3 mr-1" />
            {trail.trailClass}
          </Badge>
        </div>

        {/* 2. TITLE — full horizontal width (no line-clamp-1!) */}
        <div>
          <h3 className="kew-card-title">{trail.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 break-words">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
            <span>{trail.district.join(', ')}</span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge size="sm" className={`border ${accessStatusColors[trail.accessStatus]} text-xs`}>
            {trail.accessStatus.replace('-', ' ')}
          </Badge>
          <Badge size="sm" className={`border ${sensitivityColors[trail.sensitivity]} text-xs`}>
            {trail.sensitivity} sensitivity
          </Badge>
          {trail.relatedProtectedArea && (
            <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-300 text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Protected Area
            </Badge>
          )}
        </div>

        {/* 3. KPI Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-white/5">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Mountain className="w-3 h-3" />
              Altitude
            </div>
            <div className="text-sm font-bold text-white tabular-nums">
              {trail.altitudeBand.min}–{trail.altitudeBand.max} m
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-white/5">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Clock className="w-3 h-3" />
              Duration
            </div>
            <div className="text-sm font-bold text-white tabular-nums">
              {trail.duration.min}–{trail.duration.max} h
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-800/50 border border-white/5 col-span-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
              <Calendar className="w-3 h-3" />
              Best Time
            </div>
            <div className="text-sm font-semibold text-white break-words">
              {trail.seasonWindow.optimal.join(', ')}
            </div>
          </div>
        </div>

        {/* 4. DESCRIPTION */}
        <p className="kew-card-desc">{trail.description}</p>

        {/* Route Condition */}
        <div className="p-2.5 rounded-lg bg-slate-800/40 border border-white/5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <TrendingUp className={`w-4 h-4 ${routeConditionColors[trail.routeCondition.status]}`} />
              <span className="text-xs text-slate-300">Route Condition</span>
            </div>
            <span className={`text-xs font-bold ${routeConditionColors[trail.routeCondition.status]}`}>
              {trail.routeCondition.status.toUpperCase()}
            </span>
          </div>
          {trail.routeCondition.hazards && trail.routeCondition.hazards.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {trail.routeCondition.hazards.slice(0, 3).map((hazard, idx) => (
                <Badge key={idx} variant="outline" size="sm" className="text-xs border-red-500/30 text-red-400">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {hazard}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Observer Activity */}
        <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/20">
          <div className="flex items-center gap-1.5 mb-2">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">Observer Activity</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-base font-bold text-white tabular-nums">{trail.observerActivity.totalObservers}</div>
              <div className="text-[11px] text-slate-400">Observers</div>
            </div>
            <div>
              <div className="text-base font-bold text-white tabular-nums">{trail.observerActivity.totalSightings}</div>
              <div className="text-[11px] text-slate-400">Sightings</div>
            </div>
            <div>
              <div className="text-base font-bold text-emerald-400 tabular-nums">{trail.observerActivity.verifiedSightings}</div>
              <div className="text-[11px] text-slate-400">Verified</div>
            </div>
          </div>
        </div>

        {/* Features */}
        {trail.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {trail.features.slice(0, 4).map((feature, idx) => (
              <Badge key={idx} variant="outline" size="sm" className="text-xs border-white/10 text-slate-300">
                {feature}
              </Badge>
            ))}
          </div>
        )}

        {/* 5. CTA — anchored near bottom */}
        <div className="kew-card-cta">
          <span>View Trail Intelligence</span>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
