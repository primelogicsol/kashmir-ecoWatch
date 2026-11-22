'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { PlasticPollutionSubNav } from '@/components/plastic-pollution/PlasticPollutionSubNav';
import { REGIONAL_PLASTIC_SUMMARIES, DISTRICT_PLASTIC_PROFILES } from '@/data/plastic-pollution';
import {
  ShoppingBag,
  Apple,
  Store,
  Users,
  Compass,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Filter
} from 'lucide-react';

export default function PlasticConsumptionPage() {
  const [sectorFilter, setSectorFilter] = useState<'ALL' | 'HOUSEHOLD' | 'AGRICULTURE' | 'TOURISM' | 'COMMERCIAL'>('ALL');

  const consumptionSectors = [
    {
      id: 'HOUSEHOLD',
      title: 'Household Packaging & FMCG',
      percentage: '44.8%',
      estTPD: 106.8,
      primaryItems: ['Sachets & multi-layered snack pouches', 'Milk & dairy pouches (LDPE)', 'Detergent & cosmetic bottles (HDPE)', 'Grocery carry bags (banned <120µ)'],
      dynamics: 'Driven by packaged goods penetration in suburban and rural markets. Over 68% of FMCG sachets entering rural households are uncollectible due to non-existent village segregation.',
      trend: '+4.2% annual growth'
    },
    {
      id: 'AGRICULTURE',
      title: 'Horticulture & Agriculture Mulch',
      percentage: '18.4%',
      estTPD: 43.9,
      primaryItems: ['Apple fruit wrapping foam nets', 'High-density apple harvest crates (PP)', 'Black soil mulch film (LDPE)', 'Greenhouse poly-tunnel sheeting', 'Orchard irrigation tubing'],
      dynamics: 'Severe seasonal peak in Kashmir Valley (Shopian, Sopore, Pulwama, Baramulla) and Gilgit-Baltistan (Hunza apricot harvest). Apple packing alone generates ~3,200 tonnes of expanded polystyrene and LDPE foam annually.',
      trend: '+6.1% annual growth'
    },
    {
      id: 'TOURISM',
      title: 'Tourism & Trekking Enclaves',
      percentage: '21.2%',
      estTPD: 50.6,
      primaryItems: ['Single-use PET drinking water bottles (500ml/1000ml)', 'Styrofoam takeaway containers & cups', 'Snack wrappers discarded on alpine trails', 'Disposable rain ponchos'],
      dynamics: 'Extremely concentrated in Gulmarg, Pahalgam, Sonamarg, Leh, Pangong Tso, and Hunza. Daily per-capita plastic generation surges from 18g/day baseline to 142g/day during tourist season.',
      trend: '+8.5% annual growth'
    },
    {
      id: 'COMMERCIAL',
      title: 'Commercial Trade & Construction',
      percentage: '15.6%',
      estTPD: 37.2,
      primaryItems: ['Woven cement & fertilizer sacks (PP)', 'PVC drainage conduits & electric casing', 'Protective bubble wraps and pallet stretch films', 'Wholesale packaging crates'],
      dynamics: 'High volume along major urban trade transit hubs (Jammu, Srinagar, Mirpur, Gilgit). Substantial informal recovery for heavy PP sacks, while stretch films leak directly into open debris.',
      trend: '+3.4% annual growth'
    }
  ];

  const filteredSectors = sectorFilter === 'ALL'
    ? consumptionSectors
    : consumptionSectors.filter(s => s.id === sectorFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Heading
        label="KEW · 02 · PLASTIC LIFECYCLE & FLOWS · CONSUMPTION TYPOLOGIES"
        images={['/images/env-monitoring/kashmir-plastic-hero.jpg', '/images/env-monitoring/Thumb_Waste.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Plastic Pollution', href: '/environmental-monitoring/plastic-pollution' },
          { label: 'End-Use' }
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
              End-Use Consumption & Polymer Typologies
            </span>
          </>
        }
        subtitle="Per capita synthetic packaging consumption, virgin vs recycled polymer demand, high-density polyethylene fruit box trends, and commercial distribution patterns."
        icon={<ShoppingBag className="w-6 h-6 text-rose-400" />}
      />

      <PlasticPollutionSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Total Consumption Est.</span>
            <div className="text-xl sm:text-2xl font-black text-white mt-1">~238.5 TPD</div>
            <span className="text-[10px] text-indigo-400 font-mono">Basin-wide aggregation</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Urban Per-Capita</span>
            <div className="text-xl sm:text-2xl font-black text-rose-400 mt-1">14.8 kg/yr</div>
            <span className="text-[10px] text-slate-400 font-mono">Srinagar &amp; Jammu metros</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Rural Per-Capita</span>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-1">4.6 kg/yr</div>
            <span className="text-[10px] text-slate-400 font-mono">Dominantly unrecyclable MLP</span>
          </div>
          <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg">
            <span className="text-[11px] text-slate-400 uppercase font-mono">Tourism Seasonal Surge</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">+380%</div>
            <span className="text-[10px] text-slate-400 font-mono">Peak alpine summer months</span>
          </div>
        </div>

        {/* Sector Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                Sectoral Consumption Profiles
              </h2>
              <p className="text-xs text-slate-400">
                Detailed demand dynamics, product mix, and seasonal vulnerability across key sectors.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-[6px] border border-white/10 text-xs overflow-x-auto">
              {(['ALL', 'HOUSEHOLD', 'AGRICULTURE', 'TOURISM', 'COMMERCIAL'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSectorFilter(cat)}
                  className={`px-2.5 py-1 rounded-[4px] font-medium transition-colors ${
                    sectorFilter === cat ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'ALL' ? 'All Sectors' : cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSectors.map((sec) => (
              <Card key={sec.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-[4px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    {sec.percentage} of Basin Mass
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    ~{sec.estTPD} TPD
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{sec.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {sec.dynamics}
                </p>

                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Commonly Consumed Items:</span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {sec.primaryItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>Growth Velocity:</span>
                  <span className="font-mono font-bold text-rose-400">{sec.trend}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Agricultural Mulch Special Section */}
        <div className="bg-slate-900/60 border border-white/10 p-5 rounded-lg space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Apple className="w-4 h-4 text-rose-400" />
            Horticultural Plastic Footprint: Apple Industry Case Study
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kashmir produces over 1.8 million metric tonnes of apples annually. Traditional wooden boxes have been almost 90% replaced with corrugated fiberboard lined with LDPE foam nets and polystyrene divider trays. During harvest season, an estimated 12 million individual expanded polystyrene wrapping nets are discarded in orchards and sorting yards, with less than 5% formal recovery.
          </p>
        </div>
      </div>
    </div>
  );
}
