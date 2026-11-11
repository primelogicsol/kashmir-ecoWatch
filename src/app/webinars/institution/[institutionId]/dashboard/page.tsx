import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Building2, 
  Layers, 
  Users, 
  Award, 
  Calendar, 
  PlusCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { InstitutionSubNav } from '@/components/webinars/InstitutionSubNav';
import { VERIFIED_INSTITUTIONS, CONFERENCES_DETAILED, HOSTING_APPLICATIONS } from '@/data/conference-system';

export function generateStaticParams() {
  return VERIFIED_INSTITUTIONS.map(inst => ({ institutionId: inst.id }));
}

interface Props {
  params: Promise<{ institutionId: string }>;
}

export default async function InstitutionDashboardPage({ params }: Props) {
  const { institutionId } = await params;
  const institution = VERIFIED_INSTITUTIONS.find(i => i.id === institutionId);

  if (!institution) {
    notFound();
  }

  const myConferences = CONFERENCES_DETAILED.filter(c => c.hostInstitution.id === institution.id);
  const myApplications = HOSTING_APPLICATIONS.filter(a => a.institutionId === institution.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Institutional Workspace • Isolated Academic Tenant"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Institutions', href: '/webinars/institution/verification' },
          { label: institution.name }
        ]}
        icon={<Building2 className="w-6 h-6 text-teal-400" />}
        title={institution.name}
        subtitle={`Dedicated administrative portal for ${institution.name}. Manage hosted conferences, track scientific session proposals, review participant registries, and inspect resource quotas.`}
      />

      <WebinarNav />
      <InstitutionSubNav institution={institution} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Workspace Security Notice */}
        <div className="bg-slate-900/60 border border-teal-500/20 rounded-2xl p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-teal-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Strict Tenant Isolation Active • Organization ID: {institution.id}</span>
          </div>
          <span className="text-slate-400 font-mono">Rep: {institution.authorizedRep.name}</span>
        </div>

        {/* Quota KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 block mb-1">Max Concurrent Tracks</span>
            <span className="text-2xl font-bold text-white font-mono">{institution.resourceQuota.maxConcurrentTracks} Halls</span>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 block mb-1">Max Hall Capacity</span>
            <span className="text-2xl font-bold text-teal-400 font-mono">{institution.resourceQuota.maxDelegatesPerHall} Delegates</span>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 block mb-1">Cloud Storage Quota</span>
            <span className="text-2xl font-bold text-cyan-400 font-mono">{institution.resourceQuota.cloudStorageGB} GB</span>
          </div>
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 block mb-1">Recording Quota</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono">{institution.resourceQuota.liveRecordingHours} Hours</span>
          </div>
        </div>

        {/* Hosted Conferences Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-400" />
              <span>Conferences Administered by this Institution</span>
            </h3>
            <Link
              href="/webinars/host-a-conference"
              className="text-xs font-semibold text-teal-400 hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Propose New Conference</span>
            </Link>
          </div>

          {myConferences.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-white/5 text-xs text-slate-400">
              No active conferences are currently linked to this institution. Submit a hosting proposal to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myConferences.map(c => (
                <div key={c.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-teal-300">{c.dates.display}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-500/10 text-teal-300">
                      {c.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{c.theme}</p>
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href={`/webinars/conferences/${c.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
                    >
                      Conference Console
                    </Link>
                    <Link
                      href={`/webinars/conferences/${c.id}/program`}
                      className="text-xs text-slate-300 hover:text-white"
                    >
                      View Agenda &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Applications Tracking */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-400" />
            <span>Conference Hosting Proposals &amp; Review Status</span>
          </h3>

          <div className="space-y-3">
            {myApplications.map(app => (
              <div key={app.id} className="bg-slate-900/70 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-teal-300">{app.id}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.2 rounded ${
                      app.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="font-bold text-white">{app.conferenceTitle}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Proposed: {app.proposedDates.display} • {app.tracksCount} Tracks</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-slate-400 text-[11px]">{app.reviewNotes || 'Under evaluation by KEW SuperAdmin'}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
