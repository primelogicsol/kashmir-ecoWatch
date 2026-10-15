'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, ArrowRight, ArrowUpRight, MapPin, 
  Droplet, Mountain, Shield, Activity, 
  Footprints, AlertTriangle, Book, Database,
  SlidersHorizontal, CheckCircle2, ChevronRight, Home,
  Sparkles, Layers, Waves
} from 'lucide-react';
import { searchAll } from '@/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';

// ============================================================================
// Category Config & Helper Routing
// ============================================================================

function getEntityRoute(category: string, item: any): string {
  switch (category) {
    case 'species':
      return `/biodiversity/species/${item.slug}`;
    case 'protectedAreas':
      return `/protected-areas/${item.slug}`;
    case 'waterBodies':
      if (item.type === 'wetland' || item.category?.toLowerCase().includes('wetland') || item.slug?.includes('wetland')) {
        return `/water-systems/wetlands/${item.slug}`;
      }
      if (item.type === 'river' || item.slug?.includes('river')) {
        return `/water-systems/rivers/${item.slug}`;
      }
      if (item.type === 'spring' || item.slug?.includes('spring')) {
        return `/water-systems/springs/${item.slug}`;
      }
      if (item.type === 'glacier' || item.slug?.includes('glacier')) {
        return `/water-systems/glaciers/${item.slug}`;
      }
      return `/water-systems/lakes/${item.slug}`;
    case 'districts':
      return `/districts/${item.slug}`;
    case 'trails':
      return `/trails-sightings/hiking-trails`;
    case 'alerts':
      return `/risk-monitoring/live-alerts-advisories`;
    case 'reports':
      return `/library`;
    default:
      return '#';
  }
}

const categoryMeta: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
  all: { label: 'All Results', icon: Layers, color: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
  species: { label: 'Species', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  protectedAreas: { label: 'Protected Areas', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  waterBodies: { label: 'Water Systems', icon: Droplet, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  districts: { label: 'Districts', icon: MapPin, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  trails: { label: 'Trails & Hotspots', icon: Footprints, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  alerts: { label: 'Hazards & Alerts', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  reports: { label: 'Reports & Science', icon: Book, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
};

const popularSuggestions = [
  'Hangul', 'Dal Lake', 'Dachigam', 'Wular', 'Hokersar',
  'Snow Leopard', 'Srinagar', 'Tarsar Marsar', 'Wild Tulip', 'Flood Risk'
];

// ============================================================================
// Inner Search Component (Needs Suspense for useSearchParams)
// ============================================================================

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState(initialCategory);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'all';
    setQuery(q);
    if (cat && categoryMeta[cat]) {
      setActiveFilter(cat);
    }
  }, [searchParams]);

  // Perform search across all collections
  const rawResults = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) {
      return null;
    }
    return searchAll(query.trim());
  }, [query]);

  // Update URL on query change (debounced lightly or on submit)
  const handleQueryChange = (val: string) => {
    setQuery(val);
    const params = new URLSearchParams(window.location.search);
    if (val.trim()) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const handleSuggestionClick = (keyword: string) => {
    setQuery(keyword);
    router.replace(`/search?q=${encodeURIComponent(keyword)}`, { scroll: false });
  };

  // Compute category counts
  const counts = useMemo(() => {
    if (!rawResults) return { all: 0, species: 0, protectedAreas: 0, waterBodies: 0, districts: 0, trails: 0, alerts: 0, reports: 0 };
    const sp = rawResults.species?.length || 0;
    const pa = rawResults.protectedAreas?.length || 0;
    const wb = rawResults.waterBodies?.length || 0;
    const di = rawResults.districts?.length || 0;
    const tr = rawResults.trails?.length || 0;
    const al = rawResults.alerts?.length || 0;
    const re = rawResults.reports?.length || 0;
    return {
      all: sp + pa + wb + di + tr + al + re,
      species: sp,
      protectedAreas: pa,
      waterBodies: wb,
      districts: di,
      trails: tr,
      alerts: al,
      reports: re,
    };
  }, [rawResults]);

  // Aggregate items into unified list with category tag
  const unifiedItems = useMemo(() => {
    if (!rawResults) return [];
    const list: Array<{ category: string; item: any }> = [];

    if (rawResults.species) {
      rawResults.species.forEach(item => list.push({ category: 'species', item }));
    }
    if (rawResults.protectedAreas) {
      rawResults.protectedAreas.forEach(item => list.push({ category: 'protectedAreas', item }));
    }
    if (rawResults.waterBodies) {
      rawResults.waterBodies.forEach(item => list.push({ category: 'waterBodies', item }));
    }
    if (rawResults.districts) {
      rawResults.districts.forEach(item => list.push({ category: 'districts', item }));
    }
    if (rawResults.trails) {
      rawResults.trails.forEach(item => list.push({ category: 'trails', item }));
    }
    if (rawResults.alerts) {
      rawResults.alerts.forEach(item => list.push({ category: 'alerts', item }));
    }
    if (rawResults.reports) {
      rawResults.reports.forEach(item => list.push({ category: 'reports', item }));
    }

    if (activeFilter === 'all') return list;
    return list.filter(entry => entry.category === activeFilter);
  }, [rawResults, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-forest-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <main className="flex-1 relative z-10 pt-28 sm:pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-white font-medium">Environmental Intelligence Search</span>
        </nav>

        {/* Header Block */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Ecological Knowledge Graph
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Search Kashmir Intelligence
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Query verified inventories across biodiversity, Ramsar wetlands, protected national parks, hydrological monitoring networks, and real-time hazard alerts.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-6">
          <div className="relative flex items-center bg-slate-900/90 border border-white/15 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-2xl shadow-2xl backdrop-blur-xl p-2 sm:p-3 transition-all">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 ml-2 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search districts, species, lakes, wetlands, trails, alerts..."
              className="flex-1 bg-transparent border-none outline-none text-white text-base sm:text-lg px-3 placeholder:text-slate-500 min-w-0"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors mr-2"
                title="Clear query"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 font-mono">
              <span>Esc to clear</span>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mr-1">Trending:</span>
          {popularSuggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSuggestionClick(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                query.toLowerCase() === tag.toLowerCase()
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Category Filter Tabs */}
        {counts.all > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide border-b border-white/10">
            {Object.keys(categoryMeta).map((key) => {
              const meta = categoryMeta[key];
              const Icon = meta.icon;
              const count = counts[key as keyof typeof counts] || 0;
              const isActive = activeFilter === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900/60 hover:bg-white/5 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{meta.label}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/25 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Result Summary Bar */}
        {query.trim().length >= 2 && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 mb-6 px-1">
            <span>
              Showing <strong className="text-white">{unifiedItems.length}</strong> {activeFilter !== 'all' ? categoryMeta[activeFilter]?.label.toLowerCase() : 'result(s)'} for &ldquo;<span className="text-emerald-400 font-medium">{query}</span>&rdquo;
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Scientific Layer</span>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {unifiedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unifiedItems.map(({ category, item }) => {
              const meta = categoryMeta[category] || categoryMeta.all;
              const Icon = meta.icon;
              const targetRoute = getEntityRoute(category, item);

              return (
                <Card
                  key={`${category}-${item.id || item.slug || item.title}`}
                  className="group relative p-5 bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 hover:border-white/20 transition-all rounded-2xl flex flex-col justify-between hover:shadow-xl hover:shadow-forest-500/5"
                >
                  <div>
                    {/* Top Row: Category Badge & Context */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge className={`${meta.bg} ${meta.color} ${meta.border} text-xs px-2.5 py-0.5 border flex items-center gap-1.5`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{meta.label}</span>
                      </Badge>
                      {item.district && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.district}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                      {item.name || item.title}
                    </h3>

                    {/* Subtitle / Scientific / Taxonomic */}
                    {(item.scientificName || item.commonName || item.category || item.status) && (
                      <p className="text-xs text-slate-400 italic mb-2">
                        {item.scientificName ? <span>{item.scientificName} &bull; </span> : null}
                        {item.commonName || item.category || item.status}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {item.description || item.abstract || item.summary || 'Ecological intelligence record verified across Western Himalayan baseline survey layers.'}
                    </p>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.iucnStatus && (
                        <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold">
                          IUCN: {item.iucnStatus}
                        </span>
                      )}
                      {item.area && (
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.area} km²
                        </span>
                      )}
                      {item.severity && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase">
                          {item.severity}
                        </span>
                      )}
                    </div>

                    <Link
                      href={targetRoute}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 hover:underline transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : query.trim().length >= 2 ? (
          /* No Results State */
          <div className="text-center py-16 px-4 bg-slate-900/30 rounded-2xl border border-white/5">
            <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No matching intelligence records</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
              We couldn&apos;t find any records matching &ldquo;{query}&rdquo;. Try checking your spelling or search for broader ecological keywords.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['Hangul', 'Dal Lake', 'Dachigam', 'Wular', 'Srinagar'].map(kw => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleSuggestionClick(kw)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 transition-colors"
                >
                  Search &ldquo;{kw}&rdquo;
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Initial / Empty State */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <Card className="p-6 bg-slate-900/40 border border-white/10 rounded-2xl">
              <Activity className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Biodiversity & Species</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Explore endemic Himalayan fauna, endangered Hangul populations, Western Tragopan, medicinal flora, and taxonomic records.
              </p>
              <Link href="/biodiversity" className="text-xs text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1">
                Browse Biodiversity Directory <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card className="p-6 bg-slate-900/40 border border-white/10 rounded-2xl">
              <Droplet className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Water Systems & Wetlands</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Ramsar sites including Hokersar and Wular, urban lake basins (Dal, Nigeen, Manasbal), karst springs, and riverine telemetry.
              </p>
              <Link href="/water-systems" className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                Access Water Intelligence <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>

            <Card className="p-6 bg-slate-900/40 border border-white/10 rounded-2xl">
              <Shield className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Protected Areas & Atlas</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Dachigam National Park, Kazinag, Overa-Aru, Gulmarg Wildlife Sanctuary, and interactive GIS spatial atlas layers.
              </p>
              <Link href="/protected-areas" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1">
                Open Protected Area Network <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          </div>
        )}
      </main>

      <AdvancedFooter />
    </div>
  );
}

// ============================================================================
// Page Export with Suspense wrapper
// ============================================================================

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading Environmental Search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
