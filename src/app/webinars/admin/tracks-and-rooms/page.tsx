import React from 'react';
import { Sliders, Video, Radio, ShieldCheck } from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { CONFERENCES_DETAILED } from '@/data/conference-system';

export default function AdminTracksAndRoomsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="Infrastructure Management"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinar Hub', href: '/webinars' },
          { label: 'Admin', href: '/webinars/admin' },
          { label: 'Tracks & Rooms' }
        ]}
        icon={<Sliders className="w-6 h-6 text-amber-400" />}
        title="Virtual Breakout Halls &amp; WebRTC Allocation"
        subtitle="Provision secure WebRTC room tokens, set concurrent capacity limits, configure recording permissions, and monitor active hall streams."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONFERENCES_DETAILED[0].tracks.map(t => (
            <div key={t.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-teal-400">{t.roomCode}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Active WebRTC Token
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{t.name}</h3>
              <p className="text-xs text-slate-300">{t.theme}</p>
              <div className="text-xs text-slate-400 font-mono">Chair: {t.chair} ({t.chairAffiliation})</div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 text-[11px] text-slate-400 font-mono">
                Key: `kew-token-live-${t.roomCode.toLowerCase()}-sec256`
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
