'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import {
  Waves,
  Droplets,
  AlertTriangle,
  ArrowRight,
  Fish,
  Anchor,
  Compass,
  Layers,
  MapPin
} from 'lucide-react';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function AquaticContaminationPage() {
  const waterBodies = [
    {
      name: 'Dal Lake & Nigeen Basin',
      type: 'Urban Fresh Water Lake',
      district: 'Srinagar',
      region: 'Kashmir Valley',
      floatingDebrisTPD: 2.4,
      microplasticAvgWater: '4.82 particles/m³',
      microplasticAvgSediment: '142.5 particles/kg',
      primaryPathways: 'Houseboat graywater outfalls, Dal Gate stormwater drains, floating market vegetable packaging.',
      ecologicalThreat: 'Entanglement of aquatic weeds, plastic sedimentation in littoral zones, microplastic ingestion by Schizothorax niger.',
      remediationStatus: 'LCMA weed harvesters extract ~450 kg plastic debris daily; surface skimming operational.'
    },
    {
      name: 'Wular Lake & Hokersar Wetland',
      type: 'Ramsar Wetland Complex',
      district: 'Bandipora / Budgam',
      region: 'Kashmir Valley',
      floatingDebrisTPD: 4.8,
      microplasticAvgWater: '6.15 particles/m³',
      microplasticAvgSediment: '210.0 particles/kg',
      primaryPathways: 'Jhelum River ingress, Sopore town direct municipal stormwater, fruit mandi packaging dumping.',
      ecologicalThreat: 'Ingestion by 350,000+ overwintering migratory waterfowl; microplastic bioaccumulation in benthic food web.',
      remediationStatus: 'WUCMA eco-restoration dredging; manual riparian plastic cleanup drives.'
    },
    {
      name: 'Jhelum River Fluvial Axis',
      type: 'Trans-Boundary River Corridor',
      district: 'Anantnag to Baramulla',
      region: 'Kashmir Valley',
      floatingDebrisTPD: 8.5,
      microplasticAvgWater: '3.90 particles/m³',
      microplasticAvgSediment: '98.2 particles/kg',
      primaryPathways: 'Township outfalls without sewage interception, direct riverbank dumping at Bijbehara, Srinagar, and Sopore.',
      ecologicalThreat: 'Downstream transport into Lower Jhelum Barrage and cross-border fluvial debris export.',
      remediationStatus: 'Riverfront development barriers; minimal downstream barrier nets.'
    },
    {
      name: 'Tawi River Basin',
      type: 'Sub-Himalayan River Axis',
      district: 'Jammu',
      region: 'Jammu',
      floatingDebrisTPD: 6.2,
      microplasticAvgWater: '5.10 particles/m³',
      microplasticAvgSediment: '165.4 particles/kg',
      primaryPathways: 'Nullahs draining Jammu city (Gumat, Shakuntla), religious offerings wrapped in poly-bags.',
      ecologicalThreat: 'Microplastic load in downstream agricultural lift irrigation canals; sediment poisoning.',
      remediationStatus: 'Tawi Riverfront artificial lake project trash screens in progress.'
    },
    {
      name: 'Neelum River Corridor',
      type: 'Trans-Himalayan Torrential River',
      district: 'Muzaffarabad / Neelum',
      region: 'Azad Jammu & Kashmir',
      floatingDebrisTPD: 3.1,
      microplasticAvgWater: '2.80 particles/m³',
      microplasticAvgSediment: '74.6 particles/kg',
      primaryPathways: 'Muzaffarabad city open riverbank dumps, tourist litter along Neelum highway hotels.',
      ecologicalThreat: 'Plastic aggregation at Neelum-Jhelum Hydroelectric intake and downstream Mangla Dam reservoir.',
      remediationStatus: 'Muzaffarabad Municipal Committee cleanups; intake trash racks operational.'
    },
    {
      name: 'Indus River & Gilgit Confluence',
      type: 'High-Altitude Major River Axis',
      district: 'Gilgit / Skardu',
      region: 'Gilgit-Baltistan',
      floatingDebrisTPD: 1.8,
      microplasticAvgWater: '1.45 particles/m³',
      microplasticAvgSediment: '42.1 particles/kg',
      primaryPathways: 'Skardu city stream dumping, KKH roadside debris, expedition trekker campsites.',
      ecologicalThreat: 'Cold-water fishery contamination; sediment deposition in downstream gorge impoundments.',
      remediationStatus: 'GB-EPA inspection teams and youth community cleanup drives.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 03 · ENVIRONMENTAL CONTAMINATION · RIVERS, LAKES & WETLANDS"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Aquatic' }
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              Aquatic Contamination & Fluvial Transport
            </span>
          </>
        }
        subtitle="Fluvial plastic transport dynamics, floating debris estimates, wetland sediment contamination, and barrier entrapment along Himalayan rivers and lakes."
        icon={<Waves className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* River Basin Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Waves className="w-5 h-5 text-indigo-400" />
                Audited Aquatic Basins &amp; Fluvial Corridors
              </h2>
              <p className="text-xs text-slate-400">
                Floating mass estimates, microplastic sediment burdens, and intake interception systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {waterBodies.map((wb) => (
              <Card key={wb.name} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      {wb.type}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{wb.name}</h3>
                    <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{wb.district}, {wb.region}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono font-black text-rose-400">
                      ~{wb.floatingDebrisTPD} TPD
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">Floating Debris</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Primary Contamination Pathways:</span>
                    <span className="text-slate-300">{wb.primaryPathways}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Ecological Threat:</span>
                    <span className="text-rose-300/90">{wb.ecologicalThreat}</span>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Surface Water: {wb.microplasticAvgWater}</span>
                    <span className="text-amber-300">Sediment: {wb.microplasticAvgSediment}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="text-slate-500 font-medium">Interception / Remediation:</span> {wb.remediationStatus}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
