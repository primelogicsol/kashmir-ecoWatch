'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { ChinarSubNav } from '@/components/chinar-monitoring/ChinarSubNav';
import {
  CHINAR_DATA_PROVIDERS,
  INSTITUTIONAL_CONTRIBUTORS,
  ChinarDataProvider,
  InstitutionalContributor
} from '@/data/chinar-monitoring';
import {
  Radio,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Activity,
  Layers,
  Database,
  AlertCircle,
  HelpCircle,
  Server,
  Trees
} from 'lucide-react';

export default function ChinarDataSourcesPage() {
  const [activeTab, setActiveTab] = useState<'PROVIDERS' | 'INSTITUTIONS' | 'SCHEDULES'>('PROVIDERS');

  const refreshSchedules = [
    { source: 'IMD Weather Observations', frequency: 'Every 15–60 minutes', protocol: 'REST JSON via api.imd.gov.in', useCase: 'Heatwave & frost shock telemetry' },
    { source: 'Copernicus Sentinel-2', frequency: 'Every 5 days (revisit)', protocol: 'STAC API via dataspace.copernicus.eu', useCase: 'Canopy greenness & NDVI anomaly detection' },
    { source: 'NASA POWER Climatology', frequency: 'Daily (2-day latency)', protocol: 'REST JSON via power.larc.nasa.gov', useCase: 'Historical climate & solar radiation time series' },
    { source: 'Open-Meteo Soil Model', frequency: 'Every 1–6 hours', protocol: 'High-res ECMWF/ICON model query', useCase: 'Root zone moisture (0-100cm) deficit tracking' },
    { source: 'GBIF Occurrence API', frequency: 'Weekly', protocol: 'REST API via gbif.org/developer', useCase: 'Botanical specimen & occurrence verification' },
    { source: 'OpenStreetMap Overpass', frequency: 'Daily query', protocol: 'Overpass QL tree tagging queries', useCase: 'Community mapped individual Chinar nodes' },
    { source: 'JKFRI Digital Tree Aadhaar', frequency: 'Upon approved release', protocol: 'Institutional exchange pipeline', useCase: 'Authoritative tree census & physical QR tags' },
    { source: 'University Research Data', frequency: 'Monthly', protocol: 'Repository / journal synchronization', useCase: 'Pathology, dendrochronology & genetics' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ── 1. MODULE HERO HEADER (Standardized with Kashmir Chinar Hero Image) ─── */}
      <Heading
        label="05 · RESEARCH, DATA SOURCES & METHODOLOGY"
        images={['/images/env-monitoring/kashmir-chinar-hero.jpg', '/images/env-monitoring/kashmir-plastic-hero.jpg']}
        overlayClassName="from-slate-950/85 via-slate-950/70 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Chinar Monitoring', href: '/environmental-monitoring/chinar-monitoring' },
          { label: 'Chinar Data Sources & Integrations' },
        ]}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-700 text-white font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                DATA STREAMS
              </span>
              <span>Kashmir Chinar Monitoring</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-cyan-400 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
              Chinar Data Sources & Integrations
            </span>
          </>
        }
        subtitle="Telemetry connectors, Copernicus Sentinel API hubs, JKFRI census integrations, IMD meteorological feeds, and open arboricultural research registries."
        icon={<Radio className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/environmental-monitoring/chinar-monitoring/methodology"
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Open APIs</span>
            </Link>
            <Link
              href="/environmental-monitoring/chinar-monitoring"
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5"
            >
              <Trees className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chinar Overview Hub</span>
            </Link>
          </div>
        }
      />
      <ChinarSubNav />

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Integration Header Metric Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">External APIs</span>
            <div className="text-2xl font-black text-cyan-400">9 Platforms</div>
            <span className="text-[10px] text-slate-500 font-mono">IMD, Copernicus, NASA, OSM</span>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Priority Institutions</span>
            <div className="text-2xl font-black text-emerald-400">10 Bodies</div>
            <span className="text-[10px] text-slate-500 font-mono">JKFRI, Universities, Floriculture</span>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Census Custodian</span>
            <div className="text-2xl font-black text-white">1 Custodian</div>
            <span className="text-[10px] text-slate-500 font-mono">JKFRI Tree Aadhaar System</span>
          </Card>

          <Card className="bg-slate-900/80 border-white/10 p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Live Connections</span>
            <div className="text-2xl font-black text-emerald-300">Operational</div>
            <span className="text-[10px] text-slate-500 font-mono">Documented public APIs</span>
          </Card>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-[6px] border border-white/10 text-xs w-full sm:w-fit overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-1.5">
          <button
            onClick={() => setActiveTab('PROVIDERS')}
            className={`px-3 py-1.5 rounded-[4px] font-medium whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'PROVIDERS' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            External Data APIs (9)
          </button>
          <button
            onClick={() => setActiveTab('INSTITUTIONS')}
            className={`px-3 py-1.5 rounded-[4px] font-medium whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'INSTITUTIONS' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Institutional Contributor Registry (10)
          </button>
          <button
            onClick={() => setActiveTab('SCHEDULES')}
            className={`px-3 py-1.5 rounded-[4px] font-medium whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'SCHEDULES' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Automated Refresh Schedules
          </button>
        </div>

        {/* Tab 1: External APIs */}
        {activeTab === 'PROVIDERS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHINAR_DATA_PROVIDERS.map((prov) => (
                <Card key={prov.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          {prov.category}
                        </span>
                        <h3 className="text-base font-bold text-white mt-1.5">{prov.name}</h3>
                        <div className="text-xs text-slate-400">{prov.organization}</div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] shrink-0 border ${
                        prov.accessStatus === 'API_DOCUMENTED_READY'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : prov.accessStatus === 'RESTRICTED_INSTITUTIONAL'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      }`}>
                        {prov.accessStatus}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs pt-2 border-t border-white/5">
                      <div>
                        <span className="text-slate-500 text-[11px] block">Data Provided:</span>
                        <span className="text-slate-300">{prov.primaryDataProvided}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[11px] block">Scientific Application:</span>
                        <span className="text-slate-300">{prov.scientificUse}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Update: {prov.updateFrequency}
                    </span>
                    <a
                      href={prov.endpointDocumentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] flex items-center gap-1"
                    >
                      <span>API Docs</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Institutional Contributors */}
        {activeTab === 'INSTITUTIONS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INSTITUTIONAL_CONTRIBUTORS.map((inst) => (
                <Card key={inst.id} className="bg-slate-900/80 border-white/10 p-5 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {inst.collaborationStatus}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1.5">{inst.name}</h3>
                      <div className="text-xs text-slate-400">{inst.role}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-white/5">
                    <strong className="text-slate-400">Scientific Contribution:</strong> {inst.scientificContribution}
                  </p>

                  <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                    <span className="text-slate-500 font-medium">Focal Office:</span> {inst.focalContact}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Schedules */}
        {activeTab === 'SCHEDULES' && (
          <div className="bg-slate-900/80 border border-white/10 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Proposed Automated Ingestion &amp; Polling Schedules
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-950/70 font-mono text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Data Feed / Service</th>
                    <th className="py-2.5 px-3">Refresh Cadence</th>
                    <th className="py-2.5 px-3">Protocol / Method</th>
                    <th className="py-2.5 px-3">Scientific Intelligence Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {refreshSchedules.map((s, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-white">{s.source}</td>
                      <td className="py-2.5 px-3 font-mono text-cyan-300">{s.frequency}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{s.protocol}</td>
                      <td className="py-2.5 px-3 text-slate-300">{s.useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
