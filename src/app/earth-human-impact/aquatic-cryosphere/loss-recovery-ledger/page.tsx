import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

import {
  AlertTriangle,
  Globe2,
  Satellite,
  Scale,
  ShieldCheck,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { EarthHumanImpactNav } from '@/components/earth-human-impact/EarthHumanImpactNav';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EhiiHeroShowcaseCard } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';
import { EHII_HERO_CONFIGS } from '@/data/ehii-hero-presets';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { HIMALAYAN_LOSS_RECOVERY_LEDGER } from '@/data/aquatic-cryosphere-observatory';

export const metadata: Metadata = {
  title: 'Himalayan Environmental Loss & Recovery Ledger (1985–2026) | Kashmir EcoWatch',
  description: 'Permanent multi-decadal historical balance sheet tracking gross loss, active restoration, and net ecosystem balance across Kashmir ecosystems.',
};

export default function LossRecoveryLedgerPage() {
  const totalHistoricalHa = HIMALAYAN_LOSS_RECOVERY_LEDGER.reduce((acc, curr) => acc + curr.historicalExtentHa, 0);
  const totalGrossLossHa = HIMALAYAN_LOSS_RECOVERY_LEDGER.reduce((acc, curr) => acc + curr.documentedGrossLossHa, 0);
  const totalRecoveryHa = HIMALAYAN_LOSS_RECOVERY_LEDGER.reduce((acc, curr) => acc + curr.documentedActiveRecoveryHa, 0);
  const netBalanceHa = HIMALAYAN_LOSS_RECOVERY_LEDGER.reduce((acc, curr) => acc + curr.netEcosystemBalanceHa, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Permanent Ecological Audit • 41-Year Temporal Registry"
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
    label: "Loss & Recovery Ledger"
  }
]}
        icon={<Scale className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                EHII-LEDGER
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Himalayan Loss & Recovery Ledger (1985–2026)
              </span>
            </div>
          </div>
        }
        subtitle="A permanent, public, and auditable accounting of landscape transformation quantifying gross hectares degraded, active restoration, and net ecosystem balance."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <EhiiHeroShowcaseCard
            tag={EHII_HERO_CONFIGS['aquatic-cryosphere/loss-recovery-ledger'].tag}
            badge={EHII_HERO_CONFIGS['aquatic-cryosphere/loss-recovery-ledger'].badge}
            items={EHII_HERO_CONFIGS['aquatic-cryosphere/loss-recovery-ledger'].showcaseItems}
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
      <ModuleKpiStrip kpis={EHII_HERO_CONFIGS['aquatic-cryosphere/loss-recovery-ledger'].kpis} iconColor="text-teal-400" />

      {/* Persistent Submodule Navigation */}
      <EarthHumanImpactNav />

      <div className="page-content__inner py-10 space-y-10">
        <section className="p-6 rounded-2xl bg-slate-900/40 border border-white/10">
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-400" />
              Comprehensive Multi-Decadal Ecosystem Balance Sheet (1985–2026)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Data derived from USGS Landsat 5/7/8/9, IRS 1C/1D LISS-III, Sentinel-1 SAR, Sentinel-2 MSI, and validated government records.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold bg-white/5">
                  <th className="py-2.5 px-3">Ecosystem Domain</th>
                  <th className="py-2.5 px-3">1985 Baseline</th>
                  <th className="py-2.5 px-3">Gross Loss</th>
                  <th className="py-2.5 px-3">Active Recovery</th>
                  <th className="py-2.5 px-3">Net Balance</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Primary Degradation Drivers</th>
                  <th className="py-2.5 px-3">Verified Interventions</th>
                  <th className="py-2.5 px-3">Evidence Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {HIMALAYAN_LOSS_RECOVERY_LEDGER.map((entry) => (
                  <tr key={entry.id} className="hover:bg-white/[0.02] text-slate-300">
                    <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{entry.ecosystemDomain}</td>
                    <td className="py-3 px-3 font-mono whitespace-nowrap">{entry.historicalExtentHa.toLocaleString()} ha</td>
                    <td className="py-3 px-3 font-mono text-rose-400 font-bold whitespace-nowrap">-{entry.documentedGrossLossHa.toLocaleString()} ha</td>
                    <td className="py-3 px-3 font-mono text-teal-300 font-bold whitespace-nowrap">+{entry.documentedActiveRecoveryHa.toLocaleString()} ha</td>
                    <td className="py-3 px-3 font-mono text-amber-300 font-bold whitespace-nowrap">{entry.netEcosystemBalanceHa.toLocaleString()} ha</td>
                    <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">{entry.confidenceIntervalPct}%</td>
                    <td className="py-3 px-3 text-[11px] text-slate-300 break-words max-w-[200px]">
                      {entry.primaryDrivers.slice(0, 2).join(', ')}
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-400 break-words max-w-[220px]">
                      {entry.restorationInterventions[0]}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[10px] text-cyan-400">
                      <Link href="/earth-human-impact/change-detection-observatory/scientific-dossiers" className="hover:underline">
                        {entry.evidenceDossierRef}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Audit Methodology & Public Provenance */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Ledger Accounting Principles & Verifiability
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every hectare recorded in this Ledger must be tied to an identifiable spatial polygon with pre- and post-disturbance 
              spectral reflectance coordinates. A claim of &ldquo;restoration&rdquo; requires multi-year persistent recovery: 
              for example, Wular lake desiltation polygons are only credited to &ldquo;Active Recovery&rdquo; after Sentinel-1 SAR and optical 
              NDWI confirm uninterrupted open-water persistence across four consecutive seasonal cycles.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Glacial ice loss is accounted with zero recovery credits because cryogenic retreat under current Western Himalayan 
              temperature trajectories is physically irreversible on decadal scales.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm">Public Data Access & Scientific Inquiries</h4>
            <p className="text-slate-300 text-[11px]">
              Researchers, civil authorities, and judicial commissions can download full GeoJSON polygon layers, error matrices, 
              and spectral index timeseries for every ledger line item.
            </p>
            <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2">
              <Link 
                href="/earth-human-impact/change-detection-observatory/change-detection-atlas"
                className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 text-xs font-semibold border border-teal-500/40 transition-colors"
              >
                Inspect Spatial Change Atlas
              </Link>
              <Link 
                href="/earth-human-impact/change-detection-observatory/scientific-dossiers"
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-semibold border border-white/10 transition-colors"
              >
                Download Scientific Dossiers
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
