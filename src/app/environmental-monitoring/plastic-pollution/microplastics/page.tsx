'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { MICROPLASTIC_SAMPLES, MicroplasticSample, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  Microscope,
  Search,
  Filter,
  Layers,
  FlaskConical,
  Waves,
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function MicroplasticsPage() {
  const [matrixFilter, setMatrixFilter] = useState<string>('ALL');
  const [regionFilter, setRegionFilter] = useState<PlasticPollutionRegion | 'ALL'>('ALL');

  const filteredSamples = MICROPLASTIC_SAMPLES.filter((s) => {
    if (matrixFilter !== 'ALL' && s.sampleMatrix !== matrixFilter) return false;
    if (regionFilter !== 'ALL' && s.region !== regionFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 03 · ENVIRONMENTAL CONTAMINATION · MICROPLASTICS"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Microplastics' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Microplastics & Nanoplastics Lab Observatory
            </span>
          </>
        }
        subtitle="Empirical FTIR-confirmed microplastic counts in surface waters, sediment cores, alpine snowpacks, and high-altitude glacier snout matrices."
        icon={<Microscope className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Scientific Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Audited Samples</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">
              {MICROPLASTIC_SAMPLES.length} Stations
            </div>
            <span className="text-[10px] text-slate-400 font-mono">FTIR &amp; Raman confirmed</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Dominant Morphology</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">Fibers (64%)</div>
            <span className="text-[10px] text-slate-400 font-mono">Synthetic textile shedding</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Dominant Polymer</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">PET (#1)</div>
            <span className="text-[10px] text-slate-400 font-mono">Polyethylene Terephthalate</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Glacial Deposition</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">Confirmed</div>
            <span className="text-[10px] text-slate-400 font-mono">Karakoram snow cores</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-white">Filter Laboratory Registry:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="ALL">All Regions</option>
              <option value="Kashmir Valley">Kashmir Valley</option>
              <option value="Jammu">Jammu</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            </select>

            <select
              value={matrixFilter}
              onChange={(e) => setMatrixFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="ALL">All Sample Matrices</option>
              <option value="Surface Water">Surface Water</option>
              <option value="Sediment">Sediment</option>
              <option value="Biota / Fish">Biota / Fish</option>
              <option value="Atmospheric Deposition">Atmospheric Deposition</option>
            </select>
          </div>
        </div>

        {/* Microplastic Lab Sample Cards */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSamples.map((sample) => (
              <Card key={sample.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                        {sample.sampleMatrix}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {sample.analyticalMethod}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{sample.locationName}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      <span>{sample.waterBodyOrEnvironment}</span> · <span className="text-rose-400 font-medium">{sample.district}, {sample.region}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono font-black text-rose-400">
                      {sample.concentration}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">Audited Value</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Dominant Polymer:</span>
                    <span className="font-mono font-bold text-indigo-300">{sample.dominantPolymer}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Morphology:</span>
                    <span className="font-mono font-bold text-amber-300">{sample.dominantMorphology}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Sampling Date:</span>
                    <span className="font-mono text-slate-300">{sample.samplingDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Coordinates:</span>
                    <span className="font-mono text-slate-300">{sample.coordinates[0].toFixed(2)}°N, {sample.coordinates[1].toFixed(2)}°E</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[280px] text-[11px] italic">
                    Source: {sample.peerReviewedSource}
                  </span>
                  {sample.doi && (
                    <a
                      href={`https://doi.org/${sample.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-400 hover:text-rose-300 font-mono text-[11px] flex items-center gap-1 shrink-0 ml-2"
                    >
                      <span>DOI</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
