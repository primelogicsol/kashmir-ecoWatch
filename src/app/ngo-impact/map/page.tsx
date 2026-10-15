'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPreviewSection } from '@/components/sections/MapPreviewSection';
import { 
  MapPin, Navigation, Building, Target
} from 'lucide-react';

export default function NGOImpactMapPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Civil Society Network · Geospatial Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'NGO Impact', href: '/ngo-impact' },
          { label: 'Impact Map' }
        ]}
        icon={<MapPin className="w-6 h-6 text-emerald-400" />}
        title={<>
          <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
            <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
            <span>Western Himalayan</span>
          </span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Geospatial Impact Map</span>
        </>}
        subtitle="Visualize the geographic footprint and operational catchments of verified civil society interventions across Kashmir."
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-500 font-bold text-white"
              icon={<Building className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/directory')}
            >
              NGO Directory
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Target className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/projects')}
            >
              View Projects
            </Button>
          </div>
        }
        images={[
          '/images/ngo-module/community.jpg',
          '/images/ngo-module/field_work.jpg',
          '/images/ngo-module/lake_clean.jpg',
          '/images/protected-network.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col gap-6">
        
        <Card className="flex flex-col h-[70vh] bg-slate-900 border-slate-800 overflow-hidden relative">
          {/* This would be a real map in production, re-using MapPreviewSection as a placeholder layout */}
          <div className="absolute inset-0 z-0">
             <MapPreviewSection />
          </div>
          
          <div className="absolute top-4 left-4 z-10 w-80 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-500" /> Layers
            </h3>
            <div className="space-y-3 mt-4 text-sm font-medium">
              <label className="flex items-center gap-3 text-slate-300">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500" />
                Verified NGOs
              </label>
              <label className="flex items-center gap-3 text-slate-300">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500" />
                Active Field Projects
              </label>
              <label className="flex items-center gap-3 text-slate-300">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500" />
                Ecological Outcomes
              </label>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-800/50">
               <p className="text-xs text-slate-400 leading-relaxed">
                 Map layer displays data from the Universal Spatial Entity Model. Click on a marker to view linked NGO projects.
               </p>
            </div>
          </div>
        </Card>

      </div>
    </main>
  );
}
