'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Globe2,
  Layers,
  Leaf,
  Map,
  Satellite,
  ShieldAlert,
  TreePine,
  Trees,
  TrendingDown
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function ForestsLandscapesSubmodulePage() {
  const forestPillars = [
    {
      id: 'canopy-cover',
      title: 'Very Dense & Moderately Dense Forest Canopy',
      metrics: '4,380 sq km Very Dense Canopy | -1.8% Net Crown Closure',
      description: 'Temporal degradation from Very Dense Forest (>70% crown density) into Moderately Dense (40–70%) and Open Forest (10–40%) across Pir Panjal and lower Himalayan foothills.',
      source: 'Forest Survey of India (FSI) Biennial Remote Sensing Audits'
    },
    {
      id: 'biomass-carbon',
      title: 'Above-Ground Biomass & Terrestrial Carbon Pools',
      metrics: '142.8 Million Tonnes Carbon | 128.4 t/ha Carbon Density',
      description: 'Old-growth coniferous stands of Cedrus deodara, Pinus wallichiana, and Abies pindrow sequester substantial carbon pools now threatened by edge erosion and unmonitored logging.',
      source: 'GEDI Spaceborne LiDAR & ICAR Terrestrial Carbon Models'
    },
    {
      id: 'fragmentation',
      title: 'Ecological Corridor Severance & Patch Metrics',
      metrics: '28.4% Patch Severance Index | 312 Fragmented Nodes',
      description: 'Linear infrastructure corridors, border security fencing, and tourist resort enclaves bifurcating critical Hangul (Cervus hanglu) and Himalayan Brown Bear migratory passes.',
      source: 'Wildlife Institute of India (WII) Corridor Connectivity Mapping'
    },
    {
      id: 'alpine-ecotones',
      title: 'Sub-Alpine Birch (Betula utilis) & Alpine Meadows',
      metrics: '+65m Upward Ecotone Treeline Shift | Grazing Overpressure',
      description: 'Warming temperatures pushing birch krummholz higher into alpine pastures, while intensive livestock summer grazing limits natural recruitment and accelerates soil slumping.',
      source: 'Sentinel-2 High-Resolution Ecotone Phenology Feeds'
    }
  ];

  const forestDivisions = [
    { division: 'Pir Panjal Division', forestAreaHa: '84,200', denseCoverPct: '42.1%', annualLossHa: '84 ha', primaryThreat: 'Linear highway widening & lopping' },
    { division: 'Lidder Forest Division', forestAreaHa: '62,800', denseCoverPct: '48.5%', annualLossHa: '46 ha', primaryThreat: 'Tourism resort encroachments' },
    { division: 'Sind Forest Division', forestAreaHa: '71,400', denseCoverPct: '44.8%', annualLossHa: '52 ha', primaryThreat: 'Transmission line corridors' },
    { division: 'Kamraj Forest Division', forestAreaHa: '96,100', denseCoverPct: '51.2%', annualLossHa: '68 ha', primaryThreat: 'Illicit felling & border works' },
    { division: 'Shopian Forest Division', forestAreaHa: '53,200', denseCoverPct: '39.4%', annualLossHa: '92 ha', primaryThreat: 'High-density apple orchard creep' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Forest Canopy & Landscape Observatory • ISFR Data"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Forest Canopy Density & Landscape Fragmentation' }
        ]}
        icon={<Trees className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-FOR
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Forest Canopy Density & Landscape Fragmentation
              </span>
            </div>
          </div>
        }
        subtitle="Quantitative assessment of canopy density changes, forest carbon dynamics, wildlife corridor fragmentation, and sub-alpine ecotone degradation across Kashmir's coniferous landscapes."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['forests-landscapes'].tag}
            badge={EHII_HERO_CONFIGS['forests-landscapes'].badge}
            items={EHII_HERO_CONFIGS['forests-landscapes'].showcaseItems}
          />
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/earth-human-impact">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <Globe2 className="w-4 h-4 mr-1.5" />
                EHII Hub
              </Button>
            </Link>
            <Link href="/earth-human-impact/change-detection-observatory">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Observatory
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['forests-landscapes'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Dense Canopy Area</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">4,380 km²</div>
            <div className="text-[11px] text-slate-500">&gt;70% crown density cover</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Total Carbon Stock</div>
            <div className="text-2xl font-bold text-teal-400 mt-1">142.8 MT</div>
            <div className="text-[11px] text-slate-500">Above & below-ground carbon</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Corridor Severance</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">28.4%</div>
            <div className="text-[11px] text-slate-500">Linear infrastructure cuts</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Treeline Displacement</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">+65 m</div>
            <div className="text-[11px] text-slate-500">Sub-alpine upward creep</div>
          </div>
        </div>

        {/* Pillars Grid */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Four Forest Landscape Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {forestPillars.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mb-2">{p.metrics}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Methodology Source:</span>
                  <span className="text-slate-400">{p.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Division Breakdown */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Key Forest Divisions Canopy Status</h3>
          <p className="text-xs text-slate-400 mb-4">Official forest cover, dense canopy ratio, and verified annual disturbance rates.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Division</th>
                  <th className="py-2.5 px-3">Total Area (Ha)</th>
                  <th className="py-2.5 px-3">Dense Cover (%)</th>
                  <th className="py-2.5 px-3">Annual Canopy Loss</th>
                  <th className="py-2.5 px-3">Primary Anthropogenic Threat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {forestDivisions.map((f) => (
                  <tr key={f.division} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold text-white">{f.division}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">{f.forestAreaHa}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400">{f.denseCoverPct}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-400">{f.annualLossHa}</td>
                    <td className="py-2.5 px-3 text-slate-300">{f.primaryThreat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Inter-Module Navigation Linkage */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Ecosystem Corridors</div>
            <h4 className="text-base font-bold text-white">Integrated with Protected Areas Network</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Forest division buffer zones directly determine the viability of Dachigam National Park, Overa-Aru, and Gulmarg Wildlife Sanctuaries. Cross-examine corridor data with Protected Areas.
            </p>
          </div>
          <Link
            href="/protected-network/corridors-and-connectivity"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Corridors & Connectivity
          </Link>
        </div>
      </div>
    </div>
  );
}
