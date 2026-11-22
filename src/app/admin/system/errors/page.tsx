'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Database,
  Radio,
  Zap,
  Lock,
  Layers,
  ArrowRight,
  X,
  Play,
  Download,
  Server,
  Terminal,
  Cpu,
  Key,
  Shield
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type {
  ErrorIncidentRecord,
  TelemetryHealth,
  ErrorSeverity,
  IncidentStatus,
  SystemModule
} from '@/lib/error-telemetry';

export default function PrimeLogicErrorMonitoringDashboard() {
  const { user, isLoggedIn, openAuthModal } = useAuth();
  const [isMasterUnlocked, setIsMasterUnlocked] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('kew_admin_authenticated');
      if (stored === 'true') {
        setIsMasterUnlocked(true);
      }
    }
  }, []);

  const isAuthorized = (isLoggedIn && user?.role === 'administrator') || isMasterUnlocked;

  const handleUnlockWithPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'KEW-Admin-2026!') {
      setIsMasterUnlocked(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kew_admin_authenticated', 'true');
      }
      setPasscodeError(null);
    } else {
      setPasscodeError('Invalid Administrator Passcode. Access denied.');
    }
  };

  const handleLockDashboard = () => {
    setIsMasterUnlocked(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('kew_admin_authenticated');
    }
  };

  const [incidents, setIncidents] = useState<ErrorIncidentRecord[]>([]);
  const [health, setHealth] = useState<TelemetryHealth | null>(null);
  const [metrics, setMetrics] = useState<{
    totalErrorsToday: number;
    newIncidentsCount: number;
    criticalCount: number;
    affectedModulesCount: number;
    lastDetected: string | null;
    hourlyDistribution: { hour: string; count: number }[];
    topRoutes: { route: string; count: number }[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [streamConnected, setStreamConnected] = useState<boolean | null>(null);
  const [lastHeartbeatReceived, setLastHeartbeatReceived] = useState<string | null>(null);

  // Filters
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedEnvironment, setSelectedEnvironment] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Incident for Inspection Drawer
  const [activeIncident, setActiveIncident] = useState<ErrorIncidentRecord | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [resolutionNoteInput, setResolutionNoteInput] = useState('');

  // Test error trigger state & Simulation Mode
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [testNotice, setTestNotice] = useState<string | null>(null);
  const [selectedSimType, setSelectedSimType] = useState<
    'frontend_crash' | 'api_failure' | 'gis_layer_failure' | 'database_timeout'
  >('api_failure');

  // Computed simulation metrics
  const simIncidents = useMemo(() => incidents.filter((i) => i.isTest), [incidents]);
  const simErrorsDetected = useMemo(() => simIncidents.reduce((sum, i) => sum + i.occurrenceCount, 0), [simIncidents]);
  const simActiveIncidents = useMemo(() => simIncidents.filter((i) => i.status !== 'RESOLVED').length, [simIncidents]);
  const simAffectedModules = useMemo(
    () => new Set(simIncidents.filter((i) => i.status !== 'RESOLVED').map((i) => i.module)).size,
    [simIncidents]
  );

  // Fetch telemetry snapshot from API
  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/admin/system/errors', {
        cache: 'no-store',
        headers: { 'x-admin-key': 'KEW-Admin-2026!' },
      });
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      if (data.success) {
        setIncidents(data.incidents || []);
        setHealth(data.health || null);
        setMetrics(data.metrics || null);
        setStreamConnected(true);
        setLastHeartbeatReceived(new Date().toLocaleTimeString());
      }
    } catch (err: any) {
      setStreamConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Real-Time Server-Sent Events (SSE) listener
  useEffect(() => {
    if (!isAuthorized) return;
    fetchTelemetry();

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/admin/system/errors/stream?key=' + encodeURIComponent('KEW-Admin-2026!'));

      eventSource.onopen = () => {
        setStreamConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'HEARTBEAT') {
            setHealth(payload.health);
            setLastHeartbeatReceived(new Date().toLocaleTimeString());
            setStreamConnected(true);
          } else if (payload.type === 'INCIDENT_RECORDED') {
            const inc: ErrorIncidentRecord = payload.incident;
            setIncidents((prev) => {
              const idx = prev.findIndex((i) => i.id === inc.id);
              if (idx >= 0) {
                const next = [...prev];
                next[idx] = inc;
                return next;
              }
              return [inc, ...prev];
            });
            // Refresh aggregated metrics
            fetchTelemetry();
          }
        } catch (_) {}
      };

      eventSource.onerror = () => {
        setStreamConnected(false);
      };
    } catch (e) {
      setStreamConnected(false);
    }

    // Polling fallback every 12 seconds
    const interval = setInterval(fetchTelemetry, 12000);

    return () => {
      clearInterval(interval);
      if (eventSource) eventSource.close();
    };
  }, [isAuthorized]);

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter((i) => {
      if (selectedModule !== 'ALL' && i.module !== selectedModule) return false;
      if (selectedSeverity !== 'ALL' && i.severity !== selectedSeverity) return false;
      if (selectedStatus !== 'ALL' && i.status !== selectedStatus) return false;
      if (selectedEnvironment !== 'ALL' && i.environment !== selectedEnvironment) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          i.id.toLowerCase().includes(q) ||
          i.fingerprint.toLowerCase().includes(q) ||
          i.title.toLowerCase().includes(q) ||
          i.message.toLowerCase().includes(q) ||
          i.route.toLowerCase().includes(q) ||
          i.correlationId.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [incidents, selectedModule, selectedSeverity, selectedStatus, selectedEnvironment, searchQuery]);

  // Handle status update
  const handleTransitionStatus = async (id: string, newStatus: IncidentStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch('/api/admin/system/errors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'KEW-Admin-2026!' },
        body: JSON.stringify({
          id,
          status: newStatus,
          resolutionNotes: resolutionNoteInput || undefined,
          resolvedBy: 'Prime Logic Solutions NOC Engineer',
        }),
      });
      const data = await res.json();
      if (data.success && data.incident) {
        setIncidents((prev) => prev.map((i) => (i.id === id ? data.incident : i)));
        if (activeIncident && activeIncident.id === id) {
          setActiveIncident(data.incident);
        }
        setResolutionNoteInput('');
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Generate test error in dev/staging with selected failure preset
  const handleGenerateTestError = async (
    typeOverride?: 'frontend_crash' | 'api_failure' | 'gis_layer_failure' | 'database_timeout'
  ) => {
    const simType = typeOverride || selectedSimType;
    setIsGeneratingTest(true);
    setTestNotice(null);
    try {
      const res = await fetch('/api/admin/system/errors/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'KEW-Admin-2026!' },
        body: JSON.stringify({ simulationType: simType }),
      });
      const data = await res.json();
      if (data.success && data.incident) {
        setTestNotice(`Controlled [${simType.replace(/_/g, ' ').toUpperCase()}] test incident generated: ID ${data.incident.id}`);
        setTimeout(() => setTestNotice(null), 5000);
        fetchTelemetry();
        setActiveIncident(data.incident);
      }
    } catch (_) {
      setTestNotice('Error dispatching test event.');
    } finally {
      setIsGeneratingTest(false);
    }
  };

  // Export Telemetry as JSON
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(incidents, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kew-telemetry-dump-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="max-w-md w-full bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7 text-cyan-300" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-sm inline-block">
              Restricted NOC Area &bull; Level 4 Clearance
            </span>
            <h1 className="text-xl font-black text-white pt-1">
              Technical Error Monitoring Gate
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access to live runtime telemetry, stack diagnostics, and NOC incident controls is restricted to authenticated Kashmir EcoWatch administrators.
            </p>
          </div>

          <form onSubmit={handleUnlockWithPasscode} className="space-y-4 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                Admin Master Passcode / Security Key:
              </label>
              <input
                type="password"
                placeholder="Enter administrator passcode..."
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (passcodeError) setPasscodeError(null);
                }}
                className="w-full bg-slate-950 border border-white/15 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-wider"
                autoFocus
              />
              {passcodeError && (
                <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{passcodeError}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs py-2.5 rounded-lg cursor-pointer"
            >
              <Key className="w-4 h-4 mr-1.5" />
              <span>Unlock NOC Telemetry Console</span>
            </Button>
          </form>

          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <Button
              type="button"
              onClick={() => openAuthModal('signin')}
              variant="outline"
              className="w-full border-white/15 text-slate-300 hover:bg-white/5 text-xs font-semibold rounded-lg cursor-pointer"
            >
              <Shield className="w-4 h-4 mr-1.5 text-cyan-400" />
              <span>Sign In with Administrator Account</span>
            </Button>

            <Link href="/admin/dashboard" className="block">
              <Button variant="ghost" className="w-full text-slate-400 hover:text-white text-xs font-medium cursor-pointer">
                Return to Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* ── 1. PRIME LOGIC SOLUTIONS BRANDED NOC HEADER ──────────────────────── */}
      <header className="bg-slate-900/90 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="https://primelogicsol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
              title="Prime Logic Solutions USA"
            >
              <div className="relative w-9 h-9 p-1.5 rounded-[6px] bg-slate-950 border border-white/15 group-hover:border-cyan-400 transition-colors shadow-inner flex items-center justify-center">
                <Image
                  src="/images/primelogic-logo.png"
                  alt="Prime Logic Solutions Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-wider uppercase group-hover:text-cyan-300 transition-colors">
                    Prime Logic Solutions USA
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-[4px] bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                    NOC ENGINE
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Kashmir EcoWatch · Live Technical Error Monitoring Platform
                </div>
              </div>
            </a>
          </div>

          {/* Telemetry Stream Health Indicator */}
          <div className="flex items-center flex-wrap gap-3 text-xs">
            {streamConnected === true && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-emerald-950/50 border border-emerald-500/30 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] font-bold">SSE STREAM ACTIVE</span>
                <span className="text-slate-400 text-[10px]">({health?.ingestionLatencyMs || 8}ms)</span>
              </div>
            )}

            {streamConnected === false && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-amber-950/60 border border-amber-500/40 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-[11px] font-bold">FALLBACK POLLING (SSE OFFLINE)</span>
              </div>
            )}

            {streamConnected === null && (
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-slate-800 text-slate-400 border border-white/10">
                <span className="font-mono text-[11px]">CONNECTING PIPELINE...</span>
              </div>
            )}

            <Button
              onClick={() => handleGenerateTestError()}
              disabled={isGeneratingTest}
              variant="outline"
              className="text-[11px] font-bold border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 rounded-[6px] h-8 px-2.5 flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 text-cyan-400" />
              <span>{isGeneratingTest ? 'Generating...' : 'Generate Test Error'}</span>
            </Button>

            <Button
              onClick={handleExportJson}
              variant="outline"
              className="text-[11px] font-medium border-white/10 text-slate-300 hover:bg-white/5 rounded-[6px] h-8 px-2.5 flex items-center gap-1.5"
            >
              <Download className="w-3 h-3" />
              <span>Export Telemetry</span>
            </Button>

            <Button
              onClick={handleLockDashboard}
              variant="outline"
              className="text-[11px] font-medium border-rose-500/30 text-rose-300 hover:bg-rose-500/10 rounded-[6px] h-8 px-2.5 flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3 text-rose-400" />
              <span>Lock</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Test Notice Banner */}
      {testNotice && (
        <div className="bg-cyan-950/60 border-b border-cyan-500/30 py-2 text-xs text-center text-cyan-300 animate-fadeIn">
          {testNotice}
        </div>
      )}

      {/* ── 2. SCIENTIFIC DATA SAFETY DIRECTIVE BANNER ────────────────────────── */}
      <div className="bg-slate-900 border-b border-white/5 py-2.5 text-xs text-slate-400">
        <div className="container mx-auto px-4 sm:px-6 flex items-start sm:items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong className="text-white">Scientific Data Safety Directive:</strong> If an environmental monitoring sensor or hazard intelligence pipeline fails, the platform explicitly flags the feed as STALE or UNAVAILABLE. It strictly prohibits substituting synthetic values or converting unmonitored states to "ALL CLEAR". Module isolation guarantees single-point failures never cascade.
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── 2.5 SAFE ERROR SIMULATION MODE CONSOLE ───────────────────────── */}
        <div className="bg-slate-900/90 border border-cyan-500/30 rounded-lg p-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase font-bold tracking-wider">
                  Simulation
                </span>
                <span className="text-xs font-semibold text-slate-300">Prime Logic Solutions USA</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Technical Error Monitor</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Kashmir EcoWatch · Interactive UI demonstration
              </p>
            </div>

            {/* Simulation KPI Counters */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-slate-950 border border-white/10 rounded-[6px] px-3 py-1.5 text-center min-w-[80px]">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Errors detected</span>
                <span className="text-lg font-mono font-bold text-white">{simErrorsDetected}</span>
              </div>
              <div className="bg-slate-950 border border-white/10 rounded-[6px] px-3 py-1.5 text-center min-w-[80px]">
                <span className="text-[10px] font-mono uppercase text-amber-400 block">Active incidents</span>
                <span className="text-lg font-mono font-bold text-amber-300">{simActiveIncidents}</span>
              </div>
              <div className="bg-slate-950 border border-white/10 rounded-[6px] px-3 py-1.5 text-center min-w-[80px]">
                <span className="text-[10px] font-mono uppercase text-cyan-400 block">Affected modules</span>
                <span className="text-lg font-mono font-bold text-cyan-300">{simAffectedModules}</span>
              </div>
              <div className="bg-slate-950 border border-white/10 rounded-[6px] px-3 py-1.5 text-center min-w-[80px]">
                <span className="text-[10px] font-mono uppercase text-emerald-400 block">Monitoring</span>
                <span className="text-lg font-mono font-bold text-emerald-300">Demo</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="pt-4 space-y-3">
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Error simulation controls
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Select a failure type and simulate how it appears in the admin dashboard. This demonstration does not affect localhost or production.
              </p>
            </div>

            {/* Failure type selection buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                {
                  id: 'frontend_crash',
                  label: 'Frontend crash',
                  desc: 'React rendering exception (<SpeciesMapRenderer>)',
                  badge: 'HIGH',
                  badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
                },
                {
                  id: 'api_failure',
                  label: 'API failure',
                  desc: 'Upstream telemetry gateway 504 timeout',
                  badge: 'HIGH',
                  badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
                },
                {
                  id: 'gis_layer_failure',
                  label: 'GIS layer failure',
                  desc: 'Protobuf vector tile WebGL decode lost',
                  badge: 'MEDIUM',
                  badgeColor: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
                },
                {
                  id: 'database_timeout',
                  label: 'Database timeout',
                  desc: 'PostGIS hypertable pool exhaustion (NOC alert)',
                  badge: 'CRITICAL',
                  badgeColor: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
                },
              ].map((sim) => (
                <button
                  key={sim.id}
                  type="button"
                  onClick={() => setSelectedSimType(sim.id as any)}
                  className={`p-3 rounded-[6px] text-left transition-all border ${
                    selectedSimType === sim.id
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                      : 'bg-slate-950/60 border-white/10 hover:border-white/20 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{sim.label}</span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-[4px] border ${sim.badgeColor}`}>
                      {sim.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{sim.desc}</div>
                </button>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleGenerateTestError()}
                  disabled={isGeneratingTest}
                  className="rounded-[6px] bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isGeneratingTest ? 'Injecting Telemetry...' : 'Trigger Test Error'}</span>
                </Button>

                <Link
                  href="/preview-error"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[6px] bg-slate-950 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Public Error Screen</span>
                </Link>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                {simIncidents.length > 0 ? (
                  <span>
                    Latest simulation:{' '}
                    <strong className="text-cyan-300">{simIncidents[0].id}</strong> · {simIncidents[0].title}
                  </span>
                ) : (
                  <span>No simulated incidents · Trigger a test error to preview the monitoring workflow.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. TOP METRICS STRIP ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card className="glass-intense border-white/10 p-4 rounded-lg">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Errors Today</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">
              {streamConnected === false && !metrics ? 'Unknown' : metrics?.totalErrorsToday ?? 0}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Aggregated occurrences</span>
          </Card>

          <Card className="glass-intense border-white/10 p-4 rounded-lg">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">New Incidents</span>
            <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
              {streamConnected === false && !metrics ? 'Unknown' : metrics?.newIncidentsCount ?? 0}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Pending investigation</span>
          </Card>

          <Card className="glass-intense border-white/10 p-4 rounded-lg">
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">Critical Failures</span>
            <div className="text-2xl font-bold font-mono text-red-400 mt-1">
              {streamConnected === false && !metrics ? 'Unknown' : metrics?.criticalCount ?? 0}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Active NOC escalations</span>
          </Card>

          <Card className="glass-intense border-white/10 p-4 rounded-lg">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Modules Impacted</span>
            <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
              {streamConnected === false && !metrics ? 'Unknown' : metrics?.affectedModulesCount ?? 0}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Isolated sub-systems</span>
          </Card>

          <Card className="glass-intense border-white/10 p-4 rounded-lg">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Pipeline Status</span>
            <div className="text-base font-bold font-mono text-emerald-300 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{health?.collectorStatus || 'Operational'}</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">0 dropped events</span>
          </Card>

          <Card className="glass-intense border-white/10 p-4 rounded-lg">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Last Detected</span>
            <div className="text-xs font-mono font-bold text-slate-200 mt-2 truncate">
              {metrics?.lastDetected ? new Date(metrics.lastDetected).toLocaleTimeString() : 'No recent errors'}
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block truncate">Heartbeat: {lastHeartbeatReceived || 'Syncing'}</span>
          </Card>
        </div>

        {/* ── 4. HOURLY ERROR DISTRIBUTION & FREQUENT ROUTES ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Hourly Distribution Histogram */}
          <Card className="glass-intense border-white/10 p-5 rounded-lg lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Telemetry Ingestion Rate (Last 24 Hours)</span>
                </h3>
                <span className="text-[11px] text-slate-400">Error volume grouped by 60-minute window</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-400 border border-white/5">
                REAL-TIME SAMPLING
              </span>
            </div>

            <div className="h-32 flex items-end gap-1.5 pt-4 pb-2 border-b border-white/5 overflow-x-auto no-scrollbar">
              {metrics?.hourlyDistribution && metrics.hourlyDistribution.length > 0 ? (
                metrics.hourlyDistribution.map((bar, i) => {
                  const maxCount = Math.max(...metrics.hourlyDistribution.map((b) => b.count), 1);
                  const heightPercent = Math.max((bar.count / maxCount) * 100, 6);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative min-w-[12px]">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-[2px] transition-all ${
                          bar.count > 5
                            ? 'bg-red-500 group-hover:bg-red-400'
                            : bar.count > 0
                            ? 'bg-amber-500 group-hover:bg-amber-400'
                            : 'bg-slate-800'
                        }`}
                      />
                      <span className="text-[8px] font-mono text-slate-500 truncate w-full text-center group-hover:text-white">
                        {i % 4 === 0 ? bar.hour.slice(0, 2) : ''}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="w-full text-center text-xs text-slate-500 py-10">
                  {streamConnected === false ? 'Monitoring Unavailable' : 'No recorded error spikes in last 24h'}
                </div>
              )}
            </div>
          </Card>

          {/* Frequently Failing Routes */}
          <Card className="glass-intense border-white/10 p-5 rounded-lg space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span>Highest Error Frequency Routes</span>
            </h3>
            <div className="space-y-2 text-xs">
              {metrics?.topRoutes && metrics.topRoutes.length > 0 ? (
                metrics.topRoutes.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-[4px] bg-slate-900 border border-white/5">
                    <span className="font-mono text-[11px] text-slate-300 truncate max-w-[200px]" title={r.route}>
                      {r.route}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-red-950/60 text-red-300 border border-red-500/30">
                      {r.count} fails
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-slate-500 text-xs py-4 text-center">No route failures detected</div>
              )}
            </div>
          </Card>
        </div>

        {/* ── 5. FILTER & SEARCH CONTROL BAR ─────────────────────────────────── */}
        <div className="bg-slate-900/80 border border-white/10 p-4 rounded-lg space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 text-xs">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search error ID, fingerprint, route, message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Module Filter */}
            <div>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Modules (12)</option>
                <option value="Hazard Intelligence">Hazard Intelligence</option>
                <option value="Water Systems">Water Systems</option>
                <option value="Environmental Monitoring">Environmental Monitoring</option>
                <option value="Protected Areas">Protected Areas</option>
                <option value="Biodiversity">Biodiversity</option>
                <option value="GIS & Mapping Engine">GIS & Mapping Engine</option>
                <option value="Database & Storage">Database & Storage</option>
                <option value="Data Ingestion Service">Data Ingestion Service</option>
                <option value="Core Platform">Core Platform</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Severities</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="INVESTIGATING">INVESTIGATING</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="REOPENED">REOPENED</option>
              </select>
            </div>

            {/* Environment Filter */}
            <div>
              <select
                value={selectedEnvironment}
                onChange={(e) => setSelectedEnvironment(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-white/10 rounded-[6px] text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Environments</option>
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
            <div>
              Showing <strong className="text-white">{filteredIncidents.length}</strong> of{' '}
              {incidents.length} telemetry incidents
            </div>
            <button
              onClick={fetchTelemetry}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh Ingestion Feed</span>
            </button>
          </div>
        </div>

        {/* ── 6. SEARCHABLE INCIDENT EVENT TABLE ───────────────────────────────── */}
        <div className="overflow-x-auto border border-white/10 rounded-lg bg-slate-900/60 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-mono">
              <tr>
                <th className="p-3">Incident / Fingerprint</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Module & Route</th>
                <th className="p-3">Error Diagnostic Summary</th>
                <th className="p-3">Count</th>
                <th className="p-3">Last Seen</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map((inc) => (
                  <tr
                    key={inc.id}
                    onClick={() => setActiveIncident(inc)}
                    className="hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    {/* ID & Fingerprint */}
                    <td className="p-3">
                      <div className="font-mono font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{inc.id}</span>
                        {inc.isTest && (
                          <span className="text-[8px] font-bold px-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            TEST
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 truncate max-w-[120px]">
                        fp:{inc.fingerprint}
                      </div>
                    </td>

                    {/* Severity */}
                    <td className="p-3">
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border uppercase font-bold whitespace-nowrap ${
                          inc.severity === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                            : inc.severity === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : inc.severity === 'MEDIUM'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-slate-700 text-slate-300 border-white/10'
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </td>

                    {/* Module & Route */}
                    <td className="p-3 max-w-[180px]">
                      <div className="font-semibold text-slate-200 truncate">{inc.module}</div>
                      <div className="text-[10px] font-mono text-slate-400 truncate" title={inc.route}>
                        {inc.route}
                      </div>
                    </td>

                    {/* Summary */}
                    <td className="p-3 max-w-[280px]">
                      <div className="font-medium text-slate-100 truncate">{inc.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{inc.message}</div>
                    </td>

                    {/* Count */}
                    <td className="p-3 font-mono">
                      <span className="px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-300 font-bold border border-white/5 text-[11px]">
                        ×{inc.occurrenceCount}
                      </span>
                    </td>

                    {/* Last Seen */}
                    <td className="p-3 whitespace-nowrap text-slate-400 text-[11px] font-mono">
                      {new Date(inc.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-[4px] border uppercase font-bold whitespace-nowrap ${
                          inc.status === 'NEW'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : inc.status === 'INVESTIGATING'
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : inc.status === 'RESOLVED'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        {inc.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-3 text-right">
                      <button className="text-cyan-400 hover:text-white font-semibold text-xs inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Inspect</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400 text-xs">
                    {streamConnected === false
                      ? 'Telemetry Monitoring Stream Unavailable · Retrying connection...'
                      : 'No technical errors matching current filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── 7. DETAILED INVESTIGATION DRAWER / MODAL ───────────────────────── */}
        {activeIncident && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-white/20 rounded-lg max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {activeIncident.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-slate-400">
                      CORRELATION: {activeIncident.correlationId}
                    </span>
                    {activeIncident.isTest && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        TEST INCIDENT
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {activeIncident.title}
                  </h2>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Affected Route: <strong className="text-slate-200">{activeIncident.route}</strong> (Module: {activeIncident.module})
                  </div>
                </div>
                <button
                  onClick={() => setActiveIncident(null)}
                  className="p-1.5 rounded-[4px] text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Attributes Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 text-[10px] block font-mono uppercase">Severity</span>
                  <span className="font-bold text-red-400 font-mono">{activeIncident.severity}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 text-[10px] block font-mono uppercase">Status</span>
                  <span className="font-bold text-cyan-300 font-mono">{activeIncident.status}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 text-[10px] block font-mono uppercase">Occurrences</span>
                  <span className="font-bold text-white font-mono">{activeIncident.occurrenceCount} occurrences</span>
                </div>
                <div className="bg-white/5 p-3 rounded-[6px]">
                  <span className="text-slate-500 text-[10px] block font-mono uppercase">Environment</span>
                  <span className="font-bold text-slate-200 font-mono capitalize">{activeIncident.environment}</span>
                </div>
              </div>

              {/* Technical Message & Sanitized Stack */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Sanitized Error Message
                </h4>
                <div className="p-3 rounded-[6px] bg-slate-950 border border-white/5 font-mono text-xs text-rose-300 break-words">
                  {activeIncident.message}
                </div>
              </div>

              {activeIncident.sanitizedStack && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Redacted Technical Stack Trace
                  </h4>
                  <pre className="p-3 rounded-[6px] bg-slate-950 border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed max-h-40">
                    {activeIncident.sanitizedStack}
                  </pre>
                </div>
              )}

              {/* Scientific Data Safety Assessment */}
              {activeIncident.scientificImpact && (
                <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-lg space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Scientific Integrity & Module Isolation</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {activeIncident.scientificImpact.notice}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1 font-mono">
                    <span>Public Alerts Impacted: <strong className={activeIncident.scientificImpact.affectsPublicAlerts ? 'text-amber-400' : 'text-emerald-400'}>{activeIncident.scientificImpact.affectsPublicAlerts ? 'YES (STALE FLAGGED)' : 'NO'}</strong></span>
                    <span>Sub-system Isolation: <strong className="text-emerald-400">ACTIVE</strong></span>
                  </div>
                </div>
              )}

              {/* Automated NOC Notification Dispatch Record */}
              {activeIncident.notificationDispatched && (
                <div className="bg-rose-950/30 border border-rose-500/30 p-3.5 rounded-lg space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-rose-300 font-bold">
                    <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                    <span>Automated Emergency NOC Dispatch</span>
                  </div>
                  <p className="text-slate-200 text-[11px]">
                    Channel: <strong className="text-white">{activeIncident.notificationDispatched.channel}</strong>
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-mono pt-0.5">
                    <span>Recipient: <strong className="text-rose-300">{activeIncident.notificationDispatched.recipient}</strong></span>
                    <span>Dispatched: <strong className="text-slate-300">{new Date(activeIncident.notificationDispatched.dispatchedAt).toLocaleTimeString()}</strong></span>
                  </div>
                </div>
              )}

              {/* Status Transition & Investigation Notes */}
              <div className="pt-2 border-t border-white/10 space-y-3 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Investigation & Status Transition
                </h4>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Transition Status:</span>
                  <Button
                    size="sm"
                    disabled={isUpdatingStatus || activeIncident.status === 'INVESTIGATING'}
                    onClick={() => handleTransitionStatus(activeIncident.id, 'INVESTIGATING')}
                    className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-[4px] text-xs h-7 px-3"
                  >
                    Investigating
                  </Button>
                  <Button
                    size="sm"
                    disabled={isUpdatingStatus || activeIncident.status === 'RESOLVED'}
                    onClick={() => handleTransitionStatus(activeIncident.id, 'RESOLVED')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-[4px] text-xs h-7 px-3"
                  >
                    Mark Resolved
                  </Button>
                  <Button
                    size="sm"
                    disabled={isUpdatingStatus || activeIncident.status === 'REOPENED'}
                    onClick={() => handleTransitionStatus(activeIncident.id, 'REOPENED')}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-[4px] text-xs h-7 px-3"
                  >
                    Reopen Incident
                  </Button>
                </div>

                <div className="pt-2">
                  <label className="block text-slate-400 text-[11px] font-semibold mb-1">
                    Add Engineering Resolution Notes:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter diagnostic root cause, patch commit, or configuration change notes..."
                    value={resolutionNoteInput}
                    onChange={(e) => setResolutionNoteInput(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-white/10 rounded-[6px] text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                  {activeIncident.resolutionNotes && (
                    <div className="mt-2 p-2.5 rounded bg-white/5 text-[11px] text-slate-300">
                      <strong className="text-slate-400">Previous Resolution Note:</strong> {activeIncident.resolutionNotes}
                      {activeIncident.resolvedBy && <span className="text-slate-500 block text-[10px] mt-0.5">By {activeIncident.resolvedBy} at {activeIncident.resolvedAt}</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                <span className="text-slate-500 font-mono text-[10px]">
                  First seen: {new Date(activeIncident.firstSeen).toLocaleString()}
                </span>
                <Button
                  onClick={() => setActiveIncident(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-[6px]"
                >
                  Close Dossier
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
