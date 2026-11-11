'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Users, Database, AlertTriangle, CheckCircle2, 
  XCircle, Clock, Search, Filter, ArrowUpRight, BarChart3, 
  Settings, Key, Download, RefreshCw, FileText, ChevronRight,
  Droplets, Leaf, MapPin, Eye, Lock, Unlock, Sparkles, LogOut,
  Calendar, Video, Building2, DollarSign, MessageSquare, Flame,
  Layers, Activity, Send, Check, Phone, Globe, ExternalLink, HelpCircle, ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  OperationRecord, 
  ManagementCenter, 
  SubmissionPriority, 
  OperationStatus, 
  INITIAL_OPERATIONS_RECORDS,
  SOURCE_PAGE_MAP 
} from '@/lib/operations';
import { SCIENTIFIC_PROGRAM_TARGETS } from '@/data/scientific-program-2027-2028';
import { CITIZEN_SCIENCE_PROGRAMS, CITIZEN_SCIENCE_METRICS } from '@/data/citizen-science-programs';

type AdminTab = 
  | 'queue' 
  | 'events' 
  | 'partnerships' 
  | 'communications' 
  | 'scientific' 
  | 'community' 
  | 'users' 
  | 'system' 
  | 'audit';

export default function AdminDashboardPage() {
  const { user, isLoggedIn, signOut, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('queue');
  
  // Operations & Queues State
  const [operations, setOperations] = useState<OperationRecord[]>(INITIAL_OPERATIONS_RECORDS);
  const [loadingOps, setLoadingOps] = useState(false);
  const [filterCenter, setFilterCenter] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Selected Record Drawer State
  const [selectedRecord, setSelectedRecord] = useState<OperationRecord | null>(null);

  // Security & Admin Access Gate State
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

  // Fetch real operations from unified API
  const fetchOperations = async () => {
    setLoadingOps(true);
    try {
      const res = await fetch('/api/operations');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setOperations(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch operations:', err);
    } finally {
      setLoadingOps(false);
    }
  };

  useEffect(() => {
    fetchOperations();
  }, []);

  // Update operation status
  const handleUpdateStatus = async (trackingId: string, newStatus: OperationStatus, note?: string) => {
    try {
      const res = await fetch('/api/operations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'KEW-Admin-2026!'
        },
        body: JSON.stringify({
          trackingId,
          status: newStatus,
          note: note || `Admin updated status to ${newStatus}`
        })
      });
      const json = await res.json();
      if (json.success && json.record) {
        setOperations(prev => prev.map(r => r.trackingId === trackingId ? json.record : r));
        if (selectedRecord && selectedRecord.trackingId === trackingId) {
          setSelectedRecord(json.record);
        }
        setActionNotice(`Successfully marked ${trackingId} as ${newStatus}.`);
        setTimeout(() => setActionNotice(null), 4000);
      } else {
        alert(json.error || 'Action failed');
      }
    } catch (e: any) {
      alert('Error updating operation: ' + e.message);
    }
  };

  // Filtered operations list
  const filteredOperations = operations.filter(op => {
    const matchesCenter = filterCenter === 'ALL' || op.managementCenter === filterCenter;
    const matchesPriority = filterPriority === 'ALL' || op.priority === filterPriority;
    const matchesStatus = filterStatus === 'ALL' || op.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      op.trackingId.toLowerCase().includes(q) ||
      op.title.toLowerCase().includes(q) ||
      op.ownerName.toLowerCase().includes(q) ||
      (op.district && op.district.toLowerCase().includes(q)) ||
      (op.organization && op.organization.toLowerCase().includes(q)) ||
      op.category.toLowerCase().includes(q);
    return matchesCenter && matchesPriority && matchesStatus && matchesQuery;
  });

  // Access Restricted Gate: Rendered when user is neither logged in as admin nor unlocked via Master Key
  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-lg shadow-purple-950/50">
              <Lock className="w-8 h-8 text-purple-300" />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full inline-block">
              Restricted Area &bull; Level 4 Clearance
            </span>
            <h1 className="text-2xl font-black text-white pt-1">
              Admin Orchestration Gate
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access to the Kashmir EcoWatch Command Console, Telemetry Verification Queue, and PostGIS Database is strictly restricted to authenticated platform administrators.
            </p>
          </div>

          {/* Master Passcode Form */}
          <form onSubmit={handleUnlockWithPasscode} className="space-y-4 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1.5 font-mono">
                Admin Master Passcode / Security Key:
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter administrator passcode..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (passcodeError) setPasscodeError(null);
                  }}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono tracking-wider"
                  autoFocus
                />
              </div>
              {passcodeError && (
                <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{passcodeError}</span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <Key className="w-4 h-4 mr-1.5" />
              <span>Unlock Admin Console</span>
            </Button>
          </form>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] text-slate-500 font-mono uppercase">OR</span>
            <div className="border-t border-white/10 w-full" />
          </div>

          <div className="space-y-2.5">
            <Button
              type="button"
              onClick={() => openAuthModal('signin')}
              variant="outline"
              className="w-full border-white/15 text-slate-300 hover:bg-white/5 text-xs font-semibold rounded-xl cursor-pointer"
            >
              <Shield className="w-4 h-4 mr-1.5 text-purple-400" />
              <span>Sign In with Administrator Account</span>
            </Button>

            <Link href="/" className="block">
              <Button
                variant="ghost"
                className="w-full text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
              >
                Return to Public Website
              </Button>
            </Link>
          </div>

          <div className="text-center pt-2 border-t border-white/5">
            <span className="text-[10px] text-slate-500 font-mono">
              IP &amp; Session Activity Geotagged &bull; Unauthorized Access Prohibited
            </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">User Workspace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-purple-400 font-semibold flex items-center gap-1">
            <Shield className="w-3 h-3" /> Admin Orchestration Command
          </span>
        </nav>

        {/* Action Notice Toast */}
        {actionNotice && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button onClick={() => setActionNotice(null)} className="text-emerald-400 hover:text-white">✕</button>
          </motion.div>
        )}

        {/* Admin Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900/95 via-purple-950/20 to-slate-900/90 border border-purple-500/20 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 border-2 border-purple-400/30 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-purple-200" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Admin Command &amp; Intelligence Center
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                    Superuser Tier
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span>Data Ingestion &amp; Verification Queue</span>
                  <span>&bull;</span>
                  <span>Observer Registry Management</span>
                  <span>&bull;</span>
                  <span>PostgreSQL &amp; PostGIS Gateway</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-white/10 hover:bg-white/5 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  <span>Switch to Contributor View</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLockDashboard}
                className="border-red-500/30 hover:bg-red-500/10 text-red-400 text-xs font-semibold rounded-xl"
              >
                <Lock className="w-3.5 h-3.5 mr-1.5" />
                <span>Lock Console</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 5 Management Centers Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'queue', label: 'Unified Operations Queue', icon: Activity, count: operations.length },
            { id: 'events', label: 'Events & Conferences', icon: Calendar, badge: '104 Programs' },
            { id: 'partnerships', label: 'Support, CSR & Grants', icon: DollarSign, badge: 'Compliance' },
            { id: 'communications', label: 'Communications Center', icon: MessageSquare, badge: '<24h SLA' },
            { id: 'scientific', label: 'Scientific Evidence & Incidents', icon: Flame, badge: 'Triage' },
            { id: 'community', label: 'Community & Volunteers', icon: Users, badge: '845 Scientists' },
            { id: 'system', label: 'PostGIS & Infrastructure', icon: Database },
            { id: 'audit', label: 'Governance & Audit Trail', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider ${
                  activeTab === tab.id ? 'bg-purple-900/60 text-purple-200' : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Unified Operations Queue */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-4 sm:p-5 backdrop-blur-md space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Tracking ID (KEW-...), title, contributor, district, or organization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <Button
                  onClick={fetchOperations}
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-slate-300 hover:bg-white/5 text-xs font-semibold rounded-xl"
                >
                  <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loadingOps ? 'animate-spin' : ''}`} />
                  <span>Refresh Queue</span>
                </Button>
              </div>

              {/* Multi-Filter Rows */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
                {/* Center Filter */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Center:</span>
                  {[
                    { id: 'ALL', label: 'All' },
                    { id: 'EVENTS', label: 'Events' },
                    { id: 'PARTNERSHIPS', label: 'Partnerships' },
                    { id: 'COMMUNICATIONS', label: 'Communications' },
                    { id: 'SCIENTIFIC_INTAKE', label: 'Scientific Intake' },
                    { id: 'COMMUNITY_NETWORK', label: 'Community' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setFilterCenter(c.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                        filterCenter === c.id
                          ? 'bg-purple-600/30 border border-purple-500/50 text-purple-200'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Priority Filter */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Priority:</span>
                  {[
                    { id: 'ALL', label: 'All' },
                    { id: 'CRITICAL', label: 'Critical 🚨' },
                    { id: 'HIGH', label: 'High' },
                    { id: 'MEDIUM', label: 'Medium' },
                    { id: 'LOW', label: 'Low' }
                  ].map(p => (
                    <button
                      key={p.id}
                      onClick={() => setFilterPriority(p.id)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                        filterPriority === p.id
                          ? 'bg-red-600/30 border border-red-500/50 text-red-200'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Status:</span>
                  {['ALL', 'PENDING', 'IN_REVIEW', 'APPROVED', 'REFERRED', 'RESOLVED', 'REJECTED'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors ${
                        filterStatus === st
                          ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Operations Cards List */}
            <div className="space-y-3">
              {filteredOperations.length === 0 ? (
                <div className="rounded-2xl bg-slate-900/50 border border-white/5 p-12 text-center text-slate-400 space-y-2">
                  <Search className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-white">No operations match your current filters.</p>
                  <p className="text-xs text-slate-500">Try clearing priority or category filters.</p>
                </div>
              ) : (
                filteredOperations.map(op => (
                  <div
                    key={op.id}
                    className={`rounded-2xl border transition-all p-5 backdrop-blur-md ${
                      op.priority === 'CRITICAL'
                        ? 'bg-red-950/20 border-red-500/40 hover:border-red-500/60 shadow-lg shadow-red-950/30'
                        : 'bg-slate-900/80 border-white/10 hover:border-purple-500/30 shadow-md'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Metadata & Title */}
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 rounded-md">
                            {op.trackingId}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                            {op.managementCenterLabel}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                            Source: {op.sourcePageLabel}
                          </span>
                          
                          {/* Priority Badge */}
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            op.priority === 'CRITICAL'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/50 animate-pulse'
                              : op.priority === 'HIGH'
                              ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {op.priority} PRIORITY
                          </span>

                          {/* Status Badge */}
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                            op.status === 'APPROVED' || op.status === 'RESOLVED'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : op.status === 'REFERRED'
                              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                              : op.status === 'REJECTED'
                              ? 'bg-red-500/15 text-red-300 border border-red-500/30'
                              : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          }`}>
                            {op.status}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white hover:text-purple-300 transition-colors">
                          {op.title}
                        </h3>

                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {op.details}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-500" />
                            <strong className="text-slate-200">{op.ownerName}</strong>
                            {op.organization && <span className="text-slate-400">({op.organization})</span>}
                          </span>
                          {op.district && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              <span>{op.district}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>Submitted: {new Date(op.createdAt).toLocaleDateString()}</span>
                          </span>
                          {op.slaDeadline && (
                            <span className="text-purple-400 font-mono">
                              SLA: {op.slaDeadline}
                            </span>
                          )}
                          {op.assignedTo && (
                            <span className="text-teal-400 font-medium">
                              Assigned: {op.assignedTo}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Quick Action Controls */}
                      <div className="flex flex-wrap lg:flex-col items-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                        <div className="flex items-center gap-1.5">
                          {op.status !== 'APPROVED' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(op.trackingId, 'APPROVED', 'Admin verified and published')}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl cursor-pointer"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              <span>Approve</span>
                            </Button>
                          )}
                          {op.status !== 'INFO_REQUESTED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(op.trackingId, 'INFO_REQUESTED', 'Requested additional field telemetry & photos')}
                              className="border-white/15 hover:bg-white/5 text-amber-300 text-xs px-3 py-1.5 rounded-xl cursor-pointer"
                            >
                              <HelpCircle className="w-3 h-3 mr-1" />
                              <span>Request Info</span>
                            </Button>
                          )}
                          {op.priority === 'CRITICAL' && op.status !== 'REFERRED' && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateStatus(op.trackingId, 'REFERRED', 'Formal incident referral dispatched to JKPCC & Emergency Response')}
                              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl cursor-pointer shadow-lg shadow-red-600/30"
                            >
                              <Flame className="w-3 h-3 mr-1" />
                              <span>Refer to JKPCC</span>
                            </Button>
                          )}
                          {op.status !== 'REJECTED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(op.trackingId, 'REJECTED', 'Rejected due to insufficient verification or duplicate entry')}
                              className="border-red-500/20 hover:bg-red-500/10 text-red-400 text-xs px-2.5 py-1.5 rounded-xl cursor-pointer"
                            >
                              <span>Reject</span>
                            </Button>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedRecord(op)}
                          className="text-[11px] text-purple-400 hover:text-purple-300 font-mono underline pt-1 cursor-pointer"
                        >
                          View Full Audit Timeline ({op.timeline.length} events) &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Events & Conference Management */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>Scientific Events &amp; Conference Governance</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage the 2027–2028 program of 104 planned activities, speaker clearances, abstract reviews, and virtual hall tokens.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                    Targets: 8 Conferences &bull; 48 Webinars &bull; 24 Workshops &bull; 24 Observances
                  </span>
                </div>
              </div>

              {/* Lifecycle Stage Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                {[
                  { stage: '1. Proposed', count: 78, desc: 'Draft scope & tracks', color: 'border-slate-700 bg-slate-900/50' },
                  { stage: '2. Approved', count: 18, desc: 'Budget & host confirmed', color: 'border-blue-500/30 bg-blue-950/20 text-blue-300' },
                  { stage: '3. Published', count: 6, desc: 'Registration live', color: 'border-amber-500/30 bg-amber-950/20 text-amber-300' },
                  { stage: '4. Live Today', count: 1, desc: 'WebRTC active hall', color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' },
                  { stage: '5. Archived', count: 1, desc: 'DOI & Proceedings', color: 'border-purple-500/30 bg-purple-950/20 text-purple-300' },
                ].map(s => (
                  <div key={s.stage} className={`p-4 rounded-2xl border ${s.color}`}>
                    <div className="text-lg font-black text-white">{s.count}</div>
                    <div className="text-xs font-bold mt-0.5">{s.stage}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>

              {/* Active Events Queue */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Upcoming Priority Activities (2027 Himalayan Series)
                </h3>
                {[
                  { id: 'CONF-2027-CRYO', title: 'Himalayan Cryosphere & Glacial Lake Outburst Floods (GLOF) Summit', type: 'Flagship Conference', date: 'May 24–26, 2027', hall: 'CRYO-ROOM-A', status: 'Approved / Registration Open' },
                  { id: 'WEB-2027-01', title: 'InSAR Landslide Creep Telemetry Along National Highway 44', type: 'Specialist Webinar', date: 'Jan 15, 2027', hall: 'HAZARD-HALL-1', status: 'Published' },
                  { id: 'WORK-2027-04', title: 'Riparian Wetland Buffer Modeling with Sentinel-2 Surface Water Arrays', type: 'Applied Workshop', date: 'Feb 02, 2027', hall: 'WETLAND-LAB-B', status: 'Proposed' }
                ].map(ev => (
                  <div key={ev.id} className="p-4 rounded-xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">{ev.id}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{ev.type}</span>
                        <span className="text-[10px] text-slate-400">&bull; {ev.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">Virtual Hall: {ev.hall} &bull; Status: {ev.status}</p>
                    </div>
                    <Link href="/webinars/admin">
                      <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300 text-xs shrink-0">
                        <span>Configure WebRTC Hall &rarr;</span>
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Support, Sponsorship, CSR & Grants */}
        {activeTab === 'partnerships' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span>Support, Sponsorship, CSR &amp; Grants Management</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage institutional funding agreements, Section 135 compliance, CSR-1 non-profit implementing conduits, and milestone deliverables.
                  </p>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono">
                  Separate Technical vs Legal Financial Recipient
                </span>
              </div>

              {/* Compliance Guidance Banner */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 leading-relaxed mb-6 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Statutory Independence Covenant:</span>
                </div>
                <p>
                  Kashmir EcoWatch provides open scientific telemetry, monitoring protocols, and impact verification. All corporate CSR contributions are administered strictly through accredited, vetted non-profit implementing conduits holding active MCA Form CSR-1 and Sections 12A/80G status.
                </p>
              </div>

              {/* Active Proposals & Inquiries */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Active CSR Grant Proposals &amp; Sponsor Inquiries
                </h3>
                {[
                  { code: 'KEW-CSR-2026-7734', org: 'Green Himalaya Trust', program: 'Freshwater Springhead Bio-Engineering', budget: 'INR 37.5 Lakhs ($45,000)', conduit: 'WISA Implementing Trust (CSR-1)', status: 'Under Compliance Review' },
                  { code: 'KEW-SUP-2026-1102', org: 'Dr. Kumar Foundation USA', program: 'Philanthropic Server Infrastructure Grant', budget: 'Annual Hosting & Ingestion', conduit: 'Prime Logic Solutions USA (Gratis CSR Pledge)', status: 'Active / Executed' }
                ].map(p => (
                  <div key={p.code} className="p-4 rounded-xl bg-slate-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">{p.code}</span>
                        <span className="text-xs font-bold text-white">&bull; {p.org}</span>
                      </div>
                      <p className="text-xs text-slate-300">{p.program}</p>
                      <p className="text-[11px] font-mono text-slate-400">Budget: {p.budget} &bull; Legal Conduit: {p.conduit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Communications & Contact Center */}
        {activeTab === 'communications' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    <span>Centralized Inquiries &amp; Communications Desk</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Universal ticket queue for public contact forms, media requests, technical queries, and institutional correspondence.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300">
                    SLA Commitment: &lt; 24h Response (Current Avg: 4.8h)
                  </span>
                </div>
              </div>

              {/* SLA Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-xs text-slate-400 block">Total Tickets Logged</span>
                  <span className="text-2xl font-bold text-white font-mono">142</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-xs text-slate-400 block">Resolved Within SLA</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">98.4%</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-xs text-slate-400 block">Open Scientific Queries</span>
                  <span className="text-2xl font-bold text-sky-400 font-mono">4</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-xs text-slate-400 block">Pending Escalations</span>
                  <span className="text-2xl font-bold text-amber-400 font-mono">0</span>
                </div>
              </div>

              {/* Recent Correspondence */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Recent Inquiries &amp; Dispatches
                </h3>
                {operations.filter(op => op.managementCenter === 'COMMUNICATIONS').map(ticket => (
                  <div key={ticket.id} className="p-4 rounded-xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-400">{ticket.trackingId}</span>
                        <span className="text-xs font-bold text-white">&bull; {ticket.ownerName}</span>
                        {ticket.organization && <span className="text-xs text-slate-400">({ticket.organization})</span>}
                      </div>
                      <p className="text-xs text-slate-300 font-medium">{ticket.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{ticket.details}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-purple-400">{ticket.slaDeadline}</span>
                      <Button size="sm" variant="outline" className="border-sky-500/30 text-sky-300 text-xs">
                        <span>Reply &rarr;</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Scientific Evidence & Incidents */}
        {activeTab === 'scientific' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-400" />
                    <span>Scientific Evidence &amp; Incident Triage Center</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Operate the 8-stage observation verification pipeline, emergency pollution triage, and structured NetCDF/GeoTIFF dataset ingest.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
                    Emergency Protocol: Rapid JKPCC &amp; Forest Dept Referral
                  </span>
                </div>
              </div>

              {/* Three Scientific Workflows */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                      <Leaf className="w-4 h-4" /> Observations
                    </h3>
                    <span className="text-xs font-mono text-emerald-400">8-Stage Flow</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Species censuses, botanical field vouchers, and wildlife sightings submitted by citizen scientists and field rangers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-red-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Hazard Incidents
                    </h3>
                    <span className="text-xs font-mono text-red-400">Triage Queue</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Pollution discharge, forest fires, flash floods, and chemical dumping. Prioritized for immediate regulatory referral.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-blue-300 flex items-center gap-1.5">
                      <Database className="w-4 h-4" /> Datasets
                    </h3>
                    <span className="text-xs font-mono text-blue-400">Darwin Core</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Structured NetCDF, GeoTIFF, and PostGIS layers from university labs requiring CRS, metadata, and license audits.
                  </p>
                </div>
              </div>

              {/* Critical Incidents Warning Banner */}
              <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/40 text-xs text-red-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    <strong>Statutory Disclaimer:</strong> Kashmir EcoWatch provides environmental intelligence and scientific documentation. It is not an emergency dispatch provider. Critical life-safety threats are routed to 112/101 and Forest Helpline 1800-180-1918.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Community & Volunteer Network */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-400" />
                    <span>Member, Volunteer &amp; Research Network (Unified Identity)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Unified relationship system: One identity per person holding multiple verified roles across Citizen Scientist, Volunteer, Data Contributor, and Research Partner.
                  </p>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 font-mono">
                  845 Active Scientists &bull; 6 Reconciled Programs
                </span>
              </div>

              {/* 6 Reconciled Citizen Science Programs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {CITIZEN_SCIENCE_PROGRAMS.map(prog => (
                  <div key={prog.id} className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{prog.icon}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{prog.volunteers} Volunteers</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{prog.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{prog.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: PostGIS & System Gateway */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-400" />
                <span>PostgreSQL &amp; PostGIS Spatial Engine</span>
              </h2>
              <p className="text-xs text-slate-400">
                Connected to local &amp; remote PostGIS cluster. Universal observation model with TimescaleDB hypertables, 423 pre-rendered routes, and active GIS telemetry ingestion.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-xs text-slate-400 block">Spatial Entities</span>
                  <span className="text-2xl font-bold text-white font-mono">263</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Districts, Basins, Watersheds</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-xs text-slate-400 block">Telemetry Nodes</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">247</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Active IoT Gauges &amp; Sensors</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-white/10">
                  <span className="text-xs text-slate-400 block">Ingestion Health</span>
                  <span className="text-2xl font-bold text-purple-400 font-mono">ONLINE</span>
                  <span className="text-[10px] text-slate-500 block mt-1">Copernicus Sentinel + Open-Meteo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Audit Trail */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <span>Platform Governance &amp; Immutable Audit Trail</span>
              </h2>
              <p className="text-xs text-slate-400">
                Every consequential action—status change, scientific rejection, regulatory referral, and role elevation—is logged with actor identity, timestamp, and immutable SHA-256 state hash.
              </p>
              <div className="space-y-2 pt-2">
                {operations.slice(0, 8).map(op => (
                  <div key={op.id} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-purple-300">{op.trackingId}</span>
                      <span className="text-white font-medium">{op.title}</span>
                    </div>
                    <span className="font-mono text-slate-500">{new Date(op.updatedAt).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Record Audit Timeline Modal / Drawer */}
        <AnimatePresence>
          {selectedRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl w-full bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      {selectedRecord.trackingId}
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedRecord.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {selectedRecord.managementCenterLabel} &bull; Source: {selectedRecord.sourcePageLabel}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRecord(null)}
                    className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Submission Details</h4>
                    <p className="text-xs text-slate-200 p-3 rounded-xl bg-slate-950 border border-white/10 leading-relaxed">
                      {selectedRecord.details}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Immutable Processing Timeline</h4>
                    <div className="space-y-2">
                      {selectedRecord.timeline.map((evt, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-start gap-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{evt.action}</span>
                              <span className="text-[10px] font-mono text-slate-500">{evt.timestamp}</span>
                            </div>
                            <div className="text-[11px] text-slate-400">Actor: <span className="text-purple-300">{evt.actor}</span></div>
                            {evt.note && <div className="text-[11px] text-slate-300 italic pt-0.5">&ldquo;{evt.note}&rdquo;</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <Button
                    onClick={() => setSelectedRecord(null)}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-2 rounded-xl"
                  >
                    Close Audit Log
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
