'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { VERIFIED_INSTITUTIONS } from '@/data/conference-system';

export default function HostAConferencePage() {
  const [selectedInst, setSelectedInst] = useState(VERIFIED_INSTITUTIONS[0].id);
  const [hostingModel, setHostingModel] = useState('institution-hosted');
  const [confTitle, setConfTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tracksCount, setTracksCount] = useState(2);
  const [expectedAttendees, setExpectedAttendees] = useState(300);
  const [scope, setScope] = useState('');
  const [funding, setFunding] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Collaborative Scientific Conference Infrastructure"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Host a Conference' }
        ]}
        icon={<Building2 className="w-6 h-6 text-teal-400" />}
        title="Apply to Host a Scientific Conference"
        subtitle="Empowering verified universities, research institutes, environmental NGOs, and scientific societies to organize professional conferences under Kashmir EcoWatch's collaborative infrastructure."
      />

      <WebinarNav />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Policy Alert: Free for Verified Environmental Entities */}
        <div className="bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 border border-teal-500/30 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional Hosting Policy • 100% Free Platform Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Zero Platform Fees for Verified Himalayan Environmental Research
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kashmir EcoWatch provides this high-definition WebRTC video conferencing, multi-track hall allocation, delegate pass management, and DOI publishing infrastructure <strong className="text-white">free of charge</strong> to accredited universities and non-profit environmental societies. All conference proposals undergo administrative review to verify scientific relevance, academic integrity, and safeguarding standards before public listing.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>• Not registered yet?</span>
            <Link href="/webinars/institution/register" className="text-teal-400 hover:underline font-semibold">
              Register Your Institution &rarr;
            </Link>
            <span>• Or check status in the</span>
            <Link href="/webinars/institution/verification" className="text-teal-400 hover:underline font-semibold">
              Verification Directory
            </Link>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Conference Hosting Proposal Submitted</h3>
            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              Your application for <strong className="text-white">&quot;{confTitle || 'Proposed Scientific Conference'}&quot;</strong> has been assigned tracking ID <code className="text-teal-300 font-mono">KEW-APP-2027-9042</code>. The KEW Scientific Steering Committee will review your proposal within 3 business days.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                href="/webinars/institution/inst-ku/applications"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
              >
                Track in Institutional Workspace
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Submit Another Proposal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-teal-400" />
              <span>Step 1: Conference Scope &amp; Institutional Governance</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Applying Verified Institution</label>
                <select
                  value={selectedInst}
                  onChange={(e) => setSelectedInst(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-teal-200 focus:outline-none focus:border-teal-500"
                >
                  {VERIFIED_INSTITUTIONS.map(inst => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} ({inst.category} • {inst.status.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hosting Model</label>
                <select
                  value={hostingModel}
                  onChange={(e) => setHostingModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="institution-hosted">Institution-Hosted (Independent Organization)</option>
                  <option value="joint">Joint Institutional (Co-organized with Kashmir EcoWatch)</option>
                  <option value="kew-organized">KEW-Organized</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Proposed Conference Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Western Himalayan Glaciological Monitoring &amp; Climate Adaptation Summit"
                  value={confTitle}
                  onChange={(e) => setConfTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Proposed Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Proposed End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Requested Parallel Tracks (Halls)</label>
                <select
                  value={tracksCount}
                  onChange={(e) => setTracksCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value={1}>1 Track (Single Plenary Hall)</option>
                  <option value={2}>2 Parallel Tracks (Halls A &amp; B)</option>
                  <option value={3}>3 Parallel Tracks (Halls A, B &amp; C)</option>
                  <option value={4}>4 Parallel Tracks (Academic Tier Max)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Delegate Capacity</label>
                <input
                  type="number"
                  min={50}
                  max={2000}
                  value={expectedAttendees}
                  onChange={(e) => setExpectedAttendees(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Scientific Scope &amp; Objectives</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the research questions, scientific disciplines, methodologies, and proposed outcomes..."
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Funding &amp; Sponsorship Disclosure</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University departmental research grant. No commercial extractive sponsors."
                  value={funding}
                  onChange={(e) => setFunding(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Data isolation enforced: Other institutions cannot inspect your application.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
              >
                Submit Conference Proposal for Review
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
