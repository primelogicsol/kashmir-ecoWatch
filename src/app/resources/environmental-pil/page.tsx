'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { EnvironmentalPilSubNav, PIL_TABS } from '@/components/environmental-pil/EnvironmentalPilSubNav';
import { FilePilModule } from '@/components/environmental-pil/FilePilModule';
import { FilingChecklistModule } from '@/components/environmental-pil/FilingChecklistModule';
import { DraftingStudioModule } from '@/components/environmental-pil/DraftingStudioModule';
import { LegalAidModule } from '@/components/environmental-pil/LegalAidModule';
import { FundingCostsModule } from '@/components/environmental-pil/FundingCostsModule';
import { CaseLifecycleModule } from '@/components/environmental-pil/CaseLifecycleModule';
import { ScientificEvidenceModule } from '@/components/environmental-pil/ScientificEvidenceModule';
import { EnvironmentalLitigationSupportCTA } from '@/components/environmental-pil/EnvironmentalLitigationSupportCTA';
import {
  ENVIRONMENTAL_CASES_DATA,
  AGENCY_ACCOUNTABILITY_REGISTER,
  ENVIRONMENTAL_LEGAL_STATUTES,
  REGIONAL_JUDICIAL_SUMMARIES,
  SECTORAL_JUDICIAL_SUMMARIES,
  COURT_YEAR_COMPLETENESS_MATRIX,
  EnvironmentalCase,
  KEWRegion,
  EnvironmentalSector,
  ComplianceStatus,
  ProceedingType
} from '@/data/environmental-pil';
import {
  Scale,
  FileText,
  Clock,
  MapPin,
  Layers,
  Compass,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  Building2,
  BookOpen,
  Database,
  Download,
  Terminal,
  Code,
  Cpu,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  Building,
  Gavel,
  Shield,
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

function PilUrlTabSync({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      onTabChange(tabParam === 'data-sources' ? 'overview' : tabParam);
    }
  }, [searchParams, onTabChange]);
  return null;
}

function EnvironmentalPilPortalContent() {
  // Tab State: default synchronously to 'overview' so full SSR HTML pre-renders with zero Suspense bailout
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Filter States for Inventory
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [selectedProceedingType, setSelectedProceedingType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Case for Inspector Modal
  const [selectedCase, setSelectedCase] = useState<EnvironmentalCase | null>(null);

  // Sync tab change with URL
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabId);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  // Filtered Cases
  const filteredCases = useMemo(() => {
    return ENVIRONMENTAL_CASES_DATA.filter((c) => {
      if (selectedRegion !== 'ALL' && c.region !== selectedRegion) return false;
      if (selectedSector !== 'ALL' && c.sector !== selectedSector) return false;
      if (selectedProceedingType !== 'ALL' && c.proceedingType !== selectedProceedingType) return false;
      if (selectedTier !== 'ALL' && c.verificationTier !== selectedTier) return false;
      if (selectedStatus !== 'ALL') {
        const hasMatchingStatus = c.complianceDirectives.some((d) => d.status === selectedStatus);
        if (!hasMatchingStatus && c.currentJudicialStatus !== selectedStatus) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.caseTitle.toLowerCase().includes(q);
        const matchesNumber = c.caseNumber.toLowerCase().includes(q);
        const matchesAsset = c.environmentalAsset.toLowerCase().includes(q);
        const matchesPetitioner = c.petitioners.toLowerCase().includes(q);
        const matchesDistricts = c.districts.some((d) => d.toLowerCase().includes(q));
        const matchesJurisdiction = c.jurisdiction.toLowerCase().includes(q);
        return matchesTitle || matchesNumber || matchesAsset || matchesPetitioner || matchesDistricts || matchesJurisdiction;
      }
      return true;
    });
  }, [selectedRegion, selectedSector, selectedProceedingType, selectedStatus, selectedTier, searchQuery]);

  // Evidentiary Tier Counts
  const authenticatedCasesCount = useMemo(() => {
    return ENVIRONMENTAL_CASES_DATA.filter((c) => c.verificationTier === 'TIER_1_AUTHENTICATED').length;
  }, []);

  const corroboratingCasesCount = useMemo(() => {
    return ENVIRONMENTAL_CASES_DATA.filter((c) => c.verificationTier === 'TIER_2_UNDER_CORROBORATION').length;
  }, []);

  // Overall Statistics
  const totalDirectivesCount = useMemo(() => {
    return ENVIRONMENTAL_CASES_DATA.reduce((acc, c) => acc + c.complianceDirectives.length, 0);
  }, []);

  const compliedDirectivesCount = useMemo(() => {
    return ENVIRONMENTAL_CASES_DATA.reduce(
      (acc, c) => acc + c.complianceDirectives.filter((d) => d.status === 'COMPLIED').length,
      0
    );
  }, []);

  const overallComplianceRate = useMemo(() => {
    if (totalDirectivesCount === 0) return 0;
    return Math.round((compliedDirectivesCount / totalDirectivesCount) * 100);
  }, [totalDirectivesCount, compliedDirectivesCount]);

  // All chronological proceedings flattened and sorted by date desc
  const allProceedings = useMemo(() => {
    const list: Array<{
      caseId: string;
      caseTitle: string;
      caseNumber: string;
      region: KEWRegion;
      jurisdiction: string;
      event: (typeof ENVIRONMENTAL_CASES_DATA)[0]['chronology'][0];
    }> = [];

    ENVIRONMENTAL_CASES_DATA.forEach((c) => {
      c.chronology.forEach((e) => {
        list.push({
          caseId: c.id,
          caseTitle: c.caseTitle,
          caseNumber: c.caseNumber,
          region: c.region,
          jurisdiction: c.jurisdiction,
          event: e
        });
      });
    });

    return list.sort((a, b) => new Date(b.event.date).getTime() - new Date(a.event.date).getTime());
  }, []);

  // Export Data to CSV
  const exportCasesCSV = () => {
    const headers = [
      'Case ID',
      'Case Number',
      'Case Title',
      'Filing Year',
      'Proceeding Type',
      'Jurisdiction',
      'Region',
      'Districts',
      'Sector',
      'Environmental Asset',
      'Status',
      'Directives Count',
      'Source Ref'
    ];

    const rows = ENVIRONMENTAL_CASES_DATA.map((c) => [
      `"${c.id}"`,
      `"${c.caseNumber}"`,
      `"${c.caseTitle.replace(/"/g, '""')}"`,
      c.filingYear,
      c.proceedingType,
      `"${c.jurisdiction}"`,
      `"${String(c.region).includes('Azad Jammu') ? 'AJ&K' : c.region}"`,
      `"${c.districts.join('; ')}"`,
      `"${c.sector}"`,
      `"${c.environmentalAsset.replace(/"/g, '""')}"`,
      c.currentJudicialStatus,
      c.complianceDirectives.length,
      `"${c.sourceDocumentRef.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KEW_Environmental_PIL_Master_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Completeness Matrix CSV
  const exportCompletenessCSV = () => {
    const headers = [
      'Court Code',
      'Court Name',
      'Region',
      'Jurisdiction Type',
      '1986-1995 Status',
      '1986-1995 Cases',
      '1996-2005 Status',
      '1996-2005 Cases',
      '2006-2015 Status',
      '2006-2015 Cases',
      '2016-2026 Status',
      '2016-2026 Cases',
      'Total Recovered',
      'Completeness %',
      'Institutional Evolution'
    ];
    const rows = COURT_YEAR_COMPLETENESS_MATRIX.map((c) => [
      '"' + c.courtCode + '"',
      '"' + c.courtName + '"',
      '"' + (String(c.region).includes('Azad Jammu') ? 'AJ&K' : c.region) + '"',
      c.jurisdictionType,
      c.decades.era1986_1995.status,
      c.decades.era1986_1995.recoveredCases,
      c.decades.era1996_2005.status,
      c.decades.era1996_2005.recoveredCases,
      c.decades.era2006_2015.status,
      c.decades.era2006_2015.recoveredCases,
      c.decades.era2016_2026.status,
      c.decades.era2016_2026.recoveredCases,
      c.totalRecoveredLitigations,
      c.overallCompletenessRating + '%',
      '"' + c.institutionalEvolutionNotes.replace(/"/g, '""') + '"'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'KEW_40Year_Judicial_Completeness_Matrix_' + new Date().toISOString().slice(0, 10) + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Data to JSON
  const exportCasesJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(ENVIRONMENTAL_CASES_DATA, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `KEW_Environmental_PIL_Database_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Suspense fallback={null}>
        <PilUrlTabSync onTabChange={setActiveTab} />
      </Suspense>
      {/* ── 1. MODULE HERO HEADER ─── */}
      <Heading
        label="KEW · RESOURCES / ENVIRONMENTAL JUDICIAL INTELLIGENCE"
        images={[
          '/images/environmental-pil/kashmir-high-court-wetland.jpg',
          '/images/environmental-pil/ladakh-transhimalayan-sanctuary.jpg',
          '/images/environmental-pil/forest-moratorium-river-basin.jpg'
        ]}
        overlayClassName="from-slate-950/90 via-slate-950/75 to-slate-950"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/open-data' },
          { label: 'Environmental PIL Portal' }
        ]}
        icon={<Scale className="w-6 h-6 text-emerald-400" />}
        title={
          <>
            <span className="flex items-center gap-3 flex-wrap leading-[1.12] pb-1">
              <span className="inline-flex items-center self-center bg-emerald-600 text-slate-950 font-black uppercase tracking-widest rounded-[4px] px-2.5 py-0.5 text-[10px] sm:text-xs">
                JUDICIAL INVENTORY
              </span>
              <span>Environmental PIL Portal</span>
            </span>
            <span className="block break-words leading-[1.12] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Litigation, Judgments &amp; Compliance Monitoring
            </span>
          </>
        }
        subtitle="Universal 40-year judicial surveillance (1986–2026) covering 26 high-impact environmental litigations (14 Authenticated Dockets · 12 Archival Precedents under Corroboration) across Kashmir Valley, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan. Independent tracking of court directions, statutory deadlines, institutional compliance, and government agency accountability."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleTabChange('inventory')}
              className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Explore 26 Litigations</span>
            </button>
            <button
              onClick={() => handleTabChange('compliance')}
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compliance Audits</span>
            </button>
            <button
              onClick={() => handleTabChange('gis-atlas')}
              className="px-3.5 py-1.5 rounded-[6px] bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Judicial GIS Atlas</span>
            </button>
            <Link
              href="/governance/legislation-enforcement-observatory"
              className="px-3.5 py-1.5 rounded-[6px] bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 font-bold text-xs border border-amber-500/40 transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>5-Region Legislation &amp; Reform Observatory (16 Registries)</span>
            </Link>
          </div>
        }
      />

      {/* ── 2. SUBMODULE NAVIGATION BAR ─── */}
      <EnvironmentalPilSubNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* ── 3. MAIN WORKBENCH CONTENT CONTAINER ─── */}
      <main className="container mx-auto py-8 w-full flex-1">
        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 1: OVERVIEW HUB */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4-Card Executive KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="kew-card-shell p-5">
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-emerald-500/10 border-emerald-500/20">
                    <Scale className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <h3 className="kew-card-title text-xs uppercase tracking-wider text-slate-400 mb-1">Master Litigations</h3>
                <div className="kew-card-kpi mb-1.5">
                  <span className="kew-card-kpi-value">{ENVIRONMENTAL_CASES_DATA.length}</span>
                  <span className="kew-card-kpi-unit">Tracked Matters</span>
                </div>
                <p className="kew-card-desc text-xs mb-3">
                  {authenticatedCasesCount} Authenticated Dockets · {corroboratingCasesCount} Archival Precedents
                </p>
                <div className="mt-auto flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-[4px] border border-emerald-800/40 w-fit">
                  <span>14 Verified Court Orders · 12 Corroborating</span>
                </div>
              </Card>

              <Card className="kew-card-shell p-5">
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-blue-500/10 border-blue-500/20">
                    <FileCheck2 className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <h3 className="kew-card-title text-xs uppercase tracking-wider text-slate-400 mb-1">Judicial Directives</h3>
                <div className="kew-card-kpi mb-1.5">
                  <span className="kew-card-kpi-value">{totalDirectivesCount}</span>
                  <span className="kew-card-kpi-unit">Directives</span>
                </div>
                <p className="kew-card-desc text-xs mb-3">
                  {compliedDirectivesCount} verified complied · {totalDirectivesCount - compliedDirectivesCount} in-progress/overdue
                </p>
                <div className="mt-auto flex items-center gap-2 text-[10px] text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-[4px] border border-blue-800/40 w-fit">
                  <span>Overall Compliance: {overallComplianceRate}%</span>
                </div>
              </Card>

              <Card className="kew-card-shell p-5">
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-amber-500/10 border-amber-500/20">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                <h3 className="kew-card-title text-xs uppercase tracking-wider text-slate-400 mb-1">Environmental Penalties</h3>
                <div className="kew-card-kpi mb-1.5">
                  <span className="kew-card-kpi-value text-amber-300">₹68.7</span>
                  <span className="kew-card-kpi-unit">Crore</span>
                </div>
                <p className="kew-card-desc text-xs mb-3">
                  Fines &amp; environmental compensation ordered by NGT &amp; High Courts
                </p>
                <div className="mt-auto flex items-center gap-2 text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-[4px] border border-amber-800/40 w-fit">
                  <span>Polluter Pays Principle Enforced</span>
                </div>
              </Card>

              <Card className="kew-card-shell p-5">
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-rose-500/10 border-rose-500/20">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                  </div>
                </div>
                <h3 className="kew-card-title text-xs uppercase tracking-wider text-slate-400 mb-1">Accountability Register</h3>
                <div className="kew-card-kpi mb-1.5">
                  <span className="kew-card-kpi-value">10</span>
                  <span className="kew-card-kpi-unit">Agencies</span>
                </div>
                <p className="kew-card-desc text-xs mb-3">
                  Continuous performance audit of municipal &amp; engineering bodies
                </p>
                <div className="mt-auto flex items-center gap-2 text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-[4px] border border-rose-800/40 w-fit">
                  <span>6 Default / Contempt Matters Tracked</span>
                </div>
              </Card>
            </div>

            {/* Core Judicial Doctrine Banner */}
            <div className="p-4 rounded-lg bg-slate-900 border border-emerald-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[6px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                  <Gavel className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-white">
                    Fundamental KEW Principle: Case Disposal Does Not Equal Environmental Compliance
                  </h3>
                  <div className="text-xs text-slate-300 leading-relaxed space-y-1 max-w-4xl">
                    <p>
                      A court case may be formally disposed of while environmental restoration, pollution control measures or other legally applicable compliance requirements remain incomplete.
                    </p>
                    <p>
                      Kashmir EcoWatch monitors documented judicial directions and their implementation, including wastewater treatment, pollution reduction, ecosystem restoration and recovery of affected environmental areas.
                    </p>
                    <p>
                      Where evidence is available, KEW evaluates implementation through official compliance reports, field observations, environmental measurements and validated satellite imagery.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/resources/environmental-pil?tab=compliance"
                onClick={() => handleTabChange('compliance')}
                className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 self-end md:self-auto cursor-pointer"
              >
                <span>View Environmental Accountability Register</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Regional Coverage Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">Five-Region Judicial Coverage</h3>
                  <p className="text-xs text-slate-400">Master cases, active monitoring benches, and compliance ratios</p>
                </div>
                <button
                  onClick={() => handleTabChange('districts')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Regional dossiers</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {(Object.keys(REGIONAL_JUDICIAL_SUMMARIES) as KEWRegion[]).map((regKey) => {
                  const reg = REGIONAL_JUDICIAL_SUMMARIES[regKey];
                  const displayName = regKey === 'AJ&K' ? 'AJ&K' : regKey;
                  return (
                    <Card
                      key={regKey}
                      className="p-3.5 bg-slate-900/60 border-slate-800 hover:border-slate-700 transition-colors rounded-lg cursor-pointer"
                      onClick={() => {
                        setSelectedRegion(regKey);
                        handleTabChange('inventory');
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-white">{displayName}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                          {reg.totalCases} {reg.totalCases === 1 ? 'Case' : 'Cases'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mb-2">
                        {reg.compliedDirectives} of {reg.totalDirectives} directions met
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${reg.complianceRate}%` }}
                        />
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 flex justify-between">
                        <span>Compliance</span>
                        <span className="font-semibold text-emerald-400">{reg.complianceRate}%</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* High-Impact Master Case Spotlights */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-white">Landmark Environmental Litigations (1986–2026)</h3>
                  <p className="text-xs text-slate-400">Select precedent-setting cases transforming Himalayan ecological governance</p>
                </div>
                <button
                  onClick={() => handleTabChange('inventory')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore all {ENVIRONMENTAL_CASES_DATA.length} cases</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ENVIRONMENTAL_CASES_DATA.find((c) => c.id === 'kew-case-001')!, // Dal Lake
                  ENVIRONMENTAL_CASES_DATA.find((c) => c.id === 'kew-case-002')!, // Doodhganga NGT
                  ENVIRONMENTAL_CASES_DATA.find((c) => c.id === 'kew-case-017')!, // Godavarman 1996 Supreme Court
                  ENVIRONMENTAL_CASES_DATA.find((c) => c.id === 'kew-case-004')!, // Save Neelum AJ&K
                  ENVIRONMENTAL_CASES_DATA.find((c) => c.id === 'kew-case-022')!, // Deosai GB Chief Court 2007
                  ENVIRONMENTAL_CASES_DATA.find((c) => c.id === 'kew-case-009')!  // Tawi River Jammu
                ].filter(Boolean).map((c) => (
                  <Card
                    key={c.id}
                    className="p-4 bg-slate-900/70 border-slate-800 hover:border-slate-700 transition-all rounded-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-emerald-400 border border-slate-700">
                            {c.caseNumber}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-slate-800/80 text-slate-300 border border-slate-700/80">
                            {String(c.region).includes('Azad Jammu') ? 'AJ&K' : c.region}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 text-slate-400 border border-slate-800">
                            {c.filingYear}
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                            c.currentJudicialStatus === 'MONITORING_COMPLIANCE'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                          }`}
                        >
                          {c.currentJudicialStatus.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-white leading-snug mb-1.5">
                        {c.caseTitle}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {c.statutorySeparationNotice}
                      </p>

                      <div className="space-y-1.5 mb-3 text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-[6px] border border-slate-800/80">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Asset:</span>
                          <span className="font-medium text-slate-200">{c.environmentalAsset}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Bench:</span>
                          <span className="font-medium text-slate-200 truncate max-w-[240px]">{c.presidingBench}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">
                        Directives: {c.complianceDirectives.length} Tracked
                      </span>
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Case Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 2: PIL INVENTORY */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by case title, case number, asset, district, judge, or petitioner..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={exportCasesCSV}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CSV Export</span>
                  </button>
                  <button
                    onClick={exportCasesJSON}
                    className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
                    <span>JSON Feed</span>
                  </button>
                </div>
              </div>

              {/* Filter Selectors Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Evidentiary Tier</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Evidentiary Tiers ({ENVIRONMENTAL_CASES_DATA.length})</option>
                    <option value="TIER_1_AUTHENTICATED">Tier 1: Authenticated Dockets ({authenticatedCasesCount})</option>
                    <option value="TIER_2_UNDER_CORROBORATION">Tier 2: Archival Precedents ({corroboratingCasesCount})</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Regions (5)</option>
                    <option value="Kashmir Valley">Kashmir Valley</option>
                    <option value="Jammu">Jammu</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="AJ&K">AJ&K</option>
                    <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Environmental Sector</label>
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Sectors (8)</option>
                    {SECTORAL_JUDICIAL_SUMMARIES.map((s) => (
                      <option key={s.sector} value={s.sector}>{s.sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Proceeding Type</label>
                  <select
                    value={selectedProceedingType}
                    onChange={(e) => setSelectedProceedingType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Proceeding Types</option>
                    <option value="PIL">Public Interest Litigation (PIL)</option>
                    <option value="WRIT_PETITION">Writ Petition</option>
                    <option value="SUO_MOTU">Suo Motu Proceeding</option>
                    <option value="TRIBUNAL_APPLICATION">Tribunal Application (NGT)</option>
                    <option value="CONTEMPT_PETITION">Contempt Petition</option>
                    <option value="APPEAL">Appeal / Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">Directive Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-[6px] px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="ALL">All Compliance States</option>
                    <option value="COMPLIED">Complied</option>
                    <option value="IN_PROGRESS">In-Progress</option>
                    <option value="OVERDUE">Overdue</option>
                    <option value="DEFAULT_CONTEMPT">Default / Contempt</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Showing <strong className="text-white">{filteredCases.length}</strong> of {ENVIRONMENTAL_CASES_DATA.length} tracked litigations ({authenticatedCasesCount} Authenticated · {corroboratingCasesCount} Under Corroboration)</span>
                {(selectedRegion !== 'ALL' || selectedSector !== 'ALL' || selectedProceedingType !== 'ALL' || selectedStatus !== 'ALL' || selectedTier !== 'ALL' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedRegion('ALL');
                      setSelectedSector('ALL');
                      setSelectedProceedingType('ALL');
                      setSelectedStatus('ALL');
                      setSelectedTier('ALL');
                      setSearchQuery('');
                    }}
                    className="text-emerald-400 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </Card>

            {/* Cases Table / Card Grid */}
            <div className="space-y-3">
              {filteredCases.map((c) => (
                <Card
                  key={c.id}
                  className="p-4 bg-slate-900/70 border-slate-800 hover:border-slate-700 transition-all rounded-lg"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-emerald-400 border border-slate-700">
                          {c.caseNumber}
                        </span>
                        {c.verificationTier === 'TIER_1_AUTHENTICATED' ? (
                          <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
                            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                            TIER 1 · AUTHENTICATED
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-amber-950/80 text-amber-300 border border-amber-700/60 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-amber-400" />
                            TIER 2 · ARCHIVAL
                          </span>
                        )}
                        {c.nextHearingDate && (
                          <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-[4px] bg-rose-950 text-rose-300 border border-rose-700/60 flex items-center gap-1 animate-pulse">
                            <Calendar className="w-2.5 h-2.5 text-rose-400" />
                            HEARING: {c.nextHearingDate}
                          </span>
                        )}
                        {c.courtRecordedQuantitativeClaims && c.courtRecordedQuantitativeClaims.length > 0 && (
                          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-[4px] bg-blue-950/70 text-blue-300 border border-blue-800/40 hidden md:inline">
                            {c.courtRecordedQuantitativeClaims.length} Court Claims Audited
                          </span>
                        )}
                        {c.cnrNumber ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-950 text-slate-400 border border-slate-800 hidden sm:inline">
                            CNR: {c.cnrNumber}
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-amber-950/50 text-amber-300/90 border border-amber-800/40 hidden sm:inline">
                            Pending Official Court Registry Verification
                          </span>
                        )}
                        <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                          {String(c.region).includes('Azad Jammu') ? 'AJ&K' : c.region}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-purple-950/60 text-purple-300 border border-purple-800/40">
                          {c.sector}
                        </span>
                        <span
                          className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                            c.currentJudicialStatus === 'MONITORING_COMPLIANCE'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                          }`}
                        >
                          {c.currentJudicialStatus.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-white leading-snug">
                        {c.caseTitle}
                      </h3>

                      <div className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        <strong className="text-slate-400">Judicial Finding:</strong> {c.statutorySeparationNotice}
                      </div>

                      <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 flex-wrap">
                        <span><strong className="text-slate-500">Asset:</strong> {c.environmentalAsset}</span>
                        <span><strong className="text-slate-500">Court:</strong> {c.jurisdiction.split('(')[0].trim()}</span>
                        <span><strong className="text-slate-500">Districts:</strong> {c.districts.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                      <div className="text-left lg:text-right">
                        <div className="text-[10px] text-slate-400">Directives Tracked</div>
                        <div className="text-sm font-bold text-white">
                          {c.complianceDirectives.filter((d) => d.status === 'COMPLIED').length} / {c.complianceDirectives.length} Complied
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCase(c)}
                        className="px-3.5 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <span>Examine Dossier</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}

              {filteredCases.length === 0 && (
                <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-800">
                  <Scale className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-white">No litigations match your filter criteria</h4>
                  <p className="text-xs text-slate-400 mt-1">Try resetting region, sector, or search keywords.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 3: LATEST PROCEEDINGS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'proceedings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Judicial Proceedings Chronology</h3>
                <p className="text-xs text-slate-400">Continuous feed of hearings, interim orders, and verified compliance filings</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded-[4px] bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                {allProceedings.length} Logged Events
              </span>
            </div>

            <div className="relative border-l border-slate-800 ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-6">
              {allProceedings.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-slate-950 border-2 border-emerald-500 group-hover:scale-125 transition-transform" />

                  <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg hover:border-slate-700 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-emerald-400">{item.event.date}</span>
                        <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                          {item.event.eventType.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-slate-950 text-slate-400 border border-slate-800">
                          {String(item.region).includes('Azad Jammu') ? 'AJ&K' : item.region}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">{item.caseNumber}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-white mb-1">{item.event.title}</h4>
                    <div className="text-[11px] text-emerald-400/90 font-medium mb-2">
                      {item.caseTitle}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {item.event.summary}
                    </p>

                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                      <span><strong className="text-slate-500">Presiding Bench:</strong> {item.event.bench}</span>
                      <span><strong className="text-slate-500">Jurisdiction:</strong> {item.jurisdiction}</span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 4: REGIONAL & DISTRICT CASES */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'districts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Regional &amp; District Judicial Dossiers</h3>
                <p className="text-xs text-slate-400">Jurisdictional litigations, compliance performance, and municipal targets</p>
              </div>
            </div>

            <div className="space-y-6">
              {(Object.keys(REGIONAL_JUDICIAL_SUMMARIES) as KEWRegion[]).map((regKey) => {
                const regSummary = REGIONAL_JUDICIAL_SUMMARIES[regKey];
                const regionCases = ENVIRONMENTAL_CASES_DATA.filter((c) => c.region === regKey);
                const displayName = regKey === 'AJ&K' ? 'AJ&K' : regKey;

                return (
                  <Card key={regKey} className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-white">{displayName}</h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                            {regSummary.totalCases} {regSummary.totalCases === 1 ? 'Matter' : 'Matters'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Primary Judicial Benches: {regSummary.primaryCourts.join(' · ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">Directives Met</div>
                          <div className="text-sm font-bold text-emerald-400">
                            {regSummary.compliedDirectives} / {regSummary.totalDirectives} ({regSummary.complianceRate}%)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Regional Cases Listing Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                            <th className="py-2 px-3 font-semibold">Case No.</th>
                            <th className="py-2 px-3 font-semibold">Title &amp; Subject</th>
                            <th className="py-2 px-3 font-semibold">Districts</th>
                            <th className="py-2 px-3 font-semibold">Asset</th>
                            <th className="py-2 px-3 font-semibold">Directives</th>
                            <th className="py-2 px-3 font-semibold text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {regionCases.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                              <td className="py-2.5 px-3 font-mono text-emerald-400 whitespace-nowrap">
                                {c.caseNumber}
                              </td>
                              <td className="py-2.5 px-3">
                                <div className="font-medium text-white max-w-sm truncate">{c.caseTitle}</div>
                                <div className="text-[11px] text-slate-400">{c.sector}</div>
                              </td>
                              <td className="py-2.5 px-3 text-slate-300">
                                {c.districts.join(', ')}
                              </td>
                              <td className="py-2.5 px-3 text-slate-300 max-w-xs truncate">
                                {c.environmentalAsset}
                              </td>
                              <td className="py-2.5 px-3 font-mono text-slate-300">
                                {c.complianceDirectives.filter((d) => d.status === 'COMPLIED').length} / {c.complianceDirectives.length}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  onClick={() => setSelectedCase(c)}
                                  className="text-emerald-400 hover:text-emerald-300 font-medium text-xs cursor-pointer inline-flex items-center gap-1"
                                >
                                  <span>View</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 5: ENVIRONMENTAL SECTORS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'sectors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Environmental Sectoral Dossiers</h3>
                <p className="text-xs text-slate-400">Cross-cutting analysis linking judicial enforcement to environmental domains</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SECTORAL_JUDICIAL_SUMMARIES.map((sec) => {
                const sectorCases = ENVIRONMENTAL_CASES_DATA.filter((c) => c.sector === sec.sector);
                return (
                  <Card key={sec.sector} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">{sec.sector}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {sec.caseCount} Master {sec.caseCount === 1 ? 'Litigation' : 'Litigations'}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-amber-300 border border-slate-700">
                        {sec.compensationLeviedINR} Levied
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-[6px] border border-slate-800/80">
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase">Compliance Ratio</span>
                        <div className="font-semibold text-emerald-400">
                          {sec.compliedDirectives} of {sec.totalDirectives} ({Math.round((sec.compliedDirectives / sec.totalDirectives) * 100)}%)
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase">Active Regions</span>
                        <div className="font-semibold text-slate-300">
                          {[...new Set(sectorCases.map((c) => String(c.region).includes('Azad Jammu') ? 'AJ&K' : c.region))].join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-semibold text-slate-300">Key Precedents:</div>
                      {sectorCases.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => setSelectedCase(c)}
                          className="text-xs text-slate-400 hover:text-emerald-400 flex items-center justify-between cursor-pointer p-1.5 rounded hover:bg-slate-800/50 transition-colors"
                        >
                          <span className="truncate max-w-[280px]">{c.caseTitle}</span>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">{c.caseNumber}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 6: JUDICIAL GIS ATLAS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'gis-atlas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Judicial GIS Atlas &amp; Spatial Assets</h3>
                <p className="text-xs text-slate-400">Geographically referenced environmental assets under judicial decree</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                16 Verified Centroid Coordinates
              </span>
            </div>

            {/* Spatial Overview Map Banner */}
            <Card className="p-6 bg-slate-900/80 border-slate-800 rounded-lg">
              <div className="relative w-full h-64 sm:h-80 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual coordinate nodes */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-[6px] border border-slate-800 text-xs">
                      <span className="text-emerald-400 font-bold">Himalayan Judicial Coordinates</span>
                      <span className="text-slate-400 text-[10px] ml-2">Lat: 32.7°N – 35.9°N · Lng: 73.4°E – 78.7°E</span>
                    </div>
                    <div className="text-[10px] font-mono px-2 py-1 rounded-[4px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                      WGS-84 Calibrated
                    </div>
                  </div>

                  {/* Grid of Georeferenced Pins */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-auto">
                    {ENVIRONMENTAL_CASES_DATA.slice(0, 8).map((c) => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCase(c)}
                        className="p-2 rounded-[6px] bg-slate-900/90 border border-slate-800 hover:border-emerald-500 text-left transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                          <MapPin className="w-3 h-3 group-hover:scale-125 transition-transform" />
                          <span className="text-[10px] font-mono font-bold truncate">{c.lat.toFixed(2)}°N, {c.lng.toFixed(2)}°E</span>
                        </div>
                        <div className="text-xs font-semibold text-white truncate">{c.environmentalAsset.split('(')[0].trim()}</div>
                        <div className="text-[10px] text-slate-400 truncate">{String(c.region).includes('Azad Jammu') ? 'AJ&K' : c.region} · {c.districts[0]}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-slate-500 text-center">
                    Click any spatial node to inspect judicial decrees, green buffer boundaries, and enforcement telemetry.
                  </div>
                </div>
              </div>
            </Card>

            {/* Spatial Assets Directory Table */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
              <h4 className="text-sm font-semibold text-white mb-3">Geographic Asset Inventory</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2 px-3 font-semibold">Asset Name</th>
                      <th className="py-2 px-3 font-semibold">Region</th>
                      <th className="py-2 px-3 font-semibold">Districts</th>
                      <th className="py-2 px-3 font-semibold">Coordinates</th>
                      <th className="py-2 px-3 font-semibold">Primary Case</th>
                      <th className="py-2 px-3 font-semibold text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {ENVIRONMENTAL_CASES_DATA.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-white">
                          {c.environmentalAsset}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300">
                          {String(c.region).includes('Azad Jammu') ? 'AJ&K' : c.region}
                        </td>
                        <td className="py-2.5 px-3 text-slate-400">
                          {c.districts.join(', ')}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-emerald-400">
                          {c.lat.toFixed(4)}°N, {c.lng.toFixed(4)}°E
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 max-w-xs truncate">
                          {c.caseTitle}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => setSelectedCase(c)}
                            className="text-emerald-400 hover:text-emerald-300 text-xs font-medium cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Dossier</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 7: JUDGMENTS & ORDERS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'judgments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Court Orders &amp; Directives Archive</h3>
                <p className="text-xs text-slate-400">Verbatim judicial directions, statutory deadlines, and enforcement metrics</p>
              </div>
            </div>

            <div className="space-y-4">
              {ENVIRONMENTAL_CASES_DATA.map((c) => (
                <Card key={c.id} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-400">{c.caseNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                          {c.jurisdiction}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mt-1">{c.caseTitle}</h4>
                    </div>

                    <button
                      onClick={() => setSelectedCase(c)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                    >
                      <span>Full Chronology</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Directives Accordion/List */}
                  <div className="space-y-2.5">
                    {c.complianceDirectives.map((dir) => (
                      <div
                        key={dir.directionId}
                        className="p-3 rounded-[6px] bg-slate-950/70 border border-slate-800/80 space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                              {dir.directionId}
                            </span>
                            <span className="text-xs font-semibold text-white">{dir.responsibleAgency}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">
                              Deadline: <strong className="text-slate-200">{dir.statutoryDeadline}</strong>
                            </span>
                            <span
                              className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                                dir.status === 'COMPLIED'
                                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                  : dir.status === 'IN_PROGRESS'
                                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                                  : dir.status === 'OVERDUE'
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                                  : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                              }`}
                            >
                              {dir.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-200 font-medium leading-relaxed">
                          &ldquo;{dir.directionText}&rdquo;
                        </p>

                        <div className="text-[11px] text-slate-400 space-y-1 pt-1.5 border-t border-slate-800/60">
                          <div><strong className="text-slate-500">Verified Evidence:</strong> {dir.verifiedEvidence}</div>
                          <div><strong className="text-slate-500">Field Audit Notes:</strong> {dir.fieldAuditNotes}</div>
                          {dir.fineOrCompensation && (
                            <div className="text-amber-400 font-medium">
                              <strong>Penalty Imposed:</strong> {dir.fineOrCompensation}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 8: COMPLIANCE MONITORING & GOVERNMENT ACCOUNTABILITY REGISTER */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Government Environmental Accountability Register</h3>
                <p className="text-xs text-slate-400">
                  Department-wise audit of judicial orders: complied, delayed, or defaulted mandates
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded-[4px] bg-rose-950 text-rose-300 border border-rose-800/40">
                Quarterly Audited: 2026-Q1
              </span>
            </div>

            {/* Department Scorecard Table */}
            <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="py-2 px-3 font-semibold">Authority / Agency</th>
                      <th className="py-2 px-3 font-semibold">Jurisdiction &amp; Mandate</th>
                      <th className="py-2 px-3 font-semibold text-center">Total</th>
                      <th className="py-2 px-3 font-semibold text-center">Complied</th>
                      <th className="py-2 px-3 font-semibold text-center">In-Progress</th>
                      <th className="py-2 px-3 font-semibold text-center">Overdue</th>
                      <th className="py-2 px-3 font-semibold text-center">Default / Contempt</th>
                      <th className="py-2 px-3 font-semibold text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {AGENCY_ACCOUNTABILITY_REGISTER.map((agency) => (
                      <tr key={agency.acronym} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{agency.acronym}</span>
                            <span className="text-[10px] font-normal text-slate-400">({agency.agencyName})</span>
                          </div>
                          {agency.penaltiesImposedINR !== 'None' && agency.penaltiesImposedINR !== 'None (Regulatory Body)' && (
                            <div className="text-[10px] text-amber-400 mt-0.5">
                              Penalties: {agency.penaltiesImposedINR}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 max-w-xs">
                          <div className="text-slate-300">{agency.jurisdiction}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{agency.mandate}</div>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-semibold text-white">
                          {agency.totalDirections}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-emerald-400">
                          {agency.complied}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-blue-400">
                          {agency.inProgress}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-amber-400">
                          {agency.overdue}
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-rose-400 font-bold">
                          {agency.inDefault}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded-[4px] border ${
                              agency.complianceRatePercent >= 75
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40'
                                : agency.complianceRatePercent >= 65
                                ? 'bg-blue-950/80 text-blue-400 border-blue-800/40'
                                : 'bg-rose-950/80 text-rose-400 border-rose-800/40'
                            }`}
                          >
                            {agency.complianceRatePercent}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Default Reasons Analysis Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Primary Institutional Default Drivers</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2 rounded-[6px] bg-slate-950/60 border border-slate-800">
                    <strong className="text-white">Inter-Departmental Friction:</strong> Revenue, Forest, and Municipality demarcations conflict, stalling eviction of wetland encroachers at Hokersar and Wular.
                  </div>
                  <div className="p-2 rounded-[6px] bg-slate-950/60 border border-slate-800">
                    <strong className="text-white">Tender &amp; Procurement Cycles:</strong> Bio-digester retrofits and decentralized STPs delayed by repeated cancellation of municipal tenders.
                  </div>
                  <div className="p-2 rounded-[6px] bg-slate-950/60 border border-slate-800">
                    <strong className="text-white">Seasonal Weather Constraints:</strong> Extreme sub-zero winters in Ladakh and Gilgit halt civil masonry and geomembrane liner laying.
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-slate-900/80 border-slate-800 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Enforcement Triumphs</span>
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2 rounded-[6px] bg-slate-950/60 border border-slate-800">
                    <strong className="text-emerald-400">Brick Kiln Zig-Zag Conversion:</strong> 184 kilns transitioned in Budgam &amp; Pulwama under NGT oversight, reducing PM emissions by ~70%.
                  </div>
                  <div className="p-2 rounded-[6px] bg-slate-950/60 border border-slate-800">
                    <strong className="text-emerald-400">Poonch River Mahseer Protection:</strong> Total ban on mechanized excavator dredging in Ramsar site 2097; 35% rebound in juvenile fish counts.
                  </div>
                  <div className="p-2 rounded-[6px] bg-slate-950/60 border border-slate-800">
                    <strong className="text-emerald-400">Pahalgam &amp; Gulmarg MBR STPs:</strong> 100% of licensed hotels connected to modern membrane treatment plants; river water BOD normalized.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 9: COURTS & INSTITUTIONS */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'courts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Judicial Benches &amp; Oversight Authorities</h3>
                <p className="text-xs text-slate-400">Competent courts administering environmental jurisprudence across the five regions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: 'High Court of Jammu & Kashmir and Ladakh (Srinagar Wing)',
                  region: 'Kashmir Valley & Ladakh',
                  jurisdiction: 'Constitutional Writs (Article 226), PILs, Contempt Matters',
                  benches: 'Division Bench / Chief Justice Bench',
                  portal: 'https://jkhighcourt.nic.in'
                },
                {
                  name: 'High Court of Jammu & Kashmir and Ladakh (Jammu Wing)',
                  region: 'Jammu Division',
                  jurisdiction: 'Constitutional Writs, Riverbed Mining Injunctions, Tawi PILs',
                  benches: 'Division Bench Jammu',
                  portal: 'https://jkhighcourt.nic.in'
                },
                {
                  name: 'National Green Tribunal (Principal Bench, New Delhi)',
                  region: 'Universal Northern Zone',
                  jurisdiction: 'Original Applications under NGT Act 2010, Polluter Pays Restitution',
                  benches: 'Chairperson Bench (Justice A.K. Goel / Justice Prakash Shrivastava)',
                  portal: 'https://greentribunal.gov.in'
                },
                {
                  name: 'Azad Jammu & Kashmir High Court (Muzaffarabad / Mirpur)',
                  region: 'AJ&K',
                  jurisdiction: 'Writ Petitions under AJ&K Interim Constitution Act 1974, E-Flows',
                  benches: 'Chief Justice Bench & Circuit Benches',
                  portal: 'https://ajkhighcourt.gok.pk'
                },
                {
                  name: 'Azad Jammu & Kashmir Supreme Court',
                  region: 'AJ&K',
                  jurisdiction: 'Apex Appellate Authority on Constitutional & Environmental Rights',
                  benches: 'Full Bench AJ&K Supreme Court',
                  portal: 'https://ajkhighcourt.gok.pk'
                },
                {
                  name: 'Gilgit-Baltistan Chief Court',
                  region: 'Gilgit-Baltistan',
                  jurisdiction: 'Constitutional Petitions, Municipal Waste Mandates, Plastic Bans',
                  benches: 'Chief Judge Bench GB',
                  portal: 'https://chiefcourtgb.gov.pk'
                },
                {
                  name: 'Gilgit-Baltistan Supreme Appellate Court',
                  region: 'Gilgit-Baltistan',
                  jurisdiction: 'Apex Mega-Dam Reviews (Diamer Bhasha) & Forest Restitution',
                  benches: 'Chief Judge Supreme Appellate Court',
                  portal: 'https://chiefcourtgb.gov.pk'
                },
                {
                  name: 'Supreme Court of India',
                  region: 'All India Apex',
                  jurisdiction: 'Special Leave Petitions (Article 136) & Constitutional Precedents',
                  benches: 'Chief Justice of India / Green Benches',
                  portal: 'https://main.sci.gov.in'
                },
                {
                  name: 'Environmental Protection Tribunals',
                  region: 'Statutory Regional',
                  jurisdiction: 'Appeals from JKPCC, AJK-EPA, and GB-EPA consent rejections',
                  benches: 'Designated Judicial Members',
                  portal: 'https://jkspcb.nic.in'
                }
              ].map((court, i) => (
                <Card key={i} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800 text-emerald-400 border border-slate-700">
                      {court.region}
                    </span>
                    <Building className="w-4 h-4 text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{court.name}</h4>
                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-500">Jurisdiction:</strong> {court.jurisdiction}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-slate-500">Benches:</strong> {court.benches}
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href={court.portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TAB 10: LEGAL FRAMEWORK */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'legal-framework' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Statutory Environmental Framework</h3>
                <p className="text-xs text-slate-400">Legislative acts, statutory rules, and environmental rights underpinning court decrees</p>
              </div>
            </div>

            <div className="space-y-4">
              {ENVIRONMENTAL_LEGAL_STATUTES.map((statute) => (
                <Card key={statute.code} className="p-4 bg-slate-900/80 border-slate-800 rounded-lg space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">{statute.code}</span>
                      <h4 className="text-sm font-bold text-white">{statute.title}</h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 border border-slate-700">
                      Enacted: {statute.enactedYear}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed">
                    {statute.applicabilitySynopsis}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <div>
                      <strong className="text-slate-500">Relevant Sections:</strong>{' '}
                      <span className="text-slate-300">{statute.relevantSections.join(' · ')}</span>
                    </div>
                    <div>
                      <strong className="text-slate-500">Enforcing Bodies:</strong>{' '}
                      <span className="text-slate-300">{statute.enforcingBodies.join(', ')}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* TAB 11: RESEARCH & OPEN DATA */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeTab === 'research-open-data' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Research, Methodology &amp; Open Data</h3>
                <p className="text-xs text-slate-400">Download permissible judicial inventories for academic, legal, and investigative reporting</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Download className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white">Full Master Litigation Dataset (CSV)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Includes all {ENVIRONMENTAL_CASES_DATA.length} cases (1986–2026), case numbers, CNR references, affected districts, environmental assets, coordinates, and compliance directives.
                </p>
                <button
                  onClick={exportCasesCSV}
                  className="w-full py-2 px-3 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Master CSV ({ENVIRONMENTAL_CASES_DATA.length} Records)</span>
                </button>
              </Card>

              <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Database className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white">40-Yr Completeness Matrix (CSV)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Decadal court-by-year completeness audit (1986–2026), recovered case counts, and institutional governance notes for all 8 judicial bodies.
                </p>
                <button
                  onClick={exportCompletenessCSV}
                  className="w-full py-2 px-3 rounded-[6px] bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Matrix CSV</span>
                </button>
              </Card>

              <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-blue-400">
                  <FileSpreadsheet className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white">Complete Judicial Database (JSON)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full hierarchical schema containing detailed hearing chronologies, verbatim court directives, verified implementation evidence, and agency accountability notes.
                </p>
                <button
                  onClick={exportCasesJSON}
                  className="w-full py-2 px-3 rounded-[6px] bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Download Complete JSON Package</span>
                </button>
              </Card>
            </div>

            {/* Citation & Methodology Guide */}
            <Card className="p-5 bg-slate-900/80 border-slate-800 rounded-lg space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Academic &amp; Legal Citation Format</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Researchers and environmental litigators citing records from the Kashmir EcoWatch Environmental PIL Portal should use the following standardized format:
              </p>
              <div className="p-3 rounded-[6px] bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 select-all">
                Kashmir EcoWatch (2026). Environmental PIL Portal &amp; Judicial Inventory: Master Case Dossier [Case ID]. Srinagar: KEW Environmental Resources. Accessed {new Date().toLocaleDateString('en-GB')}. https://kew.org/resources/environmental-pil
              </div>
            </Card>
          </div>
        )}

        {/* DIVISION 2: LITIGATION PREPARATION, DRAFTING & JUSTICE SUPPORT MODULES */}
        {activeTab === 'file-pil' && <FilePilModule />}
        {activeTab === 'filing-checklist' && <FilingChecklistModule />}
        {activeTab === 'drafting-studio' && <DraftingStudioModule />}
        {activeTab === 'legal-aid' && <LegalAidModule />}
        {activeTab === 'funding' && <FundingCostsModule />}
        {activeTab === 'case-lifecycle' && <CaseLifecycleModule />}
        {activeTab === 'scientific-evidence' && <ScientificEvidenceModule />}

        {/* UNIVERSAL PERSISTENT CTA SECTION: PIL Filing, Drafting, Legal Resources & Litigation Funding */}
        <EnvironmentalLitigationSupportCTA onTabChange={handleTabChange} />
      </main>

      {/* ── 4. CASE DETAIL INSPECTION MODAL / DRAWER ─── */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <Card className="bg-slate-900 border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-[4px] border border-emerald-800/40">
                    {selectedCase.caseNumber}
                  </span>
                  {selectedCase.cnrNumber ? (
                    <span className="font-mono text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded-[4px] border border-slate-800">
                      CNR: {selectedCase.cnrNumber}
                    </span>
                  ) : (
                    <span className="text-xs text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-[4px] border border-amber-700/50">
                      Pending Official Court Registry Verification
                    </span>
                  )}
                  <span className="text-xs px-2.5 py-0.5 rounded-[4px] bg-slate-800 text-slate-200">
                    {String(selectedCase.region).includes('Azad Jammu') ? 'AJ&K' : selectedCase.region}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-[4px] bg-purple-950/60 text-purple-300 border border-purple-800/40">
                    {selectedCase.sector}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                  {selectedCase.caseTitle}
                </h3>
                <div className="text-xs text-slate-400">
                  {selectedCase.jurisdiction} · Filed: {selectedCase.filingYear}
                </div>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Core Issues & Findings */}
            <div className="space-y-3">
              <div className="p-3 rounded-[6px] bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Judicial Separation &amp; Finding Notice
                </span>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {selectedCase.statutorySeparationNotice}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-[6px] bg-slate-950/50 border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Petitioners</span>
                  <p className="text-slate-200 font-medium">{selectedCase.petitioners}</p>
                </div>
                <div className="p-3 rounded-[6px] bg-slate-950/50 border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Respondents</span>
                  <p className="text-slate-200 font-medium">{selectedCase.respondents}</p>
                </div>
              </div>
            </div>

            {/* Core Issues Listed */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Substantive Environmental Issues</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {selectedCase.coreIssues.map((issue, idx) => (
                  <li key={idx} className="leading-relaxed">{issue}</li>
                ))}
              </ul>
            </div>

            {/* Chronology of Events */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Judicial Chronology</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedCase.chronology.map((ev, i) => (
                  <div key={i} className="p-2.5 rounded-[6px] bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-emerald-400 font-bold">{ev.date}</span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-300 text-[10px]">
                        {ev.eventType}
                      </span>
                    </div>
                    <div className="font-semibold text-white">{ev.title}</div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{ev.summary}</p>
                    <div className="text-[10px] text-slate-500">Bench: {ev.bench}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Authenticated Court Orders & Primary Dockets */}
            {selectedCase.orderLinks && selectedCase.orderLinks.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Authenticated Court Orders &amp; Decrees ({selectedCase.orderLinks.length})
                  </h4>
                  <span className="text-[10px] text-slate-400">Direct primary court records</span>
                </div>
                <div className="space-y-2">
                  {selectedCase.orderLinks.map((ord, idx) => (
                    <div key={idx} className="p-3 rounded-[6px] bg-slate-950 border border-emerald-800/40 text-xs space-y-1.5">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-400 font-bold">{ord.date}</span>
                          <span className="px-2 py-0.5 rounded-[4px] bg-slate-800 text-slate-200 text-[10px] font-medium">
                            {ord.orderType}
                          </span>
                        </div>
                        <a
                          href={ord.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-[4px] bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
                        >
                          <span>Open Order</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="font-semibold text-white">{ord.title}</div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{ord.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Court-Recorded Quantitative Claims vs. Independent Verification */}
            {selectedCase.courtRecordedQuantitativeClaims && selectedCase.courtRecordedQuantitativeClaims.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-bold text-blue-400 tracking-wider flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    Court-Recorded Departmental Claims vs. Independent Audits ({selectedCase.courtRecordedQuantitativeClaims.length})
                  </h4>
                  <span className="text-[10px] text-slate-400">Evidence reconciliation matrix</span>
                </div>
                <div className="space-y-2">
                  {selectedCase.courtRecordedQuantitativeClaims.map((claim, idx) => (
                    <div key={idx} className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 text-xs space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Indicator:</span>
                          <div className="font-bold text-white text-xs">{claim.indicator}</div>
                        </div>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                            claim.independentVerificationStatus === 'CONFIRMED_BY_SATELLITE'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : claim.independentVerificationStatus === 'PARTIALLY_CORROBORATED'
                              ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                              : claim.independentVerificationStatus === 'DISPROVED_BY_FIELD_AUDIT'
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {claim.independentVerificationStatus.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-900/60 p-2 rounded-[4px] border border-slate-800/60">
                        <div>
                          <strong className="text-slate-400">Departmental Claim:</strong>
                          <p className="text-emerald-300 font-medium">{claim.reportedValue}</p>
                        </div>
                        <div>
                          <strong className="text-slate-400">Reporting Agency &amp; Date:</strong>
                          <p className="text-slate-300">{claim.reportingAgency} ({claim.orderDate})</p>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-300 leading-relaxed border-t border-slate-800/60 pt-1.5">
                        <strong className="text-slate-400">KEW Independent Audit:</strong> {claim.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance Directives */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Court Directives &amp; Verified Implementation ({selectedCase.complianceDirectives.length})
              </h4>
              <div className="space-y-2.5">
                {selectedCase.complianceDirectives.map((d) => (
                  <div key={d.directionId} className="p-3 rounded-[6px] bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="font-semibold text-emerald-400">{d.responsibleAgency}</span>
                      <span
                        className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-[4px] border ${
                          d.status === 'COMPLIED'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                        }`}
                      >
                        {d.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-slate-200 font-medium">&ldquo;{d.directionText}&rdquo;</p>
                    <div className="text-[11px] text-slate-400 space-y-0.5 pt-1 border-t border-slate-800/60">
                      <div><strong className="text-slate-500">Evidence:</strong> {d.verifiedEvidence}</div>
                      <div><strong className="text-slate-500">Field Audit:</strong> {d.fieldAuditNotes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-slate-500">
                Source: {selectedCase.sourceDocumentRef} (Audited: {selectedCase.lastVerifiedDate})
              </span>
              <div className="flex items-center gap-2">
                {selectedCase.crossModuleLink && (
                  <Link
                    href={selectedCase.crossModuleLink}
                    className="px-3 py-1.5 rounded-[6px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                  >
                    Open Linked KEW Module
                  </Link>
                )}
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-3 py-1.5 rounded-[6px] bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function EnvironmentalPilPortalPage() {
  return (
    <>
      {/* Complete SSR-indexed Judicial Docket Register for non-JS crawlers and archival verification */}
      <section className="sr-only" aria-label="Complete Environmental PIL Judicial Docket Inventory">
        <h2>Western Himalayan Environmental Public Interest Litigation (PIL) Judicial Docket ({ENVIRONMENTAL_CASES_DATA.length} Cases)</h2>
        <table>
          <thead>
            <tr>
              <th>Case Number</th>
              <th>Title</th>
              <th>Jurisdiction</th>
              <th>Region</th>
              <th>Environmental Asset</th>
              <th>Court Registry / CNR Status</th>
              <th>Judicial Status</th>
            </tr>
          </thead>
          <tbody>
            {ENVIRONMENTAL_CASES_DATA.map((c) => (
              <tr key={c.id}>
                <td>{c.caseNumber}</td>
                <td>{c.caseTitle}</td>
                <td>{c.jurisdiction}</td>
                <td>{c.region}</td>
                <td>{c.environmentalAsset}</td>
                <td>{c.cnrNumber || 'Pending Official Court Registry Verification'}</td>
                <td>{c.currentJudicialStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <EnvironmentalPilPortalContent />
    </>
  );
}
