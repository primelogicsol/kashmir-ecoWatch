'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  School, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Building, 
  Award, 
  Layers, 
  FileCheck, 
  ArrowRight,
  ExternalLink,
  MapPin,
  Users,
  AlertCircle
} from 'lucide-react';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { PILOT_INSTITUTIONS, ADOPTED_ECOSYSTEM_REGISTRY } from '@/data/outdoor-classroom';

export default function InstitutionalRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: 'Government Higher Secondary School',
    district: 'Srinagar',
    zone: '',
    udiseCode: '',
    principalName: '',
    principalEmail: '',
    ecoClubName: '',
    leadTeacherName: '',
    teacherDesignation: 'Lecturer Environmental Science',
    teacherPhone: '',
    teacherEmail: '',
    adoptedSiteCode: 'KEW-OD-WET-001',
    estimatedStudentCount: '30',
    curriculumTier: 'intermediate',
    hasLabFacility: 'Yes',
    acceptedSafetyCharter: false,
    acceptedMinorPrivacy: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedSafetyCharter || !formData.acceptedMinorPrivacy) {
      alert('Please confirm adherence to the safety protocols and student privacy charter.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Western Himalayan School Stewardship Network • 100% Tuition-Free"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'Outdoor Classroom', href: '/environmental-calendar/outdoor-classroom' },
          { label: 'School Registration' }
        ]}
        icon={<School className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                OD-REG
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Institutional Registration Portal
              </span>
            </div>
          </div>
        }
        subtitle="Register your institution to launch an accredited Outdoor Classroom Field Science Hub. Gain access to curriculum guides, telemetry data ingestion, downloadable student workbooks, and official certificates."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/environmental-calendar/outdoor-classroom/curriculum">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md shadow-emerald-500/20">
                View Curriculum
              </Button>
            </Link>
            <Link href="/environmental-calendar/outdoor-classroom/adopt-an-ecosystem">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold">
                Adopt-an-Ecosystem
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <OutdoorClassroomNav />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
        
        {/* Zero-Tuition Commitment Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Public Science Utility: 100% Free for All J&K Institutions</span>
            </div>
            <p className="leading-relaxed text-slate-400 break-words">
              Kashmir EcoWatch charges zero subscription or registration fees. All digital curriculum dossiers, 
              satellite overlays, lab instructions, and student certification tools are provided as a public service 
              to democratize environmental education across the Kashmir Valley.
            </p>
          </div>

        {/* 3 Accreditation Levels Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono font-bold">
                Tier 1
              </span>
              <span className="text-xs text-slate-500 font-mono">Entry Cohort</span>
            </div>
            <h3 className="text-base font-bold text-white">Active Observer</h3>
            <p className="text-xs text-slate-400 leading-relaxed break-words">
              Formal school eco-club registration, maintenance of empirical field notebooks, and at least one seasonal study tour per academic year.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/30 space-y-3 relative overflow-hidden shadow-lg shadow-emerald-950/20">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold">
                Tier 2
              </span>
              <span className="text-xs text-emerald-400 font-mono">Recommended</span>
            </div>
            <h3 className="text-base font-bold text-white">Certified Field Hub</h3>
            <p className="text-xs text-slate-400 leading-relaxed break-words">
              Formal adoption of an ecosystem site, monthly water or biodiversity telemetry uploads, calibrated lab sensors, and teacher sign-off.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-mono font-bold">
                Tier 3
              </span>
              <span className="text-xs text-slate-500 font-mono">Advanced</span>
            </div>
            <h3 className="text-base font-bold text-white">Regional Research Partner</h3>
            <p className="text-xs text-slate-400 leading-relaxed break-words">
              Degree colleges and postgraduate departments providing longitudinal catchment monitoring, microplastic assays, and mentoring local feeder schools.
            </p>
          </div>
        </div>

        {/* Registration Form / Success State */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Registration Confirmed!
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Thank you for enrolling <span className="font-semibold text-emerald-400">{formData.institutionName}</span> in the 
                Kashmir EcoWatch Outdoor Classroom Network. Your provisional institution code is:
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-slate-950 font-mono text-lg font-bold text-emerald-300 border border-emerald-500/30">
                KEW-SCH-2026-021
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-400 text-left space-y-2">
              <div className="font-semibold text-white">Next Steps for Faculty Mentor:</div>
              <ul className="space-y-1 list-disc list-inside">
                <li>Check email for the digital faculty onboarding dossier & water calibration chart.</li>
                <li>Distribute student parental consent forms prior to the first study tour.</li>
                <li>Access the Field Telemetry portal to input initial baseline observations.</li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/environmental-calendar/outdoor-classroom/curriculum"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
              >
                Download Curriculum Library
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
              >
                Register Another Department
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 space-y-8 max-w-4xl mx-auto shadow-2xl">
            {/* Step Progress Tracker */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 text-xs">
              {[
                { step: 1, label: 'Institution Profile' },
                { step: 2, label: 'Faculty & Eco-Club' },
                { step: 3, label: 'Ecosystem Site' },
                { step: 4, label: 'Safety & Submit' },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                    currentStep === s.step
                      ? 'bg-emerald-500 text-slate-950'
                      : currentStep > s.step
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {s.step}
                  </div>
                  <span className={`hidden sm:inline-block font-medium ${
                    currentStep === s.step ? 'text-white' : 'text-slate-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              
              {/* STEP 1: INSTITUTION PROFILE */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-emerald-400" />
                    <span>Step 1: Institutional Profile & Academic Affiliation</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 font-medium mb-1">Official Name of School / College</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Government Higher Secondary School, Hazratbal"
                        value={formData.institutionName}
                        onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Institution Category</label>
                      <select
                        value={formData.institutionType}
                        onChange={(e) => setFormData({...formData, institutionType: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      >
                        <option value="Government Higher Secondary School">Government Higher Secondary School (JKBOSE)</option>
                        <option value="Government High School">Government High School (JKBOSE)</option>
                        <option value="Private Secondary School">Private Secondary School (CBSE / JKBOSE)</option>
                        <option value="Government Degree College">Government Degree College (Cluster Univ / Univ of Kashmir)</option>
                        <option value="University Department / Research Center">University Department / Research Center</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">District</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      >
                        {['Srinagar', 'Baramulla', 'Anantnag', 'Pulwama', 'Kupwara', 'Budgam', 'Ganderbal', 'Bandipora', 'Kulgam', 'Shopian'].map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Educational Zone / Tehsil</label>
                      <input
                        type="text"
                        placeholder="e.g. Srinagar Zone I"
                        value={formData.zone}
                        onChange={(e) => setFormData({...formData, zone: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">U-DISE / Affiliation Code</label>
                      <input
                        type="text"
                        placeholder="e.g. 01010100101"
                        value={formData.udiseCode}
                        onChange={(e) => setFormData({...formData, udiseCode: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Principal / Head of Institution Name</label>
                      <input
                        type="text"
                        placeholder="Principal Name"
                        value={formData.principalName}
                        onChange={(e) => setFormData({...formData, principalName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Principal Official Email</label>
                      <input
                        type="email"
                        placeholder="principal@school.edu"
                        value={formData.principalEmail}
                        onChange={(e) => setFormData({...formData, principalEmail: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Proceed to Faculty Leadership</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: FACULTY & ECO-CLUB */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Step 2: Designated Faculty Mentor & Eco-Club Leadership</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">School Eco-Club / Green Society Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hokersar Youth Stewards"
                        value={formData.ecoClubName}
                        onChange={(e) => setFormData({...formData, ecoClubName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Lead Science Faculty Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Parvaiz Ahmad Mir"
                        value={formData.leadTeacherName}
                        onChange={(e) => setFormData({...formData, leadTeacherName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Faculty Designation</label>
                      <select
                        value={formData.teacherDesignation}
                        onChange={(e) => setFormData({...formData, teacherDesignation: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      >
                        <option value="Lecturer Environmental Science">Lecturer Environmental Science</option>
                        <option value="Teacher Science / Biology">Teacher Science / Biology</option>
                        <option value="Assistant Professor Botany / Zoology">Assistant Professor Botany / Zoology</option>
                        <option value="Geography / Earth Science Faculty">Geography / Earth Science Faculty</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Teacher WhatsApp / Mobile Contact</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 94190 XXXXX"
                        value={formData.teacherPhone}
                        onChange={(e) => setFormData({...formData, teacherPhone: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-300 font-medium mb-1">Faculty Official Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="teacher@school.edu.in"
                        value={formData.teacherEmail}
                        onChange={(e) => setFormData({...formData, teacherEmail: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Proceed to Site Selection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ECOSYSTEM SITE SELECTION */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Step 3: Ecosystem Adoption & Student Cohort</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-slate-300 font-medium mb-1">Select Target Ecosystem Laboratory Site</label>
                      <select
                        value={formData.adoptedSiteCode}
                        onChange={(e) => setFormData({...formData, adoptedSiteCode: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      >
                        {ADOPTED_ECOSYSTEM_REGISTRY.map(site => (
                          <option key={site.code} value={site.code}>
                            {site.code} — {site.name} ({site.district} District • {site.ecosystemType})
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Note: Non-exclusive stewardship. Multiple schools may monitor the same ecosystem.
                      </p>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Target Curriculum Tier</label>
                      <select
                        value={formData.curriculumTier}
                        onChange={(e) => setFormData({...formData, curriculumTier: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      >
                        <option value="foundation">Foundation Tier (Classes 6–8)</option>
                        <option value="intermediate">Intermediate Tier (Classes 9–10)</option>
                        <option value="advanced">Advanced Tier (Classes 11–12)</option>
                        <option value="undergraduate">Undergraduate Field Biology (Colleges)</option>
                        <option value="mentor">Research Mentor (University Departments)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Estimated Participating Students</label>
                      <input
                        type="number"
                        min="10"
                        max="250"
                        value={formData.estimatedStudentCount}
                        onChange={(e) => setFormData({...formData, estimatedStudentCount: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Proceed to Safety Charter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: SAFETY CHARTER & SUBMIT */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Step 4: Safety Protocols, Minor Privacy & Final Submission</span>
                  </h3>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3">
                    <div className="font-semibold text-emerald-300 text-xs">Mandatory Institutional Assurances:</div>
                    
                    <label className="flex items-start gap-3 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptedSafetyCharter}
                        onChange={(e) => setFormData({...formData, acceptedSafetyCharter: e.target.checked})}
                        className="mt-0.5 rounded text-emerald-500 focus:ring-0"
                      />
                      <span className="leading-relaxed">
                        I certify that the institution will collect signed parental/guardian consent forms before every field tour, 
                        enforce the student buddy system, mandate life jackets during any boat transit, and adhere to Leave No Trace principles.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptedMinorPrivacy}
                        onChange={(e) => setFormData({...formData, acceptedMinorPrivacy: e.target.checked})}
                        className="mt-0.5 rounded text-emerald-500 focus:ring-0"
                      />
                      <span className="leading-relaxed">
                        I confirm that student observations will be uploaded using anonymized student IDs (e.g. STU-KUP-019) to 
                        strictly protect minors' personal data in compliance with digital safety standards.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm flex items-center gap-2 transition-all shadow-xl shadow-emerald-950/50"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Institutional Registration</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

        {/* 20 Registered Pilot Institutions Roster */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Active Phase 1 Pilot Cohort ({PILOT_INSTITUTIONS.length} Institutions)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Pioneering schools and colleges currently operating Outdoor Classroom Field Science Hubs across Kashmir
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400 text-xs font-mono">
              Academic Year 2026–2027
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILOT_INSTITUTIONS.map((inst) => (
              <div 
                key={inst.id} 
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{inst.district}</span>
                    <span>Est. {inst.establishedYear}</span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-snug break-words">
                    {inst.name}
                  </h4>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    {inst.ecoClubName}
                  </div>
                  <div className="text-[11px] text-slate-400 break-words">
                    Adopted: <span className="text-slate-300 font-medium">{inst.adoptedSiteName}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Mentor: {inst.facultyMentor}</span>
                  <span className="font-mono text-emerald-400 font-bold">{inst.verifiedFieldSubmissions} records</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
