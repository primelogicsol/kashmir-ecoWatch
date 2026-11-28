'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Flame,
  Globe2,
  Hammer,
  Layers,
  Pickaxe,
  Satellite,
  ShieldAlert,
  Waves
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

export default function MiningExtractionSubmodulePage() {
  const miningPillars = [
    {
      id: 'riverbed-mining',
      title: 'Mechanized Riverbed Mineral Dredging',
      metrics: '118 km Extracted River Corridor | 2.4m Channel Incision',
      description: 'Heavy hydraulic excavators operating directly within active stream channels, stripping cobble armor, destabilizing embankments, lowering the water table, and obliterating benthic microhabitats.',
      source: 'Directorate of Geology & Mining (DGM) Spatial Concession Audits'
    },
    {
      id: 'stone-quarrying',
      title: 'Limestone & Hard-Rock Mountain Quarries',
      metrics: '246 Permitted & Active Quarry Sites | High Dust Load',
      description: 'Uncontrolled blasting of limestone ridges in Khrew, Khanmoh, and Athwajan, generating intense ambient PM10 and destroying fragile karst micro-ecosystems and spring conduits.',
      source: 'J&K Pollution Control Committee (JKPCC) Ambient Air Ledgers'
    },
    {
      id: 'clay-brick-kilns',
      title: 'Alluvial Clay & Bull’s Trench Brick Kiln Clusters',
      metrics: '412 Active Brick Kilns | 2,800 ha Arable Land Sealed',
      description: 'Extensive excavation of topsoil and fertile sub-alluvial clay layers for firing construction bricks, accompanied by thick coal and biomass combustion smoke envelopes in Pulwama and Budgam.',
      source: 'CPCB Brick Kiln Regulatory Compliance Records'
    },
    {
      id: 'illegal-extraction',
      title: 'Nocturnal & Unpermitted Mineral Extraction',
      metrics: '64 Night Enforcement Actions | ₹4.8 Cr Fines Levied',
      description: 'Extraction beyond statutory depth limits (statutory limit 1 meter; field depths exceeding 3.5 meters), operating during fish spawning moratoria in Doodhganga, Rambiara, and Romshi streams.',
      source: 'National Green Tribunal (NGT) Compliance Dockets 2024–2026'
    }
  ];

  const riverbedCorridors = [
    { river: 'Doodhganga Stream (Budgam-Srinagar)', dredgedKm: '22 km', depthIncisionM: '2.8 m', ecologyImpact: 'Water filtration intake exposure & bank failure', ngtStatus: 'NGT Order Penalty Imposed' },
    { river: 'Rambiara River (Shopian-Pulwama)', dredgedKm: '34 km', depthIncisionM: '3.2 m', ecologyImpact: 'Severe Trout & Schizothorax spawning loss', ngtStatus: 'Moratorium Recommended' },
    { river: 'Vaishaw Stream (Kulgam)', dredgedKm: '18 km', depthIncisionM: '2.1 m', ecologyImpact: 'Aquifer drawdown & irrigation canal isolation', ngtStatus: 'Enforcement Enforced' },
    { river: 'Sukhnag Nallah (Beerwah)', dredgedKm: '16 km', depthIncisionM: '1.9 m', ecologyImpact: 'Riparian buffer collapse & turbidity surge', ngtStatus: 'Under Surveillance' },
    { river: 'Sind River Lower Reach (Ganderbal)', dredgedKm: '28 km', depthIncisionM: '2.5 m', ecologyImpact: 'Bridge pier scour & downstream siltation', ngtStatus: 'Active Monitoring' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Mining & Riverbed Quarry Observatory • Hydrological Scour"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Earth & Human Impact', href: '/earth-human-impact' },
          { label: 'Riverbed Excavation & Mineral Extraction' }
        ]}
        icon={<Pickaxe className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <KewBrandIdentity />
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Riverbed Excavation & Mineral Extraction
              </span>
            </div>
          </div>
        }
        subtitle="Rigorous environmental auditing of mechanical riverbed mineral dredging, mountain limestone quarrying, alluvial brick kiln proliferation, and illicit riparian gravel extraction across Kashmir watersheds."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['mining-extraction'].tag}
            badge={EHII_HERO_CONFIGS['mining-extraction'].badge}
            items={EHII_HERO_CONFIGS['mining-extraction'].showcaseItems}
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
            <Link href="/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory">
              <Button size="sm" variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10 font-bold">
                <Pickaxe className="w-4 h-4 mr-1.5" />
                Gilgit-Baltistan Mineral Observatory (18 Registries)
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Submodule Navigation */}
      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['mining-extraction'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Dredged Riverbeds</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">118 km</div>
            <div className="text-[11px] text-slate-500">Active mechanical concessions</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Average Channel Incision</div>
            <div className="text-2xl font-bold text-orange-400 mt-1">2.4 m</div>
            <div className="text-[11px] text-slate-500">Exceeds 1.0m statutory limit</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Operational Brick Kilns</div>
            <div className="text-2xl font-bold text-amber-400 mt-1">412 Kilns</div>
            <div className="text-[11px] text-slate-500">Alluvial soil extraction</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400">Active Stone Quarries</div>
            <div className="text-2xl font-bold text-yellow-400 mt-1">246 Sites</div>
            <div className="text-[11px] text-slate-500">Limestone & boulder blasting</div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Four Extraction Dynamics Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {miningPillars.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-orange-400 mb-2">{p.metrics}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Regulatory Verification:</span>
                  <span className="text-slate-400">{p.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Riverbeds Table */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-1">Key Riverbed Mining Corridors Status</h3>
          <p className="text-xs text-slate-400 mb-4">Official monitoring of stream incision depths, ecological degradation, and statutory enforcement status.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">River Reach</th>
                  <th className="py-2.5 px-3">Dredged Length</th>
                  <th className="py-2.5 px-3">Channel Incision</th>
                  <th className="py-2.5 px-3">Ecological & Infrastructure Consequence</th>
                  <th className="py-2.5 px-3">Enforcement Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {riverbedCorridors.map((rc) => (
                  <tr key={rc.river} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold text-white">{rc.river}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">{rc.dredgedKm}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">{rc.depthIncisionM}</td>
                    <td className="py-2.5 px-3 text-slate-300">{rc.ecologyImpact}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {rc.ngtStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fisheries Inter-Lock */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-orange-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">Cold-Water Fish Habitat Threat</div>
            <h4 className="text-base font-bold text-white">Impact on Native Snow Trout (Schizothorax spp.)</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Mechanized instream gravel sorting destroys gravel riffles critical for indigenous carp and snow trout oviposition. Cross-examine with Water Systems and Fisheries data.
            </p>
          </div>
          <Link
            href="/water-systems"
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Water Systems & Fisheries
          </Link>
        </div>

        {/* Dedicated Gilgit-Baltistan Mineral Extraction & Environmental Accountability Expansion */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950/30 to-slate-900 border border-teal-500/35 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-teal-400">
              WESTERN HIMALAYAN EXTRACTIVE INTELLIGENCE EXPANSION · MONOGRAPH 16
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Gilgit-Baltistan Mineral Extraction &amp; Environmental Accountability Observatory
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Eighteen permanent registries tracking 14 Karakoram–Himalayan–Hindu Kush mineral
              groups, the 590-entry Mines Portal study cadastre, August 2026 Indus/Gilgit placer
              gold scour warnings, pre-2024 vs. 2024 community royalty rules, Upper Indus acid-mine
              drainage geochemistry, and the 20-Gate Mineral Extraction Integrity Protocol.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/earth-human-impact/mining-extraction/gilgit-baltistan-mineral-observatory"
              className="px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors"
            >
              Open 18-Registry GB Observatory →
            </Link>
            <Link
              href="/himalayan-dispatch/issues/volume-01-issue-01/the-wealth-beneath-the-mountains"
              className="px-4 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-slate-200 text-xs font-bold transition-colors"
            >
              Read Dispatch 24
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
