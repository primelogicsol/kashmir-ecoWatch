'use client';

import React, { useState } from 'react';
import { Building2, CheckCircle2, XCircle, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { VERIFIED_INSTITUTIONS, Institution } from '@/data/conference-system';

export default function AdminInstitutionApprovalsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>(VERIFIED_INSTITUTIONS);

  const handleApprove = (id: string) => {
    setInstitutions(prev => prev.map(inst => inst.id === id ? { ...inst, status: 'verified', verifiedAt: '2027-05-11' } : inst));
  };

  const handleReject = (id: string) => {
    setInstitutions(prev => prev.map(inst => inst.id === id ? { ...inst, status: 'rejected' } : inst));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Platform Governance • Institutional Verification"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Institution Approvals' }
        ]}
        icon={<Building2 className="w-6 h-6 text-amber-400" />}
        title="Institutional Accreditation &amp; Hosting Approvals"
        subtitle="Review universities, research academies, and NGOs applying for hosting privileges. Confirm academic charter documentation and enforce tenant data isolation."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="space-y-4">
          {institutions.map(inst => (
            <div key={inst.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    inst.status === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : inst.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {inst.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{inst.category} • {inst.country}</span>
                </div>

                <h3 className="text-base font-bold text-white">{inst.name}</h3>
                <p className="text-xs text-slate-300">{inst.bio}</p>

                <div className="text-xs text-slate-400 font-mono flex flex-wrap gap-4 pt-1">
                  <span>Domain: <strong className="text-teal-300">{inst.domain}</strong></span>
                  <span>Lead: <strong className="text-slate-200">{inst.authorizedRep.name}</strong> ({inst.authorizedRep.email})</span>
                  <span>Quota: <strong className="text-cyan-300">{inst.resourceQuota.maxConcurrentTracks} Tracks / {inst.resourceQuota.maxDelegatesPerHall} Max Seats</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {inst.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleApprove(inst.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve &amp; Provision</span>
                    </button>
                    <button
                      onClick={() => handleReject(inst.id)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-500/30 flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified ({inst.verifiedAt || 'Active'})</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
