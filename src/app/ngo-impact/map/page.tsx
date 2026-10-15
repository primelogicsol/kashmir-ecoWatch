'use client';

import React from 'react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { MapPreviewSection } from '@/components/sections/MapPreviewSection';
import { 
  MapPin, Navigation
} from 'lucide-react';

export default function NGOImpactMapPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Geospatial Intelligence"
        title={
          <span className="flex items-center gap-4">
            <MapPin className="w-8 h-8 text-sky-500" />
            Impact Map
          </span>
        }
        subtitle="Visualize the geographic footprint of verified civil society interventions across Kashmir."
        align="left"
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
