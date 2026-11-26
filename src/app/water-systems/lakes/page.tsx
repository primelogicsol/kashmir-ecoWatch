'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { lakesData } from '@/data/water-systems';
import {
  KASHMIR_10_DISTRICT_LAKE_SUMMARY,
  MASTER_LAKE_REGISTRY,
  MASTER_LAKE_SUMMARY_STATS,
  type MasterTrophicStatus,
} from '@/data/hydrology/master-lake-registry';
import { RegionalLakeTrophicAtlasMap } from '@/components/water/RegionalLakeTrophicAtlasMap';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Droplet,
  Mountain,
  Waves,
  ShieldAlert,
  Sparkles,
  MapPin,
  Activity,
  CheckCircle2,
  ChevronRight,
  Eye,
  Layers,
  Download,
  FileText,
  Database,
  HelpCircle,
} from 'lucide-react';

export default function LakesPage() {
  const [scopeMode, setScopeMode] = useState<'kashmir' | 'all'>('kashmir');
  const [settingFilter, setSettingFilter] = useState<string>('ALL');
  const [trophicFilter, setTrophicFilter] = useState<string>('ALL');
  const [persistenceFilter, setPersistenceFilter] = useState<string>('ALL');
  const [dataAvailFilter, setDataAvailFilter] = useState<string>('ALL');
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [atlasView, setAtlasView] = useState<'map' | 'table' | 'completeness'>('map');

  const scopedMasterLakes = useMemo(
    () =>
      scopeMode === 'kashmir'
        ? MASTER_LAKE_REGISTRY.filter((m) => m.regionalScope === 'Kashmir Division')
        : MASTER_LAKE_REGISTRY,
    [scopeMode]
  );

  const filteredMasterLakes = useMemo(() => {
    return scopedMasterLakes.filter((m) => {
      if (districtFilter !== 'ALL' && m.district !== districtFilter) return false;
      if (settingFilter !== 'ALL' && m.ecologicalSetting !== settingFilter) return false;
      if (trophicFilter !== 'ALL' && m.trophicStatus !== trophicFilter) return false;
      if (persistenceFilter === 'ACTIVE' && m.persistence === 'Historically Disappeared / Converted')
        return false;
      if (
        persistenceFilter === 'DISAPPEARED' &&
        m.persistence !== 'Historically Disappeared / Converted'
      )
        return false;
      if (persistenceFilter === 'EXPANDED' && !m.areaChangeClass.startsWith('Expanded')) return false;
      if (persistenceFilter === 'DECREASED' && !m.areaChangeClass.startsWith('Decreased')) return false;
      if (dataAvailFilter === 'ASSESSED' && m.trophicStatus === 'Insufficient Evidence') return false;
      if (dataAvailFilter === 'UNASSESSED' && m.trophicStatus !== 'Insufficient Evidence') return false;
      if (dataAvailFilter === 'POLYGON' && !m.polygonRingWgs84) return false;
      return true;
    });
  }, [
    scopedMasterLakes,
    districtFilter,
    settingFilter,
    trophicFilter,
    persistenceFilter,
    dataAvailFilter,
  ]);

  const allowedSlugs = useMemo(
    () => new Set(filteredMasterLakes.map((m) => m.slug)),
    [filteredMasterLakes]
  );

  const displayedEntities = useMemo(
    () => lakesData.filter((e) => allowedSlugs.has(e.slug)),
    [allowedSlugs]
  );

  const categories = useMemo(
    () => [...new Set(displayedEntities.map((l) => l.category))].sort(),
    [displayedEntities]
  );
  const districts = useMemo(
    () => [...new Set(scopedMasterLakes.map((l) => l.district))].filter(Boolean).sort(),
    [scopedMasterLakes]
  );

  const S = MASTER_LAKE_SUMMARY_STATS;

  return (
    <WaterEntityListingPage
      title="Kashmir Lakes Intelligence & Trophic Atlas"
      description={`Authoritative deduplicated lake inventory reconciling 415 DEERS (2012) Kashmir waterbodies, 330 CAG (2025) historical comparison lakes, 155 University of Kashmir (2025) glacial lake polygons, and 37 Jal Shakti census lakes into ${S.kashmirDivisionTotalUniqueIdentities} unique Kashmir Division lake identities (+${S.extendedWesternHimalayanReferenceLakes} extended Western Himalayan reference lakes).`}
      icon="Droplets"
      color="from-blue-600 via-cyan-600 to-teal-500"
      entities={displayedEntities}
      entityType="Lakes"
      kpis={[
        { label: 'Unique Kashmir Lakes', value: S.kashmirDivisionTotalUniqueIdentities, icon: 'Droplets' },
        { label: 'DEERS 2012 Records', value: 415, icon: 'Database', color: 'text-cyan-400' },
        { label: 'CAG 2025 Historical', value: 330, icon: 'FileText', color: 'text-amber-400' },
        { label: 'Glacial GIS Polygons', value: 155, icon: 'Mountain', color: 'text-sky-400' },
        {
          label: 'Verified Oligotrophic',
          value: S.kashmirTrophicBreakdown.Oligotrophic,
          icon: 'CheckCircle2',
          color: 'text-emerald-400',
        },
        {
          label: 'Eutrophic / Hypereutr.',
          value: S.kashmirTrophicBreakdown.Eutrophic + S.kashmirTrophicBreakdown.Hypereutrophic,
          icon: 'ShieldAlert',
          color: 'text-rose-400',
        },
        {
          label: 'Insufficient Evidence',
          value: S.kashmirTrophicBreakdown['Insufficient Evidence'],
          icon: 'Eye',
          color: 'text-slate-300',
        },
        { label: 'Kashmir Districts', value: 10, icon: 'MapPin', color: 'text-teal-400' },
      ]}
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'],
      }}
      getEntitySlug={(entity) => `/water-systems/lakes/${entity.slug}`}
      getCategory={(entity) => entity.category}
    >
      {/* ── Flagship Monograph & Multi-Source Reconciliation Banner (Section 8) ── */}
      <div className="mb-8 rounded-2xl border border-cyan-500/25 bg-slate-900/80 p-5 sm:p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <span>KEW Flagship Limnological Initiative</span>
              <span>·</span>
              <Badge variant="info" size="sm">
                KEW-SR-2026-101
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Kashmir&apos;s Lakes: From Oligotrophy to Eutrophication — Regional Trophic Status Atlas
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-4xl leading-relaxed">
              Source inventories overlap and are reconciled spatially rather than added together. Current trophic status is assigned strictly where dated Secchi, Chlorophyll-a, or Total Phosphorus evidence exists ({S.kashmirWithVerifiedTrophicStatus} lakes); all {S.kashmirRequiringTrophicAssessment} unmeasured Kashmir lakes are displayed transparently as <strong>Insufficient Evidence</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link href="/sectoral-eia/reports/kew-sr-2026-101">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                Read 20-Chapter Monograph
              </Button>
            </Link>
            <a href="/data/kew-kashmir-master-lakes.csv" download>
              <Button size="sm" variant="outline" className="border-white/20 text-slate-200">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Master CSV ({S.combinedPlatformMasterRecords})
              </Button>
            </a>
            <a href="/data/kew-kashmir-master-lakes.geojson" download>
              <Button size="sm" variant="outline" className="border-cyan-500/40 text-cyan-300">
                <Layers className="w-3.5 h-3.5 mr-1.5" />
                GeoJSON
              </Button>
            </a>
          </div>
        </div>

        {/* Source Reconciliation Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-white/10 bg-slate-950 p-3.5">
            <div className="text-[11px] font-mono uppercase text-slate-400">Departmental Records</div>
            <div className="text-2xl font-black text-white mt-0.5">415</div>
            <div className="text-[11px] text-cyan-400">DEERS 2012 Kashmir (100% extracted + 45 conv.)</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950 p-3.5">
            <div className="text-[11px] font-mono uppercase text-slate-400">Historical CAG Records</div>
            <div className="text-2xl font-black text-white mt-0.5">330</div>
            <div className="text-[11px] text-amber-300">56 vanished · 144 shrunk · 317 appendix queued</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950 p-3.5">
            <div className="text-[11px] font-mono uppercase text-slate-400">Glacial GIS Polygons</div>
            <div className="text-2xl font-black text-white mt-0.5">155</div>
            <div className="text-[11px] text-sky-400">UoK Zenodo 2025 (77 matched + 78 new)</div>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-3.5">
            <div className="text-[11px] font-mono uppercase text-emerald-400">Unique Verified Total</div>
            <div className="text-2xl font-black text-emerald-300 mt-0.5">
              {S.kashmirDivisionTotalUniqueIdentities}
            </div>
            <div className="text-[11px] text-slate-300">
              Kashmir Division (+{S.extendedWesternHimalayanReferenceLakes} Extended WH)
            </div>
          </div>
        </div>

        {/* Multi-Dimensional Atlas Filters (Section 30) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1 text-xs">
          <select
            value={scopeMode}
            onChange={(e) => setScopeMode(e.target.value as 'kashmir' | 'all')}
            className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-200"
          >
            <option value="kashmir">Kashmir Division ({S.kashmirDivisionTotalUniqueIdentities})</option>
            <option value="all">All Western Himalaya ({S.combinedPlatformMasterRecords})</option>
          </select>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-200"
          >
            <option value="ALL">All Districts ({districts.length})</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d} ({scopedMasterLakes.filter((m) => m.district === d).length})
              </option>
            ))}
          </select>

          <select
            value={settingFilter}
            onChange={(e) => setSettingFilter(e.target.value)}
            className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-200"
          >
            <option value="ALL">All Ecological Settings</option>
            <option value="Urban">Urban ({S.kashmirUrbanLakes})</option>
            <option value="Rural / Floodplain">Rural / Floodplain ({S.kashmirRuralFloodplainLakes})</option>
            <option value="Montane / Forest">Montane / Forest</option>
            <option value="Subalpine">Subalpine</option>
            <option value="Alpine">Alpine ({S.kashmirAlpineLakes})</option>
          </select>

          <select
            value={trophicFilter}
            onChange={(e) => setTrophicFilter(e.target.value)}
            className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-200"
          >
            <option value="ALL">All Trophic States</option>
            <option value="Oligotrophic">Oligotrophic ({S.kashmirTrophicBreakdown.Oligotrophic})</option>
            <option value="Mesotrophic">Mesotrophic ({S.kashmirTrophicBreakdown.Mesotrophic})</option>
            <option value="Eutrophic">Eutrophic ({S.kashmirTrophicBreakdown.Eutrophic})</option>
            <option value="Hypereutrophic">Hypereutrophic ({S.kashmirTrophicBreakdown.Hypereutrophic})</option>
            <option value="Insufficient Evidence">
              Insufficient Evidence ({S.kashmirTrophicBreakdown['Insufficient Evidence']})
            </option>
          </select>

          <select
            value={persistenceFilter}
            onChange={(e) => setPersistenceFilter(e.target.value)}
            className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-200"
          >
            <option value="ALL">All Persistence / Change</option>
            <option value="ACTIVE">Currently Observed ({S.kashmirActiveOrObservedLakes})</option>
            <option value="DISAPPEARED">
              Historically Disappeared / Conv. ({S.kashmirHistoricallyDisappearedOrConverted})
            </option>
            <option value="EXPANDED">Expanded Area (1992→2024)</option>
            <option value="DECREASED">Decreased Area</option>
          </select>

          <select
            value={dataAvailFilter}
            onChange={(e) => setDataAvailFilter(e.target.value)}
            className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-slate-200"
          >
            <option value="ALL">All Evidence Tiers</option>
            <option value="ASSESSED">Dated Trophic Evidence ({S.kashmirWithVerifiedTrophicStatus})</option>
            <option value="UNASSESSED">Insufficient Evidence ({S.kashmirRequiringTrophicAssessment})</option>
            <option value="POLYGON">WGS84 Polygon Mapped (155)</option>
          </select>
        </div>

        {/* Atlas View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAtlasView('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                atlasView === 'map'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-950 text-slate-300 border border-white/10'
              }`}
            >
              Interactive Trophic Map ({filteredMasterLakes.length})
            </button>
            <button
              type="button"
              onClick={() => setAtlasView('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                atlasView === 'table'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-950 text-slate-300 border border-white/10'
              }`}
            >
              Carlson TSI &amp; Chemistry Ledger
            </button>
            <button
              type="button"
              onClick={() => setAtlasView('completeness')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                atlasView === 'completeness'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-950 text-slate-300 border border-white/10'
              }`}
            >
              10-District &amp; Source Completeness Control
            </button>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Filtered Master Records: <strong className="text-cyan-300">{filteredMasterLakes.length}</strong>
          </span>
        </div>

        {atlasView === 'map' && <RegionalLakeTrophicAtlasMap lakes={filteredMasterLakes} />}

        {atlasView === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950 max-h-[460px]">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-900 border-b border-white/10 text-slate-300">
                <tr>
                  <th className="px-3 py-2.5">KEW ID &amp; Lake</th>
                  <th className="px-3 py-2.5">District</th>
                  <th className="px-3 py-2.5">Setting / Elev.</th>
                  <th className="px-3 py-2.5">Latest Area</th>
                  <th className="px-3 py-2.5">Trophic State</th>
                  <th className="px-3 py-2.5">SD / Chl-a / TP</th>
                  <th className="px-3 py-2.5">Carlson TSI (SD / Chl / TP)</th>
                  <th className="px-3 py-2.5">Sources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                {filteredMasterLakes.slice(0, 120).map((m) => (
                  <tr key={m.kewLakeId} className="hover:bg-white/5">
                    <td className="px-3 py-2">
                      <Link
                        href={`/water-systems/lakes/${m.slug}`}
                        className="font-semibold text-cyan-300 hover:underline"
                      >
                        {m.officialName}
                      </Link>
                      <span className="block text-[10px] font-mono text-slate-500">{m.kewLakeId}</span>
                    </td>
                    <td className="px-3 py-2">{m.district}</td>
                    <td className="px-3 py-2 font-mono">
                      {m.ecologicalSetting} · {m.elevationM}m
                    </td>
                    <td className="px-3 py-2 font-mono">
                      {m.latestVerifiedAreaHa !== null ? `${m.latestVerifiedAreaHa} ha` : '—'}
                    </td>
                    <td className="px-3 py-2 font-semibold">{m.trophicStatus}</td>
                    <td className="px-3 py-2 font-mono text-[11px]">
                      {m.carlsonTsi.secchiDepthM ?? '—'}m / {m.carlsonTsi.chlorophyllAUgL ?? '—'} /{' '}
                      {m.carlsonTsi.totalPhosphorusUgL ?? '—'} µg/L
                    </td>
                    <td className="px-3 py-2 font-mono text-[11px] text-emerald-300">
                      {m.carlsonTsi.tsiSecchi ?? '—'} / {m.carlsonTsi.tsiChlorophyllA ?? '—'} /{' '}
                      {m.carlsonTsi.tsiTotalPhosphorus ?? '—'}
                    </td>
                    <td className="px-3 py-2 text-[10px] text-slate-400">
                      {m.sourceInventoryTags.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {atlasView === 'completeness' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 border-b border-white/10 text-slate-300">
                  <tr>
                    <th className="px-3 py-2">External Source</th>
                    <th className="px-3 py-2">Expected Kashmir</th>
                    <th className="px-3 py-2">Parsed</th>
                    <th className="px-3 py-2">Queued</th>
                    <th className="px-3 py-2">Verification &amp; Completeness Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  {S.externalSourceCompleteness.map((sc) => (
                    <tr key={sc.sourceId}>
                      <td className="px-3 py-2 font-semibold text-white">{sc.title}</td>
                      <td className="px-3 py-2 font-mono">{sc.expectedKashmirRecords}</td>
                      <td className="px-3 py-2 font-mono text-emerald-400">{sc.parsedKashmirRecords}</td>
                      <td className="px-3 py-2 font-mono text-amber-300">{sc.awaitingExtraction}</td>
                      <td className="px-3 py-2 text-slate-400">{sc.outOfBoundaryNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
              {KASHMIR_10_DISTRICT_LAKE_SUMMARY.map((d) => (
                <div key={d.district} className="rounded-lg border border-white/10 bg-slate-950 p-3">
                  <div className="font-bold text-white">{d.district}</div>
                  <div className="text-lg font-black text-cyan-300 font-mono mt-0.5">
                    {d.totalVerifiedLakeIdentities} lakes
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {d.currentlyObservedLakes} active · {d.glacialPolygonMapped} GIS poly ·{' '}
                    {d.trophicDistribution['Insufficient Evidence']} unassessed
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </WaterEntityListingPage>
  );
}
