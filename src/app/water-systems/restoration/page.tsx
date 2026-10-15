'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { restorationSites, WaterEntity } from '@/data/water-systems';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Hammer, CheckCircle, RefreshCw, Calendar, Droplet, Waves, MapPin,
  Clock, Sparkles, Activity, AlertTriangle, CheckCircle2, ChevronRight,
  Eye, ShieldCheck, Layers, ArrowRight, FileText, Camera, Users, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RestorationPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'ongoing' | 'completed' | 'planned' | 'lake' | 'wetland' | 'community'>('all');
  const [activeInsight, setActiveInsight] = useState<'flagships' | 'bioengineering' | 'community' | 'observe'>('flagships');

  const categories = useMemo(() => [...new Set(restorationSites.map(r => r.category))].sort(), []);
  const districts  = useMemo(() => [...new Set(restorationSites.map(r => r.district))].filter(Boolean).sort(), []);

  const totalCount = restorationSites.length; // 8
  const completed = useMemo(() => restorationSites.filter(r => r.restorationData?.status === 'completed').length, []);
  const ongoing   = useMemo(() => restorationSites.filter(r => r.restorationData?.status === 'ongoing').length, []);
  const planned   = useMemo(() => restorationSites.filter(r => r.restorationData?.status === 'planned').length, []);
  const lakeRest  = useMemo(() => restorationSites.filter(r => r.category?.toLowerCase().includes('lake')).length, []);
  const wetRest   = useMemo(() => restorationSites.filter(r => r.category?.toLowerCase().includes('wetland')).length, []);

  // Filtered restoration sites for listing grid
  const displayedSites = useMemo(() => {
    switch (activeTab) {
      case 'ongoing':
        return restorationSites.filter(r => r.restorationData?.status === 'ongoing');
      case 'completed':
        return restorationSites.filter(r => r.restorationData?.status === 'completed');
      case 'planned':
        return restorationSites.filter(r => r.restorationData?.status === 'planned');
      case 'lake':
        return restorationSites.filter(r => r.category?.toLowerCase().includes('lake'));
      case 'wetland':
        return restorationSites.filter(r => r.category?.toLowerCase().includes('wetland'));
      case 'community':
        return restorationSites.filter(r => r.name.toLowerCase().includes('khushal') || r.name.toLowerCase().includes('gil') || r.restorationData?.implementingAgency?.toLowerCase().includes('community'));
      case 'all':
      default:
        return restorationSites;
    }
  }, [activeTab]);

  return (
    <WaterEntityListingPage
      title="Western Himalayan Restoration & Rejuvenation"
      description="Operational ledger of major ecological restoration programs, wetland de-siltation, urban lake rejuvenation, springshed catchment treatments, bio-engineering revetments, and community-led river cleanups across Kashmir and Jammu."
      icon="Hammer"
      color="from-lime-500 via-green-600 to-emerald-700"
      entities={displayedSites}
      entityType="Restoration Sites"
      kpis={[
        { label: 'Total Projects Tracked', value: totalCount, icon: 'Hammer' },
        { label: 'Completed Milestones',   value: completed,  icon: 'CheckCircle2', color: 'text-emerald-400' },
        { label: 'Active / Ongoing',       value: ongoing,    icon: 'RefreshCw',    color: 'text-blue-400' },
        { label: 'DPR Planned',            value: planned,    icon: 'Calendar',     color: 'text-amber-400' },
        { label: 'Lake Restorations',      value: lakeRest,   icon: 'Droplet',      color: 'text-cyan-400' },
        { label: 'Wetland Habitats',       value: wetRest,    icon: 'Waves',        color: 'text-teal-400' },
        { label: 'Districts Covered',      value: districts.length, icon: 'MapPin' },
        { label: 'Citizen Monitoring',     value: 'Active',   icon: 'Eye',          color: 'text-lime-400' },
      ]}
      filters={{ districts, categories }}
      getEntitySlug={entity => `/water-systems/restoration/${entity.slug}`}
      getCategory={entity => entity.category}
      renderAdditionalInfo={entity =>
        entity.restorationData ? (
          <div className="mb-2">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              entity.restorationData.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              entity.restorationData.status === 'ongoing'   ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-slate-500/20 text-slate-400 border border-slate-500/30'
            }`}>
              {entity.restorationData.status.toUpperCase()}
            </span>
            <p className="text-xs text-slate-400 mt-1 truncate">
              Agency: <span className="text-white">{entity.restorationData.implementingAgency}</span>
            </p>
          </div>
        ) : null
      }
    >
      {/* ── Restoration Focus Typologies & Status Filter Bar ────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Hammer className="w-5 h-5 text-lime-400" />
              Restoration Program Horizons &amp; Guilds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Filter ecological rejuvenation projects by implementation status or ecosystem typology.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 shrink-0">
            Showing <strong className="text-lime-400">{displayedSites.length}</strong> of {totalCount} projects
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'bg-lime-600 hover:bg-lime-500 text-slate-950 font-bold shadow-lg shadow-lime-950/40' : 'border-white/10 text-slate-400 hover:text-white'}
          >
            All Projects ({totalCount})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'ongoing' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ongoing')}
            className={activeTab === 'ongoing' ? 'bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-950/40' : 'border-white/10 text-blue-300 hover:text-white'}
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Ongoing Interventions ({ongoing})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
            className={activeTab === 'completed' ? 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40' : 'border-white/10 text-emerald-300 hover:text-white'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-300" />
            Completed Milestones ({completed})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'planned' ? 'default' : 'outline'}
            onClick={() => setActiveTab('planned')}
            className={activeTab === 'planned' ? 'bg-amber-600 hover:bg-amber-500 text-white font-medium shadow-lg shadow-amber-950/40' : 'border-white/10 text-amber-300 hover:text-white'}
          >
            <Calendar className="w-3.5 h-3.5 mr-1 text-amber-300" />
            Planned DPRs ({planned})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'lake' ? 'default' : 'outline'}
            onClick={() => setActiveTab('lake')}
            className={activeTab === 'lake' ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-950/40' : 'border-white/10 text-cyan-300 hover:text-white'}
          >
            <Droplet className="w-3.5 h-3.5 mr-1 text-cyan-300" />
            Lake Rejuvenation ({lakeRest})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'wetland' ? 'default' : 'outline'}
            onClick={() => setActiveTab('wetland')}
            className={activeTab === 'wetland' ? 'bg-teal-600 hover:bg-teal-500 text-white font-medium shadow-lg shadow-teal-950/40' : 'border-white/10 text-teal-300 hover:text-white'}
          >
            <Waves className="w-3.5 h-3.5 mr-1 text-teal-300" />
            Wetland Rehabilitation ({wetRest})
          </Button>

          <Button
            size="sm"
            variant={activeTab === 'community' ? 'default' : 'outline'}
            onClick={() => setActiveTab('community')}
            className={activeTab === 'community' ? 'bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-950/40' : 'border-white/10 text-purple-300 hover:text-white'}
          >
            <Users className="w-3.5 h-3.5 mr-1 text-purple-300" />
            Community-Led Cleanups
          </Button>
        </div>
      </div>

      {/* ── Restoration Intelligence & Field Observation Spotlight ─────────── */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              Ecological Restoration &amp; Rejuvenation Spotlight
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Curated perspectives on flagship restoration engineering, biological water treatment, community stewardship, and citizen audit protocols.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-white/5 flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setActiveInsight('flagships')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'flagships'
                  ? 'bg-lime-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Flagship Programs
            </button>
            <button
              onClick={() => setActiveInsight('bioengineering')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'bioengineering'
                  ? 'bg-lime-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bio-Engineering
            </button>
            <button
              onClick={() => setActiveInsight('community')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeInsight === 'community'
                  ? 'bg-lime-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Citizen Stewardship
            </button>
            <button
              onClick={() => setActiveInsight('observe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeInsight === 'observe'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Eye className="w-3 h-3" />
              Observe Here (Site Audit)
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: Flagships */}
          {activeInsight === 'flagships' && (
            <motion.div
              key="flagships"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
            >
              {restorationSites.map(site => (
                <Link
                  key={site.id}
                  href={`/water-systems/restoration/${site.slug}`}
                  className="p-4 rounded-xl bg-slate-950/70 border border-lime-500/20 hover:border-lime-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-300 border border-lime-500/30 flex items-center gap-1">
                      <Hammer className="w-2.5 h-2.5" />
                      {site.category}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      site.restorationData?.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      site.restorationData?.status === 'ongoing' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {site.restorationData?.status?.toUpperCase()}
                    </span>
                  </div>
                  <h5 className="font-semibold text-white text-base group-hover:text-lime-300 transition-colors line-clamp-1">
                    {site.name}
                  </h5>
                  <div className="text-xs text-lime-400/90 font-medium mt-0.5">
                    {site.district} · Agency: {site.restorationData?.implementingAgency}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                    {site.description}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target: {site.restorationData?.targetYear || 'Active'}</span>
                    <span className="text-lime-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      View Project <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* TAB 2: Bio-Engineering */}
          {activeInsight === 'bioengineering' && (
            <motion.div
              key="bioengineering"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-lime-500/20">
                <span className="text-xs font-bold text-lime-400 block mb-1">Constructed Wetland Reedbeds</span>
                <h5 className="text-sm font-semibold text-white mb-2">Subsurface Flow Bio-Filters</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Engineered gravel beds planted with *Phragmites australis* and *Typha latifolia* treating municipal sewage in Dal Lake catchments before water enters the open lake basin.
                </p>
                <div className="text-[11px] text-slate-500">
                  Performance: <span className="text-lime-300">85% Reduction in BOD &amp; Nitrate Load</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                <span className="text-xs font-bold text-teal-400 block mb-1">Riparian Willow Brush Layering</span>
                <h5 className="text-sm font-semibold text-white mb-2">Living Embankment Stabilization</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Planting dormant native Kashmir willow (*Salix alba*) cuttings along eroded riverbanks of River Jhelum. Deep fibrous root matrices anchor saturated silts against torrential velocity scouring.
                </p>
                <div className="text-[11px] text-slate-500">
                  Advantage: <span className="text-teal-300">Self-repairing natural revetment replacing concrete</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                <span className="text-xs font-bold text-cyan-400 block mb-1">Ecological De-Silting Regulators</span>
                <h5 className="text-sm font-semibold text-white mb-2">Wular Critically Silted Basins</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Excavation of critical water storage channels by WUCMA in critically silted northern sectors of Wular Lake, combined with willow plantation removals to restore historic flood-absorption volume.
                </p>
                <div className="text-[11px] text-slate-500">
                  Volume Restored: <span className="text-cyan-300">&gt;6.5 Million m³ Water Holding Capacity</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Citizen Stewardship */}
          {activeInsight === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20">
                <span className="text-xs font-bold text-purple-400 block mb-1">Khushal Sar Rebirth</span>
                <h5 className="text-sm font-semibold text-white mb-2">Citizen-Led Basin Cleanups</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  A pioneering public movement spearheaded by local volunteers that cleared thousands of truckloads of plastic waste and opened blocked navigation channels, returning migratory birds to Khushal Sar and Gil Sar.
                </p>
                <div className="text-[11px] text-slate-500">
                  Milestone: <span className="text-purple-300">Navigability Restored between Dal and Anchar</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Rohan Panzath Tradition</span>
                <h5 className="text-sm font-semibold text-white mb-2">Centuries-Old Spring Festival</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Annual community desiltation ritual in Qazigund where hundreds of villagers enter Panzath Nag spring simultaneously, using woven baskets to clear accumulated silt and weeds while catching fish.
                </p>
                <div className="text-[11px] text-slate-500">
                  Tradition: <span className="text-emerald-300">Indigenous Community Commons Management</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                <span className="text-xs font-bold text-blue-400 block mb-1">Youth Wetland Brigades</span>
                <h5 className="text-sm font-semibold text-white mb-2">Shoreline Boundary Watch</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Volunteer student patrols monitoring perimeter boundary pillars around Hokersar and Shallabugh to prevent illegal rubble dumping and nighttime agricultural encroachment.
                </p>
                <div className="text-[11px] text-slate-500">
                  Coverage: <span className="text-blue-300">Over 24 km of Sensitive Wetland Perimeters</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Observe Here */}
          {activeInsight === 'observe' && (
            <motion.div
              key="observe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-xl bg-gradient-to-r from-lime-950/60 via-slate-900 to-emerald-950/60 border border-lime-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-lime-500/20 border border-lime-500/30 text-lime-400 shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Restoration Site Audit &amp; Verification Protocol</span>
                      <Badge variant="outline" className="text-[10px] border-lime-500/40 text-lime-300">
                        Audit Watch 2026
                      </Badge>
                    </h5>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Submit photographic proof of completed desiltation, report malfunctioning weed harvesters, or flag encroachments on restored water body margins.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link href="/submit-observation?category=water">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950/50">
                      <Camera className="w-3.5 h-3.5 mr-1 text-slate-950" />
                      Submit Restoration Audit
                    </Button>
                  </Link>
                  <Link href="/report-issue">
                    <Button size="sm" variant="outline" className="border-rose-500/40 text-rose-300 hover:bg-rose-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                      Report Failed Treatment
                    </Button>
                  </Link>
                  <Link href="/trails-sightings/trail-field-records">
                    <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                      <FileText className="w-3.5 h-3.5 mr-1 text-lime-400" />
                      Audit Records
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-lime-500/20 hover:border-lime-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-lime-400">
                    <Activity className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">1. Dredging Depth Verification</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Verify post-dredging bathymetry using a graduated sounding pole. Confirm whether restored navigation channel depths meet the contracted 1.8-meter standard.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-lime-300/80 font-mono">
                    Protocol: Post-Dredge Hydrographic Sounding
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-teal-500/20 hover:border-teal-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-teal-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">2. Native Sapling Survival</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Count percentage survival of afforestation saplings planted on restored catchment slopes. Check for cattle grazing damage and adequate drip irrigation.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-teal-300/80 font-mono">
                    Audit Metric: 1-Year Plantation Survival %
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">3. STP Outfall Performance</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Sample treated water at Sewage Treatment Plant (STP) discharge points into Dal Lake. Report cloudy, foul-smelling effluent indicating plant bypass or aeration failure.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-amber-300/80 font-mono">
                    Standard: CPCB STP Discharge Norms
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <h6 className="font-semibold text-white text-xs">4. Re-Encroachment Alert</h6>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Report freshly dumped earth, willow fencing, or illegal tin sheds erected on cleared shoreline wetland buffers within weeks of government clearance drives.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-rose-300/80 font-mono">
                    Enforcement: LCMA Demolition Registry
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WaterEntityListingPage>
  );
}
