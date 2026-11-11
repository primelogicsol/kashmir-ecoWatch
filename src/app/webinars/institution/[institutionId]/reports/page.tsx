import React from 'react';
import { notFound } from 'next/navigation';
import { BarChart3, Clock, Users, Download, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { InstitutionSubNav } from '@/components/webinars/InstitutionSubNav';
import { VERIFIED_INSTITUTIONS } from '@/data/conference-system';

export function generateStaticParams() {
  return VERIFIED_INSTITUTIONS.map(inst => ({ institutionId: inst.id }));
}

interface Props {
  params: Promise<{ institutionId: string }>;
}

export default async function InstitutionReportsPage({ params }: Props) {
  const { institutionId } = await params;
  const institution = VERIFIED_INSTITUTIONS.find(i => i.id === institutionId);

  if (!institution) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Analytics &amp; Resource Quota Consumption"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: institution.name, href: `/webinars/institution/${institution.id}/dashboard` },
          { label: 'Reports' }
        ]}
        icon={<BarChart3 className="w-6 h-6 text-teal-400" />}
        title={`Event Analytics &amp; Quotas • ${institution.name}`}
        subtitle="Review verified participant dwell-times, cloud storage consumption, live streaming bandwidth, and export compliance reports for statutory academic audits."
      />

      <WebinarNav />
      <InstitutionSubNav institution={institution} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs text-slate-400">Total Verified Delegate Hours</span>
            <div className="text-3xl font-bold text-white font-mono">1,842.5 hrs</div>
            <p className="text-[11px] text-teal-400">Across 3 academic events</p>
          </div>
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs text-slate-400">Average Session Dwell Time</span>
            <div className="text-3xl font-bold text-teal-300 font-mono">89.2%</div>
            <p className="text-[11px] text-slate-400">Required 80% for CE Certificate</p>
          </div>
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs text-slate-400">Cloud Storage Allocated</span>
            <div className="text-3xl font-bold text-cyan-300 font-mono">14.2 / {institution.resourceQuota.cloudStorageGB} GB</div>
            <p className="text-[11px] text-slate-400">28.4% capacity utilized</p>
          </div>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/10 space-y-3">
          <h4 className="text-sm font-bold text-white">Statutory Academic Compliance Export</h4>
          <p className="text-xs text-slate-300">
            Download cryptographic CSV of all delegate attendance records, session timestamps, and verified certificate serials for NAAC, NIRF, or ICAR accreditation filings.
          </p>
          <button className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />
            <span>Export Verified Accreditation Audit Pack (CSV &amp; PDF)</span>
          </button>
        </div>
      </main>
    </div>
  );
}
