'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { DISTRICT_PLASTIC_PROFILES, REGIONAL_PLASTIC_SUMMARIES, PolymerType } from '@/data/plastic-pollution';
import {
  Factory,
  Truck,
  ArrowRight,
  TrendingDown,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Info,
  Layers,
  FileCheck
} from 'lucide-react';

export default function ProductionTradePage() {
  const [polymerFilter, setPolymerFilter] = useState<string>('ALL');

  const polymerFlows = [
    {
      code: 'PET' as PolymerType,
      name: 'Polyethylene Terephthalate (#1)',
      primaryUses: 'Bottled drinking water, carbonated soft drinks, edible oil bottles, polyester staple fiber',
      regionalImportTPD: 48.5,
      manufacturingStatus: 'Zero virgin resin polymerization in-basin; 100% imported as virgin granules or preforms from Punjab, Gujarat, and industrial corridors.',
      inflowRoutes: 'NH-44 Lakhanpur Gateway, Rawalpindi-Havelian Freight Axis, Babusar Ingress (Seasonal)',
      recycledContentEst: '14.2%',
      regulatoryRestriction: 'Mandatory recycled content rules under EPR guidelines 2022-26.'
    },
    {
      code: 'HDPE' as PolymerType,
      name: 'High-Density Polyethylene (#2)',
      primaryUses: 'Rigid containers, detergent bottles, agricultural piping, crates, milk jugs',
      regionalImportTPD: 34.2,
      manufacturingStatus: 'Extrusion units operating in Bari Brahmana, Lassipora, and Rangreth converting imported granules.',
      inflowRoutes: 'Jammu Railhead & NH-44 Freight corridor, KKH Skardu-Gilgit Freight Hub',
      recycledContentEst: '26.8%',
      regulatoryRestriction: 'BIS certification required for potable water HDPE piping.'
    },
    {
      code: 'PVC' as PolymerType,
      name: 'Polyvinyl Chloride (#3)',
      primaryUses: 'Plumbing conduits, drainage pipes, window profiles, architectural vinyls',
      regionalImportTPD: 22.8,
      manufacturingStatus: 'Converted locally in Jammu and Lassipora; raw resin imported from western coastal petrochemical refineries.',
      inflowRoutes: 'NH-44 Freight Corridor, Hattian Bala Highway',
      recycledContentEst: '18.4%',
      regulatoryRestriction: 'Lead stabilizer prohibitions strictly audited under revised standards.'
    },
    {
      code: 'LDPE' as PolymerType,
      name: 'Low-Density Polyethylene (#4)',
      primaryUses: 'Agricultural apple wrap films, greenhouse poly-tunnels, heavy carrier wraps, squeeze squeeze bottles',
      regionalImportTPD: 41.0,
      manufacturingStatus: 'High seasonal influx tied to horticultural harvest (August-November) across Sopore, Shopian, and Kotli.',
      inflowRoutes: 'Interstate trucking networks, Rawalpindi wholesale markets',
      recycledContentEst: '9.5%',
      regulatoryRestriction: 'Thickness minimums (120 microns for carry bags; agricultural film retrieval mandates).'
    },
    {
      code: 'PP' as PolymerType,
      name: 'Polypropylene (#5)',
      primaryUses: 'Woven sacks for cement, apple export crates, food containers, automotive trim, PPE',
      regionalImportTPD: 39.4,
      manufacturingStatus: 'Woven sack manufacturing clusters located in Samba, Kathua, and Muzaffarabad industrial zones.',
      inflowRoutes: 'Industrial freight lines, Lakhanpur / Hazara Motorway',
      recycledContentEst: '31.0%',
      regulatoryRestriction: 'Baling wire and plastic twine standards for agricultural binding.'
    },
    {
      code: 'MLP' as PolymerType,
      name: 'Multi-Layered Packaging / Metallized Films (#7)',
      primaryUses: 'Snack food packaging, instant noodles, tobacco sachets, pharmaceutical blisters',
      regionalImportTPD: 52.6,
      manufacturingStatus: '100% finished FMCG product imports from national and multinational conglomerate supply lines.',
      inflowRoutes: 'FMCG distribution hubs at Bari Brahmana, Srinagar, Mirpur, Gilgit',
      recycledContentEst: '2.1%',
      regulatoryRestriction: 'Non-recyclable MLP phase-out mandates under statutory notification; acute compliance deficit.'
    }
  ];

  const filteredFlows = polymerFilter === 'ALL'
    ? polymerFlows
    : polymerFlows.filter((p) => p.code === polymerFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 02 · PLASTIC LIFECYCLE & FLOWS · PRODUCTION & TRADE"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'Virgin' }
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
              Virgin Polymer Trade & Ingress Tracking
            </span>
          </>
        }
        subtitle="Inbound raw polymer granule shipments, regional packaging manufacturing units, inter-state trade corridors, and virgin resin balance sheets."
        icon={<Factory className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Key Findings Notice */}
        <div className="bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Factory className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-bold text-white">Upstream Dependency: Zero In-Basin Polymerization</h3>
              <p className="text-xs text-slate-300 mt-1">
                The Western Himalayan geographical sphere possesses zero primary petrochemical cracking or virgin resin synthesis refineries. 100% of polymer mass entering the basin is imported as raw resin pellets or packaged consumer commodities.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-[4px] bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 whitespace-nowrap">
            ~238.5 TPD Total Inflow
          </span>
        </div>

        {/* Polymer Breakdown Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-400" />
                Polymer Trade Flow &amp; Conversion Characterization
              </h2>
              <p className="text-xs text-slate-400">
                Audited daily import tonnage, resin conversion status, and regional regulatory constraints.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter Polymer:</span>
              <select
                value={polymerFilter}
                onChange={(e) => setPolymerFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-900 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Polymers (6 Types)</option>
                <option value="PET">PET (#1)</option>
                <option value="HDPE">HDPE (#2)</option>
                <option value="PVC">PVC (#3)</option>
                <option value="LDPE">LDPE (#4)</option>
                <option value="PP">PP (#5)</option>
                <option value="MLP">MLP (#7)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlows.map((flow) => (
              <Card key={flow.code} className="bg-slate-900/80 border-white/10 p-5 rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-[4px] font-mono font-bold text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      {flow.code}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {flow.regionalImportTPD} TPD Inflow
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{flow.name}</h3>
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    <strong className="text-slate-400">Applications:</strong> {flow.primaryUses}
                  </p>
                  <div className="text-[11px] text-slate-400 space-y-1.5 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-slate-500 font-medium">Conversion Status:</span> {flow.manufacturingStatus}
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Primary Transit:</span> {flow.inflowRoutes}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Recycled Content:</span>
                  <span className="font-mono font-bold text-indigo-300">{flow.recycledContentEst}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Industrial Conversion Geography */}
        <div className="bg-slate-900/60 border border-white/10 p-6 rounded-lg space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Key Conversion Hubs &amp; Industrial Estates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-950/70 border border-white/5 rounded-[6px]">
              <div className="font-bold text-white mb-0.5">Bari Brahmana &amp; Samba</div>
              <div className="text-slate-400 text-[11px]">Jammu Industrial Belt</div>
              <div className="text-slate-300 mt-2">
                42 operational blow-molding and woven sack fabrication factories. Processes ~60 TPD resin.
              </div>
            </div>
            <div className="p-3 bg-slate-950/70 border border-white/5 rounded-[6px]">
              <div className="font-bold text-white mb-0.5">Rangreth &amp; Lassipora</div>
              <div className="text-slate-400 text-[11px]">Kashmir Valley Industrial Estates</div>
              <div className="text-slate-300 mt-2">
                Apple packaging, corrugated plastic box extrusion, and LDPE greenhouse sheeting units.
              </div>
            </div>
            <div className="p-3 bg-slate-950/70 border border-white/5 rounded-[6px]">
              <div className="font-bold text-white mb-0.5">Muzaffarabad &amp; Mirpur</div>
              <div className="text-slate-400 text-[11px]">Azad Jammu &amp; Kashmir</div>
              <div className="text-slate-300 mt-2">
                PP bag manufacturing and agricultural water piping fabrication catering to Jhelum valley.
              </div>
            </div>
            <div className="p-3 bg-slate-950/70 border border-white/5 rounded-[6px]">
              <div className="font-bold text-white mb-0.5">Ganesh &amp; Choglamsar</div>
              <div className="text-slate-400 text-[11px]">Hunza / Leh High-Altitude Clusters</div>
              <div className="text-slate-300 mt-2">
                Micro-recycling and pelletizing operations converting post-consumer PET bottles into construction aggregates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
