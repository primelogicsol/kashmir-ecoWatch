'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Globe2, 
  MapPin, 
  Search, 
  Filter, 
  ShieldCheck, 
  Layers, 
  School, 
  Activity, 
  CheckCircle2, 
  Compass, 
  ExternalLink,
  Info,
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Droplets,
  Trees,
  Mountain,
  FileCheck
} from 'lucide-react';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { ADOPTED_ECOSYSTEM_REGISTRY, AdoptedEcosystem } from '@/data/outdoor-classroom';

export default function AdoptAnEcosystemPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSite, setSelectedSite] = useState<AdoptedEcosystem | null>(null);
  const [showPledgeModal, setShowPledgeModal] = useState(false);

  // Form state for new adoption pledge
  const [pledgeForm, setPledgeForm] = useState({
    institutionName: '',
    district: 'Srinagar',
    ecoClubName: '',
    leadTeacher: '',
    teacherEmail: '',
    siteCode: 'KEW-OD-WET-001',
    cohortSize: '25',
    frequency: 'Monthly',
    acceptedSafetyCharter: false
  });
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);

  // Districts & types lists
  const districts = useMemo(() => {
    const set = new Set(ADOPTED_ECOSYSTEM_REGISTRY.map(s => s.district));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const types = useMemo(() => {
    const set = new Set(ADOPTED_ECOSYSTEM_REGISTRY.map(s => s.ecosystemType));
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered registry
  const filteredSites = useMemo(() => {
    return ADOPTED_ECOSYSTEM_REGISTRY.filter(site => {
      const matchesSearch = searchQuery === '' || 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.adoptingInstitutions.some(inst => inst.institutionName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDistrict = selectedDistrict === 'All' || site.district === selectedDistrict;
      const matchesType = selectedType === 'All' || site.ecosystemType === selectedType;

      return matchesSearch && matchesDistrict && matchesType;
    });
  }, [searchQuery, selectedDistrict, selectedType]);

  // Aggregate metrics
  const totalSites = ADOPTED_ECOSYSTEM_REGISTRY.length;
  const totalAdoptions = ADOPTED_ECOSYSTEM_REGISTRY.reduce((acc, s) => acc + s.adoptingInstitutions.length, 0);
  const avgHealthIndex = Math.round(
    ADOPTED_ECOSYSTEM_REGISTRY.reduce((acc, s) => acc + s.currentHealthIndex, 0) / totalSites
  );

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeForm.acceptedSafetyCharter) return;
    setPledgeSubmitted(true);
    setTimeout(() => {
      setPledgeSubmitted(false);
      setShowPledgeModal(false);
    }, 2500);
  };

  const getEcosystemIcon = (type: string) => {
    switch (type) {
      case 'Wetland':
      case 'Lake':
        return Droplets;
      case 'Forest':
        return Trees;
      case 'Mountain':
        return Mountain;
      default:
        return Globe2;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Western Himalayan Adopt-an-Ecosystem Program • School Observatories"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'Outdoor Classroom', href: '/environmental-calendar/outdoor-classroom' },
          { label: 'Adopt-an-Ecosystem' }
        ]}
        icon={<Globe2 className="w-6 h-6 text-emerald-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                OD-ADOPT
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Adopt-an-Ecosystem Registry
              </span>
            </div>
          </div>
        }
        subtitle="An open educational stewardship network connecting Kashmir schools and colleges with their local wetlands, forest transects, glacial streams, and karst springs as long-term ecological observation stations."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => setShowPledgeModal(true)}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md shadow-emerald-500/20"
            >
              <School className="w-4 h-4 mr-1.5" />
              Submit Adoption Pledge
            </Button>
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
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10">

          {/* Non-Exclusive Educational Principle Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-emerald-300">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Core Pedagogical Principle: Non-Exclusive Educational Stewardship</span>
            </div>
            <p className="leading-relaxed text-slate-400 break-words">
              Adoption within Kashmir EcoWatch is strictly an educational observation commitment and carries no exclusive 
              territorial claims or privatization. Multiple schools, higher secondaries, and colleges may adopt the same waterbody 
              or forest compartment to build collaborative, multi-station datasets across different sampling points and seasons.
            </p>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-slate-400 text-xs font-medium">Registered Field Sites</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">{totalSites}</div>
            <div className="text-[11px] text-slate-500 font-mono">10 J&K UT Districts</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-slate-400 text-xs font-medium">Institutional Adoptions</div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">{totalAdoptions}</div>
            <div className="text-[11px] text-slate-500 font-mono">Eco-Clubs & Colleges</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-slate-400 text-xs font-medium">Mean Site Health Index</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{avgHealthIndex}/100</div>
            <div className="text-[11px] text-slate-500 font-mono">Empirical Field Composite</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-1">
            <div className="text-slate-400 text-xs font-medium">Tuition & Participation Cost</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">100% Free</div>
            <div className="text-[11px] text-slate-500 font-mono">Public Science Utility</div>
          </div>
        </div>

        {/* Action Header & Search / Filters */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Ecosystem Directory & Real-Time Status</h2>
              <p className="text-xs sm:text-sm text-slate-400">Filter by geographic district or ecosystem biome</p>
            </div>
            
            <button
              onClick={() => setShowPledgeModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Adopt an Ecosystem for Your School</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col lg:flex-row gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by site name, code (e.g. KEW-OD-WET-001), district, or adopting school..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* District Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> District:
              </span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-cyan-400" /> Biome:
              </span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
              >
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
          <span>Showing {filteredSites.length} of {totalSites} registered ecosystem laboratories</span>
          {(searchQuery || selectedDistrict !== 'All' || selectedType !== 'All') && (
            <button
              onClick={() => { setSearchQuery(''); setSelectedDistrict('All'); setSelectedType('All'); }}
              className="text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => {
            const Icon = getEcosystemIcon(site.ecosystemType);
            const isHighHealth = site.currentHealthIndex >= 70;
            const isMidHealth = site.currentHealthIndex >= 50 && site.currentHealthIndex < 70;

            return (
              <div 
                key={site.id}
                className="rounded-2xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/40 p-5 sm:p-6 transition-all flex flex-col justify-between space-y-5 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                      {site.code}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300">
                        {site.ecosystemType}
                      </span>
                      <span>•</span>
                      <span>{site.elevationM} m</span>
                    </div>
                  </div>

                  {/* Title & District */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors break-words">
                      {site.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{site.district} District</span>
                      <span className="text-slate-600">•</span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {site.coordinates[0].toFixed(3)}°N, {site.coordinates[1].toFixed(3)}°E
                      </span>
                    </div>
                  </div>

                  {/* Health Index Meter */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/60 border border-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Ecological Health Index</span>
                      <span className={`font-mono font-bold ${
                        isHighHealth ? 'text-emerald-400' : isMidHealth ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {site.currentHealthIndex}/100
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHighHealth ? 'bg-emerald-500' : isMidHealth ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${site.currentHealthIndex}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                      <span>Baseline: {site.historicalBaselineYear}</span>
                      <span>Jurisdiction: {site.statutoryJurisdiction}</span>
                    </div>
                  </div>

                  {/* Key Parameters */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Monitored Parameters
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {site.keyMonitoringParameters.map((param, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-white/5 text-[11px] text-slate-300 break-words"
                        >
                          {param}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Adopting Institutions */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Adopting Cohort ({site.adoptingInstitutions.length})</span>
                      <span className="text-emerald-400 font-normal">Active Stewardship</span>
                    </div>
                    <div className="space-y-1.5">
                      {site.adoptingInstitutions.map((inst, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-950/40 border border-white/5 text-xs space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-medium text-slate-200 break-words">{inst.institutionName}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 shrink-0">
                              {inst.monitoringFrequency}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center justify-between">
                            <span>Club: {inst.ecoClubName}</span>
                            <span className="text-slate-500">Since {inst.adoptedSince}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                  <Link
                    href={`/environmental-calendar/outdoor-classroom/student-observations?site=${site.code}`}
                    className="text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Telemetry</span>
                  </Link>

                  <button
                    onClick={() => {
                      setPledgeForm(prev => ({ ...prev, siteCode: site.code }));
                      setShowPledgeModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium transition-all"
                  >
                    Adopt this Site
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statutory Permitting & Safety Notice */}
        <section className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Field Science Protocols, Safety Standards & Statutory Permissions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
              <div className="font-semibold text-emerald-300">1. Statutory Compliance</div>
              <p className="text-slate-400 leading-relaxed break-words">
                All field investigations in protected wetlands (Wular, Hokersar, Shallabugh, Haigam) and Wildlife Sanctuaries (Dachigam, Overa-Aru) 
                comply with Wildlife Protection Act 1972 guidelines. Kashmir EcoWatch assists schools with seasonal academic research permits.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
              <div className="font-semibold text-cyan-300">2. Water & Marsh Safety</div>
              <p className="text-slate-400 leading-relaxed break-words">
                Strict shoreline perimeter rules apply. Mandatory life-vest protocol during shikara-based water sampling. Certified faculty supervisor 
                and trained student buddy pairs required on every waterbody transect. No deep wading or unsupervised marsh walks.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
              <div className="font-semibold text-amber-300">3. Anonymized Minor Privacy</div>
              <p className="text-slate-400 leading-relaxed break-words">
                All student field logs are strictly submitted under institutional hash tokens (e.g. STU-SRI-042) to protect minor privacy while 
                maintaining full data integrity and academic attribution for school science portfolios.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Adoption Pledge Modal */}
      {showPledgeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Non-Exclusive Institutional Pledge</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Adopt an Ecosystem Laboratory
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Register your school, college, or university department as an active monitoring guardian for a Kashmir wetland, forest, river, or spring.
              </p>
            </div>

            {pledgeSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <div className="text-lg font-bold text-emerald-300">Pledge Received Successfully!</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your institution has been logged in the Kashmir EcoWatch Outdoor Classroom registry. The designated faculty mentor 
                  will receive the starter field dossier, digital water testing kit guide, and GIS telemetry access credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePledgeSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Institution Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Govt. Girls Higher Secondary School, Kothi Bagh"
                    value={pledgeForm.institutionName}
                    onChange={(e) => setPledgeForm({...pledgeForm, institutionName: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">District</label>
                    <select
                      value={pledgeForm.district}
                      onChange={(e) => setPledgeForm({...pledgeForm, district: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      {districts.filter(d => d !== 'All').map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Eco-Club / Dept Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chinar Eco-Club"
                      value={pledgeForm.ecoClubName}
                      onChange={(e) => setPledgeForm({...pledgeForm, ecoClubName: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Lead Science Faculty</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Nayeem Ahmad"
                      value={pledgeForm.leadTeacher}
                      onChange={(e) => setPledgeForm({...pledgeForm, leadTeacher: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Faculty Official Email</label>
                    <input
                      type="email"
                      required
                      placeholder="faculty@institution.edu"
                      value={pledgeForm.teacherEmail}
                      onChange={(e) => setPledgeForm({...pledgeForm, teacherEmail: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Ecosystem Site</label>
                  <select
                    value={pledgeForm.siteCode}
                    onChange={(e) => setPledgeForm({...pledgeForm, siteCode: e.target.value})}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    {ADOPTED_ECOSYSTEM_REGISTRY.map(site => (
                      <option key={site.code} value={site.code}>
                        {site.code} - {site.name} ({site.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Student Cohort Size</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={pledgeForm.cohortSize}
                      onChange={(e) => setPledgeForm({...pledgeForm, cohortSize: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Monitoring Rhythm</label>
                    <select
                      value={pledgeForm.frequency}
                      onChange={(e) => setPledgeForm({...pledgeForm, frequency: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Fortnightly">Fortnightly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Seasonal">Seasonal (4x/year)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-[11px] space-y-2">
                  <label className="flex items-start gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={pledgeForm.acceptedSafetyCharter}
                      onChange={(e) => setPledgeForm({...pledgeForm, acceptedSafetyCharter: e.target.checked})}
                      className="mt-0.5 rounded text-emerald-500 focus:ring-0"
                    />
                    <span className="leading-snug">
                      I confirm that our institution will abide by Kashmir EcoWatch safety protocols, guardian consent requirements, 
                      Leave No Trace principles, and submit data in good faith under faculty supervision.
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPledgeModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md"
                  >
                    Confirm Institutional Adoption
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
