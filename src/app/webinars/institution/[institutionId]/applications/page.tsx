import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FileCheck2, PlusCircle, Clock } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { InstitutionSubNav } from '@/components/webinars/InstitutionSubNav';
import { VERIFIED_INSTITUTIONS, HOSTING_APPLICATIONS } from '@/data/conference-system';

export function generateStaticParams() {
  return VERIFIED_INSTITUTIONS.map(inst => ({ institutionId: inst.id }));
}

interface Props {
  params: Promise<{ institutionId: string }>;
}

export default async function InstitutionApplicationsPage({ params }: Props) {
  const { institutionId } = await params;
  const institution = VERIFIED_INSTITUTIONS.find(i => i.id === institutionId);

  if (!institution) notFound();

  const applications = HOSTING_APPLICATIONS.filter(a => a.institutionId === institution.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Hosting Application Lifecycle"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: institution.name, href: `/webinars/institution/${institution.id}/dashboard` },
          { label: 'Applications' }
        ]}
        icon={<FileCheck2 className="w-6 h-6 text-teal-400" />}
        title={`Hosting Applications • ${institution.name}`}
        subtitle="Track submitted conference proposals, steering committee evaluations, allocated virtual room keys, and administrative review decisions."
      />

      <WebinarNav />
      <InstitutionSubNav institution={institution} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-teal-300 font-bold">{app.id}</span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  app.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {app.status}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{app.conferenceTitle}</h4>
              <p className="text-xs text-slate-300">{app.scientificScope}</p>
              <div className="text-xs text-slate-400 font-mono">
                Proposed Dates: {app.proposedDates.display} • Requested Halls: {app.tracksCount} • Target: {app.expectedAttendees} Delegates
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-xs text-slate-300">
                <strong className="text-teal-400">Review Notes:</strong> {app.reviewNotes || 'Pending committee assessment.'}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
