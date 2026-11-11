import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  AlertTriangle,
  ArrowRight,
  Droplet,
  Globe2,
  Satellite,
  Scale,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Springs & Groundwater Discharge Change Observatory | Kashmir EcoWatch',
  description: 'Hydrogeological springshed inventory, recharge zone satellite classification, and participatory field discharge monitoring across Kashmir.',
};

export default function SpringsGroundwaterPage() {
  const springClusters = [
    {
      cluster: 'South Kashmir Karewa Springs',
      district: 'Pulwama & Shopian',
      monitoredSprings: 48,
      drySeasonDischargeDrop: '-38.5% (2020 vs 2026)',
      dryingFrequencyDays: '54 days/year zero flow',
      rechargeConversionHa: '68 ha/year Karewa clay mining & highway cuts',
      aquiferVulnerability: 'Critical / Aquifer Decapitation Risk',
      status: 'High Depletion'
    },
    {
      cluster: 'Verinag & Anantnag Karst Springs',
      district: 'Anantnag',
      monitoredSprings: 36,
      drySeasonDischargeDrop: '-22.4%',
      dryingFrequencyDays: '12 days/year (historically perennial)',
      rechargeConversionHa: '24 ha/year upper limestone forest clearing',
      aquiferVulnerability: 'High / Karstic Conduit Turbidity',
      status: 'High Vigilance'
    },
    {
      cluster: 'Budgam Foothill & Karewa Springs',
      district: 'Budgam',
      monitoredSprings: 52,
      drySeasonDischargeDrop: '-34.2%',
      dryingFrequencyDays: '48 days/year',
      rechargeConversionHa: '52 ha/year brick kiln topsoil stripping',
      aquiferVulnerability: 'Severe / Shallow Aquifer Desiccation',
      status: 'Critical Stress'
    },
    {
      cluster: 'Baramulla & Kupwara Mountain Springs',
      district: 'Baramulla & Kupwara',
      monitoredSprings: 44,
      drySeasonDischargeDrop: '-19.8%',
      dryingFrequencyDays: '18 days/year',
      rechargeConversionHa: '18 ha/year rural road slope excavation',
      aquiferVulnerability: 'Moderate / Winter Snowpack Dependency',
      status: 'Monitored / Stable High Altitudes'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Hydrogeological Telemetry • Karst Conduits & Aquifers"
        breadcrumbs={[
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Earth & Human Impact",
    href: "/earth-human-impact"
  },
  {
    label: "Aquatic & Cryosphere",
    href: "/earth-human-impact/aquatic-cryosphere"
  },
  {
    label: "Springs & Groundwater"
  }
]}
        icon={<Droplet className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-HYDRO
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Springs & Groundwater Discharge Observatory
              </span>
            </div>
          </div>
        }
        subtitle="Hydrogeological springshed inventory, recharge zone satellite classification, and participatory field discharge monitoring across Kashmir."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere/springs-groundwater'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere/springs-groundwater'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere/springs-groundwater'].showcaseItems}
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
            <Link href="/earth-human-impact/aquatic-cryosphere">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-500/20">
                <Satellite className="w-4 h-4 mr-1.5" />
                Aquatic Core
              </Button>
            </Link>
          </div>
        }
      />

      {/* Canonical Overlapping Telemetry KPI Strip */}
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/springs-groundwater'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        {/* Table */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              Regional Springshed Discharge & Recharge Conversion Audit
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Field hydro-gauging dataset covering 180 monitored springs across 4 physiographic zones (2020–2026).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">Springshed Cluster</th>
                  <th className="py-2.5 px-3">Districts</th>
                  <th className="py-2.5 px-3">Monitored Springs</th>
                  <th className="py-2.5 px-3">Dry-Season Discharge Drop</th>
                  <th className="py-2.5 px-3">Drying Frequency</th>
                  <th className="py-2.5 px-3">Satellite Recharge Conversion</th>
                  <th className="py-2.5 px-3">Hydrogeological Risk</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {springClusters.map((c) => (
                  <tr key={c.cluster} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{c.cluster}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{c.district}</td>
                    <td className="py-3 px-3 font-mono text-center text-white">{c.monitoredSprings}</td>
                    <td className="py-3 px-3 font-mono text-rose-400 font-bold whitespace-nowrap">{c.drySeasonDischargeDrop}</td>
                    <td className="py-3 px-3 font-mono text-amber-300 whitespace-nowrap">{c.dryingFrequencyDays}</td>
                    <td className="py-3 px-3 text-slate-300 break-words max-w-[200px] text-[11px]">{c.rechargeConversionHa}</td>
                    <td className="py-3 px-3 text-[11px] text-cyan-300 break-words max-w-[160px]">{c.aquiferVulnerability}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-white/10">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Karewa Recharge Zone Focus */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">The Karewa Aquifer Crisis</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Karewas (lacustrine plateau mounds) act as vital perched aquifers that sustain hundreds of rural springs. 
              The extraction of millions of tons of Karewa silt for the Srinagar Ring Road, railway embankments, and commercial brick kilns 
              has physically severed perched impermeable clay layers, allowing groundwater to drain prematurely rather than 
              feeding downslope community springs.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Between 2016 and 2026, satellite mapping detected 1,280 hectares of Karewa slopes decapitated or deeply excavated across 
              Pulwama, Budgam, and Baramulla districts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Springshed Revival & Catchment Protection</h4>
            <p className="text-slate-300 text-[11px]">
              Kashmir EcoWatch advocates for statutory protection of demarcated springshed recharge zones under the 
              J&K Water Resources Act. Implementing check-dams, staggered contour trenches, and indigenous broadleaf afforestation 
              on Karewa crowns can restore depleted spring discharge by up to 25% within 3 hydrologic cycles.
            </p>
            <div className="pt-2 border-t border-white/5">
              <Link href="/earth-human-impact/aquatic-cryosphere/watershed-cumulative-impact" className="text-cyan-400 hover:text-white font-medium flex items-center gap-1">
                <span>View Watershed Cumulative Impact</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
