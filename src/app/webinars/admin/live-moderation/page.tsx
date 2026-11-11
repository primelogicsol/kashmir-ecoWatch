import React from 'react';
import Link from 'next/link';
import { Video, Radio, ShieldCheck, MessageSquare } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';

export default function AdminLiveModerationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Live Floor Control"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Live Moderation' }
        ]}
        icon={<Video className="w-6 h-6 text-amber-400" />}
        title="Live Virtual Hall Moderation &amp; Stage Controls"
        subtitle="Manage active presenter feeds, mute non-speakers, control room locks, broadcast floor communiqués, and moderate live delegate questions."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white">Active Stage Console</h3>
          <p className="text-xs text-slate-300">
            Currently connected to <strong className="text-white">Western Himalayan Cryosphere Summit 2027 (Room A Plenary)</strong>.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/webinars/room/kew-conf-2027-cryo"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Launch Live Floor Controller</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
