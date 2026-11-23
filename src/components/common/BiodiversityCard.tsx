'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  MapPin, Activity, Shield, ExternalLink,
  Heart, Share2, Eye, ArrowRight, Leaf
} from 'lucide-react';
import type { BiodiversitySpecies } from '@/data/biodiversity';

interface BiodiversityCardProps {
  species: BiodiversitySpecies;
  onQuickView?: (species: BiodiversitySpecies) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function BiodiversityCard({ species, onQuickView, variant = 'default' }: BiodiversityCardProps) {
  const getConservationStatusBadge = (status: string) => {
    const variants: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
      CR: 'danger',
      EN: 'danger',
      VU: 'warning',
      NT: 'info',
      LC: 'success',
    };
    return variants[status] || 'info';
  };

  if (variant === 'compact') {
    return (
      <div className="kew-card-shell group p-4 gap-2.5 h-full">
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-purple-500/15 border-purple-500/30 text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
          <Badge variant={getConservationStatusBadge(species.conservationStatus)} size="sm" className="text-xs font-bold">
            {species.conservationStatus}
          </Badge>
        </div>
        <div>
          <h3 className="kew-card-title text-sm sm:text-base">{species.commonName}</h3>
          <p className="text-xs text-slate-400 italic break-words mt-0.5">{species.scientificName}</p>
        </div>
        <div className="mt-auto pt-2 border-t border-white/10 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onQuickView?.(species)}
            className="text-xs text-emerald-400 hover:text-emerald-300 px-2"
          >
            Quick View
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="kew-card-shell group h-full">
      {/* 1. ICON (top-left) + Status badges & quick actions (top-right) */}
      <div className="kew-card-top-row">
        <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
          <Leaf className="w-5 h-5" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Badge
            variant={
              species.commonName === 'Pending Validation'
                ? 'warning'
                : getConservationStatusBadge(species.conservationStatus)
            }
            size="sm"
            className="text-xs font-bold px-2 py-0.5 rounded"
          >
            {species.commonName === 'Pending Validation' ? 'PENDING' : species.conservationStatus}
          </Badge>
          {(species.sensitivity === 'critical' || species.sensitivity === 'high') && (
            <Badge
              variant="default"
              size="sm"
              className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30"
            >
              <Shield className="w-3 h-3 mr-1" />
              Sensitive
            </Badge>
          )}
          {species.endemismStatus &&
            (species.endemismStatus === 'kashmir-endemic' ||
              species.endemismStatus === 'northwest-himalayan') && (
              <Badge
                variant="default"
                size="sm"
                className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium"
              >
                <MapPin className="w-3 h-3 mr-1" />
                {species.endemismStatus === 'kashmir-endemic' ? 'Endemic' : 'NW Himalayan'}
              </Badge>
            )}
          <button
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={`Favorite ${species.commonName}`}
            type="button"
          >
            <Heart className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={`Share ${species.commonName}`}
            type="button"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2. TITLE — full horizontal width */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400">
          <span>{species.taxonomicGroup.replace('-', ' ')}</span>
          {species.localName && (
            <span className="text-[10px] font-sans normal-case px-2 py-0.5 rounded-[4px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium">
              {species.localName}
            </span>
          )}
        </div>
        <h3 className="kew-card-title">{species.commonName}</h3>
        <p className="text-xs italic text-slate-400 break-words">{species.scientificName}</p>
      </div>

      {/* 3. KPI Metrics row */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 py-2 border-y border-white/10 tabular-nums">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>{species.districts.length} districts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span>{species.habitats.length} habitats</span>
        </div>
        {species.verifiedSightings !== undefined && (
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>{species.verifiedSightings} sightings</span>
          </div>
        )}
      </div>

      {/* 4. DESCRIPTION */}
      <p className="kew-card-desc">{species.description}</p>

      {/* Elevation & Threats */}
      <div className="text-xs text-slate-400 break-words">
        Elevation: {species.elevationRange.min}m – {species.elevationRange.max}m
      </div>

      <div className="flex flex-wrap gap-1.5 content-start">
        {species.threats && species.threats.length > 0 ? (
          <>
            {species.threats.slice(0, 3).map((threat, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-[4px] bg-slate-800 border border-white/10 text-slate-300 break-words"
              >
                {threat}
              </span>
            ))}
            {species.threats.length > 3 && (
              <span className="text-[11px] px-2 py-0.5 rounded-[4px] bg-slate-800 border border-white/10 text-slate-400">
                +{species.threats.length - 3}
              </span>
            )}
          </>
        ) : (
          <span className="text-[11px] text-slate-500 italic">No active threats recorded</span>
        )}
      </div>

      {/* 5. CTA — anchored near bottom */}
      <div className="mt-auto pt-2">
        {species.commonName === 'Pending Validation' ? (
          <Button
            variant="outline"
            className="w-full py-2 text-sm rounded-lg border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800"
          >
            Awaiting Data
          </Button>
        ) : (
          <Button
            onClick={() => (window.location.href = `/biodiversity/species/${species.slug}`)}
            className="w-full py-2 text-sm rounded-lg bg-gradient-to-r from-forest-600 to-forest-500 border-0"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Details
          </Button>
        )}
      </div>
    </div>
  );
}
