'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { TOURISM_WASTE_BURDEN_SITES, TourismWasteBurdenSite, PlasticPollutionRegion } from '@/data/plastic-pollution';
import {
  Mountain,
  Compass,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function TourismMountainWastePage() {
  const [regionFilter, setRegionFilter] = useState<PlasticPollutionRegion | 'ALL'>('ALL');

  const filteredSites = TOURISM_WASTE_BURDEN_SITES.filter((s) => {
    if (regionFilter !== 'ALL' && s.region !== regionFilter) return false;
    return true;
  });

  const totalBottlesDaily = TOURISM_WASTE_BURDEN_SITES.reduce((sum, s) => sum + s.singleUseWaterBottlesDailyEst, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 03 · ENVIRONMENTAL CONTAMINATION · MOUNTAIN & TOURIST ZONES"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'High-Altitude' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              High-Altitude Tourism & Alpine Waste Accumulation
            </span>
          </>
        }
        subtitle="Single-use bottle discard along alpine trekking routes (Great Lakes, Tarsar-Marsar, Amarnath, Baltoro), campsite plastic flows, and eco-tax audit results."
        icon={<Mountain className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Audited Enclaves</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">
              {TOURISM_WASTE_BURDEN_SITES.length} Sites
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Alpine &amp; glacier valleys</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">PET Bottles Peak Surge</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">
              {(totalBottlesDaily / 1000).toFixed(0)}k / Day
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Single-use water bottles</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Mean Waste Surge</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">+365%</div>
            <span className="text-[10px] text-slate-400 font-mono">Peak vs baseline winter</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Recovery Deficit</span>
            <div className="text-xl sm:text-2xl font-black text-rose-500 mt-1">54.2%</div>
            <span className="text-[10px] text-slate-400 font-mono">Uncollected on alpine trails</span>
          </div>
        </div>

        {/* Tourism Sites Grid */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mountain className="w-5 h-5 text-indigo-400" />
                Fragile Alpine Destination Profiles
              </h2>
              <p className="text-xs text-slate-400">
                Visitor density, daily PET bottle surge, and on-site mitigation infrastructure.
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
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSites.map((site) => (
              <Card key={site.siteName} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {site.fragileLandscapeType}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{site.siteName}</h3>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{site.district}, {site.region}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono font-black text-rose-400">
                      +{site.plasticWasteSurgePct}%
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">Waste Surge</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Peak Daily Visitors:</span>
                    <span className="font-mono font-bold text-slate-200">{site.peakSeasonVisitorDaily.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">PET Bottles / Day:</span>
                    <span className="font-mono font-bold text-rose-300">~{site.singleUseWaterBottlesDailyEst.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Baseline Waste:</span>
                    <span className="font-mono text-slate-300">{site.baselineWasteTPD.toFixed(1)} TPD</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Peak Waste:</span>
                    <span className="font-mono font-bold text-amber-300">{site.peakSeasonWasteTPD.toFixed(1)} TPD</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="text-slate-500 font-medium">Mitigation Infrastructure:</span> {site.mitigationInfrastructure}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
