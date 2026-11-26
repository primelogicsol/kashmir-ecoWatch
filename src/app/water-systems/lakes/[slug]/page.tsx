'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { lakesData } from '@/data/water-systems';
import { getMasterLakeBySlugOrId } from '@/data/hydrology/master-lake-registry';
import { LinkedInvestigationsModulePanel } from '@/components/environmental-investigations/LinkedInvestigationsModulePanel';

export default function LakeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lake = lakesData.find((l) => l.slug === slug);
  const master = getMasterLakeBySlugOrId(slug);

  if (!lake) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className=" text-4xl font-bold text-white mb-4">Lake Not Found</h1>
          <p className="text-slate-400">The lake record you requested does not exist in the KEW Master Lake Registry.</p>
        </div>
      </main>
    );
  }

  const relatedLakes = lakesData
    .filter((l) => l.id !== lake.id && l.district === lake.district)
    .slice(0, 4);

  return (
    <div>
      <WaterEntityDetailPageComponent
        entity={lake}
        relatedEntities={relatedLakes}
        color="from-blue-500 to-cyan-600"
        icon="Droplet"
        backRoute="/water-systems"
        listRoute="/water-systems/lakes"
      />

      {master && (
        <section className="bg-slate-950 border-t border-white/10 py-10">
          <div className="container mx-auto px-6 space-y-6">
            <div className="rounded-xl border border-cyan-500/25 bg-slate-900/80 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Authoritative Master Lake Registry Record · {master.kewLakeId}
                  </div>
                  <h2 className="text-xl font-bold text-white mt-0.5">
                    Multi-Source Reconciliation, Historical Area &amp; Carlson Trophic Provenance
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Link
                    href="/sectoral-eia/reports/kew-sr-2026-101"
                    className="rounded-md border border-emerald-500/40 bg-emerald-950/50 px-3 py-1.5 font-semibold text-emerald-300 hover:bg-emerald-900/50"
                  >
                    Flagship Monograph KEW-SR-2026-101 →
                  </Link>
                  <a
                    href="/data/kew-kashmir-master-lakes.csv"
                    download
                    className="rounded-md border border-white/15 bg-slate-950 px-3 py-1.5 font-mono text-slate-200 hover:text-white"
                  >
                    Download Master CSV
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="rounded-lg border border-white/10 bg-slate-950 p-3.5">
                  <div className="text-slate-400 font-mono text-[11px]">Trophic Classification</div>
                  <div className="text-base font-bold text-white mt-1">{master.trophicStatus}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{master.trophicConfidence}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950 p-3.5">
                  <div className="text-slate-400 font-mono text-[11px]">Multi-Epoch Area</div>
                  <div className="text-base font-bold text-cyan-300 mt-1">
                    {master.latestVerifiedAreaHa !== null ? `${master.latestVerifiedAreaHa} ha` : 'Tabular Record'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {master.latestAreaEpoch}
                    {master.historicalAreaHa !== null ? ` (1992: ${master.historicalAreaHa} ha)` : ''}
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950 p-3.5">
                  <div className="text-slate-400 font-mono text-[11px]">Carlson TSI Diagnostics</div>
                  <div className="text-sm font-mono font-bold text-emerald-300 mt-1">
                    SD: {master.carlsonTsi.tsiSecchi ?? 'N/A'} · Chl-a: {master.carlsonTsi.tsiChlorophyllA ?? 'N/A'} · TP: {master.carlsonTsi.tsiTotalPhosphorus ?? 'N/A'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {master.carlsonTsi.observationPeriod || 'No dated chemical series'}
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950 p-3.5">
                  <div className="text-slate-400 font-mono text-[11px]">Controlling Jurisdiction</div>
                  <div className="text-sm font-semibold text-white mt-1">{master.controllingAuthority}</div>
                  <div className="text-[11px] text-amber-300 mt-0.5">{master.conservationPriority}</div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-slate-950 p-4 text-xs text-slate-300 space-y-2">
                <div>
                  <strong className="text-white">Methodological &amp; Boundary Note: </strong>
                  {master.carlsonTsi.methodologicalNote} ({master.areaDefinition}; Coordinate precision: {master.coordinatePrecision}).
                </div>
                <div>
                  <strong className="text-white">Immutable Source Record IDs: </strong>
                  <span className="font-mono text-cyan-300">{master.sourceRecordIds.join(' · ')}</span>
                </div>
                {master.glofSusceptibility && (
                  <div>
                    <strong className="text-amber-300">Cryosphere / GLOF Hazard Assessment (Separate from Trophic Status): </strong>
                    Susceptibility class <strong>{master.glofSusceptibility.susceptibilityClass}</strong> · 1992→2024 area change:{' '}
                    {master.glofSusceptibility.growthPercent1992To2024}% · Perimeter: {master.glofSusceptibility.perimeterM} m (DOI: {master.glofSusceptibility.sourceDoi}).
                  </div>
                )}
                {master.citations.length > 0 && (
                  <div className="pt-1 border-t border-white/5">
                    <strong className="text-white">Traceable Sources: </strong>
                    {master.citations.join(' | ')}
                  </div>
                )}
              </div>
            </div>

            <LinkedInvestigationsModulePanel
              title={`Environmental Investigations & Intervention Audits — ${lake.name}`}
              subtitle="Evaluating documented ecological outcomes of dredging, mechanized/manual de-weeding, aeration, catchment management, and statutory conservation expenditure."
              routeMatch={`/water-systems/lakes/${slug}`}
              investigationCodes={
                slug === 'dal-lake'
                  ? ['KEW-INV-0001', 'KEW-INV-0003', 'KEW-INV-0009', 'KEW-INV-0010', 'KEW-INV-0011', 'KEW-INV-0012']
                  : slug === 'wular-lake'
                  ? ['KEW-INV-0005', 'KEW-INV-0009']
                  : slug === 'sheshnag-lake'
                  ? ['KEW-INV-0002', 'KEW-INV-0009']
                  : undefined
              }
            />
          </div>
        </section>
      )}
    </div>
  );
}
