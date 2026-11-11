'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Users, Shield, Upload, FileText, Award, Bell, 
  MapPin, CheckCircle2, Clock, AlertTriangle, ArrowRight,
  Droplets, Leaf, LogOut, ChevronRight, Settings, ExternalLink,
  Sparkles, Layers, BookOpen, BarChart3, Lock, Plus, RefreshCw,
  Search, Calendar, DollarSign, MessageSquare, Flame, Check, HelpCircle,
  Building2, Heart
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OperationRecord, SOURCE_PAGE_MAP, PublicSourcePage } from '@/lib/operations';
import { getLocalUserOperations } from '@/lib/operationsClient';

export default function UserDashboardPage() {
  const { user, isLoggedIn, signOut, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'tracking' | 'submissions' | 'alerts' | 'profile'>('overview');
  
  // Real operations state
  const [operations, setOperations] = useState<OperationRecord[]>([]);
  const [loadingOps, setLoadingOps] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Tracking lookup tool state
  const [searchTrackingId, setSearchTrackingId] = useState('');
  const [lookupResult, setLookupResult] = useState<OperationRecord | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Selected Record Timeline Modal
  const [selectedRecord, setSelectedRecord] = useState<OperationRecord | null>(null);

  // Fetch operations from API & local storage
  const fetchUserOperations = async () => {
    setLoadingOps(true);
    const local = getLocalUserOperations();
    let apiRecords: OperationRecord[] = [];

    if (user?.email) {
      try {
        const res = await fetch(`/api/operations?email=${encodeURIComponent(user.email)}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          apiRecords = json.data;
        }
      } catch (e) {
        console.error('Failed to fetch user operations:', e);
      }
    }

    // Merge and deduplicate by trackingId
    const map = new Map<string, OperationRecord>();
    [...apiRecords, ...local].forEach(r => map.set(r.trackingId, r));
    setOperations(Array.from(map.values()));
    setLoadingOps(false);
  };

  useEffect(() => {
    fetchUserOperations();

    const handleAdded = () => fetchUserOperations();
    window.addEventListener('kew_operation_added', handleAdded);
    return () => window.removeEventListener('kew_operation_added', handleAdded);
  }, [user?.email]);

  // Lookup single tracking ID
  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTrackingId.trim()) return;

    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);

    try {
      const res = await fetch(`/api/operations?trackingId=${encodeURIComponent(searchTrackingId.trim())}`);
      const json = await res.json();
      if (json.success && json.data) {
        setLookupResult(json.data);
      } else {
        setLookupError(json.error || 'No matching submission found for that tracking ID.');
      }
    } catch (err: any) {
      setLookupError('Failed to connect to tracking registry: ' + err.message);
    } finally {
      setLookupLoading(false);
    }
  };

  // Filtered submissions
  const filteredOperations = operations.filter(op => {
    if (categoryFilter === 'ALL') return true;
    return op.userDashboardSection === categoryFilter;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <User className="w-3 h-3" /> Member Intelligence Workspace
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admin/dashboard" className="hover:text-purple-400 transition-colors text-[11px] font-mono ml-auto flex items-center gap-1 text-slate-500">
            <Shield className="w-3 h-3 text-purple-400" /> Admin Command Center &rarr;
          </Link>
        </nav>

        {/* Member Header Banner */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 border-2 border-emerald-400/30 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'K'}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {user?.name ? `${user.name}'s Workspace` : 'Personal Scientific & Environmental Workspace'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    {user?.roleLabel || 'Verified Contributor'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span>District: <strong className="text-slate-200">{user?.district || 'Kashmir Regional Observatory'}</strong></span>
                  <span>&bull;</span>
                  <span>Active Submissions: <strong className="text-emerald-400">{operations.length}</strong></span>
                  <span>&bull;</span>
                  <span>Institution: <strong className="text-slate-200">{user?.institution || 'Independent Researcher'}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/submit-observation">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20">
                  <Plus className="w-4 h-4 mr-1.5" />
                  <span>Submit Observation</span>
                </Button>
              </Link>
              <Link href="/report-issue">
                <Button size="sm" variant="outline" className="border-red-500/30 hover:bg-red-500/10 text-red-300 text-xs font-semibold rounded-xl">
                  <Flame className="w-3.5 h-3.5 mr-1.5" />
                  <span>Report Hazard</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-8">
          {[
            { id: 'overview', label: 'Workspace Overview', icon: BarChart3 },
            { id: 'tracking', label: 'Track Any Submission', icon: Search, badge: 'Live Lookup' },
            { id: 'submissions', label: 'My Submissions & Evidence', icon: FileText, count: operations.length },
            { id: 'alerts', label: 'Regional Risk Alerts', icon: Bell },
            { id: 'profile', label: 'Scientific Profile', icon: Award },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
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
                  activeTab === tab.id ? 'bg-emerald-900/60 text-emerald-200' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB: Track Any Submission */}
        {activeTab === 'tracking' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-400" />
                  <span>Submission Tracking &amp; Verification Lookup</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your permanent Tracking Reference ID (e.g., <code className="text-emerald-300 font-mono">KEW-OBS-2026-1041</code>, <code className="text-red-300 font-mono">KEW-INC-2026-9022</code>, <code className="text-purple-300 font-mono">KEW-CON-2026-6621</code>) to check review status, assigned coordinator, and processing milestones.
                </p>
              </div>

              <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter KEW Tracking ID (e.g. KEW-OBS-2026-1041)..."
                  value={searchTrackingId}
                  onChange={(e) => setSearchTrackingId(e.target.value)}
                  className="flex-1 bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono uppercase tracking-wider"
                />
                <Button
                  type="submit"
                  disabled={lookupLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  {lookupLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Track Record &rarr;</span>}
                </Button>
              </form>

              {lookupError && (
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-red-300 text-xs font-mono">
                  {lookupError}
                </div>
              )}

              {lookupResult && (
                <div className="rounded-2xl bg-slate-950 border border-emerald-500/30 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
                          {lookupResult.trackingId}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded">
                          {lookupResult.managementCenterLabel}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          lookupResult.status === 'APPROVED' || lookupResult.status === 'RESOLVED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : lookupResult.status === 'REFERRED'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}>
                          {lookupResult.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{lookupResult.title}</h3>
                    </div>
                    {lookupResult.assignedTo && (
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Assigned Coordinator</span>
                        <span className="text-xs font-semibold text-teal-300">{lookupResult.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lookupResult.details}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Processing Milestones ({lookupResult.timeline.length} Events)
                    </h4>
                    <div className="space-y-2">
                      {lookupResult.timeline.map((evt, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-start gap-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{evt.action}</span>
                              <span className="text-[10px] font-mono text-slate-500">{evt.timestamp}</span>
                            </div>
                            <div className="text-[11px] text-slate-400">Actor: <span className="text-emerald-300">{evt.actor}</span></div>
                            {evt.note && <div className="text-[11px] text-slate-300 italic pt-0.5">&ldquo;{evt.note}&rdquo;</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: My Submissions & Evidence */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {/* 11 Pathway Filter Badges */}
            <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 space-y-3">
              <span className="text-[11px] font-mono text-slate-400 block">Filter by Submission Pathway:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'ALL',
                  'My Observations',
                  'My Issue Reports',
                  'My Datasets',
                  'My Correspondence',
                  'My Programs',
                  'My Data Partnership',
                  'My Research Partnerships',
                  'My Grant/CSR Proposals',
                  'My Events',
                  'My Assignments'
                ].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-emerald-600 text-white font-bold shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-3">
              {filteredOperations.length === 0 ? (
                <div className="rounded-2xl bg-slate-900/50 border border-white/5 p-12 text-center text-slate-400 space-y-2">
                  <FileText className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-sm font-semibold text-white">No submissions recorded under this pathway yet.</p>
                  <p className="text-xs text-slate-500">Submissions from any of the 11 public pages will appear here with live tracking status.</p>
                </div>
              ) : (
                filteredOperations.map(op => (
                  <div key={op.id} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 transition-all space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          {op.trackingId}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                          {op.userDashboardSection}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        op.status === 'APPROVED' || op.status === 'RESOLVED'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : op.status === 'REFERRED'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : op.status === 'REJECTED'
                          ? 'bg-red-500/15 text-red-300 border border-red-500/30'
                          : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                      }`}>
                        STATUS: {op.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{op.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{op.details}</p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
                      <div className="flex items-center gap-3">
                        <span>Submitted: {new Date(op.createdAt).toLocaleDateString()}</span>
                        {op.assignedTo && <span>Coordinator: <strong className="text-slate-200">{op.assignedTo}</strong></span>}
                      </div>
                      <button
                        onClick={() => setSelectedRecord(op)}
                        className="text-emerald-400 hover:text-emerald-300 font-mono font-semibold underline cursor-pointer"
                      >
                        View Timeline ({op.timeline.length} updates) &rarr;
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB: Workspace Overview (Default) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1">
                <span className="text-xs text-slate-400">My Submissions</span>
                <div className="text-2xl font-bold text-white font-mono">{operations.length}</div>
                <span className="text-[10px] text-slate-500 block">Across 11 Public Pathways</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1">
                <span className="text-xs text-slate-400">Verified Evidence</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  {operations.filter(o => o.status === 'APPROVED' || o.status === 'RESOLVED').length}
                </div>
                <span className="text-[10px] text-slate-500 block">Published in Atlas &amp; Catalog</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1">
                <span className="text-xs text-slate-400">Under Review</span>
                <div className="text-2xl font-bold text-blue-400 font-mono">
                  {operations.filter(o => o.status === 'PENDING' || o.status === 'IN_REVIEW').length}
                </div>
                <span className="text-[10px] text-slate-500 block">In Verification Pipeline</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-1">
                <span className="text-xs text-slate-400">Citizen Programs</span>
                <div className="text-2xl font-bold text-purple-400 font-mono">6</div>
                <span className="text-[10px] text-slate-500 block">Active Curriculum Modules</span>
              </div>
            </div>

            {/* 11 Public Participation Portals Grid */}
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Public Participation Portals (11 Pathways)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Direct access to all public intake interfaces across scientific, hazard, event, and partnership workflows.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {[
                  { title: 'Webinars & Conferences', path: '/webinars', icon: Calendar, badge: 'Events' },
                  { title: 'Support & Sponsorship', path: '/about/support-sponsorship', icon: DollarSign, badge: 'Partnerships' },
                  { title: 'CSR & Grants', path: '/about/csr-collaborations', icon: Building2, badge: 'Partnerships' },
                  { title: 'Contact & Inquiries', path: '/about/contact', icon: MessageSquare, badge: 'Communications' },
                  { title: 'Submit Observation', path: '/submit-observation', icon: Leaf, badge: 'Scientific' },
                  { title: 'Report Hazard Issue', path: '/report-issue', icon: Flame, badge: 'Incidents' },
                  { title: 'Share Scientific Data', path: '/share-data', icon: Layers, badge: 'Datasets' },
                  { title: 'Join Citizen Science', path: '/join-citizen-science', icon: Users, badge: 'Community' },
                  { title: 'Become Data Contributor', path: '/become-data-contributor', icon: Upload, badge: 'Accreditation' },
                  { title: 'Become Research Partner', path: '/become-research-partner', icon: Award, badge: 'MoU' },
                  { title: 'Volunteer & Contribute', path: '/get-involved/volunteer', icon: Heart, badge: 'Volunteers' },
                ].map(portal => (
                  <Link
                    key={portal.path}
                    href={portal.path}
                    className="p-4 rounded-xl bg-slate-950 border border-white/5 hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <portal.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block group-hover:text-emerald-300 transition-colors">{portal.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">{portal.path}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-white/5">
                      {portal.badge}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Regional Risk Alerts */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <span>Regional Hazard &amp; Anomaly Signals</span>
              </h3>
              <p className="text-xs text-slate-400">
                Continuous telemetry streams from J&amp;K SDMA river gauges, Copernicus Sentinel-2 moisture arrays, and regional field sensors.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { region: 'Budgam (Doodh Ganga Basin)', alert: 'Chemical Turbidity Anomaly Detected', severity: 'Critical', time: '2 hours ago' },
                  { region: 'Ramban (NH-44 Corridor)', alert: 'Sub-surface Soil Moisture Saturated (0.42)', severity: 'High', time: '6 hours ago' },
                  { region: 'Srinagar (Dal Lake Basin)', alert: 'Dissolved Oxygen Stable at 7.2 mg/L', severity: 'Normal', time: '12 hours ago' }
                ].map(a => (
                  <div key={a.region} className="p-4 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{a.region}</span>
                      <span className="text-slate-400">{a.alert}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                      a.severity === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                      a.severity === 'High' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {a.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Scientific Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Scientific Profile &amp; Accreditation</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage your credentials, ORCID identifier, and institutional affiliations.</p>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Contributor Tier:</span>
                <span className="font-bold text-emerald-400 font-mono">{user?.roleLabel || 'Verified Contributor'}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Assigned Observatory:</span>
                <span className="font-bold text-white">{user?.district || 'Kashmir Regional Basin'}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400">Institutional Email:</span>
                <span className="font-mono text-purple-300">{user?.email || 'observer@kashmirecowatch.org'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Drawer / Modal */}
        <AnimatePresence>
          {selectedRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      {selectedRecord.trackingId}
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedRecord.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {selectedRecord.userDashboardSection} &bull; Center: {selectedRecord.managementCenterLabel}
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
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">Details</h4>
                    <p className="text-xs text-slate-200 p-3 rounded-xl bg-slate-950 border border-white/10 leading-relaxed">
                      {selectedRecord.details}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Review Progress &amp; Audit Trail</h4>
                    <div className="space-y-2">
                      {selectedRecord.timeline.map((evt, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-start gap-3 text-xs">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <div className="space-y-0.5 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{evt.action}</span>
                              <span className="text-[10px] font-mono text-slate-500">{evt.timestamp}</span>
                            </div>
                            <div className="text-[11px] text-slate-400">Actor: <span className="text-emerald-300">{evt.actor}</span></div>
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
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl"
                  >
                    Close
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
