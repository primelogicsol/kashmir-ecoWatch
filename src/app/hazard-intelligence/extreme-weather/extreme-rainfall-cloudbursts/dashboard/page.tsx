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
import { DisplaySubRegion } from '@/lib/atmospheric-ingestion';
import { ExtremeRainfallLiveRecord } from '@/data/hazard-extreme-weather';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  CloudRain, Compass, Map, Radio, BarChart3, Zap,
  AlertTriangle, History, Database, ArrowLeft, RefreshCw, CheckCircle2
} from 'lucide-react';

type TabId =
  | 'overview'
  | 'map'
  | 'observations'
  | 'forecasts-ensemble'
  | 'event-intelligence'
  | 'coupled-hazards'
  | 'climatology'
  | 'provenance';

// Exact 8-Tab Structure from KEW Extreme Weather Systems Specification
const TABS: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'overview', label: '1. Overview & Live Status', icon: Compass },
  { id: 'map', label: '2. Geographic Map', icon: Map },
  { id: 'observations', label: '3. Observations & Satellite', icon: Radio },
  { id: 'forecasts-ensemble', label: '4. Forecasts & Ensemble', icon: BarChart3 },
  { id: 'event-intelligence', label: '5. Extreme Event Intel', icon: Zap },
  { id: 'coupled-hazards', label: '6. Coupled Hazards', icon: AlertTriangle },
  { id: 'climatology', label: '7. Historical Trends', icon: History },
  { id: 'provenance', label: '8. Sources & Provenance', icon: Database },
];

function fmt(v: number | null | undefined, s = ''): string {
  return v === null || v === undefined || Number.isNaN(v) ? '—' : `${v}${s}`;
}

export default function ExtremeRainfallDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [region, setRegion] = useState<DisplaySubRegion | 'All'>('All');

  const subRegions: DisplaySubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  const load = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(
        `/api/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts${force ? '?refresh=1' : ''}`,
        { cache: 'no-store' }
      );
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

  const watersheds: ExtremeRainfallLiveRecord[] = data?.watersheds || [];
  const filtered = useMemo(
    () => (region === 'All' ? watersheds : watersheds.filter((w) => w.subRegion === region)),
    [watersheds, region]
  );

  const markers: AtmosphericMapMarker[] = useMemo(
    () =>
      filtered.map((w) => ({
        id: w.id,
        title: w.name,
        subtitle: `${w.subRegion} (${w.administrativeUnit}) · ${w.elevation_m}m`,
        lat: w.latitude,
        lon: w.longitude,
        color:
          w.extremeClass === 'Cloudburst-Supportive Environment (Unconfirmed)'
            ? '#ef4444'
            : w.extremeClass === 'Heavy Orographic Rain Warning'
              ? '#f59e0b'
              : '#06b6d4',
        liveSummary: `ERA5 Past 7d: ${fmt(w.currentAnalysis.era5_past7d_mm, ' mm')} · TCWV: ${fmt(w.currentAnalysis.tcwv_kg_m2, ' kg/m²')}`,
        forecastSummary: `Peak 24h: ${fmt(w.forecast168h.peak_24h_mm, ' mm')} · Ens P90: ${fmt(w.ensembleGfs31.p90_7d_mm, ' mm')}`,
      })),
    [filtered]
  );

  const sm = data?.summary;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Extreme Weather Systems · 8-Tab Operational Command"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Extreme Weather', href: '/hazard-intelligence/extreme-weather' },
          { label: 'Extreme Rainfall', href: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts' },
          { label: 'Dashboard' },
        ]}
        title={
          <>
            <span className="block leading-[1.12] overflow-visible pb-1 sm:pb-2">Extreme Rainfall</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Monitoring Dashboard
            </span>
          </>
        }
        subtitle="Deterministic 1h/3h/24h NWP vs. 31-member NOAA GFS Ensemble probabilities, ERA5-Land historical precipitation, and RainViewer radar across 24 Himalayan watersheds."
        icon={<CloudRain className="w-6 h-6 text-cyan-400" />}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-white/20 text-white font-bold" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => router.push('/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts')}>
              Watershed Registry
            </Button>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-white" icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />} onClick={() => load(true)} disabled={refreshing}>
              {refreshing ? 'Syncing...' : 'Refresh Telemetry'}
            </Button>
          </div>
        }
        images={['/images/hazard-intelligence/hazard-floods-riverine.jpg', '/images/hazard-intelligence/hazard-landslides-monitoring.jpg']}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Reporting / Configured', value: loading ? '...' : `${sm?.reportingWatersheds ?? '—'}/${sm?.configuredWatersheds ?? 24}`, icon: 'MapPin', color: 'text-cyan-400' },
          { label: 'ERA5 Past 7d Peak', value: loading ? '...' : fmt(sm?.peakEra5Past7dMm, ' mm'), icon: 'Database', color: 'text-emerald-400' },
          { label: 'Peak 1h Forecast', value: loading ? '...' : fmt(sm?.peakForecast1hMm, ' mm/h'), icon: 'Zap', color: 'text-amber-300' },
          { label: 'Peak 24h Forecast', value: loading ? '...' : fmt(sm?.peakForecast24hMm, ' mm'), icon: 'CloudRain', color: 'text-sky-400' },
          { label: 'Peak 168h Total', value: loading ? '...' : fmt(sm?.peakForecast168hMm, ' mm'), icon: 'Waves', color: 'text-blue-300' },
          { label: 'Ensemble P(≥50mm)', value: loading ? '...' : fmt(sm?.maxEnsembleProbGe50Pct, '%'), icon: 'BarChart3', color: 'text-indigo-400' },
          { label: 'Active Alerts', value: loading ? '...' : sm?.elevatedAlertWatersheds ?? '—', icon: 'AlertTriangle', color: 'text-rose-400' },
          { label: 'Radar Status', value: data?.radarOverlay?.available ? 'Live Frame' : 'Standby', icon: 'Radio', color: 'text-teal-300' },
        ]}
        iconColor="text-cyan-400"
      />

      <div className="sticky top-14 sm:top-16 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${active ? 'bg-cyan-500/20 text-white border-cyan-400/50' : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white'}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {(['All', ...subRegions] as const).map((sr) => (
              <button key={sr} type="button" onClick={() => setRegion(sr)} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${region === sr ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                {sr}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-6 flex-1 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card className="glass-intense border-cyan-500/25 p-5 space-y-2">
              <div className="text-[10px] font-mono text-cyan-400 uppercase">
                Init: {data?.meta?.modelRunInitUtc?.slice(0, 16).replace('T', ' ') || '—'} UTC · Synced: {data?.meta?.updatedAt?.slice(0, 16).replace('T', ' ') || '—'} UTC
              </div>
              <h2 className="text-lg font-bold text-white">Regional Extreme Rainfall &amp; Ensemble Tail-Risk Synthesis</h2>
              <p className="text-xs text-amber-200">{sm?.scientificDisclaimer}</p>
            </Card>
            <Card className="glass-intense border-white/10 p-5">
              <h3 className="text-base font-bold text-white mb-3">ERA5 Historical 7d vs. 7d Forecast Peak Across 6 Sub-Regions</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.regionalSummaries || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                    <XAxis dataKey="subRegion" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} />
                    <Legend />
                    <Bar dataKey="era5Mean7dMm" name="ERA5 Past 7d Mean (mm)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="peakForecast24hMm" name="Forecast Peak 24h (mm)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="peakForecast168hMm" name="Forecast 7d Total Peak (mm)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'map' && (
          <AtmosphericSystemsMap
            markers={markers}
            legendItems={[
              { color: '#06b6d4', label: 'No Extreme Signal' },
              { color: '#f59e0b', label: 'Heavy Rain Warning' },
              { color: '#ef4444', label: 'Cloudburst-Supportive Proxy' },
            ]}
          />
        )}

        {activeTab === 'observations' && (
          <Card className="glass-intense border-white/10 p-5 space-y-3 text-xs">
            <h2 className="text-base font-bold text-white">Observations, Radar &amp; Historical Reanalysis Evidence</h2>
            <p className="text-slate-300">
              1. <strong>RainViewer Composite Weather Radar:</strong> {data?.radarOverlay?.available ? `Live frame observed at ${data.radarOverlay.observedAtUtc}` : 'Unavailable'}.<br />
              2. <strong>ECMWF ERA5-Land Historical Reanalysis:</strong> Validated window <code>{data?.meta?.historicalWindow}</code> (48-hour reanalysis latency).<br />
              3. <strong>NASA GPM IMERG Disclosure:</strong> Direct half-hourly IMERG Early Run HDF5 granules have ~4-hour latency and require NASA Earthdata bearer credentials; ERA5-Land + RainViewer radar provide open automated coverage here.
            </p>
          </Card>
        )}

        {activeTab === 'forecasts-ensemble' && (
          <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
            <h2 className="text-base font-bold text-white mb-3">Deterministic NWP vs. 31-Member NOAA GFS Ensemble Spread</h2>
            <table className="w-full text-left text-xs min-w-[820px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                  <th className="py-2 pr-3">Watershed</th>
                  <th className="py-2 px-2">Sub-Region</th>
                  <th className="py-2 px-2">Det. 7d (mm)</th>
                  <th className="py-2 px-2">Ens Median (7d)</th>
                  <th className="py-2 px-2">Ens P90 (7d)</th>
                  <th className="py-2 px-2">Max Member 24h</th>
                  <th className="py-2 pl-2">P(24h ≥ 25 / ≥ 50mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filtered.map((w) => (
                  <tr key={w.id}>
                    <td className="py-2 pr-3 font-sans font-semibold text-white">{w.name}</td>
                    <td className="py-2 px-2 font-sans text-slate-300">{w.subRegion}</td>
                    <td className="py-2 px-2 text-sky-300 font-bold">{fmt(w.forecast168h.total_168h_mm)}</td>
                    <td className="py-2 px-2 text-slate-200">{fmt(w.ensembleGfs31.median_7d_mm)}</td>
                    <td className="py-2 px-2 text-indigo-300 font-bold">{fmt(w.ensembleGfs31.p90_7d_mm)}</td>
                    <td className="py-2 px-2 text-amber-300">{fmt(w.ensembleGfs31.max_member_24h_mm)}</td>
                    <td className="py-2 pl-2 text-emerald-300">{fmt(w.ensembleGfs31.prob_24h_ge_25mm_pct, '%')} / {fmt(w.ensembleGfs31.prob_24h_ge_50mm_pct, '%')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'event-intelligence' && (
          <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
            <h2 className="text-base font-bold text-white mb-3">Sub-Daily 1h / 3h / 24h Intensity &amp; Convective Instability Matrix</h2>
            <table className="w-full text-left text-xs min-w-[780px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                  <th className="py-2 pr-3">Watershed</th>
                  <th className="py-2 px-2">Peak 1h (mm)</th>
                  <th className="py-2 px-2">Peak 3h (mm)</th>
                  <th className="py-2 px-2">Peak 24h (mm)</th>
                  <th className="py-2 px-2">Max CAPE (J/kg)</th>
                  <th className="py-2 pl-2">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filtered.map((w) => (
                  <tr key={w.id}>
                    <td className="py-2 pr-3 font-sans font-semibold text-white">{w.name}</td>
                    <td className="py-2 px-2 text-cyan-300">{fmt(w.forecast168h.peak_1h_mm)}</td>
                    <td className="py-2 px-2 text-sky-300">{fmt(w.forecast168h.peak_3h_mm)}</td>
                    <td className="py-2 px-2 text-indigo-300 font-bold">{fmt(w.forecast168h.peak_24h_mm)}</td>
                    <td className="py-2 px-2 text-amber-300">{fmt(w.forecast168h.max_cape_jkg)}</td>
                    <td className="py-2 pl-2 font-sans text-slate-200">{w.extremeClass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'coupled-hazards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Flash Flood Intelligence', href: '/hazard-intelligence/flash-floods', desc: 'Steep mountain torrents respond within 15–60 minutes to intense 1h/3h rainfall bursts.' },
              { title: 'Riverine Flood Gauges', href: '/hazard-intelligence/floods', desc: 'Basin-wide 24h–72h accumulations drive Jhelum, Chenab, Tawi, and Mangla hydrograph peaks.' },
              { title: 'Cut-Slope Landslide Registry', href: '/hazard-intelligence/landslides', desc: 'Pore-pressure spikes along NH-44 Ramban, Mughal Road, Neelum, and KKH trigger rockfalls and debris flows.' },
              { title: 'Monsoon Dynamics', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics', desc: 'Upstream 850/700 hPa moisture advection and TCWV supply precipitable water for extreme downpours.' },
            ].map((c) => (
              <Link key={c.title} href={c.href}>
                <Card className="glass-intense border-white/10 hover:border-cyan-500/40 p-5 h-full">
                  <h3 className="text-base font-bold text-white mb-1">{c.title} →</h3>
                  <p className="text-xs text-slate-400">{c.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'climatology' && (
          <div className="space-y-4">
            {(data?.historicalRecords || []).map((hr: any) => (
              <Card key={hr.id} className="glass-intense border-white/10 p-5 space-y-1.5">
                <div className="text-xs font-mono text-purple-300">{hr.code} · {hr.dates}</div>
                <h3 className="text-base font-bold text-white">{hr.title}</h3>
                <div className="text-xs text-amber-300 font-mono">{hr.intensity}</div>
                <p className="text-xs text-slate-300">{hr.impact}</p>
                <div className="text-[11px] font-mono text-slate-500">Citation: {hr.source}</div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'provenance' && (
          <div className="space-y-4">
            {data?.sourceEnvelopes &&
              Object.entries(data.sourceEnvelopes).map(([key, env]: [string, any]) => (
                <Card key={key} className="glass-intense border-white/10 p-5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {env.sourceName}
                    </span>
                    <Badge variant="info" size="sm">{env.provenanceClass} · {env.freshnessStatus}</Badge>
                  </div>
                  <div className="font-mono text-sky-300">{env.endpoint} · Model: {env.model}</div>
                  <div className="font-mono text-slate-400">
                    Init: {env.initializationTimeUtc || 'N/A'} · Valid: {env.validTimeUtc || 'N/A'} · Fetched: {env.fetchTimeUtc}
                  </div>
                  <div className="font-mono text-emerald-300">
                    Points: {env.domain.returnedPoints}/{env.domain.requestedPoints} · Units Verified: {String(env.unitValidationPassed)}
                  </div>
                </Card>
              ))}
          </div>
        )}
      </section>

      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="extreme-rainfall-cloudbursts" />
      </div>
    </main>
  );
}
