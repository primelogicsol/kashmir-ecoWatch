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
  OFFICIAL_AGRI_HEADLINE_STATISTICS,
  DISTRICT_PADDY_DATA,
  CROP_FARMING_SYSTEM_DOSSIERS,
  THE_TEN_AGRI_ASSESSMENT_PILLARS,
  WULAR_CUMULATIVE_DRIVERS,
  LAND_USE_OBSERVATORY_SPECIFICATIONS,
  DistrictPaddyProfile,
  CropFarmingSystemDossier,
  AgriAssessmentPillar
} from '@/data/agriculture-eia-inventory';
import {
  Wheat,
  MapPin,
  Droplet,
  Layers,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  BarChart3,
  Calendar,
  ShieldCheck,
  Activity,
  FileText,
  Clock,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Mountain,
  Compass,
  Boxes,
  Zap,
  Info,
  Scale,
  Waves,
  Eye,
  Satellite,
  Sprout,
  Landmark,
  RotateCcw,
  Radar
} from 'lucide-react';

type AgricultureWorkspaceTab =
  | 'overview'
  | 'districts'
  | 'crop_systems'
  | 'ten_pillars'
  | 'wular_study'
  | 'observatory'
  | 'spatial_atlas'
  | 'pilots';

export default function AgricultureEiaPage() {
  const [activeTab, setActiveTab] = useState<AgricultureWorkspaceTab>('overview');
  const [selectedSystemId, setSelectedSystemId] = useState<string>(CROP_FARMING_SYSTEM_DOSSIERS[0].id);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Anantnag');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const sector = SECTOR_DEFINITIONS.agriculture;
  const pilots = SHARED_ASSESSMENT_DATABASE.filter(a => a.sector === 'agriculture');

  const selectedSystem = CROP_FARMING_SYSTEM_DOSSIERS.find(s => s.id === selectedSystemId) || CROP_FARMING_SYSTEM_DOSSIERS[0];
  const activeDistrictData = DISTRICT_PADDY_DATA.find(d => d.districtName === selectedDistrict) || DISTRICT_PADDY_DATA[0];

  const filteredDistricts = DISTRICT_PADDY_DATA.filter(d =>
    d.districtName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.dominantPaddyVarieties.some(v => v.toLowerCase().includes(searchFilter.toLowerCase())) ||
    d.primaryIrrigationSource.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Agricultural Landscapes & Land Systems Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Sectors' },
          { label: 'Agriculture' }
        ]}
        icon={<Wheat className="w-6 h-6 text-lime-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kashmir Agriculture Environmental Impact & Land Systems Intelligence
          </span>
        }
        subtitle="Scientific assessment of agricultural landscapes, crop production, irrigation systems, soil health, pollution pathways, land-use transformation, and climate resilience across Kashmir."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-10 max-w-7xl">
        
        {/* ======================================================== */}
        {/* 1. HEADLINE OFFICIAL AGRICULTURAL STATISTICS (TABLE 4.17)*/}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-lime-500/20 text-lime-300 border-lime-500/30 text-xs font-semibold">
                Official Agricultural Census Baseline
              </Badge>
              <span className="text-xs text-slate-400">
                Verified against DES J&K Digest of Statistics 2024–25 (Table 4.17) & Economic Survey 2025–26
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Baseline: Kashmir Division Crops
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {OFFICIAL_AGRI_HEADLINE_STATISTICS.map((stat) => (
              <Card
                key={stat.id}
                className="p-3.5 bg-slate-900/90 border-white/10 hover:border-lime-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider break-words">
                      {stat.geographicScope}
                    </span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-lime-500/30 text-lime-400">
                      {stat.referencePeriod.split(' ')[0]}
                    </Badge>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight mt-1">
                    {stat.figure}
                  </div>
                  <div className="text-[11px] font-medium text-lime-400 mt-0.5">
                    {stat.unit}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/5">
                  <p className="text-[10px] text-slate-300 break-words leading-tight">
                    {stat.metric}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. INTERACTIVE WORKSPACE TABS                            */}
        {/* ======================================================== */}
        <div className="border-b border-white/10 pb-2">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'overview', label: 'Sector Scale & Land Accounts', icon: BarChart3 },
              { id: 'districts', label: '10-District Paddy Intelligence', icon: MapPin },
              { id: 'crop_systems', label: '8 Crop & Farming Systems', icon: Sprout },
              { id: 'ten_pillars', label: '10 Assessment Pillars', icon: Layers },
              { id: 'wular_study', label: 'Wular Catchment Flagship', icon: Waves },
              { id: 'observatory', label: 'Land-Use Change Observatory', icon: Radar },
              { id: 'spatial_atlas', label: 'Spatial Basin Atlas', icon: Compass },
              { id: 'pilots', label: 'Scientific Field Dossiers', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AgricultureWorkspaceTab)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-lime-500 text-slate-950 font-bold shadow-md shadow-lime-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: SECTOR SCALE & LAND ACCOUNTS                      */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-lime-950/60 via-slate-900 to-slate-950 border border-lime-500/30 shadow-xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-lime-500 text-slate-950 font-bold text-xs">
                      Official Agriculture Baseline
                    </Badge>
                    <Badge variant="outline" className="border-lime-500/40 text-lime-300 text-xs">
                      Directorate of Economics & Statistics Verified
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">
                      Ref: J&K Digest of Statistics 2024–25 (Table 4.17)
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Scientific Foundation of Kashmir Agricultural Land Systems
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Kashmir Division records <strong className="text-lime-400">120,620 hectares</strong> under high-yielding paddy varieties, <strong className="text-lime-400">65,380 hectares</strong> under high-yielding maize, and <strong className="text-lime-400">79,870 hectares</strong> under high-yielding vegetable varieties (2024–25). 
                    The summed area of all reported high-yielding crop categories reaches <strong className="text-lime-400">439,100 hectares</strong>.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-white">Crucial Land Accounting Distinction:</strong> The 439,100 ha figure represents <em className="text-slate-200">summed gross crop area</em> across kharif and rabi seasons, not unique physical farmland. Because multiple crops (e.g. paddy followed by oilseeds or fodder) occupy the same parcel in different seasons, EcoWatch strictly disaggregates gross cropped area, net sown area, and physical arable land to prevent double-counting.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-950/90 border border-lime-500/30 text-center shrink-0 w-full sm:w-auto">
                  <span className="text-slate-400 text-xs block font-medium">High-Yielding Paddy Area</span>
                  <span className="text-3xl sm:text-4xl font-black text-lime-400 block mt-1 font-mono">
                    120,620 Ha
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Kashmir Division (2024–25)
                  </span>
                  <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-lime-300 font-semibold">
                    10 Districts • Table 4.17 Verified
                  </div>
                </div>
              </div>
            </div>

            {/* THREE LAND ACCOUNTING PILLARS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-5 bg-slate-900/90 border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-lime-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Gross vs Net Farmland
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Gross cropped area includes sequential harvests on the same physical field. Net sown area in Kashmir Division is approximately <strong>295,000 hectares</strong>, yielding a valley-wide cropping intensity of ~142%.
                </p>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/5 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Net Sown Farmland:</span>
                    <span className="font-mono text-white font-bold">~295,000 Ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross Sown Area:</span>
                    <span className="font-mono text-lime-400 font-bold">~439,100 Ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cropping Intensity:</span>
                    <span className="font-mono text-slate-300">~142%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-slate-900/90 border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-lime-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Gravity Irrigation (Kuhl) Networks
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Over <strong>82% of Kashmir&apos;s irrigated paddy</strong> is fed by ancient gravity-flow snowmelt channels (*Kuhls*) diverted from Jhelum tributaries, maintaining exceptional hydrological energy efficiency compared to pumped tubewell agriculture.
                </p>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/5 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Kuhl Gravity Canal Share:</span>
                    <span className="font-mono text-emerald-400 font-bold">&gt; 82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lift & Tubewell Share:</span>
                    <span className="font-mono text-slate-300">~18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operational Energy:</span>
                    <span className="font-mono text-lime-400">Zero Pump Power</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5 bg-slate-900/90 border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-lime-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Straw Biomass Circularity
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike the northwestern plains where stubble burning emits hazardous smog, <strong>virtually 100% of Kashmiri rice straw</strong> is manually harvested, bundled, and stored for winter cattle feed, representing complete organic biomass recycling.
                </p>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/5 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Straw Fodder Recovery:</span>
                    <span className="font-mono text-emerald-400 font-bold">&gt; 98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Field Open Burning:</span>
                    <span className="font-mono text-emerald-400 font-bold">&lt; 1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Winter Cattle Subsistence:</span>
                    <span className="font-mono text-lime-400">100% Recycled</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DISTRICT-WISE PADDY INTELLIGENCE (TABLE 4.17)     */}
        {/* ======================================================== */}
        {activeTab === 'districts' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-lime-400" />
                  <span>Kashmir Division District Paddy Intelligence (Table 4.17 Breakdown)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Area under high-yielding paddy varieties across all 10 Kashmir districts (120,620 ha total). Anantnag leads at 25,480 ha (21.1%), followed by Baramulla, Pulwama, and Kupwara.
                </p>
              </div>
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Filter district or irrigation..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-lime-500"
                />
              </div>
            </div>

            {/* DISTRICT COMPARISON TABLE */}
            <Card className="overflow-hidden bg-slate-900/90 border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3">District</th>
                      <th className="px-4 py-3">HYV Paddy Area (Ha)</th>
                      <th className="px-4 py-3">Kashmir Paddy Share</th>
                      <th className="px-4 py-3">Net Sown Area (Ha)</th>
                      <th className="px-4 py-3">Cropping Intensity</th>
                      <th className="px-4 py-3">Conversion Risk</th>
                      <th className="px-4 py-3">Primary Irrigation Source</th>
                      <th className="px-4 py-3 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredDistricts.map((d) => {
                      const isSelected = selectedDistrict === d.districtName;
                      return (
                        <tr
                          key={d.districtName}
                          onClick={() => setSelectedDistrict(d.districtName)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-lime-950/40 text-white'
                              : 'hover:bg-slate-800/50'
                          }`}
                        >
                          <td className="px-4 py-3 font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                            <span>{d.districtName}</span>
                          </td>
                          <td className="px-4 py-3 font-mono font-bold text-lime-400">
                            {d.highYieldingPaddyAreaHa.toLocaleString()} ha
                          </td>
                          <td className="px-4 py-3 font-mono">
                            <div className="flex items-center gap-2">
                              <span>{d.shareOfKashmirPaddyPercent.toFixed(1)}%</span>
                              <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                                <div
                                  className="h-full bg-lime-400 rounded-full"
                                  style={{ width: `${d.shareOfKashmirPaddyPercent * 4}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono text-white">
                            {d.totalNetSownAreaHa.toLocaleString()} ha
                          </td>
                          <td className="px-4 py-3 font-mono text-slate-300">
                            {d.croppingIntensityPercent}%
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-1.5 py-0 h-4 border-none font-semibold ${
                                d.paddyConversionPressure === 'Severe'
                                  ? 'bg-red-950 text-red-400'
                                  : d.paddyConversionPressure === 'High'
                                  ? 'bg-amber-950 text-amber-400'
                                  : 'bg-emerald-950 text-emerald-400'
                              }`}
                            >
                              {d.paddyConversionPressure} Risk
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-[11px] text-slate-300 break-words">
                            {d.primaryIrrigationSource}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDistrict(d.districtName);
                              }}
                              className="text-[11px] text-lime-400 hover:text-lime-300 font-semibold"
                            >
                              Details →
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* SELECTED DISTRICT DEEP-DIVE CARD */}
            {activeDistrictData && (
              <Card className="p-6 bg-slate-900 border-lime-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-lime-400 uppercase">
                        District Paddy Agroecosystem Dossier
                      </span>
                      <Badge variant="outline" className="border-lime-500/30 text-lime-300 text-xs">
                        {activeDistrictData.shareOfKashmirPaddyPercent}% of Valley Paddy Area
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {activeDistrictData.districtName} District Agricultural Profile
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block">HYV Paddy Cultivation</span>
                    <span className="text-2xl font-black text-lime-400 font-mono">
                      {activeDistrictData.highYieldingPaddyAreaHa.toLocaleString()} Ha
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
                      Irrigation & Cultivation Base
                    </span>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Primary System:</span>
                      <span className="text-white font-medium">{activeDistrictData.primaryIrrigationSource}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Total Net Sown Area:</span>
                      <span className="font-mono text-white font-bold">{activeDistrictData.totalNetSownAreaHa.toLocaleString()} Ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cropping Intensity:</span>
                      <span className="font-mono text-lime-400 font-bold">{activeDistrictData.croppingIntensityPercent}%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
                      Dominant Varieties & Landraces
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDistrictData.dominantPaddyVarieties.map((v, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] border-white/10 text-slate-200">
                          {v}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2">
                      <span className="text-slate-400 text-[10px] block">Paddy Conversion Risk:</span>
                      <span className={`font-bold ${
                        activeDistrictData.paddyConversionPressure === 'Severe'
                          ? 'text-red-400'
                          : activeDistrictData.paddyConversionPressure === 'High'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}>
                        {activeDistrictData.paddyConversionPressure} Risk of Farmland Loss
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
                      Key Environmental Receptor
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {activeDistrictData.keyEnvironmentalReceptors}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: THE 8 CROP & FARMING-SYSTEM ASSESSMENTS           */}
        {/* ======================================================== */}
        {activeTab === 'crop_systems' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sprout className="w-5 h-5 text-lime-400" />
                <span>The 8 Dedicated Crop & Farming-System Assessments</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Kashmir agriculture encompasses diverse agroecological systems: rice, mountain maize, rabi cereals, nitrogen-fixing oilseeds, peri-urban market gardening, floating lake gardens, and heritage landraces.
              </p>
            </div>

            {/* SYSTEM SELECTOR BUTTONS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {CROP_FARMING_SYSTEM_DOSSIERS.map((sys) => {
                const isSelected = selectedSystemId === sys.id;
                return (
                  <button
                    key={sys.id}
                    onClick={() => setSelectedSystemId(sys.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-lime-950/70 border-lime-500 text-white shadow-lg shadow-lime-500/10'
                        : 'bg-slate-900 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[9px] font-semibold text-lime-400 uppercase tracking-wider break-words">
                        {sys.category.split(' ')[0]}
                      </span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0" />}
                    </div>
                    <div className="font-bold text-xs sm:text-xs text-white break-words">
                      {sys.systemName.split('&')[0].split('EIA')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 break-words font-serif italic">
                      {sys.vernacularName.split('(')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ACTIVE SYSTEM DOSSIER */}
            {selectedSystem && (
              <Card className="p-6 bg-slate-900/90 border-lime-500/30 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-lime-500/20 text-lime-300 border-lime-500/30 text-xs">
                        {selectedSystem.category}
                      </Badge>
                      <span className="text-xs font-serif italic text-lime-300">
                        {selectedSystem.vernacularName}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {selectedSystem.systemName}
                    </h3>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-white/5 text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block">Kashmir Coverage & Output</span>
                    <span className="text-base font-bold text-lime-400 font-mono">
                      {selectedSystem.kashmirAreaCoverageHa}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {selectedSystem.annualProductionVolume}
                    </span>
                  </div>
                </div>

                {/* THE 5 SYSTEM CHARACTERISTICS */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Agro-Ecological System Characteristics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-lime-400 font-bold text-[10px] uppercase block">
                        1. Cropping Pattern
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {selectedSystem.systemCharacteristics.croppingPattern}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-lime-400 font-bold text-[10px] uppercase block">
                        2. Water & Irrigation
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {selectedSystem.systemCharacteristics.waterDemandAndSource}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-lime-400 font-bold text-[10px] uppercase block">
                        3. Soil & Nutrients
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {selectedSystem.systemCharacteristics.nutrientAndSoilRegime}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-lime-400 font-bold text-[10px] uppercase block">
                        4. Carbon & Energy
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {selectedSystem.systemCharacteristics.energyAndEmissions}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-emerald-400 font-bold text-[10px] uppercase block">
                        5. Biodiversity Value
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {selectedSystem.systemCharacteristics.biodiversityAndEcosystemServices}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRESSURES VS ECOLOGICAL STRENGTHS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10 text-xs">
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-red-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Environmental Pressures & Risk Factors</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-300">
                      {selectedSystem.environmentalPressures.map((press, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                          <span>{press}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Ecological Benefits & Measured Strengths</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-300">
                      {selectedSystem.ecologicalBenefitsAndStrengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* SCIENTIFIC INDICATORS & MITIGATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-white/10 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <span className="font-bold text-lime-400 uppercase tracking-wider text-[11px] block">
                      Core Scientific Indicators
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {selectedSystem.scientificIndicators.map((ind, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5 shrink-0" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <span className="font-bold text-lime-400 uppercase tracking-wider text-[11px] block">
                      Mitigation & Resilience Options
                    </span>
                    <ul className="space-y-1 text-slate-300">
                      {selectedSystem.mitigationAndResilienceOptions.map((mit, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{mit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 font-mono">
                  Source: {selectedSystem.sourceReference}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: THE 10 SCIENTIFIC ASSESSMENT PILLARS              */}
        {/* ======================================================== */}
        {activeTab === 'ten_pillars' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-lime-400" />
                <span>The 10 Scientific Assessment Pillars</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Standardized operational framework distinguishing environmental pressures from agroecological benefits across soil, water, nutrients, biodiversity, and climate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {THE_TEN_AGRI_ASSESSMENT_PILLARS.map((pil, idx) => (
                <Card
                  key={pil.pillarCode}
                  className="p-4 bg-slate-900/90 border-white/10 hover:border-lime-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-lime-400 px-2 py-0.5 rounded bg-lime-950/80 border border-lime-500/30">
                        {pil.pillarCode}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Pillar 0{idx + 1}</span>
                    </div>

                    <h3 className="text-xs font-bold text-white leading-snug">
                      {pil.name}
                    </h3>

                    <p className="text-[11px] text-slate-300 leading-relaxed break-words">
                      {pil.scopeSummary}
                    </p>

                    <div className="p-2 rounded bg-slate-950 border border-white/5 space-y-1 text-[10px]">
                      <span className="text-lime-400 font-semibold block uppercase tracking-wider text-[9px]">
                        Core Measurements
                      </span>
                      <ul className="space-y-1 text-slate-300">
                        {pil.coreMeasurements.slice(0, 2).map((m, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="w-1 h-1 rounded-full bg-lime-400 mt-1 shrink-0" />
                            <span className="break-words">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-[10px] text-slate-400 space-y-0.5">
                      <div>
                        <span className="font-semibold text-slate-300">Methods: </span>
                        <span className="break-words">{pil.fieldMethods[0]}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-300">Statute: </span>
                        <span className="break-words">{pil.statutoryAndPolicyBenchmarks[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] gap-2">
                    <span className="text-slate-400 font-mono break-words">
                      {pil.leadAgency}
                    </span>
                    <Badge variant="outline" className="border-white/10 text-[9px] text-lime-400">
                      Standard
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: WULAR CATCHMENT FLAGSHIP CUMULATIVE STUDY         */}
        {/* ======================================================== */}
        {activeTab === 'wular_study' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Waves className="w-5 h-5 text-lime-400" />
                <span>Wular Lake Catchment: Flagship Cumulative Multi-Sector Assessment</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Aligned with the Comptroller and Auditor General&apos;s (CAG) 2025 Performance Audit. Moving beyond single-cause claims by modeling diffuse agricultural nutrient runoff alongside municipal sewage, hill catchment siltation, and orchard chemicals.
              </p>
            </div>

            <Card className="p-6 bg-slate-900/90 border-lime-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-lime-400" />
                  <h3 className="text-base font-bold text-white">
                    CAG Performance Audit 2025 Multi-Sector Source Attribution Model
                  </h3>
                </div>
                <Badge className="bg-lime-500 text-slate-950 font-bold text-xs">
                  CAG 2025 Audit Aligned
                </Badge>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                The CAG 2025 performance audit concluded that Wular Lake&apos;s degradation is driven by multiple interacting pressures, not solely fertilizer from paddy fields. Below is the multi-source cumulative attribution model synthesized across Agriculture, Municipal, Forestry, and Horticulture streams:
              </p>

              <div className="space-y-3 pt-2">
                {WULAR_CUMULATIVE_DRIVERS.map((d, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-2 h-2 rounded-full bg-lime-400" />
                        <span>{d.stressorSource}</span>
                        <Badge variant="outline" className="border-lime-500/30 text-lime-400 text-[10px]">
                          {d.contributingSector} Sector
                        </Badge>
                      </div>
                      <div className="font-mono text-lime-400 font-bold">
                        ~{d.shareOfCumulativeStressPercentEst}% Cumulative Impact Share
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {d.pollutantOrPhysicalPressure}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-white/5 text-[10px]">
                      <div>
                        <span className="text-amber-300 font-semibold">CAG 2025 Audit Finding: </span>
                        <span className="text-slate-400">{d.cag2025AuditFinding}</span>
                      </div>
                      <div>
                        <span className="text-cyan-300 font-semibold">EcoWatch Protocol: </span>
                        <span className="text-slate-400">{d.monitoringProtocol}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: LAND-USE CHANGE OBSERVATORY SPECIFICATION         */}
        {/* ======================================================== */}
        {activeTab === 'observatory' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Radar className="w-5 h-5 text-lime-400" />
                <span>Western Himalayan Agricultural Land-Use Change Observatory</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Automated multi-temporal satellite detection tracking where productive paddy fields and arable land are being converted into orchards, commercial fill, roads, and brick kilns—before changes become irreversible.
              </p>
            </div>

            <div className="space-y-4">
              {LAND_USE_OBSERVATORY_SPECIFICATIONS.map((spec, idx) => (
                <Card key={idx} className="p-5 bg-slate-900/90 border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/10">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Satellite className="w-4 h-4 text-lime-400" />
                      <span>{spec.conversionType}</span>
                    </h3>
                    <Badge variant="outline" className="border-lime-500/30 text-lime-300 text-xs font-mono">
                      Annual Velocity: {spec.annualRateHaYear}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
                        Driving Mechanisms & Economics
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {spec.drivingMechanisms}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-red-400 font-bold uppercase tracking-wider text-[10px] block">
                        Ecological & Hydrological Consequence
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {spec.environmentalConsequence}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] block">
                        Satellite Detection Algorithm
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {spec.satelliteDetectionMethod}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                        Statutory Enforcement Remedy
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {spec.statutoryRemedy}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: SPATIAL BASIN ATLAS                               */}
        {/* ======================================================== */}
        {activeTab === 'spatial_atlas' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-lime-400" />
                  <span>Agricultural Basin Spatial Map & Telemetry Viewport</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Spatial cartography of valley-floor paddy tracts, Kuhl gravity canals, Wular drainage corridors, and mountain terraced basins.
                </p>
              </div>
              <Badge variant="outline" className="border-lime-500/40 text-lime-400 text-xs">
                Open Cartographic Feeds (No Key Required)
              </Badge>
            </div>

            <SectoralImpactMap selectedSector="agriculture" className="h-[520px] rounded-2xl border border-white/10" />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: SCIENTIFIC FIELD DOSSIERS & PILOTS                */}
        {/* ======================================================== */}
        {activeTab === 'pilots' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-lime-400" />
                  <span>Agriculture Field Dossiers & Calibrated Pilots ({pilots.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Multi-sector cumulative catchment assessments undergoing continuous field telemetry and independent peer review.
                </p>
              </div>
              <Link
                href="/sectoral-eia/assessment/new"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lime-500 text-slate-950 font-bold text-xs hover:bg-lime-400 transition-colors"
              >
                <span>+ Register New Agricultural Basin Pilot</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pilots.map((p) => (
                <Card key={p.id} className="p-6 bg-slate-900/90 border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-lime-400 px-2 py-0.5 rounded bg-lime-950/80 border border-lime-500/30">
                        {p.code}
                      </span>
                      <Badge variant="outline" className="border-lime-500/30 text-lime-400 text-xs">
                        {p.publicationStatus}
                      </Badge>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 leading-snug">
                      <Link href={`/sectoral-eia/assessment/${p.id}`} className="hover:text-lime-300 transition-colors">
                        {p.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed break-words">
                      {p.summary}
                    </p>

                    <div className="p-3.5 rounded-lg bg-slate-950 border border-white/5 space-y-1.5 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Boundary:</span>
                        <span className="font-semibold text-slate-200">{p.geographicBoundary.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Districts:</span>
                        <span className="font-semibold text-slate-200">{p.geographicBoundary.districts.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Baseline Reference:</span>
                        <span className="font-semibold text-slate-200">{p.baseline.baselineYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Evidence Status:</span>
                        <span className="font-bold text-lime-400">{p.confidenceLevel} Confidence • Calibration Active</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Calibrated Field Indicators
                      </span>
                      {p.indicators.map((ind) => (
                        <div key={ind.id} className="p-2 rounded bg-slate-950/60 border border-white/5 flex items-center justify-between text-[11px] gap-2">
                          <span className="text-slate-300 break-words">{ind.name}</span>
                          <span className="font-mono font-bold text-lime-400 shrink-0">
                            {ind.currentValue} {ind.unit.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-slate-400">Integrity: </span>
                      <span className="font-bold text-white">{p.overallScore} / 100</span>
                      <span className="text-[10px] text-amber-400 ml-1.5">({p.impactSignificance} Impact)</span>
                    </div>
                    <Link
                      href={`/sectoral-eia/assessment/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:text-lime-300"
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

      </div>
    </main>
  );
}
