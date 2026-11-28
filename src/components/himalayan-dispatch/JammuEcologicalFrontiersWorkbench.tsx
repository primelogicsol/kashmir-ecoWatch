'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Compass,
  Database,
  Droplets,
  Layers,
  MapPin,
  Mountain,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import {
  JAMMU_COMMON_DATA_INFRASTRUCTURE,
  JAMMU_FLAGSHIP_INVESTIGATIONS,
  JAMMU_GEOGRAPHICAL_NODES,
  JAMMU_PUBLICATION_STANDARD_10,
  type JammuGeographicalNode,
  type JammuInvestigationNumber,
  type JammuMapNodeCategory,
} from '@/data/himalayan-dispatch-jammu-frontiers-monograph';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

interface JammuEcologicalFrontiersWorkbenchProps {
  defaultInvestigation?: 'all' | JammuInvestigationNumber;
  compact?: boolean;
}

const MAP_BOUNDS = {
  minLat: 32.3,
  maxLat: 33.5,
  minLng: 74.5,
  maxLng: 75.9,
};

function projectNodeToPercent(lat: number, lng: number): { xPct: number; yPct: number } {
  const xPct = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 84 + 8;
  const yPct = (1 - (lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 80 + 10;
  return {
    xPct: Math.min(92, Math.max(8, xPct)),
    yPct: Math.min(90, Math.max(10, yPct)),
  };
}

export function JammuEcologicalFrontiersWorkbench({
  defaultInvestigation = 'all',
  compact = false,
}: JammuEcologicalFrontiersWorkbenchProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'experiments' | 'infrastructure' | 'workflow'>(
    'map'
  );
  const [invFilter, setInvFilter] = useState<'all' | JammuInvestigationNumber>(
    defaultInvestigation
  );
  const [catFilter, setCatFilter] = useState<'all' | JammuMapNodeCategory>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(() => {
    if (defaultInvestigation === '02') return 'node-basantar';
    if (defaultInvestigation === '03') return 'node-surinsar';
    return 'node-baglihar';
  });

  // Illustrative Protocol Equation Sandbox State (strictly conceptual, non-empirical)
  const [impoundedReachKm, setImpoundedReachKm] = useState<number>(118);
  const [cascadeTrapPct, setCascadeTrapPct] = useState<number>(68);
  const [extractionMtYr, setExtractionMtYr] = useState<number>(4.8);
  const [replenishmentMtYr, setReplenishmentMtYr] = useState<number>(2.9);
  const [wetlandIntactPct, setWetlandIntactPct] = useState<number>(62);

  const filteredNodes = useMemo(() => {
    return JAMMU_GEOGRAPHICAL_NODES.filter((n) => {
      if (invFilter !== 'all' && n.investigationNumber !== invFilter) return false;
      if (catFilter !== 'all' && n.category !== catFilter) return false;
      return true;
    });
  }, [invFilter, catFilter]);

  const activeNode: JammuGeographicalNode = useMemo(() => {
    return (
      filteredNodes.find((n) => n.id === selectedNodeId) ||
      filteredNodes[0] ||
      JAMMU_GEOGRAPHICAL_NODES[0]
    );
  }, [filteredNodes, selectedNodeId]);

  const filteredExperiments = useMemo(() => {
    const all = JAMMU_FLAGSHIP_INVESTIGATIONS.flatMap((inv) =>
      inv.experiments.map((exp) => ({
        ...exp,
        investigationTitle: inv.title,
        storySlug: inv.storySlug,
      }))
    );
    if (invFilter === 'all') return all;
    return all.filter((e) => e.investigationNumber === invFilter);
  }, [invFilter]);

  const filteredInfrastructure = useMemo(() => {
    if (invFilter === 'all') return JAMMU_COMMON_DATA_INFRASTRUCTURE;
    return JAMMU_COMMON_DATA_INFRASTRUCTURE.filter((row) =>
      row.applicableInvestigations.includes(invFilter)
    );
  }, [invFilter]);

  // Illustrative physical equation outputs
  const mainstemReferenceKm = 210;
  const modificationRatio = Math.min(1, impoundedReachKm / mainstemReferenceKm);
  const residualSedimentPct = Math.max(0, 100 - cascadeTrapPct);
  const extractionRatio = replenishmentMtYr > 0 ? extractionMtYr / replenishmentMtYr : 0;
  const relativeFloodBufferPct = Math.round(wetlandIntactPct * 0.85);

  return (
    <section
      aria-label="Jammu Division Scientific Investigations Interactive Workbench"
      className="my-10 border p-5 sm:p-8 space-y-6"
      style={{
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
      }}
    >
      {/* Header & Epistemic Guardrail Banner */}
      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        <div className="space-y-1.5">
          <p className="hd-kicker">
            INTERACTIVE RESEARCH ARCHITECTURE &nbsp;·&nbsp; JAMMU&apos;S ECOLOGICAL FRONTIERS
          </p>
          <h3
            className="hd-font-display text-2xl sm:text-4xl font-semibold leading-tight"
            style={{ color: 'var(--hd-fg)' }}
          >
            Integrated Basin Geography, 20 Experiments &amp; Physical Protocols
          </h3>
          <p
            className="hd-font-body text-xs sm:text-sm leading-relaxed max-w-3xl"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Coupling the Chenab hydroelectric gorge (Investigation 01), piedmont gravel-bed rivers
            Tawi, Ravi, Ujh &amp; Basantar (Investigation 02), and Jammu’s Ramsar and floodplain
            wetlands (Investigation 03) across a 41-year (1985–2026) research target baseline.
          </p>
        </div>

        {/* Investigation Scope Selector */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {(
            [
              { key: 'all', label: 'All 3 Investigations' },
              { key: '01', label: '01 · Chenab Cascade' },
              { key: '02', label: '02 · Riverbed Mining' },
              { key: '03', label: '03 · Jammu Wetlands' },
            ] as const
          ).map((btn) => {
            const active = invFilter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => setInvFilter(btn.key)}
                className="hd-font-sans px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase border transition-colors cursor-pointer"
                style={{
                  borderColor: active ? '#8C3125' : 'var(--hd-rule-strong)',
                  backgroundColor: active ? '#8C3125' : 'transparent',
                  color: active ? '#F2EFE7' : 'var(--hd-fg-secondary)',
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Epistemic Guardrail Strip */}
      <div
        className="p-3.5 border-l-2 flex items-start gap-3 text-xs hd-font-body leading-relaxed"
        style={{
          borderColor: 'var(--hd-copper)',
          backgroundColor: 'rgba(140, 49, 37, 0.06)',
          color: 'var(--hd-fg-secondary)',
        }}
      >
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--hd-copper)' }} />
        <div>
          <strong style={{ color: 'var(--hd-fg)' }}>
            Scientific Discovery Before Editorial Conclusions:
          </strong>{' '}
          The 45 chapters, 20 experiments, and 41-year (1985–2026) baseline are proposed research
          targets. No original satellite processing, hydrological simulations, or field verification
          has yet been completed for these investigations.
        </div>
      </div>

      {/* Mode Tabs */}
      <div
        className="flex flex-wrap gap-2 border-b pb-3"
        style={{ borderColor: 'var(--hd-rule)' }}
      >
        {[
          {
            id: 'map',
            label: 'Integrated Geographical Coverage (15 Nodes)',
            icon: Compass,
          },
          {
            id: 'experiments',
            label: '20 Proposed Experiments & Protocol Sandbox',
            icon: Sliders,
          },
          {
            id: 'infrastructure',
            label: '12-Source Data Infrastructure',
            icon: Database,
          },
          {
            id: 'workflow',
            label: '10-Stage Publication Standard',
            icon: CheckCircle2,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isAct = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase border transition-colors cursor-pointer"
              style={{
                borderColor: isAct ? 'var(--hd-copper)' : 'var(--hd-rule)',
                backgroundColor: isAct ? 'var(--hd-copper-soft)' : 'transparent',
                color: isAct ? 'var(--hd-copper)' : 'var(--hd-fg-secondary)',
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INTEGRATED GEOGRAPHICAL COVERAGE */}
      {activeTab === 'map' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'all', label: 'All Basin Systems (15)' },
                { key: 'mountain_hydropower', label: '🏔️ Chenab Gorge & Hydropower (4)' },
                { key: 'river_system', label: '🌊 Rivers & Mining Corridors (5)' },
                { key: 'wetland_ecosystem', label: '🌿 Ramsar & Regional Wetlands (6)' },
              ].map((cf) => {
                const active = catFilter === cf.key;
                return (
                  <button
                    key={cf.key}
                    type="button"
                    onClick={() => setCatFilter(cf.key as any)}
                    className="hd-font-sans px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase border cursor-pointer"
                    style={{
                      borderColor: active ? 'var(--hd-copper)' : 'var(--hd-rule)',
                      color: active ? 'var(--hd-fg)' : 'var(--hd-fg-muted)',
                    }}
                  >
                    {cf.label}
                  </button>
                );
              })}
            </div>
            <span className="hd-folio-meta">
              CLICK ANY BASIN NODE TO INSPECT DOCUMENTED ANCHOR &amp; RESEARCH FOCUS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Spatial Schematic Canvas of Jammu Division (74.5°E–75.9°E, 32.3°N–33.5°N) */}
            <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[410px] bg-[#14171A] text-[#F2EFE7] border border-[#F2EFE7]/15 overflow-hidden p-4 flex flex-col justify-between">
              {/* Topographic & Drainage Schematic SVG Backdrop */}
              <svg
                viewBox="0 0 600 400"
                className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern id="jammuGrid" width="60" height="50" patternUnits="userSpaceOnUse">
                    <path
                      d="M 60 0 L 0 0 0 50"
                      fill="none"
                      stroke="#D8C3A5"
                      strokeWidth="0.4"
                      strokeOpacity="0.28"
                    />
                  </pattern>
                </defs>
                <rect width="600" height="400" fill="url(#jammuGrid)" />
                {/* Schematic Chenab Gorge Arc (Kishtwar -> Ramban -> Sawalkote -> Salal -> Akhnoor) */}
                <path
                  d="M 520 65 C 430 115, 375 135, 315 128 C 255 122, 205 142, 148 205 C 122 236, 98 258, 72 280"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                />
                {/* Schematic Tawi, Basantar, Ujh & Ravi Piedmont Drainage */}
                <path
                  d="M 290 175 C 245 225, 210 262, 180 305"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1.8"
                />
                <path
                  d="M 325 245 C 305 285, 288 318, 268 355"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1.6"
                />
                <path
                  d="M 435 235 C 415 280, 395 320, 375 365"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1.8"
                />
                <path
                  d="M 525 265 C 495 310, 470 345, 445 380"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="2"
                />
                {/* Elevation Belt Labels */}
                <text x="18" y="34" fill="#D8C3A5" fontSize="10" letterSpacing="2">
                  GREATER HIMALAYA &amp; CHENAB GORGE (KISHTWAR · DODA · RAMBAN · REASI)
                </text>
                <text x="18" y="210" fill="#A39B8B" fontSize="9.5" letterSpacing="1.8">
                  SIWALIK ANTICLINES &amp; KANDI ESCARPMENT (UDHAMPUR · SURINSAR–MANSAR)
                </text>
                <text x="18" y="384" fill="#86EFAC" fontSize="9.5" letterSpacing="1.8">
                  ALLUVIAL PLAINS &amp; WETLAND SHIELD (AKHNOOR · JAMMU · SAMBA · KATHUA)
                </text>
              </svg>

              {/* Interactive Georeferenced Node Pins */}
              <div className="relative flex-1 w-full">
                {filteredNodes.map((node) => {
                  const { xPct, yPct } = projectNodeToPercent(node.lat, node.lng);
                  const isSelected = activeNode.id === node.id;
                  const ringColor =
                    node.category === 'mountain_hydropower'
                      ? 'border-amber-400 bg-amber-950/90'
                      : node.category === 'river_system'
                      ? 'border-sky-400 bg-sky-950/90'
                      : 'border-emerald-400 bg-emerald-950/90';

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedNodeId(node.id)}
                      style={{ left: `${xPct}%`, top: `${yPct}%` }}
                      title={`${node.name} (${node.districtOrCorridor})`}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-full border text-xs flex items-center gap-1 transition-transform cursor-pointer ${ringColor} ${
                        isSelected
                          ? 'scale-115 ring-2 ring-[#F2EFE7] z-20 font-semibold'
                          : 'hover:scale-105 opacity-90 z-10'
                      }`}
                    >
                      <span>{node.icon}</span>
                      <span className="hidden sm:inline text-[10px] tracking-tight text-[#F2EFE7] max-w-[92px] truncate">
                        {node.name.split('(')[0].replace('Proposed ', '').trim()}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F2EFE7]/15 text-[10px] hd-font-sans tracking-[0.14em] uppercase text-[#A39B8B]">
                <span>GEODETIC EXTENT: 32.3°N–33.5°N · 74.5°E–75.9°E</span>
                <span>🏔️ HYDROPOWER · 🌊 RIVERS · 🌿 WETLANDS</span>
              </div>
            </div>

            {/* Active Node Inspector Card */}
            <div
              className="lg:col-span-5 border p-5 sm:p-6 flex flex-col justify-between space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="hd-kicker">
                    {activeNode.icon} INVESTIGATION {activeNode.investigationNumber} &nbsp;·&nbsp;{' '}
                    {activeNode.categoryLabel}
                  </span>
                  <span className="hd-folio-meta">
                    {activeNode.lat.toFixed(3)}°N, {activeNode.lng.toFixed(3)}°E
                  </span>
                </div>

                <h4
                  className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {activeNode.name}
                </h4>

                <p className="hd-folio-meta inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                  <span>{activeNode.districtOrCorridor}</span>
                </p>

                <div
                  className="pt-3 border-t space-y-2 text-xs sm:text-sm hd-font-body leading-relaxed"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-secondary)' }}
                >
                  <p>
                    <strong style={{ color: 'var(--hd-fg)' }}>Documented Baseline Anchor:</strong>{' '}
                    {activeNode.documentedAnchor}
                  </p>
                  <p>
                    <strong style={{ color: 'var(--hd-fg)' }}>Scientific Investigation Focus:</strong>{' '}
                    {activeNode.scientificFocus}
                  </p>
                </div>
              </div>

              <div
                className="pt-4 border-t flex flex-wrap items-center justify-between gap-3"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                {(() => {
                  const inv = JAMMU_FLAGSHIP_INVESTIGATIONS.find(
                    (i) => i.number === activeNode.investigationNumber
                  );
                  if (!inv) return null;
                  return (
                    <Link
                      href={HD_ROUTES.issueArticle(
                        'monograph-18-jammus-ecological-frontiers',
                        inv.storySlug
                      )}
                      className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>Open Investigation {inv.number}: {inv.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 20 ORIGINAL SCIENTIFIC EXPERIMENTS & ILLUSTRATIVE PROTOCOL SANDBOX */}
      {activeTab === 'experiments' && (
        <div className="space-y-8">
          {/* Illustrative Physical Balance Sandbox (Modeled on AtmosphereVentilationCalculator) */}
          {!compact && (
            <div
              className="p-5 sm:p-6 border space-y-5"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3" style={{ borderColor: 'var(--hd-rule)' }}>
                <div>
                  <p className="hd-kicker">
                    CONCEPTUAL EQUATION EXPLORER · ILLUSTRATIVE SENSITIVITY SANDBOX
                  </p>
                  <h4 className="hd-font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    Coupled Basin Stress Relationships (Protocol Demonstration Only)
                  </h4>
                </div>
                <span
                  className="hd-font-sans px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase border"
                  style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                >
                  Illustrative Inputs · Not Empirical Model Output
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs hd-font-body">
                {/* 01: Chenab Cascade */}
                <div className="space-y-3 p-4 border" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    <Mountain className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                    <span>01 · Chenab Cascade Continuity</span>
                  </div>
                  <label className="block space-y-1">
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>
                      Impounded + Tunnel-Bypassed Reach: <strong>{impoundedReachKm} km</strong> / {mainstemReferenceKm} km
                    </span>
                    <input
                      type="range"
                      min={40}
                      max={185}
                      value={impoundedReachKm}
                      onChange={(e) => setImpoundedReachKm(Number(e.target.value))}
                      className="w-full accent-[#8C3125]"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>
                      Sequential Sediment Trap Efficiency: <strong>{cascadeTrapPct}%</strong>
                    </span>
                    <input
                      type="range"
                      min={20}
                      max={92}
                      value={cascadeTrapPct}
                      onChange={(e) => setCascadeTrapPct(Number(e.target.value))}
                      className="w-full accent-[#8C3125]"
                    />
                  </label>
                  <div className="pt-2 border-t space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div>
                      Modification Ratio (CSI):{' '}
                      <strong style={{ color: 'var(--hd-copper)' }}>
                        {(modificationRatio * 100).toFixed(0)}% of gorge reach
                      </strong>
                    </div>
                    <div>
                      Residual Sediment to Akhnoor:{' '}
                      <strong style={{ color: 'var(--hd-fg)' }}>{residualSedimentPct}%</strong>
                    </div>
                  </div>
                </div>

                {/* 02: Exner Riverbed Balance */}
                <div className="space-y-3 p-4 border" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    <Activity className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                    <span>02 · Exner Extraction Ratio (R_ext)</span>
                  </div>
                  <label className="block space-y-1">
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>
                      Illustrative Annual Extraction: <strong>{extractionMtYr.toFixed(1)} Mt/yr</strong>
                    </span>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={Math.round(extractionMtYr * 10)}
                      onChange={(e) => setExtractionMtYr(Number(e.target.value) / 10)}
                      className="w-full accent-[#8C3125]"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>
                      Illustrative Monsoon Replenishment: <strong>{replenishmentMtYr.toFixed(1)} Mt/yr</strong>
                    </span>
                    <input
                      type="range"
                      min={10}
                      max={70}
                      value={Math.round(replenishmentMtYr * 10)}
                      onChange={(e) => setReplenishmentMtYr(Number(e.target.value) / 10)}
                      className="w-full accent-[#8C3125]"
                    />
                  </label>
                  <div className="pt-2 border-t space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div>
                      R_ext (Extraction / Replenishment):{' '}
                      <strong style={{ color: 'var(--hd-copper)' }}>{extractionRatio.toFixed(2)}×</strong>
                    </div>
                    <div>
                      Bed Trajectory:{' '}
                      <strong style={{ color: 'var(--hd-fg)' }}>
                        {extractionRatio > 1.05
                          ? 'Net Incision & Pier Scour Risk (∂z_b/∂t < 0)'
                          : 'Dynamic Equilibrium / Aggradation'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 03: Wetland Storage & Recharge */}
                <div className="space-y-3 p-4 border" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div className="flex items-center gap-1.5 font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    <Droplets className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                    <span>03 · Wetland Hydrological Shield</span>
                  </div>
                  <label className="block space-y-1">
                    <span style={{ color: 'var(--hd-fg-secondary)' }}>
                      Intact 1985 Wetland Storage Area Retained: <strong>{wetlandIntactPct}%</strong>
                    </span>
                    <input
                      type="range"
                      min={25}
                      max={100}
                      value={wetlandIntactPct}
                      onChange={(e) => setWetlandIntactPct(Number(e.target.value))}
                      className="w-full accent-[#8C3125]"
                    />
                  </label>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--hd-fg-muted)' }}>
                    Illustrates how loss of depressional storage across Surinsar–Mansar (350 ha Ramsar),
                    Gharana, Pargwal &amp; Kukarian transfers monsoon runoff directly into urban drainage.
                  </p>
                  <div className="pt-2 border-t space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
                    <div>
                      Relative Peak-Flood Attenuation:{' '}
                      <strong style={{ color: 'var(--hd-copper)' }}>~{relativeFloodBufferPct}%</strong>
                    </div>
                    <div>
                      Unattenuated Stormwater Spillover:{' '}
                      <strong style={{ color: 'var(--hd-fg)' }}>~{100 - relativeFloodBufferPct}%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Complete 20 Proposed Experiments Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExperiments.map((exp) => (
              <div
                key={exp.code}
                className="p-5 border space-y-2.5 flex flex-col justify-between"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="hd-kicker">
                      {exp.code} &nbsp;·&nbsp; INVESTIGATION {exp.investigationNumber}
                    </span>
                    <span className="hd-folio-meta">{exp.statusLabel}</span>
                  </div>
                  <h5
                    className="hd-font-display text-xl font-semibold leading-snug"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {exp.title}
                  </h5>
                  <p
                    className="hd-font-body text-xs sm:text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {exp.analyticalProtocol}
                  </p>
                </div>
                <div
                  className="pt-2.5 border-t text-[11px] hd-font-body space-y-1"
                  style={{ borderColor: 'var(--hd-rule)', color: 'var(--hd-fg-muted)' }}
                >
                  <div>
                    <strong style={{ color: 'var(--hd-fg-secondary)' }}>Datasets:</strong>{' '}
                    {exp.primaryDatasets}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--hd-fg-secondary)' }}>Validation Gate:</strong>{' '}
                    {exp.validationRequirement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 12-SOURCE COMMON RESEARCH INFRASTRUCTURE */}
      {activeTab === 'infrastructure' && (
        <div className="overflow-x-auto border" style={{ borderColor: 'var(--hd-rule)' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b hd-font-sans text-[10px] tracking-[0.16em] uppercase"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-copper)',
                }}
              >
                <th className="py-3 px-4">Data Infrastructure</th>
                <th className="py-3 px-4">Scientific Application</th>
                <th className="py-3 px-4">Sensor / Archive Specification</th>
                <th className="py-3 px-4">Investigations</th>
              </tr>
            </thead>
            <tbody className="divide-y hd-font-body text-xs sm:text-sm" style={{ borderColor: 'var(--hd-rule)' }}>
              {filteredInfrastructure.map((row) => (
                <tr key={row.source} style={{ backgroundColor: 'var(--hd-bg)' }}>
                  <td className="py-3 px-4 font-semibold" style={{ color: 'var(--hd-fg)' }}>
                    {row.source}
                  </td>
                  <td className="py-3 px-4" style={{ color: 'var(--hd-fg-secondary)' }}>
                    {row.application}
                  </td>
                  <td className="py-3 px-4 text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                    {row.resolutionOrArchiveNote}
                  </td>
                  <td className="py-3 px-4 hd-font-sans text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--hd-copper)' }}>
                    {row.applicableInvestigations.map((n) => `INV ${n}`).join(' · ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: 10-STAGE HIMALAYAN DISPATCH PUBLICATION STANDARD */}
      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {JAMMU_PUBLICATION_STANDARD_10.map((st) => {
            const isScoped = st.currentStatus === 'Active Protocol Scoping';
            return (
              <div
                key={st.stage}
                className="p-4 border flex items-start justify-between gap-4"
                style={{
                  borderColor: isScoped ? 'var(--hd-copper)' : 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="hd-kicker">STAGE {st.stage}</span>
                    <span style={{ color: 'var(--hd-stone)' }}>·</span>
                    <span
                      className="hd-font-sans text-[10px] font-semibold tracking-[0.14em] uppercase"
                      style={{ color: isScoped ? 'var(--hd-copper)' : 'var(--hd-fg-muted)' }}
                    >
                      {st.currentStatus}
                    </span>
                  </div>
                  <h5
                    className="hd-font-display text-xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {st.requirement}
                  </h5>
                  <p
                    className="hd-font-body text-xs leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {st.protocolDescription}
                  </p>
                </div>
                <Layers
                  className="w-4 h-4 shrink-0 mt-1"
                  style={{ color: isScoped ? 'var(--hd-copper)' : 'var(--hd-fg-muted)' }}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
