import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { NGORecord } from '@/data/ngo-impact';
import { MapPin, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export function NGOCard({ record }: { record: NGORecord }) {
  const isVerified =
    record.verification_status.includes('verified') ||
    record.verification_status.includes('reviewed');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => (window.location.href = `/ngo-impact/${record.slug}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = `/ngo-impact/${record.slug}`;
        }
      }}
      className="kew-card-shell kew-card-shell--interactive group h-full"
    >
      {/* 1. ICON (top-left) + Verification & Est. Year (top-right) */}
      <div className="kew-card-top-row">
        <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
          <Users className="w-5 h-5" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Badge variant={isVerified ? 'success' : 'warning'} className="text-[10px] uppercase tracking-wider font-bold">
            {isVerified && <ShieldCheck className="w-3 h-3 mr-1 inline" />}
            {record.verification_status}
          </Badge>
          <span className="text-xs text-slate-400 font-semibold bg-slate-800/80 px-2 py-0.5 rounded-[4px] border border-white/10">
            Est. {record.founded_year}
          </span>
        </div>
      </div>

      {/* 2. TITLE — full horizontal width */}
      <div>
        <h3 className="kew-card-title">
          {record.name}
          {record.acronym && <span className="text-sm text-slate-400 font-medium ml-1.5">({record.acronym})</span>}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="break-words">{record.operating_districts.join(', ')}</span>
        </div>
      </div>

      {/* 3. KPI Impact Stats */}
      <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/10 text-center">
        <div>
          <span className="text-lg font-extrabold text-white tabular-nums">{record.projects?.length || 0}</span>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Projects</span>
        </div>
        <div className="border-x border-white/10">
          <span className="text-lg font-extrabold text-white tabular-nums">{record.operating_districts?.length || 0}</span>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Districts</span>
        </div>
        <div>
          <span className="text-lg font-extrabold text-emerald-400 tabular-nums">{record.verified_reports || 0}</span>
          <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Reports</span>
        </div>
      </div>

      {/* 4. DESCRIPTION */}
      <p className="kew-card-desc">{record.mission_summary}</p>

      {/* Focus Area Tags */}
      <div className="flex flex-wrap gap-1.5">
        {record.focus_areas.slice(0, 3).map((area) => (
          <span
            key={area}
            className="text-[11px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded-[4px] border border-white/10 break-words"
          >
            {area}
          </span>
        ))}
        {record.focus_areas.length > 3 && (
          <span className="text-[11px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-[4px] border border-white/10">
            +{record.focus_areas.length - 3}
          </span>
        )}
      </div>

      {/* 5. CTA — anchored near bottom */}
      <div className="kew-card-cta">
        <span>View Organization Profile</span>
        <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
