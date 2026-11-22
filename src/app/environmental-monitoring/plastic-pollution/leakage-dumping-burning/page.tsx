'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { SATELLITE_PLASTIC_HOTSPOTS, DISTRICT_PLASTIC_PROFILES, SatelliteWasteHotspot } from '@/data/plastic-pollution';
import {
  Flame,
  AlertTriangle,
  Compass,
  MapPin,
  Satellite,
  Wind,
  ShieldAlert,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function LeakageDumpingBurningPage() {
  const [riskFilter, setRiskFilter] = useState<string>('ALL');

  const filteredHotspots = riskFilter === 'ALL'
    ? SATELLITE_PLASTIC_HOTSPOTS
    : SATELLITE_PLASTIC_HOTSPOTS.filter(h => h.riskScore === riskFilter);

  const totalUnmanagedTPD = DISTRICT_PLASTIC_PROFILES.reduce((sum, d) => sum + d.unmanagedDisposalTPD, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 03 · ENVIRONMENTAL CONTAMINATION · LEAKAGE & BURNING"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Unmanaged' }
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
              Unmanaged Leakage, Open Dumping & Burn Hotspots
            </span>
          </>
        }
        subtitle="Quantifying plastic burning emissions (furans, dioxins), riparian garbage slide corridors, and uncontained open dumpsites in sensitive mountain catchments."
        icon={<Flame className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Basin Unmanaged Leakage</span>
            <div className="text-xl sm:text-2xl font-black text-rose-500 mt-1">
              {totalUnmanagedTPD.toFixed(1)} TPD
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Leaking into soils &amp; waterways</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Satellite Hotspots</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
              {SATELLITE_PLASTIC_HOTSPOTS.length} Sites
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Sentinel-2 &amp; WorldView-3</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Riparian Dumps</span>
            <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">76% of Sites</div>
            <span className="text-[10px] text-slate-400 font-mono">Located &lt; 200m from rivers/lakes</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Open Burning Dioxin Risk</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">CRITICAL</div>
            <span className="text-[10px] text-slate-400 font-mono">Chlorinated polymer pyrolysis</span>
          </div>
        </div>

        {/* Toxic Emissions Warning */}
        <div className="bg-slate-900 border border-rose-500/30 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Flame className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-bold text-white">Atmospheric Toxicity: Open Burning in Cold Climates</h3>
              <p className="text-xs text-slate-300 mt-1">
                Sub-zero winter temperatures and thermal inversions across Kashmir Valley and Ladakh trap toxic emissions from informal plastic burning. Smoldering PVC, polystyrene, and MLP generate polychlorinated dibenzo-p-dioxins (PCDDs), furans, and polycyclic aromatic hydrocarbons (PAHs), causing severe respiratory hazards in residential settlements.
              </p>
            </div>
          </div>
        </div>

        {/* Satellite Verified Hotspots */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Satellite className="w-5 h-5 text-indigo-400" />
                Copernicus &amp; Satellite-Detected Waste Hotspots
              </h2>
              <p className="text-xs text-slate-400">
                Earth observation spectral signatures confirming open plastic accumulation nodes.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Risk Tier:</span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              >
                <option value="ALL">All Risk Tiers</option>
                <option value="CRITICAL">Critical Risk</option>
                <option value="HIGH">High Risk</option>
                <option value="MEDIUM">Medium Risk</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHotspots.map((hotspot) => (
              <Card key={hotspot.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] border ${
                        hotspot.riskScore === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : hotspot.riskScore === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}>
                        {hotspot.riskScore}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {hotspot.satelliteMission}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{hotspot.siteName}</h3>
                    <div className="text-xs text-indigo-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{hotspot.district}, {hotspot.region}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-white">
                      {hotspot.estimatedAreaHectares} ha
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">Area</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                  {hotspot.notes}
                </p>

                <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div>
                    <span className="text-slate-500">Status:</span> {hotspot.accumulationStatus}
                  </div>
                  <div>
                    <span className="text-slate-500">Water Proximity:</span> {hotspot.proximityToWaterBodyM}m
                  </div>
                  <div>
                    <span className="text-slate-500">Verification:</span> {hotspot.fieldVerificationStatus}
                  </div>
                  <div>
                    <span className="text-slate-500">Observed:</span> {hotspot.lastObservedDate}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
