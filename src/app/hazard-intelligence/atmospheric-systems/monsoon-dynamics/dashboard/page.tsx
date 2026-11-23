'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import { AtmosphericSystemsMap, AtmosphericMapMarker } from '@/components/maps/AtmosphericSystemsMap';
import { MonsoonCorridorLiveRecord, MonsoonSubRegion, HazardLevel } from '@/data/hazard-monsoon-dynamics';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  CloudRain, Compass, Map, Layers, Calendar, AlertTriangle,
  History, Database, ShieldCheck, ArrowLeft, RefreshCw, CheckCircle2, ExternalLink
} from 'lucide-react';

type TabId =
  | 'overview'
  | 'map'
  | 'moisture-gates'
  | 'forecasts'
  | 'era5-anomalies'
  | 'impacts'
  | 'history'
  | 'provenance';

const TABS: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'overview', label: 'Overview & Status', icon: Compass },
  { id: 'map', label: 'Geographic Map', icon: Map },
  { id: 'moisture-gates', label: 'Gates & Terrain Mask', icon: Layers },
  { id: 'era5-anomalies', label: 'ERA5 Historical 7d', icon: ShieldCheck },
  { id: 'forecasts', label: '168h Forecasts & CAPE', icon: Calendar },
  { id: 'impacts', label: 'Coupled Hazards', icon: AlertTriangle },
  { id: 'history', label: 'Historical Climatology', icon: History },
  { id: 'provenance', label: 'Sources & Provenance', icon: Database },
];

function fmt(v: number | null | undefined, s = ''): string {
  return v === null || v === undefined || Number.isNaN(v) ? '—' : `${v}${s}`;
}

function riskVariant(r: HazardLevel): 'default' | 'success' | 'warning' | 'danger' | 'critical' {
  if (r === 'Critical') return 'critical';
  if (r === 'High') return 'danger';
  if (r === 'Moderate') return 'warning';
  if (r === 'Low') return 'success';
  return 'default';
}

export default function MonsoonDynamicsDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [region, setRegion] = useState<MonsoonSubRegion | 'All'>('All');

  const subRegions: MonsoonSubRegion[] = ['Jammu', 'Kashmir', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  const load = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(`/api/hazard-intelligence/monsoon-dynamics${force ? '?refresh=1' : ''}`, { cache: 'no-store' });
      const json = await res.json();
      if (json.success) setData(json);
    } catch {}
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  const corridors: MonsoonCorridorLiveRecord[] = data?.corridors || [];
  const filtered = useMemo(
    () => (region === 'All' ? corridors : corridors.filter((c) => c.subRegion === region)),
    [corridors, region]
  );

  const markers: AtmosphericMapMarker[] = useMemo(
    () =>
      filtered.map((c) => ({
        id: c.id,
        title: c.name,
        subtitle: `${c.subRegion} (${c.administrativeUnit}) · ${c.elevation_m}m`,
        lat: c.latitude,
        lon: c.longitude,
        color: (c.liveObservation.above_ground_rh_pct ?? 0) >= 65 ? '#14b8a6' : '#38bdf8',
        liveSummary: `${c.liveObservation.above_ground_level_hpa}hPa RH: ${fmt(c.liveObservation.above_ground_rh_pct, '%')} · TCWV: ${fmt(c.liveObservation.tcwv_kg_m2, ' kg/m²')}`,
        forecastSummary: `7d Rain: ${fmt(c.forecast7d.total_rain_mm, ' mm')} · Max CAPE: ${fmt(c.forecast7d.max_cape_jkg, ' J/kg')}`,
      })),
    [filtered]
  );

  const sc = data?.seasonContext;
  const syncUtc = data?.meta?.updatedAt ? `${new Date(data.meta.updatedAt).toISOString().slice(0, 16).replace('T', ' ')} UTC` : 'Syncing...';

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Atmospheric Systems · 8-Tab Monsoon & Moisture Command"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Atmospheric Systems', href: '/hazard-intelligence/atmospheric-systems' },
          { label: 'Monsoon Dynamics', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics' },
          { label: 'Monitoring Dashboard' },
        ]}
        title={
          <>
            <span className="block leading-[1.12] overflow-visible pb-1 sm:pb-2">Monsoon Dynamics</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Monitoring Dashboard
            </span>
          </>
        }
        subtitle="Terrain-masked 850/700/500 hPa humidity diagnostics, Total-Column Water Vapour (TCWV), ERA5-Land historical 7-day precipitation anomalies, and 168-hour convective CAPE outlooks."
        icon={<CloudRain className="w-6 h-6 text-teal-400" />}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-white/20 text-white font-bold" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => router.push('/hazard-intelligence/atmospheric-systems/monsoon-dynamics')}>
              Corridor Registry
            </Button>
            <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 font-bold text-white" icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />} onClick={() => load(true)} disabled={refreshing}>
              {refreshing ? 'Syncing...' : 'Refresh Telemetry'}
            </Button>
          </div>
        }
        images={['/images/hazard-intelligence/hazard-floods-riverine.jpg', '/images/hazard-intelligence/hazard-glofs-glacial-lakes.jpg']}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Reporting / Configured', value: loading ? '...' : `${sc?.reportingCorridors ?? '—'}/${sc?.configuredCorridors ?? 24}`, icon: 'MapPin', color: 'text-teal-400' },
          { label: 'Seasonal Status', value: loading ? '...' : sc?.seasonalStatusLabel || '—', icon: 'Calendar', color: 'text-amber-300' },
          { label: 'Valid 850hPa RH', value: loading ? '...' : sc?.meanValid850RhPct !== null && sc?.meanValid850RhPct !== undefined ? `${sc.meanValid850RhPct}% (${sc.valid850Corridors}u)` : '—', icon: 'Droplets', color: 'text-sky-400' },
          { label: 'Masked <Psfc (850)', value: loading ? '...' : `${sc?.maskedSubterranean850Corridors ?? '—'}/24`, icon: 'Shield', color: 'text-emerald-400' },
          { label: 'Mean TCWV', value: loading ? '...' : fmt(sc?.meanTcwvKgM2, ' kg/m²'), icon: 'Layers', color: 'text-cyan-300' },
          { label: 'ERA5 Past 7d Peak', value: loading ? '...' : fmt(sc?.peakEra5Past7dMm, ' mm'), icon: 'CloudRain', color: 'text-teal-300' },
          { label: '7d Forecast Peak', value: loading ? '...' : fmt(sc?.peakForecast7dMm, ' mm'), icon: 'Waves', color: 'text-indigo-400' },
          { label: '168h Peak CAPE', value: loading ? '...' : fmt(sc?.maxCapeJkg, ' J/kg'), icon: 'Zap', color: 'text-amber-400' },
        ]}
        iconColor="text-teal-400"
      />

      <div className="sticky top-14 sm:top-16 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${
                    active ? 'bg-teal-500/20 text-white border-teal-400/50' : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {(['All', ...subRegions] as const).map((sr) => (
              <button
                key={sr}
                type="button"
                onClick={() => setRegion(sr)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                  region === sr ? 'bg-teal-500/20 text-teal-200 border border-teal-400/40' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {sr}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-6 flex-1 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card className="glass-intense border-teal-500/25 p-5 space-y-2">
              <div className="text-[10px] font-mono text-teal-400 uppercase">
                Synced {syncUtc} · Init {data?.meta?.modelRunInitUtc?.slice(0, 16).replace('T', ' ') || '—'} UTC
              </div>
              <h2 className="text-lg font-bold text-white">{sc?.regimeHeadline}</h2>
              <p className="text-xs text-amber-200">{sc?.onsetDisclaimer}</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(data?.regionalSummaries || [])
                .filter((r: any) => region === 'All' || r.subRegion === region)
                .map((sr: any) => (
                  <Card key={sr.subRegion} className="glass-intense border-white/10 p-5 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{sr.subRegion}</h3>
                        <p className="text-[10px] text-slate-400">{sr.administrativeUnit} · {sr.reportingCorridors}/{sr.corridors} reporting</p>
                      </div>
                      <Badge variant={riskVariant(sr.overallRisk)} size="sm">{sr.overallRisk}</Badge>
                    </div>
                    <div className="flex justify-between"><span>Valid 850 hPa RH ({sr.valid850Corridors}u):</span> <strong>{sr.meanValid850RhPct !== null ? `${sr.meanValid850RhPct}%` : 'All Masked (<Psfc)'}</strong></div>
                    <div className="flex justify-between"><span>Free-Air RH / TCWV:</span> <strong>{fmt(sr.meanAboveGroundRhPct, '%')} · {fmt(sr.meanTcwvKgM2, ' kg/m²')}</strong></div>
                    <div className="flex justify-between"><span>ERA5 Past 7d (vs Normal):</span> <strong>{fmt(sr.past7dEra5MeanMm, ' mm')} ({sr.normal7dMm} mm)</strong></div>
                    <div className="flex justify-between"><span>7d Forecast Peak:</span> <strong className="text-sky-300">{fmt(sr.forecastMax7dMm, ' mm')}</strong></div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <AtmosphericSystemsMap
            markers={markers}
            polylineCoords={data?.moistureBranches?.map((m: any) => [m.latitude, m.longitude])}
            polylineColor="#14b8a6"
            legendItems={[
              { color: '#14b8a6', label: 'Free-Air RH ≥ 65%' },
              { color: '#38bdf8', label: 'Dry / Off-Season Flow' },
            ]}
          />
        )}

        {activeTab === 'moisture-gates' && (
          <div className="space-y-6">
            <Card className="glass-intense border-white/10 p-5">
              <h2 className="text-base font-bold text-white mb-1">4 Configured Moisture-Gate Diagnostics</h2>
              <p className="text-xs text-slate-400 mb-4">{data?.meta?.moistureGateMethod}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {(data?.moistureBranches || []).map((mb: any) => (
                  <div key={mb.id} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1.5">
                    <div className="font-bold text-teal-300">{mb.branch} — {mb.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Centroid: {mb.latitude}°N, {mb.longitude}°E ({mb.elevation_m}m · Psfc {fmt(mb.surface_pressure_hpa, ' hPa')})
                    </div>
                    <div className="flex justify-between"><span>850 hPa RH:</span> <strong>{mb.is_850hpa_above_ground ? fmt(mb.rh_850hpa_pct, '%') : 'Masked (Subterranean at 3,150 m)'}</strong></div>
                    <div className="flex justify-between"><span>Sampled Free-Air ({mb.sampled_level_hpa} hPa):</span> <strong>{fmt(mb.sampled_rh_pct, '%')} · {fmt(mb.sampled_wind_kmh, ' km/h')} ({fmt(mb.sampled_wind_dir, '°')})</strong></div>
                    <div className="flex justify-between"><span>Total-Column Water Vapour:</span> <strong>{fmt(mb.tcwv_kg_m2, ' kg/m²')}</strong></div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
              <h3 className="text-base font-bold text-white mb-2">Corridor Surface-Pressure vs. 850 hPa Terrain Mask Audit</h3>
              <table className="w-full text-left text-xs min-w-[780px]">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                    <th className="py-2 pr-3">Corridor</th>
                    <th className="py-2 px-2">Sub-Region</th>
                    <th className="py-2 px-2">Elev / DEM</th>
                    <th className="py-2 px-2">Psfc (hPa)</th>
                    <th className="py-2 px-2">850 hPa Status</th>
                    <th className="py-2 px-2">Selected Level</th>
                    <th className="py-2 pl-2">TCWV (kg/m²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filtered.map((c) => (
                    <tr key={c.id}>
                      <td className="py-2 pr-3 font-sans font-semibold text-white">{c.name}</td>
                      <td className="py-2 px-2 font-sans text-slate-300">{c.subRegion}</td>
                      <td className="py-2 px-2 text-slate-400">{c.elevation_m} / {fmt(c.provenance.modelGridElevationM)}m</td>
                      <td className="py-2 px-2 text-slate-200">{fmt(c.liveObservation.surface_pressure_hpa)}</td>
                      <td className={`py-2 px-2 ${c.liveObservation.is_850hpa_above_ground ? 'text-emerald-300' : 'text-amber-300'}`}>
                        {c.liveObservation.is_850hpa_above_ground ? `${fmt(c.liveObservation.rh_850hpa_pct, '%')} (Valid)` : 'MASKED (<Psfc)'}
                      </td>
                      <td className="py-2 px-2 text-sky-300">{c.liveObservation.above_ground_level_hpa} hPa ({fmt(c.liveObservation.above_ground_rh_pct, '%')})</td>
                      <td className="py-2 pl-2 text-teal-300">{fmt(c.liveObservation.tcwv_kg_m2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeTab === 'era5-anomalies' && (
          <Card className="glass-intense border-white/10 p-5 space-y-4">
            <h2 className="text-base font-bold text-white">
              ERA5-Land Historical 7-Day Precipitation ({sc?.historicalWindowLabel}) vs. Climatological Weekly Normal
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.regionalSummaries || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                  <XAxis dataKey="subRegion" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} />
                  <Legend />
                  <Bar dataKey="past7dEra5MeanMm" name="ERA5 Historical 7d (mm)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="normal7dMm" name="Seasonal Weekly Normal (mm)" fill="#64748b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}

        {activeTab === 'forecasts' && (
          <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
            <h2 className="text-base font-bold text-white mb-3">168-Hour NWP Rainfall &amp; Convective CAPE Forecast Matrix</h2>
            <table className="w-full text-left text-xs min-w-[740px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                  <th className="py-2 pr-3">Corridor</th>
                  <th className="py-2 px-2">Sub-Region</th>
                  <th className="py-2 px-2">Valid Steps</th>
                  <th className="py-2 px-2">7d Rain (mm)</th>
                  <th className="py-2 px-2">Peak 24h (mm)</th>
                  <th className="py-2 px-2">Current CAPE</th>
                  <th className="py-2 pl-2">168h Max CAPE (J/kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2 pr-3 font-sans font-semibold text-white">{c.name}</td>
                    <td className="py-2 px-2 font-sans text-slate-300">{c.subRegion}</td>
                    <td className="py-2 px-2 text-emerald-300">{c.forecast7d.valid_hourly_steps}/168h</td>
                    <td className="py-2 px-2 text-sky-300 font-bold">{fmt(c.forecast7d.total_rain_mm)}</td>
                    <td className="py-2 px-2 text-slate-200">{fmt(c.forecast7d.peak_daily_mm)}</td>
                    <td className="py-2 px-2 text-slate-300">{fmt(c.liveObservation.cape_jkg)}</td>
                    <td className="py-2 pl-2 text-amber-300">{fmt(c.forecast7d.max_cape_jkg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'impacts' && (
          <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
            <h2 className="text-base font-bold text-white mb-3">Coupled Hydrological, Slope &amp; Cryospheric Trigger Matrix</h2>
            <table className="w-full text-left text-xs min-w-[720px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                  <th className="py-2 pr-3">Corridor</th>
                  <th className="py-2 px-2">Floods</th>
                  <th className="py-2 px-2">Flash Floods</th>
                  <th className="py-2 px-2">Landslides</th>
                  <th className="py-2 px-2">GLOFs</th>
                  <th className="py-2 pl-2">Exposed System</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2 pr-3 font-semibold text-white">{c.name}</td>
                    <td className="py-2 px-2"><Badge variant={riskVariant(c.coupledRisk.floods)} size="sm">{c.coupledRisk.floods}</Badge></td>
                    <td className="py-2 px-2"><Badge variant={riskVariant(c.coupledRisk.flashFloods)} size="sm">{c.coupledRisk.flashFloods}</Badge></td>
                    <td className="py-2 px-2"><Badge variant={riskVariant(c.coupledRisk.landslides)} size="sm">{c.coupledRisk.landslides}</Badge></td>
                    <td className="py-2 px-2"><Badge variant={riskVariant(c.coupledRisk.glofs)} size="sm">{c.coupledRisk.glofs}</Badge></td>
                    <td className="py-2 pl-2 text-slate-400 truncate max-w-xs">{c.exposedSystem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {(data?.historicalRecords || []).map((hr: any) => (
              <Card key={hr.id} className="glass-intense border-white/10 p-5 space-y-2">
                <div className="text-xs font-mono text-purple-300">{hr.code} · {hr.dates} · {hr.anomaly}</div>
                <h3 className="text-base font-bold text-white">{hr.title}</h3>
                <p className="text-xs text-slate-300">{hr.impact}</p>
                <div className="text-[11px] font-mono text-slate-500">Citation: {hr.source}</div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'provenance' && (
          <div className="space-y-4">
            {(data?.dataSources || []).map((src: any) => (
              <Card key={src.name} className="glass-intense border-white/10 p-5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {src.name}</span>
                  <Badge variant="info" size="sm">{src.tier}</Badge>
                </div>
                <div className="font-mono text-sky-300">{src.endpoint}</div>
                <div className="text-slate-300">{src.parameters} · {src.resolution} · {src.cadence}</div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="monsoon-dynamics" />
      </div>
    </main>
  );
}
