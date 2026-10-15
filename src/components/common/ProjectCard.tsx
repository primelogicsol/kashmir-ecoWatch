import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { NGOProject } from '@/data/ngo-impact';
import { Building, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProjectCard({ project, ngoName, ngoSlug }: { project: NGOProject, ngoName: string, ngoSlug?: string }) {
  const isOngoing = project.end_date === 'Ongoing';
  const isVerified = project.verification_status.includes('verified') || project.verification_status.includes('reviewed');

  return (
    <Card className="flex flex-col h-full bg-slate-900 border-slate-800 overflow-hidden group hover:border-slate-700 hover:shadow-2xl hover:shadow-sky-900/10 transition-all duration-300 relative cursor-pointer" onClick={() => window.location.href = `/ngo-impact/project/${project.slug}`}>
      {/* Top Decorator Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isOngoing ? 'from-sky-500 to-indigo-600' : 'from-slate-600 to-slate-800'} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className="text-sky-300 border-sky-800 bg-sky-950/30 text-[10px] uppercase font-semibold">
            {project.environmental_category}
          </Badge>
          <Badge variant={isVerified ? 'success' : 'secondary'} className="text-[10px] uppercase tracking-wider font-bold">
            {project.verification_status}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold text-slate-100 leading-tight mb-2 group-hover:text-sky-400 transition-colors line-clamp-2">
          {project.title}
        </h3>
        
        {ngoSlug ? (
          <div onClick={(e) => e.stopPropagation()} className="mb-4">
            <Link href={`/ngo-impact/${ngoSlug}`} className="text-sm text-slate-400 hover:text-sky-400 transition-colors inline-block font-medium">
              By {ngoName}
            </Link>
          </div>
        ) : (
          <p className="text-sm text-slate-400 mb-4 flex items-center gap-1.5 font-medium">
            <Building className="w-3.5 h-3.5 text-slate-500" /> {ngoName}
          </p>
        )}
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-1 font-semibold uppercase text-[10px] tracking-wider">Location</span>
            <span className="text-slate-300 flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-slate-500"/> <span className="line-clamp-1">{project.location_district}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-500 block mb-1 font-semibold uppercase text-[10px] tracking-wider">Status</span>
            <span className={`flex items-center gap-1 font-medium ${isOngoing ? 'text-sky-400' : 'text-slate-300'}`}>
              <Clock className="w-3 h-3 text-slate-500"/> {isOngoing ? 'Active / Ongoing' : 'Completed'}
            </span>
          </div>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 text-sm mt-auto">
          <span className="text-emerald-500 font-semibold block mb-1.5 text-[10px] uppercase tracking-wider">Impact Summary</span>
          <p className="text-slate-300 line-clamp-3 leading-relaxed">
            {project.measurable_outputs || project.ecological_outcome}
          </p>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-slate-950/40 border-t border-slate-800 flex justify-between items-center text-xs">
        <span className="text-slate-500 font-medium">
          {project.evidence_quality} Evidence
        </span>
        <span className="text-sky-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Card>
  );
}
