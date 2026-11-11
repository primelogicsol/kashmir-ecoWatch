'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { SectoralImpactMap } from '@/components/sectoral-eia/SectoralImpactMap';
import { SECTOR_DEFINITIONS, SHARED_ASSESSMENT_DATABASE } from '@/data/sectoral-eia';
import {
  OFFICIAL_HEADLINE_STATISTICS,
  HISTORICAL_ARRIVALS_SERIES,
  TOURISM_INVENTORY_COMPONENTS,
  PILGRIMAGE_SUBSYSTEM_REGISTRY,
  TREKKING_TRAILS_REGISTRY,
  HOUSEBOAT_BASIN_INVENTORY,
  DESTINATION_CARRYING_CAPACITY_REGISTRY
} from '@/data/tourism-eia-inventory';
import {
  Compass,
  MapPin,
  Droplet,
  Waves,
  Trash2,
  Car,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  BarChart3,
  Calendar,
  Layers,
  ShieldCheck,
  Hotel,
  Anchor,
  Mountain,
  Footprints,
  Snowflake,
  Fuel,
  ExternalLink,
  HelpCircle,
  Activity,
  FileText,
  Clock,
  Landmark,
  Building,
  Info
} from 'lucide-react';

type WorkspaceTab = 
  | 'census' 
  | 'arrivals' 
  | 'hospitality' 
  | 'houseboats' 
  | 'trails' 
  | 'pilgrimage' 
  | 'winter_adventure' 
  | 'transport' 
  | 'carrying_capacity' 
  | 'dossiers';

export default function TourismEiaPage() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('census');
  const [selectedPilgrimageTradition, setSelectedPilgrimageTradition] = useState<string>('all');
  const [selectedTrailFilter, setSelectedTrailFilter] = useState<string>('all');

  const sector = SECTOR_DEFINITIONS.tourism;
  const pilots = SHARED_ASSESSMENT_DATABASE.filter(a => a.sector === 'tourism');

  const filteredTrails = selectedTrailFilter === 'all'
    ? TREKKING_TRAILS_REGISTRY
    : TREKKING_TRAILS_REGISTRY.filter(t => t.officialStatus.toLowerCase().includes(selectedTrailFilter.toLowerCase()));

  const filteredPilgrimage = selectedPilgrimageTradition === 'all'
    ? PILGRIMAGE_SUBSYSTEM_REGISTRY
    : PILGRIMAGE_SUBSYSTEM_REGISTRY.filter(p => p.tradition === selectedPilgrimageTradition);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Tourism Environmental Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Sectors' },
          { label: 'Tourism' }
        ]}
        icon={<Compass className="w-6 h-6 text-amber-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tourism Environmental Intelligence & Infrastructure Census
          </span>
        }
        subtitle="Kashmir Division • Quantifying the scale, location, seasonality, and operating intensity of tourism activities before assessing their biophysical environmental pressures."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-10 max-w-6xl">
        {/* SECTION 1: VERIFIED OFFICIAL TOURISM FIGURES BANNER */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] uppercase">
                  Statistical Baseline • Kashmir Division
                </Badge>
                <span className="text-xs text-slate-400">
                  J&K Economic Survey 2025–26 & Legislative Filings
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Authoritative Tourism Statistics (Division-Specific Reconciliation)
              </h2>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Strictly unmixed from Jammu UT aggregates</span>
            </div>
          </div>

          {/* Headline 6-Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {OFFICIAL_HEADLINE_STATISTICS.map((stat) => (
              <div
                key={stat.id}
                className="p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-md"
              >
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    {stat.referenceYear} • {stat.geographicScope}
                  </span>
                  <span className="text-lg sm:text-2xl font-extrabold text-white mt-1 block break-words">
                    {stat.figure}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-300 break-words mt-0.5 block">
                    {stat.metric}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-400 gap-2">
                  <span className="break-words">{stat.publisher.split('/')[0]}</span>
                  <Badge variant="outline" className={`text-[8px] px-1 py-0 ${
                    stat.verificationStatus === 'Pending Measurement'
                      ? 'border-amber-500/40 text-amber-400 bg-amber-500/10'
                      : 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                  }`}>
                    {stat.verificationStatus === 'Pending Measurement' ? 'Pending' : 'Verified'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 italic bg-slate-950 p-2.5 rounded-lg border border-white/5 leading-relaxed">
            <strong className="text-slate-300">Methodological Clarification:</strong> The 2025 Kashmir Division official table reports <strong>1,093,050 domestic</strong> and <strong>22,993 foreign</strong> visits (1,116,043 total). This documents seasonal visits recorded at destination checkpoints, not unique individual persons. In addition, the <strong>414,311 Amarnath pilgrims</strong> are tabulated separately in J&K Legislative Assembly responses, and must not be conflated without explicit disclosure.
          </p>
        </div>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 border-b border-white/10 text-xs">
          {[
            { id: 'census', label: '12-Component Census', icon: Layers },
            { id: 'arrivals', label: 'Arrivals & Seasonality (2021-25)', icon: BarChart3 },
            { id: 'hospitality', label: 'Hotels & Homestays', icon: Hotel },
            { id: 'houseboats', label: 'Houseboats (849 GIS Units)', icon: Anchor },
            { id: 'trails', label: 'Trekking Trails Registry', icon: Footprints },
            { id: 'pilgrimage', label: 'Pilgrimage Subsystem', icon: Landmark },
            { id: 'winter_adventure', label: 'Winter & Adventure', icon: Snowflake },
            { id: 'transport', label: 'Transport & Emissions', icon: Car },
            { id: 'carrying_capacity', label: 'Carrying Capacity Models', icon: Activity },
            { id: 'dossiers', label: 'Pilot Dossiers (Audited)', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as WorkspaceTab)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT 1: 12-COMPONENT TOURISM INVENTORY */}
        {activeTab === 'census' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>The 12 Core Components of Kashmir’s Tourism Environmental Inventory</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  An Environmental Impact Assessment cannot evaluate pressures without establishing inventory scale, location, and operating intensity.
                </p>
              </div>
              <Badge variant="outline" className="border-amber-500/40 text-amber-400 bg-amber-500/10 text-xs self-start sm:self-auto">
                12 Inventory Sectors
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOURISM_INVENTORY_COMPONENTS.map((item) => (
                <Card
                  key={item.id}
                  className="p-5 bg-slate-900/90 border-white/10 flex flex-col justify-between hover:border-amber-500/30 transition-all space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                        {item.category}
                      </span>
                      <Badge variant="outline" className="text-[9px] border-white/10 text-slate-300">
                        {item.verificationStatus}
                      </Badge>
                    </div>

                    <h4 className="text-base font-bold text-white leading-snug">
                      {item.name}
                    </h4>

                    <div className="p-2 rounded bg-slate-950 border border-white/5 text-xs text-emerald-300 font-mono font-semibold">
                      {item.officialCountOrStatus}
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Concentrated Geography:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.geographicHotspots.map((h, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                      <span className="text-[10px] uppercase font-bold text-rose-400 block">
                        Environmental Pressures:
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px] leading-relaxed">
                        {item.keyEnvironmentalPressures.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between gap-2">
                    <span className="break-words" title={item.sourceReference}>
                      Ref: {item.sourceReference.split('/')[0]}
                    </span>
                    <button
                      onClick={() => {
                        if (item.id === 'inv-houseboats') setActiveTab('houseboats');
                        else if (item.id === 'inv-trekking-hiking') setActiveTab('trails');
                        else if (item.id === 'inv-pilgrimage') setActiveTab('pilgrimage');
                        else if (item.id === 'inv-hotels-resorts') setActiveTab('hospitality');
                        else if (item.id === 'inv-winter-tourism') setActiveTab('winter_adventure');
                        else if (item.id === 'inv-transportation') setActiveTab('transport');
                        else setActiveTab('carrying_capacity');
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-0.5"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: HISTORICAL ARRIVALS SERIES (2021-2025) */}
        {activeTab === 'arrivals' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">
                  Kashmir Division Tourist Visits (2021–2025 Time Series)
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-4xl">
                Official visits recorded by the J&K Tourism Department and reported in the <strong className="text-white">J&K Economic Survey 2025–26</strong>. Figures represent total checkpoint visit entries, not unique persons.
              </p>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10 mt-4">
                <table className="w-full text-left text-xs bg-slate-950/80">
                  <thead className="bg-slate-900 text-slate-300 border-b border-white/10">
                    <tr>
                      <th className="p-3 font-bold">Year</th>
                      <th className="p-3 font-bold">Total Recorded Visits</th>
                      <th className="p-3 font-bold">Domestic Visits</th>
                      <th className="p-3 font-bold">Foreign Visits</th>
                      <th className="p-3 font-bold">Growth Trend</th>
                      <th className="p-3 font-bold">Official Reference Source</th>
                      <th className="p-3 font-bold">Reconciliation Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {HISTORICAL_ARRIVALS_SERIES.map((row) => (
                      <tr key={row.year} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-400">{row.year}</td>
                        <td className="p-3 font-mono font-bold text-white text-sm">
                          {row.totalVisits.toLocaleString()}
                        </td>
                        <td className="p-3 font-mono text-slate-300">
                          {row.domesticVisits ? row.domesticVisits.toLocaleString() : '—'}
                        </td>
                        <td className="p-3 font-mono text-cyan-300">
                          {row.foreignVisits ? row.foreignVisits.toLocaleString() : '—'}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.growthRateYoY?.startsWith('+') ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {row.growthRateYoY}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400 text-[11px]">{row.sourceDoc}</td>
                        <td className="p-3 text-slate-300 text-[11px] max-w-xs">{row.reconciliationNotes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Analytical Relationship Note */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed mt-4">
                <span className="font-bold text-amber-400 block mb-1">
                  EcoWatch EIA Analytical Framework:
                </span>
                For an EIA, the analytical value comes from measuring the direct relationship between <em>tourism intensity</em> and <em>ecosystem response</em>: comparing monthly visitor curves against municipal wastewater treatment plant capacity, hotel occupancy against unconfined aquifer withdrawal, and high-altitude trekking density against moraine trail incision.
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 3: HOSPITALITY INFRASTRUCTURE (HOTELS & HOMESTAYS) */}
        {activeTab === 'hospitality' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hotels Dossier */}
              <Card className="p-6 bg-slate-900 border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Registered Hotels & Commercial Stays</h3>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono">
                    659 Establishments
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Reflects the official registered count for <strong>Kashmir Division</strong> documented in the J&K Digest of Statistics 2023–24 and confirmed in J&K Legislative Assembly session disclosures.
                </p>

                <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Reference Period:</span>
                    <span className="font-bold text-white">2023–24 Reference Year</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Primary Geographic Hubs:</span>
                    <span className="text-slate-200">Srinagar (62%), Gulmarg (14%), Pahalgam (18%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Total Commercial Bed Census:</span>
                    <span className="text-amber-400 font-semibold">Pending Official Audit</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Sewage Treatment Compliance:</span>
                    <span className="text-rose-400 font-semibold">Est. 48% with functional captive STP</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <span className="font-bold text-slate-300 block">Critical Environmental Pressure:</span>
                  <p>
                    Peak summer hotel occupancy coincides with lowest seasonal aquifer recharge, causing private deep-borehole over-extraction in Boulevard and Tangmarg belts.
                  </p>
                </div>
              </Card>

              {/* Homestays Dossier */}
              <Card className="p-6 bg-slate-900 border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">Homestays & Decentralized Hospitality</h3>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
                    2,802 UT Total
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  As of September 2026, the J&K Government reported <strong>2,802 registered homestay units</strong> across the entire Union Territory.
                </p>

                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                  <span className="font-bold text-amber-300 block">Statistical Boundary Rule:</span>
                  <p>
                    The 2,802 homestay figure represents the entire UT (including Katra, Jammu, and Patnitop). EcoWatch is currently auditing the district-wise Kashmir Division subset to prevent statistical conflation.
                  </p>
                </div>

                <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Target Rural Hubs:</span>
                    <span className="text-slate-200">Gurez, Aru, Doodhpathri, Yusmarg</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Average Capacity:</span>
                    <span className="text-slate-200">3 to 5 rooms per registered homestay</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Solid Waste Infrastructure:</span>
                    <span className="text-rose-400 font-semibold">Zero municipal collection in 78% of rural clusters</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: HOUSEBOATS & LACUSTRINE TOURISM (849 UNITS) */}
        {activeTab === 'houseboats' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Anchor className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">
                      Registered Houseboat Fleet: Official 2024 GIS Position Census
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Official GPS survey conducted by LCMA documents exactly <strong>849 active registered houseboats</strong> across Kashmir’s lacustrine systems.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl font-mono font-extrabold text-cyan-400 block">849 Vessels</span>
                  <span className="text-[10px] text-slate-400">100% GIS Mapped</span>
                </div>
              </div>

              {/* Basin Breakdown Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs bg-slate-950/80">
                  <thead className="bg-slate-900 text-slate-300 border-b border-white/10">
                    <tr>
                      <th className="p-3 font-bold">Lake Basin Location</th>
                      <th className="p-3 font-bold">Registered Count</th>
                      <th className="p-3 font-bold">Sewage Management System</th>
                      <th className="p-3 font-bold">STP Trunkline Compliance</th>
                      <th className="p-3 font-bold">Primary Receiving Water Body</th>
                      <th className="p-3 font-bold">Audited Environmental Risk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {HOUSEBOAT_BASIN_INVENTORY.map((basin, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 font-semibold text-white">{basin.basinName}</td>
                        <td className="p-3 font-mono font-bold text-cyan-400">{basin.registeredCount2024}</td>
                        <td className="p-3 text-slate-300">{basin.sewageManagementType}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            basin.complianceRate.includes('72%') || basin.complianceRate.includes('81%')
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          }`}>
                            {basin.complianceRate}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{basin.primaryReceivingWater}</td>
                        <td className="p-3 text-rose-300 text-[11px] max-w-xs">{basin.keyEnvironmentalRisk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 5: TREKKING TRAILS REGISTRY */}
        {activeTab === 'trails' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Footprints className="w-5 h-5 text-emerald-400" />
                  <span>Tourism Trail Environmental Registry (Initial 8 Mapped Corridors)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  EcoWatch does not invent an arbitrary total trail count. Initial GIS mapping focuses on 8 core alpine corridors.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px]">Filter status:</span>
                {['all', 'Recognized', 'Permit Controlled'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedTrailFilter(f)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      selectedTrailFilter === f ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTrails.map((trail) => (
                <Card key={trail.id} className="p-5 bg-slate-900/90 border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                      {trail.routeCode}
                    </span>
                    <Badge variant="outline" className="border-white/10 text-[10px] text-slate-300">
                      {trail.officialStatus}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{trail.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {trail.startPoint} &rarr; {trail.endPoint}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-950 border border-white/5 text-center text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Distance</span>
                      <span className="font-bold text-white font-mono">{trail.totalDistanceKm} km</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Altitude Range</span>
                      <span className="font-bold text-cyan-400 font-mono text-[11px]">{trail.altitudeRangeMeters[0]}m - {trail.altitudeRangeMeters[1]}m</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Duration</span>
                      <span className="font-bold text-white font-mono">{trail.typicalDurationDays} Days</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Alpine Lakes Crossed:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {trail.alpineLakesCrossed.join(' • ')}
                    </p>
                  </div>

                  <div className="p-2 rounded bg-rose-950/30 border border-rose-500/20 text-[11px] text-rose-300 space-y-0.5">
                    <span className="font-bold block text-rose-400">Primary Ecological Risks:</span>
                    <p>{trail.primaryEnvironmentalRisks.join('; ')}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Campsite Status: <strong className="text-amber-400">{trail.campsiteCapacityStatus.split('(')[0]}</strong></span>
                    <span>Citation: {trail.sourceCitation.split('&')[0]}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 6: PILGRIMAGE TOURISM SUBSYSTEM */}
        {activeTab === 'pilgrimage' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-amber-400" />
                  <span>Dedicated Pilgrimage Tourism Environmental Assessment Subsystem</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Assessing pilgrimage as a distinct environmental activity with unique visitor spikes, temporary infrastructure, and watershed implications.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto scrollbar-none py-1">
                {['all', 'Amarnath Yatra', 'Sufi & Islamic Shrines', 'Hindu & Heritage Temples'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedPilgrimageTradition(t)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                      selectedPilgrimageTradition === t ? 'bg-amber-600 text-white font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredPilgrimage.map((site) => (
                <Card key={site.id} className="p-5 bg-slate-900/90 border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                        {site.tradition} • {site.officialYear}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">{site.name}</h4>
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs self-start sm:self-auto">
                      {site.annualPilgrimLoad}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-slate-400 font-semibold block">Geographic Corridor:</span>
                        <span className="text-slate-200">{site.geographicLocation}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block">Seasonal Concentration Window:</span>
                        <span className="text-amber-300">{site.seasonalConcentrationWindow}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block">Sanitation & Waste Setup:</span>
                        <span className="text-slate-300 leading-relaxed">{site.sanitationInfrastructure}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1 text-[11px]">
                      <span className="font-bold text-rose-400 uppercase tracking-wider block">
                        Monitored Ecological Pressures:
                      </span>
                      <ul className="space-y-1 text-slate-300">
                        {site.environmentalPressures.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500">
                    <span>Source Reference: {site.sourceDocument}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 7: WINTER SPORTS & ADVENTURE */}
        {activeTab === 'winter_adventure' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-slate-900 border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Snowflake className="w-5 h-5 text-sky-400" />
                  <h3 className="text-lg font-bold text-white">Gulmarg Winter Sports & Cryosphere Pressure</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gulmarg’s winter season operates in sub-zero cryospheric conditions, where high tourist density intersects with fragile subalpine meadow turf and slope stability.
                </p>

                <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Cable Car Infrastructure:</span>
                    <span className="text-white font-semibold">Gondola Phase I & II (3,980m Apharwat)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Daily Gondola Throughput:</span>
                    <span className="text-sky-300 font-mono font-bold">Up to 4,200 skiers & tourists/day</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">High-Altitude Heating & Energy:</span>
                    <span className="text-amber-300 font-semibold">Heavy reliance on diesel gensets during snowstorms</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Snow Grooming Chemical Traces:</span>
                    <span className="text-rose-400 font-semibold">Tracked fuel leakages on subnivean layer</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-slate-900 border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Waves className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Waterborne Recreation (~4,200 Shikaras)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dal, Nigeen, and Manasbal lakes support thousands of registered traditional shikaras and motorized state transport vessels.
                </p>

                <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Registered Commercial Shikaras:</span>
                    <span className="text-cyan-300 font-mono font-bold">~4,200 registered units</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Motorized Inspection Craft:</span>
                    <span className="text-white font-semibold">~48 active motorized vessels</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Wake Wave Energy Impact:</span>
                    <span className="text-rose-400 font-semibold">Radh / floating garden shoreline erosion</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Acoustic Disturbances:</span>
                    <span className="text-amber-400 font-semibold">Disturbs migratory waterfowl in Hokersar & Dal</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB CONTENT 8: TRANSPORT & EMISSIONS */}
        {activeTab === 'transport' && (
          <div className="space-y-6">
            <Card className="p-6 bg-slate-900 border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Tourist Transportation Corridors & Emissions</h3>
                </div>
                <Badge variant="outline" className="border-white/10 text-xs text-slate-300">
                  Linear Impact Assessment
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                  <span className="font-bold text-white text-sm">Tangmarg–Gulmarg Corridor</span>
                  <p className="text-slate-400">12 km steep ascending alpine road</p>
                  <p className="text-amber-300 font-mono">Over 2,800 vehicles/day during snow peak</p>
                  <p className="text-slate-400 text-[11px]">Idling at chain-mounting points produces localized CO and NOx spikes in coniferous forest canopy.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                  <span className="font-bold text-white text-sm">Khanabal–Pahalgam Corridor</span>
                  <p className="text-slate-400">42 km Lidder Valley highway</p>
                  <p className="text-amber-300 font-mono">High summer congestion with tourist buses</p>
                  <p className="text-slate-400 text-[11px]">Road expansion along riverbed has increased siltation in critical brown and rainbow trout spawning runs.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                  <span className="font-bold text-white text-sm">Srinagar Boulevard & Foreshore</span>
                  <p className="text-slate-400">18 km lakeside perimeter drive</p>
                  <p className="text-amber-300 font-mono">15,000+ tourist vehicle trips/peak day</p>
                  <p className="text-slate-400 text-[11px]">Exhaust particulate deposition directly onto lake surface accelerates surface micro-film formation.</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB CONTENT 9: DESTINATION CARRYING CAPACITY REGISTRY */}
        {activeTab === 'carrying_capacity' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span>Destination Carrying Capacity Framework (Limiting Factor Model)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Moving from arbitrary percentages to transparent formulas documenting numerator (observed load), denominator (sustainable capacity), and limiting factors.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {DESTINATION_CARRYING_CAPACITY_REGISTRY.map((item, idx) => (
                <Card key={idx} className="p-5 bg-slate-900 border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                        {item.landscapeType} • Peak: {item.peakSeasonMonth}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">{item.destination}</h4>
                    </div>
                    <Badge className={`text-xs font-bold self-start sm:self-auto ${
                      item.stressLevel === 'Critical Overload'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : item.stressLevel === 'Significant Overshoot'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {item.stressLevel}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-slate-950 border border-white/5">
                        <span className="text-slate-400 text-[10px] block">Sustainable Capacity (Denominator):</span>
                        <span className="font-bold text-emerald-400 text-xs">{item.calculatedMaxSustainableLoad}</span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950 border border-white/5">
                        <span className="text-slate-400 text-[10px] block">Observed Peak Load (Numerator):</span>
                        <span className="font-bold text-rose-400 text-xs">{item.currentObservedPeakLoad}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded bg-slate-950 border border-white/5">
                        <span className="text-slate-400 text-[10px] block">Governing Limiting Factor:</span>
                        <span className="text-slate-200">{item.limitingFactor}</span>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950 border border-white/5">
                        <span className="text-slate-400 text-[10px] block">Methodology Formula:</span>
                        <span className="font-mono text-slate-300 text-[11px]">{item.methodFormula}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500">
                    <span>Evidence Calibration Source: {item.evidenceSource}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 10: SCIENTIFIC PILOT DOSSIERS (AUDITED & QUALIFIED) */}
        {activeTab === 'dossiers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>Tourism Pilot Assessment Dossiers (Scientifically Corrected)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Published pilot demonstrations with explicit uncertainty boundaries, audited baseline rationales, and verified indicators.
                </p>
              </div>
              <Link href="/sectoral-eia/assessment/new" className="text-xs text-amber-400 hover:underline">
                + Submit New Tourism Assessment
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pilots.map((p) => (
                <Card key={p.id} className="p-6 bg-slate-900/90 border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">
                        {p.code}
                      </span>
                      <Badge variant="outline" className="border-white/10 text-xs text-slate-300">
                        {p.publicationStatus}
                      </Badge>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 leading-snug">
                      <Link href={`/sectoral-eia/assessment/${p.id}`} className="hover:text-amber-300 transition-colors">
                        {p.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed break-words">
                      {p.summary}
                    </p>

                    <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1.5 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Boundary:</span>
                        <span className="font-semibold text-slate-200">{p.geographicBoundary.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Baseline Reference:</span>
                        <span className="font-semibold text-slate-200">{p.baseline.baselineYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Confidence Calibration:</span>
                        <span className="font-bold text-amber-400">{p.confidenceLevel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-slate-400">Provisional Score: </span>
                      <span className="font-bold text-white">{p.overallScore} / 100</span>
                    </div>
                    <Link
                      href={`/sectoral-eia/assessment/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
                    >
                      <span>Inspect Full Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* INTEGRATED SPATIAL IMPACT MAP */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Tourism Spatial Impact & Infrastructure Viewport</span>
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Dal Lake • Gulmarg • Pahalgam • Sonamarg Alpine Corridors
            </span>
          </div>
          <SectoralImpactMap selectedSector="tourism" className="h-[440px]" />
        </div>
      </div>
    </main>
  );
}
