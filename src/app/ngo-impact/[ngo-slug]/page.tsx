'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ngoRegistryData, NGORecord } from '@/data/ngo-impact';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Building, MapPin, Globe, Mail, ShieldCheck, FileText, Target, Activity, CheckCircle, ExternalLink, Leaf
} from 'lucide-react';
import Link from 'next/link';

export default function NGOProfilePage() {
  const params = useParams();
  const slug = params['ngo-slug'] as string;
  
  const ngo = ngoRegistryData.find(n => n.slug === slug);

  if (!ngo) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-slate-100">NGO Not Found</h1>
        <Link href="/ngo-impact/directory" className="mt-4 text-emerald-400 hover:underline">
          Return to Directory
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* HEADER SECTION */}
      <div className="bg-slate-900 border-b border-slate-800 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-xl">
              <Building className="w-12 h-12 text-slate-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={ngo.verification_status === 'Expert reviewed' || ngo.verification_status === 'Field verified' ? 'success' : 'warning'}>
                  {(ngo.verification_status === 'Expert reviewed' || ngo.verification_status === 'Field verified') && <ShieldCheck className="w-3 h-3 mr-1 inline" />}
                  {ngo.verification_status}
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Est. {ngo.founded_year}
                </Badge>
                <Badge variant="outline" className="text-sky-300 border-sky-800 bg-sky-950/30">
                  {ngo.registration_status}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-slate-100 mb-2">{ngo.name}</h1>
              <div className="flex gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {ngo.headquarters}</span>
                <span className="flex items-center gap-1"><Globe className="w-4 h-4"/> {ngo.geographic_coverage}</span>
                <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-emerald-400 hover:underline">
                  <ExternalLink className="w-4 h-4"/> Website
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-2">
               <span className="text-sm font-medium text-slate-400">Impact Score</span>
               <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-lg font-bold text-slate-100 bg-slate-800 shadow-lg shadow-emerald-900/20">
                 {ngo.impact_score.total_score}
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Overview & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" /> Mission Summary
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {ngo.mission_summary}
            </p>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" /> Focus Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {ngo.focus_areas.map(area => (
                <Badge key={area} variant="outline" className="text-slate-300 border-slate-700">
                  {area}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" /> Organization Details
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>
                <strong className="block text-slate-500 mb-1">Operating Districts</strong>
                {ngo.operating_districts.join(', ')}
              </li>
              <li>
                <strong className="block text-slate-500 mb-1">Partner Organizations</strong>
                {ngo.partner_organizations.join(', ')}
              </li>
              <li>
                <strong className="block text-slate-500 mb-1">Funding Transparency</strong>
                <Badge variant={ngo.funding_transparency === 'High' ? 'success' : 'warning'} className="text-xs">
                  {ngo.funding_transparency}
                </Badge>
              </li>
            </ul>
          </Card>
        </div>

        {/* RIGHT COLUMN: Projects & Ecological Links */}
        <div className="lg:col-span-2 space-y-6">
          <Heading
            label="Project Registry"
            title={`${ngo.projects.length} Field Projects`}
            align="left"
          />

          <div className="space-y-4">
            {ngo.projects.map(proj => (
              <Card key={proj.id} className="p-6 bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Badge variant="outline" className="mb-2 text-sky-300 border-sky-800 bg-sky-950/30">
                      {proj.environmental_category}
                    </Badge>
                    <Link href={`/ngo-impact/project/${proj.slug}`}>
                      <h4 className="text-xl font-bold text-slate-100 hover:text-emerald-400 transition-colors">
                        {proj.title}
                      </h4>
                    </Link>
                  </div>
                  <Badge variant={proj.verification_status.includes('verified') || proj.verification_status.includes('reviewed') ? 'success' : 'secondary'}>
                     {proj.verification_status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-slate-500 block mb-1">Location</span>
                    <span className="text-slate-300 font-medium flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400"/> {proj.location_district}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Status</span>
                    <span className="text-slate-300 font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400"/> {proj.start_date} — {proj.end_date}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Ecological Outcome</span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {proj.ecological_outcome}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Linked Entities:</span>
                    {proj.linked_entities.map(entity => (
                      <Badge key={entity} variant="outline" className="text-emerald-400 border-emerald-900 bg-emerald-950/30 flex items-center gap-1">
                        <Leaf className="w-3 h-3" /> {entity}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/ngo-impact/project/${proj.slug}`}>
                    <Button variant="ghost" size="sm" className="text-sky-400 hover:text-sky-300">
                      View Full Report <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
      </div>
    </main>
  );
}
