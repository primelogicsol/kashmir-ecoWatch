'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Building2, MapPin, Target, Shield, Upload, 
  CheckCircle2, ChevronRight, Users, BookOpen, Star, Globe, Lock, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Sidebar Panels ─────────────────────────────────────────────────── */

function WhyJoinRegistry() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/50 to-slate-900/80 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Why Join the Registry?</h3>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        KEW aggregates civil society impact data to build a verified public database of environmental work across Kashmir. Verified NGOs receive priority for funding, partnerships, and public visibility.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { value: '34+', label: 'Registered NGOs' },
          { value: '12', label: 'Impact Themes' },
          { value: 'Verified', label: 'Trust Marker' },
          { value: 'Global', label: 'Visibility' },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-xl bg-white/5 border border-white/5 p-3 text-center">
            <div className="text-lg font-bold text-white">{value}</div>
            <div className="text-[10px] text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AcceptedOrganizations() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-4 h-4 text-sky-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">Accepted Organizations</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: '📜', label: 'Registered Societies' },
          { icon: '🏛', label: 'Registered Trusts' },
          { icon: '🏢', label: 'Section 8 Companies' },
          { icon: '🌱', label: 'Community Groups' },
          { icon: '🌍', label: 'International NGOs' },
          { icon: '🤝', label: 'Student Unions' },
        ].map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-2">
            <span className="text-base">{icon}</span>
            <span className="text-[10px] text-slate-300 leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerificationProtocol() {
  const steps = [
    { title: 'Submission & Document Screening', desc: 'Registration documents are reviewed.' },
    { title: 'Identity Verification', desc: 'Organization identity is confirmed.' },
    { title: 'Community Validation', desc: 'Local stakeholders validate activities.' },
    { title: 'Field Impact Assessment', desc: 'Evidence and field work are assessed.' },
    { title: 'Expert Panel Review', desc: 'Environmental experts review findings.' },
    { title: 'Verified & Published', desc: 'Organization receives a Verified badge and appears in the public registry.' }
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-orange-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400">Recommended Verification Workflow</h3>
      </div>
      <div className="space-y-0">
        {steps.map((step, idx) => (
          <div key={step.title} className="flex flex-col">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center mt-0.5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-700 shrink-0">
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px h-10 bg-slate-800 my-1"></div>
                )}
              </div>
              <div className="pb-4">
                <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">{step.title}</h4>
                <p className="text-[10px] text-slate-400 leading-tight mt-1">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataSecurity() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Lock className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Data Security & Privacy</h3>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed">
        Internal IDs, verification officer notes, risk levels, and specific tax documents are stored securely and never published. Only verified public achievements and impact metrics are visible on the Registry.
      </p>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */

export default function NGOSubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    { num: 1, label: 'Identity & Contact', icon: Building2 },
    { num: 2, label: 'Scope & Focus', icon: MapPin },
    { num: 3, label: 'Profile & Leadership', icon: Users },
    { num: 4, label: 'Projects & Partners', icon: BookOpen },
    { num: 5, label: 'Evidence', icon: Shield }
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col pb-24">
      <Heading
        label="Civil Society Network · Onboarding & Verification"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'NGO Impact', href: '/ngo-impact' },
          { label: 'Submit NGO' }
        ]}
        icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
        title={<>
          <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
            <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
            <span>Western Himalayan</span>
          </span>
          <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">NGO Profile Registration</span>
        </>}
        subtitle="Submit your organization's comprehensive profile, leadership credentials, and field evidence to initiate the formal KEW verification workflow."
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-500 font-bold text-white"
              icon={<Building2 className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/directory')}
            >
              Browse Directory
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Target className="w-5 h-5" />}
              onClick={() => router.push('/ngo-impact/projects')}
            >
              Active Projects
            </Button>
          </div>
        }
        images={[
          '/images/ngo-module/community.jpg',
          '/images/ngo-module/field_work.jpg',
          '/images/ngo-module/lake_clean.jpg',
          '/images/protected-network.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <div className="w-full max-w-7xl mx-auto px-4 xl:px-8 py-8">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Form Area */}
          <div className="w-full lg:w-[65%] order-2 lg:order-1">
            
            {/* Form Wizard Progress */}
            <div className="flex justify-between items-center mb-8 px-2 relative hidden md:flex">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-10 rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} />
              
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2 bg-slate-950 py-1 px-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step >= s.num ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}>
                    {step > s.num ? <CheckCircle2 className="w-5 h-5 text-slate-950" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.num ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden">
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">

                  {/* STEP 1: IDENTITY & CONTACT */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">1. Organization Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Organization Name *</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Acronym / Short Name</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Year Established *</label>
                            <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Registration Type *</label>
                            <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100">
                              {['Society', 'Trust', 'Section 8 Company', 'Nonprofit', 'Foundation', 'Cooperative', 'Informal Community Group', 'Other'].map(o => <option key={o}>{o}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-medium text-slate-400">Organization Logo</label>
                            <div className="w-full border border-dashed border-slate-700 bg-slate-950 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-500">
                              <Upload className="w-4 h-4 text-slate-500 mx-auto mb-2" />
                              <span className="text-xs text-slate-400">Click to upload logo (JPG/PNG)</span>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">2. Contact Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Primary Contact Person *</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Designation *</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Email Address *</label>
                            <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Phone Number *</label>
                            <input type="tel" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-medium text-slate-400">Official Website</label>
                            <input type="url" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}

                  {/* STEP 2: SCOPE & FOCUS */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">3. Geographic Coverage</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Headquarters District</label>
                            <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100">
                              {['Srinagar', 'Ganderbal', 'Bandipora', 'Baramulla', 'Budgam', 'Anantnag'].map(o => <option key={o}>{o}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5 pt-6">
                            <label className="flex items-center gap-4 text-xs font-medium text-slate-400">
                              <span className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700" /> Rural</span>
                              <span className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700" /> Urban</span>
                              <span className="flex items-center gap-2"><input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700" /> Mountain</span>
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-400">Districts Served (Select all that apply)</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-4 border border-slate-800 rounded-lg">
                            {['Srinagar', 'Ganderbal', 'Bandipora', 'Baramulla', 'Kupwara', 'Budgam', 'Pulwama', 'Shopian', 'Anantnag', 'Kulgam'].map(o => (
                              <label key={o} className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700 text-emerald-500" /> {o}
                              </label>
                            ))}
                          </div>
                        </div>
                      </section>

                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">4. Environmental Focus</h2>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-400">Primary Themes (Multi-select)</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-950 p-4 border border-slate-800 rounded-lg">
                            {[
                              'Wetlands', 'Lakes', 'Rivers', 'Forests', 'Wildlife', 'Biodiversity', 
                              'Climate Change', 'Waste Management', 'Plastic Pollution',
                              'Environmental Education', 'Disaster Risk Reduction', 'Sustainable Tourism'
                            ].map((theme) => (
                              <label key={theme} className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700 text-emerald-500" /> {theme}
                              </label>
                            ))}
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}

                  {/* STEP 3: PROFILE & LEADERSHIP */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">5. Organization Profile</h2>
                        </div>
                        <div className="space-y-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Mission Statement *</label>
                            <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 h-20" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Major Achievements</label>
                            <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 h-20" />
                          </div>
                        </div>
                      </section>

                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">6. Leadership & Capacity</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Executive Director / President</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Full-time Staff</label>
                            <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Active Volunteers</label>
                            <input type="number" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}

                  {/* STEP 4: PROJECTS & PARTNERS */}
                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">7. Project Information</h2>
                        </div>
                        <div className="space-y-5">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Active Projects Overview</label>
                            <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 h-20" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-400">Key Project Locations</label>
                            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
                          </div>
                        </div>
                      </section>

                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">8. Partnerships</h2>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-400">Current Affiliations (Select all that apply)</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-4 border border-slate-800 rounded-lg">
                            {[
                              'Government', 'Universities', 'Schools', 'International NGOs', 
                              'Local NGOs', 'CSR', 'UN Agencies', 'Research Institutions'
                            ].map((partner) => (
                              <label key={partner} className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700 text-emerald-500" /> {partner}
                              </label>
                            ))}
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}

                  {/* STEP 5: EVIDENCE & DECLARATIONS */}
                  {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">9. Evidence & Documents</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { title: 'Registration Certificate *' },
                            { title: 'Annual Report' },
                            { title: 'Audit Report' },
                            { title: 'Project Reports' },
                          ].map((doc) => (
                            <div key={doc.title} className="border border-slate-800 bg-slate-950 rounded-xl p-4 flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-300">{doc.title}</span>
                              <Button variant="outline" size="sm" className="border-slate-700 h-8 px-3 hover:border-emerald-500 hover:text-emerald-400">
                                <Upload className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section>
                        <div className="mb-6 border-b border-slate-800 pb-2">
                          <h2 className="text-xl font-bold text-white">10. Declarations</h2>
                        </div>
                        <div className="space-y-3 bg-slate-950 border border-slate-800 p-5 rounded-lg">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded bg-slate-900 border-slate-700 mt-0.5 text-emerald-500" />
                            <span className="text-xs text-slate-300">Information is accurate and true to the best of our knowledge.</span>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded bg-slate-900 border-slate-700 mt-0.5 text-emerald-500" />
                            <span className="text-xs text-slate-300">We agree to independent verification (Document, Community, Field, Expert).</span>
                          </label>
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded bg-slate-900 border-slate-700 mt-0.5 text-emerald-500" />
                            <span className="text-xs text-slate-300">We permit Kashmir EcoWatch to publish verified impact data.</span>
                          </label>
                        </div>
                      </section>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Form Navigation Footer */}
              <div className="bg-slate-950 p-5 border-t border-slate-800 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`text-slate-400 hover:text-white ${step === 1 ? 'invisible' : ''}`}
                  onClick={() => setStep(Math.max(1, step - 1))}
                >
                  Back
                </Button>
                
                {step < totalSteps ? (
                  <Button 
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white min-w-[120px]"
                    onClick={() => setStep(Math.min(totalSteps, step + 1))}
                  >
                    Next Section <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold min-w-[140px]"
                  >
                    Submit Application <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>

            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[35%] space-y-4 sticky top-24 order-1 lg:order-2">
            <WhyJoinRegistry />
            <AcceptedOrganizations />
            <VerificationProtocol />
            <DataSecurity />
          </div>

        </div>

      </div>
    </main>
  );
}
