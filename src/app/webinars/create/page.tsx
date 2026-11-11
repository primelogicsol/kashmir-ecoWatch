'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Video
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { Button } from '@/components/ui/Button';

export default function CreateWebinarPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    title: '',
    type: 'conference', // 'webinar' | 'conference' | 'roundtable'
    discipline: 'Cryosphere & Glaciology',
    abstract: '',
    startDate: '',
    endDate: '',
    timeZone: 'IST (UTC+05:30)',
    isMultiDay: true,
    parallelTracks: [
      { name: 'Track A: Glaciology & InSAR', chair: '', roomCode: 'ROOM-A' },
      { name: 'Track B: Downstream Hydrology', chair: '', roomCode: 'ROOM-B' }
    ],
    primarySpeaker: {
      name: '',
      title: '',
      institution: '',
      orcid: ''
    },
    maxCapacity: '500',
    requiresCertificate: true,
    requiresRecordingConsent: true
  });

  const handleAddTrack = () => {
    const nextLetter = String.fromCharCode(65 + form.parallelTracks.length);
    setForm({
      ...form,
      parallelTracks: [
        ...form.parallelTracks,
        { name: `Track ${nextLetter}: New Parallel Session`, chair: '', roomCode: `ROOM-${nextLetter}` }
      ]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Call for Papers & Symposium Proposal • Scientific Secretariat"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Scientific Webinars', href: '/webinars' },
          { label: 'Create Webinar / Conference' }
        ]}
        icon={<PlusCircle className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                CREATION WIZARD
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Propose Webinar or Scientific Conference
              </span>
            </div>
          </div>
        }
        subtitle="Submit technical sessions, workshops, and multi-day symposia to the Kashmir EcoWatch Scientific Advisory Board. Provision parallel WebRTC virtual halls and delegate registration pipelines."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
      />

      <WebinarNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isSuccess ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl">
            {/* Step Indicators */}
            <div className="grid grid-cols-4 gap-2 mb-8 border-b border-white/10 pb-6 text-xs">
              {[
                { num: 1, title: 'Scope & Title' },
                { num: 2, title: 'Schedule & Tracks' },
                { num: 3, title: 'Keynote Faculty' },
                { num: 4, title: 'Review & Submit' }
              ].map((step) => (
                <div
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`cursor-pointer pb-2 border-b-2 transition-all ${
                    currentStep === step.num
                      ? 'border-teal-400 text-teal-300 font-bold'
                      : currentStep > step.num
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-slate-500'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono">Step 0{step.num}</div>
                  <div className="truncate font-semibold">{step.title}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Step 1: Scope */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">Step 1: Scientific Scope &amp; Format</h3>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Event Format *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'conference', label: 'Multi-Day Conference', desc: 'Parallel halls, multi-day track schedules' },
                        { id: 'webinar', label: 'Technical Webinar', desc: 'Single session (90–120 mins), keynote & Q&A' },
                        { id: 'roundtable', label: 'Expert Roundtable', desc: 'Closed/Open working group with communiqués' }
                      ].map(t => (
                        <div
                          key={t.id}
                          onClick={() => setForm({ ...form, type: t.id, isMultiDay: t.id === 'conference' })}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            form.type === t.id
                              ? 'bg-teal-500/15 border-teal-500/50 text-white'
                              : 'bg-slate-950 border-white/10 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          <div className="font-bold text-white text-xs mb-1">{t.label}</div>
                          <div className="text-[11px] text-slate-400">{t.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Scientific Discipline *</label>
                    <select
                      value={form.discipline}
                      onChange={(e) => setForm({ ...form, discipline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="Cryosphere & Glaciology">Cryosphere &amp; Glaciology</option>
                      <option value="Limnology & Wetlands">Limnology &amp; Wetlands</option>
                      <option value="Forest Ecology">Forest Ecology &amp; Alpine Biodiversity</option>
                      <option value="Fluvial Geomorphology">Fluvial Geomorphology &amp; River Mining</option>
                      <option value="Environmental Law & NGT">Environmental Law &amp; NGT Jurisprudence</option>
                      <option value="Atmospheric Physics">Atmospheric Physics &amp; Airshed Inversion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Conference / Webinar Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Western Himalayan Cryosphere Summit: Snout Recession & Water Security"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Scientific Abstract / Objective (200–500 words) *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Summarize the core scientific evidence, methodologies, empirical datasets, and targeted institutional outcomes..."
                      value={form.abstract}
                      onChange={(e) => setForm({ ...form, abstract: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-xs"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="button" onClick={() => setCurrentStep(2)} className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
                      Next: Schedule &amp; Tracks &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Schedule & Tracks */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">Step 2: Dates, Time &amp; Parallel Tracks</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Start Date &amp; Time *</label>
                      <input
                        type="datetime-local"
                        required
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">End Date &amp; Time *</label>
                      <input
                        type="datetime-local"
                        required
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {form.isMultiDay && (
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-purple-400" />
                          <span>Parallel Virtual Halls &amp; Symposium Tracks</span>
                        </span>
                        <Button type="button" size="sm" onClick={handleAddTrack} variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-950/30 text-[10px]">
                          + Add Parallel Hall
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {form.parallelTracks.map((tr, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between gap-3">
                            <input
                              type="text"
                              value={tr.name}
                              onChange={(e) => {
                                const copy = [...form.parallelTracks];
                                copy[idx].name = e.target.value;
                                setForm({ ...form, parallelTracks: copy });
                              }}
                              className="flex-1 bg-transparent border-b border-white/10 text-white text-xs py-1 focus:outline-none focus:border-purple-400"
                            />
                            <span className="text-[10px] font-mono text-purple-400 font-bold px-2 py-0.5 rounded bg-purple-500/10">
                              {tr.roomCode}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="border-white/10 text-slate-300">
                      &larr; Back
                    </Button>
                    <Button type="button" onClick={() => setCurrentStep(3)} className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
                      Next: Keynote Faculty &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Keynote Faculty */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">Step 3: Lead Keynote Speaker / Session Chair</h3>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Speaker Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Elena Rostova / Dr. M. Farooq"
                      value={form.primarySpeaker.name}
                      onChange={(e) => setForm({
                        ...form,
                        primarySpeaker: { ...form.primarySpeaker, name: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Academic Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Head of Earth Sciences / Senior Fellow"
                        value={form.primarySpeaker.title}
                        onChange={(e) => setForm({
                          ...form,
                          primarySpeaker: { ...form.primarySpeaker, title: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Institution / University *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kashmir University / ETH Zurich"
                        value={form.primarySpeaker.institution}
                        onChange={(e) => setForm({
                          ...form,
                          primarySpeaker: { ...form.primarySpeaker, institution: e.target.value }
                        })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">ORCID ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="0000-0002-XXXX-XXXX"
                      value={form.primarySpeaker.orcid}
                      onChange={(e) => setForm({
                        ...form,
                        primarySpeaker: { ...form.primarySpeaker, orcid: e.target.value }
                      })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 font-mono"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="border-white/10 text-slate-300">
                      &larr; Back
                    </Button>
                    <Button type="button" onClick={() => setCurrentStep(4)} className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
                      Next: Review &amp; Submit &rarr;
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">Step 4: Review &amp; Submission Confirmation</h3>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                    <div>
                      <div className="text-[10px] text-teal-400 font-bold uppercase">Event Proposal</div>
                      <div className="text-sm font-bold text-white">{form.title || 'Untitled Session'}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 border-t border-white/5 pt-2">
                      <div><strong className="text-slate-400">Format:</strong> {form.type}</div>
                      <div><strong className="text-slate-400">Discipline:</strong> {form.discipline}</div>
                      <div><strong className="text-slate-400">Lead Faculty:</strong> {form.primarySpeaker.name || 'Not specified'}</div>
                      <div><strong className="text-slate-400">Parallel Halls:</strong> {form.isMultiDay ? form.parallelTracks.length : '1 Main Hall'}</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold text-white mb-0.5">Scientific Review Protocol:</strong>
                      Upon submission, this session proposal will be reviewed by the Kashmir EcoWatch Advisory Board and Dr. Kumar Foundation USA. Approved sessions receive automated WebRTC room keys, public registration pages, and DOI proceeding allocation.
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(3)} className="border-white/10 text-slate-300">
                      &larr; Back
                    </Button>
                    <Button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 shadow-md shadow-teal-500/20">
                      Submit for Academic Review
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-slate-900 border border-teal-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              Symposium Proposal Submitted!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Your proposal has been logged in the Scientific Review Queue under dossier reference <span className="font-mono text-teal-400 font-bold">PROP-2027-8819</span>.
            </p>

            <div className="pt-6 flex justify-center gap-3">
              <Link href="/webinars">
                <Button className="bg-teal-600 hover:bg-teal-500 text-white font-bold">
                  Return to Conference Hub
                </Button>
              </Link>
              <Link href="/webinars/admin">
                <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                  View in Admin Queue
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
