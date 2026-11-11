'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Droplets,
  Globe2,
  Grid,
  Layers,
  Satellite,
  ThermometerSun,
  TreeDeciduous
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export default function UrbanEcologySubmodulePage() {
  const urbanPillars = [
    {
      id: 'settlement-expansion',
      title: 'Sprawling Low-Density Peri-Urban Encroachment',
      metrics: '382 sq km Built-Up Footprint | +4.6% Annual Spread',
      description: 'Unplanned settlement dispersion spreading along arterial highway corridors (Srinagar-Baramulla, Srinagar-Anantnag), converting contiguous agricultural greenspaces into fragmented urban fabric.',
      source: 'Town & Country Planning Organization Srinagar Master Plan 2035'
    },
    {
      id: 'urban-heat-islands',
      title: 'Urban Heat Island (UHI) Microclimatic Anomalies',
      metrics: '+3.8°C Core Thermal Delta | 42 km² High LST Zone',
      description: 'Extensive concrete, asphalt, and GI tin-roofing surfaces absorbing solar radiation, creating sharp surface temperature anomalies over Lal Chowk, Batamaloo, and Soura compared to rural peripheries.',
      source: 'Landsat-9 Thermal Infrared Sensor (TIRS) Land Surface Temp'
    },
    {
      id: 'impervious-surfaces',
      title: 'Impervious Surface Soil Sealing & Flash Runoff',
      metrics: '72.4% Imperviousness in Core | 3.6x Runoff Coefficient',
      description: 'Elimination of permeable alluvial soils severely diminishes natural rainwater infiltration, generating acute flash inundation across downtown during moderate rain events.',
      source: 'Sentinel-2 Normalized Difference Built-Up Index (NDBI)'
    },
    {
      id: 'peri-urban-wetlands',
      title: 'Encroachment of Historic Flood-Basin Wetlands',
      metrics: '48.2% Wetland Area Lost Since 1970 | Severe Choking',
      description: 'Systematic infilling and earth-dumping into Hokersar, Bemina flood spills, Mir Behri, and Narakara wetlands, disabling Srinagar’s natural hydraulic sponge during flood emergencies.',
      source: 'Wular & Manasbal Development Authority & CAG Audit 2025'
    }
  ];

  const urbanWetlands = [
    { name: 'Hokersar Wetland Reserve (Srinagar-Budgam)', originalHa: '1,375 ha', presentHa: '810 ha', lossPct: '41.1%', threatDriver: 'Earth-filling, residential encroachment, brick-kiln dumping' },
    { name: 'Anchar Lake Margins (Soura)', originalHa: '1,950 ha', presentHa: '620 ha', lossPct: '68.2%', threatDriver: 'Raw municipal sewage outfalls & illegal floating gardens' },
    { name: 'Brari Nambal Internal Lagoon (Downtown)', originalHa: '110 ha', presentHa: '42 ha', lossPct: '61.8%', threatDriver: 'Solid waste dumping & untreated commercial dye drains' },
    { name: 'Mir Behri Dal Backwaters', originalHa: '840 ha', presentHa: '390 ha', lossPct: '53.6%', threatDriver: 'Encroached residential hamlets & willow wicker stands' },
    { name: 'Bemina Flood Retention Spill Basin', originalHa: '680 ha', presentHa: '220 ha', lossPct: '67.6%', threatDriver: 'Commercial shopping complexes & institutional complexes' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Urban Systems & Heat Island Observatory • Settlement Dynamics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Urban Ecology, Microclimate & Impervious Surface' }
        ]}
        icon={<Building2 className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-URBAN
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Urban Ecology, Microclimate & Impervious Surface
              </span>
            </div>
          </div>
        }
        subtitle="Spatial monitoring of rapid settlement sprawl, Urban Heat Island microclimates, impervious surface expansion, and the catastrophic destruction of natural flood-basin wetlands in Greater Srinagar."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['urban-ecology'].tag}
            badge={EHII_HERO_CONFIGS['urban-ecology'].badge}
            items={EHII_HERO_CONFIGS['urban-ecology'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['urban-ecology'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Urban Built-Up Area</div>
            <div className="text-2xl font-bold text-purple-400 mt-1">382 km²</div>
            <div className="text-[11px] text-slate-500">Greater Srinagar region</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Summer UHI Delta</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">+3.8°C</div>
            <div className="text-[11px] text-slate-500">Core vs rural perimeter</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Core Impervious Cover</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">72.4%</div>
            <div className="text-[11px] text-slate-500">Concrete & asphalt sealing</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Wetland Buffer Loss</div>
            <div className="text-2xl font-bold text-teal-400 mt-1">48.2%</div>
            <div className="text-[11px] text-slate-500">Area severed since 1970</div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Four Urban Ecology Science Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urbanPillars.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-purple-400 mb-2">{p.metrics}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Methodology Reference:</span>
                  <span className="text-slate-400">{p.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wetlands Encroachment Table */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Encroachment of Key Urban Sponges & Flood Retention Basins</h3>
          <p className="text-xs text-slate-400 mb-4">Historical comparison of wetland water spread based on CAG Audit 2025 and remote sensing surveys.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Wetland Waterbody</th>
                  <th className="py-2.5 px-3">Historic Area (1970)</th>
                  <th className="py-2.5 px-3">Current Area (2025)</th>
                  <th className="py-2.5 px-3">Cumulative Area Loss</th>
                  <th className="py-2.5 px-3">Primary Anthropogenic Driver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {urbanWetlands.map((w) => (
                  <tr key={w.name} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold text-white">{w.name}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{w.originalHa}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-200">{w.presentHa}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">{w.lossPct}</td>
                    <td className="py-2.5 px-3 text-slate-300">{w.threatDriver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Flood Risk Inter-Lock */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">Catastrophic Hydraulic Consequence</div>
            <h4 className="text-base font-bold text-white">Direct Correlation with 2014-Style Flood Vulnerability</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Loss of the Hokersar and Bemina retention sponges reduces Srinagar&apos;s flood buffer capacity by over 60%, multiplying urban inundation probability during autumn precipitation peaks.
            </p>
          </div>
          <Link
            href="/hazard-intelligence/floods"
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Flood Hazard Intelligence
          </Link>
        </div>
      </div>
    </div>
  );
}
