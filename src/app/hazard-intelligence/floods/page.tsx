'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import {
  Waves, ChevronRight, AlertTriangle, MapPin,
  Shield, Activity, Clock, Users, Calendar,
  ExternalLink, Eye, CloudRain, Droplets, Mountain, BarChart3, CheckCircle, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  floodZoneRegistry,
  FloodZoneRecord,
  getRiskVariant,
  getStatusColor,
  getVerificationChip,
  getFloodTypeColor,
} from '@/data/hazard-floods';

// ─── FloodZoneCard ───────────────────────────────────────────────────────────

function FloodZoneCard({ record, index }: { record: FloodZoneRecord; index: number }) {
  const riskVar = getRiskVariant(record.risk_level);
  const statusChip = getStatusColor(record.current_status);
  const verChip = getVerificationChip(record.verification_status);
  const floodChip = getFloodTypeColor(record.flood_type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-white/20">
        {/* Accent gradient for critical/high risk */}
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-5 pointer-events-none ${
          record.risk_level === 'Critical' ? 'from-red-500 to-transparent' : record.risk_level === 'High' ? 'from-orange-500 to-transparent' : 'from-transparent to-transparent'
        }`} />

        {/* Header: Name + Risk Badge */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">{record.name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge variant={riskVar as any} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {record.risk_level} Risk
          </Badge>
        </div>

        {/* Verification Chip */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] w-full ${verChip}`}>
          <Shield className="w-3 h-3 flex-shrink-0" />
          <span className="font-medium">{record.verification_status}</span>
        </div>

        {/* Flood Type + Status Row */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${floodChip}`}>
            <Waves className="w-3 h-3" />
            <span className="font-medium">{record.flood_type}</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${statusChip}`}>
            <Activity className="w-3 h-3" />
            <span className="font-medium">{record.current_status}</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">River System</div>
            <div className="font-bold text-slate-200 truncate">{record.river_system}</div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Population</div>
            <div className="font-bold text-slate-200">{record.exposure_population.toLocaleString()}</div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Recurrence</div>
            <div className="font-bold text-slate-200 truncate">{record.recurrence_interval}</div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Last Event</div>
            <div className="font-bold text-slate-200 truncate">{record.last_major_event}</div>
          </div>
        </div>

        {/* Footer: Infrastructure at Risk */}
        <div className="mt-auto pt-3 border-t border-white/5 text-[10px]">
          <div className="text-slate-500 mb-1">Infrastructure at Risk</div>
          <div className="text-slate-300 line-clamp-2">{record.infrastructure_at_risk}</div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── FloodZoneRow ────────────────────────────────────────────────────────────

function FloodZoneRow({ record, index }: { record: FloodZoneRecord; index: number }) {
  const riskVar = getRiskVariant(record.risk_level);
  const statusChip = getStatusColor(record.current_status);
  const verChip = getVerificationChip(record.verification_status);
  const floodChip = getFloodTypeColor(record.flood_type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all group">
        <div className="flex flex-wrap items-center gap-4">
          {/* Name + District */}
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {record.district} · {record.scope}
            </div>
          </div>

          {/* Risk Level */}
          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk</div>
            <Badge variant={riskVar as any} size="sm" className="shadow-sm">
              <span className="text-xs font-bold">{record.risk_level}</span>
            </Badge>
          </div>

          {/* Flood Type */}
          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500 mb-1">Type</div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${floodChip}`}>
              <span className="font-medium">{record.flood_type}</span>
            </div>
          </div>

          {/* River System */}
          <div className="w-28 hidden lg:block">
            <div className="text-[10px] text-slate-500 mb-1">River System</div>
            <div className="text-xs font-bold text-slate-300">{record.river_system}</div>
          </div>

          {/* Population */}
          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500 mb-1">Population</div>
            <div className="text-xs font-bold text-slate-300">{record.exposure_population.toLocaleString()}</div>
          </div>

          {/* Status */}
          <div className="w-28 hidden xl:block">
            <div className="text-[10px] text-slate-500 mb-1">Status</div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${statusChip}`}>
              <span className="font-medium">{record.current_status}</span>
            </div>
          </div>

          {/* Verification */}
          <div className="w-32 hidden xl:block">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${verChip}`}>
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span className="font-medium">{record.verification_status}</span>
            </div>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<ChevronRight className="w-3 h-3" />}>
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function FloodsPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();
  const [floodTypeFilter, setFloodTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // ─── Computed KPIs ─────────────────────────────────────────────────────────

  const totalZones = floodZoneRegistry.length;
  const activeAlerts = floodZoneRegistry.filter(z => z.current_status === 'Active Alert').length;
  const criticalZones = floodZoneRegistry.filter(z => z.risk_level === 'Critical').length;
  const highRisk = floodZoneRegistry.filter(z => z.risk_level === 'High').length;
  const riverSystems = new Set(floodZoneRegistry.map(z => z.river_system)).size;
  const totalPopulation = floodZoneRegistry.reduce((acc, z) => acc + z.exposure_population, 0);
  const verifiedZones = floodZoneRegistry.filter(z => z.verification_status === 'Verified').length;

  // ─── Filtering ─────────────────────────────────────────────────────────────

  const filteredData = useMemo(() => floodZoneRegistry.filter(z => {
    const matchSearch = filter.searchQuery === '' ||
      z.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      z.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
      z.river_system.toLowerCase().includes(filter.searchQuery.toLowerCase());

    const matchScope = filter.scope === 'All' || z.scope === filter.scope;
    const matchDistrict = filter.district === 'All' || z.district === filter.district;
    const matchFloodType = floodTypeFilter === 'all' || z.flood_type === floodTypeFilter;
    const matchRisk = riskFilter === 'all' || z.risk_level === riskFilter;

    return matchSearch && matchScope && matchDistrict && matchFloodType && matchRisk;
  }), [filter, floodTypeFilter, riskFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  React.useEffect(() => { setCurrentPage(1); }, [floodTypeFilter, riskFilter, filter]);

  const extraActiveCount = (floodTypeFilter !== 'all' ? 1 : 0) + (riskFilter !== 'all' ? 1 : 0);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Floods' }
        ]}
        title={
          <>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible">Flood Risk Intelligence Across</span>
            <span className="block whitespace-nowrap leading-[1.12] pb-2 overflow-visible bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Greater Kashmir Ecology</span>
          </>
        }
        subtitle="Comprehensive flood zone registry covering riverine, urban, floodplain and flash flood corridors across all 3 Greater Kashmir scopes — with risk assessment, population exposure and infrastructure vulnerability mapping."
        icon={<Waves className="w-6 h-6 text-blue-400" />}
      />

      <ModuleKpiStrip kpis={[
        { label: 'Total Flood Zones',   value: totalZones,                        icon: 'Waves',         color: 'text-blue-400'    },
        { label: 'Active Alerts',       value: activeAlerts,                      icon: 'AlertTriangle', color: 'text-red-400'     },
        { label: 'Critical Zones',      value: criticalZones,                     icon: 'Zap',           color: 'text-red-400'     },
        { label: 'High Risk',           value: highRisk,                          icon: 'AlertTriangle', color: 'text-orange-400'  },
        { label: 'River Systems',       value: riverSystems,                      icon: 'Activity',      color: 'text-cyan-400'    },
        { label: 'Population Exposed',  value: `${(totalPopulation / 1000).toFixed(0)}K`, icon: 'Users',  color: 'text-amber-400'   },
        { label: 'Verified Zones',      value: verifiedZones,                     icon: 'CheckCircle',   color: 'text-emerald-400' },
        { label: 'Last Assessment',     value: 'Jun 2026',                        icon: 'Clock',         color: 'text-cyan-400'    },
      ]} iconColor="text-blue-500" />

      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={floodTypeFilter}
                onChange={setFloodTypeFilter}
                placeholder="All Flood Types"
                options={[
                  { value: 'Riverine',   label: 'Riverine'   },
                  { value: 'Urban',      label: 'Urban'      },
                  { value: 'Floodplain', label: 'Floodplain' },
                  { value: 'Flash',      label: 'Flash'      },
                ]}
              />
              <FilterSelect
                value={riskFilter}
                onChange={setRiskFilter}
                placeholder="All Risk Levels"
                options={[
                  { value: 'Critical', label: 'Critical' },
                  { value: 'High',     label: 'High'     },
                  { value: 'Moderate', label: 'Moderate' },
                  { value: 'Low',      label: 'Low'      },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => { setFloodTypeFilter('all'); setRiskFilter('all'); }}
        />
      </div>

      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalZones}
        entityLabel="flood zones"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Flood Zones')}
        scopeCount={filter.scope === 'All' ? 0 : floodZoneRegistry.filter(z => z.scope === filter.scope).length}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── Flood Zone Registry ──────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-400" />
              Flood Zone Registry
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {totalZones} flood zones across {riverSystems} river systems — risk assessment, population exposure &amp; infrastructure mapping
            </p>
          </motion.div>

          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Waves className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No flood zones found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((z, i) => (
                <FloodZoneCard key={z.id} record={z} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((z, i) => (
                <FloodZoneRow key={z.id} record={z} index={i} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm text-slate-400">
                Page <span className="text-white font-medium">{currentPage}</span> of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Hazard Domains</h2>
            <p className="text-slate-400">Explore connected hazard intelligence modules</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods', desc: 'Rapid-onset flash flood early warning', icon: CloudRain, color: 'from-indigo-500 to-blue-600' },
              { label: 'Landslides', href: '/hazard-intelligence/landslides', desc: 'Slope instability and debris flow sites', icon: Mountain, color: 'from-amber-500 to-orange-600' },
              { label: 'GLOFs', href: '/hazard-intelligence/glofs', desc: 'Glacial lake outburst flood risk', icon: Droplets, color: 'from-teal-500 to-emerald-600' },
              { label: 'Dashboards', href: '/hazard-intelligence/dashboards', desc: 'Multi-hazard analytics & comparison', icon: BarChart3, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-slate-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
