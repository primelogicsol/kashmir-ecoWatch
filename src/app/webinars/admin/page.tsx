'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  Award,
  Building2,
  CalendarCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  Key,
  Layers,
  Lock,
  Radio,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  Unlock,
  Users,
  Video,
  XCircle,
  BarChart3
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { Button } from '@/components/ui/Button';

export default function WebinarAdminPage() {
  const [tokenRoomCode, setTokenRoomCode] = useState('CRYO-ROOM-A');
  const [tokenRole, setTokenRole] = useState<'Host' | 'Moderator' | 'Speaker' | 'Delegate'>('Speaker');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const [reviewQueue, setReviewQueue] = useState([
    {
      id: 'PROP-2027-8819',
      title: 'Subalpine Treeline Ecotone Shifts: Hangul Winter Habitat Preservation',
      proposer: 'Dr. Khursheed Ahmad (SKUAST-K)',
      format: 'Multi-Day Conference',
      submittedDate: '2027-05-24',
      status: 'Pending Review'
    },
    {
      id: 'PROP-2027-8820',
      title: 'InSAR Landslide Creep Monitoring Along National Highway 44',
      proposer: 'Er. R. K. Raina (Disaster Management Authority)',
      format: 'Technical Webinar',
      submittedDate: '2027-05-25',
      status: 'Pending Review'
    }
  ]);

  const auditLogs = [
    { time: '11:42:08 UTC', action: 'Expiring WebRTC Token Generated', user: 'Admin Secretariat', room: 'CRYO-CONF-2027' },
    { time: '11:30:15 UTC', action: 'Pre-Flight System Check Completed', user: 'System Worker', room: 'CRYO-ROOM-A' },
    { time: '10:15:22 UTC', action: 'Draft Session Schedule Validated', user: 'Admin Secretariat', room: 'Scheduler Engine' },
    { time: '09:28:01 UTC', action: 'Virtual Hall Pre-Flight Diagnostic Passed', user: 'Test Runner', room: 'CRYO-CONF-2027' },
    { time: '09:00:00 UTC', action: 'Cryptographic Certificate Engine Initialized', user: 'System Daemon', room: 'All Modules' }
  ];

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();
    const token = typeof window !== 'undefined' && window.btoa 
      ? `kew_jwt_${window.btoa(`${tokenRoomCode}:${tokenRole}:${Date.now() + 3600000}`)}`
      : `kew_jwt_mock_${Date.now()}`;
    setGeneratedToken(token);
  };

  const handleApprove = (id: string) => {
    setReviewQueue(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved / Active' } : p));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label="SuperAdmin Command & Telemetry • Scientific Secretariat"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Scientific Webinars', href: '/webinars' },
          { label: 'Administration & Governance' }
        ]}
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-amber-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                SUPERADMIN
              </span>
              <span className="text-white">Scientific Conference &amp;</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Webinar Command Center
              </span>
            </div>
          </div>
        }
        subtitle="Platform-wide governance for verified universities and research NGOs. Manage multi-tenant institution accreditations, conference proposals, conflict scheduling, double-blind abstract reviews, and expiring 256-bit WebRTC meeting tokens."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Quick Console Switcher Grid */}
        <section className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            Administrative Modules &amp; Sub-Consoles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Institution Approvals', href: '/webinars/admin/institution-approvals', icon: Building2, badge: '1 Pending' },
              { label: 'Conference Proposals', href: '/webinars/admin/conference-approvals', icon: CalendarCheck, badge: '2 Review' },
              { label: 'Conflict Scheduler', href: '/webinars/admin/conference-scheduler', icon: Calendar },
              { label: 'Abstract Review', href: '/webinars/admin/abstracts-and-review', icon: FileCheck2 },
              { label: 'Tracks & Rooms', href: '/webinars/admin/tracks-and-rooms', icon: Sliders },
              { label: 'Platform Analytics', href: '/webinars/admin/analytics', icon: BarChart3 }
            ].map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-slate-900/80 border border-white/10 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all hover:bg-slate-800/80 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="w-5 h-5 text-amber-400" />
                    {item.badge && (
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-white leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Real-time Telemetry Panels */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>WebRTC Mesh Nodes</span>
            </span>
            <div className="text-2xl font-bold text-white font-mono">12 / 12 Standby</div>
            <p className="text-[11px] text-emerald-400">Regional edge ready for 2027</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-slate-400" />
              <span>Active Concurrent Streams</span>
            </span>
            <div className="text-2xl font-bold text-slate-200 font-mono">0 Live Streams</div>
            <p className="text-[11px] text-teal-400 font-mono">Pre-flight testing mode</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Current Live Delegates</span>
            </span>
            <div className="text-2xl font-bold text-slate-200 font-mono">0 Active</div>
            <p className="text-[11px] text-slate-400">Opens with 2027 sessions</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Institutional Partners</span>
            </span>
            <div className="text-2xl font-bold text-amber-300 font-mono">0 Confirmed</div>
            <p className="text-[11px] text-slate-400">Applications under formal review</p>
          </div>
        </div>

        {/* Grid: Token Provisioning & Proposals Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Provisioning Engine */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-teal-400" />
                  <span>Expiring WebRTC Room Token Generator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Generate cryptographic JWT meeting keys with role-based microphone &amp; screen sharing claims.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">
                256-bit ECDSA
              </span>
            </div>

            <form onSubmit={handleGenerateToken} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Virtual Room Code</label>
                <select
                  value={tokenRoomCode}
                  onChange={(e) => setTokenRoomCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-teal-200 focus:outline-none focus:border-teal-500"
                >
                  <option value="CRYO-ROOM-A">CRYO-ROOM-A (Track A: Glaciology)</option>
                  <option value="CRYO-ROOM-B">CRYO-ROOM-B (Track B: Downstream Hydrology)</option>
                  <option value="CRYO-ROOM-C">CRYO-ROOM-C (Track C: GLOF Policy)</option>
                  <option value="WETLAND-WEB-2027">WETLAND-WEB-2027 (Wetland Webinar)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Security Role</label>
                <select
                  value={tokenRole}
                  onChange={(e) => setTokenRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Host">Host (Full floor control, mute all, lock room)</option>
                  <option value="Moderator">Moderator (Manage Q&amp;A, spotlight speakers)</option>
                  <option value="Speaker">Speaker (Mic, Cam &amp; Screen Sharing permissions)</option>
                  <option value="Delegate">Delegate (Listen, Chat &amp; Q&amp;A Submit)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-lg shadow-teal-500/20"
              >
                Mint Expiring Token (1-Hour Validity)
              </button>
            </form>

            {generatedToken && (
              <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-teal-400">
                  <span>Signed JWT Token</span>
                  <span>Expires in: 59m 59s</span>
                </div>
                <div className="text-[10px] font-mono text-slate-300 break-all bg-slate-900 p-2.5 rounded-lg border border-white/5">
                  {generatedToken}
                </div>
              </div>
            )}
          </div>

          {/* Proposals Queue */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Session Proposal Review Queue</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Scientific session applications awaiting administrative approval.
                </p>
              </div>
              <Link href="/webinars/admin/conference-approvals" className="text-xs text-teal-400 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {reviewQueue.map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-teal-300 font-bold">{item.id}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      item.status.includes('Approved') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <div className="text-[11px] text-slate-400">Proposer: {item.proposer}</div>
                  <div className="pt-2 flex items-center justify-end gap-2">
                    {item.status === 'Pending Review' && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
                      >
                        Approve &amp; Provision
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Immutable Security &amp; Attendance Audit Log</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">SHA-256 Block Chained</span>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/60 border border-white/5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-teal-400 font-semibold">{log.time}</span>
                  <span className="text-white font-medium">{log.action}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
                  <span>Room: <strong className="text-slate-300">{log.room}</strong></span>
                  <span>Actor: <strong className="text-teal-300">{log.user}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
