'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Landmark, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Globe2, 
  Droplets, 
  Trees, 
  School, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Activity, 
  Printer,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Info,
  Check,
  Scale,
  Clock,
  Compass,
  FileCheck,
  X
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { 
  FUNDING_PATHWAYS, 
  CSR_PROGRAM_DOSSIERS, 
  CSR_PIPELINE_STAGES, 
  SCIENTIFIC_INDEPENDENCE_COVENANT,
  CsrProgramDossier 
} from '@/data/csr-collaborations';
import { submitToOperations } from '@/lib/operationsClient';

export default function CsrCollaborationsPage() {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('outdoor-classroom-grid');
  const [activePathwayTab, setActivePathwayTab] = useState<'indian-csr' | 'us-philanthropy' | 'scientific-grants'>('indian-csr');
  const [previewConceptProgram, setPreviewConceptProgram] = useState<CsrProgramDossier | null>(null);
  
  // Inquiry form state
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationCountry: 'India',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    fundingPathway: 'Indian Corporate CSR (MCA Schedule VII)',
    targetProgram: 'outdoor-classroom-grid',
    preferredScale: 'Tier A: 10-School Evidence Pilot',
    targetGeography: 'All 10 Kashmir Valley Districts',
    estimatedBudgetEnvelope: '₹4.50 Lakhs – ₹7.50 Lakhs ($5,400 – $9,000 USD)',
    implementationTimeline: 'Immediate FY 2026–2027 Cycle',
    acceptedScientificIndependence: false,
    specificObjectives: ''
  });

  const [inquiryResult, setInquiryResult] = useState<{
    submitted: boolean;
    referenceCode: string;
    timestamp: string;
  } | null>(null);

  const activeProgram = CSR_PROGRAM_DOSSIERS.find(p => p.id === selectedProgramId) || CSR_PROGRAM_DOSSIERS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedScientificIndependence) {
      alert('Please confirm adherence to the Kashmir EcoWatch Scientific Independence & Editorial Neutrality Covenant.');
      return;
    }

    const res = await submitToOperations({
      sourcePage: '/about/csr-collaborations',
      title: `CSR & Grant Proposal: ${formData.organizationName} (${formData.targetProgram})`,
      category: 'CSR & Grants',
      ownerName: formData.contactPerson,
      ownerEmail: formData.email,
      organization: formData.organizationName,
      district: formData.targetGeography || 'Kashmir Basin',
      details: `Program: ${formData.targetProgram} | Pathway: ${formData.fundingPathway} | Budget: ${formData.estimatedBudgetEnvelope} | Scale: ${formData.preferredScale} | Phone: ${formData.phone || 'N/A'} | Objectives: ${formData.specificObjectives || 'Environmental CSR deployment'}`,
      priority: 'HIGH',
    });

    const refCode = res.success ? res.trackingId : `KEW-CSR-2026-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setInquiryResult({
      submitted: true,
      referenceCode: refCode,
      timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  const downloadConceptNoteDocument = (program: CsrProgramDossier) => {
    const scalesRows = (program.scalableTiers || []).map(s => `
      <tr>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: bold;">${s.label}</td>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">${s.scopeUnits}</td>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-family: monospace; font-weight: bold; color: #059669;">${s.indicativeBudgetInr}</td>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-family: monospace;">${s.indicativeBudgetUsd}</td>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">${s.studentOrCommunityReach}</td>
      </tr>
    `).join('');

    const costsRows = (program.indicativeCostBreakdownPercent || []).map(c => `
      <tr>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: bold;">${c.category}</td>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1; font-family: monospace; font-weight: bold; color: #d97706;">${c.percentage}%</td>
        <td style="padding: 8px 12px; border: 1px solid #cbd5e1;">${c.description}</td>
      </tr>
    `).join('');

    const limitsItems = (program.technicalLimitsAndDisclosures || []).map(l => `<li style="margin-bottom: 6px;">${l}</li>`).join('');
    const permitsItems = (program.statutoryPermitsRequired || []).map(p => `<li style="margin-bottom: 6px;">${p}</li>`).join('');
    const deliverablesItems = (program.keyDeliverables || []).map(d => `<li style="margin-bottom: 6px;">${d}</li>`).join('');

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Kashmir EcoWatch - Concept Note - ${program.title}</title>
        <style>
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; margin: 30px; color: #0f172a; line-height: 1.5; font-size: 11pt; }
          .masthead { border-bottom: 3px solid #059669; padding-bottom: 12px; margin-bottom: 20px; }
          .agency-title { font-size: 11pt; font-weight: bold; color: #059669; text-transform: uppercase; letter-spacing: 1.5px; }
          .doc-ref { font-size: 9pt; color: #64748b; font-family: monospace; float: right; }
          h1 { color: #0f172a; font-size: 18pt; margin: 8px 0 4px 0; font-weight: bold; }
          .subtitle { font-size: 11pt; color: #475569; font-style: italic; margin-bottom: 12px; }
          .pill { display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; padding: 3px 8px; border-radius: 4px; font-size: 8.5pt; font-weight: bold; margin-right: 6px; }
          h2 { color: #065f46; font-size: 12pt; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #059669; padding-bottom: 4px; margin-top: 22px; }
          p { margin: 8px 0; }
          table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 9.5pt; }
          th { background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-weight: bold; color: #1e293b; }
          .info-box { background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px 16px; margin: 16px 0; font-size: 9.5pt; }
          .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #cbd5e1; font-size: 8.5pt; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="masthead">
          <span class="doc-ref">Ref: KEW-CN-2026-${program.id.toUpperCase()}</span>
          <div class="agency-title">Kashmir EcoWatch Environmental Intelligence Platform</div>
          <div style="font-size: 9pt; color: #475569;">Western Himalayan Ecological & Anthropogenic Monitoring Observatory</div>
          <h1>${program.title}</h1>
          <div class="subtitle">${program.summary}</div>
          <div>
            <span class="pill">MCA Schedule VII: ${program.statutoryScheduleVii}</span>
            <span class="pill">SEBI BRSR: ${program.sebiBrsrAlignment}</span>
          </div>
        </div>

        <h2>1. Western Himalayan Need & Problem Statement</h2>
        <p>${program.problemStatement}</p>

        <h2>2. Intervention & Operational Design</h2>
        <p>${program.interventionDesign}</p>

        <h2>3. Scalable Implementation Envelopes & Indicative Budgets</h2>
        <table>
          <thead>
            <tr>
              <th>Tier</th>
              <th>Deployment Scope</th>
              <th>Budget (INR)</th>
              <th>Budget (USD)</th>
              <th>Beneficiary / Student Reach</th>
            </tr>
          </thead>
          <tbody>
            ${scalesRows}
          </tbody>
        </table>
        <p style="font-size: 8.5pt; color: #64748b; font-style: italic;">Basis of Estimation: ${program.indicativeEnvelopes.basisOfEstimation}</p>

        <h2>4. Key Measurable Deliverables</h2>
        <ul>${deliverablesItems}</ul>

        <h2>5. Indicative Expenditure Breakdown (% Allocation)</h2>
        <table>
          <thead>
            <tr>
              <th>Cost Head</th>
              <th>Allocation</th>
              <th>Operational Activity & Audit Benchmark</th>
            </tr>
          </thead>
          <tbody>
            ${costsRows}
          </tbody>
        </table>

        <h2>6. Sensor Scope & Technical Limitations</h2>
        <ul>${limitsItems}</ul>

        <h2>7. Statutory Permits & Department Clearances</h2>
        <ul>${permitsItems}</ul>

        <h2>8. Statutory Recipient Framework & Governance</h2>
        <div class="info-box">
          <p><strong>Domestic Indian CSR Funding:</strong> Administered exclusively through accredited, vetted Indian non-profit implementing partners holding active MCA Form CSR-1 registration and Sections 12A/80G status.</p>
          <p><strong>International Diaspora & Philanthropic Grants:</strong> Administered under the 501(c)(3) public charity governance of the Dr. Kumar Foundation USA (Loudoun County, VA) and routed into India strictly via FCRA-registered banking accounts or prior permissions under MHA regulations.</p>
          <p><strong>Scientific Neutrality Covenant:</strong> Sponsoring entities possess zero editorial control over scientific observations, telemetry ingestion, threat assessments, or ecological alert levels.</p>
        </div>

        <div class="footer">
          Kashmir EcoWatch • Western Himalayan Environmental Secretariat • Inquiry Desk: contact@kashmir-ecowatch.com
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Kashmir-EcoWatch-Concept-Note-${program.id}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav, header, footer, .no-print, section:not(.print-active-concept) {
            display: none !important;
          }
          .print-active-concept {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
          }
          .printable-concept-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 16px !important;
          }
        }
      `}</style>
      
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <div className="no-print">
        <Heading 
        icon={<Building2 className="w-5 h-5 text-amber-400" />}
        label="Corporate Social Responsibility & Institutional Funding"
        title={
          <>
            <span className="flex flex-wrap items-center gap-3 leading-[1.12] pb-1 text-slate-100 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
              <span className="inline-flex items-center self-center bg-amber-500 text-slate-950 font-black uppercase tracking-wider rounded-md px-2.5 py-0.5 text-xs">
                CSR & GRANTS
              </span>
              <span className="break-words">CSR Collaborations & Institutional Funding</span>
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent mt-1 break-words">
              Evidence-Based Environmental Programs for Corporate and Institutional Partners
            </span>
          </>
        }
        subtitle="A transparent institutional collaboration framework connecting corporate sustainability commitments, philanthropic endowments, and competitive research grants with verifiable Western Himalayan ecological baselines."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Support KEW', href: '/about/support-sponsorship' },
          { label: 'CSR & Grants' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#flagship-programs"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-950/40"
            >
              <Award className="w-4 h-4" />
              <span>Explore 4 Flagship Programs</span>
            </a>
            <a
              href="#partnership-inquiry"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-xs transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Initiate Partnership Inquiry</span>
            </a>
          </div>
        }
      />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* ─── Institutional Governance & Legal Disclosures ──────────────────────── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-mono text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Statutory Compliance & Legal Recipient Architecture</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Three Distinct Funding & Governance Pathways
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-white/5">
                Indian MCA CSR-1 Partners
              </span>
              <span>•</span>
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-white/5">
                U.S. 501(c)(3) Oversight
              </span>
            </div>
          </div>

          {/* Legal Recipient Clarification Note */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Institutional Administration Model: Technical Core vs Financial Recipients</span>
            </div>
            <p className="leading-relaxed text-slate-300 break-words">
              Kashmir EcoWatch operates as an independent, open-access environmental intelligence platform and scientific technical advisory body. 
              To ensure rigorous statutory compliance across international borders:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                <strong className="text-white block mb-1">For Indian Corporate CSR & Domestic Grants:</strong>
                Funds are administered through accredited, vetted Indian non-profit implementing partners holding active 
                <strong> Form CSR-1 registration</strong> from the Ministry of Corporate Affairs, and <strong>12A/80G</strong> tax exemption certificates.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                <strong className="text-white block mb-1">For U.S. & International Diaspora Grants:</strong>
                Contributions are administered under the governance of the <strong>Dr. Kumar Foundation USA</strong> (Loudoun County, VA) under 501(c)(3) 
                public charity oversight, routed to India strictly via <strong>FCRA-registered accounts</strong> or project prior permissions.
              </div>
            </div>
          </div>

          {/* Pathway Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FUNDING_PATHWAYS.map((pw) => (
              <div 
                key={pw.id}
                className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-amber-500/30 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {pw.regulatoryJurisdiction}
                  </span>
                  <h3 className="text-base font-bold text-white break-words">
                    {pw.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 italic">
                    {pw.governingStatute}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed break-words pt-1">
                    {pw.recipientEligibility}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                  <div className="text-[11px] font-semibold text-slate-400">Compliance Safeguards:</div>
                  <ul className="space-y-1 text-[11px] text-slate-400">
                    {pw.compliancePrerequisites.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4 Flagship Environmental Programs ─────────────────────────────────── */}
        <section id="flagship-programs" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium">
                <Award className="w-3.5 h-3.5" />
                <span>Indicative Funding Envelopes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 break-words">
                Four Flagship Western Himalayan Environmental Programs
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Scientific problem statements, scalable tiers, itemized cost models, and statutory disclosures
              </p>
            </div>
          </div>

          {/* Program Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CSR_PROGRAM_DOSSIERS.map((prg) => {
              const isSelected = selectedProgramId === prg.id;
              return (
                <button
                  key={prg.id}
                  onClick={() => setSelectedProgramId(prg.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/30'
                      : 'bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-slate-800">
                      {prg.programCode}
                    </span>
                    <h3 className={`text-xs sm:text-sm font-bold leading-snug break-words ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {prg.title}
                    </h3>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-white/5 flex items-center justify-between">
                    <span>{prg.readinessState}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Program Dossier */}
          <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 sm:p-10 space-y-8 shadow-2xl">
            
            {/* Header Strip of Active Program */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    {activeProgram.readinessState}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400 font-mono">
                    Lead Domain: {activeProgram.leadScientificDomain}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white break-words">
                  {activeProgram.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                  {activeProgram.summary}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <a
                  href="#partnership-inquiry"
                  onClick={() => setFormData(prev => ({ ...prev, targetProgram: activeProgram.id }))}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  Initiate Due Diligence for this Program
                </a>
              </div>
            </div>

            {/* Scientific Problem vs Intervention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Scientific Problem Statement</span>
                </div>
                <p className="leading-relaxed text-slate-300 break-words">
                  {activeProgram.problemStatement}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Proposed Empirical Intervention</span>
                </div>
                <p className="leading-relaxed text-slate-300 break-words">
                  {activeProgram.interventionDesign}
                </p>
              </div>
            </div>

            {/* Scalable Tiers (Especially 10-School, 25-School, 100-School) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Scalable Implementation Options & Indicative Budgets</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Incremental Financing Pathways
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeProgram.scalableTiers.map((tier) => (
                  <div key={tier.id} className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="font-bold text-white text-xs break-words">{tier.label}</div>
                      <div className="text-[11px] text-emerald-400 font-mono font-semibold">{tier.indicativeBudgetInr}</div>
                      <div className="text-[10px] text-slate-500 font-mono">({tier.indicativeBudgetUsd})</div>
                      <div className="text-[11px] text-slate-300 font-medium">{tier.scopeUnits}</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed break-words">{tier.description}</p>
                    </div>

                    <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500 flex items-center justify-between">
                      <span>Timeline: {tier.targetTimeline}</span>
                      <span>Reach: {tier.studentOrCommunityReach.split('&')[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized Cost Breakdown Percentages */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs uppercase tracking-wider">
                  Indicative Cost Model Allocation (% Breakdown)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeProgram.indicativeEnvelopes.basisOfEstimation}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {activeProgram.indicativeCostBreakdownPercent.map((cost, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-slate-200 break-words">{cost.category}</span>
                      <span className="font-mono text-amber-400 font-bold ml-2 shrink-0">{cost.percentage}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug break-words">{cost.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Disclosures & Statutory Clearances */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Technical Sensor Scope & Scientific Disclosures</span>
                </div>
                <ul className="space-y-1.5 text-slate-400">
                  {activeProgram.technicalLimitsAndDisclosures.map((disc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span className="break-words leading-relaxed">{disc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Required Statutory Permits & Site Clearances</span>
                </div>
                <ul className="space-y-1.5 text-slate-400">
                  {activeProgram.statutoryPermitsRequired.map((perm, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="break-words leading-relaxed">{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Linked EcoWatch Scientific Modules & Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-2 text-slate-400">
                <span className="font-semibold text-slate-300 shrink-0">Integrated Platform Modules:</span>
                {activeProgram.linkedEcoWatchModules.map((mod, idx) => (
                  <Link 
                    key={idx} 
                    href={mod.route}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-emerald-300 border border-white/10 hover:border-emerald-500/30 text-xs font-medium transition-all"
                  >
                    <span>{mod.name}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-400/60" />
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => downloadConceptNoteDocument(activeProgram)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-semibold text-xs transition-all cursor-pointer hover:border-cyan-500/40"
                  title="Download offline Microsoft Word / Google Docs concept dossier"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download .doc</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewConceptProgram(activeProgram)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition-all cursor-pointer shadow-sm shadow-amber-950/20"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>View & Print PDF Concept Note</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ─── 8-Stage CSR Partnership & Due Diligence Pipeline ──────────────────── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-xs font-semibold">
              <Scale className="w-3.5 h-3.5" />
              <span>Standard Operational Workflow</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 8-Stage CSR & Grant Due Diligence Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              A structured lifecycle ensuring legal compliance, transparent procurement, and verified reporting at every milestone
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CSR_PIPELINE_STAGES.map((stg) => (
              <div key={stg.step} className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">Stage 0{stg.step}</span>
                    <span className="text-slate-500">{stg.leadParty}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug break-words">
                    {stg.stageName}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed break-words">
                    {stg.keyAction}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 text-[10px] text-emerald-400 font-mono break-words">
                  Deliverable: {stg.deliverable}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Scientific Neutrality & Editorial Independence Covenant ───────────── */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/20 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>{SCIENTIFIC_INDEPENDENCE_COVENANT.title}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            {SCIENTIFIC_INDEPENDENCE_COVENANT.principles.map((prin, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">§{idx+1}</span>
                  <span>{prin.split(':')[0]}</span>
                </div>
                <p className="text-slate-400 leading-relaxed break-words">
                  {prin.split(':')[1]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Institutional Partnership Inquiry Form ─────────────────────────────── */}
        <div id="inquiry-form" className="scroll-mt-24" />
        <section id="partnership-inquiry" className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 space-y-8 max-w-3xl mx-auto shadow-2xl scroll-mt-24">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold">
              <Mail className="w-3.5 h-3.5" />
              <span>Partnership Due Diligence Intake</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Initiate a CSR, Grant, or Funding Collaboration
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Submit your organization's preliminary scope. Our institutional partnerships team reviews legal eligibility, FCRA/CSR prerequisites, and issues a formal concept brief.
            </p>
          </div>

          {inquiryResult?.submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <div className="space-y-1">
                <div className="text-lg font-bold text-emerald-300">Inquiry Logged in Partnership Pipeline</div>
                <div className="text-xs text-slate-300">
                  Your unique reference tracking code is:
                </div>
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-950 font-mono text-base font-bold text-amber-400 border border-amber-500/30">
                  {inquiryResult.referenceCode}
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                Logged on {inquiryResult.timestamp}. An institutional liaison from Kashmir EcoWatch will initiate 
                Stage 02 Eligibility Screening and provide the itemized concept note and budget model.
              </p>
              <button
                onClick={() => setInquiryResult(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Foundation Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HDFC Parivartan / Wipro Earthian"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Country of Legal Registration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. India / United States / United Kingdom"
                    value={formData.organizationCountry}
                    onChange={(e) => setFormData({...formData, organizationCountry: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Authorized Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Designation / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Head of CSR & Sustainability"
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Official Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="csr@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone / WhatsApp Contact</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94190 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Funding Pathway</label>
                  <select
                    value={formData.fundingPathway}
                    onChange={(e) => setFormData({...formData, fundingPathway: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="Indian Corporate CSR (MCA Schedule VII)">Indian Corporate CSR (MCA Schedule VII)</option>
                    <option value="U.S. / Global 501(c)(3) Philanthropy">U.S. / Global 501(c)(3) Philanthropy</option>
                    <option value="Scientific Research Grant Agency (ANRF / MoEFCC)">Scientific Research Grant Agency (ANRF / MoEFCC)</option>
                    <option value="Multilateral Climate & Biodiversity Fund">Multilateral Climate & Biodiversity Fund</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Environmental Program</label>
                  <select
                    value={formData.targetProgram}
                    onChange={(e) => setFormData({...formData, targetProgram: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  >
                    {CSR_PROGRAM_DOSSIERS.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Implementation Scale</label>
                  <select
                    value={formData.preferredScale}
                    onChange={(e) => setFormData({...formData, preferredScale: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="Tier A: 10-School Evidence Pilot">Tier A: 10-School Evidence Pilot (₹4.5L – ₹7.5L)</option>
                    <option value="Tier B: 25-School District Cluster">Tier B: 25-School District Cluster (₹11.25L – ₹18.75L)</option>
                    <option value="Tier C: 100-School Regional Valley Grid">Tier C: 100-School Regional Valley Grid (₹45L – ₹75L)</option>
                    <option value="Springshed: 5-Spring Karst Pilot">Springshed: 5-Spring Karst Pilot (₹15L – ₹25L)</option>
                    <option value="Springshed: 25-Spring Cluster Network">Springshed: 25-Spring Cluster Network (₹60L – ₹1.2Cr)</option>
                    <option value="Ramsar Wetland: Single Wetland Pilot">Ramsar Wetland: Single Wetland Pilot (₹25L – ₹40L)</option>
                    <option value="Urban Chinar: 250-Tree Campus Pilot">Urban Chinar: 250-Tree Campus Pilot (₹12L – ₹18L)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Planned Budget Envelope</label>
                  <select
                    value={formData.estimatedBudgetEnvelope}
                    onChange={(e) => setFormData({...formData, estimatedBudgetEnvelope: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="₹4.50 Lakhs – ₹7.50 Lakhs ($5,400 – $9,000 USD)">₹4.50 Lakhs – ₹7.50 Lakhs ($5,400 – $9,000 USD)</option>
                    <option value="₹10.00 Lakhs – ₹25.00 Lakhs ($12,000 – $30,000 USD)">₹10.00 Lakhs – ₹25.00 Lakhs ($12,000 – $30,000 USD)</option>
                    <option value="₹25.00 Lakhs – ₹75.00 Lakhs ($30,000 – $90,000 USD)">₹25.00 Lakhs – ₹75.00 Lakhs ($30,000 – $90,000 USD)</option>
                    <option value="₹75.00 Lakhs – ₹1.50 Crore ($90,000 – $180,000 USD)">₹75.00 Lakhs – ₹1.50 Crore ($90,000 – $180,000 USD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Implementation Timeline & Target Districts</label>
                <input
                  type="text"
                  placeholder="e.g. FY 2026–27 Cycle • Priority focus on Srinagar and Baramulla"
                  value={formData.targetGeography}
                  onChange={(e) => setFormData({...formData, targetGeography: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Specific Collaboration Mandate & Objectives</label>
                <textarea
                  rows={3}
                  placeholder="Outline your company's CSR policy priorities, donor criteria, or technical collaboration goals..."
                  value={formData.specificObjectives}
                  onChange={(e) => setFormData({...formData, specificObjectives: e.target.value})}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Mandatory Scientific Neutrality Checkbox */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-[11px] space-y-2">
                <label className="flex items-start gap-2.5 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptedScientificIndependence}
                    onChange={(e) => setFormData({...formData, acceptedScientificIndependence: e.target.checked})}
                    className="mt-0.5 rounded text-amber-500 focus:ring-0"
                  />
                  <span className="leading-snug">
                    I acknowledge that Kashmir EcoWatch is an open, evidence-based scientific intelligence platform. 
                    Corporate CSR funding or grants provide support for equipment, logistics, and data infrastructure, 
                    and do not confer rights to alter, suppress, or influence scientific observations, threat indexes, or environmental alerts.
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                <div className="text-[11px] text-slate-400">
                  Partnership Inquiries: <strong className="text-slate-300">contact@kashmir-ecowatch.com</strong>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
                >
                  Submit Official Partnership Inquiry
                </button>
              </div>
            </form>
          )}
        </section>

      </div>

      {/* ─── Printable Concept Note Modal ────────────────────────────────────────── */}
      {previewConceptProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden print-active-concept">
            
            {/* Modal Control Bar (Screen only) */}
            <div className="no-print flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
                  PROJECT CONCEPT NOTE
                </span>
                <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                  KEW-CN-2026-{previewConceptProgram.id.toUpperCase().slice(0, 12)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadConceptNoteDocument(previewConceptProgram)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs transition-all cursor-pointer hover:border-cyan-500/40"
                  title="Download offline Microsoft Word / Google Docs concept dossier"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download .doc</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-emerald-950/40"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewConceptProgram(null)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body (Screen scrollable & A4 Print optimized) */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 printable-concept-card text-slate-100 print:text-slate-900 bg-slate-900 print:bg-white">
              {/* Document Masthead */}
              <div className="border-b-2 border-amber-500/60 pb-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono font-bold tracking-widest text-amber-400 print:text-amber-800 uppercase">
                    Kashmir EcoWatch Intelligence Platform
                  </span>
                  <span className="font-mono text-slate-400 print:text-slate-600 text-[11px]">
                    Doc Ref: KEW-CN-2026-{previewConceptProgram.id.toUpperCase()}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-slate-950">
                  {previewConceptProgram.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 italic">
                  {previewConceptProgram.summary}
                </p>
                <div className="flex flex-wrap gap-2 pt-2 text-[11px]">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 print:bg-emerald-100 text-emerald-300 print:text-emerald-900 font-mono">
                    MCA Schedule VII: {previewConceptProgram.statutoryScheduleVii}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 print:bg-cyan-100 text-cyan-300 print:text-cyan-900 font-mono">
                    SEBI BRSR: {previewConceptProgram.sebiBrsrAlignment}
                  </span>
                </div>
              </div>

              {/* 1. Problem Statement */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-amber-900 font-mono">
                  1. Western Himalayan Environmental Need & Problem Statement
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
                  {previewConceptProgram.problemStatement}
                </p>
              </div>

              {/* 2. Scalable Implementation Envelopes */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-amber-900 font-mono">
                  2. Scalable Implementation Envelopes & Indicative Budgets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {(previewConceptProgram.scalableTiers || []).map((s, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-white/10 print:border-slate-300 space-y-1">
                      <div className="font-bold text-white print:text-slate-950">{s.label}</div>
                      <div className="text-[11px] text-slate-400 print:text-slate-600 font-mono">{s.scopeUnits}</div>
                      <div className="text-xs font-mono font-bold text-amber-400 print:text-amber-700">{s.indicativeBudgetInr}</div>
                      <div className="text-[10px] text-slate-400 print:text-slate-500 font-mono">{s.indicativeBudgetUsd}</div>
                      <div className="text-[11px] text-slate-300 print:text-slate-700 pt-1 leading-tight">{s.studentOrCommunityReach}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Indicative Cost Breakdown */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-amber-900 font-mono">
                  3. Indicative Expenditure Breakdown (% Allocation)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {(previewConceptProgram.indicativeCostBreakdownPercent || []).map((c, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950/40 print:bg-slate-100 border border-white/5 print:border-slate-200">
                      <div className="flex justify-between font-bold">
                        <span className="text-white print:text-slate-900">{c.category}</span>
                        <span className="font-mono text-amber-400 print:text-amber-800">{c.percentage}%</span>
                      </div>
                      <p className="text-[10px] text-slate-400 print:text-slate-600 mt-0.5">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Technical Scope & Legal Recipient Framework */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/50 print:bg-slate-50 border border-white/10 print:border-slate-300 space-y-1.5">
                  <div className="font-bold text-cyan-300 print:text-cyan-800 uppercase tracking-wider font-mono text-[11px]">
                    Technical Scope & Sensor Limits
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300 print:text-slate-700">
                    {(previewConceptProgram.technicalLimitsAndDisclosures || []).map((lim, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-cyan-400 print:text-cyan-700 font-bold">•</span>
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/50 print:bg-slate-50 border border-white/10 print:border-slate-300 space-y-1.5">
                  <div className="font-bold text-amber-300 print:text-amber-800 uppercase tracking-wider font-mono text-[11px]">
                    Statutory Governance & Fund Routing
                  </div>
                  <p className="text-[11px] text-slate-300 print:text-slate-700 leading-relaxed">
                    <strong>Domestic Indian CSR:</strong> Administered via accredited implementing partners holding active MCA Form CSR-1 and 12A/80G status.
                  </p>
                  <p className="text-[11px] text-slate-300 print:text-slate-700 leading-relaxed">
                    <strong>International Philanthropy:</strong> Administered under Dr. Kumar Foundation USA 501(c)(3) governance and routed strictly to FCRA-registered Indian accounts.
                  </p>
                </div>
              </div>

              {/* Signoff / Inquiry Footer */}
              <div className="pt-4 border-t border-white/10 print:border-slate-300 flex flex-wrap items-center justify-between text-[11px] text-slate-400 print:text-slate-600">
                <div>
                  Kashmir EcoWatch Intelligence Platform • Western Himalayan Secretariat
                </div>
                <div>
                  Inquiry Desk: contact@kashmir-ecowatch.com
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* AdvanceFooter is rendered once globally by RootLayout */}
    </main>
  );
}
