'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { RECYCLING_FACILITIES, RecyclingFacility, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  Recycle,
  Factory,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Filter
} from 'lucide-react';

export default function RecyclingPage() {
  const [regionFilter, setRegionFilter] = useState<PlasticPollutionRegion | 'ALL'>('ALL');

  const filteredFacilities = RECYCLING_FACILITIES.filter((f) => {
    if (regionFilter !== 'ALL' && f.region !== regionFilter) return false;
    return true;
  });

  const totalCapacityTPD = RECYCLING_FACILITIES.reduce((sum, f) => sum + f.operationalCapacityTPD, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 02 · PLASTIC LIFECYCLE & FLOWS · CIRCULAR ECONOMY"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Recycling' }
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-rose-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                PLASTIC INTELLIGENCE
              </span>
              <span>Western Himalayan</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Recycling Capacities & Circularity Audits
            </span>
          </>
        }
        subtitle="Registered plastic reprocessing plants, pyrolytic oil plants, asphalt-plastic road aggregate pilots, and verified circular recycling yields."
        icon={<Recycle className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Formal MRF Capacity</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
              {totalCapacityTPD.toFixed(1)} TPD
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Across audited processing units</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Basin Recycling Rate</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">11.8%</div>
            <span className="text-[10px] text-slate-400 font-mono">Of total generated plastic waste</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Plastic in Roads</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">142 km</div>
            <span className="text-[10px] text-slate-400 font-mono">Bitumen-plastic composite roads</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">EPR Registration</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">38 Units</div>
            <span className="text-[10px] text-slate-400 font-mono">Formally registered processors</span>
          </div>
        </div>

        {/* Recycling Facilities Registry */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-emerald-400" />
                Material Recovery Facilities (MRFs) &amp; Pelletizing Plants
              </h2>
              <p className="text-xs text-slate-400">
                Audited capacity, polymer types processed, and regulatory compliance status.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Region:</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">All Regions</option>
                <option value="Kashmir Valley">Kashmir Valley</option>
                <option value="Jammu">Jammu</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFacilities.map((fac) => (
              <Card key={fac.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {fac.operatorType}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{fac.name}</h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{fac.location}</span>
                      <span>·</span>
                      <span className="text-indigo-400">{fac.district}, {fac.region}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-black text-emerald-400">
                      {fac.operationalCapacityTPD} TPD
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">Baling/Shredding</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-medium">Technology:</span>
                    <span className="text-slate-200 ml-1.5">{fac.recoveryTechnology}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] font-medium">Polymers Processed:</span>
                    <div className="flex flex-wrap gap-1">
                      {fac.polymersProcessed.map((poly) => (
                        <span key={poly} className="px-1.5 py-0.2 rounded-[3px] bg-white/5 border border-white/10 text-[10px] font-mono text-indigo-300">
                          {poly}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium text-[11px]">{fac.complianceStatus}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Audited: {fac.lastAuditDate}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Circular Innovation Pilot Spotlight */}
        <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-lg space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Recycle className="w-4 h-4 text-emerald-400" />
            Spotlight: Project Tsangda (High-Altitude Decentralized Model)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pioneered in Leh, Ladakh, Project Tsangda established rural waste management centres at sub-zero elevations (Choglamsar, Diskit, Khaltsi). Segregated non-biodegradable plastics are washed, mechanically shredded, and baled before freight transport to recycling hubs in Punjab. In 2024-25, over 840 tonnes of dry plastic were diverted from the fragile high-altitude ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
