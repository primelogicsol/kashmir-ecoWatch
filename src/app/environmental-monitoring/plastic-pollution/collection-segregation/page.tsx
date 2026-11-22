'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { DISTRICT_PLASTIC_PROFILES, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  Recycle,
  CheckCircle2,
  AlertTriangle,
  Users,
  Building,
  TrendingDown,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function CollectionSegregationPage() {
  const [selectedRegion, setSelectedRegion] = useState<PlasticPollutionRegion | 'ALL'>('ALL');

  const filteredDistricts = DISTRICT_PLASTIC_PROFILES.filter((d) => {
    if (selectedRegion !== 'ALL' && d.region !== selectedRegion) return false;
    return true;
  });

  const avgCollectionRate =
    filteredDistricts
      .filter((d) => d.evidenceClass !== 'UNAVAILABLE')
      .reduce((sum, d) => sum + d.collectionEfficiencyPct, 0) /
    (filteredDistricts.filter((d) => d.evidenceClass !== 'UNAVAILABLE').length || 1);

  const avgSegregationRate =
    filteredDistricts
      .filter((d) => d.evidenceClass !== 'UNAVAILABLE')
      .reduce((sum, d) => sum + d.segregationAtSourcePct, 0) /
    (filteredDistricts.filter((d) => d.evidenceClass !== 'UNAVAILABLE').length || 1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 02 · PLASTIC LIFECYCLE & FLOWS · COLLECTION EFFICIENCY"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Collection,' }
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
              Collection, Segregation & Processing Systems
            </span>
          </>
        }
        subtitle="Municipal door-to-door coverage, source segregation rates, informal scrap recovery networks, and material recovery facilities across 42 Himalayan districts."
        icon={<Recycle className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Mean Collection Rate</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">
              {avgCollectionRate.toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Municipal door-to-door capture</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Source Segregation</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              {avgSegregationRate.toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Acute behavioral compliance gap</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Informal Scrappers</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">~4,800</div>
            <span className="text-[10px] text-slate-400 font-mono">Active waste pickers &amp; dealers</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Rural Deficit Ratio</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">73.5%</div>
            <span className="text-[10px] text-slate-400 font-mono">Villages without formal collection</span>
          </div>
        </div>

        {/* Systemic Architecture Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-400" />
              Formal Municipal Collection Hierarchy
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Municipal corporations (SMC, JMC) and municipal committees operate compactors and tippers. However, mixed collection dominates: over 82% of collected waste is co-mingled in vehicles, severely degrading recyclable polymer value through organic contamination.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-950/60 rounded-[4px] border border-white/5">
                <span className="text-slate-400">Urban Core Municipalities:</span>
                <span className="font-mono font-bold text-indigo-300">70 - 85% capture</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950/60 rounded-[4px] border border-white/5">
                <span className="text-slate-400">Peri-Urban Towns:</span>
                <span className="font-mono font-bold text-amber-300">35 - 55% capture</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950/60 rounded-[4px] border border-white/5">
                <span className="text-slate-400">Rural Panchayats / Tehsils:</span>
                <span className="font-mono font-bold text-rose-400">&lt; 15% formal capture</span>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Informal Waste Pickers &amp; Scrapper Network
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Informal scrap dealers (Kabadiwalas) perform virtually all effective secondary polymer sorting. They extract high-value rigid plastics (PET, HDPE, PP), while low-value flexible multi-layered packaging (MLP) and thin films are rejected and abandoned.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-950/60 rounded-[4px] border border-white/5">
                <span className="text-slate-400">High-Value Rigids (PET/HDPE):</span>
                <span className="font-mono font-bold text-emerald-400">~62% informal capture</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950/60 rounded-[4px] border border-white/5">
                <span className="text-slate-400">Low-Value Sachets (MLP):</span>
                <span className="font-mono font-bold text-rose-400">&lt; 3% informal capture</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950/60 rounded-[4px] border border-white/5">
                <span className="text-slate-400">Primary Transit Destination:</span>
                <span className="font-mono font-bold text-slate-300">Jammu / Punjab Baling Hubs</span>
              </div>
            </div>
          </Card>
        </div>

        {/* District Breakdown Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Recycle className="w-4 h-4 text-indigo-400" />
                District Collection &amp; Segregation Efficiency
              </h2>
              <p className="text-xs text-slate-400">
                Doorstep collection efficiency vs source segregation rate across districts.
              </p>
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All 5 Regions</option>
              <option value="Kashmir Valley">Kashmir Valley</option>
              <option value="Jammu">Jammu</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDistricts.map((d) => (
              <Card key={d.district} className="bg-slate-900/80 border-white/10 p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm">{d.district}</span>
                    <span className="text-[10px] font-mono text-slate-400">{d.region}</span>
                  </div>
                  <div className="space-y-2 mt-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Collection Coverage:</span>
                        <span className="font-mono font-bold text-indigo-300">
                          {d.evidenceClass === 'UNAVAILABLE' ? 'N/A' : `${d.collectionEfficiencyPct}%`}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${d.evidenceClass === 'UNAVAILABLE' ? 0 : d.collectionEfficiencyPct}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Source Segregation:</span>
                        <span className="font-mono font-bold text-amber-300">
                          {d.evidenceClass === 'UNAVAILABLE' ? 'N/A' : `${d.segregationAtSourcePct}%`}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${d.evidenceClass === 'UNAVAILABLE' ? 0 : d.segregationAtSourcePct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Dumping Node:</span>
                  <span className="truncate max-w-[160px] text-slate-300 font-mono text-[10px]">
                    {d.primaryDumpingSite}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
