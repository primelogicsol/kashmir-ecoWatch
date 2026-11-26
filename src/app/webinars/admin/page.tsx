'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Award,
  BarChart3,
  Building2,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  HardDrive,
  Key,
  Lock,
  Radio,
  RefreshCw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Users,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { AdminSubNav } from '@/components/webinars/AdminSubNav';
import { Button } from '@/components/ui/Button';
import {
  CapacityPhaseId,
  CapacityProfile,
  EnvironmentMode,
  HallAuditEntry,
  HallRecordingRecord,
  HallRole,
  InstitutionalHostingRecord,
  InstitutionalLifecycleStage,
  RoomAllocationConfig,
} from '@/types/virtual-hall';

const LIFECYCLE_STAGES: { id: InstitutionalLifecycleStage; label: string }[] = [
  { id: '1_institution_registered', label: '1. Institution Registered' },
  { id: '2_institution_verified', label: '2. Institution Verified' },
  { id: '3_hosting_application_submitted', label: '3. Hosting Application Submitted' },
  { id: '4_admin_review_in_progress', label: '4. Admin Review in Progress' },
  { id: '5_resources_allocated', label: '5. Phase I Resources Allocated' },
  { id: '6_program_and_speakers_scheduled', label: '6. Program & Speakers Scheduled' },
  { id: '7_rehearsal_completed', label: '7. Green Room Rehearsal Completed' },
  { id: '8_live_session_active', label: '8. Live Session Delivery' },
  { id: '9_attendance_verified', label: '9. Real Attendance Logged' },
  { id: '10_proceedings_archived', label: '10. Recording & Proceedings Archived' },
];

export default function WebinarAdminPage() {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminActor, setAdminActor] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  const [activePhase, setActivePhase] = useState<CapacityPhaseId>('PHASE_I');
  const [capacityProfiles, setCapacityProfiles] = useState<Record<CapacityPhaseId, CapacityProfile> | null>(null);
  const [globalCounts, setGlobalCounts] = useState({
    activeLiveEvents: 0,
    activeDemoSandboxes: 0,
    totalConnectedPeers: 0,
    totalLiveDelegates: 0,
    activeRecordings: 0,
  });
  const [roomAllocations, setRoomAllocations] = useState<Record<string, RoomAllocationConfig>>({});
  const [hostingRecords, setHostingRecords] = useState<InstitutionalHostingRecord[]>([]);
  const [recordings, setRecordings] = useState<HallRecordingRecord[]>([]);
  const [auditLog, setAuditLog] = useState<HallAuditEntry[]>([]);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // HMAC Token Minter state
  const [tokenRoomId, setTokenRoomId] = useState('kew-conf-2027-cryo');
  const [tokenRole, setTokenRole] = useState<HallRole>('host');
  const [tokenEnv, setTokenEnv] = useState<EnvironmentMode>('live');
  const [tokenName, setTokenName] = useState('Authorized Session Chair');
  const [tokenAffiliation, setTokenAffiliation] = useState('Kashmir EcoWatch Scientific Secretariat');
  const [mintedToken, setMintedToken] = useState<string | null>(null);

  const fetchAdminState = useCallback(async () => {
    try {
      const res = await fetch('/api/webinars/admin?scope=admin', { cache: 'no-store' });
      if (!res.ok) {
        setIsAuthorized(false);
        setLoadingAuth(false);
        return;
      }
      const data = await res.json();
      setIsAuthorized(true);
      setAdminActor(data.adminActor || 'Administrator');
      setActivePhase(data.activePhase || 'PHASE_I');
      setCapacityProfiles(data.capacityProfiles || null);
      setGlobalCounts(data.globalCounts || globalCounts);
      setRoomAllocations(data.roomAllocations || {});
      setHostingRecords(data.hostingRecords || []);
      setRecordings(data.recordings || []);
      setAuditLog(data.auditLog || []);
    } catch {
      setIsAuthorized(false);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminState();
  }, [fetchAdminState]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError(null);
    const res = await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'unlock_admin_passcode', passcode }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      setPasscodeError(data.error || 'Invalid Administrator Passcode.');
      return;
    }
    setPasscode('');
    await fetchAdminState();
  };

  const handleLockSession = async () => {
    await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'lock_admin_session' }),
    });
    setIsAuthorized(false);
  };

  const handleMintToken = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'mint_room_token',
        roomId: tokenRoomId,
        role: tokenRole,
        environmentMode: tokenEnv,
        displayName: tokenName,
        affiliation: tokenAffiliation,
        ttlSeconds: 3600,
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setMintedToken(data.token);
      setStatusNotice(`Minted HMAC-SHA256 signed ${tokenRole} token for ${tokenRoomId}.`);
      fetchAdminState();
    } else {
      setStatusNotice(data.error || 'Token minting failed.');
    }
  };

  const handleUpdateRoom = async (roomId: string, patch: Partial<RoomAllocationConfig>) => {
    const res = await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_room_allocation', roomId, ...patch }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setStatusNotice(`Updated allocation for room ${roomId}.`);
      fetchAdminState();
    } else {
      setStatusNotice(data.error || 'Failed to update room allocation.');
    }
  };

  const handleUpdateHosting = async (recordId: string, patch: Record<string, unknown>) => {
    const res = await fetch('/api/webinars/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_hosting_record', recordId, ...patch }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setStatusNotice('Updated institutional hosting record.');
      fetchAdminState();
    } else {
      setStatusNotice(data.error || 'Overbooking or validation block triggered.');
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center text-xs font-mono">
        Verifying server-side administrator session...
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-teal-500/30 rounded-3xl p-7 space-y-5 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-teal-950 border border-teal-500/40 text-teal-300 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
              Server-Enforced HttpOnly Session Gate
            </span>
            <h1 className="text-xl font-black text-white">Virtual Hall Governance Console</h1>
            <p className="text-xs text-slate-400">
              Authenticate to manage Phase I capacity ceilings, free institutional hosting approvals, 1 GB recording quotas, and signed HMAC room tokens.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter administrator security key..."
              className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
              autoFocus
            />
            {passcodeError && (
              <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{passcodeError}</span>
              </p>
            )}
            <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-2.5">
              <Key className="w-4 h-4 mr-1.5" />
              Authenticate Server Session
            </Button>
          </form>

          <Link href="/webinars" className="block text-center text-xs text-slate-400 hover:text-white">
            &larr; Return to Scientific Webinars
          </Link>
        </div>
      </main>
    );
  }

  const activeProfile = capacityProfiles?.[activePhase];
  const totalRecordingBytes = recordings.reduce((s, r) => s + (r.sizeBytes || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Heading
        label={`Verified Server Session: ${adminActor}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Scientific Webinars', href: '/webinars' },
          { label: 'Virtual Hall Governance' },
        ]}
        icon={<ShieldCheck className="w-6 h-6 text-teal-400" />}
        title="Virtual Scientific Hall Resource &amp; Governance Console"
        subtitle="Enforce conservative Phase I operational capacity (10 delegates, 2 speakers, 1 track, 1 GB recording storage, $0 institutional hosting fee), mint signed HMAC room tokens, and oversee institutional lifecycles."
      />

      <WebinarNav />
      <AdminSubNav />

      <main className="kew-container-admin py-8 space-y-10">
        {statusNotice && (
          <div className="p-3.5 rounded-xl bg-teal-950/60 border border-teal-500/40 text-xs text-teal-200 flex items-center justify-between">
            <span>{statusNotice}</span>
            <button onClick={() => setStatusNotice(null)} className="font-mono text-teal-300">✕</button>
          </div>
        )}

        {/* Top Bar Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 flex-1">
            {[
              { label: 'Institutions', href: '/webinars/admin/institution-approvals', icon: Building2 },
              { label: 'Proposals', href: '/webinars/admin/conference-approvals', icon: CalendarCheck },
              { label: 'Scheduler', href: '/webinars/admin/conference-scheduler', icon: Calendar },
              { label: 'Abstracts', href: '/webinars/admin/abstracts-and-review', icon: FileCheck2 },
              { label: 'Tracks & Rooms', href: '/webinars/admin/tracks-and-rooms', icon: Sliders },
              { label: 'Recordings (1 GB)', href: '/webinars/admin/recordings', icon: HardDrive },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-xl p-3 flex items-center gap-2 text-xs font-semibold text-white"
                >
                  <Icon className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={fetchAdminState} className="border-white/15 text-xs text-slate-200">
              <RefreshCw className="w-3.5 h-3.5 mr-1" />
              Refresh
            </Button>
            <Button size="sm" variant="outline" onClick={handleLockSession} className="border-rose-500/30 text-xs text-rose-300">
              Sign Out
            </Button>
          </div>
        </div>

        {/* Honest Real-Time Server Telemetry (Zero fabricated "12/12 Mesh Nodes") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-teal-500/30 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-teal-400" />
              <span>Active Capacity Tier</span>
            </span>
            <div className="text-xl font-bold text-white font-mono">{activePhase.replace('_', ' ')}</div>
            <p className="text-[11px] text-teal-300 font-mono">
              {activeProfile?.maxConcurrentDelegates ?? 10} Del • {activeProfile?.maxInteractiveSpeakers ?? 2} Spk • 1 Track
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active Live / Sandbox Rooms</span>
            </span>
            <div className="text-xl font-bold text-white font-mono">
              {globalCounts.activeLiveEvents} Live / {globalCounts.activeDemoSandboxes} Demo
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Phase I Max Concurrent Live Events: {activeProfile?.maxConcurrentEvents ?? 1}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Connected Socket/WebRTC Peers</span>
            </span>
            <div className="text-xl font-bold text-white font-mono">
              {globalCounts.totalConnectedPeers} Connected
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Live Verified Delegates: {globalCounts.totalLiveDelegates}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              <span>Recording Quota Usage (1 GB Cap)</span>
            </span>
            <div className="text-xl font-bold text-white font-mono">
              {(totalRecordingBytes / (1024 * 1024)).toFixed(2)} MB / 1024 MB
            </div>
            <p className="text-[11px] text-emerald-400 font-mono">
              Hosting Charge: $0.00 Free Policy
            </p>
          </div>
        </div>

        {/* Phase I–IV Capacity Roadmap Matrix */}
        {capacityProfiles && (
          <section className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-white">
                  Controlled Capacity Scaling Roadmap (Server-Enforced)
                </h2>
                <p className="text-xs text-slate-400">
                  Phase I conservative limits are active by default. Higher phases remain locked until SFU media server load testing is verified.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
                Platform Hosting Fee Across All Phases: $0
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              {(Object.values(capacityProfiles) as CapacityProfile[]).map((p) => {
                const isCurrent = p.phase === activePhase;
                return (
                  <div
                    key={p.phase}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      isCurrent
                        ? 'bg-teal-950/30 border-teal-400/50'
                        : 'bg-slate-950/60 border-white/5 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-white">{p.phase.replace('_', ' ')}</span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          isCurrent
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isCurrent ? 'ACTIVE' : 'GATED'}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-300 space-y-0.5">
                      <div>Delegates: <strong>{p.maxConcurrentDelegates}</strong></div>
                      <div>Interactive Speakers: <strong>{p.maxInteractiveSpeakers}</strong></div>
                      <div>Tracks: <strong>{p.maxScientificTracks}</strong> • Breakouts: <strong>{p.maxBreakoutRooms}</strong></div>
                      <div>Podcast: <strong>{p.maxPodcastParticipants}</strong> • Workshop: <strong>{p.maxWorkshopParticipants}</strong></div>
                      <div>Storage Quota: <strong>{Math.round(p.institutionStorageQuotaBytes / (1024 * 1024 * 1024))} GB</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Per-Room Resource Allocation + HMAC Token Minter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Resource & Emergency Suspension Controls */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-400" />
              <span>Virtual Hall Resource Allocation &amp; Emergency Controls</span>
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {Object.values(roomAllocations).map((alloc) => (
                <div
                  key={alloc.roomId}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-teal-300">{alloc.roomId}</span>
                      <span className="ml-2 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {alloc.environmentMode}
                      </span>
                    </div>
                    <Link
                      href={`/webinars/room/${alloc.roomId}`}
                      className="text-[11px] text-teal-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Open Hall</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div>
                      <label className="text-slate-400 block text-[10px]">Max Delegates (1–10)</label>
                      <input
                        type="number"
                        min={1}
                        max={activeProfile?.maxConcurrentDelegates ?? 10}
                        value={alloc.maxConcurrentDelegates}
                        onChange={(e) =>
                          handleUpdateRoom(alloc.roomId, {
                            maxConcurrentDelegates: Number(e.target.value),
                          })
                        }
                        className="w-full mt-0.5 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block text-[10px]">Max Speakers (1–2)</label>
                      <input
                        type="number"
                        min={1}
                        max={activeProfile?.maxInteractiveSpeakers ?? 2}
                        value={alloc.maxInteractiveSpeakers}
                        onChange={(e) =>
                          handleUpdateRoom(alloc.roomId, {
                            maxInteractiveSpeakers: Number(e.target.value),
                          })
                        }
                        className="w-full mt-0.5 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateRoom(alloc.roomId, {
                            environmentMode: alloc.environmentMode === 'live' ? 'demo' : 'live',
                          })
                        }
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200"
                      >
                        Set {alloc.environmentMode === 'live' ? 'Demo' : 'Live'}
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateRoom(alloc.roomId, {
                            recordingAllowed: !alloc.recordingAllowed,
                          })
                        }
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200"
                      >
                        Rec: {alloc.recordingAllowed ? 'Allowed' : 'Disabled'}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        handleUpdateRoom(alloc.roomId, {
                          isSuspendedByAdmin: !alloc.isSuspendedByAdmin,
                        })
                      }
                      className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 ${
                        alloc.isSuspendedByAdmin
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      <ShieldAlert className="w-3 h-3" />
                      {alloc.isSuspendedByAdmin ? 'Lift Suspension' : 'Emergency Suspend'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real HMAC-SHA256 Room Token Generator */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-teal-400" />
                  <span>HMAC-SHA256 Signed Room Token Minter</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Issue expiring server-signed credentials for Live Session Hosts, Moderators, Producers, and Confirmed Speakers.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono">
                HMAC-SHA256
              </span>
            </div>

            <form onSubmit={handleMintToken} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Target Room</label>
                  <select
                    value={tokenRoomId}
                    onChange={(e) => setTokenRoomId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-teal-200"
                  >
                    {Object.keys(roomAllocations).map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Environment</label>
                  <select
                    value={tokenEnv}
                    onChange={(e) => setTokenEnv(e.target.value as EnvironmentMode)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                  >
                    <option value="live">Live Authorized Session</option>
                    <option value="demo">Demo Sandbox</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">RBAC Role (8 Roles)</label>
                  <select
                    value={tokenRole}
                    onChange={(e) => setTokenRole(e.target.value as HallRole)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                  >
                    <option value="host">Host / Conference Chair</option>
                    <option value="moderator">Scientific Moderator</option>
                    <option value="technical_producer">Technical Producer</option>
                    <option value="speaker">Confirmed Speaker</option>
                    <option value="institutional_admin">Institutional Host Admin</option>
                    <option value="delegate">Registered Delegate</option>
                    <option value="observer">Observer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Authorized Participant Name</label>
                  <input
                    type="text"
                    required
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Institution / Affiliation</label>
                <input
                  type="text"
                  required
                  value={tokenAffiliation}
                  onChange={(e) => setTokenAffiliation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
              >
                Mint Signed Room Token (1-Hour Expiry)
              </button>
            </form>

            {mintedToken && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/40 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] text-teal-300">
                  <span>Signed Room Access Token</span>
                  <Link
                    href={`/webinars/room/${tokenRoomId}?env=${tokenEnv}&token=${encodeURIComponent(mintedToken)}`}
                    className="underline font-bold"
                  >
                    Launch Hall With Token &rarr;
                  </Link>
                </div>
                <div className="p-2 rounded bg-slate-900 font-mono text-[10px] text-slate-300 break-all">
                  {mintedToken}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 10-Step Free Institutional Hosting Lifecycle Queue */}
        <section className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Free Institutional Hosting Lifecycle Queue ($0 Hosting Charge)
              </h3>
              <p className="text-xs text-slate-400">
                Verify institutions, enforce Phase I capacity allocations, prevent concurrent schedule overbooking, and advance lifecycle stages 1–10.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {hostingRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-3 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-teal-300">{rec.id}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono uppercase text-slate-200">
                      {rec.applicationStatus.replace(/_/g, ' ')}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        rec.verificationStatus === 'verified'
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      Inst: {rec.verificationStatus === 'pending' ? 'Pending Verification' : rec.verificationStatus.replace(/_/g, ' ')}
                    </span>
                    {rec.isCustomInstitution && (
                      <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 text-[10px] font-mono uppercase">
                        Custom Entry
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono">
                      Fee: $0
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    {rec.proposedStart.slice(0, 10)} &rarr; {rec.proposedEnd.slice(0, 10)}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{rec.conferenceTitle}</h4>
                  <div className="text-slate-400">
                    {rec.institutionName} ({rec.institutionCategory}
                    {rec.cityRegion || rec.country ? ` • ${[rec.cityRegion, rec.country].filter(Boolean).join(', ')}` : ''}
                    {' • '}{rec.domain}) • Contact: {rec.contactName} ({rec.contactEmail})
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center pt-1">
                  <div className="font-mono text-[11px] text-slate-300">
                    Allocated: {rec.allocatedDelegates} Del / {rec.allocatedSpeakers} Spk /{' '}
                    {rec.allocatedTracks} Track / 1 GB
                  </div>

                  <select
                    value={rec.lifecycleStage}
                    onChange={(e) =>
                      handleUpdateHosting(rec.id, { lifecycleStage: e.target.value })
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-teal-200"
                  >
                    {LIFECYCLE_STAGES.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {rec.verificationStatus !== 'verified' && (
                      <button
                        onClick={() =>
                          handleUpdateHosting(rec.id, {
                            verificationStatus: 'verified',
                            lifecycleStage: '2_institution_verified',
                          })
                        }
                        className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 font-semibold"
                      >
                        Verify Institution
                      </button>
                    )}
                    <button
                      onClick={() =>
                        handleUpdateHosting(rec.id, {
                          verificationStatus: 'documentation_requested',
                          applicationStatus: 'revisions_requested',
                          reviewNotes: 'Additional institutional verification documentation requested by KEW Secretariat.',
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-orange-950/60 hover:bg-orange-900/60 text-orange-200 border border-orange-500/30"
                    >
                      Request Docs
                    </button>
                    {rec.applicationStatus !== 'approved' && (
                      <button
                        onClick={() =>
                          handleUpdateHosting(rec.id, {
                            verificationStatus: 'verified',
                            applicationStatus: 'approved',
                            lifecycleStage: '5_resources_allocated',
                          })
                        }
                        className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve &amp; Allocate
                      </button>
                    )}
                    {rec.applicationStatus !== 'rejected' && (
                      <button
                        onClick={() =>
                          handleUpdateHosting(rec.id, {
                            applicationStatus: 'rejected',
                          })
                        }
                        className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-500/30"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Server Security & Attendance Audit Log */}
        <section className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Server-Side Governance &amp; Security Audit Log</span>
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {auditLog.map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-mono text-teal-400 mr-2">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                  <strong className="text-white mr-2">{entry.action}</strong>
                  <span className="text-slate-300">{entry.details}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 shrink-0">
                  {entry.actor} ({entry.environmentMode})
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
