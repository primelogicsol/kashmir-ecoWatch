'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { KewIcons as Icons } from '@/components/common/KewIcons';
import Link from 'next/link';
import {
  SeasonalLandscape,
  BloomZone,
  MigrationWindow,
  PollinatorWindow,
  PhenologyRecord,
  HabitatSignal,
  WaterTransition,
  SpeciesActivity,
  ClimateWindow,
  SeasonalReport,
} from '@/types/seasonal-ecology';

interface SeasonalCardProps {
  entity:
    | SeasonalLandscape
    | BloomZone
    | MigrationWindow
    | PollinatorWindow
    | PhenologyRecord
    | HabitatSignal
    | WaterTransition
    | SpeciesActivity
    | ClimateWindow
    | SeasonalReport;
  variant?:
    | 'landscape'
    | 'bloom'
    | 'migration'
    | 'pollinator'
    | 'phenology'
    | 'habitat'
    | 'water'
    | 'species'
    | 'climate'
    | 'report';
  onClick?: () => void;
  detailHref?: string;
}

const getIconForType = (iconName: string) => {
  const IconComponent = (Icons as any)[iconName] || Icons.Mountain;
  return <IconComponent className="w-5 h-5" />;
};

const getSeasonBadgeVariant = (
  season: string
): 'default' | 'success' | 'warning' | 'danger' | 'info' => {
  const variants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    spring: 'success',
    summer: 'default',
    monsoon: 'info',
    autumn: 'warning',
    winter: 'default',
    'pre-spring': 'success',
  };
  return variants[season] || 'default';
};

export const SeasonalCard: React.FC<SeasonalCardProps> = ({
  entity,
  variant = 'landscape',
  onClick,
  detailHref,
}) => {
  const iconMap: Record<string, string> = {
    landscape: 'Mountain',
    bloom: 'Flower2',
    migration: 'Bird',
    pollinator: 'Bug',
    phenology: 'Calendar',
    habitat: 'Radar',
    water: 'Droplets',
    species: 'PawPrint',
    climate: 'Sun',
    report: 'FileText',
  };

  const iconToneMap: Record<string, string> = {
    landscape: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    bloom: 'bg-pink-500/15 border-pink-500/30 text-pink-400',
    migration: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
    pollinator: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    phenology: 'bg-violet-500/15 border-violet-500/30 text-violet-400',
    habitat: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    water: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
    species: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
    climate: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    report: 'bg-slate-800 border-white/15 text-slate-300',
  };

  const getName = () => {
    if ('name' in entity && (entity as any).name) return (entity as any).name;
    if ('title' in entity && (entity as any).title) return (entity as any).title;
    if ('speciesCommonName' in entity && (entity as any).speciesCommonName)
      return (entity as any).speciesCommonName || (entity as any).speciesName;
    if ('commonName' in entity && (entity as any).commonName) return (entity as any).commonName;
    return 'Unknown';
  };

  const getDescription = () => {
    if ('description' in entity && (entity as any).description) return (entity as any).description;
    if ('shortDescription' in entity && (entity as any).shortDescription)
      return (entity as any).shortDescription;
    return '';
  };

  const getDistricts = (): string[] => {
    if ('districts' in entity && (entity as any).districts) return (entity as any).districts;
    if ('district' in entity && (entity as any).district) return [(entity as any).district];
    if ('linkedDistricts' in entity && (entity as any).linkedDistricts)
      return (entity as any).linkedDistricts;
    if ('regionsPresent' in entity && (entity as any).regionsPresent)
      return (entity as any).regionsPresent;
    return [];
  };

  const getSeasons = (): string[] => {
    if ('primarySeasons' in entity) return entity.primarySeasons;
    if ('seasonalFocus' in entity) return entity.seasonalFocus;
    return [];
  };

  const getElevationRange = () => {
    if ('elevationRange' in entity && entity.elevationRange) {
      return `${entity.elevationRange.min}m – ${entity.elevationRange.max}m`;
    }
    return null;
  };

  const getTimingInfo = () => {
    if ('bloomWindow' in entity) return entity.bloomWindow.description;
    if ('activityWindow' in entity) return entity.activityWindow.description;
    if ('observedTiming' in entity) return entity.observedTiming.description;
    if ('seasonalTiming' in entity) return entity.seasonalTiming.description;
    if ('timingWindow' in entity) return entity.timingWindow.description;
    if ('arrivalWindow' in entity)
      return `Arrival: ${(entity as MigrationWindow).arrivalWindow?.description}`;
    return null;
  };

  const getAdditionalMetrics = () => {
    const metrics: { label: string; value: string }[] = [];
    if ('area' in entity && entity.area) metrics.push({ label: 'Area', value: `${entity.area} km²` });
    if ('populationEstimate' in entity && entity.populationEstimate)
      metrics.push({ label: 'Population', value: entity.populationEstimate });
    if ('peakBloomPeriod' in entity && entity.peakBloomPeriod)
      metrics.push({ label: 'Peak Bloom', value: entity.peakBloomPeriod });
    if ('verificationStatus' in entity && entity.verificationStatus)
      metrics.push({ label: 'Status', value: entity.verificationStatus });
    if ('windowType' in entity && entity.windowType)
      metrics.push({
        label: 'Window Type',
        value: entity.windowType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    if ('signalType' in entity && entity.signalType)
      metrics.push({
        label: 'Signal Type',
        value: entity.signalType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    if ('transitionType' in entity && entity.transitionType)
      metrics.push({
        label: 'Transition',
        value: entity.transitionType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    if ('activityType' in entity && entity.activityType)
      metrics.push({
        label: 'Activity',
        value: entity.activityType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    if ('reportType' in entity && entity.reportType)
      metrics.push({
        label: 'Report Type',
        value: entity.reportType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    if ('bloomType' in entity && entity.bloomType)
      metrics.push({
        label: 'Bloom Type',
        value: entity.bloomType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    if ('migrationType' in entity && entity.migrationType)
      metrics.push({
        label: 'Migration Type',
        value: entity.migrationType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    if ('pollinatorGroup' in entity && entity.pollinatorGroup)
      metrics.push({
        label: 'Pollinator Group',
        value: entity.pollinatorGroup.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      });
    return metrics.slice(0, 2);
  };

  const name = getName();
  const description = getDescription();
  const districts = getDistricts();
  const seasons = getSeasons();
  const elevationRange = getElevationRange();
  const timingInfo = getTimingInfo();
  const additionalMetrics = getAdditionalMetrics();
  const variantIcon = iconMap[variant] || 'Mountain';

  const cardElement = (
    <div
      role={!detailHref && onClick ? 'button' : undefined}
      tabIndex={!detailHref && onClick ? 0 : undefined}
      onClick={!detailHref ? onClick : undefined}
      onKeyDown={(e) => {
        if (!detailHref && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className="kew-card-shell kew-card-shell--interactive group h-full"
    >
      {/* 1. ICON (top-left) + Variant Badge (top-right) */}
      <div className="kew-card-top-row">
        <div className={`kew-card-icon-box ${iconToneMap[variant] || iconToneMap.landscape}`}>
          {getIconForType(variantIcon)}
        </div>
        <Badge variant="info" size="sm" className="capitalize">
          {variant}
        </Badge>
      </div>

      {/* 2. TITLE — full horizontal width */}
      <div>
        <h3 className="kew-card-title">{name}</h3>
        {elevationRange && <p className="text-xs text-slate-400 mt-0.5 tabular-nums">{elevationRange}</p>}
      </div>

      {/* 3. KPI / Additional Metrics */}
      {additionalMetrics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {additionalMetrics.map((metric, idx) => (
            <div key={idx} className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-white/5">
              <span className="text-[11px] text-slate-400">{metric.label}: </span>
              <span className="text-xs text-white font-semibold">{metric.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* 4. DESCRIPTION */}
      {description && <p className="kew-card-desc">{description}</p>}

      {/* Districts & Seasons */}
      {districts.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {districts.slice(0, 3).map((district, idx) => (
            <Badge key={idx} variant="info" size="sm">
              {district.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
          ))}
          {districts.length > 3 && <Badge variant="info" size="sm">+{districts.length - 3}</Badge>}
        </div>
      )}

      {seasons.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {seasons.slice(0, 4).map((season, idx) => (
            <Badge key={idx} variant={getSeasonBadgeVariant(season)} size="sm">
              {season.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
          ))}
        </div>
      )}

      {timingInfo && (
        <div className="flex items-start gap-2 text-xs text-slate-300 pt-1">
          <Icons.Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span className="break-words">{timingInfo}</span>
        </div>
      )}

      {/* 5. CTA — consistently visible and anchored near bottom */}
      <div className="kew-card-cta">
        <span>View Details</span>
        <Icons.ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );

  if (detailHref) {
    return (
      <Link href={detailHref} onClick={onClick} className="block h-full min-w-0 no-underline">
        {cardElement}
      </Link>
    );
  }

  return cardElement;
};
