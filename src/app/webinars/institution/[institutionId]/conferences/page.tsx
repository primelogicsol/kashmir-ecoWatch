import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Layers, PlusCircle, Calendar } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { InstitutionSubNav } from '@/components/webinars/InstitutionSubNav';
import { VERIFIED_INSTITUTIONS, CONFERENCES_DETAILED } from '@/data/conference-system';

export function generateStaticParams() {
  return VERIFIED_INSTITUTIONS.map(inst => ({ institutionId: inst.id }));
}

interface Props {
  params: Promise<{ institutionId: string }>;
}

export default async function InstitutionConferencesPage({ params }: Props) {
  const { institutionId } = await params;
  const institution = VERIFIED_INSTITUTIONS.find(i => i.id === institutionId);

  if (!institution) notFound();

  const conferences = CONFERENCES_DETAILED.filter(c => c.hostInstitution.id === institution.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Institutional Conference Catalog"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: institution.name, href: `/webinars/institution/${institution.id}/dashboard` },
          { label: 'Hosted Conferences' }
        ]}
        icon={<Layers className="w-6 h-6 text-teal-400" />}
        title={`Hosted Conferences • ${institution.name}`}
        subtitle="Catalog of all approved, ongoing, and completed scientific conferences hosted by this institution."
      />

      <WebinarNav />
      <InstitutionSubNav institution={institution} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Active &amp; Archived Events ({conferences.length})</h3>
          <Link
            href="/webinars/host-a-conference"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Host New Conference</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {conferences.map(c => (
            <div key={c.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-teal-300">{c.dates.display}</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-500/10 text-teal-300">
                  {c.status}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">{c.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>
              <div className="pt-2 flex items-center gap-3">
                <Link
                  href={`/webinars/conferences/${c.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
                >
                  Manage Conference Hub
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
