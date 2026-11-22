'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { HwcSubNav } from '@/components/hwc/HwcSubNav';
import {
  Home,
  Shield,
  MapPin,
  AlertTriangle,
  TrendingDown,
  Layers,
  CheckCircle2,
  Users
} from 'lucide-react';
import { COMMUNITY_EXPOSURE_ZONES } from '@/data/human-wildlife-conflict';

export default function HwcCommunityExposurePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="KEW PROTECTED AREAS / ECOLOGICAL INTELLIGENCE"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Protected Areas', href: '/protected-network' },
          { label: 'Human–Wildlife Conflict', href: '/protected-network/human-wildlife-conflict' },
          { label: 'Community Exposure' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                LANDSCAPE EXPOSURE
              </span>
              <span>Settlement–Wildlife Interface</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
              Community Exposure & Vulnerability Assessments
            </span>
          </>
        }
        subtitle="Evaluating settlement expansion, agricultural land conversion, livestock grazing corridors, and habitat fragmentation along forest-community boundaries."
        icon={<Home className="w-6 h-6 text-emerald-400" />}
      />

      <HwcSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Core Methodology Note */}
        <div className="bg-slate-900 border border-white/10 p-4 rounded-lg text-xs text-slate-300 flex items-start gap-3">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Scientific Distinction: Observed Exposure vs Modeled Vulnerability:</strong> In accordance with the IUCN SSC Guidelines, community exposure measures physical proximity to reserve forest margins, land-use shifts, and historical incident clusters. KEW strictly refrains from publishing unvalidated individual household attack scores or sensational danger levels that could trigger public panic or retaliatory persecution of wildlife.
          </div>
        </div>

        {/* Zones Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Monitored Interface Zones Across 5 Regions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMUNITY_EXPOSURE_ZONES.map((zone) => (
              <Card key={zone.id} className="glass-intense border-white/10 p-5 rounded-lg flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {zone.region} · {zone.district}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border ${
                        zone.exposureLevel === 'High Exposure'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : zone.exposureLevel === 'Moderate Exposure'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}
                    >
                      {zone.exposureLevel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{zone.zoneName}</h3>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5">{zone.interfaceType}</div>

                  <div className="mt-3 space-y-2 text-xs text-slate-300">
                    <div>
                      <strong className="text-slate-400 block text-[10px] uppercase">Focal Wildlife:</strong>
                      <span className="text-slate-200">{zone.primarySpecies.join(', ')}</span>
                    </div>

                    <div>
                      <strong className="text-slate-400 block text-[10px] uppercase">Livelihoods at Interface:</strong>
                      <span className="text-slate-300">{zone.primaryLivelihoods.join(' · ')}</span>
                    </div>

                    <div>
                      <strong className="text-slate-400 block text-[10px] uppercase">Key Landscape Drivers:</strong>
                      <ul className="list-disc list-inside text-slate-400 text-[11px] mt-0.5 space-y-0.5">
                        {zone.keyLandscapeDrivers.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-emerald-400 block text-[10px] uppercase font-mono mb-1">
                      Deployed Coexistence Measures:
                    </strong>
                    <div className="flex flex-wrap gap-1">
                      {zone.activeMitigationMeasures.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-300 text-[10px]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono text-right">
                    {zone.dataConfidenceRating}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
