'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { SectoralEiaNav } from '@/components/sectoral-eia/SectoralEiaNav';
import { 
  PlusCircle, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Database, 
  GitBranch, 
  BarChart3, 
  Network, 
  TrendingUp, 
  CheckCircle2, 
  Award,
  ArrowRight,
  ArrowLeft,
  Building2,
  FileCheck,
  Compass,
  TreePine,
  Hammer,
  Wheat,
  Info
} from 'lucide-react';
import { SectorType } from '@/types/sectoral-eia';

export default function NewAssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [submissionType, setSubmissionType] = useState<'independent_scientific' | 'stakeholder_submitted'>('stakeholder_submitted');
  const [sector, setSector] = useState<SectorType>('tourism');
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState('Srinagar');
  const [watershed, setWatershed] = useState('Upper Jhelum (Dal Basin)');
  const [baselineYear, setBaselineYear] = useState('2000');
  const [submittingEntity, setSubmittingEntity] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [keyActivity, setKeyActivity] = useState('');
  const [mitigationAction, setMitigationAction] = useState('');

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 9));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24 text-slate-100">
      <Heading
        label="Sectoral EIA Engine • Assessment Submission Portal"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sectoral EIA', href: '/sectoral-eia' },
          { label: 'Submit Assessment' }
        ]}
        icon={<PlusCircle className="w-6 h-6 text-emerald-400" />}
        title={
          <span className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Initiate Sectoral Environmental Impact Assessment
          </span>
        }
        subtitle="Standardized 9-step intake workflow for independent researchers, hotel associations, artisan guilds, agricultural cooperatives, and government departments."
      />

      <SectoralEiaNav />

      <div className="container mx-auto px-4 mt-8 max-w-4xl">
        {isSubmitted ? (
          <Card className="p-8 bg-slate-900 border-emerald-500/50 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Assessment Ingestion Registered</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Your assessment record for <span className="text-emerald-400 font-semibold">{title || 'Selected Landscape'}</span> has been successfully provisioned in the Kashmir EcoWatch SEIAE Shared Assessment Database under temporary code:
            </p>
            <div className="inline-block p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono text-base font-bold">
              KEW-SEIA-2026-REG-{Math.floor(1000 + Math.random() * 9000)}
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our multidisciplinary scientific review panel will audit your spatial boundaries, baseline references, and indicator telemetry within 5 working days.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link href="/sectoral-eia">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
                  Return to SEIAE Hub
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => { setIsSubmitted(false); setCurrentStep(1); }}
                className="border-white/20 text-white text-xs"
              >
                Register Another Assessment
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-emerald-400">Step {currentStep} of 9: Workflow Ingestion</span>
                <span>{Math.round((currentStep / 9) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${(currentStep / 9) * 100}%` }}
                />
              </div>
            </div>

            {/* Ingestion Wizard Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-6">
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 01</span>
                    <h3 className="text-xl font-bold text-white mt-1">Sector Registration & Spatial Boundary</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Define the economic sector, geography, operating entity, and assessment boundary.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Ingestion Track (Dual-Model Pathway)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSubmissionType('stakeholder_submitted')}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            submissionType === 'stakeholder_submitted'
                              ? 'bg-emerald-950/60 border-emerald-500 text-white'
                              : 'bg-slate-950 border-white/10 text-slate-400'
                          }`}
                        >
                          <span className="font-bold block text-white">Enterprise / Department Submission</span>
                          <span className="text-[11px] text-slate-400">Hotels, artisan guilds, farmer collectives, municipal bodies</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSubmissionType('independent_scientific')}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            submissionType === 'independent_scientific'
                              ? 'bg-emerald-950/60 border-emerald-500 text-white'
                              : 'bg-slate-950 border-white/10 text-slate-400'
                          }`}
                        >
                          <span className="font-bold block text-white">Independent Scientific Panel</span>
                          <span className="text-[11px] text-slate-400">Autonomous university or EcoWatch research working group</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Target Economic Sector
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'tourism', label: 'Tourism', icon: Compass },
                          { id: 'horticulture', label: 'Horticulture', icon: TreePine },
                          { id: 'handicrafts', label: 'Handicrafts', icon: Hammer },
                          { id: 'agriculture', label: 'Agriculture', icon: Wheat },
                        ].map((s) => {
                          const Icon = s.icon;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => setSector(s.id as SectorType)}
                              className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                                sector === s.id
                                  ? 'bg-emerald-600 text-white border-emerald-400'
                                  : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span>{s.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Assessment Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Lidder Catchment Upper Reach Tourism Carrying Capacity EIA"
                        required
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Primary District
                        </label>
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                        >
                          <option>Srinagar</option>
                          <option>Baramulla</option>
                          <option>Shopian</option>
                          <option>Kulgam</option>
                          <option>Anantnag</option>
                          <option>Bandipora</option>
                          <option>Ganderbal</option>
                          <option>Pulwama</option>
                          <option>Budgam</option>
                          <option>Kupwara</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Watershed / Landscape Catchment
                        </label>
                        <input
                          type="text"
                          value={watershed}
                          onChange={(e) => setWatershed(e.target.value)}
                          placeholder="e.g. Upper Jhelum Basin / Lidder Corridor"
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Submitting Entity / Organization
                        </label>
                        <input
                          type="text"
                          value={submittingEntity}
                          onChange={(e) => setSubmittingEntity(e.target.value)}
                          placeholder="e.g. Pahalgam Hoteliers Guild"
                          required
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Contact / Official Email
                        </label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="e.g. contact@entity.org"
                          required
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 02</span>
                    <h3 className="text-xl font-bold text-white mt-1">Environmental Screening & Regulatory Boundary</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Identify applicable regulatory triggers and verify that the assessment aligns with SEA principles.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200">
                    <span className="font-bold text-white block mb-1">Mandatory Regulatory Check:</span>
                    Confirm that this submission does <span className="underline font-bold">not</span> claim statutory Environmental Clearance under India’s EIA Notification 2006. It will be peer-reviewed strictly under Kashmir EcoWatch&apos;s Strategic Environmental Assessment (SEA) guidelines.
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input type="checkbox" defaultChecked required className="rounded bg-slate-950 border-white/20 text-emerald-500" />
                      <span>Water (Prevention & Control of Pollution) Act 1974 screening completed</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input type="checkbox" defaultChecked required className="rounded bg-slate-950 border-white/20 text-emerald-500" />
                      <span>Solid Waste Management Rules 2016 verified</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input type="checkbox" defaultChecked required className="rounded bg-slate-950 border-white/20 text-emerald-500" />
                      <span>Wildlife Protection Act & Eco-Sensitive Zone (ESZ) proximity analyzed</span>
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 03</span>
                    <h3 className="text-xl font-bold text-white mt-1">Baseline Intelligence Retrieval</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Select baseline year and connect historical reference state.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Baseline Reference Year
                      </label>
                      <input
                        type="text"
                        value={baselineYear}
                        onChange={(e) => setBaselineYear(e.target.value)}
                        placeholder="e.g. 1995 or 2005"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        EcoWatch Telemetry Data Stream
                      </label>
                      <select className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none">
                        <option>EcoWatch Sentinel-2 Multispectral Archive</option>
                        <option>Jhelum Hydrological Gauge Telemetry</option>
                        <option>Regional Air & Water Sensor Network</option>
                        <option>University / SKUAST Ecological Census</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Baseline Ecological State Summary
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the historical reference state before intensive commercial stress..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 04</span>
                    <h3 className="text-xl font-bold text-white mt-1">Impact Identification & Causal Pathways</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Establish causal links between economic activities and ecological receptors.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary Economic Activity
                    </label>
                    <input
                      type="text"
                      value={keyActivity}
                      onChange={(e) => setKeyActivity(e.target.value)}
                      placeholder="e.g. High-density apple orchard fungicide spraying / Houseboat stays"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Environmental Receptor
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Village drinking springs / Benthic trout habitat"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Estimated Impact Severity
                      </label>
                      <select className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none">
                        <option>Low</option>
                        <option>Moderate</option>
                        <option>Severe</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 05</span>
                    <h3 className="text-xl font-bold text-white mt-1">Impact Quantification & Indicator Inputs</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Input quantitative telemetry or sample records for weighted indicator scoring.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/5 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block">Indicator:</span>
                        <span className="font-bold text-white">Carrying Capacity Ratio</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Baseline Value:</span>
                        <input type="number" step="0.1" defaultValue="0.8" className="w-full px-2 py-1 bg-slate-900 border border-white/10 rounded text-white" />
                      </div>
                      <div>
                        <span className="text-slate-400 block">Current Measured:</span>
                        <input type="number" step="0.1" defaultValue="1.9" className="w-full px-2 py-1 bg-slate-900 border border-white/10 rounded text-white" />
                      </div>
                      <div>
                        <span className="text-slate-400 block">Regulatory Cap:</span>
                        <input type="number" step="0.1" defaultValue="1.0" className="w-full px-2 py-1 bg-slate-900 border border-white/10 rounded text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 06</span>
                    <h3 className="text-xl font-bold text-white mt-1">Cumulative Impact Modeling</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Identify converging pressures from other economic sectors sharing this watershed.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2 text-xs">
                    <span className="font-bold text-white block">Cross-Sector Convergence Hotspots:</span>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" defaultChecked className="rounded bg-slate-900 text-emerald-500" />
                      <span>Tourism + Handicrafts (Urban Lagoon Effluents)</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" defaultChecked className="rounded bg-slate-900 text-emerald-500" />
                      <span>Horticulture + Agriculture (Synergistic Agrochemical Leaching)</span>
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 07</span>
                    <h3 className="text-xl font-bold text-white mt-1">Scenario Intelligence & Time Horizons</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Project future trends under Business-as-Usual vs Adaptive Mitigation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                      <span className="font-bold text-amber-400 block mb-1">Horizon 2030 (BAU)</span>
                      <p className="text-slate-400">Assumes current 8% growth rate without carrying-capacity caps.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                      <span className="font-bold text-emerald-400 block mb-1">Horizon 2030 (Adaptive)</span>
                      <p className="text-slate-400">Assumes zero-discharge tech and 100m spring protection buffers.</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 8 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 08</span>
                    <h3 className="text-xl font-bold text-white mt-1">Mitigation & Adaptation Hierarchy</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Specify verified mitigation actions following Avoidance &rarr; Reduction &rarr; Restoration &rarr; Adaptation.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary Proposed Mitigation Action
                    </label>
                    <input
                      type="text"
                      value={mitigationAction}
                      onChange={(e) => setMitigationAction(e.target.value)}
                      placeholder="e.g. Installation of decentralized vacuum bio-digesters / 100m pesticide buffer"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Hierarchy Level</label>
                      <select className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none">
                        <option>Avoidance</option>
                        <option>Reduction</option>
                        <option>Restoration</option>
                        <option>Adaptation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Projected Reduction %</label>
                      <input type="text" placeholder="e.g. 85% reduction in coliform" className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/15 text-white text-xs focus:border-emerald-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 9 && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Step 09</span>
                    <h3 className="text-xl font-bold text-white mt-1">Scientific Review & Publication Confirmation</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Review submission summary and submit to the Kashmir EcoWatch Multidisciplinary Panel.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Sector:</span>
                      <span className="font-bold text-white capitalize">{sector}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Title:</span>
                      <span className="font-bold text-white">{title || 'Untitled Assessment'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">District:</span>
                      <span className="font-bold text-white">{district}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Baseline Reference:</span>
                      <span className="font-bold text-white">{baselineYear}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Submitting Entity:</span>
                      <span className="font-bold text-emerald-400">{submittingEntity || 'EcoWatch Panel'}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    By submitting, you certify that all input values reflect documented field sensors or lab spectrometry, and you agree to EcoWatch open data publication upon scientific verification.
                  </p>
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-white/15 text-xs text-white justify-center"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Previous Process
                  </Button>
                ) : <div className="hidden xs:block" />}

                {currentStep < 9 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs justify-center"
                  >
                    Next Process ({currentStep + 1}/9) <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg justify-center"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    Submit to Scientific Review Panel
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
