'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { WILDLIFE_PLASTIC_IMPACTS, WildlifeImpactRecord, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  PawPrint,
  AlertTriangle,
  Layers,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Info,
  Filter
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function WildlifeImpactsPage() {
  const [regionFilter, setRegionFilter] = useState<PlasticPollutionRegion | 'ALL'>('ALL');

  const filteredImpacts = WILDLIFE_PLASTIC_IMPACTS.filter((rec) => {
    if (regionFilter !== 'ALL' && rec.region !== regionFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 03 · ENVIRONMENTAL CONTAMINATION · FAUNAL IMPACTS"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Wildlife' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Wildlife Plastic Ingestion & Habitat Degradation
            </span>
          </>
        }
        subtitle="Documented synthetic debris ingestion in Himalayan brown bears, black bears, waterfowl entanglements in wetlands, and aquatic benthic disruption."
        icon={<PawPrint className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Documented Species</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">
              {WILDLIFE_PLASTIC_IMPACTS.length} Taxa
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Field necropsy &amp; scats</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Brown Bear Scat Plastic</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">75% Scats</div>
            <span className="text-[10px] text-slate-400 font-mono">Contains packaging &amp; wrappers</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Fish Microplastic Rate</span>
            <div className="text-xl sm:text-2xl font-black text-rose-500 mt-1">68.2%</div>
            <span className="text-[10px] text-slate-400 font-mono">Schizothorax intestinal tract</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">IUCN Threatened Taxa</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">100%</div>
            <span className="text-[10px] text-slate-400 font-mono">All documented taxa at risk</span>
          </div>
        </div>

        {/* Wildlife Case Studies */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-rose-400" />
                Documented Ecological Incident Register
              </h2>
              <p className="text-xs text-slate-400">
                Peer-reviewed autopsy records, scat analyses, and field biologist documentation.
              </p>
            </div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="ALL">All Regions</option>
              <option value="Kashmir Valley">Kashmir Valley</option>
              <option value="Ladakh">Ladakh</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredImpacts.map((rec) => (
              <Card key={rec.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        {rec.iucnStatus}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {rec.severityLevel}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{rec.speciesName}</h3>
                    <div className="text-xs text-slate-400 italic font-serif">
                      {rec.scientificName}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Observed: {rec.observationYear}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Impact Mechanism:</span>
                    <span className="text-rose-300 font-medium">{rec.impactType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Location:</span>
                    <span className="text-slate-300">{rec.location} ({rec.district}, {rec.region})</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="text-slate-500 font-medium">Scientific Documentation:</span> {rec.documentationSource}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
