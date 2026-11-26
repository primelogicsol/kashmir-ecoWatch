'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { INSTITUTION_TYPE_OPTIONS, InstitutionTypeOption } from '@/types/virtual-hall';

export default function InstitutionRegisterPage() {
  const [instName, setInstName] = useState('');
  const [category, setCategory] = useState<InstitutionTypeOption>('University');
  const [customCategory, setCustomCategory] = useState('');
  const [country, setCountry] = useState('India');
  const [city, setCity] = useState('Srinagar');
  const [domain, setDomain] = useState('');
  const [website, setWebsite] = useState('');
  const [repName, setRepName] = useState('');
  const [repTitle, setRepTitle] = useState('');
  const [repEmail, setRepEmail] = useState('');
  const [bio, setBio] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/webinars/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register_institution',
          institutionName: instName,
          category,
          customInstitutionType: category === 'Other' ? customCategory : undefined,
          country,
          cityRegion: city,
          domain,
          website,
          contactName: repName,
          contactTitle: repTitle,
          contactEmail: repEmail,
          bio,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || 'Registration failed.');
      } else {
        setRegisteredId(data.record.institutionId);
      }
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Free Institutional Collaborative Network • $0 Fee"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Institutional Registration' },
        ]}
        icon={<Building2 className="w-6 h-6 text-teal-400" />}
        title="Register an Institution for Free Scientific Hosting"
        subtitle="Stage 1 of the KEW Institutional Hosting Lifecycle: register your university, research institution, NGO, government department, scientific society, educational institution, or community group at $0 cost."
      />

      <WebinarNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {registeredId ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Institution Queued — Pending Verification</h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              Dossier <code className="text-teal-300 font-mono">{registeredId}</code> for{' '}
              <strong className="text-white">&quot;{instName}&quot;</strong> has been saved in the KEW Verification Registry with status <strong className="text-amber-300">Pending Verification</strong> (<strong className="text-emerald-300">$0 Hosting Fee</strong>; Phase I default quota: 10 concurrent delegates, 2 speakers, 1 track, 1 GB recording storage).
            </p>
            <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/webinars/institution/verification"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
              >
                View Institutional Verification Directory
              </Link>
              <Link
                href="/webinars/host-a-conference"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
              >
                Submit Hosting Proposal
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">Institutional Accreditation Dossier</h3>
                <p className="text-xs text-slate-400">Lifecycle Stage 1: Organization Identity &amp; Signatory</p>
              </div>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                $0 Free Hosting Policy
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Institution Name *</label>
                <input
                  type="text"
                  required
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  placeholder="e.g. National Institute of Hydrology (Western Himalayan Regional Centre)"
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Institution Type *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as InstitutionTypeOption)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                >
                  {INSTITUTION_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {category === 'Other' ? (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Custom Institution Type *</label>
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Specify institution category..."
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Official Domain (if available)</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g. kashmiruniversity.ac.in"
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">City / Region *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Country *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Official Website (if available)</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Scientific Mandate Summary</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief summary of institutional research mandate..."
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Authorized Representative *</label>
                <input
                  type="text"
                  required
                  value={repName}
                  onChange={(e) => setRepName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Title / Role</label>
                <input
                  type="text"
                  value={repTitle}
                  onChange={(e) => setRepTitle(e.target.value)}
                  placeholder="e.g. Program Coordinator"
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Institutional Contact Email *</label>
                <input
                  type="email"
                  required
                  value={repEmail}
                  onChange={(e) => setRepEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
              <span className="text-[11px] text-slate-400">
                New institutions are assigned Pending Verification status until Secretariat review.
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950"
              >
                {submitting ? 'Registering...' : 'Submit Free Accreditation'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
