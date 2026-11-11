import React from 'react';
import { notFound } from 'next/navigation';
import { Building2, Users, PlusCircle, ShieldCheck } from 'lucide-react';
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

export default async function InstitutionMembersPage({ params }: Props) {
  const { institutionId } = await params;
  const institution = VERIFIED_INSTITUTIONS.find(i => i.id === institutionId);

  if (!institution) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Institutional Staff &amp; Faculty Access"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: institution.name, href: `/webinars/institution/${institution.id}/dashboard` },
          { label: 'Members' }
        ]}
        icon={<Users className="w-6 h-6 text-teal-400" />}
        title={`${institution.name} • Faculty &amp; Administrators`}
        subtitle="Manage authorized staff, scientific committee representatives, session moderators, and peer reviewers permitted to administer events under this institution."
      />

      <WebinarNav />
      <InstitutionSubNav institution={institution} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Authorized Institutional Staff ({institution.members.length})</h3>
          <button className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 flex items-center gap-1.5">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Invite Researcher</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {institution.members.map(member => (
            <div key={member.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
                  {member.name.charAt(0)}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {member.role}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{member.name}</h4>
              <div className="text-xs text-teal-400 font-mono">{member.email}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
