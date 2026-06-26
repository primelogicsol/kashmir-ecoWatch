'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, MapPin, Mountain, Bird, Fish, Sprout, Shield, Leaf, TreePine, Droplet, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllDistrictProfiles } from '@/data/biodiversity-district-aggregator';

export default function DistrictProfileDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const allProfiles = getAllDistrictProfiles();
  const profile = allProfiles.find(p => p.district.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!profile) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl text-white font-bold mb-4">District Profile Not Found</h1>
        <Button onClick={() => router.push('/biodiversity/district-profiles')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to District Profiles
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="relative pt-24 sm:pt-32 pb-12 overflow-hidden bg-slate-900/50">
        <div className="container mx-auto px-6 relative z-10">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push('/biodiversity/district-profiles')}
            className="mb-8 border-white/10 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
          </Button>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-widest text-xs">
                {profile.scope}
              </Badge>
              {profile.speciesSummary.total > 0 && (
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1 inline" /> Data Verified
                </Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
              {profile.district}
            </h1>
            <p className="text-xl text-slate-400 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Biodiversity & Environmental Profile
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Intelligence Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-400" /> Species Intelligence
            </h2>
            
            {profile.speciesSummary.total > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Card className="bg-slate-900/50 border border-white/10 p-5 text-center">
                  <Mountain className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white">{profile.speciesSummary.mammals}</div>
                  <div className="text-sm text-slate-500 mt-1">Mammals</div>
                </Card>
                <Card className="bg-slate-900/50 border border-white/10 p-5 text-center">
                  <Bird className="w-6 h-6 text-sky-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white">{profile.speciesSummary.birds}</div>
                  <div className="text-sm text-slate-500 mt-1">Birds</div>
                </Card>
                <Card className="bg-slate-900/50 border border-white/10 p-5 text-center">
                  <Fish className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white">{profile.speciesSummary.fish}</div>
                  <div className="text-sm text-slate-500 mt-1">Fish</div>
                </Card>
                <Card className="bg-slate-900/50 border border-white/10 p-5 text-center">
                  <Sprout className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white">{profile.speciesSummary.plants}</div>
                  <div className="text-sm text-slate-500 mt-1">Flora</div>
                </Card>
                <Card className="bg-slate-900/50 border border-orange-500/20 p-5 text-center">
                  <Shield className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white">{profile.speciesSummary.threatened}</div>
                  <div className="text-sm text-slate-500 mt-1">Threatened</div>
                </Card>
                <Card className="bg-slate-900/50 border border-emerald-500/20 p-5 text-center">
                  <Leaf className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white">{profile.speciesSummary.endemic}</div>
                  <div className="text-sm text-slate-500 mt-1">Endemic</div>
                </Card>
              </div>
            ) : (
              <Card className="bg-slate-900/30 border border-dashed border-white/20 p-12 text-center">
                <Leaf className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-300 mb-2">Data Pending</h3>
                <p className="text-slate-500">Species records for {profile.district} are currently being updated or require source verification.</p>
              </Card>
            )}

            <div className="h-px w-full bg-white/5 my-8"></div>
            
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TreePine className="w-6 h-6 text-emerald-400" /> Habitat & Environmental Intelligence
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-slate-900/50 border border-white/10 p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-emerald-400" /> Forest Cover
                </h3>
                {(profile.habitatSummary.forestCoverPercentage || profile.habitatSummary.forestCoverSqKm) ? (
                  <div className="space-y-2">
                    {profile.habitatSummary.forestCoverSqKm && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Cover Area</span>
                        <span className="text-xl font-bold text-white">{profile.habitatSummary.forestCoverSqKm.toLocaleString()} sq km</span>
                      </div>
                    )}
                    {profile.habitatSummary.forestCoverPercentage && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Canopy Percentage</span>
                        <span className="text-xl font-bold text-white">{profile.habitatSummary.forestCoverPercentage}%</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-slate-500 italic">No forest survey records available.</div>
                )}
              </Card>
              
              <Card className="bg-slate-900/50 border border-white/10 p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-400" /> Water Systems
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-slate-400">Lakes</span>
                    <span className="font-bold text-white">{profile.habitatSummary.lakesCount}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-slate-400">Wetlands</span>
                    <span className="font-bold text-white">{profile.habitatSummary.wetlandsCount}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-slate-400">Rivers</span>
                    <span className="font-bold text-white">{profile.habitatSummary.riversCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Springs</span>
                    <span className="font-bold text-white">{profile.habitatSummary.springsCount}</span>
                  </div>
                </div>
              </Card>
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-900/80 border border-violet-500/20 p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-violet-400" /> Protected Areas
              </h3>
              {profile.habitatSummary.protectedAreasCount > 0 ? (
                <div className="space-y-4">
                  <div className="text-3xl font-black text-white">{profile.habitatSummary.protectedAreasCount} <span className="text-sm font-normal text-slate-400">reserves</span></div>
                  <ul className="space-y-2">
                    {profile.habitatSummary.protectedAreaNames.map((name, idx) => (
                      <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0"></div>
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-slate-500 italic py-4">No verified protected areas or wildlife sanctuaries on record for this district.</div>
              )}
            </Card>

            <Card className="bg-slate-900/50 border border-white/10 p-6">
              <h3 className="font-bold text-white mb-4">Data Sources</h3>
              <p className="text-sm text-slate-400 mb-4">
                This intelligence is aggregated from the following active datasets:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-[10px] text-slate-300 border-white/10">Species Directory</Badge>
                <Badge variant="outline" className="text-[10px] text-slate-300 border-white/10">Forest Ecosystems Data</Badge>
                <Badge variant="outline" className="text-[10px] text-slate-300 border-white/10">Water Systems Data</Badge>
                <Badge variant="outline" className="text-[10px] text-slate-300 border-white/10">Protected Area Registry</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
      

    </main>
  );
}
