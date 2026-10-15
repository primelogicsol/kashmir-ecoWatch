import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NGORecord } from '@/data/ngo-impact';
import { 
  MapPin, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export function NGOCard({ record }: { record: NGORecord }) {
  const isVerified = record.verification_status.includes('verified') || record.verification_status.includes('reviewed');
  
  return (
    <Card 
      className="flex flex-col h-full bg-slate-900 border-slate-800 overflow-hidden group hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 cursor-pointer relative"
      onClick={() => window.location.href = `/ngo-impact/${record.slug}`}
    >
      {/* Top Decorator Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isVerified ? 'from-emerald-500 to-teal-600' : 'from-slate-600 to-slate-800'} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

      <div className="p-5 flex-grow flex flex-col">
        {/* Top row: [Verification Badge] [Est. Year] */}
        <div className="flex justify-between items-start mb-4">
          <Badge variant={isVerified ? 'success' : 'warning'} className="w-fit text-[10px] uppercase tracking-wider font-bold">
            {isVerified && <ShieldCheck className="w-3 h-3 mr-1 inline" />}
            {record.verification_status}
          </Badge>
          <span className="text-xs text-slate-500 font-semibold bg-slate-800/50 px-2 py-1 rounded-md">
            Est. {record.founded_year}
          </span>
        </div>
        
        {/* Body: NGO Name & Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-100 leading-tight mb-1.5 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {record.name}
            {record.acronym && <span className="text-sm text-slate-400 font-medium ml-2">({record.acronym})</span>}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span className="line-clamp-1">{record.operating_districts.join(', ')}</span>
          </div>
        </div>

        {/* Mission Statement (Direct text, no dark box, 3-line clamp) */}
        <div className="mb-4">
          <p className="text-sm text-slate-300 font-medium leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {record.mission_summary}
          </p>
          <span className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400 mt-1.5 inline-block uppercase tracking-wide">
            Read More &rarr;
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {record.focus_areas.slice(0, 3).map(area => (
            <span key={area} className="text-[10px] font-medium bg-slate-800 text-slate-300 px-2 py-1 rounded-md border border-slate-700/50 truncate max-w-[120px]">
              {area}
            </span>
          ))}
          {record.focus_areas.length > 3 && (
            <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-1 rounded-md border border-slate-700/50">
              +{record.focus_areas.length - 3}
            </span>
          )}
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-800/60 pt-4 pb-4 mt-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-lg font-black text-slate-200">{record.projects?.length || 0}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">Projects</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-r border-slate-800/60">
            <span className="text-lg font-black text-slate-200">{record.operating_districts?.length || 0}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">Districts</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-lg font-black text-emerald-400">{record.verified_reports || 0}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">Reports</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 py-3.5 bg-slate-950/60 border-t border-slate-800 flex justify-center items-center group-hover:bg-slate-900 transition-colors">
        <span className="text-sm font-bold text-slate-300 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
          View Profile
        </span>
      </div>
    </Card>
  );
}
