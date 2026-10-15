'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ngoRegistryData } from '@/data/ngo-impact';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Building, MapPin, CheckCircle, ShieldCheck, Leaf, ArrowLeft, Users, FileBarChart, Target
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectProfilePage() {
  const params = useParams();
  const slug = params['project-slug'] as string;
  
  // Find the NGO and Project
  let foundProject = null;
  let foundNgo = null;

  for (const ngo of ngoRegistryData) {
    const proj = ngo.projects.find(p => p.slug === slug);
    if (proj) {
      foundProject = proj;
      foundNgo = ngo;
      break;
    }
  }

  if (!foundProject || !foundNgo) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-slate-100">Project Not Found</h1>
        <Link href="/ngo-impact/directory" className="mt-4 text-emerald-400 hover:underline">
          Return to Directory
        </Link>
      </main>
    );
  }

  const proj = foundProject;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-12">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 border-b border-slate-800 pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href={`/ngo-impact/${foundNgo.slug}`} className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {foundNgo.name}
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline" className="text-sky-300 border-sky-800 bg-sky-950/30">
              {proj.environmental_category}
            </Badge>
            <Badge variant={proj.verification_status.includes('verified') || proj.verification_status.includes('reviewed') ? 'success' : 'secondary'}>
              {(proj.verification_status.includes('verified') || proj.verification_status.includes('reviewed')) && <ShieldCheck className="w-3 h-3 mr-1 inline" />}
              {proj.verification_status}
            </Badge>
            <Badge variant="outline" className="text-slate-300 border-slate-700 bg-slate-800">
              Evidence: {proj.evidence_quality}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
            {proj.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-500"/> {proj.location_district}</span>
            <span className="flex items-center gap-1.5"><Target className="w-4 h-4 text-emerald-500"/> {proj.start_date} to {proj.end_date}</span>
            <span className="flex items-center gap-1.5"><Building className="w-4 h-4 text-emerald-500"/> Implemented by: <strong className="text-slate-200">{foundNgo.name}</strong></span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Linked Ecological Entities */}
        <div className="flex items-center gap-3 p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-xl">
          <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Ecological Context:</span>
          <div className="flex flex-wrap gap-2">
            {proj.linked_entities.map(entity => (
              <Badge key={entity} variant="outline" className="text-emerald-300 border-emerald-800 bg-emerald-950 flex items-center gap-1">
                <Leaf className="w-3 h-3" /> {entity}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Context & Outputs */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <Target className="w-5 h-5 text-emerald-500" /> The Challenge
              </h3>
              <p className="text-slate-300 leading-relaxed text-base">
                {proj.problem_addressed}
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <FileBarChart className="w-5 h-5 text-emerald-500" /> Measurable Outputs
              </h3>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                <p className="text-emerald-300 font-medium text-lg leading-relaxed">
                  {proj.measurable_outputs}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Activities Completed
              </h3>
              <ul className="space-y-3">
                {proj.activities_completed.map((act, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800/50">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT: Outcomes */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <Leaf className="w-5 h-5 text-emerald-500" /> Ecological Outcome
              </h3>
              <Card className="p-5 bg-gradient-to-br from-slate-900 to-emerald-950/20 border-emerald-900/30">
                <p className="text-slate-300 leading-relaxed">
                  {proj.ecological_outcome}
                </p>
              </Card>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                <Users className="w-5 h-5 text-sky-500" /> Community Outcome
              </h3>
              <Card className="p-5 bg-gradient-to-br from-slate-900 to-sky-950/20 border-sky-900/30">
                <p className="text-slate-300 leading-relaxed">
                  {proj.community_outcome}
                </p>
              </Card>
            </section>

            <section className="mt-8 pt-8 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                Verification Details
              </h3>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm text-slate-400 space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Current Status:</span>
                  <span className="text-slate-200 font-medium">{proj.verification_status}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 py-2">
                  <span>Evidence Quality:</span>
                  <span className="text-slate-200 font-medium">{proj.evidence_quality}</span>
                </div>
                <div className="pt-2">
                  <p className="italic text-slate-500">
                    This project's outputs and outcomes have been assessed against the Kashmir EcoWatch Civil Society Verification Framework.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
