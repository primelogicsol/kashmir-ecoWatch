'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, ShieldCheck, FileText, ArrowRight, Lock, HelpCircle } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';

export default function InstitutionRegisterPage() {
  const [instName, setInstName] = useState('');
  const [category, setCategory] = useState('University');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('Srinagar');
  const [domain, setDomain] = useState('');
  const [website, setWebsite] = useState('');
  const [repName, setRepName] = useState('');
  const [repTitle, setRepTitle] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Institutional Collaborative Network"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Institutional Registration' }
        ]}
        icon={<Building2 className="w-6 h-6 text-teal-400" />}
        title="Register an Institution for Conference Hosting"
        subtitle="Accredited universities, environmental research institutes, and conservation NGOs can register to access KEW's dedicated multi-track conference infrastructure."
      />

      <WebinarNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submitted ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Institutional Registration Received</h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              Your registration dossier for <strong className="text-white">&quot;{instName}&quot;</strong> has been routed to the KEW Institutional Verification Directorate. Verification typically requires 48-72 hours to validate academic charters and authorized signatory credentials.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <Link
                href="/webinars/institution/verification"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
              >
                View Institutional Directory
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Institutional Accreditation Dossier</h3>
                <p className="text-xs text-slate-400">Step 1 of 2: Organization Identity &amp; Authorized Representative</p>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                Free Tier Eligibility
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Institution Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Institute of Hydrology (Roorkee / Western Himalayan Cell)"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Organization Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="University">Accredited State/Central University</option>
                  <option value="Research Institute">Autonomous Research Institute</option>
                  <option value="Environmental NGO">Registered Environmental NGO</option>
                  <option value="Scientific Society">Recognized Scientific Society</option>
                  <option value="Government Agency">Statutory Environmental Board</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Domain Email Suffix</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. kashmiruniversity.ac.in or nih.ernet.in"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">City / Headquarters</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Institutional Website URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://example.ac.in"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Authorized Signatory / Institutional Lead
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Prof. / Dr. / Director"
                    value={repName}
                    onChange={(e) => setRepName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Designation / Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Head of Department / Director"
                    value={repTitle}
                    onChange={(e) => setRepTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rep@domain.ac.in"
                    value={repEmail}
                    onChange={(e) => setRepEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Institutional data isolation is strictly enforced upon approval.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
              >
                Submit Accreditation Application
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
