'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Construction,
  Globe2,
  Layers,
  Satellite,
  ShieldAlert,
  Truck,
  Zap
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function EnergyInfrastructureSubmodulePage() {
  const infraPillars = [
    {
      id: 'hydropower-cascades',
      title: 'Run-of-the-River Hydropower Cascades',
      metrics: '3,360 MW Operational | 15% Baseline E-Flow Compliance Deficit',
      description: 'Dams and headrace tunnels diverting high-altitude river flows, drying out natural river reaches (e.g. Kishanganga, Lower Jhelum), and fragmenting endemic cold-water fish habitats.',
      source: 'Central Electricity Authority (CEA) & CPCB Hydrological Telemetry'
    },
    {
      id: 'linear-infrastructure',
      title: 'Highway Widening & Railway Engineering',
      metrics: '280 km Active Slope Cuttings | 4.8x Landslide Reactivation',
      description: 'Steep toe-cutting of young, highly sheared Himalayan metasediments for NH-44 widening and the USBRL rail corridor, creating chronically destabilized rockfall zones.',
      source: 'NHAI / IRCON Project Registers & InSAR Satellite Deformation Audits'
    },
    {
      id: 'tunnels-muck',
      title: 'Deep Tunnel Boring & Muck Dumping Terraces',
      metrics: '18.2 Million m³ Muck Volume | 14 Depleted Mountain Springs',
      description: 'Tunnel excavation intercepting deep fracture bedrock aquifers, desiccating traditional gravity drinking springs while billions of cubic meters of loose muck are terraced along river corridors.',
      source: 'Ministry of Environment, Forest & Climate Change (MoEFCC) Monitoring'
    },
    {
      id: 'energy-transition',
      title: 'Grid Electrification & Mountain Renewable Transition',
      metrics: '420 MW Solar Potential Mapped | 1,240 km Transmission Lines',
      description: 'High-voltage transmission corridors traversing protected sub-alpine passes, balanced against localized solar-microgrid viability in high-altitude off-grid valleys.',
      source: 'J&K Energy Development Agency (JKEDA) 2026 Strategy'
    }
  ];

  const majorProjects = [
    { name: 'Kishanganga HEP (Gurez)', capacity: '330 MW', basin: 'Kishanganga / Neelum', muckVolume: '3.4M m³', eflowCompliance: 'Variable (Low in Winter)', status: 'Operational' },
    { name: 'Uri-I & Uri-II HEP (Baramulla)', capacity: '720 MW', basin: 'Lower Jhelum Gorge', muckVolume: '4.8M m³', eflowCompliance: 'Compliant with Seasonal Spills', status: 'Operational' },
    { name: 'Zojila Tunnel Construction (Sonamarg-Drass)', capacity: '14.2 km length', basin: 'Sind / Drass Divide', muckVolume: '5.1M m³', eflowCompliance: 'Spring Scour Monitored', status: 'Under Advanced Construction' },
    { name: 'NH-44 Four-Lane Ramban-Banihal Sector', capacity: '36 km Expansion', basin: 'Bichleri / Chenab Tributaries', muckVolume: '4.9M m³', eflowCompliance: 'Active Slide Stabilization', status: 'Active Works' },
    { name: 'Lower Jhelum Baramulla Barrage', capacity: '105 MW', basin: 'Jhelum Outfall', muckVolume: '1.2M m³', eflowCompliance: 'Sediment Sluicing Active', status: 'Operational' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Energy & Infrastructure Observatory • Corridor Analytics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Linear Infrastructure, Tunnels & Hydropower Stress' }
        ]}
        icon={<Zap className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-INFRA
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Linear Infrastructure, Tunnels & Hydropower Stress
              </span>
            </div>
          </div>
        }
        subtitle="Surveillance of mega-infrastructure impacts across fragile Himalayan geology: run-of-the-river hydroelectric cascades, trans-mountain railway tunnels, highway widening slopes, and riverbed muck disposal."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['energy-infrastructure'].tag}
            badge={EHII_HERO_CONFIGS['energy-infrastructure'].badge}
            items={EHII_HERO_CONFIGS['energy-infrastructure'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['energy-infrastructure'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Operational Hydropower</div>
            <div className="text-2xl font-bold text-yellow-400 mt-1">3,360 MW</div>
            <div className="text-[11px] text-slate-500">Jhelum & Chenab basins</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Active Muck Terraces</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">18.2M m³</div>
            <div className="text-[11px] text-slate-500">Excavated tunnel & road spoil</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Desiccated Springs</div>
            <div className="text-2xl font-bold text-orange-400 mt-1">14 Springs</div>
            <div className="text-[11px] text-slate-500">Tunnel fracture dewatering</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Slope Slide Reactivation</div>
            <div className="text-2xl font-bold text-teal-400 mt-1">4.8x</div>
            <div className="text-[11px] text-slate-500">Frequency along highway cuts</div>
          </div>
        </div>

        {/* 4 Pillars */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Four Infrastructure Science Domains
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infraPillars.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-yellow-400 mb-2">{p.metrics}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Regulatory Source:</span>
                  <span className="text-slate-400">{p.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Table */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Major Himalayan Infrastructure Project Ledger</h3>
          <p className="text-xs text-slate-400 mb-4">Official environmental compliance, muck generation, and hydrological footprint.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Infrastructure Asset</th>
                  <th className="py-2.5 px-3">Scope / Scale</th>
                  <th className="py-2.5 px-3">Watershed / Basin</th>
                  <th className="py-2.5 px-3">Muck Volume</th>
                  <th className="py-2.5 px-3">Ecological & E-Flow Compliance</th>
                  <th className="py-2.5 px-3">Operational Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {majorProjects.map((mp) => (
                  <tr key={mp.name} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold text-white">{mp.name}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">{mp.capacity}</td>
                    <td className="py-2.5 px-3 text-slate-400">{mp.basin}</td>
                    <td className="py-2.5 px-3 font-mono text-amber-400">{mp.muckVolume}</td>
                    <td className="py-2.5 px-3 text-slate-300">{mp.eflowCompliance}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {mp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hazard Linkage */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-950/40 via-slate-900 to-slate-950 border border-yellow-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">Geotechnical Hazard Interlock</div>
            <h4 className="text-base font-bold text-white">Coupled with Hazard Intelligence (Landslides & Floods)</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Road cuttings and un-stabilized muck terraces directly compound slope mass-wasting during intense monsoon cloudbursts. Cross-reference with the Landslide and Flood intelligence modules.
            </p>
          </div>
          <Link
            href="/hazard-intelligence/landslides"
            className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Landslide Hazard Intelligence
          </Link>
        </div>
      </div>
    </div>
  );
}
