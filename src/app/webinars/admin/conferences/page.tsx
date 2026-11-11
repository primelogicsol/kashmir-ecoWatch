import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export default function AdminConferencesIndex() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="SuperAdmin Master Index"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Conferences' }
        ]}
        icon={<Layers className="w-6 h-6 text-amber-400" />}
        title="Scientific Conferences Master Directory"
        subtitle="Manage all multi-day conferences across KEW and partner institutions."
      />
      <WebinarNav />
      <AdminSubNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        {CONFERENCES_DETAILED.map(c => (
          <div key={c.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">{c.title}</div>
              <div className="text-xs text-slate-400 font-mono">{c.dates.display} • {c.hostInstitution.name}</div>
            </div>
            <Link href={`/webinars/conferences/${c.id}`} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-slate-950">
              Manage
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
