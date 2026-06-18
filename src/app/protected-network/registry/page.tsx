'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Shield,
  MapPin,
  Search,
  Filter,
  TrendingUp,
  Mountain,
  Droplet,
  Leaf,
  Activity,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  Layers,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import {
  ProtectedAreaSource,
  PROTECTED_AREA_SOURCE_METADATA
} from '@/data/protected-areas-source';
import { ProtectedAreaRegistryTable } from '@/components/protected-areas/ProtectedAreaRegistryTable';
import { getProtectedAreaRegistry, protectedAreaRegistryMetrics } from '@/data/protected-area-registry';
import { getProtectedAreas } from '@/data/protected-network';

type ScopeFilter = 'All' | 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
type CategoryFilter = 'All' | 'NP' | 'WLS' | 'WR' | 'GR' | 'WLR';

export default function ProtectedAreasRegistryPage() {
  const router = useRouter();
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'area' | 'category'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [scopeFilter, categoryFilter, searchTerm, sortBy]);

  // Map global PA data to registry format
  const mappedData = getProtectedAreas.all().map(pa => ({
    id: pa.id,
    slug: pa.slug,
    name: pa.name,
    categoryCode: pa.category === 'national_park' ? 'NP' :
                  pa.category === 'wildlife_sanctuary' ? 'WLS' :
                  pa.category === 'wetland_reserve' ? 'WLR' :
                  pa.category === 'conservation_reserve' ? 'WR' : 'GR',
    categoryLabel: pa.category,
    areaSqKm: pa.area,
    regionRaw: pa.scope || pa.district,
    regionGroup: pa.scope || 'Kashmir Core',
    districtHint: pa.district,
    sourceNotes: [],
  }));

  // Get filtered data
  const filteredData = mappedData.filter(pa => {
    const matchesScope = scopeFilter === 'All' || pa.regionGroup === scopeFilter;
    const matchesCategory = categoryFilter === 'All' || pa.categoryCode === categoryFilter;
    const matchesSearch = searchTerm === '' || 
      pa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pa.regionRaw.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pa.districtHint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesScope && matchesCategory && matchesSearch;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'area') return (b.areaSqKm || 0) - (a.areaSqKm || 0);
    if (sortBy === 'category') return a.categoryCode.localeCompare(b.categoryCode);
    return 0;
  });

  // Pagination slice
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Dynamic metrics for the filtered view
  const metrics = {
    total: filteredData.length,
    totalArea: filteredData.reduce((sum, pa) => sum + (pa.areaSqKm || 0), 0),
    byCategory: {
      NP: filteredData.filter(pa => pa.categoryCode === 'NP').length,
      WLS: filteredData.filter(pa => pa.categoryCode === 'WLS').length,
      WR: filteredData.filter(pa => pa.categoryCode === 'WR').length,
      GR: filteredData.filter(pa => pa.categoryCode === 'GR').length,
      WLR: filteredData.filter(pa => pa.categoryCode === 'WLR').length,
    },
    recordsWithAreaData: filteredData.filter(pa => pa.areaSqKm !== null && pa.areaSqKm > 0).length,
    recordsWithoutAreaData: filteredData.filter(pa => !pa.areaSqKm).length,
  };

  const getCategoryLabel = (code: string) => {
    switch (code) {
      case 'NP': return 'National Park';
      case 'WLS': return 'Wildlife Sanctuary';
      case 'WR': return 'Wildlife Reserve';
      case 'GR': return 'Game Reserve';
      case 'WLR': return 'Wetland Reserve';
      default: return code;
    }
  };

  const getCategoryColor = (code: string) => {
    switch (code) {
      case 'NP': return 'from-emerald-500 to-teal-600';
      case 'WLS': return 'from-blue-500 to-cyan-600';
      case 'WR': return 'from-sky-500 to-blue-600';
      case 'GR': return 'from-amber-500 to-orange-600';
      case 'WLR': return 'from-purple-500 to-pink-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getCategoryIcon = (code: string) => {
    switch (code) {
      case 'NP': return Mountain;
      case 'WLS': return Shield;
      case 'WR': return Leaf;
      case 'GR': return Activity;
      case 'WLR': return Droplet;
      default: return Info;
    }
  };

  const getRegionBadgeColor = (scope: string) => {
    switch (scope) {
      case 'Kashmir Core': return 'success';
      case 'Trans-Divisional': return 'warning';
      case 'Transboundary / Extended': return 'info';
      default: return 'default';
    }
  };

  const getCategoryPath = (code: string) => {
      switch (code) {
          case 'NP': return 'national-parks';
          case 'WLS': return 'wildlife-sanctuaries';
          case 'WR': return 'wildlife-reserves';
          case 'GR': return 'game-reserves';
          case 'WLR': return 'wetland-reserves';
          default: return 'all';
      }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Protected Areas Registry</span>
          </>}
        subtitle="Complete inventory of all protected areas across the global ecological scope. Filter by scope, category, and search by name. Integrated with the entire regional database."
        icon={
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <Badge variant="info" size="lg">
              Global Master Registry
            </Badge>
          </div>
        }
        breadcrumbs={[{ label: 'Protected Areas Registry' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
      />

      {/* Metrics Bar */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="mb-4 px-6 pt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
                  Registry Statistics ({scopeFilter})
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-4">
              {[
                { label: 'Total', value: metrics.total, icon: Shield },
                { label: 'Area (km²)', value: metrics.totalArea.toFixed(2), icon: MapPin },
                { label: 'National Parks', value: metrics.byCategory.NP, icon: Mountain },
                { label: 'Wildlife Sanctuaries', value: metrics.byCategory.WLS, icon: Shield },
                { label: 'Wildlife Reserves', value: metrics.byCategory.WR, icon: Leaf },
                { label: 'Game Reserves', value: metrics.byCategory.GR, icon: Activity },
                { label: 'Wetland Reserves', value: metrics.byCategory.WLR, icon: Droplet },
                { label: 'With Area Data', value: metrics.recordsWithAreaData, icon: BarChart3 },
                { label: 'Missing Area', value: metrics.recordsWithoutAreaData, icon: Info },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-intelligence border border-white/5 bg-slate-900/50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search protected areas by name, district, or region..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/20 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Scope Filter as Dropdown */}
              <div>
                <select
                  value={scopeFilter}
                  onChange={(e) => setScopeFilter(e.target.value as ScopeFilter)}
                  className="w-full px-4 py-2.5 rounded-lg bg-black/20 border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="All" className="bg-slate-900/50">All Scopes</option>
                  <option value="Kashmir Core" className="bg-slate-900/50">Kashmir Core</option>
                  <option value="Trans-Divisional" className="bg-slate-900/50">Trans-Divisional</option>
                  <option value="Transboundary / Extended" className="bg-slate-900/50">Transboundary / Extended</option>
                </select>
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                className="px-4 py-2.5 rounded-lg bg-black/20 border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="All" className="bg-slate-900/50">All Categories</option>
                <option value="NP" className="bg-slate-900/50">National Parks</option>
                <option value="WLS" className="bg-slate-900/50">Wildlife Sanctuaries</option>
                <option value="WR" className="bg-slate-900/50">Wildlife Reserves</option>
                <option value="GR" className="bg-slate-900/50">Game Reserves</option>
                <option value="WLR" className="bg-slate-900/50">Wetland Reserves</option>
              </select>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Filter className="w-4 h-4" />
                <span>
                  Showing <span className="text-white font-semibold">{sortedData.length}</span> of{' '}
                  <span className="text-white font-semibold">{mappedData.length}</span> protected areas
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'area' | 'category')}
                  className="px-3 py-1.5 rounded-lg bg-black/20 border border-white/5 text-white text-sm focus:outline-none cursor-pointer"
                >
                  <option value="name" className="bg-slate-900/50">Name (A-Z)</option>
                  <option value="area" className="bg-slate-900/50">Area (Largest)</option>
                  <option value="category" className="bg-slate-900/50">Category</option>
                </select>
              </div>
            </div>

            {/* Quick Category Stats */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              <Badge variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400">
                <Mountain className="w-3 h-3 mr-1" />
                NP: {metrics.byCategory.NP}
              </Badge>
              <Badge variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                <Shield className="w-3 h-3 mr-1" />
                WLS: {metrics.byCategory.WLS}
              </Badge>
              <Badge variant="outline" size="sm" className="border-sky-500/30 text-sky-400">
                <Leaf className="w-3 h-3 mr-1" />
                WR: {metrics.byCategory.WR}
              </Badge>
              <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-400">
                <Activity className="w-3 h-3 mr-1" />
                GR: {metrics.byCategory.GR}
              </Badge>
              <Badge variant="outline" size="sm" className="border-purple-500/30 text-purple-400">
                <Droplet className="w-3 h-3 mr-1" />
                WLR: {metrics.byCategory.WLR}
              </Badge>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Protected Areas Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedData.map((pa, idx) => {
            const Icon = getCategoryIcon(pa.categoryCode);
            
            return (
              <motion.div
                key={pa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <Card className="card-intelligence border border-white/5 bg-slate-900/50 group p-6 h-full hover:border-white/20 transition-all flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(pa.categoryCode)} flex items-center justify-center flex-shrink-0`}>
                       <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" size="sm" className="border-white/20 text-white text-xs">
                          {pa.categoryCode}
                        </Badge>
                        <Badge variant={getRegionBadgeColor(pa.regionGroup)} size="sm" className="text-xs">
                          {pa.regionGroup}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors truncate" title={pa.name}>{pa.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Area</span>
                      <span className="text-white font-semibold">
                        {pa.areaSqKm !== null ? `${pa.areaSqKm.toFixed(2)} km²` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">District</span>
                      <span className="text-white font-semibold" title={pa.districtHint}>{pa.districtHint}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Region</span>
                      <span className="text-slate-300 text-xs">{pa.regionRaw}</span>
                    </div>
                  </div>

                  {pa.sourceNotes && pa.sourceNotes.length > 0 && (
                    <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <ul className="text-xs text-amber-200 space-y-1">
                          {pa.sourceNotes.map((note, idx) => (
                            <li key={idx}>• {note}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                      icon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => router.push(`/protected-network/${getCategoryPath(pa.categoryCode)}/${pa.slug}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {sortedData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No protected areas found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </motion.div>
        )}

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 bg-black/20 border border-white/5 rounded-xl p-4 glass-intense">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  // Truncation logic: show first, last, current, and +/- 1
                  if (
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)] border border-emerald-400/30'
                            : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="text-slate-600 px-1">...</span>;
                  }
                  
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-slate-400">
              Showing <strong className="text-white">{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="text-white">{Math.min(currentPage * itemsPerPage, sortedData.length)}</strong> of <strong className="text-white">{sortedData.length}</strong> records
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          MANAGEMENT INTELLIGENCE SECTION
          ========================================================= */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Management Intelligence</h2>
                  <p className="text-slate-400 text-sm">Protected area management, threats, and access status</p>
                </div>
              </div>
            </div>
          </div>

          {/* Management Metrics */}
          <Card className="card-intelligence border border-white/5 bg-slate-900/50 p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { label: 'Fully Managed', value: protectedAreaRegistryMetrics.byManagementStatus.fully, color: 'text-emerald-400' },
                { label: 'Partially', value: protectedAreaRegistryMetrics.byManagementStatus.partially, color: 'text-amber-400' },
                { label: 'Nominally', value: protectedAreaRegistryMetrics.byManagementStatus.nominally, color: 'text-orange-400' },
                { label: 'Unmanaged', value: protectedAreaRegistryMetrics.byManagementStatus.unmanaged, color: 'text-red-400' },
                { label: 'Critical Threats', value: protectedAreaRegistryMetrics.byThreatStatus.critical, color: 'text-red-400' },
                { label: 'High Threats', value: protectedAreaRegistryMetrics.byThreatStatus.high, color: 'text-orange-400' },
                { label: 'Severe Encroach.', value: protectedAreaRegistryMetrics.byEncroachmentStatus.severe, color: 'text-red-400' },
                { label: 'Mod. Encroach.', value: protectedAreaRegistryMetrics.byEncroachmentStatus.moderate, color: 'text-amber-400' },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-3 rounded-lg bg-black/20 border border-white/5">
                  <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs text-slate-500 uppercase mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Registry Table */}
          <ProtectedAreaRegistryTable data={getProtectedAreaRegistry.kashmirOnly()} />
        </motion.div>
      </div>

      {/* Source Information */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="card-intelligence border border-white/5 bg-slate-900/50 p-6">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-slate-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Source Information</h3>
                <p className="text-slate-400 text-sm mb-3">
                  {PROTECTED_AREA_SOURCE_METADATA.sourceTitle}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Total Area:</span>{' '}
                    <span className="text-white font-medium">{PROTECTED_AREA_SOURCE_METADATA.sourceTotalAreaSqKm} sq. kms</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Categories:</span>{' '}
                    <span className="text-white font-medium">
                      NP: {PROTECTED_AREA_SOURCE_METADATA.categoryCounts.NP}, 
                      WLS: {PROTECTED_AREA_SOURCE_METADATA.categoryCounts.WLS}, 
                      WR: {PROTECTED_AREA_SOURCE_METADATA.categoryCounts.WR}, 
                      GR: {PROTECTED_AREA_SOURCE_METADATA.categoryCounts.GR}, 
                      WLR: {PROTECTED_AREA_SOURCE_METADATA.categoryCounts.WLR}
                    </span>
                  </div>
                </div>
                {PROTECTED_AREA_SOURCE_METADATA.sourceNotes.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Source Notes</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      {PROTECTED_AREA_SOURCE_METADATA.sourceNotes.map((note, idx) => (
                        <li key={idx}>• {note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      
    </main>
  );
}

// Helper function to get category path for routing
function getCategoryPath(categoryCode: string): string {
  switch (categoryCode) {
    case 'NP': return 'national-parks';
    case 'WLS': return 'wildlife-sanctuaries';
    case 'WR': return 'wildlife-reserves';
    case 'GR': return 'game-reserves';
    case 'WLR': return 'wetland-reserves';
    default: return 'protected-areas';
  }
}
