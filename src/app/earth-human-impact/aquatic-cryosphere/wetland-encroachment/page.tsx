import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  AlertTriangle,
  Droplets,
  Globe2,
  Layers,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Wetland Encroachment & Habitat Loss Observatory | Kashmir EcoWatch',
  description: 'Monitoring Ramsar wetland boundary violations, siltation conversions, reedbed destruction, and flood buffering capacity across Kashmir.',
};

export default function WetlandEncroachmentPage() {
  const wetlands = [
    {
      name: 'Hokersar Ramsar Wetland',
      district: 'Budgam / Srinagar',
      notifiedAreaHa: '1,375 ha',
      functionalMarshHa: '940 ha',
      lossPct: '-31.6%',
      primaryDriver: 'Doodhganga flood spill channel siltation & northern peripheral boundary filling for settlements',
      ramsarStatus: 'Ramsar Site No. 1570 (Designated 2005)',
      condition: 'Critical Siltation / Habitat Fragmentation'
    },
    {
      name: 'Haigam Wetland Reserve',
      district: 'Baramulla',
      notifiedAreaHa: '725 ha',
      functionalMarshHa: '495 ha',
      lossPct: '-31.7%',
      primaryDriver: 'Paddy field conversion, willow plantation encroaching open channels, and unauthorized drainage channels',
      ramsarStatus: 'Ramsar Site No. 2489 (Designated 2022)',
      condition: 'High Stress'
    },
    {
      name: 'Shallabugh Wetland Reserve',
      district: 'Ganderbal',
      notifiedAreaHa: '1,675 ha',
      functionalMarshHa: '1,280 ha',
      lossPct: '-23.5%',
      primaryDriver: 'Sind river bedload siltation, seasonal desiccation, and cattle grazing on peripheral reedbeds',
      ramsarStatus: 'Ramsar Site No. 2490 (Designated 2022)',
      condition: 'Active Habitat Restabilization'
    },
    {
      name: 'Mirgund Wetland',
      district: 'Baramulla / Budgam',
      notifiedAreaHa: '400 ha',
      functionalMarshHa: '185 ha',
      lossPct: '-53.7%',
      primaryDriver: 'Loss of feeding streams, deep drainage ditches, and conversion of seasonal marsh to brick kiln clay extraction',
      ramsarStatus: 'Protected Wetland Reserve',
      condition: 'Severe Desiccation'
    },
    {
      name: 'Wular Wetland Margins',
      district: 'Bandipora',
      notifiedAreaHa: '13,000 ha (Buffer)',
      functionalMarshHa: '10,450 ha',
      lossPct: '-19.6%',
      primaryDriver: 'Historic social forestry willow plantations, shoreline agricultural bunding, and silt delta expansion',
      ramsarStatus: 'Ramsar Site No. 461 (Designated 1990)',
      condition: 'Restoration Underway (Willow extraction)'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Ramsar Telemetry • Siltation & Flood Buffers"
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
    label: "Wetland Encroachment"
  }
]}
        icon={<Droplets className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-WETLAND
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Wetland Encroachment & Habitat Loss
              </span>
            </div>
          </div>
        }
        subtitle="Monitoring Ramsar wetland boundary violations, siltation conversions, reedbed destruction, and flood buffering capacity across Kashmir."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere/wetland-encroachment'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere/wetland-encroachment'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere/wetland-encroachment'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/wetland-encroachment'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        {/* Table */}
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Notified Ramsar & Protected Wetlands Balance Sheet
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Documenting discrepancies between legal revenue boundary notifications and actual 2026 functional marsh areas.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">Wetland Name</th>
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Notified Extent</th>
                  <th className="py-2.5 px-3">2026 Functional Marsh</th>
                  <th className="py-2.5 px-3">Net Area Shift</th>
                  <th className="py-2.5 px-3">Primary Degradation Vector</th>
                  <th className="py-2.5 px-3">Conservation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {wetlands.map((w) => (
                  <tr key={w.name} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{w.name}</td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">{w.district}</td>
                    <td className="py-3 px-3 font-mono whitespace-nowrap">{w.notifiedAreaHa}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300 font-bold whitespace-nowrap">{w.functionalMarshHa}</td>
                    <td className="py-3 px-3 font-mono text-rose-400 font-bold whitespace-nowrap">{w.lossPct}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-300 break-words max-w-[220px]">{w.primaryDriver}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-white/10">
                        {w.condition}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ramsar Seasonal Filtering Note */}
        <section className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">Scientific Adherence to Ramsar Remote Sensing Protocols</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Himalayan valley wetlands exhibit intense natural seasonal water-level fluctuation. To prevent false-positive encroachment alerts, 
                our system correlates high-water spring melt observations (April–May) with dry-autumn low-water observations (October–November). 
                An area is only classified as converted when Sentinel-1 SAR backscatter confirms continuous terrestrial ground surface for at least 
                24 consecutive months.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
