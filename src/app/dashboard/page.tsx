'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  User, Shield, Upload, FileText, Award, Bell, 
  MapPin, CheckCircle2, Clock, AlertTriangle, ArrowRight,
  Droplets, Leaf, LogOut, ChevronRight, Settings, ExternalLink,
  Sparkles, Layers, BookOpen, BarChart3, Lock, Plus, RefreshCw
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';

export interface UserSubmission {
  id: string;
  title: string;
  category: string;
  district: string;
  details: string;
  status: 'PENDING' | 'EXPERT_VERIFIED' | 'COMMUNITY_VERIFIED' | 'REJECTED';
  createdAt: string;
}

export default function UserDashboardPage() {
  const { user, isLoggedIn, signOut, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'alerts' | 'profile'>('overview');
  
  // Real database-backed submissions state
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  
  // New Quick Submission Form State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [subCategory, setSubCategory] = useState('water_quality');
  const [subDistrict, setSubDistrict] = useState(user?.district || 'Srinagar');
  const [subDetails, setSubDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Fetch real submissions from database on mount or when user changes
  const fetchSubmissions = async () => {
    if (!user?.email) return;
    setLoadingSubmissions(true);
    try {
      const res = await fetch(`/api/submissions?email=${encodeURIComponent(user.email)}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setSubmissions(json.data);
      }
    } catch (e) {
      console.error('Failed to fetch user submissions:', e);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user?.email]);

  // Handle creating a real submission to the database
  const handleCreateSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: subTitle.trim(),
          category: subCategory,
          district: subDistrict || user?.district || 'Srinagar',
          contributorName: user?.name || 'Field Contributor',
          contributorEmail: user?.email,
          contributorRole: user?.role,
          details: subDetails.trim(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setShowSubmitModal(false);
        setSubTitle('');
        setSubDetails('');
        setToastMsg('Record successfully submitted to the Ecological Registry! It is now in the Admin Verification Queue.');
        setTimeout(() => setToastMsg(null), 5000);
        // Refresh live records
        fetchSubmissions();
      } else {
        alert(json.error || 'Failed to submit record.');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setSubmitting(false);
    }
  };

  // If user is not logged in, show an authenticated access prompt
  if (!isLoggedIn || !user) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
        
        <div className="max-w-xl mx-auto px-4 relative z-10 text-center py-20">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Contributor Workspace Required
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Access your field submissions, verified ecological data, telemetry feeds, and custom hazard notification preferences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button 
              onClick={() => openAuthModal('signin')}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm"
            >
              Sign In to Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => openAuthModal('signup')}
              className="w-full sm:w-auto px-6 py-3 border-white/20 text-white hover:bg-white/10 rounded-xl text-sm"
            >
              Create Contributor Account
            </Button>
          </div>
        </div>
        <AdvancedFooter />
      </main>
    );
  }

  const verifiedCount = submissions.filter(s => s.status === 'EXPERT_VERIFIED' || s.status === 'COMMUNITY_VERIFIED').length;
  const pendingCount = submissions.filter(s => s.status === 'PENDING').length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300 font-medium">Contributor Workspace</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-semibold">{user.name}</span>
        </nav>

        {/* Real-time Toast Feedback */}
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMsg}</span>
            </div>
            <button onClick={() => setToastMsg(null)} className="text-emerald-400 hover:text-white">✕</button>
          </motion.div>
        )}

        {/* Dashboard Header Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 border-2 border-emerald-400/30 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {user.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                    {user.role.replace('_', ' ')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                    PostgreSQL Live Connected
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {user.district || 'Srinagar'} District
                  </span>
                  <span>•</span>
                  <span>{user.institution || 'Kashmir Scientific Consortium'}</span>
                  <span>•</span>
                  <span>Joined {new Date(user.joinedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link href="/admin/dashboard">
                <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 text-xs sm:text-sm font-semibold rounded-xl">
                  <Shield className="w-3.5 h-3.5 mr-1 text-purple-400" /> Admin Command
                </Button>
              </Link>
              <Button 
                onClick={() => setShowSubmitModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Submit New Record
              </Button>
              <button
                onClick={signOut}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-colors text-xs font-medium flex items-center gap-1.5"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Workspace Overview', icon: Layers },
            { id: 'submissions', label: 'My Submissions', count: submissions.length, icon: FileText },
            { id: 'alerts', label: 'Alert Subscriptions', count: 3, icon: Bell },
            { id: 'profile', label: 'Credentials & Security', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isSel
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isSel ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-400'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Your Submissions</span>
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-white">{submissions.length}</div>
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {verifiedCount} Verified in Database
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>In Review Queue</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-400">{pendingCount}</div>
                <p className="text-[11px] text-slate-400 mt-1">Pending admin sign-off</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>District Coverage</span>
                  <MapPin className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl font-black text-white">{user.district || 'Srinagar'}</div>
                <p className="text-[11px] text-sky-400 mt-1">Active Field Basin</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                  <span>Observer Tier</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-400">Level 2</div>
                <p className="text-[11px] text-slate-400 mt-1">Field Credentialed</p>
              </div>
            </div>

            {/* Main Action Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Recent Submissions */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Live Database Records
                  </h2>
                  <button 
                    onClick={() => setShowSubmitModal(true)} 
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                  >
                    Submit Record <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {loadingSubmissions ? (
                  <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 text-center text-xs text-slate-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-emerald-400" />
                    Loading database submissions...
                  </div>
                ) : submissions.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 text-center">
                    <p className="text-sm font-semibold text-white mb-1">No submissions yet for {user.email}</p>
                    <p className="text-xs text-slate-400 mb-4">Deposit your first water chemistry sample, species observation, or hazard report.</p>
                    <Button onClick={() => setShowSubmitModal(true)} className="bg-emerald-600 hover:bg-emerald-500 text-xs">
                      Submit Your First Record
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {submissions.map((sub) => (
                      <div key={sub.id} className="p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                            {sub.category === 'water_quality' ? <Droplets className="w-5 h-5 text-cyan-400" /> : <Leaf className="w-5 h-5 text-emerald-400" />}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-white truncate">{sub.title}</h4>
                            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                              <span className="capitalize">{sub.category.replace('_', ' ')}</span>
                              <span>•</span>
                              <span>{sub.district} District</span>
                              <span>•</span>
                              <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                            </p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
                          sub.status === 'EXPERT_VERIFIED' || sub.status === 'COMMUNITY_VERIFIED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : sub.status === 'REJECTED'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}>
                          {sub.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Platform Portals & Tools */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Your Active Workspaces
                </h2>

                <div className="space-y-3">
                  <Link 
                    href="/contribute-data"
                    className="block p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        Deposit Research Data
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400">Upload scientific GIS shapefiles, drone imagery, and field telemetry</p>
                  </Link>

                  <Link 
                    href="/submit-observation"
                    className="block p-4 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-sky-500/40 hover:bg-slate-900/80 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                        Submit Field Observation
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400">Record wildlife, wetland signals, and seasonal phenology sightings</p>
                  </Link>

                  <Link 
                    href="/admin/dashboard"
                    className="block p-4 rounded-2xl bg-slate-900/50 border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-950/20 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-purple-300 group-hover:text-purple-200 transition-colors flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> Admin Command Center
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-400">Review pending field submissions, manage observers, and inspect audit logs</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Your Database Records ({submissions.length})</h3>
                <p className="text-xs text-slate-400 mt-1">Live data queried from the PostgreSQL research_submissions table</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-xs px-3 py-2"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> New Submission
                </Button>
                <Button 
                  variant="outline" 
                  onClick={fetchSubmissions}
                  className="border-white/10 text-slate-300 hover:text-white text-xs px-2.5 py-2"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingSubmissions ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-white/5 text-center">
                <p className="text-sm font-semibold text-white mb-1">No submissions yet for {user.email}</p>
                <p className="text-xs text-slate-400 mb-4">Click "New Submission" above to record a telemetry sample or species sighting.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-300 capitalize">{rec.category.replace('_', ' ')}</span>
                        <span className="text-xs text-slate-500">{new Date(rec.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{rec.district} District • {rec.details}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        rec.status === 'EXPERT_VERIFIED' || rec.status === 'COMMUNITY_VERIFIED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : rec.status === 'REJECTED'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {rec.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
              <h3 className="text-base font-bold text-white">Active Environmental Alert Subscriptions</h3>
              <p className="text-xs text-slate-400 mt-1">Configure automated notifications dispatched to your registered email ({user.email})</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Critical Avalanche Warnings', desc: 'Gulmarg, Apharwat, and Pir Panjal winter corridors', active: true, cat: 'Hazard' },
                { title: 'Flash Flood & River Spikes', desc: 'Jhelum River gauge thresholds and Wular outflows', active: true, cat: 'Hydrology' },
                { title: 'Toxic Algal Bloom Alerts', desc: 'Dal Lake & Nigeen cyanobacteria threshold spikes', active: true, cat: 'Water Quality' },
                { title: 'Forest Fire Threat Signals', desc: 'Bandipora, Kupwara, and Baramulla forest ranges', active: false, cat: 'Forestry' },
              ].map((al, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{al.cat}</span>
                    <h4 className="text-sm font-bold text-white mt-2">{al.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{al.desc}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${al.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
                    {al.active ? 'Subscribed' : 'Muted'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 max-w-2xl">
              <h3 className="text-base font-bold text-white mb-4">Observer Account Information</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Full Contributor Name</span>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Email Address</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Assigned Contributor Role</span>
                  <span className="text-emerald-400 font-semibold capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">District Coverage</span>
                  <span className="text-white font-medium">{user.district || 'Srinagar'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Institutional Affiliation</span>
                  <span className="text-white font-medium">{user.institution || 'Kashmir Scientific Consortium'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Database Synchronized</span>
                  <span className="text-emerald-400 font-medium">PostgreSQL Database Active</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <Button 
                  onClick={signOut}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs px-4 py-2"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sign Out from This Device
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Quick Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">Submit Field Record</h3>
            <p className="text-xs text-slate-400 mb-6">This will insert directly into PostgreSQL and show up in the Admin Verification Queue.</p>

            <form onSubmit={handleCreateSubmission} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title / Finding</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hangul Count or Dal Lake pH telemetry"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Domain Category</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="water_quality">Water Quality</option>
                    <option value="species_census">Species Census</option>
                    <option value="hazard_incident">Hazard Incident</option>
                    <option value="gis_telemetry">GIS Telemetry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">District</label>
                  <input
                    type="text"
                    value={subDistrict}
                    onChange={(e) => setSubDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Details & Telemetry Notes</label>
                <textarea
                  rows={3}
                  placeholder="Sample values, coordinates, observations, or equipment calibration notes"
                  value={subDetails}
                  onChange={(e) => setSubDetails(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setShowSubmitModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  {submitting ? 'Writing to Database...' : 'Save to Registry'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AdvancedFooter />
    </main>
  );
}
