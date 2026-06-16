'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  MapPin, Activity, Shield, ExternalLink, 
  Heart, Share2, Eye, ArrowRight
} from 'lucide-react';
import type { BiodiversitySpecies } from '@/data/biodiversity';

interface BiodiversityCardProps {
  species: BiodiversitySpecies;
  onQuickView?: (species: BiodiversitySpecies) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function BiodiversityCard({ species, onQuickView, variant = 'default' }: BiodiversityCardProps) {
  const getConservationStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      CR: 'bg-red-500',
      EN: 'bg-red-400',
      VU: 'bg-amber-500',
      NT: 'bg-yellow-500',
      LC: 'bg-emerald-500',
    };
    return colors[status] || 'bg-slate-500';
  };

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
      <Card className="group border border-white/5 bg-slate-900/50 card-intelligence" padding="sm">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-slate-800/50 flex items-center justify-center flex-shrink-0">
            <Activity className="w-8 h-8 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${getConservationStatusColor(species.conservationStatus)}`} />
              <h3 className="font-semibold text-white truncate">{species.commonName}</h3>
            </div>
            <p className="text-xs text-slate-500 italic truncate">{species.scientificName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onQuickView?.(species)}
            className="text-slate-400 hover:text-forest-400"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group border border-white/5 bg-slate-900/50 card-intelligence h-full flex flex-col" padding="none">
      <div className="p-5 sm:p-6 flex flex-col h-full gap-y-3">
        {/* 1. Top badge row & 2. Action icons row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2 items-center min-w-0">
            <Badge
              variant={species.commonName === 'Pending Validation' ? 'warning' : getConservationStatusBadge(species.conservationStatus)}
              size="sm"
              className="text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap"
            >
              {species.commonName === 'Pending Validation' ? 'PENDING' : species.conservationStatus}
            </Badge>
            {(species.sensitivity === 'critical' || species.sensitivity === 'high') && (
              <Badge
                variant="default"
                size="sm"
                className="text-xs px-2 py-0.5 rounded whitespace-nowrap bg-red-500/20 text-red-400 border border-red-500/30"
              >
                <Shield className="w-3 h-3 mr-1" />
                Sensitive
              </Badge>
            )}
            <span className="text-xs capitalize text-slate-400">{species.taxonomicGroup.replace('-', ' ')}</span>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <Heart className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 3. Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 leading-tight min-h-[2.5rem]">
          {species.commonName}
        </h3>

        {/* 4. Scientific name / subtitle */}
        <p className="text-xs italic text-slate-400 truncate">
          {species.scientificName}
        </p>

        {/* 5. Metrics row */}
        <div className="flex items-center gap-4 text-xs text-slate-400 whitespace-nowrap overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0">
            <MapPin className="w-3.5 h-3.5" />
            <span>{species.districts.length} dist.</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Activity className="w-3.5 h-3.5" />
            <span>{species.habitats.length} hab.</span>
          </div>
          {species.verifiedSightings !== undefined && (
            <div className="flex items-center gap-1.5 shrink-0">
              <Eye className="w-3.5 h-3.5" />
              <span>{species.verifiedSightings} sight.</span>
            </div>
          )}
        </div>

        {/* 6. Description */}
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed min-h-[2.75rem]">
          {species.description}
        </p>

        {/* 7. Elevation / secondary info */}
        <div className="text-xs flex items-center gap-1 text-slate-500 truncate">
          <span>Elevation: {species.elevationRange.min}m - {species.elevationRange.max}m</span>
        </div>

        {/* 8. Tag / threat / category chip zone (Fixed height) */}
        <div className="h-[52px] flex flex-wrap gap-1.5 overflow-hidden content-start">
          {species.threats && species.threats.length > 0 ? (
            <>
              {species.threats.slice(0, 3).map((threat, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-300 max-w-[120px] truncate"
                  title={threat}
                >
                  {threat}
                </span>
              ))}
              {species.threats.length > 3 && (
                <span className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-400 shrink-0">
                  +{species.threats.length - 3}
                </span>
              )}
            </>
          ) : (
            <span className="text-[11px] text-slate-600 italic mt-1">No active threats recorded</span>
          )}
        </div>

        {/* 9. CTA button (Pushed to bottom) */}
        {species.commonName === 'Pending Validation' ? (
          <Button
            variant="outline"
            className="w-full py-2 text-sm rounded-lg mt-auto border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800"
          >
            Awaiting Data
          </Button>
        ) : (
          <Button
            onClick={() => window.location.href = `/biodiversity/species/${species.slug}`}
            className="w-full py-2 text-sm rounded-lg mt-auto bg-gradient-to-r from-forest-600 to-forest-500 border-0"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Details
          </Button>
        )}
      </div>
    </Card>
  );
}
