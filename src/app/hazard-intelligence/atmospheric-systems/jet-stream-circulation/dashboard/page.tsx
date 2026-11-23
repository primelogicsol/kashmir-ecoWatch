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
import { JetSectorLiveRecord, JetSubRegion } from '@/data/hazard-jet-stream-circulation';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Compass, Map, Layers, Calendar, AlertTriangle, History,
  Database, Gauge, ArrowLeft, RefreshCw, CheckCircle2
} from 'lucide-react';

type TabId =
  | 'overview'
  | 'map'
  | 'swj-grid'
  | 'troughs-ridges'
  | 'forecasts'
  | 'coupled'
  | 'history'
  | 'provenance';

const TABS: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'overview', label: 'Overview & Status', icon: Compass },
  { id: 'map', label: 'Upper-Air GIS Map', icon: Map },
  { id: 'swj-grid', label: '2D SWJ Axis (45-Node)', icon: Gauge },
  { id: 'troughs-ridges', label: 'Z₅₀₀ Troughs & Ridges', icon: Layers },
  { id: 'forecasts', label: '168h Jet Forecasts', icon: Calendar },
  { id: 'coupled', label: 'Coupled Systems', icon: AlertTriangle },
  { id: 'history', label: 'Historical Climatology', icon: History },
  { id: 'provenance', label: 'Sources & Provenance', icon: Database },
];

function fmt(v: number | null | undefined, s = ''): string {
  return v === null || v === undefined || Number.isNaN(v) ? '—' : `${v}${s}`;
}

export default function JetStreamCirculationDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [region, setRegion] = useState<JetSubRegion | 'All'>('All');

  const subRegions: JetSubRegion[] = ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'];

  const load = useCallback(async (force = false) => {
    if (force) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(`/api/hazard-intelligence/jet-stream-circulation${force ? '?refresh=1' : ''}`, { cache: 'no-store' });
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

  const sectors: JetSectorLiveRecord[] = data?.sectors || [];
  const filtered = useMemo(
    () => (region === 'All' ? sectors : sectors.filter((s) => s.subRegion === region)),
    [sectors, region]
  );

  const markers: AtmosphericMapMarker[] = useMemo(
    () =>
      filtered.map((s) => ({
        id: s.id,
        title: s.name,
        subtitle: `${s.subRegion} (${s.administrativeUnit}) · ${s.elevation_m}m`,
        lat: s.latitude,
        lon: s.longitude,
        color: s.circulationRegime === 'Upper-Level Blocking Ridge' ? '#f59e0b' : s.circulationRegime === '500 hPa Cyclonic Trough' ? '#ef4444' : '#818cf8',
        liveSummary: `250hPa: ${fmt(s.liveUpperAir.jet250_kmh, ' km/h')} · Z500: ${fmt(s.liveUpperAir.z500_gpm, ' gpm')}`,
        forecastSummary: `7d Peak 250hPa: ${fmt(s.forecast7d.peak_jet250_kmh, ' km/h')}`,
      })),
    [filtered]
  );

  const cs = data?.circulationSummary;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Atmospheric Systems · 8-Tab Upper-Tropospheric Command"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Atmospheric Systems', href: '/hazard-intelligence/atmospheric-systems' },
          { label: 'Jet Stream & Circulation', href: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation' },
          { label: 'Monitoring Dashboard' },
        ]}
        title={
          <>
            <span className="block leading-[1.12] overflow-visible pb-1 sm:pb-2">Jet Stream &amp; Circulation</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent">
              Monitoring Dashboard
            </span>
          </>
        }
        subtitle="45-node 2D SWJ axis detection (24°N–40°N × 70°E–80°E), 250/300 hPa wind-core extrema, ERA5-calibrated 500 hPa geopotential departures, and mountain-wave vertical shear."
        icon={<Compass className="w-6 h-6 text-indigo-400" />}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-white/20 text-white font-bold" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => router.push('/hazard-intelligence/atmospheric-systems/jet-stream-circulation')}>
              Sector Registry
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white" icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />} onClick={() => load(true)} disabled={refreshing}>
              {refreshing ? 'Syncing...' : 'Refresh Telemetry'}
            </Button>
          </div>
        }
        images={['/images/hazard-intelligence/hazard-command-center.jpg', '/images/hazard-intelligence/hazard-avalanches-snow.jpg']}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip
        kpis={[
          { label: 'Reporting / Configured', value: loading ? '...' : `${cs?.reportingSectors ?? '—'}/${cs?.configuredSectors ?? 24}`, icon: 'MapPin', color: 'text-indigo-400' },
          { label: 'SWJ Axis (2D Grid)', value: loading ? '...' : cs?.jetCoreLatitudeDeg !== null && cs?.jetCoreLatitudeDeg !== undefined ? `${cs.jetCoreLatitudeDeg}°N` : 'Not Assessed', icon: 'Compass', color: 'text-violet-400' },
          { label: '250hPa Peak Streak', value: loading ? '...' : fmt(cs?.jetCoreSpeedKmh, ' km/h'), icon: 'Wind', color: 'text-sky-400' },
          { label: 'Zonal-Mean u250 Max', value: loading ? '...' : fmt(cs?.peakZonalMeanU250Kmh, ' km/h'), icon: 'Zap', color: 'text-indigo-300' },
          { label: 'Mean Z500 Height', value: loading ? '...' : fmt(cs?.mean500hPaHeightGpm, ' gpm'), icon: 'Gauge', color: 'text-emerald-400' },
          { label: 'Mean Z500 Departure', value: loading ? '...' : cs?.mean500hPaDepartureGpm !== null && cs?.mean500hPaDepartureGpm !== undefined ? `${cs.mean500hPaDepartureGpm >= 0 ? '+' : ''}${cs.mean500hPaDepartureGpm} gpm` : '—', icon: 'TrendingUp', color: 'text-cyan-300' },
          { label: 'Cyclonic Troughs', value: loading ? '...' : cs?.troughSectorCount ?? 'Not Assessed', icon: 'AlertTriangle', color: 'text-red-400' },
          { label: 'Blocking Ridges', value: loading ? '...' : cs?.ridgeSectorCount ?? 'Not Assessed', icon: 'Layers', color: 'text-amber-400' },
        ]}
        iconColor="text-indigo-400"
      />

      <div className="sticky top-14 sm:top-16 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border ${active ? 'bg-indigo-500/20 text-white border-indigo-400/50' : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white'}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {(['All', ...subRegions] as const).map((sr) => (
              <button key={sr} type="button" onClick={() => setRegion(sr)} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${region === sr ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/40' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                {sr}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="container mx-auto px-6 py-6 flex-1 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card className="glass-intense border-indigo-500/25 p-5 space-y-2">
              <div className="text-[10px] font-mono text-indigo-400 uppercase">
                Valid UTC: {cs?.validTimeUtc?.slice(0, 16).replace('T', ' ') || '—'} UTC · Domain Peak: {fmt(cs?.domainPeak250Kmh, ' km/h')} at {cs?.domainPeakCoords || '—'}
              </div>
              <h2 className="text-lg font-bold text-white">{cs?.dominantPattern}</h2>
              <p className="text-xs text-slate-400">{data?.meta?.swjDomainDescription}</p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(data?.regionalSummaries || [])
                .filter((r: any) => region === 'All' || r.subRegion === region)
                .map((sr: any) => (
                  <Card key={sr.subRegion} className="glass-intense border-white/10 p-5 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-bold text-white">{sr.subRegion}</h3>
                        <p className="text-[10px] text-slate-400">{sr.administrativeUnit} · {sr.reportingSectors}/{sr.sectors} reporting</p>
                      </div>
                      <Badge variant="info" size="sm">{fmt(sr.maxJet250Kmh, ' km/h')}</Badge>
                    </div>
                    <div className="flex justify-between"><span>Mean Z500:</span> <strong>{fmt(sr.meanZ500Gpm, ' gpm')}</strong></div>
                    <div className="flex justify-between"><span>Climatological Departure:</span> <strong>{sr.meanZ500DepartureGpm !== null ? `${sr.meanZ500DepartureGpm >= 0 ? '+' : ''}${sr.meanZ500DepartureGpm} gpm` : '—'}</strong></div>
                    <div className="flex justify-between"><span>Mean 500 hPa Temp:</span> <strong>{fmt(sr.meanTemp500C, '°C')}</strong></div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <AtmosphericSystemsMap
            markers={markers}
            polylineCoords={(data?.meridionalProfile || []).map((p: any) => [p.latitude, 75.0])}
            polylineColor="#818cf8"
            legendItems={[
              { color: '#818cf8', label: 'Jet Core / Westerlies' },
              { color: '#f59e0b', label: 'Blocking Ridge (ΔZ ≥ +60)' },
              { color: '#ef4444', label: 'Cyclonic Trough (ΔZ ≤ -40)' },
            ]}
          />
        )}

        {activeTab === 'swj-grid' && (
          <Card className="glass-intense border-white/10 p-5 space-y-4">
            <h2 className="text-base font-bold text-white">
              45-Node 2D SWJ Detection Table (24°N–40°N Zonal Mean across 70°E, 72.5°E, 75°E, 77.5°E, 80°E)
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.meridionalProfile || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
                  <XAxis dataKey="latLabel" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px' }} />
                  <Legend />
                  <Area type="monotone" dataKey="zonalMeanU250Kmh" name="Zonal-Mean u250 (km/h)" stroke="#818cf8" fill="#4f46e5" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="zonalMeanSpeed250Kmh" name="Zonal-Mean Speed 250 hPa (km/h)" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[720px]">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                    <th className="py-2 pr-3">Latitude Band</th>
                    <th className="py-2 px-2">Valid Grid Pts</th>
                    <th className="py-2 px-2">Zonal Mean u₂₅₀ (m/s)</th>
                    <th className="py-2 px-2">Zonal Mean u₂₅₀ (km/h)</th>
                    <th className="py-2 px-2">Mean Z₅₀₀ (gpm)</th>
                    <th className="py-2 pl-2">Z₅₀₀ Departure vs Norm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {(data?.meridionalProfile || []).map((b: any) => (
                    <tr key={b.latitude}>
                      <td className="py-2 pr-3 font-sans font-semibold text-white">{b.label}</td>
                      <td className="py-2 px-2 text-emerald-300">{b.validLongitudesCount}/5</td>
                      <td className="py-2 px-2 text-indigo-300">{fmt(b.zonalMeanU250Ms)}</td>
                      <td className="py-2 px-2 text-sky-300 font-bold">{fmt(b.zonalMeanU250Kmh)}</td>
                      <td className="py-2 px-2 text-slate-200">{fmt(b.zonalMeanZ500Gpm)}</td>
                      <td className="py-2 pl-2 text-amber-300">{b.z500DepartureGpm !== null ? `${b.z500DepartureGpm >= 0 ? '+' : ''}${b.z500DepartureGpm} gpm` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'troughs-ridges' && (
          <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
            <h2 className="text-base font-bold text-white mb-1">Sector 500 hPa Geopotential Height vs. Seasonal-Latitudinal ERA5 Climatology</h2>
            <p className="text-xs text-slate-400 mb-3">{data?.meta?.z500FeatureThresholds}</p>
            <table className="w-full text-left text-xs min-w-[780px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                  <th className="py-2 pr-3">Sector</th>
                  <th className="py-2 px-2">Sub-Region</th>
                  <th className="py-2 px-2">Z₅₀₀ (gpm)</th>
                  <th className="py-2 px-2">Seasonal Norm</th>
                  <th className="py-2 px-2">Departure</th>
                  <th className="py-2 px-2">24h ΔZ₅₀₀</th>
                  <th className="py-2 pl-2">Detected Regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 pr-3 font-sans font-semibold text-white">{s.name}</td>
                    <td className="py-2 px-2 font-sans text-slate-300">{s.subRegion}</td>
                    <td className="py-2 px-2 text-slate-200">{fmt(s.liveUpperAir.z500_gpm)}</td>
                    <td className="py-2 px-2 text-slate-400">{s.liveUpperAir.z500_climatology_gpm}</td>
                    <td className={`py-2 px-2 ${(s.liveUpperAir.z500_departure_gpm ?? 0) >= 60 ? 'text-amber-300 font-bold' : (s.liveUpperAir.z500_departure_gpm ?? 0) <= -40 ? 'text-rose-300 font-bold' : 'text-emerald-300'}`}>
                      {s.liveUpperAir.z500_departure_gpm !== null ? `${s.liveUpperAir.z500_departure_gpm >= 0 ? '+' : ''}${s.liveUpperAir.z500_departure_gpm} gpm` : '—'}
                    </td>
                    <td className="py-2 px-2 text-slate-300">{fmt(s.liveUpperAir.z500_24h_delta_gpm, ' gpm')}</td>
                    <td className="py-2 pl-2 font-sans text-white">{s.circulationRegime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'forecasts' && (
          <Card className="glass-intense border-white/10 p-5 overflow-x-auto">
            <h2 className="text-base font-bold text-white mb-3">168-Hour Upper-Air Wind &amp; Geopotential Extrema Matrix</h2>
            <table className="w-full text-left text-xs min-w-[720px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase text-slate-400">
                  <th className="py-2 pr-3">Sector</th>
                  <th className="py-2 px-2">Valid Steps</th>
                  <th className="py-2 px-2">7d Peak 250 Jet</th>
                  <th className="py-2 px-2">7d Min Z₅₀₀</th>
                  <th className="py-2 px-2">7d Max Z₅₀₀</th>
                  <th className="py-2 pl-2">7d Peak Gust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 pr-3 font-sans font-semibold text-white">{s.name}</td>
                    <td className="py-2 px-2 text-emerald-300">{s.forecast7d.valid_hourly_steps}/168h</td>
                    <td className="py-2 px-2 text-indigo-300 font-bold">{fmt(s.forecast7d.peak_jet250_kmh, ' km/h')}</td>
                    <td className="py-2 px-2 text-sky-300">{fmt(s.forecast7d.min_z500_gpm, ' gpm')}</td>
                    <td className="py-2 px-2 text-amber-300">{fmt(s.forecast7d.max_z500_gpm, ' gpm')}</td>
                    <td className="py-2 pl-2 text-slate-200">{fmt(s.forecast7d.peak_surface_gust_kmh, ' km/h')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'coupled' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Western Disturbances Steering', href: '/hazard-intelligence/atmospheric-systems/western-disturbances', desc: '250/300 hPa SWJ acts as the Rossby waveguide steering Mediterranean troughs toward Hindu Kush and Kashmir.' },
              { title: 'Monsoon Progression & Tibetan High', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics', desc: 'Northward migration of the SWJ past 35°N allows upper-level easterlies and Southwest Monsoon onset.' },
              { title: 'Wind-Slab Avalanche Loading', href: '/hazard-intelligence/avalanches', desc: 'Descending jet momentum across >3,000 m passes scours windward snow and loads leeward starting zones.' },
              { title: 'Blocking Ridge Valley Smog Lid', href: '/environmental-monitoring/air-pollution', desc: 'Anticyclonic 500 hPa subsidence (ΔZ ≥ +60 gpm) compresses the winter Kashmir basin inversion layer, spiking PM2.5.' },
            ].map((c) => (
              <Link key={c.title} href={c.href}>
                <Card className="glass-intense border-white/10 hover:border-indigo-500/40 p-5 h-full">
                  <h3 className="text-base font-bold text-white mb-1">{c.title} →</h3>
                  <p className="text-xs text-slate-400">{c.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {(data?.historicalRecords || []).map((hr: any) => (
              <Card key={hr.id} className="glass-intense border-white/10 p-5 space-y-2">
                <div className="text-xs font-mono text-purple-300">{hr.period}</div>
                <h3 className="text-base font-bold text-white">{hr.title}</h3>
                <p className="text-xs text-slate-300">{hr.mechanism}</p>
                <p className="text-xs text-slate-400">{hr.impact}</p>
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
        <RelatedHazardIntelligence currentModule="jet-stream-circulation" />
      </div>
    </main>
  );
}
