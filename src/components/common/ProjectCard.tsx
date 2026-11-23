import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { NGOProject } from '@/data/ngo-impact';
import { Building, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProjectCard({
  project,
  ngoName,
  ngoSlug,
}: {
  project: NGOProject;
  ngoName: string;
  ngoSlug?: string;
}) {
  const isOngoing = project.end_date === 'Ongoing';
  const isVerified =
    project.verification_status.includes('verified') ||
    project.verification_status.includes('reviewed');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => (window.location.href = `/ngo-impact/project/${project.slug}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = `/ngo-impact/project/${project.slug}`;
        }
      }}
      className="kew-card-shell kew-card-shell--interactive group h-full"
    >
      {/* 1. ICON (top-left) + Category & Verification badges (top-right) */}
      <div className="kew-card-top-row">
        <div className="kew-card-icon-box bg-sky-500/15 border-sky-500/30 text-sky-400">
          <Building className="w-5 h-5" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Badge variant="outline" className="text-sky-300 border-sky-800 bg-sky-950/30 text-[10px] uppercase font-semibold">
            {project.environmental_category}
          </Badge>
          <Badge variant={isVerified ? 'success' : 'secondary'} className="text-[10px] uppercase tracking-wider font-bold">
            {project.verification_status}
          </Badge>
        </div>
      </div>

      {/* 2. TITLE — full horizontal width */}
      <div>
        <h3 className="kew-card-title">{project.title}</h3>
        {ngoSlug ? (
          <div onClick={(e) => e.stopPropagation()} className="mt-1">
            <Link
              href={`/ngo-impact/${ngoSlug}`}
              className="text-xs sm:text-sm text-slate-400 hover:text-sky-400 transition-colors inline-block font-medium break-words"
            >
              By {ngoName}
            </Link>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium break-words">
            By {ngoName}
          </p>
        )}
      </div>

      {/* 3. KPI / Location & Status */}
      <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-white/10 text-xs">
        <div className="min-w-0">
          <span className="text-slate-500 block mb-0.5 font-semibold uppercase text-[10px] tracking-wider">
            Location
          </span>
          <span className="text-slate-200 flex items-center gap-1 font-medium">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="break-words">{project.location_district}</span>
          </span>
        </div>
        <div className="min-w-0">
          <span className="text-slate-500 block mb-0.5 font-semibold uppercase text-[10px] tracking-wider">
            Status
          </span>
          <span className={`flex items-center gap-1 font-medium ${isOngoing ? 'text-sky-400' : 'text-slate-300'}`}>
            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
            <span>{isOngoing ? 'Active / Ongoing' : 'Completed'}</span>
          </span>
        </div>
      </div>

      {/* 4. DESCRIPTION */}
      <div>
        <span className="text-emerald-400 font-semibold block mb-1 text-[10px] uppercase tracking-wider">
          Impact Summary
        </span>
        <p className="kew-card-desc">{project.measurable_outputs || project.ecological_outcome}</p>
      </div>

      {/* 5. CTA — anchored near bottom */}
      <div className="kew-card-cta">
        <span className="text-xs text-slate-400 font-normal">{project.evidence_quality} Evidence</span>
        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
          View Details
          <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
