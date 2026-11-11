import React from 'react';
import Link from 'next/link';
import { Video } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';

export default function AdminWebinarsIndex() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Single Webinars &amp; Lectures"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Webinars' }
        ]}
        icon={<Video className="w-6 h-6 text-amber-400" />}
        title="Webinars &amp; Technical Lectures Catalog"
        subtitle="Manage standalone lectures, panel discussions, and symposiums."
      />
      <WebinarNav />
      <AdminSubNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        {SCIENTIFIC_WEBINARS.map(w => (
          <div key={w.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">{w.title}</div>
              <div className="text-xs text-slate-400 font-mono">{w.dateDisplay} • {w.discipline}</div>
            </div>
            <Link href={`/webinars/${w.id}`} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-slate-950">
              Manage Dossier
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
