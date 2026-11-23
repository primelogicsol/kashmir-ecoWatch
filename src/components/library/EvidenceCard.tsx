'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  EvidenceItem,
  ModuleReference,
  RelatedEntity,
  sourceTypeLabels,
  confidenceLabels,
  categoryLabels,
} from '@/data/evidence-intelligence';
import {
  FileText, Download, MapPin, Link as LinkIcon, ExternalLink,
  BookOpen, Database, FlaskConical, Map, Scroll, Star,
  Building2, Calendar, TrendingUp, Compass, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  variant?: 'default' | 'compact' | 'featured';
  showModuleLinks?: boolean;
  showRelatedEntities?: boolean;
  onClick?: () => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  research: BookOpen,
  report: FileText,
  dataset: Database,
  policy: Scroll,
  method: FlaskConical,
  map: Map,
  guide: Compass,
};

const sourceTypeColors: Record<string, string> = {
  official: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  academic: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  field: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  citizen: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const confidenceColors: Record<string, string> = {
  high: 'bg-emerald-500/20 text-emerald-400',
  medium: 'bg-amber-500/20 text-amber-400',
  low: 'bg-orange-500/20 text-orange-400',
  unverified: 'bg-slate-500/20 text-slate-400',
};

const entityIcons: Record<string, React.ElementType> = {
  species: MapPin,
  lake: MapPin,
  wetland: MapPin,
  district: MapPin,
  protected_area: MapPin,
  spring: MapPin,
  forest: MapPin,
  glacier: MapPin,
};

const entityColors: Record<string, string> = {
  species: 'text-emerald-400',
  lake: 'text-blue-400',
  wetland: 'text-cyan-400',
  district: 'text-purple-400',
  protected_area: 'text-emerald-400',
  spring: 'text-cyan-400',
  forest: 'text-green-400',
  glacier: 'text-blue-400',
};

export function EvidenceCard({
  evidence,
  variant = 'default',
  showModuleLinks = true,
  showRelatedEntities = true,
  onClick,
}: EvidenceCardProps) {
  const router = useRouter();
  const CategoryIcon = categoryIcons[evidence.category] || FileText;

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/library/${evidence.id}`);
  };

  if (variant === 'compact') {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick || (() => router.push(`/library/${evidence.id}`))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            (onClick || (() => router.push(`/library/${evidence.id}`)))();
          }
        }}
        className="kew-card-shell kew-card-shell--interactive group p-4 gap-2.5 h-full"
      >
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-indigo-950/60 border-indigo-500/30 text-indigo-400">
            <CategoryIcon className="w-5 h-5" />
          </div>
          <Badge variant="outline" size="sm">
            {categoryLabels[evidence.category]}
          </Badge>
        </div>

        <h3 className="kew-card-title text-sm sm:text-base">{evidence.title}</h3>

        <div className="text-xs text-slate-400 mt-auto">
          {evidence.organization} · {evidence.publishedDate.split('-')[0]}
        </div>
      </div>
    );
  }

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        'kew-card-shell kew-card-shell--interactive group h-full',
        variant === 'featured' && 'border-indigo-500/30'
      )}
    >
      {/* 1. ICON (top-left) + Category/Confidence badges (top-right) */}
      <div className="kew-card-top-row">
        <div className="kew-card-icon-box bg-indigo-950/60 border-indigo-500/30 text-indigo-400">
          <CategoryIcon className="w-5 h-5" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {variant === 'featured' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300">
              <Star className="w-3.5 h-3.5 fill-current" />
              Featured
            </span>
          )}
          <Badge variant="outline" size="sm">
            {categoryLabels[evidence.category]}
          </Badge>
          <span
            className={cn(
              'px-2 py-0.5 rounded-[4px] text-xs font-medium border',
              sourceTypeColors[evidence.sourceType]
            )}
          >
            {sourceTypeLabels[evidence.sourceType]}
          </span>
          <span
            className={cn(
              'px-2 py-0.5 rounded-[4px] text-xs font-medium',
              confidenceColors[evidence.confidence]
            )}
          >
            {confidenceLabels[evidence.confidence]}
          </span>
        </div>
      </div>

      {/* 2. TITLE — full horizontal width */}
      <h3 className={cn('kew-card-title', variant === 'featured' && 'text-lg sm:text-xl')}>
        {evidence.title}
      </h3>

      {/* 3. KPI / Provenance Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5 shrink-0" />
          <span className="break-words">{evidence.organization}</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          {new Date(evidence.publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })}
        </span>
      </div>

      {/* 4. DESCRIPTION */}
      <p className="kew-card-desc">{evidence.abstract}</p>

      {/* Related Entities */}
      {showRelatedEntities && evidence.relatedEntities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {evidence.relatedEntities.slice(0, 4).map((entity) => {
            const EntityIcon = entityIcons[entity.type] || MapPin;
            return (
              <a
                key={entity.id}
                href={entity.slug || '#'}
                className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-xs font-medium bg-slate-800/60 hover:bg-slate-700/60 transition-colors',
                  entityColors[entity.type]
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <EntityIcon className="w-3 h-3" />
                {entity.name}
              </a>
            );
          })}
        </div>
      )}

      {/* Module Links */}
      {showModuleLinks && evidence.usedInModules.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {evidence.usedInModules.slice(0, 3).map((module) => (
            <a
              key={module.moduleId}
              href={module.modulePath}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkIcon className="w-3 h-3" />
              {module.moduleName}
            </a>
          ))}
        </div>
      )}

      {/* 5. CTA — anchored near bottom */}
      <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-slate-400 tabular-nums">
          <span className="inline-flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            {evidence.downloadCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {evidence.citationCount} citations
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-white/20 text-white h-8"
          onClick={handleViewDetails}
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}

interface ModuleLinkBadgeProps {
  module: ModuleReference;
}

export function ModuleLinkBadge({ module }: ModuleLinkBadgeProps) {
  return (
    <a
      href={module.modulePath}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition-colors"
    >
      <ExternalLink className="w-3 h-3" />
      {module.moduleName}
    </a>
  );
}

interface RelatedEntityBadgeProps {
  entity: RelatedEntity;
}

export function RelatedEntityBadge({ entity }: RelatedEntityBadgeProps) {
  const EntityIcon = entityIcons[entity.type] || MapPin;

  return (
    <a
      href={entity.slug || '#'}
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] text-xs font-medium bg-slate-800/50 hover:bg-slate-700/50 transition-colors',
        entityColors[entity.type]
      )}
    >
      <EntityIcon className="w-3 h-3" />
      {entity.name}
    </a>
  );
}

interface SourceConfidenceBadgeProps {
  sourceType: string;
  confidence: string;
  compact?: boolean;
}

export function SourceConfidenceBadge({ sourceType, confidence, compact = false }: SourceConfidenceBadgeProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className={cn('px-1.5 py-0.5 rounded text-xs font-medium border', sourceTypeColors[sourceType])}>
          {sourceTypeLabels[sourceType as keyof typeof sourceTypeLabels]}
        </span>
        <span className={cn('px-1.5 py-0.5 rounded text-xs font-medium', confidenceColors[confidence])}>
          {confidenceLabels[confidence as keyof typeof confidenceLabels]}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn('px-2 py-1 rounded-[4px] text-xs font-medium border', sourceTypeColors[sourceType])}>
        {sourceTypeLabels[sourceType as keyof typeof sourceTypeLabels]}
      </span>
      <span className={cn('px-2 py-1 rounded-[4px] text-xs font-medium', confidenceColors[confidence])}>
        {confidenceLabels[confidence as keyof typeof confidenceLabels]}
      </span>
    </div>
  );
}
