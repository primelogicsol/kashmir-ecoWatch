'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Printer, 
  Sparkles, 
  School, 
  Calendar, 
  Compass, 
  FileCheck, 
  Edit3, 
  Share2, 
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  QrCode,
  Droplets,
  Trees,
  Mountain,
  Waves
} from 'lucide-react';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';

interface CertificateData {
  certId: string;
  studentName: string;
  studentToken: string;
  institutionName: string;
  district: string;
  tier: string;
  tierSubtitle: string;
  programTitle: string;
  fieldSite: string;
  fieldHours: number;
  issueDate: string;
  verificationHash: string;
  leadMentor: string;
  mentorTitle: string;
  directorName: string;
  directorTitle: string;
  competencies: string[];
}

const PRESET_CERTIFICATES: Record<string, CertificateData> = {
  'KEW-CERT-2026-F089': {
    certId: 'KEW-CERT-2026-F089',
    studentName: 'Faizan Ahmad Wani',
    studentToken: 'STU-SRI-042',
    institutionName: 'Delhi Public School, Srinagar',
    district: 'Srinagar',
    tier: 'Tier 1 • Foundation Field Naturalist',
    tierSubtitle: 'Middle School Field Science Distinction (Classes 6–8)',
    programTitle: 'Wetland Ecology, Waterbird Science & Limnological Diagnostics',
    fieldSite: 'Hokersar Wetland Reserve (Site Code: KEW-OD-WET-001)',
    fieldHours: 24,
    issueDate: 'October 28, 2026',
    verificationHash: '9a8b7c6d5e4f3a2b1c0e8d7c6b5a4f3e9a8b7c6d',
    leadMentor: 'Dr. Tariq Ahmad Mir',
    mentorTitle: 'Lecturer in Environmental Sciences, DPS Srinagar',
    directorName: 'Prof. Reyaz Ahmad Khan, Ph.D.',
    directorTitle: 'Scientific Director, Kashmir EcoWatch Field Observatory',
    competencies: [
      'Empirical Water Chemistry: Multiparameter measurement of water temperature, pH, Secchi disc transparency, and dissolved oxygen.',
      'Taxonomic Ornithology: Systematic count of resident and migratory waterfowl species using standardized optical line transects.',
      'Traditional Ecological Knowledge: Structured oral history documentation with local wetland elders on historic freeze cycles.',
      'Supervised GIS Ingestion: Geotagged observation logs verified and ingested into the open Kashmir EcoWatch spatial repository.'
    ]
  },
  'KEW-CERT-2026-I042': {
    certId: 'KEW-CERT-2026-I042',
    studentName: 'Zehra Fatima',
    studentToken: 'STU-BAR-017',
    institutionName: 'Govt. Girls Model Higher Secondary School, Baramulla',
    district: 'Baramulla',
    tier: 'Tier 2 • Junior Environmental Analyst',
    tierSubtitle: 'Secondary School Environmental Science Distinction (Classes 9–10)',
    programTitle: 'River Hydrology, Riparian Buffers & Karst Spring Science',
    fieldSite: 'Wular Lake & Lower Jhelum Confluence (Site Code: KEW-OD-LAK-002)',
    fieldHours: 36,
    issueDate: 'November 04, 2026',
    verificationHash: '7b6a5c4d3e2f1a0b9c8d7e6f5a4b3c2d7b6a5c4d',
    leadMentor: 'Prof. Reyaz Ahmad',
    mentorTitle: 'Senior Science Faculty, GGMHSS Baramulla',
    directorName: 'Prof. Reyaz Ahmad Khan, Ph.D.',
    directorTitle: 'Scientific Director, Kashmir EcoWatch Field Observatory',
    competencies: [
      'Instrumental Limnology: Handheld digital pen calibration and chemical oxygen demand sampling along riparian outfalls.',
      'Riparian Forestry Transects: Diameter at breast height (DBH) and basal canopy cover assessments of riparian willow groves.',
      'Hydrological Streamflow Logging: Current velocity profiling and spring discharge monitoring at karst emergence points.',
      'Statutory Law Analysis: Review of Wildlife Protection Act and Water Act provisions governing peripheral wetlands.'
    ]
  },
  'KEW-CERT-2026-A017': {
    certId: 'KEW-CERT-2026-A017',
    studentName: 'Muneeb Ul Haq',
    studentToken: 'STU-ANA-009',
    institutionName: 'Govt. Degree College (Boys), Khanabal, Anantnag',
    district: 'Anantnag',
    tier: 'Tier 3 • Advanced Western Himalayan Field Scholar',
    tierSubtitle: 'Higher Secondary & Undergraduate Research Distinction (Classes 11–12 / College)',
    programTitle: 'Western Himalayan Cryosphere, Glacial Streams & Forest Biomass',
    fieldSite: 'Overa-Aru Glacial Catchment & Lidder Watershed (Site Code: KEW-OD-MNT-005)',
    fieldHours: 48,
    issueDate: 'November 09, 2026',
    verificationHash: '5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f5c4d3e2f',
    leadMentor: 'Dr. Showkat Ahmad Wani',
    mentorTitle: 'Head, Dept of Botany & Environmental Science, GDC Khanabal',
    directorName: 'Prof. Reyaz Ahmad Khan, Ph.D.',
    directorTitle: 'Scientific Director, Kashmir EcoWatch Field Observatory',
    competencies: [
      'Glacial Stream Hydro-Chemistry: Sub-zero sampling, conductivity, and dissolved nutrient assays across altitude gradients.',
      'Subalpine Forest Plot Biomass: 100m² quadrat inventory of Cedrus deodara and Pinus wallichiana regeneration dynamics.',
      'Spatial Change Cross-Validation: Verification of satellite Landsat/Sentinel thermal anomaly rasters with ground-truth logs.',
      'Peer Scientific Contribution: Authorship of validated telemetry published in the annual Kashmir EcoWatch Open Data Monograph.'
    ]
  }
};

export default function CertificatesPage() {
  const [selectedKey, setSelectedKey] = useState<string>('KEW-CERT-2026-F089');
  const [cert, setCert] = useState<CertificateData>(PRESET_CERTIFICATES['KEW-CERT-2026-F089']);
  const [searchId, setSearchId] = useState('');
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const printAreaRef = useRef<HTMLDivElement>(null);

  const handleSelectPreset = (key: string) => {
    setSelectedKey(key);
    setCert(PRESET_CERTIFICATES[key]);
    setSearchMessage(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const foundKey = Object.keys(PRESET_CERTIFICATES).find(
      k => k.toUpperCase() === query || 
           PRESET_CERTIFICATES[k].studentToken.toUpperCase() === query ||
           PRESET_CERTIFICATES[k].studentName.toUpperCase().includes(query)
    );

    if (foundKey) {
      setSelectedKey(foundKey);
      setCert(PRESET_CERTIFICATES[foundKey]);
      setSearchMessage(`Verified credential found: ${foundKey}`);
    } else {
      setSearchMessage(`No registered credential matching "${searchId}". Showing current verified record.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* ─────────────────────────────────────────────────────────────────────────────
          PRINT-ONLY STYLESHEET (A4 LANDSCAPE PROFESSIONAL DIPLOMA FORMAT)
      ───────────────────────────────────────────────────────────────────────────── */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav, header, footer, .no-print, section:not(.print-container) {
            display: none !important;
          }
          .print-container {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 297mm !important;
            min-height: 210mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
          }
          .diploma-card {
            width: 297mm !important;
            height: 210mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Canonical Institutional Hero Section */}
      <div className="no-print">
        <Heading
          label="Cryptographic Competency Verification • Student Environmental Credentials"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Environmental Calendar', href: '/environmental-calendar' },
            { label: 'Outdoor Classroom', href: '/environmental-calendar/outdoor-classroom' },
            { label: 'Competency Certificates' }
          ]}
          icon={<Award className="w-6 h-6 text-amber-400" />}
          title={
            <div className="overflow-visible pb-2">
              <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
                <span className="inline-flex items-center self-center bg-amber-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                  OD-CERT
                </span>
                <span className="text-white">Western Himalayan</span>
              </div>
              <div className="leading-[1.15] overflow-visible pr-8">
                <span className="inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent pr-6 tracking-normal">
                  Field Science Competency Diploma
                </span>
              </div>
            </div>
          }
          subtitle="Verifiable scientific credentials issued by Kashmir EcoWatch in partnership with schools, colleges, and research institutes upon the completion of supervised field science transects."
          images={[
            '/images/protected-network.png',
            '/images/bear.png',
            '/images/markhor.png',
            '/images/tiger.png'
          ]}
        />
        <OutdoorClassroomNav />
      </div>

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10">
        
        {/* Controls Container */}
        <div className="space-y-4 max-w-4xl no-print">
          {/* Quick Actions & Mode Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/40 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Official PDF Diploma (A4 Landscape)</span>
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-white/10"
            >
              <Edit3 className="w-4 h-4 text-amber-400" />
              <span>{isEditing ? 'Close Customizer' : 'Customize Student Name & Details'}</span>
            </button>
          </div>
        </div>

        {/* Verification Lookup & Preset Selector (Hidden in Print) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 no-print">
          
          {/* Lookup Input */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Instant Certificate Verification Lookup</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">SHA-256 Ledger</span>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Certificate ID: KEW-CERT-2026-F089 or Student Token..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
              >
                Verify
              </button>
            </form>

            {searchMessage && (
              <div className="text-xs text-amber-300 font-mono flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{searchMessage}</span>
              </div>
            )}
          </div>

          {/* Preset Selector */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2.5">
            <span className="text-xs font-bold text-slate-300 block">Sample Accredited Tiers:</span>
            <div className="space-y-1.5">
              {Object.entries(PRESET_CERTIFICATES).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => handleSelectPreset(key)}
                  className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                    selectedKey === key
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold'
                      : 'bg-slate-950/60 border border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="break-words leading-tight">{item.studentName} ({item.tier.split('•')[1]?.trim() || item.tier})</span>
                  <span className="font-mono text-[10px] text-slate-500 shrink-0">{key.slice(-4)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live In-Browser Customizer (Hidden in Print) */}
        {isEditing && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-4 no-print shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <span>Customize Recipient & Academic Affiliation</span>
                </h3>
                <p className="text-xs text-slate-400">Update fields below to see real-time updates rendered on the diploma canvas.</p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={cert.studentName}
                  onChange={(e) => setCert({...cert, studentName: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Student Token (PII Anonymized)</label>
                <input
                  type="text"
                  value={cert.studentToken}
                  onChange={(e) => setCert({...cert, studentToken: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">School / College Name</label>
                <input
                  type="text"
                  value={cert.institutionName}
                  onChange={(e) => setCert({...cert, institutionName: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">District</label>
                <input
                  type="text"
                  value={cert.district}
                  onChange={(e) => setCert({...cert, district: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Supervising Faculty Mentor</label>
                <input
                  type="text"
                  value={cert.leadMentor}
                  onChange={(e) => setCert({...cert, leadMentor: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Supervised Field Hours</label>
                <input
                  type="number"
                  value={cert.fieldHours}
                  onChange={(e) => setCert({...cert, fieldHours: parseInt(e.target.value) || 24})}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────────────────
            THE OFFICIAL HIGH-RESOLUTION A4 LANDSCAPE DIPLOMA CANVAS
            Renders cleanly on screen with drop shadow; in print, fills exact A4 landscape
        ───────────────────────────────────────────────────────────────────────────── */}
        <div className="print-container flex justify-center w-full overflow-x-auto py-4">
          <div 
            ref={printAreaRef}
            id="printable-certificate"
            className="diploma-card relative w-full max-w-[1020px] aspect-[1.414/1] bg-[#fffdf7] text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm border-[10px] border-[#064e3b] overflow-hidden select-none flex flex-col justify-between"
            style={{
              backgroundImage: 'radial-gradient(#e5e1d5 0.75px, transparent 0.75px)',
              backgroundSize: '24px 24px',
              fontFamily: '"Georgia", "Cambria", "Times New Roman", serif'
            }}
          >
            {/* Inner Gold Filigree Inset Border */}
            <div className="absolute inset-3 sm:inset-4 border-2 border-[#b45309] pointer-events-none" />
            <div className="absolute inset-4 sm:inset-5 border border-[#d97706]/60 pointer-events-none" />

            {/* Corner Rosette Ornaments (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#064e3b] pointer-events-none" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#064e3b] pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#064e3b] pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#064e3b] pointer-events-none" />

            {/* Watermark Crest Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
              <svg className="w-[450px] h-[450px]" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 15 L120 70 L180 75 L135 115 L150 175 L100 140 L50 175 L65 115 L20 75 L80 70 Z" />
              </svg>
            </div>

            {/* 1. TOP HEADER & INSTITUTIONAL SEALS */}
            <div className="relative z-10 text-center space-y-1.5 border-b border-[#b45309]/30 pb-4">
              <div className="flex items-center justify-between px-2 sm:px-6">
                
                {/* Left Seal / Crest */}
                <div className="text-left flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-[#064e3b] p-1 flex items-center justify-center bg-white shadow-sm">
                    <Trees className="w-7 h-7 text-[#064e3b]" />
                  </div>
                  <div className="hidden sm:block text-[9px] font-sans uppercase tracking-widest text-[#064e3b] font-bold leading-tight">
                    Himalayan Ecological<br />Observatory Council
                  </div>
                </div>

                {/* Center Title Arch */}
                <div className="space-y-0.5">
                  <div className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#064e3b]">
                    Jammu & Kashmir Environmental Education Initiative
                  </div>
                  <div className="text-lg sm:text-2xl font-black tracking-wider uppercase text-[#064e3b] font-serif">
                    Kashmir EcoWatch
                  </div>
                  <div className="text-[9px] sm:text-[11px] font-sans font-medium tracking-widest uppercase text-[#b45309]">
                    Western Himalayan Outdoor Classroom (OD) Framework
                  </div>
                </div>

                {/* Right Seal / Crest */}
                <div className="text-right flex items-center gap-2 justify-end">
                  <div className="hidden sm:block text-[9px] font-sans uppercase tracking-widest text-[#064e3b] font-bold leading-tight">
                    Open Science<br />Attribution Ledger
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-[#b45309] p-1 flex items-center justify-center bg-white shadow-sm">
                    <Mountain className="w-7 h-7 text-[#b45309]" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DIPLOMA CORE TITLE & CONFERMENT STATEMENT */}
            <div className="relative z-10 text-center space-y-3 my-2 sm:my-3">
              <div className="inline-block px-4 py-1 rounded-sm bg-gradient-to-r from-transparent via-[#b45309]/10 to-transparent">
                <span className="text-xs sm:text-sm font-sans uppercase font-bold tracking-[0.2em] text-[#92400e]">
                  Certificate of Scientific Merit & Field Competency
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 italic">
                This is to formally certify that student researcher
              </div>

              {/* Student Name */}
              <div className="py-1">
                <div className="text-2xl sm:text-4xl font-bold text-[#064e3b] font-serif tracking-wide border-b-2 border-[#b45309]/40 inline-block px-8 pb-1">
                  {cert.studentName}
                </div>
                <div className="text-[11px] sm:text-xs font-mono font-semibold text-slate-600 mt-1">
                  Institutional Identification Token: <span className="text-[#064e3b] font-bold">{cert.studentToken}</span>
                </div>
              </div>

              {/* Institution Affiliation */}
              <div className="text-xs sm:text-sm text-slate-700 font-medium">
                Representing <strong className="text-[#064e3b]">{cert.institutionName}</strong> ({cert.district} District, Jammu & Kashmir)
              </div>

              {/* Distinction Awarded Ribbon */}
              <div className="pt-1">
                <div className="inline-block bg-[#064e3b] text-white px-6 py-1.5 rounded-sm shadow-sm border border-[#d97706]">
                  <span className="text-xs sm:text-sm font-sans font-black tracking-widest uppercase">
                    {cert.tier}
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-sans tracking-wide mt-1">
                  {cert.tierSubtitle}
                </div>
              </div>

              {/* Program & Ecosystem Laboratory */}
              <div className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed pt-1">
                Having successfully completed <strong className="text-[#064e3b]">{cert.fieldHours} hours</strong> of rigorous empirical field observations 
                and diagnostic laboratory analyses under the specialized curriculum:
                <div className="font-bold text-[#064e3b] text-sm sm:text-base pt-0.5">
                  "{cert.programTitle}"
                </div>
                <div className="text-[11px] sm:text-xs text-slate-600 font-sans mt-0.5">
                  Ecosystem Field Station: <strong>{cert.fieldSite}</strong>
                </div>
              </div>
            </div>

            {/* 3. FOUR VERIFIED FIELD COMPETENCIES */}
            <div className="relative z-10 my-2 px-2 sm:px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-slate-800 bg-[#f7f5ed] p-3 rounded border border-[#e5e1d5]">
                {cert.competencies.map((comp, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#064e3b] shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. DUAL ENDORSEMENT SIGNATURES & OFFICIAL GOLD EMBOSSED SEAL */}
            <div className="relative z-10 pt-3 border-t border-[#b45309]/30 flex items-end justify-between px-2 sm:px-8 text-center">
              
              {/* Left Signature: Lead Faculty Mentor */}
              <div className="space-y-1 w-48 text-left sm:text-center">
                <div className="h-9 flex items-center justify-center">
                  <svg className="w-32 h-8 text-[#064e3b]" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 40 Q 40 10, 70 35 T 130 30 T 190 20 M30 50 Q 80 40, 150 45" />
                  </svg>
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold text-xs text-[#064e3b]">
                  {cert.leadMentor}
                </div>
                <div className="text-[9px] text-slate-500 font-sans leading-tight">
                  {cert.mentorTitle}
                </div>
              </div>

              {/* Center: Official Embossed Gold Medal Seal */}
              <div className="relative flex flex-col items-center">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#92400e] via-[#f59e0b] to-[#d97706] p-1 shadow-md border-2 border-[#fffdf7] flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-[#fef3c7] flex flex-col items-center justify-center text-center p-1 bg-gradient-to-b from-[#f59e0b] to-[#b45309] text-white">
                    <Sparkles className="w-4 h-4 text-yellow-200" />
                    <span className="text-[7px] font-sans font-black tracking-tighter uppercase leading-none pt-0.5">
                      Kashmir EcoWatch
                    </span>
                    <span className="text-[6px] font-mono tracking-widest text-yellow-100 uppercase">
                      Merit Seal
                    </span>
                    <span className="text-[8px] font-black font-sans text-yellow-200">2026</span>
                  </div>
                </div>
                {/* Ribbon Tails */}
                <div className="flex gap-1 -mt-1 pointer-events-none">
                  <div className="w-3 h-5 bg-[#064e3b] border-t border-[#b45309] shadow-sm transform -rotate-6" />
                  <div className="w-3 h-5 bg-[#b45309] border-t border-[#064e3b] shadow-sm transform rotate-6" />
                </div>
              </div>

              {/* Right Signature: Scientific Director */}
              <div className="space-y-1 w-48 text-right sm:text-center">
                <div className="h-9 flex items-center justify-center">
                  <svg className="w-32 h-8 text-[#064e3b]" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 30 Q 50 50, 90 20 T 150 40 T 185 25 M60 20 L 70 55" />
                  </svg>
                </div>
                <div className="border-t border-slate-400 pt-1 font-bold text-xs text-[#064e3b]">
                  {cert.directorName}
                </div>
                <div className="text-[9px] text-slate-500 font-sans leading-tight">
                  {cert.directorTitle}
                </div>
              </div>

            </div>

            {/* 5. FOOTER CRYPTOGRAPHIC VALIDATION STRIP */}
            <div className="relative z-10 pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-1 text-[9px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span>Credential ID: <strong className="text-[#064e3b] font-bold">{cert.certId}</strong></span>
                <span>•</span>
                <span>Date: <strong>{cert.issueDate}</strong></span>
              </div>

              <div className="break-all text-slate-400 text-[8px]">
                SHA-256: {cert.verificationHash}
              </div>

              <div className="text-right text-[#064e3b] font-sans font-semibold">
                kashmir-ecowatch.com/verify
              </div>
            </div>

          </div>
        </div>

        {/* Verification Guarantee & Framework Notice (Hidden in Print) */}
        <section className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 space-y-4 no-print">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Institutional Credential Validity & Academic Acceptance
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
              <div className="font-semibold text-amber-300">1. Permanent Cryptographic Ledger</div>
              <p className="text-slate-400 leading-relaxed">
                Every certificate is permanently recorded in the Kashmir EcoWatch public science repository with a unique SHA-256 fingerprint, preventing fraudulent alterations.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
              <div className="font-semibold text-emerald-300">2. JKBOSE & Higher Ed Portfolios</div>
              <p className="text-slate-400 leading-relaxed">
                Recognized for student science portfolios, college admissions, environmental science practical assessments, and National Green Corps (NGC) Eco-Club honors.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5">
              <div className="font-semibold text-cyan-300">3. 100% Free Public Utility</div>
              <p className="text-slate-400 leading-relaxed">
                Certification is provided completely free of cost to all government schools, private institutions, degree colleges, and university departments across Jammu & Kashmir.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
