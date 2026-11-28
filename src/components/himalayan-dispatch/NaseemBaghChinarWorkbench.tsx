'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Landmark,
  Ruler,
  Scale,
  Trees,
} from 'lucide-react';
import {
  CONFLICT_INSTITUTIONAL_SEQUENCE_5,
  CONSTRUCTION_ROOT_STRESSORS_12,
  HERITAGE_PARK_COMMITMENT_AUDIT_7,
  KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5,
  NASEEM_BAGH_CHINAR_CENSUS_DISCREPANCY_7,
  NASEEM_BAGH_CHINARS_SPEC,
  NASEEM_BAGH_CHRONOLOGY_13,
  NASEEM_BAGH_INFRASTRUCTURE_CASES_9,
  NASEEM_BAGH_RECOVERY_PROTOCOL_15,
  REQUIRED_LEGAL_AND_UNIVERSITY_DOCUMENTS_12,
  UOK_DISCIPLINARY_INTROSPECTION_11,
  UOK_MAIN_CAMPUS_LAND_USE_2021_22,
  UOK_REPORTED_TOTAL_CAMPUS_AREA_HA,
} from '@/data/himalayan-dispatch-naseem-bagh-chinars-monograph';

type TabId = 'rpa-physics' | 'census-landuse' | 'infrastructure-chronology' | 'law-recovery';

export function NaseemBaghChinarWorkbench({
  variant = 'editorial',
}: {
  variant?: 'editorial' | 'observatory';
}) {
  const isObs = variant === 'observatory';
  const [activeTab, setActiveTab] = useState<TabId>('rpa-physics');

  // Interactive Arboricultural BS 5837 / Veteran Tree Root-Zone & Setback Calculator
  const [gbhMeters, setGbhMeters] = useState<number>(4.5); // 4.5 m girth (~300–400 yr Mughal Chinar)
  const [treeHeightMeters, setTreeHeightMeters] = useState<number>(28);
  const [foundationDistMeters, setFoundationDistMeters] = useState<number>(6.5);
  const [imperviousPct, setImperviousPct] = useState<number>(45);

  const arborMetrics = useMemo(() => {
    const dbhMeters = gbhMeters / Math.PI;
    // Standard BS 5837:2012 RPA radius = 12 * DBH (capped at 15m for ordinary trees);
    // Veteran / ancient heritage tree standard (Ancient Tree Forum / Natural England) = 15 * DBH uncapped
    const bs5837RadiusM = Math.min(15, 12 * dbhMeters);
    const veteranRadiusM = 15 * dbhMeters;
    const veteranAreaSqM = Math.PI * veteranRadiusM * veteranRadiusM;
    // Mattheck / Coder Structural Root Zone approximation: SRZ ≈ (D_flare * 50)^0.42 * 0.64 m
    const estimatedFlareM = dbhMeters * 1.32;
    const structuralRootRadiusM = Math.max(
      2.0,
      Math.pow(estimatedFlareM * 50, 0.42) * 0.64
    );
    const recommendedFallSetbackM = treeHeightMeters * 1.25;

    let riskDiagnosis: {
      level: 'SEVERE_ROOT_PLATE_INTRUSION' | 'RPA_AND_FALL_CONFLICT' | 'FALL_ZONE_PROXIMITY' | 'HERITAGE_COMPATIBLE';
      badge: string;
      explanation: string;
    };

    if (foundationDistMeters < structuralRootRadiusM) {
      riskDiagnosis = {
        level: 'SEVERE_ROOT_PLATE_INTRUSION',
        badge: 'CRITICAL: STRUCTURAL ROOT PLATE & WINDTHROW HAZARD',
        explanation:
          'Excavation at this distance severs primary structural buttress roots, directly destabilizing the veteran Chinar while placing the new building inside the immediate trunk-fall zone.',
      };
    } else if (foundationDistMeters < veteranRadiusM) {
      riskDiagnosis = {
        level: 'RPA_AND_FALL_CONFLICT',
        badge: 'HIGH RISK: VETERAN ROOT PROTECTION ZONE INTRUSION',
        explanation:
          'Foundation and scaffolding intrude inside the 15× DBH veteran Root Protection Zone and tree fall radius—inducing multi-year feeder-root dieback and manufacturing a future "building safety" conflict.',
      };
    } else if (foundationDistMeters < recommendedFallSetbackM) {
      riskDiagnosis = {
        level: 'FALL_ZONE_PROXIMITY',
        badge: 'MODERATE: OUTSIDE RPA BUT INSIDE MATURE FALL ENVELOPE',
        explanation:
          'Roots are largely buffered if utility trenches and paving stay outside the RPA, but building siting within 1.25× tree height creates long-term pressure for defensive crown lopping.',
      };
    } else {
      riskDiagnosis = {
        level: 'HERITAGE_COMPATIBLE',
        badge: 'COMPATIBLE SETBACK: ROOTS & CANOPY PROTECTED',
        explanation:
          'Building stands outside both the veteran Root Protection Zone and the 1.25× height fall envelope—allowing non-destructive arboricultural conservation.',
      };
    }

    const sealedAreaSqM = (veteranAreaSqM * imperviousPct) / 100;

    return {
      dbhMeters,
      bs5837RadiusM,
      veteranRadiusM,
      veteranAreaSqM,
      structuralRootRadiusM,
      recommendedFallSetbackM,
      sealedAreaSqM,
      riskDiagnosis,
    };
  }, [gbhMeters, treeHeightMeters, foundationDistMeters, imperviousPct]);

  const containerCls = isObs
    ? 'rounded-2xl border border-slate-800 bg-slate-900/80 text-slate-100 p-6 sm:p-8 space-y-6'
    : 'my-10 border p-6 sm:p-8 space-y-6';

  const containerStyle = isObs
    ? undefined
    : {
        borderColor: 'var(--hd-rule-strong)',
        backgroundColor: 'var(--hd-bg-elevated)',
        color: 'var(--hd-fg)',
      };

  const tabs: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'rpa-physics', label: '01 · Root-Zone & Safety Setback Lab', icon: Ruler },
    { id: 'census-landuse', label: '02 · Chinar Census & 74.66 ha Audit', icon: Trees },
    { id: 'infrastructure-chronology', label: '03 · 9 Campus Files & 12 Stressors', icon: Landmark },
    { id: 'law-recovery', label: '04 · 1969 Act, 11 Mirrors & Recovery', icon: Scale },
  ];

  return (
    <section
      aria-label="Naseem Bagh Chinar & Living Heritage Scientific Workbench"
      className={containerCls}
      style={containerStyle}
    >
      {/* Header */}
      <div
        className={`pb-5 border-b flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${
          isObs ? 'border-slate-800' : ''
        }`}
        style={isObs ? undefined : { borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="space-y-1.5">
          <p
            className={
              isObs
                ? 'text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400'
                : 'hd-kicker'
            }
          >
            INTERACTIVE ARBORICULTURAL, HISTORICAL &amp; STATUTORY WORKBENCH · MONOGRAPH 14
          </p>
          <h3
            className={
              isObs
                ? 'text-2xl sm:text-3xl font-bold text-white'
                : 'hd-font-display text-2xl sm:text-3xl font-semibold'
            }
          >
            Naseem Bagh Living Heritage, Root-Zone Biomechanics &amp; Accountability Explorer
          </h3>
          <p
            className={
              isObs
                ? 'text-xs sm:text-sm text-slate-300 max-w-3xl'
                : 'hd-font-body text-xs sm:text-sm opacity-80 max-w-3xl'
            }
          >
            Conceptual arboricultural simulator (BS 5837 / Veteran Tree RPA equations) paired with
            documented University of Kashmir audit tables, strict non-subtraction / non-addition
            census guards, and the 15-measure Naseem Bagh Recovery Protocol.
          </p>
        </div>

        <Link
          href={
            isObs
              ? '/himalayan-dispatch/issues/monograph-14-the-chinars-in-the-shadow-of-concrete'
              : '/environmental-monitoring/chinar-monitoring/naseem-bagh-heritage-observatory'
          }
          className={
            isObs
              ? 'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0'
              : 'hd-kicker inline-flex items-center gap-1.5 underline shrink-0'
          }
        >
          <span>{isObs ? 'Open 72-Chapter Monograph 14' : 'Open KEW 12-Registry Observatory'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-left text-xs font-semibold transition-all border ${
                isObs
                  ? active
                    ? 'rounded-lg bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'rounded-lg bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  : active
                  ? 'bg-[#171717] text-[#F2EFE7] border-[#171717]'
                  : 'border-current/20 opacity-75 hover:opacity-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ARBORICULTURAL ROOT-PROTECTION & BUILDING-SAFETY SIMULATOR */}
      {activeTab === 'rpa-physics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div
              className={`lg:col-span-6 p-5 border space-y-4 ${
                isObs ? 'rounded-xl border-slate-800 bg-slate-950/60' : ''
              }`}
              style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
            >
              <p className={isObs ? 'text-xs font-mono uppercase text-amber-400 font-bold' : 'hd-kicker'}>
                CONCEPTUAL BIOMECHANICAL PARAMETERS (PLATANUS ORIENTALIS)
              </p>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Mature Chinar Girth at Breast Height (GBH)</span>
                  <span>
                    {gbhMeters.toFixed(1)} m (DBH {arborMetrics.dbhMeters.toFixed(2)} m)
                  </span>
                </div>
                <input
                  type="range"
                  min={1.8}
                  max={7.5}
                  step={0.1}
                  value={gbhMeters}
                  onChange={(e) => setGbhMeters(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </label>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Mature Chinar Crown Height (H)</span>
                  <span>{treeHeightMeters} m</span>
                </div>
                <input
                  type="range"
                  min={14}
                  max={36}
                  step={1}
                  value={treeHeightMeters}
                  onChange={(e) => setTreeHeightMeters(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </label>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Building / Trench Distance from Trunk Centre</span>
                  <span>{foundationDistMeters.toFixed(1)} m</span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={45.0}
                  step={0.5}
                  value={foundationDistMeters}
                  onChange={(e) => setFoundationDistMeters(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </label>

              <label className="block space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Concrete / Asphalt Sealing Across Veteran RPA</span>
                  <span>{imperviousPct}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={85}
                  step={5}
                  value={imperviousPct}
                  onChange={(e) => setImperviousPct(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </label>
            </div>

            <div
              className={`lg:col-span-6 p-5 border space-y-4 ${
                isObs ? 'rounded-xl border-slate-800 bg-slate-950/60' : ''
              }`}
              style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">
                    Veteran Root Zone Radius (15× DBH)
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    {arborMetrics.veteranRadiusM.toFixed(1)} m
                  </div>
                  <div className="text-[11px] opacity-75">
                    BS 5837 standard: {arborMetrics.bs5837RadiusM.toFixed(1)} m
                  </div>
                </div>

                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">
                    Veteran Root Protection Area
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    {Math.round(arborMetrics.veteranAreaSqM).toLocaleString()} m²
                  </div>
                  <div className="text-[11px] opacity-75">
                    Sealed: {Math.round(arborMetrics.sealedAreaSqM).toLocaleString()} m² ({imperviousPct}%)
                  </div>
                </div>

                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">
                    Structural Root Plate (SRZ)
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    {arborMetrics.structuralRootRadiusM.toFixed(1)} m
                  </div>
                  <div className="text-[11px] opacity-75">Windthrow anchor threshold</div>
                </div>

                <div className="p-3 border border-current/15 space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70">
                    Recommended Fall Setback (1.25× H)
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    {arborMetrics.recommendedFallSetbackM.toFixed(1)} m
                  </div>
                  <div className="text-[11px] opacity-75">Prevents post-build lopping conflict</div>
                </div>
              </div>

              <div
                className={`p-4 border-l-4 space-y-1 text-xs leading-relaxed ${
                  isObs ? 'bg-slate-900 border-amber-400' : ''
                }`}
                style={
                  isObs
                    ? undefined
                    : { borderColor: 'var(--hd-copper)', backgroundColor: 'var(--hd-bg)' }
                }
              >
                <p className="font-bold uppercase tracking-wider">
                  {arborMetrics.riskDiagnosis.badge}
                </p>
                <p>{arborMetrics.riskDiagnosis.explanation}</p>
                <p className="opacity-70 italic pt-1">
                  Note: Conceptual biomechanical model illustrating Part VIII &amp; IX; actual root
                  architecture and cavity condition at Naseem Bagh require on-site sonic tomography
                  and air-spade verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHINAR CENSUS RECONCILIATION & UOK 74.66 HA LAND-USE AUDIT */}
      {activeTab === 'census-landuse' && (
        <div className="space-y-6">
          <div
            className={`p-4 border text-xs leading-relaxed flex items-start gap-3 ${
              isObs ? 'rounded-xl border-amber-500/40 bg-amber-950/20 text-amber-100' : ''
            }`}
            style={isObs ? undefined : { borderColor: 'var(--hd-copper)' }}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <strong>Strict Non-Subtraction &amp; Non-Addition Evidentiary Guard:</strong> The{' '}
              <code>1,200+</code> Mughal estimate (or <code>992</code> historical account) and
              contemporary counts (<code>~700</code> / <code>696</code> / <code>710</code>) must
              never be subtracted to claim construction-caused tree loss. Likewise, reported
              removals of <code>22</code> (2011) and <code>16+</code> (Hamzah Guest House) may
              overlap and must not be added without primary incident verification.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 7 Census Records */}
            <div className="lg:col-span-7 space-y-2.5">
              <p className={isObs ? 'text-xs font-mono font-bold uppercase text-emerald-400' : 'hd-kicker'}>
                SEVEN HISTORICAL &amp; INSTITUTIONAL CHINAR CENSUS BENCHMARKS
              </p>
              <div className="space-y-2">
                {NASEEM_BAGH_CHINAR_CENSUS_DISCREPANCY_7.map((rec) => (
                  <div
                    key={rec.source}
                    className={`p-3.5 border text-xs space-y-1 ${
                      isObs ? 'rounded-lg border-slate-800 bg-slate-950/60' : ''
                    }`}
                    style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold">{rec.source}</span>
                      <span className="font-mono font-bold text-sm shrink-0">
                        {rec.reportedChinars}
                      </span>
                    </div>
                    <p className="opacity-80 leading-relaxed">{rec.scopeAndCaveat}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* UoK 2021-22 Main Campus Land-Use Visual Bar Chart */}
            <div className="lg:col-span-5 space-y-3">
              <p className={isObs ? 'text-xs font-mono font-bold uppercase text-cyan-400' : 'hd-kicker'}>
                UOK 2021–22 MAIN-CAMPUS LAND USE ({UOK_REPORTED_TOTAL_CAMPUS_AREA_HA} HA TOTAL)
              </p>
              <div
                className={`p-4 border space-y-3 ${
                  isObs ? 'rounded-xl border-slate-800 bg-slate-950/60' : ''
                }`}
                style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
              >
                {UOK_MAIN_CAMPUS_LAND_USE_2021_22.map((lu) => {
                  const widthPct = Math.min(100, (lu.areaHa / 40) * 100);
                  return (
                    <div key={lu.category} className="space-y-1 text-xs">
                      <div className="flex justify-between font-semibold">
                        <span>{lu.category}</span>
                        <span className="tabular-nums">
                          {lu.areaHa.toFixed(2)} ha ({lu.shareOfReportedTotalPct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-current/10 overflow-hidden rounded-sm">
                        <div
                          className="h-full bg-emerald-600"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-[11px] italic opacity-75 pt-2 border-t border-current/15">
                  Source: DIQA University of Kashmir Environmental Audit 2021–22. Covers reported
                  main-campus inventory—separate cadastral land-use mapping of Naseem Bagh proper is
                  a primary Monograph 14 objective.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 9 INFRASTRUCTURE CASES, CHRONOLOGY & 12 ROOT STRESSORS */}
      {activeTab === 'infrastructure-chronology' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <p className={isObs ? 'text-xs font-mono font-bold uppercase text-emerald-400' : 'hd-kicker'}>
                NINE CAMPUS INFRASTRUCTURE DEVELOPMENTS FOR FORENSIC AUDIT
              </p>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {NASEEM_BAGH_INFRASTRUCTURE_CASES_9.map((c) => (
                  <div
                    key={c.infrastructure}
                    className={`p-3 border text-xs space-y-1 ${
                      isObs ? 'rounded-lg border-slate-800 bg-slate-950/60' : ''
                    }`}
                    style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">{c.infrastructure}</span>
                      <span className="text-[10px] opacity-70">{c.periodOrContext}</span>
                    </div>
                    <p className="opacity-85">{c.principalQuestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <p className={isObs ? 'text-xs font-mono font-bold uppercase text-amber-400' : 'hd-kicker'}>
                TWELVE SUBSURFACE SOIL &amp; ROOT DEGRADATION MECHANISMS
              </p>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {CONSTRUCTION_ROOT_STRESSORS_12.map(([press, bio]) => (
                  <div
                    key={press}
                    className={`p-3 border text-xs space-y-0.5 ${
                      isObs ? 'rounded-lg border-slate-800 bg-slate-950/60' : ''
                    }`}
                    style={isObs ? undefined : { borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="font-bold">{press}</div>
                    <div className="opacity-80">{bio}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-current/15 text-xs">
            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                Heritage Park Commitments vs. Required Proof (7)
              </p>
              {HERITAGE_PARK_COMMITMENT_AUDIT_7.slice(0, 4).map(([k, v]) => (
                <p key={k} className="opacity-85">
                  <strong>{k}:</strong> {v}
                </p>
              ))}
            </div>
            <div className="space-y-1.5">
              <p className="font-bold uppercase tracking-wider">
                2007–2011 Conflict-to-Expansion Sequence (Prof. Wafai / Zareef Record)
              </p>
              {CONFLICT_INSTITUTIONAL_SEQUENCE_5.slice(0, 4).map(([k, v]) => (
                <p key={k} className="opacity-85">
                  <strong>{k}:</strong> {v}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 1969 ACT DOCUMENTS, 11 ACADEMIC MIRRORS & 15-MEASURE RECOVERY PROTOCOL */}
      {activeTab === 'law-recovery' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider">
                12 Statutory &amp; University Records (1969 Act Audit)
              </p>
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                {REQUIRED_LEGAL_AND_UNIVERSITY_DOCUMENTS_12.map(([doc, purpose]) => (
                  <div key={doc} className="p-2.5 border border-current/15">
                    <div className="font-bold">{doc}</div>
                    <div className="opacity-80">{purpose}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider">
                11 University Disciplines Facing Naseem Bagh
              </p>
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                {UOK_DISCIPLINARY_INTROSPECTION_11.map(([disc, q]) => (
                  <div key={disc} className="p-2.5 border border-current/15">
                    <div className="font-bold">{disc}</div>
                    <div className="opacity-80">{q}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold uppercase tracking-wider">
                15-Measure Naseem Bagh Recovery Protocol
              </p>
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                {NASEEM_BAGH_RECOVERY_PROTOCOL_15.map(([measure, outcome]) => (
                  <div key={measure} className="p-2.5 border border-current/15 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
                    <div>
                      <div className="font-bold">{measure}</div>
                      <div className="opacity-80">{outcome}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Institutional Heritage Pentad */}
          <div className="pt-4 border-t border-current/15 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Five-Investigation Institutional Environmental History Pentad</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              {KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5.map((p) => (
                <Link
                  key={p.investigation}
                  href={p.href}
                  className="p-3 border border-current/20 hover:border-emerald-500 transition-colors space-y-1 block"
                >
                  <div className="text-[10px] font-mono uppercase opacity-70">{p.dispatchRef}</div>
                  <div className="font-bold leading-snug">{p.investigation}</div>
                  <div className="text-[11px] opacity-80">{p.publicAssetExamined}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
