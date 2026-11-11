'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Filter, 
  Search, 
  PlusCircle, 
  Upload, 
  FileText, 
  Layers, 
  User, 
  ExternalLink,
  Sparkles,
  Info,
  ChevronDown
} from 'lucide-react';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { 
  RECENT_STUDENT_OBSERVATIONS, 
  ADOPTED_ECOSYSTEM_REGISTRY, 
  FIELD_LEARNING_PROGRAMS,
  StudentObservationRecord 
} from '@/data/outdoor-classroom';

export default function StudentObservationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [siteFilter, setSiteFilter] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New observation state
  const [newObs, setNewObs] = useState({
    studentToken: 'STU-SRI-088',
    schoolCode: 'KEW-SCH-2026-001',
    siteCode: 'KEW-OD-WET-001',
    programId: 'wetland-ecology',
    observationDate: new Date().toISOString().split('T')[0],
    waterTemp: '12.4',
    ph: '7.8',
    turbidity: '45',
    dissolvedOxygen: '7.2',
    avianCount: '34',
    fieldNotes: '',
    supervisingTeacher: 'Dr. Tariq Ahmad Mir'
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return RECENT_STUDENT_OBSERVATIONS.filter((rec) => {
      const matchesSearch = searchQuery === '' ||
        rec.studentIdAnonymized.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.fieldNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rec.supervisingTeacher.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || rec.verificationStatus === statusFilter;
      const matchesSite = siteFilter === 'All' || rec.siteCode === siteFilter;

      return matchesSearch && matchesStatus && matchesSite;
    });
  }, [searchQuery, statusFilter, siteFilter]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
    }, 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'EcoWatch Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
            <CheckCircle2 className="w-3 h-3" />
            <span>EcoWatch Verified</span>
          </span>
        );
      case 'Teacher Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[11px] font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>Teacher Approved</span>
          </span>
        );
      case 'Student Provisional':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-semibold">
            <Clock className="w-3 h-3" />
            <span>Student Provisional</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Empirical Student Observations • Real-Time Field Telemetry Ingestion"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'Outdoor Classroom', href: '/environmental-calendar/outdoor-classroom' },
          { label: 'Student Field Observations & Telemetry' }
        ]}
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                OD-TELEMETRY
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Student Field Observations & Telemetry
              </span>
            </div>
          </div>
        }
        subtitle="Real-time student observations from 20 adopted ecosystem stations across 10 districts, undergoing scientific QA/QC review and ingestion into the Kashmir Environmental Intelligence Platform."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/environmental-calendar/outdoor-classroom/curriculum">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md shadow-emerald-500/20">
                Curriculum Tiers
              </Button>
            </Link>
            <Link href="/environmental-calendar/outdoor-classroom/institutional-registration">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold">
                Register School
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <OutdoorClassroomNav />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
        {/* Stats & Verification Pipeline Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Stage 1: Student Provisional</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">Fresh Submissions</div>
            <div className="text-[11px] text-slate-500">Awaiting supervising teacher audit</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-blue-500/20 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Stage 2: Teacher Approved</span>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-400">Faculty Verified</div>
            <div className="text-[11px] text-slate-500">Calibrated for mathematical plausibility</div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Stage 3: EcoWatch Verified</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">Public Open Data</div>
            <div className="text-[11px] text-slate-500">Cross-checked against satellite GIS layers</div>
          </div>
        </div>

        {/* Action Header & Search / Filters */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Field Telemetry Stream</h2>
              <p className="text-xs sm:text-sm text-slate-400">Browse verified records or submit new telemetry</p>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-950/40 shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Supervised Field Record</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col lg:flex-row gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student token (e.g. STU-SRI-042), site name, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="All">All Verification Tiers</option>
                <option value="EcoWatch Verified">EcoWatch Verified</option>
                <option value="Teacher Approved">Teacher Approved</option>
                <option value="Student Provisional">Student Provisional</option>
              </select>
            </div>

            {/* Site Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap">Site:</span>
              <select
                value={siteFilter}
                onChange={(e) => setSiteFilter(e.target.value)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="All">All 20 Ecosystem Sites</option>
                {ADOPTED_ECOSYSTEM_REGISTRY.map(s => (
                  <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Telemetry Stream Records */}
        <div className="space-y-4">
          {filteredRecords.map((rec) => (
            <div 
              key={rec.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-all space-y-4"
            >
              {/* Record Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-300">
                    {rec.studentIdAnonymized}
                  </span>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="text-slate-300 font-medium">{rec.siteName}</span>
                    <span className="text-slate-600">•</span>
                    <span className="font-mono text-slate-500">{rec.siteCode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{rec.observationDate}</span>
                  </div>
                  {getStatusBadge(rec.verificationStatus)}
                </div>
              </div>

              {/* Numerical Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {Object.entries(rec.parametersMeasured).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                    <div className="text-[10px] text-slate-500 font-mono capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5 break-words">
                      {val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Field Notes & Metadata */}
              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-white/5 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Field Observation Notes:</span>
                </div>
                <p className="leading-relaxed text-slate-300 italic break-words">
                  "{rec.fieldNotes}"
                </p>
              </div>

              {/* Footer Citation & Supervised By */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span>Supervising Faculty: <strong className="text-slate-300">{rec.supervisingTeacher}</strong></span>
                  {rec.verifiedByScientist && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span>Scientific Sign-off: <strong className="text-emerald-400">{rec.verifiedByScientist}</strong></span>
                    </>
                  )}
                </div>
                <div className="font-mono text-[10px] text-slate-500 break-words">
                  DOI: {rec.openDataCitation}
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Submit Field Telemetry Record</h3>
              <p className="text-xs text-slate-400">Enter empirical field data logged during your Outdoor Classroom tour.</p>
            </div>

            {submittedSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <div className="text-lg font-bold text-emerald-300">Observation Submitted!</div>
                <p className="text-xs text-slate-300">
                  Your record has been logged under status <strong className="text-amber-400">Student Provisional</strong> and queued 
                  for supervising teacher verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Student Token</label>
                    <input
                      type="text"
                      required
                      value={newObs.studentToken}
                      onChange={(e) => setNewObs({...newObs, studentToken: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newObs.observationDate}
                      onChange={(e) => setNewObs({...newObs, observationDate: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Adopted Ecosystem Site</label>
                  <select
                    value={newObs.siteCode}
                    onChange={(e) => setNewObs({...newObs, siteCode: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    {ADOPTED_ECOSYSTEM_REGISTRY.map(s => (
                      <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Water Temp (°C)</label>
                    <input
                      type="text"
                      value={newObs.waterTemp}
                      onChange={(e) => setNewObs({...newObs, waterTemp: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">pH</label>
                    <input
                      type="text"
                      value={newObs.ph}
                      onChange={(e) => setNewObs({...newObs, ph: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Turbidity (cm)</label>
                    <input
                      type="text"
                      value={newObs.turbidity}
                      onChange={(e) => setNewObs({...newObs, turbidity: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">DO (mg/L)</label>
                    <input
                      type="text"
                      value={newObs.dissolvedOxygen}
                      onChange={(e) => setNewObs({...newObs, dissolvedOxygen: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Field Observation Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Describe weather, biological observations, bird counts, or water clarity..."
                    value={newObs.fieldNotes}
                    onChange={(e) => setNewObs({...newObs, fieldNotes: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Supervising Faculty Name</label>
                  <input
                    type="text"
                    required
                    value={newObs.supervisingTeacher}
                    onChange={(e) => setNewObs({...newObs, supervisingTeacher: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md"
                  >
                    Submit for Teacher Audit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
