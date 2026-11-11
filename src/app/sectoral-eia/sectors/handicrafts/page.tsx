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
  OFFICIAL_CRAFT_HEADLINE_STATISTICS,
  HISTORICAL_CRAFT_EXPORTS,
  WORKFORCE_CATEGORIES,
  DISTRICT_CRAFT_PRODUCTION_DATA,
  PRIMARY_CRAFT_EIA_PROFILES,
  THE_NINE_ENVIRONMENTAL_SYSTEMS,
  CRAFT_PASSPORT_SPECIFICATIONS,
  DistrictCraftProductionProfile,
  PrimaryCraftAssessmentDossier,
  NineEnvironmentalSystems
} from '@/data/handicrafts-eia-inventory';
import {
  CRAFT_ASSESSMENT_FAMILIES,
  DOCUMENTED_CRAFT_PROFILES,
  WATER_CHEMICAL_PROCESS_MATRIX,
  COMPARATIVE_CRAFT_LIFECYCLES,
  CraftFamily,
  CraftProfile,
  WaterChemicalProcessRecord,
  ComparativeCraftLifecycle,
  GiStatusType,
  EvidenceStatusType
} from '@/data/craft-assessment-registry';
import {
  Hammer,
  MapPin,
  Droplet,
  FlaskConical,
  TreePine,
  Flame,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  BarChart3,
  Calendar,
  Layers,
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
  Palette,
  Scissors,
  Landmark,
  Feather,
  ScrollText,
  Waves,
  Award,
  QrCode,
  Users,
  Building2,
  PackageCheck,
  TrendingUp,
  Cpu,
  Search,
  Filter,
  X,
  Printer,
  Check,
  CheckCircle,
  BookOpen
} from 'lucide-react';

type HandicraftsWorkspaceTab =
  | 'overview'
  | 'districts'
  | 'craft_assessments'
  | 'water_chemicals'
  | 'comparative_lca'
  | 'nine_systems'
  | 'provenance_materials'
  | 'craftlore_passport'
  | 'spatial_atlas'
  | 'pilots';

export default function HandicraftsEiaPage() {
  const [activeTab, setActiveTab] = useState<HandicraftsWorkspaceTab>('overview');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Srinagar');
  const [districtSearchFilter, setDistrictSearchFilter] = useState<string>('');

  // Tab 3: Craft Registry Filters & Selection
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('all');
  const [selectedCraftProfileId, setSelectedCraftProfileId] = useState<string>(DOCUMENTED_CRAFT_PROFILES[0].id);
  const [craftSearchQuery, setCraftSearchQuery] = useState<string>('');
  const [giFilter, setGiFilter] = useState<'all' | 'GI Registered' | 'GI Applied' | 'Notified Heritage Craft'>('all');
  const [viewingFullDossier, setViewingFullDossier] = useState<CraftProfile | null>(null);

  // Tab 6: Water & Chemical Exposure Matrix Filters
  const [chemProcessSearch, setChemProcessSearch] = useState<string>('');
  const [selectedChemFamilyFilter, setSelectedChemFamilyFilter] = useState<string>('all');

  // Tab: Comparative LCA Selection
  const [selectedLcaId, setSelectedLcaId] = useState<string>(COMPARATIVE_CRAFT_LIFECYCLES[0].id);

  const sector = SECTOR_DEFINITIONS.handicrafts;
  const pilots = SHARED_ASSESSMENT_DATABASE.filter(a => a.sector === 'handicrafts');
  const activeDistrictData = DISTRICT_CRAFT_PRODUCTION_DATA.find(d => d.districtName === selectedDistrict) || DISTRICT_CRAFT_PRODUCTION_DATA[0];

  const filteredDistricts = DISTRICT_CRAFT_PRODUCTION_DATA.filter(d =>
    d.districtName.toLowerCase().includes(districtSearchFilter.toLowerCase()) ||
    d.dominantCraftClusters.some(c => c.toLowerCase().includes(districtSearchFilter.toLowerCase())) ||
    d.keyUrbanRuralEnclaves.some(e => e.toLowerCase().includes(districtSearchFilter.toLowerCase()))
  );

  // Filtered crafts in registry
  const filteredCraftProfiles = DOCUMENTED_CRAFT_PROFILES.filter(craft => {
    const matchesFamily = selectedFamilyId === 'all' || craft.familyId === selectedFamilyId;
    const matchesGi = giFilter === 'all' || craft.giStatus === giFilter;
    const q = craftSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      craft.craftName.toLowerCase().includes(q) ||
      craft.vernacularName.toLowerCase().includes(q) ||
      craft.familyName.toLowerCase().includes(q) ||
      craft.rawMaterialOrigin.toLowerCase().includes(q) ||
      craft.primaryDistrictClusters.some(d => d.toLowerCase().includes(q));
    return matchesFamily && matchesGi && matchesSearch;
  });

  const activeCraft = DOCUMENTED_CRAFT_PROFILES.find(c => c.id === selectedCraftProfileId) || DOCUMENTED_CRAFT_PROFILES[0];

  // Filtered chemical processes
  const filteredChemProcesses = WATER_CHEMICAL_PROCESS_MATRIX.filter(proc => {
    const matchesFamily = selectedChemFamilyFilter === 'all' || proc.familyId === selectedChemFamilyFilter;
    const q = chemProcessSearch.toLowerCase().trim();
    const matchesSearch = !q ||
      proc.processName.toLowerCase().includes(q) ||
      proc.craftName.toLowerCase().includes(q) ||
      proc.keyChemicalOrAgent.toLowerCase().includes(q) ||
      proc.applicableRegulatoryStandard.toLowerCase().includes(q) ||
      proc.scientificInvestigationProtocol.toLowerCase().includes(q);
    return matchesFamily && matchesSearch;
  });

  const activeLca = COMPARATIVE_CRAFT_LIFECYCLES.find(l => l.id === selectedLcaId) || COMPARATIVE_CRAFT_LIFECYCLES[0];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Handicrafts & Handloom Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Sectors' },
          { label: 'Handicrafts' }
        ]}
        icon={<Hammer className="w-6 h-6 text-cyan-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Kashmir Handicrafts & Handloom Environmental Impact Assessment
          </span>
        }
        subtitle="Scientific assessment of traditional craft production, raw-material provenance, environmental footprints, artisan production landscapes, and sustainable manufacturing across Kashmir."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 space-y-10 max-w-7xl">
        
        {/* ======================================================== */}
        {/* 1. HEADLINE OFFICIAL PUBLIC-SECTOR FIGURES (UT LEVEL)    */}
        {/* ======================================================== */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-semibold">
                Official Baseline • J&K UT Scope
              </Badge>
              <span className="text-xs text-slate-400">
                Verified against J&K Economic Survey 2025–26 & August 2026 Departmental Review
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              J&K UT Scope • 12 Assessment Families • 15 GI Registrations
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {OFFICIAL_CRAFT_HEADLINE_STATISTICS.map((stat) => (
              <Card
                key={stat.id}
                className="p-3.5 bg-slate-900/90 border-white/10 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider break-words">
                      {stat.geographicScope}
                    </span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-cyan-500/30 text-cyan-400">
                      {stat.referencePeriod.split(' ')[0]}
                    </Badge>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight mt-1">
                    {stat.figure}
                  </div>
                  <div className="text-[11px] font-medium text-cyan-400 mt-0.5">
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
              { id: 'overview', label: 'Sector Scale & Exports', icon: BarChart3 },
              { id: 'districts', label: 'Craft Production Atlas', icon: MapPin },
              { id: 'craft_assessments', label: 'Craft Environmental Registry', icon: Scissors },
              { id: 'water_chemicals', label: 'Water & Chemical Exposure Matrix', icon: Droplet },
              { id: 'comparative_lca', label: 'Handmade vs Synthetic LCA', icon: Scale },
              { id: 'nine_systems', label: '9 Environmental Systems', icon: Layers },
              { id: 'provenance_materials', label: 'Material Provenance', icon: TreePine },
              { id: 'craftlore_passport', label: 'Craftlore & Eco-Passport', icon: QrCode },
              { id: 'spatial_atlas', label: 'Spatial Atlas', icon: Compass },
              { id: 'pilots', label: 'Scientific Dossiers', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as HandicraftsWorkspaceTab)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
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
        {/* TAB 1: SECTOR SCALE, EXPORTS & WORKFORCE TAXONOMY        */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-cyan-500 text-slate-950 font-bold text-xs">
                      Sectoral Scale & Context
                    </Badge>
                    <Badge variant="outline" className="border-cyan-500/40 text-cyan-300 text-xs">
                      J&K Economic Survey 2025–26 & August 2026 Review
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">
                      UT Total: 461,381 Registered Artisans & Weavers
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    The Decentralized Ecological Micro-Economy of Kashmir
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Kashmir&apos;s handicrafts and handloom ecosystem is not a smokestack factory system, but a massive decentralized network of home cottages, urban karkhanas, and rural community clusters. It sustains over <strong className="text-white">461,000 registered livelihoods</strong> across the UT, generating <strong className="text-cyan-400">₹2,850+ Crore</strong> in annual production and <strong className="text-cyan-400">₹1,162 Crore</strong> in direct handicraft exports (FY 2024–25).
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-white">The Balanced Scientific Principle:</strong> Traditional handmade crafts cannot automatically be labeled as environmentally damaging, nor can they be assumed to be completely impact-free. Many rely on manual kinetic labor, repairable natural fibers, and multi-generational product lifespans. However, their full lifecycle footprints involve genuine pressure points—such as concentrated urban dye wash-water, timber sourcing for walnut carving, and fuelwood consumption for wicker boiling. Kashmir EcoWatch rigorously investigates both the <strong className="text-emerald-400">environmental advantages</strong> and the <strong className="text-amber-400">environmental costs</strong> of each craft.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/10 shrink-0 space-y-2 text-center lg:text-right">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    UNESCO Creative City
                  </span>
                  <div className="text-xl font-bold text-white">
                    Srinagar City
                  </div>
                  <span className="text-xs text-cyan-400 block font-serif italic">
                    Crafts & Folk Art (2021)
                  </span>
                  <div className="pt-2 border-t border-white/5 text-[10px] text-slate-400">
                    45,000+ Downtown Artisans
                  </div>
                </div>
              </div>
            </div>

            {/* EXPORTS TABLE & WORKFORCE CLASSIFICATION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* HISTORICAL EXPORTS */}
              <Card className="p-6 bg-slate-900/90 border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-sm text-white">
                      Official Export Performance (FY 2020–21 to FY 2025–26)
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-300">
                    Values in Crore INR
                  </Badge>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase font-mono">
                      <tr>
                        <th className="p-2.5">Financial Year</th>
                        <th className="p-2.5 text-right">Export Value</th>
                        <th className="p-2.5">Data Source / Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {HISTORICAL_CRAFT_EXPORTS.map((exp, idx) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="p-2.5 font-mono font-medium text-white">
                            {exp.financialYear}
                          </td>
                          <td className="p-2.5 text-right font-mono font-bold text-cyan-400">
                            ₹{exp.exportValuationCroreINR.toFixed(2)} Cr
                          </td>
                          <td className="p-2.5 text-[10px] text-slate-400">
                            {exp.dataSource}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  Note: FY 2025–26 figure represents 9-month annualized review through December 2025. Data sourced from J&K Directorate of Handicrafts & Handloom.
                </p>
              </Card>

              {/* WORKFORCE TAXONOMY */}
              <Card className="p-6 bg-slate-900/90 border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-sm text-white">
                      Official Artisan Workforce Taxonomy (J&K UT Scope)
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-300">
                    DES 2024–25
                  </Badge>
                </div>
                <div className="space-y-3">
                  {WORKFORCE_CATEGORIES.map((wf, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">
                          {wf.categoryName}
                        </span>
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="text-cyan-400 font-bold">{wf.estimatedCountUT} UT</span>
                          <span className="text-slate-400 text-[10px]">({wf.estimatedCountKashmir} Kashmir)</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {wf.definition}
                      </p>
                      <p className="text-[10px] text-cyan-400/80 font-mono">
                        EIA Role: {wf.significanceForEia}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DISTRICT CRAFT PRODUCTION ATLAS                   */}
        {/* ======================================================== */}
        {activeTab === 'districts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <span>Kashmir Division Craft Clusters & Environmental Receptors</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  10 Kashmir valley districts, registered artisan concentrations, and local receiving waterbodies / forest ecosystems.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter district or craft cluster..."
                  value={districtSearchFilter}
                  onChange={(e) => setDistrictSearchFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* DISTRICT SELECTION CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {filteredDistricts.map((dist) => {
                const isSelected = selectedDistrict === dist.districtName;
                return (
                  <button
                    key={dist.districtName}
                    onClick={() => setSelectedDistrict(dist.districtName)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{dist.districtName}</span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        {dist.shareOfKashmirArtisansPercent}%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {dist.registeredArtisans.toLocaleString()} Artisans
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-1">
                      {dist.dominantCraftClusters.slice(0, 2).join(', ')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ACTIVE DISTRICT DETAIL DOSSIER */}
            {activeDistrictData && (
              <Card className="p-6 bg-slate-900/90 border-cyan-500/30 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-semibold">
                        District Production Profile
                      </Badge>
                      <Badge variant="outline" className="border-white/10 text-slate-300 text-xs font-mono">
                        {activeDistrictData.investigationReadiness}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      District {activeDistrictData.districtName}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Registered Artisans</span>
                      <span className="text-white font-bold text-sm">
                        {activeDistrictData.registeredArtisans.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px]">Active Workshops</span>
                      <span className="text-cyan-400 font-bold text-sm">
                        ~{activeDistrictData.activeWorkshopsEst.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                      Dominant Craft Clusters
                    </span>
                    <ul className="space-y-1 text-slate-200">
                      {activeDistrictData.dominantCraftClusters.map((c, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                      Key Enclaves & Clusters
                    </span>
                    <ul className="space-y-1 text-slate-200">
                      {activeDistrictData.keyUrbanRuralEnclaves.map((e, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                      Raw Material Flows
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {activeDistrictData.rawMaterialFlows}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
                    <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                      Environmental Sensitivity
                    </span>
                    <p className="text-amber-300 text-[11px] leading-relaxed">
                      {activeDistrictData.environmentalHotspots}
                    </p>
                    <div className="pt-2 border-t border-white/5 mt-2">
                      <span className="text-slate-400 text-[10px] block">Primary Water Receptor:</span>
                      <span className="text-cyan-300 font-semibold">{activeDistrictData.primaryReceptorWaterways}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CRAFT ENVIRONMENTAL ASSESSMENT REGISTRY           */}
        {/* ======================================================== */}
        {activeTab === 'craft_assessments' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-semibold">
                    12 Craft Families • 28+ Documented Kashmir Traditions
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    8-Stage Lifecycle Profiles • J&K Policy 2020 & 2023 Gazette
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                  <Scissors className="w-6 h-6 text-cyan-400" />
                  <span>Craft Environmental Assessment Registry</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl mt-1">
                  Each craft holds an independent scientific profile, standardized functional unit, verified lifecycle boundaries, and documented occupational health footprint.
                </p>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search craft, material, district..."
                    value={craftSearchQuery}
                    onChange={(e) => setCraftSearchQuery(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 w-64"
                  />
                </div>

                <select
                  value={giFilter}
                  onChange={(e) => setGiFilter(e.target.value as any)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="all">All Regulatory Statuses</option>
                  <option value="GI Registered">GI Registered (15 Crafts)</option>
                  <option value="GI Applied">GI Applied</option>
                  <option value="Notified Heritage Craft">Notified Heritage Craft</option>
                </select>
              </div>
            </div>

            {/* 12 CRAFT ASSESSMENT FAMILIES SELECTOR PILLS */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Select from 12 Navigable Craft Assessment Families:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFamilyId('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedFamilyId === 'all'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-300 border border-white/10 hover:border-white/20'
                  }`}
                >
                  All 12 Families ({DOCUMENTED_CRAFT_PROFILES.length})
                </button>
                {CRAFT_ASSESSMENT_FAMILIES.map((fam) => {
                  const isSelected = selectedFamilyId === fam.id;
                  return (
                    <button
                      key={fam.id}
                      onClick={() => setSelectedFamilyId(fam.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900 text-slate-300 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-70">{fam.familyCode}</span>
                      <span>{fam.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CRAFT CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCraftProfiles.map((craft) => (
                <Card
                  key={craft.id}
                  className="p-5 bg-slate-900/90 border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/20">
                        {craft.familyName}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 h-4.5 font-mono ${
                          craft.giStatus === 'GI Registered'
                            ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
                            : craft.giStatus === 'GI Applied'
                            ? 'border-amber-500/40 text-amber-400 bg-amber-950/40'
                            : 'border-white/10 text-slate-400'
                        }`}
                      >
                        {craft.giStatus}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white break-words">
                        {craft.craftName}
                      </h3>
                      <div className="text-xs text-cyan-300 font-serif italic mt-0.5">
                        {craft.vernacularName} • <span className="font-sans not-italic text-slate-400 text-[11px]">{craft.originDivision}</span>
                      </div>
                    </div>

                    {/* Functional Unit */}
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Functional Unit / Boundary:</div>
                      <div className="text-[11px] text-slate-200 font-medium leading-tight">
                        {craft.functionalUnit}
                      </div>
                    </div>

                    {/* 8-Stage Lifecycle Mini Stepper */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>8-Stage Lifecycle:</span>
                        <span className="text-cyan-400">Stages 01 – 08 Mapped</span>
                      </div>
                      <div className="grid grid-cols-8 gap-1 pt-0.5">
                        {['Raw', 'Hrv', 'Proc', 'Fab', 'Dye', 'Trp', 'Use', 'EoL'].map((step, idx) => (
                          <div
                            key={idx}
                            title={`Stage 0${idx+1}: ${step}`}
                            className="h-1.5 rounded-full bg-cyan-500/60"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Footprint Key Indicators */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Water Footprint:</span>
                        <span className="text-cyan-300 font-mono font-semibold">{craft.waterFootprint.volumeLiters}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Manual Kinetic Share:</span>
                        <span className="text-emerald-400 font-mono font-semibold">{craft.energyProfile.kineticManualSharePercent}% Manual</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {craft.primaryDistrictClusters[0].split(' ')[0]}
                    </span>
                    <button
                      type="button"
                      onClick={() => setViewingFullDossier(craft)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold text-xs transition-all cursor-pointer"
                    >
                      <span>View 8-Stage Dossier</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: WATER, DYE EFFLUENTS & CHEMICAL EXPOSURE MATRIX   */}
        {/* ======================================================== */}
        {activeTab === 'water_chemicals' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs font-semibold">
                    18 Process Investigations • NIOSH / OSHA / CPCB Standards
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    Substance-Specific Testing Protocols
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
                  <Droplet className="w-6 h-6 text-cyan-400" />
                  <span>Water, Dye Effluents & Workshop Chemical Exposure Matrix</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl mt-1">
                  Replacing unsupported accusations with measured flow sampling, laboratory spectrometry, and structured environmental investigations across <strong className="text-white">all 12 Kashmir craft families</strong> (Pashmina, Silk, Carpets, Walnut Wood, Papier-Mâché, Copperware &amp; Kalai, Kani Shawls, Namda Felt, Gabba Upcycled Rugs, Willow Wicker, Crewel &amp; Sozni Embroidery, Khatamband, Silverware &amp; Jewellery, Traditional Pottery, and Stone Carving).
                </p>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search chemical, process, standard..."
                    value={chemProcessSearch}
                    onChange={(e) => setChemProcessSearch(e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 w-64"
                  />
                </div>

                <select
                  value={selectedChemFamilyFilter}
                  onChange={(e) => setSelectedChemFamilyFilter(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="all">All Craft Families</option>
                  {CRAFT_ASSESSMENT_FAMILIES.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* THREE METHODOLOGICAL CORRECTIONS (SCIENTIFIC GOVERNANCE BANNER) */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Mandatory Methodological & Scientific Corrections (Kashmir EcoWatch Governance)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                  <strong className="text-white block text-xs">1. Papier-Mâché VOC Protocol:</strong>
                  <p className="text-[11px] text-slate-300">
                    Previous generic claims of 120–240 ppm TVOC are strictly classified as preliminary photoionization detector (PID) screening values. OSHA explains that PIDs cannot identify individual chemicals. Exposure evaluations require active sorbent tubes and laboratory GC-MS desorption testing against substance-specific ACGIH TLVs (e.g. Stoddard solvent 100 ppm, Xylene 100 ppm, Turpentine 20 ppm).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                  <strong className="text-white block text-xs">2. Copperware Flux vs Acid Mist:</strong>
                  <p className="text-[11px] text-slate-300">
                    Kalai molten tinning releases airborne <strong className="text-cyan-300">ammonium chloride (NH4Cl) flux fumes</strong>, NOT hydrochloric acid mists in standard traditional workshops. NIOSH provides a Recommended Exposure Limit (REL) of 10 mg/m³ TWA (STEL 20 mg/m³). Hydrochloric acid pickling is restricted to specific commercial forging yards and cannot be presumed across all artisans.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                  <strong className="text-white block text-xs">3. Urban Dye Outfall Attribution:</strong>
                  <p className="text-[11px] text-slate-300">
                    Hydraulic weir metering at Zadibal and Rainawari outfalls does not attribute pollution solely to craft dyehouses without rigorous upstream/downstream residential control baselines, dye inventory tracing, and chemical fingerprinting to separate domestic sewage from artisanal discharges.
                  </p>
                </div>
              </div>
            </div>

            {/* 18-PROCESS MATRIX CARDS */}
            <div className="space-y-3">
              {filteredChemProcesses.map((proc) => (
                <Card
                  key={proc.processId}
                  className="p-4 sm:p-5 bg-slate-900/90 border-white/10 hover:border-cyan-500/30 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20">
                        {proc.processId}
                      </span>
                      <h3 className="font-bold text-sm text-white">
                        {proc.processName}
                      </h3>
                      <span className="text-xs text-slate-400 font-serif italic">
                        ({proc.craftName})
                      </span>
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0.5 font-mono ${
                        proc.evidenceStatus === 'Screening Observation Only'
                          ? 'border-amber-500/40 text-amber-400'
                          : proc.evidenceStatus === 'Potential Pressure Pathway'
                          ? 'border-cyan-500/40 text-cyan-300'
                          : 'border-white/10 text-slate-400'
                      }`}
                    >
                      {proc.evidenceStatus}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Substances & Chemical Agents:</span>
                      <p className="text-slate-200 text-[11px] leading-snug">
                        {proc.keyChemicalOrAgent}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Exposure / Effluent Pathway:</span>
                      <p className="text-amber-300/90 text-[11px] leading-snug">
                        {proc.exposureOrEffluentPathway}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Applicable Standard / Benchmark:</span>
                      <p className="text-cyan-300 font-mono text-[11px] leading-snug">
                        {proc.applicableRegulatoryStandard}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                      <span>Scientific Investigation Protocol:</span>
                      <span className="text-slate-400">QA/QC Controlled</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {proc.scientificInvestigationProtocol}
                    </p>
                    <p className="text-slate-400 text-[10px] italic border-t border-white/5 pt-1">
                      Scientific Guardrail: {proc.correctionCaveat}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: COMPARATIVE LIFECYCLE ASSESSMENT (HANDMADE VS SYNTHETIC) */}
        {/* ======================================================== */}
        {activeTab === 'comparative_lca' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-slate-950 font-bold text-xs">
                  Comparative Industrial Ecology
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Handmade Kashmir Crafts vs Petrochemical Machine Substitutes
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">
                Empirical Comparative Lifecycle Analysis: Does Traditional Craftsmanship Offer Real Environmental Advantages?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                EcoWatch scientifically tests whether traditional Kashmir craftsmanship provides measurable ecological benefits over modern synthetic alternatives, rather than merely asserting romantic claims. By measuring <strong className="text-white">embodied carbon per year of useful life</strong>, <strong className="text-white">ocean microplastic shedding</strong>, <strong className="text-white">manual kinetic energy shares</strong>, and <strong className="text-white">circular repairability</strong>, this comparative framework quantifies the true ecological superiority and the necessary environmental guardrails of traditional craft economies.
              </p>
            </div>

            {/* COMPARISON SELECTOR PILLS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {COMPARATIVE_CRAFT_LIFECYCLES.map((lca) => {
                const isSelected = selectedLcaId === lca.id;
                return (
                  <button
                    key={lca.id}
                    onClick={() => setSelectedLcaId(lca.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="text-[10px] text-emerald-400 font-mono font-bold uppercase mb-1">
                      {lca.comparisonCategory}
                    </div>
                    <div className="font-bold text-xs text-white leading-tight">
                      {lca.traditionalCraftName}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      vs {lca.modernSubstituteName}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ACTIVE COMPARISON DETAIL CARD */}
            {activeLca && (
              <Card className="p-6 bg-slate-900/90 border-emerald-500/30 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs text-emerald-400 font-mono font-bold uppercase block mb-1">
                      Head-to-Head Lifecycle Comparison • {activeLca.comparisonCategory}
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {activeLca.traditionalCraftName} <span className="text-slate-400 font-light text-lg">vs</span> {activeLca.modernSubstituteName}
                    </h3>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-white/5 text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Functional Unit Baseline</span>
                    <span className="text-xs text-emerald-300 font-bold font-mono">
                      {activeLca.functionalUnit}
                    </span>
                  </div>
                </div>

                {/* SIDE-BY-SIDE METRICS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* TRADITIONAL KASHMIR CRAFT */}
                  <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                      <span className="font-bold text-emerald-400 text-sm">{activeLca.traditionalCraftName}</span>
                      <Badge className="bg-emerald-500 text-slate-950 font-bold text-[10px]">Traditional Handmade</Badge>
                    </div>
                    <div className="space-y-2 text-slate-200">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Embodied Carbon Intensity:</span>
                        <span className="font-mono text-emerald-300 font-bold">{activeLca.traditionalEmbodiedCarbon}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Primary Operational Energy:</span>
                        <span className="text-slate-200">{activeLca.energySourceTraditional}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Average Useful Lifespan:</span>
                        <span className="font-mono text-emerald-400 font-bold">{activeLca.averageLifespanTraditional}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Microplastic Emissions:</span>
                        <span className="text-emerald-300 font-semibold">{activeLca.microplasticEmissionsTraditional}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">End-of-Life Biodegradability:</span>
                        <span className="text-slate-200">{activeLca.endOfLifeBiodegradabilityTraditional}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Repairability Index:</span>
                        <span className="text-emerald-400 font-semibold">{activeLca.repairabilityScoreTraditional}</span>
                      </div>
                    </div>
                  </div>

                  {/* MODERN SYNTHETIC SUBSTITUTE */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="font-bold text-slate-200 text-sm">{activeLca.modernSubstituteName}</span>
                      <Badge variant="outline" className="border-white/20 text-slate-400 text-[10px]">Industrial Machine Substitute</Badge>
                    </div>
                    <div className="space-y-2 text-slate-300">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Embodied Carbon Intensity:</span>
                        <span className="font-mono text-amber-400 font-bold">{activeLca.substituteEmbodiedCarbon}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Primary Operational Energy:</span>
                        <span className="text-slate-300">{activeLca.energySourceSubstitute}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Average Useful Lifespan:</span>
                        <span className="font-mono text-amber-400 font-bold">{activeLca.averageLifespanSubstitute}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Microplastic Emissions:</span>
                        <span className="text-amber-400 font-semibold">{activeLca.microplasticEmissionsSubstitute}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">End-of-Life Biodegradability:</span>
                        <span className="text-slate-300">{activeLca.endOfLifeBiodegradabilitySubstitute}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Repairability Index:</span>
                        <span className="text-slate-400 font-semibold">{activeLca.repairabilityScoreSubstitute}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SCIENTIFIC VERDICT & NUANCE */}
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Scientific Lifecycle Verdict:</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed text-[11px]">
                    {activeLca.scientificLifecycleVerdict}
                  </p>
                  <div className="pt-2 border-t border-white/5 text-[11px] text-amber-300/90 leading-snug">
                    <strong className="text-amber-400">Environmental Nuance & Required Safeguard:</strong> {activeLca.tradeOffNuance}
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: 9 ENVIRONMENTAL SYSTEMS (PRESERVED)               */}
        {/* ======================================================== */}
        {activeTab === 'nine_systems' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>The 9 Environmental Assessment Systems</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Standardized operational modules maintaining strict distinction between production-site pollution, supply-chain impacts, and whole-product lifecycle assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {THE_NINE_ENVIRONMENTAL_SYSTEMS.map((sys, idx) => (
                <Card
                  key={sys.systemCode}
                  className="p-5 bg-slate-900/90 border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                        {sys.systemCode}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Lead: {sys.leadAgency}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm">
                      {sys.name}
                    </h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {sys.scopeSummary}
                    </p>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Scientific Indicators:
                      </span>
                      <ul className="space-y-0.5 text-[10px] text-slate-400 font-mono">
                        {sys.scientificIndicators.slice(0, 3).map((ind, i) => (
                          <li key={i}>• {ind}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-cyan-400/80 font-mono">
                    Standards: {sys.applicableStandards.join(' • ')}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: MATERIAL PROVENANCE & FORESTRY/WETLANDS (PRESERVED)*/}
        {/* ======================================================== */}
        {activeTab === 'provenance_materials' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TreePine className="w-5 h-5 text-cyan-400" />
                <span>Raw Material Provenance & Himalayan Ecosystem Dependencies</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Field documentation of three critical raw material extraction systems: pastoral rangelands, walnut orchards, and wetland willow beds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CHANGTHANG PASTORAL */}
              <Card className="p-6 bg-slate-900/90 border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white text-base">
                    Changthang Alpine Rangelands (Pashm Fiber)
                  </h3>
                </div>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Altitude & Ecosystem:</strong> High-altitude cold desert steppe (4,200–5,000 m asl) supporting the nomadic Changpa pastoral system.
                  </p>
                  <p>
                    <strong className="text-white">The Environmental Balance:</strong> Traditional combing of Capra hircus goats is completely non-destructive and non-shearing. However, climate warming and shrinking winter grazing areas are creating pasture degradation in eastern Ladakh.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 text-[11px] block">Field Assessment Objective:</span>
                    <p className="text-[10px] text-slate-400">
                      Satellite biomass monitoring (NDVI) of Changthang winter pastures to link downstream shawl production volume with rangeland carrying capacity.
                    </p>
                  </div>
                </div>
              </Card>

              {/* WALNUT TREES */}
              <Card className="p-6 bg-slate-900/90 border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-base">
                    Juglans regia (Walnut) Agroforestry
                  </h3>
                </div>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Legal Protection:</strong> Strictly protected under the <em className="text-amber-300">J&K Preservation of Specific Trees Act 1969</em>. Felling green, fruit-bearing walnut trees is prohibited without District Magistrate permits.
                  </p>
                  <p>
                    <strong className="text-white">The Environmental Balance:</strong> Legitimate woodcarving relies on dried, dead, or senescent orchard trees. The timber stores atmospheric carbon for centuries in heirloom furniture.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-amber-400 text-[11px] block">Field Assessment Objective:</span>
                    <p className="text-[10px] text-slate-400">
                      QR-code timber origin tagging linking carved furniture back to permitted agricultural orchard permits, eliminating black-market timber.
                    </p>
                  </div>
                </div>
              </Card>

              {/* WILLOW PLANTATIONS */}
              <Card className="p-6 bg-slate-900/90 border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Waves className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">
                    Wetland Willow Plantations (Salix viminalis)
                  </h3>
                </div>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Habitat & Cultivation:</strong> Cultivated along riparian canals and wetland margins in Shalbugh, Ganderbal, and Shallabugh wetland boundaries.
                  </p>
                  <p>
                    <strong className="text-white">The Environmental Balance:</strong> Willow coppicing is completely sustainable: cutting annual shoots encourages root growth that stabilizes wetland banks without killing the tree.
                  </p>
                  <p className="text-amber-400 text-[11px]">
                    The critical environmental risk is not pole cutting, but the <strong className="text-white">subsequent boiling process</strong>: direct-fired vats burning 4,000+ tonnes of firewood and dumping polyphenol-rich tannin wash-water into Shallabugh wetland margins during autumn waterfowl migration.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: CRAFTLORE INTERFACE & ECO-PASSPORT (PRESERVED)    */}
        {/* ======================================================== */}
        {activeTab === 'craftlore_passport' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-cyan-400" />
                  <span>The Scientific Bridge: Kashmir EcoWatch &amp; Craftlore</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Connecting independent environmental lifecycle evidence with consumer verification, responsible sourcing, and the Craft Environmental Passport.
                </p>
              </div>
              <a
                href="https://craftlore.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors shadow-sm"
              >
                <span>Visit craftlore.org</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* TWO-PLATFORM ARCHITECTURE DIAGRAM */}
            <Card className="p-6 bg-slate-900 border-cyan-500/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Kashmir EcoWatch (Scientific Evidence)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Responsible for independent lifecycle assessment, water and carbon measurements, spatial intelligence, and laboratory ecotoxicology. Never compromised by commercial promotion.
                  </p>
                  <ul className="space-y-1 text-[10px] text-slate-400 pt-1 font-mono">
                    <li>• Objective Lifecycle Boundaries (LCA)</li>
                    <li>• Audited Water & Carbon Metrics</li>
                    <li>• Field Laboratory Testing Protocols</li>
                    <li>• Independent Scientific Authority</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Award className="w-4 h-4" />
                      <span>Craftlore (Artisan & Commerce Interface)</span>
                    </div>
                    <a
                      href="https://craftlore.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-mono text-[10px] underline underline-offset-2"
                    >
                      craftlore.org <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Consumer-facing cultural storytelling, artisan directory, GI verification display, and fair-trade market linkages for Kashmir&apos;s master craftspeople.
                  </p>
                  <ul className="space-y-1 text-[10px] text-slate-400 pt-1 font-mono">
                    <li>• Consumer QR Code Eco-Passports</li>
                    <li>• Artisan Master Biographies & Lineages</li>
                    <li>• Certified GI Product Verification</li>
                    <li>• Ethical Global Market Access</li>
                  </ul>
                  <div className="pt-2">
                    <a
                      href="https://craftlore.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                    >
                      <span>Open Craftlore Portal (craftlore.org)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            {/* CRAFT PASSPORT ATTRIBUTES TABLE */}
            <Card className="p-6 bg-slate-900/90 border-white/10 space-y-4">
              <h3 className="font-bold text-white text-sm">
                Craft Environmental Passport Schema (V1.0 Specification)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase font-mono">
                    <tr>
                      <th className="p-3">Passport Parameter</th>
                      <th className="p-3">EcoWatch Responsibility</th>
                      <th className="p-3">Craftlore Consumer Display</th>
                      <th className="p-3">Evidence Verification Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {CRAFT_PASSPORT_SPECIFICATIONS.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="p-3 font-semibold text-white">
                          {spec.parameter}
                        </td>
                        <td className="p-3 text-[11px] text-cyan-300/90">
                          {spec.ecowatchRole}
                        </td>
                        <td className="p-3 text-[11px] text-amber-300/90">
                          {spec.craftloreRole}
                        </td>
                        <td className="p-3 text-[10px] font-mono text-slate-400">
                          {spec.verificationMethod}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: SPATIAL CLUSTER ATLAS (PRESERVED)                 */}
        {/* ======================================================== */}
        {activeTab === 'spatial_atlas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-cyan-400" />
                  <span>Kashmir Division Craft GIS Cluster Atlas</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Spatial distribution of traditional craft clusters, municipal drainage networks, and protected wetland boundaries.
                </p>
              </div>
            </div>

            <Card className="p-6 bg-slate-900/90 border-cyan-500/30 space-y-4">
              <SectoralImpactMap sector="handicrafts" />
            </Card>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 10: SCIENTIFIC DOSSIERS & PILOTS (PRESERVED)         */}
        {/* ======================================================== */}
        {activeTab === 'pilots' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>Sectoral EIA Assessment Dossiers: Handicrafts</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Scientific assessments evaluating urban industrial ecology, craft clusters, and modular wastewater treatment solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pilots.map((pilot) => (
                <Card
                  key={pilot.id}
                  className="p-5 bg-slate-900/90 border-white/10 hover:border-cyan-500/40 transition-colors space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
                        {pilot.location}
                      </Badge>
                      <Badge variant="outline" className="border-white/10 text-slate-400 text-xs font-mono">
                        {pilot.eiaStage}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-white">
                        {pilot.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {pilot.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">Lead Author / Reviewer</span>
                        <span className="text-white font-medium">{pilot.leadReviewer}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">Confidence Level</span>
                        <span className="text-cyan-400 font-bold">{pilot.confidenceScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref: {pilot.id}
                    </span>
                    <Link
                      href={`/sectoral-eia/assessment/${pilot.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                    >
                      <span>Open Scientific Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* 8-STAGE CRAFT ENVIRONMENTAL LIFECYCLE DOSSIER MODAL      */}
      {/* ======================================================== */}
      {viewingFullDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                  8-STAGE LIFECYCLE PROFILE
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {viewingFullDossier.familyName} • {viewingFullDossier.giStatus}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewingFullDossier(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-100 text-xs">
              {/* Masthead */}
              <div className="border-b border-white/10 pb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-400 text-xs font-semibold">{viewingFullDossier.notifiedGazette}</span>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px] font-mono">
                    {viewingFullDossier.evidenceStatus}
                  </Badge>
                </div>
                <h2 className="text-2xl font-black text-white">
                  {viewingFullDossier.craftName}
                </h2>
                <div className="text-sm text-cyan-300 font-serif italic">
                  {viewingFullDossier.vernacularName} • <span className="font-sans not-italic text-slate-400 text-xs">{viewingFullDossier.originDivision} ({viewingFullDossier.primaryDistrictClusters.join(', ')})</span>
                </div>
                <div className="pt-2 text-[11px] text-slate-300">
                  <strong className="text-white">Functional Assessment Unit:</strong> {viewingFullDossier.functionalUnit} • <strong className="text-white">Workforce:</strong> {viewingFullDossier.artisanWorkforceEst}
                </div>
              </div>

              {/* 8-Stage Lifecycle Detail */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>The Standard Eight-Stage Environmental Lifecycle</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block text-[11px]">01. Raw Materials & Origin:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage1_rawMaterialOrigin}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block text-[11px]">02. Harvesting & Extraction:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage2_harvestingExtraction}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block text-[11px]">03. Primary Processing:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage3_primaryProcessing}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block text-[11px]">04. Artisan Fabrication & Energy:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage4_artisanFabrication}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block text-[11px]">05. Dyeing, Finishing & Chemical Treatment:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage5_dyeingFinishing}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-cyan-400 block text-[11px]">06. Packaging & Transportation:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage6_packagingTransport}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-emerald-400 block text-[11px]">07. Use, Care, Repair & Lifespan:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage7_useCareRepair}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                    <span className="font-bold text-emerald-400 block text-[11px]">08. End-of-Life & Circularity:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{viewingFullDossier.eightStageLifecycle.stage8_endOfLifeCircularity}</p>
                  </div>
                </div>
              </div>

              {/* Water, Energy & Chemical Footprint */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                  <div className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5" />
                    <span>Water Footprint & Energy Intensity</span>
                  </div>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div><strong className="text-white">Water Footprint:</strong> {viewingFullDossier.waterFootprint.volumeLiters} ({viewingFullDossier.waterFootprint.description})</div>
                    <div><strong className="text-white">Energy Profile:</strong> {viewingFullDossier.energyProfile.primarySource}</div>
                    <div><strong className="text-white">Manual Kinetic Share:</strong> <span className="font-mono font-bold text-emerald-400">{viewingFullDossier.energyProfile.kineticManualSharePercent}% Manual</span></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                  <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Occupational Health & Regulatory Standards</span>
                  </div>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <div><strong className="text-white">Substances:</strong> {viewingFullDossier.chemicalAndEmissionsProfile.substancesUsed.join(', ')}</div>
                    <div><strong className="text-white">Health Factors:</strong> {viewingFullDossier.chemicalAndEmissionsProfile.occupationalHealthNotes.join(' • ')}</div>
                    <div className="font-mono text-[10px] text-cyan-400">Standards: {viewingFullDossier.chemicalAndEmissionsProfile.applicableStandards.join(' • ')}</div>
                  </div>
                </div>
              </div>

              {/* Advantages vs Pressure Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                  <div className="font-bold text-emerald-400 text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Environmental Advantages</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {viewingFullDossier.environmentalAdvantages.map((adv, idx) => (
                      <li key={idx}>• {adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                  <div className="font-bold text-amber-400 text-xs flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Ecological Pressure Points & Risks</span>
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    {viewingFullDossier.environmentalPressurePoints.map((risk, idx) => (
                      <li key={idx}>• {risk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Field Investigations */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 space-y-1.5">
                <span className="font-bold text-cyan-300 text-xs uppercase font-mono block">Recommended Empirical Field Investigations:</span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {viewingFullDossier.recommendedFieldInvestigations.map((inv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{inv}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}
