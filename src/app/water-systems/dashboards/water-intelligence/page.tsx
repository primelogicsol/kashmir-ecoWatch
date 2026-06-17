'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Droplet, Waves, Lock, CheckCircle2, AlertTriangle,
  MapPin, Database, Activity, ShieldCheck, Gauge,
  TrendingUp, Info, Satellite, FlaskConical,
  Clock, ArrowRight, BarChart3, Layers, Eye
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { lakesRecords } from '@/data/hydrology/lakes';
import { wetlandsRecords } from '@/data/hydrology/wetlands';
import { riversRecords } from '@/data/hydrology/rivers';
import { sourceRegistry } from '@/data/hydrology/source-registry';
import { gpsValidationQueue } from '@/data/hydrology/gps-validation-queue';
import {
  computeBatchIntelligence,
  buildWaterIntelligenceSummary,
  type ComputedIntelligence,
  type WaterAlert,
} from '@/lib/water-intelligence-engine';
import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

// ─── Colour helpers ──────────────────────────────────────────────────────────
const RISK_COLOUR: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/30',
  High: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  Watch: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  Healthy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  'Insufficient Data': 'text-slate-400 bg-slate-500/10 border-slate-500/30',
};

const WQI_COLOUR: Record<string, string> = {
  Excellent: 'text-emerald-400',
  Good: 'text-green-400',
  Moderate: 'text-amber-400',
  Poor: 'text-orange-400',
  Critical: 'text-red-400',
  'Insufficient Data': 'text-slate-400',
};

const WQI_BG: Record<string, string> = {
  Excellent: 'bg-emerald-500',
  Good: 'bg-green-500',
  Moderate: 'bg-amber-500',
  Poor: 'bg-orange-500',
  Critical: 'bg-red-500',
  'Insufficient Data': 'bg-slate-600',
};

const SEVERITY_COLOUR: Record<string, string> = {
  Critical: 'border-red-500 bg-red-500/10',
  Warning: 'border-orange-500 bg-orange-500/10',
  Advisory: 'border-amber-500 bg-amber-500/10',
  Watch: 'border-yellow-500 bg-yellow-500/10',
};

function RiskBadge({ value }: { value: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${RISK_COLOUR[value] || RISK_COLOUR['Insufficient Data']}`}>
      {value}
    </span>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-cyan-400" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function WaterIntelligenceDashboard() {
  // Combine all records
  const allRecords: MigratedWaterRecord[] = useMemo(() => [
    ...lakesRecords,
    ...wetlandsRecords,
    ...riversRecords,
  ], []);

  // Compute intelligence — only for unlocked records
  const computedResults: ComputedIntelligence[] = useMemo(
    () => computeBatchIntelligence(allRecords),
    [allRecords]
  );

  const summary = useMemo(
    () => buildWaterIntelligenceSummary(
      allRecords,
      computedResults,
      sourceRegistry.length,
      gpsValidationQueue.length
    ),
    [allRecords, computedResults]
  );

  const unlockedRecords = allRecords.filter(r => !r.Dashboard_Locked);
  const lockedRecords = allRecords.filter(r => r.Dashboard_Locked);

  // Separate Ramsar records
  const ramsarIntelligence = computedResults.filter(c => {
    const rec = unlockedRecords.find(r => r.id === c.record_id);
    const nwia = rec?.NWIA_Validation as Record<string, unknown> | undefined;
    return nwia?.Ramsar_Status === true;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1 as number, y: 0 as number,
      transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' as const },
    }),
  };

  return (
    <div className="min-h-screen bg-[#050d1a]">
      {/* ── Hero Header ─────────────────────────────────────────────────── */}
      <Heading
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        label="Live Intelligence Layer"
        title={
          <>
            <span className="block whitespace-nowrap">Water Intelligence</span>
            <span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Across Greater Kashmir Ecology</span>
          </>
        }
        subtitle="Hydrological intelligence engine for Kashmir Eco Watch. All computations run on source-verified records only. Locked records are excluded from KPIs until source verification is complete."
        breadcrumbs={[
          { label: 'Water Systems', href: '/water-systems' },
          { label: 'Dashboards', href: '/water-systems/dashboards' },
          { label: 'Water Intelligence' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* ── Tier 1: Header KPI Strip ──────────────────────────────────── */}
        <motion.section initial="hidden" animate="visible">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Verified Waterbodies', value: summary.verified_records, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', note: 'Dashboard eligible' },
              { label: 'Dashboard Locked', value: summary.locked_records, icon: Lock, color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20', note: 'Pending source verification' },
              { label: 'Verified Sources', value: summary.verified_sources, icon: Database, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20', note: 'Source registry entries' },
              { label: 'Awaiting Validation', value: summary.locked_records, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', note: 'Records needing source linkage' },
              { label: 'GPS Queue', value: summary.gps_queue, icon: MapPin, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', note: 'Coordinates to verify' },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                custom={i}
                variants={fadeUp}
                className={`rounded-xl border ${kpi.bg} p-5 flex flex-col gap-2`}
              >
                <div className="flex items-center justify-between">
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
                <div className="text-white text-xs font-semibold leading-tight">{kpi.label}</div>
                <div className="text-slate-500 text-xs">{kpi.note}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Tier 2: Main Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN: Water Health + Intelligence Statements */}
          <div className="lg:col-span-2 space-y-6">

            {/* Water Health Panel */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6"
            >
              <SectionHeader
                icon={Gauge}
                title="Water Health Panel"
                subtitle="Based on verified records only (7 of 93 total). 86 records locked."
              />

              {/* WQI Breakdown */}
              <div className="space-y-3 mb-6">
                {(['Excellent', 'Good', 'Moderate', 'Poor', 'Critical', 'Insufficient Data'] as const).map(status => {
                  const count = summary.wqi_breakdown[status] || 0;
                  const total = summary.verified_records;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${WQI_BG[status]}`} />
                      <span className={`text-sm w-36 font-medium ${WQI_COLOUR[status]}`}>{status}</span>
                      <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${WQI_BG[status]}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 w-10 text-right">{count} / {total}</span>
                    </div>
                  );
                })}
              </div>

              {/* Per-record intelligence cards */}
              <div className="space-y-4">
                {computedResults.map((c, i) => (
                  <motion.div
                    key={c.record_id}
                    custom={i + 1} variants={fadeUp} initial="hidden" animate="visible"
                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm">{c.name}</span>
                          <span className="text-xs text-slate-500 bg-slate-700/50 px-1.5 py-0.5 rounded capitalize">{c.type}</span>
                          {(() => {
                            const rec = unlockedRecords.find(r => r.id === c.record_id);
                            const nwia = rec?.NWIA_Validation as Record<string, unknown> | undefined;
                            return nwia?.Ramsar_Status ? (
                              <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                                Ramsar {String(nwia.Ramsar_Site_ID)}
                              </span>
                            ) : null;
                          })()}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {c.district} · {c.Ecological_Scope_ID} · {c.Confidence_Level} confidence
                        </div>
                      </div>
                      <RiskBadge value={c.Computed_WQI} />
                    </div>

                    {/* Model outputs grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {[
                        { label: 'WQI', value: c.Computed_WQI },
                        { label: 'Eutrophication', value: c.Computed_Eutrophication_Risk },
                        { label: 'Algal Bloom', value: c.Computed_Algal_Bloom_Risk },
                        { label: 'Restoration', value: c.Computed_Restoration_Priority },
                        { label: 'Flood Risk', value: c.Computed_Flood_Risk },
                        { label: 'Watershed', value: c.Computed_Watershed_Risk },
                        { label: 'Climate', value: c.Computed_Climate_Vulnerability },
                        { label: 'Wetland Health', value: c.Computed_Wetland_Health },
                      ].map(m => (
                        <div key={m.label} className="bg-slate-900/60 rounded p-2">
                          <div className="text-slate-500 text-[10px] mb-0.5 uppercase tracking-wide">{m.label}</div>
                          <RiskBadge value={m.value} />
                        </div>
                      ))}
                    </div>

                    {/* Intelligence statements */}
                    {c.Intelligence_Statements.length > 0 && (
                      <div className="space-y-1.5">
                        {c.Intelligence_Statements.slice(0, 2).map((s, si) => (
                          <p key={si} className="text-xs text-slate-400 leading-relaxed border-l-2 border-cyan-500/30 pl-3">
                            {s}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Data gaps */}
                    {c.Computation_Notes.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {c.Computation_Notes.map((n, ni) => (
                          <span key={ni} className="text-[10px] text-slate-500 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                            <Info className="w-2.5 h-2.5 inline mr-1" />{n.split(':')[0]}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Water Watch Panel — Alerts */}
            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6"
            >
              <SectionHeader
                icon={AlertTriangle}
                title="Water Watch"
                subtitle="Model-generated alerts from verified records. 86 locked records not monitored yet."
              />

              {summary.active_alerts.length === 0 ? (
                <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-white font-medium">No Active Alerts</div>
                    <div className="text-xs text-slate-400">All 7 verified waterbodies are within monitored thresholds.</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {summary.active_alerts.map((alert, i) => (
                    <div key={i} className={`rounded-lg border p-4 ${SEVERITY_COLOUR[alert.severity] || 'border-slate-700 bg-slate-800'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white uppercase tracking-wide">{alert.alert_type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${SEVERITY_COLOUR[alert.severity]}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{alert.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Alert category structure */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { type: 'Flood Alerts', count: summary.active_alerts.filter(a => a.alert_type === 'Flood').length },
                  { type: 'Water Quality', count: summary.active_alerts.filter(a => a.alert_type === 'Water Quality').length },
                  { type: 'Algal Bloom', count: summary.active_alerts.filter(a => a.alert_type === 'Algal Bloom').length },
                  { type: 'Eutrophication', count: summary.active_alerts.filter(a => a.alert_type === 'Eutrophication').length },
                  { type: 'Spring Drying', count: 0, locked: true },
                  { type: 'Glacier GLOF', count: 0, locked: true },
                ].map(cat => (
                  <div key={cat.type} className={`rounded-lg p-3 border ${cat.locked ? 'border-slate-800 bg-slate-800/30' : 'border-slate-700 bg-slate-800/50'}`}>
                    <div className="text-xs text-slate-400 mb-1">{cat.type}</div>
                    {cat.locked ? (
                      <div className="flex items-center gap-1 text-slate-600">
                        <Lock className="w-3 h-3" />
                        <span className="text-xs">Pending Data</span>
                      </div>
                    ) : (
                      <div className={`text-lg font-bold ${cat.count > 0 ? 'text-orange-400' : 'text-emerald-400'}`}>
                        {cat.count > 0 ? cat.count : '✓'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Ramsar + Verification Transparency + GPS Queue */}
          <div className="space-y-6">

            {/* Ramsar Intelligence Panel */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6"
            >
              <SectionHeader
                icon={Waves}
                title="Ramsar Intelligence"
                subtitle="Verified Ramsar sites only"
              />

              <div className="space-y-4">
                {ramsarIntelligence.map((c) => {
                  const rec = unlockedRecords.find(r => r.id === c.record_id);
                  const nwia = rec?.NWIA_Validation as Record<string, unknown> | undefined;
                  return (
                    <div key={c.record_id} className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-white font-semibold text-sm">{c.name}</div>
                          <div className="text-xs text-cyan-400">Ramsar {String(nwia?.Ramsar_Site_ID || '—')}</div>
                        </div>
                        <RiskBadge value={c.Computed_Eutrophication_Risk} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div>
                          <span className="text-slate-500">District:</span>{' '}
                          <span className="text-white">{c.district}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Area:</span>{' '}
                          <span className="text-white">{rec?.area ? `${rec.area} km²` : 'Pending'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">WQI:</span>{' '}
                          <span className={WQI_COLOUR[c.Computed_WQI]}>{c.Computed_WQI}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Confidence:</span>{' '}
                          <span className="text-white">{c.Confidence_Level}</span>
                        </div>
                      </div>
                      {c.Intelligence_Statements[0] && (
                        <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-cyan-500/40 pl-2">
                          {c.Intelligence_Statements[0].substring(0, 140)}…
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Verification Transparency Panel */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="bg-slate-900/60 border border-amber-500/20 rounded-xl p-6"
            >
              <SectionHeader
                icon={Eye}
                title="Verification Transparency"
                subtitle="Never hidden — builds platform trust"
              />

              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Verification Progress</span>
                  <span className="font-bold text-amber-400">{summary.verification_progress_pct}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${summary.verification_progress_pct}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                  <span>{summary.verified_records} verified</span>
                  <span>{summary.locked_records} locked</span>
                </div>
              </div>

              {/* Data Coverage breakdown */}
              <div className="space-y-2">
                {[
                  { label: 'Verified Records', value: summary.verified_records, color: 'text-emerald-400', icon: CheckCircle2 },
                  { label: 'Locked Records', value: summary.locked_records, color: 'text-slate-400', icon: Lock },
                  { label: 'Source Registry', value: summary.verified_sources, color: 'text-cyan-400', icon: Database },
                  { label: 'GPS Queue', value: summary.gps_queue, color: 'text-purple-400', icon: MapPin },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-2 bg-slate-800/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                      <span className="text-xs text-slate-400">{item.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <p className="text-xs text-amber-400/80 leading-relaxed">
                  <strong className="text-amber-400">Verified Data Only</strong> — all charts and KPIs above use only the {summary.verified_records} source-linked records.
                  The remaining {summary.locked_records} records are shown as &ldquo;Data Pending&rdquo; until source verification is complete.
                </p>
              </div>
            </motion.div>

            {/* GPS Validation Queue Summary */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6"
            >
              <SectionHeader
                icon={Satellite}
                title="GPS Validation Queue"
                subtitle={`${summary.gps_queue} records awaiting coordinate verification`}
              />

              <div className="space-y-2">
                {[
                  { priority: 'Critical', count: gpsValidationQueue.filter((r: { Priority: string }) => r.Priority === 'Critical').length, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
                  { priority: 'High', count: gpsValidationQueue.filter((r: { Priority: string }) => r.Priority === 'High').length, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
                  { priority: 'Medium', count: gpsValidationQueue.filter((r: { Priority: string }) => r.Priority === 'Medium').length, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                ].map(p => (
                  <div key={p.priority} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${p.color}`}>
                    <span className="text-xs font-medium">{p.priority} Priority</span>
                    <span className="text-sm font-bold">{p.count} records</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Preferred Sources</div>
                {['SRC-RGI-001', 'SRC-BHUVAN-001', 'SRC-ICIMOD-001', 'SRC-RAMSAR-001', 'SRC-INDIAWRIS-001'].map(src => (
                  <div key={src} className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0" />
                    <code className="text-cyan-500/70">{src}</code>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Source Registry Panel */}
            <motion.div
              custom={6} variants={fadeUp} initial="hidden" animate="visible"
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6"
            >
              <SectionHeader
                icon={Layers}
                title="Source Registry"
                subtitle={`${summary.verified_sources} sources registered`}
              />

              {(['Government', 'Satellite', 'Research'] as const).map(type => {
                const srcs = sourceRegistry.filter((s: { Source_Type: string }) => s.Source_Type === type);
                return (
                  <div key={type} className="mb-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-2 font-medium">{type}</div>
                    <div className="space-y-1">
                      {srcs.slice(0, 4).map((s: { Source_ID: string; Source_Name: string; Reliability_Level: string }) => (
                        <div key={s.Source_ID} className="flex items-center justify-between py-1">
                          <code className="text-[10px] text-cyan-500/70">{s.Source_ID}</code>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${s.Reliability_Level === 'High' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                            {s.Reliability_Level}
                          </span>
                        </div>
                      ))}
                      {srcs.length > 4 && (
                        <div className="text-[10px] text-slate-600">+{srcs.length - 4} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>

        {/* ── Tier 3: Next Phase Roadmap ────────────────────────────────── */}
        <motion.div
          custom={7} variants={fadeUp} initial="hidden" animate="visible"
          className="bg-slate-900/60 border border-slate-800 rounded-xl p-6"
        >
          <SectionHeader
            icon={TrendingUp}
            title="Phase 6 — Data Acquisition Engine (Upcoming)"
            subtitle="The real bottleneck is not dashboards. It is maintaining thousands of verified records over time."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { source: 'India-WRIS', purpose: 'River flow, basin data, hydrological stations', priority: 'Batch 3', color: 'border-cyan-500/20 bg-cyan-500/5' },
              { source: 'ISRO Bhuvan', purpose: 'GPS verification, waterbody area, land use', priority: 'Batch GPS', color: 'border-emerald-500/20 bg-emerald-500/5' },
              { source: 'Ramsar RSIS', purpose: 'Wetland boundaries, KML files, conservation data', priority: 'Batch 4', color: 'border-blue-500/20 bg-blue-500/5' },
              { source: 'GLIMS / RGI 7.0', purpose: 'Glacier outlines, area, retreat statistics', priority: 'Batch 5', color: 'border-purple-500/20 bg-purple-500/5' },
              { source: 'JKLCMA', purpose: 'Lake water quality, area reports, restoration', priority: 'Batch 1', color: 'border-amber-500/20 bg-amber-500/5' },
              { source: 'Jal Shakti J&K', purpose: 'Spring discharge, drinking water schemes', priority: 'Batch 2', color: 'border-orange-500/20 bg-orange-500/5' },
              { source: 'ICIMOD', purpose: 'Transboundary rivers, glaciers, GB/AJK data', priority: 'Batch 8', color: 'border-pink-500/20 bg-pink-500/5' },
              { source: 'JKPCC / CPCB', purpose: 'Water quality parameters — BOD, COD, pH', priority: 'Batch 7', color: 'border-red-500/20 bg-red-500/5' },
            ].map((p, i) => (
              <div key={i} className={`rounded-lg border ${p.color} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-semibold">{p.source}</span>
                  <span className="text-[10px] text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">{p.priority}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{p.purpose}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
