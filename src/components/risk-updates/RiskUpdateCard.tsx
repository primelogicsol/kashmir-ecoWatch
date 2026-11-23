'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import {
  TrendingUp, TrendingDown, Minus, Eye, AlertTriangle,
  MapPin, Calendar, ArrowRight, Link as LinkIcon, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  RiskUpdate,
  hazardTypeLabels,
  hazardTypeColors,
  riskTrendLabels,
  riskTrendColors,
  severityLabels,
  severityColors,
  linkedAlertStatusLabels,
} from '@/data/risk-updates-intelligence';
import { cn } from '@/lib/utils';

interface RiskUpdateCardProps {
  update: RiskUpdate;
  index?: number;
  compact?: boolean;
}

const trendIcons: Record<string, React.ElementType> = {
  increasing: TrendingUp,
  stable: Minus,
  elevated: AlertTriangle,
  improving: TrendingDown,
  'under-watch': Eye,
};

export function RiskUpdateCard({ update, index = 0, compact = false }: RiskUpdateCardProps) {
  const router = useRouter();
  const TrendIcon = trendIcons[update.trend] || Minus;

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
          onClick={() => router.push(`/risk-updates/${update.id}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              router.push(`/risk-updates/${update.id}`);
            }
          }}
          className="kew-card-shell kew-card-shell--interactive group p-4 gap-2.5 h-full"
        >
          <div className="kew-card-top-row">
            <div className={cn('kew-card-icon-box', hazardTypeColors[update.hazardType])}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <Badge variant="outline" size="sm" className={cn('text-xs', hazardTypeColors[update.hazardType])}>
                {hazardTypeLabels[update.hazardType]}
              </Badge>
              <Badge variant="outline" size="sm" className={cn('text-xs', severityColors[update.severity])}>
                {severityLabels[update.severity]}
              </Badge>
            </div>
          </div>

          <h3 className="kew-card-title text-sm sm:text-base">{update.title}</h3>

          <div className="flex items-center gap-2 text-xs text-slate-400 mt-auto">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(update.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="h-full min-w-0"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(`/risk-updates/${update.id}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push(`/risk-updates/${update.id}`);
          }
        }}
        className="kew-card-shell kew-card-shell--interactive group h-full"
      >
        {/* 1. ICON (top-left) + Severity & Hazard Type badges (top-right) */}
        <div className="kew-card-top-row">
          <div className={cn('kew-card-icon-box', hazardTypeColors[update.hazardType])}>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <Badge variant="outline" size="sm" className={hazardTypeColors[update.hazardType]}>
              {hazardTypeLabels[update.hazardType]}
            </Badge>
            <Badge variant="outline" size="sm" className={cn('text-xs', severityColors[update.severity])}>
              {severityLabels[update.severity]}
            </Badge>
          </div>
        </div>

        {/* 2. TITLE — full horizontal width */}
        <h3 className="kew-card-title">{update.title}</h3>

        {/* 3. KPI / Trend, Date & Affected Geography */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          <div className="inline-flex items-center gap-1.5">
            <TrendIcon className={cn('w-3.5 h-3.5', riskTrendColors[update.trend])} />
            <span className={cn('font-semibold', riskTrendColors[update.trend])}>
              {riskTrendLabels[update.trend]}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(update.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>

          <div className="inline-flex flex-wrap items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {update.affectedGeographies.slice(0, 3).map((geo, i) => (
              <span key={i}>
                {geo.name}
                {i < Math.min(update.affectedGeographies.length, 3) - 1 && ', '}
              </span>
            ))}
            {update.affectedGeographies.length > 3 && (
              <span className="text-indigo-400">+{update.affectedGeographies.length - 3} more</span>
            )}
          </div>
        </div>

        {/* 4. DESCRIPTION */}
        <p className="kew-card-desc">{update.assessmentSummary}</p>

        {/* Linked Alert Status */}
        {update.linkedAlertStatus !== 'none' && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Linked alert status:</span>
            <Badge variant="outline" size="sm" className="text-indigo-300 border-indigo-500/30 bg-indigo-500/10">
              {linkedAlertStatusLabels[update.linkedAlertStatus]}
            </Badge>
          </div>
        )}

        {/* 5. CTA — anchored near bottom */}
        <div className="kew-card-cta">
          <span>Open Assessment</span>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

interface RiskUpdateStatsProps {
  totalUpdates: number;
  activeUpdates: number;
  highSeverity: number;
  districtsAffected: number;
  latestAssessment: string | null;
}

export function RiskUpdateStats({
  totalUpdates,
  activeUpdates,
  highSeverity,
  districtsAffected,
  latestAssessment,
}: RiskUpdateStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8 border-t border-white/10">
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1 tabular-nums">{activeUpdates}</div>
        <div className="text-sm text-slate-400">Active Updates</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-red-400 mb-1 tabular-nums">{highSeverity}</div>
        <div className="text-sm text-slate-400">High Severity</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1 tabular-nums">{districtsAffected}</div>
        <div className="text-sm text-slate-400">Districts Affected</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-amber-400 mb-1 tabular-nums">{totalUpdates - activeUpdates}</div>
        <div className="text-sm text-slate-400">Elevated Zones</div>
      </div>
      <div className="text-center col-span-2 md:col-span-1">
        <div className="text-lg font-bold text-white mb-1 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          {latestAssessment
            ? new Date(latestAssessment).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'N/A'}
        </div>
        <div className="text-sm text-slate-400">Latest Assessment</div>
      </div>
    </div>
  );
}
